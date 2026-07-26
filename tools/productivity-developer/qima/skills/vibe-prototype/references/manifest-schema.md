# manifest.json 字段定义与 status 状态机(references)

本文件是 `vibe-prototype` 第 4 步「维护 manifest」的细节支撑:`prototypes/manifest.json` 是**页面ID ↔ Stitch screenId ↔ 文件 ↔ 状态的单一事实源**。

## manifest.json 字段定义

| 字段 | 类型 | 必需 | 说明 |
|---|---|---|---|
| `source` | object | 是 | 上游来源指针,含三子键:`design`(指向 `design.md`,视觉准则 / 视觉权威)、`interaction`(指向 `interaction.md`,元素 / 状态)与 `architecture`(指向 `architecture.md`,数据 / 接口依据),记录本台账对齐到的上游产物 |
| `source.design` | string | 是 | 视觉准则文档路径,固定 `design.md`(由 vibe-design 产出的视觉设计系统;Stitch 原始 tokens 见 `prototypes/stitch-design-system.md` 或已并入本视觉准则) |
| `source.interaction` | string | 是 | 交互文档路径,固定 `interaction.md` |
| `source.architecture` | string | 是 | 技术骨架文档路径,固定 `architecture.md`(由 vibe-architecture 产出,提供数据 / 接口依据,只引用) |
| `stitchProjectId` | string | 是 | Stitch 端 project 的 ID,所有 screens 都生成在这一个 project 下 |
| `pages` | array | 是 | 页面记录数组,每个元素对应一个页面ID |
| `pages[].pageId` | string | 是 | **主键**;与 interaction.md 的页面ID **逐字符一致**(kebab slug),**文件名直接用 pageId** |
| `pages[].screenId` | string | 是 | Stitch 端该页对应 screen 的 ID(由 Stitch 生成、不可控);页面ID ↔ screenId 的映射就靠这里维护 |
| `pages[].html` | string | **是(必需)** | 主产物 HTML 路径,`prototypes/<pageId>.html` |
| `pages[].png` | string | 否(可选) | 可选截图路径,`prototypes/<pageId>.png`,即该 HTML 的视觉速览;无截图可省略 |
| `pages[].prompt` | string | 是 | 该页生成 prompt 路径,`prototypes/prompts/<pageId>.md` |
| `pages[].subStates` | array | 否 | 子态名数组(弹窗 / 抽屉等),元素形如 `<pageId>--<子态名>`(双连字符);无子态可为空数组或省略 |
| `pages[].status` | string | 是 | 该页状态,取六态之一(见下「status 状态机」) |
| `pages[].lastPulled` | string | 是 | 最后一次拉取时间,**ISO 8601** 格式(如 `2026-06-01T11:30:00Z`) |

**必需 / 可选小结**:`html` 必需(主产物),`png` 可选(视觉速览)。`pageId` 与 interaction.md 页面ID 逐字符一致,**落盘文件名直接用 pageId**,不做任何改写;Stitch 的 `screenId` 不可控,只在 manifest 里做映射、不进文件名。

## 完整 manifest.json 示例

```json
{
  "source": { "design": "design.md", "interaction": "interaction.md", "architecture": "architecture.md" },
  "stitchProjectId": "proj_7c21be",
  "pages": [
    {
      "pageId": "order-list",
      "screenId": "scr_a18d2c",
      "html": "prototypes/order-list.html",
      "png": "prototypes/order-list.png",
      "prompt": "prototypes/prompts/order-list.md",
      "subStates": ["order-list--filter-drawer"],
      "status": "aligned",
      "lastPulled": "2026-06-01T11:30:00Z"
    },
    {
      "pageId": "order-detail",
      "screenId": "scr_3f9a07",
      "html": "prototypes/order-detail.html",
      "png": "prototypes/order-detail.png",
      "prompt": "prototypes/prompts/order-detail.md",
      "subStates": ["order-detail--cancel-dialog"],
      "status": "mismatch",
      "lastPulled": "2026-06-01T11:32:00Z"
    },
    {
      "pageId": "settings-notification",
      "screenId": null,
      "html": "prototypes/settings-notification.html",
      "prompt": "prototypes/prompts/settings-notification.md",
      "status": "pending",
      "lastPulled": null
    }
  ]
}
```

> 示例说明:`order-list` 已校验通过(`aligned`,含一个 subState);`order-detail` 元素对不上(`mismatch`,待回画布修正,故无 `png` 也可,但此处保留);`settings-notification` 已写 prompt 未生成(`pending`,`screenId` / `png` / `lastPulled` 暂空)。

## status 状态机

六态及含义、流转方向(与第 5 步三铁律一致):

| status | 含义 |
|---|---|
| `pending` | 已写 prompt,**未生成**(画布里还没这页) |
| `generated` | 画布**已生成**,**未拉取**到本地 |
| `pulled` | 已落盘,**未校验** |
| `aligned` | **校验通过**(三铁律全过) |
| `mismatch` | 校验有**差异**(元素对不上) |
| `orphan` | 原型**多余**,文档里无此页(映射不回任何页面ID) |

### 正常流转链

```
pending  →  generated  →  pulled  →  aligned
(写好prompt)  (画布生成)   (拉取落盘)   (校验通过·放行候选)
```

### 异常分支与回退去向(对齐三铁律)

- **无遗漏铁律**:interaction.md 有页面但 manifest 无 `aligned` 记录 → 标 `pending` / `generated`,列入待生成清单,用户回画布补齐 → 重新走 `pulled → aligned`。
- **无多余铁律**:某 screen 映射不回任何页面ID → 标 `orphan`;去向二选一:① 它对应 interaction.md 漏写的页面 → 回第 1 步补文档,再走正常流转;② 是废弃 screen → 从 project 删除或忽略。
- **元素一致铁律**:原型 HTML 关键元素与 interaction.md 元素清单对不上 → 标 `mismatch`;按不一致处理决策树修正(改 prompt 重生成 / 回补 interaction.md),重新校验后回到 `aligned`。

**放行门**:只有当 `pages[]` 中**全部页面 `status=aligned`**(且逐页符合 design.md 视觉准则)时才放行到 ⑥ vibe-implement;任一页非 `aligned` 或视觉不合规,卡门、拒绝声明完成。
