<template>
  <div class="vuex-pinia-demo">
    <div class="demo-header">
      <span class="icon">🍍</span>
      <span class="title">{{ t('vuexPinia.title') }}</span>
      <span class="subtitle">{{ t('vuexPinia.subtitle') }}</span>
    </div>

    <div class="intro-text">
      {{ t('vuexPinia.introPrefix') }}<span class="highlight">{{ t('vuexPinia.introHighlight') }}</span>{{ t('vuexPinia.introSuffix') }}
    </div>

    <div class="demo-content">
      <div class="comparison-cards">
        <div
          class="card vuex-card"
          :class="{ active: activeTab === 'vuex' }"
          @click="activeTab = 'vuex'"
        >
          <div class="card-header">
            <span class="card-icon">🌿</span>
            <span class="card-title">Vuex</span>
            <span class="card-badge">{{ t('vuexPinia.classic') }}</span>
          </div>
          <div class="card-body">
            <div class="feature-list">
              <div
                v-for="(item, idx) in t('vuexPinia.cards.vuex')"
                :key="idx"
                class="feature-item"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>

        <div
          class="card pinia-card"
          :class="{ active: activeTab === 'pinia' }"
          @click="activeTab = 'pinia'"
        >
          <div class="card-header">
            <span class="card-icon">🍍</span>
            <span class="card-title">Pinia</span>
            <span class="card-badge recommended">{{ t('vuexPinia.recommended') }}</span>
          </div>
          <div class="card-body">
            <div class="feature-list">
              <div
                v-for="(item, idx) in t('vuexPinia.cards.pinia')"
                :key="idx"
                class="feature-item"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Transition
        name="fade"
        mode="out-in"
      >
        <div
          v-if="activeTab === 'vuex'"
          key="vuex"
          class="code-example"
        >
          <div class="code-title">
            {{ t('vuexPinia.vuexCodeTitle') }}
          </div>
          <pre class="code-block"><code>// store/index.js
export default createStore({
  state: { count: 0 },
  mutations: {
    INCREMENT(state) {
      state.count++
    }
  },
  actions: {
    increment({ commit }) {
      commit('INCREMENT')
    }
  }
})</code></pre>
        </div>

        <div
          v-else-if="activeTab === 'pinia'"
          key="pinia"
          class="code-example"
        >
          <div class="code-title">
            {{ t('vuexPinia.piniaCodeTitle') }}
          </div>
          <pre class="code-block"><code>// stores/counter.js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function increment() {
    count.value++
  }

  return { count, increment }
})</code></pre>
        </div>
      </Transition>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.recommendation') }}</strong>{{ t('vuexPinia.idea') }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { componentStateManagementLocale } from '../../../locales/component-state-management/index.js'

const { t } = useI18n(componentStateManagementLocale)

const activeTab = ref('pinia')
</script>

<style scoped>
.vuex-pinia-demo {
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

.demo-content {
  margin-bottom: 1rem;
}

.comparison-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px var(--vp-c-brand-delta);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.card-icon {
  font-size: 1.5rem;
}

.card-title {
  font-weight: 600;
  font-size: 1rem;
  flex: 1;
}

.card-badge {
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.card-badge.recommended {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
}

.card-body {
  padding: 0.5rem 0;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature-item {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  padding: 0.4rem 0.6rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.code-example {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
}

.code-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
}

.code-block {
  margin: 0;
  padding: 0.75rem;
  background: #1e1e1e;
  border-radius: 6px;
  overflow-x: auto;
}

.code-block code {
  font-family: monospace;
  font-size: 0.8rem;
  line-height: 1.6;
  color: #d4d4d4;
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
}

.info-box .icon {
  margin-right: 0.25rem;
}
</style>
