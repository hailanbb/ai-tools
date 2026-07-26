<template>
  <div class="demo-container">
    <h4>{{ t('concurrentVsParallel.title') }}</h4>

    <div class="controls">
      <el-radio-group
        v-model="demoMode"
        size="small"
      >
        <el-radio-button label="concurrent">
          {{ t('concurrentVsParallel.singleCoreConcurrent') }}
        </el-radio-button>
        <el-radio-button label="parallel">
          {{ t('concurrentVsParallel.multiCoreParallel') }}
        </el-radio-button>
        <el-radio-button label="hybrid">
          {{ t('concurrentVsParallel.hybridMode') }}
        </el-radio-button>
      </el-radio-group>

      <el-button
        type="primary"
        size="small"
        :disabled="isRunning"
        @click="startDemo"
      >
        {{ isRunning ? t('common.running') : t('concurrentVsParallel.startDemo') }}
      </el-button>

      <el-button
        size="small"
        @click="reset"
      >
        {{ t('common.reset') }}
      </el-button>

      <el-slider
        v-if="demoMode === 'parallel' || demoMode === 'hybrid'"
        v-model="workerCount"
        :min="1"
        :max="8"
        :step="1"
        show-stops
        style="width: 150px;"
      />
    </div>

    <div class="demo-grid">
      <!-- CPU Cores -->
      <div class="section">
        <div class="section-title">
          {{ demoMode === 'concurrent' ? t('concurrentVsParallel.cpuCoreSingle') : t('concurrentVsParallel.cpuCoreMulti', { count: cpuCores.length }) }}
        </div>

        <div
          class="cpu-grid"
          :class="{ 'single-core': demoMode === 'concurrent' }"
        >
          <div
            v-for="(core, idx) in cpuCores"
            :key="idx"
            class="cpu-core"
            :class="{
              'active': core.active,
              'concurrent-mode': demoMode === 'concurrent',
              'parallel-mode': demoMode === 'parallel'
            }"
            :style="{ backgroundColor: core.active ? core.color : '#f5f7fa' }"
          >
            <div class="core-number">
              CPU {{ idx + 1 }}
            </div>
            <div
              v-if="core.task"
              class="core-task"
            >
              {{ core.task }}
            </div>
            <div class="core-status">
              {{ core.active ? t('common.runningState') : t('common.idleState') }}
            </div>
          </div>
        </div>
      </div>

      <!-- Task View -->
      <div class="section">
        <div class="section-title">
          {{ t('concurrentVsParallel.taskExecution') }}
        </div>

        <div class="task-timeline">
          <div
            v-for="task in demoTasks"
            :key="task.id"
            class="task-row"
          >
            <div class="task-info">
              <div class="task-name">
                {{ t('common.taskLabel') }} {{ task.id }}
              </div>
              <div class="task-duration">
                {{ task.duration }}ms
              </div>
            </div>

            <div class="task-track">
              <div
                v-for="(segment, sidx) in task.segments"
                :key="sidx"
                class="task-segment"
                :class="{ 'execution': segment.type === 'execution', 'waiting': segment.type === 'waiting' }"
                :style="{ left: segment.start + '%', width: segment.width + '%' }"
              >
                <span
                  v-if="segment.width > 5"
                  class="segment-text"
                >
                  {{ segment.type === 'execution' ? t('common.execution') : t('common.waiting') }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <div class="table-header">
        {{ t('concurrentVsParallel.comparisonTitle') }}
      </div>

      <div class="comparison-grid">
        <div class="comparison-item">
          <div class="item-icon">
            &#x1F504;
          </div>
          <div class="item-title">
            {{ t('concurrentVsParallel.concurrencyTitle') }}
          </div>
          <div class="item-desc">
            {{ t('concurrentVsParallel.concurrencyDesc') }}
          </div>
          <div class="item-examples">
            <strong>{{ t('concurrentVsParallel.examplesLabel') }}:</strong> {{ t('concurrentVsParallel.concurrencyExamples') }}
          </div>
        </div>

        <div class="comparison-item">
          <div class="item-icon">
            &#x26A1;
          </div>
          <div class="item-title">
            {{ t('concurrentVsParallel.parallelismTitle') }}
          </div>
          <div class="item-desc">
            {{ t('concurrentVsParallel.parallelismDesc') }}
          </div>
          <div class="item-examples">
            <strong>{{ t('concurrentVsParallel.examplesLabel') }}:</strong> {{ t('concurrentVsParallel.parallelismExamples') }}
          </div>
        </div>
      </div>

      <div class="need-table">
        <div class="need-title">
          {{ t('concurrentVsParallel.needConditions') }}
        </div>

        <div class="need-items">
          <div class="need-item">
            <span class="need-check">&#x2713;</span>
            <span class="need-text"><strong>{{ t('concurrentVsParallel.concurrencyNeed') }}</strong></span>
          </div>

          <div class="need-item">
            <span class="need-check need-multi">&#x2713;</span>
            <span class="need-text"><strong>{{ t('concurrentVsParallel.parallelismNeed') }}</strong></span>
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

const demoMode = ref('concurrent')
const isRunning = ref(false)
const workerCount = ref(4)

const cpuCores = ref([
  { active: false, color: '#409eff', task: null },
  { active: false, color: '#67c23a', task: null },
  { active: false, color: '#e6a23c', task: null },
  { active: false, color: '#f56c6c', task: null },
])

const demoTasks = ref([
  { id: 1, duration: 40, segments: [] },
  { id: 2, duration: 30, segments: [] },
  { id: 3, duration: 50, segments: [] },
  { id: 4, duration: 35, segments: [] },
])

function startDemo() {
  if (isRunning.value) return

  isRunning.value = true
  generateTaskTimeline()

  setTimeout(() => {
    isRunning.value = false
  }, 3000)
}

function generateTaskTimeline() {
  demoTasks.value.forEach((task, idx) => {
    const segments = []
    const mode = demoMode.value
    const colors = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c']

    if (mode === 'concurrent') {
      const baseStart = 5 + idx * 3
      segments.push({
        type: 'execution',
        start: baseStart,
        width: task.duration / 3,
        color: colors[idx % colors.length]
      })
      segments.push({
        type: 'waiting',
        start: baseStart + task.duration / 3,
        width: 20,
        color: '#dcdfe6'
      })
      segments.push({
        type: 'execution',
        start: baseStart + task.duration / 3 + 20,
        width: task.duration / 3,
        color: colors[idx % colors.length]
      })
    } else if (mode === 'parallel') {
      segments.push({
        type: 'execution',
        start: 5,
        width: task.duration,
        color: colors[idx % colors.length]
      })
    } else {
      if (idx < workerCount.value) {
        segments.push({
          type: 'execution',
          start: 5,
          width: task.duration,
          color: colors[idx % colors.length]
        })
      } else {
        const baseStart = 5 + (idx - workerCount.value) * 5
        segments.push({
          type: 'execution',
          start: baseStart,
          width: task.duration / 2,
          color: colors[idx % colors.length]
        })
      }
    }

    task.segments = segments
  })
}

function reset() {
  isRunning.value = false
  demoTasks.value.forEach(task => {
    task.segments = []
  })
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

.demo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
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
}

.cpu-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.cpu-grid.single-core {
  grid-template-columns: 1fr;
}

.cpu-core {
  background: #f5f7fa;
  border: 2px solid #e4e7ed;
  border-radius: 6px;
  padding: 16px;
  text-align: center;
  transition: all 0.3s;
}

.cpu-core.active {
  border-color: currentColor;
  box-shadow: 0 0 10px currentColor;
}

.cpu-core.concurrent-mode.active {
  animation: blink 0.5s infinite;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.core-number {
  font-size: 12px;
  color: #606266;
  margin-bottom: 4px;
}

.core-task {
  font-size: 14px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 4px;
}

.core-status {
  font-size: 11px;
  color: #909399;
}

.task-timeline {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task-row {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 8px;
  align-items: center;
}

.task-info {
  font-size: 11px;
}

.task-name {
  font-weight: bold;
  color: #303133;
}

.task-duration {
  color: #909399;
}

.task-track {
  position: relative;
  height: 20px;
  background: #f5f7fa;
  border-radius: 4px;
  overflow: hidden;
}

.task-segment {
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  color: white;
  font-weight: 500;
}

.task-segment.waiting {
  background: #dcdfe6 !important;
  color: #606266;
}

.comparison-table {
  background: white;
  border-radius: 6px;
  padding: 20px;
}

.table-header {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e4e7ed;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.comparison-item {
  background: #f5f7fa;
  border-radius: 6px;
  padding: 16px;
}

.item-icon {
  font-size: 32px;
  text-align: center;
  margin-bottom: 8px;
}

.item-title {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
  text-align: center;
  margin-bottom: 8px;
}

.item-desc {
  font-size: 13px;
  color: #606266;
  text-align: center;
  margin-bottom: 12px;
}

.item-examples {
  font-size: 12px;
  color: #909399;
  background: white;
  padding: 8px;
  border-radius: 4px;
}

.need-table {
  background: #f5f7fa;
  border-radius: 6px;
  padding: 16px;
}

.need-title {
  font-size: 14px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 12px;
  text-align: center;
}

.need-items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.need-item {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  padding: 12px;
  border-radius: 4px;
}

.need-check {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #67c23a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.need-check.need-multi {
  background: #409eff;
}

.need-text {
  font-size: 13px;
  color: #606266;
}

@media (max-width: 768px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }

  .comparison-grid {
    grid-template-columns: 1fr;
  }

  .need-items {
    grid-template-columns: 1fr;
  }

  .cpu-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
