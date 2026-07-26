# Easy-Vibe · AI 驱动编程与 Agent 开发零基础交互教程 (easy-vibe)

Easy-Vibe 是由 Datawhale 开源的自然语言/AI 驱动编程（Vibe Coding）零基础交互式教程与 Agent 实战项目套件。项目旨在让零基础用户及开发者能够通过自然语言与 AI 协同构建全栈应用，涵盖 10 种语言文档、自适应学习地图、IDE Agent 协作模拟器、RAG 可视化原理及 OpenClaw 实战指南。

---

## 🛠️ 第一阶段：环境自检与多语言本地部署 (Doctor & Onboarding)

在运行或部署 Easy-Vibe 交互教程与应用模板前，须进行环境自检：

### 1. Node.js 与依赖自检
* **Node.js 运行环境**：需要 Node.js 18.0+。
* **教程框架与构建**：
  ```bash
  # 安装项目依赖
  npm install

  # 启动本地开发预览服务器 (VuePress / VitePress)
  npm run dev

  # 构建静态生产站点
  npm run build
  ```

### 2. 多语言文档路由检测
项目支持 10 种语言版本文档（位于 `docs-readme/`），可以根据系统语言自动映射或手动查阅。

---

## 🚀 第二阶段：核心执行工作流 (Workflow)

Easy-Vibe 核心教程与实战体验路径：

### 1. 四步 Vibe Coding 学习路径
1. **零基础学习地图 (Learning Map)**：自适应梯度式导引，解决“学完就忘”的痛点。
2. **IDE 模拟器与 Agent 协同**：在虚拟 IDE 环境中感受 Cursor, Trae 及 Agent 提示词协同编码流程。
3. **RAG 交互可视化**：点击式直观体验向量数据库与 RAG 上下文检索的原理链条。
4. **OpenClaw 智能体实战**：配合 `hello-claw` 完成自主智能体的搭建与多渠道部署。

---

## 📂 技能目录结构

```text
tools/productivity-developer/easy-vibe/
├── README.md                           # 本重塑说明文档
├── AGENTS.md                           # Agent 系统角色规范
├── CLAUDE.md                           # Claude 接入说明
├── docs/                               # 核心交互教程与多语言源文件
├── docs-readme/                        # 10 种语言版本的 README 指南
├── assets/                             # 原理动画、矢量 Logo 与交互 UI 资源
├── config/                             # 站点与构建配置
└── scripts/                            # 自动化脚本与辅助工具
```
