<template>
  <div class="cap-demo">
    <div class="header">
      <div class="title">{{ t('cap.title') }}</div>
      <div class="subtitle">{{ t('cap.subtitle') }}</div>
    </div>

    <div class="triangle">
      <div
        v-for="item in capItems"
        :key="item.key"
        :class="['cap-node', { active: selected.includes(item.key) }]"
        @click="toggle(item.key)"
      >
        <div class="cap-letter">{{ item.letter }}</div>
        <div class="cap-name">{{ item.name }}</div>
        <div class="cap-desc">{{ item.desc }}</div>
      </div>
    </div>

    <div v-if="result" class="result-panel">
      <div class="result-title">{{ result.type }}</div>
      <div class="result-desc">{{ result.desc }}</div>
      <div class="result-examples">
        <span class="label">{{ t('cap.examplesLabel') }}</span>{{ result.examples }}
      </div>
      <div class="result-tradeoff">
        <span class="label">{{ t('cap.sacrificeLabel') }}</span>{{ result.sacrifice }}
      </div>
    </div>

    <div v-else class="hint">{{ t('cap.hint') }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { distributedSystemsLocale } from '../../../locales/distributed-systems/index.js'

const { t, messages } = useI18n(distributedSystemsLocale)

const selected = ref(['C', 'A'])

const capItems = computed(() => messages.value.cap.items)
const combinations = computed(() => messages.value.cap.combinations)

function toggle(key) {
  const idx = selected.value.indexOf(key)
  if (idx >= 0) {
    selected.value = selected.value.filter(k => k !== key)
  } else {
    if (selected.value.length >= 2) {
      selected.value = [selected.value[1], key]
    } else {
      selected.value = [...selected.value, key]
    }
  }
}

const result = computed(() => {
  if (selected.value.length !== 2) return null
  const combo = ['C', 'A', 'P'].filter(key => selected.value.includes(key)).join('')
  return combinations.value[combo] || null
})
</script>

<style scoped>
.cap-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.triangle { display: flex; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap; justify-content: center; }
.cap-node {
  flex: 1; min-width: 120px; max-width: 200px; padding: 0.75rem; border-radius: 8px;
  cursor: pointer; text-align: center; background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider); transition: all 0.2s;
}
.cap-node:hover { border-color: var(--vp-c-brand); }
.cap-node.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.08); }
.cap-letter { font-size: 1.5rem; font-weight: 800; color: var(--vp-c-brand); }
.cap-name { font-weight: 700; font-size: 0.9rem; margin: 0.2rem 0; }
.cap-desc { font-size: 0.75rem; color: var(--vp-c-text-2); }
.result-panel {
  background: var(--vp-c-bg); border-radius: 8px; padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}
.result-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem; }
.result-desc { font-size: 0.82rem; color: var(--vp-c-text-2); margin-bottom: 0.5rem; }
.result-examples, .result-tradeoff { font-size: 0.82rem; margin-bottom: 0.25rem; }
.label { font-weight: 600; color: var(--vp-c-text-2); }
.hint { text-align: center; color: var(--vp-c-text-3); font-size: 0.85rem; padding: 1rem; }
</style>
