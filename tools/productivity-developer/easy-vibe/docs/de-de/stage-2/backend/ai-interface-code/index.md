# Grossmodell-gestuetzte Entwicklung von Backend-Schnittstellencode und -dokumentation

In den vorherigen Lektionen haben wir gelernt, wie man Tools wie Figma fuer UI-Designentwuerfe verwendet, wie man mit AI schnell statische Frontend-Seiten generiert und wie man Supabase nutzt, um Datenbanken aufzubauen und eine erste Benutzerauthentifizierung zu realisieren. Jetzt stellt sich naturgemaess die Frage: Wie gelangen die Daten nach dem Klick auf diese dynamischen Buttons unbemerkt in Supabase? Wenn wir komplexere Geschaeftslogik ausfuehren muessen (wie gleichzeitige Zahlungen, zeitgesteuerte Push-Benachrichtigungen oder sensible Datenverarbeitung), ist es sicher, die Datenbank direkt vom Frontend aus zu verbinden?

Das fuehrt uns zu einem entscheidenden Element der modernen Webentwicklungsarchitektur: der **Backend-API-Schnittstelle**.

Anstatt in der Vergangenheit hunderte Zeilen Backend-Routen, Controller und Parameter-Validierungslogik manuell zu tippen, koennen wir heute die leistungsstarke Code-Generierungsfaehigkeit von Grossmodellen nutzen und das muehsame Grundgeruest von AI schreiben lassen. In dieser Lektion werden wir den Teufelskreis "AI schreibt nur vage und oberflaechlich" verlassen und dir anhand echter Geschaeftsszenarien zeigen, wie du durch hochwertige Prompts das Grossmodell dazu bringst, robuste, branchenkonforme Node.js-Backend-Schnittstellen zu schreiben und automatisch API-Dokumentation sowie Testfaelle zu generieren.

> :bulb: **Vorkenntnisse**
>
> Bevor du mit diesem Abschnitt beginnst, wird empfohlen, folgende Inhalte zu kennen:
> - [Von der Datenbank zu Supabase](../database-supabase/) - Datenbank- und Datenmodellkonzepte verstehen.
> - [Git und GitHub verwenden lernen](../git-workflow/) - Vertrautheit mit Versionskontrolle in der Projektentwicklung.
> - [Was ist ein Terminal / eine Kommandozeile](/de-de/appendix/2-development-tools/command-line-shell) - Projektinitialisierung und -start erfordern grundlegende Kommandozeilen-Operationen.

# Was du lernen wirst

1. **Was ist eine API-Schnittstelle**: Die Bruecke der Frontend-Backend-Kommunikation und RESTful-Designrichtlinien verstehen.
2. **Grossmodell-gestuetzte Serviceerstellung**: Wie man durch strukturierte Prompts AI beim Aufbau eines Node.js + Express-Basisprojekts unterstuetzt.
3. **Schnittstellenlogik-Entwicklung**: Das Grossmodell zur Generierung von CRUD-Schnittstellen (Erstellen, Lesen, Aktualisieren, Loeschen) mit strenger Geschaeftsvalidierung und Supabase-Datenbankanbindung leiten.
4. **Automatisierte API-Dokumentation**: Das Grossmodell basierend auf Code rückwaerts OpenAPI/Swagger-Dokumentation generieren lassen, die branchenueblich fuer die teamuebergreifende Zusammenarbeit ist.
5. **Test- und Integrations-Loop**: Grossmodelle nutzen, um Postman-Testkollektionen und Jest-Einheitentests zu generieren, die die Codequalitaet absichern.

---

# 1. Warum brauchen wir API-Schnittstellen?

Im traditionellen Verstaendnis ist das Frontend "das, was man sieht", und die Datenbank ist "das Lager, in dem Dinge gespeichert werden". Aber dazwischen fehlt ein Dispatcher. Wenn du dir die gesamte Anwendung als ein Restaurant vorstellst:
- **Frontend (Client)** ist die Speisekarte und der Bestelltisch des Restaurants, wo Gaeste Gerichte durchsuchen und Bestellungen aufgeben.
- **Datenbank (Supabase etc.)** ist die Kueche des Restaurants, in der alle Zutaten und Buecher gelagert werden.
- **Backend-API-Schnittstelle** ist der Kellner des Restaurants. Gaeste koennen nicht direkt in die Kueche stuermen, um Zutaten zu holen (das waere nicht nur chaotisch, sondern wuerde auch Sicherheitsprobleme verursachen). Stattdessen muessen sie ihre "Bestellanliegen" (HTTP Request) dem Kellner mitteilen. Der Kellner ueberprueft diese (Parametervalidierung, Berechtigungsauthentifizierung), holt dann die entsprechenden Inhalte aus der Kueche und bringt die "fertigen Gerichte" (HTTP Response, normalerweise im JSON-Format) zurueck zum Gast.

Durch API-Schnittstellen erreichen wir eine klare **Trennung von Frontend und Backend**: Das Frontend kuemmert sich nur um das Rendering der Seiten, waehrend das Backend sich auf Geschaeftslogik, Datenverarbeitung und Sicherheitsmassnahmen konzentriert.

---

# 2. Projektarchitektur-Design und Initialisierung

Eine klar strukturierte Projektbasis ist die Voraussetzung dafuer, dass das Grossmodell guten Code schreiben kann. Bevor wir AI Code schreiben lassen, muessen wir selbst eine Vorstellung von der Projektstruktur haben.

## 2.1 Haeufige API-Projektstruktur

Selbst wenn wir ein Grossmodell zur Code-Generierung verwenden, duerfen wir niemals den gesamten Code in eine einzige `server.js`-Datei stopfen. Eine wartbare Node.js-Backend-Architektur sieht typischerweise wie folgt aus:

```text
my-api-project/
├── .env                  # Sensible Umgebungsvariablen (wie API Keys, Datenbankverbindungsstring)
├── server.js             # Projekteingang (Serverstart, globale Middleware-Registrierung)
├── package.json          # Abhaengigkeitsverwaltungsdatei
├── src/
│   ├── routes/           # Routen-Layer: Definiert URL-Pfade und Anfragemethoden
│   ├── controllers/      # Controller-Layer: Verarbeitet Anfrageparameter, ruft Services auf und gibt Antworten zurueck
│   ├── services/         # Service-Layer: Kapselt Datenbankinteraktion und Kerngeschaeftslogik
│   └── middlewares/      # Middleware: Login-Authentifizierung, globale Fehlerbehandlung
└── docs/                 # Verzeichnis fuer API-Dokumentation
```

## 2.2 Projektinitialisierung mit AI

Anstatt manuell `npm init` auszufuehren und Abhaengigkeiten einzeln zu installieren, koennen wir die oben genannten Vorgaben direkt als Prompt an das Grossmodell uebergeben:

> :speaking_head: **Prompt an das Grossmodell (Beispiel):**
> "Hilf mir, ein Node.js-Backend-Projekt aufzubauen, das sich mit einer Supabase-Datenbank verbinden kann. Die Struktur soll klar sein, um die kuenftige Wartung zu erleichtern."

Nach dem Ausfuehren des von AI zurueckgegebenen Codes erhaeltst du auf `localhost:3000` eine Backend-Anwendung mit Enterprise-Reife.

---

# 3. Kernpraktikum: Grossmodell-gestuetzte Schnittstellenentwicklung

Dies ist der wichtigste Teil dieses Kapitels. Der von Grossmodellen geschriebene Code weist haeufig "logische Luecken" oder "oberflaechliche Platzhalter" auf, weil der Entwickler nicht genug Kontext bereitgestellt hat. **Grossmodelle haben keine Angst vor komplexen Anforderungen, aber sie fuerchten vage Anforderungen.**

Am Beispiel der Erstellungsschnittstelle fuer die `menu_items`-Tabelle (Menue-Tabelle), die wir im [Datenbank-Kapitel](../database-supabase/) erwaehnt haben, zeigen wir, wie man einen hochwertigen Prompt schreibt.

## 3.1 Dem Grossmodell vollstaendigen Kontext geben

Bevor du AI bittest, eine Schnittstelle zu schreiben, musst du unbedingt die **Datenbankfeld-Definition (Schema)** und die **konkreten Einschraenkungen** bereitstellen.

> :speaking_head: **Hochwertiger Prompt (Vorlage):**
> "Hilf mir, eine Schnittstelle zum Hinzufuegen eines Menueeintrags zu schreiben. Der Eintrag hat Produktname, Preis, Kategorie (Burger, Snacks, Getraenke) und ob er verfuegbar ist. Produktname und Preis sind Pflichtfelder, der Preis darf nicht negativ sein. Bei fehlerhafter Benutzereingabe soll eine Fehlermeldung angezeigt werden."

## 3.2 Den vom Grossmodell generierten Code ueberpruefen

Der vom Grossmodell generierte Code ist typischerweise wie folgt strukturiert und klar in Verantwortlichkeiten unterteilt:

```javascript
// services/menuService.js
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.createMenuItem = async (menuData) => {
    // Supabase SDK aufrufen, um Daten in die Tabelle einzufuegen
    const { data, error } = await supabase
        .from('menu_items')
        .insert([menuData])
        .select();

    if (error) throw new Error(`Datenbank-Einfuegen fehlgeschlagen: ${error.message}`);
    return data[0];
};
```

Man erkennt, dass der auf diese Weise generierte Code nicht nur eine vernuenftige Struktur aufweist, sondern auch die Initialisierung von Supabase, die Fehlerbehandlung sowie die Ausnahmebehandlung beruecksichtigt. Dies ist ein grosser Unterschied zu dem "Spaghetti-Code", den man erhalten wuerde, wenn man einfach "schreib mal eine Erstellungsschnittstelle" verlangt.

---

# 4. Haende frei: Automatische Generierung von API-Dokumentation

Fuer ein Entwicklungsteam ist eine API ohne Dokumentation ein Blindgatter. Frontend-Entwickler koennen nicht erraten, welche Parameter du erwartest, und auch nicht vorhersagen, welche Struktur zurueckgegeben wird. Die branchenueblichste API-Beschreibungsspezifikation ist **OpenAPI (frueher auch Swagger genannt)**.

Frueher war das manuelle Schreiben von Swagger-Dokumentation im YAML- oder JSON-Format aeusserst schmerzhaft und fehleranfaellig. Heute ist dies eines der Gebiete, auf denen Grossmodelle am besten sind.

Du kannst einfach den Code deiner `routes` und `controllers` auswaehlen und ihn dem Grossmodell uebergeben:

> :speaking_head: **Prompt fuer die Dokumentationsgenerierung:**
> "Hilf mir, basierend auf dem obigen Code eine API-Dokumentation zu generieren. Beschreibe genau, was jeder Parameter bedeutet und welche Daten zurueckgegeben werden, um die Zusammenarbeit mit den Frontend-Kollegen zu erleichtern."

In diesem Prozess kannst du AI sogar bitten, Feldbeschreibungen (Description) und Mock-Daten zu ergaenzen (wie `price_cents: 1200` fuer 12 Euro), was die Kommunikationskosten drastisch senkt.

---

# 5. Absicherung: Testcode und Postman-Kollektionen generieren

Code geschrieben, Dokumentation erstellt -- es fehlt nur noch der letzte Schritt: Ueberpruefen, ob der Code tatsaechlich laeuft.

## 5.1 Postman / Apifox Testkonfiguration generieren

In der Schnittstellenentwicklung verwenden wir normalerweise Tools wie Postman, um HTTP-Anfragen vom Frontend zu simulieren. Ohne Grossmodell musst du manuell die URL eingeben, Header (Anfrage-Header) einzeln hinzufuegen und den JSON-Anfrage-Body zusammenbauen.

Du musst AI nur anweisen:
> "Wandle diese API-Dokumentation in ein Format um, das Postman importieren kann. Es soll Beispiele fuer korrekte und fehlerhafte Anfragen enthalten."

Nachdem du den JSON-Text erhalten hast, speichere ihn als `menu_api.json` und ziehe ihn in Postman. Sofort hast du eine out-of-the-box-Test-Klick-Oberflaeche.

## 5.2 Automatisierte Einheitentests schreiben

Wenn du eine noch strengere technische Qualitaet anstrebst, kannst du das Grossmodell bitten, dir mit Testframeworks wie `Jest` Einheitentests (Unit Tests) zu schreiben, die die Kerngeschaeftslogik auf Grenzfalle testen (z. B. ob die Validierung auf Datenbankebene greift, wenn ein negativer Preis uebergeben wird).

---

# 6. Backend-Schnittstellen: Unbedingt bekannte Best Practices

Selbst mit AI-Unterstuetzung musst du als "Torwaechter" des gesamten Systems die folgenden Kernprinzipien kennen und ueberpruefen:

1. **RESTful-konforme Pfadbenennung**:
   - Gutes Design: `GET /api/users` (Benutzerliste abrufen), `POST /api/users` (Benutzer erstellen). URLs sollten "Ressourcen"-Substantive darstellen.
   - Schlechtes Design: `POST /api/getUser` oder `POST /api/createUser`. Verben sollten durch die HTTP-Methoden (GET/POST/PUT/DELETE) ausgedrueckt werden.
2. **Standardisierte HTTP-Statuscodes**:
   - 200/201: Anfrage erfolgreich / Ressource erfolgreich erstellt.
   - 400: Bad Request, Parameterformat des Frontends fehlerhaft, Pflichtfelder fehlen.
   - 401/403: Unauthorized / Forbidden, Benutzer nicht angemeldet oder keine Berechtigung.
   - 404: Not Found, Ressource existiert nicht.
   - 500: Server Error, Backend-Code-Fehler oder Datenbankausfall. Den Fehler-Callstack niemals direkt dem Frontend preisgeben (Sicherheitsrisiko).
3. **Niemals Benutzereingaben vertrauen**: Frontend-Eingaben koennen gefaelscht sein. Alle Kernparameter-Validierungen muessen im Backend erneut durchgefuehrt werden.

# 7. Zusammenfassung

Durch dieses Kapitel hast du eine wirkliche Perspektivenveraenderung in der Entwicklung vollzogen: Du bist nicht mehr der "Tipper", der in Syntax und Satzzeichen feststeckt, sondern aufgestiegen zum **Systemdesigner und Architektur-Kommandanten**.
Du hast Folgendes gelernt:
1. Das Kernsystemdenken von **API-Schnittstellen und Frontend-Backend-Trennung**.
2. **Wie man durch die Bereitstellung von Kontext und Schichtstruktur-Konzepten** die Qualitaet des vom Grossmodell generierten Server-Codes erheblich steigert.
3. Die muehsame **Dokumentationserstellung** und **Testfall-Konstruktion** geschickt in automatisierte Aufgaben verwandelt, die AI besonders gut beherrscht.
4. In Kombination mit dem zuvor erlernten **Supabase**-Wissen den vollstaendigen Datenfluss von der Client-Anfrage bis zur Datenbankaktualisierung durchgaengig geschlossen.

::: tip :bulb: Naechste Schritte
Wenn dein Datenfluss und dein Backend-Service bereit sind, koennen sie derzeit nur auf deinem lokalen Computer "fuer sich selbst" laufen. In den naechsten Kapiteln werden wir lernen, wie man diesen muehsam aufgebauten Service auf einem **overtentlichen Server bereitstellt (Deploy)**, sodass dein Produkt von Nutzern weltweit aufgerufen werden kann.
:::
