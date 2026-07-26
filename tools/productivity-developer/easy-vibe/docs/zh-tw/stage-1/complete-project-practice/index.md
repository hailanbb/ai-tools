---
title: '完整專案實戰 - 從 Demo 到產品級原型'
description: '走出 Demo 階段，學習如何完善產品鏈路、構建逼真的模擬資料、透過反饋快速迭代，最終完成一個可展示、可互動的完整 AI 產品原型。'
---

<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const duration = '約 <strong>3 天</strong>'
const relatedArticles =
  relatedArticlesMap['zh-tw/stage-1/complete-project-practice'] ?? []
</script>

# 初級五：完整專案實戰

## 章節導讀

<ChapterIntroduction :duration="duration" :tags="['產品思維', '模擬資料', '互動完善', 'LocalStorage']" coreOutput="1 個功能完備的 AI 產品原型" expectedOutput="包含完整鏈路與真實資料的 Web 應用">

上一章接入了 AI 能力，Demo 能跑起來了，但離真正的"產品"還<strong>差得遠</strong>：頁面一重新整理<strong>資料就沒了</strong>，報錯就<strong>白屏</strong>，列表裡只有"測試資料 1、測試資料 2"，使用者點錯了也<strong>沒法撤銷</strong>...

這一章要把這些<strong>坑都填上</strong>：我們會<strong>補全產品的完整鏈路</strong>，用 AI 生成<strong>逼真的業務資料</strong>替代假資料，加上<strong>錯誤處理和使用者反饋</strong>，最後打磨出一個<strong>拿得出手、能給別人演示</strong>的完整原型。

這是初級階段的<strong>最後一章</strong>，走完這一步，你就完成了從"完全不會程式設計"到"<strong>能獨立做出 AI 產品原型</strong>"的蛻變。

</ChapterIntroduction>

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: '完善鏈路', description: '從單點功能到完整閉環' },
      { title: '注入靈魂', description: '模擬真實業務資料' },
      { title: '反饋迭代', description: '基於真實反饋修補體驗' },
      { title: '最終大作業', description: '你的畢業設計' }
    ]" />
  </ClientOnly>
</div>

## 1. 拒絕 "Happy Path"：完善核心鏈路

很多初學者做原型，往往只做“Happy Path”（最理想的路徑）：使用者點選 -> API 響應成功 -> 顯示結果。
但在真實世界裡，事情往往沒那麼順利。為了讓你的原型看起來像個真正的產品，你需要考慮以下幾個“隱形”的環節。

### 1.1 增加“等待”與“反饋”

當使用者點選“生成文案”時，AI 往往需要幾秒鐘才能響應。如果介面毫無反應，使用者會以為程式壞了。
**你需要讓 AI IDE 幫你加上 Loading 狀態：**

> 提示詞示例：
> “當我點選生成按鈕時，請把按鈕變成‘生成中...’並不可點選，同時在右側區域顯示一個載入動畫。直到 API 返回結果後，再恢復正常。”

### 1.2 處理“失敗”與“異常”

API Key 可能會過期，網路可能會斷開。
**你需要讓 AI IDE 幫你處理報錯：**

> 提示詞示例：
> “如果 API 請求失敗了，不要直接在控制檯報錯，請在頁面頂部彈出一個紅色的提示框（Toast），告訴使用者‘生成失敗，請稍後重試’，並允許使用者重新點選生成。”

### 1.3 對話歷史持久化

在與 AI 互動的過程中，我們需要儲存對話內容，讓使用者能夠回顧歷史、繼續之前的交流。目前階段我們暫不引入資料庫，可以選擇以下輕量級方案：

**儲存方案選擇：**

| 方案             | 適用場景                         | 特點                                 |
| ---------------- | -------------------------------- | ------------------------------------ |
| **LocalStorage** | 純前端專案，使用者資料儲存在瀏覽器 | 實現簡單，重新整理不丟失，無法跨裝置同步 |
| **JSON 檔案**    | 本地原型，資料以檔案形式儲存     | 結構清晰，便於除錯，可手動編輯       |
| **TXT 檔案**     | 最簡方案，快速記錄文字內容       | 格式自由，相容性好                   |

**對話內容示例：**
儲存的對話歷史通常包含以下內容：

```json
[
  {
    "role": "user",
    "content": "幫我生成一款藍芽耳機的抖音帶貨文案",
    "timestamp": "2026-01-20 10:30:00"
  },
  {
    "role": "assistant",
    "content": "【藍芽耳機種草文案】\n\n🎧 告別延遲，沉浸式聽歌體驗\n\n姐妹們！這款藍芽耳機真的太絕了👇\n\n✅ 40dB主動降噪，瞬間進入音樂世界\n✅ 30小時超長續航，一週通勤不用充電\n✅ 通話清晰如面對面，地鐵嘈雜也能聊\n✅ 半入耳設計，久戴不痛不悶耳\n\n💰 限時優惠，點選下方連結入手！",
    "timestamp": "2026-01-20 10:30:05"
  }
]
```

**實現提示詞：**

> “請幫我實現對話歷史的儲存功能。支援將使用者和 AI 的對話記錄儲存為 JSON 檔案（或使用 LocalStorage）。每次進入頁面時自動載入歷史對話，支援檢視和刪除單條對話記錄。”

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="1" :items="[
      { title: '完善鏈路', description: '從單點功能到完整閉環' },
      { title: '注入靈魂', description: '模擬真實業務資料' },
      { title: '反饋迭代', description: '基於真實反饋修補體驗' },
      { title: '最終大作業', description: '你的畢業設計' }
    ]" />
  </ClientOnly>
</div>

## 2. 注入靈魂：模擬真實資料 (Mock Data)

一個空蕩蕩的頁面是無法打動人的。想象一下，你向別人展示“電商素材工作臺”，結果歷史記錄裡空空如也，或者只有一行 "test / test / test"。
為了讓演示效果最佳，我們需要“偽造”一些逼真的資料，讓你的原型看起來像一個已經運營了半年的真實產品。

### 2.1 讓 AI 幫你設計資料結構

我們不需要自己去想每一個欄位叫什麼（比如是叫 `name` 還是 `title`），這件事完全可以交給 AI。

你只需要告訴 AI 你的**業務場景**：

> **提示詞示例：**
> “我正在做一個**抖音電商素材工作臺**的原型。
> 請幫我設計一個 JSON 資料結構，用來描述一個‘商品任務’。
> 這個任務應該包含：商品的基本資訊（名字、類目）、輸入的素材（圖片連結）、以及 AI 生成的結果（標題、文案、海報圖）。
> 請直接給我一個 JSON 示例。”

AI 會根據你的描述，自動幫你構思出類似 `productName`, `generatedContent` 這樣的欄位。

### 2.2 讓 AI 批次生產“逼真”資料

有了資料結構後，下一步就是讓 AI 幫你“填空”，生成一批看起來真實的資料。

**提示詞技巧：**
你不能只告訴 AI “幫我生成資料”，你需要像給實習生布置任務一樣，告訴它**業務背景**和**內容要求**：

- **業務背景**：告訴 AI 我們是做“抖音電商”的，所以商品標題要吸睛（比如“顯瘦神器”、“學生黨必入”），文案要口語化。
- **圖片要求**：為了讓原型好看，圖片不能是黑白的佔位符，最好是隨機的彩色風景或實物圖。

> **提示詞示例：**
> “請基於剛才設計的結構，幫我生成 10 條逼真的模擬資料。
> （備註：不一定要 JSON 格式。如果你正在寫前端，可以讓它直接生成 JavaScript 陣列；如果你用 Python，可以讓它生成 List。）
>
> **業務場景要求**：
>
> 1. 假設這是一家綜合百貨店，商品涵蓋‘女裝’、‘數碼’、‘美妝’三個類目。
> 2. **生成的標題和文案要非常‘抖音風’**：比如標題要包含 Emoji (🔥, ✨)，文案要用‘絕絕子’、‘親測好用’這種語氣。
> 3. **圖片欄位**：請統一使用 `https://picsum.photos/seed/{random_id}/300/400` 這個格式，確保每張圖都不一樣。”

**生成的 Mock Data 示例：**

```javascript
export const mockProductTasks = [
  {
    id: 'task_001',
    name: '夏季法式復古碎花裙',
    status: 'completed',
    input: {
      category: '女裝',
      features: ['收腰', '顯瘦', '氣質'],
      originalImage: 'https://picsum.photos/seed/dress_input/300/400'
    },
    output: {
      generatedTitle: '✨誰穿誰好看！這條法式碎花裙真的絕絕子🔥',
      generatedCopy:
        '姐妹們！這條裙子真的太顯瘦了！收腰設計絕了，穿上立馬有腰身。面料很透氣，夏天穿完全不悶。約會逛街首選！👗',
      generatedPosterImage: 'https://picsum.photos/seed/dress_output/300/400'
    },
    createdAt: '2026-01-20T10:00:00Z'
  },
  {
    id: 'task_002',
    name: '超強降噪藍芽耳機 Pro',
    status: 'completed',
    input: {
      category: '數碼',
      features: ['降噪', '超長續航', '低延遲'],
      originalImage: 'https://picsum.photos/seed/tech_input/300/400'
    },
    output: {
      generatedTitle: '🎧 終於被我找到了！這款耳機降噪太強了吧！🔇',
      generatedCopy:
        '戴上它，世界瞬間安靜了。音質絕佳，聽歌就像在現場。續航也很給力，充一次電用一週！學生黨必入！',
      generatedPosterImage: 'https://picsum.photos/seed/tech_output/300/400'
    },
    createdAt: '2026-01-21T14:30:00Z'
  }
  // ... 更多資料
]
```

### 2.3 (進階) 使用 LocalStorage 實現“假增刪改”

如果你希望剛才生成的“模擬資料”不僅能看，還能刪、能改，甚至新生成的任務重新整理頁面後還在，你可以結合 `LocalStorage`。

> **提示詞示例：**
> “請幫我實現一個資料儲存功能。
>
> 1. 優先從 `localStorage` 讀取資料。
> 2. 如果 `localStorage` 為空，則使用剛才生成的 Mock 資料初始化，並將它們存入 `localStorage`。
> 3. 同時幫我寫 `addProductTask` 和 `deleteProductTask` 函式，每次操作都要同步更新 `localStorage`。”

透過這一步，你的原型就擁有了“記憶”，使用者體驗幾乎和真產品無異。

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="2" :items="[
      { title: '完善鏈路', description: '從單點功能到完整閉環' },
      { title: '注入靈魂', description: '模擬真實業務資料' },
      { title: '反饋迭代', description: '基於真實反饋修補體驗' },
      { title: '最終大作業', description: '你的畢業設計' }
    ]" />
  </ClientOnly>
</div>

## 3. 收集反饋與快速迭代

閉門造車是做不出好產品的。現在你的原型已經具備了“核心功能”+“完整鏈路”+“演示資料”，是時候拿給別人看了。

### 3.1 找誰測？怎麼測？

- **找朋友/同事**：不需要他們懂技術，只需要讓他們試著用一下。
- **觀察而非引導**：不要說“點這裡”，而是看他們會點哪裡。如果他們找不到按鈕，說明設計有問題。
- **“Wizard of Oz” (綠野仙蹤法)**：如果你的 AI 還沒接好，你可以人工在後臺（或資料庫）手動修改資料來模擬 AI 的返回，先驗證使用者是否需要這個功能。

### 3.2 面對 Bug 和 吐槽

- **樣式錯亂**：不同螢幕尺寸下可能會亂。
  - **Action**: 截圖發給 AI IDE -> “在這個螢幕寬度下亂了，幫我修一下。”
- **操作別扭**：“這個流程太繁瑣了”。
  - **Action**: 把建議告訴 AI IDE -> “使用者覺得先上傳再生成太慢，能不能改成一鍵生成？”
- **需求新增**：“如果有這個功能就好了”。
  - **Action**: 評估是否核心，如果是，讓 AI 快速實現一個簡化版。

**記住：在這個階段，AI 是你最好的修改助手。你只需要負責發現問題，程式碼修改交給它。**

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="3" :items="[
      { title: '完善鏈路', description: '從單點功能到完整閉環' },
      { title: '注入靈魂', description: '模擬真實業務資料' },
      { title: '反饋迭代', description: '基於真實反饋修補體驗' },
      { title: '最終大作業', description: '你的畢業設計' }
    ]" />
  </ClientOnly>
</div>

## 4. 🎓 階段大作業：完成你的“畢業設計”

恭喜你！你已經走完了從“需求”到“原型”再到“AI 整合”的全過程。現在，是時候展示你的最終成果了。

**本次大作業不再侷限於“電商素材工作臺”**。你需要結合自己的興趣或行業背景，打造一個獨一無二的 AI 產品原型。

### 選題與要求

你需要從 **[產業多分類場景方向參考](../appendix-industry-scenarios/index.md)** 中選擇一個最接近的場景，或者根據自己的想法構思一個全新的場景。

**專案必須綜合運用前幾節課學到的所有內容：**

1.  **原型的構建**：使用前端技術搭建美觀、易用的介面。
2.  **需求的控制**：不求大而全，但求核心功能邏輯閉環。
3.  **API 的接入**：接入真實的 AI 模型（LLM/VLM 等），賦予應用真正的智慧。
4.  **實現一個可玩的應用**：不僅僅是靜態頁面，而是有資料流轉、有互動反饋的動態應用。

### 作業產出

最終你需要提交以下兩樣內容：

1.  **一個完整的原型應用**：部署上線或本地可執行，具備完整的使用鏈路。
2.  **30 秒的演示影片**：錄製一段影片，簡要介紹你的應用場景，並演示核心功能的實際操作。

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px;">
  <template #header>
    <div style="font-weight: bold; font-size: 16px;">🚀 最終挑戰清單</div>
  </template>

  <p>
    這是 Stage 1 的最後一戰。請按照以下清單檢查你的作品：
  </p>

  <div style="font-weight: bold; margin-bottom: 10px;">核心功能自檢</div>
  <ul style="list-style-type: none; padding-left: 0;">
    <li><label><input type="checkbox" disabled /> <strong>場景明確</strong>：選定了一個具體的行業或應用場景</label></li>
    <li><label><input type="checkbox" disabled /> <strong>邏輯閉環</strong>：核心流程能跑通，不僅僅是 Happy Path</label></li>
    <li><label><input type="checkbox" disabled /> <strong>AI 驅動</strong>：真實呼叫了大模型 API，而非預設回覆</label></li>
    <li><label><input type="checkbox" disabled /> <strong>體驗完整</strong>：包含 Loading、錯誤處理及模擬資料</label></li>
  </ul>

  <div style="font-weight: bold; margin: 20px 0 10px;">交付物準備</div>
  <ul style="list-style-type: none; padding-left: 0;">
    <li><label><input type="checkbox" disabled /> <strong>原型應用</strong>：程式碼已完成並可執行</label></li>
    <li><label><input type="checkbox" disabled /> <strong>演示影片</strong>：30 秒左右，清晰展示核心亮點</label></li>
  </ul>
</el-card>

## 下一步

完成大作業後，你已經具備了“獨立開發 AI 應用原型”的能力。
在接下來的 Stage 2 中，我們將深入更復雜的全棧開發，學習如何把這個原型變成一個真正能上線、有資料庫、有使用者系統的商業級應用。

讓我們在下一階段見！

<RelatedArticlesSection
  title="繼續進階"
  description="恭喜完成 Stage 1，下面這些章節可以幫助你進入工程化開發。"
  :items="relatedArticles"
/>
