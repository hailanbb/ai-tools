<template>
  <div class="cisc-risc-demo">
    <h4>{{ t('computerOrganization.ciscRisc.title') }}</h4>
    <p class="desc">{{ t('computerOrganization.ciscRisc.desc') }}</p>

    <div class="arch-toggle">
      <button
        :class="['toggle-btn', { active: view === 'cisc' }]"
        @click="view = 'cisc'"
      >
        CISC (x86)
      </button>
      <button
        :class="['toggle-btn', { active: view === 'both' }]"
        @click="view = 'both'"
      >
        {{ t('computerOrganization.ciscRisc.compare') }}
      </button>
      <button
        :class="['toggle-btn', { active: view === 'risc' }]"
        @click="view = 'risc'"
      >
        RISC (ARM)
      </button>
    </div>

    <div v-if="view === 'both'" class="comparison-grid">
      <div v-for="dim in dimensions" :key="dim.label" class="dim-row">
        <div class="dim-cisc">{{ dim.cisc }}</div>
        <div class="dim-label">{{ dim.label }}</div>
        <div class="dim-risc">{{ dim.risc }}</div>
      </div>
    </div>

    <div v-else class="arch-detail">
      <div class="detail-card">
        <div class="card-header" :class="view">
          <span class="card-title">{{ archData[view].name }}</span>
          <span class="card-full">{{ archData[view].full }}</span>
        </div>
        <div class="card-philosophy">
          <span class="phi-label">{{ t('computerOrganization.ciscRisc.philosophyLabel') }}</span>
          <span>{{ archData[view].philosophy }}</span>
        </div>
        <div class="card-analogy">
          <span class="ana-label">{{ t('computerOrganization.ciscRisc.analogyLabel') }}</span>
          <span>{{ archData[view].analogy }}</span>
        </div>
        <div class="card-example">
          <div class="example-title">{{ archData[view].exampleTitle }}</div>
          <pre class="example-code">{{ archData[view].example }}</pre>
          <div class="example-note">{{ archData[view].exampleNote }}</div>
        </div>
        <div class="card-products">
          <span class="prod-label">{{ t('computerOrganization.ciscRisc.productsLabel') }}</span>
          <span v-for="p in archData[view].products" :key="p" class="prod-tag">{{ p }}</span>
        </div>
      </div>
    </div>

    <div class="real-world">
      <div class="rw-title">{{ t('computerOrganization.ciscRisc.realWorldTitle') }}</div>
      <div class="rw-items">
        <div v-for="item in realWorld" :key="item.device" class="rw-item">
          <span class="rw-device">{{ item.device }}</span>
          <span class="rw-arch">{{ item.arch }}</span>
          <span class="rw-why">{{ item.why }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals/index.js'

const { t, messages } = useI18n(computerFundamentalsLocale)

const view = ref('both')

const dimensions = computed(() => messages.value.computerOrganization.ciscRisc.dimensions)
const archData = computed(() => messages.value.computerOrganization.ciscRisc.archData)
const realWorld = computed(() => messages.value.computerOrganization.ciscRisc.realWorld)
</script>

<style scoped>
.cisc-risc-demo {
  padding: 20px; border: 1px solid var(--vp-c-divider);
  border-radius: 12px; margin: 16px 0; background: var(--vp-c-bg-soft);
}
h4 { margin: 0 0 4px; }
.desc { color: var(--vp-c-text-2); font-size: 14px; margin: 0 0 16px; }

.arch-toggle { display: flex; gap: 4px; margin-bottom: 16px; background: var(--vp-c-bg); border-radius: 8px; padding: 4px; }
.toggle-btn {
  flex: 1; padding: 8px; border: none; border-radius: 6px;
  background: transparent; cursor: pointer; font-size: 13px; font-weight: 600; transition: all 0.2s;
}
.toggle-btn.active { background: var(--vp-c-brand-1); color: #fff; }

.comparison-grid { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
.dim-row { display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; align-items: center; }
.dim-cisc, .dim-risc {
  padding: 8px 12px; border-radius: 6px; font-size: 12px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.dim-cisc { text-align: right; }
.dim-label {
  padding: 4px 10px; background: var(--vp-c-brand-1); color: #fff;
  border-radius: 12px; font-size: 11px; font-weight: 600; white-space: nowrap;
}

.arch-detail { margin-bottom: 16px; }
.detail-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg); overflow: hidden; }
.card-header { padding: 10px 14px; display: flex; align-items: center; gap: 10px; }
.card-header.cisc { background: #dbeafe; }
.card-header.risc { background: #dcfce7; }
.card-title { font-size: 16px; font-weight: 700; }
.card-full { font-size: 12px; color: var(--vp-c-text-3); }
.card-philosophy, .card-analogy { padding: 8px 14px; font-size: 13px; border-bottom: 1px solid var(--vp-c-divider); }
.phi-label, .ana-label { font-weight: 600; font-size: 12px; color: var(--vp-c-text-3); margin-right: 6px; }
.card-example { padding: 12px 14px; border-bottom: 1px solid var(--vp-c-divider); }
.example-title { font-size: 12px; font-weight: 600; margin-bottom: 6px; }
.example-code { padding: 8px 10px; margin: 0; font-size: 12px; line-height: 1.5; background: var(--vp-c-bg-soft); border-radius: 4px; white-space: pre-wrap; }
.example-note { font-size: 11px; color: var(--vp-c-text-3); margin-top: 6px; }
.card-products { padding: 10px 14px; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.prod-label { font-size: 12px; color: var(--vp-c-text-3); font-weight: 600; }
.prod-tag { font-size: 11px; padding: 2px 8px; background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); border-radius: 4px; }

.real-world { padding: 12px 14px; background: var(--vp-c-brand-soft); border-radius: 8px; }
.rw-title { font-weight: 600; font-size: 13px; margin-bottom: 8px; }
.rw-items { display: flex; flex-direction: column; gap: 6px; }
.rw-item { display: flex; align-items: center; gap: 8px; font-size: 12px; padding: 6px 8px; background: var(--vp-c-bg); border-radius: 6px; }
.rw-device { font-weight: 600; min-width: 110px; }
.rw-arch { padding: 2px 8px; background: var(--vp-c-brand-soft); border-radius: 4px; font-weight: 500; white-space: nowrap; }
.rw-why { color: var(--vp-c-text-2); }

@media (max-width: 640px) {
  .dim-row { grid-template-columns: 1fr; gap: 4px; }
  .dim-cisc { text-align: left; }
  .dim-label { justify-self: start; }
  .rw-item { flex-wrap: wrap; }
}
</style>
