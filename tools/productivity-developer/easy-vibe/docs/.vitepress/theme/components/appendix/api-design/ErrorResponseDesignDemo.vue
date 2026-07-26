<template>
  <div class="demo">
    <div class="header">
      <span class="icon">⚠️</span>
      <span class="title">{{ t('errorResponse.title') }}</span>
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
      <div v-if="active === 'validate'" class="section">
        <h4>{{ t('errorResponse.validate.title') }}</h4>
        <pre class="code-block">{{ t('errorResponse.validate.code') }}</pre>
        <div class="field-tips">
          <div
            v-for="tip in validateTips"
            :key="tip.code"
            class="tip-row"
          >
            <code>{{ tip.code }}</code>
            <span>{{ tip.desc }}</span>
          </div>
        </div>
      </div>

      <div v-if="active === 'business'" class="section">
        <h4>{{ t('errorResponse.business.title') }}</h4>
        <pre class="code-block">{{ t('errorResponse.business.code') }}</pre>
        <div class="business-tips">
          <div
            v-for="tip in businessTips"
            :key="tip"
            class="b-tip"
          >
            ✓ {{ tip }}
          </div>
        </div>
      </div>

      <div v-if="active === 'layers'" class="section">
        <h4>{{ t('errorResponse.layersTitle') }}</h4>
        <div class="layer-list">
          <div v-for="layer in layers" :key="layer.range" class="layer-item">
            <div class="layer-range">{{ layer.range }}</div>
            <div class="layer-info">
              <div class="layer-name">{{ layer.name }}</div>
              <div class="layer-example">{{ t('errorResponse.layerExampleLabel') }}{{ layer.example }}</div>
            </div>
            <div class="layer-desc">{{ layer.desc }}</div>
          </div>
        </div>
        <div class="layer-note">
          {{ t('errorResponse.layerNote') }}
        </div>
      </div>

      <div v-if="active === 'http'" class="section">
        <h4>{{ t('errorResponse.http.title') }}</h4>
        <div class="http-compare">
          <div class="http-col">
            <div class="http-title">{{ t('errorResponse.http.httpTitle') }}</div>
            <div class="http-desc">{{ t('errorResponse.http.httpDesc') }}</div>
            <div class="http-codes">
              <div
                v-for="code in httpCodes"
                :key="code.num"
                class="http-code"
              >
                <span class="code-num">{{ code.num }}</span>
                <span>{{ code.label }}</span>
              </div>
            </div>
          </div>
          <div class="http-arrow">→</div>
          <div class="http-col">
            <div class="http-title">{{ t('errorResponse.http.bizTitle') }}</div>
            <div class="http-desc">{{ t('errorResponse.http.bizDesc') }}</div>
            <div class="http-codes">
              <div
                v-for="code in bizCodes"
                :key="code.num"
                class="http-code"
              >
                <span class="code-num">{{ code.num }}</span>
                <span>{{ code.label }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="http-note">{{ t('errorResponse.http.note') }}</div>
      </div>

      <div v-if="active === 'examples'" class="section">
        <h4>{{ t('errorResponse.examplesTitle') }}</h4>
        <div class="ex-tabs">
          <button
            v-for="ex in examples"
            :key="ex.id"
            :class="['ex-tab', { active: exId === ex.id }]"
            @click="exId = ex.id"
          >
            {{ ex.name }}
          </button>
        </div>
        <div class="ex-content">
          <div class="ex-list">
            <div
              v-for="item in currentExample.items"
              :key="item.code"
              class="ex-row"
            >
              <code class="ex-code">{{ item.code }}</code>
              <span class="ex-msg">{{ item.message }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tips">
      <span class="tips-icon">💡</span>
      <span class="tips-text">{{ t('errorResponse.tip') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { apiDesignLocale } from '../../../locales/api-design/index.js'

const { t, messages } = useI18n(apiDesignLocale)
const active = ref('validate')
const exId = ref('param')
const tabs = computed(() => messages.value.errorResponse.tabs)
const validateTips = computed(() => messages.value.errorResponse.validate.tips)
const businessTips = computed(() => messages.value.errorResponse.business.tips)
const layers = computed(() => messages.value.errorResponse.layers)
const httpCodes = computed(() => messages.value.errorResponse.http.httpCodes)
const bizCodes = computed(() => messages.value.errorResponse.http.bizCodes)
const examples = computed(() => messages.value.errorResponse.examples)

const currentExample = computed(() => {
  return examples.value.find((e) => e.id === exId.value) || examples.value[0]
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

.field-tips {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tip-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.tip-row code {
  background: var(--vp-c-bg-soft);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: var(--vp-c-brand);
  min-width: 70px;
}

.tip-row span {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.business-tips {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.b-tip {
  font-size: 12px;
  color: var(--vp-c-text-2);
  padding: 6px 10px;
  background: var(--vp-c-bg);
  border-radius: 4px;
}

.layer-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.layer-item {
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 10px 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

@media (max-width: 640px) {
  .layer-item {
    grid-template-columns: 1fr;
    gap: 6px;
  }
}

.layer-range {
  font-family: monospace;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  padding: 4px 8px;
  border-radius: 4px;
  text-align: center;
}

.layer-name {
  font-size: 13px;
  font-weight: 600;
}

.layer-example {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.layer-desc {
  font-size: 11px;
  color: var(--vp-c-text-2);
  background: color-mix(in srgb, var(--vp-c-brand) 10%, transparent);
  padding: 4px 8px;
  border-radius: 4px;
}

.layer-note {
  margin-top: 12px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.http-compare {
  display: flex;
  align-items: stretch;
  gap: 12px;
}

@media (max-width: 640px) {
  .http-compare {
    flex-direction: column;
  }

  .http-arrow {
    display: none;
  }
}

.http-col {
  flex: 1;
  padding: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.http-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
}

.http-desc {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-bottom: 10px;
}

.http-arrow {
  display: flex;
  align-items: center;
  font-size: 20px;
  color: var(--vp-c-text-3);
}

.http-codes {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.http-code {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.code-num {
  font-family: monospace;
  font-weight: 600;
  color: var(--vp-c-brand);
  min-width: 50px;
}

.http-note {
  margin-top: 12px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  padding: 8px 12px;
  background: color-mix(in srgb, #22c55e 10%, var(--vp-c-bg));
  border-radius: 6px;
}

.ex-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.ex-tab {
  padding: 5px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s;
}

.ex-tab:hover {
  border-color: var(--vp-c-brand);
}

.ex-tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.ex-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ex-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.ex-code {
  font-family: monospace;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  padding: 2px 8px;
  border-radius: 4px;
  min-width: 50px;
  text-align: center;
}

.ex-msg {
  font-size: 12px;
  color: var(--vp-c-text-2);
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
