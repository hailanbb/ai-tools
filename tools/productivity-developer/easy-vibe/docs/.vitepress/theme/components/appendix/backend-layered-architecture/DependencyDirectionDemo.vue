<template>
  <div class="dep-demo">
    <div class="header">
      <div class="title">{{ t('dependency.title') }}</div>
      <div class="subtitle">{{ t('dependency.subtitle') }}</div>
    </div>

    <div class="content-box">
      <div class="layers">
        <div class="layer outer">
          <div class="layer-label">{{ t('dependency.outer') }}</div>
          <div class="layer-box">Controller</div>
        </div>
        <div class="dep-arrow">{{ t('dependency.depends') }}</div>
        <div class="layer middle">
          <div class="layer-label">{{ t('dependency.middle') }}</div>
          <div class="layer-box">Service</div>
        </div>
        <div class="dep-arrow">{{ t('dependency.depends') }}</div>
        <div class="layer inner">
          <div class="layer-label">{{ t('dependency.inner') }}</div>
          <div class="layer-box">Domain / Repository</div>
        </div>
      </div>

      <div class="principle-box">
        <div class="p-title">{{ t('dependency.principleTitle') }}</div>
        <p>{{ t('dependency.principleDesc') }}</p>
        <div class="rules">
          <div v-for="r in rules" :key="r.title" class="rule">
            <strong>{{ r.title }}</strong>
            <div class="rule-desc">{{ r.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { backendLayeredArchitectureLocale } from '../../../locales/backend-layered-architecture/index.js'

const { t, messages } = useI18n(backendLayeredArchitectureLocale)
const rules = computed(() => messages.value.dependency.rules)
</script>

<style scoped>
.dep-demo { padding: 20px; background: var(--vp-c-bg-soft); border-radius: 12px; }
.header { text-align: center; margin-bottom: 20px; }
.title { font-size: 16px; font-weight: 600; color: var(--vp-c-text-1); }
.subtitle { font-size: 13px; color: var(--vp-c-text-3); margin-top: 4px; }

.content-box {
  padding: 18px; border-radius: 10px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.layers { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
.layer-label { font-size: 11px; color: var(--vp-c-text-3); margin-bottom: 4px; }
.layer-box {
  padding: 14px; border-radius: 6px; text-align: center;
  font-weight: 500; color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft); border-left: 3px solid var(--vp-c-divider);
}
.layer.outer .layer-box { border-left-color: #10b981; }
.layer.middle .layer-box { border-left-color: #f59e0b; }
.layer.inner .layer-box { border-left-color: #3b82f6; }
.dep-arrow { text-align: center; color: var(--vp-c-text-3); font-size: 12px; }

.principle-box {
  padding: 16px; border-radius: 8px;
  background: var(--vp-c-brand-soft); border-left: 3px solid var(--vp-c-brand-1);
}
.p-title { font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); margin-bottom: 8px; }
.principle-box p { margin: 0 0 12px; font-size: 13px; color: var(--vp-c-text-2); line-height: 1.6; }

.rules { display: flex; flex-direction: column; gap: 8px; }
.rule {
  padding: 10px; border-radius: 6px;
  background: var(--vp-c-bg); font-size: 13px; color: var(--vp-c-text-1);
}
.rule-desc { font-size: 12px; color: var(--vp-c-text-3); margin-top: 2px; }
</style>
