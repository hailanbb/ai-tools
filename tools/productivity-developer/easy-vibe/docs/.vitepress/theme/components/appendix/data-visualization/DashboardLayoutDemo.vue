<template>
  <div class="dashboard-demo">
    <div class="header">
      <div class="title">{{ t('dashboardLayout.title') }}</div>
      <div class="subtitle">{{ t('dashboardLayout.subtitle') }}</div>
    </div>

    <div class="layout-tabs">
      <div
        v-for="layout in layouts"
        :key="layout.key"
        :class="['tab', { active: activeLayout === layout.key }]"
        @click="activeLayout = layout.key"
      >
        {{ layout.name }}
      </div>
    </div>

    <div v-if="current" class="layout-preview">
      <div class="preview-title">{{ current.name }}</div>
      <div class="preview-desc">{{ current.desc }}</div>
      <div :class="['mock-dashboard', current.key]">
        <div
          v-for="(widget, i) in current.widgets"
          :key="i"
          :class="['widget', widget.type]"
        >
          <div class="widget-label">{{ widget.label }}</div>
        </div>
      </div>
      <div class="use-case">{{ t('dashboardLayout.useCaseLabel') }}{{ current.useCase }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { dataVisualizationLocale } from '../../../locales/data-visualization/index.js'

const { t, messages } = useI18n(dataVisualizationLocale)

const activeLayout = ref('overview')

const layouts = computed(() => messages.value.dashboardLayout.layouts)

const current = computed(() => layouts.value.find(l => l.key === activeLayout.value))
</script>

<style scoped>
.dashboard-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.layout-tabs { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
.tab {
  padding: 0.4rem 0.75rem; border-radius: 6px; cursor: pointer;
  font-size: 0.85rem; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
}
.tab:hover { border-color: var(--vp-c-brand); }
.tab.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); font-weight: 600; }
.layout-preview { background: var(--vp-c-bg); border-radius: 8px; padding: 1rem; border: 1px solid var(--vp-c-divider); }
.preview-title { font-weight: 700; font-size: 0.95rem; }
.preview-desc { color: var(--vp-c-text-2); font-size: 0.82rem; margin-bottom: 0.75rem; }
.mock-dashboard { display: grid; gap: 0.4rem; margin-bottom: 0.75rem; grid-template-columns: repeat(4, 1fr); }
.widget {
  padding: 0.5rem; border-radius: 6px; text-align: center;
  font-size: 0.75rem; font-weight: 600; border: 1px dashed var(--vp-c-divider);
}
.widget.kpi { background: rgba(var(--vp-c-brand-rgb), 0.06); grid-column: span 1; }
.widget.chart-wide { background: rgba(34,197,94,0.06); grid-column: span 4; min-height: 50px; }
.widget.table { background: rgba(245,158,11,0.06); grid-column: span 4; }
.widget.half { background: rgba(99,102,241,0.06); grid-column: span 2; min-height: 40px; }
.widget.big-number { background: rgba(239,68,68,0.06); grid-column: span 4; min-height: 40px; font-size: 0.9rem; }
.widget-label { color: var(--vp-c-text-2); }
.use-case { font-size: 0.82rem; color: var(--vp-c-text-3); }
</style>
