<template>
  <div class="vlm-quick-start">
    <div class="header">
      <div class="title">
        {{ t('quickStart.title') }}
      </div>
      <div class="subtitle">
        {{ t('quickStart.subtitle') }}
      </div>
    </div>

    <div class="scenario-tabs">
      <button
        v-for="s in scenarios"
        :key="s.id"
        class="tab-btn"
        :class="{ active: currentScenario === s.id }"
        @click="switchScenario(s.id)"
      >
        {{ s.name }}
      </button>
    </div>

    <div class="demo-container">
      <!-- Image Area -->
      <div class="image-area">
        <div
          class="image-placeholder"
          :class="{ loaded: hasImage, 'receipt-bg': currentScenario === 'ocr' }"
        >
          <div
            v-if="!hasImage"
            class="upload-prompt"
          >
            <div class="icon">
              🖼️
            </div>
            <button
              class="upload-btn"
              @click="loadImage"
            >
              {{ t('quickStart.upload') }}
            </button>
          </div>

          <div
            v-else
            class="image-content"
          >
            <!-- Chat: Landscape -->
            <div
              v-if="currentScenario === 'chat'"
              class="real-image-container landscape"
            >
              <div class="real-image">
                🏔️
              </div>
              <div class="sun">
                ☀️
              </div>
              <div class="tree">
                🌲
              </div>
            </div>

            <!-- Detection: Fruits -->
            <div
              v-else-if="currentScenario === 'detection'"
              class="real-image-container fruits"
            >
              <div class="real-image">
                <span class="fruit apple">🍎</span>
                <span class="fruit banana">🍌</span>
                <span class="fruit grape">🍇</span>
              </div>
              <div
                v-if="showBoundingBox"
                class="bounding-box apple-box"
                title="Apple"
              >
                <span class="box-label">apple: 0.98</span>
              </div>
              <div
                v-if="showBoundingBox"
                class="bounding-box banana-box"
                title="Banana"
              >
                <span class="box-label">banana: 0.95</span>
              </div>
            </div>

            <!-- Analysis: Factory Safety -->
            <div
              v-else-if="currentScenario === 'analysis'"
              class="factory-image"
            >
              <div class="safety-sign">
                {{ t('quickStart.safetySign') }}
              </div>
              <div class="worker-container">
                <span class="worker">👷</span>
                <span
                  v-if="true"
                  class="helmet"
                >⛑️</span>
              </div>
              <div class="machinery">
                ⚙️
              </div>
            </div>

            <!-- OCR: Receipt -->
            <div
              v-else
              class="receipt-image"
            >
              <div class="receipt-header">
                🧾 RECEIPT
              </div>
              <div class="receipt-body">
                <div class="line">
                  <span>Coffee</span><span>$4.50</span>
                </div>
                <div class="line">
                  <span>Bagel</span><span>$3.00</span>
                </div>
                <div class="line total">
                  <span>TOTAL</span><span>$7.50</span>
                </div>
                <div class="line date">
                  <span>2023-10-24</span>
                </div>
              </div>
            </div>

            <div class="image-label">
              {{ getImageLabel() }}
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Area -->
      <div class="chat-area">
        <div
          ref="messagesRef"
          class="messages"
        >
          <div
            v-if="messages.length === 0"
            class="empty-text"
          >
            {{ hasImage ? t('quickStart.ready') : t('quickStart.needUpload') }}
          </div>
          <div
            v-for="(msg, index) in messages"
            :key="index"
            class="message"
            :class="msg.role"
          >
            <div class="content">
              <div
                v-if="msg.isJson"
                class="json-content"
              >
                <pre>{{ msg.content }}</pre>
              </div>
              <span v-else>{{ msg.content }}</span>
              <span
                v-if="
                  msg.role === 'assistant' &&
                    isGenerating &&
                    index === messages.length - 1
                "
                class="cursor"
              >|</span>
            </div>
          </div>
        </div>

        <div class="input-area">
          <div
            v-if="hasImage && !isGenerating"
            class="quick-actions"
          >
            <button
              v-for="q in currentQuestions"
              :key="q.id"
              class="action-btn"
              @click="ask(q)"
            >
              {{ q.text }}
            </button>
          </div>
          <div
            v-else-if="isGenerating"
            class="status-text"
          >
            {{ t('quickStart.thinking') }}
          </div>
          <div
            v-else
            class="status-text"
          >
            {{ t('quickStart.waitingUpload') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { vlmIntroLocale } from '../../../locales/vlm-intro/index.js'

const { t, messages: localeMessages } = useI18n(vlmIntroLocale)
const scenarios = computed(() => localeMessages.value.quickStart.scenarios)

const currentScenario = ref('chat')
const hasImage = ref(false)
const isGenerating = ref(false)
const showBoundingBox = ref(false)
const messages = ref([])
const messagesRef = ref(null)

const questionsMap = computed(() => localeMessages.value.quickStart.questions)
const answersMap = computed(() => localeMessages.value.quickStart.answers)

const getImageLabel = () => {
  return localeMessages.value.quickStart.imageLabels[currentScenario.value]
}

const currentQuestions = computed(
  () => questionsMap.value[currentScenario.value] || []
)

const switchScenario = (id) => {
  currentScenario.value = id
  hasImage.value = false
  messages.value = []
  showBoundingBox.value = false
}

const loadImage = () => {
  hasImage.value = true
  messages.value = [] // Clear history
  showBoundingBox.value = false
}

const ask = async (question) => {
  messages.value.push({ role: 'user', content: question.text })
  isGenerating.value = true

  await wait(800) // Simulate vision encoding time

  const scenarioAnswers = answersMap.value[currentScenario.value]
  const rawAnswer =
    scenarioAnswers[question.id] || t('quickStart.fallbackAnswer')

  let content = ''
  let isJson = false
  let action = null

  if (typeof rawAnswer === 'object') {
    content = rawAnswer.text
    isJson = rawAnswer.type === 'json'
    action = rawAnswer.action
  } else {
    content = rawAnswer
  }

  messages.value.push({ role: 'assistant', content: '', isJson })
  const answerIdx = messages.value.length - 1

  // Streaming effect
  const stepSize = isJson ? 5 : 1 // JSON types faster
  for (let i = 0; i < content.length; i += stepSize) {
    messages.value[answerIdx].content += content.slice(i, i + stepSize)
    scrollToBottom()
    await wait(20)
  }

  if (action === 'showBox') {
    showBoundingBox.value = true
  }

  isGenerating.value = false
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight
    }
  })
}
</script>

<style scoped>
.vlm-quick-start {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.subtitle {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.scenario-tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 6px 16px;
  border-radius: 20px;
  border: 1px solid transparent;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
  font-weight: bold;
}

.tab-btn:hover:not(.active) {
  background: var(--vp-c-bg-mute);
}

.demo-container {
  display: flex;
  gap: 20px;
  height: 340px;
}

/* Image Area */
.image-area {
  flex: 1;
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.image-placeholder.loaded {
  background: #fff4e6;
  border: none;
}

.image-placeholder.receipt-bg {
  background: #f0f0f0;
}

.upload-prompt .icon {
  font-size: 48px;
  margin-bottom: 10px;
  text-align: center;
}

.upload-btn {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: opacity 0.2s;
}

.upload-btn:hover {
  opacity: 0.9;
}

.image-content {
  text-align: center;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.real-image-container {
  position: relative;
  display: inline-block;
}

/* Landscape Style */
.real-image-container.landscape {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #87ceeb 50%, #e0e0e0 50%);
  border-radius: 6px;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
}

.landscape .real-image {
  font-size: 80px;
  z-index: 2;
  margin-top: 20px;
}

.landscape .sun {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 40px;
  animation: spin 10s linear infinite;
}

.landscape .tree {
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-size: 40px;
  z-index: 3;
}

/* Fruits Style */
.real-image-container.fruits {
  padding: 20px;
}

.real-image-container.fruits .real-image {
  display: flex;
  gap: 20px;
}

.real-image-container.fruits .fruit {
  font-size: 60px;
  display: inline-block;
  animation: popIn 0.5s ease;
}

.bounding-box.apple-box {
  left: 15px;
  top: 15px;
  width: 70px;
  height: 75px;
  right: auto;
  bottom: auto;
}

.bounding-box.banana-box {
  left: 95px;
  top: 15px;
  width: 70px;
  height: 75px;
  right: auto;
  bottom: auto;
}

/* Factory Style */
.factory-image {
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  padding: 20px;
  width: 260px;
  height: 180px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: slideUp 0.5s ease;
}

.safety-sign {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 12px;
  background: #ffeb3b;
  color: #000;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid #fbc02d;
  font-weight: bold;
}

.worker-container {
  font-size: 80px;
  position: relative;
  z-index: 2;
}

.worker-container .helmet {
  position: absolute;
  top: -15px;
  left: 15px;
  font-size: 40px;
  z-index: 3;
}

.machinery {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 50px;
  opacity: 0.8;
  animation: spin 5s linear infinite;
}

.real-image {
  font-size: 80px;
  margin-bottom: 10px;
  animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.bounding-box {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: 0px;
  border: 2px solid #ef4444;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 4px;
  animation: fadeIn 0.3s ease;
}

.box-label {
  position: absolute;
  top: -20px;
  left: -2px;
  background: #ef4444;
  color: white;
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 2px;
}

/* Receipt Style */
.receipt-image {
  background: white;
  padding: 15px;
  width: 160px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Courier New', Courier, monospace;
  font-size: 11px;
  text-align: left;
  margin-bottom: 10px;
  animation: slideUp 0.5s ease;
}

.receipt-header {
  text-align: center;
  font-weight: bold;
  border-bottom: 1px dashed #ccc;
  padding-bottom: 8px;
  margin-bottom: 8px;
}

.receipt-body .line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.receipt-body .total {
  border-top: 1px dashed #ccc;
  padding-top: 4px;
  margin-top: 4px;
  font-weight: bold;
}

.receipt-body .date {
  margin-top: 8px;
  justify-content: center;
  color: #888;
  font-size: 10px;
}

.image-label {
  font-size: 12px;
  color: #666;
  background: rgba(255, 255, 255, 0.8);
  padding: 4px 8px;
  border-radius: 4px;
  position: absolute;
  bottom: 10px;
}

/* Chat Area */
.chat-area {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.messages {
  flex: 1;
  padding: 15px;
  
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty-text {
  text-align: center;
  color: var(--vp-c-text-3);
  margin-top: 40px;
  font-size: 13px;
}

.message {
  max-width: 90%;
  padding: 10px;
  border-radius: 10px;
  font-size: 13px;
  line-height: 1.5;
}

.message.user {
  align-self: flex-end;
  background: var(--vp-c-brand);
  color: white;
  border-bottom-right-radius: 2px;
}

.message.assistant {
  align-self: flex-start;
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
  border-bottom-left-radius: 2px;
}

.json-content pre {
  margin: 0;
  white-space: pre-wrap;
  font-family: monospace;
  font-size: 11px;
}

.input-area {
  padding: 15px;
  border-top: 1px solid var(--vp-c-divider);
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.action-btn {
  padding: 6px 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
}

.action-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-mute);
}

.status-text {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 14px;
  background: currentColor;
  animation: blink 1s infinite;
  vertical-align: middle;
}

@keyframes popIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 600px) {
  .demo-container {
    flex-direction: column;
    height: auto;
  }
  .image-area {
    height: 200px;
  }
  .chat-area {
    height: 300px;
  }
  .scenario-tabs {
    overflow-x: auto;
    justify-content: flex-start;
    padding-bottom: 5px;
  }
  .tab-btn {
    white-space: nowrap;
  }
}
</style>
