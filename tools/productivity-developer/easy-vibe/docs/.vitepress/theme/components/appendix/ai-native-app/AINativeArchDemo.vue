<template>
  <div class="arch-demo">
    <div class="header">
      <div class="title">{{ t('architecture.title') }}</div>
      <div class="subtitle">{{ t('architecture.subtitle') }}</div>
    </div>

    <div class="toggle-bar">
      <button
        :class="['toggle-btn', { active: mode === 'traditional' }]"
        @click="mode = 'traditional'"
      >
        <span>🏗️</span>
        <span>{{ t('architecture.traditionalButton') }}</span>
      </button>
      <button
        :class="['toggle-btn', { active: mode === 'ai-native' }]"
        @click="mode = 'ai-native'"
      >
        <span>🤖</span>
        <span>{{ t('architecture.aiNativeButton') }}</span>
      </button>
    </div>

    <div class="arch-grid">
      <div class="stack">
        <div class="stack-title">{{ currentArch.label }}</div>
        <div
          v-for="(layer, idx) in currentArch.layers"
          :key="idx"
          :class="['layer', { highlight: selectedLayer === idx }]"
          :style="{ borderLeftColor: layer.color }"
          @click="selectedLayer = idx"
        >
          <div class="layer-icon">{{ layer.icon }}</div>
          <div class="layer-info">
            <div class="layer-name">{{ layer.name }}</div>
            <div class="layer-desc">{{ layer.brief }}</div>
          </div>
        </div>
      </div>

      <div class="detail-panel">
        <div v-if="selectedLayer !== null" class="detail-content">
          <div class="detail-title">
            {{ currentArch.layers[selectedLayer].icon }}
            {{ currentArch.layers[selectedLayer].name }}
          </div>
          <div class="detail-desc">
            {{ currentArch.layers[selectedLayer].detail }}
          </div>
          <div class="detail-example">
            <div class="example-label">{{ t('architecture.techLabel') }}</div>
            <div class="tech-tags">
              <span
                v-for="tech in currentArch.layers[selectedLayer].techs"
                :key="tech"
                class="tech-tag"
              >{{ tech }}</span>
            </div>
          </div>
        </div>
        <div v-else class="detail-placeholder">
          👆 {{ t('architecture.placeholder') }}
        </div>
      </div>
    </div>

    <div class="comparison-bar">
      <span class="compare-label">💡 {{ t('architecture.differenceLabel') }}</span>
      <span class="compare-text">{{ currentDifference }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { aiNativeAppLocale } from '../../../locales/ai-native-app/index.js'

const mode = ref('traditional')
const selectedLayer = ref(0)

const { t, messages } = useI18n(aiNativeAppLocale)
const architectures = computed(() => messages.value.architecture.architectures)

const currentArch = computed(() => architectures.value[mode.value])
const currentDifference = computed(() =>
  messages.value.architecture.difference[mode.value]
)
</script>

<style scoped>
.arch-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
}
.header { text-align: center; margin-bottom: 16px; }
.title {
  font-size: 17px; font-weight: 700;
  background: linear-gradient(120deg, var(--vp-c-brand), #f59e0b);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.subtitle { font-size: 12px; color: var(--vp-c-text-2); margin-top: 4px; }

.toggle-bar {
  display: flex; gap: 8px; justify-content: center; margin-bottom: 16px;
}
.toggle-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 18px; border: 1px solid var(--vp-c-divider);
  border-radius: 20px; background: var(--vp-c-bg);
  cursor: pointer; transition: all 0.2s; font-size: 13px;
}
.toggle-btn:hover { background: var(--vp-c-bg-alt); }
.toggle-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
}

.arch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
}
.stack {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 12px; padding: 12px;
  display: flex; flex-direction: column; gap: 8px;
}
.stack-title { font-weight: 700; font-size: 14px; margin-bottom: 4px; }

.layer {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px; border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  border-left: 3px solid; background: var(--vp-c-bg);
  cursor: pointer; transition: all 0.2s;
}
.layer:hover { background: var(--vp-c-bg-alt); }
.layer.highlight {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}
.layer-icon { font-size: 20px; flex-shrink: 0; }
.layer-name { font-weight: 600; font-size: 13px; }
.layer-desc { font-size: 11px; color: var(--vp-c-text-2); margin-top: 2px; }

.detail-panel {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 12px; padding: 16px;
}
.detail-title { font-weight: 700; font-size: 15px; margin-bottom: 10px; }
.detail-desc { color: var(--vp-c-text-2); line-height: 1.7; font-size: 13px; margin-bottom: 12px; }
.example-label { font-weight: 600; font-size: 12px; margin-bottom: 6px; }
.tech-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.tech-tag {
  padding: 3px 10px; border-radius: 12px; font-size: 11px;
  background: var(--vp-c-brand-soft); color: var(--vp-c-brand-dark);
  border: 1px solid var(--vp-c-brand-dimm);
}
.detail-placeholder {
  color: var(--vp-c-text-3); text-align: center; padding: 40px 0; font-size: 13px;
}

.comparison-bar {
  margin-top: 16px; padding: 12px 16px;
  background: var(--vp-c-brand-soft); border-radius: 6px; font-size: 13px;
}
.compare-label { font-weight: 600; color: var(--vp-c-brand-dark); }
.compare-text { color: var(--vp-c-text-1); }
</style>
