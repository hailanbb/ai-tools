# AI Write Flow (技术博客与图卡写作 Agent 技能包)

AI Write Flow 是一个面向 AI 智能体（如 Hermes, Claude Code, Codex）定制的技术博客与多端图卡写作流程控制技能包。它集成了选题大纲、时效核查、结构硬性门禁以及多轮降 AI 腔调的审查机制，帮助 Agent 产出具备真实人类质感、符合规范的文章。

---

## 🛠️ 第一阶段：环境自检与首次初始化引导

在调用 AI Write Flow 开始写作前，AI 代理或开发人员必须检查运行环境并完成初始化配置。

### 1. 运行依赖与自检命令

本工具在撰写各个阶段提供自动化的 Python 质量校验与格式安全扫描（例如：校验调研数据格式、检查成品结构和字数等）。请在终端执行以下指令检查运行依赖的就绪状态：

```powershell
# 1. 验证 Python 环境 (需 Python 3.10+)
python --version

# 2. 运行快速校验脚本，验证本地文件完整性与检验代码是否正常工作
python quick_validate.py
```

### 2. 首次使用初始化与配置自愈

* **交互式自动安装**：
  若在支持 `bash` 的终端（Linux/macOS 或 Windows Git Bash/WSL）下，可运行交互安装向导，自动检测并部署到对应 Agent 的 Skill 目录中：
  ```bash
  bash scripts/install.sh
  ```
  *注意*：如果您使用的是原生 Windows 环境且无 bash，您可以直接手动将 `skill/` 目录复制到您的 AI 客户端技能加载路径下。
* **工作区配置（Workspace）**：
  写作输入素材（Briefs）、中间产物（Research）和最终成品文章相互独立。你可以通过环境变量进行配置自愈，例如：
  ```powershell
  $env:AI_WRITE_FLOW_WORKSPACE="D:/GoogleAI/writing_workspace"
  ```
  *说明*：解析优先级为：命令行 `--workspace` 参数 > 环境变量 `AI_WRITE_FLOW_WORKSPACE` > 交互式配置。

---

## 🚀 第二阶段：核心执行工作流

环境自检成功且加载技能后，Agent 即可进入由规则和校验器约束的深度写作流中。

### 1. 输出模式与意图路由

当用户发出指令后，本技能会自动拦截并执行 Step 0 的意图路由识别：

```mermaid
graph TD
    UserPrompt[用户发起写作或审校任务] --> IntentCheck{判断用户输入意图}
    
    IntentCheck -- 包含"图卡/贴图/卡片/小红书/短文" --> CardMode[启用 card_post 模式]
    IntentCheck -- 通用文章/博客/教程 --> ArticleMode[启用 longform_article 模式]
    IntentCheck -- 传入已有文章进行修改 --> QuickReview[快捷降 AI 味审校入口]
    
    CardMode --> CardWorkflow[实施事实核查与卡片字数/数量决策, 输出结构化图文 txt 并以 check_card_post.py 校验]
    ArticleMode --> Article6Steps[进入长文 6 步深度写作流]
    QuickReview --> StyleHumanize[直接调用 AI 腔调检测与人声毛边保护规则改写文章]
```

#### ✍️ 文章标题与结构约定（硬性门禁）：
所有的普通长文输出必须严格遵循以下三层标题结构：
* **`# 一级标题`**：全文有且仅有一个大标题。
* **`## 二级标题`**：代表章节（同时作为章节配图分析的最小候选单位）。
* **`#### 四级小标题`**：代表章节内部的扫读段落（必须用 `①`、`②`、`③` 开始按章节独立重置编号）。
* ⚠️ **警告**：本项目**禁用 `###` 三级标题**。在生成最终稿前，必须自动运行 `check_article.py` 检验格式层级。

### 2. 长文 6 步深度写作流规范

在 `longform_article` 模式下，Agent 严禁一步到位地直接写正文，必须分步前进：

1. **Step 1: 选题讨论与大纲对齐**：分析输入 brief 痛点，与用户确认文章选题和宏观大纲。
2. **Step 2: 深度调研与信息核查**：在 Layer 1-4 检索真实官方信息，产出 `research.json`，运行 `validate_research.py` 严格校验来源和时效时限。
3. **Step 3: 骨架确认**：依据上述三层结构约定生成详细的大纲骨架。
4. **Step 4: 初稿撰写**：严格执行 `style-guide.md`，对专业句式句长实施限制，禁用 AI 包装词汇。
5. **Step 5: 多轮降 AI 味审校**：
   - 第一次扫描：调用 `ai-flavor-patterns.md` 检测 AI 味表达。
   - 第二次扫描：调用 `human-voice-policy.md` 保护人声毛边与个人表达印记。
   - 运行校验：运行 `check_article.py` 进行全面通过性测试。
6. **Step 6: 章节配图自动生成（可选扩展）**：
   基于普通 `##` 章节进行 SVG 视觉设计规划并调用配图脚本生成 SVG，并以 `![caption](images/xxx.svg)` 形式插回文章。

### 3. 工具卸载方法

若要卸载本写作技能，请执行：
1. 物理删除工具收藏仓库中的子目录：`tools/ai-write-flow/`。
2. 物理删除您的 AI 客户端技能加载路径下的对应安装目录。
3. 清除配置的环境变量 `AI_WRITE_FLOW_WORKSPACE`。
