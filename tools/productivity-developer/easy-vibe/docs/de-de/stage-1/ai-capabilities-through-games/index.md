# Anfänger I: Im AI-Zeitalter reicht es zu sprechen, um programmieren zu können

Dies ist ein **auf Projekt-Based Learning basierendes** Lern-Tutorial. Wir ermutigen dich, den Schritten zu folgen und die Ergebnisse zu reproduzieren.
Keine Sorge vor Fehlern oder Änderungen – wir glauben immer an dich. Bitte behalte Folgendes im Gedächtnis:

<div style="text-align: center;">
<div style="display: inline-block; padding: 8px 20px; border-radius: 8px; border: 1px dashed #FFB6C1; background: linear-gradient(135deg, #FFF0F5 0%, #FFE4EC 100%); margin: 12px 0;">
  <span style="font-size: 15px; font-weight: 500; color: #666;">Fertigstellen ist wichtiger als Perfektion</span>
</div>
</div>

<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const duration = 'Etwa <strong>4 Stunden</strong>, in mehreren Sitzungen abschließbar'
const relatedArticles =
  relatedArticlesMap['de-de/stage-1/ai-capabilities-through-games'] ?? []
</script>

## Kapitelübersicht

<ChapterIntroduction :duration="duration" :tags="['Konversationelles AI-Programmieren', 'AI-native Mini-Spiele', 'Snake-Spiel-Praxis']" coreOutput="AI-native Snake + eigenes Mini-Spiel" expectedOutput="1 lauffähige AI-native Snake + (optional) 1 selbst erstelltes AI-native Mini-Spiel oder Demo">

Wenn du **überhaupt nicht programmieren kannst** oder nur ein wenig davon verstehst, ist dieses Kapitel genau für dich gemacht. Wir beginnen mit den Grundlagen: AI durch **Gespräche** Code schreiben zu lassen – ohne Syntax auswendig zu lernen, ohne Umgebungen einzurichten, und alles läuft direkt im Browser.

Du wirst **dein erstes lauffähiges Programm** selbst bauen – eine Snake, die „Wörter frisst, Gedichte schreibt und malt". Durch diese praktische Übung wirst du erleben, wie sich AI-Programmieren wirklich anfühlt: Nicht dass AI dein Denken ersetzt, sondern dass du deine Ideen aussprichst und AI sie umsetzt.

Alle Kreationen beginnen bei 0 und werden zu 1. Wir freuen uns, dir Selbstvertrauen und Professionalität zu vermitteln. Für dich gilt: **Ausführungsfähigkeit is all you need**.

</ChapterIntroduction>

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Herausforderungen & Chancen', description: 'Neue Möglichkeiten für normale Menschen' },
      { title: 'Fähigkeiten erkunden', description: '60-Sekunden-Schnellstart' },
      { title: 'Native Praxis', description: 'AI-native Snake bauen' },
      { title: 'Kreativer Ausbau', description: 'Weitere Spiele entwickeln' }
    ]" />
  </ClientOnly>
</div>

## 1. Herausforderungen und Chancen für normale Menschen

Viele Menschen haben den Kopf voller Produktideen: ein kleines Tool zur Budgetverwaltung, eine Webseite, die das Wachstum des Kindes dokumentiert, oder sogar ein kleines Spiel. Aber sobald sie an Code oder Programmierer denken, werden sie sofort abgeschreckt.

Seit dem Aufkommen von AI gibt es erstmals eine völlig neue Möglichkeit für normale Menschen: Du musst nicht programmieren können, du musst nur lernen, AI klar zu sagen, was du willst. Daten von GitHub Copilot [zeigen](https://www.wearetenet.com/blog/github-copilot-usage-data-statistics), dass über 15 Millionen Entwickler AI-gestütztes Programmieren nutzen und im Durchschnitt 46% des Codes von AI generiert wird! Bei Java-Projekten liegt dieser Anteil bei 61%.

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px;">
  <template #header>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 20px;">🚀</span>
      <span style="font-weight: bold; font-size: 16px;">Effizienz- und Adaptionssteigerung</span>
    </div>
  </template>
  
  <el-row :gutter="20" style="margin-bottom: 24px;">
    <el-col :span="6" :xs="12">
      <div style="text-align: center; padding: 10px;">
        <div style="color: #409EFF; font-size: 24px; font-weight: bold;">55%</div>
        <div style="color: #909399; font-size: 12px; margin-top: 4px;">Geschwindigkeitssteigerung</div>
      </div>
    </el-col>
    <el-col :span="6" :xs="12">
      <div style="text-align: center; padding: 10px;">
        <div style="color: #67C23A; font-size: 24px; font-weight: bold;">2.4 <span style="font-size: 14px;">Tage</span></div>
        <div style="color: #909399; font-size: 12px; margin-top: 4px;">Aufgabendauer (vorher 9.6 Tage)</div>
      </div>
    </el-col>
    <el-col :span="6" :xs="12">
      <div style="text-align: center; padding: 10px;">
        <div style="color: #E6A23C; font-size: 24px; font-weight: bold;">81%</div>
        <div style="color: #909399; font-size: 12px; margin-top: 4px;">Ersttags-Installationsrate</div>
      </div>
    </el-col>
    <el-col :span="6" :xs="12">
      <div style="text-align: center; padding: 10px;">
        <div style="color: #F56C6C; font-size: 24px; font-weight: bold;">96%</div>
        <div style="color: #909399; font-size: 12px; margin-top: 4px;">Vorschlagsannahmerate</div>
      </div>
    </el-col>
  </el-row>

  <div style="line-height: 1.8; color: #606266;">
    Was wirklich begeistert, ist der Sprung in der Effizienz: Die Geschwindigkeit bei der Aufgabenerledigung stieg um <b>55%</b>. Was früher 9,6 Tage brauchte, ist jetzt in <b>2,4 Tagen</b> erledigt. Dieser sichtbare Effizienzgewinn zeigt, dass AI nicht mehr nur ein „optionales Werkzeug" ist, sondern zu einem unverzichtbaren Programmierassistenten im Entwicklungsprozess wird. Die Adaptionsraten bestätigen dies: Am Tag der Zugangsgewährung installierten <b>81%</b> der Entwickler sofort und begannen es zu nutzen; davon <b>96%</b> übernahmen noch am selben Tag AI-generierte Codevorschläge. Mit anderen Worten: Entwickler integrierten AI fast sofort in ihre tägliche Arbeit.
  </div>
</el-card>

Für normale Menschen ist dieser Trend noch bedeutsamer: Wenn selbst professionelle Programmierer stark auf AI angewiesen sind, um Code zu schreiben, **warum sollten wir, die nicht programmieren können, nicht direkt mit AI sprechen, um unsere Ideen umzusetzen?**

Das Ziel dieses Kurses ist es, dir eine neue Fähigkeit beizubringen: Anwendungen durch natürliche Sprachgespräche zu erstellen. Wir bringen dir bei, wie du mit AI in der Sprache des Computers kommunizierst und wie du AI dazu bringst, die Ideen in deinem Kopf in echte, nutzbare Produkte zu verwandeln.

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="1" :items="[
      { title: 'Herausforderungen & Chancen', description: 'Neue Möglichkeiten für normale Menschen' },
      { title: 'Fähigkeiten erkunden', description: '60-Sekunden-Schnellstart' },
      { title: 'Native Praxis', description: 'AI-native Snake bauen' },
      { title: 'Kreativer Ausbau', description: 'Weitere Spiele entwickeln' }
    ]" />
  </ClientOnly>
</div>

## 2. Wie weit kann AI dich bringen?

In diesem Abschnitt diskutieren wir nur eine Frage: Wenn du überhaupt nicht programmieren kannst, wieweit kann die heutige AI dich bringen?

Grob gesagt kannst du die Fähigkeiten aktueller Modelle so verstehen: Sie können **einfache interne Tools**, **Daten-Visualisierungs-Dashboards** und einige **leichte Mini-Spiele** entwickeln. Diese Fähigkeiten reichen für **eigene Tools** und für die **Validierung von Anforderungen aus der Perspektive eines Produktmanagers** völlig aus. Um jedoch per Knopfdruck ein **marktreifes, ausgereiftes Produkt** zu generieren, ist in der Regel immer noch menschliche Arbeit bei der **Prozessgestaltung**, **Detailoptimierung** und fortlaufenden Verbesserung nötig.

Schauen wir uns als Nächstes am Beispiel des Snake-Spiels an, wieweit AI-Programmieren tatsächlich gehen kann.

### 2.1 Ein Snake-Spiel in 60 Sekunden

Öffne zunächst die experimentelle Webseite [z.ai](https://chat.z.ai/), die im Tutorial verwendet wird. `z.ai` ist eine von Zhipu AI (einem der führenden chinesischen Sprachmodellunternehmen) entwickelte AI-Plattform, deren Kernfunktionen von Zhipus selbstentwickelter GLM-Serie bereitgestellt werden. Die Plattform integriert mehrere AI-Funktionen, darunter Folien-Generierung, Poster-Design und Full-Stack-Entwicklung. In diesem Tutorial konzentrieren wir uns auf die Nutzung des Full-Stack-Entwicklungsmoduls.

::: details 💡 Was ist das neue Paradigma „Programmieren im Browser"?

Früher erforderte die Entwicklung einer Webanwendung:
- Installation einer Programmierumgebung (z. B. Python, Node.js)
- Einrichtung eines Code-Editors
- Erlernen von Sprachen wie HTML/CSS/JavaScript
- Bewältigung von Abhängigkeiten und Fehlern

Heute reicht es mit AI-Programmierplattformen aus:
- Browser öffnen, Webseite aufrufen
- Gewünschte Funktionen in natürlicher Sprache beschreiben
- AI generiert automatisch Code und zeigt Echtzeitvorschau

Dieses Paradigma „Gespräch als Programmierung" verwandelt das Programmieren vom „Code schreiben" zum „Anforderungen beschreiben". Du musst dich nicht um technische Details kümmern, sondern musst AI nur klar sagen, was du willst, und es verwandelt deine Ideen in lauffähige Programme. Das ist das neue Paradigma des Programmierens im AI-Zeitalter – **Vibe Coding**.
:::

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/index-2026-01-07-18-25-03.png)

Gib nach der Eingabe unserer einfachen Anforderung auf **Full-Stack-Entwicklung** klicken, kannst du den kompletten Erstellungsprozess der Webseite in Echtzeit beobachten. Normalerweise reicht die Zeit für eine Tasse Kaffee, und die Webseite ist automatisch fertig!

```
Erstelle ein Snake-Spiel für mich:
1. Steuerung der Schlange mit Pfeiltasten
2. Die Schlange wird nach dem Fressen von Nahrung länger und der Punktestand erhöht sich
3. Das Spiel endet bei Kollision mit Wänden oder dem eigenen Körper
4. Es sollte Start- und Neustart-Buttons geben
5. Die Oberfläche soll übersichtlich und ansprechend sein
```

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/index-2026-01-07-18-34-03.png)

Nach der Generierung siehst du rechts eine durchblätterbare Weboberfläche. Du kannst nach oben und unten scrollen, um den Seiteninhalt zu betrachten, oder oben auf die 🧭 -Schaltfläche klicken, um in den Vollbildmodus zu wechseln.

> Von links nach rechts oben: Pfeil-Schaltfläche öffnet die Seitenleiste mit dem Gesprächsverlauf, Stift-Schaltfläche für einen neuen Dialog, Kreisschaltfläche aktualisiert die Seite, Kompass-Schaltfläche schaltet in den Vollbildmodus, Download-Schaltfläche lädt das Projekt herunter, <>-Schaltfläche schaltet zur Code-Ansicht, Publish-Schaltfläche veröffentlicht das Projekt.

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/index-2026-01-07-18-35-11.png)

Wenn du den Quellcode der Webseite anzeigen möchtest, klicke auf das Code-Symbol oben rechts, um den vollständigen Code zu sehen.

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image7.png)

::: tip 🌐 Entdecke weitere AI-Programmierwerkzeuge

Neben z.ai empfehlen wir dir, auch folgende hervorragende AI-Programmierplattformen auszuprobieren:

| Werkzeug | Adresse | Merkmale |
|------|------|------|
| **Google AI Studio** (empfohlen) | [aistudio.google.com/apps](https://aistudio.google.com/apps) | Offizielles Google-Produkt, unterstützt Gemini-Modelle, geeignet für schnelle Prototypenentwicklung |
| **Figma Make** | [figma.com/make](https://www.figma.com/make) | Tiefe Integration mit Designwerkzeugen, geeignet für Designer zur schnellen Erstellung interaktiver Prototypen |
| **Coze** | [coze.com](https://www.coze.cn) | AI-Bot-Plattform von ByteDance, bietet No-Code-Visuellerstellung. Tiefe Integration mit nationalen Modellen wie Doubao und Kimi, unterstützt Plugin-Marktplatz, geplante Aufgaben und Multi-Kanal-Publishing |
| **v0.dev** | [v0.dev](https://v0.dev) | AI-UI-Generierungstool von Vercel, generiert lauffähige React-Komponenten-Code aus Beschreibungen |
| **Bolt.new** | [bolt.new](https://bolt.new) | AI-Full-Stack-Entwicklungsplattform von StackBlitz, generiert und deployt komplette Webanwendungen |
| **Lovable** | [lovable.dev](https://lovable.dev) | Spezialisiert auf hochwertige React-Anwendungen, unterstützt GitHub-Integration und One-Click-Deployment |
| **Replit Agent** | [replit.com](https://replit.com) | Online IDE mit integriertem AI-Programmierassistenten, unterstützt mehrere Sprachen und Echtzeit-Zusammenarbeit |

Für einen detaillierten Vergleich und Tutorial zu Web-Programmierwerkzeugen siehe unsere Ergänzungslektüre: [Vergleich von 7 Vibe-Coding-Plattformen](../../stage-1/appendix-articles/example0-1/vibe-coding-tools-snake-game-tutorial.md)
:::

### 2.2 Was kann und was kann konversationelles Programmieren?

Dieser Abschnitt konzentriert sich auf eine konkrete Frage: Wenn du dich nur auf konversationelle AI verlässt und keinen Code schreibst, wieweit kann es die Dinge vorantreiben?

Auf Erfahrungsebene lautet eine relativ stabile Schlussfolgerung: Es kann dir helfen, etwas „kleines, aber Vollständiges" zu erstellen, aber „wann ist es genug" musst du bei jedem Schritt selbst entscheiden.

#### Besser bei „kleinen und klaren" Anwendungen

Aus dem vorherigen Snake-Beispiel hast du bereits ein typisches Muster gesehen:
Solange du die Oberfläche und Interaktion klar beschreiben kannst, kann AI normalerweise innerhalb weniger Gesprächsrunden eine vollständige Webseite erstellen, die sich öffnen, anklicken und spielen lässt.

Solche Aufgaben haben oft gemeinsame Merkmale:

- Klaren Umfang: eine Webseite, ein einfaches internes Tool, ein kleines Spielprinzip
- Sichtbare Ergebnisse: Du kannst sofort im Browser überprüfen, ob es wie erwartet funktioniert
- Direkte Fehlerbehebung: Bei Problemen kannst du in nachfolgenden Gesprächen spezifische Phänomene beschreiben und Korrekturen anfordern (durch Kopieren von Fehlern oder Screenshots)

Innerhalb dieser Grenzen kannst du konversationelle AI als einen „Hilfsentwickler mit guter Ausführung" betrachten. Du musst nur in jeder Runde die Anforderungen in natürlicher Sprache verfeinern und korrigieren, um schnell einen brauchbaren Prototyp zu erhalten.

**Erfolgsquote von AI bei kleinen Projekten:**
<el-progress :percentage="90" :stroke-width="15" status="success" striped striped-flow />

#### Große Projekte brauchen eine „Prozessperspektive"

Sobald du den Bereich „klein und klar" verlässt und erwartest, dass AI mit wenigen Gesprächsrunden ein komplexes System End-to-End erstellt, wirst du schnell an Grenzen stoßen. Große Projekte müssen Backends anbinden, Datenbanken verbinden, Drittanbieterdienste integrieren und betreffen Berechtigungen, Sicherheit, Nebenläufigkeit und viele Geschäftsregeln – das Ziel ist die Lieferung eines kompletten Systems, nicht einer einzigen Webseite.

In diesem Fall ist es vernünftiger, nicht alle Anforderungen auf einmal an AI zu werfen, sondern zuerst einen klaren Gesamtprozess zu skizzieren: Was sind die Schlüsselschritte, was sind die Eingaben, Ausgaben und Zustandsänderungen bei jedem Schritt, und welche Knoten sind am empfindlichsten für Leistung und Sicherheit. Basierend auf diesem Prozessdiagramm kannst du relativ unabhängige Schritte herauslösen und der konversationellen AI zur Generierung von Schnittstellen, Modulen, Skripten und Tests übergeben.

Nach aktueller Leistungsfähigkeit ist AI besser darin, einzelne kleine Schritte zu beschleunigen, während du (oder dein Team) entscheidest, wie die Schritte aufgeteilt und verknüpft werden, sowie für die endgültige Architektur, Systemintegration und den Betrieb verantwortlich bist.

#### Der Unterschied zwischen „können schreiben" und „brauchbar sein"

Auf den ersten Blick scheint AI alles zu können, aber wie brauchbar sind diese Dinge wirklich, und wieweit? Wie sollten wir das einordnen?

Eine hilfreiche Faustregel:

::: warning ⚠️ Leitfaden für Anwendungsszenarien

- **Prototyp / Demo / internes Tool**: Sehr geeignet, um von AI die erste Version erstellen zu lassen, dann selbst Details zu iterieren.
- **Große Produkte für echte Nutzer**: Erfordert normalerweise langfristiges Engagement von Ingenieuren in Architektur, Abstraktion, Leistung und Wartung.
- **Stark sicherheits- oder compliancekritische Systeme** (z. B. Zahlung, Risikokontrolle, Medizin): In der aktuellen Phase sollte man nicht „generieren und sofort live schalten"; es muss strenge Prüf- und Testprozesse geben.
  :::

Heutzutage kannst du AI relativ beruhigt als effizienten Partner für Demos und interne Tools betrachten:
Solange du bereit bist, mehr zu testen, mehr zu iterieren und ein paar Runden „Hier stimmt etwas nicht, bitte korrigiere es und erkläre warum" zu spielen, ist die Qualität auf Prototyp- und Tool-Ebene normalerweise ausreichend und hat praktischen Wert.

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="2" :items="[
      { title: 'Herausforderungen & Chancen', description: 'Neue Möglichkeiten für normale Menschen' },
      { title: 'Fähigkeiten erkunden', description: '60-Sekunden-Schnellstart' },
      { title: 'Native Praxis', description: 'AI-native Snake bauen' },
      { title: 'Kreativer Ausbau', description: 'Weitere Spiele entwickeln' }
    ]" />
  </ClientOnly>
</div>

## 3. Praxis: Deine erste AI-native Anwendung

Kommen wir zum praktischen Teil. Im vorherigen Abschnitt haben wir mit AI schnell einen spielbaren Snake-Prototyp erstellt und grob verstanden, was AI kann und was nicht. Als Nächstes lernen wir, wie man mit grundlegenden **Vibe Coding**-Techniken eine **moderne** AI-native Snake erstellt. Wir lassen die Schlange Textzeichen statt Bohnen fressen. Am Ende soll das Spiel basierend auf den gefressenen Textzeichen ein Gedicht und ein Bild generieren.
Durch dieses praktische Beispiel verstehst du den Kern des neuen Programmierparadigmas: Wie man Anforderungen klar in natürlicher Sprache ausdrückt.

### 3.1 AI-native Snake

Am Anfang können wir auf die einfachste Weise mit dem großen Modell sprechen, was uns hilft, schnell einen Produktprototyp zu erhalten. Gib einfach im Chat ein:

> **💡 Beispiel-Prompt:** Erstelle ein Snake-Spiel für mich
>
> ![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image12.png)

> **💡 Beispiel-Prompt:** Erstelle ein Snake-Spiel, das Folgendes unterstützen soll:
>
> 1. Ich kann verschiedene Wörter fressen, die in einer Box gesammelt werden
>    ![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image13.png)

> **💡 Beispiel-Prompt:** Erstelle ein Snake-Spiel, das Folgendes unterstützen soll:
>
> 1. Ich kann verschiedene Wörter fressen, die in einer Box gesammelt werden
> 2. Wenn die Schlange 8 Wörter gefressen hat, soll das LLM basierend auf diesen Wörtern ein Gedicht erstellen; wir können das Gedicht nach Bedarf neu mischen.
> 3. Nach Abschluss des Gedichts wird automatisch ein Bild basierend auf dem Gedicht erstellt.
>
> ![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image14.png)

Beachte, dass während der Entwicklung Probleme auftreten können, bei denen zum Beispiel das Klicken auf einen Button keine Reaktion zeigt, Fehler bei der Nutzung von Funktionen auftreten, Funktionen nicht wie erwartet arbeiten oder die Frontend-Oberfläche nicht dem erwarteten Design entspricht.

In diesem Fall müssen wir das Modell weiter fragen, um diese unerwarteten Probleme zu beheben.

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image15.png)

### 3.2 Neue Funktionen zum Spiel hinzufügen

Nachdem die Grundfunktionen fertig sind, können wir versuchen, unserem Programm einige neue Extras hinzuzufügen! Wenn du das Fressen von Wörtern oder Zeichen zu langweilig findest, kannst du die Schlange Wörter in verschiedenen Farben fressen lassen und entsprechend die Farbe der Schlange ändern.

Du kannst auch Spezialeffekte für den „Fress"-Vorgang hinzufügen oder magische Wörter einführen, die Effekte auslösen – zum Beispiel die Geschwindigkeit oder Größe der Schlange erhöhen. Eine andere Idee ist, bei jedem gefressenen Wort ein Gedicht und ein Bild generieren zu lassen, anstatt bis zu acht Wörtern zu warten.

Wenn das zu anspruchsvoll klingt, kannst du das Sprachmoduell direkt um Hilfe bitten! Es kann kreative Vorschläge machen, um dein Spiel interessanter zu gestalten. Probier es aus!

```
1. „Wörter-entfesseln-Welten"-Mechanismus
Jedes Mal, wenn die Schlange ein Wort frisst, assoziiert das LLM poetisch damit (z. B. „Baum" → „Wald", „Schatten") und das Bildmodell erstellt sofort ein kleines Kunstwerk für dieses Wort. Diese Bilder setzen sich nach und nach zu einem einzigartigen, vom Spieler geschaffenen Panorama zusammen, sodass der Spieler bei jedem Durchlauf „malend und dichtend" spielt.

2. „Gedicht-Puzzle"-Gameplay
Jedes gefressene Wort löst das LLM aus, einen kurzen Vers zu generieren, und das Bildmodell erstellt eine Illustration. Diese Verse und Bilder setzen sich wie ein Puzzle zusammen und bilden am Ende einer Runde ein AI-gestaffeltes Gedicht und Bild.

3. „Magische Wörter" & „Story-Verzweigungen"
Besondere „magische Wörter" (z. B. „Wind", „Nacht", „Traum") lösen nicht nur LLM-Gedichte aus, sondern ändern auch die Stimmung oder das Thema der Szene – der Stil der Bildgenerierung wechselt zu Nacht, Sturm oder traumhafter Atmosphäre.
Story-Verzweigung: Das LLM gibt zu Beginn ein Thema oder Rätsel (z. B. „Herbsterinnerungen"). Die Wortwahl des Spielers beeinflusst direkt die Entwicklung der Geschichte und der Gedichte, und das Bildmodell aktualisiert Hintergrund und visuelle Effekte in Echtzeit.

4. „Echtzeit-Interaktionsgenerierung"
Nach jedem Wort generiert das LLM eine Dialogzeile oder Beschreibung; NPCs im Spiel können mit dem Spieler „sprechen" oder die Umgebung ändert sich entsprechend.
Das Aussehen der Schlange oder die Hindernisse im Spiel können sich basierend auf den gefressenen Wörtern visuell verändern – dank des Bildmodells.

5. „Kreation & Teilen"
Spieler können am Ende der Sitzung ihre AI-kreierten Gedichte und Bilder speichern und teilen und ihre einzigartige „AI-Kollaboration" präsentieren.
Bestenlisten für „Schönstes Gedicht + Kunst", „Kreativste Wortkombination" etc., die Replayability und Kreativität fördern.

6. „Satz-Snake"-Herausforderung
Umgekehrter Modus: Das LLM gibt einen Vers oder ein Rätsel, und der Spieler muss die Schlange leiten, um die Wörter in der richtigen Reihenfolge zu fressen und den Satz zu rekonstruieren. Falsche Wörter lösen über das Bildgenerierungsmodell lustige oder künstlerische Konsequenzen aus.

7. „Themen-Level" & „Stilauswahl"
Zu Beginn des Spiels wählt der Spieler ein Thema (z. B. „Märchen", „Sci-Fi", „Tang-Gedichte"); LLM und Bildmodell passen Wortauswahl, Gedichtstil und visuelle Effekte entsprechend an, sodass jeder Durchlauf frisch wirkt.

8. „Live-Zusammenarbeit"
Wenn ein spezielles Wort gefressen wird, kann das LLM den Spieler auffordern, einen Satz oder Stil einzugeben, und generiert dann entsprechende Verse und Illustrationen – eine echte Mensch-AI-Kollaboration.

9. „AI-Easter Eggs & Erfolge"
Bestimmte Wortkombinationen werden vom LLM als spezielle Themen oder interne Witze erkannt (z. B. „Mond", „Osmanthus", „Flussufer") und lösen seltene Verse und Illustrationen aus, die Erkundung belohnen.

10. „Wachsende Geschichte"
Mit dem Wachsen der Schlange generiert das LLM ein fortlaufendes Geschichtsgedicht, und das Bildmodell erstellt ein nahtloses langes Scroll- oder Panorama-Bild, sodass der Spieler gleichzeitig „schreibt, malt und spielt".
```

Darüber hinaus können wir das LLM bitten, projektweite Prompts für uns zu generieren. Im vorherigen Abschnitt haben wir nur selbst den Prompt für das Snake-Spiel geschrieben. Lass uns jetzt versuchen, das Modell einen Prompt mit einem Gesamtframework und Implementierungspfad generieren zu lassen (du kannst das direkt mit z.ai machen).

Wenn du lernen möchtest, bessere Prompts zu schreiben, siehe das [Prompt-Engineering-Appendix](/zh-cn/appendix/8-artificial-intelligence/prompt-engineering).

> Ich möchte, dass AI ein Web-Snake-Spiel generiert. Ich brauche einen umfassenderen Prompt, damit das Ergebnis beeindruckender und interessanter wird. Bitte generiere einen entsprechenden Prompt. Das aktuelle Ziel ist: ein Snake-Spiel zu generieren, das die Funktion des Fressens verschiedener Wörter zur Gedichtgenerierung implementieren soll und ein Bildgenerierungsmodul enthalten sollte.

Die Antwort von z.ai wird ungefähr so aussehen:

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image56.png)

Wir können diesen Prompt verwenden, um das Projekt im Full-Stack-Modus neu zu generieren:

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image57.png)

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image58.png)

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="3" :items="[
      { title: 'Herausforderungen & Chancen', description: 'Neue Möglichkeiten für normale Menschen' },
      { title: 'Fähigkeiten erkunden', description: '60-Sekunden-Schnellstart' },
      { title: 'Native Praxis', description: 'AI-native Snake bauen' },
      { title: 'Kreativer Ausbau', description: 'Weitere Spiele entwickeln' }
    ]" />
  </ClientOnly>
</div>

### 3.3 Versuche, andere Mini-Spiele zu erstellen

Neben dem Snake-Spiel können wir der Fantasie freien Lauf lassen.

Erschaffe alles, was du willst, versuche sogar, alles kaputt zu machen! Und dann fang von vorne an!

```
1. AI-Kunstgalerie-Plattform
   Beschreibung: Eine Online-Galerie zur Präsentation von AI-generierter Kunst, auf der Nutzer Werke hochladen, teilen und kommentieren können.
   Funktionen: Nutzerkontosystem, Kunstwerk-Upload und -Präsentation, Bewertungssystem, Kategorisierungsbrowser, AI-Generierungstool-Integration.
   Technische Highlights: React/Vue-Frontend, Node.js-Backend, MongoDB-Datenbank, AI-API-Integration.

2. Retro-Spiele-Archiv
   Beschreibung: Eine Website, die klassische Spiele ehrt, mit Spielgeschichte, Spielanleitungen und online spielbaren Retro-Spielen.
   Funktionen: Spieledatenbank, Zeitstrahl-Anzeige, Online-Emulator, Nutzerkommentare, Spielsammlung.
   Technische Highlights: Responsive Design, WebGL/Canvas-Spiele, RESTful API, Nutzer-Authentifizierungssystem.

3. Nachhaltiger-Lebensstil-Tracker
   Beschreibung: Eine Website, die Nutzern hilft, ihren CO2-Fußabdruck durch Umweltschutztipps und Community-Challenges zu verfolgen und zu reduzieren.
   Funktionen: Persönlicher CO2-Rechner, Zielsetzung, Fortschrittsverfolgung, Community-Challenges, Umweltschutzwissensdatenbank.
   Technische Highlights: Datenvisualisierung, mobile Optimierung, Social-Funktionen, Push-Benachrichtigungen.

4. Virtuelle-Küchen-Assistent
   Beschreibung: Eine AI-basierte Kochberatungsplattform mit personalisierten Rezeptvorschlägen und Schritt-für-Schritt-Kochanweisungen.
   Funktionen: Rezeptdatenbank, Zutatenerkennung, personalisierte Empfehlungen, Küchentimer, Nährwertanalyse.
   Technische Highlights: Bilderkennungs-API, ML-Empfehlungssystem, Sprachsteuerung, Echtzeit-Videoführung.

5. Indie-Musik-Entdeckungsplattform
   Beschreibung: Eine Musikstreaming-Plattform, die sich auf unabhängige und aufstrebende Künstler konzentriert, mit einzigartigem Entdeckungserlebnis.
   Funktionen: Musikstreaming, Künstlerprofile, personalisierte Empfehlungen, Playlist-Erstellung, Community-Bewertungen.
   Technische Highlights: Audio-Stream-Verarbeitung, Empfehlungsalgorithmus, Social-Funktionen, Musikvisualisierung.

6. Minimalistische Aufgabenverwaltung
   Beschreibung: Ein Aufgabenverwaltungstool mit zen-ästhetischem Design, das sich auf einfache und effiziente Aufgabenorganisation konzentriert.
   Funktionen: Aufgabenerstellung und -kategorisierung, Prioritäteneinstellung, Fortschrittsverfolgung, Teamzusammenarbeit, Datenanalyse.
   Technische Highlights: Minimalistisches UI-Design, Drag-and-Drop, Echtzeit-Synchronisation, plattformübergreifende Kompatibilität.

7. Sci-Fi-Schreibwerkstatt
   Beschreibung: Eine Plattform für Sci-Fi-Autoren mit kreativen Werkzeugen und Inspiration, einschließlich Worldbuilding-Hilfe und Charakterentwicklungstools.
   Funktionen: Geschichtenstrukturwerkzeuge, Charakterprofile, Worldbuilding-Vorlagen, Schreibstatistiken, Community-Feedback.
   Technische Highlights: Rich-Text-Editor, Datenvisualisierung, kollaboratives Editieren, AI-gestützte Kreation.

8. Persönliches Wissens-Graph
   Beschreibung: Ein Tool, das Nutzern hilft, persönliche Wissensnetzwerke aufzubauen und verschiedene Ideen und Informationen zu visualisieren und zu verknüpfen.
   Funktionen: Knotenerstellung und -verknüpfung, Tag-System, Suchfunktion, Import/Export-Werkzeuge, Visualisierungsdiagramme.
   Technische Highlights: Graph-Datenbank, Datenvisualisierungsalgorithmen, Markdown-Unterstützung, geräteübergreifende Synchronisation.

9. Virtueller Pflanzengarten
   Beschreibung: Eine interaktive Pflanzenenzyklopädie, in der Nutzer die Pflanzenwelt erkunden und virtuelle Gärten anlegen können.
   Funktionen: Pflanzendatenbank, 3D-Pflanzenmodelle, Wachstumssimulation, Gartenbauanleitung, Community-Showcase.
   Technische Highlights: 3D-Rendering, saisonale Wechselsimulation, AR-Integration, Pflanzen-Identifikations-API.

10. Programmier-Challenge-Arena
    Beschreibung: Eine Online-Wettbewerbsplattform für Programmierer mit verschiedenen Schwierigkeitsstufen.
    Funktionen: Herausforderungsaufgaben, Code-Editor, automatische Bewertung, Bestenliste, Lernpfad.
    Technische Highlights: Code-Sandbox-Umgebung, Echtzeit-Bewertungssystem, Algorithmus-Visualisierung, Social-Learning-Funktionen.
```

Und noch mehr... Wenn du gerne spielst, lass uns gemeinsam versuchen, Spiele zu erschaffen!

```
1. 3D Open-World RPG
   Beschreibung: Ein Fantasy-RPG mit weitläufiger Open World, Quests und Charakterentwicklung.
   Funktionen: Tag-Nacht-Zyklus, dynamisches Wetter, Skill-Baum, Multiplayer-Koop, Handwerkssystem.
   Technische Highlights: Three.js oder Babylon.js für 3D-Rendering, serverseitige Spiellogik, Charakteranpassung, Save-System.

2. Ego-Shooter (FPS) Arena
   Beschreibung: Ein schnelles Multiplayer-FPS mit verschiedenen Spielmodi und Karten.
   Funktionen: Team-Deathmatch, Capture-the-Flag, Waffenanpassung, Rangliste.
   Technische Highlights: WebGL/Three.js für 3D-Grafik, Multiplayer-Netzwerkcode, Treffererkennung, Voice-Chat.

3. AI-Schach und Multiplayer
   Beschreibung: Eine voll funktionsfähige Schachplattform mit AI-Gegnern und Online-Multiplayer.
   Funktionen: AI-Schwierigkeitsstufen, Endspiel-Herausforderungen, Turniermodus, Replay-Analyse.
   Technische Highlights: Schachlogikbibliothek, WebSocket für Echtzeit-Multiplayer, ELO-Ranglistensystem, Anti-Cheat.

4. Mahjong Online-Multiplayer
   Beschreibung: Ein traditionelles Mahjong-Spiel mit Online-Multiplayer und Punktestand.
   Funktionen: Mehrere Regelwerke, private Räume, Ranglistensystem, Replay-Funktion.
   Technische Highlights: Tile-Matching-Logik, Echtzeit-Multiplayer, Lobby-System, Punktestand-Tracking.

5. Rundenbasiertes Strategiespiel
   Beschreibung: Ein taktisches Strategiespiel mit Raster-Kampf und Einheitenverwaltung.
   Funktionen: Kampagnenmodus, Gefechtsmodus, Einheitenupgrade, Nebel des Krieges, Multiplayer.
   Technische Highlights: Raster-Bewegungssystem, AI-Entscheidungsfindung, Runden-Synchronisation, Save/Load-System.

6. Zeitfahren-Rennspiel
   Beschreibung: Ein 3D-Rennspiel mit Fokus auf Zeitfahren und Streckenrekorde.
   Funktionen: Mehrere Strecken, Autoanpassung, Geister-Replay, Bestenliste.
   Technische Highlights: 3D-Auto-Physik, Streckeneditor, Replay-System, Online-Bestenliste.

7. Kartenspiel (Deck-Building)
   Beschreibung: Ein strategisches Kartenspiel, in dem Spieler Decks bauen und gegen Gegner antreten.
   Funktionen: Kartensammlung, Deck-Building, Rangliste, Saison-Events.
   Technische Highlights: Kartenspiellogik, Matchmaking-System, AI-Gegner, Kartenanimationen.

8. Battle Royale (Top-Down 2D)
   Beschreibung: Ein Top-Down-2D-Battle-Royale mit schrumpfender Spielzone und Loot-Mechanik.
   Funktionen: Solo- und Squad-Modus, Waffenvielfalt, In-Game-Events, Bestenliste.
   Technische Highlights: Echtzeit-Multiplayer, Zonen-Schrumpfungslogik, Loot-Spawn-System, Matchmaking.

9. Horror-Überlebensspiel (Ego-Perspektive)
   Beschreibung: Ein Ego-Perspektive-Horrorspiel mit Ressourcenmanagement und Fluchtmechanik.
   Funktionen: Atmosphärische Umgebung, Rätsel, Enemy-AI, Multiple Endings.
   Technische Highlights: Dynamische Beleuchtung, Sound-Design, Enemy-Pathfinding, Save-System.

10. Rhythmus-Musikspiel (3D)
    Beschreibung: Ein 3D-Rhythmus-Spiel, in dem Spieler im Takt der Musik Noten treffen.
    Funktionen: Mehrere Schwierigkeitsstufen, Streckeneditor, Custom-Song-Unterstützung, Bestenliste.
    Technische Highlights: Audioanalyse, Beat-Synchronisation, 3D-Noten-Spuren, Input-Timing-Erkennung.
```

## 📚 Assignment

<el-card id="assignment-card" shadow="hover" style="margin: 20px 0; border-radius: 12px;">
  <template #header>
    <div style="font-weight: bold; font-size: 16px;">🎯 Kapitelaufgabe: Erstelle deine erste AI-native Mini-Spiele</div>
  </template>

  <p>
    In diesem Abschnitt hast du den kompletten Prozess von „Gespräch-generiertes Snake" bis zum „Verständnis des AI-native Mini-Spiel-Design-Gedankens" durchlaufen. Die folgende Aufgabe hilft dir, dieses Verständnis in echte Fähigkeiten umzuwandeln.
  </p>

  <ol>
    <li>
      <strong>Reproduziere das AI-native Snake-Spiel vollständig</strong>
      <ul>
        <li>Mindestens implementiert: Die Schlange kann sich bewegen, nach dem Fressen von „Nahrung" ändern sich Länge und Punktestand, Kollision mit Wänden oder dem eigenen Körper beendet das Spiel.</li>
        <li>Während der Reproduktion übe, Fehlerphänomene + Fehlermeldungen + relevante Code-Snippets zusammen an AI zu übergeben und es um Korrektur im „Anfängermodus" zu bitten.</li>
      </ul>
    </li>
    <li>
      <strong>(Optional) Erstelle 1 AI-native Mini-Spiel oder Demo</strong>
      <ul>
        <li>Kann jedes leichte Gameplay rund um Text, Bilder, Musik oder Rhythmus sein, z. B. „Wörter fressen und Gedichte schreiben", „Rhythmus-Tippen", „Generatives Endless Runner" etc.</li>
        <li>Der Fokus liegt nicht auf aufwendiger Grafik, sondern darauf, dass du klar sagen kannst: Wobei hat AI konkret geholfen, und welches „schwer manuell Machbare oder Umständliche" es gelöst hat.</li>
      </ul>
    </li>
  </ol>

  <p>
    Das ist das komplette Tutorial! Du brauchst möglicherweise <strong>4 Stunden</strong>, um alle Inhalte abzuschließen und dein eigenes Snake-Spiel zu bauen. Keine Eile – erkunde, experimentiere und genieße den Prozess. Wenn du auf Konzepte stößt, die du nicht verstehst, schau in den Anhang unten.
  </p>
</el-card>

## Anhang

<el-card id="appendix-nav" shadow="hover" style="margin-top: 24px; margin-bottom: 24px; border-left: 5px solid #67C23A;">
  <div style="font-weight: bold; margin-bottom: 8px;">Anhang-Navigation</div>
  <div style="color: #606266; font-size: 14px; line-height: 1.6; margin-bottom: 12px;">
    Hier sind einige grundlegende Konzepte zu diesem Kapitel: Wenn du beim Lernen auf Fragen wie „Was ist Frontend?" oder „Was genau ist Vibe Coding?" stößt, kannst du jederzeit hier nachschlagen.
  </div>
  <el-row :gutter="16">
    <el-col :span="12">
      <a href="#appendix-1" style="text-decoration: none; color: inherit;"><b>Anhang 1: Brauchen wir Frontend-Entwicklungswissen?</b></a><br/>
      <span style="font-size: 12px; color: #909399">Verstehe die Rolle des Frontends in einer Anwendung und was „sichtbar" bedeutet.</span>
    </el-col>
    <el-col :span="12">
      <a href="#appendix-2" style="text-decoration: none; color: inherit;"><b>Anhang 2: Was genau ist Vibe Coding</b></a><br/>
      <span style="font-size: 12px; color: #909399">Verstehe den Kerngedanken des „konversationellen Entwickelns" und wie man mit AI zusammenarbeitet.</span>
    </el-col>
  </el-row>
  <el-row :gutter="16" style="margin-top: 10px;">
    <el-col :span="12">
      <a href="#appendix-3" style="text-decoration: none; color: inherit;"><b>Anhang 3: Modellkontext</b></a><br/>
      <span style="font-size: 12px; color: #909399">Verstehe Konzepte wie „Kontextlänge", die oft gehört aber leicht verwechselt werden.</span>
    </el-col>
    <el-col :span="12">
      <a href="#appendix-4" style="text-decoration: none; color: inherit;"><b>Anhang 4: Instruction-Following-Fähigkeit</b></a><br/>
      <span style="font-size: 12px; color: #909399">Verstehe, warum Modelle manchmal „nicht zuhören", und wie man klarer schreibt.</span>
    </el-col>
  </el-row>
  <div style="margin-top: 12px; font-size: 12px; color: #909399;">
    Tipp: Du kannst mit Ctrl/⌘+F nach Stichwörten suchen oder unverständliche Abschnitte an AI kopieren, um sie im „komplett für Anfänger verständlichen" Modus erklären zu lassen.
  </div>
</el-card>

## <span id="appendix-1">[Anhang 1: Brauchen wir Frontend-Entwicklungswissen?](#appendix-nav)</span>

::: tip 💡 Ein Satz zusammengefasst
Du musst nicht programmieren können, aber Grundkenntnisse helfen dir, Anforderungen besser an AI zu beschreiben.
:::

<el-row :gutter="16" style="margin: 20px 0;">
  <el-col :span="12" :xs="24" style="margin-bottom: 16px;">
    <el-card shadow="hover" style="border-radius: 12px; height: 100%;">
      <template #header>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 20px;">👁️</span>
          <span style="font-weight: bold;">Frontend</span>
          <el-tag type="success" size="small">Sichtbar</el-tag>
        </div>
      </template>
      <div style="color: #606266; line-height: 1.8;">
        Alles, was Nutzer <strong>sehen und anklicken</strong> können
        <ul style="margin: 12px 0; padding-left: 20px;">
          <li>Webseiten-Titel, Text, Bilder</li>
          <li>Schaltflächen, Eingabefelder, Dropdown-Menüs</li>
          <li>Spieloberfläche, Animationen</li>
        </ul>
      </div>
    </el-card>
  </el-col>
  <el-col :span="12" :xs="24" style="margin-bottom: 16px;">
    <el-card shadow="hover" style="border-radius: 12px; height: 100%;">
      <template #header>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 20px;">⚙️</span>
          <span style="font-weight: bold;">Backend</span>
          <el-tag type="info" size="small">Unsichtbar</el-tag>
        </div>
      </template>
      <div style="color: #606266; line-height: 1.8;">
        Datenverarbeitung auf dem Server
        <ul style="margin: 12px 0; padding-left: 20px;">
          <li>Nutzerpunktestand-Speicherung</li>
          <li>Login-Authentifizierung</li>
          <li>Level-Inhaltsvergabe</li>
        </ul>
      </div>
    </el-card>
  </el-col>
</el-row>

### Frontend-Dreiercombo

Der Browser baut Seiten mit drei Arten von „Code":

<el-tabs type="border-card" style="margin: 20px 0;">
  <el-tab-pane label="🏗️ HTML - Struktur">
    <div style="padding: 10px;">
      <p><strong>Funktion:</strong> Definiert, <strong>welche</strong> Elemente auf der Seite vorhanden sind</p>
      <p><strong>Analogy:</strong> Strukturskizze eines Hauses (wo Wände, Türen, Fenster sind)</p>
      <el-card style="background: #f5f7fa; margin-top: 12px;">
        <pre style="margin: 0;"><code>&lt;button&gt;Klick mich&lt;/button&gt;
&lt;h1&gt;Überschrift&lt;/h1&gt;
&lt;img src="photo.png"&gt;</code></pre>
      </el-card>
    </div>
  </el-tab-pane>
  <el-tab-pane label="🎨 CSS - Stil">
    <div style="padding: 10px;">
      <p><strong>Funktion:</strong> Steuert, <strong>wie</strong> Elemente aussehen</p>
      <p><strong>Analogy:</strong> Inneneinrichtung eines Hauses (Farbe, Material, Layout)</p>
      <el-card style="background: #f5f7fa; margin-top: 12px;">
        <pre style="margin: 0;"><code>button {
  background: blue;
  color: white;
  border-radius: 8px;
}</code></pre>
      </el-card>
    </div>
  </el-tab-pane>
  <el-tab-pane label="⚡ JavaScript - Verhalten">
    <div style="padding: 10px;">
      <p><strong>Funktion:</strong> Lässt die Seite <strong>interaktiv</strong> werden</p>
      <p><strong>Analogy:</strong> Elektrische Schalter eines Hauses (Reaktion auf Klicks)</p>
      <el-card style="background: #f5f7fa; margin-top: 12px;">
        <pre style="margin: 0;"><code>button.onclick = () => {
  alert('Du hast mich geklickt!')
}</code></pre>
      </el-card>
    </div>
  </el-tab-pane>
</el-tabs>

### Wie wird Code zur Seite?

Wenn du eine Webseite öffnest, verarbeitet der Browser drei Arten von Code nacheinander:

**1. HTML – Seitenstruktur definieren**
Der Browser parst zuerst HTML, versteht, welche Elemente vorhanden sind (Überschriften, Absätze, Bilder, Buttons usw.) und ihre Hierarchie.

**2. CSS – Stile anwenden**
Dann wendet der Browser CSS-Regeln an und fügt den Elementen Stile hinzu: Farbe, Größe, Position, Abstand usw., damit die Seite ansprechend wird.

**3. JavaScript – Interaktion hinzufügen**
Schließlich wird JavaScript ausgeführt, um die Seite „lebendig" zu machen: auf Klicks reagieren, Formulare absenden, Animationen abspielen usw.

**4. Seitendarstellung**
Das Zusammenspiel dieser drei ergibt die Webseite, die du schließlich siehst.

### Moderne Frontend-Frameworks: Von HTML zu React/Vue

Die zuvor vorgestellte HTML/CSS/JavaScript-Dreiercombo ist die Grundlage aller Webseiten. Wenn Seiten jedoch komplexer werden, stößt die direkte Nutzung auf Herausforderungen: Code ist schwer wartbar, viel Wiederholung, komplizierte Datensynchronisation.

**Moderne Frontend-Frameworks** (wie React, Vue, Angular) bauen auf HTML/CSS/JS auf und machen die Entwicklung effizienter:

**1. HTML/CSS/JS (Grundstufe)**
Direkte Manipulation von Seitenelementen, geeignet für einfache Seiten. Bei wachsendem Code vermischen sich alle Logiken, was die Wartung erschwert.

**2. jQuery (Übergangsphase)**
Vereinfachte DOM-Manipulation, machte Code übersichtlicher. Aber Seitenstatus musste weiterhin manuell verwaltet werden, bei Datenänderungen mussten selbst die entsprechenden Elemente gefunden und aktualisiert werden.

**3. React/Vue (Moderne Phase)**
Nutzt komponentenbasierte und zustandsgesteuerte Designs:
- **Komponenten**: Zerlegt die Seite in unabhängige, wiederverwendbare Module (wie Buttons, Karten, Navigationsleisten)
- **Zustandsgesteuert**: Bei Datenänderungen aktualisiert das Framework automatisch die entsprechende Oberfläche, ohne manuelle Eingriffe

::: tip 💡 Einfach verstanden
- **HTML/CSS/JS** = Grundmaterialien (Ziegel, Zement, Bewehrung)
- **React/Vue** = Baugerüst (stellt Regeln und Werkzeuge für den Hausbau bereit)

Im Zeitalter des AI-gestützten Programmierens musst du nicht alle Details von Frameworks verstehen; es reicht, die Grundkonzepte zu kennen, um AI durch natürliche Sprachbeschreibungen Code generieren zu lassen.
:::

### Im Vibe Coding

**Kernpunkt: Du musst keinen Code schreiben, du musst nur beschreiben können.**

Nach dem Verständnis von Frontend-Konzepten kannst du Anforderungen so an AI beschreiben:

> „Erstelle mit React eine Bestenliste-Seite: rechts die Punkteliste, bei Klick auf eine Zeile werden unten die Spielerdetails angezeigt, im minimalistischen modernen Stil."

Wenn du HTML, CSS, JavaScript und andere Frontend-Grundlagen vertiefen möchtest, siehe das [Web-Basics-Appendix](/zh-cn/appendix/3-browser-and-frontend/javascript-deep-dive). Für die Entwicklungsgeschichte der Frontend-Technologie siehe das [Frontend-Evolutionsgeschichte-Appendix](/zh-cn/appendix/3-browser-and-frontend/frontend-frameworks).

## <span id="appendix-2">[Anhang 2: Was genau ist Vibe Coding](#appendix-nav)</span>

> 💡 Was ist Vibe Coding? Der Informatiker [Andrej Karpathy](https://karpathy.ai/) (Mitbegründer von OpenAI, ehemaliger AI-Chef bei Tesla) prägte im Februar 2025 den Begriff **Vibe Coding**. Dieser Begriff beschreibt eine Programmiermethode, die auf LLMs basiert und **es Programmierern ermöglicht, lauffähigen Code durch natürliche Sprachbeschreibungen statt manuelles Codieren zu generieren.**

![1767350588191](../../../zh-cn/stage-1/ai-capabilities-through-games/images/1767350588191.png)

Wörtlich verstanden kann Vibe Coding als „Entwicklung durch Sprechen" verstanden werden. Der Kernwandel besteht darin: Du musst nicht mehr selbst Code Zeile für Zeile schreiben, Syntax nachschlagen und Bugs beheben; stattdessen beschreibst du in natürlicher Sprache, was du willst, z. B.:

„Ich brauche eine Login-Seite mit Eingabefeld für Handynummer und Bestätigungscode."
„Nach erfolgreichem Login Weiterleitung zur Startseite mit Benutzername oben rechts."
„Ein einfaches Snake-Minispiel mit Tastatursteuerung."

Große Sprachmodelle (LLM) übersetzen solche Beschreibungen automatisch in wirklich lauffähigen Code und generieren die entsprechende Seiten, Logik und Datenstrukturen. Nachdem du das Ergebnis gesehen hast, kannst du mit natürlicher Sprache Änderungswünsche äußern, z. B. „Button etwas größer", „Hintergrund dunkler", „Punktestand speichern und Bestenliste anzeigen", und AI passt die Implementierung weiter an.

In diesem Modus musst du nicht erst eine Programmiersprache lernen, um Code zu schreiben; stattdessen konzentrierst du dich darauf: klar zu beschreiben, was getan werden soll, das Ergebnis zu beurteilen und neue Änderungen vorzuschlagen. AI übernimmt die Umsetzung dieser übergeordneten Ideen in konkrete Implementierung und reduziert so mechanische, repetitive Codierungsarbeit erheblich.

Für weitere Details zu Vibe Coding siehe: [https://www.ibm.com/think/topics/vibe-coding](https://www.ibm.com/think/topics/vibe-coding)

Für mehr von Karpathys Gedanken siehe: [https://karpathy.bearblog.dev/blog/](https://karpathy.bearblog.dev/blog/)

### Wie man sich als Vibe-Coding-Meister ausgibt

In der Praxis werden beim echten Vibe Coding oft keine komplexen Prompts verwendet. Vielleicht brauchst du am Anfang einen konkreten, etwas komplexen Prompt für das gesamte Programm, aber danach genügen oft einfache Prompts wie diese:

```
"Es gibt einen Bug im Code, bitte beheben."
"Ich will keinen Teil-Code, gib mir den kompletten korrigierten Code."
"Dein Code hat immer noch Probleme."
"Bitte korrigiere erneut und gib den vollständigen korrigierten Code."
"Es lief vorhin, warum geht es jetzt nicht mehr?"
"Hast du mich nicht verstanden? Ändere nicht meinen ursprünglichen Code."
"Füge keine Debugging-Funktionen hinzu."
"Tu nichts, was ich nicht verlangt habe."
"Wo ist die Funktion, die ich verlangt habe?"
"Verstehst du nicht, was ich sage?"
"Ich brauche nur eine Funktion."
"Ich habe dir gesagt, meinen vorherigen Code zu beachten."
"Bitte füge keine unnötigen Kommentare hinzu."
"Bitte ändere nicht die grundlegende Logik meines ursprünglichen Codes."
"Hilf mir, den Code zu ändern."
"Ändere basierend auf meinem Code..."
"Ändere nicht meine Variablennamen!!!"
"Ändere nicht die ursprünglichen Funktionsnamen!"
"Rühr nicht an meinen Variablen."
"Füge keine zusätzlichen Funktionen hinzu."
"Generiere nicht nur ein Gerüst, sondern vollständigen Code."
```

Das mag übertrieben klingen, aber in der Praxis sind das genau die Prompts, die wir täglich verwenden können. Wegen der **Kontextlängenbegrenzung** großer Sprachmodelle oder weil ihre **Instruction-Following-Fähigkeit** nicht immer stark ist, kann das Modell Inhalte vergessen, die früher im Gespräch besprochen wurden. Beim Vibe Coding bevorzugen wir Modelle mit langem Kontext und starker Instruction-Following-Fähigkeit; wir können dies anhand von Rankings oder Metriken beurteilen.

Alternativ neigen Modelle dazu, im Stil ihrer Trainingsdaten zu antworten. Manche sprechen sehr formell, andere mögen viele Verzierungen, und einige Modelle mögen es, viele Kommentare oder unnötige Module im Code hinzuzufügen.

## <span id="appendix-3">[Anhang 3: Modellkontext](#appendix-nav)</span>

Modellkontext kann als das Kurzzeitgedächtnis von AI verstanden werden. Er bezieht sich auf alle Textinhalte, die das Modell in einer einzelnen Konversation oder Aufgabe „sehen" und „erinnern" kann, einschließlich deiner vorherigen Fragen, Systemanweisungen, relevante Materialien usw.

Gerade wegen des Kontexts kann AI verstehen, dass du eine Frage stellst, die sich auf frühere Inhalte bezieht, und kann runde für runde, scheinbar kohärente natürliche Gespräche führen. Ohne Kontext würde jede deiner Aussagen im Modell wie eine völlig neue Frage wirken, und es könnte nicht wissen, was du zuvor gesagt hast.

Jedes Modell hat seine eigene effektive Kontextlänge (Context Window). Diese wird normalerweise in Token (grob als „Wortfragmente") gemessen; aktuell liegen die meisten Modelle zwischen 32k und 128k Token. Je länger der Kontext, desto mehr kann das Modell „lesen", z. B.:

- Einmal eine längere Arbeit oder einen Bericht lesen
- In einem Gespräch mehrere Quellen und Fälle referenzieren
- Das Modell komplexe Diskussionsergebnisse aus früheren Runden merken lassen

Wenn deine Eingabe die Kontextbegrenzung des Modells erreicht oder überschreitet, treten häufig folgende Phänomene auf:

- Das Modell beginnt, Details oder Schlüsselinformationen aus längeren Texten zu vergessen
- Im weiteren Verlauf des Gesprächs weicht das Thema vom ursprünglichen Ziel ab
- Zwischen verschiedenen Fragen zum selben Material sind die referenzierten Inhalte inkonsistent

Diese Phänomene bedeuten nicht, dass das Modell plötzlich „dümmer" wird, sondern sind natürliche Folgen, wenn die Kontextkapazität erschöpft oder fast erschöpft ist.

In der Praxis wünscht man sich sowohl einen möglichst langen Kontext als auch das Bewusstsein:
- Je länger der Kontext, desto mehr Rechenressourcen werden verbraucht
- Die entsprechenden Aufrufkosten steigen ebenfalls

Daher muss man bei der Entwicklung von AI-Anwendungen eine Balance finden zwischen dem, was das Modell sehen kann, und der Kostenkontrolle sowie Effizienzsteigerung. Zum Beispiel:
- Informationen, die langfristig erhalten bleiben müssen, werden aufbereitet, bevor sie dem Modell übergeben werden
- Unnötige Details werden nicht immer wieder unverändert in den Kontext gestopft
- Externe Wissensdatenbanken übergeben „langfristiges Gedächtnis" an das System, anstatt es in den Modellkontext zu quetschen

## <span id="appendix-4">[Anhang 4: Instruction-Following-Fähigkeit](#appendix-nav)</span>

Die Instruction-Following-Fähigkeit bezieht sich darauf: Ob das Modell nach dem Verstehen deiner Anweisung in der Lage ist, diese korrekt und vollständig auszuführen. Sie umfasst nicht nur die Beantwortung von Fragen, sondern auch die Ausführung von Aufgaben im angegebenen Format, Stil und mit den angegebenen Schritten.

Zum Beispiel sind folgende Anweisungen mit klaren Anforderungen:

- Fasse diesen Artikel in drei Hauptpunkte zusammen
- Schreibe eine höfliche Antwort-E-Mail im formellen Stil
- Übersetze dieses Wort ins Englische und bilde jeweils einen Beispielsatz
- Extrahiere Autor, Datum und Hauptereignis aus dem Artikel

Ein Modell mit starker Instruction-Following-Fähigkeit hat normalerweise folgende Eigenschaften:

- Ausgabe in der geforderten Menge  
  Wenn drei Hauptpunkte gefordert werden, werden nicht fünf geliefert.
- Abdeckung aller angegebenen Elemente  
  Wenn Autor, Datum und Ereignis gefordert werden, wird keines davon weggelassen.
- Einhaltung des angegebenen Formats und Stils  
  Wenn ein formeller Stil gefordert wird, wird keine zu umgangssprachliche Antwort geliefert.
- Keine unnötigen zusätzlichen Erweiterungen  
  Wenn nur Übersetzung und Beispielsatz gefordert werden, wird kein großer irrelevanter Erklärungsblock ausgegeben.

In der Praxis ist eine starke Instruction-Following-Fähigkeit aus folgenden Gründen sehr wichtig:

- Verbesserte Stabilität: Bei gleicher Anweisung sind Ausgabestruktur und Verhaltensmuster über verschiedene Zeitpunkte und bei mehrfacher Ausführung konsistenter, ohne willkürliche Ergänzungen
- Verbesserte Reproduzierbarkeit: Wenn du einen Prompt in ein Produkt oder einen Prozess integrierst, kannst du erwarten, wie das Modell grob antwortet, was Testen und Iteration erleichtert
- Einfachere Systemintegration: Wenn die Modellausgabe dem erwarteten Format entspricht, ist die automatische Anbindung an Backend-Programme, Workflows oder andere Tools einfacher

Daher sollte man bei der Auswahl und Bewertung eines großen Sprachmodells neben Intelligenz und Wissensabdeckung besonders auf seine Instruction-Following-Fähigkeit achten. Für industrielle Anwendungen ist oft wichtiger, ob es stabil und korrekt Anweisungen ausführen kann, als gelegentlich eine beeindruckende Antwort zu liefern.

<RelatedArticlesSection
  title="Weiterlernen"
  description="Von der spielerischen Erfahrung ausgehend, empfehlen wir dir, zur lokalen Entwicklung und Produktpraxis überzugehen."
  :items="relatedArticles"
/>
---
title: 'Anfaenger 1: Im KI-Zeitalter reicht Reden zum Programmieren'
description: 'Baue eine AI-native Snake-Variante per Dialog und uebertrage den Workflow auf dein eigenes Mini-Spiel oder Demo.'
---
