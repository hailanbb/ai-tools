<template>
  <div class="future">
    <div class="header">
      <div>
        <div class="title">
          {{ t('future.title') }}
        </div>
        <div class="subtitle">
          {{ t('future.subtitle') }}
        </div>
      </div>
    </div>

    <div class="chips">
      <button
        v-for="trend in trends"
        :key="trend.id"
        :class="['chip', { active: current.id === trend.id }]"
        @click="current = trend"
      >
        {{ trend.label }}
      </button>
    </div>

    <div class="panel">
      <div class="p-title">
        {{ current.label }}
      </div>
      <div class="p-body">
        {{ current.desc }}
      </div>
      <div class="grid">
        <div class="card">
          <div class="k">
            {{ t('future.impact') }}
          </div>
          <div class="v">
            {{ current.impact }}
          </div>
        </div>
        <div class="card">
          <div class="k">
            {{ t('future.prepare') }}
          </div>
          <div class="v">
            {{ current.prepare }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { agentIntroLocale } from '../../../locales/agent-intro/index.js'

const { t, messages } = useI18n(agentIntroLocale)
const trends = computed(() => messages.value.future.trends)

const current = ref(trends.value[0])

watch(trends, (next) => {
  current.value = next.find((item) => item.id === current.value?.id) || next[0]
})
</script>

<style scoped>
.future {
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

.chips {
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

.panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px;
}
.p-title {
  font-weight: 900;
  margin-bottom: 6px;
}
.p-body {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 10px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 10px;
}
.card {
  background: var(--vp-c-bg-soft);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
  padding: 10px;
}
.k {
  font-weight: 900;
  margin-bottom: 4px;
}
.v {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>
