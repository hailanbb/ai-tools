<template>
  <div class="sc-root">
    <div class="sc-terminal">
      <div class="term-bar">
        <span class="dot r" /><span class="dot y" /><span class="dot g" />
        <span class="term-title">{{ t('status.terminalTitle') }}</span>
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

    <div class="sc-btns">
      <button
        v-for="op in ops"
        :key="op.id"
        :disabled="running || !op.ok()"
        :class="[
          'sc-btn',
          { 'sc-btn--on': active === op.id, 'sc-btn--dim': !op.ok() }
        ]"
        @click="run(op)"
      >
        <code>{{ op.cmd }}</code>
      </button>
      <button class="sc-btn sc-btn--reset" :disabled="running" @click="reset">
        {{ t('status.reset') }}
      </button>
    </div>

    <div class="sc-codes">
      <div class="code-section">
        <div class="section-header success">
          <span class="section-icon" v-html="t('status.sections.success.icon')" />
          <span class="section-title">{{ t('status.sections.success.title') }}</span>
        </div>
        <div class="section-body">
          <div
            v-for="c in successCodes"
            :key="c.code"
            class="code-item"
            :class="{ active: activeCode === c.code }"
          >
            <span class="code-num">{{ c.code }}</span>
            <span class="code-name">{{ c.name }}</span>
            <span class="code-desc">{{ c.desc }}</span>
          </div>
        </div>
      </div>

      <div class="code-section">
        <div class="section-header client">
          <span class="section-icon" v-html="t('status.sections.client.icon')" />
          <span class="section-title">{{ t('status.sections.client.title') }}</span>
        </div>
        <div class="section-body">
          <div
            v-for="c in clientCodes"
            :key="c.code"
            class="code-item"
            :class="{ active: activeCode === c.code }"
          >
            <span class="code-num">{{ c.code }}</span>
            <span class="code-name">{{ c.name }}</span>
            <span class="code-desc">{{ c.desc }}</span>
          </div>
        </div>
      </div>

      <div class="code-section">
        <div class="section-header server">
          <span class="section-icon" v-html="t('status.sections.server.icon')" />
          <span class="section-title">{{ t('status.sections.server.title') }}</span>
        </div>
        <div class="section-body">
          <div
            v-for="c in serverCodes"
            :key="c.code"
            class="code-item"
            :class="{ active: activeCode === c.code }"
          >
            <span class="code-num">{{ c.code }}</span>
            <span class="code-name">{{ c.name }}</span>
            <span class="code-desc">{{ c.desc }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="hint" class="sc-hint">💡 {{ hint }}</div>
  </div>
</template>

<script setup>
import { ref, nextTick, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { apiDesignLocale } from '../../../locales/api-design/index.js'

const { t, messages } = useI18n(apiDesignLocale)
const termEl = ref(null)
const lines = ref([{ kind: 'dim', text: t('status.initialLine') }])
const typing = ref('')
const running = ref(false)
const active = ref(null)
const activeCode = ref(null)
const hint = ref(t('status.initialHint'))
const successCodes = computed(() => messages.value.status.successCodes)
const clientCodes = computed(() => messages.value.status.clientCodes)
const serverCodes = computed(() => messages.value.status.serverCodes)

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const ops = computed(() => messages.value.status.ops.map((op) => ({ ...op, ok: () => true })))

async function run(op) {
  if (running.value) return
  running.value = true
  active.value = op.id
  activeCode.value = null
  hint.value = ''
  typing.value = ''

  for (const ch of op.cmd) {
    typing.value += ch
    await sleep(18)
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

  activeCode.value = op.code
  await sleep(120)
  hint.value = op.hint
  running.value = false
}

function scroll() {
  if (termEl.value) termEl.value.scrollTop = termEl.value.scrollHeight
}

function reset() {
  lines.value = [{ kind: 'dim', text: t('status.initialLine') }]
  active.value = null
  activeCode.value = null
  hint.value = t('status.initialHint')
  typing.value = ''
  running.value = false
}
</script>

<style scoped>
.sc-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  margin: 1rem 0;
  font-size: 0.85rem;
}

.sc-terminal {
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
  min-height: 90px;
  max-height: 140px;
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

.sc-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 10px;
  background: #0d0d1a;
  border-top: 1px solid #2a2a3e;
}
.sc-btn {
  background: #1e1e2e;
  border: 1px solid #313244;
  border-radius: 5px;
  padding: 4px 9px;
  cursor: pointer;
  transition: border-color 0.2s;
}
.sc-btn code {
  font-size: 0.68rem;
  color: #7f849c;
  font-family: monospace;
  white-space: nowrap;
}
.sc-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
}
.sc-btn--on {
  border-color: var(--vp-c-brand) !important;
}
.sc-btn--on code {
  color: var(--vp-c-brand);
}
.sc-btn--dim {
  opacity: 0.3;
  cursor: not-allowed;
}
.sc-btn--reset {
  background: transparent;
  border-color: #313244;
  margin-left: auto;
}
.sc-btn--reset code {
  display: none;
}
.sc-btn--reset::after {
  font-size: 0.7rem;
  color: #585b70;
}

.sc-codes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border-top: 1px solid var(--vp-c-divider);
}

.code-section {
  border-right: 1px solid var(--vp-c-divider);
}
.code-section:last-child {
  border-right: none;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  font-weight: 700;
  font-size: 0.8rem;
}
.section-header.success {
  background: color-mix(in srgb, #22c55e 8%, var(--vp-c-bg-alt));
  color: #22c55e;
}
.section-header.client {
  background: color-mix(in srgb, #f59e0b 8%, var(--vp-c-bg-alt));
  color: #d97706;
}
.section-header.server {
  background: color-mix(in srgb, #ef4444 8%, var(--vp-c-bg-alt));
  color: #ef4444;
}

.section-icon {
  font-size: 0.9rem;
}
.section-title {
  font-size: 0.75rem;
}

.section-body {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.code-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 4px;
  background: var(--vp-c-bg);
  border: 1px solid transparent;
  transition: all 0.2s;
}
.code-item.active {
  border-color: var(--vp-c-brand);
  background: color-mix(in srgb, var(--vp-c-brand) 8%, var(--vp-c-bg));
}

.code-num {
  font-family: monospace;
  font-weight: 700;
  font-size: 0.75rem;
  min-width: 28px;
}
.code-item.active .code-num {
  color: var(--vp-c-brand);
}

.code-name {
  font-size: 0.72rem;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.code-desc {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
  margin-left: auto;
}

.sc-hint {
  padding: 10px 12px;
  background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .sc-codes {
    grid-template-columns: 1fr;
  }
  .code-section {
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
  }
  .code-section:last-child {
    border-bottom: none;
  }
}
</style>
