<template>
  <div class="language-map-demo">
    <div class="demo-header">
      <span class="title">{{ t('languageMap.title') }}</span>
      <span class="subtitle">{{ t('languageMap.subtitle') }}</span>
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
      <!-- Tab 1: Timeline -->
      <div v-if="activeTab === 'timeline'" class="timeline-section">
        <div class="timeline-track">
          <div
            v-for="(era, i) in eras"
            :key="i"
            :class="['era-card', { active: activeEra === i }]"
            @click="activeEra = i"
          >
            <div class="era-decade">{{ era.year }}</div>
            <div class="era-name">{{ era.name }}</div>
            <div class="era-langs-inline">
              <span
                v-for="lang in era.languages"
                :key="lang"
                class="lang-dot"
                >{{ lang }}</span>
            </div>
          </div>
        </div>

        <div v-if="selectedEra" class="era-detail">
          <div class="era-detail-header">
            <span class="era-detail-year">{{ selectedEra.year }}</span>
            <span class="era-detail-name">{{ selectedEra.name }}</span>
          </div>
          <div class="era-detail-desc">{{ selectedEra.desc }}</div>
          <div class="era-detail-milestone">
            <div
              v-for="m in selectedEra.milestones"
              :key="m.lang"
              class="milestone-item"
            >
              <span class="milestone-lang">{{ m.lang }}</span>
              <span class="milestone-significance">{{ m.significance }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 2: Paradigms -->
      <div v-if="activeTab === 'paradigms'" class="paradigms-section">
        <div class="paradigm-cards">
          <div
            v-for="p in paradigms"
            :key="p.id"
            :class="['paradigm-card', { active: activeParadigm === p.id }]"
            @click="activeParadigm = p.id"
          >
            <div class="paradigm-icon">{{ p.icon }}</div>
            <div class="paradigm-name">{{ p.name }}</div>
            <div class="paradigm-one-liner">{{ p.oneLiner }}</div>
          </div>
        </div>

        <div v-if="selectedParadigm" class="paradigm-detail">
          <div class="paradigm-detail-header">
            <span class="paradigm-detail-icon">{{
              selectedParadigm.icon
            }}</span>
            <span class="paradigm-detail-name">{{
              selectedParadigm.name
            }}</span>
          </div>
          <div class="paradigm-detail-desc">{{ selectedParadigm.desc }}</div>
          <div class="paradigm-detail-langs">
            <span class="detail-label">{{ t('languageMap.representativeLanguages') }}</span>
            <span
              v-for="lang in selectedParadigm.languages"
              :key="lang"
              class="lang-tag"
              >{{ lang }}</span>
          </div>
          <div class="paradigm-detail-example">
            <pre><code>{{ selectedParadigm.example }}</code></pre>
          </div>
          <div class="paradigm-traits">
            <span
              v-for="trait in selectedParadigm.traits"
              :key="trait"
              class="trait-chip"
              >{{ trait }}</span>
          </div>
        </div>
      </div>

      <!-- Tab 3: Comparison Table -->
      <div v-if="activeTab === 'compare'" class="compare-section">
        <div class="compare-intro">{{ t('languageMap.compareIntro') }}</div>
        <div class="compare-table-wrapper">
          <table class="compare-table">
            <thead>
              <tr>
                <th>{{ t('languageMap.table.language') }}</th>
                <th>{{ t('languageMap.table.typeSystem') }}</th>
                <th>{{ t('languageMap.table.paradigm') }}</th>
                <th>{{ t('languageMap.table.runtime') }}</th>
                <th>{{ t('languageMap.table.usage') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="lang in languageComparison"
                :key="lang.name"
                :class="{
                  'row-highlight': highlightedLangs.includes(lang.name)
                }"
                @click="toggleHighlight(lang.name)"
              >
                <td class="lang-name-cell">{{ lang.name }}</td>
                <td>
                  <span :class="['type-badge', lang.typeClass]">{{
                    lang.type
                  }}</span>
                </td>
                <td>{{ lang.paradigm }}</td>
                <td>{{ lang.runtime }}</td>
                <td class="usage-cell">{{ lang.usage }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tab 4: How to Choose -->
      <div v-if="activeTab === 'choose'" class="choose-section">
        <div class="choose-grid">
          <div
            v-for="rec in recommendations"
            :key="rec.scene"
            class="choose-card"
          >
            <div class="choose-icon">{{ rec.icon }}</div>
            <div class="choose-scene">{{ rec.scene }}</div>
            <div class="choose-langs">
              <span
                v-for="lang in rec.langs"
                :key="lang"
                class="choose-lang-tag"
                >{{ lang }}</span>
            </div>
            <div class="choose-reason">{{ rec.reason }}</div>
          </div>
        </div>

        <div class="learning-path">
          <div class="path-title">{{ t('languageMap.learningPathTitle') }}</div>
          <div class="path-steps">
            <div v-for="(step, i) in learningPath" :key="i" class="path-step">
              <div class="path-num">{{ i + 1 }}</div>
              <div class="path-content">
                <span class="path-lang">{{ step.lang }}</span>
                <span class="path-why">{{ step.why }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ t('languageMap.coreIdeaLabel') }}</strong>
      <span>{{ activeCoreIdea }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals/index.js'

const { t, messages } = useI18n(computerFundamentalsLocale)

const activeTab = ref('timeline')

const tabs = computed(() => messages.value.languageMap.tabs)

const activeEra = ref(4)

const eras = computed(() => messages.value.languageMap.eras)

const selectedEra = computed(() => eras.value[activeEra.value])

const activeParadigm = ref('imperative')

const paradigms = computed(() => messages.value.languageMap.paradigms)

const selectedParadigm = computed(() =>
  paradigms.value.find((p) => p.id === activeParadigm.value)
)

const highlightedLangs = ref([])

function toggleHighlight(name) {
  const idx = highlightedLangs.value.indexOf(name)
  if (idx >= 0) {
    highlightedLangs.value.splice(idx, 1)
  } else {
    highlightedLangs.value.push(name)
  }
}

const languageComparison = computed(
  () => messages.value.languageMap.languageComparison
)

const recommendations = computed(() => messages.value.languageMap.recommendations)

const learningPath = computed(() => messages.value.languageMap.learningPath)

const activeCoreIdea = computed(
  () => messages.value.languageMap.coreIdeas[activeTab.value]
)
</script>

<style scoped>
.language-map-demo {
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

/* Timeline */
.timeline-track {
  display: flex;
  gap: 0.35rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  margin-bottom: 0.75rem;
}

.era-card {
  min-width: 110px;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s;
  flex-shrink: 0;
}

.era-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.era-decade {
  font-weight: bold;
  font-size: 0.82rem;
  color: var(--vp-c-brand);
}

.era-name {
  font-size: 0.78rem;
  font-weight: bold;
  margin-bottom: 0.2rem;
}

.era-langs-inline {
  display: flex;
  flex-wrap: wrap;
  gap: 0.15rem;
}

.lang-dot {
  font-size: 0.65rem;
  padding: 0.05rem 0.25rem;
  background: var(--vp-c-bg-alt);
  border-radius: 3px;
}

.era-detail {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.era-detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
}

.era-detail-year {
  font-weight: bold;
  color: var(--vp-c-brand);
  font-size: 0.88rem;
}

.era-detail-name {
  font-weight: bold;
  font-size: 0.88rem;
}

.era-detail-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.era-detail-milestone {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.milestone-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  font-size: 0.8rem;
}

.milestone-lang {
  font-weight: bold;
  color: var(--vp-c-brand);
  min-width: 75px;
}

.milestone-significance {
  color: var(--vp-c-text-2);
  font-size: 0.78rem;
}

/* Paradigms */
.paradigm-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.paradigm-card {
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
  border: 2px solid transparent;
  transition: all 0.2s;
}

.paradigm-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.paradigm-icon {
  font-size: 1.2rem;
}

.paradigm-name {
  font-weight: bold;
  font-size: 0.82rem;
}

.paradigm-one-liner {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.paradigm-detail {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.paradigm-detail-header {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 0.35rem;
}

.paradigm-detail-icon {
  font-size: 1rem;
}

.paradigm-detail-name {
  font-weight: bold;
  font-size: 0.9rem;
}

.paradigm-detail-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.paradigm-detail-langs {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.detail-label {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}

.lang-tag {
  padding: 0.1rem 0.35rem;
  background: var(--vp-c-brand-soft);
  border-radius: 3px;
  font-size: 0.75rem;
}

.paradigm-detail-example {
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  margin-bottom: 0.35rem;
  overflow: hidden;
}

.paradigm-detail-example pre {
  margin: 0;
  padding: 0.5rem;
  font-size: 0.75rem;
  font-family: var(--vp-font-family-mono);
  white-space: pre-wrap;
  line-height: 1.5;
}

.paradigm-traits {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.trait-chip {
  font-size: 0.72rem;
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-bg-alt);
  border-radius: 3px;
  border: 1px solid var(--vp-c-divider);
}

/* Compare Table */
.compare-intro {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.35rem;
  text-align: center;
}

.compare-table-wrapper {
  overflow-x: auto;
}

.compare-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
}

.compare-table th,
.compare-table td {
  border: 1px solid var(--vp-c-divider);
  padding: 0.35rem 0.5rem;
  text-align: left;
}

.compare-table th {
  background: var(--vp-c-bg-alt);
  font-size: 0.78rem;
}

.compare-table tbody tr {
  cursor: pointer;
  transition: background 0.2s;
}

.compare-table tbody tr:hover {
  background: var(--vp-c-bg-alt);
}

.row-highlight {
  background: var(--vp-c-brand-soft) !important;
}

.lang-name-cell {
  font-weight: bold;
}

.type-badge {
  display: inline-block;
  font-size: 0.7rem;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
}

.type-badge.static-strong {
  background: rgba(16, 185, 129, 0.15);
  color: var(--vp-c-green-1);
}
.type-badge.static-weak {
  background: rgba(245, 158, 11, 0.15);
  color: #d97706;
}
.type-badge.dynamic-strong {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
}
.type-badge.dynamic-weak {
  background: rgba(239, 68, 68, 0.15);
  color: var(--vp-c-danger-1);
}

.usage-cell {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

/* Choose */
.choose-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.choose-card {
  background: var(--vp-c-bg);
  padding: 0.5rem;
  border-radius: 6px;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.choose-icon {
  font-size: 1.2rem;
}

.choose-scene {
  font-weight: bold;
  font-size: 0.82rem;
  margin: 0.1rem 0;
}

.choose-langs {
  display: flex;
  gap: 0.2rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 0.2rem;
}

.choose-lang-tag {
  font-size: 0.7rem;
  padding: 0.1rem 0.3rem;
  background: var(--vp-c-brand-soft);
  border-radius: 3px;
}

.choose-reason {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}

.learning-path {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.path-title {
  font-weight: bold;
  font-size: 0.88rem;
  margin-bottom: 0.5rem;
}

.path-steps {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.path-step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
}

.path-num {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.72rem;
  font-weight: bold;
  flex-shrink: 0;
}

.path-lang {
  font-weight: bold;
  font-size: 0.82rem;
  min-width: 80px;
}

.path-why {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
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
  .timeline-track {
    flex-direction: column;
  }

  .era-card {
    min-width: auto;
  }

  .paradigm-cards {
    grid-template-columns: 1fr 1fr;
  }

  .choose-grid {
    grid-template-columns: 1fr;
  }
}
</style>
