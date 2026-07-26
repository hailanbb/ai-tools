<template>
  <div class="kubernetes-demo">
    <div class="demo-header">
      <h4>{{ t('kubernetes.title') }}</h4>
      <p>{{ t('kubernetes.subtitle') }}</p>
    </div>

    <div class="k8s-architecture">
      <div class="control-plane">
        <div class="plane-title">
          {{ t('kubernetes.controlPlaneTitle') }}
        </div>
        <div class="components">
          <div
            v-for="comp in controlPlane"
            :key="comp.name"
            class="component"
            :class="{ active: activeComponent === comp.name }"
            @click="activeComponent = comp.name"
          >
            <div class="comp-icon">
              {{ comp.icon }}
            </div>
            <div class="comp-name">
              {{ comp.name }}
            </div>
            <div class="comp-desc">
              {{ comp.desc }}
            </div>
          </div>
        </div>
      </div>

      <div class="worker-nodes">
        <div class="plane-title">
          {{ t('kubernetes.workerNodesTitle') }}
        </div>
        <div class="nodes-container">
          <div
            v-for="node in workerNodes"
            :key="node.name"
            class="node"
            :class="{
              active: node.status === 'active',
              failed: node.status === 'failed',
              selected: selectedNode === node.name
            }"
            @click="selectNode(node.name)"
          >
            <div class="node-header">
              <span class="node-icon">{{ node.icon }}</span>
              <span class="node-name">{{ node.name }}</span>
              <span
                class="node-status"
                :class="node.status"
              >{{ t(`kubernetes.statuses.${node.statusText}`) }}</span>
            </div>
            <div class="node-resources">
              <div class="resource">
                <span class="res-label">CPU:</span>
                <div class="res-bar">
                  <div
                    class="res-fill"
                    :style="{ width: node.cpu + '%' }"
                    :class="{ high: node.cpu > 80 }"
                  />
                </div>
                <span class="res-value">{{ node.cpu }}%</span>
              </div>
              <div class="resource">
                <span class="res-label">{{ t('kubernetes.memory') }}</span>
                <div class="res-bar">
                  <div
                    class="res-fill"
                    :style="{ width: node.memory + '%' }"
                    :class="{ high: node.memory > 80 }"
                  />
                </div>
                <span class="res-value">{{ node.memory }}%</span>
              </div>
            </div>
            <div class="node-pods">
              <div class="pods-label">
                {{ t('kubernetes.podCount', { count: node.pods }) }}
              </div>
              <div class="pods-grid">
                <div
                  v-for="n in Math.min(node.pods, 8)"
                  :key="n"
                  class="pod-dot"
                  :class="{
                    running: node.status === 'active',
                    pending: node.status === 'pending',
                    failed: node.status === 'failed'
                  }"
                />
                <div
                  v-if="node.pods > 8"
                  class="pod-more"
                >
                  +{{ node.pods - 8 }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="k8s-controls">
      <button
        class="control-btn"
        :disabled="isScheduling"
        @click="simulateScheduling"
      >
        {{ isScheduling ? t('kubernetes.scheduling') : t('kubernetes.schedule') }}
      </button>
      <button
        class="control-btn"
        :disabled="isScaling"
        @click="simulateScaling"
      >
        {{ isScaling ? t('kubernetes.scaling') : t('kubernetes.scale') }}
      </button>
      <button
        class="control-btn danger"
        :disabled="isFailing"
        @click="simulateFailure"
      >
        {{ isFailing ? t('kubernetes.failing') : t('kubernetes.fail') }}
      </button>
      <button
        class="control-btn"
        @click="resetCluster"
      >
        {{ t('kubernetes.reset') }}
      </button>
    </div>

    <div
      v-if="logs.length > 0"
      class="k8s-logs"
    >
      <div
        v-for="(log, idx) in logs.slice(-5)"
        :key="idx"
        class="log-entry"
        :class="log.level"
      >
        <span class="log-time">{{ log.time }}</span>
        <span class="log-message">{{ log.message }}</span>
      </div>
    </div>

    <div class="demo-explanation">
      <h5>{{ t('kubernetes.explanationTitle') }}</h5>
      <ul>
        <li
          v-for="item in explanation"
          :key="item.term"
        >
          <strong>{{ item.term }}</strong>: {{ item.desc }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { backendEvolutionLocale } from '../../../locales/backend-evolution/index.js'

const { t, messages } = useI18n(backendEvolutionLocale)
const controlPlane = computed(() => messages.value.kubernetes.controlPlane)
const explanation = computed(() => messages.value.kubernetes.explanation)

const workerNodes = reactive([
  {
    name: 'Node-1',
    icon: '🖥️',
    status: 'active',
    statusText: 'active',
    cpu: 45,
    memory: 60,
    pods: 5
  },
  {
    name: 'Node-2',
    icon: '🖥️',
    status: 'active',
    statusText: 'active',
    cpu: 30,
    memory: 40,
    pods: 3
  },
  {
    name: 'Node-3',
    icon: '🖥️',
    status: 'pending',
    statusText: 'pending',
    cpu: 0,
    memory: 0,
    pods: 0
  }
])

const activeComponent = ref(null)
const selectedNode = ref(null)
const isScheduling = ref(false)
const isScaling = ref(false)
const isFailing = ref(false)
const logs = ref([])

const addLog = (message, level = 'info') => {
  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  logs.value.push({ time, message, level })
  if (logs.value.length > 20) logs.value.shift()
}

const selectNode = (name) => {
  selectedNode.value = selectedNode.value === name ? null : name
}

const simulateScheduling = async () => {
  isScheduling.value = true
  addLog(t('kubernetes.logs.startSchedule'), 'info')

  await new Promise(r => setTimeout(r, 800))
  addLog(t('kubernetes.logs.evaluate'), 'info')

  await new Promise(r => setTimeout(r, 800))
  const targetNode = workerNodes.find(n => n.status === 'active' && n.cpu < 70)
  if (targetNode) {
    targetNode.pods++
    targetNode.cpu += 10
    addLog(t('kubernetes.logs.scheduled', { node: targetNode.name }), 'success')
  } else {
    addLog(t('kubernetes.logs.noNode'), 'warning')
  }

  isScheduling.value = false
}

const simulateScaling = async () => {
  isScaling.value = true
  addLog(t('kubernetes.logs.highLoad'), 'info')

  const pendingNode = workerNodes.find(n => n.status === 'pending')
  if (pendingNode) {
    await new Promise(r => setTimeout(r, 1500))
    pendingNode.status = 'active'
    pendingNode.statusText = 'active'
    pendingNode.cpu = 20
    pendingNode.memory = 30
    addLog(t('kubernetes.logs.joined', { node: pendingNode.name }), 'success')
  } else {
    addLog(t('kubernetes.logs.maxNodes'), 'warning')
  }

  isScaling.value = false
}

const simulateFailure = async () => {
  isFailing.value = true
  const targetNode = workerNodes.find(n => n.status === 'active')

  if (targetNode) {
    addLog(t('kubernetes.logs.lost', { node: targetNode.name }), 'error')
    targetNode.status = 'failed'
    targetNode.statusText = 'failed'

    await new Promise(r => setTimeout(r, 1000))
    addLog(t('kubernetes.logs.reschedule'), 'info')

    await new Promise(r => setTimeout(r, 1500))
    const healthyNode = workerNodes.find(n => n.status === 'active' && n.name !== targetNode.name)
    if (healthyNode) {
      healthyNode.pods += targetNode.pods
      addLog(t('kubernetes.logs.migrated', { node: healthyNode.name }), 'success')
    }

    targetNode.pods = 0
    targetNode.cpu = 0
    targetNode.memory = 0
  }

  isFailing.value = false
}

const resetCluster = () => {
  workerNodes.forEach((node, index) => {
    if (index < 2) {
      node.status = 'active'
      node.statusText = 'active'
      node.cpu = 30 + index * 15
      node.memory = 40 + index * 20
      node.pods = 3 + index * 2
    } else {
      node.status = 'pending'
      node.statusText = 'pending'
      node.cpu = 0
      node.memory = 0
      node.pods = 0
    }
  })
  logs.value = []
  addLog(t('kubernetes.logs.reset'), 'info')
}
</script>

<style scoped>
.container-docker-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 0.5rem 0;
}

.demo-header {
  margin-bottom: 1.5rem;
}

.demo-header h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.demo-header p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.docker-visualization {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: stretch;
}

.layer {
  flex: 1;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.3s;
}

.layer:hover,
.layer.active {
  border-color: var(--vp-c-brand);
}

.layer h5 {
  margin: 0 0 1rem 0;
  text-align: center;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.server-stack,
.docker-stack {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.layer-item {
  padding: 0.6rem;
  border-radius: 4px;
  text-align: center;
  font-size: 0.8rem;
}

.layer-item.app {
  background: rgba(102, 126, 234, 0.2);
  color: var(--vp-c-brand);
  font-weight: 600;
}

.layer-item.deps {
  background: var(--vp-c-bg-soft);
  border: 1px dashed var(--vp-c-divider);
}

.layer-item.os,
.layer-item.hardware {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.layer-item.conflict {
  background: rgba(239, 68, 68, 0.2);
  color: var(--vp-c-danger);
  font-weight: 600;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.containers {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.container-box {
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 6px;
  padding: 0.5rem;
  text-align: center;
}

.container-app {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-brand);
  margin-bottom: 0.2rem;
}

.container-deps {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.docker-engine {
  padding: 0.6rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 4px;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  color: #059669;
}

.host-os,
.hardware {
  padding: 0.6rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  text-align: center;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.vs-divider {
  display: flex;
  align-items: center;
  font-weight: 700;
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.benefit-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  transition: all 0.2s;
}

.benefit-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.benefit-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.benefit-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.benefit-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

@media (max-width: 768px) {
  .docker-visualization {
    flex-direction: column;
  }

  .vs-divider {
    justify-content: center;
    padding: 0.5rem 0;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
  }
}
</style>
