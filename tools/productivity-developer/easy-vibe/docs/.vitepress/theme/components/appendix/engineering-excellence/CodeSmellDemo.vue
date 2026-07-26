<template>
  <div class="code-smell-demo">
    <div class="demo-label">{{ t('codeSmell.title') }}</div>

    <div class="tabs">
      <button
        v-for="(item, i) in smells"
        :key="i"
        class="tab"
        :class="{ active: current === i }"
        @click="current = i"
      >
        {{ item.icon }} {{ item.name }}
      </button>
    </div>

    <div class="content">
      <div class="code-panel">
        <div class="panel-title">{{ t('codeSmell.problemCode') }}</div>
        <pre><code>{{ smells[current].bad }}</code></pre>
      </div>
      <div class="info-panel" :class="smells[current].cls">
        <h4>{{ smells[current].icon }} {{ smells[current].name }}</h4>
        <p class="desc">{{ smells[current].desc }}</p>
        <div class="suggestion">
          <strong>{{ t('codeSmell.suggestion') }}</strong>{{ smells[current].fix }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { engineeringExcellenceLocale } from '../../../locales/engineering-excellence/index.js'

const current = ref(0)
const { t, messages } = useI18n(engineeringExcellenceLocale)
const smells = computed(() => messages.value.codeSmell.smells)
</script>

<style scoped>
.code-smell-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
  text-align: center;
}

.tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.tab {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.82rem;
  transition: all 0.2s;
}

.tab.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

@media (max-width: 640px) {
  .content {
    grid-template-columns: 1fr;
  }
}

.code-panel {
  background: var(--vp-c-bg);
  border-radius: 6px;
  overflow: hidden;
}

.panel-title {
  font-size: 0.72rem;
  padding: 4px 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-3);
  border-bottom: 1px solid var(--vp-c-divider);
}

.code-panel pre {
  margin: 0;
  padding: 10px;
  font-size: 0.8rem;
  line-height: 1.5;
  overflow-x: auto;
}

.info-panel {
  padding: 1rem;
  border-radius: 6px;
}

.info-panel.red { background: #fef2f2; border: 1px solid #fecaca; }
.info-panel.orange { background: #fff7ed; border: 1px solid #fed7aa; }
.info-panel.yellow { background: #fefce8; border: 1px solid #fde68a; }
.info-panel.purple { background: #faf5ff; border: 1px solid #e9d5ff; }

:root.dark .info-panel.red { background: #1c0606; border-color: #7f1d1d; }
:root.dark .info-panel.orange { background: #1c0f03; border-color: #9a3412; }
:root.dark .info-panel.yellow { background: #1c1a03; border-color: #854d0e; }
:root.dark .info-panel.purple { background: #1a0a2e; border-color: #6b21a8; }

.info-panel h4 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
}

.desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.6rem;
}

.suggestion {
  font-size: 0.83rem;
  padding: 8px;
  background: var(--vp-c-bg);
  border-radius: 4px;
}
</style>
