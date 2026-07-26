<template>
  <div class="hash-vs-history-demo">
    <div class="demo-header">
      <span class="icon">⚖️</span>
      <span class="title">{{ t('hashVsHistory.title') }}</span>
      <span class="subtitle">{{ t('hashVsHistory.subtitle') }}</span>
    </div>

    <div class="intro-text">
      {{ t('hashVsHistory.intro.prefix') }}<span class="highlight">{{ t('hashVsHistory.intro.highlight1') }}</span>{{ t('hashVsHistory.intro.middle1') }}<span class="highlight">{{ t('hashVsHistory.intro.highlight2') }}</span>{{ t('hashVsHistory.intro.middle2') }}<span class="highlight">{{ t('hashVsHistory.intro.highlight3') }}</span>{{ t('hashVsHistory.intro.suffix') }}
    </div>

    <div class="comparison-container">
      <!-- Hash Mode -->
      <div class="mode-column">
        <div class="mode-header hash">
          <span class="mode-icon">#</span>
          <span class="mode-title">{{ t('hashVsHistory.hashMode') }}</span>
        </div>

        <div class="browser-mockup">
          <div class="browser-toolbar">
            <div class="window-controls">
              <span class="dot red" />
              <span class="dot yellow" />
              <span class="dot green" />
            </div>
            <div class="address-bar">
              <span class="protocol">https://</span>
              <span class="host">example.com</span>
              <span class="hash-path">/#/{{ hashPath }}</span>
            </div>
          </div>

          <div class="browser-viewport">
            <nav class="nav-bar">
              <a
                v-for="item in navItems"
                :key="item.path"
                :class="['nav-item', { active: hashPath === item.path }]"
                @click="hashPath = item.path"
              >
                {{ item.name }}
              </a>
            </nav>
            <div class="page-content">
              <h3>{{ getPageTitle(hashPath) }}</h3>
              <p>{{ getPageContent(hashPath) }}</p>
            </div>
          </div>
        </div>

        <div class="characteristics">
          <div class="char-item">
            <span class="char-label">{{ t('hashVsHistory.compatibility') }}</span>
            <span class="badge good">IE8+</span>
          </div>
          <div class="char-item">
            <span class="char-label">{{ t('hashVsHistory.serverConfig') }}</span>
            <span class="badge good">{{ t('hashVsHistory.noConfig') }}</span>
          </div>
          <div class="char-item">
            <span class="char-label">{{ t('hashVsHistory.seo') }}</span>
            <span class="badge bad">{{ t('hashVsHistory.poor') }}</span>
          </div>
        </div>
      </div>

      <!-- History Mode -->
      <div class="mode-column">
        <div class="mode-header history">
          <span class="mode-icon">/</span>
          <span class="mode-title">{{ t('hashVsHistory.historyMode') }}</span>
        </div>

        <div class="browser-mockup">
          <div class="browser-toolbar">
            <div class="window-controls">
              <span class="dot red" />
              <span class="dot yellow" />
              <span class="dot green" />
            </div>
            <div class="address-bar">
              <span class="protocol">https://</span>
              <span class="host">example.com</span>
              <span class="history-path">/{{ historyPath }}</span>
            </div>
          </div>

          <div class="browser-viewport">
            <nav class="nav-bar">
              <a
                v-for="item in navItems"
                :key="item.path"
                :class="['nav-item', { active: historyPath === item.path }]"
                @click="historyPath = item.path"
              >
                {{ item.name }}
              </a>
            </nav>
            <div class="page-content">
              <h3>{{ getPageTitle(historyPath) }}</h3>
              <p>{{ getPageContent(historyPath) }}</p>
            </div>
          </div>
        </div>

        <div class="characteristics">
          <div class="char-item">
            <span class="char-label">{{ t('hashVsHistory.compatibility') }}</span>
            <span class="badge medium">IE10+</span>
          </div>
          <div class="char-item">
            <span class="char-label">{{ t('hashVsHistory.serverConfig') }}</span>
            <span class="badge warn">{{ t('hashVsHistory.needConfig') }}</span>
          </div>
          <div class="char-item">
            <span class="char-label">{{ t('hashVsHistory.seo') }}</span>
            <span class="badge good">{{ t('hashVsHistory.good') }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.choiceAdvice') }}</strong>{{ t('hashVsHistory.info') }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { frontendRoutingLocale } from '../../../locales/frontend-routing/index.js'

const { t, messages } = useI18n(frontendRoutingLocale)
const hashPath = ref('home')
const historyPath = ref('home')

const navItems = computed(() => messages.value.hashVsHistory.navItems)

const getPageTitle = (path) => {
  return messages.value.hashVsHistory.pages[path]?.title || messages.value.hashVsHistory.pages.home.title
}

const getPageContent = (path) => {
  return messages.value.hashVsHistory.pages[path]?.content || messages.value.hashVsHistory.pages.home.content
}
</script>

<style scoped>
.hash-vs-history-demo {
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

.mode-column {
  background: var(--vp-c-bg);
  border-radius: 6px;
  overflow: hidden;
}

.mode-header {
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mode-header.hash {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.mode-header.history {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.mode-icon {
  font-size: 1rem;
  font-weight: bold;
}

.mode-title {
  font-size: 0.9rem;
  font-weight: 600;
}

.browser-mockup {
  border-bottom: 1px solid var(--vp-c-divider);
}

.browser-toolbar {
  background: var(--vp-c-bg-soft);
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.window-controls {
  display: flex;
  gap: 0.375rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot.red { background: #ff5f56; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #27c93f; }

.address-bar {
  flex: 1;
  background: var(--vp-c-bg);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-family: monospace;
}

.protocol, .host { color: var(--vp-c-text-3); }
.hash-path { color: #e06c75; font-weight: 500; }
.history-path { color: #61afef; font-weight: 500; }

.browser-viewport {
  display: flex;
  min-height: 120px;
}

.nav-bar {
  width: 60px;
  background: var(--vp-c-bg-soft);
  padding: 0.5rem 0;
  border-right: 1px solid var(--vp-c-divider);
}

.nav-item {
  display: block;
  padding: 0.5rem 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-item:hover {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.nav-item.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  border-right: 2px solid var(--vp-c-brand);
}

.page-content {
  flex: 1;
  padding: 0.75rem;
}

.page-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.page-content p {
  margin: 0;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.characteristics {
  padding: 0.75rem;
}

.char-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.char-item:last-child {
  border-bottom: none;
}

.char-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.badge {
  padding: 0.125rem 0.5rem;
  border-radius: 12px;
  font-size: 0.65rem;
  font-weight: 500;
}

.badge.good {
  background: rgba(39, 201, 63, 0.15);
  color: #27c93f;
}

.badge.medium {
  background: rgba(255, 189, 46, 0.15);
  color: #ffbd2e;
}

.badge.warn {
  background: rgba(255, 149, 0, 0.15);
  color: #ff9500;
}

.badge.bad {
  background: rgba(255, 95, 86, 0.15);
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
