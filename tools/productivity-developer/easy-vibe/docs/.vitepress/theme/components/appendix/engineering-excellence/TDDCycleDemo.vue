<template>
  <div class="tdd-cycle-demo">
    <div class="demo-label">{{ t('tddCycle.title') }}</div>

    <div class="cycle-visual">
      <div
        v-for="(phase, i) in phases"
        :key="phase.name"
        class="phase-node"
        :class="[phase.cls, { active: current === i }]"
      >
        <span class="phase-icon">{{ phase.icon }}</span>
        <span class="phase-name">{{ phase.name }}</span>
      </div>
    </div>

    <div class="step-card" :class="steps[step].cls">
      <div class="step-header">
        <span class="step-badge">{{ t('tddCycle.stepBadge', { current: step + 1, total: steps.length }) }}</span>
        <span class="step-phase">{{ steps[step].phase }}</span>
      </div>
      <div class="step-desc">{{ steps[step].desc }}</div>
      <div class="code-block">
        <div class="code-title">{{ steps[step].fileLabel }}</div>
        <pre><code>{{ steps[step].code }}</code></pre>
      </div>
      <div class="step-result" :class="steps[step].cls">
        {{ steps[step].result }}
      </div>
    </div>

    <div class="controls">
      <button class="btn" :disabled="step === 0" @click="step--">{{ t('tddCycle.previous') }}</button>
      <button class="btn primary" :disabled="step === steps.length - 1" @click="step++">{{ t('tddCycle.next') }}</button>
      <button class="btn" @click="step = 0">{{ t('tddCycle.reset') }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { engineeringExcellenceLocale } from '../../../locales/engineering-excellence/index.js'

const { t, messages } = useI18n(engineeringExcellenceLocale)
const step = ref(0)
const current = computed(() => {
  const s = steps.value[step.value]
  return s.cls === 'red' ? 0 : s.cls === 'green' ? 1 : 2
})

const phases = computed(() => messages.value.tddCycle.phases)
const steps = computed(() => messages.value.tddCycle.steps)
</script>

<style scoped>
.tdd-cycle-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
  text-align: center;
}

.cycle-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;
}

.phase-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  opacity: 0.4;
  transition: opacity 0.3s, transform 0.3s;
}

.phase-node.active { opacity: 1; transform: scale(1.15); }
.phase-node.red { background: #fee2e2; color: #991b1b; }
.phase-node.green { background: #d1fae5; color: #065f46; }
.phase-node.blue { background: #dbeafe; color: #1e40af; }

:root.dark .phase-node.red { background: #450a0a; color: #fca5a5; }
:root.dark .phase-node.green { background: #022c22; color: #6ee7b7; }
:root.dark .phase-node.blue { background: #172554; color: #93c5fd; }

.phase-icon { font-size: 1.4rem; }

.step-card {
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.step-card.red { border-color: #fca5a5; background: #fef2f2; }
.step-card.green { border-color: #6ee7b7; background: #ecfdf5; }
.step-card.blue { border-color: #93c5fd; background: #eff6ff; }

:root.dark .step-card.red { border-color: #7f1d1d; background: #1c0606; }
:root.dark .step-card.green { border-color: #065f46; background: #031c14; }
:root.dark .step-card.blue { border-color: #1e40af; background: #0c1529; }

.step-header { display: flex; align-items: center; gap: 8px; margin-bottom: 0.5rem; }

.step-badge {
  font-size: 0.72rem;
  padding: 2px 8px;
  border-radius: 10px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
}

.step-phase { font-weight: 600; font-size: 0.95rem; }
.step-desc { font-size: 0.85rem; color: var(--vp-c-text-2); margin-bottom: 0.6rem; }

.code-block {
  background: var(--vp-c-bg);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.code-title {
  font-size: 0.72rem;
  padding: 4px 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-3);
  border-bottom: 1px solid var(--vp-c-divider);
}

.code-block pre { margin: 0; padding: 10px; font-size: 0.82rem; line-height: 1.5; overflow-x: auto; }

.step-result { font-size: 0.85rem; font-weight: 600; padding: 6px 10px; border-radius: 4px; }
.step-result.red { color: #dc2626; }
.step-result.green { color: #059669; }
.step-result.blue { color: #2563eb; }

.controls { display: flex; gap: 8px; justify-content: center; }

.btn {
  padding: 6px 16px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.2s;
}

.btn:hover:not(:disabled) { background: var(--vp-c-bg-soft); }
.btn:disabled { opacity: 0.4; cursor: not-allowed; }
.btn.primary { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }
.btn.primary:hover:not(:disabled) { opacity: 0.9; }
</style>
