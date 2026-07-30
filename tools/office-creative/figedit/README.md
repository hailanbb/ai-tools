# FigEdit · 图易编 (AI 图像解构与矢量重建技能)


> 🔗 **原项目 GitHub 地址**: 
[https://github.com/giszzt/figedit](https://github.com/giszzt/figedit)


FigEdit（中文名「图易编」）是一个旨在“让压平的图重新可编辑”的 AI Agent Skill。它能够将截图、论文配图、架构图、海报及 AI 生成图片自动拆解并重建为可编辑的分层 SVG 矢量图与原生 PowerPoint (`.pptx`) 演示文稿。

---

## 🛠️ 第一阶段：环境自检与前置依赖 (Doctor & Onboarding)

在调用 FigEdit 技能前，Agent 必须进行前置运行环境与依赖检查：

### 1. Python 环境与依赖库
* **Python 运行环境**：需要 Python 3.10+。
* **依赖库安装**：
  ```bash
  pip install -r requirements.txt
  ```
* **视觉与生成大模型配置**：检查 `.env` 中是否配置了视觉大模型（如 Claude 3.7 Vision / GPT-4o / Qwen-VL）及背景修复模型 API 密钥。

### 2. 依赖自愈与校验
若缺失必选依赖包或模版驱动，Agent 自动引导用户完成环境配置。

---

## 🚀 第二阶段：核心执行工作流 (Workflow)

FigEdit 将输入的平铺图像转换为结构化矢量图形的工作流：

### 1. 四步图像重建管线
1. **视觉解构与元素定位**：分析图片中的文本、矢量形状、公式、连线及图片资产。
2. **文本与公式抽取**：提取文字框与数学公式（转换为可编辑方程）。
3. **矢量重绘与背景清版**：对几何图形进行矢量重排，必要时对复杂背景生成擦除底板。
4. **多格式高保真导出**：将图层组装导出为 SVG 矢量图或全功能 `.pptx` 幻灯片。

### 2. 适用场景
* **AI 生成幻灯片/架构图改字**：将全像素图片解构为可编辑文本框与移动图标。
* **论文配图二次修改**：30 秒提炼论文图示结构，快速替换标注与色彩。
* **设计稿压平恢复**：无源文件时将海报或信息图还原为矢量分层结构。

---

## 📂 技能目录结构

```text
tools/office-creative/figedit/
├── README.md                           # 本重塑说明文档
├── README.en.md                        # 英文说明文档
├── SKILL.md                            # Agent Skill 主控制节点
├── agents/                             # 子 Agent 模块定义
├── scripts/                            # 提取与重建核心 Python 脚本
├── templates/                          # 导出格式模板
└── examples/                           # 重构前后对比示例集
```
