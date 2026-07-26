# Haz que las interfaces se vean bien con LLM y Skills: Prompts y Plugins en la Practica

En las lecciones anteriores, ya aprendiste a usar AI IDE para convertir disenos en codigo y a construir interfaces rapidamente con bibliotecas de componentes. Pero es posible que hayas notado un problema: **con los mismos requisitos, las paginas generadas por AI siempre parecen faltar algo**: la tipografia es la omnipresente Inter, los colores son los degradados violeta que se ven por todas partes, el layout es una cuadricula de tarjetas simetrica que hace bostezar, y toda la pagina emana un fuerte "sabor a AI".

No es culpa de la AI, sino que no le has dicho que **estilo** quieres.

Imagina que vas a la peluqueria. Si solo dices "cortame el pelo", el peluquero te dara un resultado seguro pero mediocre. Pero si dices "quiero un desenfado japones con estilo, el flequillo en forma de ocho, largo hasta la clavicula, con capas bien definidas", obtendras exactamente lo que esperas.

Con la AI pasa lo mismo. **Necesita que le describas una direccion estetica clara** para generar interfaces bonitas y unicas.

Esta leccion te ensena dos metodos para que la AI genere interfaces atractivas:

1. **Plantillas de prompts cuidadosamente disenadas**: dile a la AI el estilo estetico que quieres usando lenguaje natural
2. **Plugins Skills de frontend**: permite que la AI cargue automaticamente especificaciones de diseno profesionales

## Lo que aprenderas

1. Entender por que las interfaces que genera la AI por defecto son "muy corrientes"
2. Dominar las 5 dimensiones para describir un estilo de diseno (tipografia, color, layout, animacion, detalles)
3. Aprender a usar 3 plugins Skills para mejorar el aspecto de las interfaces
4. Practicar con tres escenarios reales, usando prompts + Skills para generar interfaces atractivas

## 1. Por que las interfaces que genera la AI por defecto son "muy corrientes"

Los datos de entrenamiento de la AI contienen una enorme cantidad de codigo frontend, y la mayor parte usa opciones "seguras":

| Dimension | Opcion por defecto de la AI | Problema |
| :--- | :--- | :--- |
| Tipografia | Inter, Roboto, Arial | Demasiado comunes, sin personalidad |
| Color | Degradado violeta, azul como color principal | Sobreutilizados en el sector tecnologico, fatiga visual |
| Layout | Cuadricula simetrica, apilamiento de tarjetas | Muy predecible, falta de sorpresa |
| Animacion | Fundidos, hovers simples | Poco refinados, sin profundidad |
| Fondo | Color solido, degradado simple | Monotonos, sin textura |

Estas opciones individualmente no estan mal, pero **cuando todas las paginas generadas por AI las usan, se convierten en "sabor a AI"**.

> 💡 **Conclusion clave**: La AI no es incapaz de disenar, sino que **por defecto recurre al "promedio estadistico"**. Necesitas decirle explicitamente en que direccion apartarse de la media.

## 2. Metodo 1: Describir el estilo de diseno con prompts

### 2.1 Las 5 dimensiones del estilo de diseno

Para generar interfaces atractivas, necesitas describir el efecto que quieres desde 5 dimensiones:

| Dimension | Puntos a describir | Palabras clave de ejemplo |
| :--- | :--- | :--- |
| **Tipografia** | Titulos con fuentes display en negrita, cuerpo con fuentes legibles | Space Grotesk, Playfair Display, JetBrains Mono |
| **Color** | Color principal + color de acento, evitar distribucion uniforme | #4F46E5 principal + #F59E0B acento |
| **Layout** | Asimetrico, superposicion, romper la cuadricula | Bento Grid, secciones asimetricas, elementos flotantes |
| **Animacion** | Animaciones de carga cuidadosamente orquestadas, microinteracciones | staggered reveals, activacion por scroll |
| **Detalles** | Fondos, sombras, bordes, texturas | Ruido, patrones geometricos, grid con degradado |

### 2.2 Ver para creer: Prompt normal vs. Prompt mejorado

Usemos un ejemplo de landing page para comparar los resultados:

**Prompt normal:**

```
Hazme una landing page para un asistente de escritura con AI, que incluya barra de navegacion, seccion hero, showcase de funciones, precios y footer
```

**Prompt mejorado:**

```
Hazme una landing page para un asistente de escritura con AI, con los siguientes requisitos:

**Estilo estetico: Neubrutalismo**

**Tipografia:**
- Titulos: Space Grotesk, peso 700-900
- Cuerpo: IBM Plex Sans, peso 400

**Colores:**
- Principal: #000000 (negro puro)
- Acento: #FF6B00 (naranja)
- Fondo: #FFFDF0 (blanco crema)
- Bordes: solida negra de 3px

**Layout:**
- Layout asimetrico, elementos separados por lineas negras gruesas
- Tarjetas con sombras duras (box-shadow: 8px 8px 0px #000)
- Contraste audaz de espacios en blanco

**Animacion:**
- Los elementos entran desde abajo al cargar la pagina
- Los botones suben 2px al hacer hover

**Detalles:**
- Todos los border-radius a 0px (angulos rectos)
- Botones con fuerte efecto 3D
- Fondo con textura de ruido sutil
```

Con los mismos requisitos, el segundo prompt hace que la AI genere una pagina con un estilo marcado y memorable.

### 2.3 Repositorio de Skills para embellecimiento frontend

No empieces a escribir prompts desde cero. Aqui recopilamos Skills de AI directamente relacionados con el embellecimiento frontend:

| Repositorio | Contenido | Stars | Enlace |
|:---|:---|:---|:---|
| **ui-ux-pro-max-skill** | 57 estilos + 95 paletas + 56 tipografias | 10k+ | [GitHub](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) |
| **antigravity-awesome-skills** | Evita los topicos esteticos genericos de AI | - | [GitHub](https://github.com/sickn33/antigravity-awesome-skills) |
| **superdesigndev/superdesign** | Herramienta de desarrollo UI nativa para AI | 4.7k | [GitHub](https://github.com/superdesigndev/superdesign) |
| **anthropics/skills/frontend-design** | Skill oficial de diseno frontend de Anthropic | - | [GitHub](https://github.com/anthropics/skills) |

> 💡 Para mas prompts de estilo, consulta el [Apéndice: Referencia rapida de prompts de estilos de diseno](#style-prompts)

### 2.5 Tres plantillas de estilo de uso comun

Aquí tienes tres plantillas de estilo probadas, listas para copiar, modificar y usar:

#### Plantilla 1: Minimalismo

```
**Estilo estetico: Minimalismo**

**Tipografia:**
- Titulos: PP Neue Montreal, peso 500-700
- Cuerpo: Inter, peso 400

**Colores:**
- Principal: #FFFFFF (blanco)
- Texto: #1A1A1A (casi negro)
- Acento: #3B82F6 (azul, usar con moderacion)

**Layout:**
- Mucho espacio en blanco (padding minimo 64px)
- Layout de una o dos columnas, centrado
- Separar elementos con espacio en blanco en lugar de lineas divisorias

**Animacion:**
- Fundidos lentos (duration 600ms)
- Transicion gradual de color al hacer hover

**Detalles:**
- Border-radius: 8px
- Sombras: sutiles (0 4px 12px rgba(0,0,0,0.08))
- Sin decoracion de fondo
```

#### Plantilla 2: Glassmorfismo

```
**Estilo estetico: Glassmorfismo**

**Tipografia:**
- Titulos: Outfit, peso 600-800
- Cuerpo: Plus Jakarta Sans, peso 400-500

**Colores:**
- Fondo: degradado de #667eea a #764ba2
- Fondo de tarjetas: rgba(255, 255, 255, 0.1)
- Texto: #FFFFFF

**Layout:**
- Diseno de tarjetas flotantes
- Superposicion entre tarjetas

**Animacion:**
- Las tarjetas aparecen secuencialmente al cargar (staggered)
- Las tarjetas se amplian 1.05x al hacer hover

**Detalles:**
- Border-radius: 20px
- Desenfoque de fondo: backdrop-blur-xl
- Bordes: 1px rgba(255, 255, 255, 0.2)
- Sutil efecto de halo de degradado
```

#### Plantilla 3: Bento Grid

```
**Estilo estetico: Bento Grid**

**Tipografia:**
- Titulos: SF Pro Display, peso 700
- Cuerpo: SF Pro Text, peso 400

**Colores:**
- Fondo: #F5F5F7 (gris claro)
- Tarjetas: #FFFFFF (blanco)
- Acento: #0071E3 (azul Apple)

**Layout:**
- Layout en cuadricula, tarjetas de diferentes tamanos ensambladas juntas
- Gap entre tarjetas de 16px
- Border-radius 24px

**Animacion:**
- Las tarjetas suben ligeramente al hacer hover
- Efecto de presion al hacer clic

**Detalles:**
- Tarjetas grandes para contenido importante
- Tarjetas pequenas para informacion secundaria
- Usar iconos en lugar de texto en algunos casos
- Sombras limpias (0 4px 24px rgba(0,0,0,0.06))
```

## 3. Metodo 2: Usar plugins Skills para cargar especificaciones de diseno automaticamente

Escribir prompts de estilo manualmente cada vez es tedioso. **Skills** es un paquete de especificaciones de diseno reutilizable que, una vez instalado, la AI aplica automaticamente.

### 3.1 Tres Skills para mejorar el aspecto de tus interfaces

| Skills | Caracteristicas | Comando de instalacion |
| :--- | :--- | :--- |
| **UI/UX Pro Max** | 67 estilos, 96 paletas, 57 combinaciones de tipografias | `npm install -g uipro-cli && uipro init --ai claude` |
| **frontend-design** | Oficial de Anthropic, evita topicos esteticos de AI | `npx skills add anthropics/skills/frontend-design` |
| **SuperDesign** | Plugin de IDE, genera multiples variantes de diseno | Buscar "SuperDesign" en el marketplace de VS Code |

### 3.2 Instalar UI/UX Pro Max (el mas recomendado)

UI/UX Pro Max es el Skill de especificaciones de diseno mas completo actualmente. Incluye:

- **67 estilos UI**: Glassmorfismo, Neumorfismo, Brutalismo, Bento Grid...
- **96 paletas de colores**: clasificadas por industria (SaaS, ecommerce, redes sociales...)
- **57 combinaciones de tipografias**: validadas por disenadores profesionales
- **100+ reglas de diseno**: especificaciones de espaciado, border-radius y sombras

**Pasos de instalacion:**

```bash
# 1. Instalar CLI globalmente
npm install -g uipro-cli

# 2. Inicializar (selecciona tu herramienta AI)
uipro init --ai claude
# o
uipro init --ai cursor
# o
uipro init --ai trae
```

Despues de instalar, solo necesitas agregar una linea a tu prompt:

```
Usa el estilo Glassmorphism de UI/UX Pro Max para hacerme una landing page para un asistente de escritura con AI
```

La AI aplicara automaticamente las especificaciones de tipografia, color y layout correspondientes.

### 3.3 Instalar frontend-design oficial de Anthropic

Este es un Skill de diseno frontend producido oficialmente por Anthropic, disenado especificamente para resolver el problema de los "topicos esteticos de AI":

```bash
# Ejecutar en Claude Code
npx skills add anthropics/skills/frontend-design
```

Despues de instalar, la AI evitara automaticamente:
- ❌ Tipografias Inter, Roboto, Arial
- ❌ Fondos con degradado violeta
- ❌ Layout en cuadricula simetrica
- ❌ Sombras demasiado tenues

Y en su lugar tendera a:
- ✅ Combinaciones de tipografias unicas
- ✅ Color principal audaz + color de acento nitido
- ✅ Layout asimetrico, con superposicion
- ✅ Fondos con textura (ruido, patrones geometricos)

## 4. Practica 1: Redisenar una landing page con prompts mejorados

Usemos lo que hemos aprendido para transformar una landing page comun en algo atractivo.

### 4.1 Version normal

Primero veamos que genera la AI con un prompt normal:

```
Hazme una landing page para una plataforma de adopcion de mascotas, que incluya:
- Barra de navegacion (Logo, enlaces, boton de registro)
- Seccion hero (titulo, subtitulo, boton CTA, imagen de mascota)
- Showcase de mascotas (tres tarjetas de mascotas)
- Sobre nosotros
- Footer
```

La pagina generada... funciona, pero es muy corriente.

### 4.2 Version mejorada

Ahora agreguemos la descripcion de estilo:

```
Hazme una landing page para una plataforma de adopcion de mascotas, con los siguientes requisitos:

**Estilo estetico: Calido y suave + Estilo dibujado a mano**

**Tipografia:**
- Titulos: Nunito (redondeada), peso 700-800
- Cuerpo: Nunito, peso 400-600

**Colores:**
- Principal: #FFB347 (naranja calido)
- Secundario: #FFCCB3 (naranja claro)
- Fondo: #FFF8F0 (blanco crema)
- Texto: #5D4037 (marron)

**Layout:**
- Tarjetas redondeadas (border-radius: 24px)
- Tarjetas ligeramente inclinadas (diferentes angulos)
- Elementos flotantes, efecto de superposicion

**Animacion:**
- Los elementos se deslizan desde ambos lados al cargar la pagina
- Las tarjetas de mascotas "menean la cabeza" al hacer hover (animacion rotate)
- Efecto rebote en botones al hacer hover

**Detalles:**
- Todos los border-radius de 16-24px
- Sombras calidas y suaves (0 8px 24px rgba(255,179,71,0.3))
- Fondo con decoracion de patrones de huellas
- Imagenes con recorte irregular (clip-path)
- Iconos de estilo dibujados a mano (estilo outline)
```

La pagina generada sera una interfaz calida, adorable, que hace que quieras adoptar una mascota.

## 5. Practica 2: Generar un dashboard rapidamente con Skills

Skills es especialmente adecuado para sistemas de backend que requieren muchas paginas.

### 5.1 Usando UI/UX Pro Max

```
Usa el estilo Dashboard Dark de UI/UX Pro Max,
hazme una pagina de dashboard para un panel de gestion de productos SaaS, que incluya:

**Arriba:** Cuatro tarjetas de estadisticas (usuarios, usuarios activos, ingresos, llamadas API)

**Medio:**
- Izquierda: Grafico de lineas de crecimiento de usuarios (ultimos 7 dias)
- Derecha: Grafico circular de distribucion de planes de suscripcion

**Abajo:** Lista de actividad reciente (hora, usuario, accion)
```

La AI aplicara automaticamente las especificaciones de diseno del dashboard oscuro:
- Fondo gris oscuro (#1A1A2E)
- Tarjetas de alto contraste (#16213E)
- Colores vivos para datos (azul, verde, naranja)
- Tarjetas flotantes con efecto glassmorfismo

### 5.2 Usando el Skill frontend-design

```
Usa el skill frontend-design,
hazme una pagina de inicio para un blog personal, con un estilo unico y con personalidad
```

La AI elegira una direccion estetica poco convencional (por ejemplo, retro-futurismo o estilo revista), y la implementara con tipografia, paleta y layout unicos.

## 6. Practica 3: Crear tu propio Skill de sistema de diseno

Si tienes un estilo de marca fijo, puedes crear tu propio Skill para que todas las paginas generadas por AI se ajusten a tu marca.

### 6.1 Crear el archivo Skill

Crea `.claude/skills/my-brand/SKILL.md` en tu proyecto:

````markdown
---
name: my-brand
description: Sistema de diseno exclusivo de mi proyecto, asegura que toda la UI siga un lenguaje de diseno unificado
---

# Sistema de diseno de mi proyecto

## Colores de marca
- Principal: #6366F1 (Indigo 500)
- Secundario: #8B5CF6 (Violet 500)
- Exito: #10B981
- Advertencia: #F59E0B
- Error: #EF4444
- Fondo: #F9FAFB
- Tarjetas: #FFFFFF

## Sistema de tipografia
- Titulos: Plus Jakarta Sans
  - H1: 700, 48px
  - H2: 600, 36px
  - H3: 600, 24px
- Cuerpo: Inter
  - Body: 400, 16px
  - Small: 400, 14px

## Sistema de espaciado
- Unidad base: 4px
- Padding de componentes: 8px / 12px / 16px
- Espaciado entre secciones: 24px / 32px / 48px
- Margenes de pagina: 64px

## Border-radius
- Botones: 8px
- Tarjetas: 12px
- Campos de entrada: 8px
- Modales: 16px

## Sombras
- Pequena: 0 1px 3px rgba(0,0,0,0.1)
- Mediana: 0 4px 12px rgba(0,0,0,0.1)
- Grande: 0 8px 24px rgba(0,0,0,0.12)

## Animaciones
- Tiempo de transicion: 150ms / 300ms
- Funcion de easing: cubic-bezier(0.4, 0, 0.2, 1)
- Efecto hover: ligera amplacion (scale-105)

## Estilos prohibidos
- No usar fondos con degradado violeta
- No usar tipografias que no sean Inter
- No usar border-radius mayor a 16px
- No usar negro puro (#000000), usar #1F2937
````

### 6.2 Usar tu propio Skill

Una vez creado, solo necesitas decir en tu prompt:

```
Usa el skill my-brand para hacerme una pagina de configuracion de usuario
```

La AI aplicara automaticamente todas las especificaciones de diseno que has definido.

## 7. Resumen

Hay dos metodos para que la AI genere interfaces atractivas:

| Metodo | Ventajas | Desventajas | Escenarios adecuados |
| :--- | :--- | :--- | :--- |
| **Descripcion con prompts** | Flexible, ajustable cada vez | Requiere escribir repetidamente | Paginas unicas, experimentar con diferentes estilos |
| **Plugins Skills** | Una instalacion, efecto duradero | Requiere instalacion y configuracion | Proyectos con requisitos de estilo fijos |

**Flujo de trabajo recomendado para Vibe Coding:**

1. **Fase de exploracion**: experimenta con diferentes prompts de estilo para encontrar la direccion estetica que te gusta
2. **Una vez definido el estilo**: instala el Skill correspondiente (UI/UX Pro Max o frontend-design)
3. **Proyectos de marca**: crea tu propio Skill para unificar el lenguaje de diseno de todo el proyecto

### Ejercicios

Elige uno de los siguientes escenarios y completalo desde cero usando los metodos de esta leccion:

1. Redisena la interfaz de un proyecto anterior usando prompts de estilo (elige un estilo que te guste)
2. Instala UI/UX Pro Max y usa uno de sus estilos para generar una nueva pagina
3. Crea tu propio Skill de sistema de diseno, definiendo los colores y tipografias de tu marca

---

## Apéndice: Referencia rapida de estilos de diseno

| Estilo | Palabras clave | Escenarios adecuados | Productos de ejemplo |
| :--- | :--- | :--- | :--- |
| **Minimalismo** | Espacio en blanco, monocromatico, simple | Productos premium, portafolios personales | Apple.com |
| **Glassmorfismo** | Vidrio esmerilado, degradados, desenfoque | Productos tecnologicos, landing pages SaaS | macOS Big Sur |
| **Neubrutalismo** | Bordes gruesos, sombras duras, colores planos | Marcas de tendencia, sitios artisticos | Brassius |
| **Bento Grid** | Cuadricula, collage, tarjetas | Exhibicion de informacion, dashboards | Paginas promocionales de Apple |
| **Retro-futurismo** | Neon, degradados, synthwave | Juegos, musica | STRANGER THINGS |
| **Estilo dibujado a mano** | Irregular, redondeado, ilustraciones | Educacion, productos para ninos | Duolingo |
| **Estilo revista** | Tipografia grande, asimetrico, espacio en blanco | Sitios de contenido, blogs | Medium |
| **Lujo oscuro** | Tonalidades oscuras, dorado, refinado | Productos premium, articulos de lujo | Marcas de alta gama |

## Apéndice: Referencia rapida de instalacion de Skills

```bash
# UI/UX Pro Max
npm install -g uipro-cli
uipro init --ai claude

# Anthropic frontend-design
npx skills add anthropics/skills/frontend-design

# Anthropic brand-guidelines
npx skills add anthropics/skills/brand-guidelines

# Ver Skills instalados en Claude Code
/help
```

## Apéndice: Paletas de colores recomendadas

| Paleta | Color principal | Color de acento | Fondo | Estilo |
| :--- | :--- | :--- | :--- | :--- |
| **Atardecer** | #F97316 | #FBBF24 | #FFF7ED | Calido, energico |
| **Oceano** | #0EA5E9 | #06B6D4 | #F0F9FF | Fresco, profesional |
| **Bosque** | #10B981 | #34D399 | #ECFDF5 | Natural, saludable |
| **Baya** | #8B5CF6 | #EC4899 | #FAF5FF | Romantico, creativo |
| **Cafe** | #78350F | #D97706 | #FFFBEB | Calido, retro |
| **Monolito** | #6B7280 | #9CA3AF | #F9FAFB | Profesional, neutral |

## Apéndice: Referencia rapida de prompts de estilos de diseno {#style-prompts}

Prompts que puedes probar para mejorar el aspecto de las paginas frontend:

### Categorias de estilo

| Estilo | Palabras clave (ingles) | Caracteristicas visuales principales | Ejemplo de prompt |
|:---|:---|:---|:---|
| **Pop Art** | Pop Art | Colores atrevidos que chocan, lineas de contorno negras, textura de puntos | Pop art style website, bold colors and comic dots, vibrant |
| **Minimalismo** | Minimalism | Mucho espacio en blanco, minimos colores y lineas, sin adornos | Minimalist web design, ample white space, geometric, serene |
| **Expresionismo abstracto** | Abstract Expressionism | Pinceladas llenas de tension emocional, salpicaduras de color | Abstract expressionism background, dynamic paint splashes, emotional |
| **Estilo retro** | Retro/Vintage | Tipografias antiguas, texturas envejecidas, paleta retro | Retro 80s website design, neon grid and synthwave color palette |
| **Cyberpunk** | Cyberpunk | Colores neon de alto contraste, efectos glitch, fondo oscuro | Cyberpunk UI, neon lights on dark background, glitch effects |
| **Neumorfismo** | Neumorphism | Sombras suaves y reflejos, ligera sensacion de relieve/hundido | Neumorphism design style, soft shadows, clean and modern |
| **Arte generativo** | Generative Art | Patrones visuales fluidos generados algoritmicamente | Generative art background, flowing algorithmic patterns, digital |
| **Acid Graphics** | Acid Graphics | Textura metalica, efecto cristal, tipografias dentadas | Acid graphics web layout, glass morphism, chaotic typography |
| **3D inmersivo** | Immersive 3D | Escenas 3D interactivas, fuerte sensacion espacial | Immersive 3D website, interactive product model in space |
