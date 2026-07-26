<template>
  <div class="protocol-comparison-demo">
    <div class="demo-header">
      <span class="title">MCP vs A2A</span>
      <span class="subtitle">{{ t('protocolComparison.subtitle') }}</span>
    </div>

    <div class="intro-text">
      {{ t('protocolComparison.introBefore') }}<span class="highlight">{{ t('protocolComparison.introHighlight') }}</span>{{ t('protocolComparison.introAfter') }}
    </div>

    <div class="protocol-cards">
      <div
        v-for="card in messages.protocolComparison.cards"
        :key="card.key"
        class="protocol-card"
        :class="card.key"
      >
        <div class="card-header">
          <span class="card-title">{{ card.title }}</span>
          <span class="card-badge">{{ card.badge }}</span>
        </div>
        <div class="card-fullname">{{ card.fullname }}</div>
        <div class="card-desc">{{ card.desc }}</div>
        <div class="card-meta">
          <div class="meta-item">
            <span class="meta-label">{{ t('protocolComparison.labels.initiator') }}</span>
            <span class="meta-value">{{ card.initiator }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">{{ t('protocolComparison.labels.release') }}</span>
            <span class="meta-value">{{ card.release }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">{{ t('protocolComparison.labels.architecture') }}</span>
            <span class="meta-value">{{ card.architecture }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">{{ t('protocolComparison.labels.format') }}</span>
            <span class="meta-value">{{ card.format }}</span>
          </div>
        </div>
        <div class="card-analogy">
          <span class="analogy-label">{{ t('protocolComparison.labels.analogy') }}</span>
          <span class="analogy-text">{{ card.analogy }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ t('protocolComparison.infoPrefix') }}</strong>{{ t('protocolComparison.infoText') }}
    </div>
  </div>
</template>

<script setup>
import { useI18n } from '../../../composables/useI18n.js'
import { aiProtocolsLocale } from '../../../locales/ai-protocols/index.js'

const { t, messages } = useI18n(aiProtocolsLocale)
</script>

<style scoped>
.protocol-comparison-demo {
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
  margin-bottom: 0.75rem;
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

.intro-text {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.intro-text .highlight {
  color: var(--vp-c-brand);
  font-weight: 500;
}

.protocol-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.protocol-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
  background: var(--vp-c-bg);
}

.protocol-card.mcp {
  border-left: 3px solid #3b82f6;
}

.protocol-card.a2a {
  border-left: 3px solid #10b981;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}

.card-icon {
  font-size: 1.25rem;
}

.card-title {
  font-weight: bold;
  font-size: 1.1rem;
}

.card-badge {
  font-size: 0.7rem;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  margin-left: auto;
}

.protocol-card.mcp .card-badge {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
}

.protocol-card.a2a .card-badge {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
}

.card-fullname {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.4rem;
}

.card-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
  margin-bottom: 0.6rem;
}

.card-meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.4rem;
  margin-bottom: 0.6rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.meta-label {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
}

.meta-value {
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.card-analogy {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
}

.analogy-label {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.analogy-text {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
  align-items: flex-start;
}

.info-box .icon {
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .protocol-cards {
    grid-template-columns: 1fr;
  }
}
</style>
