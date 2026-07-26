<template>
  <div class="dynamic-routes-demo">
    <div class="demo-header">
      <span class="icon">🔗</span>
      <span class="title">{{ t('dynamicRoutes.title') }}</span>
      <span class="subtitle">{{ t('dynamicRoutes.subtitle') }}</span>
    </div>

    <div class="intro-text">
      {{ t('dynamicRoutes.intro.prefix') }}<span class="highlight">{{ t('dynamicRoutes.intro.highlight1') }}</span>{{ t('dynamicRoutes.intro.middle') }}<span class="highlight">{{ t('dynamicRoutes.intro.highlight2') }}</span>{{ t('dynamicRoutes.intro.suffix') }}
    </div>

    <div class="demo-content">
      <div class="param-types">
        <div
          v-for="type in paramTypes"
          :key="type.name"
          :class="['param-card', { active: selectedType === type.name }]"
          @click="selectType(type)"
        >
          <div class="param-pattern">
            {{ type.pattern }}
          </div>
          <div class="param-name">
            {{ type.label }}
          </div>
          <div class="param-example">
            {{ t('dynamicRoutes.exampleLabel') }} {{ type.example }}
          </div>
        </div>
      </div>

      <div class="parsing-demo">
        <div class="demo-section">
          <h5>{{ t('dynamicRoutes.testPathTitle') }}</h5>
          <div class="input-group">
            <span class="input-prefix">/</span>
            <input
              v-model="testPath"
              type="text"
              placeholder="user/123/profile"
              class="demo-input"
              @input="parsePath"
            >
          </div>
          <div class="hint-text">
            {{ t('dynamicRoutes.hint') }}
          </div>
        </div>

        <div class="demo-section">
          <h5>{{ t('dynamicRoutes.resultTitle') }}</h5>
          <div
            v-if="parseResult"
            class="result-box"
          >
            <div class="result-row">
              <span class="result-label">{{ t('dynamicRoutes.matchedRoute') }}</span>
              <code class="result-value">{{ parseResult.route }}</code>
            </div>
            <div
              v-if="Object.keys(parseResult.params).length"
              class="result-params"
            >
              <span class="result-label">{{ t('dynamicRoutes.extractedParams') }}</span>
              <div class="params-grid">
                <div
                  v-for="(value, key) in parseResult.params"
                  :key="key"
                  class="param-tag"
                >
                  <span class="param-key">{{ key }}</span>
                  <span class="param-eq">=</span>
                  <span class="param-val">{{ value }}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            v-else
            class="no-result"
          >
            <div class="no-match-icon">
              🔍
            </div>
            <div>{{ t('dynamicRoutes.noResult') }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.coreIdea') }}</strong>{{ t('dynamicRoutes.info') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { frontendRoutingLocale } from '../../../locales/frontend-routing/index.js'

const { t, messages } = useI18n(frontendRoutingLocale)
const selectedType = ref('required')
const testPath = ref('user/123/profile')

const paramTypes = computed(() => messages.value.dynamicRoutes.paramTypes)

const routePatterns = [
  { pattern: '/user/:id', name: 'UserDetail' },
  { pattern: '/user/:id/profile', name: 'UserProfile' },
  { pattern: '/user/:id/:tab', name: 'UserTab' },
  { pattern: '/products/:category/:id', name: 'ProductDetail' },
  { pattern: '/search/:keyword?', name: 'Search' },
  { pattern: '/files/:path*', name: 'FileBrowser' }
]

const selectType = (type) => {
  selectedType.value = type.name
  testPath.value = type.example.split(/\s+(?:or|\u6216)\s+/u)[0].replace('/', '')
}

const parsePath = () => {
  const path = testPath.value.trim()
  if (!path) return null

  for (const route of routePatterns) {
    const match = matchRoute(route.pattern, path)
    if (match) {
      return {
        route: route.pattern,
        params: match
      }
    }
  }

  return null
}

const matchRoute = (pattern, path) => {
  const regexPattern = pattern
    .replace(/:([^/]+)\*/g, '(.*)')
    .replace(/:([^/]+)\?/g, '([^/]*)')
    .replace(/:([^/]+)/g, '([^/]+)')

  const regex = new RegExp(`^${regexPattern}$`)
  const match = path.match(regex)

  if (!match) return null

  const paramNames = []
  const paramRegex = /:([^/]+)/g
  let paramMatch
  while ((paramMatch = paramRegex.exec(pattern)) !== null) {
    paramNames.push(paramMatch[1].replace(/[?*+]$/, ''))
  }

  const params = {}
  paramNames.forEach((name, index) => {
    params[name] = match[index + 1]
  })

  return params
}

const parseResult = computed(() => parsePath())

parsePath()
</script>

<style scoped>
.dynamic-routes-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  
  
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.param-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
}

.param-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.param-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.param-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.param-pattern {
  font-family: monospace;
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
}

.param-name {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.param-example {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-family: monospace;
}

.parsing-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.demo-section {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.demo-section h5 {
  margin: 0 0 0.75rem 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.input-group {
  display: flex;
  align-items: center;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.input-prefix {
  padding: 0.5rem 0.5rem 0.5rem 0.75rem;
  color: var(--vp-c-text-3);
  font-family: monospace;
  font-size: 0.85rem;
}

.demo-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 0.5rem 0.75rem 0.5rem 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  outline: none;
  font-family: monospace;
}

.hint-text {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-top: 0.5rem;
}

.result-box {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.result-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.result-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  min-width: 60px;
}

.result-value {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  font-family: monospace;
  background: var(--vp-c-bg-soft);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.result-params {
  padding-top: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
}

.params-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.param-tag {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: var(--vp-c-brand-soft);
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.param-key {
  color: var(--vp-c-brand);
  font-weight: 500;
}

.param-eq {
  color: var(--vp-c-text-3);
}

.param-val {
  color: var(--vp-c-text-1);
}

.no-result {
  text-align: center;
  padding: 2rem 1rem;
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
}

.no-match-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 1rem;
}

.info-box .icon { margin-right: 0.25rem; }

@media (max-width: 768px) {
  .param-types {
    grid-template-columns: repeat(2, 1fr);
  }

  .parsing-demo {
    grid-template-columns: 1fr;
  }
}
</style>
