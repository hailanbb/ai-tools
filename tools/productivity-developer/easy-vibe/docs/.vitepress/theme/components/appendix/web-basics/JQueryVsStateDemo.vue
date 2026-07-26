<template>
  <div class="jq-demo">
    <div class="header">
      <div class="title">
        {{ t('frameworks.jqueryState.title') }}
      </div>
      <div class="subtitle">
        {{ t('frameworks.jqueryState.subtitle') }}
      </div>
    </div>

    <div class="panes">
      <!-- jQuery-like -->
      <div class="pane">
        <div class="pane-title">
          {{ t('frameworks.jqueryState.jqueryTitle') }}
        </div>
        <div class="mock-app">
          <div class="topbar">
            <span>{{ t('frameworks.jqueryState.badge') }}</span>
            <span
              class="badge"
              :class="{ wrong: jqBadgeWrong }"
            >{{
              jqBadge
            }}</span>
          </div>
          <div class="content">
            <div class="row">
              {{ t('frameworks.jqueryState.cartPage') }}
              <span
                class="num"
                :class="{ wrong: jqPageWrong }"
              >{{
                jqPage
              }}</span>
            </div>
            <div class="row">
              {{ t('frameworks.jqueryState.checkout') }}
              <button class="checkout">
                {{ t('frameworks.jqueryState.checkoutAction') }} ({{ jqButtonLabel }})
              </button>
            </div>
          </div>
        </div>

        <div class="controls">
          <div class="control-title">
            {{ t('frameworks.jqueryState.commandTitle') }}
          </div>
          <div class="btns">
            <button @click="jqIncreaseData">
              {{ t('frameworks.jqueryState.increaseData') }}
            </button>
            <button @click="jqUpdateBadge">
              {{ t('frameworks.jqueryState.updateBadge') }}
            </button>
            <button @click="jqUpdateCartPage">
              {{ t('frameworks.jqueryState.updateCartPage') }}
            </button>
            <button @click="jqUpdateCheckoutButton">
              {{ t('frameworks.jqueryState.updateCheckout') }}
            </button>
          </div>

          <div
            class="hint"
            :class="{ danger: jqInconsistent }"
          >
            {{ jqHint }}
          </div>

          <div class="log">
            <div class="log-title">
              {{ t('frameworks.jqueryState.logTitle') }}
            </div>
            <div
              v-if="jqLogs.length === 0"
              class="log-empty"
            >
              {{ t('frameworks.jqueryState.emptyLog') }}
            </div>
            <div
              v-else
              class="log-list"
            >
              <div
                v-for="(l, idx) in jqLogs"
                :key="idx"
                class="log-item"
              >
                {{ l }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- State-driven -->
      <div class="pane">
        <div class="pane-title">
          {{ t('frameworks.jqueryState.stateTitle') }}
        </div>
        <div class="mock-app">
          <div class="topbar">
            <span>{{ t('frameworks.jqueryState.badge') }}</span>
            <span class="badge">{{ state }}</span>
          </div>
          <div class="content">
            <div class="row">
              {{ t('frameworks.jqueryState.cartPage') }} <span class="num">{{ state }}</span>
            </div>
            <div class="row">
              {{ t('frameworks.jqueryState.checkout') }}
              <button class="checkout">
                {{ t('frameworks.jqueryState.checkoutAction') }} ({{ state }} {{ t('frameworks.jqueryState.unit') }})
              </button>
            </div>
          </div>
        </div>

        <div class="controls">
          <div class="control-title">
            {{ t('frameworks.jqueryState.oneThing') }}
          </div>
          <div class="btns">
            <button
              class="primary"
              @click="state = state + 1"
            >
              state +1
            </button>
            <button
              class="secondary"
              @click="resetAll"
            >
              {{ t('frameworks.jqueryState.reset') }}
            </button>
          </div>
          <div class="hint ok">
            {{ t('frameworks.jqueryState.okHint') }}
          </div>

          <div class="mini">
            <div class="mini-title">
              {{ t('frameworks.jqueryState.termsTitle') }}
            </div>
            <div class="mini-item">
              <strong>DOM</strong>: {{ t('frameworks.jqueryState.domTerm') }}
            </div>
            <div class="mini-item">
              <strong>State</strong>: {{ t('frameworks.jqueryState.stateTerm') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { webBasicsLocale } from '../../../locales/web-basics/index.js'

const { t } = useI18n(webBasicsLocale)

const state = ref(1)

// jQuery side: "real data" + "DOM" values displayed at multiple places
const jqData = ref(1)
const jqBadge = ref(1)
const jqPage = ref(1)
const jqButtonLabel = ref(`1 ${t('frameworks.jqueryState.unit')}`)
const jqLogs = ref([])

const log = (txt) => {
  jqLogs.value.unshift(
    `${new Date().toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })} - ${txt}`
  )
  jqLogs.value = jqLogs.value.slice(0, 8)
}

const jqIncreaseData = () => {
  jqData.value += 1
  log(t('frameworks.jqueryState.logs.increase', { value: jqData.value }))
}
const jqUpdateBadge = () => {
  jqBadge.value = jqData.value
  log(t('frameworks.jqueryState.logs.badge', { value: jqBadge.value }))
}
const jqUpdateCartPage = () => {
  jqPage.value = jqData.value
  log(t('frameworks.jqueryState.logs.cart', { value: jqPage.value }))
}
const jqUpdateCheckoutButton = () => {
  jqButtonLabel.value = `${jqData.value} ${t('frameworks.jqueryState.unit')}`
  log(t('frameworks.jqueryState.logs.checkout', { value: jqButtonLabel.value }))
}

const jqInconsistent = computed(() => {
  return (
    jqBadge.value !== jqData.value ||
    jqPage.value !== jqData.value ||
    jqButtonLabel.value !== `${jqData.value} ${t('frameworks.jqueryState.unit')}`
  )
})

const jqBadgeWrong = computed(() => jqBadge.value !== jqData.value)
const jqPageWrong = computed(() => jqPage.value !== jqData.value)

const jqHint = computed(() => {
  if (!jqInconsistent.value) return t('frameworks.jqueryState.consistent')
  return t('frameworks.jqueryState.inconsistent')
})

const resetAll = () => {
  state.value = 1
  jqData.value = 1
  jqBadge.value = 1
  jqPage.value = 1
  jqButtonLabel.value = `1 ${t('frameworks.jqueryState.unit')}`
  jqLogs.value = []
}
</script>

<style scoped>
.jq-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1rem;
}

.title {
  font-weight: 700;
  font-size: 1.05rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.panes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.pane {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 0.75rem;
}

.pane-title {
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.mock-app {
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
}

.topbar {
  padding: 0.6rem 0.75rem;
  background: var(--vp-c-bg-soft);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2ch;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.15);
  color: #1d4ed8;
  font-weight: 700;
}

.content {
  padding: 0.75rem;
}

.row {
  margin-bottom: 0.6rem;
  font-size: 0.92rem;
}

.num {
  font-weight: 800;
  padding: 0.05rem 0.25rem;
  border-radius: 6px;
  background: rgba(34, 197, 94, 0.12);
  color: #15803d;
}

.checkout {
  border: none;
  background: var(--vp-c-brand);
  color: #fff;
  padding: 0.4rem 0.8rem;
  border-radius: 10px;
  font-size: 0.85rem;
}

.controls {
  margin-top: 0.9rem;
}

.control-title {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.btns {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.btns button {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  padding: 0.35rem 0.65rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.85rem;
}

.btns button.primary {
  border: none;
  background: #22c55e;
  color: #fff;
}

.btns button.secondary {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.hint {
  margin-top: 0.65rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  border: 1px dashed var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  padding: 0.6rem 0.7rem;
  border-radius: 10px;
}

.hint.danger {
  color: #b91c1c;
  border-color: rgba(239, 68, 68, 0.4);
  background: rgba(239, 68, 68, 0.08);
}

.hint.ok {
  color: #166534;
  border-color: rgba(34, 197, 94, 0.35);
  background: rgba(34, 197, 94, 0.08);
}

.wrong {
  background: rgba(239, 68, 68, 0.12) !important;
  color: #b91c1c !important;
}

.log {
  margin-top: 0.75rem;
}

.log-title {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.log-empty {
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
}

.log-list {
  display: grid;
  gap: 0.25rem;
}

.log-item {
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.35rem 0.5rem;
}

.mini {
  margin-top: 0.75rem;
  border-top: 1px dashed var(--vp-c-divider);
  padding-top: 0.75rem;
}

.mini-title {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.4rem;
}

.mini-item {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}
</style>
