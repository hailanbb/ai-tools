<template>
  <div class="retry-demo">
    <div class="header">
      <div class="title">{{ t('retry.title') }}</div>
      <div class="subtitle">{{ t('retry.subtitle') }}</div>
    </div>

    <div class="strategy-tabs">
      <button
        v-for="s in strategies"
        :key="s.key"
        :class="['tab', { active: strategy === s.key }]"
        @click="strategy = s.key; reset()"
      >{{ s.label }}</button>
    </div>

    <div class="retry-area">
      <button class="start-btn" :disabled="running" @click="startRetry">
        {{ running ? t('retry.runningLabel') : t('retry.startLabel') }}
      </button>

      <div class="attempts">
        <div
          v-for="(attempt, i) in attempts"
          :key="i"
          :class="['attempt', attempt.status]"
        >
          <div class="attempt-header">
            <span class="attempt-num">{{ t('retry.attemptLabel', { count: i + 1, kind: i === 0 ? t('retry.executeKind') : t('retry.retryKind') }) }}</span>
            <span :class="['status-badge', attempt.status]">
              {{ t(`retry.statuses.${attempt.status}`) }}
            </span>
          </div>
          <div class="attempt-detail">
            <span v-if="attempt.delay > 0">{{ t('retry.waitLabel', { delay: attempt.delay }) }}</span>
            <span v-if="attempt.error" class="error-msg">{{ attempt.error }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="strategy-info">
      <div class="info-title">{{ currentStrategy.label }}</div>
      <div class="info-desc">{{ currentStrategy.desc }}</div>
      <div class="info-formula">
        {{ t('retry.formulaLabel') }}<code>{{ currentStrategy.formula }}</code>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { asyncTaskQueuesLocale } from '../../../locales/async-task-queues/index.js'

const { t, messages } = useI18n(asyncTaskQueuesLocale)

const strategy = ref('fixed')
const running = ref(false)
const attempts = ref([])

const strategies = computed(() => messages.value.retry.strategies)
const currentStrategy = computed(() => strategies.value.find(s => s.key === strategy.value))

function reset() {
  running.value = false
  attempts.value = []
}

function getDelay(n) {
  if (strategy.value === 'fixed') return 2
  if (strategy.value === 'exponential') return Math.pow(2, n)
  return Math.pow(2, n) + Math.random().toFixed(1) * 1
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

async function startRetry() {
  reset()
  running.value = true
  const maxRetries = 4
  const failUntil = 2 + Math.floor(Math.random() * 2)

  for (let i = 0; i <= maxRetries; i++) {
    const delay = i === 0 ? 0 : getDelay(i - 1)
    const attempt = { status: 'waiting', delay, error: '' }
    attempts.value.push(attempt)

    if (delay > 0) {
      await sleep(Math.min(delay * 500, 2000))
    }

    attempt.status = 'running'
    await sleep(500)

    if (i < failUntil) {
      attempt.status = 'fail'
      attempt.error = messages.value.retry.errors[i % 3]
    } else {
      attempt.status = 'success'
      running.value = false
      return
    }
  }
  running.value = false
}
</script>

<style scoped>
.retry-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.strategy-tabs { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.tab {
  padding: 0.4rem 0.8rem; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 0.85rem;
}
.tab.active { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }
.start-btn {
  padding: 0.5rem 1.5rem; border-radius: 6px; border: none;
  background: var(--vp-c-brand); color: #fff; cursor: pointer; font-size: 0.9rem;
  margin-bottom: 1rem;
}
.start-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.attempts { display: flex; flex-direction: column; gap: 0.5rem; }
.attempt {
  padding: 0.6rem 0.75rem; border-radius: 8px; background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.attempt.fail { border-color: rgba(239,68,68,0.4); }
.attempt.success { border-color: #22c55e; background: rgba(34,197,94,0.05); }
.attempt.running { border-color: var(--vp-c-brand); }
.attempt-header { display: flex; justify-content: space-between; align-items: center; }
.attempt-num { font-weight: 600; font-size: 0.85rem; }
.status-badge { font-size: 0.75rem; padding: 0.15rem 0.5rem; border-radius: 4px; }
.status-badge.fail { background: rgba(239,68,68,0.1); color: #ef4444; }
.status-badge.success { background: rgba(34,197,94,0.1); color: #22c55e; }
.status-badge.running { background: rgba(var(--vp-c-brand-rgb),0.1); color: var(--vp-c-brand); }
.status-badge.waiting { background: var(--vp-c-bg-soft); color: var(--vp-c-text-3); }
.attempt-detail { font-size: 0.8rem; color: var(--vp-c-text-2); margin-top: 0.25rem; }
.error-msg { color: #ef4444; margin-left: 0.5rem; }
.strategy-info {
  margin-top: 1rem; padding: 0.75rem; border-radius: 8px;
  background: rgba(var(--vp-c-brand-rgb),0.05); border: 1px solid var(--vp-c-brand);
}
.info-title { font-weight: 700; font-size: 0.9rem; margin-bottom: 0.25rem; }
.info-desc { font-size: 0.85rem; color: var(--vp-c-text-2); margin-bottom: 0.5rem; }
.info-formula { font-size: 0.85rem; }
.info-formula code {
  padding: 0.15rem 0.4rem; background: var(--vp-c-bg); border-radius: 4px;
  font-family: var(--vp-font-family-mono); font-size: 0.8rem;
}
</style>
