# Claude for Legal — 中国法版本 (claude-for-legal-ZH)


> 🔗 **原项目 GitHub 地址**: 
[https://github.com/CSlawyer1985/claude-for-legal-ZH](https://github.com/CSlawyer1985/claude-for-legal-ZH)


`claude-for-legal-ZH` 是 Anthropic 官方 `claude-for-legal` 的系统性中国法适配版本，旨在为律师及法务团队提供针对中国法律体系（民法典合同编、个人信息保护法、民事诉讼法、公司法等）的参考 Agent、技能与 MCP 数据连接器。

---

## 🛠️ 第一阶段：环境自检与初始化 (Doctor & Onboarding)

在首次使用或配置插件前，AI Agent 必须指导用户完成依赖诊断与实践画像配置：

### 1. 插件安装与市场关联
* **Claude Code 市场安装**：
  ```bash
  # 添加本仓库为插件市场源
  /plugin marketplace add <path-to-repo>

  # 按需安装特定领域法律插件
  /plugin install commercial-legal@claude-for-legal-zh
  /plugin install privacy-legal@claude-for-legal-zh
  /plugin install corporate-legal@claude-for-legal-zh
  ```

### 2. 实践画像冷启动面试 (`cold-start-interview`)
* **初始化引导**：首次运行必须执行冷启动面试命令（如 `/commercial-legal:cold-start-interview`），将执业画像、常用主合同范本及审核指引写入配置文件。
* **MCP 数据连接器配置**：配置并运行 **yuandian (元典) MCP** 客户端，打通人民法院案例库、北大法宝及法规数据库的自动检索与交叉验证通道。

---

## 🚀 第二阶段：核心执行工作流 (Workflow)

`claude-for-legal-ZH` 内置严密的法律工程规则与质量门禁：

### 1. 核心法律安全门禁与纪律
* **风险评价六维度**：定性 -> 敞口 -> 概率 -> 可规避性 -> 商业权衡 -> 紧迫性。
* **主体信用自动查询**：首次涉及非自然人主体自动触发“实体锚定 -> 风险扫描 -> 关键人员穿透”。
* **三层来源溯源标签**：所有法条依据与案例引用均需标注溯源分类（法条原文/元典检索/模型知识）。
* **三轮检索策略与效能审计**：改写检索表达 -> 分层关键词 -> 三轮递进检索。

### 2. 专业法律工具领域分类

```text
tools/office-creative/claude-for-legal-ZH/
├── commercial-legal/                   # 商事合同审查与谈判
├── privacy-legal/                      # 个人信息保护与数据安全
├── corporate-legal/                    # 公司治理与并购尽调
├── litigation-legal/                   # 诉讼证据与庭审准备
├── employment-legal/                   # 劳动用工与争议仲裁
├── ip-legal/                           # 知识产权与专利/商标
├── regulatory-legal/                   # 监管合规与行政处罚响应
├── ai-governance-legal/                # AI 治理与大模型合规
├── legal-clinic/                       # 法律诊所与法律咨询
└── managed-agent-cookbooks/            # 托管 Agent API 部署脚本
```
