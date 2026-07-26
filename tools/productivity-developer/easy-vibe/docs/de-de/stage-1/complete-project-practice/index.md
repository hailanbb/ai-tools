---
title: 'Vollst&auml;ndiges Projektpraktikum - Vom Demo zum produktionsreifen Prototyp'
description: 'Verlassen Sie die Demo-Phase und lernen Sie, die Produktkette zu vervollst&auml;ndigen, realistische Simulationsdaten zu erstellen, durch Feedback schnell zu iterieren und schlie&szlig;lich einen pr&auml;sentierbaren, interaktiven vollst&auml;ndigen AI-Produktprototyp fertigzustellen.'
---

<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const duration = 'Etwa <strong>3 Tage</strong>'
const relatedArticles =
  relatedArticlesMap['de-de/stage-1/complete-project-practice'] ?? []
</script>

# Anf&auml;nger V: Vollst&auml;ndiges Projektpraktikum

## Kapitel&uuml;bersicht

<ChapterIntroduction :duration="duration" :tags="['Produktdenken', 'Simulationsdaten', 'Interaktionsvervollst&auml;ndigung', 'LocalStorage']" coreOutput="1 vollst&auml;ndiger AI-Produktprototyp" expectedOutput="Eine Web-Anwendung mit vollst&auml;ndiger Kette und realen Daten">

Im letzten Kapitel haben wir AI-F&auml;higkeiten integriert und das Demo l&auml;uft. Aber es ist von einem echten "Produkt" noch <strong>weit entfernt</strong>: Sobald die Seite aktualisiert wird, <strong>sind die Daten weg</strong>, bei Fehlern gibt es eine <strong>wei&szlig;e Seite</strong>, die Liste zeigt nur "Testdaten 1, Testdaten 2", und wenn der Nutzer falsch klickt, <strong>kann er es nicht r&uuml;ckg&auml;ngig machen</strong>...

In diesem Kapitel werden wir <strong>alle diese L&uuml;cken f&uuml;llen</strong>: Wir werden die <strong>vollst&auml;ndige Kette des Produkts erg&auml;nzen</strong>, mit AI <strong>realistische Gesch&auml;ftsdaten</strong> generieren, anstelle von Platzhalterdaten, <strong>Fehlerbehandlung und Nutzer-Feedback</strong> hinzuf&uuml;gen und schlie&szlig;lich einen <strong>vollst&auml;ndigen Prototyp polieren, den man vorf&uuml;hren kann</strong>.

Dies ist das <strong>letzte Kapitel der Anf&auml;ngerphase</strong>. Wenn Sie diesen Schritt abgeschlossen haben, haben Sie die Verwandlung von "kann &uuml;berhaupt nicht programmieren" zu "<strong>kann unabh&auml;ngig AI-Produktprototypen erstellen</strong>" vollzogen.

</ChapterIntroduction>

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Kette vervollst&auml;ndigen', description: 'Von Einzelfunktion zum vollst&auml;ndigen Kreislauf' },
      { title: 'Seele einhauchen', description: 'Echte Gesch&auml;ftsdaten simulieren' },
      { title: 'Feedback-Iteration', description: 'Basierend auf echtem Feedback verbessern' },
      { title: 'Abschlussprojekt', description: 'Ihre Abschlussarbeit' }
    ]" />
  </ClientOnly>
</div>

## 1. "Happy Path" ablehnen: Die Kernkette vervollst&auml;ndigen

Viele Einsteiger erstellen Prototypen oft nur f&uuml;r den "Happy Path" (den Idealfall): Nutzer klickt &rarr; API antwortet erfolgreich &rarr; Ergebnis wird angezeigt.
In der realen Welt l&auml;uft aber oft nicht alles so glatt. Damit Ihr Prototyp wie ein echtes Produkt aussieht, m&uuml;ssen Sie folgende "unsichtbare" Aspekte ber&uuml;cksichtigen.

### 1.1 "Warten" und "Feedback" hinzuf&uuml;gen

Wenn der Nutzer auf "Copywriting generieren" klickt, ben&ouml;tigt AI oft mehrere Sekunden, um zu antworten. Wenn die Oberfl&auml;che nicht reagiert, denkt der Nutzer, das Programm sei kaputt.
**Lassen Sie die AI IDE einen Loading-Status hinzuf&uuml;gen:**

> Prompt-Beispiel:
> "Wenn ich auf den Generieren-Button klicke, &auml;ndere den Button in 'Generiere...' und deaktiviere ihn. Zeige gleichzeitig im rechten Bereich eine Lade-Animation. Erst wenn die API ein Ergebnis zur&uuml;ckgibt, kehre zum Normalzustand zur&uuml;ck."

### 1.2 "Fehler" und "Ausnahmen" behandeln

API Keys k&ouml;nnen ablaufen, Netzwerke k&ouml;nnen unterbrochen werden.
**Lassen Sie die AI IDE Fehler behandeln:**

> Prompt-Beispiel:
> "Wenn die API-Anfrage feh schl&auml;gt, zeige nicht einfach einen Fehler in der Konsole, sondern zeige oben auf der Seite eine rote Benachrichtigung (Toast), die dem Nutzer sagt: 'Generierung fehlgeschlagen, bitte sp&auml;ter erneut versuchen', und erlaube dem Nutzer, erneut auf Generieren zu klicken."

### 1.3 Chat-Verlauf persistieren

Bei der Interaktion mit AI m&uuml;ssen wir den Konversationsinhalt speichern, damit Nutzer den Verlauf &uuml;berpr&uuml;fen und fr&uuml;here Gespr&auml;che fortsetzen k&ouml;nnen. Aktuell f&uuml;hren wir noch keine Datenbank ein; Sie k&ouml;nnen eine der folgenden leichtgewichtigen L&ouml;sungen w&auml;hlen:

**Speicherl&ouml;sung-Auswahl:**

| L&ouml;sung | Anwendungsbereich | Eigenschaften |
| --- | --- | --- |
| **LocalStorage** | Reines Frontend-Projekt, Nutzerdaten im Browser gespeichert | Einfache Implementierung, geht bei Aktualisierung nicht verloren, keine ger&auml;te&uuml;bergreifende Synchronisierung |
| **JSON-Datei** | Lokaler Prototyp, Daten als Datei gespeichert | Klare Struktur, leicht zu debuggen, manuell bearbeitbar |
| **TXT-Datei** | Einfachste L&ouml;sung, schnelle Textaufzeichnung | Freies Format, gute Kompatibilit&auml;t |

**Beispiel f&uuml;r Konversationsinhalt:**
Der gespeicherte Chat-Verlauf enth&auml;lt normalerweise folgende Inhalte:

```json
[
  {
    "role": "user",
    "content": "Hilf mir, einen Douyin-Verkaufstext f&uuml;r Bluetooth-Kopfh&ouml;rer zu generieren",
    "timestamp": "2026-01-20 10:30:00"
  },
  {
    "role": "assistant",
    "content": "[Bluetooth-Kopfh&ouml;rer Empfehlungstext]\n\nTsch&uuml;ss Verz&ouml;gerung, immersives H&ouml;rerlebnis\n\nHey! Diese Bluetooth-Kopfh&ouml;rer sind wirklich unglaublich\n\n40dB aktive Ger&auml;uschunterdr&uuml;ckung, sofort in die Musikwelt eintauchen\n30 Stunden Akkulaufzeit, eine Woche Pendeln ohne Aufladen\nKristallklare Anrufe wie von Angesicht zu Angesicht\nHalb-In-Ear-Design, langes Tragen ohne Schmerzen\n\nZeitlich begrenztes Angebot, klicken Sie auf den Link unten!",
    "timestamp": "2026-01-20 10:30:05"
  }
]
```

**Implementierungs-Prompt:**

> "Bitte implementiere eine Chat-Verlauf-Speicherfunktion. Unterst&uuml;tze das Speichern von Nutzer- und AI-Konversationsaufzeichnungen als JSON-Datei (oder verwende LocalStorage). Lade beim &Ouml;ffnen der Seite automatisch den Verlauf und unterst&uuml;tze das Anzeigen und L&ouml;schen einzelner Konversationsaufzeichnungen."

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="1" :items="[
      { title: 'Kette vervollst&auml;ndigen', description: 'Von Einzelfunktion zum vollst&auml;ndigen Kreislauf' },
      { title: 'Seele einhauchen', description: 'Echte Gesch&auml;ftsdaten simulieren' },
      { title: 'Feedback-Iteration', description: 'Basierend auf echtem Feedback verbessern' },
      { title: 'Abschlussprojekt', description: 'Ihre Abschlussarbeit' }
    ]" />
  </ClientOnly>
</div>

## 2. Seele einhauchen: Echte Daten simulieren (Mock Data)

Eine leere Seite kann niemanden &uuml;berzeugen. Stellen Sie sich vor, Sie pr&auml;sentieren einen "E-Commerce-Material-Workspace", aber der Verlauf ist v&ouml;llig leer oder zeigt nur eine Zeile "test / test / test".
F&uuml;r die bestm&ouml;gliche Demo-Wirkung m&uuml;ssen wir "realistische Daten f&auml;lschen", damit Ihr Prototyp wie ein echtes Produkt aussieht, das seit einem halben Jahr in Betrieb ist.

### 2.1 AI beim Entwerfen der Datenstruktur helfen lassen

Wir m&uuml;ssen nicht selbst &uuml;berlegen, wie jedes Feld hei&szlig;en soll (z.B. `name` oder `title`). Das k&ouml;nnen wir komplett AI &uuml;berlassen.

Sie m&uuml;ssen AI nur Ihr **Gesch&auml;ftsszenario** mitteilen:

> **Prompt-Beispiel:**
> "Ich arbeite an einem Prototyp f&uuml;r einen **Douyin E-Commerce Material-Workspace**.
> Bitte entwerfe eine JSON-Datenstruktur, die eine 'Produktaufgabe' beschreibt.
> Diese Aufgabe sollte enthalten: Produktbasisinformationen (Name, Kategorie), Eingabematerialien (Bild-Links) sowie AI-generierte Ergebnisse (Titel, Copywriting, Poster-Bild).
> Bitte gib mir direkt ein JSON-Beispiel."

AI wird basierend auf Ihrer Beschreibung automatisch Felder wie `productName`, `generatedContent` usw. vorschlagen.

### 2.2 AI "realistische" Daten in Batch produzieren lassen

Nachdem die Datenstruktur steht, ist der n&auml;chste Schritt, AI beim "Ausf&uuml;llen" zu helfen und einen Satz realistisch aussehender Daten zu generieren.

**Prompt-Techniken:**
Sie k&ouml;nnen AI nicht einfach sagen "Generiere Daten f&uuml;r mich". Sie m&uuml;ssen es wie einem Praktikanten eine Aufgabe stellen und ihm **Gesch&auml;ftskontext** und **Inhaltsanforderungen** mitteilen:

- **Gesch&auml;ftskontext**: Erkl&auml;ren Sie AI, dass wir im "Douyin E-Commerce" t&auml;tig sind, also sollten Produkttitel aufmerksamkeitsstark sein (z.B. "Figur-schmeichelndes Wunder", "Studierenden-Must-have") und das Copywriting umgangssprachlich sein.
- **Bildanforderungen**: Damit der Prototyp gut aussieht, sollten die Bilder keine schwarz-wei&szlig;en Platzhalter sein, sondern am besten zuf&auml;llige bunte Landschafts- oder Produktfotos.

> **Prompt-Beispiel:**
> "Bitte generiere basierend auf der soeben erstellten Struktur 10 realistische Simulationsdaten.
> (Hinweis: Nicht zwingend im JSON-Format. Wenn Sie Frontend schreiben, k&ouml;nnen Sie direkt JavaScript-Arrays generieren; bei Python Listen.)
>
> **Gesch&auml;ftsszenario-Anforderungen**:
>
> 1. Angenommen, dies ist ein Kaufhaus, das Produkte in den Kategorien 'Damenmode', 'Elektronik' und 'Kosmetik' umfasst.
> 2. **Generierte Titel und Copywriting sollten sehr 'Douyin-Stil' sein**: Titel sollten Emojis enthalten, Copywriting im umgangssprachlichen 'Unglaublich!'-Stil verfasst sein.
> 3. **Bildfeld**: Bitte einheitlich das Format `https://picsum.photos/seed/{random_id}/300/400` verwenden, um sicherzustellen, dass jedes Bild anders ist."

**Generiertes Mock-Data-Beispiel:**

```javascript
export const mockProductTasks = [
  {
    id: 'task_001',
    name: 'Sommerkleid im franz&ouml;sischen Vintage-Blumenstil',
    status: 'completed',
    input: {
      category: 'Damenmode',
      features: ['Taillenbetonung', 'Figurschmeichelnd', 'Elegant'],
      originalImage: 'https://picsum.photos/seed/dress_input/300/400'
    },
    output: {
      generatedTitle: 'Wer es tr&auml;gt sieht toll aus! Dieses franz&ouml;sische Blumenkleid ist wirklich unglaublich',
      generatedCopy:
        'M&auml;dels! Dieses Kleid ist wirklich figurschmeichelnd! Die taillenbetonende Design ist genial, sofort hat man eine Taille. Der Stoff ist sehr atmungsaktiv, im Sommer tr&auml;gt man es gar nicht schw&uuml;l. Perfekt f&uuml;r Dates und Shopping! ',
      generatedPosterImage: 'https://picsum.photos/seed/dress_output/300/400'
    },
    createdAt: '2026-01-20T10:00:00Z'
  },
  {
    id: 'task_002',
    name: 'Super Noise-Cancelling Bluetooth Kopfh&ouml;rer Pro',
    status: 'completed',
    input: {
      category: 'Elektronik',
      features: ['Noise-Cancelling', 'Ultra-Lange Akkulaufzeit', 'Niedrige Latenz'],
      originalImage: 'https://picsum.photos/seed/tech_input/300/400'
    },
    output: {
      generatedTitle: ' Endlich gefunden! Die Noise-Cancelling dieser Kopfh&ouml;rer ist unglaublich stark!',
      generatedCopy:
        'Aufsetzen und die Welt wird sofort leise. Unglaubliche Klangqualit&auml;t, Musik h&ouml;ren wie live. Die Akkulaufzeit ist auch beeindruckend, einmal aufladen reicht f&uuml;r eine Woche! Ein Must-have f&uuml;r Studierende!',
      generatedPosterImage: 'https://picsum.photos/seed/tech_output/300/400'
    },
    createdAt: '2026-01-21T14:30:00Z'
  }
  // ... weitere Daten
]
```

### 2.3 (Fortgeschritten) Mit LocalStorage "Pseudo-CRUD" implementieren

Wenn Sie m&ouml;chten, dass die generierten "Simulationsdaten" nicht nur angezeigt, sondern auch gel&ouml;scht, ge&auml;ndert und sogar nach dem Aktualisieren der Seite noch vorhanden sind, k&ouml;nnen Sie `LocalStorage` verwenden.

> **Prompt-Beispiel:**
> "Bitte implementiere eine Datenspeicherfunktion.
>
> 1. Priorit&auml;t: Zun&auml;chst Daten aus `localStorage` lesen.
> 2. Wenn `localStorage` leer ist, mit den generierten Mock-Daten initialisieren und in `localStorage` speichern.
> 3. Schreibe zus&auml;tzlich `addProductTask` und `deleteProductTask` Funktionen, die bei jeder Operation `localStorage` synchron aktualisieren."

Durch diesen Schritt erh&auml;lt Ihr Prototyp "Ged&auml;chtnis" und die Nutzererfahrung ist nahezu identisch mit einem echten Produkt.

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="2" :items="[
      { title: 'Kette vervollst&auml;ndigen', description: 'Von Einzelfunktion zum vollst&auml;ndigen Kreislauf' },
      { title: 'Seele einhauchen', description: 'Echte Gesch&auml;ftsdaten simulieren' },
      { title: 'Feedback-Iteration', description: 'Basierend auf echtem Feedback verbessern' },
      { title: 'Abschlussprojekt', description: 'Ihre Abschlussarbeit' }
    ]" />
  </ClientOnly>
</div>

## 3. Feedback sammeln und schnell iterieren

Man kann kein gutes Produkt hinter verschlossenen T&uuml;ren entwickeln. Jetzt hat Ihr Prototyp "Kernfunktionen" + "vollst&auml;ndige Kette" + "Demo-Daten" und es ist Zeit, ihn anderen zu zeigen.

### 3.1 Wen zum Testen einladen? Wie testen?

- **Freunde/Kollegen finden**: Sie m&uuml;ssen nicht technikversiert sein, sie m&uuml;ssen es nur einmal ausprobieren.
- **Beobachten statt leiten**: Nicht "Klick hier" sagen, sondern sehen, wohin sie klicken w&uuml;rden. Wenn sie den Button nicht finden, liegt ein Designproblem vor.
- **"Wizard of Oz"-Methode**: Wenn Ihre AI noch nicht angeschlossen ist, k&ouml;nnen Sie manuell im Hintergrund (oder in der Datenbank) Daten &auml;ndern, um die AI-R&uuml;ckgabe zu simulieren und zun&auml;chst zu validieren, ob Nutzer diese Funktion ben&ouml;tigen.

### 3.2 Mit Bugs und Kritik umgehen

- **Layout-Probleme**: Auf verschiedenen Bildschirmgr&ouml;&szlig;en kann es chaotisch aussehen.
  - **Aktion**: Screenshot an AI IDE senden &rarr; "Bei dieser Bildschirmbreite ist es verschoben, bitte reparieren."
- **Ungeschickte Bedienung**: "Dieser Prozess ist zu umst&auml;ndlich".
  - **Aktion**: Den Vorschlag an AI IDE weitergeben &rarr; "Nutzer finden Hochladen und dann Generieren zu langsam, kann man es zu einem Klick zusammenfassen?"
- **Neue Anforderungen**: "Wenn es diese Funktion g&auml;be, w&auml;re es toll."
  - **Aktion**: Pr&uuml;fen, ob es zum Kern geh&ouml;rt; wenn ja, AI eine vereinfachte Version schnell implementieren lassen.

**Merken: In dieser Phase ist AI Ihr bester Modifikationsassistent. Sie sind nur f&uuml;r die Problemerkennung verantwortlich, die Code-&Auml;nderung &uuml;bernimmt AI.**

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="3" :items="[
      { title: 'Kette vervollst&auml;ndigen', description: 'Von Einzelfunktion zum vollst&auml;ndigen Kreislauf' },
      { title: 'Seele einhauchen', description: 'Echte Gesch&auml;ftsdaten simulieren' },
      { title: 'Feedback-Iteration', description: 'Basierend auf echtem Feedback verbessern' },
      { title: 'Abschlussprojekt', description: 'Ihre Abschlussarbeit' }
    ]" />
  </ClientOnly>
</div>

## 4. Abschlussprojekt: Vervollst&auml;ndigen Sie Ihre "Abschlussarbeit"

Herzlichen Gl&uuml;ckwunsch! Sie haben den gesamten Prozess von "Anforderungen" &uuml;ber "Prototyp" bis "AI-Integration" durchlaufen. Jetzt ist es Zeit, Ihr finales Ergebnis zu pr&auml;sentieren.

**Dieses Abschlussprojekt ist nicht mehr auf den "E-Commerce Material-Workspace" beschr&auml;nkt.** Sie m&uuml;ssen basierend auf Ihren Interessen oder Branchenhintergrund einen einzigartigen AI-Produktprototyp entwickeln.

### Themenauswahl und Anforderungen

Sie m&uuml;ssen das Szenario w&auml;hlen, das Ihnen am ehesten entspricht, aus der **[Mehrbranchen-Szenarioreferenz](../appendix-industry-scenarios/index.md)**, oder ein v&ouml;llig neues Szenario basierend auf Ihren eigenen Ideen entwerfen.

**Das Projekt muss alle Inhalte aus den vorherigen Lektionen integriert nutzen:**

1. **Prototyp-Erstellung**: Frontend-Technologie verwenden, um eine &auml;sthetische, benutzerfreundliche Oberfl&auml;che zu erstellen.
2. **Anforderungskontrolle**: Nicht alles auf einmal, aber die Kernfunktionslogik muss geschlossen sein.
3. **API-Integration**: Echte AI-Modelle (LLM/VLM etc.) integrieren, um der Anwendung echte Intelligenz zu verleihen.
4. **Eine spielbare Anwendung erstellen**: Nicht nur statische Seiten, sondern eine dynamische Anwendung mit Datenfluss und Interaktions-Feedback.

### Projekt-Outputs

Am Ende m&uuml;ssen Sie Folgendes einreichen:

1. **Eine vollst&auml;ndige Prototyp-Anwendung**: Online bereitgestellt oder lokal ausf&uuml;hrbar, mit vollst&auml;ndiger Nutzungskette.
2. **Ein 30-Sekunden-Demo-Video**: Ein Video aufnehmen, das kurz Ihr Anwendungsszenario vorstellt und die Kernfunktionen in Aktion zeigt.

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px;">
  <template #header>
    <div style="font-weight: bold; font-size: 16px;">Abschlussherausforderung-Checkliste</div>
  </template>

  <p>
    Dies ist die letzte Herausforderung von Stage 1. Bitte &uuml;berpr&uuml;fen Sie Ihr Werk anhand der folgenden Checkliste:
  </p>

  <div style="font-weight: bold; margin-bottom: 10px;">Kernfunktionen-Selbstpr&uuml;fung</div>
  <ul style="list-style-type: none; padding-left: 0;">
    <li><label><input type="checkbox" disabled /> <strong>Klares Szenario</strong>: Ein konkretes Branchen- oder Anwendungsszenario ausgew&auml;hlt</label></li>
    <li><label><input type="checkbox" disabled /> <strong>Geschlossene Logik</strong>: Kernprozess funktioniert, nicht nur der Happy Path</label></li>
    <li><label><input type="checkbox" disabled /> <strong>AI-getrieben</strong>: Echte LLM-API aufgerufen, keine vordefinierten Antworten</label></li>
    <li><label><input type="checkbox" disabled /> <strong>Vollst&auml;ndige Erfahrung</strong>: Loading, Fehlerbehandlung und Simulationsdaten enthalten</label></li>
  </ul>

  <div style="font-weight: bold; margin: 20px 0 10px;">Liefergegenst&auml;nde</div>
  <ul style="list-style-type: none; padding-left: 0;">
    <li><label><input type="checkbox" disabled /> <strong>Prototyp-Anwendung</strong>: Code ist fertiggestellt und ausf&uuml;hrbar</label></li>
    <li><label><input type="checkbox" disabled /> <strong>Demo-Video</strong>: Etwa 30 Sekunden, zeigt klar die Kern-Highlights</label></li>
  </ul>
</el-card>

## N&auml;chste Schritte

Nach Abschluss des Abschlussprojekts verf&uuml;gen Sie &uuml;ber die F&auml;higkeit, "unabh&auml;ngig AI-Anwendungsprototypen zu entwickeln".
In Stage 2 werden wir uns mit komplexerer Full-Stack-Entwicklung befassen und lernen, wie man diesen Prototypen in eine echte, online-f&auml;hige, datenbankgest&uuml;tzte Anwendung mit Benutzersystem verwandelt.

Wir sehen uns im n&auml;chsten Stage!

<RelatedArticlesSection
  title="Weiter fortgeschritten"
  description="Herzlichen Gl&uuml;ckwunsch zum Abschluss von Stage 1. Diese Kapitel helfen Ihnen, in die professionelle Entwicklung &uuml;berzugehen."
  :items="relatedArticles"
/>
