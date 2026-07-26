# Von Vibe Coding zu Spec Coding: Die Evolution der KI-Programmierung

> "Code is a lossy projection of intent."
> Code ist eine verlustbehaftete Projektion der Absicht.
> - Sean Grove, OpenAI, AI Engineer World's Fair 2025

## Die Kernidee von Spec Coding: Alles ist Markdown

Bevor wir tiefer in Spec Coding eintauchen, verstehen wir zuerst die zugrundeliegende Philosophie von Claude Code: **Alles ist Markdown**.

In Claude Codes Designphilosophie können Prozessdokumente, Informationsübertragung und sogar Konversationen mit dem Modell allesamt Markdown sein:

- **CLAUDE.md**: ein Markdown-Dokument für Projektkonventionen
- **.claude/rules/**: eine Sammlung geschichteter Markdown-Regeldateien
- **specs/**: Markdown-Beschreibungen von Funktionsanforderungen
- **Konversationsverlauf**: Claude Codes Chat-Aufzeichnungen sind selbst im Markdown-Format
- **AGENTS.md**: Markdown-Anweisungen, die Agentenverhalten definieren

Das ist genau der Kern von Spec Coding: **Die Spezifikation selbst ist Code.** Wenn Sie Anforderungen, Designentscheidungen und Abnahmekriterien in Markdown schreiben, schreiben Sie bereits "Code" - KI wird dieses Markdown lesen und dann die echte Implementierung generieren.

Josh Beamans Zusammenfassung von Groves Vortrag trifft es perfekt:

> "Software engineering (and lawmaking and legal review) is specification repair."
> Software-Engineering (und Gesetzgebung und Rechtsüberprüfung) ist Spezifikationsreparatur.

In Claude Code ist dieser "Spezifikationsreparatur"-Prozess: **Markdown ändern -> KI liest Markdown -> Code generieren/ändern -> das Ergebnis verifizieren**. Der gesamte Workflow ist Markdown-getrieben.

---

## 1. Sean Groves "The New Code": Ein Vortrag, der Ihr Denken verändert

2025 hielt OpenAI-Forscher **Sean Grove** einen Vortrag mit dem Titel **"The New Code"** auf der AI Engineer World's Fair, der die gesamte Entwickler-Community erschütterte. Er schlug eine disruptive Idee vor: **70 Jahre lang haben wir Code geschrieben, um Probleme zu lösen, aber Code ist nur eine verlustbehaftete Projektion der Absicht - Spezifikationen sind der echte "neue Code."**

Dieser Vortrag gab einer neuen Entwicklungsparadigma den Anfang: **Spec Coding** - Spezifikationsdokumente statt Code zum zentralen Artefakt der Entwicklung zu machen und KI Code aus der Spezifikation generieren zu lassen.

Ausgehend von Groves Vortrag wird dieser Artikel Ihnen helfen, die Kernideen von Spec Coding zu verstehen, die Grenzen von Vibe Coding zu betrachten und zu zeigen, wie Sie diese Methodik in der echten Entwicklung mit Claude Code anwenden.

::: info Was Sie lernen werden

1. Die Kernideen in Sean Groves "The New Code"-Vortrag verstehen
2. Die Kernkonzepte und Methodik von Spec Coding meistern
3. Sowohl den Wert als auch die Grenzen von Vibe Coding erkennen
4. Lernen, wie man einen Spec-Coding-Workflow in Claude Code praktiziert
5. Eine schrittweise Übergangsstrategie von Vibe Coding zu Spec Coding meistern

:::

---

## 1. Sean Groves "The New Code": Ein Vortrag, der Ihr Denken verändert

2025 hielt OpenAI-Forscher Sean Grove einen Vortrag mit dem Titel **"The New Code"** auf der AI Engineer World's Fair. Dieser Vortrag gilt weithin als intellektueller Startpunkt der Spec-Coding-Bewegung.

Grove hatte zuvor OneGraph gegründet, ein Unternehmen für GraphQL-Entwicklertools, das später von Netlify übernommen wurde, und arbeitet nun an Alignment-Reasoning bei OpenAI - dabei hilft, hochrangige Absichten in ausführbare Spezifikationen und Bewertungsstandards umzuwandeln.

### 1.1 Kernargument: Code ist eine verlustbehaftete Projektion der Absicht

Das Kernkonzept von Groves Vortrag lässt sich in einem Satz zusammenfassen:

> **Code is a lossy projection of intent.**
> Code ist eine verlustbehaftete Projektion der Absicht.

Was bedeutet das? Wenn Sie eine Idee im Kopf haben und sie in Code umwandeln, geht eine enorme Menge an Kontext auf dem Weg verloren - **warum** Sie diesen Ansatz wählten, **welche Kompromisse** Sie in Betracht zogen und **welche Einschränkungen** wichtig waren. Der finale Code bewahrt nur das "Wie", während das "Warum es so gemacht werden sollte" verloren geht.

Es ist, als würde man ein Buch auf einen Tweet komprimieren - die Informationsdichte sinkt drastisch und die ursprüngliche Absicht wird stark beeinträchtigt.

### 1.2 Das Wesen der Programmierung ist Kommunikation

Grove stellte eine einfache, aber tiefgreifende Idee vor:

> "If you can communicate effectively, you can program."
> Wenn Sie effektiv kommunizieren können, können Sie programmieren.

Er argumentiert, dass die tatsächliche Codierungsarbeit nur **10-20%** der Entwicklung ausmacht. Die anderen 80% sind **strukturierte Kommunikation** rund um Anforderungen und Ziele - zu verstehen, was Nutzer wollen, sich mit dem Team über Lösungen abstimmen, Abnahmekriterien definieren und Randfälle behandeln.

Das bedeutet, dass der Kern der Programmierfähigkeit nicht die Beherrschung der Syntax einer bestimmten Sprache ist, sondern die Fähigkeit, **vage Absichten in präzise Beschreibungen umzuwandeln**.

### 1.3 Wer die Spec schreibt, ist der Programmierer

Das ist Groves disruptivste Idee:

> "Whoever writes the spec - be it a PM, a lawmaker, an engineer, a marketer - is now the programmer."
> Wer auch immer die Spec schreibt - sei es ein PM, ein Gesetzgeber, ein Ingenieur, ein Marketer - ist jetzt der Programmierer.

Da KI immer besser darin wird, Spezifikationen in Code umzuwandeln, verschiebt sich die **echte Programmierarbeit** vom "Code schreiben" zum "Spezifikationen schreiben." Wer seine Absicht am präzisesten ausdrücken kann, wird zum wertvollsten "Programmierer."

### 1.4 Spezifikationen können eine Code-ähnliche Toolchain haben

Grove wies darauf hin, dass Spezifikationen eine vollständige Toolchain haben können, genau wie Code:

> "Specs actually give us a very similar toolchain, but it's targeted at intentions rather than syntax."

- **Komposition**: Spezifikationen können modular und komponierbar sein, wie Codemodule
- **Testen**: Spezifikationen können Unit-Tests einbetten, um zu verifizieren, dass das Verhalten den Erwartungen entspricht
- **Linting**: Mehrdeutige Sprache in Spezifikationen kann erkannt werden, genau wie ein Linter Syntaxprobleme findet
- **Konsistenzprüfungen**: Spezifikationen über Abteilungen hinweg können auf Konsistenz geprüft werden, ähnlich wie ein Typ-Checker

### 1.5 OpenAI Model Spec: Ein lebender Beweis

Grove nutzte OpenAIs eigenes **Model Spec**-Dokument als Beweis.

Als OpenAI ein Sykophantie-Problem entdeckte, trainierten sie das Modell nicht neu. Stattdessen **änderten sie das Spezifikationsdokument**. Die Änderung propagierte automatisch im System und das Problem wurde behoben.

Das beweist einen entscheidenden Punkt: **Die Spezifikation selbst kann wie ausführbarer Code agieren.** Die Spezifikation zu ändern entspricht dem Ändern des Verhaltens, ohne eine einzige Zeile traditionellen Code anzufassen.

Josh Beamans Zusammenfassung von Groves Vortrag trifft es perfekt:

> "Software engineering (and lawmaking and legal review) is specification repair."
> Software-Engineering (und Gesetzgebung und Rechtsüberprüfung) ist Spezifikationsreparatur.

---

## 2. Spec Coding: Spezifikation als Code

### 2.1 Was ist Spec Coding

Spec Coding, auch Spec-Driven Development (SDD) genannt, ist eine Methodik, die **Spezifikationsdokumente als zentrales Artefakt der Entwicklung** betrachtet.

Die Kernidee ist: **Die Spezifikation zuerst klar schreiben, dann KI Code aus dieser Spezifikation generieren lassen. Die Spezifikation ist die Quelle der Wahrheit und Code ist nur das daraus abgeleitete Implementierungsartefakt.**

Robert C. Martins klassische Aussage aus *Clean Code* wird im KI-Zeitalter neu relevant:

> "Specifying requirements so precisely that a machine can execute them is programming."
> Anforderungen so präzise zu spezifizieren, dass eine Maschine sie ausführen kann, ist Programmierung.

### 2.2 Vergleich von Vibe Coding und Spec Coding

| Dimension | Vibe Coding | Spec Coding |
|------|------------|-------------|
| **Ansatz** | Improvisierte Prompts, iterativer Austausch | Zuerst eine vollständige Spezifikation schreiben, dann Code generieren |
| **Am besten für** | Prototypen, Hackathons, Erkundung | Produktionssysteme, Teamzusammenarbeit, Enterprise-Arbeit |
| **Codequalität** | Schnell, aber fragil | Strukturiert, testbar, überprüfbar |
| **Erfolgsquote beim ersten Versuch** | Instabil | Zielt auf 95%+ ab |
| **Wiederverwendbarkeit** | Einweg-Prompts | Spezifikationen projektübergreifend wiederverwendbar |
| **Sicherheit** | Leicht zu übersehen | Auf Spezifikationsebene integriert |
| **Dokumentation** | Fehlend oder immer hinterherhinkend | Die Spezifikation ist die Dokumentation und bleibt gepflegt |
| **Teamzusammenarbeit** | Hängt von persönlichem Prompting-Geschick ab | Geteilte Spezifikationen, geteilte Standards |

Die beiden sind keine Gegensätze. Wie Brad Jolicoeur betont:

> "Clever engineers will even use vibe coding as a first step to generate the initial draft of a specification."
> Clevere Ingenieure werden sogar Vibe Coding als ersten Schritt nutzen, um den ersten Entwurf einer Spezifikation zu generieren.

### 2.3 Die dreischichtige Spezifikationsstruktur von Spec Coding

Ingenieure bei Red Hat fassten ein praktisches dreischichtiges Spezifikationsmodell zusammen:

**Schicht 1: Funktionale Spezifikation (Was)**

Das erwartete Ergebnis in natürlicher Sprache beschreiben und "was es tun soll" beantworten:

```markdown
## Benutzer-Authentifizierungsfunktion

### User Stories
- Als neuer Nutzer möchte ich mich mit meiner E-Mail registrieren
- Als registrierter Nutzer möchte ich mich mit E-Mail und Passwort anmelden
- Als Nutzer, der sein Passwort vergessen hat, möchte ich es per E-Mail zurücksetzen

### Abnahmekriterien
- E-Mail-Format und Passwortstärke bei der Registrierung validieren
- Das Konto nach 5 fehlgeschlagenen Anmeldeversuchen für 15 Minuten sperren
- Links zum Zurücksetzen des Passworts sind 30 Minuten gültig
```

**Schicht 2: Sprachunabhängige Spezifikation (Wie - Architekturebene)**

Datenstrukturen, Architekturpatterns und Sicherheitsanforderungen definieren:

```markdown
## Technisches Design

### Datenmodell
- users-Tabelle: id, email, password_hash, created_at, locked_until
- sessions-Tabelle: id, user_id, token, expires_at

### API-Design
- POST /api/auth/register -> 201 Created
- POST /api/auth/login -> 200 OK + JWT
- POST /api/auth/reset-password -> 202 Accepted

### Sicherheitsanforderungen
- Passwörter verwenden bcrypt mit Cost-Faktor >= 12
- JWT läuft in 15 Minuten ab, Refresh-Token in 7 Tagen
- Rate Limiting auf allen Endpunkten aktivieren
```

**Schicht 3: Sprachspezifische Spezifikation (Wie - Implementierungsebene)**

Versionsanforderungen, Test-Framework und Dokumentationsstandards:

```markdown
## Implementierungsbeschränkungen

### Tech-Stack
- Runtime: Node.js 20+
- Framework: Express 5
- ORM: Prisma
- Testing: Vitest

### Code-Konventionen
- TypeScript Strict Mode verwenden
- Eine benutzerdefinierte AppError-Klasse für Fehlerbehandlung verwenden
- Alle API-Endpunkte erfordern JSDoc-Kommentare
```

---

## 3. Spec Coding in Claude Code praktizieren

Sobald Sie die Theorie verstanden haben, lautet die nächste Frage, wie man sie in Claude Code anwendet. Claude Codes Designphilosophie passt natürlich zu Spec Coding - sein `CLAUDE.md`, Rules-Verzeichnis und `/plan`-Befehl sind alles Formen der spezifikationsgetriebenen Entwicklung.

Wenn OpenAI selbst Projekte mit Codex baut, verwendet es ein ähnliches Muster: eine `AGENTS.md`-Datei als Spezifikation zur Steuerung des KI-Agenten. Ihre wichtigste Lehre ist: **Wenn der Agent Schwierigkeiten hat, dies als Signal behandeln - identifizieren, was fehlt, ob es Tools, Guardrails oder Dokumentation sind, und es dann zum Repository hinzufügen**. Das passt perfekt zu Spec Coding: Spezifikationen sind lebende Artefakte und sollten sich weiterentwickeln.

Forschung von Augment Code unterstützt dieselbe Schlussfolgerung: **Ausführbare Spezifikationen bleiben genau, weil KI-Agenten direkt aus ihnen Code generieren, was eine Zwangsfunktion erzeugt - veraltete Spezifikationen produzieren kaputte Implementierungen**. Das bedeutet, dass Spezifikationen nicht so verrotten wie traditionelle Dokumentation.

### 3.1 Schritt eins: `CLAUDE.md` verwenden, um Projektspezifikationen zu etablieren

`CLAUDE.md` ist die "lebende Spezifikation" Ihres Projekts. Jedes Mal, wenn Claude Code startet, liest es diese Datei, was äquivalent dazu ist, der KI ein dauerhaftes Projekthandbuch zu geben.

Im früheren Kapitel [Claude Code Schnellstart Kernleitfaden](../basics/) haben wir bereits gelernt, wie man `CLAUDE.md` erstellt. Im Kontext von Spec Coding wird seine Rolle noch wichtiger - **es ist nicht nur eine Konfigurationsdatei, sondern der Einstiegspunkt in die Projektspezifikation**.

Ingenieure bei LogRocket betonen, dass **solider Kontext für KI-Agenten entscheidend ist, da er Halluzinationen und Ineffizienz verhindert**. Ohne Spezifikationen kann ein KI-Agent große, unkontrollierte Änderungen an einem Projekt vornehmen. `CLAUDE.md` ist die erste Verteidigungslinie, die diesen "soliden Kontext" bereitstellt.

```markdown
# E-Commerce-Projektspezifikation

## Projektpositionierung
Eine SaaS-E-Commerce-Plattform für kleine und mittlere Händler, die mehrere Stores und mehrere Zahlungskanäle unterstützt.

## Architekturentscheidungen
- Frontend-Backend-Trennung mit einem API-First-Design
- Microservice-Backend-Architektur, mit Diensten, die über eine Message Queue kommunizieren
- Lese-Schreib-Datenbank-Trennung

## Kernbeschränkungen
- Alle Geldbeträge als Integer in Cent speichern, um Fließkomma-Präzisionsprobleme zu vermeiden
- Die Bestellzustandsmaschine muss strikt folgen: Zahlungs ausstehend -> bezahlt -> versendet -> abgeschlossen
- Zahlungsbezogene Endpunkte müssen idempotent sein
```

Das Aviator-Team fasste die Schlüsselinformationen zusammen, die Spezifikationen erfassen sollten - und genau das sollte Ihr `CLAUDE.md` abdecken:

- Ein- und Ausgabeformate und Datentypen
- Geschäftsregeln und Randfälle
- Systemabhängigkeiten und Einschränkungen
- Leistungs- und Skalierbarkeitsanforderungen
- Fehlerbehandlung und Sicherheitsanforderungen

### 3.2 Schritt zwei: Das Rules-Verzeichnis nutzen, um geschichtete Spezifikationen zu verwalten

Wenn Ihr Projekt wächst, wird ein einzelnes `CLAUDE.md` nicht ausreichen. Nutzen Sie dann das `.claude/rules/`-Verzeichnis, um geschichtete Spezifikationen zu organisieren.

Das ist genau das, was Augment Code als Idee der "ausführbaren Spezifikationen" bezeichnet: **Spezifikationen sind keine statischen Dokumente, sondern lebende Anweisungen, die direkt von KI-Agenten konsumiert werden**. Wenn Sie Regeln im Rules-Verzeichnis aufteilen, wird jede Regeldatei nur geladen, wenn verwandte Dateien bearbeitet werden, was sowohl Tokens spart als auch die Präzision bewahrt.

Ingenieure bei Tessl fanden heraus, dass das Aufbrechen von Anforderungen in strukturierte Dokumente - mit einem PRD, das "Was und Warum" definiert, und technischen Spezifikationen, die "Wie" definieren - hilft, zu verhindern, dass KI in langen Konversationen Verwirrung ansammelt, und die Ausgabekonsistenz deutlich verbessert.

```text
.claude/rules/
├── 00-architecture.md      # Architekturregeln (global)
├── 01-security.md          # Sicherheitsregeln (global)
├── 10-api-design.md        # API-Design-Regeln
├── 11-frontend-patterns.md # Frontend-Pattern-Regeln
├── 12-database.md          # Datenbankregeln
└── 20-testing.md           # Test-Regeln
```

Jede Regeldatei kann ihren Geltungsbereich durch Frontmatter spezifizieren:

```markdown
---
globs:
  - "src/api/**/*.ts"
  - "src/services/**/*.ts"
---

# API-Design-Regeln

## Routen-Design
- RESTful-Stil, Pluralnomen verwenden: /api/v1/orders
- Verschachtelte Ressourcen höchstens zwei Ebenen tief: /api/v1/users/123/orders

## Antwortformat
- Erfolg: { data, pagination? }
- Fehler: { error: { code, message, details? } }

## Zwingend zu befolgen
- Alle Schreiboperationen erfordern Authentifizierung
- Alle Listen-Endpunkte müssen Paginierung unterstützen
- Sensible Operationen müssen Audit-Logs schreiben
```

Auf diese Weise lädt Claude Code automatisch diese Spezifikation, wenn es API-bezogene Dateien bearbeitet, und stellt sicher, dass der generierte Code dem Standard entspricht.

### 3.3 Schritt drei: `/plan` verwenden, um Specify -> Plan -> Tasks -> Implement umzusetzen

Der Standard-Spec-Coding-Workflow ist eine vierschrittige Schleife. GitHub Spec Kit standardisiert ihn als Specify -> Plan -> Tasks -> Implement, und Claude Codes `/plan`-Befehl unterstützt diesen Ablauf natürlicherweise.

Das SpecThis-Team betonte ein Schlüsselprinzip: **Grenzen definieren, bevor der Agent läuft - wissen, was sich ändern soll, bevor Codeänderungen stattfinden**. Das ist genau der Wert von `/plan`.

**Stufe 1: Specify**

Schreiben Sie zuerst klar auf, was Sie bauen wollen. Stürzen Sie sich nicht auf den Code:

```text
/plan
Ich muss eine Bestellrückerstattungsfunktion implementieren. Die Spezifikation lautet:

Funktionale Anforderungen:
- Nutzer können eine vollständige Rückerstattung vor dem Versand anfordern
- Innerhalb von 7 Tagen nach dem Versand können Nutzer eine Rückgabe und Rückerstattung anfordern
- Rückerstattungen erfordern Administrator-Genehmigung

Abnahmekriterien:
- Der Rückerstattungsbetrag darf den tatsächlich bezahlten Betrag der Bestellung nicht überschreiten
- Rückerstattungs-Zustandsmaschine: angefordert -> genehmigt -> erstattend -> erstattet
- Bestand wird nach Abschluss der Rückerstattung wiederhergestellt
- Jede Operation im gesamten Prozess protokollieren
```

**Stufe 2: Plan**

Claude generiert einen technischen Plan basierend auf Ihrer Spezifikation:

```text
📋 Rückerstattungsfunktion Implementierungsplan

1. Datenmodell-Design
   - refunds-Tabelle erstellen
   - Rückerstattungsbezogene Zustände zur Bestell-Zustandsmaschine hinzufügen

2. API-Design
   - POST /api/orders/:id/refund - Rückerstattung anfordern
   - PUT /api/refunds/:id/approve - Rückerstattung genehmigen
   - GET /api/refunds - Rückerstattungsliste

3. Geschäftslogik
   - Rückerstattungsberechtigungsprüfungen
   - Rückerstattungsbetrag-Berechnung
   - Bestandswiederherstellungslogik

4. Integrationen
   - Mit der Rückerstattungs-API des Zahlungsanbieters verbinden
   - Rückerstattungsbenachrichtigungen senden
```

**Stufe 3: Tasks**

Den Plan in kleine, unabhängig ausführbare Aufgaben aufbrechen und jeder Aufgabe einen klaren Fertigstellungsstandard geben.

**Stufe 4: Implement**

Eine Aufgabe nach der anderen implementieren, nach jeder abgeschlossenen validieren.

### 3.4 Echtes Beispiel: Ein Benachrichtigungssystem mit Spec Coding bauen

Nutzen wir ein vollständiges Beispiel, um Vibe Coding und Spec Coding zu vergleichen. Daten von Orchestrator.dev zeigen, dass in der Stack Overflow 2025-Umfrage 84% der Entwickler KI-Tools nutzen oder zu nutzen planen, aber nur 22% mit den Ergebnissen zufrieden sind und 46% Genauigkeit als Problem sehen. Spec Coding ist genau der Schlüssel, um diese Zufriedenheitslücke zu schließen.

**Vibe-Coding-Ansatz:**

```text
Sie: Eine Benachrichtigungsfunktion bauen
KI: [Beginnt sofort mit dem Schreiben von Code und generiert eine einfache Benachrichtigungsliste]

Sie: Sie sollte gelesen und ungelesen unterstützen
KI: [Ändert den Code und fügt ein read-Feld hinzu]

Sie: Sie braucht auch mehrere Benachrichtigungstypen
KI: [Ändert es erneut und fügt ein type-Feld hinzu]

Sie: Sie sollte auch Benachrichtigungen auf Handys pushen
KI: [Macht einen großen Rewrite, und die vorherige Struktur passt nicht mehr richtig...]
```

Ergebnis: Nach vier Änderungsrunden wurde die Architektur immer wieder umgestürzt und der Code wird mit der Zeit chaotischer.

**Spec-Coding-Ansatz:**

Zuerst ein Spezifikationsdokument `specs/notification.md` schreiben:

```markdown
# Benachrichtigungssystem-Spezifikation

## Funktionale Anforderungen
1. Drei Kanäle unterstützen: In-App-Benachrichtigungen, E-Mail-Benachrichtigungen und Push-Benachrichtigungen
2. Benachrichtigungstypen: Systemankündigungen, Bestellstatus, Werbekampagnen, Sicherheitswarnungen
3. Nutzer können Benachrichtigungseinstellungen nach Kanal und Typ konfigurieren
4. Gelesen/Ungelesen-Status und Massen-Als-gelesen-Markieren unterstützen

## Datenmodell
- notifications-Tabelle: id, user_id, type, channel, title, content,
  is_read, created_at
- notification_preferences-Tabelle: user_id, type, channel, enabled

## API-Design
- GET /api/notifications?type=&is_read= - Benachrichtigungsliste abrufen (paginiert)
- PUT /api/notifications/:id/read - Als gelesen markieren
- PUT /api/notifications/read-all - Alle als gelesen markieren
- GET /api/notification-preferences - Präferenzen abrufen
- PUT /api/notification-preferences - Präferenzen aktualisieren

## Abnahmekriterien
- Die Anzahl ungelesener Benachrichtigungen aktualisiert sich in Echtzeit
- Die Benachrichtigungsliste unterstützt Infinite Scrolling
- Push-Benachrichtigungslatenz < 3 Sekunden
- Präferenzänderungen werden sofort wirksam
```

Dann in Claude Code:

```text
@specs/notification.md
Das Benachrichtigungssystem gemäß dieser Spezifikation implementieren.
Mit dem Datenmodell beginnen, dann die API implementieren und schließlich die Frontend-Komponenten bauen.
Nach Abschluss jedes Moduls pausieren, und ich werde bestätigen, bevor Sie fortfahren.
```

Ergebnis: Es landet sauber in einem Durchgang, mit klarer Architektur und ohne wiederholtes Abreißen und Neuaufbauen.

### 3.5 Spec Coding mit Superpowers stärken

Im früheren Kapitel [Superpowers für Engineering-Grade-Entwicklung](../superpowers/) haben wir das Superpowers-Fähigkeitssystem kennengelernt. Spec Coding und Superpowers sind natürliche Begleiter:

| Spec-Coding-Stufe | Passende Superpowers-Fähigkeit |
|------------------|---------------------|
| Spezifikation definieren | `brainstorming` - Sokratische Fragen zur Klärung von Anforderungen nutzen |
| Technische Planung | `writing-plans` - Spezifikation in kleine Aufgaben aufbrechen |
| Inkrementelle Implementierung | `test-driven-development` - TDD Red-Green-Refactor |
| Qualitätsverifikation | `code-review` + `verification-before-completion` |

**Beispiel für kombinierte Nutzung:**

```text
@specs/notification.md
Das Benachrichtigungssystem gemäß dieser Spezifikation mit TDD implementieren,
und mir beim Code-Review helfen, wenn es fertig ist
```

Diese einzelne Anweisung aktiviert sowohl den Spec-Coding-Workflow als auch Superpowers-Fähigkeiten wie TDD und Code Review und bildet einen vollständigen Engineering-Grade-Entwicklungsprozess.

### 3.6 Versionskontrolle und kontinuierliche Evolution von Spezifikationen

Der Vibe Coding Substack schlug einen wichtigen Gesichtspunkt vor: **Specs are now code**. Wenn Spezifikationen Code sind, sollten sie auch wie Code verwaltet werden:

- **Versionskontrolle**: Spezifikationsdateien in Git aufbewahren und zusammen mit dem Code committen
- **Änderungsverfolgung**: Jede Änderung an der Spezifikation hat einen Commit-Datensatz, damit Sie wissen, wer was und warum geändert hat
- **Code Review**: Änderungen an Spezifikationen sollten ebenfalls PR-Review durchlaufen, damit das Team auf dem gleichen Stand bleibt
- **CI-Integration**: Spezifikationsänderungen lösen automatisierte Tests aus, um zu verifizieren, ob die Implementierung noch der Spezifikation entspricht

In Claude Code bedeutet das, dass Ihr `CLAUDE.md`, `.claude/rules/` und `specs/`-Verzeichnis alle versionskontrolliert sein sollten. Die Erfahrung von Robomotion ist, dass **Spezifikationen zusammen mit Implementierungen zu versionieren, Drift verhindert und alles überprüfbar hält**.

OpenAIs Harness-Engineering-Praxis bestätigt dies ebenfalls: Ihre `AGENTS.md`-Datei wird selbst von Codex geschrieben und wird kontinuierlich aktualisiert, während das Projekt sich entwickelt. Wenn der Agent auf Schwierigkeiten stößt, besteht die Lösung nicht darin, den Code direkt zu ändern, sondern **Codex die Spezifikation selbst aktualisieren zu lassen** - was eine Selbstheilungs-Schleife für Spezifikationen bildet.

---

## 4. Eine Hybrid-Strategie: Allmählich von Vibe zu Spec wechseln

Der Branchenkonsens ist nicht "Vibe Coding aufgeben", sondern **den richtigen Ansatz für das richtige Szenario wählen**.

### 4.1 Wann Vibe Coding verwenden

- Überprüfen, ob eine Idee machbar ist, mit einem Prototyp innerhalb von 30 Minuten
- Unvertraute Technologien oder Frameworks erkunden
- Hackathons oder interne Demos
- Einweg-Skripte oder Tools

### 4.2 Wann Spec Coding verwenden

- Produktions-Funktionsentwicklung
- Mehrpersonen-Kollaborationsprojekte
- Code, der langfristig gewartet werden muss
- Sensible Bereiche wie Sicherheit, Zahlungen oder Daten
- API-Design und Systemintegration

### 4.3 Ein empfohlener schrittweiser Workflow

**Stufe 1: Vibe-Erkundung**

Vibe Coding nutzen, um die Idee schnell zu validieren. Noch keine Spezifikationen schreiben und sich keine Sorgen um Codequalität machen:

```text
Ein einfaches Benachrichtigungs-Popup bauen, damit wir sehen können, wie es sich anfühlt
```

**Stufe 2: Spezifikation verfeinern**

Sobald die Machbarkeit bestätigt ist, das während der Erkundung Gelernte in eine Spezifikation organisieren. Sie können sogar KI um Hilfe bitten:

```text
Basierend auf dem Benachrichtigungsfunktions-Prototyp, den wir gerade gebaut haben,
helfen Sie mir, ein formelles funktionales Spezifikationsdokument zu erstellen,
einschließlich des Datenmodells, API-Designs und Abnahmekriterien
```

**Stufe 3: Mit Spec neu aufbauen**

Basierend auf dieser Spezifikation die produktionsgerechte Version mit Spec Coding neu implementieren:

```text
@specs/notification.md
Dies von Grund auf gemäß der Spezifikation implementieren und nicht auf den vorherigen Prototyp-Code verweisen
```

Der Vorteil dieses Workflows ist klar: **die Geschwindigkeit von Vibe Coding nutzen, um die Richtung zu validieren, und die Qualität von Spec Coding nutzen, um das Produkt auszuliefern**.

Robomotion fasste es gut zusammen:

> "The spec is the source of truth. The AI generated output is the draft implementation. Validation is not optional."
> Die Spezifikation ist die Quelle der Wahrheit. Die KI-generierte Ausgabe ist die Entwurf-Implementierung. Validierung ist nicht optional.

---

## 5. Häufig gestellte Fragen

### F1: Fühlt sich Spec Coding nicht zu langsam an?

Spezifikationen zu schreiben erfordert tatsächlich Vorab-Investition. Aber Greg Ceccarellis Team nutzte Spec Coding, um ein vollständiges macOS-Produkt mit **drei Personen in vier Wochen** auszuliefern - etwas, das in traditioneller Entwicklung nahezu unmöglich wäre.

Die Zeit, die früh für das Schreiben von Spezifikationen aufgewendet wird, wird später durch weniger Nacharbeit, weniger Bugs und geringere Kommunikationskosten zurückgewonnen.

### F2: Wie detailliert sollte eine Spezifikation sein?

Robomotions Empfehlung lautet: **Eine hochwertige Spezifikation kann nur eine Seite sein.** Wichtig ist, ob sie diese acht Fragen beantwortet:

1. Was automatisieren wir?
2. Was ist die Eingabe?
3. Was ist die Ausgabe?
4. Was sind die Einschränkungen?
5. Was sind die Fehlermodi?
6. Was sind die Sicherheitsanforderungen?
7. Was sind die Leistungsanforderungen?
8. Welche Tests beweisen, dass es funktioniert?

### F3: Was ist, wenn KI nur genau das tut, was in der Spezifikation steht, und "offensichtliche" Funktionen übersieht?

Das ist tatsächlich eine der Einschränkungen von Spec Coding. Feedback von GitHub Spec Kit-Nutzern ist, dass KI **"genau und nur"** das tun wird, was in der Spezifikation steht.

Die Lösung ist, einen Abschnitt "Nichtfunktionale Anforderungen" zur Spezifikation hinzuzufügen und dort allgemeine Erwartungen aufzulisten, wie Fehlerbehandlung, Logging und Barrierefreiheit. Oder globale Regeln in `CLAUDE.md` setzen.

### F4: Brauchen kleine Projekte ebenfalls Spec Coding?

Nein. Spec Coding ist am besten geeignet für:

- produktionsgerechte Projekte
- Team-Kollaborationsprojekte
- Projekte, die langfristig gewartet werden müssen

Für schnelle Prototypen, Einweg-Skripte und Lernexperimente ist Vibe Coding besser geeignet.

### F5: Wie bringt man ein Team dazu, Spec Coding zu akzeptieren?

Mit einer kleinen Funktion als Pilot beginnen. Das Team sehen lassen, wie Spec Coding Nacharbeit reduziert und die Erfolgsquote beim ersten Versuch verbessert. Die Stack Overflow 2025-Umfrage zeigt, dass 84% der Entwickler KI-Tools nutzen oder zu nutzen planen, aber nur 22% mit den Ergebnissen zufrieden sind - Spec Coding ist genau der Schlüssel zur Verbesserung dieser Zufriedenheit.

---

## 6. Zusammenfassung

Der Übergang von Vibe Coding zu Spec Coding ist keine Revolution. Es ist eine Evolution.

Sean Grove hat in "The New Code" sehr klar gemacht: **70 Jahre lang haben wir Code geschrieben, um Probleme zu lösen; jetzt sollten wir Spezifikationen schreiben, um Code zu generieren.** Code ist eine verlustbehaftete Projektion der Absicht, während Spezifikationen Absicht, Kontext und Einschränkungen vollständig erfassen können.

Für Entwickler, die Claude Code nutzen, findet dieser Wandel bereits statt:

- das `CLAUDE.md`, das Sie schreiben, ist Ihre Projektspezifikation
- das Rules-Verzeichnis, das Sie konfigurieren, ist Ihr geschichtetes Spezifikationssystem
- die Planung, die Sie mit `/plan` durchführen, ist der Specify -> Plan -> Tasks-Ablauf
- die Kombination von TDD und Code Review aus Superpowers ergibt einen vollständigen Spec-Coding-Workflow

**Wichtigste Erkenntnisse:**

- Vibe Coding eignet sich für Erkundung und Prototypen, während Spec Coding für Produktion und Zusammenarbeit geeignet ist
- Die Spezifikation ist die Quelle der Wahrheit und Code ist ein daraus produziertes Implementierungsartefakt
- Die Fähigkeit, Spezifikationen zu schreiben = Programmierfähigkeit, und Kommunikationsfähigkeit ist wichtiger als Syntaxfähigkeit
- Klein anfangen: nur indem Sie `CLAUDE.md` gut schreiben, haben Sie bereits den ersten Schritt zu Spec Coding getan

::: tip Naechster Schritt
Im naechsten Kapitel werden wir lernen, wie man Claude Codes Agent-Teams-Faehigkeit nutzt, damit mehrere KI-Instanzen wie ein echtes Entwicklungsteam zusammenarbeiten koennen.
:::

---

## Referenzen

### Bezueglich Sean Groves "The New Code"-Vortrag

- [Code is just a lossy projection of intent — The Decoder](https://the-decoder.com/code-is-just-a-lossy-projection-of-intent-according-to-openai-researcher-sean-grove/)
- [The End of Coding? How Specifications Are Becoming the New Source Code — Implicator](https://www.implicator.ai/the-end-of-coding-how-specifications-are-becoming-the-new-source-code/)
- [OpenAI: Intent, Not Code, Drives Future Software Development — AI Tech Suite](https://www.aitechsuite.com/ai-news/openai-intent-not-code-drives-future-software-development)
- [Note on The New Code — Josh Beckman](https://www.joshbeckman.org/notes/914234100)
- [Vollstaendiges Transkript von "The New Code"](https://lawwu.github.io/transcripts/8rABwKRsec4.html)

### Spec-Coding-Methodik

- [How spec-driven development improves AI coding quality — Red Hat](https://developers.redhat.com/articles/2025/10/22/how-spec-driven-development-improves-ai-coding-quality)
- [Spec-Driven Development with AI: Complete 2025 Guide — Dplooy](https://www.dplooy.com/blog/spec-driven-development-with-ai-complete-2025-guide)
- [Spec-Driven Development: Building Production-Ready Software with AI — Orchestrator.dev](https://orchestrator.dev/blog/2025-12-16-spec_driven_dev_article)
- [Agents Code but the Problem of Clear Specification Remains — Greg Ceccarelli](https://www.gregceccarelli.com/writing/beyond-code-centric)

### Vibe Coding vs. Spec Coding

- [Vibe Coding vs Spec Driven — Cosmo Edge](https://cosmo-edge.com/vibe-coding-vs-spec-driven-ai-development/)
- [Master AI in Software Engineering: Vibe vs. Spec Coding — Brad Jolicoeur](https://bradjolicoeur.com/article/ai-software-engineering-vibe-spec-prompting)
- [From Vibe Coding to Spec-Driven Development — Tessl](https://tessl.io/blog/from-vibe-coding-to-spec-driven-development/)
- [Spec First Approach for Enterprise — Robomotion](https://robomotion.io/blog/spec-first-approach-the-way-to-adapt-vibe-coding-for-enterprise-work)

### Tools und Praktiken

- [GitHub Spec Kit vs Vibe Coding — Ossels](https://ossels.ai/github-spec-kit-spec-driven-development/)
- [A Spec-First Workflow for Agentic AI — LogRocket](https://blog.logrocket.com/spec-first-workflow-agentic-ai/)
- [Specs Are Now Code — The Vibe Coding Substack](https://thevibecoding.substack.com/p/specs-are-now-code)
- [Harness Engineering — Martin Fowler](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html)
- [Spec-Driven Development & AI Agents Explained — Augment Code](https://www.augmentcode.com/guides/spec-driven-development-ai-agents-explained)
- [Spec-Driven Development: The Key to Scalable AI Agents — Aviator](https://www.aviator.co/blog/spec-driven-development/)
