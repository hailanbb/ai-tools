# AnySearch 搜索技能 (anysearch-skill)

AnySearch 是一个为 AI Agent（如 Antigravity, Claude Code 等）设计的统一实时搜索引擎技能（Skill）。它支持通用全网搜索、社交媒体等垂直领域搜索、多查询并行批量检索以及网页纯净 Markdown 内容提取。

---

## 🛠️ 第一阶段：环境自检与首次初始化引导

为了使 AI Agent 能够顺利加载并运行 AnySearch 技能，我们需要完成以下诊断与加载步骤。

### 1. 运行环境自检与自愈 (Doctor)
本技能提供了 Python、Node.js、PowerShell 以及 Bash 脚本四种运行语言实现。为了找到最适合当前系统的 CLI 运行方式，应当按照以下步骤自检：
1. **依赖环境探测**：
   在宿主系统终端中依次执行以下命令，探测可用的运行时环境：
   * **Python 3**（推荐，需要 $\ge 3.6$ 并确保安装了 `requests` 库）：
     ```bash
     python3 --version
     ```
   * **Node.js**（备选，需要 $\ge 12$）：
     ```bash
     node --version
     ```
   * **命令行工具**（兜底，Windows 环境使用 PowerShell 5.1+，Linux/macOS 使用 Bash 3.2+ 并依赖系统 `curl` 与 `jq`）

2. **运行入门体检命令 (Entry Test)**：
   根据前一步探测到的可用运行时，在终端依次尝试运行 `doc` 指令。选择执行无报错、输出最整洁的运行时作为推荐选项：
   ```bash
   # Python 3 探测
   python3 scripts/anysearch_cli.py doc
   
   # Node.js 探测
   node scripts/anysearch_cli.js doc
   
   # PowerShell 探测
   powershell -ExecutionPolicy Bypass -File scripts/anysearch_cli.ps1 doc
   
   # Bash 探测
   bash scripts/anysearch_cli.sh doc
   ```

3. **固化推荐运行时 (runtime.conf)**：
   根据体检测试结果，在技能根目录下物理创建或覆盖 `runtime.conf` 文件，以锁定 CLI 命令。
   例如，在 Python 3 运行无误的系统中，创建以下配置：
   ```bash
   echo "Runtime: Python" > runtime.conf
   echo "Command: python3 scripts/anysearch_cli.py" >> runtime.conf
   ```
   *注意*：AI Agent 每次加载本技能时，将优先读取 `runtime.conf` 并直接提取 `Command` 运行。如果文件丢失或损坏，Agent 将退回平台自适应探测。

### 2. 交互配置与凭证自愈 (API 密钥)
AnySearch 支持匿名免密钥运行，但配额极低。推荐配置免费的 API 密钥以提升速率上限：
1. **一键免密码注册账号（推荐）**：
   AI Agent 可以在终端运行以下命令，为用户快速注册并返回 API 密钥，无需接收手机验证码：
   ```bash
   curl -s -X POST "https://api.anysearch.com/v1/auth/email/register" \
     -H "Content-Type: application/json" \
     -d '{"email": "your_email@example.com"}'
   ```
   * **注册成功**：API 将返回明文 `api_key`。
   * **写入凭证**：AI Agent 应当将返回的密钥物理写入到技能根目录的 `.env` 文件中，格式为 `ANYSEARCH_API_KEY=<您的Key>`。
   * **账户激活**：告知用户其临时登录密码已通过邮件发送至 `your_email@example.com`，可以随时访问 [AnySearch 官网控制台](https://www.anysearch.com/login) 进行密码重置和额度管理。

2. **手动配置密钥**：
   * 拷贝 `.env.example` 并重命名为 `.env`。
   * 填入您的 `ANYSEARCH_API_KEY`，或者在系统环境变量中设置：`$env:ANYSEARCH_API_KEY="您的API密钥"`。

---

## 🚀 第二阶段：核心执行工作流

### 1. 核心路由与激活方式
* **触发场景**：当您在对话中提出“全网搜索、批量网页检索、提取某个网页链接的文字、查找社交媒体（Twitter / Reddit / B站）上的实时话题反应”时，本技能将被自动路由激活。
* **参数与命令语法手册**：
  在 `runtime.conf` 配置完毕后，Agent 直接使用所固化的命令行前缀（如 `python3 scripts/anysearch_cli.py`）运行各子任务：
  
  * **网页内容纯净化提取 (extract)**：
    ```bash
    python3 scripts/anysearch_cli.py extract "https://example.com/target-page"
    ```
    *注意*：提取的内容默认即为纯净的 Markdown 格式，无需额外指定输出格式。
  
  * **单句网页检索 (search)**：
    ```bash
    python3 scripts/anysearch_cli.py search "检索关键词" --max_results 5
    ```
  
  * **多句并发批量检索 (batch_search)**：
    ```bash
    python3 scripts/anysearch_cli.py batch_search --queries '[{"query":"关键词一","max_results":5},{"query":"关键词二","max_results":5}]'
    ```
  
  * **社交网络垂直搜索 (social_media)**：
    若需搜索公开社交媒体，优先使用本搜索引擎的社交子域发现：
    - 获取可用子域：
      ```bash
      python3 scripts/anysearch_cli.py get_sub_domains --domain social_media
      ```
    - 执行定向检索：
      ```bash
      python3 scripts/anysearch_cli.py search "特定新闻在 X 平台上的反馈" --domain social_media --sub_domain <返回的子域> --max_results 5
      ```

### 2. 工具卸载
要从系统中物理卸载本技能，可以直接删除对应的 `anysearch-skill`（或重命名后的 `anysearch`）目录，并清理相应的环境变量即可。
