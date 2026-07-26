<template>
  <div class="ai-help-demo">
    <div class="desktop-container">
      <div
        class="window vscode"
        :class="getWindowClass('vscode')"
      >
        <div class="title-bar">
          <div class="controls">
            <span class="dot red" />
            <span class="dot yellow" />
            <span class="dot green" />
          </div>
          <div class="title-text">
            App.vue - easy-vibe - Visual Studio Code
          </div>
        </div>

        <div class="main-layout">
          <div class="activity-bar">
            <div class="icon active">
              📁
            </div>
            <div class="icon">
              🔍
            </div>
            <div class="icon">
              🌿
            </div>
            <div class="icon">
              🐛
            </div>
            <div class="icon">
              🧩
            </div>
          </div>

          <div class="sidebar">
            <div class="sidebar-title">
              EXPLORER
            </div>
            <div class="file-tree">
              <div class="tree-item expanded">
                <span class="arrow">▼</span> src
              </div>
              <div class="tree-item indent">
                <span class="icon">📄</span> main.js
              </div>
              <div class="tree-item indent active">
                <span class="icon">V</span> App.vue
              </div>
              <div class="tree-item indent">
                <span class="icon">🎨</span> style.css
              </div>
            </div>
          </div>

          <div class="editor-area">
            <div class="tab-bar">
              <div class="tab active">
                <span class="icon">V</span> App.vue <span class="close">×</span>
              </div>
            </div>
            <div class="code-content">
              <div class="line-numbers">
                <div
                  v-for="n in 15"
                  :key="n"
                >
                  {{ n }}
                </div>
              </div>
              <div class="code-lines">
                <div class="line">
                  <span class="kwd">import</span> {
                  <span class="var">ref</span>,
                  <span class="var">onMounted</span>,
                  <span class="var">nextTick</span> }
                  <span class="kwd">from</span> <span class="str">'vue'</span>
                </div>
                <div class="line" />
                <div class="line">
                  <span class="kwd">const</span>
                  <span class="var">chartRef</span> =
                  <span class="func">ref</span>(<span class="kwd">null</span>)
                </div>
                <div class="line">
                  <span class="kwd">const</span> <span class="var">data</span> =
                  <span class="func">ref</span>([])
                </div>
                <div class="line" />
                <div class="line">
                  <span class="kwd">const</span>
                  <span class="func">initChart</span> =
                  <span class="kwd">async</span> () => {
                </div>
                <div class="line">
                  &nbsp;&nbsp;<span class="comment">// {{ t('aiHelp.codeComments.waitData') }}</span>
                </div>
                <div class="line">
                  &nbsp;&nbsp;<span class="kwd">await</span>
                  <span class="func">fetchData</span>()
                </div>
                <div class="line">
&nbsp;&nbsp;
                </div>
                <div
                  ref="targetCode"
                  class="line"
                >
                  &nbsp;&nbsp;<span class="comment">// 👈 {{ t('aiHelp.codeComments.waitDom') }}</span>
                </div>
                <div
                  ref="targetCode2"
                  class="line"
                >
                  &nbsp;&nbsp;<span class="kwd">await</span>
                  <span class="func">nextTick</span>()
                </div>
                <div class="line">
&nbsp;&nbsp;
                </div>
                <div class="line">
                  &nbsp;&nbsp;<span class="kwd">const</span>
                  <span class="var">chart</span> =
                  <span class="var">echarts</span>.<span class="func">init</span>(<span class="var">chartRef</span>.<span class="var">value</span>)
                </div>
                <div class="line">
                  &nbsp;&nbsp;<span class="var">chart</span>.<span class="func">setOption</span>({ ... })
                </div>
                <div class="line">
                  }
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="step === 'selecting' || step === 'captured'"
            class="screenshot-overlay"
          >
            <div
              class="selection-box"
              :class="{ flashed: step === 'captured' }"
            >
              <div class="selection-handle top-left" />
              <div class="selection-handle top-right" />
              <div class="selection-handle bottom-left" />
              <div class="selection-handle bottom-right" />
              <div
                v-if="step === 'selecting'"
                class="cursor-crosshair"
              />
              <div
                v-if="step === 'selecting'"
                class="selection-size"
              >
                220 × 350
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="step === 'idle'"
          class="guide-overlay"
        >
          <div
            class="start-btn"
            @click="startDemo"
          >
            <span>📸 {{ t('aiHelp.start') }}</span>
          </div>
        </div>
      </div>

      <div
        class="window chatgpt"
        :class="getWindowClass('chatgpt')"
      >
        <div class="chat-sidebar">
          <div class="new-chat">
            + New chat
          </div>
          <div class="history-item">
            Previous 7 Days
          </div>
          <div class="history-item active">
            Vue nextTick explanation
          </div>
          <div class="history-item">
            CSS Grid layout
          </div>
        </div>
        <div class="chat-main">
          <div class="chat-model-selector">
            <span>GPT-4o</span> <span class="arrow">▼</span>
          </div>

          <div
            ref="messagesContainer"
            class="messages-container"
          >
            <div
              v-if="stepInt >= 5"
              class="msg-row user"
            >
              <div class="avatar">
                U
              </div>
              <div class="msg-bubble">
                <div
                  v-if="stepInt >= 5"
                  class="pasted-image"
                >
                  <div class="ui-snapshot">
                    <div class="snapshot-rect menu-rect" />
                    <div class="snapshot-text">
                      Menu Bar.png
                    </div>
                  </div>
                </div>
                <div class="msg-text">
                  {{ typedText }}
                </div>
              </div>
            </div>

            <div
              v-if="stepInt >= 7"
              class="msg-row ai"
            >
              <div class="avatar gpt">
                <svg
                  viewBox="0 0 41 41"
                  class="gpt-logo"
                >
                  <path
                    d="M37.532 16.87a9.963 9.963 0 00-.856-8.184c-3.15-5.49-10.25-7.38-15.738-4.23-.718.412-1.35.914-1.896 1.488a9.965 9.965 0 00-7.144-1.156 9.972 9.972 0 00-6.73 4.966c-3.15 5.49-1.26 12.59 4.23 15.738.412.237.854.43 1.306.586a9.963 9.963 0 00.856 8.184c3.15 5.49 10.25 7.38 15.738 4.23.718-.412 1.35-.914 1.896-1.488a9.965 9.965 0 007.144 1.156 9.972 9.972 0 006.73-4.966c3.15-5.49 1.26-12.59-4.23-15.738a9.953 9.953 0 00-1.306-.586zM20.5 29.5a9 9 0 110-18 9 9 0 010 18z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div class="msg-bubble ai-bubble">
                <p>
                  {{ t('aiHelp.answer.introPrefix') }}
                  <strong>{{ t('aiHelp.answer.menuBar') }}</strong>{{ t('aiHelp.answer.introSuffix') }}
                </p>
                <p><strong>{{ t('aiHelp.answer.menuTitle') }}</strong></p>
                <ul>
                  <li v-for="item in messages.aiHelp.answer.items" :key="item.name">
                    <strong>{{ item.name }}</strong>: {{ item.desc }}
                  </li>
                </ul>
                <p>
                  💡 <strong>{{ t('aiHelp.answer.tipLabel') }}</strong>{{ t('aiHelp.answer.tipText') }}
                  <code>F1</code> /
                  <code>Ctrl+Shift+P</code> {{ t('aiHelp.answer.tipSuffix') }}
                </p>
              </div>
            </div>
          </div>

          <div class="chat-input-area">
            <div class="input-wrapper">
              <div
                v-if="stepInt === 4 || (stepInt === 5 && isTyping)"
                class="input-preview"
              >
                <div class="mini-snapshot-ui">
                  <div class="mini-menu-rect" />
                </div>
              </div>
              <div class="fake-input">
                <span
                  v-if="stepInt < 5"
                  class="placeholder"
                >Message ChatGPT...</span>
                <span
                  v-else
                  class="typing-text"
                >{{ typedText
                }}<span
                  v-if="isTyping"
                  class="cursor"
                >|</span></span>
              </div>
              <button
                class="send-btn"
                :class="{ active: typedText.length > 5 }"
              >
                ↑
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        v-if="step === 'finished'"
        class="reset-btn"
        @click="reset"
      >
        🔄 {{ t('aiHelp.replay') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { ideIntroLocale } from '../../../locales/ide-intro/index.js'

const { t, messages } = useI18n(ideIntroLocale)
const step = ref('idle')
const typedText = ref('')
const isTyping = ref(false)

const stepInt = computed(() => {
  const map = {
    idle: 0,
    selecting: 1,
    captured: 2,
    switching: 3,
    pasting: 4,
    typing: 5,
    sending: 6,
    responding: 7,
    finished: 8
  }
  return map[step.value] || 0
})

const getWindowClass = (winName) => {
  if (winName === 'vscode') {
    if (stepInt.value < 3) return 'active'
    if (stepInt.value === 3) return 'inactive zoom-out'
    return 'inactive hidden'
  }
  if (winName === 'chatgpt') {
    if (stepInt.value < 3) return 'inactive hidden'
    if (stepInt.value === 3) return 'active zoom-in'
    return 'active'
  }
}

const startDemo = async () => {
  step.value = 'selecting'

  await wait(1500)
  step.value = 'captured'

  await wait(600)

  step.value = 'switching'
  await wait(800)

  step.value = 'pasting'
  await wait(800)

  step.value = 'typing'
  isTyping.value = true
  const question = t('aiHelp.question')
  for (let i = 0; i < question.length; i++) {
    typedText.value += question[i]
    await wait(50)
  }
  isTyping.value = false
  await wait(300)

  step.value = 'sending'
  await wait(500)

  step.value = 'responding'
  await wait(2500)

  step.value = 'finished'
}

const reset = () => {
  step.value = 'idle'
  typedText.value = ''
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
</script>

<style scoped>
.ai-help-demo {
  margin: 40px 0;
  perspective: 1000px;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.desktop-container {
  position: relative;
  width: 100%;
  height: 400px;
  background: #333;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.window {
  position: absolute;
  top: 5%;
  left: 5%;
  width: 90%;
  height: 90%;
  border-radius: 6px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  overflow: hidden;
  background: #fff;
}

.window.active {
  opacity: 1;
  transform: scale(1);
  z-index: 2;
  filter: blur(0);
}

.window.inactive {
  opacity: 0;
  pointer-events: none;
  z-index: 1;
}

.window.zoom-out {
  transform: scale(0.9);
  opacity: 0;
  filter: blur(2px);
}

.window.zoom-in {
  animation: zoomIn 0.5s forwards;
}

@keyframes zoomIn {
  from {
    transform: scale(1.1);
    opacity: 0;
    filter: blur(4px);
  }
  to {
    transform: scale(1);
    opacity: 1;
    filter: blur(0);
  }
}

.vscode {
  background: #1e1e1e;
  color: #ccc;
  font-family: 'Consolas', 'Monaco', monospace;
}

.title-bar {
  height: 30px;
  background: #252526;
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 12px;
  color: #999;
}

.controls {
  display: flex;
  gap: 6px;
  margin-right: 16px;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.red {
  background: #ff5f56;
}
.yellow {
  background: #ffbd2e;
}
.green {
  background: #27c93f;
}

.main-layout {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.activity-bar {
  width: 40px;
  background: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  gap: 15px;
}
.activity-bar .icon {
  font-size: 18px;
  opacity: 0.5;
  filter: grayscale(1);
}
.activity-bar .icon.active {
  opacity: 1;
  border-left: 2px solid white;
  filter: grayscale(0);
}

.sidebar {
  width: 180px;
  background: #252526;
  border-right: 1px solid #1e1e1e;
  font-size: 12px;
  color: #ccc;
}
.sidebar-title {
  padding: 10px;
  font-weight: bold;
  font-size: 11px;
}
.tree-item {
  padding: 4px 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}
.tree-item.active {
  background: #37373d;
}
.tree-item.indent {
  padding-left: 20px;
}
.tree-item .arrow {
  font-size: 10px;
  color: #999;
}

.editor-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #1e1e1e;
  position: relative;
}
.tab-bar {
  height: 35px;
  background: #252526;
  display: flex;
}
.tab {
  background: #1e1e1e;
  padding: 0 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  border-top: 1px solid #007acc;
}
.tab .close {
  margin-left: 8px;
  font-size: 14px;
}

.code-content {
  flex: 1;
  display: flex;
  padding: 10px 0;
  font-size: 13px;
  line-height: 20px;
  position: relative;
}
.line-numbers {
  width: 40px;
  text-align: right;
  padding-right: 15px;
  color: #6e7681;
  user-select: none;
}
.code-lines {
  flex: 1;
  padding-left: 5px;
}

.kwd {
  color: #569cd6;
}
.var {
  color: #9cdcfe;
}
.func {
  color: #dcdcaa;
}
.str {
  color: #ce9178;
}
.comment {
  color: #6a9955;
}

.screenshot-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
  cursor: crosshair;
}

.selection-box {
  position: absolute;
  top: 40px;
  left: 0;
  width: 280px;
  height: 320px;
  border: 3px solid #ff5f56;
  background: rgba(255, 95, 86, 0.1);
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
  animation: selectAnim 0.5s ease-out;
}

.selection-box.flashed {
  animation: flash 0.3s;
  background: rgba(255, 255, 255, 0.3);
}

@keyframes selectAnim {
  from {
    width: 0;
    height: 0;
  }
  to {
    width: 280px;
    height: 320px;
  }
}

@keyframes flash {
  0% {
    background: rgba(255, 255, 255, 0.8);
  }
  100% {
    background: rgba(255, 255, 255, 0.1);
  }
}

.selection-size {
  position: absolute;
  bottom: -20px;
  right: 0;
  background: #ff5f56;
  color: white;
  font-size: 10px;
  padding: 2px 4px;
}

/* UI Snapshot Styling */
.ui-snapshot {
  background: #252526;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.snapshot-rect {
  width: 30px;
  height: 20px;
  border: 2px solid #ff5f56;
  background: rgba(255, 95, 86, 0.2);
}
.snapshot-text {
  font-size: 11px;
  color: #ccc;
}

.mini-snapshot-ui {
  width: 40px;
  height: 30px;
  background: #252526;
  border: 1px solid #565869;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mini-rect {
  width: 20px;
  height: 14px;
  border: 1px solid #ff5f56;
}

.chatgpt {
  background: #343541;
  color: #ececf1;
  display: flex;
  flex-direction: row;
}

.chat-sidebar {
  width: 200px;
  background: #202123;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.new-chat {
  border: 1px solid #565869;
  border-radius: 5px;
  padding: 10px;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
}
.history-item {
  font-size: 13px;
  color: #ececf1;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.history-item.active {
  background: #343541;
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  background: #343541;
}

.chat-model-selector {
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-weight: 600;
  color: #d2d6db;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 14px;
}

.messages-container {
  flex: 1;
  
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.msg-row {
  display: flex;
  gap: 15px;
  max-width: 80%;
}
.msg-row.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}
.msg-row.ai {
  align-self: flex-start;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
}
.user .avatar {
  background: #5436da;
  color: white;
  border-radius: 50%;
}
.ai .avatar {
  background: #19c37d;
  color: white;
}
.gpt-logo {
  width: 20px;
  height: 20px;
}

.msg-bubble {
  background: transparent;
  padding: 0;
  font-size: 14px;
  line-height: 1.6;
}
.user .msg-bubble {
  text-align: right;
}
.ai-bubble {
  background: #444654;
  padding: 15px;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.pasted-image {
  margin-bottom: 8px;
  display: inline-block;
  border: 1px solid #565869;
  border-radius: 4px;
  overflow: hidden;
}
.code-snapshot {
  background: #1e1e1e;
  padding: 8px;
  font-family: monospace;
  font-size: 11px;
}

.chat-input-area {
  padding: 20px;
  background-image: linear-gradient(180deg, rgba(53, 55, 64, 0), #353740 50%);
}

.input-wrapper {
  background: #40414f;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.input-preview {
  position: absolute;
  bottom: 100%;
  left: 0;
  margin-bottom: 8px;
  background: #40414f;
  padding: 4px;
  border-radius: 4px;
  border: 1px solid #565869;
  animation: slideUp 0.3s;
}

.fake-input {
  flex: 1;
  font-size: 14px;
  color: white;
  min-height: 24px;
  display: flex;
  align-items: center;
}
.placeholder {
  color: #8e8ea0;
}

.send-btn {
  background: #19c37d;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  transition: opacity 0.2s;
}
.send-btn.active {
  opacity: 1;
}

.guide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
  z-index: 100;
}
.start-btn {
  background: white;
  color: #333;
  padding: 12px 24px;
  border-radius: 30px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}
.start-btn:hover {
  transform: scale(1.05);
}

.reset-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  background: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
