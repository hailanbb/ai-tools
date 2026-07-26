<template>
  <div class="mfa-security-demo">
    <div class="demo-header">
      <span class="icon">🔐</span>
      <span class="title">{{ t('mfa.title') }}</span>
      <span class="subtitle">{{ t('mfa.subtitle') }}</span>
    </div>

    <div class="main-area">
      <div class="mfa-flow">
        <div
          class="auth-step"
          :class="{ active: step >= 1, completed: step > 1 }"
        >
          <span class="step-icon">🔐</span>
          <span class="step-label">{{ t('mfa.password') }}</span>
        </div>
        <span class="step-arrow">→</span>
        <div
          class="auth-step"
          :class="{ active: step >= 2, completed: step > 2 }"
        >
          <span class="step-icon">📱</span>
          <span class="step-label">MFA</span>
        </div>
        <span class="step-arrow">→</span>
        <div
          class="auth-step"
          :class="{ active: step >= 3 }"
        >
          <span class="step-icon">✅</span>
          <span class="step-label">{{ t('mfa.success') }}</span>
        </div>
      </div>

      <div
        v-if="step === 1"
        class="auth-panel"
      >
        <div class="panel-title">
          {{ t('mfa.passwordTitle') }}
        </div>
        <input
          v-model="password"
          type="password"
          :placeholder="t('mfa.passwordPlaceholder')"
          @keyup.enter="verifyPassword"
        >
        <button
          :disabled="!password"
          @click="verifyPassword"
        >
          {{ t('mfa.verifyPassword') }}
        </button>
      </div>

      <div
        v-if="step === 2"
        class="auth-panel"
      >
        <div class="panel-title">
          {{ t('mfa.codeTitle') }}
        </div>
        <div class="totp-display">
          <span class="totp-code">{{ totpCode }}</span>
          <div class="totp-hint">
            {{ t('mfa.codeHint') }}
          </div>
        </div>
        <input
          v-model="userCode"
          type="text"
          :placeholder="t('mfa.codePlaceholder')"
          maxlength="6"
          @keyup.enter="verifyMFA"
        >
        <button
          :disabled="userCode.length !== 6"
          @click="verifyMFA"
        >
          {{ t('mfa.verify') }}
        </button>
      </div>

      <div
        v-if="step === 3"
        class="success-panel"
      >
        <span class="success-icon">🎉</span>
        <div class="success-title">
          {{ t('mfa.successTitle') }}
        </div>
        <div class="success-desc">
          {{ t('mfa.successDesc') }}
        </div>
        <button @click="reset">
          {{ t('mfa.reset') }}
        </button>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.coreIdea') }}</strong>{{ t('mfa.info') }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { cloudIamLocale } from '../../../locales/cloud-iam/index.js'

const { t } = useI18n(cloudIamLocale)
const step = ref(1)
const password = ref('')
const userCode = ref('')
const totpCode = ref('123456')

function generateTOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

function verifyPassword() {
  if (password.value) {
    step.value = 2
    totpCode.value = generateTOTP()
  }
}

function verifyMFA() {
  if (userCode.value.length === 6) {
    step.value = 3
  }
}

function reset() {
  step.value = 1
  password.value = ''
  userCode.value = ''
}
</script>

<style scoped>
.mfa-security-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.main-area {
  margin-bottom: 0.75rem;
}

.mfa-flow {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.auth-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.6rem 0.8rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  opacity: 0.5;
  transition: all 0.2s;
}

.auth-step.active {
  opacity: 1;
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.step-icon { font-size: 1.25rem; }
.step-label { font-size: 0.7rem; font-weight: 500; }
.step-arrow { font-size: 1rem; color: var(--vp-c-text-3); }

.auth-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.panel-title {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.auth-panel input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
}

.auth-panel button {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background: var(--vp-c-brand);
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.auth-panel button:disabled { opacity: 0.5; cursor: not-allowed; }
.auth-panel button:hover:not(:disabled) { opacity: 0.9; }

.totp-display {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.5rem;
  text-align: center;
  margin-bottom: 0.5rem;
}

.totp-code {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  font-family: var(--vp-font-family-mono);
  letter-spacing: 0.1em;
  color: var(--vp-c-brand);
}

.totp-hint {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.success-panel {
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
}

.success-icon { font-size: 2rem; display: block; margin-bottom: 0.5rem; }
.success-title { font-size: 1rem; font-weight: 700; color: var(--vp-c-text-1); margin-bottom: 0.25rem; }
.success-desc { font-size: 0.8rem; color: var(--vp-c-text-2); margin-bottom: 0.75rem; }

.success-panel button {
  padding: 0.4rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.8rem;
  cursor: pointer;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box .icon { flex-shrink: 0; }
.info-box strong { color: var(--vp-c-text-1); }
</style>
