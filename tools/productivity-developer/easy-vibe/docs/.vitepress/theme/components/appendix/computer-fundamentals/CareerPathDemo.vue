<template>
  <div class="career-path-demo">
    <div class="demo-header">
      <span class="title">{{ t('computerOrganization.vibeCodingFullstack.careerPath.title') }}</span>
      <span class="subtitle">{{ t('computerOrganization.vibeCodingFullstack.careerPath.subtitle') }}</span>
    </div>

    <div class="path-container">
      <div
        v-for="stage in stages"
        :key="stage.name"
        class="stage-card"
      >
        <div class="stage-header">
          <span class="stage-icon">{{ stage.icon }}</span>
          <span class="stage-name">{{ stage.name }}</span>
          <span class="stage-time">{{ stage.time }}</span>
        </div>
        <div class="stage-content">
          <div class="stage-desc">{{ stage.desc }}</div>
          <div class="stage-skills">
            <span class="skill-label">{{ t('computerOrganization.vibeCodingFullstack.careerPath.skillLabel') }}</span>
            <div class="skill-tags">
              <span v-for="skill in stage.skills" :key="skill" class="skill-tag">
                {{ skill }}
              </span>
            </div>
          </div>
          <div class="stage-output">
            <span class="output-label">{{ t('computerOrganization.vibeCodingFullstack.careerPath.outputLabel') }}</span>
            <span class="output-text">{{ stage.output }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ t('computerOrganization.vibeCodingFullstack.careerPath.keyLabel') }}</strong>{{ t('computerOrganization.vibeCodingFullstack.careerPath.key') }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals/index.js'

const { t, messages } = useI18n(computerFundamentalsLocale)
const stages = computed(() => messages.value.computerOrganization.vibeCodingFullstack.careerPath.stages)
</script>

<style scoped>
.career-path-demo {
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

.path-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stage-card {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.stage-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.stage-icon {
  font-size: 1.1rem;
}

.stage-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.stage-time {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
  margin-left: auto;
}

.stage-content {
  padding-left: 1.6rem;
}

.stage-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.stage-skills {
  margin-bottom: 0.35rem;
}

.skill-label,
.output-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-right: 0.35rem;
}

.skill-tags {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 0.2rem;
}

.skill-tag {
  font-size: 0.68rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
}

.stage-output {
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
}

.output-text {
  color: var(--vp-c-text-1);
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
  .stage-content {
    padding-left: 0;
  }
}
</style>
