# Comment choisir la bonne plateforme pour votre application

Vous avez une idée et voulez la transformer en un vrai produit. Mais avec autant d'options de plateforme - Mini Programs WeChat, applications iOS, applications Android, sites web, extensions de navigateur, applications de bureau - par où commencer ?

::: tip 💡 Navigation rapide
Si vous connaissez déjà les caractéristiques de chaque plateforme, vous pouvez passer directement à la [Section 2](#2-ask-yourself-three-questions-first) pour le processus de décision, ou consulter [l'organigramme de décision de la Section 7](#7-summary-platform-selection-decision-flow).
:::

Cet article vous aidera à clarifier votre réflexion et à trouver la plateforme de développement la plus adaptée à votre scénario spécifique.

## 1 Connaissez d'abord ces plateformes

Avant de discuter « laquelle choisir », comprenons d'abord « lesquelles existent ». Voici les catégories de plateformes principales actuelles :

### 1.1 Plateformes mobiles

#### Application native iOS

Les applications que vous téléchargez depuis l'App Store sur votre iPhone sont des applications natives iOS. Leurs caractéristiques : démarrage rapide, expérience fluide et accès complet aux capacités du téléphone (appareil photo, localisation, données de santé, etc.). Mais le développement nécessite un Mac, et la publication sur l'App Store requiert l'approbation d'Apple.

**Exemples courants** : WeChat, Douyin (TikTok Chine), Xiaohongshu, Keep, Meituan, Alipay

#### Application native Android

Les applications téléchargées depuis les stores Android, ou installées depuis des fichiers APK envoyés par des amis, sont des applications natives Android. Elles sont similaires aux applications iOS, mais Android a plus d'utilisateurs et plus de canaux de distribution. L'inconvénient est la fragmentation des appareils : les développeurs doivent s'adapter à de nombreuses tailles d'écran et versions de système.

**Exemples courants** : Tasker (automatisation), MX Player (lecteur vidéo), AirDroid (gestionnaire de téléphone), Greenify (optimisation batterie), Xposed Framework (personnalisation système)

#### Mini Program WeChat

Les « petites applications » que vous pouvez utiliser directement dans WeChat en scannant un code ou en recherchant par nom, sans installation. L'avantage est une faible friction utilisateur : tout le monde a déjà WeChat, les utilisateurs peuvent commencer instantanément. L'inconvénient est des capacités limitées, et cela ne fonctionne que dans WeChat.

**Exemples courants** : Pinduoduo (achat groupé e-commerce), Meituan Waimai (services locaux), Mobike (partage de vélos), Jump Jump (mini jeu), Zhouheiya (commande/achat)

#### PWA (Progressive Web App)

Cela sonne technique, mais c'est fondamentalement « une page web qui peut être installée comme une application ». Quand les utilisateurs ouvrent un site dans un navigateur mobile, ils peuvent voir « Ajouter à l'écran d'accueil ». Après un appui, une icône apparaît sur l'écran d'accueil et se comporte comme une application. L'avantage est une seule base de code pour mobile et ordinateur. L'inconvénient est que beaucoup d'utilisateurs ne connaissent pas ce mode d'utilisation.

**Exemples courants** : Twitter Lite, Starbucks, Pinterest, Uber, Spotify Web Player

### 1.2 Plateformes de bureau

#### Application de bureau Electron

Vous les utilisez peut-être tous les jours : VS Code, Slack, Discord, Notion, Figma - tous construits avec Electron. La caractéristique clé : construire des logiciels de bureau en utilisant des technologies web (HTML, CSS, JavaScript), et exécuter une seule base de code sur Windows, Mac et Linux. L'inconvénient est des installateurs plus volumineux et une utilisation mémoire d'exécution plus élevée.

**Exemples courants** : VS Code, Slack, Discord, Notion, Figma, WeChat Developer Tools

#### Application de bureau Qt

Si vous avez utilisé WPS, VirtualBox ou OBS, ils ont peut-être été construits avec Qt. Qt utilise C++, avec de bonnes performances et stabilité, particulièrement adapté aux scénarios industriels. Mais la courbe d'apprentissage est plus raide, et des connaissances C++ sont requises.

**Exemples courants** : WPS Office, VirtualBox, Autodesk Maya, Telegram Desktop, OBS Studio

#### Application de bureau native

Ces applications « lourdes » sont généralement construites avec des technologies natives. Windows utilise souvent C# ou C++ ; macOS utilise Swift. Elles offrent les meilleures performances et l'expérience la plus fluide, mais les versions Windows et macOS doivent être développées séparément, ce qui est coûteux.

**Exemples courants** : Microsoft Office, Adobe Photoshop, Final Cut Pro, WeChat (Windows/Mac), QQ Music

### 1.3 Plateformes liées au web

#### Site web

Ce sont les pages ouvertes en entrant des URL dans un navigateur. Avantages : accessibles sur tout appareil (téléphone, ordinateur, tablette), aucune installation requise, et référençables par les moteurs de recherche. Inconvénient : une connexion internet est requise, l'utilisation hors ligne est impossible.

**Exemples courants** : Taobao, Zhihu, GitHub, Bilibili, Juejin, CSDN

#### Extension de navigateur

Avez-vous utilisé des bloqueurs de publicités, des outils de traduction ou des gestionnaires de mots de passe ? Ce sont des extensions de navigateur. Elles fonctionnent dans les navigateurs et peuvent lire/modifier le contenu des pages web. Par exemple, installez une extension de traduction et traduisez des pages en anglais en un clic. Avantage : léger et démarre avec le navigateur. Inconvénient : ne fonctionne que dans les navigateurs, et les extensions ne sont pas toujours compatibles entre Chrome, Edge et Firefox.

**Exemples courants** : AdBlock Plus, Immersive Translate, 1Password, Grammarly, Tampermonkey, Dark Reader

### 1.4 Autres plateformes

#### Extension VS Code

Si vous êtes développeur, vous utilisez probablement VS Code. Les extensions VS Code sont de petits programmes qui « ajoutent des fonctionnalités » à l'éditeur. Avantage : audience de développeurs très ciblée. Inconvénient : uniquement utile pour les utilisateurs développeurs.

**Exemples courants** : Prettier, GitLens, GitHub Copilot, ESLint, Live Server, Chinese Language Pack

#### Contrat intelligent NFT

Vous avez peut-être entendu parler des NFT - ces « avatars numériques » vendus à des millions. Les NFT sont essentiellement des certificats de propriété basés sur la blockchain prouvant qu'un objet numérique vous appartient. Les contrats intelligents sont des programmes s'exécutant sur la blockchain pour créer et gérer les NFT. Avantage : inviolables et échangeables. Inconvénient : barrière technique élevée et marché volatil.

**Exemples courants** : BAYC, CryptoPunks, NBA Top Shot, Azuki, Moonbirds

### 1.5 Y a-t-il plus d'options ?

Au-delà des plateformes ci-dessus, il existe aussi des « voies intermédiaires » et plus de possibilités :

#### Frameworks multiplateformes

::: details Cliquez pour voir les détails des frameworks multiplateformes

**React Native / Flutter** : vous voulez à la fois iOS et Android sans écrire deux bases de code ? Ces frameworks vous permettent d'écrire une fois et de générer des applications pour les deux plateformes. Beaucoup d'entreprises les utilisent, comme Airbnb et Instagram.

**Tauri** : une « alternative légère » à Electron. Il utilise aussi la technologie web pour construire des applications de bureau mais avec des installateurs plus petits et une exécution plus rapide. Inconvénient : l'écosystème est moins mature.

**uni-app** : très populaire en Chine. Une seule base de code peut cibler le Mini Program WeChat, l'application iOS, l'application Android et le site H5. Adapté aux équipes qui veulent « construire une fois, exécuter partout ».

**Capacitor / Ionic** : vous avez déjà un site web et voulez le transformer rapidement en application ? Ces outils peuvent « envelopper » votre site web en une application installable pour les stores d'applications.

Ces frameworks sont essentiellement des compromis entre le développement natif et web : meilleure efficacité de développement, mais quelques compromis sur les performances et l'expérience.
:::

#### Écosystème des Mini Programs en Chine

::: details Cliquez pour voir les options de mini programs en Chine

**Mini Program Alipay** : scénarios financiers et de services locaux. Si vos utilisateurs paient des factures, commandent de la nourriture ou utilisent les transports dans Alipay, le Mini Program Alipay est adapté. Des capacités comme le crédit Zhima et l'identité de confiance sont uniques à Alipay.

**Mini Program Douyin** : commerce de contenu et vente en direct. Si vous vendez sur Douyin, des mini programs peuvent être attachés sous les vidéos pour une conversion instantanée.

**Mini Program Kuaishou** : marchés de niveau inférieur et forte économie communautaire. Les utilisateurs de Kuaishou sont très engagés, adaptés à l'achat groupé communautaire et aux services locaux.

**Mini Program Baidu** : entrée de trafic de recherche. Si les utilisateurs recherchent « restaurants à proximité » sur Baidu, votre mini program peut apparaître directement dans les résultats.
:::

#### Écosystème HarmonyOS

**Applications HarmonyOS** : peuvent fonctionner sur les téléphones Huawei, tablettes, montres et appareils domotiques. Développées avec ArkTS (similaire à TypeScript), une seule base de code peut supporter plusieurs appareils. Si votre audience est dans l'écosystème Huawei ou votre produit implique de la connectivité IoT, HarmonyOS est une option clé.

#### Plus d'outils de développement

::: details Cliquez pour voir plus d'options d'outils de développement

**Outils en ligne de commande (CLI)** : les développeurs utilisent le terminal quotidiennement. Les outils CLI peuvent automatiser le travail répétitif, générer des modèles de code et déployer des projets. Des exemples incluent `create-react-app`, `git` et `npm`. Adaptés à la productivité des développeurs et à l'automatisation DevOps.

**Plugins JetBrains** : en plus de VS Code, beaucoup de développeurs utilisent IntelliJ IDEA, PyCharm et WebStorm. Si votre outil cible les développeurs Java, Python ou frontend, JetBrains Marketplace vaut aussi la peine d'être considéré.

**Plugins Cursor / Windsurf** : écosystèmes émergents pour les outils de codage IA. Si vous construisez des fonctionnalités de codage assisté par IA, ces écosystèmes de plugins IDE croissent rapidement.
:::

#### Bots communautaires

::: details Cliquez pour voir les options de bots communautaires

**Telegram Bot** : grande base d'utilisateurs internationaux et API conviviales pour les développeurs. Adapté aux notifications, tâches d'automatisation et gestion de communauté. Beaucoup de projets crypto et communautés de développeurs utilisent Telegram.

**Discord Bot** : plateforme centrale pour les communautés de jeu et de développeurs. Utile pour la lecture de musique, les requêtes de données de jeu et la gestion de serveur. Si vos utilisateurs sont des joueurs ou des développeurs internationaux, les bots Discord sont souvent essentiels.
:::

#### Outils de conception et de productivité

::: details Cliquez pour voir les options d'outils de conception

**Plugins Figma** : les designers utilisent Figma tous les jours. Les plugins peuvent automatiser les flux de conception, générer du code et gérer les systèmes de design. Adaptés aux outils de conception et à l'assistance frontend.

**Intégrations Notion** : avec l'API Notion vous pouvez automatiser les flux de travail, synchroniser les données et générer des rapports. Adaptés à la gestion des connaissances et aux outils de gestion de projet.
:::

#### Informatique spatiale

**Applications visionOS (Apple Vision Pro)** : la nouvelle ère de l'informatique spatiale. Adaptées à l'affichage de contenu 3D, les expériences immersives, l'éducation/formation et la collaboration virtuelle. La barrière technique est élevée, mais pour l'exploration de pointe c'est une direction future.

---

## 2 Posez-vous d'abord trois questions

Avant de choisir une plateforme, répondez à ces trois questions fondamentales :

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px; border-left: 4px solid #409EFF;">
  <template #header>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 20px;">🎯</span>
      <span style="font-weight: bold; font-size: 16px;">Question 1 : Où sont vos utilisateurs ?</span>
    </div>
  </template>
  <div style="line-height: 1.8; color: #606266;">
    <ul>
      <li>Les utilisateurs ont-ils besoin de l'utiliser n'importe quand, n'importe où ? (mobile d'abord)</li>
      <li>Les utilisateurs sont-ils habitués à accomplir des tâches dans WeChat ? (mini program)</li>
      <li>Les utilisateurs passeront-ils de longues sessions dans des scénarios de bureau ? (application de bureau)</li>
      <li>Les utilisateurs ont-ils besoin de vous trouver via les moteurs de recherche ? (site web)</li>
    </ul>
  </div>
</el-card>

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px; border-left: 4px solid #67C23A;">
  <template #header>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 20px;">⚡</span>
      <span style="font-weight: bold; font-size: 16px;">Question 2 : De quelles capacités votre application a-t-elle besoin ?</span>
    </div>
  </template>
  <div style="line-height: 1.8; color: #606266;">
    <ul>
      <li>A-t-elle besoin d'accéder à l'appareil photo, au microphone, au GPS ou autre matériel ?</li>
      <li>A-t-elle besoin d'un support hors ligne ?</li>
      <li>A-t-elle besoin de notifications push ?</li>
      <li>A-t-elle besoin de traiter de grandes quantités de données locales ?</li>
    </ul>
  </div>
</el-card>

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px; border-left: 4px solid #E6A23C;">
  <template #header>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 20px;">💰</span>
      <span style="font-weight: bold; font-size: 16px;">Question 3 : De combien de ressources disposez-vous ?</span>
    </div>
  </template>
  <div style="line-height: 1.8; color: #606266;">
    <ul>
      <li>Quel est votre budget temps de développement ?</li>
      <li>Avez-vous un appareil Mac (requis pour le développement iOS) ?</li>
      <li>Devez-vous couvrir plusieurs plateformes à la fois ?</li>
    </ul>
  </div>
</el-card>

---

## 3 Tableau de décision de sélection de plateforme

Utilisez ce tableau pour identifier rapidement ce qui vous correspond :

| Votre scénario | Plateforme recommandée | Pourquoi |
|---------|---------|------|
| Les utilisateurs sont dans l'écosystème WeChat et vous voulez une croissance rapide | <el-tag type="success">Mini Program WeChat</el-tag> | Pas de téléchargement, partage WeChat facile, faible coût d'acquisition |
| Besoin de suivi GPS continu en arrière-plan et accès aux données de santé | <el-tag type="primary">iOS / Android Natif</el-tag> | Accès direct aux API système, meilleures performances |
| Une seule base de code pour plusieurs plateformes | <el-tag type="warning">PWA / Electron</el-tag> | Haute efficacité, faible coût de maintenance |
| Les utilisateurs ont besoin de longues sessions sur ordinateur | <el-tag type="primary">Application de bureau</el-tag> (Electron / Qt) | Fenêtre séparée, support hors ligne, forte intégration système |
| Besoin de synthèse automatique/traduction/gestion de mots de passe pendant la navigation | <el-tag type="info">Extension de navigateur</el-tag> | Peut lire/modifier le contenu des pages web, se lance avec le navigateur |
| Articles techniques/vitrine de projets indexables par Google | <el-tag type="warning">Site web / Blog personnel</el-tag> | SEO-friendly, contenu recherchable |
| Émettre des cartes de membership numériques échangeables ou des collectionnables | <el-tag type="danger">Contrat intelligent NFT</el-tag> | Propriété on-chain, transférable/échangeable |

---

## 4 Exemples de scénarios pratiques

### Scénario 1 : Je veux construire un outil d'achat groupé communautaire

**💡 Recommandé : Mini Program WeChat**

Pourquoi un mini program ?

- **Les utilisateurs sont déjà dans WeChat** : les utilisateurs communautaires sont actifs dans les groupes WeChat ; les mini programs peuvent être partagés directement dans les groupes
- **Comportement d'utilisation immédiate** : personne ne veut installer une application dédiée juste pour commander des légumes
- **Paiement fluide** : WeChat Pay en un appui, pas de changement de contexte
- **Faible coût d'acquisition** : un flux de partage de groupe peut apporter des dizaines d'utilisateurs

::: tip 💡 Scénarios applicables
Si votre produit est similaire - achats groupés, réservations, sondages, inscriptions à des événements - les mini programs sont généralement le premier choix.
:::

---

### Scénario 2 : Je veux construire une application de suivi de course

**⚡ Recommandé : iOS / Android Natif**

Pourquoi une application native ?

- **Exécution en arrière-plan** : l'application doit continuer à suivre l'itinéraire pendant la course, ce que les mini programs et les sites web ne peuvent pas faire de manière fiable
- **Précision GPS** : les applications natives peuvent accéder à la localisation haute précision avec une faible marge d'erreur
- **Accès aux données de santé** : le comptage de pas et l'accès au rythme cardiaque nécessitent Apple HealthKit / Google Fit
- **Rappels push fiables** : les rappels quotidiens « il est l'heure de courir » se font mieux via les push natifs

::: warning ⚠️ Remarque importante
Toute application nécessitant une **exécution en arrière-plan prolongée** ou un **accès matériel approfondi** devrait choisir le développement natif.
:::

---

### Scénario 3 : Je veux construire une application de comptabilité

**📝 Recommandé : PWA ou Mini Program**

Pourquoi ?

- **Haute fréquence mais sessions courtes** : un enregistrement par jour, terminé en 30 secondes
- **Pas de besoins matériels complexes** : principalement de la saisie et de l'affichage de données
- **Forte exigence multiplateforme** : les utilisateurs peuvent enregistrer sur téléphone et consulter les rapports sur ordinateur
- **Scénario hors ligne** : les utilisateurs peuvent vouloir noter des dépenses dans le métro sans signal

La PWA peut être installée sur l'écran d'accueil et ressemble à une application, tandis que le coût de développement est environ le tiers du natif. Les mini programs sont souvent meilleurs pour les utilisateurs en Chine.

---

### Scénario 4 : Je veux construire une plateforme d'éducation en ligne

**📚 Recommandé : Combinaison Site web + Mini Program**

Pourquoi ?

- **Le site web gère l'acquisition** : pages de cours, profils de formateurs, optimisation SEO
- **Le mini program gère la conversion** : cours d'essai, paiement d'inscription, rejoindre un groupe via QR
- **Le site web gère la livraison** : la lecture vidéo est meilleure sur de grands écrans web
- **Le mini program gère les points de contact** : rappels de cours et notifications de devoirs

::: tip 💡 Stratégie de combinaison
Les entreprises complexes ont souvent besoin d'une **combinaison multiplateforme**, pas d'une seule plateforme.
:::

---

### Scénario 5 : Je veux construire un outil de collaboration d'équipe

**🤝 Recommandé : Application de bureau Electron + version web**

Pourquoi ?

- **Côté bureau** : les utilisateurs gardent les ordinateurs allumés au travail ; les applications de bureau peuvent rester résidentes et recevoir des messages
- **Côté web** : utilisation temporaire sur d'autres ordinateurs sans installation
- **Intégration système** : l'application de bureau peut accéder aux fichiers locaux, notifications système et raccourcis
- **Une seule base de code** : Electron utilise la pile web, et bureau/web peuvent réutiliser environ 80 % du code

Slack, Notion et Discord suivent tous ce modèle.

---

### Scénario 6 : Je veux construire un gestionnaire de mots de passe

**🔐 Recommandé : Application de bureau + extension de navigateur**

Pourquoi ?

- **Application de bureau** : stockage sécurisé de la base de données de mots de passe locale, supporte le déverrouillage biométrique
- **Extension de navigateur** : remplissage automatique sur les pages de connexion sans changer de fenêtre
- **Disponibilité hors ligne** : données de mots de passe stockées localement, indépendantes du réseau
- **Contrôle de sécurité** : les utilisateurs savent où sont leurs données, réduisant les préoccupations de fuite cloud

1Password et Bitwarden utilisent tous deux cette combinaison.

---

### Scénario 7 : Je veux construire une plateforme de création de contenu

**✍️ Recommandé : Site web + blog personnel**

Pourquoi ?

- **Le SEO est la ligne de vie** : la recherche est votre plus grande source de trafic à long terme
- **Le contenu est le produit** : articles, tutoriels et vidéos sont la valeur principale
- **Actif à long terme** : les sites web peuvent fonctionner pendant des années, tandis que les comptes sociaux peuvent être suspendus à tout moment
- **Monétisation flexible** : publicités, abonnements payants et commerce de connaissances peuvent tous fonctionner sur des sites web

Medium, les colonnes Zhihu et les blogs tech personnels sont tous essentiellement des plateformes de contenu.

---

### Scénario 8 : Je veux construire un outil de productivité pour développeurs

**🛠️ Recommandé : Extension VS Code ou outil CLI**

Pourquoi ?

- **Les utilisateurs sont déjà dans l'éditeur** : les développeurs détestent changer de contexte
- **Sens du contexte** : les outils peuvent lire le code actuel et fournir des suggestions précises
- **Distribution facile** : publiez sur le marketplace d'extensions et les utilisateurs installent en un clic
- **Itération rapide** : pas de délais de revue de store, publication/mise à jour le jour même

Prettier, ESLint et GitHub Copilot sont tous des extensions VS Code.

---

### Scénario 9 : Je veux construire un tableau de bord de surveillance industrielle

**🏭 Recommandé : Application de bureau Qt**

Pourquoi ?

- **Stabilité avant tout** : les usines tournent 24h/24 et le logiciel ne peut pas planter
- **Communication matérielle** : nécessite une communication série/Modbus avec les capteurs
- **Graphiques en temps réel** : pression/température/débit nécessitent souvent un rafraîchissement à la milliseconde
- **Environnement industriel** : les ordinateurs industriels font couramment tourner Windows, et la compatibilité Qt est forte

::: warning ⚠️ Scénarios industriels
Les scénarios industriels nécessitent une stabilité et des interfaces matérielles que les technologies web ne peuvent généralement pas satisfaire.
:::

---

### Scénario 10 : Je veux émettre une carte de membership numérique

**🎫 Recommandé : Contrat intelligent NFT**

Pourquoi ?

- **Infalsifiable** : les enregistrements on-chain ne peuvent pas être falsifiés
- **Transférable** : les adhésions peuvent être offertes ou échangées sur les marchés secondaires
- **Programmable** : les contrats intelligents peuvent automatiser les avantages (par exemple mise à niveau automatique après un an)
- **Portée mondiale** : pas de frontières nationales, participation mondiale possible

Starbucks Odyssey et NBA Top Shot utilisent tous deux des NFT dans leurs systèmes de membership.

---

## 5 Comparaison rapide des capacités des plateformes

### 5.1 Comparaison des solutions mobiles

| Capacité | Mini Program WeChat | iOS Natif | Android Natif | PWA |
|-----|----------|---------|-------------|-----|
| Coût d'acquisition utilisateur | <el-tag type="success">Faible</el-tag> (partage WeChat) | <el-tag type="danger">Élevé</el-tag> (app store) | <el-tag type="danger">Élevé</el-tag> (app store) | <el-tag type="warning">Moyen</el-tag> (moteurs de recherche) |
| Utilisation hors ligne | <el-tag type="warning">Limitée</el-tag> | <el-tag type="success">Complète</el-tag> | <el-tag type="success">Complète</el-tag> | <el-tag type="success">Supportée</el-tag> |
| Notifications push | <el-tag type="success">Supportées</el-tag> | <el-tag type="success">Supportées</el-tag> | <el-tag type="success">Supportées</el-tag> | <el-tag type="warning">Partielles</el-tag> |
| Accès matériel | <el-tag type="warning">Restreint</el-tag> | <el-tag type="success">Accès complet</el-tag> | <el-tag type="success">Accès complet</el-tag> | <el-tag type="warning">Restreint</el-tag> |
| Exécution en arrière-plan | <el-tag type="warning">Restreinte</el-tag> | <el-tag type="success">Supportée</el-tag> | <el-tag type="success">Supportée</el-tag> | <el-tag type="warning">Restreinte</el-tag> |
| Coût de développement | <el-tag type="success">Faible</el-tag> | <el-tag type="danger">Élevé</el-tag> | <el-tag type="danger">Élevé</el-tag> | <el-tag type="success">Faible</el-tag> |
| Revue requise | <el-tag type="warning">Oui</el-tag> | <el-tag type="warning">Oui</el-tag> | <el-tag type="warning">Oui</el-tag> | <el-tag type="success">Non</el-tag> |

### 5.2 Comparaison des solutions de bureau

| Capacité | Electron | Qt | Extension de navigateur |
|-----|----------|-----|-----------|
| Multiplateforme | Win/Mac/Linux | Win/Mac/Linux | Chrome/Edge/Firefox |
| Intégration système | <el-tag type="warning">Moyenne</el-tag> | <el-tag type="success">Élevée</el-tag> | <el-tag type="warning">Faible</el-tag> |
| Utilisation hors ligne | <el-tag type="success">Supportée</el-tag> | <el-tag type="success">Supportée</el-tag> | <el-tag type="warning">Partielle</el-tag> |
| Accès matériel | <el-tag type="warning">Via Node.js</el-tag> | <el-tag type="success">Accès complet</el-tag> | <el-tag type="warning">Restreint</el-tag> |
| Installation | Package installateur | Package installateur | Store d'extensions de navigateur |
| Pile technologique | Technologies web | C++/QML | JavaScript |

---

## 6 Idées reçues courantes

<el-collapse accordion style="margin: 20px 0;">
  <el-collapse-item name="1">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ Idée reçue 1 : « Je veux construire une app, donc je dois faire iOS et Android »</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      Pas nécessairement. Si votre application est légère et à usage immédiat, un mini program ou une PWA peut être un meilleur choix. Le développement natif n'en vaut la peine que lorsque vous avez besoin d'un accès système profond ou de performances optimales.
    </div>
  </el-collapse-item>
  
  <el-collapse-item name="2">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ Idée reçue 2 : « Les sites web sont dépassés et plus personne ne les lit »</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      C'est le contraire. Les sites web sont la seule plateforme indexable par les moteurs de recherche. Si vous voulez une croissance utilisateur basée sur le contenu, les sites web et les blogs personnels sont parmi les meilleurs choix. Les articles techniques et les vitrines de projets peuvent apporter du trafic SEO en continu.
    </div>
  </el-collapse-item>
  
  <el-collapse-item name="3">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ Idée reçue 3 : « Les applications de bureau ne sont plus utilisées »</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      Dans les scénarios de bureau, les applications de bureau restent mainstream. VS Code, Slack et Notion sont toutes des applications de bureau. Si votre application nécessite des sessions longues, un traitement lourd de données ou une intégration système, le bureau est souvent le meilleur choix.
    </div>
  </el-collapse-item>
  
  <el-collapse-item name="4">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ Idée reçue 4 : « L'expérience PWA est inférieure au natif »</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      Les PWA modernes sont déjà très proches de l'expérience native. Starbucks, Pinterest et Uber ont tous des versions PWA. Si votre application ne nécessite pas d'intégration matérielle complexe, la PWA est souvent la solution multiplateforme la plus rentable.
    </div>
  </el-collapse-item>
</el-collapse>

---

## 7 Résumé : Flux de décision de sélection de plateforme

```text
Début
  │
  ├─ Les utilisateurs sont-ils dans l'écosystème WeChat ? ───────────────────→ Mini Program WeChat
  │
  ├─ Besoin des meilleures performances et d'un accès matériel profond ? ──→ iOS / Android Natif
  │
  ├─ Besoin de longues sessions d'utilisation sur ordinateur ? ───────────→ Application de bureau
  │     │
  │     ├─ Scénario industriel ? ───────────────────────→ Qt
  │     └─ Scénario général ? ──────────────────────────→ Electron
  │
  ├─ Besoin de traiter le contenu des pages du navigateur ? ────────────→ Extension de navigateur
  │
  ├─ Léger + multiplateforme + hors ligne ? ──────────→ PWA
  │
  ├─ Besoin d'être découvrable par la recherche ? ───────────────→ Site web / Blog
  │
  ├─ Outil pour développeurs ? ───────────────────────────────────→ Extension VS Code
  │
  └─ Actif blockchain ? ────────────────────────────────→ Contrat intelligent NFT
```

---

## 8 Prochaine étape

::: tip 🎯 Commencez à agir
Sur la base de l'analyse ci-dessus, vous devriez maintenant avoir une réponse préliminaire à « quelle plateforme choisir ». Ensuite, cliquez sur le tutoriel correspondant pour commencer :
:::

<NavGrid>
  <NavCard
    href="/fr-fr/stage-3/cross-platform/wechat-miniprogram/"
    title="Comment construire un Mini Program WeChat"
    description="Construisez un Mini Program WeChat depuis zéro et maîtrisez le flux de développement principal"
  />
  <NavCard
    href="/fr-fr/stage-3/cross-platform/android-app/"
    title="Comment construire une application Android"
    description="Construisez des applications natives Android avec des frameworks multiplateformes modernes"
  />
  <NavCard
    href="/fr-fr/stage-3/cross-platform/ios-app/"
    title="Comment construire une application iOS"
    description="Développez et publiez des applications iOS avec les meilleures pratiques de l'écosystème Apple"
  />
  <NavCard
    href="/fr-fr/stage-3/cross-platform/pwa-local-app/"
    title="Comment construire une application PWA locale"
    description="Transformez un site web en vraie application avec support hors ligne et installation sur le bureau"
  />
  <NavCard
    href="/fr-fr/stage-3/cross-platform/browser-ai-extension/"
    title="Comment construire une extension IA pour le navigateur"
    description="Résumez n'importe quelle page web en un clic et construisez votre assistant IA de navigateur"
  />
  <NavCard
    href="/fr-fr/stage-3/cross-platform/electron-voice-to-text/"
    title="Comment construire une application de bureau Electron multiplateforme"
    description="Construisez une application de bureau de reconnaissance vocale pour Windows, macOS et Linux"
  />
  <NavCard
    href="/fr-fr/stage-3/cross-platform/vscode-extension/"
    title="Comment construire une extension VS Code"
    description="Créez votre assistant IA de projet avec Q&A multi-fichiers et raccourcis personnalisés"
  />
  <NavCard
    href="/fr-fr/stage-3/cross-platform/qt-industrial-hmi/"
    title="Comment construire une IHM industrielle Qt"
    description="Construisez une interface homme-machine de grade industriel connectée à du matériel réel"
  />
</NavGrid>
