<template>
  <div class="oauth2-demo">
    <div class="header">
      <div class="title">
        {{ t('oauth2.title') }}
      </div>
      <div class="subtitle">
        {{ t('oauth2.subtitle') }}
      </div>
    </div>

    <div class="controls">
      <button
        class="btn primary"
        :disabled="step !== 0"
        @click="start"
      >
        {{ t('oauth2.start') }}
      </button>
      <button
        class="btn"
        :disabled="step <= 1"
        @click="prev"
      >
        {{ t('oauth2.prev') }}
      </button>
      <button
        class="btn primary"
        :disabled="step === 0 || step >= maxStep"
        @click="next"
      >
        {{ t('oauth2.next') }}
      </button>
      <button
        class="btn"
        @click="reset"
      >
        {{ t('oauth2.reset') }}
      </button>
      <button
        class="btn"
        :disabled="!currentCmd"
        @click="copy(currentCmd)"
      >
        {{ copied ? t('oauth2.copied') : t('oauth2.copyCommand') }}
      </button>
    </div>

    <div
      v-if="step > 0"
      class="progress"
    >
      {{ t('oauth2.progress', { step, maxStep, title: activeStep?.title }) }}
    </div>

    <div class="grid">
      <div class="card">
        <div class="card-title">
          {{ t('oauth2.rolesTitle') }}
        </div>
        <div class="role">
          <div
            v-for="role in roles"
            :key="role"
            class="pill"
          >
            {{ role }}
          </div>
        </div>
        <div class="desc">
          {{ t('oauth2.roleDesc') }}
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          {{ t('oauth2.stepTitle') }}
        </div>
        <div class="desc">
          {{ activeStep?.desc || t('oauth2.startHint') }}
        </div>
        <div
          v-if="activeStep?.warn"
          class="warn"
        >
          <div class="warn-title">
            {{ t('oauth2.warning') }}
          </div>
          <div class="warn-text">
            {{ activeStep?.warn }}
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        {{ t('oauth2.commandTitle') }}
      </div>
      <pre
        class="code"
      ><code>{{ currentCmd || t('oauth2.commandPlaceholder') }}</code></pre>
      <div class="hint">
        {{ t('oauth2.commandHint') }}
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        {{ t('oauth2.rememberTitle') }}
      </div>
      <ul class="list">
        <li
          v-for="item in remembers"
          :key="item.strong"
        >
          <strong>{{ item.strong }}</strong>{{ item.text }}
        </li>
      </ul>
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

const params = {
  clientId: 'your_client_id',
  redirectUri: 'https://your.app/callback',
  scope: 'openid profile email',
  state: 'random_state_123',
  code: 'auth_code_xyz',
  codeVerifier: 'pkce_verifier_...',
  codeChallenge: 'pkce_challenge_...'
}

const steps = computed(() => messages.value.oauth2.steps)
const roles = computed(() => messages.value.oauth2.roles)
const remembers = computed(() => messages.value.oauth2.remembers)
const activeStep = computed(() => steps.value[step.value - 1])

const currentCmd = computed(() => {
  if (step.value === 0) return ''
  if (step.value === 1) {
    return `GET https://auth.server/authorize?response_type=code&client_id=${params.clientId}&redirect_uri=${encodeURIComponent(
      params.redirectUri
    )}&scope=${encodeURIComponent(params.scope)}&state=${params.state}&code_challenge=${params.codeChallenge}&code_challenge_method=S256`
  }
  if (step.value === 2) {
    return t('oauth2.userConsentCommand')
  }
  if (step.value === 3) {
    return `302 ${params.redirectUri}?code=${params.code}&state=${params.state}`
  }
  if (step.value === 4) {
    return `POST https://auth.server/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
code=${params.code}&
redirect_uri=${encodeURIComponent(params.redirectUri)}&
client_id=${params.clientId}&
code_verifier=${params.codeVerifier}`
  }
  if (step.value === 5) {
    return `GET https://auth.server/userinfo
Authorization: Bearer <access_token>`
  }
  return t('oauth2.backendCommand')
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
.oauth2-demo {
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

.role {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.pill {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  border-radius: 999px;
  padding: 0.2rem 0.6rem;
  font-size: 0.85rem;
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
  font-size: 0.9rem;
  line-height: 1.7;
}

.list {
  margin: 0;
  padding-left: 1.1rem;
  color: var(--vp-c-text-2);
  line-height: 1.75;
}

@media (max-width: 720px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
