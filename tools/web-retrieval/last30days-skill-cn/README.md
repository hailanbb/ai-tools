# last30days-cn - 中国平台 30 天深度研究与舆情检索引擎 (last30days-skill-cn)


> 🔗 **原项目 GitHub 地址**: 
[https://github.com/Jesseovo/last30days-skill-cn](https://github.com/Jesseovo/last30days-skill-cn)


last30days-cn 是一款专为中国互联网环境深度本土化改造的 AI Agent 检索与研究技能套件（基于 mvanhorn/last30days-skill）。它能自动化搜索中国 8 大主流平台（小红书、知乎、抖音、微信公众号、B站、百度、微博、头条）最近 30 天的热点与内容，综合提取后一键生成交互式、符合 Swiss/IKB 视觉审美的离线 HTML 深度研报。

---

## 🛠️ 第一阶段：环境自检与平台可用性诊断 (Doctor & Onboarding)

在不同 AI Agent 客户端与 CLI 中调用 last30days-cn 前，须进行运行环境自检：

### 1. Python 环境与爬虫依赖自检
* **Python 运行环境**：需要 Python 3.10+。
* **依赖库与浏览器驱动一键安装**：
  ```bash
  pip install -r requirements.txt
  playwright install chromium
  ```

### 2. 诚实平台可用性探测 (`--diagnose`)
在运行搜索前，可主动执行平台探测命令诊断各平台 API 与 Playwright 的网络连通性：
```bash
python scripts/last30days.py --diagnose
```

---

## 🚀 第二阶段：核心执行工作流 (Workflow)

last30days-cn 的热点检索与 HTML 研报生成工作流：

### 1. 常用命令手册

```bash
# 1. 基础热点与舆情检索（默认 8 大平台综合搜寻）
python scripts/last30days.py "大模型 智能体 实践"

# 2. 生成离线 Swiss/IKB 美学风格 HTML 研究报告
python scripts/last30days.py "具身智能" --emit html

# 3. 指定特定平台过滤与历史时间窗口回溯
python scripts/last30days.py "AI 绘画" --as-of 2026-06-01 --sources xhs,zhihu,bilibili
```

### 2. 核心特性与防护机制
* **8 大平台兜底机制**：抖音/头条风控时自动启用 Bing 搜索兜底，小红书 XHR 拦截避免 DOM 错乱。
* **时区与时间归档**：所有中文平台数据统一按北京时间（CST）进行窗口划分，防止跨时区偏移。

---

## 📂 技能目录结构

```text
tools/web-retrieval/last30days-skill-cn/
├── README.md                           # 本重塑说明文档
├── README.en.md                        # 英文说明指南
├── SKILL.md                            # Agent 核心技能声明与控制节点
├── SPEC.md                             # 架构设计与平台抓取规范
├── scripts/                            # last30days.py 单入口及各平台抓取脚本
├── skills/                             # 自包含 Agent Skills 运行载荷
└── tests/                              # 全量单元测试套件
```
