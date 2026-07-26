<template>
  <div class="sd-root">
    <div class="sd-header">
      <span class="sd-icon">🔄</span>
      <span class="sd-title">{{ t('serialization.title') }}</span>
    </div>

    <div class="sd-tabs">
      <button
        v-for="lang in languages"
        :key="lang.id"
        :class="['sd-tab', { active: activeLang === lang.id }]"
        @click="activeLang = lang.id"
      >
        {{ lang.name }}
      </button>
    </div>

    <div class="sd-layout">
      <div class="sd-panel sd-object">
        <div class="sd-panel-header">
          <span class="sd-panel-icon">📦</span>
          <span class="sd-panel-title">{{ t('serialization.panels.object.title') }}</span>
        </div>
        <div class="sd-panel-body">
          <pre class="sd-code">{{ currentLang.objectCode }}</pre>
        </div>
        <div class="sd-panel-desc">{{ t('serialization.panels.object.desc') }}</div>
      </div>

      <div class="sd-arrow" :class="{ 'sd-arrow-active': step >= 1 }">
        <div class="sd-arrow-line"></div>
        <div class="sd-arrow-label">{{ t('serialization.arrows.serialize') }}</div>
      </div>

      <div
        class="sd-panel sd-json"
        :class="{ 'sd-panel-highlight': step === 1 }"
      >
        <div class="sd-panel-header">
          <span class="sd-panel-icon">{}</span>
          <span class="sd-panel-title">{{ t('serialization.panels.json.title') }}</span>
          <span class="sd-panel-size">{{ currentLang.jsonSize }} bytes</span>
        </div>
        <div class="sd-panel-body">
          <pre class="sd-code">{{ currentLang.jsonString }}</pre>
        </div>
        <div class="sd-panel-desc">{{ t('serialization.panels.json.desc') }}</div>
      </div>

      <div class="sd-arrow" :class="{ 'sd-arrow-active': step >= 2 }">
        <div class="sd-arrow-line"></div>
        <div class="sd-arrow-label">{{ t('serialization.arrows.transfer') }}</div>
      </div>

      <div
        class="sd-panel sd-binary"
        :class="{ 'sd-panel-highlight': step === 2 }"
      >
        <div class="sd-panel-header">
          <span class="sd-panel-icon">💻</span>
          <span class="sd-panel-title">{{ t('serialization.panels.binary.title') }}</span>
          <span class="sd-panel-size">{{ currentLang.binarySize }} bytes</span>
        </div>
        <div class="sd-panel-body">
          <pre class="sd-code sd-binary-code">{{
            currentLang.binaryString
          }}</pre>
        </div>
        <div class="sd-panel-desc">{{ t('serialization.panels.binary.desc') }}</div>
      </div>
    </div>

    <div class="sd-controls">
      <button
        class="sd-btn sd-btn-primary"
        :disabled="step >= 3"
        @click="nextStep"
      >
        {{ stepText }}
      </button>
      <button class="sd-btn" :disabled="step === 0" @click="reset">{{ t('serialization.buttons.reset') }}</button>
    </div>

    <div class="sd-comparison">
      <div class="sd-comparison-header">{{ t('serialization.comparisonTitle') }}</div>
      <div class="sd-comparison-table">
        <div class="sd-row sd-row-head">
          <div v-for="header in comparisonHeaders" :key="header" class="sd-cell">{{ header }}</div>
        </div>
        <div v-for="row in comparisonRows" :key="row[0]" class="sd-row">
          <div v-for="(cell, i) in row" :key="i" :class="['sd-cell', { 'sd-rating': i > 0 }]">{{ cell }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { serverBackendLocale } from '../../../locales/server-backend/index.js'

const { t, messages } = useI18n(serverBackendLocale)

const activeLang = ref('javascript')
const step = ref(0)

const languageMap = computed(() => messages.value.serialization.languages)
const languages = computed(() => Object.values(languageMap.value))
const comparisonHeaders = computed(() => messages.value.serialization.comparisonHeaders)
const comparisonRows = computed(() => messages.value.serialization.comparisonRows)

const currentLang = computed(() => languageMap.value[activeLang.value])

const stepText = computed(() => {
  return messages.value.serialization.buttons.steps[step.value]
})

function nextStep() {
  if (step.value < 3) {
    step.value++
  }
}

function reset() {
  step.value = 0
}
</script>

<style scoped>
.sd-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
  overflow: hidden;
}

.sd-header {
  padding: 14px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 10px;
}

.sd-icon {
  font-size: 20px;
}

.sd-title {
  font-weight: 600;
  font-size: 15px;
}

.sd-tabs {
  display: flex;
  gap: 6px;
  padding: 12px 16px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  overflow-x: auto;
}

.sd-tab {
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.sd-tab:hover {
  border-color: var(--vp-c-brand);
}

.sd-tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.sd-layout {
  padding: 20px;
  display: flex;
  align-items: stretch;
  gap: 12px;
  flex-wrap: wrap;
}

.sd-panel {
  flex: 1;
  min-width: 200px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
}

.sd-panel-highlight {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--vp-c-brand) 14%, transparent);
}

.sd-panel-header {
  padding: 10px 12px;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 8px;
}

.sd-panel-icon {
  font-size: 16px;
}

.sd-panel-title {
  font-weight: 600;
  font-size: 13px;
  flex: 1;
}

.sd-panel-size {
  font-size: 11px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  padding: 2px 6px;
  border-radius: 4px;
}

.sd-panel-body {
  padding: 12px;
  flex: 1;
}

.sd-code {
  margin: 0;
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 11px;
  line-height: 1.5;
  overflow-x: auto;
  color: var(--vp-c-text-1);
}

.sd-binary-code {
  font-size: 10px;
  color: var(--vp-c-text-2);
}

.sd-panel-desc {
  padding: 8px 12px;
  font-size: 12px;
  color: var(--vp-c-text-3);
  border-top: 1px solid var(--vp-c-divider);
  text-align: center;
}

.sd-arrow {
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: 0.3;
  transition: opacity 0.3s;
}

.sd-arrow-active {
  opacity: 1;
}

.sd-arrow-line {
  width: 2px;
  height: 40px;
  background: var(--vp-c-brand);
  position: relative;
}

.sd-arrow-line::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: -4px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 8px solid var(--vp-c-brand);
}

.sd-arrow-label {
  font-size: 11px;
  color: var(--vp-c-brand);
  font-weight: 600;
}

.sd-controls {
  padding: 14px 20px;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  gap: 10px;
}

.sd-btn {
  padding: 8px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.sd-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
}

.sd-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sd-btn-primary {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.sd-btn-primary:hover:not(:disabled) {
  background: color-mix(in srgb, var(--vp-c-brand) 90%, white);
}

.sd-comparison {
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  padding: 16px 20px;
}

.sd-comparison-header {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
}

.sd-comparison-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.sd-row {
  display: grid;
  grid-template-columns: 1fr repeat(4, 1fr);
}

.sd-row:nth-child(odd) {
  background: var(--vp-c-bg-soft);
}

.sd-row:nth-child(even) {
  background: var(--vp-c-bg);
}

.sd-row-head {
  background: var(--vp-c-bg-alt);
}

.sd-cell {
  padding: 10px 8px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  text-align: center;
  border-right: 1px solid var(--vp-c-divider);
}

.sd-cell:last-child {
  border-right: none;
}

.sd-row-head .sd-cell {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.sd-row .sd-cell:first-child {
  text-align: left;
  font-weight: 500;
  padding-left: 12px;
}

.sd-rating {
  color: var(--vp-c-brand);
  font-size: 12px;
}

@media (max-width: 768px) {
  .sd-layout {
    flex-direction: column;
  }

  .sd-arrow {
    width: 100%;
    height: 40px;
    flex-direction: row;
  }

  .sd-arrow-line {
    width: 40px;
    height: 2px;
  }

  .sd-arrow-line::after {
    right: 0;
    top: -4px;
    left: auto;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 8px solid var(--vp-c-brand);
  }

  .sd-row {
    grid-template-columns: 80px repeat(4, 1fr);
  }

  .sd-cell {
    padding: 8px 4px;
    font-size: 11px;
  }
}
</style>
