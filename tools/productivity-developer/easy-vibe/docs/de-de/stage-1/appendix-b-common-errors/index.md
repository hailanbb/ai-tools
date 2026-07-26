---
title: 'Was tun bei Fehlern im Code - Praxisleitfaden: Screenshots an die KI senden'
description: 'Lernen Sie, wie Sie der KI effizient Fragen stellen, um verschiedene Fehler bei der Entwicklung zu l&ouml;sen. Beherrschen Sie den Standardprozess aus Screenshot, Beschreibung und Problemeingrenzung und machen Sie die KI zu Ihrem Debugging-Assistenten.'
---

<script setup>
const duration = 'Etwa <strong>30 Minuten</strong>'
</script>

# Was tun bei Fehlern im Code

## Kapitel&uuml;bersicht

<ChapterIntroduction :duration="duration" :tags="['Debugging-Tipps', 'KI-Zusammenarbeit', 'Problemeingrenzung', 'Entwicklertools']" coreOutput="Ein standardisierter Fehlerbehebungsprozess" expectedOutput="90 % der h&auml;ufigen Fehler selbstst&auml;ndig beheben k&ouml;nnen">

In der KI-&Auml;ra hat sich die Art und Weise, wie man Fehler behebt, ver&auml;ndert.

Sie m&uuml;ssen nicht alle Fehlertypen auswendig kennen, kein Debugging-Experte sein und nicht einmal verstehen, was der Fehler bedeutet.

<strong>Sie m&uuml;ssen nur eines lernen: wie man die KI richtig fragt.</strong>

Dieses Kapitel vermittelt Ihnen einen <strong>von einfach bis fortgeschritten</strong> strukturierten Behebungsprozess:

1. <strong>Schritt 1: Direkt fragen</strong>: Ph&auml;nomen beschreiben + Screenshot, mit einem Satz fragen
2. <strong>Schritt 2: Informationen erg&auml;nzen</strong>: Wenn das Problem nicht gel&ouml;st werden kann, F12 &ouml;ffnen und wichtige Informationen nachreichen

Mit diesem Prozess k&ouml;nnen Sie <strong>90 % der Fehler selbst beheben</strong>.

</ChapterIntroduction>

::: info Hinweis
Alle Methoden in diesem Kapitel basieren auf praktischer Erfahrung mit KI-IDEs wie Cursor/Trae/Claude und lassen sich direkt in der t&auml;glichen Entwicklung anwenden.
:::

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Direkt fragen', description: 'Ph&auml;nomen beschreiben + Screenshot' },
      { title: 'Info erg&auml;nzen', description: 'F12 &ouml;ffnen, Problem eingrenzen' },
      { title: 'Iterativ l&ouml;sen', description: 'Bis das Problem gel&ouml;st ist' }
    ]" />
  </ClientOnly>
</div>

## 1. Kernprinzip: Screenshot an die KI senden

::: warning Warum ist dieses Kapitel so wichtig?

Viele Anf&auml;nger reagieren auf Fehlermeldungen wie folgt:
- In Panik geraten und blind Code &auml;ndern
- Eine halbe Stunde nach "Wie l&ouml;se ich den Fehler xxx" suchen
- Versuchen, selbst zu verstehen, was der Fehler bedeutet
- Sich bis nachts um drei allein durchs Debugging qu&auml;len

<strong>Das ist alles verschwendete Zeit.</strong>

In der KI-&Auml;ra ist Debugging etwas sehr Einfaches geworden:

```
Fehlermeldung sehen → Screenshot machen → KI fragen → Den Anweisungen der KI folgen
```

Sie m&uuml;ssen den Fehler nicht verstehen, nicht debuggen k&ouml;nnen und nicht einmal wissen, wo das Problem liegt.

<strong>Sie m&uuml;ssen nur lernen, wie man fragt.</strong>

:::

### 1.1 Die einfachste Fragestellung

Keine komplizierten Vorlagen n&ouml;tig -- zwei Methoden zur Auswahl:

**Methode 1: Ph&auml;nomen beschreiben**

Format: Was Sie gerade getan haben, was jetzt aufgetreten ist

```
Ich habe gerade den Code der Login-Seite ge&auml;ndert, jetzt ist die Seite wei&szlig;. Was soll ich tun?
```

**Methode 2: Screenshot**

Einfach einen Screenshot der aktuellen Seite oder Fehlermeldung machen

```
[Screenshot]

Wie l&ouml;se ich diesen Fehler?
```

**Die beste Methode: Beschreibung + Screenshot**

```
Ich habe gerade den Code der Login-Seite ge&auml;ndert, jetzt ist die Seite wei&szlig;.

[Screenshot]

Was soll ich tun?
```

**Merken: Beschreiben Sie den Kontext klar und f&uuml;gen Sie einen Screenshot hinzu -- so kann die KI das Problem schneller l&ouml;sen.**

### 1.2 Wie man das Problem klar beschreibt

Viele Anf&auml;nger wissen, dass sie fragen sollen, aber nicht, wie. Dabei gen&uuml;gt es, drei Dinge klar zu machen:

**1. Was Sie gerade getan haben**

```
Ich habe gerade auf Speichern geklickt
Ich habe gerade den Code der Login-Seite ge&auml;ndert
Ich habe gerade die Seite aktualisiert
```

**2. Was Sie jetzt sehen**

```
Die Seite ist jetzt leer
Der Button reagiert nicht auf Klicks
Jetzt wird eine Fehlermeldung angezeigt
```

**3. Welches Ergebnis Sie erzielen m&ouml;chten**

```
Ich m&ouml;chte, dass die Daten erfolgreich gespeichert werden
Ich m&ouml;chte, dass die Seite normal angezeigt wird
Ich m&ouml;chte, dass nach dem Klick auf den Button eine Meldung erscheint
```

**Vollst&auml;ndiges Beispiel:**

```
Ich habe gerade auf Speichern geklickt, jetzt zeigt die Seite den Fehler "Speichern fehlgeschlagen".

[Screenshot]

Ich m&ouml;chte, dass die Formulardaten erfolgreich in der Datenbank gespeichert werden. Was soll ich tun?
```

**Wichtige Prinzipien:**
- In einfachen Worten beschreiben, keine Fachbegriffe verwenden
- Chronologisch vorgehen: Was zuerst getan wurde, was dann passiert ist
- Die eigenen Erwartungen aussprechen, damit die KI wei&szlig;, was Sie wollen

## 2. Erster Schritt: Direkt das Ph&auml;nomen beschreiben und fragen

Wenn Sie auf ein Problem sto&szlig;en, <strong>&ouml;ffnen Sie noch nicht sofort F12</strong>. Beschreiben Sie zuerst das Ph&auml;nomen, machen Sie einen Screenshot der aktuellen Seite und geben Sie es der KI.

Oft kann die KI anhand des Screenshots direkt eine L&ouml;sung vorschlagen.

### 2.1 H&auml;ufige Ph&auml;nomene beschreiben

::: tip Einfach beschreiben

**Seite ist wei&szlig;**
```
Die Seite &ouml;ffnet sich und ist leer. Was soll ich tun?

[Screenshot]
```

**Button reagiert nicht auf Klicks**
```
Dieser Button reagiert nicht. Bitte pr&uuml;fen.

[Screenshot]
```

**Daten lassen sich nicht speichern**
```
Ich habe auf Speichern geklickt, aber die Daten wurden nicht gespeichert. Was soll ich tun?

[Screenshot]
```

**Styling stimmt nicht**
```
Dieser Button ist verschoben. Wie kann ich das anpassen?

[Screenshot]
```

**API-Fehler**
```
Beim Aufruf der Schnittstelle ist ein Fehler aufgetreten. Bitte pr&uuml;fen.

[Screenshot]
```

:::

### 2.2 Wenn die KI das Problem direkt l&ouml;st

Herzlichen Gl&uuml;ckwunsch, das Problem ist gel&ouml;st! Folgen Sie einfach den Anweisungen der KI.

### 2.3 Wenn die KI "weitere Informationen ben&ouml;tigt"

Jetzt m&uuml;ssen Sie F12 &ouml;ffnen und wichtige Informationen nachreichen. Weiter unten.

## 3. Zweiter Schritt: Wichtige Informationen erg&auml;nzen

Wenn die KI weitere Informationen ben&ouml;tigt, &ouml;ffnen Sie je nach Problemtyp F12 und erg&auml;nzen Sie die entsprechenden Inhalte.

### 3.1 Wann Informationen erg&auml;nzt werden m&uuml;ssen

Die KI k&ouml;nnte wie folgt antworten:
- "Bitte &ouml;ffnen Sie die Console und pr&uuml;fen Sie, ob Fehler vorliegen"
- "Machen Sie einen Screenshot des Network-Panels"
- "Ich ben&ouml;tige die genaue Fehlermeldung"

In diesem Fall erg&auml;nzen Sie die Screenshots anhand der folgenden Anleitung.

### 3.2 Console-Informationen erg&auml;nzen (wei&szlig;e Seite / Fehler)

::: tip Arbeitsschritte

**Schritt 1: F12 dr&uuml;cken, um die Entwicklertools zu &ouml;ffnen**

Auf dem Mac: `Cmd+Option+I`, oder Rechtsklick auf die Seite und "Untersuchen" w&auml;hlen.

**Schritt 2: Zum Tab Console wechseln**

**Schritt 3: Screenshot der roten Fehlermeldungen machen**

**Schritt 4: An die KI senden**

```
Die Console zeigt folgende Fehler:

[Screenshot]
```

:::

### 3.3 Network-Informationen erg&auml;nzen (Datenprobleme / API-Fehler)

::: tip Arbeitsschritte

**Schritt 1: F12 dr&uuml;cken, um die Entwicklertools zu &ouml;ffnen**

**Schritt 2: Zum Tab Network wechseln**

**Schritt 3: Die Aktion erneut ausf&uuml;hren** (auf Speichern klicken / Seite aktualisieren)

**Schritt 4: Die entsprechende Anfrage finden und einen Screenshot machen**

- URL und Statuscode pr&uuml;fen
- Payload (gesendete Parameter) pr&uuml;fen
- Response (R&uuml;ckgabeergebnis) pr&uuml;fen

**Schritt 5: An die KI senden**

```
Network-Informationen wie folgt:

Anfrage: [Screenshot 1]
Parameter: [Screenshot 2]
Antwort: [Screenshot 3]
```

:::

### 3.4 Elements-Informationen erg&auml;nzen (Styling-Probleme)

::: tip Arbeitsschritte

**Schritt 1: Rechtsklick auf das Element → "Untersuchen"**

Die Entwicklertools positionieren sich automatisch auf diesem Element.

**Schritt 2: Screenshot des Styles-Panels machen**

**Schritt 3: An die KI senden**

```
Element-Styling wie folgt:

[Screenshot]
```

:::

## 4. Dritter Schritt: Iterativ bis zur L&ouml;sung

### 4.1 Ineffiziente Vorgehensweisen

Diese Vorgehensweisen verschwenden Ihre Zeit:

Bei einer Fehlermeldung in Panik geraten und blind Code &auml;ndern
Eine halbe Stunde nach L&ouml;sungen suchen
Versuchen, selbst die Bedeutung jedes Fehlers zu verstehen
Sich allein bis nachts um drei durchs Debugging qu&auml;len

### 4.2 Effiziente Vorgehensweise

Gehen Sie nach diesem Prozess vor:

Zun&auml;chst das Ph&auml;nomen beschreiben und mit Screenshot fragen
Wenn die KI weitere Informationen ben&ouml;tigt, F12 &ouml;ffnen und erg&auml;nzen
Den Empfehlungen entsprechend den Code &auml;ndern
Nach der &Auml;nderung testen; falls das Problem weiterhin besteht, weiter mit Screenshot fragen

## 5. Zusammenfassung: Vollst&auml;ndiger Prozess

```
Problem aufgetreten
    ↓
Ph&auml;nomen direkt beschreiben + Screenshot
    ↓
An die KI senden: "Was soll ich tun?"
    ↓
Hat die KI das Problem direkt gel&ouml;st?
    ↓ Ja
Den Anweisungen der KI folgen
    ↓
Testen, ob das Problem gel&ouml;st ist
    ↓
    ↓ Nein / KI ben&ouml;tigt weitere Informationen
F12 &ouml;ffnen, wichtige Informationen erg&auml;nzen
    ↓
Erneut an die KI senden
    ↓
Wiederholen, bis das Problem gel&ouml;st ist
```
