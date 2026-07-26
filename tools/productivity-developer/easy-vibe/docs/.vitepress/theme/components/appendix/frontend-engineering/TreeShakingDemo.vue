<template>
  <div class="tree-shaking-demo">
    <div class="demo-header">
      <h3>🌳 {{ t('treeShaking.title') }}</h3>
      <p>{{ t('treeShaking.subtitle') }}</p>
    </div>

    <div class="demo-content">
      <!-- source code panel -->
      <div class="source-panel">
        <div class="panel-title">
          📦 {{ t('treeShaking.sourceLabel') }}
        </div>
        <div class="code-block">
          <div
            v-for="(func, index) in functions"
            :key="index"
            class="code-line"
            :class="{ used: func.used, unused: !func.used && hasSelection }"
          >
            <span class="line-number">{{ index + 1 }}</span>
            <span class="line-content">{{ func.code }}</span>
          </div>
        </div>
      </div>

      <!-- control panel -->
      <div class="control-panel">
        <div class="panel-title">
          🎛️ {{ t('treeShaking.controlLabel') }}
        </div>
        <div class="function-toggles">
          <label
            v-for="(func, index) in functions"
            :key="index"
            class="toggle-item"
            :class="{ active: func.used }"
          >
            <input
              v-model="func.used"
              type="checkbox"
            >
            <span class="toggle-name">{{ func.name }}</span>
            <span class="toggle-size">{{ func.size }}B</span>
          </label>
        </div>

        <div class="stats-box">
          <div class="stat-item">
            <span class="stat-label">{{ t('treeShaking.originalSize') }}</span>
            <span class="stat-value original">{{ originalSize }}B</span>
          </div>
          <div class="stat-arrow">
            →
          </div>
          <div class="stat-item">
            <span class="stat-label">{{ t('treeShaking.afterShaking') }}</span>
            <span class="stat-value optimized">{{ optimizedSize }}B</span>
          </div>
          <div class="stat-item savings">
            <span class="stat-label">{{ t('treeShaking.savings') }}</span>
            <span class="stat-value">{{ savingsPercent }}%</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <p>
        <span class="icon">💡</span>
        <strong>{{ t('treeShaking.infoBoxTitle') }}</strong>
        {{ t('treeShaking.infoBoxContent') }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { frontendEngineeringLocale } from '../../../locales/frontend-engineering/index.js'

const { t } = useI18n(frontendEngineeringLocale)

const functions = ref([
  {
    name: 'debounce',
    code: 'export function debounce(fn, delay) { ... }',
    size: 156,
    used: true
  },
  {
    name: 'throttle',
    code: 'export function throttle(fn, limit) { ... }',
    size: 142,
    used: false
  },
  {
    name: 'deepClone',
    code: 'export function deepClone(obj) { ... }',
    size: 234,
    used: true
  },
  {
    name: 'formatDate',
    code: 'export function formatDate(date, fmt) { ... }',
    size: 189,
    used: false
  },
  {
    name: 'randomString',
    code: 'export function randomString(len) { ... }',
    size: 98,
    used: false
  }
])

const originalSize = computed(() =>
  functions.value.reduce((sum, f) => sum + f.size, 0)
)

const optimizedSize = computed(() =>
  functions.value.filter(f => f.used).reduce((sum, f) => sum + f.size, 0)
)

const savingsPercent = computed(() => {
  const saved = originalSize.value - optimizedSize.value
  return Math.round((saved / originalSize.value) * 100)
})

const hasSelection = computed(() =>
  functions.value.some(f => f.used)
)
</script>

<style scoped>
.tree-shaking-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  font-family: var(--vp-font-family-mono);
}

.demo-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.demo-header p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.demo-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 0.5rem 0;
}

@media (max-width: 768px) {
  .demo-content {
    grid-template-columns: 1fr;
  }
}

.source-panel,
.control-panel {
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

.panel-title {
  background: var(--vp-c-bg-soft);
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-bottom: 1px solid var(--vp-c-divider);
}

.code-block {
  padding: 0.75rem;
  font-size: 0.75rem;
  line-height: 1.6;
}

.code-line {
  display: flex;
  gap: 0.5rem;
  padding: 0.1rem 0;
  border-radius: 3px;
  transition: all 0.2s;
}

.code-line:hover {
  background: var(--vp-c-bg-soft);
}

.code-line.used {
  background: rgba(34, 197, 94, 0.1);
}

.code-line.unused {
  opacity: 0.4;
  text-decoration: line-through;
}

.line-number {
  color: var(--vp-c-text-3);
  min-width: 20px;
  text-align: right;
  user-select: none;
}

.line-content {
  color: var(--vp-c-text-1);
  white-space: pre;
}

.function-toggles {
  padding: 0.75rem;
}

.toggle-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 0.25rem;
}

.toggle-item:hover {
  background: var(--vp-c-bg-soft);
}

.toggle-item.active {
  background: rgba(34, 197, 94, 0.1);
}

.toggle-item input {
  cursor: pointer;
}

.toggle-name {
  flex: 1;
  font-size: 0.85rem;
}

.toggle-size {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  font-family: monospace;
}

.stats-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  margin: 0 0.75rem 0.75rem;
  border-radius: 6px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.stat-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
}

.stat-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.stat-value.original {
  color: var(--vp-c-text-2);
  text-decoration: line-through;
}

.stat-value.optimized {
  color: #22c55e;
}

.stat-item.savings .stat-value {
  color: var(--vp-c-brand);
}

.info-box {
  background-color: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.5rem;
}
</style>
