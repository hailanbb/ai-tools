<template>
  <div class="mcp-visual-demo">
    <div class="section-title">{{ t('mcpVisual.title') }}</div>

    <div class="intro-text">
      {{ t('mcpVisual.introBefore') }}<strong>{{ t('mcpVisual.introStrong') }}</strong>{{ t('mcpVisual.introAfter') }}
    </div>

    <div class="section-title">{{ t('mcpVisual.capabilityTitle') }}</div>

    <div class="capability-table">
      <div class="table-header">
        <div class="col-capability">{{ messages.mcpVisual.tableHeaders[0] }}</div>
        <div class="col-english">{{ messages.mcpVisual.tableHeaders[1] }}</div>
        <div class="col-role">{{ messages.mcpVisual.tableHeaders[2] }}</div>
        <div class="col-example">{{ messages.mcpVisual.tableHeaders[3] }}</div>
      </div>
      <div v-for="capability in messages.mcpVisual.capabilities" :key="capability.english" class="table-row">
        <div class="col-capability"><strong>{{ capability.name }}</strong></div>
        <div class="col-english">{{ capability.english }}</div>
        <div class="col-role">{{ capability.role }}</div>
        <div class="col-example">{{ capability.example }}</div>
      </div>
    </div>

    <div class="section-title">{{ t('mcpVisual.useCaseTitle') }}</div>

    <div class="use-cases">
      <div v-for="useCase in messages.mcpVisual.useCases" :key="useCase.title" class="use-case">
        <div class="use-case-title">{{ useCase.title }}</div>
        <div class="use-case-desc">{{ useCase.desc }}</div>
      </div>
    </div>

    <div class="section-title">{{ t('mcpVisual.usageTitle') }}</div>

    <div class="usage-steps">
      <div v-for="(step, index) in messages.mcpVisual.steps" :key="step.title" class="step">
        <div class="step-num">{{ index + 1 }}</div>
        <div class="step-content">
          <div class="step-title">{{ step.title }}</div>
          <div class="step-desc">{{ step.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from '../../../composables/useI18n.js'
import { aiProtocolsLocale } from '../../../locales/ai-protocols/index.js'

const { t, messages } = useI18n(aiProtocolsLocale)
</script>

<style scoped>
.mcp-visual-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 1.25rem;
  margin: 1rem 0;
}

.section-title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
  margin-top: 1.25rem;
}

.section-title:first-child {
  margin-top: 0;
}

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.intro-text strong {
  color: var(--vp-c-brand);
}

.capability-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.table-header {
  display: flex;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  font-weight: 600;
  font-size: 0.8rem;
}

.table-row {
  display: flex;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.8rem;
}

.table-row:last-child {
  border-bottom: none;
}

.col-capability {
  width: 15%;
  padding: 0.5rem 0.6rem;
  color: var(--vp-c-text-1);
}

.col-english {
  width: 18%;
  padding: 0.5rem 0.6rem;
  color: var(--vp-c-text-2);
}

.col-role {
  width: 32%;
  padding: 0.5rem 0.6rem;
  color: var(--vp-c-text-2);
}

.col-example {
  width: 35%;
  padding: 0.5rem 0.6rem;
  color: var(--vp-c-text-3);
}

.use-cases {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.use-case {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.use-case-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.3rem;
}

.use-case-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.usage-steps {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.step-num {
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

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
}

.step-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

@media (max-width: 640px) {
  .table-header,
  .table-row {
    flex-direction: column;
  }

  .col-capability,
  .col-english,
  .col-role,
  .col-example {
    width: 100%;
    padding: 0.35rem 0.6rem;
  }

  .table-header {
    display: none;
  }

  .table-row {
    padding: 0.5rem 0;
  }

  .col-capability {
    font-size: 0.85rem;
    padding-bottom: 0.2rem;
  }

  .col-english {
    font-size: 0.75rem;
    padding-top: 0;
    padding-bottom: 0.2rem;
  }

  .col-role {
    font-size: 0.8rem;
    padding-top: 0;
    padding-bottom: 0.2rem;
  }

  .col-example {
    font-size: 0.75rem;
    padding-top: 0;
  }
}
</style>
