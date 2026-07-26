<template>
  <div class="principle-demo">
    <div class="header">
      <div class="title">{{ t('principles.title') }}</div>
      <div class="subtitle">{{ t('principles.subtitle') }}</div>
    </div>

    <div class="principle-grid">
      <div
        v-for="p in principles"
        :key="p.id"
        :class="['principle-card', { active: selected === p.id }]"
        @click="selected = p.id"
      >
        <div class="p-icon">{{ p.icon }}</div>
        <div class="p-name">{{ p.name }}</div>
        <div class="p-brief">{{ p.brief }}</div>
      </div>
    </div>

    <div v-if="selected" class="detail-panel">
      <div class="detail-header">
        <span>{{ currentPrinciple.icon }} {{ currentPrinciple.name }}</span>
      </div>

      <div class="detail-body">
        <div class="detail-desc">{{ currentPrinciple.detail }}</div>

        <div class="example-section">
          <div class="example-title">{{ t('principles.exampleTitle') }}</div>
          <div class="compare-grid">
            <div class="compare-bad">
              <div class="compare-label bad-label">❌ {{ t('principles.badLabel') }}</div>
              <div class="compare-text">{{ currentPrinciple.bad }}</div>
            </div>
            <div class="compare-good">
              <div class="compare-label good-label">✅ {{ t('principles.goodLabel') }}</div>
              <div class="compare-text">{{ currentPrinciple.good }}</div>
            </div>
          </div>
        </div>

        <div class="checklist">
          <div class="checklist-title">{{ t('principles.checklistTitle') }}</div>
          <div
            v-for="(item, idx) in currentPrinciple.checklist"
            :key="idx"
            :class="['check-item', { checked: checkedItems[selected]?.[idx] }]"
            @click="toggleCheck(idx)"
          >
            <span class="check-box">
              {{ checkedItems[selected]?.[idx] ? '☑' : '☐' }}
            </span>
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { aiNativeAppLocale } from '../../../locales/ai-native-app/index.js'

const { t, messages } = useI18n(aiNativeAppLocale)
const principles = computed(() => messages.value.principles.items)

const selected = ref('graceful')
const checkedItems = reactive({})

const currentPrinciple = computed(() =>
  principles.value.find(p => p.id === selected.value) || principles.value[0]
)

const toggleCheck = (idx) => {
  if (!checkedItems[selected.value]) {
    checkedItems[selected.value] = {}
  }
  checkedItems[selected.value][idx] = !checkedItems[selected.value][idx]
}
</script>

<style scoped>
.principle-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px; padding: 20px; margin: 20px 0;
}
.header { text-align: center; margin-bottom: 16px; }
.title {
  font-size: 17px; font-weight: 700;
  background: linear-gradient(120deg, #ef4444, #f59e0b);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.subtitle { font-size: 12px; color: var(--vp-c-text-2); margin-top: 4px; }

.principle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px; margin-bottom: 16px;
}
.principle-card {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 10px; padding: 14px; cursor: pointer;
  transition: all 0.2s; text-align: center;
}
.principle-card:hover { background: var(--vp-c-bg-alt); }
.principle-card.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}
.p-icon { font-size: 24px; margin-bottom: 6px; }
.p-name { font-weight: 600; font-size: 13px; }
.p-brief { font-size: 11px; color: var(--vp-c-text-2); margin-top: 4px; }

.detail-panel {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 12px; overflow: hidden;
}
.detail-header {
  padding: 14px 16px; font-weight: 700; font-size: 15px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.detail-body { padding: 16px; }
.detail-desc {
  color: var(--vp-c-text-2); font-size: 13px;
  line-height: 1.7; margin-bottom: 16px;
}

.example-section { margin-bottom: 16px; }
.example-title { font-weight: 600; font-size: 13px; margin-bottom: 8px; }
.compare-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
}
.compare-bad, .compare-good {
  padding: 12px; border-radius: 8px; font-size: 13px; line-height: 1.6;
}
.compare-bad { background: #fef2f2; border: 1px solid #fecaca; }
.compare-good { background: #f0fdf4; border: 1px solid #bbf7d0; }
.compare-label {
  font-weight: 600; font-size: 11px; margin-bottom: 6px;
}
.bad-label { color: #dc2626; }
.good-label { color: #16a34a; }
.compare-text { color: var(--vp-c-text-1); }

.checklist-title { font-weight: 600; font-size: 13px; margin-bottom: 8px; }
.check-item {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 10px; border-radius: 6px; font-size: 13px;
  cursor: pointer; transition: background 0.2s;
  border: 1px solid transparent;
}
.check-item:hover { background: var(--vp-c-bg-soft); }
.check-item.checked {
  background: #f0fdf4; border-color: #bbf7d0;
  text-decoration: line-through; color: var(--vp-c-text-3);
}
.check-box { font-size: 16px; flex-shrink: 0; }
</style>
