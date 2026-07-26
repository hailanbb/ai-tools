<template>
  <div class="demo-container">
    <h4>{{ t('processThreadCoroutine.title') }}</h4>

    <div class="controls">
      <el-radio-group
        v-model="model"
        size="small"
      >
        <el-radio-button label="process">
          {{ t('processThreadCoroutine.multiProcess') }}
        </el-radio-button>
        <el-radio-button label="thread">
          {{ t('processThreadCoroutine.multiThread') }}
        </el-radio-button>
        <el-radio-button label="coroutine">
          {{ t('processThreadCoroutine.coroutine') }}
        </el-radio-button>
      </el-radio-group>

      <el-button
        type="primary"
        size="small"
        :disabled="isRunning"
        @click="startSimulation"
      >
        {{ isRunning ? t('common.running') : t('processThreadCoroutine.startSimulation') }}
      </el-button>
    </div>

    <div class="stats-bar">
      <el-statistic
        :title="t('processThreadCoroutine.memoryUsage')"
        :value="memoryUsage"
        suffix="MB"
      />
      <el-statistic
        :title="t('processThreadCoroutine.contextSwitch')"
        :value="contextSwitches"
      />
      <el-statistic
        :title="t('processThreadCoroutine.completedTasks')"
        :value="completedTasks"
      />
      <el-statistic
        :title="t('processThreadCoroutine.elapsedTime')"
        :value="elapsedTime"
        suffix="ms"
      />
    </div>

    <div class="visualization">
      <div class="cpu-cores">
        <div
          v-for="(core, idx) in cpuCores"
          :key="idx"
          class="core"
          :class="{ active: core.active, type: core.type }"
        >
          <span class="core-label">CPU {{ idx + 1 }}</span>
          <div
            v-if="core.task"
            class="task-indicator"
          >
            {{ core.task }}
          </div>
        </div>
      </div>

      <div class="task-queue">
        <h5>{{ t('processThreadCoroutine.taskQueue') }}</h5>
        <div class="queue-items">
          <div
            v-for="(task, idx) in pendingTasks"
            :key="task.id"
            class="queue-item"
            :style="{ animationDelay: `${idx * 0.1}s` }"
          >
            Task {{ task.id }}
          </div>
        </div>
      </div>
    </div>

    <div class="explanation">
      <el-alert
        :title="t('processThreadCoroutine.explanationTitles.' + model)"
        :type="t('processThreadCoroutine.explanationTypes.' + model)"
        :description="t('processThreadCoroutine.explanationTexts.' + model)"
        show-icon
        :closable="false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { concurrencyModelsLocale } from '../../../locales/concurrency-models/index.js'

const { t } = useI18n(concurrencyModelsLocale)

const model = ref('process')
const isRunning = ref(false)
const memoryUsage = ref(0)
const contextSwitches = ref(0)
const completedTasks = ref(0)
const elapsedTime = ref(0)

const cpuCores = ref([
  { active: false, type: 'process', task: null },
  { active: false, type: 'process', task: null },
  { active: false, type: 'process', task: null },
  { active: false, type: 'process', task: null },
])

const pendingTasks = ref([])

watch(model, () => {
  resetSimulation()
})

function resetSimulation() {
  isRunning.value = false
  memoryUsage.value = model.value === 'process' ? 400 : model.value === 'thread' ? 100 : 20
  contextSwitches.value = 0
  completedTasks.value = 0
  elapsedTime.value = 0
  cpuCores.value.forEach(core => {
    core.active = false
    core.type = model.value
    core.task = null
  })
  pendingTasks.value = Array.from({ length: 16 }, (_, i) => ({ id: i + 1 }))
}

async function startSimulation() {
  if (isRunning.value) return
  isRunning.value = true

  const startTime = Date.now()
  const baseSwitchCost = model.value === 'process' ? 10 : model.value === 'thread' ? 2 : 1

  while (pendingTasks.value.length > 0 && isRunning.value) {
    for (let i = 0; i < cpuCores.value.length; i++) {
      if (!cpuCores.value[i].active && pendingTasks.value.length > 0) {
        const task = pendingTasks.value.shift()
        cpuCores.value[i].active = true
        cpuCores.value[i].task = task.id

        setTimeout(() => {
          if (isRunning.value) {
            cpuCores.value[i].active = false
            cpuCores.value[i].task = null
            completedTasks.value++
            contextSwitches.value += baseSwitchCost
          }
        }, 300 + Math.random() * 200)
      }
    }

    elapsedTime.value = Date.now() - startTime
    await new Promise(resolve => setTimeout(resolve, 50))
  }

  isRunning.value = false
}

resetSimulation()
</script>

<style scoped>
.demo-container {
  padding: 20px;
  background: #f5f7fa;
  border-radius: 6px;
  margin: 20px 0;
}

.controls {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.stats-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.visualization {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.cpu-cores {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.core {
  background: white;
  border: 2px solid #dcdfe6;
  border-radius: 6px;
  padding: 16px;
  text-align: center;
  transition: all 0.3s;
}

.core.active {
  border-color: #409eff;
  background: #ecf5ff;
}

.core.active.process {
  border-color: #67c23a;
  background: #f0f9eb;
}

.core.active.thread {
  border-color: #e6a23c;
  background: #fdf6ec;
}

.core.active.coroutine {
  border-color: #909399;
  background: #f4f4f5;
}

.core-label {
  font-size: 12px;
  color: #606266;
  display: block;
  margin-bottom: 8px;
}

.task-indicator {
  font-size: 14px;
  font-weight: bold;
  color: #409eff;
}

.task-queue {
  background: white;
  border-radius: 6px;
  padding: 16px;
}

.task-queue h5 {
  margin: 0 0 12px 0;
  color: #303133;
}

.queue-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.queue-item {
  background: #409eff;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.explanation {
  margin-top: 20px;
}

@media (max-width: 768px) {
  .stats-bar {
    grid-template-columns: repeat(2, 1fr);
  }

  .visualization {
    grid-template-columns: 1fr;
  }

  .cpu-cores {
    grid-template-columns: 1fr;
  }
}
</style>
