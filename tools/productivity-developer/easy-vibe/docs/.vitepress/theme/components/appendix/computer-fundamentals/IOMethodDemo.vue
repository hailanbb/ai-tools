<template>
  <div class="io-method-demo">
    <div class="demo-header">
      <span class="title">{{ t('computerOrganization.ioMethod.title') }}</span>
      <span class="subtitle">{{ t('computerOrganization.ioMethod.subtitle') }}</span>
    </div>

    <div class="io-tabs">
      <button 
        v-for="method in ioMethods" 
        :key="method.id"
        :class="['tab-btn', { active: selectedMethod === method.id }]"
        @click="selectedMethod = method.id"
      >
        {{ method.name }}
      </button>
    </div>

    <div v-if="selectedMethodData" class="method-details">
      <div class="detail-header">
        <span class="method-name">{{ selectedMethodData.name }}</span>
        <span class="method-english">{{ selectedMethodData.english }}</span>
      </div>

      <div class="detail-flow">
        <div class="flow-title">{{ t('computerOrganization.ioMethod.workflow') }}</div>
        <div class="flow-diagram">
          <div v-for="(step, i) in selectedMethodData.steps" :key="i" class="flow-node">
            <div class="node-box" :class="{ active: activeStep === i }" @click="activeStep = i">
              <span class="node-num">{{ i + 1 }}</span>
              <span class="node-text">{{ step }}</span>
            </div>
            <div v-if="i < selectedMethodData.steps.length - 1" class="flow-arrow">↓</div>
          </div>
        </div>
      </div>

      <div class="detail-comparison">
        <div class="comp-grid">
          <div class="comp-item">
            <span class="comp-label">{{ t('computerOrganization.ioMethod.cpuLevel') }}</span>
            <span class="comp-value" :class="selectedMethodData.cpuLevelClass">{{ selectedMethodData.cpuLevel }}</span>
          </div>
          <div class="comp-item">
            <span class="comp-label">{{ t('computerOrganization.ioMethod.speed') }}</span>
            <span class="comp-value">{{ selectedMethodData.speed }}</span>
          </div>
          <div class="comp-item">
            <span class="comp-label">{{ t('computerOrganization.ioMethod.complexity') }}</span>
            <span class="comp-value">{{ selectedMethodData.complexity }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-section">
      <div class="section-title">{{ t('computerOrganization.ioMethod.comparisonTitle') }}</div>
      <table class="compare-table">
        <thead>
          <tr>
            <th v-for="header in messages.computerOrganization.ioMethod.headers" :key="header">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in messages.computerOrganization.ioMethod.rows" :key="row[0]">
            <td v-for="cell in row" :key="cell">{{ cell }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="selectedMethod === 'dma'" class="dma-demo">
      <div class="dma-title">{{ t('computerOrganization.ioMethod.dmaTitle') }}</div>
      <div class="dma-visual">
        <div class="device cpu-device">
          <div class="device-icon">💻</div>
          <div class="device-name">CPU</div>
        </div>
        
        <div class="dma-channel">
          <div v-if="dmaStep >= 1" class="channel-step">
            <span class="step-label">{{ t('computerOrganization.ioMethod.dmaStep1') }}</span>
            <span class="step-arrow">→</span>
          </div>
        </div>
        
        <div class="device dma-device">
          <div class="device-icon">🔧</div>
          <div class="device-name">{{ t('computerOrganization.ioMethod.dmaController') }}</div>
        </div>
        
        <div class="dma-channel">
          <div v-if="dmaStep >= 2" class="channel-step">
            <span class="step-label">{{ t('computerOrganization.ioMethod.dmaStep2') }}</span>
            <span class="step-arrow">→</span>
          </div>
        </div>
        
        <div class="device memory-device">
          <div class="device-icon">💾</div>
          <div class="device-name">{{ t('computerOrganization.ioMethod.memory') }}</div>
        </div>
      </div>
      
      <div class="dma-controls">
        <button class="btn" :disabled="dmaStep > 0" @click="startDma">{{ t('computerOrganization.ioMethod.startDma') }}</button>
        <button class="btn" @click="resetDma">{{ t('computerOrganization.ioMethod.reset') }}</button>
      </div>
    </div>

    <div v-if="selectedMethod === 'interrupt'" class="interrupt-demo">
      <div class="interrupt-title">{{ t('computerOrganization.ioMethod.interruptTitle') }}</div>
      <div class="interrupt-visual">
        <div class="timeline">
          <div
            v-for="(item, i) in interruptFlow"
            :key="i"
            class="timeline-item"
            :class="{ active: interruptStep === i }"
          >
            <div class="timeline-num">{{ i + 1 }}</div>
            <div class="timeline-content">
              <div class="timeline-title">{{ item.title }}</div>
              <div class="timeline-desc">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="interrupt-controls">
        <button class="btn" :disabled="interruptStep >= interruptFlow.length - 1" @click="nextInterrupt">{{ t('computerOrganization.ioMethod.nextStep') }}</button>
        <button class="btn" @click="resetInterrupt">{{ t('computerOrganization.ioMethod.reset') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals/index.js'

const { t, messages } = useI18n(computerFundamentalsLocale)

const selectedMethod = ref('programmed')
const activeStep = ref(0)
const dmaStep = ref(0)
const interruptStep = ref(0)

const ioMethods = computed(() => messages.value.computerOrganization.ioMethod.methods)

const selectedMethodData = computed(() => {
  return ioMethods.value.find(m => m.id === selectedMethod.value)
})

const interruptFlow = computed(() => messages.value.computerOrganization.ioMethod.interruptFlow)

const startDma = () => {
  dmaStep.value = 1
  setTimeout(() => {
    dmaStep.value = 2
    setTimeout(() => {
      dmaStep.value = 3
    }, 1000)
  }, 1000)
}

const resetDma = () => {
  dmaStep.value = 0
}

const nextInterrupt = () => {
  if (interruptStep.value < interruptFlow.value.length - 1) {
    interruptStep.value++
  }
}

const resetInterrupt = () => {
  interruptStep.value = 0
}
</script>

<style scoped>
.io-method-demo {
  background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
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

.io-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.tab-btn {
  padding: 10px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.tab-btn.active {
  border-color: #ec4899;
  background: #fdf2f8;
}

.method-details {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f3f4f6;
}

.method-name {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
}

.method-english {
  font-size: 13px;
  color: #64748b;
}

.detail-flow {
  margin-bottom: 16px;
}

.flow-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.flow-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.flow-node {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.node-box {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.node-box.active {
  border-color: #ec4899;
  background: #fdf2f8;
}

.node-num {
  width: 24px;
  height: 24px;
  background: #ec4899;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.node-text {
  font-size: 13px;
  color: #475569;
}

.flow-arrow {
  font-size: 18px;
  color: #cbd5e1;
}

.detail-comparison {
  padding-top: 12px;
  border-top: 1px solid #e2e8f0;
}

.comp-grid {
  display: flex;
  gap: 16px;
}

.comp-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.comp-label {
  font-size: 11px;
  color: #64748b;
}

.comp-value {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.comp-value.level-high { color: #dc2626; }
.comp-value.level-medium { color: #f59e0b; }
.comp-value.level-low { color: #16a34a; }

.comparison-section {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.compare-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.compare-table th,
.compare-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.compare-table th {
  background: #f8fafc;
  font-weight: 600;
  color: #1e293b;
}

.compare-table td {
  color: #475569;
}

.dma-demo, .interrupt-demo {
  background: white;
  border-radius: 8px;
  padding: 16px;
}

.dma-title, .interrupt-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.dma-visual {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 16px;
}

.device {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
}

.device-icon {
  font-size: 24px;
  margin-bottom: 4px;
}

.device-name {
  font-size: 12px;
  color: #1e293b;
}

.dma-channel {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.channel-step {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: #dbeafe;
  border-radius: 4px;
  font-size: 10px;
}

.step-arrow {
  color: #3b82f6;
}

.dma-controls, .interrupt-controls {
  display: flex;
  gap: 8px;
  justify-content: center;
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

.btn:disabled {
  background: #94a3b8;
}

.interrupt-visual {
  margin-bottom: 16px;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.timeline-item {
  display: flex;
  gap: 12px;
  padding: 10px;
  background: #f8fafc;
  border-radius: 6px;
  border-left: 3px solid #e2e8f0;
}

.timeline-item.active {
  border-left-color: #ec4899;
  background: #fdf2f8;
}

.timeline-num {
  width: 24px;
  height: 24px;
  background: #ec4899;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.timeline-title {
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
}

.timeline-desc {
  font-size: 11px;
  color: #64748b;
}
</style>
