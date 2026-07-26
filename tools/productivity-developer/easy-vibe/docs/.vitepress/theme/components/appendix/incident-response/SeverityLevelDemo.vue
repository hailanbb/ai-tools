<template>
  <div class="severity-level-demo">
    <div class="header">
      <div class="title">{{ t('severity.title') }}</div>
      <div class="subtitle">{{ t('severity.subtitle') }}</div>
    </div>

    <div class="level-tabs">
      <button
        v-for="level in levels"
        :key="level.id"
        :class="['level-tab', level.id, { active: activeLevel === level.id }]"
        @click="activeLevel = level.id"
      >
        <span class="tab-badge">{{ level.id.toUpperCase() }}</span>
        <span class="tab-name">{{ level.shortName }}</span>
      </button>
    </div>

    <div v-if="current" class="level-detail">
      <div class="detail-header" :style="{ background: current.color }">
        <div class="detail-level">{{ current.id.toUpperCase() }}</div>
        <div class="detail-name">{{ current.name }}</div>
      </div>
      <div class="detail-body">
        <div class="detail-section">
          <div class="section-label">{{ t('severity.labels.definition') }}</div>
          <div class="section-content">{{ current.definition }}</div>
        </div>
        <div class="detail-section">
          <div class="section-label">{{ t('severity.labels.responseTime') }}</div>
          <div class="section-content response-time">
            {{ current.responseTime }}
          </div>
        </div>
        <div class="detail-section">
          <div class="section-label">{{ t('severity.labels.channels') }}</div>
          <div class="channels">
            <span
              v-for="ch in current.channels"
              :key="ch"
              class="channel-tag"
            >
              {{ ch }}
            </span>
          </div>
        </div>
        <div class="detail-section">
          <div class="section-label">{{ t('severity.labels.examples') }}</div>
          <div class="examples">
            <div
              v-for="(ex, i) in current.examples"
              :key="i"
              class="example-item"
            >
              {{ ex }}
            </div>
          </div>
        </div>
        <div class="detail-section">
          <div class="section-label">{{ t('severity.labels.requirements') }}</div>
          <div class="requirements">
            <div
              v-for="(req, i) in current.requirements"
              :key="i"
              class="req-item"
            >
              <span class="req-check">&#10003;</span>
              <span>{{ req }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <div class="table-title">{{ t('severity.labels.comparison') }}</div>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th v-for="header in messages.severity.tableHeaders" :key="header">{{ header }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="level in levels"
              :key="level.id"
              :class="{ highlight: activeLevel === level.id }"
              @click="activeLevel = level.id"
            >
              <td>
                <span class="table-badge" :class="level.id">
                  {{ level.id.toUpperCase() }}
                </span>
              </td>
              <td>{{ level.userImpact }}</td>
              <td>{{ level.responseTime }}</td>
              <td>{{ level.oncallReq }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { incidentResponseLocale } from '../../../locales/incident-response/index.js'

const activeLevel = ref('p0')
const { t, messages } = useI18n(incidentResponseLocale)

const levels = computed(() => messages.value.severity.levels)

const current = computed(() => {
  return levels.value.find((l) => l.id === activeLevel.value)
})
</script>

<style scoped>
.severity-level-demo {
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

.level-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.level-tab {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.9rem;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.level-tab:hover {
  border-color: var(--vp-c-text-3);
}

.level-tab.active.p0 { border-color: #ef4444; background: rgba(239,68,68,0.08); }
.level-tab.active.p1 { border-color: #f59e0b; background: rgba(245,158,11,0.08); }
.level-tab.active.p2 { border-color: #eab308; background: rgba(234,179,8,0.08); }
.level-tab.active.p3 { border-color: #84cc16; background: rgba(132,204,22,0.08); }
.level-tab.active.p4 { border-color: #64748b; background: rgba(100,116,139,0.08); }

.tab-badge {
  font-weight: 700;
  font-size: 0.8rem;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  color: #fff;
}

.p0 .tab-badge { background: #ef4444; }
.p1 .tab-badge { background: #f59e0b; }
.p2 .tab-badge { background: #eab308; }
.p3 .tab-badge { background: #84cc16; }
.p4 .tab-badge { background: #64748b; }

.tab-name {
  font-weight: 500;
}

.level-detail {
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

.detail-level {
  font-weight: 800;
  font-size: 1.2rem;
}

.detail-name {
  font-weight: 600;
  font-size: 1rem;
}

.detail-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.detail-section {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.section-label {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.section-content {
  font-size: 0.9rem;
  line-height: 1.6;
}

.response-time {
  font-weight: 700;
  color: var(--vp-c-brand);
}

.channels {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.channel-tag {
  padding: 0.15rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.8rem;
}

.examples {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.example-item {
  font-size: 0.85rem;
  padding: 0.3rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  border-left: 3px solid var(--vp-c-divider);
}

.requirements {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.req-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
}

.req-check {
  color: #22c55e;
  font-weight: 700;
}

.comparison-table {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.table-title {
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

th {
  text-align: left;
  padding: 0.5rem;
  border-bottom: 2px solid var(--vp-c-divider);
  font-weight: 600;
  color: var(--vp-c-text-2);
}

td {
  padding: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

tr.highlight {
  background: rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.06);
}

tr {
  cursor: pointer;
  transition: background 0.2s;
}

tr:hover {
  background: var(--vp-c-bg-soft);
}

.table-badge {
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-weight: 700;
  font-size: 0.75rem;
  color: #fff;
}

.table-badge.p0 { background: #ef4444; }
.table-badge.p1 { background: #f59e0b; }
.table-badge.p2 { background: #eab308; }
.table-badge.p3 { background: #84cc16; }
.table-badge.p4 { background: #64748b; }

@media (max-width: 768px) {
  .level-tabs {
    flex-direction: column;
  }

  .level-tab {
    width: 100%;
    justify-content: center;
  }
}
</style>
