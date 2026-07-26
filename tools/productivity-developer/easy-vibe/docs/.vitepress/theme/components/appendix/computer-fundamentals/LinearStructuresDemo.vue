<template>
  <div class="linear-structures-demo">
    <div class="demo-header">
      <span class="title">{{ t('dataStructures.linear.title') }}</span>
      <span class="subtitle">{{ t('dataStructures.linear.subtitle') }}</span>
    </div>

    <div class="structure-tabs">
      <button
        v-for="structure in structures"
        :key="structure.id"
        :class="['tab-btn', { active: activeStructure === structure.id }]"
        @click="activeStructure = structure.id"
      >
        {{ structure.icon }} {{ structure.name }}
      </button>
    </div>

    <div class="structure-visual">
      <div class="visual-header">
        <span class="structure-title">{{ currentStructure.name }}</span>
        <span class="structure-tagline">{{ currentStructure.tagline }}</span>
      </div>

      <div v-if="activeStructure === 'array'" class="array-visual">
        <div class="memory-block">
          <div
            v-for="(item, index) in arrayData"
            :key="index"
            class="array-cell"
          >
            <div class="cell-index">{{ index }}</div>
            <div class="cell-value">{{ item }}</div>
          </div>
        </div>
        <div class="visual-note">
          {{ t('dataStructures.linear.notes.array') }}
        </div>
      </div>

      <div v-if="activeStructure === 'linkedlist'" class="linkedlist-visual">
        <div class="nodes-chain">
          <div
            v-for="(item, index) in linkedListData"
            :key="index"
            class="linked-node"
          >
            <div class="node-data">{{ item }}</div>
            <div class="node-pointer">→</div>
          </div>
          <div class="linked-node null">
            <div class="node-data">NULL</div>
          </div>
        </div>
        <div class="visual-note">
          {{ t('dataStructures.linear.notes.linkedlist') }}
        </div>
      </div>

      <div v-if="activeStructure === 'stack'" class="stack-visual">
        <div class="stack-container">
          <div class="stack-top">{{ t('dataStructures.linear.stackTop') }}</div>
          <div class="stack-items">
            <div
              v-for="(item, index) in stackData"
              :key="index"
              class="stack-item"
            >
              {{ item }}
            </div>
          </div>
          <div class="stack-bottom">{{ t('dataStructures.linear.stackBottom') }}</div>
        </div>
        <div class="stack-operations">
          <button class="op-btn" @click="pushStack">
            {{ t('dataStructures.linear.push') }}
          </button>
          <button class="op-btn" @click="popStack">
            {{ t('dataStructures.linear.pop') }}
          </button>
        </div>
        <div class="visual-note">
          {{ t('dataStructures.linear.notes.stack') }}
        </div>
      </div>

      <div v-if="activeStructure === 'queue'" class="queue-visual">
        <div class="queue-container">
          <div class="queue-front">{{ t('dataStructures.linear.queueFront') }}</div>
          <div class="queue-items">
            <div
              v-for="(item, index) in queueData"
              :key="index"
              class="queue-item"
            >
              {{ item }}
            </div>
          </div>
          <div class="queue-rear">{{ t('dataStructures.linear.queueRear') }}</div>
        </div>
        <div class="queue-operations">
          <button class="op-btn" @click="enqueue">
            {{ t('dataStructures.linear.enqueue') }}
          </button>
          <button class="op-btn" @click="dequeue">
            {{ t('dataStructures.linear.dequeue') }}
          </button>
        </div>
        <div class="visual-note">
          {{ t('dataStructures.linear.notes.queue') }}
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <div class="table-title">{{ t('dataStructures.linear.tableTitle') }}</div>
      <table>
        <thead>
          <tr>
            <th v-for="header in tableHeaders" :key="header">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="struct in structures"
            :key="struct.id"
            :class="{ highlighted: struct.id === activeStructure }"
          >
            <td>{{ struct.icon }} {{ struct.name }}</td>
            <td>{{ struct.access }}</td>
            <td>{{ struct.insert }}</td>
            <td>{{ struct.delete }}</td>
            <td>{{ struct.feature }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="applications">
      <div class="app-title">{{ t('dataStructures.linear.appTitle') }}</div>
      <div class="app-list">
        <div
          v-for="(app, index) in currentStructure.applications"
          :key="index"
          class="app-card"
        >
          <div class="app-icon">{{ app.icon }}</div>
          <div class="app-content">
            <div class="app-name">{{ app.name }}</div>
            <div class="app-desc">{{ app.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals'

const { t, messages } = useI18n(computerFundamentalsLocale)

const activeStructure = ref('array')

const structures = computed(() => messages.value.dataStructures.linear.structures)
const tableHeaders = computed(() => messages.value.dataStructures.linear.tableHeaders)

const arrayData = ref([10, 25, 33, 47, 59, 62])
const linkedListData = ref(['A', 'B', 'C', 'D', 'E'])
const stackData = ref(
  messages.value.dataStructures.linear.initialStackItems.map((item) => item)
)
const queueData = ref(
  messages.value.dataStructures.linear.initialQueueItems.map((item) => item)
)

const currentStructure = computed(() =>
  structures.value.find((s) => s.id === activeStructure.value)
)

const pushStack = () => {
  const newItem = t('dataStructures.linear.stackItem', {
    index: stackData.value.length + 1
  })
  stackData.value.unshift(newItem)
}

const popStack = () => {
  if (stackData.value.length > 0) {
    stackData.value.shift()
  }
}

const enqueue = () => {
  const newItem = t('dataStructures.linear.queueItem', {
    index: queueData.value.length + 1
  })
  queueData.value.push(newItem)
}

const dequeue = () => {
  if (queueData.value.length > 0) {
    queueData.value.shift()
  }
}
</script>

<style scoped>
.linear-structures-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.demo-header .title {
  font-weight: 700;
  font-size: 1.1rem;
}
.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.structure-tabs {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 0.75rem 1.25rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-btn:hover {
  border-color: var(--vp-c-brand);
}

.tab-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.structure-visual {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.visual-header {
  text-align: center;
  margin-bottom: 2rem;
}

.structure-title {
  display: block;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
}

.structure-tagline {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.memory-block {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.array-cell {
  width: 70px;
  text-align: center;
}

.cell-index {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.cell-value {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand-soft);
  border: 2px solid var(--vp-c-brand);
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
}

.nodes-chain {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.linked-node {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.node-data {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand-soft);
  border: 2px solid var(--vp-c-brand);
  border-radius: 50%;
  font-weight: 600;
  font-size: 1rem;
}

.node-pointer {
  font-size: 1.5rem;
  color: var(--vp-c-brand);
}

.linked-node.null .node-data {
  background: var(--vp-c-divider);
  border-color: var(--vp-c-text-2);
}

.stack-container,
.queue-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.stack-top,
.queue-front {
  font-size: 0.9rem;
  color: var(--vp-c-brand);
  font-weight: 600;
}

.stack-items,
.queue-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 150px;
}

.stack-item,
.queue-item {
  width: 150px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand-soft);
  border: 2px solid var(--vp-c-brand);
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
}

.queue-items {
  flex-direction: row;
}

.queue-item {
  width: 80px;
}

.stack-bottom,
.queue-rear {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.stack-operations,
.queue-operations {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.op-btn {
  padding: 0.6rem 1.25rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.op-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.visual-note {
  text-align: center;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.comparison-table {
  margin-bottom: 2rem;
}

.table-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.75rem;
  text-align: center;
  font-size: 0.85rem;
}

td {
  padding: 0.75rem;
  text-align: center;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
}

tr.highlighted {
  background: var(--vp-c-brand-soft);
}

.applications {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
}

.app-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.app-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.app-card {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.app-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.app-content {
  flex: 1;
}

.app-name {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}

.app-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}
</style>
