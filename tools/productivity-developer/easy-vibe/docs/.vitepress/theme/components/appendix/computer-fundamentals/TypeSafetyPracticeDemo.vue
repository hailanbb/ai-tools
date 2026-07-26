<template>
  <div class="type-safety-demo">
    <h4>{{ t('typeSystems.safety.title') }}</h4>
    <p class="desc">{{ t('typeSystems.safety.desc') }}</p>

    <div class="trap-selector">
      <button
        v-for="(trap, i) in traps"
        :key="i"
        :class="['trap-btn', { active: selected === i }]"
        @click="selected = i"
      >
        <span class="trap-icon">{{ trap.icon }}</span>
        <span>{{ trap.name }}</span>
      </button>
    </div>

    <div class="trap-detail">
      <div class="danger-zone">
        <div class="zone-header danger">{{ t('typeSystems.safety.dangerLabel') }}</div>
        <pre class="code-block">{{ traps[selected].dangerCode }}</pre>
        <div class="zone-result danger">{{ traps[selected].dangerResult }}</div>
      </div>

      <div class="safe-zone">
        <div class="zone-header safe">{{ t('typeSystems.safety.safeLabel') }}</div>
        <pre class="code-block">{{ traps[selected].safeCode }}</pre>
        <div class="zone-result safe">{{ traps[selected].safeResult }}</div>
      </div>
    </div>

    <div class="defense-tip">
      <div class="tip-header">{{ t('typeSystems.safety.tipTitle') }}</div>
      <ul>
        <li v-for="(tip, j) in traps[selected].tips" :key="j">{{ tip }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals'

const { t, messages } = useI18n(computerFundamentalsLocale)
const selected = ref(0)

const traps = computed(() => messages.value.typeSystems.safety.traps)
</script>

<style scoped>
.type-safety-demo {
  padding: 20px; border: 1px solid var(--vp-c-divider);
  border-radius: 12px; margin: 16px 0; background: var(--vp-c-bg-soft);
}
h4 { margin: 0 0 4px; }
.desc { color: var(--vp-c-text-2); font-size: 14px; margin: 0 0 16px; }
.trap-selector { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
.trap-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 14px; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 13px; transition: all 0.2s;
}
.trap-btn.active { background: var(--vp-c-brand-1); color: #fff; border-color: var(--vp-c-brand-1); }
.trap-icon { font-size: 16px; }
.trap-detail { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
.danger-zone, .safe-zone { border-radius: 8px; border: 1px solid var(--vp-c-divider); overflow: hidden; background: var(--vp-c-bg); }
.zone-header { padding: 6px 12px; font-size: 13px; font-weight: 600; border-bottom: 1px solid var(--vp-c-divider); }
.zone-header.danger { background: #fef2f2; color: #991b1b; }
.zone-header.safe { background: #f0fdf4; color: #166534; }
.code-block { padding: 10px 12px; margin: 0; font-size: 12px; line-height: 1.5; white-space: pre-wrap; }
.zone-result { padding: 6px 12px; font-size: 12px; border-top: 1px solid var(--vp-c-divider); }
.zone-result.danger { background: #fef2f2; color: #991b1b; }
.zone-result.safe { background: #f0fdf4; color: #166534; }
.defense-tip { padding: 12px 14px; background: var(--vp-c-brand-soft); border-radius: 8px; }
.tip-header { font-weight: 600; font-size: 13px; margin-bottom: 6px; }
.defense-tip ul { margin: 0; padding-left: 18px; }
.defense-tip li { font-size: 13px; margin: 3px 0; }
@media (max-width: 640px) { .trap-detail { grid-template-columns: 1fr; } }
</style>
