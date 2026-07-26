<template>
  <div class="addressing-mode-demo">
    <div class="demo-header">
      <span class="title">{{ t('computerOrganization.addressingMode.title') }}</span>
      <span class="subtitle">{{ t('computerOrganization.addressingMode.subtitle') }}</span>
    </div>

    <div class="mode-selector">
      <button 
        v-for="mode in addressingModes" 
        :key="mode.id"
        :class="['mode-btn', { active: selectedMode === mode.id }]"
        @click="selectMode(mode)"
      >
        {{ mode.name }}
      </button>
    </div>

    <div v-if="selectedModeData" class="mode-details">
      <div class="detail-header">
        <span class="mode-name">{{ selectedModeData.name }}</span>
        <span class="mode-english">{{ selectedModeData.english }}</span>
      </div>
      
      <div class="detail-content">
        <div class="detail-section">
          <div class="section-title">{{ t('computerOrganization.addressingMode.definition') }}</div>
          <div class="section-content">{{ selectedModeData.definition }}</div>
        </div>

        <div class="detail-section">
          <div class="section-title">{{ t('computerOrganization.addressingMode.instructionFormat') }}</div>
          <div class="instruction-example">
            <code>{{ selectedModeData.format }}</code>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">{{ t('computerOrganization.addressingMode.example') }}</div>
          <div class="example-code">
            <div class="code-line">{{ selectedModeData.example.assembly }}</div>
            <div class="code-desc">{{ selectedModeData.example.description }}</div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">{{ t('computerOrganization.addressingMode.executionProcess') }}</div>
          <div class="execution-flow">
            <div v-for="(step, i) in selectedModeData.steps" :key="i" class="flow-step">
              <span class="step-num">{{ i + 1 }}</span>
              <span class="step-text">{{ step }}</span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">{{ t('computerOrganization.addressingMode.characteristics') }}</div>
          <div class="characteristics">
            <div class="char-item" :class="selectedModeData.fast ? 'fast' : 'slow'">
              <span class="char-label">{{ t('computerOrganization.addressingMode.speed') }}</span>
              <span class="char-value">
                {{ selectedModeData.fast ? t('computerOrganization.addressingMode.fast') : t('computerOrganization.addressingMode.slow') }}
              </span>
            </div>
            <div class="char-item">
              <span class="char-label">{{ t('computerOrganization.addressingMode.flexibility') }}</span>
              <span class="char-value">{{ selectedModeData.flexibility }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <div class="table-title">{{ t('computerOrganization.addressingMode.comparisonTitle') }}</div>
      <table>
        <thead>
          <tr>
            <th v-for="header in messages.computerOrganization.addressingMode.headers" :key="header">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mode in addressingModes" :key="mode.id">
            <td>{{ mode.name }}</td>
            <td><code>{{ mode.format }}</code></td>
            <td :class="mode.fast ? 'fast' : 'slow'">
              {{ mode.fast ? t('computerOrganization.addressingMode.fastest') : t('computerOrganization.addressingMode.relativelyFast') }}
            </td>
            <td>{{ mode.usage }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals/index.js'

const { t, messages } = useI18n(computerFundamentalsLocale)

const selectedMode = ref('immediate')

const addressingModes = computed(() => messages.value.computerOrganization.addressingMode.modes)

const selectedModeData = computed(() =>
  addressingModes.value.find(mode => mode.id === selectedMode.value)
)

const selectMode = (mode) => {
  selectedMode.value = mode.id
}
</script>

<style scoped>
.addressing-mode-demo {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.title {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
}

.subtitle {
  font-size: 13px;
  color: #64748b;
  margin-left: auto;
}

.mode-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.mode-btn {
  padding: 8px 14px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.mode-btn.active {
  border-color: #f59e0b;
  background: #fef3c7;
}

.mode-details {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f3f4f6;
}

.mode-name {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
}

.mode-english {
  font-size: 13px;
  color: #64748b;
}

.detail-section {
  margin-bottom: 16px;
}

.section-title {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 6px;
  text-transform: uppercase;
}

.section-content {
  font-size: 14px;
  color: #1e293b;
  line-height: 1.6;
}

.instruction-example {
  background: #f1f5f9;
  padding: 10px;
  border-radius: 4px;
}

.instruction-example code {
  font-family: monospace;
  font-size: 14px;
  color: #0369a1;
}

.example-code {
  background: #f1f5f9;
  padding: 10px;
  border-radius: 4px;
}

.code-line {
  font-family: monospace;
  font-size: 13px;
  color: #0369a1;
  margin-bottom: 4px;
}

.code-desc {
  font-size: 12px;
  color: #64748b;
}

.execution-flow {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  background: #f8fafc;
  border-radius: 4px;
}

.step-num {
  width: 24px;
  height: 24px;
  background: #f59e0b;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.step-text {
  font-size: 13px;
  color: #475569;
}

.characteristics {
  display: flex;
  gap: 16px;
}

.char-item {
  padding: 8px 16px;
  background: #f8fafc;
  border-radius: 6px;
}

.char-label {
  font-size: 11px;
  color: #64748b;
  display: block;
}

.char-value {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.char-item.fast .char-value {
  color: #16a34a;
}

.char-item.slow .char-value {
  color: #ea580c;
}

.comparison-table {
  background: white;
  border-radius: 8px;
  padding: 12px;
}

.table-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.comparison-table th,
.comparison-table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.comparison-table th {
  background: #f8fafc;
  font-weight: 600;
  color: #1e293b;
}

.comparison-table td {
  color: #475569;
}

.comparison-table code {
  font-size: 11px;
  background: #f1f5f9;
  padding: 2px 6px;
  border-radius: 2px;
}

.fast {
  color: #16a34a;
}

.slow {
  color: #ea580c;
}
</style>
