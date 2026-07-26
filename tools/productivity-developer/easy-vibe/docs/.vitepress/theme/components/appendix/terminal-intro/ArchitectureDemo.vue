<template>
  <div class="arch-demo">
    <div class="analogy-header">
      <div class="analogy-item">
        <div class="icon">
          🖥️
        </div>
        <div class="text">
          <div class="role">
            {{ t('architecture.terminalRole') }} (Terminal)
          </div>
          <div class="desc">
            {{ t('architecture.terminalDesc') }} / Conduit / Window
          </div>
        </div>
      </div>
      <div class="analogy-item">
        <div class="icon">
          🗣️
        </div>
        <div class="text">
          <div class="role">
            {{ t('architecture.shellRole') }} (Shell)
          </div>
          <div class="desc">
            {{ t('architecture.shellDesc') }} / Interpreter / Assistant
          </div>
        </div>
      </div>
      <div class="analogy-item">
        <div class="icon">
          ⚙️
        </div>
        <div class="text">
          <div class="role">
            {{ t('architecture.kernelRole') }} (Kernel)
          </div>
          <div class="desc">
            {{ t('architecture.kernelDesc') }} / Manager / Chip
          </div>
        </div>
      </div>
    </div>

    <div
      class="diagram-container"
      :class="{ clickable: currentStep < totalSteps.value }"
      @click="nextStep"
    >
      <!-- Click Overlay Hint -->
      <div
        v-if="currentStep === 0"
        class="click-overlay"
      >
        <div class="click-hint">
          <span class="icon">👆</span>
          <span class="text">{{ t('architecture.clickStart') }} / Keep Clicking</span>
        </div>
      </div>

      <!-- Completed Overlay -->
      <div
        v-if="currentStep >= totalSteps.value"
        class="completed-overlay"
      >
        <div
          class="completed-hint"
          @click.stop="reset"
        >
          <span class="icon">✅</span>
          <span class="text">{{ t('architecture.finishedReset') }} / Finished (Reset)</span>
        </div>
      </div>

      <!-- Spaces Background -->
      <div class="spaces-bg">
        <div class="space user-space">
          <div class="space-header">
            {{ t('architecture.userSpace') }} / User Space
          </div>
        </div>
        <div class="barrier">
          <div class="barrier-line" />
        </div>
        <div class="space kernel-space">
          <div class="space-header">
            {{ t('architecture.kernelSpace') }} / Kernel Space
          </div>
        </div>
      </div>

      <!-- Terminal Node -->
      <div
        class="node terminal"
        :class="{ active: activeNode === 'terminal' }"
      >
        <div class="node-title">
          TERMINAL ({{ t('architecture.terminalLabel') }})
        </div>
        <div class="screen">
          <div
            v-for="(line, i) in terminalLines"
            :key="i"
            class="line"
          >
            {{ line }}
          </div>
          <div class="line input-line">
            <span class="prompt">$</span>
            <span class="typing">{{ currentInput }}</span>
            <span
              v-if="activeNode === 'terminal'"
              class="cursor"
            />
          </div>
        </div>
        <div class="node-label">
          /dev/tty
        </div>
      </div>

      <!-- Connections -->
      <div
        class="connection t-s"
        :class="{
          active: packetState === 't-to-s' || packetState === 's-to-t'
        }"
      >
        <div class="line-path" />
        <div
          v-if="packetState === 't-to-s'"
          class="data-label"
        >
          <span class="icon">➡️</span> Bytes
        </div>
        <div
          v-if="packetState === 's-to-t'"
          class="data-label"
        >
          <span class="icon">⬅️</span> Text
        </div>
        <div class="conn-label">
          stdin / stdout
        </div>
      </div>

      <!-- Shell Node -->
      <div
        class="node shell"
        :class="{ active: activeNode === 'shell' }"
      >
        <div class="node-title">
          SHELL ({{ t('architecture.shellLabel') }})
        </div>
        <div class="process-box">
          <div class="status-icon">
            {{ shellIcon }}
          </div>
          <div class="status">
            {{ shellStatus }}
          </div>
        </div>
        <div class="node-label">
          /bin/zsh
        </div>
      </div>

      <!-- Connections -->
      <div
        class="connection s-k"
        :class="{
          active: packetState === 's-to-k' || packetState === 'k-to-s'
        }"
      >
        <div class="line-path" />
        <div
          v-if="packetState === 's-to-k'"
          class="data-label"
        >
          <span class="icon">➡️</span> Syscall
        </div>
        <div
          v-if="packetState === 'k-to-s'"
          class="data-label"
        >
          <span class="icon">⬅️</span> Raw Data
        </div>
        <div class="conn-label">
          System Calls
        </div>
      </div>

      <!-- Kernel Node -->
      <div
        class="node kernel"
        :class="{ active: activeNode === 'kernel' }"
      >
        <div class="node-title">
          KERNEL ({{ t('architecture.kernelRole') }})
        </div>
        <div class="process-box">
          <div class="status-icon">
            {{ kernelIcon }}
          </div>
          <div class="status">
            {{ kernelStatus }}
          </div>
        </div>
        <div class="node-label">
          macOS / Linux
        </div>
      </div>
    </div>

    <div class="controls">
      <div class="btn-group">
        <button
          class="btn primary"
          :disabled="currentStep >= totalSteps.value"
          @click="nextStep"
        >
          <span v-if="currentStep === 0">▶️ {{ t('architecture.startSimulation') }} / Start Simulation</span>
          <span v-else-if="currentStep < totalSteps.value">{{ t('architecture.nextStep') }} / Next Step ({{ currentStep }}/{{ totalSteps.value }}) ➡️</span>
          <span v-else>✅ {{ t('architecture.done') }} / Done (Reset)</span>
        </button>
        <button
          v-if="currentStep > 0"
          class="btn secondary"
          @click="reset"
        >
          {{ t('architecture.reset') }} / Reset
        </button>
      </div>

      <div
        v-if="currentStep > 0"
        class="step-info"
      >
        <div class="step-title">
          {{ currentStepContent.titleEn }}
          <span class="divider">|</span>
          {{ currentStepContent.titleZh }}
        </div>
        <div class="step-desc">
          <div class="en">
            {{ currentStepContent.descEn }}
          </div>
          <div class="zh">
            {{ currentStepContent.descZh }}
          </div>
        </div>
        <div class="step-tech">
          <span class="tech-label">Technical / {{ t('architecture.step9Title').split('. ')[1] }}:</span>
          <div class="tech-content">
            <div class="en">
              {{ currentStepContent.techEn }}
            </div>
            <div class="zh">
              {{ currentStepContent.techZh }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="step-info placeholder"
      >
        <div class="step-desc">
          <div class="en">
            Click "Start Simulation" to see how the command 'ls' travels through
            the system.
          </div>
          <div class="zh">
            {{ t('architecture.clickHint') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { terminalIntroLocale } from '../../../locales/terminal-intro/index.js'

const { t } = useI18n(terminalIntroLocale)

const currentStep = ref(0)
const activeNode = ref('terminal')
const packetState = ref(null)
const terminalLines = ref([])
const currentInput = ref('')
const shellStatus = ref('Idle')
const shellIcon = ref('💤')
const kernelStatus = ref('Idle')
const kernelIcon = ref('💤')

const steps = computed(() => [
  {
    titleEn: '1. User Input',
    titleZh: t('architecture.step1Title'),
    descEn:
      "You type 'ls' in the terminal window. The terminal captures your keystrokes.",
    descZh: t('architecture.step1Desc'),
    techEn: "Terminal buffers input in 'Cooked Mode' until you press Enter.",
    techZh: t('architecture.step1Tech'),
    action: async () => {
      activeNode.value = 'terminal'
      currentInput.value = 'l'
      await wait(200)
      currentInput.value = 'ls'
    }
  },
  {
    titleEn: '2. Transmission',
    titleZh: t('architecture.step2Title'),
    descEn:
      "The Terminal sends the characters 'l', 's', and 'Enter' to the Shell.",
    descZh: t('architecture.step2Desc'),
    techEn: 'Data travels via standard input (stdin) as a byte stream.',
    techZh: t('architecture.step2Tech'),
    action: async () => {
      packetState.value = 't-to-s'
      await wait(1000)
      packetState.value = null
    }
  },
  {
    titleEn: '3. Shell Parsing',
    titleZh: t('architecture.step3Title'),
    descEn: 'The Shell (Waiter) translates your command for the Kernel.',
    descZh: t('architecture.step3Desc'),
    techEn: "Shell tokenizes input, finds the 'ls' executable in $PATH.",
    techZh: t('architecture.step3Tech'),
    action: async () => {
      activeNode.value = 'shell'
      shellIcon.value = '🧠'
      shellStatus.value = 'Parsing "ls"...'
    }
  },
  {
    titleEn: '4. System Call',
    titleZh: t('architecture.step4Title'),
    descEn: 'The Shell asks the Kernel to read the file list from the disk.',
    descZh: t('architecture.step4Desc'),
    techEn: 'Shell invokes `execve()` and `getdents()` system calls.',
    techZh: t('architecture.step4Tech'),
    action: async () => {
      packetState.value = 's-to-k'
      await wait(1000)
      packetState.value = null
    }
  },
  {
    titleEn: '5. Kernel Execution',
    titleZh: t('architecture.step5Title'),
    descEn: 'The Kernel (Kitchen) executes the request by accessing hardware.',
    descZh: t('architecture.step5Desc'),
    techEn: 'Kernel driver accesses the file system (APFS/ext4).',
    techZh: t('architecture.step5Tech'),
    action: async () => {
      activeNode.value = 'kernel'
      kernelIcon.value = '💾'
      kernelStatus.value = 'Reading Disk...'
      await wait(800)
      kernelStatus.value = 'Data Found'
    }
  },
  {
    titleEn: '6. Returning Data',
    titleZh: t('architecture.step6Title'),
    descEn: 'The Kernel gives the raw file list back to the Shell.',
    descZh: t('architecture.step6Desc'),
    techEn: 'System call returns with file descriptors/structs.',
    techZh: t('architecture.step6Tech'),
    action: async () => {
      kernelStatus.value = 'Idle'
      kernelIcon.value = '💤'
      packetState.value = 'k-to-s'
      await wait(1000)
      packetState.value = null
    }
  },
  {
    titleEn: '7. Formatting',
    titleZh: t('architecture.step7Title'),
    descEn:
      'The Shell formats the raw list into text, adding colors if needed.',
    descZh: t('architecture.step7Desc'),
    techEn: 'Shell formats output buffer, adding ANSI color codes.',
    techZh: t('architecture.step7Tech'),
    action: async () => {
      activeNode.value = 'shell'
      shellIcon.value = '🎨'
      shellStatus.value = 'Formatting...'
      await wait(500)
    }
  },
  {
    titleEn: '8. Display Output',
    titleZh: t('architecture.step8Title'),
    descEn: 'The Shell sends the final text back to the Terminal to show you.',
    descZh: t('architecture.step8Desc'),
    techEn: 'Data travels via standard output (stdout) to the TTY.',
    techZh: t('architecture.step8Tech'),
    action: async () => {
      shellStatus.value = 'Idle'
      shellIcon.value = '💤'
      packetState.value = 's-to-t'
      await wait(1000)
      packetState.value = null
    }
  },
  {
    titleEn: '9. Render',
    titleZh: t('architecture.step9Title'),
    descEn: 'The Terminal draws the text on the screen grid.',
    descZh: t('architecture.step9Desc'),
    techEn: 'Terminal emulator renders glyphs into the frame buffer.',
    techZh: t('architecture.step9Tech'),
    action: async () => {
      activeNode.value = 'terminal'
      terminalLines.value = ['file1.txt  photo.jpg', 'notes.md']
      currentInput.value = ''
    }
  }
])

const currentStepContent = computed(() => {
  if (currentStep.value === 0 || !steps.value[currentStep.value - 1]) {
    return { titleEn: '', titleZh: '', descEn: '', descZh: '', techEn: '', techZh: '' }
  }
  return steps.value[currentStep.value - 1]
})

const totalSteps = computed(() => steps.value.length)

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const nextStep = async () => {
  if (currentStep.value >= totalSteps.value) {
    reset()
    return
  }

  const step = steps.value[currentStep.value]
  currentStep.value++
  await step.action()
}

const reset = () => {
  currentStep.value = 0
  activeNode.value = 'terminal'
  packetState.value = null
  terminalLines.value = []
  currentInput.value = ''
  shellStatus.value = 'Idle'
  shellIcon.value = '💤'
  kernelStatus.value = 'Idle'
  kernelIcon.value = '💤'
}
</script>

<style scoped>
.arch-demo {
  background: #09090b;
  padding: 30px;
  border-radius: 12px;
  border: 1px solid #27272a;
  font-family: 'JetBrains Mono', 'Menlo', monospace;
  color: #e4e4e7;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.analogy-header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  border-bottom: 1px solid #27272a;
  padding-bottom: 20px;
}

.analogy-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
}

.analogy-item .icon {
  font-size: 24px;
  background: #18181b;
  padding: 8px;
  border-radius: 50%;
  border: 1px solid #27272a;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.analogy-item .role {
  font-weight: bold;
  color: #22d3ee;
  font-size: 13px;
}

.analogy-item .desc {
  font-size: 11px;
  color: #a1a1aa;
}

.diagram-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 40px 10px 20px 10px;
  z-index: 1;
  cursor: default;
  transition: background 0.3s;
}

.diagram-container.clickable {
  cursor: pointer;
}

.diagram-container.clickable:hover {
  background: rgba(255, 255, 255, 0.02);
}

.click-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  border-radius: 12px;
  animation: pulse-bg 2s infinite;
}

.click-hint {
  background: #22c55e;
  color: #000;
  padding: 10px 20px;
  border-radius: 30px;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);
  transform: scale(1);
  transition: transform 0.2s;
}

.diagram-container:hover .click-hint {
  transform: scale(1.05);
}

@keyframes pulse-bg {
  0% {
    background: rgba(0, 0, 0, 0.4);
  }
  50% {
    background: rgba(0, 0, 0, 0.2);
  }
  100% {
    background: rgba(0, 0, 0, 0.4);
  }
}

.completed-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  animation: fade-in 0.5s;
}

.completed-hint {
  background: #10b981;
  color: #fff;
  padding: 10px 20px;
  border-radius: 30px;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
  cursor: pointer;
  transition: transform 0.2s;
}

.completed-hint:hover {
  transform: scale(1.05);
  background: #059669;
}

.spaces-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 0;
  pointer-events: none;
}

.space {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.space-header {
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 8px;
  opacity: 0.7;
}

.user-space {
  flex: 2;
  background: rgba(34, 211, 238, 0.03);
  border-right: 1px dashed #3f3f46;
  border-radius: 8px 0 0 8px;
  align-items: flex-start;
  z-index: 0;
}

.user-space .space-header {
  color: #22d3ee;
}

.kernel-space {
  flex: 1;
  background: rgba(239, 68, 68, 0.03);
  border-radius: 0 8px 8px 0;
  align-items: flex-end;
  z-index: 0;
}

.kernel-space .space-header {
  color: #ef4444;
}

.barrier {
  width: 2px;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 10;
}

.barrier-line {
  width: 2px;
  height: 100%;
  background: repeating-linear-gradient(
    to bottom,
    #facc15 0,
    #facc15 10px,
    transparent 10px,
    transparent 20px
  );
  opacity: 0.3;
}

.node {
  background: #18181b;
  border: 2px solid #27272a;
  border-radius: 6px;
  width: 140px;
  height: 130px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  z-index: 5;
  position: relative;
}

.node.shell {
  z-index: 1;
}

.node.active {
  border-color: #22c55e;
  box-shadow: 0 0 15px rgba(34, 197, 94, 0.2);
  transform: translateY(-2px);
}

.node-title {
  background: #27272a;
  color: #a1a1aa;
  font-size: 10px;
  padding: 6px 0;
  text-align: center;
  font-weight: bold;
  letter-spacing: 1px;
  border-radius: 6px 6px 0 0;
}

.node-label {
  position: absolute;
  bottom: -20px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 10px;
  color: #71717a;
}

.screen,
.process-box {
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  font-size: 12px;
}

.process-box {
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.status-icon {
  font-size: 24px;
}

.screen {
  background: #000;
  justify-content: flex-start;
  font-family: monospace;
  overflow: hidden;
}

.line {
  height: 16px;
  white-space: nowrap;
  overflow: hidden;
}

.input-line {
  display: flex;
  align-items: center;
}

.prompt {
  color: #22c55e;
  margin-right: 4px;
}

.cursor {
  width: 6px;
  height: 12px;
  background: #e4e4e7;
  animation: blink 1s step-end infinite;
}

.status {
  text-align: center;
  color: #facc15;
  font-size: 11px;
}

.connection {
  flex: 1;
  height: 2px;
  background: #27272a;
  position: relative;
  margin: 0 15px;
  transition: all 0.3s;
}

.connection.active {
  background: #22c55e;
  box-shadow: 0 0 10px rgba(34, 197, 94, 0.4);
}

.conn-label {
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 10px;
  color: #52525b;
}

.data-label {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  background: #22c55e;
  color: #000;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: bold;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 10;
  animation: pop-in 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes pop-in {
  from {
    opacity: 0;
    transform: translate(-50%, 5px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #18181b;
  padding: 20px;
  border-radius: 6px;
  border: 1px solid #27272a;
}

.btn-group {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn {
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.btn.primary {
  background: #22c55e;
  color: #000;
}

.btn.primary:hover:not(:disabled) {
  background: #16a34a;
}

.btn.primary:disabled {
  background: #27272a;
  color: #71717a;
  cursor: not-allowed;
}

.btn.secondary {
  background: transparent;
  border-color: #3f3f46;
  color: #a1a1aa;
}

.btn.secondary:hover {
  border-color: #71717a;
  color: #e4e4e7;
}

.step-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;
  animation: fade-in 0.3s ease;
}

.step-title {
  font-size: 16px;
  font-weight: bold;
  color: #22d3ee;
}

.step-desc {
  font-size: 14px;
  color: #e4e4e7;
}

.step-tech {
  font-size: 12px;
  color: #71717a;
  background: #09090b;
  padding: 8px;
  border-radius: 4px;
  display: inline-block;
  margin: 0 auto;
}

.tech-label {
  color: #facc15;
  font-weight: bold;
  margin-right: 4px;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 640px) {
  .analogy-header {
    grid-template-columns: 1fr;
  }

  .diagram-container {
    flex-direction: column;
    gap: 50px;
    padding: 20px 0;
  }

  .connection {
    width: 2px;
    height: 50px;
    margin: 0;
  }

  .conn-label {
    top: 50%;
    left: 10px;
    right: auto;
    transform: translateY(-50%);
    text-align: left;
    white-space: nowrap;
  }
}
</style>
