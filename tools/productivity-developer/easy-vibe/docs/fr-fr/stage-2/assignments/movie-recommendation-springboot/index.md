# Développement pratique d'un système de recommandation de films avec Spring Boot

## Aperçu

Ce projet pratique vous demande de réaliser, à partir d'un véritable PRD, un site web de films avec capacités de recommandation en utilisant Spring Boot. Le défi principal de ce projet est qu'il ne s'agit pas d'un simple CRUD, mais qu'il vous amène à réfléchir à la manière dont les comportements des utilisateurs influencent les résultats de recommandation et à rendre ces recommandations explicables.

Il s'agit du projet pratique synthétique de l'Étape 2. Vous découvrirez pour la première fois le modèle de développement de produits de type « contenu + comportement + recommandation », très courant dans le e-commerce, les plateformes de contenu et les flux personnalisés.

## Prérequis

Avant de commencer ce projet, vous devriez maîtriser les éléments suivants :

- Conception de pages frontales et utilisation de bibliothèques de composants ([Conception UI](../../frontend/ui-design/), [Bibliothèque de composants moderne](../../frontend/modern-component-library/))
- Conception et développement d'API backend ([Écriture de code d'interface](../../backend/ai-interface-code/))
- Bases de données et Supabase ([Des bases de données à Supabase](../../backend/database-supabase/))
- Flux de travail Git et déploiement ([Git et GitHub](../../backend/git-workflow/), [Déployer une application web](../../backend/zeabur-deployment/))

## Objectifs d'apprentissage

Après avoir terminé ce projet, vous serez capable de :

1. Lire un PRD et en extraire une liste de tâches de développement pour un système de recommandation
2. Utiliser Spring Boot pour mettre en place un projet backend et implémenter des API RESTful
3. Concevoir le flux de données complet « comportement utilisateur -> recommandation »
4. Implémenter une logique de recommandation explicable
5. Effectuer des tests de bout en bout et livrer un prototype de produit démontrable

## Présentation du projet

Le produit que vous allez construire est un site web de films avec capacités de recommandation :

| Fonctionnalité | Description |
|------|------|
| **Navigation et recherche** | Les utilisateurs peuvent parcourir et rechercher des films |
| **Notes et favoris** | Les utilisateurs peuvent noter des films et les ajouter aux favoris |
| **Recommandations personnalisées** | Le système génère des recommandations basées sur le comportement des utilisateurs |
| **Back-office** | Les administrateurs gèrent les données des films et consultent l'efficacité des recommandations |

::: tip Accès au PRD
Le document d'exigences de ce projet se trouve sur GitHub : [Voir le PRD](https://github.com/datawhalechina/easy-vibe/blob/main/docs/fr-fr/stage-2/assignments/movie-recommendation-springboot/PRD.md)
:::

<div style="margin: 32px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Analyse des besoins', description: 'Lire le PRD, clarifier la stratégie de recommandation, les données comportementales et le périmètre du back-office' },
      { title: 'Construction du squelette', description: 'Générer avec l\'IA le squelette des pages liste, détails, recommandations et back-office' },
      { title: 'Développement itératif', description: 'Compléter la logique de recommandation, l\'enregistrement des comportements et la gestion du back-office' },
      { title: 'Tests et mise en ligne', description: 'Tests de bout en bout, déploiement et préparation de la démonstration' }
    ]" />
  </ClientOnly>
</div>

## Partie 1 : Analyse des besoins

### 1.1 Lire le PRD

Ouvrez le document PRD et répondez aux questions suivantes :

- Quels comportements utilisateur sont suivis (notes, favoris, historique de visualisation) ?
- Quelle est la stratégie de recommandation (filtrage collaboratif, basée sur le contenu, hybride) ?
- Comment les recommandations sont-elles rendues explicables pour l'utilisateur ?
- Quelles sont les fonctionnalités du MVP ?

::: warning
Si les questions ci-dessus n'ont pas de réponse claire, ne commencez pas à coder. Une mauvaise compréhension des besoins est la cause la plus fréquente de retour en arrière.
:::

## Partie 2 : Construction du squelette du projet

### 2.1 Générer les pages frontales

Prompt de référence :

```text
Veuillez générer, sur la base du PRD actuel, le squelette frontend d'un site web de films avec système de recommandation.

Exigences :
1. Page d'accueil avec films populaires et recommandations personnalisées
2. Page de liste de films avec recherche et filtrage
3. Page de détail d'un film avec notes et avis
4. Page de profil avec favoris et historique
5. Back-office pour la gestion des films et le suivi des recommandations
6. Générer d'abord uniquement la structure des pages et des données fictives
```

### 2.2 Vérifier la structure des pages

- [ ] La page d'accueil affiche-t-elle les recommandations ?
- [ ] La page de détail permet-elle de noter et d'ajouter aux favoris ?
- [ ] Le back-office permet-il la gestion des films ?

## Partie 3 : Développement itératif

### 3.1 Progresser par module

1. **Gestion des films** : CRUD des films, recherche et filtrage
2. **Notes et favoris** : Les utilisateurs peuvent noter et sauvegarder des films
3. **Suivi des comportements** : Enregistrement des notes, favoris et historique de navigation
4. **Logique de recommandation** : Algorithme de recommandation basé sur les comportements
5. **Explicabilité** : Afficher pourquoi un film est recommandé (ex: « Recommandé car vous avez aimé X »)
6. **Back-office** : Gestion des films et suivi de l'efficacité des recommandations

### 3.2 Modèle de données de référence

Tables principales :

- `movies` : id, title, genre, description, release_year, rating_avg
- `user_ratings` : id, user_id, movie_id, rating, created_at
- `user_favorites` : id, user_id, movie_id, created_at
- `user_views` : id, user_id, movie_id, viewed_at
- `recommendations` : id, user_id, movie_id, reason, score, created_at

## Partie 4 : Tests et mise en ligne

### 4.1 Tests de bout en bout

- Parcourir les films -> Noter un film -> Voir les recommandations mises à jour
- Ajouter aux favoris -> Vérifier que les recommandations en tiennent compte

### 4.2 Déploiement

- Déployer le frontend sur Vercel / Zeabur
- Déployer le backend Spring Boot sur Zeabur / Railway / Render
- Utiliser Supabase ou PostgreSQL comme base de données

## Livrables

- [ ] Un lien de démonstration en ligne accessible
- [ ] Un lien vers le dépôt de code source (avec README)
- [ ] Le document PRD
- [ ] Des captures d'écran des pages principales
- [ ] Une vidéo de démonstration de 60 secondes

## Critères d'évaluation

| Dimension | Exigences de base | Exigences avancées |
|------|---------|---------|
| Films | Navigation, recherche, détails fonctionnent | Les notes et favoris sont sauvegardés |
| Recommandation | Des recommandations sont affichées | Elles sont basées sur le comportement et sont explicables |
| Technique | Spring Boot fonctionne avec la base de données | Gestion des erreurs et optimisation des performances |
| Livraison | Le projet peut être exécuté et déployé | README clair et vidéo de démonstration |

## Références

- [Conception UI](../../frontend/ui-design/)
- [Bibliothèque de composants moderne](../../frontend/modern-component-library/)
- [Des bases de données à Supabase](../../backend/database-supabase/)
- [Écriture de code d'interface assistée par IA](../../backend/ai-interface-code/)
- [Flux de travail Git et GitHub](../../backend/git-workflow/)
- [Comment déployer une application web](../../backend/zeabur-deployment/)
