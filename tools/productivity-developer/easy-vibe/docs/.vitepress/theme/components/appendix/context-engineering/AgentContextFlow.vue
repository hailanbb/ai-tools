<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { contextEngineeringLocale } from '../../../locales/context-engineering/index.js'

const { t } = useI18n(contextEngineeringLocale)

const round = ref(1)
const maxRound = 20
const windowLimit = 4000 

const systemPromptTokens = 1000 
const tokensPerRound = 300 
const costPer1kTokens = 0.002 

const historyTokens = computed(() => (round.value - 1) * tokensPerRound)
const currentInputTokens = 200 
const totalTokens = computed(() => systemPromptTokens + historyTokens.value + currentInputTokens)

const isOverflow = computed(() => totalTokens.value > windowLimit)
const overflowAmount = computed(() => Math.max(0, totalTokens.value - windowLimit))
const forgottenRounds = computed(() => Math.floor(overflowAmount.value / tokensPerRound))

const currentCost = computed(() => (totalTokens.value / 1000 * costPer1kTokens).toFixed(4))

const systemHeight = computed(() => (systemPromptTokens / windowLimit) * 100)
const inputHeight = computed(() => (currentInputTokens / windowLimit) * 100)
const historyHeight = computed(() => (historyTokens.value / windowLimit) * 100)
</script>

<template>
  <div class="agent-context-flow">
    <div class="control-panel">
      <div class="stat-group">
        <div class="stat-item">
          <span class="value">{{ round }}</span>
          <span class="label">{{ t('agentContextFlow.currentRound') }}</span>
        </div>
        <div class="stat-divider" />
        <div class="stat-item">
          <span
            class="value"
            :class="{ error: isOverflow }"
          >{{ totalTokens }}</span>
          <span class="label">{{ t('agentContextFlow.tokenUsage') }}</span>
        </div>
        <div class="stat-divider" />
        <div class="stat-item">
          <span class="value">${{ currentCost }}</span>
          <span class="label">{{ t('agentContextFlow.currentCost') }}</span>
        </div>
      </div>
    </div>

    <div class="visualization-area">
      <div class="overflow-zone">
        <transition name="fade">
          <div
            v-if="isOverflow"
            class="overflow-badge"
          >
            <span class="icon">🗑️</span>
            <span>{{ t('agentContextFlow.overflow', { count: forgottenRounds }) }}</span>
          </div>
          <div
            v-else
            class="safe-badge"
          >
            <span class="icon">✅</span>
            <span>{{ t('agentContextFlow.safe') }}</span>
          </div>
        </transition>
      </div>

      <div class="window-frame">
        <div class="limit-line">
          <span>{{ t('agentContextFlow.limit', { limit: windowLimit }) }}</span>
        </div>

        <div class="stack-container">
          <div
            class="block system"
            :style="{ height: `${systemHeight}%` }"
          >
            <span class="block-text">{{ t('agentContextFlow.systemPrompt', { tokens: systemPromptTokens }) }}</span>
          </div>

          <div
            class="block history"
            :style="{ height: `${historyHeight}%` }"
          >
            <span
              v-if="historyHeight > 10"
              class="block-text"
            >
              {{ t('agentContextFlow.history', { count: round - 1 }) }}
            </span>
          </div>

          <div
            class="block input"
            :style="{ height: `${inputHeight}%` }"
          >
            <span class="block-text">{{ t('agentContextFlow.newInput') }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="input-section">
      <div class="slider-wrapper">
        <span class="slider-hint">{{ t('agentContextFlow.sliderHint') }}</span>
        <input 
          v-model.number="round" 
          type="range" 
          min="1" 
          :max="maxRound" 
          class="custom-slider"
        >
        <div class="slider-labels">
          <span>{{ t('agentContextFlow.firstRound') }}</span>
          <span>{{ t('agentContextFlow.maxRound', { round: maxRound }) }}</span>
        </div>
      </div>
      
      <div class="info-box">
        <p v-if="!isOverflow">
          💡 <strong>{{ t('agentContextFlow.normalStrong') }}</strong>：{{ t('agentContextFlow.normal', { total: totalTokens }) }}
        </p>
        <p
          v-else
          class="warning-text"
        >
          ⚠️ <strong>{{ t('agentContextFlow.warningStrong') }}</strong>：{{ t('agentContextFlow.warning', { total: totalTokens, limit: windowLimit, count: forgottenRounds }) }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.agent-context-flow {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
  margin: 0.5rem 0;
}

.control-panel {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.stat-group {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-item .value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
}

.stat-item .value.error {
  color: var(--vp-c-red);
}

.stat-item .label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.stat-divider {
  width: 1px;
  height: 2rem;
  background-color: var(--vp-c-divider);
}

.visualization-area {
  padding: 1rem 2rem;
  background-color: var(--vp-c-bg-alt);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.overflow-zone {
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overflow-badge {
  color: var(--vp-c-red);
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--vp-c-red-dimm);
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
}

.safe-badge {
  color: var(--vp-c-green);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.window-frame {
  width: 100%;
  max-width: 300px;
  height: 300px;
  border: 2px solid var(--vp-c-divider);
  border-top: 2px dashed var(--vp-c-red);
  border-radius: 0 0 8px 8px;
  background: var(--vp-c-bg);
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  overflow: visible;
}

.limit-line {
  position: absolute;
  top: -12px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}

.limit-line span {
  background: var(--vp-c-red);
  color: white;
  font-size: 0.75rem;
  padding: 0 8px;
  border-radius: 10px;
}

.stack-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
}

.block {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.block-text {
  z-index: 1;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.block.system {
  background-color: #10b981; /* Green */
  flex-shrink: 0;
}

.block.history {
  background-color: #3b82f6; /* Blue */
}

.block.input {
  background-color: #f59e0b; /* Amber */
  flex-shrink: 0;
}

.input-section {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.slider-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.slider-hint {
  font-size: 0.9rem;
  font-weight: 600;
}

.custom-slider {
  width: 100%;
  accent-color: var(--vp-c-brand);
  cursor: pointer;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.info-box {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.info-box p {
  margin: 0;
}

.warning-text {
  color: var(--vp-c-red-text);
}

@media (max-width: 640px) {
  .stat-group {
    gap: 0.5rem;
  }
  .stat-item .value {
    font-size: 1.2rem;
  }
  .window-frame {
    height: 250px;
  }
}
</style>
