# Google DESIGN.md 格式规范(浓缩)

> 本文件浓缩 Google DESIGN.md 官方 spec(awesome-design-md 格式),是 `vibe-design` 结构化与校验 `design.md`(视觉)时的**单一事实源**。原始 spec 见 `@google/design.md`。
> 核心定位:DESIGN.md 是一份**自包含、纯文本**的设计系统表示——它定义品牌与产品的视觉身份,使这些风格选择能跨设计会话、跨不同 AI agent 与工具被一致沿用。它既是人类可读、又是机器可读的「活的视觉真相」。

## 一、文件双层结构(YAML 前言 + Markdown 正文)

一个 DESIGN.md 文件含两部分:

1. **YAML 前言(front matter,可选但本套件必填)** —— **机器可读**的 design tokens。必须以单独一行 `---` 开始、以单独一行 `---` 结束,中间是按下文 schema 解析的 YAML。
2. **Markdown 正文(body)** —— **人类可读**的设计理由与指引(prose)。散文可用描述性色名(如 "Midnight Forest Green"),与系统化 token 名(如 `primary`)对应。

> **规范权威关系**:**token 是规范值(normative),散文提供应用语境(context)**。两者矛盾时以 token 为准。这些 token 可与 `tokens.json`、Figma variables、Tailwind theme config 互转。

前言示例:

```yaml
---
version: alpha
name: Daylight Prestige
colors:
  primary: "#1A1C1E"
  secondary: "#6C7278"
  tertiary: "#B8422E"
typography:
  h1:
    fontFamily: Public Sans
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.02em
---
```

## 二、Token Schema

token 系统借鉴 [Design Token JSON spec](https://www.designtokens.org/),采用「带类型的 token 组(colors / typography / spacing)」与 `{path.to.token}` 引用语法。完整 schema:

```yaml
version: <string>          # 可选,当前版本 "alpha"
name: <string>
description: <string>      # 可选
colors:
  <token-name>: <Color>
typography:
  <token-name>: <Typography>
rounded:
  <scale-level>: <Dimension>
spacing:
  <scale-level>: <Dimension | number>
components:
  <component-name>:
    <token-name>: <string | token reference>
```

`<scale-level>` 是 sizing/spacing 刻度上的命名级别,常见 `xs` / `sm` / `md` / `lg` / `xl` / `full`,任意描述性字符串键均合法。

## 三、类型系统(Types)

| 类型 | 定义 | 例子 |
|---|---|---|
| **Color** | 必须以 `#` 开头,后接 **sRGB 色彩空间**的 hex 色码 | `"#1A1C1E"` |
| **Dimension** | 带单位后缀的字符串,合法单位:`px` / `em` / `rem` | `24px`、`1.5rem`、`-0.02em` |
| **Typography** | 一个对象(各属性见下) | 见下表 |
| **Token Reference** | 用花括号包裹的对象路径,指向 YAML 树中另一值;多数 token 组须指向**基元值**(如 `colors.primary-60`)而非组(如 `colors`);**`components` 内允许引用复合值**(如 `{typography.label-md}`) | `"{colors.primary-60}"`、`"{rounded.md}"` |

**Typography 对象属性**:

- `fontFamily`(string)
- `fontSize`(Dimension)
- `fontWeight`(number)—— 数字字重(如 `400`、`700`);YAML 中裸数字或带引号字符串等价
- `lineHeight`(Dimension | number)—— 可为 Dimension(`24px`/`1.5rem`)或无单位数字(`1.6`,表示 fontSize 的倍数,推荐做法)
- `letterSpacing`(Dimension)
- `fontFeature`(string)—— 配置 `font-feature-settings`
- `fontVariation`(string)—— 配置 `font-variation-settings`

## 四、八章节顺序与各章用途

每个 DESIGN.md 遵循同一结构。**不相关的章节可省略,但保留的章节必须按下列顺序出现**。所有章节用 `<h2>`(`##`)。允许一个用于文档标题的 `<h1>`(不被解析为章节)。

| # | 章节(及别名) | 用途 |
|---|---|---|
| 1 | **Overview**(亦作 "Brand & Style") | 对产品观感的整体描述:品牌个性、目标受众、UI 应唤起的情绪(playful 还是 professional、密集还是留白)。当某具体规则/token 未明确定义时,作为 agent 高层风格决策的基础语境。 |
| 2 | **Colors** | 定义配色板。**至少须定义 `primary` 色板**,可按需增加。多板时常按 `primary` / `secondary` / `tertiary` / `neutral` 顺序赋予语义角色。 |
| 3 | **Typography** | 定义字体层级。多数设计系统有 **9–15 个层级**,可为每级规定角色。常用命名 `headline` / `display` / `body` / `label` / `caption`,再分 `small` / `medium` / `large`。 |
| 4 | **Layout**(亦作 "Layout & Spacing") | 描述布局与间距策略。可为栅格制(grid),也可如 Liquid Glass 用 margins / safe areas / 动态 padding。 |
| 5 | **Elevation & Depth**(亦作 "Elevation") | 描述视觉层级如何表达。用阴影则定义 spread/blur/color;扁平设计则说明替代手段(边框、色彩对比、色调层 tonal layers)。 |
| 6 | **Shapes** | 描述视觉元素的形状语言(圆角风格,如「4px 极简圆角」的 Architectural Sharpness)。 |
| 7 | **Components** | 为组件原子提供视觉指引:Buttons(primary/secondary/tertiary + 尺寸/padding/states)、Chips、Lists、Tooltips、Checkboxes、Radio、Input fields 等;鼓励定义领域专属组件。 |
| 8 | **Do's and Don'ts** | 实操守则与常见坑,作为创作时的护栏(如「primary 色每屏只用于最重要的一个动作」「保持 WCAG AA 对比度」)。 |

### 各章对应的 token 组

- **Colors → `colors`**:map\<string, Color>,token 由散文里的关键色板派生,映射可用任意一致命名约定。
- **Typography → `typography`**:map\<string, Typography>,定义各层级精确字体属性。
- **Layout → `spacing`**:map\<string, Dimension | number>,可含栅格的列宽/间距 gutter/页边 margin;无单位数字表列数或比例。
- **Shapes → `rounded`**:map\<string, Dimension>,按钮/卡片等矩形的圆角。
- **Components → `components`**:map\<string, map\<string, string>>,组件标识 → 子 token 名/值;值可为字面量或对前面 token 的 `{}` 引用。**变体**(active/hover/pressed)用相关键表示,如 `button-primary` / `button-primary-hover` / `button-primary-active`。

**组件属性 token**(每个组件可挂):`backgroundColor`(Color)、`textColor`(Color)、`typography`(Typography)、`rounded`(Dimension)、`padding`(Dimension)、`size`(Dimension)、`height`(Dimension)、`width`(Dimension)。

components 示例:

```yaml
components:
  button-primary:
    backgroundColor: "{colors.primary-60}"
    textColor: "{colors.primary-20}"
    rounded: "{rounded.md}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.primary-70}"
```

## 五、推荐 token 命名(非强制 / Non-Normative)

跨设计系统常用,作一致性指引(非必需):

- **Colors**:`primary`、`secondary`、`tertiary`、`neutral`、`surface`、`on-surface`、`error`
- **Typography**:`headline-display`、`headline-lg`、`headline-md`、`body-lg`、`body-md`、`body-sm`、`label-lg`、`label-md`、`label-sm`
- **Rounded**:`none`、`sm`、`md`、`lg`、`xl`、`full`

## 六、未知内容消费行为表(Consumer Behavior for Unknown Content)

当 DESIGN.md 消费者遇到 spec 未定义的内容时:

| 场景 | 行为 | 例子 |
|---|---|---|
| 未知章节标题 | 保留,不报错 | `## Iconography` |
| 未知颜色 token 名 | 值合法即接受 | `surface-container-high: '#ede7dd'` |
| 未知字体 token 名 | 作为合法 typography 接受 | `telemetry-data` |
| 未知 spacing 值 | 接受;非合法 dimension 则按字符串存 | `grid-columns: '5'` |
| 未知组件属性 | 接受并警告 | `borderColor` |
| **重复章节标题** | **报错,拒绝文件** | 出现两个 `## Colors` |

## 七、lint 七条规则表

校验命令:`npx @google/design.md lint design.md`。

| 规则 | 含义 | 触发条件 |
|---|---|---|
| `broken-ref` | token 引用悬空 | `{path}` 指向不存在的 token |
| `missing-primary` | 缺主色 | 未定义 `colors.primary` |
| `contrast-ratio` | 对比度不足 | 文本/背景对比未达 WCAG(正文 ≥ 4.5:1,大字/图形 ≥ 3:1) |
| `orphaned-tokens` | 孤儿 token | token 已定义但无人引用 |
| `token-summary` | token 统计摘要 | 输出各组 token 数量概览(信息性) |
| `missing-sections` | 缺必需章节 | 缺 Overview/Colors/Typography 等必需章节 |
| `missing-typography` | 缺字体定义 | 未定义任何 typography token |
| `section-order` | 章节顺序错 | 八章节未按规定顺序出现 |

> **就绪门**:`vibe-design` 要求 **0 error**;`token-summary` 类信息性输出与可接受的 warning 须逐条确认。

## 八、export 能力

DESIGN.md 可导出为下游工程可直接消费的格式:

- **`css-tailwind`** —— 导出为 Tailwind theme(CSS variables / `@theme`),供 shadcn/ui 主题层与 `globals.css` 直接消费(下游 `vibe-implement` 注入 shadcn 主题、`vibe-prototype` 对齐视觉用)。
- **`dtcg`** —— 导出为 [DTCG(Design Tokens Community Group)](https://www.designtokens.org/) 标准 `tokens.json`,可回流 Figma variables / 第三方 token 工具。

> 因 token 与 `tokens.json` / Figma variables / Tailwind config 可互转,`design.md` 一处定义即可多端消费,是「单一视觉真相」的技术基础。
