# Maigret - 用户名公开信息检索与画像工具


> 🔗 **原项目 GitHub 地址**: 
[https://github.com/soxoj/maigret](https://github.com/soxoj/maigret)


Maigret 是一款高效的公开信息搜寻 (OSINT) 与检索工具，仅凭一个用户名即可在 3000+ 公开站点和社交平台上进行跨域账号查找，并提取可获取的公开信息，生成结构化档案与关联地图。无需任何 API 密钥。

---

## 🛠️ 第一阶段：环境自检与前置依赖 (Doctor & Onboarding)

在调用 Maigret 进行检索前，Agent 必须进行前置运行环境与依赖检查：

### 1. Python 环境与安装自检
* **Python 运行环境**：需要 Python 3.10+。
* **一键安装方式**：
  ```bash
  pip install maigret
  ```
  或者从仓库离线构建：
  ```bash
  pip install .
  ```

### 2. 网络与代理设置 (可选)
* 对大规模并发查询或突破 IP 频率限制场景，可配置代理池（如住宅代理）或在命令中传入 `--proxy` 参数。

---

## 🚀 第二阶段：核心执行工作流 (Workflow)

Maigret 的核心搜索、分析与导出工作流：

### 1. 常用查询命令手册

```bash
# 1. 基础用户名检索（在最常用的 top 100 站点中查找）
maigret <username> --top-sites 100

# 2. 深度全量检索并生成 HTML 交互地图与 PDF 报告
maigret <username> --html --pdf

# 3. 批量用户名检索
maigret <user1> <user2> <user3> --json simple

# 4. 指定特定标签/领域过滤（例如只查代码与社交平台）
maigret <username> --tags coding,social
```

### 2. 导出格式与报告类型
* **HTML 报告**：生成带可视化图表与 URL 链接交互的单页网页报告。
* **PDF / JSON / CSV 导出**：支持标准数据格式导出，便于二次清洗与结构化分析。

---

## 📂 技能目录结构

```text
tools/web-retrieval/maigret/
├── README.md                           # 本重塑说明文档
├── README.zh-CN.md                     # 原生完整中文说明手册
├── maigret/                            # 核心 Python 包源码与站点检测规则
├── static/                             # 静态资源与样式
├── pyproject.toml                      # 项目依赖与打包配置
└── sites.md                            # 覆盖的 3000+ 站点清单
```
