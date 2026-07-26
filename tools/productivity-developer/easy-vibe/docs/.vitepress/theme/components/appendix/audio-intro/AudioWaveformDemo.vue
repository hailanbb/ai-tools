<template>
  <div class="waveform-demo">
    <div class="demo-container">
      <!-- Step 1: Sound Wave -->
      <div class="step-box">
        <div class="label">
          {{ t('audioWaveform.wave') }}
        </div>
        <div class="wave-visual">
          <svg
            viewBox="0 0 200 60"
            class="wave-svg"
          >
            <path
              d="M 0 30 Q 10 10, 20 30 T 40 30 T 60 30 T 80 30 T 100 30 T 120 30 T 140 30 T 160 30 T 180 30 T 200 30"
              fill="none"
              stroke="#22c55e"
              stroke-width="2"
            />
          </svg>
        </div>
        <div class="desc">
          {{ t('audioWaveform.analog') }}
        </div>
      </div>

      <div class="arrow">
        →
      </div>

      <!-- Step 2: Sampling -->
      <div class="step-box">
        <div class="label">
          {{ t('audioWaveform.sampling') }}
        </div>
        <div class="sample-visual">
          <div
            v-for="n in 10"
            :key="n"
            class="sample-bar"
          />
        </div>
        <div class="desc">
          {{ t('audioWaveform.sampleRate') }}
        </div>
      </div>

      <div class="arrow">
        →
      </div>

      <!-- Step 3: Digital -->
      <div class="step-box">
        <div class="label">
          {{ t('audioWaveform.digital') }}
        </div>
        <div class="digital-visual">
          <div
            v-for="n in 8"
            :key="n"
            class="bit"
          >
            {{ Math.floor(Math.random() * 2) }}
          </div>
        </div>
        <div class="desc">
          {{ t('audioWaveform.pcm') }}
        </div>
      </div>
    </div>

    <div class="explanation">
      <p>
        <span class="icon">💡</span>
        <span v-html="t('audioWaveform.explanation')" />
      </p>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from '../../../composables/useI18n.js'
import { audioIntroLocale } from '../../../locales/audio-intro/index.js'

const { t } = useI18n(audioIntroLocale)
</script>

<style scoped>
.waveform-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
}

.demo-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 20px;
  flex-wrap: wrap;
}

.step-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.label {
  font-weight: bold;
  font-size: 0.9em;
  color: var(--vp-c-text-2);
}

.desc {
  font-size: 0.8em;
  color: var(--vp-c-text-3);
}

.wave-visual {
  width: 200px;
  height: 60px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.wave-svg {
  width: 100%;
  height: 100%;
}

.sample-visual {
  display: flex;
  gap: 3px;
  align-items: flex-end;
  height: 60px;
  width: 120px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 10px;
}

.sample-bar {
  width: 8px;
  background: #22c55e;
  border-radius: 2px;
  flex: 1;
}

.digital-visual {
  display: flex;
  gap: 4px;
  padding: 10px 15px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.bit {
  width: 20px;
  height: 20px;
  background: #3b82f6;
  color: white;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75em;
  font-weight: bold;
}

.arrow {
  font-size: 1.5em;
  color: var(--vp-c-text-3);
}

.explanation {
  margin-top: 20px;
  padding: 12px;
  background: var(--vp-c-bg-mute);
  border-radius: 6px;
  font-size: 0.9em;
  line-height: 1.6;
}

.icon {
  font-size: 1.2em;
}
</style>
