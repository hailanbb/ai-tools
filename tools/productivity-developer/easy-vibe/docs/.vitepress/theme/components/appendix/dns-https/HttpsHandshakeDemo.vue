<template>
  <div class="https-handshake-demo">
    <h4 style="margin: 0 0 12px 0; color: #1a1a2e">
      {{ t('handshake.title') }}
    </h4>
    <div class="control-row">
      <button class="start-btn" :disabled="isRunning" @click="startHandshake">
        {{ isRunning ? t('handshake.running') : t('handshake.start') }}
      </button>
      <button class="reset-btn" @click="reset">{{ t('handshake.reset') }}</button>
    </div>

    <div class="handshake-area">
      <div class="side client-side">
        <div class="side-icon">💻</div>
        <div class="side-label">{{ t('handshake.client') }}</div>
      </div>

      <div class="message-lane">
        <div
          v-for="(msg, idx) in messages"
          :key="idx"
          class="msg-row"
          :class="{
            active: currentStep === idx,
            done: currentStep > idx,
            pending: currentStep < idx
          }"
        >
          <div
            class="msg-arrow"
            :class="msg.direction === 'right' ? 'arrow-right' : 'arrow-left'"
          >
            <span class="arrow-line"></span>
            <span class="arrow-head">{{ msg.direction === 'right' ? '→' : '←' }}</span>
          </div>
          <div class="msg-content">
            <div class="msg-name">{{ msg.name }}</div>
            <div class="msg-desc">{{ msg.desc }}</div>
          </div>
        </div>
      </div>

      <div class="side server-side">
        <div class="side-icon">🖥️</div>
        <div class="side-label">{{ t('handshake.server') }}</div>
      </div>
    </div>

    <div v-if="currentStep >= 0 && currentStep < messages.length" class="detail-box">
      <div class="detail-title">
        {{ messages[currentStep].name }}
      </div>
      <div class="detail-text">
        {{ messages[currentStep].detail }}
      </div>
    </div>

    <div v-if="handshakeDone" class="success-box">
      {{ t('handshake.success') }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { dnsHttpsLocale } from '../../../locales/dns-https/index.js'

const isRunning = ref(false)
const currentStep = ref(-1)
const handshakeDone = ref(false)
const { t, messages: localeMessages } = useI18n(dnsHttpsLocale)

const messages = computed(() => localeMessages.value.handshake.messages)

async function startHandshake() {
  if (isRunning.value) return
  isRunning.value = true
  handshakeDone.value = false
  currentStep.value = -1

  for (let i = 0; i < messages.value.length; i++) {
    currentStep.value = i
    await sleep(1200)
  }

  handshakeDone.value = true
  isRunning.value = false
}

function reset() {
  isRunning.value = false
  currentStep.value = -1
  handshakeDone.value = false
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}
</script>

<style scoped>
.https-handshake-demo {
  background: linear-gradient(135deg, #e3f2fd 0%, #e8eaf6 100%);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  font-family: system-ui, sans-serif;
}

.control-row {
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
}

.start-btn {
  padding: 8px 20px;
  background: #1565c0;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.start-btn:hover:not(:disabled) {
  background: #0d47a1;
}

.start-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.reset-btn {
  padding: 8px 16px;
  background: #e0e0e0;
  color: #333;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.handshake-area {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.side {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
  padding-top: 10px;
}

.side-icon {
  font-size: 36px;
}

.side-label {
  font-size: 12px;
  font-weight: 600;
  color: #333;
  margin-top: 4px;
  text-align: center;
}

.message-lane {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.msg-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 8px;
  background: #fff;
  border: 2px solid transparent;
  opacity: 0.35;
  transition: all 0.4s;
}

.msg-row.active {
  opacity: 1;
  border-color: #ff9800;
  background: #fff8e1;
  transform: scale(1.02);
  box-shadow: 0 3px 10px rgba(255, 152, 0, 0.2);
}

.msg-row.done {
  opacity: 1;
  border-color: #4caf50;
  background: #e8f5e9;
}

.msg-arrow {
  display: flex;
  align-items: center;
  min-width: 36px;
  font-size: 18px;
  font-weight: bold;
}

.arrow-right {
  color: #1565c0;
}

.arrow-left {
  color: #e65100;
}

.msg-name {
  font-weight: 700;
  font-size: 14px;
  color: #1a1a2e;
}

.msg-desc {
  font-size: 12px;
  color: #666;
  margin-top: 2px;
}

.detail-box {
  margin-top: 14px;
  padding: 14px 18px;
  background: #fff;
  border-radius: 10px;
  border-left: 4px solid #1565c0;
}

.detail-title {
  font-weight: 700;
  color: #1565c0;
  margin-bottom: 6px;
  font-size: 15px;
}

.detail-text {
  font-size: 13px;
  color: #444;
  line-height: 1.7;
}

.success-box {
  margin-top: 14px;
  padding: 12px 18px;
  background: #e8f5e9;
  border-radius: 10px;
  border: 1px solid #a5d6a7;
  color: #2e7d32;
  font-weight: 600;
  font-size: 14px;
}
</style>
