<template>
  <div class="source-map-demo">
    <div class="demo-header">
      <h3>🗺️ {{ t('sourceMap.title') }}</h3>
      <p>{{ t('sourceMap.subtitle') }}</p>
    </div>

    <div class="demo-content">
      <div class="code-comparison">
        <div class="code-panel source">
          <div class="panel-title">
            📄 {{ t('sourceMap.sourceLabel') }}
          </div>
          <pre class="code-block"><code>{{ sourceCode }}</code></pre>
        </div>

        <div class="mapping-arrows">
          <div
            v-for="i in 5"
            :key="i"
            class="arrow"
          >
            <span class="line" />
            <span class="point">→</span>
          </div>
        </div>

        <div class="code-panel minified">
          <div class="panel-title">
            🔧 {{ t('sourceMap.minifiedLabel') }}
          </div>
          <pre class="code-block"><code>{{ minifiedCode }}</code></pre>
        </div>
      </div>

      <div class="sourcemap-explanation">
        <div class="explanation-section">
          <h4>📦 {{ t('sourceMap.sourceMapContent') }}</h4>
          <pre class="json-block"><code>{
  "version": 3,
  "sources": ["src/utils.js", "src/main.js"],
  "names": ["calculateSum", "a", "b", "result"],
  "mappings": "AAAA,SAASA...",
  "file": "app.min.js"
}</code></pre>
          <ul class="field-explanation">
            <li><strong>version</strong>: {{ t('sourceMap.fieldVersion') }}</li>
            <li><strong>sources</strong>: {{ t('sourceMap.fieldSources') }}</li>
            <li><strong>names</strong>: {{ t('sourceMap.fieldNames') }}</li>
            <li><strong>mappings</strong>: {{ t('sourceMap.fieldMappings') }}</li>
            <li><strong>file</strong>: {{ t('sourceMap.fieldFile') }}</li>
          </ul>
        </div>

        <div class="tips-section">
          <h4>💡 {{ t('sourceMap.tipsTitle') }}</h4>
          <div class="tips-grid">
            <div class="tip-item">
              <span class="tip-icon">🚀</span>
              <div class="tip-content">
                <strong>{{ t('sourceMap.tipDevTitle') }}</strong>
                <p>{{ t('sourceMap.tipDevDesc') }}</p>
              </div>
            </div>
            <div class="tip-item">
              <span class="tip-icon">🔒</span>
              <div class="tip-content">
                <strong>{{ t('sourceMap.tipProdTitle') }}</strong>
                <p>{{ t('sourceMap.tipProdDesc') }}</p>
              </div>
            </div>
            <div class="tip-item">
              <span class="tip-icon">🗂️</span>
              <div class="tip-content">
                <strong>{{ t('sourceMap.tipSeparateTitle') }}</strong>
                <p>{{ t('sourceMap.tipSeparateDesc') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <p>
        <span class="icon">💡</span>
        <strong>{{ t('sourceMap.infoBoxTitle') }}</strong>
        {{ t('sourceMap.infoBoxContent') }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { frontendEngineeringLocale } from '../../../locales/frontend-engineering/index.js'

const { t } = useI18n(frontendEngineeringLocale)

const sourceCode = computed(() => {
  return `function calculateSum(a, b) {
  // ${t('sourceMap.sourceCodeComment1')}
  const result = a + b;
  console.log('${t('sourceMap.sourceCodeLog1')}', result);
  return result;
}

const sum = calculateSum(10, 20);
console.log('${t('sourceMap.sourceCodeLog2')}', sum);`
})

const minifiedCode = computed(() => {
  return `function n(n,r){var t=n+r;return console.log("${t('sourceMap.sourceCodeLog1')}",t),t}var r=n(10,20);console.log("${t('sourceMap.sourceCodeLog2')}",r);
// sourceMappingURL=app.js.map (${t('sourceMap.sourceMapUrlComment')})`
})
</script>

<style scoped>
.source-map-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  font-family: var(--vp-font-family-mono);
}

.demo-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.demo-header p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.demo-content {
  margin-top: 1rem;
}

.code-comparison {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .code-comparison {
    grid-template-columns: 1fr;
  }

  .mapping-arrows {
    display: none;
  }
}

.code-panel {
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

.code-panel .panel-title {
  background: var(--vp-c-bg-soft);
  padding: 0.4rem 0.6rem;
  font-size: 0.8rem;
  font-weight: 600;
  border-bottom: 1px solid var(--vp-c-divider);
}

.code-block {
  padding: 0.6rem;
  font-size: 0.75rem;
  line-height: 1.5;
  margin: 0;
  overflow-x: auto;
  color: var(--vp-c-text-1);
}

.mapping-arrows {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
}

.arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
}

.arrow .line {
  width: 20px;
  height: 1px;
  background: var(--vp-c-brand);
}

.arrow .point {
  color: var(--vp-c-brand);
  font-size: 0.8rem;
  margin-left: -2px;
}

.sourcemap-explanation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 768px) {
  .sourcemap-explanation {
    grid-template-columns: 1fr;
  }
}

.explanation-section,
.tips-section {
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  padding: 0.75rem;
}

.explanation-section h4,
.tips-section h4 {
  margin: 0 0 0.75rem 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.json-block {
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 0.7rem;
  line-height: 1.4;
  overflow-x: auto;
  margin: 0 0 0.75rem 0;
  color: var(--vp-c-text-1);
}

.field-explanation {
  margin: 0;
  padding-left: 1rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.field-explanation li {
  margin-bottom: 0.25rem;
}

.field-explanation strong {
  color: var(--vp-c-text-1);
}

.tips-grid {
  display: grid;
  gap: 0.5rem;
}

.tip-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.tip-icon {
  font-size: 1.1rem;
  line-height: 1;
}

.tip-content strong {
  display: block;
  font-size: 0.8rem;
  margin-bottom: 0.1rem;
  color: var(--vp-c-text-1);
}

.tip-content p {
  margin: 0;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}

.info-box {
  background-color: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.5rem;
}
</style>
