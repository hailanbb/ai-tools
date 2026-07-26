<template>
  <div class="async-task-demo">
    <div class="header">
      <div class="title">{{ t('flow.title') }}</div>
      <div class="subtitle">{{ t('flow.subtitle') }}</div>
    </div>

    <div class="mode-tabs">
      <button
        :class="['tab', { active: mode === 'sync' }]"
        @click="mode = 'sync'; reset()"
      >{{ t('flow.tabs.sync') }}</button>
      <button
        :class="['tab', { active: mode === 'async' }]"
        @click="mode = 'async'; reset()"
      >{{ t('flow.tabs.async') }}</button>
    </div>

    <div class="flow-area">
      <div class="user-side">
        <div class="label">{{ t('flow.userRequest') }}</div>
        <button class="action-btn" :disabled="running" @click="startProcess">
          {{ running ? t('flow.processing') : t('flow.submitOrder') }}
        </button>
        <div :class="['response-box', { success: responseReady }]">
          <template v-if="!running && !responseReady">{{ t('flow.waitingSubmit') }}</template>
          <template v-else-if="running && mode === 'sync'">
            {{ t('flow.userWaiting', { elapsed }) }}
          </template>
          <template v-else-if="running && mode === 'async' && responseReady">
            {{ t('flow.returned', { time: asyncResponseTime }) }}
          </template>
          <template v-else-if="running && mode === 'async'">
            {{ t('flow.waitingResponse') }}
          </template>
          <template v-else>
            {{ t('flow.completed', { time: mode === 'sync' ? syncTime + 'ms' : asyncResponseTime + 'ms' }) }}
          </template>
        </div>
      </div>

      <div class="arrow">→</div>

      <div class="server-side">
        <div class="label">{{ t('flow.serverProcessing') }}</div>
        <div class="tasks">
          <div
            v-for="(task, i) in tasks"
            :key="i"
            :class="['task-item', taskStatuses[i] || 'pending']"
          >
            <span class="task-icon">{{ taskStatuses[i] === 'done' ? '✅' : taskStatuses[i] === 'running' ? '⏳' : '⬜' }}</span>
            <span>{{ task.name }}</span>
            <span class="task-time">{{ task.time }}ms</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!running && responseReady" class="summary">
      <template v-if="mode === 'sync'">
        <div class="summary-bad">{{ t('flow.syncSummary', { time: syncTime }) }}</div>
      </template>
      <template v-else>
        <div class="summary-good">{{ t('flow.asyncSummary', { time: asyncResponseTime }) }}</div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { asyncTaskQueuesLocale } from '../../../locales/async-task-queues/index.js'

const { t, messages } = useI18n(asyncTaskQueuesLocale)

const mode = ref('sync')
const running = ref(false)
const responseReady = ref(false)
const elapsed = ref(0)
const syncTime = ref(0)
const asyncResponseTime = ref(200)

const defaultTasks = computed(() => messages.value.flow.tasks)
const tasks = computed(() => defaultTasks.value.map(task => ({ ...task })))
const taskStatuses = ref([])

let timer = null

function reset() {
  running.value = false
  responseReady.value = false
  elapsed.value = 0
  syncTime.value = 0
  taskStatuses.value = defaultTasks.value.map(() => 'pending')
  if (timer) clearInterval(timer)
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, Math.min(ms, 1500)))
}

async function startProcess() {
  reset()
  running.value = true

  if (mode.value === 'sync') {
    timer = setInterval(() => { elapsed.value = (elapsed.value + 0.1).toFixed(1) }, 100)
    let total = 0
    for (const [index, task] of tasks.value.entries()) {
      taskStatuses.value[index] = 'running'
      await sleep(task.time)
      taskStatuses.value[index] = 'done'
      total += task.time
    }
    syncTime.value = total
    responseReady.value = true
    running.value = false
    clearInterval(timer)
  } else {
    taskStatuses.value[0] = 'running'
    await sleep(tasks.value[0].time)
    taskStatuses.value[0] = 'done'

    taskStatuses.value[1] = 'running'
    await sleep(tasks.value[1].time)
    taskStatuses.value[1] = 'done'

    responseReady.value = true

    for (let i = 2; i < tasks.value.length; i++) {
      taskStatuses.value[i] = 'running'
      await sleep(tasks.value[i].time)
      taskStatuses.value[i] = 'done'
    }
    running.value = false
  }
}
</script>

<style scoped>
.async-task-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.mode-tabs { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.tab {
  padding: 0.5rem 1rem; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 0.9rem;
}
.tab.active { border-color: var(--vp-c-brand); color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); }
.flow-area { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1rem; }
.arrow { font-size: 2rem; color: var(--vp-c-text-3); padding-top: 2rem; }
.user-side, .server-side { flex: 1; }
.label { font-weight: 600; margin-bottom: 0.5rem; font-size: 0.9rem; }
.action-btn {
  padding: 0.5rem 1.5rem; border-radius: 6px; border: none;
  background: var(--vp-c-brand); color: #fff; cursor: pointer; font-size: 0.9rem;
  margin-bottom: 0.75rem; width: 100%;
}
.action-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.response-box {
  padding: 0.75rem; border-radius: 8px; background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider); font-size: 0.85rem; text-align: center;
}
.response-box.success { border-color: #22c55e; background: rgba(34,197,94,0.05); }
.tasks { display: flex; flex-direction: column; gap: 0.5rem; }
.task-item {
  display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem;
  border-radius: 6px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
}
.task-item.running { border-color: #f59e0b; background: rgba(245,158,11,0.05); }
.task-item.done { border-color: #22c55e; background: rgba(34,197,94,0.05); }
.task-icon { font-size: 0.9rem; }
.task-time { margin-left: auto; color: var(--vp-c-text-3); font-family: var(--vp-font-family-mono); font-size: 0.8rem; }
.summary { margin-top: 0.75rem; padding: 0.75rem; border-radius: 8px; font-size: 0.9rem; }
.summary-bad { background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.3); border-radius: 8px; padding: 0.75rem; }
.summary-good { background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.3); border-radius: 8px; padding: 0.75rem; }
@media (max-width: 640px) {
  .flow-area { flex-direction: column; }
  .arrow { transform: rotate(90deg); align-self: center; padding: 0; }
}
</style>
