<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="title">{{ t('frameworkSpectrum.title') }}</span>
      <span class="subtitle">{{ t('frameworkSpectrum.subtitle') }}</span>
    </div>

    <div class="visualization-area">
      <div class="spectrum-wrapper">
        <div class="spectrum-labels">
          <span class="spectrum-label-left">{{ t('frameworkSpectrum.moreRuntime') }}</span>
          <span class="spectrum-label-right">{{ t('frameworkSpectrum.moreCompile') }}</span>
        </div>
        <div class="spectrum-bar">
          <button
            v-for="fw in frameworks"
            :key="fw.id"
            :class="['spectrum-dot', { selected: selectedId === fw.id }]"
            :style="{ left: fw.percent + '%' }"
            :title="fw.name"
            @click="selectFramework(fw.id)"
          >
            {{ fw.short }}
          </button>
        </div>
        <div class="spectrum-dot-labels">
          <span
            v-for="fw in frameworks"
            :key="'label-' + fw.id"
            class="dot-label"
            :style="{ left: fw.percent + '%' }"
          >
            {{ fw.name }}
          </span>
        </div>
      </div>

      <div class="detail-card">
        <div class="detail-header">
          <span class="detail-emoji">{{ selected.emoji }}</span>
          <span class="detail-name">{{ selected.name }}</span>
        </div>
        <div class="detail-summary">{{ selected.summary }}</div>
        <div class="work-bars">
          <div class="work-bar-row">
            <span class="work-label">{{ t('frameworkSpectrum.runtimeWork') }}</span>
            <div class="work-bar-track">
              <div
                class="work-bar-fill runtime"
                :style="{ width: selected.runtimePercent + '%' }"
              />
            </div>
            <span class="work-value">{{ selected.runtimePercent }}%</span>
          </div>
          <div class="work-bar-row">
            <span class="work-label">{{ t('frameworkSpectrum.compileWork') }}</span>
            <div class="work-bar-track">
              <div
                class="work-bar-fill compile"
                :style="{ width: selected.compilePercent + '%' }"
              />
            </div>
            <span class="work-value">{{ selected.compilePercent }}%</span>
          </div>
        </div>
        <div class="detail-meta">
          <span class="meta-item">
            <span class="meta-label">{{ t('frameworkSpectrum.bundleSize') }}</span>
            <span class="meta-value">{{ selected.bundleSize }}</span>
          </span>
          <span class="meta-item">
            <span class="meta-label">{{ t('frameworkSpectrum.devExperience') }}</span>
            <span class="meta-value">{{ selected.devExperience }}</span>
          </span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ t('frameworkSpectrum.trendStrong') }}</strong>
      {{ t('frameworkSpectrum.trend') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { frameworkNatureLocale } from '../../../locales/framework-nature/index.js'

const { t, messages } = useI18n(frameworkNatureLocale)

const selectedId = ref('vue3')
const frameworksMap = computed(() => messages.value.frameworkSpectrum.frameworks)
const frameworks = computed(() => Object.values(frameworksMap.value))

const selected = computed(
  () => frameworksMap.value[selectedId.value] ?? frameworksMap.value.vue3
)

function selectFramework(id) {
  selectedId.value = id
}
</script>

<style scoped>
.demo-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.demo-header .subtitle {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.visualization-area {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 0.75rem;
}

.spectrum-wrapper {
  position: relative;
  margin: 2rem 0 3rem;
}

.spectrum-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.spectrum-bar {
  position: relative;
  height: 8px;
  background: linear-gradient(
    to right,
    var(--vp-c-brand),
    var(--vp-c-green-1)
  );
  border-radius: 4px;
}

.spectrum-dot {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
  transition: all 0.2s;
  color: var(--vp-c-text-1);
}

.spectrum-dot:hover {
  border-color: var(--vp-c-brand);
}

.spectrum-dot.selected {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 10px var(--vp-c-brand);
  transform: translate(-50%, -50%) scale(1.2);
}

.spectrum-dot-labels {
  position: relative;
  height: 1.5rem;
  margin-top: 0.5rem;
}

.dot-label {
  position: absolute;
  transform: translateX(-50%);
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.detail-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  margin-top: 1rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.detail-emoji {
  font-size: 1.25rem;
}

.detail-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.detail-summary {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
}

.work-bars {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.work-bar-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.work-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  width: 5rem;
  flex-shrink: 0;
}

.work-bar-track {
  flex: 1;
  height: 6px;
  background: var(--vp-c-bg-alt);
  border-radius: 3px;
  overflow: hidden;
}

.work-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.work-bar-fill.runtime {
  background: var(--vp-c-brand);
}

.work-bar-fill.compile {
  background: var(--vp-c-green-1);
}

.work-value {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  width: 2.5rem;
  text-align: right;
}

.detail-meta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: 0.8rem;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.meta-label {
  color: var(--vp-c-text-2);
}

.meta-value {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.info-box {
  display: flex;
  gap: 0.25rem;
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
  color: var(--vp-c-text-1);
}

@media (max-width: 720px) {
  .dot-label {
    font-size: 0.6rem;
  }

  .spectrum-dot {
    width: 28px;
    height: 28px;
    font-size: 0.6rem;
  }

  .detail-card {
    width: 100%;
  }
}
</style>
