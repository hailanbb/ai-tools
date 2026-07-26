<template>
  <div class="data-quality-demo">
    <div class="header">
      <div class="title">{{ t('quality.title') }}</div>
      <div class="subtitle">{{ t('quality.subtitle') }}</div>
    </div>

    <div class="dimensions">
      <div
        v-for="dim in dimensions"
        :key="dim.key"
        :class="['dim-card', { active: activeDim === dim.key }]"
        @click="activeDim = dim.key"
      >
        <div class="dim-icon">{{ dim.icon }}</div>
        <div class="dim-name">{{ dim.name }}</div>
      </div>
    </div>

    <div v-if="currentDim" class="detail-panel">
      <div class="detail-header">
        <span class="detail-icon">{{ currentDim.icon }}</span>
        <span class="detail-title">{{ currentDim.name }}</span>
        <span class="detail-desc">{{ currentDim.desc }}</span>
      </div>

      <div class="example-section">
        <div class="example bad">
          <div class="example-label bad-label">{{ t('quality.badLabel') }}</div>
          <table class="data-table">
            <thead>
              <tr>
                <th v-for="col in currentDim.badData.cols" :key="col">{{ col }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in currentDim.badData.rows" :key="i">
                <td
                  v-for="(cell, j) in row"
                  :key="j"
                  :class="{ 'cell-error': cell.error }"
                >{{ cell.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="example good">
          <div class="example-label good-label">{{ t('quality.goodLabel') }}</div>
          <table class="data-table">
            <thead>
              <tr>
                <th v-for="col in currentDim.goodData.cols" :key="col">{{ col }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in currentDim.goodData.rows" :key="i">
                <td v-for="(cell, j) in row" :key="j">{{ cell.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="quality-score">
        <div class="score-label">{{ t('quality.scoreLabel') }}</div>
        <div class="score-bar-bg">
          <div
            class="score-bar-fill"
            :style="{ width: currentDim.score + '%', background: scoreColor(currentDim.score) }"
          ></div>
        </div>
        <div class="score-value">{{ currentDim.score }}%</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { dataGovernanceLocale } from '../../../locales/data-governance/index.js'

const { t, messages } = useI18n(dataGovernanceLocale)

const activeDim = ref('completeness')

const dimensions = computed(() => messages.value.quality.dimensions)

const currentDim = computed(() => dimensions.value.find(d => d.key === activeDim.value))

function scoreColor(score) {
  if (score >= 80) return '#22c55e'
  if (score >= 60) return '#f59e0b'
  return '#ef4444'
}
</script>

<style scoped>
.data-quality-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.dimensions { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem; }
.dim-card {
  display: flex; align-items: center; gap: 0.4rem; padding: 0.5rem 0.75rem;
  border-radius: 8px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  cursor: pointer; font-size: 0.85rem; transition: all 0.2s;
}
.dim-card:hover { border-color: var(--vp-c-brand); }
.dim-card.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); }
.dim-icon { font-size: 1.1rem; }
.dim-name { font-weight: 600; }
.detail-panel {
  padding: 1rem; border-radius: 8px; background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider); margin-bottom: 1rem;
}
.detail-header { margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
.detail-icon { font-size: 1.2rem; }
.detail-title { font-weight: 700; font-size: 1rem; }
.detail-desc { color: var(--vp-c-text-2); font-size: 0.85rem; }
.example-section { display: flex; gap: 1rem; margin-bottom: 1rem; }
.example { flex: 1; }
.example-label { font-weight: 600; font-size: 0.8rem; margin-bottom: 0.4rem; padding: 0.2rem 0.5rem; border-radius: 4px; display: inline-block; }
.bad-label { background: rgba(239,68,68,0.1); color: #ef4444; }
.good-label { background: rgba(34,197,94,0.1); color: #22c55e; }
.data-table { width: 100%; border-collapse: collapse; font-size: 0.75rem; }
.data-table th { background: var(--vp-c-bg-soft); padding: 0.3rem 0.4rem; text-align: left; font-weight: 600; border-bottom: 1px solid var(--vp-c-divider); }
.data-table td { padding: 0.3rem 0.4rem; border-bottom: 1px solid var(--vp-c-divider); }
.cell-error { background: rgba(239,68,68,0.1); color: #ef4444; font-weight: 600; }
.quality-score { display: flex; align-items: center; gap: 0.75rem; }
.score-label { font-weight: 600; font-size: 0.85rem; white-space: nowrap; }
.score-bar-bg { flex: 1; height: 10px; background: var(--vp-c-bg-soft); border-radius: 5px; overflow: hidden; }
.score-bar-fill { height: 100%; border-radius: 5px; transition: width 0.4s; }
.score-value { font-weight: 700; font-size: 0.9rem; font-family: var(--vp-font-family-mono); min-width: 40px; }
@media (max-width: 640px) { .example-section { flex-direction: column; } }
</style>
