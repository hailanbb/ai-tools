# Rendre les interfaces attrayantes avec les LLM et les Skills : prompts et plugins en pratique

Dans les cours précédents, vous avez appris à utiliser un IDE AI pour convertir des maquettes en code et à utiliser des bibliothèques de composants pour construire rapidement des interfaces. Mais vous avez peut-être remarqué un problème gênant : **pour le même besoin, les pages générées par l'IA manquent toujours de quelque chose** — la police est l'incontournable Inter, les couleurs sont le dégradé violet que l'on voit partout, la mise en page est une grille de cartes symétrique à faire bailler, toute la page dégage une forte odeur « d'IA ».

Ce n'est pas la faute de l'IA, c'est que vous ne lui avez pas dit quel **style** vous vouliez.

Imaginez que vous allez chez le coiffeur. Si vous dites simplement « coupez-moi les cheveux », le coiffeur vous donnera un résultat sûr mais médiocre. Mais si vous dites « Je veux des boucles japonaises décontractées, une frange en huit, longueur jusqu'aux clavicules, avec beaucoup de mouvement », vous obtiendrez un résultat qui correspond vraiment à vos attentes.

L'IA fonctionne de la même manière. **Elle a besoin que vous décriviez une direction esthétique claire** pour générer des interfaces belles et uniques.

Ce cours vous enseigne deux méthodes pour que l'IA génère de belles interfaces :

1. **Des templates de prompts soigneusement conçus** — décrire le style esthétique voulu en langage naturel
2. **Des plugins Skills frontend** — laisser l'IA charger automatiquement des spécifications de design professionnelles

## Ce que vous allez apprendre

1. Comprendre pourquoi les interfaces générées par défaut par l'IA sont « très ordinaires »
2. Maîtriser les 5 dimensions pour décrire un style de design (police, couleur, mise en page, animation, détails)
3. Apprendre à utiliser 3 plugins Skills pour embellir les interfaces
4. Pratiquer la génération d'interfaces attrayantes avec des prompts et des Skills à travers trois scénarios pratiques

## 1. Pourquoi les interfaces générées par défaut par l'IA sont-elles « très ordinaires » ?

Les données d'entraînement de l'IA contiennent une quantité massive de code frontend, et la plupart de ce code utilise des choix « sûrs » :

| Dimension | Choix par défaut de l'IA | Problème |
| :--- | :--- | :--- |
| Police | Inter, Roboto, Arial | Trop courantes, sans personnalité |
| Couleur | Dégradé violet, bleu dominant | Surutilisés dans la tech, fatigue visuelle |
| Mise en page | Grille symétrique, empilement de cartes | Prévisible, sans surprise |
| Animation | Fondu entrée/sortie, hover simple | Pas assez raffiné, manque de profondeur |
| Arrière-plan | Couleur unie, dégradé simple | Monotone, sans texture |

Ces choix sont corrects individuellement, mais **quand toutes les pages générées par l'IA les utilisent, cela devient le « goût IA »**.

> **Insight clé** : L'IA ne sait pas mal concevoir, elle **revient par défaut vers la « moyenne statistique »**. Vous devez lui indiquer clairement la direction dans laquelle s'éloigner de cette moyenne.

## 2. Méthode 1 : Décrire le style de design avec des prompts

### 2.1 Les 5 dimensions du style de design

Pour générer de belles interfaces, vous devez décrire l'effet souhaité selon 5 dimensions :

| Dimension | Points à décrire | Exemples de mots-clés |
| :--- | :--- | :--- |
| **Police** | Titre en police d'affichage grasse, corps en police lisible | Space Grotesk, Playfair Display, JetBrains Mono |
| **Couleur** | Couleur principale + couleur d'accentuation, éviter la distribution uniforme | #4F46E5 principal + #F59E0B accent |
| **Mise en page** | Asymétrie, chevauchement, casser la grille | Bento Grid, zones asymétriques, éléments flottants |
| **Animation** | Animations de chargement orchestrées, micro-interactions | staggered reveals, déclenchement au scroll |
| **Détails** | Arrière-plans, ombres, bordures, textures | Bruit, motifs géométriques, grille en dégradé |

### 2.2 Voir pour croire : prompt ordinaire vs prompt embellis

Prenons l'exemple d'une landing page pour comparer :

**Prompt ordinaire :**

```
Aidez-moi à faire une landing page pour un assistant d'écriture AI, avec une barre de navigation, un hero, une présentation des fonctionnalités, des prix et un pied de page
```

**Prompt embellis :**

```
Aidez-moi à faire une landing page pour un assistant d'écriture AI, avec les exigences suivantes :

**Style esthétique : Néobrutalisme**

**Polices :**
- Titre : Space Grotesk, graisse 700-900
- Corps : IBM Plex Sans, graisse 400

**Couleurs :**
- Couleur principale : #000000 (noir pur)
- Couleur d'accentuation : #FF6B00 (orange)
- Arrière-plan : #FFFDF0 (beige clair)
- Bordure : 3px ligne pleine noire

**Mise en page :**
- Disposition asymétrique, éléments séparés par des lignes noires épaisses
- Cartes avec ombres dures (box-shadow: 8px 8px 0px #000)
- Contraste audacieux avec l'espace blanc

**Animations :**
- Les éléments rebondissent depuis le bas au chargement de la page
- Les boutons montent de 2px au survol

**Détails :**
- Coins arrondis à 0px (angles droits)
- Boutons avec effet 3D prononcé
- Texture de bruit subtile en arrière-plan
```

Pour le même besoin, le second prompt permet à l'IA de générer une page au style marqué et mémorable.

### 2.3 Bibliothèque de ressources Skills pour l'embellissement frontend

Ne partez pas de zéro pour écrire vos prompts ! Voici une sélection de Skills AI directement liés à l'embellissement frontend :

| Nom du dépôt | Contenu | Stars | Lien |
|:---|:---|:---|:---|
| **ui-ux-pro-max-skill** | 57 styles + 95 palettes de couleurs + 56 polices | 10k+ | [GitHub](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) |
| **antigravity-awesome-skills** | Éviter les clichés esthétiques de l'IA | - | [GitHub](https://github.com/sickn33/antigravity-awesome-skills) |
| **superdesigndev/superdesign** | Outil de développement UI natif AI | 4.7k | [GitHub](https://github.com/superdesigndev/superdesign) |
| **anthropics/skills/frontend-design** | Skill officiel de design frontend d'Anthropic | - | [GitHub](https://github.com/anthropics/skills) |

> Pour plus de prompts de styles, consultez l'[Annexe : Référence rapide des prompts de styles](#style-prompts)

### 2.5 Trois templates de styles courants

Voici trois templates de styles testés et approuvés, prêts à être copiés et adaptés :

#### Template 1 : Minimalisme

```
**Style esthétique : Minimalisme**

**Polices :**
- Titre : PP Neue Montreal, graisse 500-700
- Corps : Inter, graisse 400

**Couleurs :**
- Couleur principale : #FFFFFF (blanc)
- Texte : #1A1A1A (presque noir)
- Accentuation : #3B82F6 (bleu, utilisé avec parcimonie)

**Mise en page :**
- Beaucoup d'espace blanc (padding minimum 64px)
- Disposition à une ou deux colonnes, centrée
- Éléments séparés par l'espace blanc plutôt que par des lignes

**Animations :**
- Effet de fondu lent (durée 600ms)
- Transition de couleur au survol

**Détails :**
- Coins arrondis : 8px
- Ombre : subtile (0 4px 12px rgba(0,0,0,0.08))
- Pas de décoration d'arrière-plan
```

#### Template 2 : Glassmorphisme

```
**Style esthétique : Glassmorphism**

**Polices :**
- Titre : Outfit, graisse 600-800
- Corps : Plus Jakarta Sans, graisse 400-500

**Couleurs :**
- Arrière-plan : dégradé de #667eea à #764ba2
- Arrière-plan des cartes : rgba(255, 255, 255, 0.1)
- Texte : #FFFFFF

**Mise en page :**
- Conception de cartes flottantes
- Chevauchement entre les cartes

**Animations :**
- Apparition échelonnée des cartes au chargement (staggered)
- Agrandissement des cartes x1.05 au survol

**Détails :**
- Coins arrondis : 20px
- Flou d'arrière-plan : backdrop-blur-xl
- Bordure : 1px rgba(255, 255, 255, 0.2)
- Effet subtil de halo dégradé
```

#### Template 3 : Bento Grid

```
**Style esthétique : Bento Grid**

**Polices :**
- Titre : SF Pro Display, graisse 700
- Corps : SF Pro Text, graisse 400

**Couleurs :**
- Arrière-plan : #F5F5F7 (gris clair)
- Cartes : #FFFFFF (blanc)
- Accentuation : #0071E3 (bleu Apple)

**Mise en page :**
- Disposition en grille, cartes de différentes tailles assemblées
- Espace entre les cartes : 16px
- Coins arrondis : 24px

**Animations :**
- Légère élévation des cartes au survol
- Effet d'enfoncement au clic

**Détails :**
- Grandes cartes pour le contenu important
- Petites cartes pour les informations secondaires
- Utiliser des icônes au lieu d'une partie du texte
- Ombres propres (0 4px 24px rgba(0,0,0,0.06))
```

## 3. Méthode 2 : Charger automatiquement les spécifications de design avec les plugins Skills

Écrire des prompts de style manuellement à chaque fois est fastidieux. Les **Skills** sont des packs de spécifications de design réutilisables — une fois installés, l'IA les applique automatiquement.

### 3.1 Trois Skills pour embellir les interfaces

| Skills | Caractéristiques | Commande d'installation |
| :--- | :--- | :--- |
| **UI/UX Pro Max** | 67 styles, 96 palettes de couleurs, 57 combinaisons de polices | `npm install -g uipro-cli && uipro init --ai claude` |
| **frontend-design** | Officiel Anthropic, évite les clichés esthétiques de l'IA | `npx skills add anthropics/skills/frontend-design` |
| **SuperDesign** | Plugin IDE, génère plusieurs variantes de design | Rechercher « SuperDesign » sur le marketplace VSCode |

### 3.2 Installer UI/UX Pro Max (le plus recommandé)

UI/UX Pro Max est le Skill de spécifications de design le plus complet. Il intègre :

- **67 styles UI** : Glassmorphism, Neumorphism, Brutalism, Bento Grid...
- **96 palettes de couleurs** : classées par industrie (SaaS, e-commerce, social...)
- **57 combinaisons de polices** : combinaisons validées par des designers professionnels
- **100+ règles de design** : spécifications d'espacement, coins arrondis, ombres

**Étapes d'installation :**

```bash
# 1. Installer le CLI globalement
npm install -g uipro-cli

# 2. Initialiser (choisissez votre outil AI)
uipro init --ai claude
# ou
uipro init --ai cursor
# ou
uipro init --ai trae
```

Après l'installation, il suffit d'ajouter une phrase dans votre prompt :

```
Utilisez le style Glassmorphism de UI/UX Pro Max pour créer une landing page pour un assistant d'écriture AI
```

L'IA appliquera automatiquement les spécifications de police, couleur et mise en page correspondantes.

### 3.3 Installer le frontend-design officiel d'Anthropic

Il s'agit du Skill de design frontend officiel d'Anthropic, conçu spécifiquement pour résoudre le problème des « clichés esthétiques de l'IA » :

```bash
# Exécuter dans Claude Code
npx skills add anthropics/skills/frontend-design
```

Après l'installation, l'IA évitera automatiquement :
- Les polices Inter, Roboto, Arial
- Les arrière-plans en dégradé violet
- Les mises en page en grille symétrique
- Les ombres trop pâles

Elle privilégiera :
- Les combinaisons de polices originales
- Les couleurs principales audacieuses + couleurs d'accentuation vives
- Les mises en page asymétriques et chevauchantes
- Les arrière-plans texturés (bruit, motifs géométriques)

## 4. Pratique 1 : Refondre une landing page avec des prompts embellis

Mettons en pratique ce que nous avons appris pour transformer une landing page ordinaire.

### 4.1 Version ordinaire

Commençons par voir ce que l'IA produit avec un prompt ordinaire :

```
Aidez-moi à créer une landing page pour une plateforme d'adoption d'animaux, comprenant :
- Barre de navigation (Logo, liens, bouton d'inscription)
- Section hero (titre, sous-titre, boutons CTA, images d'animaux)
- Présentation des animaux (trois cartes d'animaux)
- À propos de nous
- Pied de page
```

La page générée... fonctionne, mais est très ordinaire.

### 4.2 Version embellie

Ajoutons maintenant la description du style :

```
Aidez-moi à créer une landing page pour une plateforme d'adoption d'animaux, avec les exigences suivantes :

**Style esthétique : Chaleur et douceur + Style dessiné à la main**

**Polices :**
- Titre : Nunito (ronde), graisse 700-800
- Corps : Nunito, graisse 400-600

**Couleurs :**
- Couleur principale : #FFB347 (orange chaud)
- Couleur secondaire : #FFCCB3 (orange clair)
- Arrière-plan : #FFF8F0 (beige clair)
- Texte : #5D4037 (marron)

**Mise en page :**
- Cartes arrondies (border-radius: 24px)
- Cartes légèrement inclinées (angles différents)
- Effets d'éléments flottants et chevauchants

**Animations :**
- Les éléments glissent depuis les côtés au chargement
- Les cartes d'animaux « secouent la tête » au survol (animation rotate)
- Effet rebond des boutons au survol

**Détails :**
- Tous les coins arrondis entre 16 et 24px
- Ombres chaudes et douces (0 8px 24px rgba(255,179,71,0.3))
- Motif d'empreintes de pattes en arrière-plan
- Images avec découpe irrégulière (clip-path)
- Icônes style dessiné (outline)
```

La page générée sera une interface chaleureuse, mignonne, qui donne envie d'adopter un animal.

## 5. Pratique 2 : Générer rapidement un tableau de bord avec les Skills

Les Skills sont particulièrement adaptés aux systèmes de back-office nécessitant de nombreuses pages.

### 5.1 Utiliser UI/UX Pro Max

```
Utilisez le style Dashboard Dark de UI/UX Pro Max,
aidez-moi à créer une page de tableau de bord pour un back-office de gestion de produit SaaS, comprenant :

**En haut :** Quatre cartes statistiques (utilisateurs, utilisateurs actifs, revenus, appels API)

**Au milieu :**
- À gauche : graphique linéaire de la croissance des utilisateurs (7 derniers jours)
- À droite : graphique en secteurs de la répartition des plans d'abonnement

**En bas :** Liste des activités récentes (heure, utilisateur, action)
```

L'IA appliquera automatiquement les spécifications de design du tableau de bord sombre :
- Fond gris foncé (#1A1A2E)
- Cartes à contraste élevé (#16213E)
- Couleurs de données vives (bleu, vert, orange)
- Effet glassmorphisme sur les cartes flottantes

### 5.2 Utiliser le Skill frontend-design

```
Utilisez le skill frontend-design,
aidez-moi à créer la page d'accueil d'un blog personnel, le style doit être unique et avoir du caractère
```

L'IA choisira une direction esthétique non conventionnelle (comme le rétrofuturisme ou le style magazine), puis l'implémentera avec des polices, couleurs et mises en page originales.

## 6. Pratique 3 : Créer votre propre Skill de système de design

Si vous avez un style de marque fixe, vous pouvez créer votre propre Skill pour que toutes les pages générées par l'IA soient conformes à votre marque.

### 6.1 Créer le fichier du Skill

Créez `.claude/skills/my-brand/SKILL.md` dans votre projet :

````markdown
---
name: my-brand
description: Mon système de design dédié au projet, garantissant que toutes les UI respectent un langage de design unifié
---

# Mon système de design de projet

## Couleurs de marque
- Couleur principale : #6366F1 (Indigo 500)
- Couleur secondaire : #8B5CF6 (Violet 500)
- Succès : #10B981
- Avertissement : #F59E0B
- Erreur : #EF4444
- Arrière-plan : #F9FAFB
- Cartes : #FFFFFF

## Système de polices
- Titre : Plus Jakarta Sans
  - H1 : 700, 48px
  - H2 : 600, 36px
  - H3 : 600, 24px
- Corps : Inter
  - Body : 400, 16px
  - Small : 400, 14px

## Système d'espacement
- Unité de base : 4px
- Padding des composants : 8px / 12px / 16px
- Espacement entre les sections : 24px / 32px / 48px
- Marges de page : 64px

## Coins arrondis
- Boutons : 8px
- Cartes : 12px
- Champs de saisie : 8px
- Modales : 16px

## Ombres
- Petite : 0 1px 3px rgba(0,0,0,0.1)
- Moyenne : 0 4px 12px rgba(0,0,0,0.1)
- Grande : 0 8px 24px rgba(0,0,0,0.12)

## Animations
- Durée de transition : 150ms / 300ms
- Fonction d'accélération : cubic-bezier(0.4, 0, 0.2, 1)
- Effet au survol : léger agrandissement (scale-105)

## Styles interdits
- Ne pas utiliser de dégradé violet en arrière-plan
- Ne pas utiliser de police autre que Inter
- Ne pas utiliser de coins arrondis supérieurs à 16px
- Ne pas utiliser de noir pur (#000000), utiliser #1F2937
````

### 6.2 Utiliser votre propre Skill

Une fois créé, il suffit de dire dans votre prompt :

```
Utilisez le skill my-brand pour créer une page de paramètres utilisateur
```

L'IA appliquera automatiquement toutes les spécifications de design que vous avez définies.

## 7. Résumé

Il existe deux méthodes pour que l'IA génère de belles interfaces :

| Méthode | Avantages | Inconvénients | Scénarios d'utilisation |
| :--- | :--- | :--- | :--- |
| **Description par prompt** | Flexible, ajustable à chaque fois | Nécessite d'écrire à répétition | Pages ponctuelles, expérimentation de styles |
| **Plugin Skills** | Installation unique, effet persistant | Nécessite installation et configuration | Projets avec exigences de style fixes |

**Recommandation de workflow Vibe Coding :**

1. **Phase d'exploration** : Expérimentez avec différents prompts de styles pour trouver votre direction esthétique préférée
2. **Après avoir fixé le style** : Installez le Skill correspondant (UI/UX Pro Max ou frontend-design)
3. **Projets de marque** : Créez votre propre Skill pour unifier le langage de design de tout le projet

### Exercices

Choisissez l'un des scénarios suivants et réalisez-le de zéro avec les méthodes de ce cours :

1. Refondez l'interface d'un projet précédent avec des prompts de style (choisissez un style que vous aimez)
2. Installez UI/UX Pro Max et utilisez l'un de ses styles pour générer une nouvelle page
3. Créez votre propre Skill de système de design en définissant vos couleurs et polices de marque

---

## Annexe : Table de référence rapide des styles de design

| Style | Mots-clés | Scénarios d'utilisation | Exemples de produits |
| :--- | :--- | :--- | :--- |
| **Minimalisme** | Espace blanc, monochrome, simplicité | Produits haut de gamme, portfolios personnels | Site Apple |
| **Glassmorphisme** | Verre dépoli, dégradé, flou | Produits tech, landing pages SaaS | macOS Big Sur |
| **Néobrutalisme** | Bordures épaisses, ombres dures, couleurs unies | Marques tendance, sites artistiques | Brassius |
| **Bento Grid** | Grille, collage, cartes | Présentation d'informations, tableaux de bord | Pages promotionnelles Apple |
| **Rétrofutur** | Néon, dégradé, synthwave | Jeux, musique | STRANGER THINGS |
| **Style dessiné** | Irrégulier, arrondi, illustrations | Éducation, produits pour enfants | Duolingo |
| **Style magazine** | Grande typographie, asymétrie, espace blanc | Sites de contenu, blogs | Medium |
| **Luxe sombre** | Couleurs foncées, or, raffinement | Produits haut de gamme, luxe | Diverses marques de luxe |

## Annexe : Référence rapide d'installation des Skills

```bash
# UI/UX Pro Max
npm install -g uipro-cli
uipro init --ai claude

# frontend-design d'Anthropic
npx skills add anthropics/skills/frontend-design

# brand-guidelines d'Anthropic
npx skills add anthropics/skills/brand-guidelines

# Voir les Skills installés dans Claude Code
/help
```

## Annexe : Palettes de couleurs recommandées

| Palette | Couleur principale | Couleur d'accent | Arrière-plan | Style |
| :--- | :--- | :--- | :--- | :--- |
| **Coucher de soleil** | #F97316 | #FBBF24 | #FFF7ED | Chaleur, vitalité |
| **Océan** | #0EA5E9 | #06B6D4 | #F0F9FF | Fraîcheur, professionnalisme |
| **Forêt** | #10B981 | #34D399 | #ECFDF5 | Nature, santé |
| **Baies** | #8B5CF6 | #EC4899 | #FAF5FF | Romantisme, créativité |
| **Café** | #78350F | #D97706 | #FFFBEB | Chaleur, rétro |
| **Pierre** | #6B7280 | #9CA3AF | #F9FAFB | Professionnalisme, neutralité |

## Annexe : Référence rapide des prompts de styles de design {#style-prompts}

Prompts à essayer pour rendre les pages frontend plus attrayantes :

### Catégories de styles

| Style | Mots-clés (anglais) | Caractéristiques visuelles clés | Exemple de prompt |
|:---|:---|:---|:---|
| **Pop Art** | Pop Art | Couleurs vives contrastées, contours noirs, texture de points | Pop art style website, bold colors and comic dots, vibrant |
| **Minimalisme** | Minimalism | Grand espace blanc, peu de couleurs et de lignes, sans décoration | Minimalist web design, ample white space, geometric, serene |
| **Expressionnisme abstrait** | Abstract Expressionism | Coups de pinceau chargés d'émotion, éclaboussures de couleur | Abstract expressionism background, dynamic paint splashes, emotional |
| **Style rétro** | Retro/Vintage | Polices anciennes, textures vieillies, palette rétro | Retro 80s website design, neon grid and synthwave color palette |
| **Cyberpunk** | Cyberpunk | Couleurs néon à contraste élevé, effets glitch, fond sombre | Cyberpunk UI, neon lights on dark background, glitch effects |
| **Neumorphisme** | Neumorphism | Ombres et reflets doux, léger effet de relief/enfoncement | Neumorphism design style, soft shadows, clean and modern |
| **Art génératif** | Generative Art | Motifs visuels fluides générés par algorithme | Generative art background, flowing algorithmic patterns, digital |
| **Design acide** | Acid Graphics | Texture métallique, effet vitrail, polices dentelées | Acid graphics web layout, glass morphism, chaotic typography |
| **3D immersif** | Immersive 3D | Scènes 3D interactives, fort effet spatial | Immersive 3D website, interactive product model in space |
