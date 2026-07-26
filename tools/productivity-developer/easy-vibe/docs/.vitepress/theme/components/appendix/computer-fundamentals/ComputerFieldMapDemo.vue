<template>
  <div class="field-map-demo">
    <div class="demo-header">
      <span class="title">{{ t('computerOrganization.vibeCodingFullstack.fieldMap.title') }}</span>
      <span class="subtitle">{{ t('computerOrganization.vibeCodingFullstack.fieldMap.subtitle') }}</span>
    </div>

    <div class="field-grid">
      <div
        v-for="field in fields"
        :key="field.name"
        class="field-card"
      >
        <div class="field-name">{{ field.name }}</div>
        <div class="field-desc">{{ field.desc }}</div>
        <div class="field-techs">
          <span v-for="tech in field.techs" :key="tech" class="tech-tag">{{ tech }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ t('computerOrganization.vibeCodingFullstack.fieldMap.adviceLabel') }}</strong>{{ t('computerOrganization.vibeCodingFullstack.fieldMap.advice') }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals/index.js'

const { t, messages } = useI18n(computerFundamentalsLocale)
const fields = computed(() => messages.value.computerOrganization.vibeCodingFullstack.fieldMap.fields)
</script>

<style scoped>
.field-map-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.subtitle {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.field-card {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.field-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.field-desc {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.5rem;
}

.field-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.tech-tag {
  font-size: 0.68rem;
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  color: var(--vp-c-text-2);
}

.info-box {
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  border-left: 3px solid var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .field-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
