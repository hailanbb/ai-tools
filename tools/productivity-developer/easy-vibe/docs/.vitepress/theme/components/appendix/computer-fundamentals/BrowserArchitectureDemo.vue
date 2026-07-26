<template>
  <div class="browser-demo">
    <div class="demo-title">{{ t('powerOnToWeb.browser.title') }}</div>
    <div class="arch">
      <div
        v-for="mod in modules"
        :key="mod.name"
        class="mod-card"
        :class="{ active: active === mod.name }"
        @click="active = active === mod.name ? '' : mod.name"
      >
        <div class="mod-header">
          <span class="mod-icon">{{ mod.icon }}</span>
          <span class="mod-name">{{ mod.name }}</span>
        </div>
        <transition name="expand">
          <div v-if="active === mod.name" class="mod-detail">
            <div class="mod-desc">{{ mod.desc }}</div>
            <div class="mod-tags">
              <span v-for="tag in mod.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals'

const { t, messages } = useI18n(computerFundamentalsLocale)
const active = ref('')
const modules = computed(() => messages.value.powerOnToWeb.browser.modules)
</script>

<style scoped>
.browser-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}
.demo-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.8rem;
}
.arch {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.4rem;
}
.mod-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem 0.6rem;
  cursor: pointer;
  transition: border-color 0.2s;
  user-select: none;
}
.mod-card.active { border-color: var(--vp-c-brand); }
.mod-header { display: flex; align-items: center; gap: 0.4rem; }
.mod-icon { font-size: 1rem; }
.mod-name { font-size: 0.72rem; font-weight: 600; color: var(--vp-c-text-1); }
.mod-detail { margin-top: 0.4rem; padding-top: 0.4rem; border-top: 1px solid var(--vp-c-divider); }
.mod-desc { font-size: 0.65rem; color: var(--vp-c-text-3); line-height: 1.5; }
.mod-tags { display: flex; flex-wrap: wrap; gap: 0.25rem; margin-top: 0.35rem; }
.tag {
  font-size: 0.6rem;
  padding: 0.1rem 0.35rem;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  color: var(--vp-c-brand);
}
.expand-enter-active, .expand-leave-active { transition: all 0.2s ease; }
.expand-enter-from, .expand-leave-to { opacity: 0; max-height: 0; }
.expand-enter-to, .expand-leave-from { opacity: 1; max-height: 8rem; }
@media (max-width: 480px) {
  .arch { grid-template-columns: 1fr; }
}
</style>
