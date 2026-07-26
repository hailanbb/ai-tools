<template>
  <div class="bundler-comparison-demo">
    <div class="control-panel">
      <div class="title-section">
        <span class="icon">⚖️</span>
        <span class="title">{{ t('bundlerComparison.title') }}</span>
        <span class="subtitle">{{ t('bundlerComparison.subtitle') }}</span>
      </div>
      <div class="view-controls">
        <button
          v-for="view in viewModes"
          :key="view.id"
          class="view-btn"
          :class="{ active: currentView === view.id }"
          @click="currentView = view.id"
        >
          {{ view.icon }} {{ view.name }}
        </button>
      </div>
    </div>

    <!-- radar chart view -->
    <div
      v-if="currentView === 'radar'"
      class="radar-view"
    >
      <div class="radar-container">
        <svg
          viewBox="0 0 400 400"
          class="radar-chart"
        >
          <g class="grid">
            <polygon
              v-for="i in 5"
              :key="i"
              :points="getGridPoints(i * 20)"
              fill="none"
              stroke="var(--vp-c-divider)"
              stroke-width="1"
            />
            <line
              v-for="(dim, i) in dimensions"
              :key="i"
              :x1="200"
              :y1="200"
              :x2="getAxisEnd(i).x"
              :y2="getAxisEnd(i).y"
              stroke="var(--vp-c-divider)"
              stroke-width="1"
            />
          </g>

          <g class="data-areas">
            <polygon
              v-for="tool in bundlers"
              :key="tool.id"
              :points="getDataPoints(tool.scores)"
              :fill="tool.color"
              :stroke="tool.borderColor"
              fill-opacity="0.2"
              stroke-width="2"
              class="data-polygon"
              :class="{ dimmed: highlightedTool && highlightedTool !== tool.id }"
              @mouseenter="highlightedTool = tool.id"
              @mouseleave="highlightedTool = null"
            />
          </g>

          <g class="labels">
            <text
              v-for="(dim, i) in dimensions"
              :key="i"
              :x="getLabelPos(i).x"
              :y="getLabelPos(i).y"
              text-anchor="middle"
              dominant-baseline="middle"
              fill="var(--vp-c-text-1)"
              font-size="12"
              font-weight="bold"
            >
              {{ dim.name }}
            </text>
          </g>
        </svg>
      </div>

      <!-- legend -->
      <div class="legend">
        <div
          v-for="tool in bundlers"
          :key="tool.id"
          class="legend-item"
          :class="{ dimmed: highlightedTool && highlightedTool !== tool.id }"
          @mouseenter="highlightedTool = tool.id"
          @mouseleave="highlightedTool = null"
        >
          <span
            class="legend-color"
            :style="{ background: tool.borderColor }"
          />
          <span class="legend-name">{{ tool.name }}</span>
          <span class="legend-desc">{{ tool.shortDesc }}</span>
        </div>
      </div>
    </div>

    <!-- table comparison view -->
    <div
      v-else-if="currentView === 'table'"
      class="table-view"
    >
      <table class="comparison-table">
        <thead>
          <tr>
            <th>{{ t('bundlerComparison.dimensionLabel') }}</th>
            <th
              v-for="tool in bundlers"
              :key="tool.id"
            >
              <span class="tool-header">
                <span
                  class="tool-icon"
                  :style="{ background: tool.borderColor }"
                >{{ tool.icon }}</span>
                {{ tool.name }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(dim, dimIndex) in dimensions"
            :key="dim.key"
          >
            <td class="dim-name">
              <span class="dim-icon">{{ dim.icon }}</span>
              {{ dim.name }}
            </td>
            <td
              v-for="tool in bundlers"
              :key="tool.id"
              class="score-cell"
            >
              <div class="score-bar-wrapper">
                <div
                  class="score-bar"
                  :style="{
                    width: `${tool.scores[dimIndex] * 10}%`,
                    background: tool.borderColor
                  }"
                />
                <span class="score-value">{{ tool.scores[dimIndex] }}/10</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- scenario recommendation view -->
    <div
      v-else-if="currentView === 'recommend'"
      class="recommend-view"
    >
      <div class="scenario-list">
        <div
          v-for="scenario in scenarios"
          :key="scenario.id"
          class="scenario-card"
          :class="{ expanded: expandedScenario === scenario.id }"
        >
          <div
            class="scenario-header"
            @click="toggleScenario(scenario.id)"
          >
            <span class="scenario-icon">{{ scenario.icon }}</span>
            <div class="scenario-title-wrap">
              <span class="scenario-name">{{ scenario.name }}</span>
              <span class="scenario-desc">{{ scenario.shortDesc }}</span>
            </div>
            <span class="expand-icon">{{ expandedScenario === scenario.id ? '▼' : '▶' }}</span>
          </div>

          <div
            v-if="expandedScenario === scenario.id"
            class="scenario-content"
          >
            <div class="recommendation">
              <div class="best-choice">
                <span class="choice-label">🏆 {{ t('bundlerComparison.bestChoice') }}</span>
                <div class="choice-content">
                  <span
                    class="tool-badge"
                    :style="{ background: getTool(scenario.bestChoice).borderColor }"
                  >
                    {{ getTool(scenario.bestChoice).icon }} {{ getTool(scenario.bestChoice).name }}
                  </span>
                  <p class="choice-reason">
                    {{ scenario.bestReason }}
                  </p>
                </div>
              </div>

              <div
                v-if="scenario.alternative"
                class="alternative"
              >
                <span class="choice-label">🥈 {{ t('bundlerComparison.alternative') }}</span>
                <div class="choice-content">
                  <span
                    class="tool-badge alt"
                    :style="{ background: getTool(scenario.alternative).borderColor }"
                  >
                    {{ getTool(scenario.alternative).icon }} {{ getTool(scenario.alternative).name }}
                  </span>
                  <p class="choice-reason">
                    {{ scenario.altReason }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <p>
        <span class="icon">💡</span>
        <strong>{{ t('common.choiceAdvice') }}</strong>
        {{ currentView === 'radar' ? t('bundlerComparison.radarInfo') :
          currentView === 'table' ? t('bundlerComparison.tableInfo') :
          t('bundlerComparison.recommendInfo') }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { frontendEngineeringLocale } from '../../../locales/frontend-engineering/index.js'

const { t } = useI18n(frontendEngineeringLocale)

const currentView = ref('radar')
const highlightedTool = ref(null)
const expandedScenario = ref(null)

const viewModes = computed(() => [
  { id: 'radar', name: t('bundlerComparison.viewRadar'), icon: '📊' },
  { id: 'table', name: t('bundlerComparison.viewTable'), icon: '📋' },
  { id: 'recommend', name: t('bundlerComparison.viewRecommend'), icon: '🎯' }
])

const dimensions = computed(() => [
  { key: 'speed', name: t('bundlerComparison.dimensions.speed'), icon: '⚡' },
  { key: 'config', name: t('bundlerComparison.dimensions.config'), icon: '🔧' },
  { key: 'ecosystem', name: t('bundlerComparison.dimensions.ecosystem'), icon: '📦' },
  { key: 'hmr', name: t('bundlerComparison.dimensions.hmr'), icon: '🔥' },
  { key: 'output', name: t('bundlerComparison.dimensions.output'), icon: '✨' },
  { key: 'memory', name: t('bundlerComparison.dimensions.memory'), icon: '💾' }
])

const bundlers = [
  {
    id: 'vite',
    name: 'Vite',
    icon: '⚡',
    shortDesc: t('bundlerComparison.bundlers.vite.shortDesc'),
    color: 'rgba(100, 108, 255, 0.3)',
    borderColor: '#646cff',
    scores: [10, 8, 7, 10, 8, 9]
  },
  {
    id: 'webpack',
    name: 'Webpack',
    icon: '📦',
    shortDesc: t('bundlerComparison.bundlers.webpack.shortDesc'),
    color: 'rgba(142, 214, 251, 0.3)',
    borderColor: '#8ed6fb',
    scores: [5, 5, 10, 6, 9, 5]
  },
  {
    id: 'rollup',
    name: 'Rollup',
    icon: '📜',
    shortDesc: t('bundlerComparison.bundlers.rollup.shortDesc'),
    color: 'rgba(255, 107, 107, 0.3)',
    borderColor: '#ff6b6b',
    scores: [7, 7, 6, 7, 10, 8]
  }
]

const scenarios = computed(() => [
  {
    id: 'spa',
    icon: '🚀',
    name: t('bundlerComparison.scenarios.spa.name'),
    shortDesc: t('bundlerComparison.scenarios.spa.shortDesc'),
    bestChoice: 'vite',
    bestReason: t('bundlerComparison.scenarios.spa.bestReason'),
    alternative: 'webpack',
    altReason: t('bundlerComparison.scenarios.spa.altReason')
  },
  {
    id: 'library',
    icon: '📚',
    name: t('bundlerComparison.scenarios.library.name'),
    shortDesc: t('bundlerComparison.scenarios.library.shortDesc'),
    bestChoice: 'rollup',
    bestReason: t('bundlerComparison.scenarios.library.bestReason'),
    alternative: 'vite',
    altReason: t('bundlerComparison.scenarios.library.altReason')
  },
  {
    id: 'enterprise',
    icon: '🏢',
    name: t('bundlerComparison.scenarios.enterprise.name'),
    shortDesc: t('bundlerComparison.scenarios.enterprise.shortDesc'),
    bestChoice: 'webpack',
    bestReason: t('bundlerComparison.scenarios.enterprise.bestReason'),
    alternative: 'vite',
    altReason: t('bundlerComparison.scenarios.enterprise.altReason')
  },
  {
    id: 'ssg',
    icon: '📝',
    name: t('bundlerComparison.scenarios.ssg.name'),
    shortDesc: t('bundlerComparison.scenarios.ssg.shortDesc'),
    bestChoice: 'vite',
    bestReason: t('bundlerComparison.scenarios.ssg.bestReason'),
    alternative: 'rollup',
    altReason: t('bundlerComparison.scenarios.ssg.altReason')
  }
])

const getGridPoints = (radius) => {
  const points = []
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60 - 90) * Math.PI / 180
    const x = 200 + radius * Math.cos(angle)
    const y = 200 + radius * Math.sin(angle)
    points.push(`${x},${y}`)
  }
  return points.join(' ')
}

const getAxisEnd = (index) => {
  const angle = (index * 60 - 90) * Math.PI / 180
  return {
    x: 200 + 100 * Math.cos(angle),
    y: 200 + 100 * Math.sin(angle)
  }
}

const getLabelPos = (index) => {
  const angle = (index * 60 - 90) * Math.PI / 180
  return {
    x: 200 + 125 * Math.cos(angle),
    y: 200 + 125 * Math.sin(angle)
  }
}

const getDataPoints = (scores) => {
  const points = []
  for (let i = 0; i < scores.length; i++) {
    const angle = (i * 60 - 90) * Math.PI / 180
    const radius = scores[i] * 10
    const x = 200 + radius * Math.cos(angle)
    const y = 200 + radius * Math.sin(angle)
    points.push(`${x},${y}`)
  }
  return points.join(' ')
}

const getTool = (id) => bundlers.find(b => b.id === id)

const toggleScenario = (id) => {
  expandedScenario.value = expandedScenario.value === id ? null : id
}
</script>

<style scoped>
.bundler-comparison-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  font-family: var(--vp-font-family-mono);
}

.control-panel {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  gap: 1rem;
}

.title-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.title-section .icon {
  font-size: 1.5rem;
}

.title-section .title {
  font-weight: bold;
  font-size: 1.1rem;
}

.title-section .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.view-controls {
  display: flex;
  gap: 0.25rem;
}

.view-btn {
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.view-btn:hover {
  background: var(--vp-c-bg-alt);
}

.view-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

/* radar view */
.radar-view {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 1rem;
  margin-bottom: 1rem;
}

.radar-container {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
}

.radar-chart {
  width: 100%;
  max-width: 350px;
  height: auto;
}

.data-polygon {
  transition: all 0.3s ease;
  cursor: pointer;
}

.data-polygon:hover {
  fill-opacity: 0.4;
}

.data-polygon.dimmed {
  fill-opacity: 0.1;
  opacity: 0.3;
}

.legend {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s;
  cursor: pointer;
}

.legend-item:hover {
  background: var(--vp-c-bg-soft);
}

.legend-item.dimmed {
  opacity: 0.3;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.legend-name {
  font-weight: bold;
  font-size: 0.9rem;
}

.legend-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-left: auto;
}

/* table view */
.table-view {
  margin-bottom: 1rem;
  overflow-x: auto;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--vp-c-bg);
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
}

.comparison-table th,
.comparison-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}

.comparison-table th {
  background: var(--vp-c-bg-soft);
  font-weight: bold;
}

.comparison-table tr:last-child td {
  border-bottom: none;
}

.tool-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tool-icon {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
}

.dim-name {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: 500;
}

.score-cell {
  min-width: 120px;
}

.score-bar-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.score-bar {
  height: 8px;
  border-radius: 4px;
  min-width: 20px;
  transition: width 0.3s ease;
}

.score-value {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

/* recommend view */
.recommend-view {
  margin-bottom: 1rem;
}

.scenario-list {
  display: grid;
  gap: 0.75rem;
}

.scenario-card {
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
  transition: all 0.2s;
}

.scenario-card:hover {
  border-color: var(--vp-c-brand);
}

.scenario-card.expanded {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.scenario-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.scenario-header:hover {
  background: var(--vp-c-bg-soft);
}

.scenario-icon {
  font-size: 1.5rem;
}

.scenario-title-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.scenario-name {
  font-weight: bold;
  font-size: 0.95rem;
}

.scenario-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.expand-icon {
  color: var(--vp-c-text-3);
  font-size: 0.75rem;
}

.scenario-content {
  padding: 0 1rem 1rem;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.recommendation {
  display: grid;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.best-choice,
.alternative {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 0.75rem;
  align-items: start;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.choice-label {
  font-size: 0.75rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  padding-top: 0.3rem;
}

.choice-content {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.tool-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  font-size: 0.85rem;
  width: fit-content;
}

.tool-badge.alt {
  opacity: 0.85;
}

.choice-reason {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.4;
}

.info-box {
  background-color: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  .radar-view {
    grid-template-columns: 1fr;
  }

  .control-panel {
    flex-direction: column;
    align-items: flex-start;
  }

  .comparison-table {
    font-size: 0.75rem;
  }

  .comparison-table th,
  .comparison-table td {
    padding: 0.5rem;
  }
}
</style>
