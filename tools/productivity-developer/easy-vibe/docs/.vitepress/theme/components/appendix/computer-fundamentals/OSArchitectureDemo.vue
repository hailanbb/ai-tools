<template>
  <div class="demo">
    <div class="scene">
      <div class="layer-box app-layer" :class="{ active: currentStep >= 1 }">
        <div class="layer-title">{{ t('operatingSystems.osArchitecture.appLayer') }}</div>
        <div class="apps">
          <span class="app-icon" :class="{ pulse: currentStep === 1 }">🎵</span>
          <span class="app-icon" :class="{ pulse: currentStep === 1 }">💬</span>
          <span class="app-icon" :class="{ pulse: currentStep === 1 }">🎮</span>
        </div>
      </div>

      <div class="flow-arrow" :class="{ flowing: currentStep === 2 }">
        <div class="arrow-line"></div>
        <div class="arrow-head">▼</div>
        <div v-if="currentStep === 2" class="packet">{{ t('operatingSystems.osArchitecture.requestPacket') }}</div>
      </div>

      <div class="layer-box os-layer" :class="{ active: currentStep >= 2, processing: currentStep === 3 }">
        <div class="layer-title">{{ t('operatingSystems.osArchitecture.osLayer') }}</div>
        <div class="os-core">
          <div
            v-for="(item, index) in messages.operatingSystems.osArchitecture.coreItems"
            :key="item"
            class="core-item"
            :class="{ working: currentStep === 3 && subStep === index }"
          >
            {{ item }}
          </div>
        </div>
      </div>

      <div class="flow-arrow" :class="{ flowing: currentStep === 4 }">
        <div class="arrow-line"></div>
        <div class="arrow-head">▼</div>
        <div v-if="currentStep === 4" class="packet">{{ t('operatingSystems.osArchitecture.instructionPacket') }}</div>
      </div>

      <div class="layer-box hw-layer" :class="{ active: currentStep >= 4, working: currentStep === 5 }">
        <div class="layer-title">{{ t('operatingSystems.osArchitecture.hardwareLayer') }}</div>
        <div class="hw-items">
          <span class="hw-icon" :class="{ spin: currentStep === 5 }">🧠 CPU</span>
          <span class="hw-icon" :class="{ flash: currentStep === 5 }">{{ t('operatingSystems.osArchitecture.memory') }}</span>
          <span class="hw-icon" :class="{ flash: currentStep === 5 }">{{ t('operatingSystems.osArchitecture.disk') }}</span>
        </div>
      </div>
    </div>

    <div class="status-bar">
      <span class="status-text">{{ statusText }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals/index.js'

const { t, messages } = useI18n(computerFundamentalsLocale)

const currentStep = ref(0)
const subStep = ref(0)
let timer = null

const statusText = computed(
  () => messages.value.operatingSystems.osArchitecture.statusTexts[currentStep.value] || ''
)

const nextStep = () => {
  if (currentStep.value === 3) {
    // Cycle through OS sub-steps while the OS layer is processing.
    subStep.value = (subStep.value + 1) % 3
    if (subStep.value === 0) {
      currentStep.value = 4
    }
  } else {
    currentStep.value = (currentStep.value + 1) % 6
    if (currentStep.value === 3) {
      subStep.value = 0
    }
  }
}

onMounted(() => {
  timer = setInterval(nextStep, 1500)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 16px;
  margin: 1rem 0;
}

.scene {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.layer-box {
  padding: 12px;
  border-radius: 8px;
  border: 2px solid transparent;
  transition: all 0.3s;
  opacity: 0.5;
}

.layer-box.active {
  opacity: 1;
}

.app-layer {
  background: linear-gradient(135deg, #667eea22, #764ba222);
  border-color: #667eea55;
}

.app-layer.active {
  border-color: #667eea;
  box-shadow: 0 0 15px #667eea55;
}

.os-layer {
  background: linear-gradient(135deg, #f093fb22, #f5576c22);
  border-color: #f5576c55;
}

.os-layer.active {
  border-color: #f5576c;
  box-shadow: 0 0 15px #f5576c55;
}

.os-layer.processing {
  animation: pulse-os 1s infinite;
}

.hw-layer {
  background: linear-gradient(135deg, #4facfe22, #00f2fe22);
  border-color: #4facfe55;
}

.hw-layer.active {
  border-color: #4facfe;
  box-shadow: 0 0 15px #4facfe55;
}

.hw-layer.working {
  animation: pulse-hw 0.5s infinite;
}

.layer-title {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 8px;
  text-align: center;
}

.apps {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.app-icon {
  font-size: 24px;
  transition: transform 0.3s;
}

.app-icon.pulse {
  animation: bounce 0.5s infinite;
}

.os-core {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.core-item {
  padding: 6px 12px;
  background: var(--vp-c-bg);
  border-radius: 4px;
  font-size: 11px;
  transition: all 0.3s;
}

.core-item.working {
  background: #f5576c;
  color: white;
  transform: scale(1.1);
}

.hw-items {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.hw-icon {
  font-size: 12px;
  padding: 4px 8px;
  background: var(--vp-c-bg);
  border-radius: 4px;
  transition: all 0.3s;
}

.hw-icon.spin {
  animation: spin 1s linear infinite;
}

.hw-icon.flash {
  animation: flash 0.5s infinite;
}

.flow-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30px;
  position: relative;
}

.arrow-line {
  width: 2px;
  height: 20px;
  background: var(--vp-c-divider);
  transition: all 0.3s;
}

.flow-arrow.flowing .arrow-line {
  background: linear-gradient(to bottom, #f5576c, #4facfe);
  box-shadow: 0 0 5px #f5576c;
}

.arrow-head {
  font-size: 10px;
  color: var(--vp-c-divider);
  line-height: 1;
}

.flow-arrow.flowing .arrow-head {
  color: #4facfe;
}

.packet {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f5576c;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  animation: flow-down 1s ease-in-out;
  white-space: nowrap;
}

.status-bar {
  margin-top: 12px;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  text-align: center;
}

.status-text {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes pulse-os {
  0%, 100% { box-shadow: 0 0 5px #f5576c55; }
  50% { box-shadow: 0 0 20px #f5576caa; }
}

@keyframes pulse-hw {
  0%, 100% { box-shadow: 0 0 5px #4facfe55; }
  50% { box-shadow: 0 0 20px #4facfeaa; }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes flash {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes flow-down {
  0% { opacity: 0; transform: translate(-50%, -100%); }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; transform: translate(-50%, 0%); }
}
</style>
