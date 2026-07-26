---
title: "Que faire en cas d'erreur de code - Guide pratique pour poser des questions à l'IA"
description: "Apprenez à poser efficacement des questions à l'IA pour résoudre les erreurs de développement, maîtrisez le processus standard de capture d'écran, de description et de localisation des problèmes, et faites de l'IA votre assistant de débogage."
---

<script setup>
const duration = 'Environ <strong>30 minutes</strong>'
</script>

# Que faire en cas d'erreur de code

## Introduction du chapitre

<ChapterIntroduction :duration="duration" :tags="['Techniques de débogage', 'Collaboration IA', 'Résolution de problèmes', 'Outils de développement']" coreOutput="Un processus standardisé de résolution des erreurs" expectedOutput="Capable de résoudre 90 % des erreurs courantes de manière autonome">

À l'ère de l'IA, la façon de résoudre les erreurs a changé.

Vous n'avez pas besoin de mémoriser tous les types d'erreurs, de devenir un expert du débogage, ni même de comprendre ce que signifie l'erreur.

<strong>Vous n'avez besoin d'apprendre qu'une seule chose : comment poser des questions à l'IA.</strong>

Ce chapitre vous enseignera un processus de résolution <strong>du simple à l'avancé</strong> :

1. <strong>Première étape : Poser directement la question</strong> : décrire le phénomène + capture d'écran, poser la question en une phrase
2. <strong>Deuxième étape : Fournir des informations supplémentaires</strong> : si cela ne résout pas le problème, ouvrir F12 pour ajouter des informations clés

En maîtrisant ce processus, <strong>vous pourrez résoudre 90 % des erreurs par vous-même</strong>.

</ChapterIntroduction>

::: info Remarque
Toutes les méthodes de ce chapitre sont basées sur l'expérience réelle avec Cursor/Trae/Claude et d'autres IDE IA, et peuvent être directement appliquées au développement quotidien.
:::

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Poser directement', description: 'Décrire le phénomène + capture d\'écran' },
      { title: 'Compléter les infos', description: 'Ouvrir F12 pour localiser le problème' },
      { title: 'Résolution itérative', description: 'Jusqu\'à la résolution du problème' }
    ]" />
  </ClientOnly>
</div>

## 1. Principe fondamental : Capturer l'écran et poser la question à l'IA

::: warning Pourquoi ce chapitre est-il important ?

Beaucoup de débutants, face à une erreur, réagissent ainsi :
- Panique, et se mettent à modifier le code au hasard
- Passent une demi-heure à chercher "comment résoudre l'erreur xxx"
- Essayent de comprendre par eux-mêmes ce que signifie l'erreur
- Font du debug seul jusqu'à minuit

<strong>Tout cela est une perte de temps.</strong>

À l'ère de l'IA, le débogage est devenu une tâche simple :

```
Voir l'erreur → Capturer l'écran → Poser la question à l'IA → Suivre les instructions de l'IA
```

Vous n'avez pas besoin de comprendre l'erreur, ni de savoir déboguer, ni même de savoir où se trouve le problème.

<strong>Vous avez juste besoin d'apprendre comment poser la question.</strong>

:::

### 1.1 La façon la plus simple de poser une question

Pas besoin de modèle complexe, choisissez parmi deux méthodes :

**Méthode 1 : Décrire le phénomène**

Format : ce que vous venez de faire, ce qui apparaît maintenant

```
Je viens de modifier le code de la page de connexion, maintenant la page est blanche, que faire ?
```

**Méthode 2 : Capture d'écran**

Capturer directement la page actuelle ou le message d'erreur

```
[Capture d'écran]

Comment résoudre cette erreur ?
```

**La meilleure méthode : Description + Capture d'écran**

```
Je viens de modifier le code de la page de connexion, maintenant la page est blanche.

[Capture d'écran]

Que faire ?
```

**Retenez : Décrivez clairement le contexte, ajoutez une capture d'écran, et l'IA pourra vous aider à résoudre le problème plus rapidement.**

### 1.2 Comment bien expliquer le problème

Beaucoup de débutants savent qu'il faut poser des questions, mais ne savent pas comment s'exprimer. En réalité, il suffit d'expliquer clairement trois choses :

**1. Ce que vous venez de faire**

```
Je viens de cliquer sur le bouton Enregistrer
Je viens de modifier le code de la page de connexion
Je viens de rafraîchir la page
```

**2. Ce que vous voyez maintenant**

```
La page est vide maintenant
Le bouton ne réagit pas au clic maintenant
Un message d'erreur s'affiche maintenant
```

**3. Ce que vous voulez obtenir**

```
Je veux que les données soient enregistrées avec succès
Je veux que la page s'affiche normalement
Je veux qu'une alerte apparaisse après le clic sur le bouton
```

**Exemple complet :**

```
Je viens de cliquer sur le bouton Enregistrer, la page affiche maintenant l'erreur "Échec de l'enregistrement".

[Capture d'écran]

Je veux que les données du formulaire soient enregistrées avec succès dans la base de données, que faire ?
```

**Principes clés :**
- Décrivez dans un langage simple, sans jargon technique
- Suivez l'ordre chronologique : ce que vous avez fait d'abord, puis ce qui s'est passé
- Exprimez vos attentes pour que l'IA sache ce que vous souhaitez

## 2. Première étape : Décrire directement le phénomène

Face à un problème, <strong>ne vous précipitez pas pour ouvrir F12</strong>. Décrivez d'abord le phénomène, capturez la page actuelle, et montrez-le à l'IA.

Souvent, l'IA peut directement vous donner une solution rien qu'en voyant la capture d'écran.

### 2.1 Comment décrire les phénomènes courants

::: tip Décrivez simplement

**Page blanche**
```
La page s'ouvre mais est vide, que faire ?

[Capture d'écran]
```

**Le bouton ne réagit pas au clic**
```
Cliquer sur ce bouton ne produit aucun effet, pouvez-vous vérifier ?

[Capture d'écran]
```

**Les données ne s'enregistrent pas**
```
J'ai cliqué sur Enregistrer, les données ne sont pas sauvegardées, que faire ?

[Capture d'écran]
```

**L'affichage est incorrect**
```
Ce bouton est décalé, comment l'ajuster ?

[Capture d'écran]
```

**Erreur d'API**
```
L'appel à l'API renvoie une erreur, pouvez-vous vérifier ?

[Capture d'écran]
```

:::

### 2.2 Si l'IA a résolu directement le problème

Félicitations, le problème est résolu ! Suivez simplement les instructions de l'IA pour modifier.

### 2.3 Si l'IA dit "besoin de plus d'informations"

C'est le moment d'ouvrir F12 et de fournir des informations clés. Voyons comment.

## 3. Deuxième étape : Fournir les informations clés

Quand l'IA indique qu'elle a besoin de plus d'informations, selon le type de problème, ouvrez F12 et capturez le contenu correspondant.

### 3.1 Quand faut-il fournir des informations supplémentaires ?

L'IA peut répondre ainsi :
- "Veuillez ouvrir la Console pour voir s'il y a des erreurs"
- "Capturer le panneau Network pour que je puisse voir"
- "J'ai besoin de voir le message d'erreur spécifique"

À ce moment, suivez les instructions ci-dessous pour fournir des captures d'écran.

### 3.2 Fournir les informations de la Console (page blanche/erreur)

::: tip Étapes à suivre

**Première étape : Appuyer sur F12 pour ouvrir les outils de développement**

Sur Mac, c'est `Cmd+Option+I`, ou faites un clic droit sur la page et sélectionnez "Inspecter".

**Deuxième étape : Basculer vers l'onglet Console**

**Troisième étape : Capturer les messages d'erreur en rouge**

**Quatrième étape : Envoyer à l'IA**

```
L'erreur de la Console est la suivante :

[Capture d'écran]
```

:::

### 3.3 Fournir les informations Network (problème de données/erreur API)

::: tip Étapes à suivre

**Première étape : Appuyer sur F12 pour ouvrir les outils de développement**

**Deuxième étape : Basculer vers l'onglet Network**

**Troisième étape : Recommencer l'opération** (cliquer sur Enregistrer/rafraîchir la page)

**Quatrième étape : Trouver la requête correspondante et capturer l'écran**

- Regarder l'URL et le code d'état
- Regarder le Payload (paramètres envoyés)
- Regarder la Response (résultat retourné)

**Cinquième étape : Envoyer à l'IA**

```
Les informations Network sont les suivantes :

Requête : [Capture d'écran 1]
Paramètres : [Capture d'écran 2]
Réponse : [Capture d'écran 3]
```

:::

### 3.4 Fournir les informations Elements (problème de style)

::: tip Étapes à suivre

**Première étape : Clic droit sur l'élément → "Inspecter"**

Les outils de développement se positionneront automatiquement sur cet élément.

**Deuxième étape : Capturer le panneau Styles**

**Troisième étape : Envoyer à l'IA**

```
Le style de l'élément est le suivant :

[Capture d'écran]
```

:::

## 4. Troisième étape : Itérer jusqu'à la résolution

### 4.1 Les pratiques inefficaces

Ces pratiques vous font perdre du temps :

Voir une erreur et paniquer, se mettre à modifier le code au hasard
Passer une demi-heure à chercher une solution en ligne
Essayer de comprendre chaque erreur par soi-même
Faire du debug seul jusqu'à minuit

### 4.2 Les pratiques efficaces

Suivez ce processus :

D'abord, décrire directement le phénomène et capturer l'écran pour poser la question
Quand l'IA dit qu'elle a besoin de plus d'informations, ouvrir F12 pour compléter
Suivre les suggestions pour modifier le code
Après modification, tester, et si le problème persiste, continuer à capturer et poser la question

## 5. Résumé : Processus complet

```
Rencontrer un problème
    ↓
Décrire directement le phénomène + capture d'écran
    ↓
Envoyer à l'IA : "Que faire ?"
    ↓
L'IA résout directement ?
    ↓ Oui
Suivre les instructions de l'IA
    ↓
Tester si le problème est résolu
    ↓
    ↓ Non / L'IA a besoin de plus d'informations
Ouvrir F12, fournir les informations clés
    ↓
Renvoyer à l'IA
    ↓
Répéter jusqu'à résolution
```
