# 第三方 AI 工具收藏 👁️

本项目是为个人核心 AI Agent（如 Claude Code, Cursor, Windsurf 等）构建的能力扩展收藏库。我们从互联网上搜集优秀的第三方 Skill、MCP 服务、CLI 脚本及提效工具，确保存档内容的完整性与技术专业性。

---

## 📂 仓库结构

本项目参考精选技能规范，采用清晰、科学的分类目录结构：

```text
第三方AI工具收藏/
├── README.md                   # 全局技能索引概览（本文件）
└── categories/                 # 科学分类目录
    ├── web_retrieval/          # 网页检索与数据抓取类工具
    │   └── agent-reach/        # Agent-Reach 能力整合层
    │       └── README.md       # 本工具详细配置、自检与执行工作流说明
    ├── mcp_servers/            # Model Context Protocol 服务类工具
    ├── skills/                 # Agent 专属技能指令文件类工具
    └── developer_tools/        # 开发者提效工具
```

---

## 🛠️ 收藏工具索引

| 名称 | 核心功能 | 触发场景 | 详细说明 |
| :--- | :--- | :--- | :--- |
| **Agent-Reach** | 一键为 Agent 接入全网（推特、Reddit、B站等）免 API 费用的阅读与搜索能力 | 当 Agent 需要阅读/搜索推特、总结视频字幕、刷小红书等，且不想折腾繁琐 API 时 | [👉 详细配置与使用指南](categories/web_retrieval/agent-reach/README.md) |

---

## ⚙️ 全局安装与使用说明

1. **技能与工具拷贝**：
   从本仓库的 `categories/` 目录下将您需要的技能文件夹，复制到您 AI 客户端配置的技能路径下，或者直接按照各工具 `README.md` 的指引在本地执行部署。
2. **首次自检与环境自愈 (Onboarding & Doctor)**：
   本仓库收录的工具及技能均应具备良好的自检与环境检测逻辑。AI 代理在首次触发或执行任务前，应主动运行相关的诊断命令（例如 `doctor` 命令），自动检测 Python 依赖、Node.js 运行环境及 MCP 服务注册状态，并在发现缺失时自动引导用户进行配置或自动修复。
