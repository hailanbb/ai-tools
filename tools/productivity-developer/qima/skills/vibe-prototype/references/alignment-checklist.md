# 对齐校验三铁律 + 视觉合规逐项检查表与决策树(references)

本文件是 `vibe-prototype` 第 5 步「对齐校验(本 skill 的灵魂)」的细节支撑:三条铁律的逐项检查表 + design.md(视觉准则)视觉合规检查 + 不一致处理决策树 + 统一裁决原则。

**对齐报告产出方式**:Claude 逐条跑下列检查,**对齐报告直接打印给用户看,不写 .md 报告文件**。**只有全绿(`pages[]` 全部 `status=aligned`,且逐页符合 design.md 视觉准则)才放行**到 ⑥ vibe-implement;否则明确告知**卡在哪页、卡在哪条铁律或哪条视觉准则**。

校验把第 1 步「期望页面表」(来自 interaction.md)与第 3 步「实际页面表」(来自 Stitch / manifest)双向比对,并逐页核对原型是否符合 `design.md`(视觉准则)。

## 三铁律逐项检查表

### 铁律一:无遗漏(文档每页都有原型)

逐 **页面ID** 核对 —— interaction.md 里的每个页面ID 是否都能在 manifest 中找到一条 `status=aligned` 的记录:

- [ ] 列出 interaction.md 的全部页面ID(站点地图 / 页面清单)。
- [ ] 对每个页面ID,在 manifest `pages[]` 中查找同名 `pageId`。
- [ ] 该记录 `status` 是否 = `aligned`。
- [ ] 缺失或非 aligned → 标 `pending` / `generated`,**列入待生成清单**,让用户回画布补齐。

### 铁律二:无多余(每个 screen 都映射回页面ID)

逐 **screen** 核对 —— manifest / Stitch project 里每个 screen 是否都能映射回一个页面ID:

- [ ] 用 `build_site` 拿到 project 的全部 screen(实际页面表)。
- [ ] 对每个 screen 的 `screenId`,在 manifest 中找到对应 `pageId`。
- [ ] 映射不上 → 标 `orphan`,提示用户二选一:① 对应 interaction.md 漏写的页面 → 回第 1 步补文档;② 废弃 screen → 从 project 删除或忽略。

### 铁律三:元素一致(原型关键元素对得上文档)

逐页核对 —— 把 interaction.md 的元素清单与原型 HTML 的关键元素逐项比对:

- [ ] **按钮文案**:文档列出的按钮及其文字是否都在原型里出现。
- [ ] **输入项**:输入框 / 选择器 / 表单字段是否齐全。
- [ ] **列表**:列表项及其字段是否一致。
- [ ] **弹窗触发点**:文档标注的弹窗 / 抽屉 / 浮窗 / toast 触发元素是否在原型(或其子态图)里有对应。
- [ ] 差异 → 标 `mismatch`,**逐条列出**「文档有 / 原型无」和「原型有 / 文档无」。

### 视觉合规:design.md(视觉准则)↔ prototypes/

逐页核对 —— 把原型 HTML 的视觉表现与 `design.md`(视觉准则)逐项比对(design.md 是视觉权威):

- [ ] **tokens 合规**:主色 / 辅色、字体家族、圆角、间距、Elevation / Shapes 是否与 design.md 的 YAML token 前言一致。
- [ ] **components 合规**:卡片 / 按钮 / 表单等组件观感是否符合 design.md 的 Components 章节。
- [ ] **Do&Don't 合规**:是否触犯了 design.md 的 Don't 条款、是否落实了 Do 条款。
- [ ] 偏离 → 视为视觉不一致,**以 design.md(视觉准则)为准**修正(改 prompt 重生成 / 把 token 注入 shadcn 主题),不达标不放行。

## 不一致处理决策树

校验出非 aligned 时,按下列分支处理(对齐是双向的,**用户拍板**,skill 给建议):

```
发现不一致
├─ 文档有、原型无(铁律一缺失 / 铁律三「文档有原型无」)
│    └─ 多半是 prompt 没覆盖到
│         → 修 prototypes/prompts/<页面ID>.md 重生成 → 重新拉取 → 重校验
│
├─ 原型有、文档无(铁律二 orphan / 铁律三「原型有文档无」)
│    └─ 可能是设计阶段想到的新交互
│         → 回指第 1 步,更新 interaction.md(保持文档为权威主线)
│         → 若确属废弃 screen,则从 project 删除或忽略
│         → 重校验
│
└─ 视觉风格偏离 design.md(视觉准则)tokens / components / Do&Don't
     └─ 走第 6 步:以 design.md(视觉准则)为准修正或反哺
          → 把 Stitch tokens 规范化后注入 shadcn 主题(globals.css CSS variables + tailwind.config),
            使「原型视觉 = design.md 视觉准则 = shadcn 主题」为单一来源
          → 若 ④ design.md(视觉准则)已有且冲突,以 ④ design.md 为准,据此修 prompt 重生成
```

## 统一裁决原则

- **上游文档为权威主线**:`interaction.md`(元素 / 状态)与 `design.md`(视觉准则)是权威,`architecture.md` 提供数据 / 接口依据,原型是它们的投影。下游「有原型但文档没有」→ 回指上游补文档;「文档有但原型没有」→ 在原型侧补齐(改 prompt 重生成)。视觉冲突一律**以 design.md(视觉准则)tokens / components / Do&Don't 为准**。
- **用户拍板,skill 给建议并记录结论**:每条不一致 skill 给出建议方向,但最终由用户决定,并把处理结论记回 manifest(更新 `status`)。
- **校验有人在环**:补齐 / 修正动作多数需要用户**回 Stitch 画布**操作;skill 只能**列清单、给建议、卡放行门,不能自动补图**。
