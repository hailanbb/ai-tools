<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="icon">🧪</span>
      <span class="title">{{ t('apiPlayground.title') }}</span>
      <span class="subtitle">{{ t('apiPlayground.subtitle') }}</span>
    </div>

    <div class="demo-layout">
      <div class="left-panel">
        <div class="input-row">
          <label>Endpoint</label>
          <input
            v-model="endpoint"
            type="text"
            placeholder="/users"
            class="input"
          />
        </div>
        <div class="input-row">
          <label>{{ t('apiPlayground.method') }}</label>
          <div class="method-btns">
            <button
              v-for="m in methods"
              :key="m"
              :class="['m-btn', { active: method === m }]"
              @click="method = m"
            >
              {{ m }}
            </button>
          </div>
        </div>
        <div class="input-row">
          <label>API Key</label>
          <input
            v-model="apiKey"
            type="password"
            placeholder="sk-..."
            class="input"
          />
        </div>
        <button class="send-btn" :disabled="loading" @click="sendRequest">
          {{ loading ? t('apiPlayground.sending') : t('apiPlayground.send') }}
        </button>
      </div>

      <div class="right-panel">
        <div v-if="!response" class="empty">{{ t('apiPlayground.empty') }}</div>
        <div v-else class="response">
          <div class="status-bar" :class="getStatusClass(response.status)">
            <span class="code">{{ response.status }}</span>
            <span class="text">{{ response.statusText }}</span>
          </div>
          <div class="body">
            <pre>{{ JSON.stringify(response.data, null, 2) }}</pre>
          </div>
          <div v-if="response.explanation" class="explanation">
            💡 {{ response.explanation }}
          </div>
        </div>
      </div>
    </div>

    <div class="quick-actions">
      <span class="label">{{ t('apiPlayground.quickActions') }}</span>
      <button @click="tryEndpoint('/users')">✅ GET /users</button>
      <button @click="tryError401">❌ 401</button>
      <button @click="tryError404">❌ 404</button>
      <button @click="tryError429">❌ 429</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { apiIntroLocale } from '../../../locales/api-intro/index.js'

const { t, messages } = useI18n(apiIntroLocale)

const endpoint = ref('/users')
const method = ref('GET')
const apiKey = ref('sk-demo-key')
const loading = ref(false)
const response = ref(null)

const methods = ['GET', 'POST', 'PUT', 'DELETE']

function getStatusClass(status) {
  if (status >= 200 && status < 300) return 'success'
  if (status >= 400 && status < 500) return 'client-error'
  return 'server-error'
}

function sendRequest() {
  loading.value = true
  response.value = null

  setTimeout(() => {
    if (!apiKey.value) {
      response.value = {
        status: 401,
        statusText: 'Unauthorized',
        data: { error: messages.value.apiPlayground.errors.missingApiKey },
        explanation: messages.value.apiPlayground.explanations.unauthorized
      }
    } else if (endpoint.value === '/users') {
      response.value = {
        status: 200,
        statusText: 'OK',
        data: {
          users: messages.value.apiPlayground.users,
          total: 2
        },
        explanation: messages.value.apiPlayground.explanations.success
      }
    } else {
      response.value = {
        status: 404,
        statusText: 'Not Found',
        data: { error: messages.value.apiPlayground.errors.notFound },
        explanation: messages.value.apiPlayground.explanations.notFound
      }
    }
    loading.value = false
  }, 300)
}

function tryEndpoint(ep) {
  endpoint.value = ep
  method.value = 'GET'
  sendRequest()
}

function tryError401() {
  apiKey.value = ''
  sendRequest()
}

function tryError404() {
  endpoint.value = '/not-exist'
  sendRequest()
}

function tryError429() {
  loading.value = true
  response.value = null
  setTimeout(() => {
    response.value = {
      status: 429,
      statusText: 'Too Many Requests',
      data: { error: messages.value.apiPlayground.errors.tooManyRequests },
      explanation: messages.value.apiPlayground.explanations.rateLimited
    }
    loading.value = false
  }, 300)
}
</script>

<style scoped>
.demo-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  margin: 1rem 0;
  font-size: 0.85rem;
}

.demo-header {
  padding: 10px 16px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  font-size: 18px;
}
.title {
  font-weight: 600;
  font-size: 0.9rem;
}
.subtitle {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-left: auto;
}

.demo-layout {
  display: flex;
}

.left-panel {
  width: 240px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-right: 1px solid var(--vp-c-divider);
}

.right-panel {
  flex: 1;
  padding: 12px;
  background: var(--vp-c-bg);
  min-height: 180px;
}

@media (max-width: 640px) {
  .demo-layout {
    flex-direction: column;
  }
  .left-panel {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
  }
}

.input-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.input-row label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.input {
  padding: 8px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.85rem;
  background: var(--vp-c-bg);
}

.method-btns {
  display: flex;
  gap: 4px;
}

.m-btn {
  flex: 1;
  padding: 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: transparent;
  font-size: 0.75rem;
  cursor: pointer;
}

.m-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.send-btn {
  padding: 10px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.send-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.empty {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-3);
  font-style: italic;
}

.response {
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
}

.status-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.status-bar.success {
  background: #dcfce7;
}
.status-bar.success .code {
  color: #166534;
}
.status-bar.client-error {
  background: #fee2e2;
}
.status-bar.client-error .code {
  color: #991b1b;
}
.status-bar.server-error {
  background: #fef3c7;
}
.status-bar.server-error .code {
  color: #92400e;
}

.code {
  font-weight: bold;
}
.text {
  color: var(--vp-c-text-2);
}

.body {
  flex: 1;
  background: #1e293b;
  border-radius: 6px;
  padding: 8px;
  overflow: auto;
}

.body pre {
  margin: 0;
  font-family: monospace;
  font-size: 0.7rem;
  color: #e2e8f0;
  white-space: pre-wrap;
}

.explanation {
  padding: 8px;
  background: #fef3c7;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #92400e;
}

.quick-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  flex-wrap: wrap;
}

.quick-actions .label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.quick-actions button {
  padding: 4px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  font-size: 0.75rem;
  cursor: pointer;
}

.quick-actions button:hover {
  background: var(--vp-c-bg-soft);
}
</style>
