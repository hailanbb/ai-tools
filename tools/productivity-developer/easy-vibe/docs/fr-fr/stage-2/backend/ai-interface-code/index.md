# Conception et développement d'interfaces backend d'application

Dans les cours précédents, nous avons appris à utiliser des outils comme Figma pour réaliser des maquettes de conception UI, à utiliser l'IA pour générer rapidement des pages frontend statiques, et à utiliser Supabase pour construire des bases de données et mettre en œuvre une authentification utilisateur préliminaire. Désormais, une question naturelle se pose : après que l'utilisateur a cliqué sur ces boutons dynamiques de la page frontend, comment les données sont-elles silencieusement stockées dans Supabase ? Lorsque nous devons exécuter des logiques métier plus complexes (paiements concurrents, notifications planifiées, traitement de données sensibles), est-il sûr de laisser le frontend se connecter directement à la base de données ?

Cela nous amène à un maillon crucial de l'architecture de développement web moderne — **l'interface API backend**.

Plutôt que de taper manuellement des centaines de lignes de routes backend, contrôleurs et logique de validation de paramètres, nous pouvons désormais tirer parti de la puissante capacité de génération de code des grands modèles pour confier le code fastidieux à l'IA. Dans ce cours, nous sortirons du cercle vicieux du « code IA vague et superficiel » et, en nous appuyant sur de véritables scénarios métier, nous vous montrerons comment utiliser des prompts de haute qualité pour guider les grands modèles afin d'écrire des interfaces backend Node.js robustes et conformes aux normes de l'industrie, tout en générant automatiquement la documentation API et les cas de test.

> 💡 **Prérequis**
> 
> Avant d'étudier cette section, il est recommandé de connaître les sujets suivants :
> - [De la base de données à Supabase](../database-supabase/) - Comprendre les concepts de base de données et de modèle de données.
> - [Git et GitHub](../git-workflow/) - Se familiariser avec le contrôle de version dans le développement de projets.
> - [Qu'est-ce que le terminal/la ligne de commande](/fr-fr/appendix/2-development-tools/command-line-shell) - L'initialisation et le lancement de projets nécessitent des opérations de base en ligne de commande.

# Ce que vous allez apprendre

1. **Qu'est-ce qu'une interface API** : Comprendre le pont de communication frontend-backend et les spécifications de conception RESTful.
2. **Les grands modèles au service de la construction** : Comment utiliser des prompts structurés pour que l'IA vous aide à monter un projet de base Node.js + Express.
3. **Développement de la logique d'interface** : Guider les grands modèles pour générer des interfaces CRUD (créer, lire, mettre à jour, supprimer) avec validation métier rigoureuse et connexion à la base de données Supabase.
4. **Documentation API automatisée** : Laisser les grands modèles générer rétroactivement à partir du code la documentation OpenAPI/Swagger, standard de la collaboration inter-équipes.
5. **Boucle de test et d'intégration** : Utiliser les grands modèles pour générer des collections de test Postman et des tests unitaires Jest, garantissant la qualité du code.

---

# 1. Pourquoi avons-nous besoin d'interfaces API ?

Dans la compréhension traditionnelle, le frontend est la « partie visible » et la base de données est l'« entrepôt de stockage ». Mais il manque un dispatcher entre les deux. Si vous imaginez l'application comme un restaurant :
- **Le frontend (client)** est le menu et la table de commande du restaurant, où les clients parcourent les plats et expriment leurs besoins.
- **La base de données (Supabase, etc.)** est l'entrepôt de la cuisine du restaurant, où sont stockés tous les ingrédients et les registres de comptes.
- **L'interface API backend** est le serveur du restaurant. Les clients ne peuvent pas se précipiter directement dans la cuisine pour prendre des ingrédients (ce serait chaotique et soulèverait des problèmes de sécurité). Ils doivent communiquer leur « demande de commande » (requête HTTP) au serveur. Celui-ci vérifie (validation des paramètres, authentification des permissions), va chercher le contenu correspondant dans la cuisine, puis rapporte « le plat préparé » (réponse HTTP, généralement au format JSON) au client.

Grâce aux interfaces API, nous avons réalisé une **séparation frontend-backend** claire : le frontend se concentre uniquement sur le rendu des pages, tandis que le backend se consacre exclusivement à la logique métier, au traitement des données et à la sécurité.

---

# 2. Conception de l'architecture du projet et initialisation

Une structure de projet claire est un prérequis pour que les grands modèles puissent écrire du bon code. Avant de demander à l'IA d'écrire du code, vous devez avoir une idée claire de la structure du projet.

## 2.1 Structure de projet API courante

Même en utilisant les grands modèles pour générer du code, vous ne devez jamais tout mettre dans un seul fichier `server.js`. Une architecture backend Node.js maintenable ressemble généralement à ceci :

```text
my-api-project/
├── .env                  # Variables d'environnement sensibles (API Keys, chaîne de connexion base de données)
├── server.js             # Point d'entrée du projet (démarrage du serveur, enregistrement des middlewares globaux)
├── package.json          # Fichier de gestion des dépendances
├── src/
│   ├── routes/           # Couche de routes : définit les chemins URL et les méthodes de requête
│   ├── controllers/      # Couche contrôleurs : traite les paramètres de requête métier, appelle les services et retourne les réponses
│   ├── services/         # Couche services : encapsule les interactions avec la base de données et la logique métier principale
│   └── middlewares/      # Middlewares : authentification, capture globale des erreurs
└── docs/                 # Répertoire de stockage de la documentation API
```

## 2.2 Initialisation du projet avec l'IA

Plutôt que de lancer manuellement `npm init` et d'installer les dépendances une par une, il est plus efficace de fournir ces spécifications sous forme de prompt au grand modèle :

> 🗣️ **Prompt pour le grand modèle (exemple) :**
> « Aidez-moi à monter un projet backend Node.js qui doit pouvoir se connecter à une base de données Supabase, avec une structure claire pour faciliter la maintenance future. »

Après avoir exécuté le code renvoyé par l'IA, vous disposerez d'une application backend avec une ébauche de niveau entreprise sur `localhost:3000`.

---

# 3. Pratique centrale : développement d'interface assisté par grand modèle

C'est la partie la plus importante de ce chapitre. Le code généré par les grands models souffre souvent de « failles logiques » ou de « superficialité », car le contexte fourni par les développeurs est insuffisant. **Les grands modèles ne craignent pas la complexité des besoins, ils craignent l'ambiguïté.**

Prenons l'exemple de l'interface de création pour la table `menu_items` (table des menus) mentionnée dans le [chapitre sur les bases de données](../database-supabase/), pour voir comment rédiger un prompt de haute qualité.

## 3.1 Fournir un contexte complet au grand modèle

Avant de demander à l'IA d'écrire une interface, vous devez toujours fournir la **définition des champs de la base de données (Schema)** et les **contraintes spécifiques**.

> 🗣️ **Modèle de prompt de haute qualité :**
> « Aidez-moi à écrire une interface pour ajouter un élément au menu. Le menu comporte un nom de produit, un prix, une catégorie (burger, accompagnement, boisson) et un statut de disponibilité. Le nom et le prix sont obligatoires, le prix ne peut pas être négatif. Lorsque l'utilisateur saisit des données incorrectes, il faut afficher un message d'erreur. »

## 3.2 Réviser le code généré par le grand modèle

Le code généré par le grand modèle ressemble généralement à ceci, avec une séparation claire des responsabilités :

```javascript
// services/menuService.js
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.createMenuItem = async (menuData) => {
    // Appel du SDK Supabase pour insérer les données dans la table
    const { data, error } = await supabase
        .from('menu_items')
        .insert([menuData])
        .select();

    if (error) throw new Error(`Échec de l'insertion en base de données : ${error.message}`);
    return data[0];
};
```

Vous pouvez constater que le code généré de cette manière est non seulement structurellement raisonnable, mais qu'il prend également en compte l'initialisation de Supabase, la capture d'erreurs et le traitement des exceptions — un monde de différence par rapport au code « spaghetti » obtenu en demandant simplement « écrivez une interface d'ajout ».

---

# 4. Libérer les mains : génération automatique de documentation API

Pour une équipe de développement, une API sans documentation est une boîte noire. Les ingénieurs frontend ne peuvent pas deviner quels paramètres vous attendez, ni prédire la structure de retour. La norme de description d'API la plus répandue dans l'industrie est **OpenAPI (anciennement Swagger)**.

Auparavant, écrire manuellement des documents Swagger au format YAML ou JSON était extrêmement pénible et source d'erreurs. C'est désormais devenu le domaine d'expertise des grands modèles.

Vous pouvez simplement sélectionner le code de vos `routes` et `controllers`, puis le fournir au grand modèle :

> 🗣️ **Prompt pour la génération de documentation :**
> « Aidez-moi à générer une documentation d'interface à partir du code ci-dessus. Précisez la signification de chaque paramètre et les données retournées, pour faciliter l'intégration avec les collègues frontend. »

Dans ce processus, vous pouvez même demander à l'IA de compléter les descriptions des champs (Description) et les données Mock (par exemple `price_cents: 1200` pour 12 euros), réduisant considérablement les coûts de communication.

---

# 5. Filet de sécurité : génération de code de test et collection Postman

Le code est écrit, la documentation est publiée, il reste une dernière étape : vérifier que le code fonctionne réellement.

## 5.1 Générer une configuration de test Postman / Apifox

Dans le développement d'interfaces, nous utilisons généralement un outil visuel comme Postman pour simuler les requêtes HTTP envoyées par le frontend. Sans grand modèle, vous devriez saisir manuellement l'URL, ajouter les en-têtes (headers) un par un et assembler le corps de la requête JSON.

Il vous suffit d'envoyer cette instruction à l'IA :
> « Convertissez cette documentation d'interface dans un format importable par Postman, en incluant des exemples de requêtes normales et d'erreurs. »

Après avoir obtenu le texte JSON, sauvegardez-le sous `menu_api.json` et glissez-le dans Postman : vous disposez instantanément d'un panneau de clics de test prêt à l'emploi.

## 5.2 Écrire des tests unitaires automatisés

Si vous visez une qualité d'ingénierie plus rigoureuse, vous pouvez demander au grand modèle de vous aider à écrire des tests unitaires (Unit Tests) avec un framework comme `Jest`, pour tester les limites de la logique métier principale (par exemple, vérifier si la validation au niveau de la base de données fonctionne lorsqu'un prix négatif est transmis).

---

# 6. Meilleures pratiques essentielles pour les interfaces backend

Même avec l'assistance de l'IA, en tant que « gardien » de l'ensemble du système, vous devez connaître et auditer les principes fondamentaux suivants :

1. **Conventions de nommage RESTful pour les chemins** :
   - Bon design : `GET /api/users` (obtenir la liste des utilisateurs), `POST /api/users` (créer un utilisateur). Les URL doivent représenter des noms de « ressources ».
   - Mauvais design : `POST /api/getUser` ou `POST /api/createUser`. Les verbes doivent être exprimés par les méthodes HTTP (GET/POST/PUT/DELETE).
2. **Codes d'état HTTP standardisés** :
   - 200/201 : Requête réussie / Ressource créée avec succès.
   - 400 : Bad Request, erreur de format des paramètres frontend, champ obligatoire manquant.
   - 401/403 : Unauthorized / Forbidden, utilisateur non connecté ou sans permission.
   - 404 : NotFound, ressource inexistante.
   - 500 : Server Error, erreur de code backend ou base de données hors service. Évitez absolument d'exposer la pile d'erreurs au frontend (risque de sécurité).
3. **Ne jamais faire confiance aux entrées utilisateur** : les entrées frontend peuvent être falsifiées. Toutes les validations de paramètres critiques doivent être refaites dans l'interface backend.

# 7. Résumé

Au cours de ce chapitre, vous avez opéré un véritable changement de perspective : vous n'êtes plus le « dactylographe » bloqué dans la syntaxe et la ponctuation, mais vous êtes devenu un **designer système et architecte en chef**.

Vous avez maîtrisé :
1. La pensée système centrale des **interfaces API et de la séparation frontend-backend**.
2. **Comment fournir du contexte et des concepts de structure en couches** pour améliorer considérablement la qualité du code serveur généré par les grands modèles.
3. La transformation astucieuse des tâches fastidieuses de **rédaction de documentation** et de **construction de cas de test** en tâches automatisées où l'IA excelle.
4. La combinaison avec les connaissances **Supabase** acquises précédemment, pour compléter le flux de données complet de la requête client à la mise à jour de la base de données sous-jacente.

::: tip 💡 Prochaine étape
Une fois votre flux de données et vos services backend prêts, ils ne fonctionnent encore que sur votre ordinateur local « pour votre propre plaisir ». Dans les prochains chapitres, nous apprendrons comment **déployer (Deploy)** ces services durement construits sur un serveur public, afin que votre produit soit accessible aux utilisateurs du monde entier.
:::
