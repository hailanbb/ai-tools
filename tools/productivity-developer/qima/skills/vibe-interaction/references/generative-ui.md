# Generative UI 交互范式(vibe-interaction reference)

> 本文件承载 `SKILL.md`「交互专业深化 · D Generative UI」的完整规范,面向 **AI / 对话 / agent 类产品**(仅当上游 `idea.md` 表明产品含 LLM / agent / 对话能力时启用,否则本范式不存在)。它把上游 `idea.md` 所承载的 AI 时代产品哲学(四透镜)落到可实现交互:呼应**透镜一·流变重构**(展示过程而非只给结果)、**透镜三·人即环境**(上帝视角观测面板 + 对齐旋钮)、**透镜四·可验证黑盒**(可中断、可复核、来源可点)。绑定 **Vercel AI SDK + shadcn**。

---

## D.1 意图 → 组件,而非纯文本

AI 按用户意图,从一套**预定义的 shadcn 组件 kit** 里决定渲染哪个组件(图表/表格/卡片/表单/确认),而不是回吐一段文本。组件全部继承自 `components/ui`(见 **shadcn 组件变体体系(套件铁律基线)**),AI 只「**选用 + 填 props**」,不自造样式。约定一张 **tool-call → UI 组件 映射表**:

| tool(工具调用) | 渲染的 shadcn 组件 / variant | 说明 |
|---|---|---|
| `show_metric` / `get_trend` | `Card` + 图表组件 | 数值/趋势可视化,而非文字描述 |
| `list_results` | `Table` / `Card` 列表 | 结构化结果 |
| `confirm_action`(写/危险操作) | `AlertDialog`(`confirm`) | 危险操作经二次确认,主按钮 `destructive` |
| `collect_params` | `Form` + `Input/Select` | AI 需要补参时就地表单收集 |
| `cite_sources` | `HoverCard` / `Popover`(来源卡) | 引用可点,落地透镜四 |
| 兜底 | 流式 Markdown 文本 | 无匹配工具时降级为文本 |

## D.2 展示「过程」而非只给「结果」(透镜一·流变)

把 agent 的思考 / 步骤 / 中间态 / 工具调用**可视化**:

- **步骤时间线**(`step` 序列:思考中 → 调用工具 X → 得到结果 → 下一步),每步带 B 节的 `loading` / `done` / `error` 子态;
- **流式渐进渲染**(token 级 `streaming`,边生成边显示);
- **工具调用占位**:工具执行期间显示骨架占位(C 节·避免 CLS),返回后原地替换为 D.1 的组件。

## D.3 可控性(透镜四·可验证黑盒)

生成过程必须可控:

- **可中断 stop**:流式生成中常驻「停止」按钮(`feedback` 动效),立即中止并**保留已生成部分**;
- **重生成 regenerate**:对某条回答重新生成(同一输入,新一次采样);
- **编辑重发 edit & resend**:用户改写自己上一条输入后重发,**截断其后的对话**;
- **引用与来源可点**:AI 结论旁挂可点的来源引用(D.1 的 `cite_sources` → `HoverCard` / `Popover`),支持**复核 / 回溯**,这是「黑盒变可验证」的一等公民。

## D.4 「人即环境」UI(透镜三),作为可复用页面/模块范式

面向多 agent / 群体仿真产品(如 `idea.md` 拔高层范例的「1 万智能体社会风洞」),定义两类可复用模块:

- **上帝视角观测面板**:群体状态实时可视化(分布图 / 热力 / 时间线)+ **涌现现象**观测(口碑传播、跟风、群体极化的曲线/网络图);单 agent 可下钻(`navigate` 详情或 `drawer` 侧栏)。
- **人类干预与对齐旋钮 UI**:把透镜四的「对齐旋钮」做成面板——如设定 1 万 agent 的人口学特征(年龄 / 收入 / 地区滑杆与分布),以及暂停 / 步进 / 重置 / 注入变量等干预控件;**旋钮变更即对照基准重算**,确保虚拟社群与真实目标用户对齐。

这两个模块按 SKILL.md「模板 C · 功能模块 / 区块规格」+ 本目录 `states-and-motion.md` 的 B / C 状态与动效标注复用到任何群体仿真页面。

## D.5 实现绑定

- **稳定路径** = **Vercel AI SDK UI 的 `useChat` + tool-call 结果在客户端渲染 shadcn 组件**;agent 后端跑在 **CloudBase 云函数 / 云托管**。
- **RSC 路径** `streamUI`(模型直接返回 React Server Components)**谨慎使用**——AI SDK 官方已明确「RSC 开发暂停,技术仍可用」,故除非有明确理由,一律走 `useChat` 客户端渲染。
- **框架选择**:面向用户的对话 / AI 功能选 **Vercel AI SDK**;自主长跑后端 agent(尤其透镜三多 agent 仿真)选 **Claude Agent SDK**,二者可组合。

## D.6 在 interaction.md 里如何记录(「Generative UI 规格」节模板)

为每个 **AI / 对话 / agent 页面**,在 SKILL.md「模板 B · 单页面规格」之后新增一节:

````markdown
### Generative UI 规格(本页 AI 交互)
- **实现路径**:useChat(客户端 tool-call 渲染 shadcn)/ streamUI(RSC,需说明为何采用);agent 后端 = CloudBase 云函数 / 云托管
- **组件 kit 清单**:本页 AI 可渲染的 shadcn 组件白名单(Card/Table/Form/AlertDialog/HoverCard…)
- **tool → 组件映射表**:
  | tool | 渲染组件/variant | 触发数据(功能化:读什么/写什么,供 architecture 派生) | 失败回退 |
  |------|------------------|----------------------------------|----------|
- **过程可视化**:步骤时间线 / 流式 streaming / 工具调用骨架占位 的呈现(绑定 B 状态矩阵 + C 动效)
- **可控性交互**:stop / regenerate / edit&resend 各自的触发元素ID、行为序列与 a11y(键盘可达)
- **引用与来源**:来源以何 taxonomy 呈现(popover/HoverCard)、点击后行为(newtab / inline-expand)
- **【群体仿真页专属】环境范式**:上帝视角观测面板模块ID + 对齐旋钮面板模块ID,其旋钮项、干预控件、重算触发与状态矩阵
````

## D.7 「零自造」铁律

Generative UI 同样**零自造**——AI 能渲染的每个组件都在「**组件 kit 清单**」白名单内、且继承自 `components/ui`;每个 tool 渲染的组件、每个流式 / 中断 / 重生成 / 引用交互,都在 `interaction.md` 有唯一标注。`vibe-prototype` 与 `vibe-implement` 按本节核对——渲染了清单外组件或未走「呈现方式分类法 Taxonomy」(见 SKILL.md 同名节 / 本目录 `interaction-taxonomy.md`)的,**视为不合规**。
