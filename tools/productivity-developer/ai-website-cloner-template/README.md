# AI 网页逆向与克隆模板套件 (ai-website-cloner-template)

> 🔗 **原项目 GitHub 地址**: [https://github.com/JCodesMore/ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template)

`AI Website Cloner Template` 是一套专为 AI Coding Agent（推荐 Claude Code、Cursor、Windsurf、Codex、Gemini 等）设计的现代化 Next.js 网页逆向工程与复刻模板。只需要向 Agent 提交目标网页 URL 并运行 `/clone-website` 命令，Agent 即可自动审查目标网站、提取设计 Token（颜色、字体、间距）、抽取资源并并行构建复刻整个站点。

---

## 🛠️ 第一阶段：环境自检与首次初始化引导 (Onboarding & Doctor)

在首次使用该模板克隆网站之前，Agent 必须协助用户配置 Node.js、依赖环境以及 AI Agent 的控制指令集。

### 1. 运行环境自检 (Doctor Check)

在终端运行以下自检命令：

```bash
# 1. 检查 Node.js 环境 (需 Node.js 18+)
node -v
npm -v

# 2. 安装项目依赖
npm install
```

### 2. 交互式代理设置 (Agent Integration)

根据使用的 AI Agent 客户端，启动无头浏览器审查或加载配置文件：

* **Claude Code 客户端**（推荐）：
  启动自带浏览器审阅模式：
  ```bash
  claude --chrome
  ```
* **其他 Agent**（Cursor, Windsurf, Continue 等）：
  项目根目录中已自动内置 `AGENTS.md`、`.cursorrules`、`.clinerules` 等规范，各 Agent 启动后会自动识别并读取相关指令。

---

## 🚀 第二阶段：核心执行工作流 (Workflow)

### 1. 触发网站克隆指令

在 Agent 聊天终端中输入以下指令格式：

```bash
/clone-website <目标网站URL_1> [<目标网站URL_2> ...]
```

例如：
```bash
/clone-website https://stripe.com
```

### 2. 自动化逆向复刻流程

当触发 `/clone-website` 后，AI Agent 会按以下阶段自动闭环完成：

1. **网页深度探查 (Inspection)**：调用无头浏览器或抓取工具分析目标页面的 DOM 结构、CSS 变量、媒体资源和响应式断点。
2. **设计系统构建 (Design System Extraction)**：提取 `globals.css` 中的颜色、Modern Visual 风格与字体 Token。
3. **组件拆解与并行编写 (Parallel Building)**：自动将页面拆分为 Header、Hero、Features、Footer 等独立 Next.js 组件并并发生成。
4. **编译与预览 (Preview & Adjust)**：自动运行 `npm run dev` 在本地启动预览并进行细节微调。

### 3. 支持的 Agent 平台

* **Claude Code** (官方推荐，基于 Opus 4.8 引擎)
* **Cursor** (`.cursor/commands/clone-website.md`)
* **Windsurf** (`.windsurf/workflows/clone-website.md`)
* **Gemini / Codex / Continue / Amazon Q**
