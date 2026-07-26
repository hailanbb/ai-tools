<template>
  <div class="repo-demo">
    <div class="header">
      <div class="title">{{ t('repository.title') }}</div>
      <div class="subtitle">{{ t('repository.subtitle') }}</div>
    </div>

    <div class="toggle-group">
      <button :class="['toggle', { active: view === 'bad' }]" @click="view = 'bad'">{{ t('repository.bad') }}</button>
      <button :class="['toggle', { active: view === 'good' }]" @click="view = 'good'">{{ t('repository.good') }}</button>
    </div>

    <div :class="['panel', view]">
      <div class="panel-head">
        <span class="panel-title">{{ view === 'bad' ? t('repository.badPanel') : t('repository.goodPanel') }}</span>
        <span class="panel-badge">{{ view === 'bad' ? t('repository.badBadge') : t('repository.goodBadge') }}</span>
      </div>

      <pre class="code-block"><code>{{ view === 'bad' ? badCode : goodCode }}</code></pre>

      <div :class="['result-box', view]">
        <strong>{{ view === 'bad' ? t('repository.badTitle') : t('repository.goodTitle') }}</strong>
        <ul>
          <li v-for="item in (view === 'bad' ? problems : benefits)" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>

    <div class="compare-table">
      <div class="table-title">{{ t('repository.tableTitle') }}</div>
      <table>
        <thead>
          <tr><th v-for="header in headers" :key="header">{{ header }}</th></tr>
        </thead>
        <tbody>
          <tr v-for="r in repos" :key="r.name">
            <td><strong>{{ r.name }}</strong><br><span class="tag" :class="r.tagClass">{{ r.tag }}</span></td>
            <td>{{ r.pros }}</td>
            <td>{{ r.cons }}</td>
            <td>{{ r.scene }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { backendLayeredArchitectureLocale } from '../../../locales/backend-layered-architecture/index.js'

const { t, messages } = useI18n(backendLayeredArchitectureLocale)
const view = ref('good')

const badCode = computed(() => messages.value.repository.badCode)
const goodCode = computed(() => messages.value.repository.goodCode)
const problems = computed(() => messages.value.repository.problems)
const benefits = computed(() => messages.value.repository.benefits)
const headers = computed(() => messages.value.repository.headers)
const repos = computed(() => messages.value.repository.repos)
</script>

<style scoped>
.repo-demo { padding: 20px; background: var(--vp-c-bg-soft); border-radius: 12px; }
.header { text-align: center; margin-bottom: 20px; }
.title { font-size: 16px; font-weight: 600; color: var(--vp-c-text-1); }
.subtitle { font-size: 13px; color: var(--vp-c-text-3); margin-top: 4px; }

.toggle-group { display: flex; gap: 8px; justify-content: center; margin-bottom: 16px; }
.toggle {
  padding: 8px 18px; border: 2px solid var(--vp-c-divider); background: var(--vp-c-bg);
  border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 500;
  color: var(--vp-c-text-2); transition: all .2s;
}
.toggle:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.toggle.active { background: var(--vp-c-brand-1); border-color: var(--vp-c-brand-1); color: #fff; }

.panel {
  padding: 18px; border-radius: 10px; margin-bottom: 16px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.panel.bad { border-left: 3px solid var(--vp-c-danger-1); }
.panel.good { border-left: 3px solid var(--vp-c-green-1); }

.panel-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid var(--vp-c-divider); }
.panel-title { font-weight: 600; font-size: 14px; color: var(--vp-c-text-1); }
.panel-badge { padding: 3px 10px; border-radius: 10px; font-size: 11px; color: #fff; }
.panel.bad .panel-badge { background: var(--vp-c-danger-1); }
.panel.good .panel-badge { background: var(--vp-c-green-1); }

.code-block {
  margin: 0 0 14px; padding: 14px; border-radius: 6px; overflow-x: auto;
  background: var(--vp-code-block-bg); font-size: 11px; line-height: 1.6;
}
.code-block code { color: var(--vp-c-text-1); font-family: var(--vp-font-family-mono); }

.result-box { padding: 12px; border-radius: 6px; font-size: 12px; line-height: 1.6; }
.result-box.bad { background: var(--vp-c-danger-soft); border-left: 3px solid var(--vp-c-danger-1); }
.result-box.good { background: var(--vp-c-green-soft); border-left: 3px solid var(--vp-c-green-1); }
.result-box strong { font-size: 13px; color: var(--vp-c-text-1); }
.result-box ul { margin: 6px 0 0; padding-left: 18px; }
.result-box li { margin: 4px 0; color: var(--vp-c-text-2); }

.compare-table {
  padding: 16px; border-radius: 10px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.table-title { text-align: center; font-weight: 600; font-size: 14px; color: var(--vp-c-text-1); margin-bottom: 12px; }
table { width: 100%; border-collapse: collapse; font-size: 12px; }
th, td { padding: 10px; text-align: left; border-bottom: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); }
th { background: var(--vp-c-bg-soft); font-weight: 600; color: var(--vp-c-text-1); }
.tag { display: inline-block; padding: 1px 6px; border-radius: 4px; font-size: 10px; color: #fff; background: #f59e0b; margin-top: 4px; }
.tag.blue { background: #3b82f6; }
.tag.green { background: #10b981; }

@media (max-width: 768px) {
  .toggle-group { flex-direction: column; }
  .toggle { width: 100%; }
}
</style>
