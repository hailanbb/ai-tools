# Agent 与 Generative UI(vibe-architecture reference)

> 本文件被 `SKILL.md` 的「Agent 框架选型判据」与「Generative UI」两小节,以及 `architecture.md` 第 7 章「Agent 与 AI 界面方案」引用,是其细节背书。
>
> **启用前提**:仅当 `idea.md` 表明产品含 **LLM / agent 能力**时,本层才存在;否则本层不存在,`architecture.md` 项目级决策的「Agent 框架组合」填「无」,本章可略。

## Agent 框架选型判据表

| 场景 | 选型 | 理由 |
|------|------|------|
| ① 面向用户的对话 / AI 功能,跑在 Next.js 内 | **Vercel AI SDK** | TypeScript;模型无关(可插 Claude / GPT / Gemini);为 Next.js 提供 AI 功能 / 对话 / 流式 UI;**原生支持 Generative UI(AI SDK 3.0 起)**。 |
| ② 自主、长跑、会用工具(执行命令 / 管文件 / 多步工作流编排)的后端 agent——尤其 §3.4「**人即环境**」的多 agent 仿真类产品 | **Claude Agent SDK** | Anthropic 出品,深度对齐 Claude 推理;适合后端自动化、代码 agent、文档处理、工作流编排、内部工具。 |
| ③ 既要面向用户的流式对话,又要后端自治长跑 | **二者组合** | Vercel AI SDK 负责前端流式 + Claude provider;或后端用 Claude Agent SDK 自治。 |

> 「人即环境」的多 agent 仿真(如 1 万智能体社会风洞)是 §3.4 透镜三显式关联场景,**优先选 Claude Agent SDK** 作为后端自治 agent。

## Agent 运行位置铁律

- **agent 后端一律跑在 CloudBase 云函数 / 云托管(CloudBase Run)。**
- 短任务 / 事件触发 → 云函数;**长跑 / 常驻 / 大依赖 → 云托管容器(CloudBase Run)**。
- 不在浏览器端跑自治 agent;前端只承载对话 UI 与流式渲染。

## Generative UI 落地

**稳定路径 = Vercel AI SDK UI(`useChat` + tool-call 结果在客户端渲染 shadcn 组件):**

- 用 `useChat` 管理对话状态与消息流;
- AI 通过 **tool-call** 返回结构化结果,客户端拿到结果后**渲染对应 shadcn 组件**;
- AI 从一套 shadcn 组件 **kit** 里按用户意图决定渲染哪个组件。

**组件 kit 白名单**(AI 可渲染的 shadcn 组件集合):

- 在 `ai/` 目录定义一份**白名单**:AI 只能渲染白名单内的 shadcn 组件(如 `Card`、`Table`、`Chart`、`Badge`、`Button`),不允许 AI 自由生成任意 DOM。
- 每个白名单组件对应一个 **tool 定义**(名称 + 入参 schema + 渲染函数),AI 调用 tool 即触发对应组件渲染。
- 白名单收敛了 AI 输出,保证生成的 UI 仍然走 `components/ui` 的 variant 体系,与全站视觉单一来源。

**tool 定义约定:**

- 每个 tool = `{ name, description, parameters(zod/JSON schema), 渲染映射 }`;
- 渲染映射把 tool 的结构化结果绑定到白名单里的某个 shadcn 组件 + variant props;
- `architecture.md` 第 7.2 节列出组件 kit 白名单与对应 tool 定义清单。

## RSC 路径取舍

- `streamUI`(生成器函数 `yield` loading 态、模型返回 React Server Components)技术仍**可用**;
- 但官方已明确「**AI SDK RSC 开发暂停维护**」,故**默认不走 RSC 路径**;
- 仅当项目有明确理由(如必须服务端流式渲染大型 RSC 树)并经**用户确认**时才采用,`architecture.md` 第 7.3 节须写明采用 RSC 的理由。

## 前端流式 + Claude provider 组合写法要点

- 前端用 Vercel AI SDK 的 `useChat` / `streamText`,**provider 配置为 Claude**(`@ai-sdk/anthropic`),实现流式对话;
- 后端自治长跑部分用 **Claude Agent SDK**,跑在 CloudBase 云函数 / 云托管;
- 两端通过 CloudBase 接口(云函数 / Route Handler)衔接:前端发起请求 → 后端 agent 自治执行 → 结果经 tool-call 流回前端渲染 shadcn 组件;
- LLM provider key 走环境变量,真实值不入库,`.env.example` 入库。
