<template>
  <div class="dns-resolution-demo">
    <h4 style="margin: 0 0 12px 0; color: #1a1a2e">
      {{ t('resolution.title') }}
    </h4>
    <div class="input-row">
      <input
        v-model="domain"
        type="text"
        :placeholder="t('resolution.placeholder')"
        class="domain-input"
        @keyup.enter="startResolve"
      />
      <button class="resolve-btn" :disabled="isResolving" @click="startResolve">
        {{ isResolving ? t('resolution.resolving') : t('resolution.start') }}
      </button>
      <button class="reset-btn" @click="reset">{{ t('resolution.reset') }}</button>
    </div>

    <div class="resolve-flow">
      <div
        v-for="(step, idx) in steps"
        :key="idx"
        class="step-card"
        :class="{
          active: currentStep === idx,
          done: currentStep > idx,
          pending: currentStep < idx
        }"
      >
        <div class="step-icon">{{ step.icon }}</div>
        <div class="step-label">{{ step.label }}</div>
        <div v-if="currentStep > idx" class="step-result">
          {{ step.result }}
        </div>
        <div v-if="currentStep === idx && isResolving" class="step-spinner">
          ⏳
        </div>
        <div
          v-if="idx < steps.length - 1"
          class="arrow"
          :class="{ 'arrow-active': currentStep > idx }"
        >
          →
        </div>
      </div>
    </div>

    <div v-if="resolved" class="result-box">
      <div class="result-title">{{ t('resolution.completed') }}</div>
      <div class="result-detail">
        <span class="result-domain">{{ domain }}</span>
        →
        <span class="result-ip">{{ resolvedIp }}</span>
      </div>
      <div class="result-time">{{ t('resolution.totalTime', { time: totalTime }) }}</div>
    </div>

    <div class="info-box">
      <strong>{{ t('resolution.infoPrefix') }}</strong>
      {{ t('resolution.infoText') }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { dnsHttpsLocale } from '../../../locales/dns-https/index.js'

const domain = ref('www.example.com')
const isResolving = ref(false)
const resolved = ref(false)
const currentStep = ref(-1)
const resolvedIp = ref('')
const totalTime = ref(0)
const { t, messages } = useI18n(dnsHttpsLocale)

const foundResult = ref('')
const steps = computed(() =>
  messages.value.resolution.steps.map((step, index) => ({
    ...step,
    result: index === messages.value.resolution.steps.length - 1 ? foundResult.value : step.result
  }))
)

function generateIp() {
  const a = 93 + Math.floor(Math.random() * 60)
  const b = Math.floor(Math.random() * 256)
  const c = Math.floor(Math.random() * 256)
  const d = 1 + Math.floor(Math.random() * 254)
  return `${a}.${b}.${c}.${d}`
}

async function startResolve() {
  if (isResolving.value || !domain.value.trim()) return
  isResolving.value = true
  resolved.value = false
  currentStep.value = -1
  const ip = generateIp()
  resolvedIp.value = ip
  foundResult.value = t('resolution.foundRecord', { ip })

  const delays = [200, 300, 400, 500, 400, 300]
  let total = 0

  for (let i = 0; i < steps.value.length; i++) {
    currentStep.value = i
    await sleep(delays[i])
    total += delays[i]
    currentStep.value = i + 1
  }

  totalTime.value = total
  resolved.value = true
  isResolving.value = false
}

function reset() {
  isResolving.value = false
  resolved.value = false
  currentStep.value = -1
  resolvedIp.value = ''
  totalTime.value = 0
  foundResult.value = ''
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
</script>

<style scoped>
.dns-resolution-demo {
  background: linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  font-family: system-ui, sans-serif;
}

.input-row {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.domain-input {
  flex: 1;
  min-width: 200px;
  padding: 8px 14px;
  border: 2px solid #c5cae9;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.domain-input:focus {
  border-color: #5c6bc0;
}

.resolve-btn {
  padding: 8px 20px;
  background: #5c6bc0;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.resolve-btn:hover:not(:disabled) {
  background: #3f51b5;
}

.resolve-btn:disabled {
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

.reset-btn:hover {
  background: #bdbdbd;
}

.resolve-flow {
  display: flex;
  align-items: flex-start;
  gap: 4px;
  overflow-x: auto;
  padding: 10px 0;
  flex-wrap: wrap;
  justify-content: center;
}

.step-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 10px;
  border-radius: 10px;
  background: #fff;
  min-width: 100px;
  max-width: 120px;
  text-align: center;
  transition: all 0.3s;
  border: 2px solid transparent;
  position: relative;
  opacity: 0.5;
}

.step-card.active {
  border-color: #ff9800;
  background: #fff8e1;
  opacity: 1;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
}

.step-card.done {
  border-color: #4caf50;
  background: #e8f5e9;
  opacity: 1;
}

.step-card.pending {
  opacity: 0.4;
}

.step-icon {
  font-size: 28px;
  margin-bottom: 6px;
}

.step-label {
  font-size: 12px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.step-result {
  font-size: 10px;
  color: #666;
  line-height: 1.3;
}

.step-spinner {
  font-size: 20px;
  animation: pulse 0.8s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

.arrow {
  position: absolute;
  right: -14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #ccc;
  font-weight: bold;
  z-index: 1;
}

.arrow-active {
  color: #4caf50;
}

.result-box {
  margin-top: 16px;
  padding: 14px 18px;
  background: #e8f5e9;
  border-radius: 10px;
  border: 1px solid #a5d6a7;
}

.result-title {
  font-weight: 700;
  color: #2e7d32;
  margin-bottom: 6px;
}

.result-detail {
  font-size: 15px;
  color: #333;
}

.result-domain {
  color: #5c6bc0;
  font-weight: 600;
}

.result-ip {
  color: #e65100;
  font-weight: 600;
  font-family: monospace;
}

.result-time {
  font-size: 12px;
  color: #888;
  margin-top: 4px;
}

.info-box {
  margin-top: 14px;
  padding: 10px 14px;
  background: #fff3e0;
  border-radius: 8px;
  font-size: 13px;
  color: #5d4037;
  line-height: 1.6;
}
</style>
