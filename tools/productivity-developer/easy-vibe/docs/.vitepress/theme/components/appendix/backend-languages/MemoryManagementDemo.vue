<template>
  <div class="memory-management-demo">
    <div class="demo-header">
      <span class="icon">🧠</span>
      <span class="title">{{ t('memory.title') }}</span>
      <span class="subtitle">{{ t('memory.subtitle') }}</span>
    </div>

    <div class="intro-text">
      {{ t('memory.introPrefix') }}<span class="highlight">{{ t('memory.introHighlight') }}</span>{{ t('memory.introSuffix') }}
    </div>

    <div class="models-container">
      <div
        v-for="model in models"
        :key="model.name"
        class="model-card"
      >
        <div class="model-icon">
          {{ model.icon }}
        </div>
        <div class="model-name">
          {{ model.name }}
        </div>
        <div class="model-desc">
          {{ model.description }}
        </div>
        <div class="model-languages">
          <span
            v-for="lang in model.languages"
            :key="lang"
            class="lang-tag"
          >
            {{ lang }}
          </span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('memory.infoStrong') }}</strong>{{ t('memory.info') }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { backendLanguagesLocale } from '../../../locales/backend-languages/index.js'

const { t, messages } = useI18n(backendLanguagesLocale)
const models = computed(() => messages.value.memory.models)
</script>

<style scoped>
.memory-management-demo {
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

.models-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.model-card {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.model-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.model-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.model-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.model-languages {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  justify-content: center;
}

.lang-tag {
  padding: 0.2rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.7rem;
  color: var(--vp-c-brand-1);
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
