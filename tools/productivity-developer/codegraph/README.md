# CodeGraph - 基于 Rust 内核的本地代码语义图谱与 Agent 上下文引擎 (codegraph)

CodeGraph 是一个 100% 本地运行的高性能代码语义依赖图谱分析平台。它基于 Rust 高效内核，专门为 AI Coding Agent（支持 Antigravity, Claude Code, Cursor, Codex, OpenCode, Gemini, Hermes Agent 等）提供精准的代码上下文识别、全量函数/类调用链追踪、框架路由分析与 MCP 接口服务。

---

## 🛠️ 第一阶段：环境自检与 CLI / MCP 接入 (Doctor & Onboarding)

在接入 CodeGraph 语义图谱引擎前，须进行运行环境与构建工具自检：

### 1. 安装方式与平台自检
* **无需 Node.js 原生一键安装**：
  * **macOS / Linux**：
    ```bash
    curl -fsSL https://raw.githubusercontent.com/colbymchenry/codegraph/main/install.sh | sh
    ```
  * **Windows (PowerShell)**：
    ```powershell
    irm https://raw.githubusercontent.com/colbymchenry/codegraph/main/install.ps1 | iex
    ```
* **使用 npm 全局安装**（适合已有 Node 环境）：
  ```bash
  npm i -g @colbymchenry/codegraph
  ```

### 2. 升级与版本检查
运行命令 `codegraph upgrade --check` 检测升级；`codegraph status` 诊断本地内核与 Agent 绑定状态。

---

## 🚀 第二阶段：核心执行工作流 (Workflow)

CodeGraph 赋能 AI Agent 深度理解全库上下文的工作流：

### 1. 核心特性与工具能力
1. **手术级上下文抽取 (Surgical Context)**：告别盲目复制长文件，精准定位修饰符、相关接口与类型定义。
2. **跨语言与框架感知的路由推导**：支持 React Native, iOS, Expo 跨端桥接分析，自动识别前端/后端框架路由。
3. **原生 MCP 服务集成**：内置模型上下文协议 (MCP) 接口，直接向 Agent 暴露 `search_code_graph`, `find_callers`, `trace_impact` 等工具。

### 2. 适用场景
* **PR 级变更风险推导**：修改某核心函数前，一键分析潜在受影响的下游依赖与破坏性变更。
* **大型遗留代码库重构**：构建全库静态依赖图，辅助智能体理解无关联关系的悬挂代码。

---

## 📂 技能目录结构

```text
tools/productivity-developer/codegraph/
├── README.md                           # 本重塑说明文档
├── BUNDLING.md                         # 多平台打包与 Rust 核心构建说明
├── CLAUDE.md                           # Claude Code 与 Agent 指令规范
├── codegraph-kernel/                   # Rust 内核计算引擎源码
├── src/                                # TypeScript 客户端与 MCP 接口实现
├── scripts/                            # 安装与自动化部署脚本
└── docs/                               # 详细 API 指南与图谱架构文档
```
