<template>
  <div class="cache-problems-demo">
    <div class="header">
      <div class="title">
        {{ t('problems.title') }}
      </div>
      <div class="subtitle">
        {{ t('problems.subtitle') }}
      </div>
    </div>

    <div class="problem-selector">
      <button
        v-for="problem in problems"
        :key="problem.id"
        class="problem-btn"
        :class="{ active: activeProblem === problem.id }"
        @click="activeProblem = problem.id"
      >
        <span class="problem-icon">{{ problem.icon }}</span>
        <span class="problem-name">{{ problem.name }}</span>
      </button>
    </div>

    <div class="problem-content">
      <div
        v-if="activeProblem === 'penetration'"
        class="problem-detail"
      >
        <div class="problem-intro">
          <div class="intro-title">
            {{ activeProblemData.introTitle }}
          </div>
          <div class="intro-text" v-html="activeProblemData.introHtml" />
        </div>

        <div class="problem-scenario">
          <div class="scenario-title">
            {{ t('problems.scenarioTitle') }}
          </div>
          <div class="scenario-diagram">
            <div class="flow-item request">
              <div class="flow-icon">
                🔥
              </div>
              <div class="flow-text">
                {{ activeProblemData.flow[0] }}
              </div>
            </div>
            <div class="flow-arrow">
              ↓
            </div>
            <div
              class="flow-item cache"
              :class="{ miss: true }"
            >
              <div class="flow-icon">
                ❌
              </div>
              <div class="flow-text">
                {{ activeProblemData.flow[1] }}
              </div>
            </div>
            <div class="flow-arrow">
              ↓
            </div>
            <div
              class="flow-item database"
              :class="{ overloaded: dbPressure >= 80 }"
            >
              <div class="flow-icon">
                🗄️
              </div>
              <div class="flow-text">
                {{ activeProblemData.flow[2] }}
              </div>
            </div>
          </div>

          <div class="controls">
            <button
              class="attack-btn"
              :disabled="simulating"
              @click="simulatePenetration"
            >
              {{ simulating ? t('problems.simulatingAttack') : t('problems.simulateAttack') }}
            </button>
          </div>

          <div class="pressure-meter">
            <div class="meter-label">
              {{ t('problems.dbPressure') }}
            </div>
            <div class="meter-bar">
              <div
                class="meter-fill"
                :style="{ width: dbPressure + '%' }"
              />
            </div>
            <div class="meter-value">
              {{ dbPressure }}%
            </div>
          </div>
        </div>

        <div class="solutions">
          <div class="solutions-title">
            {{ t('problems.solutionsTitle') }}
          </div>
          <div class="solution-list">
            <div
              v-for="solution in activeProblemData.solutions"
              :key="solution.number"
              class="solution-item"
            >
              <div class="solution-header">
                <span class="solution-number">{{ solution.number }}</span>
                <span class="solution-name">{{ solution.name }}</span>
              </div>
              <div class="solution-desc">
                {{ solution.desc }}
                <template v-if="solution.note">
                  <br>
                  <span class="note">{{ solution.note }}</span>
                </template>
                <template v-if="solution.code">
                  <br>
                  <span class="code">{{ solution.code }}</span>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="activeProblem === 'breakdown'"
        class="problem-detail"
      >
        <div class="problem-intro">
          <div class="intro-title">
            {{ activeProblemData.introTitle }}
          </div>
          <div class="intro-text" v-html="activeProblemData.introHtml" />
        </div>

        <div class="problem-scenario">
          <div class="scenario-title">
            {{ t('problems.scenarioTitle') }}
          </div>
          <div class="hotkey-scenario">
            <div class="hotkey-badge">
              🔥 {{ activeProblemData.hotData }}
              <br>
              <span class="key">user:12345</span>
            </div>

            <div class="concurrent-requests">
              <div class="requests-title">
                {{ activeProblemData.concurrentRequests }}
              </div>
              <div class="requests-container">
                <div
                  v-for="(req, index) in concurrentRequests"
                  :key="index"
                  class="request-item"
                  :class="req.status"
                >
                  <div class="request-id">
                    {{ activeProblemData.requestPrefix }} {{ req.id }}
                  </div>
                  <div class="request-status">
                    {{ req.statusText }}
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="showMutex"
              class="mutex-visual"
            >
              <div class="mutex-badge">
                🔒 {{ activeProblemData.mutex }}
              </div>
              <div class="mutex-text">
                {{ activeProblemData.mutexText }}
              </div>
            </div>
          </div>

          <div class="controls">
            <button
              class="attack-btn"
              :disabled="simulating"
              @click="simulateBreakdown"
            >
              {{ simulating ? t('problems.simulating') : t('problems.simulateHotExpire') }}
            </button>
          </div>
        </div>

        <div class="solutions">
          <div class="solutions-title">
            {{ t('problems.solutionsTitle') }}
          </div>
          <div class="solution-list">
            <div
              v-for="solution in activeProblemData.solutions"
              :key="solution.number"
              class="solution-item"
            >
              <div class="solution-header">
                <span class="solution-number">{{ solution.number }}</span>
                <span class="solution-name">{{ solution.name }}</span>
              </div>
              <div class="solution-desc">
                {{ solution.desc }}
                <template v-if="solution.note">
                  <br>
                  <span class="note">{{ solution.note }}</span>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="activeProblem === 'avalanche'"
        class="problem-detail"
      >
        <div class="problem-intro">
          <div class="intro-title">
            {{ activeProblemData.introTitle }}
          </div>
          <div class="intro-text" v-html="activeProblemData.introHtml" />
        </div>

        <div class="problem-scenario">
          <div class="scenario-title">
            {{ t('problems.scenarioTitle') }}
          </div>
          <div class="avalanche-visual">
            <div class="cache-items">
              <div
                v-for="(item, index) in cacheItems"
                :key="index"
                class="cache-item"
                :class="{ expired: item.expired }"
              >
                <div class="item-key">
                  {{ item.key }}
                </div>
                <div class="item-ttl">
                  TTL: {{ item.ttl }}s
                </div>
              </div>
            </div>

            <div
              v-if="massExplosion"
              class="mass-explosion"
            >
              <div class="explosion-icon">
                💥
              </div>
              <div class="explosion-text">
                {{ activeProblemData.expiredTogether }}
              </div>
            </div>

            <div
              class="db-overload"
              :class="{ critical: dbPressure >= 90 }"
            >
              <div class="db-icon">
                🗄️
              </div>
              <div class="db-status">
                {{ t('problems.dbLoad') }}: {{ dbPressure }}%
              </div>
            </div>
          </div>

          <div class="controls">
            <button
              class="attack-btn"
              :disabled="simulating"
              @click="simulateAvalanche"
            >
              {{ simulating ? t('problems.simulating') : t('problems.simulateAvalanche') }}
            </button>
            <button
              class="solution-btn"
              @click="applyRandomTTL"
            >
              {{ t('problems.applyRandomTtl') }}
            </button>
          </div>
        </div>

        <div class="solutions">
          <div class="solutions-title">
            {{ t('problems.solutionsTitle') }}
          </div>
          <div class="solution-list">
            <div
              v-for="solution in activeProblemData.solutions"
              :key="solution.number"
              class="solution-item"
            >
              <div class="solution-header">
                <span class="solution-number">{{ solution.number }}</span>
                <span class="solution-name">{{ solution.name }}</span>
              </div>
              <div class="solution-desc">
                {{ solution.desc }}
                <template v-if="solution.note">
                  <br>
                  <span class="note">{{ solution.note }}</span>
                </template>
                <template v-if="solution.code">
                  <br>
                  <span class="code">{{ solution.code }}</span>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <div class="table-title">
        {{ t('problems.comparisonTitle') }}
      </div>
      <table class="problems-table">
        <thead>
          <tr>
            <th v-for="header in tableHeaders" :key="header">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in comparisonRows"
            :key="row[0]"
            :class="{ active: activeProblemData.name === row[0] }"
          >
            <td v-for="cell in row" :key="cell">
              {{ cell }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { cacheDesignLocale } from '../../../locales/cache-design/index.js'

const { t, messages } = useI18n(cacheDesignLocale)

const activeProblem = ref('penetration')
const simulating = ref(false)
const dbPressure = ref(0)
const concurrentRequests = ref([])
const showMutex = ref(false)
const cacheItems = ref([])
const massExplosion = ref(false)

const problems = computed(() => messages.value.problems.problems)
const tableHeaders = computed(() => messages.value.problems.tableHeaders)
const comparisonRows = computed(() => messages.value.problems.comparisonRows)
const activeProblemData = computed(
  () => problems.value.find((problem) => problem.id === activeProblem.value) || problems.value[0]
)

const initializeCacheItems = () => {
  cacheItems.value = Array.from({ length: 8 }, (_, i) => ({
    key: `key:${i + 1}`,
    ttl: 10,
    expired: false
  }))
}

const simulatePenetration = async () => {
  simulating.value = true
  dbPressure.value = 0

  for (let i = 0; i < 20; i++) {
    await new Promise((resolve) => setTimeout(resolve, 100))
    dbPressure.value = Math.min(100, dbPressure.value + 5)
  }

  setTimeout(() => {
    simulating.value = false
    dbPressure.value = 0
  }, 2000)
}

const simulateBreakdown = async () => {
  simulating.value = true
  concurrentRequests.value = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    status: 'waiting',
    statusText: messages.value.problems.problems[1].statuses.waiting
  }))

  showMutex.value = true

  // First request gets the lock
  await new Promise((resolve) => setTimeout(resolve, 300))
  concurrentRequests.value[0].status = 'processing'
  concurrentRequests.value[0].statusText = messages.value.problems.problems[1].statuses.processing

  await new Promise((resolve) => setTimeout(resolve, 1000))
  concurrentRequests.value[0].status = 'done'
  concurrentRequests.value[0].statusText = messages.value.problems.problems[1].statuses.done

  for (let i = 1; i < concurrentRequests.value.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, 200))
    concurrentRequests.value[i].status = 'done'
    concurrentRequests.value[i].statusText = messages.value.problems.problems[1].statuses.fromCache
  }

  showMutex.value = false

  setTimeout(() => {
    simulating.value = false
  }, 1500)
}

const simulateAvalanche = async () => {
  simulating.value = true
  dbPressure.value = 0
  massExplosion.value = false

  initializeCacheItems()

  for (let i = 10; i > 0; i--) {
    await new Promise((resolve) => setTimeout(resolve, 200))
    cacheItems.value.forEach((item) => {
      item.ttl = i
    })
  }

  massExplosion.value = true
  cacheItems.value.forEach((item) => {
    item.expired = true
  })

  for (let i = 0; i < 20; i++) {
    await new Promise((resolve) => setTimeout(resolve, 100))
    dbPressure.value = Math.min(100, dbPressure.value + 5)
  }

  setTimeout(() => {
    massExplosion.value = false
    simulating.value = false
  }, 2000)
}

const applyRandomTTL = async () => {
  simulating.value = true
  dbPressure.value = 0
  massExplosion.value = false

  initializeCacheItems()

  cacheItems.value.forEach((item) => {
    item.ttl = 10 + Math.floor(Math.random() * 10) - 5
  })

  const maxTTL = Math.max(...cacheItems.value.map((item) => item.ttl))

  for (let t = maxTTL; t > 0; t--) {
    await new Promise((resolve) => setTimeout(resolve, 300))

    cacheItems.value.forEach((item) => {
      if (item.ttl > 0) {
        item.ttl--
        if (item.ttl === 0) {
          item.expired = true
        }
      }
    })

    const expiredCount = cacheItems.value.filter((item) => item.expired).length
    dbPressure.value = Math.min(50, expiredCount * 8)
  }

  setTimeout(() => {
    simulating.value = false
  }, 1500)
}

initializeCacheItems()
</script>

<style scoped>
.cache-problems-demo {
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
  font-size: 1.1rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.problem-selector {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.problem-btn {
  flex: 1;
  min-width: 150px;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.problem-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.problem-icon {
  font-size: 2rem;
}

.problem-name {
  font-size: 0.95rem;
}

.problem-content {
  min-height: 500px;
}

.problem-detail {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.problem-intro {
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
}

.intro-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.intro-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.problem-scenario {
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
}

.scenario-title {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.scenario-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.flow-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
  min-width: 250px;
  justify-content: center;
}

.flow-item.cache.miss {
  border-color: #ef4444;
  background: #fef2f2;
}

.flow-item.database.overloaded {
  border-color: #ef4444;
  background: #fef2f2;
  animation: pulse 1s infinite;
}

.flow-icon {
  font-size: 1.5rem;
}

.flow-text {
  font-weight: 600;
  font-size: 0.9rem;
}

.flow-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
}

.controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 1.5rem 0;
  flex-wrap: wrap;
}

.attack-btn {
  padding: 0.75rem 1.5rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.attack-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.solution-btn {
  padding: 0.75rem 1.5rem;
  background: #22c55e;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.pressure-meter {
  margin-top: 1rem;
}

.meter-label {
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.meter-bar {
  height: 20px;
  background: var(--vp-c-bg);
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.meter-fill {
  height: 100%;
  background: linear-gradient(90deg, #22c55e, #f59e0b, #ef4444);
  transition: width 0.3s;
}

.meter-value {
  text-align: center;
  margin-top: 0.5rem;
  font-size: 1.2rem;
  font-weight: 700;
}

.hotkey-scenario {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.hotkey-badge {
  text-align: center;
  padding: 0.75rem;
  background: #fef3c7;
  border-radius: 6px;
  border: 2px solid #f59e0b;
  font-weight: 600;
}

.key {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #92400e;
}

.concurrent-requests {
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  border-radius: 6px;
}

.requests-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.requests-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.5rem;
}

.request-item {
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  text-align: center;
  font-size: 0.75rem;
}

.request-item.waiting {
  border-color: #94a3b8;
}

.request-item.processing {
  border-color: #f59e0b;
  background: #fef3c7;
  animation: pulse 1s infinite;
}

.request-item.done {
  border-color: #22c55e;
  background: #f0fdf4;
}

.request-id {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.request-status {
  color: var(--vp-c-text-2);
}

.mutex-visual {
  text-align: center;
  padding: 0.75rem;
  background: #eff6ff;
  border-radius: 6px;
  border: 2px solid #3b82f6;
}

.mutex-badge {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.mutex-text {
  font-size: 0.9rem;
  color: #1e40af;
}

.avalanche-visual {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.cache-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.5rem;
}

.cache-item {
  padding: 0.5rem;
  background: #f0fdf4;
  border-radius: 6px;
  border: 2px solid #22c55e;
  text-align: center;
  transition: all 0.3s;
}

.cache-item.expired {
  background: #fef2f2;
  border-color: #ef4444;
  animation: shake 0.5s;
}

.item-key {
  font-weight: 600;
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
}

.item-ttl {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.mass-explosion {
  text-align: center;
  padding: 0.75rem;
  background: #fef2f2;
  border-radius: 6px;
  border: 2px solid #ef4444;
}

.explosion-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.explosion-text {
  font-size: 1.2rem;
  font-weight: 700;
  color: #dc2626;
}

.db-overload {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
  transition: all 0.3s;
}

.db-overload.critical {
  border-color: #ef4444;
  background: #fef2f2;
  animation: pulse 1s infinite;
}

.db-icon {
  font-size: 2rem;
}

.db-status {
  font-weight: 600;
  font-size: 1rem;
}

.solutions {
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
}

.solutions-title {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.solution-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.solution-item {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border-left: 4px solid var(--vp-c-brand);
}

.solution-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.solution-number {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-weight: 700;
  font-size: 0.9rem;
}

.solution-name {
  font-weight: 600;
  font-size: 0.95rem;
}

.solution-desc {
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  padding-left: 2.5rem;
}

.note {
  display: block;
  margin-top: 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
}

.code {
  display: block;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #1e293b;
  color: #e2e8f0;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.8rem;
}

.comparison-table {
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
}

.table-title {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.problems-table {
  width: 100%;
  border-collapse: collapse;
}

.problems-table th,
.problems-table td {
  padding: 0.75rem;
  text-align: left;
  border: 1px solid var(--vp-c-divider);
}

.problems-table th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
  font-size: 0.85rem;
}

.problems-table td {
  font-size: 0.85rem;
}

.problems-table tr.active {
  background: #eff6ff;
  border-left: 3px solid var(--vp-c-brand);
}

.problems-table tr.active td {
  border-top-color: var(--vp-c-brand);
  border-bottom-color: var(--vp-c-brand);
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
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
