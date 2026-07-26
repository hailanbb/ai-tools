<template>
  <div class="k8s-arch-demo">
    <div class="header">
      <div class="title">{{ t('architecture.title') }}</div>
      <div class="subtitle">{{ t('architecture.subtitle') }}</div>
    </div>

    <div class="arch-layout">
      <div class="plane control-plane">
        <div class="plane-title">{{ t('architecture.controlPlaneTitle') }}</div>
        <div class="components">
          <div
            v-for="c in controlPlane"
            :key="c.key"
            :class="['comp-card', { active: active === c.key }]"
            @click="active = c.key"
          >
            <div class="comp-name">{{ c.name }}</div>
          </div>
        </div>
      </div>

      <div class="plane worker-plane">
        <div class="plane-title">{{ t('architecture.workerNodeTitle') }}</div>
        <div class="components">
          <div
            v-for="c in workerNode"
            :key="c.key"
            :class="['comp-card', { active: active === c.key }]"
            @click="active = c.key"
          >
            <div class="comp-name">{{ c.name }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="current" class="detail-panel">
      <div class="detail-title">{{ current.name }}</div>
      <div class="detail-desc">{{ current.desc }}</div>
      <div class="detail-analogy">
        <span class="label">{{ t('architecture.analogyLabel') }}</span>{{ current.analogy }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { kubernetesLocale } from '../../../locales/kubernetes/index.js'

const { t, messages } = useI18n(kubernetesLocale)

const active = ref('api-server')

const controlPlane = computed(() => messages.value.architecture.controlPlane)
const workerNode = computed(() => messages.value.architecture.workerNode)
const allComponents = computed(() => [...controlPlane.value, ...workerNode.value])
const current = computed(() => allComponents.value.find(c => c.key === active.value))
</script>

<style scoped>
.k8s-arch-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.arch-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;
}
@media (max-width: 640px) {
  .arch-layout { grid-template-columns: 1fr; }
}
.plane {
  border-radius: 8px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}
.control-plane { background: rgba(59, 130, 246, 0.06); }
.worker-plane { background: rgba(34, 197, 94, 0.06); }
.plane-title {
  font-weight: 700;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-2);
}
.components {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.comp-card {
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  font-size: 0.78rem;
  font-weight: 600;
  transition: all 0.2s;
}
.comp-card:hover { border-color: var(--vp-c-brand); }
.comp-card.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.08);
  color: var(--vp-c-brand);
}
.detail-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}
.detail-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.4rem; }
.detail-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  line-height: 1.6;
}
.detail-analogy {
  font-size: 0.8rem;
  padding: 0.4rem 0.6rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}
.label { font-weight: 600; color: var(--vp-c-text-2); }
</style>
