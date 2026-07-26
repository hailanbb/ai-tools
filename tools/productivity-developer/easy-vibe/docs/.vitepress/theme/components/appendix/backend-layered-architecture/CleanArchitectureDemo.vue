<template>
  <div class="clean-arch-demo">
    <div class="header">
      <div class="title">{{ t('clean.title') }}</div>
      <div class="subtitle">{{ t('clean.subtitle') }}</div>
    </div>

    <div class="tabs">
      <button
        v-for="tab in tabs" :key="tab.id"
        :class="['tab', { active: current === tab.id }]"
        @click="current = tab.id"
      >{{ tab.name }}</button>
    </div>

    <div v-if="current === 'layered'" class="panel">
      <div class="arch-layers">
        <div v-for="l in layeredLayers" :key="l.name" :class="['arch-layer', l.cls]">
          <strong>{{ l.name }}</strong> <span>{{ l.desc }}</span>
        </div>
      </div>
      <div class="traits">
        <strong>{{ t('clean.layeredTitle') }}</strong>
        <ul>
          <li v-for="item in layeredTraits" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>

    <div v-else-if="current === 'clean'" class="panel">
      <div class="clean-layers">
        <div v-for="l in cleanLayers" :key="l.name" :class="['arch-layer', l.cls]">
          <strong>{{ l.name }}</strong> <span>{{ l.items }}</span>
        </div>
      </div>
      <div class="dep-rule">{{ t('clean.depRule') }}</div>
      <div class="traits">
        <strong>{{ t('clean.cleanTitle') }}</strong>
        <ul>
          <li v-for="item in cleanTraits" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>

    <div v-else class="panel">
      <table>
        <thead><tr><th v-for="header in headers" :key="header">{{ header }}</th></tr></thead>
        <tbody>
          <tr v-for="r in compareRows" :key="r.feature">
            <td>{{ r.feature }}</td><td>{{ r.layered }}</td><td>{{ r.clean }}</td>
          </tr>
        </tbody>
      </table>
      <div class="rec-grid">
        <div class="rec-card">
          <strong>{{ t('clean.layeredChoice') }}</strong>
          <ul>
            <li v-for="item in layeredChoiceItems" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div class="rec-card recommended">
          <strong>{{ t('clean.cleanChoice') }}</strong>
          <ul>
            <li v-for="item in cleanChoiceItems" :key="item">{{ item }}</li>
          </ul>
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
const current = ref('layered')
const tabs = computed(() => messages.value.clean.tabs)
const layeredLayers = computed(() => messages.value.clean.layeredLayers)
const cleanLayers = computed(() => messages.value.clean.cleanLayers)
const layeredTraits = computed(() => messages.value.clean.layeredTraits)
const cleanTraits = computed(() => messages.value.clean.cleanTraits)
const headers = computed(() => messages.value.clean.headers)
const compareRows = computed(() => messages.value.clean.compareRows)
const layeredChoiceItems = computed(() => messages.value.clean.layeredChoiceItems)
const cleanChoiceItems = computed(() => messages.value.clean.cleanChoiceItems)
</script>

<style scoped>
.clean-arch-demo { padding: 20px; background: var(--vp-c-bg-soft); border-radius: 12px; }
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

.panel {
  padding: 18px; border-radius: 10px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}

.arch-layers, .clean-layers { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
.arch-layer {
  padding: 12px 14px; border-radius: 6px;
  background: var(--vp-c-bg-soft); border-left: 3px solid var(--vp-c-divider);
  font-size: 13px; color: var(--vp-c-text-2);
}
.arch-layer strong { color: var(--vp-c-text-1); margin-right: 8px; }
.arch-layer.green { border-left-color: #10b981; }
.arch-layer.orange { border-left-color: #f59e0b; }
.arch-layer.blue { border-left-color: #3b82f6; }
.arch-layer.teal { border-left-color: #14b8a6; }
.arch-layer.gray { border-left-color: #6b7280; }

.dep-rule {
  text-align: center; padding: 10px; margin-bottom: 16px; border-radius: 6px;
  border: 2px dashed var(--vp-c-brand-1); font-size: 13px; color: var(--vp-c-brand-1); font-weight: 500;
}

.traits { padding: 14px; border-radius: 6px; background: var(--vp-c-bg-soft); font-size: 13px; }
.traits strong { color: var(--vp-c-text-1); }
.traits ul { margin: 8px 0 0; padding-left: 18px; }
.traits li { margin: 4px 0; color: var(--vp-c-text-2); line-height: 1.5; }

table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 16px; }
th, td { padding: 10px; text-align: left; border-bottom: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); }
th { background: var(--vp-c-bg-soft); font-weight: 600; color: var(--vp-c-text-1); }

.rec-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.rec-card { padding: 14px; border-radius: 6px; background: var(--vp-c-bg-soft); font-size: 12px; }
.rec-card strong { font-size: 13px; color: var(--vp-c-text-1); display: block; margin-bottom: 8px; }
.rec-card ul { margin: 0; padding-left: 16px; }
.rec-card li { margin: 4px 0; color: var(--vp-c-text-2); }
.rec-card.recommended { border: 2px solid var(--vp-c-green-1); background: var(--vp-c-green-soft); }

@media (max-width: 768px) {
  .rec-grid { grid-template-columns: 1fr; }
}
</style>
