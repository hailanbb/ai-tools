<template>
  <div class="tech-radar-demo">
    <div class="demo-label">{{ t('techRadar.title') }}</div>

    <div class="radar-container">
      <div class="radar-rings">
        <div v-for="ring in rings" :key="ring.name" class="ring" :class="ring.cls">
          <span class="ring-label">{{ ring.name }}</span>
        </div>
      </div>
      <div
        v-for="tech in techs"
        :key="tech.name"
        class="tech-dot"
        :class="[tech.category, { active: selected === tech.name }]"
        :style="tech.pos"
        @click="selected = selected === tech.name ? '' : tech.name"
      >
        <span class="dot-label">{{ tech.name }}</span>
      </div>
    </div>

    <div class="legend">
      <span v-for="c in cats" :key="c.cls" class="legend-item">
        <span class="legend-dot" :class="c.cls"></span>{{ c.name }}
      </span>
    </div>

    <Transition name="fade">
      <div v-if="selectedTech" class="info-card">
        <h4>{{ selectedTech.name }}</h4>
        <div class="info-ring">{{ t('techRadar.ringLabel', { ring: selectedTech.ring }) }}</div>
        <p>{{ selectedTech.desc }}</p>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { engineeringExcellenceLocale } from '../../../locales/engineering-excellence/index.js'

const { t, messages } = useI18n(engineeringExcellenceLocale)
const selected = ref('')
const rings = computed(() => messages.value.techRadar.rings)
const cats = computed(() => messages.value.techRadar.categories)
const techs = computed(() => messages.value.techRadar.techs)
const selectedTech = computed(() => techs.value.find(t => t.name === selected.value))
</script>

<style scoped>
.tech-radar-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}
.demo-label { font-size: 0.78rem; font-weight: bold; color: var(--vp-c-text-2); margin-bottom: 1rem; text-align: center; }

.radar-container { position: relative; width: 100%; padding-top: 70%; margin-bottom: 1rem; }

.radar-rings { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }

.ring {
  border-radius: 50%;
  position: absolute;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 4px;
}
.ring .ring-label { font-size: 0.68rem; font-weight: 600; opacity: 0.6; }
.ring.adopt { width: 90%; height: 90%; background: #d1fae520; border: 1px dashed #6ee7b7; }
.ring.trial { width: 66%; height: 66%; background: #dbeafe20; border: 1px dashed #93c5fd; }
.ring.assess { width: 42%; height: 42%; background: #fef3c720; border: 1px dashed #fcd34d; }
.ring.hold { width: 20%; height: 20%; background: #fee2e220; border: 1px dashed #fca5a5; }

.tech-dot {
  position: absolute;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  white-space: nowrap;
}
.tech-dot:hover { transform: scale(1.1); }
.tech-dot.active { box-shadow: 0 0 0 2px var(--vp-c-brand); transform: scale(1.15); }

.tech-dot.lang { background: #dbeafe; color: #1e40af; }
.tech-dot.framework { background: #d1fae5; color: #065f46; }
.tech-dot.tool { background: #fef3c7; color: #92400e; }
.tech-dot.platform { background: #fae8ff; color: #86198f; }

:root.dark .tech-dot.lang { background: #172554; color: #93c5fd; }
:root.dark .tech-dot.framework { background: #022c22; color: #6ee7b7; }
:root.dark .tech-dot.tool { background: #451a03; color: #fcd34d; }
:root.dark .tech-dot.platform { background: #4a044e; color: #f0abfc; }

.legend { display: flex; justify-content: center; gap: 1rem; font-size: 0.75rem; color: var(--vp-c-text-3); margin-bottom: 0.8rem; flex-wrap: wrap; }
.legend-item { display: flex; align-items: center; gap: 4px; }
.legend-dot { width: 10px; height: 10px; border-radius: 50%; }
.legend-dot.lang { background: #3b82f6; }
.legend-dot.framework { background: #10b981; }
.legend-dot.tool { background: #f59e0b; }
.legend-dot.platform { background: #d946ef; }

.info-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; padding: 1rem; background: var(--vp-c-bg); }
.info-card h4 { margin: 0 0 4px; font-size: 1rem; }
.info-ring { font-size: 0.75rem; color: var(--vp-c-text-3); margin-bottom: 6px; }
.info-card p { font-size: 0.85rem; color: var(--vp-c-text-2); margin: 0; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
