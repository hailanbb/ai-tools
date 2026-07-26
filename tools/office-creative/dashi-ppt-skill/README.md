# 大师 PPT (Dashi PPT Skill) - 网页 PPT / 可编辑 PPTX 技能

大师 PPT (Dashi PPT Skill) 是一款专为 AI Agent（如 Claude Code, Codex, 豆包, Marvis, Workbuddy 等）打造的高品质演示文稿生成 Skill。它能将结构化文档或大纲自动转化为带本地控制台的离线 HTML 网页 PPT，并支持一键导出为原生、文字保持可编辑的 `.pptx` 文件或 PDF。

---

## 🛠️ 第一阶段：环境自检与前置依赖 (Doctor & Onboarding)

在调用大师 PPT 技能前，Agent 必须执行前置依赖诊断：

### 1. 环境依赖检查
* **Node.js 运行环境**：确保本机 Node.js 20+ 及 `npm` 可用。
* **浏览器导出依赖**：如果需要导出 `.pptx` 或 PDF 格式，本机必须安装有 Chrome、Chromium 或 Microsoft Edge。
* **一键安装/更新指令**：
  ```bash
  # 通用安装指令
  npx dashi-ppt-skill@latest
  # 国内镜像源安装
  npx --registry=https://registry.npmmirror.com dashi-ppt-skill@latest
  ```

### 2. 初始化与依赖自愈
若 Agent 检测到缺失组件或导出驱动，引导用户运行一键安装脚本补齐依赖。

---

## 🚀 第二阶段：核心执行工作流 (Workflow)

大师 PPT 遵循“设计系统选型 -> 结构布局生成 -> 交互控制台微调 -> 多格式导出”工作流：

### 1. 核心视觉与版式能力
* **12 套专业视觉主题**：覆盖轻拟态、炫光紫绿、深浅代码、玻璃糖果、色谱图表、黑金实验、高能增长、深蓝杂志等多样风格。
* **1020 个版式页面**：涵盖 20 种页面角色（封面、目录、指标、趋势、对比、流程、SWOT、波特五力、PEST、商业模式画布、甘特图等）。
* **HTML 网页控制台**：产出即编辑器，包含滑杆、开关与下拉菜单，可就地点击修改文字、拖拽替换图片槽位。

### 2. 导出与交付能力
* **HTML 离线包**：包含完整的动画、交互控件与明暗主题切换。
* **可编辑 `.pptx` 导出**：逐节点精准还原，文本与形状保持 100% 可编辑。
* **PDF 导出**：像素级精度的静止版演示文稿导出。

---

## 📂 技能目录结构

```text
tools/office-creative/dashi-ppt-skill/
├── README.md                           # 本重塑说明文档
├── README.en.md                        # 英文说明文档
├── skills/                             # Agent Skill 核心规范
├── npm-dist/                           # Npm 发行包构建产物
├── .claude-plugin/                     # Claude Code 插件配置文件
└── LICENSE                             # AGPL-3.0 开源协议
```
