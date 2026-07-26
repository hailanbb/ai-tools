<template>
  <div class="incident-timeline-demo">
    <div class="header">
      <div class="title">{{ t('timeline.title') }}</div>
      <div class="subtitle">{{ t('timeline.subtitle') }}</div>
    </div>

    <div class="timeline">
      <div class="timeline-track">
        <div
          class="timeline-progress"
          :style="{ width: progressWidth }"
        ></div>
      </div>
      <div class="timeline-nodes">
        <div
          v-for="(phase, index) in phases"
          :key="phase.id"
          :class="[
            'timeline-node',
            {
              active: activePhase === phase.id,
              completed: completedPhases.includes(phase.id)
            }
          ]"
          @click="selectPhase(phase.id)"
        >
          <div class="node-dot">
            <span v-if="completedPhases.includes(phase.id)">&#10003;</span>
            <span v-else>{{ index + 1 }}</span>
          </div>
          <div class="node-label">{{ phase.name }}</div>
          <div class="node-time">{{ phase.timeHint }}</div>
        </div>
      </div>
    </div>

    <div v-if="currentPhase" class="phase-detail">
      <div class="phase-header" :style="{ background: currentPhase.color }">
        <span class="phase-icon">{{ currentPhase.icon }}</span>
        <span class="phase-name">{{ currentPhase.name }}</span>
        <span class="phase-duration">{{ currentPhase.duration }}</span>
      </div>
      <div class="phase-body">
        <div class="phase-desc">{{ currentPhase.description }}</div>
        <div class="phase-actions">
          <div class="actions-title">{{ t('timeline.actionsTitle') }}</div>
          <div
            v-for="(action, i) in currentPhase.actions"
            :key="i"
            class="action-item"
          >
            <span class="action-bullet">{{ i + 1 }}</span>
            <span>{{ action }}</span>
          </div>
        </div>
        <div class="phase-roles">
          <span class="roles-label">{{ t('timeline.rolesLabel') }}</span>
          <span
            v-for="role in currentPhase.roles"
            :key="role"
            class="role-tag"
          >
            {{ role }}
          </span>
        </div>
      </div>
    </div>

    <div class="auto-controls">
      <button class="play-btn" :disabled="isPlaying" @click="autoPlay">
        {{ isPlaying ? t('timeline.playing') : t('timeline.play') }}
      </button>
      <button class="reset-btn" @click="resetAll">{{ t('timeline.reset') }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { incidentResponseLocale } from '../../../locales/incident-response/index.js'

const activePhase = ref(null)
const completedPhases = ref([])
const isPlaying = ref(false)
const { t, messages } = useI18n(incidentResponseLocale)

const phases = computed(() => messages.value.timeline.phases)

const currentPhase = computed(() => {
  if (!activePhase.value) return null
  return phases.value.find((p) => p.id === activePhase.value)
})

const progressWidth = computed(() => {
  if (completedPhases.value.length === 0 && !activePhase.value) return '0%'
  const activeIndex = phases.value.findIndex((p) => p.id === activePhase.value)
  if (activeIndex === -1) {
    const lastCompleted = completedPhases.value.length
    return `${(lastCompleted / phases.value.length) * 100}%`
  }
  return `${((activeIndex + 0.5) / phases.value.length) * 100}%`
})

const selectPhase = (id) => {
  activePhase.value = id
}

const autoPlay = async () => {
  isPlaying.value = true
  completedPhases.value = []
  activePhase.value = null

  for (let i = 0; i < phases.value.length; i++) {
    activePhase.value = phases.value[i].id
    await new Promise((r) => setTimeout(r, 1800))
    completedPhases.value.push(phases.value[i].id)
  }
  isPlaying.value = false
}

const resetAll = () => {
  activePhase.value = null
  completedPhases.value = []
  isPlaying.value = false
}
</script>

<style scoped>
.incident-timeline-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.header {
  margin-bottom: 1.5rem;
}

.title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.timeline {
  position: relative;
  margin-bottom: 1.5rem;
}

.timeline-track {
  position: absolute;
  top: 16px;
  left: 5%;
  right: 5%;
  height: 4px;
  background: var(--vp-c-divider);
  border-radius: 2px;
}

.timeline-progress {
  height: 100%;
  background: var(--vp-c-brand);
  border-radius: 2px;
  transition: width 0.5s ease;
}

.timeline-nodes {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.timeline-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  flex: 1;
  transition: all 0.2s;
}

.node-dot {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--vp-c-bg);
  border: 3px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.8rem;
  transition: all 0.3s;
  z-index: 1;
}

.timeline-node.active .node-dot {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  transform: scale(1.2);
  box-shadow: 0 0 0 4px rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.2);
}

.timeline-node.completed .node-dot {
  border-color: #22c55e;
  background: #22c55e;
  color: #fff;
}

.node-label {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
}

.node-time {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-top: 0.15rem;
}

.phase-detail {
  background: var(--vp-c-bg);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.phase-header {
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #fff;
}

.phase-icon {
  font-size: 1.3rem;
}

.phase-name {
  font-weight: 700;
  font-size: 1rem;
  flex: 1;
}

.phase-duration {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.8rem;
}

.phase-body {
  padding: 1rem;
}

.phase-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.actions-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.action-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
  color: var(--vp-c-text-2);
}

.action-bullet {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  flex-shrink: 0;
  color: var(--vp-c-text-1);
}

.phase-roles {
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.roles-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.role-tag {
  padding: 0.15rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.auto-controls {
  display: flex;
  gap: 0.5rem;
}

.play-btn,
.reset-btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
}

.play-btn {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}

.play-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.reset-btn {
  background: var(--vp-c-bg);
}

.reset-btn:hover {
  border-color: var(--vp-c-brand);
}

@media (max-width: 768px) {
  .timeline-nodes {
    flex-direction: column;
    gap: 0.75rem;
  }

  .timeline-track {
    display: none;
  }

  .timeline-node {
    flex-direction: row;
    gap: 0.75rem;
  }

  .node-label {
    margin-top: 0;
  }

  .node-time {
    margin-top: 0;
    margin-left: auto;
  }
}
</style>
