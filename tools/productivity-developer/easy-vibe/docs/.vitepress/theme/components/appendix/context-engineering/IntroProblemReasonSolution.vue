<template>
  <div class="intro-prs">
    <div
      v-for="column in messages.introPrs.columns"
      :key="column.title"
      class="prs-item"
    >
      <div class="prs-title">
        {{ column.title }}
      </div>
      <ul>
        <li
          v-for="item in column.items"
          :key="item.strong"
        >
          <strong>{{ item.strong }}</strong>：{{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from '../../../composables/useI18n.js'
import { contextEngineeringLocale } from '../../../locales/context-engineering/index.js'

const { messages } = useI18n(contextEngineeringLocale)
</script>

<style scoped>
.intro-prs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  font-size: 0.82rem;
}

.prs-item {
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  padding: 0.75rem;
}

.prs-title {
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
  .intro-prs {
    grid-template-columns: 1fr;
  }
}
</style>
