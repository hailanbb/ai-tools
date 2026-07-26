<template>
  <el-card
    class="cot-demo-card"
    shadow="hover"
  >
    <template #header>
      <div class="controls-header">
        <div class="control-group">
          <span class="label">{{ t('chainOfThought.taskLabel') }}</span>
          <el-select
            v-model="currentTask"
            style="width: 200px"
          >
            <el-option
              :label="t('chainOfThought.taskCodeReview')"
              value="debug"
            />
            <el-option
              :label="t('chainOfThought.taskTravelPlan')"
              value="travel"
            />
          </el-select>
        </div>

        <div class="control-group">
          <span class="label">{{ t('chainOfThought.modeLabel') }}</span>
          <el-radio-group v-model="currentMode">
            <el-radio-button
              v-for="m in modes"
              :key="m.id"
              :label="m.id"
            >
              {{ m.label }}
            </el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </template>

    <div class="demo-content">
      <el-row :gutter="20">
        <!-- Left: Prompt Input -->
        <el-col
          :xs="24"
          :md="10"
        >
          <el-card
            shadow="never"
            class="prompt-panel"
          >
            <template #header>
              <div class="panel-header">
                <el-icon><EditPen /></el-icon>
                <span>{{ t('chainOfThought.promptTitle') }}</span>
              </div>
            </template>
            <div class="prompt-text">
              {{ currentScenario.prompt }}
            </div>
            <div class="action-area">
              <el-button
                type="primary"
                :loading="isPlaying"
                class="run-btn"
                size="large"
                @click="runSimulation"
              >
                {{ isPlaying ? t('common.running') : t('common.run') }}
              </el-button>
            </div>
          </el-card>
        </el-col>

        <!-- Right: AI Output Process -->
        <el-col
          :xs="24"
          :md="14"
        >
          <el-card
            shadow="never"
            class="output-panel"
          >
            <template #header>
              <div class="panel-header">
                <div class="left">
                  <el-icon><Cpu /></el-icon>
                  <span>{{ t('chainOfThought.outputTitle') }}</span>
                </div>
                <el-tag
                  :type="statusType"
                  effect="dark"
                  size="small"
                >
                  {{ statusText }}
                </el-tag>
              </div>
            </template>

            <div
              ref="outputContainer"
              class="output-container"
            >
              <el-empty
                v-if="!hasRun && !isPlaying"
                :description="t('chainOfThought.emptyHint')"
                :image-size="80"
              />

              <el-timeline v-else>
                <el-timeline-item
                  v-for="(step, index) in displaySteps"
                  :key="index"
                  :type="getStepType(index)"
                  :hollow="index > currentStepIndex"
                  :timestamp="currentStepIndex === index ? 'Thinking...' : ''"
                  placement="top"
                >
                  <h4 class="step-title">
                    {{ step.title }}
                  </h4>
                  <div
                    v-if="step.content"
                    class="step-content"
                  >
                    {{ step.displayedContent }}<span
                      v-if="currentStepIndex === index"
                      class="typing-cursor"
                    >|</span>
                  </div>
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- Insight/Analysis Section -->
    <div
      v-if="hasRun || isPlaying"
      class="insight-section"
    >
      <el-alert
        :type="currentMode === 'direct' ? 'warning' : 'success'"
        :closable="false"
        show-icon
      >
        <template #title>
          <span class="insight-title">{{ t('chainOfThought.analysisTitle') }}</span>
        </template>
        <template #default>
          <div v-if="currentMode === 'direct'">
            <strong>{{ t('chainOfThought.directModeTitle') }}</strong> {{ t('chainOfThought.directModeDesc') }}
          </div>
          <div v-else>
            <strong>{{ t('chainOfThought.cotModeTitle') }}</strong> {{ t('chainOfThought.cotModeDesc') }}
          </div>
        </template>
      </el-alert>
    </div>
  </el-card>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { EditPen, Cpu } from '@element-plus/icons-vue'
import { useI18n } from '../../../composables/useI18n.js'
import { promptEngineeringLocale } from '../../../locales/prompt-engineering/index.js'

const { t } = useI18n(promptEngineeringLocale)

const currentTask = ref('debug')
const currentMode = ref('plan-first')
const isPlaying = ref(false)
const hasRun = ref(false)
const currentStepIndex = ref(0)

// Data Scenarios
const scenarios = {
  debug: {
    prompt: `Review the following code:
function add(a, b) {
  return a - b;
}`,
    direct: [
      { title: () => t('chainOfThought.scenarios.debug.direct.title'), content: 'The function `add` incorrectly uses the subtraction operator `-` instead of `+`. It should be `return a + b;`.' }
    ],
    cot: [
      { title: () => t('chainOfThought.scenarios.debug.cot.step1Title'), content: 'User wants to add two numbers.' },
      { title: () => t('chainOfThought.scenarios.debug.cot.step2Title'), content: 'Line 2 uses `-` operator.' },
      { title: () => t('chainOfThought.scenarios.debug.cot.step3Title'), content: 'Function name is `add` but logic is subtraction.' },
      { title: () => t('chainOfThought.scenarios.debug.cot.step4Title'), content: 'The function has a bug: it subtracts instead of adds. Fix: change `-` to `+`.' }
    ]
  },
  travel: {
    prompt: 'Plan a 2-day trip to Paris for an art lover.',
    direct: [
      { title: () => t('chainOfThought.scenarios.travel.direct.title'), content: 'Day 1: Eiffel Tower, Louvre. Day 2: Montmartre, Orsay Museum. Enjoy!' }
    ],
    cot: [
      { title: () => t('chainOfThought.scenarios.travel.cot.step1Title'), content: 'Destination: Paris. Duration: 2 days. Interest: Art.' },
      { title: () => t('chainOfThought.scenarios.travel.cot.step2Title'), content: 'Must-sees: Louvre (Mona Lisa), Musee d\'Orsay (Impressionism), Pompidou (Modern).' },
      { title: () => t('chainOfThought.scenarios.travel.cot.step3Title'), content: 'Cluster locations to save travel time.' },
      { title: () => t('chainOfThought.scenarios.travel.cot.step4Title'), content: 'Day 1: Louvre (morning) -> Tuileries -> Orangerie. Day 2: Orsay (morning) -> Montmartre -> Sacré-Cœur.' }
    ]
  }
}

const modes = computed(() => [
  { id: 'direct', label: t('chainOfThought.modeDirect') },
  { id: 'plan-first', label: t('chainOfThought.modeCOT') }
])

const currentScenario = computed(() => scenarios[currentTask.value])
const targetSteps = computed(() => {
  return currentMode.value === 'direct'
    ? currentScenario.value.direct
    : currentScenario.value.cot
})

// Display state
const displaySteps = ref([])

const statusText = computed(() => {
  if (isPlaying.value) return 'Thinking...'
  if (hasRun.value) return 'Completed'
  return 'Idle'
})

const statusType = computed(() => {
  if (isPlaying.value) return 'primary'
  if (hasRun.value) return 'success'
  return 'info'
})

const getStepType = (index) => {
  if (index < currentStepIndex.value) return 'success'
  if (index === currentStepIndex.value) return 'primary'
  return ''
}

// Resolve step titles (they are functions for i18n)
const resolveSteps = (steps) => steps.map(s => ({
  ...s,
  title: typeof s.title === 'function' ? s.title() : s.title
}))

// Reset when controls change
watch([currentTask, currentMode], () => {
  reset()
})

function reset() {
  isPlaying.value = false
  hasRun.value = false
  currentStepIndex.value = 0
  displaySteps.value = []
}

async function runSimulation() {
  if (isPlaying.value) return
  reset()
  isPlaying.value = true

  const resolved = resolveSteps(targetSteps.value)
  // Initialize steps structure
  displaySteps.value = resolved.map(s => ({
    ...s,
    displayedContent: ''
  }))

  for (let i = 0; i < displaySteps.value.length; i++) {
    currentStepIndex.value = i
    const step = displaySteps.value[i]
    const fullContent = step.content

    // Simulate typing effect
    for (let j = 0; j <= fullContent.length; j++) {
      step.displayedContent = fullContent.slice(0, j)
      await new Promise(r => setTimeout(r, 20)) // typing speed
    }
    await new Promise(r => setTimeout(r, 500)) // pause between steps
  }

  isPlaying.value = false
  hasRun.value = true
  currentStepIndex.value = displaySteps.value.length // Mark all done
}
</script>

<style scoped>
.cot-demo-card {
  margin: 16px 0;
}

.controls-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.label {
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.demo-content {
  margin-bottom: 24px;
}

.prompt-panel, .output-panel {
  height: 100%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.panel-header .left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.prompt-text {
  background-color: var(--vp-c-bg-alt);
  padding: 12px;
  border-radius: 4px;
  font-family: monospace;
  white-space: pre-wrap;
  border: 1px solid var(--vp-c-divider);
  min-height: 120px;
  margin-bottom: 16px;
}

.action-area {
  display: flex;
  justify-content: center;
  margin-top: auto;
}

.run-btn {
  width: 100%;
}

.output-container {
  min-height: 300px;
  max-height: 400px;

  padding: 0 4px;
}

.step-title {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
}

.step-content {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.typing-cursor {
  display: inline-block;
  width: 2px;
  height: 1em;
  background-color: currentColor;
  margin-left: 2px;
  vertical-align: text-bottom;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

.insight-section {
  margin-top: 16px;
}

.insight-title {
  font-weight: 600;
}

@media (max-width: 768px) {
  .controls-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .control-group {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }

  .control-group .el-select,
  .control-group .el-radio-group {
    width: 100%;
  }

  .prompt-panel {
    margin-bottom: 16px;
    min-height: auto;
  }
}
</style>
