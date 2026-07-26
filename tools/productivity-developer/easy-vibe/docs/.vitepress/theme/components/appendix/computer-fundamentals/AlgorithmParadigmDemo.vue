<template>
  <div class="algorithm-paradigm-demo">
    <div class="demo-header">
      <span class="title">{{ t('algorithmThinking.paradigm.title') }}</span>
      <span class="subtitle">{{ t('algorithmThinking.paradigm.subtitle') }}</span>
    </div>

    <div class="intro-text">
      {{ t('algorithmThinking.paradigm.introPrefix') }}<strong>{{ t('algorithmThinking.paradigm.introStrong') }}</strong>{{ t('algorithmThinking.paradigm.introSuffix') }}
    </div>

    <div class="paradigm-grid">
      <div
        v-for="paradigm in paradigms"
        :key="paradigm.id"
        :class="['paradigm-card', { active: activeParadigm === paradigm.id }]"
        @click="activeParadigm = paradigm.id"
      >
        <div class="card-icon">{{ paradigm.icon }}</div>
        <div class="card-name">{{ paradigm.name }}</div>
        <div class="card-tagline">{{ paradigm.tagline }}</div>
      </div>
    </div>

    <div v-if="activeParadigm" class="paradigm-detail">
      <div class="detail-header">
        <span class="detail-icon">{{ currentParadigm.icon }}</span>
        <span class="detail-title">{{ currentParadigm.name }}</span>
      </div>

      <div class="detail-content">
        <div class="detail-section">
          <div class="section-title">
            {{ t('algorithmThinking.paradigm.coreIdea') }}
          </div>
          <div class="section-text">{{ currentParadigm.idea }}</div>
        </div>

        <div class="detail-section">
          <div class="section-title">
            {{ t('algorithmThinking.paradigm.scenarios') }}
          </div>
          <div class="scenario-tags">
            <span
              v-for="(scenario, index) in currentParadigm.scenarios"
              :key="index"
              class="scenario-tag"
            >
              {{ scenario }}
            </span>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">
            {{ t('algorithmThinking.paradigm.classicProblems') }}
          </div>
          <div class="problems-list">
            <div
              v-for="(problem, index) in currentParadigm.problems"
              :key="index"
              class="problem-item"
            >
              <div class="problem-icon">📝</div>
              <div class="problem-text">{{ problem }}</div>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">
            {{ t('algorithmThinking.paradigm.timeComplexity') }}
          </div>
          <div class="complexity-box">
            <div class="complexity-value">{{ currentParadigm.complexity }}</div>
            <div class="complexity-note">
              {{ currentParadigm.complexityNote }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="paradigm-comparison">
      <div class="comparison-title">
        {{ t('algorithmThinking.paradigm.comparisonTitle') }}
      </div>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>{{ t('algorithmThinking.paradigm.paradigm') }}</th>
            <th>{{ t('algorithmThinking.paradigm.strategy') }}</th>
            <th>{{ t('algorithmThinking.paradigm.optimality') }}</th>
            <th>{{ t('algorithmThinking.paradigm.useCase') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in comparisonData"
            :key="index"
            :class="{ highlighted: item.id === activeParadigm }"
          >
            <td>{{ item.icon }} {{ item.name }}</td>
            <td>{{ item.strategy }}</td>
            <td>{{ item.optimal }}</td>
            <td>{{ item.use }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="selection-guide">
      <div class="guide-title">
        {{ t('algorithmThinking.paradigm.guideTitle') }}
      </div>
      <div class="guide-steps">
        <div v-for="(step, index) in guideSteps" :key="step.title" class="guide-step">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <div class="step-title">{{ step.title }}</div>
            <div class="step-desc">{{ step.desc }}</div>
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

const activeParadigm = ref('divide')

const paradigms = computed(
  () => messages.value.algorithmThinking.paradigm.paradigms
)
const comparisonData = computed(
  () => messages.value.algorithmThinking.paradigm.comparisonData
)
const guideSteps = computed(
  () => messages.value.algorithmThinking.paradigm.guideSteps
)

const currentParadigm = computed(() =>
  paradigms.value.find((p) => p.id === activeParadigm.value)
)
</script>

<style scoped>
.algorithm-paradigm-demo {
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

.intro-text {
  padding: 1rem;
  background: var(--vp-c-bg);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 6px;
  margin-bottom: 2rem;
  font-size: 0.95rem;
  line-height: 1.6;
}

.paradigm-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.paradigm-card {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.paradigm-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-3px);
}

.paradigm-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.card-name {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.card-tagline {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.paradigm-detail {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--vp-c-brand);
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-section {
}

.section-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-brand);
}

.section-text {
  font-size: 0.9rem;
  line-height: 1.6;
}

.scenario-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.scenario-tag {
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  font-size: 0.85rem;
}

.problems-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
}

.problem-item {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.problem-icon {
  font-size: 1rem;
  flex-shrink: 0;
}

.problem-text {
  font-size: 0.85rem;
  line-height: 1.5;
}

.complexity-box {
  text-align: center;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.complexity-value {
  font-family: 'Courier New', monospace;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  margin-bottom: 0.35rem;
}

.complexity-note {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.paradigm-comparison {
  margin-bottom: 2rem;
}

.comparison-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.comparison-table {
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
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
}

tr.highlighted {
  background: var(--vp-c-brand-soft);
}

.selection-guide {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.guide-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: var(--vp-c-brand);
}

.guide-steps {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.guide-step {
  display: flex;
  gap: 1rem;
  align-items: start;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.9rem;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.35rem;
}

.step-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}
</style>
