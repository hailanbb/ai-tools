<template>
  <div class="lang-scope">
    <div class="nav-bar">
      <button class="arrow" :disabled="current === 0" @click="current--">◀</button>
      <div class="tabs">
        <button
          v-for="(lang, i) in langs"
          :key="lang.id"
          class="tab"
          :class="{ active: current === i }"
          @click="current = i"
        >{{ lang.icon }} {{ lang.name }}</button>
      </div>
      <button class="arrow" :disabled="current === langs.length - 1" @click="current++">▶</button>
    </div>
    <div class="card">
      <div class="card-header">
        <span class="lang-icon">{{ langs[current].icon }}</span>
        <div>
          <div class="lang-name">{{ langs[current].name }}</div>
          <div class="lang-desc">{{ langs[current].tagline }}</div>
        </div>
        <span class="dir-count">{{ t('scope.directionCount', { count: langs[current].dirs.length }) }}</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width:18%">{{ headers[0] }}</th>
              <th style="width:46%">{{ headers[1] }}</th>
              <th style="width:36%">{{ headers[2] }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="d in langs[current].dirs" :key="d.dir">
              <td class="dir-cell">{{ d.dir }}</td>
              <td>{{ d.detail }}</td>
              <td class="apps-cell"><span v-for="a in d.apps" :key="a" class="app-tag">{{ a }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { backendLanguagesLocale } from '../../../locales/backend-languages/index.js'

const { t, messages } = useI18n(backendLanguagesLocale)
const current = ref(0)
const langs = computed(() => messages.value.scope.langs)
const headers = computed(() => messages.value.scope.headers)
</script>

<style scoped>
.lang-scope { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 0.75rem; margin: 1rem 0; }
.nav-bar { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; }
.arrow { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 6px; padding: 0.25rem 0.5rem; cursor: pointer; font-size: 0.8rem; }
.arrow:disabled { opacity: 0.3; cursor: not-allowed; }
.tabs { display: flex; gap: 0.25rem; overflow-x: auto; flex: 1; }
.tab { white-space: nowrap; padding: 0.25rem 0.5rem; border: 1px solid transparent; border-radius: 6px; background: none; cursor: pointer; font-size: 0.75rem; color: var(--vp-c-text-2); transition: all 0.2s; }
.tab:hover { background: var(--vp-c-bg); }
.tab.active { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }
.card { background: var(--vp-c-bg); border-radius: 8px; overflow: hidden; }
.card-header { display: flex; align-items: center; gap: 0.75rem; padding: 0.6rem 0.75rem; border-bottom: 1px solid var(--vp-c-divider); }
.lang-icon { font-size: 1.5rem; }
.lang-name { font-weight: 700; font-size: 0.95rem; }
.lang-desc { font-size: 0.75rem; color: var(--vp-c-text-2); }
.dir-count { margin-left: auto; font-size: 0.75rem; color: var(--vp-c-text-3); white-space: nowrap; }
.table-wrap { overflow-x: auto; max-height: 320px; overflow-y: auto; }
table { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
thead { position: sticky; top: 0; background: var(--vp-c-bg); z-index: 1; }
th { text-align: left; padding: 0.4rem 0.6rem; border-bottom: 2px solid var(--vp-c-divider); font-size: 0.75rem; color: var(--vp-c-text-2); }
td { padding: 0.4rem 0.6rem; border-bottom: 1px solid var(--vp-c-divider); vertical-align: top; line-height: 1.5; }
.dir-cell { font-weight: 600; white-space: nowrap; color: var(--vp-c-brand-1); }
.apps-cell { display: flex; flex-wrap: wrap; gap: 0.25rem; }
.app-tag { display: inline-block; padding: 0.1rem 0.4rem; background: var(--vp-c-bg-soft); border-radius: 4px; font-size: 0.7rem; white-space: nowrap; }
</style>
