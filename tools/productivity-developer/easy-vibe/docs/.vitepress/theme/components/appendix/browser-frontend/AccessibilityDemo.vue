<template>
  <div class="demo-wrapper">
    <div class="demo-header">
      <span class="icon">🔍</span> 
      <span>{{ t('accessibility.title') }}</span>
    </div>
    
    <div class="intro-text">
      {{ t('accessibility.intro') }}
    </div>

    <div class="comparison-container">
      
      <div class="case-panel bad-case">
        <h3 class="case-title">{{ t('accessibility.caseATitle') }}</h3>
        <p class="case-desc">{{ t('accessibility.caseADesc') }}</p>
        
        <div class="interactive-area">
          <div class="label">{{ t('accessibility.confirmLabel') }}</div>
          
          <div
            class="fake-input"
            @click="simulateFocus('bad', t('accessibility.placeholder'))"
          >
            {{ t('accessibility.placeholder') }}
          </div>
          
          <div
            class="fake-button"
            @mouseenter="simulateFocus('bad', t('accessibility.confirmBtn'))"
            @mouseleave="clearFocus('bad')"
            @click="handleClick('bad')"
          >
            {{ t('accessibility.confirmBtn') }}
          </div>
        </div>

        <div class="aom-monitor">
          <div class="monitor-header">{{ t('accessibility.aomHeader') }}</div>
          <div class="monitor-screen" :class="{ 'has-content': badCaseOutput }">
            {{ badCaseOutput || t('accessibility.noTabSupport') }}
          </div>
        </div>
      </div>

      
      <div class="case-panel good-case">
        <h3 class="case-title">{{ t('accessibility.caseBTitle') }}</h3>
        <p class="case-desc">{{ t('accessibility.caseBDesc') }}</p>
        
        <div class="interactive-area">
          <label for="a11y-input" class="label">{{ t('accessibility.confirmLabel') }}</label>
          <input
            id="a11y-input"
            type="text"
            :placeholder="t('accessibility.placeholder')"
            @focus="simulateFocus('good', t('accessibility.inputAria'))"
            @blur="clearFocus('good')"
            @mouseenter="simulateFocus('good', t('accessibility.inputAria'))"
            @mouseleave="clearFocus('good')"
          />
          <button
            type="button"
            class="real-button"
            aria-label="Submit verification code"
            @focus="simulateFocus('good', t('accessibility.btnAriaFocus'))"
            @blur="clearFocus('good')"
            @mouseenter="simulateFocus('good', t('accessibility.btnAriaHover'))"
            @mouseleave="clearFocus('good')"
            @click="handleClick('good')"
          >
            {{ t('accessibility.confirmBtn') }}
          </button>
        </div>

        <div class="aom-monitor">
          <div class="monitor-header">{{ t('accessibility.aomHeader') }}</div>
          <div class="monitor-screen" :class="{ 'has-content': goodCaseOutput }">
            {{ goodCaseOutput || t('accessibility.monitorHint') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { browserFrontendLocale } from '../../../locales/browser-frontend/index.js'

const { t } = useI18n(browserFrontendLocale)

const badCaseOutput = ref('')
const goodCaseOutput = ref('')
let timerBad = null
let timerGood = null

const simulateFocus = (type, text) => {
  if (type === 'bad') {
    if (timerBad) clearTimeout(timerBad)
    badCaseOutput.value = text
  } else {
    if (timerGood) clearTimeout(timerGood)
    goodCaseOutput.value = t('accessibility.speaking') + text
  }
}

const clearFocus = (type) => {
  if (type === 'bad') {
    timerBad = setTimeout(() => { badCaseOutput.value = '' }, 400)
  } else {
    timerGood = setTimeout(() => { goodCaseOutput.value = '' }, 400)
  }
}

const handleClick = (type) => {
  if (type === 'bad') {
    alert(t('accessibility.alertBad'))
  } else {
    alert(t('accessibility.alertGood'))
  }
}
</script>

<style scoped>
.demo-wrapper {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1.8rem;
  margin: 2rem 0;
  font-family: var(--vp-font-family-base);
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--vp-c-divider);
  padding-bottom: 0.8rem;
}

.intro-text {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1.8rem;
  line-height: 1.6;
}

.comparison-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .comparison-container {
    flex-direction: row;
  }
  .case-panel {
    flex: 1;
    min-width: 0;
  }
}

.case-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.bad-case {
  border-top: 4px solid var(--vp-c-danger-1);
}

.good-case {
  border-top: 4px solid var(--vp-c-brand-1);
}

.case-title {
  margin: 0 0 0.8rem 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.case-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
  line-height: 1.5;
  min-height: 2.5rem;
}

.case-desc code {
  background: var(--vp-c-bg-alt);
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  color: var(--vp-c-text-1);
}

.interactive-area {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  border: 1px dashed var(--vp-c-divider);
}

.label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.fake-input {
  background: #fff;
  border: 1px solid #ccc;
  padding: 0.6rem 0.8rem;
  font-size: 0.9rem;
  color: #888;
  cursor: text;
  border-radius: 4px;
}
.fake-button {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 0.6rem 1.2rem;
  text-align: center;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid var(--vp-c-brand-soft);
}

#a11y-input {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  padding: 0.6rem 0.8rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  border-radius: 4px;
  transition: all 0.2s;
}
#a11y-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 2px var(--vp-c-brand-soft);
}
.real-button {
  background: var(--vp-c-brand-1);
  color: #fff;
  padding: 0.6rem 1.2rem;
  text-align: center;
  font-weight: 600;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}
.real-button:hover {
  background: var(--vp-c-brand-2);
}
.real-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.aom-monitor {
  margin-top: auto;
  background: #1e293b;
  border-radius: 6px;
  padding: 1rem;
  border-left: 4px solid #475569;
}

.monitor-header {
  font-size: 0.8rem;
  color: #94a3b8;
  margin-bottom: 0.6rem;
  font-weight: 600;
}

.monitor-screen {
  font-family: "Courier New", Courier, monospace;
  font-size: 0.9rem;
  color: #64748b;
  min-height: 2.5rem;
  line-height: 1.4;
}

.monitor-screen.has-content {
  font-weight: bold;
}

.dark .fake-input { background: #333; border-color: #555; }
</style>
