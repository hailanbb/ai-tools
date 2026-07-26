<template>
  <div class="performance-overview">
    <div class="header">
      <div class="title">
        {{ t('overview.title') }}
      </div>
      <div class="subtitle">
        {{ t('overview.subtitle') }}
      </div>
    </div>

    <div class="dimension-tabs">
      <button
        v-for="dim in dimensions"
        :key="dim.id"
        class="tab-btn"
        :class="{ active: currentDim.id === dim.id }"
        @click="currentDimId = dim.id"
      >
        <span class="icon">{{ dim.icon }}</span>
        <span class="text">{{ dim.name }}</span>
      </button>
    </div>

    <div
      class="content-area"
      :class="currentDim.id"
    >
      <div class="panel bottlenecks">
        <h3>
          <span class="icon">⚠️</span>
          {{ t('overview.bottlenecksTitle') }}
        </h3>
        <ul class="list">
          <li
            v-for="(item, index) in currentDim.bottlenecks"
            :key="index"
          >
            <div class="item-title">
              {{ item.title }}
            </div>
            <div class="item-desc">
              {{ item.desc }}
            </div>
          </li>
        </ul>
      </div>

      <div class="arrow">
        <div class="arrow-line" />
        <div class="arrow-text">
          {{ t('overview.arrowText') }}
        </div>
      </div>

      <div class="panel solutions">
        <h3>
          <span class="icon">🚀</span>
          {{ t('overview.solutionsTitle') }}
        </h3>
        <ul class="list">
          <li
            v-for="(item, index) in currentDim.solutions"
            :key="index"
          >
            <div class="item-title">
              {{ item.title }}
            </div>
            <div class="item-desc">
              {{ item.desc }}
            </div>
            <div class="tags">
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="tag"
              >{{ tag }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="summary-bar">
      <p>
        <strong>{{ t('overview.goalPrefix') }}</strong>
        {{ currentDim.goal }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { frontendPerformanceLocale } from '../../../locales/frontend-performance/index.js'

const { t, messages } = useI18n(frontendPerformanceLocale)
const currentDimId = ref('network')

const dimensions = computed(() => messages.value.overview.dimensions)
const currentDim = computed(
  () => dimensions.value.find((dim) => dim.id === currentDimId.value) || dimensions.value[0]
)
</script>

<style scoped>
.performance-overview {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 0.5rem 0;
  font-family: var(--vp-font-family-sans);
}

.header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.subtitle {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
}

.dimension-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.2s;
  color: var(--vp-c-text-2);
}

.tab-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.tab-btn.active {
  background-color: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.2);
}

.content-area {
  display: flex;
  gap: 2rem;
  align-items: stretch;
  background-color: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

@media (max-width: 768px) {
  .content-area {
    flex-direction: column;
  }
}

.panel {
  flex: 1;
}

.panel h3 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--vp-c-text-1);
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.list li {
  padding: 0.8rem;
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid transparent;
  transition: all 0.2s;
}

.bottlenecks .list li {
  border-left: 3px solid var(--vp-c-danger);
}

.solutions .list li {
  border-left: 3px solid var(--vp-c-brand);
}

.item-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
}

.item-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.tags {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.tag {
  font-size: 0.75rem;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  background-color: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
}

.arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
  width: 80px;
}

@media (max-width: 768px) {
  .arrow {
    width: 100%;
    height: 40px;
    flex-direction: row;
    gap: 0.5rem;
  }
}

.arrow-line {
  flex: 1;
  width: 2px;
  background-color: var(--vp-c-divider);
}

@media (max-width: 768px) {
  .arrow-line {
    width: 100%;
    height: 2px;
    flex: 1;
  }
}

.summary-bar {
  margin-top: 1.5rem;
  padding: 0.75rem;
  background-color: var(--vp-c-brand-dimm);
  border-radius: 6px;
  text-align: center;
  color: var(--vp-c-brand-dark);
  font-size: 0.95rem;
}
</style>
