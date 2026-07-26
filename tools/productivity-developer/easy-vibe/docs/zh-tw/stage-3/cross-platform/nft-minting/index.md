# 如何快速構建並鑄造 NFT：10 分鐘入門版

# 第一章：NFT 與智能合約是什麼

在本教程中，我們將完成一個完整的閉環：從零開始編寫 NFT 智能合約，部署到以太坊測試網，鑄造你自己的 NFT，並在 OpenSea 上查看。整個過程使用基於瀏覽器的工具，無需本地環境配置，10 分鐘內即可完成。

學習本教程，你至少需要準備：

- Chrome 瀏覽器（已安裝 MetaMask 錢包擴展）
- 一個 MetaMask 錢包帳戶
- 少量 Sepolia 測試網 ETH（免費領取，如下所示）

> **零成本、零配置**：整個過程使用基於瀏覽器的工具（Remix IDE），無需安裝 Node.js / Hardhat；代碼使用 OpenZeppelin 官方安全模板；鑄造完成後，你可以在 OpenSea 測試網上查看你的 NFT。

## 1.1 什麼是 NFT？

NFT（Non-Fungible Token，非同質化代幣）是區塊鏈上的一種數位資產。與比特幣或以太幣等同質化代幣不同，每個 NFT 都是獨一無二的，就像世界上沒有兩幅完全相同的畫作。

你可以將 NFT 理解為一個**「數位世界的收藏證書」**。它可以代表：

* 一件數位藝術品的所有權
* 一張活動門票
* 一個遊戲道具
* 一張學習證書
* 甚至一條推文

NFT 的核心價值在於：**它利用區塊鏈技術證明「這個數位物品屬於你」，而且這個證明是公開、透明且不可篡改的。**

<!-- ![placeholder: NFT 概念圖：左側為數位藝術品，右側為區塊鏈上的所有權記錄，以箭頭連接](/zh-cn/stage-3/cross-platform/nft-minting/images/image1.png) -->

## 1.2 什麼是智能合約？

智能合約是運行在區塊鏈上的一段代碼。你可以把它理解為一份**「自動執行的合約」**。一旦部署到鏈上，它就會按照代碼邏輯自動運行，沒有人可以篡改它。

NFT 是通過智能合約來創建和管理的。當你「鑄造」一個 NFT 時，實際上是在調用智能合約中的一個函數，在鏈上寫入：「NFT #0 屬於你的錢包地址。」

我們將使用 **Solidity** 來編寫合約。不用擔心，使用 OpenZeppelin 的現成模板，你只需要編寫不到 15 行代碼。

## 1.3 我們要鑄造什麼 NFT？

我們將鑄造一個**「Vibe Coder 學習證書」** NFT，證明你完成了本教程並學習了區塊鏈開發基礎知識。這個 NFT 將：

* 擁有唯一的 Token ID
* 被記錄在以太坊 Sepolia 測試網上
* 可以在 OpenSea 測試網上查看和展示
* （可選）包含你的自定義圖片

當然，你可以將其改為任何你喜歡的主題：AI 生成的藝術品、活動紀念卡、像素頭像等等。NFT 的內容完全由你決定。

## 1.4 為什麼使用測試網？

以太坊有「主網」和「測試網」：

| 對比項 | 主網 | 測試網（Sepolia） |
|------|----------------|------------------|
| ETH 價值 | 真實貨幣 | 免費領取，無真實價值 |
| 部署成本 | 需要真實 Gas 費 | 完全免費 |
| 使用場景 | 生產環境發佈 | 學習、測試、開發 |
| 功能差異 | 無 | 與主網相同 |

測試網和主網在功能上完全相同。唯一的區別是測試網 ETH 沒有真實價值。因此你可以放心在測試網上學習和實驗，而不用擔心花錢。

## 1.5 教程路線圖

我們將按以下步驟完成整個流程：

1. **準備錢包和測試 ETH**（2 分鐘）：安裝 MetaMask 並領取免費測試 ETH
2. **編寫和部署合約**（4 分鐘）：在 Remix IDE 中編寫 NFT 合約並部署到 Sepolia
3. **鑄造 NFT 並驗證結果**（4 分鐘）：調用合約鑄造 NFT 並在 OpenSea 和 Etherscan 上驗證
4. **進階：為 NFT 添加圖片**（可選）：將圖片存儲在 IPFS 上，使 NFT 完整

# 第二章：準備錢包和測試 ETH（2 分鐘）

## 2.1 安裝 MetaMask 錢包

MetaMask 是最受歡迎的以太坊錢包。它是一個瀏覽器擴展，讓你能夠與區塊鏈應用交互。

1. 打開 Chrome 瀏覽器，訪問 [MetaMask 官網](https://metamask.io/)
2. 點擊 **「Download」** 並安裝 Chrome 擴展
3. 安裝完成後，點擊右上角的 MetaMask 狐狸圖標
4. 選擇 **「Create a new wallet」** 並設置密碼
5. **重要**：妥善保管你的恢復短語（12 個單詞）。雖然測試錢包遺失問題不大，但養成好習慣很重要

<!-- ![placeholder: MetaMask 安裝和創建錢包流程截圖：安裝擴展 -> 創建錢包 -> 設置密碼 -> 備份恢復短語](/zh-cn/stage-3/cross-platform/nft-minting/images/image2.png) -->

## 2.2 切換到 Sepolia 測試網

MetaMask 默認連接到以太坊主網。我們需要切換到 Sepolia 測試網：

1. 點擊 MetaMask 頂部的網絡下拉選單（默認顯示「Ethereum Mainnet」）
2. 點擊 **「Show test networks」**
3. 選擇 **「Sepolia test network」**

如果你看不到 Sepolia，點擊 **「Add network」** 手動添加：

| 配置項 | 值 |
|-------|-----|
| 網絡名稱 | Sepolia test network |
| RPC URL | `https://rpc.sepolia.org` |
| Chain ID | 11155111 |
| 貨幣符號 | SepoliaETH |
| 區塊瀏覽器 | `https://sepolia.etherscan.io` |

<!-- ![placeholder: 通過網絡下拉選單將 MetaMask 切換到 Sepolia 測試網的截圖](/zh-cn/stage-3/cross-platform/nft-minting/images/image3.png) -->

## 2.3 領取免費測試 ETH

部署合約和鑄造 NFT 需要 Gas 費。在測試網上，Gas 用測試 ETH 支付，而測試 ETH 是免費的。

訪問以下任一水龍頭，輸入你的錢包地址即可領取免費的 Sepolia ETH：

| 水龍頭 | 網址 | 每次領取數量 | 是否需要登入 |
|--------|------|-----------|------------|
| QuickNode | `https://faucet.quicknode.com/ethereum/sepolia` | 0.1 ETH | 是 |
| Alchemy | `https://www.alchemy.com/faucets/ethereum-sepolia` | 0.1 ETH | 是 |
| Google Cloud | `https://cloud.google.com/application/web3/faucet/ethereum/sepolia` | 0.05 ETH | 是（Google 帳號） |

> **提示**：0.1 個測試 ETH 足夠部署合約並鑄造數十個 NFT。如果一個水龍頭失敗，試試其他的。

領取成功後，返回 MetaMask，你的餘額應該從 0 變為 0.1 ETH（可能需要幾秒鐘）。

<!-- ![placeholder: 水龍頭網站截圖，顯示輸入錢包地址和領取測試 ETH](/zh-cn/stage-3/cross-platform/nft-minting/images/image4.png) -->

# 第三章：編寫和部署 NFT 智能合約（4 分鐘）

## 3.1 打開 Remix IDE

Remix 是以太坊官方推薦的在線智能合約開發環境。它完全在瀏覽器中運行，無需安裝。

打開：**https://remix.ethereum.org/**

你會看到一個類似 VS Code 的界面：左側是文件瀏覽器，中間是代碼編輯器，右側是編譯/部署面板。

<!-- ![placeholder: Remix IDE 首頁截圖，顯示文件瀏覽器、代碼編輯器和右側面板](/zh-cn/stage-3/cross-platform/nft-minting/images/image5.png) -->

## 3.2 創建合約文件

1. 在左側文件瀏覽器中，點擊 **「contracts」** 文件夾
2. 點擊上方的 **「+」** 按鈕創建新文件
3. 命名為 **`MySimpleNFT.sol`**
4. 粘貼以下代碼：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// 匯入 OpenZeppelin 官方安全的 ERC721 模板
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// 最簡單的 NFT 合約：僅包含名稱、符號和鑄造函數
contract MySimpleNFT is ERC721 {
    uint256 private _tokenId;

    // 初始化合集名稱和符號
    constructor() ERC721("VibeCoder", "VIBE") {}

    // 鑄造 NFT：調用一次即向調用者鑄造一個 Token
    function mint() public {
        _safeMint(msg.sender, _tokenId);
        _tokenId++;
    }
}
```

**代碼解析（不到 15 行，每行都清晰易懂）：**

| 代碼 | 含義 |
|------|------|
| `pragma solidity ^0.8.20` | 指定 Solidity 編譯器版本 |
| `import "@openzeppelin/..."` | 匯入 OpenZeppelin ERC721 標準實現（經過安全審計的模板） |
| `contract MySimpleNFT is ERC721` | 創建一個繼承 ERC721 標準的合約 |
| `ERC721("VibeCoder", "VIBE")` | 設置合集名稱 "VibeCoder" 和符號 "VIBE" |
| `_safeMint(msg.sender, _tokenId)` | 向調用者鑄造一個新的 NFT |
| `_tokenId++` | 每次鑄造後遞增 Token ID |

> **什麼是 ERC721？** 它是以太坊上的 NFT 標準，定義了 NFT 的基本能力（轉移、查詢所有者等）。OpenZeppelin 提供了經過安全審計的實現，我們可以直接繼承而無需從零開始構建。

<!-- ![placeholder: Remix IDE 中粘貼合約代碼的截圖](/zh-cn/stage-3/cross-platform/nft-minting/images/image6.png) -->

## 3.3 編譯合約

1. 點擊左側面板的 **「Solidity Compiler」**（錘子圖標）
2. 選擇編譯器版本 **0.8.20**（或 0.8.x 的更高版本）
3. 點擊 **「Compile MySimpleNFT.sol」**
4. 綠色勾號 ✅ 表示編譯成功

> 如果出現錯誤，請檢查 Solidity 版本是否匹配以及 OpenZeppelin 匯入路徑是否正確。Remix 會自動從 npm 下載 OpenZeppelin 依賴。

<!-- ![placeholder: Remix 編譯成功截圖，顯示綠色勾號和選定的編譯器版本](/zh-cn/stage-3/cross-platform/nft-minting/images/image7.png) -->

## 3.4 部署合約到 Sepolia 測試網

1. 點擊左側面板的 **「Deploy & Run Transactions」**（以太坊圖標）
2. 將 **Environment** 設置為 **「Injected Provider - MetaMask」**
   - 這會自動連接你的 MetaMask 錢包
   - MetaMask 會彈出連接請求，點擊 **「Connect」**
3. 確認網絡為 **Sepolia (11155111)**
4. 在 Contract 下拉選單中選擇 **MySimpleNFT**
5. 點擊 **「Deploy」**
6. MetaMask 彈出交易確認，點擊 **「Confirm」**（Gas 費非常低；測試網免費）

幾秒鐘後，部署成功時，下方 **「Deployed Contracts」** 區域會顯示你的合約地址。**複製並保存這個地址**，後面會用到。

<!-- ![placeholder: Remix 部署截圖，顯示環境選擇、MetaMask 確認、Deploy 按鈕和已部署的合約地址](/zh-cn/stage-3/cross-platform/nft-minting/images/image8.png) -->

# 第四章：鑄造 NFT 並驗證結果（4 分鐘）

## 4.1 鑄造你的第一個 NFT

部署成功後，在 Remix 的 **「Deployed Contracts」** 區域，你會看到合約交互面板。

1. 展開合約面板，找到 **「mint」** 按鈕（橙色）
2. 直接點擊 **「mint」**（無需輸入參數）
3. MetaMask 彈出交易確認，點擊 **「Confirm」**
4. 等待幾秒鐘完成

恭喜！你剛剛鑄造了 NFT #0，它現在屬於你的錢包地址。

你可以繼續點擊 "mint" 來創建更多。每次 Token ID 會自動遞增（#1、#2、#3...）。

<!-- ![placeholder: 在 Remix 中點擊 mint 並在 MetaMask 中確認交易的截圖](/zh-cn/stage-3/cross-platform/nft-minting/images/image9.png) -->

## 4.2 驗證鑄造結果

**方法一：在 Remix 中驗證**

在合約面板中找到 **「balanceOf」**（藍色按鈕），輸入你的錢包地址並調用。如果返回 `1`（或你鑄造的數量），說明鑄造成功。

你也可以調用 **「ownerOf」**，輸入 `0`（Token ID），它會返回你的錢包地址，證明 NFT #0 屬於你。

**方法二：在 Etherscan 上驗證（推薦）**

1. 打開 [Sepolia Etherscan](https://sepolia.etherscan.io/)
2. 在搜索框中粘貼你的**合約地址**
3. 你會看到合約詳情頁面，包含所有交易記錄
4. 點擊 **「Token Tracker」** 查看你合約鑄造的所有 NFT

在 Etherscan 上，每筆鑄造交易都有完整記錄：誰鑄造的、什麼時候鑄造的、Token ID 是多少。這就是區塊鏈「公開、透明、不可篡改」的魅力。

<!-- ![placeholder: 在 Sepolia Etherscan 上查看合約和 NFT 鑄造記錄的截圖，包括交易列表和 Token Tracker](/zh-cn/stage-3/cross-platform/nft-minting/images/image10.png) -->

# 第五章：進階 - 為 NFT 添加圖片（可選）

目前鑄造的 NFT 只有 ID，沒有圖片或描述。要讓 NFT 完整，我們需要 **IPFS（星際文件系統）** 來存儲圖片和元數據。

## 5.1 什麼是 IPFS？

IPFS 是一個去中心化的文件存儲網絡。與普通雲存儲不同，IPFS 上的文件不依賴單一服務器，而是分佈在全球的節點上。這意味著：

* 不會因為一台服務器宕機而丟失文件
* 文件內容通過哈希值唯一標識，不可被篡改
* 非常適合存儲 NFT 圖片和元數據

## 5.2 上傳圖片到 Pinata

[Pinata](https://pinata.cloud/) 是最受歡迎的 IPFS 存儲服務。免費版提供 1GB 存儲空間，對我們來說綽綽有餘。

1. 訪問 https://pinata.cloud/ 並註冊免費帳號
2. 登入後，點擊 **「Upload」** -> **「File」**
3. 選擇你想作為 NFT 藝術品的圖片（AI 生成的圖片也可以，或任何圖片）
4. 上傳成功後，複製 **CID**（一串類似 `QmXyz...` 的字符串）

你的圖片 URI 為：`ipfs://yourCID`

<!-- ![placeholder: 在 Pinata 中上傳圖片的截圖，包括上傳按鈕和生成的 CID](/zh-cn/stage-3/cross-platform/nft-minting/images/image11.png) -->

## 5.3 創建元數據 JSON

NFT 元數據是一個 JSON 文件，描述 NFT 的名稱、描述和圖片 URI。創建一個 `metadata.json`：

```json
{
  "name": "Vibe Coder Certificate #0",
  "description": "This NFT certifies that the holder has completed the NFT minting tutorial and entered the world of Web3.",
  "image": "ipfs://your-image-cid",
  "attributes": [
    { "trait_type": "Course", "value": "Easy Vibe" },
    { "trait_type": "Skill", "value": "Smart Contract" },
    { "trait_type": "Level", "value": "Beginner" }
  ]
}
```

同樣將 `metadata.json` 上傳到 Pinata，獲取元數據 CID。

## 5.4 升級合約以支援圖片

要讓 NFT 包含圖片，我們需要稍微升級合約，添加 `tokenURI`。回到 Remix，創建新文件 `MyNFTWithImage.sol`：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFTWithImage is ERC721, ERC721URIStorage {
    uint256 private _tokenId;

    constructor() ERC721("VibeCoder", "VIBE") {}

    // 鑄造時傳入元數據 URI
    function mint(string memory uri) public {
        _safeMint(msg.sender, _tokenId);
        _setTokenURI(_tokenId, uri);
        _tokenId++;
    }

    // Solidity 要求的覆寫函數
    function tokenURI(uint256 tokenId)
        public view override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public view override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
```

部署後，調用 `mint` 並傳入你的元數據 URI（例如 `ipfs://QmAbc.../metadata.json`）。然後你鑄造的 NFT 就會包含圖片和描述。

<!-- ![placeholder: 在 Etherscan 上顯示帶圖片的 NFT 詳情截圖](/zh-cn/stage-3/cross-platform/nft-minting/images/image12.png) -->

# 第六章：總結

恭喜！你已經完成了一個從零開始的完整 NFT 開發閉環。讓我們回顧一下：

1. 理解了 NFT 和智能合約的核心概念
2. 安裝了 MetaMask 並切換到 Sepolia 測試網
3. 在 Remix IDE 中用不到 15 行代碼編寫了 NFT 智能合約
4. 將合約部署到了以太坊測試網
5. 鑄造了自己的 NFT 並在 Etherscan 上驗證
6. （可選）學習了如何使用 IPFS 添加圖片和元數據

整個過程無需安裝本地環境、不花一分錢、完全在瀏覽器中完成。這就是區塊鏈開發的魅力：門檻比大多數人想像的要低得多。

**進階方向：**

* **使用 Hardhat / Foundry 進行本地開發**：當合約邏輯變得複雜時，Remix 就不夠用了。Hardhat 和 Foundry 是專業的本地開發框架，支援自動化測試、腳本部署、Gas 優化等功能
* **添加白名單和鑄造限制**：控制誰可以鑄造、每個錢包最大鑄造數量、鑄造價格等規則
* **構建鑄造前端**：使用 React + ethers.js / viem 構建精美的鑄造頁面，實現一鍵網頁鑄造
* **探索 ERC1155 多版本 NFT**：ERC1155 允許一個 Token ID 下有多個副本，適用於遊戲道具和門票
* **部署到主網**：準備好後，部署到以太坊主網（或 Polygon、Base 等 Gas 費更低的 L2 鏈）

***你的第一個 NFT 已經在鏈上了。區塊鏈世界的大門已經為你打開。***

# 參考資料

* [OpenZeppelin ERC721 文件](https://docs.openzeppelin.com/contracts/5.x/erc721)
* [Remix IDE 官方文件](https://remix-ide.readthedocs.io/)
* [MetaMask 官方文件](https://docs.metamask.io/)
* [Solidity 官方文件](https://docs.soliditylang.org/)
* [Sepolia Etherscan](https://sepolia.etherscan.io/)
* [Pinata IPFS 存儲服務](https://pinata.cloud/)
* [ERC721 標準規範 (EIP-721)](https://eips.ethereum.org/EIPS/eip-721)
