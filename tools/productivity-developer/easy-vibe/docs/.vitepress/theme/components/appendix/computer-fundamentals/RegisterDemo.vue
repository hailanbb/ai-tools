<template>
  <div class="cpu-registers-demo">
    <div class="demo-header">
      <span class="title">{{ t('register.title') }}</span>
      <span class="subtitle">{{ t('register.subtitle') }}</span>
    </div>

    <div class="registers-layout">
      <!-- 专用寄存器 -->
      <div class="reg-section special-regs">
        <div class="section-title">{{ t('register.specialTitle') }}</div>
        <div class="reg-grid">
          <div v-for="reg in specialRegisters" :key="reg.name" class="reg-card" :class="{ active: activeReg === reg.name }" @click="selectReg(reg)">
            <div class="reg-name">{{ reg.name }}</div>
            <div class="reg-value">{{ reg.value }}</div>
            <div class="reg-desc">{{ reg.desc }}</div>
          </div>
        </div>
      </div>

      <!-- 通用寄存器 -->
      <div class="reg-section general-regs">
        <div class="section-title">{{ t('register.generalTitle') }}</div>
        <div class="reg-grid">
          <div v-for="reg in generalRegisters" :key="reg.name" class="reg-card small" :class="{ active: activeReg === reg.name }" @click="selectReg(reg)">
            <div class="reg-name">{{ reg.name }}</div>
            <div class="reg-value">{{ reg.value }}</div>
            <div class="reg-desc">{{ reg.desc }}</div>
          </div>
        </div>
      </div>

      <!-- 状态寄存器 -->
      <div class="reg-section status-reg">
        <div class="section-title">{{ t('register.flagsTitle') }}</div>
        <div class="flags-container">
          <div v-for="flag in statusFlags" :key="flag.name" class="flag-bit" :class="{ set: flag.value === 1 }">
            <span class="flag-name">{{ flag.name }}</span>
            <span class="flag-value">{{ flag.value }}</span>
            <span class="flag-desc">{{ flag.desc }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 寄存器详解 -->
    <div v-if="selectedReg" class="reg-details">
      <div class="details-header">
        <span class="details-title">
          {{ selectedReg.name }} {{ t('register.registerSuffix') }}
        </span>
        <span class="details-type">{{ selectedReg.type }}</span>
      </div>
      <div class="details-content">{{ selectedReg.detail }}</div>
    </div>

    <!-- 寄存器说明 -->
    <div class="register-explanation">
      <div class="exp-title">{{ t('register.comparisonTitle') }}</div>
      <div class="exp-table">
        <table>
          <thead>
            <tr>
              <th
                v-for="header in messages.register.comparisonHeaders"
                :key="header"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in messages.register.comparisonRows" :key="row[0]">
              <td v-for="cell in row" :key="cell">{{ cell }}</td>
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
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals/index.js'

const { t, messages } = useI18n(computerFundamentalsLocale)

const activeReg = ref('')
const selectedReg = ref(null)

const specialRegisters = computed(() => messages.value.register.specialRegisters)
const generalRegisters = computed(() => messages.value.register.generalRegisters)
const statusFlags = computed(() => messages.value.register.statusFlags)

const selectReg = (reg) => {
  selectedReg.value = reg
  activeReg.value = reg.name
}
</script>

<style scoped>
.cpu-registers-demo {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
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

.registers-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.reg-section {
  background: white;
  border-radius: 8px;
  padding: 12px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.reg-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 8px;
}

.reg-card {
  padding: 10px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.reg-card:hover {
  border-color: #3b82f6;
}

.reg-card.active {
  border-color: #3b82f6;
  background: #eff6ff;
}

.reg-card.small {
  padding: 8px;
}

.reg-name {
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
}

.reg-value {
  font-size: 11px;
  font-family: monospace;
  color: #0369a1;
  margin: 4px 0;
}

.reg-desc {
  font-size: 10px;
  color: #64748b;
}

.status-reg {
  margin-top: 0;
}

.flags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.flag-bit {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 12px;
  background: #f1f5f9;
  border-radius: 4px;
  min-width: 60px;
}

.flag-bit.set {
  background: #dbeafe;
  border: 1px solid #3b82f6;
}

.flag-name {
  font-size: 12px;
  font-weight: 600;
  color: #1e293b;
}

.flag-value {
  font-size: 16px;
  font-weight: 700;
  color: #64748b;
}

.flag-bit.set .flag-value {
  color: #3b82f6;
}

.flag-desc {
  font-size: 9px;
  color: #64748b;
  text-align: center;
}

.reg-details {
  margin-top: 16px;
  padding: 12px;
  background: white;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}

.details-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.details-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.details-type {
  font-size: 11px;
  padding: 2px 8px;
  background: #e0f2fe;
  border-radius: 4px;
  color: #0369a1;
}

.details-content {
  font-size: 12px;
  color: #475569;
  line-height: 1.6;
}

.register-explanation {
  margin-top: 16px;
  padding: 12px;
  background: white;
  border-radius: 8px;
}

.exp-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.exp-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.exp-table th,
.exp-table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.exp-table th {
  background: #f8fafc;
  font-weight: 600;
  color: #1e293b;
}

.exp-table td {
  color: #475569;
}
</style>
