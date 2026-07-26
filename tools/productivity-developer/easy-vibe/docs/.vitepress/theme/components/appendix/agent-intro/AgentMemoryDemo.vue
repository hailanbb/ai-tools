<template>
  <div class="memory-demo">
    <div class="header">
      <div class="title">
        {{ t('memory.title') }}
      </div>
    </div>

    <div class="quick-actions">
      <button
        v-for="action in quickActions"
        :key="action"
        class="action-btn"
        :disabled="isTyping"
        @click="sendMessage(action)"
      >
        {{ action }}
      </button>
      <button
        class="action-btn reset"
        @click="resetConversation"
      >
        {{ t('memory.reset') }}
      </button>
    </div>

    <div class="main-area">
      <div class="chat-box">
        <div class="box-header">
          {{ t('memory.chat') }}
        </div>
        <div
          ref="chatContainer"
          class="messages"
        >
          <div
            v-for="(msg, i) in messages.slice(-4)"
            :key="i"
            class="msg-row"
            :class="msg.role"
          >
            <span class="avatar">{{ msg.role === 'user' ? '👤' : '🤖' }}</span>
            <span class="text">{{ msg.content }}</span>
          </div>
          <div
            v-if="isTyping"
            class="msg-row assistant typing"
          >
            <span class="avatar">🤖</span>
            <span class="dots"><span /><span /><span /></span>
          </div>
          <div
            v-if="messages.length === 0"
            class="empty-msg"
          >
            {{ t('memory.emptyChat') }}
          </div>
        </div>
      </div>

      <div class="memory-row">
        <div class="memory-card">
          <div class="card-header">
            <span>{{ t('memory.shortTerm') }}</span>
            <span class="count">{{ shortTermMemory.length }}</span>
          </div>
          <div class="card-body">
            <div
              v-for="(item, i) in shortTermMemory.slice(-3)"
              :key="i"
              class="mem-item"
            >
              <span class="role">{{ item.role === 'user' ? 'U' : 'A' }}</span>
              <span class="content">{{ truncate(item.content, 20) }}</span>
            </div>
            <div
              v-if="shortTermMemory.length === 0"
              class="empty"
            >
              {{ t('memory.empty') }}
            </div>
          </div>
        </div>

        <div class="memory-card">
          <div class="card-header">
            <span>{{ t('memory.working') }}</span>
            <span class="count">{{ Object.keys(workingMemory).length }}</span>
          </div>
          <div class="card-body">
            <div
              v-for="(v, k) in workingMemory"
              :key="k"
              class="mem-item kv"
            >
              <span class="key">{{ k }}</span>
              <span class="value">{{ v }}</span>
            </div>
            <div
              v-if="Object.keys(workingMemory).length === 0"
              class="empty"
            >
              {{ t('memory.empty') }}
            </div>
          </div>
        </div>

        <div class="memory-card">
          <div class="card-header">
            <span>{{ t('memory.longTerm') }}</span>
            <span class="count">{{ longTermMemory.length }}</span>
          </div>
          <div class="card-body">
            <div
              v-for="(item, i) in longTermMemory.slice(-2)"
              :key="i"
              class="mem-item"
            >
              <span class="tag">{{ item.category }}</span>
              <span class="content">{{ item.content }}</span>
            </div>
            <div
              v-if="longTermMemory.length === 0"
              class="empty"
            >
              {{ t('memory.empty') }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="lastOp"
      class="op-bar"
    >
      <span>{{ lastOp.icon }}</span>
      <span>{{ lastOp.text }}</span>
    </div>

    <div class="tip-bar">
      <span>💡</span>
      <span><strong>{{ t('memory.tipShort') }}</strong>{{ t('memory.tip') }}<strong>{{ t('memory.tipWorking') }}</strong>{{ t('memory.tip2') }}<strong>{{ t('memory.tipLong') }}</strong>{{ t('memory.tip3') }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, nextTick } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { agentIntroLocale } from '../../../locales/agent-intro/index.js'

const { t, messages: localeMessages } = useI18n(agentIntroLocale)

const messages = ref([])
const shortTermMemory = ref([])
const workingMemory = ref({})
const longTermMemory = ref([])
const isTyping = ref(false)
const lastOp = ref(null)

const quickActions = computed(() => localeMessages.value.memory.quickActions)
const responses = computed(() => localeMessages.value.memory.responses)

const sendMessage = async (text) => {
  messages.value.push({ role: 'user', content: text })
  shortTermMemory.value.push({ role: 'user', content: text })
  isTyping.value = true
  scrollToBottom()

  await wait(600)

  const config = responses.value[text] || { reply: t('memory.fallbackReply'), op: null }
  if (config.workingKey) {
    workingMemory.value[config.workingKey] = config.workingValue
  }
  if (config.longTerm) {
    longTermMemory.value.push(config.longTerm)
  }
  lastOp.value = config.op

  messages.value.push({ role: 'assistant', content: config.reply })
  shortTermMemory.value.push({ role: 'assistant', content: config.reply })
  isTyping.value = false
  scrollToBottom()
}

const resetConversation = () => {
  messages.value = []
  shortTermMemory.value = []
  workingMemory.value = {}
  longTermMemory.value = []
  lastOp.value = null
  isTyping.value = false
}

const scrollToBottom = async () => {
  await nextTick()
  const container = document.querySelector('.messages')
  if (container) container.scrollTop = container.scrollHeight
}

const truncate = (text, len) => text.length > len ? text.slice(0, len) + '...' : text
const wait = (ms) => new Promise(r => setTimeout(r, ms))
</script>

<style scoped>
.memory-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 16px;
}

.title {
  font-size: 17px;
  font-weight: 700;
  background: linear-gradient(120deg, var(--vp-c-brand), #9c27b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.quick-actions {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.action-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.action-btn.reset {
  background: #fee2e2;
  border-color: #fecaca;
  color: #991b1b;
}

.action-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.main-area {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 12px;
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .main-area { grid-template-columns: 1fr; }
}

.chat-box {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
}

.box-header {
  padding: 10px 12px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 12px;
  font-weight: 600;
}

.messages {
  padding: 12px;
  min-height: 120px;
  max-height: 160px;
  
}

.msg-row {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
  align-items: flex-start;
}

.msg-row.user { flex-direction: row-reverse; }

.avatar {
  font-size: 14px;
  flex-shrink: 0;
}

.text {
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}

.msg-row.user .text {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.dots {
  display: flex;
  gap: 4px;
  padding: 8px 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
}

.dots span {
  width: 6px;
  height: 6px;
  background: var(--vp-c-text-3);
  border-radius: 50%;
  animation: bounce 1.4s infinite;
}

.dots span:nth-child(1) { animation-delay: 0s; }
.dots span:nth-child(2) { animation-delay: 0.2s; }
.dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.empty-msg {
  text-align: center;
  color: var(--vp-c-text-3);
  padding: 40px 0;
  font-size: 12px;
}

.memory-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

@media (max-width: 600px) {
  .memory-row { grid-template-columns: 1fr; }
}

.memory-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 12px;
  font-weight: 600;
}

.count {
  padding: 2px 8px;
  background: var(--vp-c-bg);
  border-radius: 10px;
  font-size: 11px;
  color: var(--vp-c-text-2);
}

.card-body {
  padding: 10px;
  min-height: 80px;
}

.mem-item {
  display: flex;
  gap: 6px;
  padding: 6px 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  margin-bottom: 6px;
  font-size: 11px;
  align-items: center;
}

.mem-item .role {
  font-weight: 600;
  color: var(--vp-c-brand);
  min-width: 14px;
}

.mem-item .content {
  color: var(--vp-c-text-1);
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mem-item.kv .key {
  font-weight: 600;
  color: var(--vp-c-brand);
}

.mem-item.kv .value {
  color: var(--vp-c-text-1);
}

.mem-item .tag {
  padding: 1px 6px;
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
  font-size: 10px;
  color: var(--vp-c-brand-dark);
}

.empty {
  text-align: center;
  color: var(--vp-c-text-3);
  padding: 20px 0;
  font-size: 12px;
}

.op-bar {
  display: flex;
  gap: 8px;
  padding: 10px 14px;
  background: #dcfce7;
  border-radius: 6px;
  margin-bottom: 16px;
  font-size: 12px;
  color: #166534;
}

.tip-bar {
  display: flex;
  gap: 8px;
  padding: 10px 14px;
  background: var(--vp-c-brand-soft);
  border-radius: 6px;
  font-size: 12px;
  color: var(--vp-c-text-1);
}
</style>
