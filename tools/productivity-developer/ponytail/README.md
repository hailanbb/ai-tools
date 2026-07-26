# Ponytail - AI Agent 极简编码与行为治理工具 (The Lazy Senior Dev)

`ponytail` 是一个面向 AI 智能体的代码工程治理工具与 MCP 服务（形象为“留着长马尾、戴椭圆眼镜的资深懒老佬程序员”），通过注入极简编码思维梯子（The Ladder），防止大模型过度设计、盲目引入第三方依赖和写无用模板代码，实测在实际工程中平均降低 ~54% 代码量 (LOC)、减少 ~20% 成本和 ~27% 耗时，同时 100% 保持代码安全性。

---

## 🛠️ 第一阶段：环境自检与前置依赖 (Doctor & Onboarding)

在使用 `ponytail` 技能或 MCP 服务前，AI Agent 必须执行以下自检：

### 1. 客户端规则配置与自检
* **技能配置**：支持将 `skills/ponytail/` 安装至 `.agent/skills/`、Claude Code、Cursor `.cursor/rules`、Windsurf `.windsurf/rules` 或 Antigravity。
* **MCP 服务状态**：如需全局生效，检查 `ponytail-mcp` 依赖服务及 Node.js 环境（`npm` / `npx`）。

### 2. 依赖自愈与安装
* **命令行安装**：可以通过 `npx @dietrichGebert/ponytail` 一键引入全套 Agent 规则。
* **开发环境配置**：检查 `.env` 文件是否存在所需模型配置（若运行 Benchmark 评测集）。

---

## 🚀 第二阶段：核心执行工作流 (Workflow)

`ponytail` 的核心在于在编写任何代码前，AI Agent 必须严格依次通过以下 **6 阶梯子 (The Ladder)** 门禁：

```
1. 这个需求/代码真的必须存在吗？     → 否：跳过（遵循 YAGNI 原则）
2. 当前代码库中已有类似实现？         → 是：直接复用，绝不重写
3. 标准库 (Stdlib) 能否完成？          → 是：使用标准库
4. Web/平台原生 API 能否做到？        → 是：使用原生 API（如 <input type="date"> 代替第三方日期选择器组件）
5. 项目已安装的依赖包能否解决？       → 是：直接使用已有依赖
6. 能否一行代码完成？                 → 是：一行解决
```

### 1. 核心规则约束
* **禁止无度拆分组件**：不为了“好看”或过度架构抽象去新建多层 Wrapper 组件。
* **安全与可访问性门禁**：极简绝不等于削减验证、错误处理、安全防护或可访问性（a11y）。
* **代码重构指导**：遇到 50 行胶水代码时，优先提炼并替换为 1 行原生/标准库调用。

### 2. 多客户端集成架构

```text
tools/productivity-developer/ponytail/
├── README.md                           # 本重塑说明文档
├── skills/                             # Agent Skills 规则文件
├── ponytail-mcp/                       # MCP 服务端代码
├── benchmarks/                         # 真实 FastAPI+React 效果评测集
├── examples/                           # 重构前后对比示例
└── commands/                           # CLI 工具指令
```
