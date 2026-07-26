<template>
  <div class="layers-demo">
    <div class="header">
      <div class="title">{{ t('layers.title') }}</div>
      <div class="subtitle">{{ t('layers.subtitle') }}</div>
    </div>

    <div class="layer-tabs">
      <button
        v-for="l in layers"
        :key="l.key"
        :class="['tab-btn', { active: activeLayer === l.key }]"
        @click="activeLayer = activeLayer === l.key ? null : l.key"
      >
        {{ l.name }}
      </button>
    </div>

    <div v-if="current" class="layer-detail">
      <div class="detail-name">{{ current.name }}</div>
      <div class="detail-desc">{{ current.desc }}</div>
      <div class="detail-section">
        <span class="section-label">{{ t('layers.labels.params') }}</span>
        <code v-for="(p, i) in current.params" :key="i" class="param-tag">{{ p }}</code>
      </div>
      <div class="detail-section">
        <span class="section-label">{{ t('layers.labels.usage') }}</span>
        <span class="usage-text">{{ current.usage }}</span>
      </div>
      <div class="detail-code">
        <code>{{ current.code }}</code>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { neuralNetworksLocale } from '../../../locales/neural-networks/index.js'

const { t, messages } = useI18n(neuralNetworksLocale)

const activeLayer = ref('dense')

const layers = computed(() => messages.value.layers.items)
const current = computed(() => layers.value.find(l => l.key === activeLayer.value))
</script>

<style scoped>
.layers-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.layer-tabs { display: flex; gap: 0.4rem; margin-bottom: 1rem; flex-wrap: wrap; }
.tab-btn {
  padding: 0.35rem 0.7rem; border-radius: 6px; cursor: pointer;
  font-size: 0.8rem; font-weight: 600; background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider); transition: all 0.2s;
  color: var(--vp-c-text-2);
}
.tab-btn:hover { border-color: var(--vp-c-brand); }
.tab-btn.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); color: var(--vp-c-text-1); }
.layer-detail {
  background: var(--vp-c-bg); border-radius: 8px; padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}
.detail-name { font-weight: 700; font-size: 0.95rem; color: var(--vp-c-brand); margin-bottom: 0.3rem; }
.detail-desc { font-size: 0.82rem; color: var(--vp-c-text-2); margin-bottom: 0.6rem; line-height: 1.5; }
.detail-section { font-size: 0.8rem; margin-bottom: 0.4rem; display: flex; flex-wrap: wrap; gap: 0.3rem; align-items: center; }
.section-label { font-weight: 600; color: var(--vp-c-text-2); }
.param-tag {
  background: rgba(var(--vp-c-brand-rgb), 0.08); padding: 0.15rem 0.4rem;
  border-radius: 4px; font-size: 0.72rem;
}
.usage-text { color: var(--vp-c-text-2); }
.detail-code {
  margin-top: 0.5rem; padding: 0.5rem 0.7rem; background: var(--vp-c-bg-soft);
  border-radius: 6px; font-family: var(--vp-font-family-mono); font-size: 0.75rem;
  color: var(--vp-c-brand);
}
</style>
