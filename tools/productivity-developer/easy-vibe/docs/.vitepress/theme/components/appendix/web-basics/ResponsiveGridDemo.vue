<template>
  <div class="responsive-demo">
    <div class="header">
      <div class="title">
        {{ t('frameworks.responsiveGrid.title') }}
      </div>
      <div class="subtitle">
        {{ t('frameworks.responsiveGrid.subtitle') }}
      </div>
    </div>

    <div class="controls">
      <label>
        {{ t('frameworks.responsiveGrid.viewport') }}<strong>{{ viewportWidth }}</strong> px
      </label>
      <input
        v-model="viewportWidth"
        type="range"
        min="320"
        max="1200"
        step="10"
      >
    </div>

    <div
      class="preview"
      :style="{ width: viewportWidth + 'px' }"
    >
      <div
        class="grid"
        :style="gridStyle"
      >
        <div
          v-for="n in 6"
          :key="n"
          class="card"
        >
          {{ t('frameworks.responsiveGrid.card', { n }) }}
        </div>
      </div>
    </div>

    <div class="note">
      {{ t('frameworks.responsiveGrid.columns') }}<strong>{{ columns }}</strong>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { webBasicsLocale } from '../../../locales/web-basics/index.js'

const { t } = useI18n(webBasicsLocale)

const viewportWidth = ref(860)

const columns = computed(() => {
  if (viewportWidth.value < 640) return 1
  if (viewportWidth.value < 900) return 2
  return 3
})

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${columns.value}, minmax(0, 1fr))`
}))
</script>

<style scoped>
.responsive-demo {
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
}

.preview {
  border: 1px dashed var(--vp-c-divider);
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 10px;
  background: var(--vp-c-bg);
  overflow: hidden;
  max-width: 100%;
}

.grid {
  display: grid;
  gap: 0.6rem;
}

.card {
  background: rgba(59, 130, 246, 0.12);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 6px;
  padding: 0.75rem;
  font-size: 0.9rem;
  text-align: center;
}

.note {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}
</style>
