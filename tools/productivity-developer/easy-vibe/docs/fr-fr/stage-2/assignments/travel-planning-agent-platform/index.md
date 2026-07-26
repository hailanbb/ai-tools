# Développement pratique d'une plateforme Agent de planification de voyages intelligente

## Aperçu

Ce projet pratique vous demande de réaliser, à partir d'un véritable PRD, une plateforme Agent de planification de voyages intelligente. Vous construirez un produit IA complet capable de recevoir des entrées structurées, de générer des itinéraires journaliers et de prendre en charge la sauvegarde et la réutilisation. Il ne s'agit pas d'un simple chatbot, mais d'un produit doté de capacités de gestion de tâches.

Il s'agit du projet pratique synthétique de l'Étape 2. Le défi principal de ce projet est de faire en sorte que l'IA génère des itinéraires structurés et exploitables, et non un long bloc de texte non manipulable.

## Prérequis

Avant de commencer ce projet, vous devriez maîtriser les éléments suivants :

- Conception de pages frontales et utilisation de bibliothèques de composants ([Conception UI](../../frontend/ui-design/), [Bibliothèque de composants moderne](../../frontend/modern-component-library/))
- Conception et développement d'API backend ([Écriture de code d'interface](../../backend/ai-interface-code/))
- Bases de données et Supabase ([Des bases de données à Supabase](../../backend/database-supabase/))
- Flux de travail Git et déploiement ([Git et GitHub](../../backend/git-workflow/), [Déployer une application web](../../backend/zeabur-deployment/))

## Objectifs d'apprentissage

Après avoir terminé ce projet, vous serez capable de :

1. Lire un PRD et en extraire une liste de tâches de développement pour une plateforme Agent
2. Concevoir des formulaires d'entrée structurés et des formats de sortie structurés
3. Implémenter une couche d'orchestration d'agents pour gérer les entrées utilisateur, les appels de modèles et le stockage des résultats
4. Construire un cycle métier complet « génération -> sauvegarde -> réutilisation »
5. Effectuer des tests de bout en bout et livrer un prototype de produit IA démontrable

## Présentation du projet

Le produit que vous allez construire est une plateforme Agent de planification de voyages intelligente :

| Fonctionnalité | Description |
|------|------|
| **Planification d'itinéraire** | L'utilisateur saisit le lieu de départ, la destination, les dates, le budget et les préférences ; le système génère un itinéraire journalier |
| **Répartition du budget** | Les résultats de l'itinéraire incluent la répartition du budget et des suggestions |
| **Gestion de l'historique** | L'utilisateur peut sauvegarder ses plans historiques, les régénérer et les exporter |
| **Back-office** | L'administrateur consulte les destinations populaires, les tâches échouées et les retours utilisateurs |

::: tip Accès au PRD
Le document d'exigences de ce projet se trouve sur GitHub : [Voir le PRD](https://github.com/datawhalechina/easy-vibe/blob/main/docs/fr-fr/stage-2/assignments/travel-planning-agent-platform/PRD.md)
:::

<div style="margin: 32px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Analyse des besoins', description: 'Lire le PRD, clarifier les pages, l\'orchestration des agents et la structure d\'entrée/sortie' },
      { title: 'Construction du squelette', description: 'Générer avec l\'IA le squelette des pages accueil, planification, historique et back-office' },
      { title: 'Développement itératif', description: 'Compléter module par module : sortie structurée, statut des tâches, gestion de l\'historique' },
      { title: 'Tests et mise en ligne', description: 'Tests de bout en bout, déploiement et préparation de la démonstration' }
    ]" />
  </ClientOnly>
</div>

## Partie 1 : Analyse des besoins

### 1.1 Lire le PRD

Ouvrez le document PRD et répondez aux questions suivantes :

- Quels champs le formulaire d'entrée structuré doit-il contenir ?
- Quel est le format de sortie attendu pour l'itinéraire généré ?
- Comment les tâches sont-elles suivies (statuts, progression) ?
- Quelles sont les fonctionnalités du MVP et celles qui peuvent attendre ?

::: warning
Si les questions ci-dessus n'ont pas de réponse claire, ne commencez pas à coder. Une mauvaise compréhension des besoins est la cause la plus fréquente de retour en arrière.
:::

## Partie 2 : Construction du squelette du projet

### 2.1 Générer les pages frontales

Prompt de référence :

```text
Veuillez générer, sur la base du PRD actuel, le squelette frontend d'une plateforme de planification de voyages intelligente.

Exigences :
1. Page d'accueil avec formulaire de saisie structuré (départ, destination, dates, budget, préférences)
2. Page de planification affichant l'itinéraire généré jour par jour
3. Page d'historique des plans sauvegardés
4. Page de back-office pour les administrateurs
5. Générer d'abord uniquement la structure des pages et des données fictives
6. Style moderne et inspirant pour un produit de voyage
```

### 2.2 Vérifier la structure des pages

- [ ] Le formulaire d'entrée est-il complet et structuré ?
- [ ] L'affichage de l'itinéraire est-il clair et organisé par jour ?
- [ ] L'historique est-il consultable et réutilisable ?

## Partie 3 : Développement itératif

### 3.1 Progresser par module

1. **Formulaire d'entrée** : Champs structurés avec validation
2. **Orchestration de l'agent** : Appel au modèle avec prompt structuré, parsing de la sortie
3. **Affichage de l'itinéraire** : Présentation jour par jour avec budget et suggestions
4. **Sauvegarde et historique** : Stockage en base de données, listage et réutilisation
5. **Back-office** : Statistiques sur les destinations populaires et les échecs

### 3.2 Structure de sortie de référence

L'agent doit générer un itinéraire structuré :

```json
{
  "days": [
    {
      "day": 1,
      "activities": [
        {"time": "09:00", "activity": "Visite du musée", "cost": 15, "duration": "2h"},
        {"time": "12:00", "activity": "Déjeuner au marché local", "cost": 20, "duration": "1h"}
      ],
      "daily_budget": 80,
      "notes": "Prévoir des chaussures confortables"
    }
  ],
  "total_budget": 500,
  "currency": "EUR"
}
```

## Partie 4 : Tests et mise en ligne

### 4.1 Tests de bout en bout

- Soumettre un plan -> Consulter l'itinéraire généré -> Sauvegarder -> Retrouver dans l'historique
- Régénérer un plan sauvegardé avec des paramètres modifiés

### 4.2 Déploiement

- Déployer le frontend sur Vercel / Zeabur
- Déployer le backend sur Zeabur / Railway / Render
- Utiliser Supabase comme base de données

## Livrables

- [ ] Un lien de démonstration en ligne accessible
- [ ] Un lien vers le dépôt de code source (avec README)
- [ ] Le document PRD
- [ ] Des captures d'écran des pages principales
- [ ] Une vidéo de démonstration de 60 secondes

## Critères d'évaluation

| Dimension | Exigences de base | Exigences avancées |
|------|---------|---------|
| Planification | L'utilisateur peut soumettre un plan et voir un itinéraire | L'itinéraire est structuré avec budget et suggestions |
| Historique | Les plans peuvent être sauvegardés | Les plans sauvegardés peuvent être régénérés et exportés |
| Technique | Le backend appelle le modèle et stocke les résultats | Gestion des erreurs, états de chargement et suivi des tâches |
| Livraison | Le projet peut être exécuté et déployé | README clair et vidéo de démonstration |

## Références

- [Conception UI](../../frontend/ui-design/)
- [Bibliothèque de composants moderne](../../frontend/modern-component-library/)
- [Des bases de données à Supabase](../../backend/database-supabase/)
- [Écriture de code d'interface assistée par IA](../../backend/ai-interface-code/)
- [Flux de travail Git et GitHub](../../backend/git-workflow/)
- [Comment déployer une application web](../../backend/zeabur-deployment/)
