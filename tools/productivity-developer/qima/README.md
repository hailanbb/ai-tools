# 齐码 (qima) - Vibe Coding 套件

齐码（qima）是一套面向现代 Web 开发的契约式 Vibe Coding 流程套件，提供从 Idea 到 Implement 的 6 阶段全链路智能化引导。

---

## 🛠️ 第一阶段：环境自检与前置依赖 (Doctor & Onboarding)

### 1. 架构基线与依赖检测
* **固定技术基线**：
  * **前端/全栈框架**：Next.js (App Router)
  * **云后端与数据库**：CloudBase (腾讯云开发)
  * **UI 组件库**：Tailwind CSS + shadcn/ui
* **MCP 工具依赖**：
  * 建议配置并启用 **Stitch MCP**，以便处理复杂的流程编排与状态流转。
  * 检查 Node.js 环境及包管理器 (`npm` / `pnpm`) 可用性。

### 2. 初始化自检
Agent 启动 Vibe Coding 前，需先自检项目根目录是否存在对应的架构契约文件。若不存在，引导用户启动 6 阶段工作流。

---

## 🚀 第二阶段：核心执行工作流 (Workflow)

齐码套件由 6 个子 Skill 串联而成，形成严密的契约式交付链路：

```
[vibe-idea] -> [vibe-interaction] -> [vibe-architecture] -> [vibe-design] -> [vibe-prototype] -> [vibe-implement]
```

### 1. 阶段职责划分
* **`vibe-idea`**：需求收敛与价值主张确立，生成产品概念契约。
* **`vibe-interaction`**：用户路径与交互逻辑设计，生成页面状态流转图。
* **`vibe-architecture`**：技术选型与 CloudBase / Next.js 架构契约定稿。
* **`vibe-design`**：设计系统、颜色令牌（Tokens）与 shadcn/ui 组件规范绑定。
* **`vibe-prototype`**：低保真/高保真页面原型搭建与交互验证。
* **`vibe-implement`**：全栈代码编写、API 联调与生产构建交付。

### 2. 交付与验证规范
* 每一阶段产出明确的契约 Markdown 文件，经确认后再流转至下一阶段。
* 严禁跳过契约直接编写全栈代码，确保可维护性与高质量交付。
