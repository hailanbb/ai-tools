# Skill Doctor · Agent Skills 规范诊断与校验工具

> 🔗 **原项目 GitHub 地址**: [https://github.com/tcarac/skill-doctor](https://github.com/tcarac/skill-doctor)

Skill Doctor 是专门针对 [Agent Skills 官方规范](https://agentskills.io) 开发的合规性体检与校验工具。它既可以作为 GitHub Action 深度集成在仓库 CI 门禁中（自动输出详细的 PR 诊断评论与代码行内高亮 Annotation），也可以在本地通过 Python/uv 独立运行，提供详尽的错误提示与自动修复（Auto-Fix）建议。

---

## 🛠️ 第一阶段：环境自检与首次初始化引导

### 1. 本地运行依赖与诊断 (Doctor)

Skill Doctor 基于 Python 3.11+ 构建，推荐使用现代 Python 包管理器 `uv` 进行快速安装与运行：

```bash
# 1. 确认 Python 运行版本（需要 Python 3.11+）
python --version

# 2. 本地克隆后直接使用 uv 安装依赖与运行
uv pip install -e .

# 3. 运行本地自检诊断命令对指定技能目录进行体检
python -m skill_doctor.main --path /path/to/skill-folder
```

### 2. GitHub Actions 自动化门禁配置

在你的 Skills 仓库中创建 `.github/workflows/validate-skills.yml`，即可开启全自动体检门禁：

```yaml
name: Validate Skills

on:
  pull_request:
    branches:
      - main
  push:
    branches:
      - main

permissions:
  contents: read
  pull-requests: write  # 允许在 PR 中自动发表体检诊断报告
  checks: write         # 允许在 Files Changed 中添加行内错误 Annotation

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # 当使用 changed 模式时需要完整 git 历史

      - name: Run Skill Doctor
        uses: tcarac/skill-doctor@v1
        with:
          path: 'skills/*'
          mode: 'multiple'
          fail-on-error: true
          comment-on-pr: true
          create-annotations: true
          auto-fix-suggestions: true
```

---

## 🚀 第二阶段：核心执行工作流

### 1. 核心体检与校验规范

Skill Doctor 严格依据官方 Agent Skills 规范执行以下硬性指标体检：

1. **Frontmatter 格式合法性**：必须以 `---` 开头并闭合，使用符合 StrictYAML 标准的键值对。
2. **`name` 字段校验**：
   - 必填项，长度限制为 1~64 字符。
   - 仅允许小写英文字母、数字和连字符（`-`），且不能以连字符开头或结尾。
   - 技能名称必须与所在目录名完全一致（目录匹配校验）。
3. **`description` 字段校验**：
   - 必填项，长度限制为 1~1024 字符。
   - 必须提供清晰的技能功能描述与场景说明。
4. **字段白名单管控**：
   - 严格禁止未定义的野字段，仅允许 `name`、`description`、`license`、`allowed-tools`、`metadata`、`compatibility` 字段。
5. **Markdown 正文完整性**：
   - 排除 Frontmatter 后，文档正文内容必须非空。

### 2. Action 输入参数一览

| 参数项 | 作用说明 | 必填 | 默认值 | 可选值 |
| :--- | :--- | :--- | :--- | :--- |
| `path` | 待校验的 Skill 目录路径或通配符匹配表达式 | 否 | `.` | 如 `skills/*`, `my-skill` |
| `mode` | 校验模式 | 否 | `single` | `single`（单技能）, `multiple`（批量）, `changed`（仅变更技能） |
| `fail-on-error` | 发现错误时是否将 Workflow 标记为失败 | 否 | `true` | `true` / `false` |
| `comment-on-pr` | 是否在 Pull Request 下自动发表诊断表格 | 否 | `true` | `true` / `false` |
| `create-annotations` | 是否在代码改动行展示行内高亮错误 | 否 | `true` | `true` / `false` |
| `auto-fix-suggestions` | 是否在输出中附带可直接采用的修复代码块 | 否 | `true` | `true` / `false` |
| `output-json` | 是否将体检结果导出为 JSON 产物 | 否 | `false` | `true` / `false` |

### 3. 本地独立命令行使用 (CLI)

```bash
# 校验单个技能目录
python -m skill_doctor.main --path ./my-skill --mode single

# 批量校验目录下所有技能
python -m skill_doctor.main --path "./skills/*" --mode multiple

# 仅校验 git diff 中发生变动的技能（适合大型 Monorepo）
python -m skill_doctor.main --mode changed
```
