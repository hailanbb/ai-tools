<template>
  <div class="domain-demo">
    <div class="header">
      <div class="title">{{ t('domain.title') }}</div>
      <div class="subtitle">{{ t('domain.subtitle') }}</div>
    </div>

    <div class="tabs">
      <button
        v-for="tab in tabs" :key="tab.id"
        :class="['tab', { active: current === tab.id }]"
        @click="current = tab.id"
      >{{ tab.name }}</button>
    </div>

    <div v-if="current === 'comparison'" class="cards">
      <div class="card bad">
        <div class="card-head">
          <span class="card-title">{{ t('domain.anemicTitle') }}</span>
          <span class="card-badge bad">{{ t('domain.traditional') }}</span>
        </div>
        <pre class="code"><code>{{ anemicEntity }}</code></pre>
        <pre class="code"><code>{{ anemicService }}</code></pre>
        <div class="result-box bad">
          <strong>{{ t('domain.anemicProblemsTitle') }}</strong>
          <ul>
            <li v-for="item in anemicProblems" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>

      <div class="card good">
        <div class="card-head">
          <span class="card-title">{{ t('domain.richTitle') }}</span>
          <span class="card-badge good">{{ t('domain.recommended') }}</span>
        </div>
        <pre class="code"><code>{{ richEntity }}</code></pre>
        <pre class="code"><code>{{ richService }}</code></pre>
        <div class="result-box good">
          <strong>{{ t('domain.richBenefitsTitle') }}</strong>
          <ul>
            <li v-for="item in richBenefits" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div v-else class="vo-section">
      <div class="vo-intro">
        <strong>{{ t('domain.valueObjectTitle') }}</strong>
        <p>{{ t('domain.valueObjectDesc') }}</p>
      </div>
      <div class="vo-examples">
        <div class="vo-card">
          <div class="vo-name">{{ t('domain.addressTitle') }}</div>
          <pre class="code"><code>{{ addressVO }}</code></pre>
        </div>
        <div class="vo-card">
          <div class="vo-name">{{ t('domain.moneyTitle') }}</div>
          <pre class="code"><code>{{ moneyVO }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { backendLayeredArchitectureLocale } from '../../../locales/backend-layered-architecture/index.js'

const { t, messages } = useI18n(backendLayeredArchitectureLocale)
const current = ref('comparison')
const tabs = computed(() => messages.value.domain.tabs)
const anemicProblems = computed(() => messages.value.domain.anemicProblems)
const richBenefits = computed(() => messages.value.domain.richBenefits)
const anemicEntity = computed(() => messages.value.domain.anemicEntity)
const anemicService = computed(() => messages.value.domain.anemicService)
const richEntity = computed(() => messages.value.domain.richEntity)
const richService = computed(() => messages.value.domain.richService)
const addressVO = computed(() => messages.value.domain.addressVO)
const moneyVO = computed(() => messages.value.domain.moneyVO)
</script>

<style scoped>
.domain-demo { padding: 20px; background: var(--vp-c-bg-soft); border-radius: 12px; }
.header { text-align: center; margin-bottom: 20px; }
.title { font-size: 16px; font-weight: 600; color: var(--vp-c-text-1); }
.subtitle { font-size: 13px; color: var(--vp-c-text-3); margin-top: 4px; }

.tabs { display: flex; gap: 8px; margin-bottom: 16px; }
.tab {
  padding: 7px 16px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);
  border-radius: 6px; cursor: pointer; font-size: 13px; color: var(--vp-c-text-2); transition: all .2s;
}
.tab:hover { color: var(--vp-c-brand-1); border-color: var(--vp-c-brand-1); }
.tab.active { background: var(--vp-c-brand-1); border-color: var(--vp-c-brand-1); color: #fff; }

.cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.card {
  padding: 16px; border-radius: 10px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.card.bad { border-left: 3px solid var(--vp-c-danger-1); }
.card.good { border-left: 3px solid var(--vp-c-green-1); }

.card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.card-title { font-weight: 600; font-size: 14px; color: var(--vp-c-text-1); }
.card-badge { padding: 2px 8px; border-radius: 10px; font-size: 11px; color: #fff; }
.card-badge.bad { background: var(--vp-c-danger-1); }
.card-badge.good { background: var(--vp-c-green-1); }

.code {
  margin: 0 0 12px; padding: 10px; border-radius: 6px; overflow-x: auto;
  background: var(--vp-code-block-bg); font-size: 10px; line-height: 1.5;
}
.code code { color: var(--vp-c-text-1); font-family: var(--vp-font-family-mono); }

.result-box { padding: 10px; border-radius: 6px; font-size: 12px; line-height: 1.5; }
.result-box.bad { background: var(--vp-c-danger-soft); border-left: 3px solid var(--vp-c-danger-1); }
.result-box.good { background: var(--vp-c-green-soft); border-left: 3px solid var(--vp-c-green-1); }
.result-box strong { font-size: 12px; color: var(--vp-c-text-1); }
.result-box ul { margin: 6px 0 0; padding-left: 16px; }
.result-box li { margin: 3px 0; color: var(--vp-c-text-2); }

.vo-section { background: var(--vp-c-bg); border-radius: 10px; padding: 18px; border: 1px solid var(--vp-c-divider); }
.vo-intro { margin-bottom: 16px; font-size: 13px; color: var(--vp-c-text-2); line-height: 1.6; }
.vo-intro strong { color: var(--vp-c-text-1); }
.vo-intro p { margin: 6px 0 0; }
.vo-examples { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.vo-card { background: var(--vp-c-bg-soft); border-radius: 8px; padding: 14px; }
.vo-name { font-weight: 600; font-size: 13px; color: var(--vp-c-text-1); margin-bottom: 8px; }

@media (max-width: 1024px) {
  .cards, .vo-examples { grid-template-columns: 1fr; }
}
</style>
