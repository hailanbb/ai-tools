<template>
  <div class="cpu-demo">
    <div class="demo-title">{{ t('cpuArchitecture.title') }}</div>

    <div class="main-layout">
      <!-- LEFT: CPU internals -->
      <div class="cpu-box">
        <div class="cpu-label">{{ t('cpuArchitecture.cpuLabel') }}</div>

        <!-- Control Unit -->
        <div class="unit cu-unit" :class="{ active: isActive('CU') }">
          <div class="unit-title">{{ t('cpuArchitecture.controlUnit') }}</div>
          <div class="regs-row">
            <div class="reg-cell" :class="{ highlight: isHighlight('PC') }">
              <span class="reg-name">PC</span>
              <span class="reg-val">{{ fmt(regs.PC) }}</span>
              <span class="reg-hint">{{ t('cpuArchitecture.programCounter') }}</span>
            </div>
            <div class="reg-cell" :class="{ highlight: isHighlight('IR') }">
              <span class="reg-name">IR</span>
              <span class="reg-val ir-val">{{ regs.IR || '—' }}</span>
              <span class="reg-hint">{{ t('cpuArchitecture.instructionRegister') }}</span>
            </div>
          </div>
        </div>

        <!-- MAR / MDR -->
        <div class="unit bus-unit">
          <div class="regs-row">
            <div class="reg-cell" :class="{ highlight: isHighlight('MAR') }">
              <span class="reg-name">MAR</span>
              <span class="reg-val">{{ fmt(regs.MAR) }}</span>
              <span class="reg-hint">{{ t('cpuArchitecture.memoryAddressRegister') }}</span>
            </div>
            <div class="reg-cell" :class="{ highlight: isHighlight('MDR') }">
              <span class="reg-name">MDR</span>
              <span class="reg-val">{{ regs.MDR !== null ? regs.MDR : '—' }}</span>
              <span class="reg-hint">{{ t('cpuArchitecture.memoryDataRegister') }}</span>
            </div>
          </div>
        </div>

        <!-- ALU -->
        <div class="unit alu-unit" :class="{ active: isActive('ALU') }">
          <div class="unit-title">{{ t('cpuArchitecture.alu') }}</div>
          <div class="regs-row">
            <div class="reg-cell" :class="{ highlight: isHighlight('ACC') }">
              <span class="reg-name">ACC</span>
              <span class="reg-val">{{ fmt(regs.ACC) }}</span>
              <span class="reg-hint">{{ t('cpuArchitecture.accumulator') }}</span>
            </div>
            <div class="alu-op" :class="{ running: isActive('ALU') }">
              {{ t(`cpuArchitecture.aluOps.${aluOp}`) }}
            </div>
          </div>
        </div>

        <!-- General Registers -->
        <div class="unit reg-unit">
          <div class="unit-title">{{ t('cpuArchitecture.registerGroup') }}</div>
          <div class="regs-row">
            <div
              v-for="r in ['R0','R1','R2','R3']"
              :key="r"
              class="reg-cell"
              :class="{ highlight: isHighlight(r) }"
            >
              <span class="reg-name">{{ r }}</span>
              <span class="reg-val">{{ fmt(regs[r]) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CENTER: Buses -->
      <div class="bus-col">
        <div class="bus addr-bus" :class="{ active: busActive === 'addr' }">
          <span class="bus-label">{{ t('cpuArchitecture.addressBus') }}</span>
          <span v-if="busActive === 'addr'" class="bus-val">{{ fmt(regs.MAR) }}</span>
        </div>
        <div class="bus data-bus" :class="{ active: busActive === 'data' }">
          <span class="bus-label">{{ t('cpuArchitecture.dataBus') }}</span>
          <span v-if="busActive === 'data'" class="bus-val">{{ regs.MDR !== null ? regs.MDR : '' }}</span>
        </div>
        <div class="bus ctrl-bus" :class="{ active: busActive === 'ctrl' }">
          <span class="bus-label">{{ t('cpuArchitecture.controlBus') }}</span>
          <span v-if="busActive === 'ctrl'" class="bus-val">{{ ctrlSignal }}</span>
        </div>
        <!-- arrows -->
        <div class="arrow-row">
          <div class="arrow" :class="{ lit: busActive === 'addr' }">→</div>
          <div class="arrow" :class="{ lit: busActive === 'data' }">↔</div>
          <div class="arrow" :class="{ lit: busActive === 'ctrl' }">→</div>
        </div>
      </div>

      <!-- RIGHT: Memory -->
      <div class="mem-box">
        <div class="mem-label">{{ t('cpuArchitecture.mainMemory') }}</div>
        <div class="mem-rows">
          <div
            v-for="(inst, i) in program"
            :key="i"
            class="mem-row"
            :class="{
              'pc-row': regs.PC === BASE_ADDR + i,
              'mar-row': regs.MAR === BASE_ADDR + i && busActive === 'addr',
              'fetched': fetchedAddr === BASE_ADDR + i
            }"
          >
            <span class="pc-arrow">{{ regs.PC === BASE_ADDR + i ? '▶' : '\u00a0' }}</span>
            <span class="mem-addr">{{ hex(BASE_ADDR + i) }}</span>
            <span class="mem-inst">{{ inst.asm }}</span>
          </div>
        </div>
        <div class="mem-data-area">
          <div class="mem-label-sm">{{ t('cpuArchitecture.dataArea') }}</div>
          <div
            v-for="(val, addr) in dataMemory"
            :key="addr"
            class="mem-row data-row"
            :class="{ 'mar-row': regs.MAR === addr && busActive === 'addr' }"
          >
            <span class="pc-arrow">&nbsp;</span>
            <span class="mem-addr">{{ hex(addr) }}</span>
            <span class="mem-inst">{{ val }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Pipeline bar -->
    <div class="pipeline-bar">
      <div
        v-for="(ph, i) in phases"
        :key="i"
        class="ph-cell"
        :class="{ 'ph-active': currentPhase === i, 'ph-done': currentPhase > i }"
      >
        <span class="ph-en">{{ ph.en }}</span>
        <span class="ph-zh">{{ ph.zh }}</span>
      </div>
    </div>

    <!-- Step detail -->
    <div class="step-detail">
      <div class="step-badge">{{ t('cpuArchitecture.stepBadge', { step: stepIndex, total: totalSteps }) }}</div>
      <div class="step-msg">{{ currentStep.msg }}</div>
      <div v-if="currentStep.signal" class="step-signal">
        {{ t('cpuArchitecture.signalLabel') }}<code>{{ currentStep.signal }}</code>
      </div>
    </div>

    <!-- Controls -->
    <div class="controls">
      <button class="btn-clock" :disabled="done" @click="advance">
        {{ t('cpuArchitecture.clockButton') }}
      </button>
      <button class="btn-auto" :disabled="done" @click="toggleAuto">
        {{ autoRunning ? t('cpuArchitecture.autoPause') : t('cpuArchitecture.autoRun') }}
      </button>
      <button class="btn-reset" @click="reset">{{ t('cpuArchitecture.reset') }}</button>
    </div>

    <div v-if="done" class="done-msg">
      {{ t('cpuArchitecture.done', { programLength: program.length, stepIndex }) }}
      <button class="btn-reset inline" @click="reset">{{ t('cpuArchitecture.restart') }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals/index.js'

const { t, messages } = useI18n(computerFundamentalsLocale)

const BASE_ADDR = 0x100
const DATA_BASE = 0x200

// Program: 4 instructions
const program = [
  { asm: 'LOAD R0, [0x200]',  op: 'LOAD',  dst: 'R0', src: DATA_BASE },
  { asm: 'LOAD R1, #7',       op: 'LOADI', dst: 'R1', imm: 7 },
  { asm: 'ADD  R0, R1',       op: 'ADD',   dst: 'R0', src: 'R1' },
  { asm: 'STORE [0x201], R0', op: 'STORE', addr: DATA_BASE + 1, src: 'R0' },
]

const phases = computed(() =>
  messages.value.cpuArchitecture.phases.map(([en, zh]) => ({ en, zh }))
)

function hex(n) { return n != null ? '0x' + n.toString(16).toUpperCase().padStart(3, '0') : '—' }
function fmt(v) { return v != null ? v : '—' }
function msg(key, params = {}) {
  return { key, params }
}
function sig(key, params = {}) {
  return { key, params }
}

// Build step sequence for all instructions
function buildSteps() {
  const steps = []
  for (let i = 0; i < program.length; i++) {
    const inst = program[i]
    const pc = BASE_ADDR + i

    // ── FETCH (3 sub-steps) ──────────────────────────────────────────
    steps.push({
      phase: 0,
      highlights: ['PC'],
      bus: 'ctrl',
      ctrlSignal: 'READ',
      aluOp: 'idle',
      regUpdates: { MAR: pc },
      msg: msg('fetch1', { pc: hex(pc) }),
      signal: sig('marPc', { pc: hex(pc) }),
    })
    steps.push({
      phase: 0,
      highlights: ['MAR'],
      bus: 'addr',
      ctrlSignal: 'READ',
      aluOp: 'idle',
      regUpdates: {},
      msg: msg('fetch2', { pc: hex(pc) }),
      signal: sig('addr', { pc: hex(pc) }),
    })
    steps.push({
      phase: 0,
      highlights: ['MDR', 'IR'],
      bus: 'data',
      ctrlSignal: 'READ',
      aluOp: 'idle',
      regUpdates: { MDR: inst.asm, IR: inst.asm, PC: pc + 1 },
      fetchedAddr: pc,
      msg: msg('fetch3', { inst: inst.asm, nextPc: hex(pc + 1) }),
      signal: sig('mdrIrPc', { pc: hex(pc) }),
    })

    // ── DECODE (2 sub-steps) ─────────────────────────────────────────
    steps.push({
      phase: 1,
      highlights: ['IR'],
      bus: null,
      ctrlSignal: '',
      aluOp: 'decode',
      regUpdates: {},
      msg: msg('decode1', { inst: inst.asm }),
      signal: sig('opcode', { op: inst.op }),
    })
    steps.push({
      phase: 1,
      highlights: ['CU'],
      bus: 'ctrl',
      ctrlSignal: inst.op,
      aluOp: 'prepare',
      regUpdates: {},
      msg: msg('decode2', { op: inst.op }),
      signal: sig('control', { op: inst.op }),
    })

    // ── EXECUTE ──────────────────────────────────────────────────────
    if (inst.op === 'LOAD') {
      steps.push({
        phase: 2,
        highlights: ['MAR'],
        bus: 'addr',
        ctrlSignal: 'READ',
        aluOp: 'readMemory',
        regUpdates: { MAR: inst.src },
        msg: msg('load1', { src: hex(inst.src) }),
        signal: sig('load1', { src: hex(inst.src) }),
      })
      steps.push({
        phase: 2,
        highlights: ['MDR', 'R0'],
        bus: 'data',
        ctrlSignal: 'READ',
        aluOp: 'readMemory',
        regUpdates: { MDR: 42, [inst.dst]: 42 },
        msg: msg('load2', { src: hex(inst.src), dst: inst.dst }),
        signal: sig('load2', { src: hex(inst.src), dst: inst.dst }),
      })
    } else if (inst.op === 'LOADI') {
      steps.push({
        phase: 2,
        highlights: ['IR', inst.dst],
        bus: null,
        ctrlSignal: 'LOADI',
        aluOp: 'immediate',
        regUpdates: { [inst.dst]: inst.imm },
        msg: msg('loadi', { imm: inst.imm, dst: inst.dst }),
        signal: sig('loadi', { imm: inst.imm, dst: inst.dst }),
      })
    } else if (inst.op === 'ADD') {
      steps.push({
        phase: 2,
        highlights: ['R0', 'R1', 'ACC'],
        bus: null,
        ctrlSignal: 'ADD',
        aluOp: 'R0 + R1',
        regUpdates: { ACC: null }, // computed at runtime
        msg: msg('add1'),
        signal: sig('add1'),
      })
      steps.push({
        phase: 2,
        highlights: ['ACC'],
        bus: null,
        ctrlSignal: 'ADD',
        aluOp: 'result',
        regUpdates: { ACC: '__ADD_RESULT__' },
        msg: msg('add2'),
        signal: sig('add2'),
      })
    } else if (inst.op === 'STORE') {
      steps.push({
        phase: 2,
        highlights: ['MAR', 'MDR'],
        bus: 'addr',
        ctrlSignal: 'WRITE',
        aluOp: 'writeMemory',
        regUpdates: { MAR: inst.addr, MDR: '__FROM_R0__' },
        msg: msg('store1', { addr: hex(inst.addr), src: inst.src }),
        signal: sig('store1', { addr: hex(inst.addr), src: inst.src }),
      })
      steps.push({
        phase: 2,
        highlights: ['MDR'],
        bus: 'data',
        ctrlSignal: 'WRITE',
        aluOp: 'writeMemory',
        regUpdates: { '__MEM__': inst.addr },
        msg: msg('store2', { addr: hex(inst.addr) }),
        signal: sig('store2', { addr: hex(inst.addr) }),
      })
    }

    // ── WRITE BACK ───────────────────────────────────────────────────
    if (inst.op === 'ADD') {
      steps.push({
        phase: 3,
        highlights: ['ACC', 'R0'],
        bus: null,
        ctrlSignal: 'WB',
        aluOp: 'writeBack',
        regUpdates: { R0: '__ACC__' },
        msg: msg('wbAdd1'),
        signal: sig('wbAdd'),
      })
      steps.push({
        phase: 3,
        highlights: ['PC'],
        bus: null,
        ctrlSignal: 'WB',
        aluOp: 'idle',
        regUpdates: {},
        msg: msg('wbAdd2', { nextPc: hex(pc + 1) }),
        signal: sig('wbAddPc', { nextPc: hex(pc + 1) }),
      })
    } else if (inst.op === 'STORE') {
      steps.push({
        phase: 3,
        highlights: ['PC'],
        bus: null,
        ctrlSignal: 'WB',
        aluOp: 'idle',
        regUpdates: {},
        msg: msg('wbStore', { nextPc: hex(pc + 1) }),
        signal: sig('wbStore'),
      })
    } else {
      steps.push({
        phase: 3,
        highlights: ['PC'],
        bus: null,
        ctrlSignal: 'WB',
        aluOp: 'idle',
        regUpdates: {},
        msg: msg('wbDefault', { nextPc: hex(pc + 1) }),
        signal: sig('wbDefault', { nextPc: hex(pc + 1) }),
      })
    }
  }
  return steps
}

const allSteps = buildSteps()
const totalSteps = allSteps.length

const stepIndex = ref(0)
const done = ref(false)
const autoRunning = ref(false)
let autoTimer = null

// CPU state
const regs = ref({ PC: BASE_ADDR, IR: '', MAR: null, MDR: null, ACC: 0, R0: 0, R1: 0, R2: 0, R3: 0 })
const busActive = ref(null)
const ctrlSignal = ref('')
const aluOp = ref('idle')
const fetchedAddr = ref(null)
const dataMemory = ref({ [DATA_BASE]: 42, [DATA_BASE + 1]: 0 })
const activeHighlights = ref([])
const currentPhase = ref(-1)

const currentStep = computed(() => {
  if (stepIndex.value === 0) {
    return {
      msg: t('cpuArchitecture.startHint'),
      signal: null
    }
  }
  const step = allSteps[Math.min(stepIndex.value - 1, totalSteps - 1)]
  return {
    ...step,
    msg: t(`cpuArchitecture.steps.${step.msg.key}`, step.msg.params),
    signal: step.signal
      ? t(`cpuArchitecture.steps.signal.${step.signal.key}`, step.signal.params)
      : null
  }
})
function isHighlight(name) { return activeHighlights.value.includes(name) }
function isActive(unit) {
  if (unit === 'CU') return currentPhase.value === 0 || currentPhase.value === 1
  if (unit === 'ALU') {
    return (
      currentPhase.value === 2 &&
      aluOp.value !== 'readMemory' &&
      aluOp.value !== 'writeMemory'
    )
  }
  return false
}

function applyStep(step) {
  currentPhase.value = step.phase
  busActive.value = step.bus
  ctrlSignal.value = step.ctrlSignal || ''
  aluOp.value = step.aluOp || 'idle'
  activeHighlights.value = step.highlights || []
  if (step.fetchedAddr != null) fetchedAddr.value = step.fetchedAddr

  for (const [k, v] of Object.entries(step.regUpdates || {})) {
    if (k === '__MEM__') {
      dataMemory.value = { ...dataMemory.value, [v]: regs.value.MDR }
    } else if (v === '__ADD_RESULT__') {
      regs.value = { ...regs.value, ACC: regs.value.R0 + regs.value.R1 }
    } else if (v === '__ACC__') {
      regs.value = { ...regs.value, R0: regs.value.ACC }
    } else if (v === '__FROM_R0__') {
      regs.value = { ...regs.value, MDR: regs.value.R0 }
    } else if (v === null) {
      // no-op placeholder
    } else {
      regs.value = { ...regs.value, [k]: v }
    }
  }
}

function advance() {
  if (done.value) return
  applyStep(allSteps[stepIndex.value])
  stepIndex.value++
  if (stepIndex.value >= totalSteps) {
    done.value = true
    stopAuto()
  }
}

function toggleAuto() {
  if (autoRunning.value) {
    stopAuto()
  } else {
    autoRunning.value = true
    autoTimer = setInterval(() => {
      if (done.value) {
        stopAuto()
        return
      }
      advance()
    }, 900)
  }
}

function stopAuto() {
  autoRunning.value = false
  if (autoTimer) {
    clearInterval(autoTimer)
    autoTimer = null
  }
}

function reset() {
  stopAuto()
  stepIndex.value = 0
  done.value = false
  regs.value = { PC: BASE_ADDR, IR: '', MAR: null, MDR: null, ACC: 0, R0: 0, R1: 0, R2: 0, R3: 0 }
  busActive.value = null
  ctrlSignal.value = ''
  aluOp.value = 'idle'
  fetchedAddr.value = null
  dataMemory.value = { [DATA_BASE]: 42, [DATA_BASE + 1]: 0 }
  activeHighlights.value = []
  currentPhase.value = -1
}

onUnmounted(() => {
  stopAuto()
})
</script>

<style scoped>
.cpu-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
  font-size: 0.82rem;
}

.demo-title {
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.9rem;
  text-align: center;
}

/* ── Main layout ── */
.main-layout {
  display: grid;
  grid-template-columns: 1fr 80px 1fr;
  gap: 0.6rem;
  margin-bottom: 0.8rem;
}

/* ── CPU box ── */
.cpu-box {
  border: 2px dashed var(--vp-c-brand-1);
  border-radius: 8px;
  padding: 0.6rem;
  background: var(--vp-c-bg);
  position: relative;
}
.cpu-label {
  position: absolute;
  top: -0.6rem;
  left: 0.8rem;
  background: var(--vp-c-bg-soft);
  padding: 0 0.4rem;
  font-weight: 700;
  font-size: 0.75rem;
  color: var(--vp-c-brand-1);
}

.unit {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.45rem 0.5rem;
  margin-bottom: 0.45rem;
  background: var(--vp-c-bg-soft);
  transition: background 0.25s, border-color 0.25s;
}
.unit:last-child { margin-bottom: 0; }
.unit.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
}
.unit-title {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.regs-row {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.reg-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.25rem 0.4rem;
  min-width: 52px;
  transition: background 0.2s, border-color 0.2s;
}
.reg-cell.highlight {
  background: #fef08a;
  border-color: #ca8a04;
}
.dark .reg-cell.highlight {
  background: #713f12;
  border-color: #fbbf24;
}
.reg-name {
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}
.reg-val {
  font-family: monospace;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  word-break: break-all;
  text-align: center;
}
.ir-val {
  font-size: 0.6rem;
  max-width: 90px;
}
.reg-hint {
  font-size: 0.55rem;
  color: var(--vp-c-text-3);
  text-align: center;
}

.alu-op {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  min-width: 60px;
  transition: color 0.2s;
}
.alu-op.running {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

/* ── Bus column ── */
.bus-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
}

.bus {
  border-radius: 4px;
  padding: 0.3rem 0.4rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background 0.25s, border-color 0.25s;
}
.bus.active { border-color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); }
.addr-bus.active { border-color: #3b82f6; background: #eff6ff; }
.data-bus.active { border-color: #10b981; background: #ecfdf5; }
.ctrl-bus.active { border-color: #f59e0b; background: #fffbeb; }
.dark .addr-bus.active { background: #1e3a5f; }
.dark .data-bus.active { background: #064e3b; }
.dark .ctrl-bus.active { background: #451a03; }

.bus-label {
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--vp-c-text-3);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  letter-spacing: 1px;
}
.bus-val {
  font-family: monospace;
  font-size: 0.6rem;
  color: var(--vp-c-brand-1);
  word-break: break-all;
  text-align: center;
  margin-top: 0.2rem;
}

.arrow-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}
.arrow {
  font-size: 1rem;
  color: var(--vp-c-text-3);
  transition: color 0.2s;
}
.arrow.lit { color: var(--vp-c-brand-1); }

/* ── Memory box ── */
.mem-box {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.6rem;
  background: var(--vp-c-bg-alt);
}
.mem-label {
  font-weight: 700;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.4rem;
  text-align: center;
}
.mem-label-sm {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
  margin: 0.4rem 0 0.2rem;
  border-top: 1px dashed var(--vp-c-divider);
  padding-top: 0.3rem;
}
.mem-rows { display: flex; flex-direction: column; gap: 0.25rem; }
.mem-row {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-family: monospace;
  font-size: 0.7rem;
  padding: 0.2rem 0.3rem;
  border-radius: 3px;
  border: 1px solid transparent;
  transition: background 0.2s, border-color 0.2s;
}
.mem-row.pc-row {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
}
.mem-row.mar-row {
  background: #eff6ff;
  border-color: #3b82f6;
}
.dark .mem-row.mar-row { background: #1e3a5f; }
.mem-row.fetched {
  background: #f0fdf4;
  border-color: #10b981;
}
.dark .mem-row.fetched { background: #064e3b; }
.pc-arrow { color: var(--vp-c-brand-1); font-weight: 700; width: 10px; }
.mem-addr { color: var(--vp-c-text-3); min-width: 42px; }
.mem-inst { color: var(--vp-c-text-1); }
.data-row .mem-inst { color: var(--vp-c-text-2); }

/* ── Pipeline bar ── */
.pipeline-bar {
  display: flex;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 0.7rem;
}
.ph-cell {
  flex: 1;
  text-align: center;
  padding: 0.35rem 0;
  border-right: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  transition: background 0.2s;
}
.ph-cell:last-child { border-right: none; }
.ph-cell.ph-done { background: var(--vp-c-bg-alt); }
.ph-cell.ph-active { background: var(--vp-c-brand-1); color: white; }
.ph-en { display: block; font-size: 0.65rem; font-weight: 700; }
.ph-zh { display: block; font-size: 0.72rem; }

/* ── Step detail ── */
.step-detail {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.6rem 0.8rem;
  margin-bottom: 0.7rem;
  min-height: 60px;
}
.step-badge {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 700;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 3px;
  padding: 0.1rem 0.4rem;
  margin-bottom: 0.3rem;
}
.step-msg {
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  line-height: 1.5;
}
.step-signal {
  margin-top: 0.3rem;
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
}
.step-signal code {
  background: var(--vp-c-bg-soft);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-family: monospace;
}

/* ── Controls ── */
.controls {
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  flex-wrap: wrap;
}
.btn-clock, .btn-auto, .btn-reset {
  padding: 0.45rem 1rem;
  border-radius: 5px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: opacity 0.2s;
}
.btn-clock { background: var(--vp-c-brand-1); color: white; }
.btn-auto  { background: #10b981; color: white; }
.btn-reset { background: transparent; border: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); }
.btn-clock:disabled, .btn-auto:disabled { opacity: 0.4; cursor: not-allowed; }
.btn-clock:not(:disabled):hover { opacity: 0.85; }
.btn-auto:not(:disabled):hover  { opacity: 0.85; }

.done-msg {
  margin-top: 0.7rem;
  text-align: center;
  font-size: 0.82rem;
  color: #10b981;
  font-weight: 600;
}
.btn-reset.inline {
  margin-left: 0.5rem;
  padding: 0.2rem 0.6rem;
  font-size: 0.75rem;
}

@media (max-width: 680px) {
  .main-layout {
    grid-template-columns: 1fr;
  }
  .bus-col {
    flex-direction: row;
    justify-content: space-around;
  }
  .bus-label { writing-mode: horizontal-tb; }
  .arrow-row { flex-direction: row; }
}
</style>
