<template>
  <div class="linux-fs-demo">
    <div class="header">
      <div class="title">{{ t('fileSystem.title') }}</div>
      <div class="subtitle">{{ t('fileSystem.subtitle') }}</div>
    </div>

    <div class="tree">
      <div
        v-for="dir in dirs"
        :key="dir.path"
        :class="['dir-item', { active: activeDir === dir.path }]"
        @click="activeDir = dir.path"
      >
        <span class="dir-icon">{{ dir.icon }}</span>
        <span class="dir-path">{{ dir.path }}</span>
        <span class="dir-brief">{{ dir.brief }}</span>
      </div>
    </div>

    <div v-if="current" class="detail-panel">
      <div class="detail-title">{{ current.path }}</div>
      <div class="detail-desc">{{ current.desc }}</div>
      <div v-if="current.examples.length" class="examples">
        <div class="ex-label">{{ t('fileSystem.examplesLabel') }}</div>
        <div class="ex-list">
          <span v-for="(ex, i) in current.examples" :key="i" class="ex-tag">{{ ex }}</span>
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

const activeDir = ref('/')

const dirs = computed(() => messages.value.fileSystem.dirs)
const current = computed(() => dirs.value.find(d => d.path === activeDir.value))
</script>

<style scoped>
.linux-fs-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.tree {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}
.dir-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  background: var(--vp-c-bg);
  border: 1px solid transparent;
  transition: all 0.2s;
  font-size: 0.82rem;
}
.dir-item:hover { border-color: var(--vp-c-divider); }
.dir-item.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.05);
}
.dir-icon { font-size: 0.9rem; }
.dir-path { font-weight: 700; font-family: var(--vp-font-family-mono); min-width: 60px; }
.dir-brief { color: var(--vp-c-text-3); font-size: 0.78rem; }
.detail-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}
.detail-title {
  font-weight: 700;
  font-size: 0.95rem;
  font-family: var(--vp-font-family-mono);
  margin-bottom: 0.4rem;
}
.detail-desc { font-size: 0.82rem; color: var(--vp-c-text-2); margin-bottom: 0.5rem; line-height: 1.6; }
.examples { margin-top: 0.4rem; }
.ex-label { font-size: 0.75rem; font-weight: 600; color: var(--vp-c-text-3); margin-bottom: 0.3rem; }
.ex-list { display: flex; flex-wrap: wrap; gap: 0.3rem; }
.ex-tag {
  font-size: 0.72rem;
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-brand);
}
</style>
