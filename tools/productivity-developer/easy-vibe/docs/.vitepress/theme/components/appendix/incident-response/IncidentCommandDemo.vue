<template>
  <div class="incident-command-demo">
    <div class="header">
      <div class="title">{{ t('command.title') }}</div>
      <div class="subtitle">{{ t('command.subtitle') }}</div>
    </div>

    <div class="org-chart">
      <div class="org-level org-top">
        <div
          :class="['role-card', 'commander', { active: activeRole === 'ic' }]"
          @click="selectRole('ic')"
        >
          <div class="role-icon">🎖️</div>
          <div class="role-name">{{ allRoles.ic.name }}</div>
          <div class="role-eng">{{ allRoles.ic.eng }}</div>
        </div>
      </div>

      <div class="org-connector">
        <div class="connector-line"></div>
      </div>

      <div class="org-level org-middle">
        <div
          v-for="role in middleRoles"
          :key="role.id"
          :class="['role-card', { active: activeRole === role.id }]"
          @click="selectRole(role.id)"
        >
          <div class="role-icon">{{ role.icon }}</div>
          <div class="role-name">{{ role.name }}</div>
          <div class="role-eng">{{ role.eng }}</div>
        </div>
      </div>
    </div>

    <div v-if="currentRole" class="role-detail">
      <div class="detail-header" :style="{ background: currentRole.color }">
        <span class="detail-icon">{{ currentRole.icon }}</span>
        <span class="detail-name">{{ currentRole.name }}</span>
      </div>
      <div class="detail-body">
        <div class="detail-section">
          <div class="section-label">{{ t('command.labels.responsibilities') }}</div>
          <div class="responsibilities">
            <div
              v-for="(r, i) in currentRole.responsibilities"
              :key="i"
              class="resp-item"
            >
              <span class="resp-num">{{ i + 1 }}</span>
              <span>{{ r }}</span>
            </div>
          </div>
        </div>
        <div class="detail-section">
          <div class="section-label">{{ t('command.labels.skills') }}</div>
          <div class="skills">
            <span
              v-for="skill in currentRole.skills"
              :key="skill"
              class="skill-tag"
            >
              {{ skill }}
            </span>
          </div>
        </div>
        <div class="detail-section">
          <div class="section-label">{{ t('command.labels.quote') }}</div>
          <div class="quote-box">
            "{{ currentRole.quote }}"
          </div>
        </div>
      </div>
    </div>

    <div class="scenario-box">
      <div class="scenario-title">{{ t('command.scenarioTitle') }}</div>
      <div class="scenario-timeline">
        <div
          v-for="(event, i) in scenarioEvents"
          :key="i"
          class="event-item"
        >
          <span class="event-time">{{ event.time }}</span>
          <span
            class="event-role"
            :style="{ background: event.color }"
          >
            {{ event.role }}
          </span>
          <span class="event-text">{{ event.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { incidentResponseLocale } from '../../../locales/incident-response/index.js'

const activeRole = ref('ic')
const { t, messages } = useI18n(incidentResponseLocale)

const allRoles = computed(() => messages.value.command.roles)

const middleRoles = computed(() => [
  allRoles.value.comm,
  allRoles.value.ops,
  allRoles.value.dev
])

const currentRole = computed(() => {
  return allRoles.value[activeRole.value] || null
})

const selectRole = (id) => {
  activeRole.value = id
}

const scenarioEvents = computed(() => messages.value.command.scenarioEvents)
</script>

<style scoped>
.incident-command-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.header { margin-bottom: 1.5rem; }
.title { font-weight: 700; font-size: 1.1rem; margin-bottom: 0.25rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }

.org-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}

.org-level { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

.org-connector {
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
}

.connector-line {
  width: 2px;
  height: 24px;
  background: var(--vp-c-divider);
}

.role-card {
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s;
  min-width: 130px;
}

.role-card:hover { border-color: var(--vp-c-brand); transform: translateY(-2px); }
.role-card.active { border-color: var(--vp-c-brand); box-shadow: 0 2px 12px rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.15); }
.role-card.commander { border-width: 3px; }

.role-icon { font-size: 1.5rem; margin-bottom: 0.25rem; }
.role-name { font-weight: 600; font-size: 0.9rem; }
.role-eng { font-size: 0.75rem; color: var(--vp-c-text-3); }

.role-detail {
  background: var(--vp-c-bg);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.detail-header {
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #fff;
}

.detail-icon { font-size: 1.3rem; }
.detail-name { font-weight: 700; font-size: 1rem; }

.detail-body { padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; }
.detail-section { display: flex; flex-direction: column; gap: 0.3rem; }
.section-label { font-weight: 600; font-size: 0.85rem; color: var(--vp-c-text-2); }

.responsibilities { display: flex; flex-direction: column; gap: 0.3rem; }

.resp-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.resp-num {
  width: 20px; height: 20px; border-radius: 50%;
  background: var(--vp-c-bg-soft);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.7rem; font-weight: 700; flex-shrink: 0;
}

.skills { display: flex; gap: 0.4rem; flex-wrap: wrap; }

.skill-tag {
  padding: 0.15rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.8rem;
}

.quote-box {
  font-size: 0.85rem;
  padding: 0.6rem 0.8rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
  font-style: italic;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.scenario-box {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.scenario-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.75rem; }

.scenario-timeline { display: flex; flex-direction: column; gap: 0.4rem; }

.event-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  padding: 0.3rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.event-item:last-child { border-bottom: none; }

.event-time {
  font-family: monospace;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  min-width: 40px;
}

.event-role {
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  min-width: 45px;
  text-align: center;
}

.event-text { color: var(--vp-c-text-1); }

@media (max-width: 768px) {
  .org-level { flex-direction: column; align-items: center; }
  .event-item { flex-wrap: wrap; }
}
</style>
