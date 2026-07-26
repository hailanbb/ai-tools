<template>
  <div class="auth-evolution-demo">
    <div class="header">
      <div class="title">
        {{ t('evolution.title') }}
      </div>
      <div class="subtitle">
        {{ t('evolution.subtitle') }}
      </div>
    </div>

    <div class="timeline">
      <button
        v-for="s in stages"
        :key="s.id"
        class="stage"
        :class="{ active: activeId === s.id }"
        @click="activeId = s.id"
      >
        <div class="stage-top">
          <span class="icon">{{ s.icon }}</span>
          <span class="name">{{ s.name }}</span>
        </div>
        <div class="stage-sub">
          {{ s.when }}
        </div>
      </button>
    </div>

    <div class="card">
      <div class="card-title">
        {{ active.icon }} {{ active.name }}
      </div>
      <div class="desc">
        {{ active.desc }}
      </div>

      <div class="grid">
        <div class="box">
          <div class="box-title">
            {{ t('evolution.suitable') }}
          </div>
          <ul class="list">
            <li
              v-for="(x, i) in active.pros"
              :key="i"
            >
              {{ x }}
            </li>
          </ul>
        </div>
        <div class="box">
          <div class="box-title">
            {{ t('evolution.risks') }}
          </div>
          <ul class="list">
            <li
              v-for="(x, i) in active.cons"
              :key="i"
            >
              {{ x }}
            </li>
          </ul>
        </div>
      </div>

      <pre class="code"><code>{{ active.example }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { authDesignLocale } from '../../../locales/auth-design/index.js'

const { t, messages } = useI18n(authDesignLocale)
const stages = computed(() => messages.value.evolution.stages)

const activeId = ref('session')
const active = computed(
  () => stages.value.find((s) => s.id === activeId.value) || stages.value[0]
)
</script>

<style scoped>
.auth-evolution-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 1.5rem;
  margin: 0.5rem 0;
}

.header {
  margin-bottom: 1rem;
}

.title {
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.subtitle {
  margin-top: 0.25rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.timeline {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin: 0.5rem 0;
}

.stage {
  text-align: left;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
}

.stage.active {
  border-color: rgba(var(--vp-c-brand-rgb), 0.35);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.12);
}

.stage-top {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.25rem;
}

.icon {
  font-size: 1.1rem;
}

.name {
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.stage-sub {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  line-height: 1.4;
}

.card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.card-title {
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.desc {
  color: var(--vp-c-text-2);
  line-height: 1.75;
  margin-bottom: 0.75rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.box {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
}

.box-title {
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.list {
  margin: 0;
  padding-left: 1.1rem;
  color: var(--vp-c-text-2);
  line-height: 1.75;
}

.code {
  margin: 0;
  padding: 0.75rem;
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  overflow-x: auto;
  color: var(--vp-c-text-1);
}

@media (max-width: 720px) {
  .timeline {
    grid-template-columns: 1fr;
  }
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
