<template>
  <div class="code-optimization-demo">
    <h4>{{ t('compilers.optimization.title') }}</h4>
    <p class="desc">{{ t('compilers.optimization.desc') }}</p>

    <div class="opt-selector">
      <button
        v-for="(opt, i) in optimizations"
        :key="i"
        :class="['opt-btn', { active: selected === i }]"
        @click="selected = i"
      >
        <span class="opt-icon">{{ opt.icon }}</span>
        <span>{{ opt.name }}</span>
      </button>
    </div>

    <div class="opt-detail">
      <div class="code-panel before">
        <div class="panel-header">{{ t('compilers.optimization.beforeTitle') }}</div>
        <pre class="code-block">{{ optimizations[selected].before }}</pre>
      </div>
      <div class="arrow-col">
        <div class="arrow-box">
          <span class="arrow-icon">→</span>
          <span class="arrow-label">{{ t('compilers.optimization.arrowLabel') }}</span>
        </div>
      </div>
      <div class="code-panel after">
        <div class="panel-header">{{ t('compilers.optimization.afterTitle') }}</div>
        <pre class="code-block">{{ optimizations[selected].after }}</pre>
      </div>
    </div>

    <div class="opt-explain">
      <div class="explain-header">
        {{ t('compilers.optimization.principleTitle', { name: optimizations[selected].name }) }}
      </div>
      <div class="explain-text">{{ optimizations[selected].explain }}</div>
      <div class="perf-gain">
        <span class="gain-label">{{ t('compilers.optimization.gainLabel') }}</span>
        <div class="gain-bar-bg">
          <div
            class="gain-bar"
            :style="{ width: optimizations[selected].gain + '%' }"
          ></div>
        </div>
        <span class="gain-value">{{ optimizations[selected].gain }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals'

const { t, messages } = useI18n(computerFundamentalsLocale)

const selected = ref(0)

const optimizations = computed(
  () => messages.value.compilers.optimization.optimizations
)
</script>

<style scoped>
.code-optimization-demo {
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}
h4 {
  margin: 0 0 4px;
}
.desc {
  color: var(--vp-c-text-2);
  font-size: 14px;
  margin: 0 0 16px;
}
.opt-selector {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.opt-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.opt-btn.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}
.opt-icon {
  font-size: 16px;
}
.opt-detail {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 8px;
  margin-bottom: 14px;
  align-items: stretch;
}
.code-panel {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
}
.panel-header {
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}
.code-block {
  padding: 10px 12px;
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
  white-space: pre-wrap;
}
.arrow-col {
  display: flex;
  align-items: center;
  justify-content: center;
}
.arrow-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.arrow-icon {
  font-size: 24px;
  color: var(--vp-c-brand-1);
  font-weight: 700;
}
.arrow-label {
  font-size: 11px;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}
.opt-explain {
  padding: 12px 14px;
  background: var(--vp-c-brand-soft);
  border-radius: 8px;
}
.explain-header {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 6px;
}
.explain-text {
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 10px;
}
.perf-gain {
  display: flex;
  align-items: center;
  gap: 8px;
}
.gain-label {
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}
.gain-bar-bg {
  flex: 1;
  height: 8px;
  background: var(--vp-c-bg);
  border-radius: 4px;
  overflow: hidden;
}
.gain-bar {
  height: 100%;
  background: var(--vp-c-brand-1);
  border-radius: 4px;
  transition: width 0.4s ease;
}
.gain-value {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}
@media (max-width: 640px) {
  .opt-detail {
    grid-template-columns: 1fr;
  }
  .arrow-col {
    transform: rotate(90deg);
    padding: 4px 0;
  }
}
</style>
