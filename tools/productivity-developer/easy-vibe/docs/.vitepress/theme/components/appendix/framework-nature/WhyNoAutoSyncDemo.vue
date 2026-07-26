<template>
  <div class="why-no-auto-sync-demo">
    <div class="demo-header">
      <span class="title">{{ t('whyNoAutoSync.title') }}</span>
      <span class="subtitle">{{ t('whyNoAutoSync.subtitle') }}</span>
    </div>

    <div class="toggle-bar">
      <button
        :class="['toggle-btn', { active: mode === 'native' }]"
        @click="switchMode('native')"
      >
        {{ t('whyNoAutoSync.native') }}
      </button>
      <button
        :class="['toggle-btn', { active: mode === 'framework' }]"
        @click="switchMode('framework')"
      >
        {{ t('whyNoAutoSync.framework') }}
      </button>
    </div>

    <div class="visualization-area">
      <div class="code-col">
        <div class="col-title">{{ t('whyNoAutoSync.codeTitle') }}</div>
        <div class="code-block">
          <div class="code-line">
            <span class="code-comment">{{ t('whyNoAutoSync.clickComment') }}</span>
          </div>
          <div :class="['code-line', 'code-highlight', { executing: step >= 1 }]">
            <span class="code-text">count = count + 1</span>
            <span v-if="step >= 1" class="step-badge">{{ t('whyNoAutoSync.executed') }}</span>
          </div>
          <template v-if="mode === 'native'">
            <div class="code-line code-gap" />
            <div class="code-line">
              <span class="code-comment">{{ t('whyNoAutoSync.manualComment') }}</span>
            </div>
            <div :class="['code-line', 'code-manual', { executing: step >= 2, missing: step === 1 }]">
              <span class="code-text">document.getElementById('count')</span>
            </div>
            <div :class="['code-line', 'code-manual', { executing: step >= 2, missing: step === 1 }]">
              <span class="code-text">  .textContent = count</span>
              <span v-if="step >= 2" class="step-badge">{{ t('whyNoAutoSync.manualBadge') }}</span>
              <span v-else-if="step === 1" class="step-badge miss">{{ t('whyNoAutoSync.needWrite') }}</span>
            </div>
            <div :class="['code-line', 'code-manual', { executing: step >= 3, missing: step < 3 && step >= 1 }]">
              <span class="code-text">document.getElementById('total')</span>
            </div>
            <div :class="['code-line', 'code-manual', { executing: step >= 3, missing: step < 3 && step >= 1 }]">
              <span class="code-text">  .textContent = count * 99</span>
              <span v-if="step >= 3" class="step-badge">{{ t('whyNoAutoSync.manualBadge') }}</span>
              <span v-else-if="step >= 1" class="step-badge miss">{{ t('whyNoAutoSync.needWrite') }}</span>
            </div>
          </template>
          <template v-else>
            <div class="code-line code-gap" />
            <div class="code-line">
              <span class="code-comment">{{ t('whyNoAutoSync.noMoreCode') }}</span>
            </div>
            <div class="code-line">
              <span class="code-comment">{{ t('whyNoAutoSync.frameworkAutoComment') }}</span>
            </div>
          </template>
        </div>
      </div>

      <div class="flow-col">
        <div class="col-title">{{ t('whyNoAutoSync.flowTitle') }}</div>
        <div class="flow-steps">
          <div :class="['flow-step', { active: step >= 1, done: step > 1 }]">
            <span class="flow-num">1</span>
            <div class="flow-content">
              <div class="flow-title">{{ t('whyNoAutoSync.jsModify') }}</div>
              <div class="flow-desc">
                {{ t('whyNoAutoSync.countChanged', { from: count - 1, to: count }) }}
              </div>
            </div>
          </div>

          <div class="flow-arrow" :class="{ active: step >= 1 }">
            <span v-if="mode === 'native'">{{ step === 1 ? t('whyNoAutoSync.stopped') : '↓' }}</span>
            <span v-else>{{ step >= 1 ? t('whyNoAutoSync.frameworkTakesOver') : '↓' }}</span>
          </div>

          <div :class="['flow-step', { active: step >= 2, done: step > 2, auto: mode === 'framework' }]">
            <span class="flow-num">2</span>
            <div class="flow-content">
              <div class="flow-title">
                {{ mode === 'native' ? t('whyNoAutoSync.findDom') : t('whyNoAutoSync.detectChange') }}
              </div>
              <div class="flow-desc">
                {{ mode === 'native'
                  ? t('whyNoAutoSync.manualGetDom')
                  : t('whyNoAutoSync.proxyDetect') }}
              </div>
            </div>
            <span v-if="mode === 'framework' && step >= 2" class="auto-badge">{{ t('whyNoAutoSync.auto') }}</span>
          </div>

          <div class="flow-arrow" :class="{ active: step >= 2 }">↓</div>

          <div :class="['flow-step', { active: step >= 3, done: step > 3, auto: mode === 'framework' }]">
            <span class="flow-num">3</span>
            <div class="flow-content">
              <div class="flow-title">
                {{ mode === 'native' ? t('whyNoAutoSync.modifyDom') : t('whyNoAutoSync.frameworkUpdateDom') }}
              </div>
              <div class="flow-desc">
                {{ mode === 'native'
                  ? t('whyNoAutoSync.manualTextContent')
                  : t('whyNoAutoSync.autoUpdateCount') }}
              </div>
            </div>
            <span v-if="mode === 'framework' && step >= 3" class="auto-badge">{{ t('whyNoAutoSync.auto') }}</span>
          </div>
        </div>
      </div>

      <div class="result-col">
        <div class="col-title">{{ t('whyNoAutoSync.resultTitle') }}</div>
        <div class="result-card">
          <div :class="['result-item', { updated: step >= (mode === 'native' ? 2 : 2) }]">
            <span class="result-label">{{ t('whyNoAutoSync.cart') }}</span>
            <span class="result-value">
              {{ t('whyNoAutoSync.itemUnit', { count: step >= (mode === 'native' ? 2 : 2) ? count : count - 1 }) }}
            </span>
          </div>
          <div :class="['result-item', { updated: step >= (mode === 'native' ? 3 : 2), stale: mode === 'native' && step >= 1 && step < 3 }]">
            <span class="result-label">{{ t('whyNoAutoSync.totalPrice') }}</span>
            <span class="result-value">¥{{ step >= (mode === 'native' ? 3 : 2) ? count * 99 : (count - 1) * 99 }}</span>
          </div>
        </div>
        <div v-if="mode === 'native' && step === 1" class="stale-warning">
          {{ t('whyNoAutoSync.staleAll') }}
        </div>
        <div v-if="mode === 'native' && step === 2" class="stale-warning partial">
          {{ t('whyNoAutoSync.stalePartial') }}
        </div>
      </div>
    </div>

    <div class="controls">
      <button class="action-btn" :disabled="isAnimating" @click="runStep">
        {{ actionLabel }}
      </button>
      <button class="action-btn outline" @click="reset">{{ t('whyNoAutoSync.reset') }}</button>
    </div>

    <div v-if="mode === 'native'" class="info-box">
      <strong>{{ t('whyNoAutoSync.nativeInfoStrong') }}</strong>
      <span v-html="t('whyNoAutoSync.nativeInfo')" />
    </div>
    <div v-else class="info-box">
      <strong>{{ t('whyNoAutoSync.frameworkInfoStrong') }}</strong>
      <span v-html="t('whyNoAutoSync.frameworkInfo')" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { frameworkNatureLocale } from '../../../locales/framework-nature/index.js'

const { t } = useI18n(frameworkNatureLocale)

const mode = ref('native')
const step = ref(0)
const count = ref(1)
const isAnimating = ref(false)

const actionLabel = computed(() => {
  if (step.value === 0) return t('whyNoAutoSync.runInitial')
  if (mode.value === 'native' && step.value < 3) {
    return t('whyNoAutoSync.continueManual')
  }
  return t('whyNoAutoSync.runAgain')
})

function switchMode(m) {
  if (isAnimating.value) return
  mode.value = m
  reset()
}

function reset() {
  step.value = 0
  count.value = 1
  isAnimating.value = false
}

async function runStep() {
  if (isAnimating.value) return

  if (mode.value === 'native') {
    if (step.value === 0) {
      isAnimating.value = true
      count.value++
      step.value = 1
      isAnimating.value = false
    } else if (step.value === 1) {
      step.value = 2
    } else if (step.value === 2) {
      step.value = 3
    } else {
      reset()
      await new Promise(r => setTimeout(r, 100))
      runStep()
    }
  } else {
    if (step.value === 0 || step.value >= 3) {
      if (step.value >= 3) {
        reset()
        await new Promise(r => setTimeout(r, 100))
      }
      isAnimating.value = true
      count.value++
      step.value = 1
      await new Promise(r => setTimeout(r, 400))
      step.value = 2
      await new Promise(r => setTimeout(r, 400))
      step.value = 3
      isAnimating.value = false
    }
  }
}
</script>

<style scoped>
.why-no-auto-sync-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .title { font-size: 1rem; font-weight: 600; }
.demo-header .subtitle { font-size: 0.85rem; color: var(--vp-c-text-2); }

.toggle-bar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.toggle-btn {
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  transition: all 0.2s;
}

.toggle-btn:hover { border-color: var(--vp-c-brand); }
.toggle-btn.active { background: var(--vp-c-brand); color: white; border-color: var(--vp-c-brand); }

.visualization-area {
  display: grid;
  grid-template-columns: 1fr 1fr 0.8fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.col-title {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.code-col, .flow-col, .result-col {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.6rem;
}

.code-block {
  font-family: var(--vp-font-family-mono);
  font-size: 0.72rem;
  line-height: 1.6;
}

.code-line {
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.code-gap { height: 0.3rem; }

.code-comment { color: var(--vp-c-text-3); }
.code-text { color: var(--vp-c-text-1); }

.code-highlight.executing {
  background: rgba(16, 185, 129, 0.1);
  border-left: 2px solid var(--vp-c-green-1);
}

.code-manual {
  transition: all 0.3s;
}

.code-manual.executing {
  background: rgba(59, 130, 246, 0.08);
  border-left: 2px solid var(--vp-c-brand);
}

.code-manual.missing {
  opacity: 0.5;
  border-left: 2px dashed var(--vp-c-danger-1);
}

.step-badge {
  font-size: 0.62rem;
  padding: 0 0.3rem;
  border-radius: 3px;
  background: var(--vp-c-green-1);
  color: white;
  flex-shrink: 0;
  margin-left: auto;
}

.step-badge.miss {
  background: var(--vp-c-danger-1);
}

.flow-steps {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.flow-step {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  padding: 0.4rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  transition: all 0.3s;
  opacity: 0.4;
  position: relative;
}

.flow-step.active { opacity: 1; border-color: var(--vp-c-brand); }
.flow-step.done { opacity: 1; border-color: var(--vp-c-green-1); }
.flow-step.auto.active { border-color: var(--vp-c-green-1); background: rgba(16, 185, 129, 0.05); }

.flow-num {
  width: 1.2rem;
  height: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  font-size: 0.68rem;
  font-weight: 700;
  flex-shrink: 0;
}

.flow-step.active .flow-num { background: var(--vp-c-brand); color: white; border-color: var(--vp-c-brand); }
.flow-step.done .flow-num { background: var(--vp-c-green-1); color: white; border-color: var(--vp-c-green-1); }

.flow-content { flex: 1; min-width: 0; }
.flow-title { font-size: 0.78rem; font-weight: 600; color: var(--vp-c-text-1); }
.flow-desc { font-size: 0.7rem; color: var(--vp-c-text-2); margin-top: 0.1rem; }

.auto-badge {
  position: absolute;
  top: 0.25rem;
  right: 0.35rem;
  font-size: 0.58rem;
  padding: 0 0.3rem;
  border-radius: 3px;
  background: var(--vp-c-green-1);
  color: white;
  font-weight: 600;
}

.flow-arrow {
  text-align: center;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  padding: 0.1rem 0;
  transition: color 0.3s;
}

.flow-arrow.active { color: var(--vp-c-brand); font-weight: 600; }

.result-card {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0.5rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.82rem;
  transition: all 0.3s;
}

.result-item.updated { border-color: var(--vp-c-green-1); background: rgba(16, 185, 129, 0.06); }
.result-item.stale { border-color: var(--vp-c-danger-1); background: rgba(239, 68, 68, 0.06); }

.result-label { color: var(--vp-c-text-2); }
.result-value { font-weight: 700; }

.stale-warning {
  margin-top: 0.4rem;
  font-size: 0.75rem;
  color: var(--vp-c-danger-1);
  font-weight: 600;
  padding: 0.3rem 0.5rem;
  background: rgba(239, 68, 68, 0.06);
  border-radius: 4px;
  text-align: center;
}

.stale-warning.partial { color: var(--vp-c-warning-1); background: rgba(255, 206, 86, 0.08); }

.controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.action-btn {
  padding: 0.35rem 0.8rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.82rem;
}

.action-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.action-btn.outline { background: transparent; border: 1px solid var(--vp-c-divider); color: var(--vp-c-text-1); }
.action-btn.outline:hover { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
  line-height: 1.5;
}

.info-box strong { white-space: nowrap; flex-shrink: 0; color: var(--vp-c-text-1); }

.info-box code {
  background: var(--vp-c-bg);
  padding: 0 0.2rem;
  border-radius: 2px;
  font-size: 0.78rem;
  font-family: var(--vp-font-family-mono);
}

@media (max-width: 720px) {
  .visualization-area { grid-template-columns: 1fr; }
  .toggle-bar { flex-direction: column; }
  .toggle-btn { width: 100%; }
}
</style>
