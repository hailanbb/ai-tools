<template>
  <div class="evolution-intro-demo">
    <div class="demo-header">
      <span class="icon">🏗️</span>
      <span class="title">{{ t('evolutionIntro.title') }}</span>
      <span class="subtitle">{{ t('evolutionIntro.subtitle') }}</span>
    </div>

    <div class="timeline-cards">
      <div
        v-for="(stage, idx) in stages"
        :key="idx"
        class="stage-card"
        :class="{ active: currentStage === idx }"
        @click="currentStage = idx"
      >
        <div class="stage-era">
          {{ stage.era }}
        </div>
        <div class="stage-icon">
          {{ stage.icon }}
        </div>
        <div class="stage-name">
          {{ stage.name }}
        </div>
        <div class="stage-arch">
          {{ stage.arch }}
        </div>
      </div>
    </div>

    <div
      v-if="currentStage !== null"
      class="stage-detail"
    >
      <Transition
        name="fade"
        mode="out-in"
      >
        <div
          :key="currentStage"
          class="detail-panel"
        >
          <div class="detail-header">
            <span class="detail-icon">{{ stages[currentStage].icon }}</span>
            <h4>{{ stages[currentStage].restaurant }}</h4>
          </div>
          <div class="detail-content">
            <div class="detail-section">
              <h5>{{ t('evolutionIntro.restaurantScene') }}</h5>
              <p>{{ stages[currentStage].scenario }}</p>
            </div>
            <div class="detail-section">
              <h5>{{ t('evolutionIntro.backendMapping') }}</h5>
              <p>{{ stages[currentStage].mapping }}</p>
            </div>
            <div class="detail-section">
              <h5>{{ t('evolutionIntro.corePain') }}</h5>
              <ul>
                <li
                  v-for="(pain, i) in stages[currentStage].pains"
                  :key="i"
                >
                  {{ pain }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.ideaTitle') }}</strong>{{ t('evolutionIntro.idea') }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { backendEvolutionLocale } from '../../../locales/backend-evolution/index.js'

const { t, messages } = useI18n(backendEvolutionLocale)

const currentStage = ref(0)
const stages = computed(() => messages.value.evolutionIntro.stages)
</script>

<style scoped>
.evolution-intro-demo {
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

.timeline-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.4rem;
  margin-bottom: 0.5rem;
}

.stage-card {
  background: var(--vp-c-bg);
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 0.75rem 0.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.stage-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-1px);
}

.stage-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.stage-era {
  font-size: 0.6rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.1rem;
}

.stage-icon {
  font-size: 1rem;
  margin-bottom: 0.2rem;
}

.stage-name {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.1rem;
}

.stage-arch {
  font-size: 0.55rem;
  color: var(--vp-c-text-3);
}

.stage-detail {
  background: var(--vp-c-bg);
  border-radius: 4px;
  padding: 0.5rem;
}

.detail-panel {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-icon {
  font-size: 1rem;
}

.detail-header h4 {
  font-size: 0.85rem;
  font-weight: 600;
  margin: 0;
  color: var(--vp-c-text-1);
}

.detail-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.4rem;
}

.detail-section h5 {
  font-size: 0.7rem;
  font-weight: 600;
  margin: 0 0 0.3rem 0;
  color: var(--vp-c-brand);
}

.detail-section p {
  font-size: 0.65rem;
  line-height: 1.4;
  margin: 0 0 0.3rem 0;
  color: var(--vp-c-text-2);
}

.detail-section ul {
  margin: 0;
  padding-left: 0.75rem;
}

.detail-section li {
  font-size: 0.6rem;
  line-height: 1.4;
  margin-bottom: 0.25rem;
  color: var(--vp-c-text-2);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 1rem;
  display: flex;
  gap: 0.25rem;
}

.info-box .icon {
  flex-shrink: 0;
}

.info-box strong {
  color: var(--vp-c-text-1);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

@media (max-width: 768px) {
  .timeline-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .detail-content {
    grid-template-columns: 1fr;
  }
}
</style>
