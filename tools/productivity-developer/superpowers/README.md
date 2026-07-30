# Superpowers - Agent 软件开发方法论与技能套件


> 🔗 **原项目 GitHub 地址**: 
[https://github.com/obra/superpowers](https://github.com/obra/superpowers)


Superpowers 是一套构建在可组合 Agent 技能与引导指令之上的完整软件开发方法论工具包。它能够在 coding agent 启动的第一时间介入，防止 Agent 盲目直接写代码，而是引导其进行需求提炼、短块确认、TDD 红绿循环测试驱动与 Subagent 分工自主迭代。

---

## 🛠️ 第一阶段：环境自检与多端安装 (Doctor & Onboarding)

在不同 AI Agent 环境中配置 Superpowers 前，须进行自检与插件安装：

### 1. 多端客户端安装一览
* **Antigravity CLI**：
  ```bash
  agy plugin install https://github.com/obra/superpowers
  ```
* **Claude Code 官方插件市场**：
  ```bash
  /plugin install superpowers@claude-plugins-official
  ```
* **Cursor / Gemini CLI / Kimi Code / OpenCode / Codex**：
  参照各客户端插件管理命令或引入 `.agents/` / `.opencode` / `.cursor-plugin` 下的配置规则。

---

## 🚀 第二阶段：核心执行工作流 (Workflow)

Superpowers 控制 Agent 软件开发的标准流程：

### 1. 四阶段核心方法论管线
1. **Spec 提炼与交互对齐**：Agent 不盲目动手，先提炼短块需求规格说明书（Spec）并与用户逐段确认。
2. **实施计划拆解 (Implementation Plan)**：将 Spec 转化为极简、可验证的工程实施计划，明确规范门禁。
3. **TDD 红绿循环驱动 (Red-Green TDD)**：强制执行“先写失败测试 (Red) -> 编写最简实现 (Green) -> 重构”循环。
4. **子 Agent 驱动自主研发 (Subagent-Driven)**：调度多个子 Agent 并行或流水线式拆分研发任务，主 Agent 负责审核校验。

### 2. 原则门禁
* **YAGNI (You Aren't Gonna Need It)**：严格禁止模型滥用复杂设计模式或添加非显性要求的冗余代码。
* **DRY (Don't Repeat Yourself)**：优先复用既有模块与标准库函数。

---

## 📂 技能目录结构

```text
tools/productivity-developer/superpowers/
├── README.md                           # 本重塑说明文档
├── CLAUDE.md                           # Claude 专属接入指南
├── AGENTS.md                           # Agent 核心架构说明
├── skills/                             # 技能脚本与规则文件
├── hooks/                              # 插件生命周期 Hook 钩子
├── .agents/                            # 通用 Agent 属性配置
└── docs/                               # 详细指南与架构文档
```
