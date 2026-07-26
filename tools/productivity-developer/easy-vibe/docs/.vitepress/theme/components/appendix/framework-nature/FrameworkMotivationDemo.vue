<template>
  <div class="framework-motivation">
    <div v-for="card in cards" :key="card.title" class="card">
      <div class="card-title">
        {{ card.title }}
      </div>
      <ul>
        <li v-for="item in card.items" :key="item">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { frameworkNatureLocale } from '../../../locales/framework-nature/index.js'

const { messages } = useI18n(frameworkNatureLocale)

const cards = computed(() => messages.value.frameworkMotivation.cards)
</script>

<style scoped>
.framework-motivation {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  font-size: 0.82rem;
}

.card {
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  padding: 0.75rem;
}

.card-title {
  font-weight: 600;
  margin-bottom: 0.4rem;
}

ul {
  margin: 0;
  padding-left: 1.1rem;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}

li + li {
  margin-top: 0.25rem;
}

@media (max-width: 768px) {
  .framework-motivation {
    grid-template-columns: 1fr;
  }
}
</style>
