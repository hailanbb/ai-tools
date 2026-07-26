<template>
  <div class="governance-demo">
    <div class="header">
      <div class="title">{{ t('framework.title') }}</div>
      <div class="subtitle">{{ t('framework.subtitle') }}</div>
    </div>

    <div class="pipeline">
      <div
        v-for="(stage, i) in stages"
        :key="stage.key"
        :class="['stage', { active: activeStage === stage.key }]"
        @click="activeStage = stage.key"
      >
        <div class="stage-num">{{ i + 1 }}</div>
        <div class="stage-name">{{ stage.name }}</div>
        <div v-if="i < stages.length - 1" class="arrow">→</div>
      </div>
    </div>

    <div v-if="current" class="stage-detail">
      <div class="detail-title">{{ current.name }}</div>
      <div class="detail-desc">{{ current.desc }}</div>
      <div class="activities">
        <div v-for="(act, i) in current.activities" :key="i" class="activity">
          <span class="act-icon">{{ act.icon }}</span>
          <div>
            <div class="act-name">{{ act.name }}</div>
            <div class="act-desc">{{ act.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { dataGovernanceLocale } from '../../../locales/data-governance/index.js'

const { t, messages } = useI18n(dataGovernanceLocale)

const activeStage = ref('define')

const stages = computed(() => messages.value.framework.stages)

const current = computed(() => stages.value.find(s => s.key === activeStage.value))
</script>

<style scoped>
.governance-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.pipeline { display: flex; align-items: center; gap: 0.25rem; margin-bottom: 1rem; flex-wrap: wrap; }
.stage {
  display: flex; align-items: center; gap: 0.4rem; padding: 0.5rem 0.75rem;
  border-radius: 8px; cursor: pointer; background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider); transition: all 0.2s; font-size: 0.85rem;
}
.stage:hover { border-color: var(--vp-c-brand); }
.stage.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); }
.stage-num { width: 20px; height: 20px; border-radius: 50%; background: var(--vp-c-brand); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; }
.stage-name { font-weight: 600; }
.arrow { color: var(--vp-c-text-3); margin-left: 0.25rem; }
.stage-detail { background: var(--vp-c-bg); border-radius: 8px; padding: 1rem; border: 1px solid var(--vp-c-divider); }
.detail-title { font-weight: 700; font-size: 1rem; margin-bottom: 0.25rem; }
.detail-desc { color: var(--vp-c-text-2); font-size: 0.85rem; margin-bottom: 0.75rem; }
.activities { display: flex; flex-direction: column; gap: 0.5rem; }
.activity { display: flex; gap: 0.5rem; padding: 0.5rem; border-radius: 6px; background: var(--vp-c-bg-soft); }
.act-icon { font-size: 1.2rem; }
.act-name { font-weight: 600; font-size: 0.85rem; }
.act-desc { font-size: 0.78rem; color: var(--vp-c-text-2); }
@media (max-width: 640px) { .pipeline { flex-direction: column; align-items: stretch; } .arrow { display: none; } }
</style>
