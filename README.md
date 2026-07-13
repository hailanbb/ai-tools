# 第三方 AI 工具收藏 👁️

本项目是为个人核心 AI Agent（如 Claude Code, Cursor, Windsurf, Antigravity 等）构建的能力扩展收藏库。我们从互联网上搜集优秀的第三方 Skill、MCP 服务、CLI 脚本及提效工具，确保存档内容的完整性与技术专业性。

---

## 📂 仓库结构

本项目采用扁平化的物理目录结构，便于直接在 GitHub 或本地快速访问各个工具：

```text
第三方AI工具收藏 (ai-tools)/
├── README.md                   # 全局工具索引概览（本文件）
└── tools/                      # 统一的分类工具/技能存放目录
    ├── mcp-servers/            # MCP 工具分类目录
    │   └── enquire-mcp/
    ├── web-retrieval/          # 网络与检索工具分类目录
    │   └── agent-reach/
    ├── office-creative/        # 办公与设计工具分类目录
    │   └── ai-write-flow/
    ├── productivity-developer/ # 效能与开发工具分类目录
    │   └── godogen/
    ├── finance-investment/     # 金融理财分类目录
    │   └── cyberagent/
    └── entertainment-lifestyle/# 趣味生活与个人助理分类目录
        └── mingli-master/
```

---

## 🛠️ 收藏工具索引

所有的工具均统一扁平化放置于 `tools/` 目录下，并按以下逻辑分类进行归纳：

### 🔌 MCP 工具 (MCP Servers)

通过 Model Context Protocol 向 AI 客户端提供可调用的外部工具接口与服务：

| 工具名称 | 核心功能 | 触发场景 | 详细说明 |
| :--- | :--- | :--- | :--- |
| **enquire-mcp** | 厂商中立、时效感知的 Obsidian 长期记忆与检索 MCP 服务，支持 BM25 + 本地向量检索与重排、Louvain 社区图谱增强，零云端调用 | 将个人 Obsidian 仓库配置为 AI 客户端（Cursor、Claude Code等）的本地时效感知长期记忆库时 | [👉 详细配置与使用指南](tools/mcp-servers/enquire-mcp/README.md) |
| **fast-note-sync-service** | 支持原生 MCP 协议和 REST API 的高性能 Obsidian 多端实时同步与网页管理服务平台，打通 AI 对个人知识库的读写通道 | 将本地 Obsidian 笔记仓库发布或同步到远端，或接入 Cursor 等 AI 客户端的 MCP 协议读写笔记时 | [👉 详细配置与使用指南](tools/mcp-servers/fast-note-sync-service/README.md) |
| **mcp-toolbox** | 数据库 MCP 服务与自定义工具框架，支持一键连接 PostgreSQL、MySQL 等关系型及非关系型数据库，提供安全 SQL 执行和 NL2SQL 能力 | 当 Agent 需要直接读取、查询或操作数据库（AlloyDB, BigQuery, Spanner, Postgres, MySQL 等），或需要构建安全的数据库交互工具时 | [👉 详细配置与使用指南](tools/mcp-servers/mcp-toolbox/README.md) |

### 🌐 网络与检索工具 (Web & Retrieval Tools)

专注于网页数据爬取、实时检索、音视频内容抓取与过滤：

| 工具名称 | 核心功能 | 触发场景 | 详细说明 |
| :--- | :--- | :--- | :--- |
| **Agent-Reach** | 一键为 Agent 接入全网（推特、Reddit、B站等）免 API 费用的阅读与搜索能力 | 当 Agent 需要阅读/搜索推特、总结视频字幕、刷小红书等，且不想折腾繁琐 API 时 | [👉 详细配置与使用指南](tools/web-retrieval/agent-reach/README.md) |
| **Scrapling** | 高性能自适应网页抓取与解析框架，内置防爬绕过（Cloudflare）、无头浏览器自动化、并发 Spider 及 AI 友好 MCP 服务 | 需要对复杂网页（强动态加载、有反爬限制）进行大规模爬取，或为 AI 客户端提供网页数据提取 MCP 服务时 | [👉 详细配置与使用指南](tools/web-retrieval/scrapling/README.md) |
| **anysearch-skill** | 为 AI 智能体提供统一的搜索引擎层，支持通用全网检索、社交媒体垂直发现、多句并发批量搜索，以及网页内容纯净化提取 Markdown | 当 Agent 需要实时上网检索多条背景信息、总结网页内容、或在社交平台上进行深度舆情发现时 | [👉 详细配置与使用指南](tools/web-retrieval/anysearch-skill/README.md) |
| **last30days-skill** | 基于点赞、预测赔率等真实反馈对信息加权打分，提供过去 30 天跨社交平台（Reddit、X、YouTube 视频转录等）的聚类搜索与舆情提炼 | 需要对人物、产品、事件或技术进行深度近况侧写，或者对近期社交媒体上的爆点与趋势进行横向监控时 | [👉 详细配置与使用指南](tools/web-retrieval/last30days-skill/README.md) |
| **bili-note** | 提炼 B 站视频、音频转写、图文动态与评论，按信息量动态控制笔记预算，归档为 Markdown 知识笔记 | 提取、总结、整理 B 站视频/图文/动态内容，保存至本地或 Obsidian 知识库 | [👉 详细配置与使用指南](tools/web-retrieval/bili-note/README.md) |
| **video-batch-download** | 多平台（抖音、B站、小红书）公开视频批量下载与本地语音转写工具，支持分离流合并，本地 faster-whisper 转录和结构化输出 | 批量下载抖音/B站/小红书公开视频，或转录音频内容为文本进行后续分析时 | [👉 详细配置与使用指南](tools/web-retrieval/video-batch-download/README.md) |

### ✍️ 办公与设计工具 (Office & Creative Tools)

专注于文档自动生成、排版美化、文案深度润色与写作工作流：

| 工具名称 | 核心功能 | 触发场景 | 详细说明 |
| :--- | :--- | :--- | :--- |
| **gorden-ppt-skill** | 基于 21 套内置或自定义的高质量中文模板生成与编辑 PPTX 演示文稿，支持自动出框检测与同级标题字号一致校验 | 需要制作年终/季度总结、商务提案、项目汇报、述职竞聘等高质量 PPTX 演示文稿且不破坏排版设计时 | [👉 详细配置与使用指南](tools/office-creative/gorden-ppt-skill/README.md) |
| **ai-write-flow** | 技术博客与多端图卡写作流程控制技能包，支持选题对齐、时效核查、结构硬性门禁以及多轮降 AI 腔调的审查机制 | Agent 需要协助撰写技术博客、公众号长文、图卡内容，或对已有文本进行事实核验和中文化润色（降 AI 腔）时 | [👉 详细配置与使用指南](tools/office-creative/ai-write-flow/README.md) |
| **taste-skill** | 提供反模板化的 AI 前端美学设计规范与 GSAP 交互骨架，支持风格拨盘调节，指导智能体产出高品质的 UI 页面 | 当需要编写、重构或优化网页 UI，且希望纠正 AI 生成的低级、重复及廉价模板风格的前端界面时 | [👉 详细配置与使用指南](tools/office-creative/taste-skill/README.md) |
| **humanizer-zh** | 基于维基百科 24 种 AI 写作特征检测规则，识别并去除中文文本的 AI 生成痕迹，智能润色出自然、鲜活且符合中文习惯的人性化文本 | 当需要改写 AI 腔调的文案、净化 AI 味文本、翻译或审校需要人情味的技术与博客长文时 | [👉 详细配置与使用指南](tools/office-creative/humanizer-zh/README.md) |
| **cangjie-skill** | 基于 RIA-TV++ 管道的方法论蒸馏工具，支持从书籍、长视频转录、播客等文本中，抽取、验证并构建高执行力的 AI 技能卡（SKILL.md） | 当需要系统性分析一本书或一个知识视频/播客，并将其提炼为可在 Agent 中被场景触发的模块化执行工具时 | [👉 详细配置与使用指南](tools/office-creative/cangjie-skill/README.md) |

### 🛠️ 效能与开发工具 (Productivity & Developer Tools)

提供开发辅助、代码生成、Prompt 优化与 Agent 工作流治理：

| 工具名称 | 核心功能 | 触发场景 | 详细说明 |
| :--- | :--- | :--- | :--- |
| **godogen** | 基于 Godot、Bevy 与 Babylon.js 的自主游戏开发生成器，通过大模型生成 3D/2D 素材，并基于运行画面的录像回放进行闭环调试 | 当需要使用 AI 智能代理自动从零构建、生成素材并迭代调试 Godot 4、Bevy 或 Babylon.js 游戏项目时 | [👉 详细配置与使用指南](tools/productivity-developer/godogen/README.md) |
| **prompt-optimizer** | 通过系统/用户提示词的评估、对比和多轮迭代优化，提升 AI 输出质量，支持文生图/图生图等视觉提示词调优，并提供 MCP 协议集成 | 当需要编写、迭代、优化大模型提示词，进行多模型输出效果对比测试，或为 AI 客户端接入提示词优化 MCP 服务时 | [👉 详细配置与使用指南](tools/productivity-developer/prompt-optimizer/README.md) |
| **skills (Matt Pocock's)** | 面向 AI 智能体的工程实践技能集，包含意图对齐拷问（Grill）、测试驱动开发（TDD）以及 Bug 系统化诊断等防盲目编码技能 | 在 Agent 动笔写复杂需求代码前对齐意图、在项目开发中引入红绿 TDD 测试反馈环、或对复杂系统进行 Bug 深度诊断时 | [👉 详细配置与使用指南](tools/productivity-developer/skills/README.md) |

### 📈 金融理财 (Finance & Investment)

专注于金融市场行情、供应链瓶颈发现、全市场深度基本面与投资分析：

| 工具名称 | 核心功能 | 触发场景 | 详细说明 |
| :--- | :--- | :--- | :--- |
| **cyberagent** | 物理瓶颈与反共识全市场投资分析框架，通过五层供应链与财务模型，避免叙事驱动的泡沫，寻找被低估的瓶颈所有者 | 需要对标的公司进行深度基本面与供应链约束分析，或需防范追高泡沫投资标的时 | [👉 详细配置与使用指南](tools/finance-investment/cyberagent/README.md) |

### 🔮 趣味生活与个人助理 (Entertainment & Lifestyle)

探索 AI 智能体在个人生活娱乐、文化分析及助理层面的趣味应用：

| 工具名称 | 核心功能 | 触发场景 | 详细说明 |
| :--- | :--- | :--- | :--- |
| **mingli-master** | 结合 Python 的 iztro-py 库进行精准紫微斗数排盘，提供有温度的 LLM 命理及流年解读，并支持手相交叉比对与暗色星空主题的 HTML 可视化报告生成 | 当需要进行紫微斗数排盘、生辰八字性格运势分析、或上传掌纹进行命盘交叉比对时 | [👉 详细配置与使用指南](tools/entertainment-lifestyle/mingli-master/README.md) |

---

## ⚙️ 全局安装与使用说明

1. **技能与工具拷贝**：
   从本仓库的 `tools/` 目录下将您需要的工具文件夹，直接拷贝到您 AI 客户端配置的技能路径下，或者直接按照各工具 `README.md` 的指引在本地执行部署。
2. **首次自检与环境自愈 (Onboarding & Doctor)**：
   本仓库收录的工具及技能均具备良好的自检与环境检测逻辑。AI 代理在首次触发或执行任务前，应主动运行相关的诊断命令（例如 `doctor` 命令），自动检测 Python 依赖、Node.js 运行环境及 MCP 服务注册状态，并在发现缺失时自动引导用户进行配置或自动修复。