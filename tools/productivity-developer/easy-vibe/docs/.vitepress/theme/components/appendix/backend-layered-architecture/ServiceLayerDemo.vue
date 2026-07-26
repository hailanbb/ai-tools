<template>
  <div class="service-demo">
    <div class="header">
      <div class="title">{{ t('service.title') }}</div>
      <div class="subtitle">{{ t('service.subtitle') }}</div>
    </div>

    <div class="tabs">
      <button
        v-for="s in scenarios" :key="s.id"
        :class="['tab', { active: current === s.id }]"
        @click="current = s.id; expanded = []"
      >{{ s.name }}</button>
    </div>

    <div class="flow-box">
      <div class="flow-title">{{ data.title }}</div>
      <div class="flow-desc">{{ data.desc }}</div>

      <div class="steps">
        <div
          v-for="(step, i) in data.steps" :key="i"
          class="step" @click="toggleStep(i)"
        >
          <div class="step-head">
            <span class="step-num">{{ i + 1 }}</span>
            <div class="step-info">
              <div class="step-name">{{ step.name }}</div>
              <div class="step-layer">{{ step.layer }}</div>
            </div>
            <span v-if="step.subs" class="expand">{{ expanded.includes(i) ? '▼' : '▶' }}</span>
          </div>
          <pre v-if="step.code" class="step-code"><code>{{ step.code }}</code></pre>
          <div v-if="step.subs && expanded.includes(i)" class="subs">
            <div v-for="(sub, j) in step.subs" :key="j" class="sub">
              <span class="sub-icon">{{ sub.icon }}</span>
              <div class="sub-info">
                <div class="sub-name">{{ sub.name }}</div>
                <div class="sub-desc">{{ sub.desc }}</div>
              </div>
              <span class="sub-status">{{ sub.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="principles">
      <div class="principles-title">{{ t('service.principlesTitle') }}</div>
      <div class="principle-grid">
        <div v-for="p in principles" :key="p.title" class="principle">
          <div class="p-title">{{ p.title }}</div>
          <div class="p-desc">{{ p.desc }}</div>
          <code class="p-example">{{ p.example }}</code>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { backendLayeredArchitectureLocale } from '../../../locales/backend-layered-architecture/index.js'

const { t, messages } = useI18n(backendLayeredArchitectureLocale)
const current = ref('order')
const expanded = ref([])

const scenarios = computed(() => messages.value.service.scenarios)
const allData = computed(() => messages.value.service.allData)

const data = computed(() => allData.value[current.value])

const toggleStep = (i) => {
  const idx = expanded.value.indexOf(i)
  if (idx > -1) expanded.value.splice(idx, 1)
  else expanded.value.push(i)
}

const principles = computed(() => messages.value.service.principles)
</script>

<style scoped>
.service-demo { padding: 20px; background: var(--vp-c-bg-soft); border-radius: 12px; }
.header { text-align: center; margin-bottom: 20px; }
.title { font-size: 16px; font-weight: 600; color: var(--vp-c-text-1); }
.subtitle { font-size: 13px; color: var(--vp-c-text-3); margin-top: 4px; }

.tabs { display: flex; gap: 8px; margin-bottom: 16px; }
.tab {
  padding: 7px 16px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);
  border-radius: 6px; cursor: pointer; font-size: 13px; color: var(--vp-c-text-2); transition: all .2s;
}
.tab:hover { border-color: #f59e0b; color: #f59e0b; }
.tab.active { background: #f59e0b; border-color: #f59e0b; color: #fff; }

.flow-box {
  padding: 18px; border-radius: 10px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); margin-bottom: 16px;
}
.flow-title { font-size: 15px; font-weight: 600; color: var(--vp-c-text-1); text-align: center; }
.flow-desc { font-size: 12px; color: var(--vp-c-text-3); text-align: center; margin: 4px 0 16px; }

.steps { display: flex; flex-direction: column; gap: 10px; }
.step {
  background: var(--vp-c-bg-soft); border-radius: 6px; border-left: 3px solid #f59e0b;
  cursor: pointer; transition: all .2s; overflow: hidden;
}
.step:hover { transform: translateX(3px); }

.step-head { display: flex; align-items: center; gap: 10px; padding: 10px 14px; }
.step-num {
  width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;
  background: #f59e0b; color: #fff; border-radius: 50%; font-size: 12px; font-weight: 600; flex-shrink: 0;
}
.step-info { flex: 1; }
.step-name { font-weight: 600; font-size: 13px; color: var(--vp-c-text-1); }
.step-layer { font-size: 11px; color: #f59e0b; }
.expand { color: var(--vp-c-text-3); font-size: 11px; }

.step-code {
  margin: 0 14px 14px 48px; padding: 10px; border-radius: 6px; overflow-x: auto;
  background: var(--vp-code-block-bg); font-size: 11px; line-height: 1.5;
}
.step-code code { color: var(--vp-c-text-1); font-family: var(--vp-font-family-mono); }

.subs { padding: 0 14px 14px 48px; }
.sub {
  display: flex; align-items: center; gap: 8px; padding: 8px 10px;
  background: var(--vp-c-bg); border-radius: 6px; margin-bottom: 6px;
  border-left: 2px solid var(--vp-c-green-1);
}
.sub-icon { font-size: 14px; }
.sub-info { flex: 1; }
.sub-name { font-size: 12px; font-weight: 500; color: var(--vp-c-text-1); }
.sub-desc { font-size: 11px; color: var(--vp-c-text-3); }
.sub-status { font-size: 10px; padding: 2px 6px; border-radius: 8px; background: var(--vp-c-green-soft); color: var(--vp-c-green-1); }

.principles {
  padding: 16px; border-radius: 10px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.principles-title { text-align: center; font-weight: 600; font-size: 14px; color: var(--vp-c-text-1); margin-bottom: 12px; }
.principle-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
.principle {
  padding: 12px; background: var(--vp-c-bg-soft); border-radius: 6px;
  border-left: 3px solid #f59e0b;
}
.p-title { font-weight: 600; font-size: 13px; color: var(--vp-c-text-1); margin-bottom: 4px; }
.p-desc { font-size: 11px; color: var(--vp-c-text-2); margin-bottom: 6px; }
.p-example {
  display: block; padding: 6px; border-radius: 4px; overflow-x: auto;
  background: var(--vp-code-block-bg); font-size: 10px; color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
}

@media (max-width: 768px) {
  .principle-grid { grid-template-columns: 1fr; }
  .tabs { flex-wrap: wrap; }
  .step-code { margin-left: 14px; }
}
</style>
