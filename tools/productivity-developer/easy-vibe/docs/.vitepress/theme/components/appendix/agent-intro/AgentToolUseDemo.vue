<template>
  <div class="tool-use-demo">
    <div class="header">
      <div class="title">
        {{ t('toolUse.title') }}
      </div>
    </div>

    <div class="scenario-tabs">
      <button
        v-for="s in scenarios"
        :key="s.id"
        :class="['tab-btn', { active: currentScenario === s.id }]"
        @click="selectScenario(s.id)"
      >
        <span>{{ s.icon }}</span>
        <span>{{ s.name }}</span>
      </button>
    </div>

    <div class="user-input-bar">
      <span class="label">👤</span>
      <span class="text">"{{ currentData.userInput }}"</span>
    </div>

    <div
      ref="flowRowRef"
      class="flow-row"
    >
      <div
        class="flow-card"
        :class="{ active: currentStep >= 1 }"
      >
        <div class="card-num">
          1
        </div>
        <div class="card-body">
          <div class="card-title">
            {{ t('toolUse.steps.analyze') }}
          </div>
          <div
            v-if="currentStep >= 1"
            class="card-content"
          >
            <div class="intent-box">
              <div class="intent-label">
                {{ t('toolUse.labels.userWants') }}
              </div>
              <div class="intent-value">
                {{ currentData.intent.type }}
              </div>
            </div>
            <div class="extract-box">
              <div class="extract-label">
                {{ t('toolUse.labels.extracted') }}
              </div>
              <div class="extract-tags">
                <span
                  v-for="(e, i) in currentData.intent.entities"
                  :key="i"
                  class="entity"
                >{{ e }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flow-arrow"
        :class="{ active: currentStep >= 2 }"
      >
        →
      </div>

      <div
        class="flow-card"
        :class="{ active: currentStep >= 2 }"
      >
        <div class="card-num">
          2
        </div>
        <div class="card-body">
          <div class="card-title">
            {{ t('toolUse.steps.choose') }}
          </div>
          <div
            v-if="currentStep >= 2"
            class="card-content"
          >
            <div class="tool-list">
              <div
                v-for="tool in currentData.availableTools.slice(0, 2)"
                :key="tool.name"
                class="tool-mini"
                :class="{ selected: tool.selected }"
              >
                <span>{{ tool.icon }}</span>
                <span class="tool-name">{{ tool.name }}</span>
                <span
                  v-if="tool.selected"
                  class="check"
                >✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flow-arrow"
        :class="{ active: currentStep >= 3 }"
      >
        →
      </div>

      <div
        class="flow-card"
        :class="{ active: currentStep >= 3 }"
      >
        <div class="card-num">
          3
        </div>
        <div class="card-body">
          <div class="card-title">
            {{ t('toolUse.steps.params') }}
          </div>
          <div
            v-if="currentStep >= 3"
            class="card-content"
          >
            <code class="params-code">{{ JSON.stringify(currentData.finalParams.params) }}</code>
          </div>
        </div>
      </div>

      <div
        class="flow-arrow"
        :class="{ active: currentStep >= 4 }"
      >
        →
      </div>

      <div
        class="flow-card"
        :class="{ active: currentStep >= 4 }"
      >
        <div class="card-num">
          4
        </div>
        <div class="card-body">
          <div class="card-title">
            {{ t('toolUse.steps.execute') }}
          </div>
          <div
            v-if="currentStep >= 4"
            class="card-content"
          >
            <div class="exec-flow">
              <span class="from">Agent</span>
              <span class="arrow">→</span>
              <span class="to">{{ currentData.selectedTool }}</span>
              <span class="arrow">→</span>
              <span class="from">{{ t('toolUse.labels.result') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="currentStep >= 4"
      class="final-result"
    >
      <span class="result-label">{{ t('toolUse.labels.response') }}</span>
      <span class="result-text">{{ currentData.finalResponse }}</span>
    </div>

    <div class="control-bar">
      <button
        v-if="currentStep === 0"
        class="ctrl-btn primary"
        @click="nextStep"
      >
        {{ t('toolUse.buttons.start') }}
      </button>
      <button
        v-else-if="currentStep < 4"
        class="ctrl-btn primary"
        @click="nextStep"
      >
        {{ t('toolUse.buttons.next') }}
      </button>
      <button
        v-else
        class="ctrl-btn"
        @click="reset"
      >
        {{ t('toolUse.buttons.reset') }}
      </button>
      
      <div class="step-dots">
        <span
          v-for="n in 4"
          :key="n"
          :class="['dot', { active: currentStep >= n }]"
        />
      </div>
    </div>

    <div class="tip-bar">
      <span>💡</span>
      <span>{{ t('toolUse.tip') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

import { useI18n } from '../../../composables/useI18n.js'
import { agentIntroLocale } from '../../../locales/agent-intro/index.js'

const { t, messages } = useI18n(agentIntroLocale)
const scenarios = computed(() => messages.value.toolUse.scenarios)

const currentScenario = ref('weather')
const currentStep = ref(0)

const currentData = computed(() => scenarios.value.find(s => s.id === currentScenario.value))

const selectScenario = (id) => {
  currentScenario.value = id
  reset()
}

const flowRowRef = ref(null)

const nextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++
    nextTick(() => {
      if (flowRowRef.value) {
        const cards = flowRowRef.value.querySelectorAll('.flow-card')
        const currentCard = cards[currentStep.value - 1]
        if (currentCard) {
          currentCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
        }
      }
    })
  }
}
const reset = () => { currentStep.value = 0 }
</script>

<style scoped>
.tool-use-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 16px;
}

.title {
  font-size: 17px;
  font-weight: 700;
  background: linear-gradient(120deg, var(--vp-c-brand), #9c27b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.scenario-tabs {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.tab-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
}

.user-input-bar {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 10px 14px;
  margin-bottom: 16px;
  font-size: 14px;
}

.user-input-bar .label { margin-right: 8px; }
.user-input-bar .text { font-weight: 600; color: var(--vp-c-text-1); }

.flow-row {
  display: flex;
  align-items: stretch;
  gap: 8px;
  margin-bottom: 16px;
  overflow-x: auto;
}

@media (max-width: 768px) {
  .flow-row {
    flex-direction: column;
  }
  .flow-arrow {
    transform: rotate(90deg);
  }
}

.flow-card {
  flex: 1;
  min-width: 140px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 12px;
  opacity: 0.4;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
}

.flow-card.active {
  opacity: 1;
  border-color: var(--vp-c-brand);
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.card-num {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--vp-c-bg-mute);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 8px;
}

.flow-card.active .card-num {
  background: var(--vp-c-brand);
  color: white;
}

.card-title {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}

.card-content {
  font-size: 12px;
}

.intent-box {
  margin-bottom: 8px;
}

.intent-label {
  font-size: 10px;
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}

.intent-value {
  display: inline-block;
  padding: 4px 10px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.extract-box {
  margin-top: 8px;
}

.extract-label {
  font-size: 10px;
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}

.extract-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.entity {
  padding: 3px 8px;
  background: #fef3c7;
  border: 1px solid #fde68a;
  border-radius: 4px;
  font-size: 11px;
  color: #92400e;
  font-weight: 500;
}

.tool-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tool-mini {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 11px;
}

.tool-mini.selected {
  background: #dcfce7;
  border: 1px solid #86efac;
}

.tool-name { flex: 1; }
.check { color: #16a34a; font-weight: 700; }

.params-code {
  display: block;
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 8px;
  border-radius: 6px;
  font-size: 10px;
  overflow-x: auto;
  white-space: nowrap;
}

.exec-flow {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  flex-wrap: wrap;
}

.from, .to {
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 600;
}

.from { background: var(--vp-c-brand-soft); color: var(--vp-c-brand-dark); }
.to { background: #fef3c7; color: #92400e; }
.arrow { color: var(--vp-c-text-3); }

.flow-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-divider);
  font-size: 18px;
  transition: all 0.3s;
}

.flow-arrow.active { color: var(--vp-c-brand); }

.final-result {
  background: var(--vp-c-brand-soft);
  border-left: 3px solid var(--vp-c-brand);
  border-radius: 6px;
  padding: 12px 14px;
  margin-bottom: 16px;
  font-size: 13px;
}

.result-label { font-weight: 600; margin-right: 8px; }
.result-text { color: var(--vp-c-text-1); }

.control-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.ctrl-btn {
  padding: 8px 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
}

.ctrl-btn.primary {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.step-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--vp-c-divider);
}

.dot.active { background: var(--vp-c-brand); }

.tip-bar {
  display: flex;
  gap: 8px;
  padding: 10px 14px;
  background: var(--vp-c-brand-soft);
  border-radius: 6px;
  font-size: 12px;
  color: var(--vp-c-text-1);
}
</style>
