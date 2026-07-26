# 五层实现顺序(Next.js App Router + CloudBase)

> 这五层就是写进 `superpowers:writing-plans` 的**任务分层**:自底向上,每层产出可独立验证的成果,且每层任务都映射回 gate-in 生成的验收项清单。技术栈基线为铁律:**Next.js(App Router)+ 腾讯云开发 CloudBase + shadcn/ui**;`vibe-implement` 经 **CloudBase MCP**(`@cloudbase/cloudbase-mcp`)建库 / 部署 / 配置,无需手工控制台操作。

---

## ① 数据库层

**做什么**
- 按 `architecture.md` 的 schema,在 **CloudBase 数据库**(PostgreSQL 关系型 或 文档型,类型由 `architecture.md` §1.3「项目级选型决策表」/ §3.1「数据库类型与依据」已定)建表 / 集合 + 迁移。
- 配置**行级安全规则(security rules)**:凡 SDK 直连能触达的数据,都由 security rules 兜底(不能假设「前端不调就安全」),逐表 / 集合定义读写权限。
- 经 **CloudBase MCP** 建库;先写**迁移测试 / schema 断言**。

**验证要点**
- 迁移可执行,可重复运行(幂等)。
- 字段 / 类型 / 约束 / 默认值 / 索引与 `architecture.md` 字段表逐项一致;审计字段(`created_at` / `updated_at`,需软删除则 `deleted_at`)就位。
- security rules 与 `architecture.md` §3.5 行级安全规则一致(尝试越权读写应被拒)。

---

## ② 接口层

**做什么**
- 按 `architecture.md` 接口契约实现后端 endpoint,遵循三形态分工:
  - **Next.js Route Handlers / Server Actions**:跑在云托管(CloudBase Run)的 Next.js 内,承载面向前端的 HTTP / 表单动作。
  - **CloudBase 云函数(Cloud Functions)**:承载业务逻辑、入参校验、鉴权、事务 / 跨集合校验、敏感写入、定时 / 事件触发、agent 后端。
  - **SDK 直连**(`@cloudbase/js-sdk`):受 security rules 约束的简单读写。
- 云函数内保留分层精神:`handler(校验入参/鉴权/调 service)→ service(业务逻辑/事务边界)→ data access(经 CloudBase SDK 访问数据)`;DTO 与领域模型分离。
- 每个接口先写**契约测试**(请求 / 响应 shape、状态码、错误体),错误用显式错误码对齐契约错误码表。

**验证要点**
- 契约测试全绿:method / path / 请求体 / 响应体 / 状态码 / 错误体与 `architecture.md` 契约一致。
- 4xx 业务错误与 5xx 系统错误区分;5xx 记日志告警、不泄露内部细节。

---

## ③ 前端骨架层

**做什么**
- 按 `interaction.md` 的页面清单与跳转逻辑,用 **Next.js App Router** 搭路由(route group)+ 页面空壳 + 布局框架。
- 落地页面级四态文件:`loading.tsx` / `error.tsx`(对应 loading / error 态),空态 / 无权限态按 `interaction.md` 页面级四态(loading / empty / error / forbidden)预留。
- Server / Client Component 边界按 `architecture.md`(能在 Server Component 取的数据优先用 RSC);对照 `prototypes/` 的整体结构布局,视觉遵 `design.md` 准则。
- UI 一律用 `components/ui` 的 shadcn 组件组合,不写裸 element。

**验证要点**
- 所有页面 ID 对应的路由可达。
- 路由跳转(`navigate` 类行为)与 `interaction.md` 跳转逻辑一致(可后退、URL 正确)。
- 页面整体结构与同名 `prototypes/<页面ID>.html` 对齐,视觉符合 `design.md` 视觉准则。

---

## ④ 交互逐元素落地层(核心层)

**做什么**
- **逐条消费 gate-in 的验收项清单**:每条交互(按钮 / 弹窗 / 浮窗 / 抽屉 / toast)走一遍 **TDD**——先把验收断言写成**失败测试** → 实现 → 通过。**一条验收项 = 一组 Red-Green**(遵守 `superpowers:test-driven-development` 的 Iron Law:无失败测试不写实现)。
- 每个呈现方式落到对应 shadcn 组件 variant(完整映射表见 acceptance-checklist-template.md **第 3 节**,权威单一来源;对应规格 §5.6 映射 + §4.4.5 铁律):视觉差异用 cva variant + props,**零自造、不内联覆写**。
- 多状态(default / hover / pressed / disabled / loading / success / error)、门控(可见 / 可用角色)、边界异常(空数据 / 超长 / 网络失败 / 并发 409 / 防重复提交)按 `interaction.md` 元素规格落地。

**验证要点**
- 每条验收项都有从失败转通过的测试;动作类型(呈现方式)与 `interaction.md` 逐条一致(做错呈现方式算未完成)。
- 这是**最易遗漏、用户最看重**的一层,任务密度最大,不允许被「功能跑通了」一笔带过。

---

## ⑤ 联调层

**做什么**
- 前端接入真实 **CloudBase 接口 / SDK**,替换骨架期的桩。
- 经 **CloudBase MCP** 部署:**Next.js SSR 跑在云托管(CloudBase Run)容器**;纯静态 / SSG 走静态托管(自动 HTTPS、CDN、版本回滚);agent 后端(若有)跑云函数 / 云托管。
- 端到端走通关键流程,对照 `architecture.md` 核对前后端数据流、错误处理,以及 loading / 空 / 异常态的真实表现。

**验证要点**
- 关键用户路径 **E2E** 跑通(从入口到核心价值闭环)。
- 数据流与 `architecture.md` 一致;错误体、各页面四态在真实接口下表现正确。

---

## 分层目的

让交互这一**最易遗漏、用户最看重**的部分,有独立且最密集的一层任务和测试(第 ④ 层),避免被「功能跑通了」一笔带过。每层都产出**可独立验证**的成果,并直接映射到 `writing-plans` 的任务分层与 `subagent-driven-development` / `executing-plans` 的执行单元;gate-out 对齐核对(逐接口对 `architecture.md`、逐元素对 `interaction.md`、逐页对 `prototypes/` 且符合 `design.md` 视觉准则)再回到这五层产物上逐项核销。
