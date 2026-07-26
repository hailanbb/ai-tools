# Deine Oberflaeche mit einer modernen Komponentenbibliothek aktualisieren

In den vorherigen Lektionen hast du gelernt, wie man mit Designtools Interfaces entwirft, mit AI IDE Designentwuerfe in Code umwandelt und sogar ein vollstaendiges Frontend-Projekt abgeschlossen. Aber du hast vielleicht auch ein Problem entdeckt: Die von Grund auf selbst geschriebenen Buttons, Formulare und Dialoge funktionieren zwar, wirken aber im Vergleich zu "professionellen Produkten" immer ein wenig unbefriedigend -- die Stile sind nicht einheitlich genug, die Interaktionsdetails sind nicht geschmeidig genug, und die Anpassung an verschiedene Bildschirme ist muehsam.

Genau das ist das Problem, das **Komponentenbibliotheken** loesen.

Eine Komponentenbibliothek ist eine vorgefertigte Sammlung von UI-Bauteilen. Buttons, Eingabefelder, Dropdowns, Dialoge, Tabellen... diese Interface-Elemente, die du in jedem Produkt immer wieder brauchst, sind bereits fertig und wurden von zahllosen Nutzern validiert und optimiert. Du musst sie nur wie Bausteine zusammenfuegen, um schnell professionelle Interfaces zu erstellen.

## Was du lernen wirst

1. Verstehen, was eine Frontend-Komponentenbibliothek ist und warum moderne Entwicklung sie fast immer einsetzt
2. Vier repraesentative Komponentenbibliotheken kennenlernen und ihre jeweiligen Staerken verstehen
3. Durch drei praktische Szenarien (Landing-Page, Produktseite, Backend-Verwaltung) lernen, wie man mit AI IDE + Komponentenbibliothek Vibe Coding betreibt
4. Lernen, Komponentenbibliothek-Dokumentation zu lesen, die richtigen Komponenten fuer die Anforderungen zu finden und korrekt zu verwenden

## 1. Warum braucht man Komponentenbibliotheken?

Stell dir vor, du renovierst ein Haus. Du kannst selbst aus Holz einen Stuhl bauen, aber ueblicherweise gehst du zu IKEA und kaufst einen -- gutes Design, stabile Qualitaet, klare Aufbauanleitung, nach Hause bringen und zusammensetzen.

Eine Komponentenbibliothek ist das "IKEA" der Frontend-Entwicklung. Sie bietet keine Moebel, sondern Interface-Bauteile:

| Selbst geschrieben | Komponentenbibliothek verwenden |
| :--- | :--- |
| Stil, Interaktion und Animation selbst behandeln | Out-of-the-box, Stil und Interaktion sind bereits optimiert |
| Buttons auf verschiedenen Seiten koennen unterschiedlich aussehen | Global einheitlicher Stil, automatische Konsistenz |
| Anpassung an Handy und Tablet erfordert zusaetzliche Arbeit | Die meisten Komponentenbibliotheken haben integrierte Responsive-Unterstuetzung |
| Barrierefreiheit (Accessibility) wird leicht uebersehen | Professionelle Komponentenbibliotheken haben Tastaturnavigation und Screenreader bereits integriert |
| Langsame Entwicklung | Schnelle Entwicklung, Fokus auf Geschaeftslogik |

Kurz gesagt: **Komponentenbibliotheken lassen dich die Zeit fuer das "Was" aufwenden, nicht fuer das "Wie".**

### Sehen ist Glauben: Dieselbe Anforderung, mit und ohne Komponentenbibliothek

Nur Reden reicht nicht. Wir haben in Trae mit nahezu identischen Anforderungen jeweils ohne und mit Komponentenbibliothek generiert und die Ergebnisse verglichen.

**Prompt 1: Ohne Komponentenbibliothek**

```text
Bitte erstelle eine Daten-Dashboard-Seite fuer einen AI-Schreibassistenten mit:
- Obere Titelzeile und Export-Button
- Vier Statistik-Karten fuer Nutzerzahl, aktive Nutzer, Dokumentanzahl und Umsatz, mit Trendanzeige
- Ein Liniendiagramm und ein Kreisdiagramm
- Nutzerlisten-Tabelle mit Seitennummerierung
- Linke Navigations-Seitenleiste
```

In Trae direkt ausgefuehrt:

<!-- TODO: Ersetzen durch Screenshot des in Trae ohne Komponentenbibliothek generierten Dashboards -->
<!-- ![Trae-generiertes Dashboard (ohne Komponentenbibliothek)](images/compare-without-lib.png) -->

**Prompt 2: Mit shadcn/ui-Komponentenbibliothek**

```text
Bitte erstelle eine Daten-Dashboard-Seite fuer einen AI-Schreibassistenten mit der shadcn/ui-Komponentenbibliothek:
- Obere Titelzeile und Export-Button
- Vier Statistik-Karten fuer Nutzerzahl, aktive Nutzer, Dokumentanzahl und Umsatz, mit Trendanzeige
- Ein Liniendiagramm und ein Kreisdiagramm
- Nutzerlisten-Tabelle mit Seitennummerierung
- Linke Navigations-Seitenleiste
```

Ebenfalls in Trae direkt ausgefuehrt:

<!-- TODO: Ersetzen durch Screenshot des in Trae mit shadcn/ui generierten Dashboards -->
<!-- ![Trae-generiertes Dashboard (mit shadcn/ui)](images/compare-with-lib.png) -->

Dieselbe Anforderung, der einzige Unterschied ist, dass im Prompt `shadcn/ui + Tailwind CSS` hinzugefuegt wurde. Das von Trae generierte Ergebnis liegt in visueller Konsistenz, Interaktionsdetails und Gesamtqualitaet auf einer voellig anderen Ebene. Das ist das "kostenlose Upgrade" durch die Komponentenbibliothek -- du musst im Prompt nur den Namen einer Bibliothek hinzufuegen.

## 2. Vier Kern-Komponentenbibliotheken kennenlernen

Es gibt zahlreiche Komponentenbibliotheken (eine vollstaendige Liste im [Anhang](#anhang-weitere-komponentenbibliotheken-im-ueberblick)), aber du musst zunaechst nur diese vier repraesentativsten kennen:

| Komponentenbibliothek | Framework | Kurzbeschreibung | Website |
| :--- | :--- | :--- | :--- |
| [Ant Design](https://ant.design) | React | Von Ant Group, de facto Standard fuer Enterprise-Backends, extrem breite Komponentenabdeckung | ant.design |
| [shadcn/ui](https://ui.shadcn.com) | React | Kein npm-Package, Code wird direkt in dein Projekt kopiert, basiert auf Tailwind CSS, hoechste Anpassungsfreiheit | ui.shadcn.com |
| [HeroUI](https://heroui.com) (ehemals NextUI) | React | Standardmaessig schoene Styles, fluessige Animationen, ideal fuer Landing-Pages und Produktpraesentationen mit hohen visuellen Anforderungen | heroui.com |
| [Material UI](https://mui.com) | React | Die aelteste React-Komponentenbibliothek, implementiert die Google Material Design-Richtlinien, reifstes Oekosystem | mui.com |

> Vue-Nutzer haben ebenfalls eine reiche Auswahl: [Element Plus](https://element-plus.org) (am populaersten in China), [Ant Design Vue](https://antdv.com), [Naive UI](https://www.naiveui.com) etc., siehe [Anhang](#anhang-weitere-komponentenbibliotheken-im-ueberblick).

Verschiedene Komponentenbibliotheken haben ihre Staerken in verschiedenen Szenarien. Wir fuehren dich als Naechstes durch drei reale Entwicklungsszenarien, um zu zeigen, wie man mit AI IDE + Komponentenbibliothek Vibe Coding betreibt.

Um verschiedene Bibliotheken und ihre Besonderheiten zu demonstrieren, haben wir in jedem Szenario bewusst eine andere Bibliothek gewaehlt. Bitte beachte: **Das dient nur dazu, dir mehrere Loesungen zu zeigen**. In der tatsaechlichen Entwicklung kannst du problemlos nur die Bibliothek verwenden, die dir am besten liegt. Wenn dir beispielsweise der Stil von shadcn/ui gefaellt, kannst du damit Landing-Pages, Produktseiten und Backend-Verwaltung erstellen. Waehle die, die dir schoen erscheint und mit der du dich wohlfuehlst -- das ist das Wichtigste.

## 3. Praktische Uebung 1: Produkt-Landing-Page mit HeroUI erstellen

**Szenario**: Du hast ein AI-Schreibassistenten-Produkt und brauchst eine schoene Landing-Page, um die Produkteigenschaften zu praesentieren und Nutzer zur Registrierung zu animieren. Die Landing-Page muss eine starke visuelle Wirkung haben, fluessige Animationen bieten und auch auf dem Handy gut aussehen.

**Warum HeroUI**: Die Standard-Stiles von HeroUI sind bereits sehr schoen, mit fluessigen Uebergangsanimationen, ideal fuer nutzerorientierte Praesentations-Seiten.

### 3.1 Projekt erstellen

```bash
# Projekt mit dem offiziellen HeroUI-CLI erstellen
npx create-heroui-app@latest ai-writer-landing
cd ai-writer-landing
npm install
```

<!-- TODO: Ersetzen durch Screenshot der HeroUI-Website oder Komponenten-Darstellung -->
<!-- ![HeroUI Komponentenbibliothek-Website](images/heroui-homepage.png) -->

### 3.2 Landing-Page mit AI IDE generieren

AI IDE (Cursor, Trae etc.) oeffnen und im Dialog eingeben:

```text
Bitte erstelle eine Landing-Page fuer einen AI-Schreibassistenten mit der HeroUI-Komponentenbibliothek:

**Seitenstruktur:**
1. Obere Navigation: Links Logo und Produktname, rechts die Links "Funktionen", "Preise", "Ueber uns" sowie ein "Loslegen"-Button
2. Hero-Bereich: Grosse Ueberschrift "Lass AI dein Schreib-Partner werden", Unteruebersicht mit Produktwert, zwei Buttons "Kostenlos testen" und "Demo ansehen", darunter ein Produkt-Screenshot
3. Funktionspraesentation: Drei Spalten-Karten fuer "Intelligentes Weiterschreiben", "Stil-Anpassung" und "Mehrsprachige Uebersetzung", jede Karte mit Icon, Titel und Beschreibung
4. Preisbereich: Drei Preiskarten (Gratis-Version, Pro-Version, Team-Version), Pro-Version hervorgehoben
5. Unterer Call-to-Action: Ein attraktiver Slogan mit Registrierungs-Button
6. Footer: Copyright-Info und Social-Media-Links

**Design-Anforderungen:**
- Modern und professionell wirken
- Dark Mode unterstuetzen
- Auch auf dem Handy gut aussehen
```

<!-- TODO: Ersetzen durch Screenshot des AI IDE-generierten HeroUI-Landing-Page-Prozesses oder -Ergebnisses -->
<!-- ![AI-generierte HeroUI Landing-Page](images/heroui-landing-result.png) -->

### 3.3 Vom AI verwendete Schluesselkomponenten

Im von AI generierten Code wirst du diese HeroUI-Komponenten sehen:

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

Rolle jeder Komponente:

| Komponente | Zweck | Position in der Landing-Page |
| :--- | :--- | :--- |
| `Navbar` | Obere Navigationsleiste | Ganz oben auf der Seite, fixiert |
| `Button` | Button, unterstuetzt mehrere Varianten und Farben | CTA-Buttons, Navigations-Buttons |
| `Card` | Karten-Container | Funktionspraesentation, Preiskarten |
| `Chip` | Kleines Tag | "Empfohlen", "Am beliebtesten" Markierung |
| `Divider` | Trennlinie | Visuelle Trennung zwischen Bereichen |

### 3.4 Iterative Optimierung

Der erste generierte Code ist moeglicherweise noch nicht vollstaendig zufriedenstellend. Weiterhin mit AI im Dialog bleiben und anpassen:

```text
Bitte optimiere die Landing-Page:

1. Ueberschrift mit Gradient-Farbe von Blau nach Violett
2. Funktionskarten sollen beim Hover eine Schwebe-Animation haben
3. Die Pro-Preiskarte hervorheben, mit Rahmen und "Am beliebtesten"-Tag
4. Navigation auf dem Handy in ein Hamburger-Menue umwandeln
```

<!-- TODO: Ersetzen durch Screenshot der iterativ optimierten Landing-Page -->
<!-- ![Iterativ optimierte Landing-Page](images/heroui-landing-iterated.png) -->

> **Kern des Vibe Coding**: Du musst nicht jedes Komponenten-API auswendig kennen. Beschreibe einfach in natuerlicher Sprache den gewuenschten Effekt, und AI findet die passende Komponente und Schreibweise. Bei Unzufriedenheit einfach weiter im Dialog iterieren.

## 4. Praktische Uebung 2: Produktseite mit shadcn/ui erstellen

**Szenario**: Dein AI-Schreibassistent braucht ein Haupt-Interface nach der Benutzeranmeldung -- links die Dokumentenliste, rechts der Editor, oben eine Werkzeugleiste. Dies ist eine funktionale Produktseite, die ein hochgradig anpassbares UI erfordert.

**Warum shadcn/ui**: shadcn/ui kopiert den Komponenten-Code direkt in dein Projekt, sodass du jedes Detail frei aendern kannst. Fuer tief anpassbare Produkt-Interfaces ist dieses "Code gehoert dir"-Modell am flexibelsten.

<!-- TODO: Ersetzen durch Screenshot der shadcn/ui-Website oder Komponenten-Darstellung -->
<!-- ![shadcn/ui Komponentenbibliothek-Website](images/shadcn-homepage.png) -->

### 4.1 Projekt erstellen

```bash
# Next.js-Projekt erstellen
npx create-next-app@latest ai-writer-app --typescript --tailwind --app
cd ai-writer-app

# shadcn/ui initialisieren
npx shadcn@latest init

# Komponenten nach Bedarf hinzufuegen (nicht alle auf einmal installieren)
npx shadcn@latest add button card input sidebar sheet dialog
```

Das Besondere an shadcn/ui: Jedes Mal, wenn du eine Komponente `add`-ierst, wird der Quellcode in das `components/ui/`-Verzeichnis deines Projekts kopiert. Du kannst diese Dateien direkt oeffnen und Stil und Verhalten aendern.

### 4.2 Produkt-Interface mit AI IDE generieren

```text
Bitte erstelle das Haupt-Interface eines AI-Schreibassistenten mit der shadcn/ui-Komponentenbibliothek:

**Gesamtlayout:**
- Links eine einklappbare Seitenleiste, Breite ca. 280px:
  - Oben ein "Neues Dokument"-Button
  - Darunter die Dokumentenliste, jedes Dokument zeigt Titel und letzte Bearbeitungszeit
  - Rechtsklick auf ein Dokument zum Umbenennen oder Loeschen
- Rechts der Haupt-Editor-Bereich, in zwei Teile geteilt:
  - Oben die Werkzeugleiste: Dokumenttitel bearbeiten, Wortstatistik anzeigen, "AI-Weiterschreiben"-Button, "Export"-Dropdown
  - Unten der Editor-Bereich: Ein grosses Texteingabefeld, das den restlichen Platz ausfuellt

**Interaktionsdetails:**
- Nach Klick auf "AI-Weiterschreiben" zeigt der Button einen Ladezustand, am Ende des Editors erscheint der von AI generierte Text (wie eine Schreibmaschine, Zeichen fuer Zeichen)
- Auf dem Handy wird die Seitenleiste zu einer Drawer-Ansicht, die von links einschieht
- Das aktuell ausgewaehlte Dokument wird hervorgehoben
```

<!-- TODO: Ersetzen durch Screenshot des AI-generierten shadcn/ui-Produkt-Interfaces -->
<!-- ![AI-generiertes shadcn/ui-Produkt-Seiten-Ergebnis](images/shadcn-product-result.png) -->

### 4.3 Vom AI verwendete Schluesselkomponenten

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

| Komponente | Zweck | Position auf der Produktseite |
| :--- | :--- | :--- |
| `Sidebar` | Einklappbare Seitenleiste | Links Dokumentenliste |
| `Sheet` | Mobil-Drawer | Alternative zur Seitenleiste auf Mobilgeraeten |
| `DropdownMenu` | Dropdown-Menue | "Export"-Button, Rechtsklick-Menue |
| `Dialog` | Dialogfeld | Umbenennen, Loesch-Bestaetigung |
| `Button` | Button, unterstuetzt variant und loading | Verschiedene Aktions-Buttons |
| `Input` | Eingabefeld | Dokumenttitel-Bearbeitung |

### 4.4 Komponentenstiele anpassen

Der Vorteil von shadcn/ui liegt darin, dass du den Komponenten-Quellcode direkt aendern kannst. Wenn du beispielsweise groessere Abrundungen fuer Buttons moechtest:

```text
Bitte aendere components/ui/button.tsx,
setze die Standard-Abrundung aller Buttons von rounded-md auf rounded-xl
und fuege der primary-Variante einen subtilen Schatten-Effekt hinzu
```

AI aendert die Komponentendatei direkt in deinem Projekt, anstatt die Styles eines npm-Packages zu ueberschreiben -- das ist der Vorteil von shadcn/ui "Code gehoert dir".

<!-- TODO: Ersetzen durch Screenshot des shadcn/ui-Komponenten-Quellcodes im Projekt, der direkt bearbeitbar ist -->
<!-- ![shadcn/ui Komponenten-Code direkt im Projekt bearbeitbar](images/shadcn-code-ownership.png) -->

## 5. Praktische Uebung 3: Backend-Verwaltungsinterface mit Ant Design erstellen

**Szenario**: Dein AI-Schreibassistent ist online und du brauchst ein Verwaltungs-Backend, um Nutzerdaten einzusehen, Dokumenteninhalte zu verwalten und bezahlte Bestellungen zu bearbeiten. Der Kern eines Backend-Verwaltungssystems sind Datenanzeige und Operationseffizienz.

**Warum Ant Design**: Ant Design hat die tiefste Erfahrung im Backend-Bereich. Tabellen, Formulare, Diagramme und andere Geschaeftskomponenten sind sofort einsatzbereit, mit vielen integrierten Enterprise-Interaktionsmustern (Stapelverarbeitung, erweiterte Filter, Datenexport etc.).

<!-- TODO: Ersetzen durch Screenshot der Ant Design-Website oder Pro Components-Darstellung -->
<!-- ![Ant Design Komponentenbibliothek-Website](images/antd-homepage.png) -->

### 5.1 Projekt erstellen

```bash
# Mit Ant Design Pro Scaffold verwenden (integriertes Layout, Routing, Berechtigungen)
npx create-umi@latest ai-writer-admin
# Ant Design Pro Template waehlen
cd ai-writer-admin
npm install
```

Oder von Grund auf:

```bash
npx create-react-app ai-writer-admin --template typescript
cd ai-writer-admin
npm install antd @ant-design/icons @ant-design/pro-components
```

### 5.2 Backend-Verwaltung mit AI IDE generieren

```text
Bitte erstelle ein Backend-Verwaltungssystem fuer einen AI-Schreibassistenten mit der Ant Design-Komponentenbibliothek:

**Gesamtlayout:**
- Links die Menueleiste: Dashboard, Nutzerverwaltung, Dokumentenverwaltung, Bestellverwaltung, Systemeinstellungen
- Oben Breadcrumb-Navigation anzeigen

**Nutzerverwaltungsseite:**
- Oben vier Statistik-Karten: Gesamtnutzerzahl, heute neu, aktive Nutzer, zahlende Nutzer
- Suchfilter-Bereich: Suche nach Nutzername, Auswahl des Registrierungszeitraums, Filterung des Nutzerstatus, mit "Suchen"- und "Zuruecksetzen"-Buttons
- Nutzer-Tabelle:
  - Anzeige von Avatar, Nutzername, E-Mail, Registrierungsdatum, Abonnement-Plan (farblich unterschieden), Status, Aktionen
  - 20 Eintraege pro Seite mit Seitennummerierung
  - Mehrfachauswahl von Nutzern, Stapel-Deaktivierung oder Export
  - Aktionsspalte: Details anzeigen, bearbeiten, deaktivieren (mit Bestaetigung vor Deaktivierung)
- Nach Klick auf "Details anzeigen" oeffnet sich rechts ein Drawer mit Nutzerdetails und letzter Dokumentenliste
```

<!-- TODO: Ersetzen durch Screenshot des AI-generierten Ant Design-Backend-Verwaltungsinterfaces -->
<!-- ![AI-generiertes Ant Design-Backend-Verwaltungsinterface](images/antd-admin-result.png) -->

### 5.3 Vom AI verwendete Schluesselkomponenten

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

| Komponente | Zweck | Position im Backend |
| :--- | :--- | :--- |
| `ProLayout` | Gesamt-Backend-Layout-Frame | Seitenskelett (Menue + Inhaltsbereich) |
| `ProTable` | Erweiterte Tabelle mit integrierter Suche, Seitennummerierung und Spalteneinstellungen | Nutzerliste, Dokumentenliste, Bestellliste |
| `StatisticCard` | Daten-Statistik-Karten | Dashboard, Uebersicht oben auf der Seite |
| `Tag` / `Badge` | Status-Tags | Abonnement-Plan, Nutzerstatus |
| `Drawer` | Seiten-Drawer | Nutzerdetails, Bearbeitungsformular |
| `Popconfirm` | Popup-Bestaetigungsbox | Loeschen, Deaktivieren und andere gefaehrliche Operationen |

### 5.4 Weiter iterieren: Dashboard hinzufuegen

```text
Bitte erstelle eine Dashboard-Seite:

1. Oben vier Statistik-Karten: Gesamtnutzerzahl, Gesamtdokumentanzahl, heutige API-Aufrufe, monatlicher Umsatz, jeweils mit Wert und monatlicher Veraenderung (gestiegen oder gefallen)
2. Mitte zwei Diagramme:
   - Links: Liniendiagramm des Nutzerwachstums der letzten 7 Tage
   - Rechts: Kreisdiagramm der Abonnement-Plan-Verteilung
3. Unten: Tabelle der letzten Operations-Logs mit Zeit, Nutzer, Aktionstyp und Details

Verwende Ant Design-Komponenten fuer das Layout, Diagramme koennen mit Ant Design Charts erstellt werden
```

<!-- TODO: Ersetzen durch Screenshot der Dashboard-Seite -->
<!-- ![Ant Design Dashboard-Seiten-Ergebnis](images/antd-dashboard-result.png) -->

> **Vibe Coding Tipp fuer Backend-Verwaltung**: Backend-Seiten haben eine relativ feste Struktur (Tabelle + Suche + Dialog), was sich hervorragend fuer die batchweise Generierung durch AI eignet. Du kannst zunaechst eine "Nutzerverwaltung"-Seite als Vorlage von AI generieren lassen und dann sagen: "Orientiere dich an der Struktur der Nutzerverwaltungsseite und generiere eine Dokumentenverwaltungsseite." AI wird dasselbe Layout-Muster wiederverwenden.

## 6. Dokumentation lesen lernen: Die "Bedienungsanleitung" der Komponentenbibliothek

Im Vibe Coding schreibt AI den Grossteil des Codes. Wenn jedoch das generierte Ergebnis nicht stimmt oder du das Verhalten einer Komponente feinanpassen moechtest, ist **Dokumentation lesen** der schnellste Loesungsweg.

Am Beispiel von Ant Design: Die Dokumentations-Adresse lautet `https://ant.design/components/overview-cn`

Standardablauf zum Lesen der Dokumentation:

1. **Anforderung klarstellen**: Zum Beispiel "Ich brauche eine Tabelle mit Zeilenauswahl"
2. **In der Dokumentation suchen**: Nach "Table" suchen, um zur Tabellen-Komponenten-Seite zu gelangen
3. **Beispiele ansehen**: Jede Komponente hat mehrere Online-Beispiele in der Dokumentation; das "Auswaehlbar"-Beispiel finden
4. **Code kopieren**: Den Beispielcode in dein Projekt kopieren
5. **API-Tabelle ansehen**: Unten auf der Seite die vollstaendigen Konfigurationsoptionen fuer die `rowSelection`-Eigenschaft finden

> Du kannst auch den Dokumentations-Link direkt an die AI IDE senden: "Bitte beziehe dich auf die rowSelection-API unter https://ant.design/components/table-cn und fuege der Nutzertabelle eine Mehrfachauswahl-Funktion hinzu." Wenn AI ein Dokumentations-Link zur Verfuegung steht, ist der generierte Code genauer.

Schnellreferenz der Dokumentations-Adressen der Komponentenbibliotheken:

| Komponentenbibliothek | Dokumentations-Adresse |
| :--- | :--- |
| Ant Design | `https://ant.design/components/overview-cn` |
| shadcn/ui | `https://ui.shadcn.com/docs/components` |
| HeroUI | `https://heroui.com/docs/components` |
| Material UI | `https://mui.com/material-ui/all-components/` |
| Element Plus | `https://element-plus.org/zh-CN/component/overview.html` |

## 7. Zusammenfassung

Die drei praktischen Szenarien decken die haeufigsten Frontend-Entwicklungsanforderungen ab:

| Szenario | Empfohlene Komponentenbibliothek | Kernmerkmal |
| :--- | :--- | :--- |
| Landing-Page / Praesentations-Seite | HeroUI | Standardmaessig schoene Stiles, fluessige Animationen, starke visuelle Wirkung |
| Produkt-Funktionsseite | shadcn/ui | Code vollstaendig kontrollierbar, hochgradig anpassbar |
| Backend-Verwaltungssystem | Ant Design | Reichhaltige Geschaeftskomponenten, Tabellen und Formulare sofort einsatzbereit |

Zusammenfassung des Vibe Coding-Workflows:

1. Basierend auf dem Szenario die passende Komponentenbibliothek auswaehlen
2. Mit AI IDE die gewuenschte Seitenstruktur und Interaktionen beschreiben
3. AI generiert den ersten Code-Entwurf, du schaust dir das Ergebnis an
4. Mit natuerlicher Sprache weiter iterieren und anpassen
5. Bei Detailproblemen die Komponentenbibliothek-Dokumentation konsultieren

### Uebung

Waehle eines der folgenden Szenarien und schliesse es von Grund auf mit AI IDE + Komponentenbibliothek ab:

1. Verwende HeroUI, um eine Praesentations-Landing-Page fuer ein deiner frueheren Projekte (z. B. Hogwarts-Portraets) zu erstellen
2. Verwende shadcn/ui, um das Haupt-Interface einer Notiz-App zu erstellen (Seitenleiste + Editor)
3. Verwende Ant Design, um ein einfaches Content-Management-Backend zu erstellen (Artikelliste + Formular zum Erstellen neuer Artikel)

---

## Anhang: Weitere Komponentenbibliotheken im Ueberblick

Zusaetzlich zu den vier Kern-Bibliotheken im Haupttext gibt es im Frontend-Oekosystem eine grosse Anzahl hervorragender Komponentenbibliotheken. Die folgende Liste ist nach Frameworks kategorisiert, um die Auswahl basierend auf Projektanforderungen zu erleichtern.

### Vue-Oekosystem

| Komponentenbibliothek | Stars | Kurzbeschreibung | Anwendungsbereich |
| :--- | :--- | :--- | :--- |
| [Element Plus](https://element-plus.org) | ~27k | Enterprise-Komponentenbibliothek fuer Vue 3 vom Ele.me-Team, am weitesten verbreitet in China | Backend-Verwaltungssysteme |
| [Vuetify](https://vuetifyjs.com) | ~41k | Die populaerste Vue Material Design-Komponentenbibliothek, 80+ Komponenten, vollstaendige Dokumentation | Google Design-Stil-Projekte |
| [Ant Design Vue](https://antdv.com) | ~21k | Vue 3-Komponentenbibliothek basierend auf dem Ant Design-System | Enterprise-Backends |
| [Naive UI](https://www.naiveui.com) | ~18k | In TypeScript geschrieben, extrem anpassbare Themen, unabhaengig von CSS-Präprozessoren | Projekte mit speziellen Design-Anforderungen |
| [Quasar](https://quasar.dev) | ~27k | Ein Codebasis fuer SPA, SSR, PWA, Mobile und Desktop | Cross-Platform-Projekte |
| [Vant](https://vant-ui.github.io/vant) | ~24k | Leichtgewichtige Mobile-Komponentenbibliothek vom Youzan-Team | Mobile H5-Seiten |
| [PrimeVue](https://primevue.org) | ~14k | 90+ Komponenten, unterstuetzt verschiedene Themen (Material, Bootstrap etc.) | Viele Komponenten und mehrere Themen erforderlich |
| [Arco Design Vue](https://arco.design/vue) | ~3k | Von ByteDance, hohe Komponentenqualitaet, integriertes Dark Mode | Backend-Produkte |
| [TDesign Vue Next](https://tdesign.tencent.com/vue-next) | ~2k | Von Tencent, einheitliche Designsprache | Tencent-Oekosystem oder Enterprise-Projekte |

### React-Oekosystem

| Komponentenbibliothek | Stars | Kurzbeschreibung | Anwendungsbereich |
| :--- | :--- | :--- | :--- |
| [Material UI (MUI)](https://mui.com) | ~95k | Aelteste Implementierung der Google Material Design-Richtlinien, umfassendste Komponenten, reifstes Oekosystem | Schneller Aufbau von Enterprise-Anwendungen |
| [Ant Design](https://ant.design) | ~94k | Von Ant Group, viele hochwertige integrierte Geschaeftskomponenten, dominante Position in der chinesischsprachigen Entwickler-Community | Enterprise-Backends |
| [shadcn/ui](https://ui.shadcn.com) | ~83k | Code wird in das Projekt kopiert statt als npm installiert, basiert auf Radix UI + Tailwind CSS, vollstaendig kontrollierbar | Projekte mit hohem Anpassungsbedarf |
| [Chakra UI](https://chakra-ui.com) | ~39k | Mit Fokus auf Entwicklererfahrung, praegnant API, integrierte Barrierefreiheit | Schnelle Prototyp-Entwicklung |
| [Mantine](https://mantine.dev) | ~28k | 100+ Komponenten und 50+ Hooks, inklusive DatePicker, Rich-Text-Editor und weitere fortgeschrittene Komponenten | All-in-One-Loesung |
| [Headless UI](https://headlessui.com) | ~27k | Offizielle ungestylte Komponentenbibliothek von Tailwind Labs, unterstuetzt sowohl React als auch Vue | In Kombination mit Tailwind CSS |
| [HeroUI](https://heroui.com) | ~24k | Basierend auf Tailwind CSS + React Aria, standardmaessig schoene Stiles, fluessige Animationen | Projekte mit hohen visuellen Anforderungen |
| [Radix UI](https://www.radix-ui.com) | ~17k | Ungestylte Low-Level-Komponenten-Primitivbibliothek mit Fokus auf Barrierefreiheit und Komponentenverhalten, Basis von shadcn/ui | Aufbau eigener Designsysteme |

#### shadcn/ui-Erweiterungs-Oekosystem

Zusaetzlich zu den oben genannten allgemeinen Komponentenbibliotheken ist im shadcn/ui-Oekosystem eine grosse Zahl von Erweiterungsbibliotheken entstanden, die auf derselben Philosophie basieren und differenzierte Loesungen fuer spezifische Szenarien bieten. Diese Erweiterungsbibliotheken verwenden ebenfalls den "Code ins Projekt kopieren"-Ansatz und geben Entwicklern die volle Quellcode-Kontrolle.

| Komponentenbibliothek | Kurzbeschreibung | Anwendungsbereich |
| :--- | :--- | :--- |
| [Aceternity UI](https://ui.aceternity.com) | 200+ produktionsreife Komponenten, Spezialitaet: leuchtende Karten, Text-Gradienten, 3D-Globus und andere besondere visuelle Komponenten | Hochwertige Landing-Pages, SaaS-Produkte |
| [Tailark UI](https://tailark.com) | Sammlung von Marketing-Website-Komponenten-Bloecken, Produktpraesentation, Kunden-Testimonials, CTA-Buttons und weitere haeufige Marketing-Module | Marketing-Landing-Pages, Produkt-Websites |
| [UI Tripled](https://ui.tripled.work) | Dynamische Interaktionskomponenten basierend auf Framer Motion, Popups, Navigation, Karten-Animationen | Kreativ-Tools, persoenliche Portfolios |
| [Neobrutalism UI](https://neobrutalism.dev) | Neobrutalismus-Stil, dicke Linien, hoher Kontrast, kraeftige Farben | Individualisierte Marken-Websites, Kreativ-Projekte |
| [REUI](https://reui.io) | 967+ Komponenten-Kombinationsmuster fuer echte Geschaeftsszenarien | Enterprise-Backends, komplexe Formulare |
| [Cult UI](https://cult-ui.com) | Feinere Interaktions-/Visuelle-Details, Datentabellen, Filter-Panels und andere zusammengesetzte Komponenten | Hochwertige kommerzielle Projekte |
| [Kibo UI](https://kibo-ui.com) | Fortgeschrittene Geschaeftskomponenten, Farbwahl, Rich-Text-Editor, Datei-Upload | Verwaltungs-Backends, Werkzeug-Produkte |
| [Kokonut UI](https://kokonutui.com) | 100+ Komponenten + 7+ vollstaendige Templates, frischer minimalistischer Stil | SaaS-Websites, Blogs, E-Commerce |
| [Commerce UI](https://ui.stackzero.co) | Speziell fuer E-Commerce-Szenarien, Produktkarten, Warenkorb, Checkout-Formulare | E-Commerce-Plattformen |
| [shadcnblocks](https://shadcnblocks.com) | 1373 UI-Bloecke + 13 vollstaendige Templates, umfassendste Ressource | Alle Szenarien |
| [Shoogle](https://shoogle.dev) | shadcn/ui-Oekosystem-Aggregations- und Suchplattform | Schnelles Auffinden von Ressourcen |
| [Discover All Shadcn](https://allshadcn.com) | Aggregierte Ressourcen-Navigation | Schnelles Auffinden von Ressourcen |

> **Warum shadcn/ui-Erweiterungen waehlen?** Diese Erweiterungen uebernehmen die Philosophie von shadcn/ui "Code-Eigentum" und bieten gleichzeitig tiefgehende Spezialisierung fuer bestimmte Szenarien. In der Vibe-Coding-Aera ermoeglichen sie es, schnell Komponenten zu finden, die den Designanforderungen entsprechen, die Homogenitaet der Mainstream-UI-Bibliotheken zu ueberwinden und differenziertere Produkte zu erstellen.
