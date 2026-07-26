<template>
  <div class="compiler-demo">
    <div class="demo-header">
      <span class="title">{{ t('compilers.workflow.title') }}</span>
      <span class="subtitle">{{ t('compilers.workflow.subtitle') }}</span>
    </div>

    <div class="control-panel">
      <label>{{ t('compilers.workflow.inputLabel') }}</label>
      <input
        v-model="sourceCode"
        type="text"
        class="code-input"
        :placeholder="t('compilers.workflow.placeholder')"
      />
    </div>

    <div class="visualization-area">
      <div class="pipeline">
        <div
          v-for="(stage, i) in stages"
          :key="i"
          :class="['pipeline-stage', { active: activeStage === i }]"
          @click="activeStage = i"
        >
          <div class="stage-indicator">
            <span class="stage-num">{{ i + 1 }}</span>
          </div>
          <div class="stage-info">
            <span class="stage-name">{{ stage.name }}</span>
            <span class="stage-output">→ {{ stage.output }}</span>
          </div>
        </div>
      </div>

      <div class="stage-detail">
        <div class="detail-header">
          <span class="detail-num">{{ activeStage + 1 }}</span>
          <span class="detail-name">{{ currentStage.name }}</span>
          <span class="detail-badge">
            {{ t('compilers.workflow.outputLabel', { output: currentStage.output }) }}
          </span>
        </div>
        <div class="detail-desc">{{ currentStage.desc }}</div>

        <div class="detail-tasks">
          <span
            v-for="(task, j) in currentStage.tasks"
            :key="j"
            class="task-chip"
            >{{ task }}</span>
        </div>

        <div class="detail-example">
          <pre><code>{{ currentStage.example }}</code></pre>
        </div>
      </div>

      <div class="lexer-section">
        <div class="section-title">{{ t('compilers.workflow.lexerTitle') }}</div>
        <div class="tokens-flow">
          <div
            v-for="(token, i) in tokens"
            :key="i"
            :class="['token-chip', token.type]"
          >
            <span class="token-value">{{ token.value }}</span>
            <span class="token-type">{{ token.label }}</span>
          </div>
          <div v-if="!tokens.length" class="tokens-empty">
            {{ t('compilers.workflow.emptyTokens') }}
          </div>
        </div>
      </div>

      <div class="exec-section">
        <div class="section-title">{{ t('compilers.workflow.execTitle') }}</div>
        <div class="exec-grid">
          <div
            v-for="model in executionModels"
            :key="model.name"
            class="exec-card"
          >
            <div class="exec-name">{{ model.name }}</div>
            <div class="exec-flow">
              <span v-for="(step, i) in model.steps" :key="i" class="flow-tag">
                {{ step }}
                <span v-if="i < model.steps.length - 1" class="flow-arrow">→</span>
              </span>
            </div>
            <div class="exec-traits">
              <span class="trait pro">{{ model.pro }}</span>
              <span class="trait con">{{ model.con }}</span>
            </div>
            <div class="exec-langs">{{ model.langs }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ t('compilers.workflow.coreIdeaLabel') }}</strong>{{ t('compilers.workflow.coreIdea') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals'

const { t, messages } = useI18n(computerFundamentalsLocale)

const activeStage = ref(0)
const sourceCode = ref('int x = 10 + 5;')

const stages = computed(() => messages.value.compilers.workflow.stages)

const currentStage = computed(() => stages.value[activeStage.value])

const keywords = [
  'int',
  'float',
  'double',
  'char',
  'void',
  'if',
  'else',
  'while',
  'for',
  'return',
  'class',
  'public',
  'private',
  'string',
  'bool'
]

const tokens = computed(() => {
  const code = sourceCode.value
  if (!code.trim()) return []

  const result = []
  const regex =
    /([a-zA-Z_]\w*|\d+(?:\.\d+)?|[+\-*/=<>!]=?|[;,(){}[\]]|"[^"]*"|'[^']*')/g
  let match

  while ((match = regex.exec(code)) !== null) {
    const word = match[1]
    const labels = messages.value.compilers.workflow.tokenLabels
    if (keywords.includes(word)) {
      result.push({ value: word, type: 'keyword', label: labels.keyword })
    } else if (/^\d/.test(word)) {
      result.push({ value: word, type: 'number', label: labels.number })
    } else if (/^[+\-*/=<>!]/.test(word)) {
      result.push({ value: word, type: 'operator', label: labels.operator })
    } else if (/^[;,(){}[\]]$/.test(word)) {
      result.push({ value: word, type: 'punctuation', label: labels.punctuation })
    } else if (/^["']/.test(word)) {
      result.push({ value: word, type: 'string', label: labels.string })
    } else {
      result.push({ value: word, type: 'identifier', label: labels.identifier })
    }
  }

  return result
})

const executionModels = computed(
  () => messages.value.compilers.workflow.executionModels
)
</script>

<style scoped>
.compiler-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}
.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
}

.control-panel {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--vp-c-bg);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 0.75rem;
}

.control-panel label {
  font-size: 0.82rem;
  font-weight: bold;
  white-space: nowrap;
}

.code-input {
  flex: 1;
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
}

/* Pipeline */
.pipeline {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.pipeline-stage {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s;
  flex: 1;
  min-width: 100px;
}

.pipeline-stage.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.stage-indicator {
  flex-shrink: 0;
}

.stage-num {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.72rem;
  font-weight: bold;
}

.stage-name {
  font-size: 0.78rem;
  font-weight: bold;
  display: block;
}

.stage-output {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
}

/* Stage Detail */
.stage-detail {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
}

.detail-num {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: bold;
}

.detail-name {
  font-weight: bold;
  font-size: 0.9rem;
}

.detail-badge {
  margin-left: auto;
  font-size: 0.72rem;
  padding: 0.1rem 0.4rem;
  background: var(--vp-c-brand-soft);
  border-radius: 3px;
  color: var(--vp-c-brand);
}

.detail-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.detail-tasks {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.task-chip {
  font-size: 0.72rem;
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-bg-alt);
  border-radius: 3px;
  border: 1px solid var(--vp-c-divider);
}

.detail-example {
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  overflow: hidden;
}

.detail-example pre {
  margin: 0;
  padding: 0.5rem;
  font-size: 0.75rem;
  font-family: var(--vp-font-family-mono);
  white-space: pre-wrap;
  line-height: 1.5;
}

/* Lexer */
.lexer-section {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.section-title {
  font-weight: bold;
  font-size: 0.88rem;
  margin-bottom: 0.5rem;
}

.tokens-flow {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.token-chip {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.25rem 0.4rem;
  border-radius: 4px;
  min-width: 35px;
}

.token-chip.keyword {
  background: rgba(16, 185, 129, 0.15);
}
.token-chip.identifier {
  background: rgba(59, 130, 246, 0.15);
}
.token-chip.number {
  background: rgba(245, 158, 11, 0.15);
}
.token-chip.operator {
  background: rgba(139, 92, 246, 0.15);
}
.token-chip.punctuation {
  background: rgba(239, 68, 68, 0.15);
}
.token-chip.string {
  background: rgba(236, 72, 153, 0.15);
}

.token-value {
  font-family: var(--vp-font-family-mono);
  font-weight: bold;
  font-size: 0.82rem;
}

.token-type {
  font-size: 0.62rem;
  color: var(--vp-c-text-3);
}

.tokens-empty {
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
  padding: 0.5rem;
}

/* Exec Section */
.exec-section {
  margin-bottom: 0;
}

.exec-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
}

.exec-card {
  background: var(--vp-c-bg);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.exec-name {
  font-weight: bold;
  font-size: 0.88rem;
  color: var(--vp-c-brand);
  margin-bottom: 0.25rem;
}

.exec-flow {
  display: flex;
  flex-wrap: wrap;
  gap: 0.15rem;
  margin-bottom: 0.25rem;
}

.flow-tag {
  font-size: 0.72rem;
  font-family: var(--vp-font-family-mono);
}

.flow-arrow {
  color: var(--vp-c-text-3);
  margin: 0 0.1rem;
}

.exec-traits {
  display: flex;
  gap: 0.35rem;
  margin-bottom: 0.2rem;
}

.trait {
  font-size: 0.72rem;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
}

.trait.pro {
  background: rgba(16, 185, 129, 0.1);
  color: var(--vp-c-green-1);
}

.trait.pro::before {
  content: '✅ ';
}

.trait.con {
  background: rgba(239, 68, 68, 0.1);
  color: var(--vp-c-danger-1);
}

.trait.con::before {
  content: '❌ ';
}

.exec-langs {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}

/* Info Box */
.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
  display: flex;
  gap: 0.25rem;
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .pipeline {
    flex-direction: column;
  }

  .pipeline-stage {
    min-width: auto;
  }

  .exec-grid {
    grid-template-columns: 1fr;
  }
}
</style>
