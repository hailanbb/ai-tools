<template>
  <div class="prompt-demo">
    <div class="header">
      <div class="title">{{ t('prompt.title') }}</div>
      <div class="subtitle">{{ t('prompt.subtitle') }}</div>
    </div>

    <div class="template-tabs">
      <button
        v-for="template in templates"
        :key="template.id"
        :class="['tab-btn', { active: currentTemplate === template.id }]"
        @click="selectTemplate(template.id)"
      >
        <span>{{ template.icon }}</span>
        <span>{{ template.name }}</span>
      </button>
    </div>

    <div class="editor-grid">
      <div class="editor-panel">
        <div class="panel-label">{{ t('prompt.systemLabel') }}</div>
        <textarea
          v-model="systemPrompt"
          class="prompt-input"
          rows="3"
          :placeholder="t('prompt.systemPlaceholder')"
        />

        <div class="panel-label">{{ t('prompt.userLabel') }}</div>
        <textarea
          v-model="userPrompt"
          class="prompt-input"
          rows="3"
          :placeholder="t('prompt.userPlaceholder')"
        />

        <button class="run-btn" @click="runPrompt">
          ▶ {{ t('prompt.run') }}
        </button>
      </div>

      <div class="output-panel">
        <div class="panel-label">{{ t('prompt.outputLabel') }}</div>
        <div class="output-box">
          <div v-if="isGenerating" class="generating">
            <span class="dot-anim">●●●</span> {{ t('prompt.generating') }}
          </div>
          <div v-else-if="output" class="output-text">
            {{ output }}
          </div>
          <div v-else class="output-placeholder">
            {{ t('prompt.placeholder') }}
          </div>
        </div>

        <div v-if="output" class="quality-bar">
          <div class="quality-label">{{ t('prompt.qualityLabel') }}</div>
          <div class="quality-metrics">
            <div
              v-for="m in currentQuality"
              :key="m.name"
              class="metric"
            >
              <div class="metric-name">{{ m.name }}</div>
              <div class="meter">
                <div
                  class="meter-fill"
                  :style="{ width: m.score + '%', background: m.color }"
                />
              </div>
              <div class="metric-score">{{ m.score }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tips-bar">
      <span class="tips-label">💡 {{ t('prompt.tipsLabel') }}</span>
      <span class="tips-text">{{ currentTip }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { aiNativeAppLocale } from '../../../locales/ai-native-app/index.js'

const { t, locale, messages } = useI18n(aiNativeAppLocale)
const templates = computed(() => messages.value.prompt.templates)
const templateData = computed(() => messages.value.prompt.data)

const currentTemplate = ref('bad')
const systemPrompt = ref('')
const userPrompt = ref('')
const output = ref('')
const isGenerating = ref(false)

const currentQuality = ref([])
const currentTip = computed(() => templateData.value[currentTemplate.value].tip)

const selectTemplate = (id) => {
  currentTemplate.value = id
  const data = templateData.value[id]
  systemPrompt.value = data.system
  userPrompt.value = data.user
  output.value = ''
  currentQuality.value = []
}

const runPrompt = async () => {
  isGenerating.value = true
  output.value = ''
  currentQuality.value = []
  await new Promise(r => setTimeout(r, 1200))
  const data = templateData.value[currentTemplate.value]
  output.value = data.output
  currentQuality.value = data.quality
  isGenerating.value = false
}

selectTemplate('bad')

watch(locale, () => {
  selectTemplate(currentTemplate.value)
})
</script>

<style scoped>
.prompt-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
}
.header { text-align: center; margin-bottom: 16px; }
.title {
  font-size: 17px; font-weight: 700;
  background: linear-gradient(120deg, #8b5cf6, var(--vp-c-brand));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.subtitle { font-size: 12px; color: var(--vp-c-text-2); margin-top: 4px; }

.template-tabs {
  display: flex; gap: 8px; justify-content: center;
  margin-bottom: 16px; flex-wrap: wrap;
}
.tab-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 14px; border: 1px solid var(--vp-c-divider);
  border-radius: 20px; background: var(--vp-c-bg);
  cursor: pointer; transition: all 0.2s; font-size: 13px;
}
.tab-btn:hover { background: var(--vp-c-bg-alt); }
.tab-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
}

.editor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 12px;
}
.editor-panel, .output-panel {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 12px; padding: 14px;
}
.panel-label {
  font-weight: 600; font-size: 12px; margin-bottom: 6px;
  color: var(--vp-c-text-2);
}
.prompt-input {
  width: 100%; padding: 10px; border: 1px solid var(--vp-c-divider);
  border-radius: 8px; background: var(--vp-c-bg-soft);
  font-size: 13px; line-height: 1.5; resize: vertical;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1); margin-bottom: 10px;
  box-sizing: border-box;
}
.prompt-input:focus {
  outline: none; border-color: var(--vp-c-brand);
}
.run-btn {
  width: 100%; padding: 10px; background: var(--vp-c-brand);
  color: white; border: none; border-radius: 8px;
  font-size: 13px; cursor: pointer; transition: background 0.2s;
}
.run-btn:hover { background: var(--vp-c-brand-dark); }

.output-box {
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider);
  border-radius: 8px; padding: 14px; min-height: 120px;
  font-size: 13px; line-height: 1.7;
}
.output-text { white-space: pre-wrap; color: var(--vp-c-text-1); }
.output-placeholder { color: var(--vp-c-text-3); text-align: center; padding: 30px 0; }
.generating { color: var(--vp-c-brand); text-align: center; padding: 30px 0; }
.dot-anim { animation: blink 1s infinite; }
@keyframes blink { 50% { opacity: 0.3; } }

.quality-bar { margin-top: 12px; }
.quality-label { font-weight: 600; font-size: 12px; margin-bottom: 8px; }
.quality-metrics { display: flex; flex-direction: column; gap: 6px; }
.metric { display: flex; align-items: center; gap: 8px; }
.metric-name { font-size: 11px; width: 50px; color: var(--vp-c-text-2); }
.meter {
  flex: 1; height: 8px; background: var(--vp-c-bg-soft);
  border-radius: 4px; overflow: hidden;
}
.meter-fill {
  height: 100%; border-radius: 4px;
  transition: width 0.6s ease;
}
.metric-score { font-size: 11px; font-weight: 600; width: 36px; text-align: right; }

.tips-bar {
  margin-top: 16px; padding: 12px 16px;
  background: var(--vp-c-brand-soft); border-radius: 6px; font-size: 13px;
}
.tips-label { font-weight: 600; color: var(--vp-c-brand-dark); }
.tips-text { color: var(--vp-c-text-1); }
</style>
