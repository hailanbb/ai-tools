<template>
  <div class="doc-structure-demo">
    <div class="demo-label">{{ t('docStructure.title') }}</div>

    <div class="tabs">
      <button
        v-for="(doc, i) in docs"
        :key="i"
        class="tab"
        :class="{ active: current === i }"
        @click="current = i"
      >{{ doc.icon }} {{ doc.name }}</button>
    </div>

    <div class="structure-card">
      <div class="section-list">
        <div
          v-for="(sec, j) in docs[current].sections"
          :key="j"
          class="section-item"
          :class="{ active: selectedSec === j }"
          @click="selectedSec = selectedSec === j ? -1 : j"
        >
          <div class="sec-header">
            <span class="sec-num">{{ j + 1 }}</span>
            <span class="sec-name">{{ sec.name }}</span>
            <span class="sec-toggle">{{ selectedSec === j ? '▼' : '▶' }}</span>
          </div>
          <Transition name="fade">
            <div v-if="selectedSec === j" class="sec-detail">
              <p>{{ sec.desc }}</p>
              <pre v-if="sec.example"><code>{{ sec.example }}</code></pre>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { engineeringExcellenceLocale } from '../../../locales/engineering-excellence/index.js'

const { t, messages } = useI18n(engineeringExcellenceLocale)
const current = ref(0)
const selectedSec = ref(-1)
watch(current, () => { selectedSec.value = -1 })
const docs = computed(() => messages.value.docStructure.docs)
</script>

<style scoped>
.doc-structure-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}
.demo-label { font-size: 0.78rem; font-weight: bold; color: var(--vp-c-text-2); margin-bottom: 1rem; text-align: center; }
.tabs { display: flex; gap: 6px; margin-bottom: 1rem; flex-wrap: wrap; }
.tab { padding: 6px 14px; border-radius: 6px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); cursor: pointer; font-size: 0.85rem; transition: all 0.2s; }
.tab.active { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }

.section-list { display: flex; flex-direction: column; gap: 6px; }
.section-item { border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg); overflow: hidden; }
.sec-header { display: flex; align-items: center; gap: 8px; padding: 8px 12px; cursor: pointer; }
.sec-num { width: 22px; height: 22px; border-radius: 50%; background: var(--vp-c-brand); color: #fff; font-size: 0.72rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.sec-name { flex: 1; font-size: 0.88rem; font-weight: 600; }
.sec-toggle { font-size: 0.7rem; color: var(--vp-c-text-3); }
.section-item.active { border-color: var(--vp-c-brand); }

.sec-detail { padding: 0 12px 10px; }
.sec-detail p { font-size: 0.83rem; color: var(--vp-c-text-2); margin: 0 0 6px; }
.sec-detail pre { margin: 0; padding: 8px; background: var(--vp-c-bg-soft); border-radius: 4px; font-size: 0.78rem; line-height: 1.5; overflow-x: auto; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
