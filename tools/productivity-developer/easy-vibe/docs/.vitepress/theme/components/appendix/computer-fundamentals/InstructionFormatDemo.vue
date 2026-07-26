<template>
  <div class="instruction-format-demo">
    <div class="demo-header">
      <span class="title">{{ t('computerOrganization.instructionFormat.title') }}</span>
      <span class="subtitle">{{ t('computerOrganization.instructionFormat.subtitle') }}</span>
    </div>

    <div class="format-selector">
      <button 
        v-for="fmt in instructionFormats" 
        :key="fmt.id"
        :class="['format-btn', { active: selectedFormat === fmt.id }]"
        @click="selectedFormat = fmt.id"
      >
        {{ fmt.type }}
      </button>
    </div>

    <div v-if="selectedFormatData" class="format-visualization">
      <div class="format-diagram">
        <div 
          v-for="(field, i) in selectedFormatData.fields" 
          :key="i"
          class="field-box"
          :style="{ flex: field.bits }"
        >
          <span class="field-name">{{ field.name }}</span>
          <span class="field-bits">{{ t('computerOrganization.instructionFormat.bitLabel', { bits: field.bits }) }}</span>
        </div>
      </div>
      
      <div class="format-example">
        <div class="example-title">{{ t('computerOrganization.instructionFormat.exampleTitle') }}</div>
        <div class="binary-display">
          <span 
            v-for="(bit, i) in selectedFormatData.example" 
            :key="i"
            class="bit"
            :class="{ highlight: isHighlight(i, selectedFormatData) }"
          >
            {{ bit }}
          </span>
        </div>
        <div class="example-desc">{{ selectedFormatData.description }}</div>
      </div>

      <div class="format-explanation">
        <div class="exp-title">
          {{ t('computerOrganization.instructionFormat.formatExplanationTitle', { type: selectedFormatData.type }) }}
        </div>
        <div class="exp-content">{{ selectedFormatData.explanation }}</div>
        
        <div v-if="selectedFormatData.examples" class="examples-list">
          <div class="list-title">{{ t('computerOrganization.instructionFormat.commonExamples') }}</div>
          <div v-for="ex in selectedFormatData.examples" :key="ex.name" class="example-item">
            <span class="ex-name">{{ ex.name }}</span>
            <span class="ex-desc">{{ ex.desc }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="opcode-table">
      <div class="table-title">{{ t('computerOrganization.instructionFormat.opcodeTitle') }}</div>
      <div class="opcode-grid">
        <div v-for="op in opcodes" :key="op[0]" class="opcode-item">
          <span class="op-code">{{ op[0] }}</span>
          <span class="op-name">{{ op[1] }}</span>
          <span class="op-desc">{{ op[2] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals/index.js'

const { t, messages } = useI18n(computerFundamentalsLocale)

const selectedFormat = ref('three')

const instructionFormats = computed(() => messages.value.computerOrganization.instructionFormat.formats)

const selectedFormatData = computed(() => {
  return instructionFormats.value.find(f => f.id === selectedFormat.value)
})

const isHighlight = (index) => {
  const opcodeBits = 8
  return index < opcodeBits
}

const opcodes = computed(() => messages.value.computerOrganization.instructionFormat.opcodes)
</script>

<style scoped>
.instruction-format-demo {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
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

.format-selector {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.format-btn {
  padding: 8px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s;
}

.format-btn.active {
  border-color: #22c55e;
  background: #dcfce7;
  color: #166534;
}

.format-visualization {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.format-diagram {
  display: flex;
  gap: 2px;
  margin-bottom: 16px;
}

.field-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
  background: #e0f2fe;
  border-radius: 4px;
  text-align: center;
}

.field-box:first-child {
  background: #fef3c7;
}

.field-name {
  font-size: 12px;
  font-weight: 600;
  color: #1e293b;
}

.field-bits {
  font-size: 10px;
  color: #64748b;
}

.format-example {
  padding: 12px;
  background: #f8fafc;
  border-radius: 6px;
  margin-bottom: 12px;
}

.example-title {
  font-size: 12px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.binary-display {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  margin-bottom: 8px;
}

.bit {
  padding: 4px 6px;
  background: #e2e8f0;
  border-radius: 2px;
  font-family: monospace;
  font-size: 12px;
  color: #475569;
}

.bit.highlight {
  background: #fef3c7;
  font-weight: 600;
}

.example-desc {
  font-size: 11px;
  color: #64748b;
}

.format-explanation {
  padding: 12px;
  background: #f0f9ff;
  border-radius: 6px;
}

.exp-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.exp-content {
  font-size: 12px;
  color: #475569;
  line-height: 1.6;
}

.examples-list {
  margin-top: 12px;
}

.list-title {
  font-size: 12px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 6px;
}

.example-item {
  display: flex;
  gap: 12px;
  padding: 4px 0;
  font-size: 11px;
}

.ex-name {
  font-family: monospace;
  color: #0369a1;
  min-width: 80px;
}

.ex-desc {
  color: #64748b;
}

.opcode-table {
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

.opcode-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 8px;
}

.opcode-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  background: #f8fafc;
  border-radius: 4px;
  font-size: 11px;
}

.op-code {
  font-family: monospace;
  padding: 2px 6px;
  background: #e0f2fe;
  border-radius: 2px;
  color: #0369a1;
}

.op-name {
  font-weight: 600;
  color: #1e293b;
  min-width: 40px;
}

.op-desc {
  color: #64748b;
}
</style>
