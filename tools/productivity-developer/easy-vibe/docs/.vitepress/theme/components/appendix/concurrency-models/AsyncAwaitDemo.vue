<template>
  <div class="demo-container">
    <h4>{{ t('asyncAwait.title') }}</h4>

    <div class="controls">
      <el-button
        type="primary"
        size="small"
        :disabled="isRunning"
        @click="runExample"
      >
        {{ isRunning ? t('common.running') : t('asyncAwait.runExample') }}
      </el-button>
      <el-button
        size="small"
        @click="reset"
      >
        {{ t('common.reset') }}
      </el-button>
      <el-checkbox
        v-model="showDetails"
        size="small"
      >
        {{ t('asyncAwait.showDetails') }}
      </el-checkbox>
    </div>

    <div class="code-section">
      <div class="code-block">
        <div class="code-header">
          <span class="code-title">{{ t('asyncAwait.codeTitle') }}</span>
        </div>
        <pre class="code-content"><code><span class="keyword">import</span> asyncio

<span class="keyword">async def</span> <span class="function">fetch_data</span>(url):
    <span class="comment">{{ t('asyncAwait.commentSuspend') }}</span>
    response = <span class="keyword">await</span> aiohttp.get(url)
    <span class="comment">{{ t('asyncAwait.commentResume') }}</span>
    <span class="keyword">return</span> response.json()

<span class="keyword">async def</span> <span class="function">main</span>():
    <span class="comment">{{ t('asyncAwait.commentConcurrent') }}</span>
    tasks = [fetch_data(url) <span class="keyword">for</span> url <span class="keyword">in</span> urls]
    results = <span class="keyword">await</span> asyncio.gather(*tasks)</code></pre>
      </div>
    </div>

    <div class="visualization">
      <div class="timeline-container">
        <h5>{{ t('asyncAwait.executionTimeline') }}</h5>
        <div class="timeline">
          <div class="time-axis">
            <div class="axis-label">
              0ms
            </div>
            <div class="axis-label">
              50ms
            </div>
            <div class="axis-label">
              100ms
            </div>
            <div class="axis-label">
              150ms
            </div>
            <div class="axis-label">
              200ms
            </div>
          </div>

          <div class="thread-rows">
            <div class="thread-row">
              <div class="row-label">
                {{ t('asyncAwait.eventLoop') }}
              </div>
              <div class="row-track">
                <div
                  class="execution-segment event-loop"
                  style="width: 100%;"
                >
                  {{ t('asyncAwait.scheduling') }}
                </div>
              </div>
            </div>

            <div
              v-for="task in tasks"
              :key="task.id"
              class="thread-row"
            >
              <div class="row-label">
                {{ t('common.taskLabel') }} {{ task.id }}
              </div>
              <div class="row-track">
                <template
                  v-for="(segment, sidx) in task.segments"
                  :key="sidx"
                >
                  <div
                    class="execution-segment"
                    :class="{ 'active': segment.type === 'active', 'io': segment.type === 'io' }"
                    :style="{ left: segment.start + '%', width: segment.width + '%', backgroundColor: segment.color }"
                  >
                    <span
                      v-if="segment.width > 8"
                      class="segment-label"
                    >
                      {{ segment.type === 'active' ? t('common.execution') : t('asyncAwait.io') }}
                    </span>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-title">
            {{ t('asyncAwait.concurrentTaskCount') }}
          </div>
          <div class="stat-value">
            {{ tasks.length }}
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-title">
            {{ t('asyncAwait.totalExecutionTime') }}
          </div>
          <div class="stat-value">
            {{ totalTime }}ms
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-title">
            {{ t('asyncAwait.ioWaitTime') }}
          </div>
          <div class="stat-value">
            {{ ioWaitTime }}ms
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-title">
            {{ t('asyncAwait.cpuUtilization') }}
          </div>
          <div class="stat-value">
            {{ cpuUtilization }}%
          </div>
        </div>
      </div>
    </div>

    <div class="explanation">
      <el-alert
        :title="t('asyncAwait.alertTitle')"
        type="success"
        :description="t('asyncAwait.alertDescription')"
        show-icon
        :closable="false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { concurrencyModelsLocale } from '../../../locales/concurrency-models/index.js'

const { t } = useI18n(concurrencyModelsLocale)

const coroutineCount = ref(1000)
const isRunning = ref(false)
const showDetails = ref(false)

const tasks = ref([])

const colors = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399']

const totalTime = computed(() => {
  if (tasks.value.length === 0) return 0
  return Math.round(50 + tasks.value.length * 10)
})

const ioWaitTime = computed(() => {
  return Math.round(totalTime.value * 0.6)
})

const cpuUtilization = computed(() => {
  return Math.round(100 - (ioWaitTime.value / totalTime.value) * 100)
})

function generateTasks() {
  const count = Math.min(Math.floor(coroutineCount.value / 200), 5)
  const newTasks = []

  for (let i = 0; i < count; i++) {
    const segments = []
    let currentPos = 5

    for (let j = 0; j < 3; j++) {
      const execWidth = 10 + Math.random() * 10
      segments.push({
        type: 'active',
        start: currentPos,
        width: execWidth,
        color: colors[i % colors.length]
      })
      currentPos += execWidth

      const ioWidth = 15 + Math.random() * 10
      segments.push({
        type: 'io',
        start: currentPos,
        width: ioWidth,
        color: '#dcdfe6'
      })
      currentPos += ioWidth
    }

    newTasks.push({
      id: i + 1,
      segments,
      state: 'ready'
    })
  }

  tasks.value = newTasks
}

function runExample() {
  isRunning.value = true
  generateTasks()

  setTimeout(() => {
    isRunning.value = false
  }, 2000)
}

function reset() {
  tasks.value = []
  isRunning.value = false
  coroutineCount.value = 1000
}

watch(coroutineCount, () => {
  if (tasks.value.length > 0) {
    generateTasks()
  }
})

generateTasks()
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
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.slider-label {
  font-size: 14px;
  color: #606266;
  min-width: 100px;
}

.code-section {
  margin-bottom: 20px;
}

.code-block {
  background: #282c34;
  border-radius: 6px;
  overflow: hidden;
}

.code-header {
  background: #21252b;
  padding: 8px 16px;
  border-bottom: 1px solid #181a1f;
}

.code-title {
  color: #abb2bf;
  font-size: 13px;
  font-weight: 500;
}

.code-content {
  padding: 16px;
  margin: 0;
  overflow-x: auto;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.6;
}

.keyword {
  color: #c678dd;
}

.function {
  color: #61afef;
}

.comment {
  color: #5c6370;
  font-style: italic;
}

.visualization {
  margin-bottom: 20px;
}

.timeline-container {
  background: white;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 16px;
}

.timeline-container h5 {
  margin: 0 0 12px 0;
  color: #303133;
}

.timeline {
  position: relative;
}

.time-axis {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #e4e7ed;
  margin-bottom: 8px;
}

.axis-label {
  font-size: 11px;
  color: #909399;
}

.thread-rows {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.thread-row {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 8px;
  align-items: center;
}

.row-label {
  font-size: 12px;
  color: #606266;
  text-align: right;
}

.row-track {
  position: relative;
  height: 24px;
  background: #f5f7fa;
  border-radius: 4px;
  overflow: hidden;
}

.execution-segment {
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: white;
  font-weight: 500;
}

.execution-segment.io {
  background: #dcdfe6 !important;
  color: #606266;
}

.execution-segment.event-loop {
  background: #409eff;
}

.current-indicator {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #f56c6c;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.stat-card {
  background: white;
  border-radius: 6px;
  padding: 12px;
  text-align: center;
}

.stat-title {
  font-size: 12px;
  color: #909399;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 20px;
  font-weight: bold;
  color: #303133;
}

.explanation {
  margin-top: 16px;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .controls {
    flex-direction: column;
    align-items: stretch;
  }

  .thread-row {
    grid-template-columns: 60px 1fr;
  }
}
</style>
