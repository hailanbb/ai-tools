<template>
  <div class="compile-vs-interpret-demo">
    <h4>{{ t('compilers.compileVsInterpret.title') }}</h4>
    <p class="desc">{{ t('compilers.compileVsInterpret.desc') }}</p>

    <div class="mode-selector">
      <button
        v-for="(m, i) in modes"
        :key="i"
        :class="['mode-btn', { active: selected === i }]"
        @click="selectMode(i)"
      >
        {{ m.name }}
      </button>
    </div>

    <div class="pipeline">
      <div
        v-for="(step, j) in modes[selected].steps"
        :key="j"
        :class="['pipe-step', { visible: visibleSteps > j }]"
      >
        <div class="step-icon">{{ step.icon }}</div>
        <div class="step-content">
          <div class="step-name">{{ step.name }}</div>
          <div class="step-desc">{{ step.desc }}</div>
        </div>
        <div v-if="j < modes[selected].steps.length - 1" class="arrow">→</div>
      </div>
    </div>

    <div class="metrics">
      <div v-for="m in modes[selected].metrics" :key="m.label" class="metric">
        <span class="metric-label">{{ m.label }}</span>
        <div class="metric-bar-bg">
          <div class="metric-bar" :style="{ width: m.value + '%', background: m.color }"></div>
        </div>
        <span class="metric-val">{{ m.text }}</span>
      </div>
    </div>

    <div class="examples">
      <span class="ex-label">{{ t('compilers.compileVsInterpret.examplesLabel') }}</span>
      <span v-for="l in modes[selected].langs" :key="l" class="ex-lang">
        {{ l }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../../../composables/useI18n'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals'

const { t, messages } = useI18n(computerFundamentalsLocale)

const selected = ref(0)
const visibleSteps = ref(0)
let timer = null

onMounted(() => {
  selectMode(0)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

function selectMode(i) {
  selected.value = i
  visibleSteps.value = 0
  clearInterval(timer)
  timer = setInterval(() => {
    if (visibleSteps.value < modes[i].steps.length) {
      visibleSteps.value++
    } else {
      clearInterval(timer)
    }
  }, 300)
}

const modes = computed(() => messages.value.compilers.compileVsInterpret.modes)
</script>

<style scoped>
.compile-vs-interpret-demo {
  padding: 20px; border: 1px solid var(--vp-c-divider);
  border-radius: 12px; margin: 16px 0; background: var(--vp-c-bg-soft);
}
h4 { margin: 0 0 4px; }
.desc { color: var(--vp-c-text-2); font-size: 14px; margin: 0 0 16px; }
.mode-selector { display: flex; gap: 8px; margin-bottom: 16px; }
.mode-btn {
  padding: 8px 18px; border-radius: 8px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 14px; font-weight: 500;
  transition: all 0.2s;
}
.mode-btn.active { background: var(--vp-c-brand-1); color: #fff; border-color: var(--vp-c-brand-1); }
.pipeline { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; margin-bottom: 16px; }
.pipe-step {
  display: flex; align-items: center; gap: 4px; opacity: 0;
  transform: translateY(8px); transition: all 0.3s;
}
.pipe-step.visible { opacity: 1; transform: translateY(0); }
.step-icon { font-size: 24px; }
.step-name { font-size: 12px; font-weight: 600; }
.step-desc { font-size: 11px; color: var(--vp-c-text-3); }
.arrow { color: var(--vp-c-text-3); font-size: 18px; margin: 0 4px; }
.metrics { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
.metric { display: flex; align-items: center; gap: 8px; font-size: 13px; }
.metric-label { width: 70px; text-align: right; color: var(--vp-c-text-2); }
.metric-bar-bg { flex: 1; height: 10px; background: var(--vp-c-divider); border-radius: 5px; overflow: hidden; }
.metric-bar { height: 100%; border-radius: 5px; transition: width 0.5s; }
.metric-val { width: 130px; font-size: 12px; color: var(--vp-c-text-3); }
.examples { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.ex-label { font-size: 13px; color: var(--vp-c-text-2); }
.ex-lang {
  padding: 3px 10px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 4px; font-size: 12px;
}
@media (max-width: 640px) { .metric-val { width: auto; } }
</style>
