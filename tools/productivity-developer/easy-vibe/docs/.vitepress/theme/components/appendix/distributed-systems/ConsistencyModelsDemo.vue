<template>
  <div class="consistency-demo">
    <div class="header">
      <div class="title">{{ t('consistency.title') }}</div>
      <div class="subtitle">{{ t('consistency.subtitle') }}</div>
    </div>

    <div class="model-tabs">
      <div
        v-for="m in models"
        :key="m.key"
        :class="['tab', { active: activeModel === m.key }]"
        @click="activeModel = m.key"
      >
        {{ m.name }}
      </div>
    </div>

    <div v-if="current" class="model-detail">
      <div class="model-name">{{ current.name }}</div>
      <div class="model-desc">{{ current.desc }}</div>

      <div class="timeline">
        <div v-for="(step, i) in current.steps" :key="i" class="step">
          <div class="step-time">T{{ i + 1 }}</div>
          <div class="step-nodes">
            <div
              v-for="(node, ni) in step.nodes"
              :key="ni"
              :class="['node', node.status]"
            >
              <div class="node-label">{{ node.name }}</div>
              <div class="node-value">{{ node.value }}</div>
            </div>
          </div>
          <div class="step-desc">{{ step.desc }}</div>
        </div>
      </div>

      <div class="model-tradeoff">
        <span class="label">{{ t('consistency.tradeoffLabel') }}</span>{{ current.tradeoff }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { distributedSystemsLocale } from '../../../locales/distributed-systems/index.js'

const { t, messages } = useI18n(distributedSystemsLocale)

const activeModel = ref('strong')

const models = computed(() => messages.value.consistency.models)

const current = computed(() => models.value.find(m => m.key === activeModel.value))
</script>

<style scoped>
.consistency-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.model-tabs { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
.tab {
  padding: 0.4rem 0.75rem; border-radius: 6px; cursor: pointer;
  font-size: 0.85rem; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
}
.tab:hover { border-color: var(--vp-c-brand); }
.tab.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); font-weight: 600; }
.model-detail { background: var(--vp-c-bg); border-radius: 8px; padding: 1rem; border: 1px solid var(--vp-c-divider); }
.model-name { font-weight: 700; font-size: 0.95rem; }
.model-desc { color: var(--vp-c-text-2); font-size: 0.82rem; margin-bottom: 0.75rem; }
.timeline { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 0.75rem; }
.step { display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; }
.step-time { font-weight: 700; font-size: 0.8rem; color: var(--vp-c-brand); min-width: 28px; }
.step-nodes { display: flex; gap: 0.4rem; flex: 1; }
.node {
  padding: 0.3rem 0.5rem; border-radius: 4px; font-size: 0.72rem;
  border: 1px solid var(--vp-c-divider); flex: 1; text-align: center;
}
.node.ok { background: rgba(34,197,94,0.08); border-color: #22c55e; }
.node.writing { background: rgba(var(--vp-c-brand-rgb),0.08); border-color: var(--vp-c-brand); }
.node.syncing { background: rgba(245,158,11,0.08); border-color: #f59e0b; }
.node.stale { background: rgba(239,68,68,0.08); border-color: #ef4444; }
.node-label { font-weight: 600; }
.node-value { color: var(--vp-c-text-2); }
.step-desc { font-size: 0.75rem; color: var(--vp-c-text-3); width: 100%; margin-top: 0.15rem; }
.model-tradeoff { font-size: 0.82rem; }
.label { font-weight: 600; color: var(--vp-c-text-2); }
@media (max-width: 640px) { .step { flex-direction: column; } .step-nodes { width: 100%; } }
</style>
