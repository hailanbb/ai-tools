<template>
  <div class="a2a-visual-demo">
    <div class="section-title">{{ t('a2aVisual.title') }}</div>

    <div class="intro-text">
      {{ t('a2aVisual.introBefore') }}<strong>{{ t('a2aVisual.introStrong') }}</strong>{{ t('a2aVisual.introAfter') }}
    </div>

    <div class="section-title">{{ t('a2aVisual.conceptTitle') }}</div>

    <div class="concepts-grid">
      <div v-for="concept in messages.a2aVisual.concepts" :key="concept.title" class="concept">
        <div class="concept-title">{{ concept.title }}</div>
        <div class="concept-desc">{{ concept.desc }}</div>
      </div>
    </div>

    <div class="section-title">{{ t('a2aVisual.useCaseTitle') }}</div>

    <div class="use-cases">
      <div v-for="useCase in messages.a2aVisual.useCases" :key="useCase.title" class="use-case">
        <div class="use-case-title">{{ useCase.title }}</div>
        <div class="use-case-desc">{{ useCase.desc }}</div>
      </div>
    </div>

    <div class="section-title">{{ t('a2aVisual.usageTitle') }}</div>

    <div class="usage-steps">
      <div v-for="(step, index) in messages.a2aVisual.steps" :key="step.title" class="step">
        <div class="step-num">{{ index + 1 }}</div>
        <div class="step-content">
          <div class="step-title">{{ step.title }}</div>
          <div class="step-desc">{{ step.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from '../../../composables/useI18n.js'
import { aiProtocolsLocale } from '../../../locales/ai-protocols/index.js'

const { t, messages } = useI18n(aiProtocolsLocale)
</script>

<style scoped>
.a2a-visual-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 1.25rem;
  margin: 1rem 0;
}

.section-title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
  margin-top: 1.25rem;
}

.section-title:first-child {
  margin-top: 0;
}

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.intro-text strong {
  color: var(--vp-c-brand);
}

.concepts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.concept {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.concept-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.3rem;
}

.concept-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.use-cases {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.use-case {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.use-case-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.3rem;
}

.use-case-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.usage-steps {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.step-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
}

.step-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

@media (max-width: 640px) {
  .concepts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
