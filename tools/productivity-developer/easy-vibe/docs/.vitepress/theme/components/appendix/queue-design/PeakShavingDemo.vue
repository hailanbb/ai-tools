<template>
  <div class="peak-shaving-demo">
    <div class="header">
      <div class="title">
        {{ t('peakShaving.title') }}
      </div>
      <div class="subtitle">
        {{ t('peakShaving.subtitle') }}
      </div>
    </div>

    <div class="main-layout">
      <div class="controls-panel">
        <div class="control-group">
          <div class="label-row">
            <span class="label">{{ t('peakShaving.processRate') }}</span>
            <span class="value">{{ processRate }} req/s</span>
          </div>
          <input
            v-model="processRate"
            type="range"
            min="50"
            max="1000"
            step="50"
            class="range-input process-range"
          >
          <div class="desc">
            {{ t('peakShaving.processRateDesc') }}
          </div>
        </div>

        <div class="control-group">
          <div class="label-row">
            <span class="label">{{ t('peakShaving.queueCapacity') }}</span>
            <span class="value">{{ queueCapacity }}</span>
          </div>
          <input
            v-model="queueCapacity"
            type="range"
            min="500"
            max="10000"
            step="500"
            class="range-input queue-range"
          >
          <div class="desc">
            {{ t('peakShaving.queueCapacityDesc') }}
          </div>
        </div>

        <div class="actions">
          <button
            class="action-btn burst-btn"
            :disabled="isBursting"
            @click="triggerBurst"
          >
            {{ t('peakShaving.burst') }}
          </button>
          <button
            class="action-btn reset-btn"
            @click="reset"
          >
            {{ t('peakShaving.reset') }}
          </button>
        </div>
      </div>

      <div class="monitor-panel">
        <div class="metrics-grid">
          <div class="metric-item">
            <div class="m-label">
              {{ t('peakShaving.inboundRate') }}
            </div>
            <div class="m-value blue">
              {{ currentRequestRate }} <span class="unit">req/s</span>
            </div>
          </div>
          <div class="metric-item">
            <div class="m-label">
              {{ t('peakShaving.queueBacklog') }}
            </div>
            <div class="m-value orange">
              {{ queueLength }} <span class="unit">msgs</span>
            </div>
            <div class="m-bar-bg">
              <div
                class="m-bar-fill"
                :style="{ width: queuePercent + '%', background: queueColor }"
              />
            </div>
          </div>
          <div class="metric-item">
            <div class="m-label">
              {{ t('peakShaving.processRateActual') }}
            </div>
            <div class="m-value green">
              {{ currentProcessRate }} <span class="unit">req/s</span>
            </div>
          </div>
          <div class="metric-item">
            <div class="m-label">
              {{ t('peakShaving.rejected') }}
            </div>
            <div class="m-value red">
              {{ rejectedCount }} <span class="unit">req</span>
            </div>
          </div>
        </div>

        <div class="chart-container">
          <canvas
            ref="chartCanvas"
            width="600"
            height="200"
          />
          <div class="chart-legend">
            <span class="legend-item"><span class="dot blue" />{{ t('peakShaving.legendInbound') }}</span>
            <span class="legend-item"><span class="dot green" />{{ t('peakShaving.legendProcess') }}</span>
            <span class="legend-item"><span class="dot orange" />{{ t('peakShaving.legendQueue') }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="scenario-tips">
      <div class="tip-icon">
        💡
      </div>
      <div class="tip-content">
        <strong>{{ t('peakShaving.principleTitle') }}</strong>
        {{ t('peakShaving.principlePrefix') }}<strong>{{ t('peakShaving.inbound') }}</strong>{{ t('peakShaving.blue') }}{{ t('peakShaving.exceeds') }}<strong>{{ t('peakShaving.capacity') }}</strong>{{ t('peakShaving.greenLine') }}{{ t('peakShaving.principleMiddle') }}<strong>{{ t('peakShaving.queue') }}</strong>{{ t('peakShaving.orangeArea') }}
        <br>
        {{ t('peakShaving.principleEnd') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { queueDesignLocale } from '../../../locales/queue-design/index.js'

const { t } = useI18n(queueDesignLocale)

const processRate = ref(200)
const queueCapacity = ref(2000)
const queueLength = ref(0)
const rejectedCount = ref(0)

const currentRequestRate = ref(100)
const currentProcessRate = ref(0)
const isBursting = ref(false)

const chartCanvas = ref(null)
let ctx = null
let animationFrameId = null
const historyLength = 300
const dataHistory = [] // { input, process, queue }

let lastTime = Date.now()
const updateLoop = () => {
  const now = Date.now()
  const dt = (now - lastTime) / 1000
  lastTime = now

  let targetInput = isBursting.value ? 2000 : 100 + Math.random() * 50

  const smoothing = 0.1
  currentRequestRate.value = Math.round(
    currentRequestRate.value * (1 - smoothing) + targetInput * smoothing
  )

  const newRequests = Math.round(currentRequestRate.value * dt * 10)

  const availableSpace = queueCapacity.value - queueLength.value
  const accepted = Math.min(newRequests, availableSpace)
  const rejected = newRequests - accepted

  queueLength.value += accepted
  rejectedCount.value += rejected

  const maxProcessable = Math.round(processRate.value * dt * 10)
  const processed = Math.min(queueLength.value, maxProcessable)

  queueLength.value -= processed

  currentProcessRate.value = Math.round(processed / (dt * 10))

  dataHistory.push({
    input: currentRequestRate.value,
    process: currentProcessRate.value,
    queue: queueLength.value,
    maxQueue: queueCapacity.value
  })

  if (dataHistory.length > historyLength) {
    dataHistory.shift()
  }

  drawChart()
  animationFrameId = requestAnimationFrame(updateLoop)
}

const drawChart = () => {
  if (!ctx || !chartCanvas.value) return

  const canvas = chartCanvas.value
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()

  if (
    canvas.width !== rect.width * dpr ||
    canvas.height !== rect.height * dpr
  ) {
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
  }

  const width = rect.width
  const height = rect.height

  ctx.clearRect(0, 0, width, height)
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.scale(dpr, dpr)

  ctx.strokeStyle = '#eee'
  ctx.lineWidth = 1
  ctx.beginPath()
  for (let i = 0; i < 5; i++) {
    const y = height - (height / 4) * i
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
  }
  ctx.stroke()

  if (dataHistory.length < 2) return

  const maxVal = Math.max(
    2000,
    ...dataHistory.map((d) => Math.max(d.input, d.queue))
  )
  const yScale = (val) => height - (val / maxVal) * height * 0.9
  const xScale = (index) => (index / (historyLength - 1)) * width

  ctx.fillStyle = 'rgba(249, 115, 22, 0.2)'
  ctx.beginPath()
  ctx.moveTo(0, height)
  dataHistory.forEach((d, i) => {
    ctx.lineTo(xScale(i), yScale(d.queue))
  })
  ctx.lineTo(width, height)
  ctx.fill()

  ctx.strokeStyle = '#f97316'
  ctx.lineWidth = 2
  ctx.beginPath()
  dataHistory.forEach((d, i) => {
    if (i === 0) ctx.moveTo(xScale(i), yScale(d.queue))
    else ctx.lineTo(xScale(i), yScale(d.queue))
  })
  ctx.stroke()

  ctx.strokeStyle = '#3b82f6'
  ctx.lineWidth = 2
  ctx.beginPath()
  dataHistory.forEach((d, i) => {
    if (i === 0) ctx.moveTo(xScale(i), yScale(d.input))
    else ctx.lineTo(xScale(i), yScale(d.input))
  })
  ctx.stroke()

  ctx.strokeStyle = '#22c55e'
  ctx.lineWidth = 2
  ctx.beginPath()
  dataHistory.forEach((d, i) => {
    if (i === 0) ctx.moveTo(xScale(i), yScale(d.process))
    else ctx.lineTo(xScale(i), yScale(d.process))
  })
  ctx.stroke()
}

const triggerBurst = () => {
  if (isBursting.value) return
  isBursting.value = true

  setTimeout(() => {
    isBursting.value = false
  }, 3000)
}

const reset = () => {
  queueLength.value = 0
  rejectedCount.value = 0
  dataHistory.length = 0
  currentRequestRate.value = 100
  isBursting.value = false
}

const queuePercent = computed(() => {
  return Math.min(100, (queueLength.value / queueCapacity.value) * 100)
})

const queueColor = computed(() => {
  if (queuePercent.value > 80) return '#ef4444'
  if (queuePercent.value > 50) return '#f97316'
  return '#22c55e'
})

onMounted(() => {
  if (chartCanvas.value) {
    ctx = chartCanvas.value.getContext('2d')
  }

  lastTime = Date.now()
  animationFrameId = requestAnimationFrame(updateLoop)
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<style scoped>
.peak-shaving-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 24px;
}
.title {
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.subtitle {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

.main-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 24px;
}

@media (max-width: 768px) {
  .main-layout {
    grid-template-columns: 1fr;
  }
}

.controls-panel {
  background: var(--vp-c-bg);
  padding: 16px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  font-size: 14px;
  font-weight: 500;
}

.value {
  font-size: 13px;
  font-family: monospace;
  background: var(--vp-c-bg-alt);
  padding: 2px 6px;
  border-radius: 4px;
}

.desc {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.range-input {
  width: 100%;
  accent-color: var(--vp-c-brand);
}

.actions {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-btn {
  padding: 10px;
  border-radius: 6px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.burst-btn {
  background: var(--vp-c-brand);
  color: white;
}
.burst-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-dark);
}
.burst-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.reset-btn {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}
.reset-btn:hover {
  background: var(--vp-c-bg-mute);
}

.monitor-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.metric-item {
  background: var(--vp-c-bg);
  padding: 12px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.m-label {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}

.m-value {
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.unit {
  font-size: 12px;
  font-weight: 400;
  opacity: 0.7;
}

.m-value.blue {
  color: #3b82f6;
}
.m-value.green {
  color: #22c55e;
}
.m-value.orange {
  color: #f97316;
}
.m-value.red {
  color: #ef4444;
}

.m-bar-bg {
  height: 4px;
  background: var(--vp-c-bg-soft);
  border-radius: 2px;
  margin-top: 8px;
  overflow: hidden;
}

.m-bar-fill {
  height: 100%;
  transition: width 0.2s;
}

.chart-container {
  flex: 1;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  min-height: 250px;
}

canvas {
  width: 100%;
  height: 100%;
  flex: 1;
}

.chart-legend {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 8px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.dot.blue {
  background: #3b82f6;
}
.dot.green {
  background: #22c55e;
}
.dot.orange {
  background: #f97316;
}

.scenario-tips {
  margin-top: 16px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 6px;
  padding: 12px;
  display: flex;
  gap: 12px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}
</style>
