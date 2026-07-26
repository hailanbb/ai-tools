<template>
  <div class="authn-authz-demo">
    <div class="header">
      <div class="title">
        {{ t('authnAuthz.title') }}
      </div>
      <div class="subtitle">
        {{ t('authnAuthz.subtitle') }}
      </div>
    </div>

    <div class="grid">
      <div class="card">
        <div class="card-title">
          {{ t('authnAuthz.requestTitle') }}
        </div>

        <label class="label">{{ t('authnAuthz.identityLabel') }}</label>
        <div class="row">
          <button
            v-for="u in users"
            :key="u.id"
            class="chip"
            :class="{ active: userId === u.id }"
            @click="userId = u.id"
          >
            {{ u.name }}
          </button>
        </div>

        <label class="label">{{ t('authnAuthz.actionLabel') }}</label>
        <div class="row">
          <button
            v-for="a in actions"
            :key="a.id"
            class="chip"
            :class="{ active: actionId === a.id }"
            @click="actionId = a.id"
          >
            {{ a.name }}
          </button>
        </div>

        <div class="hint">
          {{ t('authnAuthz.hint') }}
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          {{ t('authnAuthz.resultTitle') }}
        </div>

        <div class="result">
          <div class="line">
            <span class="k">{{ t('authnAuthz.authnLabel') }}</span>
            <span
              class="v"
              :class="authn.ok ? 'ok' : 'bad'"
            >
              {{ authn.ok ? t('authnAuthz.pass') : t('authnAuthz.fail') }}
            </span>
          </div>
          <div class="line">
            <span class="k">{{ t('authnAuthz.authzLabel') }}</span>
            <span
              class="v"
              :class="authz.ok ? 'ok' : 'bad'"
            >
              {{ authz.ok ? t('authnAuthz.allow') : t('authnAuthz.deny') }}
            </span>
          </div>
          <div class="line">
            <span class="k">HTTP</span>
            <span class="v mono">{{ finalStatus }}</span>
          </div>
        </div>

        <pre class="code"><code>{{ decisionLog }}</code></pre>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        {{ t('authnAuthz.keyPointsTitle') }}
      </div>
      <ul class="list">
        <li
          v-for="item in keyPoints"
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
const users = computed(() => messages.value.authnAuthz.users)
const actions = computed(() => messages.value.authnAuthz.actions)
const keyPoints = computed(() => messages.value.authnAuthz.keyPoints)

const userId = ref('anon')
const actionId = ref('view_profile')

const authn = computed(() => {
  if (userId.value === 'anon')
    return { ok: false, reason: t('authnAuthz.missingCredential') }
  return { ok: true, reason: t('authnAuthz.identifiedAs', { id: userId.value }) }
})

const authz = computed(() => {
  if (!authn.value.ok)
    return { ok: false, reason: t('authnAuthz.authnFailed') }
  if (actionId.value === 'delete_user') {
    return userId.value === 'admin'
      ? { ok: true, reason: t('authnAuthz.adminDeleteAllowed') }
      : { ok: false, reason: t('authnAuthz.adminOnlyDelete') }
  }
  return { ok: true, reason: t('authnAuthz.loggedInAllowed') }
})

const finalStatus = computed(() => {
  if (!authn.value.ok) return '401 Unauthorized'
  if (!authz.value.ok) return '403 Forbidden'
  return '200 OK'
})

const decisionLog = computed(() => {
  const lines = []
  lines.push(`Request: ${actionId.value}`)
  lines.push(
    `AuthN: ${authn.value.ok ? 'PASS' : 'FAIL'} - ${authn.value.reason}`
  )
  lines.push(
    `AuthZ: ${authz.value.ok ? 'ALLOW' : 'DENY'} - ${authz.value.reason}`
  )
  lines.push(`Result: ${finalStatus.value}`)
  return lines.join('\n')
})
</script>

<style scoped>
.authn-authz-demo {
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

.label {
  display: block;
  font-weight: 800;
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  margin: 0.75rem 0 0.35rem;
}

.row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.chip {
  padding: 0.4rem 0.65rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-weight: 700;
  font-size: 0.875rem;
}

.chip.active {
  border-color: rgba(var(--vp-c-brand-rgb), 0.35);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.12);
}

.hint {
  margin-top: 0.75rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.7;
}

.result {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
}

.line {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.35rem 0;
}

.k {
  color: var(--vp-c-text-2);
  font-weight: 700;
}

.v {
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.v.ok {
  color: var(--vp-c-green-1, #22c55e);
}

.v.bad {
  color: var(--vp-c-red-1, #ef4444);
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
