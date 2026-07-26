<template>
  <div class="session-vs-jwt-demo">
    <div class="header">
      <div class="title">
        {{ t('sessionJwt.title') }}
      </div>
      <div class="subtitle">
        {{ t('sessionJwt.subtitle') }}
      </div>
    </div>

    <div class="grid">
      <div class="card">
        <div class="card-title">
          {{ t('sessionJwt.scenarioTitle') }}
        </div>

        <label class="label">{{ t('sessionJwt.clientLabel') }}</label>
        <div class="row">
          <button
            v-for="option in clients"
            :key="option.id"
            class="chip"
            :class="{ active: client === option.id }"
            @click="client = option.id"
          >
            {{ option.label }}
          </button>
        </div>

        <label class="label">{{ t('sessionJwt.revokeLabel') }}</label>
        <div class="row">
          <button
            class="chip"
            :class="{ active: revoke === 'yes' }"
            @click="revoke = 'yes'"
          >
            {{ t('sessionJwt.yes') }}
          </button>
          <button
            class="chip"
            :class="{ active: revoke === 'no' }"
            @click="revoke = 'no'"
          >
            {{ t('sessionJwt.no') }}
          </button>
        </div>

        <label class="label">{{ t('sessionJwt.corsLabel') }}</label>
        <div class="row">
          <button
            class="chip"
            :class="{ active: cors === 'yes' }"
            @click="cors = 'yes'"
          >
            {{ t('sessionJwt.yes') }}
          </button>
          <button
            class="chip"
            :class="{ active: cors === 'no' }"
            @click="cors = 'no'"
          >
            {{ t('sessionJwt.no') }}
          </button>
        </div>

        <label class="label">{{ t('sessionJwt.scaleLabel') }}</label>
        <div class="row">
          <button
            class="chip"
            :class="{ active: scale === 'yes' }"
            @click="scale = 'yes'"
          >
            {{ t('sessionJwt.yes') }}
          </button>
          <button
            class="chip"
            :class="{ active: scale === 'no' }"
            @click="scale = 'no'"
          >
            {{ t('sessionJwt.no') }}
          </button>
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          {{ t('sessionJwt.recommendationTitle') }}
        </div>
        <div class="recommend">
          <div class="pill primary">
            {{ recommendation.title }}
          </div>
          <div class="desc">
            {{ recommendation.desc }}
          </div>
        </div>

        <div class="box">
          <div class="box-title">
            {{ t('sessionJwt.why') }}
          </div>
          <ul class="list">
            <li
              v-for="(x, i) in recommendation.reasons"
              :key="i"
            >
              {{ x }}
            </li>
          </ul>
        </div>

        <div class="box">
          <div class="box-title">
            {{ t('sessionJwt.tipsTitle') }}
          </div>
          <ul class="list">
            <li
              v-for="(x, i) in recommendation.tips"
              :key="i"
            >
              {{ x }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        {{ t('sessionJwt.pitfallsTitle') }}
      </div>
      <ul class="list">
        <li
          v-for="item in pitfalls"
          :key="item.strong"
        >
          <strong>{{ item.strong }}</strong>{{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { authDesignLocale } from '../../../locales/auth-design/index.js'

const { t, messages } = useI18n(authDesignLocale)
const clients = computed(() => messages.value.sessionJwt.clients)
const pitfalls = computed(() => messages.value.sessionJwt.pitfalls)

const client = ref('web')
const revoke = ref('yes')
const cors = ref('no')
const scale = ref('yes')

const recommendation = computed(() => {
  const reasons = []
  const tips = []
  const locale = messages.value.sessionJwt

  const isWeb = client.value === 'web'
  const needsRevoke = revoke.value === 'yes'
  const needsCors = cors.value === 'yes'
  const needsScale = scale.value === 'yes'

  if (isWeb && !needsCors && needsRevoke) {
    const session = locale.sessionRecommendation
    reasons.push(session.reasonSameSite)
    if (needsScale) reasons.push(session.reasonScale)
    tips.push(...session.tips)
    return {
      title: session.title,
      desc: session.desc,
      reasons,
      tips
    }
  }

  const token = locale.tokenRecommendation
  reasons.push(token.reasonToken)
  if (needsRevoke) reasons.push(token.reasonRevoke)
  if (!needsRevoke) reasons.push(token.reasonNoRevoke)
  tips.push(...token.tips)
  return {
    title: token.title,
    desc: token.desc,
    reasons,
    tips
  }
})
</script>

<style scoped>
.session-vs-jwt-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 1.5rem;
  margin: 0.5rem 0;
}

.header {
  margin-bottom: 1rem;
}

.title {
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.subtitle {
  margin-top: 0.25rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.card-title {
  font-weight: 800;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
}

.label {
  display: block;
  font-weight: 800;
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  margin: 0.75rem 0 0.35rem;
}

.row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.chip {
  padding: 0.4rem 0.65rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-weight: 700;
  font-size: 0.875rem;
}

.chip.active {
  border-color: rgba(var(--vp-c-brand-rgb), 0.35);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.12);
}

.recommend {
  margin-bottom: 0.75rem;
}

.pill {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.pill.primary {
  border-color: rgba(var(--vp-c-brand-rgb), 0.35);
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  color: var(--vp-c-text-1);
}

.desc {
  color: var(--vp-c-text-2);
  line-height: 1.75;
}

.box {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
  margin-top: 0.75rem;
}

.box-title {
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.list {
  margin: 0;
  padding-left: 1.1rem;
  color: var(--vp-c-text-2);
  line-height: 1.75;
}

@media (max-width: 720px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
