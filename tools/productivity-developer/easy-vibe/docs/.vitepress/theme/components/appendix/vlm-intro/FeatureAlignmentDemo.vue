<template>
  <div class="feature-alignment-demo">
    <div class="header">
      <div class="title">
        {{ t('featureAlignment.title') }}
      </div>
      <div class="desc" v-html="t('featureAlignment.desc')" />
    </div>

    <div class="training-diagram">
      <!-- Data Input -->
      <div class="data-column">
        <div class="data-item image-data">
          <div class="data-icon">
            🖼️
          </div>
          <div class="data-label">
            <span v-html="t('featureAlignment.imageLabel')" />
          </div>
        </div>
        <div class="data-item text-data">
          <div class="data-icon">
            📝
          </div>
          <div class="data-label">
            <span v-html="t('featureAlignment.textLabel')" />
          </div>
        </div>
      </div>

      <!-- Arrow Column -->
      <div class="arrow-column">
        <div class="arrow">
          ➜
        </div>
        <div class="arrow">
          ➜
        </div>
      </div>

      <!-- Model Column -->
      <div class="model-column">
        <!-- Vision Branch -->
        <div class="model-block frozen">
          <div class="status-badge">
            {{ t('featureAlignment.frozen') }}
          </div>
          <div class="block-icon">
            👁️
          </div>
          <div class="block-name">
            ViT
          </div>
        </div>

        <div class="arrow-small">
          ➜
        </div>

        <div class="model-block training">
          <div class="status-badge fire">
            {{ t('featureAlignment.train') }}
          </div>
          <div class="block-icon">
            🔌
          </div>
          <div class="block-name">
            Projector
          </div>
        </div>

        <!-- Text Branch -->
        <div class="model-block frozen text-model">
          <div class="status-badge">
            {{ t('featureAlignment.frozen') }}
          </div>
          <div class="block-icon">
            🧠
          </div>
          <div class="block-name">
            LLM
          </div>
        </div>
      </div>

      <!-- Arrow Column -->
      <div class="arrow-column">
        <div class="arrow">
          ➜
        </div>
        <div class="arrow">
          ➜
        </div>
      </div>

      <!-- Vector Output -->
      <div class="vector-column">
        <div class="vector-item v-vector">
          <div class="vector-icon">
            🟢
          </div>
          <div class="vector-label">
            {{ t('featureAlignment.vectorV') }}
          </div>
        </div>

        <div class="loss-connection">
          <div class="loss-line" />
          <div
            class="loss-box"
            :class="{ active: isCalculatingLoss }"
          >
            <div class="loss-label">
              Loss
            </div>
            <div class="loss-desc">
              V ≈ T
            </div>
          </div>
          <div class="loss-line" />
        </div>

        <div class="vector-item t-vector">
          <div class="vector-icon">
            🔵
          </div>
          <div class="vector-label">
            {{ t('featureAlignment.vectorT') }}
          </div>
        </div>
      </div>
    </div>

    <div class="controls">
      <button
        class="play-btn"
        @click="nextStep"
      >
        {{ buttonText }}
      </button>
      <div class="step-desc">
        {{ currentStepDesc }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { vlmIntroLocale } from '../../../locales/vlm-intro/index.js'

const { t, messages } = useI18n(vlmIntroLocale)

const step = ref(0) // 0: Idle, 1: Forward, 2: Loss, 3: Backprop

const nextStep = () => {
  if (step.value < 3) {
    step.value++
  } else {
    step.value = 0
  }
}

const buttonText = computed(
  () =>
    messages.value.featureAlignment.buttons[step.value] ||
    t('featureAlignment.fallbackButton')
)

const currentStepDesc = computed(
  () => messages.value.featureAlignment.descriptions[step.value] || ''
)

const isCalculatingLoss = computed(() => step.value === 2)
</script>

<style scoped>
.feature-alignment-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  margin-bottom: 20px;
  text-align: center;
}

.title {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
}

.desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.training-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 6px;
  padding: 20px 10px;
  overflow: hidden;
  gap: 10px;
}

/* Data Column */
.data-column {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.data-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  background: var(--vp-c-bg-mute);
  border-radius: 6px;
  width: 60px;
}

.data-icon {
  font-size: 24px;
}
.data-label {
  font-size: 10px;
  text-align: center;
  margin-top: 4px;
}

/* Arrow Column */
.arrow-column {
  display: flex;
  flex-direction: column;
  gap: 80px;
  color: var(--vp-c-text-3);
  font-size: 14px;
}

/* Model Column */
.model-column {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-areas:
    'vit arrow proj'
    'llm llm   llm';
  gap: 10px;
  row-gap: 30px;
  align-items: center;
}

.model-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1.5px solid;
  border-radius: 6px;
  padding: 10px;
  min-width: 70px;
  position: relative;
  background: var(--vp-c-bg);
  transition: all 0.3s;
}

.status-badge {
  position: absolute;
  top: -8px;
  right: -5px;
  font-size: 9px;
  padding: 2px 4px;
  border-radius: 4px;
  background: var(--vp-c-bg);
  border: 1px solid;
  font-weight: bold;
}

.frozen {
  border-color: var(--vp-c-divider);
  opacity: 0.8;
  border-style: dashed;
}
.frozen .status-badge {
  border-color: var(--vp-c-divider);
  color: var(--vp-c-text-3);
}

.training {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 10px rgba(var(--vp-c-brand-rgb), 0.1);
}
.training .status-badge {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}
.training.fire {
  animation: pulse 2s infinite;
}

.text-model {
  grid-area: llm;
  width: 100%;
}

.block-icon {
  font-size: 20px;
  margin-bottom: 4px;
}
.block-name {
  font-size: 12px;
  font-weight: bold;
}

.arrow-small {
  grid-area: arrow;
  color: var(--vp-c-text-3);
}

/* Vector Output */
.vector-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  min-width: 80px;
}

.vector-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 10px;
}

.loss-connection {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.loss-line {
  width: 1px;
  height: 20px;
  background: var(--vp-c-divider);
}

.loss-box {
  border: 1px solid var(--vp-c-danger);
  border-radius: 6px;
  padding: 4px 8px;
  text-align: center;
  background: var(--vp-c-bg);
  transition: all 0.3s;
  opacity: 0.5;
}

.loss-box.active {
  opacity: 1;
  transform: scale(1.1);
  background: rgba(255, 0, 0, 0.1);
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.2);
}

.loss-label {
  font-size: 12px;
  font-weight: bold;
  color: var(--vp-c-danger);
}
.loss-desc {
  font-size: 10px;
  color: var(--vp-c-text-2);
}

/* Controls */
.controls {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.play-btn {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  transition: opacity 0.2s;
}

.play-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.play-btn:active {
  transform: scale(0.98);
}

.step-desc {
  font-size: 13px;
  color: var(--vp-c-text-1);
  text-align: center;
  min-height: 40px;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(var(--vp-c-brand-rgb), 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(var(--vp-c-brand-rgb), 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(var(--vp-c-brand-rgb), 0);
  }
}

@media (max-width: 600px) {
  .training-diagram {
    flex-direction: column;
    gap: 20px;
  }
  .arrow-column {
    display: none;
  }
  .data-column {
    flex-direction: row;
    gap: 20px;
  }
  .vector-column {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .loss-connection {
    flex-direction: row;
    align-items: center;
  }
  .loss-line {
    width: 20px;
    height: 1px;
  }
}
</style>
