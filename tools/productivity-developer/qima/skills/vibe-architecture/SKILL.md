---
name: vibe-architecture
description: >-
  Vibe Coding 流水线第三步:技术骨架。以 idea.md + interaction.md 为输入,只产出 architecture.md(技术骨架 / 技术设计 / 数据模型 / 接口 / 架构),
  从 interaction.md 的数据需求【派生】数据模型与接口,描述「系统能提供什么数据与能力」,并为每个接口/字段标注服务于 interaction 的哪个页面/元素/动作。本套件技术栈不是每次重新选型,而是一条固定的
  铁律基线 —— Next.js(App Router)+ 腾讯云开发 CloudBase + shadcn/ui;因此本 skill 的工作重心是「在铁律基线之上
  做项目级适配」(选关系型还是文档型库、要不要云托管 SSR、用哪种鉴权、是否实时订阅、Agent 框架组合、状态管理分工),
  而非每次重新选型。当用户说"技术骨架 / 技术设计 / 技术方案 / 选技术栈 / 技术栈 / 数据库设计 / 建数据库 / 接口设计 / API 设计 /
  前后端架构 / 后端架构 / 系统设计 / 出技术骨架 / architecture.md / 我有了 interaction.md 接下来怎么设计接口"等,要把交互文档的数据需求落成
  技术骨架时,必须使用本 skill。它产出数据库设计(含行级安全规则 security rules)、接口三形态分工、前后端架构与
  architecture.md ↔ interaction.md 确定式全覆盖对齐矩阵。
  反触发(避免与相邻阶段抢入口,相邻阶段抢入口时主动让路):
  ① 还在澄清产品想法 / 没有 idea.md → 交给 vibe-idea;
  ② 还没有 interaction.md(页面/元素/数据需求未定)→ 交给 vibe-interaction;
  ③ 要定视觉设计准则 / 设计系统 / design tokens / 颜色字体排版 / design.md(视觉) → 交给 vibe-design(视觉设计准则);
  ④ 要画原型 / 接 Stitch → 交给 vibe-prototype;
  ⑤ 要写代码 / 修 bug / 跑测试 → 交给 vibe-implement。
  前置依赖 idea.md(由 vibe-idea 产出)+ interaction.md(由 vibe-interaction 产出);产物 architecture.md 交给 vibe-design,与 interaction.md 双向对齐。
---

# vibe-architecture — 技术设计

## 定位

- **流水线位置**:Vibe Coding 产物流水线的**第 3 环**(全流水线共 6 环,顺序固定):`idea.md(vibe-idea)→ interaction.md(vibe-interaction)→ architecture.md(vibe-architecture)→ design.md 视觉准则(vibe-design)→ prototypes/(vibe-prototype)→ 代码(vibe-implement)`。本 skill 上游承接 `vibe-idea` 产出的 `idea.md` 与 `vibe-interaction` 产出的 `interaction.md`,**照 `interaction.md` 的数据需求派生**数据模型与接口、产出 `architecture.md`,下游交给 `vibe-design`。
  - **流水线表**:

    | 环 | skill | 产物 | 职责 |
    |----|-------|------|------|
    | 1 | vibe-idea | `idea.md` | 产品立项(AI 生成) |
    | 2 | vibe-interaction | `interaction.md` | 交互文档 / 第一份 UI 文档,首次定义 页面/模块/元素 ID 与各页数据需求(AI 生成) |
    | **3(本 skill)** | **vibe-architecture** | **`architecture.md`** | **照 interaction.md 数据需求派生 技术骨架 / 数据模型 / 接口 / 架构(AI 生成)** |
    | 4 | vibe-design | `design.md` | 视觉设计准则 / 视觉设计系统(用户提供 + skill 承接·结构化·校验) |
    | 5 | vibe-prototype | `prototypes/` | Stitch 按 `design.md`(视觉准则)+ `interaction.md` 出每页原型(半自动) |
    | 6 | vibe-implement | 代码 | 实现并部署 |

  - **命名提醒**:本套件中「`design.md` = 视觉设计准则」「`vibe-design` = 视觉设计 skill」;本 skill 产出的技术骨架文件名是 `architecture.md`(非 `design.md`),本 skill 名是 `vibe-architecture`(非 `vibe-design`)。
- **类型 = 新写(独立方法论)**:本 skill **不薄封装任何 superpowers skill**,不调用 brainstorming / writing-plans;它拥有自己的技术设计方法论。这是与 `vibe-idea`(薄封装 brainstorming)、`vibe-implement`(薄封装实现链)的关键区别——务必不要误把本 skill 当成某个 superpowers skill 的包装层。
- **职责**:**照 `interaction.md` 的数据需求派生**出**技术骨架** `architecture.md`,描述「系统能提供什么数据与能力」(技术栈、CloudBase 资源、数据模型、接口契约、前后端架构、对齐矩阵)。`interaction.md` 已先到位并以功能化方式写明每页「要展示什么数据(读)/这次点击写什么(写)」;本 skill 据此**定义接口 ID 与数据模型**,并为每个接口与可见字段标注「**服务于 `interaction.md` 的哪个页面/元素/动作**」。二者**互为镜像、双向可追溯**:`interaction.md` 出现的每个数据展示位与每次写入,都能在 `architecture.md` 找到对应接口与字段;`architecture.md` 定义的每个接口与可见字段,都能说明服务于哪个页面元素。**architecture 是接口 ID 的唯一定义方**(`interaction.md` 不写接口 ID,只写功能化数据需求)。
- **不产出 interaction.md**:`interaction.md` 是 `vibe-interaction` 的职责且**已先于本 skill 存在**;本 skill 不改写页面/元素交互,只**据其数据需求派生**「技术栈 + 数据模型 + 接口契约」。

## 何时触发 / 何时不触发

**正向触发(应使用本 skill):**
- 用户已有 `idea.md` + `interaction.md`,要进入技术设计阶段:照 `interaction.md` 的数据需求派生数据模型与接口,谈技术栈/技术方案、数据库设计、接口/API 设计、前后端架构、后端架构、系统设计、出技术骨架、要写 `architecture.md`。
- 用户问「我有了 interaction.md 接下来怎么设计接口」「这些页面的数据需求该怎么建库」「这些读写要分成哪些接口」「前后端怎么搭」。

**反触发(不使用本 skill,相邻阶段抢入口时主动让路):**
- ① 还在澄清产品想法 / 没有 `idea.md` → 交给 **vibe-idea**(先把想法逼问、拔高、收敛成可设计的立项文档)。
- ② 还没有 `interaction.md`(页面/模块/元素 ID 与各页数据需求未定义)→ 交给 **vibe-interaction**;`interaction.md` 是本 skill 派生数据模型与接口的依据,缺它则无从派生。
- ③ 要定**视觉设计准则 / 视觉设计系统**(design tokens、颜色、字体、排版、组件、Do&Don't,即视觉义的 `design.md`)→ 交给 **vibe-design**(视觉设计准则;注意此处 `design.md`、`vibe-design` 均指视觉义,与本 skill 的技术骨架 `architecture.md` 无关)。
- ④ 要画原型 / 出设计图 / 接 Stitch → 交给 **vibe-prototype**。
- ⑤ 要写代码 / 修 bug / 跑测试 → 交给 **vibe-implement**。

## 输入与输出

- **输入** = `idea.md` + `interaction.md`(均项目根目录,固定名;分别由 `vibe-idea` / `vibe-interaction` 产出)。本 skill 以二者为前置依赖:起步前先回读 `idea.md` 的 MVP 边界、约束(平台/合规/非功能)、AI 时代产品定位与风险清单;再**逐页逐元素回读 `interaction.md` 的数据需求**(每页要展示什么数据=读、每次点击写什么=写、各页四态/错误态的功能化条件),这是派生数据模型与接口的**直接依据**。
- **唯一产物** = `architecture.md`(项目根目录,固定名)。与 `idea.md`、`interaction.md`、`prototypes/` 并列于项目根,以稳定相对路径互指。
- **不产出** `interaction.md`(那是 `vibe-interaction` 的职责,且已先于本 skill 存在)。本 skill 照 `interaction.md` 的数据需求**派生**技术栈 + 数据模型 + 接口契约,并**定义接口 ID**(`interaction.md` 不写接口 ID),为每个接口/字段回指它服务于 `interaction.md` 的哪个页面/元素/动作。

## 与 idea.md / interaction.md 的对齐总则

对齐是整套 skill 的灵魂。本 skill 涉及两条对齐线(注意:**`interaction.md` 已先于本 skill 存在**,本 skill 是「据其需求派生、并回指它」,而非「先产出技术骨架等它来引用」):

1. **idea.md → architecture.md(上游产品对齐)**:`architecture.md` 的**每一项技术决策都应可回溯到 `idea.md` 的某节**(尤其 MVP 边界与约束)——项目级选型决策表的「依据」列即承载此回溯。
2. **interaction.md → architecture.md(派生对齐,核心)**:`vibe-interaction` 已先产出 `interaction.md`,逐页以功能化方式写明数据需求(展示什么数据=读、点击写什么=写、四态/错误态的功能化条件)。`vibe-architecture` **照这些数据需求派生**数据模型与接口,并**定义接口 ID**(`interaction.md` 不写接口 ID)。约束:
   - `interaction.md` 中每一处「展示数据」必派生出读接口产出该字段,每一处「写入/状态变更」必派生出写接口;
   - `architecture.md` 中每个接口与每个可见字段,都要标注**服务于 `interaction.md` 的哪个页面/元素/动作**(回指);
   - `interaction.md` 的功能化错误态条件(网络超时 / 401 未登录 / 403 无权限 / 5xx 致命 / 返回空集…),由 `architecture.md` **据此定义具体错误码**并回指对应页面元素;
   - 因 `interaction.md` 已存在,第 8 章对齐矩阵是**确定式全覆盖**——逐条覆盖 `interaction.md` 的每个数据展示(读接口)、每个写入(写接口)、每条数据(security rules),证明无缺口;任何缺口在第 8 章「对齐矩阵」中**标红**,任一缺口未闭合则设计不算完成。
3. **下游阶段(`design.md` 视觉准则 / prototypes / 代码)的对齐**由 `vibe-design`(视觉)/ `vibe-prototype` / `vibe-implement` 另行校验,不在本 skill 职责内。

**回填裁决方向(上游为权威主线):`idea.md` > `interaction.md` > `architecture.md`。** 派生时若发现 `interaction.md` 的需求**歧义 / 不可行 / 自相矛盾**,本 skill **不自行编造需求**,而是**回指 `interaction.md`(或更上游的 `idea.md`)澄清/修订**,待上游更新后再据新版本派生。「下游有(原型/代码)、文档无」→ 回指上游补文档;「文档有、下游无」→ 在下游补齐。任何裁决都由用户拍板,skill 给出建议并**记录处理结论**。

## 全局 ID 规范(本 skill 负责定义接口 ID)

沿用套件全局 ID 规范,贯穿 `architecture.md` / `interaction.md` / `prototypes/` / 路由 / 验收项,为同一主键:

- **页面 ID** = 可读 kebab-case slug(如 `login`、`order-list`、`order-detail`),**由 `interaction.md` 首次定义**(它是第一份 UI 文档),本身即全程唯一主键;本 skill 引用它做回指。
- **模块 ID** = `<页面ID>-M-<字母>`(如 `order-list-M-A`),**由 `interaction.md` 首次定义**;本 skill 引用。
- **可交互元素 ID** = `<页面ID>-E-<字母>-<序号>`(如 `order-list-E-A-01`),**由 `interaction.md` 首次定义**;本 skill 引用,作为接口/字段回指目标。
- **接口 ID** = `API-<域>-<动作>`(如 `API-ORDER-LIST`)。**接口 ID 在 `architecture.md` 中定义**——本 skill 是接口 ID 的**唯一定义方**;`interaction.md` 不写接口 ID(只写功能化数据需求),本 skill 据其需求派生并定义接口 ID,再为每个接口标注它服务于 `interaction.md` 的哪个页面/元素/动作。
- **全文件 ID 唯一**;跳转关系、入口出口、对齐互指一律用 ID 互指,不用自然语言指代。

## 技术栈铁律基线(不偏离)

本套件的技术栈是一条**固定的铁律基线**,不是待决变量。`vibe-architecture` **不对基线重新选型、不逐项论证「为什么是它」**;想偏离基线 = 「换套件」而非「换参数」,须先在 `idea.md` 层与用户确认,默认不开放。五条基线:

| # | 维度 | 锁定方案 | 说明 |
|---|------|----------|------|
| ① | 全栈框架 | **Next.js(App Router)** | 唯一全栈框架。全程用 App Router 范式:Server/Client Components + Route Handlers + Server Actions;不再考虑 CRA/Vite SPA、纯后端分离等替代形态。 |
| ② | 后端 / BaaS | **腾讯云开发 CloudBase** | 唯一后端平台,AI-Native 全栈 Serverless;统一承载云数据库、云函数、云托管(CloudBase Run 承载 Next.js SSR)、静态托管、身份认证、云存储。`vibe-implement` 阶段经 **CloudBase MCP(`@cloudbase/cloudbase-mcp`,亦称 CloudBase AI ToolKit)** 直接建库/部署/配置 CDN/域名,无需手工控制台操作。 |
| ③ | UI 体系 | **shadcn/ui(Radix UI + Tailwind CSS + cva)** | 组件落在 `components/ui`,所有视觉走 Tailwind theme + CSS variables 单一来源;不另起 UI 库(组件变体体系铁律见下文「前端架构方法论」)。 |
| ④ | Agent 层(产品涉及 LLM/agent 时) | **按判据选 Vercel AI SDK / Claude Agent SDK / 二者组合** | 仅当 `idea.md` 表明产品含 LLM/agent 能力时启用;否则本层不存在,项目级决策填「无」。判据见下文「Agent 框架选型判据」。 |
| ⑤ | Chat / AI 界面 | **Generative UI** | AI 按用户意图从一套 shadcn 组件 kit 里决定渲染哪个组件。落地见下文「Generative UI」。 |

**CloudBase 资源映射速记**(`vibe-implement` 经 MCP 落地这些资源,详见 [references/cloudbase.md](references/cloudbase.md)):
- **数据库** = PostgreSQL 关系型 **或** 文档型(均支持实时订阅、备份恢复、行级安全规则 security rules 做权限);
- **计算** = 云函数(serverless,HTTP/事件触发,多语言)+ 云托管 / CloudBase Run(容器托管,自动扩缩、灰度发布;**Next.js SSR 即跑在云托管容器**);
- **静态托管** = 一键前端部署、自动 HTTPS、全球 CDN、History 路由、版本回滚(适合纯静态 / SSG);
- **身份认证** = 邮箱 / 手机号 / OAuth / 微信登录 等 + 行级访问控制;
- **云存储** = 文件上传 / 管理 / 分发、图片处理、CDN、基于身份的访问控制;
- **AI 能力** = 统一大模型接入 + Agent 开发能力;
- **SDK 矩阵** = `@cloudbase/js-sdk`(Web)、Node.js SDK、Flutter SDK、小程序 SDK、HTTP API。

## Agent 框架选型判据

仅当 `idea.md` 表明产品含 LLM/agent 能力时启用,否则本层填「无」。三场景判据(在 `architecture.md` 第 1.4 节作答,详见 [references/agent-and-genui.md](references/agent-and-genui.md)):

| 场景 | 选型 | 理由 |
|------|------|------|
| 面向用户的对话 / AI 功能,跑在 Next.js 内 | **Vercel AI SDK** | TypeScript、模型无关(可插 Claude/GPT/Gemini),原生支持 Generative UI(AI SDK 3.0 起)。 |
| 自主、长跑、会用工具的后端 agent(执行命令/管文件/多步工作流编排)——尤其 §3.4「人即环境」的多 agent 仿真类产品 | **Claude Agent SDK** | Anthropic 出品,深度对齐 Claude 推理;适合后端自动化、代码 agent、文档处理、工作流编排、内部工具。 |
| 既要面向用户的流式对话,又要后端自治长跑 | **二者组合** | Vercel AI SDK 前端流式 + Claude provider;或后端用 Claude Agent SDK 自治。 |

**运行位置铁律:agent 后端一律跑在 CloudBase 云函数 / 云托管(CloudBase Run)**;长跑/常驻/大依赖走云托管容器。

## Generative UI

- **稳定路径 = Vercel AI SDK UI(`useChat` + tool-call 结果在客户端渲染 shadcn 组件)**:AI 从一套 shadcn 组件 kit(白名单)里按用户意图决定渲染哪个组件。这是默认走法。
- **RSC 路径谨慎采用**:`streamUI`(生成器函数 `yield` loading 态、模型返回 React Server Components)技术仍可用,但官方已明确「**AI SDK RSC 开发暂停维护**」,故**默认不走 RSC 路径**,除非项目有明确理由并经用户确认。
- 落地细节(组件 kit 白名单 / tool 定义 / 前端流式 + Claude provider 组合写法)详见 [references/agent-and-genui.md](references/agent-and-genui.md)。

## 项目级决策(铁律之上,从 idea.md 约束反推)

铁律锁死了「用什么平台」,但「在这个平台上怎么配」仍是开放决策。`vibe-architecture` 先回读 `idea.md`(产品约束)与 `interaction.md`(各页数据需求、实时性/鉴权门控线索),据下表逐项作答——**每个决策都要写明依据(回指 idea.md 约束 或 interaction.md 数据需求),不允许只填结果不填理由**:

| 项目级决策 | 可选项 | 何时选哪个(回指 idea.md) |
|------------|--------|----------------------------|
| CloudBase 数据库类型 | PostgreSQL 关系型 / 文档型 | 强关系、强事务、多表 JOIN、报表 → 关系型;结构灵活、快速迭代、弱关系、嵌套文档 → 文档型 |
| 渲染与托管形态 | 云托管 SSR / 静态托管 SSG | 需 SSR/动态首屏/SEO 强相关/服务端鉴权重 → 云托管(CloudBase Run)跑 Next.js SSR;内容基本静态、可预渲染 → 静态托管 + SSG/ISR |
| 鉴权方式 | 邮箱 / 手机号 / OAuth / 微信 等 + 行级访问控制 | 由 idea.md 目标用户与平台决定(国内 C 端 → 手机号/微信;海外/通用 → 邮箱/OAuth);多租户/数据隔离 → 重点设计行级安全规则 |
| 是否需要实时订阅 | 用 / 不用 CloudBase 实时订阅 | IM、协作、状态看板、行情类(idea.md 标注实时性要求)→ 用;普通 CRUD → 不用 |
| Agent 框架组合 | 无 / Vercel AI SDK / Claude Agent SDK / 组合 | 见上「Agent 框架选型判据」;无 LLM/agent 需求则填「无」 |
| 状态管理 | server state:RSC / TanStack Query;client state:Zustand | 能在 Server Component 取的优先 RSC;客户端交互态/跨页 UI 态用 Zustand;客户端需缓存/失效/重取的远端数据用 TanStack Query |

**项目级选型决策表写法(在 `architecture.md` 技术栈章节呈现):** 先**声明铁律基线已锁定**(列出 ①~⑤),再以四列决策表呈现上述项目级决策,每行四列:`项目级决策 | 选定方案 | 依据(回指 idea.md 约束) | 被否决的备选`。**每个决策必须写依据,不允许只填结果。** 示例行:

| 项目级决策 | 选定方案 | 依据(回指 idea.md 约束) | 被否决的备选 |
|------------|----------|---------------------------|--------------|
| 数据库类型 | PostgreSQL 关系型 | idea.md §核心场景含订单与对账,强事务强关系 | 文档型(多表对账时 JOIN 困难,否决) |

## 数据库设计方法论

基于 CloudBase 数据库,**二选一**(PostgreSQL 关系型 / 文档型,在「项目级决策」已定)。判据与字段范式详见 [references/db.md](references/db.md);本节给铁律与对齐要点:

- **行级安全规则(security rules)是权限的第一道防线**:凡 SDK 直连(见下文接口三形态)能触达的数据,都必须由 security rules 兜底,不能假设「前端不调就安全」。每个表/集合显式声明谁能读/写、写时校验哪些字段(如 `auth.uid == resource.owner_id`「只能改自己的记录」)。
- **字段表统一保留「对应 interaction.md 展示位」列**:这是「照 interaction 派生」与 architecture ↔ interaction 对齐的承载点——每个可见字段都应能回指到 `interaction.md` 的某个数据展示需求(页面/元素)。若某字段无任何页面展示且无业务逻辑使用,须在说明里写明用途(审计、软删除等),否则视为冗余须删除。
- **关系型 ERD** 用 mermaid `erDiagram`(实体名 PascalCase,关系标注基数 `||--o{`)。
- **强制字段规约**:主键 `id` 默认 UUID v7(有序、避免热点)或自增 bigint(单库高写入,说明取舍);审计字段 `created_at`/`updated_at`,软删 `deleted_at`;命名 snake_case 复数表名,布尔以 `is_/has_` 前缀;金额用 `decimal` 非 float;时间统一 `timestamptz` 存 UTC;枚举用受约束 string 并列全部取值。
- **文档型** 内嵌(embed)vs 引用(reference)取舍:读多/聚合强 → 内嵌;独立查询/复用强 → 引用 + 冗余键。
- **迁移**:关系型迁移版本化入库、单向可回滚、禁手改生产库,破坏性变更走 expand-migrate-contract 三步;文档型用「文档版本字段 + 兼容读」。

## 可实现颗粒度铁律(architecture.md 的硬底线)

`architecture.md` 必须细到「**实现者无需再做任何技术决策**」——它要回答清楚「**每个技术怎么实现、向后端产出什么、向前端输入什么**」。三条强制,缺一即不就绪:

1. **每个字段都类型化(向后端产出什么 / 向前端输入什么的基础)**:数据库字段、接口 ①请求 DTO / ②响应 DTO、前端 view-model,三处字段类型都**可直接映射 TS**(`string` / `number` / `boolean` / 枚举联合 / 嵌套对象 / 数组),**显式标可空、枚举逐一列取值、嵌套逐层展开**;三处类型一致,由 `types/` 单一导出。**禁止裸 shape、无类型**。
2. **每个接口都写「实现细则 + 数据流时序」(每个技术怎么实现)**:不止标三形态,还要写「这个技术具体怎么落」——SDK 直连的具体调用(`db.collection(...).where(...).get()`)、云函数的 `handler → service → data access` 步骤与事务边界、Route Handler / Server Action 的函数签名与 BFF 聚合源;并给「前端动作 → 后端处理 → DB 操作 → 返回 → 前端渲染/失效缓存」的数据流时序。详见 [references/api.md](references/api.md) 的 **6 块契约**。
3. **每个页面都写「页面数据契约」(向前端输入什么)**:每页 / 关键子组件收到的 **view-model**(由接口②响应 DTO + 前端派生字段组装,类型显式、派生写公式)及其字段消费;详见 [references/nextjs.md](references/nextjs.md) 的「页面数据契约」。

> 留白(裸 shape、无类型、无实现细则、无数据流、无页面数据契约)= 缺陷,**不算就绪**;下游 `vibe-implement` 据此可直接落地而无需反推。

## 接口设计方法论(三形态共存)

在 Next.js + CloudBase 下,「接口层」有三种形态,**不是三选一,而是按职责分工共存,同一页面可混用**。详见 [references/api.md](references/api.md)——**每个接口套「6 块契约」:①请求 DTO ②响应 DTO ③实现细则 ④数据流时序 ⑤错误码 ⑥幂等/分页/缓存,全字段类型化**(落实上文「可实现颗粒度铁律」)。本节给判据与对齐铁律:

| 形态 | 是什么 | 何时用 |
|------|--------|--------|
| ① **Next.js Route Handlers / Server Actions** | Next.js 内服务端入口,跑在云托管 SSR 容器 | 需 Next.js 渲染上下文 / 表单直连 / Webhook / 对外 HTTP / BFF 聚合多源 |
| ② **CloudBase 云函数(Cloud Functions)** | serverless,HTTP/事件触发,多语言 | 重业务、服务端密钥、敏感写入(扣款/改状态)、跨集合事务校验、定时/事件触发、agent 后端;凡「不能信任客户端」逻辑收口于此 |
| ③ **CloudBase SDK 直连** | 前端用 `@cloudbase/js-sdk` 直接读写,受 security rules 约束 | 简单 CRUD、读多写少、实时订阅,且能被 security rules 充分约束 |

> 判据一句话:**能被 security rules 安全兜住的简单读写 → SDK 直连;需服务端机密或复杂校验/事务 → 云函数;需 Next.js 渲染上下文或 BFF 聚合 → Route Handlers/Server Actions。**

**强制对齐(照 interaction 派生 + 回指)**:
- 每个接口都是**从 `interaction.md` 的某条数据需求派生**而来;其「**服务页面/元素**」字段**不可为空**,必须指向 `interaction.md` 的具体页面/元素/交互动作(回指)。
- 每个错误码均**据 `interaction.md` 的功能化错误态条件派生**(网络超时 / 401 未登录 / 403 无权限 / 5xx 致命 / 返回空集…);其「前端处理」必须说明在 interaction.md 中表现为何种 UI 反馈,**用词对齐 taxonomy**(`navigate` / `modal` / `confirm` / `drawer` / `popover` / `toast`;字段级『字段下方红字』属 inline 报错,非 §5.6 taxonomy 关键字,单独标注)。
- **确定式全覆盖校验**:因 `interaction.md` 已先存在,须**逐条覆盖**——其每一处「展示数据」都派生出读接口产出该字段,每一处「写入/状态变更」都派生出写接口;任一数据需求无接口支撑即缺口,在第 8 章对齐矩阵**标红**。
- **遇歧义不编造**:若某条数据需求歧义/不可行(读写口径不清、字段含义模糊、要求与 idea.md 冲突),**回指 `interaction.md`(或 `idea.md`)澄清**,不在本文件自行臆造接口。
- **通用约定**:对外接口统一前缀与版本 `/api/v1`;统一响应包络或裸返回+错误码(二选一全局一致);三形态返回数据形状一致,前端不按形态分叉。

## 前端架构方法论(Next.js App Router)

详见 [references/nextjs.md](references/nextjs.md);本节给边界铁律与对齐:

- **Server / Client Component 边界(铁律)**:默认 Server Component;只有需要交互、浏览器 API、`useState`/`useEffect`、事件处理或 Zustand 时,才在文件顶部加 `"use client"`。取数优先在 Server Component 内做(RSC);SDK 直连、TanStack Query 等客户端取数只在 Client Component。
- **App Router 约定**:`loading.tsx`(该路由段 Suspense 加载态,映射 interaction.md 骨架屏);`error.tsx`(**必须是 Client Component**,错误边界 + 重试,映射 error 态);`layout.tsx`(根布局挂全局 Provider / shadcn theme / Toaster);route group(`(marketing)`/`(app)`)不影响 URL。
- **路由 ↔ 页面对齐**:`app/` 下每个 `page.tsx` 必须与 `interaction.md` 页面一一对应;路由表列出 `路由路径 | 页面名 | Server/Client | 是否需鉴权 | 主要调用接口/形态`;`interaction.md` 的 `navigate` 目标必须能在路由表找到。
- **状态管理分工**:server state 走 RSC / TanStack Query;client state(UI 开关、抽屉/弹窗可见性、多步表单、主题)走 Zustand。
- **页面数据契约(view-model,§5.5)= 向前端输入什么**:每页 / 关键子组件一行,把接口 ②响应 DTO 组装成该页消费的 **view-model**(类型显式、派生字段写公式),并标明哪个子组件吃哪个字段;每个 view-model 字段都能回指来源接口 DTO 字段或派生公式。详见 [references/nextjs.md](references/nextjs.md) 的「页面数据契约」。
- **组件变体体系铁律(§4.4.5)**:① `components/ui` 是**唯一 UI 原子来源**(shadcn = Radix + Tailwind + cva);② 每个 UI 元素 = 某基础组件经 cva 定义的 variant,`features/`/`pages/` 只做组合;③ design tokens 单一来源(Tailwind theme + `globals.css` 的 `:root`/`.dark` CSS variables),variant 只引语义化 token(`bg-primary` 等);④ 新样式需求 = 给组件**新增一个 variant**,而非另写并行组件或内联覆写。**三类反模式严禁**:裸 element + 一次性内联样式 / 魔法 class 魔法值(`#3b82f6`、`mt-[13px]`)/ 绕过 variant 临时拼 className 覆写。

## 后端架构方法论(CloudBase Serverless)

CloudBase Serverless 架构,无传统常驻服务进程,由三块拼成:

- **云函数(Cloud Functions)**:承载业务逻辑、入参校验、鉴权、事务/跨集合校验、敏感写入、定时/事件触发、agent 后端。内部保留分层:`handler(协议层:校验入参/鉴权/调 service)→ service(业务逻辑/事务边界)→ data access(经 CloudBase SDK 访问数据库与存储,唯一接触数据访问层)`;DTO 与领域模型分离,handler 不透传数据库原始记录;依赖方向单向向内。
- **云数据库 + 行级安全规则(security rules)**:数据存储与第一道权限防线。
- **云托管(CloudBase Run)**:容器托管,承载 **Next.js SSR** 与需长跑/常驻/大依赖的 **agent 后端容器**;自动扩缩、灰度发布。
- **错误处理**:统一错误基类与捕获,把异常映射为接口契约的 `{ HTTP, code }`;业务错误用显式错误码;区分预期业务错误(4xx)与系统错误(5xx,记日志+告警,不泄露内部细节)。
- **配置与密钥**:CloudBase 接入凭据走环境变量:`TENCENTCLOUD_SECRETID`、`TENCENTCLOUD_SECRETKEY`、`CLOUDBASE_ENV_ID`(及 agent 所需 LLM provider key);真实值不入库,`.env.example` 入库;启动/部署做配置 schema 校验(缺失 fail fast)。
- **CloudBase MCP 两种接入**:① 本地 `npx @cloudbase/cloudbase-mcp`,从环境变量读凭据;② 托管 HTTP `https://tcb-api.cloud.tencent.com/mcp/v1`,SecretId/SecretKey 放 header。`architecture.md` 标明本项目采用哪种接入及凭据来源。
- **日志与可观测性**:结构化 JSON 日志(level/timestamp/requestId/userId/message),贯穿 requestId,敏感字段脱敏;对外 HTTP 提供 `/api/health`(存活)与 `/api/ready`(依赖就绪)端点。

## 对齐矩阵方法论(architecture.md 的灵魂)

`architecture.md` 第 8 章「对齐矩阵」是 architecture ↔ interaction 双向闭合的载体,也是**强制交付门**。因 `interaction.md` **已先于本 skill 存在**,本矩阵是**确定式全覆盖**(而非「按预期页面预判、待 interaction 产出后回填」的旧式):**以 `interaction.md` 为基准逐条枚举**,证明其每个数据展示、每个写入、每条数据都被本 skill 派生的接口/字段/security rules 覆盖、无缺口。七列:

`interaction.md 页面/元素 | 触发动作(taxonomy:modal/navigate/drawer/toast…) | 对应路由 | 对应接口(形态) | 涉及数据模型/字段 | security rules | 缺口标记`

**逐条覆盖** `interaction.md` 的每个数据展示(读接口)、每个写入(写接口)、每条数据(security rules)。三类缺口须标红并说明:**① 展示位无接口**(展示数据无读接口支撑)、**② 写入无接口**(状态变更无写接口)、**③ 数据无 security rules 覆盖**。**任一行缺口未闭合则设计不算完成**;若缺口源于 `interaction.md` 需求本身歧义/不可行,回指 `interaction.md`(或 `idea.md`)澄清,不在本矩阵里编造接口糊弄。`vibe-prototype` / `vibe-implement` 进入下一阶段前会回读该矩阵确认无缺口行。

## architecture.md 模板指引

`architecture.md` 必须含 **0–9 共 10 章**(完整可复制模板在正文与 references 间分布:CloudBase 资源细节见 [references/cloudbase.md](references/cloudbase.md)、前端见 [references/nextjs.md](references/nextjs.md)、数据库见 [references/db.md](references/db.md)、接口见 [references/api.md](references/api.md)、Agent/GenUI 见 [references/agent-and-genui.md](references/agent-and-genui.md))。撰写 `architecture.md` 时照此章节骨架逐章生成:

```
# 技术骨架文档 architecture.md
> 上游 idea.md(产品权威)+ interaction.md(数据需求来源,据其派生)/ 下游 design.md(视觉准则)、prototypes、代码
> 本文件据 interaction.md 的数据需求派生数据模型与接口,并为每个接口/字段回指其服务于 interaction.md 的哪个页面/元素/动作
> 技术栈基线(铁律):Next.js(App Router)+ 腾讯云开发 CloudBase + shadcn/ui

0. 概览 —— 一句话定位(摘自 idea.md)+ 关键约束摘要 + 对齐到的 interaction.md 版本(数据需求来源)+ 架构总览图(可选)
1. 技术栈基线与项目级选型
   1.1 固定技术栈基线(声明已锁定 ①Next.js App Router ②CloudBase ③shadcn/ui ④Agent 层 ⑤Generative UI)
   1.2 选型驱动约束(回读 idea.md)
   1.3 项目级选型决策表(项目级决策 | 选定方案 | 依据 | 被否决备选)
   1.4 Agent 框架选型(若涉及 LLM/agent:Vercel AI SDK / Claude Agent SDK / 组合,含依据)
   1.5 整体架构图(Next.js ↔ CloudBase 资源 ↔ Agent 后端)
2. CloudBase 资源清单(资源 | 类型 | 用途 | 接入方式;注明 MCP 接入与凭据来源)
3. 数据库设计
   3.1 数据库类型与依据  3.2 ERD/集合结构  3.3 表/集合字段表(含「对应 interaction.md 展示位」列)
   3.4 索引清单(含「服务于哪个接口」列)  3.5 行级安全规则 security rules  3.6 关系完整性/迁移与种子
4. 接口设计(三形态)
   4.1 三形态分工与判据  4.2 通用约定  4.3 接口清单(每接口套 **6 块契约**:①请求 DTO ②响应 DTO ③实现细则 ④数据流时序 ⑤错误码 ⑥幂等/分页/缓存,**全字段类型化**,并标形态)  4.4 全局错误码表
5. 前端架构(Next.js App Router)
   5.1 目录结构  5.2 Server/Client 边界与 loading.tsx/error.tsx  5.3 路由表(与 interaction.md 一一对应)  5.4 状态管理与接口对接  5.5 页面数据契约(每页/组件 view-model 与字段消费 = 向前端输入什么)
6. 后端架构(CloudBase Serverless)
   6.1 云函数分层  6.2 云托管(SSR/agent 容器)  6.3 错误处理  6.4 配置与密钥/MCP 接入  6.5 日志/健康检查
7. Agent 与 AI 界面方案(若适用)
   7.1 Agent 框架与运行位置  7.2 Generative UI 组件 kit 白名单 + tool 定义  7.3 渲染路径声明(useChat 稳定路径 / 是否 RSC streamUI)
8. 对齐矩阵(architecture.md ↔ interaction.md)—— 本文档的灵魂(以 interaction.md 为基准的确定式全覆盖,七列,缺口标红)
9. 未决问题与假设(对 idea.md 的假设、对 interaction.md 需求歧义的回指清单、暂缓项及触发再设计的条件)
```

## 上游交接来源(vibe-interaction)与完成判定、向 vibe-design 交接

**上游交接来源 = `vibe-interaction`**:本 skill 的派生依据 `interaction.md` 由 `vibe-interaction` 产出(它先据 `idea.md` 写出第一份 UI 文档,首次定义页面/模块/元素 ID 与各页功能化数据需求)。本 skill 起步即回读 `idea.md` + `interaction.md`,据后者的数据需求派生数据模型与接口。

**完成判定** = 第 8 章对齐矩阵**全绿**(以 `interaction.md` 为基准确定式全覆盖、无三类缺口)+ **用户确认**。`vibe-architecture` **不自动拉起**下一个 skill;完成后向用户输出固定交接说明,含四要素:

1. **本阶段产物清单与路径**:`./architecture.md`(技术栈基线 + CloudBase 资源清单 + 数据模型 + 接口契约含接口 ID/形态/全局错误码 +(若适用)Agent 与 AI 界面方案),附版本 / commit。
2. **当前对齐到的上游版本**:`idea.md` 版本(产品权威)+ `interaction.md` 版本(数据需求来源,本文件据其派生)(commit 或时间戳)。
3. **下一步**:请手动调用 **vibe-design**(视觉设计准则),其输入 = `idea.md` + `interaction.md`(本 skill 产出的 `architecture.md` 也在其前置就位,提供数据/接口依据);它据用户提供的视觉来源产出 `design.md`(视觉设计准则)。
4. **对齐契约提醒**:本文件每个接口/可见字段都已回指 `interaction.md` 的页面/元素/动作;若 `interaction.md` 后续修订(新增页面/元素/数据需求),须**重新据其派生**并重跑第 8 章对齐矩阵(回填裁决方向 `idea.md` > `interaction.md` > `architecture.md`,遇需求歧义/不可行回指上游澄清、不自行编造),直至确定式全覆盖无缺口。

交接话术示例:
> "`architecture.md` 已就绪并经你确认(路径:`./architecture.md`,版本:`<commit>`,对齐 idea.md @ `<commit>` + interaction.md @ `<commit>`)。技术栈基线 = Next.js + CloudBase + shadcn,已照 `interaction.md` 的数据需求派生出 CloudBase 资源清单、数据模型与接口契约,每个接口/字段都回指其服务的页面/元素/动作,第 8 章对齐矩阵对 `interaction.md` 确定式全覆盖无缺口。下一步请手动调用 **vibe-design(视觉)**,它将以 `idea.md` + `interaction.md` 为输入、以你提供的视觉来源产出 `design.md`(视觉设计准则)。若后续修订 `interaction.md`,会回到本 skill 重新派生并重跑对齐矩阵。"
