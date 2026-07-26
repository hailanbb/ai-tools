<template>
  <div class="compiler-analogy-demo">
    <div class="demo-header">
      <span class="title">{{ t('compilers.analogy.title') }}</span>
      <span class="subtitle">{{ t('compilers.analogy.subtitle') }}</span>
    </div>

    <div class="analogy-intro">
      <div class="analogy-box">
        <div class="analogy-text">
          {{ t('compilers.analogy.introPrefix') }}<strong>{{ t('compilers.analogy.introStrong') }}</strong>{{ t('compilers.analogy.introSuffix') }}
        </div>
      </div>
    </div>

    <div class="translation-process">
      <div class="process-title">{{ t('compilers.analogy.processTitle') }}</div>
      <div class="process-flow">
        <div
          v-for="(step, index) in translationSteps"
          :key="index"
          class="process-step"
        >
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <div class="step-name">{{ step.name }}</div>
            <div class="step-desc">{{ step.desc }}</div>
            <div class="step-example">{{ step.example }}</div>
          </div>
          <div v-if="index < translationSteps.length - 1" class="step-arrow">
            →
          </div>
        </div>
      </div>
    </div>

    <div class="analyzer-section">
      <div class="analyzer-title">{{ t('compilers.analogy.lexicalTitle') }}</div>
      <div class="lexical-demo">
        <div class="source-code">
          <code>int age = 25;</code>
        </div>
        <div class="token-arrow">↓</div>
        <div class="tokens-list">
          <div v-for="(token, index) in tokens" :key="index" class="token-item">
            <span class="token-type">{{ token.type }}</span>
            <span class="token-value">{{ token.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="analyzer-section">
      <div class="analyzer-title">{{ t('compilers.analogy.syntaxTitle') }}</div>
      <div class="syntax-demo">
        <div class="syntax-tree">
          <div class="tree-node root">
            <span class="node-label">{{ t('compilers.analogy.tree.assignment') }}</span>
            <div class="node-children">
              <div class="tree-node">
                <span class="node-label">{{ t('compilers.analogy.tree.variable') }}</span>
                <span class="node-value">age</span>
              </div>
              <div class="tree-node">
                <span class="node-label">{{ t('compilers.analogy.tree.operator') }}</span>
                <span class="node-value">=</span>
              </div>
              <div class="tree-node">
                <span class="node-label">{{ t('compilers.analogy.tree.number') }}</span>
                <span class="node-value">25</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison">
      <div class="comparison-title">{{ t('compilers.analogy.compareTitle') }}</div>
      <div class="comparison-box">
        <div
          v-for="item in comparisonItems"
          :key="item.header"
          :class="['compare-side', item.class]"
        >
          <div class="side-header">{{ item.header }}</div>
          <div class="side-content">
            <div class="side-step">{{ item.step }}</div>
            <div class="side-example">{{ item.example }}</div>
            <div class="side-features">
              <div v-for="feature in item.features" :key="feature" class="feature">
                {{ feature }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="optimization">
      <div class="optimization-title">{{ t('compilers.analogy.optimizationTitle') }}</div>
      <div class="optimization-content">
        <div class="opt-examples">
          <div class="opt-item">
            <div class="opt-before">{{ t('compilers.analogy.before') }}</div>
            <div class="opt-code">x = 5 + 3 + 2</div>
          </div>
          <div class="opt-arrow">⬇️</div>
          <div class="opt-item">
            <div class="opt-after">{{ t('compilers.analogy.after') }}</div>
            <div class="opt-code">x = 10</div>
          </div>
        </div>
        <div class="opt-note">{{ t('compilers.analogy.optimizationNote') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals'

const { t, messages } = useI18n(computerFundamentalsLocale)

const translationSteps = computed(
  () => messages.value.compilers.analogy.translationSteps
)
const tokens = computed(() => messages.value.compilers.analogy.tokens)
const comparisonItems = computed(
  () => messages.value.compilers.analogy.comparisonItems
)
</script>

<style scoped>
.compiler-analogy-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.demo-header .title {
  font-weight: 700;
  font-size: 1.1rem;
}
.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.analogy-intro {
  margin-bottom: 2rem;
}

.analogy-box {
  padding: 1rem;
  background: var(--vp-c-bg);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 6px;
}

.analogy-text {
  font-size: 0.95rem;
  line-height: 1.6;
}

.translation-process {
  margin-bottom: 2rem;
}

.process-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--vp-c-brand);
}

.process-flow {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.process-step {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.9rem;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-name {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.35rem;
  color: var(--vp-c-brand);
}

.step-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.step-example {
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  padding: 0.5rem;
  border-radius: 4px;
}

.step-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-brand);
  flex-shrink: 0;
}

.analyzer-section {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.analyzer-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: var(--vp-c-brand);
}

.lexical-demo {
  text-align: center;
}

.source-code {
  padding: 1rem;
  background: #1e1e1e;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.source-code code {
  color: #d4d4d4;
  font-size: 1rem;
}

.token-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-brand);
  margin-bottom: 1rem;
}

.tokens-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.token-item {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  min-width: 100px;
}

.token-type {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.token-value {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-brand);
}

.syntax-demo {
  display: flex;
  justify-content: center;
}

.syntax-tree {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tree-node {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.tree-node.root {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.node-label {
  font-size: 0.85rem;
  font-weight: 600;
}

.node-value {
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  color: var(--vp-c-brand);
}

.node-children {
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
}

.comparison {
  margin-bottom: 2rem;
}

.comparison-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.comparison-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .comparison-box {
    grid-template-columns: 1fr;
  }
}

.compare-side {
  padding: 1.5rem;
  border-radius: 8px;
}

.side-header {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.compile .side-header {
  color: #10b981;
}

.interpret .side-header {
  color: #3b82f6;
}

.side-step {
  text-align: center;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.side-example {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.side-features {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature {
  font-size: 0.85rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 4px;
}

.optimization {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.optimization-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: var(--vp-c-brand);
}

.optimization-content {
  text-align: center;
}

.opt-examples {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;
}

.opt-item {
  text-align: center;
}

.opt-before,
.opt-after {
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.opt-code {
  font-family: 'Courier New', monospace;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 0.9rem;
}

.opt-arrow {
  font-size: 1.5rem;
}

.opt-note {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  font-style: italic;
}
</style>
