<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="title">{{ t('dotEnv.title') }}</span>
      <span class="subtitle">{{ t('dotEnv.subtitle') }}</span>
    </div>

    <div class="lang-tabs">
      <button
        v-for="lang in langs"
        :key="lang.id"
        class="lang-tab"
        :class="{ active: currentLang === lang.id }"
        @click="currentLang = lang.id"
      >
        {{ lang.label }}
      </button>
    </div>

    <div class="two-col">
      <div class="file-panel">
        <div class="file-title">
          <span class="file-icon">📄</span> .env
          <span class="file-badge no-commit">{{ t('dotEnv.noCommit') }}</span>
        </div>
        <div class="code-area">
          <div v-for="(line, i) in envLines" :key="i" class="code-line" :class="line.type">
            <span
              v-if="line.key"
              class="env-key"
              :class="{ active: hoveredKey === line.key }"
              @mouseenter="hoveredKey = line.key"
              @mouseleave="hoveredKey = null"
            >{{ line.key }}</span>
            <span v-if="line.key" class="env-eq">=</span>
            <span v-if="line.key" class="env-val">{{ line.value }}</span>
            <span v-else class="env-comment">{{ line.text }}</span>
          </div>
        </div>
        <div class="file-title example">
          <span class="file-icon">📋</span> .env.example
          <span class="file-badge can-commit">{{ t('dotEnv.canCommit') }}</span>
        </div>
        <div class="code-area dim">
          <div v-for="(line, i) in exampleLines" :key="i" class="code-line" :class="line.type">
            <span v-if="line.key" class="env-key">{{ line.key }}</span>
            <span v-if="line.key" class="env-eq">=</span>
            <span v-if="line.key" class="env-val empty">{{ t('dotEnv.emptyValue') }}</span>
            <span v-else class="env-comment">{{ line.text }}</span>
          </div>
        </div>
      </div>

      <div class="code-panel">
        <div class="file-title">
          <span class="file-icon">💻</span> {{ currentLangObj.filename }}
        </div>
        <div class="code-area">
          <div v-for="(line, i) in currentLangObj.lines" :key="i" class="code-line" :class="line.type">
            <span class="line-content" v-html="line.text" />
          </div>
        </div>
        <div class="read-result">
          <div class="result-title">{{ t('dotEnv.resultTitle') }}</div>
          <div v-for="kv in readResults" :key="kv.key" class="result-row">
            <span
              class="result-key"
              :class="{ active: hoveredKey === kv.key }"
              @mouseenter="hoveredKey = kv.key"
              @mouseleave="hoveredKey = null"
            >{{ kv.key }}</span>
            <span class="result-arrow">→</span>
            <span class="result-val">{{ kv.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ t('dotEnv.workflowStrong') }}</strong>{{ t('dotEnv.workflow') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { developmentToolsLocale } from '../../../locales/development-tools/index.js'

const { t, messages } = useI18n(developmentToolsLocale)

const hoveredKey = ref(null)
const currentLang = ref('python')

const langs = computed(() => messages.value.dotEnv.langs)
const envLines = computed(() => messages.value.dotEnv.envLines)
const exampleLines = computed(() => messages.value.dotEnv.exampleLines)
const readResults = computed(() => messages.value.dotEnv.readResults)

const currentLangObj = computed(() => {
  if (currentLang.value === 'python') {
    return { filename: 'main.py', lines: messages.value.dotEnv.pythonLines }
  }
  return { filename: 'index.js', lines: messages.value.dotEnv.nodeLines }
})
</script>

<style scoped>
.demo-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 0.75rem 0;
  min-width: 0;
  overflow: hidden;
}

.demo-header {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.demo-header .title { font-size: 1rem; font-weight: bold; color: var(--vp-c-text-1); }
.demo-header .subtitle { font-size: 0.82rem; color: var(--vp-c-text-2); }

.lang-tabs {
  display: flex;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}

.lang-tab {
  padding: 0.25rem 0.7rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.82rem;
  transition: all 0.15s;
}

.lang-tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 620px) {
  .two-col { grid-template-columns: 1fr; }
}

.file-panel, .code-panel {
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.file-title {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.6rem;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
}

.file-title.example {
  border-top: 1px solid var(--vp-c-divider);
}

.file-icon { flex-shrink: 0; }

.file-badge {
  margin-left: auto;
  font-size: 0.65rem;
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
  font-family: var(--vp-font-family-base);
}

.file-badge.no-commit { background: color-mix(in srgb, #f87171 15%, transparent); color: #ef4444; }
.file-badge.can-commit { background: color-mix(in srgb, var(--vp-c-green-1) 15%, transparent); color: var(--vp-c-green-1); }

.code-area {
  background: #1e1e2e;
  padding: 0.45rem 0;
  font-family: var(--vp-font-family-mono);
  font-size: 0.77rem;
  line-height: 1.7;
  overflow-x: auto;
}

.code-area.dim { background: #16131e; opacity: 0.75; }

.code-line {
  padding: 0 0.65rem;
  display: flex;
  align-items: baseline;
  gap: 0;
  min-width: max-content;
}

.code-line.highlight { background: color-mix(in srgb, var(--vp-c-brand) 8%, transparent); }
.code-line.comment .env-comment { color: #6c7086; font-style: italic; }

.env-key {
  color: var(--vp-c-brand);
  font-weight: bold;
  cursor: default;
  transition: background 0.15s;
  border-radius: 2px;
  padding: 0 1px;
}

.env-key.active { background: color-mix(in srgb, var(--vp-c-brand) 25%, transparent); }
.env-eq { color: #45475a; margin: 0 1px; }
.env-val { color: #a6e3a1; }
.env-val.empty { color: #45475a; font-style: italic; }
.env-comment { color: #6c7086; font-style: italic; }

.line-content { color: #cdd6f4; white-space: pre; }
.code-line.comment .line-content { color: #6c7086; font-style: italic; }
.code-line.highlight .line-content { color: #cdd6f4; }

:deep(.key-ref) { color: var(--vp-c-brand); font-weight: bold; }
:deep(.comment-inline) { color: #6c7086; font-style: italic; }

.read-result {
  background: #11111b;
  border-top: 1px solid #313244;
  padding: 0.5rem 0.65rem;
}

.result-title {
  font-size: 0.68rem;
  color: #6c7086;
  margin-bottom: 0.3rem;
  font-family: var(--vp-font-family-base);
}

.result-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  line-height: 1.7;
}

.result-key {
  color: var(--vp-c-brand);
  font-weight: bold;
  cursor: default;
  border-radius: 2px;
  padding: 0 1px;
  transition: background 0.15s;
}

.result-key.active { background: color-mix(in srgb, var(--vp-c-brand) 25%, transparent); }
.result-arrow { color: #45475a; }
.result-val { color: #a6e3a1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.info-box {
  display: block;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.6rem 0.75rem;
  font-size: 0.84rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.info-box strong { white-space: nowrap; color: var(--vp-c-text-1); }

.info-box code {
  font-family: var(--vp-font-family-mono);
  background: var(--vp-c-bg);
  padding: 0 0.3rem;
  border-radius: 3px;
  color: var(--vp-c-brand);
  font-size: 0.8rem;
}
</style>
