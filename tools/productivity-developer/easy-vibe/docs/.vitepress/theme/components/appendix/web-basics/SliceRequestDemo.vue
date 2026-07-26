<template>
  <div class="slice-demo">
    <div class="header">
      <div class="title">
        {{ t('frameworks.sliceRequest.title') }}
      </div>
      <div class="subtitle">
        {{ t('frameworks.sliceRequest.subtitle') }}
      </div>
    </div>

    <div class="controls">
      <label>
        {{ t('frameworks.sliceRequest.sliceCount') }}<strong>{{ slices }}</strong> {{ t('frameworks.sliceRequest.sheet') }}
      </label>
      <input
        v-model="slices"
        type="range"
        min="1"
        max="30"
        step="1"
      >
      <label class="toggle">
        <input
          v-model="useSprite"
          type="checkbox"
        >
        {{ t('frameworks.sliceRequest.sprite') }}
      </label>
    </div>

    <div class="metrics">
      <div class="metric">
        <div class="label">
          {{ t('frameworks.sliceRequest.totalRequests') }}
        </div>
        <div class="value">
          {{ totalRequests }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          {{ t('frameworks.sliceRequest.loadTime') }}
        </div>
        <div class="value">
          {{ loadTime }} ms
        </div>
      </div>
    </div>

    <div class="bar">
      <div
        class="progress"
        :style="{ width: barWidth + '%' }"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { webBasicsLocale } from '../../../locales/web-basics/index.js'

const { t } = useI18n(webBasicsLocale)

const slices = ref(12)
const useSprite = ref(false)

const totalRequests = computed(() => {
  const sliceRequests = useSprite.value ? 1 : slices.value
  return sliceRequests + 2
})

const loadTime = computed(() => {
  const base = 120
  const perRequest = 45
  return Math.round(base + totalRequests.value * perRequest)
})

const barWidth = computed(() => Math.min(100, Math.round(loadTime.value / 20)))
</script>

<style scoped>
.slice-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1rem;
}

.title {
  font-weight: 700;
  font-size: 1.05rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.controls label {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
}

.controls input[type='range'] {
  width: 100%;
  margin-bottom: 0.6rem;
}

.toggle {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.metric .label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.metric .value {
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: 0.2rem;
}

.bar {
  height: 10px;
  margin-top: 1rem;
  background: var(--vp-c-bg);
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #f97316, #ef4444);
}
</style>
