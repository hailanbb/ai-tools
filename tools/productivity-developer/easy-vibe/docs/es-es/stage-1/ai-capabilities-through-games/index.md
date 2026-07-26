# Nivel Basico 1: En la era de la IA, saber hablar es saber programar

Este es un tutorial de aprendizaje **basado en proyectos**. Te recomendamos seguir los pasos uno por uno y tratar de reproducir los resultados.
No tengas miedo de equivocarte o de cambiar cosas. Recuerda:

<div style="text-align: center;">
<div style="display: inline-block; padding: 8px 20px; border-radius: 8px; border: 1px dashed #FFB6C1; background: linear-gradient(135deg, #FFF0F5 0%, #FFE4EC 100%); margin: 12px 0;">
  <span style="font-size: 15px; font-weight: 500; color: #666;">Terminar es mas importante que ser perfecto</span>
</div>
</div>

<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const duration = 'aprox. <strong>4 horas</strong> (puede hacerse en varias sesiones)'
const relatedArticles =
  relatedArticlesMap['es-es/stage-1/ai-capabilities-through-games'] ?? []
</script>

## Introduccion del capitulo

<ChapterIntroduction :duration="duration" :tags="['Programacion conversacional', 'Mini-juegos nativos de IA', 'Practica con Snake']" coreOutput="Snake nativo de IA + un mini-juego propio" expectedOutput="1 Snake nativo de IA ejecutable + (opcional) 1 mini-juego o demo propio">

Si <strong>no sabes programar</strong> o solo conoces lo minimo, este capitulo es para ti. Empezamos desde cero: vas a usar <strong>conversacion</strong> para que la IA te ayude a escribir codigo. Sin memorizar sintaxis ni configurar entornos, en muchos casos puedes ejecutarlo directamente en una pagina web.

Construiras tu <strong>primer programa que corre</strong>: una version de Snake que puede "comerse palabras", "escribir poemas" o "dibujar". Veras como se siente programar con IA: no es que la IA piense por ti; tu expresas tu intencion y la IA la implementa.

</ChapterIntroduction>

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Nivel 1: Hablar = Programar', description: 'Aprende programacion con IA a traves de juegos. De Snake a tus propios mini-juegos nativos de IA.' },
      { title: 'Exploracion rapida', description: 'Experiencia de 60 segundos' },
      { title: 'Practica nativa', description: 'Construir Snake nativo de IA' },
      { title: 'Extender y crear', description: 'Crear un juego propio' }
    ]" />
  </ClientOnly>
</div>

## 1. La dificultad de la gente comun y la oportunidad

Mucha gente tiene ideas: una herramienta para gastos, una pagina para registrar el crecimiento de un hijo, o incluso un mini-juego. Pero al pensar en "escribir codigo" o "buscar programadores", se desanima.

Con la IA aparece una posibilidad real: no necesitas saber programar para empezar; necesitas aprender a decirle a la IA con claridad que quieres. Incluso para desarrolladores profesionales, la IA ya es parte del flujo de trabajo, lo que significa que para quienes no programan, hablar bien con un agente se vuelve una habilidad muy valiosa.

Esta parte del curso busca que desarrolles una nueva capacidad: <strong>crear aplicaciones describiendo requisitos en lenguaje natural</strong>. Aprenderas a comunicarte con la IA "como una computadora": objetivos claros, pasos, entradas y salidas, y como depurar cuando algo no sale bien.

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="1" :items="[
      { title: 'Dificultad y oportunidad', description: 'Una nueva forma de crear con IA' },
      { title: 'Exploracion rapida', description: 'Experiencia de 60 segundos' },
      { title: 'Practica nativa', description: 'Construir Snake nativo de IA' },
      { title: 'Extender y crear', description: 'Crear un juego propio' }
    ]" />
  </ClientOnly>
</div>

## 2. Hasta donde puede llegar la IA hoy

Pregunta concreta: si no sabes escribir codigo, hasta donde puedes llegar con una IA conversacional?

De forma realista, hoy la IA suele funcionar muy bien para:

- herramientas internas simples,
- tableros de visualizacion,
- mini-juegos ligeros,
- prototipos para validar ideas desde perspectiva de producto.

Para productos grandes y listos para produccion, aun hace falta trabajo humano en diseno de flujo, detalles, seguridad, rendimiento y mantenibilidad. Pero para prototipos y herramientas personales, el nivel es sorprendentemente util.

### 2.1 Construye Snake en 60 segundos (con z.ai)

Abre la pagina de laboratorio del curso: [z.ai](https://chat.z.ai/). En este tutorial usaremos su modo de "desarrollo full-stack" para ver como la IA crea un proyecto y lo previsualiza.

::: details Que significa "programar desde el navegador"

Antes, para hacer una app web tenias que instalar entornos (Node.js, Python), configurar editor, aprender HTML/CSS/JS y resolver dependencias.

Ahora, con plataformas de programacion con IA:

- abres el navegador,
- describes la funcionalidad en lenguaje natural,
- la IA genera codigo y muestra vista previa.

Este estilo se parece a "conversar = programar": el foco pasa de escribir sintaxis a describir requisitos.

:::

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/index-2026-01-07-18-25-03.png)

Pega un requerimiento simple como este y ejecutalo:

```txt
Haz un juego de Snake:
1. Control con flechas
2. Al comer, la serpiente crece y sube la puntuacion
3. Chocar con la pared o contigo mismo termina el juego
4. Boton de iniciar y reiniciar
5. Interfaz simple y agradable
```

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/index-2026-01-07-18-34-03.png)

Cuando termine, a la derecha veras la pagina lista para probar. Normalmente puedes:

- hacer scroll,
- entrar en pantalla completa,
- descargar el proyecto,
- ver el codigo.

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/index-2026-01-07-18-35-11.png)

Para ver el codigo, usa el icono de codigo en la esquina superior derecha.

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image7.png)

::: tip Explora mas herramientas

Ademas de z.ai, puedes probar herramientas como Google AI Studio, v0.dev, Bolt, Replit Agent y otras. Lo importante no es la marca, sino practicar el mismo ciclo:

1. describir requisito,
2. probar en el navegador,
3. corregir con una instruccion concreta,
4. iterar.

:::

### 2.2 Que puede y que no puede hacer la programacion conversacional

Un resumen practico:

- La IA es muy buena para construir algo "pequeno y completo" si describes bien UI e interacciones.
- Para proyectos grandes, necesitas una vision de proceso: dividir el problema en pasos, definir entradas/salidas, y luego pedir a la IA que implemente modulos por separado.
- "Que pueda escribirlo" no significa "que este listo para uso real". Para produccion hay que revisar arquitectura, seguridad, pruebas y calidad.

::: warning Guia rapida de escenarios

- **Prototipo / demo / herramienta interna**: excelente para que la IA haga la primera version, luego tu iteras.
- **Producto grande para usuarios reales**: requiere inversion sostenida en ingenieria.
- **Alta seguridad / alta regulacion (pagos, salud, riesgo)**: no se debe "generar y publicar" sin revision y pruebas estrictas.

:::

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="2" :items="[
      { title: 'Dificultad y oportunidad', description: 'Una nueva forma de crear con IA' },
      { title: 'Exploracion rapida', description: 'Experiencia de 60 segundos' },
      { title: 'Practica nativa', description: 'Construir Snake nativo de IA' },
      { title: 'Extender y crear', description: 'Crear un juego propio' }
    ]" />
  </ClientOnly>
</div>

## 3. Practica: hacer un Snake "nativo de IA"

La idea de "nativo de IA" es que el juego no solo sea un Snake tradicional. Puedes agregar una habilidad IA dentro del gameplay, por ejemplo:

- al comer una palabra, traducirla y generar ejemplos,
- al comer un tema, generar una frase o un mini poema,
- al comer un prompt, generar una imagen o un icono.

Lo importante es practicar el mismo patron: describir claramente y pedir a la IA que implemente, y luego iterar en base al resultado.

> Consejos al pedir cambios:
>
> 1. describe el fenomeno observable,
> 2. explica el comportamiento esperado,
> 3. si hay error, copia el error completo,
> 4. pide que modifique el codigo minimo necesario.

Para seguir el flujo visual de la practica, veras capturas de referencia:

> ![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image12.png)
>
>    ![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image13.png)
>
> ![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image14.png)

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image15.png)

En esta practica tambien puedes aprender un habito clave: cuando algo sale mal, no "adivines". Copia y pega el error a la IA y pide explicacion simple y una correccion concreta.

![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image56.png)
![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image57.png)
![](../../../zh-cn/stage-1/ai-capabilities-through-games/images/image58.png)

## 4. Extiende: crea un mini-juego propio

Una vez que Snake funcione, tu objetivo no es "memorizar codigo", sino crear variaciones.

Algunas ideas:

- un juego de reaccion (click en el momento correcto),
- un quiz corto de vocabulario,
- un contador/temporizador con recompensas,
- un "generador" que produce tarjetas y puntuacion.

Lo mas importante: define primero el objetivo y el bucle del juego (entrada -> estado -> salida) y luego pide a la IA que lo implemente.

![1767350588191](../../../zh-cn/stage-1/ai-capabilities-through-games/images/1767350588191.png)

## Tarea

1. Repite el juego Snake basico con tus propios colores y UI.
2. Agrega una habilidad IA dentro del juego (traduccion, resumen, generacion de texto, etc.).
3. Crea una variante de mini-juego (aunque sea muy simple) y asegurate de que sea jugable.

## Siguiente paso

En los siguientes capitulos conectaremos capacidades IA mas concretas (texto a texto, imagen a texto, texto a imagen) y avanzaremos hacia proyectos mas completos.

<RelatedArticles :articles="relatedArticles" />
---
title: 'Principiante 1: En la era de la IA, hablar es programar'
description: 'Crea una serpiente AI-native con dialogo y aplica el metodo para construir tu propio mini juego o demo.'
---
