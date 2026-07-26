<template>
  <div class="cache-consistency">
    <div
      v-for="strategy in strategies"
      :key="strategy.name"
      class="strategy"
    >
      <div class="strategy-title">
        {{ strategy.name }}
      </div>
      <p>{{ strategy.desc }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { cacheDesignLocale } from '../../../locales/cache-design/index.js'

const { messages } = useI18n(cacheDesignLocale)
const strategies = computed(() => messages.value.consistency.strategies)
</script>

<style scoped>
.cache-consistency {
  display: grid;
  gap: 12px;
  margin: 20px 0;
}

.strategy {
  padding: 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.strategy-title {
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.strategy p {
  margin: 6px 0 0;
  color: var(--vp-c-text-2);
}
</style>
