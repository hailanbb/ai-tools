<template>
  <div class="jwt-workflow-demo">
    <div class="header">
      <div class="title">
        {{ t('jwtWorkflow.title') }}
      </div>
      <div class="subtitle">
        {{ t('jwtWorkflow.subtitle') }}
      </div>
    </div>

    <div class="controls">
      <button
        class="btn primary"
        :disabled="step !== 0"
        @click="start"
      >
        {{ t('jwtWorkflow.start') }}
      </button>
      <button
        class="btn"
        :disabled="step <= 1"
        @click="prev"
      >
        {{ t('jwtWorkflow.prev') }}
      </button>
      <button
        class="btn primary"
        :disabled="step === 0 || step >= maxStep"
        @click="next"
      >
        {{ t('jwtWorkflow.next') }}
      </button>
      <button
        class="btn"
        @click="reset"
      >
        {{ t('jwtWorkflow.reset') }}
      </button>
    </div>

    <div
      v-if="step > 0"
      class="progress"
    >
      {{ t('jwtWorkflow.progress', { step, maxStep, title: activeStep?.title }) }}
    </div>

    <div class="grid">
      <div class="card">
        <div class="card-title">
          {{ t('jwtWorkflow.payloadTitle') }}
        </div>
        <pre class="code"><code>{{ payloadJson }}</code></pre>
        <div class="hint">
          {{ t('jwtWorkflow.payloadHint') }}
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          {{ t('jwtWorkflow.tokenTitle') }}
        </div>
        <div class="token">
          <div
            class="part"
            :class="{ active: step >= 1 }"
          >
            <div class="part-label">
              Header
            </div>
            <code class="mono">{{ step >= 1 ? headerB64 : '...' }}</code>
          </div>
          <div class="dot">
            .
          </div>
          <div
            class="part"
            :class="{ active: step >= 2 }"
          >
            <div class="part-label">
              Payload
            </div>
            <code class="mono">{{ step >= 2 ? payloadB64 : '...' }}</code>
          </div>
          <div class="dot">
            .
          </div>
          <div
            class="part"
            :class="{ active: step >= 3 }"
          >
            <div class="part-label">
              Signature
            </div>
            <code class="mono">{{ step >= 3 ? signatureB64 : '...' }}</code>
          </div>
        </div>

        <div
          v-if="step >= 4"
          class="mono-box"
        >
          <div class="mono-label">
            {{ t('jwtWorkflow.fullToken') }}
          </div>
          <code class="mono">{{ token }}</code>
          <button
            class="copy"
            @click="copy(token)"
          >
            {{ copied ? t('jwtWorkflow.copied') : t('jwtWorkflow.copyToken') }}
          </button>
        </div>

        <div
          v-if="step >= 5"
          class="mono-box"
        >
          <div class="mono-label">
            {{ t('jwtWorkflow.requestHeader') }}
          </div>
          <code class="mono">Authorization: Bearer {{ token }}</code>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        {{ activeStep?.title || t('jwtWorkflow.fallbackTitle') }}
      </div>
      <div class="desc">
        {{ activeStep?.desc }}
      </div>
      <div
        v-if="activeStep?.warn"
        class="warn"
      >
        <div class="warn-title">
          {{ t('jwtWorkflow.warning') }}
        </div>
        <div class="warn-text">
          {{ activeStep?.warn }}
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

const maxStep = 6
const step = ref(0)
const copied = ref(false)

const headerObj = { alg: 'HS256', typ: 'JWT' }
const payloadObj = computed(() => ({
  user_id: 123,
  username: 'alice',
  role: 'admin',
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + 3600
}))

const payloadJson = computed(() => JSON.stringify(payloadObj.value, null, 2))
const headerB64 = computed(() => btoa(JSON.stringify(headerObj)))
const payloadB64 = computed(() => btoa(JSON.stringify(payloadObj.value)))
const signatureB64 = computed(() =>
  btoa(`${headerB64.value}.${payloadB64.value}.your-secret-key`)
)
const token = computed(
  () => `${headerB64.value}.${payloadB64.value}.${signatureB64.value}`
)

const steps = computed(() => messages.value.jwtWorkflow.steps)
const activeStep = computed(() => steps.value[step.value - 1])

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
  copied.value = false
}

const copy = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 800)
  } catch {
    copied.value = false
  }
}
</script>

<style scoped>
.jwt-workflow-demo {
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

.code {
  margin: 0;
  padding: 0.75rem;
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  overflow-x: auto;
}

.hint {
  margin-top: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  font-size: 0.9rem;
}

.token {
  display: flex;
  align-items: stretch;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.part {
  flex: 1;
  min-width: 220px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
  opacity: 0.6;
}

.part.active {
  opacity: 1;
  border-color: rgba(var(--vp-c-brand-rgb), 0.35);
}

.part-label {
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin-bottom: 0.35rem;
}

.dot {
  display: none;
}

.mono {
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  word-break: break-all;
}

.mono-box {
  margin-top: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
}

.mono-label {
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  margin-bottom: 0.35rem;
}

.copy {
  margin-top: 0.5rem;
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-weight: 700;
  font-size: 0.875rem;
}

.desc {
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
