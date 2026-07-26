<template>
  <div class="declarative-formula-demo">
    <div class="formula-row">
      <div class="formula-box state-box">
        <div class="formula-label">{{ t('declarativeFormula.stateLabel') }}</div>
      </div>
      <div class="formula-arrow">→ f →</div>
      <div class="formula-box ui-box">
        <div class="formula-label">{{ t('declarativeFormula.uiLabel') }}</div>
      </div>
    </div>

    <div class="demo-body">
      <div class="input-panel">
        <div class="panel-title">{{ t('declarativeFormula.inputTitle') }}</div>
        <div class="input-group">
          <label>{{ t('declarativeFormula.username') }}</label>
          <input
            v-model="username"
            type="text"
            :placeholder="t('declarativeFormula.namePlaceholder')"
          />
        </div>
        <div class="input-group">
          <label>{{ t('declarativeFormula.productCount') }}</label>
          <div class="stepper">
            <button @click="count = Math.max(0, count - 1)">-</button>
            <span class="stepper-value">{{ count }}</span>
            <button @click="count++">+</button>
          </div>
        </div>
        <div class="input-group">
          <label>{{ t('declarativeFormula.darkMode') }}</label>
          <label class="toggle-switch">
            <input v-model="darkMode" type="checkbox" />
            <span class="slider" />
          </label>
        </div>
      </div>

      <div class="output-panel" :class="{ dark: darkMode }">
        <div class="panel-title">{{ t('declarativeFormula.outputTitle') }}</div>
        <div class="preview-card">
          <div class="preview-greeting">
            {{ greetingText }}
          </div>
          <div class="preview-cart">
            {{ t('declarativeFormula.cartLine', { count }) }}
          </div>
          <div class="preview-total">
            {{ t('declarativeFormula.totalLine', { total: count * 99 }) }}
          </div>
          <div v-if="count > 5" class="preview-warning">
            {{ t('declarativeFormula.warning') }}
          </div>
          <div class="preview-theme">
            {{ t('declarativeFormula.themeLine', { theme: themeText }) }}
          </div>
        </div>
      </div>
    </div>

    <div class="state-snapshot">
      <div class="snapshot-title">{{ t('declarativeFormula.snapshotTitle') }}</div>
      <code class="snapshot-code">{{ stateSnapshot }}</code>
    </div>

    <div class="info-box">
      <strong>{{ t('declarativeFormula.infoStrong') }}</strong>
      <span>{{ t('declarativeFormula.info') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { frameworkNatureLocale } from '../../../locales/framework-nature/index.js'

const { t } = useI18n(frameworkNatureLocale)

const username = ref('')
const count = ref(2)
const darkMode = ref(false)

const greetingText = computed(() =>
  username.value
    ? t('declarativeFormula.greetingUser', { name: username.value })
    : t('declarativeFormula.greetingGuest')
)

const themeText = computed(() =>
  darkMode.value ? t('declarativeFormula.dark') : t('declarativeFormula.light')
)

const stateSnapshot = computed(() =>
  JSON.stringify(
    {
      username: username.value || t('declarativeFormula.empty'),
      count: count.value,
      darkMode: darkMode.value
    },
    null,
    2
  )
)
</script>

<style scoped>
.declarative-formula-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.formula-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
}

.formula-box {
  padding: 0.4rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
}

.state-box {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.ui-box {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid var(--vp-c-green-1);
  color: var(--vp-c-green-1);
}

.formula-arrow {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
}

.demo-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.input-panel,
.output-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.output-panel.dark {
  background: #1a1a2e;
  color: #e0e0e0;
  border-color: #333;
}

.output-panel.dark .preview-card {
  background: #16213e;
  border-color: #333;
}

.panel-title {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.6rem;
}

.output-panel.dark .panel-title {
  color: #aaa;
}

.input-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.input-group label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.input-group input[type="text"] {
  flex: 1;
  padding: 0.3rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-size: 0.82rem;
}

.input-group input[type="text"]:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.stepper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stepper button {
  width: 28px;
  height: 28px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-1);
}

.stepper button:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.stepper-value {
  font-weight: 700;
  font-size: 0.9rem;
  min-width: 1.5rem;
  text-align: center;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 18px;
  cursor: pointer;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  transition: 0.3s;
}

.slider::before {
  content: '';
  position: absolute;
  height: 14px;
  width: 14px;
  left: 1px;
  bottom: 1px;
  background: var(--vp-c-text-2);
  border-radius: 50%;
  transition: 0.3s;
}

input:checked + .slider {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
}

input:checked + .slider::before {
  transform: translateX(18px);
  background: white;
}

.preview-card {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.6rem;
  font-size: 0.82rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.preview-greeting {
  font-weight: 600;
  font-size: 0.9rem;
}

.preview-warning {
  color: var(--vp-c-danger-1);
  font-weight: 600;
  padding: 0.25rem 0.4rem;
  background: rgba(239, 68, 68, 0.08);
  border-radius: 4px;
}

.output-panel.dark .preview-warning {
  background: rgba(239, 68, 68, 0.15);
}

.preview-theme {
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
}

.state-snapshot {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.75rem;
}

.snapshot-title {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.3rem;
}

.snapshot-code {
  display: block;
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
  color: var(--vp-c-text-1);
  white-space: pre;
  background: none;
  padding: 0;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
  color: var(--vp-c-text-1);
}

@media (max-width: 720px) {
  .demo-body {
    grid-template-columns: 1fr;
  }
}
</style>
