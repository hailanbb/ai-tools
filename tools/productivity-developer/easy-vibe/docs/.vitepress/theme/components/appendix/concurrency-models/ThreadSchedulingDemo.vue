<template>
  <div class="demo-container">
    <h4>{{ t('threadScheduling.title') }}</h4>

    <div class="controls">
      <el-radio-group
        v-model="schedulingPolicy"
        size="small"
      >
        <el-radio-button label="fifo">
          {{ t('threadScheduling.fifo') }}
        </el-radio-button>
        <el-radio-button label="roundrobin">
          {{ t('threadScheduling.roundRobin') }}
        </el-radio-button>
        <el-radio-button label="priority">
          {{ t('threadScheduling.priority') }}
        </el-radio-button>
      </el-radio-group>

      <el-button
        type="primary"
        size="small"
        :disabled="threads.length >= 6"
        @click="addThread"
      >
        {{ t('threadScheduling.addThread') }}
      </el-button>

      <el-button
        type="success"
        size="small"
        @click="toggleSimulation"
      >
        {{ isRunning ? t('threadScheduling.pause') : t('threadScheduling.startScheduling') }}
      </el-button>

      <el-button
        size="small"
        @click="reset"
      >
        {{ t('common.reset') }}
      </el-button>
    </div>

    <div class="timeline-container">
      <div class="timeline-header">
        <span class="timeline-label">{{ t('threadScheduling.timelineLabel') }}</span>
        <div class="time-marker">
          0ms
        </div>
        <div class="time-marker">
          100ms
        </div>
        <div class="time-marker">
          200ms
        </div>
        <div class="time-marker">
          300ms
        </div>
        <div class="time-marker">
          400ms
        </div>
        <div class="time-marker">
          500ms
        </div>
      </div>

      <div class="thread-rows">
        <div
          v-for="thread in threads"
          :key="thread.id"
          class="thread-row"
        >
          <div class="thread-info">
            <div
              class="thread-name"
              :style="{ color: thread.color }"
            >
              {{ thread.name }}
            </div>
            <div class="thread-details">
              <el-tag
                size="small"
                :type="thread.state === 'running' ? 'success' : thread.state === 'ready' ? 'warning' : 'info'"
              >
                {{ t('threadScheduling.stateTexts.' + thread.state) }}
              </el-tag>
              <span class="priority">{{ t('threadScheduling.priorityLabel') }}: {{ thread.priority }}</span>
            </div>
          </div>

          <div class="execution-track">
            <div
              v-for="(slot, idx) in thread.executionSlots"
              :key="idx"
              class="execution-slot"
              :class="{ running: slot.state === 'running', blocked: slot.state === 'blocked' }"
              :style="{ left: slot.start + '%', width: slot.width + '%', backgroundColor: slot.state === 'running' ? thread.color : '#dcdfe6' }"
            >
              <span
                v-if="slot.state === 'running'"
                class="slot-label"
              >{{ t('threadScheduling.slotRunning') }}</span>
              <span
                v-else
                class="slot-label"
              >{{ t('threadScheduling.slotWaiting') }}</span>
            </div>

            <div
              v-if="thread.state === 'running'"
              class="current-indicator"
              :style="{ left: currentTime + '%', backgroundColor: thread.color }"
            >
              <div class="indicator-arrow" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="stats-panel">
      <div class="stat-item">
        <div class="stat-value">
          {{ completedThreads }}
        </div>
        <div class="stat-label">
          {{ t('threadScheduling.completedThreads') }}
        </div>
      </div>
      <div class="stat-item">
        <div class="stat-value">
          {{ contextSwitches }}
        </div>
        <div class="stat-label">
          {{ t('threadScheduling.contextSwitches') }}
        </div>
      </div>
      <div class="stat-item">
        <div class="stat-value">
          {{ avgWaitTime }}ms
        </div>
        <div class="stat-label">
          {{ t('threadScheduling.avgWaitTime') }}
        </div>
      </div>
      <div class="stat-item">
        <div class="stat-value">
          {{ throughput }}
        </div>
        <div class="stat-label">
          {{ t('threadScheduling.throughput') }}
        </div>
      </div>
    </div>

    <div class="algorithm-info">
      <h5>{{ t('threadScheduling.currentAlgorithm') }}: {{ t('threadScheduling.algorithmNames.' + schedulingPolicy) }}</h5>
      <p>{{ t('threadScheduling.algorithmDescriptions.' + schedulingPolicy) }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { concurrencyModelsLocale } from '../../../locales/concurrency-models/index.js'

const { t } = useI18n(concurrencyModelsLocale)

const schedulingPolicy = ref('roundrobin')
const threads = ref([])
const isRunning = ref(false)
const currentTime = ref(0)
const completedThreads = ref(0)
const contextSwitches = ref(0)
const totalWaitTime = ref(0)
const startTime = ref(null)

let animationId = null
let currentThreadIndex = 0

const colors = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399', '#b3d8ff']

const avgWaitTime = computed(() => {
  if (completedThreads.value === 0) return 0
  return Math.round(totalWaitTime.value / completedThreads.value)
})

const throughput = computed(() => {
  if (!startTime.value) return 0
  const elapsed = (Date.now() - startTime.value) / 1000
  if (elapsed === 0) return 0
  return (completedThreads.value / elapsed).toFixed(2)
})

function addThread() {
  if (threads.value.length >= 6) return

  const id = threads.value.length + 1
  const priority = Math.floor(Math.random() * 10) + 1
  const workAmount = 30 + Math.floor(Math.random() * 50)

  threads.value.push({
    id,
    name: `Thread-${id}`,
    color: colors[id - 1],
    priority,
    state: 'ready',
    progress: 0,
    workAmount,
    executionSlots: [],
    startTime: null,
    endTime: null
  })
}

function reset() {
  threads.value = []
  isRunning.value = false
  currentTime.value = 0
  completedThreads.value = 0
  contextSwitches.value = 0
  totalWaitTime.value = 0
  startTime.value = null
  currentThreadIndex = 0
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
}

function toggleSimulation() {
  if (isRunning.value) {
    pauseSimulation()
  } else {
    startSimulation()
  }
}

function startSimulation() {
  if (threads.value.length === 0) {
    for (let i = 0; i < 3; i++) {
      addThread()
    }
  }

  isRunning.value = true
  if (!startTime.value) {
    startTime.value = Date.now()
  }

  threads.value.forEach(thread => {
    if (!thread.startTime) {
      thread.startTime = Date.now()
    }
  })

  runSimulation()
}

function pauseSimulation() {
  isRunning.value = false
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
}

function runSimulation() {
  if (!isRunning.value) return

  let nextThread = null
  let nextIndex = -1

  switch (schedulingPolicy.value) {
    case 'fifo':
      for (let i = 0; i < threads.value.length; i++) {
        if (threads.value[i].progress < threads.value[i].workAmount) {
          nextThread = threads.value[i]
          nextIndex = i
          break
        }
      }
      break

    case 'roundrobin':
      let attempts = 0
      while (attempts < threads.value.length) {
        const idx = currentThreadIndex % threads.value.length
        if (threads.value[idx].progress < threads.value[idx].workAmount) {
          nextThread = threads.value[idx]
          nextIndex = idx
          currentThreadIndex = (idx + 1) % threads.value.length
          break
        }
        currentThreadIndex++
        attempts++
      }
      break

    case 'priority':
      let highestPriority = -1
      for (let i = 0; i < threads.value.length; i++) {
        const thread = threads.value[i]
        if (thread.progress < thread.workAmount && thread.priority > highestPriority) {
          highestPriority = thread.priority
          nextThread = thread
          nextIndex = i
        }
      }
      break
  }

  if (nextThread) {
    if (nextThread.state !== 'running') {
      contextSwitches.value++
      nextThread.state = 'running'
    }

    threads.value.forEach((thread, idx) => {
      if (idx !== nextIndex && thread.state === 'running') {
        thread.state = 'ready'
      }
    })

    const lastSlot = nextThread.executionSlots[nextThread.executionSlots.length - 1]
    if (!lastSlot || lastSlot.state !== 'running') {
      nextThread.executionSlots.push({
        start: nextThread.progress,
        width: 0,
        state: 'running'
      })
    } else {
      lastSlot.width = 2
    }

    const increment = schedulingPolicy.value === 'roundrobin' ? 5 : 3
    nextThread.progress = Math.min(nextThread.progress + increment, nextThread.workAmount)

    if (nextThread.progress >= nextThread.workAmount) {
      nextThread.state = 'completed'
      nextThread.endTime = Date.now()
      completedThreads.value++
      totalWaitTime.value += (nextThread.endTime - nextThread.startTime)
    }

    currentTime.value = nextThread.progress
  }

  const allCompleted = threads.value.every(t => t.progress >= t.workAmount)
  if (allCompleted) {
    isRunning.value = false
  } else {
    animationId = requestAnimationFrame(runSimulation)
  }
}

onMounted(() => {
  for (let i = 0; i < 3; i++) {
    addThread()
  }
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
.demo-container {
  padding: 20px;
  background: #f5f7fa;
  border-radius: 6px;
}

h4 {
  margin: 0 0 16px 0;
  color: #303133;
}

.controls {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.timeline-container {
  background: white;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 16px;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #e4e7ed;
  margin-bottom: 16px;
}

.timeline-label {
  font-weight: bold;
  color: #303133;
  font-size: 13px;
}

.time-marker {
  font-size: 11px;
  color: #909399;
}

.thread-rows {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.thread-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 12px;
  align-items: center;
}

.thread-info {
  font-size: 12px;
}

.thread-name {
  font-weight: bold;
  margin-bottom: 4px;
}

.thread-details {
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: wrap;
}

.priority {
  color: #909399;
  font-size: 11px;
}

.execution-track {
  position: relative;
  height: 28px;
  background: #f5f7fa;
  border-radius: 4px;
  overflow: hidden;
}

.execution-slot {
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
}

.slot-label {
  font-size: 9px;
  color: white;
  font-weight: 500;
}

.execution-slot.blocked .slot-label {
  color: #606266;
}

.current-indicator {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 3px;
}

.indicator-arrow {
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid currentColor;
  position: absolute;
  top: -6px;
  left: -3px;
}

.stats-panel {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.stat-item {
  background: white;
  border-radius: 6px;
  padding: 12px;
  text-align: center;
}

.stat-value {
  font-size: 20px;
  font-weight: bold;
  color: #303133;
}

.stat-label {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}

.algorithm-info {
  background: white;
  border-radius: 6px;
  padding: 16px;
}

.algorithm-info h5 {
  margin: 0 0 8px 0;
  color: #303133;
}

.algorithm-info p {
  margin: 0;
  font-size: 13px;
  color: #606266;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .stats-panel {
    grid-template-columns: repeat(2, 1fr);
  }

  .thread-row {
    grid-template-columns: 1fr;
  }

  .thread-info {
    display: flex;
    gap: 8px;
    align-items: center;
  }
}
</style>
