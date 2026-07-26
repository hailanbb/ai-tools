<template>
  <div class="lexer-token-demo">
    <h4>{{ t('compilers.lexer.title') }}</h4>
    <p class="desc">{{ t('compilers.lexer.desc') }}</p>

    <div class="input-area">
      <input
        v-model="code"
        class="code-input"
        :placeholder="t('compilers.lexer.placeholder')"
        @input="tokenize"
      />
      <div class="presets">
        <button v-for="p in presets" :key="p" class="preset-btn" @click="code = p; tokenize()">
          {{ p }}
        </button>
      </div>
    </div>

    <div v-if="tokens.length" class="token-stream">
      <div class="stream-label">{{ t('compilers.lexer.streamLabel') }}</div>
      <div class="tokens">
        <span
          v-for="(token, i) in tokens"
          :key="i"
          :class="['token', 'token-' + token.type]"
          @mouseenter="hovered = i"
          @mouseleave="hovered = null"
        >
          {{ token.value }}
          <span v-if="hovered === i" class="token-tip">{{ token.label }}</span>
        </span>
      </div>
    </div>

    <div v-if="tokens.length" class="token-table">
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>{{ t('compilers.lexer.type') }}</th>
            <th>{{ t('compilers.lexer.explanation') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(token, i) in tokens" :key="i">
            <td><code>{{ token.value }}</code></td>
            <td>
              <span :class="['type-badge', 'token-' + token.type]">
                {{ token.label }}
              </span>
            </td>
            <td class="explain">{{ token.explain }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useI18n } from '../../../composables/useI18n'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals'

const { t, messages } = useI18n(computerFundamentalsLocale)

const code = ref('let x = 10 + 5;')
const tokens = ref([])
const hovered = ref(null)

const presets = computed(() => messages.value.compilers.lexer.presets)

const keywords = new Set(['let', 'const', 'var', 'if', 'else', 'for', 'while', 'function', 'return', 'class', 'import', 'export', 'true', 'false', 'null', 'undefined'])

function tokenize() {
  const result = []
  let s = code.value.trim()
  let i = 0
  while (i < s.length) {
    if (/\s/.test(s[i])) { i++; continue }
    if (/[0-9]/.test(s[i])) {
      let num = ''
      while (i < s.length && /[0-9.]/.test(s[i])) num += s[i++]
      result.push({
        value: num,
        type: 'number',
        ...t('compilers.lexer.tokenTypes.number')
      })
    } else if (/[a-zA-Z_$]/.test(s[i])) {
      let id = ''
      while (i < s.length && /[a-zA-Z0-9_$]/.test(s[i])) id += s[i++]
      if (keywords.has(id)) {
        result.push({
          value: id,
          type: 'keyword',
          ...t('compilers.lexer.tokenTypes.keyword')
        })
      } else {
        result.push({
          value: id,
          type: 'identifier',
          ...t('compilers.lexer.tokenTypes.identifier')
        })
      }
    } else if (s[i] === '"' || s[i] === "'") {
      const q = s[i]; let str = q; i++
      while (i < s.length && s[i] !== q) str += s[i++]
      if (i < s.length) str += s[i++]
      result.push({
        value: str,
        type: 'string',
        ...t('compilers.lexer.tokenTypes.string')
      })
    } else if ('+-*/%'.includes(s[i])) {
      result.push({
        value: s[i],
        type: 'operator',
        ...t('compilers.lexer.tokenTypes.operatorArithmetic')
      })
      i++
    } else if ('=<>!'.includes(s[i])) {
      let op = s[i]; i++
      if (i < s.length && s[i] === '=') { op += s[i]; i++ }
      if (i < s.length && s[i] === '=') { op += s[i]; i++ }
      result.push({
        value: op,
        type: 'operator',
        ...t('compilers.lexer.tokenTypes.operatorCompare')
      })
    } else if ('(){}[]'.includes(s[i])) {
      result.push({
        value: s[i],
        type: 'bracket',
        ...t('compilers.lexer.tokenTypes.bracket')
      })
      i++
    } else if (';,'.includes(s[i])) {
      result.push({
        value: s[i],
        type: 'punctuation',
        ...t('compilers.lexer.tokenTypes.punctuation')
      })
      i++
    } else {
      result.push({
        value: s[i],
        type: 'unknown',
        ...t('compilers.lexer.tokenTypes.unknown')
      })
      i++
    }
  }
  tokens.value = result
}

onMounted(tokenize)
</script>

<style scoped>
.lexer-token-demo {
  padding: 20px; border: 1px solid var(--vp-c-divider);
  border-radius: 12px; margin: 16px 0; background: var(--vp-c-bg-soft);
}
h4 { margin: 0 0 4px; }
.desc { color: var(--vp-c-text-2); font-size: 14px; margin: 0 0 16px; }
.code-input {
  width: 100%; padding: 10px 12px; border: 1px solid var(--vp-c-divider);
  border-radius: 8px; font-family: 'Fira Code', monospace; font-size: 14px;
  background: var(--vp-c-bg); color: var(--vp-c-text-1); box-sizing: border-box;
}
.presets { display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap; }
.preset-btn {
  padding: 4px 10px; border-radius: 4px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); font-size: 11px; cursor: pointer;
  font-family: 'Fira Code', monospace; color: var(--vp-c-text-2);
}
.preset-btn:hover { border-color: var(--vp-c-brand-1); }
.token-stream { margin-top: 16px; }
.stream-label { font-size: 13px; font-weight: 600; margin-bottom: 8px; }
.tokens { display: flex; flex-wrap: wrap; gap: 6px; }
.token {
  position: relative; padding: 4px 8px; border-radius: 4px;
  font-family: 'Fira Code', monospace; font-size: 13px; cursor: default;
}
.token-tip {
  position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%);
  padding: 2px 6px; background: #333; color: #fff; border-radius: 4px;
  font-size: 11px; white-space: nowrap; font-family: sans-serif;
}
.token-keyword { background: #dbeafe; color: #1e40af; }
.token-identifier { background: #f0fdf4; color: #166534; }
.token-number { background: #fef3c7; color: #92400e; }
.token-string { background: #fce7f3; color: #9d174d; }
.token-operator { background: #ede9fe; color: #5b21b6; }
.token-bracket { background: #e0e7ff; color: #3730a3; }
.token-punctuation { background: #f1f5f9; color: #475569; }
.token-unknown { background: #fef2f2; color: #991b1b; }
.token-table { margin-top: 16px; overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 13px; }
th { text-align: left; padding: 6px 10px; background: var(--vp-c-bg); border-bottom: 2px solid var(--vp-c-divider); }
td { padding: 5px 10px; border-bottom: 1px solid var(--vp-c-divider); }
.type-badge { padding: 2px 6px; border-radius: 4px; font-size: 11px; }
.explain { color: var(--vp-c-text-3); }
</style>
