<template>
  <div class="generic-type-demo">
    <h4>{{ t('typeSystems.generic.title') }}</h4>
    <p class="desc">{{ t('typeSystems.generic.desc') }}</p>

    <div class="scene-selector">
      <button
        v-for="(s, i) in scenes"
        :key="i"
        :class="['scene-btn', { active: selected === i }]"
        @click="selected = i"
      >
        {{ s.label }}
      </button>
    </div>

    <div class="code-comparison">
      <div class="code-panel">
        <div class="panel-tag bad">{{ t('typeSystems.generic.withoutLabel') }}</div>
        <pre class="code-block">{{ scenes[selected].without }}</pre>
        <div class="panel-problem">{{ scenes[selected].problem }}</div>
      </div>
      <div class="code-panel">
        <div class="panel-tag good">{{ t('typeSystems.generic.withLabel') }}</div>
        <pre class="code-block">{{ scenes[selected].withGeneric }}</pre>
        <div class="panel-benefit">{{ scenes[selected].benefit }}</div>
      </div>
    </div>

    <div class="type-flow">
      <div class="flow-title">{{ t('typeSystems.generic.flowTitle') }}</div>
      <div class="flow-steps">
        <span
          v-for="(step, j) in scenes[selected].flow"
          :key="j"
          class="flow-step"
        >
          <code>{{ step }}</code>
          <span v-if="j < scenes[selected].flow.length - 1" class="flow-arrow">→</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals'

const { t, messages } = useI18n(computerFundamentalsLocale)
const selected = ref(0)

const scenes = computed(() => messages.value.typeSystems.generic.scenes)
</script>

<style scoped>
.generic-type-demo {
  padding: 20px; border: 1px solid var(--vp-c-divider);
  border-radius: 12px; margin: 16px 0; background: var(--vp-c-bg-soft);
}
h4 { margin: 0 0 4px; }
.desc { color: var(--vp-c-text-2); font-size: 14px; margin: 0 0 16px; }
.scene-selector { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
.scene-btn {
  padding: 6px 14px; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 13px; transition: all 0.2s;
}
.scene-btn.active { background: var(--vp-c-brand-1); color: #fff; border-color: var(--vp-c-brand-1); }
.code-comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px; }
.code-panel { border: 1px solid var(--vp-c-divider); border-radius: 8px; overflow: hidden; background: var(--vp-c-bg); }
.panel-tag { padding: 6px 12px; font-size: 12px; font-weight: 600; border-bottom: 1px solid var(--vp-c-divider); }
.panel-tag.bad { background: #fef2f2; color: #991b1b; }
.panel-tag.good { background: #f0fdf4; color: #166534; }
.code-block { padding: 10px 12px; margin: 0; font-size: 12px; line-height: 1.5; white-space: pre-wrap; }
.panel-problem, .panel-benefit { padding: 6px 12px; font-size: 12px; border-top: 1px solid var(--vp-c-divider); }
.panel-problem { background: #fef2f2; color: #991b1b; }
.panel-benefit { background: #f0fdf4; color: #166534; }
.type-flow { padding: 12px 14px; background: var(--vp-c-brand-soft); border-radius: 8px; }
.flow-title { font-weight: 600; font-size: 13px; margin-bottom: 8px; }
.flow-steps { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.flow-step { display: flex; align-items: center; gap: 6px; }
.flow-step code { padding: 3px 8px; background: var(--vp-c-bg); border-radius: 4px; font-size: 12px; }
.flow-arrow { color: var(--vp-c-text-3); font-weight: 600; }
@media (max-width: 640px) { .code-comparison { grid-template-columns: 1fr; } }
</style>
