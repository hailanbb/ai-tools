# 多格式文档转 Markdown 工具 (markitdown)

> 🔗 **原项目 GitHub 地址**: [https://github.com/microsoft/markitdown](https://github.com/microsoft/markitdown)

`MarkItDown` 是由微软 AutoGen 团队开源的轻量级 Python 工具，专门用于将各种格式的文件（PDF、Word、Excel、PowerPoint、图片 OCR、音频转写、HTML、EPub、ZIP 等）提取并转换为结构化的 Markdown 格式，以便大语言模型（LLMs）和文本分析管道直接消费。

---

## 🛠️ 第一阶段：环境自检与首次初始化引导 (Onboarding & Doctor)

在首次使用 MarkItDown 之前，Agent 必须协助用户进行 Python 环境自检与依赖包安装。

### 1. 运行环境自检 (Doctor Check)

在终端运行以下自检命令：

```bash
# 检查 Python 版本 (需 Python 3.10 或更高)
python3 --version || python --version

# 安装 markitdown 包
pip install markitdown
```

针对特定格式（如 PDF、Office 或 OCR 支持），可安装可选依赖插件：

```bash
# 安装支持所有标准格式的扩展
pip install "markitdown[all]"
```

### 2. 交互式使用与 API 依赖

如果需要进行图像描述生成（GPT-4o 多模态增强）或语音音频转写（Whisper），可配置对应环境秘钥：

```bash
export OPENAI_API_KEY="your-openai-api-key"
```

---

## 🚀 第二阶段：核心执行工作流 (Workflow)

### 1. 命令行 CLI 工作流 (Command Line Interface)

安装后可以直接在命令行中一键转换任意文件：

```bash
# 转换单个文档并输出到控制台或文件
markitdown input.pdf -o output.md
markitdown presentation.pptx -o presentation.md
markitdown document.docx -o document.md
markitdown data.xlsx -o data.md
```

### 2. Python SDK 核心调用代码

```python
from markitdown import MarkItDown

md = MarkItDown()

# 1. 基础转换 (支持 PDF, Word, PPT, Excel, HTML 等)
result = md.convert("example.pdf")
print(result.text_content)

# 2. 结合 OpenAI 进行多模态转换 (例如描述图片)
from openai import OpenAI

client = OpenAI()
md_llm = MarkItDown(llm_client=client, llm_model="gpt-4o")
result_img = md_llm.convert("sample.jpg")
print(result_img.text_content)
```

### 3. 支持的文件转换类型

* **文档格式**：PDF (`.pdf`), Word (`.docx`), PowerPoint (`.pptx`), EPub (`.epub`)
* **表格与数据**：Excel (`.xlsx`), CSV (`.csv`), JSON (`.json`), XML (`.xml`)
* **多媒体与网页**：图片（EXIF 元素与 OCR）、音频（语音转录）、HTML 网页、YouTube 视频链接及 ZIP 压缩包（自动解压迭代）
