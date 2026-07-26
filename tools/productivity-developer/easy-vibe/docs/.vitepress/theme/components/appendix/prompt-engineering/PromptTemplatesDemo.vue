<template>
  <el-card
    class="templates-card"
    shadow="hover"
  >
    <template #header>
      <div class="card-header">
        <div class="header-left">
          <h3 class="title">
            {{ t('templates.title') }}
          </h3>
          <p class="subtitle">
            {{ t('templates.subtitle') }}
          </p>
        </div>
        <div class="header-right">
          <el-input
            v-model="q"
            :placeholder="t('templates.searchPlaceholder')"
            :prefix-icon="Search"
            clearable
            style="width: 240px"
          />
          <el-button
            type="primary"
            :icon="copied ? Check : CopyDocument"
            :disabled="!active"
            @click="copy(active.template)"
          >
            {{ copied ? t('common.copied') : t('common.copyTemplate') }}
          </el-button>
        </div>
      </div>
    </template>

    <div class="tags-container">
      <el-space wrap>
        <el-button
          v-for="item in filtered"
          :key="item.id"
          :type="activeId === item.id ? 'primary' : ''"
          round
          size="small"
          @click="select(item.id)"
        >
          {{ item.title }}
        </el-button>
      </el-space>
      <el-empty
        v-if="filtered.length === 0"
        :description="t('templates.emptySearch')"
        :image-size="60"
      />
    </div>

    <div
      v-if="active"
      class="content-area"
    >
      <el-alert
        :title="active.desc"
        type="info"
        :closable="false"
        show-icon
        class="desc-alert"
      />

      <el-card
        shadow="never"
        class="code-card"
      >
        <pre class="code-block"><code>{{ active.template }}</code></pre>
      </el-card>

      <div
        v-if="active.note"
        class="note-section"
      >
        <el-tag
          type="warning"
          size="small"
        >
          Note
        </el-tag>
        <span class="note-text">{{ active.note }}</span>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Search, CopyDocument, Check } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useI18n } from '../../../composables/useI18n.js'
import { promptEngineeringLocale } from '../../../locales/prompt-engineering/index.js'

const { t } = useI18n(promptEngineeringLocale)

const q = ref('')
const copied = ref(false)

const templates = computed(() => {
  const items = t('templates.items')
  const templateTexts = t('templates.templateTexts')

  return items.map(item => ({
    ...item,
    template: templateTexts[item.id] || ''
  }))
})

const filtered = computed(() => {
  const s = q.value.trim().toLowerCase()
  if (!s) return templates.value
  return templates.value.filter((item) => {
    const hay = `${item.category} ${item.title} ${item.desc}`.toLowerCase()
    return hay.includes(s)
  })
})

const activeId = ref('summary-boss')
const active = computed(
  () => templates.value.find((item) => item.id === activeId.value) || templates.value[0]
)

const select = (id) => {
  activeId.value = id
  copied.value = false
}

const copy = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    ElMessage.success(t('templates.copySuccess'))
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    copied.value = false
    ElMessage.error(t('templates.copyFail'))
  }
}
</script>

<style scoped>
.templates-card {
  margin: 16px 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
}

.header-left {
  flex: 1;
  min-width: 200px;
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

.header-right {
  display: flex;
  gap: 8px;
  align-items: center;
}

.tags-container {
  margin-bottom: 20px;
}

.desc-alert {
  margin-bottom: 16px;
}

.code-card {
  background-color: var(--vp-c-bg-alt);
  border-radius: 4px;
}

.code-block {
  margin: 0;
  font-family: monospace;
  font-size: 13px;
  white-space: pre-wrap;
  color: var(--vp-c-text-1);
}

.note-section {
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.note-text {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .card-header {
    flex-direction: column;
  }

  .header-right {
    width: 100%;
    justify-content: space-between;
  }

  .header-right .el-input {
    flex: 1;
  }
}
</style>
