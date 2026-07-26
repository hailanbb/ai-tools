<template>
  <div class="gb-root">
    <!-- Terminal -->
    <div class="gb-terminal">
      <div class="term-bar">
        <span class="dot r" /><span class="dot y" /><span class="dot g" />
        <span class="term-title">~/project
          <span class="branch-tag">({{ branch }})</span>
        </span>
      </div>
      <div ref="termEl" class="term-body">
        <div v-for="(l, i) in lines" :key="i" class="t-line">
          <span v-if="l.kind === 'cmd'" class="t-ps">$ </span>
          <span :class="'t-' + l.kind">{{ l.text }}</span>
        </div>
        <div class="t-line">
          <span class="t-ps">$ </span>
          <span class="t-typing">{{ typing }}<span class="t-cur">▋</span></span>
        </div>
      </div>
    </div>

    <!-- Buttons -->
    <div class="gb-btns">
      <button
        v-for="op in ops"
        :key="op.id"
        :disabled="running || !op.ok()"
        :class="['gb-btn', { 'gb-btn--on': active === op.id, 'gb-btn--dim': !op.ok() }]"
        @click="run(op)"
      >
        <code>{{ op.cmd }}</code>
      </button>
      <button class="gb-btn gb-btn--reset" :disabled="running" @click="reset">{{ t('common.reset') }}</button>
    </div>

    <!-- SVG Graph -->
    <div class="gb-graph-wrap">
      <div class="gb-legend">
        <span class="leg-item"><span class="leg-dot main-c" />{{ t('branch.legend.main') }}</span>
        <span v-if="featLog.length" class="leg-item"><span class="leg-dot feat-c" />{{ t('branch.legend.feature') }}</span>
        <span v-if="mergeNode" class="leg-item"><span class="leg-dot merge-c" />{{ t('branch.legend.merge') }}</span>
        <span class="leg-item head-leg"><span class="leg-head">HEAD</span> {{ t('branch.legend.head') }}</span>
      </div>

      <div class="svg-scroll">
        <svg :width="svgW" :height="svgH" class="gb-svg">
          <line
            v-if="mainLog.length > 1"
            :x1="nodeX(0) + NODE_R"
            :y1="MAIN_Y"
            :x2="nodeX(mainLog.length - 1) - NODE_R"
            :y2="MAIN_Y"
            stroke="#5b9cf6" stroke-width="2.5"
          />

          <path
            v-if="featLog.length"
            :d="forkPath"
            fill="none" stroke="#f9e2af" stroke-width="2.5" stroke-linecap="round"
          />

          <line
            v-if="featLog.length > 1"
            :x1="featNodeX(0) + NODE_R"
            :y1="FEAT_Y"
            :x2="featNodeX(featLog.length - 1) - NODE_R"
            :y2="FEAT_Y"
            stroke="#f9e2af" stroke-width="2.5"
          />

          <path
            v-if="mergeNode"
            :d="mergePath"
            fill="none" stroke="#a6e3a1" stroke-width="2.5" stroke-linecap="round"
          />

          <g v-for="(c, i) in mainLog" :key="'m'+i">
            <circle
              :cx="nodeX(i)"
              :cy="MAIN_Y"
              :r="c.merge ? NODE_R + 2 : NODE_R"
              :fill="c.merge ? '#a6e3a1' : '#5b9cf6'"
              stroke="#1a1a2e" stroke-width="2"
            />
            <g v-if="branch === 'main' && i === mainLog.length - 1">
              <rect
                :x="nodeX(i) - 18"
                :y="MAIN_Y - NODE_R - 20"
                width="36" height="14"
                rx="3" fill="#5b9cf6" opacity="0.85"
              />
              <text
                :x="nodeX(i)"
                :y="MAIN_Y - NODE_R - 10"
                text-anchor="middle" font-size="9"
                font-family="monospace" fill="white" font-weight="bold"
              >HEAD</text>
            </g>
            <text
              :x="nodeX(i)"
              :y="MAIN_Y + NODE_R + 14"
              text-anchor="middle" font-size="9"
              font-family="monospace" :fill="c.merge ? '#a6e3a1' : '#7f849c'"
            >{{ c.hash }}</text>
            <text
              :x="nodeX(i)"
              :y="MAIN_Y + NODE_R + 25"
              text-anchor="middle" font-size="9"
              fill="#64748b"
            >{{ c.shortMsg }}</text>
          </g>

          <g v-for="(c, i) in featLog" :key="'f'+i">
            <circle
              :cx="featNodeX(i)"
              :cy="FEAT_Y"
              :r="NODE_R"
              fill="#f9e2af"
              stroke="#1a1a2e" stroke-width="2"
            />
            <g v-if="branch === 'feature-login' && i === featLog.length - 1">
              <rect
                :x="featNodeX(i) - 18"
                :y="FEAT_Y + NODE_R + 4"
                width="36" height="14"
                rx="3" fill="#f9e2af" opacity="0.85"
              />
              <text
                :x="featNodeX(i)"
                :y="FEAT_Y + NODE_R + 14"
                text-anchor="middle" font-size="9"
                font-family="monospace" fill="#1a1a2e" font-weight="bold"
              >HEAD</text>
            </g>
            <text
              :x="featNodeX(i)"
              :y="FEAT_Y - NODE_R - 14"
              text-anchor="middle" font-size="9"
              font-family="monospace" fill="#a89050"
            >{{ c.hash }}</text>
            <text
              :x="featNodeX(i)"
              :y="FEAT_Y - NODE_R - 3"
              text-anchor="middle" font-size="9"
              fill="#a89050"
            >{{ c.shortMsg }}</text>
          </g>

          <text
            :x="svgPad"
            :y="MAIN_Y - NODE_R - 26"
            font-size="10" font-family="monospace" fill="#5b9cf6" font-weight="bold"
          >main</text>
          <text
            v-if="featLog.length"
            :x="featNodeX(0)"
            :y="FEAT_Y + (branch==='feature-login' ? NODE_R + 26 : -NODE_R - 28)"
            font-size="10" font-family="monospace" fill="#f9e2af" font-weight="bold"
            text-anchor="middle"
          >feature-login</text>
        </svg>
      </div>
    </div>

    <div v-if="hint" class="gb-hint">💡 {{ hint }}</div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { gitIntroLocale } from '../../../locales/git-intro/index.js'

const { t, messages, locale } = useI18n(gitIntroLocale)
const NODE_R = 10
const STEP = 100
const svgPad = 50
const MAIN_Y = 70
const FEAT_Y = 170

const termEl = ref(null)
const lines = ref([])
const typing = ref('')
const running = ref(false)
const active = ref(null)
const hint = ref('')
const branch = ref('main')

const mainLog = ref([])
const featLog = ref([])
const mergeNode = ref(false)
let s = { created: false, c1: false, c2: false, merged: false }

function nodeX(i) { return svgPad + i * STEP }

const forkIdx = computed(() => mainLog.value.filter(c => !c.merge).length - 1)

function featNodeX(i) { return nodeX(forkIdx.value) + (i + 1) * STEP }

const svgW = computed(() => {
  const lastMain = nodeX(mainLog.value.length - 1)
  const lastFeat = featLog.value.length ? featNodeX(featLog.value.length - 1) : 0
  return Math.max(lastMain, lastFeat) + svgPad + 30
})
const svgH = computed(() => featLog.value.length ? 240 : 130)

const forkPath = computed(() => {
  if (!featLog.value.length) return ''
  const x1 = nodeX(forkIdx.value)
  const y1 = MAIN_Y
  const x2 = featNodeX(0)
  const y2 = FEAT_Y
  return `M ${x1} ${y1} C ${x1 + 40} ${y1}, ${x2 - 20} ${y2}, ${x2} ${y2}`
})

const mergePath = computed(() => {
  if (!mergeNode.value || !featLog.value.length) return ''
  const x1 = featNodeX(featLog.value.length - 1)
  const y1 = FEAT_Y
  const mergeIdx = mainLog.value.length - 1
  const x2 = nodeX(mergeIdx)
  const y2 = MAIN_Y
  return `M ${x1} ${y1} C ${x1 + 30} ${y1}, ${x2 - 20} ${y2}, ${x2} ${y2}`
})

const ops = [
  {
    id: 'create',
    cmd: 'git checkout -b feature-login',
    ok: () => !s.created,
    output: () => messages.value.branch.ops.create.output,
    hint: () => messages.value.branch.ops.create.hint,
    do: () => { s.created = true; branch.value = 'feature-login' },
  },
  {
    id: 'c1',
    cmd: () => messages.value.branch.ops.c1.cmd,
    ok: () => s.created && !s.c1,
    output: () => messages.value.branch.ops.c1.output,
    hint: () => messages.value.branch.ops.c1.hint,
    do: () => { s.c1 = true; featLog.value.push({ hash: 'e1a2b3c', shortMsg: messages.value.branch.ops.c1.shortMsg }) },
  },
  {
    id: 'c2',
    cmd: () => messages.value.branch.ops.c2.cmd,
    ok: () => s.c1 && !s.c2,
    output: () => messages.value.branch.ops.c2.output,
    hint: () => messages.value.branch.ops.c2.hint,
    do: () => { s.c2 = true; featLog.value.push({ hash: 'f4d5e6f', shortMsg: messages.value.branch.ops.c2.shortMsg }) },
  },
  {
    id: 'back',
    cmd: 'git checkout main',
    ok: () => s.c2 && branch.value !== 'main',
    output: () => messages.value.branch.ops.back.output,
    hint: () => messages.value.branch.ops.back.hint,
    do: () => { branch.value = 'main' },
  },
  {
    id: 'merge',
    cmd: 'git merge feature-login',
    ok: () => s.c2 && branch.value === 'main' && !s.merged,
    output: () => messages.value.branch.ops.merge.output,
    hint: () => messages.value.branch.ops.merge.hint,
    do: () => {
      s.merged = true
      mergeNode.value = true
      mainLog.value.push({ hash: 'a9b8c7d', shortMsg: 'Merge', merge: true })
    },
  },
]

const sleep = ms => new Promise(r => setTimeout(r, ms))
function scroll() { if (termEl.value) termEl.value.scrollTop = termEl.value.scrollHeight }

async function run(op) {
  if (running.value) return
  running.value = true; active.value = op.id; hint.value = ''; typing.value = ''
  const cmd = typeof op.cmd === 'function' ? op.cmd() : op.cmd
  for (const ch of cmd) { typing.value += ch; await sleep(22) }
  await sleep(80)
  lines.value.push({ kind: 'cmd', text: cmd }); typing.value = ''
  await nextTick(); scroll(); await sleep(150)
  for (const l of op.output()) { lines.value.push(l); await nextTick(); scroll(); await sleep(50) }
  op.do(); await sleep(100); hint.value = op.hint(); running.value = false
}

function reset() {
  lines.value = [{ kind: 'dim', text: messages.value.branch.initialLine }]
  mainLog.value = messages.value.branch.mainInitial.map(c => ({ ...c }))
  featLog.value = []; branch.value = 'main'; mergeNode.value = false
  s = { created: false, c1: false, c2: false, merged: false }
  active.value = null
  hint.value = messages.value.branch.initialHint
  typing.value = ''; running.value = false
}

reset()
watch(locale, reset)
</script>

<style scoped>
.gb-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px; overflow: hidden;
  background: var(--vp-c-bg-soft); margin: 1rem 0; font-size: 0.85rem;
}

/* Terminal */
.gb-terminal { background: #141420; }
.term-bar {
  display: flex; align-items: center; gap: 5px;
  padding: 7px 12px; background: #1e1e2e;
}
.dot { width: 11px; height: 11px; border-radius: 50%; }
.dot.r { background: #ff5f57; } .dot.y { background: #febc2e; } .dot.g { background: #28c840; }
.term-title { margin-left: 8px; font-size: 0.72rem; color: #666; font-family: monospace; }
.branch-tag { color: #cba6f7; font-weight: 600; }
.term-body {
  min-height: 100px; max-height: 140px; overflow-y: auto;
  padding: 0.7rem 1rem;
  font-family: 'Menlo','Monaco',monospace; font-size: 0.76rem; line-height: 1.6; color: #cdd6f4;
}
.t-line { display: flex; }
.t-ps { color: #a6e3a1; flex-shrink: 0; }
.t-cmd { color: #cdd6f4; } .t-dim { color: #585b70; } .t-grn { color: #a6e3a1; }
.t-typing { color: #cdd6f4; }
.t-cur { animation: blink 1s step-end infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

/* Buttons */
.gb-btns {
  display: flex; flex-wrap: wrap; gap: 6px;
  padding: 8px 10px; background: #0d0d1a; border-top: 1px solid #2a2a3e;
}
.gb-btn {
  background: #1e1e2e; border: 1px solid #313244;
  border-radius: 5px; padding: 4px 9px; cursor: pointer; transition: border-color .2s;
}
.gb-btn code { font-size: 0.7rem; color: #7f849c; font-family: monospace; white-space: nowrap; }
.gb-btn:hover:not(:disabled) { border-color: var(--vp-c-brand); }
.gb-btn--on { border-color: var(--vp-c-brand) !important; }
.gb-btn--on code { color: var(--vp-c-brand); }
.gb-btn--dim { opacity: 0.3; cursor: not-allowed; }
.gb-btn--reset { background: transparent; border-color: #313244; margin-left: auto; }
.gb-btn--reset { font-size: 0.7rem; color: #585b70; }

/* Graph */
.gb-graph-wrap {
  background: var(--vp-c-bg); border-top: 1px solid var(--vp-c-divider);
  padding: 14px 16px;
  min-height: 200px;
  overflow-x: auto;
  max-width: 100%;
}
.gb-legend {
  display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 12px;
  font-size: 0.8rem; color: var(--vp-c-text-2);
}
.leg-item { display: flex; align-items: center; gap: 6px; }
.leg-dot { width: 11px; height: 11px; border-radius: 50%; flex-shrink: 0; }
.main-c { background: #5b9cf6; }
.feat-c { background: #f9e2af; }
.merge-c { background: #a6e3a1; }
.leg-head {
  font-family: monospace; font-size: 0.72rem; font-weight: 700;
  background: #5b9cf655; color: #5b9cf6; padding: 2px 6px; border-radius: 4px;
}
.head-leg { gap: 6px; }

.svg-scroll { overflow-x: auto; overflow-y: hidden; max-width: 100%; }
.gb-svg { display: block; overflow: visible; }

.gb-hint {
  padding: 10px 14px; background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.82rem; color: var(--vp-c-text-2); line-height: 1.5;
}
</style>
