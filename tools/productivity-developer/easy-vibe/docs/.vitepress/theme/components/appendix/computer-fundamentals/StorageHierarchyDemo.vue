<template>
  <div class="storage-hierarchy-demo">
    <div class="demo-header">
      <span class="title">{{ t('computerOrganization.storageHierarchy.title') }}</span>
      <span class="subtitle">{{ t('computerOrganization.storageHierarchy.subtitle') }}</span>
    </div>

    <div class="hierarchy-pyramid">
      <div
        v-for="level in levels"
        :key="level.className"
        :class="['pyramid-level', level.className]"
      >
        <div class="level-name">{{ level.name }}</div>
        <div class="level-speed">{{ level.speed }}</div>
        <div class="level-size">{{ level.size }}</div>
      </div>
    </div>

    <div class="comparison-table">
      <div class="table-title">{{ t('computerOrganization.storageHierarchy.tableTitle') }}</div>
      <table class="hierarchy-table">
        <thead>
          <tr>
            <th v-for="header in messages.computerOrganization.storageHierarchy.headers" :key="header">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in messages.computerOrganization.storageHierarchy.rows" :key="row[0]">
            <td v-for="cell in row" :key="cell">{{ cell }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="principle">
      <div class="principle-title">{{ t('computerOrganization.storageHierarchy.principleTitle') }}</div>
      <div class="principle-content">
        <div class="principle-text">
          {{ t('computerOrganization.storageHierarchy.principleTextPrefix') }}
          <strong>{{ t('computerOrganization.storageHierarchy.temporalLocality') }}</strong>
          {{ t('computerOrganization.storageHierarchy.principleTextMiddle') }}
          <strong>{{ t('computerOrganization.storageHierarchy.spatialLocality') }}</strong>
          {{ t('computerOrganization.storageHierarchy.principleTextSuffix') }}
        </div>
        <div class="principle-example">
          {{ t('computerOrganization.storageHierarchy.principleExample') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals/index.js'

const { t, messages } = useI18n(computerFundamentalsLocale)

const levels = computed(() => messages.value.computerOrganization.storageHierarchy.levels)
</script>

<style scoped>
.storage-hierarchy-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.demo-header .title {
  font-weight: 700;
  font-size: 1.1rem;
}
.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.hierarchy-pyramid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.pyramid-level {
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
  color: white;
}

.pyramid-level.register {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.pyramid-level.cache {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.pyramid-level.ram {
  background: linear-gradient(135deg, #10b981, #059669);
}

.pyramid-level.disk {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.pyramid-level.network {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.level-name {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.35rem;
}

.level-speed {
  font-size: 0.8rem;
  margin-bottom: 0.35rem;
}

.level-size {
  font-size: 0.8rem;
}

.comparison-table {
  margin-bottom: 2rem;
}

.table-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.hierarchy-table {
  width: 100%;
  border-collapse: collapse;
}

.hierarchy-table th {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.75rem;
  text-align: center;
  font-size: 0.85rem;
}

.hierarchy-table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  text-align: center;
  font-size: 0.85rem;
  font-family: 'Courier New', monospace;
}

.principle {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.principle-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.principle-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.principle-text {
  font-size: 0.95rem;
  line-height: 1.6;
}

.principle-example {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}
</style>
