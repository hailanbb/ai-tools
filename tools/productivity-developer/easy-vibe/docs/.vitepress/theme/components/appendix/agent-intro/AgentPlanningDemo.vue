<template>
  <div class="planning-demo">
    <div class="header">
      <div class="title">
        {{ t('planningDemo.title') }}
      </div>
    </div>

    <div class="task-tabs">
      <button
        v-for="task in tasks"
        :key="task.id"
        :class="['task-btn', { active: currentTask === task.id }]"
        @click="selectTask(task.id)"
      >
        <span>{{ task.icon }}</span>
        <span>{{ task.name }}</span>
        <span
          class="complexity"
          :class="task.complexity"
        >{{ task.complexityLabel }}</span>
      </button>
    </div>

    <div class="goal-bar">
      <span class="label">🎯</span>
      <span class="text">{{ currentTaskData.goal }}</span>
    </div>

    <div class="execution-area">
      <div class="steps-progress">
        <div
          v-for="(step, index) in currentTaskData.steps"
          :key="index"
          class="step-node"
          :class="{ completed: stepStatus[index] === 'completed', running: stepStatus[index] === 'running' }"
        >
          <div class="node-circle">
            {{ index + 1 }}
          </div>
          <div class="node-name">
            {{ step.name }}
          </div>
          <div
            v-if="index < currentTaskData.steps.length - 1"
            class="node-line"
          />
        </div>
      </div>

      <div class="info-row">
        <div class="log-box">
          <div class="box-header">
            <span>{{ t('planningDemo.logTitle') }}</span>
            <span
              v-if="executionStatus === 'running'"
              class="status running"
            >{{ t('planningDemo.running') }}</span>
            <span
              v-else-if="executionStatus === 'completed'"
              class="status completed"
            >{{ t('planningDemo.completed') }}</span>
          </div>
          <div class="log-content">
            <div
              v-if="logs.length === 0"
              class="empty"
            >
              {{ t('planningDemo.emptyLog') }}
            </div>
            <div
              v-for="(log, i) in logs.slice(-4)"
              :key="i"
              class="log-line"
              :class="log.type"
            >
              <span class="time">{{ log.time }}</span>
              <span class="icon">{{ log.icon }}</span>
              <span
                class="msg"
                v-html="log.message"
              />
            </div>
          </div>
        </div>

        <div
          v-if="currentThought"
          class="thought-box"
        >
          <div class="box-header">
            {{ t('planningDemo.thinking') }}
          </div>
          <div class="thought-content">
            {{ currentThought }}
          </div>
        </div>
      </div>
    </div>

    <div class="control-bar">
      <button
        v-if="executionStatus === 'idle'"
        class="ctrl-btn primary"
        @click="startExecution"
      >
        {{ t('planningDemo.start') }}
      </button>
      <button
        v-else-if="executionStatus === 'running'"
        class="ctrl-btn"
        disabled
      >
        {{ t('planningDemo.executing') }}
      </button>
      <button
        v-else
        class="ctrl-btn"
        @click="reset"
      >
        {{ t('planningDemo.reset') }}
      </button>

      <div
        v-if="executionStatus === 'completed'"
        class="stats"
      >
        <span class="stat">{{ t('planningDemo.stepsUnit', { count: currentTaskData.steps.length }) }}</span>
        <span class="stat">{{ executionTime }}s</span>
        <span class="stat">{{ t('planningDemo.callsUnit', { count: toolCalls }) }}</span>
      </div>

      <div class="step-dots">
        <span
          v-for="n in currentTaskData.steps.length"
          :key="n"
          :class="['dot', { active: stepStatus[n-1] === 'completed' }]"
        />
      </div>
    </div>

    <div class="tip-bar">
      <span>💡</span>
      <span>{{ t('planningDemo.tipPrefix') }}<strong>{{ t('planningDemo.atomic') }}</strong>{{ t('planningDemo.tipMiddle') }}<strong>{{ t('planningDemo.dynamic') }}</strong>{{ t('planningDemo.tipSuffix') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { agentIntroLocale } from '../../../locales/agent-intro/index.js'

const { t, messages } = useI18n(agentIntroLocale)
const tasks = computed(() => messages.value.planningDemo.tasks)

const currentTask = ref('simple')
const executionStatus = ref('idle')
const stepStatus = ref([])
const logs = ref([])
const currentThought = ref('')
const executionTime = ref(0)
const toolCalls = ref(0)

const currentTaskData = computed(() => tasks.value.find(task => task.id === currentTask.value))

const selectTask = (id) => {
  currentTask.value = id
  reset()
}

const reset = () => {
  executionStatus.value = 'idle'
  stepStatus.value = new Array(currentTaskData.value.steps.length).fill('pending')
  logs.value = []
  currentThought.value = ''
  executionTime.value = 0
  toolCalls.value = 0
}

const startExecution = async () => {
  executionStatus.value = 'running'
  stepStatus.value = new Array(currentTaskData.value.steps.length).fill('pending')
  logs.value = []
  toolCalls.value = 0

  const startTime = Date.now()
  const taskLogs = currentTaskData.value.logs

  for (let i = 0; i < taskLogs.length; i++) {
    const log = taskLogs[i]

    if (log.type === 'think') currentThought.value = log.message
    if (log.type === 'action') {
      const stepIndex = Math.min(toolCalls.value, currentTaskData.value.steps.length - 1)
      stepStatus.value = stepStatus.value.map((s, idx) => {
        if (idx < stepIndex) return 'completed'
        if (idx === stepIndex) return 'running'
        return 'pending'
      })
      toolCalls.value++
    }
    if (log.type === 'complete') currentThought.value = ''

    logs.value.push({ ...log, time: new Date().toLocaleTimeString(t('planningDemo.timeLocale'), { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) })
    await wait(700)
  }

  stepStatus.value = stepStatus.value.map(() => 'completed')
  executionTime.value = ((Date.now() - startTime) / 1000).toFixed(1)
  executionStatus.value = 'completed'
}

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
reset()
</script>

<style scoped>
.planning-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 16px;
}

.title {
  font-size: 17px;
  font-weight: 700;
  background: linear-gradient(120deg, var(--vp-c-brand), #9c27b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.task-tabs {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.task-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.task-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
}

.complexity {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  margin-left: 4px;
}

.complexity.easy { background: #dcfce7; color: #166534; }
.complexity.medium { background: #fef3c7; color: #92400e; }
.complexity.hard { background: #fee2e2; color: #991b1b; }

.goal-bar {
  background: var(--vp-c-brand-soft);
  border-left: 3px solid var(--vp-c-brand);
  border-radius: 6px;
  padding: 10px 14px;
  margin-bottom: 16px;
  font-size: 14px;
}

.goal-bar .label { margin-right: 8px; }
.goal-bar .text { font-weight: 600; }

.steps-progress {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 16px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.step-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-width: 100px;
}

.node-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 6px;
  transition: all 0.3s;
}

.step-node.running .node-circle {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  animation: pulse 1.5s infinite;
}

.step-node.completed .node-circle {
  border-color: #22c55e;
  background: #dcfce7;
  color: #166534;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.node-name {
  font-size: 11px;
  text-align: center;
  color: var(--vp-c-text-2);
}

.step-node.completed .node-name,
.step-node.running .node-name {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.node-line {
  position: absolute;
  top: 16px;
  right: -16px;
  width: 24px;
  height: 2px;
  background: var(--vp-c-divider);
}

.step-node.completed + .step-node .node-line {
  background: #22c55e;
}

.info-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}

@media (max-width: 600px) {
  .info-row { grid-template-columns: 1fr; }
}

.log-box, .thought-box {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 12px;
  font-weight: 600;
}

.status {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
}

.status.running { background: #fef3c7; color: #92400e; }
.status.completed { background: #dcfce7; color: #166534; }

.log-content {
  padding: 10px 12px;
  min-height: 100px;
  max-height: 140px;
  
}

.empty {
  color: var(--vp-c-text-3);
  text-align: center;
  padding: 30px 0;
  font-size: 12px;
}

.log-line {
  display: flex;
  gap: 8px;
  font-size: 12px;
  margin-bottom: 6px;
  align-items: flex-start;
}

.log-line .time {
  color: var(--vp-c-text-3);
  font-size: 10px;
  min-width: 55px;
}

.log-line .icon {
  font-size: 11px;
}

.log-line .msg {
  color: var(--vp-c-text-1);
  flex: 1;
}

.log-line.think .msg { color: #3b82f6; }
.log-line.action .msg { color: #f59e0b; }
.log-line.result .msg { color: #10b981; }
.log-line.complete .msg { color: #8b5cf6; font-weight: 600; }

.thought-content {
  padding: 12px;
  font-size: 13px;
  color: var(--vp-c-text-1);
  font-style: italic;
  line-height: 1.5;
}

.control-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.ctrl-btn {
  padding: 8px 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
}

.ctrl-btn.primary {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.stats {
  display: flex;
  gap: 12px;
}

.stat {
  padding: 4px 10px;
  background: var(--vp-c-bg);
  border-radius: 4px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.step-dots {
  display: flex;
  gap: 4px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vp-c-divider);
}

.dot.active { background: #22c55e; }

.tip-bar {
  display: flex;
  gap: 8px;
  padding: 10px 14px;
  background: var(--vp-c-brand-soft);
  border-radius: 6px;
  font-size: 12px;
  color: var(--vp-c-text-1);
}
</style>
