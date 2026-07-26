<template>
  <div class="eh-root">
    <div class="eh-terminal">
      <div class="term-bar">
        <span class="dot r" /><span class="dot y" /><span class="dot g" />
        <span class="term-title">{{ t('errorHandling.terminalTitle') }}</span>
      </div>
      <div ref="termEl" class="term-body">
        <div v-for="(l, i) in lines" :key="i" class="t-line">
          <span v-if="l.kind === 'cmd'" class="t-ps">&gt; </span>
          <span :class="'t-' + l.kind">{{ l.text }}</span>
        </div>
        <div class="t-line">
          <span class="t-ps">&gt; </span>
          <span class="t-typing">{{ typing }}<span class="t-cur">▋</span></span>
        </div>
      </div>
    </div>

    <div class="eh-btns">
      <button
        v-for="op in ops"
        :key="op.id"
        :disabled="running || !op.ok()"
        :class="[
          'eh-btn',
          { 'eh-btn--on': active === op.id, 'eh-btn--dim': !op.ok() }
        ]"
        @click="run(op)"
      >
        <code v-html="op.cmd" />
      </button>
      <button class="eh-btn eh-btn--reset" :disabled="running" @click="reset">
        {{ t('errorHandling.reset') }}
      </button>
    </div>

    <div class="eh-response">
      <div class="res-header">
        <span class="res-label">{{ t('errorHandling.responseLabel') }}</span>
        <span class="res-status" :class="responseStatusClass">{{
          responseStatus
        }}</span>
      </div>
      <div class="res-body">
        <pre v-if="responseData">{{ responseData }}</pre>
        <div v-else class="res-empty">{{ t('errorHandling.emptyResponse') }}</div>
      </div>
    </div>

    <div v-if="hint" class="eh-hint">💡 {{ hint }}</div>
  </div>
</template>

<script setup>
import { ref, nextTick, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { apiDesignLocale } from '../../../locales/api-design/index.js'

const { t, messages } = useI18n(apiDesignLocale)
const termEl = ref(null)
const lines = ref([{ kind: 'dim', text: t('errorHandling.initialLine') }])
const typing = ref('')
const running = ref(false)
const active = ref(null)
const hint = ref(t('errorHandling.initialHint'))
const responseData = ref('')
const responseStatus = ref('')
const responseStatusClass = computed(() => {
  if (responseStatus.value.startsWith('200')) return 'warning'
  return `s${responseStatus.value}`
})

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const ops = computed(() => messages.value.errorHandling.ops.map((op) => ({ ...op, ok: () => true })))

async function run(op) {
  if (running.value) return
  running.value = true
  active.value = op.id
  hint.value = ''
  typing.value = ''
  responseData.value = ''
  responseStatus.value = ''

  for (const ch of op.cmd) {
    typing.value += ch
    await sleep(15)
  }
  await sleep(80)
  lines.value.push({ kind: 'cmd', text: op.cmd })
  typing.value = ''
  await nextTick()
  scroll()
  await sleep(150)

  for (const l of op.output) {
    lines.value.push(l)
    await nextTick()
    scroll()
    await sleep(50)
  }

  responseStatus.value = op.responseStatus
  responseData.value = op.responseData
  await sleep(120)
  hint.value = op.hint
  running.value = false
}

function scroll() {
  if (termEl.value) termEl.value.scrollTop = termEl.value.scrollHeight
}

function reset() {
  lines.value = [{ kind: 'dim', text: t('errorHandling.initialLine') }]
  active.value = null
  hint.value = t('errorHandling.initialHint')
  typing.value = ''
  running.value = false
  responseData.value = ''
  responseStatus.value = ''
}
</script>

<style scoped>
.eh-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  margin: 1rem 0;
  font-size: 0.85rem;
}

.eh-terminal {
  background: #141420;
}
.term-bar {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 12px;
  background: #1e1e2e;
}
.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}
.dot.r {
  background: #ff5f57;
}
.dot.y {
  background: #febc2e;
}
.dot.g {
  background: #28c840;
}
.term-title {
  margin-left: 8px;
  font-size: 0.72rem;
  color: #666;
  font-family: monospace;
}

.term-body {
  min-height: 100px;
  max-height: 160px;
  overflow-y: auto;
  overflow-x: auto;
  padding: 0.7rem 1rem;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 0.76rem;
  line-height: 1.6;
  color: #cdd6f4;
}
.t-line {
  display: flex;
  min-width: min-content;
}
.t-ps {
  color: #89b4fa;
  flex-shrink: 0;
}
.t-cmd {
  color: #cdd6f4;
}
.t-dim {
  color: #585b70;
}
.t-grn {
  color: #a6e3a1;
}
.t-red {
  color: #f38ba8;
}
.t-yel {
  color: #f9e2af;
}
.t-typing {
  color: #cdd6f4;
}
.t-cur {
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.eh-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 10px;
  background: #0d0d1a;
  border-top: 1px solid #2a2a3e;
}
.eh-btn {
  background: #1e1e2e;
  border: 1px solid #313244;
  border-radius: 5px;
  padding: 4px 9px;
  cursor: pointer;
  transition: border-color 0.2s;
}
.eh-btn code {
  font-size: 0.68rem;
  color: #7f849c;
  font-family: monospace;
  white-space: nowrap;
}
.eh-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
}
.eh-btn--on {
  border-color: var(--vp-c-brand) !important;
}
.eh-btn--on code {
  color: var(--vp-c-brand);
}
.eh-btn--dim {
  opacity: 0.3;
  cursor: not-allowed;
}
.eh-btn--reset {
  background: transparent;
  border-color: #313244;
  margin-left: auto;
}
.eh-btn--reset code {
  display: none;
}
.eh-btn--reset::after {
  font-size: 0.7rem;
  color: #585b70;
}

.eh-response {
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}
.res-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
}
.res-label {
  font-weight: 700;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
}
.res-status {
  font-family: monospace;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
}
.res-status.warning {
  background: #f9e2af22;
  color: #d97706;
}
.res-status.s400 {
  background: #f59e0b22;
  color: #d97706;
}
.res-status.s404 {
  background: #3b82f622;
  color: #3b82f6;
}
.res-status.s422 {
  background: #8b5cf622;
  color: #8b5cf6;
}
.res-status.s500 {
  background: #ef444422;
  color: #ef4444;
}

.res-body {
  padding: 12px;
  min-height: 80px;
}
.res-body pre {
  margin: 0;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 0.72rem;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  white-space: pre-wrap;
  word-break: break-all;
}
.res-empty {
  color: var(--vp-c-text-3);
  font-style: italic;
  font-size: 0.8rem;
}

.eh-hint {
  padding: 10px 12px;
  background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}
</style>
