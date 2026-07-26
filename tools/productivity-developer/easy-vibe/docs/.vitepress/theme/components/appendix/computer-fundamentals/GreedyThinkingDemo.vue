<template>
  <div class="greedy-thinking-demo">
    <div class="demo-header">
      <span class="title">{{ t('algorithmThinking.greedy.title') }}</span>
      <span class="subtitle">{{ t('algorithmThinking.greedy.subtitle') }}</span>
    </div>

    <div class="core-idea">
      <div class="idea-box">
        <div class="idea-text">
          {{ t('algorithmThinking.greedy.ideaLine1Prefix') }}<strong>{{ t('algorithmThinking.greedy.localBest') }}</strong>{{ t('algorithmThinking.greedy.ideaLine1Suffix') }}<br />
          {{ t('algorithmThinking.greedy.ideaLine2Prefix') }}<strong>{{ t('algorithmThinking.greedy.globalBest') }}</strong>
        </div>
      </div>
    </div>

    <div class="scenario-selector">
      <div class="selector-title">
        {{ t('algorithmThinking.greedy.scenarioTitle') }}
      </div>
      <div class="scenario-buttons">
        <button
          v-for="scenario in scenarios"
          :key="scenario.id"
          :class="['scenario-btn', { active: activeScenario === scenario.id }]"
          @click="activeScenario = scenario.id"
        >
          {{ scenario.icon }} {{ scenario.name }}
        </button>
      </div>
    </div>

    <div v-if="activeScenario === 'change'" class="scenario-content">
      <div class="content-title">{{ t('algorithmThinking.greedy.changeTitle') }}</div>
      <div class="change-demo">
        <div class="change-amount">
          {{ t('algorithmThinking.greedy.changeAmount', { amount: changeAmount }) }}
        </div>
        <div class="change-process">
          <div
            v-for="(step, index) in changeSteps"
            :key="index"
            class="process-step"
          >
            <div class="step-coin">{{ step.coin }}</div>
            <div class="step-text">
              {{ t('algorithmThinking.greedy.changeStep', { count: step.count, value: step.value }) }}
            </div>
          </div>
        </div>
        <div class="change-result">
          {{ t('algorithmThinking.greedy.totalCoinsPrefix') }} <strong>{{ totalCoins }}</strong> {{ t('algorithmThinking.greedy.totalCoinsSuffix') }}
        </div>
      </div>
      <div class="scenario-note">
        {{ t('algorithmThinking.greedy.changeNote1') }}<br />
        {{ t('algorithmThinking.greedy.changeNote2') }}
      </div>
    </div>

    <div v-if="activeScenario === 'activity'" class="scenario-content">
      <div class="content-title">{{ t('algorithmThinking.greedy.activityTitle') }}</div>
      <div class="activity-demo">
        <div class="activities-list">
          <div
            v-for="(activity, index) in activities"
            :key="index"
            :class="[
              'activity-item',
              { selected: activity.selected, conflicting: activity.conflicting }
            ]"
          >
            <div class="activity-time">
              {{ activity.start }} - {{ activity.end }}
            </div>
            <div class="activity-name">{{ activity.name }}</div>
          </div>
        </div>
        <div class="activity-rule">
          {{ t('algorithmThinking.greedy.activityRulePrefix') }}<strong>{{ t('algorithmThinking.greedy.activityRuleStrong') }}</strong>{{ t('algorithmThinking.greedy.activityRuleSuffix') }}
        </div>
        <div class="activity-result">
          {{ t('algorithmThinking.greedy.selectedPrefix') }} <strong>{{ selectedCount }}</strong> {{ t('algorithmThinking.greedy.selectedSuffix') }}
        </div>
      </div>
    </div>

    <div v-if="activeScenario === 'shortest'" class="scenario-content">
      <div class="content-title">{{ t('algorithmThinking.greedy.shortestTitle') }}</div>
      <div class="shortest-demo">
        <div class="path-graph">
          <div class="graph-nodes">
            <div class="node start">{{ t('algorithmThinking.greedy.startNode') }}</div>
            <div class="node">B</div>
            <div class="node">C</div>
            <div class="node">D</div>
            <div class="node end">{{ t('algorithmThinking.greedy.endNode') }}</div>
          </div>
          <div class="graph-edges">
            <div class="edge">A-B: 4</div>
            <div class="edge">A-C: 2</div>
            <div class="edge">B-D: 3</div>
            <div class="edge">C-D: 1</div>
            <div class="edge">C-E: 5</div>
            <div class="edge">D-E: 2</div>
          </div>
        </div>
        <div class="path-result">
          <div class="result-step">{{ t('algorithmThinking.greedy.pathStep') }}</div>
          <div class="result-path">A → C → D → E</div>
          <div class="result-distance">{{ t('algorithmThinking.greedy.pathDistance') }}</div>
        </div>
      </div>
    </div>

    <div class="comparison">
      <div class="comparison-title">
        {{ t('algorithmThinking.greedy.comparisonTitle') }}
      </div>
      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>{{ t('algorithmThinking.greedy.feature') }}</th>
              <th>{{ t('algorithmThinking.greedy.greedyAlgorithm') }}</th>
              <th>{{ t('algorithmThinking.greedy.dynamicProgramming') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in comparisonRows" :key="row.feature">
              <td>{{ row.feature }}</td>
              <td>{{ row.greedy }}</td>
              <td>{{ row.dp }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="pros-cons">
      <div class="pros-column">
        <div class="column-title">{{ t('algorithmThinking.greedy.prosTitle') }}</div>
        <ul>
          <li v-for="item in pros" :key="item">{{ item }}</li>
        </ul>
      </div>
      <div class="cons-column">
        <div class="column-title">{{ t('algorithmThinking.greedy.consTitle') }}</div>
        <ul>
          <li v-for="item in cons" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals'

const { t, messages } = useI18n(computerFundamentalsLocale)

const activeScenario = ref('change')

const scenarios = computed(() => messages.value.algorithmThinking.greedy.scenarios)

const changeAmount = ref(37)

const changeSteps = computed(
  () => messages.value.algorithmThinking.greedy.changeSteps
)

const totalCoins = computed(() =>
  changeSteps.value.reduce((sum, step) => sum + step.count, 0)
)

const activities = computed(
  () => messages.value.algorithmThinking.greedy.activities
)

const selectedCount = computed(
  () => activities.value.filter((a) => a.selected).length
)
const comparisonRows = computed(
  () => messages.value.algorithmThinking.greedy.comparisonRows
)
const pros = computed(() => messages.value.algorithmThinking.greedy.pros)
const cons = computed(() => messages.value.algorithmThinking.greedy.cons)
</script>

<style scoped>
.greedy-thinking-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.demo-header .title {
  font-weight: 700;
  font-size: 1.1rem;
}
.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.core-idea {
  margin-bottom: 2rem;
}

.idea-box {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 6px;
}

.idea-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.idea-text {
  font-size: 0.95rem;
  line-height: 1.8;
}

.scenario-selector {
  margin-bottom: 2rem;
}

.selector-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-brand);
}

.scenario-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.scenario-btn {
  padding: 0.6rem 1rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.scenario-btn:hover {
  border-color: var(--vp-c-brand);
}

.scenario-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.scenario-content {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.content-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--vp-c-brand);
}

.change-demo {
  text-align: center;
}

.change-amount {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.amount {
  color: var(--vp-c-brand);
  font-weight: 700;
  font-size: 1.3rem;
}

.change-process {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.process-step {
  text-align: center;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.step-coin {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  margin-bottom: 0.35rem;
}

.step-text {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.change-result {
  font-size: 1rem;
  padding: 0.75rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid #10b981;
  border-radius: 6px;
}

.scenario-note {
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.6;
}

.activities-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.activity-item.selected {
  background: rgba(16, 185, 129, 0.1);
  border-color: #10b981;
}

.activity-item.conflicting {
  opacity: 0.5;
}

.activity-time {
  font-family: 'Courier New', monospace;
  font-weight: 600;
  flex-shrink: 0;
}

.activity-name {
  flex: 1;
}

.activity-rule {
  text-align: center;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.activity-result {
  text-align: center;
  font-size: 1rem;
}

.shortest-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .shortest-demo {
    grid-template-columns: 1fr;
  }
}

.path-graph {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 1rem;
}

.graph-nodes {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}

.node {
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.85rem;
}

.node.start {
  background: rgba(16, 185, 129, 0.1);
  border-color: #10b981;
  font-weight: 600;
}

.node.end {
  background: rgba(59, 130, 246, 0.1);
  border-color: #3b82f6;
  font-weight: 600;
}

.graph-edges {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.edge {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  text-align: center;
}

.path-result {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.result-step {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.result-path {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  text-align: center;
}

.result-distance {
  text-align: center;
  font-size: 0.95rem;
}

.comparison {
  margin-bottom: 2rem;
}

.comparison-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
}

.comparison-table th {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.75rem;
  text-align: center;
  font-size: 0.85rem;
}

.comparison-table td {
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  text-align: center;
  font-size: 0.85rem;
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .pros-cons {
    grid-template-columns: 1fr;
  }
}

.pros-column,
.cons-column {
  padding: 1.25rem;
  border-radius: 8px;
}

.pros-column {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid #10b981;
}

.cons-column {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid #ef4444;
}

.column-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.pros-column ul,
.cons-column ul {
  margin: 0;
  padding-left: 1.25rem;
}

.pros-column li,
.cons-column li {
  font-size: 0.9rem;
  line-height: 1.8;
}
</style>
