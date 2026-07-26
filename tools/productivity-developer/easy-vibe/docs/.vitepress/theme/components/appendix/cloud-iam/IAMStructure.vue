<template>
  <div class="iam-structure">
    <div class="demo-header">
      <span class="icon">🏗️</span>
      <span class="title">{{ t('structure.title') }}</span>
      <span class="subtitle">{{ t('structure.subtitle') }}</span>
    </div>

    <div class="main-area">
      <div class="layers-list">
        <div
          v-for="(layer, index) in layers"
          :key="index"
          class="layer"
          :class="{ active: selectedLayer === index }"
          @click="selectLayer(index)"
        >
          <span class="layer-icon">{{ layer.icon }}</span>
          <span class="layer-name">{{ layer.name }}</span>
          <span class="layer-desc">{{ layer.shortDesc }}</span>
        </div>
      </div>

      <div class="layer-detail">
        <div class="detail-header">
          <span class="detail-icon">{{ selectedLayerData.icon }}</span>
          <span class="detail-name">{{ selectedLayerData.name }}</span>
        </div>
        <div class="detail-desc">
          {{ selectedLayerData.description }}
        </div>
        <div class="detail-examples">
          <span class="example-label">{{ t('structure.exampleLabel') }}</span>
          <span
            v-for="(example, i) in selectedLayerData.examples.slice(0, 2)"
            :key="i"
            class="example-tag"
          >{{ example }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.coreIdea') }}</strong>{{ t('structure.info') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { cloudIamLocale } from '../../../locales/cloud-iam/index.js'

const { t, messages } = useI18n(cloudIamLocale)
const selectedLayer = ref(0)
const layers = computed(() => messages.value.structure.layers)

const selectedLayerData = computed(() => layers.value[selectedLayer.value])

function selectLayer(index) {
  selectedLayer.value = index
}
</script>

<style scoped>
.iam-structure {
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

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.main-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 640px) {
  .main-area { grid-template-columns: 1fr; }
}

.layers-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.layer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.6rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.layer:hover { border-color: var(--vp-c-brand); }
.layer.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.layer-icon { font-size: 1rem; }
.layer-name { font-weight: 600; font-size: 0.85rem; }
.layer-desc { font-size: 0.75rem; color: var(--vp-c-text-2); margin-left: auto; }

.layer-detail {
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
}

.detail-icon { font-size: 1.25rem; }
.detail-name { font-weight: 600; font-size: 0.95rem; }

.detail-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.detail-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;
}

.example-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.example-tag {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 4px;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box .icon { flex-shrink: 0; }
.info-box strong { color: var(--vp-c-text-1); }
</style>
