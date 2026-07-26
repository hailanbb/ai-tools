<template>
  <div class="reliability-demo">
    <div class="demo-header">
      <span class="icon">🛡️</span>
      <span class="title">{{ t('reliability.title') }}</span>
      <span class="subtitle">{{ t('reliability.subtitle') }}</span>
    </div>

    <div class="defense-system">
      <div class="defense-line">
        <div class="defense-header">
          <div class="defense-badge line1">
            {{ t('reliability.line1') }}
          </div>
          <div class="defense-title">
            {{ t('reliability.producerAck') }}
          </div>
        </div>
        <div class="defense-content">
          <div class="flow-diagram">
            <div class="component producer">
              <div class="comp-icon">
                📤
              </div>
              <div class="comp-label">
                {{ t('reliability.producer') }}
              </div>
              <div class="comp-desc">
                {{ t('reliability.sendMessage') }}
              </div>
            </div>

            <div class="message-flow">
              <div
                class="msg-item"
                :class="{ active: step === 1 }"
              >
                <div class="msg-icon">
                  📨
                </div>
                <div class="msg-label">
                  {{ t('reliability.message') }}
                </div>
                <div
                  v-if="step === 1"
                  class="msg-status"
                >
                  {{ ackStatus }}
                </div>
              </div>

              <div
                class="ack-item"
                :class="{ active: step === 2 }"
              >
                <div class="ack-icon">
                  ✓
                </div>
                <div class="ack-label">
                  {{ t('reliability.ackConfirm') }}
                </div>
                <div
                  v-if="step === 2"
                  class="ack-status"
                >
                  {{ ackMessage }}
                </div>
              </div>
            </div>

            <div class="component broker">
              <div class="comp-icon">
                📦
              </div>
              <div class="comp-label">
                {{ t('reliability.broker') }}
              </div>
              <div class="comp-desc">
                {{ t('reliability.receiveAndStore') }}
              </div>
            </div>
          </div>

          <div class="control-panel">
            <div class="control-item">
              <label>{{ t('reliability.sendMessage') }}</label>
              <button
                class="action-btn"
                :disabled="step > 0"
                @click="sendWithAck"
              >
                {{ t('reliability.sendAndWait') }}
              </button>
            </div>
            <div class="info-text">
              <span class="info-icon">💡</span>
              {{ t('reliability.producerTip') }}
            </div>
          </div>
        </div>
      </div>

      <div class="defense-line">
        <div class="defense-header">
          <div class="defense-badge line2">
            {{ t('reliability.line2') }}
          </div>
          <div class="defense-title">
            {{ t('reliability.brokerPersistence') }}
          </div>
        </div>
        <div class="defense-content">
          <div class="storage-diagram">
            <div class="storage-container">
              <div
                class="storage-option"
                :class="{ active: storageType === 'memory' }"
              >
                <div class="option-icon">
                  ⚡
                </div>
                <div class="option-label">
                  {{ t('reliability.memoryStorage') }}
                </div>
                <div class="option-desc">
                  {{ t('reliability.memoryDesc') }}
                </div>
                <div class="option-risk">
                  {{ t('reliability.highRisk') }}
                </div>
              </div>

              <div class="vs-divider">
                vs
              </div>

              <div
                class="storage-option recommended"
                :class="{ active: storageType === 'disk' }"
              >
                <div class="option-icon">
                  💾
                </div>
                <div class="option-label">
                  {{ t('reliability.diskStorage') }}
                </div>
                <div class="option-desc">
                  {{ t('reliability.diskDesc') }}
                </div>
                <div class="option-risk">
                  {{ t('reliability.recommended') }}
                </div>
              </div>
            </div>

            <div class="replication-info">
              <div class="replication-title">
                <span class="icon">🔄</span>
                {{ t('reliability.replication') }}
              </div>
              <div class="replication-detail">
                {{ t('reliability.replicationDetail') }}
              </div>
            </div>
          </div>

          <div class="control-panel">
            <div class="control-item">
              <label>{{ t('reliability.storageMode') }}</label>
              <div class="btn-group">
                <button
                  class="toggle-btn"
                  :class="{ active: storageType === 'memory' }"
                  @click="storageType = 'memory'"
                >
                  {{ t('reliability.memory') }}
                </button>
                <button
                  class="toggle-btn"
                  :class="{ active: storageType === 'disk' }"
                  @click="storageType = 'disk'"
                >
                  {{ t('reliability.disk') }}
                </button>
              </div>
            </div>
            <div
              class="info-text"
              :class="{ warning: storageType === 'memory' }"
            >
              <span class="info-icon">{{ storageType === 'disk' ? '✅' : '⚠️' }}</span>
              {{ storageType === 'disk' ? t('reliability.diskSafe') : t('reliability.memoryRisk') }}
            </div>
          </div>
        </div>
      </div>

      <div class="defense-line">
        <div class="defense-header">
          <div class="defense-badge line3">
            {{ t('reliability.line3') }}
          </div>
          <div class="defense-title">
            {{ t('reliability.consumerAck') }}
          </div>
        </div>
        <div class="defense-content">
          <div class="consumer-flow">
            <div
              class="flow-step"
              :class="{ active: consumerStep >= 1 }"
            >
              <div class="step-num">
                1
              </div>
              <div class="step-content">
                <div class="step-title">
                  {{ t('reliability.pullMessage') }}
                </div>
                <div class="step-desc">
                  {{ t('reliability.pullDesc') }}
                </div>
              </div>
            </div>

            <div
              class="flow-arrow"
              :class="{ active: consumerStep >= 1 }"
            >
              →
            </div>

            <div
              class="flow-step"
              :class="{ active: consumerStep >= 2 }"
            >
              <div class="step-num">
                2
              </div>
              <div class="step-content">
                <div class="step-title">
                  {{ t('reliability.processMessage') }}
                </div>
                <div class="step-desc">
                  {{ t('reliability.processDesc') }}
                </div>
              </div>
            </div>

            <div
              class="flow-arrow"
              :class="{ active: consumerStep >= 2 }"
            >
              →
            </div>

            <div
              class="flow-step"
              :class="{ active: consumerStep >= 3 }"
            >
              <div class="step-num">
                3
              </div>
              <div class="step-content">
                <div class="step-title">
                  {{ t('reliability.manualAck') }}
                </div>
                <div class="step-desc">
                  {{ t('reliability.manualAckDesc') }}
                </div>
              </div>
            </div>
          </div>

          <div class="ack-comparison">
            <div class="ack-option">
              <div class="ack-type">
                {{ t('reliability.autoAck') }}
              </div>
              <div class="ack-desc">
                {{ t('reliability.autoAckDesc') }}
              </div>
              <div class="ack-risk">
                {{ t('reliability.notRecommended') }}
              </div>
            </div>

            <div class="ack-option recommended">
              <div class="ack-type">
                {{ t('reliability.manualAckSpaced') }}
              </div>
              <div class="ack-desc">
                {{ t('reliability.manualAckReliable') }}
              </div>
              <div class="ack-risk">
                {{ t('reliability.recommended') }}
              </div>
            </div>
          </div>

          <div class="control-panel">
            <div class="control-item">
              <label>{{ t('reliability.simulateConsume') }}</label>
              <button
                class="action-btn"
                :disabled="consumerStep > 0"
                @click="simulateConsume"
              >
                {{ t('reliability.startConsume') }}
              </button>
            </div>
            <div class="info-text">
              <span class="info-icon">💡</span>
              {{ t('reliability.consumeTip') }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="summary-box">
      <div class="summary-icon">
        🎯
      </div>
      <div class="summary-content">
        <strong>{{ t('reliability.summaryTitle') }}</strong>{{ t('reliability.summary') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { queueDesignLocale } from '../../../locales/queue-design/index.js'

const { t } = useI18n(queueDesignLocale)

const step = ref(0)
const ackStatus = ref('')
const ackMessage = ref('')

const storageType = ref('disk')

const consumerStep = ref(0)

const sendWithAck = () => {
  step.value = 1
  ackStatus.value = t('reliability.sending')

  setTimeout(() => {
    step.value = 2
    ackStatus.value = t('reliability.sent')
    ackMessage.value = t('reliability.ackSafe')

    setTimeout(() => {
      step.value = 0
      ackStatus.value = ''
      ackMessage.value = ''
    }, 3000)
  }, 1500)
}

const simulateConsume = () => {
  consumerStep.value = 1

  setTimeout(() => {
    consumerStep.value = 2
    setTimeout(() => {
      consumerStep.value = 3
      setTimeout(() => {
        consumerStep.value = 0
      }, 3000)
    }, 1500)
  }, 1500)
}
</script>

<style scoped>
.reliability-demo {
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
  margin-bottom: 24px;
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

.defense-system {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.defense-line {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
}

.defense-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.defense-badge {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  color: white;
}

.defense-badge.line1 {
  background: #3b82f6
}

.defense-badge.line2 {
  background: #f59e0b
}

.defense-badge.line3 {
  background: #22c55e
}

.defense-title {
  font-weight: 600;
  font-size: 15px;
  color: var(--vp-c-text-1);
}

.defense-content {
  padding: 20px;
}

.flow-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-bottom: 20px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.component {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-brand);
  border-radius: 12px;
  min-width: 120px;
}

.comp-icon {
  font-size: 32px;
}

.comp-label {
  font-weight: 600;
  font-size: 14px;
}

.comp-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.message-flow {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.msg-item,
.ack-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px;
  border-radius: 6px;
  transition: all 0.3s;
}

.msg-item.active {
  background: rgba(59, 130, 246, 0.1);
}

.ack-item.active {
  background: rgba(34, 197, 94, 0.1);
}

.msg-icon,
.ack-icon {
  font-size: 24px;
}

.msg-label,
.ack-label {
  font-size: 12px;
  font-weight: 600;
}

.msg-status,
.ack-status {
  font-size: 11px;
  color: var(--vp-c-text-2);
}

.storage-diagram {
  margin-bottom: 20px;
}

.storage-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-bottom: 16px;
}

.storage-option {
  flex: 1;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s;
}

.storage-option.active {
  border-color: var(--vp-c-brand);
  background: rgba(59, 130, 246, 0.05);
}

.storage-option.recommended {
  border-color: var(--vp-c-success);
}

.storage-option.recommended.active {
  background: rgba(34, 197, 94, 0.05);
}

.option-icon {
  font-size: 36px;
  margin-bottom: 10px;
}

.option-label {
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 6px;
}

.option-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}

.option-risk {
  font-size: 12px;
  font-weight: 600;
}

.vs-divider {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-text-2);
}

.replication-info {
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.replication-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 14px;
}

.replication-icon {
  font-size: 20px;
}

.replication-detail {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.consumer-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 20px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.flow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  min-width: 100px;
  transition: all 0.3s;
}

.flow-step.active {
  border-color: var(--vp-c-brand);
  background: rgba(59, 130, 246, 0.05);
}

.step-num {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}

.step-title {
  font-weight: 600;
  font-size: 13px;
}

.step-desc {
  font-size: 11px;
  color: var(--vp-c-text-2);
}

.flow-arrow {
  font-size: 24px;
  color: var(--vp-c-divider);
  transition: all 0.3s;
}

.flow-arrow.active {
  color: var(--vp-c-brand);
}

.ack-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.ack-option {
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  text-align: center;
}

.ack-option.recommended {
  border-color: var(--vp-c-success);
  background: rgba(34, 197, 94, 0.05);
}

.ack-type {
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 8px;
}

.ack-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}

.ack-risk {
  font-size: 12px;
  font-weight: 600;
}

.control-panel {
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.control-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.control-item label {
  font-weight: 600;
  font-size: 14px;
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

.btn-group {
  display: flex;
  gap: 8px;
}

.toggle-btn {
  padding: 8px 16px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  transition: all 0.2s;
}

.toggle-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand);
  color: white;
}

.info-text {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  padding: 10px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.info-text.warning {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.info-icon {
  font-size: 16px;
}

.summary-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 6px;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.summary-icon {
  font-size: 24px;
}

.summary-content {
  flex: 1;
}
</style>
