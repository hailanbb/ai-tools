<template>
  <div class="permission-hierarchy-demo">
    <div class="demo-header">
      <span class="icon">🏛️</span>
      <span class="title">{{ t('permissionHierarchy.title') }}</span>
      <span class="subtitle">{{ t('permissionHierarchy.subtitle') }}</span>
    </div>

    <div class="main-area">
      <div class="levels-list">
        <div
          v-for="(level, index) in hierarchyLevels"
          :key="index"
          class="level-row"
          :class="{ active: selectedLevel === index }"
          @click="selectLevel(index)"
        >
          <span class="level-icon">{{ level.icon }}</span>
          <div class="level-info">
            <span class="level-name">{{ level.name }}</span>
            <span class="level-scope">{{ level.scope }}</span>
          </div>
        </div>
      </div>

      <div
        v-if="selectedLevelData"
        class="detail-panel"
      >
        <div class="detail-title">
          {{ selectedLevelData.name }}
        </div>
        <div class="detail-row">
          <span class="label">{{ t('permissionHierarchy.scopeLabel') }}</span>
          <span class="value">{{ selectedLevelData.scope }}</span>
        </div>
        <div class="detail-row">
          <span class="label">{{ t('permissionHierarchy.scenarioLabel') }}</span>
          <span class="value">{{ selectedLevelData.scenario }}</span>
        </div>
        <div class="perms-list">
          <span
            v-for="(perm, i) in selectedLevelData.permissions.slice(0, 3)"
            :key="i"
            class="perm-tag"
          >{{ perm.name }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.coreIdea') }}</strong>{{ t('permissionHierarchy.info') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { cloudIamLocale } from '../../../locales/cloud-iam/index.js'

const { t, messages } = useI18n(cloudIamLocale)
const selectedLevel = ref(0)
const hierarchyLevels = computed(() => messages.value.permissionHierarchy.levels)

const selectedLevelData = computed(() => hierarchyLevels.value[selectedLevel.value])

function selectLevel(index) {
  selectedLevel.value = index
}
</script>

<style scoped>
.permission-hierarchy-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
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

.main-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 640px) {
  .main-area { grid-template-columns: 1fr; }
}

.levels-list { display: flex; flex-direction: column; gap: 0.4rem; }

.level-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.level-row:hover { border-color: var(--vp-c-brand); }
.level-row.active { border-color: var(--vp-c-brand); background: var(--vp-c-brand-soft); }

.level-icon { font-size: 1.25rem; }

.level-info { display: flex; flex-direction: column; }
.level-name { font-weight: 600; font-size: 0.85rem; color: var(--vp-c-text-1); }
.level-scope { font-size: 0.7rem; color: var(--vp-c-text-2); }

.detail-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.detail-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-row {
  display: flex;
  gap: 0.3rem;
  margin-bottom: 0.3rem;
  font-size: 0.8rem;
}

.detail-row .label { color: var(--vp-c-text-2); }
.detail-row .value { color: var(--vp-c-text-1); }

.perms-list { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.5rem; }

.perm-tag {
  font-size: 0.7rem;
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 3px;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box .icon { flex-shrink: 0; }
.info-box strong { color: var(--vp-c-text-1); }
</style>
