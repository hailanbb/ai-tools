import { computed } from 'vue'
import { useData } from 'vitepress'

const langMap = {
  'zh-CN': 'zh-cn',
  'en-US': 'en',
  'ja-JP': 'ja-jp',
  'zh-TW': 'zh-tw',
  'ko-KR': 'ko-kr',
  'es-ES': 'es-es',
  'fr-FR': 'fr-fr',
  'de-DE': 'de-de',
  'ar-SA': 'ar-sa',
  'vi-VN': 'vi-vn'
}

/**
 * Lightweight i18n composable for VitePress Vue components.
 *
 * @param {Record<string, Record<string, any>>} messages
 *   Locale map, e.g. { 'zh-cn': { title: '标题' }, en: { title: 'Title' } }
 * @returns {{ t: (key: string) => any, locale: import('vue').ComputedRef<string> }}
 */
export function useI18n(messages) {
  const { lang } = useData()

  const locale = computed(() => langMap[lang.value] || 'zh-cn')

  const current = computed(
    () => messages[locale.value] || messages.en || messages['zh-cn'] || {}
  )

  const t = (key, params = {}) => {
    const keys = key.split('.')
    let val = current.value
    for (const k of keys) {
      val = val?.[k]
      if (val === undefined) return key
    }
    if (typeof val === 'string') {
      return val.replace(/\{(\w+)\}/g, (_, name) =>
        params[name] === undefined ? `{${name}}` : String(params[name])
      )
    }
    return val
  }

  return { t, locale, messages: current }
}
