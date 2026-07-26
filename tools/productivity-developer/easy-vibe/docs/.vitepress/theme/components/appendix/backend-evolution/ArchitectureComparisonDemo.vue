<template>
  <div class="architecture-comparison-demo">
    <div class="demo-header">
      <span class="icon">🏗️</span>
      <span class="title">{{ t('architectureComparison.title') }}</span>
      <span class="subtitle">{{ t('architectureComparison.subtitle') }}</span>
    </div>

    <div class="comparison-grid">
      <div
        v-for="era in eras"
        :key="era.name"
        class="era-card"
        :class="{ active: selectedEra === era.name }"
        @click="selectedEra = era.name"
      >
        <div class="era-icon">
          {{ era.icon }}
        </div>
        <div class="era-name">
          {{ era.name }}
        </div>
        <div class="era-year">
          {{ era.year }}
        </div>
        <div class="era-tag">
          {{ era.tag }}
        </div>
      </div>
    </div>

    <div
      v-if="selectedEra"
      class="detail-panel"
    >
      <div class="detail-header">
        <span class="detail-icon">{{ currentEra.icon }}</span>
        <h5>{{ currentEra.name }} ({{ currentEra.year }})</h5>
      </div>

      <div class="detail-content">
        <div class="feature-section">
          <h6>{{ t('architectureComparison.features') }}</h6>
          <ul>
            <li
              v-for="(feat, i) in currentEra.features"
              :key="i"
            >
              {{ feat }}
            </li>
          </ul>
        </div>

        <div class="feature-section">
          <h6>{{ t('architectureComparison.pros') }}</h6>
          <ul>
            <li
              v-for="(pro, i) in currentEra.pros"
              :key="i"
            >
              {{ pro }}
            </li>
          </ul>
        </div>

        <div class="feature-section">
          <h6>{{ t('architectureComparison.cons') }}</h6>
          <ul>
            <li
              v-for="(con, i) in currentEra.cons"
              :key="i"
            >
              {{ con }}
            </li>
          </ul>
        </div>

        <div class="tech-stack">
          <h6>{{ t('architectureComparison.techs') }}</h6>
          <div class="tech-tags">
            <span
              v-for="(tech, i) in currentEra.techs"
              :key="i"
              class="tech-tag"
            >{{ tech }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.ideaTitle') }}</strong>{{ t('architectureComparison.idea') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { backendEvolutionLocale } from '../../../locales/backend-evolution/index.js'

const { t, messages } = useI18n(backendEvolutionLocale)
const selectedEra = ref(messages.value.architectureComparison.defaultEra)

const eras = computed(() => messages.value.architectureComparison.eras)
const eraDetails = computed(() => messages.value.architectureComparison.details)

watch(messages, (nextMessages) => {
  selectedEra.value = nextMessages.architectureComparison.defaultEra
})

const currentEra = computed(() => {
  const name = selectedEra.value
  return {
    icon: eras.value.find((era) => era.name === name)?.icon || '🏗️',
    name,
    year: eras.value.find((era) => era.name === name)?.year || '',
    ...eraDetails.value[name]
  }
})
</script>

<style scoped>
.architecture-comparison-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-header .icon {
  font-size: 1rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  margin-left: 0.4rem;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}

.era-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.era-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-1px);
}

.era-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.era-icon {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.era-name {
  font-weight: 600;
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.1rem;
}

.era-year {
  font-size: 0.6rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.25rem;
}

.era-tag {
  display: inline-block;
  padding: 0.1rem 0.3rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 0.55rem;
  color: var(--vp-c-text-2);
}

.detail-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.5rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-icon {
  font-size: 1rem;
}

.detail-header h5 {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.detail-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem;
}

.feature-section {
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  padding: 0.4rem;
}

.feature-section h6 {
  margin: 0 0 0.3rem 0;
  font-size: 0.7rem;
  color: var(--vp-c-brand);
}

.feature-section ul {
  margin: 0;
  padding-left: 0.75rem;
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
}

.feature-section li {
  margin-bottom: 0.15rem;
  line-height: 1.3;
}

.feature-section li:last-child {
  margin-bottom: 0;
}

.tech-stack {
  grid-column: 1 / -1;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  padding: 0.4rem;
}

.tech-stack h6 {
  margin: 0 0 0.3rem 0;
  font-size: 0.7rem;
  color: var(--vp-c-brand);
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.tech-tag {
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 3px;
  font-size: 0.6rem;
  color: var(--vp-c-text-2);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
  display: flex;
  gap: 0.2rem;
}

.info-box .icon {
  flex-shrink: 0;
}

.info-box strong {
  color: var(--vp-c-text-1);
}

@media (max-width: 768px) {
  .comparison-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .detail-content {
    grid-template-columns: 1fr;
  }
}
</style>
