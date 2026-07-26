---
title: 'Practica de proyecto completo - De Demo a prototipo de nivel de producto'
description: 'Sal de la fase de Demo, aprende a mejorar los enlaces del producto, construye datos de simulacion realistas, e itera rapidamente con retroalimentacion.'
---

<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const duration = 'Aproximadamente <strong>3 dias</strong>'
const relatedArticles =
  relatedArticlesMap['es-es/stage-1/complete-project-practice'] ?? []
</script>

# Practica de proyecto completo

## Resumen del capitulo

<ChapterIntroduction :duration="duration" :tags="['Pensamiento de producto', 'Datos de simulacion', 'Mejora de interaccion', 'LocalStorage']" coreOutput="1 prototipo de producto IA con funcionalidad completa" expectedOutput="Aplicacion web con flujo completo y datos realistas">

En el capitulo anterior integramos capacidades de IA y el Demo ya funciona, pero aun esta <strong>lejos</strong> de ser un verdadero "producto": al actualizar la pagina los <strong>datos desaparecen</strong>, un error causa <strong>pantalla en blanco</strong>, la lista solo tiene "dato de prueba 1, dato de prueba 2", y si el usuario hace clic en el lugar equivocado <strong>no puede deshacer</strong>...

Este capitulo va a <strong>llenar todos estos huecos</strong>: vamos a <strong>completar el flujo completo del producto</strong>, usar IA para generar <strong>datos de negocio realistas</strong> en lugar de datos falsos, anadir <strong>manejo de errores y retroalimentacion al usuario</strong>, y finalmente pulir un prototipo completo que <strong>se pueda mostrar a otros</strong>.

Este es el <strong>ultimo capitulo</strong> de la etapa inicial. Despues de completar este paso, habras logrado la transformacion de "no saber programar en absoluto" a "<strong>poder crear independientemente un prototipo de producto IA</strong>".

</ChapterIntroduction>

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Completar el flujo', description: 'De funcionalidad aislada a ciclo completo' },
      { title: 'Inyectar el alma', description: 'Datos de negocio realistas simulados' },
      { title: 'Iterar con retroalimentacion', description: 'Mejorar la experiencia con retroalimentacion real' },
      { title: 'Proyecto final', description: 'Tu proyecto de graduacion' }
    ]" />
  </ClientOnly>
</div>

## 1. Rechaza el "Happy Path": completa el flujo central

Muchos principiantes que hacen prototipos suelen limitarse al "Happy Path" (el camino ideal): el usuario hace clic -> la API responde con exito -> se muestra el resultado.
Pero en el mundo real, las cosas rara vez son tan simples. Para que tu prototipo parezca un producto real, necesitas considerar los siguientes eslabones "invisibles".

### 1.1 Anadir "espera" y "retroalimentacion"

Cuando el usuario hace clic en "generar texto", la IA suele tardar varios segundos en responder. Si la interfaz no muestra ninguna reaccion, el usuario pensara que el programa se ha roto.
**Necesitas que tu AI IDE te ayude a anadir estados de Loading:**

> Ejemplo de prompt:
> "Cuando haga clic en el boton de generar, cambialo a 'Generando...' y desactivalo, y al mismo tiempo muestra una animacion de carga en el area derecha. Solo restaura el estado normal despues de que la API devuelva el resultado."

### 1.2 Manejar "fallos" y "excepciones"

La API Key puede caducar, la red puede desconectarse.
**Necesitas que tu AI IDE te ayude a manejar los errores:**

> Ejemplo de prompt:
> "Si la peticion a la API falla, no muestres el error directamente en la consola. En su lugar, muestra una notificacion roja (Toast) en la parte superior de la pagina que diga 'Generacion fallida, por favor intenta de nuevo mas tarde', y permite que el usuario vuelva a hacer clic en generar."

### 1.3 Persistencia del historial de conversacion

En el proceso de interaccion con la IA, necesitamos guardar el contenido de las conversaciones para que el usuario pueda revisar el historial y continuar intercambios anteriores. En esta etapa aun no introducimos una base de datos; puedes elegir entre las siguientes soluciones ligeras:

**Opciones de almacenamiento:**

| Opcion | Escenario aplicable | Caracteristicas |
| ---------------- | -------------------------------- | ------------------------------------ |
| **LocalStorage** | Proyecto puramente frontend, datos del usuario guardados en el navegador | Implementacion simple, no se pierde al actualizar, no se sincroniza entre dispositivos |
| **Archivo JSON** | Prototipo local, datos almacenados en formato archivo | Estructura clara, facil de depurar, editable manualmente |
| **Archivo TXT** | Solucion mas simple, registro rapido de contenido de texto | Formato libre, buena compatibilidad |

**Ejemplo de contenido de conversacion:**
El historial de conversacion guardado suele incluir el siguiente contenido:

```json
[
  {
    "role": "user",
    "content": "Ayudame a generar un texto de venta para unos auriculares Bluetooth en TikTok",
    "timestamp": "2026-01-20 10:30:00"
  },
  {
    "role": "assistant",
    "content": "[Texto recomendacion de auriculares Bluetooth]\n\n🎧 Adios al retraso, experiencia de escucha inmersiva\n\n chicas! Estos auriculares Bluetooth son increibles\n\n 40dB de cancelacion activa de ruido, entra instantaneamente al mundo de la musica\n 30 horas de bateria super larga, una semana de viaje sin cargar\n llamadas claras como en persona, incluso en el metro ruidoso\n diseno semi-in-ear, comodos de usar durante horas\n\n Oferta por tiempo limitado, haz clic en el enlace de abajo para conseguirlos!",
    "timestamp": "2026-01-20 10:30:05"
  }
]
```

**Prompt de implementacion:**

> "Por favor ayudame a implementar la funcion de guardado del historial de conversacion. Soporta guardar los registros de conversacion entre el usuario y la IA como un archivo JSON (o usando LocalStorage). Cada vez que se entra a la pagina, carga automaticamente el historial de conversacion, y permite ver y eliminar registros individuales."

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="1" :items="[
      { title: 'Completar el flujo', description: 'De funcionalidad aislada a ciclo completo' },
      { title: 'Inyectar el alma', description: 'Datos de negocio realistas simulados' },
      { title: 'Iterar con retroalimentacion', description: 'Mejorar la experiencia con retroalimentacion real' },
      { title: 'Proyecto final', description: 'Tu proyecto de graduacion' }
    ]" />
  </ClientOnly>
</div>

## 2. Inyectar el alma: datos realistas simulados (Mock Data)

Una pagina vacia no puede convencer a nadie. Imagina que le muestras a alguien un "espacio de trabajo de materiales de e-commerce", y el historial esta completamente vacio, o solo tiene una linea "test / test / test".
Para lograr el mejor efecto de demostracion, necesitamos "falsificar" algunos datos realistas que hagan que tu prototipo parezca un producto real que ha estado operando durante medio ano.

### 2.1 Deja que la IA te ayude a disenar la estructura de datos

No necesitamos pensar por nosotros mismos como deberia llamarse cada campo (por ejemplo, si debe ser `name` o `title`); esto se lo podemos dejar completamente a la IA.

Solo necesitas decirle a la IA tu **escenario de negocio**:

> **Ejemplo de prompt:**
> "Estoy haciendo un prototipo de un **espacio de trabajo de materiales de e-commerce para TikTok**.
> Por favor ayudame a disenar una estructura de datos JSON para describir una 'tarea de producto'.
> Esta tarea deberia incluir: informacion basica del producto (nombre, categoria), materiales de entrada (enlaces de imagenes), y resultados generados por IA (titulo, texto, imagen de poster).
> Por favor dame directamente un ejemplo JSON."

La IA automaticamente concebira campos como `productName`, `generatedContent` basandose en tu descripcion.

### 2.2 Deja que la IA produzca en lote datos "realistas"

Con la estructura de datos lista, el siguiente paso es hacer que la IA te ayude a "rellenar los huecos" y generar un conjunto de datos que parezcan reales.

**Tecnicas de prompt:**
No puedes simplemente decirle a la IA "generame datos"; necesitas, como si le asignaras una tarea a un pasante, decirle el **contexto de negocio** y los **requisitos de contenido**:

- **Contexto de negocio**: dile a la IA que hacemos "e-commerce para TikTok", asi que los titulos de productos deben ser llamativos (por ejemplo "el arma secreta para verse mas delgado/a", "imprescindible para estudiantes"), y los textos deben ser coloquiales.
- **Requisitos de imagen**: para que el prototipo se vea bien, las imagenes no deben ser marcadores de posicion en blanco y negro; es mejor usar imagenes aleatorias coloridas de paisajes u objetos reales.

> **Ejemplo de prompt:**
> "Basandote en la estructura disenada anteriormente, generame 10 datos de simulacion realistas.
> (Nota: no necesariamente en formato JSON. Si estas escribiendo frontend, puedes hacer que genere directamente un array JavaScript; si usas Python, puedes hacer que genere una List.)
>
> **Requisitos del escenario de negocio**:
>
> 1. Supongamos que esta es una tienda departamental general, con productos en las categorias de 'moda femenina', 'tecnologia' y 'cosmetica'.
> 2. **Los titulos y textos generados deben ser muy 'estilo TikTok'**: por ejemplo, los titulos deben incluir emojis (, ), y los textos deben usar un tono como 'increible', 'probado y comprobado'.
> 3. **Campo de imagen**: usa uniformemente el formato `https://picsum.photos/seed/{random_id}/300/400`, asegurando que cada imagen sea diferente."

**Ejemplo de Mock Data generado:**

```javascript
export const mockProductTasks = [
  {
    id: 'task_001',
    name: 'Vestido retro floral frances de verano',
    status: 'completed',
    input: {
      category: 'Moda femenina',
      features: ['cintura ajustada', 'efecto adelgazante', 'elegante'],
      originalImage: 'https://picsum.photos/seed/dress_input/300/400'
    },
    output: {
      generatedTitle: ' Quien se lo ponga se vera genial! Este vestido floral frances es realmente increible ',
      generatedCopy:
        ' Chicas! Este vestido realmente estiliza muchisimo! El diseno de cintura ajustada es increible, te da forma al instante. La tela es muy transpirable, no sofoca en verano. Primera opcion para citas y paseos!',
      generatedPosterImage: 'https://picsum.photos/seed/dress_output/300/400'
    },
    createdAt: '2026-01-20T10:00:00Z'
  },
  {
    id: 'task_002',
    name: 'Auriculares Bluetooth Pro con cancelacion de ruido superpotente',
    status: 'completed',
    input: {
      category: 'Tecnologia',
      features: ['cancelacion de ruido', 'bateria extralarga', 'baja latencia'],
      originalImage: 'https://picsum.photos/seed/tech_input/300/400'
    },
    output: {
      generatedTitle: ' Finalmente los encontre! La cancelacion de ruido de estos auriculares es brutal! ',
      generatedCopy:
        'Ponetelos y el mundo se silencia al instante. Calidad de sonido increible, escuchar musica es como estar en vivo. La bateria tambien es impresionante, una carga dura una semana! Imprescindible para estudiantes!',
      generatedPosterImage: 'https://picsum.photos/seed/tech_output/300/400'
    },
    createdAt: '2026-01-21T14:30:00Z'
  }
  // ... mas datos
]
```

### 2.3 (Avanzado) Usar LocalStorage para implementar "falsas operaciones CRUD"

Si deseas que los "datos de simulacion" generados no solo se puedan ver, sino que tambien se puedan eliminar y modificar, e incluso que las tareas recien generadas persistan despues de actualizar la pagina, puedes combinarlo con `LocalStorage`.

> **Ejemplo de prompt:**
> "Por favor ayudame a implementar una funcion de almacenamiento de datos.
>
> 1. Lee primero los datos desde `localStorage`.
> 2. Si `localStorage` esta vacio, inicializa con los datos Mock generados anteriormente y guardalos en `localStorage`.
> 3. Al mismo tiempo ayudame a escribir las funciones `addProductTask` y `deleteProductTask`, que deben sincronizar los cambios con `localStorage` en cada operacion."

Con este paso, tu prototipo tendra "memoria", y la experiencia del usuario sera practicamente identica a la de un producto real.

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="2" :items="[
      { title: 'Completar el flujo', description: 'De funcionalidad aislada a ciclo completo' },
      { title: 'Inyectar el alma', description: 'Datos de negocio realistas simulados' },
      { title: 'Iterar con retroalimentacion', description: 'Mejorar la experiencia con retroalimentacion real' },
      { title: 'Proyecto final', description: 'Tu proyecto de graduacion' }
    ]" />
  </ClientOnly>
</div>

## 3. Recopilar retroalimentacion e iterar rapidamente

No se pueden hacer buenos productos a puerta cerrada. Ahora tu prototipo ya tiene "funcionalidad central" + "flujo completo" + "datos de demostracion"; es hora de mostrarselo a otros.

### 3.1 Con quien probar? Como probar?

- **Busca amigos/colegas**: no necesitan entender de tecnologia, solo necesitan intentar usarlo.
- **Observa en lugar de guiar**: no digas "haz clic aqui", sino mira adonde hacen clic ellos. Si no encuentran un boton, es que el diseno tiene un problema.
- **Metodo "Wizard of Oz"**: si tu IA aun no esta bien conectada, puedes modificar manualmente los datos en segundo plano (o en la base de datos) para simular la respuesta de la IA, verificando primero si el usuario realmente necesita esta funcionalidad.

### 3.2 Ante bugs y criticas

- **Estilos desordenados**: pueden desordenarse en diferentes tamanos de pantalla.
  - **Accion**: haz una captura de pantalla y enviala al AI IDE -> "En este ancho de pantalla esta desordenado, ayudame a arreglarlo."
- **Operacion incomoda**: "Este flujo es demasiado complicado".
  - **Accion**: dile la sugerencia al AI IDE -> "El usuario cree que subir primero y luego generar es muy lento, se puede cambiar a generacion con un solo clic?"
- **Nuevas necesidades**: "Si tuviera esta funcionalidad seria genial".
  - **Accion**: evalua si es esencial; si lo es, haz que la IA implemente rapidamente una version simplificada.

**Recuerda: en esta etapa, la IA es tu mejor asistente de modificaciones. Tu solo necesitas encargarte de descubrir los problemas; las modificaciones de codigo dejaselas a ella.**

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="3" :items="[
      { title: 'Completar el flujo', description: 'De funcionalidad aislada a ciclo completo' },
      { title: 'Inyectar el alma', description: 'Datos de negocio realistas simulados' },
      { title: 'Iterar con retroalimentacion', description: 'Mejorar la experiencia con retroalimentacion real' },
      { title: 'Proyecto final', description: 'Tu proyecto de graduacion' }
    ]" />
  </ClientOnly>
</div>

## 4. Proyecto final de la etapa: completa tu "proyecto de graduacion"

Felicidades! Has completado todo el proceso desde los "requisitos" hasta el "prototipo" y despues la "integracion de IA". Ahora es el momento de mostrar tu resultado final.

**Este proyecto final no se limita al "espacio de trabajo de materiales de e-commerce".** Necesitas combinar tus propios intereses o experiencia profesional para crear un prototipo de producto IA unico.

### Seleccion de tema y requisitos

Necesitas elegir el escenario mas cercano de la **[referencia de escenarios por categoria de industria](../appendix-industry-scenarios/index.md)**, o concebir un escenario completamente nuevo basandote en tus propias ideas.

**El proyecto debe utilizar de manera integral todo lo aprendido en las lecciones anteriores:**

1.  **Construccion del prototipo**: usa tecnologia frontend para construir una interfaz bonita y facil de usar.
2.  **Control de requisitos**: no busques algo exhaustivo, pero si que la funcionalidad central forme un ciclo logico cerrado.
3.  **Integracion de API**: integra modelos de IA reales (LLM/VLM, etc.), dotando a la aplicacion de verdadera inteligencia.
4.  **Implementar una aplicacion funcional**: no solo paginas estaticas, sino una aplicacion dinamica con flujo de datos y retroalimentacion interactiva.

### Entregables

Al final necesitas entregar los dos siguientes elementos:

1.  **Una aplicacion de prototipo completa**: desplegada en linea o ejecutable localmente, con un flujo de uso completo.
2.  **Un video de demostracion de 30 segundos**: graba un video presentando brevemente el escenario de tu aplicacion y demostrando la operacion real de la funcionalidad central.

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px;">
  <template #header>
    <div style="font-weight: bold; font-size: 16px;">Lista de verificacion del desafio final</div>
  </template>

  <p>
    Esta es la ultima batalla del Stage 1. Por favor revisa tu proyecto segun la siguiente lista:
  </p>

  <div style="font-weight: bold; margin-bottom: 10px;">Autoverificacion de funcionalidad central</div>
  <ul style="list-style-type: none; padding-left: 0;">
    <li><label><input type="checkbox" disabled /> <strong>Escenario claro</strong>: has seleccionado una industria o escenario de aplicacion concreto</label></li>
    <li><label><input type="checkbox" disabled /> <strong>Ciclo logico cerrado</strong>: el flujo central funciona, no solo el Happy Path</label></li>
    <li><label><input type="checkbox" disabled /> <strong>Impulsado por IA</strong>: se ha llamado realmente a la API de un modelo grande, no respuestas predefinidas</label></li>
    <li><label><input type="checkbox" disabled /> <strong>Experiencia completa</strong>: incluye Loading, manejo de errores y datos de simulacion</label></li>
  </ul>

  <div style="font-weight: bold; margin: 20px 0 10px;">Preparacion de entregables</div>
  <ul style="list-style-type: none; padding-left: 0;">
    <li><label><input type="checkbox" disabled /> <strong>Aplicacion de prototipo</strong>: el codigo esta completo y puede ejecutarse</label></li>
    <li><label><input type="checkbox" disabled /> <strong>Video de demostracion</strong>: unos 30 segundos, mostrando claramente los puntos destacados centrales</label></li>
  </ul>
</el-card>

## Proximo paso

Despues de completar el proyecto final, ya tienes la capacidad de "desarrollar independientemente un prototipo de aplicacion IA".
En el siguiente Stage 2, profundizaremos en el desarrollo fullstack mas complejo, aprendiendo como convertir este prototipo en una aplicacion de nivel comercial que realmente pueda ponerse en linea, con base de datos y sistema de usuarios.

Nos vemos en la siguiente etapa!

<RelatedArticlesSection
  title="Sigue avanzando"
  description="Felicidades por completar el Stage 1. Estos capitulos pueden ayudarte a entrar en el desarrollo de ingenieria."
  :items="relatedArticles"
/>
