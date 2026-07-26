<template>
  <div class="iam-ram-comparison-demo">
    <div class="demo-header">
      <span class="icon">🔐</span>
      <span class="title">{{ t('comparison.title') }}</span>
      <span class="subtitle">{{ t('comparison.subtitle') }}</span>
    </div>

    <div class="main-area">
      <div class="platform-col aws">
        <div class="platform-header">
          AWS IAM
        </div>
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="feature-item"
          :class="{ active: selectedFeature === index }"
          @click="selectedFeature = index"
        >
          <span class="icon">{{ feature.icon }}</span>
          <span class="name">{{ feature.name }}</span>
        </div>
      </div>

      <div class="comparison-col">
        <div
          v-if="selectedFeatureData"
          class="comparison-card"
        >
          <div class="comp-title">
            {{ selectedFeatureData.name }}
          </div>
          <div class="comp-row">
            <div class="comp-item aws">
              <div class="comp-label">
                AWS IAM
              </div>
              <div class="comp-desc">
                {{ selectedFeatureData.awsDetail }}
              </div>
            </div>
            <div class="comp-vs">
              VS
            </div>
            <div class="comp-item ram">
              <div class="comp-label">
                {{ t('comparison.ramLabel') }}
              </div>
              <div class="comp-desc">
                {{ selectedFeatureData.ramDetail }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="platform-col ram">
        <div class="platform-header">
          {{ t('comparison.ramLabel') }}
        </div>
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="feature-item"
          :class="{ active: selectedFeature === index }"
          @click="selectedFeature = index"
        >
          <span class="icon">{{ feature.icon }}</span>
          <span class="name">{{ feature.name }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.coreIdea') }}</strong>{{ t('comparison.info') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { cloudIamLocale } from '../../../locales/cloud-iam/index.js'

const { t, messages } = useI18n(cloudIamLocale)
const selectedFeature = ref(0)
const features = computed(() => messages.value.comparison.features)
const featureDetails = computed(() => messages.value.comparison.featureDetails)

const selectedFeatureData = computed(() => featureDetails.value[selectedFeature.value])
</script>

<style scoped>
.iam-ram-comparison-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
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
  grid-template-columns: 1fr 1.5fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 768px) {
  .main-area { grid-template-columns: 1fr; }
}

.platform-col {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.platform-header {
  padding: 0.5rem;
  text-align: center;
  font-weight: 600;
  font-size: 0.85rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.platform-col.aws .platform-header { background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); }
.platform-col.ram .platform-header { background: rgba(239, 68, 68, 0.1); color: #dc2626; }

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid var(--vp-c-divider);
}

.feature-item:last-child { border-bottom: none; }
.feature-item:hover { background: var(--vp-c-bg-alt); }
.feature-item.active { background: var(--vp-c-brand-soft); }

.feature-item .icon { font-size: 1rem; }
.feature-item .name { font-size: 0.8rem; color: var(--vp-c-text-1); }

.comparison-col { min-width: 0; }

.comparison-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  height: 100%;
}

.comp-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-brand-1);
  text-align: center;
  margin-bottom: 0.5rem;
}

.comp-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.comp-item {
  padding: 0.5rem;
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
}

.comp-label {
  font-weight: 600;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
}

.comp-item.aws .comp-label { color: var(--vp-c-brand-1); }
.comp-item.ram .comp-label { color: #dc2626; }

.comp-desc { font-size: 0.75rem; color: var(--vp-c-text-2); line-height: 1.4; }

.comp-vs {
  text-align: center;
  font-weight: 700;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
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
