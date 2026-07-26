<template>
  <div class="docker-arch-demo">
    <div class="header">
      <div class="title">{{ t('architecture.title') }}</div>
      <div class="subtitle">{{ t('architecture.subtitle') }}</div>
    </div>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="['tab-btn', { active: activeTab === tab.key }]"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="arch-view">
      <div class="layers">
        <div
          v-for="(layer, i) in currentLayers"
          :key="i"
          :class="['layer', layer.type]"
        >
          <div class="layer-label">{{ layer.label }}</div>
          <div v-if="layer.items" class="layer-items">
            <div v-for="(item, j) in layer.items" :key="j" class="layer-item">
              {{ item }}
            </div>
          </div>
        </div>
      </div>

      <div class="comparison">
        <div v-for="(item, i) in currentInfo" :key="i" class="info-row">
          <span class="info-label">{{ item.label }}</span>
          <span :class="['info-value', item.highlight ? 'highlight' : '']">{{ item.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { dockerContainersLocale } from '../../../locales/docker-containers/index.js'

const { t, messages } = useI18n(dockerContainersLocale)

const activeTab = ref('container')

const tabs = computed(() => messages.value.architecture.tabs)
const currentLayers = computed(() => messages.value.architecture.layers[activeTab.value])
const currentInfo = computed(() => messages.value.architecture.info[activeTab.value])
</script>

<style scoped>
.docker-arch-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.tab-btn {
  padding: 0.4rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}
.tab-btn:hover { border-color: var(--vp-c-brand); }
.tab-btn.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}
.arch-view {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
@media (max-width: 640px) {
  .arch-view { grid-template-columns: 1fr; }
}
.layers {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.layer {
  padding: 0.5rem;
  border-radius: 6px;
  text-align: center;
  font-size: 0.78rem;
  font-weight: 600;
}
.layer.app { background: rgba(59, 130, 246, 0.12); color: var(--vp-c-text-1); }
.layer.os { background: rgba(245, 158, 11, 0.12); color: var(--vp-c-text-1); }
.layer.hypervisor { background: rgba(239, 68, 68, 0.12); color: var(--vp-c-text-1); }
.layer.docker { background: rgba(6, 182, 212, 0.15); color: var(--vp-c-text-1); }
.layer.host { background: rgba(34, 197, 94, 0.12); color: var(--vp-c-text-1); }
.layer.hardware { background: rgba(107, 114, 128, 0.12); color: var(--vp-c-text-2); }
.layer-label { margin-bottom: 0.25rem; }
.layer-items {
  display: flex;
  gap: 0.3rem;
  justify-content: center;
  flex-wrap: wrap;
}
.layer-item {
  padding: 0.2rem 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 4px;
  font-size: 0.72rem;
  font-weight: 500;
}
.comparison {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0.6rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 0.8rem;
}
.info-label { color: var(--vp-c-text-2); font-weight: 500; }
.info-value { font-weight: 600; }
.info-value.highlight { color: var(--vp-c-brand); }
</style>
