# Windows-MCP · Windows 桌面操控与 UI 自动化 MCP 服务

> 🔗 **原项目 GitHub 地址**: [https://github.com/cursortouch/windows-mcp](https://github.com/cursortouch/windows-mcp)

Windows-MCP 是一个轻量、高效的开源模型上下文协议（MCP）服务端，专为实现 AI Agent 与 Windows 操作系统的深度无缝交互而设计。它充当了大语言模型与 Windows 之间的桥梁，通过 Windows 原生 UI Automation (UIA) 接口，让 Agent 能够原生执行**文件资源管理器导航、桌面应用控制、鼠标/键盘输入模拟、窗口状态捕获、自动化 QA 测试与浏览器 DOM 交互**。

相比于传统的基于纯视觉截图（Computer Vision）的桌面自动化，Windows-MCP 优先利用 Windows 原生可访问性树（Accessibility Tree），对非多模态纯文本 LLM 同样友好，具备更高精度和更低延迟（单步响应通常在 0.2~0.5 秒）。

---

## 🛠️ 第一阶段：环境自检与首次初始化引导

### 1. 运行环境自检 (Doctor)

在使用本服务前，请检查本机环境是否满足以下要求：

* **操作系统**：Windows 10 / Windows 11（兼容 Windows 7/8/8.1）
* **Python 版本**：Python 3.13+
* **包管理器**：推荐使用 Astral 的 [uv](https://github.com/astral-sh/uv) 进行免配置快速拉起：
  ```powershell
  # 检查 Python 与 uv 版本
  python --version
  uv --version

  # 若未安装 uv，可在 PowerShell 中快速安装：
  powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
  ```
* **系统语言提示**：建议将系统显示语言设为英文，或在非英文系统中按需关闭 `App-Tool` 以避免应用名称别名匹配偏差。

### 2. 本地快速验证运行

在终端中直接通过 `uvx` 启动 MCP 服务测试标准输入输出通信：

```powershell
# 标准 stdio 模式启动
uvx windows-mcp serve

# 或者作为本地 SSE/HTTP 守护服务运行
uvx windows-mcp serve --transport sse --host 127.0.0.1 --port 8000
```

### 3. AI 客户端配置指南 (Client Configuration)

将以下配置添加至你的 AI 客户端（如 Claude Desktop, Cursor, Antigravity 等）的 MCP 配置文件中：

#### 方案 A：使用 `uvx` 免安装直接拉起（推荐）

在 `claude_desktop_config.json` 或各客户端的 `mcpServers` 配置段中加入：

```json
{
  "mcpServers": {
    "windows-mcp": {
      "command": "uvx",
      "args": [
        "windows-mcp",
        "serve"
      ]
    }
  }
}
```

#### 方案 B：本地克隆源码运行

若直接在本收藏库的源码目录下运行：

```json
{
  "mcpServers": {
    "windows-mcp": {
      "command": "uv",
      "args": [
        "--directory",
        "E:\\GoogleAI\\github\\tools\\mcp-servers\\windows-mcp",
        "run",
        "windows-mcp",
        "serve"
      ]
    }
  }
}
```

> **注意（Windows Store / MSIX 包装版客户端）**：
> 如果使用的是从微软商店安装的 Claude Desktop，由于其运行在沙盒内且不自动继承系统 PATH，配置中的 `command` 请使用 `uvx.exe` 或已安装工具的完整绝对路径（如 `C:\Users\<用户名>\.local\bin\uvx.exe`）。

---

## 🚀 第二阶段：核心执行工作流

### 1. 提供的核心 MCP 工具一览

Windows-MCP 封装了全套 Windows 桌面交互工具：

| 工具名称 | 功能描述 | 核心参数与使用场景 |
| :--- | :--- | :--- |
| **`Mouse-Tool`** | 模拟物理鼠标交互 | 支持 `click`、`double_click`、`right_click`、`move`、`drag`、`scroll`；支持屏幕绝对坐标或针对特定 UI 元素的相对坐标 |
| **`Keyboard-Tool`** | 模拟物理键盘击键与快捷键 | 支持输入字符串文本、按键组合（如 `Ctrl+C`、`Alt+Tab`、`Win+R`、`Enter` 等） |
| **`State-Tool`** | 获取当前屏幕与 UI 状态树 | 输出当前活跃窗口的控件层级结构（Name, ControlType, BoundingRectangle）；支持 `use_dom=True` 开启浏览器原生 DOM 纯净过滤模式 |
| **`App-Tool`** | 查找并启动 Windows 应用程序 | 根据应用名称直接拉起软件（如 Calculator, Notepad, Edge 等） |
| **`Clipboard-Tool`** | 读写 Windows 系统剪贴板 | 快速提取剪贴板文本或设置剪贴板内容，便于长文本传递 |
| **`Screenshot-Tool`** | 捕获当前桌面或窗口图像 | 供具备视觉多模态能力的大模型进行视觉定位与验证 |

### 2. 特色模式：浏览器 DOM 自动化模式 (DOM Mode)

当控制 Chrome、Edge 或 Firefox 浏览器时，通过将 `State-Tool` 的 `use_dom` 设为 `true`：
- **纯净提取**：自动过滤掉浏览器的地址栏、标签页、扩展图标等外层控件干扰；
- **聚焦网页**：仅抽取页面 HTML 渲染树中的有效交互节点（按钮、输入框、链接），大幅压缩输入给 LLM 的上下文 Token 数量，提升网页填表与数据采集的可靠性。

### 3. 日常维护与开机常驻服务

Windows-MCP 支持一键注册为 Windows 当前用户的定时常驻任务：

```powershell
# 注册开机自启任务（任务名称：windows-mcp-server）
windows-mcp install

# 指定端口与 HTTP 传输模式
windows-mcp install --transport sse --host 127.0.0.1 --port 8000

# 卸载开机常驻任务
windows-mcp uninstall
```

日志文件默认保存在 `~/.windows-mcp/server.log` 和 `~/.windows-mcp/server.error.log`，调试通信异常时可优先检查该日志。
