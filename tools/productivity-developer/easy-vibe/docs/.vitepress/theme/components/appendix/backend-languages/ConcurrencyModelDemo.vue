<template>
  <div class="concurrency-model-demo">
    <div class="demo-header">
      <span class="icon">🔄</span>
      <span class="title">{{ t('concurrency.title') }}</span>
      <span class="subtitle">{{ t('concurrency.subtitle') }}</span>
    </div>

    <div class="intro-text">
      {{ t('concurrency.introPrefix') }}<span class="highlight">{{ t('concurrency.introHighlight') }}</span>{{ t('concurrency.introSuffix') }}
    </div>

    <div class="models-grid">
      <div
        v-for="model in models"
        :key="model.name"
        class="model-card"
        :class="{ active: selectedModel === model.name }"
        @click="selectedModel = model.name"
      >
        <div class="model-icon">
          {{ model.icon }}
        </div>
        <div class="model-name">
          {{ model.name }}
        </div>
        <div class="model-lang">
          {{ model.language }}
        </div>
        <div class="model-desc">
          {{ model.description }}
        </div>
      </div>
    </div>

    <Transition
      name="fade"
      mode="out-in"
    >
      <div
        v-if="selectedModel"
        :key="selectedModel"
        class="model-detail"
      >
        <div class="detail-header">
          <h6>{{ getModelInfo().title }}</h6>
        </div>

        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">{{ t('concurrency.concurrencyLabel') }}</span>
            <div class="stat-bar">
              <div
                class="stat-fill"
                :style="{ width: getModelInfo().concurrency + '%' }"
              />
            </div>
          </div>
          <div class="stat-item">
            <span class="stat-label">{{ t('concurrency.memoryLabel') }}</span>
            <div class="stat-bar">
              <div
                class="stat-fill memory"
                :style="{ width: getModelInfo().memory + '%' }"
              />
            </div>
          </div>
        </div>

        <div class="code-example">
          <code>{{ getModelInfo().code }}</code>
        </div>

        <div class="pros-cons">
          <div class="pros">
            <strong>{{ t('concurrency.prosTitle') }}</strong>
            <ul>
              <li
                v-for="pro in getModelInfo().pros"
                :key="pro"
              >
                {{ pro }}
              </li>
            </ul>
          </div>
          <div class="cons">
            <strong>{{ t('concurrency.consTitle') }}</strong>
            <ul>
              <li
                v-for="con in getModelInfo().cons"
                :key="con"
              >
                {{ con }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('concurrency.infoStrong') }}</strong>{{ t('concurrency.info') }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { backendLanguagesLocale } from '../../../locales/backend-languages/index.js'

const { t, messages } = useI18n(backendLanguagesLocale)

const selectedModel = ref('Goroutine')
const models = computed(() => messages.value.concurrency.models)
const modelInfo = computed(() => messages.value.concurrency.modelInfo)

const getModelInfo = () => {
  return modelInfo.value[selectedModel.value] || modelInfo.value.Goroutine
}
</script>

<style scoped>
.concurrency-model-demo {
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

.models-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.model-card {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.model-card:hover {
  border-color: var(--vp-c-brand);
}

.model-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.model-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.model-name {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.model-lang {
  font-size: 0.7rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.25rem;
}

.model-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.model-detail {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
}

.detail-header h6 {
  margin: 0 0 0.75rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.stat-bar {
  height: 6px;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  background: var(--vp-c-brand);
  transition: width 0.5s ease;
}

.stat-fill.memory {
  background: var(--vp-c-green-1);
}

.code-example {
  background: #1e1e1e;
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.75rem;
}

.code-example code {
  color: #4ec9b0;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.75rem;
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.pros strong {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.8rem;
  color: var(--vp-c-green-1);
}

.cons strong {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.8rem;
  color: var(--vp-c-red-1);
}

.pros ul,
.cons ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pros li,
.cons li {
  padding: 0.15rem 0;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
}

.info-box .icon {
  margin-right: 0.25rem;
}
</style>
