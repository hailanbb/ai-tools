<template>
  <div class="complete-adder-demo">
    <div class="demo-header">
      <span class="title">{{ t('completeAdder.title') }}</span>
      <span class="subtitle">{{ t('completeAdder.subtitle') }}</span>
    </div>

    <div class="layer-tabs">
      <button
        v-for="layer in layers"
        :key="layer.id"
        class="layer-tab"
        :class="{ active: currentLayer === layer.id }"
        @click="currentLayer = layer.id"
      >
        {{ t(`completeAdder.layers.${layer.id}`) }}
      </button>
    </div>

    <div v-if="currentLayer === 'gates'" class="layer-panel">
      <div class="panel-title">{{ t('completeAdder.gates.title') }}</div>
      <div class="panel-desc">{{ t('completeAdder.gates.desc') }}</div>

      <div class="terms-box">
        <div
          v-for="term in messages.completeAdder.gates.terms"
          :key="term.name"
          class="term-item"
        >
          <span class="term-name">{{ term.name }}</span>
          <span class="term-desc">{{ term.desc }}</span>
        </div>
      </div>

      <div class="gates-showcase">
        <div
          v-for="gate in gates"
          :key="gate.name"
          class="gate-demo"
          :class="{ active: gateActive === gate.name }"
          @click="gateActive = gate.name"
        >
          <div class="gate-symbol">{{ gate.symbol }}</div>
          <div class="gate-info">
            <span class="gate-name">{{ gate.name }}</span>
            <span class="gate-formula">{{ gate.formula }}</span>
          </div>
          <div class="gate-mini-truth">
            <span
              v-for="(r, i) in gate.truth"
              :key="i"
              class="truth-dot"
              :class="{ one: r }"
              >{{ r }}</span>
          </div>
        </div>
      </div>

      <div class="info-box">
        <strong>{{ t('completeAdder.coreIdeaLabel') }}</strong>
        {{ t('completeAdder.gates.coreIdea') }}
      </div>
    </div>

    <div v-if="currentLayer === 'half'" class="layer-panel">
      <div class="panel-title">{{ t('completeAdder.half.title') }}</div>
      <div class="panel-desc">
        {{ t('completeAdder.half.desc') }}
      </div>

      <div class="terms-box">
        <div
          v-for="term in messages.completeAdder.half.terms"
          :key="term.name"
          class="term-item"
        >
          <span class="term-name">{{ term.name }}</span>
          <span class="term-desc">{{ term.desc }}</span>
        </div>
      </div>

      <div class="circuit-container">
        <div class="inputs">
          <div class="input-line">
            <button class="toggle-btn" :class="{ on: haA }" @click="haA = !haA">
              {{ haA ? '1' : '0' }}
            </button>
            <span class="label">{{ t('completeAdder.inputA') }}</span>
          </div>
          <div class="input-line">
            <button class="toggle-btn" :class="{ on: haB }" @click="haB = !haB">
              {{ haB ? '1' : '0' }}
            </button>
            <span class="label">{{ t('completeAdder.inputB') }}</span>
          </div>
        </div>

        <div class="wires">
          <svg class="wire-svg" viewBox="0 0 80 120" preserveAspectRatio="none">
            <path
              d="M 0,30 C 40,30 40,35 80,35"
              fill="none"
              :stroke="haA ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-3)'"
              stroke-width="2"
            />
            <path
              d="M 0,30 L 20,30 L 20,85 L 80,85"
              fill="none"
              :stroke="haA ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-3)'"
              stroke-width="2"
            />
            <path
              d="M 0,90 C 40,90 40,55 80,55"
              fill="none"
              :stroke="haB ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-3)'"
              stroke-width="2"
            />
            <path
              d="M 0,90 L 30,90 L 30,105 L 80,105"
              fill="none"
              :stroke="haB ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-3)'"
              stroke-width="2"
            />
            <circle
              cx="20"
              cy="30"
              r="3"
              :fill="haA ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-3)'"
            />
            <circle
              cx="30"
              cy="90"
              r="3"
              :fill="haB ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-3)'"
            />
          </svg>
        </div>

        <div class="gates">
          <div class="gate-box" :class="{ active: haSum }">
            <div class="gate-header">
              <span class="gate-name">XOR</span>
              <span class="gate-cn">{{ t('completeAdder.gateNames.xor') }}</span>
            </div>
            <div class="gate-formula">A XOR B</div>
            <div class="gate-desc">{{ t('completeAdder.half.xorDesc') }}</div>
          </div>
          <div class="gate-box" :class="{ active: haCarry }">
            <div class="gate-header">
              <span class="gate-name">AND</span>
              <span class="gate-cn">{{ t('completeAdder.gateNames.and') }}</span>
            </div>
            <div class="gate-formula">A AND B</div>
            <div class="gate-desc">{{ t('completeAdder.half.andDesc') }}</div>
          </div>
        </div>

        <div class="wires outputs-wires">
          <svg class="wire-svg" viewBox="0 0 40 120" preserveAspectRatio="none">
            <line
              x1="0"
              y1="45"
              x2="40"
              y2="45"
              :stroke="
                haSum ? 'var(--vp-c-green-1, #16a34a)' : 'var(--vp-c-text-3)'
              "
              stroke-width="2"
            />
            <line
              x1="0"
              y1="95"
              x2="40"
              y2="95"
              :stroke="haCarry ? '#d97706' : 'var(--vp-c-text-3)'"
              stroke-width="2"
            />
          </svg>
        </div>

        <div class="outputs">
          <div class="output-line" :class="{ active: haSum }">
            <span class="label">{{ t('completeAdder.sum') }}</span>
            <span class="out-val s-val">{{ haSum ? '1' : '0' }}</span>
          </div>
          <div class="output-line" :class="{ active: haCarry }">
            <span class="label">{{ t('completeAdder.carry') }}</span>
            <span class="out-val c-val">{{ haCarry ? '1' : '0' }}</span>
          </div>
        </div>
      </div>

      <div class="calculation-box">
        <div class="calc-title">{{ t('completeAdder.calcTitle') }}</div>
        <div class="calc-content">
          <div class="calc-row">
            <span class="calc-label">{{ t('completeAdder.inputLabel') }}</span>
            <span class="calc-value">A = {{ haA ? '1' : '0' }}, B = {{ haB ? '1' : '0' }}</span>
          </div>
          <div class="calc-row">
            <span class="calc-label">{{ t('completeAdder.sumLabel') }}</span>
            <span class="calc-formula">A XOR B = {{ haA ? '1' : '0' }} XOR {{ haB ? '1' : '0' }} =
              <strong>{{ haSum ? '1' : '0' }}</strong></span>
            <span class="calc-reason">({{ haA !== haB ? t('completeAdder.different') : t('completeAdder.same') }})</span>
          </div>
          <div class="calc-row">
            <span class="calc-label">{{ t('completeAdder.carryLabel') }}</span>
            <span class="calc-formula">A AND B = {{ haA ? '1' : '0' }} AND {{ haB ? '1' : '0' }} =
              <strong>{{ haCarry ? '1' : '0' }}</strong></span>
            <span class="calc-reason">({{ haA && haB ? t('completeAdder.allOne') : t('completeAdder.notAllOne') }})</span>
          </div>
        </div>
      </div>

      <div class="info-box">
        <strong>{{ t('completeAdder.coreIdeaLabel') }}</strong>
        {{ t('completeAdder.half.coreIdea') }}
      </div>
    </div>

    <div v-if="currentLayer === 'full'" class="layer-panel">
      <div class="panel-title">{{ t('completeAdder.full.title') }}</div>
      <div class="panel-desc">{{ t('completeAdder.full.desc') }}</div>

      <div class="terms-box">
        <div
          v-for="term in messages.completeAdder.full.terms"
          :key="term.name"
          class="term-item"
        >
          <span class="term-name">{{ term.name }}</span>
          <span class="term-desc">{{ term.desc }}</span>
        </div>
      </div>

      <div class="circuit-container">
        <div class="inputs">
          <div class="input-line">
            <button class="toggle-btn" :class="{ on: faA }" @click="faA = !faA">
              {{ faA ? '1' : '0' }}
            </button>
            <span class="label">A</span>
          </div>
          <div class="input-line">
            <button class="toggle-btn" :class="{ on: faB }" @click="faB = !faB">
              {{ faB ? '1' : '0' }}
            </button>
            <span class="label">B</span>
          </div>
          <div class="input-line">
            <button
              class="toggle-btn cin-btn"
              :class="{ on: faCin }"
              @click="faCin = !faCin"
            >
              {{ faCin ? '1' : '0' }}
            </button>
            <span class="label">Cin</span>
          </div>
        </div>

        <div class="wires">
          <svg
            class="wire-svg"
            viewBox="0 0 100 160"
            preserveAspectRatio="none"
          >
            <path
              d="M 0,30 C 30,30 30,40 60,40"
              fill="none"
              :stroke="faA ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-3)'"
              stroke-width="2"
            />
            <path
              d="M 0,30 L 15,30 L 15,100 L 60,100"
              fill="none"
              :stroke="faA ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-3)'"
              stroke-width="2"
            />
            <path
              d="M 0,80 C 30,80 30,55 60,55"
              fill="none"
              :stroke="faB ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-3)'"
              stroke-width="2"
            />
            <path
              d="M 0,80 L 25,80 L 25,115 L 60,115"
              fill="none"
              :stroke="faB ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-3)'"
              stroke-width="2"
            />
            <path
              d="M 0,130 C 30,130 30,130 60,130"
              fill="none"
              :stroke="faCin ? '#d97706' : 'var(--vp-c-text-3)'"
              stroke-width="2"
            />
            <circle
              cx="15"
              cy="30"
              r="3"
              :fill="faA ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-3)'"
            />
            <circle
              cx="25"
              cy="80"
              r="3"
              :fill="faB ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-3)'"
            />
          </svg>
        </div>

        <div class="gates-grid">
          <div class="gate-box sm" :class="{ active: faXor1 }">
            <span class="gate-name">XOR</span>
            <span class="gate-out">{{ faXor1 ? '1' : '0' }}</span>
          </div>
          <div class="gate-box sm" :class="{ active: faCarry1 }">
            <span class="gate-name">AND</span>
            <span class="gate-out">{{ faCarry1 ? '1' : '0' }}</span>
          </div>
          <div class="gate-box sm" :class="{ active: faSum }">
            <span class="gate-name">XOR</span>
            <span class="gate-out">{{ faSum ? '1' : '0' }}</span>
          </div>
          <div class="gate-box sm" :class="{ active: faCarryOut }">
            <span class="gate-name">OR</span>
            <span class="gate-out">{{ faCarryOut ? '1' : '0' }}</span>
          </div>
        </div>

        <div class="wires outputs-wires">
          <svg class="wire-svg" viewBox="0 0 40 160" preserveAspectRatio="none">
            <line
              x1="0"
              y1="48"
              x2="40"
              y2="48"
              :stroke="
                faSum ? 'var(--vp-c-green-1, #16a34a)' : 'var(--vp-c-text-3)'
              "
              stroke-width="2"
            />
            <line
              x1="0"
              y1="115"
              x2="40"
              y2="115"
              :stroke="faCarryOut ? '#d97706' : 'var(--vp-c-text-3)'"
              stroke-width="2"
            />
          </svg>
        </div>

        <div class="outputs">
          <div class="output-line" :class="{ active: faSum }">
            <span class="label">Sum</span>
            <span class="out-val s-val">{{ faSum ? '1' : '0' }}</span>
          </div>
          <div class="output-line" :class="{ active: faCarryOut }">
            <span class="label">Cout</span>
            <span class="out-val c-val">{{ faCarryOut ? '1' : '0' }}</span>
          </div>
        </div>
      </div>

      <div class="calculation-box">
        <div class="calc-title">{{ t('completeAdder.calcTitle') }}</div>
        <div class="calc-content">
          <div class="calc-row">
            <span class="calc-label">{{ t('completeAdder.inputLabel') }}</span>
            <span class="calc-value">A={{ faA ? '1' : '0' }} B={{ faB ? '1' : '0' }} Cin={{
                faCin ? '1' : '0'
              }}</span>
          </div>
          <div class="calc-row">
            <span class="calc-label">{{ t('completeAdder.middleLabel') }}</span>
            <span class="calc-formula">{{ t('completeAdder.intermediate') }} = A XOR B = <strong>{{ faXor1 ? '1' : '0' }}</strong></span>
          </div>
          <div class="calc-row">
            <span class="calc-label">{{ t('completeAdder.sumLabel') }}</span>
            <span class="calc-formula">{{ t('completeAdder.sum') }} = {{ t('completeAdder.intermediate') }} XOR Cin = <strong>{{ faSum ? '1' : '0' }}</strong></span>
          </div>
          <div class="calc-row">
            <span class="calc-label">{{ t('completeAdder.carryLabel') }}</span>
            <span class="calc-formula">{{ t('completeAdder.carry') }} = (A AND B) OR ({{ t('completeAdder.intermediate') }} AND Cin) =
              <strong>{{ faCarryOut ? '1' : '0' }}</strong></span>
          </div>
        </div>
      </div>

      <div class="info-box">
        <strong>{{ t('completeAdder.coreIdeaLabel') }}</strong>
        {{ t('completeAdder.full.coreIdea') }}
      </div>
    </div>

    <div v-if="currentLayer === 'multi'" class="layer-panel">
      <div class="panel-title">{{ t('completeAdder.multi.title') }}</div>
      <div class="panel-desc">{{ t('completeAdder.multi.desc') }}</div>

      <div class="terms-box">
        <div
          v-for="term in messages.completeAdder.multi.terms"
          :key="term.name"
          class="term-item"
        >
          <span class="term-name">{{ term.name }}</span>
          <span class="term-desc">{{ term.desc }}</span>
        </div>
      </div>

      <div class="multi-control">
        <label class="multi-input">
          <span>A =</span>
          <input v-model.number="multiA" type="number" min="0" max="15" />
        </label>
        <span class="multi-op">+</span>
        <label class="multi-input">
          <span>B =</span>
          <input v-model.number="multiB" type="number" min="0" max="15" />
        </label>
        <span class="multi-op">=</span>
        <span class="multi-result">{{ multiResult }}</span>
        <span v-if="multiOverflow" class="multi-overflow">{{
          t('completeAdder.overflow')
        }}</span>
      </div>

      <div class="multi-binary">
        <div class="multi-row">
          <span class="multi-label">A:</span>
          <span class="multi-bits">{{ multiBitsA }}</span>
        </div>
        <div class="multi-row">
          <span class="multi-label">B:</span>
          <span class="multi-bits">{{ multiBitsB }}</span>
        </div>
        <div class="multi-row result">
          <span class="multi-label">=:</span>
          <span class="multi-bits">{{ multiBitsSum }}</span>
        </div>
      </div>

      <div class="multi-chain">
        <div
          v-for="(s, i) in multiStages.slice().reverse()"
          :key="3 - i"
          class="multi-stage"
          :class="{ highlight: multiHover === (3 - i) }"
          @mouseenter="multiHover = 3 - i"
          @mouseleave="multiHover = null"
        >
          <span class="multi-stage-bit">{{
            t('completeAdder.bitLabel', { bit: 3 - i })
          }}</span>
          <span class="multi-stage-io">{{ s.a }}+{{ s.b }}<span v-if="3 - i > 0">+{{ s.cin }}</span></span>
          <span class="multi-stage-out">={{ s.sum }}<span v-if="s.cout">C</span></span>
        </div>
      </div>

      <div class="calculation-box">
        <div class="calc-title">{{ t('completeAdder.calcTitle') }}</div>
        <div class="calc-content">
          <div class="calc-row">
            <span class="calc-label">{{ t('completeAdder.inputLabel') }}</span>
            <span class="calc-value">A = {{ clampedMultiA }} ({{ multiBitsA }}), B =
              {{ clampedMultiB }} ({{ multiBitsB }})</span>
          </div>
          <div class="calc-row">
            <span class="calc-label">{{ t('completeAdder.processLabel') }}</span>
            <span class="calc-formula">{{ t('completeAdder.processText') }}</span>
          </div>
          <div class="calc-row">
            <span class="calc-label">{{ t('completeAdder.resultLabel') }}</span>
            <span class="calc-formula">{{ multiBitsSum }} = <strong>{{ multiResult }}</strong>{{ multiOverflow ? ` (${t('completeAdder.overflow')})` : '' }}</span>
          </div>
        </div>
      </div>

      <div class="info-box">
        <strong>{{ t('completeAdder.coreIdeaLabel') }}</strong>
        {{ t('completeAdder.multi.coreIdea') }}
      </div>
    </div>

    <div class="summary-box">
      <div class="summary-title">{{ t('completeAdder.summaryTitle') }}</div>
      <div class="summary-flow">
        <template
          v-for="(item, index) in messages.completeAdder.summaryItems"
          :key="item.name"
        >
          <div class="summary-item">
            <span class="summary-icon">{{ item.icon }}</span>
            <span class="summary-name">{{ item.name }}</span>
          </div>
          <span
            v-if="index < messages.completeAdder.summaryItems.length - 1"
            class="summary-arrow"
            >→</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals/index.js'

const { t, messages } = useI18n(computerFundamentalsLocale)

const currentLayer = ref('gates')
const gateActive = ref('XOR')

const layers = [
  { id: 'gates' },
  { id: 'half' },
  { id: 'full' },
  { id: 'multi' }
]

const gates = computed(() => messages.value.completeAdder.gates.items)

const haA = ref(false)
const haB = ref(true)
const haSum = computed(() => haA.value !== haB.value)
const haCarry = computed(() => haA.value && haB.value)

const faA = ref(true)
const faB = ref(true)
const faCin = ref(false)
const faXor1 = computed(() => faA.value !== faB.value)
const faCarry1 = computed(() => faA.value && faB.value)
const faCarry2 = computed(() => faXor1.value && faCin.value)
const faSum = computed(() => faXor1.value !== faCin.value)
const faCarryOut = computed(() => faCarry1.value || faCarry2.value)

const multiA = ref(7)
const multiB = ref(6)
const multiHover = ref(null)

function clampMulti(n) {
  const v = Number(n)
  if (Number.isNaN(v)) return 0
  return Math.max(0, Math.min(15, Math.floor(v)))
}

const clampedMultiA = computed(() => clampMulti(multiA.value))
const clampedMultiB = computed(() => clampMulti(multiB.value))

const multiBitsA = computed(() =>
  clampedMultiA.value.toString(2).padStart(4, '0')
)
const multiBitsB = computed(() =>
  clampedMultiB.value.toString(2).padStart(4, '0')
)

const multiStages = computed(() => {
  const A = clampedMultiA.value
  const B = clampedMultiB.value
  const result = []
  let cin = 0
  for (let i = 0; i < 4; i++) {
    const a = (A >> i) & 1
    const b = (B >> i) & 1
    const xor1 = a ^ b
    const sum = xor1 ^ cin
    const cout = (a & b) | (cin & xor1)
    result.push({ a, b, cin: i > 0 ? cin : null, sum, cout })
    cin = cout
  }
  return result
})

const multiBitsSum = computed(() => {
  const S = multiStages.value.reduce((acc, s, i) => acc + (s.sum << i), 0)
  return S.toString(2).padStart(4, '0')
})

const multiResult = computed(() =>
  multiStages.value.reduce((acc, s, i) => acc + (s.sum << i), 0)
)

const multiOverflow = computed(() => multiStages.value[3]?.cout === 1)
</script>

<style scoped>
.complete-adder-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  margin-bottom: 0.75rem;
}

.title {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.subtitle {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.layer-tabs {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
}

.layer-tab {
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.78rem;
  cursor: pointer;
  transition: all 0.15s;
}

.layer-tab.active {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

.layer-panel {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
}

.panel-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
}

.panel-desc {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.6rem;
}

.terms-box {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
}

.term-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.term-name {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.term-desc {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
  line-height: 1.3;
}

.gates-showcase {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.6rem;
}

.gate-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  cursor: pointer;
  transition: all 0.15s;
}

.gate-demo.active {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 1px var(--vp-c-brand-soft);
}

.gate-symbol {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.2rem;
}

.gate-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
  margin-bottom: 0.3rem;
}

.gate-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.gate-formula {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
  font-family: 'JetBrains Mono', monospace;
}

.gate-mini-truth {
  display: flex;
  gap: 0.15rem;
}

.truth-dot {
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.65rem;
  font-weight: 600;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-3);
}

.truth-dot.one {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.circuit-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding: 0.75rem;
  overflow-x: auto;
}

.inputs,
.outputs {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 5rem;
  z-index: 2;
}

.outputs {
  min-width: 4.5rem;
}

.input-line,
.output-line {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.label {
  font-size: 0.78rem;
  color: var(--vp-c-text-1);
}

.toggle-btn {
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  font-weight: bold;
  font-family: monospace;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-btn.on {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.toggle-btn.cin-btn.on {
  background: #fef3c7;
  color: #d97706;
  border-color: #d97706;
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
  font-size: 0.9rem;
  transition: all 0.2s;
}

.output-line.active .s-val {
  background: #dcfce7;
  color: #16a34a;
  border-color: #16a34a;
}

.output-line.active .c-val {
  background: #fef3c7;
  color: #d97706;
  border-color: #d97706;
}

.wires {
  width: 60px;
  height: 120px;
  position: relative;
}

.wires.outputs-wires {
  width: 30px;
}

.wire-svg {
  width: 100%;
  height: 100%;
}

.gates {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 2;
}

.gates-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  z-index: 2;
}

.gate-box {
  width: 6rem;
  height: 3.5rem;
  background: var(--vp-c-bg-alt);
  border: 2px solid var(--vp-c-divider);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.gate-box.sm {
  width: 4rem;
  height: 2.5rem;
}

.gate-box.active {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 8px var(--vp-c-brand-soft);
}

.gate-header {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.gate-name {
  font-weight: bold;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.gate-box.sm .gate-name {
  font-size: 0.75rem;
}

.gate-cn {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
}

.gate-formula {
  font-size: 0.7rem;
  color: var(--vp-c-brand-1);
  font-family: 'JetBrains Mono', monospace;
}

.gate-desc {
  font-size: 0.6rem;
  color: var(--vp-c-text-3);
  margin-top: 0.1rem;
}

.gate-out {
  font-size: 0.8rem;
  font-family: 'JetBrains Mono', monospace;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.calculation-box {
  margin-top: 0.75rem;
  padding: 0.5rem 0.7rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
}

.calc-title {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.3rem;
}

.calc-content {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.calc-row {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  font-size: 0.72rem;
}

.calc-label {
  color: var(--vp-c-text-3);
  min-width: 3rem;
}

.calc-formula {
  font-family: 'JetBrains Mono', monospace;
  color: var(--vp-c-text-1);
}

.calc-formula strong {
  color: var(--vp-c-brand-1);
}

.calc-reason {
  color: var(--vp-c-text-3);
  font-size: 0.68rem;
}

.multi-control {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.multi-input {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}

.multi-input input {
  width: 2.5rem;
  padding: 0.2rem 0.3rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.85rem;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

.multi-op {
  font-weight: bold;
  color: var(--vp-c-text-3);
}

.multi-result {
  font-weight: bold;
  color: var(--vp-c-brand-1);
  font-size: 1rem;
}

.multi-overflow {
  font-size: 0.6rem;
  padding: 0.1rem 0.3rem;
  background: #fef3c7;
  color: #d97706;
  border-radius: 3px;
}

.multi-binary {
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  padding: 0.4rem 0.6rem;
  margin-bottom: 0.5rem;
}

.multi-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  font-family: 'JetBrains Mono', monospace;
}

.multi-row.result {
  color: var(--vp-c-green-1, #16a34a);
  font-weight: 600;
}

.multi-label {
  color: var(--vp-c-text-3);
  min-width: 1.5rem;
}

.multi-bits {
  letter-spacing: 0.15rem;
}

.multi-chain {
  display: flex;
  gap: 0.3rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  margin-bottom: 0.5rem;
}

.multi-stage {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.3rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  font-size: 0.72rem;
  cursor: pointer;
  transition: all 0.15s;
}

.multi-stage.highlight {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.multi-stage-bit {
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.1rem;
}

.multi-stage-io {
  color: var(--vp-c-text-3);
  font-family: 'JetBrains Mono', monospace;
}

.multi-stage-out {
  color: var(--vp-c-brand-1);
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
}

.info-box {
  display: flex;
  gap: 0.25rem;
  padding: 0.5rem 0.7rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
  color: var(--vp-c-text-1);
}

.summary-box {
  margin-top: 0.75rem;
  padding: 0.5rem 0.7rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
}

.summary-title {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.4rem;
}

.summary-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  flex-wrap: wrap;
}

.summary-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
  padding: 0.25rem 0.4rem;
  border-radius: 4px;
  background: var(--vp-c-bg);
}

.summary-icon {
  font-size: 0.9rem;
}

.summary-name {
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.summary-arrow {
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
}

@media (max-width: 600px) {
  .gates-showcase {
    grid-template-columns: repeat(2, 1fr);
  }
  .circuit-container {
    transform: scale(0.8);
    transform-origin: left top;
  }
  .terms-box {
    flex-direction: column;
  }
}
</style>
