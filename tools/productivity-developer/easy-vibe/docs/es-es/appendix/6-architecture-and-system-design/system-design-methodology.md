# Metodología de diseño de sistemas

::: tip Prefacio
**El diseño de sistemas no es hacer un diagrama de arquitectura de improviso, sino una metodología con principios y estructura.** Ya sea en una pregunta de diseño de sistemas en una entrevista o en el diseño arquitectónico del trabajo real, se sigue un marco de pensamiento similar: primero comprender el problema, luego estimar la escala, después diseñar la solución y finalmente optimizar en profundidad.
:::

**¿Qué aprenderás en este artículo?**

Después de completar este capítulo, podrás:

- **Proceso de diseño**: Dominar el marco de cuatro pasos del diseño de sistemas
- **Estimación de capacidad**: Aprender la técnica de la "estimación en el dorso de un sobre"
- **Patrones comunes**: Familiarizarte con patrones centrales como caché, sharding y colas de mensajes
- **Pensamiento de compromisos**: Entender la filosofía de trade-off en el diseño arquitectónico
- **Casos prácticos**: Comprender el proceso de diseño a través de casos como un servicio de URLs cortas y un feed social

| Capítulo | Contenido | Concepto clave |
|-----|------|---------|
| **Cap. 1** | Método de cuatro pasos | Clarificación de requisitos, estimación de capacidad, diseño arquitectónico, optimización en profundidad |
| **Cap. 2** | Estimación de capacidad | QPS, almacenamiento, ancho de banda, estimación en el dorso de un sobre |
| **Cap. 3** | Patrones de diseño centrales | Caché, sharding, colas de mensajes, CDN |
| **Cap. 4** | Pensamiento de compromisos | Consistencia vs. disponibilidad, rendimiento vs. costo |
| **Cap. 5** | Casos clásicos | Servicio de URLs cortas, feed social, sistema de flash sale |

---

## 1. Método de cuatro pasos para el diseño de sistemas

El diseño de sistemas no consiste en empezar dibujando un diagrama de arquitectura. Tanto en entrevistas como en la práctica, se debe seguir un proceso estructurado.

<SystemDesignStepsDemo />

::: tip ¿Por qué hay que clarificar los requisitos primero?
Muchos comienzan a dibujar diagramas al recibir el enunciado, y terminan diseñando un sistema "correcto pero no lo que el entrevistador quería". Dedicar 5 minutos a aclarar los requisitos puede evitar 30 minutos de retrabajo.

Preguntas de clarificación comunes:
- ¿Cuál es la funcionalidad central del sistema? (No diseñes todas las funcionalidades)
- ¿Cuál es la escala de usuarios? (Determina si se necesita distribución)
- ¿Cuál es la proporción lectura/escritura? (Determina la estrategia de caché)
- ¿Por cuánto tiempo se deben conservar los datos? (Determina la solución de almacenamiento)
:::

---

## 2. Estimación de capacidad: el arte de la "estimación en el dorso de un sobre"

La "estimación en el dorso de un sobre" (Back-of-envelope estimation) es una habilidad central en el diseño de sistemas. No se necesitan cálculos precisos, solo conocer el orden de magnitud.

<CapacityEstimationDemo />

### Tabla de referencia rápida de conversiones comunes

| Magnitud | Conversión | Truco para recordar |
|------|------|---------|
| 1 día | 86.400 segundos | ≈ 100.000 segundos |
| 100 millones de solicitudes/día | ≈ 1.200 QPS | Dividir entre 100.000 |
| 1 KB × 100 millones | ≈ 100 GB | 100 millones de registros pequeños |
| 1 MB × 1 millón | ≈ 1 TB | 1 millón de imágenes |

### Aplicación de la regla 80/20 en las estimaciones

La mayoría de los sistemas siguen la regla 80/20: el 20% de los datos soporta el 80% de las solicitudes. Esto significa:

- **Tamaño de caché** ≈ Volumen total de datos × 20%
- **QPS de puntos calientes** ≈ El 80% del QPS total se concentra en el 20% de las claves
- **Objetivo de tasa de acierto de caché** ≈ 80%+ (por debajo de este valor indica un problema en la estrategia de caché)

---

## 3. Patrones de diseño centrales

Patrones que aparecen repetidamente en el diseño de sistemas; dominarlos permite afrontar la mayoría de escenarios.

### 3.1 Patrones de caché

| Patrón | Ruta de lectura | Ruta de escritura | Escenarios aplicables |
|------|--------|--------|---------|
| Cache-Aside | Primero buscar en caché; si hay miss, consultar la BD y rellenar la caché | Primero escribir en la BD, luego eliminar la caché | Caso general, el más utilizado |
| Read-Through | La capa de caché carga automáticamente desde la BD | Igual que Cache-Aside | Requiere soporte del framework de caché |
| Write-Behind | Igual que Cache-Aside | Primero escribir en caché, escribir en la BD de forma asíncrona | Escenarios de escritura intensiva, tolerantes a pérdida de datos |

::: tip ¿Por qué "eliminar la caché" en lugar de "actualizar la caché"?
Actualizar la caché es propenso a inconsistencias de datos en escenarios concurrentes: los hilos A y B actualizan simultáneamente, A escribe en la BD primero pero B actualiza la caché primero, resultando en un valor antiguo de B en la caché. Eliminar la caché hace que la próxima solicitud de lectura recargue desde la BD, evitando naturalmente este problema.
:::

### 3.2 Sharding (fragmentación de bases de datos y tablas)

Cuando los datos de una tabla superan las decenas de millones de registros, o el QPS de una sola base de datos alcanza su cuello de botella, se debe considerar el sharding.

| Estrategia | Enfoque | Ventaja | Desventaja |
|------|------|------|------|
| Fragmentación vertical de base de datos | Dividir la base de datos por dominio de negocio | Desacoplamiento del negocio, escalado independiente | Dificultad para hacer JOIN entre bases de datos |
| Fragmentación horizontal de tabla | Dividir una misma tabla en múltiples tablas según reglas | Volumen controlable por tabla | La elección de la clave de partición es crítica |
| Fragmentación vertical de tabla | Separar campos grandes en una tabla independiente | Menos I/O, mejora la eficiencia de consultas | Requiere JOIN adicionales |

**Principios para la elección de la clave de partición**:
- Elegir el campo más consultado (por ejemplo, user_id)
- La distribución de datos debe ser uniforme, evitando puntos calientes
- Intentar que los datos del mismo usuario estén en la misma partición (reducir consultas entre particiones)

### 3.3 Colas de mensajes

Las colas de mensajes son el "amortiguador" de los sistemas distribuidos; su función central es el desacoplamiento, la asincronicidad y el recorte de picos.

| Escenario | Sin cola | Con cola |
|------|---------|--------|
| Notificación tras un pedido | La API de pedidos llama sincrónicamente al servicio de notificaciones; si la notificación falla, el pedido falla | Tras el pedido exitoso, se envía un mensaje; el servicio de notificaciones lo consume de forma asíncrona |
| Compra flash (flash sale) | El tráfico instantáneo colapsa la base de datos | Las solicitudes entran primero en la cola, el backend consume según su capacidad |
| Sincronización de datos | El servicio A llama directamente a la API del servicio B | El servicio A publica un evento, el servicio B se suscribe y procesa |

---

## 4. Pensamiento de compromisos: no hay balas de plata

La esencia del diseño arquitectónico son los compromisos (Trade-off). Cada decisión tiene un costo; la clave es comprender el costo y tomar la decisión adecuada para la etapa actual.

| Dimensión de compromiso | Opción A | Opción B | Criterio de decisión |
|---------|--------|--------|---------|
| Consistencia vs. disponibilidad | Consistencia fuerte (CP) | Alta disponibilidad (AP) | ¿Puede el negocio tolerar inconsistencia temporal? |
| Rendimiento vs. costo | Caché completo | Caché bajo demanda | Volumen de datos y presupuesto |
| Simplicidad vs. flexibilidad | Arquitectura monolítica | Microservicios | Tamaño del equipo y complejidad del negocio |
| Tiempo real vs. lotes | Procesamiento en flujo | Procesamiento por lotes | Requisito de actualidad de los datos |
| Autoconstruido vs. gestionado | MySQL propio | Base de datos en la nube (RDS) | Capacidad de operaciones y costo |

::: tip Registros de Decisiones Arquitectónicas (ADR)
Cada decisión arquitectónica importante debería quedar documentada: **cuál era el contexto, qué alternativas se consideraron, por qué se eligió esta y cuáles son sus costos**. Esto no es para echar culpas, sino para que quienes vengan después entiendan "por qué se diseñó así en su momento".

El formato es simple:
- **Título**: Reemplazar XXX con YYY
- **Contexto**: Qué problema enfrentábamos
- **Decisión**: Qué solución elegimos
- **Razón**: Por qué se eligió esta opción
- **Costo**: Desventajas y riesgos de esta decisión
:::

### Compromisos erróneos más comunes

| Error | Manifestación | Lo correcto |
|------|------|---------|
| Optimización prematura | Sharding con solo 1.000 usuarios activos diarios | Usar una sola base de datos primero; dividir cuando se alcance el cuello de botella |
| Impulsado por la tecnología | "Quiero usar Kafka" en lugar de "necesito asincronicidad" | Partir del problema, no de la tecnología |
| Ignorar el costo de operaciones | Elegir la solución óptima pero el equipo no puede mantenerla | La solución debe coincidir con la capacidad del equipo |
| Buscar consistencia perfecta | Usar transacciones distribuidas en todos los escenarios | En la mayoría de escenarios, la consistencia eventual es suficiente |

---

## 5. Casos clásicos

A través de tres casos clásicos, conectaremos la metodología aprendida anteriormente.

### 5.1 Servicio de URLs cortas (TinyURL)

El servicio de URLs cortas es una pregunta clásica de diseño de sistemas en entrevistas; pequeño pero completo.

**Clarificación de requisitos**:
- Funcionalidad central: URL larga → URL corta (escritura), URL corta → redirección (lectura)
- Proporción lectura/escritura: aproximadamente 100:1 (lecturas mucho mayores que escrituras)
- Redirecciones diarias: 100 millones
- Las URLs cortas nunca expiran

**Estimación de capacidad**:

| Métrica | Cálculo | Resultado |
|------|------|------|
| QPS de escritura | 100 millones / 100 / 86.400 | ≈ 12 QPS |
| QPS de lectura | 100 millones / 86.400 | ≈ 1.200 QPS |
| QPS de lectura pico | 1.200 × 3 | ≈ 3.600 QPS |
| Almacenamiento a 5 años | 1 millón/día × 365 × 5 × 100B | ≈ 18 GB |
| Caché (20%) | 18 GB × 20% | ≈ 3,6 GB |

**Diseño arquitectónico**:

```
Ruta de escritura: Cliente → API Server → Generador de ID → Codificación Base62 → Escribir en MySQL + Redis
Ruta de lectura:  Cliente → CDN → API Server → Consulta Redis → Redirección 302
                                          ↓ (cache miss)
                                        Consulta MySQL → Rellenar Redis
```

**Decisiones de diseño clave**:
- Generación de código corto: ID distribuido Snowflake + codificación Base62, evitando colisiones de hash
- Estrategia de caché: Cache-Aside, URLs cortas activas aceleradas con CDN
- Base de datos: Una sola tabla es suficiente (18 GB es poco), indexada por código corto

### 5.2 Sistema de feed social

El feed de una plataforma social (muro de amigos, timeline de Twitter/Weibo) es otra pregunta clásica.

**Desafío central**: Cuando un usuario publica una actualización, ¿cómo la ven todos sus seguidores?

| Enfoque | Mecanismo | Ventaja | Desventaja |
|------|------|------|------|
| Modelo pull | Agregación en tiempo real de las publicaciones de los seguidos al leer | Escritura simple, menos almacenamiento | Lectura lenta, alta latencia con muchos seguidos |
| Modelo push | Al publicar, escribir en la bandeja de entrada de todos los seguidores | Lectura extremadamente rápida | Dispersión de escritura severa con cuentas populares |
| Push-Pull combinado | Usuarios normales push, cuentas populares pull | Equilibra rendimiento de lectura y escritura | Implementación compleja |

**Esquema push-pull combinado**:
- Seguidores < 10.000: al publicar, se envía a la caché de feed de todos los seguidores (modelo push)
- Seguidores > 10.000: no se envía; los seguidores leen en tiempo real al acceder (modelo pull)
- Cuando el usuario abre su feed: se combinan las publicaciones push + las publicaciones pull en tiempo real de cuentas populares, ordenadas por tiempo

### 5.3 Sistema de flash sale (compra relámpago)

El desafío central de un flash sale: concurrencia instantánea extremadamente alta + el inventario no puede sobrevenderse.

**Características del tráfico**:
- Antes del evento: muchos usuarios actualizan la página esperando
- En el instante del inicio: el QPS puede ser más de 100 veces el habitual
- Tras el evento: el tráfico disminuye rápidamente

**Estrategia de recorte de picas por capas**:

```
Solicitud del usuario → CDN (página estática) → Gateway (limitación de tasa) → Cola de mensajes (recorte de picas) → Servicio de inventario (deducción)
```

| Capa | Estrategia | Efecto |
|------|------|------|
| Frontend | Botón deshabilitado + retraso aleatorio + captcha | Filtra bots, dispersa las solicitudes |
| CDN | Caché de recursos estáticos | Reduce el 90% de las solicitudes de página |
| Gateway | Limitación con cubeta de tokens | Solo deja pasar el tráfico que el sistema puede soportar |
| Cola de mensajes | Las solicitudes entran en la cola, procesamiento asíncrono | Recorta picas, protege la base de datos |
| Servicio de inventario | Pre-deducción en Redis + operación atómica con Lua | Previene sobrevender, respuesta en milisegundos |

::: tip Principios fundamentales del flash sale
1. **Interceptar lo más arriba posible**: Lo que se pueda detener en el CDN no debe llegar a la capa de aplicación
2. **Separación de lectura y escritura**: La página de detalles del producto va a caché; solo la creación del pedido va a la base de datos
3. **Procesamiento asíncrono**: Tras hacer clic en "comprar", retornar inmediatamente "en cola", y procesar asíncronamente en segundo plano
4. **Planes de contingencia**: Limitación de tasa, circuit breaker, degradación; cada capa debe tener un Plan B si algo falla
:::

---

## Resumen

El diseño de sistemas es una habilidad altamente práctica; su núcleo radica en el pensamiento estructurado y la toma de decisiones de compromiso.

Repaso de los puntos clave de este capítulo:

1. **Marco de cuatro pasos**: Clarificación de requisitos → Estimación de capacidad → Diseño arquitectónico → Optimización en profundidad; ningún paso se puede saltar
2. **Estimación en el dorso de un sobre**: No se necesita precisión, solo el orden de magnitud para guiar las decisiones arquitectónicas
3. **Patrones centrales**: Caché, sharding, colas de mensajes, CDN, circuit breaker — estos son los "bloques de construcción" del diseño de sistemas
4. **Pensamiento de compromisos**: No hay solución perfecta, solo la adecuada para la etapa actual; documentar la razón y el costo de cada decisión
5. **Casos clásicos**: El servicio de URLs cortas practica lo básico, el feed social practica los modelos push-pull, el flash sale practica la alta concurrencia — dominando estos tres se pueden extrapolarse a otros casos

## Lecturas complementarias

- [System Design Interview](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF) - El clásico de entrevistas de diseño de sistemas de Alex Xu
- [Designing Data-Intensive Applications](https://dataintensive.net/) - Diseño de aplicaciones data-intensive de Martin Kleppmann
- [The System Design Primer](https://github.com/donnemartin/system-design-primer) - El recurso más completo de aprendizaje de diseño de sistemas en GitHub
- [ByteByteGo](https://bytebytego.com/) - Blog visual de diseño de sistemas de Alex Xu
