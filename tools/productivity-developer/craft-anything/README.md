# Craft Anything (craft-anything)

> 🔗 **原项目 GitHub 地址**: [https://github.com/storytold/craft-anything](https://github.com/storytold/craft-anything)

**看清任意网站、应用或游戏是怎么做的，再让 AI 给你造一个自己的版本；一个纯 Rust 写的开源净室引擎。**  
把目标指给它，说清你想要什么，它就用真实的检查工具研究原作，让编码 agent 建一个新项目，把结果与原件比对，再反复收敛。

---

## 🛠️ 第一阶段：环境自检与首次初始化引导 (Doctor & Onboarding)

### 1. 前置依赖自检
本工具基于 100% 纯 Rust 构建，包含桌面端（egui）、CLI（`craft-anything-cli`）与 MCP 服务器。AI Agent 在首次运行或编译前，应先检查 Rust 工具链与系统依赖：
* **核心环境要求**：Rust **1.97 或更新版本**
* **环境自检命令**：
  ```bash
  rustc --version
  cargo --version
  ```
  * **若版本过低或未更新**：执行 `rustup update` 升级工具链。
  * **Debian / Ubuntu 桌面应用系统依赖**：若需从源码运行桌面端，需确保安装以下系统库：
    ```bash
    sudo apt-get install build-essential libxkbcommon-dev libxkbcommon-x11-0 libwayland-dev libx11-dev libxrandr-dev libxi-dev libgl1-mesa-dev libgtk-3-dev
    ```

### 2. 编译安装与诊断体检 (`doctor`)
从源码构建桌面端与 CLI 工具，并运行内置诊断命令检查安装状态、编码 agent 与分析引擎：
```bash
# 运行桌面应用
cargo run --release -p craft-anything

# 安装 CLI 工具（注册为 `craft-anything-cli`）
cargo install --path apps/craft-anything-cli

# 运行诊断体检：检查安装状态、编码 agent 和内部引擎
craft-anything-cli doctor
```
*(注：也可直接前往原项目 [Releases](https://github.com/storytold/craft-anything/releases/latest) 下载 Windows、macOS、Linux、FreeBSD 的预编译安装包、便携版或 WebAssembly 浏览器查看器。)*

### 3. 本地凭证与编码 Agent 接入配置
* **纯研究分析**：使用 314 个内置检查与逆向分析工具进行纯研究时，**不需要任何 AI 凭证**。
* **AI 自动构建与重建**：需要本地已登录的编码 agent：
  * **Claude Code（首选支持）**：Craft Anything 直接调用本地未经改动的 `claude` 程序，沿用你自己的登录态（Craft Anything 不读取、不接触账号凭证）。运行以下命令将 Craft Anything 接入编码 agent 应用：
    ```bash
    craft-anything-cli setup
    ```
  * **其他推理接口**：提问与分析可选配 Anthropic、OpenAI、OpenRouter 或本地 OpenAI 兼容服务（可在桌面端 `设置 → AI` 中配置）。
  * **可选多模态生成**：如需生成图片与 3D 模型，可自行开启并配置个人的 `fal.ai` API 密钥。

---

## 🚀 第二阶段：核心执行工作流 (Workflow)

### 1. 核心工作流与模式切换
把 Craft Anything 指向一个目标，说清你要什么，即按四步收敛闭环执行：
1. **研究**：用真实的检查工具检查原件（多屏宽页面、代码、文件、运行状态），所有结论均带置信度、覆盖范围与局限性证据记录。
2. **构建**：编码 agent 按你指定的语言、框架或引擎创建新项目（未指定时采用合理默认）。
3. **检查**：将构建成果与原件比对（网页按三种屏宽比对、游戏跑自检、应用看运行态），列出尚不一致之处。
4. **就绪**：打开、试玩或预览结果，或继续提出修改意见让其迭代收敛。

#### 运行模式与隐私边界（净室 vs 深度）
* **净室模式（默认）**：绝不读取原件内部的源码、文件或页面 JS，仅依据外部可见信息（图片、访客视角网页截图/布局/颜色/字体/间距、授权截取的应用窗口画面）进行研究与重建。内部探测类工具在净室模式下会被拒绝。
* **深度模式**：启用全部内置引擎工具（覆盖原生程序、.NET、Java、Android、Apple、Electron/JS、固件、抓包、数据库、游戏文件等，装有 Ghidra 时也会联动调用），供合法授权下的深度剖析。
  * 切换方式：在标题栏/设置中切换，执行 `settings_set deep_mode true`，或在 CLI 单次运行时附加 `--deep` / `--clean-room` 参数。

### 2. 面向 Agent 的 CLI 与 MCP 工具矩阵
引擎内置 **314 个工具**（引擎层 298 个 + AI 与设置层 16 个），每个工具同时是一个 CLI 子命令和一个 MCP 工具（大结果优先返回摘要，可配合 `core_evidence_browse` 分页读取）。

* **常用核心命令手册**：
  ```bash
  # 按工具集列出全部 314 个可用命令
  craft-anything-cli commands

  # 作为 MCP 服务器启动，供任意 MCP 客户端（Claude Code / Cursor / Antigravity 等）调用
  craft-anything-cli mcp

  # 从命令行发起目标重建（交互问题将在终端中询问）
  craft-anything-cli rebuild https://example.com "Recreate this website"
  craft-anything-cli rebuild - "A snake game in Rust" --rounds 1
  craft-anything-cli rebuild https://example.com "Make the header blue" --continue-in "<project folder>"
  craft-anything-cli rebuild - "Add a contact form" --project-folder "<your folder>" --existing edit
  ```

### 3. 项目输出目录结构
默认新项目保存在 `Documents/Craft Anything`（可通过 `设置 → 通用` 或 `--project-folder` 指定）：
* `craft.json`：请求参数、目标信息、当前状态与历史记录
* `capture/`：从目标捕获或录制的内容
* `app/`：生成并迭代的新项目代码
* `checks/`：每轮与原件比对的检查结果与相似度报告
* `investigation.cany/`：结构化证据台账
* `inbox/`：待用户确认的提问与审批卡片

### 4. 工具卸载
* **卸载 CLI 工具**：
  ```bash
  cargo uninstall craft-anything-cli
  ```
* **移除本地仓库副本**：直接删除本目录 `tools/productivity-developer/craft-anything` 即可。

---

## 📄 许可与负责任使用说明
* **开源协议**：采用 [MIT](LICENSE-MIT) 或 [Apache-2.0](LICENSE-APACHE) 双许可（`docs/brand/` 下的 ArtCraft 名称与商标除外，详见 `docs/brand/LICENSE-brand.txt`）。
* **负责任地使用**：请仅在您拥有或获准检查的软件与网站上使用 Craft Anything。本工具绝不绕过 DRM、登录验证或反作弊机制；agent 不得复制未获授权的 logo、照片或文本。
