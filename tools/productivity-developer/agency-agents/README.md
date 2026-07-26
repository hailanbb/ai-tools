# The Agency - 全领域 AI 专家 Agent 团队套件 (agency-agents)

The Agency 是一套经过精心打磨的开源 AI 专家 Agent 角色库与自动化转换套件，涵盖工程、设计、安全、营销、金融、产品、学术等 20+ 个专业领域。每个 Agent 均具备专有的领域深度、个性声音、交付门禁与实战代码流。

---

## 🛠️ 第一阶段：环境自检与前置依赖 (Doctor & Onboarding)

在使用 `agency-agents` 的角色套件或跨客户端一键安装前，必须进行环境诊断：

### 1. 多客户端环境检测
* **原生桌面 App 安装**：支持直接通过原生 Desktop App (macOS/Windows/Linux) 或 Homebrew (`brew install --cask msitarzewski/agency-agents/agency-agents`) 安装更新。
* **脚本转换与自动诊断**：
  在终端运行转换与交互式安装脚本：
  ```bash
  # 1. 自动转换生成多客户端集成文件
  ./scripts/convert.sh

  # 2. 交互式检测并安装至已安装的 AI 客户端 (Claude Code, Cursor, Antigravity, Gemini CLI, Codex 等)
  ./scripts/install.sh
  ```

### 2. 特定团队安装路由 (Division Routing)
可根据团队需求按领域精准安装，避免臃肿：
```bash
./scripts/install.sh --tool claude-code --division engineering,security
./scripts/install.sh --tool cursor --agent frontend-developer,ui-designer
```

---

## 🚀 第二阶段：核心执行工作流 (Workflow)

The Agency 提供了 20+ 个精细化分类的 AI 专家 Agent 团队：

### 1. 核心领域 Agent 团队一览

```text
tools/productivity-developer/agency-agents/
├── engineering/                        # 前端、后端、全栈与系统架构师 Agent
├── security/                           # 网络安全、渗透测试与代码审计 Agent
├── design/                             # UI/UX 设计师与视觉美学 Agent
├── product/                            # 产品经理、需求收敛与用户路径 Agent
├── testing/                            # TDD、自动化测试与 QA Agent
├── academic/                           # 论文研究与文献综述 Agent
├── finance/                            # 财务分析与商业估值 Agent
├── marketing/                          # 市场营销、SEO 与文案 Agent
├── game-development/                   # 游戏设计、Godot/Unreal 开发 Agent
├── scripts/                            # 客户端转换 (convert.sh) 与安装 (install.sh) 脚本
└── divisions.json                      # 全量 Agent 映射数据库
```

### 2. 交付物标准与触发规范
* **可量化交付 (Deliverable-Focused)**：每个 Agent 规范文件中均强制定义了输入校验、代码规范、测试用例及交付标准。
* **无缝激活方式**：支持在对话中直接唤醒模式（如 `"Hey Claude, activate Frontend Developer mode..."`）。
