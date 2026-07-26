<template>
  <div class="controller-demo">
    <div class="demo-header">
      <span class="title">{{ t('computerOrganization.controller.title') }}</span>
      <span class="subtitle">{{ t('computerOrganization.controller.subtitle') }}</span>
    </div>

    <div class="control-unit">
      <div class="cu-box">
        <div class="cu-title">{{ t('computerOrganization.controller.controlUnit') }}</div>
        <div class="cu-diagram">
          <div class="cu-internal">
            <div class="cu-component">{{ t('computerOrganization.controller.instructionRegister') }}</div>
            <div class="cu-component">{{ t('computerOrganization.controller.decoder') }}</div>
            <div class="cu-component">{{ t('computerOrganization.controller.timingGenerator') }}</div>
          </div>
          <div class="cu-output">
            <div class="output-label">{{ t('computerOrganization.controller.outputSignals') }}</div>
            <div class="control-signals">
              <div v-for="sig in controlSignals" :key="sig.name" :class="['sig-box', sig.active ? 'active' : '']">
                {{ sig.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cpu-block-diagram">
      <div class="block-row">
        <div class="cpu-block" :class="{ active: activeBlock === 'pc' }">
          <div class="block-name">PC</div>
          <div class="block-desc">{{ t('computerOrganization.controller.blocks.pc') }}</div>
        </div>
        <div class="arrow" :class="{ active: activeBlock === 'pc' }">→</div>
        <div class="cpu-block" :class="{ active: activeBlock === 'mar' }">
          <div class="block-name">MAR</div>
          <div class="block-desc">{{ t('computerOrganization.controller.blocks.mar') }}</div>
        </div>
        <div class="arrow" :class="{ active: activeBlock === 'mar' }">→</div>
        <div class="cpu-block" :class="{ active: activeBlock === 'memory' }">
          <div class="block-name">Memory</div>
          <div class="block-desc">{{ t('computerOrganization.controller.blocks.memory') }}</div>
        </div>
      </div>

      <div class="block-row">
        <div class="cpu-block" :class="{ active: activeBlock === 'mdr' }">
          <div class="block-name">MDR</div>
          <div class="block-desc">{{ t('computerOrganization.controller.blocks.mdr') }}</div>
        </div>
        <div class="arrow" :class="{ active: activeBlock === 'mdr' }">→</div>
        <div class="cpu-block" :class="{ active: activeBlock === 'ir' }">
          <div class="block-name">IR</div>
          <div class="block-desc">{{ t('computerOrganization.controller.blocks.ir') }}</div>
        </div>
        <div class="arrow" :class="{ active: activeBlock === 'ir' }">→</div>
        <div class="cpu-block" :class="{ active: activeBlock === 'decoder' }">
          <div class="block-name">ID</div>
          <div class="block-desc">{{ t('computerOrganization.controller.blocks.decoder') }}</div>
        </div>
      </div>

      <div class="block-row">
        <div class="cpu-block" :class="{ active: activeBlock === 'alu' }">
          <div class="block-name">ALU</div>
          <div class="block-desc">{{ t('computerOrganization.controller.blocks.alu') }}</div>
        </div>
        <div class="arrow" :class="{ active: activeBlock === 'alu' }">↔</div>
        <div class="cpu-block" :class="{ active: activeBlock === 'acc' }">
          <div class="block-name">ACC</div>
          <div class="block-desc">{{ t('computerOrganization.controller.blocks.acc') }}</div>
        </div>
      </div>
    </div>

    <div class="control-panel">
      <button class="btn" @click="executeFetch">{{ t('computerOrganization.controller.buttons.fetch') }}</button>
      <button class="btn" @click="executeAdd">{{ t('computerOrganization.controller.buttons.add') }}</button>
      <button class="btn" @click="executeLoad">{{ t('computerOrganization.controller.buttons.load') }}</button>
    </div>

    <div class="microinstruction-panel">
      <div class="panel-title">{{ t('computerOrganization.controller.currentMicroinstruction') }}</div>
      <div class="micro-ops">
        <div v-for="(op, i) in microOps" :key="i" :class="['micro-op', op.active ? 'active' : '']">
          <span class="op-cycle">T{{ i + 1 }}</span>
          <span class="op-desc">{{ op.desc }}</span>
        </div>
      </div>
    </div>

    <div class="cu-explanation">
      <div class="exp-title">{{ t('computerOrganization.controller.conceptTitle') }}</div>
      <div class="exp-content">
        <div v-for="item in concepts" :key="item.label" class="exp-item">
          <strong>{{ item.label }}</strong>{{ item.desc }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals/index.js'

const { t, messages } = useI18n(computerFundamentalsLocale)

const activeBlock = ref('')

const controlSignals = reactive([
  { name: 'PC→MAR', active: false },
  { name: 'MEM→MDR', active: false },
  { name: 'MDR→IR', active: false },
  { name: 'IR→ID', active: false },
  { name: 'ALU→ACC', active: false },
  { name: 'ACC→MDR', active: false },
])

const microOps = reactive([])
const concepts = computed(() => messages.value.computerOrganization.controller.concepts)

const clearSignals = () => {
  controlSignals.forEach(s => s.active = false)
  activeBlock.value = ''
}

const executeFetch = async () => {
  clearSignals()
  microOps.splice(0, microOps.length)
  
  microOps.push({ desc: t('computerOrganization.controller.ops.fetch1'), active: true })
  controlSignals[0].active = true
  activeBlock.value = 'pc'
  await wait(1000)

  microOps.push({ desc: t('computerOrganization.controller.ops.fetch2'), active: true })
  controlSignals[1].active = true
  activeBlock.value = 'memory'
  await wait(1000)

  microOps.push({ desc: t('computerOrganization.controller.ops.fetch3'), active: true })
  controlSignals[2].active = true
  activeBlock.value = 'mar'
  await wait(1000)

  microOps.push({ desc: t('computerOrganization.controller.ops.fetch4'), active: true })
  controlSignals[3].active = true
  activeBlock.value = 'ir'
  await wait(1000)
}

const executeAdd = async () => {
  clearSignals()
  microOps.splice(0, microOps.length)
  
  microOps.push({ desc: t('computerOrganization.controller.ops.add1'), active: true })
  activeBlock.value = 'decoder'
  await wait(1000)

  microOps.push({ desc: t('computerOrganization.controller.ops.add2'), active: true })
  controlSignals[4].active = true
  activeBlock.value = 'alu'
  await wait(1000)

  microOps.push({ desc: t('computerOrganization.controller.ops.add3'), active: true })
  activeBlock.value = 'acc'
  await wait(1000)
}

const executeLoad = async () => {
  clearSignals()
  microOps.splice(0, microOps.length)
  
  microOps.push({ desc: t('computerOrganization.controller.ops.load1'), active: true })
  activeBlock.value = 'decoder'
  await wait(1000)

  microOps.push({ desc: t('computerOrganization.controller.ops.load2'), active: true })
  controlSignals[0].active = true
  activeBlock.value = 'pc'
  await wait(1000)

  microOps.push({ desc: t('computerOrganization.controller.ops.load3'), active: true })
  controlSignals[1].active = true
  activeBlock.value = 'memory'
  await wait(1000)

  microOps.push({ desc: t('computerOrganization.controller.ops.load4'), active: true })
  controlSignals[5].active = true
  activeBlock.value = 'mdr'
  await wait(1000)
}

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
</script>

<style scoped>
.controller-demo {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
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

.control-unit {
  margin-bottom: 20px;
}

.cu-box {
  background: white;
  border-radius: 8px;
  padding: 16px;
}

.cu-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
  text-align: center;
}

.cu-diagram {
  display: flex;
  gap: 16px;
}

.cu-internal {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cu-component {
  padding: 8px 12px;
  background: #e0f2fe;
  border-radius: 6px;
  font-size: 12px;
  color: #0369a1;
  text-align: center;
}

.cu-output {
  flex: 1;
}

.output-label {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 8px;
}

.control-signals {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.sig-box {
  padding: 6px 10px;
  background: #f1f5f9;
  border-radius: 4px;
  font-size: 11px;
  color: #64748b;
  font-family: monospace;
}

.sig-box.active {
  background: #3b82f6;
  color: white;
}

.cpu-block-diagram {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.block-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 12px;
}

.cpu-block {
  padding: 10px 16px;
  background: #f1f5f9;
  border-radius: 6px;
  text-align: center;
  transition: all 0.3s;
}

.cpu-block.active {
  background: #dbeafe;
  border: 2px solid #3b82f6;
}

.block-name {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.block-desc {
  font-size: 10px;
  color: #64748b;
}

.arrow {
  font-size: 16px;
  color: #cbd5e1;
}

.arrow.active {
  color: #3b82f6;
}

.control-panel {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 16px;
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

.microinstruction-panel {
  background: white;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
}

.panel-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.micro-ops {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.micro-op {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: #f8fafc;
  border-radius: 4px;
  font-size: 12px;
}

.micro-op.active {
  background: #dbeafe;
}

.op-cycle {
  font-weight: 600;
  color: #3b82f6;
  min-width: 24px;
}

.op-desc {
  color: #475569;
}

.cu-explanation {
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

.exp-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.exp-item {
  font-size: 12px;
  color: #475569;
  padding: 8px;
  background: #f8fafc;
  border-radius: 6px;
}
</style>
