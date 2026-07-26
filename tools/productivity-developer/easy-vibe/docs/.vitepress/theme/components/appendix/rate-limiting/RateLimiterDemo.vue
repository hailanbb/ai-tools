<template>
  <div class="rate-limiter-demo">
    <div class="header">
      <div class="title">{{ t('visualizer.title') }}</div>
      <div class="subtitle">{{ t('visualizer.subtitle') }}</div>
    </div>

    <div class="algo-tabs">
      <button
        v-for="a in algorithms"
        :key="a.key"
        :class="['tab', { active: algo === a.key }]"
        @click="algo = a.key; reset()"
      >{{ a.label }}</button>
    </div>

    <div class="sim-area">
      <div class="controls">
        <button class="send-btn" @click="sendRequest">{{ t('visualizer.buttons.send') }}</button>
        <button class="burst-btn" @click="sendBurst">{{ t('visualizer.buttons.burst') }}</button>
        <button class="reset-btn" @click="reset">{{ t('visualizer.buttons.reset') }}</button>
      </div>

      <div class="stats">
        <div class="stat">
          <span class="stat-label">{{ t('visualizer.stats.totalSent') }}</span>
          <span class="stat-value">{{ totalSent }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">{{ t('visualizer.stats.passed') }}</span>
          <span class="stat-value pass">{{ passed }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">{{ t('visualizer.stats.rejected') }}</span>
          <span class="stat-value reject">{{ rejected }}</span>
        </div>
        <div v-if="algo === 'token'" class="stat">
          <span class="stat-label">{{ t('visualizer.stats.tokens') }}</span>
          <span class="stat-value">{{ tokens }}</span>
        </div>
      </div>

      <div class="request-log">
        <div
          v-for="(req, i) in recentRequests"
          :key="i"
          :class="['req-item', req.status]"
        >
          <span>{{ req.status === 'pass' ? '✅' : '❌' }}</span>
          <span>{{ t('visualizer.requestLabel', { id: req.id }) }}</span>
          <span class="req-time">{{ req.time }}</span>
        </div>
      </div>
    </div>

    <div class="algo-info">
      <div class="info-name">{{ currentAlgo.label }}</div>
      <div class="info-desc">{{ currentAlgo.desc }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { rateLimitingLocale } from '../../../locales/rate-limiting/index.js'

const { t, messages } = useI18n(rateLimitingLocale)

const algo = ref('token')
const totalSent = ref(0)
const passed = ref(0)
const rejected = ref(0)
const tokens = ref(5)
const recentRequests = ref([])

const algorithms = computed(() => messages.value.algorithms)
const currentAlgo = computed(() => algorithms.value.find(a => a.key === algo.value))

// Sliding window state
const windowRequests = ref([])
const WINDOW_SIZE = 3000 // 3s window
const WINDOW_LIMIT = 5

// Token bucket refill
let tokenInterval = null

function startTokenRefill() {
  if (tokenInterval) clearInterval(tokenInterval)
  tokenInterval = setInterval(() => {
    if (tokens.value < 5) tokens.value++
  }, 1000)
}

function reset() {
  totalSent.value = 0
  passed.value = 0
  rejected.value = 0
  tokens.value = 5
  recentRequests.value = []
  windowRequests.value = []
  if (tokenInterval) clearInterval(tokenInterval)
  if (algo.value === 'token') startTokenRefill()
}

onMounted(() => {
  startTokenRefill()
})

onUnmounted(() => {
  if (tokenInterval) clearInterval(tokenInterval)
})

function checkLimit() {
  if (algo.value === 'token') {
    if (tokens.value > 0) { tokens.value--; return true }
    return false
  }
  if (algo.value === 'sliding') {
    const now = Date.now()
    windowRequests.value = windowRequests.value.filter(t => now - t < WINDOW_SIZE)
    if (windowRequests.value.length < WINDOW_LIMIT) {
      windowRequests.value.push(now)
      return true
    }
    return false
  }
  // leaky bucket: simple counter-based
  if (algo.value === 'leaky') {
    const now = Date.now()
    windowRequests.value = windowRequests.value.filter(t => now - t < 2000)
    if (windowRequests.value.length < 3) {
      windowRequests.value.push(now)
      return true
    }
    return false
  }
  return true
}

function sendRequest() {
  totalSent.value++
  const allowed = checkLimit()
  if (allowed) passed.value++
  else rejected.value++

  const now = new Date()
  recentRequests.value.unshift({
    id: totalSent.value,
    status: allowed ? 'pass' : 'reject',
    time: `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`
  })
  if (recentRequests.value.length > 10) recentRequests.value.pop()
}

async function sendBurst() {
  for (let i = 0; i < 10; i++) {
    sendRequest()
    await new Promise(r => setTimeout(r, 100))
  }
}
</script>

<style scoped>
.rate-limiter-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.algo-tabs { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.tab {
  padding: 0.4rem 0.8rem; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 0.85rem;
}
.tab.active { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }
.controls { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
.send-btn, .burst-btn, .reset-btn {
  padding: 0.4rem 0.8rem; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 0.85rem;
}
.send-btn { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }
.burst-btn { background: #f59e0b; color: #fff; border-color: #f59e0b; }
.stats { display: flex; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap; }
.stat { display: flex; flex-direction: column; align-items: center; }
.stat-label { font-size: 0.75rem; color: var(--vp-c-text-3); }
.stat-value { font-weight: 700; font-size: 1.2rem; font-family: var(--vp-font-family-mono); }
.stat-value.pass { color: #22c55e; }
.stat-value.reject { color: #ef4444; }
.request-log { display: flex; flex-direction: column; gap: 0.25rem; max-height: 200px; overflow-y: auto; margin-bottom: 1rem; }
.req-item {
  display: flex; gap: 0.5rem; padding: 0.3rem 0.5rem; border-radius: 4px;
  font-size: 0.8rem; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.req-item.reject { border-color: rgba(239,68,68,0.3); background: rgba(239,68,68,0.03); }
.req-item.pass { border-color: rgba(34,197,94,0.3); background: rgba(34,197,94,0.03); }
.req-time { margin-left: auto; color: var(--vp-c-text-3); font-family: var(--vp-font-family-mono); }
.algo-info {
  padding: 0.75rem; border-radius: 8px;
  background: rgba(var(--vp-c-brand-rgb), 0.05); border: 1px solid var(--vp-c-brand);
}
.info-name { font-weight: 700; font-size: 0.9rem; margin-bottom: 0.25rem; }
.info-desc { font-size: 0.85rem; color: var(--vp-c-text-2); line-height: 1.6; }
</style>
