<template>
  <div class="inverted-index-demo">
    <div class="header">
      <div class="title">{{ t('invertedIndex.title') }}</div>
      <div class="subtitle">{{ t('invertedIndex.subtitle') }}</div>
    </div>

    <div class="search-box">
      <input
        v-model="query"
        :placeholder="t('invertedIndex.placeholder')"
        class="search-input"
        @input="search"
      />
    </div>

    <div class="index-layout">
      <div class="docs-section">
        <div class="section-title">{{ t('invertedIndex.sourceTitle') }}</div>
        <div
          v-for="doc in docs"
          :key="doc.id"
          :class="['doc-card', { highlight: matchedDocs.includes(doc.id) }]"
        >
          <span class="doc-id">Doc {{ doc.id }}</span>
          <span class="doc-text">{{ doc.text }}</span>
        </div>
      </div>

      <div class="index-section">
        <div class="section-title">{{ t('invertedIndex.indexTitle') }}</div>
        <div class="index-table">
          <div
            v-for="(entry, word) in invertedIndex"
            :key="word"
            :class="['index-row', { highlight: matchedWords.includes(word) }]"
          >
            <span class="index-word">{{ word }}</span>
            <span class="index-arrow">→</span>
            <span class="index-docs">
              <span v-for="id in entry" :key="id" class="doc-ref">[{{ id }}]</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="query && matchedDocs.length > 0" class="result">
      {{ t('invertedIndex.hitPrefix') }}{{ matchedDocs.map(id => 'Doc ' + id).join(t('invertedIndex.joiner')) }}
    </div>
    <div v-else-if="query" class="result no-match">
      {{ t('invertedIndex.noMatch') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { searchEnginesLocale } from '../../../locales/search-engines/index.js'

const { t, messages } = useI18n(searchEnginesLocale)

const query = ref('')
const matchedDocs = ref([])
const matchedWords = ref([])

const docs = computed(() => messages.value.invertedIndex.docs)
const invertedIndex = computed(() => messages.value.invertedIndex.index)

function search() {
  const q = query.value.trim().toLowerCase()
  if (!q) {
    matchedDocs.value = []
    matchedWords.value = []
    return
  }
  const words = Object.keys(invertedIndex.value).filter(w => q.includes(w.toLowerCase()))
  matchedWords.value = words
  const docSet = new Set()
  words.forEach(w => invertedIndex.value[w].forEach(id => docSet.add(id)))
  matchedDocs.value = [...docSet].sort()
}
</script>

<style scoped>
.inverted-index-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.search-box { margin-bottom: 1rem; }
.search-input {
  width: 100%; padding: 0.6rem 0.75rem; border-radius: 8px;
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);
  font-size: 0.9rem; outline: none;
}
.search-input:focus { border-color: var(--vp-c-brand); }
.index-layout { display: flex; gap: 1rem; margin-bottom: 1rem; }
.docs-section, .index-section { flex: 1; }
.section-title { font-weight: 600; font-size: 0.9rem; margin-bottom: 0.5rem; }
.doc-card {
  display: flex; gap: 0.5rem; padding: 0.4rem 0.6rem; margin-bottom: 0.25rem;
  border-radius: 6px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  font-size: 0.8rem; transition: all 0.2s;
}
.doc-card.highlight { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); }
.doc-id { font-weight: 700; color: var(--vp-c-brand); white-space: nowrap; }
.index-row {
  display: flex; align-items: center; gap: 0.5rem; padding: 0.3rem 0.5rem;
  margin-bottom: 0.2rem; border-radius: 4px; font-size: 0.8rem;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.index-row.highlight { border-color: #22c55e; background: rgba(34,197,94,0.05); }
.index-word { font-weight: 700; min-width: 40px; }
.index-arrow { color: var(--vp-c-text-3); }
.doc-ref {
  padding: 0.1rem 0.3rem; background: var(--vp-c-bg-soft); border-radius: 3px;
  font-family: var(--vp-font-family-mono); font-size: 0.75rem; margin-right: 0.2rem;
}
.result { padding: 0.5rem 0.75rem; border-radius: 6px; font-size: 0.85rem; background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.3); }
.result.no-match { background: rgba(245,158,11,0.08); border-color: rgba(245,158,11,0.3); }
@media (max-width: 640px) { .index-layout { flex-direction: column; } }
</style>
