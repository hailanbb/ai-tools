<template>
  <div class="csrf-demo">
    <div class="header">
      <div class="title">
        {{ t('csrf.title') }}
      </div>
      <div class="subtitle">
        {{ t('csrf.subtitle') }}
      </div>
    </div>

    <div class="controls">
      <button
        class="btn primary"
        :disabled="step !== 0"
        @click="start"
      >
        {{ t('csrf.start') }}
      </button>
      <button
        class="btn"
        :disabled="step <= 1"
        @click="prev"
      >
        {{ t('csrf.prev') }}
      </button>
      <button
        class="btn primary"
        :disabled="step === 0 || step >= maxStep"
        @click="next"
      >
        {{ t('csrf.next') }}
      </button>
      <button
        class="btn"
        @click="reset"
      >
        {{ t('csrf.reset') }}
      </button>
    </div>

    <div
      v-if="step > 0"
      class="progress"
    >
      {{ t('csrf.progress', { step, maxStep, title: activeStep?.title }) }}
    </div>

    <div class="grid">
      <div class="card">
        <div class="card-title">
          {{ t('csrf.scenarioTitle') }}
        </div>
        <div class="desc">
          {{ t('csrf.scenario') }}
        </div>
        <div class="box">
          <div class="box-title">
            {{ t('csrf.cookieTitle') }}
          </div>
          <code class="mono">Cookie: session_id=abc123</code>
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          {{ t('csrf.requestTitle') }}
        </div>
        <pre class="code"><code>{{ requestText }}</code></pre>
        <div class="desc">
          {{ activeStep?.desc }}
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        {{ t('csrf.defenseTitle') }}
      </div>
      <ol class="list">
        <li
          v-for="item in defenses"
          :key="item.strong"
        >
          <strong>{{ item.strong }}</strong>{{ item.text }}
        </li>
      </ol>
      <div class="warn">
        <div class="warn-title">
          {{ t('csrf.warning') }}
        </div>
        <div class="warn-text">
          {{ t('csrf.warningText') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { authDesignLocale } from '../../../locales/auth-design/index.js'

const { t, messages } = useI18n(authDesignLocale)

const maxStep = 4
const step = ref(0)

const steps = computed(() => messages.value.csrf.steps)
const defenses = computed(() => messages.value.csrf.defenses)
const activeStep = computed(() => steps.value[step.value - 1])

const requestText = computed(() => {
  if (step.value === 0) return t('csrf.clickStart')
  if (step.value === 1) {
    return `POST https://bank.com/api/transfer
Origin: https://evil.com
Content-Type: application/x-www-form-urlencoded

to=attacker&amount=1000`
  }
  if (step.value === 2) {
    return `POST /api/transfer
Origin: https://evil.com
Cookie: session_id=abc123

to=attacker&amount=1000`
  }
  if (step.value === 3) {
    return t('csrf.cookieOnlyResult')
  }
  return `POST /api/transfer
Origin: https://evil.com
Cookie: session_id=abc123
X-CSRF-Token: <missing or invalid>

→ 403 Forbidden`
})

const start = () => {
  step.value = 1
}

const next = () => {
  step.value = Math.min(maxStep, step.value + 1)
}

const prev = () => {
  step.value = Math.max(1, step.value - 1)
}

const reset = () => {
  step.value = 0
}
</script>

<style scoped>
.csrf-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 1.5rem;
  margin: 0.5rem 0;
}

.header {
  margin-bottom: 1rem;
}

.title {
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.subtitle {
  margin-top: 0.25rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.controls {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.btn {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-weight: 700;
  font-size: 0.875rem;
}

.btn.primary {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-bg);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.progress {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.card-title {
  font-weight: 800;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
}

.desc {
  color: var(--vp-c-text-2);
  line-height: 1.75;
}

.box {
  margin-top: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
}

.box-title {
  font-weight: 800;
  margin-bottom: 0.35rem;
  color: var(--vp-c-text-1);
}

.mono {
  font-family: var(--vp-font-family-mono);
}

.code {
  margin: 0;
  padding: 0.75rem;
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  overflow-x: auto;
  color: var(--vp-c-text-1);
}

.list {
  margin: 0;
  padding-left: 1.2rem;
  color: var(--vp-c-text-2);
  line-height: 1.75;
}

.warn {
  margin-top: 0.75rem;
  border: 1px solid rgba(var(--vp-c-brand-rgb), 0.18);
  background: rgba(var(--vp-c-brand-rgb), 0.06);
  border-radius: 6px;
  padding: 0.75rem;
}

.warn-title {
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.warn-text {
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

@media (max-width: 720px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
