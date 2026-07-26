<template>
  <div class="os-workflow-demo">
    <div class="demo-label">{{ t('openSourceWorkflow.title') }}</div>

    <div class="steps-bar">
      <div
        v-for="(s, i) in steps"
        :key="i"
        class="step"
        :class="{ active: current === i, done: i < current }"
        @click="current = i"
      >
        <span class="step-dot">{{ i < current ? '✓' : i + 1 }}</span>
        <span class="step-label">{{ s.name }}</span>
      </div>
    </div>

    <div class="detail-card">
      <h4>{{ steps[current].icon }} {{ steps[current].name }}</h4>
      <p>{{ steps[current].desc }}</p>
      <div v-if="steps[current].cmd" class="cmd-block">
        <div class="cmd-title">{{ t('openSourceWorkflow.commandTitle') }}</div>
        <pre><code>{{ steps[current].cmd }}</code></pre>
      </div>
    </div>

    <div class="controls">
      <button class="btn" :disabled="current === 0" @click="current--">{{ t('openSourceWorkflow.previous') }}</button>
      <button class="btn primary" :disabled="current === steps.length - 1" @click="current++">{{ t('openSourceWorkflow.next') }}</button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { engineeringExcellenceLocale } from '../../../locales/engineering-excellence/index.js'

const { t, messages } = useI18n(engineeringExcellenceLocale)
const current = ref(0)
const steps = computed(() => messages.value.openSourceWorkflow.steps)
</script>

<style scoped>
.os-workflow-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}
.demo-label { font-size: 0.78rem; font-weight: bold; color: var(--vp-c-text-2); margin-bottom: 1rem; text-align: center; }

.steps-bar { display: flex; gap: 2px; margin-bottom: 1rem; overflow-x: auto; }
.step { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 6px 8px; border-radius: 6px; cursor: pointer; min-width: 56px; transition: all 0.2s; }
.step:hover { background: var(--vp-c-bg); }
.step.active { background: var(--vp-c-brand-soft); }
.step-dot { width: 24px; height: 24px; border-radius: 50%; border: 2px solid var(--vp-c-divider); display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: 600; transition: all 0.2s; }
.step.active .step-dot { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }
.step.done .step-dot { background: #10b981; color: #fff; border-color: #10b981; }
.step-label { font-size: 0.7rem; color: var(--vp-c-text-3); white-space: nowrap; }
.step.active .step-label { color: var(--vp-c-brand); font-weight: 600; }

.detail-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; padding: 1rem; background: var(--vp-c-bg); margin-bottom: 1rem; }
.detail-card h4 { margin: 0 0 0.5rem; font-size: 1rem; }
.detail-card p { font-size: 0.85rem; color: var(--vp-c-text-2); margin: 0 0 0.6rem; }
.cmd-block { border-radius: 6px; overflow: hidden; }
.cmd-title { font-size: 0.72rem; padding: 4px 10px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-3); border-bottom: 1px solid var(--vp-c-divider); }
.cmd-block pre { margin: 0; padding: 8px; font-size: 0.8rem; line-height: 1.5; overflow-x: auto; background: var(--vp-c-bg-soft); }

.controls { display: flex; gap: 8px; justify-content: center; }
.btn { padding: 6px 16px; border-radius: 6px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); color: var(--vp-c-text-1); cursor: pointer; font-size: 0.85rem; }
.btn:hover:not(:disabled) { background: var(--vp-c-bg-soft); }
.btn:disabled { opacity: 0.4; cursor: not-allowed; }
.btn.primary { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }
</style>
