<!--
 * Component: ContextCompressionDemo.vue
 * Description: Demonstrates various context compression techniques with a clear vertical flow.
-->

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { contextEngineeringLocale } from '../../../locales/context-engineering/index.js'

const { t, messages } = useI18n(contextEngineeringLocale)

const originalText = ref(t('contextCompression.originalText'))
const strategies = computed(() => messages.value.contextCompression.strategies)

const currentMode = ref('')
const compressedText = ref('')
const isCompressing = ref(false)

const originalTokens = computed(() => Math.ceil(originalText.value.length * 0.7))
const compressedTokens = computed(() => Math.ceil(compressedText.value.length * 0.7))

const compressionRatio = computed(() => {
  if (!originalText.value.length || !compressedText.value.length) return 0
  return Math.round((1 - compressedText.value.length / originalText.value.length) * 100)
})

const compress = async (mode) => {
  if (isCompressing.value) return
  currentMode.value = mode
  isCompressing.value = true
  compressedText.value = ''

  await new Promise(r => setTimeout(r, 800))

  if (mode === 'summary') {
    compressedText.value = messages.value.contextCompression.results.summary
  } else if (mode === 'extract') {
    compressedText.value = messages.value.contextCompression.results.extract
  } else if (mode === 'json') {
    compressedText.value = JSON.stringify({
      topic: "Context Engineering",
      problem: "Limited Context Window",
      solutions: ["Summarization", "RAG", "Structured Data"]
    }, null, 2)
  }
  
  isCompressing.value = false
}
</script>

<template>
  <div class="context-compression-demo">
    <div class="section control-panel">
      <div class="section-label">
        {{ t('contextCompression.chooseStrategy') }}
      </div>
      <div class="strategy-group">
        <button
          v-for="s in strategies"
          :key="s.id"
          class="strategy-btn"
          :class="{ active: currentMode === s.id }"
          @click="compress(s.id)"
        >
          <div class="btn-label">
            {{ s.label }}
          </div>
          <div class="btn-desc">
            {{ s.desc }}
          </div>
        </button>
      </div>
    </div>

    <div class="section input-area">
      <div class="section-header">
        <span class="label">{{ t('contextCompression.originalLabel') }}</span>
        <span class="token-count">{{ originalTokens }} tokens</span>
      </div>
      <textarea 
        v-model="originalText" 
        class="text-content original-input"
        :placeholder="t('contextCompression.placeholder')"
      />
    </div>

    <div class="flow-connector">
      <div class="line" />
      <div
        class="process-icon"
        :class="{ spinning: isCompressing }"
      >
        {{ isCompressing ? '⚙️' : '⬇️' }}
      </div>
      <div
        v-if="compressedText && !isCompressing"
        class="badge-container"
      >
        <span class="ratio-badge">-{{ compressionRatio }}%</span>
      </div>
    </div>

    <div
      class="section output-area"
      :class="{ 'has-result': compressedText }"
    >
      <div class="section-header">
        <span class="label">{{ t('contextCompression.compressedLabel') }}</span>
        <span
          v-if="compressedText"
          class="token-count"
        >{{ compressedTokens }} tokens</span>
      </div>
      
      <div class="text-content result-box">
        <div
          v-if="isCompressing"
          class="loading-state"
        >
          <span class="spinner" /> {{ t('contextCompression.compressing') }}
        </div>
        <pre v-else-if="compressedText">{{ compressedText }}</pre>
        <div
          v-else
          class="placeholder"
        >
          {{ t('contextCompression.startHint') }}
        </div>
      </div>

      <div
        v-if="compressedText && !isCompressing"
        class="mini-metrics"
      >
        <div class="metric-item">
          <span class="metric-label">{{ t('contextCompression.savedSpace') }}</span>
          <span class="metric-val highlight">{{ compressionRatio }}%</span>
        </div>
        <div class="metric-bar">
          <div
            class="bar-fill"
            :style="{ width: (100 - compressionRatio) + '%' }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.context-compression-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  max-width: 600px;
  margin: 1.5rem auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.section {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  transition: all 0.3s ease;
}

.section-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.8rem;
  text-transform: uppercase;
}

/* Control Panel */
.strategy-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.strategy-btn {
  padding: 0.6rem 0.4rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-alt);
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.strategy-btn:hover {
  border-color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-soft);
}

.strategy-btn.active {
  border-color: var(--vp-c-brand);
  background-color: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand-dark);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.btn-label {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.2rem;
  color: var(--vp-c-text-1);
}

.btn-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

/* Text Areas */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
  font-size: 0.85rem;
}

.label {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.token-count {
  font-family: var(--vp-font-mono);
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  background: var(--vp-c-bg-mute);
  padding: 2px 6px;
  border-radius: 4px;
}

.text-content {
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-alt);
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-mono);
}

.original-input {
  min-height: 100px;
  padding: 0.75rem;
  resize: vertical;
}

.original-input:focus {
  border-color: var(--vp-c-brand);
  outline: none;
}

.result-box {
  min-height: 100px;
  padding: 0.75rem;
  overflow-x: auto;
  background-color: #f6f8fa; /* Light code bg style */
}
.dark .result-box {
  background-color: #161b22;
}

.placeholder {
  color: var(--vp-c-text-3);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 80px;
  font-size: 0.85rem;
}

/* Connector */
.flow-connector {
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.line {
  position: absolute;
  height: 100%;
  width: 2px;
  background: var(--vp-c-divider);
}

.process-icon {
  z-index: 1;
  background: var(--vp-c-bg-soft);
  padding: 4px;
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
}

.spinning {
  animation: spin 1s linear infinite;
}

.badge-container {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}

.ratio-badge {
  background: var(--vp-c-green-dimm);
  color: var(--vp-c-green-dark);
  font-size: 0.75rem;
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 10px;
}

/* Metrics */
.mini-metrics {
  margin-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 0.8rem;
}

.metric-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.4rem;
  font-size: 0.8rem;
}

.highlight {
  color: var(--vp-c-green);
  font-weight: bold;
}

.metric-bar {
  height: 6px;
  background: var(--vp-c-bg-mute);
  border-radius: 3px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: var(--vp-c-brand);
  transition: width 0.5s ease;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
