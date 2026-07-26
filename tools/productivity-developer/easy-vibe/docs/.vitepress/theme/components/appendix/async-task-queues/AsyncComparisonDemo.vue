<template>
  <div class="comparison-demo">
    <div class="header">
      <div class="title">{{ t('comparison.title') }}</div>
      <div class="subtitle">{{ t('comparison.subtitle') }}</div>
    </div>

    <div class="framework-grid">
      <div
        v-for="fw in frameworks"
        :key="fw.name"
        :class="['fw-card', { active: selected === fw.name }]"
        @click="selected = fw.name"
      >
        <div class="fw-name">{{ fw.name }}</div>
        <div class="fw-lang">{{ fw.lang }}</div>
        <div class="fw-stars">
          <span v-for="n in 5" :key="n" :class="n <= fw.rating ? 'star-filled' : 'star-empty'">★</span>
        </div>
      </div>
    </div>

    <div v-if="currentFw" class="detail-panel">
      <div class="detail-header">
        <span class="detail-name">{{ currentFw.name }}</span>
        <span class="detail-lang-tag">{{ currentFw.lang }}</span>
      </div>
      <div class="detail-desc">{{ currentFw.desc }}</div>
      <div class="detail-features">
        <div class="feature-title">{{ t('comparison.featureTitle') }}</div>
        <div class="feature-list">
          <span v-for="f in currentFw.features" :key="f" class="feature-tag">{{ f }}</span>
        </div>
      </div>
      <div class="detail-usecase">
        <div class="usecase-title">{{ t('comparison.usecaseTitle') }}</div>
        <div class="usecase-text">{{ currentFw.usecase }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { asyncTaskQueuesLocale } from '../../../locales/async-task-queues/index.js'

const { t, messages } = useI18n(asyncTaskQueuesLocale)

const selected = ref('Celery')

const frameworks = computed(() => messages.value.comparison.frameworks)
const currentFw = computed(() => frameworks.value.find(f => f.name === selected.value))
</script>

<style scoped>
.comparison-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.framework-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.5rem; margin-bottom: 1rem;
}
.fw-card {
  padding: 0.75rem; border-radius: 8px; background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider); cursor: pointer; text-align: center;
  transition: all 0.2s;
}
.fw-card:hover { border-color: var(--vp-c-brand); }
.fw-card.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); }
.fw-name { font-weight: 700; font-size: 0.95rem; }
.fw-lang { font-size: 0.8rem; color: var(--vp-c-text-2); margin: 0.25rem 0; }
.fw-stars { font-size: 0.85rem; }
.star-filled { color: #f59e0b; }
.star-empty { color: var(--vp-c-divider); }
.detail-panel {
  padding: 1rem; border-radius: 10px; background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.detail-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
.detail-name { font-weight: 700; font-size: 1rem; }
.detail-lang-tag {
  padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.75rem;
  background: rgba(var(--vp-c-brand-rgb), 0.1); color: var(--vp-c-brand);
}
.detail-desc { font-size: 0.9rem; color: var(--vp-c-text-2); margin-bottom: 0.75rem; line-height: 1.6; }
.feature-title, .usecase-title { font-weight: 600; font-size: 0.85rem; margin-bottom: 0.4rem; }
.feature-list { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.75rem; }
.feature-tag {
  padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.75rem;
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider);
}
.usecase-text { font-size: 0.85rem; color: var(--vp-c-text-2); }
</style>
