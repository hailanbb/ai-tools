<template>
  <div class="ssh-auth-demo">
    <div class="demo-header">
      <span class="title">{{ t('sshAuth.title') }}</span>
      <span class="subtitle">{{ t('sshAuth.subtitle') }}</span>
    </div>

    <div class="control-panel">
      <div class="scenario-btns">
        <button
          v-for="s in scenarios"
          :key="s.id"
          :class="['scenario-btn', { active: activeScenario === s.id }]"
          @click="activeScenario = s.id"
        >
          {{ s.label }}
        </button>
      </div>
    </div>

    <div class="visualization-area">
      <div v-if="activeScenario === 'compare'" class="compare-section">
        <div class="compare-grid">
          <div class="compare-card password">
            <div class="card-icon">🔑</div>
            <div class="card-title">{{ t('sshAuth.passwordTitle') }}</div>
            <div class="card-flow">
              <div v-for="(step, i) in passwordFlow" :key="i" class="flow-step">
                <span class="step-num">{{ i + 1 }}</span>
                <span class="step-text">{{ step }}</span>
              </div>
            </div>
            <div class="card-verdict danger">
              <span class="verdict-icon">⚠️</span>
              <span>{{ t('sshAuth.passwordVerdict') }}</span>
            </div>
          </div>

          <div class="compare-card key">
            <div class="card-icon">🔐</div>
            <div class="card-title">{{ t('sshAuth.keyTitle') }}</div>
            <div class="card-flow">
              <div v-for="(step, i) in keyFlow" :key="i" class="flow-step">
                <span class="step-num">{{ i + 1 }}</span>
                <span class="step-text">{{ step }}</span>
              </div>
            </div>
            <div class="card-verdict success">
              <span class="verdict-icon">✅</span>
              <span>{{ t('sshAuth.keyVerdict') }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeScenario === 'keygen'" class="keygen-section">
        <div class="keygen-visual">
          <div class="keygen-command">
            <code>ssh-keygen -t ed25519 -C "your@email.com"</code>
            <button
              class="gen-btn"
              :disabled="isGenerating"
              @click="generateKeys"
            >
              {{ isGenerating ? t('sshAuth.generating') : t('sshAuth.generate') }}
            </button>
          </div>

          <div class="key-pair" :class="{ generated: keysGenerated }">
            <div class="key-card private" :class="{ visible: keysGenerated }">
              <div class="key-header">
                <span class="key-icon">🔒</span>
                <span class="key-name">{{ t('sshAuth.privateKey') }}</span>
              </div>
              <div class="key-location">~/.ssh/id_ed25519</div>
              <div class="key-content">
                <code>{{ privateKeyDisplay }}</code>
              </div>
              <div class="key-rule danger">{{ t('sshAuth.privateRule') }}</div>
            </div>

            <div class="key-arrow" :class="{ visible: keysGenerated }">
              <span class="arrow-text">{{ t('sshAuth.relation') }}</span>
              <span class="arrow-icon">↔</span>
            </div>

            <div class="key-card public" :class="{ visible: keysGenerated }">
              <div class="key-header">
                <span class="key-icon">🌍</span>
                <span class="key-name">{{ t('sshAuth.publicKey') }}</span>
              </div>
              <div class="key-location">~/.ssh/id_ed25519.pub</div>
              <div class="key-content">
                <code>{{ publicKeyDisplay }}</code>
              </div>
              <div class="key-rule success">{{ t('sshAuth.publicRule') }}</div>
            </div>
          </div>

          <div v-if="keysGenerated" class="key-analogy">
            <strong>{{ t('sshAuth.analogyStrong') }}</strong>{{ t('sshAuth.analogy') }}
          </div>
        </div>
      </div>

      <div v-if="activeScenario === 'auth'" class="auth-section">
        <div class="auth-controls">
          <button
            class="action-btn"
            :disabled="authStep > 0 && authStep < 5"
            @click="startAuth"
          >
            {{
              authStep === 0
                ? t('sshAuth.startAuth')
                : authStep >= 5
                  ? t('sshAuth.restart')
                  : t('sshAuth.authenticating')
            }}
          </button>
        </div>

        <div class="auth-flow">
          <div class="auth-parties">
            <div class="party client">
              <div class="party-icon">💻</div>
              <div class="party-name">{{ t('sshAuth.clientName') }}</div>
              <div class="party-has">{{ t('sshAuth.clientHas') }}</div>
            </div>

            <div class="auth-messages">
              <div
                :class="['msg', { active: authStep >= 1 }]"
                class="msg-right"
              >
                <span class="msg-label">{{ authMessages[0].label }}</span>
                <span class="msg-detail">{{ authMessages[0].detail }}</span>
              </div>
              <div :class="['msg', { active: authStep >= 2 }]" class="msg-left">
                <span class="msg-label">{{ authMessages[1].label }}</span>
                <span class="msg-detail">{{ authMessages[1].detail }}</span>
              </div>
              <div
                :class="['msg', { active: authStep >= 3 }]"
                class="msg-right"
              >
                <span class="msg-label">{{ authMessages[2].label }}</span>
                <span class="msg-detail">{{ authMessages[2].detail }}</span>
              </div>
              <div :class="['msg', { active: authStep >= 4 }]" class="msg-left">
                <span class="msg-label">{{ authMessages[3].label }}</span>
                <span class="msg-detail">{{ authMessages[3].detail }}</span>
              </div>
              <div :class="['msg', 'msg-result', { active: authStep >= 5 }]">
                <span class="msg-label">{{ authMessages[4].label }}</span>
                <span class="msg-detail">{{ authMessages[4].detail }}</span>
              </div>
            </div>

            <div class="party server">
              <div class="party-icon">🖥️</div>
              <div class="party-name">{{ t('sshAuth.serverName') }}</div>
              <div class="party-has">{{ t('sshAuth.serverHas') }}</div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeScenario === 'uses'" class="uses-section">
        <div class="uses-grid">
          <div v-for="use in commonUses" :key="use.name" class="use-card">
            <div class="use-icon">{{ use.icon }}</div>
            <div class="use-name">{{ use.name }}</div>
            <div class="use-cmd">
              <code>{{ use.command }}</code>
            </div>
            <div class="use-desc">{{ use.desc }}</div>
          </div>
        </div>

        <div class="config-tips">
          <div class="tip-title">{{ t('sshAuth.configTitle') }}</div>
          <pre class="tip-code"><code>Host my-server
  HostName 192.168.1.100
  User deploy
  IdentityFile ~/.ssh/id_ed25519

Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519</code></pre>
          <div class="tip-result">
            {{ t('sshAuth.configResult') }} <code>ssh my-server</code> {{ t('sshAuth.configSuffix') }}
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ t('sshAuth.coreStrong') }}</strong>
      <span v-if="activeScenario === 'compare'">{{ t('sshAuth.core.compare') }}</span>
      <span v-else-if="activeScenario === 'keygen'">{{ t('sshAuth.core.keygen') }}</span>
      <span v-else-if="activeScenario === 'auth'">{{ t('sshAuth.core.auth') }}</span>
      <span v-else>{{ t('sshAuth.core.uses') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { developmentToolsLocale } from '../../../locales/development-tools/index.js'

const { t, messages } = useI18n(developmentToolsLocale)

const activeScenario = ref('compare')

const scenarios = computed(() => messages.value.sshAuth.scenarios)
const passwordFlow = computed(() => messages.value.sshAuth.passwordFlow)
const keyFlow = computed(() => messages.value.sshAuth.keyFlow)
const authMessages = computed(() => messages.value.sshAuth.authMessages)

const isGenerating = ref(false)
const keysGenerated = ref(false)
const privateKeyDisplay = ref(t('sshAuth.waitingPrivate'))
const publicKeyDisplay = ref(t('sshAuth.waitingPublic'))

watch(messages, () => {
  privateKeyDisplay.value = keysGenerated.value ? t('sshAuth.generatedPrivate') : t('sshAuth.waitingPrivate')
  publicKeyDisplay.value = keysGenerated.value ? t('sshAuth.generatedPublic') : t('sshAuth.waitingPublic')
})

const generateKeys = async () => {
  if (isGenerating.value) return
  isGenerating.value = true
  keysGenerated.value = false

  await new Promise((r) => setTimeout(r, 800))

  privateKeyDisplay.value = t('sshAuth.generatedPrivate')
  publicKeyDisplay.value = t('sshAuth.generatedPublic')

  keysGenerated.value = true
  isGenerating.value = false
}

const authStep = ref(0)

const startAuth = async () => {
  if (authStep.value > 0 && authStep.value < 5) return
  authStep.value = 0

  for (let i = 1; i <= 5; i++) {
    await new Promise((r) => setTimeout(r, 800))
    authStep.value = i
  }
}

const commonUses = computed(() => messages.value.sshAuth.commonUses)
</script>

<style scoped>
.ssh-auth-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
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
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
}

.control-panel {
  background: var(--vp-c-bg);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 0.75rem;
}

.scenario-btns {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.scenario-btn {
  padding: 0.35rem 0.7rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.82rem;
  transition: all 0.2s;
}

.scenario-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

/* Compare Section */
.compare-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.compare-card {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.card-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.card-title {
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.card-flow {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 0.5rem;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
}

.step-num {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-alt);
  border-radius: 50%;
  font-size: 0.7rem;
  font-weight: bold;
  flex-shrink: 0;
}

.card-verdict {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.card-verdict.danger {
  background: rgba(239, 68, 68, 0.1);
  color: var(--vp-c-danger-1);
}

.card-verdict.success {
  background: rgba(16, 185, 129, 0.1);
  color: var(--vp-c-green-1);
}

/* Keygen Section */
.keygen-command {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--vp-c-bg);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.keygen-command code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.82rem;
  background: var(--vp-c-bg-alt);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  flex: 1;
  min-width: 200px;
}

.gen-btn {
  padding: 0.35rem 0.7rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: bold;
  white-space: nowrap;
}

.gen-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.key-pair {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.5rem;
  align-items: center;
}

.key-card {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  border: 2px solid var(--vp-c-divider);
  opacity: 0.4;
  transition: all 0.5s;
}

.key-card.visible {
  opacity: 1;
}

.key-card.private {
  border-color: var(--vp-c-danger-1);
}

.key-card.public {
  border-color: var(--vp-c-green-1);
}

.key-header {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
}

.key-location {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.key-content code {
  display: block;
  font-family: var(--vp-font-family-mono);
  font-size: 0.72rem;
  background: var(--vp-c-bg-alt);
  padding: 0.35rem;
  border-radius: 4px;
  white-space: pre-wrap;
  word-break: break-all;
  line-height: 1.4;
}

.key-rule {
  margin-top: 0.35rem;
  font-size: 0.75rem;
  font-weight: bold;
  text-align: center;
  padding: 0.2rem;
  border-radius: 4px;
}

.key-rule.danger {
  background: rgba(239, 68, 68, 0.1);
  color: var(--vp-c-danger-1);
}

.key-rule.success {
  background: rgba(16, 185, 129, 0.1);
  color: var(--vp-c-green-1);
}

.key-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  opacity: 0.3;
  transition: opacity 0.5s;
}

.key-arrow.visible {
  opacity: 1;
}

.arrow-text {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.arrow-icon {
  font-size: 1.2rem;
  color: var(--vp-c-brand);
}

.key-analogy {
  margin-top: 0.75rem;
  background: var(--vp-c-bg);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}

/* Auth Section */
.auth-controls {
  text-align: center;
  margin-bottom: 0.75rem;
}

.action-btn {
  padding: 0.4rem 1rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: bold;
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-flow {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
}

.auth-parties {
  display: grid;
  grid-template-columns: 100px 1fr 100px;
  gap: 0.5rem;
  align-items: start;
}

.party {
  text-align: center;
  padding: 0.5rem;
}

.party-icon {
  font-size: 1.5rem;
}

.party-name {
  font-weight: bold;
  font-size: 0.82rem;
  margin: 0.15rem 0;
}

.party-has {
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
}

.auth-messages {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.msg {
  padding: 0.35rem 0.5rem;
  border-radius: 6px;
  font-size: 0.8rem;
  opacity: 0.2;
  transition: all 0.4s;
  border: 1px solid transparent;
}

.msg.active {
  opacity: 1;
}

.msg-right {
  background: rgba(59, 130, 246, 0.08);
  border-color: rgba(59, 130, 246, 0.2);
  margin-right: 20%;
}

.msg-left {
  background: rgba(16, 185, 129, 0.08);
  border-color: rgba(16, 185, 129, 0.2);
  margin-left: 20%;
}

.msg-result {
  background: rgba(16, 185, 129, 0.15);
  border-color: rgba(16, 185, 129, 0.3);
  text-align: center;
  margin: 0;
}

.msg-label {
  display: block;
  font-weight: bold;
  font-size: 0.78rem;
}

.msg-detail {
  display: block;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.1rem;
}

/* Uses Section */
.uses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.use-card {
  background: var(--vp-c-bg);
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  text-align: center;
}

.use-icon {
  font-size: 1.2rem;
}

.use-name {
  font-weight: bold;
  font-size: 0.82rem;
  margin: 0.15rem 0;
}

.use-cmd code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
  background: var(--vp-c-bg-alt);
  padding: 0.15rem 0.3rem;
  border-radius: 3px;
}

.use-desc {
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
  margin-top: 0.2rem;
}

.config-tips {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.tip-title {
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 0.35rem;
}

.tip-code {
  background: var(--vp-c-bg-alt);
  padding: 0.5rem;
  border-radius: 4px;
  margin: 0 0 0.35rem 0;
  font-size: 0.75rem;
  overflow-x: auto;
}

.tip-code code {
  font-family: var(--vp-font-family-mono);
}

.tip-result {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}

.tip-result code {
  font-family: var(--vp-font-family-mono);
  background: var(--vp-c-bg-alt);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-size: 0.78rem;
}

/* Info Box */
.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
  display: flex;
  gap: 0.25rem;
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .compare-grid {
    grid-template-columns: 1fr;
  }

  .key-pair {
    grid-template-columns: 1fr;
  }

  .key-arrow {
    flex-direction: row;
  }

  .auth-parties {
    grid-template-columns: 1fr;
  }

  .party {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-align: left;
  }
}
</style>
