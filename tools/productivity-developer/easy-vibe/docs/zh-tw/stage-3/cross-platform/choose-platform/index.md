# 如何為你的應用選擇合適的平台

你有了一個想法，想把它變成真正的產品。但有這麼多平台選項——微信小程式、iOS 應用、Android 應用、網站、瀏覽器擴展、桌面應用——應該從哪裡開始？

::: tip 💡 快速導航
如果你已經了解各平台的特點，可以直接跳到[第二節](#2-ask-yourself-three-questions-first)查看決策流程，或者查看[第七節的決策流程圖](#7-summary-platform-selection-decision-flow)。
:::

本文將幫助你理清思路，根據你的具體場景找到最合適的開發平台。

## 1 先認識這些平台

在討論「選哪個」之前，先了解「有哪些」。以下是當前主流的平台分類：

### 1.1 行動平台

#### iOS 原生應用

你在 iPhone 上從 App Store 下載的應用就是 iOS 原生應用。它的特點是：啟動快、體驗流暢、能完整訪問手機能力（相機、定位、健康數據等）。但開發需要 Mac，App Store 發佈需要通過 Apple 的審核。

**常見範例**：微信、抖音、小紅書、Keep、美團、支付寶

#### Android 原生應用

從 Android 應用商店下載的應用，或者朋友發來的 APK 文件安裝的應用，都是 Android 原生應用。它們與 iOS 應用類似，但 Android 用戶更多、分發管道也更多。缺點是設備碎片化：開發者必須適配多種螢幕尺寸和系統版本。

**常見範例**：Tasker（自動化）、MX Player（影片播放器）、AirDroid（手機管理）、Greenify（省電優化）、Xposed Framework（系統客製化）

#### 微信小程式

你在微信裡掃碼或搜名稱就能直接使用的「小應用」，無需安裝。優點是用戶摩擦低：大家都有微信，用戶可以立即開始使用。缺點是能力受限，而且只能在微信內運行。

**常見範例**：拼多多（團購電商）、美團外賣（本地服務）、摩拜（共享單車）、跳一跳（小遊戲）、周黑鴨（點餐/購物）

#### PWA（漸進式網頁應用）

聽起來很技術，但基本上就是「可以像應用一樣安裝的網頁」。當用戶在手機瀏覽器中打開一個網站時，可能會看到「添加到主螢幕」。點一下後，主螢幕上就出現一個圖標，用起來像應用一樣。優點是一套代碼同時支援手機和桌面。缺點是很多用戶不知道這種用法。

**常見範例**：Twitter Lite、Starbucks、Pinterest、Uber、Spotify Web Player

### 1.2 桌面平台

#### Electron 桌面應用

你可能每天都在用：VS Code、Slack、Discord、Notion、Figma——都是用 Electron 構建的。它的核心特點是：使用 Web 技術（HTML、CSS、JavaScript）構建桌面軟體，一套代碼在 Windows、Mac 和 Linux 上運行。缺點是安裝包較大，運行時記憶體佔用較高。

**常見範例**：VS Code、Slack、Discord、Notion、Figma、微信開發者工具

#### Qt 桌面應用

如果你用過 WPS、VirtualBox 或 OBS，它們可能是用 Qt 構建的。Qt 使用 C++，性能好、穩定性高，特別適合工業場景。但學習曲線較陡，需要掌握 C++ 知識。

**常見範例**：WPS Office、VirtualBox、Autodesk Maya、Telegram Desktop、OBS Studio

#### 原生桌面應用

這些「重量級」應用通常使用原生技術構建。Windows 常用 C# 或 C++；macOS 使用 Swift。它們提供最佳性能和最流暢的體驗，但 Windows 和 macOS 版本需要分別開發，成本較高。

**常見範例**：Microsoft Office、Adobe Photoshop、Final Cut Pro、微信（Windows/Mac）、QQ 音樂

### 1.3 網頁相關平台

#### 網站

就是在瀏覽器中輸入網址打開的頁面。優點：在任何設備上都能訪問（手機、電腦、平板），無需安裝，且能被搜索引擎收錄。缺點：需要網路連接，無法離線使用。

**常見範例**：淘寶、知乎、GitHub、B 站、掘金、CSDN

#### 瀏覽器擴展

你用過廣告攔截器、翻譯工具或密碼管理器嗎？這些就是瀏覽器擴展。它們運行在瀏覽器內部，可以讀取/修改網頁內容。例如安裝一個翻譯擴展，就能一鍵翻譯英文頁面。優點：輕量，隨瀏覽器啟動。缺點：只在瀏覽器中工作，而且擴展在 Chrome、Edge 和 Firefox 之間不一定通用。

**常見範例**：AdBlock Plus、沉浸式翻譯、1Password、Grammarly、Tampermonkey、Dark Reader

### 1.4 其他平台

#### VS Code 擴展

如果你是開發者，很可能使用 VS Code。VS Code 擴展是給編輯器「添加功能」的小程式。優點：面向精準的開發者群體。缺點：只對開發者用戶有用。

**常見範例**：Prettier、GitLens、GitHub Copilot、ESLint、Live Server、Chinese Language Pack

#### NFT 智能合約

你可能聽說過 NFT——那些賣出天價的「數位頭像」。NFT 本質上是基於區塊鏈的所有權證書，證明某個數位物品屬於你。智能合約是運行在區塊鏈上的程式，用來創建和管理 NFT。優點：不可篡改、可交易。缺點：技術門檻高、市場波動大。

**常見範例**：BAYC、CryptoPunks、NBA Top Shot、Azuki、Moonbirds

### 1.5 還有更多選擇嗎？

除了上述平台，還有「中間路線」和更多可能性：

#### 跨平台框架

::: details 點擊查看跨平台框架詳情

**React Native / Flutter**：想要同時支援 iOS 和 Android 但不想寫兩套代碼？這些框架讓你寫一次代碼就能生成兩個平台的應用。很多公司都在用，如 Airbnb 和 Instagram。

**Tauri**：Electron 的「輕量替代品」。同樣使用 Web 技術構建桌面應用，但安裝包更小、運行更快。缺點：生態系統還不夠成熟。

**uni-app**：在國內非常流行。一套代碼可以同時發佈到微信小程式、iOS 應用、Android 應用和 H5 網站。適合追求「一次開發，到處運行」的團隊。

**Capacitor / Ionic**：已經有網站了，想快速變成應用？這些工具可以把你的網站「包裝」成可在應用商店安裝的應用。

這些框架本質上是在原生開發和 Web 開發之間做取捨：開發效率更高，但在性能和體驗上會有一些妥協。
:::

#### 中國小程式生態

::: details 點擊查看中國的小程式選項

**支付寶小程式**：金融和本地服務場景。如果你的用戶在支付寶裡繳費、點餐、搭乘公共交通，那支付寶小程式就很合適。芝麻信用、信任身分等能力是支付寶獨有的。

**抖音小程式**：內容電商和直播帶貨。如果你在抖音上賣東西，小程式可以掛在影片下方實現即時轉化。

**快手小程式**：下沉市場和強社區經濟。快手用戶黏性高，適合社區團購和本地服務。

**百度小程式**：搜索流量入口。如果用戶在百度搜索「附近美食」，你的小程式可以直接出現在搜索結果中。
:::

#### 鴻蒙生態

**鴻蒙應用**：可以在華為手機、平板、手錶和智慧家居設備上運行。使用 ArkTS（類似 TypeScript）開發，一套代碼可支援多種設備。如果你的受眾在華為生態中，或者你的產品涉及物聯網聯動，鴻蒙是一個重要選項。

#### 更多開發者工具

::: details 點擊查看更多開發者工具選項

**命令列工具（CLI）**：開發者每天都在用終端。CLI 工具可以自動化重複工作、生成代碼模板、部署項目。例如 `create-react-app`、`git`、`npm`。適合開發者效率和 DevOps 自動化場景。

**JetBrains 插件**：除了 VS Code，很多開發者使用 IntelliJ IDEA、PyCharm 和 WebStorm。如果你的工具面向 Java、Python 或前端開發者，JetBrains Marketplace 也值得考慮。

**Cursor / Windsurf 插件**：AI 編碼工具的新興生態。如果你在構建 AI 輔助編碼功能，這些 IDE 插件生態正在快速成長。
:::

#### 社群機器人

::: details 點擊查看社群機器人選項

**Telegram Bot**：海外用戶基數大，API 對開發者友好。適合通知、自動化任務和社群管理。很多加密項目和開發者社群使用 Telegram。

**Discord Bot**：遊戲和開發者社群的核心平台。適合音樂播放、遊戲數據查詢和伺服器管理。如果你的用戶是遊戲玩家或海外開發者，Discord 機器人通常是必不可少的。
:::

#### 設計和生產力工具

::: details 點擊查看設計工具選項

**Figma 插件**：設計師每天都在用 Figma。插件可以自動化設計工作流程、生成代碼、管理設計系統。適合設計工具和前端輔助場景。

**Notion 整合**：通過 Notion API 可以自動化工作流程、同步數據、生成報告。適合知識管理和專案管理工具。
:::

#### 空間運算

**visionOS 應用（Apple Vision Pro）**：空間運算的新時代。適合 3D 內容展示、沉浸式體驗、教育/培訓和虛擬協作。技術門檻高，但對於前沿探索來說，這是一個未來方向。

---

## 2 先問自己三個問題

在選擇平台之前，先回答這三個核心問題：

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px; border-left: 4px solid #409EFF;">
  <template #header>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 20px;">🎯</span>
      <span style="font-weight: bold; font-size: 16px;">問題一：你的用戶在哪裡？</span>
    </div>
  </template>
  <div style="line-height: 1.8; color: #606266;">
    <ul>
      <li>用戶需要隨時隨地使用嗎？（行動優先）</li>
      <li>用戶習慣在微信裡完成任務嗎？（小程式）</li>
      <li>用戶會在辦公場景中長時間使用嗎？（桌面應用）</li>
      <li>用戶需要通過搜索引擎找到你嗎？（網站）</li>
    </ul>
  </div>
</el-card>

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px; border-left: 4px solid #67C23A;">
  <template #header>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 20px;">⚡</span>
      <span style="font-weight: bold; font-size: 16px;">問題二：你的應用需要什麼能力？</span>
    </div>
  </template>
  <div style="line-height: 1.8; color: #606266;">
    <ul>
      <li>需要訪問相機、麥克風、GPS 或其他硬體嗎？</li>
      <li>需要離線支援嗎？</li>
      <li>需要推送通知嗎？</li>
      <li>需要處理大量本地數據嗎？</li>
    </ul>
  </div>
</el-card>

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px; border-left: 4px solid #E6A23C;">
  <template #header>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 20px;">💰</span>
      <span style="font-weight: bold; font-size: 16px;">問題三：你有多少資源？</span>
    </div>
  </template>
  <div style="line-height: 1.8; color: #606266;">
    <ul>
      <li>你的開發時間預算是多少？</li>
      <li>你有 Mac 設備嗎（iOS 開發必需）？</li>
      <li>你需要同時覆蓋多個平台嗎？</li>
    </ul>
  </div>
</el-card>

---

## 3 平台選擇決策表

使用這張表快速找到適合你的方案：

| 你的場景 | 推薦平台 | 原因 |
|---------|---------|------|
| 用戶在微信生態中，想要快速增長用戶 | <el-tag type="success">微信小程式</el-tag> | 無需下載，微信分享便捷，獲客成本低 |
| 需要持續的背景 GPS 追蹤和健康數據訪問 | <el-tag type="primary">iOS / Android 原生</el-tag> | 直接訪問系統 API，性能最佳 |
| 想要一套代碼覆蓋多個平台 | <el-tag type="warning">PWA / Electron</el-tag> | 效率高，維護成本低 |
| 用戶需要在電腦上長時間使用 | <el-tag type="primary">桌面應用</el-tag>（Electron / Qt） | 獨立視窗，離線支援，系統整合性強 |
| 瀏覽時需要自動摘要/翻譯/密碼管理 | <el-tag type="info">瀏覽器擴展</el-tag> | 可讀取/修改網頁內容，隨瀏覽器啟動 |
| 想讓技術文章/專案展示被 Google 收錄 | <el-tag type="warning">網站 / 個人博客</el-tag> | SEO 友好，內容可被搜索 |
| 想要發行可交易的數位會員卡或收藏品 | <el-tag type="danger">NFT 智能合約</el-tag> | 鏈上所有權，可轉讓/可交易 |

---

## 4 實際場景範例

### 場景一：我想做一個社區團購工具

**💡 推薦：微信小程式**

為什麼選小程式？

- **用戶已經在微信裡**：社區用戶活躍在微信群中，小程式可以直接在群裡分享
- **即用即走的行為**：沒人想為了買菜再裝一個專門的應用
- **無縫支付**：微信支付一鍵完成，無需跳轉
- **獲客成本低**：一次群分享就能帶來幾十個用戶

::: tip 💡 適用場景
如果你的產品類似——團購、預約、問卷、活動報名——小程式通常是首選。
:::

---

### 場景二：我想做一個跑步追蹤應用

**⚡ 推薦：iOS / Android 原生**

為什麼選原生應用？

- **背景運行**：跑步時應用必須持續追蹤路線，小程式和網站無法可靠地做到
- **GPS 精度**：原生應用可以訪問高精度定位，誤差範圍更小
- **健康數據訪問**：步數和心率訪問需要 Apple HealthKit / Google Fit
- **可靠的推送提醒**：每天的「該跑步了」提醒通過原生推送效果最好

::: warning ⚠️ 重要提示
任何需要**長時間背景執行**或**深度硬體訪問**的應用都應該選擇原生開發。
:::

---

### 場景三：我想做一個記帳應用

**📝 推薦：PWA 或小程式**

為什麼？

- **高頻但短時**：每天記一筆，30 秒搞定
- **不需要複雜硬體**：主要是數據錄入和展示
- **跨平台需求強**：用戶可能手機上記帳，電腦上看報表
- **離線場景**：用戶可能在地鐵裡沒信號時也要記帳

PWA 可以安裝到主螢幕，用起來像應用一樣，而開發成本大約只有原生的三分之一。對於中國用戶，小程式通常更好。

---

### 場景四：我想做一個線上教育平台

**📚 推薦：網站 + 小程式組合**

為什麼？

- **網站負責獲客**：課程頁面、講師介紹、SEO 優化
- **小程式負責轉化**：試聽課、報名付費、掃碼入群
- **網站負責交付**：影片播放在更大的網頁螢幕上體驗更好
- **小程式負責觸達**：上課提醒和作業通知

::: tip 💡 組合策略
複雜業務通常需要**多平台組合**，而非單一平台。
:::

---

### 場景五：我想做一個團隊協作工具

**🤝 推薦：Electron 桌面應用 + 網頁版**

為什麼？

- **桌面端**：工作時電腦一直開著，桌面應用可以常駐並接收訊息
- **網頁端**：在其他電腦上臨時使用，無需安裝
- **系統整合**：桌面應用可以訪問本地文件、系統通知和快捷鍵
- **一套代碼**：Electron 使用 Web 技術棧，桌面/網頁可復用約 80% 的代碼

Slack、Notion 和 Discord 都採用這個模式。

---

### 場景六：我想做一個密碼管理器

**🔐 推薦：桌面應用 + 瀏覽器擴展**

為什麼？

- **桌面應用**：安全的本地密碼資料庫存儲，支援生物識別解鎖
- **瀏覽器擴展**：在登入頁面自動填寫，無需切換視窗
- **離線可用**：密碼數據存儲在本地，不依賴網路
- **安全可控**：用戶知道數據在哪裡，減少雲端洩露的擔憂

1Password 和 Bitwarden 都採用這種組合。

---

### 場景七：我想做一個內容創作平台

**✍️ 推薦：網站 + 個人博客**

為什麼？

- **SEO 是生命線**：搜索是你最大的長期流量來源
- **內容即產品**：文章、教程和影片是核心價值
- **長期資產**：網站可以運營多年，而社交帳號隨時可能被封
- **靈活變現**：廣告、付費訂閱和知識付費都可以在網站上運行

Medium、知乎專欄和個人技術博客本質上都是內容平台。

---

### 場景八：我想做一個開發者效率工具

**🛠️ 推薦：VS Code 擴展或 CLI 工具**

為什麼？

- **用戶就在編輯器裡**：開發者討厭切換上下文
- **上下文感知**：工具可以讀取當前代碼並提供精準建議
- **分發便捷**：發佈到擴展市場，用戶一鍵安裝
- **快速迭代**：沒有應用商店審核延遲，當天發佈/更新

Prettier、ESLint 和 GitHub Copilot 都是 VS Code 擴展。

---

### 場景九：我想做一個工業監控看板

**🏭 推薦：Qt 桌面應用**

為什麼？

- **穩定壓倒一切**：工廠 24 小時運行，軟體不能崩潰
- **硬體通訊**：需要與感測器進行串口/Modbus 通訊
- **即時圖表**：壓力/溫度/流量通常需要毫秒級重新整理
- **工業環境**：工業電腦通常運行 Windows，Qt 的相容性強

::: warning ⚠️ 工業場景
工業場景對穩定性和硬體介面的要求，Web 技術通常無法滿足。
:::

---

### 場景十：我想發行一張數位會員卡

**🎫 推薦：NFT 智能合約**

為什麼？

- **不可偽造**：鏈上記錄不可篡改
- **可轉讓**：會員資格可以贈送或在二級市場交易
- **可編程**：智能合約可以自動化權益（例如一年後自動升級）
- **全球觸達**：沒有國界限制，全球參與

Starbucks Odyssey 和 NBA Top Shot 都在會員系統中使用了 NFT。

---

## 5 快速平台能力對比

### 5.1 行動方案對比

| 能力 | 微信小程式 | iOS 原生 | Android 原生 | PWA |
|-----|----------|---------|-------------|-----|
| 用戶獲取成本 | <el-tag type="success">低</el-tag>（微信分享） | <el-tag type="danger">高</el-tag>（應用商店） | <el-tag type="danger">高</el-tag>（應用商店） | <el-tag type="warning">中</el-tag>（搜索引擎） |
| 離線使用 | <el-tag type="warning">受限</el-tag> | <el-tag type="success">完整</el-tag> | <el-tag type="success">完整</el-tag> | <el-tag type="success">支援</el-tag> |
| 推送通知 | <el-tag type="success">支援</el-tag> | <el-tag type="success">支援</el-tag> | <el-tag type="success">支援</el-tag> | <el-tag type="warning">部分</el-tag> |
| 硬體訪問 | <el-tag type="warning">受限</el-tag> | <el-tag type="success">完整訪問</el-tag> | <el-tag type="success">完整訪問</el-tag> | <el-tag type="warning">受限</el-tag> |
| 背景運行 | <el-tag type="warning">受限</el-tag> | <el-tag type="success">支援</el-tag> | <el-tag type="success">支援</el-tag> | <el-tag type="warning">受限</el-tag> |
| 開發成本 | <el-tag type="success">低</el-tag> | <el-tag type="danger">高</el-tag> | <el-tag type="danger">高</el-tag> | <el-tag type="success">低</el-tag> |
| 需要審核 | <el-tag type="warning">是</el-tag> | <el-tag type="warning">是</el-tag> | <el-tag type="warning">是</el-tag> | <el-tag type="success">否</el-tag> |

### 5.2 桌面方案對比

| 能力 | Electron | Qt | 瀏覽器擴展 |
|-----|----------|-----|-----------|
| 跨平台 | Win/Mac/Linux | Win/Mac/Linux | Chrome/Edge/Firefox |
| 系統整合 | <el-tag type="warning">中等</el-tag> | <el-tag type="success">高</el-tag> | <el-tag type="warning">低</el-tag> |
| 離線使用 | <el-tag type="success">支援</el-tag> | <el-tag type="success">支援</el-tag> | <el-tag type="warning">部分</el-tag> |
| 硬體訪問 | <el-tag type="warning">通過 Node.js</el-tag> | <el-tag type="success">完整訪問</el-tag> | <el-tag type="warning">受限</el-tag> |
| 安裝方式 | 安裝包 | 安裝包 | 瀏覽器擴展商店 |
| 開發技術棧 | Web 技術 | C++/QML | JavaScript |

---

## 6 常見誤解

<el-collapse accordion style="margin: 20px 0;">
  <el-collapse-item name="1">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ 誤解一：「我要做應用，就必須同時做 iOS 和 Android」</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      不一定。如果你的應用是輕量級、即用即走的，小程式或 PWA 可能是更好的選擇。原生開發只在需要深度系統訪問或頂級性能時才值得。
    </div>
  </el-collapse-item>

  <el-collapse-item name="2">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ 誤解二：「網站已經過時了，沒人看了」</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      恰恰相反。網站是唯一能被搜索引擎收錄的平台。如果你想要內容驅動的用戶增長，網站和個人博客是首選。技術文章和專案展示可以持續帶來 SEO 流量。
    </div>
  </el-collapse-item>

  <el-collapse-item name="3">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ 誤解三：「桌面應用沒人用了」</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      在辦公場景中，桌面應用仍然是主流。VS Code、Slack 和 Notion 都是桌面應用。如果你的應用需要長時間使用、處理大量數據或與系統整合，桌面通常是最佳選擇。
    </div>
  </el-collapse-item>

  <el-collapse-item name="4">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ 誤解四：「PWA 體驗比不上原生」</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      現代 PWA 已經非常接近原生體驗了。Starbucks、Pinterest 和 Uber 都有 PWA 版本。如果你的應用不需要複雜的硬體整合，PWA 往往是性價比最高的跨平台方案。
    </div>
  </el-collapse-item>
</el-collapse>

---

## 7 總結：平台選擇決策流程

```text
開始
  │
  ├─ 用戶在微信生態中嗎？ ─────────────────────→ 微信小程式
  │
  ├─ 需要最佳性能和深度硬體訪問嗎？ ──────────→ iOS / Android 原生
  │
  ├─ 需要在電腦上長時間使用嗎？ ──────────────→ 桌面應用
  │     │
  │     ├─ 工業場景？ ────────────────────────→ Qt
  │     └─ 通用場景？ ────────────────────────→ Electron
  │
  ├─ 需要處理瀏覽器頁面內容嗎？ ──────────────→ 瀏覽器擴展
  │
  ├─ 輕量 + 跨平台 + 離線？ ─────────────────→ PWA
  │
  ├─ 需要被搜索引擎發現嗎？ ─────────────────→ 網站 / 博客
  │
  ├─ 開發者工具？ ────────────────────────────→ VS Code 擴展
  │
  └─ 區塊鏈資產？ ──────────────────────────→ NFT 智能合約
```

---

## 8 下一步

::: tip 🎯 開始行動
根據上面的分析，你應該已經對「選哪個平台」有了初步答案。接下來，點擊對應的教程開始學習：
:::

<NavGrid>
  <NavCard
    href="/zh-tw/stage-3/cross-platform/wechat-miniprogram/"
    title="如何構建微信小程式"
    description="從零構建微信小程式，掌握核心開發工作流程"
  />
  <NavCard
    href="/zh-tw/stage-3/cross-platform/android-app/"
    title="如何構建 Android 應用"
    description="使用現代跨平台框架構建 Android 原生應用"
  />
  <NavCard
    href="/zh-tw/stage-3/cross-platform/ios-app/"
    title="如何構建 iOS 應用"
    description="以 Apple 生態最佳實踐開發和發佈 iOS 應用"
  />
  <NavCard
    href="/zh-tw/stage-3/cross-platform/pwa-local-app/"
    title="如何構建本地 PWA 應用"
    description="將網站變成真正的應用，支援離線使用和桌面安裝"
  />
  <NavCard
    href="/zh-tw/stage-3/cross-platform/browser-ai-extension/"
    title="如何構建瀏覽器 AI 助手擴展"
    description="一鍵摘要任何網頁，構建你的瀏覽器 AI 助手"
  />
  <NavCard
    href="/zh-tw/stage-3/cross-platform/electron-voice-to-text/"
    title="如何構建跨平台 Electron 桌面應用"
    description="構建語音轉文字桌面應用，支援 Windows、macOS 和 Linux"
  />
  <NavCard
    href="/zh-tw/stage-3/cross-platform/vscode-extension/"
    title="如何構建 VS Code 擴展"
    description="創建你的 AI 專案助手，支援多文件問答和自定義快捷鍵"
  />
  <NavCard
    href="/zh-tw/stage-3/cross-platform/qt-industrial-hmi/"
    title="如何構建 Qt 工業 HMI"
    description="構建工業級人機介面，連接真實硬體"
  />
</NavGrid>
