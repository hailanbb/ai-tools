# Actualiza tu interfaz con bibliotecas de componentes modernas

En las lecciones anteriores, ya aprendiste a diseñar interfaces con herramientas de diseño, convertir mockups en código con AI IDE, e incluso completaste un proyecto frontend completo. Pero probablemente también notaste un problema: los botones, formularios y diálogos que escribes desde cero funcionan, pero siempre falta algo para verse como un "producto profesional" — los estilos no son uniformes, los detalles de interacción no son fluidos, y adaptar todo a diferentes pantallas es un dolor de cabeza.

Este es exactamente el problema que resuelven las **bibliotecas de componentes**.

Una biblioteca de componentes es un conjunto de piezas de UI pre-diseñadas y pre-desarrolladas. Botones, campos de entrada, menús desplegables, diálogos, tablas... estos elementos de interfaz que usarás repetidamente en cualquier producto ya están listos en la biblioteca, y han sido validados y refinados por miles de usuarios. Solo necesitas combinarlos como si fueran bloques de construcción para crear interfaces de nivel profesional rápidamente.

## Lo que aprenderás

1. Entender qué son las bibliotecas de componentes frontend y por qué el desarrollo moderno prácticamente las utiliza siempre
2. Conocer las cuatro bibliotecas más representativas y los escenarios donde destaca cada una
3. Aprender a usar AI IDE + bibliotecas de componentes para Vibe Coding a través de tres escenarios prácticos (landing page, página de producto, panel de administración)
4. Aprender a leer la documentación de las bibliotecas, encontrar los componentes adecuados y usarlos correctamente

## 1. ¿Por qué necesitas una biblioteca de componentes?

Imagina que estás amueblando una casa. Puedes hacer una silla desde cero con madera, pero lo más común es ir a IKEA y comprar una — buen diseño, calidad consistente, instrucciones claras, y solo tienes que armarla en casa.

Una biblioteca de componentes es como el "IKEA" del desarrollo frontend. No ofrece muebles, sino piezas de interfaz:

| Escribir todo manualmente | Usar una biblioteca de componentes |
| :--- | :--- |
| Necesitas manejar estilos, interacciones y animaciones | Listo para usar, estilos e interacciones ya refinados |
| Los botones de diferentes páginas pueden verse distintos | Estilo global unificado, consistencia automática |
| Adaptar a móvil y tablet requiere trabajo extra | La mayoría ya incluye soporte responsive |
| La accesibilidad (Accessibility) se olvida fácilmente | Las bibliotecas profesionales ya manejan navegación por teclado, lectores de pantalla, etc. |
| Velocidad de desarrollo lenta | Velocidad de desarrollo rápida, enfócate en la lógica de negocio |

En pocas palabras: **las bibliotecas de componentes te permiten gastar tu tiempo en "qué hacer", no en "cómo dibujarlo".**

### Ver para creer: la diferencia con y sin biblioteca de componentes

Las palabras solas no convencen. Usamos casi el mismo prompt en Trae, uno sin especificar biblioteca y otro especificándola, para ver la diferencia en los resultados.

**Prompt 1: Sin biblioteca de componentes**

```text
Ayúdame a crear una página de dashboard para un asistente de escritura con AI, que incluya:
- Barra de título superior y botón de exportar
- Cuatro tarjetas de estadísticas mostrando usuarios, usuarios activos, documentos, ingresos, y tendencias
- Un gráfico de líneas y un gráfico circular
- Tabla de lista de usuarios con paginación
- Barra lateral de navegación izquierda
```

Resultado en Trae:

<!-- TODO: Reemplazar con captura del dashboard generado sin biblioteca de componentes en Trae -->
<!-- ![Dashboard generado en Trae (sin biblioteca de componentes)](/zh-cn/stage-2/frontend/modern-component-library/images/compare-without-lib.png) -->

**Prompt 2: Usando la biblioteca shadcn/ui**

```text
Ayúdame a crear una página de dashboard para un asistente de escritura con AI usando la biblioteca shadcn/ui, que incluya:
- Barra de título superior y botón de exportar
- Cuatro tarjetas de estadísticas mostrando usuarios, usuarios activos, documentos, ingresos, y tendencias
- Un gráfico de líneas y un gráfico circular
- Tabla de lista de usuarios con paginación
- Barra lateral de navegación izquierda
```

Resultado en Trae:

<!-- TODO: Reemplazar con captura del dashboard generado con shadcn/ui en Trae -->
<!-- ![Dashboard generado en Trae (con shadcn/ui)](/zh-cn/stage-2/frontend/modern-component-library/images/compare-with-lib.png) -->

El mismo requerimiento, la única diferencia fue agregar `shadcn/ui + Tailwind CSS` al inicio del prompt. El resultado generado por Trae con la biblioteca está en un nivel completamente diferente en consistencia visual, detalles de interacción y acabado general. Esta es la "actualización gratuita" que aporta una biblioteca de componentes — solo necesitas agregar un nombre de biblioteca a tu prompt.

## 2. Conoce las cuatro bibliotecas principales

Hay muchas bibliotecas de componentes (la lista completa está en el [apéndice](#apendice-mas-bibliotecas-de-componentes)), pero solo necesitas conocer estas cuatro que son las más representativas:

| Biblioteca | Framework | Descripción | Sitio web |
| :--- | :--- | :--- | :--- |
| [Ant Design](https://ant.design) | React | Creada por Ant Group, el estándar de facto para paneles de administración empresariales, cobertura de componentes extremadamente amplia | ant.design |
| [shadcn/ui](https://ui.shadcn.com) | React | No instala paquetes npm, copia el código directamente a tu proyecto, basada en Tailwind CSS, máxima libertad de personalización | ui.shadcn.com |
| [HeroUI](https://heroui.com) (antes NextUI) | React | Estilos por defecto elegantes, animaciones fluidas, ideal para landing pages y showcases donde la calidad visual es prioritaria | heroui.com |
| [Material UI](https://mui.com) | React | La biblioteca de componentes React más veterana, implementa las especificaciones de Google Material Design, ecosistema más maduro | mui.com |

> Los usuarios de Vue también tienen opciones abundantes: [Element Plus](https://element-plus.org) (la más popular en China), [Ant Design Vue](https://antdv.com), [Naive UI](https://www.naiveui.com), etc. Ver [apéndice](#apendice-mas-bibliotecas-de-componentes) para más detalles.

Diferentes bibliotecas destacan en diferentes escenarios. A continuación, te guiaremos a través de tres escenarios de desarrollo reales para experimentar cómo usar AI IDE + bibliotecas de componentes para Vibe Coding.

Para mostrar los estilos y características de diferentes bibliotecas, usamos intencionalmente una biblioteca diferente en cada escenario. Pero ten en cuenta: **esto es solo para que conozcas varias opciones**. En la práctica, puedes usar solo la que más te guste. Si te gusta el estilo de shadcn/ui, úsala para landing pages, páginas de producto y paneles de administración sin problema. Elige la que te parezca bonita y con la que te sientas cómodo/a, eso es lo más importante.

## 3. Práctica 1: Construir una landing page con HeroUI

**Escenario**: Has creado un producto de asistente de escritura con AI y necesitas una landing page bonita para mostrar sus características y atraer registros. La página necesita gran impacto visual, animaciones fluidas y verse bien en móvil.

**Por qué HeroUI**: Los estilos por defecto de HeroUI son muy elegantes, con transiciones fluidas integradas, perfecta para páginas orientadas al usuario.

### 3.1 Crear el proyecto

```bash
# Crear proyecto con el CLI oficial de HeroUI
npx create-heroui-app@latest ai-writer-landing
cd ai-writer-landing
npm install
```

<!-- TODO: Reemplazar con captura de la página principal o showcase de componentes de HeroUI -->
<!-- ![Sitio web de la biblioteca HeroUI](/zh-cn/stage-2/frontend/modern-component-library/images/heroui-homepage.png) -->

### 3.2 Generar la landing page con AI IDE

Abre tu AI IDE (Cursor, Trae, etc.) y escribe en el chat:

```text
Ayúdame a crear una landing page para un asistente de escritura con AI usando la biblioteca HeroUI:

**Estructura de la página:**
1. Barra de navegación superior: Logo y nombre del producto a la izquierda, enlaces "Funciones", "Precios" y "Acerca de" a la derecha, más un botón "Comenzar"
2. Sección hero: Título grande "Deja que la AI sea tu compañera de escritura", subtítulo describiendo el valor del producto, dos botones "Prueba gratis" y "Ver demo", y una captura del producto debajo
3. Sección de funciones: Tres tarjetas en columnas presentando "Autocompletado inteligente", "Ajuste de estilo" y "Traducción multilingüe", cada tarjeta con icono, título y descripción
4. Sección de precios: Tres tarjetas (Gratis, Pro, Equipo), la Pro destacada como recomendada
5. Call to action: Un texto atractivo con un botón de registro
6. Footer: Información de copyright y enlaces a redes sociales

**Requisitos de diseño:**
- Debe verse moderno y profesional
- Soporte para modo oscuro
- Debe verse bien en móvil
```

<!-- TODO: Reemplazar con captura del proceso o resultado de generación de landing page con AI IDE -->
<!-- ![Resultado de landing page con HeroUI generada por AI](/zh-cn/stage-2/frontend/modern-component-library/images/heroui-landing-result.png) -->

### 3.3 Componentes clave que usará la AI

En el código generado, verás estos componentes de HeroUI:

```jsx
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem,
  Button,
  Card, CardHeader, CardBody, CardFooter,
  Divider,
  Link,
  Chip
} from '@heroui/react'
```

Función de cada componente:

| Componente | Uso | Posición en la landing page |
| :--- | :--- | :--- |
| `Navbar` | Barra de navegación superior | Parte superior de la página, fija |
| `Button` | Botón, soporta múltiples variantes y colores | Botones CTA, botones de navegación |
| `Card` | Contenedor tipo tarjeta | Showcase de funciones, tarjetas de precios |
| `Chip` | Etiqueta pequeña | Marcadores "Recomendado", "Más popular" |
| `Divider` | Línea divisoria | Separación visual entre secciones |

### 3.4 Iteración y optimización

La primera versión del código puede no ser perfecta. Continúa dialogando con la AI para ajustar:

```text
Ayúdame a optimizar la landing page:

1. Agrega un degradado al título principal, de azul a púrpura
2. Las tarjetas de funciones deben tener un efecto de elevación al pasar el ratón
3. La tarjeta de precio Pro debe destacarse, con un borde y etiqueta "Más popular"
4. En móvil, la navegación debe convertirse en un menú hamburguesa
```

<!-- TODO: Reemplazar con captura de la landing page después de iteración -->
<!-- ![Landing page iterada](/zh-cn/stage-2/frontend/modern-component-library/images/heroui-landing-iterated.png) -->

> **El núcleo del Vibe Coding**: No necesitas memorizar la API de cada componente. Solo describe el efecto que quieres en lenguaje natural, y la AI encontrará el componente y la implementación adecuada. Si algo no te satisface, sigue iterando en la conversación.

## 4. Práctica 2: Construir una página de producto con shadcn/ui

**Escenario**: Tu asistente de escritura con AI necesita una interfaz principal post-login — lista de documentos a la izquierda, editor a la derecha, y una barra de herramientas arriba. Es una página de producto funcional que requiere una UI altamente personalizada.

**Por qué shadcn/ui**: shadcn/ui coloca el código de los componentes directamente en tu proyecto, permitiéndote modificar cualquier detalle. Para interfaces de producto que necesitan personalización profunda, este modelo de "poseer el código" es el más flexible.

<!-- TODO: Reemplazar con captura del sitio web o showcase de componentes de shadcn/ui -->
<!-- ![Sitio web de la biblioteca shadcn/ui](/zh-cn/stage-2/frontend/modern-component-library/images/shadcn-homepage.png) -->

### 4.1 Crear el proyecto

```bash
# Crear proyecto Next.js
npx create-next-app@latest ai-writer-app --typescript --tailwind --app
cd ai-writer-app

# Inicializar shadcn/ui
npx shadcn@latest init

# Agregar componentes según necesidad (no se instalan todos a la vez)
npx shadcn@latest add button card input sidebar sheet dialog
```

Lo único de shadcn/ui: cada vez que `add` un componente, copia el código fuente al directorio `components/ui/` de tu proyecto. Puedes abrir estos archivos directamente y modificar estilos y comportamiento.

### 4.2 Generar la interfaz de producto con AI IDE

```text
Ayúdame a crear la interfaz principal de un asistente de escritura con AI usando shadcn/ui:

**Layout general:**
- Izquierda: barra lateral colapsable, ancho aproximado 280px:
  - Botón "Nuevo documento" arriba
  - Lista de documentos debajo, cada uno mostrando título y última fecha de edición
  - Clic derecho en un documento para renombrar o eliminar
- Derecha: área de edición principal, dividida en dos partes:
  - Arriba: barra de herramientas con edición del título del documento, estadísticas de palabras, botón "Autocompletar con AI", menú desplegable "Exportar"
  - Abajo: área de edición, un campo de texto grande que ocupa el espacio restante

**Detalles de interacción:**
- Al hacer clic en "Autocompletar con AI", el botón muestra estado de carga, y aparece texto generado por AI en la parte inferior del editor (apareciendo letra por letra como una máquina de escribir)
- En móvil, la barra lateral se convierte en un drawer que desliza desde la izquierda
- El documento seleccionado actualmente debe destacarse
```

<!-- TODO: Reemplazar con captura de la interfaz de producto shadcn/ui generada por AI -->
<!-- ![Resultado de la página de producto con shadcn/ui generada por AI](/zh-cn/stage-2/frontend/modern-component-library/images/shadcn-product-result.png) -->

### 4.3 Componentes clave que usará la AI

```tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader
} from '@/components/ui/sidebar'
```

| Componente | Uso | Posición en la página de producto |
| :--- | :--- | :--- |
| `Sidebar` | Barra lateral colapsable | Lista de documentos izquierda |
| `Sheet` | Drawer móvil | Reemplazo de sidebar en móvil |
| `DropdownMenu` | Menú desplegable | Botón "Exportar", menú contextual |
| `Dialog` | Diálogo | Confirmación de renombrar/eliminar |
| `Button` | Botón, soporta variant y loading | Diversos botones de acción |
| `Input` | Campo de entrada | Edición del título del documento |

### 4.4 Personalizar estilos de componentes

La ventaja de shadcn/ui es que puedes modificar directamente el código fuente de los componentes. Por ejemplo, si quieres bordes más redondeados en los botones:

```text
Ayúdame a modificar components/ui/button.tsx,
cambiando el borde redondeado por defecto de rounded-md a rounded-xl,
y agregando un efecto de sombra sutil a la variante primary
```

La AI modificará directamente los archivos de componentes en tu proyecto, sin sobrescribir estilos de paquetes npm — este es el beneficio de "poseer el código" de shadcn/ui.

<!-- TODO: Reemplazar con captura del código fuente de componentes shadcn/ui en el proyecto, mostrando que es editable -->
<!-- ![Código de componentes shadcn/ui directamente editable en el proyecto](/zh-cn/stage-2/frontend/modern-component-library/images/shadcn-code-ownership.png) -->

## 5. Práctica 3: Construir un panel de administración con Ant Design

**Escenario**: Tu asistente de escritura con AI ya está en línea y necesitas un panel de administración para ver datos de usuarios, gestionar contenido y procesar órdenes de pago. El núcleo de un sistema de administración es la visualización de datos y la eficiencia operativa.

**Por qué Ant Design**: Ant Design tiene la mayor experiencia en paneles de administración empresariales. Tablas, formularios, gráficos y otros componentes de negocio están listos para usar, con patrones de interacción empresarial integrados (operaciones en lote, filtros avanzados, exportación de datos, etc.).

<!-- TODO: Reemplazar con captura del sitio web de Ant Design o showcase de Pro Components -->
<!-- ![Sitio web de la biblioteca Ant Design](/zh-cn/stage-2/frontend/modern-component-library/images/antd-homepage.png) -->

### 5.1 Crear el proyecto

```bash
# Usar el scaffolding de Ant Design Pro (layout, rutas y permisos integrados)
npx create-umi@latest ai-writer-admin
# Seleccionar la plantilla Ant Design Pro
cd ai-writer-admin
npm install
```

O empezar desde cero:

```bash
npx create-react-app ai-writer-admin --template typescript
cd ai-writer-admin
npm install antd @ant-design/icons @ant-design/pro-components
```

### 5.2 Generar el panel de administración con AI IDE

```text
Ayúdame a crear un panel de administración para un asistente de escritura con AI usando Ant Design:

**Layout general:**
- Izquierda: barra de menú con Dashboard, Gestión de usuarios, Gestión de documentos, Gestión de órdenes, Configuración del sistema
- Arriba: navegación con breadcrumbs

**Página de gestión de usuarios:**
- Cuatro tarjetas de estadísticas arriba: Total de usuarios, Nuevos hoy, Usuarios activos, Usuarios de pago
- Área de búsqueda y filtros: buscar por nombre, seleccionar rango de fecha de registro, filtrar por estado, botones "Buscar" y "Resetear"
- Tabla de usuarios:
  - Mostrar avatar, nombre, email, fecha de registro, plan de suscripción (con etiquetas de colores), estado, acciones
  - 20 elementos por página con paginación
  - Selección múltiple para desactivar o exportar en lote
  - Columna de acciones: Ver detalle, Editar, Desactivar (con confirmación antes de desactivar)
- Al hacer clic en "Ver detalle", se abre un drawer desde la derecha mostrando información detallada y documentos recientes
```

<!-- TODO: Reemplazar con captura del panel de administración Ant Design generado por AI -->
<!-- ![Panel de administración Ant Design generado por AI](/zh-cn/stage-2/frontend/modern-component-library/images/antd-admin-result.png) -->

### 5.3 Componentes clave que usará la AI

```tsx
import { PageContainer, ProLayout } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { StatisticCard } from '@ant-design/pro-components'
import {
  Button, Tag, Badge, Space, Drawer,
  Popconfirm, message, Modal
} from 'antd'
import {
  UserOutlined, SearchOutlined, ExportOutlined
} from '@ant-design/icons'
```

| Componente | Uso | Posición en el panel |
| :--- | :--- | :--- |
| `ProLayout` | Framework de layout del panel | Esqueleto de la página (menú + área de contenido) |
| `ProTable` | Tabla avanzada con búsqueda, paginación y configuración de columnas | Lista de usuarios, documentos, órdenes |
| `StatisticCard` | Tarjeta de estadísticas | Dashboard, resumen superior |
| `Tag` / `Badge` | Etiquetas de estado | Plan de suscripción, estado de usuario |
| `Drawer` | Drawer lateral | Detalle de usuario, formulario de edición |
| `Popconfirm` | Confirmación emergente | Eliminar, desactivar y otras acciones peligrosas |

### 5.4 Seguir iterando: Agregar un dashboard

```text
Ayúdame a crear una página de dashboard:

1. Cuatro tarjetas de estadísticas arriba: Total de usuarios, Total de documentos, Llamadas API hoy, Ingresos mensuales, cada una mostrando valor y cambio respecto al período anterior
2. Dos gráficos en el centro:
   - Izquierda: Gráfico de líneas del crecimiento de usuarios en los últimos 7 días
   - Derecha: Gráfico circular de distribución de planes de suscripción
3. Abajo: Tabla de registros de operaciones recientes, mostrando fecha, usuario, tipo de operación y detalles

Usa componentes de Ant Design para el layout, los gráficos pueden usar Ant Design Charts
```

<!-- TODO: Reemplazar con captura de la página de dashboard -->
<!-- ![Página de dashboard con Ant Design](/zh-cn/stage-2/frontend/modern-component-library/images/antd-dashboard-result.png) -->

> **Tip de Vibe Coding para paneles de administración**: Las páginas de administración tienen una estructura relativamente fija (tabla + búsqueda + diálogo), ideales para generación en lote con AI. Puedes primero generar una página de "Gestión de usuarios" como plantilla, y luego decir "Basándote en la estructura de la página de gestión de usuarios, genera la página de gestión de documentos". La AI reutilizará el mismo patrón de layout.

## 6. Aprende a leer la documentación: el "manual de instrucciones" de las bibliotecas

En Vibe Coding, la AI escribirá la mayor parte del código, pero cuando el resultado no sea correcto o quieras ajustar el comportamiento de un componente, **consultar la documentación** es la solución más rápida.

Tomando Ant Design como ejemplo, su documentación está en: `https://ant.design/components/overview-cn`

Flujo estándar para consultar la documentación:

1. **Aclarar el requerimiento**: Por ejemplo, "necesito que la tabla soporte selección de filas"
2. **Buscar en la documentación**: Buscar "Table" para ir a la página del componente
3. **Ver ejemplos**: Cada componente tiene múltiples ejemplos en línea, encontrar el de "seleccionable"
4. **Copiar código**: Copiar el código de ejemplo a tu proyecto
5. **Ver la tabla de API**: Encontrar la configuración completa de `rowSelection` al final de la página

> También puedes enviar el enlace de documentación directamente a tu AI IDE: "Por favor refiérete a la API rowSelection de https://ant.design/components/table-cn para agregar selección múltiple a la tabla de usuarios". Proporcionar enlaces de documentación a la AI genera código más preciso.

Referencia rápida de las documentaciones:

| Biblioteca | URL de documentación |
| :--- | :--- |
| Ant Design | `https://ant.design/components/overview-cn` |
| shadcn/ui | `https://ui.shadcn.com/docs/components` |
| HeroUI | `https://heroui.com/docs/components` |
| Material UI | `https://mui.com/material-ui/all-components/` |
| Element Plus | `https://element-plus.org/zh-CN/component/overview.html` |

## 7. Resumen

Los tres escenarios prácticos cubren las necesidades más comunes del desarrollo frontend:

| Escenario | Biblioteca recomendada | Característica principal |
| :--- | :--- | :--- |
| Landing page / Página showcase | HeroUI | Estilos por defecto elegantes, animaciones fluidas, gran impacto visual |
| Página de producto funcional | shadcn/ui | Código totalmente controlable, personalización profunda flexible |
| Panel de administración | Ant Design | Componentes de negocio ricos, tablas y formularios listos para usar |

Resumen del flujo de trabajo de Vibe Coding:

1. Elegir la biblioteca de componentes adecuada según el escenario
2. Describir la estructura de página e interacciones deseadas al AI IDE
3. La AI genera la primera versión del código, tú previsualizas el resultado
4. Seguir iterando y ajustando con lenguaje natural
5. Consultar la documentación de la biblioteca cuando haya problemas de detalle

### Ejercicio

Elige uno de los siguientes escenarios y complétalo desde cero con AI IDE + biblioteca de componentes:

1. Usar HeroUI para crear una landing page showcase de un proyecto anterior (por ejemplo, los retratos de Hogwarts)
2. Usar shadcn/ui para construir la interfaz principal de una aplicación de notas (sidebar + editor)
3. Usar Ant Design para construir un panel de administración de contenido simple (lista de artículos + formulario para crear artículo)

---

## Apéndice: Más bibliotecas de componentes

Además de las cuatro bibliotecas principales presentadas en el texto, el ecosistema frontend tiene muchas bibliotecas excelentes. Aquí las clasificamos por framework para ayudarte a elegir según las necesidades de tu proyecto.

### Ecosistema Vue

| Biblioteca | Stars | Descripción | Escenarios |
| :--- | :--- | :--- | :--- |
| [Element Plus](https://element-plus.org) | ~27k | Biblioteca empresarial Vue 3 del equipo de Ele.me, la más usada en China | Paneles de administración |
| [Vuetify](https://vuetifyjs.com) | ~41k | Biblioteca Vue Material Design más popular, 80+ componentes | Proyectos con estilo Google |
| [Ant Design Vue](https://antdv.com) | ~21k | Biblioteca Vue 3 basada en el sistema de diseño de Ant | Paneles empresariales |
| [Naive UI](https://www.naiveui.com) | ~18k | Escrita en TypeScript, personalización de temas extrema | Proyectos con requisitos de diseño únicos |
| [Quasar](https://quasar.dev) | ~27k | Un código para SPA, SSR, PWA, móvil y escritorio | Proyectos multiplataforma |
| [Vant](https://vant-ui.github.io/vant) | ~24k | Biblioteca móvil ligera del equipo de Youzan | Páginas H5 móviles |
| [PrimeVue](https://primevue.org) | ~14k | 90+ componentes, soporta múltiples temas | Necesidad de muchos componentes y temas |
| [Arco Design Vue](https://arco.design/vue) | ~3k | De ByteDance, alta calidad, modo oscuro integrado | Productos de administración |
| [TDesign Vue Next](https://tdesign.tencent.com/vue-next) | ~2k | De Tencent, lenguaje de diseño unificado | Ecosistema Tencent o proyectos empresariales |

### Ecosistema React

| Biblioteca | Stars | Descripción | Escenarios |
| :--- | :--- | :--- | :--- |
| [Material UI (MUI)](https://mui.com) | ~95k | Implementación veterana de Material Design, componentes más completos | Construcción rápida de aplicaciones empresariales |
| [Ant Design](https://ant.design) | ~94k | De Ant Group, muchos componentes de negocio de alta calidad | Paneles empresariales |
| [shadcn/ui](https://ui.shadcn.com) | ~83k | Copia código al proyecto en vez de npm install, basada en Radix UI + Tailwind CSS | Proyectos que necesitan alta personalización |
| [Chakra UI](https://chakra-ui.com) | ~39k | Centrada en la experiencia del desarrollador, API simple, accesibilidad integrada | Prototipado rápido |
| [Mantine](https://mantine.dev) | ~28k | 100+ componentes y 50+ hooks, incluyendo date picker y rich text editor | Solución full-stack lista para usar |
| [Headless UI](https://headlessui.com) | ~27k | Biblioteca sin estilos de Tailwind Labs, soporta React y Vue | Uso con Tailwind CSS |
| [HeroUI](https://heroui.com) | ~24k | Basada en Tailwind CSS + React Aria, estilos por defecto elegantes | Proyectos que buscan calidad visual |
| [Radix UI](https://www.radix-ui.com) | ~17k | Primitivos de componentes sin estilos, base de shadcn/ui | Construir sistemas de diseño personalizados |

#### Ecosistema extendido de shadcn/ui

Además de las bibliotecas generales anteriores, el ecosistema de shadcn/ui ha visto surgir muchas bibliotecas extendidas basadas en su filosofía, ofreciendo opciones diferenciadas para escenarios específicos. Estas bibliotecas también adoptan el modelo de "copiar código al proyecto", dando a los desarrolladores control total sobre el código fuente.

| Biblioteca | Descripción | Escenarios |
| :--- | :--- | :--- |
| [Aceternity UI](https://ui.aceternity.com) | 200+ componentes de nivel producción, destaca en tarjetas brillantes, degradados de texto, globos 3D | Landing pages de alta calidad, productos SaaS |
| [Tailark UI](https://tailark.com) | Colección de bloques para sitios de marketing, showcase de productos, testimonios y CTA | Landing pages de marketing, sitios de producto |
| [UI Tripled](https://ui.tripled.work) | Componentes dinámicos basados en Framer Motion, diálogos, navegación, animaciones de tarjetas | Herramientas creativas, portfolios |
| [Neobrutalism UI](https://neobrutalism.dev) | Estilo neobrutalista, líneas gruesas, alto contraste, colores vivos | Sitios de marca personalizados, proyectos creativos |
| [REUI](https://reui.io) | 967+ patrones de componentes para escenarios de negocio reales | Paneles empresariales, formularios complejos |
| [Cult UI](https://cult-ui.com) | Pulido fino de interacción/visual, tablas de datos, paneles de filtros | Proyectos comerciales de alta calidad |
| [Kibo UI](https://kibo-ui.com) | Componentes de negocio avanzados, selector de colores, rich text editor, subida de archivos | Paneles de administración, herramientas |
| [Kokonut UI](https://kokonutui.com) | 100+ componentes + 7+ plantillas completas, estilo limpio y minimalista | Sitios SaaS, blogs, e-commerce |
| [Commerce UI](https://ui.stackzero.co) | Especializada en e-commerce, tarjetas de producto, carrito, formulario de checkout | Plataformas e-commerce |
| [shadcnblocks](https://shadcnblocks.com) | 1373 bloques de UI + 13 plantillas completas, recursos más comprehensivos | Todos los escenarios |
| [Shoogle](https://shoogle.dev) | Plataforma de búsqueda y agregación del ecosistema shadcn/ui | Búsqueda rápida de recursos |
| [Discover All Shadcn](https://allshadcn.com) | Navegador de recursos agregado | Búsqueda rápida de recursos |

> **¿Por qué elegir extensiones de shadcn/ui?** Estas extensiones heredan la filosofía de "propiedad del código" de shadcn/ui, con personalización profunda para escenarios específicos. En la era del Vibe Coding, te permiten encontrar rápidamente componentes que coincidan con tus necesidades de diseño, salir de la homogeneidad de las bibliotecas UI mainstream y crear productos más diferenciados.
