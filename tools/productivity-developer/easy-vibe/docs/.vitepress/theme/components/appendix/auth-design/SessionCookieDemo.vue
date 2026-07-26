<template>
  <div class="session-demo">
    <div class="header">
      <div class="title">
        {{ t('sessionCookie.title') }}
      </div>
      <div class="subtitle">
        {{ t('sessionCookie.subtitle') }}
      </div>
    </div>

    <div class="controls">
      <button
        class="btn primary"
        :disabled="step !== 0"
        @click="start"
      >
        {{ t('sessionCookie.start') }}
      </button>
      <button
        class="btn"
        :disabled="step <= 1"
        @click="prev"
      >
        {{ t('sessionCookie.prev') }}
      </button>
      <button
        class="btn primary"
        :disabled="step === 0 || step >= maxStep"
        @click="next"
      >
        {{ t('sessionCookie.next') }}
      </button>
      <button
        class="btn"
        @click="reset"
      >
        {{ t('sessionCookie.reset') }}
      </button>
    </div>

    <div
      v-if="step > 0"
      class="progress"
    >
      {{ t('sessionCookie.progress', { step, maxStep, title: activeStep?.title }) }}
    </div>

    <div class="grid">
      <div class="card">
        <div class="card-title">
          {{ t('sessionCookie.browserTitle') }}
        </div>
        <div class="box">
          <div class="box-title">
            Cookie Jar
          </div>
          <div
            v-if="cookie"
            class="kv"
          >
            <div class="k">
              session_id
            </div>
            <div class="v mono">
              {{ cookie }}
            </div>
          </div>
          <div
            v-else
            class="empty"
          >
            {{ t('sessionCookie.noCookie') }}
          </div>
        </div>

        <div class="box">
          <div class="box-title">
            {{ t('sessionCookie.requestTitle') }}
          </div>
          <pre class="code"><code>{{ clientRequest }}</code></pre>
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          {{ t('sessionCookie.serverTitle') }}
        </div>
        <div class="box">
          <div class="box-title">
            Session Store（Redis/Memory）
          </div>
          <div
            v-if="session"
            class="kv"
          >
            <div class="k mono">
              {{ cookie }}
            </div>
            <div class="v">
              <div class="row">
                <span class="muted">user_id</span> 123
              </div>
              <div class="row">
                <span class="muted">username</span> alice
              </div>
              <div class="row">
                <span class="muted">role</span> admin
              </div>
            </div>
          </div>
          <div
            v-else
            class="empty"
          >
            {{ t('sessionCookie.noSession') }}
          </div>
        </div>

        <div class="box">
          <div class="box-title">
            {{ t('sessionCookie.responseTitle') }}
          </div>
          <pre class="code"><code>{{ serverResponse }}</code></pre>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        {{ activeStep?.title || t('sessionCookie.fallbackTitle') }}
      </div>
      <div class="desc">
        {{ activeStep?.desc }}
      </div>
      <div
        v-if="activeStep?.warn"
        class="warn"
      >
        <div class="warn-title">
          {{ t('sessionCookie.warning') }}
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

const maxStep = 5
const step = ref(0)

const cookie = ref('')
const session = ref(false)

const steps = computed(() => messages.value.sessionCookie.steps)
const activeStep = computed(() => steps.value[step.value - 1])

const start = () => {
  step.value = 1
  cookie.value = ''
  session.value = false
}

const next = () => {
  step.value = Math.min(maxStep, step.value + 1)
  applyState()
}

const prev = () => {
  step.value = Math.max(1, step.value - 1)
  applyState()
}

const reset = () => {
  step.value = 0
  cookie.value = ''
  session.value = false
}

const applyState = () => {
  if (step.value <= 1) {
    cookie.value = ''
    session.value = false
    return
  }
  if (step.value >= 2) {
    if (!cookie.value)
      cookie.value = 'sess_' + Math.random().toString(36).slice(2, 10)
    session.value = true
  }
}

const clientRequest = computed(() => {
  if (step.value === 0) return t('sessionCookie.clickStart')
  if (step.value === 1) {
    return `POST /login
Content-Type: application/json

{"username":"alice","password":"******"}`
  }
  if (step.value === 2) return t('sessionCookie.waitCookie')
  if (step.value === 3) {
    return `GET /api/user/profile
Cookie: session_id=${cookie.value}`
  }
  if (step.value === 4) {
    return `GET /api/admin/users
Cookie: session_id=${cookie.value}`
  }
  return `POST /logout
Cookie: session_id=${cookie.value}`
})

const serverResponse = computed(() => {
  if (step.value === 0) return ''
  if (step.value === 1) return '200 OK (credentials valid)'
  if (step.value === 2) {
    return `200 OK
Set-Cookie: session_id=${cookie.value}; HttpOnly; Secure; SameSite=Lax`
  }
  if (step.value === 3) return '200 OK (profile payload...)'
  if (step.value === 4)
    return '200 OK (admin data...) / 403 Forbidden (if not admin)'
  return `200 OK
Set-Cookie: session_id=; Max-Age=0`
})
</script>

<style scoped>
.session-demo {
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

.box {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
}

.box-title {
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.empty {
  color: var(--vp-c-text-3);
  font-style: italic;
}

.kv {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 0.75rem;
  align-items: start;
}

.k {
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.v {
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.row {
  display: flex;
  gap: 0.5rem;
}

.muted {
  color: var(--vp-c-text-3);
  min-width: 72px;
}

.mono {
  font-family: var(--vp-font-family-mono);
  word-break: break-all;
}

.code {
  margin: 0;
  padding: 0.75rem;
  border-radius: 6px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  overflow-x: auto;
  color: var(--vp-c-text-1);
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
