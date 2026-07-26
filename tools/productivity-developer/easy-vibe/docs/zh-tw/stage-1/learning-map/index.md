---
title: '從創意到 AI 產品 - Easy-Vibe 學習路線圖'
description: '學習 AI 程式設計完整路線圖：從零基礎到全棧開發。掌握 Vibe Coding、Claude Code、Cursor 等 AI IDE 工具，學會產品思維、全棧開發和 AI 能力整合。'
---

<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const relatedArticles = relatedArticlesMap['zh-tw/stage-1/learning-map'] ?? []
</script>

# 從創意到 AI 產品

::: info 特別感謝
特別感謝來自 **清華大學深圳國際研究生院** 的同學們對本課程的測試、反饋和支援！你們的意見和貢獻讓這門課程變得更好。[👉 檢視完整貢獻者名單](https://github.com/datawhalechina/easy-vibe#-contributing--contributors)
:::

以前做軟體，門檻很高：你要懂程式設計、懂演算法，還得有幾年的專案經驗。
現在不一樣了。只要你有想法，AI 就能幫你寫程式碼。

這是一個巨大的變化：**程式語言正在變成自然語言**。

大語言模型（LLM）的出現，讓開發不再是“技術大神的專屬”，而是變成了每個人都能上手的工具。曾經最難的是“怎麼寫程式碼”，現在最難的是“**你要做什麼**”。

> **什麼是 Vibe Coding？**
> 簡單說，就是“用說話來程式設計”。 氛圍程式設計的意思是你可以依賴只和 AI 對話，而不是直接寫程式碼的方式，來完成程式設計專案。

當然，讓 AI 寫出程式碼只是第一步。要做出一個真正能用的產品，你還會遇到這些問題：
- 怎麼讓 AI 寫出乾淨、能維護的程式碼？
- 怎麼把零散的程式碼拼成一個能跑的應用？
- 怎麼讓應用真正上線、被人用到？
- 怎麼把文字生成、影象識別這些 AI 能力裝進你的產品？

這些問題將在這門課中找到答案。

不管你是學生、老師、醫生、工人，還是任何一位對技術一竅不通的普通人——不用先學幾年程式設計，兩週時間就能做出能跑、能演示的產品原型。

| 你的身份 | 這門課能幫你 |
|---------|-------------|
| 學生 | 作業、比賽、創業，自己動手做專案，不再求人 |
| 職場人 | 把重複工作自動化，提升效率，甚至開發副業 |
| 產品經理 / 設計師 | 想法不再停留在紙面，能快速做出 Demo 給老闆/客戶看 |
| 創業者 / 中小企業主 | 低成本驗證想法，不用花幾萬塊找外包也能做出 MVP |
| 老師 / 教育工作者 | 製作教學工具、課件、自動化出題，提升教學效率 |
| 醫生 / 律師 / 專業工作者 | 把專業流程自動化，打造自己的效率工具 |
| 任何人 | 用 AI 解決生活/工作中的具體問題，讓不可能變成可能 |

AI 時代，執行力和想法永遠比技術更重要。

## 成長路徑：從“會用 AI”到“會做 AI 產品”

<div class="stage-intro">
  <div class="stage-card">
    <div class="stage-icon">🎮</div>
    <h3>新手入門</h3>
    <p class="stage-role">體驗 AI 程式設計</p>
    <div class="stage-tags">
      <span>貪喫蛇小遊戲</span>
      <span>零基礎上手</span>
      <span>Vibecoding 初體驗</span>
      <span>幾分鐘生成</span>
    </div>
  </div>
</div>

<div class="stage-grid">
  <div class="stage-card">
    <div class="stage-icon">🛠️</div>
    <h3>第一階段</h3>
    <p class="stage-role">產品經理 / 運營</p>
    <div class="stage-tags">
      <span>AI IDE (Cursor/Claude)</span>
      <span>需求拆解 & 原型</span>
      <span>接入 AI 能力</span>
      <span>完整 Demo 開發</span>
    </div>
  </div>
  <div class="stage-card">
    <div class="stage-icon">💻</div>
    <h3>第二階段</h3>
    <p class="stage-role">初中級開發 / 獨立開發者</p>
    <div class="stage-tags">
      <span>Figma 到程式碼</span>
      <span>Supabase 資料庫</span>
      <span>Stripe 支付整合</span>
      <span>Dify 知識庫</span>
    </div>
  </div>
  <div class="stage-card">
    <div class="stage-icon">🚀</div>
    <h3>第三階段</h3>
    <p class="stage-role">高階開發 / 架構師</p>
    <div class="stage-tags">
      <span>Web/小程式/多端</span>
      <span>MCP 高階工具</span>
      <span>RAG & LangGraph</span>
      <span>高階工程師思維</span>
    </div>
  </div>
</div>

<style>
.stage-intro {
  margin: 20px auto;
  max-width: 400px;
}

.stage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  margin: 16px 0;
}

.stage-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 12px;
  background-color: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
}

.stage-card:hover {
  transform: translateY(-2px);
  background-color: var(--vp-c-bg-mute);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  border-color: var(--vp-c-brand);
}

.stage-icon {
  font-size: 2rem;
  margin-bottom: 8px;
  line-height: 1;
}

.stage-card h3 {
  margin: 0 0 4px 0 !important;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.2;
}

.stage-role {
  margin: 0 0 8px 0 !important;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.stage-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
}

.stage-tags span {
  font-size: 0.7rem;
  padding: 1px 6px;
  border-radius: 3px;
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

.stage-card:hover .stage-tags span {
  background-color: var(--vp-c-bg);
  border-color: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand-dark);
}
</style>

透過這個完整的學習路徑，你將獲得：

- **Vibe Coding開發能力：** 熟練使用 vibecoding 思維和 AI 編碼工具，將開發效率提升數倍。不再需要死記硬背語法，而是學會如何引導 AI 生成高質量程式碼。
- **全棧開發技能：** 從 UI 設計到前端實現，從資料庫設計到 API 開發，從本地開發到雲端部署，掌握現代 Web 應用的完整技術棧。
- **AI 能力整合：** 學會呼叫各類多模態 AI API，將文字、影象、語音等 AI 能力無縫整合到你的應用中，並透過 RAG 等技術構建智慧化產品。
- **產品思維與運營能力：** 從使用者研究到需求拆解，從 MVP 設計到產品迭代，從支付整合到使用者管理，形成完整的產品開發與運營閉環。

# 學完能做什麼？

## 第一階段：做出你的第一個產品原型

這個階段適合完全沒程式設計基礎，或者只會一點點但不太自信的同學。你不用先學一堆理論知識，而是直接跟著做，在做的過程中學會用 AI 工具寫程式碼。

**學完你能**：
- 用 AI 程式設計工具獨立完成一個網頁應用
- 把產品想法變成能點選、能互動的原型
- 給原型加上 AI 功能（比如文生圖、智慧對話）
- 遇到報錯知道怎麼排查和解決

簡單說，就是能做出一個"能跑、能給別人演示"的東西。

我們可以先透過小遊戲感受 AI 程式設計，然後學會用 AI 程式設計工具幫你寫程式碼、改報錯。接著從簡單頁面開始，逐步做出能互動的多頁面應用，再加上文生圖、智慧對話這些 AI 功能。最後獨立完成一個完整專案，讓你的創意能夠真正擁有落地的可能。

# 為什麼要用專案制來訓練？

> **現實世界的挑戰**
>
> 原因其實很簡單：按照大多數同學現在的狀態，直接走入職場，很可能會在真實專案和老闆 / 客戶的“社會毒打”下寸步難行。現實世界更常見的場景是：

> 你的導師 / 老闆：我們要做一個 xxx，目標是達到 yyy 的效果。
>
> 文件？現成框架？詳細的需求說明？很多時候都不存在。

真實工作中的許多工，本質上就是在高度不確定的環境下解決從未見過的問題：需求是模糊的，邊界是變化的，沒人告訴你標準答案，你需要自己查資料、做實驗、搭原型、不斷迭代，最後給出一個“能跑、能用、能上線”的解決方案。

這門課想做的，就是在一個相對安全的環境裡，提前給你一次“模擬社會毒打”：

- 透過看似有一定難度的專案任務，迫使你練習拆解問題、設計方案、自己尋找資料
- 透過不那麼“傻瓜化”的腳手架和程式碼，讓你學會閱讀、理解和改造一份中大型程式碼庫
- 透過從創意到上線的完整閉環，讓你體驗真實產品從 0 到 1 的完整過程

短期來看，這種訓練確實比較折磨人；但從長期來看，它會極大提高你在求職和職業發展中的競爭力：你會更能扛事兒，更能在不確定環境中找到突破口，也更有能力把 AI 變成真正落地的產品，而不是停留在“玩玩 Demo”階段。

# 提問的藝術：AI 時代的必備技能

在 AI 時代，提問也屬於一種 “基本功”。同一份程式碼、同一個報錯，**你怎麼提問，幾乎決定了 AI 能給出怎樣的答案**：是泛泛而談，還是一步一步給出可落地的改法。

**養成好習慣**：把“向 AI 提問”當成日常開發流程的一部分：遇到不懂、卡住的問題就立刻問。

## 為什麼這是必備技能？

- **現實很少有完整文件**：更多時候你面對的是不清晰的需求、半成品程式碼、零散的錯誤資訊
- **AI 是你隨身的導師 + 同事**：會提問的人，能把它變成“高質量的結對程式設計”
- **能力上限由溝通決定**：你越能提供關鍵資訊、越能約束輸出格式，答案越可用

**常見誤區**：只問一句“為啥報錯？”通常只能得到一堆猜測。把上下文補齊，才會得到可執行的方案。

## 如何把資訊"餵給"AI：截圖 vs 複製貼上

兩種方式都可以，但用途不同：

| 方式         | 適用場景                                  | 關鍵要求                                  |
| ------------ | ----------------------------------------- | ----------------------------------------- |
| **複製貼上** | 報錯堆疊、日誌、程式碼、配置、API 返回      | 儘量完整，不要只截一行關鍵字              |
| **截圖**     | UI 佈局問題、互動異常、工具介面找不到按鈕 | 截全屏 + 標註重點區域，最好配一句文字說明 |

::: danger ⚠️ 重要前提
**並非所有 AI 都支援圖片輸入。** 截圖溝通需要 AI 具備多模態能力（即能夠理解和分析圖片）。目前支援圖片輸入的 AI 包括：Claude (Anthropic)、GPT-4V/GPT-4o (OpenAI)、Gemini (Google)、以及部分國產大模型如通義千問、文心一言等。

**如果你使用的 AI 不支援圖片輸入**，截圖將無法被識別，此時請改用複製貼上文字的方式溝通。
:::

## 讓 AI “解釋得很好”的提示詞技巧

如果你不是隻要答案，而是要“學會”答案。使用類似下面指令能顯著提升解釋質量：

> **學習型提問示例**
>
> - “請先用 5 句話講清楚這個概念，再給幾個問題提問我驗證我理解對了沒。”
> - ”請你詳細解釋一下這個報錯資訊，我不理解為什麼會報錯。”

# 堅持了好久還是搞不定，我想放棄了

也許是你堅持的方法不對。不要一個人在黑暗中硬撐，可以來跟作者和助教們聊聊：把你已經嘗試過的方法、遇到的具體卡點、和你目前的心理狀態，坦誠地說出來。很多時候，只要稍微調整一下方向、補上一個關鍵知識點，你就能繼續往前走。

# 我覺得教程有的設計不合理

歡迎隨時聯絡作者、提交 issue，或者在羣裡 / 課堂上直接反饋。我們非常希望和你一起把這套教程打磨得越來越好：哪裡不清晰、哪裡體驗不好、哪裡讓你白費力氣，都可以坦誠指出來。越真實、越具體的反饋，越能幫助後來者少踩坑。

# Reference

- [南京大學 電腦科學與技術系 計算機系統基礎 課程實驗](https://nju-projectn.github.io/ics-pa-gitbook/ics2025/)

<RelatedArticlesSection
  title="接下來可以學什麼"
  description="按“從會用 AI 到會做產品”的路線，繼續向前推進。"
  :items="relatedArticles"
/>
