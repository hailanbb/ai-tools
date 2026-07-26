<template>
  <div class="linux-perm-demo">
    <div class="header">
      <div class="title">{{ t('permissions.title') }}</div>
      <div class="subtitle">{{ t('permissions.subtitle') }}</div>
    </div>

    <div class="input-row">
      <div class="input-group">
        <label>{{ t('permissions.inputLabel') }}</label>
        <input v-model="permNum" type="text" maxlength="3" placeholder="755" @input="onNumInput" />
      </div>
      <div class="perm-string">{{ permString }}</div>
    </div>

    <div class="perm-grid">
      <div v-for="(group, gi) in groups" :key="gi" class="perm-group">
        <div class="group-label">{{ group.label }}</div>
        <div class="bits">
          <label v-for="(bit, bi) in group.bits" :key="bi" class="bit-label">
            <input
              type="checkbox"
              :checked="bit.on"
              @change="setBit(gi, bi, $event.target.checked)"
            />
            <span :class="['bit-char', bit.char]">{{ bit.char }}</span>
            <span class="bit-name">{{ bit.name }}</span>
          </label>
        </div>
      </div>
    </div>

    <div class="examples">
      <div class="ex-title">{{ t('permissions.examplesTitle') }}</div>
      <div class="ex-grid">
        <div v-for="ex in examples" :key="ex.num" class="ex-item" @click="setPermNum(ex.num)">
          <code>{{ ex.num }}</code>
          <span class="ex-desc">{{ ex.desc }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { linuxBasicsLocale } from '../../../locales/linux-basics/index.js'

const { t, messages } = useI18n(linuxBasicsLocale)

const bitState = reactive([
  [
    { char: 'r', on: true },
    { char: 'w', on: true },
    { char: 'x', on: true }
  ],
  [
    { char: 'r', on: true },
    { char: 'w', on: false },
    { char: 'x', on: true }
  ],
  [
    { char: 'r', on: true },
    { char: 'w', on: false },
    { char: 'x', on: true }
  ]
])

const permNum = ref('755')

const groups = computed(() => messages.value.permissions.groups.map((group, i) => ({
  ...group,
  bits: bitState[i].map(bit => ({
    ...bit,
    name: messages.value.permissions.bitNames[bit.char]
  }))
})))

const permString = computed(() => {
  return '-' + bitState.map(g =>
    g.map(b => b.on ? b.char : '-').join('')
  ).join('')
})

function bitsToNum() {
  return bitState.map(g => {
    let n = 0
    if (g[0].on) n += 4
    if (g[1].on) n += 2
    if (g[2].on) n += 1
    return n
  }).join('')
}

function onBitChange() {
  permNum.value = bitsToNum()
}

function setBit(groupIndex, bitIndex, checked) {
  bitState[groupIndex][bitIndex].on = checked
  onBitChange()
}

function onNumInput() {
  const s = permNum.value.replace(/[^0-7]/g, '').slice(0, 3)
  permNum.value = s
  if (s.length === 3) {
    s.split('').forEach((ch, gi) => {
      const n = parseInt(ch)
      bitState[gi][0].on = !!(n & 4)
      bitState[gi][1].on = !!(n & 2)
      bitState[gi][2].on = !!(n & 1)
    })
  }
}

function setPermNum(num) {
  permNum.value = num
  onNumInput()
}

const examples = computed(() => messages.value.permissions.examples)
</script>

<style scoped>
.linux-perm-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.input-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.input-group label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.2rem;
}
.input-group input {
  padding: 0.4rem 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 1.1rem;
  font-family: var(--vp-font-family-mono);
  font-weight: 700;
  width: 80px;
  text-align: center;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.perm-string {
  font-family: var(--vp-font-family-mono);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  letter-spacing: 1px;
}
.perm-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}
@media (max-width: 480px) {
  .perm-grid { grid-template-columns: 1fr; }
}
.perm-group {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 0.6rem;
  border: 1px solid var(--vp-c-divider);
}
.group-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
  margin-bottom: 0.4rem;
}
.bits { display: flex; flex-direction: column; gap: 0.25rem; }
.bit-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  cursor: pointer;
}
.bit-char {
  font-family: var(--vp-font-family-mono);
  font-weight: 700;
  width: 16px;
  text-align: center;
}
.bit-char.r { color: #22c55e; }
.bit-char.w { color: #f59e0b; }
.bit-char.x { color: #ef4444; }
.bit-name { color: var(--vp-c-text-3); font-size: 0.75rem; }
.examples {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 0.6rem;
  border: 1px solid var(--vp-c-divider);
}
.ex-title {
  font-weight: 600;
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.4rem;
}
.ex-grid { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.ex-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.78rem;
  transition: background 0.2s;
}
.ex-item:hover { background: var(--vp-c-bg-soft); }
.ex-item code {
  font-weight: 700;
  color: var(--vp-c-brand);
}
.ex-desc { color: var(--vp-c-text-3); }
</style>
