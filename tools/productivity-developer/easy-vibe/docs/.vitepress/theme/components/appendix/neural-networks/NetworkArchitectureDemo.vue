<template>
  <div class="net-arch-demo">
    <div class="header">
      <div class="title">{{ t('architecture.title') }}</div>
      <div class="subtitle">{{ t('architecture.subtitle') }}</div>
    </div>

    <div class="arch-tabs">
      <button
        v-for="arch in architectures"
        :key="arch.key"
        :class="['arch-btn', { active: activeArch === arch.key }]"
        @click="activeArch = arch.key"
      >
        {{ arch.name }}
      </button>
    </div>

    <div v-if="current" class="detail-panel">
      <div class="detail-header">
        <div class="detail-title">{{ current.name }}（{{ current.abbr }}）</div>
        <div class="detail-year">{{ current.year }}</div>
      </div>
      <div class="detail-desc">{{ current.desc }}</div>

      <div class="structure">
        <div class="struct-label">{{ t('architecture.labels.structure') }}</div>
        <div class="struct-visual">
          <span v-for="(layer, i) in current.layers" :key="i" class="layer-tag">
            {{ layer }}
            <span v-if="i < current.layers.length - 1" class="layer-arrow">→</span>
          </span>
        </div>
      </div>

      <div class="apps">
        <div class="apps-label">{{ t('architecture.labels.applications') }}</div>
        <div class="apps-list">
          <span v-for="(app, i) in current.applications" :key="i" class="app-tag">{{ app }}</span>
        </div>
      </div>

      <div class="key-idea">
        <span class="idea-label">{{ t('architecture.labels.keyIdea') }}</span>{{ current.keyIdea }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { neuralNetworksLocale } from '../../../locales/neural-networks/index.js'

const { t, messages } = useI18n(neuralNetworksLocale)

const activeArch = ref('ffn')

const architectures = computed(() => messages.value.architecture.items)
const current = computed(() => architectures.value.find(a => a.key === activeArch.value))
</script>

<style scoped>
.net-arch-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.arch-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}
.arch-btn {
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
.arch-btn:hover { border-color: var(--vp-c-brand); }
.arch-btn.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}
.detail-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}
.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.4rem;
}
.detail-title { font-weight: 700; font-size: 0.95rem; }
.detail-year {
  font-size: 0.72rem;
  padding: 0.1rem 0.4rem;
  background: rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.1);
  color: var(--vp-c-brand);
  border-radius: 4px;
  font-weight: 600;
}
.detail-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  line-height: 1.6;
}
.structure, .apps {
  margin-bottom: 0.5rem;
}
.struct-label, .apps-label {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  margin-bottom: 0.3rem;
}
.struct-visual {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.2rem;
}
.layer-tag {
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-weight: 600;
}
.layer-arrow {
  color: var(--vp-c-text-3);
  margin: 0 0.1rem;
}
.apps-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}
.app-tag {
  font-size: 0.72rem;
  padding: 0.15rem 0.4rem;
  background: rgba(34, 197, 94, 0.1);
  color: var(--vp-c-text-1);
  border-radius: 4px;
}
.key-idea {
  font-size: 0.8rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  line-height: 1.5;
}
.idea-label { font-weight: 600; color: var(--vp-c-text-2); }
</style>
