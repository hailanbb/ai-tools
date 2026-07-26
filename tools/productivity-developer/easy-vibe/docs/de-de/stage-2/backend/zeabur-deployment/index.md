# Web-Anwendungen bereitstellen

In diesem Tutorial stellen wir vor, wie du deine Web-Anwendung im Internet veroeffentlicht, damit andere darauf zugreifen koennen. Wir stellen drei haeufig genutzte Bereitstellungsplattformen vor: **Tencent Cloud CloudBase**, **Vercel** und **Zeabur**.

# Was ist "Bereitstellung"?

Bevor wir beginnen, klaeren wir, was "Bereitstellung (Deployment)" eigentlich bedeutet. Jede Website, die von externen Benutzern erreicht werden soll, benoetigt eine oeffentlich zugaengliche Netzwerkadresse. Aber die Adresse allein reicht nicht aus - dein geschriebener Webseiten-Code (HTML-, CSS-, JavaScript-Dateien oder Projekte mit React, Vue usw.) sowie zugehoerige Bild-/Videoressourcen muessen auf einem durchgehend online Server "abgelegt" werden, der Netzwerkanfragen beantwortet.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image1.png)

Bildquelle: https://www.hostinger.com/tutorials/what-is-cloud-hosting

Den gesamten Prozess des Hochladens von Ressourcen, der Konfiguration der Umgebung und des Startens des Dienstes bezeichnet man als **Bereitstellung (Deployment)**.

Plattformen wie CloudBase, Vercel, Netlify und Zeabur wurden entwickelt, um genau diese Komplexitaet zu loesen. Sie automatisieren die Schritte "Server kaufen, Umgebung konfigurieren, Code hochladen, Dienst starten und Betrieb ueberwachen". Du musst lediglich dein Code-Repository (z. B. GitHub oder GitLab) mit der Plattform verbinden oder den Code direkt hochladen.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image4.png)

---

# Bereitstellungsplattformen im Vergleich

| Plattform | Merkmale | Anwendungsbereich | Kostenloseinheit |
|-----------|----------|-------------------|------------------|
| **Tencent Cloud CloudBase** | Schneller Zugriff in China, tiefe WeChat-Integration | Projekte hauptsaechlich fuer chinesische Nutzer | Vorhanden |
| **Vercel** | Gute Frontend-Framework-Unterstuetzung, enge GitHub-Integration | Moderne Frontend-Projekte (React/Vue/Next.js) | Vorhanden |
| **Netlify** | Umfassende Funktionen, Formularverarbeitung und Authentifizierung | Statische Websites mit erweiterten Funktionen | Vorhanden |
| **Zeabur** | Mehrere Sprachen und Service-Vorlagen, flexible Konfiguration | Komplexe Projekte mit mehreren Diensten (Dify, n8n) | ca. 5 USD/Monat kostenlos |

---

# 1. Tencent Cloud CloudBase

Tencent Cloud CloudBase ist ein einheitlicher Cloud-Backend-Service von Tencent Cloud, besonders geeignet fuer Entwickler in China.

- **Schneller Zugriff in China**: Server stehen in China, geringe Latenz
- **WeChat-Integration**: Einfache Anbindung an WeChat-Mini-Programme und offizielle Konten
- **All-in-One-Loesung**: Statisches Website-Hosting, Cloud-Funktionen, Datenbank, Speicher
- **Grosszuegige kostenloseinheit**: Ausreichend kostenlose Ressourcen fuer Einzelentwickler

## CloudBase verwenden

### Schritt 1: Registrieren und anmelden

Besuche die [Tencent Cloud CloudBase-Konsole](https://console.cloud.tencent.com/tcb) und melde dich mit WeChat oder QQ an.

### Schritt 2: Umgebung erstellen

Klicke auf "Neue Umgebung" und waehle einen Umgebungsnamen (z. B. `my-web-app`).

### Schritt 3: Statisches Website-Hosting aktivieren

Finde in der Umgebungsverwaltung die Funktion "Statisches Website-Hosting" und aktiviere sie.

### Schritt 4: Code bereitstellen

CloudBase bietet drei Bereitstellungsmethoden:

- **Lokales Projekt hochladen**: Direkt statische Dateien hochladen
- **Vorlagenbereitstellung**: Voreingestellte Vorlagen wie React/Vue nutzen
- **Git-Repository-Bereitstellung**: Automatischer Abruf und Bereitstellung von GitHub

### Schritt 5: Eigene Domain konfigurieren (optional)

In den Einstellungen fuer statisches Website-Hosting kannst du eine eigene Domain binden und ein kostenloses HTTPS-Zertifikat beantragen.

---

# 2. Vercel

Vercel ist eine der weltweit beliebtesten Frontend-Bereitstellungsplattformen.

- **Tiefe GitHub-Integration**: Code-Push loest automatisch Bereitstellung aus
- **Automatische Vorschau**: Jeder Pull-Request erhaelt einen eigenen Vorschaulink
- **Globales CDN**: Automatische weltweite Verteilung
- **Serverless-Funktionen**: Backend-APIs direkt im Projekt

> Hinweis: Vercel kann in einigen Netzwerkumgebungen instabil sein.

## Vercel verwenden

### Schritt 1: Konto registrieren

Besuche [Vercel](https://vercel.com) und melde dich mit deinem GitHub-Konto an.

### Schritt 2: Projekt importieren

1. Klicke auf "Add New Project"
2. Waehle das gewuenschte GitHub-Repository

### Schritt 3: Build-Einstellungen konfigurieren

| Framework | Build-Befehl | Ausgabeverzeichnis |
|-----------|-------------|-------------------|
| React | `npm run build` | `build` |
| Vue | `npm run build` | `dist` |
| Next.js | `next build` | - |
| Reines HTML | - | Projektverzeichnis |

### Schritt 4: Bereitstellen

Klicke auf "Deploy" und warte bis der Build abgeschlossen ist. Du erhaeltst eine `xxx.vercel.app`-Domain.

### Schritt 5: Eigene Domain (optional)

In den Projekteinstellungen unter "Domains" kannst du deine eigene Domain hinzufuegen.

---

# 3. Netlify

Netlify ist eine weitere beliebte Frontend-Bereitstellungsplattform mit umfassenden Funktionen.

- **Umfassende Funktionen**: Formularverarbeitung, Authentifizierung, Edge-Funktionen
- **Tiefe Git-Integration**: GitHub, GitLab, Bitbucket
- **Zweig-Vorschau**: Jeder Zweig erhaelt automatisch einen Vorschaulink
- **Globales CDN**: Automatische weltweite Verteilung
- **Formularverarbeitung**: Formulareingaben ohne Backend-Code

## Netlify verwenden

### Schritt 1: Konto registrieren

Besuche [Netlify](https://www.netlify.com) und klicke auf "Sign up".

### Schritt 2: Projekt importieren

1. Klicke auf "Add new site" > "Import an existing project"
2. Waehle dein Code-Hosting-Plattform
3. Autorisiere Netlify fuer den Zugriff auf dein Repository

### Schritt 3: Build-Einstellungen konfigurieren

| Framework | Build-Befehl | Veroeffentlichungsverzeichnis |
|-----------|-------------|------------------------------|
| React | `npm run build` | `build` |
| Vue | `npm run build` | `dist` |
| Angular | `ng build` | `dist/<Projektname>` |
| Next.js | `next build` | `out` |
| Reines HTML | - | `.` |

### Schritt 4: Bereitstellen

Klicke auf "Deploy site". Nach Abschluss erhaeltst du eine `xxx.netlify.app`-Domain.

### Schritt 5: Eigene Domain (optional)

1. Gehe zu Site-Einstellungen > "Domain management"
2. Klicke auf "Add custom domain"
3. Konfiguriere DNS-Eintraege

### Besondere Funktionen

#### Formularverarbeitung

```html
<form name="contact" netlify>
  <p>
    <label>Name: <input type="text" name="name" /></label>
  </p>
  <p>
    <label>E-Mail: <input type="email" name="email" /></label>
  </p>
  <p>
    <label>Nachricht: <textarea name="message"></textarea></label>
  </p>
  <p>
    <button type="submit">Senden</button>
  </p>
</form>
```

#### Netlify Functions

```javascript
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from Netlify!" })
  };
};
```

#### Lokale Entwicklung

```bash
# Netlify CLI installieren
npm install -g netlify-cli

# Anmelden
netlify login

# Lokalen Entwicklungsserver starten
netlify dev
```

---

# 4. Zeabur

Zeabur ist eine aufstrebende Bereitstellungsplattform, besonders geeignet fuer komplexe Projekte mit mehreren Diensten.

- **Reichhaltige Service-Vorlagen**: Dify, n8n, Datenbanken und mehr
- **Mehrere Bereitstellungsmethoden**: GitHub, Vorlagen, Docker, lokale Projekte
- **Flexible Service-Kombinationen**: Mehrere verbundene Dienste in einem Projekt
- **Nutzungsabhaengige Abrechnung**: Bezahlung nur fuer tatsaechliche Nutzung

## Dify mit Zeabur bereitstellen

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image5.png)

Oeffne die [Zeabur-Konsole](https://zeabur.com/projects) und klicke auf "New Project".

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image8.png)

Die Erstellungsmethoden umfassen:

1. **GitHub**: Verbindung zu deinem GitHub-Konto
2. **Vorlage (Template)**: Basierend auf Vorlagen bereitstellen
3. **Datenbanken**: Datenbank-Services bereitstellen
4. **Funktionen (Functions)**: JavaScript- oder Python-Code bereitstellen
5. **Lokales Projekt**: Ordner hochladen
6. **Docker-Image**: Bereitgestelltes Docker-Image deployen

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image9.png)

Waehle **Vorlage** und suche nach "dify". Waehle eine Version aus.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image15.png)

Gib einen Namen ein, um eine temporaere Domain zu generieren.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image16.png)

Warte, bis alle Dienste gestartet sind. Klicke auf den Nginx-Service, um die Zugriffsadresse zu erhalten.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image17.png)

Nach kurzer Wartezeit siehst du die Dify-Anmeldeseite.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image18.png)

## Schlangenspiel mit Zeabur und Trae bereitstellen

### HTML-Framework verwenden

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image23.png)

Lass Trae ein HTML-basiertes Schlangenspiel generieren und lade den Ordner ueber Zeaburs lokale Bereitstellung hoch.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image27.png)

Klicke auf "Network" > "Generate Domain", um eine oeffentliche Adresse zu erstellen.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image28.png)

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image29.png)

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image30.png)

### React-Framework verwenden

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image31.png)

React-Anwendungen erfordern eine Anpassung des Standard-Ports, da Zeabur nur Anwendungen auf Port 8080 unterstuetzt.

Aendere den Standard-Port von 3000 auf 8080, z. B. indem du Trae anweist: "Bitte aendere den Standard-Port dieses React-Projekts auf 8080."

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image33.png)

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image34.png)

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image35.png)

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image36.png)

---

# Projekte stoppen und loeschen (Zeabur)

Da aktivierte Serverressourcen Kosten verursachen, solltest du ungenutzte Dienste immer rechtzeitig stoppen.

Klicke auf "Settings" im Projekt, scrolle nach unten:

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image21.png)

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image22.png)

- **Suspend All Services**: Alle Dienste pausieren
- **Restart All Services**: Alle Dienste neu starten
- **Delete Project**: Projekt vollstaendig loeschen

---

# Zusammenfassung

In diesem Tutorial haben wir vier haeufig genutzte Web-Bereitstellungsplattformen vorgestellt:

1. **Tencent Cloud CloudBase**: Fuer chinesische Nutzer, schnelle Zugriffsgeschwindigkeit
2. **Vercel**: Fuer moderne Frontend-Framework-Projekte, enge GitHub-Integration
3. **Netlify**: Umfassende Funktionen, Formularverarbeitung und Authentifizierung
4. **Zeabur**: Fuer komplexe Projekte mit mehreren Diensten

Der Kernprozess ist bei allen Plattformen aehnlich: Code vorbereiten > Plattform waehlen > Build-Einstellungen konfigurieren > Bereitstellen. Mit diesen Faehigkeiten kannst du deine entwickelten Anwendungen mit der ganzen Welt teilen!
