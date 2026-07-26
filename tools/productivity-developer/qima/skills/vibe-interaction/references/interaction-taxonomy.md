# 呈现方式分类法 Taxonomy(vibe-interaction reference)

> 本文件是「呈现方式分类法」的**完整权威词表**,是整套 Vibe Coding skill 关于「点了之后怎么呈现」的单一事实源。`vibe-interaction` 的 `SKILL.md` 正文给精炼版并回指本文件;`vibe-prototype` 与 `vibe-implement` 均按本表核对。

每个「行为」在改变视觉层级时,**必须且只能**标注下列 11 个关键字之一。括号内为标注写法(例:`【呈现方式:drawer(目标=…,位置=…)】`)。

## 一、完整 Taxonomy 表

| 关键字 | 中文 | 定义 | 是否改变路由 | 是否阻断 |
|--------|------|------|--------------|----------|
| `navigate` | 页面跳转 | 进入新页面/路由,产生历史记录,可后退 | 是 | 整页替换 |
| `modal` | 模态弹窗 | 居中浮层 + 遮罩,需用户处理后关闭 | 否 | 是(遮罩拦截) |
| `confirm` | 二次确认弹窗 | modal 的特例,仅"确认/取消"两按钮,用于危险操作 | 否 | 是 |
| `drawer` | 抽屉 | 从边缘(右/左/上/下)滑入的面板,保留上下文 | 否 | 半阻断(可带遮罩) |
| `popover` | 浮层气泡 | 锚定在触发元素旁的小浮层,点外部即关 | 否 | 否 |
| `bottomsheet` | 底部动作条 | 移动端从底部升起的动作面板 | 否 | 半阻断 |
| `toast` | 轻提示/snackbar | 短暂非阻断反馈,自动消失,不打断操作 | 否 | 否 |
| `inline-expand` | 原地展开/手风琴 | 在当前位置展开更多内容(折叠面板/嵌套行) | 否 | 否 |
| `inline-edit` | 原地编辑 | 字段就地变为可编辑态,失焦/回车保存 | 否 | 否 |
| `newtab` | 新标签页 | 在浏览器新标签打开,不离开当前页 | 新窗口 | 否 |
| `download` | 下载 | 触发文件下载,无页面跳转 | 否 | 否 |

## 二、呈现方式 → shadcn 组件映射(实现强制对照表)

每个呈现方式都**只能**落到下列对应的 shadcn 组件 / 实现方式,**零自造**——`vibe-implement` 实现时严禁为这些呈现方式手写组件,一律继承自 `components/ui`。

| 呈现方式(taxonomy) | 对应 shadcn / 实现方式 | 说明 |
|----------------------|------------------------|------|
| `navigate` | 路由(Next App Router `<Link>`) | 由路由层承载,非 UI 原子 |
| `modal` | `Dialog` | shadcn Dialog(Radix Dialog) |
| `confirm` | `AlertDialog` | shadcn AlertDialog,危险操作专用,主按钮用 Button `destructive` variant |
| `drawer` | `Sheet` | shadcn Sheet,`side` 控制左/右/上/下滑入 |
| `popover` | `Popover` / `DropdownMenu` | 轻量浮层用 Popover,菜单项用 DropdownMenu |
| `bottomsheet` | `Drawer`(vaul)或移动端 `Sheet side="bottom"` | 移动端从底部升起的动作面板 |
| `toast` | `Sonner` | shadcn 默认 toast 方案 |
| `inline-expand` | `Accordion` / `Collapsible` | 原地展开 / 手风琴 |
| `inline-edit` | 就地 `Input` + `Form` | 字段就地切可编辑态,失焦/回车保存 |
| `newtab` | `<a target="_blank" rel="noopener noreferrer">` | 原生链接,加安全属性 |
| `download` | `<a download>` 或编程触发下载 | 触发文件下载,无页面跳转 |

## 三、「零自造」铁律

- 每个呈现方式都落到一个**确定的 shadcn 组件 variant**,继承自 `src/components/ui`(由 shadcn/ui 生成:Radix UI 无障碍原语 + Tailwind CSS 样式 + cva 定义 variant,沿用 **shadcn 组件变体体系(套件铁律基线)**——Next.js+CloudBase+shadcn 固定基线,不依赖 `architecture.md` 已写)。
- 视觉差异(主/次/危险按钮、大/小尺寸等)一律表达为 cva 的 `variants` 经 props 选择,**不另写组件、不内联覆写、不用魔法值**。
- 标注了某 taxonomy 关键字却未用对应 shadcn 组件实现的,**视为不合规**;原型(`vibe-prototype`)、对齐报告、实现(`vibe-implement`)均按本表核对。

## 四、决策规则(「何时用哪种」—— 实现者据此自检)

1. **进入层级更深 / 独立内容、需要专属 URL 可分享或可后退** → `navigate`。
2. **少量信息确认、简单表单(≤5 字段)、必须当场处理** → `modal`。
3. **危险/不可逆操作(删除、清空、注销)** → 必须 `confirm`(带明确后果文案,**主按钮为危险色**,默认焦点落"取消")。
4. **复杂表单 / 多字段编辑 / 希望用户能边看列表边填、不离开上下文** → `drawer`。
5. **针对某个具体元素的辅助说明、快捷菜单、轻量选择** → `popover`(桌面)/ `bottomsheet`(移动端)。
6. **操作结果的非阻断反馈(保存成功、复制成功、网络错误提示)** → `toast`;**不要用 modal 报告"成功"**。
7. **同一上下文内查看更多明细、不值得新开页面** → `inline-expand`。
8. **单字段快速修改(改名、改备注)** → `inline-edit`。
9. **跳转到外部站点/帮助文档/政策页** → `newtab`。
10. **导出报表/下载附件** → `download`。

## 五、互斥与行为序列规则

- **互斥**:同一操作**不得同时标注两个关键字**。
- **行为序列**:若一次操作含多步(如"保存成功后跳转"),写成**带顺序的行为序列**并标注顺序:
  - 范例:`提交 → 成功 toast → navigate(<target-slug>)`。
  - 每一步的呈现方式各自落到 taxonomy 的某一个关键字;不把多步压成一个含混标注。
