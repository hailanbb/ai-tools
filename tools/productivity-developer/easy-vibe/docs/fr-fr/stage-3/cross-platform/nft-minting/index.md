# Comment créer et frapper un NFT rapidement : Edition de démarrage en 10 minutes

# Chapitre 1 : Ce que sont les NFT et les contrats intelligents

Dans ce tutoriel, nous allons réaliser une boucle complète : écrire un contrat intelligent NFT depuis zéro, le déployer sur le testnet Ethereum, frapper votre propre NFT et le visualiser sur OpenSea. L'ensemble du processus utilise des outils basés sur le navigateur sans aucune configuration d'environnement local et peut être terminé en 10 minutes.

Pour ce tutoriel, vous devez au minimum disposer de :

- Un navigateur Chrome (avec l'extension de portefeuille MetaMask installée)
- Un compte de portefeuille MetaMask
- Une petite quantité d'ETH du testnet Sepolia (gratuit à obtenir, voir ci-dessous)

> **Zéro coût, zéro configuration** : l'ensemble du processus utilise des outils basés sur le navigateur (Remix IDE), aucune installation de Node.js / Hardhat n'est nécessaire ; le code utilise les modèles sécurisés officiels d'OpenZeppelin ; après la frappe, vous pouvez visualiser votre NFT sur le testnet OpenSea.

## 1.1 Qu'est-ce qu'un NFT ?

Un NFT (Jeton Non Fongible) est un type d'actif numérique sur la blockchain. Contrairement aux jetons fongibles comme le Bitcoin ou l'Ether, chaque NFT est unique, comme deux tableaux au monde ne sont jamais exactement identiques.

Vous pouvez comprendre un NFT comme un **« certificat de collection dans le monde numérique.** Il peut représenter :

* la propriété d'une œuvre d'art numérique
* un billet d'événement
* un objet de jeu
* un certificat d'apprentissage
* même un tweet

La valeur fondamentale des NFT est : **ils utilisent la technologie blockchain pour prouver « cet objet numérique vous appartient », et cette preuve est publique, transparente et inviolable.**

<!-- ![placeholder: A concept diagram of NFTs: a digital artwork on the left, ownership record on blockchain on the right, connected by arrows](/zh-cn/stage-3/cross-platform/nft-minting/images/image1.png) -->

## 1.2 Qu'est-ce qu'un contrat intelligent ?

Un contrat intelligent est un bout de code qui s'exécute sur la blockchain. Vous pouvez le considérer comme un **« contrat à exécution automatique »**. Une fois déployé on-chain, il s'exécute automatiquement selon la logique du code, et personne ne peut le falsifier.

Les NFT sont créés et gérés par des contrats intelligents. Lorsque vous « frappez » un NFT, vous appelez en réalité une fonction dans le contrat intelligent pour écrire on-chain : « Le NFT #0 appartient à votre adresse de portefeuille. »

Nous utiliserons **Solidity** pour écrire le contrat. Ne vous inquiétez pas. Avec les modèles prêts à l'emploi d'OpenZeppelin, vous n'avez besoin d'écrire que moins de 15 lignes de code.

## 1.3 Quel NFT allons-nous frapper ?

Nous allons frapper un NFT **« Certificat d'apprentissage Vibe Coder »** pour prouver que vous avez terminé ce tutoriel et appris les bases du développement blockchain. Ce NFT :

* aura un identifiant de jeton unique
* sera enregistré sur le testnet Sepolia d'Ethereum
* pourra être visualisé et affiché sur le testnet OpenSea
* (optionnel) inclura votre image personnalisée

Bien sûr, vous pouvez le changer pour n'importe quel thème que vous aimez : œuvre d'art générée par IA, carte souvenir d'événement, avatar pixel, et bien plus. Le contenu du NFT dépend entièrement de vous.

## 1.4 Pourquoi utiliser un testnet ?

Ethereum possède un « mainnet » et un « testnet » :

| Comparaison | Mainnet | Testnet (Sepolia) |
|------|----------------|------------------|
| Valeur de l'ETH | Argent réel | Gratuit à obtenir, aucune valeur réelle |
| Coût de déploiement | Nécessite de vrais frais de gas | Totalement gratuit |
| Cas d'utilisation | Mise en production | Apprentissage, tests, développement |
| Différence fonctionnelle | Aucune | Identique au mainnet |

Le testnet et le mainnet sont fonctionnellement identiques. La seule différence est que l'ETH du testnet n'a aucune valeur réelle. Vous pouvez donc apprendre et expérimenter en toute sécurité sur le testnet sans craindre de dépenser de l'argent.

## 1.5 Feuille de route du tutoriel

Nous effectuerons le flux en ces étapes :

1. **Préparer le portefeuille et l'ETH de test** (2 minutes) : installer MetaMask et obtenir de l'ETH de test gratuit
2. **Écrire et déployer le contrat** (4 minutes) : écrire le contrat NFT dans Remix IDE et le déployer sur Sepolia
3. **Frapper le NFT et vérifier le résultat** (4 minutes) : appeler le contrat pour frapper le NFT et vérifier sur OpenSea et Etherscan
4. **Avancé : ajouter une image au NFT** (optionnel) : stocker l'image sur IPFS pour compléter le NFT

# Chapitre 2 : Préparer le portefeuille et l'ETH de test (2 minutes)

## 2.1 Installer le portefeuille MetaMask

MetaMask est le portefeuille Ethereum le plus populaire. C'est une extension de navigateur qui vous permet d'interagir avec les applications blockchain.

1. Ouvrez Chrome et visitez le [site officiel de MetaMask](https://metamask.io/)
2. Cliquez sur **« Download »** et installez l'extension Chrome
3. Après l'installation, cliquez sur l'icône du renard MetaMask dans le coin supérieur droit
4. Choisissez **« Create a new wallet »** et définissez un mot de passe
5. **Important** : gardez votre phrase de récupération (12 mots) en sécurité. Perdre un portefeuille de test n'est pas grave, mais les bonnes habitudes comptent

<!-- ![placeholder: MetaMask installation and wallet creation flow screenshots: install extension -> create wallet -> set password -> backup recovery phrase](/zh-cn/stage-3/cross-platform/nft-minting/images/image2.png) -->

## 2.2 Basculer vers le testnet Sepolia

MetaMask se connecte par défaut au mainnet Ethereum. Nous devons basculer vers le testnet Sepolia :

1. Cliquez sur le menu déroulant du réseau en haut de MetaMask (par défaut : « Ethereum Mainnet »)
2. Cliquez sur **« Show test networks »**
3. Sélectionnez **« Sepolia test network »**

Si vous ne voyez pas Sepolia, cliquez sur **« Add network »** et ajoutez manuellement :

| Élément de configuration | Valeur |
|-------|-----|
| Nom du réseau | Sepolia test network |
| URL RPC | `https://rpc.sepolia.org` |
| ID de chaîne | 11155111 |
| Symbole de la devise | SepoliaETH |
| Explorateur de blocs | `https://sepolia.etherscan.io` |

<!-- ![placeholder: Screenshot of switching MetaMask to Sepolia testnet via network dropdown](/zh-cn/stage-3/cross-platform/nft-minting/images/image3.png) -->

## 2.3 Obtenir de l'ETH de test gratuit

Le déploiement de contrats et la frappe de NFT nécessitent des frais de gas. Sur le testnet, le gas est payé avec de l'ETH de test, qui est gratuit.

Visitez n'importe quel faucet ci-dessous et entrez votre adresse de portefeuille pour obtenir du Sepolia ETH gratuit :

| Faucet | URL | Montant par réclamation | Connexion requise |
|--------|------|-----------|------------|
| QuickNode | `https://faucet.quicknode.com/ethereum/sepolia` | 0,1 ETH | Oui |
| Alchemy | `https://www.alchemy.com/faucets/ethereum-sepolia` | 0,1 ETH | Oui |
| Google Cloud | `https://cloud.google.com/application/web3/faucet/ethereum/sepolia` | 0,05 ETH | Oui (compte Google) |

> **Astuce** : 0,1 ETH de test suffit pour déployer un contrat et frapper des dizaines de NFT. Si un faucet ne fonctionne pas, essayez-en un autre.

Après une réclamation réussie, retournez dans MetaMask et votre solde devrait passer de 0 à 0,1 ETH (cela peut prendre quelques secondes).

<!-- ![placeholder: Faucet website screenshot showing wallet address input and claiming test ETH](/zh-cn/stage-3/cross-platform/nft-minting/images/image4.png) -->

# Chapitre 3 : Écrire et déployer le contrat intelligent NFT (4 minutes)

## 3.1 Ouvrir Remix IDE

Remix est l'environnement de développement de contrats intelligents en ligne officiellement recommandé par Ethereum. Il fonctionne entièrement dans le navigateur et ne nécessite aucune installation.

Ouvrez : **https://remix.ethereum.org/**

Vous verrez une interface semblable à VS Code : explorateur de fichiers à gauche, éditeur de code au centre, et panneau de compilation/déploiement à droite.

<!-- ![placeholder: Remix IDE home screenshot showing file explorer, code editor, and right-side panel](/zh-cn/stage-3/cross-platform/nft-minting/images/image5.png) -->

## 3.2 Créer le fichier de contrat

1. Dans l'explorateur de fichiers à gauche, cliquez sur le dossier **« contracts »**
2. Cliquez sur le bouton **« + »** au-dessus pour créer un nouveau fichier
3. Nommez-le **`MySimpleNFT.sol`**
4. Collez le code ci-dessous :

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

**Explication du code (moins de 15 lignes, et chaque ligne est compréhensible) :**

| Code | Signification |
|------|------|
| `pragma solidity ^0.8.20` | Spécifier la version du compilateur Solidity |
| `import "@openzeppelin/..."` | Importer l'implémentation standard ERC721 d'OpenZeppelin (modèle audité en sécurité) |
| `contract MySimpleNFT is ERC721` | Créer un contrat héritant du standard ERC721 |
| `ERC721("VibeCoder", "VIBE")` | Définir le nom de collection « VibeCoder » et le symbole « VIBE » |
| `_safeMint(msg.sender, _tokenId)` | Frapper un nouveau NFT pour l'appelant |
| `_tokenId++` | Incrémenter l'ID du jeton après chaque frappe |

> **Qu'est-ce que l'ERC721 ?** C'est la norme NFT sur Ethereum, définissant les capacités de base des NFT (transfert, requête de propriétaire, etc.). OpenZeppelin fournit une implémentation auditée en sécurité, nous pouvons donc hériter directement au lieu de construire depuis zéro.

<!-- ![placeholder: Screenshot of contract code pasted in Remix IDE](/zh-cn/stage-3/cross-platform/nft-minting/images/image6.png) -->

## 3.3 Compiler le contrat

1. Cliquez sur **« Solidity Compiler »** dans le panneau de gauche (icône marteau)
2. Sélectionnez la version du compilateur **0.8.20** (ou supérieure en 0.8.x)
3. Cliquez sur **« Compile MySimpleNFT.sol »**
4. Une coche verte ✅ signifie que la compilation a réussi

> S'il y a une erreur, vérifiez si la version de Solidity correspond et si le chemin d'importation OpenZeppelin est correct. Remix télécharge automatiquement les dépendances OpenZeppelin depuis npm.

<!-- ![placeholder: Remix compile success screenshot with green check and selected compiler version](/zh-cn/stage-3/cross-platform/nft-minting/images/image7.png) -->

## 3.4 Déployer le contrat sur le testnet Sepolia

1. Cliquez sur **« Deploy & Run Transactions »** dans le panneau de gauche (icône Ethereum)
2. Définissez **Environment** sur **« Injected Provider - MetaMask »**
   - Cela connecte automatiquement votre portefeuille MetaMask
   - MetaMask affichera une demande de connexion, cliquez sur **« Connect »**
3. Confirmez que le réseau est **Sepolia (11155111)**
4. Sélectionnez **MySimpleNFT** dans le menu déroulant Contract
5. Cliquez sur **« Deploy »**
6. MetaMask affiche la confirmation de transaction, cliquez sur **« Confirm »** (les frais de gas sont très faibles ; le testnet est gratuit)

Après quelques secondes, lorsque le déploiement réussit, la section **« Deployed Contracts »** ci-dessous affichera l'adresse de votre contrat. **Copiez et sauvegardez cette adresse** ; vous en aurez besoin plus tard.

<!-- ![placeholder: Remix deployment screenshot showing environment selection, MetaMask confirmation, Deploy button, and deployed contract address](/zh-cn/stage-3/cross-platform/nft-minting/images/image8.png) -->

# Chapitre 4 : Frapper le NFT et vérifier le résultat (4 minutes)

## 4.1 Frapper votre premier NFT

Après un déploiement réussi, dans la section **« Deployed Contracts »** de Remix, vous verrez le panneau d'interaction du contrat.

1. Développez le panneau du contrat et trouvez le bouton **« mint »** (orange)
2. Cliquez directement sur **« mint »** (aucun paramètre d'entrée requis)
3. MetaMask affiche la confirmation de transaction, cliquez sur **« Confirm »**
4. Attendez quelques secondes pour l'achèvement

Félicitations ! Vous venez de frapper le NFT #0, et il appartient désormais à votre adresse de portefeuille.

Vous pouvez continuer à cliquer sur « mint » pour en créer d'autres. Les ID de jetons s'incrémentent automatiquement à chaque fois (#1, #2, #3...).

<!-- ![placeholder: Screenshot of clicking mint in Remix and confirming transaction in MetaMask](/zh-cn/stage-3/cross-platform/nft-minting/images/image9.png) -->

## 4.2 Vérifier le résultat de la frappe

**Méthode 1 : Vérifier dans Remix**

Dans le panneau du contrat, trouvez **« balanceOf »** (bouton bleu), entrez votre adresse de portefeuille et appelez-le. S'il retourne `1` (ou le nombre que vous avez frappé), la frappe a réussi.

Vous pouvez également appeler **« ownerOf »**, entrer `0` (ID du jeton), et cela retourne votre adresse de portefeuille, prouvant que le NFT #0 vous appartient.

**Méthode 2 : Vérifier sur Etherscan (recommandé)**

1. Ouvrez [Sepolia Etherscan](https://sepolia.etherscan.io/)
2. Collez votre **adresse de contrat** dans la recherche
3. Vous verrez la page de détails du contrat avec tous les enregistrements de transactions
4. Cliquez sur **« Token Tracker »** pour voir tous les NFT frappés par votre contrat

Sur Etherscan, chaque transaction de frappe a des enregistrements complets : qui a frappé, quand la frappe a eu lieu, et l'ID du jeton. C'est le charme de la blockchain : « publique, transparente et inviolable. »

<!-- ![placeholder: Screenshot of viewing contract and NFT mint records on Sepolia Etherscan, including transaction list and Token Tracker](/zh-cn/stage-3/cross-platform/nft-minting/images/image10.png) -->

# Chapitre 5 : Avancé - Ajouter une image au NFT (optionnel)

Les NFT frappés jusqu'à présent n'ont que des ID, sans image ni description. Pour rendre les NFT complets, nous avons besoin d'**IPFS (InterPlanetary File System)** pour stocker les images et les métadonnées.

## 5.1 Qu'est-ce qu'IPFS ?

IPFS est un réseau de stockage de fichiers décentralisé. Contrairement au stockage cloud classique, les fichiers sur IPFS ne dépendent pas d'un seul serveur, mais sont distribués sur des nœuds mondiaux. Cela signifie :

* les fichiers ne sont pas perdus si un serveur tombe en panne
* le contenu des fichiers est identifié de manière unique par des hachages et ne peut pas être falsifié
* c'est idéal pour stocker les images et métadonnées des NFT

## 5.2 Télécharger une image sur Pinata

[Pinata](https://pinata.cloud/) est le service de stockage IPFS le plus populaire. L'offre gratuite fournit 1 Go de stockage, ce qui est suffisant pour nous.

1. Visitez https://pinata.cloud/ et inscrivez-vous pour un compte gratuit
2. Après connexion, cliquez sur **« Upload »** -> **« File »**
3. Sélectionnez l'image que vous souhaitez utiliser comme œuvre d'art NFT (une image générée par IA convient, ou n'importe quelle image)
4. Après un téléchargement réussi, copiez le **CID** (une chaîne comme `QmXyz...`)

L'URI de votre image est : `ipfs://yourCID`

<!-- ![placeholder: Screenshot of image upload in Pinata, including upload button and resulting CID](/zh-cn/stage-3/cross-platform/nft-minting/images/image11.png) -->

## 5.3 Créer le JSON de métadonnées

Les métadonnées NFT sont un fichier JSON décrivant le nom du NFT, sa description et l'URI de l'image. Créez un `metadata.json` :

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

Téléchargez également `metadata.json` sur Pinata et obtenez un CID de métadonnées.

## 5.4 Mettre à niveau le contrat pour supporter les images

Pour inclure des images dans les NFT, nous devons légèrement mettre à niveau le contrat en ajoutant `tokenURI`. Retournez dans Remix et créez un nouveau fichier `MyNFTWithImage.sol` :

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

Après le déploiement, appelez `mint` et passez votre URI de métadonnées (par exemple `ipfs://QmAbc.../metadata.json`). Votre NFT frappé inclura alors l'image et la description.

<!-- ![placeholder: Screenshot of NFT details with image shown on Etherscan](/zh-cn/stage-3/cross-platform/nft-minting/images/image12.png) -->

# Chapitre 6 : Remarques finales

Félicitations ! Vous avez terminé une boucle complète de développement NFT depuis zéro. Récapitulons :

1. Compris les concepts fondamentaux des NFT et des contrats intelligents
2. Installé MetaMask et basculé vers le testnet Sepolia
3. Écrit un contrat intelligent NFT avec moins de 15 lignes dans Remix IDE
4. Déployé le contrat sur le testnet Ethereum
5. Frappé votre propre NFT et l'avez vérifié sur Etherscan
6. (Optionnel) Appris comment ajouter une image et des métadonnées avec IPFS

L'ensemble du processus ne nécessitait aucune installation d'environnement local, ne coûtait aucun argent et était réalisé entièrement dans le navigateur. C'est l'attrait du développement blockchain : la barrière est bien plus basse que ce que la plupart des gens imaginent.

**Directions avancées :**

* **Utiliser Hardhat / Foundry pour le développement local** : lorsque la logique du contrat devient complexe, Remix ne suffit plus. Hardhat et Foundry sont des frameworks locaux professionnels avec des tests automatisés, un déploiement par script, une optimisation du gas, et plus encore
* **Ajouter une liste blanche et des limites de frappe** : contrôler qui peut frapper, le nombre maximum de frappes par portefeuille, le prix de frappe, et des règles similaires
* **Construire un frontend de frappe** : utiliser React + ethers.js / viem pour construire une page de frappe soignée pour un minting web en un clic
* **Explorer les NFT multi-éditions ERC1155** : ERC1155 permet plusieurs copies sous un seul ID de jeton, utile pour les objets de jeu et les billets
* **Déployer sur le mainnet** : lorsque vous êtes prêt, déployez sur le mainnet Ethereum (ou des chaînes L2 comme Polygon ou Base avec des frais de gas plus bas)

***Votre premier NFT est déjà on-chain. La porte vers le monde de la blockchain est maintenant ouverte.***

# Références

* [Documentation OpenZeppelin ERC721](https://docs.openzeppelin.com/contracts/5.x/erc721)
* [Documentation officielle Remix IDE](https://remix-ide.readthedocs.io/)
* [Documentation officielle MetaMask](https://docs.metamask.io/)
* [Documentation officielle Solidity](https://docs.soliditylang.org/)
* [Sepolia Etherscan](https://sepolia.etherscan.io/)
* [Service de stockage IPFS Pinata](https://pinata.cloud/)
* [Spécification standard ERC721 (EIP-721)](https://eips.ethereum.org/EIPS/eip-721)
