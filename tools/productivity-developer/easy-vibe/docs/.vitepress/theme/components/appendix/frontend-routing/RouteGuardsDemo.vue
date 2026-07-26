<template>
  <div class="route-guards-demo">
    <div class="demo-header">
      <span class="icon">🛡️</span>
      <span class="title">{{ t('routeGuards.title') }}</span>
      <span class="subtitle">{{ t('routeGuards.subtitle') }}</span>
    </div>

    <div class="intro-text">
      {{ t('routeGuards.intro.prefix') }}<span class="highlight">{{ t('routeGuards.intro.highlight') }}</span>{{ t('routeGuards.intro.suffix') }}
    </div>

    <div class="demo-content">
      <div class="guards-list">
        <div
          v-for="guard in guardTypes"
          :key="guard.name"
          :class="['guard-card', guard.type]"
          @click="activeGuard = guard.name"
        >
          <div class="guard-header">
            <span class="guard-icon">{{ guard.icon }}</span>
            <span class="guard-name">{{ guard.name }}</span>
          </div>
          <div class="guard-desc">
            {{ guard.shortDesc }}
          </div>
        </div>
      </div>

      <Transition name="fade">
        <div
          v-if="activeGuard"
          class="guard-detail"
        >
          <div class="detail-header">
            <span class="detail-icon">{{ currentGuard?.icon }}</span>
            <span class="detail-title">{{ currentGuard?.name }}</span>
          </div>
          <div class="detail-desc">
            {{ currentGuard?.description }}
          </div>
          <div class="detail-example">
            <div class="example-label">
              {{ t('routeGuards.codeExample') }}
            </div>
            <pre class="code-block">{{ currentGuard?.example }}</pre>
          </div>
        </div>
      </Transition>
    </div>

    <div class="execution-flow">
      <h5>{{ t('routeGuards.executionTitle') }}</h5>
      <div class="flow-steps">
        <div
          v-for="(step, index) in executionSteps"
          :key="index"
          class="flow-step"
        >
          <div class="step-number">
            {{ index + 1 }}
          </div>
          <div class="step-content">
            <div class="step-name">
              {{ step.name }}
            </div>
            <div class="step-desc">
              {{ step.description }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.coreIdea') }}</strong>{{ t('routeGuards.info') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { frontendRoutingLocale } from '../../../locales/frontend-routing/index.js'

const { t, messages } = useI18n(frontendRoutingLocale)
const activeGuard = ref('beforeEach')
const guardTypes = computed(() => messages.value.routeGuards.guards)
const executionSteps = computed(() => messages.value.routeGuards.executionSteps)

const currentGuard = computed(() => {
  return guardTypes.value.find(g => g.name === activeGuard.value)
})
</script>

<style scoped>
.route-guards-demo {
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

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.guards-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
}

.guard-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.guard-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.guard-card.global {
  border-top: 3px solid #667eea;
}

.guard-card.route {
  border-top: 3px solid #f5576c;
}

.guard-card.component {
  border-top: 3px solid #4facfe;
}

.guard-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.guard-icon {
  font-size: 1rem;
}

.guard-name {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.guard-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.guard-detail {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.detail-icon {
  font-size: 1.25rem;
}

.detail-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.detail-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.detail-example {
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.example-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.code-block {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  line-height: 1.4;
  margin: 0;
  overflow-x: auto;
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

.execution-flow {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1rem;
}

.execution-flow h5 {
  margin: 0 0 0.75rem 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.flow-steps {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.step-number {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
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

.step-name {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.step-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-top: 0.125rem;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon { margin-right: 0.25rem; }

@media (max-width: 768px) {
  .guards-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
