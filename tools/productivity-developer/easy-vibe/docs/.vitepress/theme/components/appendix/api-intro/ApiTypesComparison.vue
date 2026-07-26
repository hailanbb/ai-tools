<template>
  <div class="api-types-demo">
    <div class="switch-bar">
      <button
        v-for="type in types"
        :key="type.id"
        :class="{ active: active === type.id }"
        @click="active = type.id"
      >
        {{ type.icon }} {{ type.name }}
      </button>
    </div>

    <div class="display-area">
      <div class="info-grid">
        <div class="info-item">
          <span class="label">{{ t('apiTypes.labels.target') }}</span>
          <span class="value">{{ currentType.target }}</span>
        </div>
        <div class="info-item">
          <span class="label">{{ t('apiTypes.labels.comm') }}</span>
          <span class="value">{{ currentType.comm }}</span>
        </div>
        <div class="info-item">
          <span class="label">{{ t('apiTypes.labels.latency') }}</span>
          <span class="value">{{ currentType.latency }}</span>
        </div>
        <div class="info-item">
          <span class="label">{{ t('apiTypes.labels.scenarios') }}</span>
          <span class="value">{{ currentType.scenarios }}</span>
        </div>
      </div>

      <div class="code-preview">
        <div class="code-header">{{ t('apiTypes.labels.example', { name: currentType.name }) }}</div>
        <pre><code>{{ currentType.example }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { apiIntroLocale } from '../../../locales/api-intro/index.js'

const { t, messages } = useI18n(apiIntroLocale)
const active = ref('function')
const types = computed(() => messages.value.apiTypes.types)

const currentType = computed(() => {
  return types.value.find((type) => type.id === active.value) || types.value[0]
})
</script>

<style scoped>
.api-types-demo {
  margin: 20px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}

.switch-bar {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.switch-bar button {
  flex: 1;
  padding: 10px 16px;
  background: var(--vp-c-bg);
  border: none;
  border-right: 1px solid var(--vp-c-divider);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  color: var(--vp-c-text-2);
}

.switch-bar button:last-child {
  border-right: none;
}

.switch-bar button:hover {
  background: var(--vp-c-bg-mute);
}

.switch-bar button.active {
  background: var(--vp-c-brand);
  color: white;
}

.display-area {
  padding: 16px;
  background: var(--vp-c-bg);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 12px;
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.label {
  font-size: 10px;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.value {
  font-size: 12px;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.code-preview {
  background: #0a0a0a;
  border-radius: 6px;
  overflow: hidden;
}

.code-header {
  padding: 8px 12px;
  background: #18181b;
  color: #71717a;
  font-size: 11px;
  font-weight: 600;
  border-bottom: 1px solid #27272a;
}

.code-preview pre {
  margin: 0;
  padding: 12px;
  color: #e4e4e7;
  font-size: 11px;
  line-height: 1.5;
  overflow-x: auto;
}

.code-preview code {
  font-family: 'Menlo', 'Monaco', monospace;
}
</style>
