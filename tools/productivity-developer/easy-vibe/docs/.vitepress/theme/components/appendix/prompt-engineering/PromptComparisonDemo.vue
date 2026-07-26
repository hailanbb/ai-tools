<template>
  <el-card
    class="cmp-card"
    shadow="hover"
  >
    <template #header>
      <div class="card-header">
        <div>
          <h3 class="title">
            {{ t('promptComparison.title') }}
          </h3>
          <p class="subtitle">
            {{ t('promptComparison.subtitle') }}
          </p>
        </div>
        <div class="task-select">
          <el-select
            v-model="task"
            :placeholder="t('promptComparison.selectTask')"
            style="width: 200px"
          >
            <el-option
              :label="t('promptComparison.taskBlog')"
              value="blog"
            />
            <el-option
              :label="t('promptComparison.taskJson')"
              value="json"
            />
          </el-select>
        </div>
      </div>
    </template>

    <div class="options-container">
      <el-checkbox
        v-model="useRole"
        :label="t('promptComparison.checkRole')"
        border
      />
      <el-checkbox
        v-model="useAudience"
        :label="t('promptComparison.checkAudience')"
        border
      />
      <el-checkbox
        v-model="useConstraints"
        :label="t('promptComparison.checkConstraints')"
        border
      />
      <el-checkbox
        v-model="useFormat"
        :label="t('promptComparison.checkFormat')"
        border
      />
    </div>

    <div class="grid-layout">
      <el-card
        shadow="never"
        class="panel input-panel"
      >
        <template #header>
          <div class="panel-header">
            {{ t('promptComparison.promptPanel') }}
          </div>
        </template>
        <div class="code-block">
          <pre><code>{{ prompt }}</code></pre>
        </div>
        <div class="checklist">
          <div
            v-for="i in checklist"
            :key="i.text"
            class="check-item"
          >
            <el-tag
              :type="i.ok ? 'success' : 'danger'"
              size="small"
              effect="dark"
              style="margin-right: 8px; min-width: 60px; text-align: center;"
            >
              {{ i.ok ? 'OK' : 'MISSING' }}
            </el-tag>
            <span>{{ i.text }}</span>
          </div>
        </div>
      </el-card>

      <el-card
        shadow="never"
        class="panel output-panel"
      >
        <template #header>
          <div class="panel-header">
            {{ t('promptComparison.outputPanel') }}
          </div>
        </template>
        <div class="output-content">
          {{ output }}
        </div>

        <div
          v-if="warnings.length"
          class="warnings-section"
        >
          <el-alert
            v-for="w in warnings"
            :key="w"
            :title="w"
            type="warning"
            show-icon
            :closable="false"
            style="margin-top: 8px"
          />
        </div>
        <el-empty
          v-else
          :description="t('promptComparison.perfect')"
          :image-size="60"
        />
      </el-card>
    </div>
  </el-card>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { promptEngineeringLocale } from '../../../locales/prompt-engineering/index.js'

const { t } = useI18n(promptEngineeringLocale)

const task = ref('blog')
const useRole = ref(false)
const useAudience = ref(true)
const useConstraints = ref(true)
const useFormat = ref(false)

const prompt = computed(() => {
  if (task.value === 'blog') {
    const lines = []
    if (useRole.value) lines.push(t('promptComparison.blog.roleLine'))
    lines.push(t('promptComparison.blog.taskLine'))
    if (useAudience.value) lines.push(t('promptComparison.blog.audienceLine'))
    if (useConstraints.value)
      lines.push(t('promptComparison.blog.constraintsLine'))
    if (useFormat.value) lines.push(t('promptComparison.blog.formatLine'))
    return lines.join('\n')
  }

  // json task
  const lines = []
  if (useRole.value) lines.push(t('promptComparison.json.roleLine'))
  lines.push(t('promptComparison.json.taskLine'))
  if (useAudience.value) lines.push(t('promptComparison.json.audienceLine'))
  if (useConstraints.value) lines.push(t('promptComparison.json.constraintsLine'))
  if (useFormat.value) {
    lines.push(t('promptComparison.json.formatPrefix'))
    lines.push('{')
    lines.push('  "summary": "...",')
    lines.push('  "keywords": ["..."]')
    lines.push('}')
  }
  lines.push(t('promptComparison.json.inputLabel'))
  lines.push(t('promptComparison.json.inputText'))
  return lines.join('\n')
})

const checklist = computed(() => [
  { text: t('promptComparison.checklist.task'), ok: true },
  { text: t('promptComparison.checklist.role'), ok: useRole.value },
  { text: t('promptComparison.checklist.audience'), ok: useAudience.value },
  { text: t('promptComparison.checklist.constraints'), ok: useConstraints.value },
  { text: t('promptComparison.checklist.format'), ok: useFormat.value }
])

const output = computed(() => {
  if (task.value === 'blog') {
    if (!useConstraints.value && !useAudience.value) {
      return t('promptComparison.blog.output1')
    }
    if (useAudience.value && !useConstraints.value) {
      return t('promptComparison.blog.output2')
    }
    return t('promptComparison.blog.output3')
  }

  // json
  if (!useFormat.value) {
    return t('promptComparison.json.outputNoFormat')
  }
  return t('promptComparison.json.outputWithFormat')
})

const warnings = computed(() => {
  const w = []
  if (!useRole.value) w.push(t('promptComparison.warnings.noRole'))
  if (!useAudience.value)
    w.push(t('promptComparison.warnings.noAudience'))
  if (!useConstraints.value) w.push(t('promptComparison.warnings.noConstraints'))
  if (!useFormat.value) w.push(t('promptComparison.warnings.noFormat'))
  return w
})
</script>

<style scoped>
.cmp-card {
  margin: 16px 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
}

.title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
}

.subtitle {
  margin: 4px 0 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.options-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.panel-header {
  font-weight: 600;
  font-size: 15px;
}

.code-block {
  background-color: var(--vp-c-bg-alt);
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 14px;
  border: 1px solid var(--vp-c-divider);
}

.code-block pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: var(--vp-font-family-mono);
}

.check-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.4;
}

.output-content {
  background-color: var(--vp-c-bg-soft);
  padding: 12px;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
  min-height: 80px;
}

.warnings-section {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

@media (max-width: 1024px) {
  .grid-layout {
    grid-template-columns: 1fr;
  }

  .card-header {
    flex-direction: column;
    align-items: stretch;
  }

  .task-select {
    width: 100%;
  }

  .task-select .el-select {
    width: 100% !important;
  }
}
</style>
