---
name: vibe-design
description: >-
  Vibe Coding 流水线第 4 步:视觉设计准则。design.md 是【用户提供】的网站视觉设计系统
  (Google DESIGN.md / awesome-design-md 格式),本 skill 不画图、不生成视觉,而是
  【承接 + 结构化 + 校验】用户提供的视觉来源,固化成标准 design.md,作为下游 vibe-prototype
  出图与 vibe-implement 还原的唯一视觉真相。
  当用户说"设计准则 / 视觉设计 / 设计系统 / design.md / 把我的设计稿整理成 design.md /
  品牌视觉规范 / Style Reference / design tokens / 把我的 Figma 截图变成设计系统 /
  这个网站的视觉规范帮我抽出来 / 整理一份配色字体规范"等,想把【用户提供的视觉来源】固化成
  结构化、可被 Stitch 与实现消费的标准 design.md 时,必须使用本 skill。
  它产出 spec 合规的 design.md(YAML token 前言 + Overview/Colors/Typography/Layout/
  Elevation/Shapes/Components/Do&Don't 八章节),并与 idea.md / interaction.md 交叉校验
  每个页面 / 组件 / 状态都有对应视觉规范。
  反触发(相邻阶段抢入口时主动让路):
  ① 还没 idea.md(产品想法未定型)→ 交给 vibe-idea;
  ② 还没 interaction.md(页面与元素交互未定义)→ 交给 vibe-interaction;
  ③ 还没 architecture.md(技术骨架/数据模型/接口未定)→ 交给 vibe-architecture;
  ④ 要画原型 / 接 Stitch / 每页出图 → 交给 vibe-prototype;
  ⑤ 要写代码 / 修 bug / 跑测试 / 部署 → 交给 vibe-implement。
  前置依赖 idea.md + interaction.md;视觉来源由用户提供;产物 design.md(视觉)交给 vibe-prototype,
  二者以「prototypes/ 必须符合 design.md 的 tokens/components/Do&Don't」为对齐契约。
---

# vibe-design — 视觉设计准则(design.md)

> Vibe Coding 流水线第四环:把【用户提供】的视觉来源(Figma 截图 / 网站 URL / 现有 DESIGN.md / 设计稿图片 / 口述风格 / 参考站点)**承接、结构化、校验**成一份 spec 合规的视觉设计系统 `design.md`,作为下游 `vibe-prototype` 出图与 `vibe-implement` 还原的**唯一视觉真相**。
> SKILL.md 正文承载**定位、三步方法论、完成判定与交接规则**;Google DESIGN.md 格式规范、承接与校验操作步骤、金标准范例下沉到 `references/`,正文用「详见 references/<file>.md」指向。

## 定位

- **流水线第四环**:产物主线 `idea.md → interaction.md → architecture.md → design.md → prototypes/ → 代码` 中的第四环。**上游输入** = `idea.md`(由 `vibe-idea` 产出,提供页面/功能全集)+ `interaction.md`(由 `vibe-interaction` 产出,提供每个可交互元素与四态);技术骨架 `architecture.md` 现也排在本环之前(由 `vibe-architecture` 产出);**视觉来源**由用户提供;**输出** = `design.md`(视觉设计系统),固定名、置于项目根。
- **关键命名提醒(本 skill 的 `design.md` 是【视觉】义,不是技术义)**:在本套件里,技术骨架/数据模型/接口/架构归 `architecture.md`(由 `vibe-architecture` 产出);本 skill 产出的 `design.md` 专指【视觉设计准则 / 视觉设计系统】(Google DESIGN.md / awesome-design-md 格式)。两者同处项目根、各司其职,严禁混淆。
- **类型 = 承接·结构化·校验(不画图)**:本 skill 的灵魂是「**不画图、不生成视觉**」——它**不**发明配色、**不**编造字体、**不**自创组件风格,而是**承接用户提供的视觉来源**,把它**结构化**成 spec 合规的 `design.md`,再**校验**其合规性与完整性。真正的「视觉从哪来」由用户决定(他们提供 Figma / URL / 设计稿 / 口述);本 skill 只负责把这些来源**固化成结构化、可被 Stitch 与实现消费的单一视觉真相**。下游出图(`vibe-prototype`)与还原(`vibe-implement`)都以这份 `design.md` 为唯一视觉权威。
- **职责边界**:本 skill **不碰**技术栈 / 数据库 / 接口(那是 `vibe-architecture`)、**不碰**页面跳转 / 元素交互逻辑 / 呈现方式(那是 `vibe-interaction`)、**不画**原型 / 不接 Stitch(那是 `vibe-prototype`)。它只产出**视觉设计系统**:design tokens(颜色/字体/圆角/间距/组件)+ 八章节视觉准则散文。
- **对齐关系**:`design.md`(视觉)与下游 `prototypes/` 互为视觉契约——**原型必须符合 `design.md` 的 tokens / components / Do&Don't**;同时它**交叉校验** `idea.md` 的每个页面、`interaction.md` 的每个可交互元素与四态(loading/empty/error/forbidden)都有对应的视觉规范或组件 token,缺口必须补齐。

## 何时触发 / 何时不触发

**正向触发**:用户已有 `idea.md` 与 `interaction.md`,手上又有**视觉来源**(Figma 截图 / 网站 URL / 现有 DESIGN.md / 设计稿图片 / 口述风格 / 参考站点),想把它固化成结构化的视觉设计系统——谈「设计准则 / 视觉设计 / 设计系统 / design.md / 把我的设计稿整理成 design.md / 品牌视觉规范 / Style Reference / design tokens / 把这个网站的视觉抽成规范」。

**反触发(相邻阶段抢入口时主动让路)**:

1. **还没 `idea.md`**(产品想法尚未定型)→ 交给 `vibe-idea`;连产品页面全集都未收敛,无从交叉校验「每个页面是否有视觉规范」。
2. **还没 `interaction.md`**(页面与每个元素的交互、四态未定义)→ 交给 `vibe-interaction`;缺它则无从交叉校验「每个可交互元素 / 每个状态是否有对应组件 token 与视觉规范」。
3. **还没 `architecture.md`**(技术骨架 / 数据模型 / 接口 / 架构未定)→ 交给 `vibe-architecture`;architecture 仍是本环上游之一,在新流水线里排在 `interaction` 之后。
4. **要画原型 / 出设计图 / 接 Stitch / 每页出图** → 交给 `vibe-prototype`。
5. **要写代码 / 修 bug / 跑测试 / 部署** → 交给 `vibe-implement`。

## references 导航

正文留定位、方法论与交接规则,细节下沉 references:

- **Google DESIGN.md 格式规范浓缩**(双层文件结构 / token schema / 类型系统 / 八章节顺序与用途 / 推荐命名 / 未知内容消费行为 / lint 七规则 / export 能力)—— 详见 `references/design-md-format.md`。
- **承接各类视觉来源的步骤 + 结构化步骤 + 校验清单**(lint CLI 用法 + 与 idea.md / interaction.md 的交叉校验矩阵)—— 详见 `references/intake-and-validate.md`。
- **金标准 design.md 范例**(完整 YAML 前言 + 八章节,展示完整长相)—— 详见 `references/example-style-reference.md`。

## 三步方法论

本 skill 的全部工作收敛为三步:**① 承接(intake) → ② 结构化 → ③ 校验**。三步不可跳序:没承接到来源不结构化,没结构化好不校验,没校验过不交接。

### ① 承接(intake):接住用户提供的视觉来源

本 skill **不发明视觉**,第一步永远是**问清并接住用户已有的视觉来源**。支持的视觉来源有六类,每类有不同的抽取动作(完整操作步骤详见 `references/intake-and-validate.md`):

| 视觉来源 | 用户提供形态 | 本 skill 的承接动作 |
|---|---|---|
| **Figma 截图** | 设计稿截图 / Figma 链接截图 | 从图中抽 token:取色(颜色 hex)、量字号/行高/字重、识别圆角与间距节奏、辨认组件原子 |
| **网站 URL** | 一个线上站点地址 | 抽取该站视觉:配色、字体家族、圆角、间距、组件风格,落成 tokens(可借 awesome-design-md / Style Reference 工具产出富格式后再浓缩) |
| **现有 DESIGN.md** | 已有一份 DESIGN.md / Style Reference | 校验其是否 spec 合规、补全缺失章节与 token,而非从零重写 |
| **设计稿图片** | 任意视觉参考图(海报/界面/品牌图) | 同 Figma 截图:取色、量字、辨识形状与组件语言 |
| **口述风格** | 文字描述「想要什么调性」 | 引导式追问补齐:主色?字体?圆角硬朗还是柔和?密集还是留白?亮/暗主题?直到信息足以填满 tokens 与八章节 |
| **参考站点** | "做成像 X 那样" | 把参考站点当 URL / 截图来源抽取,并提醒用户这是**借鉴而非照搬**,需落成自有 tokens |

> **承接铁律**:凡 token 值(颜色 hex、字号、圆角、间距)都必须**来自用户提供的来源或用户确认的口述**,不得由本 skill 凭空发明。来源信息不足以填满某 token 时,**向用户追问补齐**,不得用占位或猜测值蒙混。

### ② 结构化:产出 spec 合规的 design.md

把承接到的视觉来源**结构化**成一份 Google DESIGN.md 格式(awesome-design-md 格式)的 `design.md`。文件双层结构(完整 schema / 类型 / 章节用途详见 `references/design-md-format.md`):

**A. YAML token 前言(machine-readable design tokens)**,置于文件最前、以 `---` 包裹,至少含:

- `colors` —— 颜色 token(`primary` 必填;按约定 `primary` / `secondary` / `tertiary` / `neutral` / `surface` / `on-surface` / `error`),值为 `#hex`(sRGB)。
- `typography` —— 字体层级 token(常用 `headline-*` / `display` / `body-*` / `label-*` / `caption`;9–15 级),每级是 Typography 对象(`fontFamily` / `fontSize` / `fontWeight` / `lineHeight` / `letterSpacing` / 可选 `fontFeature` / `fontVariation`)。
- `rounded` —— 圆角 token(`none` / `sm` / `md` / `lg` / `xl` / `full`),值为 Dimension。
- `spacing` —— 间距 token(`xs` / `sm` / `md` / `lg` / `xl` / `base` / `gutter` / `margin`…),值为 Dimension 或无单位数字。
- `components` —— 组件原子 token(如 `button-primary`、`button-primary-hover`、`input-field`),每个组件下挂 `backgroundColor` / `textColor` / `typography` / `rounded` / `padding` 等,**值可用 `{path.to.token}` 引用**前面已定义的 token(如 `{colors.primary}`、`{rounded.md}`)。

> **类型与引用速记**:Color = `#hex`(sRGB);Dimension = 带单位字符串(`px`/`em`/`rem`);Typography = 对象;Token Reference = `{path}` 花括号路径(多数 token 须指向**基元值**,`components` 内允许引用复合值如 `{typography.label-md}`)。

**B. Markdown 正文(human-readable prose)**,用 **8 个 `##` 章节**,**按固定顺序**排列(顺序错乱会被 lint 的 `section-order` 规则判错):

1. `## Overview`(亦作 "Brand & Style")—— 品牌个性、目标受众、整体调性
2. `## Colors` —— 各色板语义与用法
3. `## Typography` —— 字体策略与各层级角色
4. `## Layout`(亦作 "Layout & Spacing")—— 栅格 / 间距节奏
5. `## Elevation & Depth`(亦作 "Elevation")—— 层级如何表达(阴影 / 色调层 / 边框)
6. `## Shapes` —— 形状语言(圆角风格)
7. `## Components` —— 组件原子的视觉指引
8. `## Do's and Don'ts` —— 实操守则与常见坑

> 散文用描述性色名(如 "Midnight Forest Green"),与系统化 token 名(如 `primary`)对应;**token 是规范值,散文提供应用语境**。允许出现一个用于标题的 `# <h1>`(不被解析为章节);不相关的章节可省略,但**保留的章节必须按上述顺序**。

完整可复制的金标准范例(YAML 前言 + 八章节)详见 `references/example-style-reference.md`。

### ③ 校验:lint + 交叉校验,缺口标红

结构化产出后**必须**跑两道校验,任一不过都不算完成:

**A. spec 合规校验(lint CLI)**:运行

```bash
npx @google/design.md lint design.md
```

它跑**七条规则**(逐规则含义详见 `references/design-md-format.md`):`broken-ref`(token 引用悬空)/ `missing-primary`(缺 `colors.primary`)/ `contrast-ratio`(对比度不足 WCAG)/ `orphaned-tokens`(定义但无人引用)/ `token-summary`(token 统计摘要)/ `missing-sections`(缺必需章节)/ `missing-typography`(缺字体定义)/ `section-order`(章节顺序错)。**目标:0 error**。

**B. 交叉校验(与 idea.md / interaction.md 对账)**:`design.md` 是视觉真相,必须覆盖产品的**每个页面、每个可交互元素、每个状态**。逐条对账(完整交叉校验矩阵详见 `references/intake-and-validate.md`):

- **页面 × 视觉规范**:`idea.md` 列出的**每个页面**,在 `design.md` 里都能找到对应的布局 / 配色 / 字体 / 组件视觉规范支撑(无遗漏页面)。
- **可交互元素 × 组件 token**:`interaction.md` 里的**每个可交互元素**(按钮 / 输入 / 行 / 开关 / 弹窗触发点…),在 `design.md` 的 `components` token 或组件章节里都有对应视觉定义(无裸元素)。
- **四态 × 状态视觉**:`interaction.md` 每页的 **loading / empty / error / forbidden 四态**(及扩展态)都有对应的视觉规范——骨架屏样式、空态插画/文案样式、错误占位样式、403 占位样式,缺一不可。

> **缺口标红**:交叉校验发现任何「有页面 / 有元素 / 有状态,却无对应视觉规范或 token」的缺口,**逐条列出并标红**,补齐对应 token 或视觉章节后**重跑校验**,直到无缺口。交叉校验中新发现的视觉需求**就地补进 `design.md`** 并重跑 lint。

## 完成判定(视觉设计准则就绪检查)

`design.md` 同时满足以下**全部 3 条**才视为「**已就绪**」,方可进入原型阶段:

1. **lint 0 error**:`npx @google/design.md lint design.md` 七条规则全过,**0 error**(警告须逐条确认可接受)。
2. **交叉校验无缺口**:`idea.md` 每个页面、`interaction.md` 每个可交互元素与每页四态(loading/empty/error/forbidden)都已映射到对应的视觉规范 / 组件 token,**无任何标红缺口**。
3. **用户已确认**:明确告知用户 `design.md` 路径,用户复核(尤其确认 token 值忠实于其提供的视觉来源)并批准后,才置状态为「已就绪」。

## 向 vibe-prototype 的交接

**交接靠产物文件,无自动编排**(本套件无自动编排器,手动逐个调用)。`design.md` 就绪并经用户确认后,向用户输出一段**交接说明**,固定包含**四要素**:

1. **产物路径 + 版本**:`design.md` 的路径(`./design.md`)与当前版本 / commit。
2. **对齐到的上游版本**:本 `design.md` 交叉校验时所对齐的 `interaction.md` 版本 / commit 与 `idea.md` 版本 / commit(下游对齐校验以此为锚)。
3. **下一步手动调用**:明确告知「下一步请**手动调用** `vibe-prototype`」。
4. **对齐契约**:`prototypes/` 必须符合 `design.md` 的 **tokens / components / Do&Don't**——原型的配色、字体、圆角、间距、组件风格须落在本 `design.md` 的 token 上,不得另起一套视觉。

**交接话术(出口处给出)**:

> "`design.md`(视觉设计准则)已就绪并经你确认(路径:`./design.md`,对齐 `interaction.md` 版本:`<commit>`、`idea.md` 版本:`<commit>`)。lint 0 error、与每个页面/元素/四态的交叉校验已无缺口。下一步请**手动调用 vibe-prototype**,它将以本 `design.md`(视觉权威)+ `interaction.md`(元素/状态)为输入,为每个页面在 Stitch 画布生成原型,落盘到 `prototypes/`。**对齐契约**:`prototypes/` 必须符合本 `design.md` 的 tokens / components / Do&Don't,凡视觉偏离一律以本文件为准修正。"

> **编排说明**:本套件为手动逐个调用,`vibe-design` **不自动**拉起 `vibe-prototype`;它只把「就绪状态 + 产物路径 + 对齐版本 + 下一步指令 + 对齐契约」交还给用户,由用户手动发起下一阶段。
