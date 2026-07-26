<template>
  <div class="challenges-demo">
    <div class="header">
      <div class="title">{{ t('challenges.title') }}</div>
      <div class="subtitle">{{ t('challenges.subtitle') }}</div>
    </div>

    <div class="challenge-grid">
      <div
        v-for="c in challenges"
        :key="c.key"
        :class="['challenge-card', { active: activeChallenge === c.key }]"
        @click="activeChallenge = activeChallenge === c.key ? null : c.key"
      >
        <div class="challenge-icon">{{ c.icon }}</div>
        <div class="challenge-name">{{ c.name }}</div>
      </div>
    </div>

    <div v-if="current" class="detail-panel">
      <div class="detail-title">{{ current.icon }} {{ current.name }}</div>
      <div class="detail-desc">{{ current.desc }}</div>
      <div class="detail-scenario">
        <span class="label">{{ t('challenges.scenarioLabel') }}</span>{{ current.scenario }}
      </div>
      <div class="detail-solution">
        <span class="label">{{ t('challenges.solutionLabel') }}</span>
        <ul class="solution-list">
          <li v-for="(s, i) in current.solutions" :key="i">{{ s }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { distributedSystemsLocale } from '../../../locales/distributed-systems/index.js'

const { t, messages } = useI18n(distributedSystemsLocale)

const activeChallenge = ref('network')

const challenges = computed(() => messages.value.challenges.items)

const current = computed(() =>
  challenges.value.find(c => c.key === activeChallenge.value)
)
</script>

<style scoped>
.challenges-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.challenge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.challenge-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  padding: 0.6rem 0.4rem;
  border-radius: 8px;
  cursor: pointer;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
}
.challenge-card:hover { border-color: var(--vp-c-brand); }
.challenge-card.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.05);
}
.challenge-icon { font-size: 1.3rem; }
.challenge-name { font-size: 0.75rem; font-weight: 600; text-align: center; }
.detail-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}
.detail-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.4rem; }
.detail-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}
.detail-scenario {
  font-size: 0.82rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background: rgba(245, 158, 11, 0.06);
  border-radius: 6px;
}
.detail-solution { font-size: 0.82rem; }
.solution-list {
  margin: 0.3rem 0 0 1.2rem;
  padding: 0;
}
.solution-list li {
  margin-bottom: 0.2rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}
.label { font-weight: 600; color: var(--vp-c-text-2); }
</style>
