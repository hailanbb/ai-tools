<template>
  <div class="recursive-thinking-demo">
    <div class="demo-header">
      <span class="title">{{ t('algorithmThinking.recursive.title') }}</span>
      <span class="subtitle">{{ t('algorithmThinking.recursive.subtitle') }}</span>
    </div>

    <div class="analogy-section">
      <div class="analogy-box">
        <div class="analogy-icon">🪆</div>
        <div class="analogy-content">
          <div class="analogy-title">
            {{ t('algorithmThinking.recursive.analogyTitle') }}
          </div>
          <div class="analogy-desc">
            {{ t('algorithmThinking.recursive.analogyLine1') }}<br />
            {{ t('algorithmThinking.recursive.analogyLine2') }}<br />
            <strong>{{ t('algorithmThinking.recursive.analogyStrong') }}</strong>
          </div>
        </div>
      </div>
    </div>

    <div class="example-selector">
      <div class="selector-title">
        {{ t('algorithmThinking.recursive.examplesTitle') }}
      </div>
      <div class="selector-buttons">
        <button
          v-for="example in examples"
          :key="example.id"
          :class="['example-btn', { active: activeExample === example.id }]"
          @click="activeExample = example.id"
        >
          {{ example.icon }} {{ example.name }}
        </button>
      </div>
    </div>

    <div v-if="activeExample === 'factorial'" class="example-content">
      <div class="example-title">
        {{ t('algorithmThinking.recursive.factorialTitle') }}
      </div>
      <div class="factorial-visual">
        <div class="factorial-call">
          <div class="call-box">5! = 5 × 4!</div>
          <div class="call-arrow">↓</div>
          <div class="call-box">4! = 4 × 3!</div>
          <div class="call-arrow">↓</div>
          <div class="call-box">3! = 3 × 2!</div>
          <div class="call-arrow">↓</div>
          <div class="call-box">2! = 2 × 1!</div>
          <div class="call-arrow">↓</div>
          <div class="call-box base">
            {{ t('algorithmThinking.recursive.factorialBase') }}
          </div>
        </div>
        <div class="factorial-return">
          <div v-for="line in factorialReturns" :key="line" class="return-arrow">
            {{ line }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeExample === 'fibonacci'" class="example-content">
      <div class="example-title">
        {{ t('algorithmThinking.recursive.fibonacciTitle') }}
      </div>
      <div class="fibonacci-visual">
        <div class="fib-rule">F(n) = F(n-1) + F(n-2)</div>
        <div class="fib-tree">
          <div class="tree-node">F(5)</div>
          <div class="tree-level">
            <div class="tree-node">F(4)</div>
            <div class="tree-node">F(3)</div>
          </div>
          <div class="tree-level">
            <div class="tree-node">F(3)</div>
            <div class="tree-node">F(2)</div>
            <div class="tree-node">F(2)</div>
            <div class="tree-node">F(1)=1</div>
          </div>
        </div>
        <div class="fib-result">F(5) = 5</div>
      </div>
    </div>

    <div v-if="activeExample === 'directory'" class="example-content">
      <div class="example-title">
        {{ t('algorithmThinking.recursive.directoryTitle') }}
      </div>
      <div class="directory-visual">
        <div class="dir-tree">
          <div class="dir-node root">📁 /home</div>
          <div class="dir-children">
            <div class="dir-node">📄 file1.txt</div>
            <div class="dir-node">📁 documents</div>
            <div class="dir-children">
              <div class="dir-node">📄 report.doc</div>
              <div class="dir-node">📁 photos</div>
              <div class="dir-children">
                <div class="dir-node">🖼️ pic1.jpg</div>
              </div>
            </div>
            <div class="dir-node">📄 file2.txt</div>
          </div>
        </div>
        <div class="dir-pseudocode">
          <div class="pseudo-title">
            {{ t('algorithmThinking.recursive.pseudocodeTitle') }}
          </div>
          <pre>
function traverse(folder) {
  for each item in folder {
    if item is file {
      print(item)
    } else if item is folder {
      traverse(item)  // recursive call
    }
  }
}</pre>
        </div>
      </div>
    </div>

    <div class="recursive-elements">
      <div class="elements-title">
        {{ t('algorithmThinking.recursive.elementsTitle') }}
      </div>
      <div class="elements-grid">
        <div
          v-for="(element, index) in elements"
          :key="element.title"
          class="element-card"
        >
          <div class="element-number">{{ index + 1 }}</div>
          <div class="element-title">{{ element.title }}</div>
          <div class="element-desc">{{ element.desc }}</div>
          <div class="element-example">{{ element.example }}</div>
        </div>
      </div>
    </div>

    <div class="pros-cons">
      <div class="pros-column">
        <div class="column-title">
          {{ t('algorithmThinking.recursive.prosTitle') }}
        </div>
        <ul class="column-list">
          <li v-for="item in pros" :key="item">{{ item }}</li>
        </ul>
      </div>
      <div class="cons-column">
        <div class="column-title">
          {{ t('algorithmThinking.recursive.consTitle') }}
        </div>
        <ul class="column-list">
          <li v-for="item in cons" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals'

const { t, messages } = useI18n(computerFundamentalsLocale)

const activeExample = ref('factorial')

const examples = computed(() => messages.value.algorithmThinking.recursive.examples)
const factorialReturns = computed(
  () => messages.value.algorithmThinking.recursive.factorialReturns
)
const elements = computed(() => messages.value.algorithmThinking.recursive.elements)
const pros = computed(() => messages.value.algorithmThinking.recursive.pros)
const cons = computed(() => messages.value.algorithmThinking.recursive.cons)
</script>

<style scoped>
.recursive-thinking-demo {
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

.analogy-section {
  margin-bottom: 2rem;
}

.analogy-box {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background: var(--vp-c-bg);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 6px;
}

.analogy-icon {
  font-size: 3rem;
  flex-shrink: 0;
}

.analogy-content {
  flex: 1;
}

.analogy-title {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-brand);
}

.analogy-desc {
  font-size: 0.9rem;
  line-height: 1.8;
}

.example-selector {
  margin-bottom: 2rem;
}

.selector-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-brand);
}

.selector-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.example-btn {
  padding: 0.6rem 1rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.example-btn:hover {
  border-color: var(--vp-c-brand);
}

.example-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.example-content {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.example-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--vp-c-brand);
}

.factorial-visual {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .factorial-visual {
    grid-template-columns: 1fr;
  }
}

.call-box {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  text-align: center;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

.call-box.base {
  background: #10b981;
  color: white;
  border-color: #10b981;
  font-weight: 600;
}

.call-arrow {
  text-align: center;
  font-size: 1.5rem;
  color: var(--vp-c-brand);
  margin: 0.5rem 0;
}

.return-arrow {
  padding: 0.5rem;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid #3b82f6;
  border-radius: 4px;
  text-align: center;
  font-size: 0.85rem;
  color: #3b82f6;
  margin-bottom: 0.5rem;
}

.fibonacci-visual {
  text-align: center;
}

.fib-rule {
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  margin-bottom: 1.5rem;
}

.fib-tree {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.tree-level {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.tree-node {
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand);
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-weight: 600;
}

.fib-result {
  font-size: 1.2rem;
  font-weight: 700;
  color: #10b981;
}

.directory-visual {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .directory-visual {
    grid-template-columns: 1fr;
  }
}

.dir-tree {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dir-node {
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.85rem;
}

.dir-node.root {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
  font-weight: 600;
}

.dir-children {
  margin-left: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dir-pseudocode {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 1rem;
}

.pseudo-title {
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.dir-pseudocode pre {
  color: #d4d4d4;
  font-size: 0.8rem;
  line-height: 1.6;
  margin: 0;
}

.recursive-elements {
  margin-bottom: 2rem;
}

.elements-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.elements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.element-card {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.element-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.element-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.element-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  line-height: 1.5;
  margin-bottom: 0.5rem;
}

.element-example {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  font-style: italic;
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .pros-cons {
    grid-template-columns: 1fr;
  }
}

.pros-column,
.cons-column {
  padding: 1.25rem;
  border-radius: 8px;
}

.pros-column {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid #10b981;
}

.cons-column {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid #ef4444;
}

.column-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.column-list {
  margin: 0;
  padding-left: 1.25rem;
}

.column-list li {
  font-size: 0.9rem;
  line-height: 1.8;
  color: var(--vp-c-text-1);
}
</style>
