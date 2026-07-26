<template>
  <div class="embedding-demo">
    <div class="demo-header">
      <h4>{{ t('concept.title') }}</h4>
      <p class="desc">{{ t('concept.desc') }}</p>
    </div>

    <div class="controls">
      <button
        v-for="cat in categories"
        :key="cat.key"
        class="cat-btn"
        :class="{ active: activeCategory === cat.key }"
        @click="activeCategory = cat.key"
      >
        {{ cat.label }}
      </button>
    </div>

    <div class="canvas-wrap">
      <svg
        ref="svgRef"
        viewBox="0 0 500 400"
        class="embed-svg"
      >
        <line x1="50" y1="370" x2="480" y2="370" stroke="var(--vp-c-divider)" stroke-width="1" />
        <line x1="50" y1="370" x2="50" y2="20" stroke="var(--vp-c-divider)" stroke-width="1" />
        <text x="265" y="395" text-anchor="middle" fill="var(--vp-c-text-3)" font-size="12">{{ t('concept.axisX') }}</text>
        <text x="15" y="195" text-anchor="middle" fill="var(--vp-c-text-3)" font-size="12" transform="rotate(-90, 15, 195)">{{ t('concept.axisY') }}</text>

        <ellipse
          v-for="cluster in currentClusters"
          :key="cluster.label"
          :cx="cluster.cx"
          :cy="cluster.cy"
          :rx="cluster.rx"
          :ry="cluster.ry"
          :fill="cluster.color"
          fill-opacity="0.08"
          :stroke="cluster.color"
          stroke-opacity="0.3"
          stroke-width="1.5"
          stroke-dasharray="4 3"
        />

        <g
          v-for="(point, idx) in currentPoints"
          :key="point.word"
          class="point-group"
          @mouseenter="hoveredPoint = idx"
          @mouseleave="hoveredPoint = -1"
        >
          <circle
            :cx="point.x"
            :cy="point.y"
            :r="hoveredPoint === idx ? 8 : 6"
            :fill="point.color"
            stroke="#fff"
            stroke-width="1.5"
            class="data-point"
          />
          <text
            :x="point.x"
            :y="point.y - 12"
            text-anchor="middle"
            :fill="point.color"
            font-size="12"
            font-weight="600"
          >
            {{ point.word }}
          </text>
        </g>

        <text
          v-for="cluster in currentClusters"
          :key="'label-' + cluster.label"
          :x="cluster.cx"
          :y="cluster.cy + cluster.ry + 16"
          text-anchor="middle"
          :fill="cluster.color"
          font-size="11"
          font-weight="500"
          opacity="0.7"
        >
          {{ cluster.label }}
        </text>
      </svg>

      <div v-if="hoveredPoint >= 0" class="hover-info">
        <span class="hw">{{ currentPoints[hoveredPoint].word }}</span>
        <span class="hc">{{ t('concept.vectorLabel') }}: [{{ currentPoints[hoveredPoint].vec.join(', ') }}]</span>
      </div>
    </div>

    <div class="info-box">
      <p>
        <span class="icon">&#x1F4A1;</span>
        {{ t('concept.info') }}<strong>{{ t('concept.infoStrong') }}</strong>。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { embeddingVectorLocale } from '../../../locales/embedding-vector/index.js'

const { t, messages } = useI18n(embeddingVectorLocale)
const activeCategory = ref('animals-royalty')
const hoveredPoint = ref(-1)
const categories = computed(() => messages.value.concept.categories)
const dataMap = computed(() => messages.value.concept.dataMap)
const currentClusters = computed(() => dataMap.value[activeCategory.value].clusters)
const currentPoints = computed(() => dataMap.value[activeCategory.value].points)
</script>

<style scoped>
.embedding-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
}

.demo-header h4 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.desc {
  margin: 0 0 1rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}

.controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.cat-btn {
  padding: 6px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.cat-btn:hover {
  background: var(--vp-c-bg-alt);
}

.cat-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
}

.canvas-wrap {
  position: relative;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.embed-svg {
  width: 100%;
  height: auto;
  display: block;
}

.data-point {
  cursor: pointer;
  transition: r 0.2s;
}

.point-group {
  transition: opacity 0.2s;
}

.hover-info {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hw {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.hc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
}

.info-box {
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 4px;
}

.info-box p {
  margin: 0;
}

@media (max-width: 640px) {
  .embedding-demo {
    padding: 1rem;
  }
}
</style>
