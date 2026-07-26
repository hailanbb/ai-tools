<template>
  <div class="full-demo">
    <div class="demo-title">{{ t('powerOnToWeb.full.title') }}</div>
    <div class="chain">
      <div v-for="(phase, i) in phases" :key="phase.name" class="chain-item">
        <div class="phase-card" :style="{ borderLeftColor: phase.color }">
          <div class="phase-head">
            <span class="phase-icon">{{ phase.icon }}</span>
            <span class="phase-name">{{ phase.name }}</span>
          </div>
          <div class="phase-steps">
            {{ phase.steps }}
          </div>
        </div>
        <div v-if="i < phases.length - 1" class="chain-arrow">
          <svg width="20" height="14" viewBox="0 0 20 14">
            <path d="M0 7h14M10 2l6 5-6 5" fill="none" stroke="var(--vp-c-text-3)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals'

const { t, messages } = useI18n(computerFundamentalsLocale)
const phases = computed(() => messages.value.powerOnToWeb.full.phases)
</script>

<style scoped>
.full-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}
.demo-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.8rem;
}
.chain {
  display: flex;
  align-items: center;
  gap: 0;
  flex-wrap: wrap;
  justify-content: center;
}
.chain-item {
  display: flex;
  align-items: center;
  gap: 0;
}
.phase-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-left: 3px solid;
  border-radius: 6px;
  padding: 0.5rem 0.6rem;
  min-width: 6rem;
}
.phase-head {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.25rem;
}
.phase-icon { font-size: 0.9rem; }
.phase-name {
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.phase-steps {
  font-size: 0.58rem;
  color: var(--vp-c-text-3);
  line-height: 1.4;
}
.chain-arrow {
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
}
@media (max-width: 640px) {
  .chain { flex-direction: column; gap: 0.15rem; }
  .chain-item { flex-direction: column; }
  .chain-arrow { transform: rotate(90deg); padding: 0.1rem 0; }
}
</style>
