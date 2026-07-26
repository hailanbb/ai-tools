<template>
  <div class="relevance-demo">
    <div class="header">
      <div class="title">{{ t('relevance.title') }}</div>
      <div class="subtitle">{{ t('relevance.subtitle') }}</div>
    </div>

    <div class="search-box">
      <input v-model="query" :placeholder="t('relevance.placeholder')" class="search-input" />
      <button class="search-btn" @click="calcScores">{{ t('relevance.button') }}</button>
    </div>

    <div v-if="results.length > 0" class="results">
      <div
        v-for="(r, i) in results"
        :key="i"
        class="result-item"
      >
        <div class="result-rank">#{{ i + 1 }}</div>
        <div class="result-content">
          <div class="result-title">{{ r.title }}</div>
          <div class="result-snippet">{{ r.snippet }}</div>
        </div>
        <div class="result-score">
          <div class="score-bar">
            <div class="score-fill" :style="{ width: r.scorePercent + '%' }"></div>
          </div>
          <div class="score-value">{{ r.score.toFixed(2) }}</div>
        </div>
      </div>
    </div>

    <div class="scoring-info">
      <div class="info-title">{{ t('relevance.infoTitle') }}</div>
      <div class="factor-grid">
        <div v-for="factor in factors" :key="factor.name" class="factor">
          <div class="factor-name">{{ factor.name }}</div>
          <div class="factor-desc">{{ factor.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { searchEnginesLocale } from '../../../locales/search-engines/index.js'

const { t, messages } = useI18n(searchEnginesLocale)

const query = ref('')
const results = ref([])

const documents = computed(() => messages.value.relevance.documents)
const factors = computed(() => messages.value.relevance.factors)

function calcScores() {
  if (!query.value.trim()) { results.value = []; return }
  const q = query.value.trim().toLowerCase()
  const scored = documents.value.map(doc => {
    let score = 0
    for (const [word, tf] of Object.entries(doc.keywords)) {
      const normalizedWord = word.toLowerCase()
      if (normalizedWord.includes(q) || q.includes(normalizedWord)) {
        const idf = Math.log(documents.value.length / (1 + documents.value.filter(d => d.keywords[word]).length))
        score += tf * (idf + 1)
      }
    }
    return { ...doc, score }
  }).filter(d => d.score > 0).sort((a, b) => b.score - a.score)

  const maxScore = scored.length > 0 ? scored[0].score : 1
  results.value = scored.map(r => ({ ...r, scorePercent: (r.score / maxScore) * 100 }))
}
</script>

<style scoped>
.relevance-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.search-box { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.search-input {
  flex: 1; padding: 0.5rem 0.75rem; border-radius: 6px;
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); font-size: 0.9rem;
}
.search-btn {
  padding: 0.5rem 1rem; border-radius: 6px; border: none;
  background: var(--vp-c-brand); color: #fff; cursor: pointer; font-size: 0.85rem;
}
.results { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
.result-item {
  display: flex; align-items: center; gap: 0.75rem; padding: 0.6rem;
  border-radius: 8px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.result-rank { font-weight: 700; font-size: 1rem; color: var(--vp-c-brand); min-width: 30px; }
.result-content { flex: 1; }
.result-title { font-weight: 600; font-size: 0.9rem; }
.result-snippet { font-size: 0.8rem; color: var(--vp-c-text-2); }
.result-score { min-width: 120px; }
.score-bar { height: 8px; background: var(--vp-c-bg-soft); border-radius: 4px; overflow: hidden; }
.score-fill { height: 100%; background: var(--vp-c-brand); border-radius: 4px; transition: width 0.3s; }
.score-value { font-size: 0.75rem; color: var(--vp-c-text-3); text-align: right; font-family: var(--vp-font-family-mono); }
.scoring-info { padding: 0.75rem; border-radius: 8px; background: rgba(var(--vp-c-brand-rgb),0.05); border: 1px solid var(--vp-c-brand); }
.info-title { font-weight: 700; font-size: 0.9rem; margin-bottom: 0.5rem; }
.factor-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.5rem; }
.factor { padding: 0.5rem; background: var(--vp-c-bg); border-radius: 6px; }
.factor-name { font-weight: 600; font-size: 0.85rem; margin-bottom: 0.2rem; }
.factor-desc { font-size: 0.75rem; color: var(--vp-c-text-2); line-height: 1.5; }
</style>
