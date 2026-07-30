# AI Agent 上下文高压缩率层 (headroom)

> 🔗 **原项目 GitHub 地址**: [https://github.com/headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom)

`Headroom` 是一套专为 AI Agent（如 Claude Code, Cursor, Copilot, Codex, Aider 等）设计的智能上下文压缩层。它能在工具输出、日志、RAG 检索块、长代码文件及历史对话传给大模型（LLM）前，进行极高比例的无损/可逆压缩（对 JSON 压缩率高达 60–95%，对代码压缩率达 15–20%），在保持完全一致回答精度的同时，大幅降低 Token 消耗与延迟。

---

## 🛠️ 第一阶段：环境自检与首次初始化引导 (Onboarding & Doctor)

在首次使用 Headroom 前，Agent 必须协助用户检查本地 Python/Node.js 环境及各种 CLI/MCP 接入配置。

### 1. 运行环境自检 (Doctor Check)

在终端运行以下自检命令：

```bash
# 检查 Python / Node.js 基础环境
python3 --version || python --version
node -v

# 检查/安装 Headroom CLI
pip install headroom-ai
# 或使用 npm
npm install -g headroom-ai
```

### 2. 本地代理与凭证配置

Headroom 支持本地优先与零配置代理模式：

```bash
# 启动本地代理服务 (端口 8787)
headroom proxy --port 8787

# 配置代理环境变量 (可选项，按需设置)
export HTTP_PROXY="http://localhost:8787"
export HTTPS_PROXY="http://localhost:8787"
```

---

## 🚀 第二阶段：核心执行工作流 (Workflow)

### 1. 核心工作模式

* **CLI 一键封装模式 (Wrap Agent)**：
  只需一条命令，即可让常用 Agent 自动启用上下文压缩：
  ```bash
  headroom wrap claude
  # 支持客户端：claude, codex, grok, copilot, cursor, aider, openhands, goose, continue 等
  # 解除封装命令：
  headroom unwrap claude
  ```

* **MCP 服务模式 (MCP Server)**：
  作为 MCP 服务引入，为客户端提供 `headroom_compress`、`headroom_retrieve`、`headroom_stats` 等工具接口：
  ```json
  {
    "mcpServers": {
      "headroom": {
        "command": "headroom",
        "args": ["mcp"]
      }
    }
  }
  ```

* **代码库集成 (SDK)**：
  在 Python 或 TypeScript 项目中直接调用压缩函数：
  ```python
  from headroom import compress

  compressed_messages = compress(messages)
  ```

* **会话提炼与学习 (Headroom Learn)**：
  挖掘失败的开发会话并自动写入修正规则至 `CLAUDE.local.md` 或 `AGENTS.md`：
  ```bash
  headroom learn
  ```

### 2. 关键特性与优势

1. **高压缩率**：结构化数据（如 JSON/XML/日志）压缩率 60–95%，代码与长文压缩率 15–20%。
2. **双向可逆缓存 (CCR)**：原始完整文本在本地缓存，LLM 可以在需要时精确调取细节。
3. **输出 Token 裁减**：不仅压缩输入的 Prompt，还能裁减模型返回的不必要寒暄和重复冗余代码。
4. **跨 Agent 记忆共享**：支持 Claude、Gemini、Codex 等不同智能体间共享与去重记忆。
