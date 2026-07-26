<template>
  <div class="redux-flow-demo">
    <div class="demo-header">
      <span class="icon">🔄</span>
      <span class="title">{{ t('redux.title') }}</span>
      <span class="subtitle">{{ t('redux.subtitle') }}</span>
    </div>

    <div class="intro-text">
      {{ t('redux.introPrefix') }}<span class="highlight">{{ t('redux.introHighlight') }}</span>{{ t('redux.introSuffix') }}
    </div>

    <div class="demo-content">
      <div class="counter-display">
        <span class="counter-label">{{ t('redux.counterLabel') }}</span>
        <span
          class="counter-value"
          :class="{ changed: countChanged }"
        >{{ count }}</span>
        <span class="counter-unit">{{ t('redux.counterUnit') }}</span>
      </div>

      <div class="action-buttons">
        <button
          class="action-btn"
          @click="dispatchAction('INCREMENT')"
        >
          <span class="btn-icon">➕</span>
          {{ t('redux.increment') }}
        </button>
        <button
          class="action-btn"
          @click="dispatchAction('DECREMENT')"
        >
          <span class="btn-icon">➖</span>
          {{ t('redux.decrement') }}
        </button>
        <button
          class="action-btn reset"
          @click="dispatchAction('RESET')"
        >
          <span class="btn-icon">🔄</span>
          {{ t('redux.reset') }}
        </button>
      </div>

      <Transition name="fade">
        <div
          v-if="flowStage"
          class="flow-stages"
        >
          <div
            class="flow-stage"
            :class="{ active: flowStage === 'action' }"
          >
            <span class="stage-icon">📝</span>
            <span class="stage-text">Action: {{ currentAction.type }}</span>
          </div>
          <div class="flow-arrow">
            →
          </div>
          <div
            class="flow-stage"
            :class="{ active: flowStage === 'reducer' }"
          >
            <span class="stage-icon">⚙️</span>
            <span class="stage-text">{{ t('redux.reducerProcessing') }}</span>
          </div>
          <div class="flow-arrow">
            →
          </div>
          <div
            class="flow-stage"
            :class="{ active: flowStage === 'store' }"
          >
            <span class="stage-icon">📦</span>
            <span class="stage-text">{{ t('redux.storeUpdated') }}</span>
          </div>
        </div>
      </Transition>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.coreIdea') }}</strong>{{ t('redux.idea') }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { componentStateManagementLocale } from '../../../locales/component-state-management/index.js'

const { t } = useI18n(componentStateManagementLocale)

const count = ref(0)
const countChanged = ref(false)
const flowStage = ref('')

const currentAction = reactive({
  type: ''
})

const dispatchAction = async (actionType) => {
  flowStage.value = 'action'
  currentAction.type = actionType

  await wait(500)
  flowStage.value = 'reducer'
  await wait(500)
  flowStage.value = 'store'

  switch (actionType) {
    case 'INCREMENT':
      count.value++
      break
    case 'DECREMENT':
      count.value--
      break
    case 'RESET':
      count.value = 0
      break
  }

  countChanged.value = true
  setTimeout(() => {
    countChanged.value = false
  }, 300)

  await wait(300)
  flowStage.value = ''
}

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
</script>

<style scoped>
.redux-flow-demo {
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

.demo-content {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 1.5rem;
  margin-bottom: 0.75rem;
}

.counter-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  margin-bottom: 1rem;
}

.counter-label {
  font-size: 1rem;
  color: var(--vp-c-text-2);
}

.counter-value {
  font-size: 3rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  transition: all 0.3s ease;
}

.counter-value.changed {
  transform: scale(1.2);
  color: #22c55e;
}

.counter-unit {
  font-size: 1rem;
  color: var(--vp-c-text-2);
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.action-btn.reset {
  background: var(--vp-c-text-2);
}

.btn-icon {
  font-size: 1rem;
}

.flow-stages {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.flow-stage {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.flow-stage.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  box-shadow: 0 0 0 3px var(--vp-c-brand-delta);
}

.stage-icon {
  font-size: 1.25rem;
}

.stage-text {
  font-weight: 500;
}

.flow-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
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

@media (max-width: 768px) {
  .flow-stages {
    flex-direction: column;
  }

  .flow-arrow {
    transform: rotate(90deg);
  }
}
</style>
