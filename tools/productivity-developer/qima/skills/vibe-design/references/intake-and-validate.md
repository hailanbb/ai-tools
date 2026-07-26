# 承接视觉来源 · 结构化 · 校验(操作手册)

> 本文件是 `vibe-design` 三步方法论(承接 → 结构化 → 校验)的**逐步操作手册**。SKILL.md 正文给方法论骨架,本文件给可照做的步骤、CLI 用法与交叉校验矩阵。
> 总原则:**本 skill 不发明视觉**。所有 token 值必须来自用户提供的来源或用户确认的口述;信息不足就追问补齐,绝不占位、不猜测。

## 第一步 · 承接(intake):六类视觉来源的处理步骤

进场先问用户:「你的视觉来源是什么?」据答案落到下列六类之一(可叠加):

### A. Figma 截图 → 抽 token

1. 让用户提供 Figma 截图或可访问的 Figma 链接截图(必要时多张:主页、组件页、配色页)。
2. **取色**:从图中吸取关键色,记录 hex(sRGB),并请用户确认哪个是 `primary` / `secondary` / `tertiary` / `neutral` / `surface` / `error`。
3. **量字**:辨认标题/正文/标签各级的字体家族、字号、字重、行高、字间距,落成 `typography` 各级。
4. **识形**:辨认圆角值(按钮/卡片/输入)落 `rounded`;辨认间距节奏(8px? 4px 半步?)落 `spacing`。
5. **辨组件**:辨认按钮/输入/卡片/标签等原子的背景色、文字色、圆角、内边距,落 `components`。
6. 无法从图中确定的值(如 hover 态、暗色主题)→ **追问用户**,不臆造。

### B. 网站 URL → 抽取

1. 拿到用户给的线上站点地址。
2. 抽取该站视觉:配色、字体家族、圆角、间距、组件风格,落成 tokens。
3. 可借助 awesome-design-md / Style Reference 类工具先产出**富格式** Style Reference(含 Colors/Typography/Spacing/Components/Do&Don't/CSS variables 等),再**浓缩**为本套件 spec 合规的 `design.md`(YAML 前言 + 八章节)。
4. 富格式里的扩展块(Surfaces / Gradient System / Motion / Imagery / Similar Brands / Agent Prompt Guide 等)按需收敛进对应八章节或作为「未知章节」保留(spec 允许未知章节,见 design-md-format.md 第六节),但**八章节顺序不可乱**。

### C. 现有 DESIGN.md → 校验补全

1. 用户已有一份 DESIGN.md / Style Reference 时,**不从零重写**。
2. 先跑 lint(见下「第三步」),定位缺失/不合规处。
3. 逐项补全:缺 `colors.primary` 就补主色;缺章节就按顺序插入;`broken-ref` 就修引用;章节顺序错就重排。
4. 保留用户原有 token 值与散文,仅做合规化与补缺,改动前向用户复述「将补哪些、改哪些」。

### D. 设计稿图片 → 取色/量字/辨形

同 A(Figma 截图)的取色、量字、识形、辨组件流程;来源是任意视觉参考图(海报、界面、品牌图)。多图时优先以**界面截图**定 tokens,以**品牌图**定 Overview 调性。

### E. 口述风格 → 引导补齐

用户只给文字调性(「想要科技感、暗色、克制」)时,**引导式追问**直到信息足以填满 tokens 与八章节:

- 主题:亮 / 暗 / 双主题?
- 主色?是否有强调色?中性色基调(neutral/slate/warm gray)?
- 字体家族?标题与正文是否分家?字重范围?
- 圆角:硬朗(≤4px)还是柔和(≥12px)?统一一档还是分级?
- 密度:密集还是留白(spacious)?间距基准(8px / 4px)?
- 层级表达:阴影?色调层?边框?
- 关键组件风格:按钮实心/描边/幽灵?CTA 是否克制?

追问到位后落 tokens,并把每条确认回读给用户。

### F. 参考站点 → 借鉴而非照搬

「做成像 X 那样」时,把 X 当 URL / 截图来源(走 B / D),但**提醒用户这是借鉴而非照搬**,需落成自有 tokens、避免直接抄袭其品牌资产。

## 第二步 · 结构化:产出 spec 合规的 design.md

1. **先写 YAML 前言**(token 是规范值):依次填 `colors`(`primary` 必填)、`typography`(9–15 级)、`rounded`、`spacing`、`components`(组件原子,值可用 `{path.to.token}` 引用)。类型与 schema 见 `design-md-format.md` 第二、三节。
2. **再写八章节散文**,**严格按顺序**:Overview → Colors → Typography → Layout → Elevation & Depth → Shapes → Components → Do's and Don'ts。每章用途见 `design-md-format.md` 第四节。
3. **散文 ↔ token 对应**:散文用描述性色名(如 "Ink Black"),与 token 名(如 `primary`)对应;token 是规范值,散文给应用语境。
4. 落盘到项目根,固定名 `design.md`。
5. 完整可复制范例见 `example-style-reference.md`。

## 第三步 · 校验:lint CLI + 交叉校验矩阵

### A. spec 合规校验(lint CLI 用法)

```bash
# 在项目根运行
npx @google/design.md lint design.md
```

读输出,逐条消解七规则报错(规则含义见 `design-md-format.md` 第七节):

| 报错 | 处理 |
|---|---|
| `broken-ref` | 修正 `{path}` 引用,使其指向真实存在的 token |
| `missing-primary` | 补 `colors.primary` |
| `contrast-ratio` | 调整文本/背景色直至 ≥ 4.5:1(正文)/ ≥ 3:1(大字/图形),或改用满足对比的 token 组合 |
| `orphaned-tokens` | 让该 token 被某处引用,或删除多余 token |
| `token-summary` | 信息性,核对各组 token 数量是否符合预期 |
| `missing-sections` | 按顺序补齐缺失的必需章节 |
| `missing-typography` | 至少定义一组 typography token |
| `section-order` | 把八章节重排为规定顺序 |

**门槛:0 error**;warning 逐条确认可接受。

可选导出(供下游):`css-tailwind`(→ shadcn 主题层 / `globals.css`)、`dtcg`(→ `tokens.json` / Figma)。见 `design-md-format.md` 第八节。

### B. 交叉校验矩阵(与 idea.md / interaction.md 对账)

`design.md` 是视觉真相,必须覆盖产品的**每个页面、每个可交互元素、每个状态**。打开 `idea.md` 与 `interaction.md`,逐行对账下面三张矩阵;凡「有需求、无视觉规范」一律**标红列出**,补齐后**重跑 lint + 重对账**。

**矩阵 1 · 页面 × 视觉规范**(来源:`idea.md` 页面全集 + `interaction.md` 站点地图)

| 页面ID | 有布局规范? | 有配色/字体支撑? | 有所需组件 token? | 缺口 |
|---|---|---|---|---|
| `<page-slug>` | ✅/❌ | ✅/❌ | ✅/❌ | <标红列出> |

判定:每个页面都能在 `design.md`(Layout 章节 + components + colors/typography)找到支撑视觉,**无遗漏页面**。

**矩阵 2 · 可交互元素 × 组件 token**(来源:`interaction.md` 各页元素清单 + 模板 D 元素规格)

| 元素ID | 元素类型 | 对应 components token / 组件章节条目 | 多状态(hover/pressed/disabled/loading)是否有视觉? | 缺口 |
|---|---|---|---|---|
| `<page-slug>-E-A-01` | button | `button-primary` / `button-primary-hover` … | ✅/❌ | <标红列出> |
| `<page-slug>-E-A-02` | input | `input-field` / `input-field-error` … | ✅/❌ | <标红列出> |

判定:每个可交互元素在 `design.md` 的 `components`(含变体)或 Components 章节都有视觉定义,**无裸元素**;`interaction.md` 标注的多状态都有对应视觉变体。

**矩阵 3 · 四态 × 状态视觉**(来源:`interaction.md` 每页页面级/块级状态矩阵)

| 状态 | 是否有视觉规范 | 视觉落点(token / 章节) | 缺口 |
|---|---|---|---|
| loading | ✅/❌ | 骨架屏 Skeleton 样式(色/圆角/动效)| <标红列出> |
| empty | ✅/❌ | 空态插画 + 文案排版 + 主行动按钮样式 | <标红列出> |
| error | ✅/❌ | 错误占位样式 + 重试按钮样式(可含 error 色)| <标红列出> |
| forbidden | ✅/❌ | 403 占位 / 重定向落地的视觉 | <标红列出> |

判定:`interaction.md` 每页的 loading / empty / error / forbidden 四态(及扩展态 partial/offline/stale/optimistic 若有)都有对应视觉规范,**缺一不可**。

### C. 回填与闭环

- 交叉校验中新发现的视觉需求(某元素缺组件 token、某状态缺样式)→ **就地补进 `design.md`** 的对应 token / 章节,**重跑 lint**,**重对账三矩阵**,直到三张矩阵无任何标红。
- 若发现 `idea.md` / `interaction.md` 本身缺页面/缺元素/缺状态(即视觉无处对账是因为上游漏写)→ **回指上游 skill 补文档**(`vibe-idea` / `vibe-interaction`),而非在 `design.md` 里替它们补,保持各文档为各自权威主线。
- 三矩阵全绿 + lint 0 error + 用户确认 → 进入 SKILL.md 「向 vibe-prototype 的交接」。
