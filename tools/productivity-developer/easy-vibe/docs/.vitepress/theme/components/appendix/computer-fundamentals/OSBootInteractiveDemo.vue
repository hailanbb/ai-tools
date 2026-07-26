<template>
  <div class="os-boot-demo">
    <div class="demo-header">
      <span class="demo-title">{{ t('powerOnToWeb.osBoot.title') }}</span>
    </div>

    <div class="main-layout">
      <div class="screen-panel">
        <div class="monitor">
          <div class="monitor-bezel">
            <div class="screen" :class="'stage-' + stage">
              <div v-if="stage === 0" class="screen-intro">
                <div class="intro-icon">🖥️</div>
                <div class="intro-title">{{ t('powerOnToWeb.osBoot.introTitle') }}</div>
                <div class="intro-desc" v-html="t('powerOnToWeb.osBoot.introDesc')"></div>
                <div class="os-icons">
                  <div v-for="os in osList" :key="os.name" class="os-item">
                    <span class="os-icon">{{ os.icon }}</span>
                    <span class="os-name">{{ os.name }}</span>
                  </div>
                </div>
              </div>

              <div v-if="stage === 1" class="screen-bootloader">
                <div class="bl-header">Bootloader</div>
                <div class="bl-flow">
                  <div v-for="(step, i) in blSteps" :key="i" class="bl-step" :class="{ active: blStep >= i }">
                    <span class="bl-num">{{ i + 1 }}</span>
                    <span class="bl-text">{{ step }}</span>
                  </div>
                </div>
                <div class="bl-code">
                  <div v-for="(line, i) in blCode" :key="i" class="code-line" :class="{ highlight: blCodeLine === i }">
                    {{ line }}
                  </div>
                </div>
              </div>

              <div v-if="stage === 2" class="screen-kernel">
                <div class="kernel-header">Kernel Loading</div>
                <div class="kernel-logo">⚙️</div>
                <div class="kernel-name">{{ kernelName }}</div>
                <div class="kernel-bar-wrap">
                  <div class="kernel-bar" :style="{ width: kernelProgress + '%' }"></div>
                </div>
                <div class="kernel-modules">
                  <div v-for="(m, i) in kernelModules" :key="i" class="k-module" :class="{ loaded: kernelProgress > (i + 1) * 20 }">
                    <span class="k-status">{{ kernelProgress > (i + 1) * 20 ? '✓' : '○' }}</span>
                    <span class="k-name">{{ m }}</span>
                  </div>
                </div>
              </div>

              <div v-if="stage === 3" class="screen-services">
                <div class="svc-header">System Services</div>
                <div class="svc-grid">
                  <div v-for="(svc, i) in services" :key="i" class="svc-item" :class="{ started: svcProgress > i * 15 }">
                    <span class="svc-icon">{{ svc.icon }}</span>
                    <span class="svc-name">{{ svc.name }}</span>
                    <span class="svc-status">{{ svcProgress > i * 15 ? '●' : '○' }}</span>
                  </div>
                </div>
                <div class="svc-progress-bar">
                  <div class="svc-progress-fill" :style="{ width: svcProgress + '%' }"></div>
                </div>
              </div>

              <div v-if="stage === 4" class="screen-desktop">
                <div class="desktop-bg">
                  <div class="desktop-icons">
                    <div v-for="(ic, i) in desktopIcons" :key="i" class="desktop-icon">
                      <span class="d-icon">{{ ic.icon }}</span>
                      <span class="d-label">{{ ic.label }}</span>
                    </div>
                  </div>
                  <div class="taskbar">
                    <span class="taskbar-start">🪟</span>
                    <span class="taskbar-apps">
                      <span v-for="(app, i) in taskbarApps" :key="i" class="taskbar-app">{{ app }}</span>
                    </span>
                    <span class="taskbar-time">{{ currentTime }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="stage-dots">
          <div
            v-for="(s, i) in stages"
            :key="i"
            class="stage-dot"
            :class="{ active: stage === i, done: stage > i }"
          >
            <span class="dot-label">{{ s.short }}</span>
          </div>
        </div>

        <div class="controls">
          <button class="ctrl-btn" :disabled="stage <= 0" @click="prev">
            {{ t('powerOnToWeb.controls.prev') }}
          </button>
          <button v-if="stage === 0" class="ctrl-btn primary" @click="next">
            {{ t('powerOnToWeb.controls.start') }}
          </button>
          <button v-else-if="stage < 4" class="ctrl-btn primary" @click="next">
            {{ t('powerOnToWeb.controls.next') }}
          </button>
          <button v-else class="ctrl-btn" @click="reset">
            {{ t('powerOnToWeb.controls.restart') }}
          </button>
        </div>
      </div>

      <div class="info-panel">
        <div class="info-stage-header">
          <span class="info-stage-icon">{{ currentStage.icon }}</span>
          <div>
            <div class="info-stage-name">{{ currentStage.name }}</div>
            <div class="info-stage-desc">{{ currentStage.desc }}</div>
          </div>
        </div>

        <div class="info-operations">
          <div
            v-for="(op, i) in currentStage.operations"
            :key="i"
            class="op-card"
            :class="{ expanded: expandedOp === i }"
            @click="expandedOp = expandedOp === i ? -1 : i"
          >
            <div class="op-header">
              <span class="op-num">{{ i + 1 }}</span>
              <span class="op-icon">{{ op.icon }}</span>
              <span class="op-name">{{ op.name }}</span>
              <span class="op-toggle">{{ expandedOp === i ? '▾' : '▸' }}</span>
            </div>
            <transition name="expand">
              <div v-if="expandedOp === i" class="op-detail">
                <div class="op-what">{{ op.what }}</div>
                <div v-if="op.details" class="op-details">
                  <div v-for="(d, j) in op.details" :key="j" class="op-detail-item">
                    <span class="od-dot">•</span>
                    <span>{{ d }}</span>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <div v-if="currentStage.analogy" class="info-analogy">
          <span class="analogy-icon">💡</span>
          <span>{{ currentStage.analogy }}</span>
        </div>

        <div v-if="stage === 0" class="os-comparison">
          <div class="os-comp-header">
            <span class="os-comp-icon">📊</span>
            <span class="os-comp-title">{{ t('powerOnToWeb.osBoot.osComparisonTitle') }}</span>
          </div>
          <div class="os-comp-table">
            <div class="os-comp-row os-comp-header-row">
              <span
                v-for="header in osComparisonHeaders"
                :key="header"
                class="os-comp-cell"
              >
                {{ header }}
              </span>
            </div>
            <div v-for="os in osList" :key="os.name" class="os-comp-row">
              <span class="os-comp-cell os-name-cell">
                <span class="os-comp-icon-small">{{ os.icon }}</span>
                {{ os.name }}
              </span>
              <span class="os-comp-cell">{{ os.feature }}</span>
              <span class="os-comp-cell">{{ os.device }}</span>
            </div>
          </div>
        </div>

        <div v-if="stage === 1" class="boot-flow-comparison">
          <div class="bf-header">
            <span class="bf-icon">🔄</span>
            <span class="bf-title">{{ t('powerOnToWeb.osBoot.bootFlowTitle') }}</span>
          </div>
          <div class="bf-content">
            <div class="bf-col">
              <div class="bf-os-name">🪟 Windows</div>
              <div class="bf-flow">
                <div v-for="(step, i) in windowsFlow" :key="i" class="bf-step">
                  <span v-if="i > 0" class="bf-arrow">↓</span>
                  <span class="bf-step-text">{{ step }}</span>
                </div>
              </div>
            </div>
            <div class="bf-col">
              <div class="bf-os-name">🐧 Linux</div>
              <div class="bf-flow">
                <div v-for="(step, i) in linuxFlow" :key="i" class="bf-step">
                  <span v-if="i > 0" class="bf-arrow">↓</span>
                  <span class="bf-step-text">{{ step }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../../../composables/useI18n'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals'

const { t, locale, messages } = useI18n(computerFundamentalsLocale)
const stage = ref(0)
const expandedOp = ref(-1)
const blStep = ref(-1)
const blCodeLine = ref(-1)
const kernelProgress = ref(0)
const svcProgress = ref(0)
const currentTime = ref('09:41')

const osBoot = computed(() => messages.value.powerOnToWeb.osBoot)
const osList = computed(() => osBoot.value.osList)
const osComparisonHeaders = computed(() => osBoot.value.osComparisonHeaders)
const blSteps = computed(() => osBoot.value.bootloaderSteps)
const blCode = [
  'mov ax, 0x07C0',
  'mov ds, ax',
  'read_sector:',
  '  mov ah, 0x02',
  '  int 0x13',
  'jmp 0x0000:0x7C00'
]

const kernelName = ref('ntoskrnl.exe')
const kernelModules = computed(() => osBoot.value.kernelModules)
const services = computed(() => osBoot.value.services)
const desktopIcons = computed(() => osBoot.value.desktopIcons)

const taskbarApps = ['🌐', '📁', '📝']

const windowsFlow = computed(() => osBoot.value.windowsFlow)
const linuxFlow = computed(() => osBoot.value.linuxFlow)
const stages = computed(() => osBoot.value.stages)
const currentStage = computed(() => stages.value[stage.value])

let timeInterval = null

onMounted(() => {
  timeInterval = setInterval(() => {
    const now = new Date()
    currentTime.value = now.toLocaleTimeString(locale.value, { hour: '2-digit', minute: '2-digit' })
  }, 1000)
})

const blTimer = ref(null)
const kernelTimer = ref(null)
const svcTimer = ref(null)

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval)
  if (blTimer.value) clearInterval(blTimer.value)
  if (kernelTimer.value) clearInterval(kernelTimer.value)
  if (svcTimer.value) clearInterval(svcTimer.value)
})

watch(() => stage.value, (newStage) => {
  if (blTimer.value) clearInterval(blTimer.value)
  if (newStage === 1) {
    blStep.value = -1
    blCodeLine.value = -1
    let step = 0
    blTimer.value = setInterval(() => {
      if (step < blSteps.value.length) {
        blStep.value = step
        blCodeLine.value = step + 1
        step++
      } else {
        if (blTimer.value) clearInterval(blTimer.value)
      }
    }, 600)
  }
})

watch(() => stage.value, (newStage) => {
  if (kernelTimer.value) clearInterval(kernelTimer.value)
  if (newStage === 2) {
    kernelProgress.value = 0
    kernelName.value = Math.random() > 0.5 ? 'ntoskrnl.exe' : 'vmlinuz'
    kernelTimer.value = setInterval(() => {
      if (kernelProgress.value < 100) {
        kernelProgress.value += 4
      } else {
        if (kernelTimer.value) clearInterval(kernelTimer.value)
      }
    }, 80)
  }
})

watch(() => stage.value, (newStage) => {
  if (svcTimer.value) clearInterval(svcTimer.value)
  if (newStage === 3) {
    svcProgress.value = 0
    svcTimer.value = setInterval(() => {
      if (svcProgress.value < 100) {
        svcProgress.value += 3
      } else {
        if (svcTimer.value) clearInterval(svcTimer.value)
      }
    }, 100)
  }
})

function next() {
  if (stage.value < 4) {
    stage.value++
    expandedOp.value = -1
  }
}
function prev() {
  if (stage.value > 0) {
    stage.value--
    expandedOp.value = -1
  }
}
function reset() {
  stage.value = 0
  expandedOp.value = -1
  blStep.value = -1
  blCodeLine.value = -1
  kernelProgress.value = 0
  svcProgress.value = 0
}
</script>

<style scoped>
.os-boot-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  padding: 1.2rem;
  margin: 1rem 0;
}
.demo-header { margin-bottom: 1rem; }
.demo-title { font-size: 0.9rem; font-weight: 700; color: var(--vp-c-text-1); }

.main-layout { display: flex; gap: 1rem; }

.screen-panel { flex: 0 0 280px; display: flex; flex-direction: column; gap: 0.6rem; }
.monitor { background: #222; border-radius: 10px; padding: 3px; }
.monitor-bezel { background: #111; border-radius: 8px; overflow: hidden; }
.screen {
  width: 100%; aspect-ratio: 4/3; display: flex;
  align-items: center; justify-content: center;
  font-family: 'Courier New', monospace; transition: background 0.5s;
  overflow: hidden; position: relative;
}

.stage-0 { background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%); }
.screen-intro { text-align: center; color: #fff; width: 100%; padding: 0.5rem; }
.intro-icon { font-size: 2rem; margin-bottom: 0.2rem; }
.intro-title { font-size: 0.8rem; font-weight: 700; margin-bottom: 0.2rem; }
.intro-desc { font-size: 0.55rem; color: #94a3b8; margin-bottom: 0.4rem; line-height: 1.4; }
.os-icons {
  display: grid; grid-template-columns: repeat(5, 1fr);
  gap: 0.2rem; padding: 0 0.3rem;
}
.os-item { display: flex; flex-direction: column; align-items: center; }
.os-icon { font-size: 1rem; }
.os-name { font-size: 0.4rem; color: #94a3b8; margin-top: 0.1rem; }

.stage-1 { background: #0f172a; flex-direction: column; padding: 0.5rem; align-items: flex-start; }
.screen-bootloader { width: 100%; }
.bl-header { color: #fbbf24; font-size: 0.55rem; margin-bottom: 0.4rem; font-weight: 700; }
.bl-flow { display: flex; flex-direction: column; gap: 0.2rem; margin-bottom: 0.4rem; }
.bl-step {
  display: flex; align-items: center; gap: 0.3rem;
  color: #64748b; font-size: 0.55rem;
  transition: all 0.3s;
}
.bl-step.active { color: #fbbf24; }
.bl-num {
  width: 1rem; height: 1rem; border-radius: 50%;
  background: rgba(255,255,255,0.1); display: flex;
  align-items: center; justify-content: center; font-size: 0.5rem;
}
.bl-step.active .bl-num { background: #fbbf24; color: #000; }
.bl-code {
  background: rgba(0,0,0,0.5); border-radius: 4px;
  padding: 0.3rem; font-size: 0.45rem; color: #64748b;
  font-family: monospace;
}
.code-line { line-height: 1.4; padding: 0 0.2rem; }
.code-line.highlight { color: #fbbf24; background: rgba(251, 191, 36, 0.1); border-radius: 2px; }

.stage-2 { background: #1a1a2e; flex-direction: column; padding: 0.6rem; }
.screen-kernel { text-align: center; width: 100%; }
.kernel-header { color: #60a5fa; font-size: 0.55rem; margin-bottom: 0.4rem; font-weight: 700; }
.kernel-logo { font-size: 2rem; margin-bottom: 0.2rem; }
.kernel-name { color: #fff; font-size: 0.6rem; margin-bottom: 0.4rem; }
.kernel-bar-wrap {
  width: 80%; height: 6px; background: #333; border-radius: 3px;
  margin: 0 auto 0.4rem; overflow: hidden;
}
.kernel-bar {
  height: 100%; background: linear-gradient(90deg, #60a5fa, #3b82f6);
  transition: width 0.1s linear;
}
.kernel-modules { display: flex; flex-direction: column; gap: 0.15rem; }
.k-module {
  display: flex; align-items: center; gap: 0.3rem;
  color: #64748b; font-size: 0.55rem;
}
.k-module.loaded { color: #4ade80; }
.k-status { width: 1rem; text-align: center; }

.stage-3 { background: #0f172a; flex-direction: column; padding: 0.5rem; }
.screen-services { width: 100%; }
.svc-header { color: #a78bfa; font-size: 0.55rem; margin-bottom: 0.4rem; font-weight: 700; }
.svc-grid {
  display: grid; grid-template-columns: repeat(2, 1fr);
  gap: 0.3rem; margin-bottom: 0.4rem;
}
.svc-item {
  display: flex; align-items: center; gap: 0.2rem;
  padding: 0.25rem; background: rgba(255,255,255,0.05);
  border-radius: 4px; font-size: 0.5rem; color: #64748b;
  transition: all 0.3s;
}
.svc-item.started { color: #a78bfa; background: rgba(167, 139, 250, 0.1); }
.svc-icon { font-size: 0.7rem; }
.svc-name { flex: 1; }
.svc-status { font-size: 0.5rem; }
.svc-progress-bar {
  height: 4px; background: #333; border-radius: 2px; overflow: hidden;
}
.svc-progress-fill {
  height: 100%; background: linear-gradient(90deg, #a78bfa, #8b5cf6);
  transition: width 0.1s linear;
}

.stage-4 { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 0; }
.screen-desktop { width: 100%; height: 100%; }
.desktop-bg {
  width: 100%; height: 100%;
  display: flex; flex-direction: column; justify-content: space-between;
}
.desktop-icons {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 0.3rem; padding: 0.6rem 0.4rem;
}
.desktop-icon {
  display: flex; flex-direction: column; align-items: center;
  gap: 0.1rem;
}
.d-icon { font-size: 1.2rem; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3)); }
.d-label { font-size: 0.45rem; color: white; text-shadow: 0 1px 2px rgba(0,0,0,0.5); }
.taskbar {
  background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
  display: flex; align-items: center; gap: 0.4rem;
  padding: 0.25rem 0.4rem;
}
.taskbar-start { font-size: 0.9rem; cursor: pointer; }
.taskbar-apps { display: flex; gap: 0.2rem; flex: 1; }
.taskbar-app { font-size: 0.8rem; opacity: 0.8; cursor: pointer; }
.taskbar-time { color: white; font-size: 0.5rem; }

.stage-dots { display: flex; justify-content: center; gap: 0.3rem; }
.stage-dot {
  padding: 0.15rem 0.4rem; border-radius: 10px;
  font-size: 0.55rem; color: var(--vp-c-text-3);
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  transition: all 0.3s;
}
.stage-dot.active {
  background: var(--vp-c-brand); color: white; border-color: var(--vp-c-brand);
}
.stage-dot.done { background: #10b981; color: white; border-color: #10b981; }
.dot-label { white-space: nowrap; }

.controls { display: flex; gap: 0.4rem; justify-content: center; }
.ctrl-btn {
  padding: 0.35rem 0.8rem; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); color: var(--vp-c-text-2); font-size: 0.68rem;
  cursor: pointer; transition: all 0.2s;
}
.ctrl-btn:hover:not(:disabled) { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }
.ctrl-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.ctrl-btn.primary {
  background: var(--vp-c-brand); color: white; border-color: var(--vp-c-brand);
}
.ctrl-btn.primary:hover { opacity: 0.9; }

.info-panel { flex: 1; min-width: 0; }
.info-stage-header { display: flex; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.7rem; }
.info-stage-icon { font-size: 1.4rem; }
.info-stage-name { font-size: 0.82rem; font-weight: 700; color: var(--vp-c-text-1); }
.info-stage-desc { font-size: 0.68rem; color: var(--vp-c-text-3); margin-top: 0.1rem; line-height: 1.4; }

.info-operations { display: flex; flex-direction: column; gap: 0.35rem; }
.op-card {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 6px; padding: 0.5rem 0.6rem; cursor: pointer;
  transition: all 0.2s;
}
.op-card.expanded { border-color: var(--vp-c-brand); box-shadow: 0 1px 8px rgba(0,0,0,0.05); }
.op-header { display: flex; align-items: center; gap: 0.4rem; }
.op-num {
  width: 1.2rem; height: 1.2rem; border-radius: 50%;
  background: var(--vp-c-brand-soft); color: var(--vp-c-brand);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.58rem; font-weight: 700; flex-shrink: 0;
}
.op-icon { font-size: 0.9rem; }
.op-name { flex: 1; font-size: 0.72rem; font-weight: 600; color: var(--vp-c-text-1); }
.op-toggle { font-size: 0.65rem; color: var(--vp-c-text-3); }

.op-detail { margin-top: 0.4rem; padding-top: 0.4rem; border-top: 1px dashed var(--vp-c-divider); }
.op-what { font-size: 0.66rem; color: var(--vp-c-text-2); line-height: 1.6; margin-bottom: 0.3rem; }
.op-details { display: flex; flex-direction: column; gap: 0.15rem; }
.op-detail-item {
  display: flex; align-items: flex-start; gap: 0.3rem;
  font-size: 0.62rem; color: var(--vp-c-text-3); line-height: 1.4;
}
.od-dot { color: var(--vp-c-brand); flex-shrink: 0; }

.info-analogy {
  display: flex; align-items: flex-start; gap: 0.4rem;
  margin-top: 0.6rem; padding: 0.5rem 0.6rem;
  background: var(--vp-c-brand-soft); border-radius: 6px;
  font-size: 0.64rem; color: var(--vp-c-text-2);
  line-height: 1.5; font-style: italic;
}
.analogy-icon { font-size: 0.85rem; flex-shrink: 0; }

.os-comparison {
  margin-top: 0.6rem; padding: 0.5rem 0.6rem;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}
.os-comp-header {
  display: flex; align-items: center; gap: 0.3rem;
  margin-bottom: 0.4rem;
}
.os-comp-icon { font-size: 0.9rem; }
.os-comp-title { font-size: 0.7rem; font-weight: 600; color: var(--vp-c-text-1); }
.os-comp-table { display: flex; flex-direction: column; gap: 0.2rem; }
.os-comp-row {
  display: grid; grid-template-columns: 1.2fr 1.5fr 1.3fr;
  gap: 0.3rem; font-size: 0.6rem; padding: 0.2rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}
.os-comp-row:last-child { border-bottom: none; }
.os-comp-header-row { font-weight: 600; color: var(--vp-c-text-1); }
.os-comp-cell { color: var(--vp-c-text-2); }
.os-name-cell { display: flex; align-items: center; gap: 0.2rem; }
.os-comp-icon-small { font-size: 0.7rem; }

.boot-flow-comparison {
  margin-top: 0.6rem; padding: 0.5rem 0.6rem;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}
.bf-header {
  display: flex; align-items: center; gap: 0.3rem;
  margin-bottom: 0.4rem;
}
.bf-icon { font-size: 0.9rem; }
.bf-title { font-size: 0.7rem; font-weight: 600; color: var(--vp-c-text-1); }
.bf-content { display: flex; gap: 0.5rem; }
.bf-col { flex: 1; }
.bf-os-name { font-size: 0.65rem; font-weight: 600; color: var(--vp-c-text-1); margin-bottom: 0.3rem; }
.bf-flow { display: flex; flex-direction: column; gap: 0.15rem; }
.bf-step { display: flex; flex-direction: column; align-items: center; font-size: 0.55rem; }
.bf-arrow { color: var(--vp-c-brand); font-size: 0.6rem; }
.bf-step-text {
  padding: 0.15rem 0.3rem; background: var(--vp-c-bg-soft);
  border-radius: 3px; color: var(--vp-c-text-2);
}

.expand-enter-active, .expand-leave-active { transition: all 0.25s ease; overflow: hidden; }
.expand-enter-from, .expand-leave-to { opacity: 0; max-height: 0; }
.expand-enter-to, .expand-leave-from { opacity: 1; max-height: 20rem; }

@media (max-width: 720px) {
  .main-layout { flex-direction: column; }
  .screen-panel { flex: none; width: 100%; }
  .bf-content { flex-direction: column; }
}
</style>
