<template>
  <div class="storage-type-demo">
    <div class="header">
      <div class="title">{{ t('storageTypes.title') }}</div>
      <div class="subtitle">{{ t('storageTypes.subtitle') }}</div>
    </div>

    <div class="type-cards">
      <div
        v-for="type in types"
        :key="type.key"
        :class="['type-card', { active: selected === type.key }]"
        @click="selected = type.key"
      >
        <div class="type-icon">{{ type.icon }}</div>
        <div class="type-name">{{ type.name }}</div>
      </div>
    </div>

    <div v-if="current" class="detail">
      <div class="detail-title">{{ current.name }}</div>
      <div class="detail-desc">{{ current.desc }}</div>
      <div class="detail-grid">
        <div class="detail-item">
          <div class="item-label">{{ t('storageTypes.labels.access') }}</div>
          <div class="item-value">{{ current.access }}</div>
        </div>
        <div class="detail-item">
          <div class="item-label">{{ t('storageTypes.labels.scenario') }}</div>
          <div class="item-value">{{ current.scenario }}</div>
        </div>
        <div class="detail-item">
          <div class="item-label">{{ t('storageTypes.labels.products') }}</div>
          <div class="item-value">{{ current.products }}</div>
        </div>
        <div class="detail-item">
          <div class="item-label">{{ t('storageTypes.labels.scalability') }}</div>
          <div class="item-value">{{ current.scalability }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { fileStorageLocale } from '../../../locales/file-storage/index.js'

const { t, messages } = useI18n(fileStorageLocale)

const selected = ref('object')

const types = computed(() => messages.value.storageTypes.types)
const current = computed(() => types.value.find(t => t.key === selected.value))
</script>

<style scoped>
.storage-type-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.type-cards { display: flex; gap: 0.75rem; margin-bottom: 1rem; }
.type-card {
  flex: 1; padding: 1rem; border-radius: 10px; background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider); cursor: pointer; text-align: center; transition: all 0.2s;
}
.type-card:hover { border-color: var(--vp-c-brand); }
.type-card.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); }
.type-icon { font-size: 2rem; margin-bottom: 0.5rem; }
.type-name { font-weight: 700; font-size: 0.95rem; }
.detail {
  padding: 1rem; border-radius: 10px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.detail-title { font-weight: 700; font-size: 1rem; margin-bottom: 0.5rem; }
.detail-desc { font-size: 0.9rem; color: var(--vp-c-text-2); line-height: 1.6; margin-bottom: 1rem; }
.detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.detail-item { padding: 0.5rem 0.75rem; background: var(--vp-c-bg-soft); border-radius: 6px; }
.item-label { font-weight: 600; font-size: 0.8rem; color: var(--vp-c-text-3); margin-bottom: 0.25rem; }
.item-value { font-size: 0.85rem; color: var(--vp-c-text-2); line-height: 1.5; }
@media (max-width: 640px) {
  .type-cards { flex-direction: column; }
  .detail-grid { grid-template-columns: 1fr; }
}
</style>
