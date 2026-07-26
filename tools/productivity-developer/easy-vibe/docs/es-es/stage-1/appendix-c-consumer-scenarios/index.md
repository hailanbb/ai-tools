---
title: 'Referencia de inspiracion para escenarios de consumo B2C'
description: 'Una coleccion de direcciones creativas de aplicacion de modelos LLM en escenarios de consumo B2C, cubriendo estilo de vida, compania emocional, entretenimiento y mas.'
---

<script setup>
import { computed, ref } from 'vue'

const duration = 'aprox. <strong>4 horas</strong>'

const vibePoint = ref('')
const feeling = ref('')

// Pool de temas por escenario: énfasis en sensación, ambiente y sugestión psicológica
const topicPool = {
  'lifestyle': [
    { title: 'Asistente de despertar con ritual matutino', desc: 'Genera rituales matutinos según clima, agenda y ánimo para empezar bien cada día' },
    { title: 'Creador de ambiente para vivir solo', desc: 'Diseña ambientes domésticos para quienes viven solos, con sugerencias de luz, música y aromas' },
    { title: 'Generador de planes reparadores de fin de semana en casa', desc: 'Recomienda la combinación perfecta según el ánimo: película + snacks + ambientación' },
    { title: 'Radio calmante antes de dormir', desc: 'Genera historias suaves y meditaciones guiadas como una radio privada para conciliar el sueño' },
    { title: 'Capturador de inspiración estética cotidiana', desc: 'Descubre belleza en lo cotidiano y genera sugerencias estéticas con sentido de ritual' }
  ],
  'emotion': [
    { title: 'Confidente nocturno', desc: 'Un espacio emocional disponible 24 horas, sin juicio, para recibir cualquier preocupación' },
    { title: 'Acompañante para sanar una ruptura', desc: 'Ofrece compañía amable, consejos de recuperación y salida emocional durante una ruptura' },
    { title: 'Coach de respiración contra la ansiedad', desc: 'Percibe la ansiedad y guía ejercicios de respiración y mindfulness' },
    { title: 'Mentor para reconstruir la confianza', desc: 'Ayuda a reconstruir identidad y valor personal con diálogo positivo y sugestión psicológica' },
    { title: 'Interpretación inteligente del diario emocional', desc: 'Analiza diarios emocionales, encuentra patrones y ofrece ideas y consejos cálidos' }
  ],
  'entertainment': [
    { title: 'DM inmersivo para juegos de misterio', desc: 'Actúa como anfitrión, crea suspense y hace avanzar la trama' },
    { title: 'NPC con alma en juegos de mundo abierto', desc: 'NPC con personalidad que recuerda historias del jugador y genera vínculos emocionales reales' },
    { title: 'Generación de podcasts personalizados', desc: 'Genera podcasts exclusivos según intereses, con naturalidad de conversación entre amigos' },
    { title: 'Equipo de ambiente para concierto virtual', desc: 'Crea sensación de directo en conciertos online con interacción, apoyo y ambiente en tiempo real' },
    { title: 'Compañero de cocreación de novela interactiva', desc: 'Crea historias junto con lectores; cada elección cambia el rumbo del mundo' }
  ],
  'growth': [
    { title: 'Testigo del crecimiento personal', desc: 'Registra la trayectoria de crecimiento y ofrece ánimo y revisión en hitos importantes' },
    { title: 'Coach gamificado de hábitos', desc: 'Convierte la formación de hábitos en una aventura divertida' },
    { title: 'Emparejador de compañeros para aprender habilidades', desc: 'Encuentra compañeros afines para supervisarse y compartir avances' },
    { title: 'Descubridor diario de pequeñas alegrías', desc: 'Ayuda a descubrir pequeños momentos bellos y cultivar gratitud y optimismo' },
    { title: 'Simulador de experiencias de vida', desc: 'Simula decisiones vitales y explora posibilidades de vidas paralelas' }
  ],
  'social': [
    { title: 'Generador de temas rompehielos', desc: 'Ofrece temas interesantes en situaciones sociales para reducir incomodidad y acercar personas' },
    { title: 'Redactor de ambiente para publicaciones sociales', desc: 'Genera textos con estilo según fotos y estado de ánimo' },
    { title: 'Planificador de ambiente para citas', desc: 'Diseña una experiencia completa de cita: lugar, conversación y sorpresa' },
    { title: 'Animador de reuniones remotas', desc: 'Activa reuniones online con juegos e interacción guiada' },
    { title: 'Asistente de gestión de energía social', desc: 'Ayuda a personas introvertidas a gestionar energía y encontrar un ritmo social cómodo' }
  ],
  'creative': [
    { title: 'Kit de emergencia contra el bloqueo creativo', desc: 'Aporta chispas inesperadas cuando aparece el bloqueo creativo' },
    { title: 'Guía de exploración del estilo personal', desc: 'Ayuda a descubrir un estilo propio, desde la ropa hasta la expresión' },
    { title: 'Asesor estético para journaling y diarios', desc: 'Sugiere maquetación, paletas y contenido creativo para diarios' },
    { title: 'Guía de composición y ambiente fotográfico', desc: 'Ofrece consejos de foto y edición según escena y sensación buscada' },
    { title: 'Emparejador de música y estado de ánimo', desc: 'Recomienda la combinación musical perfecta según ánimo y contexto' }
  ],
  'travel': [
    { title: 'Guía para paseos urbanos', desc: 'Explora la ciudad como una persona local y descubre lugares ocultos' },
    { title: 'Generador de diario emocional de viaje', desc: 'Convierte fotos y emociones de viaje en relatos y recuerdos bellos' },
    { title: 'Acompañante para viajar en solitario', desc: 'Ofrece compañía, consejos y seguridad para viajar solo' },
    { title: 'Vista previa del ambiente del destino', desc: 'Permite sentir el destino antes de salir y entrar en ambiente' },
    { title: 'Guía de ambiente para fotografía de viaje', desc: 'Ayuda a tomar fotos con historia según escena y luz' }
  ],
  'health': [
    { title: 'Activador de motivación deportiva', desc: 'Da el empujón justo cuando no apetece moverse' },
    { title: 'Cocina de inspiración saludable', desc: 'Genera recetas saludables y reparadoras según ánimo e ingredientes' },
    { title: 'Optimizador de ambiente para dormir mejor', desc: 'Crea un entorno de sueño de calidad desde lo ambiental hasta lo psicológico' },
    { title: 'Guía de conciencia corporal', desc: 'Guía la atención hacia señales del cuerpo y fortalece la conexión cuerpo-mente' },
    { title: 'Recordatorio de autocuidado', desc: 'Recuerda detenerse y cuidarse en medio del ajetreo' }
  ],
  'learning': [
    { title: 'Guía gamificada de exploración del conocimiento', desc: 'Convierte el aprendizaje aburrido en una aventura de exploración' },
    { title: 'Compañero situacional para aprender idiomas', desc: 'Interpreta roles distintos para aprender idioma de forma natural en diálogos' },
    { title: 'Asistente para satisfacer la curiosidad', desc: 'Responde ideas curiosas y alimenta la curiosidad por el mundo' },
    { title: 'Inspirador de notas de lectura', desc: 'Ayuda a ordenar reflexiones de lectura y encontrar nuevos ángulos' },
    { title: 'Creador de ambiente para compartir conocimiento', desc: 'Convierte lo aprendido en contenido interesante para compartir' }
  ],
  'relationship': [
    { title: 'Coach de comunicación para relaciones íntimas', desc: 'Ayuda a expresar emociones difíciles y mejorar relaciones cercanas' },
    { title: 'Asistente de cuidado familiar', desc: 'Recuerda cuidar a la familia y ofrece sugerencias de interacción cálida' },
    { title: 'Creador de ambiente para mantener amistades', desc: 'Ayuda a sostener amistades a distancia y crear temas comunes' },
    { title: 'Planificador de confesiones y sorpresas', desc: 'Diseña sorpresas y momentos románticos memorables para personas importantes' },
    { title: 'Guía para suavizar conflictos', desc: 'Ofrece consejos y frases para aliviar tensiones relacionales' }
  ],
  'pet': [
    { title: 'Diario antropomórfico de mascotas', desc: 'Genera diarios desde la perspectiva de la mascota y registra momentos cálidos' },
    { title: 'Intérprete del comportamiento animal', desc: 'Interpreta lenguaje conductual y profundiza el vínculo con la mascota' },
    { title: 'Planificador de tiempo de calidad con mascotas', desc: 'Diseña actividades creativas para interactuar y fortalecer el afecto' },
    { title: 'Generador de historias conmemorativas de mascotas', desc: 'Convierte fotos y recuerdos de la mascota en historias cálidas' },
    { title: 'Guía tranquila para nuevos cuidadores', desc: 'Ofrece compañía y orientación amable a nuevos dueños de mascotas' }
  ],
  'finance': [
    { title: 'Asistente de conciencia emocional del consumo', desc: 'Detecta emociones detrás de compras impulsivas y construye una visión saludable del consumo' },
    { title: 'Motivación visual para metas de ahorro', desc: 'Convierte metas de ahorro en progreso visual hacia sueños' },
    { title: 'Aprendizaje ligero de finanzas personales', desc: 'Enseña finanzas de manera ligera y entretenida' },
    { title: 'Aliviador de ansiedad financiera', desc: 'Ofrece apoyo emocional y consejos prácticos ante presión financiera' },
    { title: 'Juego de inversión de bajo monto', desc: 'Permite experimentar la inversión de forma gamificada y con menor barrera de entrada' }
  ],
  'career': [
    { title: 'Acompañante para la confusión profesional', desc: 'Escucha, explora y orienta durante etapas de duda profesional' },
    { title: 'Activador de sentido de logro laboral', desc: 'Ayuda a descubrir valor y sentido en el trabajo y reavivar entusiasmo' },
    { title: 'Asistente de ambiente social en el trabajo', desc: 'Propone temas ligeros y consejos de interacción para el entorno laboral' },
    { title: 'Generador de inspiración para proyectos paralelos', desc: 'Activa ideas de side projects según intereses y habilidades' },
    { title: 'Estación de confianza antes de entrevistas', desc: 'Ofrece preparación psicológica y ánimo antes de entrevistas' }
  ],
  'home': [
    { title: 'Diseñador de ambiente para el hogar', desc: 'Diseña ambientes domésticos según estado de ánimo y estación' },
    { title: 'Guía de transformación estacional del hogar', desc: 'Renueva la decoración por temporada para mantener frescura' },
    { title: 'Magia para espacios pequeños', desc: 'Hace que los espacios pequeños se sientan cómodos y cálidos' },
    { title: 'Creador de rituales domésticos', desc: 'Crea rituales para actividades cotidianas del hogar' },
    { title: 'Acompañamiento psicológico para decluttering', desc: 'Ofrece apoyo psicológico y consejos de decisión al ordenar objetos' }
  ],
  'food': [
    { title: 'Cocina reparadora para comer a solas', desc: 'Diseña comidas sencillas y reconfortantes para quienes viven solos' },
    { title: 'Diseño de ambiente para mesas festivas', desc: 'Diseña mesas con ritual para días especiales' },
    { title: 'Emparejador de cocina y estado de ánimo', desc: 'Recomienda alimentos y preparaciones según el ánimo actual' },
    { title: 'Generador de confianza para principiantes en cocina', desc: 'Ofrece ánimo cálido y recetas sencillas a quienes empiezan desde cero' },
    { title: 'Guía de ambiente para fotografía gastronómica', desc: 'Hace que la comida casera también se vea apetecible en fotos' }
  ],
  'fashion': [
    { title: 'Mood board del outfit de hoy', desc: 'Genera inspiración de vestimenta según clima, ocasión y ánimo' },
    { title: 'Estilista de armario cápsula', desc: 'Crea infinitas combinaciones con prendas limitadas' },
    { title: 'Viaje de exploración del estilo personal', desc: 'Ayuda a descubrir y construir un estilo personal único' },
    { title: 'Creativo para reinventar ropa antigua', desc: 'Da nueva inspiración para combinar ropa antigua' },
    { title: 'Asesor de look para ocasiones especiales', desc: 'Diseña looks que den confianza para momentos importantes' }
  ]
}

// Mapa predefinido de recomendaciones según ambiente y sensación
const recommendationMap = {
  // Ambiente: reparador
  'healing': {
    'relax': ['emotion', 'lifestyle', 'health', 'home'],
    'inspire': ['creative', 'growth', 'learning', 'entertainment'],
    'connect': ['relationship', 'social', 'pet', 'emotion'],
    'escape': ['travel', 'entertainment', 'creative', 'lifestyle']
  },
  // Ambiente: crecimiento
  'growth': {
    'relax': ['growth', 'learning', 'creative', 'health'],
    'inspire': ['career', 'learning', 'creative', 'growth'],
    'connect': ['social', 'relationship', 'career', 'learning'],
    'escape': ['travel', 'entertainment', 'creative', 'lifestyle']
  },
  // Ambiente: social
  'social': {
    'relax': ['social', 'pet', 'food', 'home'],
    'inspire': ['social', 'creative', 'entertainment', 'travel'],
    'connect': ['relationship', 'social', 'pet', 'travel'],
    'escape': ['social', 'travel', 'entertainment', 'creative']
  },
  // Ambiente: exploración
  'explore': {
    'relax': ['travel', 'creative', 'lifestyle', 'food'],
    'inspire': ['travel', 'creative', 'learning', 'entertainment'],
    'connect': ['travel', 'social', 'relationship', 'pet'],
    'escape': ['travel', 'entertainment', 'creative', 'lifestyle']
  },
  // Ambiente: cotidiano
  'daily': {
    'relax': ['lifestyle', 'home', 'health', 'emotion'],
    'inspire': ['creative', 'food', 'fashion', 'home'],
    'connect': ['relationship', 'social', 'pet', 'lifestyle'],
    'escape': ['entertainment', 'creative', 'travel', 'lifestyle']
  }
}

const vibeOptions = [
  { label: 'Reparador', value: 'healing', desc: 'Cálido, calmante, sanador' },
  { label: 'Crecimiento', value: 'growth', desc: 'Progreso, avance, transformación' },
  { label: 'Social', value: 'social', desc: 'Conexión, compartir, interacción' },
  { label: 'Exploración', value: 'explore', desc: 'Curiosidad, aventura, descubrimiento' },
  { label: 'Cotidiano', value: 'daily', desc: 'Sencillo, real, presente' }
]

const feelingOptions = [
  { label: 'Quiero relajarme', value: 'relax', desc: 'Aliviar presión, despejar la mente' },
  { label: 'Busco inspiración', value: 'inspire', desc: 'Activar creatividad, encontrar ideas' },
  { label: 'Deseo conexión', value: 'connect', desc: 'Conectar con personas, resonar emocionalmente' },
  { label: 'Escapar por un momento', value: 'escape', desc: 'Salir de la realidad, vivir inmersión' }
]

const scenarios = [
  { key: 'lifestyle', name: 'Estilo de vida', anchor: '#_1-estilo-de-vida' },
  { key: 'emotion', name: 'Acompañamiento emocional', anchor: '#_2-acompañamiento-emocional' },
  { key: 'entertainment', name: 'Entretenimiento y ocio', anchor: '#_3-entretenimiento-y-ocio' },
  { key: 'growth', name: 'Crecimiento personal', anchor: '#_4-crecimiento-personal' },
  { key: 'social', name: 'Interacción social', anchor: '#_5-interacción-social' },
  { key: 'creative', name: 'Expresión creativa', anchor: '#_6-expresión-creativa' },
  { key: 'travel', name: 'Exploración de viajes', anchor: '#_7-exploración-de-viajes' },
  { key: 'health', name: 'Salud física y mental', anchor: '#_8-salud-física-y-mental' },
  { key: 'learning', name: 'Exploración del conocimiento', anchor: '#_9-exploración-del-conocimiento' },
  { key: 'relationship', name: 'Gestión de relaciones', anchor: '#_10-gestión-de-relaciones' },
  { key: 'pet', name: 'Acompañamiento de mascotas', anchor: '#_11-acompañamiento-de-mascotas' },
  { key: 'finance', name: 'Salud financiera', anchor: '#_12-salud-financiera' },
  { key: 'career', name: 'Desarrollo profesional', anchor: '#_13-desarrollo-profesional' },
  { key: 'home', name: 'Espacio del hogar', anchor: '#_14-espacio-del-hogar' },
  { key: 'food', name: 'Cocina y gastronomía', anchor: '#_15-cocina-y-gastronomía' },
  { key: 'fashion', name: 'Estilo y vestimenta', anchor: '#_16-estilo-y-vestimenta' }
]

// Calcula recomendaciones tomando elementos aleatorios del pool de temas
const recommendationTopics = computed(() => {
  if (!vibePoint.value || !feeling.value) return []
  
  const keys = recommendationMap[vibePoint.value]?.[feeling.value] || []
  const topics = []
  
  // Toma aleatoriamente 1-2 temas de cada escenario recomendado
  keys.forEach(key => {
    const scenario = scenarios.find(item => item.key === key)
    const scenarioTopics = topicPool[key] || []
    
    if (scenario && scenarioTopics.length > 0) {
      // Toma aleatoriamente 1-2 temas
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
  
  // Orden aleatorio y límite total
  return topics.sort(() => Math.random() - 0.5).slice(0, 8)
})

// Obtiene la descripción de la selección actual
const currentSelection = computed(() => {
  const vibe = vibeOptions.find(i => i.value === vibePoint.value)
  const feel = feelingOptions.find(p => p.value === feeling.value)
  return {
    vibe: vibe?.label || '',
    feeling: feel?.label || ''
  }
})

const scrollToAnchor = (anchor) => {
  // Retrasa el desplazamiento para asegurar que el DOM esté actualizado
  setTimeout(() => {
    // Intenta buscar por ID (soporta varios formatos)
    let element = document.querySelector(anchor)
    
    // Si no se encuentra, prueba otros formatos posibles
    if (!element) {
      // Intenta quitar el prefijo de guion bajo
      const altAnchor = anchor.replace('#_', '#')
      element = document.querySelector(altAnchor)
    }
    
    // Si aún no se encuentra, busca por texto del encabezado
    if (!element) {
      // Extrae el nombre del escenario desde el ancla
      const anchorText = decodeURIComponent(anchor.replace('#', '').replace(/^_/, ''))
      const headings = document.querySelectorAll('h2, h3')
      
      for (let heading of headings) {
        const headingText = heading.textContent.trim()
        // Coincidencia exacta o parcial
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
      // Resalta el bloque de destino
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

# Referencia de inspiración para escenarios de consumo B2C

## Introducción del capítulo

<ChapterIntroduction :duration="duration" :tags="['Aplicaciones B2C', 'Estilo de vida', 'Experiencia emocional', 'Creación de ambiente']" coreOutput="Descubrir más de 15 inspiraciones de escenarios de vida" expectedOutput="Encontrar una dirección de producto que emocione a los usuarios">

Este documento resume <strong>direcciones creativas de aplicación de modelos LLM en escenarios de consumo B2C</strong>. A diferencia de los productos B2B, que se centran en eficiencia y puntos de dolor, los productos B2C se enfocan más en <strong>crear sensaciones, sugestiones psicológicas y ambiente</strong>, para que el usuario obtenga resonancia emocional y una experiencia agradable.

</ChapterIntroduction>

## Selección rápida de ambiente

<el-card shadow="hover" style="margin-top: 16px; margin-bottom: 24px; border-left: 5px solid #ec4899;">
  <div style="font-weight: 600; margin-bottom: 8px;">Encuentra la inspiración que te toca</div>
  <div style="color: #606266; font-size: 14px; line-height: 1.6; margin-bottom: 12px;">
    Elige el ambiente que quieres y tu sensación actual. El sistema recomendará escenarios relacionados; haz clic en una etiqueta para saltar a la sección correspondiente.
  </div>
  <el-row :gutter="16">
    <el-col :span="12">
      <el-select v-model="vibePoint" placeholder="Elige tipo de ambiente" style="width: 100%;">
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
      <el-select v-model="feeling" placeholder="Elige tu sensación actual" style="width: 100%;">
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
      Escenarios recomendados para {{ currentSelection.vibe }} × {{ currentSelection.feeling }}:
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
      Elegir de nuevo
    </el-button>
  </div>
</el-card>

---

## 1. Estilo de vida

> 💡 **Idea central**: convertir la rutina cotidiana en una experiencia con rituales y crear belleza en los detalles

| N.º | Escenario de aplicación | Funcionalidad del escenario |
| :--: | ------------ | ------------ |
| 1 | Asistente de despertar con ritual matutino | Integra API de clima y datos de calendario; un LLM genera planes matutinos personalizados; reproduce música a medida con altavoces inteligentes y enciende las luces gradualmente |
| 2 | Creador de ambiente para vivir solo | Se conecta a dispositivos de hogar inteligente (luces, audio, difusor); el LLM ajusta parámetros según la hora y el estado de ánimo; aprende preferencias para optimizar continuamente |
| 3 | Generador de planes reparadores para quedarse en casa el fin de semana | Se conecta a APIs de streaming para obtener listas de contenido y combina historial de preferencias para proponer película + comida + ambientación |
| 4 | Radio calmante antes de dormir | Usa TTS para generar historias suaves, mezcla ruido blanco y reduce el volumen gradualmente; ajusta el contenido según datos de sueño |
| 5 | Capturador de inspiración estética cotidiana | Analiza fotos del entorno mediante reconocimiento de imagen, genera sugerencias estéticas con LLM y recomienda contenido al estilo Pinterest/Xiaohongshu |

---

## 2. Acompañamiento emocional

> 💡 **Idea central**: aceptación y compañía incondicionales, como un contenedor amable para las emociones

| N.º | Escenario de aplicación | Funcionalidad del escenario |
| :--: | ------------ | ------------ |
| 1 | Confidente nocturno | Cifrado de extremo a extremo para proteger la privacidad; análisis emocional con LLM; memoria de largo plazo para guardar historias del usuario y acompañamiento en diálogos continuos |
| 2 | Acompañante para sanar una ruptura | Algoritmo de identificación de etapas emocionales; apoyo por fases (desahogo → descarga → reconstrucción); recuperación RAG sobre una base de conocimiento psicológica |
| 3 | Coach de respiración contra la ansiedad | Entrada de datos de biosensores (ritmo cardiaco/respiración), monitoreo en tiempo real del nivel de ansiedad, guía de respiración por voz y relajación muscular progresiva |
| 4 | Mentor para reconstruir la confianza | Marco conversacional de psicología positiva; registro y retroalimentación sobre pequeños logros; técnicas de reestructuración cognitiva para cambiar el diálogo interno negativo |
| 5 | Interpretación inteligente del diario emocional | Modelo NLP de reconocimiento emocional, análisis de series temporales para detectar patrones; visualización del mapa emocional y alertas predictivas |

---

## 3. Entretenimiento y ocio

> 💡 **Idea central**: crear experiencias inmersivas para que el entretenimiento sea un refugio emocional

| N.º | Escenario de aplicación | Funcionalidad del escenario |
| :--: | ------------ | ------------ |
| 1 | DM inmersivo para juegos de misterio | El LLM genera ramificaciones de trama en tiempo real, usa síntesis de voz para interpretar NPC, ajusta dificultad y ritmo según la reacción de los jugadores; renderizado de escenas AR/VR |
| 2 | NPC con alma en juegos de mundo abierto | Base de datos de memoria a largo plazo para historial de interacción; diálogos personalizados con LLM; computación afectiva para respuestas emocionales creíbles |
| 3 | Generación de podcasts personalizados | Crea contenido exclusivo según el grafo de intereses del usuario; TTS clona voces preferidas; interacción en tiempo real para responder preguntas de oyentes |
| 4 | Equipo de ambiente para concierto virtual | Renderizado de avatares, interacción en tiempo real con mensajes, varitas luminosas y objetos de apoyo virtuales; audio espacial para sensación de presencia |
| 5 | Compañero de cocreación de novela interactiva | El LLM genera trama en tiempo real; las elecciones del usuario cambian la historia; múltiples finales y relaciones dinámicas entre personajes |

---

## 4. Crecimiento personal

> 💡 **Idea central**: crecer no es una penitencia, sino un viaje interesante de autodescubrimiento

| N.º | Escenario de aplicación | Funcionalidad del escenario |
| :--: | ------------ | ------------ |
| 1 | Testigo del crecimiento personal | Línea de tiempo visual para mostrar el progreso; marcado automático de hitos; comparativas de "mi yo de antes" frente a "mi yo actual" |
| 2 | Coach gamificado de hábitos | Mecánicas de juego (experiencia, niveles, insignias), clasificaciones sociales y coach de IA con rol narrativo, por ejemplo "mentor de aventuras" |
| 3 | Emparejador de compañeros para aprender habilidades | Algoritmo de matching por intereses y metas de aprendizaje, comunidades de grupos de estudio y mecanismo de registro con supervisión mutua |
| 4 | Descubridor diario de pequeñas alegrías | Reconocimiento de imágenes para encontrar momentos bonitos; guía de gratitude journal; revisión semanal de momentos positivos |
| 5 | Simulador de experiencias de vida | Simula resultados de decisiones con tramas ramificadas, compara vidas paralelas y visualiza consecuencias |

---

## 5. Interacción social

> 💡 **Idea central**: hacer que socializar sea ligero y natural, encontrando formas cómodas de conexión

| N.º | Escenario de aplicación | Funcionalidad del escenario |
| :--: | ------------ | ------------ |
| 1 | Generador de temas rompehielos | Recomendación inteligente de temas según ocasión y participantes; análisis de conversación en tiempo real para sugerir continuidad; rescate en momentos incómodos |
| 2 | Redactor de ambiente para publicaciones sociales | Análisis de imágenes, textos en varios estilos con LLM (artístico/humorístico/profundo); recomendación inteligente de emojis y maquetación |
| 3 | Planificador de ambiente para citas | Genera planes de cita según intereses de ambas partes; recomienda restaurantes/actividades y temas de conversación; alertas de clima y tráfico |
| 4 | Animador de reuniones remotas | Biblioteca de juegos online, generador de actividades rompehielos, ruleta de temas; fondos virtuales y filtros para reforzar el ambiente |
| 5 | Asistente de gestión de energía social | Evalúa el desgaste tras actividades sociales, sugiere recuperación (actividades en solitario) y planifica inteligentemente el calendario social |

---

## 6. Expresión creativa

> 💡 **Idea central**: todas las personas tienen creatividad; solo necesita despertarse

| N.º | Escenario de aplicación | Funcionalidad del escenario |
| :--: | ------------ | ------------ |
| 1 | Kit de emergencia contra el bloqueo creativo | Algoritmo de asociaciones entre dominios, generación de estímulos aleatorios, biblioteca de prompts creativos y herramienta de expansión tipo mapa mental |
| 2 | Guía de exploración del estilo personal | Análisis de imagen para reconocer el estilo actual; recomendaciones de tendencias; prueba virtual de ropa/maquillaje; línea de evolución del estilo |
| 3 | Asesor estético para journaling y diarios | Recomendación de plantillas de maquetación, generación de paletas, sugerencias decorativas, reconocimiento de escritura manual y embellecimiento de contenido |
| 4 | Guía de composición y ambiente fotográfico | Reconocimiento de escena, sugerencias de composición, filtros recomendados, ajuste inteligente de parámetros de edición y ruta de aprendizaje fotográfico |
| 5 | Emparejador de música y estado de ánimo | Análisis emocional de música, detección del estado de ánimo, listas personalizadas e historias/contexto de las canciones |

---

## 7. Exploración de viajes

> 💡 **Idea central**: viajar no es solo ver paisajes, sino sentir distintas formas de vida

| N.º | Escenario de aplicación | Funcionalidad del escenario |
| :--: | ------------ | ------------ |
| 1 | Guía para paseos urbanos | Agrega contenido de expertos locales, recomienda lugares poco conocidos, ofrece navegación AR, traducción en tiempo real y explicación por voz |
| 2 | Generador de diario emocional de viaje | Clasifica y selecciona fotos automáticamente, genera relatos de viaje con LLM, marca ubicaciones en una línea de tiempo y crea videos con un clic |
| 3 | Acompañante para viajar en solitario | Compartición de ubicación en tiempo real, alertas de seguridad, contactos de emergencia locales, guía de IA por voz y comunidad para viajeros solos |
| 4 | Vista previa del ambiente del destino | Panoramas VR/360°, simulación de sonidos y aromas locales, contexto cultural y experiencia virtual de "probar vivir allí" |
| 5 | Guía de ambiente para fotografía de viaje | Recordatorios de hora dorada, líneas de composición, puntos fotográficos locales y sugerencias de color grading |

---

## 8. Salud física y mental

> 💡 **Idea central**: la salud no es una meta, sino una forma amable de cuidarse

| N.º | Escenario de aplicación | Funcionalidad del escenario |
| :--: | ------------ | ------------ |
| 1 | Activador de motivación deportiva | Recomienda tipos de ejercicio según el estado del usuario, ofrece microejercicios de 5 minutos, retos gamificados y registro social de actividad |
| 2 | Cocina de inspiración saludable | Reconocimiento de ingredientes en la nevera, recetas personalizadas, análisis nutricional y guía de cocina paso a paso |
| 3 | Optimizador de ambiente para dormir mejor | Analiza datos de sueño, genera rituales nocturnos, sugiere mejoras ambientales (temperatura/humedad/luz) y ofrece despertar inteligente |
| 4 | Guía de conciencia corporal | Meditación de escaneo corporal, relación entre emociones y partes del cuerpo, ejercicios de conexión cuerpo-mente y visualización de biofeedback |
| 5 | Recordatorio de autocuidado | Monitorea intensidad de trabajo, recuerda descansos, sugiere microcuidados (beber agua/estirar/respirar) y registra autocuidado |

---

## 9. Exploración del conocimiento

> 💡 **Idea central**: aprender es una aventura interminable, y la curiosidad es la mejor maestra

| N.º | Escenario de aplicación | Funcionalidad del escenario |
| :--: | ------------ | ------------ |
| 1 | Guía gamificada de exploración del conocimiento | Visualiza mapas de conceptos, rutas de aprendizaje por niveles, sistema de insignias y mentor de IA con rol narrativo |
| 2 | Compañero situacional para aprender idiomas | El LLM interpreta distintos roles en conversaciones, corrige pronunciación, explica contexto cultural y simula situaciones inmersivas |
| 3 | Asistente para satisfacer la curiosidad | Conexión a Wikipedia/grafos de conocimiento, explicación simple de conceptos complejos, recomendaciones relacionadas y registro de curiosidades |
| 4 | Inspirador de notas de lectura | Analiza libros, extrae y relaciona ideas, recomienda ángulos de reflexión, plantillas y embellecimiento de notas |
| 5 | Creador de ambiente para compartir conocimiento | Genera tarjetas de conocimiento, optimiza copy para compartir, mejora visuales y ofrece retroalimentación de datos sociales |

---

## 10. Gestión de relaciones

> 💡 **Idea central**: las buenas relaciones requieren atención, y atenderlas no tiene por qué ser complicado

| N.º | Escenario de aplicación | Funcionalidad del escenario |
| :--: | ------------ | ------------ |
| 1 | Coach de comunicación para relaciones íntimas | Genera plantillas de expresión emocional, guía comunicación no violenta, ofrece frases para resolver conflictos y evalúa salud relacional |
| 2 | Asistente de cuidado familiar | Recordatorios de fechas importantes (cumpleaños/aniversarios), sugerencias de mensajes afectivos, actividades familiares y creación de álbum familiar |
| 3 | Creador de ambiente para mantener amistades | Registro de interacciones con amigos, temas comunes recomendados, organización de reuniones remotas y generación de línea de tiempo de recuerdos |
| 4 | Planificador de confesiones y sorpresas | Genera planes personalizados de sorpresa, recomienda regalos, sugiere frases románticas, cronograma y recordatorios |
| 5 | Guía para suavizar conflictos | Frases para bajar la intensidad emocional, guía para ponerse en el lugar del otro, pasos de reconciliación y seguimiento de reparación |

---

## 11. Acompañamiento de mascotas

> 💡 **Idea central**: las mascotas son familia, y su compañía merece ser registrada y valorada

| N.º | Escenario de aplicación | Funcionalidad del escenario |
| :--: | ------------ | ------------ |
| 1 | Diario antropomórfico de mascotas | Analiza comportamiento, genera diarios en primera persona, añade imágenes automáticamente y crea un "muro social" para la mascota |
| 2 | Intérprete del comportamiento animal | Analiza videos de comportamiento, alerta sobre salud, ofrece consejos de entrenamiento y base de conocimiento por raza |
| 3 | Planificador de tiempo de calidad con mascotas | Recomienda actividades, tutoriales de juguetes DIY, lugares pet-friendly y matching social para mascotas |
| 4 | Generador de historias conmemorativas de mascotas | Selecciona fotos y videos, genera historias en línea de tiempo, añade música y crea álbumes/videos conmemorativos automáticamente |
| 5 | Guía tranquila para nuevos cuidadores | Guía de cuidado por etapas, respuestas a problemas frecuentes, manejo de emergencias y comunidad de apoyo para principiantes |

---

## 12. Salud financiera

> 💡 **Idea central**: la libertad financiera no es el objetivo; la salud financiera sí

| N.º | Escenario de aplicación | Funcionalidad del escenario |
| :--: | ------------ | ------------ |
| 1 | Asistente de conciencia emocional del consumo | Analiza registros de gasto, relaciona emociones y consumo, alerta sobre compras impulsivas y propone satisfacciones alternativas |
| 2 | Motivación visual para metas de ahorro | Visualiza progreso, renderiza escenas de sueños, celebra hitos y gamifica el hábito de ahorrar |
| 3 | Aprendizaje ligero de finanzas personales | Entrega conocimiento fragmentado, casos situacionales, preguntas interactivas, pruebas y certificados |
| 4 | Aliviador de ansiedad financiera | Evalúa salud financiera, ofrece técnicas de gestión del estrés, planes de pequeños pasos y apoyo psicológico financiero |
| 5 | Juego de inversión de bajo monto | Simulación de inversión virtual, educación de riesgos, juego de portafolio y guía hacia inversión real de bajo monto |

---

## 13. Desarrollo profesional

> 💡 **Idea central**: la carrera profesional no es una vía fija, sino un territorio abierto para explorar

| N.º | Escenario de aplicación | Funcionalidad del escenario |
| :--: | ------------ | ------------ |
| 1 | Acompañante para la confusión profesional | Evaluación de intereses, inventario de habilidades, recomendaciones de información sectorial y conversaciones con mentor profesional |
| 2 | Activador de sentido de logro laboral | Registro de resultados, extracción de valor, visualización de logros y recopilación de feedback positivo de colegas/clientes |
| 3 | Asistente de ambiente social en el trabajo | Recomendación de temas profesionales, técnicas de networking, eventos del sector y optimización de contenido en LinkedIn |
| 4 | Generador de inspiración para proyectos paralelos | Matching entre habilidades, intereses y demanda de mercado; casos de side projects, guía de inicio y comunidad |
| 5 | Estación de confianza antes de entrevistas | Entrevistas simuladas, preparación de preguntas frecuentes, técnicas de confianza y sugerencias de imagen |

---

## 14. Espacio del hogar

> 💡 **Idea central**: el hogar no es solo un lugar donde vivir, sino un refugio para la mente

| N.º | Escenario de aplicación | Funcionalidad del escenario |
| :--: | ------------ | ------------ |
| 1 | Diseñador de ambiente para el hogar | Analiza fotos del espacio, recomienda estilos, muebles/decoración y previsualización AR |
| 2 | Guía de transformación estacional del hogar | Recomienda temas por temporada, organización y exhibición, decoración festiva y listas de compra |
| 3 | Magia para espacios pequeños | Algoritmos de optimización espacial, muebles multifuncionales, técnicas de orden y trucos de ampliación visual |
| 4 | Creador de rituales domésticos | Diseño de rituales cotidianos (mañana/noche/fin de semana), recordatorios de ejecución y feedback sobre efecto |
| 5 | Acompañamiento psicológico para decluttering | Evalúa valor emocional de objetos, guía pasos de descarte, ofrece apoyo psicológico y recomienda canales de donación/reciclaje |

---

## 15. Cocina y gastronomía

> 💡 **Idea central**: la comida es el lenguaje del amor, y cocinar es una forma de expresarlo

| N.º | Escenario de aplicación | Funcionalidad del escenario |
| :--: | ------------ | ------------ |
| 1 | Cocina reparadora para comer a solas | Reconocimiento de ingredientes en la nevera, recetas sencillas, guía paso a paso y estética de emplatado individual |
| 2 | Diseño de ambiente para mesas festivas | Menús temáticos, propuestas de montaje de mesa, técnicas de ambientación y optimización de experiencia de invitados |
| 3 | Emparejador de cocina y estado de ánimo | Algoritmo emoción-comida, recetas para regulación emocional, recomendación de comfort food y guía terapéutica de cocina |
| 4 | Generador de confianza para principiantes en cocina | Recetas ultrafáciles, técnicas de rescate ante errores, frases de confianza y progresión gradual de dificultad |
| 5 | Guía de ambiente para fotografía gastronómica | Consejos de emplatado, uso de luz natural, ángulos de captura, filtros y sugerencias de postproducción |

---

## 16. Estilo y vestimenta

> 💡 **Idea central**: vestirse es autoexpresión, y el estilo es la manifestación externa de lo interior

| N.º | Escenario de aplicación | Funcionalidad del escenario |
| :--: | ------------ | ------------ |
| 1 | Mood board del outfit de hoy | Recomendaciones combinando clima, ocasión y estado de ánimo; prueba virtual, inspiración de conjuntos y gestión del armario |
| 2 | Estilista de armario cápsula | Inventario del armario, combinaciones de prendas, planes de múltiples usos y sugerencias de compra para cubrir vacíos |
| 3 | Viaje de exploración del estilo personal | Test de estilo, recomendación de referentes, ruta de evolución y construcción de confianza |
| 4 | Creativo para reinventar ropa antigua | Inspiración para transformar ropa, nuevas combinaciones, detalles con accesorios y moda sostenible |
| 5 | Asesor de look para ocasiones especiales | Interpretación del dress code, generación de propuestas, consejos de maquillaje/peinado y coordinación general |

---

## Principios centrales para diseñar productos B2C

### 1. De "función" a "sensación"

Los productos B2B se preguntan "qué problema resuelve esta función"; los productos B2C se preguntan "qué sensación aporta esta función".

| Pensamiento B2B | Pensamiento B2C |
|---------|---------|
| Mejorar la eficiencia | Ahorrar tiempo para hacer lo que gusta |
| Reducir costes | Hacer que cada euro valga la pena |
| Resolver puntos de dolor | Crear experiencias agradables |
| Funcionalidad completa | Sensación bien lograda |

### 2. Tres niveles para crear ambiente

**Nivel sensorial**: diseño visual, auditivo y táctil
- Colores cálidos
- Sonidos relajantes
- Animaciones fluidas

**Nivel emocional**: resonancia y guía emocional
- Comprender el estado de ánimo del usuario
- Ofrecer apoyo emocional
- Crear emociones positivas

**Nivel de significado**: reconocimiento de valor y pertenencia
- Hacer que el usuario se sienta comprendido
- Crear sentido de pertenencia
- Dar significado a la acción

### 3. El poder de la sugestión psicológica

El copy y el diseño de un producto B2C siempre transmiten sugestiones psicológicas:

- **Sugestión positiva**: "ya lo estás haciendo bien", "ve despacio, no pasa nada"
- **Sugestión de pertenencia**: "muchas personas sienten lo mismo", "no estás solo"
- **Sugestión de crecimiento**: "cada intento es progreso", "estás mejorando"

### 4. Ayudar al usuario a ser una mejor versión de sí mismo

Los mejores productos B2C no cambian al usuario; le ayudan a convertirse en la persona que quiere ser.

- No es "deberías...", sino "puedes..."
- No es "tienes que...", sino "si quieres..."
- No es "aún no eres suficiente...", sino "ya has..."

---

> 🌟 **Recuerda**: los usuarios B2C no compran funciones, sino sensaciones; no compran herramientas, sino compañía; no compran servicios, sino comprensión.
