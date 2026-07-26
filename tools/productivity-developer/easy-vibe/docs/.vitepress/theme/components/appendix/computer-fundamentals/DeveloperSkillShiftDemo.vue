<template>
  <div class="skill-shift-demo">
    <div class="demo-header">
      <span class="title">{{ t('computerOrganization.vibeCodingFullstack.skillShift.title') }}</span>
      <span class="subtitle">{{ t('computerOrganization.vibeCodingFullstack.skillShift.subtitle') }}</span>
    </div>

    <div class="comparison-grid">
      <div class="column">
        <div class="column-title">{{ t('computerOrganization.vibeCodingFullstack.skillShift.beforeTitle') }}</div>
        <div class="skill-list">
          <div v-for="skill in beforeSkills" :key="skill.name" class="skill-item">
            <span class="skill-name">{{ skill.name }}</span>
            <div class="skill-bar">
              <div class="bar-fill before" :style="{ width: skill.level + '%' }"></div>
            </div>
            <span class="skill-desc">{{ skill.desc }}</span>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="column-title">{{ t('computerOrganization.vibeCodingFullstack.skillShift.afterTitle') }}</div>
        <div class="skill-list">
          <div v-for="skill in afterSkills" :key="skill.name" class="skill-item">
            <span class="skill-name">{{ skill.name }}</span>
            <div class="skill-bar">
              <div class="bar-fill after" :style="{ width: skill.level + '%' }"></div>
            </div>
            <span class="skill-desc">{{ skill.desc }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ t('computerOrganization.vibeCodingFullstack.skillShift.insightLabel') }}</strong>{{ t('computerOrganization.vibeCodingFullstack.skillShift.insight') }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals/index.js'

const { t, messages } = useI18n(computerFundamentalsLocale)

const beforeSkills = computed(() => messages.value.computerOrganization.vibeCodingFullstack.skillShift.beforeSkills)
const afterSkills = computed(() => messages.value.computerOrganization.vibeCodingFullstack.skillShift.afterSkills)
</script>

<style scoped>
.skill-shift-demo {
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

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.column-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed var(--vp-c-divider);
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.skill-name {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.skill-bar {
  height: 6px;
  background: var(--vp-c-divider);
  border-radius: 3px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.bar-fill.before {
  background: var(--vp-c-text-3);
}

.bar-fill.after {
  background: var(--vp-c-brand-1);
}

.skill-desc {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
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
  .comparison-grid {
    grid-template-columns: 1fr;
  }
}
</style>
