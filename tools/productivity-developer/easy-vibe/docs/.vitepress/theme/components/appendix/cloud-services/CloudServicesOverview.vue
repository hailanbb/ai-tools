<template>
  <div class="cloud-services-overview">
    <div class="services-grid">
      <div 
        v-for="service in services" 
        :key="service.id"
        class="service-card"
        :class="{ active: selectedService === service.id }"
        @click="selectService(service.id)"
      >
        <div class="service-icon">
          {{ service.icon }}
        </div>
        <div class="service-name">
          {{ service.name }}
        </div>
        <div class="service-examples">
          {{ service.examples }}
        </div>
      </div>
    </div>
    
    <div
      v-if="selectedServiceData"
      class="service-detail"
    >
      <div class="detail-title">
        {{ selectedServiceData.name }}
      </div>
      <div class="detail-desc">
        {{ selectedServiceData.description }}
      </div>
      <div class="detail-compare">
        <div class="compare-item">
          <span class="label">AWS:</span>
          <span class="value">{{ selectedServiceData.aws }}</span>
        </div>
        <div class="compare-item">
          <span class="label">{{ t('overview.aliyun') }}</span>
          <span class="value">{{ selectedServiceData.aliyun }}</span>
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

const selectedService = ref(null)
const services = computed(() => messages.value.overview.services)

const selectedServiceData = computed(() => 
  services.value.find((service) => service.id === selectedService.value)
)

function selectService(id) {
  selectedService.value = selectedService.value === id ? null : id
}
</script>

<style scoped>
.cloud-services-overview {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.service-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.service-card:hover {
  border-color: var(--vp-c-brand);
}

.service-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.service-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.service-name {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.service-examples {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.service-detail {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.detail-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.detail-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}

.detail-compare {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.compare-item {
  background: var(--vp-c-bg);
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-size: 0.85rem;
}

.compare-item .label {
  color: var(--vp-c-text-2);
  margin-right: 0.5rem;
}

.compare-item .value {
  font-weight: 500;
}

@media (max-width: 640px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .detail-compare {
    grid-template-columns: 1fr;
  }
}
</style>
