# So schnell ein NFT bauen und prägen: 10-Minuten-Einsteigeredition

# Kapitel 1: Was NFTs und Smart Contracts sind

In diesem Tutorial werden wir einen vollständigen geschlossenen Kreislauf durchlaufen: von Grund auf einen NFT-Smart-Contract schreiben, ihn im Ethereum-Testnet bereitstellen, Ihr eigenes NFT prägen und es auf OpenSea ansehen. Der gesamte Prozess nutzt browserbasierte Tools, ohne dass eine lokale Umgebung eingerichtet werden muss, und kann in 10 Minuten abgeschlossen sein.

Für dieses Tutorial sollten Sie mindestens Folgendes haben:

- Chrome-Browser (mit installierter MetaMask-Wallet-Erweiterung)
- Ein MetaMask-Wallet-Konto
- Eine kleine Menge Sepolia-Testnet-ETH (kostenlos zu beziehen, siehe unten)

> **Null Kosten, null Einrichtung**: Der gesamte Prozess nutzt browserbasierte Tools (Remix IDE), keine Node.js/Hardhat-Installation erforderlich; der Code verwendet offizielle sichere OpenZeppelin-Vorlagen; nach dem Prägen können Sie Ihr NFT im OpenSea-Testnet ansehen.

## 1.1 Was ist ein NFT?

NFT (Non-Fungible Token) ist eine Art digitaler Vermögenswert auf der Blockchain. Im Gegensatz zu fungiblen Token wie Bitcoin oder Ether ist jedes NFT einzigartig, so wie keine zwei Gemälde der Welt exakt gleich sind.

Sie können sich ein NFT als ein **"Sammlerzertifikat in der digitalen Welt"** vorstellen. Es kann Folgendes darstellen:

* das Eigentum an einem digitalen Kunstwerk
* ein Veranstaltungsticket
* ein Spielgegenstand
* ein Lernzertifikat
* sogar einen Tweet

Der Kernwert von NFTs ist: **Sie nutzen Blockchain-Technologie, um zu beweisen: "Dieser digitale Gegenstand gehört dir"**, und dieser Beweis ist öffentlich, transparent und manipulationssicher.

<!-- ![Platzhalter: Ein Konzeptdiagramm von NFTs: ein digitales Kunstwerk links, Eigentumsdatensatz auf der Blockchain rechts, durch Pfeile verbunden](/zh-cn/stage-3/cross-platform/nft-minting/images/image1.png) -->

## 1.2 Was ist ein Smart Contract?

Ein Smart Contract ist ein Stück Code, das auf der Blockchain ausgeführt wird. Sie können sich ihn als einen **"automatisch ausgeführten Vertrag"** vorstellen. Sobald er auf der Chain bereitgestellt ist, läuft er automatisch gemäß der Codelogik, und niemand kann ihn manipulieren.

NFTs werden durch Smart Contracts erstellt und verwaltet. Wenn Sie ein NFT "prägen", rufen Sie tatsächlich eine Funktion im Smart Contract auf, die auf der Chain vermerkt: "NFT #0 gehört Ihrer Wallet-Adresse."

Wir werden **Solidity** verwenden, um den Contract zu schreiben. Keine Sorge. Mit den fertigen Vorlagen von OpenZeppelin müssen Sie weniger als 15 Zeilen Code schreiben.

## 1.3 Welches NFT prägen wir?

Wir werden ein **"Vibe Coder Lernzertifikat"**-NFT prägen, um zu belegen, dass Sie dieses Tutorial abgeschlossen und die Grundlagen der Blockchain-Entwicklung gelernt haben. Dieses NFT wird:

* eine eindeutige Token-ID haben
* im Ethereum Sepolia-Testnet aufgezeichnet sein
* im OpenSea-Testnet anzeigbar und darstellbar sein
* (optional) Ihr eigenes Bild enthalten

Natürlich können Sie es zu jedem gewünschten Thema ändern: KI-generierte Kunstwerke, Veranstaltungssouvenirkarten, Pixel-Avatare und mehr. Der NFT-Inhalt liegt vollständig bei Ihnen.

## 1.4 Warum ein Testnet nutzen?

Ethereum hat ein "Mainnet" und ein "Testnet":

| Vergleich | Mainnet | Testnet (Sepolia) |
|------|----------------|------------------|
| ETH-Wert | Echtes Geld | Kostenlos zu beziehen, kein echter Wert |
| Bereitstellungskosten | Echte Gasgebühren erforderlich | Komplett kostenlos |
| Anwendungszweck | Produktionsveröffentlichung | Lernen, Testen, Entwicklung |
| Funktionaler Unterschied | Keiner | Gleich wie Mainnet |

Testnet und Mainnet sind funktionell identisch. Der einzige Unterschied ist, dass Testnet-ETH keinen echten Wert hat. Sie können also sicher auf dem Testnet lernen und experimentieren, ohne sich Gedanken über Geldausgaben zu machen.

## 1.5 Tutorial-Übersicht

Wir werden den Ablauf in folgenden Schritten abschließen:

1. **Wallet und Test-ETH vorbereiten** (2 Minuten): MetaMask installieren und kostenloses Test-ETH beziehen
2. **Contract schreiben und bereitstellen** (4 Minuten): NFT-Contract in Remix IDE schreiben und auf Sepolia bereitstellen
3. **NFT prägen und Ergebnis prüfen** (4 Minuten): Contract aufrufen, um NFT zu prägen, und auf OpenSea und Etherscan verifizieren
4. **Fortgeschritten: Bild zum NFT hinzufügen** (optional): Bild auf IPFS speichern, um das NFT zu vervollständigen

# Kapitel 2: Wallet und Test-ETH vorbereiten (2 Minuten)

## 2.1 MetaMask-Wallet installieren

MetaMask ist die beliebteste Ethereum-Wallet. Sie ist eine Browsererweiterung, die es Ihnen ermöglicht, mit Blockchain-Apps zu interagieren.

1. Öffnen Sie Chrome und besuchen Sie die [MetaMask-Website](https://metamask.io/)
2. Klicken Sie auf **"Download"** und installieren Sie die Chrome-Erweiterung
3. Nach der Installation klicken Sie auf das MetaMask-Fuchssymbol in der oberen rechten Ecke
4. Wählen Sie **"Create a new wallet"** und setzen Sie ein Passwort
5. **Wichtig**: Bewahren Sie Ihre Wiederherstellungsphrase (12 Wörter) sicher auf. Der Verlust einer Test-Wallet ist nicht schlimm, aber gute Gewohnheiten zählen

<!-- ![Platzhalter: Screenshots des MetaMask-Installations- und Wallet-Erstellungsablaufs: Erweiterung installieren -> Wallet erstellen -> Passwort setzen -> Wiederherstellungsphrase sichern](/zh-cn/stage-3/cross-platform/nft-minting/images/image2.png) -->

## 2.2 Zum Sepolia-Testnet wechseln

MetaMask verbindet sich standardmäßig mit dem Ethereum-Mainnet. Wir müssen zum Sepolia-Testnet wechseln:

1. Klicken Sie auf das Netzwerk-Dropdown oben in MetaMask (Standard: "Ethereum Mainnet")
2. Klicken Sie auf **"Show test networks"**
3. Wählen Sie **"Sepolia test network"**

Wenn Sie Sepolia nicht sehen, klicken Sie auf **"Add network"** und fügen Sie es manuell hinzu:

| Konfigurationselement | Wert |
|-------|-----|
| Netzwerkname | Sepolia test network |
| RPC-URL | `https://rpc.sepolia.org` |
| Chain-ID | 11155111 |
| Währungssymbol | SepoliaETH |
| Block-Explorer | `https://sepolia.etherscan.io` |

<!-- ![Platzhalter: Screenshot des Wechsels zu Sepolia-Testnet über das Netzwerk-Dropdown in MetaMask](/zh-cn/stage-3/cross-platform/nft-minting/images/image3.png) -->

## 2.3 Kostenloses Test-ETH beziehen

Die Bereitstellung von Contracts und das Prägen von NFTs erfordert Gasgebühren. Im Testnet wird Gas mit Test-ETH bezahlt, das kostenlos ist.

Besuchen Sie einen der folgenden Faucets und geben Sie Ihre Wallet-Adresse ein, um kostenloses Sepolia-ETH zu beziehen:

| Faucet | URL | Menge pro Anforderung | Anmeldung erforderlich |
|--------|------|-----------|------------|
| QuickNode | `https://faucet.quicknode.com/ethereum/sepolia` | 0,1 ETH | Ja |
| Alchemy | `https://www.alchemy.com/faucets/ethereum-sepolia` | 0,1 ETH | Ja |
| Google Cloud | `https://cloud.google.com/application/web3/faucet/ethereum/sepolia` | 0,05 ETH | Ja (Google-Konto) |

> **Tipp**: 0,1 Test-ETH reichen aus, um einen Contract bereitzustellen und Dutzende von NFTs zu prägen. Wenn ein Faucet nicht funktioniert, versuchen Sie einen anderen.

Nach erfolgreichem Beziehen kehren Sie zu MetaMask zurück und Ihr Guthaben sollte sich von 0 auf 0,1 ETH ändern (es kann einige Sekunden dauern).

<!-- ![Platzhalter: Screenshot der Faucet-Website mit Wallet-Adress-Eingabe und Beantragung von Test-ETH](/zh-cn/stage-3/cross-platform/nft-minting/images/image4.png) -->

# Kapitel 3: NFT-Smart-Contract schreiben und bereitstellen (4 Minuten)

## 3.1 Remix IDE öffnen

Remix ist die offiziell von Ethereum empfohlene Online-Entwicklungsumgebung für Smart Contracts. Sie läuft vollständig im Browser und erfordert keine Installation.

Öffnen: **https://remix.ethereum.org/**

Sie sehen eine VS Code-ähnliche Oberfläche: Datei-Explorer links, Code-Editor in der Mitte und Compile/Deploy-Panel rechts.

<!-- ![Platzhalter: Screenshot der Remix IDE-Startseite mit Datei-Explorer, Code-Editor und rechtem Panel](/zh-cn/stage-3/cross-platform/nft-minting/images/image5.png) -->

## 3.2 Contract-Datei erstellen

1. Klicken Sie im linken Datei-Explorer auf den Ordner **"contracts"**
2. Klicken Sie auf die Schaltfläche **"+"** oben, um eine neue Datei zu erstellen
3. Benennen Sie sie **`MySimpleNFT.sol`**
4. Fügen Sie den folgenden Code ein:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Importiere die offizielle sichere ERC721-Vorlage von OpenZeppelin
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Einfachster NFT-Contract: Name, Symbol, nur Mint-Funktion
contract MySimpleNFT is ERC721 {
    uint256 private _tokenId;

    // Sammlungsname und Symbol initialisieren
    constructor() ERC721("VibeCoder", "VIBE") {}

    // NFT prägen: einmal aufrufen, um einen Token an den Aufrufer zu prägen
    function mint() public {
        _safeMint(msg.sender, _tokenId);
        _tokenId++;
    }
}
```

**Code-Erklärung (weniger als 15 Zeilen, und jede Zeile ist verständlich):**

| Code | Bedeutung |
|------|------|
| `pragma solidity ^0.8.20` | Solidity-Compilerversion angeben |
| `import "@openzeppelin/..."` | OpenZeppelin ERC721-Standardimplementierung importieren (sicherheitsgeprüfte Vorlage) |
| `contract MySimpleNFT is ERC721` | Einen Contract erstellen, der den ERC721-Standard erbt |
| `ERC721("VibeCoder", "VIBE")` | Sammlungsname "VibeCoder" und Symbol "VIBE" festlegen |
| `_safeMint(msg.sender, _tokenId)` | Ein neues NFT an den Aufrufer prägen |
| `_tokenId++` | Token-ID nach jedem Prägen erhöhen |

> **Was ist ERC721?** Es ist der NFT-Standard auf Ethereum, der grundlegende NFT-Fähigkeiten definiert (Übertragung, Eigentumsabfrage usw.). OpenZeppelin bietet eine sicherheitsgeprüfte Implementierung, die wir direkt erben können, anstatt von Grund auf neu zu bauen.

<!-- ![Platzhalter: Screenshot des in Remix IDE eingefügten Contract-Codes](/zh-cn/stage-3/cross-platform/nft-minting/images/image6.png) -->

## 3.3 Den Contract kompilieren

1. Klicken Sie auf **"Solidity Compiler"** im linken Panel (Hammer-Symbol)
2. Wählen Sie die Compilerversion **0.8.20** (oder höher in 0.8.x)
3. Klicken Sie auf **"Compile MySimpleNFT.sol"**
4. Ein grüner Haken ✅ bedeutet, dass die Kompilierung erfolgreich war

> Wenn ein Fehler auftritt, prüfen Sie, ob die Solidity-Version übereinstimmt und der OpenZeppelin-Importpfad korrekt ist. Remix lädt OpenZeppelin-Abhängigkeiten automatisch von npm herunter.

<!-- ![Platzhalter: Screenshot der erfolgreichen Remix-Kompilierung mit grünem Haken und ausgewählter Compilerversion](/zh-cn/stage-3/cross-platform/nft-minting/images/image7.png) -->

## 3.4 Contract im Sepolia-Testnet bereitstellen

1. Klicken Sie auf **"Deploy & Run Transactions"** im linken Panel (Ethereum-Symbol)
2. Setzen Sie **Environment** auf **"Injected Provider - MetaMask"**
   - Dies verbindet automatisch Ihre MetaMask-Wallet
   - MetaMask zeigt eine Verbindungsanfrage an, klicken Sie auf **"Connect"**
3. Bestätigen Sie, dass das Netzwerk **Sepolia (11155111)** ist
4. Wählen Sie **MySimpleNFT** im Contract-Dropdown aus
5. Klicken Sie auf **"Deploy"**
6. MetaMask zeigt eine Transaktionsbestätigung an, klicken Sie auf **"Confirm"** (Gas ist sehr niedrig; Testnet ist kostenlos)

Nach einigen Sekunden, wenn die Bereitstellung erfolgreich ist, zeigt der Bereich **"Deployed Contracts"** unten Ihre Contract-Adresse an. **Kopieren und speichern Sie diese Adresse**; Sie werden sie später benötigen.

<!-- ![Platzhalter: Screenshot der Remix-Bereitstellung mit Umgebungsauswahl, MetaMask-Bestätigung, Deploy-Schaltfläche und bereitgestellter Contract-Adresse](/zh-cn/stage-3/cross-platform/nft-minting/images/image8.png) -->

# Kapitel 4: NFT prägen und Ergebnis verifizieren (4 Minuten)

## 4.1 Ihr erstes NFT prägen

Nach erfolgreicher Bereitstellung sehen Sie im Bereich **"Deployed Contracts"** in Remix das Contract-Interaktionspanel.

1. Klappen Sie das Contract-Panel auf und finden Sie die Schaltfläche **"mint"** (orange)
2. Klicken Sie direkt auf **"mint"** (keine Eingabeparameter erforderlich)
3. MetaMask zeigt eine Transaktionsbestätigung an, klicken Sie auf **"Confirm"**
4. Warten Sie einige Sekunden auf den Abschluss

Herzlichen Glückwunsch! Sie haben gerade NFT #0 geprägt, und es gehört nun Ihrer Wallet-Adresse.

Sie können weiterhin auf "mint" klicken, um weitere zu erstellen. Token-IDs werden bei jedem Mal automatisch erhöht (#1, #2, #3...).

<!-- ![Platzhalter: Screenshot des Klickens auf mint in Remix und Bestätigen der Transaktion in MetaMask](/zh-cn/stage-3/cross-platform/nft-minting/images/image9.png) -->

## 4.2 Prägergebnis verifizieren

**Methode 1: In Remix verifizieren**

Finden Sie im Contract-Panel **"balanceOf"** (blaue Schaltfläche), geben Sie Ihre Wallet-Adresse ein und rufen Sie es auf. Wenn es `1` (oder die von Ihnen geprägte Anzahl) zurückgibt, war das Prägen erfolgreich.

Sie können auch **"ownerOf"** aufrufen, `0` (Token-ID) eingeben, und es gibt Ihre Wallet-Adresse zurück, was beweist, dass NFT #0 Ihnen gehört.

**Methode 2: Auf Etherscan verifizieren (empfohlen)**

1. Öffnen Sie [Sepolia Etherscan](https://sepolia.etherscan.io/)
2. Fügen Sie Ihre **Contract-Adresse** in die Suche ein
3. Sie sehen die Contract-Detailseite mit allen Transaktionsdatensätzen
4. Klicken Sie auf **"Token Tracker"**, um alle von Ihrem Contract geprägten NFTs anzuzeigen

Auf Etherscan hat jede Prägetransaktion vollständige Datensätze: wer geprägt hat, wann geprägt wurde und die Token-ID. Das ist der Charme der Blockchain, "öffentlich, transparent und manipulationssicher" zu sein.

<!-- ![Platzhalter: Screenshot der Anzeige von Contract- und NFT-Prägedatensätzen auf Sepolia Etherscan, einschließlich Transaktionsliste und Token Tracker](/zh-cn/stage-3/cross-platform/nft-minting/images/image10.png) -->

# Kapitel 5: Fortgeschritten - Ein Bild zum NFT hinzufügen (optional)

Die bisher geprägten NFTs haben nur IDs, ohne Bild oder Beschreibung. Um NFTs zu vervollständigen, benötigen wir **IPFS (InterPlanetary File System)**, um Bilder und Metadaten zu speichern.

## 5.1 Was ist IPFS?

IPFS ist ein dezentrales Dateispeichernetzwerk. Im Gegensatz zu normalem Cloud-Speicher hängen Dateien auf IPFS nicht von einem einzigen Server ab, sondern sind über globale Knoten verteilt. Das bedeutet:

* Dateien gehen nicht verloren, wenn ein Server ausfällt
* Dateiinhalte werden durch Hashes eindeutig identifiziert und können nicht manipuliert werden
* es ist ideal zum Speichern von NFT-Bildern und Metadaten

## 5.2 Bild auf Pinata hochladen

[Pinata](https://pinata.cloud/) ist der beliebteste IPFS-Speicherdienst. Die kostenlose Version bietet 1 GB Speicherplatz, was für uns ausreicht.

1. Besuchen Sie https://pinata.cloud/ und registrieren Sie ein kostenloses Konto
2. Nach der Anmeldung klicken Sie auf **"Upload"** -> **"File"**
3. Wählen Sie das Bild aus, das Sie als NFT-Kunstwerk verwenden möchten (KI-generiertes Bild ist in Ordnung oder ein beliebiges Bild)
4. Nach erfolgreichem Upload kopieren Sie die **CID** (eine Zeichenfolge wie `QmXyz...`)

Ihre Bild-URI lautet: `ipfs://yourCID`

<!-- ![Platzhalter: Screenshot des Bild-Uploads in Pinata, einschließlich Upload-Schaltfläche und resultierender CID](/zh-cn/stage-3/cross-platform/nft-minting/images/image11.png) -->

## 5.3 Metadaten-JSON erstellen

NFT-Metadaten sind eine JSON-Datei, die NFT-Namen, Beschreibung und Bild-URI beschreibt. Erstellen Sie eine `metadata.json`:

```json
{
  "name": "Vibe Coder Certificate #0",
  "description": "Dieses NFT bescheinigt, dass der Inhaber das NFT-Präge-Tutorial abgeschlossen und die Welt von Web3 betreten hat.",
  "image": "ipfs://your-image-cid",
  "attributes": [
    { "trait_type": "Kurs", "value": "Easy Vibe" },
    { "trait_type": "Fähigkeit", "value": "Smart Contract" },
    { "trait_type": "Level", "value": "Anfänger" }
  ]
}
```

Laden Sie `metadata.json` ebenfalls auf Pinata hoch und erhalten Sie eine Metadaten-CID.

## 5.4 Contract aktualisieren, um Bilder zu unterstützen

Um Bilder in NFTs einzubinden, müssen wir den Contract leicht aktualisieren, indem wir `tokenURI` hinzufügen. Gehen Sie zurück zu Remix und erstellen Sie eine neue Datei `MyNFTWithImage.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFTWithImage is ERC721, ERC721URIStorage {
    uint256 private _tokenId;

    constructor() ERC721("VibeCoder", "VIBE") {}

    // Metadaten-URI beim Prägen übergeben
    function mint(string memory uri) public {
        _safeMint(msg.sender, _tokenId);
        _setTokenURI(_tokenId, uri);
        _tokenId++;
    }

    // Von Solidity geforderte Überschreibungen
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

Nach der Bereitstellung rufen Sie `mint` auf und übergeben Ihre Metadaten-URI (z. B. `ipfs://QmAbc.../metadata.json`). Dann enthält Ihr geprägtes NFT Bild und Beschreibung.

<!-- ![Platzhalter: Screenshot der NFT-Details mit angezeigtem Bild auf Etherscan](/zh-cn/stage-3/cross-platform/nft-minting/images/image12.png) -->

# Kapitel 6: Abschließende Bemerkungen

Herzlichen Glückwunsch! Sie haben einen vollständigen NFT-Entwicklungsablauf von Grund auf abgeschlossen. Lassen Sie uns zusammenfassen:

1. Kernkonzepte von NFTs und Smart Contracts verstanden
2. MetaMask installiert und zum Sepolia-Testnet gewechselt
3. Einen NFT-Smart-Contract mit weniger als 15 Zeilen in Remix IDE geschrieben
4. Den Contract im Ethereum-Testnet bereitgestellt
5. Ihr eigenes NFT geprägt und auf Etherscan verifiziert
6. (Optional) Gelernt, wie man Bild und Metadaten mit IPFS hinzufügt

Der gesamte Prozess erforderte keine lokale Umgebungsininstallation, kostete kein Geld und wurde vollständig im Browser abgeschlossen. Das ist der Reiz der Blockchain-Entwicklung: die Einstiegshürde ist viel niedriger, als die meisten Menschen erwarten.

**Fortgeschrittene Richtungen:**

* **Hardhat / Foundry für lokale Entwicklung nutzen**: Wenn die Contract-Logik komplex wird, reicht Remix nicht aus. Hardhat und Foundry sind professionelle lokale Frameworks mit automatisierten Tests, skriptbasierter Bereitstellung, Gas-Optimierung und mehr
* **Whitelist und Prägelimits hinzufügen**: Kontrollieren, wer prägen darf, maximale Prägungen pro Wallet, Prägebpreis und ähnliche Regeln
* **Ein Prägen-Frontend bauen**: React + ethers.js / viem verwenden, um eine ansprechende Prägen-Seite für Ein-Klick-Web-Prägung zu erstellen
* **ERC1155 Multi-Edition-NFTs erkunden**: ERC1155 ermöglicht mehrere Kopien unter einer Token-ID, nützlich für Spielgegenstände und Tickets
* **Auf Mainnet bereitstellen**: Wenn Sie bereit sind, auf Ethereum-Mainnet bereitstellen (oder L2-Chain wie Polygon oder Base mit niedrigeren Gasgebühren)

***Ihr erstes NFT ist bereits on-chain. Die Tür zur Blockchain-Welt steht nun offen.***

# Referenzen

* [OpenZeppelin ERC721-Dokumentation](https://docs.openzeppelin.com/contracts/5.x/erc721)
* [Remix IDE Offizielle Dokumentation](https://remix-ide.readthedocs.io/)
* [MetaMask Offizielle Dokumentation](https://docs.metamask.io/)
* [Solidity Offizielle Dokumentation](https://docs.soliditylang.org/)
* [Sepolia Etherscan](https://sepolia.etherscan.io/)
* [Pinata IPFS-Speicherdienst](https://pinata.cloud/)
* [ERC721-Standardspezifikation (EIP-721)](https://eips.ethereum.org/EIPS/eip-721)
