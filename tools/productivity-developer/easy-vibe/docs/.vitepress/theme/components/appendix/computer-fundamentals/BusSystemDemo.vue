<template>
  <div class="bus-demo">
    <div class="demo-header">
      <span class="title">{{ t('computerOrganization.busSystem.title') }}</span>
      <span class="subtitle">{{ t('computerOrganization.busSystem.subtitle') }}</span>
    </div>

    <div class="bus-architecture">
      <div class="cpu-box">
        <div class="component-label">{{ t('computerOrganization.busSystem.cpu') }}</div>
        <div class="cpu-internal">
          <div class="cu">{{ t('computerOrganization.busSystem.controlUnit') }}</div>
          <div class="alu">{{ t('computerOrganization.busSystem.alu') }}</div>
        </div>
      </div>

      <div class="bus-section">
        <div class="bus-line address-bus" :class="{ active: activeBus === 'address' }">
          <span class="bus-name">{{ t('computerOrganization.busSystem.addressBus') }}</span>
          <span class="bus-width">{{ t('computerOrganization.busSystem.bits32') }}</span>
          <div v-if="activeBus === 'address'" class="bus-data">{{ addressValue }}</div>
        </div>
        <div class="bus-line data-bus" :class="{ active: activeBus === 'data' }">
          <span class="bus-name">{{ t('computerOrganization.busSystem.dataBus') }}</span>
          <span class="bus-width">{{ t('computerOrganization.busSystem.bits64') }}</span>
          <div v-if="activeBus === 'data'" class="bus-data">{{ dataValue }}</div>
        </div>
        <div class="bus-line ctrl-bus" :class="{ active: activeBus === 'control' }">
          <span class="bus-name">{{ t('computerOrganization.busSystem.controlBus') }}</span>
          <span class="bus-width">{{ t('computerOrganization.busSystem.controlSignal') }}</span>
          <div v-if="activeBus === 'control'" class="bus-data">{{ ctrlSignal }}</div>
        </div>
      </div>

      <div class="memory-box">
        <div class="component-label">{{ t('computerOrganization.busSystem.mainMemory') }}</div>
        <div class="mem-cells">
          <div v-for="i in 8" :key="i" class="mem-cell" :class="{ active: activeMem === i-1 }">
            {{ fmtAddr(i-1) }}
          </div>
        </div>
      </div>
    </div>

    <div class="control-panel">
      <div class="operation-group">
        <button class="btn" @click="simulateRead">{{ t('computerOrganization.busSystem.readMemory') }}</button>
        <button class="btn" @click="simulateWrite">{{ t('computerOrganization.busSystem.writeMemory') }}</button>
      </div>
      <div class="input-group">
        <input v-model.number="addressInput" type="number" :placeholder="t('computerOrganization.busSystem.addressPlaceholder')" min="0" max="7" class="addr-input" />
        <input v-model.number="dataInput" type="number" :placeholder="t('computerOrganization.busSystem.dataPlaceholder')" class="data-input" />
      </div>
    </div>

    <div class="operation-log">
      <div class="log-title">{{ t('computerOrganization.busSystem.logTitle') }}</div>
      <div class="log-steps">
        <div v-for="(step, i) in logSteps" :key="i" :class="['log-step', step.active ? 'active' : '']">
          <span class="step-num">{{ i + 1 }}</span>
          <span class="step-text">{{ step.text }}</span>
        </div>
      </div>
    </div>

    <div class="bus-explanation">
      <div class="exp-title">{{ t('computerOrganization.busSystem.explanationTitle') }}</div>
      <div class="exp-grid">
        <div v-for="item in explanations" :key="item.label" class="exp-item">
          <div class="exp-label">{{ item.label }}</div>
          <div class="exp-desc">{{ item.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals/index.js'

const { t, messages } = useI18n(computerFundamentalsLocale)

const activeBus = ref('')
const activeMem = ref(-1)
const addressValue = ref('')
const dataValue = ref('')
const ctrlSignal = ref('')

const addressInput = ref(0)
const dataInput = ref(100)

const logSteps = ref([])

const explanations = computed(() => messages.value.computerOrganization.busSystem.explanations)

const simulateRead = async () => {
  logSteps.value = []
  addressValue.value = addressInput.value.toString(2).padStart(32, '0').slice(-8)
  
  activeBus.value = 'address'
  logSteps.value.push({
    text: t('computerOrganization.busSystem.logs.sendAddress', { address: addressInput.value }),
    active: true
  })
  await wait(1000)
  
  activeBus.value = 'control'
  ctrlSignal.value = 'READ'
  logSteps.value.push({ text: t('computerOrganization.busSystem.logs.readSignal'), active: true })
  await wait(1000)
  
  activeBus.value = 'data'
  activeMem.value = addressInput.value
  dataValue.value = Math.floor(Math.random() * 256)
  logSteps.value.push({
    text: t('computerOrganization.busSystem.logs.memoryReturn', { data: dataValue.value }),
    active: true
  })
  await wait(1000)
  
  logSteps.value.push({ text: t('computerOrganization.busSystem.logs.cpuReceive'), active: true })
}

const simulateWrite = async () => {
  logSteps.value = []
  addressValue.value = addressInput.value.toString(2).padStart(32, '0').slice(-8)
  dataValue.value = dataInput.value.toString(2).padStart(64, '0').slice(-8)
  
  activeBus.value = 'address'
  logSteps.value.push({
    text: t('computerOrganization.busSystem.logs.sendAddress', { address: addressInput.value }),
    active: true
  })
  await wait(1000)
  
  activeBus.value = 'data'
  logSteps.value.push({
    text: t('computerOrganization.busSystem.logs.sendData', { data: dataInput.value }),
    active: true
  })
  await wait(1000)
  
  activeBus.value = 'control'
  ctrlSignal.value = 'WRITE'
  logSteps.value.push({ text: t('computerOrganization.busSystem.logs.writeSignal'), active: true })
  await wait(1000)
  
  activeMem.value = addressInput.value
  logSteps.value.push({
    text: t('computerOrganization.busSystem.logs.writeDone', { address: addressInput.value }),
    active: true
  })
}

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const fmtAddr = (addr) => '0x' + addr.toString(16).toUpperCase()
</script>

<style scoped>
.bus-demo {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.title {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
}

.subtitle {
  font-size: 13px;
  color: #64748b;
  margin-left: auto;
}

.bus-architecture {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.cpu-box, .memory-box {
  background: white;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
}

.component-label {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.cpu-internal {
  display: flex;
  gap: 8px;
}

.cu, .alu {
  padding: 8px 12px;
  background: #e0f2fe;
  border-radius: 4px;
  font-size: 11px;
  color: #0369a1;
}

.bus-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.bus-line {
  background: #f1f5f9;
  border-radius: 4px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  transition: all 0.3s;
}

.bus-line.active {
  transform: scale(1.02);
}

.address-bus.active { background: #fef3c7; border-left: 3px solid #f59e0b; }
.data-bus.active { background: #dbeafe; border-left: 3px solid #3b82f6; }
.ctrl-bus.active { background: #fce7f3; border-left: 3px solid #ec4899; }

.bus-name {
  font-weight: 600;
  color: #1e293b;
  min-width: 60px;
}

.bus-width {
  color: #64748b;
  font-size: 11px;
}

.bus-data {
  margin-left: auto;
  font-family: monospace;
  font-size: 10px;
  color: #1e293b;
}

.memory-box {
  width: 100px;
}

.mem-cells {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
}

.mem-cell {
  padding: 4px;
  background: #f8fafc;
  border-radius: 4px;
  font-size: 10px;
  font-family: monospace;
  text-align: center;
}

.mem-cell.active {
  background: #dbeafe;
  border: 1px solid #3b82f6;
}

.control-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.operation-group {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}

.btn:hover {
  background: #2563eb;
}

.input-group {
  display: flex;
  gap: 8px;
}

.addr-input, .data-input {
  width: 80px;
  padding: 6px 10px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 13px;
}

.operation-log {
  background: white;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
}

.log-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.log-steps {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.log-step {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: #f8fafc;
  border-radius: 4px;
  font-size: 12px;
  color: #64748b;
}

.log-step.active {
  background: #dbeafe;
  color: #1e293b;
}

.step-num {
  width: 20px;
  height: 20px;
  background: #e2e8f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
}

.step-text {
  flex: 1;
}

.bus-explanation {
  background: white;
  border-radius: 8px;
  padding: 12px;
}

.exp-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.exp-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.exp-item {
  padding: 8px;
  background: #f8fafc;
  border-radius: 6px;
}

.exp-label {
  font-size: 12px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
}

.exp-desc {
  font-size: 11px;
  color: #64748b;
}
</style>
