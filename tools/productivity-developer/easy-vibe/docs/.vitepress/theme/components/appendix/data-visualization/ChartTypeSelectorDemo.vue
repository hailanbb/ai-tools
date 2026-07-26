<template>
  <div class="chart-selector-demo">
    <div class="header">
      <div class="title">{{ t('chartSelector.title') }}</div>
      <div class="subtitle">{{ t('chartSelector.subtitle') }}</div>
    </div>

    <div class="purposes">
      <div
        v-for="p in purposes"
        :key="p.key"
        :class="['purpose-card', { active: activePurpose === p.key }]"
        @click="activePurpose = p.key"
      >
        <div class="purpose-icon">{{ p.icon }}</div>
        <div class="purpose-name">{{ p.name }}</div>
      </div>
    </div>

    <div v-if="currentPurpose" class="charts-panel">
      <div class="panel-title">{{ t('chartSelector.panelTitle', { purpose: currentPurpose.name }) }}</div>
      <div class="chart-list">
        <div
          v-for="chart in currentPurpose.charts"
          :key="chart.name"
          class="chart-item"
        >
            <div class="chart-visual">{{ chart.visual }}</div>
            <div class="chart-info">
              <div class="chart-name">{{ chart.name }}</div>
              <div class="chart-desc">{{ chart.desc }}</div>
              <div class="chart-example">{{ t('chartSelector.exampleLabel') }}{{ chart.example }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { dataVisualizationLocale } from '../../../locales/data-visualization/index.js'

const { t, messages } = useI18n(dataVisualizationLocale)

const activePurpose = ref('comparison')

const purposes = computed(() => messages.value.chartSelector.purposes)

const currentPurpose = computed(() => purposes.value.find(p => p.key === activePurpose.value))
</script>

<style scoped>
.chart-selector-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.purposes { display: grid; grid-template-columns: repeat(auto-fit, minmax(90px, 1fr)); gap: 0.5rem; margin-bottom: 1rem; }
.purpose-card {
  display: flex; flex-direction: column; align-items: center; gap: 0.3rem;
  padding: 0.6rem; border-radius: 8px; cursor: pointer;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); transition: all 0.2s;
}
.purpose-card:hover { border-color: var(--vp-c-brand); }
.purpose-card.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); }
.purpose-icon { font-size: 1.3rem; }
.purpose-name { font-size: 0.8rem; font-weight: 600; }
.panel-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.75rem; }
.charts-panel { background: var(--vp-c-bg); border-radius: 8px; padding: 1rem; border: 1px solid var(--vp-c-divider); }
.chart-list { display: flex; flex-direction: column; gap: 0.5rem; }
.chart-item { display: flex; gap: 0.75rem; padding: 0.5rem; border-radius: 6px; background: var(--vp-c-bg-soft); }
.chart-visual { font-size: 1.2rem; min-width: 50px; display: flex; align-items: center; justify-content: center; font-family: var(--vp-font-family-mono); color: var(--vp-c-brand); }
.chart-name { font-weight: 600; font-size: 0.85rem; }
.chart-desc { font-size: 0.78rem; color: var(--vp-c-text-2); }
.chart-example { font-size: 0.75rem; color: var(--vp-c-text-3); font-style: italic; }
</style>
