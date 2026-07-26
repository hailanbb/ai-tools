---
name: vibe-prototype
description: >-
  Vibe Coding 流水线第五步:依据 design.md(视觉准则)与 interaction.md,为每个页面在 Stitch 画布生成原型,
  经 stitch-mcp 拉取 HTML 与截图存入 prototypes/,并与交互文档做双向对齐校验。
  当用户说"生成原型""画原型""把交互文档变成原型""接 Stitch / stitch-mcp""每页出设计图"
  "对齐原型和交互文档"
  "prototypes 对不上"
  "配置 Stitch MCP"时使用。
  本 skill 是"半自动":Claude 写 prompt + 引导人工在 Stitch 画布生成,MCP 只负责拉取与校验,不是一句话自动出图。
  反触发(相邻阶段抢入口时主动让路):① 用户还在澄清产品想法 / 没有 idea.md → 交给 vibe-idea;
  ② 已有 idea.md 要细化页面与每个元素的交互逻辑(是弹窗还是跳转)→ 交给 vibe-interaction;
  ③ 还在定技术栈 / 数据库 / 接口 / 系统设计 → 交给 vibe-architecture;
  ④ 还在定视觉设计系统 / 设计准则 / design.md(tokens、组件、Do&Don't)→ 交给 vibe-design;
  ⑤ 要写代码 / 修 bug / 跑测试 / 部署 → 交给 vibe-implement。
  前置依赖 design.md(视觉准则,由 vibe-design 产出)+ interaction.md(由 vibe-interaction 产出)+ architecture.md(由 vibe-architecture 产出,提供数据/接口依据);产物交给 vibe-implement,二者以页面ID 为同一主键对齐。
---

# vibe-prototype — 原型生成与对齐校验

> Vibe Coding 流水线第五环:把 `design.md`(视觉准则)+ `interaction.md` 里写定的每个页面,经 Stitch 画布生成原型并拉回本地,
> 再以三条铁律与交互文档做**双向一一对齐**,全绿才交接 `vibe-implement`。
> SKILL.md 正文承载**方法论与七步流程骨架**;详尽接入排错 / prompt 模板 / manifest 字段 / 校验清单下沉到 `references/`,正文用「详见 references/<file>.md」指向。

## 定位与角色

本 skill 是产物流水线的**第五环**:

- **输入**:
  - `design.md`(④ vibe-design 产出,**视觉准则 / 视觉权威源**,提供 tokens / components / Do&Don't,是原型视觉的权威依据)——Stitch 出图必须符合 design.md;
  - `interaction.md`(② vibe-interaction 产出,逐页面/逐元素的交互定义,提供元素 / 状态,是对齐的锚);
  - `architecture.md`(③ vibe-architecture 产出,技术骨架,提供数据 / 接口依据,只引用不另定义)。
- **输出**:
  - `prototypes/<页面ID>.html` —— **主产物·必需**(Stitch 导出的 HTML + 内联 CSS,是真实原型);
  - `prototypes/<页面ID>.png` —— **可选截图·视觉速览**(即该 HTML 的截图,供快速浏览);
  - `prototypes/manifest.json` —— 页面ID ↔ Stitch screenId ↔ 文件 ↔ 状态的单一事实源;
  - 配套:`prototypes/prompts/<页面ID>.md`(每页生成 prompt)、`prototypes/stitch-design-system.md`(Stitch 设计系统落地位置)。

**本 skill 的灵魂**:把「文档里写的每个页面」与「Stitch 画布里生成的每个 screen」做**双向一一对齐**——一个不漏(文档每页都有原型)、一个不多(每个 screen 都映射回文档页面)、逐元素一致(原型关键元素与 interaction.md 元素清单对得上)、视觉合规(原型符合 design.md 的 tokens / components / Do&Don't)。**只有全绿(全部 `aligned`)才放行到 ⑥ vibe-implement**,任一页不达标就卡门、拒绝声明完成。

页面ID 是贯穿 `architecture.md` / `interaction.md` / `design.md` / `prototypes/` / 最终路由的**同一主键**(可读 kebab slug,如 `login`、`order-list`、`settings-notification`),全程逐字符一致、不做任何改写。

## 关键边界:Stitch 只导出不生成

**`@_davideast/stitch-mcp` 是一个导出 / 拉取型 MCP——它不在 MCP 内生成设计。** 设计在 [Stitch 网页画布](https://stitch.withgoogle.com)(**Gemini** 驱动)里产生。因此必须在与用户交互时**显式声明这条边界**,避免用户误以为「一句话自动出图」。

本 skill 的工作流是**半自动**:

> **Claude 撰写 prompt + 引导人工在画布生成 → MCP 自动拉取回本地 + 自动校验。**

真正的「画」发生在 Stitch 网页画布(人工点选生成),MCP 只做拉取与本地落盘,Claude 做 prompt 合成与对齐校验。**这不是一键出图、不是一句话自动出图。**

这条边界带来**三条连锁影响**,贯穿整套工作流:

1. **半自动,非一键出图**:Claude 负责「写 prompt + 引导人工进画布生成 + 拉取 + 校验」,原型由用户在画布点选生成;启动时就要把这条边界讲清楚,免得用户空等自动出图。
2. **screenId 不可控,靠 manifest 映射**:Stitch 端 `screenId` 自动生成、不可控;页面ID ↔ screenId 的映射记在 `manifest.json` 里,落盘文件名永远用页面ID,**不靠命名碰运气**。
3. **校验有人在环**:对齐校验里的「补齐」「修正」动作多数需要用户**回画布**操作;skill 只能列待办清单、给修正建议、卡放行门,**不能自动补图**。

## 七步工作流总览

| 步 | 工作 | 对应章节 |
|---|---|---|
| 第 0 步 | 前置接入(环境探测 + Stitch MCP 接入)| 见「第 0 步」 |
| 第 1 步 | 从 interaction.md 抽取页面清单(对齐的锚)| 见「第 1 步」 |
| 第 2 步 | 为每页撰写 Stitch 生成 prompt(以 design.md 为视觉权威)| 见「第 2 步」 |
| 第 3 步 | 用 MCP 拉取并按命名规范落盘(HTML 主产物先落)| 见「第 3 步」 |
| 第 4 步 | 维护 manifest(映射与状态台账)| 见「第 4 步」 |
| 第 5 步 | 对齐校验(三铁律 + design.md 视觉合规,本 skill 的灵魂)| 见「第 5 步」 |
| 第 6 步 | design.md(视觉准则)与 Stitch design.md 的协调(注入 shadcn 主题)| 见「第 6 步」 |
| 第 7 步 | 向 vibe-implement 的交接 | 见「第 7 步」 |

## 第 0 步:前置接入(Stitch MCP)

`vibe-prototype` 强依赖 `@_davideast/stitch-mcp`,**出原型前必须先完成接入**,否则本阶段无法运行。

### 先做环境探测

skill 启动时**先探测**,就绪则跳过接入、直接进第 1 步:

1. 检查 `.mcp.json`(项目级)/ `~/.claude.json`(用户级)是否已配置 `stitch` server;
2. 用一个**轻量探针**验证握手:尝试列出可用工具,或对一个已有 project 调一次 `build_site`,确认能列出 stitch 工具且不报鉴权错。

探测**就绪 → 跳过接入**;**未就绪 → 走下列接入流程**。

### 接入流程(四步,逐条引导用户在终端执行)

**① 初始化 + 鉴权**

```bash
npx @_davideast/stitch-mcp init
```

该命令自动处理 OAuth / gcloud 流程。**硬前提**:用户已有一个**已启用计费 + 已启用 Stitch API 的 Google Cloud 项目**(缺一不可,见下文额度提示与 references)。

**② 写 MCP 配置**(推荐写**项目级** `.mcp.json`,随仓库走;或写用户级,二选一):

```json
{
  "mcpServers": {
    "stitch": {
      "command": "npx",
      "args": ["@_davideast/stitch-mcp", "proxy"]
    }
  }
}
```

**③ 三选一鉴权方式**(让用户按自身情况选其一):

- **默认**:已通过 `init` 完成的 Google Cloud 项目 **OAuth**;
- `STITCH_API_KEY` 环境变量:适合 **CI / 无浏览器**环境;
- `STITCH_USE_SYSTEM_GCLOUD=1`:**复用本机 `gcloud auth` 登录态**。

**④ 连接校验**:重启 / 重连 MCP 后,让 Claude **调用一次 stitch 工具**(如对一个已有 project 调 `build_site`,或列出可用工具)确认握手成功。

### 校验失败的处理(4 项回退)

握手失败时,逐项回退检查:① **计费**是否开启 → ② **Stitch API** 是否启用 → ③ `npx` 能否拉到包 → ④ 配置 JSON 是否落在 **Claude Code 实际读取**的路径。逐项排错与三种鉴权方式细节**详见 references/stitch-mcp-setup.md**。

### 额度提示(先全量写好 prompt 再一次性进画布)

上游 Stitch 有约 **350 generations/月**的免费额度,超出可能产生费用或受限。**批量生成前提醒用户**:**先把全部页面的 prompt 写好、确认页面清单无误,再一次性进画布生成**,避免反复试错烧额度。计费 / 额度提示**详见 references/stitch-mcp-setup.md**。

## 第 1 步:从 interaction.md 抽取页面清单

`interaction.md` 是对齐的**锚**。读取它,解析出:

- **页面ID 列表**(全局信息架构 / 站点地图里逐页的 kebab slug);
- **每页的元素清单**:布局区块、关键按钮、弹窗 / 抽屉 / 浮窗 / toast、**跳转目标**(指向哪个页面ID)。

据此在内存中生成一份「**期望页面表**」:

```
页面ID → 元素清单 → 跳转目标
```

这张「期望页面表」就是后续第 5 步对齐校验的左侧基准(右侧是从 Stitch 拉回的「实际页面表」)。

**页面ID 是整条流水线的主键**,**必须与 interaction.md 中的页面ID 逐字符一致**——同一个 kebab slug,不缩写、不大小写改写、不加前缀(示例:`login`、`order-detail`、`settings-notification`)。这个 ID 后续直接用作落盘文件名 `prototypes/<页面ID>.html`,也用作 manifest 主键与最终路由,全程同一主键;它同样与 `design.md`(视觉准则)中按页面/组件给出的视觉规范、与 `architecture.md` 中的实体/接口对应同一主键。

## 第 2 步:为每页撰写 Stitch 生成 prompt

因为 MCP 不生成、画布才生成,本 skill 的**核心产出之一是为每个页面合成一段高质量的 Stitch prompt**。每页一段,写入 `prototypes/prompts/<页面ID>.md`,供用户**复制进 Stitch 画布**生成。每段 prompt 由 Claude 依据 `design.md`(视觉权威)+ `interaction.md`(元素/状态)合成(数据/接口依据见 `architecture.md`),结构**固定为七要素**:

1. **页面标题与用途** —— 取自 interaction.md 的页面定位(这页是什么、给谁用、解决什么);
2. **设计系统约束(视觉权威)** —— **取自 design.md(视觉准则)**:tokens(主色 / 辅色、字体家族、圆角、间距基准、Elevation / Shapes)、components(组件规范)、Do&Don't;原型视觉**必须符合 design.md**,让 Stitch 视觉严格贴合既定 tokens / components;
3. **shadcn / Radix 美学对齐(强制写入每段 prompt)** —— 见下「美学要求四点」;
4. **布局描述** —— 顶 / 侧 / 内容 / 底各区块,栅格结构;
5. **关键元素逐条列举** —— 每个按钮、输入框、列表项,以及其**文案**;
6. **交互态提示** —— 哪些元素点击后是弹窗 / 全屏跳转 / 浮窗 / 侧滑抽屉 / toast;尽量在静态原型里以「展开态 / 弹窗态」表达,或**拆成 `<页面ID>` 与 `<页面ID>--<子态名>` 两张图**;
7. **空态 / 加载态 / 错误态** —— 若 interaction.md 标注了页面级四态,则要求一并出图。

### shadcn / Radix 美学要求(强制写入每段 prompt)

在第 ③ 要素「设计系统约束」里,**每段 prompt 都必须明确写入**「设计系统贴近 shadcn / Radix 美学」,落地为四点:

- **中性色板**:以 **neutral/slate 基调**为主,克制使用强调色;
- **克制圆角**:统一一个 radius,不夸张、不到处不同;
- **清晰的层级与对比**:信息层级分明、文本对比充足;
- **systemic spacing**:基于统一间距刻度的留白,而非随手填值。

**目的**:让 Stitch 原型从一开始就接近最终 shadcn 实现的视觉语言,最大限度减少「原型一套风格、代码另一套风格」带来的视觉改写成本。

### 引导用户在画布生成

引导用户:在 Stitch **同一个 project** 下**逐页生成 screens**,并让 **screen 命名尽量带上页面ID**,便于第 3/4 步映射回页面ID。

完整 prompt 固定结构模板与一个填好的范例(`order-list` 订单列表页)**详见 references/prompt-template.md**。

## 第 3 步:拉取并按命名规范落盘

用户在画布生成完一批 screens 后,Claude 用 MCP 工具拉取。**先取 HTML 主产物落盘,再取截图作视觉速览**(顺序明确:HTML 是真实原型、必需;PNG 只是该 HTML 的截图、可选)。

### MCP 工具用法(三条)

- `build_site` —— 把该 project 的所有 screens 映射到路由,**拿到 screen 清单(screenId ↔ 页面)与每页设计 HTML**,作为「**实际页面表**」的来源(第 5 步对齐的右侧基准);
- `get_screen_code(screenId)` —— 取每页 **HTML**(Stitch 真实产物:HTML + 内联 CSS),存为 `prototypes/<页面ID>.html`(**主产物·必需**);
- `get_screen_image(screenId)` —— 取每页**截图**(base64),解码后存为 `prototypes/<页面ID>.png`(**可选截图·视觉速览**,即上述 HTML 的截图)。

### 命名规范(强制)

- 落盘文件名 = `interaction.md` 的页面ID(kebab slug,如 `order-list`、`order-detail`),**逐字符一致**直接用作 `prototypes/<页面ID>.html`,**不做任何改写**;
- 弹窗 / 抽屉等子态用 `<页面ID>--<子态名>`(**双连字符 `--` 分隔**),如 `order-list--filter-drawer`;
- Stitch 那边的 `screenId` 由 Stitch 生成、**不可控**,因此**映射关系记在 manifest 里**,而不是靠文件名碰运气。

## 第 4 步:维护 manifest

`prototypes/manifest.json` 是**页面ID、screenId、文件、状态的单一事实源**(`html` 必需、`png` 可选)。每拉取 / 校验一页,就更新该页在 manifest 中的记录。

```json
{
  "source": { "design": "design.md", "interaction": "interaction.md", "architecture": "architecture.md" },
  "stitchProjectId": "<project-id>",
  "pages": [
    {
      "pageId": "order-detail",
      "screenId": "scr_3f9a...",
      "html": "prototypes/order-detail.html",
      "png": "prototypes/order-detail.png",
      "prompt": "prototypes/prompts/order-detail.md",
      "subStates": ["order-detail--cancel-dialog"],
      "status": "aligned",
      "lastPulled": "2026-06-01T11:30:00Z"
    }
  ]
}
```

### status 六态

| status | 含义 |
|---|---|
| `pending` | 已写 prompt,**未生成**(画布里还没有这页) |
| `generated` | 画布**已生成**,**未拉取**到本地 |
| `pulled` | 已落盘,**未校验** |
| `aligned` | **校验通过**(三铁律全过,放行候选) |
| `mismatch` | 校验有**差异**(元素对不上,见第 5 步) |
| `orphan` | 原型**多余**,文档里无此页(映射不回任何页面ID) |

manifest.json 完整字段定义与 status 状态机流转**详见 references/manifest-schema.md**。

## 第 5 步:对齐校验(本 skill 的灵魂)

Claude **逐条跑三条铁律 + 一道视觉合规校验**,产出一张**对齐报告**——**直接打印给用户看,不写 .md 报告文件**。校验把第 1 步的「期望页面表」(来自 interaction.md)与第 3 步的「实际页面表」(来自 Stitch / manifest)做双向比对,并逐页核对原型是否符合 `design.md`(视觉准则)。

### 三条铁律

1. **无遗漏**:interaction.md 里**每个页面ID** 都能在 manifest 中找到一条 `status=aligned` 的记录。缺失 → 该页标 `pending` / `generated`,**列出待生成清单**,让用户回画布补齐。
2. **无多余**:manifest / Stitch project 里**每个 screen** 都能映射回一个页面ID。映射不上 → 标 `orphan`,提示用户:要么它对应 interaction.md 漏写的页面(回第 1 步补文档),要么是废弃 screen(从 project 删除或忽略)。
3. **元素一致**:对每页,把 interaction.md 的元素清单与原型 HTML 里的**关键元素(按钮文案、输入项、列表、弹窗触发点)逐项比对**。差异 → 标 `mismatch`,**逐条列出**「文档有 / 原型无」和「原型有 / 文档无」。

### 视觉合规:design.md(视觉准则)↔ prototypes/

在三条铁律之外,**每页原型还必须符合 `design.md`(视觉准则)**:

- **tokens 合规**:原型用的主色 / 辅色、字体家族、圆角、间距、Elevation / Shapes 与 design.md 的 token 前言一致;
- **components 合规**:卡片 / 按钮 / 表单等组件观感符合 design.md 的 Components 规范;
- **Do&Don't 合规**:不触犯 design.md 的 Don't 条款,落实其 Do 条款。

偏离 → 视为视觉不一致,走第 6 步,**以 design.md(视觉准则)为准**修正(改 prompt 重生成 / 把 token 注入 shadcn 主题),不达标不放行。

### 不一致处理原则(双向,用户拍板,skill 给建议)

对齐是**双向**的,谁对谁错由**用户拍板**,但 skill 给出明确建议方向:

- **文档有、原型无**:多半是 prompt 没覆盖到 → **修 prompt 重生成**;
- **原型有、文档无**:可能是设计阶段想到了新交互 → **回指第 1 步更新 interaction.md**(保持文档为权威主线),再重新校验;
- **视觉风格偏离 design.md(视觉准则)tokens / components / Do&Don't**:走第 6 步,**以 design.md(视觉准则)为准**修正或反哺。

### 放行门(只在全绿时放行)

**校验只在全绿(全部页面 `status=aligned`,且逐页符合 design.md 视觉准则)时才放行**到 ⑥ vibe-implement。**任一页非 `aligned` 或视觉不合规,skill 拒绝声明完成**,并明确告知用户**卡在哪一页、卡在哪条铁律或哪条视觉准则**。

三条铁律的逐项检查表、design.md 视觉合规检查与不一致处理决策树**详见 references/alignment-checklist.md**。

## 第 6 步:design.md(视觉准则)与 Stitch design.md 的协调

本套件 ④ vibe-design 产出的 `design.md`(视觉准则)与 Stitch 画布自动生成的 `design.md` **同名但不同物,绝不能互相覆盖**:

| | 本套件 ④ 的 `design.md`(视觉准则) | Stitch 自带的 `design.md` |
|---|---|---|
| 产生方 | `vibe-design`(本流水线,视觉) | Stitch 画布(Gemini)自动生成 |
| 内容 | tokens(颜色 / 字体 / 间距 / Elevation / Shapes)、Components、Do&Don't 等**视觉设计系统(视觉准则)** | 颜色 / 字体 / 间距 / 组件等**设计系统(design tokens)** |
| 角色 | 视觉主线、**视觉权威源** | 视觉素材、**tokens 供给(待并入或被覆盖)** |

> 注:技术骨架(技术栈、数据库、接口、前后端架构)在 `architecture.md`(由 ③ vibe-architecture 产出),不在此协调范围;本步只协调视觉 tokens。

### 协调三策略(本 skill 负责落地)

**① 比对反哺(落位 + tokens 比对)**

Stitch 的 `design.md` **不放仓库根冒名顶替**,而是落到 `prototypes/stitch-design-system.md`。然后把它里面的 color / typography / spacing tokens 抽出来,与 ④ 的 design.md(视觉准则)的 token 前言 / Colors / Typography / Layout 章节比对:

- ④ **尚未固化**某项 token → 把 Stitch tokens **规范化后并入** ④ 的 design.md(作为视觉准则的 design tokens 来源,反哺 ⑥);
- ④ **已有且冲突** → **以 ④ design.md(视觉准则)为准**,据此修正 prompt 重新生成,保证最终原型视觉与视觉准则一致。

**② 注入 shadcn 主题(tokens 单一来源)**

比对反哺的落地方式是:把规范化后的 tokens **注入 shadcn 的主题层**,使「原型视觉 = design.md 视觉准则 = shadcn 主题」成为**单一来源**:

- 写入 `globals.css` 的 **CSS variables**(`:root` 与 `.dark` 下的 `--background`、`--primary`、`--radius` 等);
- 写入 `tailwind.config` 的 **theme 扩展**。

由此 prototype ↔ 代码视觉一致;variant 体系全部引用这套 token,自动获得正确视觉,无需在组件或页面里二次染色。

**③ 单向引用(杜绝漂移)**

在 `prototypes/manifest.json` 的 `source` 与 ④ 的 design.md(视觉准则)中**互留指针**(design.md 注明「Stitch 原始 tokens 见 prototypes/stitch-design-system.md / 已并入本视觉准则」),保证交给 ⑥ 的视觉 tokens **只有一处权威源(design.md 视觉准则)**,杜绝「原型一套色、代码另一套色」。

## 第 7 步:向 vibe-implement 的交接

**交接靠产物文件,无自动编排**(本套件无自动编排器)。校验全绿后,向用户输出一段**交接说明**(供其手动调用 ⑥ vibe-implement 时带上),固定包含:

- **产物清单**:`prototypes/<页面ID>.html`(主产物)、`prototypes/<页面ID>.png`(可选截图)、`prototypes/manifest.json`、`prototypes/prompts/`;
- **对齐契约**:**页面ID 是贯穿 architecture.md / interaction.md / design.md(视觉准则)/ prototypes / 最终路由的同一主键**;⑥ 实现每个页面时,**必须同时打开「该页面ID 的 interaction.md 片段 + design.md 视觉规范 + `.html`(附 `.png` 截图速览)」**作为实现依据,数据 / 接口依据查 architecture.md,且实现完成后**回比这些产物**(⑥ 的对齐门正是检查「代码 ↔ architecture.md + interaction.md + design.md(视觉准则)+ prototypes/」);
- **HTML 复用提示**:Stitch 导出的 `.html`(HTML + 内联 CSS,及其可导出的 React 代码 / Figma)是原型主产物,可作为 ⑥ 的**结构 / 样式起点**,但**需按本项目技术栈改写、不可直接当生产代码**;`.png` 仅作视觉速览;
- **manifest 作为待实现 checklist**:⑥ 可遍历 `pages[]` 确认每页都已实现。
