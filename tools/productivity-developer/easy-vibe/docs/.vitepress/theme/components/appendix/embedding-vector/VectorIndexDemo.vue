<template>
  <div class="index-demo">
    <div class="demo-header">
      <h4>{{ t('index.title') }}</h4>
      <p class="desc">{{ t('index.desc') }}</p>
    </div>

    <div class="controls">
      <button
        v-for="mode in modes"
        :key="mode.key"
        class="mode-btn"
        :class="{ active: activeMode === mode.key }"
        @click="switchMode(mode.key)"
      >
        {{ mode.label }}
      </button>
      <button class="search-btn" @click="runSearch">
        {{ searching ? t('index.searching') : t('index.startSearch') }}
      </button>
    </div>

    <div class="canvas-area">
      <svg viewBox="0 0 500 380" class="index-svg">
        <circle
          v-for="(p, i) in points"
          :key="'p' + i"
          :cx="p.x" :cy="p.y" r="5"
          :fill="pointColor(i)"
          :opacity="pointOpacity(i)"
          stroke="#fff"
          stroke-width="0.8"
          class="data-pt"
        />

        <template v-if="activeMode === 'ann'">
          <line
            v-for="(line, i) in partitionLines"
            :key="'line' + i"
            :x1="line.x1" :y1="line.y1"
            :x2="line.x2" :y2="line.y2"
            stroke="var(--vp-c-brand)"
            stroke-width="1"
            stroke-dasharray="4 3"
            opacity="0.3"
          />
        </template>

        <g>
          <circle
            :cx="query.x" :cy="query.y" r="9"
            fill="none" stroke="#ef4444" stroke-width="2.5"
          />
          <circle :cx="query.x" :cy="query.y" r="3" fill="#ef4444" />
          <text
            :x="query.x + 14" :y="query.y + 4"
            fill="#ef4444" font-size="12" font-weight="600"
          >{{ t('index.queryPoint') }}</text>
        </g>

        <line
          v-for="(idx, i) in visitedOrder"
          :key="'visit' + i"
          :x1="query.x" :y1="query.y"
          :x2="points[idx].x" :y2="points[idx].y"
          :stroke="resultIndices.includes(idx) ? '#10b981' : '#94a3b8'"
          :stroke-width="resultIndices.includes(idx) ? 2 : 0.8"
          :opacity="resultIndices.includes(idx) ? 0.8 : 0.25"
        />

        <circle
          v-for="idx in resultIndices"
          :key="'res' + idx"
          :cx="points[idx].x" :cy="points[idx].y" r="8"
          fill="none" stroke="#10b981" stroke-width="2.5"
        />
      </svg>
    </div>

    <div class="stats-row">
      <div
        v-for="stat in statItems"
        :key="stat.label"
        class="stat-card"
      >
        <div class="stat-label">{{ stat.label }}</div>
        <div class="stat-val" :class="stat.class">{{ stat.value }}</div>
      </div>
    </div>

    <div class="comparison-table">
      <table>
        <thead>
          <tr>
            <th
              v-for="header in headers"
              :key="header"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in rows"
            :key="row[0]"
            :class="{ 'row-active': activeMode === row[4] }"
          >
            <td>{{ row[0] }}</td>
            <td><code>{{ row[1] }}</code></td>
            <td>{{ row[2] }}</td>
            <td>{{ row[3] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { embeddingVectorLocale } from '../../../locales/embedding-vector/index.js'

const { t, messages } = useI18n(embeddingVectorLocale)
const activeMode = ref('brute')
const searching = ref(false)
const visitedOrder = ref([])
const resultIndices = ref([])
const modes = computed(() => messages.value.index.modes)
const headers = computed(() => messages.value.index.headers)
const rows = computed(() => messages.value.index.rows)

const query = reactive({ x: 250, y: 190 })

function generatePoints() {
  const pts = []
  const rng = (seed) => {
    let s = seed
    return () => { s = (s * 16807) % 2147483647; return s / 2147483647 }
  }
  const rand = rng(42)
  for (let i = 0; i < 60; i++) {
    pts.push({
      x: 40 + rand() * 420,
      y: 30 + rand() * 320
    })
  }
  return pts
}

const points = ref(generatePoints())
const statItems = computed(() => {
  const labels = messages.value.index.stats
  return [
    { label: labels[0], value: points.value.length },
    {
      label: labels[1],
      value: visitedOrder.value.length,
      class: { good: visitedOrder.value.length < points.value.length }
    },
    {
      label: labels[2],
      value: `${points.value.length > 0 ? ((visitedOrder.value.length / points.value.length) * 100).toFixed(0) : 0}%`,
      class: 'efficiency'
    },
    { label: labels[3], value: resultIndices.value.length }
  ]
})

const partitionLines = [
  { x1: 250, y1: 10, x2: 250, y2: 370 },
  { x1: 30, y1: 190, x2: 470, y2: 190 },
  { x1: 140, y1: 10, x2: 140, y2: 370 },
  { x1: 360, y1: 10, x2: 360, y2: 370 }
]

function dist(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
}

function switchMode(mode) {
  activeMode.value = mode
  visitedOrder.value = []
  resultIndices.value = []
}

function runSearch() {
  if (searching.value) return
  searching.value = true
  visitedOrder.value = []
  resultIndices.value = []

  const K = 3
  const allDists = points.value.map((p, i) => ({ i, d: dist(query, p) }))
  allDists.sort((a, b) => a.d - b.d)
  const trueTopK = allDists.slice(0, K).map((x) => x.i)

  if (activeMode.value === 'brute') {
    const order = allDists.map((x) => x.i)
    let step = 0
    const timer = setInterval(() => {
      if (step < order.length) {
        visitedOrder.value = order.slice(0, step + 1)
        step++
      } else {
        clearInterval(timer)
        resultIndices.value = trueTopK
        searching.value = false
      }
    }, 30)
  } else {
    const qPartX = query.x < 140 ? 0 : query.x < 250 ? 1 : query.x < 360 ? 2 : 3
    const qPartY = query.y < 190 ? 0 : 1
    const nearby = points.value
      .map((p, i) => {
        const pPartX = p.x < 140 ? 0 : p.x < 250 ? 1 : p.x < 360 ? 2 : 3
        const pPartY = p.y < 190 ? 0 : 1
        const samePart = Math.abs(pPartX - qPartX) <= 1 && pPartY === qPartY
        return { i, d: dist(query, p), samePart }
      })
      .filter((x) => x.samePart)
      .sort((a, b) => a.d - b.d)

    const order = nearby.map((x) => x.i)
    let step = 0
    const timer = setInterval(() => {
      if (step < order.length) {
        visitedOrder.value = order.slice(0, step + 1)
        step++
      } else {
        clearInterval(timer)
        resultIndices.value = nearby.slice(0, K).map((x) => x.i)
        searching.value = false
      }
    }, 50)
  }
}

function pointColor(i) {
  if (resultIndices.value.includes(i)) return '#10b981'
  if (visitedOrder.value.includes(i)) return '#3b82f6'
  return '#94a3b8'
}

function pointOpacity(i) {
  if (resultIndices.value.includes(i)) return 1
  if (visitedOrder.value.includes(i)) return 0.8
  return 0.4
}
</script>

<style scoped>
.index-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
}

.demo-header h4 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.desc {
  margin: 0 0 1rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}

.controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.mode-btn {
  padding: 6px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.mode-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
}

.search-btn {
  padding: 6px 16px;
  border: 1px solid #10b981;
  border-radius: 6px;
  background: #10b981;
  color: #fff;
  cursor: pointer;
  font-size: 0.85rem;
  margin-left: auto;
  transition: all 0.2s;
}

.search-btn:hover {
  background: #059669;
}

.canvas-area {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.index-svg {
  width: 100%;
  height: auto;
  display: block;
}

.data-pt {
  transition: fill 0.3s, opacity 0.3s;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.stat-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.6rem;
  text-align: center;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-bottom: 2px;
}

.stat-val {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
}

.stat-val.good {
  color: #10b981;
}

.stat-val.efficiency {
  color: var(--vp-c-brand);
}

.comparison-table {
  overflow-x: auto;
}

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.comparison-table th,
.comparison-table td {
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  text-align: left;
}

.comparison-table th {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.comparison-table td {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.row-active {
  background: var(--vp-c-brand-soft) !important;
}

.row-active td {
  background: var(--vp-c-brand-soft) !important;
  border-color: var(--vp-c-brand);
}

code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  background: var(--vp-c-bg);
  padding: 2px 4px;
  border-radius: 3px;
}

@media (max-width: 640px) {
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .index-demo {
    padding: 1rem;
  }
}
</style>
