<template>
  <div class="emotion-control-demo">
    <el-card shadow="never">
      <template #header>
        <div class="header-title">
          <el-icon><MagicStick /></el-icon>
          <span>{{ t('emotionControl.title') }}</span>
        </div>
      </template>

      <div class="demo-content">
        <div class="emotion-selector">
          <div class="selector-title">
            {{ t('emotionControl.selectorTitle') }}
          </div>
          <div class="emotion-grid">
            <div
              v-for="emotion in emotions"
              :key="emotion.id"
              class="emotion-card"
              :class="{ active: selectedEmotion === emotion.id }"
              @click="selectEmotion(emotion.id)"
            >
              <div class="emotion-emoji">
                {{ emotion.emoji }}
              </div>
              <div class="emotion-name">
                {{ emotion.name }}
              </div>
              <div class="emotion-desc">
                {{ emotion.description }}
              </div>
            </div>
          </div>
        </div>

        <div class="emotion-embedding">
          <div class="embedding-title">
            {{ t('emotionControl.embeddingTitle') }}
          </div>
          <canvas
            ref="emotionCanvas"
            width="400"
            height="200"
            class="emotion-canvas"
          />
          <div class="embedding-legend">
            <span
              v-for="emotion in emotions"
              :key="emotion.id"
              class="legend-item"
            >
              <span
                class="legend-dot"
                :style="{ background: emotion.color }"
              />
              {{ emotion.name }}
            </span>
          </div>
        </div>

        <div class="parameter-controls">
          <div class="control-title">
            {{ t('emotionControl.controlTitle') }}
          </div>
          <div class="controls-grid">
            <div class="control-item">
              <div class="control-label">
                <span>{{ t('emotionControl.speed') }}</span>
                <el-tag size="small">
                  {{ speed }}x
                </el-tag>
              </div>
              <el-slider
                v-model="speed"
                :min="0.5"
                :max="2"
                :step="0.1"
              />
              <div class="control-hint">
                <span>{{ t('emotionControl.slow') }}</span>
                <span>{{ t('emotionControl.normal') }}</span>
                <span>{{ t('emotionControl.fast') }}</span>
              </div>
            </div>

            <div class="control-item">
              <div class="control-label">
                <span>{{ t('emotionControl.pitch') }}</span>
                <el-tag size="small">
                  {{ pitch > 0 ? '+' : '' }}{{ pitch }}
                </el-tag>
              </div>
              <el-slider
                v-model="pitch"
                :min="-10"
                :max="10"
                :step="1"
              />
              <div class="control-hint">
                <span>{{ t('emotionControl.low') }}</span>
                <span>{{ t('emotionControl.normal') }}</span>
                <span>{{ t('emotionControl.high') }}</span>
              </div>
            </div>

            <div class="control-item">
              <div class="control-label">
                <span>{{ t('emotionControl.energy') }}</span>
                <el-tag size="small">
                  {{ energy }}%
                </el-tag>
              </div>
              <el-slider
                v-model="energy"
                :min="50"
                :max="150"
                :step="5"
              />
              <div class="control-hint">
                <span>{{ t('emotionControl.soft') }}</span>
                <span>{{ t('emotionControl.moderate') }}</span>
                <span>{{ t('emotionControl.intense') }}</span>
              </div>
            </div>

            <div class="control-item">
              <div class="control-label">
                <span>{{ t('emotionControl.pause') }}</span>
                <el-tag size="small">
                  {{ pause }}ms
                </el-tag>
              </div>
              <el-slider
                v-model="pause"
                :min="0"
                :max="500"
                :step="50"
              />
              <div class="control-hint">
                <span>{{ t('emotionControl.compact') }}</span>
                <span>{{ t('emotionControl.natural') }}</span>
                <span>{{ t('emotionControl.relaxed') }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="preview-section">
          <div class="preview-title">
            {{ t('emotionControl.previewTitle') }}
          </div>
          <el-input
            v-model="previewText"
            type="textarea"
            :rows="2"
            :placeholder="t('emotionControl.placeholder')"
            class="preview-input"
          />
          <div class="preview-actions">
            <el-button
              type="primary"
              @click="synthesize"
            >
              <el-icon><VideoPlay /></el-icon>
              {{ t('emotionControl.synthesize') }}
            </el-button>
            <el-button @click="resetParameters">
              <el-icon><RefreshRight /></el-icon>
              {{ t('emotionControl.reset') }}
            </el-button>
          </div>
        </div>

        <div class="tech-explanation">
          <el-collapse>
            <el-collapse-item :title="t('emotionControl.explanationTitle')">
              <div class="tech-content">
                <h4>{{ t('emotionControl.gstTitle') }}</h4>
                <p>
                  {{ t('emotionControl.gstText') }}
                </p>

                <h4>{{ t('emotionControl.referenceTitle') }}</h4>
                <p>
                  {{ t('emotionControl.referenceText') }}
                </p>

                <h4>{{ t('emotionControl.fineTitle') }}</h4>
                <p>
                  {{ t('emotionControl.fineText') }}
                </p>
                <ul>
                  <li
                    v-for="item in fineItems"
                    :key="item.strong"
                  >
                    <strong>{{ item.strong }}</strong>{{ item.text }}
                  </li>
                </ul>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>

      <div class="info-box">
        <p>
          <span class="icon">💡</span>
          <strong>{{ t('emotionControl.infoStrong') }}</strong>
          {{ t('emotionControl.info') }}
        </p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { MagicStick, VideoPlay, RefreshRight } from '@element-plus/icons-vue'
import { useI18n } from '../../../composables/useI18n.js'
import { audioIntroLocale } from '../../../locales/audio-intro/index.js'

const { t, messages } = useI18n(audioIntroLocale)
const emotions = computed(() => messages.value.emotionControl.emotions)
const fineItems = computed(() => messages.value.emotionControl.fineItems)

const selectedEmotion = ref('neutral')
const speed = ref(1.0)
const pitch = ref(0)
const energy = ref(100)
const pause = ref(150)
const previewText = ref(t('emotionControl.defaultPreview'))

const emotionCanvas = ref(null)

const selectEmotion = (id) => {
  selectedEmotion.value = id
  drawEmotionEmbedding()
}

const resetParameters = () => {
  speed.value = 1.0
  pitch.value = 0
  energy.value = 100
  pause.value = 150
  selectedEmotion.value = 'neutral'
  drawEmotionEmbedding()
}

const synthesize = () => {
  console.log('Synthesizing with:', {
    emotion: selectedEmotion.value,
    speed: speed.value,
    pitch: pitch.value,
    energy: energy.value,
    pause: pause.value
  })
}

const drawEmotionEmbedding = () => {
  const canvas = emotionCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height

  ctx.clearRect(0, 0, width, height)

  ctx.strokeStyle = '#e0e0e0'
  ctx.lineWidth = 1

  ctx.beginPath()
  ctx.moveTo(40, height / 2)
  ctx.lineTo(width - 20, height / 2)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(width / 2, height - 30)
  ctx.lineTo(width / 2, 20)
  ctx.stroke()

  ctx.fillStyle = '#666'
  ctx.font = '12px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(t('emotionControl.valenceAxis'), width / 2, height - 10)

  ctx.save()
  ctx.translate(15, height / 2)
  ctx.rotate(-Math.PI / 2)
  ctx.fillText(t('emotionControl.arousalAxis'), 0, 0)
  ctx.restore()

  const emotionPositions = {
    neutral: { x: 0.5, y: 0.5 },
    happy: { x: 0.8, y: 0.7 },
    sad: { x: 0.2, y: 0.3 },
    angry: { x: 0.3, y: 0.9 },
    excited: { x: 0.9, y: 0.9 },
    calm: { x: 0.6, y: 0.2 }
  }

  emotions.value.forEach(emotion => {
    const pos = emotionPositions[emotion.id]
    const x = 50 + pos.x * (width - 80)
    const y = height - 40 - pos.y * (height - 60)

    ctx.beginPath()
    ctx.arc(x, y, emotion.id === selectedEmotion.value ? 12 : 8, 0, Math.PI * 2)
    ctx.fillStyle = emotion.color
    ctx.fill()

    if (emotion.id === selectedEmotion.value) {
      ctx.strokeStyle = emotion.color
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(x, y, 18, 0, Math.PI * 2)
      ctx.stroke()
    }

    ctx.fillStyle = '#333'
    ctx.font = emotion.id === selectedEmotion.value ? 'bold 12px sans-serif' : '12px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(emotion.name, x, y + 25)
  })
}

onMounted(drawEmotionEmbedding)
watch(selectedEmotion, drawEmotionEmbedding)
watch(messages, drawEmotionEmbedding)
</script>

<style scoped>
.emotion-control-demo {
  margin: 0.5rem 0;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.emotion-selector {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
}

.selector-title {
  font-weight: 500;
  margin-bottom: 16px;
}

.emotion-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}

.emotion-card {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.emotion-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.emotion-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-mute);
}

.emotion-emoji {
  font-size: 2rem;
  margin-bottom: 8px;
}

.emotion-name {
  font-weight: 600;
  margin-bottom: 4px;
}

.emotion-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.emotion-embedding {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
}

.embedding-title {
  font-weight: 500;
  margin-bottom: 16px;
  text-align: center;
}

.emotion-canvas {
  width: 100%;
  height: auto;
  max-height: 200px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.embedding-legend {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.parameter-controls {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
}

.control-title {
  font-weight: 500;
  margin-bottom: 16px;
}

.controls-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.control-item {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 16px;
}

.control-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.control-hint {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.preview-section {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
}

.preview-title {
  font-weight: 500;
  margin-bottom: 16px;
}

.preview-input {
  margin-bottom: 16px;
}

.preview-actions {
  display: flex;
  gap: 12px;
}

.tech-explanation {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
}

.tech-content h4 {
  margin: 16px 0 8px 0;
  color: var(--vp-c-brand);
}

.tech-content h4:first-child {
  margin-top: 0;
}

.tech-content p {
  margin: 0 0 12px 0;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.tech-content ul {
  margin: 0;
  padding-left: 20px;
  color: var(--vp-c-text-2);
}

.tech-content li {
  margin-bottom: 8px;
  line-height: 1.5;
}

.info-box {
  margin-top: 16px;
  padding: 12px;
  background: var(--vp-c-bg-mute);
  border-radius: 6px;
  font-size: 0.9rem;
  line-height: 1.6;
}

.icon {
  font-size: 1.2em;
}
</style>
