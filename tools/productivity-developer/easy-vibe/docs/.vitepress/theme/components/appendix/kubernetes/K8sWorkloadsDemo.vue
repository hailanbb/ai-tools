<template>
  <div class="k8s-workloads-demo">
    <div class="header">
      <div class="title">{{ t('workloads.title') }}</div>
      <div class="subtitle">{{ t('workloads.subtitle') }}</div>
    </div>

    <div class="resource-tabs">
      <button
        v-for="r in resources"
        :key="r.key"
        :class="['res-btn', { active: activeRes === r.key }]"
        @click="activeRes = r.key"
      >
        {{ r.name }}
      </button>
    </div>

    <div v-if="current" class="detail-panel">
      <div class="detail-header">
        <div class="detail-title">{{ current.name }}</div>
        <div class="detail-badge">{{ current.category }}</div>
      </div>
      <div class="detail-desc">{{ current.desc }}</div>
      <div class="yaml-block">
        <div class="yaml-label">{{ t('workloads.yamlLabel') }}</div>
        <pre class="yaml-code"><code>{{ current.yaml }}</code></pre>
      </div>
      <div v-if="current.tips" class="tips">
        <span class="tip-label">{{ t('workloads.tipLabel') }}</span>{{ current.tips }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { kubernetesLocale } from '../../../locales/kubernetes/index.js'

const { t, messages } = useI18n(kubernetesLocale)

const activeRes = ref('pod')

const resources = computed(() => messages.value.workloads.resources)

const current = computed(() => resources.value.find(r => r.key === activeRes.value))
</script>

<style scoped>
.k8s-workloads-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.resource-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}
.res-btn {
  padding: 0.35rem 0.7rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}
.res-btn:hover { border-color: var(--vp-c-brand); }
.res-btn.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}
.detail-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}
.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}
.detail-title { font-weight: 700; font-size: 0.95rem; }
.detail-badge {
  font-size: 0.68rem;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  background: rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.1);
  color: var(--vp-c-brand);
  font-weight: 600;
}
.detail-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  line-height: 1.6;
}
.yaml-block {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.6rem;
  margin-bottom: 0.5rem;
}
.yaml-label {
  font-weight: 600;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.3rem;
}
.yaml-code {
  font-size: 0.75rem;
  line-height: 1.5;
  margin: 0;
  overflow-x: auto;
  color: var(--vp-c-text-1);
}
.tips {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  padding: 0.4rem 0.6rem;
  background: rgba(245, 158, 11, 0.08);
  border-radius: 6px;
}
.tip-label { font-weight: 600; }
</style>
