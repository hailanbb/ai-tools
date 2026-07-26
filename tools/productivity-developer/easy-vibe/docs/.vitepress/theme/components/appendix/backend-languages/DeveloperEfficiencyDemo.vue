<template>
  <div class="developer-efficiency-demo">
    <div class="demo-header">
      <span class="icon">⏱️</span>
      <span class="title">{{ t('efficiency.title') }}</span>
      <span class="subtitle">{{ t('efficiency.subtitle') }}</span>
    </div>

    <div class="intro-text">
      {{ t('efficiency.introPrefix') }}<span class="highlight">{{ t('efficiency.introHighlight') }}</span>{{ t('efficiency.introSuffix') }}
    </div>

    <div class="task-selector">
      <label>{{ t('efficiency.taskLabel') }}</label>
      <select v-model="selectedTask">
        <option
          v-for="task in tasks"
          :key="task.id"
          :value="task.id"
        >
          {{ task.label }}
        </option>
      </select>
    </div>

    <div class="efficiency-chart">
      <div class="chart-header">
        <span>{{ t('efficiency.chartTitle') }}</span>
      </div>
      <div class="bars">
        <div
          v-for="lang in sortedLanguages"
          :key="lang.name"
          class="bar-wrapper"
        >
          <div class="bar-label">
            {{ lang.name }}
          </div>
          <div class="bar-track">
            <div
              class="bar-fill"
              :style="{ width: (lang.time / maxTime * 100) + '%' }"
            >
              <span class="bar-value">{{ lang.time }}h</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('efficiency.infoStrong') }}</strong>{{ t('efficiency.info') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { backendLanguagesLocale } from '../../../locales/backend-languages/index.js'

const { t, messages } = useI18n(backendLanguagesLocale)

const selectedTask = ref('rest')
const tasks = computed(() => messages.value.efficiency.tasks)
const taskData = computed(() => messages.value.efficiency.taskData)

const sortedLanguages = computed(() => {
  return [...taskData.value[selectedTask.value]].sort((a, b) => a.time - b.time)
})

const maxTime = computed(() => {
  return Math.max(...taskData.value[selectedTask.value].map(l => l.time))
})
</script>

<style scoped>
.developer-efficiency-demo {
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

.task-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  background: var(--vp-c-bg);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
}

.task-selector label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.task-selector select {
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
  cursor: pointer;
}

.efficiency-chart {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.chart-header {
  margin-bottom: 0.75rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.bars {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.bar-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.bar-label {
  min-width: 70px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.bar-track {
  flex: 1;
  height: 24px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.5rem;
  background: var(--vp-c-green-1);
  transition: width 0.5s ease;
  color: white;
  font-weight: 600;
  font-size: 0.75rem;
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
