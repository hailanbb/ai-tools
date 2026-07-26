<template>
  <div class="a2a-detailed-demo">
    <div class="demo-header">
      <span class="title">{{ t('a2aDetailed.title') }}</span>
      <span class="subtitle">{{ t('a2aDetailed.subtitle') }}</span>
    </div>

    <div class="intro-section">
      <div class="section-title">{{ t('a2aDetailed.introTitle') }}</div>
      <p class="intro-text">
        {{ t('a2aDetailed.introText') }}
      </p>
      <div class="popular-uses">
        <div v-for="item in messages.a2aDetailed.popularUses" :key="item.title" class="use-item">
          <div class="use-title">{{ item.title }}</div>
          <div class="use-desc">{{ item.desc }}</div>
        </div>
      </div>
    </div>

    <div class="usage-section">
      <div class="section-title">{{ t('a2aDetailed.usageTitle') }}</div>
      <p class="usage-intro">
        {{ t('a2aDetailed.usageIntro') }}
      </p>
      
      <div class="usage-steps">
        <div v-for="(step, index) in messages.a2aDetailed.usageSteps" :key="step.title" class="usage-step">
          <div class="step-num">{{ index + 1 }}</div>
          <div class="step-content">
            <div class="step-title">{{ step.title }}</div>
            <div class="step-desc">{{ step.desc }}</div>
          </div>
        </div>
      </div>
      
      <div class="usage-note">
        <div class="note-title">{{ t('a2aDetailed.statusTitle') }}</div>
        <div class="note-content">
          {{ t('a2aDetailed.statusTextBefore') }}<a href="https://google.github.io/A2A" target="_blank">{{ t('a2aDetailed.statusLinkText') }}</a>{{ t('a2aDetailed.statusTextAfter') }}
        </div>
      </div>
    </div>

    <div class="demo-content">
      <div class="flow-section">
        <div class="flow-title">
          
          {{ t('a2aDetailed.flowTitle') }}
        </div>
        
        <div class="flow-steps">
          <div
            v-for="(step, index) in a2aFlowSteps"
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
          
          <span class="summary-text">{{ t('a2aDetailed.techAgentCardTitle') }}</span>
        </summary>
        <div class="tech-content">
          <div class="tech-intro">
            {{ t('a2aDetailed.agentCardIntro') }}
          </div>
          <div class="tech-section">
            <div class="tech-title">{{ t('a2aDetailed.agentCardExampleTitle') }}</div>
            <pre class="tech-code"><code>{{ codeExamples.agentCardExample }}</code></pre>
          </div>
          <div class="tech-note">
            
            <span>{{ t('a2aDetailed.agentCardNote') }}</span>
          </div>
        </div>
      </details>

      <details class="tech-details">
        <summary class="tech-summary">
          
          <span class="summary-text">{{ t('a2aDetailed.techHttpTitle') }}</span>
        </summary>
        <div class="tech-content">
          <div class="tech-section">
            <div class="tech-title">{{ t('a2aDetailed.taskSendTitle') }}</div>
            <pre class="tech-code"><code>{{ codeExamples.taskSendExample }}</code></pre>
          </div>
          <div class="tech-section">
            <div class="tech-title">{{ t('a2aDetailed.sseTitle') }}</div>
            <pre class="tech-code"><code>{{ codeExamples.sseExample }}</code></pre>
          </div>
          <div class="tech-note">
            <span>{{ t('a2aDetailed.sseNote') }}</span>
          </div>
        </div>
      </details>

      <details class="tech-details">
        <summary class="tech-summary">
          
          <span class="summary-text">{{ t('a2aDetailed.techApiTitle') }}</span>
        </summary>
        <div class="tech-content">
          <div class="api-list">
            <div v-for="api in messages.a2aDetailed.apis" :key="api.name" class="api-item">
              <div class="api-method">
                <span class="method-badge">{{ api.method }}</span>
                <span class="method-name">{{ api.name }}</span>
              </div>
              <div class="api-desc">{{ api.desc }}</div>
            </div>
          </div>
        </div>
      </details>

      <details class="tech-details">
        <summary class="tech-summary">
          
          <span class="summary-text">{{ t('a2aDetailed.techAuthTitle') }}</span>
        </summary>
        <div class="tech-content">
          <div class="auth-grid">
            <div v-for="card in messages.a2aDetailed.authCards" :key="card.name" class="auth-card">
              <div class="auth-header">
                
                <span class="auth-name">{{ card.name }}</span>
              </div>
              <div class="auth-desc">
                {{ card.desc }}
              </div>
              <pre class="auth-example"><code>{{ codeExamples[card.codeKey] }}</code></pre>
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
const a2aFlowSteps = computed(() => messages.value.a2aDetailed.flowSteps)
const codeExamples = computed(() => messages.value.a2aDetailed.codeExamples)

const toggleStep = (index) => {
  expandedStep.value = expandedStep.value === index ? -1 : index
}

</script>

<style scoped>
.a2a-detailed-demo {
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
  background: #10b981;
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

.tech-intro {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.tech-intro code {
  background: var(--vp-c-bg);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-size: 0.75rem;
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
  background: #10b981;
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

.auth-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.auth-card {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.5rem;
}

.auth-header {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.3rem;
}

.auth-icon {
  font-size: 0.9rem;
}

.auth-name {
  font-size: 0.8rem;
  font-weight: 600;
}

.auth-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.4rem;
}

.auth-example pre {
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

@media (max-width: 640px) {
  .auth-grid {
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

.usage-step .step-desc code {
  background: var(--vp-c-bg-alt);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-size: 0.75rem;
}

.usage-note {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.note-title {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.3rem;
}

.note-content {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.note-content a {
  color: var(--vp-c-brand);
}
</style>
