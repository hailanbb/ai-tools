<template>
  <div class="idempotence-demo">
    <div class="demo-header">
      <span class="icon">🔄</span>
      <span class="title">{{ t('idempotence.title') }}</span>
      <span class="subtitle">{{ t('idempotence.subtitle') }}</span>
    </div>

    <div class="scenario-switch">
      <button
        class="scenario-btn"
        :class="{ active: scenario === 'transfer' }"
        @click="scenario = 'transfer'"
      >
        {{ t('idempotence.transferTab') }}
      </button>
      <button
        class="scenario-btn"
        :class="{ active: scenario === 'elevator' }"
        @click="scenario = 'elevator'"
      >
        {{ t('idempotence.elevatorTab') }}
      </button>
    </div>

    <div class="demo-content">
      <div
        v-if="scenario === 'transfer'"
        class="transfer-scenario"
      >
        <div class="scenario-header">
          <div class="title">
            {{ t('idempotence.transferTitle') }}
          </div>
          <div class="subtitle">
            {{ t('idempotence.transferSubtitle') }}
          </div>
        </div>

        <div class="account-system">
          <div class="account-card sender">
            <div class="account-name">
              {{ t('idempotence.sender') }}
            </div>
            <div class="account-balance">
              {{ t('idempotence.balance') }}<span class="balance-amount">{{ senderBalance }}</span>
            </div>
          </div>

          <div class="transfer-flow">
            <div
              class="flow-animation"
              :class="{ active: isTransferring }"
            >
              <div class="money-icon">
                💰
              </div>
              <div class="flow-label">
                {{ t('idempotence.transferAmount') }}
              </div>
            </div>
            <div
              v-if="retryCount > 0"
              class="retry-info"
            >
              <div class="retry-badge">
                {{ t('idempotence.retryTimes', { count: retryCount }) }}
              </div>
            </div>
          </div>

          <div class="account-card receiver">
            <div class="account-name">
              {{ t('idempotence.receiver') }}
            </div>
            <div class="account-balance">
              {{ t('idempotence.balance') }}<span class="balance-amount">{{ receiverBalance }}</span>
            </div>
          </div>
        </div>

        <div class="control-panel">
          <div class="control-row">
            <div class="control-item">
              <label>{{ t('idempotence.protection') }}</label>
              <div class="toggle-switch">
                <button
                  class="toggle-btn"
                  :class="{ active: useIdempotence }"
                  @click="useIdempotence = !useIdempotence"
                >
                  <span class="toggle-slider" />
                </button>
                <span class="toggle-label">{{ useIdempotence ? t('idempotence.enabled') : t('idempotence.disabled') }}</span>
              </div>
            </div>

            <button
              class="action-btn"
              :disabled="isTransferring"
              @click="simulateTransfer"
            >
              {{ isTransferring ? t('idempotence.processing') : t('idempotence.simulateDuplicate') }}
            </button>
          </div>

          <div
            v-if="useIdempotence"
            class="idempotence-info"
          >
            <div class="info-item">
              <span class="info-icon">🔑</span>
              <span class="info-text">{{ t('idempotence.uniqueIdInfo') }}</span>
            </div>
          </div>
        </div>

        <div class="result-log">
          <div class="log-header">
            {{ t('idempotence.logTitle') }}
          </div>
          <div class="log-list">
            <div
              v-for="(log, index) in logs"
              :key="index"
              class="log-item"
              :class="log.type"
            >
              <span class="log-time">{{ log.time }}</span>
              <span class="log-message">{{ log.message }}</span>
            </div>
            <div
              v-if="logs.length === 0"
              class="log-empty"
            >
              {{ t('idempotence.emptyLog') }}
            </div>
          </div>
        </div>

        <div class="comparison-box">
          <div class="comparison-item bad">
            <div class="comp-header">
              {{ t('idempotence.noProtection') }}
            </div>
            <div class="comp-body">
              <div class="comp-result">
                {{ t('idempotence.debit', { amount: (retryCount + 1) * 100 }) }}
              </div>
              <div class="comp-desc">
                {{ t('idempotence.duplicateDebit') }}
              </div>
            </div>
          </div>
          <div class="comparison-item good">
            <div class="comp-header">
              {{ t('idempotence.withProtection') }}
            </div>
            <div class="comp-body">
              <div class="comp-result">
                {{ t('idempotence.debit', { amount: 100 }) }}
              </div>
              <div class="comp-desc">
                {{ t('idempotence.filteredOnce') }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else
        class="elevator-scenario"
      >
        <div class="scenario-header">
          <div class="title">
            {{ t('idempotence.elevatorTitle') }}
          </div>
          <div class="subtitle">
            {{ t('idempotence.elevatorSubtitle') }}
          </div>
        </div>

        <div class="elevator-system">
          <div class="elevator-panel">
            <div class="panel-title">
              {{ t('idempotence.elevatorPanel') }}
            </div>
            <div class="button-grid">
              <button
                v-for="floor in floors"
                :key="floor"
                class="floor-btn"
                :class="{ active: selectedFloor === floor }"
                @click="pressFloor(floor)"
              >
                {{ floor }}F
              </button>
            </div>
            <div class="press-count">
              <span class="count-label">{{ t('idempotence.pressedPrefix') }}</span>
              <span class="count-value">{{ pressCount }}</span>
              <span class="count-label">{{ t('idempotence.pressedSuffix') }}</span>
            </div>
          </div>

          <div class="elevator-shaft">
            <div class="floor-marks">
              <div
                v-for="floor in floors"
                :key="floor"
                class="floor-mark"
                :class="{ current: elevatorFloor === floor }"
              >
                <span class="floor-num">{{ floor }}F</span>
              </div>
            </div>
            <div
              class="elevator-car"
              :style="{ bottom: elevatorPosition }"
            >
              <div class="car-icon">
                🛗
              </div>
            </div>
          </div>
        </div>

        <div class="control-panel">
          <div class="control-item">
            <label>{{ t('idempotence.rapidPress') }}</label>
            <button
              class="action-btn"
              @click="pressMultipleTimes"
            >
              {{ t('idempotence.clickRepeatedly') }}
            </button>
          </div>
          <div class="info-text">
            <span class="info-icon">💡</span>
            {{ t('idempotence.elevatorInfo', { count: pressCount }) }}
          </div>
        </div>

        <div class="explanation-box">
          <div class="explanation-title">
            {{ t('idempotence.whyElevator') }}
          </div>
          <div class="explanation-list">
            <div
              v-for="item in explanations"
              :key="item"
              class="explanation-item"
            >
              <span class="icon">✅</span>
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="principle-box">
      <div class="principle-icon">
        🎯
      </div>
      <div class="principle-content">
        <strong>{{ t('idempotence.principleTitle') }}</strong>
        {{ scenario === 'transfer'
          ? t('idempotence.transferPrinciple')
          : t('idempotence.elevatorPrinciple') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { queueDesignLocale } from '../../../locales/queue-design/index.js'

const { t, messages } = useI18n(queueDesignLocale)

const scenario = ref('transfer')

const senderBalance = ref(1000)
const receiverBalance = ref(500)
const isTransferring = ref(false)
const useIdempotence = ref(false)
const retryCount = ref(0)
const logs = ref([])

const addLog = (message, type = 'info') => {
  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  logs.value.unshift({ time, message, type })
}

const simulateTransfer = () => {
  if (isTransferring.value) return

  isTransferring.value = true
  retryCount.value = 0
  logs.value = []

  const originalSenderBalance = senderBalance.value
  const originalReceiverBalance = receiverBalance.value

  addLog(t('idempotence.logRequest'), 'info')

  const processTransfer = (attempt) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        retryCount.value = attempt

        if (useIdempotence.value) {
          if (attempt === 0) {
            senderBalance.value = originalSenderBalance - 100
            receiverBalance.value = originalReceiverBalance + 100
            addLog(t('idempotence.logSuccess', { attempt: attempt + 1 }), 'success')
            addLog(t('idempotence.logRecorded'), 'info')
          } else {
            addLog(t('idempotence.logDuplicate', { attempt: attempt + 1 }), 'warning')
          }
        } else {
          senderBalance.value -= 100
          receiverBalance.value += 100
          addLog(t('idempotence.logTransfer', { attempt: attempt + 1 }), attempt === 0 ? 'success' : 'error')
        }

        if (attempt < 2) {
          setTimeout(() => processTransfer(attempt + 1), 1000)
        } else {
          setTimeout(() => {
            isTransferring.value = false
          }, 500)
        }

        resolve()
      }, 1000)
    })
  }

  processTransfer(0)
}

const floors = [1, 2, 3, 4, 5]
const selectedFloor = ref(null)
const elevatorFloor = ref(1)
const pressCount = ref(0)
const explanations = computed(() => messages.value.idempotence.explanations)

const elevatorPosition = computed(() => {
  return ((elevatorFloor.value - 1) / 4) * 100 + '%'
})

const pressFloor = (floor) => {
  pressCount.value++
  selectedFloor.value = floor

  setTimeout(() => {
    elevatorFloor.value = floor
  }, 500)
}

const pressMultipleTimes = () => {
  const targetFloor = Math.floor(Math.random() * 5) + 1
  let count = 0
  const interval = setInterval(() => {
    pressFloor(targetFloor)
    count++
    if (count >= 3) {
      clearInterval(interval)
    }
  }, 200)
}
</script>

<style scoped>
.idempotence-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 20px;
  margin: 20px 0;
  font-family: var(--vp-font-family-base);
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.demo-header .icon {
  font-size: 24px;
}

.demo-header .title {
  font-weight: 700;
  font-size: 18px;
  color: var(--vp-c-text-1);
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 14px;
  margin-left: 8px;
}

.scenario-switch {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.scenario-btn {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s;
}

.scenario-btn:hover {
  border-color: var(--vp-c-brand);
}

.scenario-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.scenario-header {
  text-align: center;
  margin-bottom: 20px;
}

.scenario-header .title {
  font-weight: 700;
  font-size: 18px;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
}

.scenario-header .subtitle {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.account-system {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin-bottom: 20px;
  padding: 24px;
  background: var(--vp-c-bg);
  border-radius: 12px;
}

.account-card {
  flex: 1;
  max-width: 200px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-brand);
  border-radius: 12px;
  text-align: center;
}

.account-name {
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 10px;
}

.account-balance {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.balance-amount {
  font-weight: 700;
  font-size: 18px;
  color: var(--vp-c-brand);
}

.transfer-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.flow-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border-radius: 6px;
  transition: all 0.3s;
}

.flow-animation.active {
  background: rgba(59, 130, 246, 0.1);
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.money-icon {
  font-size: 32px;
}

.flow-label {
  font-weight: 600;
  font-size: 13px;
}

.retry-info {
  display: flex;
  justify-content: center;
}

.retry-badge {
  padding: 4px 10px;
  background: var(--vp-c-warning);
  color: white;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
}

.control-panel {
  background: var(--vp-c-bg);
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
}

.control-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}

.control-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.control-item label {
  font-weight: 600;
  font-size: 14px;
}

.toggle-switch {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toggle-btn {
  position: relative;
  width: 48px;
  height: 26px;
  background: var(--vp-c-divider);
  border: none;
  border-radius: 13px;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s;
}

.toggle-btn.active {
  background: var(--vp-c-brand);
}

.toggle-slider {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: all 0.3s;
}

.toggle-btn.active .toggle-slider {
  left: 25px;
}

.toggle-label {
  font-size: 13px;
  font-weight: 600;
}

.action-btn {
  padding: 10px 20px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  transition: all 0.2s;
}

.action-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.idempotence-info {
  margin-top: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 6px;
  font-size: 13px;
}

.info-icon {
  font-size: 16px;
}

.info-text {
  flex: 1;
}

.result-log {
  background: var(--vp-c-bg);
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
}

.log-header {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 10px;
}

.log-list {
  max-height: 200px;
  
}

.log-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-bottom: 6px;
}

.log-item.success {
  background: rgba(34, 197, 94, 0.1);
}

.log-item.error {
  background: rgba(239, 68, 68, 0.1);
}

.log-item.warning {
  background: rgba(245, 158, 11, 0.1);
}

.log-time {
  color: var(--vp-c-text-3);
  font-family: monospace;
}

.log-message {
  flex: 1;
}

.log-empty {
  text-align: center;
  padding: 20px;
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.comparison-box {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.comparison-item {
  padding: 16px;
  border-radius: 6px;
  text-align: center;
}

.comparison-item.bad {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.comparison-item.good {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.comp-header {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 10px;
}

.comp-result {
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 6px;
}

.comp-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.elevator-system {
  display: flex;
  gap: 24px;
  margin-bottom: 20px;
  padding: 24px;
  background: var(--vp-c-bg);
  border-radius: 12px;
}

.elevator-panel {
  flex: 1;
  max-width: 250px;
}

.panel-title {
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  margin-bottom: 16px;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 16px;
}

.floor-btn {
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s;
}

.floor-btn:hover {
  border-color: var(--vp-c-brand);
}

.floor-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.press-count {
  text-align: center;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.count-label {
  font-size: 12px;
}

.count-value {
  font-weight: 700;
  font-size: 18px;
  color: var(--vp-c-brand);
}

.elevator-shaft {
  flex: 1;
  position: relative;
  height: 300px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 20px;
}

.floor-marks {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.floor-mark {
  display: flex;
  align-items: center;
  gap: 8px;
}

.floor-num {
  font-weight: 600;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.floor-mark.current .floor-num {
  color: var(--vp-c-brand);
  font-weight: 700;
}

.elevator-car {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  transition: bottom 0.5s ease;
}

.car-icon {
  font-size: 32px;
  animation: bounce 0.5s ease;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.info-text {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.explanation-box {
  background: var(--vp-c-bg);
  padding: 16px;
  border-radius: 6px;
}

.explanation-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 12px;
}

.explanation-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.explanation-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  line-height: 1.6;
}

.explanation-item .icon {
  flex-shrink: 0;
}

.principle-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 6px;
  font-size: 14px;
  color: var(--vp-c-text-1);
  margin-top: 16px;
}

.principle-icon {
  font-size: 24px;
}

.principle-content {
  flex: 1;
}
</style>
