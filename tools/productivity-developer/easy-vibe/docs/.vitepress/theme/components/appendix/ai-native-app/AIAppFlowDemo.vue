<template>
  <div class="flow-demo">
    <div class="header">
      <div class="title">{{ t('flow.title') }}</div>
      <div class="subtitle">{{ t('flow.subtitle') }}</div>
    </div>

    <div class="pipeline">
      <div
        v-for="(step, idx) in steps"
        :key="step.id"
        :class="['pipe-step', {
          active: currentStep === idx,
          done: currentStep > idx
        }]"
      >
        <div class="step-icon">{{ currentStep > idx ? '✅' : step.icon }}</div>
        <div class="step-info">
          <div class="step-name">{{ step.name }}</div>
          <div class="step-en">{{ step.en }}</div>
        </div>
        <div v-if="idx < steps.length - 1" class="arrow">→</div>
      </div>
    </div>

    <div class="control-bar">
      <button
        v-if="!isRunning && currentStep < 0"
        class="action-btn"
        @click="startFlow"
      >
        ▶ {{ t('flow.send') }}
      </button>
      <button
        v-else-if="!isRunning && currentStep >= steps.length"
        class="action-btn reset"
        @click="resetFlow"
      >
        🔄 {{ t('common.reset') }}
      </button>
      <div v-else-if="isRunning" class="running-hint">
        ⏳ {{ t('flow.running') }}
      </div>
    </div>

    <div v-if="currentStep >= 0" class="detail-area">
      <div class="detail-card">
        <div class="detail-title">
          {{ activeStep.icon }} {{ activeStep.name }}
        </div>
        <div class="detail-desc">{{ activeStep.detail }}</div>

        <div class="io-section">
          <div class="io-block">
            <div class="io-label">{{ t('flow.inputLabel') }}</div>
            <pre class="io-code"><code>{{ activeStep.input }}</code></pre>
          </div>
          <div class="io-block">
            <div class="io-label">{{ t('flow.outputLabel') }}</div>
            <pre class="io-code"><code>{{ activeStep.output }}</code></pre>
          </div>
        </div>

        <div class="latency-bar">
          <span class="latency-label">{{ t('flow.latencyLabel') }}</span>
          <div class="latency-track">
            <div
              class="latency-fill"
              :style="{ width: activeStep.latencyPct + '%' }"
            />
          </div>
          <span class="latency-val">{{ activeStep.latency }}</span>
        </div>
      </div>
    </div>

    <div class="insight-bar">
      <span class="insight-label">💡 {{ t('flow.insightLabel') }}</span>
      <span class="insight-text">
        {{ t('flow.insight') }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { aiNativeAppLocale } from '../../../locales/ai-native-app/index.js'

const { t, messages } = useI18n(aiNativeAppLocale)
const steps = computed(() => messages.value.flow.steps)

const currentStep = ref(-1)
const isRunning = ref(false)

const activeStep = computed(() => {
  const idx = Math.min(currentStep.value, steps.value.length - 1)
  return idx >= 0 ? steps.value[idx] : steps.value[0]
})

const startFlow = async () => {
  isRunning.value = true
  for (let i = 0; i < steps.value.length; i++) {
    currentStep.value = i
    await new Promise(r => setTimeout(r, 1200))
  }
  currentStep.value = steps.value.length
  isRunning.value = false
}

const resetFlow = () => {
  currentStep.value = -1
  isRunning.value = false
}
</script>

<style scoped>
.flow-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px; padding: 20px; margin: 20px 0;
}
.header { text-align: center; margin-bottom: 16px; }
.title {
  font-size: 17px; font-weight: 700;
  background: linear-gradient(120deg, #10b981, #3b82f6);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.subtitle { font-size: 12px; color: var(--vp-c-text-2); margin-top: 4px; }

.pipeline {
  display: flex; align-items: center; justify-content: center;
  gap: 4px; flex-wrap: wrap; margin-bottom: 16px;
}
.pipe-step {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 12px; border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); transition: all 0.3s;
  font-size: 12px;
}
.pipe-step.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}
.pipe-step.done {
  border-color: #86efac; background: #f0fdf4;
}
.step-icon { font-size: 18px; }
.step-name { font-weight: 600; font-size: 12px; }
.step-en { font-size: 10px; color: var(--vp-c-text-3); }
.arrow { color: var(--vp-c-text-3); font-size: 14px; margin: 0 2px; }

.control-bar { text-align: center; margin-bottom: 16px; }
.action-btn {
  padding: 10px 28px; background: var(--vp-c-brand);
  color: white; border: none; border-radius: 8px;
  font-size: 13px; cursor: pointer; transition: background 0.2s;
}
.action-btn:hover { background: var(--vp-c-brand-dark); }
.action-btn.reset { background: #6b7280; }
.action-btn.reset:hover { background: #4b5563; }
.running-hint { color: var(--vp-c-brand); font-size: 13px; }

.detail-area { margin-bottom: 16px; }
.detail-card {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 12px; padding: 16px;
}
.detail-title { font-weight: 700; font-size: 15px; margin-bottom: 8px; }
.detail-desc {
  color: var(--vp-c-text-2); font-size: 13px;
  line-height: 1.7; margin-bottom: 12px;
}

.io-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 10px; margin-bottom: 12px;
}
.io-label { font-weight: 600; font-size: 11px; margin-bottom: 4px; color: var(--vp-c-text-2); }
.io-code {
  margin: 0; background: #0b1221; color: #e5e7eb;
  border-radius: 8px; padding: 10px;
  font-family: var(--vp-font-family-mono);
  font-size: 11px; overflow-x: auto; white-space: pre-wrap;
}

.latency-bar {
  display: flex; align-items: center; gap: 10px;
}
.latency-label { font-size: 11px; font-weight: 600; color: var(--vp-c-text-2); }
.latency-track {
  flex: 1; height: 8px; background: var(--vp-c-bg-soft);
  border-radius: 4px; overflow: hidden;
}
.latency-fill {
  height: 100%; border-radius: 4px;
  background: var(--vp-c-brand); transition: width 0.5s;
}
.latency-val { font-size: 11px; font-weight: 600; min-width: 80px; text-align: right; }

.insight-bar {
  padding: 12px 16px; background: var(--vp-c-brand-soft);
  border-radius: 6px; font-size: 13px;
}
.insight-label { font-weight: 600; color: var(--vp-c-brand-dark); }
.insight-text { color: var(--vp-c-text-1); }
</style>
