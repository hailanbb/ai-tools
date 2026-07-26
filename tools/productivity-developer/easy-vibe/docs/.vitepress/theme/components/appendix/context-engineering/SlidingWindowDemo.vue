<template>
  <div class="sliding-window-demo">
    <div class="control-panel">
      <div class="info-stat">
        <span class="label">{{ t('slidingWindow.maxLabel') }}</span>
        <span class="value">{{ t('slidingWindow.maxValue', { count: windowSize }) }}</span>
      </div>
      <div class="actions">
        <button
          class="action-btn"
          :disabled="isAutoPlaying"
          @click="autoPlay"
        >
          {{ t('slidingWindow.autoPlay') }}
        </button>
        <button
          class="action-btn outline"
          @click="reset"
        >
          {{ t('slidingWindow.reset') }}
        </button>
      </div>
    </div>

    <div class="visualization-area">
      <div class="conversation-stream">
        <div class="zone history-zone">
          <div class="zone-label">
            <span class="icon">🗑️</span> {{ t('slidingWindow.forgottenTitle') }}
          </div>
          <transition-group name="fade-list">
            <div
              v-for="msg in historyMessages"
              :key="msg.id"
              class="message-bubble history"
              :class="msg.role.toLowerCase()"
            >
              <div class="avatar">
                {{ msg.role === 'User' ? '👤' : '🤖' }}
              </div>
              <div class="content">
                <div class="role-name">
                  {{ msg.role }}
                </div>
                <div class="text">
                  {{ msg.content }}
                </div>
              </div>
            </div>
          </transition-group>
          <div
            v-if="historyMessages.length === 0"
            class="empty-placeholder"
          >
            {{ t('slidingWindow.noForgotten') }}
          </div>
        </div>

        <div class="window-divider">
          <span>{{ t('slidingWindow.outside') }}</span>
          <div class="divider-line" />
          <span>{{ t('slidingWindow.inside') }}</span>
        </div>

        <div class="zone active-zone">
          <div class="zone-label">
            <span class="icon">🖼️</span> {{ t('slidingWindow.activeTitle') }}
          </div>
          <transition-group name="slide-list">
            <div
              v-for="msg in activeMessages"
              :key="msg.id"
              class="message-bubble active"
              :class="msg.role.toLowerCase()"
            >
              <div class="avatar">
                {{ msg.role === 'User' ? '👤' : '🤖' }}
              </div>
              <div class="content">
                <div class="role-name">
                  {{ msg.role }}
                </div>
                <div class="text">
                  {{ msg.content }}
                </div>
              </div>
            </div>
          </transition-group>
          <div
            v-if="activeMessages.length === 0"
            class="empty-placeholder"
          >
            {{ t('slidingWindow.emptyActive') }}
          </div>
        </div>
      </div>
    </div>

    <div class="input-section">
      <input
        v-model="newMessage"
        :placeholder="t('slidingWindow.placeholder')"
        :disabled="isAutoPlaying"
        @keyup.enter="sendMessage"
      >
      <button
        class="send-btn"
        :disabled="!newMessage.trim() || isAutoPlaying"
        @click="sendMessage"
      >
        {{ t('slidingWindow.send') }}
      </button>
    </div>

    <div class="info-box">
      <p>
        <span class="icon">💡</span>
        <strong>{{ t('slidingWindow.infoStrong') }}</strong>
        {{ t('slidingWindow.info') }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { contextEngineeringLocale } from '../../../locales/context-engineering/index.js'

const { t, messages } = useI18n(contextEngineeringLocale)

const windowSize = 4
const chatMessages = ref([])
const newMessage = ref('')
const isAutoPlaying = ref(false)
let msgId = 0

const activeMessages = computed(() => {
  return chatMessages.value.slice(-windowSize)
})

const historyMessages = computed(() => {
  return chatMessages.value.slice(0, Math.max(0, chatMessages.value.length - windowSize))
})

const sendMessage = () => {
  if (!newMessage.value.trim()) return

  addMessage('User', newMessage.value)
  const userText = newMessage.value
  newMessage.value = ''

  setTimeout(() => {
    addMessage('AI', t('slidingWindow.aiReply', { text: userText }))
  }, 600)
}

const addMessage = (role, content) => {
  chatMessages.value.push({
    id: msgId++,
    role,
    content
  })
}

const autoPlay = async () => {
  isAutoPlaying.value = true
  const script = messages.value.slidingWindow.script

  for (const line of script) {
    if (!isAutoPlaying.value) break
    const role = chatMessages.value.length % 2 === 0 ? 'User' : 'AI'
    addMessage(role, line)
    await new Promise((r) => setTimeout(r, 1500))
  }
  isAutoPlaying.value = false
}

const reset = () => {
  chatMessages.value = []
  msgId = 0
  isAutoPlaying.value = false
}
</script>

<style scoped>
.sliding-window-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  font-family: var(--vp-font-family-mono);
}

.control-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.info-stat {
  display: flex;
  flex-direction: column;
}

.info-stat .label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.info-stat .value {
  font-weight: bold;
  font-size: 1.1rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  background-color: var(--vp-c-brand);
  color: white;
  font-size: 0.85rem;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn.outline {
  background-color: transparent;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.visualization-area {
  margin-bottom: 1rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.conversation-stream {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.zone {
  padding: 0.75rem;
  border-radius: 6px;
  transition: all 0.3s;
}

.history-zone {
  background-color: rgba(0, 0, 0, 0.03);
  border: 1px dashed var(--vp-c-divider);
  margin-bottom: 0.5rem;
  opacity: 0.6;
}

.active-zone {
  background-color: var(--vp-c-bg);
  border: 2px solid var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-top: 0.5rem;
  min-height: 100px;
}

.zone-label {
  font-size: 0.8rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.window-divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--vp-c-text-3);
  font-size: 0.75rem;
  margin: 0.5rem 0;
}

.divider-line {
  flex: 1;
  height: 1px;
  background-color: var(--vp-c-divider);
}

.message-bubble {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.5s ease;
}

.message-bubble.history {
  filter: grayscale(100%);
  opacity: 0.7;
}

.message-bubble.user .avatar {
  order: 1;
}

.message-bubble.user {
  flex-direction: row-reverse;
  text-align: right;
}

.message-bubble.user .content {
  align-items: flex-end;
}

.avatar {
  font-size: 1rem;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-soft);
  border-radius: 50%;
}

.content {
  display: flex;
  flex-direction: column;
  max-width: 85%;
}

.role-name {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.1rem;
}

.text {
  font-size: 0.85rem;
  line-height: 1.3;
}

.empty-placeholder {
  text-align: center;
  color: var(--vp-c-text-3);
  font-style: italic;
  padding: 0.5rem;
  font-size: 0.8rem;
}

.input-section {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.send-btn {
  padding: 0 1rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 0.9rem;
}

.send-btn:hover {
  background: var(--vp-c-brand-dark);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.info-box {
  background-color: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.5rem;
}

/* Animations */
.slide-list-enter-active,
.slide-list-leave-active,
.fade-list-enter-active,
.fade-list-leave-active {
  transition: all 0.5s ease;
}

.slide-list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-list-enter-from {
  opacity: 0;
}
.fade-list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
