<template>
  <div class="code-to-instruction-demo">
    <h4>{{ t('computerOrganization.codeToInstruction.title') }}</h4>
    <p class="desc">{{ t('computerOrganization.codeToInstruction.desc') }}</p>

    <div class="example-selector">
      <button
        v-for="(ex, i) in examples"
        :key="i"
        :class="['ex-btn', { active: selectedExample === i }]"
        @click="selectedExample = i"
      >
        <code>{{ ex.code }}</code>
      </button>
    </div>

    <div class="translation-chain">
      <div
        v-for="(stage, j) in examples[selectedExample].stages"
        :key="j"
        :class="['stage-card', { active: activeStage === j }]"
        @click="activeStage = j"
      >
        <div class="stage-header">
          <span class="stage-num">{{ j + 1 }}</span>
          <span class="stage-name">{{ stage.name }}</span>
        </div>
        <pre class="stage-code">{{ stage.content }}</pre>
        <div v-if="activeStage === j" class="stage-explain">
          {{ stage.explain }}
        </div>
      </div>

      <div
        v-for="j in examples[selectedExample].stages.length - 1"
        :key="'arrow-' + j"
        class="chain-arrow"
        :style="{ order: j * 2 }"
      >
        ↓
      </div>
    </div>

    <div class="key-insight">
      <div class="insight-title">{{ t('computerOrganization.codeToInstruction.insightTitle') }}</div>
      <div class="insight-text">
        {{ t('computerOrganization.codeToInstruction.insightText') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals/index.js'

const { t, messages } = useI18n(computerFundamentalsLocale)

const selectedExample = ref(0)
const activeStage = ref(0)

const examples = computed(() => messages.value.computerOrganization.codeToInstruction.examples)
</script>

<style scoped>
.code-to-instruction-demo {
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}
h4 { margin: 0 0 4px; }
.desc { color: var(--vp-c-text-2); font-size: 14px; margin: 0 0 16px; }

.example-selector { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
.ex-btn {
  padding: 6px 14px; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 13px; transition: all 0.2s;
}
.ex-btn.active { background: var(--vp-c-brand-1); color: #fff; border-color: var(--vp-c-brand-1); }
.ex-btn code { font-size: 13px; }

.translation-chain {
  display: flex; flex-direction: column; gap: 0; margin-bottom: 16px;
}
.stage-card {
  border: 1px solid var(--vp-c-divider); border-radius: 8px;
  background: var(--vp-c-bg); overflow: hidden; cursor: pointer;
  transition: all 0.2s; order: 0;
}
.stage-card:nth-child(1) { order: 0; }
.stage-card:nth-child(3) { order: 2; }
.stage-card:nth-child(5) { order: 4; }
.stage-card:nth-child(7) { order: 6; }
.stage-card.active { border-color: var(--vp-c-brand-1); box-shadow: 0 0 0 1px var(--vp-c-brand-1); }
.stage-header {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 12px; background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}
.stage-num {
  width: 22px; height: 22px; border-radius: 50%; background: var(--vp-c-brand-1);
  color: #fff; display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 600;
}
.stage-name { font-size: 13px; font-weight: 600; }
.stage-code {
  padding: 10px 12px; margin: 0; font-size: 12px; line-height: 1.5;
  white-space: pre-wrap; max-height: 120px; overflow-y: auto;
}
.stage-explain {
  padding: 8px 12px; font-size: 12px; line-height: 1.6;
  background: var(--vp-c-brand-soft); border-top: 1px solid var(--vp-c-divider);
}
.chain-arrow {
  text-align: center; font-size: 18px; color: var(--vp-c-brand-1);
  font-weight: 700; padding: 4px 0;
}

.key-insight {
  padding: 12px 14px; background: var(--vp-c-brand-soft); border-radius: 8px;
}
.insight-title { font-weight: 600; font-size: 13px; margin-bottom: 6px; }
.insight-text { font-size: 13px; line-height: 1.6; }
</style>
