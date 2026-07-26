# Seiten und Buttons nach UI-Designrichtlinien entwerfen

Viele Menschen sagen: "Ich moechte, dass die Seite ein bisschen mehr wie Apple aussieht" oder "Die Buttons sollten etwas hochwertiger wirken". Aber wenn es dann an die Umsetzung geht, haengt man oft an einer Frage fest:

**Woran sollte man sich eigentlich orientieren?**

Einen Screenshot abzubilden, bringt nur die Erkenntnis "Aehnlichkeit". Wenn man jedoch die Designrichtlinien von Apple, Google, Microsoft und Atlassian oeffnet, stellt man fest, dass deren wahre Staerke nicht im visuellen Stil liegt, sondern darin, **Designprobleme klar zu benennen**: Was auf einer Seite zuerst hervorgehoben wird, wie Buttons gestuft werden, welche Operationen betont werden -- diese Beurteilungskriterien sind der Kern.

> Sich an Designrichtlinien zu orientieren, heisst nicht, "wie jemand anderes auszusehen", sondern zu lernen, wie andere Urteile faellen.

:::: info Warum man diese heute noch lernen sollte
Designregeln sind bereits in Modelle trainiert und werden von Designtools standardmaessig absorbiert. Selbst wenn man AI ein paar Screenshots gibt, kann sie diese erlernen. Dennoch ist es wichtig zu wissen, woher diese Regeln kommen und warum sie so definiert sind.
::::

## Zunaechst einige Originalzitate, um den Unterschied zu spueren

Wenn du bisher dachtest, "Designrichtlinien handeln doch nur von Stil", dann lies zuerst einige offizielle Originaltexte.

Im Team sagt man oft Dinge wie:

- Mach mal ein Dropdown
- Hier ein Menu hinsetzen
- In der Menueleiste ein paar Funktionen hinzufuegen
- Hier zwei Buttons, einer zum Bestaetigen und einer zum Abbrechen

Das klingt unproblematisch, aber in den grossen Unternehmensrichtlinien sind diese Begriffe keine verschwommenen Konzepte, sondern sehr fein unterteilt.

| Was man umgangssprachlich sagt | Offizieller Originaltext | Kurz gesagt |
| :--- | :--- | :--- |
| "Ein Menu erstellen" | Apple: ["A menu reveals its options..."](https://developer.apple.com/design/human-interface-guidelines/menus) | `Menu` dient der Durchfuehrung von Aktionen |
| "Funktionen in die Menueleiste" | Apple: ["menu bar menus contain all the commands..."](https://developer.apple.com/design/human-interface-guidelines/menus) | Dies ist das Befehlsmenue oben in der App |
| "Ein Dropdown erstellen" | Apple: ["A pop-up list lets the user choose one option among several."](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html) | `pop-up` dient der Auswahl eines Werts aus einer Liste |
| "Auch ein Dropdown" | Apple: ["A pull-down list is generally used for selecting commands in a specific context."](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html) | `pull-down` oeffnet sich fuer die aktuelle Aktion |
| "Menu kann man auch zum Filtern nutzen" | Fluent: ["If you need to collect information from people, try a select, dropdown, or combobox instead."](https://fluent2.microsoft.design/components/web/react/core/menu/usage) | `Menu` ist nicht zur Werterfassung gedacht |
| "Menu kann man auch als Navigation nutzen" | Material: ["Menus should not be used as a primary method for navigation within an app."](https://m1.material.io/components/menus.html) | `Menu` ist keine Hauptnavigation |
| "Button einfach OK / Cancel schreiben" | Apple: ["Always use 'Cancel' to title a button that cancels the alert's action."](https://developer.apple.com/design/human-interface-guidelines/alerts) | Button-Text darf nicht willkuerlich sein |

> Die Zitate in der Tabelle sind direkt klickbar und fuehren zur entsprechenden offiziellen Seite.

Genau das ist es, woran man beim ersten echten Blick in Designrichtlinien am leichtesten erschrickt:

> Wir glauben oft, wir wuerden ueber UI diskutieren, aber tatsaechlich kommunizieren wir meistens nur mit einer Reihe vager Begriffe.

Apple wuerde niemals nur sagen "ein Menu erstellen"; es wuerde weiter unterscheiden in:

- `menu`
- `menu bar menu`
- `pop-up button`
- `pull-down button`
- `context menu`

Fluent wuerde niemals nur sagen "ein Dropdown"; es wuerde weiter unterscheiden in:

- `menu`
- `dropdown`
- `select`
- `combobox`

Genau das ist die Notwendigkeit von Designrichtlinien.

Sie dienen nicht dazu, Seiten professioneller wirken zu lassen, sondern sicherzustellen, dass im Team bei UI-Diskussionen nicht jeder etwas anderes im Kopf hat.

## Was du lernen wirst

1. Warum man beim Entwerfen von Seiten und Buttons zuerst die Designrichtlinien lesen sollte
2. Welche Inhalte der Richtlinien von Apple, Material, Fluent und Atlassian am referenzwuerdigsten sind
3. Wie man "Seitenhierarchie" und "Button-Hierarchie" klar gestaltet
4. Wie man AI dazu bringt, sich an den Richtlinien anderer zu orientieren, um Seiten und Buttons zu generieren

## 1. Warum Designrichtlinien dir helfen, Seiten klar zu gestalten

Nach dem Lesen der obigen Originalzitate faellt ein Schluesselpunkt auf:

**Designrichtlinien sind kein zusaetzlicher Luxus, sondern sorgen zunaechst dafuer, dass die Begriffe praezise verwendet werden.**

Viele Seiten sehen nicht gut aus, nicht weil die Farbgebung nicht hochwertig genug ist, sondern weil die Informationsebenen chaotisch sind.

Viele Buttons sind nicht benutzerfreundlich, nicht weil die Abrundung falsch ist, sondern weil:

- Es zu viele Haupt-Buttons gibt und die Nutzer nicht wissen, welchen sie klicken sollen
- Gefaehrliche und normale Buttons aehnlich aussehen
- Alle Buttons auf der Seite um Aufmerksamkeit konkurrieren
- Button-Stil und Semantik ueber verschiedene Seiten hinweg inkonsistent sind

Ausgereifte Designrichtlinien loesen genau diese Probleme. Sie definieren in der Regel:

| Inhalt der Richtlinie | Welches Problem es loest |
| :--- | :--- |
| **Seitenhierarchie** | Wohin man zuerst schaut, wohin spaeter, wie Informationen organisiert werden |
| **Visuelle Grundlagen** | Wie Farben, Abstaende, Schriften, Abrundungen und Schatten vereinheitlicht werden |
| **Button-Hierarchie** | Wie Haupt-, Neben-, Text- und Gefahren-Buttons unterschieden werden |
| **Zustandsregeln** | Wie hover, focus, disabled und loading dargestellt werden |
| **Interaktionssemantik** | Welcher Button "bestaetigen", "abbrechen" und "weitere Aktionen" bedeutet |

Designrichtlinien liefern also nicht einfach einen "Skin", sondern ein **Beurteilungskriterium**.

## 2. Worauf man bei den grossen Unternehmensrichtlinien achten sollte

### 2.1 Von Apple lernen: "Definitionen fein genug zu fassen"

Das Lernwertste bei Apple ist nicht nur die visuelle Zurueckhaltung, sondern dass es Konzepte sehr fein definiert.

Das, was in vielen Teams nur "Menu" oder "Dropdown" heisst, wird bei Apple weiter unterteilt:

- `menu`: Eine Gruppe von Befehlen, Optionen oder Zustaenden
- `menu bar menu`: App-weite Befehlssammlung
- `pop-up button`: Einen Wert auswaehlen
- `pull-down button`: Im aktuellen Kontext einen Befehl ausloesen
- `context menu`: Haeufige Aktionen bezogen auf das aktuelle Objekt oder die aktuelle Aufgabe

Diese Unterscheidung ist sehr wichtig, da sie sich direkt darauf auswirkt:

- Ob die Komponente zur Werterfassung oder zur Aktionsausfuehrung dient
- Ob sie zum Seitenbereich oder zur App-Ebene gehoert
- Ob sie den aktuell ausgewaehlten Wert dauerhaft anzeigen soll oder nur temporaer Befehle aufklappt

Wenn du in dieser Granularitaet zu denken beginnst, werden deine Seiten sofort deutlich klarer.

### 2.2 Von Apple lernen: Seitenhierarchie und Zurueckhaltung

Die Apple Human Interface Guidelines eignen sich besonders gut, um zwei Dinge zu lernen:

- Wie Seiten eine klare Hierarchie aufbauen
- Wie Steuerelemente eindeutig bleiben, ohne aufdringlich zu wirken

Apple betont `Hierarchy`, `Harmony` und `Consistency`. Das bedeutet, dass beim Seitendesign folgende Fragen beantwortet werden muessen:

- Was ist die wichtigste Information auf der aktuellen Seite?
- Was ist die Hauptaufgabe des Nutzers?
- Welche Operation am auffaelligsten sein sollte und welche in den Hintergrund gehoert

Wenn du dich an Apple orientierst, kannst du besonders folgende Aspekte uebernehmen:

- Die Informationen auf dem ersten Bildschirm sollten nicht zu fragmentiert sein; der Kerninhalt steht im Fokus
- Ordnung durch Freiraum, Schriftgroessen und Gruppierung schaffen, statt viele Rahmen zu stapeln
- Nicht alle Buttons sollten stark hervorgehoben sein; nur die wichtigsten Aktionen sollten am auffaelligsten sein

### 2.3 Von Material lernen: Klarere Seitenstruktur

Material Design eignet sich besonders gut, um zu lernen, "wie Seiten Aufgabenstroeme organisieren".

Viele seiner Komponenten- und Layoutrichtlinien zielen darauf ab, Folgendes klarzustellen:

- Ob eine Seite zum Durchsuchen oder zur Aufgabenausfuehrung dient
- Ob die aktuelle Seite Nutzer zum Lesen, Auswaehlen oder Absenden veranlassen soll
- Welche Elemente auf einer Seite stabil wiederkehren sollten und welche sich dynamisch an den Kontext anpassen

Wenn du dich an Material orientierst, kannst du besonders folgende Aspekte uebernehmen:

- Seitenbereiche klar strukturieren, Modulverantwortlichkeiten eindeutig definieren
- Navigation, Inhalts- und Aktionsbereiche sauber trennen
- Unterschiedliche Button-Stile entsprechen unterschiedlichen Operationsprioritaeten

### 2.4 Von Fluent lernen: Komponentengrenzen und Button-Hierarchie

Fluent 2 eignet sich besonders fuer Backends, Werkzeug-Produkte und komplexe Formularsysteme. Das Lernenswerteste daran ist, dass es dir direkt sagt: "Konzepte nicht vermischen."

Es schreibt beispielsweise ausdruecklich: Wenn du "collect information" moechtest, solltest du nicht weiterhin `menu` verwenden, sondern `select`, `dropdown` oder `combobox` in Betracht ziehen.

Dieser Satz ist sehr wichtig, da er das, was viele Menschen fuer "ungefaehr gleich" halten, aufbrechen laesst.

Fluent 2 legt auch grossen Wert auf:

- Aktionsebenen
- Komponenten-Semantikgrenzen
- Klarheit in dichten Informationsszenarien

Wenn du dich an Fluent orientierst, um Buttons zu gestalten, kannst du besonders folgende Aspekte uebernehmen:

- `Primary button` fuer die aktuell wichtigste Aktion
- `Secondary button` fuer unterstuetzende Aktionen
- `Subtle` und `Transparent` als schwach betonte Buttons fuer Aktionen, die den Hauptprozess nicht stoeren sollten
- Je mehr Buttons auf einer Seite, desto wichtiger ist die Kontrolle der visuellen Prioritaet

### 2.5 Von Atlassian lernen: Systematisches Verwalten von Seiten und Buttons

Das Atlassian Design System eignet sich besonders fuer den Fall, dass "ein Team viele Seiten erstellt". Es betont:

- foundations als gemeinsame Basis
- tokens als Methode zur einheitlichen visuellen Entscheidungsfindung
- components als wiederholt verwendete Interaktionsbausteine

Wenn du dich an Atlassian orientierst, um Seiten und Buttons zu gestalten, ist das Wertvollste:

- Button-Groesse, Farbe, Abrundung und Abstaende als einheitliche Regeln definieren
- Den Rhythmus des Seitenlayouts festigen
- Sicherstellen, dass verschiedene Seiten trotz unterschiedlicher Inhalte eine einheitliche Struktursprache verwenden

## 3. Worauf man beim Entwerfen von Seiten aus den Richtlinien absehen sollte

Wenn du ein Designsystem betrachtest, frage nicht zuerst "Sieht diese Seite gut aus?", sondern stelle zunaechst die folgenden Fragen.

### 3.1 Erster Blick auf die Seite: Ist die Hierarchie klar?

Eine Seite sollte in der Regel mindestens drei Ebenen haben:

- **Hauptinformation**: Der wichtigste Inhalt der aktuellen Seite
- **Unterstuetzende Informationen**: Inhalte zum besseren Verstaendnis oder zur Ergaenzung
- **Sekundaere Aktionen**: Aktionen, die die Hauptaufgabe nicht stoeren sollten

Wenn die drei Ebenen nicht deutlich getrennt sind, wirkt die Seite "alles wichtig" -- was gleichbedeutend mit "nichts ist wichtig" ist.

### 3.2 Seitenlayout: Dient es der Aufgabe oder stapelt es nur Module?

Beim Durcharbeiten der Richtlinien solltest du besonders darauf achten:

- Ob der Titelbereich das Seitenziel klar benennt
- Ob der Hauptinhaltsbereich um die Aufgabe herum organisiert ist
- Ob die Aktions-Buttons nah an den zugehoerigen Inhalten platziert sind
- Ob unwichtige Informationen abgeschwaecht wurden

### 3.3 Haben die Aktionen auf der Seite eine Prioritaet?

Viele Seiten haben auf den ersten Blick 6 Buttons, und jeder sieht wie ein CTA aus -- das ist ein klassischer Hierarchieverlust.

Sinnvoller ist:

- Ein Bereich hat in der Regel nur eine Hauptaktion
- Sekundaere Aktionen koennen mit Umrandungen, Text-Buttons oder schwaecherem Stil dargestellt werden
- Risikoaktionen sollten nicht genauso aussehen wie die Hauptaktion

## 4. Worauf man beim Entwerfen von Buttons aus den Richtlinien absehen sollte

Buttons sind der am leichtesten "beilaeufig gestaltete" Teil, aber auch der Teil, der am meisten darueber verraet, ob ein System ausgereift ist.

### 4.1 Buttons zunaechst nach "Semantik" unterscheiden, dann nach "Stil"

Denke nicht zuerst "blauer oder schwarzer Button", sondern darueber, welche Rolle dieser Button spielt.

Haeufige Button-Rollen koennen wie folgt kategorisiert werden:

| Button-Typ | Funktion | Haeufige Stilstrategie |
| :--- | :--- | :--- |
| **Primary** | Die wichtigste Aktion im aktuellen Bereich | Ausgefuellt, hoher Kontrast, am auffaelligsten |
| **Secondary** | Unterstuetzende Aktionen | Umrandet oder eine Stufe schwaecher betont |
| **Tertiary / Text** | Schwache Aktionen | Text oder geringer visueller Anteil |
| **Destructive** | Risikoaktionen wie Loeschen, Deaktivieren, Leeren | Warnfarbe oder eindeutiger Risiko-Stil |
| **Icon button** | Lokale Werkzeugaktionen | Kompakt, nah am Kontext |

### 4.2 Nicht zu viele Primary Buttons auf einer Seite

Das ist die haeufigste Falle fuer Anfaenger.

Wenn 4 Haupt-Buttons auf einer Seite sind, gibt es faktisch keinen Haupt-Button. Die Bedeutung eines Haupt-Buttons besteht ja gerade darin, "dem Nutzer zu sagen, was er jetzt am besten tun sollte".

Du kannst die gemeinsame Praxis vieler Designsysteme uebernehmen:

- Ein Hauptbereich hat in der Regel nur einen Haupt-Button
- Abbrechen, Zurueck und Schliessen konkurrieren in der Regel nicht auf derselben Ebene mit dem Bestaetigungs-Button
- Weitere Aktionen in sekundaere Buttons oder Menus auslagern

### 4.3 Buttons muessen Zustandsaenderungen ausdruecken koennen

Designrichtlinien beschreiben Button-Zustaende in der Regel sehr detailliert:

- Standardzustand
- Hover-Zustand
- Fokus-Zustand
- Deaktivierter Zustand
- Ladezustand
- Gefahrenzustand

Das ist wichtig, da ein Button kein statisches Bild ist, sondern eines der am haeufigsten ausgeloesten Steuerelemente waehrend der Benutzerinteraktion.

### 4.4 Button-Beschriftung gehoert ebenfalls zum Design

Die Button-Beschriftung ist nicht nur eine "Textfrage" -- sie beeinflusst das Nutzerverstaendnis direkt.

Beispiele:

- `Speichern`
- `Aenderungen speichern`
- `Sofort veroeffentlichen`
- `Projekt loeschen`
- `In den Papierkorb verschieben`

Diese Beschriftungen vermitteln vollkommen unterschiedliche psychologische Erwartungen. Ausgereifte Richtlinien verlangen in der Regel, dass Button-Labels die Aktion klar ausdruecken, anstatt vage Begriffe zu verwenden.

## 5. Eine sehr praktische Checkliste fuer Seiten- und Button-Design

Wenn du selbst eine Seite entwirfst, kannst du zunaechst diese Checkliste schnell durchgehen:

### Seiten-Checkliste

- Ob der Seitentitel die aktuelle Aufgabe klar beschreibt
- Ob die wichtigste Information auf dem ersten Bildschirm sofort sichtbar ist
- Ob die Seite nach dem Aufgabenfluss und nicht nach dem organisiert ist, was einem gerade einfaellt
- Ob es in einem Bereich nur eine Hauptaktion gibt
- Ob unwichtige Inhalte angemessen abgeschwaecht wurden

### Button-Checkliste

- Ist dieser Button eine Haupt- oder Nebention?
- Warum sollte dieser Button auffaelliger sein als die anderen?
- Gibt es zu viele Haupt-Buttons auf der Seite?
- Sind Gefahrenaktionen eindeutig markiert?
- Ist die Button-Beschriftung konkret genug?

## 6. Wie man AI dazu bringt, sich an den Richtlinien anderer zu orientieren

Dieser Abschnitt ist am praktischsten.

Viele Menschen sagen zu AI beim Entwerfen von Seiten nur:

```md
Mach mir eine Einstellungsseite, die etwas hochwertiger aussehen soll, im Apple-Stil
```

Solche Prompts sind zu vage -- AI kann am Ende meist nur "weisser Hintergrund, abgerundete Ecken, Schatten" imitieren.

Fuer Anfaenger ist der praktischste Ansatz nicht, selbst eine lange Zusammenfassung zu schreiben, sondern die **Schluesselsaetze aus dem Originaltext der Richtlinie** direkt in AI einzufuegen.

Das hat zwei Vorteile:

- Du musst die Designphilosophie nicht selbst "uebersetzen"
- AI kann die Seite und die Buttons leichter gemaess den offiziellen Definitionen verstehen

### 6.1 Beispiel 1: AI bitten, eine Einstellungsseite nach Apple-Design zu erstellen

Zunaechst ein Originalzitat von Apple:

> ["Establish a clear visual hierarchy..."](https://developer.apple.com/design/human-interface-guidelines/)

Du kannst AI direkt so ansprechen:

```md
Beziehe dich auf diesen Satz aus den Apple Human Interface Guidelines:
"Establish a clear visual hierarchy..."

Erstelle eine Kontosicherheit-Einstellungsseite.
Die Seitenhierarchie soll klar sein, wichtige Informationen zuerst, ordentlich gruppiert.
```

Der Punkt dabei ist: Du musst nicht viel selbst erklaeren -- einfach den Originaltext von Apple einfuegen.

### 6.2 Beispiel 2: AI bitten, Backend-Buttons nach Fluent zu gestalten

Zunaechst ein Originalzitat von Fluent:

> ["Only use one primary button in a layout..."](https://fluent2.microsoft.design/components/web/react/core/button/usage)

Du kannst AI direkt so ansprechen:

```md
Beziehe dich auf diesen Satz aus Fluent 2:
"Only use one primary button in a layout..."

Gestalte die Buttons fuer ein Team-Management-Backend.
Der "Mitglied hinzufuegen"-Button am auffaelligsten, Export, Filter, weitere Aktionen schwaecher, und der Loeschen-Button gesondert hervorheben.
```

Dieser Satz eignet sich hervorragend fuer Anfaenger, da er AI direkt sagt: In einem Bereich nicht zu viele Haupt-Buttons platzieren.

### 6.3 Beispiel 3: AI bitten, sich gleichzeitig an Seiten- und Button-Richtlinien zu orientieren

Du kannst auch zwei Originalzitate gleichzeitig einfuegen und AI bitten, sich sowohl an der Seiten- als auch an der Button-Richtlinie zu orientieren:

> Apple: ["Establish a clear visual hierarchy..."](https://developer.apple.com/design/human-interface-guidelines/)
>
> Fluent: ["Only use one primary button in a layout..."](https://fluent2.microsoft.design/components/web/react/core/button/usage)

Dann schreibst du einfach:

```md
Beziehe dich auf die folgenden zwei Designrichtlinien-Originalsaetze:
Apple: "Establish a clear visual hierarchy..."
Fluent: "Only use one primary button in a layout..."

Erstelle eine Projektdetailseite.
Die Seite enthaelt Projektbeschreibung, Mitglieder, letzte Aktivitaeten und einen Einstellungseinstieg.
Die Seitenhierarchie soll klar sein, nur einen Haupt-Button behalten, die anderen schwaecher darstellen.
```

Dieser Ansatz eignet sich besonders fuer Anfaenger, da du nur den Originaltext kopieren und ein bis zwei Saetze eigener Anforderungen hinzufuegen musst.

## 7. Wie man AI dazu bringt, sich an Button-Richtlinien zu orientieren, um direkt Button-Designs zu generieren

Wenn du zunaechst nur Buttons erstellen moechtest, kannst du auch direkt die Originaltexte der Button-Richtlinien einfuegen.

Beispielsweise ist die Definition von Atlassian fuer Buttons sehr kurz:

> ["A button triggers an event or action."](https://atlassian.design/components/button/)

Du kannst AI so fragen:

```md
Beziehe dich auf diesen Satz von Atlassian:
"A button triggers an event or action."

Gestalte einen Satz von Backend-Button-Stilen.
Ich moechte einen Haupt-Button, einen Neben-Button und einen Loeschen-Button, und erzaehle mir bitte, wo jeweils welcher verwendet wird.
```

Diese Art von Prompt eignet sich besonders fuer Anfaenger -- im Grunde heisst es "Originaltext einfuegen + Anforderungen nennen".

## 8. Zusammenfassung

Sich an UI-Designrichtlinien zu orientieren, wenn man Seiten und Buttons entwirft, heisst nicht "auszusehen wie jemand anderes", sondern folgende Dinge zu lernen:

1. Seiten mit Hierarchie organisieren, anstatt Inhalte einfach zu stapeln
2. Operationsprioritaeten durch Button-Stufung ausdruecken, anstatt alle Buttons gleich aufdringlich zu machen
3. Sich bei der Gestaltung an den Definitionen, Grenzen und Beurteilungskriterien der Designrichtlinien orientieren
4. Wenn AI sich an den Richtlinien anderer orientiert, sollte sie sich an "Prinzipien und Struktur" orientieren, nicht nur an der Oberflaeche

Wenn du Richtlinien so verwendest, referenzierst du nicht nur einen Stil, sondern eine ausgereifte Design-Denkweise.

---

## Referenzmaterialien

Die folgenden Links stammen alle von offiziellen Designsystemen oder offizieller Dokumentation:

- Apple Human Interface Guidelines: [Overview](https://developer.apple.com/design/human-interface-guidelines/)
- Apple Human Interface Guidelines: [Menus](https://developer.apple.com/design/human-interface-guidelines/menus)
- Apple Human Interface Guidelines: [Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts)
- Apple Human Interface Guidelines: [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)
- Apple Archive: [How Menus Work](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/HowMenusWork.html)
- Apple Archive: [Managing Pop-Up Buttons and Pull-Down Lists](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html)
- Material Design: [Buttons overview](https://m3.material.io/components/buttons/overview)
- Material Design: [Menus](https://m1.material.io/components/menus.html)
- Microsoft Fluent 2: [Start designing](https://fluent2.microsoft.design/get-started/design)
- Microsoft Fluent 2: [Menu usage](https://fluent2.microsoft.design/components/web/react/core/menu/usage)
- Microsoft Fluent 2: [Button usage](https://fluent2.microsoft.design/components/web/react/core/button/usage)
- Atlassian Design System: [Foundations](https://atlassian.design/foundations/)
- Atlassian Design System: [Button](https://atlassian.design/components/button/)
