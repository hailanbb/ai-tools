# Scrapling - 现代 Web 抓取自适应框架

> **原生说明来源**：本文档基于官方 [README_CN.md](docs/README_CN.md) 重构，保留了原作的核心功能说明，并根据“两阶段结构”规范进行了排版和整理。

---

## 🛠️ 第一阶段：环境自检与首次初始化引导 (Setup & Initialization)

### 1. 运行环境自检
Scrapling 需要 **Python 3.10 或更高版本**。请在运行前通过以下命令验证环境：
```bash
python --version
```

### 2. 依赖安装与依赖补全
Scrapling 的核心包只包含解析器引擎。若要使用 Fetcher、Spider、Shell 或 MCP 服务，需要安装对应的扩展依赖。

- **快速一键完整安装（推荐）**：
  ```bash
  pip install "scrapling[all]"
  ```
- **分步按需安装**：
  - **核心解析器**：
    ```bash
    pip install scrapling
    ```
  - **Fetcher/Spider（网络请求与并发爬取）**：
    ```bash
    pip install "scrapling[fetchers]"
    ```
  - **MCP 服务器功能（AI Agent 辅助）**：
    ```bash
    pip install "scrapling[ai]"
    ```
  - **命令行 Shell 提取工具**：
    ```bash
    pip install "scrapling[shell]"
    ```

### 3. 浏览器依赖初始化
在安装完 `[fetchers]` 或 `[all]` 扩展包后，**必须**运行以下命令来下载内置的无头浏览器及其系统指纹依赖项，否则引入 `scrapling.fetchers` 时会触发 `ModuleNotFoundError`。
- **命令行初始化**：
  ```bash
  scrapling install
  # 强制重新安装
  scrapling install --force
  ```
- **代码中初始化（可选）**：
  ```python
  from scrapling.cli import install
  install([], standalone_mode=False)
  ```

---

## 🚀 第二阶段：核心执行工作流 (Workflow & Usage)

### 1. 核心功能与使用示例

#### ⚡ 基础用法：HTTP 请求与 Session 管理
```python
from scrapling.fetchers import Fetcher, FetcherSession

# 使用持久化 Session，模拟 Chrome 的最新 TLS fingerprint
with FetcherSession(impersonate='chrome') as session:
    page = session.get('https://quotes.toscrape.com/', stealthy_headers=True)
    quotes = page.css('.quote .text::text').getall()

# 一次性快速请求
page = Fetcher.get('https://quotes.toscrape.com/')
quotes = page.css('.quote .text::text').getall()
```

#### 🛡️ 高级隐秘模式 (Stealthy Fetcher)
用于绕过 Cloudflare Turnstile 等反爬系统：
```python
from scrapling.fetchers import StealthyFetcher, StealthySession

# 保持浏览器打开
with StealthySession(headless=True, solve_cloudflare=True) as session:
    page = session.fetch('https://nopecha.com/demo/cloudflare', google_search=False)
    data = page.css('#padded_content a').getall()

# 一次性请求并在完成后自动关闭浏览器
page = StealthyFetcher.fetch('https://nopecha.com/demo/cloudflare')
data = page.css('#padded_content a').getall()
```

#### 🤖 浏览器自动化 (Dynamic Fetcher)
用于抓取强动态加载的网页：
```python
from scrapling.fetchers import DynamicFetcher, DynamicSession

with DynamicSession(headless=True, network_idle=True) as session:
    page = session.fetch('https://quotes.toscrape.com/', load_dom=False)
    data = page.xpath('//span[@class="text"]/text()').getall()
```

#### 🕷️ Spider 并发爬取框架
支持并发控制、Session 分流和暂停/恢复功能（通过 Checkpoint 自动保存进度）。
```python
from scrapling.spiders import Spider, Request, Response

class QuotesSpider(Spider):
    name = "quotes"
    start_urls = ["https://quotes.toscrape.com/"]
    concurrent_requests = 10

    async def parse(self, response: Response):
        for quote in response.css('.quote'):
            yield {
                "text": quote.css('.text::text').get(),
                "author": quote.css('.author::text').get(),
            }

        next_page = response.css('.next a')
        if next_page:
            yield response.follow(next_page[0].attrib['href'])

# 启动爬虫，设置 crawldir 以启用暂停/恢复机制
result = QuotesSpider(crawldir="./crawl_data").start()
```

### 2. 交互式 Shell 与 CLI
Scrapling 提供了便捷的命令行工具，支持直接在终端中进行页面提取或启动调试交互。

- **启动交互式 Web Scraping Shell**：
  ```bash
  scrapling shell
  ```
- **命令行免代码直接提取网页内容**：
  ```bash
  # 将 example.com 内容提取为 Markdown 格式并保存到 content.md
  scrapling extract get 'https://example.com' content.md
  
  # 使用 CSS 选择器、模拟 Chrome 并使用 fetch 引擎
  scrapling extract get 'https://example.com' content.txt --css-selector '#fromSkipToProducts' --impersonate 'chrome'
  
  # 绕过 Cloudflare 验证并提取指定元素
  scrapling extract stealthy-fetch 'https://nopecha.com/demo/cloudflare' captchas.html --css-selector '#padded_content a' --solve-cloudflare
  ```

### 3. MCP 服务器模式 (AI 代理辅助)
内置的 MCP (Model Context Protocol) 服务器，可供 AI 客户端（如 Claude / Cursor 等）调用。
它能在数据传输给 AI 之前在本地提取和清洗网页内容，极大地降低了 Token 使用成本并提升了 AI 响应速度。详情参见 [官方 MCP 文档](https://scrapling.readthedocs.io/en/latest/ai/mcp-server.html)。

### 4. 卸载与清理
如果需要卸载该工具，可以使用以下命令：
```bash
pip uninstall scrapling
```

---

> ⚠️ **安全与学术免责声明**：此库仅用于教育和研究目的。请在遵守目标网站的 robots.txt、服务条款以及当地数据隐私法律的前提下使用。作者对任何滥用行为概不负责。
