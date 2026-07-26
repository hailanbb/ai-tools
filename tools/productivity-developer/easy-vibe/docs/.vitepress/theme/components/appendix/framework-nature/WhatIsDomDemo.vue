<template>
  <div class="what-is-dom-demo">
    <div class="demo-header">
      <span class="title">{{ t('whatIsDom.title') }}</span>
      <span class="subtitle">{{ t('whatIsDom.subtitle') }}</span>
    </div>

    <div class="demo-body">
      <div class="html-panel">
        <div class="panel-title">{{ t('whatIsDom.htmlTitle') }}</div>
        <div class="code-display">
          <div
            v-for="(line, i) in htmlLines"
            :key="i"
            :class="['code-line', { highlighted: highlightedTag === line.tag }]"
            @mouseenter="highlightedTag = line.tag"
            @mouseleave="highlightedTag = ''"
          >
            <span class="line-num">{{ i + 1 }}</span>
            <span class="line-code" :style="{ paddingLeft: line.indent * 12 + 'px' }">{{ line.text }}</span>
          </div>
        </div>
      </div>

      <div class="arrow-col">
        <div class="arrow-label">{{ t('whatIsDom.parseLabel') }}</div>
        <div class="arrow-icon">→</div>
      </div>

      <div class="tree-panel">
        <div class="panel-title">{{ t('whatIsDom.treeTitle') }}</div>
        <div class="tree-display">
          <div
            v-for="node in treeNodes"
            :key="node.id"
            :class="['tree-node', { highlighted: highlightedTag === node.tag }]"
            :style="{ marginLeft: node.depth * 20 + 'px' }"
            @mouseenter="highlightedTag = node.tag"
            @mouseleave="highlightedTag = ''"
          >
            <span v-if="node.depth > 0" class="connector">└─</span>
            <span class="node-tag">{{ node.label }}</span>
            <span v-if="node.text" class="node-text">"{{ node.text }}"</span>
          </div>
        </div>
      </div>
    </div>

    <div class="dom-explain">
      <div v-for="item in explanations" :key="item.title" class="explain-item">
        <span class="explain-icon">{{ item.icon }}</span>
        <div class="explain-content">
          <strong>{{ item.title }}</strong>
          <span v-html="item.text" />
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ t('whatIsDom.infoStrong') }}</strong>
      <span>{{ t('whatIsDom.info') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { frameworkNatureLocale } from '../../../locales/framework-nature/index.js'

const { t, messages } = useI18n(frameworkNatureLocale)
const highlightedTag = ref('')

const htmlLines = computed(() => messages.value.whatIsDom.htmlLines)
const treeNodes = computed(() => messages.value.whatIsDom.treeNodes)
const explanations = computed(() => messages.value.whatIsDom.explanations)
</script>

<style scoped>
.what-is-dom-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
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
  font-size: 1rem;
  font-weight: 600;
}

.demo-header .subtitle {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.demo-body {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.html-panel,
.tree-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.6rem;
}

.panel-title {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.code-display {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  line-height: 1.6;
}

.code-line {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  cursor: default;
  transition: background 0.15s;
}

.code-line.highlighted {
  background: rgba(59, 130, 246, 0.1);
}

.line-num {
  color: var(--vp-c-text-3);
  font-size: 0.65rem;
  min-width: 1rem;
  text-align: right;
  flex-shrink: 0;
  user-select: none;
}

.line-code {
  color: var(--vp-c-text-1);
}

.arrow-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  padding-top: 1.5rem;
}

.arrow-label {
  font-size: 0.68rem;
  color: var(--vp-c-text-2);
  writing-mode: vertical-rl;
  white-space: nowrap;
}

.arrow-icon {
  font-size: 1.2rem;
  color: var(--vp-c-brand);
  font-weight: bold;
}

.tree-display {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  line-height: 1.7;
}

.tree-node {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  cursor: default;
  transition: background 0.15s;
}

.tree-node.highlighted {
  background: rgba(59, 130, 246, 0.1);
}

.connector {
  color: var(--vp-c-text-3);
  font-size: 0.7rem;
  flex-shrink: 0;
}

.node-tag {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 3px;
  padding: 0 0.3rem;
  font-weight: 600;
  font-size: 0.72rem;
  color: var(--vp-c-brand);
}

.tree-node.highlighted .node-tag {
  border-color: var(--vp-c-brand);
}

.node-text {
  color: var(--vp-c-text-2);
  font-size: 0.7rem;
}

.dom-explain {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.explain-item {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.6rem;
  display: flex;
  gap: 0.4rem;
}

.explain-icon {
  font-size: 1rem;
  flex-shrink: 0;
}

.explain-content {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.explain-content strong {
  display: block;
  color: var(--vp-c-text-1);
  margin-bottom: 0.15rem;
  font-size: 0.8rem;
}

.explain-content code {
  background: var(--vp-c-bg-alt);
  padding: 0 0.2rem;
  border-radius: 2px;
  font-size: 0.72rem;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
  color: var(--vp-c-text-1);
}

@media (max-width: 720px) {
  .demo-body {
    grid-template-columns: 1fr;
  }
  .arrow-col {
    flex-direction: row;
    padding-top: 0;
  }
  .arrow-label {
    writing-mode: horizontal-tb;
  }
  .dom-explain {
    grid-template-columns: 1fr;
  }
}
</style>
