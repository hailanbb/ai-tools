<!--
 * Component: MemoryPalaceActionDemo.vue
 * Description: Interactive simulation of the "Memory Palace" in action.
 * Features:
 *  - Scenario selection (Coding vs Support)
 *  - Chat interface simulation
 *  - Real-time visualization of the 4 context layers
 *  - Step-by-step walkthrough of the context construction process
-->

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { contextEngineeringLocale } from '../../../locales/context-engineering/index.js'

const { t, messages } = useI18n(contextEngineeringLocale)
const scenarios = computed(() => messages.value.memoryPalaceAction.scenarios)

const currentScenarioKey = ref('coding')
const currentStepIndex = ref(0)

const currentScenario = computed(() => scenarios.value[currentScenarioKey.value])
const currentStep = computed(() => currentScenario.value.steps[currentStepIndex.value])
const isLastStep = computed(() => currentStepIndex.value === currentScenario.value.steps.length - 1)

const setScenario = (key) => {
  currentScenarioKey.value = key
  currentStepIndex.value = 0
}

const nextStep = () => {
  if (!isLastStep.value) {
    currentStepIndex.value++
  } else {
    currentStepIndex.value = 0
  }
}

const prevStep = () => {
  if (currentStepIndex.value > 0) {
    currentStepIndex.value--
  }
}
</script>

<template>
  <div class="action-demo">
    <div class="scenario-tabs">
      <button 
        v-for="(s, key) in scenarios" 
        :key="key"
        class="tab-btn"
        :class="{ active: currentScenarioKey === key }"
        @click="setScenario(key)"
      >
        {{ s.name }}
      </button>
    </div>

    <div class="demo-grid">
      <div class="chat-panel">
        <div class="panel-header">
          {{ t('memoryPalaceAction.chatHeader') }}
        </div>
        <div class="chat-window">
          <div
            v-for="(msg, idx) in currentStep.layers.chat"
            :key="idx"
            class="chat-bubble"
            :class="msg.startsWith('User') ? 'user' : 'ai'"
          >
            {{ msg.split(': ')[1] || msg }}
          </div>
          <div
            v-if="currentStep.user && !currentStep.layers.chat.some(m => m.includes(currentStep.user))"
            class="chat-bubble user pending"
          >
            {{ currentStep.user }}...
          </div>
          <div
            v-if="currentStep.ai_thinking"
            class="chat-bubble thinking"
          >
            💭 {{ currentStep.ai_thinking }}
          </div>
        </div>
        <div class="controls">
          <div class="step-info">
            {{ t('memoryPalaceAction.stepInfo', { current: currentStepIndex + 1, total: currentScenario.steps.length }) }}
          </div>
          <div class="btn-group">
            <button
              class="nav-btn"
              :disabled="currentStepIndex === 0"
              @click="prevStep"
            >
              {{ t('memoryPalaceAction.previous') }}
            </button>
            <button
              class="nav-btn primary"
              @click="nextStep"
            >
              {{ isLastStep ? t('memoryPalaceAction.restart') : t('memoryPalaceAction.next') }}
            </button>
          </div>
        </div>
      </div>

      <div class="palace-panel">
        <div class="panel-header">
          {{ t('memoryPalaceAction.aiHeader') }}
        </div>
        <div class="context-visualizer">
          <div class="layer-box base">
            <div class="layer-label">
              <span class="icon">🏛️</span> 
              <span class="title">{{ t('memoryPalaceAction.layerBase') }}</span>
              <span class="badge">KV Cached</span>
            </div>
            <div class="layer-content">
              {{ currentStep.layers.base }}
            </div>
          </div>

          <div class="layer-box task">
            <div class="layer-label">
              <span class="icon">📌</span> 
              <span class="title">{{ t('memoryPalaceAction.layerTask') }}</span>
              <span class="badge">Pinned</span>
            </div>
            <div class="layer-content">
              {{ currentStep.layers.task }}
            </div>
          </div>

          <div class="layer-box chat">
            <div class="layer-label">
              <span class="icon">💬</span> 
              <span class="title">{{ t('memoryPalaceAction.layerChat') }}</span>
              <span class="badge">Sliding</span>
            </div>
            <div class="layer-content">
              <div
                v-for="(m, i) in currentStep.layers.chat"
                :key="i"
                class="mini-line"
              >
                {{ m }}
              </div>
              <div
                v-if="currentStep.layers.chat.length === 0"
                class="empty-hint"
              >
                {{ t('memoryPalaceAction.noChat') }}
              </div>
            </div>
          </div>

          <div
            class="layer-box rag"
            :class="{ active: currentStep.layers.rag.length > 0 }"
          >
            <div class="layer-label">
              <span class="icon">📚</span> 
              <span class="title">{{ t('memoryPalaceAction.layerRag') }}</span>
              <span class="badge ephemeral">Temp</span>
            </div>
            <div class="layer-content">
              <div
                v-for="(r, i) in currentStep.layers.rag"
                :key="i"
                class="rag-item"
              >
                {{ r }}
              </div>
              <div
                v-if="currentStep.layers.rag.length === 0"
                class="empty-hint"
              >
                {{ t('memoryPalaceAction.noRag') }}
              </div>
            </div>
          </div>
        </div>
        
        <div class="step-desc">
          <strong>{{ t('memoryPalaceAction.whatHappened') }}</strong>
          {{ currentStep.desc }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.action-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  margin: 1.5rem 0;
  overflow: hidden;
  font-size: 14px;
}

.scenario-tabs {
  display: flex;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.tab-btn {
  flex: 1;
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 2px solid transparent;
}

.tab-btn:hover {
  background: var(--vp-c-bg-alt);
}

.tab-btn.active {
  color: var(--vp-c-brand);
  border-bottom-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.demo-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  min-height: 400px;
}

@media (max-width: 768px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
}

/* Chat Panel */
.chat-panel {
  border-right: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  background: var(--vp-c-bg);
}

.panel-header {
  padding: 10px;
  font-weight: bold;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  text-align: center;
  font-size: 0.9em;
}

.chat-window {
  flex: 1;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  background: #f9f9f9;
}
.dark .chat-window {
  background: #1e1e20;
}

.chat-bubble {
  max-width: 85%;
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 0.9em;
  line-height: 1.4;
}

.chat-bubble.user {
  align-self: flex-end;
  background: var(--vp-c-brand);
  color: white;
  border-bottom-right-radius: 2px;
}

.chat-bubble.ai {
  align-self: flex-start;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-bottom-left-radius: 2px;
}

.chat-bubble.thinking {
  align-self: center;
  background: transparent;
  color: var(--vp-c-text-2);
  font-style: italic;
  font-size: 0.85em;
  border: 1px dashed var(--vp-c-divider);
}

.chat-bubble.pending {
  opacity: 0.6;
}

.controls {
  padding: 15px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.step-info {
  text-align: center;
  font-size: 0.8em;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}

.btn-group {
  display: flex;
  gap: 10px;
}

.nav-btn {
  flex: 1;
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  font-size: 0.9em;
  cursor: pointer;
}
.nav-btn:hover:not(:disabled) {
  background: var(--vp-c-bg-soft);
}
.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.nav-btn.primary {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}
.nav-btn.primary:hover {
  background: var(--vp-c-brand-dark);
}

/* Palace Panel */
.palace-panel {
  display: flex;
  flex-direction: column;
  background: var(--vp-c-bg-soft);
}

.context-visualizer {
  flex: 1;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  
}

.layer-box {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  padding: 8px;
  transition: all 0.3s;
}

.layer-label {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
  font-size: 0.85em;
}

.title {
  font-weight: bold;
}

.badge {
  margin-left: auto;
  font-size: 0.7em;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.badge.ephemeral {
  background: #e74c3c;
  color: white;
}

.layer-content {
  font-family: var(--vp-font-mono);
  font-size: 0.8em;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-alt);
  padding: 6px;
  border-radius: 4px;
  white-space: pre-wrap;
  max-height: 80px;
  
}

.mini-line {
  margin-bottom: 2px;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 2px;
}

.rag-item {
  color: #27ae60;
  margin-bottom: 2px;
}

.empty-hint {
  color: var(--vp-c-text-3);
  font-style: italic;
  font-size: 0.8em;
}

/* Layer specific styling */
.base .layer-label { color: var(--vp-c-brand); }
.base .badge { background: var(--vp-c-brand); color: white; }

.task .layer-label { color: #8e44ad; }
.task .badge { background: #8e44ad; color: white; }

.chat .layer-label { color: #e67e22; }

.rag { border-style: dashed; opacity: 0.6; }
.rag.active { opacity: 1; border-color: #27ae60; background: rgba(39, 174, 96, 0.05); }
.rag .layer-label { color: #27ae60; }

.step-desc {
  padding: 12px;
  background: #fff9c4;
  color: #555;
  font-size: 0.9em;
  border-top: 1px solid #e0e0e0;
  line-height: 1.4;
}
.dark .step-desc {
  background: #333322;
  color: #ddd;
  border-top-color: #444;
}
</style>
