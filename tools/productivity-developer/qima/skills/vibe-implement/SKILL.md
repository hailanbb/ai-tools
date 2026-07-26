---
name: vibe-implement
description: Vibe Coding 流水线的实现阶段(流水线终点,顺序 idea → interaction → architecture → design → prototype → implement)。当 interaction.md、architecture.md、design.md、prototypes/ 已就绪,用户说"开始实现""写代码""把设计落地""进入开发""implement / build it""部署 / 上线 / deploy / 发布到 CloudBase"时使用(部署经 CloudBase MCP 属本阶段联调层职责)。薄封装 superpowers 的 writing-plans → subagent-driven-development / executing-plans / test-driven-development(辅以 verification-before-completion、finishing-a-development-branch),在实现前后各加一道对齐门:把每个页面、每个交互元素转成可验收任务,并逐元素核对 interaction.md、逐接口核对 architecture.md、逐页核对 prototypes/ 且符合 design.md(视觉准则)。反触发:交互文档缺页回 vibe-interaction;技术骨架未定稿/接口缺失回 vibe-architecture;视觉准则缺失回 vibe-design;原型缺失/与文档不符回 vibe-prototype;纯调试单个 bug 且无设计变更直接用 systematic-debugging。
---

# vibe-implement —— 实现落地(薄封装 superpowers 实现链)

## 定位

本 skill 是 Vibe Coding 流水线的**终点**(流水线顺序:idea → interaction → architecture → design → prototype → implement),也是一个**薄封装(thin wrapper)**。它不重写任何实现方法论,而是复用 superpowers 的成熟实现链,把 `interaction.md`(交互骨架,第一份 UI 文档)+ `architecture.md`(技术骨架:数据 / 接口 / 架构,照 interaction 数据需求派生)+ `design.md`(视觉设计准则)+ `prototypes/`(视觉原型)这四份已经互相对齐的产物,落地成**可运行、可验收、与设计逐元素一致**的代码。

它存在的唯一理由,是在 superpowers 实现链的两端各插入一道**对齐门(alignment gate)**,把目标从「实现 ≈ 设计」收紧到「实现 = 设计」。中间所有具体方法论(怎么写计划、怎么派 subagent、怎么走 TDD、怎么收尾分支)全部委托给 superpowers 本体,本 skill 只做「Announce + 引用 + 注入上下文」。

**实现期权威分工(谁说了算,各管一摊,不得越界):**

| 维度 | 唯一权威 | 内容 |
|------|----------|------|
| **交互** | `interaction.md` | 每页布局、功能模块、页面级四态、每个可交互元素的触发 / 行为 / 多状态 / 门控 / 边界、呈现方式标注 |
| **接口 / 数据 / 架构** | `architecture.md` | 技术栈、数据库 schema、接口契约(method / path / req / resp)、前后端架构、行级安全规则 |
| **视觉** | `design.md`(视觉准则)+ `prototypes/` | `design.md` 是视觉准则单一权威(tokens / colors / typography / layout / elevation / shapes / components / Do&Don't);`prototypes/` 是按视觉准则出的每页落地样张 |

> 三类权威互不僭越:实现期遇到「接口该返回什么」查 `architecture.md`;遇到「点了之后弹窗还是跳转」查 `interaction.md`;遇到「这个按钮长什么样 / 用什么颜色 / 圆角多大」查 `design.md` 视觉准则,落到 `prototypes/` 同名样张对照。

**前置条件(四份产物已就绪):** `interaction.md`、`architecture.md`、`design.md`、`prototypes/` 四者齐备且互相对齐(交接链 idea → interaction → architecture → design → prototype → implement)。任一缺失或不一致,本 skill 不启动,直接回退到对应上游 skill。

## 核心契约(本 skill 的灵魂)

> 实现阶段**不允许**出现「设计里没有、原型里没有」的交互;也**不允许**遗漏「设计里有、原型里有」的交互。两边必须**双向闭合(no orphan, no missing)**。

- **no orphan(无孤儿)**:代码里不得冒出 `interaction.md` / `prototypes/` 之外的额外交互;若实现中发现确有必要的新交互,回填上游权威文档(交互回 `interaction.md`、接口 / 数据回 `architecture.md`(架构据 interaction 数据需求派生)、视觉回 `design.md` 视觉准则)并重跑入口门,而不是在本阶段私自增项。
- **no missing(无遗漏)**:`interaction.md` 中标注的每一个可交互元素、每一种呈现方式,都必须有对应实现并被逐条核销。

## 反触发(非触发场景,交还其他 skill)

| 场景 | 交还给 |
|------|--------|
| ① 交互文档缺页(`interaction.md` 不完整) | 先回 `vibe-interaction` |
| ② 技术骨架未定稿 / 接口缺失(`architecture.md` 不完整) | 先回 `vibe-architecture` |
| ③ 视觉设计准则缺失 / 不完整(`design.md` 视觉准则缺 tokens / 组件 / Do&Don't) | 先回 `vibe-design` |
| ④ 原型缺失或与文档不符(`prototypes/` 对不上,或不符合 `design.md` 视觉准则) | 先回 `vibe-prototype` |
| ⑤ 纯调试单个 bug 且无设计变更 | 直接用 `superpowers:systematic-debugging`,无需走完整流水线 |

---

## 薄封装调用链(在哪一步调哪个 superpowers skill)

本 skill 正文的主干是一条调用链;vibe-implement 只在链条**两端**插入对齐逻辑,中间完全委托 superpowers。

| 阶段 | 调用的 skill | vibe-implement 叠加的内容 |
|------|--------------|---------------------------|
| **① 入口对齐门(gate-in)** | —(本 skill 自有逻辑) | 强制加载四份产物 → 双向闭合校验(含 UI variant 基线) → 生成「验收项清单」 |
| **② 计划编写** | `superpowers:writing-plans` | 把验收项清单作为 spec 输入;任务按「数据库→接口→前端骨架→交互逐元素→联调」五层分层;每条交互验收项必须映射到至少一个可测任务 |
| **③ 任务执行** | `superpowers:subagent-driven-development`(首选)/ `superpowers:executing-plans`(无 subagent / 需独立 session) | 每个 implementer subagent 的上下文中**必须注入**对应页面的 interaction.md 片段 + design.md(视觉准则)相关 tokens / 组件规范 + prototype 路径 + architecture.md 接口契约;spec-reviewer 阶段的「spec」即对齐验收项 |
| **④ 每个功能/修复** | `superpowers:test-driven-development` | 交互验收项先写成失败测试(「点击 X 应弹出 modal Y」→ 先写断言再实现),遵守 **Iron Law:无失败测试不写实现** |
| **⑤ 完成判定** | `superpowers:verification-before-completion`(精神)+ `superpowers:finishing-a-development-branch` | 在 superpowers 的「测试通过」之上,追加**出口对齐门(gate-out)**的对齐核对(逐接口对 `architecture.md`、逐元素对 `interaction.md`、逐页对 `prototypes/` 且符合 `design.md` 视觉准则)后才允许宣称完成 |

### 选择执行 skill 的判定

沿用 subagent-driven-development 的决策树:

1. 任务相互**独立** + 留在**当前 session** + 有 subagent → 用 `subagent-driven-development`(推荐:上下文隔离、两段式 review)。
2. 需要在**独立 session** 执行、带**人工 checkpoint** → 用 `executing-plans`。
3. 二者都遵从 `writing-plans` 生成的计划,且计划头部已按 superpowers 约定写明 `REQUIRED SUB-SKILL`(指明本计划须用哪个执行 skill 落地)。

### 薄封装原则

vibe-implement **不复制** TDD 的 Red-Green-Refactor 流程,**不复制** subagent 的两段式 review 流程;只在本 SKILL.md 正文中以「Announce(宣告将用某 superpowers skill)+ 引用(指向该 skill)+ 注入上下文(把对齐验收项 / interaction.md 片段 / prototype 路径喂给它)」三步调起它们。所有方法论细节交给 superpowers 本体维护,以**避免重造轮子与版本漂移**——上游 skill 升级,本 skill 自动跟随,只需核对显式声明的对齐插入点。五层实现顺序的落地细节详见 references/implementation-layers.md。

---

## gate-in(实现前,硬性阻断门)

gate-in 是**硬性阻断门**:不闭合 / 基线不达标,不得进入实现。逐步可勾选清单详见 references/alignment-gates.md。

### Step A —— 加载四份产物(缺一不可)

- `interaction.md`(交互权威,第一份 UI 文档):每页布局、功能模块、页面逻辑、跳转逻辑、每个按钮/元素点击后的逻辑、弹窗逻辑(明确标注 弹窗 `modal` / 跳转 `navigate` / 浮窗 `popover` / 抽屉 `drawer` / `toast`)。
- `architecture.md`(接口 / 数据 / 架构权威,照 interaction 数据需求派生):技术栈、数据库 schema、接口契约(method / path / req / resp)、前后端架构。
- `design.md`(视觉权威 / 视觉准则):设计 tokens(YAML 前言)+ Overview / Colors / Typography / Layout / Elevation / Shapes / Components / Do&Don't 等章节,是颜色 / 字体 / 间距 / 圆角 / 阴影 / 组件外观的单一权威。
- `prototypes/`(视觉权威 / 落地样张):按页面ID 命名的原型(HTML 主产物 `<页面ID>.html`,附可选 `.png` 截图)+ `prototypes/manifest.json`(**页面ID ↔ screenId ↔ 文件 ↔ status 的单一事实源**);每页原型须符合 `design.md` 的视觉准则。

任一缺失,或四者互不一致 → **停止**,报告缺口,建议回退到对应上游 skill(缺交互回 `vibe-interaction`、缺技术骨架 / 接口回 `vibe-architecture`、缺视觉准则回 `vibe-design`、缺原型回 `vibe-prototype`)。

### Step B —— 双向闭合校验(7 条)

1. `interaction.md` 的每个页面 → 必须能在 `prototypes/` 找到同名原型 `<页面ID>.html`。
2. `prototypes/` 的每个原型(含 `<页面ID>--<子态名>` 子态原型) → 必须能在 `interaction.md` 找到对应页面描述。
3. `interaction.md` 每条**功能化数据需求**(读 / 写)→ 必须能在 `architecture.md` 找到对应**派生**出的接口(architecture 定义的 `API-<域>-<动作>`)与数据实体,且该接口 / 字段已**回指**其服务的 `interaction.md` 页面 / 元素 / 动作(`interaction.md` 本身不写、不引用接口 ID)。
4. **`design.md`(视觉)↔ `prototypes/` 对齐**:每页原型用到的颜色 / 字体 / 间距 / 圆角 / 阴影 / 组件外观 → 必须符合 `design.md` 的 tokens / components / Do&Don't,无原型自创的、`design.md` 未定义的视觉值。
5. 核对 `manifest.json` 全部 `pages[].status=aligned`,以 `pages[]` 作为待实现 checklist。
6. 任一不闭合 → 列出 **orphan / missing 清单**交用户裁决,**不得带病进入实现**(裁决原则:上游文档为权威主线,「下游有文档无」回指上游补文档,「文档有下游无」在下游补齐,用户拍板)。
7. **UI variant 基线校验(shadcn 强制)**:确认本项目 UI 体系为 shadcn/ui(Radix + Tailwind + cva),`components/ui` 已就位,且 design tokens 单一来源(Tailwind theme + CSS variables,由 `design.md` 视觉准则规范化注入)已就位。基线不满足 → **停止**,先补齐 UI 基线再实现。

### Step C —— 生成「验收项清单」(本 skill 的关键产物)

把交互文档**逐元素**拆成原子验收项,每条是一句「可观察、可断言」的行为描述。模板:

```
[页面] / [元素/触发] / [动作类型] / [结果] / [验收断言]
```

- **动作类型必须显式标注为五选一(或其组合)**:弹窗 `modal` / 跳转 `navigate` / 浮窗 `popover` / 抽屉 `drawer` / `toast`——直接继承 `interaction.md` 的细化粒度(扩展词表 `confirm` / `bottomsheet` / `inline-expand` / `inline-edit` / `newtab` / `download` 同样适用)。
- **接口类验收项**额外标注请求 / 响应契约来源(`architecture.md` 锚点 `API-<域>-<动作>`),供联调阶段核对。
- 这份清单会被 `writing-plans` 当作 **spec 输入**;每条验收项至少映射一个计划任务和一个测试断言。
- 完整字段释义、五类呈现方式各一的填好示例、「呈现方式 → shadcn 组件」映射表(权威单一来源,见 references/acceptance-checklist-template.md 第 3 节)与互斥提示,详见 references/acceptance-checklist-template.md。

> **编号约定**:本 skill 多处出现的 `§5.6`(呈现方式分类法 Taxonomy)与 `§4.4.5`(组件变体体系 Variant Inheritance)指**本套件规格** `docs/superpowers/specs/2026-06-01-vibe-coding-skill-suite-design.md` 的对应章节,**不是**本 skill 或所消费 `architecture.md` / `interaction.md` / `design.md` 产物的章节号。skill 内部需用到「呈现方式 → shadcn 组件」映射表时,以 references/acceptance-checklist-template.md **第 3 节**为权威单一来源。

---

## gate-out(完成前,硬性阻断门)

gate-out 同样是**硬性阻断门**:对齐核对不全绿 / UI variant 基线未达标,**不得宣称完成**。它把 Step C 的验收项清单逐条核销,做对齐核对(逐接口对 `architecture.md`、逐元素对 `interaction.md`、逐页对 `prototypes/` 且符合 `design.md` 视觉准则)+ UI variant 基线达标判定。核对清单与完成判定 Gate 见下文「验证与完成判定」一节,逐步可勾选清单详见 references/alignment-gates.md。

---

## 实现顺序(写入 writing-plans 的任务分层)

计划的任务必须按下列五层组织,**自底向上**,每层产出可独立验证的成果。结合 Next.js(App Router)+ CloudBase 的落地细节详见 references/implementation-layers.md。

1. **数据库层** —— 按 `architecture.md` 的 schema 建表 / 迁移(CloudBase 数据库 + security rules);先写迁移测试或 schema 断言。验证:迁移可执行、字段 / 约束与 `architecture.md` 一致。
2. **接口层** —— 按 `architecture.md` 接口契约实现后端 endpoint(Next.js Route Handlers / Server Actions / CloudBase 云函数 / SDK 直连);每个接口先写契约测试(请求 / 响应 shape、状态码、错误体)。验证:契约测试全绿。
3. **前端骨架层** —— 按 `interaction.md` 的页面清单与跳转逻辑,用 Next.js App Router 搭路由 + 页面空壳 + 布局框架(对照 `prototypes/` 整体结构,视觉遵 `design.md` 准则)。验证:所有页面可达、路由跳转与 `interaction.md` 跳转逻辑一致。
4. **交互逐元素落地层(核心层)** —— 逐条消费 gate-in 的验收项清单,每条交互(按钮 / 弹窗 / 浮窗 / 抽屉 / toast)走一遍 TDD:先把验收断言写成失败测试 → 实现 → 通过。**一条验收项 = 一组 Red-Green**。
5. **联调层** —— 前端接入真实接口,端到端走通关键流程;对照 `architecture.md` 核对前后端数据流、错误处理、loading / 空 / 异常态。验证:关键用户路径 E2E 跑通。

> **分层目的**:让交互这一最易遗漏、用户最看重的部分,有独立且最密集的一层任务和测试,避免被「功能跑通了」一笔带过。

---

## 验证与完成判定(对齐核对)

引用并贯彻 `superpowers:verification-before-completion` 的精神:**Evidence before claims, always**——没有在本轮跑出验证证据,不得宣称完成。在 superpowers 的「测试通过 / 构建成功」之上,vibe-implement 追加**对齐核对**(逐接口对 `architecture.md`、逐元素对 `interaction.md`、逐页对 `prototypes/` 且符合 `design.md` 视觉准则),全绿方可判定完成。

1. **对照 architecture.md 逐接口核对**:逐接口核对实际请求 / 响应与契约一致(method / path / 字段 / 状态码 / 错误体);数据库结构与 schema 一致。
2. **对照 interaction.md 逐元素核对**:遍历验收项清单逐条核销,每条需有证据(对应测试通过 / 实测行为描述)。重点确认动作类型正确——「应是 `drawer` 却做成了 `navigate`」属于**未完成**。无遗漏元素(no missing),无文档外多余交互(no orphan)。
3. **对照 prototypes/ 逐页视觉核对(且符合 design.md 视觉准则)**:逐页比对实现页面与同名原型(HTML,附截图)的布局、模块构成、关键控件位置;同时核对颜色 / 字体 / 间距 / 圆角 / 阴影 / 组件外观符合 `design.md` 的 tokens / components / Do&Don't;偏差需记录并经用户确认或修正。

### 完成判定 Gate(全部满足才算完成)

- [ ] 所有验收项清单条目已核销,附证据。
- [ ] 对齐核对全部通过(逐接口对 `architecture.md`、逐元素对 `interaction.md`、逐页对 `prototypes/` 且符合 `design.md` 视觉准则),偏差项均已解决或经用户签字接受。
- [ ] superpowers 的测试套件 / 构建 / lint 全绿(以本轮**新鲜运行**的输出为证)。
- [ ] 按 `superpowers:finishing-a-development-branch` 完成分支收尾。
- [ ] **UI variant 基线达标(铁律,不满足视为未完成)**:实现的**每个 UI 元素都是 shadcn 组件的 variant(cva)**,无裸样式 / 内联魔法值 / 一次性 class;每个呈现方式严格按「呈现方式 → shadcn 组件」映射表(权威单一来源:references/acceptance-checklist-template.md 第 3 节;对应规格 §5.6)落到对应组件,**零自造**;design tokens 单一来源(Tailwind theme + CSS variables),无第二处硬编码视觉值。

> **红旗**:任一未满足 → 状态为「未完成」,如实报告剩余项,**禁止**使用「应该可以了 / 大概好了 / Done」等无证据措辞(对应 verification-before-completion 的 Red Flags)。

---

## 向用户交付

本 skill 是流水线末端,手动逐阶段编排,无自动编排器。

- **产出物**:可运行的代码(已通过对齐核对)+ 一份「**对齐核对报告**」,内容为验收项清单的核销状态、接口 / 交互 / 视觉偏差项及处理结论。
- **回指主线**:报告中显式标注本次实现对齐的 `interaction.md` / `architecture.md` / `design.md` / `prototypes/` 版本(commit 或时间戳),保证流水线全程可追溯(交接链 idea → interaction → architecture → design → prototype → implement)。
- **交接话术(向用户呈现):**
  - 已完成:列出本轮落地的页面与交互项数量、测试结果、E2E 关键路径结论。
  - 待用户决策:列出接口 / 交互 / 视觉偏差项,给出三选项——「**按设计修实现** / **按实现修设计文档** / **接受偏差**」。
  - 后续闭环:若用户选择修改设计,提示回退到对应权威 skill(交互回 `vibe-interaction`、接口 / 数据 / 架构回 `vibe-architecture`、视觉准则回 `vibe-design`,必要时再到 `vibe-prototype`),修订后重新触发本 skill 的 gate-in,形成迭代闭环。
- **分支整合**:依据 `superpowers:finishing-a-development-branch`,向用户呈现 merge / PR / 保留分支 的结构化选项并执行其选择,**不擅自合并**。
