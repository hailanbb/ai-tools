# 使用現代組件庫更新你的界面

在前面的課程中，你已經學會了如何用設計工具畫出界面、用 AI IDE 把設計稿變成程式碼，甚至完成了一個完整的前端項目。但你可能也發現了一個問題：自己從零寫出來的按鈕、表單、彈窗，雖然能用，但總覺得和"專業產品"差了點意思——樣式不夠統一、交互細節不夠絲滑、適配不同屏幕也很頭疼。

這就是**組件庫**要解決的問題。

組件庫是一套預先設計好、開發好的 UI 零件集合。按鈕、輸入框、下拉菜單、對話框、表格……這些你在任何產品中都會反覆用到的界面元素，組件庫已經幫你做好了，而且經過了大量用戶的驗證和打磨。你只需要像搭積木一樣把它們組合起來，就能快速構建出專業級的界面。

## 你將學到

1. 理解什麼是前端組件庫，以及為什麼現代開發幾乎都在用它
2. 認識四個最具代表性的組件庫，瞭解它們各自擅長的場景
3. 通過三個實戰場景（落地頁、產品頁面、後臺管理），學會用 AI IDE + 組件庫進行 Vibe Coding
4. 學會閱讀組件庫文檔，根據需求找到合適的組件並正確使用

## 1. 為什麼需要組件庫？

想象你在裝修房子。你可以自己從木頭開始做一把椅子，但更常見的做法是去宜家買一把——設計好看、質量穩定、說明書清晰，拿回家組裝就行。

組件庫就是前端開發中的"宜家"。它提供的不是傢俱，而是界面零件：

| 自己手寫 | 使用組件庫 |
| :--- | :--- |
| 需要自己處理樣式、交互、動畫 | 開箱即用，樣式和交互已經打磨好 |
| 不同頁面的按鈕可能長得不一樣 | 全局風格統一，自動保持一致性 |
| 適配手機、平板需要額外工作 | 大多數組件庫已內置響應式支持 |
| 無障礙訪問（Accessibility）容易遺漏 | 專業組件庫已處理好鍵盤導航、屏幕閱讀器等 |
| 開發速度慢 | 開發速度快，專注業務邏輯 |

簡單來說：**組件庫讓你把時間花在"做什麼"上，而不是"怎麼畫"上。**

### 眼見為實：同一個需求，加不加組件庫的差距

光說不練沒有說服力。我們在 Trae 中用幾乎相同的需求，分別不指定和指定組件庫，看看生成結果的差距。

**提示詞一：不使用組件庫**

```text
請幫我做一個 AI 寫作助手的資料儀表盤頁面，包含：
- 頂部標題欄和導出按鈕
- 四張統計卡片顯示用戶數、活躍用戶、文檔數、收入，還要顯示漲跌趨勢
- 一個折線圖和一個餅圖
- 用戶列表表格，帶分頁功能
- 左側導航側邊欄
```

在 Trae 中直接運行後的效果：

<!-- TODO: 替換為 Trae 中不使用組件庫生成的儀表盤截圖 -->
<!-- ![Trae 生成的儀表盤（不使用組件庫）](/zh-cn/stage-2/frontend/modern-component-library/images/compare-without-lib.png) -->

**提示詞二：使用 shadcn/ui 組件庫**

```text
請幫我做一個 AI 寫作助手的資料儀表盤頁面，用 shadcn/ui 組件庫來做，包含：
- 頂部標題欄和導出按鈕
- 四張統計卡片顯示用戶數、活躍用戶、文檔數、收入，還要顯示漲跌趨勢
- 一個折線圖和一個餅圖
- 用戶列表表格，帶分頁功能
- 左側導航側邊欄
```

同樣在 Trae 中直接運行後的效果：

<!-- TODO: 替換為 Trae 中使用 shadcn/ui 生成的儀表盤截圖 -->
<!-- ![Trae 生成的儀表盤（使用 shadcn/ui）](/zh-cn/stage-2/frontend/modern-component-library/images/compare-with-lib.png) -->

同樣的需求，唯一的區別只是在提示詞開頭加上了 `shadcn/ui + Tailwind CSS`，Trae 生成的結果在視覺一致性、交互細節、整體打磨程度上就完全不在一個層級。這就是組件庫帶來的"免費升級"——你只需要在提示詞裡多寫一個組件庫的名字。

## 2. 認識四個核心組件庫

組件庫數量眾多（完整列表見[附錄](#附錄-更多組件庫一覽)），但你只需要先認識這四個最具代表性的：

| 組件庫 | 框架 | 一句話定位 | 官網 |
| :--- | :--- | :--- | :--- |
| [Ant Design](https://ant.design) | React | 螞蟻集團出品，企業級中後臺的事實標準，組件覆蓋面極廣 | ant.design |
| [shadcn/ui](https://ui.shadcn.com) | React | 不裝 npm 包，直接把程式碼複製到你項目裡，基於 Tailwind CSS，定製自由度最高 | ui.shadcn.com |
| [HeroUI](https://heroui.com)（原 NextUI） | React | 默認樣式精美、動畫流暢，適合對視覺品質有要求的落地頁和產品展示 | heroui.com |
| [Material UI](https://mui.com) | React | 最老牌的 React 組件庫，實現 Google Material Design 規範，生態最成熟 | mui.com |

> Vue 用戶同樣有豐富選擇：[Element Plus](https://element-plus.org)（國內最流行）、[Ant Design Vue](https://antdv.com)、[Naive UI](https://www.naiveui.com) 等，詳見[附錄](#附錄-更多組件庫一覽)。

不同組件庫擅長不同場景。接下來我們通過三個真實開發場景，帶你體驗如何用 AI IDE + 組件庫進行 Vibe Coding。

為了展示不同組件庫的風格和特點，我們在每個場景中刻意選用了不同的庫。但請注意：**這只是為了讓你多見識幾種方案**，實際開發中你完全可以只用自己最順手的那一個。比如你喜歡 shadcn/ui 的風格，用它做落地頁、產品頁、後臺管理都沒問題。選一個你覺得好看、用著舒服的，比什麼都重要。

## 3. 實戰一：用 HeroUI 構建產品落地頁

**場景**：你做了一個 AI 寫作助手產品，需要一個漂亮的落地頁來展示產品特性、吸引用戶註冊。落地頁需要視覺衝擊力強、動畫流暢、在手機上也好看。

**為什麼選 HeroUI**：HeroUI 的默認樣式就很精美，自帶流暢的過渡動畫，非常適合面向用戶的展示型頁面。

### 3.1 創建項目

```bash
# 使用 HeroUI 官方 CLI 創建項目
npx create-heroui-app@latest ai-writer-landing
cd ai-writer-landing
npm install
```

<!-- TODO: 替換為 HeroUI 官網首頁或組件展示截圖 -->
<!-- ![HeroUI 組件庫官網](/zh-cn/stage-2/frontend/modern-component-library/images/heroui-homepage.png) -->

### 3.2 用 AI IDE 生成落地頁

打開 AI IDE（Cursor、Trae 等），在對話框中輸入：

```text
請幫我做一個 AI 寫作助手的落地頁，用 HeroUI 組件庫來做：

**頁面結構：**
1. 頂部導航欄：左邊放 Logo 和產品名，右邊放"功能"、"定價"、"關於"三個鏈接，再加一個"開始使用"按鈕
2. 首屏區域：大標題寫"讓 AI 成為你的寫作搭檔"，副標題介紹產品價值，兩個按鈕"免費試用"和"查看演示"，下面放一張產品截圖
3. 功能展示：三列卡片，分別介紹"智能續寫"、"風格調整"、"多語言翻譯"三個功能，每張卡片要有圖標、標題、描述
4. 定價區域：三個定價卡片（免費版、專業版、團隊版），專業版要突出顯示推薦
5. 底部號召：一句吸引人的文案，加上註冊按鈕
6. 頁腳：版權資訊和社交媒體鏈接

**設計要求：**
- 看起來要現代、專業
- 支持暗色模式
- 手機上看也要好看
```

<!-- TODO: 替換為 AI IDE 生成落地頁的過程截圖或生成結果截圖 -->
<!-- ![AI 生成的 HeroUI 落地頁效果](/zh-cn/stage-2/frontend/modern-component-library/images/heroui-landing-result.png) -->

### 3.3 AI 會用到的關鍵組件

AI 生成的程式碼中，你會看到這些 HeroUI 組件：

```jsx
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem,
  Button,
  Card, CardHeader, CardBody, CardFooter,
  Divider,
  Link,
  Chip
} from '@heroui/react'
```

每個組件的作用：

| 組件 | 用途 | 落地頁中的位置 |
| :--- | :--- | :--- |
| `Navbar` | 頂部導航欄 | 頁面最頂部，固定不動 |
| `Button` | 按鈕，支持多種變體和顏色 | CTA 按鈕、導航按鈕 |
| `Card` | 卡片容器 | 功能展示、定價卡片 |
| `Chip` | 小標籤 | "推薦"、"最受歡迎"標記 |
| `Divider` | 分割線 | 區域之間的視覺分隔 |

### 3.4 迭代優化

生成的初版程式碼可能不完全滿意，繼續和 AI 對話調整：

```text
請幫我優化一下落地頁：

1. 大標題加上漸變色，從藍色漸變到紫色
2. 功能卡片鼠標放上去要有上浮的動畫效果
3. 專業版定價卡片要突出顯示，加個邊框和"最受歡迎"的標籤
4. 手機上的導航改成漢堡菜單（三條橫線那種）
```

<!-- TODO: 替換為迭代優化後的落地頁效果截圖 -->
<!-- ![迭代優化後的落地頁](/zh-cn/stage-2/frontend/modern-component-library/images/heroui-landing-iterated.png) -->

> **Vibe Coding 的核心**：你不需要記住每個組件的 API，只需要用自然語言描述你想要的效果，AI 會幫你找到合適的組件和寫法。遇到不滿意的地方，繼續對話迭代就好。

## 4. 實戰二：用 shadcn/ui 構建產品頁面

**場景**：你的 AI 寫作助手需要一個用戶登錄後的主界面——左側是文檔列表，右側是編輯器，頂部有工具欄。這是一個功能型產品頁面，需要高度定製化的 UI。

**為什麼選 shadcn/ui**：shadcn/ui 把組件程式碼直接放進你的項目，你可以隨意修改任何細節。對於需要深度定製的產品界面，這種"擁有程式碼"的模式最靈活。

<!-- TODO: 替換為 shadcn/ui 官網或組件展示截圖 -->
<!-- ![shadcn/ui 組件庫官網](/zh-cn/stage-2/frontend/modern-component-library/images/shadcn-homepage.png) -->

### 4.1 創建項目

```bash
# 創建 Next.js 項目
npx create-next-app@latest ai-writer-app --typescript --tailwind --app
cd ai-writer-app

# 初始化 shadcn/ui
npx shadcn@latest init

# 按需添加組件（不是一次性安裝所有組件）
npx shadcn@latest add button card input sidebar sheet dialog
```

shadcn/ui 的獨特之處：每次 `add` 一個組件，它會把源程式碼複製到你項目的 `components/ui/` 目錄下。你可以直接打開這些文件修改樣式和行為。

### 4.2 用 AI IDE 生成產品界面

```text
請幫我做一個 AI 寫作助手的主界面，用 shadcn/ui 組件庫來做：

**整體佈局：**
- 左邊是可摺疊的側邊欄，寬度大概 280px：
  - 頂部放"新建文檔"按鈕
  - 下面是文檔列表，每個文檔顯示標題和最後編輯時間
  - 右鍵點擊文檔可以重命名或刪除
- 右邊是主編輯區，分成上下兩部分：
  - 上面是工具欄：可以編輯文檔標題、顯示字數統計、"AI 續寫"按鈕、"導出"下拉菜單
  - 下面是編輯區域：一個大的文本輸入框，佔滿剩餘空間

**交互細節：**
- 點擊"AI 續寫"後，按鈕顯示加載狀態，編輯器底部出現 AI 生成的文本（像打字機一樣逐字顯示）
- 手機上側邊欄變成抽屜式，從左邊滑出
- 當前選中的文檔要高亮顯示
```

<!-- TODO: 替換為 AI 生成的 shadcn/ui 產品界面截圖 -->
<!-- ![AI 生成的 shadcn/ui 產品頁面效果](/zh-cn/stage-2/frontend/modern-component-library/images/shadcn-product-result.png) -->

### 4.3 AI 會用到的關鍵組件

```tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader
} from '@/components/ui/sidebar'
```

| 組件 | 用途 | 產品頁面中的位置 |
| :--- | :--- | :--- |
| `Sidebar` | 可摺疊側邊欄 | 左側文檔列表 |
| `Sheet` | 移動端抽屜 | 移動端側邊欄替代 |
| `DropdownMenu` | 下拉菜單 | "導出"按鈕、右鍵菜單 |
| `Dialog` | 對話框 | 重命名、刪除確認 |
| `Button` | 按鈕，支持 variant 和 loading | 各種操作按鈕 |
| `Input` | 輸入框 | 文檔標題編輯 |

### 4.4 定製組件樣式

shadcn/ui 的優勢在於你可以直接修改組件源碼。比如你想讓按鈕的圓角更大：

```text
請幫我修改 components/ui/button.tsx，
把所有按鈕的默認圓角從 rounded-md 改為 rounded-xl，
並給 primary 變體加上微妙的陰影效果
```

AI 會直接修改你項目中的組件文件，而不是覆蓋 npm 包的樣式——這就是 shadcn/ui "擁有程式碼"的好處。

<!-- TODO: 替換為 shadcn/ui 組件源碼在項目中的截圖，展示可直接編輯 -->
<!-- ![shadcn/ui 組件程式碼在項目中可直接編輯](/zh-cn/stage-2/frontend/modern-component-library/images/shadcn-code-ownership.png) -->

## 5. 實戰三：用 Ant Design 構建後臺管理界面

**場景**：你的 AI 寫作助手上線後，需要一個管理後臺來查看用戶資料、管理文檔內容、處理付費訂單。後臺管理系統的核心是資料展示和操作效率。

**為什麼選 Ant Design**：Ant Design 在中後臺領域積累最深，表格、表單、圖表等業務組件開箱即用，內置了大量企業級交互模式（批量操作、高級篩選、資料導出等）。

<!-- TODO: 替換為 Ant Design 官網或 Pro Components 展示截圖 -->
<!-- ![Ant Design 組件庫官網](/zh-cn/stage-2/frontend/modern-component-library/images/antd-homepage.png) -->

### 5.1 創建項目

```bash
# 使用 Ant Design Pro 腳手架（內置佈局、路由、權限）
npx create-umi@latest ai-writer-admin
# 選擇 Ant Design Pro 模板
cd ai-writer-admin
npm install
```

或者從零開始：

```bash
npx create-react-app ai-writer-admin --template typescript
cd ai-writer-admin
npm install antd @ant-design/icons @ant-design/pro-components
```

### 5.2 用 AI IDE 生成管理後臺

```text
請幫我做一個 AI 寫作助手的管理後臺，用 Ant Design 組件庫來做：

**整體佈局：**
- 左邊是菜單欄：儀表盤、用戶管理、文檔管理、訂單管理、系統設置
- 頂部顯示麵包屑導航

**用戶管理頁面：**
- 頂部放四個統計卡片：總用戶數、今日新增、活躍用戶數、付費用戶數
- 搜索篩選區：可以按用戶名搜索、選擇註冊時間範圍、篩選用戶狀態，還有"搜索"和"重置"按鈕
- 用戶表格：
  - 顯示頭像、用戶名、郵箱、註冊時間、訂閱計劃（用不同顏色標籤區分）、狀態、操作
  - 每頁顯示 20 條，支持分頁
  - 可以批量選擇用戶，批量禁用或導出
  - 操作列：查看詳情、編輯、禁用（禁用前要二次確認）
- 點擊"查看詳情"從右側滑出抽屜，顯示用戶詳細資訊和最近文檔列表
```

<!-- TODO: 替換為 AI 生成的 Ant Design 後臺管理界面截圖 -->
<!-- ![AI 生成的 Ant Design 後臺管理界面](/zh-cn/stage-2/frontend/modern-component-library/images/antd-admin-result.png) -->

### 5.3 AI 會用到的關鍵組件

```tsx
import { PageContainer, ProLayout } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { StatisticCard } from '@ant-design/pro-components'
import {
  Button, Tag, Badge, Space, Drawer,
  Popconfirm, message, Modal
} from 'antd'
import {
  UserOutlined, SearchOutlined, ExportOutlined
} from '@ant-design/icons'
```

| 組件 | 用途 | 後臺中的位置 |
| :--- | :--- | :--- |
| `ProLayout` | 後臺整體佈局框架 | 頁面骨架（菜單 + 內容區） |
| `ProTable` | 高級表格，內置搜索、分頁、列設置 | 用戶列表、文檔列表、訂單列表 |
| `StatisticCard` | 資料統計卡片 | 儀表盤、頁面頂部概覽 |
| `Tag` / `Badge` | 狀態標籤 | 訂閱計劃、用戶狀態 |
| `Drawer` | 側邊抽屜 | 用戶詳情、編輯表單 |
| `Popconfirm` | 氣泡確認框 | 刪除、禁用等危險操作 |

### 5.4 繼續迭代：添加儀表盤

```text
請幫我做一個儀表盤頁面：

1. 頂部四個統計卡片：總用戶數、總文檔數、今日 API 調用次數、月收入，每個卡片顯示數值和環比變化（漲了還是跌了）
2. 中間放兩個圖表：
   - 左邊：最近 7 天的用戶增長折線圖
   - 右邊：訂閱計劃分佈餅圖
3. 底部：最近操作日誌表格，顯示時間、用戶、操作類型、詳情

用 Ant Design 的組件來佈局，圖表可以用 Ant Design Charts
```

<!-- TODO: 替換為儀表盤頁面效果截圖 -->
<!-- ![Ant Design 儀表盤頁面效果](/zh-cn/stage-2/frontend/modern-component-library/images/antd-dashboard-result.png) -->

> **後臺管理的 Vibe Coding 技巧**：後臺頁面結構相對固定（表格 + 搜索 + 彈窗），非常適合用 AI 批量生成。你可以先讓 AI 生成一個"用戶管理"頁面作為模板，然後說"參考用戶管理頁面的結構，幫我生成文檔管理頁面"，AI 會複用相同的佈局模式。

## 6. 學會查文檔：組件庫的"說明書"

Vibe Coding 中 AI 會幫你寫大部分程式碼，但當 AI 生成的結果不對、或者你想微調某個組件的行為時，**查文檔**是最快的解決方式。

以 Ant Design 為例，它的文檔地址是：`https://ant.design/components/overview-cn`

查文檔的標準流程：

1. **明確需求**：比如"我需要表格支持行選擇"
2. **在文檔中搜索**：搜索"Table"進入表格組件頁面
3. **查看示例**：文檔中每個組件都有多個在線示例，找到"可選擇"示例
4. **複製程式碼**：把示例程式碼複製到你的項目中
5. **查看 API 表格**：在頁面底部找到 `rowSelection` 屬性的完整配置項

> 你也可以把文檔鏈接直接發給 AI IDE："請參考 https://ant.design/components/table-cn 的 rowSelection API，幫我給用戶表格加上批量選擇功能"。給 AI 提供文檔鏈接，生成的程式碼會更準確。

各組件庫的文檔地址速查：

| 組件庫 | 文檔地址 |
| :--- | :--- |
| Ant Design | `https://ant.design/components/overview-cn` |
| shadcn/ui | `https://ui.shadcn.com/docs/components` |
| HeroUI | `https://heroui.com/docs/components` |
| Material UI | `https://mui.com/material-ui/all-components/` |
| Element Plus | `https://element-plus.org/zh-CN/component/overview.html` |

## 7. 小結

三個實戰場景覆蓋了最常見的前端開發需求：

| 場景 | 推薦組件庫 | 核心特點 |
| :--- | :--- | :--- |
| 落地頁 / 展示頁 | HeroUI | 默認樣式精美，動畫流暢，視覺衝擊力強 |
| 產品功能頁面 | shadcn/ui | 程式碼完全可控，深度定製靈活 |
| 後臺管理系統 | Ant Design | 業務組件豐富，表格表單開箱即用 |

Vibe Coding 的工作流總結：

1. 根據場景選擇合適的組件庫
2. 用 AI IDE 描述你想要的頁面結構和交互
3. AI 生成初版程式碼，你預覽效果
4. 用自然語言繼續迭代調整
5. 遇到細節問題時查閱組件庫文檔

### 練習

選擇以下任一場景，用 AI IDE + 組件庫從零完成：

1. 用 HeroUI 為你之前做的項目（比如霍格沃茨畫像）做一個展示落地頁
2. 用 shadcn/ui 構建一個筆記應用的主界面（側邊欄 + 編輯器）
3. 用 Ant Design 構建一個簡單的內容管理後臺（文章列表 + 新建文章表單）

---

## 附錄：更多組件庫一覽

除了正文介紹的四個核心庫，前端生態中還有大量優秀的組件庫。下面按框架分類列出，方便你根據項目需求選擇。

### Vue 生態

| 組件庫 | Stars | 簡介 | 適用場景 |
| :--- | :--- | :--- | :--- |
| [Element Plus](https://element-plus.org) | ~27k | 餓了麼團隊打造的 Vue 3 企業級組件庫，國內使用最廣泛，中文生態極佳 | 中後臺管理系統 |
| [Vuetify](https://vuetifyjs.com) | ~41k | 最流行的 Vue Material Design 組件庫，80+ 組件，文檔完善 | Google 設計風格項目 |
| [Ant Design Vue](https://antdv.com) | ~21k | 基於螞蟻設計體系的 Vue 3 組件庫，設計規範統一 | 企業級中後臺 |
| [Naive UI](https://www.naiveui.com) | ~18k | TypeScript 編寫，主題定製性極強，不依賴 CSS 預處理器 | 對設計有獨特要求的項目 |
| [Quasar](https://quasar.dev) | ~27k | 一套程式碼構建 SPA、SSR、PWA、移動端和桌面端應用 | 跨平臺項目 |
| [Vant](https://vant-ui.github.io/vant) | ~24k | 有贊團隊開發的輕量級移動端組件庫，覆蓋電商常見需求 | 移動端 H5 頁面 |
| [PrimeVue](https://primevue.org) | ~14k | 90+ 組件，支持多種主題（Material、Bootstrap 等） | 需要豐富組件和多主題 |
| [Arco Design Vue](https://arco.design/vue) | ~3k | 字節跳動出品，組件質量高，內置暗色模式 | 中後臺產品 |
| [TDesign Vue Next](https://tdesign.tencent.com/vue-next) | ~2k | 騰訊出品，設計語言統一，覆蓋桌面端常用場景 | 騰訊生態或企業級項目 |

### React 生態

| 組件庫 | Stars | 簡介 | 適用場景 |
| :--- | :--- | :--- | :--- |
| [Material UI (MUI)](https://mui.com) | ~95k | Google Material Design 規範的老牌實現，組件最全面，生態最成熟 | 快速構建企業級應用 |
| [Ant Design](https://ant.design) | ~94k | 螞蟻集團出品，內置大量高質量業務組件，中文開發者社區主導地位 | 企業級中後臺 |
| [shadcn/ui](https://ui.shadcn.com) | ~83k | 程式碼複製到項目中而非 npm 安裝，基於 Radix UI + Tailwind CSS，完全可控 | 需要高度定製的項目 |
| [Chakra UI](https://chakra-ui.com) | ~39k | 以開發體驗為核心，API 簡潔，內置無障礙訪問支持 | 快速原型開發 |
| [Mantine](https://mantine.dev) | ~28k | 100+ 組件和 50+ hooks，涵蓋日期選擇器、富文本編輯器等高級組件 | 需要開箱即用的全功能方案 |
| [Headless UI](https://headlessui.com) | ~27k | Tailwind Labs 官方出品的無樣式組件庫，同時支持 React 和 Vue | 搭配 Tailwind CSS 使用 |
| [HeroUI](https://heroui.com) | ~24k | 基於 Tailwind CSS + React Aria，默認樣式精美，動畫流暢 | 追求視覺品質的項目 |
| [Radix UI](https://www.radix-ui.com) | ~17k | 無樣式底層組件原語庫，專注無障礙和組件行為，是 shadcn/ui 的底層基礎 | 構建自定義設計系統 |

#### shadcn/ui 擴展生態

除了上述通用組件庫，shadcn/ui 生態中還湧現了大量基於其理念的擴展庫，為特定場景提供差異化選擇。這些擴展庫同樣採用"複製程式碼到項目"的模式，讓開發者擁有完全的源碼控制權。

| 組件庫 | 簡介 | 適用場景 |
| :--- | :--- | :--- |
| [Aceternity UI](https://ui.aceternity.com) | 200+ 生產級組件，主打發光卡片、文字漸變、3D 地球等特色視覺組件 | 高質感落地頁、SaaS 產品 |
| [Tailark UI](https://tailark.com) | 營銷網站組件塊集合，產品展示、客戶證言、CTA 按鈕等營銷高頻模塊 | 營銷落地頁、產品官網 |
| [UI Tripled](https://ui.tripled.work) | 基於 Framer Motion 的動態交互組件，彈窗、導航、卡片動畫 | 創意工具、個人作品集 |
| [Neobrutalism UI](https://neobrutalism.dev) | 新粗野主義風格，粗線條、高對比度、鮮明色彩 | 個性化品牌官網、創意項目 |
| [REUI](https://reui.io) | 967+ 真實業務場景的組件組合模式 | 企業級後臺、複雜表單 |
| [Cult UI](https://cult-ui.com) | 更細的交互/視覺打磨，資料表格、篩選面板等複合組件 | 高質感商業項目 |
| [Kibo UI](https://kibo-ui.com) | 高級業務組件，顏色選擇器、富文本編輯器、文件上傳等 | 管理後臺、工具類產品 |
| [Kokonut UI](https://kokonutui.com) | 100+ 組件 + 7+ 完整模板，清新簡約風格 | SaaS 官網、博客、電商 |
| [Commerce UI](https://ui.stackzero.co) | 電商場景專用，商品卡片、購物車、結算表單 | 電商平臺 |
| [shadcnblocks](https://shadcnblocks.com) | 1373 個 UI 塊 + 13 套完整模板，資源最全面 | 所有場景 |
| [Shoogle](https://shoogle.dev) | shadcn/ui 生態聚合檢索平臺 | 快速查找資源 |
| [Discover All Shadcn](https://allshadcn.com) | 聚合型資源導航 | 快速查找資源 |

> **為什麼選擇 shadcn/ui 擴展？** 這些擴展繼承了 shadcn/ui"程式碼所有權"的理念，同時為特定場景做了深度定製。Vibe Coding 時代，它們讓你能快速找到符合設計需求的組件，跳出主流 UI 庫的同質化，做出更具差異化的產品。
