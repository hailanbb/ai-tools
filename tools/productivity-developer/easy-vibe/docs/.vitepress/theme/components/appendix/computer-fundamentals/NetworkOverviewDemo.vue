<template>
  <div class="network-overview-demo">
    <div class="demo-header">
      <span class="title">{{ t('computerOrganization.networkOverview.title') }}</span>
      <span class="subtitle">{{ t('computerOrganization.networkOverview.subtitle') }}</span>
    </div>

    <div class="network-scene">
      <div class="scene-devices">
        <div class="device sender">
          <div class="device-icon">💻</div>
          <div class="device-name">{{ t('computerOrganization.networkOverview.sender') }}</div>
          <div class="device-ip">192.168.1.100</div>
          <div class="app-layer">
            <div class="app-icon">📧</div>
            <div class="app-name">{{ t('computerOrganization.networkOverview.mailApp') }}</div>
          </div>
        </div>

        <div class="network-path">
          <div class="path-steps">
            <div
              v-for="(step, index) in pathSteps"
              :key="index"
              :class="['path-step', { active: activeStep === index }]"
              @click="activeStep = index"
            >
              <div class="step-icon">{{ step.icon }}</div>
              <div class="step-name">{{ step.name }}</div>
              <div class="step-desc">{{ step.desc }}</div>
            </div>
          </div>

          <div class="data-flow">
            <div v-if="activeStep !== null" class="flow-animation">
              <div class="flow-packet">{{ t('computerOrganization.networkOverview.packet') }}</div>
            </div>
          </div>
        </div>

        <div class="device receiver">
          <div class="device-icon">🖥️</div>
          <div class="device-name">{{ t('computerOrganization.networkOverview.receiver') }}</div>
          <div class="device-ip">192.168.1.200</div>
          <div class="app-layer">
            <div class="app-icon">📧</div>
            <div class="app-name">{{ t('computerOrganization.networkOverview.mailApp') }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="encapsulation-process">
      <div class="process-title">{{ t('computerOrganization.networkOverview.processTitle') }}</div>
      <div class="encapsulation-layers">
        <div
          v-for="(layer, index) in encapsulationLayers"
          :key="index"
          :class="['encap-layer', { active: activeStep === index }]"
        >
          <div class="layer-header">
            <span class="layer-num">{{ layer.num }}</span>
            <span class="layer-name">{{ layer.name }}</span>
          </div>
          <div class="layer-content">
            <div class="layer-data">{{ layer.data }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="protocol-stack">
      <div class="stack-title">{{ t('computerOrganization.networkOverview.stackTitle') }}</div>
      <div class="stack-container">
        <div class="stack-column sender-stack">
          <div class="stack-header">{{ t('computerOrganization.networkOverview.sender') }}</div>
          <div
            v-for="(layer, index) in protocolLayers"
            :key="'sender-' + index"
            :class="['stack-layer', { highlighted: activeStep === index }]"
          >
            {{ layer }}
          </div>
        </div>

        <div class="stack-arrow">→</div>

        <div class="stack-column receiver-stack">
          <div class="stack-header">{{ t('computerOrganization.networkOverview.receiver') }}</div>
          <div
            v-for="(layer, index) in protocolLayers"
            :key="'receiver-' + index"
            :class="['stack-layer', { highlighted: activeStep === index }]"
          >
            {{ layer }}
          </div>
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

const activeStep = ref(null)

const pathSteps = computed(() => messages.value.computerOrganization.networkOverview.pathSteps)
const encapsulationLayers = computed(() => messages.value.computerOrganization.networkOverview.encapsulationLayers)
const protocolLayers = computed(() => messages.value.computerOrganization.networkOverview.protocolLayers)
</script>

<style scoped>
.network-overview-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.demo-header .title {
  font-weight: 700;
  font-size: 1.1rem;
}
.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.network-scene {
  margin-bottom: 2rem;
}

.scene-devices {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.device {
  flex: 1;
  max-width: 200px;
  text-align: center;
  padding: 1.5rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
}

.device-icon {
  font-size: 3rem;
  margin-bottom: 0.75rem;
}

.device-name {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.device-ip {
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
}

.app-layer {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-brand-soft);
  border-radius: 6px;
}

.app-icon {
  font-size: 1.5rem;
}
.app-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-brand);
}

.network-path {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.path-steps {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.path-step {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.path-step:hover {
  border-color: var(--vp-c-brand);
}

.path-step.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.step-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.step-name {
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.step-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.data-flow {
  text-align: center;
  padding: 0.5rem;
}

.flow-animation {
  animation: flowMove 2s ease-in-out infinite;
}

@keyframes flowMove {
  0%,
  100% {
    transform: translateX(-20px);
    opacity: 0;
  }
  50% {
    transform: translateX(20px);
    opacity: 1;
  }
}

.flow-packet {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.encapsulation-process {
  margin-bottom: 2rem;
}

.process-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.encapsulation-layers {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.encap-layer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.encap-layer.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.layer-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 150px;
}

.layer-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 600;
}

.layer-name {
  font-weight: 600;
  font-size: 0.85rem;
}

.layer-content {
  flex: 1;
}

.layer-data {
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.protocol-stack {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
}

.stack-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.stack-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.stack-column {
  flex: 1;
  max-width: 250px;
}

.stack-header {
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-brand);
}

.stack-layer {
  padding: 0.6rem;
  margin-bottom: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.8rem;
  text-align: center;
  transition: all 0.3s;
}

.stack-layer.highlighted {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  font-weight: 600;
}

.stack-arrow {
  font-size: 2rem;
  color: var(--vp-c-brand);
}

@media (max-width: 968px) {
  .scene-devices {
    flex-direction: column;
  }

  .network-path {
    width: 100%;
  }

  .stack-container {
    flex-direction: column;
    gap: 1rem;
  }

  .stack-arrow {
    transform: rotate(90deg);
  }
}
</style>
