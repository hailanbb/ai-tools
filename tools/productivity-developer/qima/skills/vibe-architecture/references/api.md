# 接口设计规范(vibe-architecture reference)

> 本文件被 `SKILL.md` 的「接口设计方法论(三形态共存)」与 `architecture.md` 第 4 章「接口设计」引用,是其细节背书。

在 Next.js + CloudBase 下,「接口层」有三种形态,**不是三选一,而是按职责分工共存,同一页面可混用**。每个接口都是**从 `interaction.md` 的某条数据需求(读/写)派生**而来——`interaction.md` 已先于 `architecture.md` 存在,以功能化方式写明各页要展示什么数据(读)、点击写什么(写),`architecture.md` 据此**定义接口 ID** 并选定形态。`architecture.md` 须为每个接口标明它属于哪种形态、说明选择依据,并标注它**服务于 `interaction.md` 的哪个页面/元素/动作**(回指)。

## 三形态抉择细则表

| 形态 | 是什么 | 何时用 |
|------|--------|--------|
| ① **Next.js Route Handlers / Server Actions** | Next.js 内的服务端入口(`app/api/.../route.ts` 或 Server Actions),跑在云托管 SSR 容器里 | 需要 Next.js 渲染上下文 / 表单提交直连(Server Actions)/ Webhook / 对外 HTTP API / BFF 聚合多源数据;与前端同仓、强类型贯通时优先 |
| ② **CloudBase 云函数(Cloud Functions)** | serverless 函数,HTTP/事件触发,多语言 | 重业务逻辑、需服务端密钥、敏感写入(扣款/改状态)、跨数据集事务校验、定时/事件触发、agent 后端;凡「不能信任客户端」的逻辑收口于此 |
| ③ **CloudBase SDK 直连(受 security rules 约束)** | 前端用 `@cloudbase/js-sdk` 直接读写数据库 / 存储 | 简单 CRUD、读多写少、实时订阅,且能被 security rules 充分约束的场景;省去自写接口,但**安全完全依赖 security rules** |

> 判据一句话:**能被 security rules 安全兜住的简单读写 → SDK 直连;需要服务端机密或复杂校验/事务 → 云函数;需要 Next.js 渲染上下文或 BFF 聚合 → Route Handlers/Server Actions。** 同一页面可混用三种形态。

## 接口契约完整模板(每个接口一份,**6 块,缺一不可**)

> **可实现颗粒度铁律**:契约必须细到「**实现者无需再做任何技术决策**」——每个字段有 TS 类型、标可空 / 枚举 / 嵌套展开;每个接口有「实现细则」(这个技术具体怎么落)与「数据流时序」;错误体有 shape。**留白即缺陷**。

````markdown
#### [接口名] 创建文章 · 形态:CloudBase 云函数
- **接口ID**: API-POST-CREATE ｜ **触发/调用**: Server Action `createPost(dto)` → 云函数 `createPost`(HTTP 触发) ｜ **鉴权**: 登录必需,角色 `author`;security rules 兜底
- **服务页面/元素(回指 interaction.md)**: `editor` → `editor-E-A-05 发布`(click → 提交 → toast 成功 → navigate 详情)

**① 请求 DTO(后端接收 / 前端发出)** — 全字段类型化:
| 字段 | TS 类型 | 必填 | 约束 | 来源元素 |
| --- | --- | --- | --- | --- |
| title | `string` | 是 | 1–120 字,trim | `editor-E-A-01` 标题框 |
| body | `string` | 是 | 非空,≤50000 | `editor-E-A-02` 富文本 |
| tagIds | `string[]` | 否 | 每项 UUID v7,≤10 | `editor-E-A-03` 标签多选 |

**② 响应 DTO(后端产出 → 前端输入)** — 全字段类型化,标可空 / 枚举 / 嵌套 / 渲染去向:
| 字段 | TS 类型 | 可空 | 枚举 / 取值 | 渲染到(interaction.md 元素) |
| --- | --- | --- | --- | --- |
| id | `string` | 否 | — | — |
| title | `string` | 否 | — | `post-detail-E-A-01` 标题 |
| status | `'draft' \| 'published'` | 否 | draft / published | `post-detail-E-A-04` 状态徽标 |
| publishedAt | `string \| null` | 是 | ISO8601(草稿为 null) | `post-detail-E-A-05` 发布时间 |
| author | `{ id: string; displayName: string; avatarUrl: string \| null }` | 否 | — | `post-detail-E-A-02` 作者卡 |
> 嵌套对象逐层展开字段与类型;数组标元素类型。本表 = TS 类型来源,生成后 re-export 到 `types/`,前后端共用,杜绝漂移。

**③ 实现细则(这个技术具体怎么落,写到可照抄)**:
> 形态=云函数 `createPost`。`handler(event)`:zod `CreatePostSchema` 校验入参 + 取 `auth.uid` → `service.createPost(uid, dto)`:开事务 → 校验 title 唯一(查 `posts`)→ `db.collection('posts').add({ ...dto, authorId: uid, status: 'draft', createdAt })` → 批量写 `post_tags` 关联 → commit → 组装 ②响应 DTO。`data access` 唯一经 CloudBase Node SDK;失败回滚。
> **必写**:用到的 CloudBase 资源(集合 `posts` / `post_tags`、是否用存储)、事务边界、服务端密钥、zod schema 名。SDK 直连接口改写「具体调用」(如 `app.database().collection('posts').where({...}).get()`);Route Handler / Server Action 写函数签名 + BFF 聚合源。

**④ 数据流时序(前端动作 → 后端 → DB → 回 → 前端)**:
```
editor-E-A-05 发布(click)
 → Server Action createPost(dto:①)
 → 云函数: zod 校验 → 事务[ title 唯一? → posts.add → post_tags.add ] → commit
 → 返回 响应 DTO(②)
 → 前端: toast「发布成功」 + navigate(/posts/:id) + 失效 queryKey ['posts']
```
(多步 / 分支交互改用 mermaid `sequenceDiagram`。)

**⑤ 错误码表(含错误体 shape;前端处理对齐 taxonomy)**:
错误体统一 `{ error: { code: string; message: string; fields?: Record<string, string> } }`。
| HTTP | code | 含义 | 前端处理(taxonomy) |
| --- | --- | --- | --- |
| 400 | VALIDATION_ERROR | 字段校验失败 | 字段下方红字(inline),用 `fields` 定位 |
| 401 | UNAUTHORIZED | 未登录 / 过期 | navigate 登录页 |
| 403 | FORBIDDEN | 无 author 角色 | toast 无权限 |
| 409 | DUPLICATE_TITLE | 标题重复 | 标题框 inline 报错 |

**⑥ 幂等 / 分页 / 缓存与重取**:
- 写操作支持 `Idempotency-Key`;列表统一 `?page=&pageSize=&sort=`,出参 `{ items: T[]; total: number; page: number; pageSize: number }`。
- **前端取数策略(回指 §5)**:读接口标明 RSC 服务端取 / TanStack Query(给 `queryKey` + 失效时机);写成功后失效哪些 `queryKey`。
````

> **6 块缺一不可**;「服务页面/元素」字段不可为空,必须指向 `interaction.md` 的具体元素或交互动作。每个字段类型须可直接映射 TS 类型,杜绝「裸 shape、无类型」。

## 全局错误码字典

每个 code 注明语义与默认前端 UI 反馈(用词对齐 §5.6 taxonomy:`navigate` / `modal` / `confirm` / `drawer` / `popover` / `toast`;字段级『字段下方红字』属 inline 报错,非 §5.6 taxonomy 关键字,单独标注):

| HTTP | code | 语义 | 默认前端 UI 反馈(taxonomy) |
|------|------|------|------------------------------|
| 400 | `VALIDATION_ERROR` | 字段校验失败 | 字段下方红字提示(inline) |
| 401 | `UNAUTHORIZED` | 未登录 / 会话过期 | navigate 登录页;或全局会话过期 modal |
| 403 | `FORBIDDEN` | 已登录但无权限 | toast「无权限」;或置灰元素 + popover 说明 |
| 404 | `NOT_FOUND` | 资源不存在 | navigate 404 页;或列表内空态 |
| 409 | `DUPLICATE_*` / `CONFLICT` | 唯一冲突 / 并发冲突 | 唯一冲突:inline 报错;并发冲突:confirm「数据已被他人修改,是否覆盖?」 |
| 422 | `BUSINESS_RULE_VIOLATION` | 业务规则不满足 | toast 或 inline,视场景 |
| 429 | `RATE_LIMITED` | 限流 | toast「操作过于频繁,请稍后再试」 |
| 500 | `INTERNAL_ERROR` | 系统错误 | toast「系统异常」+ 记日志告警,不泄露内部细节 |

## 通用约定

- **版本前缀**:对外 HTTP 接口统一前缀与版本 `/api/v1`。
- **响应包络**:统一响应包络(`{ data, error, meta }`)**或**裸返回 + 错误码,**二选一并全局一致**。
- **统一约束**:统一鉴权头、CORS、限流;时间格式统一 **ISO 8601 UTC**。
- **形态间数据形状一致**:SDK 直连、云函数、Route Handler 返回的数据形状要一致,**前端不按形态分叉处理**。

## 强制对齐与由契约生成类型

- **服务页面/元素必填(回指)**:每个接口都从 `interaction.md` 的某条数据需求派生,其「服务页面/元素」字段不可为空,指向 `interaction.md` 的具体页面/元素/交互动作。
- **错误码据功能化错误态派生 + 「前端处理」对齐 taxonomy**:`interaction.md` 以功能化条件描述错误态(网络超时 / 401 未登录 / 403 无权限 / 5xx 致命 / 返回空集…),`architecture.md` **据此定义具体错误码**;每个错误码的前端处理用词必须与 interaction.md 的 §5.6 taxonomy 一致(`navigate` / `modal` / `confirm` / `drawer` / `popover` / `toast`;字段级『字段下方红字』属 inline 报错,非 §5.6 taxonomy 关键字,单独标注)——这是 architecture ↔ interaction 的接缝。
- **确定式全覆盖校验**:因 `interaction.md` 已先存在,逐条覆盖——其每一处「展示数据」都派生出一个读接口(任一形态)产出该字段;每一处「触发写入/状态变更」都派生出一个写接口;任一数据需求无接口支撑即为**缺口**,在 `architecture.md` 第 8 章对齐矩阵中**标红**。
- **遇歧义回指不编造**:若某条数据需求歧义/不可行,回指 `interaction.md`(或更上游 `idea.md`)澄清(回填裁决方向 `idea.md` > `interaction.md` > `architecture.md`),`architecture.md` 不自行臆造接口。
- **由契约生成类型**:由接口契约的入参/出参生成 TypeScript 类型,re-export 到前端 `types/`,确保前端类型与 `architecture.md` 契约不漂移;`lib/` 层统一注入鉴权、统一错误归一化(把后端 error code 翻译为前端可消费的错误对象)。
