<template>
  <div class="strong-vs-weak-demo">
    <h4>{{ t('typeSystems.strongWeak.title') }}</h4>
    <p class="desc">{{ t('typeSystems.strongWeak.desc') }}</p>

    <div class="expr-selector">
      <button
        v-for="(ex, i) in expressions"
        :key="i"
        :class="['expr-btn', { active: selected === i }]"
        @click="selected = i"
      >
        <code>{{ ex.expr }}</code>
      </button>
    </div>

    <div class="results-grid">
      <div v-for="lang in expressions[selected].langs" :key="lang.name" class="lang-card">
        <div class="lang-header">
          <span class="lang-name">{{ lang.name }}</span>
          <span :class="['lang-type', lang.strong ? 'strong' : 'weak']">
            {{ lang.strong ? t('typeSystems.strongWeak.strong') : t('typeSystems.strongWeak.weak') }}
          </span>
        </div>
        <pre class="lang-code">{{ lang.code }}</pre>
        <div :class="['lang-result', lang.error ? 'error' : 'success']">
          {{ lang.result }}
        </div>
      </div>
    </div>

    <div class="takeaway">
      📌 {{ expressions[selected].takeaway }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals'

const { t, messages } = useI18n(computerFundamentalsLocale)
const selected = ref(0)

const expressions = computed(() => messages.value.typeSystems.strongWeak.expressions)
</script>

<style scoped>
.strong-vs-weak-demo {
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}
h4 { margin: 0 0 4px; }
.desc { color: var(--vp-c-text-2); font-size: 14px; margin: 0 0 16px; }
.expr-selector { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
.expr-btn {
  padding: 6px 14px; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 13px; transition: all 0.2s;
}
.expr-btn.active { background: var(--vp-c-brand-1); color: #fff; border-color: var(--vp-c-brand-1); }
.expr-btn code { font-size: 13px; }
.results-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
.lang-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg); overflow: hidden; }
.lang-header { display: flex; justify-content: space-between; align-items: center; padding: 6px 10px; background: var(--vp-c-bg-soft); border-bottom: 1px solid var(--vp-c-divider); }
.lang-name { font-weight: 600; font-size: 13px; }
.lang-type { font-size: 11px; padding: 2px 6px; border-radius: 4px; }
.lang-type.strong { background: #dbeafe; color: #1e40af; }
.lang-type.weak { background: #fef3c7; color: #92400e; }
.lang-code { padding: 8px 10px; margin: 0; font-size: 12px; }
.lang-result { padding: 6px 10px; font-size: 12px; border-top: 1px solid var(--vp-c-divider); }
.lang-result.success { background: #f0fdf4; color: #166534; }
.lang-result.error { background: #fef2f2; color: #991b1b; }
.takeaway { margin-top: 12px; padding: 10px 14px; background: var(--vp-c-brand-soft); border-radius: 8px; font-size: 13px; }
@media (max-width: 640px) { .results-grid { grid-template-columns: 1fr; } }
</style>
