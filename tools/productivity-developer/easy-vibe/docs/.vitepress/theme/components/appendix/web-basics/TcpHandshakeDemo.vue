<template>
  <div class="tcp-handshake-demo custom-demo-base">
    <div class="demo-label">{{ t('network.tcpHandshake.label') }}</div>
    <div class="demo-panel">
      
      <!-- Sequence Diagram area -->
      <div class="sequence-container">
        
        <div class="endpoint client">
          <div class="icon">💻</div>
          <div class="name">{{ t('network.tcpHandshake.client') }}</div>
          <div class="state" :class="{ established: step >= 3 }">
            {{ step >= 3 ? t('network.tcpHandshake.connected') : t('network.tcpHandshake.waiting') }}
          </div>
        </div>

        <!-- Middle Area -->
        <div class="interaction-area">
          <div class="timeline-line client-line"></div>
          <div class="timeline-line server-line"></div>

          <transition name="msg-right">
            <div v-if="step >= 1" class="message msg-syn">
              <div class="msg-box">
                <div class="msg-title">{{ messagesList[0].title }}</div>
                <div class="msg-desc">{{ messagesList[0].desc }}</div>
              </div>
            </div>
          </transition>

          <transition name="msg-left">
            <div v-if="step >= 2" class="message msg-syn-ack">
              <div class="msg-box">
                <div class="msg-title">{{ messagesList[1].title }}</div>
                <div class="msg-desc">{{ messagesList[1].desc }}</div>
              </div>
            </div>
          </transition>

          <transition name="msg-right">
            <div v-if="step >= 3" class="message msg-ack">
              <div class="msg-box">
                <div class="msg-title">{{ messagesList[2].title }}</div>
                <div class="msg-desc">{{ messagesList[2].desc }}</div>
              </div>
            </div>
          </transition>
        </div>

        <div class="endpoint server">
          <div class="icon">🖥️</div>
          <div class="name">{{ t('network.tcpHandshake.server') }}</div>
          <div class="state" :class="{ established: step >= 3 }">
            {{ step >= 3 ? t('network.tcpHandshake.connected') : t('network.tcpHandshake.waiting') }}
          </div>
        </div>
      </div>

      <div class="action-bar">
        <button v-if="step === 0" class="action-btn" @click="startHandshake">{{ t('network.tcpHandshake.start') }}</button>
        <button v-if="step >= 3" class="action-btn outline" @click="reset">{{ t('network.tcpHandshake.reset') }}</button>
      </div>

    </div>
    <div class="demo-status">
      {{ statusText }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { webBasicsLocale } from '../../../locales/web-basics/index.js'

const { t, messages } = useI18n(webBasicsLocale)

const step = ref(0)

const messagesList = computed(() => messages.value.network.tcpHandshake.messages)
const statusList = computed(() => messages.value.network.tcpHandshake.status)
const statusText = computed(() => statusList.value[step.value])

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const startHandshake = async () => {
  if (step.value > 0) return
  
  step.value = 1
  await wait(1800)
  
  step.value = 2
  await wait(1800)
  
  step.value = 3
}

const reset = () => {
  step.value = 0
}
</script>

<style scoped>
.custom-demo-base {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  letter-spacing: 0.2px;
}

.demo-panel {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.demo-status {
  margin-top: 0.75rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  text-align: center;
  font-weight: bold;
}

.sequence-container {
  display: flex;
  justify-content: space-between;
  position: relative;
  min-height: 280px;
  margin-bottom: 1rem;
}

.endpoint {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  z-index: 2;
}

.endpoint .icon { font-size: 3rem; margin-bottom: 0.5rem; }
.endpoint .name { font-weight: bold; font-size: 0.85rem; text-align: center; color: var(--vp-c-text-1); }
.endpoint .state {
  margin-top: 0.5rem;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-3);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s;
}

.endpoint .state.established {
  background: var(--vp-c-success-soft, #ecfdf5);
  color: var(--vp-c-success-1, #10b981);
  border-color: var(--vp-c-success-1, #10b981);
}

.interaction-area {
  flex: 1;
  position: relative;
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
  padding-top: 3rem;
  gap: 1.5rem;
}

.timeline-line {
  position: absolute;
  top: 60px;
  bottom: 0;
  width: 2px;
  background: var(--vp-c-divider);
  z-index: 1;
}

.client-line { left: 0; }
.server-line { right: 0; }

.message {
  position: relative;
  z-index: 3;
  width: 100%;
  display: flex;
  justify-content: center;
}

.msg-box {
  background: var(--vp-c-brand-soft, #eff6ff);
  border: 2px solid var(--vp-c-brand-1, #3b82f6);
  padding: 0.6rem 1rem;
  border-radius: 8px;
  width: 80%;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  position: relative;
}

.msg-box::before {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 0; 
  height: 0; 
  border-style: solid;
}

.msg-syn .msg-box::after, .msg-ack .msg-box::after {
  content: '→';
  position: absolute;
  right: -30px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--vp-c-brand-1, #3b82f6);
  font-size: 1.5rem;
}

.msg-syn-ack .msg-box {
  background: var(--vp-c-warning-soft, #fffbeb);
  border-color: var(--vp-c-warning-1, #f59e0b);
}

.msg-syn-ack .msg-box::before {
  content: '←';
  position: absolute;
  left: -30px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--vp-c-warning-1, #f59e0b);
  border: none;
  font-size: 1.5rem;
}

.msg-title {
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 0.3rem;
  color: var(--vp-c-text-1);
}

.msg-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.action-bar {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.action-btn {
  background: var(--vp-c-brand-1, #3b82f6);
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}

.action-btn:hover { background: var(--vp-c-brand-2, #2563eb); }
.action-btn.outline { background: transparent; color: var(--vp-c-text-1); border: 1px solid var(--vp-c-divider); }
.action-btn.outline:hover { background: var(--vp-c-bg-alt); }

/* Animations */
.msg-right-enter-active, .msg-left-enter-active {
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.msg-right-enter-from { opacity: 0; transform: translateX(-50px); }
.msg-left-enter-from { opacity: 0; transform: translateX(50px); }

@media (max-width: 640px) {
  .msg-box { width: 95%; }
  .msg-syn .msg-box::after, .msg-ack .msg-box::after, .msg-syn-ack .msg-box::before { display: none; }
  .interaction-area { margin: 0; padding-top: 1rem; }
  .endpoint { width: 70px; }
  .timeline-line { top: 0;}
}
</style>
