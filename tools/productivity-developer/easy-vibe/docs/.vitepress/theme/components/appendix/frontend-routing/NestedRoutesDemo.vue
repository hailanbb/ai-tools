<template>
  <div class="nested-routes-demo">
    <div class="demo-header">
      <span class="icon">🪆</span>
      <span class="title">{{ t('nestedRoutes.title') }}</span>
      <span class="subtitle">{{ t('nestedRoutes.subtitle') }}</span>
    </div>

    <div class="intro-text">
      {{ t('nestedRoutes.intro.prefix') }}<span class="highlight">{{ t('nestedRoutes.intro.highlight1') }}</span>{{ t('nestedRoutes.intro.middle') }}<span class="highlight">{{ t('nestedRoutes.intro.highlight2') }}</span>{{ t('nestedRoutes.intro.suffix') }}
    </div>

    <div class="demo-content">
      <div class="routes-hierarchy">
        <div class="tree-view">
          <div
            v-for="node in treeData"
            :key="node.path"
            class="tree-node"
            :style="{ paddingLeft: `${node.level * 20}px` }"
            @click="selectNode(node)"
          >
            <div
              :class="[
                'node-content',
                { active: currentPath === node.path }
              ]"
            >
              <span class="node-icon">{{ node.children?.length ? '📁' : '📄' }}</span>
              <span class="node-name">{{ node.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="render-preview">
        <div class="preview-header">
          <h5>{{ t('nestedRoutes.renderView') }}</h5>
          <span class="current-path">{{ currentPath || '/' }}</span>
        </div>

        <div class="router-view-hierarchy">
          <div
            v-for="(route, index) in activeRouteChain"
            :key="route.path"
            class="router-view-level"
            :style="{ marginLeft: `${index * 16}px` }"
          >
            <div class="router-view-box">
              <div class="view-label">
                <span class="view-icon">📦</span>
                <span class="view-name">{{ route.name }}</span>
              </div>
              <div class="view-path">
                {{ route.path || '/' }}
              </div>
            </div>
          </div>
        </div>

        <div class="breadcrumb">
          <span
            v-for="(crumb, index) in breadcrumbs"
            :key="index"
            class="breadcrumb-item"
            @click="navigateTo(crumb.path)"
          >
            {{ crumb.name }}
            <span
              v-if="index < breadcrumbs.length - 1"
              class="separator"
            >/</span>
          </span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.coreConcept') }}</strong>{{ t('nestedRoutes.info') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { frontendRoutingLocale } from '../../../locales/frontend-routing/index.js'

const { t } = useI18n(frontendRoutingLocale)
const currentPath = ref('/dashboard')

const routeConfig = [
  {
    path: '/',
    name: 'Layout',
    component: 'Layout',
    children: [
      {
        path: '',
        name: 'Home',
        component: 'Home'
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: 'Dashboard'
      },
      {
        path: 'users',
        name: 'Users',
        component: 'UserLayout',
        children: [
          {
            path: '',
            name: 'UserList',
            component: 'UserList'
          },
          {
            path: ':id',
            name: 'UserDetail',
            component: 'UserDetail'
          }
        ]
      }
    ]
  }
]

const flattenRoutes = (routes, level = 0, parentPath = '') => {
  const result = []
  routes.forEach(route => {
    const fullPath = route.path
      ? `${parentPath}/${route.path}`.replace(/\/+/g, '/')
      : parentPath || '/'
    const node = {
      ...route,
      fullPath,
      level,
      children: []
    }
    if (route.children?.length) {
      node.children = flattenRoutes(route.children, level + 1, fullPath)
    }
    result.push(node)
  })
  return result
}

const treeData = computed(() => {
  const flatten = (routes, level = 0) => {
    const result = []
    routes.forEach(route => {
      const node = {
        name: route.name,
        path: route.path || '/',
        fullPath: route.fullPath,
        level,
        component: route.component,
        children: route.children?.length ? flatten(route.children, level + 1) : null
      }
      result.push(node)
    })
    return result
  }
  return flatten(flattenRoutes(routeConfig))
})

const activeRouteChain = computed(() => {
  const findChain = (routes, target, chain = []) => {
    for (const route of routes) {
      const currentChain = [...chain, route]
      if (route.path === target || route.fullPath === target) {
        return currentChain
      }
      if (route.children?.length) {
        const found = findChain(route.children, target, currentChain)
        if (found) return found
      }
    }
    return null
  }
  return findChain(flattenRoutes(routeConfig), currentPath.value) || []
})

const breadcrumbs = computed(() => {
  return activeRouteChain.value.map(route => ({
    name: route.name,
    path: route.fullPath || route.path
  }))
})

const selectNode = (node) => {
  currentPath.value = node.fullPath || node.path
}

const navigateTo = (path) => {
  currentPath.value = path
}
</script>

<style scoped>
.nested-routes-demo {
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

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.routes-hierarchy {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.tree-view {
  max-height: 280px;
  
}

.tree-node {
  margin: 2px 0;
}

.node-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.node-content:hover {
  background: var(--vp-c-bg-soft);
}

.node-content.active {
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand);
}

.node-icon {
  font-size: 0.85rem;
}

.node-name {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.render-preview {
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.preview-header h5 {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.current-path {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-family: monospace;
  background: var(--vp-c-bg);
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
}

.router-view-hierarchy {
  padding: 0.75rem;
  min-height: 180px;
}

.router-view-level {
  margin-bottom: 0.5rem;
}

.router-view-box {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
}

.view-label {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-bottom: 0.25rem;
}

.view-icon {
  font-size: 0.75rem;
}

.view-name {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.view-path {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  font-family: monospace;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
  overflow-x: auto;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  cursor: pointer;
  white-space: nowrap;
}

.breadcrumb-item:hover {
  color: var(--vp-c-brand);
}

.separator {
  color: var(--vp-c-text-3);
  margin: 0 0.125rem;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 1rem;
}

.info-box .icon { margin-right: 0.25rem; }

@media (max-width: 768px) {
  .demo-content {
    grid-template-columns: 1fr;
  }

  .breadcrumb {
    flex-wrap: wrap;
  }
}
</style>
