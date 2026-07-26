<template>
  <div class="auth-basics-demo">
    <div class="header">
      <div class="title">
        {{ t('basics.title') }}
      </div>
      <div class="subtitle">
        {{ t('basics.subtitle') }}
      </div>
    </div>

    <div class="tabs">
      <button
        v-for="m in methods"
        :key="m.id"
        class="tab"
        :class="{ active: current === m.id }"
        @click="current = m.id"
      >
        {{ m.name }}
        <span class="tag">{{ m.bestFor }}</span>
      </button>
    </div>

    <div class="grid">
      <div class="card">
        <div class="card-title">
          {{ t('basics.requestShape') }}
        </div>
        <pre class="code"><code>{{ active.example }}</code></pre>
        <div class="hint">
          {{ active.note }}
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          {{ t('basics.usageTitle') }}
        </div>
        <div class="two">
          <div class="box">
            <div class="box-title">
              {{ t('basics.suitable') }}
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
              {{ t('basics.risk') }}
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
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        {{ t('basics.mantraTitle') }}
      </div>
      <div class="desc">
        {{ t('basics.mantra') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { authDesignLocale } from '../../../locales/auth-design/index.js'

const { t, messages } = useI18n(authDesignLocale)
const methods = computed(() => messages.value.basics.methods)

const current = ref('basic')
const active = computed(
  () => methods.value.find((m) => m.id === current.value) || methods.value[0]
)
</script>

<style scoped>
.auth-basics-demo {
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

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tab {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-weight: 700;
  font-size: 0.875rem;
}

.tab.active {
  border-color: rgba(var(--vp-c-brand-rgb), 0.35);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.12);
}

.tag {
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.card-title {
  font-weight: 800;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
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

.hint {
  margin-top: 0.75rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.7;
}

.two {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
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

.desc {
  color: var(--vp-c-text-2);
  line-height: 1.75;
}

@media (max-width: 720px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .two {
    grid-template-columns: 1fr;
  }
}
</style>
