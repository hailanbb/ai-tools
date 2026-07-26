<template>
  <div class="data-structure-demo">
    <div class="demo-header">
      <span class="title">{{ t('dataStructures.basic.title') }}</span>
      <span class="subtitle">{{ t('dataStructures.basic.subtitle') }}</span>
    </div>

    <div class="demo-content">
      <div class="structure-tabs">
        <button
          v-for="s in structures"
          :key="s.id"
          :class="['tab-btn', { active: activeStructure === s.id }]"
          @click="activeStructure = s.id"
        >
          {{ s.name }}
        </button>
      </div>

      <div class="structure-visual">
        <div class="visual-header">
          <span class="structure-name">{{ currentStructure.name }}</span>
          <span class="structure-desc">{{ currentStructure.desc }}</span>
        </div>

        <div class="visual-content">
          <div v-if="activeStructure === 'array'" class="array-visual">
            <div class="array-container">
              <div v-for="(item, i) in arrayData" :key="i" class="array-item">
                <span class="index">{{ i }}</span>
                <span class="value">{{ item }}</span>
              </div>
            </div>
            <div class="operation-hint">
              {{ t('dataStructures.basic.hints.array') }}
            </div>
          </div>

          <div v-else-if="activeStructure === 'linkedlist'" class="linked-visual">
            <div class="linked-container">
              <div v-for="(item, i) in linkedData" :key="i" class="linked-node">
                <span class="node-value">{{ item.value }}</span>
                <span v-if="i < linkedData.length - 1" class="node-arrow">→</span>
              </div>
            </div>
            <div class="operation-hint">
              {{ t('dataStructures.basic.hints.linkedlist') }}
            </div>
          </div>

          <div v-else-if="activeStructure === 'stack'" class="stack-visual">
            <div class="stack-container">
              <div v-for="(item, i) in stackData" :key="i" class="stack-item">
                {{ item }}
              </div>
              <div class="stack-bottom">{{ t('dataStructures.basic.stackBottom') }}</div>
            </div>
            <div class="stack-ops">
              <button class="op-btn" @click="pushStack">
                {{ t('dataStructures.basic.push') }}
              </button>
              <button class="op-btn" @click="popStack">
                {{ t('dataStructures.basic.pop') }}
              </button>
            </div>
            <div class="operation-hint">{{ t('dataStructures.basic.hints.stack') }}</div>
          </div>

          <div v-else-if="activeStructure === 'queue'" class="queue-visual">
            <div class="queue-container">
              <span class="queue-label">{{ t('dataStructures.basic.queueOut') }}</span>
              <div v-for="(item, i) in queueData" :key="i" class="queue-item">
                {{ item }}
              </div>
              <span class="queue-label">{{ t('dataStructures.basic.queueIn') }}</span>
            </div>
            <div class="queue-ops">
              <button class="op-btn" @click="enqueue">
                {{ t('dataStructures.basic.enqueue') }}
              </button>
              <button class="op-btn" @click="dequeue">
                {{ t('dataStructures.basic.dequeue') }}
              </button>
            </div>
            <div class="operation-hint">{{ t('dataStructures.basic.hints.queue') }}</div>
          </div>

          <div v-else-if="activeStructure === 'hash'" class="hash-visual">
            <div class="hash-container">
              <div v-for="(bucket, i) in hashData" :key="i" class="hash-bucket">
                <span class="bucket-index">{{ i }}</span>
                <div class="bucket-items">
                  <span
                    v-for="(item, j) in bucket"
                    :key="j"
                    class="bucket-item"
                    >{{ item }}</span>
                </div>
              </div>
            </div>
            <div class="operation-hint">{{ t('dataStructures.basic.hints.hash') }}</div>
          </div>

          <div v-else-if="activeStructure === 'tree'" class="tree-visual">
            <div class="tree-container">
              <div class="tree-level">
                <div class="tree-node root">
                  {{ treeData.value }}
                </div>
              </div>
              <div class="tree-level">
                <div class="tree-node">
                  {{ treeData.left?.value }}
                </div>
                <div class="tree-node">
                  {{ treeData.right?.value }}
                </div>
              </div>
              <div class="tree-level">
                <div class="tree-node leaf">
                  {{ treeData.left?.left?.value }}
                </div>
                <div class="tree-node leaf">
                  {{ treeData.left?.right?.value }}
                </div>
                <div class="tree-node leaf">
                  {{ treeData.right?.left?.value }}
                </div>
                <div class="tree-node leaf">
                  {{ treeData.right?.right?.value }}
                </div>
              </div>
            </div>
            <div class="operation-hint">{{ t('dataStructures.basic.hints.tree') }}</div>
          </div>
        </div>
      </div>

      <div class="complexity-table">
        <div class="table-title">{{ t('dataStructures.basic.tableTitle') }}</div>
        <table>
          <thead>
            <tr>
              <th v-for="header in tableHeaders" :key="header">{{ header }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ t('dataStructures.basic.ops.access') }}</td>
              <td class="good">O(1)</td>
              <td class="bad">O(n)</td>
              <td class="good">O(1)</td>
              <td class="mid">O(log n)</td>
            </tr>
            <tr>
              <td>{{ t('dataStructures.basic.ops.search') }}</td>
              <td class="bad">O(n)</td>
              <td class="bad">O(n)</td>
              <td class="good">O(1)</td>
              <td class="mid">O(log n)</td>
            </tr>
            <tr>
              <td>{{ t('dataStructures.basic.ops.insert') }}</td>
              <td class="bad">O(n)</td>
              <td class="good">O(1)</td>
              <td class="good">O(1)</td>
              <td class="mid">O(log n)</td>
            </tr>
            <tr>
              <td>{{ t('dataStructures.basic.ops.delete') }}</td>
              <td class="bad">O(n)</td>
              <td class="good">O(1)</td>
              <td class="good">O(1)</td>
              <td class="mid">O(log n)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ t('dataStructures.basic.coreIdeaLabel') }}</strong>{{ t('dataStructures.basic.coreIdea') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals'

const { t, messages } = useI18n(computerFundamentalsLocale)

const activeStructure = ref('array')
const structures = computed(() => messages.value.dataStructures.basic.structures)
const tableHeaders = computed(() => messages.value.dataStructures.basic.tableHeaders)

const currentStructure = computed(() => {
  return structures.value.find((s) => s.id === activeStructure.value)
})

const arrayData = ref([10, 20, 30, 40, 50, 60, 70, 80])

const linkedData = ref([
  { value: 10 },
  { value: 20 },
  { value: 30 },
  { value: 40 },
  { value: 50 }
])

const stackData = ref(['A', 'B', 'C'])
const stackCounter = ref(68)

const pushStack = () => {
  stackCounter.value++
  stackData.value.push(String.fromCharCode(stackCounter.value))
}

const popStack = () => {
  if (stackData.value.length > 0) {
    stackData.value.pop()
  }
}

const queueData = ref(
  messages.value.dataStructures.basic.initialQueueItems.map((label) => label)
)
const queueCounter = ref(3)

const enqueue = () => {
  queueCounter.value++
  queueData.value.push(
    t('dataStructures.basic.queueItem', { index: queueCounter.value })
  )
}

const dequeue = () => {
  if (queueData.value.length > 0) {
    queueData.value.shift()
  }
}

const hashData = ref([
  ['apple', 'ant'],
  ['banana'],
  [],
  ['cat', 'car', 'cup'],
  ['dog'],
  [],
  ['egg', 'eye']
])

const treeData = ref({
  value: 50,
  left: {
    value: 30,
    left: { value: 20 },
    right: { value: 40 }
  },
  right: {
    value: 70,
    left: { value: 60 },
    right: { value: 80 }
  }
})
</script>

<style scoped>
.data-structure-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
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

.structure-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.tab-btn {
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.structure-visual {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.visual-header {
  margin-bottom: 0.75rem;
}

.structure-name {
  font-weight: bold;
  font-size: 1rem;
}

.structure-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-left: 0.5rem;
}

.visual-content {
  min-height: 120px;
}

.array-container {
  display: flex;
  gap: 2px;
}

.array-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--vp-c-divider);
  padding: 0.25rem 0.5rem;
  background: var(--vp-c-bg-alt);
}

.index {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
}

.value {
  font-weight: bold;
  font-size: 0.9rem;
}

.linked-container {
  display: flex;
  align-items: center;
  gap: 0;
}

.linked-node {
  display: flex;
  align-items: center;
}

.node-value {
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
  font-weight: bold;
}

.node-arrow {
  margin: 0 0.25rem;
  color: var(--vp-c-brand);
}

.stack-container {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 2px;
}

.stack-item {
  padding: 0.5rem 1.5rem;
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
  font-weight: bold;
}

.stack-bottom {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-top: 0.25rem;
}

.stack-ops,
.queue-ops {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  justify-content: center;
}

.op-btn {
  padding: 0.35rem 0.75rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.queue-container {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.queue-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.queue-item {
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
  font-weight: bold;
}

.hash-container {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.hash-bucket {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.bucket-index {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
}

.bucket-items {
  display: flex;
  gap: 0.25rem;
}

.bucket-item {
  padding: 0.25rem 0.5rem;
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
  font-size: 0.8rem;
}

.tree-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.tree-level {
  display: flex;
  gap: 0.5rem;
}

.tree-node {
  padding: 0.5rem;
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
  font-weight: bold;
  min-width: 40px;
  text-align: center;
}

.tree-node.root {
  background: var(--vp-c-brand);
  color: white;
}

.tree-node.leaf {
  background: var(--vp-c-bg-alt);
}

.operation-hint {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
  text-align: center;
}

.complexity-table {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
}

.table-title {
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
}

th,
td {
  border: 1px solid var(--vp-c-divider);
  padding: 0.35rem;
  text-align: center;
}

th {
  background: var(--vp-c-bg);
}

.good {
  color: var(--vp-c-success);
  font-weight: bold;
}
.mid {
  color: var(--vp-c-warning);
}
.bad {
  color: var(--vp-c-danger);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
  display: flex;
  gap: 0.25rem;
}
</style>
