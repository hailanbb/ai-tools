<template>
  <div class="cpu-internal-demo">
    <div class="demo-title">{{ t('minCpu.title') }}</div>
    <div class="demo-subtitle">{{ t('minCpu.subtitle') }}</div>
    
    <div class="demo-container">
      <div class="cpu-chip">
        <div class="chip-title">{{ t('minCpu.chipTitle') }}</div>
        
        <div class="bus-top address-bus" :class="{ active: currentModule === 'address_bus' }" @click="selectModule('address_bus')">{{ t('minCpu.addressBus') }}</div>
        <div class="bus-top data-bus" :class="{ active: currentModule === 'data_bus' }" @click="selectModule('data_bus')">{{ t('minCpu.dataBus') }}</div>

        <div class="cpu-layout">
          <!-- 左侧：控制单元 -->
          <div class="cu-section section-box" :class="{ active: currentModule === 'cu' }" @click.stop="selectModule('cu')">
            <h4 class="section-title">{{ t('minCpu.controlUnit') }}</h4>
            <div class="sub-modules">
              <div class="sub-mod" :class="{ active: currentModule === 'pc' }" @click.stop="selectModule('pc')">{{ t('minCpu.programCounter') }}</div>
              <div class="sub-mod" :class="{ active: currentModule === 'ir' }" @click.stop="selectModule('ir')">{{ t('minCpu.instructionRegister') }}</div>
              <div class="sub-mod" :class="{ active: currentModule === 'decoder' }" @click.stop="selectModule('decoder')">{{ t('minCpu.instructionDecoder') }}</div>
              <div class="sub-mod" :class="{ active: currentModule === 'clock' }" @click.stop="selectModule('clock')">{{ t('minCpu.clock') }}</div>
            </div>
            <div class="control-lines">{{ t('minCpu.controlLines') }}</div>
          </div>

          <!-- 右侧：数据通道（ALU + 寄存器） -->
          <div class="datapath-section">
            <!-- 寄存器组 -->
            <div class="reg-section section-box" :class="{ active: currentModule === 'reg' }" @click.stop="selectModule('reg')">
              <h4 class="section-title">{{ t('minCpu.registerFile') }}</h4>
              <div class="sub-modules grid-2">
                <div class="sub-mod">{{ t('minCpu.generalRegisters') }}</div>
                <div class="sub-mod">{{ t('minCpu.accumulator') }}</div>
              </div>
            </div>

            <!-- ALU -->
            <div class="alu-section section-box" :class="{ active: currentModule === 'alu' }" @click.stop="selectModule('alu')">
              <h4 class="section-title">{{ t('minCpu.alu') }}</h4>
              <div class="sub-modules">
                <div class="sub-mod" :class="{ active: currentModule === 'adder' }" @click.stop="selectModule('adder')">{{ t('minCpu.adder') }}</div>
                <div class="sub-mod" :class="{ active: currentModule === 'flags' }" @click.stop="selectModule('flags')">{{ t('minCpu.flags') }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="bus-bottom control-bus" :class="{ active: currentModule === 'control_bus' }" @click="selectModule('control_bus')">{{ t('minCpu.controlBus') }}</div>
      </div>

      <!-- 右侧/下方详细说明面板 -->
        <div v-if="currentModuleData" class="details-panel">
        <h3>{{ currentModuleData.title }}</h3>
        <p class="desc">{{ currentModuleData.description }}</p>
        <div v-if="currentModuleData.subCircuit" class="circuit-impl">
          <h4><span class="icon">🔌</span> {{ t('minCpu.subCircuitTitle') }}</h4>
          <p>{{ currentModuleData.subCircuit }}</p>
        </div>
      </div>
      <div v-else class="details-panel empty">
        <div class="empty-icon">🖱️</div>
        <p>{{ t('minCpu.empty') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals/index.js'

const { t, messages } = useI18n(computerFundamentalsLocale)
const currentModule = ref(null)
const currentModuleData = computed(
  () => messages.value.minCpu.modules[currentModule.value]
)

function selectModule(mod) {
  if (currentModule.value === mod) {
    currentModule.value = null
  } else {
    currentModule.value = mod
  }
}
</script>

<style scoped>
.cpu-internal-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.demo-title {
  text-align: center;
  font-weight: 800;
  font-size: 1.25rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
}

.demo-subtitle {
  text-align: center;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
}

.demo-container {
  display: flex;
  gap: 1.5rem;
  align-items: stretch;
}

.cpu-chip {
  flex: 3;
  background: var(--vp-c-bg);
  border: 3px solid #64748b;
  border-radius: 12px;
  padding: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.chip-title {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #64748b;
  color: #fff;
  padding: 2px 12px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.85rem;
  white-space: nowrap;
}

.bus-top, .bus-bottom {
  text-align: center;
  padding: 0.4rem;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px dashed var(--vp-c-text-3);
  background: var(--vp-c-bg-alt);
}

.bus-top:hover, .bus-bottom:hover, .bus-top.active, .bus-bottom.active {
  border-style: solid;
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.cpu-layout {
  display: flex;
  gap: 1rem;
  flex: 1;
  min-height: 280px;
}

.section-box {
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
  cursor: pointer;
  background: var(--vp-c-bg-soft);
}

.section-box:hover, .section-box.active {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.cu-section { margin-top: 0; }
.cu-section:hover, .cu-section.active { border-color: #3b82f6; }
.reg-section:hover, .reg-section.active { border-color: #8b5cf6; }
.alu-section:hover, .alu-section.active { border-color: #f59e0b; }

.section-title {
  margin: 0 0 0.8rem 0;
  font-size: 0.95rem;
  text-align: center;
  color: var(--vp-c-text-1);
}

.cu-section {
  flex: 5;
}

.datapath-section {
  flex: 7;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sub-modules {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.sub-mod {
  font-size: 0.8rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  padding: 0.5rem;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.sub-mod:hover, .sub-mod.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

.cu-section .sub-mod:hover, .cu-section .sub-mod.active { background: #3b82f6; border-color: #3b82f6; }
.alu-section .sub-mod:hover, .alu-section .sub-mod.active { background: #f59e0b; border-color: #f59e0b; }
.reg-section .sub-mod:hover, .reg-section .sub-mod.active { background: #8b5cf6; border-color: #8b5cf6; }


.control-lines {
  text-align: center;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  margin-top: 0.5rem;
  font-family: monospace;
}

.details-panel {
  flex: 2;
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: inset 0 0 0 1px var(--vp-c-divider);
  display: flex;
  flex-direction: column;
}

.details-panel h3 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-brand-1);
  font-size: 1.2rem;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
}

.details-panel .desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
}

.circuit-impl {
  background: var(--vp-c-bg-soft);
  border-left: 4px solid var(--vp-c-brand-2);
  padding: 1rem;
  border-radius: 0 4px 4px 0;
  margin-top: auto;
}

.circuit-impl h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.circuit-impl p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.empty {
  align-items: center;
  justify-content: center;
  background: transparent;
  box-shadow: none;
  border: 1px dashed var(--vp-c-divider);
  text-align: center;
  color: var(--vp-c-text-3);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

@media (max-width: 800px) {
  .demo-container {
    flex-direction: column;
  }
  .cpu-layout {
    flex-direction: column;
  }
}
</style>
