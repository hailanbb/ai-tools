<template>
  <div class="access-key-management-demo">
    <div class="demo-header">
      <span class="icon">🔑</span>
      <span class="title">{{ t('accessKey.title') }}</span>
      <span class="subtitle">{{ t('accessKey.subtitle') }}</span>
    </div>

    <div class="main-area">
      <div class="aksk-card">
        <div class="card-header">
          <span
            class="status-badge"
            :class="akStatus"
          >{{ statusText }}</span>
          <span class="age">{{ t('accessKey.createdAge', { days: akAge }) }}</span>
        </div>
        <div class="credentials">
          <div class="cred-row">
            <span class="label">Access Key:</span>
            <span class="value">{{ maskedAK }}</span>
            <button
              class="toggle-btn"
              @click="showAK = !showAK"
            >
              {{ showAK ? '🙈' : '👁️' }}
            </button>
          </div>
          <div class="cred-row">
            <span class="label">Secret Key:</span>
            <span class="value">{{ maskedSK }}</span>
            <button
              class="toggle-btn"
              @click="showSK = !showSK"
            >
              {{ showSK ? '🙈' : '👁️' }}
            </button>
          </div>
        </div>
        <div class="stats">
          <div class="stat">
            <span class="v">{{ apiCalls }}</span><span class="l">{{ t('accessKey.apiCalls') }}</span>
          </div>
          <div class="stat">
            <span class="v">{{ lastUsedText }}</span><span class="l">{{ t('accessKey.lastUsedLabel') }}</span>
          </div>
        </div>
      </div>

      <div class="action-panel">
        <button
          class="btn primary"
          :disabled="isRotating"
          @click="rotateKey"
        >
          {{ t('accessKey.rotate') }}
        </button>
        <button
          class="btn warning"
          :disabled="akStatus === 'inactive'"
          @click="deactivateKey"
        >
          {{ t('accessKey.deactivate') }}
        </button>
        <button
          class="btn danger"
          @click="deleteKey"
        >
          {{ t('accessKey.delete') }}
        </button>
      </div>
    </div>

    <div
      v-if="isRotating"
      class="rotation-bar"
    >
      <div class="bar">
        <div
          class="fill"
          :style="{ width: rotationProgress + '%' }"
        />
      </div>
      <span class="text">{{ rotationStatus }}</span>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.coreIdea') }}</strong>{{ t('accessKey.info') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { cloudIamLocale } from '../../../locales/cloud-iam/index.js'

const { t } = useI18n(cloudIamLocale)

const akId = ref('AKIAIOSFODNN7EXAMPLE')
const skId = ref('wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY')
const akStatus = ref('active')
const akAge = ref(45)
const apiCalls = ref(123456)
const lastUsedState = ref('initial')
const showAK = ref(false)
const showSK = ref(false)
const isRotating = ref(false)
const rotationProgress = ref(0)
const rotationStatus = ref('')

const maskedAK = computed(() => showAK.value ? akId.value : akId.value.substring(0, 8) + '...')
const maskedSK = computed(() => showSK.value ? skId.value : '************************************')
const lastUsedText = computed(() => t(`accessKey.lastUsed.${lastUsedState.value}`))
const statusText = computed(() => t(`accessKey.statuses.${akStatus.value}`) || akStatus.value)

async function rotateKey() {
  isRotating.value = true
  rotationProgress.value = 0
  rotationStatus.value = t('accessKey.rotation.generate')
  await simulateProgress(30, t('accessKey.rotation.create'))
  await simulateProgress(60, t('accessKey.rotation.update'))
  await simulateProgress(100, t('accessKey.rotation.verify'))
  akId.value = 'AKIA' + Math.random().toString(36).substring(2, 14).toUpperCase()
  akAge.value = 0
  apiCalls.value = 0
  lastUsedState.value = 'now'
  isRotating.value = false
}

function simulateProgress(target, status) {
  return new Promise(resolve => {
    rotationStatus.value = status
    const interval = setInterval(() => {
      rotationProgress.value += 2
      if (rotationProgress.value >= target) { clearInterval(interval); resolve() }
    }, 30)
  })
}

function deactivateKey() {
  if (confirm(t('accessKey.confirmDeactivate'))) akStatus.value = 'inactive'
}

function deleteKey() {
  if (confirm(t('accessKey.confirmDelete'))) alert(t('accessKey.deleted'))
}
</script>

<style scoped>
.access-key-management-demo {
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
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 640px) {
  .main-area { grid-template-columns: 1fr; }
}

.aksk-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.status-badge {
  padding: 0.15rem 0.5rem;
  border-radius: 3px;
  font-size: 0.7rem;
  font-weight: 600;
}

.status-badge.active { background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); }
.status-badge.inactive { background: rgba(239, 68, 68, 0.15); color: #dc2626; }

.age { font-size: 0.7rem; color: var(--vp-c-text-3); }

.credentials { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 0.5rem; }

.cred-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.cred-row .label { font-size: 0.7rem; color: var(--vp-c-text-3); min-width: 80px; }
.cred-row .value {
  flex: 1;
  padding: 0.3rem 0.5rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
  color: var(--vp-c-text-1);
}

.toggle-btn {
  padding: 0.25rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}

.stats {
  display: flex;
  gap: 1rem;
  padding-top: 0.4rem;
  border-top: 1px solid var(--vp-c-divider);
}

.stat { display: flex; flex-direction: column; }
.stat .v { font-size: 0.9rem; font-weight: 700; color: var(--vp-c-brand-1); }
.stat .l { font-size: 0.65rem; color: var(--vp-c-text-3); }

.action-panel { display: flex; flex-direction: column; gap: 0.4rem; }

.btn {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  text-align: left;
}

.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn.primary { background: var(--vp-c-brand); border-color: var(--vp-c-brand); color: #fff; }
.btn.warning { background: rgba(234, 179, 8, 0.1); border-color: #eab308; color: #ca8a04; }
.btn.danger { background: rgba(239, 68, 68, 0.1); border-color: #dc2626; color: #dc2626; }

.rotation-bar {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.6rem;
  margin-bottom: 0.75rem;
}

.bar {
  height: 6px;
  background: var(--vp-c-bg-alt);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.4rem;
}

.fill {
  height: 100%;
  background: var(--vp-c-brand);
  transition: width 0.2s;
}

.text { display: block; text-align: center; font-size: 0.8rem; color: var(--vp-c-text-2); }

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
