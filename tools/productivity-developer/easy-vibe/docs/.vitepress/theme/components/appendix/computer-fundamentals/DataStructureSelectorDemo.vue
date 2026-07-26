<template>
  <div class="ds-selector-demo">
    <div class="demo-header">
      <span class="title">{{ t('dataStructures.selector.title') }}</span>
      <span class="subtitle">{{ t('dataStructures.selector.subtitle') }}</span>
    </div>

    <div class="scenario-selector">
      <div class="selector-title">{{ t('dataStructures.selector.scenarioTitle') }}</div>
      <div class="scenario-grid">
        <div
          v-for="scenario in scenarios"
          :key="scenario.id"
          :class="['scenario-card', { active: activeScenario === scenario.id }]"
          @click="activeScenario = scenario.id"
        >
          <div class="scenario-icon">{{ scenario.icon }}</div>
          <div class="scenario-name">{{ scenario.name }}</div>
          <div class="scenario-desc">{{ scenario.desc }}</div>
        </div>
      </div>
    </div>

    <div v-if="activeScenario" class="recommendation">
      <div class="rec-header">
        <span class="rec-title">
          {{ t('dataStructures.selector.recommendation', { name: currentScenario.recommendation }) }}
        </span>
      </div>

      <div class="rec-reason">
        <div class="reason-title">{{ t('dataStructures.selector.reasonTitle') }}</div>
        <div class="reason-list">
          <div
            v-for="(reason, index) in currentScenario.reasons"
            :key="index"
            class="reason-item"
          >
            <span class="reason-bullet">✓</span>
            <span class="reason-text">{{ reason }}</span>
          </div>
        </div>
      </div>

      <div class="rec-example">
        <div class="example-title">{{ t('dataStructures.selector.exampleTitle') }}</div>
        <div class="example-content">{{ currentScenario.example }}</div>
      </div>
    </div>

    <div class="quick-reference">
      <div class="ref-title">{{ t('dataStructures.selector.referenceTitle') }}</div>
      <table class="ref-table">
        <thead>
          <tr>
            <th v-for="header in tableHeaders" :key="header">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in referenceTable" :key="index">
            <td>{{ row.scenario }}</td>
            <td>{{ row.structure }}</td>
            <td class="complexity">{{ row.complexity }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="decision-flow">
      <div class="flow-title">{{ t('dataStructures.selector.flowTitle') }}</div>
      <div class="flow-diagram">
        <div class="flow-step question">
          <div class="step-icon">❓</div>
          <div class="step-text">{{ t('dataStructures.selector.flow.fastAccess') }}</div>
        </div>
        <div class="flow-branch">
          <div class="branch-yes">
            <div class="branch-label">{{ t('dataStructures.selector.flow.yes') }}</div>
            <div class="flow-result">{{ t('dataStructures.selector.flow.arrayHash') }}</div>
          </div>
          <div class="branch-no">
            <div class="branch-label">{{ t('dataStructures.selector.flow.no') }}</div>
            <div class="flow-step question">
              <div class="step-text">{{ t('dataStructures.selector.flow.frequentInsertDelete') }}</div>
            </div>
            <div class="flow-branch">
              <div class="branch-yes">
                <div class="branch-label">{{ t('dataStructures.selector.flow.yes') }}</div>
                <div class="flow-result">{{ t('dataStructures.selector.flow.linkedList') }}</div>
              </div>
              <div class="branch-no">
                <div class="branch-label">{{ t('dataStructures.selector.flow.no') }}</div>
                <div class="flow-step question">
                  <div class="step-text">{{ t('dataStructures.selector.flow.keepOrder') }}</div>
                </div>
                <div class="flow-branch">
                  <div class="branch-yes">
                    <div class="branch-label">{{ t('dataStructures.selector.flow.yes') }}</div>
                    <div class="flow-result">{{ t('dataStructures.selector.flow.stackQueue') }}</div>
                  </div>
                  <div class="branch-no">
                    <div class="branch-label">{{ t('dataStructures.selector.flow.no') }}</div>
                    <div class="flow-result">{{ t('dataStructures.selector.flow.treeGraph') }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals'

const { t, messages } = useI18n(computerFundamentalsLocale)
const activeScenario = ref(null)

const scenarios = computed(() => messages.value.dataStructures.selector.scenarios)
const referenceTable = computed(
  () => messages.value.dataStructures.selector.referenceTable
)
const tableHeaders = computed(
  () => messages.value.dataStructures.selector.tableHeaders
)

const currentScenario = computed(() => {
  return scenarios.value.find((s) => s.id === activeScenario.value)
})
</script>

<style scoped>
.ds-selector-demo {
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

.scenario-selector {
  margin-bottom: 2rem;
}

.selector-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.scenario-card {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.scenario-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-3px);
}

.scenario-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.scenario-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.scenario-name {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.scenario-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.recommendation {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-brand);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.rec-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.rec-icon {
  font-size: 1.5rem;
}

.rec-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--vp-c-brand);
}

.rec-reason {
  margin-bottom: 1.5rem;
}

.reason-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.reason-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.reason-item {
  display: flex;
  gap: 0.75rem;
  align-items: start;
}

.reason-bullet {
  color: #10b981;
  font-weight: 700;
  flex-shrink: 0;
}

.reason-text {
  font-size: 0.9rem;
  line-height: 1.5;
}

.rec-example {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.example-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-brand);
}

.example-content {
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.quick-reference {
  margin-bottom: 2rem;
}

.ref-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.ref-table {
  width: 100%;
  border-collapse: collapse;
}

.ref-table th {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.75rem;
  text-align: left;
  font-size: 0.85rem;
}

.ref-table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
}

.complexity {
  font-family: 'Courier New', monospace;
  color: var(--vp-c-brand);
  font-weight: 600;
}

.decision-flow {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.flow-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.flow-diagram {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.flow-step {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  text-align: center;
}

.flow-step.question {
  background: rgba(59, 130, 246, 0.1);
  border-color: #3b82f6;
}

.step-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.step-text {
  font-size: 0.9rem;
  font-weight: 500;
}

.flow-branch {
  display: flex;
  gap: 1rem;
  margin-left: 1rem;
}

.branch-yes,
.branch-no {
  flex: 1;
}

.branch-label {
  text-align: center;
  padding: 0.5rem;
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.flow-result {
  text-align: center;
  padding: 0.75rem;
  background: #10b981;
  color: white;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}
</style>
