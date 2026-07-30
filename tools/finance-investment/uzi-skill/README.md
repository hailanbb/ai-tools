# 游资（UZI）Skills - 66 评审团多维股票深度分析与量化研报引擎 (uzi-skill)


> 🔗 **原项目 GitHub 地址**: 
[https://github.com/wbh604/UZI-Skill](https://github.com/wbh604/UZI-Skill)


游资（UZI）Skills 是一款面向 A 股 / 港股 / 美股的个股深度量化分析与研报生成 Agent 引擎。它集成了 66 位跨领域评审团（覆盖价值派巴菲特、游资派赵老哥、科技派黄仁勋与马斯克等 9 大流派）、22 维实时与财务数据提取，以及 22 种机构级分析模型（含 DCF 估值、杀猪盘排查、多股对决与财务审查门禁），全免费数据源，一键输出 Bloomberg 风格离线 HTML 报告与多终端战报。

---

## 🛠️ 第一阶段：环境自检与依赖安装 (Doctor & Onboarding)

在运行 UZI 股票分析引擎或调用其技能模块前，必须进行环境与依赖自检：

### 1. Python 环境与运行依赖
* **Python 运行环境**：需要 Python 3.10+。
* **依赖库一键安装**：
  ```bash
  pip install -r requirements.txt
  ```
* **零 API Key 自检**：项目集成全免费公共数据源接口，无需配置付费 API Key 即可全功能运行。

### 2. 客户端一键挂载
* **Claude Code 挂载**：
  ```bash
  /plugin marketplace add wbh604/UZI-Skill
  /plugin install stock-deep-analyzer@uzi-skill
  ```
* **Hermes / OpenClaw / Cursor**：
  运行一键安装脚本 `bash install-hermes.sh` 或加载 `.cursor-plugin` / `.opencode` 配置。

---

## 🚀 第二阶段：核心执行工作流 (Workflow)

UZI 股票分析引擎的核心分析命令与报告生成工作流：

### 1. 常用命令手册与功能矩阵

```bash
# 1. 完整 22 维数据 × 66 评委深度研报生成（5-8 分钟）
python run.py 贵州茅台
# 或在 Agent 中调用：/stock-deep-analyzer:analyze-stock 600519

# 2. 30 秒快速诊断与评估
/stock-deep-analyzer:quick-scan 002217

# 3. 杀猪盘风险与陷阱排查
/stock-deep-analyzer:scan-trap 002217

# 4. DCF 自由现金流估值专项
/stock-deep-analyzer:dcf 600519

# 5. 多股横向对决与组合健康度检测
python run.py --versus 600519 000858
```

### 2. 交付成果格式
* **Bloomberg 风格 HTML 报告**：支持自包含、离线阅读、暗色/亮色切换与术语悬浮提示。
* **朋友圈与社群战报**：自动生成 1080×1920 朋友圈竖图与微信群战报摘要。

---

## 📂 技能目录结构

```text
tools/finance-investment/uzi-skill/
├── README.md                           # 本重塑说明文档
├── SKILL.md                            # Agent 核心技能节点
├── run.py                              # 股票分析 CLI 入口
├── skills/                             # 66 评审团逻辑、量化规则与算法模型
├── docs/                               # 文档说明与界面截图
├── requirements.txt                    # 依赖清单
└── INSTALL-HERMES.md                   # Hermes 引擎适配说明
```
