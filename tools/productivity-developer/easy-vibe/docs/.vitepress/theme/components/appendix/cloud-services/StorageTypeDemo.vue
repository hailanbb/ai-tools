<template>
  <div class="storage-type-demo">
    <div class="type-cards">
      <div 
        v-for="type in storageTypes" 
        :key="type.id"
        class="type-card"
        :class="{ active: selectedType === type.id }"
        @click="selectedType = type.id"
      >
        <div class="type-icon">
          {{ type.icon }}
        </div>
        <div class="type-name">
          {{ type.name }}
        </div>
        <div class="type-example">
          {{ type.example }}
        </div>
      </div>
    </div>
    
    <div
      v-if="selectedTypeData"
      class="type-detail"
    >
      <div class="detail-row">
        <span class="label">{{ t('storageType.features') }}</span>
        <span class="value">{{ selectedTypeData.features }}</span>
      </div>
      <div class="detail-row">
        <span class="label">{{ t('storageType.scenarios') }}</span>
        <span class="value">{{ selectedTypeData.scenarios }}</span>
      </div>
      <div class="detail-row">
        <span class="label">{{ t('storageType.pricing') }}</span>
        <span class="value">{{ selectedTypeData.pricing }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { cloudServicesLocale } from '../../../locales/cloud-services/index.js'

const { t, messages } = useI18n(cloudServicesLocale)

const selectedType = ref('object')
const storageTypes = computed(() => messages.value.storageType.types)

const selectedTypeData = computed(() => 
  storageTypes.value.find((type) => type.id === selectedType.value)
)
</script>

<style scoped>
.storage-type-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.type-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.type-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.type-card:hover {
  border-color: var(--vp-c-brand);
}

.type-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.type-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.type-name {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.15rem;
}

.type-example {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.type-detail {
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-row {
  display: flex;
  gap: 0.75rem;
  font-size: 0.85rem;
}

.detail-row .label {
  color: var(--vp-c-text-2);
  width: 80px;
  flex-shrink: 0;
}

.detail-row .value {
  flex: 1;
}

@media (max-width: 640px) {
  .type-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
