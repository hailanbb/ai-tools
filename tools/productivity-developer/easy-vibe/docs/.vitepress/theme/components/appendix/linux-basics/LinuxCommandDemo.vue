<template>
  <div class="linux-cmd-demo">
    <div class="header">
      <div class="title">{{ t('commands.title') }}</div>
      <div class="subtitle">{{ t('commands.subtitle') }}</div>
    </div>

    <div class="categories">
      <button
        v-for="cat in categories"
        :key="cat.key"
        :class="['cat-btn', { active: activeCat === cat.key }]"
        @click="activeCat = cat.key"
      >
        {{ cat.label }}
      </button>
    </div>

    <div v-if="current" class="cmd-list">
      <div v-for="(cmd, i) in current.commands" :key="i" class="cmd-card">
        <div class="cmd-header">
          <code class="cmd-name">{{ cmd.name }}</code>
          <span class="cmd-brief">{{ cmd.brief }}</span>
        </div>
        <div class="cmd-example">
          <code>{{ cmd.example }}</code>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { linuxBasicsLocale } from '../../../locales/linux-basics/index.js'

const { t, messages } = useI18n(linuxBasicsLocale)

const activeCat = ref('file')

const categories = computed(() => messages.value.commands.categories)
const current = computed(() => categories.value.find(c => c.key === activeCat.value))
</script>

<style scoped>
.linux-cmd-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}
.cat-btn {
  padding: 0.35rem 0.7rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}
.cat-btn:hover { border-color: var(--vp-c-brand); }
.cat-btn.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}
.cmd-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.cmd-card {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.5rem 0.7rem;
  border: 1px solid var(--vp-c-divider);
}
.cmd-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}
.cmd-name {
  font-weight: 700;
  font-size: 0.82rem;
  color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.08);
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
}
.cmd-brief {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}
.cmd-example code {
  font-size: 0.73rem;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
}
</style>
