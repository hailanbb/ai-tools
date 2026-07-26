<template>
  <div class="lineage-demo">
    <div class="header">
      <div class="title">{{ t('lineage.title') }}</div>
      <div class="subtitle">{{ t('lineage.subtitle') }}</div>
    </div>

    <div class="lineage-graph">
      <div v-for="(layer, li) in layers" :key="li" class="layer">
        <div class="layer-label">{{ layer.label }}</div>
        <div class="layer-nodes">
          <div
            v-for="node in layer.nodes"
            :key="node.id"
            :class="['node', { active: activeNode === node.id, upstream: upstreamIds.includes(node.id), downstream: downstreamIds.includes(node.id) }]"
            @click="selectNode(node.id)"
          >
            <div class="node-icon">{{ node.icon }}</div>
            <div class="node-name">{{ node.name }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeNode && activeInfo" class="info-panel">
      <div class="info-title">{{ activeInfo.name }}</div>
      <div class="info-row"><span class="info-label">{{ t('lineage.labels.upstream') }}</span>{{ activeInfo.upstreamNames || t('lineage.labels.noUpstream') }}</div>
      <div class="info-row"><span class="info-label">{{ t('lineage.labels.downstream') }}</span>{{ activeInfo.downstreamNames || t('lineage.labels.noDownstream') }}</div>
      <div class="info-row"><span class="info-label">{{ t('lineage.labels.owner') }}</span>{{ activeInfo.owner }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { dataGovernanceLocale } from '../../../locales/data-governance/index.js'

const { t, messages } = useI18n(dataGovernanceLocale)

const activeNode = ref(null)

const nodes = computed(() => messages.value.lineage.nodes)
const layers = computed(() =>
  messages.value.lineage.layers.map(layer => ({
    ...layer,
    nodes: layer.nodeIds.map(id => ({ id, ...nodes.value[id] }))
  }))
)

function getAllUpstream(id, visited = new Set()) {
  if (visited.has(id)) return []
  visited.add(id)
  const node = nodes.value[id]
  if (!node) return []
  let result = [...node.upstream]
  node.upstream.forEach(uid => { result = result.concat(getAllUpstream(uid, visited)) })
  return result
}

function getAllDownstream(id, visited = new Set()) {
  if (visited.has(id)) return []
  visited.add(id)
  const node = nodes.value[id]
  if (!node) return []
  let result = [...node.downstream]
  node.downstream.forEach(did => { result = result.concat(getAllDownstream(did, visited)) })
  return result
}

const upstreamIds = computed(() => activeNode.value ? getAllUpstream(activeNode.value) : [])
const downstreamIds = computed(() => activeNode.value ? getAllDownstream(activeNode.value) : [])

const activeInfo = computed(() => {
  if (!activeNode.value || !nodes.value[activeNode.value]) return null
  const n = nodes.value[activeNode.value]
  return {
    ...n,
    upstreamNames: n.upstream.map(id => nodes.value[id]?.name).join(t('lineage.labels.joiner')),
    downstreamNames: n.downstream.map(id => nodes.value[id]?.name).join(t('lineage.labels.joiner'))
  }
})

function selectNode(id) {
  activeNode.value = activeNode.value === id ? null : id
}
</script>

<style scoped>
.lineage-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.lineage-graph { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
.layer { display: flex; align-items: center; gap: 0.75rem; }
.layer-label {
  min-width: 60px; font-size: 0.75rem; font-weight: 700;
  color: var(--vp-c-text-3); text-align: right;
}
.layer-nodes { display: flex; gap: 0.5rem; flex-wrap: wrap; flex: 1; }
.node {
  display: flex; align-items: center; gap: 0.3rem; padding: 0.4rem 0.6rem;
  border-radius: 6px; cursor: pointer; font-size: 0.78rem;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); transition: all 0.2s;
}
.node:hover { border-color: var(--vp-c-brand); }
.node.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.1); font-weight: 700; }
.node.upstream { border-color: #f59e0b; background: rgba(245,158,11,0.08); }
.node.downstream { border-color: #22c55e; background: rgba(34,197,94,0.08); }
.node-icon { font-size: 1rem; }
.node-name { white-space: nowrap; }
.info-panel {
  background: var(--vp-c-bg); border-radius: 8px; padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}
.info-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem; }
.info-row { font-size: 0.82rem; margin-bottom: 0.25rem; }
.info-label { font-weight: 600; color: var(--vp-c-text-2); }
@media (max-width: 640px) { .layer { flex-direction: column; align-items: flex-start; } .layer-label { text-align: left; } }
</style>
