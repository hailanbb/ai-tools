# NFT를 빠르게 만들고 발행하는 방법: 10분 입문편

# 제1장: NFT와 스마트 컨트랙트란 무엇인가

이 튜토리얼에서는 하나의 완전한 과정을 완성할 것입니다: NFT 스마트 컨트랙트를 처음부터 작성하고, 이더리움 테스트넷에 배포하고, 자신만의 NFT를 발행(mint)하고, OpenSea에서 확인합니다. 전체 과정은 브라우저 기반 도구를 사용하며 로컬 환경 설정이 필요 없고, 10분 안에 완료할 수 있습니다.

이 튜토리얼을 진행하려면 최소한 다음이 필요합니다:

- Chrome 브라우저(MetaMask 지갑 확장 프로그램 설치)
- MetaMask 지갑 계정
- 소량의 Sepolia 테스트넷 ETH(무료로 받을 수 있으며, 아래에서 안내)

> **비용 제로, 설정 제로**: 전체 과정은 브라우저 기반 도구(Remix IDE)를 사용하며, Node.js / Hardhat 설치가 필요 없습니다. 코드는 OpenZeppelin 공식 보안 템플릿을 사용합니다. 발행 후 OpenSea 테스트넷에서 NFT를 확인할 수 있습니다.

## 1.1 NFT란 무엇인가?

NFT(Non-Fungible Token, 대체 불가능 토큰)는 블록체인 상의 디지털 자산입니다. 비트코인이나 이더리움과 같은 대체 가능한 토큰과 달리, 모든 NFT는 고유하며, 세상에 완전히 같은 두 개의 그림이 없는 것과 같습니다.

NFT를 **"디지털 세계의 수집 증명서"**라고 이해할 수 있습니다. 다음을 나타낼 수 있습니다:

* 디지털 예술 작품의 소유권
* 이벤트 티켓
* 게임 아이템
* 학습 인증서
* 심지어 트윗까지

NFT의 핵심 가치는: **블록체인 기술을 사용하여 "이 디지털 아이템은 당신의 것"임을 증명하며, 그 증명은 공개적이고 투명하며 변조가 불가능합니다.**

<!-- ![placeholder: A concept diagram of NFTs: a digital artwork on the left, ownership record on blockchain on the right, connected by arrows](/zh-cn/stage-3/cross-platform/nft-minting/images/image1.png) -->

## 1.2 스마트 컨트랙트란 무엇인가?

스마트 컨트랙트는 블록체인에서 실행되는 코드입니다. **"자동으로 실행되는 계약"**이라고 생각할 수 있습니다. 체인에 배포되면 코드 로직에 따라 자동으로 실행되며, 누구도 변조할 수 없습니다.

NFT는 스마트 컨트랙트를 통해 생성되고 관리됩니다. NFT를 "발행(mint)"할 때, 실제로는 스마트 컨트랙트의 함수를 호출하여 체인에 "NFT #0은 당신의 지갑 주소에 속합니다"라고 기록하는 것입니다.

**Solidity**를 사용하여 컨트랙트를 작성할 것입니다. 걱정하지 마세요. OpenZeppelin의 기성 템플릿을 사용하면 15줄 미만의 코드만 작성하면 됩니다.

## 1.3 어떤 NFT를 발행할 것인가?

**"Vibe Coder 학습 인증서"** NFT를 발행하여 이 튜토리얼을 완료하고 블록체인 개발 기초를 배웠음을 증명할 것입니다. 이 NFT는 다음과 같습니다:

* 고유한 토큰 ID를 가짐
* 이더리움 Sepolia 테스트넷에 기록됨
* OpenSea 테스트넷에서 확인 및 표시 가능
* (선택 사항) 사용자 지정 이미지 포함

물론 좋아하는 어떤 주제로든 변경할 수 있습니다: AI 생성 예술 작품, 이벤트 기념 카드, 픽셀 아바타 등. NFT 내용은 전적으로 사용자에게 달려 있습니다.

## 1.4 왜 테스트넷을 사용하는가?

이더리움에는 "메인넷"과 "테스트넷"이 있습니다:

| 비교 항목 | 메인넷 | 테스트넷(Sepolia) |
|------|----------------|------------------|
| ETH 가치 | 실제 돈 | 무료로 받음, 실제 가치 없음 |
| 배포 비용 | 실제 가스 수수료 필요 | 완전히 무료 |
| 용도 | 프로덕션 배포 | 학습, 테스트, 개발 |
| 기능적 차이 | 없음 | 메인넷과 동일 |

테스트넷과 메인넷은 기능적으로 동일합니다. 유일한 차이는 테스트넷 ETH에 실제 가치가 없다는 것입니다. 따라서 돈을 쓸 걱정 없이 안전하게 학습하고 실험할 수 있습니다.

## 1.5 튜토리얼 로드맵

다음 단계로 과정을 완료할 것입니다:

1. **지갑 및 테스트 ETH 준비** (2분): MetaMask 설치 및 무료 테스트 ETH 받기
2. **컨트랙트 작성 및 배포** (4분): Remix IDE에서 NFT 컨트랙트 작성 및 Sepolia에 배포
3. **NFT 발행 및 결과 확인** (4분): 컨트랙트를 호출하여 NFT 발행 및 OpenSea와 Etherscan에서 확인
4. **심화: NFT에 이미지 추가** (선택 사항): IPFS에 이미지를 저장하여 NFT를 완성

# 제2장: 지갑 및 테스트 ETH 준비 (2분)

## 2.1 MetaMask 지갑 설치

MetaMask는 가장 인기 있는 이더리움 지갑입니다. 브라우저 확장 프로그램으로 블록체인 앱과 상호작용할 수 있게 해줍니다.

1. Chrome을 열고 [MetaMask 공식 사이트](https://metamask.io/) 방문
2. **"Download"** 클릭 후 Chrome 확장 프로그램 설치
3. 설치 후 오른쪽 상단의 MetaMask 여우 아이콘 클릭
4. **"Create a new wallet"** 선택 후 비밀번호 설정
5. **중요**: 복구 구문(12단어)을 안전하게 보관하세요. 테스트 지갑을 잃어도 괜찮지만, 좋은 습관은 중요합니다

<!-- ![placeholder: MetaMask installation and wallet creation flow screenshots: install extension -> create wallet -> set password -> backup recovery phrase](/zh-cn/stage-3/cross-platform/nft-minting/images/image2.png) -->

## 2.2 Sepolia 테스트넷으로 전환

MetaMask는 기본적으로 이더리움 메인넷에 연결됩니다. Sepolia 테스트넷으로 전환해야 합니다:

1. MetaMask 상단의 네트워크 드롭다운 클릭(기본값: "Ethereum Mainnet")
2. **"Show test networks"** 클릭
3. **"Sepolia test network"** 선택

Sepolia가 보이지 않으면 **"Add network"**를 클릭하여 수동으로 추가:

| 설정 항목 | 값 |
|-------|-----|
| Network Name | Sepolia test network |
| RPC URL | `https://rpc.sepolia.org` |
| Chain ID | 11155111 |
| Currency Symbol | SepoliaETH |
| Block Explorer | `https://sepolia.etherscan.io` |

<!-- ![placeholder: Screenshot of switching MetaMask to Sepolia testnet via network dropdown](/zh-cn/stage-3/cross-platform/nft-minting/images/image3.png) -->

## 2.3 무료 테스트 ETH 받기

컨트랙트 배포와 NFT 발행에는 가스 수수료가 필요합니다. 테스트넷에서는 테스트 ETH로 가스를 지불하며, 무료입니다.

아래의 어떤 faucets에 방문하여 지갑 주소를 입력하면 무료 Sepolia ETH를 받을 수 있습니다:

| Faucet | URL | 1회 수령량 | 로그인 필요 |
|--------|------|-----------|------------|
| QuickNode | `https://faucet.quicknode.com/ethereum/sepolia` | 0.1 ETH | 예 |
| Alchemy | `https://www.alchemy.com/faucets/ethereum-sepolia` | 0.1 ETH | 예 |
| Google Cloud | `https://cloud.google.com/application/web3/faucet/ethereum/sepolia` | 0.05 ETH | 예 (Google 계정) |

> **팁**: 0.1 테스트 ETH면 컨트랙트 배포와 수십 개의 NFT 발행에 충분합니다. 하나의 faucets가 작동하지 않으면 다른 것을 시도해 보세요.

수령에 성공한 후 MetaMask로 돌아가면 잔액이 0에서 0.1 ETH로 변경된 것을 볼 수 있습니다(몇 초가 걸릴 수 있습니다).

<!-- ![placeholder: Faucet website screenshot showing wallet address input and claiming test ETH](/zh-cn/stage-3/cross-platform/nft-minting/images/image4.png) -->

# 제3장: NFT 스마트 컨트랙트 작성 및 배포 (4분)

## 3.1 Remix IDE 열기

Remix는 이더리움 공식 추천 온라인 스마트 컨트랙트 개발 환경입니다. 브라우저에서 완전히 실행되며 설치가 필요 없습니다.

열기: **https://remix.ethereum.org/**

VS Code와 유사한 인터페이스가 보입니다: 왼쪽에 파일 탐색기, 가운데에 코드 편집기, 오른쪽에 컴파일/배포 패널이 있습니다.

<!-- ![placeholder: Remix IDE home screenshot showing file explorer, code editor, and right-side panel](/zh-cn/stage-3/cross-platform/nft-minting/images/image5.png) -->

## 3.2 컨트랙트 파일 생성

1. 왼쪽 파일 탐색기에서 **"contracts"** 폴더 클릭
2. 상단의 **"+"** 버튼을 클릭하여 새 파일 생성
3. 이름을 **`MySimpleNFT.sol`**로 지정
4. 아래 코드를 붙여넣기:

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

**코드 설명 (15줄 미만이며, 각 줄이 이해 가능합니다):**

| 코드 | 의미 |
|------|------|
| `pragma solidity ^0.8.20` | Solidity 컴파일러 버전 지정 |
| `import "@openzeppelin/..."` | OpenZeppelin ERC721 표준 구현 가져오기 (보안 감사를 받은 템플릿) |
| `contract MySimpleNFT is ERC721` | ERC721 표준을 상속하는 컨트랙트 생성 |
| `ERC721("VibeCoder", "VIBE")` | 컬렉션 이름 "VibeCoder" 및 기호 "VIBE" 설정 |
| `_safeMint(msg.sender, _tokenId)` | 호출자에게 새 NFT 발행 |
| `_tokenId++` | 발행 후 토큰 ID 증가 |

> **ERC721이란 무엇인가?** 이더리움의 NFT 표준으로, 기본 NFT 기능(전송, 소유자 조회 등)을 정의합니다. OpenZeppelin은 보안 감사를 받은 구현을 제공하므로 처음부터 만들지 않고 직접 상속할 수 있습니다.

<!-- ![placeholder: Screenshot of contract code pasted in Remix IDE](/zh-cn/stage-3/cross-platform/nft-minting/images/image6.png) -->

## 3.3 컨트랙트 컴파일

1. 왼쪽 패널에서 **"Solidity Compiler"** 클릭(망치 아이콘)
2. 컴파일러 버전 **0.8.20**(또는 0.8.x 이상) 선택
3. **"Compile MySimpleNFT.sol"** 클릭
4. 녹색 체크 표시 ✅는 컴파일 성공을 의미

> 오류가 있으면 Solidity 버전이 일치하는지, OpenZeppelin 가져오기 경로가 올바른지 확인하세요. Remix는 npm에서 OpenZeppelin 종속성을 자동으로 다운로드합니다.

<!-- ![placeholder: Remix compile success screenshot with green check and selected compiler version](/zh-cn/stage-3/cross-platform/nft-minting/images/image7.png) -->

## 3.4 컨트랙트를 Sepolia 테스트넷에 배포

1. 왼쪽 패널에서 **"Deploy & Run Transactions"** 클릭(이더리움 아이콘)
2. **Environment**를 **"Injected Provider - MetaMask"**로 설정
   - MetaMask 지갑에 자동 연결됨
   - MetaMask가 연결 요청 팝업을 표시하면 **"Connect"** 클릭
3. 네트워크가 **Sepolia (11155111)**인지 확인
4. Contract 드롭다운에서 **MySimpleNFT** 선택
5. **"Deploy"** 클릭
6. MetaMask가 거래 확인 팝업을 표시하면 **"Confirm"** 클릭(가스는 매우 낮음; 테스트넷은 무료)

몇 초 후 배포가 성공하면 하단의 **"Deployed Contracts"** 섹션에 컨트랙트 주소가 표시됩니다. **이 주소를 복사하여 저장**하세요; 나중에 필요합니다.

<!-- ![placeholder: Remix deployment screenshot showing environment selection, MetaMask confirmation, Deploy button, and deployed contract address](/zh-cn/stage-3/cross-platform/nft-minting/images/image8.png) -->

# 제4장: NFT 발행 및 결과 확인 (4분)

## 4.1 첫 번째 NFT 발행

배포가 성공하면 Remix의 **"Deployed Contracts"** 섹션에서 컨트랙트 상호작용 패널을 볼 수 있습니다.

1. 컨트랙트 패널을 펼치고 **"mint"** 버튼(주황색) 찾기
2. **"mint"**를 직접 클릭(입력 매개변수 불필요)
3. MetaMask가 거래 확인 팝업을 표시하면 **"Confirm"** 클릭
4. 완료될 때까지 몇 초 대기

축하합니다! NFT #0을 발행했으며, 이제 지갑 주소에 속합니다.

"mint"를 계속 클릭하여 더 만들 수 있습니다. 토큰 ID는 매번 자동 증가합니다(#1, #2, #3...).

<!-- ![placeholder: Screenshot of clicking mint in Remix and confirming transaction in MetaMask](/zh-cn/stage-3/cross-platform/nft-minting/images/image9.png) -->

## 4.2 발행 결과 확인

**방법 1: Remix에서 확인**

컨트랙트 패널에서 **"balanceOf"**(파란색 버튼)를 찾아 지갑 주소를 입력한 후 호출합니다. `1`(또는 발행한 수)이 반환되면 발행이 성공한 것입니다.

**"ownerOf"**를 호출하여 `0`(토큰 ID)을 입력하면 지갑 주소가 반환되어 NFT #0이 사용자의 것임을 증명합니다.

**방법 2: Etherscan에서 확인 (권장)**

1. [Sepolia Etherscan](https://sepolia.etherscan.io/) 열기
2. 검색창에 **컨트랙트 주소** 붙여넣기
3. 컨트랙트 세부 정보 페이지와 모든 거래 기록을 볼 수 있음
4. **"Token Tracker"**를 클릭하여 컨트랙트에서 발행된 모든 NFT 확인

Etherscan에서 모든 발행 거래에는 완전한 기록이 있습니다: 누가 발행했는지, 언제 발행되었는지, 토큰 ID는 무엇인지. 이것이 블록체인이 "공개적이고 투명하며 변조 불가능"하다는 매력입니다.

<!-- ![placeholder: Screenshot of viewing contract and NFT mint records on Sepolia Etherscan, including transaction list and Token Tracker](/zh-cn/stage-3/cross-platform/nft-minting/images/image10.png) -->

# 제5장: 심화 - NFT에 이미지 추가 (선택 사항)

지금까지 발행한 NFT는 ID만 있고 이미지나 설명이 없습니다. NFT를 완성하려면 **IPFS(InterPlanetary File System)**를 사용하여 이미지와 메타데이터를 저장해야 합니다.

## 5.1 IPFS란 무엇인가?

IPFS는 탈중앙화 파일 저장 네트워크입니다. 일반 클라우드 스토리지와 달리 IPFS의 파일은 하나의 서버에 의존하지 않고 전 세계 노드에 분산됩니다. 이는 다음을 의미합니다:

* 하나의 서버가 다운되어도 파일이 손실되지 않음
* 파일 내용은 해시로 고유하게 식별되며 변조가 불가능
* NFT 이미지 및 메타데이터 저장에 이상적

## 5.2 Pinata에 이미지 업로드

[Pinata](https://pinata.cloud/)는 가장 인기 있는 IPFS 저장 서비스입니다. 무료 플랜은 1GB의 저장 공간을 제공하며 충분합니다.

1. https://pinata.cloud/ 에 방문하여 무료 계정 가입
2. 로그인 후 **"Upload"** -> **"File"** 클릭
3. NFT 아트워크로 사용할 이미지 선택(AI 생성 이미지 또는 어떤 이미지든 가능)
4. 업로드가 성공하면 **CID** 복사(`QmXyz...`와 같은 문자열)

이미지 URI는 다음과 같습니다: `ipfs://yourCID`

<!-- ![placeholder: Screenshot of image upload in Pinata, including upload button and resulting CID](/zh-cn/stage-3/cross-platform/nft-minting/images/image11.png) -->

## 5.3 메타데이터 JSON 생성

NFT 메타데이터는 NFT 이름, 설명, 이미지 URI를 설명하는 JSON 파일입니다. `metadata.json`을 생성합니다:

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

`metadata.json`도 Pinata에 업로드하고 메타데이터 CID를 받습니다.

## 5.4 이미지를 지원하도록 컨트랙트 업그레이드

NFT에 이미지를 포함하려면 `tokenURI`를 추가하여 컨트랙트를 약간 업그레이드해야 합니다. Remix로 돌아가서 새 파일 `MyNFTWithImage.sol`을 생성합니다:

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

배포 후 `mint`를 호출하고 메타데이터 URI(예: `ipfs://QmAbc.../metadata.json`)를 전달합니다. 그러면 발행한 NFT에 이미지와 설명이 포함됩니다.

<!-- ![placeholder: Screenshot of NFT details with image shown on Etherscan](/zh-cn/stage-3/cross-platform/nft-minting/images/image12.png) -->

# 제6장: 마무리

축하합니다! 처음부터 완전한 NFT 개발 과정을 완료했습니다. 다시 돌아보면:

1. NFT와 스마트 컨트랙트의 핵심 개념 이해
2. MetaMask 설치 및 Sepolia 테스트넷으로 전환
3. Remix IDE에서 15줄 미만의 NFT 스마트 컨트랙트 작성
4. 컨트랙트를 이더리움 테스트넷에 배포
5. 자신만의 NFT를 발행하고 Etherscan에서 확인
6. (선택 사항) IPFS로 이미지 및 메타데이터를 추가하는 방법 학습

전체 과정은 로컬 환경 설치가 필요 없었고, 비용이 들지 않았으며, 브라우저에서 완전히 완료되었습니다. 이것이 블록체인 개발의 매력입니다: 진입 장벽이 대부분의 사람들이 예상하는 것보다 훨씬 낮습니다.

**고급 방향:**

* **Hardhat / Foundry를 사용한 로컬 개발**: 컨트랙트 로직이 복잡해지면 Remix로는 부족합니다. Hardhat과 Foundry는 자동화된 테스트, 스크립트 기반 배포, 가스 최적화 등을 제공하는 전문 로컬 프레임워크입니다
* **화이트리스트 및 발행 제한 추가**: 누가 발행할 수 있는지, 지갑당 최대 발행 수, 발행 가격 등의 규칙을 제어
* **발행 프론트엔드 구축**: React + ethers.js / viem을 사용하여 원클릭 웹 발행이 가능한 세련된 발행 페이지 구축
* **ERC1155 다중 에디션 NFT 탐색**: ERC1155는 하나의 토큰 ID로 여러 복사본을 허용하여 게임 아이템 및 티켓에 유용
* **메인넷에 배포**: 준비가 되면 이더리움 메인넷에 배포(또는 가스 수수료가 더 낮은 Polygon이나 Base와 같은 L2 체인에 배포)

***첫 번째 NFT가 이미 체인에 있습니다. 블록체인 세계로 가는 문이 열렸습니다.***

# 참고 자료

* [OpenZeppelin ERC721 문서](https://docs.openzeppelin.com/contracts/5.x/erc721)
* [Remix IDE 공식 문서](https://remix-ide.readthedocs.io/)
* [MetaMask 공식 문서](https://docs.metamask.io/)
* [Solidity 공식 문서](https://docs.soliditylang.org/)
* [Sepolia Etherscan](https://sepolia.etherscan.io/)
* [Pinata IPFS 저장 서비스](https://pinata.cloud/)
* [ERC721 표준 사양 (EIP-721)](https://eips.ethereum.org/EIPS/eip-721)
