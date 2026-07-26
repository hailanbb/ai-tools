<template>
  <div class="language-selection-demo">
    <div class="demo-header">
      <span class="title">{{ t('computerOrganization.vibeCodingFullstack.languageSelection.title') }}</span>
      <span class="subtitle">{{ t('computerOrganization.vibeCodingFullstack.languageSelection.subtitle') }}</span>
    </div>

    <div class="selection-grid">
      <div v-for="item in selections" :key="item.goal" class="selection-card">
        <div class="goal-name">{{ item.goal }}</div>
        <div class="goal-desc">{{ item.desc }}</div>
        <div class="goal-langs">
          <span class="lang-label">{{ t('computerOrganization.vibeCodingFullstack.languageSelection.recommend') }}</span>
          <span v-for="lang in item.langs" :key="lang" class="lang-tag">{{ lang }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ t('computerOrganization.vibeCodingFullstack.languageSelection.principleLabel') }}</strong>{{ t('computerOrganization.vibeCodingFullstack.languageSelection.principle') }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals/index.js'

const { t, messages } = useI18n(computerFundamentalsLocale)
const selections = computed(() => messages.value.computerOrganization.vibeCodingFullstack.languageSelection.selections)
</script>

<style scoped>
.language-selection-demo {
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

.selection-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.selection-card {
  padding: 0.6rem 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.goal-name {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.15rem;
}

.goal-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.35rem;
}

.goal-langs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.lang-label {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
}

.lang-tag {
  font-size: 0.68rem;
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  color: var(--vp-c-brand-1);
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
  .selection-grid {
    grid-template-columns: 1fr;
  }
}
</style>
