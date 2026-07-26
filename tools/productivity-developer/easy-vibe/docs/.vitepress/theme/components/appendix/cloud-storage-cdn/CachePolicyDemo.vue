<template>
  <div class="demo-container">
    <div class="demo-header">
      <span class="icon">⚙️</span>
      <span class="title">{{ title }}</span>
      <span class="subtitle">{{ description }}</span>
    </div>
    <div class="demo-content">
      <el-alert
        type="info"
        :closable="false"
      >
        {{ t('placeholders.cache.placeholder') }}
      </el-alert>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.coreIdea') }}</strong>{{ t('placeholders.cache.idea') }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { cloudStorageCdnLocale } from '../../../locales/cloud-storage-cdn/index.js'

const { t } = useI18n(cloudStorageCdnLocale)
const title = computed(() => t('placeholders.cache.title'))
const description = computed(() => t('placeholders.cache.subtitle'))
</script>

<style scoped>
.demo-container {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
}

.demo-header {
  margin-bottom: 20px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  color: var(--vp-c-text-1);
}

.hint {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
