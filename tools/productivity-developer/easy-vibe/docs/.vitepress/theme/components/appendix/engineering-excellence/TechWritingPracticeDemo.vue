<template>
  <div class="tech-writing-demo">
    <div class="demo-label">{{ t('techWriting.title') }}</div>

    <div class="tabs">
      <button
        v-for="(c, i) in cases"
        :key="i"
        class="tab"
        :class="{ active: current === i }"
        @click="current = i"
      >{{ c.icon }} {{ c.name }}</button>
    </div>

    <div class="compare">
      <div class="col bad">
        <div class="col-title">{{ t('techWriting.badTitle') }}</div>
        <pre><code>{{ cases[current].bad }}</code></pre>
      </div>
      <div class="col good">
        <div class="col-title">{{ t('techWriting.goodTitle') }}</div>
        <pre><code>{{ cases[current].good }}</code></pre>
      </div>
    </div>

    <div class="tips">
      <strong>{{ t('techWriting.tipsTitle') }}</strong>
      <span v-for="(tip, i) in cases[current].tips" :key="i" class="tip-tag">{{ tip }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { engineeringExcellenceLocale } from '../../../locales/engineering-excellence/index.js'

const { t, messages } = useI18n(engineeringExcellenceLocale)
const current = ref(0)
const cases = computed(() => messages.value.techWriting.cases)
</script>

<style scoped>
.tech-writing-demo {
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

.compare { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px; }
@media (max-width: 640px) { .compare { grid-template-columns: 1fr; } }
.col { border-radius: 6px; overflow: hidden; }
.col-title { font-size: 0.72rem; padding: 4px 10px; border-bottom: 1px solid var(--vp-c-divider); }
.col.bad .col-title { background: #fef2f2; color: #991b1b; }
.col.good .col-title { background: #ecfdf5; color: #065f46; }
:root.dark .col.bad .col-title { background: #1c0606; color: #fca5a5; }
:root.dark .col.good .col-title { background: #031c14; color: #6ee7b7; }
.col pre { margin: 0; padding: 8px; font-size: 0.78rem; line-height: 1.5; overflow-x: auto; background: var(--vp-c-bg); }

.tips { font-size: 0.83rem; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.tip-tag { padding: 2px 8px; border-radius: 10px; background: var(--vp-c-brand-soft); font-size: 0.75rem; }
</style>
