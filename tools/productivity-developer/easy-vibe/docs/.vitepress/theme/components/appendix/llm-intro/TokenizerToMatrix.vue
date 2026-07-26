<template>
  <div class="matrix-demo">
    <div class="control-bar">
      <input
        v-model="inputText"
        type="text"
        :placeholder="t('matrix.inputPlaceholder')"
        class="text-input"
        :disabled="currentStep > 0"
      >
      <div class="step-controls">
        <button
          class="step-btn prev"
          :disabled="currentStep === 0"
          @click="currentStep--"
        >
          {{ t('matrix.prev') }}
        </button>
        <div class="step-indicator">
          Step {{ currentStep + 1 }} / 4
        </div>
        <button
          class="step-btn next"
          :disabled="currentStep === 3"
          @click="currentStep++"
        >
          {{ t('matrix.next') }}
        </button>
      </div>
    </div>

    <div class="visualization-stage">
      <!-- Step 1: Tokenization -->
      <div
        v-if="currentStep === 0"
        class="stage-content"
      >
        <h3 class="stage-title">
          {{ currentStepData.title }}
        </h3>
        <p class="stage-desc">
          {{ currentStepData.desc }}
          <span
            style="
              font-size: 0.85em;
              color: var(--vp-c-text-2);
              display: block;
              margin-top: 4px;
            "
          >
            ({{ currentStepData.note }})
          </span>
        </p>
        <div class="token-container">
          <div
            v-for="(token, idx) in tokens"
            :key="idx"
            class="token-box"
            :style="{ borderColor: getTokenColor(idx) }"
          >
            <span class="token-val">{{ token.text }}</span>
          </div>
        </div>
      </div>

      <!-- Step 2: ID Mapping -->
      <div
        v-if="currentStep === 1"
        class="stage-content"
      >
        <h3 class="stage-title">
          {{ currentStepData.title }}
        </h3>
        <p class="stage-desc">
          {{ currentStepData.desc }}
        </p>
        <div class="mapping-container">
          <div
            v-for="(token, idx) in tokens"
            :key="idx"
            class="mapping-row"
          >
            <div
              class="token-box sm"
              :style="{ borderColor: getTokenColor(idx) }"
            >
              {{ token.text }}
            </div>
            <div class="arrow">
              →
            </div>
            <div class="vocab-lookup">
              <span class="vocab-label">Vocab Lookup</span>
            </div>
            <div class="arrow">
              →
            </div>
            <div class="id-box">
              {{ token.id }}
            </div>
          </div>
        </div>
      </div>

      <!-- Step 3: Embedding Lookup -->
      <div
        v-if="currentStep === 2"
        class="stage-content"
      >
        <h3 class="stage-title">
          {{ currentStepData.title }}
        </h3>
        <p class="stage-desc">
          {{ currentStepData.desc }}
        </p>
        <div class="lookup-container">
          <div
            v-for="(token, idx) in tokens"
            :key="idx"
            class="lookup-row"
          >
            <div class="id-box">
              {{ token.id }}
            </div>
            <div class="arrow">
              →
            </div>
            <div class="vector-row">
              <span class="bracket">[</span>
              <span
                v-for="(val, vIdx) in token.vector"
                :key="vIdx"
                class="vector-val"
              >
                {{ val.toFixed(2) }}
              </span>
              <span class="bracket">]</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 4: Input Matrix -->
      <div
        v-if="currentStep === 3"
        class="stage-content"
      >
        <h3 class="stage-title">
          {{ currentStepData.title }}
        </h3>
        <p class="stage-desc">
          {{ currentStepData.desc }}
        </p>
        <div class="matrix-container">
          <div class="matrix-bracket left" />
          <div class="matrix-grid">
            <div
              v-for="(token, rIdx) in tokens"
              :key="rIdx"
              class="matrix-row"
            >
              <div
                v-for="(val, cIdx) in token.vector"
                :key="cIdx"
                class="matrix-cell"
                :style="{ backgroundColor: getHeatmapColor(val) }"
                :title="val.toFixed(4)"
              >
                {{ val.toFixed(1) }}
              </div>
            </div>
          </div>
          <div class="matrix-bracket right" />
          <div class="matrix-label">
            Shape: ({{ tokens.length }}, 4)
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { llmIntroLocale } from '../../../locales/llm-intro/index.js'

const { t, messages } = useI18n(llmIntroLocale)

const inputText = ref(t('matrix.sampleText'))
const currentStep = ref(0)
const currentStepData = computed(() => messages.value.matrix.steps[currentStep.value])

const colors = ['#f87171', '#60a5fa', '#fbbf24', '#34d399', '#a78bfa']

const tokens = computed(() => {
  const text = inputText.value || ''
  const rawTokens = text.match(/[\u4e00-\u9fa5]|[a-zA-Z]+|\s+|./g) || []

  return rawTokens.map((t) => {
    // Deterministic pseudo-random ID and vector.
    let hash = 0
    for (let j = 0; j < t.length; j++)
      hash = t.charCodeAt(j) + ((hash << 5) - hash)
    const id = Math.abs(hash) % 10000

    const vector = []
    for (let k = 0; k < 4; k++) {
      const val = Math.sin(id * (k + 1))
      vector.push(val)
    }

    return { text: t, id, vector }
  })
})

const getTokenColor = (idx) => colors[idx % colors.length]

const getHeatmapColor = (val) => {
  // val is -1 to 1
  // Map to blue (negative) -> white (0) -> red (positive)
  // Reduce max opacity to avoid confusion with "selection" or "special token"
  const opacity = Math.abs(val) * 0.6 + 0.1
  if (val > 0) return `rgba(239, 68, 68, ${opacity})` // Red
  return `rgba(59, 130, 246, ${opacity})` // Blue
}
</script>

<style scoped>
.matrix-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  margin: 0.5rem 0;
  font-family: var(--vp-font-family-mono);
  overflow: hidden;
}

.control-bar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.75rem;
  background-color: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
}

.text-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.step-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.step-btn {
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.step-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.step-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.visualization-stage {
  padding: 2rem;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.stage-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.stage-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
  text-align: center;
  max-width: 80%;
}

/* Step 1 Styles */
.token-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.token-box {
  padding: 0.5rem 1rem;
  border: 2px solid;
  border-radius: 6px;
  background-color: var(--vp-c-bg);
  font-weight: bold;
  min-width: 40px;
  text-align: center;
}

.token-box.sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.9rem;
}

/* Step 2 Styles */
.mapping-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mapping-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.vocab-lookup {
  padding: 0.25rem 0.5rem;
  background-color: var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.id-box {
  font-family: monospace;
  color: var(--vp-c-brand);
  font-weight: bold;
}

/* Step 3 Styles */
.lookup-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.lookup-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.vector-row {
  display: flex;
  gap: 0.25rem;
  font-family: monospace;
}

.vector-val {
  width: 40px;
  text-align: right;
  font-size: 0.9rem;
}

/* Step 4 Styles */
.matrix-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center; /* Add centering */
  margin-top: 1rem;
}

.matrix-grid {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.matrix-row {
  display: flex;
  gap: 2px;
}

.matrix-cell {
  width: 40px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: #fff; /* text always white for contrast on colored bg */
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.matrix-bracket {
  width: 10px;
  border: 2px solid var(--vp-c-text-1);
  position: absolute;
  top: -5px;
  bottom: -5px;
}

.matrix-bracket.left {
  left: -15px;
  border-right: none;
}

.matrix-bracket.right {
  right: -15px;
  border-left: none;
}

.matrix-label {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

@media (min-width: 640px) {
  .control-bar {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .text-input {
    width: auto;
    flex: 1;
    max-width: 300px;
  }
}
</style>
