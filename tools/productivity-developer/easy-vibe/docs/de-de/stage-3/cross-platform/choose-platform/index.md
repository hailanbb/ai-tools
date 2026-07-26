# So wählen Sie die richtige Plattform für Ihre Anwendung

Sie haben eine Idee und möchten sie in ein echtes Produkt umwandeln. Aber mit so vielen Plattformoptionen - WeChat Mini Programs, iOS-Apps, Android-Apps, Websites, Browser-Erweiterungen, Desktop-Anwendungen - wo sollten Sie anfangen?

::: tip Schnellnavigation
Wenn Sie die Eigenschaften jeder Plattform bereits kennen, können Sie direkt zu [Abschnitt 2](#_2-stellen-sie-sich-zuerst-drei-fragen) für den Entscheidungsprozess springen oder das [Entscheidungsflussdiagramm in Abschnitt 7](#_7-zusammenfassung-plattformauswahl-entscheidungsfluss) ansehen.
:::

Dieser Artikel hilft Ihnen, Ihre Gedanken zu ordnen und die am besten geeignete Entwicklungsplattform für Ihr spezifisches Szenario zu finden.

## 1 Diese Plattformen zuerst kennenlernen

Bevor wir "welche wählen" besprechen, verstehen wir zuerst, "welche existieren." Im Folgenden sind die aktuellen Mainstream-Plattformkategorien:

### 1.1 Mobile Plattformen

#### iOS Native App

Die Apps, die Sie aus dem App Store auf Ihrem iPhone herunterladen, sind iOS native Apps. Ihre Eigenschaften: schneller Start, flüssiges Erlebnis und voller Zugriff auf Handy-Fähigkeiten (Kamera, Standort, Gesundheitsdaten usw.). Die Entwicklung erfordert jedoch einen Mac, und die App-Store-Veröffentlichung erfordert Apples Überprüfung.

**Häufige Beispiele**: WeChat, Douyin (TikTok China), Xiaohongshu, Keep, Meituan, Alipay

#### Android Native App

Apps, die aus Android App-Stores heruntergeladen oder aus APK-Dateien installiert werden, die Freunde geschickt haben, sind Android native Apps. Sie sind ähnlich wie iOS-Apps, aber Android hat mehr Nutzer und mehr Vertriebskanäle. Der Nachteil ist die Gerätefragmentierung: Entwickler müssen sich an viele Bildschirmgrößen und Systemversionen anpassen.

**Häufige Beispiele**: Tasker (Automatisierung), MX Player (Video-Player), AirDroid (Handy-Manager), Greenify (Batterieoptimierung), Xposed Framework (Systemanpassung)

#### WeChat Mini Program

Die "kleinen Apps", die Sie direkt in WeChat durch Scannen eines Codes oder Suche nach Namen nutzen können, ohne Installation. Der Vorteil ist geringe Nutzerreibungen: Jeder hat bereits WeChat, also können Nutzer sofort starten. Der Nachteil sind eingeschränkte Fähigkeiten, und es läuft nur innerhalb von WeChat.

**Häufige Beispiele**: Pinduoduo (Gruppenkauf-E-Commerce), Meituan Waimai (lokale Dienste), Mobike (Bike-Sharing), Jump Jump (Mini-Spiel), Zhouheiya (Bestellung/Einkauf)

#### PWA (Progressive Web App)

Es klingt technisch, aber es ist im Grunde "eine Webseite, die wie eine App installiert werden kann." Wenn Nutzer eine Seite in einem mobilen Browser öffnen, sehen sie möglicherweise "Zum Startbildschirm hinzufügen." Nach einem Tippen erscheint ein Icon auf dem Startbildschirm und es verhält sich wie eine App. Der Vorteil ist eine Codebasis für Mobil und Desktop. Der Nachteil ist, dass viele Nutzer dieses Nutzungsmuster nicht kennen.

**Häufige Beispiele**: Twitter Lite, Starbucks, Pinterest, Uber, Spotify Web Player

### 1.2 Desktop-Plattformen

#### Electron Desktop-App

Sie nutzen sie vielleicht täglich: VS Code, Slack, Discord, Notion, Figma - alle mit Electron gebaut. Das Hauptmerkmal: Desktop-Software mit Web-Technologien (HTML, CSS, JavaScript) bauen und eine Codebasis auf Windows, Mac und Linux ausführen. Der Nachteil sind größere Installationsprogramme und höherer Speicherverbrauch zur Laufzeit.

**Häufige Beispiele**: VS Code, Slack, Discord, Notion, Figma, WeChat Developer Tools

#### Qt Desktop-Anwendung

Wenn Sie WPS, VirtualBox oder OBS verwendet haben, wurden diese möglicherweise mit Qt gebaut. Qt verwendet C++, mit guter Leistung und Stabilität, besonders geeignet für Industrieszenarien. Die Lernkurve ist jedoch steiler und C++-Kenntnisse sind erforderlich.

**Häufige Beispiele**: WPS Office, VirtualBox, Autodesk Maya, Telegram Desktop, OBS Studio

#### Native Desktop-Anwendung

Diese "Schwergewicht"-Anwendungen werden normalerweise mit nativen Technologien gebaut. Windows verwendet oft C# oder C++; macOS verwendet Swift. Sie bieten die beste Leistung und das flüssigste Erlebnis, aber Windows- und macOS-Versionen müssen separat entwickelt werden, was teuer ist.

**Häufige Beispiele**: Microsoft Office, Adobe Photoshop, Final Cut Pro, WeChat (Windows/Mac), QQ Music

### 1.3 Web-bezogene Plattformen

#### Website

Dies sind Seiten, die durch Eingabe von URLs in einem Browser geöffnet werden. Vorteile: auf jedem Gerät (Handy, Computer, Tablet) zugänglich, keine Installation erforderlich und von Suchmaschinen auffindbar. Nachteil: Internetverbindung erforderlich, Offline-Nutzung nicht möglich.

**Häufige Beispiele**: Taobao, Zhihu, GitHub, Bilibili, Juejin, CSDN

#### Browser-Erweiterung

Haben Sie Werbeblocker, Übersetzungstools oder Passwortmanager verwendet? Das sind Browser-Erweiterungen. Sie laufen innerhalb von Browsern und können Webseiteninhalte lesen/ändern. Zum Beispiel eine Übersetzungs-Erweiterung installieren und englische Seiten mit einem Klick übersetzen. Vorteil: leichtgewichtig und startet mit dem Browser. Nachteil: funktioniert nur in Browsern und Erweiterungen sind nicht immer kompatibel zwischen Chrome, Edge und Firefox.

**Häufige Beispiele**: AdBlock Plus, Immersive Translate, 1Password, Grammarly, Tampermonkey, Dark Reader

### 1.4 Andere Plattformen

#### VS Code Extension

Wenn Sie Entwickler sind, nutzen Sie wahrscheinlich VS Code. VS Code-Erweiterungen sind kleine Programme, die dem Editor "Funktionen hinzufügen." Vorteil: hochgradig zielgerichtete Entwickler-Zielgruppe. Nachteil: nur für Entwickler-Nutzer nützlich.

**Häufige Beispiele**: Prettier, GitLens, GitHub Copilot, ESLint, Live Server, Chinese Language Pack

#### NFT Smart Contract

Sie haben vielleicht von NFTs gehört - diese "digitalen Avatare", die für Millionen verkauft werden. NFTs sind im Wesentlichen blockchainbasierte Eigentumszertifikate, die beweisen, dass ein digitaler Gegenstand Ihnen gehört. Smart Contracts sind Programme, die auf der Blockchain laufen, um NFTs zu erstellen und zu verwalten. Vorteil: manipulationssicher und handelbar. Nachteil: hohe technische Barriere und volatiler Markt.

**Häufige Beispiele**: BAYC, CryptoPunks, NBA Top Shot, Azuki, Moonbirds

### 1.5 Gibt es weitere Optionen?

Über die oben genannten Plattformen hinaus gibt es auch "Mittelwege" und weitere Möglichkeiten:

#### Cross-Plattform-Frameworks

::: details Klicken zum Anzeigen der Cross-Plattform-Framework-Details

**React Native / Flutter**: Möchten Sie sowohl iOS als auch Android, ohne zwei Codebasen zu schreiben? Diese Frameworks lassen Sie einmal schreiben und Apps für beide Plattformen generieren. Viele Unternehmen nutzen sie, wie Airbnb und Instagram.

**Tauri**: Eine "leichtgewichtige Alternative" zu Electron. Es nutzt ebenfalls Web-Technologien, um Desktop-Apps zu bauen, aber mit kleineren Installationsprogrammen und schnellerer Laufzeit. Nachteil: Das Ökosystem ist weniger ausgereift.

**uni-app**: Sehr beliebt in China. Eine Codebasis kann WeChat Mini Program, iOS-App, Android-App und H5-Website bedienen. Geeignet für Teams, die "einmal bauen, überall ausführen" wollen.

**Capacitor / Ionic**: Haben Sie bereits eine Website und möchten sie schnell in eine App umwandeln? Diese Tools können Ihre Website in eine installierbare App für App-Stores "einwickeln".

Diese Frameworks sind im Wesentlichen Kompromisse zwischen nativer und Web-Entwicklung: höhere Entwicklungseffizienz, aber einige Einbußen bei Leistung und Erlebnis.
:::

#### China Mini Program Ökosystem

::: details Klicken zum Anzeigen der Mini-Program-Optionen in China

**Alipay Mini Program**: Finanz- und lokale Serviceszenarien. Wenn Ihre Nutzer in Alipay Rechnungen zahlen, Essen bestellen oder öffentliche Verkehrsmittel nutzen, dann passt ein Alipay Mini Program. Fähigkeiten wie Zhima-Kredit und Trust-Identität sind einzigartig für Alipay.

**Douyin Mini Program**: Content-Commerce und Livestream-Verkauf. Wenn Sie auf Douyin verkaufen, können Mini Programs unter Videos angehängt werden für sofortige Konversion.

**Kuaishou Mini Program**: Niedrigere Einkommensschichten und starke Community-Wirtschaft. Kuaishou-Nutzer sind hochgradig engagiert, geeignet für Community-Gruppenkauf und lokale Dienste.

**Baidu Mini Program**: Suchtraffic-Einstieg. Wenn Nutzer auf Baidu "Restaurants in der Nähe" suchen, kann Ihr Mini Program direkt in den Ergebnissen erscheinen.
:::

#### HarmonyOS Ökosystem

**HarmonyOS-Apps**: können auf Huawei-Handys, Tablets, Uhren und Smart-Home-Geräten laufen. Mit ArkTS entwickelt (ähnlich wie TypeScript), kann eine Codebasis mehrere Geräte unterstützen. Wenn Ihre Zielgruppe im Huawei-Ökosystem ist oder Ihr Produkt IoT-Verknüpfung beinhaltet, ist HarmonyOS eine wichtige Option.

#### Weitere Entwickler-Tools

::: details Klicken zum Anzeigen weiterer Entwickler-Tool-Optionen

**Kommandozeilen-Tools (CLI)**: Entwickler nutzen täglich das Terminal. CLI-Tools können repetitive Arbeit automatisieren, Code-Templates generieren und Projekte bereitstellen. Beispiele sind `create-react-app`, `git` und `npm`. Geeignet für Entwicklerproduktivität und DevOps-Automatisierung.

**JetBrains-Plugins**: Neben VS Code nutzen viele Entwickler IntelliJ IDEA, PyCharm und WebStorm. Wenn Ihr Tool Java-, Python- oder Frontend-Entwickler anspricht, ist der JetBrains Marketplace ebenfalls erwägenswert.

**Cursor / Windsurf-Plugins**: Aufstrebende Ökosysteme für KI-Coding-Tools. Wenn Sie KI-gestützte Coding-Funktionen bauen, wachsen diese IDE-Plugin-Ökosysteme schnell.
:::

#### Community-Bots

::: details Klicken zum Anzeigen der Community-Bot-Optionen

**Telegram Bot**: Große internationale Nutzerbasis und entwicklerfreundliche APIs. Geeignet für Benachrichtigungen, Automatisierungsaufgaben und Community-Management. Viele Krypto-Projekte und Dev-Communities nutzen Telegram.

**Discord Bot**: Kernplattform für Gaming- und Entwickler-Communities. Nützlich für Musikwiedergabe, Spieldaten-Abfragen und Serververwaltung. Wenn Ihre Nutzer Gamer oder internationale Entwickler sind, sind Discord-Bots oft unverzichtbar.
:::

#### Design- und Produktivitäts-Tools

::: details Klicken zum Anzeigen der Design-Tool-Optionen

**Figma-Plugins**: Designer nutzen täglich Figma. Plugins können Design-Workflows automatisieren, Code generieren und Design-Systeme verwalten. Geeignet für Design-Tools und Frontend-Unterstützung.

**Notion-Integrationen**: Mit der Notion-API können Sie Workflows automatisieren, Daten synchronisieren und Berichte generieren. Geeignet für Wissensmanagement und Projektmanagement-Tools.
:::

#### Spatial Computing

**visionOS-Apps (Apple Vision Pro)**: Die neue Ära des Spatial Computing. Geeignet für 3D-Content-Anzeige, immersive Erlebnisse, Bildung/Training und virtuelle Zusammenarbeit. Die technische Barriere ist hoch, aber für Grenzerkundung ist dies eine zukunftsweisende Richtung.

---

## 2 Stellen Sie sich zuerst drei Fragen

Bevor Sie eine Plattform wählen, beantworten Sie diese drei Kernfragen:

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px; border-left: 4px solid #409EFF;">
  <template #header>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 20px;">🎯</span>
      <span style="font-weight: bold; font-size: 16px;">Frage 1: Wo sind Ihre Nutzer?</span>
    </div>
  </template>
  <div style="line-height: 1.8; color: #606266;">
    <ul>
      <li>Müssen Nutzer jederzeit und überall nutzen? (Mobile First)</li>
      <li>Sind Nutzer daran gewöhnt, Aufgaben innerhalb von WeChat zu erledigen? (Mini Program)</li>
      <li>Verbringen Nutzer lange Sitzungen in Büro-Szenarien? (Desktop-App)</li>
      <li>Müssen Nutzer Sie über Suchmaschinen finden? (Website)</li>
    </ul>
  </div>
</el-card>

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px; border-left: 4px solid #67C23A;">
  <template #header>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 20px;">⚡</span>
      <span style="font-weight: bold; font-size: 16px;">Frage 2: Welche Fähigkeiten benötigt Ihre App?</span>
    </div>
  </template>
  <div style="line-height: 1.8; color: #606266;">
    <ul>
      <li>Braucht sie Zugriff auf Kamera, Mikrofon, GPS oder andere Hardware?</li>
      <li>Braucht sie Offline-Unterstützung?</li>
      <li>Braucht sie Push-Benachrichtigungen?</li>
      <li>Muss sie große Mengen lokaler Daten verarbeiten?</li>
    </ul>
  </div>
</el-card>

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px; border-left: 4px solid #E6A23C;">
  <template #header>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 20px;">💰</span>
      <span style="font-weight: bold; font-size: 16px;">Frage 3: Über wie viele Ressourcen verfügen Sie?</span>
    </div>
  </template>
  <div style="line-height: 1.8; color: #606266;">
    <ul>
      <li>Wie hoch ist Ihr Entwicklungskostenbudget?</li>
      <li>Haben Sie ein Mac-Gerät (für iOS-Entwicklung erforderlich)?</li>
      <li>Müssen Sie mehrere Plattformen gleichzeitig abdecken?</li>
    </ul>
  </div>
</el-card>

---

## 3 Plattformauswahl-Entscheidungstabelle

Nutzen Sie diese Tabelle, um schnell Ihre passende Option zu identifizieren:

| Ihr Szenario | Empfohlene Plattform | Warum |
|---------|---------|------|
| Nutzer sind im WeChat-Ökosystem und Sie wollen schnelles Nutzerwachstum | <el-tag type="success">WeChat Mini Program</el-tag> | Kein Download nötig, einfaches WeChat-Teilen, geringe Akquisitionskosten |
| Kontinuierliche GPS-Verfolgung im Hintergrund und Zugriff auf Gesundheitsdaten benötigt | <el-tag type="primary">iOS / Android Native</el-tag> | Direkter System-API-Zugriff, beste Leistung |
| Eine Codebasis für mehrere Plattformen gewünscht | <el-tag type="warning">PWA / Electron</el-tag> | Hohe Effizienz, geringe Wartungskosten |
| Nutzer benötigen lange Sitzungen am Computer | <el-tag type="primary">Desktop-App</el-tag> (Electron / Qt) | Separates Fenster, Offline-Unterstützung, starke Systemintegration |
| Auto-Zusammenfassung/Übersetzung/Passwortverwaltung beim Surfen benötigt | <el-tag type="info">Browser-Erweiterung</el-tag> | Kann Webseiteninhalte lesen/ändern, startet mit dem Browser |
| Technische Artikel/Projekt-Showcase von Google indiziert haben wollen | <el-tag type="warning">Website / Persönlicher Blog</el-tag> | SEO-freundlich, durchsuchbarer Inhalt |
| Handelbare digitale Mitgliedskarten oder Sammlerstücke ausgeben wollen | <el-tag type="danger">NFT Smart Contract</el-tag> | On-Chain-Eigentum, übertragbar/handelbar |

---

## 4 Praktische Szenario-Beispiele

### Szenario 1: Ich möchte ein Community-Gruppenkauf-Tool bauen

**Empfehlung: WeChat Mini Program**

Warum ein Mini Program?

- **Nutzer sind bereits in WeChat**: Community-Nutzer sind in WeChat-Gruppen aktiv; Mini Programs können direkt in Gruppen geteilt werden
- **Nutzen-und-gehen-Verhalten**: Niemand möchte eine dedizierte App installieren, nur um Gemüse zu bestellen
- **Nahtlose Zahlung**: Ein-Tap-WeChat-Pay, kein Kontextwechsel
- **Geringe Akquisitionskosten**: Ein Gruppen-Sharing-Ablauf kann Dutzende von Nutzern bringen

::: tip Anwendungsszenarien
Wenn Ihr Produkt ähnlich ist - Gruppenkauf, Buchung, Umfragen, Veranstaltungsanmeldung - sind Mini Programs normalerweise die erste Wahl.
:::

---

### Szenario 2: Ich möchte eine Lauftracker-App bauen

**Empfehlung: iOS / Android Native**

Warum eine native App?

- **Hintergrundlauf**: Die App muss während des Laufens die Route weiter verfolgen, was Mini Programs und Websites nicht zuverlässig können
- **GPS-Präzision**: Native Apps können auf hochpräzise Standortbestimmung mit kleinem Fehlerbereich zugreifen
- **Gesundheitsdaten-Zugriff**: Schrittzahl- und Herzfrequenzzugriff benötigt Apple HealthKit / Google Fit
- **Zuverlässige Push-Erinnerungen**: Tägliche "Zeit zum Laufen"-Erinnerungen werden am besten über native Push erledigt

::: warning Wichtiger Hinweis
Jede App, die **langfristige Hintergrundausführung** oder **tiefen Hardware-Zugriff** erfordert, sollte native Entwicklung wählen.
:::

---

### Szenario 3: Ich möchte eine Buchhaltungs-App bauen

**Empfehlung: PWA oder Mini Program**

Warum?

- **Hohe Frequenz, aber kurze Sitzungen**: Eine Aufzeichnung pro Tag, in 30 Sekunden erledigt
- **Keine komplexen Hardware-Anforderungen**: Meistens Dateneingabe und -anzeige
- **Starke Cross-Plattform-Anforderung**: Nutzer möchten vielleicht am Handy erfassen und Berichte am Desktop ansehen
- **Offline-Szenario**: Nutzer möchten vielleicht Ausgaben in der U-Bahn ohne Signal erfassen

PWA kann auf dem Startbildschirm installiert werden und fühlt sich wie eine App an, während die Entwicklungskosten etwa ein Drittel von nativ betragen. Mini Programs sind oft besser für China-Nutzer.

---

### Szenario 4: Ich möchte eine Online-Bildungsplattform bauen

**Empfehlung: Website + Mini Program Kombination**

Warum?

- **Website übernimmt Akquise**: Kursseiten, Dozentenprofile, SEO-Optimierung
- **Mini Program übernimmt Konversion**: Probestunde, Einschreibungsbezahlung, Gruppenbeitritt per QR
- **Website übernimmt Bereitstellung**: Videowiedergabe ist auf größeren Web-Bildschirmen besser
- **Mini Program übernimmt Touchpoints**: Kurs-Erinnerungen und Hausaufgaben-Benachrichtigungen

::: tip Kombinationsstrategie
Komplexe Geschäftsprozesse benötigen oft eine **Multi-Plattform-Kombination**, nicht eine einzige Plattform.
:::

---

### Szenario 5: Ich möchte ein Teamzusammenarbeits-Tool bauen

**Empfehlung: Electron Desktop-App + Web-Version**

Warum?

- **Desktop-Seite**: Nutzer lassen Computer bei der Arbeit an; Desktop-Apps können resident bleiben und Nachrichten empfangen
- **Web-Seite**: Vorübergehende Nutzung auf anderen Computern ohne Installation
- **Systemintegration**: Desktop-App kann auf lokale Dateien, Systembenachrichtigungen und Shortcuts zugreifen
- **Eine Codebasis**: Electron nutzt Web-Stack und Desktop/Web können ca. 80% Code wiederverwenden

Slack, Notion und Discord folgen alle diesem Muster.

---

### Szenario 6: Ich möchte einen Passwortmanager bauen

**Empfehlung: Desktop-App + Browser-Erweiterung**

Warum?

- **Desktop-App**: sichere lokale Passwortdatenbank-Speicherung, unterstützt biometrische Entsperrung
- **Browser-Erweiterung**: Auto-Ausfüllen auf Login-Seiten ohne Fensterwechsel
- **Offline-Verfügbarkeit**: Passwortdaten lokal gespeichert, unabhängig vom Netzwerk
- **Sicherheitskontrolle**: Nutzer wissen, wo ihre Daten sind, Reduzierung von Cloud-Leck-Bedenken

1Password und Bitwarden nutzen beide diese Kombination.

---

### Szenario 7: Ich möchte eine Content-Erstellungs-Plattform bauen

**Empfehlung: Website + persönlicher Blog**

Warum?

- **SEO ist die Lebensader**: Suche ist Ihre größte langfristige Traffic-Quelle
- **Content ist Produkt**: Artikel, Tutorials und Videos sind der Kernwert
- **Langfristiger Vermögenswert**: Websites können jahrelang betrieben werden, während Social-Media-Konten jederzeit gesperrt werden können
- **Flexible Monetarisierung**: Werbung, bezahlte Abonnements und Wissens-Commerce können alle auf Websites laufen

Medium, Zhihu-Kolumnen und persönliche Tech-Blogs sind im Wesentlichen alle Content-Plattformen.

---

### Szenario 8: Ich möchte ein Entwickler-Produktivitäts-Tool bauen

**Empfehlung: VS Code-Erweiterung oder CLI-Tool**

Warum?

- **Nutzer sind bereits im Editor**: Entwickler mögen keine Kontextwechsel
- **Kontextbewusstsein**: Tools können aktuellen Code lesen und präzise Vorschläge machen
- **Einfache Verteilung**: Im Extension-Marketplace veröffentlichen und Nutzer installieren mit einem Klick
- **Schnelle Iteration**: Keine App-Store-Überprüfungsverzögerungen, gleichzeitige Veröffentlichung/Aktualisierung

Prettier, ESLint und GitHub Copilot sind alle VS Code-Erweiterungen.

---

### Szenario 9: Ich möchte ein industrielles Überwachungs-Dashboard bauen

**Empfehlung: Qt Desktop-Anwendung**

Warum?

- **Stabilität über alles**: Fabriken laufen 24/7 und Software darf nicht abstürzen
- **Hardware-Kommunikation**: Benötigt Serial/Modbus-Kommunikation mit Sensoren
- **Echtzeit-Diagramme**: Druck/Temperatur/Durchfluss benötigen oft Millisekunden-Aktualisierung
- **Industrieumgebung**: Industrie-Computer laufen häufig unter Windows, und Qt-Kompatibilität ist stark

::: warning Industrieszenarien
Industrieszenarien erfordern Stabilität und Hardware-Schnittstellen, die Web-Technologien normalerweise nicht erfüllen können.
:::

---

### Szenario 10: Ich möchte eine digitale Mitgliedskarte ausgeben

**Empfehlung: NFT Smart Contract**

Warum?

- **Unfälschbar**: On-Chain-Datensätze können nicht manipuliert werden
- **Übertragbar**: Mitgliedschaften können verschenkt oder auf Sekundärmärkten gehandelt werden
- **Programmierbar**: Smart Contracts können Vorteile automatisieren (z. B. Auto-Upgrade nach einem Jahr)
- **Globale Reichweite**: Keine nationalen Grenzen, globale Teilnahme möglich

Starbucks Odyssey und NBA Top Shot nutzen beide NFTs in ihren Mitgliedssystemen.

---

## 5 Schneller Plattform-Fähigkeitsvergleich

### 5.1 Mobile-Lösungsvergleich

| Fähigkeit | WeChat Mini Program | iOS Native | Android Native | PWA |
|-----|----------|---------|-------------|-----|
| Nutzerakquisitionskosten | <el-tag type="success">Niedrig</el-tag> (WeChat-Teilen) | <el-tag type="danger">Hoch</el-tag> (App Store) | <el-tag type="danger">Hoch</el-tag> (App Store) | <el-tag type="warning">Mittel</el-tag> (Suchmaschinen) |
| Offline-Nutzung | <el-tag type="warning">Eingeschränkt</el-tag> | <el-tag type="success">Voll</el-tag> | <el-tag type="success">Voll</el-tag> | <el-tag type="success">Unterstützt</el-tag> |
| Push-Benachrichtigungen | <el-tag type="success">Unterstützt</el-tag> | <el-tag type="success">Unterstützt</el-tag> | <el-tag type="success">Unterstützt</el-tag> | <el-tag type="warning">Teilweise</el-tag> |
| Hardware-Zugriff | <el-tag type="warning">Eingeschränkt</el-tag> | <el-tag type="success">Voller Zugriff</el-tag> | <el-tag type="success">Voller Zugriff</el-tag> | <el-tag type="warning">Eingeschränkt</el-tag> |
| Hintergrundlauf | <el-tag type="warning">Eingeschränkt</el-tag> | <el-tag type="success">Unterstützt</el-tag> | <el-tag type="success">Unterstützt</el-tag> | <el-tag type="warning">Eingeschränkt</el-tag> |
| Entwicklungskosten | <el-tag type="success">Niedrig</el-tag> | <el-tag type="danger">Hoch</el-tag> | <el-tag type="danger">Hoch</el-tag> | <el-tag type="success">Niedrig</el-tag> |
| Überprüfung erforderlich | <el-tag type="warning">Ja</el-tag> | <el-tag type="warning">Ja</el-tag> | <el-tag type="warning">Ja</el-tag> | <el-tag type="success">Nein</el-tag> |

### 5.2 Desktop-Lösungsvergleich

| Fähigkeit | Electron | Qt | Browser-Erweiterung |
|-----|----------|-----|-----------|
| Cross-Plattform | Win/Mac/Linux | Win/Mac/Linux | Chrome/Edge/Firefox |
| Systemintegration | <el-tag type="warning">Mittel</el-tag> | <el-tag type="success">Hoch</el-tag> | <el-tag type="warning">Niedrig</el-tag> |
| Offline-Nutzung | <el-tag type="success">Unterstützt</el-tag> | <el-tag type="success">Unterstützt</el-tag> | <el-tag type="warning">Teilweise</el-tag> |
| Hardware-Zugriff | <el-tag type="warning">Über Node.js</el-tag> | <el-tag type="success">Voller Zugriff</el-tag> | <el-tag type="warning">Eingeschränkt</el-tag> |
| Installation | Installationspaket | Installationspaket | Browser-Erweiterungs-Store |
| Entwicklungsstack | Web-Technologien | C++/QML | JavaScript |

---

## 6 Häufige Missverständnisse

<el-collapse accordion style="margin: 20px 0;">
  <el-collapse-item name="1">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">Falsch 1: "Ich möchte eine App bauen, also muss ich sowohl iOS als auch Android bauen"</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      Nicht unbedingt. Wenn Ihre App leichtgewichtig und "nutzen-und-gehen" ist, kann ein Mini Program oder PWA die bessere Wahl sein. Native Entwicklung lohnt sich erst, wenn Sie tiefen Systemzugriff oder Höchstleistung benötigen.
    </div>
  </el-collapse-item>
  
  <el-collapse-item name="2">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">Falsch 2: "Websites sind veraltet und niemand liest sie mehr"</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      Das Gegenteil ist der Fall. Websites sind die einzige Plattform, die von Suchmaschinen indiziert werden kann. Wenn Sie contentgetriebenes Nutzerwachstum wollen, sind Websites und persönliche Blogs Top-Wahlen. Technische Artikel und Projekt-Showcases können kontinuierlich SEO-Traffic bringen.
    </div>
  </el-collapse-item>
  
  <el-collapse-item name="3">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">Falsch 3: "Desktop-Apps werden nicht mehr genutzt"</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      In Büro-Szenarien sind Desktop-Apps weiterhin Mainstream. VS Code, Slack und Notion sind alle Desktop-Apps. Wenn Ihre App lange Sitzungen, schwere Datenverarbeitung oder Systemintegration benötigt, ist Desktop oft die beste Wahl.
    </div>
  </el-collapse-item>
  
  <el-collapse-item name="4">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">Falsch 4: "PWA-Erlebnis ist schlechter als nativ"</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      Moderne PWAs sind dem nativen Erlebnis bereits sehr nahe. Starbucks, Pinterest und Uber haben alle PWA-Versionen. Wenn Ihre App keine komplexe Hardware-Integration erfordert, ist PWA oft die kostengünstigste Cross-Plattform-Lösung.
    </div>
  </el-collapse-item>
</el-collapse>

---

## 7 Zusammenfassung: Plattformauswahl-Entscheidungsfluss

```text
Start
  │
  ├─ Nutzer im WeChat-Ökosystem? ───────────────────→ WeChat Mini Program
  │
  ├─ Beste Leistung und tiefer Hardware-Zugriff benötigt? ──→ iOS / Android Native
  │
  ├─ Lange Nutzungssitzungen am Computer benötigt? ───────────→ Desktop-App
  │     │
  │     ├─ Industrieszenario? ───────────────────────→ Qt
  │     └─ Allgemeines Szenario? ──────────────────────────→ Electron
  │
  ├─ Browser-Seiteninhalte verarbeiten benötigt? ────────────→ Browser-Erweiterung
  │
  ├─ Leichtgewichtig + Cross-Plattform + Offline? ──────────→ PWA
  │
  ├─ Von Suchmaschinen auffindbar sein benötigt? ───────────────→ Website / Blog
  │
  ├─ Entwickler-Tool? ───────────────────────────────────→ VS Code-Erweiterung
  │
  └─ Blockchain-Vermögenswert? ────────────────────────────────→ NFT Smart Contract
```

---

## 8 Nächster Schritt

::: tip Starten Sie mit der Umsetzung
Basierend auf der obigen Analyse sollten Sie nun eine vorläufige Antwort auf "welche Plattform wählen" haben. Klicken Sie als Nächstes auf das passende Tutorial, um zu beginnen:
:::

<NavGrid>
  <NavCard
    href="/de-de/stage-3/cross-platform/wechat-miniprogram/"
    title="So bauen Sie ein WeChat Mini Program"
    description="Bauen Sie ein WeChat Mini Program von Grund auf und meistern Sie den Kern-Entwicklungs-Workflow"
  />
  <NavCard
    href="/de-de/stage-3/cross-platform/android-app/"
    title="So bauen Sie eine Android-App"
    description="Bauen Sie Android-native Anwendungen mit modernen Cross-Plattform-Frameworks"
  />
  <NavCard
    href="/de-de/stage-3/cross-platform/ios-app/"
    title="So bauen Sie eine iOS-App"
    description="Entwickeln und veröffentlichen Sie iOS-Anwendungen mit Best Practices des Apple-Ökosystems"
  />
  <NavCard
    href="/de-de/stage-3/cross-platform/pwa-local-app/"
    title="So bauen Sie eine lokale PWA-App"
    description="Verwandeln Sie eine Website in eine echte App mit Offline-Unterstützung und Desktop-Installation"
  />
  <NavCard
    href="/de-de/stage-3/cross-platform/browser-ai-extension/"
    title="So bauen Sie eine Browser-KI-Assistent-Erweiterung"
    description="Jede Webseite mit einem Klick zusammenfassen und Ihren Browser-KI-Assistenten bauen"
  />
  <NavCard
    href="/de-de/stage-3/cross-platform/electron-voice-to-text/"
    title="So bauen Sie eine Cross-Plattform Electron-Desktop-App"
    description="Bauen Sie eine Sprache-zu-Text-Desktop-App für Windows, macOS und Linux"
  />
  <NavCard
    href="/de-de/stage-3/cross-platform/vscode-extension/"
    title="So bauen Sie eine VS Code-Erweiterung"
    description="Erstellen Sie Ihren KI-Projekt-Assistenten mit Multi-File-Q&A und benutzerdefinierten Shortcuts"
  />
  <NavCard
    href="/de-de/stage-3/cross-platform/qt-industrial-hmi/"
    title="So bauen Sie ein Qt industrielles HMI"
    description="Bauen Sie eine industrielle Mensch-Maschine-Schnittstelle, die mit echter Hardware verbunden ist"
  />
</NavGrid>
