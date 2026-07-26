<template>
  <div class="demo">
    <div class="header">
      <span class="icon">📦</span>
      <span class="title">{{ t('dataField.title') }}</span>
    </div>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab', { active: active === tab.id }]"
        @click="active = tab.id"
      >
        <span v-html="tab.icon" />
        {{ tab.name }}
      </button>
    </div>

    <div class="content">
      <div v-if="active === 'structure'" class="section">
        <h4>{{ t('dataField.structure.title') }}</h4>
        <div class="compare-row">
          <div class="compare-col">
            <div class="compare-title">{{ t('dataField.structure.singleTitle') }}</div>
            <pre class="code-sm">{{ t('dataField.structure.singleCode') }}</pre>
          </div>
          <div class="compare-col">
            <div class="compare-title">{{ t('dataField.structure.listTitle') }}</div>
            <pre class="code-sm">{{ t('dataField.structure.listCode') }}</pre>
          </div>
        </div>
        <div class="note">
          {{ t('dataField.structure.note') }}
        </div>
      </div>

      <div v-if="active === 'naming'" class="section">
        <h4>{{ t('dataField.namingTitle') }}</h4>
        <div class="rule-list">
          <div v-for="rule in namingRules" :key="rule.name" class="rule-item">
            <div class="rule-header">
              <span class="rule-icon" v-html="rule.icon" />
              <span class="rule-name">{{ rule.name }}</span>
            </div>
            <div class="rule-examples">
              <code class="good">{{ rule.good }}</code>
              <span v-if="rule.bad" class="vs">vs</span>
              <code v-if="rule.bad" class="bad">{{ rule.bad }}</code>
            </div>
            <div class="rule-desc">{{ rule.desc }}</div>
          </div>
        </div>
      </div>

      <div v-if="active === 'datetime'" class="section">
        <h4>{{ t('dataField.datetime.title') }}</h4>
        <div class="time-example">
          <pre class="code-block">{{ t('dataField.datetime.code') }}</pre>
        </div>
        <div class="time-rules">
          <div
            v-for="rule in datetimeRules"
            :key="rule.label"
            class="time-rule"
          >
            <span class="rule-label">{{ rule.label }}</span>
            <span class="rule-value">{{ rule.value }}</span>
          </div>
        </div>
      </div>

      <div v-if="active === 'null'" class="section">
        <h4>{{ t('dataField.nulls.title') }}</h4>
        <div class="compare-row">
          <div class="compare-col good-col">
            <div class="compare-title" v-html="t('dataField.nulls.goodTitle')" />
            <pre class="code-sm">{{ t('dataField.nulls.goodCode') }}</pre>
            <div class="compare-desc">{{ t('dataField.nulls.goodDesc') }}</div>
          </div>
          <div class="compare-col bad-col">
            <div class="compare-title" v-html="t('dataField.nulls.badTitle')" />
            <pre class="code-sm">{{ t('dataField.nulls.badCode') }}</pre>
            <div class="compare-desc">{{ t('dataField.nulls.badDesc') }}</div>
          </div>
        </div>
        <div class="null-tips">
          <div
            v-for="tip in nullTips"
            :key="tip"
            class="tip-item"
          >
            {{ tip }}
          </div>
        </div>
      </div>

      <div v-if="active === 'relation'" class="section">
        <h4>{{ t('dataField.relationTitle') }}</h4>
        <div class="relation-tabs">
          <button
            v-for="r in relations"
            :key="r.id"
            :class="['r-tab', { active: rId === r.id }]"
            @click="rId = r.id"
          >
            {{ r.name }}
          </button>
        </div>
        <div class="relation-content">
          <div class="relation-desc">{{ currentRelation.desc }}</div>
          <pre class="code-block"><code>{{ currentRelation.code }}</code></pre>
        </div>
      </div>
    </div>

    <div class="tips">
      <span class="tips-icon">💡</span>
      <span class="tips-text">{{ t('dataField.tip') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { apiDesignLocale } from '../../../locales/api-design/index.js'

const { t, messages } = useI18n(apiDesignLocale)
const active = ref('structure')
const rId = ref('embed')
const tabs = computed(() => messages.value.dataField.tabs)
const namingRules = computed(() => messages.value.dataField.namingRules)
const datetimeRules = computed(() => messages.value.dataField.datetime.rules)
const nullTips = computed(() => messages.value.dataField.nulls.tips)
const relations = computed(() => messages.value.dataField.relations)

const currentRelation = computed(() => {
  return relations.value.find((r) => r.id === rId.value) || relations.value[0]
})
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
  overflow: hidden;
}

.header {
  padding: 14px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  font-size: 20px;
}

.title {
  font-weight: 600;
  font-size: 15px;
}

.tabs {
  display: flex;
  gap: 4px;
  padding: 10px 12px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  overflow-x: auto;
}

.tab {
  padding: 6px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.tab:hover {
  border-color: var(--vp-c-brand);
}

.tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.content {
  padding: 16px;
}

.section h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
}

.compare-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

@media (max-width: 640px) {
  .compare-row {
    grid-template-columns: 1fr;
  }
}

.compare-col {
  padding: 12px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}

.compare-col.good-col {
  border-color: color-mix(in srgb, #22c55e 30%, transparent);
  background: color-mix(in srgb, #22c55e 5%, var(--vp-c-bg));
}

.compare-col.bad-col {
  border-color: color-mix(in srgb, #ef4444 30%, transparent);
  background: color-mix(in srgb, #ef4444 5%, var(--vp-c-bg));
}

.compare-title {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
}

.compare-desc {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-top: 8px;
}

.code-sm {
  background: #1e293b;
  color: #e2e8f0;
  padding: 10px;
  border-radius: 6px;
  font-family: 'Menlo', monospace;
  font-size: 11px;
  line-height: 1.5;
  overflow-x: auto;
  margin: 0;
}

.code-block {
  background: #1e293b;
  color: #e2e8f0;
  padding: 12px;
  border-radius: 6px;
  font-family: 'Menlo', monospace;
  font-size: 11px;
  line-height: 1.5;
  overflow-x: auto;
  margin: 0;
}

.note {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-top: 12px;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.rule-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rule-item {
  padding: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.rule-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.rule-icon {
  font-size: 16px;
}

.rule-name {
  font-size: 13px;
  font-weight: 600;
}

.rule-examples {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.rule-examples code {
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.rule-examples .good {
  background: color-mix(in srgb, #22c55e 15%, transparent);
  color: #16a34a;
}

.rule-examples .bad {
  background: color-mix(in srgb, #ef4444 15%, transparent);
  color: #dc2626;
  text-decoration: line-through;
}

.rule-examples .vs {
  font-size: 10px;
  color: var(--vp-c-text-3);
}

.rule-desc {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.time-example {
  margin-bottom: 12px;
}

.time-rules {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.time-rule {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.rule-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  min-width: 40px;
}

.rule-value {
  font-size: 12px;
  color: var(--vp-c-text-1);
}

.null-tips {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tip-item {
  font-size: 12px;
  color: var(--vp-c-text-2);
  padding: 6px 10px;
  background: var(--vp-c-bg);
  border-radius: 4px;
}

.tip-item code {
  background: var(--vp-c-bg-soft);
  padding: 1px 5px;
  border-radius: 3px;
  font-size: 11px;
}

.relation-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 12px;
}

.r-tab {
  padding: 6px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.r-tab:hover {
  border-color: var(--vp-c-brand);
}

.r-tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.relation-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-bottom: 10px;
}

.tips {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
}

.tips-icon {
  font-size: 14px;
}

.tips-text {
  font-size: 12px;
  color: var(--vp-c-text-2);
}
</style>
