<template>
  <div class="pipeline-demo">
    <div class="stage-switch">
      <button
        :class="{ active: stage === 1 }"
        @click="stage = 1"
      >
        {{ t('trainingPipeline.stage1') }}
      </button>
      <button
        :class="{ active: stage === 2 }"
        @click="stage = 2"
      >
        {{ t('trainingPipeline.stage2') }}
      </button>
    </div>

    <div class="pipeline-visual">
      <!-- Image Input -->
      <div class="component-box image-input">
        <div class="icon">
          🖼️
        </div>
        <div class="name">
          Image
        </div>
      </div>

      <div class="arrow">
        ➜
      </div>

      <!-- Vision Encoder -->
      <div
        class="component-box encoder"
        :class="{ frozen: true }"
      >
        <div class="status-badge">
          ❄️ Frozen
        </div>
        <div class="name">
          ViT
        </div>
        <div class="desc">
          Vision Encoder
        </div>
      </div>

      <div class="arrow">
        ➜
      </div>

      <!-- Projector -->
      <div
        class="component-box projector"
        :class="{ training: true }"
      >
        <div class="status-badge fire">
          🔥 Train
        </div>
        <div class="name">
          Projector
        </div>
        <div class="desc">
          Adapter
        </div>
      </div>

      <div class="arrow">
        ➜
      </div>

      <!-- LLM -->
      <div
        class="component-box llm"
        :class="{ frozen: stage === 1, training: stage === 2 }"
      >
        <div class="status-badge">
          {{ stage === 1 ? t('trainingPipeline.frozen') : t('trainingPipeline.train') }}
        </div>
        <div class="name">
          LLM
        </div>
        <div class="desc">
          Language Model
        </div>
      </div>

      <div class="arrow">
        ➜
      </div>

      <!-- Output / Loss -->
      <div class="component-box output">
        <div
          v-if="stage === 1"
          class="name"
        >
          {{ t('trainingPipeline.lossCalculation') }}
        </div>
        <div
          v-else
          class="name"
        >
          {{ t('trainingPipeline.textGeneration') }}
        </div>
        <div
          v-if="stage === 1"
          class="desc"
        >
          Contrastive Loss
        </div>
        <div
          v-else
          class="desc"
        >
          Next Token Prediction
        </div>
      </div>
    </div>

    <div class="data-example">
      <div class="data-title">
        {{ t('trainingPipeline.dataTitle') }}
      </div>
      <div
        v-if="stage === 1"
        class="data-content"
      >
        <code>{{ t('trainingPipeline.stage1Code') }}</code>
        <p>{{ t('trainingPipeline.stage1Task') }}</p>
      </div>
      <div
        v-else
        class="data-content"
      >
        <code v-html="t('trainingPipeline.stage2Code')" />
        <p>{{ t('trainingPipeline.stage2Task') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { vlmIntroLocale } from '../../../locales/vlm-intro/index.js'

const { t } = useI18n(vlmIntroLocale)
const stage = ref(1)
</script>

<style scoped>
.pipeline-demo {
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  margin: 20px 0;
}

.stage-switch {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
}

.stage-switch button {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s;
  font-weight: bold;
  color: var(--vp-c-text-2);
}

.stage-switch button.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
  transform: scale(1.05);
}

.pipeline-visual {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  overflow-x: auto;
  padding: 10px 0;
}

.component-box {
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 15px;
  text-align: center;
  min-width: 100px;
  background: var(--vp-c-bg);
  position: relative;
  transition: all 0.3s;
}

.component-box.frozen {
  background: var(--vp-c-bg-mute);
  border-color: var(--vp-c-divider);
  opacity: 0.8;
}

.component-box.training {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-dimm);
  box-shadow: 0 0 10px rgba(var(--vp-c-brand-rgb), 0.2);
}

.status-badge {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.7em;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  padding: 2px 6px;
  border-radius: 10px;
  white-space: nowrap;
}

.fire {
  color: #f43f5e;
  border-color: #f43f5e;
}

.name {
  font-weight: bold;
  margin-bottom: 4px;
}

.desc {
  font-size: 0.8em;
  color: var(--vp-c-text-2);
}

.arrow {
  font-size: 1.5em;
  color: var(--vp-c-text-3);
  font-weight: bold;
}

.data-example {
  background: var(--vp-c-bg);
  padding: 15px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.data-title {
  font-size: 0.9em;
  font-weight: bold;
  margin-bottom: 8px;
  color: var(--vp-c-text-2);
}

.data-content code {
  display: block;
  background: var(--vp-c-bg-mute);
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 8px;
  font-family: monospace;
}

.data-content p {
  margin: 0;
  font-size: 0.9em;
  color: var(--vp-c-text-2);
}
</style>
