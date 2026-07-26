<template>
  <div class="search-algorithm-demo">
    <div class="demo-header">
      <span class="title">{{ t('algorithmThinking.search.title') }}</span>
      <span class="subtitle">{{ t('algorithmThinking.search.subtitle') }}</span>
    </div>

    <div class="algorithm-selector">
      <button
        :class="['algo-btn', { active: activeAlgo === 'linear' }]"
        @click="activeAlgo = 'linear'"
      >
        {{ t('algorithmThinking.search.linearTab') }}
      </button>
      <button
        :class="['algo-btn', { active: activeAlgo === 'binary' }]"
        @click="activeAlgo = 'binary'"
      >
        {{ t('algorithmThinking.search.binaryTab') }}
      </button>
    </div>

    <div v-if="activeAlgo === 'linear'" class="algo-content">
      <div class="content-title">
        {{ t('algorithmThinking.search.linearTitle') }}
      </div>
      <div class="linear-demo">
        <div class="search-array">
          <div
            v-for="(num, index) in numbers"
            :key="index"
            :class="[
              'array-cell',
              {
                found: index === foundIndex,
                searching: index <= searchStep && searching
              }
            ]"
          >
            {{ num }}
          </div>
        </div>
        <div class="search-controls">
          <button class="search-btn" @click="startLinearSearch">
            {{ t('algorithmThinking.search.startSearch') }}
          </button>
          <button class="reset-btn" @click="reset">
            {{ t('algorithmThinking.search.reset') }}
          </button>
        </div>
        <div class="search-info">
          {{ t('algorithmThinking.search.targetNumber') }}<input
            v-model="targetNumber"
            type="number"
            class="target-input"
          />
        </div>
      </div>
      <div class="algo-stats">
        <div class="stat-item">
          {{ t('algorithmThinking.search.timeComplexity', { value: 'O(n)' }) }}
        </div>
        <div class="stat-item">{{ t('algorithmThinking.search.linearUse') }}</div>
      </div>
    </div>

    <div v-if="activeAlgo === 'binary'" class="algo-content">
      <div class="content-title">
        {{ t('algorithmThinking.search.binaryTitle') }}
      </div>
      <div class="binary-demo">
        <div class="sorted-array">
          <div
            v-for="(num, index) in sortedNumbers"
            :key="index"
            :class="[
              'array-cell',
              {
                found: index === binaryFoundIndex,
                left: index >= binaryLeft && index <= binaryRight,
                eliminated: index < binaryLeft || index > binaryRight
              }
            ]"
          >
            {{ num }}
          </div>
        </div>
        <div class="binary-info">
          <div class="info-step">
            {{ t('algorithmThinking.search.range', { left: binaryLeft, right: binaryRight }) }}
          </div>
          <div class="info-mid">
            {{ t('algorithmThinking.search.middle', { mid: binaryMid }) }}
          </div>
          <div class="info-comparison">
            {{ sortedNumbers[binaryMid] }} vs {{ binaryTarget }}
          </div>
        </div>
        <div class="search-controls">
          <button class="search-btn" @click="binaryStep">
            {{ t('algorithmThinking.search.nextStep') }}
          </button>
          <button class="reset-btn" @click="resetBinary">
            {{ t('algorithmThinking.search.reset') }}
          </button>
        </div>
      </div>
      <div class="algo-stats">
        <div class="stat-item">
          {{ t('algorithmThinking.search.timeComplexity', { value: 'O(log n)' }) }}
        </div>
        <div class="stat-item">{{ t('algorithmThinking.search.binaryUse') }}</div>
      </div>
    </div>

    <div class="comparison">
      <div class="comparison-title">
        {{ t('algorithmThinking.search.comparisonTitle') }}
      </div>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>{{ t('algorithmThinking.search.dataSize') }}</th>
            <th>{{ t('algorithmThinking.search.linearTab') }}</th>
            <th>{{ t('algorithmThinking.search.binaryTab') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in [10, 100, 1000, 10000]" :key="n">
            <td>{{ n }}</td>
            <td>{{ t('algorithmThinking.search.atMostTimes', { count: n }) }}</td>
            <td>
              {{ t('algorithmThinking.search.atMostTimes', { count: Math.ceil(Math.log2(n)) }) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { useI18n } from '../../../composables/useI18n'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals'

const { t } = useI18n(computerFundamentalsLocale)

const activeAlgo = ref('linear')
const targetNumber = ref(7)
const foundIndex = ref(-1)
const searchStep = ref(-1)
const searching = ref(false)
const searchTimer = ref(null)

const numbers = ref([3, 7, 2, 9, 5, 1, 8, 4, 6, 10])

const sortedNumbers = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
const binaryTarget = ref(7)
const binaryLeft = ref(0)
const binaryRight = ref(9)
const binaryMid = ref(4)
const binaryFoundIndex = ref(-1)

onUnmounted(() => {
  if (searchTimer.value) clearInterval(searchTimer.value)
})

const startLinearSearch = () => {
  if (searchTimer.value) clearInterval(searchTimer.value)
  searching.value = true
  searchStep.value = -1
  foundIndex.value = -1

  let step = 0
  searchTimer.value = setInterval(() => {
    if (step < numbers.value.length) {
      searchStep.value = step
      if (numbers.value[step] === targetNumber.value) {
        foundIndex.value = step
        searching.value = false
        if (searchTimer.value) clearInterval(searchTimer.value)
      }
      step++
    } else {
      searching.value = false
      if (searchTimer.value) clearInterval(searchTimer.value)
    }
  }, 500)
}

const reset = () => {
  searchStep.value = -1
  foundIndex.value = -1
  searching.value = false
}

const binaryStep = () => {
  binaryMid.value = Math.floor((binaryLeft.value + binaryRight.value) / 2)

  if (sortedNumbers.value[binaryMid.value] === binaryTarget.value) {
    binaryFoundIndex.value = binaryMid.value
  } else if (sortedNumbers.value[binaryMid.value] < binaryTarget.value) {
    binaryLeft.value = binaryMid.value + 1
  } else {
    binaryRight.value = binaryMid.value - 1
  }
}

const resetBinary = () => {
  binaryLeft.value = 0
  binaryRight.value = 9
  binaryMid.value = 4
  binaryFoundIndex.value = -1
}
</script>

<style scoped>
.search-algorithm-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.demo-header .title {
  font-weight: 700;
  font-size: 1.1rem;
}
.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.algorithm-selector {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.algo-btn {
  flex: 1;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
}

.algo-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.algo-content {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.content-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--vp-c-brand);
}

.search-array,
.sorted-array {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.array-cell {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
}

.array-cell.searching {
  border-color: #f59e0b;
  background: rgba(245, 158, 11, 0.1);
}

.array-cell.found {
  border-color: #10b981;
  background: #10b981;
  color: white;
}

.array-cell.left {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.array-cell.eliminated {
  opacity: 0.3;
}

.search-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.search-btn {
  padding: 0.6rem 1.25rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
}

.reset-btn {
  padding: 0.6rem 1.25rem;
  background: var(--vp-c-divider);
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
}

.search-info {
  text-align: center;
  margin-bottom: 1rem;
}

.target-input {
  width: 60px;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  text-align: center;
  font-size: 0.9rem;
}

.binary-info {
  text-align: center;
  margin-bottom: 1.5rem;
}

.info-step,
.info-mid,
.info-comparison {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.algo-stats {
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.stat-item {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.comparison {
  margin-top: 2rem;
}

.comparison-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
}

.comparison-table th {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.75rem;
  text-align: center;
  font-size: 0.85rem;
}

.comparison-table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  text-align: center;
  font-size: 0.85rem;
}
</style>
