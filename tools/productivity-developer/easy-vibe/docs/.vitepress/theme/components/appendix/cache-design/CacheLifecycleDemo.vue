<template>
  <div class="cache-lifecycle-demo">
    <div class="header">
      <div class="title">
        {{ t('lifecycle.title') }}
      </div>
      <div class="subtitle">
        {{ t('lifecycle.subtitle') }}
      </div>
    </div>

    <div class="cache-container">
      <div class="cache-header">
        <div class="cache-title">
          {{ t('lifecycle.storage') }} ({{ t('lifecycle.capacity') }}: {{ cacheSize }}/{{ maxCacheSize }})
        </div>
        <div class="cache-stats">
          <span>{{ t('lifecycle.hitRate') }}: {{ hitRate }}%</span>
          <span>{{ t('lifecycle.evictions') }}: {{ evictionCount }}</span>
        </div>
      </div>

      <div class="cache-entries">
        <div
          v-for="entry in cacheEntries"
          :key="entry.id"
          class="cache-entry"
          :class="{
            hit: entry.status === 'hit',
            expiring: entry.status === 'expiring',
            evicting: entry.status === 'evicting',
            new: entry.status === 'new'
          }"
        >
          <div class="entry-header">
            <div class="entry-id">
              {{ entry.key }}
            </div>
            <div class="entry-status">
              <span
                v-if="entry.status === 'new'"
                class="status-badge new"
              >NEW</span>
              <span
                v-if="entry.status === 'hit'"
                class="status-badge hit"
              >HIT</span>
              <span
                v-if="entry.status === 'expiring'"
                class="status-badge expiring"
              >EXPIRING</span>
              <span
                v-if="entry.status === 'evicting'"
                class="status-badge evicting"
              >EVICTING</span>
            </div>
          </div>
          <div class="entry-ttl">
            <div class="ttl-bar">
              <div
                class="ttl-fill"
                :style="{ width: entry.ttlPercent + '%' }"
              />
            </div>
            <div class="ttl-text">
              {{ t('lifecycle.ttl') }}: {{ entry.ttl }}s
            </div>
          </div>
          <div class="entry-meta">
            <span>{{ t('lifecycle.hits') }}: {{ entry.hits }}</span>
            <span>{{ t('lifecycle.access') }}: {{ entry.lastAccess }}{{ t('lifecycle.secondsAgo') }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="controls">
      <div class="control-group">
        <label>{{ t('lifecycle.operation') }}</label>
        <button
          class="action-btn read"
          @click="readData"
        >
          {{ t('lifecycle.read') }}
        </button>
        <button
          class="action-btn write"
          @click="writeData"
        >
          {{ t('lifecycle.write') }}
        </button>
      </div>

      <div class="control-group">
        <label>{{ t('lifecycle.auto') }}</label>
        <button
          class="action-btn auto"
          :class="{ active: autoMode }"
          @click="toggleAuto"
        >
          {{ autoMode ? t('lifecycle.stop') : t('lifecycle.start') }}{{ t('lifecycle.autoSimulation') }}
        </button>
      </div>
    </div>

    <div class="timeline">
      <div class="timeline-title">
        {{ t('lifecycle.timeline') }}
      </div>
      <div class="timeline-events">
        <div
          v-for="(event, index) in events"
          :key="index"
          class="event"
          :class="event.type"
        >
          <div class="event-time">
            {{ event.time }}
          </div>
          <div class="event-content">
            <span class="event-icon">{{ event.icon }}</span>
            <span class="event-text">{{ event.text }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="legend">
      <div class="legend-item">
        <span class="legend-color new" />
        <span>{{ t('lifecycle.legend.new') }}</span>
      </div>
      <div class="legend-item">
        <span class="legend-color hit" />
        <span>{{ t('lifecycle.legend.hit') }}</span>
      </div>
      <div class="legend-item">
        <span class="legend-color expiring" />
        <span>{{ t('lifecycle.legend.expiring') }}</span>
      </div>
      <div class="legend-item">
        <span class="legend-color evicting" />
        <span>{{ t('lifecycle.legend.evicting') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { cacheDesignLocale } from '../../../locales/cache-design/index.js'

const { t } = useI18n(cacheDesignLocale)

const maxCacheSize = 6
const cacheEntries = ref([])
const events = ref([])
const autoMode = ref(false)
let autoInterval = null
let eventCounter = 0

const cacheSize = computed(() => cacheEntries.value.length)
const hitRate = computed(() => {
  const hitEvents = events.value.filter((e) => e.type === 'hit').length
  const totalEvents = events.value.filter(
    (e) => e.type === 'hit' || e.type === 'miss'
  ).length
  return totalEvents > 0 ? Math.round((hitEvents / totalEvents) * 100) : 0
})
const evictionCount = computed(
  () => events.value.filter((e) => e.type === 'eviction').length
)

const addEvent = (type, icon, text) => {
  const now = new Date()
  events.value.unshift({
    time: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`,
    type,
    icon,
    text
  })

  if (events.value.length > 10) {
    events.value.pop()
  }
}

const writeData = () => {
  if (cacheEntries.value.length >= maxCacheSize) {
    // LRU: Remove least recently used
    const lruIndex = cacheEntries.value.reduce(
      (minIdx, entry, idx, arr) =>
        entry.lastAccess > arr[minIdx].lastAccess ? minIdx : idx,
      0
    )

    const evicting = cacheEntries.value[lruIndex]
    evicting.status = 'evicting'
    addEvent('eviction', '🗑️', t('lifecycle.events.evict', { key: evicting.key }))

    setTimeout(() => {
      cacheEntries.value.splice(lruIndex, 1)
    }, 500)
  }

  const newId = `key_${++eventCounter}`
  const newEntry = {
    key: newId,
    status: 'new',
    ttl: 30,
    ttlPercent: 100,
    hits: 0,
    lastAccess: 0
  }

  cacheEntries.value.push(newEntry)
  addEvent('write', '✨', t('lifecycle.events.write', { key: newId }))

  setTimeout(() => {
    newEntry.status = null
  }, 500)

  startTTLDecay(newEntry)
}

const readData = () => {
  if (cacheEntries.value.length === 0) {
    addEvent('miss', '❌', t('lifecycle.events.emptyMiss'))
    return
  }

  const randomIndex = Math.floor(Math.random() * cacheEntries.value.length)
  const entry = cacheEntries.value[randomIndex]

  entry.status = 'hit'
  entry.hits++
  entry.lastAccess = 0
  entry.ttl = Math.min(entry.ttl + 5, 30) // Refresh TTL on hit
  entry.ttlPercent = (entry.ttl / 30) * 100

  addEvent('hit', '✅', t('lifecycle.events.hit', { key: entry.key, hits: entry.hits }))

  setTimeout(() => {
    entry.status = null
  }, 500)
}

const startTTLDecay = (entry) => {
  const interval = setInterval(() => {
    if (!cacheEntries.value.includes(entry)) {
      clearInterval(interval)
      return
    }

    entry.lastAccess++
    entry.ttl--
    entry.ttlPercent = (entry.ttl / 30) * 100

    if (entry.ttl <= 10) {
      entry.status = 'expiring'
    }

    if (entry.ttl <= 0) {
      addEvent('expiration', '⏰', t('lifecycle.events.expired', { key: entry.key }))
      const idx = cacheEntries.value.indexOf(entry)
      if (idx !== -1) {
        cacheEntries.value.splice(idx, 1)
      }
      clearInterval(interval)
    }
  }, 1000)
}

const toggleAuto = () => {
  autoMode.value = !autoMode.value

  if (autoMode.value) {
    autoInterval = setInterval(() => {
      const action = Math.random()
      if (action < 0.4 || cacheEntries.value.length === 0) {
        writeData()
      } else {
        readData()
      }
    }, 1500)
  } else {
    if (autoInterval) {
      clearInterval(autoInterval)
      autoInterval = null
    }
  }
}

onUnmounted(() => {
  if (autoInterval) {
    clearInterval(autoInterval)
  }
})
</script>

<style scoped>
.cache-lifecycle-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1.5rem;
}

.title {
  font-weight: 700;
  font-size: 1.05rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.cache-container {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.cache-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.cache-title {
  font-weight: 600;
  font-size: 0.95rem;
}

.cache-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.cache-entries {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
  min-height: 150px;
}

.cache-entry {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  transition: all 0.3s;
}

.cache-entry.new {
  border-color: #22c55e;
  background: #f0fdf4;
  animation: slideIn 0.3s;
}

.cache-entry.hit {
  border-color: #3b82f6;
  background: #eff6ff;
}

.cache-entry.expiring {
  border-color: #f59e0b;
  background: #fef3c7;
}

.cache-entry.evicting {
  border-color: #ef4444;
  background: #fef2f2;
  animation: shake 0.5s;
}

.entry-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.entry-id {
  font-weight: 600;
  font-size: 0.9rem;
}

.status-badge {
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
}

.status-badge.new {
  background: #22c55e;
  color: white;
}

.status-badge.hit {
  background: #3b82f6;
  color: white;
}

.status-badge.expiring {
  background: #f59e0b;
  color: white;
}

.status-badge.evicting {
  background: #ef4444;
  color: white;
}

.entry-ttl {
  margin-bottom: 0.5rem;
}

.ttl-bar {
  height: 6px;
  background: var(--vp-c-bg);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 0.25rem;
}

.ttl-fill {
  height: 100%;
  background: linear-gradient(90deg, #22c55e, #f59e0b, #ef4444);
  transition: width 1s linear;
}

.ttl-text {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.entry-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.action-btn {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.action-btn.read {
  background: #3b82f6;
  color: white;
}

.action-btn.write {
  background: #22c55e;
  color: white;
}

.action-btn.auto {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.action-btn.auto.active {
  background: #ef4444;
  color: white;
  border-color: #ef4444;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.timeline {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.timeline-title {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.timeline-events {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 200px;
  
}

.event {
  display: grid;
  grid-template-columns: 70px 1fr;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.85rem;
}

.event.hit {
  background: #eff6ff;
}

.event.miss {
  background: #fef2f2;
}

.event.write {
  background: #f0fdf4;
}

.event.eviction {
  background: #fef2f2;
}

.event-time {
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
}

.event-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.event-icon {
  font-size: 1rem;
}

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 2px solid;
}

.legend-color.new {
  border-color: #22c55e;
  background: #f0fdf4;
}

.legend-color.hit {
  border-color: #3b82f6;
  background: #eff6ff;
}

.legend-color.expiring {
  border-color: #f59e0b;
  background: #fef3c7;
}

.legend-color.evicting {
  border-color: #ef4444;
  background: #fef2f2;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}
</style>
