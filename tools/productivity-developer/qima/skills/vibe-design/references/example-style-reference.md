# 金标准 design.md 范例

> 这是一份 **spec 合规、可直接照抄结构**的 `design.md`(视觉设计准则)范例,展示「YAML token 前言 + 八章节」的完整长相。
> 内容基于一份富格式 Style Reference(Dia Browser —— "Prism on white stationery")**浓缩**而成:把富格式里的 Colors / Typography / Spacing / Shapes / Surfaces / Elevation / Components / Do&Don't 收敛进 spec 规定的八章节与五组 token。
> 用法:`vibe-design` 结构化用户提供的视觉来源时,以本文件为模板填真实 token 与散文,然后跑 `npx @google/design.md lint design.md` 校验为 0 error。
> 注:本范例的 token 名(`primary`/`secondary`…)是 spec 推荐命名;散文里的描述性色名(Ink Black / Canvas…)与之对应。下面 `---` 之间即真实 `design.md` 内容的样子。

---

```markdown
---
version: alpha
name: Dia — Prism on White Stationery
description: 近乎单色的暖白系统,以一道光谱渐变作为唯一品牌色;超细字重显示字 + 磨砂玻璃卡片。主题 light。
colors:
  primary: "#000000"        # Ink Black — 正文/标题/导航/边框/图标,系统里唯一的色彩锚点
  secondary: "#636363"      # Graphite — 正文次级文案、副标题
  tertiary: "#959595"       # Slate — 三级文字、导航标签、元信息
  neutral: "#f8f8f8"        # Canvas — 页面背景
  surface: "#ffffff"        # Snow — 卡片背景(实际以 90% 不透明度 + 磨砂使用)
  on-surface: "#000000"     # 卡片上的文字
  error: "#fa3d1d"          # 取自光谱渐变中的红,仅用于错误/强调微点缀
  muted: "#d9d9d9"          # Pebble — 中性填充按钮底色(克制的反-CTA)
  accent-blue: "#0358f7"    # Signal Blue — 链接/信息高亮(谨慎使用)
typography:
  display:
    fontFamily: ABC Oracle
    fontSize: 72px
    fontWeight: 300
    lineHeight: 1.11
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: ABC Oracle
    fontSize: 54px
    fontWeight: 300
    lineHeight: 1.17
    letterSpacing: -0.04em
  headline-md:
    fontFamily: ABC Oracle
    fontSize: 50px
    fontWeight: 300
    lineHeight: 1.18
    letterSpacing: -0.04em
  headline-sm:
    fontFamily: ABC Oracle
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: -0.02em
  subheading:
    fontFamily: ABC Oracle
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.33
  body-lg:
    fontFamily: ABC Oracle
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5
  body-md:
    fontFamily: ABC Oracle
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: ABC Oracle
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  label-md:
    fontFamily: ABC Oracle
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.5
  caption:
    fontFamily: ABC Oracle
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: 0px
  sm: 10px        # 图片
  md: 16px        # 导航项 / soft fill
  lg: 30px        # 卡片 / 实心按钮
  xl: 40px        # 大容器
  full: 9999px    # 幽灵/胶囊按钮
spacing:
  base: 8px
  xs: 5px
  sm: 10px
  md: 15px
  lg: 20px
  xl: 32px
  gutter: 24px
  margin: 34px
  page-max-width: 1200px
components:
  button-primary:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.lg}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
  button-ghost:
    backgroundColor: "#00000000"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: 10px
  button-soft:
    backgroundColor: "#0000000a"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 12px
  card-frosted:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: 32px
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 12px
  input-field-error:
    textColor: "{colors.error}"
---

# Dia — Prism on White Stationery

> 把一张高级信纸举向清晨暖光:页面几乎全无彩色,却有一道隐藏光谱在渐变迸发中透出。

## Overview

整体观感像「光透过棱镜边缘折射」——近乎无彩的暖白基底上,一道彩虹渐变(粉 → 红 → 琥珀 → 薰衣草 → 蓝)作为唯一的彩色时刻。品牌个性:**克制、轻盈、内容优先**。目标受众:追求专注与高级感的知识工作者。情绪基调:留白、安静、像墨迹在纸上慢慢干透,而非命令式地刻在石头上。当某具体规则未定义时,默认偏向「更轻、更白、更克制」。主题:light。

## Colors

调色板根植于高对比中性色 + 单一惊艳强调色。

- **Ink Black(#000000,`primary`)**:正文、标题、导航、边框、图标——系统中唯一的色彩锚点。
- **Graphite(#636363,`secondary`)**:正文次级文案、副标题。
- **Slate(#959595,`tertiary`)**:三级文字、导航标签、元信息。
- **Canvas(#F8F8F8,`neutral`)**:页面背景,比纯白更柔和、更有机。
- **Snow(#FFFFFF,`surface`)**:卡片背景,实际以 90% 不透明度 + 磨砂使用。
- **光谱渐变(`linear-gradient(90deg, #c679c4, #fa3d1d, #ffb005, #e1e1fe, #0358f7)`)**:品牌的标志性彩色时刻——仅作环境光晕与装饰条,**绝不**用作文字色或按钮填充。其中红 `#fa3d1d` 作 `error` 微点缀。

## Typography

整套系统只用 **ABC Oracle** 一个字族,三个字重(300/400/500)。

- **Display / Headline(50–72px,weight 300)**:超细字重是签名手势——多数 SaaS 用 600+ 做标题,Dia 反其道用 300,使大字像纸上将干的墨迹。display 尺寸用 -0.04em 紧字距把轻盈字形在大号下收住。
- **Body(16–18px,weight 400)**:保证长文可读与当代专业感。
- **Label / Button(14px,weight 500)**:导航、按钮、标签;**全系统不出现 600 以上字重,没有 bold**。

## Layout

桌面端最大宽度 **1200px** 居中,移动端流式。统一以 **8px** 为间距基准(辅以 5px 微步),节奏疏朗(spacious)。区块之间留 80–120px 大间距;卡片内边距 32px;元素间距 15–20px。整页保持同一 Canvas 底色,**不做交替色带**——纵深靠磨砂卡片与渐变光晕,而非分段换色。

## Elevation & Depth

纵深通过**磨砂玻璃层 + 单一柔和阴影**表达,而非堆叠重影:

- 背景 Canvas(#F8F8F8)→ 磨砂卡片(rgba(255,255,255,0.9) + `backdrop-filter: blur(24px)`)→ 内容。
- **全系统唯一阴影**:`rgba(0,0,0,0.08) 0px 0px 8px 0px`,只用于浮起的卡片;禁止任何彩色或多层阴影。

## Shapes

形状语言是**全圆角、无锐角**:

- 卡片 / 实心按钮 = 30px(`rounded.lg`);图片 = 10px(`rounded.sm`);导航项 / soft fill = 16px(`rounded.md`);大容器 = 40px(`rounded.xl`);幽灵 / 标签按钮 = 9999px(`rounded.full`)。
- **任何元素圆角不小于 10px**;同一视图内不混用锐角与圆角。

## Components

- **实心按钮(button-primary)**:底色 #D9D9D9、文字 #000、30px 圆角、ABC Oracle 14–16px weight 500;hover 切到黑底白字。这是刻意的「反-CTA」——按钮保持中性灰,把注意力让给内容。
- **幽灵胶囊按钮(button-ghost)**:透明底、9999px 圆角,靠文字与 hover 表达可点;用于分类 Tab 与次级链接。
- **磨砂卡片(card-frosted)**:rgba(255,255,255,0.9) + blur(24px)、30px 圆角、32px 内边距、唯一阴影,无可见边框;内部标题 #000、正文 #636363。
- **输入框(input-field)**:白底、16px 圆角、12px 内边距;错误态文字用 `error` 红 + 字段下方 inline 提示(input-field-error)。
- **状态四态视觉**:loading = 磨砂卡片同底色的 Skeleton(圆角随所占元素);empty = 居中 display 级细体标题 + #636363 副文 + 中性实心按钮作主行动;error = 卡片内错误占位 + "重试"中性按钮(可点缀 `error` 红);forbidden = 居中锁图标 + 细体标题的 403 占位。

## Do's and Don'ts

- **Do** 光谱渐变只作环境光晕或装饰条,**绝不**用作文字色或按钮填充。
- **Do** 按钮保持中性灰(#D9D9D9)或透明,系统刻意回避彩色 CTA,让焦点留在内容。
- **Do** 卡片与实心按钮统一 30px 圆角,胶囊/Tab 才用 9999px。
- **Do** display 文字(50px+)一律 ABC Oracle weight 300 + -0.04em 字距;weight 500 只用于 ≤16px 的按钮与标签。
- **Do** 浮起表面统一用 `backdrop-filter: blur(24px)` + rgba(255,255,255,0.9) 维持磨砂层次。
- **Do** 正文用 #636363、三级/元信息用 #959595,衬在 #F8F8F8 上。
- **Don't** 把饱和色(红/蓝/粉/黄)用作实心背景或按钮填充——它们只活在渐变里与极少数微点缀。
- **Don't** 任何元素圆角小于 10px;系统没有锐角。
- **Don't** 使用 600 以上字重——全系统没有 bold。
- **Don't** 叠加额外阴影——只保留那一道 8px 模糊阴影,不要彩色/多层阴影。
- **Don't** 在内容区后放深色背景——系统恒为浅色,渐变是唯一的暖/暗元素。
- **Don't** 引入第二款字体——整站只跑一个字族三档字重。
```

---

> 上面三道 `---`(YAML 前言两道 + 文末一道)与代码块仅为本范例的展示边界。真实 `design.md` 落盘时:文件**以 YAML 前言的 `---` 开头**、八章节散文紧随其后,**不要**外层代码块。
> 校验:落盘后跑 `npx @google/design.md lint design.md` 应为 **0 error**(七规则全过),再与 `idea.md` / `interaction.md` 跑交叉校验三矩阵(见 `intake-and-validate.md`)。
