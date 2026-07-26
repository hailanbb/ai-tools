<template>
  <div class="demo">
    <div class="header">
      <span class="icon">🎨</span>
      <span class="title">{{ t('style.title') }}</span>
    </div>

    <div class="tabs">
      <button
        v-for="style in styles"
        :key="style.id"
        :class="['tab', { active: active === style.id }]"
        @click="active = style.id"
      >
        <span v-html="style.icon" />
        {{ style.name }}
      </button>
    </div>

    <div class="content">
      <div class="style-header">
        <h4>{{ currentStyle.name }}</h4>
        <span class="badge">{{ currentStyle.badge }}</span>
      </div>

      <p class="desc">{{ currentStyle.desc }}</p>

      <div class="example-section">
        <div class="example-label">{{ t('style.exampleLabel') }}</div>
        <pre class="code-block"><code>{{ currentStyle.example }}</code></pre>
      </div>

      <div class="features">
        <div class="features-title">{{ t('style.featuresTitle') }}</div>
        <div class="features-grid">
          <div
            v-for="(f, i) in currentStyle.features"
            :key="i"
            class="feature-item"
          >
            <span class="check">✓</span>
            <span>{{ f }}</span>
          </div>
        </div>
      </div>

      <div class="meta">
        <div class="meta-row">
          <span class="meta-label">{{ t('style.scenarioLabel') }}</span>
          <span class="meta-value">{{ currentStyle.scenarios }}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">{{ t('style.officialLabel') }}</span>
          <a :href="currentStyle.official" target="_blank" class="meta-link">{{
            currentStyle.official
          }}</a>
        </div>
      </div>
    </div>

    <div class="compare-section">
      <div class="compare-title" v-html="t('style.compareTitle')" />
      <div class="compare-table">
        <div class="compare-row head">
          <div
            v-for="(header, idx) in compareHeaders"
            :key="header"
            class="cell"
            :class="{ highlight: idx === 2 }"
          >
            {{ header }}
          </div>
        </div>
        <div
          v-for="row in compareRows"
          :key="row[0]"
          class="compare-row"
        >
          <div
            v-for="(cell, idx) in row"
            :key="idx"
            class="cell"
            :class="cellClass(row, idx)"
          >
            {{ cell }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { apiDesignLocale } from '../../../locales/api-design/index.js'

const { t, messages } = useI18n(apiDesignLocale)
const active = ref('rest')
const styles = computed(() => messages.value.style.styles)
const compareHeaders = computed(() => messages.value.style.compareHeaders)
const compareRows = computed(() => messages.value.style.compareRows)

const currentStyle = computed(() => {
  return styles.value.find((s) => s.id === active.value) || styles.value[1]
})

function cellClass(row, idx) {
  if (idx === 2) return 'highlight'
  if (row[0] === compareRows.value[2]?.[0] && idx === 1) return 'low'
  if (row[0] === compareRows.value[2]?.[0] && idx === 4) return 'high'
  if (row[0] === compareRows.value[3]?.[0] && idx === 4) return 'best'
  return ''
}
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
  overflow: hidden;
}

.header {
  padding: 14px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  font-size: 20px;
}

.title {
  font-weight: 600;
  font-size: 15px;
}

.tabs {
  display: flex;
  gap: 6px;
  padding: 12px 16px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  overflow-x: auto;
}

.tab {
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.tab:hover {
  border-color: var(--vp-c-brand);
}

.tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.content {
  padding: 20px;
}

.style-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.style-header h4 {
  margin: 0;
  font-size: 18px;
}

.badge {
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: color-mix(in srgb, var(--vp-c-brand) 15%, transparent);
  color: var(--vp-c-brand);
}

.desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0 0 16px 0;
}

.example-section {
  margin-bottom: 16px;
}

.example-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.code-block {
  background: #1e293b;
  color: #e2e8f0;
  padding: 14px;
  border-radius: 8px;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 12px;
  line-height: 1.6;
  overflow-x: auto;
  margin: 0;
}

.features {
  margin-bottom: 16px;
}

.features-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 10px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

@media (max-width: 640px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.check {
  color: var(--vp-c-brand);
  font-weight: bold;
}

.meta {
  padding-top: 14px;
  border-top: 1px solid var(--vp-c-divider);
}

.meta-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 8px;
  font-size: 13px;
}

.meta-label {
  color: var(--vp-c-text-3);
  min-width: 70px;
  flex-shrink: 0;
}

.meta-value {
  color: var(--vp-c-text-2);
}

.meta-link {
  color: var(--vp-c-brand);
  text-decoration: none;
  word-break: break-all;
}

.meta-link:hover {
  text-decoration: underline;
}

.compare-section {
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  padding: 16px 20px;
}

.compare-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
}

.compare-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.compare-row {
  display: grid;
  grid-template-columns: 1fr repeat(4, 1fr);
}

.compare-row:nth-child(odd) {
  background: var(--vp-c-bg-soft);
}

.compare-row:nth-child(even) {
  background: var(--vp-c-bg);
}

.compare-row.head {
  background: var(--vp-c-bg-alt);
}

.cell {
  padding: 10px 8px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  text-align: center;
  border-right: 1px solid var(--vp-c-divider);
}

.cell:last-child {
  border-right: none;
}

.head .cell {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.cell:first-child {
  text-align: left;
  font-weight: 500;
  color: var(--vp-c-text-1);
  padding-left: 12px;
}

.cell.highlight {
  background: color-mix(in srgb, var(--vp-c-brand) 10%, transparent);
  color: var(--vp-c-brand);
  font-weight: 600;
}

.cell.low {
  color: #22c55e;
}

.cell.high {
  color: #f59e0b;
}

.cell.best {
  color: #22c55e;
  font-weight: 600;
}

@media (max-width: 640px) {
  .compare-row {
    grid-template-columns: 70px repeat(4, 1fr);
  }
  .cell {
    padding: 8px 4px;
    font-size: 11px;
  }
}
</style>
