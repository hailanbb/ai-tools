---
title: "Références d'inspiration pour les scénarios grand public"
description: "Ce document rassemble les directions d'application créative des grands modèles de langage (LLM) dans les scénarios de consommation grand public, couvrant les domaines du mode de vie, de la compagnie émotionnelle, du divertissement, de la croissance personnelle, des interactions sociales, etc., pour offrir des références créatives aux développeurs d'applications IA."
---

<script setup>
import { computed, ref } from 'vue'

const duration = 'environ <strong>4 heures</strong>'

const vibePoint = ref('')
const feeling = ref('')

// Thème pool pour chaque scénario - accent sur les sensations, l'atmosphère et les suggestions psychologiques
const topicPool = {
  'lifestyle': [
    { title: 'Assistant de rituel matinal', desc: 'Génère un rituel matinal personnalisé selon la météo, l\'emploi du temps et l\'humeur' },
    { title: 'Créateur d\'atmosphère pour célibataires', desc: 'Conçoit des ambiances domestiques : éclairage, musique et senteurs en harmonie' },
    { title: 'Générateur de week-end cocooning', desc: 'Recommande la combinaison parfaite : film + encas + décoration pour un week-end à la maison' },
    { title: 'Radio apaisante du soir', desc: 'Génère des histoires douces et des méditations guidées pour s\'endormir paisiblement' },
    { title: 'Chasseur d\'inspiration esthétique', desc: 'Découvre la beauté dans les petites choses du quotidien' }
  ],
  'emotion': [
    { title: 'Confident nocturne', desc: 'Écouteur émotionnel 24h/24, accueille toutes vos pensées sans jugement' },
    { title: 'Compagnon de guérison après rupture', desc: 'Accompagnement bienveillant pendant les moments difficiles avec des conseils de guérison' },
    { title: 'Coach de respiration anti-stress', desc: 'Détecte l\'anxiété et guide des exercices de respiration et de pleine conscience' },
    { title: 'Guide de reconstruction de confiance', desc: 'Aide à retrouver l\'estime de soi par des dialogues positifs et des suggestions psychologiques' },
    { title: 'Analyseur intelligent de journal émotionnel', desc: 'Analyse votre journal, identifie les schémas émotionnels et offre des insights chaleureux' }
  ],
  'entertainment': [
    { title: 'Maître du jeu de meurtre mystérieux', desc: 'Joue le rôle de l\'animateur, crée une ambiance de mystère et fait avancer l\'intrigue' },
    { title: 'NPC vivant en monde ouvert', desc: 'Des NPC mémorables qui se souviennent de votre histoire et créent de véritables liens' },
    { title: 'Générateur de podcast personnalisé', desc: 'Crée un podcast sur mesure, comme une conversation naturelle entre amis' },
    { title: 'Groupe d\'ambiance de concert virtuel', desc: 'Recrée l\'ambiance d\'un concert en direct avec interactions en temps réel' },
    { title: 'Partenaire de fiction interactive', desc: 'Co-crée des histoires où chaque choix influence le cours du récit' }
  ],
  'growth': [
    { title: 'Témoin de votre croissance', desc: 'Enregistre votre parcours et encourage aux moments importants' },
    { title: 'Coach ludique d\'habitudes', desc: 'Transforme la prise d\'habitudes en une aventure de jeu captivante' },
    { title: 'Matching de partenaires d\'apprentissage', desc: 'Trouve des partenaires motivés pour apprendre ensemble et partager les progrès' },
    { title: 'Chasseur de petits bonheurs quotidiens', desc: 'Aide à découvrir les petites joies de la vie et cultive la gratitude' },
    { title: 'Simulateur de vie', desc: 'Simule différents choix de vie pour explorer les possibilités parallèles' }
  ],
  'social': [
    { title: 'Générateur de sujets de brise-glace', desc: 'Propose des sujets intéressants pour briser la glace en toute occasion' },
    { title: 'Styliste de publications sociales', desc: 'Génère des textes élégants pour vos publications selon vos photos et votre humeur' },
    { title: 'Planificateur de rendez-vous romantiques', desc: 'Conçoit une expérience complète : lieu, sujets de conversation et surprises' },
    { title: 'Animateur de réunions à distance', desc: 'Animer les rencontres en ligne avec des jeux et des interactions' },
    { title: 'Gestionnaire d\'énergie sociale', desc: 'Aide les introvertis à gérer leur énergie sociale et trouver leur rythme' }
  ],
  'creative': [
    { title: 'Kit d\'urgence pour panne d\'inspiration', desc: 'Offre des étincelles d\'inspiration inattendues quand le blocage créeatif frappe' },
    { title: 'Guide d\'exploration du style personnel', desc: 'Aide à découvrir votre style unique, de la tenue à l\'expression' },
    { title: 'Consultant esthétique pour bullet journals', desc: 'Conseille la mise en page, les couleurs et les idées créatives de vos carnets' },
    { title: 'Guide de composition photographique', desc: 'Propose des conseils de photo et de retouche selon l\'ambiance souhaitée' },
    { title: 'Sélecteur musical selon l\'humeur', desc: 'Recommande la combinaison musicale parfaite selon votre état d\'esprit' }
  ],
  'travel': [
    { title: 'Guide de flânerie urbaine', desc: 'Explorez la ville comme un local et découvrez des pépites cachées' },
    { title: 'Générateur de journal de voyage', desc: 'Transforme vos photos et émotions en récits de voyage poétiques' },
    { title: 'Compagnon de voyage en solo', desc: 'Accompagne et rassure les voyageurs solitaires tout au long du parcours' },
    { title: 'Aperçu d\'ambiance de destination', desc: 'Immersion dans l\'ambiance de votre destination avant le départ' },
    { title: 'Guide photographique de voyage', desc: 'Aide à capturer des photos pleines de sens et d\'émotions' }
  ],
  'health': [
    { title: 'Éveilleur de motivation sportive', desc: 'L\'encouragement juste au bon moment quand vous n\'avez pas envie de bouger' },
    { title: 'Cuisine inspirante santé', desc: 'Génère des recettes saines et réconfortantes selon l\'humeur et les ingrédients' },
    { title: 'Optimiseur de sommeil', desc: 'Crée une ambiance propice au sommeil, de l\'environnement au mental' },
    { title: 'Guide de conscience corporelle', desc: 'Guide l\'attention vers les signaux du corps pour renforcer la connexion corps-esprit' },
    { title: 'Rappel de bienveillance envers soi', desc: 'Vous rappelle de faire une pause et de prendre soin de vous' }
  ],
  'learning': [
    { title: 'Guide ludique d\'exploration du savoir', desc: 'Transforme l\'apprentissage en aventure passionnante' },
    { title: 'Partenaire de langue par scénarios', desc: 'Joue différents rôles pour apprendre une langue naturellement en situation' },
    { title: 'Satisfaisant de curiosité', desc: 'Répond à toutes vos questions farfelues et nourrit votre soif de découverte' },
    { title: 'Inspiration de notes de lecture', desc: 'Aide à organiser vos réflexions et à découvrir de nouvelles perspectives' },
    { title: 'Créateur d\'ambiance pour partage de connaissances', desc: 'Transforme vos apprentissages en contenus de partage captivants' }
  ],
  'relationship': [
    { title: 'Coach de communication intime', desc: 'Aide à exprimer les sentiments difficiles et améliore les relations proches' },
    { title: 'Rappel de attention familiale', desc: 'Vous rappelle de prendre soin de votre famille avec des suggestions d\'interactions' },
    { title: 'Entreteneur d\'amitiés', desc: 'Aide à maintenir les amitiés à distance en créant des sujets communs' },
    { title: 'Planificateur de déclarations et surprises', desc: 'Organise des moments inoubliables pour vos proches' },
    { title: 'Médiateur de conflits', desc: 'Propose des conseils et des formulations pour apaiser les tensions relationnelles' }
  ],
  'pet': [
    { title: 'Journal de vie de votre animal', desc: 'Rédige un journal du point de vue de votre animal compagnon' },
    { title: 'Interprète du comportement animal', desc: 'Décrypte le langage corporel de votre animal pour renforcer votre lien' },
    { title: 'Planificateur d\'activités avec votre animal', desc: 'Conçoit des activités créatives pour partager des moments complices' },
    { title: 'Générateur d\'histoires commémoratives', desc: 'Transforme les photos et souvenirs de votre animal en récits touchants' },
    { title: 'Guide rassurant pour nouveaux maîtres', desc: 'Accompagne avec bienveillance les nouveaux propriétaires d\'animaux' }
  ],
  'finance': [
    { title: 'Sensible aux émotions d\'achat', desc: 'Identifie les émotions derrière les achats impulsifs pour une consommation saine' },
    { title: 'Visualisation d\'objectifs d\'épargne', desc: 'Transforme vos objectifs d\'épargne en une barre de progression motivante' },
    { title: 'Apprentissage ludique de la finance', desc: 'Apprenez les bases de la gestion financière de manière amusante' },
    { title: 'Apaiseur d\'anxiété financière', desc: 'Offre un soutien émotionnel et des conseils pratiques face au stress financier' },
    { title: 'Jeu d\'initiation aux petits investissements', desc: 'Découvrez l\'investissement par le jeu dans un environnement sûr' }
  ],
  'career': [
    { title: 'Compagnon dans le doute professionnel', desc: 'Écoute, explore et oriente lors des périodes de remise en question' },
    { title: 'Réveilleur de sens au travail', desc: 'Aide à retrouver la valeur et la signification de votre travail' },
    { title: 'Facilitateur de relations professionnelles', desc: 'Propose des sujets légers et des conseils d\'interaction pour le milieu professionnel' },
    { title: 'Stimulateur d\'idées de projets secondaires', desc: 'Déclenche des idées de projets parallèles selon vos intérêts et compétences' },
    { title: 'Boosteur de confiance avant entretien', desc: 'Prépare mentalement et renforce la confiance avant les entretiens d\'embauche' }
  ],
  'home': [
    { title: 'Designer d\'atmosphère domestique', desc: 'Conçoit des ambiances selon l\'humeur et la saison' },
    { title: 'Guide de décoration saisonnière', desc: 'Renouvelez votre intérieur au fil des saisons pour garder un sentiment de fraîcheur' },
    { title: 'Magicien des petits espaces', desc: 'Transformez les petits espaces en lieux chaleureux et confortables' },
    { title: 'Créateur de rituels domestiques', desc: 'Donnez un sens aux activités quotidiennes à la maison' },
    { title: 'Accompagnateur de tri minimaliste', desc: 'Soutien psychologique et aide à la décision lors du rangement' }
  ],
  'food': [
    { title: 'Cuisine réconfortante pour solo', desc: 'Conçoit des recettes simples et réconfortantes pour les personnes vivant seules' },
    { title: 'Décorateur de table festive', desc: 'Crée des mises en table élégantes pour les occasions spéciales' },
    { title: 'Sélecteur culinaire selon l\'humeur', desc: 'Recommande des recettes adaptées à votre état d\'esprit du moment' },
    { title: 'Constructeur de confiance en cuisine', desc: 'Encourage les débutants avec des recettes simples et un soutien chaleureux' },
    { title: 'Guide de photographie culinaire', desc: 'Donnez à vos plats maison une allure irrésistible en photo' }
  ],
  'fashion': [
    { title: 'Tableau d\'inspiration quotidien', desc: 'Génère des idées de tenues selon la météo, l\'occasion et l\'humeur' },
    { title: 'Styliste de garde-robe capsule', desc: 'Créez des combinaisons infinies avec un nombre limité de pièces' },
    { title: 'Voyage d\'exploration du style personnel', desc: 'Aide à découvrir et construire votre style vestimentaire unique' },
    { title: 'Rénovateur de vieux vêtements', desc: 'Donne une nouvelle vie à vos anciens vêtements avec des idées de mix & match' },
    { title: 'Consultant en style pour grandes occasions', desc: 'Conçoit des looks confiants pour vos moments importants' }
  ]
}

// Table de correspondance des recommandations - basée sur l'ambiance et les sensations
const recommendationMap = {
  // Ambiance : bienveillante
  'healing': {
    'relax': ['emotion', 'lifestyle', 'health', 'home'],
    'inspire': ['creative', 'growth', 'learning', 'entertainment'],
    'connect': ['relationship', 'social', 'pet', 'emotion'],
    'escape': ['travel', 'entertainment', 'creative', 'lifestyle']
  },
  // Ambiance : croissance
  'growth': {
    'relax': ['growth', 'learning', 'creative', 'health'],
    'inspire': ['career', 'learning', 'creative', 'growth'],
    'connect': ['social', 'relationship', 'career', 'learning'],
    'escape': ['travel', 'entertainment', 'creative', 'lifestyle']
  },
  // Ambiance : sociale
  'social': {
    'relax': ['social', 'pet', 'food', 'home'],
    'inspire': ['social', 'creative', 'entertainment', 'travel'],
    'connect': ['relationship', 'social', 'pet', 'travel'],
    'escape': ['social', 'travel', 'entertainment', 'creative']
  },
  // Ambiance : exploration
  'explore': {
    'relax': ['travel', 'creative', 'lifestyle', 'food'],
    'inspire': ['travel', 'creative', 'learning', 'entertainment'],
    'connect': ['travel', 'social', 'relationship', 'pet'],
    'escape': ['travel', 'entertainment', 'creative', 'lifestyle']
  },
  // Ambiance : quotidien
  'daily': {
    'relax': ['lifestyle', 'home', 'health', 'emotion'],
    'inspire': ['creative', 'food', 'fashion', 'home'],
    'connect': ['relationship', 'social', 'pet', 'lifestyle'],
    'escape': ['entertainment', 'creative', 'travel', 'lifestyle']
  }
}

const vibeOptions = [
  { label: 'Bienveillante', value: 'healing', desc: 'Chaleur, réconfort, guérison' },
  { label: 'Croissance', value: 'growth', desc: 'Progrès, dépassement, transformation' },
  { label: 'Sociale', value: 'social', desc: 'Connexion, partage, interaction' },
  { label: 'Exploration', value: 'explore', desc: 'Curiosité, aventure, découverte' },
  { label: 'Quotidien', value: 'daily', desc: 'Simple, authentique, dans l\'instant' }
]

const feelingOptions = [
  { label: 'Se détendre', value: 'relax', desc: 'Relâcher la pression, se vider l\'esprit' },
  { label: 'Chercher l\'inspiration', value: 'inspire', desc: 'Stimuler la créativité, trouver des idées' },
  { label: 'Se connecter', value: 'connect', desc: 'Rencontrer, partager des émotions' },
  { label: 'S\'évader', value: 'escape', desc: 'Fuir la routine, vivre une expérience immersive' }
]

const scenarios = [
  { key: 'lifestyle', name: 'Mode de vie', anchor: '#_1-mode-de-vie' },
  { key: 'emotion', name: 'Compagnie émotionnelle', anchor: '#_2-compagnie-émotionnelle' },
  { key: 'entertainment', name: 'Divertissement', anchor: '#_3-divertissement' },
  { key: 'growth', name: 'Croissance personnelle', anchor: '#_4-croissance-personnelle' },
  { key: 'social', name: 'Interactions sociales', anchor: '#_5-interactions-sociales' },
  { key: 'creative', name: 'Expression créative', anchor: '#_6-expression-créative' },
  { key: 'travel', name: 'Voyage et exploration', anchor: '#_7-voyage-et-exploration' },
  { key: 'health', name: 'Santé physique et mentale', anchor: '#_8-santé-physique-et-mentale' },
  { key: 'learning', name: 'Exploration du savoir', anchor: '#_9-exploration-du-savoir' },
  { key: 'relationship', name: 'Relations humaines', anchor: '#_10-relations-humaines' },
  { key: 'pet', name: 'Animaux de compagnie', anchor: '#_11-animaux-de-compagnie' },
  { key: 'finance', name: 'Santé financière', anchor: '#_12-santé-financière' },
  { key: 'career', name: 'Développement professionnel', anchor: '#_13-développement-professionnel' },
  { key: 'home', name: 'Espace domestique', anchor: '#_14-espace-domestique' },
  { key: 'food', name: 'Gastronomie', anchor: '#_15-gastronomie' },
  { key: 'fashion', name: 'Style vestimentaire', anchor: '#_16-style-vestimentaire' }
]

// Calcul des recommandations - tirage aléatoire du thème pool
const recommendationTopics = computed(() => {
  if (!vibePoint.value || !feeling.value) return []

  const keys = recommendationMap[vibePoint.value]?.[feeling.value] || []
  const topics = []

  // Tirer 1-2 thèmes de chaque scénario recommandé
  keys.forEach(key => {
    const scenario = scenarios.find(item => item.key === key)
    const scenarioTopics = topicPool[key] || []

    if (scenario && scenarioTopics.length > 0) {
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
  setTimeout(() => {
    let element = document.querySelector(anchor)

    if (!element) {
      const altAnchor = anchor.replace('#_', '#')
      element = document.querySelector(altAnchor)
    }

    if (!element) {
      const anchorText = decodeURIComponent(anchor.replace('#', '').replace(/^_/, ''))
      const headings = document.querySelectorAll('h2, h3')

      for (let heading of headings) {
        const headingText = heading.textContent.trim()
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

# Références d'inspiration pour les scénarios grand public

## Introduction au chapitre

<ChapterIntroduction :duration="duration" :tags="['Applications grand public', 'Mode de vie', 'Expérience émotionnelle', 'Création d\'ambiance']" coreOutput="Découvrir 15+ directions d\'inspiration" expectedOutput="Trouver la direction produit qui touche les utilisateurs">

Ce document rassemble les <strong>directions d'application créative des grands modèles de langage (LLM) dans les scénarios de consommation grand public</strong>. Contrairement aux produits B2B qui se concentrent sur l'efficacité et les points de douleur, les produits grand public accordent plus d'importance à la <strong>création de sensations, de suggestions psychologiques et d'ambiance</strong>, permettant aux utilisateurs de vivre une résonance émotionnelle et une belle expérience.

</ChapterIntroduction>

## Sélection rapide d'ambiance de scénario

<el-card shadow="hover" style="margin-top: 16px; margin-bottom: 24px; border-left: 5px solid #ec4899;">
  <div style="font-weight: 600; margin-bottom: 8px;">Trouvez l'inspiration de scénario qui vous touche</div>
  <div style="color: #606266; font-size: 14px; line-height: 1.6; margin-bottom: 12px;">
    Choisissez l'ambiance souhaitée et votre ressenti actuel, le système recommandera les scénarios pertinents. Cliquez sur les étiquettes pour accéder au chapitre correspondant.
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
      <el-select v-model="feeling" placeholder="Choisir le ressenti actuel" style="width: 100%;">
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
      Scénarios recommandés {{ currentSelection.vibe }} × {{ currentSelection.feeling }} :
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
      Choisir à nouveau
    </el-button>
  </div>
</el-card>

## Aperçu des directions de scénarios

<el-row :gutter="16" style="margin-top: 24px;">
  <el-col :span="8" v-for="scenario in scenarios.slice(0, 6)" :key="scenario.key">
    <el-card shadow="hover" style="margin-bottom: 16px; cursor: pointer;" @click="scrollToAnchor(scenario.anchor)">
      <div style="font-weight: 600; color: #303133; margin-bottom: 4px;">{{ scenario.name }}</div>
      <div style="font-size: 12px; color: #909399;">{{ topicPool[scenario.key]?.length || 0 }} directions d'inspiration</div>
    </el-card>
  </el-col>
</el-row>
<el-row :gutter="16">
  <el-col :span="8" v-for="scenario in scenarios.slice(6, 12)" :key="scenario.key">
    <el-card shadow="hover" style="margin-bottom: 16px; cursor: pointer;" @click="scrollToAnchor(scenario.anchor)">
      <div style="font-weight: 600; color: #303133; margin-bottom: 4px;">{{ scenario.name }}</div>
      <div style="font-size: 12px; color: #909399;">{{ topicPool[scenario.key]?.length || 0 }} directions d'inspiration</div>
    </el-card>
  </el-col>
</el-row>
<el-row :gutter="16">
  <el-col :span="8" v-for="scenario in scenarios.slice(12, 16)" :key="scenario.key">
    <el-card shadow="hover" style="margin-bottom: 16px; cursor: pointer;" @click="scrollToAnchor(scenario.anchor)">
      <div style="font-weight: 600; color: #303133; margin-bottom: 4px;">{{ scenario.name }}</div>
      <div style="font-size: 12px; color: #909399;">{{ topicPool[scenario.key]?.length || 0 }} directions d'inspiration</div>
    </el-card>
  </el-col>
</el-row>

---

## 1. Mode de vie

> 💡 **Idée clé** : Transformer le quotidien ordinaire en rituel, créer de la beauté dans les détails

### 1.1 Assistant de rituel matinal

**Description du scénario** :
Chaque matin, génère un rituel personnalisé selon la météo, l'emploi du temps et votre humeur : une musique douce, une tasse de thé adaptée, 5 minutes d'étirements, ou un mot d'encouragement.

**Points clés de l'ambiance** :
- Un réveil progressif, pas une alarme brutale
- Une expérience multisensorielle (visuelle et auditive)
- Donner envie d'anticiper chaque journée

**Suggestion psychologique** :
> "Aujourd'hui sera une belle journée, car vous méritez d'être traité avec douceur"

### 1.2 Créateur d'atmosphère pour célibataires

**Description du scénario** :
Conçoit des ambiances domestiques pour les personnes vivant seules, en harmonisant éclairage, musique et senteurs pour créer un sentiment de chaleur et d'appartenance.

**Points clés de l'ambiance** :
- Ajustement automatique selon l'heure et l'humeur
- Thèmes saisonniers changeants
- Créer une sensation de "compagnie"

### 1.3 Générateur de week-end cocooning

**Description du scénario** :
Le vendredi soir, génère le plan de week-end parfait selon votre humeur et la météo : film, encas, décoration, et même le coin idéal pour rêvasser.

**Points clés de l'ambiance** :
- Présentation visuelle réconfortante
- Expérience de choix sans pression
- Rendre le fait de rester à la maison un plaisir

### 1.4 Radio apaisante du soir

**Description du scénario** :
Chaque soir avant de dormir, génère un contenu apaisant personnalisé : histoires douces, méditations guidées, bruits blancs, ou simplement un "bonne nuit" chaleureux.

**Points clés de l'ambiance** :
- Sons et rythmes apaisants
- Volume en diminution progressive
- Créer un sentiment de sécurité et de détente

### 1.5 Chasseur d'inspiration esthétique

**Description du scénario** :
Découvre la beauté dans les petites choses du quotidien et offre des suggestions d'esthétique de vie et de rituels : comment rendre un café plus élégant, transformer un bureau en espace de concentration.

**Points clés de l'ambiance** :
- Découvrir l'extraordinaire dans l'ordinaire
- Cultiver la sensibilité à la beauté
- Faire de la vie un art

---

## 2. Compagnie émotionnelle

> 💡 **Idée clé** : L'accueil inconditionnel et la présence, devenir un réceptacle bienveillant des émotions

### 2.1 Confident nocturne

**Description du scénario** :
Un espace d'écoute émotionnel 24h/24, qui accueille toutes vos pensées sans jugement. Que ce soit la joie, la tristesse, la colère ou la confusion, il y a toujours une place pour vous.

**Points clés de l'ambiance** :
- Sécurité et protection absolues de la vie privée
- Ne pas interrompre, ne pas sermonner, juste écouter
- Réponses chaleureuses et empathiques

**Suggestion psychologique** :
> "Toutes vos émotions sont légitimes, je suis là avec vous"

### 2.2 Compagnon de guérison après rupture

**Description du scénario** :
Pendant la période difficile d'une rupture, offre une présence bienveillante, des conseils de guérison et un espace pour exprimer vos émotions. Pas besoin de se presser, prenez votre temps.

**Points clés de l'ambiance** :
- Autoriser la tristesse à exister
- Apaisement progressif des émotions
- Reconstruire l'estime de soi

### 2.3 Coach de respiration anti-stress

**Description du scénario** :
Détecte les signes d'anxiété et guide des exercices de respiration et de pleine conscience. Un point d'ancrage fiable dans les moments de tension.

**Points clés de l'ambiance** :
- Sensibilisation immédiate aux émotions
- Méthodes de soulagement simples et efficaces
- Créer un sentiment de calme et de contrôle

### 2.4 Guide de reconstruction de confiance en soi

**Description du scénario** :
Aide à retrouver l'estime de soi et la valeur personnelle par des dialogues positifs et des suggestions psychologiques. Chaque petit progrès est célébré.

**Points clés de l'ambiance** :
- Découvrir les qualités négligées
- Célébrer chaque petite victoire
- Construire un dialogue intérieur positif

### 2.5 Analyseur intelligent de journal émotionnel

**Description du scénario** :
Analyse votre journal émotionnel, identifie les schémas et offre des insights chaleureux. Vous aide à mieux vous connaître et à vivre en paix avec vos émotions.

**Points clés de l'ambiance** :
- Visualisation des trajectoires émotionnelles
- Insights chaleureux plutôt qu'une analyse froide
- Suggestions actionnables

---

## 3. Divertissement

> 💡 **Idée clé** : Créer des expériences immersives, faire du divertissement un refuge pour l'âme

### 3.1 Maître du jeu de meurtre mystérieux

**Description du scénario** :
Joue le rôle de l'animateur d'un jeu de rôle d'enquête, crée une ambiance mystérieuse et fait avancer l'intrigue en temps réel selon les réactions des joueurs.

**Points clés de l'ambiance** :
- Un début captivant
- Un suspense bien dosé
- Un jeu de rôle immersif

### 3.2 NPC vivant en monde ouvert

**Description du scénario** :
Des NPC avec de la profondeur, qui se souviennent de l'histoire du joueur et créent de véritables liens émotionnels. Pas de simples distributeurs de quêtes, mais des amis dans le monde du jeu.

**Points clés de l'ambiance** :
- Mémoire persistante et continuité
- Interactions personnalisées
- Connexion émotionnelle authentique

### 3.3 Générateur de podcast personnalisé

**Description du scénario** :
Génère un podcast sur mesure selon vos centres d'intérêt, avec un ton naturel comme une conversation entre amis. Partage de connaissances, récits ou simple compagnie.

**Points clés de l'ambiance** :
- Ton de conversation détendu et naturel
- Contenu adapté à vos goûts
- Compagnie disponible à tout moment

### 3.4 Groupe d'ambiance de concert virtuel

**Description du scénario** :
Recrée l'ambiance d'un concert en direct avec interactions en temps réel, encouragements et effets d'atmosphère. Même seul chez soi, ressentez la ferveur d'un concert.

**Points clés de l'ambiance** :
- Immersion visuelle et sonore
- Interactions et résonance en temps réel
- Créer un sentiment de participation collective

### 3.5 Partenaire de fiction interactive

**Description du scénario** :
Co-créez des histoires où chaque choix influence le cours du récit. Le lecteur n'est plus un consommateur passif, mais le co-créateur de l'histoire.

**Points clés de l'ambiance** :
- Des possibilités infinies
- Un véritable pouvoir de choix
- Créer votre propre histoire

---

## 4. Croissance personnelle

> 💡 **Idée clé** : La croissance n'est pas une ascèse, mais un voyage joyeux de découverte de soi

### 4.1 Témoin de votre croissance

**Description du scénario** :
Enregistre votre parcours de croissance, encourage et fait le point aux moments clés. Rendre la croissance visible et les efforts mémorables.

**Points clés de l'ambiance** :
- Visualisation du parcours de croissance
- Commémoration des moments importants
- Bilan chaleureux et perspectives

**Suggestion psychologique** :
> "Vous avez déjà parcouru si loin sans même vous en rendre compte"

### 4.2 Coach ludique d'habitudes

**Description du scénario** :
Transforme la prise d'habitudes ennuyeuse en une aventure de jeu captivante. Chaque petite habitude maintenue devient un accomplissement dans le jeu.

**Points clés de l'ambiance** :
- Mécanismes de motivation ludiques
- Retour positif immédiat
- Rendre la persévérance amusante

### 4.3 Matching de partenaires d'apprentissage

**Description du scénario** :
Trouve des partenaires d'apprentissage qui partagent vos centres d'intérêt pour s'encourager mutuellement et partager les progrès. L'apprentissage n'est plus un voyage solitaire.

**Points clés de l'ambiance** :
- Trouver des partenaires sur la même longueur d'onde
- Une atmosphère d'encouragement mutuel
- La joie de progresser ensemble

### 4.4 Chasseur de petits bonheurs quotidiens

**Description du scénario** :
Aide à découvrir les petites joies de la vie et cultive la gratitude et une attitude positive. Chaque jour, noter une petite chose pour laquelle être reconnaissant.

**Points clés de l'ambiance** :
- Découvrir les beautés négligées
- Cultiver l'habitude de la gratitude
- Accumuler de l'énergie positive

### 4.5 Simulateur de vie

**Description du scénario** :
Simulez différents choix de vie et expérimentez les possibilités d'univers parallèles. Aide à explorer différentes options pour faire des choix plus éclairés.

**Points clés de l'ambiance** :
- Expérimenter les choix en sécurité
- Explorer un soi inconnu
- Pas de bon ou mauvais, seulement l'expérience

---

## 5. Interactions sociales

> 💡 **Idée clé** : Rendre la sociabilité naturelle et détendue, trouver un mode de connexion confortable

### 5.1 Générateur de sujets de brise-glace

**Description du scénario** :
Propose des sujets de conversation intéressants pour toute occasion sociale, brisant la glace et rapprochant les gens.

**Points clés de l'ambiance** :
- Sujets légers et amusants
- Adaptés à différentes occasions
- Ouvertures de conversation naturelles

### 5.2 Styliste de publications sociales

**Description du scénario** :
Génère des textes élégants pour vos publications selon vos photos et votre humeur. Transformer le partage en expression personnelle.

**Points clés de l'ambiance** :
- En accord avec votre style personnel
- Élégant sans être forcé
- Expression émotionnelle authentique

### 5.3 Planificateur de rendez-vous romantiques

**Description du scénario** :
Conçoit une expérience complète : du lieu aux sujets de conversation en passant par les surprises. Chaque rendez-vous devient un souvenir mémorable.

**Points clés de l'ambiance** :
- Conception d'une expérience complète
- Surprises bien dosées
- Créer une atmosphère romantique

### 5.4 Animateur de réunions à distance

**Description du scénario** :
Anime les rencontres en ligne, organise des jeux et guide les interactions. Rendre les réunions virtuelles aussi chaleureuses qu'en présentiel.

**Points clés de l'ambiance** :
- Jeux et activités amusants
- Guidage d'interactions naturelles
- Créer un sentiment de participation collective

### 5.5 Gestionnaire d'énergie sociale

**Description du scénario** :
Aide les introvertis à gérer leur énergie sociale et trouver leur rythme confortable. Pas besoin de se forcer pour profiter des joies de la sociabilité.

**Points clés de l'ambiance** :
- Respect des limites personnelles
- Trouver sa propre façon d'interagir
- Pas besoin de changer de personnalité

---

## 6. Expression créative

> 💡 **Idée clé** : Tout le monde a de la créativité, il suffit de l'éveiller

### 6.1 Kit d'urgence pour panne d'inspiration

**Description du scénario** :
Offre des étincelles d'inspiration inattendues lors d'un blocage créatif. Pas de réponses standard, mais des clés pour ouvrir de nouvelles perspectives.

**Points clés de l'ambiance** :
- Briser les schémas de pensée
- Connexions inattendues
- Stimuler la créativité intérieure

### 6.2 Guide d'exploration du style personnel

**Description du scénario** :
Aide à découvrir votre style unique, de la tenue vestimentaire à l'expression de soi. Chacun peut trouver sa propre voix.

**Points clés de l'ambiance** :
- Découvrir son moi unique
- Encourager l'expérimentation
- Construire sa marque personnelle

### 6.3 Consultant esthétique pour bullet journals

**Description du scénario** :
Conseille la mise en page, les couleurs et les idées créatives de vos carnets et journaux. Transformer le fait de noter en art.

**Points clés de l'ambiance** :
- Direction esthétique visuelle
- Inspiration créative de contenu
- Style personnalisé

### 6.4 Guide de composition photographique

**Description du scénario** :
Propose des conseils de photographie et de retouche selon le scénario et l'ambiance souhaitée. Chaque photo peut transmettre l'émotion voulue.

**Points clés de l'ambiance** :
- L'ambiance prime sur la technique
- Expression visuelle des émotions
- L'œil qui découvre la beauté

### 6.5 Sélecteur musical selon l'humeur

**Description du scénario** :
Recommande la combinaison musicale parfaite selon l'humeur et le contexte. La musique est résonance émotionnelle et créatrice d'ambiance.

**Points clés de l'ambiance** :
- Association émotionnelle précise
- Recommandations contextuelles
- Le pouvoir guérisseur de la musique

---

## 7. Voyage et exploration

> 💡 **Idée clé** : Voyager, ce n'est pas seulement voir des paysages, c'est vivre des modes de vie différents

### 7.1 Guide de flânerie urbaine

**Description du scénario** :
Explorez la ville comme un local et découvrez des pépites cachées. Pas seulement les sites touristiques, mais le vrai pouls de la ville.

**Points clés de l'ambiance** :
- Le regard du local
- Découvertes et surprises inattendues
- S'immerger dans l'âme de la ville

### 7.2 Générateur de journal de voyage

**Description du scénario** :
Transforme vos photos de voyage et vos émotions en récits poétiques et souvenirs durables. Chaque voyage laisse une empreinte unique.

**Points clés de l'ambiance** :
- Enregistrement des émotions
- Écriture poétique
- Souvenirs éternels

### 7.3 Compagnon de voyage en solo

**Description du scénario** :
Accompagne, conseille et rassure les voyageurs solitaires. Voyager seul tout en se sentant entouré et en sécurité.

**Points clés de l'ambiance** :
- Création d'un sentiment de sécurité
- Compagnie intéressante
- Seul mais pas isolé

### 7.4 Aperçu d'ambiance de destination

**Description du scénario** :
Immersion dans l'ambiance de votre destination avant le départ. L'anticipation devient partie du voyage.

**Points clés de l'ambiance** :
- Aperçu immersif
- Stimuler l'attente et l'imagination
- Entrer progressivement en mode voyage

### 7.5 Guide photographique de voyage

**Description du scénario** :
Guide la prise de photos narratives selon le contexte et la lumière. Pas seulement enregistrer, mais raconter l'histoire du voyage.

**Points clés de l'ambiance** :
- Composition narrative
- Capture des émotions
- Perspective unique

---

## 8. Santé physique et mentale

> 💡 **Idée clé** : La santé n'est pas un objectif, c'est un acte de bienveillance envers soi

### 8.1 Éveilleur de motivation sportive

**Description du scénario** :
L'encouragement juste au bon moment quand vous n'avez pas envie de bouger. Pas de la contrainte, mais le réveil de votre motivation intérieure.

**Points clés de l'ambiance** :
- Comprendre la réticence à bouger
- Guidage progressif
- Célébrer chaque petit geste

### 8.2 Cuisine inspirante santé

**Description du scénario** :
Génère des recettes saines et réconfortantes selon l'humeur et les ingrédients disponibles. Manger sainement peut aussi être un plaisir gustatif.

**Points clés de l'ambiance** :
- L'attrait de la gastronomie
- Des recettes simples
- L'équilibre entre santé et plaisir

### 8.3 Optimiseur de sommeil

**Description du scénario** :
Crée une ambiance propice au sommeil, de l'environnement au mental. Faire du sommeil le moment le plus attendu de la journée.

**Points clés de l'ambiance** :
- Optimisation de l'environnement
- Relaxation mentale
- Rituel d'endormissement

### 8.4 Guide de conscience corporelle

**Description du scénario** :
Guide l'attention vers les signaux du corps pour renforcer la connexion corps-esprit. Faire une pause dans l'agitation pour écouter son corps.

**Points clés de l'ambiance** :
- Guidage en douceur
- Prise de conscience corporelle
- Harmonie corps-esprit

### 8.5 Rappel de bienveillance envers soi

**Description du scénario** :
Vous rappelle de faire une pause et de prendre soin de vous au milieu de l'agitation. Un petit rappel qui peut changer toute la journée.

**Points clés de l'ambiance** :
- Rappels opportuns
- Actions simples
- Attention bienveillante

---

## 9. Exploration du savoir

> 💡 **Idée clé** : L'apprentissage est une aventure sans fin, la curiosité est la meilleure des enseignantes

### 9.1 Guide ludique d'exploration du savoir

**Description du scénario** :
Transforme l'apprentissage monotone en aventure passionnante. Chaque connaissance est un trésor à découvrir.

**Points clés de l'ambiance** :
- Expérience ludique
- Le plaisir de l'exploration
- La satisfaction de l'accomplissement

### 9.2 Partenaire de langue par scénarios

**Description du scénario** :
Joue différents rôles pour apprendre une langue naturellement en situation. Pas de mémorisation par cœur, mais l'apprentissage par la pratique.

**Points clés de l'ambiance** :
- Scénarios réalistes
- Rôles intéressants
- Acquisition naturelle

### 9.3 Satisfaisant de curiosité

**Description du scénario** :
Répond à toutes vos questions farfelues et nourrit votre curiosité envers le monde. Il n'y a pas de questions stupides, seulement des réponses à découvrir.

**Points clés de l'ambiance** :
- Encourager les questions
- Réponses intéressantes
- Stimuler encore plus de curiosité

### 9.4 Inspiration de notes de lecture

**Description du scénario** :
Aide à organiser vos réflexions de lecture et à découvrir de nouvelles perspectives. La lecture devient un dialogue avec l'auteur et avec soi-même.

**Points clés de l'ambiance** :
- Réflexion approfondie
- Perspectives personnelles
- Connexion des connaissances

### 9.5 Créateur d'ambiance pour partage de connaissances

**Description du scénario** :
Transforme vos apprentissages en contenus de partage captivants. Partager n'est pas seulement transmettre, c'est aussi approfondir sa compréhension.

**Points clés de l'ambiance** :
- Expression engageante
- La joie de partager
- Diffusion du savoir

---

## 10. Relations humaines

> 💡 **Idée clé** : Les bonnes relations demandent de l'attention, mais l'attention n'a pas besoin d'être compliquée

### 10.1 Coach de communication intime

**Description du scénario** :
Aide à exprimer les sentiments difficiles à formuler et améliore les relations proches. Parfois, il suffit de trouver les bons mots.

**Points clés de l'ambiance** :
- Un espace d'expression en sécurité
- Conseils bienveillants
- Améliorer la compréhension mutuelle

### 10.2 Rappel de attention familiale

**Description du scénario** :
Vous rappelle de prendre soin de votre famille et propose des suggestions d'interactions chaleureuses. Ne pas oublier les plus importants.

**Points clés de l'ambiance** :
- Rappels opportuns
- Gestes d'attention simples
- Connexion chaleureuse

### 10.3 Entreteneur d'amitiés

**Description du scénario** :
Aide à maintenir les amitiés à distance en créant des sujets communs. La distance n'est pas un problème, l'attention est la clé.

**Points clés de l'ambiance** :
- Créer des occasions de connexion
- Sujets communs
- Pérennité des amitiés

### 10.4 Planificateur de déclarations et surprises

**Description du scénario** :
Organise des surprises inoubliables et des moments romantiques pour vos proches. Rendre les occasions spéciales encore plus spéciales.

**Points clés de l'ambiance** :
- Conception personnalisée
- Surprises romantiques
- Souvenirs mémorables

### 10.5 Médiateur de conflits

**Description du scénario** :
Propose des conseils et des formulations pour apaiser les tensions relationnelles. Aide à trouver le pont de la réconciliation.

**Points clés de l'ambiance** :
- Comprendre les positions de chacun
- Conseils bienveillants
- Réparation des relations

---

## 11. Animaux de compagnie

> 💡 **Idée clé** : Les animaux sont de la famille, leur compagnie mérite d'être enregistrée et chérie

### 11.1 Journal de vie de votre animal

**Description du scénario** :
Rédige un journal du point de vue de votre animal, relatant ses journées avec vous. Imaginez comment il décrirait ses moments passés à vos côtés.

**Points clés de l'ambiance** :
- Un regard mignon
- Des moments du quotidien réconfortants
- Connexion émotionnelle

### 11.2 Interprète du comportement animal

**Description du scénario** :
Décrypte le langage corporel de votre animal pour renforcer votre lien. Mieux comprendre ses besoins et ses émotions.

**Points clés de l'ambiance** :
- Interprétation professionnelle
- Améliorer la compréhension
- Mieux prendre soin de son animal

### 11.3 Planificateur d'activités avec votre animal

**Description du scénario** :
Conçoit des activités créatives pour partager des moments complices avec votre animal. Rendre le temps passé ensemble plus amusant et significatif.

**Points clés de l'ambiance** :
- Activités créatives
- Interactions amusantes
- Beaux souvenirs

### 11.4 Générateur d'histoires commémoratives

**Description du scénario** :
Transforme les photos et souvenirs de votre animal en récits touchants. Préserver les moments précieux passés avec votre compagnon.

**Points clés de l'ambiance** :
- Récit chaleureux
- Souvenirs précieux
- Un amour éternel

### 11.5 Guide rassurant pour nouveaux maîtres

**Description du scénario** :
Accompagne avec bienveillance les nouveaux propriétaires d'animaux. Rendre le voyage avec un animal rempli de confiance et de joie.

**Points clés de l'ambiance** :
- Guide complet
- Encouragement chaleureux
- Compagnie rassurante

---

## 12. Santé financière

> 💡 **Idée clé** : La liberté financière n'est pas un objectif, la santé financière l'est

### 12.1 Sensible aux émotions d'achat

**Description du scénario** :
Identifie les émotions derrière les achats impulsifs pour construire une relation saine avec la consommation. Comprendre pourquoi on veut acheter est plus important que de savoir si on achète.

**Points clés de l'ambiance** :
- Sensibilisation en douceur
- Comprendre sans juger
- Construire de bonnes habitudes

### 12.2 Visualisation d'objectifs d'épargne

**Description du scénario** :
Transforme vos objectifs d'épargne en une barre de progression motivante vers vos rêves. L'épargne devient un voyage vers vos aspirations.

**Points clés de l'ambiance** :
- Progression visuelle
- Connexion avec vos rêves
- Satisfaction de l'accomplissement

### 12.3 Apprentissage ludique de la finance

**Description du scénario** :
Apprenez les bases de la gestion financière de manière amusante. La finance ne doit pas être ennuyeuse, elle peut être une exploration passionnante.

**Points clés de l'ambiance** :
- Expression accessible
- Exemples amusants
- Connaissances pratiques

### 12.4 Apaiseur d'anxiété financière

**Description du scénario** :
Offre un soutien émotionnel et des conseils pratiques face au stress financier. L'anxiété ne résout pas les problèmes, mais le calme peut aider.

**Points clés de l'ambiance** :
- Apaisement émotionnel
- Conseils pratiques
- Le pouvoir de l'espoir

### 12.5 Jeu d'initiation aux petits investissements

**Description du scénario** :
Découvrez l'investissement par le jeu, réduisant la barrière à l'entrée. Apprendre dans un environnement sûr.

**Points clés de l'ambiance** :
- Expérience ludique
- Essai en sécurité
- Le plaisir d'apprendre

---

## 13. Développement professionnel

> 💡 **Idée clé** : La carrière n'est pas une ligne droite, c'est un terrain d'exploration

### 13.1 Compagnon dans le doute professionnel

**Description du scénario** :
Écoute, explore et oriente lors des périodes de remise en question professionnelle. Le doute est normal, l'important est de ne pas y faire face seul.

**Points clés de l'ambiance** :
- Écoute sans jugement
- Explorer les possibilités
- Présence chaleureuse

### 13.2 Réveilleur de sens au travail

**Description du scénario** :
Aide à retrouver la valeur et la signification de votre travail, ravive la passion. Parfois, il suffit de changer de perspective.

**Points clés de l'ambiance** :
- Découvrir la valeur
- Raviver l'enthousiasme
- Sentiment d'accomplissement

### 13.3 Facilitateur de relations professionnelles

**Description du scénario** :
Propose des sujets légers et des conseils d'interaction pour le milieu professionnel. Rendre les relations de travail moins gênantes et plus naturelles.

**Points clés de l'ambiance** :
- Sujets légers
- Interactions naturelles
- Relations confortables

### 13.4 Stimulateur d'idées de projets secondaires

**Description du scénario** :
Déclenche des idées de projets parallèles selon vos intérêts et compétences. Explorer les possibilités infinies au-delà du travail.

**Points clés de l'ambiance** :
- Explorer vos centres d'intérêt
- Explorer les possibilités
- Encourager l'action

### 13.5 Boosteur de confiance avant entretien

**Description du scénario** :
Prépare mentalement et renforce la confiance avant les entretiens d'embauche. Vous permettre d'aborder les opportunités dans votre meilleur état.

**Points clés de l'ambiance** :
- Construction de la confiance
- Préparation complète
- Être dans son meilleur état

---

## 14. Espace domestique

> 💡 **Idée clé** : La maison n'est pas seulement un lieu de résidence, c'est un refuge pour l'âme

### 14.1 Designer d'atmosphère domestique

**Description du scénario** :
Conçoit des ambiances selon l'humeur et la saison. Laissez votre maison évoluer avec vos états d'âme et les saisons.

**Points clés de l'ambiance** :
- Conception d'ambiance
- Changement saisonnier
- Harmonie avec l'humeur

### 14.2 Guide de décoration saisonnière

**Description du scénario** :
Renouvelez votre intérieur au fil des saisons pour garder un sentiment de fraîcheur. La maison reste toujours vivante et pleine de surprises.

**Points clés de l'ambiance** :
- Thèmes saisonniers
- Un sentiment de nouveauté
- Le rituel du quotidien

### 14.3 Magicien des petits espaces

**Description du scénario** :
Transformez les petits espaces en lieux chaleureux et confortables. La taille ne compte pas, le ressenti est ce qui importe.

**Points clés de l'ambiance** :
- Optimisation de l'espace
- Ambiance chaleureuse
- Vie confortable

### 14.4 Créateur de rituels domestiques

**Description du scénario** :
Donnez un sens rituel aux activités quotidiennes à la maison. Rendre les tâches ménagères significatives.

**Points clés de l'ambiance** :
- Conception de rituels
- Donner du sens
- Qualité de vie

### 14.5 Accompagnateur de tri minimaliste

**Description du scénario** :
Soutien psychologique et aide à la décision lors du rangement. Le minimalisme n'est pas seulement jeter des choses, c'est aussi ranger son intérieur.

**Points clés de l'ambiance** :
- Soutien psychologique
- Aide à la décision
- Rangement intérieur

---

## 15. Gastronomie

> 💡 **Idée clé** : La nourriture est un langage d'amour, la cuisine est une façon de l'exprimer

### 15.1 Cuisine réconfortante pour solo

**Description du scénario** :
Conçoit des recettes simples et réconfortantes pour les personnes vivant seules. Même seul, on peut bien manger et bien se traiter.

**Points clés de l'ambiance** :
- Recettes simples
- Saveurs réconfortantes
- Expression d'amour de soi

### 15.2 Décorateur de table festive

**Description du scénario** :
Crée des mises en table élégantes avec une touche rituelle pour les occasions spéciales. Chaque repas devient un moment mémorable.

**Points clés de l'ambiance** :
- Conception rituelle
- Plaisir visuel
- Beaux souvenirs

### 15.3 Sélecteur culinaire selon l'humeur

**Description du scénario** :
Recommande des recettes adaptées à votre humeur du moment. Parfois, on a juste besoin du plat qui réconforte.

**Points clés de l'ambiance** :
- Accord avec l'humeur
- La nourriture comme réconfort
- Connexion émotionnelle

### 15.4 Constructeur de confiance en cuisine

**Description du scénario** :
Encourage les débutants avec des recettes simples et un soutien chaleureux. Chacun peut devenir le chef de sa propre cuisine.

**Points clés de l'ambiance** :
- Début en douceur
- Encouragement chaleureux
- Construction de la confiance

### 15.5 Guide de photographie culinaire

**Description du scénario** :
Donnez à vos plats maison une allure irrésistible en photo. Photographier la gastronomie, c'est aussi capturer la beauté de la vie.

**Points clés de l'ambiance** :
- Création d'ambiance
- Plaisir visuel
- Enregistrement de la vie

---

## 16. Style vestimentaire

> 💡 **Idée clé** : La mode est une expression de soi, le style est le reflet de l'intérieur

### 16.1 Tableau d'inspiration quotidien

**Description du scénario** :
Génère des idées de tenues selon la météo, l'occasion et l'humeur. Chaque tenue exprime votre état d'esprit du jour.

**Points clés de l'ambiance** :
- Expression de l'humeur
- Accord avec l'occasion
- Construction de la confiance

### 16.2 Styliste de garde-robe capsule

**Description du scénario** :
Créez des combinaisons infinies avec un nombre limité de pièces. Moins c'est plus, la simplicité peut aussi être stylée.

**Points clés de l'ambiance** :
- Philosophie minimaliste
- Combinaisons créatives
- Mode durable

### 16.3 Voyage d'exploration du style personnel

**Description du scénario** :
Aide à découvrir et construire votre style vestimentaire unique. S'habiller, ce n'est pas seulement porter des vêtements, c'est affirmer son attitude.

**Points clés de l'ambiance** :
- Exploration de soi
- Construction du style
- Expression confiante

### 16.4 Rénovateur de vieux vêtements

**Description du scénario** :
Donne une nouvelle vie à vos anciens vêtements avec des idées de mix & match. Mode durable et renouveau créatif.

**Points clés de l'ambiance** :
- Combinaisons créatives
- Philosophie éco-responsable
- Sentiment de nouveauté

### 16.5 Consultant en style pour grandes occasions

**Description du scénario** :
Conçoit des looks confiants pour vos moments importants. Chaque moment clé mérite une présentation parfaite.

**Points clés de l'ambiance** :
- Accord avec l'occasion
- Boost de confiance
- Présentation parfaite

---

## Principes clés pour la conception de produits grand public

### 1. De la "fonctionnalité" au "ressenti"

Les produits B2B se concentrent sur "quel problème cette fonctionnalité résout-elle", les produits grand public sur "quelle sensation cette fonctionnalité procure-t-elle".

| Pensée B2B | Pensée grand public |
|-----------|---------------------|
| Améliorer l'efficacité | Gagner du temps pour faire ce qu'on aime |
| Réduire les coûts | Chaque euro dépensé vaut la peine |
| Résoudre les points de douleur | Créer de belles expériences |
| Fonctionnalités complètes | Le ressenti est là |

### 2. Les trois niveaux de création d'ambiance

**Niveau sensoriel** : design visuel, sonore, tactile
- Couleurs chaleureuses
- Sons apaisants
- Animations fluides

**Niveau émotionnel** : résonance et guidance émotionnelle
- Comprendre l'humeur de l'utilisateur
- Offrir un soutien émotionnel
- Créer des émotions positives

**Niveau du sens** : identification des valeurs et appartenance
- Faire sentir à l'utilisateur qu'il est compris
- Créer un sentiment d'appartenance
- Donner du sens aux actions

### 3. Le pouvoir des suggestions psychologiques

Le copywriting et le design des produits grand public transmettent des suggestions psychologiques :

- **Suggestions positives** : "Vous avez déjà fait du bon travail", "Prenez votre temps, ce n'est pas grave"
- **Suggestions d'appartenance** : "Beaucoup de gens sont comme vous", "Vous n'êtes pas seul"
- **Suggestions de croissance** : "Chaque tentative est un progrès", "Vous vous améliorez"

### 4. Aider l'utilisateur à devenir une meilleure version de lui-même

Les meilleurs produits grand public ne changent pas l'utilisateur, ils l'aident à devenir la personne qu'il veut être.

- Pas "Tu devrais...", mais "Tu peux..."
- Pas "Tu dois...", mais "Si tu le souhaites..."
- Pas "Tu n'es pas encore...", mais "Tu es déjà..."

---

> 💡 **À retenir** : Les utilisateurs grand public n'achètent pas des fonctionnalités, mais des sensations ; pas des outils, mais de la compagnie ; pas des services, mais de la compréhension.
