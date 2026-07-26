<template>
  <div class="type-inference-demo">
    <h4>{{ t('typeSystems.inference.title') }}</h4>
    <p class="desc">{{ t('typeSystems.inference.desc') }}</p>

    <div class="code-area">
      <div
        v-for="(line, i) in codeLines"
        :key="i"
        :class="['code-line', { active: activeLine === i }]"
        @click="activeLine = i"
      >
        <span class="line-num">{{ i + 1 }}</span>
        <span class="line-code" v-html="line.code"></span>
        <span v-if="activeLine === i" class="inferred-type">
          → {{ line.inferred }}
        </span>
      </div>
    </div>

    <div v-if="activeLine !== null" class="explanation">
      <div class="explain-header">{{ t('typeSystems.inference.processTitle') }}</div>
      <div class="explain-steps">
        <div v-for="(step, j) in codeLines[activeLine].steps" :key="j" class="step">
          <span class="step-num">{{ j + 1 }}</span>
          <span>{{ step }}</span>
        </div>
      </div>
    </div>

    <div class="lang-support">
      <div class="support-title">{{ t('typeSystems.inference.supportTitle') }}</div>
      <div class="support-grid">
        <div v-for="lang in langs" :key="lang.name" class="support-item">
          <span class="support-name">{{ lang.name }}</span>
          <div class="support-bar">
            <div class="support-fill" :style="{ width: lang.level + '%' }"></div>
          </div>
          <span class="support-label">{{ lang.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals'

const { t, messages } = useI18n(computerFundamentalsLocale)
const activeLine = ref(0)

const codeLines = computed(() => messages.value.typeSystems.inference.codeLines)
const langs = computed(() => messages.value.typeSystems.inference.langs)
</script>

<style scoped>
.type-inference-demo {
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}
h4 { margin: 0 0 4px; }
.desc { color: var(--vp-c-text-2); font-size: 14px; margin: 0 0 16px; }
.code-area {
  background: #1e1e1e; border-radius: 8px; padding: 12px 0; font-family: 'Fira Code', monospace;
}
.code-line {
  display: flex; align-items: center; padding: 4px 14px; cursor: pointer;
  transition: background 0.15s; font-size: 13px; color: #d4d4d4;
}
.code-line:hover { background: rgba(255,255,255,0.05); }
.code-line.active { background: rgba(100,149,237,0.15); }
.line-num { color: #858585; width: 24px; text-align: right; margin-right: 12px; font-size: 12px; user-select: none; }
.line-code :deep(.kw) { color: #569cd6; }
.line-code :deep(.str) { color: #ce9178; }
.line-code :deep(.num) { color: #b5cea8; }
.line-code :deep(.type) { color: #4ec9b0; }
.inferred-type {
  margin-left: auto; padding: 2px 8px; background: rgba(78,201,176,0.2);
  color: #4ec9b0; border-radius: 4px; font-size: 12px; white-space: nowrap;
}
.explanation {
  margin-top: 12px; border: 1px solid var(--vp-c-divider); border-radius: 8px;
  background: var(--vp-c-bg); overflow: hidden;
}
.explain-header { padding: 8px 12px; font-weight: 600; font-size: 13px; background: var(--vp-c-bg-soft); border-bottom: 1px solid var(--vp-c-divider); }
.explain-steps { padding: 10px 12px; }
.step { display: flex; align-items: center; gap: 8px; padding: 4px 0; font-size: 13px; }
.step-num {
  width: 20px; height: 20px; border-radius: 50%; background: var(--vp-c-brand-1);
  color: #fff; display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 600; flex-shrink: 0;
}
.lang-support { margin-top: 16px; }
.support-title { font-weight: 600; font-size: 13px; margin-bottom: 8px; }
.support-grid { display: flex; flex-direction: column; gap: 6px; }
.support-item { display: flex; align-items: center; gap: 8px; font-size: 12px; }
.support-name { width: 80px; font-weight: 500; text-align: right; }
.support-bar { flex: 1; height: 8px; background: var(--vp-c-divider); border-radius: 4px; overflow: hidden; }
.support-fill { height: 100%; background: var(--vp-c-brand-1); border-radius: 4px; transition: width 0.5s; }
.support-label { width: 140px; color: var(--vp-c-text-3); font-size: 11px; }
@media (max-width: 640px) { .support-label { display: none; } }
</style>
