<template>
  <div class="demo-container">
    <h4>{{ t('processIsolation.title') }}</h4>

    <div class="controls">
      <el-button
        type="primary"
        size="small"
        :disabled="processes.length >= 4"
        @click="addProcess"
      >
        {{ t('processIsolation.createProcess') }}
      </el-button>
      <el-button
        type="danger"
        size="small"
        :disabled="processes.length === 0"
        @click="killProcess"
      >
        {{ t('processIsolation.killProcess') }}
      </el-button>
      <el-button
        size="small"
        @click="simulateCrash"
      >
        {{ t('processIsolation.simulateCrash') }}
      </el-button>
      <el-button
        size="small"
        @click="reset"
      >
        {{ t('common.reset') }}
      </el-button>
    </div>

    <div class="memory-view">
      <div class="memory-label">
        {{ t('processIsolation.systemMemory') }}
      </div>
      <div class="memory-blocks">
        <div
          v-for="process in processes"
          :key="process.id"
          class="process-block"
          :class="{ crashed: process.crashed, active: process.active }"
          :style="{ width: process.size + '%', backgroundColor: process.color }"
        >
          <div class="process-header">
            <span class="process-name">{{ t('processIsolation.processLabel', { id: process.id }) }}</span>
            <span class="process-pid">PID: {{ process.pid }}</span>
          </div>
          <div class="process-memory">
            <div class="memory-section code">
              <span class="section-label">{{ t('processIsolation.codeSegment') }}</span>
              <span class="section-size">{{ process.codeSize }}MB</span>
            </div>
            <div class="memory-section data">
              <span class="section-label">{{ t('processIsolation.dataSegment') }}</span>
              <span class="section-size">{{ process.dataSize }}MB</span>
            </div>
            <div class="memory-section heap">
              <span class="section-label">{{ t('processIsolation.heapSegment') }}</span>
              <span class="section-size">{{ process.heapSize }}MB</span>
            </div>
            <div class="memory-section stack">
              <span class="section-label">{{ t('processIsolation.stackSegment') }}</span>
              <span class="section-size">{{ process.stackSize }}MB</span>
            </div>
          </div>
          <div
            v-if="process.crashed"
            class="crash-overlay"
          >
            <span class="crash-text">{{ t('processIsolation.crashed') }}</span>
            <span class="crash-info">{{ t('processIsolation.crashNotAffectOthers') }}</span>
          </div>
        </div>
      </div>

      <div
        v-if="showSharedMemory"
        class="shared-memory"
      >
        <div class="shared-label">
          {{ t('processIsolation.sharedMemory') }}
        </div>
        <div class="shared-content">
          <div
            v-for="process in processes"
            :key="process.id"
            class="shared-access"
          >
            <span
              class="access-indicator"
              :style="{ backgroundColor: process.color }"
            />
            <span>{{ t('processIsolation.processCanAccess', { id: process.id }) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-panel">
      <el-alert
        :title="infoTitle"
        :type="infoType"
        :description="infoDescription"
        show-icon
        :closable="false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { concurrencyModelsLocale } from '../../../locales/concurrency-models/index.js'

const { t } = useI18n(concurrencyModelsLocale)

const processes = ref([])
const showSharedMemory = ref(false)
const colors = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c']
let pidCounter = 1000

const infoTitle = computed(() => {
  if (processes.value.length === 0) return t('processIsolation.infoTitles.empty')
  const crashed = processes.value.filter(p => p.crashed).length
  if (crashed > 0) return t('processIsolation.infoTitles.crashed')
  return t('processIsolation.infoTitles.running')
})

const infoType = computed(() => {
  if (processes.value.length === 0) return 'info'
  const crashed = processes.value.filter(p => p.crashed).length
  if (crashed > 0) return 'success'
  return 'info'
})

const infoDescription = computed(() => {
  if (processes.value.length === 0) {
    return t('processIsolation.infoDescriptions.empty')
  }
  const crashed = processes.value.filter(p => p.crashed).length
  if (crashed > 0) {
    return t('processIsolation.infoDescriptions.crashed')
  }
  return t('processIsolation.infoDescriptions.running', { count: processes.value.length })
})

function addProcess() {
  if (processes.value.length >= 4) return
  const id = processes.value.length + 1
  processes.value.push({
    id,
    pid: ++pidCounter,
    color: colors[id - 1],
    crashed: false,
    active: true,
    size: 25,
    codeSize: Math.floor(Math.random() * 10) + 5,
    dataSize: Math.floor(Math.random() * 20) + 10,
    heapSize: Math.floor(Math.random() * 50) + 20,
    stackSize: Math.floor(Math.random() * 8) + 1
  })
}

function killProcess() {
  if (processes.value.length === 0) return
  processes.value.pop()
}

function simulateCrash() {
  if (processes.value.length === 0) return

  const candidates = processes.value.filter(p => !p.crashed)
  if (candidates.length > 0) {
    const victim = candidates[Math.floor(Math.random() * candidates.length)]
    victim.crashed = true
    victim.active = false
  }
}

function reset() {
  processes.value = []
  showSharedMemory.value = false
  pidCounter = 1000
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
}

.memory-view {
  background: white;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 16px;
}

.memory-label {
  font-weight: bold;
  color: #303133;
  margin-bottom: 12px;
}

.memory-blocks {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.process-block {
  border-radius: 6px;
  padding: 12px;
  color: white;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.process-block.crashed {
  opacity: 0.5;
}

.process-block.active {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.process-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
}

.process-name {
  font-weight: bold;
}

.process-pid {
  opacity: 0.8;
  font-size: 12px;
}

.process-memory {
  display: flex;
  gap: 8px;
  font-size: 11px;
}

.memory-section {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-label {
  opacity: 0.7;
  font-size: 10px;
}

.section-size {
  font-weight: bold;
}

.crash-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.crash-text {
  font-size: 24px;
  margin-bottom: 8px;
}

.crash-info {
  font-size: 12px;
  opacity: 0.8;
}

.shared-memory {
  margin-top: 16px;
  padding: 12px;
  background: #f4f4f5;
  border-radius: 6px;
  border: 2px dashed #c0c4cc;
}

.shared-label {
  font-weight: bold;
  color: #606266;
  margin-bottom: 8px;
}

.shared-content {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.shared-access {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #606266;
}

.access-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.info-panel {
  margin-top: 16px;
}

@media (max-width: 768px) {
  .process-memory {
    flex-wrap: wrap;
  }

  .cpu-cores {
    grid-template-columns: 1fr;
  }
}
</style>
