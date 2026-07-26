# Du Vibe Coding au Spec Coding : L'évolution de la programmation IA

> « Le code est une projection avec perte de l'intention. »
> Code is a lossy projection of intent.
> - Sean Grove, OpenAI, AI Engineer World's Fair 2025

## L'idée fondamentale du Spec Coding : Tout est Markdown

Avant d'approfondir le Spec Coding, comprenons d'abord la philosophie sous-jacente de Claude Code : **tout est Markdown**.

Dans la philosophie de conception de Claude Code, les enregistrements de processus, le transfert d'informations et même les conversations avec le modèle peuvent tous être du Markdown :

- **CLAUDE.md** : un document Markdown pour les conventions du projet
- **.claude/rules/** : une collection de fichiers de règles Markdown en couches
- **specs/** : descriptions Markdown des besoins fonctionnels
- **Historique des conversations** : les enregistrements de chat de Claude Code sont eux-mêmes au format Markdown
- **AGENTS.md** : instructions Markdown qui définissent le comportement des agents

C'est exactement le cœur du Spec Coding : **la spécification elle-même est du code**. Quand vous écrivez des besoins, des décisions de conception et des critères d'acceptation en Markdown, vous écrivez déjà du « code » - l'IA lira ce Markdown puis générera la véritable implémentation.

Le résumé de Josh Beckman de la conférence de Grove le capture parfaitement :

> « L'ingénierie logicielle (et la législation et la révision juridique) est la réparation de spécifications. »
> Software engineering (and lawmaking and legal review) is specification repair.

Dans Claude Code, ce processus de « réparation de spécifications » est : **modifier le Markdown -> l'IA lit le Markdown -> générer/modifier le code -> vérifier le résultat**. L'ensemble du flux de travail est piloté par le Markdown.

---

## 1. « The New Code » de Sean Grove : Une conférence qui change votre façon de penser

En 2025, le chercheur d'OpenAI **Sean Grove** a donné une conférence intitulée **« The New Code »** à l'AI Engineer World's Fair, et elle a ébranlé toute la communauté des développeurs. Il a proposé une idée disruptive : **pendant 70 ans nous avons écrit du code pour résoudre des problèmes, mais le code n'est qu'une projection avec perte de l'intention - les spécifications sont le vrai « nouveau code ».**

Cette conférence a donné naissance à un nouveau paradigme de développement : **Spec Coding** - faire des documents de spécification, plutôt que du code, l'artefact central du développement, et laisser l'IA générer du code à partir de la spécification.

En partant de la conférence de Grove, cet article vous aidera à comprendre les idées fondamentales du Spec Coding, à revoir les limites du Vibe Coding et à montrer comment appliquer cette méthodologie dans le développement réel avec Claude Code.

::: info 📚 Ce que vous apprendrez

1. Comprendre les idées clés de la conférence « The New Code » de Sean Grove
2. Maîtriser les concepts fondamentaux et la méthodologie du Spec Coding
3. Reconnaître à la fois la valeur et les limites du Vibe Coding
4. Apprendre comment pratiquer un flux de travail Spec Coding dans Claude Code
5. Maîtriser une stratégie de transition progressive du Vibe Coding au Spec Coding

:::

---

## 1. « The New Code » de Sean Grove : Une conférence qui change votre façon de penser

En 2025, le chercheur d'OpenAI Sean Grove a donné une conférence intitulée **« The New Code »** à l'AI Engineer World's Fair. Cette conférence est largement considérée comme le point de départ intellectuel du mouvement Spec Coding.

Grove a précédemment fondé OneGraph, une entreprise d'outils de développement GraphQL later acquise par Netlify, et travaille maintenant sur le raisonnement d'alignement chez OpenAI - aidant à transformer les intentions de haut niveau en spécifications exécutables et en standards d'évaluation.

### 1.1 Argument central : Le code est une projection avec perte de l'intention

Le concept central de la conférence de Grove peut être résumé en une phrase :

> **Le code est une projection avec perte de l'intention.**
> Code is a lossy projection of intent.

Que signifie cela ? Quand vous avez une idée en tête et la transformez en code, une grande quantité de contexte est perdue en cours de route - **pourquoi** vous avez choisi cette approche, **quels compromis** vous avez envisagés, et **quelles contraintes** importaient. Le code final ne préserve que « comment faire », tout en perdant « pourquoi il faut faire ainsi ».

C'est comme compresser un livre en un tweet - la densité informationnelle chute brutalement, et l'intention originale est fortement dégradée.

### 1.2 L'essence de la programmation est la communication

Grove a proposé une idée simple mais profonde :

> « Si vous pouvez communiquer efficacement, vous pouvez programmer. »
> If you can communicate effectively, you can program.

Il soutient que le travail de codage réel ne représente que **10 à 20 %** du développement. Les autres 80 % sont de la **communication structurée** autour des besoins et des objectifs - comprendre ce que veulent les utilisateurs, s'aligner avec l'équipe sur les solutions, définir les critères d'acceptation et gérer les cas limites.

Cela signifie que le cœur de la capacité de programmation n'est pas la maîtrise de la syntaxe d'un langage particulier, mais la capacité à **transformer une intention vague en descriptions précises**.

### 1.3 Celui qui écrit la spécification est le programmeur

C'est l'idée la plus disruptive de Grove :

> « Celui qui écrit la spécification - que ce soit un PM, un législateur, un ingénieur, un marketeur - est maintenant le programmeur. »
> Whoever writes the spec - be it a PM, a lawmaker, an engineer, a marketer - is now the programmer.

À mesure que l'IA devient de plus en plus capable de transformer les spécifications en code, le **vrai travail de programmation** passe de « écrire du code » à « écrire des spécifications ». Celui qui peut exprimer l'intention avec le plus de précision devient le « programmeur » le plus précieux.

### 1.4 Les spécifications peuvent avoir une chaîne d'outils similaire au code

Grove a souligné que les spécifications peuvent avoir une chaîne d'outils complète comme le code :

> « Les spécifications nous donnent en réalité une chaîne d'outils très similaire, mais ciblée sur les intentions plutôt que sur la syntaxe. »

- **Composition** : les spécifications peuvent être modulaires et composables, comme des modules de code
- **Tests** : les spécifications peuvent intégrer des tests unitaires pour vérifier que le comportement correspond aux attentes
- **Linting** : le langage ambigu dans les spécifications peut être détecté, comme un linter intercepte les problèmes de syntaxe
- **Vérifications de cohérence** : les spécifications entre départements peuvent être vérifiées pour leur cohérence, similaire à un vérificateur de types

### 1.5 OpenAI Model Spec : Preuve vivante

Grove a utilisé le propre document **Model Spec** d'OpenAI comme preuve.

Quand OpenAI a découvert un problème de servilité, ils n'ont pas réentraîné le modèle. Au lieu de cela, ils ont **modifié le document de spécification**. Le changement s'est propagé automatiquement dans le système, et le problème a été corrigé.

Cela prouve un point crucial : **la spécification elle-même peut agir comme du code exécutable**. Changer la spécification équivaut à changer le comportement, sans toucher une seule ligne de code traditionnel.

Le résumé de Josh Beckman de la conférence de Grove le capture parfaitement :

> « L'ingénierie logicielle (et la législation et la révision juridique) est la réparation de spécifications. »
> Software engineering (and lawmaking and legal review) is specification repair.

---

## 2. Spec Coding : La spécification comme code

### 2.1 Qu'est-ce que le Spec Coding

Le Spec Coding, aussi appelé Spec-Driven Development (SDD), est une méthodologie qui traite les **documents de spécification comme l'artefact central du développement**.

L'idée fondamentale est : **écrire la spécification clairement d'abord, puis laisser l'IA générer du code à partir de cette spécification. La spécification est la source de vérité, et le code n'est que l'artefact d'implémentation qui en découle.**

La déclaration classique de Robert C. Martin dans *Clean Code* prend un nouveau sens à l'ère de l'IA :

> « Spécifier les besoins si précisément qu'une machine peut les exécuter, c'est programmer. »
> Specifying requirements so precisely that a machine can execute them is programming.

### 2.2 Comparaison du Vibe Coding et du Spec Coding

| Dimension | Vibe Coding | Spec Coding |
|------|------------|-------------|
| **Approche** | Prompts improvisés, itération aller-retour | Écrire une spécification complète d'abord, puis générer du code |
| **Meilleur pour** | Prototypes, hackathons, exploration | Systèmes de production, collaboration d'équipe, travail entreprise |
| **Qualité du code** | Rapide mais fragile | Structuré, testable, auditable |
| **Taux de réussite du premier passage** | Instable | Vise 95%+ |
| **Réutilisabilité** | Prompts jetables | Les spécifications peuvent être réutilisées entre projets |
| **Sécurité** | Facile d'oublier des choses | Intégrée au niveau de la spécification |
| **Documentation** | Manquante ou toujours en retard | La spécification est la documentation et reste maintenue |
| **Collaboration d'équipe** | Dépend des compétences personnelles de prompting | Spécifications partagées, standards partagés |

Les deux ne sont pas opposés. Comme le souligne Brad Jolicoeur :

> « Les ingénieurs astucieux utiliseront même le vibe coding comme première étape pour générer le brouillon initial d'une spécification. »
> Clever engineers will even use vibe coding as a first step to generate the initial draft of a specification.

### 2.3 La structure de spécification à trois couches du Spec Coding

Des ingénieurs de Red Hat ont résumé un modèle de spécification pratique à trois couches :

**Couche 1 : Spécification fonctionnelle (Quoi)**

Décrire le résultat attendu en langage naturel et répondre à « que devrait-il faire » :

```markdown
## Fonctionnalité d'authentification utilisateur

### User Stories
- En tant que nouvel utilisateur, je veux m'inscrire avec mon email
- En tant qu'utilisateur enregistré, je veux me connecter avec email et mot de passe
- En tant qu'utilisateur ayant oublié mon mot de passe, je veux le réinitialiser par email

### Critères d'acceptation
- Valider le format email et la force du mot de passe lors de l'inscription
- Verrouiller le compte pendant 15 minutes après 5 tentatives de connexion échouées
- Les liens de réinitialisation de mot de passe sont valides 30 minutes
```

**Couche 2 : Spécification indépendante du langage (Comment - Couche architecture)**

Définir les structures de données, les patterns architecturaux et les exigences de sécurité :

```markdown
## Design technique

### Modèle de données
- Table users : id, email, password_hash, created_at, locked_until
- Table sessions : id, user_id, token, expires_at

### Design API
- POST /api/auth/register -> 201 Created
- POST /api/auth/login -> 200 OK + JWT
- POST /api/auth/reset-password -> 202 Accepted

### Exigences de sécurité
- Les mots de passe utilisent bcrypt avec un facteur de coût >= 12
- Le JWT expire en 15 minutes, le refresh token en 7 jours
- Activer le rate limiting sur tous les endpoints
```

**Couche 3 : Spécification spécifique au langage (Comment - Couche implémentation)**

Exigences de version, framework de test et standards de documentation :

```markdown
## Contraintes d'implémentation

### Pile technologique
- Runtime : Node.js 20+
- Framework : Express 5
- ORM : Prisma
- Tests : Vitest

### Conventions de code
- Utiliser le mode strict TypeScript
- Utiliser une classe AppError personnalisée pour la gestion des erreurs
- Tous les endpoints API nécessitent des commentaires JSDoc
```

---

## 3. Pratiquer le Spec Coding dans Claude Code

Une fois la théorie comprise, la question suivante est comment l'appliquer dans Claude Code. La philosophie de conception de Claude Code s'intègre naturellement au Spec Coding - son `CLAUDE.md`, le répertoire Rules et la commande `/plan` sont toutes des formes de développement piloté par les spécifications.

Quand OpenAI construit des projets avec Codex, il utilise un pattern similaire : un fichier `AGENTS.md` sert de spécification pour guider l'agent IA. Leur leçon clé est : **quand l'agent peine, traitez cela comme un signal - identifiez ce qui manque, que ce soit des outils, des garde-fous ou de la documentation, puis ajoutez-le au dépôt**. Cela s'aligne parfaitement avec le Spec Coding : les spécifications sont des artefacts vivants et doivent continuer à évoluer.

La recherche d'Augment Code appuie la même conclusion : **les spécifications exécutables restent précises car les agents IA génèrent du code directement à partir d'elles, créant une fonction de forçage - les spécifications obsolètes produisent des implémentations cassées**. Cela signifie que les spécifications ne se dégradent pas comme la documentation traditionnelle.

### 3.1 Première étape : Utiliser `CLAUDE.md` pour établir les spécifications du projet

`CLAUDE.md` est la « spécification vivante » de votre projet. À chaque démarrage de Claude Code, il lit ce fichier, ce qui équivaut à donner à l'IA un manuel de projet persistant.

Dans le chapitre précédent [Guide essentiel de démarrage rapide de Claude Code](../basics/), nous avons déjà appris à créer `CLAUDE.md`. Dans le contexte du Spec Coding, son rôle devient encore plus important - **ce n'est pas seulement un fichier de configuration, mais le point d'entrée de la spécification du projet**.

Les ingénieurs de LogRocket soulignent que **un contexte solide est crucial pour les agents IA car il prévient les hallucinations et l'inefficacité**. Sans spécifications, un agent IA peut apporter des changements importants et incontrôlés à un projet. `CLAUDE.md` est la première ligne de défense qui fournit ce « contexte solide ».

```markdown
# Spécification du projet e-commerce

## Positionnement du projet
Une plateforme e-commerce SaaS pour les commerçants PME, supportant plusieurs boutiques et plusieurs canaux de paiement.

## Décisions architecturales
- Séparation frontend-backend avec un design API-first
- Architecture backend microservice, avec des services communiquant via une file de messages
- Séparation lecture-écriture de la base de données

## Contraintes fondamentales
- Stocker tous les montants monétaires comme des entiers en centimes pour éviter les problèmes de précision flottante
- La machine à états des commandes doit suivre strictement : en attente de paiement -> payé -> expédié -> terminé
- Les endpoints liés au paiement doivent être idempotents
```

L'équipe d'Aviator a résumé les informations clés que les spécifications devraient capturer - et c'est exactement ce que votre `CLAUDE.md` devrait couvrir :

- les formats d'entrée et de sortie et les types de données
- les règles métier et les cas limites
- les dépendances système et les contraintes
- les exigences de performance et d'évolutivité
- la gestion des erreurs et les exigences de sécurité

### 3.2 Deuxième étape : Utiliser le répertoire Rules pour gérer les spécifications en couches

Au fur et à mesure que votre projet grandit, un seul `CLAUDE.md` ne suffira plus. À ce moment, utilisez le répertoire `.claude/rules/` pour organiser des spécifications en couches.

C'est exactement ce qu'Augment Code appelle l'idée de « spécifications exécutables » : **les spécifications ne sont pas des documents statiques, mais des instructions vivantes consommées directement par les agents IA**. Quand vous divisez les règles dans le répertoire Rules, chaque fichier de règle n'est chargé que lorsque des fichiers associés sont en cours d'édition, ce qui économise des tokens tout en préservant la précision.

Les ingénieurs de Tessl ont constaté que diviser les besoins en documents structurés - avec un PRD définissant « quoi et pourquoi » et des spécifications techniques définissant « comment » - aide à prévenir l'accumulation de confusion par l'IA dans les longues conversations et améliore significativement la cohérence des résultats.

```text
.claude/rules/
├── 00-architecture.md      # Règles d'architecture (global)
├── 01-security.md          # Règles de sécurité (global)
├── 10-api-design.md        # Règles de design API
├── 11-frontend-patterns.md # Règles de patterns frontend
├── 12-database.md          # Règles de base de données
└── 20-testing.md           # Règles de tests
```

Chaque fichier de règle peut spécifier sa portée via le frontmatter :

```markdown
---
globs:
  - "src/api/**/*.ts"
  - "src/services/**/*.ts"
---

# Règles de design API

## Design des routes
- Style RESTful, utiliser des noms pluriels : /api/v1/orders
- Les ressources imbriquées peuvent aller au maximum deux niveaux de profondeur : /api/v1/users/123/orders

## Format de réponse
- Succès : { data, pagination? }
- Erreur : { error: { code, message, details? } }

## À respecter
- Toutes les opérations d'écriture nécessitent une authentification
- Tous les endpoints de liste doivent supporter la pagination
- Les opérations sensibles doivent écrire des logs d'audit
```

Ainsi, quand Claude Code édite des fichiers liés à l'API, il chargera automatiquement cette spécification et s'assurera que le code généré respecte le standard.

### 3.3 Troisième étape : Utiliser `/plan` pour implémenter Specify -> Plan -> Tasks -> Implement

Le flux de travail standard du Spec Coding est une boucle en quatre étapes. Le GitHub Spec Kit le standardise comme Specify -> Plan -> Tasks -> Implement, et la commande `/plan` de Claude Code supporte naturellement ce flux.

L'équipe SpecThis a souligné un principe clé : **définir les limites avant que l'agent s'exécute - savoir ce qui devrait changer avant tout changement de code**. C'est exactement la valeur de `/plan`.

**Étape 1 : Specify**

Écrivez d'abord clairement ce que vous voulez construire. Ne vous précipitez pas dans le code :

```text
/plan
Je dois implémenter une fonctionnalité de remboursement de commande. La spécification est :

Besoins fonctionnels :
- Les utilisateurs peuvent demander un remboursement complet avant l'expédition
- Dans les 7 jours après l'expédition, les utilisateurs peuvent demander un retour et remboursement
- Les remboursements nécessitent l'approbation d'un administrateur

Critères d'acceptation :
- Le montant du remboursement ne peut pas dépasser le montant réellement payé pour la commande
- Machine à états du remboursement : demandé -> approuvé -> en cours de remboursement -> remboursé
- Le stock est restauré après l'achèvement du remboursement
- Journaliser chaque opération tout au long du processus
```

**Étape 2 : Plan**

Claude générera un plan technique basé sur votre spécification :

```text
📋 Plan d'implémentation de la fonctionnalité de remboursement

1. Design du modèle de données
   - Créer une table refunds
   - Ajouter les états liés aux remboursements à la machine à états des commandes

2. Design API
   - POST /api/orders/:id/refund - demander un remboursement
   - PUT /api/refunds/:id/approve - approuver un remboursement
   - GET /api/refunds - liste des remboursements

3. Logique métier
   - Vérifications d'éligibilité au remboursement
   - Calcul du montant du remboursement
   - Logique de restauration du stock

4. Intégrations
   - Se connecter à l'API de remboursement du fournisseur de paiement
   - Envoyer des notifications de remboursement
```

**Étape 3 : Tasks**

Découpez le plan en petites tâches exécutables indépendamment, et donnez à chaque tâche un standard d'achèvement clair.

**Étape 4 : Implement**

Implémentez une tâche à la fois, en validant après chaque achèvement.

### 3.4 Exemple concret : Construire un système de notification utilisateur avec le Spec Coding

Utilisons un exemple complet pour comparer le Vibe Coding et le Spec Coding. Les données d'Orchestrator.dev montrent que dans l'enquête Stack Overflow 2025, 84 % des développeurs utilisent ou prévoient d'utiliser des outils IA, mais seulement 22 % sont satisfaits des résultats, et 46 % estiment que la précision est un problème. Le Spec Coding est exactement la clé pour combler cet écart de satisfaction.

**Approche Vibe Coding :**

```text
Vous : Construisez une fonctionnalité de notification
IA : [Commence immédiatement à écrire du code et génère une simple liste de notifications]

Vous : Elle devrait supporter lu et non lu
IA : [Modifie le code et ajoute un champ read]

Vous : Il faut aussi plusieurs types de notifications
IA : [Change à nouveau et ajoute un champ type]

Vous : Elle devrait aussi envoyer des notifications push sur les téléphones
IA : [Fait une grande réécriture, et la structure précédente ne correspond plus très bien...]
```

Résultat : après quatre tours de modifications, l'architecture a été renversée encore et encore, et le code devient de plus en plus désordonné.

**Approche Spec Coding :**

Écrivez d'abord un document de spécification `specs/notification.md` :

```markdown
# Spécification du système de notification utilisateur

## Besoins fonctionnels
1. Supporter trois canaux : notifications in-app, notifications email et notifications push
2. Types de notification : annonces système, statut de commande, campagnes promotionnelles, alertes de sécurité
3. Les utilisateurs peuvent configurer leurs préférences de notification par canal et type
4. Supporter l'état lu/non lu et le marquage en masse comme lu

## Modèle de données
- Table notifications : id, user_id, type, channel, title, content,
  is_read, created_at
- Table notification_preferences : user_id, type, channel, enabled

## Design API
- GET /api/notifications?type=&is_read= - obtenir la liste des notifications (paginée)
- PUT /api/notifications/:id/read - marquer comme lu
- PUT /api/notifications/read-all - tout marquer comme lu
- GET /api/notification-preferences - obtenir les paramètres de préférence
- PUT /api/notification-preferences - mettre à jour les paramètres de préférence

## Critères d'acceptation
- Le compteur de notifications non lues se met à jour en temps réel
- La liste des notifications supporte le défilement infini
- La latence des notifications push < 3 secondes
- Les changements de préférences prennent effet immédiatement
```

Puis dans Claude Code :

```text
@specs/notification.md
Implémentez le système de notification utilisateur selon cette spécification.
Commencez par le modèle de données, puis implémentez l'API, et enfin construisez les composants frontend.
Faites une pause après chaque module terminé, et je confirmerai avant que vous continuiez.
```

Résultat : ça se pose proprement en un seul passage, avec une architecture claire et pas besoin de démonter et reconstruire répétitivement.

### 3.5 Renforcer le Spec Coding avec les Superpowers

Dans le chapitre précédent [Superpowers pour le développement de niveau ingénierie](../superpowers/), nous avons découvert le système de compétences Superpowers. Le Spec Coding et les Superpowers sont des compagnons naturels :

| Étape du Spec Coding | Compétence Superpowers correspondante |
|------------------|---------------------|
| Définir la spécification | `brainstorming` - utiliser le questionnement socratique pour clarifier les besoins |
| Planification technique | `writing-plans` - découper la spécification en petites tâches |
| Implémentation incrémentale | `test-driven-development` - TDD rouge-vert-réfacter |
| Vérification qualité | `code-review` + `verification-before-completion` |

**Exemple d'utilisation combinée :**

```text
@specs/notification.md
Implémentez le système de notification selon cette spécification en utilisant TDD,
et aidez-moi à réviser le code une fois terminé
```

Cette seule instruction active à la fois le flux de travail Spec Coding et les compétences Superpowers comme TDD et Code Review, formant un processus de développement complet de niveau ingénierie.

### 3.6 Contrôle de version et évolution continue des spécifications

Le Vibe Coding Substack a proposé un point de vue important : **Les spécifications sont maintenant du code**. Si les spécifications sont du code, alors elles devraient être gérées comme du code :

- **Contrôle de version** : garder les fichiers de spécification dans Git et les committer avec le code
- **Suivi des changements** : chaque modification de la spécification a un enregistrement de commit pour savoir qui a changé quoi et pourquoi
- **Revue de code** : les changements de spécifications devraient aussi passer par une revue PR pour que l'équipe reste alignée
- **Intégration CI** : les changements de spécifications déclenchent des tests automatisés pour vérifier si l'implémentation est toujours conforme à la spécification

Dans Claude Code, cela signifie que votre `CLAUDE.md`, `.claude/rules/` et le répertoire `specs/` devraient tous être sous contrôle de version. L'expérience de Robomotion est que **versionner les spécifications ensemble avec les implémentations prévient la dérive et garde tout auditable**.

La pratique d'Harness Engineering d'OpenAI confirme également cela : leur fichier `AGENTS.md` est lui-même écrit par Codex et est continuellement mis à jour au fur et à mesure que le projet évolue. Quand l'agent rencontre des difficultés, la correction n'est pas de changer le code directement, mais de **faire mettre à jour la spécification par Codex lui-même** - formant une boucle d'auto-guérison pour les spécifications.

---

## 4. Une stratégie hybride : Passer progressivement du Vibe au Spec

Le consensus de l'industrie n'est pas « abandonner le Vibe Coding », mais plutôt **choisir la bonne approche pour le bon scénario**.

### 4.1 Quand utiliser le Vibe Coding

- Valider si une idée est réalisable, avec un prototype construit en 30 minutes
- Explorer des technologies ou frameworks inconnus
- Hackathons ou démos internes
- Scripts ou outils à usage unique

### 4.2 Quand utiliser le Spec Coding

- Développement de fonctionnalités de production
- Projets collaboratifs multi-personnes
- Du code qui nécessitera une maintenance à long terme
- Domaines sensibles comme la sécurité, les paiements ou les données
- Design d'API et intégration système

### 4.3 Un flux de travail progressif recommandé

**Étape 1 : Exploration Vibe**

Utilisez le Vibe Coding pour valider l'idée rapidement. N'écrivez pas encore de spécifications, et ne vous inquiétez pas de la qualité du code :

```text
Construisez une popup de notification simple pour voir comment ça se sent
```

**Étape 2 : Raffiner la spécification**

Une fois la faisabilité confirmée, organisez ce que vous avez appris pendant l'exploration en une spécification. Vous pouvez même demander à l'IA d'aider :

```text
Basé sur le prototype de notification que nous venons de construire,
aidez-moi à organiser un document de spécification fonctionnelle formel,
incluant le modèle de données, le design API et les critères d'acceptation
```

**Étape 3 : Reconstruire avec Spec**

Basé sur cette spécification, ré-implémentez la version de production en utilisant le Spec Coding :

```text
@specs/notification.md
Implémentez cela depuis zéro selon la spécification, et ne vous référez pas au code du prototype précédent
```

L'avantage de ce flux de travail est clair : **utiliser la vitesse du Vibe Coding pour valider la direction, et la qualité du Spec Coding pour livrer le produit**.

Robomotion l'a bien résumé :

> « La spécification est la source de vérité. Le résultat généré par l'IA est l'implémentation brouillon. La validation n'est pas optionnelle. »
> The spec is the source of truth. The AI generated output is the draft implementation. Validation is not optional.

---

## 5. Questions fréquemment posées

### Q1 : Le Spec Coding ne semble-t-il pas trop lent ?

Écrire des spécifications nécessite effectivement un investissement initial. Mais l'équipe de Greg Ceccarelli a utilisé le Spec Coding pour livrer un produit macOS complet avec **trois personnes en quatre semaines** - quelque chose de presque impossible en développement traditionnel.

Le temps passé à écrire des spécifications tôt sera récupéré plus tard grâce à moins de retravail, moins de bugs et des coûts de communication réduits.

### Q2 : Quelle devrait être la précision d'une spécification ?

La suggestion de Robomotion est : **une spécification de haute qualité peut ne faire qu'une page**. Ce qui compte est si elle répond à ces huit questions :

1. Qu'est-ce que nous automatisons ?
2. Quelle est l'entrée ?
3. Quelle est la sortie ?
4. Quelles sont les contraintes ?
5. Quels sont les modes de défaillance ?
6. Quelles sont les exigences de sécurité ?
7. Quelles sont les exigences de performance ?
8. Quels tests prouvent que cela fonctionne ?

### Q3 : Que faire si l'IA ne fait qu'exactement ce que dit la spécification et rate des fonctionnalités « évidentes » ?

C'est effectivement l'une des limites du Spec Coding. Les retours des utilisateurs de GitHub Spec Kit sont que l'IA fera **« exactement et uniquement »** ce qui est écrit dans la spécification.

La solution est d'ajouter une section « exigences non fonctionnelles » à la spécification et d'y lister les attentes courantes, comme la gestion des erreurs, la journalisation et l'accessibilité. Ou de définir des règles globales dans `CLAUDE.md`.

### Q4 : Les petits projets ont-ils aussi besoin du Spec Coding ?

Non. Le Spec Coding est le mieux adapté à :

- les projets de niveau production
- les projets collaboratifs en équipe
- les projets nécessitant une maintenance à long terme

Pour les prototypes rapides, les scripts jetables et les expériences d'apprentissage, le Vibe Coding est plus approprié.

### Q5 : Comment faire accepter le Spec Coding à une équipe ?

Commencez avec une petite fonctionnalité comme pilote. Laissez l'équipe voir comment le Spec Coding réduit le retravail et améliore le taux de réussite du premier passage. L'enquête Stack Overflow 2025 montre que 84 % des développeurs utilisent ou prévoient d'utiliser des outils IA, mais seulement 22 % sont satisfaits des résultats - le Spec Coding est exactement la clé pour améliorer cette satisfaction.

---

## 6. Résumé

Passer du Vibe Coding au Spec Coding n'est pas une révolution. C'est une évolution.

Sean Grove l'a dit très clairement dans « The New Code » : **pendant 70 ans, nous avons écrit du code pour résoudre des problèmes ; maintenant nous devrions écrire des spécifications pour générer du code**. Le code est une projection avec perte de l'intention, tandis que les spécifications peuvent capturer pleinement l'intention, le contexte et les contraintes.

Pour les développeurs utilisant Claude Code, ce changement est déjà en cours :

- le `CLAUDE.md` que vous écrivez est votre spécification de projet
- le répertoire Rules que vous configurez est votre système de spécifications en couches
- la planification que vous faites avec `/plan` est le flux Specify -> Plan -> Tasks
- combiner TDD et Code Review des Superpowers vous donne un flux de travail Spec Coding complet

**Points clés à retenir :**

- Le Vibe Coding est adapté à l'exploration et aux prototypes, tandis que le Spec Coding est adapté à la production et à la collaboration
- La spécification est la source de vérité, et le code est un artefact d'implémentation produit à partir d'elle
- La capacité à écrire des spécifications = capacité de programmation, et la capacité de communication compte plus que la capacité syntaxique
- Commencez petit : juste en écrivant bien `CLAUDE.md`, vous avez déjà fait le premier pas dans le Spec Coding

::: tip 💡 Prochaine étape
Dans le prochain chapitre, nous apprendrons comment utiliser la capacité Agent Teams de Claude Code pour que plusieurs instances IA puissent collaborer comme une vraie équipe de développement.
:::

---

## Références

### Liées à la conférence « The New Code » de Sean Grove

- [Code is just a lossy projection of intent — The Decoder](https://the-decoder.com/code-is-just-a-lossy-projection-of-intent-according-to-openai-researcher-sean-grove/)
- [The End of Coding? How Specifications Are Becoming the New Source Code — Implicator](https://www.implicator.ai/the-end-of-coding-how-specifications-are-becoming-the-new-source-code/)
- [OpenAI: Intent, Not Code, Drives Future Software Development — AI Tech Suite](https://www.aitechsuite.com/ai-news/openai-intent-not-code-drives-future-software-development)
- [Note on The New Code — Josh Beckman](https://www.joshbeckman.org/notes/914234100)
- [Full Transcript of "The New Code"](https://lawwu.github.io/transcripts/8rABwKRsec4.html)

### Méthodologie Spec Coding

- [How spec-driven development improves AI coding quality — Red Hat](https://developers.redhat.com/articles/2025/10/22/how-spec-driven-development-improves-ai-coding-quality)
- [Spec-Driven Development with AI: Complete 2025 Guide — Dplooy](https://www.dplooy.com/blog/spec-driven-development-with-ai-complete-2025-guide)
- [Spec-Driven Development: Building Production-Ready Software with AI — Orchestrator.dev](https://orchestrator.dev/blog/2025-12-16-spec_driven_dev_article)
- [Agents Code but the Problem of Clear Specification Remains — Greg Ceccarelli](https://www.gregceccarelli.com/writing/beyond-code-centric)

### Vibe Coding vs. Spec Coding

- [Vibe Coding vs Spec Driven — Cosmo Edge](https://cosmo-edge.com/vibe-coding-vs-spec-driven-ai-development/)
- [Master AI in Software Engineering: Vibe vs. Spec Coding — Brad Jolicoeur](https://bradjolicoeur.com/article/ai-software-engineering-vibe-spec-prompting)
- [From Vibe Coding to Spec-Driven Development — Tessl](https://tessl.io/blog/from-vibe-coding-to-spec-driven-development/)
- [Spec First Approach for Enterprise — Robomotion](https://robomotion.io/blog/spec-first-approach-the-way-to-adapt-vibe-coding-for-enterprise-work)

### Outils et pratiques

- [GitHub Spec Kit vs Vibe Coding — Ossels](https://ossels.ai/github-spec-kit-spec-driven-development/)
- [A Spec-First Workflow for Agentic AI — LogRocket](https://blog.logrocket.com/spec-first-workflow-agentic-ai/)
- [Specs Are Now Code — The Vibe Coding Substack](https://thevibecoding.substack.com/p/specs-are-now-code)
- [Harness Engineering — Martin Fowler](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html)
- [Spec-Driven Development & AI Agents Explained — Augment Code](https://www.augmentcode.com/guides/spec-driven-development-ai-agents-explained)
- [Spec-Driven Development: The Key to Scalable AI Agents — Aviator](https://www.aviator.co/blog/spec-driven-development/)
