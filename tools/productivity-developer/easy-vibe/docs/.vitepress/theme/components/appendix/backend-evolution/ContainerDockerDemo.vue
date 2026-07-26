<template>
  <div class="container-docker-demo">
    <div class="demo-header">
      <span class="icon">🐳</span>
      <span class="title">{{ t('containerDocker.title') }}</span>
      <span class="subtitle">{{ t('containerDocker.subtitle') }}</span>
    </div>

    <div class="docker-visualization">
      <div
        class="layer traditional"
        :class="{ active: showTraditional }"
        @click="showTraditional = true; showDocker = false"
      >
        <h5>{{ t('containerDocker.traditional') }}</h5>
        <div class="server-stack">
          <div class="layer-item app">{{ t('containerDocker.appA') }}</div>
          <div v-if="showConflict" class="layer-item conflict">{{ t('containerDocker.conflict') }}</div>
          <div class="layer-item deps">{{ t('containerDocker.depsV1') }}</div>
          <div class="layer-item os">{{ t('containerDocker.os') }}</div>
          <div class="layer-item hardware">{{ t('containerDocker.hardware') }}</div>
        </div>
      </div>

      <div class="vs-divider">VS</div>

      <div
        class="layer docker"
        :class="{ active: showDocker }"
        @click="showDocker = true; showTraditional = false"
      >
        <h5>{{ t('containerDocker.docker') }}</h5>
        <div class="docker-stack">
          <div class="containers">
            <div class="container-box">
              <div class="container-app">{{ t('containerDocker.appA') }}</div>
              <div class="container-deps">{{ t('containerDocker.depsShortV1') }}</div>
            </div>
            <div class="container-box">
              <div class="container-app">{{ t('containerDocker.appB') }}</div>
              <div class="container-deps">{{ t('containerDocker.depsShortV2') }}</div>
            </div>
          </div>
          <div class="docker-engine">Docker Engine</div>
          <div class="host-os">{{ t('containerDocker.hostOs') }}</div>
          <div class="hardware">{{ t('containerDocker.hardware') }}</div>
        </div>
      </div>
    </div>

    <div class="benefits-grid">
      <div
        v-for="benefit in benefits"
        :key="benefit.title"
        class="benefit-card"
      >
        <div class="benefit-icon">
          {{ benefit.icon }}
        </div>
        <div class="benefit-title">
          {{ benefit.title }}
        </div>
        <div class="benefit-desc">
          {{ benefit.desc }}
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.ideaTitle') }}</strong>{{ t('containerDocker.idea') }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { backendEvolutionLocale } from '../../../locales/backend-evolution/index.js'

const { t, messages } = useI18n(backendEvolutionLocale)

const showTraditional = ref(true)
const showDocker = ref(false)
const showConflict = ref(false)

const benefits = computed(() => messages.value.containerDocker.benefits)
</script>

<style scoped>
.container-docker-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-header .icon {
  font-size: 1rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  margin-left: 0.4rem;
}

.docker-visualization {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  align-items: stretch;
}

.layer {
  flex: 1;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;
}

.layer:hover,
.layer.active {
  border-color: var(--vp-c-brand);
}

.layer h5 {
  margin: 0 0 0.5rem 0;
  text-align: center;
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
}

.server-stack,
.docker-stack {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.layer-item {
  padding: 0.3rem;
  border-radius: 3px;
  text-align: center;
  font-size: 0.65rem;
}

.layer-item.app {
  background: rgba(102, 126, 234, 0.2);
  color: var(--vp-c-brand);
  font-weight: 600;
}

.layer-item.deps {
  background: var(--vp-c-bg-soft);
  border: 1px dashed var(--vp-c-divider);
}

.layer-item.os,
.layer-item.hardware {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.layer-item.conflict {
  background: rgba(239, 68, 68, 0.2);
  color: var(--vp-c-danger);
  font-weight: 600;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.containers {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.25rem;
}

.container-box {
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 4px;
  padding: 0.25rem;
  text-align: center;
}

.container-app {
  font-weight: 600;
  font-size: 0.65rem;
  color: var(--vp-c-brand);
  margin-bottom: 0.1rem;
}

.container-deps {
  font-size: 0.55rem;
  color: var(--vp-c-text-2);
}

.docker-engine {
  padding: 0.3rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 3px;
  text-align: center;
  font-size: 0.65rem;
  font-weight: 600;
  color: #059669;
}

.host-os,
.hardware {
  padding: 0.3rem;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  text-align: center;
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
}

.vs-divider {
  display: flex;
  align-items: center;
  font-weight: 700;
  color: var(--vp-c-text-3);
  font-size: 0.75rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.4rem;
}

.benefit-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.5rem;
  text-align: center;
  transition: all 0.2s;
}

.benefit-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-1px);
}

.benefit-icon {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

.benefit-title {
  font-weight: 600;
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.1rem;
}

.benefit-desc {
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}

@media (max-width: 768px) {
  .docker-visualization {
    flex-direction: column;
  }

  .vs-divider {
    justify-content: center;
    padding: 0.25rem 0;
  }

  .benefits-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
  display: flex;
  gap: 0.2rem;
}

.info-box .icon {
  flex-shrink: 0;
}

.info-box strong {
  color: var(--vp-c-text-1);
}
</style>
