<template>
  <div class="dns-record-demo">
    <h4 style="margin: 0 0 12px 0; color: #1a1a2e">
      {{ t('records.title') }}
    </h4>
    <div class="tab-row">
      <button
        v-for="rec in records"
        :key="rec.type"
        class="tab-btn"
        :class="{ active: selected === rec.type }"
        @click="selected = rec.type"
      >
        {{ rec.type }}
      </button>
    </div>

    <div v-if="current" class="detail-card">
      <div class="detail-header">
        <span class="type-badge">{{ current.type }}</span>
        <span class="type-name">{{ current.name }}</span>
      </div>
      <p class="type-desc">{{ current.desc }}</p>

      <div class="example-block">
        <div class="example-title">{{ t('records.exampleTitle') }}</div>
        <code class="example-code">{{ current.example }}</code>
      </div>

      <div class="usage-block">
        <div class="usage-title">{{ t('records.usageTitle') }}</div>
        <ul class="usage-list">
          <li v-for="(u, i) in current.usages" :key="i">{{ u }}</li>
        </ul>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ t('records.tipPrefix') }}</strong>
      {{ t('records.tipText') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { dnsHttpsLocale } from '../../../locales/dns-https/index.js'

const selected = ref('A')
const { t, messages } = useI18n(dnsHttpsLocale)

const records = computed(() => messages.value.records.items)

const current = computed(() => records.value.find((r) => r.type === selected.value))
</script>

<style scoped>
.dns-record-demo {
  background: linear-gradient(135deg, #f3e5f5 0%, #ede7f6 100%);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  font-family: system-ui, sans-serif;
}

.tab-row {
  display: flex;
  gap: 6px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 6px 16px;
  border: 2px solid #ce93d8;
  border-radius: 20px;
  background: #fff;
  color: #7b1fa2;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn.active {
  background: #7b1fa2;
  color: #fff;
  border-color: #7b1fa2;
}

.tab-btn:hover:not(.active) {
  background: #f3e5f5;
}

.detail-card {
  background: #fff;
  border-radius: 10px;
  padding: 18px;
  margin-bottom: 14px;
  border: 1px solid #e1bee7;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.type-badge {
  background: #7b1fa2;
  color: #fff;
  padding: 3px 12px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 14px;
  font-family: monospace;
}

.type-name {
  font-size: 15px;
  color: #555;
  font-weight: 500;
}

.type-desc {
  font-size: 14px;
  color: #333;
  line-height: 1.7;
  margin: 0 0 14px 0;
}

.example-block {
  background: #263238;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 14px;
}

.example-title {
  font-size: 11px;
  color: #80cbc4;
  margin-bottom: 6px;
  font-weight: 600;
}

.example-code {
  color: #e0f7fa;
  font-size: 13px;
  font-family: 'Fira Code', monospace;
  word-break: break-all;
}

.usage-block {
  background: #f3e5f5;
  border-radius: 8px;
  padding: 12px 16px;
}

.usage-title {
  font-size: 12px;
  font-weight: 700;
  color: #7b1fa2;
  margin-bottom: 6px;
}

.usage-list {
  margin: 0;
  padding-left: 18px;
  font-size: 13px;
  color: #444;
  line-height: 1.8;
}

.info-box {
  margin-top: 14px;
  padding: 10px 14px;
  background: #fff3e0;
  border-radius: 8px;
  font-size: 13px;
  color: #5d4037;
  line-height: 1.6;
}
</style>
