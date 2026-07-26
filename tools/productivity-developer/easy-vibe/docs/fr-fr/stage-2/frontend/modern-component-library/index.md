# Mettre à jour votre interface avec une bibliothèque de composants moderne

Dans les cours précédents, vous avez appris à utiliser des outils de conception pour créer des interfaces, à convertir des maquettes en code avec un IDE AI, et même à réaliser un projet frontend complet. Mais vous avez peut-être remarqué un problème : les boutons, formulaires et boîtes de dialogue écrits de zéro fonctionnent, mais semblent toujours manquer de quelque chose par rapport aux « produits professionnels » — styles pas assez uniformes, détails d'interaction pas assez fluides, et l'adaptation à différents écrans est un vrai casse-tête.

C'est exactement le problème que les **bibliothèques de composants** résolvent.

Une bibliothèque de composants est un ensemble d'éléments UI pré-conçus et pré-développés. Boutons, champs de saisie, menus déroulants, boîtes de dialogue, tableaux... tous ces éléments d'interface que vous utilisez à répétition dans n'importe quel produit sont déjà prêts dans la bibliothèque, testés et affinés par un grand nombre d'utilisateurs. Il vous suffit de les combiner comme des briques Lego pour construire rapidement des interfaces de niveau professionnel.

## Ce que vous allez apprendre

1. Comprendre ce qu'est une bibliothèque de composants frontend et pourquoi le développement moderne l'utilise presque systématiquement
2. Découvrir quatre bibliothèques de composants représentatives et comprendre leurs scénarios de prédilection
3. À travers trois scénarios pratiques (landing page, page produit, back-office), apprendre le Vibe Coding avec IDE AI + bibliothèque de composants
4. Apprendre à lire la documentation des bibliothèques de composants, trouver les composants appropriés et les utiliser correctement

## 1. Pourquoi a-t-on besoin de bibliothèques de composants ?

Imaginez que vous rénovez une maison. Vous pouvez fabriquer une chaise vous-même à partir de bois brut, mais l'approche la plus courante est d'en acheter une chez Ikea — design agréable, qualité stable, mode d'emploi clair, il suffit de l'assembler à la maison.

La bibliothèque de composants, c'est le « Ikea » du développement frontend. Elle ne fournit pas des meubles, mais des éléments d'interface :

| Écriture manuelle | Utilisation d'une bibliothèque de composants |
| :--- | :--- |
| Vous devez gérer vous-même les styles, interactions et animations | Prêt à l'emploi, styles et interactions déjà affinés |
| Les boutons de différentes pages peuvent avoir des apparences différentes | Style global unifié, cohérence automatique |
| L'adaptation mobile et tablette nécessite un travail supplémentaire | La plupart des bibliothèques intègrent le support responsive |
| L'accessibilité est souvent oubliée | Les bibliothèques professionnelles gèrent la navigation clavier, les lecteurs d'écran, etc. |
| Développement lent | Développement rapide, concentration sur la logique métier |

En résumé : **les bibliothèques de composants vous permettent de consacrer votre temps à « quoi faire » plutôt qu'à « comment dessiner ».**

### Voir pour croire : le même besoin, avec ou sans bibliothèque de composants

La théorie seule n'est pas convaincante. Utilisons un besoin presque identique dans Trae, en spécifiant ou non une bibliothèque de composants, pour voir la différence.

**Prompt 1 : Sans bibliothèque de composants**

```text
Aidez-moi à créer une page de tableau de bord pour un assistant d'écriture AI, comprenant :
- Barre de titre supérieure et bouton d'export
- Quatre cartes statistiques affichant le nombre d'utilisateurs, d'utilisateurs actifs, de documents et de revenus, avec les tendances hausses/baisses
- Un graphique en courbes et un graphique en secteurs
- Tableau de liste d'utilisateurs avec pagination
- Barre latérale de navigation à gauche
```

Résultat dans Trae :

<!-- TODO: Remplacer par une capture d'écran du tableau de bord généré sans bibliothèque de composants dans Trae -->
<!-- ![Tableau de bord généré par Trae (sans bibliothèque de composants)](images/compare-without-lib.png) -->

**Prompt 2 : Avec la bibliothèque de composants shadcn/ui**

```text
Aidez-moi à créer une page de tableau de bord pour un assistant d'écriture AI, en utilisant la bibliothèque de composants shadcn/ui, comprenant :
- Barre de titre supérieure et bouton d'export
- Quatre cartes statistiques affichant le nombre d'utilisateurs, d'utilisateurs actifs, de documents et de revenus, avec les tendances hausses/baisses
- Un graphique en courbes et un graphique en secteurs
- Tableau de liste d'utilisateurs avec pagination
- Barre latérale de navigation à gauche
```

Résultat dans Trae :

<!-- TODO: Remplacer par une capture d'écran du tableau de bord généré avec shadcn/ui dans Trae -->
<!-- ![Tableau de bord généré par Trae (avec shadcn/ui)](images/compare-with-lib.png) -->

Le même besoin, la seule différence étant l'ajout de `shadcn/ui + Tailwind CSS` au début du prompt. Le résultat généré par Trae est à un niveau complètement différent en termes de cohérence visuelle, de détails d'interaction et de finition globale. C'est la « mise à niveau gratuite » qu'apporte la bibliothèque de composants — il vous suffit d'ajouter un nom de bibliothèque de composants dans votre prompt.

## 2. Découvrir quatre bibliothèques de composants clés

Les bibliothèques de composants sont nombreuses (voir la liste complète en [Annexe](#annexe-apercu-de-plus-de-bibliotheques-de-composants)), mais il vous suffit d'abord de connaître ces quatre plus représentatives :

| Bibliothèque | Framework | Positionnement en une phrase | Site officiel |
| :--- | :--- | :--- | :--- |
| [Ant Design](https://ant.design) | React | Produit par Ant Group, standard de facto pour les back-offices d'entreprise, couverture de composants extrêmement large | ant.design |
| [shadcn/ui](https://ui.shadcn.com) | React | Pas d'installation npm, copie directe du code dans votre projet, basé sur Tailwind CSS, liberté de personnalisation maximale | ui.shadcn.com |
| [HeroUI](https://heroui.com) (anciennement NextUI) | React | Styles par défaut élégants, animations fluides, idéal pour les landing pages et vitrines produits exigeantes visuellement | heroui.com |
| [Material UI](https://mui.com) | React | La bibliothèque de composants React la plus ancienne, implémente les guidelines Material Design de Google, écosystème le plus mature | mui.com |

> Les utilisateurs de Vue ont également un choix riche : [Element Plus](https://element-plus.org) (la plus populaire en Chine), [Ant Design Vue](https://antdv.com), [Naive UI](https://www.naiveui.com) etc., voir [Annexe](#annexe-apercu-de-plus-de-bibliotheques-de-composants).

Différentes bibliothèques excellent dans différents scénarios. Découvrons à travers trois scénarios de développement réels comment pratiquer le Vibe Coding avec IDE AI + bibliothèque de composants.

Pour montrer les styles et caractéristiques de différentes bibliothèques, nous avons délibérément utilisé une bibliothèque différente dans chaque scénario. Mais attention : **c'est uniquement pour vous faire découvrir plusieurs approches**. En développement réel, vous pouvez tout à fait n'utiliser que celle que vous maîtrisez le mieux. Si vous aimez le style de shadcn/ui, vous pouvez l'utiliser pour des landing pages, des pages produit et des back-offices. Choisir une bibliothèque que vous trouvez belle et agréable à utiliser est plus important que tout le reste.

## 3. Pratique 1 : Construire une landing page produit avec HeroUI

**Scénario** : Vous avez créé un produit d'assistant d'écriture AI et avez besoin d'une belle landing page pour présenter les fonctionnalités du produit et attirer les inscriptions. La landing page doit avoir un fort impact visuel, des animations fluides et être belle sur mobile.

**Pourquoi choisir HeroUI** : Les styles par défaut de HeroUI sont déjà élégants, avec des animations de transition fluides intégrées, parfaitement adaptés aux pages vitrines orientées utilisateur.

### 3.1 Créer le projet

```bash
# Créer le projet avec le CLI officiel HeroUI
npx create-heroui-app@latest ai-writer-landing
cd ai-writer-landing
npm install
```

<!-- TODO: Remplacer par une capture d'écran du site HeroUI ou de la présentation des composants -->
<!-- ![Site de la bibliothèque de composants HeroUI](images/heroui-homepage.png) -->

### 3.2 Générer la landing page avec l'IDE AI

Ouvrez l'IDE AI (Cursor, Trae, etc.) et entrez dans le dialogue :

```text
Aidez-moi à créer une landing page pour un assistant d'écriture AI, en utilisant la bibliothèque de composants HeroUI :

**Structure de la page :**
1. Barre de navigation supérieure : Logo et nom du produit à gauche, trois liens « Fonctionnalités », « Tarifs », « À propos » à droite, plus un bouton « Commencer »
2. Section hero : Grand titre « L'IA devient votre partenaire d'écriture », sous-titre présentant la valeur du produit, deux boutons « Essai gratuit » et « Voir la démo », une capture d'écran du produit en dessous
3. Présentation des fonctionnalités : Trois cartes en colonnes, présentant respectivement « Continuation intelligente », « Ajustement de style », « Traduction multilingue », chaque carte avec icône, titre et description
4. Section tarifs : Trois cartes de prix (version gratuite, version pro, version équipe), la version pro mise en évidence comme recommandée
5. Appel à l'action en bas : Un slogan accrocheur avec un bouton d'inscription
6. Pied de page : Informations de copyright et liens vers les réseaux sociaux

**Exigences de design :**
- Aspect moderne et professionnel
- Support du mode sombre
- Doit être beau sur mobile
```

<!-- TODO: Remplacer par une capture d'écran du processus de génération de landing page par l'IDE AI ou du résultat -->
<!-- ![Résultat de la landing page HeroUI générée par l'IA](images/heroui-landing-result.png) -->

### 3.3 Composants clés utilisés par l'IA

Dans le code généré par l'IA, vous verrez ces composants HeroUI :

```jsx
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem,
  Button,
  Card, CardHeader, CardBody, CardFooter,
  Divider,
  Link,
  Chip
} from '@heroui/react'
```

Le rôle de chaque composant :

| Composant | Usage | Position dans la landing page |
| :--- | :--- | :--- |
| `Navbar` | Barre de navigation supérieure | Tout en haut de la page, fixe |
| `Button` | Bouton, supporte plusieurs variantes et couleurs | Boutons CTA, boutons de navigation |
| `Card` | Conteneur de carte | Présentation des fonctionnalités, cartes de tarifs |
| `Chip` | Petite étiquette | Marqueurs « Recommandé », « Le plus populaire » |
| `Divider` | Ligne de séparation | Séparation visuelle entre les sections |

### 3.4 Itération et optimisation

La première version du code généré peut ne pas être entièrement satisfaisante. Continuez à dialoguer avec l'IA pour ajuster :

```text
Aidez-moi à optimiser la landing page :

1. Ajoutez un dégradé au grand titre, du bleu au violet
2. Les cartes de fonctionnalités doivent avoir un effet de lévitation au survol de la souris
3. La carte de prix de la version pro doit être mise en évidence, avec une bordure et une étiquette « Le plus populaire »
4. Sur mobile, la navigation doit devenir un menu hamburger (les trois barres horizontales)
```

<!-- TODO: Remplacer par une capture d'écran de la landing page après itération -->
<!-- ![Landing page après itération](images/heroui-landing-iterated.png) -->

> **Le cœur du Vibe Coding** : vous n'avez pas besoin de mémoriser l'API de chaque composant. Il vous suffit de décrire l'effet souhaité en langage naturel, et l'IA trouvera les composants et la syntaxe appropriés. Si le résultat ne vous satisfait pas, continuez à itérer via le dialogue.

## 4. Pratique 2 : Construire une page produit avec shadcn/ui

**Scénario** : Votre assistant d'écriture AI a besoin d'une interface principale après connexion — une liste de documents à gauche, un éditeur à droite, et une barre d'outils en haut. C'est une page produit fonctionnelle nécessitant une UI hautement personnalisable.

**Pourquoi choisir shadcn/ui** : shadcn/ui place le code des composants directement dans votre projet, vous pouvez modifier n'importe quel détail. Pour les interfaces produit nécessitant une personnalisation approfondie, ce modèle « propriété du code » est le plus flexible.

<!-- TODO: Remplacer par une capture d'écran du site shadcn/ui ou de la présentation des composants -->
<!-- ![Site de la bibliothèque de composants shadcn/ui](images/shadcn-homepage.png) -->

### 4.1 Créer le projet

```bash
# Créer un projet Next.js
npx create-next-app@latest ai-writer-app --typescript --tailwind --app
cd ai-writer-app

# Initialiser shadcn/ui
npx shadcn@latest init

# Ajouter les composants selon les besoins (pas d'installation en bloc)
npx shadcn@latest add button card input sidebar sheet dialog
```

La particularité de shadcn/ui : à chaque `add` d'un composant, il copie le code source dans le répertoire `components/ui/` de votre projet. Vous pouvez ouvrir directement ces fichiers pour modifier les styles et le comportement.

### 4.2 Générer l'interface produit avec l'IDE AI

```text
Aidez-moi à créer l'interface principale d'un assistant d'écriture AI, en utilisant la bibliothèque de composants shadcn/ui :

**Mise en page globale :**
- À gauche, une barre latérale rétractable d'environ 280px :
  - En haut, un bouton « Nouveau document »
  - En dessous, une liste de documents, chaque document affichant le titre et la date de dernière modification
  - Clic droit sur un document pour renommer ou supprimer
- À droite, la zone d'édition principale, divisée en deux parties :
  - En haut, une barre d'outils : édition du titre du document, affichage du compteur de mots, bouton « Continuation AI », menu déroulant « Exporter »
  - En bas, la zone d'édition : un grand champ de saisie de texte occupant tout l'espace restant

**Détails d'interaction :**
- Après un clic sur « Continuation AI », le bouton affiche un état de chargement, le texte généré par l'IA apparaît en bas de l'éditeur (effet machine à écrire, lettre par lettre)
- Sur mobile, la barre latérale devient un tiroir glissant depuis la gauche
- Le document actuellement sélectionné doit être mis en évidence
```

<!-- TODO: Remplacer par une capture d'écran de l'interface produit shadcn/ui générée par l'IA -->
<!-- ![Résultat de la page produit shadcn/ui générée par l'IA](images/shadcn-product-result.png) -->

### 4.3 Composants clés utilisés par l'IA

```tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader
} from '@/components/ui/sidebar'
```

| Composant | Usage | Position dans la page produit |
| :--- | :--- | :--- |
| `Sidebar` | Barre latérale rétractable | Liste de documents à gauche |
| `Sheet` | Tiroir mobile | Remplacement de la barre latérale sur mobile |
| `DropdownMenu` | Menu déroulant | Bouton « Exporter », menu contextuel |
| `Dialog` | Boîte de dialogue | Confirmation de renommage, suppression |
| `Button` | Bouton, supporte variant et loading | Divers boutons d'action |
| `Input` | Champ de saisie | Édition du titre du document |

### 4.4 Personnaliser les styles des composants

L'avantage de shadcn/ui est que vous pouvez modifier directement le code source des composants. Par exemple, pour des boutons aux coins plus arrondis :

```text
Aidez-moi à modifier components/ui/button.tsx,
changez le coin arrondi par défaut de tous les boutons de rounded-md à rounded-xl,
et ajoutez un effet d'ombre subtil à la variante primary
```

L'IA modifiera directement les fichiers de composants dans votre projet, au lieu de remplacer les styles du package npm — c'est l'avantage de « posséder le code » avec shadcn/ui.

<!-- TODO: Remplacer par une capture d'écran montrant le code source shadcn/ui éditable dans le projet -->
<!-- ![Le code des composants shadcn/ui est directement éditable dans le projet](images/shadcn-code-ownership.png) -->

## 5. Pratique 3 : Construire un back-office avec Ant Design

**Scénario** : Après le lancement de votre assistant d'écriture AI, vous avez besoin d'un back-office pour consulter les données utilisateurs, gérer le contenu des documents et traiter les commandes payantes. Le cœur d'un système de back-office est la présentation des données et l'efficacité des opérations.

**Pourquoi choisir Ant Design** : Ant Design a l'expérience la plus profonde dans le domaine des back-offices. Les composants métier comme les tableaux, formulaires et graphiques sont prêts à l'emploi, avec un grand nombre de modèles d'interaction de niveau entreprise intégrés (opérations par lot, filtrage avancé, export de données, etc.).

<!-- TODO: Remplacer par une capture d'écran du site Ant Design ou de la présentation des Pro Components -->
<!-- ![Site de la bibliothèque de composants Ant Design](images/antd-homepage.png) -->

### 5.1 Créer le projet

```bash
# Utiliser le scaffolding Ant Design Pro (mise en page, routage et permissions intégrés)
npx create-umi@latest ai-writer-admin
# Choisir le template Ant Design Pro
cd ai-writer-admin
npm install
```

Ou partir de zéro :

```bash
npx create-react-app ai-writer-admin --template typescript
cd ai-writer-admin
npm install antd @ant-design/icons @ant-design/pro-components
```

### 5.2 Générer le back-office avec l'IDE AI

```text
Aidez-moi à créer un back-office pour un assistant d'écriture AI, en utilisant la bibliothèque de composants Ant Design :

**Mise en page globale :**
- À gauche, la barre de menus : Tableau de bord, Gestion des utilisateurs, Gestion des documents, Gestion des commandes, Paramètres système
- En haut, le fil d'Ariane

**Page de gestion des utilisateurs :**
- En haut, quatre cartes statistiques : nombre total d'utilisateurs, nouvelles inscriptions aujourd'hui, utilisateurs actifs, utilisateurs payants
- Zone de recherche et filtrage : recherche par nom d'utilisateur, sélection de la plage de date d'inscription, filtrage par statut, avec boutons « Rechercher » et « Réinitialiser »
- Tableau des utilisateurs :
  - Affiche avatar, nom d'utilisateur, email, date d'inscription, plan d'abonnement (étiquettes de couleurs différentes), statut, actions
  - 20 éléments par page avec pagination
  - Possibilité de sélection multiple pour désactivation ou export par lot
  - Colonne d'actions : voir les détails, modifier, désactiver (confirmation requise avant désactivation)
- Un clic sur « Voir les détails » ouvre un tiroir latéral avec les informations détaillées et la liste des documents récents
```

<!-- TODO: Remplacer par une capture d'écran de l'interface back-office Ant Design générée par l'IA -->
<!-- ![Interface back-office Ant Design générée par l'IA](images/antd-admin-result.png) -->

### 5.3 Composants clés utilisés par l'IA

```tsx
import { PageContainer, ProLayout } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { StatisticCard } from '@ant-design/pro-components'
import {
  Button, Tag, Badge, Space, Drawer,
  Popconfirm, message, Modal
} from 'antd'
import {
  UserOutlined, SearchOutlined, ExportOutlined
} from '@ant-design/icons'
```

| Composant | Usage | Position dans le back-office |
| :--- | :--- | :--- |
| `ProLayout` | Framework de mise en page global du back-office | Squelette de la page (menu + zone de contenu) |
| `ProTable` | Tableau avancé avec recherche, pagination et paramètres de colonnes intégrés | Liste des utilisateurs, liste des documents, liste des commandes |
| `StatisticCard` | Carte de statistiques | Tableau de bord, aperçu en haut de page |
| `Tag` / `Badge` | Étiquettes de statut | Plans d'abonnement, statut utilisateur |
| `Drawer` | Tiroir latéral | Détails utilisateur, formulaire d'édition |
| `Popconfirm` | Confirmation en bulle | Actions dangereuses comme suppression, désactivation |

### 5.4 Continuer l'itération : Ajouter le tableau de bord

```text
Aidez-moi à créer une page de tableau de bord :

1. En haut, quatre cartes statistiques : nombre total d'utilisateurs, nombre total de documents, appels API aujourd'hui, revenus mensuels, chaque carte affichant la valeur et la variation (hausse ou baisse)
2. Au milieu, deux graphiques :
   - À gauche : graphique en courbes de la croissance des utilisateurs sur 7 jours
   - À droite : graphique en secteurs de la répartition des plans d'abonnement
3. En bas : tableau du journal des opérations récentes, affichant l'heure, l'utilisateur, le type d'opération et les détails

Utilisez les composants Ant Design pour la mise en page, les graphiques peuvent utiliser Ant Design Charts
```

<!-- TODO: Remplacer par une capture d'écran de la page du tableau de bord -->
<!-- ![Résultat de la page du tableau de bord Ant Design](images/antd-dashboard-result.png) -->

> **Astuce Vibe Coding pour le back-office** : La structure des pages de back-office est relativement fixe (tableau + recherche + modale), parfaitement adaptée à la génération par lot avec l'IA. Vous pouvez d'abord faire générer une page « Gestion des utilisateurs » comme template, puis dire « En vous référant à la structure de la page de gestion des utilisateurs, aidez-moi à générer la page de gestion des documents » — l'IA réutilisera le même modèle de mise en page.

## 6. Apprendre à consulter la documentation : le « mode d'emploi » des bibliothèques de composants

En Vibe Coding, l'IA écrira la plupart du code pour vous. Mais quand le résultat généré par l'IA n'est pas correct, ou que vous voulez ajuster le comportement d'un composant, **consulter la documentation** est la solution la plus rapide.

Prenons Ant Design comme exemple. L'adresse de sa documentation est : `https://ant.design/components/overview-cn`

Le processus standard pour consulter la documentation :

1. **Clarifier le besoin** : par exemple « J'ai besoin que le tableau supporte la sélection de lignes »
2. **Rechercher dans la documentation** : chercher « Table » pour accéder à la page du composant tableau
3. **Consulter les exemples** : chaque composant a plusieurs exemples en ligne dans la documentation, trouvez l'exemple « sélectionnable »
4. **Copier le code** : copiez le code de l'exemple dans votre projet
5. **Consulter le tableau API** : trouvez la configuration complète de la propriété `rowSelection` en bas de page

> Vous pouvez aussi envoyer directement le lien de la documentation à l'IDE AI : « Veuillez vous référer à l'API rowSelection de https://ant.design/components/table-cn pour ajouter la fonctionnalité de sélection multiple au tableau des utilisateurs ». Fournir le lien de la documentation à l'IA rendra le code généré plus précis.

Tableau de référence rapide des adresses de documentation des bibliothèques :

| Bibliothèque | Adresse de la documentation |
| :--- | :--- |
| Ant Design | `https://ant.design/components/overview-cn` |
| shadcn/ui | `https://ui.shadcn.com/docs/components` |
| HeroUI | `https://heroui.com/docs/components` |
| Material UI | `https://mui.com/material-ui/all-components/` |
| Element Plus | `https://element-plus.org/zh-CN/component/overview.html` |

## 7. Résumé

Les trois scénarios pratiques couvrent les besoins de développement frontend les plus courants :

| Scénario | Bibliothèque recommandée | Caractéristique principale |
| :--- | :--- | :--- |
| Landing page / Page vitrine | HeroUI | Styles par défaut élégants, animations fluides, fort impact visuel |
| Page produit fonctionnelle | shadcn/ui | Code entièrement contrôlable, personnalisation approfondie flexible |
| Système de back-office | Ant Design | Composants métier riches, tableaux et formulaires prêts à l'emploi |

Résumé du workflow Vibe Coding :

1. Choisir la bibliothèque de composants appropriée selon le scénario
2. Décrire la structure de page et les interactions souhaitées avec l'IDE AI
3. L'IA génère le code initial, vous prévisualisez le résultat
4. Continuer à itérer et ajuster en langage naturel
5. En cas de problème de détail, consulter la documentation de la bibliothèque de composants

### Exercices

Choisissez l'un des scénarios suivants et réalisez-le de zéro avec IDE AI + bibliothèque de composants :

1. Avec HeroUI, créez une landing page vitrine pour un projet précédent (comme les Portraits de Poudlard)
2. Avec shadcn/ui, construisez l'interface principale d'une application de notes (barre latérale + éditeur)
3. Avec Ant Design, construisez un simple back-office de gestion de contenu (liste d'articles + formulaire de création)

---

## Annexe : Aperçu de plus de bibliothèques de composants

Outre les quatre bibliothèques clés présentées dans le corps du texte, l'écosystème frontend propose de nombreuses autres excellentes bibliothèques. Voici une liste classée par framework pour faciliter votre choix en fonction des besoins du projet.

### Écosystème Vue

| Bibliothèque | Stars | Description | Scénarios d'utilisation |
| :--- | :--- | :--- | :--- |
| [Element Plus](https://element-plus.org) | ~27k | Bibliothèque de composants enterprise Vue 3 créée par l'équipe Ele.me, la plus utilisée en Chine, excellente documentation en chinois | Back-offices et systèmes de gestion |
| [Vuetify](https://vuetifyjs.com) | ~41k | Bibliothèque de composants Material Design pour Vue la plus populaire, 80+ composants, documentation complète | Projets au style Google Design |
| [Ant Design Vue](https://antdv.com) | ~21k | Bibliothèque de composants Vue 3 basée sur le système de design d'Ant, spécifications de design unifiées | Back-offices enterprise |
| [Naive UI](https://www.naiveui.com) | ~18k | Écrite en TypeScript, personnalisation de thème extrêmement flexible, sans dépendance à un préprocesseur CSS | Projets avec exigences de design uniques |
| [Quasar](https://quasar.dev) | ~27k | Un seul code pour construire des applications SPA, SSR, PWA, mobiles et desktop | Projets multi-plateformes |
| [Vant](https://vant-ui.github.io/vant) | ~24k | Bibliothèque de composants mobiles légère développée par l'équipe Youzan, couvrant les besoins courants du e-commerce | Pages H5 mobiles |
| [PrimeVue](https://primevue.org) | ~14k | 90+ composants, support de plusieurs thèmes (Material, Bootstrap, etc.) | Besoin de composants riches et multi-thèmes |
| [Arco Design Vue](https://arco.design/vue) | ~3k | Produit par ByteDance, haute qualité de composants, mode sombre intégré | Produits de back-office |
| [TDesign Vue Next](https://tdesign.tencent.com/vue-next) | ~2k | Produit par Tencent, langage de design unifié, couvrant les scénarios desktop courants | Écosystème Tencent ou projets enterprise |

### Écosystème React

| Bibliothèque | Stars | Description | Scénarios d'utilisation |
| :--- | :--- | :--- | :--- |
| [Material UI (MUI)](https://mui.com) | ~95k | Implémentation historique des guidelines Material Design de Google, composants les plus complets, écosystème le plus mature | Construction rapide d'applications enterprise |
| [Ant Design](https://ant.design) | ~94k | Produit par Ant Group, intègre de nombreux composants métier de haute qualité, position dominante dans la communauté des développeurs chinois | Back-offices enterprise |
| [shadcn/ui](https://ui.shadcn.com) | ~83k | Le code est copié dans le projet plutôt qu'installé via npm, basé sur Radix UI + Tailwind CSS, entièrement contrôlable | Projets nécessitant une personnalisation approfondie |
| [Chakra UI](https://chakra-ui.com) | ~39k | Centrée sur l'expérience développeur, API simple, support d'accessibilité intégré | Prototypage rapide |
| [Mantine](https://mantine.dev) | ~28k | 100+ composants et 50+ hooks, incluant sélecteur de dates, éditeur de texte riche et autres composants avancés | Solution complète prête à l'emploi |
| [Headless UI](https://headlessui.com) | ~27k | Bibliothèque de composants sans style officielle de Tailwind Labs, supporte React et Vue | À utiliser avec Tailwind CSS |
| [HeroUI](https://heroui.com) | ~24k | Basée sur Tailwind CSS + React Aria, styles par défaut élégants, animations fluides | Projets exigeants visuellement |
| [Radix UI](https://www.radix-ui.com) | ~17k | Bibliothèque de primitives de composants sans style, axée sur l'accessibilité et le comportement, base de shadcn/ui | Construire un système de design personnalisé |

#### Écosystème d'extensions shadcn/ui

Outre les bibliothèques de composants génériques ci-dessus, l'écosystème shadcn/ui a vu apparaître de nombreuses bibliothèques d'extensions basées sur sa philosophie, offrant des choix différenciés pour des scénarios spécifiques. Ces extensions adoptent également le modèle « copier le code dans le projet », donnant aux développeurs un contrôle total du code source.

| Bibliothèque | Description | Scénarios d'utilisation |
| :--- | :--- | :--- |
| [Aceternity UI](https://ui.aceternity.com) | 200+ composants de qualité production, spécialisée dans les cartes lumineuses, dégradés de texte, globe 3D et autres composants visuels distinctifs | Landing pages de haute qualité, produits SaaS |
| [Tailark UI](https://tailark.com) | Collection de blocs de composants pour sites marketing, modules fréquents comme présentation produit, témoignages, boutons CTA | Landing pages marketing, sites produit |
| [UI Tripled](https://ui.tripled.work) | Composants d'interaction dynamique basés sur Framer Motion, modales, navigation, animations de cartes | Outils créatifs, portfolios personnels |
| [Neobrutalism UI](https://neobrutalism.dev) | Style néobrutaliste, lignes épaisses, contraste élevé, couleurs vives | Sites de marque personnalisés, projets créatifs |
| [REUI](https://reui.io) | 967+ modèles de combinaisons de composants pour scénarios métier réels | Back-offices enterprise, formulaires complexes |
| [Cult UI](https://cult-ui.com) | Finition interaction/visuelle plus poussée, tableaux de données, panneaux de filtrage et autres composants composites | Projets commerciaux de haute qualité |
| [Kibo UI](https://kibo-ui.com) | Composants métier avancés, sélecteur de couleurs, éditeur de texte riche, upload de fichiers | Back-offices, produits de type outils |
| [Kokonut UI](https://kokonutui.com) | 100+ composants + 7+ templates complets, style frais et minimaliste | Sites SaaS, blogs, e-commerce |
| [Commerce UI](https://ui.stackzero.co) | Spécialisée e-commerce, cartes produit, panier, formulaire de commande | Plateformes e-commerce |
| [shadcnblocks](https://shadcnblocks.com) | 1373 blocs UI + 13 templates complets, les ressources les plus complètes | Tous les scénarios |
| [Shoogle](https://shoogle.dev) | Plateforme d'agrégation et de recherche de l'écosystème shadcn/ui | Recherche rapide de ressources |
| [Discover All Shadcn](https://allshadcn.com) | Navigation agrégée de ressources | Recherche rapide de ressources |

> **Pourquoi choisir les extensions shadcn/ui ?** Ces extensions héritent de la philosophie de « propriété du code » de shadcn/ui tout en offrant une personnalisation approfondie pour des scénarios spécifiques. À l'ère du Vibe Coding, elles vous permettent de trouver rapidement des composants correspondant à vos besoins de design, de sortir de l'homogénéisation des bibliothèques UI mainstream et de créer des produits plus différenciés.
