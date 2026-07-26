<template>
  <div class="language-selector-demo">
    <div class="demo-header">
      <span class="icon">🎯</span>
      <span class="title">{{ t('selector.title') }}</span>
      <span class="subtitle">{{ t('selector.subtitle') }}</span>
    </div>

    <div class="intro-text">
      {{ t('selector.introPrefix') }}<span class="highlight">{{ t('selector.introHighlight') }}</span>{{ t('selector.introSuffix') }}
    </div>

    <div class="questions-container">
      <div
        v-for="(question, index) in questions"
        :key="question.id"
        class="question-card"
        :class="{ active: currentQuestion === index }"
      >
        <div class="question-number">
          {{ index + 1 }}
        </div>
        <div class="question-content">
          <h6>{{ question.text }}</h6>
          <div class="options">
            <button
              v-for="option in question.options"
              :key="option.value"
              class="option-btn"
              :class="{ selected: answers[index] === option.value }"
              @click="selectAnswer(index, option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="recommendation"
        class="recommendation-panel"
      >
        <div class="rec-header">
          <span class="rec-icon">{{ recommendation.icon }}</span>
          <div class="rec-title">
            <h6>{{ t('selector.recommended') }}</h6>
            <div class="rec-name">
              {{ recommendation.language }}
            </div>
          </div>
        </div>
        <div class="rec-reason">
          <strong>{{ t('selector.reasonStrong') }}</strong>
          <p>{{ recommendation.reason }}</p>
        </div>
        <button
          class="reset-btn"
          @click="reset"
        >
          {{ t('selector.reset') }}
        </button>
      </div>
    </Transition>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('selector.infoStrong') }}</strong>{{ t('selector.info') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { backendLanguagesLocale } from '../../../locales/backend-languages/index.js'

const { t, messages } = useI18n(backendLanguagesLocale)

const currentQuestion = ref(0)
const answers = ref({})
const questions = computed(() => messages.value.selector.questions)

const recommendation = computed(() => {
  if (Object.keys(answers.value).length < 3) return null

  const { project_type, performance, team } = answers.value
  const recs = messages.value.selector.recommendations

  if (project_type === 'ai') {
    return recs.ai
  }

  if (project_type === 'system' || performance === 'high') {
    return recs.high
  }

  if (team === 'frontend') {
    return recs.frontend
  }

  if (team === 'python') {
    return recs.python
  }

  if (team === 'java') {
    return recs.java
  }

  return recs.default
})

const selectAnswer = (questionIndex, value) => {
  answers.value[questionIndex] = value
  if (currentQuestion.value < questions.value.length - 1) {
    currentQuestion.value++
  }
}

const reset = () => {
  answers.value = {}
  currentQuestion.value = 0
}
</script>

<style scoped>
.language-selector-demo {
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

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

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

.questions-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.question-card {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  border: 2px solid transparent;
  display: flex;
  gap: 0.75rem;
}

.question-card.active {
  border-color: var(--vp-c-brand);
}

.question-number {
  width: 28px;
  height: 28px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.question-content {
  flex: 1;
}

.question-content h6 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.option-btn {
  padding: 0.35rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.8rem;
}

.option-btn:hover {
  border-color: var(--vp-c-brand);
}

.option-btn.selected {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.recommendation-panel {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  border: 2px solid var(--vp-c-brand);
}

.rec-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.rec-icon {
  font-size: 2.5rem;
}

.rec-title h6 {
  margin: 0 0 0.25rem 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.rec-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--vp-c-brand-1);
}

.rec-reason {
  margin-bottom: 0.75rem;
}

.rec-reason strong {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.rec-reason p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.reset-btn {
  width: 100%;
  padding: 0.5rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.85rem;
}

.reset-btn:hover {
  background: var(--vp-c-brand-dark);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.25rem;
}
</style>
