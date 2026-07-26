<template>
  <div class="triad-demo">
    <div class="demo-header">
      <span class="title">{{ t('computerOrganization.vibeCodingFullstack.frontendTriad.title') }}</span>
      <span class="subtitle">{{ t('computerOrganization.vibeCodingFullstack.frontendTriad.subtitle') }}</span>
    </div>

    <div class="triad-grid">
      <div
        v-for="tech in triad"
        :key="tech.name"
        class="tech-card"
      >
        <div class="tech-name">{{ tech.name }}</div>
        <div class="tech-role">{{ tech.role }}</div>
        <div class="tech-analogy">{{ tech.analogy }}</div>
        <div class="tech-examples">
          <span v-for="ex in tech.examples" :key="ex" class="example-tag">{{ ex }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ t('computerOrganization.vibeCodingFullstack.frontendTriad.relationshipLabel') }}</strong>{{ t('computerOrganization.vibeCodingFullstack.frontendTriad.relationship') }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals/index.js'

const { t, messages } = useI18n(computerFundamentalsLocale)
const triad = computed(() => messages.value.computerOrganization.vibeCodingFullstack.frontendTriad.triad)
</script>

<style scoped>
.triad-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.subtitle {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

.triad-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.tech-card {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.tech-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.tech-role {
  font-size: 0.75rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.25rem;
}

.tech-analogy {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.5rem;
}

.tech-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.example-tag {
  font-size: 0.68rem;
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  color: var(--vp-c-text-2);
}

.info-box {
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  border-left: 3px solid var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .triad-grid {
    grid-template-columns: 1fr;
  }
}
</style>
