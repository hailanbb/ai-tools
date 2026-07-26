<template>
  <div class="risk">
    <div class="header">
      <div>
        <div class="title">
          {{ t('challenges.title') }}
        </div>
        <div class="subtitle">
          {{ t('challenges.subtitle') }}
        </div>
      </div>
      <div
        class="score"
        :class="scoreClass"
      >
        {{ t('challenges.score', { score }) }}
      </div>
    </div>

    <div class="controls">
      <label class="toggle"><input
        v-model="maxSteps"
        type="checkbox"
      >
        {{ t('challenges.toggles.maxSteps') }}</label>
      <label class="toggle"><input
        v-model="budget"
        type="checkbox"
      > {{ t('challenges.toggles.budget') }}</label>
      <label class="toggle"><input
        v-model="confirm"
        type="checkbox"
      > {{ t('challenges.toggles.confirm') }}</label>
      <label class="toggle"><input
        v-model="sandbox"
        type="checkbox"
      > {{ t('challenges.toggles.sandbox') }}</label>
    </div>

    <div class="grid">
      <div class="card">
        <div class="k">
          {{ t('challenges.risksTitle') }}
        </div>
        <ul>
          <li
            v-for="risk in risks"
            :key="risk"
          >
            {{ risk }}
          </li>
        </ul>
      </div>
      <div class="card">
        <div class="k">
          {{ t('challenges.enabledTitle') }}
        </div>
        <div class="v">
          {{ enabledList }}
        </div>
        <div class="note">
          {{ t('challenges.note') }}
        </div>
      </div>
      <div class="card">
        <div class="k">
          {{ t('challenges.adviceTitle') }}
        </div>
        <div class="v">
          {{ advice }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { agentIntroLocale } from '../../../locales/agent-intro/index.js'

const { t, messages } = useI18n(agentIntroLocale)
const maxSteps = ref(true)
const budget = ref(false)
const confirm = ref(true)
const sandbox = ref(false)
const risks = computed(() => messages.value.challenges.risks)

const score = computed(() => {
  let s = 85
  if (maxSteps.value) s -= 18
  if (budget.value) s -= 15
  if (confirm.value) s -= 22
  if (sandbox.value) s -= 18
  return Math.max(0, s)
})

const scoreClass = computed(() => {
  if (score.value <= 35) return 'good'
  if (score.value <= 60) return 'mid'
  return 'bad'
})

const enabledList = computed(() => {
  const items = []
  const names = messages.value.challenges.enabledNames
  if (maxSteps.value) items.push(names.maxSteps)
  if (budget.value) items.push(names.budget)
  if (confirm.value) items.push(names.confirm)
  if (sandbox.value) items.push(names.sandbox)
  return items.length
    ? items.join(messages.value.challenges.joiner)
    : messages.value.challenges.noneEnabled
})

const advice = computed(() => {
  const adviceText = messages.value.challenges.advice
  if (!maxSteps.value && !confirm.value)
    return adviceText.baseline
  if (score.value <= 35) return adviceText.good
  if (score.value <= 60) return adviceText.mid
  return adviceText.bad
})
</script>

<style scoped>
.risk {
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
  align-items: center;
}
.title {
  font-weight: 800;
}
.subtitle {
  color: var(--vp-c-text-2);
  font-size: 13px;
}
.score {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 8px 12px;
  font-weight: 900;
}
.score.good {
  color: #22c55e;
  border-color: rgba(34, 197, 94, 0.4);
}
.score.mid {
  color: #f59e0b;
  border-color: rgba(245, 158, 11, 0.4);
}
.score.bad {
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.4);
}

.controls {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 10px 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.toggle {
  display: flex;
  gap: 8px;
  align-items: center;
}
input {
  accent-color: var(--vp-c-brand);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}
.card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px;
}
.k {
  font-weight: 900;
  margin-bottom: 6px;
}
.v {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.note {
  margin-top: 6px;
  color: var(--vp-c-text-3);
  font-size: 12px;
}
ul {
  margin: 0;
  padding-left: 18px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>
