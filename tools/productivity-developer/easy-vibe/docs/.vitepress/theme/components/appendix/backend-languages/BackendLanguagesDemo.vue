<template>
  <div class="backend-languages-demo">
    <div class="demo-header">
      <span class="icon">🛠️</span>
      <span class="title">{{ t('demo.title') }}</span>
      <span class="subtitle">{{ t('demo.subtitle') }}</span>
    </div>

    <div class="intro-text">
      {{ t('demo.introPrefix') }}<span class="highlight">{{ t('demo.introHighlight') }}</span>{{ t('demo.introSuffix') }}
    </div>

    <div class="language-grid">
      <div
        v-for="lang in languages"
        :key="lang.name"
        class="language-card"
        :class="{ active: selectedLang === lang.name }"
        @click="selectedLang = lang.name"
      >
        <div class="lang-icon">
          {{ lang.icon }}
        </div>
        <div class="lang-name">
          {{ lang.name }}
        </div>
        <div class="lang-metaphor">
          {{ lang.metaphor }}
        </div>
        <div class="lang-description">
          {{ lang.description }}
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="selectedLang"
        class="lang-detail"
      >
        <div class="detail-header">
          <span class="detail-icon">{{ getCurrentLang().icon }}</span>
          <span class="detail-title">{{ getCurrentLang().name }}</span>
        </div>

        <div class="detail-sections">
          <div class="detail-section">
            <h6>{{ t('demo.scenariosTitle') }}</h6>
            <ul>
              <li
                v-for="scenario in getCurrentLang().scenarios"
                :key="scenario"
              >
                {{ scenario }}
              </li>
            </ul>
          </div>

          <div class="detail-section">
            <h6>{{ t('demo.prosTitle') }}</h6>
            <ul>
              <li
                v-for="pro in getCurrentLang().pros"
                :key="pro"
              >
                {{ pro }}
              </li>
            </ul>
          </div>

          <div class="detail-section">
            <h6>{{ t('demo.consTitle') }}</h6>
            <ul>
              <li
                v-for="con in getCurrentLang().cons"
                :key="con"
              >
                {{ con }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>

    <div
      v-if="!selectedLang"
      class="hint-text"
    >
      {{ t('demo.hint') }}
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('demo.infoStrong') }}</strong>{{ t('demo.info') }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { backendLanguagesLocale } from '../../../locales/backend-languages/index.js'

const selectedLang = ref('Go')
const { t, messages } = useI18n(backendLanguagesLocale)
const languages = computed(() => messages.value.demo.languages)

const getCurrentLang = () => {
  return languages.value.find(l => l.name === selectedLang.value) || languages.value[0]
}
</script>

<style scoped>
.backend-languages-demo {
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

.language-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  margin-bottom: 1rem;
}

.language-card {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.language-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.language-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg);
}

.lang-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.lang-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.lang-metaphor {
  font-size: 0.8rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.lang-description {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.hint-text {
  text-align: center;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin: 0.75rem 0;
}

.lang-detail {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  margin-top: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.detail-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.detail-section h6 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.detail-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.detail-section li {
  padding: 0.25rem 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
  position: relative;
  padding-left: 1rem;
}

.detail-section li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--vp-c-brand);
  font-weight: bold;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
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
