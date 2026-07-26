# ✍️ PPT Master (AI 原生 PowerPoint 深度生成工具)

PPT Master 是一套运行于 AI Agent 中的原生 PowerPoint 演示文稿生成工作流。支持将 PDF、DOCX、Markdown、网页 URL 或纯文本等任意材料，直接在本地转换为包含原生母版、形状、过渡动效、数据图表及语音旁白的高质量原生可编辑 `.pptx` 演示文稿。

---

## 🛠️ 第一阶段：环境自检与首次初始化引导 (Doctor & Onboarding)

### 1. 环境依赖体检 (Environment Doctor)
在首次运行或调用 PPT Master 之前，AI Agent 必须在终端中执行以下自检操作：

```bash
# 1. 验证 Python 3.10+ 运行环境
python --version

# 2. 检查 python-pptx 及核心依赖库
python -c "import pptx; print('python-pptx 依赖已就绪')"
```

* **自愈与自动修复逻辑**：
  * 若系统未安装相关 Python 依赖库，AI Agent 需自动执行以下命令完成安装：
    ```bash
    pip install -r requirements.txt
    ```

### 2. 首次初始化与凭证配置
* **密钥与本地环境配置**：PPT Master 生成过程完全在本地运行，数据不出本地。如需结合 LLM 或多模态模型（如 Kimi K3、Claude 3.5 Sonnet、OpenAI 等）进行智能解析，请复制并配置 `.env` 凭证：
  ```bash
  cp .env.example .env
  ```
  根据使用的 API 服务商，在 `.env` 中填入对应的 `OPENAI_API_KEY` 或 `KIMI_API_KEY` 等认证参数。

---

## 🚀 第二阶段：核心执行工作流 (Workflow & Usage)

### 1. 核心工作流程与路由机制
PPT Master 遵循“先理顺逻辑，再谈视觉”的原生双阶段生成路线：
1. **内容解构与逻辑规划**：解析输入的大篇幅材料（PDF/DOCX/Markdown/URL），提取核心论点与段落层级，生成演示大纲结构。
2. **样式风匹配与 JSON 描述构建**：匹配特定的设计风格（如杂志风、新闻财经彭博风、瑞士栅格风、毛玻璃 SaaS 风、孟菲斯风等），生成完整的渲染描述。
3. **PowerPoint 原生编译**：基于 python-pptx 生成真正的可编辑 `.pptx` 演示文稿，支持结合提示词与旁白音轨自动生成配音放映。

### 2. 核心指令手册与使用方法

* **方法 1：作为 Skill 插件集成**
  ```bash
  npx skills add hugohe3/ppt-master
  ```

* **方法 2：本地 Python 脚本生成**
  ```bash
  # 传入本地文档生成 PPT
  python -m src.cli generate --input "documents/report.pdf" --output "exports/output.pptx"
  ```

### 3. 卸载与资源清理
若需物理卸载或清理生成缓存：
```bash
# 清理生成的临时导出文件与缓存
Remove-Item -Recurse -Force exports/
```
