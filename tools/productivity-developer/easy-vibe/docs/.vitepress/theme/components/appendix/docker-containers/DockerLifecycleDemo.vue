<template>
  <div class="docker-lifecycle-demo">
    <div class="header">
      <div class="title">{{ t('lifecycle.title') }}</div>
      <div class="subtitle">{{ t('lifecycle.subtitle') }}</div>
    </div>

    <div class="stages">
      <div
        v-for="(stage, i) in stages"
        :key="stage.key"
        :class="['stage-card', { active: activeStage === stage.key }]"
        @click="activeStage = stage.key"
      >
        <div class="stage-icon">{{ stage.icon }}</div>
        <div class="stage-name">{{ stage.name }}</div>
        <div v-if="i < stages.length - 1" class="arrow">→</div>
      </div>
    </div>

    <div v-if="current" class="detail-panel">
      <div class="detail-title">{{ current.name }}</div>
      <div class="detail-desc">{{ current.desc }}</div>
      <div class="command-block">
        <div class="cmd-label">{{ t('lifecycle.commandLabel') }}</div>
        <div v-for="(cmd, i) in current.commands" :key="i" class="cmd-item">
          <code>{{ cmd.cmd }}</code>
          <span class="cmd-desc">{{ cmd.desc }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { dockerContainersLocale } from '../../../locales/docker-containers/index.js'

const { t, messages } = useI18n(dockerContainersLocale)

const activeStage = ref('write')

const stages = computed(() => messages.value.lifecycle.stages)

const current = computed(() => stages.value.find(s => s.key === activeStage.value))
</script>

<style scoped>
.docker-lifecycle-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.stages {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}
.stage-card {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.7rem;
  border-radius: 8px;
  cursor: pointer;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
}
.stage-card:hover { border-color: var(--vp-c-brand); }
.stage-card.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.05);
}
.stage-icon { font-size: 1.1rem; }
.stage-name { font-size: 0.8rem; font-weight: 600; }
.arrow { color: var(--vp-c-text-3); font-size: 0.9rem; margin: 0 0.1rem; }
.detail-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}
.detail-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.4rem; }
.detail-desc { font-size: 0.82rem; color: var(--vp-c-text-2); margin-bottom: 0.75rem; line-height: 1.6; }
.command-block {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.6rem;
}
.cmd-label { font-weight: 600; font-size: 0.78rem; margin-bottom: 0.4rem; color: var(--vp-c-text-2); }
.cmd-item {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.25rem 0;
  font-size: 0.78rem;
}
.cmd-item code {
  background: var(--vp-c-bg);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  color: var(--vp-c-brand);
}
.cmd-desc { color: var(--vp-c-text-3); }
</style>
