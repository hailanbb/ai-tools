<template>
  <div class="controller-demo">
    <div class="header">
      <div class="title">{{ t('controller.title') }}</div>
      <div class="subtitle">{{ t('controller.subtitle') }}</div>
    </div>

    <div class="flow">
      <div class="step">
        <div class="step-label">{{ t('controller.requestLabel') }}</div>
        <pre class="step-code">{{ t('controller.requestCode') }}</pre>
      </div>

      <div class="arrow">{{ t('controller.arrive') }}</div>

      <div :class="['step', 'clickable', { active: detail === 'ctrl' }]" @click="toggle('ctrl')">
        <div class="step-label accent">{{ t('controller.receiveLabel') }}</div>
        <pre class="step-code">@RestController
@RequestMapping("/api/users")
public class UserController {
    @PostMapping("/register")
    public ResponseEntity&lt;UserDTO&gt; register(
        @RequestBody @Valid UserRegisterRequest request) {
        UserDTO user = userService.register(request);
        return ResponseEntity.ok(user);
    }
}</pre>
      </div>

      <div class="arrow">{{ t('controller.validateArrow') }}</div>

      <div :class="['step', 'clickable', { active: detail === 'valid' }]" @click="toggle('valid')">
        <div class="step-label warn">{{ t('controller.validationLabel') }}</div>
        <pre class="step-code">{{ t('controller.validationCode') }}</pre>
        <div v-if="detail === 'valid'" class="detail-box">
          <strong>{{ t('controller.validationDetailTitle') }}</strong>
          <ul>
            <li v-for="item in validationDetails" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>

      <div class="arrow">{{ t('controller.responseArrow') }}</div>

      <div class="step">
        <div class="step-label">{{ t('controller.responseLabel') }}</div>
        <pre class="step-code">{{ t('controller.responseCode') }}</pre>
      </div>
    </div>

    <div class="duties">
      <div class="duties-title">{{ t('controller.dutiesTitle') }}</div>
      <div class="duty-grid">
        <div v-for="d in duties" :key="d.name" class="duty">
          <div class="duty-name">{{ d.name }}</div>
          <div class="duty-desc">{{ d.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { backendLayeredArchitectureLocale } from '../../../locales/backend-layered-architecture/index.js'

const { t, messages } = useI18n(backendLayeredArchitectureLocale)
const detail = ref('')
const toggle = (s) => { detail.value = detail.value === s ? '' : s }

const duties = computed(() => messages.value.controller.duties)
const validationDetails = computed(() => messages.value.controller.validationDetails)
</script>

<style scoped>
.controller-demo { padding: 20px; background: var(--vp-c-bg-soft); border-radius: 12px; }
.header { text-align: center; margin-bottom: 20px; }
.title { font-size: 16px; font-weight: 600; color: var(--vp-c-text-1); }
.subtitle { font-size: 13px; color: var(--vp-c-text-3); margin-top: 4px; }

.flow { display: flex; flex-direction: column; gap: 8px; }
.arrow { text-align: center; color: var(--vp-c-text-3); font-size: 12px; }

.step {
  padding: 14px; border-radius: 8px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.step.clickable { cursor: pointer; transition: all .2s; }
.step.clickable:hover { box-shadow: 0 2px 8px rgba(0,0,0,.06); }
.step.active { border-color: var(--vp-c-brand-1); box-shadow: 0 0 0 2px var(--vp-c-brand-soft); }

.step-label { font-weight: 600; font-size: 13px; color: var(--vp-c-text-1); margin-bottom: 8px; }
.step-label.accent { color: #10b981; }
.step-label.warn { color: #f59e0b; }

.step-code {
  margin: 0; padding: 10px; border-radius: 6px; overflow-x: auto;
  background: var(--vp-c-bg-soft); font-size: 11px; line-height: 1.5;
  color: var(--vp-c-text-2); font-family: var(--vp-font-family-mono);
}

.detail-box {
  margin-top: 12px; padding: 12px; border-radius: 6px;
  background: var(--vp-c-brand-soft); border-left: 3px solid var(--vp-c-brand-1);
  font-size: 12px; color: var(--vp-c-text-1); line-height: 1.6;
}
.detail-box ul { margin: 8px 0 0; padding-left: 18px; }
.detail-box li { margin: 4px 0; }

.duties { margin-top: 20px; padding: 16px; border-radius: 8px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); }
.duties-title { text-align: center; font-weight: 600; font-size: 14px; color: var(--vp-c-text-1); margin-bottom: 12px; }
.duty-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.duty { text-align: center; padding: 12px 8px; background: var(--vp-c-bg-soft); border-radius: 6px; }
.duty-name { font-weight: 600; font-size: 13px; color: var(--vp-c-text-1); margin-bottom: 4px; }
.duty-desc { font-size: 11px; color: var(--vp-c-text-3); }

@media (max-width: 768px) {
  .duty-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
