<template>
  <div class="performance-benchmark-demo">
    <div class="demo-header">
      <span class="icon">🏁</span>
      <span class="title">{{ t('performance.title') }}</span>
      <span class="subtitle">{{ t('performance.subtitle') }}</span>
    </div>

    <div class="intro-text">
      {{ t('performance.introPrefix') }}<span class="highlight">{{ t('performance.introHighlight') }}</span>{{ t('performance.introSuffix') }}
    </div>

    <div class="control-panel">
      <div class="scenario-selector">
        <label>{{ t('performance.scenarioLabel') }}</label>
        <select
          v-model="selectedScenario"
          @change="runBenchmark"
        >
          <option
            v-for="scenario in scenarios"
            :key="scenario.id"
            :value="scenario.id"
          >
            {{ scenario.label }}
          </option>
        </select>
      </div>
      <button
        class="run-btn"
        :disabled="isRunning"
        @click="runBenchmark"
      >
        {{ isRunning ? t('performance.running') : t('performance.run') }}
      </button>
    </div>

    <div class="results-panel">
      <div class="panel-header">
        <span class="panel-title">{{ t('performance.resultTitle') }}</span>
      </div>
      <div class="bars-container">
        <div
          v-for="result in sortedResults"
          :key="result.language"
          class="bar-wrapper"
        >
          <div class="bar-label">
            {{ result.language }}
          </div>
          <div class="bar-track">
            <div
              class="bar-fill"
              :class="getBarClass(result.rps)"
              :style="{ width: getBarWidth(result.rps) + '%' }"
            >
              <span class="bar-value">{{ formatRPS(result.rps) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <span>{{ getCurrentExplanation() }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { backendLanguagesLocale } from '../../../locales/backend-languages/index.js'

const { t, messages } = useI18n(backendLanguagesLocale)

const selectedScenario = ref('hello')
const isRunning = ref(false)

const scenarios = computed(() => messages.value.performance.scenarios)
const benchmarkData = computed(() => messages.value.performance.benchmarkData)
const explanations = computed(() => messages.value.performance.explanations)

const currentResults = ref([])

const sortedResults = computed(() => {
  return [...currentResults.value].sort((a, b) => b.rps - a.rps)
})

const runBenchmark = () => {
  isRunning.value = true
  currentResults.value = []

  setTimeout(() => {
    currentResults.value = benchmarkData.value[selectedScenario.value]
    isRunning.value = false
  }, 800)
}

const getBarWidth = (rps) => {
  const max = 1500000
  return (rps / max) * 100
}

const getBarClass = (rps) => {
  if (rps >= 500000) return 'bar-high'
  if (rps >= 200000) return 'bar-medium'
  return 'bar-low'
}

const formatRPS = (rps) => {
  if (rps >= 1000000) return (rps / 1000000).toFixed(1) + 'M'
  if (rps >= 1000) return (rps / 1000).toFixed(0) + 'K'
  return rps.toString()
}

const getCurrentExplanation = () => {
  return explanations.value[selectedScenario.value]
}

runBenchmark()
</script>

<style scoped>
.performance-benchmark-demo {
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

.control-panel {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.scenario-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

.scenario-selector label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.scenario-selector select {
  padding: 0.4rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
  cursor: pointer;
}

.run-btn {
  padding: 0.4rem 0.8rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.85rem;
}

.run-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-dark);
}

.run-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.results-panel {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.panel-header {
  margin-bottom: 0.75rem;
}

.panel-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
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

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.info-box .icon {
  margin-right: 0.25rem;
}
</style>
