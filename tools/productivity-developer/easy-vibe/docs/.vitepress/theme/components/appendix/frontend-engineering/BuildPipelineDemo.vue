<template>
  <div class="build-pipeline-demo">
    <div class="demo-header">
      <span class="icon">🏭</span>
      <span class="title">{{ t('buildPipeline.title') }}</span>
      <span class="subtitle">{{ t('buildPipeline.subtitle') }}</span>
    </div>

    <div class="intro-text">
      {{ t('buildPipeline.introPrefix') }}<span class="highlight">{{ t('buildPipeline.introHighlight') }}</span>{{ t('buildPipeline.introSuffix') }}
    </div>

    <div class="pipeline">
      <div
        v-for="(stage, i) in stages"
        :key="stage.id"
        class="stage"
        :class="{ active: activeStage === stage.id }"
        @click="activeStage = activeStage === stage.id ? null : stage.id"
      >
        <div class="stage-icon">
          {{ stage.icon }}
        </div>
        <div class="stage-name">
          {{ stage.name }}
        </div>
        <div class="stage-simple">
          {{ stage.simple }}
        </div>
        <div
          v-if="i < stages.length - 1"
          class="arrow"
        >
          →
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="activeStage"
        class="stage-detail"
      >
        <div class="detail-header">
          <span class="detail-icon">{{ currentStage?.icon }}</span>
          <span class="detail-title">{{ currentStage?.name }}</span>
        </div>
        <div class="detail-content">
          <p class="detail-desc">
            {{ currentStage?.detailDesc }}
          </p>
          <div class="detail-example">
            <div class="example-label">
              🌰 {{ t('buildPipeline.exampleLabel') }}
            </div>
            <div class="example-content">
              {{ currentStage?.example }}
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <div
      v-if="!activeStage"
      class="hint-text"
    >
      👆 {{ t('buildPipeline.hint') }}
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.coreIdea') }}</strong>{{ t('buildPipeline.infoBoxContent') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { frontendEngineeringLocale } from '../../../locales/frontend-engineering/index.js'

const { t } = useI18n(frontendEngineeringLocale)

const activeStage = ref(null)

const stages = computed(() => [
  {
    id: 1,
    icon: '🔍',
    name: t('buildPipeline.stages.lint.name'),
    simple: t('buildPipeline.stages.lint.simple'),
    detailDesc: t('buildPipeline.stages.lint.detailDesc'),
    example: t('buildPipeline.stages.lint.example')
  },
  {
    id: 2,
    icon: '⚙️',
    name: t('buildPipeline.stages.transform.name'),
    simple: t('buildPipeline.stages.transform.simple'),
    detailDesc: t('buildPipeline.stages.transform.detailDesc'),
    example: t('buildPipeline.stages.transform.example')
  },
  {
    id: 3,
    icon: '📦',
    name: t('buildPipeline.stages.dependency.name'),
    simple: t('buildPipeline.stages.dependency.simple'),
    detailDesc: t('buildPipeline.stages.dependency.detailDesc'),
    example: t('buildPipeline.stages.dependency.example')
  },
  {
    id: 4,
    icon: '📚',
    name: t('buildPipeline.stages.bundle.name'),
    simple: t('buildPipeline.stages.bundle.simple'),
    detailDesc: t('buildPipeline.stages.bundle.detailDesc'),
    example: t('buildPipeline.stages.bundle.example')
  },
  {
    id: 5,
    icon: '✨',
    name: t('buildPipeline.stages.optimize.name'),
    simple: t('buildPipeline.stages.optimize.simple'),
    detailDesc: t('buildPipeline.stages.optimize.detailDesc'),
    example: t('buildPipeline.stages.optimize.example')
  }
])

const currentStage = computed(() => {
  return stages.value.find(s => s.id === activeStage.value)
})
</script>

<style scoped>
.build-pipeline-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.pipeline {
  display: flex;
  align-items: flex-start;
  gap: 0.25rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  overflow-x: auto;
}

.stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 85px;
  position: relative;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.stage:hover {
  background: var(--vp-c-bg-soft);
}

.stage.active {
  background: var(--vp-c-brand-soft);
}

.stage-icon {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background: var(--vp-c-brand);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  transition: transform 0.2s ease;
}

.stage:hover .stage-icon {
  transform: scale(1.1);
}

.stage-name {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.stage-simple {
  font-size: 0.7rem;
  color: var(--vp-c-brand-1);
  margin-top: 0.2rem;
  font-weight: 500;
}

.arrow {
  position: absolute;
  right: -12px;
  top: 20px;
  color: var(--vp-c-text-3);
  font-size: 1rem;
}

.hint-text {
  text-align: center;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-top: 0.75rem;
}

.stage-detail {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  margin-top: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.detail-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 0.75rem;
}

.detail-example {
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.example-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.example-content {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  line-height: 1.5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
}

.info-box .icon { margin-right: 0.25rem; }
</style>
