<template>
  <div class="checklist-demo">
    <div class="header">
      <div class="title">{{ t('securityChecklist.title') }}</div>
      <div class="subtitle">{{ t('securityChecklist.subtitle') }}</div>
    </div>

    <div class="score-bar">
      <div class="score-label">{{ t('securityChecklist.scoreLabel') }}</div>
      <div class="score-track">
        <div
          class="score-fill"
          :style="{ width: score + '%', background: scoreColor }"
        />
      </div>
      <div class="score-value" :style="{ color: scoreColor }">
        {{ t('securityChecklist.scoreValue', { score }) }}
      </div>
      <div class="score-level" :style="{ color: scoreColor }">
        {{ scoreLevel }}
      </div>
    </div>

    <div v-for="(cat, ci) in categories" :key="ci" class="category">
      <div class="cat-header" @click="cat.open = !cat.open">
        <span class="cat-icon">{{ cat.icon }}</span>
        <span class="cat-name">{{ cat.name }}</span>
        <span class="cat-progress">
          {{ checkedCount(ci) }}/{{ cat.items.length }}
        </span>
        <span class="cat-arrow">{{ cat.open ? '▾' : '▸' }}</span>
      </div>
      <div v-if="cat.open" class="cat-items">
        <div
          v-for="(item, ii) in cat.items"
          :key="ii"
          class="check-item"
        >
          <div class="item-row" @click="item.checked = !item.checked">
            <input v-model="item.checked" type="checkbox" @click.stop />
            <span :class="['item-text', { done: item.checked }]">
              {{ item.label }}
            </span>
          </div>
          <div
            v-if="item.showDetail"
            class="item-detail"
          >
            {{ item.detail }}
          </div>
          <button
            class="detail-toggle"
            @click="item.showDetail = !item.showDetail"
          >
            {{ item.showDetail ? t('securityChecklist.collapse') : t('securityChecklist.detail') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { engineeringExcellenceLocale } from '../../../locales/engineering-excellence/index.js'

const { t, messages } = useI18n(engineeringExcellenceLocale)
const categories = reactive(JSON.parse(JSON.stringify(messages.value.securityChecklist.categories)))

const totalItems = computed(() =>
  categories.reduce((sum, c) => sum + c.items.length, 0)
)

const totalChecked = computed(() =>
  categories.reduce(
    (sum, c) => sum + c.items.filter((i) => i.checked).length,
    0
  )
)

const score = computed(() =>
  Math.round((totalChecked.value / totalItems.value) * 100)
)

const scoreColor = computed(() => {
  if (score.value >= 80) return '#27ae60'
  if (score.value >= 50) return '#f39c12'
  return '#e74c3c'
})

const scoreLevel = computed(() => {
  if (score.value >= 80) return t('securityChecklist.levels.excellent')
  if (score.value >= 50) return t('securityChecklist.levels.pass')
  return t('securityChecklist.levels.danger')
})

const checkedCount = (ci) =>
  categories[ci].items.filter((i) => i.checked).length
</script>

<style scoped>
.checklist-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 1.5rem;
  margin: 0.5rem 0;
}

.header { margin-bottom: 1rem; }

.title {
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.subtitle {
  margin-top: 0.25rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.score-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.score-label {
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.score-track {
  flex: 1;
  height: 8px;
  background: var(--vp-c-divider);
  border-radius: 4px;
  overflow: hidden;
}

.score-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.4s, background 0.4s;
}

.score-value {
  font-weight: 800;
  font-size: 1.1rem;
  white-space: nowrap;
}

.score-level {
  font-weight: 700;
  font-size: 0.85rem;
  white-space: nowrap;
}

.category {
  margin-bottom: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.cat-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.75rem;
  background: var(--vp-c-bg);
  cursor: pointer;
  user-select: none;
}

.cat-icon { font-size: 1rem; }

.cat-name {
  font-weight: 700;
  color: var(--vp-c-text-1);
  flex: 1;
}

.cat-progress {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.cat-arrow {
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
}

.cat-items {
  border-top: 1px solid var(--vp-c-divider);
}

.check-item {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.check-item:last-child {
  border-bottom: none;
}

.item-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.item-text {
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.item-text.done {
  text-decoration: line-through;
  color: var(--vp-c-text-3);
}

.item-detail {
  margin-top: 0.4rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  line-height: 1.7;
}

.detail-toggle {
  margin-top: 0.3rem;
  background: none;
  border: none;
  color: var(--vp-c-brand);
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0;
}

@media (max-width: 720px) {
  .score-bar { flex-wrap: wrap; }
}
</style>
