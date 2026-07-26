<template>
  <div class="traffic-scheduling-demo">
    <div class="demo-header">
      <span class="icon">🚦</span>
      <span class="title">{{ t('placeholders.traffic.title') }}</span>
      <span class="subtitle">{{ t('placeholders.traffic.subtitle') }}</span>
    </div>
    <div class="demo-content">
      <el-alert
        type="info"
        :closable="false"
      >
        {{ t('placeholders.traffic.placeholder') }}
      </el-alert>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.coreIdea') }}</strong>{{ t('placeholders.traffic.idea') }}
    </div>
  </div>
</template>

<script setup>
import { useI18n } from '../../../composables/useI18n.js'
import { cloudStorageCdnLocale } from '../../../locales/cloud-storage-cdn/index.js'

const { t } = useI18n(cloudStorageCdnLocale)
</script>

<style scoped>
.traffic-scheduling-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 1.5rem;
  margin: 0.5rem 0;
  
  
}

.demo-header {
  margin-bottom: 1rem;
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

.demo-content {
  margin-bottom: 1rem;
}

.info-box {
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 6px;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin-top:  0.75rem;
  display: flex;
  gap: 0.25rem;
}

.info-box .icon {
  flex-shrink: 0;
}

.info-box strong {
  color: var(--vp-c-text-1);
}
</style>
