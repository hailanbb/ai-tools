<template>
  <div class="event-bus-demo">
    <div class="demo-header">
      <span class="icon">📡</span>
      <span class="title">{{ t('eventBus.title') }}</span>
      <span class="subtitle">{{ t('eventBus.subtitle') }}</span>
    </div>

    <div class="intro-text">
      {{ t('eventBus.introPrefix') }}<span class="highlight">{{ t('eventBus.introHighlight') }}</span>{{ t('eventBus.introSuffix') }}
    </div>

    <div class="demo-content">
      <div class="bus-center">
        <div class="bus-icon">
          📻
        </div>
        <div class="bus-label">
          {{ t('eventBus.busLabel') }}
        </div>
      </div>

      <div class="components-grid">
        <div
          v-for="comp in components"
          :key="comp.id"
          class="component-node"
          :class="{ active: comp.isActive }"
          @click="sendEvent(comp)"
        >
          <div class="comp-icon">
            {{ comp.icon }}
          </div>
          <div class="comp-name">
            {{ comp.name }}
          </div>
          <div
            class="comp-status"
            :class="{ listening: comp.isListening }"
          >
            {{ comp.isListening ? t('eventBus.listening') : t('eventBus.offline') }}
          </div>
        </div>
      </div>

      <Transition name="fade">
        <div
          v-if="logs.length > 0"
          class="event-log"
        >
          <div class="log-title">
            {{ t('eventBus.logTitle') }}
          </div>
          <div class="log-list">
            <div
              v-for="(log, index) in logs.slice(0, 5)"
              :key="index"
              class="log-item"
              :class="log.type"
            >
              <span class="log-type">{{ log.type === 'emit' ? t('eventBus.emitType') : t('eventBus.receiveType') }}</span>
              <span class="log-text">{{ log.text }}</span>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <div class="hint-text">
      {{ t('eventBus.hint') }}
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.coreIdea') }}</strong>{{ t('eventBus.idea') }}
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { componentStateManagementLocale } from '../../../locales/component-state-management/index.js'

const { t, messages, locale } = useI18n(componentStateManagementLocale)

const buildComponents = () => messages.value.eventBus.components.map(component => ({
  ...component,
  isActive: false,
  isListening: true
}))

const components = reactive(buildComponents())

const logs = ref([])

watch(locale, () => {
  components.splice(0, components.length, ...buildComponents())
  logs.value = []
})

const sendEvent = (comp) => {
  comp.isActive = true
  logs.value.unshift({
    type: 'emit',
    text: t('eventBus.emitMessage', { name: comp.name })
  })

  components.forEach(target => {
    if (target.id !== comp.id && target.isListening) {
      setTimeout(() => {
        target.isActive = true
        logs.value.unshift({
          type: 'receive',
          text: t('eventBus.receiveMessage', { name: target.name })
        })
        setTimeout(() => {
          target.isActive = false
        }, 500)
      }, 100)
    }
  })

  setTimeout(() => {
    comp.isActive = false
  }, 500)
}
</script>

<style scoped>
.event-bus-demo {
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
  gap: 1rem;
  margin-bottom: 1rem;
}

.bus-center {
  align-self: center;
  text-align: center;
  padding: 1rem 2rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-brand);
  border-radius: 50%;
}

.bus-icon {
  font-size: 2rem;
}

.bus-label {
  font-weight: 600;
  color: var(--vp-c-brand);
  font-size: 0.9rem;
}

.components-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.component-node {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.component-node:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.component-node.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  box-shadow: 0 0 0 3px var(--vp-c-brand-delta);
}

.comp-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.comp-name {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.comp-status {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.comp-status.listening {
  color: var(--vp-c-brand);
  font-weight: 500;
}

.event-log {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.log-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.log-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.log-item {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-family: monospace;
}

.log-item.emit {
  background: var(--vp-c-brand-soft);
  border-left: 3px solid var(--vp-c-brand);
}

.log-item.receive {
  background: var(--vp-c-bg-soft);
  border-left: 3px solid var(--vp-c-text-2);
}

.log-type {
  font-weight: 600;
  flex-shrink: 0;
}

.hint-text {
  text-align: center;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.75rem;
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
