<template>
  <div class="identity-provider-demo">
    <div class="demo-header">
      <span class="icon">🔐</span>
      <span class="title">{{ t('identityProvider.title') }}</span>
      <span class="subtitle">{{ t('identityProvider.subtitle') }}</span>
    </div>

    <div class="flow-steps">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="step"
        :class="{ active: currentStep === index }"
        @click="currentStep = index"
      >
        <span class="step-num">{{ index + 1 }}</span>
        <span class="step-title">{{ step.title }}</span>
      </div>
    </div>

    <div class="detail-panel">
      <div class="detail-title">
        {{ currentStepData.title }}
      </div>
      <p class="detail-desc">
        {{ currentStepData.detail }}
      </p>
      <div
        v-if="currentStepData.flow"
        class="flow-row"
      >
        <span class="entity user">{{ currentStepData.flow[0].from.name }}</span>
        <span class="action">{{ currentStepData.flow[0].action }}</span>
        <span class="entity cloud">{{ currentStepData.flow[0].to.name }}</span>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.coreIdea') }}</strong>{{ t('identityProvider.info') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { cloudIamLocale } from '../../../locales/cloud-iam/index.js'

const { t, messages } = useI18n(cloudIamLocale)
const currentStep = ref(0)
const steps = computed(() => messages.value.identityProvider.steps)
const stepDetails = computed(() => messages.value.identityProvider.stepDetails)

const currentStepData = computed(() => stepDetails.value[currentStep.value])
</script>

<style scoped>
.identity-provider-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
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

.flow-steps {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-bottom: 0.75rem;
}

.step {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.step:hover { border-color: var(--vp-c-brand); }
.step.active { background: var(--vp-c-brand-soft); border-color: var(--vp-c-brand); }

.step-num {
  width: 18px;
  height: 18px;
  background: var(--vp-c-bg-alt);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
}

.step.active .step-num { background: var(--vp-c-brand); color: #fff; }

.step-title { font-size: 0.75rem; font-weight: 500; color: var(--vp-c-text-1); }

.detail-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
}

.detail-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.4rem;
}

.detail-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin: 0 0 0.5rem;
  line-height: 1.4;
}

.flow-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.4rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
}

.entity {
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  font-size: 0.75rem;
  font-weight: 500;
}

.entity.user { background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); }
.entity.cloud { background: rgba(239, 68, 68, 0.1); color: #dc2626; }

.action { font-size: 0.7rem; color: var(--vp-c-text-3); }

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box .icon { flex-shrink: 0; }
.info-box strong { color: var(--vp-c-text-1); }
</style>
