# 中文 Skill 创作工具 (Skill Creator CN)

专门针对中文语境优化的 AI Agent Skill 创作、重构与评估调试工具。

---

## 🛠️ 第一阶段：环境自检与引导配置 (Doctor & Onboarding)

### 1. 环境自检
* **本地文件读写权限**：必须具备对 `.gemini/config/skills/` 或本地 Skill 存储目录的读写权限。
* **交互模式确认**：确认 Agent 支持引导式提问（Interview Mode），用于精准补全用户需求。

### 2. 启动方式
* **触发关键词**：“创建Skill”、“新建技能”、“优化Skill”、“编写Agent技能”。

---

## 🚀 第二阶段：核心执行工作流 (Workflow)

Skill 创作与重构遵循标准的四步工作流：

### 1. 需求收敛与结构化 (Interview)
通过互动式提问，明确新 Skill 的：
* 触发场景与边界条件
* 前置依赖与环境自检（Doctor）
* 核心 Workflow 阶段划分
* 规范约束与输出格式

### 2. 自动化构建 (Build)
* 自动生成包含 YAML Frontmatter 的 `SKILL.md` 文件。
* 编写清晰简练的中文 prompt 与阶段引导。

### 3. 评估与测试 (Eval & Benchmark)
* 提供评测用例生成模版，测试 Skill 在极端边界条件下的响应稳定性。
* 优化 Description，提升 AI Agent 的自动触发精准度。

### 4. 部署与同步 (Deploy)
* 导出符合 Antigravity / Claude 规范的 Skill 文件夹格式。
