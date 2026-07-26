# Concevoir des pages et des boutons en référençant les guidelines UI

Beaucoup de gens disent « Je voudrais que ma page ressemble davantage à Apple » ou « J'aimerais des boutons plus sophistiqués », mais quand il s'agit de passer à l'action, ils se heurtent souvent à une question :

**Que faut-il référencer exactement ?**

Copier des captures d'écran ne vous apprend qu'à « ressembler ou non ». Mais en ouvrant les guidelines de design d'Apple, Google, Microsoft et Atlassian, vous découvrirez que leur véritable force n'est pas le style visuel, mais la **manière dont ils expliquent clairement les problèmes de design** : ce qu'une page doit mettre en avant, comment hiérarchiser les boutons, comment mettre en évidence les actions — ces critères de jugement sont le cœur du sujet.

> Référencer les guidelines de design n'a pas pour but de « ressembler à quelqu'un », mais d'apprendre comment les autres prennent des décisions.

:::: info Pourquoi apprendre cela aujourd'hui encore
Les règles de design ont déjà été intégrées dans les modèles par l'entraînement, absorbées par défaut dans les outils de conception, et même assimilées par l'IA à partir de quelques captures d'écran. Mais il reste nécessaire de savoir d'où viennent ces règles et pourquoi elles sont ainsi définies.
::::

## Quelques citations originales pour mesurer l'écart

Si vous pensiez que « les guidelines de design, c'est juste parler de style », lisez d'abord quelques citations officielles.

Dans une équipe, on entend souvent dire des choses comme :

- Fais un menu déroulant
- Mets un menu ici
- Ajoute quelques fonctionnalités dans la barre de menus
- Mets deux boutons ici, un pour confirmer et un pour annuler

Cela semble correct, mais dans les guidelines des grandes entreprises, ces termes ne sont pas des concepts flous — ils sont décomposés de manière très précise.

| Ce qu'on dit couramment | Citation officielle | En résumé |
| :--- | :--- | :--- |
| « Fais un menu » | Apple : [« A menu reveals its options... »](https://developer.apple.com/design/human-interface-guidelines/menus) | `Menu` sert à effectuer des actions |
| « Mets des fonctionnalités dans la barre de menus » | Apple : [« menu bar menus contain all the commands... »](https://developer.apple.com/design/human-interface-guidelines/menus) | C'est le menu de commandes de l'application en haut |
| « Fais un menu déroulant » | Apple : [« A pop-up list lets the user choose one option among several. »](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html) | `pop-up` sert à choisir une option dans une liste |
| « Fais aussi un menu déroulant » | Apple : [« A pull-down list is generally used for selecting commands in a specific context. »](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html) | `pull-down` sert à déclencher des commandes dans le contexte actuel |
| « Un menu peut aussi servir à filtrer » | Fluent : [« If you need to collect information from people, try a select, dropdown, or combobox instead. »](https://fluent2.microsoft.design/components/web/react/core/menu/usage) | `Menu` ne sert pas à sélectionner des valeurs |
| « Un menu peut servir de navigation » | Material : [« Menus should not be used as a primary method for navigation within an app. »](https://m1.material.io/components/menus.html) | `Menu` n'est pas une navigation principale |
| « Mets juste OK / Annuler sur les boutons » | Apple : [« Always use 'Cancel' to title a button that cancels the alert's action. »](https://developer.apple.com/design/human-interface-guidelines/alerts) | Le texte des boutons ne s'écrit pas au hasard |

> Les citations du tableau sont toutes cliquables et renvoient vers les pages officielles correspondantes.

C'est la chose qui frappe le plus quand on lit vraiment des guidelines de design pour la première fois :

> Quand nous pensons discuter d'UI, la plupart du temps nous ne faisons que communiquer avec un tas de termes vagues.

Apple ne dit pas simplement « fais un menu » ; elle continue à distinguer :

- `menu`
- `menu bar menu`
- `pop-up button`
- `pull-down button`
- `context menu`

Fluent ne dit pas simplement « menu déroulant » ; elle continue à distinguer :

- `menu`
- `dropdown`
- `select`
- `combobox`

C'est ça, la nécessité des guidelines de design.

Ce n'est pas pour rendre les pages plus professionnelles, mais pour que l'équipe, lorsqu'elle discute d'UI, n'ait plus chacun une idée différente en tête.

## Ce que vous allez apprendre

1. Pourquoi il faut consulter les guidelines de design avant de concevoir des pages et des boutons
2. Quels contenus des guidelines d'Apple, Material, Fluent et Atlassian méritent le plus d'attention
3. Comment concevoir clairement la « hiérarchie des pages » et la « hiérarchie des boutons »
4. Comment faire en sorte que l'IA référence les guidelines des autres pour générer des pages et des boutons

## 1. Pourquoi les guidelines de design vous aident à clarifier les pages

Après avoir lu les citations ci-dessus, vous remarquerez un point essentiel :

**Les guidelines de design ne sont pas la cerise sur le gâteau, elles servent d'abord à employer les bons termes.**

Beaucoup de pages ne sont pas belles non pas parce que les couleurs ne sont pas assez sophistiquées, mais parce que la hiérarchie de l'information est chaotique.

Beaucoup de boutons ne sont pas pratiques non pas parce que les coins arrondis sont mal choisis, mais parce que :

- Il y a trop de boutons principaux, l'utilisateur ne sait pas lequel cliquer
- Les boutons dangereux et les boutons normaux se ressemblent
- Tous les boutons de la page se disputent l'attention
- Les styles et la sémantique des boutons sont incohérents d'une page à l'autre

Les guidelines de design matures résolvent précisément ces problèmes. Elles définissent généralement :

| Contenu de la guideline | Quel problème elle résout |
| :--- | :--- |
| **Hiérarchie des pages** | Que regarder en premier, ensuite, comment organiser l'information |
| **Fondements visuels** | Couleurs, espacements, typographie, coins arrondis, ombres — comment uniformiser |
| **Hiérarchie des boutons** | Comment distinguer les boutons principaux, secondaires, textuels et dangereux |
| **Règles d'états** | Comment afficher hover, focus, disabled, loading |
| **Sémantique d'interaction** | Quel bouton est « confirmer », lequel est « annuler », lequel est « plus d'actions » |

Ainsi, ce que les guidelines de design fournissent véritablement, ce n'est pas un « habillage », mais un ensemble de **critères de jugement**.

## 2. Que regarder en priorité dans les guidelines des grandes entreprises

### 2.1 Référencer Apple : apprendre à « définir les choses assez finement »

Ce qu'il y a de plus précieux chez Apple, ce n'est pas seulement la retenue visuelle, mais le fait qu'elle définit les concepts de manière très précise.

Pour ce que beaucoup d'équilles appellent « menu » ou « menu déroulant », Apple va encore plus loin :

- `menu` : un ensemble de commandes, d'options ou d'états
- `menu bar menu` : collection de commandes au niveau de l'application
- `pop-up button` : choisir une valeur
- `pull-down button` : déclencher une commande dans le contexte actuel
- `context menu` : actions courantes liées à l'objet ou à la tâche en cours

Cette distinction est très importante, car elle affecte directement :

- Ce composant sert-il à choisir une valeur ou à effectuer une action
- Appartient-il à une partie de la page ou au niveau de l'application
- Doit-il afficher en permanence la valeur sélectionnée ou s'ouvrir temporairement pour des commandes

Quand vous commencez à penser à ce niveau de granularité, vos pages deviennent immédiatement beaucoup plus claires.

### 2.2 Référencer Apple : apprendre la hiérarchie des pages et la retenue

Les Apple Human Interface Guidelines sont particulièrement adaptées pour apprendre deux choses :

- Comment établir une hiérarchie claire dans une page
- Comment les contrôles restent explicites sans voler la vedette

Apple met l'accent sur `Hierarchy`, `Harmony`, `Consistency`. Cela signifie que la conception de la page doit répondre à :

- Quelle est l'information la plus importante de la page actuelle
- Quelle est la tâche principale de l'utilisateur
- Quelle action doit être la plus visible, et quelle action doit s'effacer

Si vous référencez Apple pour concevoir des pages, vous pouvez vous inspirer de :

- Ne pas trop fragmenter l'information au-dessus de la ligne de flottaison, concentrez-vous d'abord sur le contenu essentiel
- Utiliser l'espace blanc, la taille de police et le regroupement pour établir l'ordre, plutôt qu'empiler des bordures
- Ne pas mettre tous les boutons en forte emphase, seules les actions clés doivent être les plus visibles

### 2.3 Référencer Material : apprendre une structure de page claire

Material Design est très adapté pour apprendre « comment une page organise les flux de tâches ».

Beaucoup de ses composants et spécifications de mise en page ont pour cœur de vous aider à clarifier :

- La page est-elle de type navigation ou exécution de tâche
- La page actuelle demande-t-elle à l'utilisateur de lire, de choisir ou de soumettre
- Dans une page, quels éléments doivent être stables et répétés, et quels éléments doivent répondre aux changements de contexte

Si vous référencez Material pour concevoir des pages, vous pouvez vous inspirer de :

- Des blocs de page clairs, avec des responsabilités de modules bien définies
- Une répartition claire entre navigation, zone de contenu et zone d'actions
- Des styles de boutons différents correspondant à des priorités d'action différentes

### 2.4 Référencer Fluent : apprendre les frontières des composants et la hiérarchie des boutons

Fluent 2 est très adapté aux back-offices, aux produits de type outils et aux systèmes de formulaires complexes. Son point le plus précieux est qu'il vous dit directement « ne mélangez pas les concepts ».

Par exemple, il indique clairement : si vous devez « collect information », n'utilisez plus `menu`, mais envisagez plutôt `select`, `dropdown`, `combobox`.

Cette phrase est très importante, car elle brise l'idée que beaucoup de gens se font que « c'est à peu près pareil ».

Fluent 2 attache aussi beaucoup d'importance à :

- La hiérarchie des actions
- Les frontières sémantiques des composants
- La clarté dans les scénarios d'information dense

Si vous référencez Fluent pour concevoir des boutons, vous pouvez vous inspirer de :

- `Primary button` pour l'action la plus importante de la zone
- `Secondary button` pour les actions de support
- Les boutons à faible emphase comme `Subtle`, `Transparent` pour les actions qui ne doivent pas perturber le flux principal
- Plus il y a de boutons dans une page, plus il faut contrôler la priorité visuelle

### 2.5 Référencer Atlassian : apprendre à gérer systématiquement les pages et les boutons

L'Atlassian Design System est particulièrement adapté quand « une équipe travaille sur beaucoup de pages ». Il met l'accent sur :

- Les foundations comme base partagée
- Les tokens comme méthode d'unification des décisions visuelles
- Les components comme éléments d'interaction réutilisables

Si vous référencez Atlassian pour les pages et les boutons, le plus précieux est :

- Faire des règles uniformes pour la taille, la couleur, les coins arrondis et l'espacement des boutons
- Fixer le rythme de la mise en page
- Faire en sorte que des pages différentes, au contenu différent, partagent le même langage structurel

## 3. Quand vous concevez des pages, quels points des guidelines devez-vous consulter

Quand vous consultez un système de design, ne demandez pas d'abord « cette page est-elle jolie », mais posez d'abord les questions suivantes.

### 3.1 Au premier coup d'œil, la priorité est-elle claire

Une page comporte généralement au moins trois niveaux :

- **Information principale** : le contenu le plus important de la page actuelle
- **Information secondaire** : contenu aidant à comprendre ou à compléter
- **Actions secondaires** : actions qui ne doivent pas perturber la tâche principale

Si les trois niveaux ne sont pas séparés, la page sera « tout est important », ce qui équivaut à « rien n'est important ».

### 3.2 La mise en page sert-elle la tâche plutôt qu'elle n'empile des modules

En consultant les guidelines, prêtez attention à :

- La zone de titre indique-t-elle clairement l'objectif de la page
- La zone de contenu principal est-elle organisée autour de la tâche
- Les boutons d'action sont-ils proches du contenu associé
- L'information secondaire est-elle atténuée

### 3.3 Les actions dans la page ont-elles une priorité

Beaucoup de pages montrent 6 boutons d'un coup, et chacun ressemble à un CTA — c'est typique d'une hiérarchie hors de contrôle.

Une approche plus raisonnable :

- Une zone ne comporte généralement qu'une seule action principale
- Les actions secondaires peuvent utiliser des styles à bordure, textuels ou plus discrets
- Les actions à risque ne doivent pas ressembler à l'action principale

## 4. Quand vous concevez des boutons, quels points des guidelines devez-vous consulter

Les boutons sont la partie la plus susceptible d'être « conçue à la va-vite », mais aussi celle qui révèle le mieux la maturité d'un système.

### 4.1 D'abord la « sémantique » des boutons, puis le style

Ne pensez pas d'abord « bouton bleu ou bouton noir », demandez-vous d'abord quel est le rôle de ce bouton.

Les rôles courants des boutons peuvent être classés ainsi :

| Type de bouton | Rôle | Stratégie de style courante |
| :--- | :--- | :--- |
| **Primary** | L'action la plus critique de la zone | Plein, contraste élevé, le plus visible |
| **Secondary** | Action de support | Bordure ou emphase d'un niveau inférieur |
| **Tertiary / Text** | Action faible | Texte ou faible présence visuelle |
| **Destructive** | Suppression, désactivation, vidage et autres actions à risque | Couleur d'avertissement ou style de risque explicite |
| **Icon button** | Action outil locale | Simple, proche du contexte |

### 4.2 Pas trop de boutons Primary dans une page

C'est le piège le plus courant pour les débutants.

S'il y a 4 boutons principaux sur la page, cela revient à n'avoir aucun bouton principal. Le sens d'un bouton principal est précisément de « dire à l'utilisateur ce qu'il doit faire maintenant ».

Vous pouvez vous inspirer de la pratique commune de nombreux systèmes de design :

- Une zone principale ne conserve généralement qu'un seul bouton principal
- Annuler, retourner, fermer ne doivent généralement pas être au même niveau que le bouton de confirmation
- Les actions supplémentaires sont placées dans des boutons secondaires ou des menus

### 4.3 Les boutons doivent pouvoir exprimer les changements d'état

Les guidelines définissent généralement les états des boutons de manière très précise :

- État par défaut
- État de survol
- État de focus
- État désactivé
- État de chargement
- État de danger

C'est important, car un bouton n'est pas une image statique, mais l'un des contrôles les plus fréquemment activés par l'utilisateur.

### 4.4 Le texte des boutons fait aussi partie du design

Le texte des boutons n'est pas qu'une « question de rédaction », il influence directement la compréhension de l'utilisateur.

Par exemple :

- `Enregistrer`
- `Enregistrer les modifications`
- `Publier maintenant`
- `Supprimer le projet`
- `Déplacer vers la corbeille`

Ces textes transmettent des attentes psychologiques très différentes. Les guidelines matures exigent généralement que les labels des boutons expriment clairement l'action, et non utilisent des termes vagues.

## 5. Une checklist très pratique pour la conception de pages et de boutons

Quand vous concevez une page vous-même, vous pouvez passer rapidement en revue cette checklist :

### Checklist page

- Le titre de la page indique-t-il clairement la tâche en cours
- L'information la plus importante au-dessus de la ligne de flottaison est-elle visible d'un coup d'œil
- La page est-elle organisée selon le flux de tâches, et non selon ce qui vous vient à l'esprit
- Une seule zone ne comporte-t-elle qu'une seule action principale
- Le contenu secondaire est-il atténué de manière appropriée

### Checklist boutons

- Ce bouton est-il une action principale ou secondaire
- Pourquoi mérite-t-il d'être plus visible que les autres
- Y a-t-il trop de boutons principaux dans la page
- Les actions dangereuses sont-elles clairement identifiées
- Le texte du bouton est-il suffisamment précis

## 6. Comment utiliser l'IA en référençant les guidelines des autres pour concevoir des pages

Cette section est la plus pratique.

Beaucoup de gens, quand ils demandent à l'IA de concevoir une page, se contentent de dire :

```md
Aidez-moi à faire une page de paramètres, un peu plus sophistiquée, style Apple
```

Ce type de prompt est trop vague, et l'IA ne peut généralement imiter que « fond blanc, coins arrondis, ombres ».

Pour les débutants, l'approche la plus pratique n'est pas de résumer vous-même un long texte, mais de coller directement à l'IA les **phrases clés du texte officiel des guidelines**.

Cette approche a deux avantages :

- Vous n'avez pas besoin de « traduire » vous-même la pensée de design
- L'IA comprend plus facilement la page et les boutons selon les définitions officielles

### 6.1 Exemple 1 : Faire concevoir par l'IA une page de paramètres en référençant Apple

Trouvez d'abord une citation d'Apple :

> [« Establish a clear visual hierarchy... »](https://developer.apple.com/design/human-interface-guidelines/)

Vous pouvez coller directement ceci à l'IA :

```md
Référencez cette phrase des Apple Human Interface Guidelines :
"Establish a clear visual hierarchy..."

Aidez-moi à concevoir une page de paramètres de sécurité du compte.
La hiérarchie de la page doit être claire, les informations importantes en premier, les groupes bien ordonnés.
```

Le point clé de cette rédaction : vous n'avez pas besoin d'expliquer trop de choses vous-même, collez simplement les propres mots d'Apple.

### 6.2 Exemple 2 : Faire concevoir par l'IA les boutons d'un back-office en référençant Fluent

Trouvez d'abord une citation de Fluent :

> [« Only use one primary button in a layout... »](https://fluent2.microsoft.design/components/web/react/core/button/usage)

Vous pouvez coller directement ceci à l'IA :

```md
Référencez cette phrase de Fluent 2 :
"Only use one primary button in a layout..."

Aidez-moi à concevoir les boutons d'un back-office de gestion d'équipe.
Le bouton d'ajout de membre doit être le plus visible, les boutons d'export, de filtrage et d'actions supplémentaires plus discrets, le bouton de suppression mis en évidence séparément.
```

Cette phrase est particulièrement adaptée aux débutants, car elle dit directement à l'IA : ne pas mettre trop de boutons principaux dans une zone.

### 6.3 Exemple 3 : Faire concevoir par l'IA en référençant simultanément les guidelines de page et de boutons

Vous pouvez aussi coller deux citations à la fois, pour que l'IA référence à la fois la page et les boutons :

> Apple : [« Establish a clear visual hierarchy... »](https://developer.apple.com/design/human-interface-guidelines/)
>
> Fluent : [« Only use one primary button in a layout... »](https://fluent2.microsoft.design/components/web/react/core/button/usage)

Puis écrivez directement :

```md
Référencez les deux phrases de guidelines de design suivantes :
Apple : "Establish a clear visual hierarchy..."
Fluent : "Only use one primary button in a layout..."

Aidez-moi à concevoir une page de détail de projet.
La page contient la présentation du projet, les membres, l'activité récente et l'accès aux paramètres.
La hiérarchie de la page doit être claire, ne conserver qu'un seul bouton principal, les autres boutons plus discrets.
```

Cette approche est particulièrement adaptée aux débutants, car il vous suffit de savoir copier le texte officiel et d'ajouter deux phrases sur vos besoins.

## 7. Comment utiliser l'IA en référençant les guidelines de boutons pour générer directement des boutons

Si vous voulez d'abord faire des boutons, vous pouvez aussi coller directement le texte officiel des guidelines de boutons.

Par exemple, la définition du bouton par Atlassian est très courte :

> [« A button triggers an event or action. »](https://atlassian.design/components/button/)

Vous pouvez demander ceci à l'IA :

```md
Référencez cette phrase d'Atlassian :
"A button triggers an event or action."

Aidez-moi à concevoir un ensemble de styles de boutons pour un back-office.
Je veux un bouton principal, un bouton secondaire, un bouton de suppression, et dites-moi respectivement où les utiliser.
```

Ce type de prompt est particulièrement adapté aux débutants — c'est essentiellement « coller le texte officiel + exprimer ses besoins ».

## 8. Résumé

Référencer les guidelines de design pour concevoir des pages et des boutons, ce n'est pas « ressembler à quelqu'un », mais apprendre les choses suivantes :

1. Organiser les pages avec une hiérarchie, plutôt qu'empiler du contenu
2. Exprimer la priorité des actions avec des niveaux de boutons, plutôt que de rendre tous les boutons également voyants
3. Guider le design avec les définitions, les frontières et les critères de jugement des guidelines de design
4. Quand l'IA référence les guidelines des autres, elle référence les « principes et structures », et non seulement l'habillage

Quand vous utilisez les guidelines de cette manière, vous ne référenciez pas seulement un style, mais une méthode de pensée de design mature.

---

## Références

Les liens suivants proviennent tous de systèmes de design officiels ou de la documentation officielle :

- Apple Human Interface Guidelines : [Overview](https://developer.apple.com/design/human-interface-guidelines/)
- Apple Human Interface Guidelines : [Menus](https://developer.apple.com/design/human-interface-guidelines/menus)
- Apple Human Interface Guidelines : [Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts)
- Apple Human Interface Guidelines : [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)
- Apple Archive : [How Menus Work](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/HowMenusWork.html)
- Apple Archive : [Managing Pop-Up Buttons and Pull-Down Lists](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html)
- Material Design : [Buttons overview](https://m3.material.io/components/buttons/overview)
- Material Design : [Menus](https://m1.material.io/components/menus.html)
- Microsoft Fluent 2 : [Start designing](https://fluent2.microsoft.design/get-started/design)
- Microsoft Fluent 2 : [Menu usage](https://fluent2.microsoft.design/components/web/react/core/menu/usage)
- Microsoft Fluent 2 : [Button usage](https://fluent2.microsoft.design/components/web/react/core/button/usage)
- Atlassian Design System : [Foundations](https://atlassian.design/foundations/)
- Atlassian Design System : [Button](https://atlassian.design/components/button/)
