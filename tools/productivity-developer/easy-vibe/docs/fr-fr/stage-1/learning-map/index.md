---
title: "De l'idée au produit AI - Parcours d'apprentissage Easy-Vibe"
description: "Parcours d'apprentissage complet de la programmation AI : de zéro au développement full-stack. Maîtrisez le Vibe Coding, Claude Code, Cursor et d'autres outils IDE AI, apprenez la réflexion produit, le développement full-stack et l'intégration de capacités AI."
---

<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const relatedArticles = relatedArticlesMap['fr-fr/stage-1/learning-map'] ?? []
</script>

# De l'idée au produit AI

::: info Remerciements spéciaux
Un grand merci aux étudiants de l'**Université Tsinghua, Campus international de Shenzhen** pour leurs tests, retours et soutien de ce cours ! Vos avis et contributions ont permis d'améliorer ce cours. [👉 Voir la liste complète des contributeurs](https://github.com/datawhalechina/easy-vibe#-contributing--contributors)
:::

Autrefois, créer un logiciel était un processus très exigeant : il fallait connaître la programmation, comprendre les algorithmes et avoir des années d'expérience en projet.
Aujourd'hui, tout a changé. Si vous avez une idée, l'IA peut écrire le code pour vous.

C'est un changement majeur : **les langages de programmation deviennent des langages naturels**.

L'apparition des grands modèles de langage (LLM) a fait en sorte que le développement n'est plus « l'apanage des experts techniques », mais un outil que tout le monde peut prendre en main. Ce qui était autrefois le plus difficile — « comment écrire du code » — est devenu ce qui est le plus difficile aujourd'hui : « **que voulez-vous créer** ».

> **Qu'est-ce que le Vibe Coding ?**
> En termes simples, c'est « programmer en parlant ». Le Vibe Coding signifie que vous pouvez réaliser un projet de programmation en vous appuyant uniquement sur des conversations avec l'IA, plutôt que d'écrire du code directement.

Bien sûr, faire en sorte que l'IA écrive du code n'est que la première étape. Pour créer un produit véritablement utilisable, vous rencontrerez d'autres défis :
- Comment faire en sorte que l'IA écrive un code propre et maintenable ?
- Comment assembler des fragments de code en une application fonctionnelle ?
- Comment mettre une application en ligne et la faire utiliser par de vrais utilisateurs ?
- Comment intégrer des capacités AI comme la génération de texte et la reconnaissance d'images dans votre produit ?

Ce cours vous aidera à trouver des réponses à ces questions.

Que vous soyez étudiant, enseignant, médecin, ouvrier, ou toute personne sans aucune connaissance technique — sans avoir besoin d'apprendre la programmation pendant des années, vous pourrez en deux semaines créer un prototype fonctionnel et démontrable.

| Votre profil | Ce que ce cours peut vous apporter |
|---------|-------------|
| Étudiant | Devoirs, concours, création d'entreprise : réalisez vos projets vous-même, sans dépendre de personne |
| Professionnel | Automatisez les tâches répétitives, améliorez votre efficacité, voire développez un projet parallèle |
| Chef de produit / Designer | Vos idées ne restent plus sur papier : créez rapidement des démos pour votre patron ou vos clients |
| Entrepreneur / PME | Validez vos idées à moindre coût, créez un MVP sans dépenser des milliers en sous-traitance |
| Enseignant / Formateur | Créez des outils pédagogiques, des supports de cours, générez automatiquement des exercices |
| Médecin / Avocat / Professionnel | Automatisez vos processus métier, créez vos propres outils d'efficacité |
| Tout le monde | Utilisez l'IA pour résoudre des problèmes concrets du quotidien ou professionnel, rendez l'impossible possible |

À l'ère de l'IA, la capacité d'exécution et les idées sont toujours plus importantes que la technique.

## Parcours de croissance : de « savoir utiliser l'IA » à « savoir créer des produits AI »

<div class="stage-intro">
  <div class="stage-card">
    <div class="stage-icon">🎮</div>
    <h3>Débutant</h3>
    <p class="stage-role">Découvrir la programmation AI</p>
    <div class="stage-tags">
      <span>Jeu du serpent</span>
      <span>Prise en main sans prérequis</span>
      <span>Première expérience Vibe Coding</span>
      <span>Génération en quelques minutes</span>
    </div>
  </div>
</div>

<div class="stage-grid">
  <div class="stage-card">
    <div class="stage-icon">🛠️</div>
    <h3>Première étape</h3>
    <p class="stage-role">Chef de produit / Operations</p>
    <div class="stage-tags">
      <span>IDE AI (Cursor/Claude)</span>
      <span>Décomposition des besoins & Prototype</span>
      <span>Intégration de capacités AI</span>
      <span>Développement complet d'une démo</span>
    </div>
  </div>
  <div class="stage-card">
    <div class="stage-icon">💻</div>
    <h3>Deuxième étape</h3>
    <p class="stage-role">Développeur junior / Développeur indépendant</p>
    <div class="stage-tags">
      <span>De Figma au code</span>
      <span>Base de données Supabase</span>
      <span>Intégration de paiement Stripe</span>
      <span>Base de connaissances Dify</span>
    </div>
  </div>
  <div class="stage-card">
    <div class="stage-icon">🚀</div>
    <h3>Troisième étape</h3>
    <p class="stage-role">Développeur senior / Architecte</p>
    <div class="stage-tags">
      <span>Web/Mini-programmes/Multi-plateforme</span>
      <span>Outils avancés MCP</span>
      <span>RAG & LangGraph</span>
      <span>Mentalité d'ingénieur senior</span>
    </div>
  </div>
</div>

<style>
.stage-intro {
  margin: 20px auto;
  max-width: 400px;
}

.stage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  margin: 16px 0;
}

.stage-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 12px;
  background-color: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
}

.stage-card:hover {
  transform: translateY(-2px);
  background-color: var(--vp-c-bg-mute);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  border-color: var(--vp-c-brand);
}

.stage-icon {
  font-size: 2rem;
  margin-bottom: 8px;
  line-height: 1;
}

.stage-card h3 {
  margin: 0 0 4px 0 !important;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.2;
}

.stage-role {
  margin: 0 0 8px 0 !important;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.stage-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
}

.stage-tags span {
  font-size: 0.7rem;
  padding: 1px 6px;
  border-radius: 3px;
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

.stage-card:hover .stage-tags span {
  background-color: var(--vp-c-bg);
  border-color: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand-dark);
}
</style>

À travers ce parcours d'apprentissage complet, vous acquerrez :

- **Compétences en développement Vibe Coding :** Maîtrisez la mentalité du Vibe Coding et les outils de codage AI pour multiplier votre efficacité de développement. Au lieu de mémoriser la syntaxe, apprenez à guider l'IA pour qu'elle génère du code de haute qualité.
- **Compétences en développement full-stack :** De la conception UI à l'implémentation frontend, de la conception de base de données au développement d'API, du développement local au déploiement cloud, maîtrisez la stack technologique complète des applications Web modernes.
- **Intégration de capacités AI :** Apprenez à appeler diverses API AI multimodales, intégrez de manière transparente les capacités AI de texte, image et voix dans vos applications, et construisez des produits intelligents grâce à des technologies comme le RAG.
- **Réflexion produit et compétences opérationnelles :** De la recherche utilisateur à la décomposition des besoins, de la conception MVP à l'itération produit, de l'intégration des paiements à la gestion des utilisateurs, formez un cycle complet de développement et d'exploitation de produits.

# Que pourrez-vous faire après avoir appris ?

## Première étape : Créer votre premier prototype de produit

Cette étape est destinée à ceux qui n'ont aucune base en programmation, ou qui n'en ont qu'une petite mais manquent de confiance. Vous n'avez pas besoin d'apprendre d'abord beaucoup de théorie — vous apprenez directement en pratiquant, en utilisant des outils AI pour écrire du code.

**Après avoir appris, vous pourrez :**
- Utiliser des outils de programmation AI pour réaliser indépendamment une application web
- Transformer une idée produit en un prototype cliquable et interactif
- Ajouter des fonctionnalités AI à votre prototype (par exemple, génération d'images à partir de texte, conversation intelligente)
- Savoir comment diagnostiquer et résoudre les erreurs

En bref, vous serez capable de créer quelque chose qui « fonctionne et peut être montré à d'autres ».

Nous pouvons d'abord découvrir la programmation AI à travers des petits jeux, puis apprendre à utiliser des outils de programmation AI pour vous aider à écrire du code et corriger les erreurs. Ensuite, en commençant par des pages simples, nous réaliserons progressivement des applications multi-pages interactives, puis ajouterons des fonctionnalités AI comme la génération d'images à partir de texte et les conversations intelligentes. Enfin, vous réaliserez indépendamment un projet complet, donnant à vos idées une véritable chance de se concrétiser.

# Pourquoi utiliser une approche par projets pour s'entraîner ?

> **Les défis du monde réel**
>
> La raison est en fait assez simple : dans l'état actuel de la plupart des étudiants, entrer directement dans le monde professionnel signifierait se faire rudement « corriger » par les projets réels et les patrons / clients. Les scénarios les plus courants dans le monde réel sont plutôt :

> Votre mentor / patron : Nous devons créer un xxx, l'objectif est d'atteindre l'effet yyy.
>
> Documentation ? Framework existant ? Spécifications détaillées ? Bien souvent, rien de tout cela n'existe.

De nombreuses tâches dans le travail réel consistent essentiellement à résoudre des problèmes jamais vus auparavant dans un environnement hautement incertain : les besoins sont flous, les périmètres évoluent, personne ne vous donne de réponse standard. Vous devez chercher vous-même des informations, faire des expériences, construire des prototypes, itérer constamment, et finalement proposer une solution « qui fonctionne, qui est utilisable et qui peut être mise en ligne ».

Ce que ce cours cherche à faire, c'est de vous donner une « simulation de correction du monde réel » dans un environnement relativement sûr :

- Par des projets qui semblent difficiles, vous forcer à pratiquer la décomposition de problèmes, la conception de solutions et la recherche autonome d'informations
- Par des outils et du code qui ne sont pas « simplifiés à l'extrême », vous apprendre à lire, comprendre et modifier une base de code de taille moyenne à grande
- Par un cycle complet de l'idée à la mise en ligne, vous faire vivre le processus complet de création d'un produit de 0 à 1

À court terme, cet entraînement est effectivement exigeant ; mais à long terme, il augmentera considérablement votre compétitivité dans votre recherche d'emploi et votre évolution professionnelle : vous serez plus capable de supporter la pression, de trouver des percées dans des environnements incertains, et plus capable de transformer l'IA en produits réellement déployés, au lieu de rester au stade des « démos ».

# L'art de poser des questions : une compétence essentielle à l'ère de l'IA

À l'ère de l'IA, savoir poser des questions est aussi une « compétence fondamentale ». Pour un même code, une même erreur, **la façon dont vous posez la question détermine presque la qualité de la réponse que l'IA peut donner** : une réponse générique ou une correction étape par étape applicable.

**Prenez une bonne habitude :** intégrez « poser des questions à l'IA » dans votre flux de développement quotidien : dès que vous ne comprenez pas quelque chose ou que vous êtes bloqué, posez la question immédiatement.

## Pourquoi est-ce une compétence essentielle ?

- **Rarement il existe une documentation complète dans la réalité** : la plupart du temps, vous êtes confronté à des besoins imprécis, du code à moitié fini, des messages d'erreur épars
- **L'IA est votre mentor et collègue de toujours** : une personne qui sait poser des questions peut en faire un « pair programming de haute qualité »
- **La limite de vos capacités est déterminée par votre communication** : plus vous fournissez d'informations clés et plus vous contraignez le format de sortie, plus la réponse sera utilisable

**Malentendu courant :** poser simplement « pourquoi ça plante ? » ne donnera souvent que des suppositions. Complétez le contexte pour obtenir des solutions actionnables.

## Comment « nourrir » l'IA en informations : capture d'écran vs copier-coller

Les deux méthodes fonctionnent, mais pour des usages différents :

| Méthode | Scénarios appropriés | Points clés |
| ------------ | --------- | --------- |
| **Copier-coller** | Piles d'erreurs, logs, code, configuration, réponses d'API | Copiez le plus complètement possible, ne vous contentez pas d'une seule ligne clé |
| **Capture d'écran** | Problèmes de mise en page UI, anomalies d'interaction, interface d'outil où vous ne trouvez pas un bouton | Capture d'écran complète + annotation des zones importantes, idéalement avec une brève description textuelle |

::: danger ⚠️ Prérequis important
**Tous les modèles AI ne prennent pas en charge l'entrée d'images.** La communication par capture d'écran nécessite que l'IA possède des capacités multimodales (c'est-à-dire la capacité de comprendre et d'analyser des images). Les AI prenant actuellement en charge l'entrée d'images incluent : Claude (Anthropic), GPT-4V/GPT-4o (OpenAI), Gemini (Google), ainsi que certains modèles chinois comme Qwen, ERNIE Bot, etc.

**Si l'IA que vous utilisez ne prend pas en charge l'entrée d'images**, les captures d'écran ne pourront pas être reconnues. Dans ce cas, utilisez plutôt la méthode du copier-coller de texte.
:::

## Techniques de prompt pour que l'IA « explique bien »

Si vous ne voulez pas seulement la réponse, mais « comprendre » la réponse, utiliser des instructions similaires à celles ci-dessous améliorera significativement la qualité des explications :

> **Exemple de question d'apprentissage**
>
> - « Explique-moi d'abord ce concept en 5 phrases, puis pose-moi quelques questions pour vérifier que j'ai bien compris. »
> - « Explique-moi en détail ce message d'erreur, je ne comprends pas pourquoi cela plante. »

# J'ai persévéré longtemps mais je n'y arrive toujours pas, je veux abandonner

C'est peut-être votre méthode de persévérance qui n'est pas la bonne. Ne vous débattez pas seul dans le noir — venez discuter avec les auteurs et les assistants : exposez honnêtement les méthodes que vous avez déjà essayées, les blocages spécifiques que vous rencontrez, et votre état psychologique actuel. Très souvent, un léger ajustement de direction ou l'ajout d'une connaissance clé vous permettra de continuer à avancer.

# Je trouve que certains aspects du tutoriel ne sont pas bien conçus

N'hésitez pas à contacter les auteurs, à soumettre une issue, ou à faire part de vos retours dans le groupe ou en cours. Nous espérons vraiment travailler avec vous pour perfectionner ce tutoriel : ce qui n'est pas clair, ce qui donne une mauvaise expérience, ce qui vous fait perdre du temps inutilement — tout cela peut être signalé franchement. Plus les retours sont authentiques et spécifiques, plus ils aideront les futurs apprenants à éviter les pièges.

# Références

- [Université de Nanking, Département d'informatique, Fondamentaux des systèmes informatiques, Travaux pratiques](https://nju-projectn.github.io/ics-pa-gitbook/ics2025/)

<RelatedArticlesSection
  title="Que pouvez-vous apprendre ensuite"
  description="Continuez à progresser selon le parcours « de savoir utiliser l'IA à savoir créer des produits »."
  :items="relatedArticles"
/>
