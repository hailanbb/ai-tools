<template>
  <div class="mpa-routing-demo">
    <div class="demo-header">
      <span class="icon">🔄</span>
      <span class="title">{{ t('mpa.title') }}</span>
      <span class="subtitle">{{ t('mpa.subtitle') }}</span>
    </div>

    <div class="intro-text">
      {{ t('mpa.intro.prefix') }}<span class="highlight">{{ t('mpa.intro.highlight1') }}</span>{{ t('mpa.intro.middle') }}<span class="highlight">{{ t('mpa.intro.highlight2') }}</span>{{ t('mpa.intro.suffix') }}
    </div>

    <div class="comparison-container">
      <div class="mode-box mpa">
        <div class="mode-header">
          <span class="mode-icon">🏢</span>
          <span class="mode-title">{{ t('mpa.mpaTitle') }}</span>
        </div>
        <div class="flow-steps">
          <div
            v-for="step in mpaSteps"
            :key="step"
            class="step"
          >
            {{ step }}
          </div>
        </div>
        <div class="mode-features">
          <div
            v-for="feature in mpaFeatures"
            :key="feature.text"
            class="feature"
            :class="{ bad: feature.bad }"
          >
            <span class="feature-icon">{{ feature.icon }}</span>
            <span>{{ feature.text }}</span>
          </div>
        </div>
      </div>

      <div class="mode-box spa">
        <div class="mode-header">
          <span class="mode-icon">⚡</span>
          <span class="mode-title">{{ t('mpa.spaTitle') }}</span>
        </div>
        <div class="flow-steps">
          <div
            v-for="step in spaSteps"
            :key="step"
            class="step"
          >
            {{ step }}
          </div>
        </div>
        <div class="mode-features">
          <div
            v-for="feature in spaFeatures"
            :key="feature.text"
            class="feature"
            :class="{ bad: feature.bad }"
          >
            <span class="feature-icon">{{ feature.icon }}</span>
            <span>{{ feature.text }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.coreDifference') }}</strong>{{ t('mpa.info') }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { frontendRoutingLocale } from '../../../locales/frontend-routing/index.js'

const { t, messages } = useI18n(frontendRoutingLocale)
const mpaSteps = computed(() => messages.value.mpa.mpaSteps)
const spaSteps = computed(() => messages.value.mpa.spaSteps)
const mpaFeatures = computed(() => messages.value.mpa.mpaFeatures)
const spaFeatures = computed(() => messages.value.mpa.spaFeatures)
</script>

<style scoped>
.mpa-routing-demo {
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

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

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

.comparison-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.mode-box {
  background: var(--vp-c-bg);
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.mode-header {
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.mode-box.mpa .mode-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.mode-box.spa .mode-header {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.mode-icon {
  font-size: 1.25rem;
}

.mode-title {
  font-size: 0.9rem;
  font-weight: 600;
}

.flow-steps {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.step {
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  border-left: 3px solid var(--vp-c-brand);
}

.mode-features {
  padding: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.feature-icon {
  font-size: 0.9rem;
}

.feature .feature-icon {
  color: #27c93f;
}

.feature.bad .feature-icon {
  color: #ff5f56;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 1rem;
}

.info-box .icon { margin-right: 0.25rem; }

@media (max-width: 768px) {
  .comparison-container {
    grid-template-columns: 1fr;
  }
}
</style>
