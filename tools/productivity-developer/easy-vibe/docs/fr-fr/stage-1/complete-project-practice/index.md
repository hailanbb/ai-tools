---
title: 'Projet complet - De la démo au prototype de niveau produit'
description: 'Dépassez le stade de la démo, apprenez à compléter les parcours produit, à construire des données simulées réalistes, à itérer rapidement grâce au feedback, et finalisez un prototype AI complet, présentable et interactif.'
---

<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const duration = 'Environ <strong>3 jours</strong>'
const relatedArticles =
  relatedArticlesMap['fr-fr/stage-1/complete-project-practice'] ?? []
</script>

# Débutant 5 : Projet complet en conditions réelles

## Introduction du chapitre

<ChapterIntroduction :duration="duration" :tags="['Esprit produit', 'Données simulées', 'Interactions complètes', 'LocalStorage']" coreOutput="1 prototype de produit AI fonctionnel" expectedOutput="Application Web avec des parcours complets et des données réalistes">

Au chapitre précédent, vous avez intégré les capacités AI et la démo fonctionne, mais vous êtes encore <strong>très loin</strong> d'un vrai « produit » : au premier rafraîchissement, <strong>les données disparaissent</strong>, en cas d'erreur c'est <strong>un écran blanc</strong>, la liste ne contient que des « données de test 1, données de test 2 », et si l'utilisateur se trompe, <strong>impossible d'annuler</strong>...

Ce chapitre va <strong>combler toutes ces lacunes</strong> : nous allons <strong>compléter les parcours produit</strong>, utiliser l'AI pour générer des <strong>données métier réalistes</strong> à la place des fausses données, ajouter la <strong>gestion des erreurs et le feedback utilisateur</strong>, et enfin produire un <strong>prototype complet que vous pourrez fièrement montrer</strong>.

C'est le <strong>dernier chapitre</strong> de la phase débutant. Une fois cette étape franchie, vous serez passé de « incapable de programmer » à « <strong>capable de créer seul un prototype de produit AI</strong> ».

</ChapterIntroduction>

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Compléter les parcours', description: 'D\'une fonctionnalité isolée à une boucle complète' },
      { title: 'Insuffler l\'âme', description: 'Simuler des données métier réalistes' },
      { title: 'Feedback et itération', description: 'Améliorer l\'expérience à partir des retours' },
      { title: 'Projet final', description: 'Votre projet de fin d\'études' }
    ]" />
  </ClientOnly>
</div>

## 1. Refuser le « Happy Path » : compléter les parcours critiques

Beaucoup de débutants, en réalisant un prototype, se contentent du « Happy Path » (le chemin idéal) : l'utilisateur clique -> l'API répond avec succès -> le résultat s'affiche.
Mais dans le monde réel, les choses se passent rarement aussi bien. Pour que votre prototype ressemble à un vrai produit, vous devez prendre en compte ces étapes « invisibles ».

### 1.1 Ajouter de l'attente et du feedback

Lorsque l'utilisateur clique sur « Générer le texte », l'AI met souvent plusieurs secondes à répondre. Si l'interface ne réagit pas, l'utilisateur pensera que le programme est planté.
**Demandez à votre AI IDE d'ajouter un état de chargement (Loading) :**

> Exemple de prompt :
> « Lorsque je clique sur le bouton de génération, transforme le bouton en "Génération en cours..." et rends-le non cliquable, tout en affichant une animation de chargement dans la zone de droite. Ce n'est qu'au retour de l'API que tout redevient normal. »

### 1.2 Gérer les échecs et les exceptions

La clé API peut expirer, le réseau peut tomber en panne.
**Demandez à votre AI IDE de gérer les erreurs :**

> Exemple de prompt :
> « Si la requête API échoue, ne te contente pas d'afficher une erreur dans la console. Fais apparaître une notification rouge (Toast) en haut de la page indiquant "Échec de la génération, veuillez réessayer plus tard", et permets à l'utilisateur de cliquer à nouveau sur le bouton. »

### 1.3 Persistance de l'historique de conversation

Au cours de l'interaction avec l'AI, nous devons sauvegarder le contenu des conversations pour que l'utilisateur puisse revoir l'historique et poursuivre ses échanges précédents. À ce stade, nous n'introduisons pas encore de base de données ; vous pouvez choisir l'une des solutions légères suivantes :

**Choix de la solution de stockage :**

| Solution | Cas d'usage | Caractéristiques |
| ---------------- | -------------------------------- | ------------------------------------ |
| **LocalStorage** | Projet purement frontend, données utilisateur sauvegardées dans le navigateur | Simple à implémenter, persiste au rafraîchissement, pas de synchronisation entre appareils |
| **Fichier JSON** | Prototype local, données stockées sous forme de fichier | Structure claire, facile à déboguer, modifiable manuellement |
| **Fichier TXT** | Solution minimale, enregistrement rapide de texte | Format libre, bonne compatibilité |

**Exemple de contenu de conversation :**
L'historique sauvegardé contient généralement les éléments suivants :

```json
[
  {
    "role": "user",
    "content": "Aide-moi à générer un texte promotionnel TikTok pour des écouteurs Bluetooth",
    "timestamp": "2026-01-20 10:30:00"
  },
  {
    "role": "assistant",
    "content": "【Texte promotionnel écouteurs Bluetooth】\n\n🎧 Dites adieu à la latence, une expérience d'écoute immersive\n\nLes amis ! Ces écouteurs Bluetooth sont vraiment incroyables 👇\n\n✅ 40 dB de réduction de bruit active, plongez instantanément dans la musique\n✅ 30 heures d'autonomie, une semaine de trajets sans recharge\n✅ Appels clairs comme en face-à-face, même dans le métro\n✅ Design demi-intra, confortable même après des heures d'utilisation\n\n💰 Offre à durée limitée, cliquez sur le lien ci-dessous pour commander !",
    "timestamp": "2026-01-20 10:30:05"
  }
]
```

**Prompt pour l'implémentation :**

> « Aide-moi à implémenter la fonctionnalité de sauvegarde de l'historique de conversation. Supporte la sauvegarde des enregistrements de conversation entre l'utilisateur et l'AI sous forme de fichier JSON (ou utilise LocalStorage). Au chargement de la page, charge automatiquement l'historique précédent. Permet de consulter et de supprimer des conversations individuelles. »

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="1" :items="[
      { title: 'Compléter les parcours', description: 'D\'une fonctionnalité isolée à une boucle complète' },
      { title: 'Insuffler l\'âme', description: 'Simuler des données métier réalistes' },
      { title: 'Feedback et itération', description: 'Améliorer l\'expérience à partir des retours' },
      { title: 'Projet final', description: 'Votre projet de fin d\'études' }
    ]" />
  </ClientOnly>
</div>

## 2. Insuffler l'âme : simuler des données réalistes (Mock Data)

Une page vide ne convaincra personne. Imaginez que vous présentiez un « espace de travail e-commerce » et que l'historique soit totalement vide, ou ne contienne qu'une seule ligne « test / test / test ».
Pour obtenir le meilleur effet de démonstration, nous devons « forger » des données réalistes afin que votre prototype ressemble à un vrai produit en exploitation depuis six mois.

### 2.1 Laissez l'AI concevoir la structure de données

Nous n'avons pas besoin de réfléchir nous-mêmes au nom de chaque champ (par exemple, faut-il utiliser `name` ou `title` ?). Cette tâche peut être entièrement déléguée à l'AI.

Il suffit de décrire votre **scénario métier** à l'AI :

> **Exemple de prompt :**
> « Je suis en train de réaliser le prototype d'un **espace de travail e-commerce TikTok**.
> Aide-moi à concevoir une structure de données JSON pour décrire une "tâche produit".
> Cette tâche doit contenir : les informations de base du produit (nom, catégorie), les ressources fournies en entrée (liens d'images), et les résultats générés par l'AI (titre, texte, image d'affiche).
> Donne-moi directement un exemple JSON. »

L'AI concevra automatiquement des champs comme `productName`, `generatedContent` en fonction de votre description.

### 2.2 Laissez l'AI produire en masse des données « réalistes »

Une fois la structure de données établie, l'étape suivante consiste à demander à l'AI de « remplir les cases » et de générer un jeu de données d'apparence réaliste.

**Astuces pour les prompts :**
Vous ne pouvez pas simplement dire à l'AI « génère des données ». Vous devez lui donner des instructions comme si vous assigniez une tâche à un stagiaire : précisez le **contexte métier** et les **exigences de contenu** :

- **Contexte métier** : dites à l'AI que nous faisons du « e-commerce TikTok », donc les titres de produits doivent être accrocheurs (par exemple « L'astuce infaillible pour paraître plus mince », « Indispensable pour les étudiants »), et les textes doivent être conversationnels.
- **Exigences pour les images** : pour que le prototype soit attrayant, les images ne doivent pas être des espaces réservés en noir et blanc ; il est préférable d'utiliser des images aléatoires en couleur (paysages ou objets réels).

> **Exemple de prompt :**
> « En te basant sur la structure conçue précédemment, génère 10 entrées de données simulées réalistes.
> (Remarque : le format n'a pas besoin d'être JSON. Si tu écris du frontend, tu peux générer directement un tableau JavaScript ; si tu utilises Python, tu peux générer une List.)
>
> **Exigences du scénario métier :**
>
> 1. Suppose qu'il s'agit d'un grand magasin généraliste, avec des produits couvrant les catégories "Mode féminine", "Électronique" et "Beauté".
> 2. **Les titres et textes générés doivent être très "style TikTok"** : par exemple, les titres doivent contenir des Emoji (🔥, ✨), les textes doivent utiliser un ton comme "C'est trop bien !", "Testé et approuvé".
> 3. **Champ image** : utilise systématiquement le format `https://picsum.photos/seed/{random_id}/300/400` pour garantir que chaque image est différente. »

**Exemple de Mock Data généré :**

```javascript
export const mockProductTasks = [
  {
    id: 'task_001',
    name: 'Robe d\'été vintage à imprimé fleuri style français',
    status: 'completed',
    input: {
      category: 'Mode féminine',
      features: ['Taille marquée', 'Amincissant', 'Élégant'],
      originalImage: 'https://picsum.photos/seed/dress_input/300/400'
    },
    output: {
      generatedTitle: '✨ Magnifique sur tout le monde ! Cette robe à imprimé fleuri style français est vraiment incroyable 🔥',
      generatedCopy:
        'Les filles ! Cette robe affine vraiment la silhouette ! La taille marquée est parfaite, on a immédiatement une silhouette élégante. Le tissu est très respirant, pas du tout étouffant en été. Idéale pour un rendez-vous ou une sortie ! 👗',
      generatedPosterImage: 'https://picsum.photos/seed/dress_output/300/400'
    },
    createdAt: '2026-01-20T10:00:00Z'
  },
  {
    id: 'task_002',
    name: 'Écouteurs Bluetooth Pro à réduction de bruit ultra-puissante',
    status: 'completed',
    input: {
      category: 'Électronique',
      features: ['Réduction de bruit', 'Autonomie prolongée', 'Faible latence'],
      originalImage: 'https://picsum.photos/seed/tech_input/300/400'
    },
    output: {
      generatedTitle: '🎧 Enfin trouvés ! Ces écouteurs ont une réduction de bruit incroyable ! 🔇',
      generatedCopy:
        'Dès qu\'on les met, le monde devient silencieux. La qualité sonore est exceptionnelle, écouter de la musique c\'est comme être en concert. L\'autonomie est aussi très bonne, une seule charge pour une semaine entière ! Indispensable pour les étudiants !',
      generatedPosterImage: 'https://picsum.photos/seed/tech_output/300/400'
    },
    createdAt: '2026-01-21T14:30:00Z'
  }
  // ... plus de données
]
```

### 2.3 (Avancé) Implémenter de « fausses opérations CRUD » avec LocalStorage

Si vous souhaitez que les « données simulées » générées précédemment soient non seulement consultables, mais aussi supprimables et modifiables, et que les nouvelles tâches persistent après un rafraîchissement de la page, vous pouvez combiner cela avec `LocalStorage`.

> **Exemple de prompt :**
> « Aide-moi à implémenter une fonctionnalité de stockage de données.
>
> 1. Lis d'abord les données depuis `localStorage`.
> 2. Si `localStorage` est vide, initialise avec les données Mock générées précédemment et stocke-les dans `localStorage`.
> 3. Écris également les fonctions `addProductTask` et `deleteProductTask`, en mettant à jour `localStorage` à chaque opération. »

Avec cette étape, votre prototype acquiert une « mémoire » et l'expérience utilisateur est presque identique à celle d'un vrai produit.

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="2" :items="[
      { title: 'Compléter les parcours', description: 'D\'une fonctionnalité isolée à une boucle complète' },
      { title: 'Insuffler l\'âme', description: 'Simuler des données métier réalistes' },
      { title: 'Feedback et itération', description: 'Améliorer l\'expérience à partir des retours' },
      { title: 'Projet final', description: 'Votre projet de fin d\'études' }
    ]" />
  </ClientOnly>
</div>

## 3. Collecter les retours et itérer rapidement

On ne peut pas créer un bon produit en travaillant isolément. Maintenant que votre prototype dispose de « fonctionnalités clés » + « parcours complets » + « données de démonstration », il est temps de le montrer à d'autres personnes.

### 3.1 Qui tester ? Comment tester ?

- **Amis / collègues** : pas besoin qu'ils comprennent la technique, il suffit de leur demander d'essayer.
- **Observer plutôt que guider** : ne dites pas « clique ici », mais observez où ils cliquent naturellement. S'ils ne trouvent pas un bouton, c'est que le design pose problème.
- **Méthode « Wizard of Oz »** : si votre AI n'est pas encore connectée, vous pouvez modifier manuellement les données en arrière-plan (ou dans la base de données) pour simuler le retour de l'AI, afin de valider d'abord si l'utilisateur a réellement besoin de cette fonctionnalité.

### 3.2 Face aux bugs et aux critiques

- **Mise en page cassée** : sur certaines tailles d'écran, l'affichage peut être dégradé.
  - **Action** : faites une capture d'écran et envoyez-la à l'AI IDE -> « La mise en page est cassée à cette largeur d'écran, aide-moi à corriger. »
- **Interactions maladroites** : « ce processus est trop compliqué ».
  - **Action** : transmettez la suggestion à l'AI IDE -> « L'utilisateur trouve le processus upload puis génération trop lent, peut-on passer à une génération en un clic ? »
- **Nouvelles demandes** : « si seulement il y avait cette fonctionnalité ».
  - **Action** : évaluez si c'est essentiel ; si oui, demandez à l'AI d'implémenter rapidement une version simplifiée.

**Rappelez-vous : à ce stade, l'AI est votre meilleur assistant pour les modifications. Vous êtes uniquement responsable d'identifier les problèmes ; confiez la modification du code à l'AI.**

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="3" :items="[
      { title: 'Compléter les parcours', description: 'D\'une fonctionnalité isolée à une boucle complète' },
      { title: 'Insuffler l\'âme', description: 'Simuler des données métier réalistes' },
      { title: 'Feedback et itération', description: 'Améliorer l\'expérience à partir des retours' },
      { title: 'Projet final', description: 'Votre projet de fin d\'études' }
    ]" />
  </ClientOnly>
</div>

## 4. 🎓 Projet final : réalisez votre « projet de fin d'études »

Félicitations ! Vous avez parcouru tout le processus, du « besoin » au « prototype » puis à l'« intégration AI ». Il est maintenant temps de présenter votre résultat final.

**Ce projet final n'est plus limité à l'« espace de travail e-commerce ». Vous devez combiner vos propres centres d'intérêt ou votre expérience professionnelle pour créer un prototype de produit AI unique.**

### Choix du sujet et exigences

Vous devez choisir le scénario le plus pertinent parmi les **[Références de scénarios multi-sectoriels](../appendix-industry-scenarios/index.md)**, ou imaginer un scénario entièrement nouveau à partir de vos propres idées.

**Le projet doit utiliser de manière intégrée tout ce que vous avez appris dans les chapitres précédents :**

1. **Construction du prototype** : utilisez des technologies frontend pour créer une interface esthétique et facile à utiliser.
2. **Maîtrise des besoins** : ne visez pas l'exhaustivité, mais assurez-vous que les fonctionnalités centrales forment une boucle logique complète.
3. **Intégration API** : connectez un véritable modèle AI (LLM/VLM, etc.) pour donner à l'application une véritable intelligence.
4. **Une application fonctionnelle** : pas seulement une page statique, mais une application dynamique avec un flux de données et des interactions avec feedback.

### Livrables du projet

Vous devez finalement soumettre les deux éléments suivants :

1. **Un prototype d'application complet** : déployé en ligne ou exécutable localement, avec un parcours d'utilisation complet.
2. **Une vidéo de démonstration de 30 secondes** : enregistrez une vidéo présentant brièvement le scénario de votre application et démontrant le fonctionnement réel des fonctionnalités clés.

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px;">
  <template #header>
    <div style="font-weight: bold; font-size: 16px;">🚀 Liste de vérification finale</div>
  </template>

  <p>
    C'est la dernière épreuve du Stage 1. Vérifiez votre travail selon la liste suivante :
  </p>

  <div style="font-weight: bold; margin-bottom: 10px;">Auto-vérification des fonctionnalités clés</div>
  <ul style="list-style-type: none; padding-left: 0;">
    <li><label><input type="checkbox" disabled /> <strong>Scénario clair</strong> : un secteur ou scénario d'application spécifique a été choisi</label></li>
    <li><label><input type="checkbox" disabled /> <strong>Boucle logique</strong> : le flux principal fonctionne, pas seulement le Happy Path</label></li>
    <li><label><input type="checkbox" disabled /> <strong>Piloté par l'AI</strong> : l'API du grand modèle est réellement appelée, pas de réponses prédéfinies</label></li>
    <li><label><input type="checkbox" disabled /> <strong>Expérience complète</strong> : inclut le Loading, la gestion des erreurs et les données simulées</label></li>
  </ul>

  <div style="font-weight: bold; margin: 20px 0 10px;">Préparation des livrables</div>
  <ul style="list-style-type: none; padding-left: 0;">
    <li><label><input type="checkbox" disabled /> <strong>Prototype d'application</strong> : le code est terminé et exécutable</label></li>
    <li><label><input type="checkbox" disabled /> <strong>Vidéo de démonstration</strong> : environ 30 secondes, montrant clairement les points forts</label></li>
  </ul>
</el-card>

## Prochaine étape

Une fois le projet final terminé, vous êtes désormais capable de « développer seul un prototype d'application AI ».
Dans le Stage 2 qui suit, nous approfondirons le développement full-stack plus complexe et apprendrons comment transformer ce prototype en une véritable application commerciale, déployable en ligne, avec une base de données et un système utilisateur.

Rendez-vous à la prochaine étape !

<RelatedArticlesSection
  title="Continuer à progresser"
  description="Félicitations pour avoir terminé le Stage 1, ces chapitres peuvent vous aider à passer au développement professionnel."
  :items="relatedArticles"
/>
