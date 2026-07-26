<template>
  <div class="flex-demo">
    <div class="demo-header">
      <span class="title">{{ t('layout.flexbox.title') }}</span>
      <span class="subtitle">{{ t('layout.flexbox.subtitle') }}</span>
    </div>

    <div class="axis-concept">
      <div class="concept-row">
        <div class="concept-item">
          <div class="concept-visual main">
            <span class="arrow">→</span>
            <span class="label">{{ t('layout.flexbox.mainAxis') }}</span>
            <span class="arrow">→</span>
          </div>
          <div class="concept-desc">
            <strong>{{ t('layout.flexbox.mainAxisTitle') }}</strong>
            <span>{{ t('layout.flexbox.mainAxisDesc') }}</span>
          </div>
        </div>
        <div class="concept-item">
          <div class="concept-visual cross">
            <span class="arrow">↓</span>
            <span class="label">{{ t('layout.flexbox.crossAxis') }}</span>
            <span class="arrow">↓</span>
          </div>
          <div class="concept-desc">
            <strong>{{ t('layout.flexbox.crossAxisTitle') }}</strong>
            <span>{{ t('layout.flexbox.crossAxisDesc') }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="main-area">
      <div class="controls">
        <div class="control-group">
          <label>flex-direction</label>
          <div class="chips">
            <button
              v-for="d in directions"
              :key="d.id"
              :class="['chip', { active: dir === d.id }]"
              @click="dir = d.id"
            >
              {{ d.label }}
            </button>
          </div>
        </div>
        <div class="control-group">
          <label>{{ t('layout.flexbox.justifyLabel') }}</label>
          <div class="chips">
            <button
              v-for="j in justifies"
              :key="j.id"
              :class="['chip', { active: justify === j.id }]"
              @click="justify = j.id"
            >
              {{ j.label }}
            </button>
          </div>
        </div>
        <div class="control-group">
          <label>{{ t('layout.flexbox.alignLabel') }}</label>
          <div class="chips">
            <button
              v-for="a in aligns"
              :key="a.id"
              :class="['chip', { active: align === a.id }]"
              @click="align = a.id"
            >
              {{ a.label }}
            </button>
          </div>
        </div>
        <div class="control-group">
          <label>flex-wrap</label>
          <div class="chips">
            <button
              v-for="w in wraps"
              :key="w.id"
              :class="['chip', { active: wrap === w.id }]"
              @click="wrap = w.id"
            >
              {{ w.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="preview-area">
        <div
          class="canvas"
          :style="boxStyle"
        >
          <div
            v-for="n in 6"
            :key="n"
            class="item"
          >
            {{ n }}
          </div>
        </div>
        <div class="axis-hint">
          <span class="axis-tag main">{{ mainAxisLabel }}</span>
          <span class="axis-tag cross">{{ crossAxisLabel }}</span>
        </div>
      </div>
    </div>

    <div class="code-row">
      <div class="code-label">
        CSS
      </div>
      <code class="code-text">{{ cssCode }}</code>
    </div>

    <div class="info-box">
      <strong>{{ t('layout.flexbox.memoryTitle') }}</strong>
      {{ t('layout.flexbox.memory') }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { webBasicsLocale } from '../../../locales/web-basics/index.js'

const { t, messages } = useI18n(webBasicsLocale)
const directions = computed(() => messages.value.layout.flexbox.directions)
const justifies = [
  { id: 'flex-start', label: 'flex-start' },
  { id: 'center', label: 'center' },
  { id: 'flex-end', label: 'flex-end' },
  { id: 'space-between', label: 'space-between' },
  { id: 'space-around', label: 'space-around' }
]
const aligns = [
  { id: 'stretch', label: 'stretch' },
  { id: 'flex-start', label: 'flex-start' },
  { id: 'center', label: 'center' },
  { id: 'flex-end', label: 'flex-end' }
]
const wraps = [
  { id: 'nowrap', label: 'nowrap' },
  { id: 'wrap', label: 'wrap' }
]

const dir = ref('row')
const justify = ref('flex-start')
const align = ref('stretch')
const wrap = ref('nowrap')

const boxStyle = computed(() => ({
  display: 'flex',
  flexDirection: dir.value,
  justifyContent: justify.value,
  alignItems: align.value,
  flexWrap: wrap.value,
  gap: '8px',
  minHeight: dir.value === 'column' ? '240px' : '100px'
}))

const cssCode = computed(() => {
  const parts = ['display: flex']
  if (dir.value !== 'row') parts.push(`flex-direction: ${dir.value}`)
  if (justify.value !== 'flex-start') parts.push(`justify-content: ${justify.value}`)
  if (align.value !== 'stretch') parts.push(`align-items: ${align.value}`)
  if (wrap.value !== 'nowrap') parts.push(`flex-wrap: ${wrap.value}`)
  return parts.join('; ') + ';'
})

const mainAxisLabel = computed(() =>
  t('layout.flexbox.mainAxisDirection', {
    direction: dir.value === 'row' ? t('layout.flexbox.horizontal') : t('layout.flexbox.vertical')
  })
)

const crossAxisLabel = computed(() =>
  t('layout.flexbox.crossAxisDirection', {
    direction: dir.value === 'row' ? t('layout.flexbox.vertical') : t('layout.flexbox.horizontal')
  })
)
</script>

<style scoped>
.flex-demo {
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

.axis-concept {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 1rem;
}

.concept-row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.concept-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.concept-visual {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
}

.concept-visual.main {
  background: rgba(14, 165, 233, 0.15);
  color: var(--vp-c-brand);
}

.concept-visual.cross {
  background: rgba(34, 197, 94, 0.15);
  color: #16a34a;
}

.concept-visual .arrow {
  font-size: 0.7rem;
}

.concept-visual .label {
  font-weight: 600;
}

.concept-desc {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.concept-desc strong {
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
}

.concept-desc span {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.main-area {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .main-area { grid-template-columns: 1fr; }
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 200px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.control-group label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.chip {
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.7rem;
  font-family: var(--vp-font-family-mono);
  transition: all 0.2s;
}

.chip:hover { background: var(--vp-c-bg-soft); }
.chip.active {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.preview-area {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.canvas {
  background-image: radial-gradient(var(--vp-c-divider) 1px, transparent 1px);
  background-size: 16px 16px;
  border-radius: 8px;
  transition: all 0.3s;
  padding: 12px;
}

.item {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background: var(--vp-c-brand);
  color: #fff;
  font-weight: 700;
  display: grid;
  place-items: center;
  font-size: 14px;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.axis-hint {
  display: flex;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
  flex-wrap: wrap;
}

.axis-tag {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
}

.axis-tag.main {
  background: rgba(14, 165, 233, 0.15);
  color: var(--vp-c-brand);
}

.axis-tag.cross {
  background: rgba(34, 197, 94, 0.15);
  color: #16a34a;
}

.code-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.6rem 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.code-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
}

.code-text {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  word-break: break-all;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box strong { color: var(--vp-c-text-1); }
.info-box code {
  background: var(--vp-c-bg-soft);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-size: 0.8rem;
}
</style>
