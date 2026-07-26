<template>
  <div class="box-demo">
    <div class="demo-header">
      <span class="title">{{ t('layout.boxModel.title') }}</span>
      <span class="subtitle">{{ t('layout.boxModel.subtitle') }}</span>
    </div>

    <div class="scenario">
      {{ t('layout.boxModel.scenario') }}
    </div>

    <div class="main-area">
      <div class="left-panel">
        <div class="controls">
          <div class="control-row">
            <label>width</label>
            <input
              v-model.number="contentW"
              type="range"
              min="60"
              max="150"
            >
            <span class="val">{{ contentW }}px</span>
          </div>
          <div class="control-row">
            <label>padding</label>
            <input
              v-model.number="padding"
              type="range"
              min="0"
              max="30"
            >
            <span class="val">{{ padding }}px</span>
          </div>
          <div class="control-row">
            <label>border</label>
            <input
              v-model.number="border"
              type="range"
              min="0"
              max="15"
            >
            <span class="val">{{ border }}px</span>
          </div>
          <div class="control-row">
            <label>margin</label>
            <input
              v-model.number="margin"
              type="range"
              min="0"
              max="20"
            >
            <span class="val">{{ margin }}px</span>
          </div>
        </div>

        <div class="box-sizing-toggle">
          <span class="toggle-label">box-sizing:</span>
          <button 
            :class="['toggle-btn', { active: boxSizing === 'content-box' }]"
            @click="boxSizing = 'content-box'"
          >
            content-box
          </button>
          <button 
            :class="['toggle-btn', { active: boxSizing === 'border-box' }]"
            @click="boxSizing = 'border-box'"
          >
            border-box
          </button>
        </div>

        <div class="visual">
          <div
            class="layer margin"
            :style="{ padding: margin + 'px' }"
          >
            <span
              v-if="margin >= 8"
              class="layer-label"
            >{{ t('layout.boxModel.layers.margin') }}</span>
            <div
              class="layer border"
              :style="{ borderWidth: border + 'px' }"
            >
              <span
                v-if="border >= 5"
                class="layer-label"
              >{{ t('layout.boxModel.layers.border') }}</span>
              <div
                class="layer padding"
                :style="{ padding: padding + 'px' }"
              >
                <span
                  v-if="padding >= 8"
                  class="layer-label"
                >{{ t('layout.boxModel.layers.padding') }}</span>
                <div
                  class="content"
                  :style="{ width: contentW + 'px' }"
                >
                  {{ t('layout.boxModel.layers.content') }}<br>{{ contentW }}px
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="right-panel">
        <div class="result-card">
          <div class="result-header">
            <span class="result-title">{{ t('layout.boxModel.actualWidth') }}</span>
            <span class="result-value">{{ total }}px</span>
          </div>
          <div class="formula">
            <template v-if="boxSizing === 'content-box'">
              {{ contentW }} + {{ padding }}×2 + {{ border }}×2 + {{ margin }}×2 = {{ total }}px
            </template>
            <template v-else>
              {{ t('layout.boxModel.includedFormula', { width: contentW, margin, total }) }}
            </template>
          </div>
          <div
            class="result-hint"
            :class="{ warning: total * 3 > 900 }"
          >
            <template v-if="total * 3 > 900">
              {{ t('layout.boxModel.overflowHint', { width: total * 3 }) }}
            </template>
            <template v-else>
              {{ t('layout.boxModel.fitHint', { width: total * 3 }) }}
            </template>
          </div>
        </div>

        <div class="code-block">
          <div class="code-title">
            CSS
          </div>
          <div class="code-content">
            <div class="line">
              .box {
            </div>
            <div class="line hl">
              box-sizing: {{ boxSizing }};
            </div>
            <div class="line">
              width: {{ contentW }}px;
            </div>
            <div class="line">
              padding: {{ padding }}px;
            </div>
            <div class="line">
              border: {{ border }}px solid #ccc;
            </div>
            <div class="line">
              margin: {{ margin }}px;
            </div>
            <div class="line">
              }
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ t('layout.boxModel.keyDifference') }}</strong>
      {{ t('layout.boxModel.info') }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { webBasicsLocale } from '../../../locales/web-basics/index.js'

const { t } = useI18n(webBasicsLocale)

const contentW = ref(100)
const padding = ref(15)
const border = ref(5)
const margin = ref(10)
const boxSizing = ref('content-box')

const total = computed(() => {
  if (boxSizing.value === 'border-box') {
    return contentW.value + margin.value * 2
  }
  return contentW.value + padding.value * 2 + border.value * 2 + margin.value * 2
})
</script>

<style scoped>
.box-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
}

.demo-header .title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

.scenario {
  background: var(--vp-c-warning-soft);
  border: 1px solid var(--vp-c-warning-dimm);
  border-radius: 6px;
  padding: 0.6rem 0.75rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
}

.scenario strong {
  color: var(--vp-c-text-1);
}

.main-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .main-area { grid-template-columns: 1fr; }
}

.left-panel {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.control-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.4rem 0.6rem;
}

.control-row label {
  font-size: 0.8rem;
  font-weight: 500;
  min-width: 55px;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
}

.control-row input[type='range'] {
  flex: 1;
  height: 4px;
  accent-color: var(--vp-c-brand);
}

.control-row .val {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  color: var(--vp-c-brand);
  min-width: 40px;
  text-align: right;
}

.box-sizing-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.toggle-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
}

.toggle-btn {
  padding: 0.3rem 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.7rem;
  font-family: var(--vp-font-family-mono);
  transition: all 0.2s;
}

.toggle-btn:hover { background: var(--vp-c-bg-soft); }
.toggle-btn.active {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.visual {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 140px;
}

.layer {
  position: relative;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.layer-label {
  position: absolute;
  top: 2px;
  left: 4px;
  font-size: 9px;
  font-weight: 600;
  opacity: 0.6;
  font-family: var(--vp-font-family-mono);
}

.margin {
  background: rgba(251, 191, 36, 0.1);
  border: 1px dashed rgba(251, 191, 36, 0.5);
}
.margin .layer-label { color: #d97706; }

.border {
  background: rgba(14, 165, 233, 0.1);
  border-style: solid;
  border-color: var(--vp-c-brand);
}
.border .layer-label { color: var(--vp-c-brand); }

.padding {
  background: rgba(34, 197, 94, 0.1);
  border: 1px dashed rgba(34, 197, 94, 0.5);
}
.padding .layer-label { color: #16a34a; }

.content {
  background: var(--vp-c-brand);
  color: #fff;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.7rem;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.3;
}

.right-panel {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.result-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
}

.result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.result-title {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.result-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  font-family: var(--vp-font-family-mono);
}

.formula {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
}

.result-hint {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: var(--vp-c-success);
  padding: 0.4rem 0.6rem;
  background: var(--vp-c-success-soft);
  border-radius: 4px;
}

.result-hint.warning {
  color: var(--vp-c-warning);
  background: var(--vp-c-warning-soft);
}

.code-block {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
  flex: 1;
}

.code-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.code-content {
  background: #1a1a2e;
  color: #e5e7eb;
  border-radius: 6px;
  padding: 0.75rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  line-height: 1.6;
}

.line { white-space: pre; }
.hl {
  color: var(--vp-c-brand);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box strong { color: var(--vp-c-text-1); }
.info-box code {
  background: var(--vp-c-bg-soft);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-size: 0.8rem;
}
</style>
