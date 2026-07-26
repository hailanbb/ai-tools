<template>
  <div class="role-policy-demo">
    <div class="demo-header">
      <span class="icon">🎭</span>
      <span class="title">{{ t('rolePolicy.title') }}</span>
      <span class="subtitle">{{ t('rolePolicy.subtitle') }}</span>
    </div>

    <div class="main-area">
      <div class="role-section">
        <div
          class="role-card"
          @click="showTrust = !showTrust"
        >
          <span class="role-icon">🎭</span>
          <div class="role-info">
            <span class="role-name">CrossAccountS3AccessRole</span>
            <span class="role-type">{{ t('rolePolicy.roleType') }}</span>
          </div>
          <span class="expand-icon">{{ showTrust ? '▼' : '▶' }}</span>
        </div>
        <div
          v-if="showTrust"
          class="trust-policy"
        >
          <div class="trust-title">
            {{ t('rolePolicy.trustTitle') }}
          </div>
          <div
            v-for="(trust, i) in trustPolicy"
            :key="i"
            class="trust-item"
          >
            <span class="principal">{{ trust.principal }}</span>
            <span class="action">{{ trust.action }}</span>
          </div>
        </div>
      </div>

      <div class="policies-section">
        <div
          v-for="(policy, index) in attachedPolicies"
          :key="index"
          class="policy-card"
          :class="{ selected: selectedPolicy === index }"
          @click="selectedPolicy = index"
        >
          <div class="policy-header">
            <span class="policy-icon">{{ policy.icon }}</span>
            <span class="policy-name">{{ policy.name }}</span>
          </div>
          <div
            v-if="selectedPolicy === index"
            class="policy-perms"
          >
            <div
              v-for="(p, i) in policy.permissions"
              :key="i"
              class="perm"
            >
              <span
                class="effect"
                :class="p.effect.toLowerCase()"
              >{{ p.effect }}</span>
              <span class="action">{{ p.action }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>{{ t('common.coreIdea') }}</strong>{{ t('rolePolicy.info') }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { cloudIamLocale } from '../../../locales/cloud-iam/index.js'

const { t, messages } = useI18n(cloudIamLocale)
const showTrust = ref(false)
const selectedPolicy = ref(0)
const trustPolicy = computed(() => messages.value.rolePolicy.trustPolicy)
const attachedPolicies = computed(() => messages.value.rolePolicy.attachedPolicies)
</script>

<style scoped>
.role-policy-demo {
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

.main-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 640px) {
  .main-area { grid-template-columns: 1fr; }
}

.role-section { display: flex; flex-direction: column; gap: 0.4rem; }

.role-card {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.6rem;
  cursor: pointer;
  transition: all 0.2s;
}

.role-card:hover { border-color: var(--vp-c-brand); }

.role-icon { font-size: 1.5rem; }
.role-info { flex: 1; }
.role-name { display: block; font-weight: 600; font-size: 0.85rem; color: var(--vp-c-text-1); }
.role-type { display: block; font-size: 0.7rem; color: var(--vp-c-text-2); }
.expand-icon { font-size: 0.7rem; color: var(--vp-c-text-3); }

.trust-policy {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem;
}

.trust-title { font-size: 0.75rem; font-weight: 600; margin-bottom: 0.4rem; color: var(--vp-c-text-1); }

.trust-item {
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  padding: 0.3rem 0.4rem;
  margin-bottom: 0.25rem;
  font-size: 0.7rem;
}

.trust-item .principal { font-weight: 600; color: var(--vp-c-brand-1); display: block; }
.trust-item .action { color: var(--vp-c-text-2); }

.policies-section { display: flex; flex-direction: column; gap: 0.4rem; }

.policy-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.policy-card:hover { border-color: var(--vp-c-brand); }
.policy-card.selected { border-color: var(--vp-c-brand); background: var(--vp-c-bg-alt); }

.policy-header { display: flex; align-items: center; gap: 0.4rem; }
.policy-icon { font-size: 1rem; }
.policy-name { font-weight: 600; font-size: 0.8rem; color: var(--vp-c-text-1); }

.policy-perms { margin-top: 0.4rem; padding-top: 0.4rem; border-top: 1px solid var(--vp-c-divider); }

.perm {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.2rem 0;
  font-size: 0.7rem;
}

.effect {
  padding: 0.1rem 0.3rem;
  border-radius: 2px;
  font-weight: 600;
  font-size: 0.6rem;
}

.effect.allow { background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); }
.effect.deny { background: rgba(239, 68, 68, 0.15); color: #dc2626; }

.perm .action { font-family: var(--vp-font-family-mono); color: var(--vp-c-text-2); }

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
