<template>
  <div class="fullstack-demo">
    <div class="demo-header">
      <span class="title">{{ t('computerOrganization.vibeCodingFullstack.fullstackSkill.title') }}</span>
      <span class="subtitle">{{ t('computerOrganization.vibeCodingFullstack.fullstackSkill.subtitle') }}</span>
    </div>

    <div class="skill-sections">
      <div class="skill-section">
        <div class="section-title">{{ t('computerOrganization.vibeCodingFullstack.fullstackSkill.frontendTitle') }}</div>
        <div class="skill-list">
          <div v-for="skill in frontendSkills" :key="skill" class="skill-item">{{ skill }}</div>
        </div>
      </div>

      <div class="skill-section bridge">
        <div class="section-title">{{ t('computerOrganization.vibeCodingFullstack.fullstackSkill.bridgeTitle') }}</div>
        <div class="skill-list">
          <div v-for="skill in bridgeSkills" :key="skill" class="skill-item highlight">{{ skill }}</div>
        </div>
      </div>

      <div class="skill-section">
        <div class="section-title">{{ t('computerOrganization.vibeCodingFullstack.fullstackSkill.backendTitle') }}</div>
        <div class="skill-list">
          <div v-for="skill in backendSkills" :key="skill" class="skill-item">{{ skill }}</div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ t('computerOrganization.vibeCodingFullstack.fullstackSkill.noteLabel') }}</strong>{{ t('computerOrganization.vibeCodingFullstack.fullstackSkill.note') }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals/index.js'

const { t, messages } = useI18n(computerFundamentalsLocale)

const frontendSkills = computed(() => messages.value.computerOrganization.vibeCodingFullstack.fullstackSkill.frontendSkills)
const backendSkills = computed(() => messages.value.computerOrganization.vibeCodingFullstack.fullstackSkill.backendSkills)
const bridgeSkills = computed(() => messages.value.computerOrganization.vibeCodingFullstack.fullstackSkill.bridgeSkills)
</script>

<style scoped>
.fullstack-demo {
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

.skill-sections {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.75rem;
}

.skill-section {
  padding: 0.6rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.skill-section.bridge {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-brand-1);
}

.section-title {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  padding-bottom: 0.35rem;
  border-bottom: 1px dashed var(--vp-c-divider);
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.skill-item {
  font-size: 0.72rem;
  padding: 0.25rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  color: var(--vp-c-text-2);
}

.skill-item.highlight {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
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
  .skill-sections {
    grid-template-columns: 1fr;
  }
}
</style>
