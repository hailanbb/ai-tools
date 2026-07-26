<template>
  <div class="availability-demo">
    <div class="header">
      <div class="title">{{ t('availability.title') }}</div>
      <div class="subtitle">{{ t('availability.subtitle') }}</div>
    </div>

    <div class="sla-cards">
      <div
        v-for="sla in slaLevels"
        :key="sla.nines"
        :class="['sla-card', { active: activeSla === sla.nines }]"
        @click="activeSla = sla.nines"
      >
        <div class="sla-nines">{{ sla.label }}</div>
        <div class="sla-percent">{{ sla.percent }}</div>
      </div>
    </div>

    <div v-if="current" class="detail-panel">
      <div class="detail-title">{{ current.label }}（{{ current.percent }}）</div>
      <div class="downtime-grid">
        <div class="downtime-item">
          <div class="dt-label">{{ t('availability.labels.yearly') }}</div>
          <div class="dt-value">{{ current.yearly }}</div>
        </div>
        <div class="downtime-item">
          <div class="dt-label">{{ t('availability.labels.monthly') }}</div>
          <div class="dt-value">{{ current.monthly }}</div>
        </div>
        <div class="downtime-item">
          <div class="dt-label">{{ t('availability.labels.weekly') }}</div>
          <div class="dt-value">{{ current.weekly }}</div>
        </div>
      </div>
      <div class="detail-examples">
        <span class="label">{{ t('availability.labels.examples') }}</span>{{ current.examples }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { highAvailabilityLocale } from '../../../locales/high-availability/index.js'

const { t, messages } = useI18n(highAvailabilityLocale)

const activeSla = ref('3')

const slaLevels = computed(() => messages.value.availability.slaLevels)

const current = computed(() => slaLevels.value.find(s => s.nines === activeSla.value))
</script>

<style scoped>
.availability-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.sla-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 0.5rem; margin-bottom: 1rem; }
.sla-card {
  padding: 0.6rem; border-radius: 8px; cursor: pointer; text-align: center;
  background: var(--vp-c-bg); border: 2px solid var(--vp-c-divider); transition: all 0.2s;
}
.sla-card:hover { border-color: var(--vp-c-brand); }
.sla-card.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.08); }
.sla-nines { font-weight: 800; font-size: 1.1rem; color: var(--vp-c-brand); }
.sla-percent { font-size: 0.8rem; color: var(--vp-c-text-2); }
.detail-panel { background: var(--vp-c-bg); border-radius: 8px; padding: 1rem; border: 1px solid var(--vp-c-divider); }
.detail-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.75rem; }
.downtime-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin-bottom: 0.75rem; }
.downtime-item { text-align: center; padding: 0.5rem; border-radius: 6px; background: var(--vp-c-bg-soft); }
.dt-label { font-size: 0.75rem; color: var(--vp-c-text-3); }
.dt-value { font-weight: 700; font-size: 0.9rem; color: var(--vp-c-brand); }
.detail-examples { font-size: 0.82rem; }
.label { font-weight: 600; color: var(--vp-c-text-2); }
</style>
