<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { javascriptIntroLocale } from '../../../locales/javascript-intro/index.js'

const { t, messages } = useI18n(javascriptIntroLocale)
const activeScope = ref('global')

const scopes = computed(() => messages.value.scope.scopes)
const activeScopeData = computed(
  () => scopes.value.find((scope) => scope.id === activeScope.value) || scopes.value[0]
)
</script>

<template>
  <div class="scope-demo">
    <h3>{{ t('scope.title') }}</h3>

    <div class="scope-selector">
      <button
        v-for="scope in scopes"
        :key="scope.id"
        class="scope-btn"
        :class="{ active: activeScope === scope.id }"
        :style="{ borderColor: scope.color }"
        @click="activeScope = scope.id"
      >
        {{ scope.name }}
      </button>
    </div>

    <div class="scope-visual">
      <div class="scope-levels">
        <div
          v-for="scope in scopes"
          :key="scope.id"
          class="level"
          :class="{
            active: activeScope === scope.id,
            dimmed: activeScope !== scope.id
          }"
          :style="{ borderLeftColor: scope.color }"
        >
          <div class="level-header" :style="{ color: scope.color }">
            {{ scope.name }}
          </div>
          <div class="level-vars">
            <div
              v-for="v in scope.vars"
              :key="v.name"
              class="var-tag"
              :class="{ own: v.own, inherited: !v.own }"
            >
              <span class="var-name">{{ v.name }}</span>
              <span class="var-value">= {{ v.value }}</span>
              <span v-if="!v.own" class="var-from">← {{ v.from }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="explanation-box">
        <div class="explanation-title">{{ t('scope.visibleVariables') }}</div>
        <div class="explanation-text">
          {{ activeScopeData.explanation }}
        </div>
      </div>
    </div>

    <div class="code-display">
      <h4>{{ t('scope.codeTitle') }}</h4>
      <pre><code>{{ t('scope.code') }}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.scope-demo {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 24px;
  margin: 24px 0;
  background: var(--vp-c-bg);
}

h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.scope-selector {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.scope-btn {
  padding: 10px 16px;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.scope-btn:hover {
  background: var(--vp-c-bg-soft);
}

.scope-btn.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.scope-visual {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .scope-visual {
    grid-template-columns: 1fr;
  }
}

.scope-levels {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.level {
  border-left: 4px solid;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 0 8px 8px 0;
  transition: all 0.3s ease;
}

.level.active {
  background: var(--vp-c-bg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.level.dimmed {
  opacity: 0.6;
}

.level-header {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
}

.level-vars {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.var-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  font-family: 'Courier New', monospace;
}

.var-tag.own {
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand);
}

.var-tag.inherited {
  background: var(--vp-c-bg-alt);
  border: 1px dashed var(--vp-c-border);
}

.var-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.var-value {
  color: var(--vp-c-text-2);
}

.var-from {
  font-size: 11px;
  color: var(--vp-c-text-3);
  font-style: italic;
}

.explanation-box {
  background: var(--vp-c-brand-soft);
  border-radius: 8px;
  padding: 16px;
}

.explanation-title {
  font-weight: 600;
  color: var(--vp-c-brand);
  margin-bottom: 8px;
  font-size: 14px;
}

.explanation-text {
  color: var(--vp-c-text-1);
  font-size: 14px;
  line-height: 1.6;
}

.code-display {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
}

.code-display h4 {
  color: #d4d4d4;
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
}

.code-display pre {
  margin: 0;
}

.code-display code {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #d4d4d4;
}
</style>
