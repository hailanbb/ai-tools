<template>
  <div class="cmp">
    <div class="header">
      <div>
        <div class="title">
          {{ t('frameworkComparison.title') }}
        </div>
        <div class="subtitle">
          {{ t('frameworkComparison.subtitle') }}
        </div>
      </div>
      <div class="focus">
        <button
          v-for="f in focuses"
          :key="f.id"
          :class="['chip', { active: focus === f.id }]"
          @click="focus = f.id"
        >
          {{ f.label }}
        </button>
      </div>
    </div>

    <div class="table">
      <div class="row head">
        <div
          v-for="header in headers"
          :key="header"
        >
          {{ header }}
        </div>
      </div>
      <div
        v-for="fw in frameworks"
        :key="fw.name"
        :class="['row', { best: fw.name === best }]"
      >
        <div class="name">
          {{ fw.name }}
        </div>
        <div>{{ fw.learn }}</div>
        <div>{{ fw.control }}</div>
        <div>{{ fw.multi }}</div>
        <div class="use">
          {{ fw.use }}
        </div>
      </div>
    </div>

    <div class="rec">
      <div class="rec-title">
        {{ t('frameworkComparison.recommend', { name: best }) }}
      </div>
      <div class="rec-body">
        {{ reason }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { agentIntroLocale } from '../../../locales/agent-intro/index.js'

const { t, messages } = useI18n(agentIntroLocale)
const focuses = computed(() => messages.value.frameworkComparison.focuses)
const headers = computed(() => messages.value.frameworkComparison.headers)
const frameworks = computed(() => messages.value.frameworkComparison.frameworks)

const focus = ref('control')

const best = computed(() => {
  if (focus.value === 'start') return 'CrewAI'
  if (focus.value === 'team') return 'AutoGen'
  return 'LangChain / LangGraph'
})

const reason = computed(() => {
  return messages.value.frameworkComparison.reasons[focus.value]
})
</script>

<style scoped>
.cmp {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 16px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.title {
  font-weight: 800;
}
.subtitle {
  color: var(--vp-c-text-2);
  font-size: 13px;
}
.focus {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.chip {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  padding: 8px 12px;
  border-radius: 999px;
  cursor: pointer;
}
.chip.active {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.table {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
}
.row {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr 0.8fr 0.9fr 2.1fr;
  gap: 10px;
  padding: 10px 12px;
  border-top: 1px solid var(--vp-c-divider);
  align-items: center;
}
.row.head {
  border-top: none;
  font-weight: 800;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
}
.name {
  font-weight: 800;
}
.use {
  color: var(--vp-c-text-2);
}
.row.best {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: -2px;
  background: rgba(0, 0, 0, 0.02);
}

.rec {
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px;
}
.rec-title {
  font-weight: 800;
  margin-bottom: 6px;
}
.rec-body {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>
