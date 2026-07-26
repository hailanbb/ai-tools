<template>
  <div class="props-flow-demo">
    <div class="demo-header">
      <span class="icon">📦</span>
      <span class="title">{{ t('propsFlow.title') }}</span>
      <span class="subtitle">{{ t('propsFlow.subtitle') }}</span>
    </div>

    <div class="intro-text">
      {{ t('propsFlow.introPrefix') }}<span class="highlight">{{ t('propsFlow.introHighlight') }}</span>{{ t('propsFlow.introSuffix') }}
    </div>

    <div class="demo-content">
      <div class="component-box parent">
        <div class="component-label">
          {{ t('propsFlow.parentLabel') }}
        </div>
        <div class="data-display">
          <div class="data-row">
            <span class="key">{{ t('propsFlow.packageContent') }}</span>
            <span class="value">{{ user.name }} ({{ user.age }} {{ t('propsFlow.ageUnit') }})</span>
          </div>
          <div class="data-row">
            <span class="key">{{ t('propsFlow.packageColor') }}</span>
            <span
              class="value"
              :class="theme"
            >{{ themeLabel }}</span>
          </div>
        </div>
        <div class="props-output">
          <span class="label">{{ t('propsFlow.sendPackage') }}</span>
          <div class="prop-tags">
            <span class="prop-tag">:user</span>
            <span class="prop-tag">:theme</span>
          </div>
        </div>
      </div>

      <div
        class="flow-arrow"
        :class="{ active: isFlowing }"
      >
        <div class="arrow-body">
          ▼
        </div>
        <div class="flow-text">
          {{ isFlowing ? t('propsFlow.flowing') : t('propsFlow.idleFlow') }}
        </div>
      </div>

      <div class="component-box child">
        <div class="component-label">
          {{ t('propsFlow.childLabel') }}
        </div>
        <div class="props-display">
          <div class="label">
            {{ t('propsFlow.receivePackage') }}
          </div>
          <div class="prop-item">
            <span class="prop-name">user</span>
            <span class="prop-value">{{ user.name }} ({{ user.age }} {{ t('propsFlow.ageUnit') }})</span>
          </div>
          <div class="prop-item">
            <span class="prop-name">theme</span>
            <span
              class="prop-value"
              :class="theme"
            >{{ themeLabel }}</span>
          </div>
        </div>
        <button
          class="emit-btn"
          @click="handleEmit"
        >
          {{ t('propsFlow.emitButton') }}
        </button>
      </div>
    </div>

    <div class="interaction-area">
      <div class="control-group">
        <label>{{ t('propsFlow.editLabel') }}</label>
        <input
          v-model="user.name"
          :placeholder="t('propsFlow.namePlaceholder')"
          @input="triggerFlow"
        >
        <input
          v-model.number="user.age"
          type="number"
          :placeholder="t('propsFlow.agePlaceholder')"
          @input="triggerFlow"
        >
        <select
          v-model="theme"
          @change="triggerFlow"
        >
          <option value="light">
            {{ t('propsFlow.lightPackage') }}
          </option>
          <option value="dark">
            {{ t('propsFlow.darkPackage') }}
          </option>
        </select>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.coreIdea') }}</strong>{{ t('propsFlow.idea') }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { componentStateManagementLocale } from '../../../locales/component-state-management/index.js'

const { t, messages, locale } = useI18n(componentStateManagementLocale)

const user = reactive({
  name: messages.value.propsFlow.defaultUser.name,
  age: messages.value.propsFlow.defaultUser.age
})

const theme = ref('light')
const isFlowing = ref(false)
const themeLabel = computed(() => theme.value === 'light' ? t('propsFlow.light') : t('propsFlow.dark'))

watch(locale, () => {
  user.name = messages.value.propsFlow.defaultUser.name
  user.age = messages.value.propsFlow.defaultUser.age
})

let flowTimeout = null

const triggerFlow = () => {
  isFlowing.value = true
  clearTimeout(flowTimeout)
  flowTimeout = setTimeout(() => {
    isFlowing.value = false
  }, 1000)
}

const handleEmit = () => {
  user.name = t('propsFlow.emittedName')
  triggerFlow()
}
</script>

<style scoped>
.props-flow-demo {
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

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

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
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.component-box {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.component-label {
  font-weight: 600;
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
}

.data-display,
.props-display {
  margin-bottom: 0.5rem;
}

.data-row,
.prop-item {
  display: flex;
  gap: 0.5rem;
  padding: 0.2rem 0;
  font-family: monospace;
  font-size: 0.85rem;
}

.key,
.prop-name {
  color: var(--vp-c-brand);
  font-weight: 500;
}

.value,
.prop-value {
  color: var(--vp-c-text-2);
}

.value.light,
.prop-value.light {
  background: #fef3c7;
  padding: 2px 6px;
  border-radius: 3px;
}

.value.dark,
.prop-value.dark {
  background: #374151;
  color: #f3f4f6;
  padding: 2px 6px;
  border-radius: 3px;
}

.props-output {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.prop-tags {
  display: flex;
  gap: 0.25rem;
}

.prop-tag {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.8rem;
}

.flow-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.4rem;
  transition: all 0.3s ease;
}

.flow-arrow.active {
  color: var(--vp-c-brand);
}

.arrow-body {
  font-size: 1.3rem;
  color: var(--vp-c-text-3);
  transition: all 0.3s ease;
}

.flow-arrow.active .arrow-body {
  color: var(--vp-c-brand);
  transform: scale(1.2);
}

.flow-text {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.flow-arrow.active .flow-text {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.emit-btn {
  width: 100%;
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.emit-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.interaction-area {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-group label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.control-group input,
.control-group select {
  padding: 0.4rem 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
}

.control-group input:focus,
.control-group select:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.25rem;
}
</style>
