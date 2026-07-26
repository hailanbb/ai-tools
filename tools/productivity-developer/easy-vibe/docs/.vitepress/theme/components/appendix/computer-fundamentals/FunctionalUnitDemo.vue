<template>
  <div class="functional-unit-demo">
    <div class="demo-label">
      {{ t('functionalUnit.label') }}
    </div>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-btn"
        :class="{ active: currentTab === tab.id }"
        @click="currentTab = tab.id"
      >
        {{ tab.name }}
      </button>
    </div>

    <div class="demo-content">
      <!-- MUX Demo -->
      <div v-if="currentTab === 'mux'" class="demo-panel">
        <div class="panel-desc">
          {{ t('functionalUnit.mux.desc') }}
        </div>
        <div class="mux-container">
          <div class="inputs">
            <div class="input-line">
              <span class="label">{{ t('functionalUnit.mux.data0') }}</span>
              <button
                class="toggle-btn"
                :class="{ on: muxD0 }"
                @click="muxD0 = !muxD0"
              >
                {{ muxD0 ? '1' : '0' }}
              </button>
            </div>
            <div class="input-line">
              <span class="label">{{ t('functionalUnit.mux.data1') }}</span>
              <button
                class="toggle-btn"
                :class="{ on: muxD1 }"
                @click="muxD1 = !muxD1"
              >
                {{ muxD1 ? '1' : '0' }}
              </button>
            </div>
          </div>

          <div class="mux-chip">
            <div class="chip-body">MUX</div>
            <div class="select-pin">
              <span class="label">{{ t('functionalUnit.mux.select') }}</span>
              <button
                class="select-btn"
                :class="{ on: muxSel }"
                @click="muxSel = !muxSel"
              >
                {{ muxSel ? '1' : '0' }}
              </button>
            </div>
          </div>

          <div class="outputs">
            <div class="output-line" :class="{ active: muxResult }">
              <span class="label">{{ t('functionalUnit.mux.output') }}</span>
              <span class="out-val">{{ muxResult ? '1' : '0' }}</span>
            </div>
          </div>
        </div>
        <div class="logic-explain">
          <p>
            {{ muxExplain }}
          </p>
        </div>
      </div>

      <!-- Decoder Demo -->
      <div v-if="currentTab === 'decoder'" class="demo-panel">
        <div class="panel-desc">
          {{ t('functionalUnit.decoder.desc') }}
        </div>
        <div class="decoder-container">
          <div class="inputs vertical">
            <div class="input-line">
              <button
                class="toggle-btn"
                :class="{ on: decA1 }"
                @click="decA1 = !decA1"
              >
                {{ decA1 ? '1' : '0' }}
              </button>
              <span class="label">{{ t('functionalUnit.decoder.highBit') }}</span>
            </div>
            <div class="input-line">
              <button
                class="toggle-btn"
                :class="{ on: decA0 }"
                @click="decA0 = !decA0"
              >
                {{ decA0 ? '1' : '0' }}
              </button>
              <span class="label">{{ t('functionalUnit.decoder.lowBit') }}</span>
            </div>
          </div>

          <div class="decoder-chip">
            <div class="chip-body">{{ t('functionalUnit.decoder.chip') }}</div>
          </div>

          <div class="outputs vertical-out">
            <div class="output-line" :class="{ active: decResult === 0 }">
              <span class="out-val">{{ decResult === 0 ? '1' : '0' }}</span>
              <span class="label">{{ decoderOutputLabels[0] }}</span>
            </div>
            <div class="output-line" :class="{ active: decResult === 1 }">
              <span class="out-val">{{ decResult === 1 ? '1' : '0' }}</span>
              <span class="label">{{ decoderOutputLabels[1] }}</span>
            </div>
            <div class="output-line" :class="{ active: decResult === 2 }">
              <span class="out-val">{{ decResult === 2 ? '1' : '0' }}</span>
              <span class="label">{{ decoderOutputLabels[2] }}</span>
            </div>
            <div class="output-line" :class="{ active: decResult === 3 }">
              <span class="out-val">{{ decResult === 3 ? '1' : '0' }}</span>
              <span class="label">{{ decoderOutputLabels[3] }}</span>
            </div>
          </div>
        </div>
        <div class="logic-explain">
          <p>
            {{ decoderExplain }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals/index.js'

const { t, messages } = useI18n(computerFundamentalsLocale)
const tabs = computed(() => messages.value.functionalUnit.tabs)

const currentTab = ref('mux')

// MUX State
const muxD0 = ref(false)
const muxD1 = ref(true)
const muxSel = ref(false)
const muxResult = computed(() => (muxSel.value ? muxD1.value : muxD0.value))
const muxExplain = computed(() =>
  t('functionalUnit.mux.explain')
    .replace('{sel}', muxSel.value ? '1' : '0')
    .replace('{data}', muxSel.value ? '1 (D1)' : '0 (D0)')
    .replace('{result}', muxResult.value ? '1' : '0')
)

// Decoder State
const decA1 = ref(false)
const decA0 = ref(false)
const decResult = computed(() => (decA1.value ? 2 : 0) + (decA0.value ? 1 : 0))
const decoderOutputLabels = computed(
  () => messages.value.functionalUnit.decoder.outputLabels
)
const decoderExplain = computed(() =>
  t('functionalUnit.decoder.explain')
    .replace('{binary}', `${decA1.value ? '1' : '0'}${decA0.value ? '1' : '0'}`)
    .replaceAll('{decimal}', String(decResult.value))
)
</script>

<style scoped>
.functional-unit-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  letter-spacing: 0.2px;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
}

.tab-btn {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  border-radius: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  border-color: var(--vp-c-brand-1);
}

.tab-btn.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  font-weight: bold;
}

.panel-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
}

/* common elements */
.toggle-btn {
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  font-weight: bold;
  font-family: monospace;
  cursor: pointer;
  transition: all 0.2s;
}
.toggle-btn.on {
  background: var(--vp-c-green-soft, #dcfce7);
  color: var(--vp-c-green-1, #16a34a);
  border-color: var(--vp-c-green-1, #16a34a);
}

.out-val {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  font-weight: bold;
  font-family: monospace;
}
.output-line.active .out-val {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}
.output-line.active .label {
  color: var(--vp-c-brand-1);
  font-weight: bold;
}

.logic-explain {
  margin-top: 1rem;
  padding: 0.8rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 0.85rem;
  text-align: center;
  color: var(--vp-c-text-2);
}

/* MUX Layout */
.mux-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.label {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}

.mux-chip {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chip-body {
  width: 4rem;
  height: 6rem;
  background: var(--vp-c-bg-alt);
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  clip-path: polygon(0 0, 100% 20%, 100% 80%, 0 100%);
}

.select-pin {
  position: absolute;
  bottom: -2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}

.select-btn {
  width: 2rem;
  height: 1.5rem;
  border-radius: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  font-size: 0.8rem;
  cursor: pointer;
}
.select-btn.on {
  background: #fef08a; /* yellow soft */
  color: #a16207;
  border-color: #a16207;
}

/* Decoder Layout */
.decoder-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
}

.inputs.vertical,
.outputs.vertical-out {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.decoder-chip .chip-body {
  width: 5rem;
  height: 8rem;
  background: var(--vp-c-bg-alt);
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-align: center;
  clip-path: none;
  border-radius: 4px;
}
</style>
