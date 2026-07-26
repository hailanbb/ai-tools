<template>
  <div class="ast-visualizer-demo">
    <h4>{{ t('compilers.ast.title') }}</h4>
    <p class="desc">{{ t('compilers.ast.desc') }}</p>

    <div class="expr-selector">
      <button
        v-for="(ex, i) in expressions"
        :key="i"
        :class="['expr-btn', { active: selected === i }]"
        @click="selected = i"
      >
        <code>{{ ex.code }}</code>
      </button>
    </div>

    <div class="ast-container">
      <div class="tree-view">
        <div class="tree-title">{{ t('compilers.ast.treeTitle') }}</div>
        <div class="tree-nodes">
          <ASTNode
            :node="expressions[selected].tree"
            :depth="0"
          />
        </div>
      </div>

      <div class="explain-view">
        <div class="explain-title">{{ t('compilers.ast.explainTitle') }}</div>
        <div class="explain-list">
          <div v-for="(step, j) in expressions[selected].explains" :key="j" class="explain-item">
            <span class="explain-num">{{ j + 1 }}</span>
            <span>{{ step }}</span>
          </div>
        </div>
        <div class="tool-tip">
          {{ t('compilers.ast.toolTipPrefix') }}
          <a href="https://astexplorer.net/" target="_blank">AST Explorer</a>
          {{ t('compilers.ast.toolTipSuffix') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, h, defineComponent } from 'vue'
import { useI18n } from '../../../composables/useI18n'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals'

const { t, messages } = useI18n(computerFundamentalsLocale)

const selected = ref(0)

const ASTNode = defineComponent({
  name: 'ASTNode',
  props: {
    node: {
      type: Object,
      default: () => ({})
    },
    depth: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    return () => {
      const n = props.node
      const children = []

      children.push(
        h('div', { class: 'node-box', style: { marginLeft: props.depth * 24 + 'px' } }, [
          h('span', { class: 'node-type' }, n.type),
          n.value ? h('span', { class: 'node-value' }, n.value) : null
        ])
      )

      if (n.children) {
        for (const child of n.children) {
          children.push(h(ASTNode, { node: child, depth: props.depth + 1 }))
        }
      }

      return h('div', { class: 'node-wrapper' }, children)
    }
  }
})

const expressions = computed(() => messages.value.compilers.ast.expressions)
</script>

<style scoped>
.ast-visualizer-demo {
  padding: 20px; border: 1px solid var(--vp-c-divider);
  border-radius: 12px; margin: 16px 0; background: var(--vp-c-bg-soft);
}
h4 { margin: 0 0 4px; }
.desc { color: var(--vp-c-text-2); font-size: 14px; margin: 0 0 16px; }
.expr-selector { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
.expr-btn {
  padding: 6px 14px; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 13px; transition: all 0.2s;
}
.expr-btn.active { background: var(--vp-c-brand-1); color: #fff; border-color: var(--vp-c-brand-1); }
.expr-btn code { font-size: 13px; }
.ast-container { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.tree-view, .explain-view {
  border: 1px solid var(--vp-c-divider); border-radius: 8px;
  background: var(--vp-c-bg); overflow: hidden;
}
.tree-title, .explain-title {
  padding: 8px 12px; font-weight: 600; font-size: 13px;
  background: var(--vp-c-bg-soft); border-bottom: 1px solid var(--vp-c-divider);
}
.tree-nodes { padding: 12px; }
:deep(.node-box) {
  display: flex; align-items: center; gap: 6px; padding: 3px 0;
}
:deep(.node-type) {
  padding: 2px 8px; background: #dbeafe; color: #1e40af;
  border-radius: 4px; font-size: 12px; font-weight: 500;
}
:deep(.node-value) {
  padding: 2px 6px; background: #fef3c7; color: #92400e;
  border-radius: 4px; font-size: 12px; font-family: 'Fira Code', monospace;
}
.explain-list { padding: 10px 12px; }
.explain-item { display: flex; align-items: flex-start; gap: 8px; padding: 4px 0; font-size: 13px; }
.explain-num {
  width: 20px; height: 20px; border-radius: 50%; background: var(--vp-c-brand-1);
  color: #fff; display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 600; flex-shrink: 0;
}
.tool-tip {
  padding: 8px 12px; font-size: 12px; color: var(--vp-c-text-2);
  border-top: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
}
.tool-tip a { color: var(--vp-c-brand-1); }
@media (max-width: 640px) { .ast-container { grid-template-columns: 1fr; } }
</style>
