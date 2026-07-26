<template>
  <div class="agent-chat-demo">
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
        :class="['tab-btn', { active: currentScenario === s.id }]"
        @click="selectScenario(s.id)"
      >
        <span>{{ s.icon }}</span>
        <span>{{ s.name }}</span>
      </button>
    </div>

    <div class="chat-window">
      <div class="message user">
        <div class="avatar">
          👤
        </div>
        <div class="bubble">
          {{ currentScenarioData.query }}
        </div>
      </div>

      <div class="message llm">
        <div class="avatar">
          🤖
        </div>
        <div class="bubble llm-bubble">
          <div class="llm-label">
            {{ t('quickStart.llmLabel') }}
          </div>
          <div class="llm-content">
            {{ currentScenarioData.llmResponse }}
          </div>
        </div>
      </div>

      <div class="message agent">
        <div class="avatar agent-avatar">
          🦾
        </div>
        <div class="bubble agent-bubble">
          <div class="agent-label">
            {{ t('quickStart.agentLabel') }}
          </div>
          
          <div
            v-if="showThinking"
            class="thinking-section"
          >
            <div
              class="thinking-header"
              @click="toggleThinking"
            >
              <span>{{ t('quickStart.thinkingTitle') }}</span>
              <span class="toggle-icon">{{ thinkingExpanded ? '▼' : '▶' }}</span>
            </div>
            <div
              v-if="thinkingExpanded"
              class="thinking-content"
            >
              <div class="thought-item">
                {{ currentScenarioData.thinking }}
              </div>
            </div>
          </div>

          <div
            v-if="showTools"
            ref="toolsSection"
            class="tools-section"
          >
            <div
              class="tools-header"
              @click="toggleTools"
            >
              <span>{{ t('quickStart.toolsTitle', { count: currentScenarioData.tools.length }) }}</span>
              <span class="toggle-icon">{{ toolsExpanded ? '▼' : '▶' }}</span>
            </div>
            <div
              v-if="toolsExpanded"
              class="tools-list"
            >
              <div 
                v-for="(tool, idx) in currentScenarioData.tools" 
                :key="idx"
                :ref="el => setToolRef(el, idx)"
                class="tool-item"
                :class="{ completed: toolExecuted > idx, executing: toolExecuting === idx }"
              >
                <div class="tool-status">
                  <span v-if="toolExecuted > idx">✅</span>
                  <span
                    v-else-if="toolExecuting === idx"
                    class="spinner"
                  >⏳</span>
                  <span v-else>⏸️</span>
                </div>
                <div class="tool-info">
                  <div class="tool-name">
                    {{ tool.name }}
                  </div>
                  <div
                    v-if="toolExecuted > idx || toolExecuting === idx"
                    class="tool-detail"
                  >
                    <code class="tool-params">{{ tool.params }}</code>
                    <div
                      v-if="toolExecuted > idx"
                      class="tool-result"
                    >
                      {{ tool.result }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="showResponse"
            class="final-response"
          >
            <div class="response-header">
              {{ t('quickStart.finalResponseTitle') }}
            </div>
            <div class="response-content">
              {{ currentScenarioData.agentResponse }}
            </div>
          </div>

          <button
            v-if="!isExecuting && !executionComplete"
            class="execute-btn"
            @click="startExecution"
          >
            {{ t('quickStart.execute') }}
          </button>
          <button
            v-else-if="executionComplete"
            class="execute-btn reset"
            @click="reset"
          >
            {{ t('quickStart.reset') }}
          </button>
        </div>
      </div>
    </div>

    <div class="insight-bar">
      <span class="insight-label">{{ t('quickStart.insightLabel') }}</span>
      <span class="insight-text">{{ currentScenarioData.insight }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { agentIntroLocale } from '../../../locales/agent-intro/index.js'

const { t, messages } = useI18n(agentIntroLocale)
const scenarios = computed(() => messages.value.quickStart.scenarios)

const currentScenario = ref('weather')
const isExecuting = ref(false)
const executionComplete = ref(false)
const toolExecuting = ref(-1)
const toolExecuted = ref(0)
const showThinking = ref(false)
const showTools = ref(false)
const showResponse = ref(false)
const thinkingExpanded = ref(true)
const toolsExpanded = ref(true)
const toolsSection = ref(null)
const toolRefs = ref([])

const currentScenarioData = computed(() => scenarios.value.find(s => s.id === currentScenario.value))

const setToolRef = (el, idx) => {
  if (el) {
    toolRefs.value[idx] = el
  }
}

const selectScenario = (id) => {
  currentScenario.value = id
  reset()
}

const startExecution = async () => {
  isExecuting.value = true
  executionComplete.value = false
  toolExecuting.value = -1
  toolExecuted.value = 0
  showThinking.value = true
  showTools.value = false
  showResponse.value = false
  thinkingExpanded.value = true
  toolsExpanded.value = true

  await wait(800)
  
  showTools.value = true
  toolsExpanded.value = true
  
  await nextTick()
  
  const tools = currentScenarioData.value.tools
  
  for (let i = 0; i < tools.length; i++) {
    toolExecuting.value = i
    
    await nextTick()
    const toolEl = toolRefs.value[i]
    if (toolEl && toolsSection.value) {
      toolEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    
    await wait(1000)
    toolExecuted.value = i + 1
    toolExecuting.value = -1
    await wait(300)
  }

  await wait(500)
  showResponse.value = true
  isExecuting.value = false
  executionComplete.value = true
}

const reset = () => {
  isExecuting.value = false
  executionComplete.value = false
  toolExecuting.value = -1
  toolExecuted.value = 0
  showThinking.value = false
  showTools.value = false
  showResponse.value = false
}

const toggleThinking = () => {
  thinkingExpanded.value = !thinkingExpanded.value
}

const toggleTools = () => {
  toolsExpanded.value = !toolsExpanded.value
}

const wait = (ms) => new Promise(r => setTimeout(r, ms))
</script>

<style scoped>
.agent-chat-demo {
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

.subtitle {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

.scenario-tabs {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
}

.tab-btn:hover {
  background: var(--vp-c-bg-alt);
}

.tab-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
}

.chat-window {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.message.user {
  flex-direction: row-reverse;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  flex-shrink: 0;
}

.avatar.agent-avatar {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.bubble {
  max-width: 75%;
  padding: 12px 14px;
  border-radius: 14px;
  font-size: 13px;
  line-height: 1.5;
}

.message.user .bubble {
  background: var(--vp-c-brand);
  color: white;
  border-bottom-right-radius: 4px;
}

.message.llm .bubble {
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-bottom-left-radius: 4px;
}

.message.agent .bubble {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-bottom-left-radius: 4px;
  max-width: 85%;
}

.llm-label, .agent-label {
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--vp-c-text-2);
}

.agent-label {
  color: var(--vp-c-brand);
}

.llm-content {
  color: #6b7280;
}

.thinking-section {
  margin-bottom: 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.thinking-header, .tools-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: background 0.2s;
}

.thinking-header:hover, .tools-header:hover {
  background: var(--vp-c-bg-alt);
}

.toggle-icon {
  font-size: 10px;
  color: var(--vp-c-text-2);
}

.thinking-content {
  padding: 10px 12px;
  background: #fef3c7;
  font-size: 12px;
  color: #92400e;
}

.thought-item {
  line-height: 1.6;
}

.tools-section {
  margin-bottom: 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.tools-list {
  padding: 10px;
  background: var(--vp-c-bg);
}

.tool-item {
  display: flex;
  gap: 10px;
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  margin-bottom: 8px;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s;
}

.tool-item:last-child {
  margin-bottom: 0;
}

.tool-item.completed {
  border-color: #86efac;
  background: #f0fdf4;
}

.tool-item.executing {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.tool-status {
  font-size: 14px;
  flex-shrink: 0;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.tool-info {
  flex: 1;
  min-width: 0;
}

.tool-name {
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 6px;
}

.tool-params {
  display: block;
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 6px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-family: monospace;
  overflow-x: auto;
  white-space: nowrap;
  margin-bottom: 6px;
}

.tool-result {
  font-size: 11px;
  color: #16a34a;
  padding: 6px 8px;
  background: #dcfce7;
  border-radius: 4px;
  white-space: pre-wrap;
}

.final-response {
  margin-top: 10px;
  padding: 12px;
  background: #dcfce7;
  border: 1px solid #86efac;
  border-radius: 6px;
}

.response-header {
  font-size: 11px;
  font-weight: 600;
  color: #166534;
  margin-bottom: 6px;
}

.response-content {
  font-size: 13px;
  color: #166534;
  line-height: 1.6;
  white-space: pre-wrap;
}

.execute-btn {
  margin-top: 12px;
  width: 100%;
  padding: 10px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s;
}

.execute-btn:hover {
  background: var(--vp-c-brand-dark);
}

.execute-btn.reset {
  background: #6b7280;
}

.execute-btn.reset:hover {
  background: #4b5563;
}

.insight-bar {
  margin-top: 16px;
  padding: 12px 16px;
  background: var(--vp-c-brand-soft);
  border-radius: 6px;
  font-size: 13px;
}

.insight-label {
  font-weight: 600;
  color: var(--vp-c-brand-dark);
}

.insight-text {
  color: var(--vp-c-text-1);
}
</style>
