<template>
  <div class="arch">
    <div class="header">
      <div>
        <div class="title">
          {{ t('architecture.title') }}
        </div>
        <div class="subtitle">
          {{ t('architecture.subtitle') }}
        </div>
      </div>
    </div>

    <div class="grid">
      <div class="diagram">
        <button
          v-for="m in modules"
          :key="m.id"
          :class="['node', { active: current.id === m.id }]"
          @click="current = m"
        >
          <span class="icon">{{ m.icon }}</span>
          <span class="name">{{ m.name }}</span>
        </button>

        <div class="pipes">
          <div class="pipe">
            {{ t('architecture.pipe') }}
          </div>
          <div class="pipe small">
            {{ t('architecture.pipeSmall') }}
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">
          {{ current.icon }} {{ current.name }}
        </div>
        <div class="panel-body">
          {{ current.desc }}
        </div>

        <div class="io">
          <div class="io-title">
            {{ t('architecture.input') }}
          </div>
          <pre><code>{{ current.input }}</code></pre>
        </div>
        <div class="io">
          <div class="io-title">
            {{ t('architecture.output') }}
          </div>
          <pre><code>{{ current.output }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { agentIntroLocale } from '../../../locales/agent-intro/index.js'

const { t, messages } = useI18n(agentIntroLocale)
const modules = computed(() => messages.value.architecture.modules)

const current = ref(modules.value[0])

watch(modules, (next) => {
  current.value = next.find((item) => item.id === current.value?.id) || next[0]
})
</script>

<style scoped>
.arch {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 16px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.title {
  font-weight: 800;
}
.subtitle {
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
}

.diagram {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.node {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  text-align: left;
}

.node.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
}
.icon {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: grid;
  place-items: center;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}
.name {
  font-weight: 800;
}

.pipes {
  margin-top: 6px;
  padding-top: 10px;
  border-top: 1px dashed var(--vp-c-divider);
}
.pipe {
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.5;
}
.pipe.small {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.panel-title {
  font-weight: 800;
}
.panel-body {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.io-title {
  font-weight: 700;
  margin-bottom: 6px;
}
pre {
  margin: 0;
  background: #0b1221;
  color: #e5e7eb;
  border-radius: 10px;
  padding: 12px;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  overflow-x: auto;
  white-space: pre-wrap;
}
</style>
