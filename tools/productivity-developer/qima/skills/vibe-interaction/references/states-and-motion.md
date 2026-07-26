# 状态体系化 + 微交互动效(vibe-interaction reference)

> 本文件承载 `SKILL.md`「交互专业深化 · B 状态体系化」与「C 微交互动效」的完整规范,对**所有产品**强制生效。状态与动效一律绑定「呈现方式分类法 Taxonomy」(见 SKILL.md 同名节 / 本目录 `interaction-taxonomy.md`)/ shadcn,并沿用 **shadcn 组件变体体系(套件铁律基线)** 「变体只增不散」。

---

## B. 状态体系化(状态机,而非孤立四态)

### B.1 专业规范

把 SKILL.md「模板 B · 单页面规格」的页面四态(`loading` / `empty` / `error` / `forbidden`)升级为**体系化状态机**,补齐真实数据生命周期里的中间态:

- **partial(部分加载)**:列表/详情分块加载,已到的先渲染、未到的占位(分页「加载更多」、瀑布流、聚合视图按区块到达)。
- **offline(离线/断网)**:全局或局部断网提示,区分「只读缓存可看」与「写操作需联网」。
- **stale / 重新校验(SWR)**:展示缓存旧数据的同时后台刷新,刷新中给极轻的「更新中」指示,而非整页回 `loading`(沿用套件 TanStack Query 缓存语义基线;下游 `architecture.md` 据本页 stale 需求落定状态管理分工)。
- **乐观更新与回滚**:写操作先就地反映预期结果(如 SKILL.md「完整示例」的 `order-list-E-A-08` 状态切换),失败则**回滚**到原值并 `toast` 告知「已撤销」。
- **错误可恢复性分级**(用功能化条件描述,**由下游 `architecture.md` 据此定义错误码**;本文件不写错误码):
  - `可重试`(网络/超时 → 提供「重试」);
  - `需登录`(401 未登录 / 会话过期 → `navigate` 登录 / 会话过期 modal);
  - `需提权`(403 无权限 → 走 `forbidden`);
  - `致命`(5xx 服务端致命 / 数据损坏 → 错误占位 + 反馈入口,不假装可重试)。
  - 这些功能化条件供 `architecture.md` 据此**派生定义全局错误码表**,并回标到本文件对应状态。

### B.2 骨架屏 vs spinner 的选择规则

| 选骨架屏 skeleton | 选 spinner | 选「内联/极轻指示」 |
|---|---|---|
| 已知结构的首屏/区块(列表、卡片、详情) | 结构未知或全屏阻断式操作、按钮内处理中 | stale 后台重校验、乐观更新进行中 |
| 目的:**占位即布局**,避免 CLS | 目的:表达「正在进行」 | 目的:不打断、不夺焦点 |

### B.3 统一「状态 → 呈现」映射

| 状态 | 触发 | 呈现(绑定「呈现方式分类法 Taxonomy」/ shadcn) |
|---|---|---|
| loading | 首次取数、结构已知 | 骨架屏(`Skeleton`),指明范围 |
| partial | 分页/分块到达 | 已到区块渲染 + 剩余 `Skeleton` / 「加载更多」按钮 |
| empty | 返回空集 | 空插画 + 文案 + 主行动按钮 ID(可复用既有元素) |
| error · 可重试 | 网络/超时 | 错误占位 + 「重试」按钮;行内失败用 `toast` + 回到默认态 |
| error · 需登录 | 401 | 会话过期 `modal` 或 `navigate` 登录(沿用 SKILL.md「模板 A」的 A.4 会话过期拦截器) |
| error · 致命 | 5xx/损坏 | 错误占位 + 反馈入口,不提供「重试」 |
| forbidden | 角色不满足 | 403 占位 / 重定向(二选一写明,见 SKILL.md「模板 F · 权限门控矩阵」) |
| offline | 断网 | 全局/局部离线条;写操作禁用并 `toast` 提示 |
| stale | 缓存有效、后台刷新 | 直接展示旧数据 + 极轻「更新中」指示 |
| optimistic | 写操作发起 | 就地预渲染结果 + loading 小态;失败回滚 + `toast`「已撤销」 |

### B.4 在 interaction.md 里如何记录

- SKILL.md「模板 B · 单页面规格」的「页面级状态」表从「四态」扩为上表的**状态矩阵**。
- 在 SKILL.md「模板 C · 功能模块 / 区块规格」中,为**每个独立取数的数据块**追加一张块级「状态矩阵」(列:`状态 | 触发(功能化) | 呈现 | 可恢复性分级`;触发用功能化条件描述、不写错误码,由 `architecture.md` 据此定义)。
- 乐观更新元素须在 SKILL.md「模板 D · 可交互元素的交互规格」的行为序列里写明「**预渲染 → 失败回滚目标值**」。

---

## C. 微交互与动效

### C.1 动效三原则
1. **目的性**:动效服务于「告知状态变化 / 引导注意 / 维持空间连续性」,不为炫技。
2. **克制**:默认无动效也能用,动效是增强。
3. **一致**:同类动作同一套时长/缓动,收敛到 token。

### C.2 时长 / 缓动基线(token 化)

进入(`enter`)、退出(`exit`)、位移/重排(`move`)、反馈(`feedback`)各给一档默认时长与缓动 token,统一在 **shadcn 组件变体体系(套件铁律基线)** 的 theme / CSS variables **单一来源**里定义:

| 动效类型 | 默认时长 | 缓动 | 典型用途 |
|---|---|---|---|
| enter(进场) | 150–200ms | ease-out（decelerate） | `modal` / `drawer` / `popover` 出现 |
| exit(退场) | 100–150ms | ease-in（accelerate） | 浮层关闭(略快于进场) |
| move(位移/重排) | 200–300ms | ease-in-out（standard） | 列表重排、`inline-expand` 展开 |
| feedback(反馈) | ≤100ms | ease-out | 按下、hover、开关切换 |

### C.3 与 shadcn / Radix 动画的配合
- Radix 浮层(`Dialog` / `Sheet` / `Popover` / `Accordion`)暴露 `data-state="open|closed"` 与 `data-side`。
- 动效一律用 Tailwind 的 `data-[state=open]:animate-in` / `data-[state=closed]:animate-out` 配合上表 token 实现,**不自写并行动画系统**(沿用 **shadcn 组件变体体系(套件铁律基线)** 「变体只增不散」)。

### C.4 尊重 `prefers-reduced-motion`
- 必须提供回退:`@media (prefers-reduced-motion: reduce)` 下位移/缩放动画降级为「瞬时切换或极短 opacity 渐隐」。
- 关键的状态变更**保留**(可达性优先),纯装饰动效**关闭**。

### C.5 连续性 / 避免 CLS
- 加载用骨架屏占位(B 节)而非内容跳变。
- 图片/媒体预留宽高比。
- `inline-expand` / `drawer` 用尺寸过渡而非瞬间撑开,防止布局抖动(Cumulative Layout Shift)。

### C.6 逐元素动效标注模板

对**有动效的元素 / 浮层**,在 SKILL.md「模板 D · 可交互元素的交互规格」中追加一行动效标注:

```markdown
- **动效**:类型=<enter|exit|move|feedback>;时长=<token,如 enter-200ms>;
  缓动=<ease-out|ease-in|ease-in-out>;reduced-motion 回退=<瞬时切换 / opacity 渐隐 / 关闭装饰>
```

### C.7 全局 A.7 动效 token 基线

在 SKILL.md「模板 A · 全局信息架构」新增 **A.7 动效 token 基线**:登记四类时长/缓动 token(enter / exit / move / feedback)与 `prefers-reduced-motion` 全局策略;逐元素只标「用哪档 + 回退」,**不重复定义数值**。
