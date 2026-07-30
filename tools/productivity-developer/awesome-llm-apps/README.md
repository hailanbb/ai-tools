# 开源 LLM 应用与 Agent 实战例程库 (awesome-llm-apps)

> 🔗 **原项目 GitHub 地址**: [https://github.com/Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps)

`awesome-llm-apps` 是一个收录了 100+ 个高质量、开源且经过端到端测试的 AI Agent、Agent Skills 以及 RAG（检索增强生成）应用的实战模板库（基于 Apache-2.0 协议）。该项目完美兼容 Claude、Gemini、GPT、DeepSeek、Llama、Qwen 等主流大模型，支持一键部署与工程化落地。

---

## 🛠️ 第一阶段：环境自检与首次初始化引导 (Onboarding & Doctor)

在首次运行 `awesome-llm-apps` 中的任意案例之前，Agent 必须协助用户进行 Python 开发环境自检与本地 API 密钥配置。

### 1. 运行环境自检 (Doctor Check)

执行以下命令检查本地 Python 环境及核心依赖：

```bash
python --version
pip --version
```

* **Python 版本要求**：建议使用 Python 3.10 及以上版本。
* **依赖自动修复**：若选择运行特定子目录（如 `starter_ai_agents/ai_travel_agent`），请首先进入该案例目录并自动安装所需依赖：
  ```bash
  pip install -r requirements.txt
  ```

### 2. API 密钥配置

根据所使用的案例和底层模型，在项目环境变量中配置对应的 API Key。

```bash
# 复制环境变量模板
cp .env.example .env

# 配置主流大模型 API 密钥（按需设置）
export OPENAI_API_KEY="your-openai-api-key"
export GEMINI_API_KEY="your-gemini-api-key"
export ANTHROPIC_API_KEY="your-anthropic-api-key"
```

---

## 🚀 第二阶段：核心执行工作流 (Workflow)

### 1. 快速上手运行 (Quick Start)

#### 方式 A：为编码 Agent 一键添加 Agent Skill (以 Npx Skills 为例)
只需要 10 秒即可为 Claude Code、Cursor、Codex 等 Agent 添加能力：

```bash
npx skills add https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/agent_skills/project-graveyard
```

#### 方式 B：快速启动单案例应用 (以 Streamlit 应用为例)

```bash
cd starter_ai_agents/ai_travel_agent
pip install -r requirements.txt
streamlit run travel_agent.py
```

### 2. 案例分类与应用覆盖概览

* **🧩 Agent Skills (智能体扩展技能卡)**：
  * **Project Graveyard**：自动分析已被放弃的侧边项目，评估失败原因并协助拯救有价值的项目。
  * **Scope Creep Detector**：检测 Git Code Diff 是否超出预期需求范围，给出切分与优化建议。
  * **Commit Archaeologist**：从 Git 历史提交、代码变更与上下文追踪中重建代码行存在的前因后果。
  * **Self-Improving Agent Skills**：结合 ADK 与 Gemini 自动迭代和重写评估 Skill。

* **🌱 Starter AI Agents (基础初学者 Agent)**：
  * **AI Blog to Podcast Agent**：将任意博客文章链接转换为播客音频对话。
  * **AI Data Analysis Agent**：支持使用自然语言直接对 CSV/Excel 表格进行数据交互与图表分析。
  * **AI Medical Imaging Agent**：基于 Gemini 多模态能力对 X 光片与医学影像进行诊断分析。

* **🚀 Advanced AI Agents (高级单/多智能体应用)**：
  * **AI Travel Planner Agent Team**：多 Agent 协作团队，提供旅行规划、机票酒店查找与行程生成。
  * **AI Legal Agent Team**：法律研究、合同条款审核与风险对冲多 Agent 团队。
  * **AI Financial Research Agent**：股票/财报多维深度数据分析与估值模型计算。

* **🎙️ Voice & Always-On Agents (语音交互与全天候驻留 Agent)**：
  * **Always-On HN Briefing Agent**：后台全天候监控 Hacker News 爆点与趋势，自动生成提炼简报。
  * **Insurance Claim Live Agent Team**：实时语音完成理赔申报与核验。
