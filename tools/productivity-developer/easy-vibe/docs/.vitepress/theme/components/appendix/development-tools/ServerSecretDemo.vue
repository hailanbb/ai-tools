<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="title">{{ t('serverSecret.title') }}</span>
      <span class="subtitle">{{ t('serverSecret.subtitle') }}</span>
    </div>

    <div class="tab-bar">
      <button
        v-for="s in scenarios"
        :key="s.id"
        class="tab-btn"
        :class="{ active: current === s.id }"
        @click="current = s.id"
      >
        {{ s.icon }} {{ s.label }}
      </button>
    </div>

    <div class="scenario-body">
      <div class="code-block">
        <div class="code-title">{{ currentScenario.codeTitle }}</div>
        <div class="code-area">
          <div
            v-for="(line, i) in currentScenario.lines"
            :key="i"
            class="code-line"
            :class="line.type"
          >
            <span class="line-content" v-html="line.text" />
          </div>
        </div>
      </div>

      <div class="tips">
        <div v-for="tip in currentScenario.tips" :key="tip.text" class="tip" :class="tip.level">
          <span class="tip-dot" />
          <span class="tip-text">{{ tip.text }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ t('serverSecret.principleStrong') }}</strong>{{ t('serverSecret.principle') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { developmentToolsLocale } from '../../../locales/development-tools/index.js'

const { t, messages } = useI18n(developmentToolsLocale)

const current = ref('systemd')

const scenarios = computed(() => messages.value.serverSecret.scenarios)
const scenarioData = computed(() => messages.value.serverSecret.scenarioData)

const currentScenario = computed(() => scenarioData.value[current.value])
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
  margin-bottom: 0.85rem;
}

.demo-header .title { font-size: 1rem; font-weight: bold; color: var(--vp-c-text-1); }
.demo-header .subtitle { font-size: 0.82rem; color: var(--vp-c-text-2); }

.tab-bar {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.tab-btn {
  padding: 0.28rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.82rem;
  transition: all 0.15s;
  white-space: nowrap;
}

.tab-btn:hover { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }
.tab-btn.active { background: var(--vp-c-brand); border-color: var(--vp-c-brand); color: white; }

.scenario-body {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 640px) {
  .scenario-body { grid-template-columns: 1fr; }
}

.code-block {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  min-width: 0;
}

.code-title {
  background: var(--vp-c-bg-alt);
  padding: 0.3rem 0.65rem;
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
  font-family: var(--vp-font-family-mono);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.code-area {
  background: #1e1e2e;
  padding: 0.45rem 0;
  font-family: var(--vp-font-family-mono);
  font-size: 0.76rem;
  line-height: 1.7;
  overflow-x: auto;
}

.code-line {
  padding: 0 0.7rem;
  min-width: max-content;
}

.code-line.highlight { background: color-mix(in srgb, var(--vp-c-brand) 8%, transparent); }
.code-line.good { background: color-mix(in srgb, #4ade80 6%, transparent); }
.code-line.bad { background: color-mix(in srgb, #f87171 10%, transparent); }

.line-content { color: #cdd6f4; white-space: pre; }
.code-line.comment .line-content { color: #6c7086; font-style: italic; }
.code-line.bad .line-content { color: #f38ba8; }
.code-line.good .line-content { color: #a6e3a1; }

:deep(.warn-inline) { color: #f87171; font-size: 0.7em; }

.tips {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.tip {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
  padding: 0.45rem 0.6rem;
  border-left: 3px solid;
}

.tip.safe { border-left-color: var(--vp-c-green-1); }
.tip.warn { border-left-color: var(--vp-c-yellow-1, #f59e0b); }
.tip.info { border-left-color: var(--vp-c-brand); }

.tip-dot { flex-shrink: 0; margin-top: 5px; width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
.tip.safe .tip-dot { color: var(--vp-c-green-1); }
.tip.warn .tip-dot { color: var(--vp-c-yellow-1, #f59e0b); }
.tip.info .tip-dot { color: var(--vp-c-brand); }

.tip-text {
  font-size: 0.76rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

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
</style>
