<template>
  <div class="refactoring-demo">
    <div class="demo-label">{{ t('refactoring.title') }}</div>

    <div class="tabs">
      <button
        v-for="(item, i) in techniques"
        :key="i"
        :class="['tab-btn', { active: activeTab === i }]"
        @click="selectTab(i)"
      >
        {{ item.name }}
      </button>
    </div>

    <div class="desc">{{ current.description }}</div>

    <div class="compare-area">
      <div class="compare-panel before">
        <div class="panel-header">
          <span class="dot red"></span> {{ t('refactoring.before') }}
        </div>
        <pre class="code-block"><template
          v-for="(seg, j) in current.before"
          :key="'b'+j"
        ><span :class="{ highlight: showHighlight && seg.changed }">{{ seg.text }}</span></template></pre>
      </div>

      <div class="arrow-col">
        <span class="arrow-icon">→</span>
      </div>

      <div class="compare-panel after">
        <div class="panel-header">
          <span class="dot green"></span> {{ t('refactoring.after') }}
        </div>
        <pre class="code-block"><template
          v-for="(seg, j) in current.after"
          :key="'a'+j"
        ><span :class="{ highlight: showHighlight && seg.changed }">{{ seg.text }}</span></template></pre>
      </div>
    </div>

    <div class="tip-box">
      <strong>{{ t('refactoring.tip') }}</strong>{{ current.tip }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { engineeringExcellenceLocale } from '../../../locales/engineering-excellence/index.js'

const { t, messages } = useI18n(engineeringExcellenceLocale)
const activeTab = ref(0)
const showHighlight = ref(false)

function selectTab(i) {
  activeTab.value = i
  showHighlight.value = false
  setTimeout(() => { showHighlight.value = true }, 300)
}

setTimeout(() => { showHighlight.value = true }, 500)

const techniques = computed(() => messages.value.refactoring.techniques)
const current = computed(() => techniques.value[activeTab.value])
</script>

<style scoped>
.refactoring-demo {
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
  margin-bottom: 0.75rem;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 0.35rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.82rem;
  transition: all 0.2s;
}

.tab-btn.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

.desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.8rem;
  line-height: 1.5;
}

.compare-area {
  display: flex;
  gap: 0.5rem;
  align-items: stretch;
}

@media (max-width: 640px) {
  .compare-area {
    flex-direction: column;
  }
  .arrow-col {
    transform: rotate(90deg);
  }
}

.compare-panel {
  flex: 1;
  min-width: 0;
}

.panel-header {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.dot.red { background: #ef4444; }
.dot.green { background: #22c55e; }

.code-block {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.8rem;
  font-size: 0.75rem;
  line-height: 1.6;
  overflow-x: auto;
  margin: 0;
  white-space: pre;
  font-family: 'Fira Code', 'Consolas', monospace;
  min-height: 140px;
}

.highlight {
  background: rgba(34, 197, 94, 0.15);
  border-radius: 2px;
  transition: background 0.6s ease;
}

.before .highlight {
  background: rgba(239, 68, 68, 0.12);
}

.arrow-col {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: var(--vp-c-text-3);
  padding: 0 0.2rem;
}

.tip-box {
  margin-top: 0.8rem;
  padding: 0.6rem 0.8rem;
  background: rgba(59, 130, 246, 0.08);
  border-left: 3px solid var(--vp-c-brand-1);
  border-radius: 0 6px 6px 0;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>
