# 验收项清单模板(gate-in Step C)

> 作用:把 `interaction.md` **逐元素**拆成「可观察、可断言」的原子验收项。这份清单是 `superpowers:writing-plans` 的 **spec 输入**——每一条都要至少映射一个计划任务 + 一个 TDD 测试断言。它也是 gate-out 对齐核对(逐接口对 `architecture.md`、逐元素对 `interaction.md`、逐页对 `prototypes/` 且符合 `design.md` 视觉准则)里「逐元素对 interaction.md」一向的核销清单。

## 1. 验收项原子模板

每条验收项写成一行,五个字段用 ` / ` 分隔:

```
[页面] / [元素/触发] / [动作类型] / [结果] / [验收断言]
```

| 字段 | 含义 | 取值要求 |
|------|------|----------|
| `[页面]` | 该交互所在页面 | 用 `interaction.md` / `prototypes/` 的页面 ID(kebab-case slug),与文件名 `<页面ID>.html` 逐字符一致 |
| `[元素/触发]` | 哪个可交互元素 + 触发方式 | 元素名(可带元素 ID `<页面ID>-E-<字母>-<序号>`)+ 触发(click / 右键 / hover / input / blur / 长按 / scroll) |
| `[动作类型]` | **呈现方式**,五选一或其组合 | **弹窗 `modal` / 跳转 `navigate` / 浮窗 `popover` / 抽屉 `drawer` / `toast`**(扩展词表见第 3 节);`—` 表示无层级变化 |
| `[结果]` | 触发后到达的分支/状态 | 如「校验成功」「校验失败」「删除确认」;无分支用 `—` |
| `[验收断言]` | 可观察、可被测试断言的行为 | 一句能写成失败测试的描述(出现了什么组件 / 跳到了哪 / 焦点在哪 / 文案是什么 / 多久消失) |

## 2. 五类呈现方式的填好示例(各一条)

```
首页 / "新建项目"按钮(home-E-A-01)/ modal / — / 弹出 Dialog「创建项目」,焦点落在名称输入框
登录页 / "登录"按钮(login-E-A-02)/ navigate / 校验成功 / 跳转至 /dashboard,顶部出现用户名
首页 / 项目卡片 右键(home-E-B-03)/ popover / — / 弹出 Popover/DropdownMenu 含 重命名/删除 两项
设置页 / "导出数据"按钮(settings-E-C-01)/ drawer / — / 右侧滑出 Sheet,展示导出选项
登录页 / "登录"按钮(login-E-A-02)/ toast / 校验失败 / 出现 Sonner toast「账号或密码错误」,3s 后自动消失
```

> 同一元素在不同 `[结果]` 分支下可拆成多条(如上「登录」按钮分裂为 `navigate`(成功)与 `toast`(失败)两条),分别各有自己的失败测试。

## 3. 呈现方式 → shadcn 组件映射表(实现强制对照)

每个呈现方式都**只能**落到下列对应的 shadcn 组件 variant,**零自造**——`vibe-implement` 实现时严禁为这些呈现方式手写组件,一律继承自 `components/ui`。验收项的 `[动作类型]` 列与本表逐条对照;gate-out 完成判定按本表核对实现组件。

| 呈现方式(taxonomy) | 对应 shadcn / 实现方式 | 说明 |
|----------------------|------------------------|------|
| `navigate` | 路由(Next.js App Router `<Link>` / `useRouter`) | 由路由层承载,非 UI 原子;产生历史记录、可后退 |
| `modal` | `Dialog` | shadcn Dialog(Radix Dialog),居中浮层 + 遮罩 |
| `confirm` | `AlertDialog` | 危险操作专用,仅「确认/取消」;主按钮用 Button `destructive` variant |
| `drawer` | `Sheet` | `side` 控制左/右/上/下滑入,保留上下文 |
| `popover` | `Popover` / `DropdownMenu` | 轻量浮层用 Popover,菜单项用 DropdownMenu;点外部即关 |
| `bottomsheet` | `Drawer`(vaul)或移动端 `Sheet side="bottom"` | 移动端从底部升起的动作面板 |
| `toast` | `Sonner` | shadcn 默认 toast 方案;短暂非阻断、自动消失 |
| `inline-expand` | `Accordion` / `Collapsible` | 原地展开 / 手风琴 |
| `inline-edit` | 就地 `Input` + `Form` | 字段就地切可编辑态,失焦/回车保存 |
| `newtab` | `<a target="_blank" rel="noopener noreferrer">` | 原生链接,加安全属性 |
| `download` | `<a download>` 或编程触发下载 | 触发文件下载,无页面跳转 |

> **一句话铁律**:每个呈现方式都落到一个确定的 shadcn 组件 variant,**零自造**;标注了某 taxonomy 关键字却未用对应 shadcn 组件实现的,视为**不合规**。任何视觉差异(主/次/危险、大/小尺寸)一律走 cva 的 `variants` 经 props 选择,不另写组件、不内联覆写。

## 4. 动作类型五选一(或组合)强制规则

- `[动作类型]` 必须显式标注为五选一(或其组合):**弹窗 `modal` / 跳转 `navigate` / 浮窗 `popover` / 抽屉 `drawer` / `toast`**;扩展词表 `confirm` / `bottomsheet` / `inline-expand` / `inline-edit` / `newtab` / `download` 同样可用。粒度直接继承 `interaction.md`。
- **互斥提示**:同一操作**不得同时标注两个关键字**。若「保存成功后跳转」,写成**行为序列**并标注顺序:
  ```
  提交 → 成功 toast「保存成功」 → navigate(<target-slug>)
  ```
- 危险/不可逆操作(删除、清空、注销)必须用 `confirm`(`AlertDialog`),带明确后果文案,主按钮危险色,默认焦点在「取消」。
- 「成功」类反馈用 `toast`,不要用 `modal` 报告「成功」。

## 5. 映射规则(每条验收项的去向)

- **接口类验收项**额外标注请求/响应契约来源:在该行末补 `[来源:API-<域>-<动作>]`,锚定到 `architecture.md` 的接口 ID(如 `API-ORDER-LIST`),供联调阶段逐接口核对。
  ```
  订单列表页 / 列表首屏加载(order-list-M-A)/ — / 加载完成 / 渲染订单行,字段与契约一致 [来源:API-ORDER-LIST]
  ```
- **每条验收项至少映射**:① 一个 `writing-plans` 计划任务(归属五层中的某层,核心层为「交互逐元素落地层」);② 一个 TDD 失败测试断言(先写断言转通过,一条验收项 = 一组 Red-Green)。
- gate-out 时本清单逐条核销,每条附证据(对应测试通过 / 实测行为描述);动作类型做错(「应是 `drawer` 却做成 `navigate`」)算未核销。
