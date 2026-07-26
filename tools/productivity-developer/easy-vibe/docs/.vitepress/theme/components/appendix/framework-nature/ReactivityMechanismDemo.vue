<template>
  <div
    class="reactivity-mechanism-demo"
    :style="{ '--tab-accent': currentTab?.color ?? 'var(--vp-c-brand)' }"
  >
    <div class="toggle-bar">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['toggle-btn', { active: activeTab === tab.id }]"
        :style="activeTab === tab.id ? { borderColor: tab.color, background: tab.color } : {}"
        @click="switchTab(tab.id)"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="visualization-area">
      <div class="counter-row">
        <span class="counter-label">count:</span>
        <span class="counter-value">{{ count }}</span>
      </div>
      <button
        class="modify-btn"
        :disabled="isAnimating"
        @click="modifyData"
      >
        {{ t('reactivityMechanism.modify') }}
      </button>

      <div class="steps-title">{{ t('reactivityMechanism.underHood') }}</div>
      <div class="steps-list">
        <div
          v-for="(step, idx) in currentSteps"
          :key="idx"
          :class="['step-item', stepState(idx)]"
          :style="stepStyle(idx)"
        >
          <span class="step-badge">{{ idx + 1 }}</span>
          <span class="step-text">{{ step }}</span>
          <span v-if="stepStatus(idx) === 'done'" class="step-check">✓</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ t('reactivityMechanism.infoStrong') }}</strong>
      {{ infoMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { frameworkNatureLocale } from '../../../locales/framework-nature/index.js'

const { t, messages } = useI18n(frameworkNatureLocale)

const activeTab = ref('vue')
const count = ref(0)
const currentStepIndex = ref(-1)
const isAnimating = ref(false)

const tabsMap = computed(() => messages.value.reactivityMechanism.tabs)

const tabs = computed(() => Object.values(tabsMap.value))

const currentTab = computed(() => tabsMap.value[activeTab.value])

const currentSteps = computed(() => currentTab.value?.steps ?? [])

const infoMessage = computed(() => currentTab.value?.info ?? '')

function stepState(idx) {
  if (currentStepIndex.value < idx) return 'pending'
  if (currentStepIndex.value === idx) return 'active'
  return 'done'
}

function stepStatus(idx) {
  if (currentStepIndex.value < idx) return 'pending'
  if (currentStepIndex.value === idx) return 'active'
  return 'done'
}

function stepStyle(idx) {
  if (currentStepIndex.value !== idx) return {}
  const color = currentTab.value?.color ?? 'var(--vp-c-brand)'
  return {
    borderColor: color,
    boxShadow: `0 0 8px color-mix(in srgb, ${color} 40%, transparent)`
  }
}

function switchTab(id) {
  if (isAnimating.value) return
  activeTab.value = id
  currentStepIndex.value = -1
}

async function modifyData() {
  if (isAnimating.value) return
  isAnimating.value = true
  count.value += 1
  currentStepIndex.value = -1

  for (let i = 0; i < 4; i++) {
    currentStepIndex.value = i
    await new Promise((r) => setTimeout(r, 300))
  }

  currentStepIndex.value = 4
  isAnimating.value = false
}
</script>

<style scoped>
.reactivity-mechanism-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.toggle-bar {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.toggle-btn {
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.toggle-btn:hover {
  border-color: var(--vp-c-brand);
}

.toggle-btn.active {
  color: white;
}

.visualization-area {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 0.75rem;
}

.counter-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.counter-label {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.counter-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-brand);
}

.modify-btn {
  display: block;
  margin: 0 auto 1rem;
  padding: 0.4rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  font-size: 0.85rem;
}

.modify-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.modify-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.steps-title {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-2);
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-size: 0.82rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.step-item.pending {
  opacity: 0.6;
}

.step-badge {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
  font-size: 0.75rem;
  font-weight: 600;
}

.step-item.active .step-badge {
  background: var(--tab-accent);
  color: white;
}

.step-item.done .step-badge {
  background: var(--vp-c-green-1);
  color: white;
}

.step-text {
  flex: 1;
}

.step-check {
  color: var(--vp-c-green-1);
  font-weight: 700;
}

.step-item.done {
  border-color: var(--vp-c-green-1);
}

.info-box {
  display: flex;
  gap: 0.25rem;
  padding: 0.75rem;
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
  color: var(--vp-c-text-1);
}

@media (max-width: 720px) {
  .toggle-bar {
    flex-direction: column;
  }

  .toggle-btn {
    width: 100%;
  }

  .steps-list {
    flex-direction: column;
  }
}
</style>
