# 命理解读师 (mingli-master)

命理解读师是一个专为 AI Agent（如 Antigravity, Claude Code）设计的个人命理分析与可视化排盘技能（Skill）。它通过 Python 排盘计算与大模型解读相结合，为用户生成有温度的紫微斗数命盘以及 HTML 暗色星空主题可视化解读报告。

---

## 🛠️ 第一阶段：环境自检与首次初始化引导

为了使 AI Agent 能够顺利运行命理解读师技能，我们需要执行以下诊断与加载步骤。

### 1. 前置依赖自检 (Doctor)
本技能依赖于本地 Python 3 环境进行精确的天文排盘计算。AI Agent 应当首先检测 Python 环境及第三方计算库 `iztro-py`：
* **核心依赖库**：`iztro-py` (提供 100% 准确的紫微斗数排盘数学计算，避免大模型幻觉)
* **环境自愈检测命令**：
  在终端中尝试导入依赖，检测是否已安装：
  ```bash
  python3 -c "import iztro"
  ```
  * **若未安装（报错）**：AI Agent 应当自动运行以下命令进行安装：
    ```bash
    python3 -m pip install iztro-py --user --break-system-packages
    ```

### 2. 路径与技能文件自检
确保技能文件 `SKILL.md` 存在于您所使用的 Agent Runtimes 的技能扫描路径中：
* **Antigravity 全局路径**：`C:/Users/<您的用户名>/.gemini/config/skills/mingli-master/`
* **Antigravity 项目局域路径**：项目根目录下的 `.agents/skills/mingli-master/`
* **Claude Code 默认路径**：`~/.claude/skills/mingli-master/` (Windows 对应 `%USERPROFILE%/.claude/skills/mingli-master/`)

技能目录中必须完整包含以下子结构：
* `SKILL.md`（技能规则本体）
* `scripts/calculate_chart.py`（排盘 Python 脚本）
* `scripts/generate_html.py`（HTML 可视化生成脚本）
* `templates/chart_template.html`（HTML 星空主题模板）
* `references/`（解读风格、主星四化参考文档）

### 3. 交互配置与凭证自愈
* **凭证要求**：本技能完全在本地执行，**不需要**配置任何第三方 API 密钥、数据库连接或网络凭证。
* **多模态功能自检**：若需开启“手相与命盘交叉比对”，宿主 Agent 本身必须具备 Vision（图片识别）能力。

---

## 🚀 第二阶段：核心执行工作流

本技能基于 Python 计算与 LLM 对话互锁运行。

### 1. 核心路由与激活方式
* **触发场景**：当用户请求排命盘、算八字、预测运势、批流年或提供手相图片进行交叉比对时，技能将自动激活。
* **激活语法示例**：
  * "帮我排个命盘，1991年8月15日，丑时，男"
  * "算算我的事业和财运，看看我今年的运势"
  * "这是我的掌纹照片，帮我交叉比对一下"

### 2. 执行机制与运行流程
技能激活后，智能体将按照以下四个步骤协同运行：
1. **精确计算排盘**：智能体在后台自动调用 `scripts/calculate_chart.py` 传入用户生辰，使用 Python 库计算出精准的十二宫、四化飞星以及大限数据。
2. **LLM 风格化解读**：基于排盘输出的 JSON 结构体，参考 `references/interpretation_guide.md` 的文风规则，用“大白话”代替难懂的术语，提供关于性格、财运、感情和流年的有温度解读。
3. **掌纹交叉比对**（选填）：若用户提供了手相，智能体识别掌纹特征，与命盘进行吻合与矛盾对比标注。
4. **生成可视化 HTML**：智能体自动运行 `scripts/generate_html.py`，将排盘数据与解读文字填入 `templates/chart_template.html`，在本地生成一个暗色星空主题的精美命盘 HTML 报告，并向用户提供查阅链接。

### 3. 工具卸载
若您希望卸载本技能，可以直接物理删除技能发现路径中的 `mingli-master` 文件夹。若不再需要 Python 排盘库，可运行：
```bash
pip uninstall iztro-py
```

---

## 📄 附录：项目结构参考

```text
mingli-master/
├── SKILL.md                          # 命理解读师元定义
├── README.md                         # 本说明文档
├── scripts/
│   ├── calculate_chart.py            # 排盘计算脚本（基于 iztro-py）
│   └── generate_html.py              # HTML 命盘生成脚本
├── templates/
│   └── chart_template.html           # 命盘 HTML 模板（暗色星空主题）
├── references/
│   ├── interpretation_guide.md       # 解读风格指南
│   ├── stars_reference.md            # 十四主星 + 六吉六煞参考
│   └── four_hua_reference.md         # 四化飞星参考
└── assets/
    └── musk-mingpan.jpg               # 示例命盘截图
```
