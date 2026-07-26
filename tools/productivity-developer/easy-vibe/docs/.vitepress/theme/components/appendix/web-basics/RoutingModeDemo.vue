<template>
  <div class="routing-demo">
    <div class="header">
      <div class="title">
        {{ t('frameworks.routingMode.title') }}
      </div>
      <div class="subtitle">
        {{ t('frameworks.routingMode.subtitle') }}
      </div>
    </div>

    <div class="mode-switch">
      <button
        class="mode"
        :class="{ active: mode === 'mpa' }"
        @click="mode = 'mpa'"
      >
        {{ t('frameworks.routingMode.mpa') }}
      </button>
      <button
        class="mode"
        :class="{ active: mode === 'spa' }"
        @click="mode = 'spa'"
      >
        {{ t('frameworks.routingMode.spa') }}
      </button>
    </div>

    <div class="nav">
      <button
        v-for="page in pages"
        :key="page"
        @click="navigate(page)"
      >
        {{ page }}
      </button>
    </div>

    <div class="screen">
      <div
        v-if="loading"
        class="loading"
      >
        {{ t('frameworks.routingMode.loading') }}
      </div>
      <div
        v-else
        class="content"
      >
        {{ t('frameworks.routingMode.currentPage') }}<strong>{{ currentPage }}</strong>
      </div>
    </div>

    <div class="hint">
      {{ hintText }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { webBasicsLocale } from '../../../locales/web-basics/index.js'

const { t, messages } = useI18n(webBasicsLocale)

const mode = ref('mpa')
const pages = computed(() => messages.value.frameworks.routingMode.pages)
const currentPage = ref(pages.value[0])
const loading = ref(false)

const hintText = computed(() =>
  mode.value === 'mpa'
    ? t('frameworks.routingMode.hints.mpa')
    : t('frameworks.routingMode.hints.spa')
)

watch(pages, (nextPages) => {
  currentPage.value = nextPages[0]
})

const navigate = (page) => {
  loading.value = true
  const delay = mode.value === 'mpa' ? 700 : 160
  setTimeout(() => {
    currentPage.value = page
    loading.value = false
  }, delay)
}
</script>

<style scoped>
.routing-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1rem;
}

.title {
  font-weight: 700;
  font-size: 1.05rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.mode-switch {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.mode {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  font-size: 0.85rem;
  cursor: pointer;
}

.mode.active {
  border-color: #3b82f6;
  color: #1d4ed8;
  background: rgba(59, 130, 246, 0.12);
}

.nav {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.nav button {
  border: none;
  background: var(--vp-c-brand);
  color: white;
  padding: 0.35rem 0.7rem;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
}

.screen {
  margin-top: 1rem;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 10px;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.content {
  font-size: 0.95rem;
}

.hint {
  margin-top: 0.75rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}
</style>
