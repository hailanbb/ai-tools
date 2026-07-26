<template>
  <div class="alert-escalation-demo">
    <div class="header">
      <div class="title">{{ t('escalation.title') }}</div>
      <div class="subtitle">{{ t('escalation.subtitle') }}</div>
    </div>

    <div class="scenario-select">
      <button
        v-for="s in scenarios"
        :key="s.id"
        :class="['scenario-btn', { active: activeScenario === s.id }]"
        @click="startScenario(s.id)"
      >
        {{ s.name }}
      </button>
    </div>

    <div class="escalation-flow">
      <div
        v-for="(step, index) in escalationSteps"
        :key="step.id"
        :class="[
          'esc-step',
          {
            active: currentStep === index,
            completed: currentStep > index,
            pending: currentStep < index
          }
        ]"
      >
        <div class="esc-left">
          <div class="esc-icon" :style="{ background: step.color }">
            {{ step.icon }}
          </div>
          <div v-if="index < escalationSteps.length - 1" class="esc-line">
            <div
              class="esc-line-fill"
              :class="{ filled: currentStep > index }"
            ></div>
          </div>
        </div>
        <div class="esc-content">
          <div class="esc-header">
            <span class="esc-title">{{ step.title }}</span>
            <span class="esc-time">{{ step.time }}</span>
          </div>
          <div class="esc-desc">{{ step.desc }}</div>
          <div v-if="step.action && currentStep >= index" class="esc-action">
            {{ step.action }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeScenario" class="timer-bar">
      <div class="timer-label">
        {{ t('escalation.progress', { current: currentStep + 1, total: escalationSteps.length }) }}
      </div>
      <div class="timer-track">
        <div
          class="timer-fill"
          :style="{
            width: ((currentStep + 1) / escalationSteps.length) * 100 + '%'
          }"
        ></div>
      </div>
      <div class="timer-controls">
        <button
          class="ctrl-btn"
          :disabled="currentStep <= 0"
          @click="prevStep"
        >
          {{ t('escalation.prev') }}
        </button>
        <button
          class="ctrl-btn"
          :disabled="currentStep >= escalationSteps.length - 1"
          @click="nextStep"
        >
          {{ t('escalation.next') }}
        </button>
      </div>
    </div>

    <div class="rule-box">
      <div class="rule-title">{{ t('escalation.rulesTitle') }}</div>
      <div class="rules">
        <div v-for="rule in messages.escalation.rules" :key="rule.text" class="rule-item">
          <span class="rule-dot" :style="{ background: rule.color }"></span>
          <span>{{ rule.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { incidentResponseLocale } from '../../../locales/incident-response/index.js'

const activeScenario = ref(null)
const currentStep = ref(0)
const { t, messages } = useI18n(incidentResponseLocale)

const scenarios = computed(() => messages.value.escalation.scenarios)
const scenarioSteps = computed(() => messages.value.escalation.scenarioSteps)

const escalationSteps = computed(() => {
  if (!activeScenario.value) return scenarioSteps.value.p0
  return scenarioSteps.value[activeScenario.value]
})

const startScenario = (id) => {
  activeScenario.value = id
  currentStep.value = 0
}

const nextStep = () => {
  if (currentStep.value < escalationSteps.value.length - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}
</script>

<style scoped>
.alert-escalation-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.header { margin-bottom: 1.5rem; }
.title { font-weight: 700; font-size: 1.1rem; margin-bottom: 0.25rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }

.scenario-select {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.scenario-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.scenario-btn:hover { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }
.scenario-btn.active { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }

.escalation-flow {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

.esc-step {
  display: flex;
  gap: 1rem;
  opacity: 0.4;
  transition: all 0.3s;
}

.esc-step.active,
.esc-step.completed { opacity: 1; }

.esc-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.esc-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: #fff;
  z-index: 1;
}

.esc-line {
  width: 3px;
  flex: 1;
  min-height: 20px;
  background: var(--vp-c-divider);
  margin: 4px 0;
}

.esc-line-fill {
  width: 100%;
  height: 0;
  background: var(--vp-c-brand);
  transition: height 0.5s;
}

.esc-line-fill.filled { height: 100%; }

.esc-content {
  padding-bottom: 1rem;
  flex: 1;
}

.esc-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.25rem;
}

.esc-title { font-weight: 600; font-size: 0.95rem; }
.esc-time { font-size: 0.8rem; color: var(--vp-c-text-3); font-family: monospace; }
.esc-desc { font-size: 0.85rem; color: var(--vp-c-text-2); margin-bottom: 0.3rem; }

.esc-action {
  font-size: 0.85rem;
  padding: 0.4rem 0.6rem;
  background: rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.08);
  border-radius: 4px;
  border-left: 3px solid var(--vp-c-brand);
  color: var(--vp-c-text-1);
}

.timer-bar {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.timer-label { font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem; }

.timer-track {
  height: 6px;
  background: var(--vp-c-divider);
  border-radius: 3px;
  margin-bottom: 0.75rem;
  overflow: hidden;
}

.timer-fill {
  height: 100%;
  background: var(--vp-c-brand);
  border-radius: 3px;
  transition: width 0.3s;
}

.timer-controls { display: flex; gap: 0.5rem; }

.ctrl-btn {
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.ctrl-btn:hover:not(:disabled) { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }
.ctrl-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.rule-box {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.rule-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.75rem; }
.rules { display: flex; flex-direction: column; gap: 0.5rem; }

.rule-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.rule-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .scenario-select { flex-direction: column; }
  .scenario-btn { width: 100%; }
}
</style>
