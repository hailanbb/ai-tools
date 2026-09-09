# Marketing Skills - 面向 AI Agent 的营销、增长与转化优化技能套件 (marketingskills)

> 🔗 **原项目 GitHub 地址**: [https://github.com/coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills)

Marketing Skills 是由 Corey Haines 开发的开源 AI Agent 增长与营销专属技能库。专为技术营销人、独立开发者与产品创始人打造，覆盖转化率优化 (CRO)、高转化文案撰写、AI 搜索引擎优化 (GEO/AEO)、付费投放、用户留存与增长工程全流程，支持 Claude Code, Cursor, Codex, Windsurf, Antigravity 等兼容 Agent Skills 规范的 70+ 主流 AI 编程智能体。

---

## 🛠️ 第一阶段：环境自检与客户端接入 (Doctor & Onboarding)

在 Agent 中加载与使用 Marketing Skills 之前，须进行自检与全局/客户端挂载：

### 1. 一键 CLI 挂载 (`npx skills`)
支持跨 70+ AI 智能体一键发现与安装：
```bash
# 全量安装全部营销技能
npx skills add coreyhaines31/marketingskills

# 仅安装指定技能（例如 CRO 与文案）
npx skills add coreyhaines31/marketingskills --skill cro copywriting

# 列出所有可用的技能模块
npx skills add coreyhaines31/marketingskills --list
```

### 2. 客户端原生插件配置
* **Claude Code 插件**：
  ```bash
  /plugin marketplace add coreyhaines31/marketingskills
  /plugin install marketing-skills
  ```
* **通用智能体 (Cursor / Antigravity / Windsurf)**：
  将 `skills/` 目录下的各项技能软链接或直接复制到项目根目录下的 `.agents/skills/` 即可被自动发现。

### 3. 环境与技能规范自检 (Doctor)
本套件自带官方技能格式校验脚本，可自动检查各项 Skill 的 YAML Frontmatter 与结构规范：
```bash
bash validate-skills.sh
```

### 4. 首次上下文初始化 (Product Marketing Context)
所有营销技能的基石是 `product-marketing` 技能。建议在首次使用前，在项目根目录创建并完善 `.agents/product-marketing.md`，录入产品的核心定位、目标受众 (ICP) 与独特价值主张 (UVP)。后续所有技能触发时将自动读取该上下文，确保产出的文案与策略高度一致。

---

## 🚀 第二阶段：核心执行工作流 (Workflow)

### 1. 技能协作拓扑与网络架构

```text
                            ┌──────────────────────────────────────┐
                            │          product-marketing           │
                            │    (各专项技能在执行前统一优先读取)    │
                            └──────────────────┬───────────────────┘
                                               │
     ┌──────────────┬─────────────┬────────────┼────────────┬──────────────┬──────────────┐
     ▼              ▼             ▼            ▼            ▼              ▼              ▼
┌──────────┐   ┌──────────┐  ┌──────────┐ ┌──────────┐ ┌──────────┐   ┌─────────────┐ ┌───────────┐
│ SEO 与   │   │  CRO与   │  │ 内容与   │ │ 付费投放 │ │ 用户留存 │   │ 销售赋能与  │ │ 策略与    │
│ AI 检索  │   │  转化率  │  │ 文案撰写 │ │ 与度量   │ │ 与增长   │   │ GTM 流程    │ │ 商业化    │
├──────────┤   ├──────────┤  ├──────────┤ ├──────────┤ ├──────────┤   ├─────────────┤ ├───────────┤
│seo-audit │   │cro       │  │copywritng│ │ads       │ │referrals │   │revops       │ │mktg-ideas │
│ai-seo    │   │signup    │  │copy-edit │ │ad-creativ│ │free-tools│   │sales-enable │ │mktg-psych │
│site-arch │   │onboarding│  │cold-email│ │ab-testing│ │churn-    │   │launch       │ │customer-  │
│programm  │   │popups    │  │emails    │ │analytics │ │ prevent  │   │pricing      │ │ research  │
│schema    │   │paywalls  │  │social    │ │          │ │community │   │competitors  │ │offers     │
└──────────┘   └──────────┘  └──────────┘ └──────────┘ └──────────┘   └─────────────┘ └───────────┘
```

### 2. 核心技能模块矩阵

| 营销板块 | 包含技能 | 核心能力与触发场景 |
| :--- | :--- | :--- |
| **转化优化 (CRO)** | `cro`, `signup`, `onboarding`, `popups`, `paywalls` | 落地页转化诊断、注册流程极简优化、新手引导留存激活、升级弹窗与功能门禁设计 |
| **内容与文案** | `copywriting`, `copy-editing`, `cold-email`, `emails`, `social`, `image` | 营销主页文案重写、B2B 冷邮件跟进序列、自动化邮件流、社交媒体图文生成与视觉配图 |
| **搜索与 AI 发现** | `seo-audit`, `ai-seo`, `programmatic-seo`, `site-architecture`, `schema`, `aso` | 站点 SEO 技术体检、面向 LLM 的 AI 搜索引擎优化 (GEO/AEO)、规模化落地页生成、应用商店 ASO |
| **度量与实验** | `analytics`, `ab-testing`, `attribution` | GA4 / 数据埋点全流程配置、A/B 实验假设设计与样本量估算、多渠道触点转化归因 |
| **留存与增长** | `churn-prevention`, `free-tools`, `referrals`, `lead-magnets`, `co-marketing` | 挽留弹窗与防流失机制、增长型免费工具规划、分销裂变与推荐计划设计、联合营销策划 |
| **商业与策略** | `marketing-ideas`, `marketing-plan`, `marketing-psychology`, `pricing`, `launch` | SaaS 增长点创意库、全面营销战略方案、定价包装分层、产品发布节奏规划 |
| **销售与 RevOps** | `revops`, `sales-enablement`, `prospecting`, `competitors` | 销售物料/Pitch Deck 生成、潜客画像与挖掘、竞品对比落地页设计、线索流转管理 |

### 3. 常见调用与触发方式

* **自然语言直接对话**：
  * “帮我优化当前 Landing Page 的 Hero 区转化率” ➔ 自动路由至 `cro` 与 `copywriting` 技能。
  * “为我们的 B2B 团队起草一套 4 封冷邮件开发信” ➔ 自动触发 `cold-email` 技能。
  * “检查当前站点的 AI 搜索引擎可见度，给出 GEO 优化建议” ➔ 自动触发 `ai-seo` 技能。
* **斜杠指令调用**：支持 `/cro`, `/emails`, `/seo-audit`, `/ab-testing` 等快捷指令直接唤醒。

---

## 📂 技能目录结构

```text
tools/productivity-developer/marketingskills/
├── README.md                           # 本重塑说明文档
├── AGENTS.md                           # 跨 Agent 行为控制规范
├── CLAUDE.md                           # Claude 专属规范
├── skills/                             # 40+ 专项营销与增长技能源码目录
├── scripts/                            # 自动化脚本与伙伴同步
├── tools/                              # 验证与集成工具配置
├── validate-skills.sh                  # 技能语法与规范校验脚本
└── VERSIONS.md                         # 版本演进记录
```
