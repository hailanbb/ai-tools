---
title: "Inspiration pour scénarios de consommation B2C"
description: "Ce document recense les directions créatives d'application des grands modèles LLM dans les scénarios de consommation B2C, couvrant des domaines tels que le style de vie, l'accompagnement émotionnel, les loisirs, le développement personnel, les interactions sociales, etc., afin de servir de référence aux développeurs d'applications IA grand public."
---

<script setup>
import { computed, ref } from 'vue'

const duration = 'Environ <strong>4 heures</strong>'

const vibePoint = ref('')
const feeling = ref('')

// Pool de thèmes pour chaque scénario - accent sur les sensations, l'ambiance, les suggestions psychologiques
const topicPool = {
  'lifestyle': [
    { title: 'Assistant de réveil rituel matinal', desc: 'Générer un rituel matinal personnalisé selon la météo, l\'agenda et l\'humeur, pour bien commencer chaque journée' },
    { title: 'Créateur d\'ambiance pour célibataires', desc: 'Concevoir des solutions d\'ambiance intérieure pour les personnes vivant seules : éclairage, musique, diffuseur d\'huiles essentielles' },
    { title: 'Générateur de programme cocooning week-end', desc: 'Recommander la combinaison parfaite selon l\'humeur du moment : film + snacks + décoration d\'ambiance' },
    { title: 'Radio apaisante du soir', desc: 'Générer des histoires douces, des guidages de méditation, une radio personnelle pour s\'endormir' },
    { title: 'Chasseur d\'inspiration esthétique du quotidien', desc: 'Découvrir la beauté dans les petites choses du quotidien, générer des suggestions esthétiques et des guides rituels' }
  ],
  'emotion': [
    { title: 'Confident nocturne', desc: 'Réceptacle émotionnel disponible 24h/24, accueillant sans jugement toutes les confidences' },
    { title: 'Accompagnateur de guérison post-rupture', desc: 'Offrir une présence douce, des conseils de guérison et un exutoire émotionnel pendant les moments difficiles' },
    { title: 'Coach de respiration anti-anxiété', desc: 'Percevoir l\'anxiété, guider des exercices de respiration et de méditation en pleine conscience' },
    { title: 'Mentor de reconstruction de la confiance en soi', desc: 'Aider à reconstruire l\'estime de soi et le sentiment de valeur grâce à des dialogues positifs et des suggestions psychologiques' },
    { title: 'Analyse intelligente du journal émotionnel', desc: 'Analyser le journal émotionnel, découvrir les schémas émotionnels, offrir des perspectives chaleureuses et des conseils' }
  ],
  'entertainment': [
    { title: 'Maître du jeu immersif (murder mystery)', desc: 'Jouer le rôle du maître du jeu, créer une ambiance mystérieuse, faire avancer l\'intrigue' },
    { title: 'NPC sensible dans un monde ouvert', desc: 'Des NPC avec une vraie personnalité, qui se souviennent de l\'histoire du joueur et créent des liens émotionnels authentiques' },
    { title: 'Génération de contenu podcast personnalisé', desc: 'Générer un podcast exclusif selon les centres d\'intérêt, aussi naturel qu\'une conversation entre amis' },
    { title: 'Équipe d\'ambiance pour concert virtuel', desc: 'Créer une atmosphère live pour les concerts en ligne : interactions en temps réel, soutien, rendu d\'ambiance' },
    { title: 'Partenaire de co-création de fiction interactive', desc: 'Co-créer une histoire avec le lecteur, chaque choix influence la direction du monde narratif' }
  ],
  'growth': [
    { title: 'Témoin de croissance personnelle', desc: 'Enregistrer les trajectoires de développement, offrir encouragements et rétrospectives aux moments clés' },
    { title: 'Coach ludifié de formation d\'habitudes', desc: 'Transformer la formation d\'habitudes ennuyeuses en une aventure ludique' },
    { title: 'Appariement de partenaires d\'apprentissage', desc: 'Trouver des partenaires d\'apprentissage partageant les mêmes centres d\'intérêt, s\'encourager mutuellement et partager les progrès' },
    { title: 'Découvreur de petites joies quotidiennes', desc: 'Aider à découvrir les petites beautés de la vie, cultiver la gratitude et un état d\'esprit positif' },
    { title: 'Simulateur d\'expériences de vie', desc: 'Simuler différents choix de vie, explorer les possibilités d\'une réalité parallèle' }
  ],
  'social': [
    { title: 'Générateur de sujets brise-glace', desc: 'Fournir des sujets intéressants lors d\'événements sociaux, dissiper la gêne et rapprocher les gens' },
    { title: 'Styliste d\'ambiance pour publications sociales', desc: 'Générer des textes élégants pour les réseaux sociaux à partir de photos et de l\'humeur' },
    { title: 'Planificateur d\'ambiance pour rendez-vous', desc: 'Concevoir un plan d\'ambiance complet pour les rendez-vous : lieu, sujets de conversation et surprises' },
    { title: 'Animateur de réunions à distance', desc: 'Animer les réunions en ligne, organiser des jeux et guider les interactions' },
    { title: 'Assistant de gestion d\'énergie sociale', desc: 'Aider les introvertis à gérer leur énergie sociale et à trouver un rythme social confortable' }
  ],
  'creative': [
    { title: 'Kit d\'urgence anti-panne d\'inspiration', desc: 'Fournir des étincelles d\'inspiration inattendues en cas de blocage créatif' },
    { title: 'Guide d\'exploration du style personnel', desc: 'Aider à découvrir un style personnel unique, du vestimentaire à l\'expression' },
    { title: 'Consultant esthétique pour journal et bulletins', desc: 'Fournir des suggestions esthétiques de mise en page, couleurs et contenu créatif' },
    { title: 'Guide d\'ambiance photographique', desc: 'Fournir des conseils de photographie et de retouche selon le contexte et l\'ambiance souhaitée' },
    { title: 'Adaptateur musique-humeur', desc: 'Recommander la combinaison musicale parfaite selon l\'humeur et le contexte du moment' }
  ],
  'travel': [
    { title: 'Guide d\'exploration urbaine à pied', desc: 'Explorer la ville comme un local, découvrir des lieux cachés et authentiques' },
    { title: 'Génération de journal de voyage émotionnel', desc: 'Transformer les photos et sentiments de voyage en un récit de voyage poétique et des souvenirs' },
    { title: 'Compagnon pour voyageurs solitaires', desc: 'Offrir compagnie, conseils et sentiment de sécurité aux voyageurs solo' },
    { title: 'Aperçu d\'ambiance de destination', desc: 'Vivre une expérience immersive de la destination avant le départ, se mettre dans l\'ambiance' },
    { title: 'Guide d\'ambiance photographique de voyage', desc: 'Guider pour prendre des photos de voyage pleines d\'histoires selon le contexte et la lumière' }
  ],
  'health': [
    { title: 'Réveilleur de motivation sportive', desc: 'Offrir juste ce qu\'il faut d\'encouragement et de motivation quand l\'envie de bouger n\'est pas là' },
    { title: 'Cuisine inspiration alimentation saine', desc: 'Générer des recettes saines réconfortantes selon l\'humeur et les ingrédients disponibles' },
    { title: 'Optimisateur d\'ambiance pour la qualité du sommeil', desc: 'Créer une ambiance de sommeil optimale de l\'environnement au psychologique' },
    { title: 'Guide de perception corporelle', desc: 'Guider l\'attention sur les signaux du corps, établir la connexion corps-esprit' },
    { title: 'Assistant rappel de self-care', desc: 'Rappeler de s\'arrêter dans l\'agitation et de prendre soin de soi' }
  ],
  'learning': [
    { title: 'Guide ludifié d\'exploration des savoirs', desc: 'Transformer l\'apprentissage de connaissances ennuyeuses en une aventure d\'exploration amusante' },
    { title: 'Partenaire de scénarios d\'apprentissage linguistique', desc: 'Jouer différents rôles, acquérir naturellement la langue dans des dialogues situationnels' },
    { title: 'Assistant de satisfaction de la curiosité', desc: 'Répondre à toutes sortes d\'idées farfelues, satisfaire la curiosité pour le monde' },
    { title: 'Stimulateur d\'inspiration pour notes de lecture', desc: 'Aider à organiser les réflexions de lecture, découvrir de nouveaux angles de pensée' },
    { title: 'Créateur d\'ambiance pour le partage de connaissances', desc: 'Transformer les connaissances acquises en contenus de partage intéressants' }
  ],
  'relationship': [
    { title: 'Coach de communication en couple', desc: 'Aider à exprimer les émotions difficiles à dire, améliorer les relations intimes' },
    { title: 'Assistant rappel d\'attention familiale', desc: 'Rappeler de prendre soin de sa famille, fournir des suggestions d\'interactions chaleureuses' },
    { title: 'Mainteneur d\'ambiance d\'amitié', desc: 'Aider à entretenir les amitiés à distance, créer des sujets de conversation communs' },
    { title: 'Planificateur de déclarations et surprises', desc: 'Planifier des moments inoubliables et romantiques pour les personnes importantes' },
    { title: 'Guide d\'apaisement des conflits', desc: 'Fournir des conseils et des formulations pour apaiser l\'ambiance lors de tensions relationnelles' }
  ],
  'pet': [
    { title: 'Journal anthropomorphique de l\'animal', desc: 'Générer un journal du point de vue de l\'animal, enregistrer les moments chaleureux avec le maître' },
    { title: 'Interprète du comportement animal', desc: 'Décoder le langage comportemental de l\'animal, approfondir le lien avec lui' },
    { title: 'Planificateur de moments complicité animal', desc: 'Concevoir des activités créatives pour interagir avec l\'animal, renforcer la complicité' },
    { title: 'Générateur d\'histoires souvenir animalières', desc: 'Transformer les photos et souvenirs de l\'animal en histoires chaleureuses' },
    { title: 'Guide rassurant pour nouveaux maîtres', desc: 'Offrir une présence chaleureuse et des conseils aux nouveaux propriétaires d\'animaux' }
  ],
  'finance': [
    { title: 'Assistant de conscience émotionnelle des dépenses', desc: 'Percevoir les émotions derrière les achats impulsifs, construire une vision saine de la consommation' },
    { title: 'Motivation visuelle des objectifs d\'épargne', desc: 'Transformer les objectifs d\'épargne en progression visuelle de rêves' },
    { title: 'Apprendre la gestion financière facilement', desc: 'Apprendre les connaissances financières de manière légère et amusante' },
    { title: 'Apaisseur d\'anxiété financière', desc: 'Offrir soutien émotionnel et conseils pratiques face à la pression financière' },
    { title: 'Jeu d\'expérience d\'investissement à petit montant', desc: 'Découvrir l\'investissement par le jeu, baisser la barrière d\'entrée' }
  ],
  'career': [
    { title: 'Compagnon de doute professionnel', desc: 'Offrir écoute, exploration et suggestions d\'orientation pendant les périodes de doute professionnel' },
    { title: 'Réveilleur de sentiment d\'accomplissement au travail', desc: 'Aider à découvrir la valeur et le sens dans le travail, raviver l\'enthousiasme' },
    { title: 'Assistant d\'ambiance sociale au travail', desc: 'Fournir des sujets de conversation légers et des suggestions d\'interaction pour le networking professionnel' },
    { title: 'Stimulateur d\'idées d\'activité secondaire', desc: 'Stimuler des idées créatives d\'activité parallèle selon les centres d\'intérêt et compétences' },
    { title: 'Station-service de confiance avant entretien', desc: 'Offrir préparation psychologique et encouragement avant un entretien' }
  ],
  'home': [
    { title: 'Designer d\'ambiance d\'espace intérieur', desc: 'Concevoir des solutions d\'ambiance intérieure selon l\'humeur et la saison' },
    { title: 'Guide de transformation saisonnière du logement', desc: 'Changer la décoration intérieure au fil des saisons, garder un sentiment de fraîcheur' },
    { title: 'Magie des petits espaces', desc: 'Créer une ambiance chaleureuse et confortable même dans les petits espaces' },
    { title: 'Créateur de rituels du quotidien à la maison', desc: 'Créer des rituels pour les activités domestiques quotidiennes' },
    { title: 'Compagnon psychologique du désencombrement', desc: 'Offrir soutien psychologique et conseils de décision lors du tri des affaires' }
  ],
  'food': [
    { title: 'Cuisine réconfortante pour une personne', desc: 'Concevoir des solutions culinaires simples et réconfortantes pour les personnes vivant seules' },
    { title: 'Design d\'ambiance de table de fête', desc: 'Concevoir une mise en table rituelle pour les occasions spéciales' },
    { title: 'Adaptateur cuisine-humeur', desc: 'Recommander des aliments et recettes adaptés selon l\'humeur du moment' },
    { title: 'Constructeur de confiance pour débutants en cuisine', desc: 'Offrir encouragements chaleureux et recettes simples aux cuisiniers débutants' },
    { title: 'Guide d\'ambiance photographie culinaire', desc: 'Faire en sorte que même les plats maison rendent irrésistiblement bien en photo' }
  ],
  'fashion': [
    { title: 'Mood board de tenue du jour', desc: 'Générer des inspirations de tenues selon la météo, l\'occasion et l\'humeur' },
    { title: 'Styliste de garde-robe capsule', desc: 'Créer des combinaisons infinies avec un nombre limité de pièces' },
    { title: 'Voyage d\'exploration du style personnel', desc: 'Aider à découvrir et construire un style personnel unique' },
    { title: 'Créatif de relookage vestimentaire', desc: 'Offrir de nouvelles inspirations d\'association pour les vêtements existants' },
    { title: 'Consultant look pour occasions spéciales', desc: 'Concevoir des tenues qui inspirent confiance pour les événements importants' }
  ]
}

// Table de correspondance de recommandations prédéfinie - basée sur l'ambiance et les sensations
const recommendationMap = {
  // Point d'ambiance : Guérison
  'healing': {
    'relax': ['emotion', 'lifestyle', 'health', 'home'],
    'inspire': ['creative', 'growth', 'learning', 'entertainment'],
    'connect': ['relationship', 'social', 'pet', 'emotion'],
    'escape': ['travel', 'entertainment', 'creative', 'lifestyle']
  },
  // Point d'ambiance : Croissance
  'growth': {
    'relax': ['growth', 'learning', 'creative', 'health'],
    'inspire': ['career', 'learning', 'creative', 'growth'],
    'connect': ['social', 'relationship', 'career', 'learning'],
    'escape': ['travel', 'entertainment', 'creative', 'lifestyle']
  },
  // Point d'ambiance : Social
  'social': {
    'relax': ['social', 'pet', 'food', 'home'],
    'inspire': ['social', 'creative', 'entertainment', 'travel'],
    'connect': ['relationship', 'social', 'pet', 'travel'],
    'escape': ['social', 'travel', 'entertainment', 'creative']
  },
  // Point d'ambiance : Exploration
  'explore': {
    'relax': ['travel', 'creative', 'lifestyle', 'food'],
    'inspire': ['travel', 'creative', 'learning', 'entertainment'],
    'connect': ['travel', 'social', 'relationship', 'pet'],
    'escape': ['travel', 'entertainment', 'creative', 'lifestyle']
  },
  // Point d'ambiance : Quotidien
  'daily': {
    'relax': ['lifestyle', 'home', 'health', 'emotion'],
    'inspire': ['creative', 'food', 'fashion', 'home'],
    'connect': ['relationship', 'social', 'pet', 'lifestyle'],
    'escape': ['entertainment', 'creative', 'travel', 'lifestyle']
  }
}

const vibeOptions = [
  { label: 'Guérison', value: 'healing', desc: 'Chaleur, apaisement, réconfort' },
  { label: 'Croissance', value: 'growth', desc: 'Progrès, percée, transformation' },
  { label: 'Social', value: 'social', desc: 'Connexion, partage, interaction' },
  { label: 'Exploration', value: 'explore', desc: 'Curiosité, aventure, découverte' },
  { label: 'Quotidien', value: 'daily', desc: 'Ordinaire, authentique, ici et maintenant' }
]

const feelingOptions = [
  { label: 'Envie de se détendre', value: 'relax', desc: 'Relâcher la pression, se vider l\'esprit' },
  { label: 'Chercher l\'inspiration', value: 'inspire', desc: 'Stimuler la créativité, trouver l\'élan' },
  { label: 'Besoin de connexion', value: 'connect', desc: 'Se connecter aux autres, résonance émotionnelle' },
  { label: 'S\'évader un moment', value: 'escape', desc: 'Échapper à la réalité, immersion totale' }
]

const scenarios = [
  { key: 'lifestyle', name: 'Style de vie', anchor: '#_1-style-de-vie' },
  { key: 'emotion', name: 'Accompagnement émotionnel', anchor: '#_2-accompagnement-emotionnel' },
  { key: 'entertainment', name: 'Divertissement et loisirs', anchor: '#_3-divertissement-et-loisirs' },
  { key: 'growth', name: 'Développement personnel', anchor: '#_4-developpement-personnel' },
  { key: 'social', name: 'Interactions sociales', anchor: '#_5-interactions-sociales' },
  { key: 'creative', name: 'Expression créative', anchor: '#_6-expression-creative' },
  { key: 'travel', name: 'Voyage et exploration', anchor: '#_7-voyage-et-exploration' },
  { key: 'health', name: 'Santé physique et mentale', anchor: '#_8-sante-physique-et-mentale' },
  { key: 'learning', name: 'Exploration des savoirs', anchor: '#_9-exploration-des-savoirs' },
  { key: 'relationship', name: 'Entretien des relations', anchor: '#_10-entretien-des-relations' },
  { key: 'pet', name: 'Compagnie animulaire', anchor: '#_11-compagnie-animulaire' },
  { key: 'finance', name: 'Santé financière', anchor: '#_12-sante-financiere' },
  { key: 'career', name: 'Développement professionnel', anchor: '#_13-developpement-professionnel' },
  { key: 'home', name: 'Espace intérieur', anchor: '#_14-espace-interieur' },
  { key: 'food', name: 'Gastronomie et cuisine', anchor: '#_15-gastronomie-et-cuisine' },
  { key: 'fashion', name: 'Style vestimentaire', anchor: '#_16-style-vestimentaire' }
]

// Calculer les résultats de recommandation - tirer au hasard depuis le pool de thèmes
const recommendationTopics = computed(() => {
  if (!vibePoint.value || !feeling.value) return []
  
  const keys = recommendationMap[vibePoint.value]?.[feeling.value] || []
  const topics = []
  
  // Tirer au hasard 1-2 thèmes de chaque scénario recommandé
  keys.forEach(key => {
    const scenario = scenarios.find(item => item.key === key)
    const scenarioTopics = topicPool[key] || []
    
    if (scenario && scenarioTopics.length > 0) {
      // Tirer au hasard 1-2 thèmes
      const count = Math.floor(Math.random() * 2) + 1
      const shuffled = [...scenarioTopics].sort(() => Math.random() - 0.5)
      const selected = shuffled.slice(0, Math.min(count, shuffled.length))
      
      selected.forEach(topic => {
        topics.push({
          ...topic,
          scenarioKey: key,
          scenarioName: scenario.name,
          scenarioAnchor: scenario.anchor
        })
      })
    }
  })
  
  // Trier aléatoirement et limiter le nombre total
  return topics.sort(() => Math.random() - 0.5).slice(0, 8)
})

// Obtenir la description de la sélection actuelle
const currentSelection = computed(() => {
  const vibe = vibeOptions.find(i => i.value === vibePoint.value)
  const feel = feelingOptions.find(p => p.value === feeling.value)
  return {
    vibe: vibe?.label || '',
    feeling: feel?.label || ''
  }
})

const scrollToAnchor = (anchor) => {
  // Retarder le défilement pour s'assurer que le DOM est mis à jour
  setTimeout(() => {
    // Essayer de trouver par ID (prend en charge plusieurs formats)
    let element = document.querySelector(anchor)
    
    // Si non trouvé, essayer d'autres formats d'ID possibles
    if (!element) {
      // Essayer sans le préfixe underscore
      const altAnchor = anchor.replace('#_', '#')
      element = document.querySelector(altAnchor)
    }
    
    // Si toujours pas trouvé, chercher par texte de titre
    if (!element) {
      // Extraire le nom du scénario depuis l'ancre
      const anchorText = decodeURIComponent(anchor.replace('#', '').replace(/^_/, ''))
      const headings = document.querySelectorAll('h2, h3')
      
      for (let heading of headings) {
        const headingText = heading.textContent.trim()
        // Correspondance exacte ou partielle
        const cleanHeading = headingText.replace(/^\d+\.\s*/, '')
        if (cleanHeading === anchorText || headingText.includes(anchorText)) {
          element = heading
          break
        }
      }
    }
    
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
      // Mettre en surbrillance le paragraphe cible
      element.style.backgroundColor = '#fdf2f8'
      element.style.transition = 'background-color 0.3s'
      element.style.padding = '8px'
      element.style.borderRadius = '4px'
      setTimeout(() => {
        element.style.backgroundColor = ''
        element.style.padding = ''
      }, 2000)
    }
  }, 100)
}

const resetSelection = () => {
  vibePoint.value = ''
  feeling.value = ''
}
</script>

# Inspiration pour scénarios de consommation B2C

## Introduction du chapitre

<ChapterIntroduction :duration="duration" :tags="['Applications B2C', 'Style de vie', 'Expérience émotionnelle', 'Création d\'ambiance']" coreOutput="Découvrir plus de 15 inspirations de scénarios de vie" expectedOutput="Trouver une direction de produit qui touche les utilisateurs">

Ce document recense les <strong>directions d'application créatives des grands modèles LLM dans les scénarios de consommation B2C</strong>. Contrairement au B2B qui se concentre sur l'efficacité et les points de douleur, les produits B2C accordent davantage d'importance à la <strong>création de sensations, aux suggestions psychologiques et à l'ambiance</strong>, permettant aux utilisateurs de ressentir une résonance émotionnelle et une expérience agréable lors de l'utilisation.

</ChapterIntroduction>

## Sélection rapide d'ambiance de scénario

<el-card shadow="hover" style="margin-top: 16px; margin-bottom: 24px; border-left: 5px solid #ec4899;">
  <div style="font-weight: 600; margin-bottom: 8px;">Trouvez l'inspiration de scénario qui vous touche</div>
  <div style="color: #606266; font-size: 14px; line-height: 1.6; margin-bottom: 12px;">
    Choisissez l'ambiance souhaitée et votre sensation du moment, le système recommandera des directions de scénarios pertinentes. Cliquez sur un tag pour accéder au chapitre correspondant.
  </div>
  <el-row :gutter="16">
    <el-col :span="12">
      <el-select v-model="vibePoint" placeholder="Choisir le type d'ambiance" style="width: 100%;">
        <el-option
          v-for="item in vibeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <div style="font-weight: 500;">{{ item.label }}</div>
          <div style="font-size: 12px; color: #909399;">{{ item.desc }}</div>
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="12">
      <el-select v-model="feeling" placeholder="Choisir votre sensation" style="width: 100%;">
        <el-option
          v-for="item in feelingOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <div style="font-weight: 500;">{{ item.label }}</div>
          <div style="font-size: 12px; color: #909399;">{{ item.desc }}</div>
        </el-option>
      </el-select>
    </el-col>
  </el-row>
  
  <div v-if="recommendationTopics.length > 0" style="margin-top: 16px;">
    <div style="font-weight: 600; margin-bottom: 12px; color: #ec4899;">
      Scénarios recommandés pour vous : {{ currentSelection.vibe }} x {{ currentSelection.feeling }}
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <el-tag
        v-for="topic in recommendationTopics"
        :key="topic.title"
        type="danger"
        effect="light"
        style="cursor: pointer; margin-bottom: 4px;"
        @click="scrollToAnchor(topic.scenarioAnchor)"
      >
        {{ topic.title }}
      </el-tag>
    </div>
    <el-button type="text" size="small" @click="resetSelection" style="margin-top: 8px;">
      Rechoisir
    </el-button>
  </div>
</el-card>

---

## 1. Style de vie

> 💡 **Concept clé** : Donner un sens rituel au quotidien ordinaire, créer de la beauté dans les détails

| N° | Nom du scénario | Fonctionnalité du scénario |
| :--: | ------------ | ------------ |
| 1 | Assistant de réveil rituel matinal | Intégration de l'API météo, des données du calendrier, le LLM génère un programme matinal personnalisé ; couplé à un enceinte intelligente pour une musique sur mesure, éclairage intelligent avec réveil progressif |
| 2 | Créateur d'ambiance pour célibataires | Connexion aux appareils domotiques (éclairage, enceinte, diffuseur), le LLM ajuste automatiquement les paramètres selon l'heure/l'humeur ; apprentissage continu des préférences utilisateur |
| 3 | Générateur de programme cocooning week-end | Connexion aux API de plateformes de streaming pour les programmes, génération de combinaisons film + gastronomie + décoration basées sur les préférences historiques |
| 4 | Radio apaisante du soir | Synthèse vocale TTS pour générer des histoires douces, algorithme de mixage de bruits blancs, volume décroissant intelligent ; ajustement du contenu selon les données de sommeil |
| 5 | Chasseur d'inspiration esthétique du quotidien | Reconnaissance d'image analysant les photos d'environnement, le LLM génère des suggestions esthétiques ; recommandations de contenu style Pinterest/Xiaohongshu |

---

## 2. Accompagnement émotionnel

> 💡 **Concept clé** : Accueil inconditionnel et présence, devenir un doux contenant pour les émotions

| N° | Nom du scénario | Fonctionnalité du scénario |
| :--: | ------------ | ------------ |
| 1 | Confident nocturne | Chiffrement de bout en bout garantissant la confidentialité, analyse émotionnelle par LLM, mémoire à long terme des histoires utilisateur, conversation multi-tours pour un accompagnement continu |
| 2 | Accompagnateur de guérison post-rupture | Algorithme d'identification du stade émotionnel, soutien différencié par phase (expression -> libération -> reconstruction) ; base de connaissances psychologiques avec recherche RAG |
| 3 | Coach de respiration anti-anxiété | Intégration de données de capteurs biométriques (fréquence cardiaque/respiration), monitoring en temps réel du niveau d'anxiété ; guidage vocal du rythme respiratoire, instructions de relaxation musculaire progressive |
| 4 | Mentor de reconstruction de la confiance en soi | Cadre de dialogue de psychologie positive, enregistrement et retour des petites réussites ; techniques de restructuration cognitive pour changer les autodialogues négatifs |
| 5 | Analyse intelligente du journal émotionnel | Modèle NLP de reconnaissance émotionnelle, analyse de séries temporelles pour découvrir les schémas émotionnels ; visualisation du spectre émotionnel, alertes prédictives |

---

## 3. Divertissement et loisirs

> 💡 **Concept clé** : Créer des expériences immersives, faire du divertissement un refuge pour l'âme

| N° | Nom du scénario | Fonctionnalité du scénario |
| :--: | ------------ | ------------ |
| 1 | Maître du jeu immersif (murder mystery) | Le LLM génère en temps réel des branches narratives, synthèse vocale pour incarner les NPC, ajustement dynamique de la difficulté et du rythme selon les réactions ; rendu de scènes AR/VR |
| 2 | NPC sensible dans un monde ouvert | Base de données de mémoire à long terme stockant l'historique des interactions, dialogues personnalisés générés par LLM ; calcul émotionnel pour des réactions émotionnelles authentiques des NPC |
| 3 | Génération de contenu podcast personnalisé | Contenu exclusif basé sur le graphe d'intérêts, clonage vocal TTS de la voix préférée ; interaction en temps réel avec les questions des auditeurs |
| 4 | Équipe d'ambiance pour concert virtuel | Rendu d'avatars, interactions de commentaires en temps réel, bâtons lumineux virtuels/accessoires de soutien ; audio spatial pour une sensation de live |
| 5 | Partenaire de co-création de fiction interactive | Le LLM génère l'intrigue en temps réel, les choix utilisateur influencent le déroulement ; fins multiples, développement dynamique des relations entre personnages |

---

## 4. Développement personnel

> 💡 **Concept clé** : La croissance n'est pas une ascèse, c'est un voyage fascinant de découverte de soi

| N° | Nom du scénario | Fonctionnalité du scénario |
| :--: | ------------ | ------------ |
| 1 | Témoin de croissance personnelle | Visualisation chronologique de la trajectoire de croissance, marquage automatique des jalons ; comparatifs « moi d'avant » vs « moi d'aujourd'hui » |
| 2 | Coach ludifié de formation d'habitudes | Mécanismes de ludification (points d'expérience, niveaux, badges), classement social, rôle de coach IA (ex. « mentor de l'aventure ») |
| 3 | Appariement de partenaires d'apprentissage | Algorithme de matching basé sur les intérêts et objectifs, communautés d'apprentissage, mécanisme de suivi mutuel |
| 4 | Découvreur de petites joies quotidiennes | Reconnaissance d'image pour détecter les beaux moments, guidage de journal de gratitude, rétrospective hebdomadaire des moments agréables |
| 5 | Simulateur d'expériences de vie | Simulation narrative multi-branches des conséquences de différents choix, comparaison de vies parallèles ; visualisation des conséquences des décisions |

---

## 5. Interactions sociales

> 💡 **Concept clé** : Rendre les interactions sociales légères et naturelles, trouver un mode de connexion confortable

| N° | Nom du scénario | Fonctionnalité du scénario |
| :--: | ------------ | ------------ |
| 1 | Générateur de sujets brise-glace | Recommandation intelligente de sujets basée sur le contexte et les participants, analyse de conversation en temps réel pour suggestions de prolongation ; sauvetage des moments gênants |
| 2 | Styliste d'ambiance pour publications sociales | Analyse du contenu image, génération de textes multi-styles (littéraire/humoristique/profond) ; recommandation intelligente d'emojis et de mise en forme |
| 3 | Planificateur d'ambiance pour rendez-vous | Génération de plans de rendez-vous basés sur les intérêts communs, recommandations de restaurants/activités, suggestions de sujets de conversation ; rappels météo et trafic en temps réel |
| 4 | Animateur de réunions à distance | Bibliothèque de jeux en ligne, générateur d'activités brise-glace, roue de sujets ; fonds virtuels et filtres pour renforcer l'ambiance |
| 5 | Assistant de gestion d'énergie sociale | Évaluation de la dépense énergétique après les activités sociales, suggestions de récupération (activités en solitaire) ; planification intelligente du calendrier social |

---

## 6. Expression créative

> 💡 **Concept clé** : Chacun a de la créativité, il suffit juste de l'éveiller

| N° | Nom du scénario | Fonctionnalité du scénario |
| :--: | ------------ | ------------ |
| 1 | Kit d'urgence anti-panne d'inspiration | Algorithme d'association trans-domaines, génération de stimuli aléatoires, bibliothèque de prompts créatifs ; outil de divergence d'idées en carte mentale |
| 2 | Guide d'exploration du style personnel | Analyse d'image pour identifier le style existant, recommandation de tendances, essayage virtuel/makeup ; timeline d'évolution du style |
| 3 | Consultant esthétique pour journal et bulletins | Recommandation de modèles de mise en page, génération de palettes de couleurs, suggestions d'éléments décoratifs ; reconnaissance d'écriture manuscrite et embellissement |
| 4 | Guide d'ambiance photographique | Identification de scène et suggestions de composition, recommandation de filtres, ajustement intelligent des paramètres de retouche ; parcours d'apprentissage de la photographie |
| 5 | Adaptateur musique-humeur | Algorithme d'analyse émotionnelle musicale, reconnaissance de l'humeur utilisateur, génération de playlists personnalisées ; histoires et contexte musical |

---

## 7. Voyage et exploration

> 💡 **Concept clé** : Voyager, ce n'est pas seulement voir des paysages, c'est aussi ressentir des modes de vie différents

| N° | Nom du scénario | Fonctionnalité du scénario |
| :--: | ------------ | ------------ |
| 1 | Guide d'exploration urbaine à pied | Agrégation de contenus d'initiés locaux, recommandation de lieux insolites, navigation AR ; traduction et commentaire vocal en temps réel |
| 2 | Génération de journal de voyage émotionnel | Tri et sélection automatiques des photos, génération de récits de voyage poétiques par LLM, timeline géolocalisée ; vidéo de voyage en un clic |
| 3 | Compagnon pour voyageurs solitaires | Partage de localisation en temps réel et alertes de sécurité, contacts d'urgence locaux, guide vocal IA ; communauté de voyageurs solo |
| 4 | Aperçu d'ambiance de destination | Aperçu VR/360°, simulation des sons et odeurs locaux, présentation du contexte culturel ; expérience de « test d'hébergement » virtuel |
| 5 | Guide d'ambiance photographique de voyage | Rappel de l'heure dorée, lignes de composition, points de prise de vue typiques ; suggestions de style d'étalonnage en post-production |

---

## 8. Santé physique et mentale

> 💡 **Concept clé** : La santé n'est pas un objectif, c'est un doux acte de self-care

| N° | Nom du scénario | Fonctionnalité du scénario |
| :--: | ------------ | ------------ |
| 1 | Réveilleur de motivation sportive | Recommandation intelligente du type d'exercice selon l'état utilisateur, options de micro-exercices (5 minutes), défis sportifs ludifiés ; check-in sportif social |
| 2 | Cuisine inspiration alimentation saine | Identification des ingrédients du frigo, recommandation de recettes personnalisées, analyse nutritionnelle ; guide de cuisson étape par étape |
| 3 | Optimisateur d'ambiance pour la qualité du sommeil | Analyse des données de monitoring du sommeil, génération de rituels du coucher, conseils d'optimisation de l'environnement (température/humidité/lumière) ; réveil intelligent |
| 4 | Guide de perception corporelle | Guidage de méditation de scan corporel, associations émotionnelles des parties du corps, exercices de connexion corps-esprit ; biofeedback visualisé |
| 5 | Assistant rappel de self-care | Monitoring de l'intensité de travail, rappels réguliers de pause, suggestions de micro-activités de soin (boire/s'étirer/respirer profondément) ; journal de self-care |

---

## 9. Exploration des savoirs

> 💡 **Concept clé** : Apprendre est une aventure sans fin, la curiosité est le meilleur des professeurs

| N° | Nom du scénario | Fonctionnalité du scénario |
| :--: | ------------ | ------------ |
| 1 | Guide ludifié d'exploration des savoirs | Visualisation cartographique des connaissances, parcours d'apprentissage en mode « niveau », système de badges de réussite ; jeu de rôle de tuteur IA |
| 2 | Partenaire de scénarios d'apprentissage linguistique | Le LLM joue différents rôles dans des dialogues, correction de prononciation, présentation du contexte culturel ; simulation immersive de scénarios |
| 3 | Assistant de satisfaction de la curiosité | Connexion Wikipédia/graphes de connaissances, vulgarisation de concepts complexes, recommandation de savoirs connexes ; journal de curiosité |
| 4 | Stimulateur d'inspiration pour notes de lecture | Analyse du contenu du livre, extraction et mise en relation d'idées, recommandation d'angles de réflexion ; modèles et embellissement de notes de lecture |
| 5 | Créateur d'ambiance pour le partage de connaissances | Génération automatique de fiches de connaissances, optimisation des textes de partage, embellissement visuel ; retour sur les données de partage social |

---

## 10. Entretien des relations

> 💡 **Concept clé** : Les bonnes relations demandent de l'attention, et l'attention n'a pas besoin d'être compliquée

| N° | Nom du scénario | Fonctionnalité du scénario |
| :--: | ------------ | ------------ |
| 1 | Coach de communication en couple | Génération de modèles d'expression émotionnelle, guidage en communication non violente, formulations de résolution de conflits ; évaluation de la santé relationnelle |
| 2 | Assistant rappel d'attention familiale | Rappels des dates importantes (anniversaires/commémorations), suggestions de messages attentionnés, recommandations d'activités familiales ; album familial généré |
| 3 | Mainteneur d'ambiance d'amitié | Historique des interactions entre amis, recommandation de sujets communs, organisation de réunions à distance ; timeline et souvenirs d'amitié |
| 4 | Planificateur de déclarations et surprises | Génération de plans de surprises personnalisés, recommandation de cadeaux, suggestions de formulations romantiques ; planning d'exécution et rappels |
| 5 | Guide d'apaisement des conflits | Formulations de désamorçage émotionnel, guidage de changement de perspective, suggestions d'étapes de réconciliation ; suivi de réparation relationnelle |

---

## 11. Compagnie animulaire

> 💡 **Concept clé** : Les animaux de compagnie sont des membres de la famille, leur présence mérite d'être enregistrée et chérie

| N° | Nom du scénario | Fonctionnalité du scénario |
| :--: | ------------ | ------------ |
| 1 | Journal anthropomorphique de l'animal | Analyse du comportement animal, génération de journal à la première personne, illustration automatique des photos ; « fil social » de l'animal |
| 2 | Interprète du comportement animal | Analyse vidéo du comportement animal, alertes sanitaires, conseils d'éducation ; base de connaissances des caractéristiques de race |
| 3 | Planificateur de moments complicité animal | Recommandations d'activités avec l'animal, tutoriels de jouets DIY, lieux accueillants pour animaux ; matchmaking social animal |
| 4 | Générateur d'histoires souvenir animalières | Sélection de photos et vidéos, génération d'histoires chronologiques, accompagnement musical ; album/vidéo souvenir auto-généré |
| 5 | Guide rassurant pour nouveaux maîtres | Guide d'entretien par étapes, FAQ, gestion des urgences ; communauté de soutien pour débutants |

---

## 12. Santé financière

> 💡 **Concept clé** : La liberté financière n'est pas l'objectif, la santé financière l'est

| N° | Nom du scénario | Fonctionnalité du scénario |
| :--: | ------------ | ------------ |
| 1 | Assistant de conscience émotionnelle des dépenses | Analyse des relevés de dépenses, corrélation émotions-dépenses, alertes anti-achats impulsifs ; suggestions de satisfactions alternatives |
| 2 | Motivation visuelle des objectifs d'épargne | Visualisation de la progression vers l'objectif, rendu de scènes de rêve, célébration des jalons ; jeu de formation d'habitudes d'épargne |
| 3 | Apprendre la gestion financière facilement | Envoi de connaissances fragmentées, enseignement par scénarios, quiz interactifs ; tests et certificats de connaissances |
| 4 | Apaisseur d'anxiété financière | Évaluation de la santé financière, techniques de gestion du stress, plans d'action progressifs ; conseil psychologique financier |
| 5 | Jeu d'expérience d'investissement à petit montant | Simulation d'investissement virtuel, éducation aux risques, jeu de portefeuille d'investissement ; guidage vers le micro-investissement réel |

---

## 13. Développement professionnel

> 💡 **Concept clé** : La carrière n'est pas une voie ferrée, c'est un champ ouvert à explorer

| N° | Nom du scénario | Fonctionnalité du scénario |
| :--: | ------------ | ------------ |
| 1 | Compagnon de doute professionnel | Tests d'intérêts professionnels, inventaire des compétences, recommandation d'informations sectorielles ; dialogue avec un mentor de carrière |
| 2 | Réveilleur de sentiment d'accomplissement au travail | Enregistrement des réalisations professionnelles, extraction de la valeur, visualisation des succès ; collecte de retours positifs collègues/clients |
| 3 | Assistant d'ambiance sociale au travail | Recommandations de sujets professionnels, techniques de networking, événements sectoriels ; optimisation de contenu LinkedIn |
| 4 | Stimulateur d'idées d'activité secondaire | Matching compétences-intérêts-demande du marché, bibliothèque de cas de side projects, guide de démarrage ; communauté d'échange |
| 5 | Station-service de confiance avant entretien | Simulation d'entretien, préparation aux questions courantes, techniques de renforcement de la confiance ; conseils d'image |

---

## 14. Espace intérieur

> 💡 **Concept clé** : La maison n'est pas seulement un lieu de résidence, c'est le refuge de l'âme

| N° | Nom du scénario | Fonctionnalité du scénario |
| :--: | ------------ | ------------ |
| 1 | Designer d'ambiance d'espace intérieur | Analyse de photos d'espace, recommandations de style, suggestions mobilier/décoration ; prévisualisation AR |
| 2 | Guide de transformation saisonnière du logement | Thèmes saisonniers, suggestions de rangement et de mise en valeur, plans de décoration festive ; génération de liste de courses |
| 3 | Magie des petits espaces | Algorithme d'optimisation spatiale, mobilier multifonction, techniques de rangement ; astuces d'agrandissement visuel |
| 4 | Créateur de rituels du quotidien à la maison | Design de rituels quotidiens (matin/soir/week-end), rappels d'exécution ; retour sur les effets des rituels |
| 5 | Compagnon psychologique du désencombrement | Évaluation de la valeur émotionnelle des objets, guidage étape par étape du tri, soutien psychologique ; recommandation de canaux de don/recyclage |

---

## 15. Gastronomie et cuisine

> 💡 **Concept clé** : La nourriture est un langage d'amour, cuisiner est une façon d'exprimer l'amour

| N° | Nom du scénario | Fonctionnalité du scénario |
| :--: | ------------ | ------------ |
| 1 | Cuisine réconfortante pour une personne | Identification des ingrédients du frigo, recettes simples, guide étape par étape ; esthétique de dressage solo |
| 2 | Design d'ambiance de table de fête | Menu thématique festif, plan de mise en table, techniques d'ambiance ; optimisation de l'expérience des convives |
| 3 | Adaptateur cuisine-humeur | Algorithme d'association humeur-aliment, recettes de régulation émotionnelle, recommandations de comfort food ; guidage de guérison par la cuisine |
| 4 | Constructeur de confiance pour débutants en cuisine | Recettes ultra-simples, astuces de sauvetage des ratés, formulations de renforcement de la confiance ; progression graduelle de difficulté |
| 5 | Guide d'ambiance photographie culinaire | Suggestions de dressage, utilisation de la lumière naturelle, guidage des angles de prise de vue ; filtres et retouches recommandés |

---

## 16. Style vestimentaire

> 💡 **Concept clé** : S'habiller, c'est s'exprimer ; le style est la manifestation extérieure de l'intérieur

| N° | Nom du scénario | Fonctionnalité du scénario |
| :--: | ------------ | ------------ |
| 1 | Mood board de tenue du jour | Recommandation combinée météo/occasion/humeur, essayage virtuel, inspiration de looks ; gestion de garde-robe |
| 2 | Styliste de garde-robe capsule | Inventaire de la garde-robe, combinaisons de pièces, programmes une pièce-multi looks ; conseils d'achat (combler les lacunes) |
| 3 | Voyage d'exploration du style personnel | Test de style, recommandation d'icônes de référence, parcours d'évolution stylistique ; construction de la confiance |
| 4 | Créatif de relookage vestimentaire | Inspirations de transformation de vêtements anciens, nouvelles associations, techniques d'accessoirisation ; mode durable |
| 5 | Consultant look pour occasions spéciales | Décryptage du dress code, génération de plans de tenue, suggestions coiffure et maquillage ; coordination de l'ensemble |

---

## Principes fondamentaux pour la conception de produits B2C

### 1. De la « fonctionnalité » au « ressenti »

Les produits B2B se demandent « quel problème cette fonctionnalité résout-elle », les produits B2C se demandent « quel ressenti cette fonctionnalité procure-t-elle ».

| Pensée B2B | Pensée B2C |
|---------|---------|
| Améliorer l'efficacité | Gagner du temps pour faire ce qu'on aime |
| Réduire les coûts | Faire en sorte que chaque euro en vaille la peine |
| Résoudre les points de douleur | Créer des expériences agréables |
| Fonctionnalité complète | Le ressenti est au rendez-vous |

### 2. Les trois niveaux de la création d'ambiance

**Niveau sensoriel** : conception visuelle, auditive et tactile
- Couleurs chaleureuses
- Sons apaisants
- Animations fluides

**Niveau émotionnel** : résonance et guidage des émotions
- Comprendre l'humeur de l'utilisateur
- Offrir un soutien émotionnel
- Créer des émotions positives

**Niveau de sens** : adhésion aux valeurs et sentiment d'appartenance
- Faire sentir à l'utilisateur qu'il est compris
- Créer un sentiment d'appartenance
- Donner du sens aux actions

### 3. La puissance de la suggestion psychologique

Le texte et le design des produits B2C transmettent tous des suggestions psychologiques :

- **Suggestions positives** : « Tu fais déjà du bon travail », « Prends ton temps, ce n'est pas grave »
- **Suggestions d'appartenance** : « Beaucoup de gens sont comme toi », « Tu n'es pas seul(e) »
- **Suggestions de croissance** : « Chaque essai est un progrès », « Tu deviens meilleur(e) »

### 4. Permettre aux utilisateurs de devenir la meilleure version d'eux-mêmes

Le meilleur produit B2C ne change pas l'utilisateur, il l'aide à devenir la personne qu'il souhaite être.

- Pas « tu devrais... », mais « tu peux... »
- Pas « tu dois... », mais « si tu le souhaites... »
- Pas « tu n'es pas encore assez... », mais « tu es déjà... »

---

> 🌟 **Rappelez-vous** : les utilisateurs B2C n'achètent pas des fonctionnalités, ils achètent des sensations ; pas des outils, mais de la compagnie ; pas des services, mais de la compréhension.
