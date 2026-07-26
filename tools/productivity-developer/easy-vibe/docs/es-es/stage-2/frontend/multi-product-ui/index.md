# Disena paginas y botones siguiendo guias de diseno de UI

Muchas personas dicen "quiero que mi pagina se parezca mas a la de Apple" o "quiero que los botones se vean mas sofisticados", pero cuando realmente empiezan a trabajar, a menudo se quedan atascados en una pregunta:

**Exactamente, que debo tomar como referencia?**

Mirar capturas de pantalla e imitar solo te ensena si algo "se parece o no". Pero cuando abres las guias de diseno de Apple, Google, Microsoft y Atlassian, descubres que lo realmente impresionante no es el estilo visual, sino que **explican claramente los problemas de diseno**: que destacar primero en una pagina, como jerarquizar los botones, como enfatizar las operaciones - estos criterios de juicio son lo esencial.

> Seguir guias de diseno no se trata de hacer que algo "se parezca a alguien", sino de aprender como otros toman decisiones.

:::: info Por que aprender esto ahora
Las reglas de diseno ya han sido entrenadas en los modelos, absorbidas por defecto en las herramientas de diseno, e incluso con solo pegar algunas capturas de pantalla la IA puede aprenderlas. Pero aun necesitamos saber de donde vienen estas reglas y por que se definen asi.
::::

## Primero mira algunos textos originales y siente la diferencia

Si antes pensabas que "las guias de diseno solo hablan de estilo", primero mira algunas citas oficiales.

Normalmente en un equipo solemos decir cosas como:

- Haz un dropdown
- Pon un menu aqui
- Agrega algunas funciones a la barra de menu
- Pon dos botones aqui, uno de confirmar y otro de cancelar

Parece que no hay problema, pero en las guias de las grandes empresas, estos terminos no son conceptos vagos, sino que estan desglosados con mucho detalle.

| Lo que solemos decir casualmente | Texto oficial | En pocas palabras |
| :--- | :--- | :--- |
| "Haz un menu" | Apple: ["A menu reveals its options..."](https://developer.apple.com/design/human-interface-guidelines/menus) | `Menu` se usa para realizar acciones |
| "Pon funciones en la barra de menu" | Apple: ["menu bar menus contain all the commands..."](https://developer.apple.com/design/human-interface-guidelines/menus) | Este es el menu de comandos en la parte superior de la aplicacion |
| "Haz un dropdown" | Apple: ["A pop-up list lets the user choose one option among several."](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html) | `pop-up` es para seleccionar uno de una lista |
| "Tambien haz un dropdown" | Apple: ["A pull-down list is generally used for selecting commands in a specific context."](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html) | `pull-down` es para abrir y realizar la accion actual |
| "El menu tambien sirve para filtrar?" | Fluent: ["If you need to collect information from people, try a select, dropdown, or combobox instead."](https://fluent2.microsoft.design/components/web/react/core/menu/usage) | `Menu` no es para seleccionar valores |
| "El menu tambien sirve como navegacion?" | Material: ["Menus should not be used as a primary method for navigation within an app."](https://m1.material.io/components/menus.html) | `Menu` no es navegacion principal |
| "Escribe OK / Cancel en los botones" | Apple: ["Always use 'Cancel' to title a button that cancels the alert's action."](https://developer.apple.com/design/human-interface-guidelines/alerts) | El texto de los botones no se puede escribir de cualquier forma |

> Las citas de la tabla se pueden hacer clic directamente para ir a la pagina oficial correspondiente.

Esta es la parte que mas impacta cuando lees realmente las guias de diseno por primera vez:

> Lo que normalmente pensamos que es discutir de UI, en realidad muchas veces es solo comunicarnos con un monton de palabras vagas.

Apple no se limita a decir "haz un menu"; continua distinguiendo:

- `menu`
- `menu bar menu`
- `pop-up button`
- `pull-down button`
- `context menu`

Fluent no se limita a decir "dropdown"; continua distinguiendo:

- `menu`
- `dropdown`
- `select`
- `combobox`

Esta es la necesidad de las guias de diseno.

No es para hacer que las paginas parezcan mas profesionales, sino para que cuando el equipo discuta sobre UI, cada persona no tenga cosas diferentes en mente.

## Lo que aprenderas

1. Por que debes consultar las guias de diseno al disenar paginas y botones
2. Que contenido de las guias de Apple, Material, Fluent y Atlassian es mas valioso consultar
3. Como disenar claramente la "jerarquia de paginas" y la "jerarquia de botones"
4. Como hacer que la IA consulte las guias de otros para generar paginas y botones

## 1. Por que las guias de diseno te ayudan a disenar paginas con claridad

Despues de leer los textos originales anteriores, descubriras un punto clave:

**Las guias de diseno no son un complemento estetico, sino que primero precisan el vocabulario.**

Muchas paginas no se ven bien no porque la combinacion de colores no sea sofisticada, sino porque la jerarquia de informacion es confusa.

Muchos botones no son faciles de usar no porque los bordes redondeados esten mal, sino porque:

- Hay demasiados botones principales, el usuario no sabe cual presionar
- Los botones de peligro se ven igual que los botones normales
- Todos los botones de la pagina compiten por la atencion
- El estilo y la semantica de los botones son inconsistentes entre paginas

Las guias de diseno maduras abordan precisamente estos problemas. Normalmente definen:

| Contenido de la guia | Que problema resuelve |
| :--- | :--- |
| **Jerarquia de pagina** | Donde mirar primero, donde mirar despues, como organizar la informacion |
| **Fundamentos visuales** | Como unificar colores, espaciado, tipografia, bordes redondeados, sombras |
| **Jerarquia de botones** | Como distinguir boton principal, secundario, de texto, de peligro |
| **Reglas de estado** | Como se ven hover, focus, disabled, loading |
| **Semantica de interaccion** | Que boton es "confirmar", cual es "cancelar", cual es "mas acciones" |

Por lo tanto, lo que realmente proporcionan las guias de diseno no es un "aspecto", sino un **conjunto de criterios de juicio**.

## 2. Al consultar las guias de grandes empresas, en que debes enfocarte

### 2.1 Consultar Apple: Aprender a "definir con suficiente detalle"

Lo mas valioso de Apple no es solo la contencion visual, sino que define los conceptos con mucho detalle.

Lo que muchos equipos llaman "menu" o "dropdown", Apple continua desglosando:

- `menu`: un conjunto de comandos, opciones o estados
- `menu bar menu`: coleccion de comandos a nivel de aplicacion
- `pop-up button`: seleccionar un valor
- `pull-down button`: activar comandos en el contexto actual
- `context menu`: acciones comunes relacionadas con el objeto o tarea actual

Esta distincion es muy importante porque afecta directamente:

- Si este componente es para seleccionar valores o para realizar acciones
- Si pertenece a una seccion de la pagina o a nivel de aplicacion
- Si debe mostrar persistentemente el valor seleccionado o solo expandir comandos temporalmente

Cuando empiezas a pensar con este nivel de granularidad, las paginas que disenes seran mucho mas claras.

### 2.2 Consultar Apple: Aprender jerarquia de paginas y contencion

Las Apple Human Interface Guidelines son especialmente adecuadas para aprender dos cosas:

- Como establecer una jerarquia clara en las paginas
- Como mantener los controles claros sin que acaparen la atencion

Apple enfatiza `Hierarchy`, `Harmony`, `Consistency`. Esto significa que al disenar paginas debes responder:

- Cual es la informacion mas importante de la pagina actual
- Cual es la tarea principal del usuario
- Que operacion debe ser mas visible y cual debe retroceder

Si consultas a Apple para disenar paginas, puedes enfocarte en:

- No fragmentar demasiado la informacion del primer vistazo, enfocarse primero en el contenido central
- Usar espacios en blanco, tamano de fuente y agrupacion para crear orden, en lugar de apilar muchos bordes
- No hacer que todos los botones tengan alto enfasis, solo las acciones clave deben ser las mas prominentes

### 2.3 Consultar Material: Aprender estructura clara de paginas

Material Design es muy adecuado para aprender "como las paginas organizan los flujos de tareas".

Muchos de sus componentes y guias de layout tienen como nucleo ayudarte a aclarar:

- Si la pagina es de navegacion o de ejecucion de tareas
- Si la pagina actual es para que el usuario lea, seleccione o envie
- Que elementos de una pagina deben repetirse de forma estable y cuales deben responder a cambios de contexto

Si consultas Material para disenar paginas, puedes enfocarte en:

- Secciones de pagina claras, responsabilidades de modulos bien definidas
- Navegacion, area de contenido y area de operaciones con division clara del trabajo
- Diferentes estilos de botones corresponden a diferentes prioridades de operacion

### 2.4 Consultar Fluent: Aprender limites de componentes y jerarquia de botones

Fluent 2 es muy adecuado para productos de backend, herramientas y sistemas de formularios complejos. Lo mas valioso que tiene es que te dice directamente "no mezcles conceptos".

Por ejemplo, dice explicitamente: si necesitas "collect information", no sigas usando `menu`, sino que deberias considerar `select`, `dropdown`, `combobox`.

Esta frase es muy importante porque rompe la idea de "todo es mas o menos lo mismo" que mucha gente tiene en mente.

Fluent 2 tambien valora mucho:

- Jerarquia de operaciones
- Limites semanticos de componentes
- Claridad en escenarios de informacion densa

Si consultas Fluent para disenar botones, puedes enfocarte en:

- `Primary button` para la accion mas importante del area actual
- `Secondary button` para acciones de soporte
- Botones de enfasis debil como `Subtle`, `Transparent` para operaciones que no deben interrumpir el flujo principal
- Cuantos mas botones haya en la pagina, mas debes controlar la prioridad visual

### 2.5 Consultar Atlassian: Aprender a gestionar paginas y botones de forma sistematica

El Atlassian Design System es especialmente adecuado para situaciones donde "un equipo hace muchas paginas". Enfatiza:

- Los foundations son la base compartida
- Los tokens son el metodo para unificar las decisiones visuales
- Los components son los bloques de interaccion que se reutilizan repetidamente

Si consultas Atlassian para hacer paginas y botones, lo mas valioso es:

- Convertir el tamano, color, bordes redondeados y espaciado de los botones en reglas unificadas
- Fijar el ritmo del layout de pagina
- Hacer que diferentes paginas, aunque tengan contenido diferente, compartan un lenguaje estructural consistente

## 3. Al disenar paginas, que puntos de la guia debes consultar

Cuando mires un sistema de diseno, no preguntes primero "esta pagina se ve bien o no", sino que primero te hagas las siguientes preguntas.

### 3.1 Primer vistazo a la pagina, es clara la jerarquia principal/secundaria

Una pagina generalmente debe tener al menos tres niveles:

- **Informacion principal**: el contenido mas importante de la pagina actual
- **Informacion auxiliar**: contenido que ayuda a comprender o complementar
- **Operaciones secundarias**: acciones que no deben interferir con la tarea principal

Si los tres niveles no estan diferenciados, la pagina sera "todo es importante", lo que equivale a "nada es importante".

### 3.2 El layout de la pagina, sirve a la tarea o solo apila modulos

Al consultar las guias, presta especial atencion a:

- Si el area de titulo aclara el objetivo de la pagina
- Si el area de contenido principal esta organizada alrededor de la tarea
- Si los botones de operacion estan cerca del contenido relacionado
- Si la informacion secundaria esta debilmente enfatizada

### 3.3 Las operaciones de la pagina, tienen prioridad

Muchas paginas a primera vista tienen 6 botones, y cada boton parece un CTA, esta es una tipica perdida de jerarquia.

Un enfoque mas razonable seria:

- Un area generalmente tiene solo una accion principal
- Las acciones secundarias pueden usar bordes, botones de texto o estilos mas debiles
- Las acciones de riesgo no deben verse igual que la accion principal

## 4. Al disenar botones, que puntos de la guia debes consultar

Los botones son la parte mas facil de "disenar de cualquier manera", pero tambien la que mas puede revelar si un sistema es maduro.

### 4.1 Primero separa los botones por "semantica", luego por "estilo"

No pienses primero en "boton azul o boton negro", primero piensa en que rol tiene este boton.

Los roles comunes de botones se pueden clasificar asi:

| Tipo de boton | Funcion | Estrategia de estilo comun |
| :--- | :--- | :--- |
| **Primary** | La accion mas critica del area actual | Solido, alto contraste, el mas visible |
| **Secondary** | Acciones de soporte | Borde o un nivel de enfasis menor |
| **Tertiary / Text** | Operaciones debiles | Texto o baja proporcion visual |
| **Destructive** | Eliminar, desactivar, limpiar y otras operaciones de riesgo | Color de advertencia o estilo de riesgo explicito |
| **Icon button** | Operaciones de herramienta locales | Simple, cerca del contexto |

### 4.2 Una pagina no debe tener demasiados Primary Buttons

Este es el error en el que mas caen los principiantes.

Si hay 4 botones principales en la pagina, entonces es como si no hubiera boton principal. El significado del boton principal es "decir al usuario que es lo que mas deberia hacer ahora".

Puedes seguir la practica comun de muchos sistemas de diseno:

- Un area principal generalmente conserva solo un boton principal
- Cancelar, volver, cerrar generalmente no compiten al mismo nivel que el boton de confirmacion
- Mas operaciones se colocan en botones secundarios o menus

### 4.3 Los botones deben poder expresar cambios de estado

Las guias de diseno generalmente describen los estados de los botones con mucho detalle:

- Estado por defecto
- Estado hover
- Estado focus
- Estado disabled
- Estado loading
- Estado de peligro

Esto es importante porque un boton no es una imagen estatica, sino uno de los controles que mas se activan durante la operacion del usuario.

### 4.4 El texto de los botones tambien es parte del diseno

El texto del boton no es solo un "problema de redaccion", afecta directamente la comprension del usuario.

Por ejemplo:

- `Guardar`
- `Guardar cambios`
- `Publicar ahora`
- `Eliminar proyecto`
- `Mover a la papelera`

Estos textos transmiten expectativas psicologicas completamente diferentes. Las guias maduras generalmente requieren que las etiquetas de los botones expresen claramente la accion, en lugar de usar palabras vagas.

## 5. Una lista de verificacion muy practica para el diseno de paginas y botones

Cuando disenes paginas tu mismo, puedes revisar rapidamente esta lista:

### Lista de paginas

- El titulo de la pagina explica claramente la tarea actual
- La informacion mas importante del primer vistazo es visible de inmediato
- La pagina esta organizada por flujo de tareas, no por lo que se te ocurre poner
- Solo hay una accion principal en la misma area
- El contenido secundario esta debilmente enfatizado

### Lista de botones

- Este boton es una accion principal o secundaria
- Por que merece ser mas visible que otros botones
- Hay demasiados botones principales en la pagina
- Las operaciones de peligro estan claramente identificadas
- El texto del boton es suficientemente especifico

## 6. Como usar IA consultando las guias de otros para disenar paginas

Esta seccion es la mas practica.

Muchas personas cuando piden a la IA que disene paginas, solo dicen:

```md
Hazme una pagina de configuracion, que se vea mas sofisticada, estilo Apple
```

Este tipo de prompt es demasiado vago, la IA generalmente solo puede imitar "fondo blanco, bordes redondeados, sombras".

Para principiantes, un enfoque mas practico no es resumir un gran parrafo uno mismo, sino directamente pegar a la IA **las frases clave del texto original de la guia**.

Esto tiene dos ventajas:

- No necesitas "traducir" tu mismo el pensamiento de diseno
- La IA puede mas facilmente entender paginas y botones segun las definiciones oficiales

### 6.1 Ejemplo 1: Hacer que la IA consulte Apple para disenar una pagina de configuracion

Primero busca una frase del texto original de Apple:

> ["Establish a clear visual hierarchy..."](https://developer.apple.com/design/human-interface-guidelines/)

Puedes pegarlo directamente a la IA asi:

```md
Consulta esta frase de las Apple Human Interface Guidelines:
"Establish a clear visual hierarchy..."

Ayudame a disenar una pagina de configuracion de seguridad de cuenta.
Requiere jerarquia de pagina clara, informacion importante primero, agrupacion ordenada.
```

El punto clave de escribirlo asi: no necesitas explicar demasiado tu mismo, solo pega las palabras originales de Apple.

### 6.2 Ejemplo 2: Hacer que la IA consulte Fluent para disenar botones de pagina de backend

Primero busca una frase del texto original de Fluent:

> ["Only use one primary button in a layout..."](https://fluent2.microsoft.design/components/web/react/core/button/usage)

Puedes pegarlo directamente a la IA asi:

```md
Consulta esta frase de Fluent 2:
"Only use one primary button in a layout..."

Ayudame a disenar los botones de un backend de gestion de equipos.
El boton de agregar miembro debe ser el mas visible, exportar, filtrar, mas operaciones mas debiles, el boton de eliminar destacado por separado.
```

Esta frase es especialmente adecuada para principiantes porque le dice directamente a la IA: no pongas demasiados botones principales en un area.

### 6.3 Ejemplo 3: Hacer que la IA consulte simultaneamente las guias de pagina y botones

Tambien puedes pegar dos frases originales a la vez, dejando que la IA consulte simultaneamente la pagina y los botones:

> Apple: ["Establish a clear visual hierarchy..."](https://developer.apple.com/design/human-interface-guidelines/)
>
> Fluent: ["Only use one primary button in a layout..."](https://fluent2.microsoft.design/components/web/react/core/button/usage)

Luego escribe directamente asi:

```md
Consulta las siguientes dos frases de guias de diseno originales:
Apple: "Establish a clear visual hierarchy..."
Fluent: "Only use one primary button in a layout..."

Ayudame a disenar una pagina de detalles de proyecto.
La pagina incluye introduccion del proyecto, miembros, actividad reciente y entrada de configuracion.
Jerarquia de pagina mas clara, solo un boton principal, otros botones mas debiles.
```

Este metodo es especialmente adecuado para principiantes, porque solo necesitas saber copiar el texto original y agregar un par de frases con tus necesidades.

## 7. Como usar IA consultando las guias de botones para generar directamente el diseno de botones

Si solo quieres hacer botones primero, tambien puedes pegar directamente el texto original de la guia de botones.

Por ejemplo, la definicion de boton de Atlassian es muy corta:

> ["A button triggers an event or action."](https://atlassian.design/components/button/)

Puedes preguntar a la IA asi:

```md
Consulta esta frase de Atlassian:
"A button triggers an event or action."

Ayudame a disenar un conjunto de estilos de botones para paginas de backend.
Necesito boton principal, boton secundario, boton de eliminar, y dime donde se usa cada uno.
```

Este tipo de prompt es especialmente adecuado para principiantes, basicamente es "pegar texto original + decir necesidades".

## 8. Resumen

Consultar guias de diseno de UI para disenar paginas y botones, lo mas importante no es "hacer que se parezca a alguien", sino aprender estas cosas:

1. Usar jerarquia para organizar paginas, en lugar de apilar contenido
2. Usar clasificacion de botones para expresar prioridad de operaciones, en lugar de hacer que todos los botones sean igual de llamativos
3. Usar las definiciones, limites y criterios de juicio de las guias de diseno para guiar el diseno
4. Cuando la IA consulta las guias de otros, consulta "principios y estructura", no solo el aspecto

Cuando uses las guias de esta manera, lo que consultes no sera solo un estilo, sino un conjunto de pensamiento de diseno maduro.

---

## Referencias

Los siguientes enlaces provienen todos de sistemas de diseno oficiales o documentacion oficial:

- Apple Human Interface Guidelines: [Overview](https://developer.apple.com/design/human-interface-guidelines/)
- Apple Human Interface Guidelines: [Menus](https://developer.apple.com/design/human-interface-guidelines/menus)
- Apple Human Interface Guidelines: [Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts)
- Apple Human Interface Guidelines: [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)
- Apple Archive: [How Menus Work](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/HowMenusWork.html)
- Apple Archive: [Managing Pop-Up Buttons and Pull-Down Lists](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html)
- Material Design: [Buttons overview](https://m3.material.io/components/buttons/overview)
- Material Design: [Menus](https://m1.material.io/components/menus.html)
- Microsoft Fluent 2: [Start designing](https://fluent2.microsoft.design/get-started/design)
- Microsoft Fluent 2: [Menu usage](https://fluent2.microsoft.design/components/web/react/core/menu/usage)
- Microsoft Fluent 2: [Button usage](https://fluent2.microsoft.design/components/web/react/core/button/usage)
- Atlassian Design System: [Foundations](https://atlassian.design/foundations/)
- Atlassian Design System: [Button](https://atlassian.design/components/button/)
