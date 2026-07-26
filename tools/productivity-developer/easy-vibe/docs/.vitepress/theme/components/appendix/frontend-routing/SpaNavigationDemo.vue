<template>
  <div class="spa-navigation-demo">
    <div class="demo-header">
      <span class="icon">🚀</span>
      <span class="title">{{ t('spaNavigation.title') }}</span>
      <span class="subtitle">{{ t('spaNavigation.subtitle') }}</span>
    </div>

    <div class="intro-text">
      {{ t('spaNavigation.intro.prefix') }}<span class="highlight">{{ t('spaNavigation.intro.highlight') }}</span>{{ t('spaNavigation.intro.suffix') }}
    </div>

    <div class="flow-container">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="flow-step"
      >
        <div class="step-number">
          {{ index + 1 }}
        </div>
        <div class="step-content">
          <div class="step-title">
            {{ step.title }}
          </div>
          <div class="step-desc">
            {{ step.desc }}
          </div>
        </div>
      </div>
    </div>

    <div class="highlight-box">
      <h5>{{ t('spaNavigation.optimizationTitle') }}</h5>
      <div class="optimization-tips">
        <div
          v-for="tip in tips"
          :key="tip.title"
          class="tip-item"
        >
          <span class="tip-icon">{{ tip.icon }}</span>
          <div class="tip-content">
            <div class="tip-title">
              {{ tip.title }}
            </div>
            <div class="tip-desc">
              {{ tip.desc }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.coreAdvantage') }}</strong>{{ t('spaNavigation.info') }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { frontendRoutingLocale } from '../../../locales/frontend-routing/index.js'

const { t, messages } = useI18n(frontendRoutingLocale)
const steps = computed(() => messages.value.spaNavigation.steps)
const tips = computed(() => messages.value.spaNavigation.tips)
</script>

<style scoped>
.spa-navigation-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  
  
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.flow-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.flow-step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
  transition: all 0.2s;
}

.flow-step:hover {
  background: var(--vp-c-bg-soft);
  transform: translateX(4px);
}

.step-number {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.85rem;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.step-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  line-height: 1.4;
}

.highlight-box {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1rem;
}

.highlight-box h5 {
  margin: 0 0 0.75rem 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.optimization-tips {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tip-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.tip-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.tip-content {
  flex: 1;
}

.tip-title {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.tip-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  line-height: 1.4;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon { margin-right: 0.25rem; }

@media (max-width: 768px) {
  .flow-step {
    padding: 0.5rem;
  }

  .step-number {
    width: 24px;
    height: 24px;
    font-size: 0.75rem;
  }
}
</style>
