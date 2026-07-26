<template>
  <div class="password-hashing-demo">
    <div class="header">
      <div class="title">
        {{ t('passwordHashing.title') }}
      </div>
      <div class="subtitle">
        {{ t('passwordHashing.subtitle') }}
      </div>
    </div>

    <div class="grid">
      <div class="card">
        <div class="card-title">
          {{ t('passwordHashing.inputTitle') }}
        </div>

        <label class="label">{{ t('passwordHashing.passwordLabel') }}</label>
        <input
          v-model="password"
          type="password"
          class="input"
          :placeholder="t('passwordHashing.placeholder')"
          @input="debouncedRecompute"
        >

        <div class="row">
          <div class="col">
            <label class="label">
              {{ t('passwordHashing.iterationsLabel') }}<strong>{{ iterations }}</strong>
            </label>
            <input
              v-model.number="iterations"
              class="range"
              type="range"
              min="1000"
              max="200000"
              step="1000"
              @input="debouncedRecompute"
            >
            <div class="hint">
              {{ t('passwordHashing.iterationsHint') }}
            </div>
          </div>
        </div>

        <div class="row">
          <label class="toggle">
            <input
              v-model="saltEnabled"
              type="checkbox"
              @change="recompute"
            >
            <span>{{ t('passwordHashing.enableSalt') }}</span>
          </label>
          <button
            class="btn"
            :disabled="!saltEnabled"
            @click="regenSalt"
          >
            {{ t('passwordHashing.regenSalt') }}
          </button>
        </div>

        <div class="mono-box">
          <div class="mono-label">
            salt
          </div>
          <code class="mono">{{ saltEnabled ? saltHex : '(disabled)' }}</code>
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          {{ t('passwordHashing.outputTitle') }}
        </div>

        <div class="status">
          <span class="badge">Algorithm: PBKDF2-SHA256</span>
          <span class="badge">Time: {{ timeMs }}ms</span>
        </div>

        <div class="mono-box">
          <div class="mono-label">
            derived key (hex)
          </div>
          <code class="mono">{{ hashHex || t('passwordHashing.emptyHash') }}</code>
        </div>

        <div class="alert">
          <div class="alert-title">
            {{ t('passwordHashing.conclusionTitle') }}
          </div>
          <div class="alert-text">
            {{ t('passwordHashing.conclusion') }}
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        {{ t('passwordHashing.rainbowTitle') }}
      </div>
      <div class="two">
        <div class="mono-box">
          <div class="mono-label">
            salt A
          </div>
          <code class="mono">{{ saltA }}</code>
          <div class="mono-label">
            hash A
          </div>
          <code class="mono">{{ hashA || '-' }}</code>
        </div>
        <div class="mono-box">
          <div class="mono-label">
            salt B
          </div>
          <code class="mono">{{ saltB }}</code>
          <div class="mono-label">
            hash B
          </div>
          <code class="mono">{{ hashB || '-' }}</code>
        </div>
      </div>
      <div class="hint">
        {{ t('passwordHashing.rainbowHint') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { authDesignLocale } from '../../../locales/auth-design/index.js'

const { t } = useI18n(authDesignLocale)

const password = ref('')
const iterations = ref(60000)
const saltEnabled = ref(true)
const saltHex = ref('')

const hashHex = ref('')
const timeMs = ref(0)

let recomputeTimer = null

const toHex = (bytes) =>
  [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('')

const fromHex = (hex) => {
  const clean = hex.trim().replace(/^0x/, '')
  if (!clean) return new Uint8Array()
  const out = new Uint8Array(clean.length / 2)
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16)
  }
  return out
}

const randomSaltHex = (len = 16) => {
  const bytes = new Uint8Array(len)
  crypto.getRandomValues(bytes)
  return toHex(bytes)
}

const derive = async ({ pwd, iters, salt }) => {
  const enc = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(pwd),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  )
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: iters, hash: 'SHA-256' },
    keyMaterial,
    256
  )
  return toHex(new Uint8Array(bits))
}

const recompute = async () => {
  if (!password.value) {
    hashHex.value = ''
    timeMs.value = 0
    await recomputeRainbow()
    return
  }

  const saltBytes = saltEnabled.value
    ? fromHex(saltHex.value)
    : new Uint8Array(16) // "no salt" demonstration: constant all-zero salt

  const start = performance.now()
  try {
    hashHex.value = await derive({
      pwd: password.value,
      iters: iterations.value,
      salt: saltBytes
    })
  } finally {
    timeMs.value = Math.max(0, Math.round(performance.now() - start))
  }

  await recomputeRainbow()
}

const debouncedRecompute = () => {
  if (recomputeTimer) clearTimeout(recomputeTimer)
  recomputeTimer = setTimeout(() => {
    recompute()
  }, 200)
}

const regenSalt = () => {
  saltHex.value = randomSaltHex(16)
  recompute()
}

// Rainbow demo
const saltA = ref('')
const saltB = ref('')
const hashA = ref('')
const hashB = ref('')

const recomputeRainbow = async () => {
  if (!password.value) {
    hashA.value = ''
    hashB.value = ''
    return
  }
  const a = fromHex(saltA.value)
  const b = fromHex(saltB.value)
  hashA.value = await derive({ pwd: password.value, iters: 30000, salt: a })
  hashB.value = await derive({ pwd: password.value, iters: 30000, salt: b })
}

onMounted(() => {
  saltHex.value = randomSaltHex(16)
  saltA.value = randomSaltHex(16)
  saltB.value = randomSaltHex(16)
})
</script>

<style scoped>
.password-hashing-demo {
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
  font-size: 1.1rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-top: 0.25rem;
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
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
}

.label {
  display: block;
  font-weight: 700;
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  margin-bottom: 0.35rem;
}

.input {
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem 0.6rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.range {
  width: 100%;
}

.row {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-top: 0.75rem;
  flex-wrap: wrap;
}

.col {
  flex: 1;
  min-width: 240px;
}

.toggle {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.btn {
  padding: 0.45rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-weight: 600;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.status {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.badge {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  border-radius: 999px;
  padding: 0.2rem 0.6rem;
  font-size: 0.8rem;
  font-family: var(--vp-font-family-mono);
}

.mono-box {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
  overflow-x: auto;
}

.mono-label {
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
}

.mono {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
}

.alert {
  margin-top: 0.75rem;
  border: 1px solid rgba(var(--vp-c-brand-rgb), 0.18);
  background: rgba(var(--vp-c-brand-rgb), 0.06);
  border-radius: 6px;
  padding: 0.75rem;
}

.alert-title {
  font-weight: 800;
  margin-bottom: 0.35rem;
  color: var(--vp-c-text-1);
}

.alert-text {
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.two {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.hint {
  margin-top: 0.75rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.7;
}

@media (max-width: 720px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .two {
    grid-template-columns: 1fr;
  }
}
</style>
