<template>
  <div class="language-ecosystem-demo">
    <div class="demo-header">
      <span class="icon">🌐</span>
      <span class="title">{{ t('ecosystem.title') }}</span>
      <span class="subtitle">{{ t('ecosystem.subtitle') }}</span>
    </div>

    <div class="intro-text">
      {{ t('ecosystem.introPrefix') }}<span class="highlight">{{ t('ecosystem.introHighlight') }}</span>{{ t('ecosystem.introSuffix') }}
    </div>

    <div class="ecosystem-grid">
      <div
        v-for="eco in ecosystems"
        :key="eco.name"
        class="eco-card"
      >
        <div class="eco-icon">
          {{ eco.icon }}
        </div>
        <div class="eco-name">
          {{ eco.name }}
        </div>
        <div class="eco-lang">
          {{ eco.language }}
        </div>
        <div class="eco-stats">
          <div class="stat">
            <span class="stat-label">{{ t('ecosystem.packageCount') }}</span>
            <span class="stat-value">{{ eco.packages }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">{{ t('ecosystem.feature') }}</span>
            <span class="stat-value">{{ eco.feature }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('ecosystem.infoStrong') }}</strong>{{ t('ecosystem.info') }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { backendLanguagesLocale } from '../../../locales/backend-languages/index.js'

const { t, messages } = useI18n(backendLanguagesLocale)
const ecosystems = computed(() => messages.value.ecosystem.ecosystems)
</script>

<style scoped>
.language-ecosystem-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  
  
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.ecosystem-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.eco-card {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.eco-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.eco-name {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.15rem;
}

.eco-lang {
  font-size: 0.7rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
}

.eco-stats {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
}

.stat-label {
  color: var(--vp-c-text-2);
}

.stat-value {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.25rem;
}
</style>
