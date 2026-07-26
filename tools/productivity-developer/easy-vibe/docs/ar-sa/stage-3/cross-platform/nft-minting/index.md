# كيفية إنشاء وسك NFT بسرعة: دليل المبتدئين في 10 دقائق

# الفصل 1: ما هو NFT والعقود الذكية

في هذا البرنامج التعليمي، سنكمل حلقة كاملة: كتابة عقد ذكي لـ NFT من الصفر، نشره على شبكة اختبار Ethereum، سك NFT الخاص بك، وعرضه على OpenSea. العملية بالكامل تستخدم أدوات تعمل في المتصفح دون الحاجة لإعداد بيئة محلية، ويمكن إنجازها في 10 دقائق.

لهذا البرنامج التعليمي، يجب أن تمتلك على الأقل:

- متصفح Chrome (مع إضافة MetaMask wallet مثبتة)
- حساب محفظة MetaMask
- كمية صغيرة من ETH التجريبي من شبكة Sepolia (مجاني، كما هو موضح أدناه)

> **صفر تكلفة، صفر إعداد**: العملية بالكامل تستخدم أدوات تعمل في المتصفح (Remix IDE)، لا حاجة لتثبيت Node.js / Hardhat؛ الكود يستخدم قوالب OpenZeppelin الرسمية الآمنة؛ بعد السك، يمكنك عرض NFT الخاص بك على شبكة OpenSea التجريبية.

## 1.1 ما هو NFT؟

NFT (Non-Fungible Token) هو نوع من الأصول الرقمية على البلوكتشين. على عكس العملات القابلة للاستبدال مثل Bitcoin أو Ether، كل NFT فريد، مثلما لا توجد لوحتان في العالم متطابقتان تمامًا.

يمكنك فهم NFT كـ **"شهادة ملكية في العالم الرقمي."** يمكن أن يمثل:

* ملكية عمل فني رقمي
* تذكرة حدث
* عنصر في لعبة
* شهادة تعلم
* حتى تغريدة

القيمة الأساسية لـ NFT هي: **استخدام تقنية البلوكتشين لإثبات "هذه السلعة الرقمية ملك لك"، وهذا الإثبات علني وشفاف وغير قابل للتلاعب.**

<!-- ![placeholder: مخطط مفاهيمي لـ NFT: عمل فني رقمي على اليسار، سجل ملكية على البلوكتشين على اليمين، متصلان بأسهم](/zh-cn/stage-3/cross-platform/nft-minting/images/image1.png) -->

## 1.2 ما هو العقد الذكي؟

العقد الذكي هو قطعة من الكود تعمل على البلوكتشين. يمكنك التفكير فيه كـ **"عقد يُنفذ تلقائيًا"**. بمجرد نشره على السلسلة، يعمل تلقائيًا وفقًا لمنطق الكود، ولا يمكن لأي شخص التلاعب به.

يتم إنشاء NFTs وإدارتها من خلال العقود الذكية. عندما "تسك" NFT، فإنك في الواقع تستدعي دالة في العقد الذكي للكتابة على السلسلة: "NFT رقم 0 يخص عنوان محفظتك."

سنستخدم **Solidity** لكتابة العقد. لا تقلق. مع القوالب الجاهزة من OpenZeppelin، ستحتاج لكتابة أقل من 15 سطرًا فقط من الكود.

## 1.3 ما هو NFT الذي سنسكه؟

سنسك NFT **"شهادة تعلم Vibe Coder"** لإثبات أنك أكملت هذا البرنامج التعليمي وتعلمت أساسيات تطوير البلوكتشين. سيكون هذا NFT:

* لديه معرف رمز فريد (token ID)
* مسجل على شبكة اختبار Ethereum Sepolia
* قابل للعرض والعرض على شبكة OpenSea التجريبية
* (اختياري) يتضمن صورتك المخصصة

بالطبع، يمكنك تغييره إلى أي موضوع تفضله: عمل فني مولد بالذكاء الاصطناعي، بطاقة تذكار حدث، صورة رمزية بكسل، والمزيد. محتوى NFT يعتمد عليك بالكامل.

## 1.4 لماذا نستخدم شبكة اختبار؟

يحتوي Ethereum على "الشبكة الرئيسية" و"شبكة الاختبار":

| المقارنة | الشبكة الرئيسية | شبكة الاختبار (Sepolia) |
|------|----------------|------------------|
| قيمة ETH | أموال حقيقية | مجانية، بدون قيمة حقيقية |
| تكلفة النشر | يتطلب رسوم غاز حقيقية | مجاني تمامًا |
| حالة الاستخدام | الإنتاج النهائي | التعلم، الاختبار، التطوير |
| الفرق الوظيفي | لا يوجد | نفس الشبكة الرئيسية |

شبكة الاختبار والشبكة الرئيسية متطابقتان وظيفيًا. الفرق الوحيد هو أن ETH التجريبي ليس له قيمة حقيقية. لذا يمكنك التعلم والتجربة بأمان على شبكة الاختبار دون القلق بشأن إنفاق المال.

## 1.5 خارطة طريق البرنامج التعليمي

سنكمل العملية في هذه الخطوات:

1. **إعداد المحفظة و ETH التجريبي** (دقيقتان): تثبيت MetaMask والحصول على ETH تجريبي مجاني
2. **كتابة ونشر العقد** (4 دقائق): كتابة عقد NFT في Remix IDE ونشره على Sepolia
3. **سك NFT والتحقق من النتيجة** (4 دقائق): استدعاء العقد لسك NFT والتحقق على OpenSea و Etherscan
4. **متقدم: إضافة صورة إلى NFT** (اختياري): تخزين الصورة على IPFS لجعل NFT كاملًا

# الفصل 2: إعداد المحفظة و ETH التجريبي (دقيقتان)

## 2.1 تثبيت محفظة MetaMask

MetaMask هي محفظة Ethereum الأكثر شعبية. إنها إضافة متصفح تتيح لك التفاعل مع تطبيقات البلوكتشين.

1. افتح Chrome ويزر [موقع MetaMask الرسمي](https://metamask.io/)
2. انقر على **"Download"** وثبت إضافة Chrome
3. بعد التثبيت، انقر على أيقونة الثعلب الخاصة بـ MetaMask في الزاوية العلوية اليمنى
4. اختر **"Create a new wallet"** وحدد كلمة مرور
5. **مهم**: احتفظ بعبارة الاسترداد (12 كلمة) في مكان آمن. فقدان محفظة تجريبية ليس مشكلة، لكن العادات الجيدة مهمة

<!-- ![placeholder: لقطات شاشة لتثبيت MetaMask وإنشاء المحفظة: تثبيت الإضافة -> إنشاء محفظة -> تعيين كلمة مرور -> نسخ عبارة الاسترداد الاحتياطي](/zh-cn/stage-3/cross-platform/nft-minting/images/image2.png) -->

## 2.2 التبديل إلى شبكة اختبار Sepolia

يتصل MetaMask بشبكة Ethereum الرئيسية افتراضيًا. نحتاج للتبديل إلى شبكة اختبار Sepolia:

1. انقر على القائمة المنسدلة للشبكة في أعلى MetaMask (الافتراضي: "Ethereum Mainnet")
2. انقر على **"Show test networks"**
3. اختر **"Sepolia test network"**

إذا لم ترَ Sepolia، انقر على **"Add network"** وأضفها يدويًا:

| عنصر الإعداد | القيمة |
|-------|-----|
| اسم الشبكة | Sepolia test network |
| عنوان RPC | `https://rpc.sepolia.org` |
| معرف السلسلة | 11155111 |
| رمز العملة | SepoliaETH |
| مستكشف الكتل | `https://sepolia.etherscan.io` |

<!-- ![placeholder: لقطة شاشة للتبديل إلى شبكة اختبار Sepolia في MetaMask عبر القائمة المنسدلة للشبكة](/zh-cn/stage-3/cross-platform/nft-minting/images/image3.png) -->

## 2.3 الحصول على ETH تجريبي مجاني

نشر العقود وسك NFTs يتطلب رسوم غاز. على شبكة الاختبار، يتم دفع الغاز بـ ETH التجريبي، وهو مجاني.

زر أي صنبور (faucet) أدناه وأدخل عنوان محفظتك للحصول على Sepolia ETH مجاني:

| الصنبور | الرابط | المبلغ لكل طلب | تسجيل الدخول مطلوب |
|--------|------|-----------|------------|
| QuickNode | `https://faucet.quicknode.com/ethereum/sepolia` | 0.1 ETH | نعم |
| Alchemy | `https://www.alchemy.com/faucets/ethereum-sepolia` | 0.1 ETH | نعم |
| Google Cloud | `https://cloud.google.com/application/web3/faucet/ethereum/sepolia` | 0.05 ETH | نعم (حساب Google) |

> **نصيحة**: 0.1 ETH تجريبي كافٍ لنشر عقد وسك عشرات NFTs. إذا فشل صنبور، جرب آخر.

بعد الحصول بنجاح، عد إلى MetaMask وسيظهر رصيدك من 0 إلى 0.1 ETH (قد يستغرق بضع ثوانٍ).

<!-- ![placeholder: لقطة شاشة لموقع الصنبور تُظهر إدخال عنوان المحفظة والحصول على ETH تجريبي](/zh-cn/stage-3/cross-platform/nft-minting/images/image4.png) -->

# الفصل 3: كتابة ونشر عقد NFT الذكي (4 دقائق)

## 3.1 فتح Remix IDE

Remix هي بيئة تطوير العقود الذكية عبر الإنترنت الموصى بها رسميًا من Ethereum. تعمل بالكامل في المتصفح ولا تتطلب تثبيتًا.

افتح: **https://remix.ethereum.org/**

سترى واجهة مشابهة لـ VS Code: مستكشف الملفات على اليسار، محرر الكود في المنتصف، ولوحة التجميع/النشر على اليمين.

<!-- ![placeholder: لقطة شاشة للصفحة الرئيسية لـ Remix IDE تُظهر مستكشف الملفات ومحرر الكود واللوحة الجانبية](/zh-cn/stage-3/cross-platform/nft-minting/images/image5.png) -->

## 3.2 إنشاء ملف العقد

1. في مستكشف الملفات الأيسر، انقر على مجلد **"contracts"**
2. انقر على زر **"+"** أعلاه لإنشاء ملف جديد
3. سمّه **`MySimpleNFT.sol`**
4. الصق الكود أدناه:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Import OpenZeppelin official secure ERC721 template
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Simplest NFT contract: name, symbol, mint function only
contract MySimpleNFT is ERC721 {
    uint256 private _tokenId;

    // Initialize collection name and symbol
    constructor() ERC721("VibeCoder", "VIBE") {}

    // Mint NFT: call once to mint one token to caller
    function mint() public {
        _safeMint(msg.sender, _tokenId);
        _tokenId++;
    }
}
```

**شرح الكود (أقل من 15 سطرًا، وكل سطر مفهوم):**

| الكود | المعنى |
|------|------|
| `pragma solidity ^0.8.20` | تحديد إصدار مترجم Solidity |
| `import "@openzeppelin/..."` | استيراد تنفيذ معيار ERC721 من OpenZeppelin (قالب خاضع لتدقيق أمني) |
| `contract MySimpleNFT is ERC721` | إنشاء عقد يرث معيار ERC721 |
| `ERC721("VibeCoder", "VIBE")` | تعيين اسم المجموعة "VibeCoder" والرمز "VIBE" |
| `_safeMint(msg.sender, _tokenId)` | سك NFT جديد للمستدعي |
| `_tokenId++` | زيادة معرف الرمز بعد كل سك |

> **ما هو ERC721؟** هو معيار NFT على Ethereum، يحدد قدرات NFT الأساسية (النقل، استعلام المالك، إلخ). توفر OpenZeppelin تنفيذًا خاضعًا للتدقيق الأمني، حتى نتمكن من الوراثة مباشرة بدلاً من البناء من الصفر.

<!-- ![placeholder: لقطة شاشة لكود العقد الملصق في Remix IDE](/zh-cn/stage-3/cross-platform/nft-minting/images/image6.png) -->

## 3.3 تجميع العقد

1. انقر على **"Solidity Compiler"** في اللوحة اليسرى (أيقونة المطرقة)
2. اختر إصدار المترجم **0.8.20** (أو أعلى في 0.8.x)
3. انقر على **"Compile MySimpleNFT.sol"**
4. علامة اختيار خضراء ✅ تعني نجاح التجميع

> إذا كان هناك خطأ، تحقق مما إذا كان إصدار Solidity مطابقًا ومسار استيراد OpenZeppelin صحيحًا. يقوم Remix بتنزيل تبعيات OpenZeppelin من npm تلقائيًا.

<!-- ![placeholder: لقطة شاشة لنجاح التجميع في Remix مع علامة اختيار خضراء وإصدار المترجم المحدد](/zh-cn/stage-3/cross-platform/nft-minting/images/image7.png) -->

## 3.4 نشر العقد على شبكة اختبار Sepolia

1. انقر على **"Deploy & Run Transactions"** في اللوحة اليسرى (أيقونة Ethereum)
2. عيّن **Environment** إلى **"Injected Provider - MetaMask"**
   - هذا يربط محفظة MetaMask تلقائيًا
   - ستظهر MetaMask طلب اتصال، انقر على **"Connect"**
3. تأكد أن الشبكة هي **Sepolia (11155111)**
4. اختر **MySimpleNFT** في قائمة Contract المنسدلة
5. انقر على **"Deploy"**
6. تظهر MetaMask تأكيد المعاملة، انقر على **"Confirm"** (الغاز منخفض جدًا؛ شبكة الاختبار مجانية)

بعد بضع ثوانٍ، عند نجاح النشر، ستعرض قسم **"Deployed Contracts"** أدناه عنوان العقد الخاص بك. **انسخ واحفظ هذا العنوان**؛ ستحتاجه لاحقًا.

<!-- ![placeholder: لقطة شاشة لنشر Remix تُظهر اختيار البيئة وتأكيد MetaMask وزر Deploy وعنوان العقد المنشور](/zh-cn/stage-3/cross-platform/nft-minting/images/image8.png) -->

# الفصل 4: سك NFT والتحقق من النتيجة (4 دقائق)

## 4.1 سك أول NFT لك

بعد النشر الناجح، في قسم **"Deployed Contracts"** في Remix، سترى لوحة تفاعل العقد.

1. وسّع لوحة العقد وابحث عن زر **"mint"** (برتقالي)
2. انقر على **"mint"** مباشرة (لا حاجة لمعلمات إدخال)
3. تظهر MetaMask تأكيد المعاملة، انقر على **"Confirm"**
4. انتظر بضع ثوانٍ للإكمال

تهانينا! لقد سككت للتو NFT رقم 0، وهو الآن ملك لعنوان محفظتك.

يمكنك الاستمرار في النقر على "mint" لإنشاء المزيد. معرفات الرموز تزداد تلقائيًا في كل مرة (#1، #2، #3...).

<!-- ![placeholder: لقطة شاشة للنقر على mint في Remix وتأكيد المعاملة في MetaMask](/zh-cn/stage-3/cross-platform/nft-minting/images/image9.png) -->

## 4.2 التحقق من نتيجة السك

**الطريقة 1: التحقق في Remix**

في لوحة العقد، ابحث عن **"balanceOf"** (زر أزرق)، أدخل عنوان محفظتك، واستدعِها. إذا أعادت `1` (أو الرقم الذي سككته)، فقد نجح السك.

يمكنك أيضًا استدعاء **"ownerOf"**، أدخل `0` (معرف الرمز)، وسيعيد عنوان محفظتك، مثبتًا أن NFT رقم 0 ملك لك.

**الطريقة 2: التحقق على Etherscan (موصى به)**

1. افتح [Sepolia Etherscan](https://sepolia.etherscan.io/)
2. الصق **عنوان العقد** في البحث
3. سترى صفحة تفاصيل العقد مع جميع سجلات المعاملات
4. انقر على **"Token Tracker"** لعرض جميع NFTs المسكوكة بواسطة عقدك

على Etherscan، كل معاملة سك لها سجلات كاملة: من سك، متى سك، ومعرف الرمز. هذا هو سحر البلوكتشين في كونه "علني وشفاف وغير قابل للتلاعب."

<!-- ![placeholder: لقطة شاشة لعرض العقد وسجلات سك NFT على Sepolia Etherscan، بما في ذلك قائمة المعاملات و Token Tracker](/zh-cn/stage-3/cross-platform/nft-minting/images/image10.png) -->

# الفصل 5: متقدم - إضافة صورة إلى NFT (اختياري)

NFTs المسكوكة حتى الآن لديها فقط معرفات، بدون صورة أو وصف. لجعل NFTs كاملة، نحتاج إلى **IPFS (InterPlanetary File System)** لتخزين الصور والبيانات الوصفية.

## 5.1 ما هو IPFS؟

IPFS هي شبكة تخزين ملفات لامركزية. على عكس التخزين السحابي العادي، الملفات على IPFS لا تعتمد على خادم واحد، بل موزعة عبر عقد عالمية. هذا يعني:

* الملفات لا تُفقد إذا تعطل خادم واحد
* محتوى الملفات محدد بشكل فريد بواسطة التجزئة ولا يمكن التلاعب به
* مثالي لتخزين صور NFT والبيانات الوصفية

## 5.2 رفع صورة إلى Pinata

[Pinata](https://pinata.cloud/) هي خدمة تخزين IPFS الأكثر شعبية. الطبقة المجانية توفر 1 جيجابايت من التخزين، وهو كافٍ لنا.

1. زر https://pinata.cloud/ وسجل حسابًا مجانيًا
2. بعد تسجيل الدخول، انقر على **"Upload"** -> **"File"**
3. اختر الصورة التي تريدها كعمل فني NFT (صورة مولدة بالذكاء الاصطناعي جيدة، أو أي صورة)
4. بعد نجاح الرفع، انسخ **CID** (سلسلة مثل `QmXyz...`)

عنوان URI لصورتك هو: `ipfs://yourCID`

<!-- ![placeholder: لقطة شاشة لرفع الصورة في Pinata، بما في ذلك زر الرفع و CID الناتج](/zh-cn/stage-3/cross-platform/nft-minting/images/image11.png) -->

## 5.3 إنشاء ملف JSON للبيانات الوصفية

بيانات NFT الوصفية هي ملف JSON يصف اسم NFT ووصفه وعنوان URI للصورة. أنشئ ملف `metadata.json`:

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

ارفع `metadata.json` إلى Pinata أيضًا، واحصل على CID للبيانات الوصفية.

## 5.4 ترقية العقد لدعم الصور

لتضمين الصور في NFTs، نحتاج لترقية العقد قليلًا بإضافة `tokenURI`. عد إلى Remix وأنشئ ملفًا جديدًا `MyNFTWithImage.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFTWithImage is ERC721, ERC721URIStorage {
    uint256 private _tokenId;

    constructor() ERC721("VibeCoder", "VIBE") {}

    // Pass metadata URI when minting
    function mint(string memory uri) public {
        _safeMint(msg.sender, _tokenId);
        _setTokenURI(_tokenId, uri);
        _tokenId++;
    }

    // Overrides required by Solidity
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

بعد النشر، استدعِ `mint` ومرر عنوان URI للبيانات الوصفية (مثلًا `ipfs://QmAbc.../metadata.json`). عندها سيحتوي NFT المسكوك على صورة ووصف.

<!-- ![placeholder: لقطة شاشة لتفاصيل NFT مع صورة معروضة على Etherscan](/zh-cn/stage-3/cross-platform/nft-minting/images/image12.png) -->

# الفصل 6: ملاحظات ختامية

تهانينا! لقد أكملت حلقة تطوير NFT كاملة من الصفر. لنراجع:

1. فهم المفاهيم الأساسية لـ NFTs والعقود الذكية
2. تثبيت MetaMask والتبديل إلى شبكة اختبار Sepolia
3. كتابة عقد ذكي لـ NFT بأقل من 15 سطرًا في Remix IDE
4. نشر العقد على شبكة اختبار Ethereum
5. سك NFT الخاص بك والتحقق منه على Etherscan
6. (اختياري) تعلم كيفية إضافة صورة وبيانات وصفية باستخدام IPFS

العملية بالكامل لم تتطلب تثبيت بيئة محلية، ولم تكلف شيئًا، وأُنجزت بالكامل في المتصفح. هذا هو جاذبية تطوير البلوكتشين: الحاجز أقل بكثير مما يتوقعه معظم الناس.

**اتجاهات متقدمة:**

* **استخدام Hardhat / Foundry للتطوير المحلي**: عندما يصبح منطق العقد معقدًا، Remix لا يكفي. Hardhat و Foundry هما أطر عمل محلية احترافية مع اختبار آلي ونشر بالسكريبت وتحسين الغاز والمزيد
* **إضافة قائمة بيضاء وحدود سك**: التحكم في من يمكنه السك، الحد الأقصى للسك لكل محفظة، سعر السك، وقواعد مشابهة
* **بناء واجهة أمامية للسك**: استخدام React + ethers.js / viem لبناء صفحة سك مصقولة للسك بنقرة واحدة من الويب
* **استكشاف NFTs متعددة الطبعات ERC1155**: ERC1155 يسمح بنسخ متعددة تحت معرف رمز واحد، مفيد لعناصر الألعاب والتذاكر
* **النشر على الشبكة الرئيسية**: عندما تكون مستعدًا، انشر على شبكة Ethereum الرئيسية (أو سلاسل L2 مثل Polygon أو Base برسوم غاز أقل)

***أول NFT لك بالفعل على السلسلة. باب عالم البلوكتشين مفتوح الآن.***

# المراجع

* [توثيق OpenZeppelin ERC721](https://docs.openzeppelin.com/contracts/5.x/erc721)
* [توثيق Remix IDE الرسمي](https://remix-ide.readthedocs.io/)
* [توثيق MetaMask الرسمي](https://docs.metamask.io/)
* [توثيق Solidity الرسمي](https://docs.soliditylang.org/)
* [Sepolia Etherscan](https://sepolia.etherscan.io/)
* [خدمة تخزين Pinata IPFS](https://pinata.cloud/)
* [مواصفة معيار ERC721 (EIP-721)](https://eips.ethereum.org/EIPS/eip-721)
