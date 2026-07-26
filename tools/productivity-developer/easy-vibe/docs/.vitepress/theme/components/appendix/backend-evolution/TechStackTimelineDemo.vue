<template>
  <div class="tech-stack-timeline-demo">
    <div class="demo-header">
      <span class="icon">📚</span>
      <span class="title">{{ t('techStackTimeline.title') }}</span>
      <span class="subtitle">{{ t('techStackTimeline.subtitle') }}</span>
    </div>

    <div class="timeline">
      <div
        v-for="(era, idx) in eras"
        :key="idx"
        class="era-section"
        :class="{ active: activeEra === idx }"
        @click="activeEra = idx"
      >
        <div class="era-marker">
          <div class="era-dot" />
          <div class="era-line" />
        </div>

        <div class="era-content">
          <div class="era-header">
            <span class="era-icon">{{ era.icon }}</span>
            <span class="era-name">{{ era.name }}</span>
            <span class="era-period">{{ era.period }}</span>
          </div>

          <div class="tech-categories">
            <div
              v-for="(cat, cIdx) in era.categories"
              :key="cIdx"
              class="category"
            >
              <div class="category-name">
                {{ cat.name }}
              </div>
              <div class="tech-tags">
                <span
                  v-for="(tech, tIdx) in cat.techs"
                  :key="tIdx"
                  class="tech-tag"
                  :class="{ highlight: tIdx === 0 }"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { backendEvolutionLocale } from '../../../locales/backend-evolution/index.js'

const { t, messages } = useI18n(backendEvolutionLocale)

const activeEra = ref(0)
const eras = computed(() => messages.value.techStackTimeline.eras)
</script>

<style scoped>
.tech-stack-timeline-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  margin-bottom: 0.5rem;
}

.demo-header h4 {
  margin: 0 0 0.15rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.demo-header p {
  margin: 0;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.timeline {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.4rem;
}

.era-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
  background: var(--vp-c-bg);
  border-radius: 4px;
  padding: 0.4rem;
}

.era-section:hover,
.era-section.active {
  background: var(--vp-c-brand-soft);
}

.era-marker {
  display: none;
}

.era-dot {
  display: none;
}

.era-section.active .era-dot {
  display: none;
}

.era-line {
  display: none;
}

.era-content {
  flex: 1;
}

.era-header {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.3rem;
  flex-wrap: wrap;
}

.era-icon {
  font-size: 1rem;
}

.era-name {
  font-weight: 600;
  font-size: 0.7rem;
  color: var(--vp-c-text-1);
}

.era-period {
  font-size: 0.6rem;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  padding: 0.05rem 0.25rem;
  border-radius: 3px;
}

.tech-categories {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.category {
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  padding: 0.25rem;
}

.category-name {
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.1rem;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.15rem;
}

.tech-tag {
  font-size: 0.55rem;
  padding: 0.05rem 0.2rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 2px;
  color: var(--vp-c-text-2);
}

.tech-tag.highlight {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: rgba(102, 126, 234, 0.05);
}

@media (max-width: 768px) {
  .timeline {
    grid-template-columns: repeat(2, 1fr);
  }
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
</style>
