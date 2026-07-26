<template>
  <div class="backend-demo">
    <div class="demo-header">
      <span class="title">{{ t('computerOrganization.vibeCodingFullstack.backendCore.title') }}</span>
      <span class="subtitle">{{ t('computerOrganization.vibeCodingFullstack.backendCore.subtitle') }}</span>
    </div>

    <div class="core-grid">
      <div v-for="core in coreConcepts" :key="core.name" class="core-card">
        <div class="core-name">{{ core.name }}</div>
        <div class="core-desc">{{ core.desc }}</div>
        <div class="core-examples">
          <span v-for="ex in core.examples" :key="ex" class="example-tag">{{ ex }}</span>
        </div>
      </div>
    </div>

    <div class="flow-section">
      <div class="flow-title">{{ t('computerOrganization.vibeCodingFullstack.backendCore.flowTitle') }}</div>
      <div class="flow-steps">
        <span v-for="(step, i) in flowSteps" :key="step">
          <span class="flow-step">{{ step }}</span>
          <span v-if="i < flowSteps.length - 1" class="flow-arrow">→</span>
        </span>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ t('computerOrganization.vibeCodingFullstack.backendCore.valueLabel') }}</strong>{{ t('computerOrganization.vibeCodingFullstack.backendCore.value') }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals/index.js'

const { t, messages } = useI18n(computerFundamentalsLocale)

const coreConcepts = computed(() => messages.value.computerOrganization.vibeCodingFullstack.backendCore.coreConcepts)
const flowSteps = computed(() => messages.value.computerOrganization.vibeCodingFullstack.backendCore.flowSteps)
</script>

<style scoped>
.backend-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.subtitle {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

.core-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.core-card {
  padding: 0.6rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.core-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
}

.core-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.35rem;
}

.core-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
}

.example-tag {
  font-size: 0.65rem;
  padding: 0.1rem 0.3rem;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  color: var(--vp-c-text-2);
}

.flow-section {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  margin-bottom: 1rem;
}

.flow-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.flow-steps {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;
}

.flow-step {
  font-size: 0.72rem;
  padding: 0.2rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  color: var(--vp-c-text-2);
}

.flow-arrow {
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
}

.info-box {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  border-left: 3px solid var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .core-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
