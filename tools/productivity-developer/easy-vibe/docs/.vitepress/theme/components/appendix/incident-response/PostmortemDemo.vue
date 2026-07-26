<template>
  <div class="postmortem-demo">
    <div class="header">
      <div class="title">{{ t('postmortem.title') }}</div>
      <div class="subtitle">{{ t('postmortem.subtitle') }}</div>
    </div>

    <div class="case-select">
      <button
        v-for="c in cases"
        :key="c.id"
        :class="['case-btn', { active: activeCase === c.id }]"
        @click="selectCase(c.id)"
      >
        {{ c.name }}
      </button>
    </div>

    <div v-if="currentCase" class="whys-chain">
      <div
        v-for="(why, index) in visibleWhys"
        :key="index"
        class="why-item"
      >
        <div class="why-header">
          <span class="why-badge">
            {{ index === 0 ? t('postmortem.phenomenon') : t('postmortem.whyBadge', { index }) }}
          </span>
          <span class="why-depth">
            {{ t('postmortem.depth', { index, total: currentCase.whys.length - 1 }) }}
          </span>
        </div>
        <div v-if="index > 0" class="why-question">
          {{ t('postmortem.whyQuestion', { answer: currentCase.whys[index - 1].answer }) }}
        </div>
        <div class="why-answer">
          <span class="answer-icon">{{ index === currentCase.whys.length - 1 && revealedCount >= currentCase.whys.length ? '🎯' : '💡' }}</span>
          <span>{{ why.answer }}</span>
        </div>
        <div
          v-if="index < visibleWhys.length - 1"
          class="why-arrow"
        >
          {{ t('postmortem.continueArrow') }}
        </div>
      </div>

      <div v-if="revealedCount < currentCase.whys.length" class="why-controls">
        <button class="ask-btn" @click="revealNext">
          {{ t('postmortem.continueButton') }}
        </button>
      </div>

      <div v-else class="root-cause-box">
        <div class="root-label">{{ t('postmortem.rootFound') }}</div>
        <div class="root-content">{{ currentCase.rootCause }}</div>
        <div class="root-actions">
          <div class="actions-label">{{ t('postmortem.actionsLabel') }}</div>
          <div
            v-for="(action, i) in currentCase.actions"
            :key="i"
            class="action-item"
          >
            <span class="action-check">&#10003;</span>
            <span>{{ action }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="template-box">
      <div class="template-title">{{ t('postmortem.templateTitle') }}</div>
      <div class="template-sections">
        <div
          v-for="(section, i) in templateSections"
          :key="i"
          class="template-item"
          :class="{ expanded: expandedSection === i }"
          @click="expandedSection = expandedSection === i ? -1 : i"
        >
          <div class="template-item-header">
            <span class="template-num">{{ i + 1 }}</span>
            <span class="template-name">{{ section.name }}</span>
            <span class="template-toggle">
              {{ expandedSection === i ? '−' : '+' }}
            </span>
          </div>
          <div v-if="expandedSection === i" class="template-item-body">
            {{ section.desc }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { incidentResponseLocale } from '../../../locales/incident-response/index.js'

const { t, messages } = useI18n(incidentResponseLocale)

const activeCase = ref('payment')
const revealedCount = ref(1)
const expandedSection = ref(-1)

const postmortem = computed(() => messages.value.postmortem)
const cases = computed(() => postmortem.value.cases.map(({ id, name }) => ({ id, name })))
const casesData = computed(() => Object.fromEntries(postmortem.value.cases.map((item) => [item.id, item])))

const currentCase = computed(() => casesData.value[activeCase.value] || null)

const visibleWhys = computed(() => {
  if (!currentCase.value) return []
  return currentCase.value.whys.slice(0, revealedCount.value)
})

const selectCase = (id) => {
  activeCase.value = id
  revealedCount.value = 1
}

const revealNext = () => {
  if (currentCase.value && revealedCount.value < currentCase.value.whys.length) {
    revealedCount.value++
  }
}

const templateSections = computed(() => postmortem.value.templateSections)
</script>

<style scoped>
.postmortem-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.header { margin-bottom: 1.5rem; }
.title { font-weight: 700; font-size: 1.1rem; margin-bottom: 0.25rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }

.case-select {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.case-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.case-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.case-btn.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}

.whys-chain {
  margin-bottom: 1.5rem;
}

.why-item {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 0.25rem;
}

.why-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.4rem;
}

.why-badge {
  font-weight: 700;
  font-size: 0.8rem;
  padding: 0.15rem 0.5rem;
  background: var(--vp-c-brand);
  color: #fff;
  border-radius: 4px;
}

.why-depth {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.why-question {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  font-style: italic;
  margin-bottom: 0.3rem;
  padding-left: 0.5rem;
  border-left: 2px solid var(--vp-c-divider);
}

.why-answer {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  font-size: 0.9rem;
  line-height: 1.5;
}

.answer-icon { flex-shrink: 0; }

.why-arrow {
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
  padding: 0.25rem 0;
}

.why-controls {
  text-align: center;
  margin-top: 0.75rem;
}

.ask-btn {
  padding: 0.6rem 1.5rem;
  background: var(--vp-c-brand);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s;
}

.ask-btn:hover { opacity: 0.9; transform: translateY(-1px); }

.root-cause-box {
  background: rgba(34, 197, 94, 0.08);
  border: 2px solid #22c55e;
  border-radius: 10px;
  padding: 1rem;
  margin-top: 0.75rem;
}

.root-label {
  font-weight: 700;
  font-size: 0.95rem;
  color: #22c55e;
  margin-bottom: 0.5rem;
}

.root-content {
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 0.75rem;
}

.actions-label {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
}

.action-item {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  font-size: 0.85rem;
  margin-bottom: 0.3rem;
}

.action-check {
  color: #22c55e;
  font-weight: 700;
  flex-shrink: 0;
}

.template-box {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.template-title {
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.template-sections {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.template-item {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  overflow: hidden;
}

.template-item:hover {
  border-color: var(--vp-c-brand);
}

.template-item.expanded {
  border-color: var(--vp-c-brand);
}

.template-item-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
}

.template-num {
  width: 22px; height: 22px; border-radius: 50%;
  background: var(--vp-c-bg-soft);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.75rem; font-weight: 700; flex-shrink: 0;
}

.template-name {
  flex: 1;
  font-weight: 600;
  font-size: 0.9rem;
}

.template-toggle {
  font-size: 1.1rem;
  color: var(--vp-c-text-3);
  font-weight: 700;
}

.template-item-body {
  padding: 0 0.75rem 0.6rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .case-select { flex-direction: column; }
  .case-btn { width: 100%; }
}
</style>
