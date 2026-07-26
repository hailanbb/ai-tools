# Stitch MCP 接入与排错(references)

本文件是 `vibe-prototype` 第 0 步「前置接入」的细节支撑:接入步骤、三种鉴权方式、连接校验、4 项回退排错清单、Google Cloud 计费与额度提示。

`@_davideast/stitch-mcp` 是**导出 / 拉取**型 MCP——它不在 MCP 内生成设计,设计在 Stitch 网页画布(Gemini 驱动,<https://stitch.withgoogle.com>)里产生。接入它,Claude 才能把画布生成的 screens 拉回本地。

## 前置条件(硬前提,缺一不可)

接入前,用户须拥有一个 Google Cloud 项目,且**同时满足**:

1. **已启用计费(Billing)**:Stitch 走 Google Cloud 项目鉴权,**必须开启计费**才能启用 Stitch API,否则 `init` 与后续拉取都会失败。
2. **已启用 Stitch API**:在该项目下启用 Stitch API。

两者缺一不可。任何一项未满足,接入会在 `init` 或首次拉取时报错。

## 接入步骤

### ① 初始化 + 鉴权

```bash
npx @_davideast/stitch-mcp init
```

该命令自动处理 OAuth / gcloud 流程,绑定到上面那个「已启用计费 + 已启用 Stitch API」的 Google Cloud 项目。

### ② 写 MCP 配置(推荐项目级 `.mcp.json`,随仓库走)

项目级 `.mcp.json` 随仓库分发,团队成员克隆即得配置,优先选它;也可写用户级配置,二选一。`stitch` server 用 `npx @_davideast/stitch-mcp proxy` 启动:

```json
{
  "mcpServers": {
    "stitch": {
      "command": "npx",
      "args": ["@_davideast/stitch-mcp", "proxy"]
    }
  }
}
```

## 三种鉴权方式(按场景三选一)

| 方式 | 配置 | 适用场景 |
|---|---|---|
| **OAuth(默认)** | 已通过 `npx @_davideast/stitch-mcp init` 完成的 Google Cloud 项目 OAuth | 本机有浏览器、能交互登录的常规开发环境 |
| **API Key** | 设置环境变量 `STITCH_API_KEY` | **CI / 无浏览器**环境,无法走交互式 OAuth |
| **复用系统 gcloud** | 设置环境变量 `STITCH_USE_SYSTEM_GCLOUD=1` | 本机已 `gcloud auth login`,**复用现有 gcloud 登录态**,免再走一次 OAuth |

## 连接校验

写完配置后:**重启 / 重连 MCP**,然后让 Claude **调用一次 stitch 工具**确认握手成功——例如对一个**已有 project 调 `build_site`**,或**列出可用工具**。能列出 stitch 工具且不报鉴权错,即握手成功,可进入第 1 步。

## 排错清单(4 项回退)

握手失败时,逐项回退检查:

1. **计费是否开启** —— Google Cloud 项目的 Billing 必须为启用状态,否则 Stitch API 用不了。
2. **Stitch API 是否启用** —— 在该项目下确认 Stitch API 已启用。
3. **`npx` 能否拉到包** —— 网络 / registry 是否可达,`npx @_davideast/stitch-mcp` 能否正常拉取并运行(必要时清缓存重试)。
4. **配置 JSON 是否落在 Claude Code 实际读取的路径** —— 确认 `stitch` server 写在 Claude Code 真正读取的配置文件(项目级 `.mcp.json` 或用户级 `~/.claude.json`),而不是放错位置或层级写错。

逐项排掉后重连再校验;仍失败则回到「前置条件」复核 Google Cloud 项目状态。

## Google Cloud 计费与额度

- **必须开启计费**才能启用 Stitch API,否则 `init` 与后续拉取都会失败。
- 上游 Stitch 有约 **350 generations/月**的免费额度;超出后可能产生费用或受限。
- **缓解策略**:第 2 步**先把全部页面的 prompt 写好、确认页面清单无误,再一次性进画布生成**,避免反复试错把额度烧在重复生成上。一次性生成、批量拉取,既省额度也省往返。
