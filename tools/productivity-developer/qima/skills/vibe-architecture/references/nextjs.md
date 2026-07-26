# Next.js App Router(vibe-architecture reference)

> 本文件被 `SKILL.md` 的「前端架构方法论」与 `architecture.md` 第 5 章「前端架构」引用,是其细节背书。前端基于 **Next.js App Router**,核心是分清 **Server / Client Component 边界**并据此安排取数与状态。

## 目录结构详解

```
app/
  (marketing)/         # route group:公开页(着陆页等),不影响 URL 段
  (app)/               # route group:登录后主应用
    layout.tsx         # 受保护布局(鉴权、全局 Provider)
    dashboard/
      page.tsx         # Server Component:服务端取数
      loading.tsx      # 该段加载态(Suspense 边界)
      error.tsx        # 该段错误边界(Client Component)
    orders/
      page.tsx
      [id]/page.tsx    # 动态路由,1 路由 ≈ interaction.md 的 1 个页面
  api/                 # Route Handlers(BFF / Webhook / 对外 HTTP)
    .../route.ts
  layout.tsx           # 根布局:全局 Provider、shadcn theme、Toaster
components/
  ui/                  # shadcn/ui 原子(见下「组件变体体系」,唯一 UI 来源)
  ...                  # 业务展示组件(组合 ui/)
features/              # 按业务域聚合(组件 + hook + server actions + 类型)
lib/
  cloudbase.ts         # CloudBase SDK 初始化(客户端)
  server/              # 服务端工具(云函数调用封装、鉴权)
hooks/                 # 通用 client hooks
stores/                # Zustand 全局 client state
ai/                    # Generative UI:组件 kit + tool 定义
types/                 # 全局类型(可由后端契约生成)
```

## Server / Client Component 边界规则(铁律)

- **默认 Server Component**;只有需要交互、浏览器 API、`useState`/`useEffect`、事件处理或 Zustand 时,才在文件顶部加 `"use client"`。
- **取数优先在 Server Component 内直接做(RSC 取数)**:Server Component 内直接 `await` 云函数 / SDK / DB。
- **客户端取数**(CloudBase SDK 直连、TanStack Query)**只在 Client Component** 使用。

## App Router 约定

| 文件 | 角色 | 映射到 interaction.md |
|------|------|------------------------|
| `loading.tsx` | 该路由段的 Suspense 加载态 | 骨架屏 skeleton(页面级 loading 态) |
| `error.tsx` | 该路由段错误边界,**必须是 Client Component** | error 态 + 重试 |
| `layout.tsx` | 根/段布局:全局 Provider、shadcn theme、Toaster | 全局组件(导航栏、modal root、toast root) |
| route group `(marketing)` / `(app)` | 分组,**不影响 URL 段** | 公开页 / 登录后主应用 |

## Route Handlers 与 Server Actions 写法要点

- **Route Handlers**:`app/api/.../route.ts` 导出 `GET`/`POST` 等;跑在云托管 SSR 容器;用于 BFF 聚合、Webhook、对外 HTTP API。
- **Server Actions**:`"use server"` 函数,表单提交直连、与前端同仓强类型贯通时优先;无需手写 fetch。
- 二者均跑在服务端,可安全使用服务端密钥与 CloudBase Node.js SDK。

## 云托管 SSR vs 静态托管 SSG 部署差异

| 形态 | 部署到 | 何时选 |
|------|--------|--------|
| 云托管 SSR | CloudBase Run 容器 | 需 SSR / 动态首屏 / SEO 强相关 / 服务端鉴权重 |
| 静态托管 SSG | 静态托管(CDN + History 路由) | 内容基本静态、可预渲染(SSG/ISR) |

## 路由 ↔ 页面对齐检查清单

- `interaction.md` **已先于本阶段定义页面 ID**(第一份 UI 文档);`app/` 下每个 `page.tsx` **必须与 `interaction.md` 的页面一一对应**(以 `interaction.md` 的页面集合为基准确定式覆盖)。
- 路由表用五列表格列出:

| 路由路径 | 页面名(对应 interaction.md) | Server/Client | 是否需鉴权 | 主要调用接口/形态 |
|----------|------------------------------|---------------|------------|--------------------|
| `/orders` | order-list 订单列表页 | Server | 是 | `API-ORDER-LIST`(云函数) |
| `/orders/[id]` | order-detail 订单详情页 | Server | 是 | `API-ORDER-DETAIL`(SDK 直连) |

- `interaction.md` 中描述的「跳转逻辑」(taxonomy 的 `navigate`)**必须能在此路由表找到目标路径**;找不到即缺口。

## 页面数据契约(view-model)—— 向前端输入什么(architecture.md §5.5)

「路由表」回答每页**调哪些接口**;**页面数据契约**回答**每页 / 每个组件到底收到什么数据**(即「向前端输入什么内容」)。每个页面(及其关键子组件)一行,把接口的②响应 DTO 组装成该页消费的 **view-model**,并标明哪个子组件吃哪个字段:

| 页面 / 组件 | 读取接口(响应 DTO) | 组装成 view-model(TS 类型) | 子组件 → 消费字段 |
|------------|---------------------|------------------------------|-------------------|
| `post-detail` 页 | `API-POST-GET` → `PostDTO` | `PostDetailVM { post: PostDTO; canEdit: boolean }`(`canEdit` = `post.authorId === auth.uid`) | 标题→`post.title`;作者卡→`post.author`;状态徽标→`post.status`;编辑按钮门控→`canEdit` |
| `post-list` 页 | `API-POST-LIST` → `{ items: PostCardDTO[]; total; page; pageSize }` | `PostListVM { items: PostCardDTO[]; pageInfo }` | 列表行→`items[]`;分页器→`pageInfo` |

**规则**:
- view-model 由「一个或多个接口②响应 DTO + 纯前端派生字段(如 `canEdit` / 格式化 / 拼装)」组装,**类型显式**;派生字段写明**派生公式**。
- 每个 view-model 字段都要能回指**来源接口响应 DTO 字段**或**派生公式**;无来源即缺口。
- view-model 类型与接口 DTO 一样由 `types/` 统一导出;Server Component 取数后传给 Client 子组件的 props,即 view-model 的子集。
- 这张表是 architecture ↔ interaction 在「**数据消费侧**」的对齐:`interaction.md` 每个展示位元素,都能在某页 view-model 找到喂它的字段。

## 组件变体体系(§4.4.5 铁律基线)

UI 实现的**铁律基线**,对 `vibe-prototype` 与 `vibe-implement` 强制生效:所有 UI 代码必然采用 shadcn 设计模式,所有视觉元素都从 `components/ui` 的组件 variant 中继承。

**1. `components/ui` 是唯一 UI 原子来源。** 所有基础 UI 原子(Button、Input、Card、Dialog、Sheet、Badge、Select…)统一落在 `src/components/ui`,由 shadcn/ui 生成(Radix UI 无障碍原语 + Tailwind CSS 样式 + cva 定义 variant)。任何页面/feature 不得绕过它直接写裸 HTML 元素或自造同类组件。

**2. 每个 UI 元素 = 某基础组件经 cva 定义的 variant。** 视觉差异(主/次/危险按钮、大/小尺寸、不同色调徽标)一律表达为 cva 的 `variants`,通过 props 选择;`features/`、`pages/` 层**只做组合**。严禁三类**反模式**:
- 裸 element + 一次性内联样式(如 `<button style={{...}}>`、`<div className="bg-[#3b82f6] ...">`);
- **魔法 class / 魔法值**(硬编码颜色 `#3b82f6`、像素 `mt-[13px]`、未进 theme 的任意值);
- 为单处需求绕过 variant 临时拼 className 覆写组件外观。

**3. design tokens 单一来源,自上而下驱动所有 variant。** 颜色 / 圆角 / 间距 / 字体等 design tokens 只在一处定义:Tailwind theme(`tailwind.config`)+ CSS variables(`globals.css` 的 `:root` / `.dark`)。cva 的每个 variant 只引用语义化 token(`bg-primary`、`text-destructive-foreground`、`rounded-md`),不出现裸值。换主题/换品牌色 = 改 tokens 一处,全站 variant 自动生效。

**4. 新样式需求 = 给组件新增一个 variant。** 出现新视觉形态时,正确做法是在对应 `components/ui` 组件的 cva 配置里**新增一个 variant**(或新增一档 size),供各处按 props 选用;**严禁**为此另写并行组件,或在调用处内联覆写。变体只增不散。

**5. cva button variant 示例(`components/ui/button.tsx`,基线写法范例):**

```tsx
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  // 基础态:所有按钮共享的语义化 token,无任何魔法值
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3",
        default: "h-9 px-4 py-2",
        lg: "h-10 px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
```

> 新需求(如「成功色按钮」)= 在 `variant` 里加一个 `success` 项并引用 `bg-success` token,而**不是**新写 `<SuccessButton>` 或在调用处内联染色。

**6. 收益(为何定为铁律):**
- **全站视觉一致**:同类元素天然同源,杜绝「十个按钮十种样子」。
- **可主题化**:tokens 一处改,明暗主题 / 品牌换肤全站联动,variant 无需逐个改。
- **可被 prototype 的设计 tokens 反哺**:Stitch 原型抽出的 color/typography/spacing 规范化后注入同一套 theme tokens,原型视觉与代码视觉单一来源。
- **AI 实现时不会各写各的**:变体词表收敛,subagent 实现各页面时只能从既有 variant 选用,天然对齐。
