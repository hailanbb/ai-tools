<template>
  <div class="llm-quick-start">
    <div class="header">
      <div class="title">
        {{ t('quickStart.title') }}
      </div>
      <div class="subtitle">
        {{ t('quickStart.subtitle') }}
      </div>
    </div>

    <div class="chat-window">
      <div
        v-if="chatMessages.length === 0"
        class="empty-state"
      >
        <div class="emoji">
          💼
        </div>
        <p>{{ t('quickStart.empty') }}</p>
      </div>

      <div
        ref="messagesRef"
        class="messages"
      >
        <div
          v-for="(msg, index) in chatMessages"
          :key="index"
          class="message"
          :class="msg.role"
        >
          <div class="avatar">
            {{ msg.role === 'user' ? '🧑‍💻' : '🤖' }}
          </div>
          <div class="content">
            <div
              v-if="msg.role === 'user'"
              class="user-text"
            >
              {{ msg.content }}
            </div>
            <div
              v-else
              class="assistant-content"
            >
              <pre v-if="msg.isCode"><code>{{ msg.content }}<span
                v-if="
                  isGenerating &&
                    index === chatMessages.length - 1
                "
                class="cursor"
              >|</span></code></pre>
              <div v-else>
                {{ msg.content
                }}<span
                  v-if="isGenerating && index === chatMessages.length - 1"
                  class="cursor"
                >|</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="input-area">
      <div
        v-if="!isGenerating"
        class="quick-actions"
      >
        <button
          v-for="q in questions"
          :key="q.text"
          class="action-btn"
          @click="ask(q)"
        >
          <span class="btn-icon">{{ q.icon }}</span>
          <span class="btn-text">{{ q.text }}</span>
        </button>
      </div>
      <div
        v-else
        class="status-text"
      >
        {{ t('quickStart.generating') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { llmIntroLocale } from '../../../locales/llm-intro/index.js'

const { t, messages } = useI18n(llmIntroLocale)
const questions = computed(() => messages.value.quickStart.questions)

const chatMessages = ref([])
const isGenerating = ref(false)
const messagesRef = ref(null)

const ask = async (qObj) => {
  chatMessages.value.push({ role: 'user', content: qObj.text })
  isGenerating.value = true

  await wait(600)

  const answerData = qObj
  const fullAnswer = answerData.answer || t('quickStart.fallback')

  chatMessages.value.push({
    role: 'assistant',
    content: '',
    isCode: !!answerData.isCode
  })

  const answerIdx = chatMessages.value.length - 1

  // Typing animation
  for (let i = 0; i < fullAnswer.length; i++) {
    chatMessages.value[answerIdx].content += fullAnswer[i]
    scrollToBottom()
    // Code typing is usually faster looking
    const speed = answerData.isCode ? 10 : 30 + Math.random() * 30
    await wait(speed)
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
.llm-quick-start {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  margin: 24px 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.header {
  text-align: center;
  margin-bottom: 24px;
}

.title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
  background: linear-gradient(120deg, var(--vp-c-brand), #9c27b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.chat-window {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  height: 320px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
}

.empty-state {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: var(--vp-c-text-3);
}

.empty-state .emoji {
  font-size: 48px;
  margin-bottom: 12px;
  opacity: 0.5;
}

.messages {
  flex: 1;
  
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  scroll-behavior: smooth;
}

.message {
  display: flex;
  gap: 12px;
  max-width: 90%;
  animation: fadeIn 0.3s ease;
}

.message.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message.assistant {
  align-self: flex-start;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--vp-c-bg-mute);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
  border: 1px solid var(--vp-c-divider);
}

.content {
  background: var(--vp-c-bg-mute);
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.6;
  position: relative;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.message.user .content {
  background: var(--vp-c-brand);
  color: white;
  border-bottom-right-radius: 2px;
}

.message.assistant .content {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-bottom-left-radius: 2px;
  min-width: 200px;
}

.assistant-content pre {
  margin: 8px 0 0;
  padding: 8px;
  background: #1e1e1e;
  border-radius: 6px;
  overflow-x: auto;
}

.assistant-content code {
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 12px;
  color: #d4d4d4;
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 14px;
  background: currentColor;
  margin-left: 2px;
  vertical-align: middle;
  animation: blink 1s infinite;
}

.input-area {
  margin-top: 16px;
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.quick-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.action-btn {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 13px;
  color: var(--vp-c-text-1);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.action-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.status-text {
  font-size: 13px;
  color: var(--vp-c-text-3);
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-text::before {
  content: '';
  width: 8px;
  height: 8px;
  background: var(--vp-c-brand);
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes pulse {
  0% {
    opacity: 0.4;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 0.4;
    transform: scale(0.8);
  }
}
</style>
