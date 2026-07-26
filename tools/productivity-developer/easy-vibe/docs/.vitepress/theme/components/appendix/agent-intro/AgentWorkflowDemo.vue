<template>
  <div class="workflow">
    <div class="header">
      <div>
        <div class="title">
          {{ t('workflow.title') }}
        </div>
        <div class="subtitle">
          {{ t('workflow.subtitle') }}
        </div>
      </div>
      <div class="actions">
        <button
          class="btn"
          @click="reset"
        >
          {{ t('workflow.reset') }}
        </button>
        <button
          class="btn primary"
          @click="nextRound"
        >
          {{ t('workflow.nextRound', { round }) }}
        </button>
      </div>
    </div>

    <div class="cycle">
      <button
        v-for="s in steps"
        :key="s.id"
        :class="['step', { active: currentStep === s.id }]"
        @click="currentStep = s.id"
      >
        <span class="icon">{{ s.icon }}</span>
        <span class="name">{{ s.name }}</span>
      </button>
    </div>

    <div class="panels">
      <div class="panel">
        <div class="panel-title">
          {{ t('workflow.taskTitle') }}
        </div>
        <div class="panel-body">
          {{ t('workflow.task') }}
        </div>
      </div>
      <div class="panel">
        <div class="panel-title">
          {{ t('workflow.roundTitle') }}
        </div>
        <div class="panel-body">
          {{ detail }}
        </div>
      </div>
    </div>

    <div class="log">
      <div class="log-title">
        {{ t('workflow.logTitle') }}
      </div>
      <pre><code>{{ logText }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { agentIntroLocale } from '../../../locales/agent-intro/index.js'

const { t, messages } = useI18n(agentIntroLocale)
const steps = computed(() => messages.value.workflow.steps)
const scenarios = computed(() => messages.value.workflow.scenarios)

const round = ref(1)
const currentStep = ref('observe')

const current = computed(() => scenarios.value[round.value - 1])

const detail = computed(() => current.value[currentStep.value])

const logText = computed(() => {
  const logs = []
  for (let i = 0; i < round.value; i++) {
    logs.push(`--- Round ${i + 1} ---`)
    logs.push(`OBS: ${scenarios.value[i].observe}`)
    logs.push(`PLAN: ${scenarios.value[i].plan}`)
    logs.push(`ACT: ${scenarios.value[i].act}`)
    logs.push(`CHECK: ${scenarios.value[i].check}`)
    logs.push('')
  }
  return logs.join('\n')
})

const nextRound = () => {
  if (round.value >= 3) return
  round.value++
  currentStep.value = 'observe'
}

const reset = () => {
  round.value = 1
  currentStep.value = 'observe'
}
</script>

<style scoped>
.workflow {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 16px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.title {
  font-weight: 800;
}
.subtitle {
  color: var(--vp-c-text-2);
  font-size: 13px;
}
.actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.btn {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
}
.btn.primary {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.cycle {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
}
.step {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 10px 12px;
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  text-align: left;
}
.step.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
}
.icon {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: grid;
  place-items: center;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}
.name {
  font-weight: 800;
}

.panels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
}
.panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px;
}
.panel-title {
  font-weight: 700;
  margin-bottom: 6px;
}
.panel-body {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.log {
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px;
}
.log-title {
  font-weight: 700;
  margin-bottom: 8px;
}
pre {
  margin: 0;
  background: #0b1221;
  color: #e5e7eb;
  border-radius: 10px;
  padding: 12px;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  overflow-x: auto;
  white-space: pre-wrap;
}
</style>
