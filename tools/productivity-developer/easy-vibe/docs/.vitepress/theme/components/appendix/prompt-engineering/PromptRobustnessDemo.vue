<template>
  <el-card
    class="robustness-card"
    shadow="hover"
  >
    <template #header>
      <div class="card-header">
        <div>
          <h3 class="title">
            {{ t('robustness.title') }}
          </h3>
          <p class="subtitle">
            {{ t('robustness.subtitle') }}
          </p>
        </div>
      </div>
    </template>

    <div class="controls-section">
      <el-row
        :gutter="20"
        align="middle"
      >
        <el-col
          :span="12"
          :xs="24"
        >
          <div class="input-display">
            <span class="label">{{ t('robustness.yourCommand') }}</span>
            <el-tag
              type="info"
              size="large"
              effect="plain"
            >
              {{ t('robustness.commandText') }}
            </el-tag>
          </div>
        </el-col>
        <el-col
          :span="12"
          :xs="24"
        >
          <div class="mode-switch">
            <el-radio-group
              v-model="mode"
              @change="resetState"
            >
              <el-radio-button label="raw">
                {{ t('robustness.modeRaw') }}
              </el-radio-button>
              <el-radio-button label="clarify">
                {{ t('robustness.modeClarify') }}
              </el-radio-button>
              <el-radio-button label="verify">
                {{ t('robustness.modeVerify') }}
              </el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="simulation-area">
      <!-- Mode 1: Direct Generate -->
      <div
        v-if="mode === 'raw'"
        class="scenario raw"
      >
        <div class="chat-bubble ai">
          <div class="avatar-container">
            <el-avatar
              :size="40"
              style="background-color: var(--vp-c-brand)"
            >
              AI
            </el-avatar>
          </div>
          <el-card
            shadow="never"
            class="bubble-content"
          >
            <p>{{ t('robustness.rawMode.intro') }}</p>
            <ol>
              <li>{{ t('robustness.rawMode.item1') }}</li>
              <li>{{ t('robustness.rawMode.item2') }}</li>
              <li>{{ t('robustness.rawMode.item3') }}</li>
            </ol>
            <div class="note">
              {{ t('robustness.rawMode.note') }}
            </div>
          </el-card>
        </div>
        <el-alert
          :title="t('robustness.rawMode.alertTitle')"
          type="error"
          show-icon
          :closable="false"
        />
      </div>

      <!-- Mode 2: Clarify Questions -->
      <div
        v-if="mode === 'clarify'"
        class="scenario clarify"
      >
        <div class="chat-bubble ai">
          <div class="avatar-container">
            <el-avatar
              :size="40"
              style="background-color: var(--vp-c-brand)"
            >
              AI
            </el-avatar>
          </div>
          <el-card
            shadow="never"
            class="bubble-content"
          >
            <p>{{ t('robustness.clarifyMode.intro') }}</p>
            <el-form
              label-position="top"
              size="small"
              class="questions-form"
            >
              <el-row :gutter="12">
                <el-col
                  :span="8"
                  :xs="24"
                >
                  <el-form-item :label="t('robustness.clarifyMode.question1')">
                    <el-select v-model="answers.count">
                      <el-option
                        :label="t('robustness.clarifyMode.question1Opt1')"
                        value="10"
                      />
                      <el-option
                        :label="t('robustness.clarifyMode.question1Opt2')"
                        value="100"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col
                  :span="8"
                  :xs="24"
                >
                  <el-form-item :label="t('robustness.clarifyMode.question2')">
                    <el-select v-model="answers.budget">
                      <el-option
                        :label="t('robustness.clarifyMode.question2Opt1')"
                        value="low"
                      />
                      <el-option
                        :label="t('robustness.clarifyMode.question2Opt2')"
                        value="high"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col
                  :span="8"
                  :xs="24"
                >
                  <el-form-item :label="t('robustness.clarifyMode.question3')">
                    <el-select v-model="answers.type">
                      <el-option
                        :label="t('robustness.clarifyMode.question3Opt1')"
                        value="relax"
                      />
                      <el-option
                        :label="t('robustness.clarifyMode.question3Opt2')"
                        value="active"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-button
                type="primary"
                style="margin-top: 8px"
                @click="generatePlan"
              >
                {{ t('robustness.clarifyMode.generatePlan') }}
              </el-button>
            </el-form>
          </el-card>
        </div>

        <div
          v-if="planResult"
          class="chat-bubble ai result fade-in"
        >
          <div class="avatar-container">
            <el-avatar
              :size="40"
              style="background-color: var(--vp-c-brand)"
            >
              AI
            </el-avatar>
          </div>
          <el-card
            shadow="never"
            class="bubble-content plan-result"
          >
            <p>{{ t('robustness.clarifyMode.resultPrefix', { summary: answerSummary }) }}</p>
            <div class="plan-card">
              <h3>{{ planResult.title }}</h3>
              <p>{{ planResult.desc }}</p>
            </div>
          </el-card>
        </div>
      </div>

      <!-- Mode 3: Self-Correct -->
      <div
        v-if="mode === 'verify'"
        class="scenario verify"
      >
        <el-alert
          type="info"
          show-icon
          :closable="false"
          style="margin-bottom: 20px"
        >
          <template #title>
            <span v-html="t('robustness.verifyMode.alertTitle')" />
          </template>
        </el-alert>

        <el-steps
          :active="verifyStep"
          align-center
          finish-status="success"
          style="margin-bottom: 24px"
        >
          <el-step
            :title="t('robustness.verifyMode.step1Title')"
            :icon="Edit"
          />
          <el-step
            :title="t('robustness.verifyMode.step2Title')"
            :icon="View"
          />
          <el-step
            :title="t('robustness.verifyMode.step3Title')"
            :icon="CircleCheck"
          />
        </el-steps>

        <div class="monitor-log">
          <el-collapse-transition>
            <div
              v-if="verifyStep >= 1"
              class="log-item"
            >
              <el-tag
                size="small"
                type="info"
              >
                {{ t('robustness.verifyMode.draftTag') }}
              </el-tag>
              <span class="log-text">{{ t('robustness.verifyMode.draftText') }}</span>
            </div>
          </el-collapse-transition>
          <el-collapse-transition>
            <div
              v-if="verifyStep >= 2"
              class="log-item check-fail"
            >
              <el-tag
                size="small"
                type="danger"
              >
                {{ t('robustness.verifyMode.checkTag') }}
              </el-tag>
              <div class="check-list">
                <div class="fail-item">
                  <el-icon color="#f56c6c">
                    <Close />
                  </el-icon> {{ t('robustness.verifyMode.checkItem1') }}
                </div>
                <div class="fail-item">
                  <el-icon color="#f56c6c">
                    <Close />
                  </el-icon> {{ t('robustness.verifyMode.checkItem2') }}
                </div>
              </div>
            </div>
          </el-collapse-transition>
          <el-collapse-transition>
            <div
              v-if="verifyStep >= 3"
              class="log-item success"
            >
              <el-tag
                size="small"
                type="success"
              >
                {{ t('robustness.verifyMode.fixedTag') }}
              </el-tag>
              <span class="log-text">{{ t('robustness.verifyMode.fixedText') }}</span>
            </div>
          </el-collapse-transition>
        </div>

        <div
          class="actions"
          style="text-align: center; margin-top: 20px;"
        >
          <el-button
            v-if="verifyStep === 0"
            type="primary"
            size="large"
            @click="runVerify"
          >
            {{ t('common.startRun') }}
          </el-button>
          <el-button
            v-else-if="verifyStep === 3"
            @click="verifyStep = 0"
          >
            {{ t('common.resetDemo') }}
          </el-button>
          <el-button
            v-else
            loading
            disabled
          >
            {{ t('common.processing') }}
          </el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Edit, View, CircleCheck, Close } from '@element-plus/icons-vue'
import { useI18n } from '../../../composables/useI18n.js'
import { promptEngineeringLocale } from '../../../locales/prompt-engineering/index.js'

const { t } = useI18n(promptEngineeringLocale)

const mode = ref('raw') // raw, clarify, verify
const answers = ref({
  count: '10',
  budget: 'low',
  type: 'relax'
})
const planResult = ref(null)
const verifyStep = ref(0)

const resetState = () => {
  planResult.value = null
  verifyStep.value = 0
}

const answerSummary = computed(() => {
  const map = t('robustness.clarifyMode.answerMap')
  return `${map[answers.value.count]} + ${map[answers.value.budget]} + ${map[answers.value.type]}`
})

const generatePlan = () => {
  const { count, budget, type } = answers.value
  const plans = t('robustness.clarifyMode.plans')
  let title = ''

  if (budget === 'high') {
    title = type === 'relax' ? plans.highRelax : plans.highActive
  } else {
    title = type === 'relax' ? plans.lowRelax : plans.lowActive
  }

  const budgetDesc = budget === 'high'
    ? t('robustness.clarifyMode.budgetHigh')
    : t('robustness.clarifyMode.budgetLow')
  const desc = t('robustness.clarifyMode.planDesc', { count, budgetDesc })
  planResult.value = { title, desc }
}

const runVerify = () => {
  verifyStep.value = 1
  setTimeout(() => verifyStep.value = 2, 1000)
  setTimeout(() => verifyStep.value = 3, 2500)
}
</script>

<style scoped>
.robustness-card {
  margin: 16px 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
}

.subtitle {
  margin: 4px 0 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.controls-section {
  margin-bottom: 24px;
  background-color: var(--vp-c-bg-soft);
  padding: 16px;
  border-radius: 6px;
}

.input-display {
  display: flex;
  align-items: center;
  gap: 12px;
}

.label {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.mode-switch {
  display: flex;
  justify-content: flex-end;
}

.simulation-area {
  min-height: 250px;
}

.chat-bubble {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.avatar-container {
  flex-shrink: 0;
}

.bubble-content {
  flex: 1;
  border-radius: 0 12px 12px 12px;
}

.note {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin-top: 8px;
  font-style: italic;
}

.questions-form {
  margin-top: 12px;
  background: var(--vp-c-bg-soft);
  padding: 12px;
  border-radius: 6px;
}

.plan-result {
  border-left: 4px solid var(--vp-c-brand);
}

.plan-card h3 {
  margin: 0 0 8px 0;
  color: var(--vp-c-brand);
}

.plan-card p {
  margin: 0;
  color: var(--vp-c-text-2);
}

.monitor-log {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
}

.log-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}

.log-item:last-child {
  margin-bottom: 0;
}

.log-text {
  font-family: monospace;
  font-size: 13px;
  color: var(--vp-c-text-1);
  margin-top: 2px;
}

.check-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
}

.fail-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--vp-c-danger);
  font-size: 13px;
}

@media (max-width: 768px) {
  .mode-switch {
    justify-content: flex-start;
    margin-top: 12px;
  }
}
</style>
