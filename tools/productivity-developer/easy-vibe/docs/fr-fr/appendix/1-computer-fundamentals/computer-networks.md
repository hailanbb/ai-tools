# Le navigateur est un système d'exploitation

::: tip Préface
Vous utilisez un navigateur tous les jours — regarder des vidéos, lire des actualités, travailler en ligne. Mais avez-vous déjà réfléchi à ce qui se passe **quand vous tapez une adresse web dans la barre d'adresse et appuyez sur Entrée** ?

Cet article utilise l'analogie quotidienne du **« achats en ligne »** associée au **processus technique réel** pour vous aider à comprendre étape par étape comment le navigateur transforme une ligne d'adresse en une page riche et colorée.
:::

**Que allez-vous apprendre dans cet article ?**

À la fin de ce chapitre, vous maîtriserez le flux technique complet, de la saisie de l'URL à l'affichage de la page, et comprendrez comment le navigateur et le serveur collaborent. Ces connaissances constituent le fondement pour apprendre les API, les interfaces et la sécurité réseau, ainsi que la clé pour résoudre les problèmes quotidiens comme « la page ne s'ouvre pas » ou « le chargement est lent ».

| Chapitre | Contenu | Concepts clés |
|-----|------|---------|
| **Chapitre 1** | Analyse d'URL | Structure et rôle d'une adresse web |
| **Chapitre 2** | Résolution DNS | Comment les noms de domaine sont convertis en adresses IP |
| **Chapitre 3** | Poignée de main TCP | Comment établir une connexion fiable |
| **Chapitre 4** | Communication HTTP | Comment le navigateur et le serveur dialoguent |
| **Chapitre 5** | Rendu du navigateur | Comment le code devient une image |
| **Chapitre 6** | Statique vs Dynamique | Comment le contenu des pages web est généré |

---

## 0. Introduction : Le moment où vous appuyez sur Entrée

::: tip 🤔 Question centrale
**Que se passe-t-il quand vous tapez une adresse web et appuyez sur Entrée ?** Pourquoi certaines pages s'ouvrent rapidement et d'autres lentement ? Pourquoi voit-on parfois l'erreur « serveur introuvable » ?
:::

### Analogie quotidienne : Un achat en ligne

Imaginez que vous faites un **achat en ligne**. Le processus complet se divise en 5 étapes :

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="flex: 1; padding: 16px; background: var(--vp-c-bg-alt); border-radius: 12px;">

**🛒 Étape 1 : Remplir la commande**
Choisir le produit, confirmer l'adresse de livraison

</div>
<div style="flex: 1; padding: 16px; background: var(--vp-c-bg-alt); border-radius: 12px;">

**🗺️ Étape 2 : Chercher l'entrepôt**
Le système trouve l'entrepôt d'expédition concerné

</div>
<div style="flex: 1; padding: 16px; background: var(--vp-c-bg-alt); border-radius: 12px;">

**📞 Étape 3 : Établir le canal**
Confirmer que l'entrepôt est ouvert et peut expédier

</div>
</div>

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="flex: 1; padding: 16px; background: var(--vp-c-bg-alt); border-radius: 12px;">

**🚚 Étape 4 : L'entrepôt expédie**
Le livreur apporte le colis

</div>
<div style="flex: 1; padding: 16px; background: var(--vp-c-bg-alt); border-radius: 12px;">

**🎁 Étape 5 : Déballer**
Ouvrir le colis et découvrir le produit souhaité

</div>
</div>

**Le processus d'accès à une page web est remarquablement similaire à un achat en ligne !**

Quand vous tapez `google.com` et appuyez sur Entrée, vous êtes l'« acheteur », et le navigateur, par une série d'opérations, achemine la « marchandise » (le contenu de la page) depuis un serveur distant jusqu'à votre écran.

<UrlToBrowserQuickStart />

::: info 💡 Insight central
La clé pour comprendre le fonctionnement du navigateur est de **faire correspondre des processus techniques complexes à des scénarios quotidiens familiers**. Les 5 étapes de l'achat en ligne correspondent parfaitement aux 5 phases techniques de l'accès à une page web.
:::

---

## 1. Première étape : Remplir la « commande » — Analyse d'URL

::: tip 🤔 Question centrale
**Pourquoi une adresse web a-t-elle cette forme ?** `https://www.example.com:8080/path/page.html?id=123#section` — Que signifie cette chaîne de caractères ?
:::

### Analogie quotidienne : Remplir un bon de commande

Si vous écrivez simplement « acheter des chaussures » sur le bon de commande, l'entrepôt ne saura pas quelle paire envoyer. Vous devez préciser :

- **Type de magasin** (boutique officielle / magasin ordinaire)
- **Nom du magasin** (Boutique officielle Nike)
- **Emplacement du produit** (Rayon homme / Collection running)
- **Modèle exact** (Air Max 90)
- **Informations supplémentaires** (Je les veux en rouge)

### Processus réel : Le navigateur analyse l'URL

**L'URL (Uniform Resource Locator)** est le « code produit » du monde du navigateur. Quand vous tapez `https://www.example.com:8080/path/page.html?id=123#section`, le navigateur la décompose immédiatement :

| Partie de l'URL | Exemple | Analogie achat en ligne | Rôle technique |
| -------------------------- | -------------------- | -------------------------------------------------- | ------------------------------------------------------------------------ |
| **Protocole** `https://` | Protocole de transfert hypertexte sécurisé | **Mode de livraison** : Livraison confidentielle (HTTPS) vs livraison standard (HTTP) | Détermine les règles de communication. `http` est standard, `https` est chiffré |
| **Domaine** `www.example.com` | Nom lisible du serveur | **Nom du magasin** : La Fnac | Indique au navigateur quel serveur chercher. Le domaine est pour les humains, l'adresse IP est le but final |
| **Port** `:8080` | « Numéro de porte » spécifique du serveur | **Numéro de comptoir** : Comptoir 3 (omis par défaut) | Plusieurs services peuvent tourner sur un serveur ; le port indique lequel rejoindre. HTTP : 80 par défaut, HTTPS : 443 |
| **Chemin** `/path/page.html` | Emplacement du fichier sur le serveur | **Emplacement du rayon** : Rayon produits ménagers / 3e rangée | Spécifie l'emplacement exact de la ressource sur le serveur |
| **Paramètres de requête** `?id=123` | Informations supplémentaires | **Note de commande** : Rouge, taille XL | Données supplémentaires transmises au serveur, ex. mots-clés de recherche, numéro de page |
| **Ancre** `#section` | Position dans la page | **Page du manuel** : Aller à la page 5 | Scrolle automatiquement vers la position indiquée après le chargement ; non envoyé au serveur |

<UrlParserDemo />

::: info 💡 Compréhension essentielle
Les URL existent pour que les **humains** puissent les retenir et les saisir. Ce dont l'ordinateur a finalement besoin, c'est d'une **adresse IP** — tout comme le livreur a besoin de l'adresse exacte de l'entrepôt et non du nom « Boutique officielle Nike ».
:::

---

## 2. Deuxième étape : Consulter l'« annuaire » — Résolution DNS

::: tip 🤔 Question centrale
**Comment le navigateur trouve-t-il le site web ?** Vous saisissez un nom de domaine lisible (ex. `baidu.com`), mais l'ordinateur a besoin d'une adresse numérique (IP). Que se passe-t-il entre les deux ?
:::

### Analogie quotidienne : Chercher l'adresse de l'entrepôt

Vous avez commandé chez « la Boutique officielle Nike », mais le système logistique ne sait pas où se trouve l'entrepôt. Il faut consulter l'annuaire :

1. D'abord vérifier les **adresses fréquentes** (ai-je déjà acheté ici récemment ?) → Cache du navigateur
2. Sinon, demander au **point relais du quartier** (ils connaissent les grandes zones) → Serveur DNS local
3. Demander au **centre de répartition** (sait qui gère les .com) → Serveur de noms racine
4. Demander au **service des marques** (trouve finalement le véritable entrepôt d'expédition de Nike) → Serveur de noms faisant autorité

### Processus réel : Résolution DNS hiérarchique

**Le DNS (Domain Name System)** est le « système d'annuaire distribué » d'Internet. Avec des milliards de noms de domaine dans le monde, une architecture hiérarchique répartit la charge de requêtes :

```
Vous (navigateur)
    ↓ Question : Quelle est l'IP de google.com ?
Serveur DNS local (votre fournisseur d'accès)
    ↓ Question : Qui gère .com ?
Serveur de noms racine (13 groupes dans le monde, gèrent tous les TLD)
    ↓ Réponse : Demandez au gestionnaire de .com
Serveur TLD (Verisign gère .com)
    ↓ Réponse : Demandez au gestionnaire de google.com
Serveur de noms faisant autorité (le propre serveur DNS de Google)
    ↓ Réponse : L'IP de google.com est 142.250.80.46
Adresse IP renvoyée au navigateur
```

**Types de requêtes :**

- **Requête récursive** : Le navigateur envoie une seule requête ; le DNS local effectue les recherches hiérarchiques et renvoie le résultat
- **Requête itérative** : Chaque niveau indique au suivant où chercher ; le navigateur doit effectuer plusieurs requêtes
- **Mécanisme de cache** : Les résultats sont mis en cache et renvoyés directement la fois suivante, accélérant considérablement l'accès

<DnsLookupDemo />

::: info 💡 Pourquoi tant de niveaux ?
Imaginez qu'il n'existe qu'un seul annuaire dans le monde — des milliards de personnes consultant en même temps le feraient s'effondrer instantanément. La conception hiérarchique permet à chaque niveau de ne gérer que sa propre « juridiction » — efficace et fiable.

C'est le principe fondamental de la conception d'Internet : les **systèmes distribués**.
:::

---

## 3. Troisième étape : Confirmation par téléphone — Poignée de main TCP en trois temps

::: tip 🤔 Question centrale
**Pourquoi une « poignée de main en trois temps » ?** Une fois l'adresse du serveur trouvée, pourquoi ne peut-on pas envoyer les données directement ? Pourquoi trois échanges préliminaires sont-ils nécessaires ?
:::

### Analogie quotidienne : Établir un canal logistique

Si le camion de livraison arrive directement à l'entrepôt, plusieurs problèmes peuvent survenir :

- L'entrepôt est fermé → déplacement inutile
- L'entrepôt est saturé et ne prend plus de commandes → impossible d'expédier
- Le quai de déchargement est introuvable → impossible de se connecter

**C'est pourquoi il faut établir un canal de transport fiable avant l'expédition.**

### Processus réel : Poignée de main TCP en trois temps

**TCP (Transmission Control Protocol, protocole de contrôle de transmission)** est le protocole garantissant un transfert fiable des données. Avant de transporter la « marchandise » (les données), la connexion doit être établie par une « poignée de main en trois temps » :

```
Client (votre ordinateur)              Serveur (entrepôt du vendeur)
   |                                |
   |--- SYN=1 --------------------->|  1er : Bonjour, je suis là, prêt à réceptionner !(SYN)
   |                                |
   |<-- SYN=1, ACK=1 ---------------|  2e : Bien reçu ! Je suis aussi prêt à expédier, vous êtes là ?(SYN-ACK)
   |                                |
   |--- ACK=1 --------------------->|  3e : Oui ! Veuillez expédier.(ACK)
   |                                |
   ===== Canal établi, l'expédition commence =====
```

**Pourquoi trois et pas deux ?**

- **Premier temps (SYN)** : Le client prouve qu'il peut envoyer
- **Deuxième temps (SYN-ACK)** : Le serveur prouve qu'il peut recevoir et envoyer
- **Troisième temps (ACK)** : Le client prouve qu'il peut recevoir

La poignée de main en trois temps garantit : **les deux parties peuvent envoyer et recevoir** — les quatre conditions doivent être remplies pour une transmission fiable.

**TCP gère aussi :**

- **Segmentation des données** : Découper les grosses données en petits paquets
- **Réordonnancement** : Garantir que les paquets sont réassemblés dans le bon ordre
- **Retransmission sur erreur** : Renvoi automatique en cas de perte de paquet
- **Contrôle de flux** : Adapter la vitesse d'envoi aux conditions du réseau

<TcpHandshakeDemo />

> **Étape supplémentaire pour HTTPS** : Pour les sites HTTPS (sécurisés), après la poignée de main TCP a lieu une **poignée de main TLS** (1-RTT ou 2-RTT), où les deux parties échangent des clés de chiffrement, afin que seuls les deux interlocuteurs puissent comprendre la suite de la conversation — comme communiquer en code secret.

---

## 4. Quatrième étape : Le dialogue entre « l'acheteur » et le « vendeur » — Requête et réponse HTTP

::: tip 🤔 Question centrale
**Que se disent le navigateur et le serveur ?** Une fois la connexion établie, comment le navigateur « indique-t-il » au serveur ce qu'il veut ? Et comment le serveur « répond-il » ?
:::

### Analogie quotidienne : L'entrepôt expédie

Le camion de livraison arrive à l'entrepôt : « Voici la commande (requête HTTP), **je viens récupérer la marchandise (le code source HTML de la page) !** »
Le gestionnaire de l'entrepôt vérifie : « Commande valide, voici votre colis (**fichier HTML**), tenez. »

### Processus réel : Communication via le protocole HTTP

**HTTP (HyperText Transfer Protocol, protocole de transfert hypertexte)** est le « règlement de dialogue » entre le navigateur et le serveur. Une fois le canal établi, le navigateur envoie une **requête de récupération** ; l'**objectif central est de récupérer le code source de la page (fichier HTML)** :

**Exemple de requête HTTP :**

```http
GET /index.html HTTP/1.1          ← Méthode + chemin + version du protocole
Host: www.example.com             ← Hôte cible (supporte les hôtes virtuels, un serveur peut héberger plusieurs sites)
User-Agent: Chrome/120.0          ← Identification du client (le serveur peut adapter le contenu)
Accept: text/html,application/xhtml+xml  ← Formats de réponse acceptés
Accept-Language: fr-FR,fr;q=0.9   ← Langue préférée
Accept-Encoding: gzip, deflate    ← Formats de compression supportés
Connection: keep-alive            ← Maintenir la connexion (réutiliser la connexion TCP)
Cookie: session_id=abc123         ← Identifiants d'authentification
```

::: tip 💡 Révélation développeur : C'est juste une API !
**Exactement la même chose !**
Vos appels d'API habituels (`fetch` / `axios`) et la navigation web du navigateur sont **exactement la même chose au niveau HTTP**.

Les deux envoient une requête, le serveur renvoie des données textuelles.

- Si le serveur renvoie du **HTML**, le navigateur le **dessine** (en fait une page web).
- Si le serveur renvoie du **JSON**, votre code le **stocke** (pour le traitement logique).

**Il n'y a pas « deux types » de requêtes, mais un seul type de requête HTTP — seul le format des données renvoyées (Content-Type) diffère.**
C'est pourquoi comprendre HTTP, c'est comprendre 90 % des principes des API backend.

Pour approfondir le développement d'API, consultez le [chapitre API](./api-intro.md).
:::

**Méthodes HTTP courantes :**

- `GET` : Récupérer une ressource (sûr, idempotent, cachable)
- `POST` : Soumettre des données (créer une ressource, ex. inscription, connexion)
- `PUT` : Mettre à jour une ressource (remplacement complet)
- `PATCH` : Mise à jour partielle d'une ressource
- `DELETE` : Supprimer une ressource
- `HEAD` : Récupérer seulement les en-têtes de réponse (pas de corps, pour vérifier l'existence)

**Le serveur renvoie une réponse HTTP :**

```http
HTTP/1.1 200 OK                   ← Version du protocole + code de statut + description
Date: Mon, 23 May 2025 12:00:00 GMT  ← Heure du serveur
Content-Type: text/html; charset=UTF-8  ← Type de contenu et encodage
Content-Length: 1234              ← Longueur du contenu (octets)
Cache-Control: max-age=3600       ← Politique de cache
Set-Cookie: user_id=xyz789        ← Définition d'un cookie

<!DOCTYPE html>...                ← Corps de la réponse (contenu de la page)
```

**Catégories de codes de statut HTTP :**

| Code de statut | Catégorie | Signification | Analogie quotidienne |
| ----------- | ---------- | ---------------- | -------------------------------- |
| **200** | Succès | Requête traitée avec succès | « Commande confirmée, envoi en cours » |
| **301/302** | Redirection | La ressource a été déplacée | « Notre boutique a déménagé, veuillez commander dans la nouvelle » |
| **304** | Non modifié | Le cache est encore valide | « Votre dernier achat est encore utilisable, pas besoin de renvoyer » |
| **400** | Erreur client | Format de requête incorrect | « Bon de commande illisible, incompréhensible » |
| **401** | Non autorisé | Authentification requise | « Veuillez d'abord présenter votre carte de membre » |
| **403** | Interdit | Permissions insuffisantes | « Accès réservé au personnel » |
| **404** | Non trouvé | La ressource n'existe pas | « Ce produit n'est pas en stock » |
| **500** | Erreur serveur | Erreur interne du serveur | « Incendie dans l'entrepôt, envoi temporairement impossible » |
| **502** | Erreur de passerelle | Le serveur amont ne répond pas | « L'entrepôt principal est vide, l'antenne ne peut pas approvisionner » |
| **503** | Service indisponible | Serveur surchargé ou en maintenance | « Ruée de commandes, commandes suspendues » |

<HttpExchangeDemo />

---

## 5. Cinquième étape : Ouvrir le « colis » — Rendu du navigateur

::: tip 🤔 Question centrale
**Comment le code devient-il une image ?** Le serveur envoie du code HTML/CSS/JavaScript ennuyeux — comment le navigateur le transforme-t-il en une page web riche et colorée ?
:::

### Analogie quotidienne : Déballage et assemblage

Vous avez enfin reçu le colis (réponse HTTP), mais en l'ouvrant, vous ne trouvez pas de meuble tout fait, mais des **pièces détachées** (HTML) et un **mode d'emploi** (CSS). En tant qu'« acheteur » (navigateur), vous devez tout assembler vous-même :

1. **Ouvrir l'emballage** : Sortir toutes les pièces et vérifier la liste (analyser le HTML → arbre DOM)
2. **Lire le mode d'emploi** : Comprendre quelle pièce va où et de quelle couleur (analyser le CSS → arbre CSSOM)
3. **Trier** : Sélectionner les pièces à assembler, jeter les emballages (`display: none`), préparer l'assemblage (construire l'arbre de rendu)
4. **Mesurer les positions** : Prendre les dimensions de la pièce et décider où placer chaque meuble (layout/reflow)
5. **Peindre et décorer** : Peindre les meubles, appliquer des autocollants (painting)
6. **Présentation finale** : Nettoyer, allumer la lumière, présenter (compositing)

### Processus réel : Le moteur de rendu du navigateur

Le navigateur reçoit du **code HTML/CSS/JavaScript** (du texte ennuyeux) qu'il doit convertir en **pixels à l'écran** (une belle page web). Ce processus s'appelle le **rendu (Rendering)** et est exécuté par le **moteur de rendu** du navigateur (par ex. Blink dans Chrome, WebKit dans Safari).

#### Étape 1 : Analyser le HTML → Construire l'arbre DOM (liste des pièces)

Le navigateur lit le flux d'octets HTML et le transforme en un **arbre DOM (Document Object Model)**. C'est comme organiser des pièces éparses dans une liste hiérarchique :

```html
<!-- HTML original -->
<div class="header">Titre</div>
<div class="content">Contenu</div>
```

```text
Structure de l'arbre DOM :
Document
 └─ html
     └─ body
         ├─ div.header ("Titre")
         └─ div.content ("Contenu")
```

#### Étape 2 : Analyser le CSS → Construire l'arbre CSSOM (mode d'emploi)

Le navigateur analyse toutes les règles CSS (en ligne, fichiers externes) et construit un **arbre CSSOM (CSS Object Model)**. C'est comme comprendre les règles de style du mode d'emploi :

```css
.header {
  color: blue;
  font-size: 24px;
} /* Le titre doit être bleu */
.content {
  display: none;
} /* Le contenu est temporairement caché */
```

#### Étape 3 : Fusionner → Arbre de rendu (préparation de l'assemblage)

Arbre DOM + Arbre CSSOM = **Arbre de rendu (Render Tree)**.
Point clé : **Seuls les éléments « visibles » figurent dans l'arbre de rendu**.

- `.header` : Dans l'arbre de rendu (visible).
- `.content` : **Absent** de l'arbre de rendu (`display: none` — comme un emballage jeté, pas besoin d'assembler).

#### Étape 4 : Layout (Layout / Reflow) — Prendre les mesures

Le navigateur calcule les **coordonnées et dimensions exactes** de chaque nœud de l'arbre de rendu à l'écran.

- « Ce cadre de titre fait 100px de large, 50px de haut, positionné en haut à gauche (0,0). »
- Ce processus s'appelle le **reflow**. Si la taille de la fenêtre change (ex. passage en mode paysage sur mobile), toutes les positions doivent être recalculées — très coûteux en performance.

#### Étape 5 : Paint — Peindre

Une fois les positions connues, le navigateur commence à remplir les pixels : peindre les couleurs de fond, les couleurs de texte, les bordures, les ombres, etc.

#### Étape 6 : Composite — Présentation finale

Les navigateurs modernes divisent la page en plusieurs **couches (Layers)** dessinées séparément (ex. transformations 3D, barre de défilement indépendante), puis le GPU les superpose comme des calques Photoshop pour les afficher à l'écran.

<BrowserRenderingDemo />

::: info 💡 Le saviez-vous ?
**Le layout et le paint** sont les moments où le navigateur est le plus actif. Plus il y a d'éléments sur la page et plus la structure est complexe, plus le navigateur a besoin de temps pour calculer les positions et peindre. C'est pourquoi certaines pages complexes saccadent au chargement.
:::

---

## 5.5 Comment une page web est-elle « générée » ? Sites statiques vs sites dynamiques

::: tip 🤔 Question centrale
**D'où vient le contenu des pages ?** Nous avons expliqué comment le navigateur rend une page. Mais comment le fichier HTML sur le serveur est-il créé ? Est-il préparé à l'avance ou fabriqué à la volée ?
:::

### Site statique : Préparé à l'avance, livré directement

Imaginez que vous achetez des biscuits au supermarché. Les biscuits sur l'étagère sont déjà produits en usine — vous les prenez et repartez, sans attendre.

Un **site statique** est un tel « produit fini » — les pages sont déjà prêtes sur le serveur. Lors de la visite, le serveur envoie directement le fichier HTML tel quel, sans traitement supplémentaire.

**Caractéristiques :**
- ✅ Accès rapide (le serveur ne fait qu'envoyer des fichiers, pas de calcul)
- ✅ Création simple (écrire du HTML et c'est prêt)
- ✅ Capacité de charge élevée (distribuable via CDN, quel que soit le nombre de visiteurs)
- ❌ Mise à jour du contenu difficile (modifier le contenu nécessite de régénérer les fichiers)

**Exemples courants :** Pages de présentation d'entreprise, documentation produit, centre d'aide, blogs personnels

### Site dynamique : Préparé à la commande, différent à chaque fois

Maintenant, imaginez que vous commandez au restaurant. Le cuisinier prépare votre plat selon votre commande — si vous commandez du poulet Kung Pao, on ne vous sert pas du porc aigre-doux.

Un **site dynamique** est une page « fabriquée à la volée » à chaque visite — le serveur reçoit la requête, interroge la base de données, calcule les données, puis génère un nouveau HTML qu'il vous envoie.

**Caractéristiques :**
- ✅ Contenu en temps réel (panier affichant le stock actualisé, nouvelles mises à jour instantanées)
- ✅ Personnalisation (affichage de vos informations personnelles après connexion)
- ✅ Fonctionnalités puissantes (recherche, commentaires, recommandations, paiement)
- ❌ Accès plus lent (le serveur a besoin de temps pour calculer)
- ❨ Charge serveur élevée (de nombreux visiteurs simultanés créent des files d'attente)

**Exemples courants :** Sites e-commerce, réseaux sociaux, banque en ligne, éditeurs de documents en ligne

**Faut-il un serveur ?** Les sites dynamiques nécessitent effectivement un « backend » sous une forme ou une autre, mais les options sont variées :
- **Serveur traditionnel** : Acheter/louer son propre serveur (AWS EC2, etc.)
- **Serverless** : Pas besoin de gérer de serveur, le fournisseur cloud exécute le code (AWS Lambda, Cloudflare Workers, etc.)
- **Appels à des API tierces** : Paiement via Stripe, météo via l'API météo, sans écrire de code backend

::: tip 💡 Combiner statique et dynamique
Beaucoup de sites modernes sont « hybrides » : le corps de la page est statique, mais certaines parties (zone de commentaires, barre de recherche) sont chargées dynamiquement. JavaScript peut appeler des API après le chargement de la page pour récupérer des données, réalisant ainsi « page statique + fonctionnalités dynamiques ».
:::

### 📊 Statique vs Dynamique — Comparaison claire

| | Site statique | Site dynamique |
|---|---------|---------|
| **Origine** | Préparé à l'avance, stocké sur le serveur | Fabriqué à la volée à chaque visite |
| **Analogie** | Produit sur l'étagère du supermarché | Plat commandé au restaurant |
| **Vitesse** | Rapide | Lent (calcul nécessaire) |
| **Modification du contenu** | Difficile (régénération nécessaire) | Facile (modification directe dans le backend) |
| **Usage adapté** | Contenu de présentation (page d'accueil, documentation) | Applications interactives (shopping, réseaux sociaux) |
| **Exemples typiques** | Site vitrine d'entreprise, documentation d'aide | Amazon, Facebook, banque en ligne |

### 🤔 Questions fréquentes

**Q : Un site statique ne peut-il pas utiliser JavaScript ?**

Bien sûr que si ! Carrousels d'images, menus déroulants, validation de formulaires — toutes ces fonctionnalités interactives peuvent être réalisées en JavaScript sur un site statique. « Statique » et « dynamique » désignent **si le contenu de la page est préparé à l'avance**, et non la présence ou l'absence de fonctionnalités interactives.

**Q : Un site dynamique nécessite-t-il obligatoirement son propre serveur ?**

Pas forcément. Outre les serveurs traditionnels, vous pouvez utiliser le serverless (fonctions cloud) ou appeler directement des API tierces. La tendance actuelle est de « ne pas toucher au serveur » — site statique + appels d'API via JavaScript, rapide et économique.

::: tip 💡 Remarque importante
Que le site soit statique ou dynamique, **le principe de rendu du navigateur est le même !** Le navigateur rend ce que le serveur envoie. La seule différence :
- Site statique : le serveur envoie un « produit fini »
- Site dynamique : le serveur envoie un « produit fraîchement préparé »

En tant que développeur frontend, votre préoccupation principale est la façon dont le navigateur traite le contenu reçu, et non la manière dont le serveur le génère.
:::

---

## 6. Résumé : Un « achat en ligne » complet

::: tip 🎉 Après ce chapitre, vous devriez pouvoir
- Expliquer le flux complet de la saisie de l'URL à l'affichage de la page
- Comprendre le rôle et la relation de l'URL, DNS, TCP et HTTP
- Savoir comment le navigateur rend une page
- Distinguer sites statiques et sites dynamiques
- Expliquer le fonctionnement du navigateur avec des analogies quotidiennes
:::

Revenons sur l'ensemble du voyage :

| Phase | Terme technique | Analogie achat en ligne | Tâche centrale | Technologies clés |
| ----------- | ---------- | -------- | ------------------ | ------------------------------ |
| **1. Analyse** | Analyse d'URL | Remplir la commande | Comprendre ce que veut l'acheteur | Protocole, domaine, port, chemin, paramètres |
| **2. Requête** | Résolution DNS | Chercher l'adresse de l'entrepôt | Trouver l'entrepôt d'expédition du magasin | Requête récursive/itérative, mécanisme de cache |
| **3. Connexion** | Poignée de main TCP | Établir le canal | Assurer la fluidité logistique | Poignée de main en 3 temps, numéros de séquence, contrôle de flux |
| **4. Dialogue** | Échange HTTP | L'entrepôt expédie | Passer commande et réceptionner | Méthodes de requête, codes de statut, champs d'en-tête |
| **5. Présentation** | Rendu du navigateur | Déballage et assemblage | Présenter le produit | DOM, CSSOM, arbre de rendu, layout, paint |

**L'ensemble du processus s'accomplit généralement en quelques centaines de millisecondes** — pensez à quel point c'est remarquable !

Votre navigateur, en moins d'une seconde :

- A analysé une adresse complexe
- A interrogé des serveurs DNS répartis dans le monde entier
- A établi une connexion fiable avec un serveur à des milliers de kilomètres
- A mené un dialogue HTTP complet
- A transformé du code ennuyeux en une image magnifique

C'est la fascination d'Internet : **une technologie complexe, une expérience simple.**

::: info 💡 Pour aller plus loin
Si vous souhaitez approfondir un aspect particulier :
- **Développement d'API** : [Introduction aux API](./api-intro.md) — Apprendre à concevoir et utiliser des API
- **Performance frontend** : [Optimisation des performances frontend](./frontend-performance.md) — Apprendre à optimiser la vitesse de chargement
- **Rendu du navigateur** : [Pipeline de rendu du navigateur](./browser-rendering-pipeline.md) — Approfondir les détails du rendu
:::

---

## 7. Glossaire

| Terme | Nom complet | Brève explication |
| ----------- | ----------------------------- | -------------------------------------------------------------------------- |
| **URL** | Uniform Resource Locator | **Localisateur uniforme de ressource**. L'« adresse » d'une page web, indiquant au navigateur où trouver la ressource |
| **DNS** | Domain Name System | **Système de noms de domaine**. L'« annuaire téléphonique » d'Internet, convertissant les noms de domaine lisibles en adresses IP lisibles par les machines |
| **Adresse IP** | Internet Protocol Address | **Adresse de protocole Internet**. Le « numéro de porte » unique de chaque appareil connecté, ex. `192.168.1.1` |
| **TCP** | Transmission Control Protocol | **Protocole de contrôle de transmission**. Le « règlement » garantissant un transfert de données fiable, via la poignée de main en trois temps |
| **HTTP** | HyperText Transfer Protocol | **Protocole de transfert hypertexte**. Les « règles de dialogue » entre le navigateur et le serveur |
| **HTTPS** | HTTP Secure | **HTTP sécurisé**. HTTP avec chiffrement (TLS/SSL) ajouté pour protéger la sécurité des données |
| **HTML** | HyperText Markup Language | **Langage de balisage hypertexte**. Le « squelette » de la page web, définissant la structure du contenu |
| **CSS** | Cascading Style Sheets | **Feuilles de style en cascade**. L'« apparence » de la page web, définissant le look du contenu |
| **DOM** | Document Object Model | **Modèle objet de document**. La structure arborescente dans laquelle le navigateur convertit le HTML, facilitant la manipulation |
| **CSSOM** | CSS Object Model | **Modèle objet CSS**. La structure arborescente dans laquelle le navigateur convertit le CSS |
| **Rendu** | Rendering | Le processus par lequel le navigateur convertit le code en pixels à l'écran |
| **RTT** | Round Trip Time | **Temps aller-retour**. Le temps entre l'envoi d'un paquet de données et la réception de l'accusé de réception, affectant la vitesse de chargement |

---

::: tip 🎓 Félicitations
Désormais, quand vous saisirez à nouveau une adresse web dans la barre d'adresse et appuierez sur Entrée, vous pourrez voir le monde numérique animé et fascinant qui s'active derrière votre écran.

Vous comprenez désormais :
- Pourquoi certaines pages ne s'ouvrent pas (échec de résolution DNS, serveur en panne)
- Pourquoi certaines pages sont rapides et d'autres lentes (latence réseau, performance du serveur, complexité de la page)
- Comment le navigateur transforme le code en image (pipeline de rendu)

**C'est la valeur de la compréhension des principes techniques** — face à un problème, vous savez où chercher la cause au lieu d'être démuni.
:::
