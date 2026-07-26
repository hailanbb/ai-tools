# 用 LLM 和 Skills 讓界面變好看：提示詞與插件實戰

在前面的課程中，你已經學會了用 AI IDE 把設計稿變成程式碼、用組件庫快速搭建界面。但你可能也發現了一個尷尬的問題：**同樣的需求，AI 生成的頁面總覺得差點意思**——字體是千篇一律的 Inter，配色是隨處可見的紫色漸變，佈局是對稱得讓人打哈欠的卡片網格，整個頁面散發著濃烈的"AI 味"。

這不是 AI 的錯，而是你沒告訴它你想要什麼**風格**。

想象你去理髮店。如果你只說"幫我剪個頭髮"，理髮師會給你一個安全但平庸的結果。但如果你說"我要日系慵懶卷，劉海要八字型，長度到鎖骨，層次感明顯"，你就能得到真正符合你期待的效果。

AI 也是一樣。**它需要你描述出清晰的審美方向**，才能生成美觀獨特的界面。

本節課教你兩種讓 AI 生成漂亮界面的方法：

1. **精心設計的提示詞模板**——用自然語言告訴 AI 你想要的美學風格
2. **前端 Skills 插件**——讓 AI 自動加載專業設計規範

## 你將學到

1. 理解為什麼 AI 默認生成的界面"很普通"
2. 掌握描述設計風格的 5 個維度（字體、顏色、佈局、動畫、細節）
3. 學會使用 3 個讓界面變漂亮的 Skills 插件
4. 通過三個實戰場景，練習用提示詞 + Skills 生成美觀界面

## 1. 為什麼 AI 默認生成的界面"很普通"？

AI 訓練資料中有海量的前端程式碼，而大部分程式碼都使用一些"安全"的選擇：

| 維度 | AI 的默認選擇 | 問題 |
| :--- | :--- | :--- |
| 字體 | Inter、Roboto、Arial | 太常見，沒有個性 |
| 顏色 | 紫色漸變、藍色主色 | 科技圈過度使用，視覺疲勞 |
| 佈局 | 對稱網格、卡片堆疊 | 預測性強，缺乏驚喜 |
| 動畫 | 淡入淡出、簡單的 hover | 不夠精緻，缺乏層次 |
| 背景 | 純色、簡單漸變 | 單調，缺少質感 |

這些選擇單獨看都不錯，但**當所有 AI 生成的頁面都用它們時，就變成了"AI 味"**。

> 💡 **關鍵洞察**：AI 不是不會設計，而是**默認回到"統計平均"**。你需要明確告訴它偏離平均值的方向。

## 2. 方法一：用提示詞描述設計風格

### 2.1 設計風格的 5 個維度

要生成美觀的界面，你需要從 5 個維度描述你想要的效果：

| 維度 | 描述要點 | 示例關鍵詞 |
| :--- | :--- | :--- |
| **字體** | 標題用粗體展示字體，正文用易讀正文字體 | Space Grotesk、Playfair Display、JetBrains Mono |
| **顏色** | 主色 + 點綴色，避免均勻分佈 | #4F46E5 主色 + #F59E0B 點綴 |
| **佈局** | 不對稱、重疊、打破網格 | Bento Grid、不對稱分區、浮動元素 |
| **動畫** | 精心編排的頁面加載、微交互 | staggered reveals、滾動觸發 |
| **細節** | 背景、陰影、邊框、紋理 | 噪點、幾何圖案、漸變網格 |

### 2.2 眼見為實：普通提示詞 vs 美化提示詞

讓我們用一個落地頁示例來對比效果：

**普通提示詞：**

```
請幫我做一個 AI 寫作助手的落地頁，包含導航欄、首屏、功能展示、定價、頁腳
```

**美化提示詞：**

```
請幫我做一個 AI 寫作助手的落地頁，要求：

**美學風格：新野獸派（Neubrutalism）**

**字體：**
- 標題：Space Grotesk，字重 700-900
- 正文：IBM Plex Sans，字重 400

**顏色：**
- 主色：#000000（純黑）
- 強調色：#FF6B00（橙色）
- 背景：#FFFDF0（米白色）
- 邊框：3px 黑色實線

**佈局：**
- 不對稱佈局，元素之間用粗黑線分隔
- 卡片有硬陰影（box-shadow: 8px 8px 0px #000）
- 大膽的留白對比

**動畫：**
- 頁面加載時元素從下方彈入
- hover 時按鈕向上移動 2px

**細節：**
- 圓角全部用 0px（直角）
- 按鈕有強烈的 3D 效果
- 背景添加微妙的噪點紋理
```

同樣的需求，第二個提示詞能讓 AI 生成一個風格鮮明、令人印象深刻的頁面。

### 2.3 前端美化 Skills 資源庫

不要從零開始寫提示詞！這裡收集了與前端美化直接相關的 AI Skills：

| 倉庫名 | 內容 | Star | 鏈接 |
|:---|:---|:---|:---|
| **ui-ux-pro-max-skill** | 57種風格 + 95種配色 + 56種字體 | 10k+ | [GitHub](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) |
| **antigravity-awesome-skills** | 避免通用 AI 審美套路 | - | [GitHub](https://github.com/sickn33/antigravity-awesome-skills) |
| **superdesigndev/superdesign** | AI 原生 UI 開發工具 | 4.7k | [GitHub](https://github.com/superdesigndev/superdesign) |
| **anthropics/skills/frontend-design** | Anthropic 官方前端設計 Skill | - | [GitHub](https://github.com/anthropics/skills) |

> 💡 更多風格提示詞請參考[附錄：設計風格提示詞速查](#style-prompts)

### 2.5 三款常用風格模板

這裡給你三款經過驗證的風格模板，直接複製修改使用：

#### 模板 1：極簡主義

```
**美學風格：極簡主義**

**字體：**
- 標題：PP Neue Montreal，字重 500-700
- 正文：Inter，字重 400

**顏色：**
- 主色：#FFFFFF（白色）
- 文字：#1A1A1A（近黑）
- 強調：#3B82F6（藍色，少量使用）

**佈局：**
- 大量留白（padding 最小 64px）
- 單欄或雙欄佈局，居中對齊
- 元素之間用留白而非分割線

**動畫：**
- 緩慢的淡入效果（duration 600ms）
- hover 時顏色漸變過渡

**細節：**
- 圓角：8px
- 陰影：subtle（0 4px 12px rgba(0,0,0,0.08)）
- 無背景裝飾
```

#### 模板 2：玻璃擬態

```
**美學風格：Glassmorphism（玻璃擬態）**

**字體：**
- 標題：Outfit，字重 600-800
- 正文：Plus Jakarta Sans，字重 400-500

**顏色：**
- 背景：漸變 #667eea 到 #764ba2
- 卡片背景：rgba(255, 255, 255, 0.1)
- 文字：#FFFFFF

**佈局：**
- 浮動卡片設計
- 卡片之間有重疊

**動畫：**
- 頁面加載時卡片依次浮現（staggered）
- hover 時卡片放大 1.05 倍

**細節：**
- 圓角：20px
- 背景模糊：backdrop-blur-xl
- 邊框：1px rgba(255, 255, 255, 0.2)
- 微妙的漸變光暈效果
```

#### 模板 3：Bento Grid（便當盒）

```
**美學風格：Bento Grid**

**字體：**
- 標題：SF Pro Display，字重 700
- 正文：SF Pro Text，字重 400

**顏色：**
- 背景：#F5F5F7（淺灰）
- 卡片：#FFFFFF（白色）
- 強調：#0071E3（蘋果藍）

**佈局：**
- 網格佈局，不同大小的卡片拼在一起
- 卡片之間 gap 16px
- 圓角 24px

**動畫：**
- hover 時卡片輕微上浮
- 點擊時有按壓效果

**細節：**
- 大卡片展示重要內容
- 小卡片展示次要資訊
- 用圖標代替部分文字
- 乾淨的陰影（0 4px 24px rgba(0,0,0,0.06)）
```

## 3. 方法二：用 Skills 插件自動加載設計規範

每次手動寫風格提示詞很麻煩。**Skills** 是一種可複用的設計規範包，安裝後 AI 會自動應用這些規範。

### 3.1 三個讓界面變漂亮的 Skills

| Skills | 特點 | 安裝命令 |
| :--- | :--- | :--- |
| **UI/UX Pro Max** | 67 種風格、96 種配色、57 種字體組合 | `npm install -g uipro-cli && uipro init --ai claude` |
| **frontend-design** | Anthropic 官方，避免 AI 審美套路 | `npx skills add anthropics/skills/frontend-design` |
| **SuperDesign** | IDE 插件，生成多個設計變體 | VSCode 擴展市場搜索 "SuperDesign" |

### 3.2 安裝 UI/UX Pro Max（最推薦）

UI/UX Pro Max 是目前最全面的設計規範 Skills，它預置了：

- **67 種 UI 風格**：Glassmorphism、Neumorphism、Brutalism、Bento Grid...
- **96 種配色方案**：按行業分類（SaaS、電商、社交...）
- **57 種字體搭配**：專業設計師驗證的組合
- **100+ 條設計規則**：間距、圓角、陰影的規範

**安裝步驟：**

```bash
# 1. 全局安裝 CLI
npm install -g uipro-cli

# 2. 初始化（選擇你用的 AI 工具）
uipro init --ai claude
# 或者
uipro init --ai cursor
# 或者
uipro init --ai trae
```

安裝後，你只需要在提示詞中加一句話：

```
使用 UI/UX Pro Max 的 Glassmorphism 風格，幫我做一個 AI 寫作助手落地頁
```

AI 就會自動應用對應的字體、顏色、佈局規範。

### 3.3 安裝 Anthropic 官方 frontend-design

這是 Anthropic 官方出品的前端設計 Skill，專門解決"AI 審美套路"問題：

```bash
# 在 Claude Code 中執行
npx skills add anthropics/skills/frontend-design
```

安裝後，AI 會自動避免：
- ❌ Inter、Roboto、Arial 字體
- ❌ 紫色漸變背景
- ❌ 對稱網格佈局
- ❌ 過淡的陰影

而是傾向於：
- ✅ 獨特的字體組合
- ✅ 大膽的主色 + 銳利的點綴色
- ✅ 不對稱、重疊的佈局
- ✅ 有質感的背景（噪點、幾何圖案）

## 4. 實戰一：用美化提示詞重新設計落地頁

讓我們用前面學到的知識，把一個普通的落地頁變得好看。

### 4.1 普通版本

先用普通提示詞看看 AI 給什麼：

```
請幫我做一個寵物領養平臺的落地頁，包含：
- 導航欄（Logo、鏈接、註冊按鈕）
- 首屏（標題、副標題、CTA 按鈕、寵物圖片）
- 寵物展示（三張寵物卡片）
- 關於我們
- 頁腳
```

生成的頁面...能用，但很普通。

### 4.2 美化版本

現在加上風格描述：

```
請幫我做一個寵物領養平臺的落地頁，要求：

**美學風格：溫暖柔和 + 手繪感**

**字體：**
- 標題：Nunito（圓體），字重 700-800
- 正文：Nunito，字重 400-600

**顏色：**
- 主色：#FFB347（暖橙色）
- 次色：#FFCCB3（淺橙色）
- 背景：#FFF8F0（米白色）
- 文字：#5D4037（棕色）

**佈局：**
- 圓潤的卡片（border-radius: 24px）
- 卡片略微傾斜旋轉（不同角度）
- 元素浮動、重疊效果

**動畫：**
- 頁面加載時元素從兩側滑入
- 寵物卡片 hover 時像寵物搖頭（rotate 動畫）
- 按鈕 hover 時彈跳效果

**細節：**
- 所有圓角用 16-24px
- 陰影溫暖柔和（0 8px 24px rgba(255,179,71,0.3)）
- 背景添加爪印圖案裝飾
- 圖片用不規則裁切（clip-path）
- 手繪風格的圖標（outline 風格）
```

生成的頁面會是一個溫暖、可愛、讓人想領養寵物的界面。

## 5. 實戰二：用 Skills 快速生成儀表盤

Skills 特別適合需要大量頁面的後臺系統。

### 5.1 使用 UI/UX Pro Max

```
使用 UI/UX Pro Max 的 Dashboard Dark 風格，
幫我做一個 SaaS 產品管理後臺的儀表盤頁面，包含：

**頂部：** 四個統計卡片（用戶數、活躍用戶、收入、API 調用）

**中間：**
- 左邊：用戶增長折線圖（最近 7 天）
- 右邊：訂閱計劃分佈餅圖

**底部：** 最近活動列表（時間、用戶、操作）
```

AI 會自動應用深色儀表盤的設計規範：
- 深灰背景（#1A1A2E）
- 高對比度卡片（#16213E）
- 鮮豔的資料顏色（藍色、綠色、橙色）
- 玻璃擬態效果的懸浮卡片

### 5.2 使用 frontend-design Skill

```
使用 frontend-design skill，
幫我做一個個人博客的主頁，風格要獨特、有個性
```

AI 會選擇一個非主流的美學方向（比如復古未來主義或雜誌風格），然後用獨特的字體、配色、佈局來實現。

## 6. 實戰三：創建自己的設計系統 Skill

如果你有固定的品牌風格，可以創建自己的 Skill，讓所有 AI 生成的頁面都符合你的品牌。

### 6.1 創建 Skill 文件

在項目中創建 `.claude/skills/my-brand/SKILL.md`：

````markdown
---
name: my-brand
description: 我的項目專用設計系統，確保所有 UI 遵循統一的設計語言
---

# 我的項目設計系統

## 品牌顏色
- 主色：#6366F1（Indigo 500）
- 次色：#8B5CF6（Violet 500）
- 成功：#10B981
- 警告：#F59E0B
- 錯誤：#EF4444
- 背景：#F9FAFB
- 卡片：#FFFFFF

## 字體系統
- 標題：Plus Jakarta Sans
  - H1: 700, 48px
  - H2: 600, 36px
  - H3: 600, 24px
- 正文：Inter
  - Body: 400, 16px
  - Small: 400, 14px

## 間距系統
- 基礎單位：4px
- 組件內邊距：8px / 12px / 16px
- 區塊間距：24px / 32px / 48px
- 頁面邊距：64px

## 圓角
- 按鈕：8px
- 卡片：12px
- 輸入框：8px
- 模態框：16px

## 陰影
- 小：0 1px 3px rgba(0,0,0,0.1)
- 中：0 4px 12px rgba(0,0,0,0.1)
- 大：0 8px 24px rgba(0,0,0,0.12)

## 動畫
- 過渡時間：150ms / 300ms
- 緩動函數：cubic-bezier(0.4, 0, 0.2, 1)
- hover 效果：輕微放大（scale-105）

## 禁止使用的樣式
- 不要使用紫色漸變背景
- 不要使用 Inter 以外的字體
- 不要使用大於 16px 的圓角
- 不要使用純黑（#000000），用 #1F2937
````

### 6.2 使用自己的 Skill

創建後，你只需要在提示詞中說：

```
使用 my-brand skill，幫我做一個用戶設置頁面
```

AI 就會自動應用你定義的所有設計規範。

## 7. 小結

讓 AI 生成漂亮界面有兩種方法：

| 方法 | 優點 | 缺點 | 適用場景 |
| :--- | :--- | :--- |
| **提示詞描述** | 靈活、每次可調整 | 需要重複寫 | 一次性頁面、實驗不同風格 |
| **Skills 插件** | 一次安裝、持續生效 | 需要安裝配置 | 有固定風格要求的項目 |

**Vibe Coding 工作流建議：**

1. **探索階段**：用不同的風格提示詞實驗，找到你喜歡的美學方向
2. **確定風格後**：安裝對應的 Skill（UI/UX Pro Max 或 frontend-design）
3. **品牌項目**：創建自己的 Skill，統一整個項目的設計語言

### 練習

選擇以下任一場景，用本節課的方法從零完成：

1. 用風格提示詞為你之前做的一個項目重新設計界面（選一種你喜歡的風格）
2. 安裝 UI/UX Pro Max，用它的某個風格生成一個新頁面
3. 創建你自己的設計系統 Skill，定義你的品牌顏色和字體

---

## 附錄：設計風格速查表

| 風格 | 關鍵詞 | 適用場景 | 示例產品 |
| :--- | :--- | :--- | :--- |
| **極簡主義** | 留白、單色、簡潔 | 高端產品、個人作品集 | Apple官網 |
| **玻璃擬態** | 毛玻璃、漸變、模糊 | 科技產品、SaaS 落地頁 | macOS Big Sur |
| **新野獸派** | 粗邊框、硬陰影、純色 | 潮流品牌、藝術類網站 | Brassius |
| **Bento Grid** | 網格、拼貼、卡片 | 資訊展示、儀表盤 | Apple 宣傳頁 |
| **復古未來** | 霓虹、漸變、合成器波 | 遊戲類、音樂類 | STRANGER THINGS |
| **手繪風格** | 不規則、圓潤、插畫 | 教育類、兒童產品 | Duolingo |
| **雜誌風** | 大字體、不對稱、留白 | 內容型網站、博客 | Medium |
| **暗色奢華** | 深色、金色、精緻 | 高端產品、奢侈品 | 各種高端品牌 |

## 附錄：Skills 安裝速查

```bash
# UI/UX Pro Max
npm install -g uipro-cli
uipro init --ai claude

# Anthropic frontend-design
npx skills add anthropics/skills/frontend-design

# Anthropic brand-guidelines
npx skills add anthropics/skills/brand-guidelines

# 查看 Claude Code 中已安裝的 Skills
/help
```

## 附錄：配色方案推薦

| 配色方案 | 主色 | 點綴色 | 背景 | 風格 |
| :--- | :--- | :--- | :--- | :--- |
| **日落** | #F97316 | #FBBF24 | #FFF7ED | 溫暖、活力 |
| **海洋** | #0EA5E9 | #06B6D4 | #F0F9FF | 清新、專業 |
| **森林** | #10B981 | #34D399 | #ECFDF5 | 自然、健康 |
| **漿果** | #8B5CF6 | #EC4899 | #FAF5FF | 浪漫、創意 |
| **咖啡** | #78350F | #D97706 | #FFFBEB | 溫暖、復古 |
| **單石** | #6B7280 | #9CA3AF | #F9FAFB | 專業、中性 |

## 附錄：設計風格提示詞速查 {#style-prompts}

讓前端頁面更好看可以嘗試的提示詞：

### 風格類別

| 風格 | 關鍵詞（英文） | 核心視覺特徵 | 提示詞示例 |
|:---|:---|:---|:---|
| **波普藝術** | Pop Art | 大膽的撞色、黑色輪廓線、網點紋理 | Pop art style website, bold colors and comic dots, vibrant |
| **極簡主義** | Minimalism | 大量留白、極少色彩與線條、無裝飾 | Minimalist web design, ample white space, geometric, serene |
| **抽象表現主義** | Abstract Expressionism | 充滿情感張力的筆觸、潑灑色彩 | Abstract expressionism background, dynamic paint splashes, emotional |
| **復古風格** | Retro/Vintage | 舊式字體、做舊紋理、復古配色 | Retro 80s website design, neon grid and synthwave color palette |
| **賽博朋克** | Cyberpunk | 高對比霓虹色、故障藝術效果、暗黑背景 | Cyberpunk UI, neon lights on dark background, glitch effects |
| **新擬態** | Neumorphism | 柔和的陰影與高光，輕微凸起/凹陷質感 | Neumorphism design style, soft shadows, clean and modern |
| **生成式藝術** | Generative Art | 算法生成的流動的視覺圖案 | Generative art background, flowing algorithmic patterns, digital |
| **酸性設計** | Acid Graphics | 金屬質感、玻璃態、鋸齒字體 | Acid graphics web layout, glass morphism, chaotic typography |
| **沉浸式3D** | Immersive 3D | 互動3D場景、空間感極強 | Immersive 3D website, interactive product model in space |
