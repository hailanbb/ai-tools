<template>
  <div class="compute-instance-demo">
    <div class="config-panel">
      <div class="config-row">
        <label>{{ t('computeInstance.region') }}</label>
        <div class="options">
          <button 
            v-for="region in regions" 
            :key="region.id"
            :class="{ active: config.region === region.id }"
            @click="config.region = region.id"
          >
            {{ region.name }}
          </button>
        </div>
      </div>
      <div class="config-row">
        <label>{{ t('computeInstance.spec') }}</label>
        <div class="options">
          <button 
            v-for="spec in specs" 
            :key="spec.id"
            :class="{ active: config.spec === spec.id }"
            @click="config.spec = spec.id"
          >
            {{ spec.name }}
          </button>
        </div>
      </div>
      <div class="config-row">
        <label>{{ t('computeInstance.image') }}</label>
        <div class="options">
          <button 
            v-for="image in images" 
            :key="image.id"
            :class="{ active: config.image === image.id }"
            @click="config.image = image.id"
          >
            {{ image.name }}
          </button>
        </div>
      </div>
    </div>
    
    <div class="result-panel">
      <div class="result-title">
        {{ t('computeInstance.resultTitle') }}
      </div>
      <div class="result-grid">
        <div class="result-item">
          <span class="label">{{ t('computeInstance.config') }}</span>
          <span class="value">{{ selectedSpec?.name }} / {{ selectedImage?.name }}</span>
        </div>
        <div class="result-item">
          <span class="label">{{ t('computeInstance.estimatedPrice') }}</span>
          <span class="value price">¥{{ price }}/{{ t('computeInstance.monthly') }}</span>
        </div>
        <div class="result-item">
          <span class="label">{{ t('computeInstance.scenario') }}</span>
          <span class="value">{{ selectedSpec?.scene }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { cloudServicesLocale } from '../../../locales/cloud-services/index.js'

const { t, messages } = useI18n(cloudServicesLocale)

const config = ref({
  region: 'hangzhou',
  spec: 'medium',
  image: 'ubuntu'
})

const regions = computed(() => messages.value.computeInstance.regions)
const specs = computed(() => messages.value.computeInstance.specs)
const images = computed(() => messages.value.computeInstance.images)

const selectedSpec = computed(() => specs.value.find((spec) => spec.id === config.value.spec))
const selectedImage = computed(() => images.value.find((image) => image.id === config.value.image))
const price = computed(() => selectedSpec.value?.price || 0)
</script>

<style scoped>
.compute-instance-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.config-panel {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.config-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.config-row label {
  width: 50px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex: 1;
}

.options button {
  padding: 0.35rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.options button:hover {
  border-color: var(--vp-c-brand);
}

.options button.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
}

.result-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.result-item {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.result-item .label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.result-item .value {
  font-size: 0.9rem;
  font-weight: 500;
}

.result-item .price {
  color: var(--vp-c-brand);
}

@media (max-width: 640px) {
  .result-grid {
    grid-template-columns: 1fr;
  }
  
  .config-row {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .config-row label {
    width: auto;
  }
}
</style>
