---
title: 'Qué hacer cuando encuentras errores al escribir código - Guía práctica para preguntar a la IA con capturas de pantalla'
description: 'Aprende a preguntar eficientemente a la IA para resolver diversos errores de desarrollo, domina el flujo estándar de capturas de pantalla, descripción y localización de problemas, y convierte a la IA en tu asistente de depuración.'
---

<script setup>
const duration = 'Aproximadamente <strong>30 minutos</strong>'
</script>

# Qué hacer cuando encuentras errores al escribir código

## Resumen del capítulo

<ChapterIntroduction :duration="duration" :tags="['Técnicas de depuración', 'Colaboración con IA', 'Resolución de problemas', 'Herramientas de desarrollo']" coreOutput="Un flujo estandarizado de resolución de errores" expectedOutput="Poder resolver independientemente el 90% de los errores comunes">

En la era de la IA, la forma de resolver errores ha cambiado.

No necesitas memorizar todos los tipos de errores, no necesitas ser un experto en depuración, ni siquiera necesitas entender qué significa el error.

<strong>Solo necesitas aprender una cosa: cómo preguntar a la IA.</strong>

Este capítulo te enseñará un flujo de resolución <strong>de lo simple a lo avanzado</strong>:

1. <strong>Paso 1: Pregunta directamente</strong>: Describe el síntoma + captura de pantalla, una sola frase
2. <strong>Paso 2: Complementa información</strong>: Si no se puede resolver, abre F12 y añade información clave

Después de dominar este flujo, <strong>podrás resolver el 90% de los errores por tu cuenta</strong>.

</ChapterIntroduction>

::: info Nota
Todos los métodos de este capítulo se basan en la experiencia real de uso de AI IDEs como Cursor/Trae/Claude, y pueden aplicarse directamente al desarrollo diario.
:::

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Preguntar directamente', description: 'Describe el síntoma + captura de pantalla' },
      { title: 'Complementar información', description: 'Abre F12 para localizar el problema' },
      { title: 'Iterar hasta resolver', description: 'Hasta que el problema se resuelva' }
    ]" />
  </ClientOnly>
</div>

## 1. Método central: pregunta a la IA con capturas de pantalla

::: warning ¿Por qué es importante este capítulo?

La primera reacción de muchos principiantes al encontrar errores es:
- Entrar en pánico y empezar a modificar código al azar
- Pasar media hora buscando "cómo solucionar el error xxx"
- Intentar entender qué significa el error por sí mismos
- Depurar solo hasta altas horas de la noche

<strong>Todo esto es perder el tiempo.</strong>

En la era de la IA, la depuración se ha convertido en algo muy simple:

```
Ver error → Captura de pantalla → Pregunta a la IA → Haz lo que dice la IA
```

No necesitas entender el error, no necesitas saber depurar, ni siquiera necesitas saber dónde está el problema.

<strong>Solo necesitas aprender cómo preguntar.</strong>

:::

### 1.1 La forma más simple de preguntar

No necesitas plantillas complejas, elige entre dos métodos:

**Método 1: Describe el síntoma**

Formato: qué hiciste, qué apareció ahora

```
Acabo de modificar el código de la página de login y ahora la página está en blanco, ¿qué hago?
```

**Método 2: Captura de pantalla**

Haz una captura de pantalla directamente de la página actual o del mensaje de error

```
[captura de pantalla]

¿Cómo soluciono este error?
```

**El mejor método: Descripción + captura de pantalla**

```
Acabo de modificar el código de la página de login y ahora la página está en blanco.

[captura de pantalla]

¿Qué hago?
```

**Recuerda: describe claramente el contexto, añade una captura de pantalla, y la IA podrá ayudarte más rápido.**

### 1.2 Cómo explicar el problema claramente

Muchos principiantes saben que deben preguntar, pero no saben cómo expresarse. En realidad, solo necesitas explicar tres cosas:

**1. Qué acabas de hacer**

```
Acabo de hacer clic en el botón guardar
Acabo de modificar el código de la página de login
Acabo de actualizar la página
```

**2. Qué ves ahora**

```
Ahora la página está en blanco
Ahora el botón no responde al hacer clic
Ahora muestra un mensaje de error
```

**3. Qué efecto quieres lograr**

```
Quiero que los datos se guarden correctamente
Quiero que la página se muestre normalmente
Quiero que aparezca un aviso después de hacer clic en el botón
```

**Ejemplo completo:**

```
Acabo de hacer clic en el botón guardar, y ahora la página muestra un error de "error al guardar".

[captura de pantalla]

Quiero que los datos del formulario se guarden correctamente en la base de datos, ¿qué debo hacer?
```

**Principios clave:**
- Describe en lenguaje llano, sin terminología técnica
- Sigue el orden cronológico: qué hiciste primero, qué pasó después
- Expresa tu expectativa para que la IA sepa qué quieres

## 2. Paso 1: Describe el síntoma directamente

Cuando encuentres un problema, <strong>no te apresures a abrir F12</strong>. Primero describe el síntoma, haz una captura de pantalla de la página actual y pásasela a la IA.

Muchas veces, la IA puede dar una solución directamente al ver la captura de pantalla.

### 2.1 Cómo describir síntomas comunes

::: tip Simplemente describe

**Página en blanco**
```
La página se abre en blanco, ¿qué hago?

[captura de pantalla]
```

**El botón no responde al hacer clic**
```
Al hacer clic en este botón no pasa nada, ayúdame a revisar.

[captura de pantalla]
```

**Los datos no se guardan**
```
Hice clic en guardar, pero los datos no se guardaron, ¿qué hago?

[captura de pantalla]
```

**El estilo no se muestra correctamente**
```
El botón está desalineado, ¿cómo lo ajusto?

[captura de pantalla]
```

**Error en la API**
```
La llamada a la API da error, ayúdame a revisar.

[captura de pantalla]
```

:::

### 2.2 Si la IA lo resuelve directamente

¡Felicidades, problema resuelto! Simplemente haz las modificaciones que indica la IA.

### 2.3 Si la IA dice "necesito más información"

Entonces es cuando necesitas abrir F12 y complementar información clave. Sigue leyendo.

## 3. Paso 2: Complementa información clave

Cuando la IA dice que necesita más información, según el tipo de problema, abre F12 y captura el contenido correspondiente.

### 3.1 Cuándo necesitas complementar información

La IA podría responder así:
- "Por favor, abre la Console a ver si hay errores"
- "Haz una captura de pantalla del panel Network"
- "Necesito ver el mensaje de error específico"

En ese caso, sigue las indicaciones de abajo para complementar las capturas.

### 3.2 Complementar información de Console (página en blanco/errores)

::: tip Pasos

**Paso 1: Presiona F12 para abrir las herramientas de desarrollo**

En Mac es `Cmd+Option+I`, o haz clic derecho en la página y selecciona "Inspeccionar".

**Paso 2: Cambia a la pestaña Console**

**Paso 3: Haz una captura de pantalla de los errores en rojo**

**Paso 4: Envíalo a la IA**

```
Los errores de Console son los siguientes:

[captura de pantalla]
```

:::

### 3.3 Complementar información de Network (problemas de datos/errores de API)

::: tip Pasos

**Paso 1: Presiona F12 para abrir las herramientas de desarrollo**

**Paso 2: Cambia a la pestaña Network**

**Paso 3: Repite la operación** (haz clic en guardar/actualiza la página)

**Paso 4: Encuentra la petición correspondiente y haz una captura de pantalla**

- Mira la URL y el código de estado
- Mira el Payload (parámetros enviados)
- Mira el Response (resultado devuelto)

**Paso 5: Envíalo a la IA**

```
La información de Network es la siguiente:

Petición: [captura 1]
Parámetros: [captura 2]
Respuesta: [captura 3]
```

:::

### 3.4 Complementar información de Elements (problemas de estilos)

::: tip Pasos

**Paso 1: Clic derecho en el elemento → "Inspeccionar"**

Las herramientas de desarrollo se posicionarán automáticamente en ese elemento.

**Paso 2: Haz una captura de pantalla del panel Styles**

**Paso 3: Envíalo a la IA**

```
Los estilos del elemento son los siguientes:

[captura de pantalla]
```

:::

## 4. Paso 3: Itera hasta resolver

### 4.1 Lo que NO debes hacer

Estas acciones harán que pierdas tiempo:

Entrar en pánico al ver un error y empezar a modificar código al azar
Pasar media hora buscando soluciones de errores
Intentar entender el significado de cada error por tu cuenta
Depurar solo hasta altas horas de la noche

### 4.2 Lo que SÍ debes hacer

Sigue este flujo:

Primero describe el síntoma y haz una captura de pantalla para preguntar
Cuando la IA diga que necesita más información, abre F12 y complementa
Modifica el código según las sugerencias
Después de modificar, prueba; si el problema persiste, sigue haciendo capturas y preguntando

## 5. Resumen: Flujo completo

```
Encuentras un problema
    ↓
Describe el síntoma directamente + captura de pantalla
    ↓
Pásalo a la IA: "¿Qué hago?"
    ↓
¿La IA lo resolvió directamente?
    ↓ Sí
Haz lo que dice la IA
    ↓
Prueba si se resolvió
    ↓
    ↓ No / La IA necesita más información
Abre F12 y complementa información clave
    ↓
Envíalo de nuevo a la IA
    ↓
Repite hasta resolver
```
