<template>
  <div class="state-management-comparison">
    <div class="demo-header">
      <span class="icon">📊</span>
      <span class="title">{{ t('comparison.title') }}</span>
      <span class="subtitle">{{ t('comparison.subtitle') }}</span>
    </div>

    <div class="intro-text">
      {{ t('comparison.introPrefix') }}<span class="highlight">{{ t('comparison.introHighlight') }}</span>{{ t('comparison.introSuffix') }}
    </div>

    <div class="demo-content">
      <div class="comparison-table">
        <div class="table-header">
          <div class="header-col first">
            {{ t('comparison.headers.tool') }}
          </div>
          <div class="header-col">
            {{ t('comparison.headers.difficulty') }}
          </div>
          <div class="header-col">
            {{ t('comparison.headers.size') }}
          </div>
          <div class="header-col">
            {{ t('comparison.headers.framework') }}
          </div>
        </div>
        <div class="table-body">
          <div
            v-for="lib in libraries"
            :key="lib.id"
            class="table-row"
            :class="{ selected: selectedLib === lib.id }"
            @click="selectedLib = lib.id"
          >
            <div class="row-col first">
              <span class="lib-icon">{{ lib.icon }}</span>
              <span class="lib-name">{{ lib.name }}</span>
            </div>
            <div class="row-col">
              <div class="curve-bar">
                <div
                  class="curve-fill"
                  :style="{ width: lib.learningCurve + '%', background: getCurveColor(lib.learningCurve) }"
                />
              </div>
              <span class="curve-label">{{ getCurveLabel(lib.learningCurve) }}</span>
            </div>
            <div class="row-col">
              <span
                class="size-badge"
                :class="getSizeClass(lib.bundleSize)"
              >{{ lib.bundleSize }}</span>
            </div>
            <div class="row-col">
              <span class="framework-text">{{ lib.framework }}</span>
            </div>
          </div>
        </div>
      </div>

      <Transition name="fade">
        <div
          v-if="selectedLibrary"
          class="library-detail"
        >
          <div class="detail-header">
            <span class="detail-icon">{{ selectedLibrary.icon }}</span>
            <div class="detail-title">
              <h5>{{ selectedLibrary.name }}</h5>
              <p class="tagline">
                {{ selectedLibrary.tagline }}
              </p>
            </div>
          </div>

          <div class="detail-grid">
            <div class="detail-section compact">
              <div class="section-title">
                {{ t('comparison.scenariosTitle') }}
              </div>
              <div class="section-content">
                {{ selectedLibrary.scenarios.join(t('common.listSeparator')) }}
              </div>
            </div>

            <div class="detail-section compact">
              <div class="section-title green">
                {{ t('comparison.prosTitle') }}
              </div>
              <div class="section-content">
                {{ selectedLibrary.pros.slice(0, 2).join(t('common.semicolonSeparator')) }}
              </div>
            </div>

            <div class="detail-section compact">
              <div class="section-title red">
                {{ t('comparison.consTitle') }}
              </div>
              <div class="section-content">
                {{ selectedLibrary.cons.slice(0, 2).join(t('common.semicolonSeparator')) }}
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.recommendation') }}</strong>{{ t('comparison.idea') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { componentStateManagementLocale } from '../../../locales/component-state-management/index.js'

const { t, messages } = useI18n(componentStateManagementLocale)

const selectedLib = ref('pinia')

const libraries = computed(() => messages.value.comparison.libraries)

const selectedLibrary = computed(() => {
  return libraries.value.find(lib => lib.id === selectedLib.value)
})

function getCurveColor(value) {
  if (value <= 30) return 'var(--vp-c-brand-1)'
  if (value <= 60) return 'var(--vp-c-warning-1)'
  return 'var(--vp-c-danger-1)'
}

function getCurveLabel(value) {
  const m = messages.value.comparison
  if (value <= 30) return m.easy
  if (value <= 60) return m.medium
  return m.hard
}

function getSizeClass(size) {
  const num = parseInt(size)
  if (num <= 2) return 'small'
  if (num <= 5) return 'medium'
  return 'large'
}
</script>

<style scoped>
.state-management-comparison {
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

.demo-content {
  margin-bottom: 1rem;
}

.comparison-table {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.table-header {
  display: grid;
  grid-template-columns: 1.8fr 1.2fr 0.8fr 1.2fr;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.header-col {
  padding: 0.5rem 0.75rem;
  font-weight: 600;
  font-size: 0.8rem;
  border-right: 1px solid var(--vp-c-divider);
}

.header-col:last-child {
  border-right: none;
}

.table-body {
  display: flex;
  flex-direction: column;
}

.table-row {
  display: grid;
  grid-template-columns: 1.8fr 1.2fr 0.8fr 1.2fr;
  border-bottom: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition: background 0.2s;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background: var(--vp-c-bg-soft);
}

.table-row.selected {
  background: var(--vp-c-brand-soft);
}

.row-col {
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
  border-right: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.row-col:last-child {
  border-right: none;
}

.row-col.first {
  font-weight: 500;
}

.lib-icon {
  font-size: 1rem;
}

.lib-name {
  color: var(--vp-c-text-1);
}

.curve-bar {
  flex: 1;
  height: 5px;
  background: var(--vp-c-divider);
  border-radius: 3px;
  overflow: hidden;
  min-width: 50px;
}

.curve-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s;
}

.curve-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.size-badge {
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-size: 0.75rem;
  font-weight: 500;
}

.size-badge.small {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.size-badge.medium {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.size-badge.large {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.framework-text {
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
}

.library-detail {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-title h5 {
  margin: 0 0 0.2rem;
  font-size: 1rem;
}

.tagline {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.detail-section.compact {
  background: var(--vp-c-bg-soft);
  padding: 0.5rem;
  border-radius: 4px;
}

.section-title {
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: var(--vp-c-text-1);
}

.section-title.green {
  color: #22c55e;
}

.section-title.red {
  color: #ef4444;
}

.section-content {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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

@media (max-width: 768px) {
  .table-header,
  .table-row {
    grid-template-columns: 1.5fr 1fr 0.7fr 1fr;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>
