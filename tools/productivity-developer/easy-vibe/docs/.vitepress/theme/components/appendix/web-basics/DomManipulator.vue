<template>
  <div class="dom-demo">
    <div class="demo-header">
      <span class="title">{{ t('layout.domManipulator.title') }}</span>
      <span class="subtitle">{{ t('layout.domManipulator.subtitle') }}</span>
    </div>

    <div class="main-area">
      <div class="left-panel">
        <div class="operations">
          <div class="op-group">
            <div class="op-label">
              {{ t('layout.domManipulator.editContent') }}
            </div>
            <div class="op-row">
              <input
                v-model="titleText"
                :placeholder="t('layout.domManipulator.placeholder')"
                class="input"
              >
              <button
                class="btn"
                @click="updateTitle"
              >
                {{ t('layout.domManipulator.updateTitle') }}
              </button>
            </div>
          </div>

          <div class="op-group">
            <div class="op-label">
              {{ t('layout.domManipulator.editStyle') }}
            </div>
            <div class="op-row">
              <button 
                v-for="s in styles" 
                :key="s.id"
                :class="['btn-sm', { active: currentStyle === s.id }]"
                @click="currentStyle = s.id"
              >
                {{ s.label }}
              </button>
            </div>
          </div>

          <div class="op-group">
            <div class="op-label">
              {{ t('layout.domManipulator.editElements') }}
            </div>
            <div class="op-row">
              <button
                class="btn"
                @click="addItem"
              >
                {{ t('layout.domManipulator.addItem') }}
              </button>
              <button
                class="btn btn-danger"
                @click="removeLastItem"
              >
                {{ t('layout.domManipulator.removeLast') }}
              </button>
            </div>
          </div>
        </div>

        <div
          class="preview-card"
          :class="currentStyle"
        >
          <h2 class="card-title">
            {{ titleText || t('layout.domManipulator.fallbackTitle') }}
          </h2>
          <p class="card-desc">
            {{ t('layout.domManipulator.cardDesc') }}
          </p>
          <ul class="card-list">
            <li
              v-for="(item, i) in items"
              :key="i"
            >
              {{ item }}
            </li>
            <li
              v-if="items.length === 0"
              class="empty"
            >
              {{ t('layout.domManipulator.empty') }}
            </li>
          </ul>
        </div>
      </div>

      <div class="right-panel">
        <div class="code-block">
          <div class="code-title">
            {{ t('layout.domManipulator.codeTitle') }}
          </div>
          <div class="code-content">
            <template v-if="lastOp === 'title'">
              <div class="line comment">
                {{ t('layout.domManipulator.comments.title') }}
              </div>
              <div class="line">
                const el = document.querySelector('.card-title')
              </div>
              <div class="line">
                el.textContent = '{{ titleText }}'
              </div>
            </template>
            <template v-else-if="lastOp === 'style'">
              <div class="line comment">
                {{ t('layout.domManipulator.comments.style') }}
              </div>
              <div class="line">
                const card = document.querySelector('.preview-card')
              </div>
              <div class="line">
                card.className = 'preview-card {{ currentStyle }}'
              </div>
            </template>
            <template v-else-if="lastOp === 'add'">
              <div class="line comment">
                {{ t('layout.domManipulator.comments.add') }}
              </div>
              <div class="line">
                const list = document.querySelector('.card-list')
              </div>
              <div class="line">
                const li = document.createElement('li')
              </div>
              <div class="line">
                li.textContent = '{{ t('layout.domManipulator.newItem', { n: items.length }) }}'
              </div>
              <div class="line">
                list.appendChild(li)
              </div>
            </template>
            <template v-else-if="lastOp === 'remove'">
              <div class="line comment">
                {{ t('layout.domManipulator.comments.remove') }}
              </div>
              <div class="line">
                const list = document.querySelector('.card-list')
              </div>
              <div class="line">
                const last = list.lastElementChild
              </div>
              <div class="line">
                if (last) last.remove()
              </div>
            </template>
            <template v-else>
              <div class="line comment">
                {{ t('layout.domManipulator.comments.idle') }}
              </div>
            </template>
          </div>
        </div>

        <div class="methods-card">
          <div class="methods-title">
            {{ t('layout.domManipulator.methodsTitle') }}
          </div>
          <div class="methods-list">
            <div
              v-for="method in methods"
              :key="method.code"
              class="method"
            >
              <code>{{ method.code }}</code>
              <span>{{ method.desc }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ t('layout.domManipulator.noticeTitle') }}</strong>{{ t('layout.domManipulator.notice') }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { webBasicsLocale } from '../../../locales/web-basics/index.js'

const { t, messages } = useI18n(webBasicsLocale)
const titleText = ref(t('layout.domManipulator.initialTitle'))
const currentStyle = ref('')
const items = ref([...messages.value.layout.domManipulator.initialItems])
const lastOp = ref('')

const styles = computed(() => messages.value.layout.domManipulator.styles)
const methods = computed(() => messages.value.layout.domManipulator.methods)

watch(messages, (nextMessages) => {
  titleText.value = nextMessages.layout.domManipulator.initialTitle
  items.value = [...nextMessages.layout.domManipulator.initialItems]
})

const updateTitle = () => {
  lastOp.value = 'title'
}

const addItem = () => {
  items.value.push(t('layout.domManipulator.newItem', { n: items.value.length + 1 }))
  lastOp.value = 'add'
}

const removeLastItem = () => {
  if (items.value.length > 0) {
    items.value.pop()
  }
  lastOp.value = 'remove'
}
</script>

<style scoped>
.dom-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.demo-header .title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

.main-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .main-area { grid-template-columns: 1fr; }
}

.left-panel {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.operations {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.op-group {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem 0.6rem;
}

.op-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  margin-bottom: 0.35rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.op-row {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  align-items: center;
}

.input {
  flex: 1;
  min-width: 120px;
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.8rem;
}

.input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.btn {
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--vp-c-brand);
  border-radius: 4px;
  background: var(--vp-c-brand);
  color: #fff;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s;
}

.btn:hover {
  opacity: 0.9;
}

.btn-danger {
  background: #ef4444;
  border-color: #ef4444;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 0.7rem;
  transition: all 0.2s;
}

.btn-sm:hover {
  background: var(--vp-c-bg);
}

.btn-sm.active {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.preview-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  transition: all 0.3s;
}

.preview-card.highlight {
  border-color: var(--vp-c-warning);
  background: var(--vp-c-warning-soft);
}

.preview-card.dark {
  background: #1a1a2e;
  border-color: #2d2d44;
}

.preview-card.dark .card-title,
.preview-card.dark .card-desc,
.preview-card.dark .card-list {
  color: #e5e7eb;
}

.card-title {
  margin: 0 0 0.35rem 0;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.card-desc {
  margin: 0 0 0.5rem 0;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.card-list {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
}

.card-list li {
  margin-bottom: 0.15rem;
}

.card-list .empty {
  color: var(--vp-c-text-3);
  font-style: italic;
}

.right-panel {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.code-block {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
}

.code-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.code-content {
  background: #1a1a2e;
  color: #e5e7eb;
  border-radius: 6px;
  padding: 0.75rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  line-height: 1.6;
  min-height: 100px;
}

.line {
  padding-left: 0.25rem;
}

.comment {
  color: #6b7280;
}

.methods-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
  flex: 1;
}

.methods-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.methods-list {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.method {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
}

.method code {
  background: var(--vp-c-bg-soft);
  padding: 0.15rem 0.35rem;
  border-radius: 3px;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-brand);
}

.method span {
  color: var(--vp-c-text-2);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box strong { color: var(--vp-c-text-1); }
</style>
