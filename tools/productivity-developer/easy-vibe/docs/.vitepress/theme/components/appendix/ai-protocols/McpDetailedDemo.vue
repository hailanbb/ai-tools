<template>
  <div class="mcp-detailed-demo">
    <div class="demo-header">
      <span class="title">{{ t('mcpDetailed.title') }}</span>
      <span class="subtitle">{{ t('mcpDetailed.subtitle') }}</span>
    </div>

    <div class="intro-section">
      <div class="section-title">{{ t('mcpDetailed.introTitle') }}</div>
      <p class="intro-text">
        {{ t('mcpDetailed.introText') }}
      </p>
      <div class="popular-uses">
        <div v-for="item in messages.mcpDetailed.popularUses" :key="item.title" class="use-item">
          <div class="use-title">{{ item.title }}</div>
          <div class="use-desc">{{ item.desc }}</div>
        </div>
      </div>
    </div>

    <div class="usage-section">
      <div class="section-title">{{ t('mcpDetailed.usageTitle') }}</div>
      <p class="usage-intro">
        {{ t('mcpDetailed.usageIntro') }}
      </p>
      
      <div class="usage-steps">
        <div v-for="(step, index) in messages.mcpDetailed.usageSteps" :key="step.title" class="usage-step">
          <div class="step-num">{{ index + 1 }}</div>
          <div class="step-content">
            <div class="step-title">{{ step.title }}</div>
            <div class="step-desc">{{ step.desc }}</div>
            <div v-if="step.resources" class="mcp-resources">
              <div v-for="resource in step.resources" :key="resource.href" class="resource-item">
                <span class="resource-name">{{ resource.name }}</span>
                <a :href="resource.href" target="_blank" class="resource-link">{{ resource.label }}</a>
              </div>
            </div>
            <pre v-if="step.codeKey" class="config-example"><code>{{ codeExamples[step.codeKey] }}</code></pre>
          </div>
        </div>
      </div>
      
      <div class="skills-note">
        <div class="note-title">{{ t('mcpDetailed.skillsTitle') }}</div>
        <div class="note-content">
          {{ t('mcpDetailed.skillsText') }}
        </div>
      </div>
      
      <div class="config-locations">
        <div class="config-title">{{ t('mcpDetailed.configTitle') }}</div>
        <div class="config-list">
          <div v-for="item in messages.mcpDetailed.configLocations" :key="item.name" class="config-item">
            <span class="config-name">{{ item.name }}</span>
            <span class="config-path">{{ item.path }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="implement-section">
      <div class="section-title">{{ t('mcpDetailed.implementTitle') }}</div>
      <p class="implement-intro">
        {{ t('mcpDetailed.implementIntro') }}
      </p>
      
      <div class="implement-code">
        <div class="code-title">weather-mcp-server.js</div>
        <pre class="code-block"><code>{{ codeExamples.weatherMcpCode }}</code></pre>
      </div>
      
      <div class="transport-compare">
        <div class="compare-title">{{ t('mcpDetailed.transportCompareTitle') }}</div>
        <div class="compare-grid">
          <div v-for="item in messages.mcpDetailed.transportCompare" :key="item.name" class="compare-item">
            <div class="compare-name">{{ item.name }}</div>
            <div class="compare-desc">
              <p v-for="point in item.points" :key="point">{{ point }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="demo-content">
      <div class="flow-section">
        <div class="flow-title">
          
          {{ t('mcpDetailed.flowTitle') }}
        </div>
        
        <div class="flow-steps">
          <div
            v-for="(step, index) in mcpFlowSteps"
            :key="index"
            class="flow-step-item"
          >
            <div class="step-header" @click="toggleStep(index)">
              <span class="step-num">{{ index + 1 }}</span>
              <span class="step-name">{{ step.name }}</span>
              <span class="step-arrow">{{ expandedStep === index ? '▼' : '▶' }}</span>
            </div>
            <div v-if="expandedStep === index" class="step-detail">
              <div class="step-desc">{{ step.desc }}</div>
              <div class="step-example">
                <div class="example-title">{{ step.example.title }}</div>
                <pre class="example-code"><code>{{ step.example.code }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <details class="tech-details">
        <summary class="tech-summary">
          
          <span class="summary-text">{{ t('mcpDetailed.techJsonRpcTitle') }}</span>
        </summary>
        <div class="tech-content">
          <div class="tech-section">
            <div class="tech-title">{{ t('mcpDetailed.requestTitle') }}</div>
            <pre class="tech-code"><code>{{ codeExamples.jsonRpcRequest }}</code></pre>
          </div>
          <div class="tech-section">
            <div class="tech-title">{{ t('mcpDetailed.responseTitle') }}</div>
            <pre class="tech-code"><code>{{ codeExamples.jsonRpcResponse }}</code></pre>
          </div>
          <div class="tech-note">
            
            <span>{{ t('mcpDetailed.jsonRpcNote') }}</span>
          </div>
        </div>
      </details>

      <details class="tech-details">
        <summary class="tech-summary">
          
          <span class="summary-text">{{ t('mcpDetailed.techTransportTitle') }}</span>
        </summary>
        <div class="tech-content">
          <div class="transport-grid">
            <div v-for="card in messages.mcpDetailed.transportCards" :key="card.name" class="transport-card">
              <div class="transport-header">
                
                <span class="transport-name">{{ card.name }}</span>
              </div>
              <div class="transport-desc">
                {{ card.desc }}
              </div>
              <div class="transport-example">
                <pre><code>{{ codeExamples[card.codeKey] }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </details>

      <details class="tech-details">
        <summary class="tech-summary">
          
          <span class="summary-text">{{ t('mcpDetailed.techApiTitle') }}</span>
        </summary>
        <div class="tech-content">
          <div class="api-list">
            <div v-for="api in messages.mcpDetailed.apis" :key="api.method" class="api-item">
              <div class="api-method">
                <span class="method-badge">{{ api.method }}</span>
                <span class="method-name">{{ api.name }}</span>
              </div>
              <div class="api-desc">{{ api.desc }}</div>
            </div>
          </div>
        </div>
      </details>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { aiProtocolsLocale } from '../../../locales/ai-protocols/index.js'

const expandedStep = ref(0)
const { t, messages } = useI18n(aiProtocolsLocale)
const mcpFlowSteps = computed(() => messages.value.mcpDetailed.flowSteps)
const codeExamples = computed(() => messages.value.mcpDetailed.codeExamples)

const toggleStep = (index) => {
  expandedStep.value = expandedStep.value === index ? -1 : index
}

</script>

<style scoped>
.mcp-detailed-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
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

.flow-section {
  margin-bottom: 1rem;
}

.flow-title {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.title-icon {
  font-size: 1rem;
}

.flow-steps {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.flow-step-item {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.step-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  background: var(--vp-c-bg-soft);
  transition: background 0.2s;
}

.step-header:hover {
  background: var(--vp-c-bg-alt);
}

.step-num {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b82f6;
  color: white;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.step-name {
  flex: 1;
  font-size: 0.85rem;
  font-weight: 500;
}

.step-arrow {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.step-detail {
  padding: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
}

.step-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.step-example {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.5rem;
}

.example-title {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.3rem;
}

.example-code {
  font-size: 0.7rem;
  background: var(--vp-c-bg);
  padding: 0.5rem;
  border-radius: 4px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: var(--vp-font-family-mono);
  margin: 0;
  line-height: 1.4;
}

.tech-details {
  margin-bottom: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.tech-summary {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 0.75rem;
  cursor: pointer;
  background: var(--vp-c-bg-soft);
  font-size: 0.85rem;
  font-weight: 500;
  list-style: none;
}

.tech-summary::-webkit-details-marker {
  display: none;
}

.summary-icon {
  font-size: 0.9rem;
}

.tech-content {
  padding: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.tech-section {
  margin-bottom: 0.75rem;
}

.tech-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.4rem;
}

.tech-code {
  font-size: 0.7rem;
  background: var(--vp-c-bg-soft);
  padding: 0.5rem;
  border-radius: 4px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: var(--vp-font-family-mono);
  margin: 0;
  line-height: 1.4;
}

.tech-note {
  display: flex;
  align-items: flex-start;
  gap: 0.3rem;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.note-icon {
  flex-shrink: 0;
}

.tech-note code {
  background: var(--vp-c-bg);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-size: 0.7rem;
}

.transport-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.transport-card {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.5rem;
}

.transport-header {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.3rem;
}

.transport-icon {
  font-size: 0.9rem;
}

.transport-name {
  font-size: 0.8rem;
  font-weight: 600;
}

.transport-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.4rem;
}

.transport-example pre {
  font-size: 0.65rem;
  background: var(--vp-c-bg);
  padding: 0.4rem;
  border-radius: 4px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: var(--vp-font-family-mono);
  margin: 0;
  line-height: 1.3;
}

.api-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.api-item {
  padding: 0.4rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.api-method {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.2rem;
}

.method-badge {
  font-size: 0.6rem;
  background: #3b82f6;
  color: white;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-family: var(--vp-font-family-mono);
}

.method-name {
  font-size: 0.8rem;
  font-weight: 600;
}

.api-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
  .transport-grid {
    grid-template-columns: 1fr;
  }
}

.intro-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.intro-section .section-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.intro-section .intro-text {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.popular-uses {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.use-item {
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.use-title {
  font-weight: 600;
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
}

.use-desc {
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}

@media (max-width: 640px) {
  .popular-uses {
    grid-template-columns: 1fr;
  }
}

.usage-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.usage-section .section-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.usage-intro {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.usage-intro code {
  background: var(--vp-c-bg-alt);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-size: 0.8rem;
}

.usage-steps {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.usage-step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.usage-step .step-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.usage-step .step-content {
  flex: 1;
}

.usage-step .step-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
}

.usage-step .step-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.usage-step .step-desc a {
  color: var(--vp-c-brand);
}

.config-example {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  overflow-x: auto;
}

.config-example code {
  font-size: 0.7rem;
  line-height: 1.4;
}

.config-locations {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.config-title {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.config-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.config-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
}

.config-name {
  font-weight: 500;
  color: var(--vp-c-text-1);
  min-width: 100px;
}

.config-path {
  color: var(--vp-c-text-2);
  font-family: monospace;
  font-size: 0.7rem;
}

.mcp-resources {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.resource-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
}

.resource-name {
  font-weight: 500;
  color: var(--vp-c-text-1);
  min-width: 120px;
}

.resource-link {
  color: var(--vp-c-brand);
  font-size: 0.7rem;
}

.skills-note {
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  border-left: 3px solid #f59e0b;
}

.skills-note .note-title {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.3rem;
}

.skills-note .note-content {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.implement-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.implement-section .section-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.implement-intro {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.implement-code {
  margin-bottom: 1rem;
}

.code-title {
  font-weight: 500;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.3rem;
}

.code-block {
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  overflow-x: auto;
}

.code-block code {
  font-size: 0.65rem;
  line-height: 1.4;
}

.transport-compare {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.compare-title {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.compare-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.compare-item {
  padding: 0.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
}

.compare-name {
  font-weight: 600;
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.3rem;
}

.compare-desc p {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  line-height: 1.3;
  margin: 0.2rem 0;
}

.compare-desc strong {
  color: var(--vp-c-text-1);
}

@media (max-width: 640px) {
  .compare-grid {
    grid-template-columns: 1fr;
  }
}
</style>
