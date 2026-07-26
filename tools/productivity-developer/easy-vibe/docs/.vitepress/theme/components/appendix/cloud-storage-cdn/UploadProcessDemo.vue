<template>
  <div class="upload-process-demo">
    <div class="demo-header">
      <span class="icon">📤</span>
      <span class="title">{{ t('upload.title') }}</span>
      <span class="subtitle">{{ t('upload.subtitle') }}</span>
    </div>

    <div class="upload-methods">
      <div
        v-for="method in uploadMethods"
        :key="method.id"
        class="method-card"
        :class="{ active: selectedMethod === method.id }"
        @click="selectMethod(method.id)"
      >
        <div class="method-icon">{{ method.icon }}</div>
        <div class="method-name">{{ method.name }}</div>
        <div class="method-desc">{{ method.description }}</div>
        <div class="method-size">{{ t('upload.suitable', { value: method.suitable }) }}</div>
      </div>
    </div>

    <div class="upload-flow">
      <div class="flow-title">
        {{ flowTitle }}
      </div>

      <div v-if="selectedMethod === 'direct'" class="flow-steps">
        <div
          v-for="(step, index) in currentFlow"
          :key="step.title"
          class="flow-step"
          :class="{ active: currentStep >= index + 1 }"
        >
          <div class="step-num">{{ index + 1 }}</div>
          <div class="step-content">
            <div class="step-title">{{ step.title }}</div>
            <div class="step-detail">{{ step.detail }}</div>
          </div>
        </div>
      </div>

      <div v-else-if="selectedMethod === 'multipart'" class="flow-steps multipart-flow">
        <div
          v-for="(step, index) in currentFlow"
          :key="step.title"
          class="flow-step"
          :class="{ active: currentStep >= index + 1 }"
        >
          <div class="step-num">{{ index + 1 }}</div>
          <div class="step-content">
            <div class="step-title">{{ step.title }}</div>
            <div class="step-detail">{{ step.detail }}</div>
            <div v-if="index === 0" class="chunks-preview">
              <div v-for="i in 10" :key="i" class="chunk" :class="{ uploaded: i <= 3 }">{{ i }}</div>
              <span class="chunks-more">...</span>
            </div>
            <div v-if="step.slots" class="parallel-upload">
              <div
                v-for="(slot, slotIndex) in step.slots"
                :key="slot"
                class="upload-slot"
                :class="{ active: parallelActive >= slotIndex + 1 }"
              >
                {{ slot }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="flow-steps resume-flow">
        <div class="flow-step" :class="{ active: currentStep >= 1 }">
          <div class="step-num">1</div>
          <div class="step-content">
            <div class="step-title">{{ currentFlow[0].title }}</div>
            <div class="step-detail">{{ currentFlow[0].detail }}</div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 6%;"></div>
              <div class="progress-text">6% (60MB / 1GB)</div>
            </div>
          </div>
        </div>
        <div class="flow-arrow">⬇️</div>
        <div class="flow-step error-step" :class="{ active: currentStep >= 2 }">
          <div class="step-num">⚠️</div>
          <div class="step-content">
            <div class="step-title">{{ currentFlow[1].title }}</div>
            <div class="step-detail">{{ currentFlow[1].detail }}</div>
            <div class="error-info">
              <span>❌ Error: ETIMEDOUT</span>
              <span>{{ t('upload.uploadedChunks') }}</span>
            </div>
          </div>
        </div>
        <div class="flow-arrow">⬇️</div>
        <div class="flow-step" :class="{ active: currentStep >= 3 }">
          <div class="step-num">3</div>
          <div class="step-content">
            <div class="step-title">{{ currentFlow[2].title }}</div>
            <div class="step-detail">{{ currentFlow[2].detail }}</div>
            <div class="resume-info">
              <div class="resume-item success">
                <span>{{ resumeUploaded[0] }}</span>
                <span>{{ resumeUploaded[1] }}</span>
              </div>
              <div class="resume-item pending">
                <span>{{ resumePending[0] }}</span>
                <span>{{ resumePending[1] }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flow-arrow">⬇️</div>
        <div class="flow-step" :class="{ active: currentStep >= 4 }">
          <div class="step-num">4</div>
          <div class="step-content">
            <div class="step-title">{{ currentFlow[3].title }}</div>
            <div class="step-detail">{{ currentFlow[3].detail }}</div>
            <div class="success-info">
              <div
                v-for="item in successItems"
                :key="item[0]"
                class="success-item"
              >
                <span>{{ item[0] }}</span>
                <span>{{ item[1] }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.coreIdea') }}</strong>{{ t('upload.idea') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { cloudStorageCdnLocale } from '../../../locales/cloud-storage-cdn/index.js'

const { t, messages } = useI18n(cloudStorageCdnLocale)
const uploadMethods = computed(() => messages.value.upload.methods)

const selectedMethod = ref('direct')
const currentStep = ref(0)
const parallelActive = ref(0)

const flowTitle = computed(() => messages.value.upload.flowTitles[selectedMethod.value])
const currentFlow = computed(() => messages.value.upload.flows[selectedMethod.value])
const resumeUploaded = computed(() => messages.value.upload.resumeUploaded)
const resumePending = computed(() => messages.value.upload.resumePending)
const successItems = computed(() => messages.value.upload.successItems)

const selectMethod = (id) => {
  selectedMethod.value = id
  resetDemo()
}

const resetDemo = () => {
  currentStep.value = 0
  parallelActive.value = 0
}
</script>

<style scoped>
.upload-process-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1.5rem;
}

.title {
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.upload-methods {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .upload-methods {
    grid-template-columns: 1fr;
  }
}

.method-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 0.75rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.method-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.method-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  box-shadow: 0 0 0 3px var(--vp-c-brand-dimm);
}

.method-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.method-name {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.method-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.method-size {
  font-size: 0.75rem;
  color: var(--vp-c-brand);
  font-weight: 600;
  background: var(--vp-c-brand-soft);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
}

.upload-flow {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1.25rem;
}

.flow-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.flow-steps {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.flow-step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-divider);
  transition: all 0.3s;
}

.flow-step.active {
  border-left-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.flow-step.error-step {
  background: #fef2f2;
  border-left-color: #dc2626;
}

.step-num {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.flow-step.error-step .step-num {
  background: #dc2626;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.step-detail {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.flow-arrow {
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 1rem;
}

.chunks-preview {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.5rem;
}

.chunk {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.chunk.uploaded {
  background: var(--vp-c-brand);
  color: white;
}

.chunks-more {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.parallel-upload {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.upload-slot {
  flex: 1;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  text-align: center;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  transition: all 0.3s;
}

.upload-slot.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  font-weight: 600;
}

.progress-bar {
  position: relative;
  height: 24px;
  background: var(--vp-c-bg);
  border-radius: 12px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-light));
  border-radius: 12px;
  transition: width 0.3s;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}

.error-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: white;
  border-radius: 6px;
  border-left: 3px solid #dc2626;
}

.error-info span {
  font-size: 0.75rem;
  color: #dc2626;
  font-family: var(--vp-font-family-mono);
}

.resume-info {
  margin-top: 0.5rem;
}

.resume-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0.6rem;
  margin-bottom: 0.25rem;
  background: white;
  border-radius: 4px;
  font-size: 0.75rem;
}

.resume-item.success {
  border-left: 3px solid #22c55e;
}

.resume-item.success span:first-child {
  color: #166534;
}

.resume-item.pending {
  border-left: 3px solid #f59e0b;
}

.resume-item.pending span:first-child {
  color: #92400e;
}

.resume-item span:last-child {
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.success-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.success-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  background: white;
  border-radius: 6px;
  border: 1px solid #bbf7d0;
}

.success-item span:first-child {
  font-size: 0.7rem;
  color: #166534;
  margin-bottom: 0.25rem;
}

.success-item span:last-child {
  font-size: 0.85rem;
  font-weight: 700;
  color: #16a34a;
}
</style>
