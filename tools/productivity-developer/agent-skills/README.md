# Agent Skills - Addy Osmani 生产级 AI Agent 软件工程 24 技能合集 (agent-skills)

Agent Skills 是由 Google 资深 Web 架构师 Addy Osmani 开发的生产级 AI Agent 软件工程技能与生命周期控制套件。它将资深软件工程师在开发、测试、审校和发布全流程中的质量门禁与最佳实践编码为 Agent 技能，支持 Claude Code, Cursor, Codex, Gemini, Antigravity, Copilot 等 70+ 主流 AI 编程智能体。

---

## 🛠️ 第一阶段：环境自检与客户端接入 (Doctor & Onboarding)

在 Agent 中加载与使用 Agent Skills 前，须进行自检与全局/插件挂载：

### 1. 一键 CLI 全局挂载 (`npx skills`)
支持跨 70+ Agent 引擎一键发现与安装：
```bash
# 全量安装 24 个生产级 Skill
npx skills add addyosmani/agent-skills

# 预览与浏览指定 Skill 模块
npx skills add addyosmani/agent-skills --list
```

### 2. 客户端原生插件配置
* **Claude Code**：
  ```bash
  /plugin marketplace add addyosmani/agent-skills
  /plugin install agent-skills@addy-agent-skills
  ```
* **Cursor / Antigravity / Gemini**：
  参照项目内 `docs/cursor-setup.md` 及 `.gemini` / `.opencode` 配置，直接引入 `skills/` 下对应的 `.md` 节点。

---

## 🚀 第二阶段：核心执行工作流 (Workflow)

软件工程全生命周期的 8 大斜杠指令与 24 个精细化 Skill：

### 1. 生命阶段映射与斜杠指令矩阵

```text
  DEFINE          PLAN           BUILD          VERIFY         REVIEW          SHIP
 ┌──────┐      ┌──────┐      ┌──────┐      ┌──────┐      ┌──────┐      ┌──────┐
 │ Idea │ ───▶ │ Spec │ ───▶ │ Code │ ───▶ │ Test │ ───▶ │  QA  │ ───▶ │  Go  │
 │Refine│      │  PRD │      │ Impl │      │Debug │      │ Gate │      │ Live │
 └──────┘      └──────┘      └──────┘      └──────┘      └──────┘      └──────┘
  /spec          /plan          /build        /test         /review       /ship
```

* `/spec`：**需求定义** — 在编写代码前强制定制规格书与 PRD，避免模糊假设。
* `/plan`：**任务拆解** — 将复杂需求化解为小粒度、可测试的原子任务。
* `/build` & `/build auto`：**增量构建** — 循序渐进构建代码，支持一键审批自主执行链条。
* `/test`：**测试验证** — 严格执行 TDD (Red-Green-Refactor) 红绿循环。
* `/review`：**代码审查** — 执行五轴代码质量审校，防止可读性与架构退化。
* `/webperf`：**性能审计** — 先测量再优化，审查 Web 性能指标。
* `/code-simplify`：**代码极简** — 追求可读性与简洁，消除过度设计。
* `/ship`：**生产发布** — 小步快跑安全上线。

---

## 📂 技能目录结构

```text
tools/productivity-developer/agent-skills/
├── README.md                           # 本重塑说明文档
├── AGENTS.md                           # 跨 Agent 行为控制节点
├── CLAUDE.md                           # Claude 专属规范指南
├── skills/                             # 24 个生产级软件工程 Skill 源码
├── commands/                           # 8 大生命周期斜杠指令定义
├── docs/                               # Cursor、Codex、Gemini 等客户端集成文档
└── evals/                              # 技能测试与 Benchmark 评估套件
```
