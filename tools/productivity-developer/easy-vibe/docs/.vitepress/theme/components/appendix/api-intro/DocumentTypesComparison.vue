<template>
  <div class="doc-types-root">
    <div class="demo-header">
      <span class="title">{{ t('documentTypes.title') }}</span>
      <span class="subtitle">{{ t('documentTypes.subtitle') }}</span>
    </div>

    <div class="control-panel">
      <button
        v-for="doc in docTypes"
        :key="doc.id"
        :class="['doc-tab', { active: activeDoc === doc.id }]"
        @click="activeDoc = doc.id"
      >
        <span class="tab-icon">{{ doc.icon }}</span>
        <span class="tab-name">{{ doc.name }}</span>
      </button>
    </div>

    <div class="visualization-area">
      <div class="doc-display">
        <div class="doc-info-bar">
          <div class="info-item">
            <span class="info-label">{{ t('documentTypes.infoLabels.type') }}</span>
            <span class="info-value">{{ currentDoc.name }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ t('documentTypes.infoLabels.scenario') }}</span>
            <span class="info-value">{{ currentDoc.scenario }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ t('documentTypes.infoLabels.difficulty') }}</span>
            <span class="info-value">
              <span class="difficulty-stars">{{ currentDoc.difficulty }}</span>
            </span>
          </div>
        </div>

        <div class="key-points">
          <div class="point-section">
            <div class="point-title">{{ t('documentTypes.keyPointsTitle') }}</div>
            <div class="point-tags">
              <span v-for="(point, idx) in currentDoc.keyPoints" :key="idx" class="point-tag">
                {{ point }}
              </span>
            </div>
          </div>
        </div>

        <div class="doc-example-area">
          <div class="example-header">
            <span class="example-icon">📝</span>
            <span class="example-title">{{ t('documentTypes.exampleTitle') }}</span>
          </div>
          <div class="example-content">
            <pre><code>{{ currentDoc.example }}</code></pre>
          </div>
        </div>

        <div class="reading-tips">
          <div class="tips-header">
            <span class="tips-icon">💡</span>
            <span class="tips-title">{{ t('documentTypes.tipsTitle') }}</span>
          </div>
          <ul class="tips-list">
            <li v-for="(tip, idx) in currentDoc.tips" :key="idx">{{ tip }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="comparison-summary">
      <div class="summary-header">
        <span class="summary-icon">📊</span>
        <span class="summary-title">{{ t('documentTypes.summaryTitle') }}</span>
      </div>
      <div class="summary-table">
        <div class="summary-row header">
          <div v-for="header in summaryHeaders" :key="header" class="summary-cell">
            {{ header }}
          </div>
        </div>
        <div v-for="row in summaryRows" :key="row[0]" class="summary-row">
          <div class="summary-cell label">{{ row[0] }}</div>
          <div class="summary-cell">{{ row[1] }}</div>
          <div class="summary-cell">{{ row[2] }}</div>
          <div class="summary-cell">{{ row[3] }}</div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ t('documentTypes.infoTitle') }}</strong>
      <span>{{ t('documentTypes.infoText') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { apiIntroLocale } from '../../../locales/api-intro/index.js'

const { t, messages } = useI18n(apiIntroLocale)
const activeDoc = ref('function')

const docTypes = computed(() => messages.value.documentTypes.docTypes)
const summaryHeaders = computed(() => messages.value.documentTypes.summaryHeaders)
const summaryRows = computed(() => messages.value.documentTypes.summaryRows)

const currentDoc = computed(() => {
  return docTypes.value.find((doc) => doc.id === activeDoc.value) || docTypes.value[0]
})
</script>

<style scoped>
.doc-types-root {
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

.doc-tab {
  flex: 1;
  padding: 14px 12px;
  background: transparent;
  border: none;
  border-right: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--vp-c-text-2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.doc-tab:last-child {
  border-right: none;
}

.doc-tab:hover {
  background: var(--vp-c-bg-mute);
}

.doc-tab.active {
  background: var(--vp-c-brand);
  color: white;
}

.tab-icon {
  font-size: 1.4rem;
}

.tab-name {
  font-size: 0.8rem;
}

.visualization-area {
  padding: 20px;
  background: var(--vp-c-bg);
}

.doc-display {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.doc-info-bar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

@media (max-width: 600px) {
  .doc-info-bar {
    grid-template-columns: 1fr;
  }
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.info-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.difficulty-stars {
  color: #f59e0b;
}

.key-points {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
}

.point-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.point-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.point-tag {
  padding: 6px 12px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.doc-example-area {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: #0a0a0a;
}

.example-header {
  padding: 12px 16px;
  background: #18181b;
  border-bottom: 1px solid #27272a;
  display: flex;
  align-items: center;
  gap: 8px;
}

.example-icon {
  font-size: 1rem;
}

.example-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: #a1a1aa;
}

.example-content pre {
  margin: 0;
  padding: 16px;
  color: #e4e4e7;
  font-size: 0.8rem;
  line-height: 1.7;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.example-content code {
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
}

.reading-tips {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
}

.tips-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.tips-icon {
  font-size: 1rem;
}

.tips-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tips-list li {
  padding: 10px 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  border-left: 3px solid var(--vp-c-brand);
}

.comparison-summary {
  margin: 0 20px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.summary-header {
  padding: 14px 16px;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.summary-icon {
  font-size: 1.1rem;
}

.summary-table {
  display: flex;
  flex-direction: column;
}

.summary-row {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1.2fr 1.2fr;
  gap: 1px;
  background: var(--vp-c-divider);
}

.summary-row:not(.header) {
  background: var(--vp-c-divider);
}

.summary-row.header {
  background: var(--vp-c-bg-alt);
}

.summary-row.header .summary-cell {
  background: var(--vp-c-bg-alt);
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.summary-cell {
  padding: 12px;
  background: var(--vp-c-bg);
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
}

.summary-cell.label {
  font-weight: 600;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
}

@media (max-width: 768px) {
  .summary-row {
    grid-template-columns: 1fr;
  }
  
  .summary-row.header {
    display: none;
  }
  
  .summary-cell {
    padding: 8px 12px;
  }
  
  .summary-cell::before {
    content: attr(data-label);
    font-weight: 600;
    color: var(--vp-c-text-2);
    margin-right: 8px;
  }
}

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
