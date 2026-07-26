import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const root = path.resolve('docs/.vitepress/theme/components/appendix')
const showDetails = process.argv.includes('--details')
const showJson = process.argv.includes('--json')

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(fullPath, files)
    } else if (entry.isFile() && entry.name.endsWith('.vue')) {
      files.push(fullPath)
    }
  }
  return files
}

function hasChineseText(source) {
  const withoutComments = source
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|\n)\s*\/\/.*(?=\n|$)/g, '$1')

  return /[\u3400-\u9fff]/.test(withoutComments)
}

function hasComponentI18n(source) {
  return /useI18n\s*\(|locales\//.test(source)
}

const files = walk(root).sort()
const records = files.map((file) => {
  const source = fs.readFileSync(file, 'utf8')
  const relative = path.relative(root, file)
  const section = relative.split(path.sep)[0]

  return {
    file: relative,
    section,
    hasChinese: hasChineseText(source),
    hasI18n: hasComponentI18n(source)
  }
})

const summary = records.reduce(
  (acc, record) => {
    acc.total += 1
    if (record.hasChinese) acc.withChinese += 1
    if (record.hasI18n) acc.withI18n += 1
    if (record.hasChinese && !record.hasI18n) acc.chineseWithoutI18n += 1

    const section = acc.sections[record.section] ?? {
      total: 0,
      withChinese: 0,
      withI18n: 0,
      chineseWithoutI18n: 0
    }
    section.total += 1
    if (record.hasChinese) section.withChinese += 1
    if (record.hasI18n) section.withI18n += 1
    if (record.hasChinese && !record.hasI18n) section.chineseWithoutI18n += 1
    acc.sections[record.section] = section

    return acc
  },
  {
    total: 0,
    withChinese: 0,
    withI18n: 0,
    chineseWithoutI18n: 0,
    sections: {}
  }
)

const sections = Object.entries(summary.sections)
  .map(([section, values]) => ({ section, ...values }))
  .sort(
    (a, b) =>
      b.chineseWithoutI18n - a.chineseWithoutI18n ||
      a.section.localeCompare(b.section)
  )

const incomplete = records
  .filter((record) => record.hasChinese && !record.hasI18n)
  .map(({ file, section }) => ({ file, section }))

if (showJson) {
  console.log(JSON.stringify({ ...summary, sections, incomplete }, null, 2))
} else {
  console.log('Appendix component i18n scan')
  console.log(`Total Vue components: ${summary.total}`)
  console.log(`Components with Chinese text: ${summary.withChinese}`)
  console.log(`Components using i18n: ${summary.withI18n}`)
  console.log(`Chinese text without i18n: ${summary.chineseWithoutI18n}`)
  console.log('')
  console.log('Sections with remaining Chinese text without i18n:')
  for (const section of sections.filter((item) => item.chineseWithoutI18n)) {
    console.log(
      `- ${section.section}: ${section.chineseWithoutI18n}/${section.total}`
    )
  }

  if (showDetails) {
    console.log('')
    console.log('Files with Chinese text without i18n:')
    for (const item of incomplete) {
      console.log(`- ${item.file}`)
    }
  }
}
