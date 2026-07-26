<template>
  <div class="api-compare-root">
    <div class="demo-header">
      <span class="title">{{ t('functionVsHttp.title') }}</span>
      <span class="subtitle">{{ t('functionVsHttp.subtitle') }}</span>
    </div>

    <div class="control-panel">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-btn', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.icon }} {{ tab.name }}
      </button>
    </div>

    <div class="visualization-area">
      <div v-if="activeTab === 'compare'" class="compare-view">
        <div class="compare-cards">
          <template v-for="(card, cardIdx) in compareCards" :key="card.id">
            <div class="compare-card">
              <div :class="['card-header', card.headerClass]">
                <span class="card-icon">{{ card.icon }}</span>
                <span class="card-title">{{ card.title }}</span>
              </div>
              <div class="card-body">
                <div class="feature-list">
                  <div v-for="key in featureKeys" :key="key" class="feature-item">
                    <span class="feature-label">{{ featureLabels[key] }}</span>
                    <span class="feature-value">{{ card.features[key] }}</span>
                  </div>
                </div>
                <div class="code-block">
                  <div class="code-label">{{ card.codeLabel }}</div>
                  <pre><code>{{ card.code }}</code></pre>
                </div>
              </div>
            </div>
            <div v-if="cardIdx === 0" class="vs-divider">
              <span class="vs-text">VS</span>
            </div>
          </template>
        </div>
      </div>

      <div v-if="activeTab === 'docs'" class="docs-view">
        <div class="docs-cards">
          <div v-for="card in docCards" :key="card.title" class="doc-card">
            <div class="doc-header">
              <span class="doc-icon">{{ card.icon }}</span>
              <span class="doc-title">{{ card.title }}</span>
            </div>
            <div class="doc-content">
              <div class="doc-section">
                <div class="doc-section-title">{{ t('functionVsHttp.docFocusTitle') }}</div>
                <ul class="doc-list">
                  <li v-for="point in card.points" :key="point.label">
                    <strong>{{ point.label }}</strong>: {{ point.text }}
                  </li>
                </ul>
              </div>
              <div class="doc-example">
                <div class="doc-example-label">{{ card.codeLabel }}</div>
                <pre><code>{{ card.code }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'quick'" class="quick-view">
        <div class="quick-cards">
          <div class="quick-card">
            <div class="quick-header">
              <span class="quick-icon">⚡</span>
              <span class="quick-title">{{ t('functionVsHttp.quickGuideTitle') }}</span>
            </div>
            <div class="quick-content">
              <div class="decision-tree">
                <template v-for="(item, idx) in decisionItems" :key="item.question">
                  <div class="decision-item">
                    <div class="decision-question">{{ item.question }}</div>
                    <div class="decision-answer">→ <strong>{{ item.answer }}</strong></div>
                    <div class="decision-example">{{ item.example }}</div>
                  </div>
                  <div v-if="idx < decisionItems.length - 1" class="decision-arrow">↓</div>
                </template>
              </div>
            </div>
          </div>

          <div class="quick-card">
            <div class="quick-header">
              <span class="quick-icon">🎯</span>
              <span class="quick-title">{{ t('functionVsHttp.scenarioTitle') }}</span>
            </div>
            <div class="quick-content">
              <div class="scenario-table">
                <div class="scenario-row header">
                  <div v-for="header in scenarioHeaders" :key="header" class="scenario-cell">
                    {{ header }}
                  </div>
                </div>
                <div v-for="item in scenarios" :key="item.scenario" class="scenario-row">
                  <div class="scenario-cell">{{ item.scenario }}</div>
                  <div class="scenario-cell">
                    <span :class="['badge', item.badgeClass]">{{ item.mode }}</span>
                  </div>
                  <div class="scenario-cell">{{ item.reason }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ t('functionVsHttp.infoTitle') }}</strong>
      <span>{{ t('functionVsHttp.infoText') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { apiIntroLocale } from '../../../locales/api-intro/index.js'

const { t, messages } = useI18n(apiIntroLocale)
const activeTab = ref('compare')
const featureKeys = ['call', 'params', 'result', 'errors']

const tabs = computed(() => messages.value.functionVsHttp.tabs)
const featureLabels = computed(() => messages.value.functionVsHttp.featureLabels)
const compareCards = computed(() => messages.value.functionVsHttp.compareCards)
const docCards = computed(() => messages.value.functionVsHttp.docCards)
const decisionItems = computed(() => messages.value.functionVsHttp.decisionItems)
const scenarioHeaders = computed(() => messages.value.functionVsHttp.scenarioHeaders)
const scenarios = computed(() => messages.value.functionVsHttp.scenarios)
</script>

<style scoped>
.api-compare-root {
  margin: 20px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}

.demo-header {
  padding: 16px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.title {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.subtitle {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.control-panel {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.tab-btn {
  flex: 1;
  padding: 12px 16px;
  background: transparent;
  border: none;
  border-right: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--vp-c-text-2);
}

.tab-btn:last-child {
  border-right: none;
}

.tab-btn:hover {
  background: var(--vp-c-bg-mute);
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
}

.visualization-area {
  padding: 20px;
  background: var(--vp-c-bg);
}

.compare-view {
  width: 100%;
}

.compare-cards {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  align-items: stretch;
}

@media (max-width: 768px) {
  .compare-cards {
    grid-template-columns: 1fr;
  }
  .vs-divider {
    display: none;
  }
}

.compare-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.card-header {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.95rem;
}

.card-header.function {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.card-header.http {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
}

.card-icon {
  font-size: 1.2rem;
}

.card-body {
  padding: 16px;
}

.feature-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}

@media (max-width: 480px) {
  .feature-list {
    grid-template-columns: 1fr;
  }
}

.feature-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.feature-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.feature-value {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.code-block {
  background: #0a0a0a;
  border-radius: 6px;
  overflow: hidden;
}

.code-label {
  padding: 8px 12px;
  background: #18181b;
  color: #71717a;
  font-size: 0.75rem;
  font-weight: 600;
  border-bottom: 1px solid #27272a;
}

.code-block pre {
  margin: 0;
  padding: 12px;
  color: #e4e4e7;
  font-size: 0.8rem;
  line-height: 1.6;
  overflow-x: auto;
}

.code-block code {
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
}

.vs-divider {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vs-text {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--vp-c-bg-alt);
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.docs-view {
  width: 100%;
}

.docs-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .docs-cards {
    grid-template-columns: 1fr;
  }
}

.doc-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.doc-header {
  padding: 14px 16px;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.doc-icon {
  font-size: 1.2rem;
}

.doc-content {
  padding: 16px;
}

.doc-section {
  margin-bottom: 16px;
}

.doc-section-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 10px;
}

.doc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.doc-list li {
  padding: 6px 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  border-bottom: 1px dashed var(--vp-c-divider);
}

.doc-list li:last-child {
  border-bottom: none;
}

.doc-list strong {
  color: var(--vp-c-brand);
}

.doc-example {
  background: #0a0a0a;
  border-radius: 6px;
  overflow: hidden;
  margin-top: 12px;
}

.doc-example-label {
  padding: 8px 12px;
  background: #18181b;
  color: #71717a;
  font-size: 0.75rem;
  font-weight: 600;
  border-bottom: 1px solid #27272a;
}

.doc-example pre {
  margin: 0;
  padding: 12px;
  color: #e4e4e7;
  font-size: 0.75rem;
  line-height: 1.6;
  overflow-x: auto;
}

.doc-example code {
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
}

.quick-view {
  width: 100%;
}

.quick-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .quick-cards {
    grid-template-columns: 1fr;
  }
}

.quick-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.quick-header {
  padding: 14px 16px;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.quick-icon {
  font-size: 1.2rem;
}

.quick-content {
  padding: 16px;
}

.decision-tree {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.decision-item {
  padding: 14px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.decision-question {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 6px;
}

.decision-question code {
  background: var(--vp-c-bg-mute);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.decision-answer {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.decision-example {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-top: 6px;
  padding-top: 6px;
  border-top: 1px dashed var(--vp-c-divider);
}

.decision-arrow {
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 1.2rem;
}

.scenario-table {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.scenario-row {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1.2fr;
  gap: 12px;
  padding: 12px;
  background: var(--vp-c-bg);
  align-items: center;
}

.scenario-row.header {
  background: var(--vp-c-bg-alt);
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.scenario-cell {
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
}

.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge.function {
  background: rgba(16, 185, 129, 0.15);
  color: #059669;
}

.badge.http {
  background: rgba(59, 130, 246, 0.15);
  color: #2563eb;
}

/* Info Box */
.info-box {
  display: flex;
  gap: 0.5rem;
  padding: 14px 20px;
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
  color: var(--vp-c-text-1);
}
</style>
