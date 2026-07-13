# Agent-Reach 使用说明 (Agent-Reach Guide)

本工具用于实现 AI Agent 的互联网检索与数据抓取能力整合。它是一个专门的能力层（Capability Layer），负责工具的选型、安装、诊断与路由。

---

## 🛠️ 第一阶段：环境自检与首次初始化引导

当本工具被触发或首次安装时，AI Agent 必须确保运行所需的基础环境和第三方依赖已就绪：

### 1. 运行依赖自检 (Doctor Check)
首先执行以下命令以验证本地各个渠道的状态及当前生效的路由后端：
```bash
agent-reach doctor
```
* **如果状态返回 `missing_dependencies`**：
  AI Agent 应当直接执行命令，自动帮助用户安装缺失的 Python 核心解析依赖：
  ```bash
  pip install agent-reach
  ```
* **如果自检检测到系统基建缺失**：
  若缺少 Node.js、gh CLI 或 mcporter，AI Agent 应当在终端中自动执行安装引导（或者在安全模式下向用户建议）：
  ```bash
  agent-reach install --env=auto
  ```
  *(可附加参数 `--safe` 开启安全模式仅作提示，或 `--dry-run` 仅做预览)*

### 2. 交互式多平台登录态配置 (Onboarding)
对于需要 Cookie 或登录态的平台（如 Twitter, 小红书, Reddit 等），传统的匿名接口可能被封锁，AI 代理需要引导用户进行本地登录态授权：
* **复用桌面浏览器登录态（推荐）**：
  对于桌面系统，AI Agent 会引导用户确保在 Chrome 浏览器中已登录目标平台，然后配合 `OpenCLI` 工具，一键自动拉取本地浏览器的 Session，无需手动复制 Cookie。
* **手动导入 Cookie 配置**：
  若在服务器环境或 OpenCLI 无法获取时，AI Agent 会引导用户使用 `Cookie-Editor` 插件导出 Cookie，并执行以下命令将设置保存到本地 `~/.agent-reach/config.yaml` 配置文件中（权限 600，保证安全）。
  *(建议使用**专用小号**以防被平台检测限流)*

---

## 🚀 第二阶段：核心执行工作流 (Workflow)

当初始化和配置就绪后，AI Agent 在执行网络检索和数据抓取任务时，将按照以下机制与命令执行：

### 1. 动态多后端路由机制 (优先度设计)
Agent-Reach 在抓取数据时会自动探测各候选后端的联通性，并在首选后端失效时降级至备选后端：

* **🌐 网页直抓与提取**：
  * **首选**：[Jina Reader](https://github.com/jina-ai/reader)（免 Key 直接提取干净的 Markdown）。
* **📺 视频与字幕解析**：
  * **YouTube**：[yt-dlp](https://github.com/yt-dlp/yt-dlp)（提取视频详情及字幕）。
  * **Bilibili**：[bili-cli](https://github.com/public-clis/bilibili-cli) ▸ OpenCLI ▸ 搜索 API（yt-dlp 已被 B站风控拦截，退役）。
* **🐦 社交媒体获取**：
  * **Twitter/X**：[twitter-cli](https://github.com/public-clis/twitter-cli) ▸ OpenCLI。
  * **Reddit**：[OpenCLI](https://github.com/jackwener/opencli) ▸ [rdt-cli](https://github.com/public-clis/rdt-cli)（只走登录态路线）。
  * **小红书**：[OpenCLI](https://github.com/jackwener/opencli) ▸ [xiaohongshu-mcp](https://github.com/xpzouying/xiaohongshu-mcp)。
* **🔍 全网 AI 搜索**：
  * **首选**：[Exa](https://exa.ai) (通过 [mcporter](https://github.com/nicobailon/mcporter) 接入，提供 AI 语义搜索且免 API Key 限制)。

### 2. 核心命令手册

* **运行环境一键体检**：
  ```bash
  agent-reach doctor
  ```
* **一键全自动安装/更新系统依赖**：
  ```bash
  agent-reach install --env=auto
  ```
* **完全卸载工具与本地凭证**：
  ```bash
  agent-reach uninstall
  ```
  *(该命令会完全清除 `~/.agent-reach/` 目录中的所有 token 和 Cookie 凭据。卸载 Python 库本身请运行 `pip uninstall agent-reach`)*
