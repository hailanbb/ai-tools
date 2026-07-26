# 对齐门:gate-in 双向闭合 + gate-out 对齐核对 + UI variant 基线

> 两道门都是**硬性阻断门**。gate-in 不闭合 / 基线不达标,不得进入实现;gate-out 对齐核对不全绿(逐接口对 `architecture.md`、逐元素对 `interaction.md`、逐页对 `prototypes/` 且符合 `design.md` 视觉准则)/ 基线未达标,不得宣称完成。本文件给出逐步可勾选清单。

---

## 一、gate-in 双向闭合校验步骤(实现前)

### Step A —— 加载四份产物(缺一不可)

- [ ] `interaction.md`(交互权威,第一份 UI 文档)已加载,且含:每页布局、功能模块、页面逻辑、跳转逻辑、每个可交互元素点击后的逻辑、弹窗逻辑(明确标注 `modal` / `navigate` / `popover` / `drawer` / `toast`)。
- [ ] `architecture.md`(接口 / 数据 / 架构权威,照 interaction 数据需求派生)已加载,且含:技术栈基线、数据库 schema、接口契约(每个接口 method / path / req / resp / 状态码 / 错误体)、前后端架构。
- [ ] `design.md`(视觉权威 / 视觉准则)已加载,且含:设计 tokens(YAML 前言)+ Overview / Colors / Typography / Layout / Elevation / Shapes / Components / Do&Don't 等章节。
- [ ] `prototypes/`(视觉权威 / 落地样张)已加载,且含:按页面 ID 命名的原型 HTML 主产物 `<页面ID>.html`(附可选 `<页面ID>.png` 截图)、`manifest.json`;每页原型须符合 `design.md` 视觉准则。
- [ ] 任一缺失,或四者互不一致 → **停止**;报告缺口,并建议回退对应上游 skill(交接链 idea → interaction → architecture → design → prototype → implement):
  - 缺 / 不完整的是 `interaction.md`(页面、元素、跳转、弹窗) → 回 `vibe-interaction`。
  - 缺 / 不完整的是 `architecture.md`(技术栈、数据库、接口、架构) → 回 `vibe-architecture`。
  - 缺 / 不完整的是 `design.md`(视觉 tokens、组件、Do&Don't) → 回 `vibe-design`。
  - 缺 / 不符的是 `prototypes/`(原型对不上文档,或不符合 `design.md` 视觉准则) → 回 `vibe-prototype`。

### Step B —— 双向闭合校验(6 条,逐条勾选)

- [ ] **① interaction.md 每页 ↔ prototypes/ 同名原型**:`interaction.md` 的每个页面 ID,在 `prototypes/` 都能找到逐字符同名的 `<页面ID>.html`。
- [ ] **② prototypes/ 每原型 ↔ interaction.md 页面描述**:`prototypes/` 的每个原型(及 `--<子态名>` 子态),都能在 `interaction.md` 找到对应页面 / 子态描述。
- [ ] **③ interaction.md 数据需求 ↔ architecture.md 派生接口/实体**:`interaction.md` 每页功能化描述的每条数据需求(读 / 写),都能在 `architecture.md` 找到对应**派生**出的接口(`API-<域>-<动作>`,由 architecture 定义)与数据实体;且每个 architecture 接口 / 字段都**回指**其服务的 `interaction.md` 页面 / 元素 / 动作(`interaction.md` 本身不写、不引用接口 ID)。
- [ ] **④ design.md(视觉)↔ prototypes/ 对齐**:`prototypes/` 每页用到的颜色 / 字体 / 间距 / 圆角 / 阴影 / 组件外观,都符合 `design.md` 的 tokens / components / Do&Don't,无原型自创的、`design.md` 未定义的视觉值。
- [ ] **⑤ 不闭合 → 列 orphan / missing 清单交用户裁决**:任一条不闭合,列出 **orphan**(下游有、上游文档无)与 **missing**(上游文档有、下游无)两份清单,**不得带病进入实现**。裁决原则(上游文档为权威主线):
  - **orphan(「下游有原型/代码但文档没有」)** → 回指上游补文档(交互回 `interaction.md`、接口 / 数据回 `architecture.md`(架构据 interaction 数据需求派生)、视觉回 `design.md` 视觉准则),再重跑本门。
  - **missing(「文档有但下游没有」)** → 在下游补齐(补原型 / 补实现)。
  - 任何裁决都由**用户拍板**,本 skill 给建议并记录处理结论。
- [ ] **⑥ UI variant 基线校验(shadcn 强制)**:确认本项目 UI 体系为 shadcn/ui(Radix + Tailwind + cva);`components/ui` 已就位;design tokens 单一来源已注入——Tailwind theme(`tailwind.config`)+ `globals.css` 的 CSS variables(`:root` / `.dark` 下的 `--background`、`--primary`、`--radius` 等)。基线不满足 → **停止**,先补齐 UI 基线再实现(`design.md` 视觉准则的 color / typography / spacing tokens 规范化后注入这套 shadcn 主题,保证「`design.md` 视觉准则 = shadcn 主题」单一来源)。

### Step C —— 生成验收项清单

- [ ] 把 `interaction.md` 逐元素拆成原子验收项(模板与示例详见 acceptance-checklist-template.md),作为 `writing-plans` 的 spec 输入;每条至少映射一个计划任务 + 一个 TDD 测试断言。

---

## 二、gate-out 对齐核对清单(完成前)

贯彻 `superpowers:verification-before-completion` 的 **Evidence before claims, always**。核对全绿(逐接口对 `architecture.md`、逐元素对 `interaction.md`、逐页对 `prototypes/` 且符合 `design.md` 视觉准则)方可判定完成。

### 向一:对照 architecture.md 逐接口核对

- [ ] 逐接口核对实际请求 / 响应与契约一致:**method / path / 字段 / 状态码 / 错误体**。
- [ ] **数据库结构与 schema 一致**(表/集合、字段、约束、security rules)。

### 向二:对照 interaction.md 逐元素核对

- [ ] 遍历验收项清单**逐条核销**,每条附证据(对应测试通过 / 实测行为描述)。
- [ ] **动作类型正确**:呈现方式与 `interaction.md` 一致——「应是 `drawer` 却做成了 `navigate`」「应是 `toast` 却做成 `modal`」均算**未完成**。
- [ ] **no missing**:`interaction.md` 标注的每个元素 / 呈现方式都有实现并核销。
- [ ] **no orphan**:代码里没有 `interaction.md` / `prototypes/` 之外的多余交互(有则回填上游再核)。

### 向三:对照 prototypes/ 逐页视觉核对(且符合 design.md 视觉准则)

- [ ] 逐页比对实现页面与同名原型(HTML,附截图)的**布局、模块构成、关键控件位置**。
- [ ] **符合 `design.md` 视觉准则**:实现页面用到的颜色 / 字体 / 间距 / 圆角 / 阴影 / 组件外观符合 `design.md` 的 tokens / components / Do&Don't。
- [ ] 偏差**记录**并经用户确认或修正(进入交付报告的偏差项)。

---

## 三、UI variant 基线达标判定

- [ ] **每个 UI 元素都是 shadcn 组件的 variant(cva)**:无裸 element + 一次性内联样式(如 `<button style={{...}}>`、`<div className="bg-[#3b82f6]">`)。
- [ ] **无魔法值 / 魔法 class**:无硬编码颜色(`#3b82f6`)、无未进 theme 的任意像素值(`mt-[13px]`)、无一次性 class。
- [ ] **每个呈现方式按映射表落到对应 shadcn 组件**:完整映射表见 acceptance-checklist-template.md **第 3 节**(权威单一来源;对应规格 §5.6 / §4.4.5),逐条核对实现组件,**零自造**。
- [ ] **design tokens 单一来源**:视觉只在 Tailwind theme + `globals.css` 的 CSS variables 一处定义,无第二处硬编码视觉值;新样式需求 = 给组件新增一个 cva variant,而非另写并行组件或内联覆写。
- [ ] 任一不满足 → 本次实现**视为未完成**。

---

## 四、完成判定 Gate(全部满足才算完成)

- [ ] 所有验收项清单条目已核销,**附证据**。
- [ ] 对齐核对全部通过(逐接口对 `architecture.md`、逐元素对 `interaction.md`、逐页对 `prototypes/` 且符合 `design.md` 视觉准则),偏差项均已解决或经用户**签字接受**。
- [ ] superpowers 的测试套件 / 构建 / lint 全绿(以**本轮新鲜运行**的输出为证)。
- [ ] 按 `superpowers:finishing-a-development-branch` 完成分支收尾(向用户呈现 merge / PR / 保留分支 结构化选项,不擅自合并)。
- [ ] **UI variant 基线达标**(见上一节)。

> **红旗(verification-before-completion)**:任一未满足 → 状态为「未完成」,如实报告剩余项,**禁止**使用「应该可以了 / 大概好了 / Done」等**无证据措辞**。
