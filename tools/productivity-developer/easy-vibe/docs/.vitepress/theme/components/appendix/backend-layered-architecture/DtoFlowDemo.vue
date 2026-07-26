<template>
  <div class="dto-demo">
    <div class="header">
      <div class="title">{{ t('dto.title') }}</div>
      <div class="subtitle">{{ t('dto.subtitle') }}</div>
    </div>

    <div class="flow-box">
      <div class="flow-step green">
        <div class="step-label">{{ t('dto.controllerLayer') }}</div>
        <pre class="step-code"><code>{{ t('dto.controllerCode') }}</code></pre>
      </div>

      <div class="arrow">{{ t('dto.toService') }}</div>

      <div class="flow-step orange">
        <div class="step-label">{{ t('dto.serviceLayer') }}</div>
        <pre class="step-code"><code>{{ t('dto.serviceCode') }}</code></pre>
      </div>

      <div class="arrow">{{ t('dto.toRepository') }}</div>

      <div class="flow-step blue">
        <div class="step-label">{{ t('dto.repositoryLayer') }}</div>
        <pre class="step-code"><code>{{ t('dto.repositoryCode') }}</code></pre>
      </div>

      <div class="arrow">{{ t('dto.returnEntity') }}</div>

      <div class="flow-step">
        <div class="step-label">{{ t('dto.returnClient') }}</div>
        <pre class="step-code"><code>{{ t('dto.responseCode') }}</code></pre>
      </div>
    </div>

    <div class="table-box">
      <div class="table-title">{{ t('dto.tableTitle') }}</div>
      <table>
        <thead>
          <tr><th v-for="header in headers" :key="header">{{ header }}</th></tr>
        </thead>
        <tbody>
          <tr v-for="r in rows" :key="r.layer">
            <td><span :class="['tag', r.cls]">{{ r.layer }}</span></td>
            <td>{{ r.type }}</td>
            <td>{{ r.purpose }}</td>
            <td><code>{{ r.example }}</code></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { backendLayeredArchitectureLocale } from '../../../locales/backend-layered-architecture/index.js'

const { t, messages } = useI18n(backendLayeredArchitectureLocale)
const headers = computed(() => messages.value.dto.headers)
const rows = computed(() => messages.value.dto.rows)
</script>

<style scoped>
.dto-demo { padding: 20px; background: var(--vp-c-bg-soft); border-radius: 12px; }
.header { text-align: center; margin-bottom: 20px; }
.title { font-size: 16px; font-weight: 600; color: var(--vp-c-text-1); }
.subtitle { font-size: 13px; color: var(--vp-c-text-3); margin-top: 4px; }

.flow-box {
  padding: 18px; border-radius: 10px; margin-bottom: 16px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.flow-step {
  border-radius: 6px; overflow: hidden;
  background: var(--vp-c-bg-soft); border-left: 3px solid var(--vp-c-divider);
}
.flow-step.green { border-left-color: #10b981; }
.flow-step.orange { border-left-color: #f59e0b; }
.flow-step.blue { border-left-color: #3b82f6; }

.step-label {
  padding: 10px 14px; font-weight: 600; font-size: 13px;
  color: var(--vp-c-text-1); border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}
.step-code {
  margin: 0; padding: 12px 14px; overflow-x: auto;
  font-size: 11px; line-height: 1.5;
}
.step-code code { color: var(--vp-c-text-2); font-family: var(--vp-font-family-mono); }
.arrow { text-align: center; padding: 8px; color: var(--vp-c-text-3); font-size: 12px; }

.table-box {
  padding: 16px; border-radius: 10px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.table-title { text-align: center; font-weight: 600; font-size: 14px; color: var(--vp-c-text-1); margin-bottom: 12px; }
table { width: 100%; border-collapse: collapse; font-size: 12px; }
th, td { padding: 10px; text-align: left; border-bottom: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); }
th { background: var(--vp-c-bg-soft); font-weight: 600; color: var(--vp-c-text-1); }
.tag { padding: 2px 8px; border-radius: 10px; font-size: 11px; color: #fff; }
.tag.green { background: #10b981; }
.tag.orange { background: #f59e0b; }
.tag.blue { background: #3b82f6; }
</style>
