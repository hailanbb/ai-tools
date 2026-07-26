<template>
  <div class="vdb-demo">
    <div class="demo-header">
      <h4>{{ t('database.title') }}</h4>
      <p class="desc">{{ t('database.desc') }}</p>
    </div>

    <div class="db-grid">
      <div
        v-for="db in databases"
        :key="db.name"
        class="db-card"
        :class="{ active: selected === db.name }"
        @click="selected = selected === db.name ? null : db.name"
      >
        <div class="card-header">
          <span class="db-icon" :style="{ background: db.color }">{{ db.icon }}</span>
          <div>
            <div class="db-name">{{ db.name }}</div>
            <div class="db-type">{{ db.type }}</div>
          </div>
        </div>

        <div class="card-tags">
          <span
            v-for="tag in db.tags"
            :key="tag"
            class="tag"
          >{{ tag }}</span>
        </div>

        <div v-if="selected === db.name" class="card-detail">
          <div class="detail-row">
            <span class="detail-label">{{ t('database.labels.license') }}</span>
            <span class="detail-val">{{ db.license }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">{{ t('database.labels.index') }}</span>
            <span class="detail-val">{{ db.index }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">{{ t('database.labels.maxDim') }}</span>
            <span class="detail-val">{{ db.maxDim }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">{{ t('database.labels.useCase') }}</span>
            <span class="detail-val">{{ db.useCase }}</span>
          </div>
          <p class="detail-desc">{{ db.description }}</p>
        </div>

        <div class="card-metrics">
          <div class="metric">
            <div class="metric-bar-wrap">
              <div class="metric-bar" :style="{ width: db.perf + '%', background: db.color }"></div>
            </div>
            <span class="metric-label">{{ t('database.labels.perf') }}</span>
          </div>
          <div class="metric">
            <div class="metric-bar-wrap">
              <div class="metric-bar" :style="{ width: db.ease + '%', background: db.color }"></div>
            </div>
            <span class="metric-label">{{ t('database.labels.ease') }}</span>
          </div>
          <div class="metric">
            <div class="metric-bar-wrap">
              <div class="metric-bar" :style="{ width: db.scale + '%', background: db.color }"></div>
            </div>
            <span class="metric-label">{{ t('database.labels.scale') }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="scenario-section">
      <h5>{{ t('database.scenarioTitle') }}</h5>
      <div class="scenario-grid">
        <div
          v-for="s in scenarios"
          :key="s.title"
          class="scenario-card"
        >
          <div class="scenario-icon">{{ s.icon }}</div>
          <div class="scenario-title">{{ s.title }}</div>
          <div class="scenario-rec">{{ s.recommend }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { embeddingVectorLocale } from '../../../locales/embedding-vector/index.js'

const { t, messages } = useI18n(embeddingVectorLocale)
const selected = ref(null)
const databases = computed(() => messages.value.database.databases)
const scenarios = computed(() => messages.value.database.scenarios)
</script>

<style scoped>
.vdb-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
}

.demo-header h4 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.desc {
  margin: 0 0 1rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}

.db-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.db-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.db-card:hover {
  border-color: var(--vp-c-text-3);
}

.db-card.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.6rem;
}

.db-icon {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.db-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.db-type {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 0.6rem;
}

.tag {
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 3px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-3);
}

.card-detail {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 0.6rem;
  margin-bottom: 0.6rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  padding: 3px 0;
}

.detail-label {
  color: var(--vp-c-text-3);
}

.detail-val {
  color: var(--vp-c-text-1);
  font-weight: 500;
  text-align: right;
}

.detail-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin: 0.5rem 0 0;
  line-height: 1.5;
}

.card-metrics {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.metric {
  display: flex;
  align-items: center;
  gap: 6px;
}

.metric-bar-wrap {
  flex: 1;
  height: 4px;
  background: var(--vp-c-divider);
  border-radius: 2px;
  overflow: hidden;
}

.metric-bar {
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s;
}

.metric-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  width: 40px;
  text-align: right;
}

.scenario-section h5 {
  margin: 0 0 0.75rem;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 0.5rem;
}

.scenario-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
}

.scenario-icon {
  font-size: 1.5rem;
  margin-bottom: 4px;
}

.scenario-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 2px;
}

.scenario-rec {
  font-size: 0.75rem;
  color: var(--vp-c-brand);
  font-weight: 500;
}

@media (max-width: 640px) {
  .db-grid {
    grid-template-columns: 1fr;
  }

  .scenario-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .vdb-demo {
    padding: 1rem;
  }
}
</style>
