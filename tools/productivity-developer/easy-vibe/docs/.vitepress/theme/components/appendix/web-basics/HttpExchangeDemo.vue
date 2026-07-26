<template>
  <div class="http-exchange-demo custom-demo-base">
    <div class="demo-label">{{ t('network.httpExchange.label') }}</div>
    <div class="demo-panel">

      <div class="exchange-container">
        <!-- Request Side -->
        <div class="card request-card" :class="{ active: state !== 'idle' }">
          <div class="card-header">{{ t('network.httpExchange.requestHeader') }}</div>
          <div class="card-body">
            <div class="line"><span class="hl-blue">GET</span> /search <span class="hl-gray">HTTP/1.1</span></div>
            <div class="line"><span class="hl-gray">Host:</span> www.google.com</div>
            <div class="line"><span class="hl-gray">User-Agent:</span> {{ t('network.httpExchange.userAgent') }}</div>
            <div class="line"><span class="hl-gray">Accept-Language:</span> {{ t('network.httpExchange.acceptLanguage') }}</div>
          </div>
        </div>

        <!-- Action Center -->
        <div class="action-center">
          <button v-if="state === 'idle'" class="action-btn" @click="sendRequest">{{ t('network.httpExchange.send') }}</button>
          <div v-if="state === 'loading'" class="loading-state">
             <div class="spinner"></div>
             <div>{{ t('network.httpExchange.loading') }}</div>
          </div>
          <button v-if="state === 'done'" class="action-btn outline" @click="reset">{{ t('network.httpExchange.retry') }}</button>
        </div>

        <!-- Response Side -->
        <div class="card response-card" :class="{ active: state === 'done' }">
          <div class="card-header">{{ t('network.httpExchange.responseHeader') }}</div>
          <div v-if="state === 'done'" class="card-body">
            <div class="line"><span class="hl-gray">HTTP/1.1</span> <span class="hl-green">200 OK</span> ({{ t('network.httpExchange.okNote') }})</div>
            <div class="line"><span class="hl-gray">Content-Type:</span> text/html; charset=UTF-8</div>
            <div class="divider">{{ t('network.httpExchange.divider') }}</div>
            <div class="code-block">{{ t('network.httpExchange.bodyCode') }}</div>
          </div>
          <div v-else class="card-body empty">
            {{ t('network.httpExchange.empty') }}
          </div>
        </div>
      </div>

    </div>
    <div class="demo-status">
      {{ statusText }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { webBasicsLocale } from '../../../locales/web-basics/index.js'

const { t, messages } = useI18n(webBasicsLocale)

const state = ref('idle') // idle, loading, done

const statusText = computed(() => messages.value.network.httpExchange.status[state.value])

const sendRequest = () => {
  state.value = 'loading'
  setTimeout(() => {
    state.value = 'done'
  }, 1500)
}

const reset = () => {
  state.value = 'idle'
}
</script>

<style scoped>
.custom-demo-base {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  letter-spacing: 0.2px;
}

.demo-panel {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.demo-status {
  margin-top: 0.75rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  text-align: center;
  font-weight: bold;
}

.exchange-container {
  display: flex;
  gap: 1.5rem;
  align-items: stretch;
  justify-content: space-between;
}

.card {
  flex: 1;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-alt);
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  overflow: hidden;
}

.card.request-card.active { border-color: var(--vp-c-brand-1, #3b82f6); box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15); }
.card.response-card.active { border-color: var(--vp-c-success-1, #10b981); box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15); }

.card-header {
  padding: 0.8rem;
  font-weight: bold;
  font-size: 0.9rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.card-body {
  padding: 1rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  line-height: 1.6;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-body.empty {
  color: var(--vp-c-text-3);
  font-style: italic;
  justify-content: center;
  align-items: center;
}

.line { margin-bottom: 0.3rem; word-break: break-all; }
.hl-blue { color: var(--vp-c-brand-1, #3b82f6); font-weight: bold; }
.hl-gray { color: var(--vp-c-text-2); }
.hl-green { color: var(--vp-c-success-1, #10b981); font-weight: bold; }

.divider {
  border-top: 1px dashed var(--vp-c-divider);
  margin: 1rem 0;
  padding-top: 0.5rem;
  color: var(--vp-c-text-3);
  font-size: 0.75rem;
  text-align: center;
}

.code-block {
  background: var(--vp-code-bg);
  padding: 0.8rem;
  border-radius: 4px;
  color: var(--vp-code-color);
  font-size: 0.75rem;
  white-space: pre;
  overflow-x: auto;
}

.action-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 120px;
}

.action-btn {
  background: var(--vp-c-brand-1, #3b82f6);
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
  white-space: nowrap;
}

.action-btn:hover { background: var(--vp-c-brand-2, #2563eb); }
.action-btn.outline { background: transparent; color: var(--vp-c-text-1); border: 1px solid var(--vp-c-divider); }
.action-btn.outline:hover { background: var(--vp-c-bg-alt); }

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  text-align: center;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand-1, #3b82f6);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 800px) {
  .exchange-container { flex-direction: column; }
  .action-center { width: 100%; height: 60px; }
}
</style>
