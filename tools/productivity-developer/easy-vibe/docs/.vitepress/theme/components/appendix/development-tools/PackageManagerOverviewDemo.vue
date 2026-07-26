<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="title">{{ t('packageManager.title') }}</span>
      <span class="subtitle">{{ t('packageManager.subtitle') }}</span>
    </div>

    <div class="control-panel">
      <button
        v-for="eco in ecosystems"
        :key="eco.id"
        :class="['eco-btn', { active: activeEco === eco.id }]"
        @click="selectEco(eco.id)"
      >
        <span class="eco-icon">{{ eco.icon }}</span>
        <span class="eco-name">{{ eco.name }}</span>
      </button>
    </div>

    <div class="visualization-area">
      <div class="managers-grid">
        <div
          v-for="pm in currentManagers"
          :key="pm.id"
          :class="['pm-card', { active: activePm === pm.id }]"
          @click="selectPm(pm.id)"
        >
          <div class="pm-badge" :style="{ background: pm.color }">{{ pm.name }}</div>
          <div class="pm-tagline">{{ pm.tagline }}</div>
        </div>
      </div>

      <transition name="fade">
        <div v-if="currentPm" class="pm-detail">
          <div class="detail-top">
            <span class="detail-name" :style="{ color: currentPm.color }">{{ currentPm.name }}</span>
            <span class="detail-full">{{ currentPm.fullName }}</span>
          </div>

          <div class="detail-sections">
            <div class="detail-section">
              <div class="section-label">{{ t('packageManager.installCommand') }}</div>
              <div class="cmd-list">
                <div v-for="(cmd, i) in currentPm.commands" :key="i" class="cmd-row">
                  <span class="cmd-op">{{ cmd.op }}</span>
                  <code class="cmd-code">{{ cmd.cmd }}</code>
                </div>
              </div>
            </div>

            <div class="detail-section">
              <div class="section-label">{{ t('packageManager.configFiles') }}</div>
              <div class="file-list">
                <div v-for="f in currentPm.files" :key="f.name" class="file-row">
                  <code class="file-name">{{ f.name }}</code>
                  <span class="file-desc">{{ f.desc }}</span>
                </div>
              </div>
            </div>

            <div class="detail-section">
              <div class="section-label">{{ t('packageManager.features') }}</div>
              <div class="feature-list">
                <div v-for="feat in currentPm.features" :key="feat" class="feature-tag">{{ feat }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="pm-placeholder">
          {{ t('packageManager.placeholder') }}
        </div>
      </transition>
    </div>

    <div class="info-box">
      <strong>{{ t('packageManager.infoStrong') }}</strong>{{ t('packageManager.info') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { developmentToolsLocale } from '../../../locales/development-tools/index.js'

const { t, messages } = useI18n(developmentToolsLocale)

const activeEco = ref('js')
const activePm = ref('npm')

const ecosystems = computed(() => messages.value.packageManager.ecosystems)
const allManagers = computed(() => messages.value.packageManager.allManagers)

const currentManagers = computed(() => allManagers.value[activeEco.value] || [])

const currentPm = computed(() => {
  const list = currentManagers.value
  return list.find(p => p.id === activePm.value) || null
})

function selectEco(id) {
  activeEco.value = id
  activePm.value = allManagers.value[id]?.[0]?.id || null
}

function selectPm(id) {
  activePm.value = id
}
</script>

<style scoped>
.demo-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  margin: 1.5rem 0;
  background: var(--vp-c-bg);
}

.demo-header {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  padding: 0.85rem 1.1rem 0.7rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.subtitle {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.control-panel {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  flex-wrap: wrap;
}

.eco-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  transition: all 0.15s;
}

.eco-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.eco-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: #fff;
}

.eco-icon {
  font-size: 1rem;
}

.visualization-area {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.managers-grid {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.pm-card {
  flex: 1;
  min-width: 100px;
  padding: 0.6rem 0.8rem;
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;
  background: var(--vp-c-bg-soft);
}

.pm-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-1px);
}

.pm-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-alt);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--vp-c-brand) 20%, transparent);
}

.pm-badge {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  color: #fff;
  font-size: 0.78rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.pm-tagline {
  font-size: 0.76rem;
  color: var(--vp-c-text-3);
  line-height: 1.3;
}

.pm-detail {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 0.9rem 1rem;
}

.pm-placeholder {
  text-align: center;
  padding: 1.5rem;
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
}

.detail-top {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  margin-bottom: 0.8rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-name {
  font-size: 1.05rem;
  font-weight: 700;
}

.detail-full {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.detail-sections {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.8rem;
}

@media (max-width: 640px) {
  .detail-sections {
    grid-template-columns: 1fr;
  }
}

.section-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.4rem;
}

.cmd-list {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.cmd-row {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.cmd-op {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}

.cmd-code {
  font-size: 0.76rem;
  background: var(--vp-c-bg-alt);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  color: var(--vp-c-brand);
  word-break: break-all;
}

.file-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.file-row {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.file-name {
  font-size: 0.78rem;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-alt);
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
  width: fit-content;
}

.file-desc {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}

.feature-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.feature-tag {
  font-size: 0.73rem;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.info-box {
  display: block;
  padding: 0.65rem 1rem;
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.info-box strong {
  white-space: nowrap;
  color: var(--vp-c-text-1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
