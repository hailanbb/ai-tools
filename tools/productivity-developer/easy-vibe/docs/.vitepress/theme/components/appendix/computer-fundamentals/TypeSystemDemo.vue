<template>
  <div class="type-system-demo">
    <div class="demo-header">
      <span class="title">{{ t('typeSystems.explorer.title') }}</span>
      <span class="subtitle">{{ t('typeSystems.explorer.subtitle') }}</span>
    </div>

    <div class="control-panel">
      <div class="tab-btns">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="['tab-btn', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div class="visualization-area">
      <div v-if="activeTab === 'quadrant'" class="quadrant-section">
        <div class="quadrant-grid">
          <div class="quadrant-axes">
            <span class="axis-label top">{{ t('typeSystems.explorer.axes.strong') }}</span>
            <span class="axis-label bottom">{{ t('typeSystems.explorer.axes.weak') }}</span>
            <span class="axis-label left">{{ t('typeSystems.explorer.axes.static') }}</span>
            <span class="axis-label right">{{ t('typeSystems.explorer.axes.dynamic') }}</span>
          </div>
          <div class="quadrant-cells">
            <div
              v-for="q in quadrants"
              :key="q.id"
              :class="['q-cell', q.id, { active: activeQuadrant === q.id }]"
              @click="activeQuadrant = q.id"
            >
              <div class="q-title">{{ q.title }}</div>
              <div class="q-langs">
                <span v-for="lang in q.langs" :key="lang" class="lang-chip">{{
                  lang
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="selectedQuadrant" class="quadrant-detail">
          <div class="detail-title">{{ selectedQuadrant.title }}</div>
          <div class="detail-desc">{{ selectedQuadrant.desc }}</div>
          <div class="detail-traits">
            <span
              v-for="trait in selectedQuadrant.traits"
              :key="trait"
              class="trait-tag"
              >{{ trait }}</span>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'check'" class="check-section">
        <div class="check-scenario">
          <div class="scenario-title">{{ t('typeSystems.explorer.checkScenarioTitle') }}</div>
          <div class="scenario-code">
            <code>name = "Alice" → name = 123</code>
          </div>
        </div>
        <div class="check-grid">
          <div v-for="check in typeChecks" :key="check.lang" class="check-card">
            <div class="check-header">
              <span class="check-lang">{{ check.lang }}</span>
              <span :class="['check-badge', check.result]">{{
                check.badge
              }}</span>
            </div>
            <pre class="check-code"><code>{{ check.code }}</code></pre>
            <div :class="['check-verdict', check.result]">
              {{ check.verdict }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'convert'" class="convert-section">
        <div class="convert-picker">
          <button
            v-for="lang in convertLangs"
            :key="lang.name"
            :class="['lang-btn', { active: activeLang === lang.name }]"
            @click="activeLang = lang.name"
          >
            {{ lang.name }}
          </button>
        </div>
        <div v-if="currentLang" class="convert-list">
          <div
            v-for="(item, i) in currentLang.conversions"
            :key="i"
            class="convert-row"
          >
            <div class="convert-expr">
              <code>{{ item.expr }}</code>
            </div>
            <span class="convert-arrow">→</span>
            <div :class="['convert-result', { error: item.error }]">
              <code>{{ item.result }}</code>
            </div>
            <div class="convert-explain">{{ item.explain }}</div>
          </div>
        </div>
        <div class="convert-summary">
          <span :class="['summary-tag', currentLang.summaryClass]">
            {{ currentLang.summary }}
          </span>
        </div>
      </div>

      <div v-if="activeTab === 'infer'" class="infer-section">
        <div class="infer-intro">
          {{ t('typeSystems.explorer.inferIntroPrefix') }}<strong>{{ t('typeSystems.explorer.inferIntroStrong') }}</strong>
        </div>
        <div class="infer-grid">
          <div
            v-for="(example, i) in inferenceExamples"
            :key="i"
            class="infer-card"
          >
            <div class="infer-lang">{{ example.lang }}</div>
            <div class="infer-code">
              <code>{{ example.code }}</code>
            </div>
            <div class="infer-arrow">{{ t('typeSystems.explorer.inferArrow') }}</div>
            <div class="infer-type">{{ example.type }}</div>
          </div>
        </div>
        <div class="infer-benefit">
          <span v-for="b in inferBenefits" :key="b" class="benefit-item">{{
            b
          }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ t('typeSystems.explorer.coreIdeaLabel') }}</strong>
      <span>{{ coreIdea }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals'

const { t, messages } = useI18n(computerFundamentalsLocale)
const activeTab = ref('quadrant')

const explorer = computed(() => messages.value.typeSystems.explorer)
const tabs = computed(() => explorer.value.tabs)

const activeQuadrant = ref('strong-static')

const quadrants = computed(() => explorer.value.quadrants)

const selectedQuadrant = computed(() =>
  quadrants.value.find((q) => q.id === activeQuadrant.value)
)

const typeChecks = computed(() => explorer.value.typeChecks)

const activeLang = ref('JavaScript')
const convertLangs = computed(() => explorer.value.convertLangs)

const currentLang = computed(() =>
  convertLangs.value.find((l) => l.name === activeLang.value)
)

const inferenceExamples = computed(() => explorer.value.inferenceExamples)
const inferBenefits = computed(() => explorer.value.inferBenefits)
const coreIdea = computed(() => explorer.value.coreIdeas[activeTab.value])
</script>

<style scoped>
.type-system-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}
.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
}

.control-panel {
  background: var(--vp-c-bg);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 0.75rem;
}

.tab-btns {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 0.35rem 0.7rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.82rem;
  transition: all 0.2s;
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

/* Quadrant */
.quadrant-grid {
  position: relative;
  margin-bottom: 0.75rem;
}

.quadrant-axes {
  pointer-events: none;
}

.axis-label {
  position: absolute;
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  font-weight: bold;
}

.axis-label.top {
  top: -0.1rem;
  left: 50%;
  transform: translateX(-50%);
}
.axis-label.bottom {
  bottom: -0.1rem;
  left: 50%;
  transform: translateX(-50%);
}
.axis-label.left {
  left: -0.1rem;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
}
.axis-label.right {
  right: -0.1rem;
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
}

.quadrant-cells {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
}

.q-cell {
  padding: 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s;
}

.q-cell.strong-static {
  background: rgba(16, 185, 129, 0.1);
}
.q-cell.weak-static {
  background: rgba(245, 158, 11, 0.1);
}
.q-cell.strong-dynamic {
  background: rgba(59, 130, 246, 0.1);
}
.q-cell.weak-dynamic {
  background: rgba(239, 68, 68, 0.1);
}

.q-cell.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.2);
}

.q-title {
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
}

.q-langs {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.lang-chip {
  font-size: 0.72rem;
  background: var(--vp-c-bg);
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
}

.quadrant-detail {
  background: var(--vp-c-bg);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.detail-title {
  font-weight: bold;
  font-size: 0.88rem;
  margin-bottom: 0.25rem;
  color: var(--vp-c-brand);
}

.detail-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.detail-traits {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.trait-tag {
  font-size: 0.72rem;
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-brand-soft);
  border-radius: 3px;
}

/* Check */
.check-scenario {
  background: var(--vp-c-bg);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  text-align: center;
}

.scenario-title {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.scenario-code code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  background: var(--vp-c-bg-alt);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.check-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.5rem;
}

.check-card {
  background: var(--vp-c-bg);
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.check-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.35rem 0.5rem;
  background: var(--vp-c-bg-alt);
}

.check-lang {
  font-weight: bold;
  font-size: 0.82rem;
}

.check-badge {
  font-size: 0.7rem;
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
  font-weight: bold;
}

.check-badge.error {
  background: rgba(239, 68, 68, 0.15);
  color: var(--vp-c-danger-1);
}

.check-badge.warning {
  background: rgba(245, 158, 11, 0.15);
  color: #d97706;
}

.check-badge.success {
  background: rgba(16, 185, 129, 0.15);
  color: var(--vp-c-green-1);
}

.check-code {
  margin: 0;
  padding: 0.4rem 0.5rem;
  font-size: 0.75rem;
  font-family: var(--vp-font-family-mono);
  white-space: pre-wrap;
  line-height: 1.5;
}

.check-verdict {
  padding: 0.3rem 0.5rem;
  font-size: 0.75rem;
  font-weight: bold;
}

.check-verdict.error {
  background: rgba(239, 68, 68, 0.1);
  color: var(--vp-c-danger-1);
}
.check-verdict.warning {
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
}
.check-verdict.success {
  background: rgba(16, 185, 129, 0.1);
  color: var(--vp-c-green-1);
}

/* Convert */
.convert-picker {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.lang-btn {
  padding: 0.3rem 0.6rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.lang-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.convert-list {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 0.5rem;
}

.convert-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 4px;
  font-size: 0.82rem;
  flex-wrap: wrap;
}

.convert-expr code {
  font-family: var(--vp-font-family-mono);
  background: var(--vp-c-bg-alt);
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  font-size: 0.8rem;
}

.convert-arrow {
  color: var(--vp-c-text-3);
}

.convert-result code {
  font-family: var(--vp-font-family-mono);
  background: var(--vp-c-brand-soft);
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  font-size: 0.8rem;
}

.convert-result.error code {
  background: rgba(239, 68, 68, 0.15);
  color: var(--vp-c-danger-1);
}

.convert-explain {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-left: auto;
}

.convert-summary {
  text-align: center;
}

.summary-tag {
  display: inline-block;
  padding: 0.3rem 0.75rem;
  border-radius: 4px;
  font-size: 0.82rem;
  font-weight: bold;
}

.summary-tag.weak {
  background: rgba(239, 68, 68, 0.1);
  color: var(--vp-c-danger-1);
}

.summary-tag.strong {
  background: rgba(16, 185, 129, 0.1);
  color: var(--vp-c-green-1);
}

/* Infer */
.infer-intro {
  text-align: center;
  font-size: 0.88rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-2);
}

.infer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.infer-card {
  background: var(--vp-c-bg);
  padding: 0.5rem;
  border-radius: 6px;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.infer-lang {
  font-size: 0.72rem;
  color: var(--vp-c-brand);
  font-weight: bold;
  margin-bottom: 0.15rem;
}

.infer-code code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.82rem;
}

.infer-arrow {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin: 0.15rem 0;
}

.infer-type {
  font-weight: bold;
  font-size: 0.82rem;
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  padding: 0.15rem 0.35rem;
  border-radius: 3px;
  display: inline-block;
}

.infer-benefit {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.benefit-item {
  font-size: 0.78rem;
  padding: 0.2rem 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 4px;
}

/* Info Box */
.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
  display: flex;
  gap: 0.25rem;
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .check-grid {
    grid-template-columns: 1fr;
  }

  .convert-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .convert-explain {
    margin-left: 0;
  }
}
</style>
