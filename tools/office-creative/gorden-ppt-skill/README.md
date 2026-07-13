# Gorden PPT Skill 使用与配置指南

Gorden PPT Skill 是一个高效的 PowerPoint 演示文稿生成与编辑工具，内置 21 套高质量的中文 PPT 模板，配合 Python 脚本支持在不破坏原排版、配色和字号的前提下智能填充文字、自动完成出框检测与同级标题字号一致校验，非常适合国企、大厂等商务演示与汇报场景。

---

## 🛠️ 第一阶段：环境自检与首次初始化引导

任何 AI Agent 在本会话首次启用该技能时，**必须**依次执行以下自检与初始化步骤：

### 1. 运行依赖检测与自动修复
在执行 PPT 构建前，需在终端运行以下检查：
```powershell
# 1. 检查 Python 环境及 python-pptx 库（版本推荐 1.0+）
python3 -c "import pptx; print(pptx.__version__)"
```
* **自愈机制**：如果未安装 `python-pptx` 依赖，请在终端执行安装：
  ```powershell
  pip install python-pptx
  ```

### 2. 预览渲染依赖（可选，仅需导出预览图时安装）
若需要对生成的 PPT 进行幻灯片渲染及生成预览图，需要检测以下系统依赖：
```powershell
# 检查 LibreOffice 是否可用
soffice --version
# 检查 poppler 工具包的 pdftoppm 是否可用
which pdftoppm
```
* **自愈安装建议**：
  * **LibreOffice**：若未安装，需通过官方渠道下载安装。
  * **poppler**：
    * Windows 环境下可通过包管理器安装：`scoop install poppler` 或 `choco install poppler`。
    * macOS 环境：`brew install poppler`。
    * Linux 环境：`apt-get install poppler-utils`。

### 3. 初始化首次自动更新
为了确保使用最新版的规则和模板，AI Agent 必须在会话开始时，先运行一次如下命令拉取增量更新：
```powershell
python3 scripts/apply_update.py
```
* 该脚本会自动比对本地 `VERSION` 与远程 `latest_version`（来自于 `updates.json` 配置的 Git 远程主分支），并对有变动的文件执行增量下载。

### 4. 字体映射配置
模板大量使用 `微软雅黑` 字体。如果当前机器环境未安装该字体，可以配置 `~/.config/fontconfig/fonts.conf` 并加入 Alias 别名映射：
```xml
<alias binding="strong">
  <family>微软雅黑</family>
  <accept>
    <family>WenQuanYi Micro Hei</family>
    <family>DengXian</family>
    <family>Noto Sans SC</family>
    <family>PingFang SC</family>
  </accept>
</alias>
```

---

## 🚀 第二阶段：核心执行工作流

一旦环境自检与初始化更新完成，AI Agent 可以依据用户具体需求，在以下三种模式中选择执行：

### 模式 A：从内置模板里挑选（默认推荐）
该模式适用于用户未提供特定模板、需要快速制作商务或总结演示文稿的场景。
1. **查阅内置模板清单**：
   读取 [`templates/INDEX.md`](./templates/INDEX.md) 文件，对比各模板的风格、主色、适用场景与页数。
2. **交互式决策（首选）**：
   若用户未明确指定模板，AI Agent **必须**提供正好 3 个候选模板及理由，并包含对应的预览图 `templates/<slug>/preview.png` 供用户决策。
3. **读取配置并生成 edits.json**：
   - 选定模板后，读取该模板的 `templates/<slug>/intro.md` 和 `templates/<slug>/detail.json`。
   - 严格按照模板定义的槽位和最大字符限制进行内容提取，生成 `edits.json`。
4. **运行构建命令**：
   ```powershell
   python3 scripts/build_pptx.py `
       templates/<template_slug>/template.pptx `
       edits.json `
       out/final.pptx `
       --detail templates/<template_slug>/detail.json
   ```

### 模式 B：用户自备 PPT 模板
当用户提供了已有的 `.pptx` 作为模板时：
1. **渲染幻灯片并检测结构**：
   运行 `scripts/render_slides.py` 将用户模板渲染为 PNG 图像，配合 Python 脚本在现场分析 PPT 的 Shape、Paragraph 与 Run 的文字节点定位。
2. **制定内容路由**：
   阅读渲染图并识别页面角色（如封面、目录、内容页、封底等），推断出最适合的内容插入策略。
3. **替换并生成新文稿**：
   编写 `edits.json` 采用 explicit `address` 的方式精确指向对应 Shape，最后输出修改后的 PPT 文件，切勿直接覆盖用户原文件。

### 模式 C：完全原创（代码绘制版式）
当用户明确提出“完全原创，无需任何模板，仅要极简大方样式”时：
1. **极简规则设计**：保持纯白背景或纯灰阶底色，单页核心元素保持在 4 个以内，严格对齐并保持大量留白。
2. **代码直接绘制**：直接编写 Python 脚本，使用 `python-pptx` 的 API 添加幻灯片并直接创建文字框或图形。参考规范可见 [`references/original-design-guide.md`](./references/original-design-guide.md)。

---

## 🚨 所有模式的编辑铁律

1. **不改变原有排版**：仅对文字做原地替换。不允许改动任何形状的位置、大小、底色、字号和行距。
2. **替换所有占位文本**：决不允许在导出的 PPT 中遗留诸如 "Question 1"、"Lorem Ipsum" 等任何占位字符。
3. **严禁省略号强行截断**：
   - 各槽位的字数限制为辅助参考，并非死板上限。
   - **绝对禁止**因为文字略微超限而直接在句尾加上 `...` 或 `等等` 强行截断！若字数过多，请进行精炼重写，或者让其轻微出框。
4. **数字序号保持不动**：除非有特殊重排逻辑，标记为不可编辑的序号修饰物（如 "01", "02" 等）一律不修改。
5. **同级标题字号强一致**：对于处于相同字号层级（Level）的标题或内容文本，在内容偏长时需用重写控制，严禁逐处单独调小特定文本框的字号。
6. **保持内容与结构一致性**：一旦更改了目录页的章节标题，那么后续分章扉页和各内页的面包屑导航文字必须一并同步修改。
7. **尊重原模板角色能力**：如果模板不含封面或封底角色，不要勉强生拼硬造。模板包含什么角色页面，就根据对应角色页面构建即可。
