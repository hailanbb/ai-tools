<template>
  <div class="dependency-graph-demo">
    <div class="demo-header">
      <span class="icon">🕸️</span>
      <span class="title">{{ t('dependencyGraph.title') }}</span>
      <span class="subtitle">{{ t('dependencyGraph.subtitle') }}</span>
    </div>

    <div class="graph-container">
      <svg
        class="graph-svg"
        viewBox="0 0 500 300"
      >
        <defs>
          <marker
            id="arrow"
            markerWidth="8"
            markerHeight="6"
            refX="18"
            refY="3"
            orient="auto"
          >
            <polygon
              points="0 0, 8 3, 0 6"
              fill="var(--vp-c-text-3)"
            />
          </marker>
        </defs>

        <line
          v-for="edge in edges"
          :key="edge.id"
          :x1="getNode(edge.source).x"
          :y1="getNode(edge.source).y"
          :x2="getNode(edge.target).x"
          :y2="getNode(edge.target).y"
          stroke="var(--vp-c-text-3)"
          stroke-width="1.5"
          marker-end="url(#arrow)"
        />

        <g
          v-for="node in nodes"
          :key="node.id"
          :transform="`translate(${node.x}, ${node.y})`"
        >
          <circle
            :r="node.r"
            :fill="node.color"
            stroke="white"
            stroke-width="2"
          />
          <text
            y="4"
            text-anchor="middle"
            fill="white"
            font-size="12"
          >{{ node.icon }}</text>
          <text
            :y="node.r + 14"
            text-anchor="middle"
            fill="var(--vp-c-text-1)"
            font-size="10"
          >{{ node.name }}</text>
        </g>
      </svg>
    </div>

    <div class="legend">
      <div class="legend-item">
        <span class="dot entry" />{{ t('dependencyGraph.entryFile') }}
      </div>
      <div class="legend-item">
        <span class="dot module" />{{ t('dependencyGraph.module') }}
      </div>
      <div class="legend-item">
        <span class="arrow">→</span>{{ t('dependencyGraph.dependency') }}
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.coreIdea') }}</strong>{{ t('dependencyGraph.infoBoxContent') }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { frontendEngineeringLocale } from '../../../locales/frontend-engineering/index.js'

const { t } = useI18n(frontendEngineeringLocale)

const nodes = ref([
  { id: 'main', name: 'main.js', icon: '🚀', color: '#646cff', r: 22, x: 250, y: 60 },
  { id: 'utils', name: 'utils.js', icon: '🛠️', color: '#ff6b6b', r: 18, x: 100, y: 150 },
  { id: 'components', name: 'components/', icon: '🧩', color: '#4ecdc4', r: 20, x: 250, y: 150 },
  { id: 'api', name: 'api.js', icon: '🔌', color: '#ffe66d', r: 18, x: 400, y: 150 },
  { id: 'hooks', name: 'hooks.js', icon: '⚓', color: '#ff8b94', r: 16, x: 180, y: 240 },
  { id: 'config', name: 'config.js', icon: '⚙️', color: '#c7ceea', r: 14, x: 320, y: 240 }
])

const edges = ref([
  { id: 1, source: 'main', target: 'utils' },
  { id: 2, source: 'main', target: 'components' },
  { id: 3, source: 'main', target: 'api' },
  { id: 4, source: 'components', target: 'utils' },
  { id: 5, source: 'components', target: 'hooks' },
  { id: 6, source: 'api', target: 'config' }
])

const getNode = (id) => nodes.value.find(n => n.id === id)
</script>

<style scoped>
.dependency-graph-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.graph-container {
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

.graph-svg {
  width: 100%;
  height: auto;
}

.legend {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.75rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.legend-item { display: flex; align-items: center; gap: 0.3rem; }

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot.entry { background: #646cff; }
.dot.module { background: #4ecdc4; }
.arrow { color: var(--vp-c-text-3); }

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
}

.info-box .icon { margin-right: 0.25rem; }
</style>
