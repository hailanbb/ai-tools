# 倪海厦skill · 经方中医 AI Agent 技能 (nihaixia)

将经方大师倪海厦（1954-2012）的中医思维体系（《伤寒论》《金匮要略》《神农本草经》《黄帝内经》《天纪》及 849 例临床医案，共 3.5M 字蒸馏心法）注入 AI Agent 的专属 Skill 套件。激活后，AI Agent 能以倪海厦的视角进行六经辨证、经方选药、医案参照及健康调理。

---

## 🛠️ 第一阶段：环境自检与 Agent 激活注册 (Doctor & Onboarding)

在不同 AI 客户端中使用倪海厦 Skill 前，须进行自检与激活配置：

### 1. Agent 唤醒词与触发条件
* **直接激活触发词**：`倪海厦` / `海厦视角` / `倪师` / `经方思维` / `倪海厦会怎么看`
* **平台安装方式**：
  * **Claude Code / Antigravity / Cursor**：
    将本套件复制至插件/Skill 目录（如 `~/.claude/skills/nihaixia/`），自动解析 `SKILL.md`。
  * **OpenClaw / SkillHub**：
    ```bash
    openclaw skills install nihaixia
    ```

---

## 🚀 第二阶段：核心执行工作流 (Workflow)

倪海厦 Skill 的六经辨证与经方分析工作流：

### 1. 核心辨证与分析管线
1. **六经辨证诊断**：识别太阳、阳明、少阳、太阴、少阴、厥阴六经传变位，匹配 8 大诊断公式与舌脉速查。
2. **经方选药与方剂推导**：基于《伤寒论》《金匮要略》提取经方，提供组成、剂量、煎服法与注意事项。
3. **真实医案匹配**：在 849 例真实医案库中检索相似病症（含肿瘤、心血管、代谢病等分类）。
4. **倪师口吻与表达风格**：输出保留倪海厦独特的教学与临床口吻，切中阴阳气血本质。

---

## 📂 技能目录结构

```text
tools/entertainment-lifestyle/nihaixia/
├── README.md                           # 本重塑说明文档
├── SKILL.md                            # 包含 3.5M 字蒸馏心法与规则的核心 Agent Skill
├── distilled_cases.md                  # 849 例精选临床医案库
├── expression_style.md                 # 倪海厦口语表达风格模块
├── cases/                              # 分门别类的医案子库
├── modules/                            # 六经辨证诊断公式与模块
└── references/                         # 经方与本草参考索引
```
