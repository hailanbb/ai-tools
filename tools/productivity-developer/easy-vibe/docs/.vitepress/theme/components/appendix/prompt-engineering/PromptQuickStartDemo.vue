<template>
  <div class="quick-start-demo-container">
    <el-card
      class="quick-start-card"
      shadow="hover"
    >
      <template #header>
        <div class="header-content">
          <div class="title-group">
            <div class="title">
              {{ t('quickStart.title') }}
            </div>
            <div class="subtitle">
              {{ t('quickStart.subtitle') }}
            </div>
          </div>
          <div class="controls">
            <span class="label">{{ t('quickStart.selectTask') }}</span>
            <el-select
              v-model="taskId"
              style="width: 160px"
              size="large"
              @change="reset"
            >
              <el-option
                v-for="tk in tasks"
                :key="tk.id"
                :label="tk.label"
                :value="tk.id"
              />
            </el-select>
          </div>
        </div>
      </template>

      <!-- Game Area -->
      <div class="game-area">
        <!-- Left: Prompt Builder -->
        <div class="prompt-builder">
          <div class="section-title">
            {{ t('quickStart.promptLabel') }}
          </div>

          <div class="prompt-box">
            <!-- Base Layer -->
            <div
              class="block base"
              :class="{ active: true }"
            >
              <span class="icon">📝</span>
              <span class="text">{{ basePrompt }}</span>
            </div>

            <!-- Clear Layer -->
            <div
              v-if="level >= 1"
              class="block clear animate-in"
            >
              <span class="icon">🎯</span>
              <span class="text">{{ clearPromptAddon }}</span>
            </div>

            <!-- Pro Layer -->
            <div
              v-if="level >= 2"
              class="block pro animate-in"
            >
              <span class="icon">🧠</span>
              <span class="text">{{ proPromptAddon }}</span>
            </div>
          </div>

          <!-- Upgrade Controls -->
          <div class="upgrade-controls">
            <div class="level-info">
              <el-tag
                :type="levelColor"
                effect="dark"
                size="small"
                style="margin-bottom: 4px;"
              >
                Level {{ level }}
              </el-tag>
              <span
                class="level-desc"
                :style="{ color: levelColorCode }"
              >{{ levelLabel }}</span>
            </div>

            <div class="actions">
              <el-button-group>
                <el-button
                  :disabled="level === 0"
                  icon="Minus"
                  @click="downgrade"
                >
                  {{ t('quickStart.downgrade') }}
                </el-button>
                <el-button
                  type="primary"
                  :disabled="level === 2"
                  icon="Plus"
                  @click="upgrade"
                >
                  {{ t('quickStart.upgrade') }}
                </el-button>
              </el-button-group>
            </div>
          </div>

          <el-button
            type="primary"
            size="large"
            :loading="isRunning"
            style="width: 100%; font-weight: bold; font-size: 1.1rem;"
            @click="run"
          >
            {{ isRunning ? t('common.running') : t('common.sendToAI') }}
          </el-button>
        </div>

        <!-- Right: AI Simulated Output -->
        <div class="chat-preview">
          <div class="section-title">
            <span>{{ t('quickStart.outputLabel') }}</span>
            <!-- History Switch -->
            <div
              v-if="hasAnyHistory"
              class="history-tabs"
            >
              <el-radio-group
                v-model="viewLevel"
                size="small"
              >
                <el-radio-button
                  v-for="l in availableLevels"
                  :key="l"
                  :label="l"
                >
                  L{{ l }}
                </el-radio-button>
              </el-radio-group>
            </div>
          </div>

          <div class="chat-window">
            <!-- Empty State -->
            <div
              v-if="!hasRun && !hasAnyHistory"
              class="empty-state"
            >
              <el-empty
                :description="t('quickStart.emptyHint')"
                :image-size="100"
              />
            </div>

            <!-- Content Area -->
            <div v-else>
              <!-- Compare Mode Hint -->
              <el-alert
                v-if="viewLevel !== level"
                type="info"
                show-icon
                :closable="false"
                style="margin-bottom: 12px;"
              >
                <template #title>
                  {{ t('quickStart.viewingHistory', { viewLevel, currentLevel: level }) }}
                  <el-button
                    link
                    type="primary"
                    style="padding: 0; vertical-align: baseline;"
                    @click="viewLevel = level"
                  >
                    {{ t('quickStart.backToCurrent') }}
                  </el-button>
                </template>
              </el-alert>

              <div
                class="message-bubble"
                :class="{ typing: isRunning && viewLevel === level }"
              >
                <div class="avatar">
                  🤖
                </div>
                <div class="content">
                  <div
                    v-if="isRunning && viewLevel === level"
                    class="typing-indicator"
                  >
                    <span /><span /><span />
                  </div>
                  <div
                    v-else
                    class="markdown-body"
                    v-html="renderMarkdown(getOutputForLevel(viewLevel))"
                  />
                </div>
              </div>

              <!-- Feedback Bubble -->
              <div
                v-if="(!isRunning || viewLevel !== level) && getOutputForLevel(viewLevel)"
                class="feedback-bubble animate-pop"
              >
                <div class="feedback-title">
                  💡 {{ getFeedbackForLevel(viewLevel).title }}
                </div>
                <div class="feedback-text">
                  {{ getFeedbackForLevel(viewLevel).text }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { promptEngineeringLocale } from '../../../locales/prompt-engineering/index.js'

const { t } = useI18n(promptEngineeringLocale)

const tasks = computed(() => [
  { id: 'copy', label: t('quickStart.taskCopy') },
  { id: 'summary', label: t('quickStart.taskSummary') },
  { id: 'code', label: t('quickStart.taskCode') }
])

const taskId = ref('copy')
const level = ref(0) // 0: vague, 1: clear, 2: pro
const isRunning = ref(false)
const hasRun = ref(false)
const displayedOutput = ref('')

// Store history outputs: { 0: "...", 1: "..." }
const outputs = ref({})
const viewLevel = ref(0) // Currently viewed Level

const hasAnyHistory = computed(() => Object.keys(outputs.value).length > 0)
const availableLevels = computed(() => Object.keys(outputs.value).map(Number).sort())

const reset = () => {
  level.value = 0
  hasRun.value = false
  displayedOutput.value = ''
  outputs.value = {}
  viewLevel.value = 0
}

const upgrade = () => {
  if (level.value < 2) level.value++
  hasRun.value = false
  viewLevel.value = level.value
}

const downgrade = () => {
  if (level.value > 0) level.value--
  hasRun.value = false
  viewLevel.value = level.value
}

const levelLabel = computed(() => {
  const labels = t('quickStart.levelLabels')
  return labels[level.value] || ''
})
const levelColor = computed(() => ['info', 'warning', 'success'][level.value])
const levelColorCode = computed(() => ['#909399', '#e6a23c', '#67c23a'][level.value])

// Prompt content config
const basePrompt = computed(() => t(`quickStart.promptConfig.${taskId.value}.base`))
const clearPromptAddon = computed(() => t(`quickStart.promptConfig.${taskId.value}.clear`))
const proPromptAddon = computed(() => t(`quickStart.promptConfig.${taskId.value}.pro`))

const getOutputForLevel = (l) => {
  if (l === level.value && isRunning.value) return displayedOutput.value
  return outputs.value[l] || ''
}

const getFeedbackForLevel = (l) => {
  const config = t(`quickStart.feedbackConfig.${taskId.value}`)
  return config[l] || { title: '', text: '' }
}

const renderMarkdown = (text) => {
  if (!text) return ''

  // 1. HTML Escape (Basic)
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")

  // 2. Bold: **text** -> <strong>text</strong>
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

  return html
}

const run = () => {
  if (isRunning.value) return
  hasRun.value = true
  viewLevel.value = level.value

  const config = t(`quickStart.outputConfig.${taskId.value}`)
  const fullText = config[level.value]
  displayedOutput.value = fullText
  outputs.value[level.value] = fullText
  isRunning.value = false
}
</script>

<style scoped>
.quick-start-demo-container {
  margin: 24px 0;
}

.quick-start-card {
  border-radius: 12px;
  overflow: visible;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
}

.title {
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: 4px;
  background: linear-gradient(120deg, var(--vp-c-brand) 30%, var(--vp-c-brand-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.game-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 768px) {
  .game-area {
    grid-template-columns: 1fr;
  }
}

/* Left builder area */
.prompt-builder {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
  letter-spacing: 0.5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.prompt-box {
  background: var(--vp-c-bg-alt);
  border: 2px dashed var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.3s;
}

.block {
  display: flex;
  gap: 10px;
  padding: 10px;
  border-radius: 6px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  align-items: flex-start;
}

.block.base {
  border-left: 3px solid var(--vp-c-text-2);
}

.block.clear {
  background: rgba(var(--vp-c-brand-rgb), 0.05);
  border: 1px solid rgba(var(--vp-c-brand-rgb), 0.2);
  border-left: 3px solid var(--vp-c-brand);
}

.block.pro {
  background: rgba(100, 108, 255, 0.05);
  border: 1px solid rgba(100, 108, 255, 0.2);
  border-left: 3px solid #646cff;
}

.block .icon {
  font-size: 1.2rem;
}

.block .text {
  font-size: 0.9rem;
  line-height: 1.5;
  white-space: pre-wrap;
}

.animate-in {
  animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.upgrade-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--vp-c-bg-alt);
  padding: 12px 16px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.level-info {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.level-desc {
  font-size: 0.9rem;
  font-weight: 700;
}

/* Right preview area */
.chat-preview {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chat-window {
  background: var(--vp-c-bg-alt);
  border-radius: 12px;
  padding: 20px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid var(--vp-c-divider);
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 200px;
}

.message-bubble {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.avatar {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  flex-shrink: 0;
}

.content {
  background: var(--vp-c-bg);
  padding: 12px 16px;
  border-radius: 0 12px 12px 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  max-width: 100%;
  position: relative;
}

.markdown-body {
  white-space: pre-wrap;
  line-height: 1.6;
}

.message-bubble.typing .content {
  min-width: 60px;
}

.typing-indicator span {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: var(--vp-c-text-2);
  border-radius: 50%;
  margin: 0 2px;
  animation: bounce 1.4s infinite ease-in-out both;
}

.typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
.typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.feedback-bubble {
  background: rgba(var(--vp-c-yellow-rgb), 0.1);
  border: 1px solid rgba(var(--vp-c-yellow-rgb), 0.3);
  padding: 12px;
  border-radius: 6px;
  margin-top: auto;
}

.feedback-title {
  font-weight: 700;
  color: var(--vp-c-yellow-1);
  margin-bottom: 4px;
  font-size: 0.9rem;
}

.feedback-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.animate-pop {
  animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.9) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
</style>
