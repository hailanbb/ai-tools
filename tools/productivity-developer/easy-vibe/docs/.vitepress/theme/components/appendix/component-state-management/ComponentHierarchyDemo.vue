<template>
  <div class="component-hierarchy-demo">
    <div class="demo-header">
      <span class="icon">🌳</span>
      <span class="title">{{ t('hierarchy.title') }}</span>
      <span class="subtitle">{{ t('hierarchy.subtitle') }}</span>
    </div>

    <div class="intro-text">
      {{ t('hierarchy.introPrefix') }}<span class="highlight">{{ t('hierarchy.introHighlight') }}</span>{{ t('hierarchy.introSuffix') }}
    </div>

    <div class="demo-content">
      <div class="tree-container">
        <div
          class="tree-node root-node"
          :class="{ active: selectedNode === 'app' }"
          @click="selectNode('app')"
        >
          <div class="node-icon">
            {{ n('app').icon }}
          </div>
          <div class="node-info">
            <div class="node-label">
              {{ n('app').label }}
            </div>
            <div class="node-desc">
              {{ n('app').desc }}
            </div>
          </div>
        </div>

        <div class="tree-children">
          <div class="tree-branch">
            <div class="connector" />
            <div
              class="tree-node"
              :class="{ active: selectedNode === 'header' }"
              @click="selectNode('header')"
            >
              <div class="node-icon">
                {{ n('header').icon }}
              </div>
              <div class="node-info">
                <div class="node-label">
                  {{ n('header').label }}
                </div>
                <div class="node-desc">
                  {{ n('header').desc }}
                </div>
              </div>
            </div>
          </div>

          <div class="tree-branch">
            <div class="connector" />
            <div
              class="tree-node"
              :class="{ active: selectedNode === 'main' }"
              @click="selectNode('main')"
            >
              <div class="node-icon">
                {{ n('main').icon }}
              </div>
              <div class="node-info">
                <div class="node-label">
                  {{ n('main').label }}
                </div>
                <div class="node-desc">
                  {{ n('main').desc }}
                </div>
              </div>
            </div>

            <div class="tree-children">
              <div class="tree-branch">
                <div class="connector" />
                <div
                  class="tree-node"
                  :class="{ active: selectedNode === 'sidebar' }"
                  @click="selectNode('sidebar')"
                >
                  <div class="node-icon">
                    {{ n('sidebar').icon }}
                  </div>
                  <div class="node-info">
                    <div class="node-label">
                      {{ n('sidebar').label }}
                    </div>
                    <div class="node-desc">
                      {{ n('sidebar').desc }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="tree-branch">
                <div class="connector" />
                <div
                  class="tree-node"
                  :class="{ active: selectedNode === 'productlist' }"
                  @click="selectNode('productlist')"
                >
                  <div class="node-icon">
                    {{ n('productlist').icon }}
                  </div>
                  <div class="node-info">
                    <div class="node-label">
                      {{ n('productlist').label }}
                    </div>
                    <div class="node-desc">
                      {{ n('productlist').desc }}
                    </div>
                  </div>
                </div>

                <div class="tree-children">
                  <div class="tree-branch">
                    <div class="connector" />
                    <div
                      class="tree-node leaf"
                      :class="{ active: selectedNode === 'productcard' }"
                      @click="selectNode('productcard')"
                    >
                      <div class="node-icon">
                        {{ n('productcard').icon }}
                      </div>
                      <div class="node-info">
                        <div class="node-label">
                          {{ n('productcard').label }}
                        </div>
                        <div class="node-desc">
                          {{ n('productcard').desc }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="tree-branch">
            <div class="connector" />
            <div
              class="tree-node"
              :class="{ active: selectedNode === 'footer' }"
              @click="selectNode('footer')"
            >
              <div class="node-icon">
                {{ n('footer').icon }}
              </div>
              <div class="node-info">
                <div class="node-label">
                  {{ n('footer').label }}
                </div>
                <div class="node-desc">
                  {{ n('footer').desc }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Transition name="fade">
        <div
          v-if="selectedNodeInfo"
          class="node-details"
        >
          <div class="detail-header">
            <span class="detail-icon">{{ selectedNodeInfo.icon }}</span>
            <span class="detail-title">{{ selectedNodeInfo.title }}</span>
          </div>
          <p class="detail-desc">
            {{ selectedNodeInfo.description }}
          </p>
          <div
            v-if="selectedNodeInfo.props || selectedNodeInfo.events"
            class="detail-info"
          >
            <div
              v-if="selectedNodeInfo.props"
              class="info-section"
            >
              <strong>{{ t('common.receive') }}</strong>
              <span class="prop-tags">{{ selectedNodeInfo.props.join(', ') }}</span>
            </div>
            <div
              v-if="selectedNodeInfo.events"
              class="info-section"
            >
              <strong>{{ t('common.emit') }}</strong>
              <span class="prop-tags">{{ selectedNodeInfo.events.join(', ') }}</span>
            </div>
          </div>
        </div>
      </Transition>

      <div
        v-if="!selectedNode"
        class="hint-text"
      >
        {{ t('hierarchy.hint') }}
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.coreIdea') }}</strong>{{ t('hierarchy.idea') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { componentStateManagementLocale } from '../../../locales/component-state-management/index.js'

const { t, messages } = useI18n(componentStateManagementLocale)

const selectedNode = ref(null)

const nodeInfoMap = computed(() => messages.value.hierarchy.nodes)

const n = (id) => nodeInfoMap.value[id]

const selectedNodeInfo = computed(() => {
  return selectedNode.value ? nodeInfoMap.value[selectedNode.value] : null
})

const selectNode = (nodeId) => {
  selectedNode.value = selectedNode.value === nodeId ? null : nodeId
}
</script>

<style scoped>
.component-hierarchy-demo {
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
  margin-bottom: 0.75rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.demo-content {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
}

.tree-container {
  overflow-x: auto;
}

.tree-children {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.75rem;
  margin-left: 1.5rem;
}

.tree-branch {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.connector {
  width: 16px;
  height: 2px;
  background: var(--vp-c-divider);
  margin-top: 18px;
  position: relative;
}

.connector::before {
  content: '';
  position: absolute;
  left: 0;
  top: -8px;
  width: 2px;
  height: 10px;
  background: var(--vp-c-divider);
}

.tree-node {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 180px;
}

.tree-node:hover {
  border-color: var(--vp-c-brand);
  transform: translateX(4px);
}

.tree-node.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  box-shadow: 0 0 0 3px var(--vp-c-brand-delta);
}

.root-node {
  background: linear-gradient(135deg, var(--vp-c-brand-soft), var(--vp-c-bg));
  border-width: 3px;
}

.leaf .node-icon {
  opacity: 0.8;
}

.node-icon {
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.node-info {
  display: flex;
  flex-direction: column;
}

.node-label {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--vp-c-text-1);
}

.node-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.15rem;
}

.node-details {
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.detail-icon {
  font-size: 1.25rem;
}

.detail-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.detail-desc {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
}

.info-section strong {
  color: var(--vp-c-text-1);
  flex-shrink: 0;
}

.prop-tags {
  color: var(--vp-c-brand);
  font-family: monospace;
  font-size: 0.75rem;
}

.hint-text {
  text-align: center;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-top: 0.75rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.25rem;
}

@media (max-width: 768px) {
  .tree-node {
    min-width: auto;
  }

  .tree-children {
    margin-left: 1rem;
  }
}
</style>
