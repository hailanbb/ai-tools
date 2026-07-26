<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="title">{{ t('envVarOverview.title') }}</span>
      <span class="subtitle">{{ t('envVarOverview.subtitle') }}</span>
    </div>

    <div class="content-layout">
      <div class="env-table">
        <div class="table-header">
          <span>{{ messages.envVarOverview.headers[0] }}</span>
          <span>{{ messages.envVarOverview.headers[1] }}</span>
        </div>
        <div
          v-for="item in envVars"
          :key="item.key"
          class="env-row"
          :class="{ selected: selected?.key === item.key }"
          @click="echoVar(item)"
        >
          <span class="env-key">{{ item.key }}</span>
          <span class="env-value">{{ item.value }}</span>
        </div>
      </div>

      <div class="terminal-panel">
        <div class="term-titlebar">
          <span class="dot red" />
          <span class="dot yellow" />
          <span class="dot green" />
          <span class="term-name">bash</span>
        </div>
        <div ref="termBody" class="term-body">
          <div
            v-for="line in termLines"
            :key="line.id"
            :class="['term-line', `line-${line.type}`]"
          >
            {{ line.text }}
          </div>
          <div class="term-prompt">$ <span class="cursor">█</span></div>
        </div>

        <div v-if="selected" class="term-desc">
          <div class="desc-title">{{ selected.key }}</div>
          <div class="desc-body">{{ selected.desc }}</div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ t('envVarOverview.infoStrong') }}</strong>{{ t('envVarOverview.info') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { developmentToolsLocale } from '../../../locales/development-tools/index.js'

const { t, messages } = useI18n(developmentToolsLocale)

let lineId = 0
const termLines = ref([{ id: lineId++, type: 'hint', text: t('envVarOverview.hint') }])
const selected = ref(null)
const termBody = ref(null)
const envVars = computed(() => messages.value.envVarOverview.vars)

const echoVar = (item) => {
  selected.value = item
  termLines.value.push(
    { id: lineId++, type: 'cmd', text: `$ echo $${item.key}` },
    { id: lineId++, type: 'output', text: item.value }
  )
  nextTick(() => {
    if (termBody.value) {
      termBody.value.scrollTop = termBody.value.scrollHeight
    }
  })
}
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
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.demo-header .title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.demo-header .subtitle {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}

.content-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 720px) {
  .content-layout {
    grid-template-columns: 1fr;
  }
}

.env-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  padding: 0.4rem 0.75rem;
  background: var(--vp-c-bg-alt);
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
  font-weight: 600;
}

.env-row {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  border-bottom: 1px solid var(--vp-c-divider);
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  transition: background 0.15s;
  align-items: center;
}

.env-row:last-child {
  border-bottom: none;
}

.env-row:hover {
  background: var(--vp-c-bg-soft);
}

.env-row.selected {
  background: color-mix(in srgb, var(--vp-c-brand) 12%, transparent);
  border-left: 3px solid var(--vp-c-brand);
}

.env-key {
  color: var(--vp-c-brand);
  font-weight: bold;
  font-size: 0.78rem;
}

.env-value {
  color: var(--vp-c-text-2);
  font-size: 0.76rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.terminal-panel {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  background: #1e1e2e;
}

.term-titlebar {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.75rem;
  background: #181825;
}

.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  display: inline-block;
}

.dot.red {
  background: #ff5f57;
}
.dot.yellow {
  background: #febc2e;
}
.dot.green {
  background: #28c840;
}

.term-name {
  margin-left: 0.4rem;
  font-size: 0.75rem;
  color: #6c7086;
}

.term-body {
  padding: 0.6rem 0.75rem;
  min-height: 150px;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  line-height: 1.7;
  word-break: break-all;
}

.term-line {
  margin: 0;
}

.line-hint {
  color: #585b70;
  font-style: italic;
}

.line-cmd {
  color: #a6e3a1;
}

.line-output {
  color: #cdd6f4;
}

.term-prompt {
  color: #585b70;
  margin-top: 0.25rem;
}

.cursor {
  animation: blink 1s step-end infinite;
  color: #cdd6f4;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.term-desc {
  border-top: 1px solid #313244;
  padding: 0.6rem 0.75rem;
  background: #11111b;
}

.desc-title {
  font-size: 0.78rem;
  color: var(--vp-c-brand);
  font-weight: bold;
  margin-bottom: 0.25rem;
  font-family: var(--vp-font-family-mono);
}

.desc-body {
  font-size: 0.75rem;
  color: #7f849c;
  line-height: 1.5;
}

.info-box {
  display: block;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.6rem 0.75rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.info-box strong {
  white-space: nowrap;
  color: var(--vp-c-text-1);
}

.info-box code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  background: var(--vp-c-bg);
  padding: 0 0.3rem;
  border-radius: 3px;
  color: var(--vp-c-brand);
}
</style>
