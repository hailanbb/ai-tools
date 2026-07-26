<template>
  <div class="addition-rules">
    <div class="demo-header">
      <span class="title">{{ t('binaryAddition.title') }}</span>
      <span class="subtitle">{{ t('binaryAddition.subtitle') }}</span>
    </div>

    <!-- 1. 十进制类比 -->
    <div class="section">
      <div class="section-title">{{ t('binaryAddition.decimalTitle') }}</div>
      <div class="decimal-analogy">
        <div class="math-column">
          <div class="math-row">
            <span class="digit carry-mark">1</span> <!-- 进位标记 -->
          </div>
          <div class="math-row">
            <span class="digit"></span>
            <span class="digit">7</span>
          </div>
          <div class="math-row">
            <span class="op">+</span>
            <span class="digit">5</span>
          </div>
          <div class="math-line"></div>
          <div class="math-row result-row">
            <span class="digit c-color">1</span>
            <span class="digit s-color">2</span>
          </div>
        </div>

        <div class="analogy-text">
          <p>{{ t('binaryAddition.decimalIntro') }}</p>
          <ul>
            <li>
              <span class="badge s-badge">2</span>
              {{ t('binaryAddition.decimalSum') }}
            </li>
            <li>
              {{ t('binaryAddition.decimalCarry') }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 2. 二进制四种情况交互 -->
    <div class="section">
      <div class="section-title">{{ t('binaryAddition.binaryTitle') }}</div>
      <div class="binary-demo">
        <div class="binary-calc">
          <button class="bit-btn" :class="{ on: inputA }" @click="inputA = !inputA">{{ inputA ? '1' : '0' }}</button>
          <span class="op">+</span>
          <button class="bit-btn" :class="{ on: inputB }" @click="inputB = !inputB">{{ inputB ? '1' : '0' }}</button>
          <span class="op">=</span>
          <span class="res-box">
            <span class="res-bit carry-bit" :class="{ lit: carry }">{{ carry ? '1' : '0' }}</span>
            <span class="res-bit sum-bit" :class="{ lit: sum }">{{ sum ? '1' : '0' }}</span>
          </span>
        </div>

        <div class="binary-explain">
          <p v-if="!inputA && !inputB">
            {{ t('binaryAddition.explainZero') }}
          </p>
          <p v-if="(!inputA && inputB) || (inputA && !inputB)">
            {{ inputA ? '1' : '0' }} + {{ inputB ? '1' : '0' }} = 1.
            {{ t('binaryAddition.explainOne') }}
          </p>
          <p v-if="inputA && inputB">
            {{ t('binaryAddition.explainCarry') }}
          </p>
        </div>
      </div>
    </div>

    <!-- 3. 找出规律并对应到逻辑门 -->
    <div class="section mb-0">
      <div class="section-title">{{ t('binaryAddition.ruleTitle') }}</div>
      
      <div class="rules-container">
        <!-- 所有的 4 种情况一览表 -->
        <div class="rules-table">
          <div class="rt-head">
            <span>A</span><span>B</span><span class="c-color">{{ t('binaryAddition.carry') }}</span><span class="s-color">{{ t('binaryAddition.sum') }}</span>
          </div>
          <div class="rt-row" :class="{ active: !inputA && !inputB }"><span>0</span><span>0</span><span>0</span><span>0</span></div>
          <div class="rt-row" :class="{ active: !inputA && inputB }"> <span>0</span><span>1</span><span>0</span><span>1</span></div>
          <div class="rt-row" :class="{ active: inputA && !inputB }"> <span>1</span><span>0</span><span>0</span><span>1</span></div>
          <div class="rt-row" :class="{ active: inputA && inputB }">  <span>1</span><span>1</span><span>1</span><span>0</span></div>
        </div>

        <div class="rules-text">
          <div class="rule-card sum-rule" :class="{ active: sum }">
            <div class="rc-title">
              <span class="badge s-badge">{{ t('binaryAddition.sum') }}</span>
              {{ t('binaryAddition.sumRuleTitle') }}
            </div>
            <div class="rc-desc">
              {{ t('binaryAddition.sumRule') }}
              <div class="rc-gate">{{ t('binaryAddition.sumGate') }}</div>
            </div>
          </div>

          <div class="rule-card carry-rule" :class="{ active: carry }">
            <div class="rc-title">
              <span class="badge c-badge">{{ t('binaryAddition.carry') }}</span>
              {{ t('binaryAddition.carryRuleTitle') }}
            </div>
            <div class="rc-desc">
              {{ t('binaryAddition.carryRule') }}
              <div class="rc-gate">{{ t('binaryAddition.carryGate') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals/index.js'

const { t } = useI18n(computerFundamentalsLocale)

const inputA = ref(false)
const inputB = ref(false)

const sum = computed(() => inputA.value !== inputB.value)
const carry = computed(() => inputA.value && inputB.value)
</script>

<style scoped>
.addition-rules {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  padding: 1.2rem;
  margin: 1.5rem 0;
}

.demo-header {
  margin-bottom: 1.2rem;
}
.title {
  display: block;
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}
.subtitle {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.section {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}
.mb-0 { margin-bottom: 0; }

.section-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.8rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px dashed var(--vp-c-divider);
}

/* 颜色常量 */
.s-color { color: #16a34a; font-weight: bold; }
.c-color { color: #d97706; font-weight: bold; }
.badge { padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.75rem; font-family: monospace; }
.s-badge { background: #dcfce7; color: #166534; }
.c-badge { background: #fef3c7; color: #92400e; }

/* 1. 十进制类比 */
.decimal-analogy {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
}
.math-column {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-end;
  font-family: monospace;
  font-size: 1.5rem;
  background: var(--vp-c-bg-alt);
  padding: 1rem 1.5rem;
  border-radius: 6px;
  position: relative;
}
.math-row {
  display: flex;
  gap: 0.5rem;
  line-height: 1.2;
}
.digit { width: 1.2rem; text-align: center; }
.op { font-weight: bold; color: var(--vp-c-text-3); margin-right: 0.2rem; }
.math-line {
  width: 100%;
  height: 2px;
  background: var(--vp-c-text-2);
  margin: 0.2rem 0;
}
.carry-mark {
  color: #d97706;
  font-size: 0.8rem;
  line-height: 1;
  transform: translateY(10px);
}
.analogy-text {
  flex: 1;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.analogy-text ul { padding-left: 1.2rem; margin-top: 0.5rem; }

/* 2. 二进制四种情况 */
.binary-demo {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
}
.binary-calc {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--vp-c-bg-alt);
  padding: 0.8rem 1.2rem;
  border-radius: 6px;
}
.bit-btn {
  width: 3rem; height: 3rem; font-size: 1.5rem; font-weight: bold; font-family: monospace;
  border-radius: 6px; background: var(--vp-c-bg); border: 2px solid var(--vp-c-divider);
  cursor: pointer; transition: all 0.2s;
  display: flex; align-items: center; justify-content: center;
}
.bit-btn.on { background: #dbeafe; color: #1d4ed8; border-color: #3b82f6; }
.res-box { display: flex; gap: 0.2rem; margin-left: 0.5rem; }
.res-bit {
  width: 3rem; height: 3rem; border-radius: 6px; border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg); font-size: 1.5rem; font-weight: bold; font-family: monospace;
  display: flex; align-items: center; justify-content: center;
  color: var(--vp-c-text-3); transition: all 0.2s;
}
.carry-bit.lit { background: #fef3c7; color: #d97706; border-color: #d97706; }
.sum-bit.lit   { background: #dcfce7; color: #16a34a; border-color: #16a34a; }

.binary-explain {
  flex: 1;
  background: var(--vp-c-bg-alt);
  padding: 0.8rem 1rem;
  border-radius: 6px;
  border-left: 3px solid #3b82f6;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  line-height: 1.5;
  min-width: 200px;
}
.binary-explain p { margin: 0; }

/* 3. 找出规律 */
.rules-container {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.rules-table {
  flex: 0 0 auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  font-family: monospace;
  font-size: 0.85rem;
  background: var(--vp-c-bg-alt);
}
.rt-head, .rt-row {
  display: grid;
  grid-template-columns: 2rem 2rem 3rem 3rem;
  text-align: center;
  padding: 0.4rem;
  border-bottom: 1px solid var(--vp-c-divider);
}
.rt-row:last-child { border-bottom: none; }
.rt-head { font-weight: bold; font-family: system-ui; font-size: 0.75rem; background: var(--vp-c-bg); }
.rt-row.active { background: #dbeafe; font-weight: bold; }

.rules-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  min-width: 250px;
}
.rule-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.8rem;
  transition: all 0.2s;
  background: var(--vp-c-bg-alt);
}
.sum-rule.active { border-color: #16a34a; background: #f0fdf4; }
.carry-rule.active { border-color: #d97706; background: #fffbeb; }

.rc-title { font-size: 0.8rem; font-weight: bold; margin-bottom: 0.4rem; color: var(--vp-c-text-1); }
.rc-desc { font-size: 0.75rem; color: var(--vp-c-text-2); line-height: 1.5; }
.rc-gate {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px dashed var(--vp-c-divider);
  color: var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .decimal-analogy, .binary-demo, .rules-container { flex-direction: column; align-items: stretch; }
  .math-column, .rules-table { align-self: center; }
}
</style>
