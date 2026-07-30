# z-skills 本地工作流自动化技能套件


> 🔗 **原项目 GitHub 地址**: 
[https://github.com/tjxj/z-skills](https://github.com/tjxj/z-skills)


`z-skills` 是一组面向中文创作、知识管理和自动化任务的本地 Agent Skills 集合，将常见的网页采集、视频下载、多模态学习、文档转换、邮件处理及证据型问答沉淀为可复用的稳定能力。

---

## 🛠️ 第一阶段：环境自检与前置依赖 (Doctor & Onboarding)

在调用 `z-skills` 中的子技能前，Agent 必须进行前置环境与依赖诊断：

### 1. Python 环境与核心 CLI 检查
* **Python 运行环境**：确保 Python 3.8+ 已安装且处于可用状态。
* **外部命令行依赖 (CLI)**：
  * `ffmpeg`：用于视频合并与音频处理（`z-video-downloader` 需要）。
  * `yt-dlp` / `gallery-dl`：用于视频与媒体素材下载。
  * `xparse-cli`：用于 PDF 及复杂文档结构化解析（`z-smart-xparse` 需要）。

### 2. 依赖自愈与提示
当检测到依赖缺失或参数未配置文件时：
* 若缺失 `xparse-cli` 或特定 Python 库，Agent 应当提示安装命令或调用环境补齐。
* 对需网络访问或凭证的工具（如 `z-mail-reader` 的 IMAP 配置），指导用户补充本地环境变量。

---

## 🚀 第二阶段：核心执行工作流 (Workflow)

`z-skills` 涵盖 11 个子技能，各自包含独立的 `SKILL.md` 指南与可选可执行脚本：

### 1. 子技能一览与触发场景

| 子技能名称 | 核心功能概述 | 典型触发词 / 场景 |
| :--- | :--- | :--- |
| `z-web-pack` | 采集网页正文、链接、图片及视频媒体清单，打包为本地 Markdown 写作素材包 | 采集网页素材、导出网页正文至本地、做备用写作素材 |
| `z-video-downloader` | 支持 YouTube、B站、微信视频号、m3u8 及直链全平台视频断点续传与字幕下载 | 下载视频、下载 B站/YouTube、下载视频号、下载 m3u8 |
| `z-video-study-webpage-qwen` | 结合音视频转录、关键帧提取与 Qwen 多模态分析，生成图文学习网页 | 学习视频内容、生成视频总结网页、匹配关键知识点画面 |
| `z-smart-xparse` | 基于 `xparse-cli` 将 PDF、扫描件与 Office 文档智能解析为 Markdown | 解析 PDF、文档转 Markdown、读取扫描件文档 |
| `z-mail-reader` | 通过 IMAP 协议读取邮件、下载附件、生成邮件摘要及监听新邮件 | 读邮件、查收邮件、邮件摘要、监听新邮件通知 |
| `z-md-to-word` | 将本地 Markdown 文章高保真转换为 `.docx` / `.doc` Word 文档，自动校验结构与图片 | Markdown转Word、导出Word、md转doc |
| `z-md-excel` | 自动提取 Markdown 文件中的数据表格并导出为 Excel 文件 | Markdown表格转Excel、提取MD表格 |
| `z-excel-editor` | 读取、清洗、修饰、格式化并补充公式到 `.xlsx` / `.csv` 电子表格 | 修改xlsx、清洗csv、补公式、处理表格数据 |
| `z-xkcd-panda-comic` | 将文章与观点改写并生成黑白手绘风四格熊猫梗图（金馆长/金教授表情） | 四格漫画、熊猫表情梗图、文章转四格漫画 |
| `z-grounded-source-qa` | 对任意本地 Markdown/TXT 资料进行多表达式检索与严格证据型问答 | 基于资料回答、按原文核对、给出原文出处、访谈找依据 |
| `z-liang-wenfeng-grounded-voice` | 基于梁文锋交流会材料进行第一人称模拟问答与观点推演 | 梁文锋交流会、模拟梁文锋回答、追问核对 |

---

## 📂 技能套件目录结构

```text
tools/web-retrieval/z-skills/
├── README.md                           # 本套件两阶段说明文档
├── z-web-pack/                         # 网页素材包采集
├── z-video-downloader/                 # 全平台视频下载
├── z-video-study-webpage-qwen/         # Qwen 多模态视频学习网页生成
├── z-smart-xparse/                     # 文档智能解析 CLI 封装
├── z-mail-reader/                      # IMAP 邮件收发与摘要
├── z-md-to-word/                       # Markdown 转 Word 文档
├── z-md-excel/                         # Markdown 表格提炼至 Excel
├── z-excel-editor/                     # 电子表格清洗与编辑
├── z-xkcd-panda-comic/                 # 四格熊猫梗图生成
├── z-grounded-source-qa/               # 证据型本地资料问答
└── z-liang-wenfeng-grounded-voice/     # 梁文锋交流会第一人称问答
```
