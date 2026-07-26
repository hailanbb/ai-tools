<template>
  <div class="levels">
    <div class="header">
      <div>
        <div class="title">
          {{ t('levels.title') }}
        </div>
        <div class="subtitle">
          {{ t('levels.subtitle') }}
        </div>
      </div>
      <div class="badge">
        {{ t('levels.current', { name: current.name }) }}
      </div>
    </div>

    <div class="slider">
      <input
        v-model.number="level"
        type="range"
        min="0"
        max="5"
        step="1"
      >
      <div class="ticks">
        <span
          v-for="n in 6"
          :key="n"
        >{{ n - 1 }}</span>
      </div>
    </div>

    <div class="grid">
      <div class="card">
        <div class="k">
          {{ t('levels.can') }}
        </div>
        <ul>
          <li
            v-for="x in current.can"
            :key="x"
          >
            {{ x }}
          </li>
        </ul>
      </div>
      <div class="card">
        <div class="k">
          {{ t('levels.risk') }}
        </div>
        <ul>
          <li
            v-for="x in current.risk"
            :key="x"
          >
            {{ x }}
          </li>
        </ul>
      </div>
      <div class="card">
        <div class="k">
          {{ t('levels.example') }}
        </div>
        <div class="v">
          {{ current.example }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { agentIntroLocale } from '../../../locales/agent-intro/index.js'

const { t, messages } = useI18n(agentIntroLocale)
const level = ref(2)
const levels = computed(() => messages.value.levels.levels)

const current = computed(() => levels.value[level.value])
</script>

<style scoped>
.levels {
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
.badge {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 8px 12px;
  font-weight: 800;
}

.slider {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 10px 12px;
}
input[type='range'] {
  width: 100%;
}
.ticks {
  display: flex;
  justify-content: space-between;
  color: var(--vp-c-text-2);
  font-size: 12px;
  margin-top: 6px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}
.card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px;
}
.k {
  font-weight: 800;
  margin-bottom: 6px;
}
.v {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
ul {
  margin: 0;
  padding-left: 18px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>
