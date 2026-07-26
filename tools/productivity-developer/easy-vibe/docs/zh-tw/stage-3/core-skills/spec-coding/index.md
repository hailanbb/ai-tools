# 從 Vibe Coding 到 Spec Coding：AI 程式的進化

> "Code is a lossy projection of intent."
> 代碼是意圖的有損投影。
> - Sean Grove, OpenAI, AI Engineer World's Fair 2025

## Spec Coding 的核心思想：一切皆 Markdown

在深入 Spec Coding 之前，先了解 Claude Code 的底層哲學：**一切皆 Markdown**。

在 Claude Code 的設計哲學中，流程記錄、資訊傳遞，甚至與模型的對話，都可以是 Markdown：

- **CLAUDE.md**：用於項目約定的 Markdown 文件
- **.claude/rules/**：分層的 Markdown 規則文件集合
- **specs/**：功能需求的 Markdown 描述
- **對話歷史**：Claude Code 的聊天記錄本身就是 Markdown 格式
- **AGENTS.md**：定義 Agent 行為的 Markdown 指令

這正是 Spec Coding 的核心：**規格本身就是代碼**。當你在 Markdown 中編寫需求、設計決策和驗收標準時，你已經在編寫「代碼」——AI 會讀取那份 Markdown，然後生成真正的實現。

Josh Beckman 對 Grove 演講的總結捕捉得恰到好處：

> "Software engineering (and lawmaking and legal review) is specification repair."
> 軟體工程（以及立法和法律審查）就是規格修復。

在 Claude Code 中，這個「規格修復」的過程是：**修改 Markdown -> AI 讀取 Markdown -> 生成/修改代碼 -> 驗證結果**。整個工作流程是 Markdown 驅動的。

---

## 1. Sean Grove 的「新代碼」：改變你思維方式的一場演講

2025 年，OpenAI 研究員 **Sean Grove** 在 AI Engineer World's Fair 上發表了一場名為 **「The New Code」** 的演講，震動了整個開發者社群。他提出了一個顛覆性的觀點：**70 年來我們一直在編寫代碼來解決問題，但代碼只是意圖的有損投影——規格才是真正的「新代碼」。**

那場演講催生了一種新的開發正規化：**Spec Coding**——讓規格文件而非代碼成為開發的核心產物，讓 AI 從規格生成代碼。

從 Grove 的演講出發，本文將幫助你理解 Spec Coding 的核心思想，回顧 Vibe Coding 的局限，並展示如何在實際開發中使用 Claude Code 應用這套方法論。

::: info 📚 你將學到什麼

1. 理解 Sean Grove「The New Code」演講中的關鍵思想
2. 掌握 Spec Coding 的核心概念和方法論
3. 認識 Vibe Coding 的價值和天花板
4. 學習如何在 Claude Code 中實踐 Spec Coding 工作流程
5. 掌握從 Vibe Coding 到 Spec Coding 的漸進式過渡策略

:::

---

## 1. Sean Grove 的「新代碼」：改變你思維方式的一場演講

2025 年，OpenAI 研究員 Sean Grove 在 AI Engineer World's Fair 上發表了名為 **「The New Code」** 的演講。這場演講被廣泛視為 Spec Coding 運動的思想起點。

Grove 此前創立了 OneGraph——一家 GraphQL 開發者工具公司，後被 Netlify 收購——現於 OpenAI 從事對齊推理工作，幫助將高層意圖轉化為可執行的規格和評估標準。

### 1.1 核心論點：代碼是意圖的有損投影

Grove 演講的核心概念可以概括為一句話：

> **Code is a lossy projection of intent.**
> 代碼是意圖的有損投影。

這是什麼意思？當你腦中有一個想法並將其轉化為代碼時，大量上下文在過程中丟失了——**為什麼**選擇這種方法、考慮了**哪些取捨**、以及**哪些約束條件**是重要的。最終的代碼只保留了「怎麼做」，而丟失了「為什麼應該這樣做」。

這就像把一本書壓縮成一條推文——資訊密度急劇下降，原始意圖大幅退化。

### 1.2 程式設計的本質是溝通

Grove 提出了一個簡單而深刻的觀點：

> "If you can communicate effectively, you can program."
> 如果你能有效溝通，你就能程式設計。

他認為，實際的編碼工作只佔開發的 **10-20%**。另外 80% 是圍繞需求和目標的**結構化溝通**——理解用戶想要什麼、與團隊在方案上達成共識、定義驗收標準、處理邊界情況。

這意味著程式設計能力的核心不是掌握某種語言的語法，而是**將模糊的意圖轉化為精確描述**的能力。

### 1.3 誰寫規格，誰就是程式設計師

這是 Grove 最具顛覆性的觀點：

> "Whoever writes the spec - be it a PM, a lawmaker, an engineer, a marketer - is now the programmer."
> 誰寫規格——不管是產品經理、立法者、工程師還是行銷人員——誰就是程式設計師。

隨著 AI 越來越擅長將規格轉化為代碼，**真正的程式設計工作**從「寫代碼」轉移到了「寫規格」。誰能最精確地表達意圖，誰就是最有價值的「程式設計師」。

### 1.4 規格可以有類似代碼的工具鏈

Grove 指出，規格可以像代碼一樣擁有完整的工具鏈：

> "Specs actually give us a very similar toolchain, but it's targeted at intentions rather than syntax."

- **組合**：規格可以是模組化、可組合的，就像代碼模組一樣
- **測試**：規格可以嵌入單元測試來驗證行為是否符合預期
- **Lint**：規格中的模糊語言可以被檢測出來，就像 linter 捕獲語法問題一樣
- **一致性檢查**：跨部門的規格可以進行一致性檢查，類似於類型檢查器

### 1.5 OpenAI Model Spec：活生生的證明

Grove 以 OpenAI 自己的 **Model Spec** 文件作為證據。

當 OpenAI 發現模型存在諂媚問題時，他們沒有重新訓練模型，而是**修改了規格文件**。這個變更自動傳播到整個系統中，問題就這樣被修正了。

這證明了一個關鍵點：**規格本身可以像可執行代碼一樣運作**。修改規格等同於修改行為，而無需觸碰任何一行傳統代碼。

Josh Beckman 對 Grove 演講的總結捕捉得恰到好處：

> "Software engineering (and lawmaking and legal review) is specification repair."
> 軟體工程（以及立法和法律審查）就是規格修復。

---

## 2. Spec Coding：規格即代碼

### 2.1 什麼是 Spec Coding

Spec Coding，也稱為 Spec-Driven Development (SDD)，是一種將**規格文件作為開發核心產物**的方法論。

核心理念是：**先把規格寫清楚，然後讓 AI 從規格生成代碼。規格是真相來源，代碼只是從它衍生出來的實現產物。**

Robert C. Martin 在《Clean Code》中的經典論述在 AI 時代有了新的意義：

> "Specifying requirements so precisely that a machine can execute them is programming."
> 將需求規格描述得足夠精確，使機器能夠執行，這就是程式設計。

### 2.2 Vibe Coding 與 Spec Coding 的對比

| 維度 | Vibe Coding | Spec Coding |
|------|------------|-------------|
| **方式** | 即興提示，反覆迭代 | 先寫完整規格，再生成代碼 |
| **最適合** | 原型、黑客松、探索 | 生產系統、團隊協作、企業工作 |
| **代碼品質** | 快速但脆弱 | 結構化、可測試、可審計 |
| **首次成功率** | 不穩定 | 目標 95%+ |
| **可複用性** | 一次性的提示 | 規格可跨項目複用 |
| **安全性** | 容易遺漏 | 在規格層面內建 |
| **文件** | 缺失或永遠落後 | 規格就是文件，始終保持更新 |
| **團隊協作** | 依賴個人提示技巧 | 共享規格，共享標準 |

兩者並不對立。正如 Brad Jolicoeur 指出的：

> "Clever engineers will even use vibe coding as a first step to generate the initial draft of a specification."
> 聰明的工程師甚至會用 vibe coding 作為第一步，來生成規格的初始草稿。

### 2.3 Spec Coding 的三層規格結構

Red Hat 的工程師總結了一個實用的三層規格模型：

**第一層：功能規格（What）**

用自然語言描述預期結果，回答「它應該做什麼」：

```markdown
## 用戶認證功能

### 用戶故事
- 作為新用戶，我想用信箱註冊
- 作為已註冊用戶，我想用信箱和密碼登入
- 作為忘記密碼的用戶，我想通過信箱重設密碼

### 驗收標準
- 註冊時驗證信箱格式和密碼強度
- 連續 5 次登入失敗後鎖定帳號 15 分鐘
- 密碼重設連結有效期為 30 分鐘
```

**第二層：語言無關規格（How - 架構層）**

定義資料結構、架構模式和安全性需求：

```markdown
## 技術設計

### 資料模型
- users 表：id, email, password_hash, created_at, locked_until
- sessions 表：id, user_id, token, expires_at

### API 設計
- POST /api/auth/register -> 201 Created
- POST /api/auth/login -> 200 OK + JWT
- POST /api/auth/reset-password -> 202 Accepted

### 安全性需求
- 密碼使用 bcrypt，cost factor >= 12
- JWT 15 分鐘過期，refresh token 7 天過期
- 所有端點啟用速率限制
```

**第三層：語言特定規格（How - 實現層）**

版本需求、測試框架和文檔標準：

```markdown
## 實現約束

### 技術棧
- 運行時：Node.js 20+
- 框架：Express 5
- ORM：Prisma
- 測試：Vitest

### 代碼約定
- 使用 TypeScript 嚴格模式
- 錯誤處理使用自定義 AppError 類
- 所有 API 端點需要 JSDoc 註釋
```

---

## 3. 在 Claude Code 中實踐 Spec Coding

理解了理論之後，下一個問題是如何在 Claude Code 中應用。Claude Code 的設計哲學天然契合 Spec Coding——它的 `CLAUDE.md`、Rules 目錄和 `/plan` 命令都是規格驅動開發的形式。

當 OpenAI 自己使用 Codex 構建項目時，也使用類似的模式：用 `AGENTS.md` 文件作為規格來指導 AI Agent。他們的核心經驗是：**當 Agent 遇到困難時，將其視為信號——找出缺少了什麼，是工具、防護措施還是文檔，然後將其添加到倉庫中**。這與 Spec Coding 完全一致：規格是活文件，應該持續演化。

Augment Code 的研究也支援同樣的結論：**可執行規格保持準確，是因為 AI Agent 直接從它們生成代碼，形成了一種強制機制——過時的規格會產生有缺陷的實現**。這意味著規格不會像傳統文件那樣腐爛。

### 3.1 第一步：使用 `CLAUDE.md` 建立項目規格

`CLAUDE.md` 是你項目的「活規格」。每次 Claude Code 啟動時都會讀取這個文件，相當於給 AI 一份持久的項目手冊。

在之前的章節 [Claude Code 快速入門核心指南](../basics/) 中，我們已經學習了如何創建 `CLAUDE.md`。在 Spec Coding 的語境下，它的作用更加重要——**它不僅僅是一個配置文件，而是項目規格的入口**。

LogRocket 的工程師強調，**紮實的上下文對 AI Agent 至關重要，因為它能防止幻覺和低效**。沒有規格，AI Agent 可能對項目進行大量不受控制的修改。`CLAUDE.md` 是提供那種「紮實上下文」的第一道防線。

```markdown
# 電商項目規格

## 項目定位
面向中小型商戶的 SaaS 電商平台，支援多店鋪、多支付管道。

## 架構決策
- 前後端分離，API-first 設計
- 微服務後端架構，服務間通過訊息佇列通訊
- 讀寫資料庫分離

## 核心約束
- 所有金額以整數（分）存儲，避免浮點精度問題
- 訂單狀態機必須嚴格遵循：待付款 -> 已付款 -> 已出貨 -> 已完成
- 支付相關端點必須冪等
```

Aviator 團隊總結了規格應該捕獲的關鍵資訊——這也正是你的 `CLAUDE.md` 應該涵蓋的：

- 輸入和輸出格式及資料類型
- 業務規則和邊界情況
- 系統依賴和約束
- 性能和可擴展性需求
- 錯誤處理和安全性需求

### 3.2 第二步：使用 Rules 目錄管理分層規格

隨著項目成長，單一的 `CLAUDE.md` 將不夠用。這時，使用 `.claude/rules/` 目錄來組織分層規格。

這正是 Augment Code 所說的「可執行規格」概念：**規格不是靜態文件，而是被 AI Agent 直接消費的活指令**。當你將規則拆分到 Rules 目錄時，每個規則文件只在相關文件被編輯時才載入，既節省 token 又保持精確度。

Tessl 的工程師發現，將需求拆分為結構化文件——用 PRD 定義「做什麼和為什麼」，用技術規格定義「怎麼做」——有助於防止 AI 在長對話中累積混亂，並顯著提高輸出一致性。

```text
.claude/rules/
├── 00-architecture.md      # 架構規則（全局）
├── 01-security.md          # 安全規則（全局）
├── 10-api-design.md        # API 設計規則
├── 11-frontend-patterns.md # 前端模式規則
├── 12-database.md          # 資料庫規則
└── 20-testing.md           # 測試規則
```

每個規則文件可以通過 frontmatter 指定其作用範圍：

```markdown
---
globs:
  - "src/api/**/*.ts"
  - "src/services/**/*.ts"
---

# API 設計規則

## 路由設計
- RESTful 風格，使用複數名詞：/api/v1/orders
- 巢狀資源最多兩層：/api/v1/users/123/orders

## 回應格式
- 成功：{ data, pagination? }
- 失敗：{ error: { code, message, details? } }

## 必須遵循
- 所有寫操作需要認證
- 所有列表端點必須支援分頁
- 敏感操作必須寫審計日誌
```

這樣，當 Claude Code 編輯 API 相關文件時，它會自動載入這個規格，確保生成的代碼遵循標準。

### 3.3 第三步：使用 `/plan` 實現 Specify -> Plan -> Tasks -> Implement

標準的 Spec Coding 工作流程是一個四階段循環。GitHub Spec Kit 將其標準化為 Specify -> Plan -> Tasks -> Implement，而 Claude Code 的 `/plan` 命令天然支援這個流程。

SpecThis 團隊強調了一個關鍵原則：**在 Agent 運行之前定義邊界——在任何代碼變更發生之前就清楚知道應該改變什麼**。這正是 `/plan` 的價值所在。

**階段一：Specify**

先寫清楚你要構建什麼。不要急著寫代碼：

```text
/plan
我需要實現訂單退款功能。規格如下：

功能需求：
- 用戶可以在出貨前申請全額退款
- 出貨後 7 天內，用戶可以申請退貨退款
- 退款需要管理員審批

驗收標準：
- 退款金額不能超過訂單實際支付金額
- 退款狀態機：已申請 -> 已審批 -> 退款中 -> 已退款
- 退款完成後恢復庫存
- 全流程記錄每一個操作
```

**階段二：Plan**

Claude 會根據你的規格生成技術計劃：

```text
📋 退款功能實現計劃

1. 資料模型設計
   - 創建 refunds 表
   - 在訂單狀態機中添加退款相關狀態

2. API 設計
   - POST /api/orders/:id/refund - 申請退款
   - PUT /api/refunds/:id/approve - 審批退款
   - GET /api/refunds - 退款列表

3. 業務邏輯
   - 退款資格檢查
   - 退款金額計算
   - 庫存恢復邏輯

4. 整合
   - 對接支付供應商的退款 API
   - 發送退款通知
```

**階段三：Tasks**

將計劃拆分為可獨立執行的小任務，並為每個任務設定明確的完成標準。

**階段四：Implement**

逐一實現每個任務，完成後驗證。

### 3.4 真實範例：用 Spec Coding 構建用戶通知系統

讓我們用一個完整範例來對比 Vibe Coding 和 Spec Coding。Orchestrator.dev 的數據顯示，在 2025 年 Stack Overflow 調查中，84% 的開發者使用或計劃使用 AI 工具，但只有 22% 對結果滿意，46% 認為準確性有問題。Spec Coding 正是縮小這個滿意度差距的關鍵。

**Vibe Coding 的做法：**

```text
你：做一個通知功能
AI：[立即開始寫代碼，生成一個簡單的通知列表]

你：要支援已讀和未讀
AI：[修改代碼，添加了 read 欄位]

你：還需要多種通知類型
AI：[又改了一遍，添加了 type 欄位]

你：還要能推播到手機
AI：[大改，之前的結構已經不太合適了...]
```

結果：四輪修改下來，架構被反覆推翻，代碼越改越亂。

**Spec Coding 的做法：**

先寫一份規格文件 `specs/notification.md`：

```markdown
# 用戶通知系統規格

## 功能需求
1. 支援三個管道：應用內通知、信件通知、推送通知
2. 通知類型：系統公告、訂單狀態、促銷活動、安全警報
3. 用戶可以按管道和類型配置通知偏好
4. 支援已讀/未讀狀態和批量標記已讀

## 資料模型
- notifications 表：id, user_id, type, channel, title, content,
  is_read, created_at
- notification_preferences 表：user_id, type, channel, enabled

## API 設計
- GET /api/notifications?type=&is_read= - 獲取通知列表（分頁）
- PUT /api/notifications/:id/read - 標記已讀
- PUT /api/notifications/read-all - 全部標記已讀
- GET /api/notification-preferences - 獲取偏好設置
- PUT /api/notification-preferences - 更新偏好設置

## 驗收標準
- 未讀通知數即時更新
- 通知列表支援無限滾動
- 推送通知延遲 < 3 秒
- 偏好變更立即生效
```

然後在 Claude Code 中：

```text
@specs/notification.md
按照這份規格實現用戶通知系統。
先從資料模型開始，然後實現 API，最後構建前端組件。
每個模組完成後暫停，我確認後再繼續。
```

結果：一次落地，架構清晰，無需反覆推倒重來。

### 3.5 用 Superpowers 加強 Spec Coding

在前一章 [工程級開發的 Superpowers](../superpowers/) 中，我們學習了 Superpowers 技能系統。Spec Coding 和 Superpowers 是天然的合作夥伴：

| Spec Coding 階段 | 對應的 Superpowers 技能 |
|------------------|---------------------|
| 定義規格 | `brainstorming` - 用蘇格拉底式提問澄清需求 |
| 技術規劃 | `writing-plans` - 將規格拆分為小任務 |
| 增量實現 | `test-driven-development` - TDD 紅綠重構 |
| 品質驗證 | `code-review` + `verification-before-completion` |

**組合使用範例：**

```text
@specs/notification.md
按照這份規格用 TDD 實現通知系統，
完成後幫我做 Code Review
```

這條指令同時啟動了 Spec Coding 工作流程和 TDD、Code Review 等 Superpowers 技能，形成了完整的工程級開發流程。

### 3.6 規格的版本控制和持續演化

Vibe Coding Substack 提出了一個重要觀點：**Specs are now code**。如果規格就是代碼，那麼它們就應該像代碼一樣被管理：

- **版本控制**：將規格文件放入 Git，與代碼一起提交
- **變更追蹤**：規格的每次修改都有提交記錄，知道誰改了什麼、為什麼改
- **Code Review**：規格的變更也應該通過 PR 審核，確保團隊保持一致
- **CI 整合**：規格變更觸發自動化測試，驗證實現是否仍然符合規格

在 Claude Code 中，這意味著你的 `CLAUDE.md`、`.claude/rules/` 和 `specs/` 目錄都應該進行版本控制。Robomotion 的經驗是，**將規格與實現一起版本化可以防止偏離，並保持一切可審計**。

OpenAI 的 Harness Engineering 實踐也證實了這一點：他們的 `AGENTS.md` 文件本身就是由 Codex 編寫的，並且隨著項目演進持續更新。當 Agent 遇到困難時，修復方式不是直接改代碼，而是**讓 Codex 更新規格本身**——形成了規格的自我修復循環。

---

## 4. 混合策略：從 Vibe 漸進到 Spec

業界共識不是「拋棄 Vibe Coding」，而是**在正確的場景選擇正確的方法**。

### 4.1 何時使用 Vibe Coding

- 驗證想法是否可行，30 分鐘內構建原型
- 探索不熟悉的技術或框架
- 黑客松或內部展示
- 一次性腳本或工具

### 4.2 何時使用 Spec Coding

- 生產功能開發
- 多人協作項目
- 需要長期維護的代碼
- 安全、支付、數據等敏感領域
- API 設計和系統整合

### 4.3 推薦的漸進式工作流程

**階段一：Vibe 探索**

使用 Vibe Coding 快速驗證想法。先不寫規格，也不用擔心代碼品質：

```text
做一個簡單的通知彈窗，看看感覺如何
```

**階段二：整理規格**

確認可行性後，將探索過程中學到的東西整理成規格。你甚至可以讓 AI 幫忙：

```text
基於我們剛才構建的通知功能原型，
幫我整理一份正式的功能規格文件，
包括資料模型、API 設計和驗收標準
```

**階段三：用 Spec 重建**

基於那份規格，使用 Spec Coding 重新實現生產級版本：

```text
@specs/notification.md
按照規格從零實現，不要參考之前的原型代碼
```

這個工作流程的優勢很明顯：**用 Vibe Coding 的速度驗證方向，用 Spec Coding 的品質交付產品**。

Robomotion 總結得很好：

> "The spec is the source of truth. The AI generated output is the draft implementation. Validation is not optional."
> 規格是真相來源。AI 生成的輸出是草稿實現。驗證不是可選的。

---

## 5. 常見問題

### Q1：Spec Coding 會不會太慢？

寫規格確實需要前期投入。但 Greg Ceccarelli 的團隊用 Spec Coding 以**三個人四週**交付了一個完整的 macOS 產品——這在傳統開發中幾乎不可能。

前期花在寫規格上的時間，會通過後期更少的返工、更少的 bug 和更低的溝通成本而回收。

### Q2：規格應該寫多詳細？

Robomotion 的建議是：**高品質的規格可以只有一頁**。重要的是它是否回答了這八個問題：

1. 我們在自動化什麼？
2. 輸入是什麼？
3. 輸出是什麼？
4. 有哪些約束？
5. 失敗模式有哪些？
6. 安全性需求是什麼？
7. 性能需求是什麼？
8. 什麼測試能證明它有效？

### Q3：如果 AI 只做規格裡寫的東西，漏掉了「顯而易見」的功能怎麼辦？

這確實是 Spec Coding 的一個限制。GitHub Spec Kit 用戶的反饋是，AI 會**「精確且僅僅」**做規格裡寫的事情。

解決方案是在規格中添加「非功能性需求」部分，在那裡列出常見的期望，例如錯誤處理、日誌記錄和無障礙性。或者在 `CLAUDE.md` 中設置全局規則。

### Q4：小項目也需要 Spec Coding 嗎？

不需要。Spec Coding 最適合：

- 生產級項目
- 團隊協作項目
- 需要長期維護的項目

對於快速原型、一次性腳本和學習實驗，Vibe Coding 更合適。

### Q5：如何讓團隊接受 Spec Coding？

先從一個小功能開始試點。讓團隊看到 Spec Coding 如何減少返工、提高首次成功率。Stack Overflow 2025 調查顯示，84% 的開發者使用或計劃使用 AI 工具，但只有 22% 對結果滿意——Spec Coding 正是提高那個滿意度的關鍵。

---

## 6. 總結

從 Vibe Coding 到 Spec Coding 不是一場革命，而是一次進化。

Sean Grove 在「The New Code」中說得很清楚：**70 年來我們一直在編寫代碼來解決問題；現在我們應該編寫規格來生成代碼**。代碼是意圖的有損投影，而規格可以完整捕捉意圖、上下文和約束。

對於使用 Claude Code 的開發者來說，這種轉變已經在發生：

- 你寫的 `CLAUDE.md` 就是你項目的規格
- 你配置的 Rules 目錄就是你的分層規格系統
- 你用 `/plan` 做的規劃就是 Specify -> Plan -> Tasks 流程
- 結合 Superpowers 中的 TDD 和 Code Review，你就有了完整的 Spec Coding 工作流程

**關鍵要點：**

- Vibe Coding 適合探索和原型，Spec Coding 適合生產和協作
- 規格是真相來源，代碼是從它衍生出的實現產物
- 寫規格的能力 = 程式設計能力，溝通能力比語法能力更重要
- 從小處開始：只要把 `CLAUDE.md` 寫好，你已經邁出了進入 Spec Coding 的第一步

::: tip 💡 下一步
在下一章中，我們將學習如何使用 Claude Code 的 Agent Teams 能力，讓多個 AI 實例如同一個真正的開發團隊一樣協作。
:::

---

## 參考資料

### 與 Sean Grove「The New Code」演講相關

- [Code is just a lossy projection of intent — The Decoder](https://the-decoder.com/code-is-just-a-lossy-projection-of-intent-according-to-openai-researcher-sean-grove/)
- [The End of Coding? How Specifications Are Becoming the New Source Code — Implicator](https://www.implicator.ai/the-end-of-coding-how-specifications-are-becoming-the-new-source-code/)
- [OpenAI: Intent, Not Code, Drives Future Software Development — AI Tech Suite](https://www.aitechsuite.com/ai-news/openai-intent-not-code-drives-future-software-development)
- [Note on The New Code — Josh Beckman](https://www.joshbeckman.org/notes/914234100)
- [Full Transcript of "The New Code"](https://lawwu.github.io/transcripts/8rABwKRsec4.html)

### Spec Coding 方法論

- [How spec-driven development improves AI coding quality — Red Hat](https://developers.redhat.com/articles/2025/10/22/how-spec-driven-development-improves-ai-coding-quality)
- [Spec-Driven Development with AI: Complete 2025 Guide — Dplooy](https://www.dplooy.com/blog/spec-driven-development-with-ai-complete-2025-guide)
- [Spec-Driven Development: Building Production-Ready Software with AI — Orchestrator.dev](https://orchestrator.dev/blog/2025-12-16-spec_driven_dev_article)
- [Agents Code but the Problem of Clear Specification Remains — Greg Ceccarelli](https://www.gregceccarelli.com/writing/beyond-code-centric)

### Vibe Coding vs. Spec Coding

- [Vibe Coding vs Spec Driven — Cosmo Edge](https://cosmo-edge.com/vibe-coding-vs-spec-driven-ai-development/)
- [Master AI in Software Engineering: Vibe vs. Spec Coding — Brad Jolicoeur](https://bradjolicoeur.com/article/ai-software-engineering-vibe-spec-prompting)
- [From Vibe Coding to Spec-Driven Development — Tessl](https://tessl.io/blog/from-vibe-coding-to-spec-driven-development/)
- [Spec First Approach for Enterprise — Robomotion](https://robomotion.io/blog/spec-first-approach-the-way-to-adapt-vibe-coding-for-enterprise-work)

### 工具和實踐

- [GitHub Spec Kit vs Vibe Coding — Ossels](https://ossels.ai/github-spec-kit-spec-driven-development/)
- [A Spec-First Workflow for Agentic AI — LogRocket](https://blog.logrocket.com/spec-first-workflow-agentic-ai/)
- [Specs Are Now Code — The Vibe Coding Substack](https://thevibecoding.substack.com/p/specs-are-now-code)
- [Harness Engineering — Martin Fowler](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html)
- [Spec-Driven Development & AI Agents Explained — Augment Code](https://www.augmentcode.com/guides/spec-driven-development-ai-agents-explained)
- [Spec-Driven Development: The Key to Scalable AI Agents — Aviator](https://www.aviator.co/blog/spec-driven-development/)
