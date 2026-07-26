<template>
  <div class="best-practices-demo">
    <div class="demo-header">
      <span class="icon">✅</span>
      <span class="title">{{ t('bestPractices.title') }}</span>
      <span class="subtitle">{{ t('bestPractices.subtitle') }}</span>
    </div>

    <div class="practices-list">
      <div
        v-for="(practice, index) in bestPractices"
        :key="index"
        class="practice-item"
        :class="{ active: expandedCard === index }"
        @click="toggleCard(index)"
      >
        <div class="item-header">
          <span class="item-icon">{{ practice.icon }}</span>
          <span class="item-title">{{ practice.title }}</span>
          <span
            class="item-priority"
            :class="practice.priority"
          >{{ practice.priorityText }}</span>
        </div>
        <div
          v-if="expandedCard === index"
          class="item-body"
        >
          <p class="item-desc">
            {{ practice.description }}
          </p>
          <div class="item-checks">
            <span
              v-for="(item, i) in practice.checklist.slice(0, 3)"
              :key="i"
              class="check-tag"
            >✓ {{ item }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.coreIdea') }}</strong>{{ t('bestPractices.info') }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { cloudIamLocale } from '../../../locales/cloud-iam/index.js'

const { t, messages } = useI18n(cloudIamLocale)
const expandedCard = ref(0)
const bestPractices = computed(() => messages.value.bestPractices.items)

function toggleCard(index) {
  expandedCard.value = expandedCard.value === index ? null : index
}
</script>

<style scoped>
.best-practices-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.practices-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}

.practice-item {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.practice-item:hover { border-color: var(--vp-c-brand); }
.practice-item.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-alt);
}

.item-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem;
}

.item-icon { font-size: 1rem; }
.item-title { font-weight: 600; font-size: 0.85rem; flex: 1; }

.item-priority {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
}

.item-priority.p0 { background: var(--vp-c-danger); color: #fff; }
.item-priority.p1 { background: var(--vp-c-warning); color: #fff; }
.item-priority.p2 { background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); }

.item-body {
  padding: 0 0.6rem 0.6rem;
  border-top: 1px solid var(--vp-c-divider);
  margin-top: 0;
  padding-top: 0.5rem;
}

.item-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin: 0 0 0.5rem;
  line-height: 1.4;
}

.item-checks {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.check-tag {
  font-size: 0.7rem;
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 3px;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box .icon { flex-shrink: 0; }
.info-box strong { color: var(--vp-c-text-1); }
</style>
