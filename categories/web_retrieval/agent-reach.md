# 👁️ Agent-Reach — 智能路由式 AI 互联网能力整合层

---

## 📌 基本信息

* **工具名称**：Agent-Reach
* **原作者**：Panniantong
* **项目主页**：[Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach)
* **开源协议**：MIT License
* **运行环境**：Python 3.10+ (部分通道依赖 Node.js, git, gh CLI, mcporter)

---

## 🎯 核心功能

Agent-Reach 是一个专为 AI Agent（如 Claude Code, OpenClaw, Cursor 等）设计的**能力层（Capability Layer）**。它不负责底层的网页抓取细节，而是负责**上游工具的选型、安装、诊断与路由**。

其核心功能包括：
1. **一键赋能**：无需繁琐配置，通过单条命令或对 Agent 发起单句指令，即可全自动配齐多平台的读取与搜索能力。
2. **多平台支持**：
   * **免配置即用**：网页阅读（通过 Jina Reader）、YouTube 字幕提取、RSS 源订阅与解析、全网语义搜索（Exa）、V2EX 论坛、雪球股票行情。
   * **配置登录态解锁**：GitHub 交互（通过 gh CLI）、推特/X 阅读与搜索、Reddit 贴子/评论阅读、小红书搜索与阅读、Facebook/Instagram 抓取、LinkedIn 详情、小宇宙播客音频转文字。
3. **动态路由与容灾机制**：每个平台均配置了“首选+备选”的有序后端路由列表。当首选方案因平台反爬或风控失效时，自动切换到备选通道，对终端用户和 Agent 完全透明。
   * *例如*：B站读取原本首选为 `yt-dlp`，当其被 B站风控拦截后，路由自动切换到 `bili-cli` 或 `OpenCLI`，无需人工介入。
4. **环境自检 (Doctor)**：提供一键体检命令，探测当前各个渠道的联通性，自动诊断网络及 Cookie 状态。

---

## 💡 触发场景

当 AI Agent 在执行任务时遇到以下情况，应触发并使用此工具：
* **需要获取非公开或受限的社交媒体内容**：如要求 AI 总结推特热议、Reddit 报错讨论、小红书用户反馈等。
* **需要提取多媒体内容**：如要求 AI 总结某个 YouTube 教程或 B站技术视频的视频详情与字幕。
* **需要执行 AI 语义化全网搜索**：需要获取高质量 AI 检索结果，而不仅是传统搜索引擎的网页堆叠时（自动接入 Exa）。
* **Agent 需快速配置工作环境**：在一台新机器上开展编码代理工作，需要快速配齐网络检索、GitHub API、Exa 搜索等基础基建时。

---

## 🛠️ 详细说明

### 1. 动态后端路由机制
Agent-Reach 会探测各个渠道对应工具的真实可用性，并自动走最优路由：

| 渠道 | 首选后端 | 备选后端 | 路由机制与说明 |
| :--- | :--- | :--- | :--- |
| **网页阅读** | Jina Reader | — | 免费且无需 API Key 即可提取干净的网页正文 Markdown。 |
| **YouTube** | yt-dlp | — | 提取 YouTube 视频字幕及搜索视频。 |
| **推特/X** | twitter-cli | OpenCLI | 优先走稳定搜索接口，OpenCLI 走浏览器登录态兜底。 |
| **B站** | bili-cli | OpenCLI ▸ 搜索 API | bili-cli 无需登录即可搜索和读取；yt-dlp 已被 B站风控限制。 |
| **Reddit** | OpenCLI | rdt-cli | 匿名接口已失效，必须使用桌面浏览器登录态路由。 |
| **小红书** | OpenCLI | xiaohongshu-mcp ▸ xhs-cli | 优先复用桌面 Chrome 浏览器登录态；服务器环境可用 MCP 扫码。 |
| **全网搜索** | Exa | — | AI 语义搜索，通过 MCP 接入免 Key 限制。 |
| **GitHub** | gh CLI | — | 官方 CLI 接口，授权后具备完整的 API 能力。 |
| **RSS订阅** | feedparser | — | Python 生态标准 RSS 订阅解析。 |

### 2. 安全与凭证管理
* **本地安全存储**：所有抓取所需的 Cookie、Token 等敏感信息一律保存在本地 `~/.agent-reach/config.yaml` 中，文件权限严格设置为 `600`（仅所有者可读写），坚决不上传、不外传。
* **隔离建议**：对于需要 Cookie/登录态的平台（推特、小红书、Reddit 等），强烈建议注册并使用**专用小号**，以防止平台检测异常而导致主账号被限流或封禁。

---

## 🚀 全局安装与使用说明

### 1. 快速上手安装

根据你的 Agent 客户端权限，选择以下两种安装方式之一：

#### 方式 A：Agent 代理全自动安装（推荐）
直接将以下指令发送给你的 AI 编码助手（如 Claude Code, OpenClaw, Cursor 等）：
```text
帮我安装 Agent Reach：https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.md
```
*(Agent 将自动检测系统环境，通过 pip 安装 CLI，配置 Node.js 基础依赖并注册相关的 Skill 指南)*

> **⚠️ OpenClaw 用户注意**：请确认已开启 `exec` 命令行执行权限（在配置文件中设置 `"tools": { "profile": "coding" }`），否则 Agent 将无法执行安装脚本。

#### 方式 B：终端手动安装
1. **安装 Python 命令行客户端**：
   ```bash
   pip install agent-reach
   ```
2. **初始化环境与依赖**：
   ```bash
   # 全自动检测并配齐系统依赖（Node.js, gh CLI, mcporter 等）
   agent-reach install --env=auto
   ```
   * *安全模式（不擅自修改系统配置，仅列出所需依赖）*：
     ```bash
     agent-reach install --env=auto --safe
     ```
   * *预览模式（仅预览安装步骤，不做任何实际改动）*：
     ```bash
     agent-reach install --env=auto --dry-run
     ```

---

### 2. 配置与登录态解锁

多数零配置渠道安装后立即可用。对于需要登录的平台，可向 Agent 发送指令让其引导你配置，或者手动操作：

* **自动化复用浏览器登录态（推荐）**：
  在本地桌面电脑上使用本工具时，可安装 `OpenCLI` 以直接复用你 Chrome 浏览器已登录的平台会话，零摩擦解锁推特、小红书、Reddit 等。
* **手动导入 Cookie**：
  通过浏览器插件（如 Cookie-Editor）将对应平台（如小红书、Twitter）的 Cookie 导出为 JSON 或 Netscape 格式，并告知 Agent 帮你配置。

---

### 3. 日常诊断与体检

运行以下命令，随时检查每个渠道的连通性、当前走的是哪个后端，以及故障排查方案：
```bash
agent-reach doctor
```

---

### 4. 卸载

如果需要完全清除本工具及所有本地凭证，请运行：
```bash
agent-reach uninstall
```
*(此命令会删除 `~/.agent-reach/` 凭证目录、各 Agent 注册的 skill 配置文件以及 MCP 关联。卸载 python 库本身需运行 `pip uninstall agent-reach`)*
