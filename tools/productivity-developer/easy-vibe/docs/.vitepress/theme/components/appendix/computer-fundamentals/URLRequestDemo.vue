<template>
  <div class="url-demo">
    <div class="demo-header">
      <div class="demo-title">{{ t('powerOnToWeb.url.title') }}</div>
      <button class="play-btn" :disabled="playing" @click="autoPlay">
        {{ playing ? t('powerOnToWeb.url.playing') : t('powerOnToWeb.url.autoPlay') }}
      </button>
    </div>

    <div class="flow">
      <div class="flow-side client-side">
        <div class="side-label">{{ t('powerOnToWeb.url.browser') }}</div>
      </div>

      <div class="flow-steps">
        <div
          v-for="(step, i) in steps"
          :key="step.name"
          class="step"
          :class="{ active: current >= i, highlight: current === i }"
          @click="current = i"
        >
          <div class="step-line">
            <span class="step-dot"></span>
            <span v-if="i < steps.length - 1" class="step-connector"></span>
          </div>
          <div class="step-body">
            <div class="step-head">
              <span class="step-num">{{ i + 1 }}</span>
              <span class="step-name">{{ step.name }}</span>
              <span class="step-dir" :class="step.dir">{{ step.dir === 'right' ? '→' : '←' }}</span>
            </div>
            <div v-if="current >= i" class="step-detail">{{ step.detail }}</div>
          </div>
        </div>
      </div>

      <div class="flow-side server-side">
        <div class="side-label">{{ t('powerOnToWeb.url.server') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useI18n } from '../../../composables/useI18n'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals'

const { t, messages } = useI18n(computerFundamentalsLocale)
const current = ref(-1)
const playing = ref(false)
let timer = null

const steps = computed(() => messages.value.powerOnToWeb.url.steps)

const autoPlay = () => {
  if (timer) clearInterval(timer)
  current.value = -1
  playing.value = true
  let i = 0
  timer = setInterval(() => {
    current.value = i
    i++
    if (i >= steps.value.length) {
      if (timer) clearInterval(timer)
      playing.value = false
    }
  }, 800)
}

onUnmounted(() => { if (timer) clearInterval(timer) })
</script>

<style scoped>
.url-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}
.demo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}
.demo-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}
.play-btn {
  font-size: 0.65rem;
  padding: 0.25rem 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: border-color 0.2s;
}
.play-btn:hover:not(:disabled) { border-color: var(--vp-c-brand); }
.play-btn:disabled { opacity: 0.5; cursor: default; }
.flow {
  display: flex;
  gap: 0.5rem;
}
.flow-side {
  display: flex;
  align-items: flex-start;
  padding-top: 0.3rem;
}
.side-label {
  writing-mode: vertical-rl;
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  letter-spacing: 0.15em;
}
.flow-steps { flex: 1; display: flex; flex-direction: column; }
.step {
  display: flex;
  gap: 0.5rem;
  opacity: 0.35;
  transition: opacity 0.3s;
}
.step.active { opacity: 1; }
.step.highlight .step-dot { box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.2); }
.step-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 0.8rem;
  flex-shrink: 0;
}
.step-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--vp-c-divider);
  transition: all 0.3s;
  flex-shrink: 0;
  margin-top: 0.35rem;
}
.step.active .step-dot { background: var(--vp-c-brand); }
.step-connector {
  flex: 1;
  width: 1px;
  background: var(--vp-c-divider);
  min-height: 0.8rem;
}
.step.active .step-connector { background: var(--vp-c-brand); opacity: 0.3; }
.step-body { flex: 1; padding-bottom: 0.5rem; }
.step-head { display: flex; align-items: center; gap: 0.35rem; }
.step-num {
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  min-width: 1rem;
}
.step.active .step-num { color: var(--vp-c-brand); }
.step-name {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}
.step-dir {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}
.step-dir.right { color: var(--vp-c-brand); }
.step-dir.left { color: #e879a0; }
.step-detail {
  font-size: 0.63rem;
  color: var(--vp-c-text-3);
  margin-top: 0.2rem;
  padding: 0.25rem 0.4rem;
  background: var(--vp-c-bg);
  border-radius: 4px;
  font-family: monospace;
  line-height: 1.5;
}
@media (max-width: 480px) {
  .flow-side { display: none; }
}
</style>
