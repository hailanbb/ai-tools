<template>
  <div class="demo-container">
    <h4>{{ t('eventLoop.title') }}</h4>

    <div class="controls">
      <el-button
        type="primary"
        size="small"
        :disabled="isRunning"
        @click="startSimulation"
      >
        {{ isRunning ? t('common.running') : t('eventLoop.startSimulation') }}
      </el-button>
      <el-button
        size="small"
        :disabled="tasks.length >= 10"
        @click="addTask"
      >
        {{ t('eventLoop.addTask') }}
      </el-button>
      <el-button
        size="small"
        :disabled="microtasks.length >= 5"
        @click="addMicrotask"
      >
        {{ t('eventLoop.addMicrotask') }}
      </el-button>
      <el-button
        size="small"
        @click="reset"
      >
        {{ t('common.reset') }}
      </el-button>

      <el-select
        v-model="simulationSpeed"
        size="small"
        style="width: 120px;"
      >
        <el-option
          :value="1"
          :label="t('eventLoop.speedSlow')"
        />
        <el-option
          :value="2"
          :label="t('eventLoop.speedNormal')"
        />
        <el-option
          :value="3"
          :label="t('eventLoop.speedFast')"
        />
        <el-option
          :value="4"
          :label="t('eventLoop.speedVeryFast')"
        />
        <el-option
          :value="5"
          :label="t('eventLoop.speedInstant')"
        />
      </el-select>
    </div>

    <div class="event-loop-container">
      <!-- Call Stack -->
      <div class="section">
        <div class="section-title">
          {{ t('eventLoop.callStack') }}
        </div>
        <div class="stack-container">
          <div
            v-for="(frame, idx) in callStack"
            :key="idx"
            class="stack-frame"
            :class="{ active: idx === 0 }"
            :style="{ animationDelay: idx * 0.1 + 's' }"
          >
            <div class="frame-name">
              {{ frame.name }}
            </div>
            <div
              v-if="frame.line"
              class="frame-line"
            >
              {{ t('eventLoop.lineLabel', { line: frame.line }) }}
            </div>
          </div>
          <div
            v-if="callStack.length === 0"
            class="empty-stack"
          >
            {{ t('eventLoop.stackEmpty') }}
          </div>
        </div>
      </div>

      <!-- Event Loop -->
      <div class="section event-loop">
        <div class="section-title">
          {{ t('eventLoop.eventLoopTitle') }}
        </div>
        <div class="loop-container">
          <div
            class="loop-arrow"
            :class="{ rotating: isRunning }"
          >
            <svg
              viewBox="0 0 100 100"
              class="loop-svg"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#409eff"
                stroke-width="4"
                stroke-dasharray="200"
                stroke-linecap="round"
                class="loop-circle"
              />
              <polygon
                points="85,50 75,45 75,55"
                fill="#409eff"
                class="loop-arrowhead"
              />
            </svg>
          </div>
          <div class="loop-label">
            {{ t('eventLoop.checkLabel') }}
          </div>
        </div>

        <div class="loop-description">
          <div
            class="step"
            :class="{ active: currentStep === 1 }"
          >
            <span class="step-num">1</span>
            <span class="step-text">{{ t('eventLoop.step1') }}</span>
          </div>
          <div
            class="step"
            :class="{ active: currentStep === 2 }"
          >
            <span class="step-num">2</span>
            <span class="step-text">{{ t('eventLoop.step2') }}</span>
          </div>
          <div
            class="step"
            :class="{ active: currentStep === 3 }"
          >
            <span class="step-num">3</span>
            <span class="step-text">{{ t('eventLoop.step3') }}</span>
          </div>
          <div
            class="step"
            :class="{ active: currentStep === 4 }"
          >
            <span class="step-num">4</span>
            <span class="step-text">{{ t('eventLoop.step4') }}</span>
          </div>
        </div>
      </div>

      <!-- Task Queue -->
      <div class="section">
        <div class="section-title">
          {{ t('eventLoop.taskQueue') }}
        </div>

        <div class="queue microtask-queue">
          <div class="queue-title">
            {{ t('eventLoop.microtaskQueue') }}
          </div>
          <div class="queue-items">
            <div
              v-for="(task, idx) in microtasks"
              :key="task.id"
              class="queue-item microtask"
              :style="{ animationDelay: idx * 0.1 + 's' }"
            >
              <span class="task-name">{{ task.name }}</span>
              <span class="task-priority">{{ t('eventLoop.highPriority') }}</span>
            </div>
            <div
              v-if="microtasks.length === 0"
              class="empty-queue"
            >
              {{ t('eventLoop.queueEmpty') }}
            </div>
          </div>
        </div>

        <div class="queue macrotask-queue">
          <div class="queue-title">
            {{ t('eventLoop.macrotaskQueue') }}
          </div>
          <div class="queue-items">
            <div
              v-for="(task, idx) in tasks"
              :key="task.id"
              class="queue-item macrotask"
              :style="{ animationDelay: idx * 0.15 + 's' }"
            >
              <span class="task-name">{{ task.name }}</span>
              <span class="task-type">{{ task.type }}</span>
            </div>
            <div
              v-if="tasks.length === 0"
              class="empty-queue"
            >
              {{ t('eventLoop.queueEmpty') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { concurrencyModelsLocale } from '../../../locales/concurrency-models/index.js'

const { t } = useI18n(concurrencyModelsLocale)

const isRunning = ref(false)
const simulationSpeed = ref(2)
const currentStep = ref(1)
const callStack = ref([])
const microtasks = ref([])
const tasks = ref([])
let taskIdCounter = 1
let microtaskIdCounter = 1

function addTask() {
  if (tasks.value.length >= 10) return
  const typeKeys = ['setTimeout', 'setInterval', 'io', 'domEvent']
  const randomKey = typeKeys[Math.floor(Math.random() * typeKeys.length)]
  tasks.value.push({
    id: taskIdCounter++,
    name: t('eventLoop.taskName', { id: taskIdCounter - 1 }),
    type: t('eventLoop.taskTypes.' + randomKey)
  })
}

function addMicrotask() {
  if (microtasks.value.length >= 5) return
  microtasks.value.push({
    id: microtaskIdCounter++,
    name: t('eventLoop.microtaskName', { id: microtaskIdCounter - 1 })
  })
}

function startSimulation() {
  if (isRunning.value) return

  if (tasks.value.length === 0) {
    addTask()
    addTask()
  }
  if (microtasks.value.length === 0) {
    addMicrotask()
  }

  isRunning.value = true
  currentStep.value = 1

  runSimulationStep()
}

function runSimulationStep() {
  if (!isRunning.value) return

  const speed = 6 - simulationSpeed.value
  const delay = speed * 200

  setTimeout(() => {
    if (!isRunning.value) return

    currentStep.value = (currentStep.value % 4) + 1

    updateCallStack()

    if (currentStep.value === 2 && microtasks.value.length > 0) {
      microtasks.value.shift()
    } else if (currentStep.value === 4 && tasks.value.length > 0) {
      tasks.value.shift()
    }

    if (tasks.value.length === 0 && microtasks.value.length === 0) {
      isRunning.value = false
      callStack.value = []
    } else {
      runSimulationStep()
    }
  }, delay)
}

function updateCallStack() {
  const stack = []

  switch (currentStep.value) {
    case 1:
      stack.push({ name: 'main()', line: 1 })
      stack.push({ name: 'executeSync()', line: 15 })
      break
    case 2:
      stack.push({ name: 'main()', line: 1 })
      stack.push({ name: 'processMicrotask()', line: 25 })
      break
    case 3:
      stack.push({ name: 'main()', line: 1 })
      stack.push({ name: 'render()', line: 35 })
      break
    case 4:
      stack.push({ name: 'main()', line: 1 })
      stack.push({ name: 'processMacrotask()', line: 45 })
      break
  }

  callStack.value = stack
}

function reset() {
  isRunning.value = false
  currentStep.value = 1
  callStack.value = []
  microtasks.value = []
  tasks.value = []
  taskIdCounter = 1
  microtaskIdCounter = 1
}
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
  align-items: center;
}

.event-loop-container {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.section {
  background: white;
  border-radius: 6px;
  padding: 16px;
}

.section-title {
  font-weight: bold;
  color: #303133;
  margin-bottom: 12px;
  font-size: 14px;
  border-bottom: 1px solid #e4e7ed;
  padding-bottom: 8px;
}

.stack-container {
  min-height: 200px;
}

.stack-frame {
  background: #f5f7fa;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 8px 12px;
  margin-bottom: 4px;
  font-size: 12px;
}

.stack-frame.active {
  background: #ecf5ff;
  border-color: #409eff;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.frame-name {
  font-weight: bold;
  color: #303133;
}

.frame-line {
  font-size: 11px;
  color: #909399;
}

.empty-stack {
  text-align: center;
  color: #909399;
  padding: 40px;
  font-size: 12px;
}

.event-loop {
  display: flex;
  flex-direction: column;
}

.loop-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.loop-arrow {
  width: 120px;
  height: 120px;
  margin-bottom: 12px;
}

.loop-arrow.rotating .loop-svg {
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.loop-circle {
  animation: dash 2s linear infinite;
}

@keyframes dash {
  0% {
    stroke-dashoffset: 200;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.loop-label {
  font-size: 16px;
  font-weight: bold;
  color: #409eff;
}

.loop-description {
  margin-top: 16px;
}

.step {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  margin-bottom: 4px;
  border-radius: 4px;
  transition: all 0.3s;
}

.step.active {
  background: #ecf5ff;
  border-left: 3px solid #409eff;
}

.step-num {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #dcdfe6;
  color: #606266;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: bold;
}

.step.active .step-num {
  background: #409eff;
  color: white;
}

.step-text {
  font-size: 12px;
  color: #606266;
}

.step.active .step-text {
  color: #303133;
  font-weight: 500;
}

.queue {
  margin-bottom: 16px;
}

.queue-title {
  font-size: 12px;
  font-weight: bold;
  color: #606266;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.queue-title::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.microtask-queue .queue-title::before {
  background: #f56c6c;
}

.macrotask-queue .queue-title::before {
  background: #e6a23c;
}

.queue-items {
  min-height: 60px;
  background: #f5f7fa;
  border-radius: 4px;
  padding: 8px;
}

.queue-item {
  background: white;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 8px 12px;
  margin-bottom: 4px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.queue-item.microtask {
  border-left: 3px solid #f56c6c;
}

.queue-item.macrotask {
  border-left: 3px solid #e6a23c;
}

.task-name {
  font-weight: 500;
  color: #303133;
}

.task-type {
  font-size: 11px;
  color: #909399;
}

.empty-queue {
  text-align: center;
  color: #909399;
  padding: 20px;
  font-size: 12px;
}

@media (max-width: 1024px) {
  .event-loop-container {
    grid-template-columns: 1fr;
  }
}
</style>
