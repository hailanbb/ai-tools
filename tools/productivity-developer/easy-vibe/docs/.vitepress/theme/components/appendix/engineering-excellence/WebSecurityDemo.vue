<template>
  <div class="web-security-demo">
    <div class="demo-label">{{ t('webSecurity.title') }}</div>

    <div class="tabs">
      <button
        v-for="(v, i) in vulns"
        :key="i"
        class="tab"
        :class="{ active: current === i }"
        @click="current = i"
      >{{ v.icon }} {{ v.name }}</button>
    </div>

    <div class="vuln-card">
      <div class="attack-flow">
        <div class="flow-title">{{ t('webSecurity.flowTitle') }}</div>
        <div class="flow-steps">
          <div v-for="(s, j) in vulns[current].flow" :key="j" class="flow-step">
            <span class="step-num">{{ j + 1 }}</span>
            <span class="step-text">{{ s }}</span>
          </div>
        </div>
      </div>

      <div class="code-compare">
        <div class="code-col bad">
          <div class="col-title">{{ t('webSecurity.badTitle') }}</div>
          <pre><code>{{ vulns[current].bad }}</code></pre>
        </div>
        <div class="code-col good">
          <div class="col-title">{{ t('webSecurity.goodTitle') }}</div>
          <pre><code>{{ vulns[current].good }}</code></pre>
        </div>
      </div>

      <div class="defense-tip">
        <strong>{{ t('webSecurity.defense') }}</strong>{{ vulns[current].defense }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { engineeringExcellenceLocale } from '../../../locales/engineering-excellence/index.js'

const { t, messages } = useI18n(engineeringExcellenceLocale)
const current = ref(0)
const vulns = computed(() => messages.value.webSecurity.vulns)
</script>

<style scoped>
.web-security-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}
.demo-label { font-size: 0.78rem; font-weight: bold; color: var(--vp-c-text-2); margin-bottom: 1rem; text-align: center; }
.tabs { display: flex; gap: 6px; margin-bottom: 1rem; flex-wrap: wrap; }
.tab { padding: 6px 14px; border-radius: 6px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); cursor: pointer; font-size: 0.85rem; transition: all 0.2s; }
.tab.active { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }

.attack-flow { margin-bottom: 12px; }
.flow-title { font-size: 0.8rem; font-weight: 600; color: var(--vp-c-text-2); margin-bottom: 6px; }
.flow-steps { display: flex; gap: 4px; flex-wrap: wrap; }
.flow-step { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; padding: 4px 8px; background: var(--vp-c-bg); border-radius: 4px; }
.flow-step::after { content: '→'; color: var(--vp-c-text-3); margin-left: 4px; }
.flow-step:last-child::after { content: ''; }
.step-num { width: 18px; height: 18px; border-radius: 50%; background: var(--vp-c-brand); color: #fff; font-size: 0.7rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

.code-compare { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px; }
@media (max-width: 640px) { .code-compare { grid-template-columns: 1fr; } }
.code-col { border-radius: 6px; overflow: hidden; }
.col-title { font-size: 0.72rem; padding: 4px 10px; border-bottom: 1px solid var(--vp-c-divider); }
.code-col.bad .col-title { background: #fef2f2; color: #991b1b; }
.code-col.good .col-title { background: #ecfdf5; color: #065f46; }
:root.dark .code-col.bad .col-title { background: #1c0606; color: #fca5a5; }
:root.dark .code-col.good .col-title { background: #031c14; color: #6ee7b7; }
.code-col pre { margin: 0; padding: 8px; font-size: 0.78rem; line-height: 1.5; overflow-x: auto; background: var(--vp-c-bg); }

.defense-tip { font-size: 0.83rem; padding: 8px; background: var(--vp-c-bg); border-radius: 4px; border-left: 3px solid var(--vp-c-brand); }
</style>
