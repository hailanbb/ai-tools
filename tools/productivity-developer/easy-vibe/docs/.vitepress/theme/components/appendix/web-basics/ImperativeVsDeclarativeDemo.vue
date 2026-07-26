<template>
  <div class="imperative-declarative-demo">
    <div class="demo-header">
      <span class="icon">🔄</span>
      <span class="title">{{ t('frameworks.imperativeDeclarative.title') }}</span>
      <span class="subtitle">{{ t('frameworks.imperativeDeclarative.subtitle') }}</span>
    </div>

    <div class="demo-content">
      <div class="demo-grid">
        <!-- Imperative (jQuery Style) -->
        <div class="panel imperative">
          <div class="panel-header">
            <span class="badge yellow">{{ t('frameworks.imperativeDeclarative.imperative') }}</span>
            <span class="sub-text">{{ t('frameworks.imperativeDeclarative.imperativeSub') }}</span>
          </div>
          <div class="code-preview">
            <code>
              {{ t('frameworks.imperativeDeclarative.manualDom') }}<br>
              $('#count').text(val);<br>
              if (val > 5) $('#msg').show();
            </code>
          </div>
          <div class="interactive-area">
            <div class="output-box">
              {{ t('frameworks.imperativeDeclarative.count') }} <span id="imp-count-display">{{ impCount }}</span>
              <div
                v-show="impShowMsg"
                class="warning-msg"
              >
                {{ t('frameworks.imperativeDeclarative.high') }}
              </div>
            </div>
            <div class="actions">
              <button
                class="btn"
                @click="impIncrement"
              >
                {{ t('frameworks.imperativeDeclarative.step1') }}
              </button>
              <button
                class="btn"
                :disabled="!impChanged"
                @click="impUpdateText"
              >
                {{ t('frameworks.imperativeDeclarative.step2') }}
              </button>
              <button
                class="btn"
                :disabled="!impTextUpdated"
                @click="impCheckState"
              >
                {{ t('frameworks.imperativeDeclarative.step3') }}
              </button>
            </div>
            <div class="status-log">
              {{ impStatus }}
            </div>
          </div>
        </div>

        <!-- Declarative (Vue Style) -->
        <div class="panel declarative">
          <div class="panel-header">
            <span class="badge green">{{ t('frameworks.imperativeDeclarative.declarative') }}</span>
            <span class="sub-text">{{ t('frameworks.imperativeDeclarative.declarativeSub') }}</span>
          </div>
          <div class="code-preview">
            <code>
              {{ t('frameworks.imperativeDeclarative.bindData') }}<br>
              <span v-text="'{{ count }}'" /><br>
              &lt;div v-if="count > 5"&gt;...&lt;/div&gt;
            </code>
          </div>
          <div class="interactive-area">
            <div class="output-box">
              {{ t('frameworks.imperativeDeclarative.count') }} <span>{{ decCount }}</span>
              <div
                v-if="decCount > 5"
                class="warning-msg"
              >
                {{ t('frameworks.imperativeDeclarative.high') }}
              </div>
            </div>
            <div class="actions">
              <button
                class="btn primary"
                @click="decIncrement"
              >
                {{ t('frameworks.imperativeDeclarative.autoRender') }}
              </button>
            </div>
            <div class="status-log">
              {{ t('frameworks.imperativeDeclarative.autoStatus') }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('frameworks.imperativeDeclarative.ideaTitle') }}</strong>{{ t('frameworks.imperativeDeclarative.idea') }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { webBasicsLocale } from '../../../locales/web-basics/index.js'

const { t } = useI18n(webBasicsLocale)

// Imperative State
const impCount = ref(0)
const impShowMsg = ref(false)
const impChanged = ref(false)
const impTextUpdated = ref(false)
const impStatus = ref(t('frameworks.imperativeDeclarative.ready'))

const impIncrement = () => {
  // Logic layer changes, but DOM doesn't
  impStatus.value =
    t('frameworks.imperativeDeclarative.variableChanged', { count: impCount.value + 1 })
  impCount.value++
  impChanged.value = true
  impTextUpdated.value = false
}

const impUpdateText = () => {
  // Manually update text
  impStatus.value = t('frameworks.imperativeDeclarative.domUpdated')
  impChanged.value = false
  impTextUpdated.value = true
}

const impCheckState = () => {
  // Manually check logic
  if (impCount.value > 5) {
    impShowMsg.value = true
    impStatus.value = t('frameworks.imperativeDeclarative.logicHigh')
  } else {
    impShowMsg.value = false
    impStatus.value = t('frameworks.imperativeDeclarative.logicLow')
  }
}

// Declarative State
const decCount = ref(0)
const decIncrement = () => {
  decCount.value++
}
</script>

<style scoped>
.imperative-declarative-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  
  
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.demo-content {
  margin-bottom: 0.5rem;
}

.demo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 640px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
}

.panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.panel-header {
  padding: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--vp-c-bg-alt);
}

.badge {
  font-size: 0.75rem;
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 4px;
  color: white;
}

.badge.yellow {
  background: var(--vp-c-warning);
}

.badge.green {
  background: var(--vp-c-success);
}

.sub-text {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.code-preview {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  font-family: monospace;
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
  height: 70px;
  overflow: hidden;
}

.interactive-area {
  padding: 0.75rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.output-box {
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  border-radius: 6px;
  text-align: center;
  font-weight: bold;
  min-height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.warning-msg {
  color: var(--vp-c-danger);
  margin-top: 0.5rem;
  font-size: 0.85rem;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.75rem;
  transition: all 0.2s;
}

.btn:hover:not(:disabled) {
  background: var(--vp-c-bg-soft);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn.primary {
  background: var(--vp-c-brand);
  color: white;
  border: none;
}

.btn.primary:hover {
  opacity: 0.9;
}

.status-log {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  font-style: italic;
  min-height: 1.2em;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box .icon {
  flex-shrink: 0;
}

.info-box strong {
  color: var(--vp-c-text-1);
}
</style>
