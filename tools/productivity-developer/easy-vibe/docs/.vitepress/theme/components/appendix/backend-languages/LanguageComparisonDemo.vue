<template>
  <div class="language-comparison-demo">
    <div class="demo-header">
      <span class="icon">⚖️</span>
      <span class="title">{{ t('comparison.title') }}</span>
      <span class="subtitle">{{ t('comparison.subtitle') }}</span>
    </div>

    <div class="intro-text">
      {{ t('comparison.introPrefix') }}<span class="highlight">{{ t('comparison.introHighlight') }}</span>{{ t('comparison.introSuffix') }}
    </div>

    <div class="dimension-selector">
      <div class="dimension-label">
        {{ t('comparison.dimensionLabel') }}
      </div>
      <div class="dimension-buttons">
        <button
          v-for="dim in dimensions"
          :key="dim.key"
          class="dimension-btn"
          :class="{ active: selectedDimension === dim.key }"
          @click="selectedDimension = dim.key"
        >
          <span class="dim-icon">{{ dim.icon }}</span>
          <span class="dim-label">{{ dim.label }}</span>
        </button>
      </div>
    </div>

    <div class="comparison-chart">
      <div class="chart-header">
        <span class="chart-title">{{ getDimensionInfo().title }}</span>
        <span class="chart-unit">{{ getDimensionInfo().unit }}</span>
      </div>
      <div class="bars-container">
        <div
          v-for="lang in sortedLanguages"
          :key="lang.name"
          class="bar-wrapper"
        >
          <div class="bar-label">
            {{ lang.name }}
          </div>
          <div class="bar-track">
            <div
              class="bar-fill"
              :class="getBarClass(lang.score)"
              :style="{ width: lang.score + '%' }"
            >
              <span class="bar-value">{{ lang.score }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="insight-box">
      <span class="icon">🔍</span>
      <div class="insight-content">
        <strong>{{ t('comparison.insightStrong') }}</strong>
        <p>{{ getDimensionInfo().insight }}</p>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('comparison.infoStrong') }}</strong>{{ t('comparison.info') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { backendLanguagesLocale } from '../../../locales/backend-languages/index.js'

const { t, messages } = useI18n(backendLanguagesLocale)

const selectedDimension = ref('performance')
const dimensions = computed(() => messages.value.comparison.dimensions)
const dimensionInfo = computed(() => messages.value.comparison.dimensionInfo)
const languageScores = computed(() => messages.value.comparison.languageScores)

const sortedLanguages = computed(() => {
  const scores = languageScores.value[selectedDimension.value]
  return [...scores].sort((a, b) => b.score - a.score)
})

const getDimensionInfo = () => {
  return dimensionInfo.value[selectedDimension.value]
}

const getBarClass = (score) => {
  if (score >= 85) return 'bar-high'
  if (score >= 60) return 'bar-medium'
  return 'bar-low'
}
</script>

<style scoped>
.language-comparison-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  
  
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.dimension-selector {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.dimension-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.dimension-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.dimension-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.4rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.85rem;
}

.dimension-btn:hover {
  border-color: var(--vp-c-brand);
}

.dimension-btn.active {
  background: var(--vp-c-brand);
  color: white;
}

.dim-icon {
  font-size: 1rem;
}

.comparison-chart {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.chart-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.chart-unit {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.bars-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.bar-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.bar-label {
  min-width: 70px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.bar-track {
  flex: 1;
  height: 24px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.5rem;
  transition: width 0.5s ease;
  color: white;
  font-weight: 600;
  font-size: 0.75rem;
}

.bar-high {
  background: var(--vp-c-green-1);
}

.bar-medium {
  background: var(--vp-c-yellow-1);
}

.bar-low {
  background: var(--vp-c-brand-1);
}

.insight-box {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
  border-left: 3px solid var(--vp-c-brand);
}

.insight-box .icon {
  flex-shrink: 0;
}

.insight-content {
  flex: 1;
}

.insight-content strong {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.insight-content p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.25rem;
}
</style>
