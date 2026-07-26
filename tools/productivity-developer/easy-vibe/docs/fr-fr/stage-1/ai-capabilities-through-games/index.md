# Niveau 1 : À l'ère de l'IA, savoir parler, c'est savoir programmer

Ceci est un tutoriel basé sur l'<strong>apprentissage par projet</strong>. Nous vous encourageons à suivre les étapes une par une et à essayer de reproduire les résultats.
Ne craignez pas de faire des erreurs ou de modifier le contenu, nous croyons toujours que vous pouvez y arriver. N'oubliez jamais :

<div style="text-align: center;">
<div style="display: inline-block; padding: 8px 20px; border-radius: 8px; border: 1px dashed #FFB6C1; background: linear-gradient(135deg, #FFF0F5 0%, #FFE4EC 100%); margin: 12px 0;">
  <span style="font-size: 15px; font-weight: 500; color: #666;">Terminer vaut mieux que parfait 🐣</span>
</div>
</div>

<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const duration = 'Environ <strong>4 heures</strong>, réalisables en plusieurs sessions'
const relatedArticles =
  relatedArticlesMap['fr-fr/stage-1/ai-capabilities-through-games'] ?? []
</script>

## Introduction du chapitre

<ChapterIntroduction :duration="duration" :tags="['Programmation conversationnelle par IA', 'Mini-jeu IA-native', 'Projet pratique : Snake']" coreOutput="Snake IA-native + mini-jeu original" expectedOutput="1 Snake IA-native fonctionnel + (optionnel) 1 mini-jeu ou démo IA-native de votre création">

Si vous <strong>ne savez absolument pas programmer</strong>, ou que vous ne connaissez que les bases, ce chapitre est fait pour vous. Nous commencerons par les fondamentaux : utiliser la <strong>conversation</strong> pour demander à l'IA d'écrire du code, sans avoir besoin de mémoriser la syntaxe, de configurer un environnement, et en faisant tourner le tout directement dans le navigateur.

Vous créerez de vos propres mains <strong>votre premier programme fonctionnel</strong> — un jeu de Snake qui « mange des mots, écrit des poèmes et dessine ». À travers ce projet pratique, vous découvrirez ce que signifie vraiment la programmation par IA : ce n'est pas l'IA qui pense à votre place, c'est vous qui exprimez vos idées et l'IA qui les réalise.

Toute création commence par un passage de 0 à 1, et nous sommes ravis de transmettre confiance et expertise à chaque étape. Pour vous, <strong>l'exécution is all you need</strong>.

</ChapterIntroduction>

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Défis et opportunités', description: 'Les nouvelles possibilités pour tous' },
      { title: 'Premier contact', description: 'Développement express en 60 secondes' },
      { title: 'Projet pratique', description: 'Créer un Snake IA-native' },
      { title: 'Explorer et créer', description: 'Réinventer le jeu' }
    ]" />
  </ClientOnly>
</div>

## 1. Le défi et l'opportunité pour les non-programmeurs

Beaucoup de gens ont la tête pleine d'idées de produits : un petit outil pour gérer ses comptes, une page web pour suivre la croissance de leur enfant, voire un mini-jeu. Mais dès qu'ils pensent au code à écrire, au développeur à trouver, ils abandonnent tout de suite.

Depuis l'apparition de l'IA, une toute nouvelle possibilité s'est offerte pour la première fois aux non-techniciens : vous n'avez pas besoin de savoir coder, il vous suffit de savoir exprimer clairement à l'IA ce que vous voulez. Les [données de GitHub Copilot](https://www.wearetenet.com/blog/github-copilot-usage-data-statistics) montrent que plus de 15 millions de développeurs utilisent déjà l'IA pour les aider à coder, et qu'en moyenne 46 % du code est généré par l'IA ! Sur les projets Java, cette proportion atteint 61 %.

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px;">
  <template #header>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 20px;">🚀</span>
      <span style="font-weight: bold; font-size: 16px;">Bond en efficacité et taux d'adoption</span>
    </div>
  </template>
  
  <el-row :gutter="20" style="margin-bottom: 24px;">
    <el-col :span="6" :xs="12">
      <div style="text-align: center; padding: 10px;">
        <div style="color: #409EFF; font-size: 24px; font-weight: bold;">55 %</div>
        <div style="color: #909399; font-size: 12px; margin-top: 4px;">Gain de vitesse</div>
      </div>
    </el-col>
    <el-col :span="6" :xs="12">
      <div style="text-align: center; padding: 10px;">
        <div style="color: #67C23A; font-size: 24px; font-weight: bold;">2,4 <span style="font-size: 14px;">jours</span></div>
        <div style="color: #909399; font-size: 12px; margin-top: 4px;">Durée des tâches (contre 9,6 jours)</div>
      </div>
    </el-col>
    <el-col :span="6" :xs="12">
      <div style="text-align: center; padding: 10px;">
        <div style="color: #E6A23C; font-size: 24px; font-weight: bold;">81 %</div>
        <div style="color: #909399; font-size: 12px; margin-top: 4px;">Taux d'installation dès le premier jour</div>
      </div>
    </el-col>
    <el-col :span="6" :xs="12">
      <div style="text-align: center; padding: 10px;">
        <div style="color: #F56C6C; font-size: 24px; font-weight: bold;">96 %</div>
        <div style="color: #909399; font-size: 12px; margin-top: 4px;">Taux d'adoption des suggestions</div>
      </div>
    </el-col>
  </el-row>

  <div style="line-height: 1.8; color: #606266;">
    Ce qui est vraiment excitant, c'est le bond en efficacité : la vitesse à laquelle les développeurs accomplissent leurs tâches a augmenté de <b>55 %</b>. Ce qui prenait 9,6 jours à livrer ne nécessite plus que <b>2,4 jours</b>. Cette amélioration visible montre que l'IA n'est plus un « outil optionnel », mais un assistant de programmation devenu indispensable dans le flux de développement. Les chiffres d'adoption le confirment : le jour même où ils ont obtenu l'accès, <b>81 %</b> des développeurs l'ont installé et commencé à l'utiliser immédiatement ; parmi eux, <b>96 %</b> ont adopté les suggestions de code dès le premier jour. En d'autres termes, les développeurs ont quasi instantanément intégré l'IA dans leur travail quotidien.
  </div>
</el-card>

Pour les non-programmeurs, cette tendance est encore plus significative : si les développeurs professionnels s'appuient massivement sur l'IA pour coder, <strong>pourquoi ne pas simplement discuter avec l'IA pour concrétiser nos propres idées ?</strong>

L'objectif de ce cours est de vous former à une nouvelle compétence : créer des applications grâce au dialogue en langage naturel. Nous vous apprendrons à communiquer avec l'IA dans le langage des ordinateurs, et comment la laisser transformer vos idées en produits réels et utilisables.

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="1" :items="[
      { title: 'Défis et opportunités', description: 'Les nouvelles possibilités pour tous' },
      { title: 'Premier contact', description: 'Développement express en 60 secondes' },
      { title: 'Projet pratique', description: 'Créer un Snake IA-native' },
      { title: 'Explorer et créer', description: 'Réinventer le jeu' }
    ]" />
  </ClientOnly>
</div>

## 2. Jusqu'où l'IA peut-elle vous aider ?

Dans cette section, nous n'aborderons qu'une seule question : si vous ne savez pas coder du tout, jusqu'où l'IA actuelle peut-elle vous aider ?

Globalement, vous pouvez comprendre les capacités des modèles actuels comme suit : ils sont capables de développer des <strong>outils internes simples</strong>, des <strong>tableaux de bord de data visualisation</strong>, ainsi que quelques <strong>mini-jeux légers</strong>. Ces capacités suffisent pour créer des <strong>outils personnels</strong> et <strong>valider des besoins du point de vue produit</strong>. Mais si vous espérez générer en un clic un <strong>produit commercial mature</strong>, il faudra généralement encore un travail humain pour <strong>la conception du flux</strong>, <strong>le polissage des détails</strong>.

Voyons concrètement, avec l'exemple du jeu de Snake, ce que la programmation par IA peut accomplir aujourd'hui.

### 2.1 Créer un Snake en 60 secondes

Commencez par ouvrir la page expérimentale utilisée dans ce cours : [z.ai](https://chat.z.ai/). `z.ai` est une plateforme IA développée par Zhipu AI (l'une des principales entreprises chinoises de grands modèles de langage), dont les capacités sont fournies par la série de modèles GLM développée en interne. La plateforme intègre plusieurs fonctionnalités IA, notamment la génération de diapositives, la conception d'affiches et le développement full-stack. Dans ce tutoriel, nous nous concentrerons sur l'utilisation du module de développement full-stack.

::: details 💡 Qu'est-ce que le nouveau mode « coder dans le navigateur » ?

Autrefois, développer une application web nécessitait :
- Installer un environnement de programmation (Python, Node.js, etc.)
- Configurer un éditeur de code
- Apprendre HTML/CSS/JavaScript
- Gérer les dépendances et les erreurs

Maintenant, grâce aux plateformes de programmation par IA, il vous suffit de :
- Ouvrir votre navigateur et accéder à la page
- Décrire ce que vous voulez en langage naturel
- L'IA génère le code et affiche un aperçu en temps réel

Ce mode « dialoguer pour coder » transforme la programmation : au lieu « d'écrire du code », vous « décrivez vos besoins ». Vous n'avez pas besoin de comprendre les détails techniques, il vous suffit d'expliquer clairement à l'IA ce que vous souhaitez, et elle transforme vos idées en un programme fonctionnel. C'est le nouveau paradigme de la programmation à l'ère de l'IA — le <strong>Vibe Coding</strong>.
:::

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/index-2026-01-07-18-25-03.png)

Après avoir saisi vos besoins et cliqué sur le bouton **Développement full-stack**, vous pouvez observer en temps réel le processus complet de création de la page. En général, le temps de préparer un café suffit pour que la page soit générée automatiquement !

```
Crée-moi un jeu de Snake :
1. Contrôler le serpent avec les flèches directionnelles
2. Le serpent grandit et le score augmente quand il mange la nourriture
3. Le jeu se termine si le serpent heurte un mur ou son propre corps
4. Il faut des boutons Démarrer et Recommencer
5. L'interface doit être simple et élégante
```

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/index-2026-01-07-18-34-03.png)

Une fois la génération terminée, vous verrez apparaître à droite une interface navigable. Vous pouvez faire défiler la page ou cliquer sur le bouton 🧭 en haut à droite pour passer en mode plein écran.

> Les boutons de gauche à droite ont les fonctions suivantes : le bouton flèche ouvre la barre latérale de l'historique des conversations, le bouton crayon crée une nouvelle conversation, le bouton flèche circulaire rafraîchit la page, le bouton boussole bascule en mode plein écran, le bouton Download télécharge le projet, le bouton <> bascule vers la vue code, et le bouton Publish publie le projet.

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/index-2026-01-07-18-35-11.png)

Si vous souhaitez consulter le code source de la page, cliquez sur l'icône de code en haut à droite pour voir le code complet.

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image7.png)

::: tip 🌐 Explorer d'autres outils de programmation par IA

Outre z.ai, nous vous recommandons également d'essayer les plateformes suivantes :

| Outil | Adresse | Caractéristiques |
|------|---------|-----------------|
| **Google AI Studio** (recommandé) | [aistudio.google.com/apps](https://aistudio.google.com/apps) | Proposé par Google, avec le modèle Gemini, idéal pour le prototypage rapide |
| **Figma Make** | [figma.com/make](https://www.figma.com/make) | Intégré à l'outil de design, adapté aux designers pour des prototypes interactifs |
| **Coze** | [coze.com](https://www.coze.cn) | Plateforme de création de bots IA par ByteDance, développement sans code, intégration avec Doubao, Kimi et d'autres modèles chinois |
| **v0.dev** | [v0.dev](https://v0.dev) | Outil de génération d'UI par Vercel, génère des composants React fonctionnels à partir d'une description |
| **Bolt.new** | [bolt.new](https://bolt.new) | Plateforme de développement full-stack par StackBlitz, génère et déploie des applications web complètes |
| **Lovable** | [lovable.dev](https://lovable.dev) | Spécialisé dans les applications React de haute qualité, avec intégration GitHub et déploiement en un clic |
| **Replit Agent** | [replit.com](https://replit.com) | IDE en ligne avec assistant de programmation IA, supporte plusieurs langages et collaboration en temps réel |

Pour en savoir plus sur la comparaison détaillée des outils de programmation en ligne, consultez notre lecture complémentaire : [Comparaison de 7 plateformes Vibe Coding](../../stage-1/appendix-articles/example0-1/vibe-coding-tools-snake-game-tutorial.md)
:::

### 2.2 Ce que la programmation conversationnelle peut et ne peut pas faire

Cette section se concentre sur une question précise : lorsque vous dépendez uniquement d'une IA conversationnelle, sans écrire aucune ligne de code, jusqu'où pouvez-vous réellement aller ?

En pratique, une conclusion relativement stable est la suivante : elle peut vous aider à réaliser quelque chose de « petit mais complet », mais la notion de « suffisant » reste à votre appréciation à chaque étape.

#### Plus performant pour les applications « petites et claires »

À partir de l'exemple du Snake ci-dessus, vous avez déjà observé un schéma typique : tant que vous pouvez décrire clairement l'interface et les interactions, l'IA peut généralement, en quelques tours de conversation, assembler une page web complète, navigable et jouable.

Ce type de tâche présente souvent plusieurs caractéristiques communes :

- Périmètre clair : une page web, un outil interne simple, un petit jeu
- Résultat visible : vous pouvez immédiatement vérifier dans le navigateur si cela fonctionne comme prévu
- Correction directe : en cas de problème, vous pouvez le signaler dans la conversation suivante et demander une correction (en copiant l'erreur ou en envoyant une capture d'écran à l'IA)

Dans ces limites, vous pouvez considérer l'IA conversationnelle comme un « développeur assistant » efficace. Il vous suffit d'affiner et de corriger les besoins à chaque tour en langage naturel pour obtenir rapidement un prototype utilisable.

**Taux de réussite de l'IA pour les petits projets :**
<el-progress :percentage="90" :stroke-width="15" status="success" striped striped-flow />

#### Les grands projets nécessitent une « vision de flux »

Dès que vous dépassez le cadre des applications petites et claires, espérer qu'une IA termine un système complexe de bout en bout en quelques conversations atteint vite ses limites. Les grands projets impliquent souvent un backend, une base de données, l'intégration de services tiers, ainsi que des questions de permissions, de sécurité, de concurrence et de nombreuses règles métier, avec pour objectif de livrer un système complet intégré aux opérations existantes, et non une simple page web.

Dans ce cas, l'approche la plus raisonnable n'est pas de tout jeter à l'IA d'un coup, mais de commencer par cartographier clairement le flux global : quelles sont les étapes clés, quelles sont les entrées/sorties et les changements d'état à chaque étape, quels nœuds sont les plus sensibles en termes de performance et de sécurité. Ensuite, sur la base de ce diagramme de flux, séparer les étapes relativement indépendantes et les confier à l'IA conversationnelle pour générer des interfaces, des modules, des scripts et des tests.

Avec les capacités actuelles, l'IA est plus performante pour accélérer une série de petites étapes, tandis que vous (ou votre équipe) décidez comment les découper, les enchaîner, et vous chargez de l'architecture, de l'intégration système et de la maintenance.

#### La différence entre « écrire » et « utiliser »

À première vue, l'IA semble capable de tout faire, mais dans la pratique, jusqu'où ces résultats sont-ils réellement utilisables ?

Une référence utile est la suivante :

::: warning ⚠️ Guide des scénarios d'utilisation

- **Prototype / Démo / Outil interne** : très adapté pour confier à l'IA la première version, puis itérer les détails vous-même.
- **Produit grand public** : nécessite généralement un investissement continu de la part d'ingénieurs sur l'architecture, l'abstraction, les performances et la maintenance.
- **Systèmes critiques / fortement réglementés (paiement, contrôle des risques, santé, etc.)** : à ce stade, il ne faut pas « déployer directement après génération » ; un processus strict de revue et de test est indispensable.
  :::

À l'heure actuelle, vous pouvez relativement sereinement considérer l'IA comme un partenaire efficace pour les démos et les outils internes : tant que vous êtes prêt à tester, itérer et poser des questions supplémentaires (« c'est faux ici, corrige et explique pourquoi »), la qualité globale au niveau prototype et outil interne est généralement suffisante et pertinente.

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="2" :items="[
      { title: 'Défis et opportunités', description: 'Les nouvelles possibilités pour tous' },
      { title: 'Premier contact', description: 'Développement express en 60 secondes' },
      { title: 'Projet pratique', description: 'Créer un Snake IA-native' },
      { title: 'Explorer et créer', description: 'Réinventer le jeu' }
    ]" />
  </ClientOnly>
</div>

## 3. Pratique : votre première application IA-native

Revenons à la pratique. Dans la partie précédente, nous avons rapidement créé un prototype jouable de Snake avec l'IA, et nous avons compris ce que l'IA peut et ne peut pas faire. Nous allons maintenant apprendre à utiliser les techniques de base du <strong>vibe coding</strong> pour créer un jeu de Snake <strong>moderne</strong> version IA-native. Nous allons faire en sorte que le serpent mange des caractères textuels au lieu de haricots. Enfin, le jeu générera un poème d'après les mots mangés, puis dessinera une image.
À travers ce cas concret, vous comprendrez le concept fondamental de ce nouveau mode de programmation : comment exprimer clairement vos besoins en langage naturel.

### 3.1 Snake IA-native

Au début, nous pouvons dialoguer avec le modèle de la manière la plus simple possible, ce qui nous aidera à obtenir rapidement un prototype de produit. Nous pouvons saisir directement dans la boîte de dialogue :

> **💡 Exemple de prompt :** Crée-moi un jeu de Snake
>
> ![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image12.png)

> **💡 Exemple de prompt :** Crée-moi un jeu de Snake qui supporte :
>
> 1. Je peux manger différents mots, ils seront collectés dans une boîte
>    ![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image13.png)

> **💡 Exemple de prompt :** Crée-moi un jeu de Snake qui supporte :
>
> 1. Je peux manger différents mots, ils seront collectés dans une boîte
> 2. Quand le serpent a mangé 8 mots, le LLM doit créer un poème à partir de ces mots, et nous pouvons le remixer selon nos besoins.
> 3. Une fois le poème terminé, l'étape suivante créera automatiquement une image basée sur ce poème.
>
> ![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image14.png)

Notez que pendant le développement, vous pouvez rencontrer des problèmes : boutons sans réaction, erreurs lors de l'utilisation de fonctionnalités, comportement inattendu, ou interface qui ne correspond pas au design attendu.

Dans ce cas, vous devez poser des questions supplémentaires au modèle pour l'aider à résoudre ces problèmes imprévus.

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image15.png)

### 3.2 Ajouter de nouvelles fonctionnalités au jeu

Une fois les fonctionnalités de base terminées, vous pouvez essayer d'ajouter des nouveautés à votre programme ! Si vous trouvez que le fait que le serpent mange des mots ou des caractères est un peu ennuyeux, vous pouvez faire manger des mots de différentes couleurs au serpent et changer sa couleur en conséquence.

Vous pouvez également ajouter des effets spéciaux au processus de « mangeage », ou introduire des « mots magiques » qui déclenchent des effets — par exemple en augmentant la vitesse ou la taille du serpent. Une autre idée est de faire générer un poème et une image par le modèle à chaque fois que le serpent mange un mot, plutôt que d'attendre qu'il en mange huit.

Si cela vous semble trop difficile, vous pouvez demander directement au modèle de langage de l'aide ! Il peut fournir des suggestions créatives pour rendre votre jeu plus amusant. Essayez !

```
1. Mécanique "Les mots déverrouillent des mondes"
Chaque fois que le serpent mange un mot, le LLM fait une association poétique (par exemple, "arbre" → "forêt", "ombrage"), et le modèle d'image génère instantanément une petite œuvre d'art pour ce mot. Ces images s'assemblent progressivement en un panorama unique créé par le joueur.

2. Jouabilité "Puzzle poétique"
Chaque mot mangé par le serpent déclenche la génération d'un vers court par le LLM et une illustration par le modèle d'image. Ces vers et images se combinent comme un puzzle pour former, à la fin de la partie, un poème et un tableau collaboratifs avec l'IA.

3. "Mots magiques" et "Branches narratives"
Des "mots magiques" spéciaux (par exemple, "vent", "nuit", "rêve") ne déclenchent pas seulement de la poésie, mais changent aussi l'ambiance ou le thème — transformant le style de l'image générée en nocturne, tempête ou ambiance onirique.

4. "Génération en temps réel"
Après chaque mot, le LLM génère une ligne de dialogue ou de description, un NPC dans le jeu peut "parler" au joueur, ou l'environnement change en conséquence.

5. "Créer et partager"
Les joueurs peuvent sauvegarder et partager leurs poèmes et images créés par l'IA à la fin de la session.

6. "Snake par phrase" — mode inversé
Le LLM donne un vers ou une énigme, le joueur doit guider le serpent pour manger les mots dans le bon ordre pour reconstituer la phrase.

7. "Niveaux thématiques" et "Sélection de style"
Au début, le joueur choisit un thème (par exemple, "conte de fées", "science-fiction", "poésie Tang"), et le LLM ainsi que le modèle d'image adaptent les mots, le style poétique et les effets visuels en conséquence.

8. "Co-création en direct"
Quand un mot spécial est mangé, le LLM peut inviter le joueur à saisir une phrase ou à choisir un style, puis l'IA génère les vers et illustrations correspondants.

9. "Easter eggs IA" et "Succès"
Certaines combinaisons de mots sont identifiées par le LLM comme des thèmes spéciaux, déclenchant des vers et illustrations rares.

10. "Histoire qui grandit"
Au fil de la croissance du serpent, le LLM génère un poème narratif continu, et le modèle d'image crée un long parchemin panoramique.
```

De plus, nous pouvons demander au LLM de générer directement un prompt de niveau projet. Dans la section précédente, nous n'avons écrit nous-mêmes que le prompt du Snake. Maintenant, essayons de demander au modèle de générer un prompt avec un cadre d'ensemble et un chemin de réalisation (vous pouvez utiliser z.ai directement).

Si vous souhaitez apprendre à écrire de meilleurs prompts, consultez [l'annexe sur le Prompt Engineering](/zh-cn/appendix/8-artificial-intelligence/prompt-engineering).

> Je veux que l'IA génère un jeu de Snake en page web, avec un prompt plus complet pour un résultat plus impressionnant et amusant. Génère le prompt correspondant. L'objectif actuel : créer un jeu de Snake avec la fonctionnalité de génération de poèmes à partir de mots mangés, incluant un module de génération d'images.

La réponse de z.ai ressemblera à ceci :

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image56.png)

Nous pouvons utiliser ce prompt en mode développement full-stack pour régénérer le projet :

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image57.png)

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image58.png)

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="3" :items="[
      { title: 'Défis et opportunités', description: 'Les nouvelles possibilités pour tous' },
      { title: 'Premier contact', description: 'Développement express en 60 secondes' },
      { title: 'Projet pratique', description: 'Créer un Snake IA-native' },
      { title: 'Explorer et créer', description: 'Réinventer le jeu' }
    ]" />
  </ClientOnly>
</div>

### 3.3 Essayer de créer d'autres mini-jeux

Outre le Snake, nous pouvons laisser libre cours à notre imagination.

Créer tout ce que nous voulons, même essayer de tout casser ! Puis recommencer à zéro !

```
1. Galerie d'art IA
   Description : une galerie en ligne présentant des œuvres d'art générées par IA, avec upload, partage et commentaires.
   Fonctionnalités : comptes utilisateurs, upload et affichage d'œuvres, système de notation, navigation par catégorie, intégration d'outils de génération IA.

2. Archives de jeux rétro
   Description : un site rendant hommage aux jeux classiques, avec historique, guides de jeu et jeux rétro jouables en ligne.

3. Suivi de vie durable
   Description : un site aidant à suivre et réduire l'empreinte carbone grâce à des conseils écologiques et des défis communautaires.

4. Assistant culinaire virtuel
   Description : une plateforme de cuisine assistée par IA avec recommandations de recettes personnalisées et instructions étape par étape.

5. Plateforme de découverte musicale underground
   Description : un service de streaming musical centré sur les artistes indépendants et émergents.

6. Gestionnaire de tâches minimaliste
   Description : un outil de gestion de tâches avec une esthétique zen, axé sur la simplicité et l'efficacité.

7. Atelier d'écriture science-fiction
   Description : une plateforme offrant des outils créatifs et de l'inspiration aux écrivains de SF, incluant la construction d'univers et le développement de personnages.

8. Graphe de connaissances personnel
   Description : un outil permettant de construire un réseau de connaissances personnel, avec visualisation et connexion d'idées.

9. Jardin botanique virtuel
   Description : une encyclopédie interactive des plantes où les utilisateurs peuvent explorer le monde végétal et créer un jardin virtuel.

10. Arène de défis de programmation
    Description : une plateforme de compétition en ligne pour programmeurs avec des défis de différents niveaux de difficulté.
```

Et aussi... si vous aimez les jeux, essayons ensemble d'en créer !

```
1. RPG monde ouvert 3D
2. FPS arène multijoueur
3. Échecs IA et multijoueur
4. Mahjong en ligne multijoueur
5. Jeu de stratégie au tour par tour
6. Course automobile contre la montre
7. Jeu de cartes à collectionner
8. Battle royale (vue 2D du dessus)
9. Jeu d'horreur survival (vue à la première personne)
10. Jeu de rythme musical (3D)
```

## 📚 Devoir

<el-card id="assignment-card" shadow="hover" style="margin: 20px 0; border-radius: 12px;">
  <template #header>
    <div style="font-weight: bold; font-size: 16px;">🎯 Devoir du chapitre : réaliser vos premiers mini-jeux IA-native</div>
  </template>

  <p>
    Dans cette section, vous avez suivi les étapes du processus complet : de la « génération conversationnelle d'un Snake » à la « compréhension des principes de conception d'un mini-jeu IA-native ». Le devoir ci-dessous vous aide à transformer cette compréhension en compétence réelle.
  </p>

  <ol>
    <li>
      <strong>Reproduire intégralement le jeu de Snake IA-native</strong>
      <ul>
        <li>Au minimum : le serpent peut se déplacer, sa longueur et son score changent quand il mange de la « nourriture », et le jeu se termine s'il heurte un mur ou son propre corps.</li>
        <li>Lors de la reproduction, pratiquez en envoyant à l'IA le phénomène erroné + le message d'erreur + l'extrait de code clé, en demandant une correction en « mode débutant ».</li>
      </ul>
    </li>
    <li>
      <strong>(Optionnel) Créer 1 mini-jeu ou démo IA-native original</strong>
      <ul>
        <li>Il peut s'agir de n'importe quel gameplay léger autour de texte, images, musique, rythme, etc.</li>
        <li>L'important n'est pas la qualité visuelle, mais de pouvoir expliquer clairement : en quoi l'IA vous a concrètement aidé, et ce qu'elle a résolu de « difficile ou fastidieux à faire manuellement ».</li>
      </ul>
    </li>
  </ol>

  <p>
    Voilà pour le tutoriel complet ! Il vous faudra peut-être <strong>4 heures</strong> pour terminer tout le contenu et construire votre propre jeu de Snake. Ne vous pressez pas — explorez, expérimentez et profitez du processus. Si vous rencontrez des concepts difficiles à comprendre, n'hésitez pas à consulter les annexes ci-dessous.
  </p>
</el-card>

## Annexes

<el-card id="appendix-nav" shadow="hover" style="margin-top: 24px; margin-bottom: 24px; border-left: 5px solid #67C23A;">
  <div style="font-weight: bold; margin-bottom: 8px;">Navigation des annexes</div>
  <div style="color: #606266; font-size: 14px; line-height: 1.6; margin-bottom: 12px;">
    Voici quelques concepts de base liés à ce chapitre : si vous rencontrez des questions comme « qu'est-ce que le frontend ? » ou « qu'est-ce que le Vibe Coding ? », vous pouvez revenir ici à tout moment.
  </div>
  <el-row :gutter="16">
    <el-col :span="12">
      <a href="#appendix-1" style="text-decoration: none; color: inherit;"><b>Annexe 1 : Avons-nous besoin de connaissances en développement frontend ?</b></a><br/>
      <span style="font-size: 12px; color: #909399">Comprendre la place du frontend dans une application, savoir ce qui est « visible ».</span>
    </el-col>
    <el-col :span="12">
      <a href="#appendix-2" style="text-decoration: none; color: inherit;"><b>Annexe 2 : Qu'est-ce que le Vibe Coding exactement ?</b></a><br/>
      <span style="font-size: 12px; color: #909399">Comprendre les principes du « développement conversationnel » et comment collaborer avec l'IA.</span>
    </el-col>
  </el-row>
  <el-row :gutter="16" style="margin-top: 10px;">
    <el-col :span="12">
      <a href="#appendix-3" style="text-decoration: none; color: inherit;"><b>Annexe 3 : Contexte des modèles</b></a><br/>
      <span style="font-size: 12px; color: #909399">Clarifier les concepts souvent entendus mais facilement confondus comme la « longueur de contexte ».</span>
    </el-col>
    <el-col :span="12">
      <a href="#appendix-4" style="text-decoration: none; color: inherit;"><b>Annexe 4 : Capacité de suivi des instructions</b></a><br/>
      <span style="font-size: 12px; color: #909399">Comprendre pourquoi le modèle « ne comprend pas » parfois, et comment écrire plus clairement.</span>
    </el-col>
  </el-row>
  <div style="margin-top: 12px; font-size: 12px; color: #909399;">
    Astuce : vous pouvez utiliser Ctrl/⌘+F pour rechercher des mots-clés, ou copier les passages que vous ne comprenez pas et les donner à l'IA en lui demandant de les réexpliquer « de façon compréhensible pour un vrai débutant ».
  </div>
</el-card>

## <span id="appendix-1">[Annexe 1 : Avons-nous besoin de connaissances en développement frontend ?](#appendix-nav)</span>

::: tip 💡 En résumé
Vous n'avez pas besoin de savoir coder, mais connaître les concepts de base vous aidera à mieux décrire vos besoins à l'IA.
:::

<el-row :gutter="16" style="margin: 20px 0;">
  <el-col :span="12" :xs="24" style="margin-bottom: 16px;">
    <el-card shadow="hover" style="border-radius: 12px; height: 100%;">
      <template #header>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 20px;">👁️</span>
          <span style="font-weight: bold;">Frontend</span>
          <el-tag type="success" size="small">Visible</el-tag>
        </div>
      </template>
      <div style="color: #606266; line-height: 1.8;">
        Tout ce que l'utilisateur peut <strong>voir et cliquer</strong>
        <ul style="margin: 12px 0; padding-left: 20px;">
          <li>Titres, textes, images de la page</li>
          <li>Boutons, champs de saisie, menus déroulants</li>
          <li>Interface de jeu, animations</li>
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
          <el-tag type="info" size="small">Invisible</el-tag>
        </div>
      </template>
      <div style="color: #606266; line-height: 1.8;">
        Traitement des données sur le serveur
        <ul style="margin: 12px 0; padding-left: 20px;">
          <li>Stockage des scores</li>
          <li>Vérification de connexion</li>
          <li>Attribution des niveaux</li>
        </ul>
      </div>
    </el-card>
  </el-col>
</el-row>

### La trinité du frontend

Le navigateur construit les pages à partir de trois types de « code » :

<el-tabs type="border-card" style="margin: 20px 0;">
  <el-tab-pane label="🏗️ HTML - La structure">
    <div style="padding: 10px;">
      <p><strong>Rôle :</strong> Définir <strong>quels éléments</strong> se trouvent sur la page</p>
      <p><strong>Analogie :</strong> Le plan de la maison (où sont les murs, les portes, les fenêtres)</p>
      <el-card style="background: #f5f7fa; margin-top: 12px;">
        <pre style="margin: 0;"><code>&lt;button&gt;Cliquez ici&lt;/button&gt;
&lt;h1&gt;Titre&lt;/h1&gt;
&lt;img src="photo.png"&gt;</code></pre>
      </el-card>
    </div>
  </el-tab-pane>
  <el-tab-pane label="🎨 CSS - Le style">
    <div style="padding: 10px;">
      <p><strong>Rôle :</strong> Contrôler <strong>l'apparence</strong> des éléments</p>
      <p><strong>Analogie :</strong> La décoration de la maison (couleurs, matériaux, agencement)</p>
      <el-card style="background: #f5f7fa; margin-top: 12px;">
        <pre style="margin: 0;"><code>button {
  background: blue;
  color: white;
  border-radius: 8px;
}</code></pre>
      </el-card>
    </div>
  </el-tab-pane>
  <el-tab-pane label="⚡ JavaScript - Le comportement">
    <div style="padding: 10px;">
      <p><strong>Rôle :</strong> Rendre la page <strong>interactive</strong></p>
      <p><strong>Analogie :</strong> L'électricité de la maison (la réponse au clic)</p>
      <el-card style="background: #f5f7fa; margin-top: 12px;">
        <pre style="margin: 0;"><code>button.onclick = () => {
  alert('Vous avez cliqué !')
}</code></pre>
      </el-card>
    </div>
  </el-tab-pane>
</el-tabs>

### Comment le code devient-il une page ?

Quand vous ouvrez une page web, le navigateur traite les trois types de code dans l'ordre :

**1. HTML — Définir la structure de la page**
Le navigateur analyse d'abord le HTML pour comprendre quels éléments se trouvent sur la page (titres, paragraphes, images, boutons, etc.) et leurs relations hiérarchiques.

**2. CSS — Appliquer les styles**
Ensuite, le navigateur applique les règles CSS pour ajouter des styles aux éléments : couleurs, tailles, positions, espacements, etc.

**3. JavaScript — Ajouter de l'interactivité**
Enfin, le code JavaScript est exécuté pour rendre la page « vivante » : répondre aux clics, soumettre des formulaires, lire des animations, etc.

**4. Affichage de la page**
La combinaison de ces trois éléments produit la page web que vous voyez finalement.

### Les frameworks frontend modernes : de HTML à React/Vue

HTML, CSS et JavaScript constituent la « trinité » du développement frontend ; ils sont la base de toutes les pages web. Mais quand les pages deviennent complexes, les utiliser directement devient difficile : le code est dur à maintenir, il y a beaucoup de travail répétitif, et la synchronisation des données est problématique.

Les <strong>frameworks frontend modernes</strong> (React, Vue, Angular) s'appuient sur HTML/CSS/JS pour rendre le développement plus efficace :

**1. HTML/CSS/JS (stade de base)**
Manipulation directe des éléments de la page, adapté aux pages simples. Mais quand le volume de code augmente, toute la logique est mélangée, ce qui rend la maintenance difficile.

**2. jQuery (stade de transition)**
Simplifie les manipulations du DOM, rendant le code plus concis. Mais il faut toujours gérer manuellement l'état de la page et mettre à jour manuellement les éléments correspondants quand les données changent.

**3. React/Vue (stade moderne)**
Adopte une conception par composants et pilotée par l'état :
- **Composants** : découper la page en modules indépendants et réutilisables (boutons, cartes, barres de navigation)
- **Pilotage par l'état** : quand les données changent, le framework met à jour automatiquement l'interface correspondante

::: tip 💡 Pour comprendre simplement
- **HTML/CSS/JS** = matériaux de base (briques, ciment, acier)
- **React/Vue** = charpente de construction (fournit les normes et outils pour bâtir)

À l'ère de la programmation assistée par IA, vous n'avez pas besoin de maîtriser tous les détails des frameworks ; il vous suffit de comprendre leurs concepts de base pour pouvoir utiliser le langage naturel pour demander à l'IA de générer du code.
:::

### Dans le Vibe Coding

**Point clé : vous n'avez pas besoin de coder, juste de savoir décrire.**

Une fois les concepts frontend compris, vous pouvez décrire vos besoins à l'IA ainsi :

> « Crée une page de classement avec React, avec la liste des scores à droite, et en cliquant sur une ligne, affiche les détails du joueur en dessous, dans un style épuré et moderne. »

Pour approfondir les bases du frontend (HTML, CSS, JavaScript), consultez [l'annexe sur les fondamentaux du Web](/zh-cn/appendix/3-browser-and-frontend/javascript-deep-dive). Pour comprendre l'évolution historique du frontend, consultez [l'annexe sur l'évolution des frameworks frontend](/zh-cn/appendix/3-browser-and-frontend/frontend-frameworks).

## <span id="appendix-2">[Annexe 2 : Qu'est-ce que le Vibe Coding exactement](#appendix-nav)</span>

> 💡 Qu'est-ce que le Vibe Coding ? L'informaticien [Andrej Karpathy](https://karpathy.ai/) (co-fondateur d'OpenAI, ancien responsable IA chez Tesla) a introduit le terme **vibe coding** en février 2025. Ce concept désigne une méthode de programmation reposant sur les LLM, <strong>permettant aux développeurs de générer du code fonctionnel en fournissant des descriptions en langage naturel plutôt qu'en écrivant manuellement du code.</strong>

![1767350588191](../../../zh-cn/stage-1/ai-capabilities-through-games/images/1767350588191.png)

Littéralement, le Vibe Coding peut être compris comme une façon de « développer en parlant ». Son changement fondamental est le suivant : vous n'avez plus besoin d'écrire du code ligne par ligne, de vérifier la syntaxe, de déboguer ; vous décrivez simplement ce que vous voulez en langage naturel, par exemple :

« J'ai besoin d'une page de connexion, avec un champ pour le numéro de téléphone et un champ pour le code de vérification. »
« Après une connexion réussie, rediriger vers la page d'accueil et afficher le nom d'utilisateur en haut à droite. »
« Donne-moi un simple jeu de Snake contrôlable au clavier avec les flèches directionnelles. »
Les grands modèles de langage (LLM) traduisent automatiquement ces descriptions en code réellement exécutable et génèrent les pages, la logique et les structures de données correspondantes. Après avoir vu le résultat, vous exprimez vos modifications en langage naturel : « rends le bouton plus grand », « change le fond en sombre », « enregistre le score et affiche un classement », et l'IA continue à ajuster l'implémentation selon vos demandes.

Dans ce mode, vous n'avez pas besoin d'apprendre un langage de programmation avant de coder ; vous concentrez votre énergie sur : décrire clairement ce que vous voulez faire, évaluer le résultat « est-ce que ça correspond ? », puis proposer de nouvelles modifications. L'IA se charge de traduire ces idées de haut niveau en implémentation concrète, réduisant ainsi considérablement le travail de codage mécanique et répétitif.

Pour plus de détails sur le Vibe Coding : [https://www.ibm.com/think/topics/vibe-coding](https://www.ibm.com/think/topics/vibe-coding)

Pour plus de contenu de Karpathy : [https://karpathy.bearblog.dev/blog/](https://karpathy.bearblog.dev/blog/)

### Comment faire semblant d'être un maître du Vibe Coding

En réalité, dans un vrai processus de vibe coding, on n'utilise généralement pas de prompts très complexes. Peut-être qu'au début on doit fournir un prompt global précis et modérément complexe pour l'ensemble du programme, mais ensuite, à chaque étape, vous n'aurez probablement besoin que de ce type de prompts :

```
"Il y a un bug dans le code, corrige-le."
"Je ne veux pas un bout de code, donne-moi le code corrigé complet."
"Ton code a toujours des problèmes."
"Corrige à nouveau et donne-moi le code corrigé complet."
"Ça marchait tout à l'heure, pourquoi ça ne marche plus ?"
"Tu n'as pas compris ce que je voulais ? Ne modifie pas mon code d'origine."
"N'ajoute pas de fonctionnalités de débogage."
"Ne fais pas ce que je ne t'ai pas demandé."
"Où est la fonctionnalité que je t'ai demandée ?"
"Tu ne me comprends pas ?"
"Je veux juste une fonction."
"Je t'ai dit de te référer à mon code précédent."
"N'ajoute pas de commentaires inutiles."
"Ne modifie pas la logique de base de mon code."
"Aide-moi à modifier le code."
"Modifie en te basant sur mon code..."
"Ne change pas mes noms de variables !!!"
"Ne change pas les noms de fonctions originaux !"
"Ne touche pas à mes variables."
"N'ajoute pas de fonctionnalités supplémentaires."
"Ne génère pas juste un squelette, génère le code complet."
```

Cela peut paraître exagéré, mais en réalité, ce sont les types de prompts que nous utilisons couramment dans notre travail quotidien. En raison de la <strong>limite de longueur de contexte</strong> des grands modèles de langage, ou parfois de leur <strong>capacité de suivi des instructions</strong> qui n'est pas très forte, le modèle peut oublier des contenus discutés plus tôt dans la conversation. En vibe coding, nous préférons les modèles à contexte long et ceux avec une forte capacité de suivi des instructions.

## <span id="appendix-3">[Annexe 3 : Contexte des modèles](#appendix-nav)</span>

Le contexte d'un modèle peut être compris comme la mémoire à court terme de l'IA. Il désigne tout le contenu textuel que le modèle peut « voir » et « retenir » au cours d'une conversation ou d'une tâche, y compris vos questions précédentes, les instructions système, les documents de référence, etc.

C'est précisément grâce au contexte que l'IA peut comprendre que vous poursuivez sur le sujet précédent, et mener des conversations tour par tour qui semblent cohérentes et naturelles. Sans contexte, chaque phrase serait pour le modèle une question entièrement nouvelle, incapable de savoir ce que vous avez dit avant.

Chaque modèle a sa propre longueur de contexte effective (context window), généralement mesurée en tokens (une unité correspondant approximativement à des « fragments de mots »). Les modèles actuels se situent généralement entre 32k et 128k tokens. Plus le contexte est long, plus le modèle peut « lire » de contenu en une seule fois.

Quand le contenu que vous saisissez approche ou dépasse la limite de contexte du modèle, plusieurs phénomènes courants peuvent apparaître :

- Le modèle commence à oublier des détails ou des informations clés dans les longs textes
- La conversation dévie progressivement de l'objectif initial
- Les contenus cités deviennent incohérents entre différentes questions

Ces phénomènes ne signifient pas que le modèle est soudainement « devenu bête », mais résultent naturellement lorsque la capacité de contexte est saturée ou presque saturée.

Dans la pratique, nous souhaitons un contexte aussi long que possible, tout en étant conscients que :

- Plus le contexte est long, plus les ressources de calcul sont importantes
- Le coût d'appel augmente en conséquence

Il faut donc trouver un équilibre entre laisser le modèle voir suffisamment de contenu et maîtriser les coûts et l'efficacité.

## <span id="appendix-4">[Annexe 4 : Capacité de suivi des instructions](#appendix-nav)</span>

La capacité de suivi des instructions désigne la capacité du modèle, après avoir compris vos instructions, à les exécuter de manière précise et complète. Cela inclut non seulement la capacité à répondre à des questions, mais aussi à accomplir des tâches selon un format, un style et des étapes spécifiés.

Un modèle avec une forte capacité de suivi des instructions présente généralement les caractéristiques suivantes :

- Il produit le contenu dans la quantité demandée
- Il couvre tous les éléments spécifiés
- Il respecte le format et le ton spécifiés
- Il ne fait pas d'extensions inutiles

En pratique, une forte capacité de suivi des instructions est très importante car elle améliore la stabilité, la reproductibilité et facilite l'intégration système.

<RelatedArticlesSection
  title="Continuer l'apprentissage"
  description="À partir de l'« expérience ludique », nous vous recommandons de poursuivre vers le développement local et la pratique produit."
  :items="relatedArticles"
/>
---
title: 'Debutant 1 : A l ere de l IA, parler c est programmer'
description: 'Creer un jeu du serpent AI-native par conversation, puis reutiliser la methode pour construire ton propre mini jeu ou demo.'
---
