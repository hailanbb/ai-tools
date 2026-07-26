<template>
  <div class="design-steps-demo">
    <div class="header">
      <div class="title">{{ t('stepsDemo.title') }}</div>
      <div class="subtitle">{{ t('stepsDemo.subtitle') }}</div>
    </div>

    <div class="steps">
      <div
        v-for="(step, i) in steps"
        :key="step.key"
        :class="['step-card', { active: activeStep === step.key }]"
        @click="activeStep = step.key"
      >
        <div class="step-number">{{ i + 1 }}</div>
        <div class="step-name">{{ step.name }}</div>
        <div class="step-time">{{ step.time }}</div>
      </div>
    </div>

    <div v-if="current" class="detail-panel">
      <div class="detail-title">{{ current.name }}</div>
      <div class="detail-desc">{{ current.desc }}</div>
      <div class="checklist">
        <div v-for="(item, i) in current.checklist" :key="i" class="check-item">
          <span class="check-icon">✓</span>
          <span>{{ item }}</span>
        </div>
      </div>
      <div class="detail-example">
        <span class="label">{{ t('stepsDemo.exampleLabel') }}</span>
        <div class="example-text">{{ current.example }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { systemDesignMethodologyLocale } from '../../../locales/system-design-methodology/index.js'

const { t, messages } = useI18n(systemDesignMethodologyLocale)

const activeStep = ref('requirements')

const steps = computed(() => messages.value.stepsDemo.steps)

const current = computed(() => steps.value.find(s => s.key === activeStep.value))
</script>

<style scoped>
.design-steps-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}
@media (max-width: 640px) {
  .steps { grid-template-columns: repeat(2, 1fr); }
}
.step-card {
  padding: 0.6rem;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
}
.step-card:hover { border-color: var(--vp-c-brand); }
.step-card.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.05);
}
.step-number {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--vp-c-brand);
}
.step-name { font-weight: 600; font-size: 0.85rem; }
.step-time {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}
.detail-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}
.detail-title {
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 0.4rem;
}
.detail-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}
.checklist {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 0.75rem;
}
.check-item {
  font-size: 0.8rem;
  display: flex;
  gap: 0.4rem;
  align-items: flex-start;
}
.check-icon {
  color: var(--vp-c-brand);
  font-weight: 700;
  flex-shrink: 0;
}
.detail-example {
  font-size: 0.82rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}
.example-text {
  color: var(--vp-c-text-2);
  margin-top: 0.25rem;
}
.label { font-weight: 600; color: var(--vp-c-text-2); }
</style>
