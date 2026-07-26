<template>
  <div class="image-optimization-demo">
    <div class="header">
      <div class="title">
        {{ t('imageOptimization.title') }}
      </div>
      <div class="subtitle">
        {{ t('imageOptimization.subtitle') }}
      </div>
    </div>

    <div class="format-grid">
      <div
        v-for="format in formats"
        :key="format.name"
        class="format-card"
        :class="{ selected: selectedFormat === format.name }"
        @click="selectFormat(format.name)"
      >
        <div class="format-header">
          <div class="format-name">
            {{ format.name }}
          </div>
          <div
            class="format-badge"
            :class="format.badgeClass"
          >
            {{ format.badge }}
          </div>
        </div>

        <div
          class="format-preview"
          :style="{ background: format.gradient }"
        >
          <div class="preview-content">
            <div class="preview-image">
              🖼️
            </div>
            <div class="preview-size">
              {{ format.size }}
            </div>
          </div>
        </div>

        <div class="format-metrics">
          <div class="metric">
            <span class="metric-label">{{ t('imageOptimization.labels.fileSize') }}</span>
            <span class="metric-value">{{ format.fileSize }}</span>
          </div>
          <div class="metric">
            <span class="metric-label">{{ t('imageOptimization.labels.compression') }}</span>
            <span class="metric-value">{{ format.compression }}</span>
          </div>
          <div class="metric">
            <span class="metric-label">{{ t('imageOptimization.labels.quality') }}</span>
            <div class="quality-bar">
              <div
                class="quality-fill"
                :style="{ width: format.quality + '%' }"
              />
            </div>
          </div>
          <div class="metric">
            <span class="metric-label">{{ t('imageOptimization.labels.support') }}</span>
            <span class="metric-value">{{ format.support }}</span>
          </div>
        </div>

        <div class="format-use-case">
          <div class="use-case-label">
            {{ t('imageOptimization.labels.useCase') }}
          </div>
          <div class="use-case-value">
            {{ format.useCase }}
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <h4>{{ t('imageOptimization.labels.detailComparison') }}</h4>
      <table>
        <thead>
          <tr>
            <th>{{ t('imageOptimization.labels.format') }}</th>
            <th>{{ t('imageOptimization.labels.size') }}</th>
            <th>{{ t('imageOptimization.labels.quality') }}</th>
            <th>{{ t('imageOptimization.labels.transparency') }}</th>
            <th>{{ t('imageOptimization.labels.animation') }}</th>
            <th>{{ t('imageOptimization.labels.rating') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="format in formats"
            :key="format.name"
          >
            <td>
              <strong>{{ format.name }}</strong>
            </td>
            <td>{{ format.sizeLevel }}</td>
            <td>{{ format.qualityLevel }}</td>
            <td>{{ format.transparency ? '✓' : '✗' }}</td>
            <td>{{ format.animation ? '✓' : '✗' }}</td>
            <td>
              <div class="recommendation">
                <div class="stars">
                  {{ '★'.repeat(Math.round(format.rating))
                  }}{{ '☆'.repeat(5 - Math.round(format.rating)) }}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="tips">
      <div
        v-for="tip in messages.imageOptimization.tips"
        :key="tip.title"
        class="tip-card"
      >
        <div class="tip-icon">
          {{ tip.icon }}
        </div>
        <div class="tip-content">
          <h4>{{ tip.title }}</h4>
          <ul>
            <li v-for="item in tip.items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { frontendPerformanceLocale } from '../../../locales/frontend-performance/index.js'

const selectedFormat = ref('WebP')
const { t, messages } = useI18n(frontendPerformanceLocale)
const formats = computed(() => messages.value.imageOptimization.formats)

function selectFormat(name) {
  selectedFormat.value = name
}
</script>

<style scoped>
.image-optimization-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1.5rem;
}

.title {
  font-weight: 700;
  font-size: 1.05rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-top: 0.3rem;
}

.format-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.format-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.3s;
}

.format-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.format-card.selected {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.format-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.format-name {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.format-badge {
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
}

.format-badge.classic {
  background: #dbeafe;
  color: #1e40af;
}

.format-badge.lossless {
  background: #ede9fe;
  color: #5b21b6;
}

.format-badge.recommended {
  background: #d1fae5;
  color: #065f46;
}

.format-badge.latest {
  background: #fce7f3;
  color: #9d174d;
}

.format-preview {
  height: 120px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.preview-content {
  text-align: center;
  color: #fff;
}

.preview-image {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.preview-size {
  font-size: 0.9rem;
  font-weight: 600;
}

.format-metrics {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
}

.metric-label {
  color: var(--vp-c-text-2);
}

.metric-value {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.quality-bar {
  width: 80px;
  height: 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 999px;
  overflow: hidden;
}

.quality-fill {
  height: 100%;
  background: linear-gradient(90deg, #22c55e, #14b8a6);
  transition: width 0.3s;
}

.format-use-case {
  padding-top: 0.8rem;
  border-top: 1px solid var(--vp-c-divider);
}

.use-case-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.3rem;
}

.use-case-value {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.comparison-table {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.comparison-table h4 {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

thead {
  background: var(--vp-c-bg-soft);
}

th {
  padding: 0.8rem;
  text-align: left;
  font-weight: 600;
  color: var(--vp-c-text-1);
  border-bottom: 2px solid var(--vp-c-divider);
}

td {
  padding: 0.8rem;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

tr:last-child td {
  border-bottom: none;
}

.stars {
  color: #f59e0b;
}

.tips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.tip-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1.2rem;
  display: flex;
  gap: 1rem;
}

.tip-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.tip-content {
  flex: 1;
}

.tip-content h4 {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.6rem;
  color: var(--vp-c-text-1);
}

.tip-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tip-content li {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin-bottom: 0.3rem;
}

.tip-content li:last-child {
  margin-bottom: 0;
}

.inline-code {
  background: var(--vp-c-bg-soft);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.8rem;
  color: var(--vp-c-brand);
}
</style>
