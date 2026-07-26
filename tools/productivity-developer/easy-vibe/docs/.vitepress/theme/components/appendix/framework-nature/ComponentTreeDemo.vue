<template>
  <div class="component-tree-demo">
    <div class="demo-header">
      <span class="title">{{ t('componentTree.title') }}</span>
      <span class="subtitle">{{ t('componentTree.subtitle') }}</span>
    </div>

    <div class="demo-body">
      <div class="tree-panel">
        <div class="tree-title">{{ t('componentTree.treeTitle') }}</div>
        <div class="tree-list">
          <div
            v-for="comp in components"
            :key="comp.id"
            :class="['tree-item', { active: selected === comp.id }]"
            :style="{ paddingLeft: comp.depth * 1 + 'rem' }"
            @click="selected = comp.id"
          >
            <span class="tree-icon">{{ comp.icon }}</span>
            <span class="tree-name">{{ comp.name }}</span>
            <span v-if="comp.reused" class="reuse-badge">×{{ comp.reused }}</span>
          </div>
        </div>
      </div>

      <div class="preview-panel">
        <div class="tree-title">{{ t('componentTree.previewTitle') }}</div>
        <div class="page-mock">
          <div
            :class="['mock-navbar', { highlighted: selected === 'navbar' }]"
            @click="selected = 'navbar'"
          >
            <span>🏠 {{ t('componentTree.siteName') }}</span>
            <span
              :class="['mock-search', { highlighted: selected === 'search' }]"
              @click.stop="selected = 'search'"
            >🔍 {{ t('componentTree.searchBox') }}</span>
            <span
              :class="['mock-cart-icon', { highlighted: selected === 'cart' }]"
              @click.stop="selected = 'cart'"
            >🛒 {{ t('componentTree.cart') }}</span>
          </div>
          <div class="mock-content">
            <div
              v-for="i in 3"
              :key="i"
              :class="['mock-product-card', { highlighted: selected === 'product' }]"
              @click="selected = 'product'"
            >
              <div class="mock-img">📦</div>
              <div class="mock-info">
                <div class="mock-product-name">
                  {{ t('componentTree.productName', { index: i }) }}
                </div>
                <div class="mock-price">¥{{ i * 99 + 100 }}</div>
              </div>
            </div>
          </div>
          <div
            :class="['mock-footer', { highlighted: selected === 'footer' }]"
            @click="selected = 'footer'"
          >
            {{ t('componentTree.copyright') }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedComp" class="detail-card">
      <div class="detail-name">{{ selectedComp.icon }} {{ selectedComp.name }}</div>
      <div class="detail-desc">{{ selectedComp.desc }}</div>
      <div class="detail-tags">
        <span class="detail-tag">{{ t('componentTree.dataIndependent') }}</span>
        <span class="detail-tag">{{ t('componentTree.styleIsolated') }}</span>
        <span v-if="selectedComp.reused" class="detail-tag reuse">
          {{ t('componentTree.reused', { count: selectedComp.reused }) }}
        </span>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ t('componentTree.infoStrong') }}</strong>
      <span>{{ t('componentTree.info') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { frameworkNatureLocale } from '../../../locales/framework-nature/index.js'

const { t, messages } = useI18n(frameworkNatureLocale)

const selected = ref('product')

const components = computed(() => messages.value.componentTree.components)

const selectedComp = computed(() =>
  components.value.find((c) => c.id === selected.value)
)
</script>

<style scoped>
.component-tree-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .title {
  font-size: 1rem;
  font-weight: 600;
}

.demo-header .subtitle {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.demo-body {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.tree-panel,
.preview-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.tree-title {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.tree-list {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.tree-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.tree-item:hover {
  background: var(--vp-c-bg-alt);
}

.tree-item.active {
  background: rgba(59, 130, 246, 0.08);
  border-color: var(--vp-c-brand);
}

.tree-icon {
  font-size: 0.85rem;
}

.tree-name {
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
}

.reuse-badge {
  margin-left: auto;
  background: rgba(16, 185, 129, 0.1);
  color: var(--vp-c-green-1);
  font-size: 0.65rem;
  padding: 1px 5px;
  border-radius: 4px;
  font-weight: 600;
}

.page-mock {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  font-size: 0.75rem;
}

.mock-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.4rem 0.6rem;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.2s;
}

.mock-search,
.mock-cart-icon {
  cursor: pointer;
  padding: 0.15rem 0.35rem;
  border-radius: 3px;
  transition: all 0.2s;
}

.mock-content {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  flex-wrap: wrap;
}

.mock-product-card {
  flex: 1;
  min-width: 60px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.4rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.mock-img {
  font-size: 1.2rem;
  margin-bottom: 0.2rem;
}

.mock-product-name {
  font-size: 0.7rem;
  font-weight: 600;
}

.mock-price {
  font-size: 0.65rem;
  color: var(--vp-c-danger-1);
}

.mock-footer {
  padding: 0.3rem 0.6rem;
  background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 0.65rem;
  cursor: pointer;
  transition: all 0.2s;
}

.highlighted {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: -1px;
  background: rgba(59, 130, 246, 0.06) !important;
}

.detail-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
}

.detail-name {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
}

.detail-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.detail-tags {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.detail-tag {
  font-size: 0.68rem;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

.detail-tag.reuse {
  background: rgba(16, 185, 129, 0.1);
  color: var(--vp-c-green-1);
  border-color: var(--vp-c-green-1);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
  color: var(--vp-c-text-1);
}

@media (max-width: 720px) {
  .demo-body {
    grid-template-columns: 1fr;
  }

  .mock-content {
    flex-direction: column;
  }
}
</style>
