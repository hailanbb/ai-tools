# Oberflaechen mit LLM und Skills schoen gestalten: Prompts und Plugins in der Praxis

In den vorherigen Lektionen hast du gelernt, wie man mit AI IDE Designentwuerfe in Code umwandelt und mit Komponentenbibliotheken schnell Interfaces aufbaut. Aber du hast vielleicht auch ein peinliches Problem entdeckt: **Bei denselben Anforderungen wirken die von AI generierten Seiten immer ein bisschen unbefriedigend** -- die Schrift ist das allgegenwaertige Inter, die Farbgestaltung ein ueberall sichtbarer Lila-Gradient, das Layout eine zum Gaehnen animierende symmetrische Kartenrasterung, und die ganze Seite verstraekt einen starken "AI-Geruch".

Das ist nicht AIs Fehler, sondern du hast ihr nicht gesagt, welchen **Stil** du moechtest.

Stell dir vor, du gehst zum Friseur. Wenn du nur sagst "Schneiden Sie mir die Haare", bekommst du ein sicheres, aber mittelmasses Ergebnis. Wenn du aber sagst "Ich moechte einen laessigen japanischen Locken-Look, Pony in Acht-Form, Laenge bis zum Schluesselbein, mit deutlicher Staffelung", bekommst du genau das, was du dir vorstellst.

Bei AI ist es genauso. **Sie braucht eine klare aesthetische Richtung**, um schoene und einzigartige Interfaces zu generieren.

Diese Lektion bringt dir zwei Methoden bei, mit denen AI schoene Interfaces generiert:

1. **Sorgfaeltig gestaltete Prompt-Vorlagen** -- AI in natuerlicher Sprache sagen, welchen aesthetischen Stil du moechtest
2. **Frontend-Skills-Plugins** -- AI automatisch professionelle Designrichtlinien laden lassen

## Was du lernen wirst

1. Verstehen, warum AI standardmaessig "durchschnittliche" Interfaces generiert
2. Die 5 Dimensionen zur Beschreibung von Designstilen beherrschen (Schrift, Farbe, Layout, Animation, Details)
3. 3 Skills-Plugins kennenlernen, die Interfaces verschönern
4. Durch drei praktische Szenarien die Generierung schoener Interfaces mit Prompts + Skills ueben

## 1. Warum AI standardmaessig "durchschnittliche" Interfaces generiert

In den AI-Trainingsdaten gibt es riesige Mengen an Frontend-Code, und der Grossteil verwendet "sichere" Entscheidungen:

| Dimension | AIs Standardwahl | Problem |
| :--- | :--- | :--- |
| Schrift | Inter, Roboto, Arial | Zu verbreitet, keine Persoenlichkeit |
| Farbe | Lila-Gradient, Blau als Hauptfarbe | In der Tech-Szene uebermaessig genutzt, visuelle Ermuedung |
| Layout | Symmetrische Raster, Kartenstapelung | Hohe Vorhersagbarkeit, keine Ueberraschung |
| Animation | Einblenden/Ausblenden, einfaches Hover | Nicht raffiniert genug, fehlende Tiefe |
| Hintergrund | Einfarbig, einfache Gradienten | Monoton, fehlende Textur |

Diese Entscheidungen sind einzeln betrachtet alle nicht schlecht, aber **wenn alle AI-generierten Seiten sie verwenden, wird es zum "AI-Geruch"**.

> :bulb: **Schluesselerkenntnis**: AI kann nicht kein Design -- sie faellt **standardmaessig auf den "statistischen Durchschnitt" zurueck**. Du musst ihr explizit die Richtung vorgeben, in die sie vom Durchschnitt abweichen soll.

## 2. Methode 1: Designstil mit Prompts beschreiben

### 2.1 Die 5 Dimensionen des Designstils

Um schoene Interfaces zu generieren, musst du das gewuenschte Ergebnis aus 5 Dimensionen beschreiben:

| Dimension | Beschreibungspunkte | Beispiel-Schluesselwoerter |
| :--- | :--- | :--- |
| **Schrift** | Ueberschriften mit fetter Display-Schrift, Fliesstext mit gut lesbarer Textschrift | Space Grotesk, Playfair Display, JetBrains Mono |
| **Farbe** | Hauptfarbe + Akzentfarbe, gleichmaessige Verteilung vermeiden | #4F46E5 Hauptfarbe + #F59E0B Akzent |
| **Layout** | Asymmetrisch, ueberlappend, Raster aufbrechen | Bento Grid, asymmetrische Aufteilung, schwebende Elemente |
| **Animation** | Sorgfaeltig choreografiertes Seitenladen, Mikro-Interaktionen | staggered reveals, scroll-getriggert |
| **Details** | Hintergrund, Schatten, Rahmen, Texturen | Rauschen, geometrische Muster, Gradienten-Netz |

### 2.2 Sehen ist Glauben: Normaler Prompt vs. Verschönerter Prompt

Vergleichen wir die Ergebnisse anhand einer Landing-Page:

**Normaler Prompt:**

```
Bitte erstelle eine Landing-Page fuer einen AI-Schreibassistenten mit Navigation, Hero-Bereich, Funktionspraesentation, Preisgestaltung und Footer
```

**Verschoenerter Prompt:**

```
Bitte erstelle eine Landing-Page fuer einen AI-Schreibassistenten mit folgenden Anforderungen:

**Aesthetischer Stil: Neubrutalismus (Neubrutalism)**

**Schrift:**
- Ueberschriften: Space Grotesk, Gewichtung 700-900
- Fliesstext: IBM Plex Sans, Gewichtung 400

**Farbe:**
- Hauptfarbe: #000000 (reines Schwarz)
- Akzentfarbe: #FF6B00 (Orange)
- Hintergrund: #FFFDF0 (elfenbeinfarben)
- Rahmen: 3px schwarze durchgezogene Linie

**Layout:**
- Asymmetrisches Layout, Elemente durch dicke schwarze Linien getrennt
- Karten mit harten Schatten (box-shadow: 8px 8px 0px #000)
- Mutige Kontraste beim Weißraum

**Animation:**
- Elemente beim Seitenladen von unten einspringen
- Hover: Button bewegt sich 2px nach oben

**Details:**
- Alle Abrundungen auf 0px (rechte Winkel)
- Buttons mit starkem 3D-Effekt
- Hintergrund mit subtiler Rausch-Textur
```

Dieselbe Anforderung, aber der zweite Prompt laesst AI eine stilistisch markante, einpraegsame Seite generieren.

### 2.3 Frontend-Verschönerungs-Skills-Ressourcenbibliothek

Beginne nicht bei null mit dem Schreiben von Prompts! Hier ist eine Sammlung von AI-Skills, die direkt mit der Frontend-Verschönerung zusammenhaengen:

| Repository-Name | Inhalt | Stars | Link |
|:---|:---|:---|:---|
| **ui-ux-pro-max-skill** | 57 Stile + 95 Farbpaletten + 56 Schriften | 10k+ | [GitHub](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) |
| **antigravity-awesome-skills** | Vermeidet generische AI-Aesthetik-Klischees | - | [GitHub](https://github.com/sickn33/antigravity-awesome-skills) |
| **superdesigndev/superdesign** | AI-natives UI-Entwicklungstool | 4.7k | [GitHub](https://github.com/superdesigndev/superdesign) |
| **anthropics/skills/frontend-design** | Offizieller Anthropic Frontend-Design-Skill | - | [GitHub](https://github.com/anthropics/skills) |

> :bulb: Weitere Stil-Prompts findest du im Anhang: [Designstil-Prompt-Schnellreferenz](#style-prompts)

### 2.5 Drei haeufig verwendete Stil-Vorlagen

Hier sind drei erprobte Stil-Vorlagen, die du direkt kopieren und anpassen kannst:

#### Vorlage 1: Minimalismus

```
**Aesthetischer Stil: Minimalismus**

**Schrift:**
- Ueberschriften: PP Neue Montreal, Gewichtung 500-700
- Fliesstext: Inter, Gewichtung 400

**Farbe:**
- Hauptfarbe: #FFFFFF (Weiss)
- Text: #1A1A1A (Fast-Schwarz)
- Akzent: #3B82F6 (Blau, sparsam verwenden)

**Layout:**
- Viel Weißraum (padding mindestens 64px)
- Ein- oder zweispaltiges Layout, zentriert
- Elemente durch Weißraum statt Trennlinien gliedern

**Animation:**
- Langsames Einblenden (Dauer 600ms)
- Hover: sanfter Farbuebergang

**Details:**
- Abrundung: 8px
- Schatten: subtil (0 4px 12px rgba(0,0,0,0.08))
- Keine Hintergrund-Dekoration
```

#### Vorlage 2: Glassmorphismus

```
**Aesthetischer Stil: Glassmorphism**

**Schrift:**
- Ueberschriften: Outfit, Gewichtung 600-800
- Fliesstext: Plus Jakarta Sans, Gewichtung 400-500

**Farbe:**
- Hintergrund: Gradient #667eea bis #764ba2
- Karten-Hintergrund: rgba(255, 255, 255, 0.1)
- Text: #FFFFFF

**Layout:**
- Schwebende Karten-Gestaltung
- Karten ueberlappen sich

**Animation:**
- Karten erscheinen nacheinander beim Laden (staggered)
- Hover: Karte vergroessert sich um den Faktor 1.05

**Details:**
- Abrundung: 20px
- Hintergrund-Unschaerfe: backdrop-blur-xl
- Rahmen: 1px rgba(255, 255, 255, 0.2)
- Subtile Gradient-Leuchteffekte
```

#### Vorlage 3: Bento Grid

```
**Aesthetischer Stil: Bento Grid**

**Schrift:**
- Ueberschriften: SF Pro Display, Gewichtung 700
- Fliesstext: SF Pro Text, Gewichtung 400

**Farbe:**
- Hintergrund: #F5F5F7 (Hellgrau)
- Karten: #FFFFFF (Weiss)
- Akzent: #0071E3 (Apple-Blau)

**Layout:**
- Raster-Layout mit unterschiedlich grossen Karten
- Kartenabstand: 16px
- Abrundung: 24px

**Animation:**
- Hover: Karte schwebt leicht nach oben
- Klick: Druckeffekt

**Details:**
- Grosse Karten fuer wichtige Inhalte
- Kleine Karten fuer sekundaere Informationen
- Icons statt Text wo moeglich
- Saubere Schatten (0 4px 24px rgba(0,0,0,0.06))
```

## 3. Methode 2: Designrichtlinien automatisch mit Skills-Plugins laden

Jedes Mal manuell Stil-Prompts zu schreiben, ist muehsam. **Skills** sind wiederverwendbare Designrichtlinien-Pakete -- nach der Installation wendet AI diese Richtlinien automatisch an.

### 3.1 Drei Skills fuer schoenere Interfaces

| Skills | Merkmale | Installationsbefehl |
| :--- | :--- | :--- |
| **UI/UX Pro Max** | 67 Stile, 96 Farbpaletten, 57 Schriftkombinationen | `npm install -g uipro-cli && uipro init --ai claude` |
| **frontend-design** | Offiziell von Anthropic, vermeidet AI-Aesthetik-Klischees | `npx skills add anthropics/skills/frontend-design` |
| **SuperDesign** | IDE-Plugin, generiert mehrere Designvarianten | VSCode-Erweiterungsmarkt nach "SuperDesign" suchen |

### 3.2 UI/UX Pro Max installieren (am empfohlensten)

UI/UX Pro Max ist das derzeit umfassendste Designrichtlinien-Skill. Es enthaelt vorkonfiguriert:

- **67 UI-Stile**: Glassmorphism, Neumorphism, Brutalism, Bento Grid...
- **96 Farbpaletten**: Nach Branchen kategorisiert (SaaS, E-Commerce, Social...)
- **57 Schrift-Kombinationen**: Von professionellen Designern verifizierte Paarungen
- **100+ Designregeln**: Vorgaben fuer Abstaende, Abrundungen und Schatten

**Installationsschritte:**

```bash
# 1. CLI global installieren
npm install -g uipro-cli

# 2. Initialisieren (waehle dein AI-Tool)
uipro init --ai claude
# oder
uipro init --ai cursor
# oder
uipro init --ai trae
```

Nach der Installation musst du im Prompt nur einen Satz hinzufuegen:

```
Verwende den Glassmorphism-Stil von UI/UX Pro Max und erstelle eine Landing-Page fuer einen AI-Schreibassistenten
```

AI wendet automatisch die entsprechenden Schrift-, Farb- und Layoutvorgaben an.

### 3.3 Offizielles Anthropic frontend-design installieren

Dies ist das offizielle Frontend-Design-Skill von Anthropic, speziell zur Loesung des "AI-Aesthetik-Klischee"-Problems:

```bash
# In Claude Code ausfuehren
npx skills add anthropics/skills/frontend-design
```

Nach der Installation vermeidet AI automatisch:
- Inter, Roboto, Arial als Schriftarten
- Lila-Gradient-Hintergruende
- Symmetrische Raster-Layouts
- Zu schwache Schatten

Sie neigt stattdessen zu:
- Einzigartigen Schriftkombinationen
- Mutigen Hauptfarben + scharfen Akzentfarben
- Asymmetrischen, ueberlappenden Layouts
- Texturierten Hintergruenden (Rauschen, geometrische Muster)

## 4. Praktische Uebung 1: Landing-Page mit verschönernden Prompts neu gestalten

Lass uns das bisher Gelernte anwenden, um eine gewoehnliche Landing-Page schoen zu machen.

### 4.1 Gewoehnliche Version

Zunaechst ein normaler Prompt, um zu sehen, was AI liefert:

```
Bitte erstelle eine Landing-Page fuer eine Haustier-Adoptionsplattform mit:
- Navigation (Logo, Links, Registrierungs-Button)
- Hero-Bereich (Ueberschrift, Unterueberschrift, CTA-Button, Tier-Bild)
- Tier-Vorstellung (drei Tierkarten)
- Ueber uns
- Footer
```

Die generierte Seite... funktioniert, ist aber sehr gewoehnlich.

### 4.2 Verschönererte Version

Jetzt mit Stil-Beschreibung:

```
Bitte erstelle eine Landing-Page fuer eine Haustier-Adoptionsplattform mit folgenden Anforderungen:

**Aesthetischer Stil: Warm und weich + handgezeichnet**

**Schrift:**
- Ueberschriften: Nunito (rund), Gewichtung 700-800
- Fliesstext: Nunito, Gewichtung 400-600

**Farbe:**
- Hauptfarbe: #FFB347 (warmes Orange)
- Sekundaerfarbe: #FFCCB3 (hell-Orange)
- Hintergrund: #FFF8F0 (elfenbeinfarben)
- Text: #5D4037 (Braun)

**Layout:**
- Abgerundete Karten (border-radius: 24px)
- Karten leicht geneigt (unterschiedliche Winkel)
- Schwebende, ueberlappende Elemente

**Animation:**
- Elemente gleiten beim Laden von beiden Seiten ein
- Tier-Karten bewegen sich beim Hover wie ein nickendes Haustier (Rotate-Animation)
- Button mit Bounce-Effekt beim Hover

**Details:**
- Alle Abrundungen 16-24px
- Warme, weiche Schatten (0 8px 24px rgba(255,179,71,0.3))
- Hintergrund mit Pfotenabdruck-Muster-Dekoration
- Bilder mit unregelmaessigem Zuschnitt (clip-path)
- Handgezeichnete Icons (Outline-Stil)
```

Die generierte Seite wird ein warmes, niedliches Interface sein, das einen zur Adoption animieren moechte.

## 5. Praktische Uebung 2: Dashboard schnell mit Skills generieren

Skills eignen sich besonders fuer Backend-Systeme mit vielen Seiten.

### 5.1 Mit UI/UX Pro Max

```
Verwende den Dashboard Dark-Stil von UI/UX Pro Max
und erstelle eine Dashboard-Seite fuer ein SaaS-Produktmanagement-Backend mit:

**Oben:** Vier Statistik-Karten (Nutzerzahl, aktive Nutzer, Umsatz, API-Aufrufe)

**Mitte:**
- Links: Liniendiagramm zum Nutzerwachstum (letzte 7 Tage)
- Rechts: Kreisdiagramm zur Abonnement-Plan-Verteilung

**Unten:** Liste der letzten Aktivitaeten (Zeit, Nutzer, Aktion)
```

AI wendet automatisch die Designvorgaben fuer dunkle Dashboards an:
- Dunkelgrauer Hintergrund (#1A1A2E)
- Hochkontrast-Karten (#16213E)
- Lebendige Datenfarben (Blau, Gruen, Orange)
- Schwebende Karten mit Glassmorphismus-Effekt

### 5.2 Mit dem frontend-design-Skill

```
Verwende das frontend-design Skill
und erstelle eine Homepage fuer einen persoenlichen Blog, der Stil soll einzigartig und markant sein
```

AI waehlt eine nicht-mainstreamige aesthetische Richtung (z. B. Retro-Futurismus oder Magazin-Stil) und setzt sie mit einzigartiger Schrift, Farbgestaltung und Layout um.

## 6. Praktische Uebung 3: Eigenes Design-System-Skill erstellen

Wenn du einen festen Markenstil hast, kannst du ein eigenes Skill erstellen, sodass alle AI-generierten Seiten deiner Marke entsprechen.

### 6.1 Skill-Datei erstellen

Erstelle in deinem Projekt die Datei `.claude/skills/my-brand/SKILL.md`:

````markdown
---
name: my-brand
description: Mein projektspezifisches Design-System, das sicherstellt, dass alle UI einer einheitlichen Designsprache folgen
---

# Mein Projekt-Design-System

## Markenfarben
- Hauptfarbe: #6366F1 (Indigo 500)
- Sekundaerfarbe: #8B5CF6 (Violet 500)
- Erfolg: #10B981
- Warnung: #F59E0B
- Fehler: #EF4444
- Hintergrund: #F9FAFB
- Karten: #FFFFFF

## Schriftsystem
- Ueberschriften: Plus Jakarta Sans
  - H1: 700, 48px
  - H2: 600, 36px
  - H3: 600, 24px
- Fliesstext: Inter
  - Body: 400, 16px
  - Small: 400, 14px

## Abstandssystem
- Grundeinheit: 4px
- Komponenten-Innenabstand: 8px / 12px / 16px
- Blockabstaende: 24px / 32px / 48px
- Seitenraender: 64px

## Abrundungen
- Buttons: 8px
- Karten: 12px
- Eingabefelder: 8px
- Modale Dialoge: 16px

## Schatten
- Klein: 0 1px 3px rgba(0,0,0,0.1)
- Mittel: 0 4px 12px rgba(0,0,0,0.1)
- Gross: 0 8px 24px rgba(0,0,0,0.12)

## Animation
- Uebergangszeit: 150ms / 300ms
- Easing-Funktion: cubic-bezier(0.4, 0, 0.2, 1)
- Hover-Effekt: Leichte Vergroesserung (scale-105)

## Verbotene Stile
- Keine Lila-Gradient-Hintergruende verwenden
- Keine anderen Schriften als Inter verwenden
- Keine Abrundungen groesser als 16px
- Kein reines Schwarz (#000000), stattdessen #1F2937
````

### 6.2 Eigenes Skill verwenden

Nach dem Erstellen musst du im Prompt nur sagen:

```
Verwende das my-brand Skill und erstelle eine Benutzereinstellungsseite
```

AI wendet automatisch alle von dir definierten Designvorgaben an.

## 7. Zusammenfassung

Es gibt zwei Methoden, um AI schoene Interfaces generieren zu lassen:

| Methode | Vorteile | Nachteile | Anwendungsbereich |
| :--- | :--- | :--- | :--- |
| **Prompt-Beschreibung** | Flexibel, jedes Mal anpassbar | Muss wiederholt geschrieben werden | Einmalige Seiten, verschiedene Stile ausprobieren |
| **Skills-Plugins** | Einmal installiert, dauerhaft wirksam | Installation und Konfiguration erforderlich | Projekte mit festen Stilvorgaben |

**Vibe Coding Workflow-Empfehlung:**

1. **Explorationsphase**: Mit verschiedenen Stil-Prompts experimentieren, um deine bevorzugte aesthetische Richtung zu finden
2. **Nach Festlegung des Stils**: Das entsprechende Skill installieren (UI/UX Pro Max oder frontend-design)
3. **Markenprojekte**: Eigenes Skill erstellen, das die Designsprache des gesamten Projekts vereinheitlicht

### Uebung

Waehle eines der folgenden Szenarien und schliesse es von Grund auf mit den Methoden dieser Lektion ab:

1. Verwende Stil-Prompts, um das Interface eines deiner frueheren Projekte neu zu gestalten (waehle einen Stil, der dir gefaellt)
2. Installiere UI/UX Pro Max und generiere eine neue Seite mit einem seiner Stile
3. Erstelle dein eigenes Design-System-Skill mit deinen Markenfarben und Schriften

---

## Anhang: Designstil-Schnellreferenz

| Stil | Schluesselwoerter | Anwendungsbereich | Beispielprodukt |
| :--- | :--- | :--- | :--- |
| **Minimalismus** | Weißraum, einfarbig, schlicht | High-End-Produkte, persoenliche Portfolios | Apple-Website |
| **Glassmorphismus** | Milchglas, Gradienten, Unschaerfe | Technologieprodukte, SaaS-Landing-Pages | macOS Big Sur |
| **Neubrutalismus** | Dicke Rahmen, harte Schatten, pure Farben | Trend-Marken, Kunst-Websites | Brassius |
| **Bento Grid** | Raster, Collage, Karten | Informationsdarstellung, Dashboards | Apple Promo-Seiten |
| **Retro-Futurismus** | Neon, Gradienten, Synthesizer-Wave | Spiele, Musik | STRANGER THINGS |
| **Handgezeichneter Stil** | Unregelmessig, abgerundet, Illustrationen | Bildung, Kinderprodukte | Duolingo |
| **Magazin-Stil** | Grosse Schriften, asymmetrisch, Weißraum | Inhalts-Websites, Blogs | Medium |
| **Dunkler Luxus** | Dunkel, Gold, raffiniert | High-End-Produkte, Luxusmarken | Verschiedene Premium-Marken |

## Anhang: Skills-Installation-Schnellreferenz

```bash
# UI/UX Pro Max
npm install -g uipro-cli
uipro init --ai claude

# Anthropic frontend-design
npx skills add anthropics/skills/frontend-design

# Anthropic brand-guidelines
npx skills add anthropics/skills/brand-guidelines

# Installierte Skills in Claude Code anzeigen
/help
```

## Anhang: Farbpaletten-Empfehlungen

| Farbpalette | Hauptfarbe | Akzentfarbe | Hintergrund | Stil |
| :--- | :--- | :--- | :--- | :--- |
| **Sonnenuntergang** | #F97316 | #FBBF24 | #FFF7ED | Warm, dynamisch |
| **Ozean** | #0EA5E9 | #06B6D4 | #F0F9FF | Frisch, professionell |
| **Wald** | #10B981 | #34D399 | #ECFDF5 | Natur, Gesundheit |
| **Beere** | #8B5CF6 | #EC4899 | #FAF5FF | Romantisch, kreativ |
| **Kaffee** | #78350F | #D97706 | #FFFBEB | Warm, Retro |
| **Monolith** | #6B7280 | #9CA3AF | #F9FAFB | Professionell, neutral |

## Anhang: Designstil-Prompt-Schnellreferenz {#style-prompts}

Prompts, die man ausprobieren kann, um Frontend-Seiten schoener zu machen:

### Stilkategorien

| Stil | Schluesselwoerter (Englisch) | Kern-Visuelle Merkmale | Prompt-Beispiel |
|:---|:---|:---|:---|
| **Pop Art** | Pop Art | Kuehne Kontrastfarben, schwarze Konturlinien, Raster-Punkte | Pop art style website, bold colors and comic dots, vibrant |
| **Minimalismus** | Minimalism | Viel Weißraum, minimale Farben und Linien, keine Dekoration | Minimalist web design, ample white space, geometric, serene |
| **Abstrakter Expressionismus** | Abstract Expressionism | Emotional aufgeladene Pinselstriche, Farbverwürfe | Abstract expressionism background, dynamic paint splashes, emotional |
| **Retro-Stil** | Retro/Vintage | Alte Schriften, gealterte Texturen, Retro-Farbgebung | Retro 80s website design, neon grid and synthwave color palette |
| **Cyberpunk** | Cyberpunk | Hochkontrast-Neonfarben, Glitch-Art-Effekte, dunkler Hintergrund | Cyberpunk UI, neon lights on dark background, glitch effects |
| **Neumorphismus** | Neumorphism | Weiche Schatten und Highlights, leicht erhabene/vertiefte Textur | Neumorphism design style, soft shadows, clean and modern |
| **Generative Kunst** | Generative Art | Algorithmisch generierte fliessende visuelle Muster | Generative art background, flowing algorithmic patterns, digital |
| **Acid Graphics** | Acid Graphics | Metallische Textur, Glas-Zustand, gezackte Schriften | Acid graphics web layout, glass morphism, chaotic typography |
| **Immersives 3D** | Immersive 3D | Interaktive 3D-Szenen, starke Tiefenwirkung | Immersive 3D website, interactive product model in space |
