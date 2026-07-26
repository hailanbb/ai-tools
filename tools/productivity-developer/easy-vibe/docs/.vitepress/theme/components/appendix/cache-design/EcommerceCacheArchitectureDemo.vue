
<template>
  <div class="demo-container">
    <div class="demo-header">
      <h4>{{ title }}</h4>
      <p class="hint">
        {{ description }}
      </p>
    </div>
    <div class="demo-content">
      <el-alert
        type="info"
        :closable="false"
      >
        {{ t('ecommerceArchitecture.placeholder') }}
      </el-alert>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { cacheDesignLocale } from '../../../locales/cache-design/index.js'

const { t } = useI18n(cacheDesignLocale)
const title = computed(() => t('ecommerceArchitecture.title'))
const description = computed(() => t('ecommerceArchitecture.description'))
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
