<template>
  <div class="upload-flow-demo">
    <div class="header">
      <div class="title">{{ t('uploadFlow.title') }}</div>
      <div class="subtitle">{{ t('uploadFlow.subtitle') }}</div>
    </div>

    <div class="mode-tabs">
      <button
        :class="['tab', { active: mode === 'proxy' }]"
        @click="mode = 'proxy'; reset()"
      >{{ t('uploadFlow.tabs.proxy') }}</button>
      <button
        :class="['tab', { active: mode === 'direct' }]"
        @click="mode = 'direct'; reset()"
      >{{ t('uploadFlow.tabs.direct') }}</button>
    </div>

    <div class="flow-steps">
      <div
        v-for="(step, i) in currentSteps"
        :key="i"
        :class="['step', { active: currentStep === i, done: currentStep > i }]"
      >
        <div class="step-num">{{ i + 1 }}</div>
        <div class="step-content">
          <div class="step-title">{{ step.title }}</div>
          <div class="step-desc">{{ step.desc }}</div>
          <div v-if="step.note" class="step-note">{{ step.note }}</div>
        </div>
      </div>
    </div>

    <button class="play-btn" :disabled="playing" @click="playFlow">
      {{ playing ? t('uploadFlow.playingLabel') : t('uploadFlow.playLabel') }}
    </button>

    <div v-if="currentStep >= currentSteps.length" :class="['verdict', mode]">
      {{ t(`uploadFlow.verdicts.${mode}`) }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { fileStorageLocale } from '../../../locales/file-storage/index.js'

const { t, messages } = useI18n(fileStorageLocale)

const mode = ref('proxy')
const currentStep = ref(-1)
const playing = ref(false)

const currentSteps = computed(() => messages.value.uploadFlow.steps[mode.value])

function reset() {
  currentStep.value = -1
  playing.value = false
}

async function playFlow() {
  reset()
  playing.value = true
  for (let i = 0; i < currentSteps.value.length; i++) {
    currentStep.value = i
    await new Promise(r => setTimeout(r, 800))
  }
  currentStep.value = currentSteps.value.length
  playing.value = false
}
</script>

<style scoped>
.upload-flow-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.mode-tabs { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.tab {
  padding: 0.4rem 0.8rem; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 0.85rem;
}
.tab.active { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }
.flow-steps { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
.step {
  display: flex; gap: 0.75rem; padding: 0.6rem 0.75rem; border-radius: 8px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); transition: all 0.3s;
}
.step.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); }
.step.done { border-color: #22c55e; background: rgba(34,197,94,0.03); }
.step-num {
  width: 28px; height: 28px; border-radius: 50%; background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider); display: flex; align-items: center;
  justify-content: center; font-weight: 700; font-size: 0.8rem; flex-shrink: 0;
}
.step.active .step-num { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }
.step.done .step-num { border-color: #22c55e; color: #22c55e; }
.step-title { font-weight: 600; font-size: 0.9rem; }
.step-desc { font-size: 0.8rem; color: var(--vp-c-text-2); }
.step-note { font-size: 0.75rem; color: var(--vp-c-text-3); font-style: italic; margin-top: 0.2rem; }
.play-btn {
  padding: 0.5rem 1.5rem; border-radius: 6px; border: none;
  background: var(--vp-c-brand); color: #fff; cursor: pointer; font-size: 0.9rem;
}
.play-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.verdict {
  margin-top: 1rem; padding: 0.75rem; border-radius: 8px; font-size: 0.9rem;
}
.verdict.proxy { background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.3); }
.verdict.direct { background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.3); }
</style>
