<template>
  <div class="architecture-comparison-demo">
    <div class="demo-header">
      <span class="icon">🏗️</span>
      <span class="title">{{ t('architectureComparison.title') }}</span>
      <span class="subtitle">{{ t('architectureComparison.subtitle') }}</span>
    </div>

    <div class="toggle-buttons">
      <button
        :class="['toggle-btn', { active: activeType === 'frontend' }]"
        @click="activeType = 'frontend'"
      >
        <span class="btn-icon">🎨</span>
        {{ t('architectureComparison.frontendButton') }}
      </button>
      <button
        :class="['toggle-btn', { active: activeType === 'backend' }]"
        @click="activeType = 'backend'"
      >
        <span class="btn-icon">⚙️</span>
        {{ t('architectureComparison.backendButton') }}
      </button>
    </div>

    <div class="architecture-display">
      <div v-if="activeType === 'frontend'" class="architecture-layers">
        <div
          v-for="(layer, index) in frontendLayers"
          :key="layer.id"
          class="layer-box"
          :class="[layer.class, { active: activeLayer === layer.id }]"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @click="setActiveLayer(layer.id)"
        >
          <div class="layer-header">
            <span class="layer-icon">{{ layer.icon }}</span>
            <span class="layer-name">{{ layer.name }}</span>
            <span class="layer-badge">{{ layer.badge }}</span>
          </div>
          <div class="layer-content">
            <div class="duty">{{ layer.duty }}</div>
            <div class="example">🌰 {{ layer.example }}</div>
          </div>
          <div v-if="index < frontendLayers.length - 1" class="layer-arrow">
            <span class="arrow-icon">↓</span>
            <span class="arrow-text">{{ layer.arrow }}</span>
          </div>
        </div>
      </div>

      <div v-else class="architecture-layers">
        <div
          v-for="(layer, index) in backendLayers"
          :key="layer.id"
          class="layer-box"
          :class="[layer.class, { active: activeLayer === layer.id }]"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @click="setActiveLayer(layer.id)"
        >
          <div class="layer-header">
            <span class="layer-icon">{{ layer.icon }}</span>
            <span class="layer-name">{{ layer.name }}</span>
            <span class="layer-badge">{{ layer.badge }}</span>
          </div>
          <div class="layer-content">
            <div class="duty">{{ layer.duty }}</div>
            <div class="example">🌰 {{ layer.example }}</div>
          </div>
          <div v-if="index < backendLayers.length - 1" class="layer-arrow">
            <span class="arrow-icon">↓</span>
            <span class="arrow-text">{{ layer.arrow }}</span>
          </div>
        </div>
      </div>
    </div>

    <Transition name="slide">
      <div v-if="currentLayer" class="detail-panel">
        <div class="detail-header">
          <span class="detail-icon">{{ currentLayer.icon }}</span>
          <span class="detail-title">{{ currentLayer.name }}</span>
        </div>
        <div class="detail-content">
          <div class="detail-section">
            <div class="section-title">{{ t('architectureComparison.typicalFiles') }}</div>
            <div class="file-list">
              <code v-for="file in currentLayer.files" :key="file" class="file-tag">{{ file }}</code>
            </div>
          </div>
          <div class="detail-section">
            <div class="section-title">{{ t('architectureComparison.principles') }}</div>
            <ul class="principle-list">
              <li v-for="principle in currentLayer.principles" :key="principle">{{ principle }}</li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('architectureComparison.coreIdeaLabel') }}</strong>{{ t('architectureComparison.coreIdea') }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { projectArchitectureLocale } from '../../../locales/project-architecture/index.js'

const { t, messages } = useI18n(projectArchitectureLocale)

const activeType = ref('frontend')
const activeLayer = ref(null)

const frontendLayers = computed(() => messages.value.architectureComparison.frontendLayers)
const backendLayers = computed(() => messages.value.architectureComparison.backendLayers)

const currentLayer = computed(() => {
  const layers = activeType.value === 'frontend' ? frontendLayers.value : backendLayers.value
  return layers.find(layer => layer.id === activeLayer.value)
})

function setActiveLayer(id) {
  activeLayer.value = activeLayer.value === id ? null : id
}
</script>

<style scoped>
.architecture-comparison-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
  max-height: 700px;
  overflow-y: auto;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

/* Toggle buttons */
.toggle-buttons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.toggle-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.toggle-btn:hover {
  border-color: var(--vp-c-brand);
}

.toggle-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.btn-icon {
  font-size: 1.1rem;
}

/* Architecture layers */
.architecture-layers {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.layer-box {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  animation: fadeInUp 0.3s ease forwards;
  opacity: 0;
  transform: translateY(10px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.layer-box:hover {
  border-color: var(--vp-c-brand);
  transform: translateX(4px);
}

.layer-box.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

/* Layer colors */
.views-layer {
  border-left: 4px solid #3498db;
}

.components-layer {
  border-left: 4px solid #2ecc71;
}

.hooks-layer {
  border-left: 4px solid #9b59b6;
}

.services-layer {
  border-left: 4px solid #e67e22;
}

.utils-layer {
  border-left: 4px solid #95a5a6;
}

.controller-layer {
  border-left: 4px solid #3498db;
}

.service-layer {
  border-left: 4px solid #2ecc71;
}

.repository-layer {
  border-left: 4px solid #e67e22;
}

.model-layer {
  border-left: 4px solid #9b59b6;
}

.layer-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.layer-icon {
  font-size: 1.2rem;
}

.layer-name {
  font-weight: bold;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.layer-badge {
  margin-left: auto;
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.layer-content {
  font-size: 0.85rem;
}

.duty {
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.example {
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
}

.layer-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.25rem;
  color: var(--vp-c-text-3);
  font-size: 0.75rem;
}

.arrow-icon {
  font-size: 1rem;
}

/* Detail panel */
.detail-panel {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-icon {
  font-size: 1.25rem;
}

.detail-title {
  font-weight: bold;
  font-size: 1rem;
}

.detail-section {
  margin-bottom: 0.75rem;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.file-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.file-tag {
  padding: 0.2rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  font-family: monospace;
}

.principle-list {
  margin: 0;
  padding-left: 1.2rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.principle-list li {
  margin-bottom: 0.25rem;
}

/* Info box */
.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 1rem;
  display: flex;
  gap: 0.25rem;
}

.info-box .icon {
  flex-shrink: 0;
}

/* Responsive */
@media (max-width: 640px) {
  .toggle-btn {
    font-size: 0.8rem;
    padding: 0.5rem;
  }
  
  .layer-name {
    font-size: 0.85rem;
  }
  
  .duty, .example {
    font-size: 0.75rem;
  }
}
</style>
