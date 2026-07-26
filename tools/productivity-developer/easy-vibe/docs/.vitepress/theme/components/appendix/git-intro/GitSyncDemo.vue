<template>
  <div class="gs-root">
    <!-- Terminal -->
    <div class="gs-terminal">
      <div class="term-bar">
        <span class="dot r" /><span class="dot y" /><span class="dot g" />
        <span class="term-title">~/project (main)</span>
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
    <div class="gs-btns">
      <button
        v-for="op in ops"
        :key="op.id"
        :disabled="running || !op.ok()"
        :class="['gs-btn', { 'gs-btn--on': active === op.id, 'gs-btn--dim': !op.ok() }]"
        @click="run(op)"
      >
        <code>{{ op.cmd }}</code>
      </button>
      <button class="gs-btn gs-btn--reset" :disabled="running" @click="reset">{{ t('common.reset') }}</button>
    </div>

    <!-- Dual-repo visual -->
    <div class="gs-repos">
      <div class="repo-card" :class="{ 'repo-pulse': pulse === 'local' }">
        <div class="repo-header">
          <span class="repo-icon">💻</span>
          <span class="repo-name">{{ t('sync.localRepo') }}</span>
          <span class="repo-path">~/project</span>
        </div>
        <div class="commit-col">
          <div v-if="!localLog.length" class="no-commits">{{ t('common.empty') }}</div>
          <div
            v-for="(c, i) in localLog"
            :key="i"
            class="cmt-row"
            :class="{ 'cmt-new': c.isNew }"
          >
            <span class="cmt-dot local-dot" />
            <code class="cmt-hash">{{ c.hash }}</code>
            <span class="cmt-msg">{{ c.msg }}</span>
          </div>
        </div>
        <div class="repo-footer">
          <span v-if="localAhead > 0" class="badge-ahead">↑ {{ t('sync.unpushed', { count: localAhead }) }}</span>
          <span v-else-if="localLog.length" class="badge-sync">✓ {{ t('sync.synced') }}</span>
        </div>
      </div>

      <!-- Arrow column -->
      <div class="arrow-col">
        <div class="arrow-row" :class="{ 'arrow-lit': pulse === 'push' }">
          <span class="arrow-label">push →</span>
        </div>
        <div class="arrow-row arrow-pull" :class="{ 'arrow-lit': pulse === 'pull' }">
          <span class="arrow-label">← pull</span>
        </div>
      </div>

      <div class="repo-card repo-remote" :class="{ 'repo-pulse-remote': pulse === 'remote' }">
        <div class="repo-header">
          <span class="repo-icon">☁️</span>
          <span class="repo-name">{{ t('sync.remoteRepo') }}</span>
          <span class="repo-path">github.com/you/project</span>
        </div>
        <div class="commit-col">
          <div v-if="!remoteLog.length" class="no-commits">{{ t('common.empty') }}</div>
          <div
            v-for="(c, i) in remoteLog"
            :key="i"
            class="cmt-row"
            :class="{ 'cmt-new': c.isNew }"
          >
            <span class="cmt-dot remote-dot" />
            <code class="cmt-hash">{{ c.hash }}</code>
            <span class="cmt-msg">{{ c.msg }}</span>
          </div>
        </div>
        <div class="repo-footer">
          <span v-if="remoteLog.length" class="badge-online">🌐 {{ t('sync.online') }}</span>
        </div>
      </div>
    </div>

    <div v-if="hint" class="gs-hint">💡 {{ hint }}</div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { gitIntroLocale } from '../../../locales/git-intro/index.js'

const { t, messages, locale } = useI18n(gitIntroLocale)
const termEl = ref(null)
const lines = ref([])
const typing = ref('')
const running = ref(false)
const active = ref(null)
const hint = ref('')
const pulse = ref('')

const localLog = ref([])
const remoteLog = ref([])
const localAhead = ref(2)
let s = { linked: false, pushed: false, committed: false, pushed2: false }

const ops = [
  {
    id: 'remote',
    cmd: 'git remote add origin https://github.com/you/project.git',
    ok: () => !s.linked,
    output: () => messages.value.sync.ops.remote.output,
    hint: () => messages.value.sync.ops.remote.hint,
    do: () => { s.linked = true },
    p: '',
  },
  {
    id: 'push1',
    cmd: 'git push -u origin main',
    ok: () => s.linked && !s.pushed,
    output: () => messages.value.sync.ops.push1.output,
    hint: () => messages.value.sync.ops.push1.hint,
    do: () => {
      s.pushed = true; localAhead.value = 0
      remoteLog.value = localLog.value.map(c => ({ ...c, isNew: true }))
      setTimeout(() => remoteLog.value.forEach(c => c.isNew = false), 900)
    },
    p: 'push',
  },
  {
    id: 'commit',
    cmd: () => messages.value.sync.ops.commit.cmd,
    ok: () => s.pushed && !s.committed,
    output: () => messages.value.sync.ops.commit.output,
    hint: () => messages.value.sync.ops.commit.hint,
    do: () => {
      s.committed = true; localAhead.value = 1
      localLog.value.unshift({ hash: 'b5e6f7a', msg: messages.value.sync.ops.commit.commitMsg, isNew: true })
      setTimeout(() => localLog.value.forEach(c => c.isNew = false), 900)
    },
    p: 'local',
  },
  {
    id: 'push2',
    cmd: 'git push',
    ok: () => s.committed && !s.pushed2,
    output: () => messages.value.sync.ops.push2.output,
    hint: () => messages.value.sync.ops.push2.hint,
    do: () => {
      s.pushed2 = true; localAhead.value = 0
      remoteLog.value = localLog.value.map(c => ({ ...c, isNew: true }))
      setTimeout(() => remoteLog.value.forEach(c => c.isNew = false), 900)
    },
    p: 'push',
  },
  {
    id: 'pull',
    cmd: 'git pull',
    ok: () => s.pushed,
    output: () => messages.value.sync.ops.pull.output,
    hint: () => messages.value.sync.ops.pull.hint,
    do: () => {
      const c = { hash: 'd8c9e0f', msg: messages.value.sync.ops.pull.commitMsg, isNew: true }
      remoteLog.value.unshift({ ...c })
      localLog.value.unshift({ ...c })
      setTimeout(() => {
        remoteLog.value.forEach(x => x.isNew = false)
        localLog.value.forEach(x => x.isNew = false)
      }, 900)
    },
    p: 'pull',
  },
]

const sleep = ms => new Promise(r => setTimeout(r, ms))
function scroll() { if (termEl.value) termEl.value.scrollTop = termEl.value.scrollHeight }

async function run(op) {
  if (running.value) return
  running.value = true; active.value = op.id; hint.value = ''; typing.value = ''; pulse.value = ''
  const cmd = typeof op.cmd === 'function' ? op.cmd() : op.cmd
  for (const ch of cmd) { typing.value += ch; await sleep(20) }
  await sleep(80)
  lines.value.push({ kind: 'cmd', text: cmd }); typing.value = ''
  await nextTick(); scroll(); await sleep(150)
  for (const l of op.output()) { lines.value.push(l); await nextTick(); scroll(); await sleep(50) }
  op.do()
  pulse.value = op.p
  await sleep(100); hint.value = op.hint()
  setTimeout(() => { if (pulse.value === op.p) pulse.value = '' }, 1200)
  running.value = false
}

function reset() {
  lines.value = [{ kind: 'dim', text: messages.value.sync.initialLine }]
  localLog.value = messages.value.sync.initialLocalLog.map(c => ({ ...c, isNew: false }))
  remoteLog.value = []; localAhead.value = 2
  s = { linked: false, pushed: false, committed: false, pushed2: false }
  active.value = null; hint.value = messages.value.sync.initialHint
  typing.value = ''; running.value = false; pulse.value = ''
}

reset()
watch(locale, reset)
</script>

<style scoped>
.gs-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px; overflow: hidden;
  background: var(--vp-c-bg-soft); margin: 1rem 0; font-size: 0.85rem;
}

/* Terminal */
.gs-terminal { background: #141420; }
.term-bar {
  display: flex; align-items: center; gap: 5px;
  padding: 7px 12px; background: #1e1e2e;
}
.dot { width: 11px; height: 11px; border-radius: 50%; }
.dot.r { background: #ff5f57; } .dot.y { background: #febc2e; } .dot.g { background: #28c840; }
.term-title { margin-left: 8px; font-size: 0.72rem; color: #666; font-family: monospace; }
.term-body {
  min-height: 120px; max-height: 180px; overflow-y: auto;
  padding: 0.7rem 1rem;
  font-family: 'Menlo','Monaco',monospace; font-size: 0.76rem; line-height: 1.6; color: #cdd6f4;
}
.t-line { display: flex; }
.t-ps { color: #a6e3a1; flex-shrink: 0; }
.t-cmd { color: #cdd6f4; } .t-dim { color: #585b70; } .t-grn { color: #a6e3a1; } .t-yel { color: #89b4fa; }
.t-typing { color: #cdd6f4; }
.t-cur { animation: blink 1s step-end infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

/* Buttons */
.gs-btns {
  display: flex; flex-wrap: wrap; gap: 6px;
  padding: 8px 10px; background: #0d0d1a; border-top: 1px solid #2a2a3e;
}
.gs-btn {
  background: #1e1e2e; border: 1px solid #313244;
  border-radius: 5px; padding: 4px 9px; cursor: pointer; transition: border-color .2s;
}
.gs-btn code { font-size: 0.7rem; color: #7f849c; font-family: monospace; white-space: nowrap; }
.gs-btn:hover:not(:disabled) { border-color: var(--vp-c-brand); }
.gs-btn--on { border-color: var(--vp-c-brand) !important; }
.gs-btn--on code { color: var(--vp-c-brand); }
.gs-btn--dim { opacity: 0.3; cursor: not-allowed; }
.gs-btn--reset { background: transparent; border-color: #313244; margin-left: auto; }
.gs-btn--reset { font-size: 0.7rem; color: #585b70; }

/* Repos */
.gs-repos {
  display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  gap: 12px; padding: 16px 14px;
  background: var(--vp-c-bg); border-top: 1px solid var(--vp-c-divider);
  align-items: start;
  min-height: 200px;
  overflow-x: auto;
}
@media (max-width: 600px) {
  .gs-repos { grid-template-columns: 1fr; }
  .arrow-col { flex-direction: row; justify-content: center; gap: 16px; }
}

.repo-card {
  border: 1.5px solid var(--vp-c-divider); border-radius: 8px;
  padding: 12px 14px; background: var(--vp-c-bg-soft);
  min-height: 180px; min-width: 0;
  display: flex; flex-direction: column;
  transition: border-color .3s, box-shadow .3s;
}
.repo-remote { border-color: #60a5fa44; background: color-mix(in srgb, #60a5fa 4%, var(--vp-c-bg-soft)); }
.repo-pulse { border-color: var(--vp-c-brand) !important; box-shadow: 0 0 0 3px color-mix(in srgb, var(--vp-c-brand) 12%, transparent); }
.repo-pulse-remote { border-color: #60a5fa !important; box-shadow: 0 0 0 3px #60a5fa22; }

.repo-header {
  display: flex; align-items: center; gap: 6px; margin-bottom: 10px; flex-wrap: wrap;
  min-width: 0;
}
.repo-icon { font-size: 1.1rem; flex-shrink: 0; }
.repo-name { font-weight: 700; font-size: 0.88rem; flex-shrink: 0; }
.repo-path {
  font-family: monospace; font-size: 0.7rem; color: var(--vp-c-text-3);
  margin-left: auto; min-width: 0; overflow: hidden;
  text-overflow: ellipsis; white-space: nowrap;
}

.commit-col {
  min-height: 80px; min-width: 0;
  display: flex; flex-direction: column; gap: 6px; flex: 1;
}
.no-commits { color: var(--vp-c-text-3); font-size: 0.8rem; padding: 6px 0; }
.cmt-row {
  display: flex; align-items: center; gap: 8px; font-size: 0.8rem;
  padding: 8px 10px; border-radius: 6px; min-height: 36px;
  min-width: 0; transition: background .3s;
}
.cmt-new { background: color-mix(in srgb, var(--vp-c-brand) 10%, transparent); }
.cmt-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.local-dot { background: var(--vp-c-brand); }
.remote-dot { background: #60a5fa; }
.cmt-hash { color: var(--vp-c-brand); font-size: 0.76rem; flex-shrink: 0; }
.cmt-msg {
  color: var(--vp-c-text-2);
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.repo-footer { margin-top: 10px; font-size: 0.76rem; min-height: 20px; }
.badge-ahead { color: var(--vp-c-brand); font-weight: 600; }
.badge-sync { color: #a6e3a1; }
.badge-online { color: #60a5fa; }

/* Arrows */
.arrow-col {
  display: flex; flex-direction: column; align-items: center;
  gap: 12px; padding-top: 32px;
}
.arrow-row {
  display: flex; align-items: center; gap: 4px;
  opacity: 0.25; transition: opacity .3s;
}
.arrow-row.arrow-lit { opacity: 1; }
.arrow-label {
  font-size: 0.66rem; font-family: monospace;
  color: var(--vp-c-brand); white-space: nowrap;
}
.arrow-pull .arrow-label { color: #60a5fa; }

.gs-hint {
  padding: 10px 14px; background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.82rem; color: var(--vp-c-text-2); line-height: 1.5;
}
</style>
