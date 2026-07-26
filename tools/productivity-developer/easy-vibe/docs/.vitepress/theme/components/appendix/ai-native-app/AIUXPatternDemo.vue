<template>
  <div class="ux-demo">
    <div class="header">
      <div class="title">{{ t('ux.title') }}</div>
      <div class="subtitle">{{ t('ux.subtitle') }}</div>
    </div>

    <div class="pattern-grid">
      <div
        v-for="p in patterns"
        :key="p.id"
        :class="['pattern-card', { active: activePattern === p.id }]"
        @click="activatePattern(p.id)"
      >
        <div class="card-icon">{{ p.icon }}</div>
        <div class="card-name">{{ p.name }}</div>
        <div class="card-desc">{{ p.brief }}</div>
      </div>
    </div>

    <div v-if="activePattern" class="preview-area">
      <div class="preview-header">
        <span>{{ currentPattern.icon }} {{ currentPattern.name }} {{ t('ux.demoSuffix') }}</span>
        <button class="replay-btn" @click="replayDemo">🔄 {{ t('common.replay') }}</button>
      </div>

      <div v-if="activePattern === 'streaming'" class="demo-box">
        <div class="chat-bubble ai">
          <span class="stream-text">{{ streamText }}</span>
          <span v-if="isStreaming" class="cursor-blink">|</span>
        </div>
        <div class="demo-note">{{ t('ux.notes.streaming') }}</div>
      </div>

      <div v-if="activePattern === 'loading'" class="demo-box">
        <div class="loading-stages">
          <div
            v-for="(s, idx) in loadingStages"
            :key="idx"
            :class="['stage', { done: loadingStep > idx, current: loadingStep === idx }]"
          >
            <span class="stage-icon">
              {{ loadingStep > idx ? '✅' : loadingStep === idx ? '⏳' : '⬜' }}
            </span>
            <span>{{ s }}</span>
          </div>
        </div>
        <div class="demo-note">{{ t('ux.notes.loading') }}</div>
      </div>

      <div v-if="activePattern === 'confidence'" class="demo-box">
        <div class="confidence-list">
          <div v-for="c in confidenceItems" :key="c.text" class="conf-item">
            <div class="conf-bar-wrap">
              <div
                class="conf-bar"
                :style="{ width: c.score + '%', background: c.color }"
              />
            </div>
            <div class="conf-score">{{ c.score }}%</div>
            <div class="conf-label">{{ c.level }}</div>
            <div class="conf-text">{{ c.text }}</div>
          </div>
        </div>
        <div class="demo-note">{{ t('ux.notes.confidence') }}</div>
      </div>

      <div v-if="activePattern === 'fallback'" class="demo-box">
        <div class="fallback-flow">
          <div :class="['fb-step', { active: fallbackStep >= 0 }]">
            <span class="fb-icon">🤖</span>
            <span>{{ fallbackFlow[0] }}</span>
          </div>
          <div v-if="fallbackStep >= 1" class="fb-arrow">↓ {{ fallbackFlow[1] }}</div>
          <div :class="['fb-step warn', { active: fallbackStep >= 1 }]">
            <span class="fb-icon">⚠️</span>
            <span>{{ fallbackFlow[2] }}</span>
          </div>
          <div v-if="fallbackStep >= 2" class="fb-arrow">↓ {{ fallbackFlow[3] }}</div>
          <div :class="['fb-step safe', { active: fallbackStep >= 2 }]">
            <span class="fb-icon">🔄</span>
            <span>{{ fallbackFlow[4] }}</span>
          </div>
        </div>
        <div class="demo-note">{{ t('ux.notes.fallback') }}</div>
      </div>

      <div class="pattern-detail">
        <div class="detail-label">{{ t('ux.detailLabel') }}</div>
        <div class="detail-text">{{ currentPattern.detail }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { aiNativeAppLocale } from '../../../locales/ai-native-app/index.js'

const { t, locale, messages } = useI18n(aiNativeAppLocale)
const patterns = computed(() => messages.value.ux.patterns)
const loadingStages = computed(() => messages.value.ux.loadingStages)
const confidenceItems = computed(() => messages.value.ux.confidenceItems)
const fallbackFlow = computed(() => messages.value.ux.fallbackFlow)
const fullText = computed(() => messages.value.ux.fullText)

const activePattern = ref('')
const currentPattern = computed(() =>
  patterns.value.find(p => p.id === activePattern.value) || {}
)

const streamText = ref('')
const isStreaming = ref(false)

const loadingStep = ref(-1)
const fallbackStep = ref(-1)

let timer = null

const clearTimers = () => {
  if (timer) { clearInterval(timer); timer = null }
}

const activatePattern = (id) => {
  clearTimers()
  activePattern.value = id
  replayDemo()
}

const replayDemo = () => {
  clearTimers()
  if (activePattern.value === 'streaming') {
    streamText.value = ''
    isStreaming.value = true
    const text = fullText.value
    let i = 0
    timer = setInterval(() => {
      if (i < text.length) {
        streamText.value += text[i]
        i++
      } else {
        isStreaming.value = false
        clearTimers()
      }
    }, 50)
  } else if (activePattern.value === 'loading') {
    loadingStep.value = 0
    let step = 0
    timer = setInterval(() => {
      step++
      loadingStep.value = step
      if (step >= loadingStages.value.length) clearTimers()
    }, 900)
  } else if (activePattern.value === 'fallback') {
    fallbackStep.value = 0
    let step = 0
    timer = setInterval(() => {
      step++
      fallbackStep.value = step
      if (step >= 2) clearTimers()
    }, 1000)
  }
}

watch(locale, () => {
  streamText.value = ''
  isStreaming.value = false
  loadingStep.value = -1
  fallbackStep.value = -1
  if (activePattern.value) replayDemo()
})

onBeforeUnmount(clearTimers)
</script>

<style scoped>
.ux-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px; padding: 20px; margin: 20px 0;
}
.header { text-align: center; margin-bottom: 16px; }
.title {
  font-size: 17px; font-weight: 700;
  background: linear-gradient(120deg, #06b6d4, #8b5cf6);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.subtitle { font-size: 12px; color: var(--vp-c-text-2); margin-top: 4px; }

.pattern-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px; margin-bottom: 16px;
}
.pattern-card {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 10px; padding: 14px; cursor: pointer;
  transition: all 0.2s; text-align: center;
}
.pattern-card:hover { background: var(--vp-c-bg-alt); }
.pattern-card.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}
.card-icon { font-size: 24px; margin-bottom: 6px; }
.card-name { font-weight: 600; font-size: 13px; }
.card-desc { font-size: 11px; color: var(--vp-c-text-2); margin-top: 4px; }

.preview-area {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 12px; padding: 16px;
}
.preview-header {
  display: flex; justify-content: space-between; align-items: center;
  font-weight: 700; font-size: 14px; margin-bottom: 12px;
}
.replay-btn {
  padding: 4px 12px; border: 1px solid var(--vp-c-divider);
  border-radius: 6px; background: var(--vp-c-bg-soft);
  cursor: pointer; font-size: 12px;
}

.demo-box {
  background: var(--vp-c-bg-soft); border-radius: 8px;
  padding: 16px; margin-bottom: 12px;
}
.demo-note {
  font-size: 11px; color: var(--vp-c-text-3);
  text-align: center; margin-top: 10px;
}

/* Streaming */
.chat-bubble.ai {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 10px; padding: 12px; font-size: 13px; line-height: 1.7;
}
.cursor-blink { animation: blink 0.8s infinite; color: var(--vp-c-brand); }
@keyframes blink { 50% { opacity: 0; } }

/* Loading */
.loading-stages { display: flex; flex-direction: column; gap: 8px; }
.stage {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 12px; border-radius: 6px; font-size: 13px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  opacity: 0.4; transition: all 0.3s;
}
.stage.current { opacity: 1; border-color: var(--vp-c-brand); background: var(--vp-c-brand-soft); }
.stage.done { opacity: 1; border-color: #86efac; background: #f0fdf4; }

/* Confidence */
.confidence-list { display: flex; flex-direction: column; gap: 10px; }
.conf-item {
  display: grid; grid-template-columns: 1fr 40px 60px 1fr;
  align-items: center; gap: 8px; font-size: 12px;
}
.conf-bar-wrap {
  height: 8px; background: var(--vp-c-bg);
  border-radius: 4px; overflow: hidden;
}
.conf-bar { height: 100%; border-radius: 4px; transition: width 0.6s; }
.conf-score { font-weight: 600; text-align: right; }
.conf-label { font-size: 11px; color: var(--vp-c-text-2); }
.conf-text { color: var(--vp-c-text-1); }

/* Fallback */
.fallback-flow { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.fb-step {
  display: flex; align-items: center; gap: 8px; width: 100%;
  padding: 10px 14px; border-radius: 8px; font-size: 13px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  opacity: 0.3; transition: all 0.4s;
}
.fb-step.active { opacity: 1; }
.fb-step.warn.active { border-color: #fbbf24; background: #fef3c7; }
.fb-step.safe.active { border-color: #86efac; background: #f0fdf4; }
.fb-arrow { font-size: 12px; color: var(--vp-c-text-3); }

.pattern-detail { margin-top: 12px; }
.detail-label { font-weight: 600; font-size: 12px; margin-bottom: 4px; }
.detail-text { font-size: 13px; color: var(--vp-c-text-2); line-height: 1.7; }
</style>
