# Vibe Resume Skill - AI 简历生成与 12 套模板排版技能 (vibe-resume-skill)

Vibe Resume Skill 是一套专门面向 AI Coding Agent（支持 Codex, Kimi, WorkBuddy, 扣子, Claude 等）的智能简历生成、排版美化与多岗位 (JD) 匹配 Skill 套件。它内置 12 套符合 A4 印刷标准及 ATS 友好的专业 HTML/PDF 模板（涵盖经典单栏、双栏 Grid、深色侧栏、年报档案风、极客代码风及包豪斯几何风），能自动控制内容密度、单页一页排版对齐与多版本简历管理。

---

## 🛠️ 第一阶段：环境自检与模板库概览 (Doctor & Onboarding)

在 Agent 中加载与使用 Vibe Resume Skill 前，须了解其模板架构：

### 1. 12 套内置 A4 HTML/PDF 模板矩阵
* **实用系**（阅读体验优先、内容密度高、ATS 友好）：
  * `basic-a4`：经典单栏标准款。
  * `editorial`：双栏 Grid 网格，字重层级丰富。
  * `sidebar-compact`：深色侧栏，高视觉辨识度。
  * `corporate-classic`：外企经典商务款。
  * `gov-red`：党政风庄重规范版。
  * `folio-ledger`：年报档案编号索引款。
* **个性系**（适合技术、极客、设计与创意岗位）：
  * `code-poetry`：源代码隐喻极客风。
  * `mono-raw`：Brutalist 等宽字符排版。
  * `swiss-neue`：瑞士主义隐形网格款。
  * `bauhaus`：包豪斯几何三原色款式。

---

## 🚀 第二阶段：核心执行工作流 (Workflow)

AI 辅助简历生成与动态排版工作流：

### 1. 经典应用场景与指令

```text
# 场景 1：零散经历构建全新一页简历
"根据这些项目文档整理一份 AI 产品经理简历，使用 basic-a4 模板，输出一页 HTML 与 PDF。"

# 场景 2：现有简历增补内容与重新对齐
"保留当前模板，把这段最新实习经历加入；不要删除其他内容，重新平衡页面垂直留白与一页分页。"

# 场景 3：针对不同 JD 导出定制版本
"基于这份岗位 JD 将侧重点调整为数据产品方向，保留原始事实，单独导出一份专用版本。"
```

---

## 📂 技能目录结构

```text
tools/office-creative/vibe-resume-skill/
├── README.md                           # 本重塑说明文档
├── SKILL.md                            # Agent 核心技能声明与排版控制节点
├── assets/                             # 12 套 A4 模板源码 (HTML/CSS) 及预览图
├── references/                         # 一页排版法则、ATS 规范与样式准则
└── scripts/                            # 自动化格式转换与辅助处理脚本
```
