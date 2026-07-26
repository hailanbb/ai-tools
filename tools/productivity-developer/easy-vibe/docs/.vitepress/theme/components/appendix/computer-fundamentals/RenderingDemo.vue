<template>
  <div class="rendering-demo">
    <div class="demo-title">{{ t('powerOnToWeb.rendering.title') }}</div>
    <div class="pipeline">
      <div v-for="(stage, i) in stages" :key="stage.name" class="pipe-item">
        <div class="pipe-card">
          <div class="pipe-num">{{ i + 1 }}</div>
          <div class="pipe-info">
            <div class="pipe-name">{{ stage.name }}</div>
            <div class="pipe-desc">{{ stage.desc }}</div>
          </div>
        </div>
        <div v-if="i < stages.length - 1" class="pipe-arrow">↓</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals'

const { t, messages } = useI18n(computerFundamentalsLocale)
const stages = computed(() => messages.value.powerOnToWeb.rendering.stages)
</script>

<style scoped>
.rendering-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}
.demo-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.8rem;
}
.pipeline {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pipe-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.pipe-card {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.45rem 0.7rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  width: 100%;
}
.pipe-num {
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 600;
  flex-shrink: 0;
  margin-top: 0.1rem;
}
.pipe-info { flex: 1; }
.pipe-name {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.pipe-desc {
  font-size: 0.63rem;
  color: var(--vp-c-text-3);
  margin-top: 0.1rem;
  line-height: 1.4;
}
.pipe-arrow {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  padding: 0.15rem 0;
}
</style>
