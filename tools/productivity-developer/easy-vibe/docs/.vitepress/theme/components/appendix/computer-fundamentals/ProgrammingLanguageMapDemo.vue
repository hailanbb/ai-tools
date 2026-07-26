<template>
  <div class="language-map-demo">
    <div class="demo-header">
      <span class="title">{{ t('computerOrganization.vibeCodingFullstack.languageMap.title') }}</span>
      <span class="subtitle">{{ t('computerOrganization.vibeCodingFullstack.languageMap.subtitle') }}</span>
    </div>

    <div class="classification-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-btn"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="classification-content">
      <div v-for="item in currentItems" :key="item.name" class="item-card">
        <div class="item-name">{{ item.name }}</div>
        <div class="item-desc">{{ item.desc }}</div>
        <div class="item-examples">
          <span v-for="ex in item.examples" :key="ex" class="example-tag">{{ ex }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ t('computerOrganization.vibeCodingFullstack.languageMap.adviceLabel') }}</strong>{{ t('computerOrganization.vibeCodingFullstack.languageMap.advice') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals/index.js'

const { t, messages } = useI18n(computerFundamentalsLocale)

const activeTab = ref('type')

const tabs = computed(() => messages.value.computerOrganization.vibeCodingFullstack.languageMap.tabs)
const classifications = computed(() => messages.value.computerOrganization.vibeCodingFullstack.languageMap.classifications)

const currentItems = computed(() => classifications.value[activeTab.value])
</script>

<style scoped>
.language-map-demo {
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

.classification-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.tab-btn {
  padding: 0.35rem 0.75rem;
  font-size: 0.78rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  border-color: var(--vp-c-brand-1);
}

.tab-btn.active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: white;
}

.classification-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-card {
  padding: 0.6rem 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.item-name {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.15rem;
}

.item-desc {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.35rem;
}

.item-examples {
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
</style>
