# Asistencia de LLM para escribir código de API y documentación

En las lecciones anteriores, aprendiste a usar herramientas como Figma para crear diseños de UI, a generar páginas estáticas frontend con ayuda de AI, y a utilizar Supabase para construir bases de datos e implementar autenticación básica de usuarios. Ahora surge una pregunta natural: cuando un usuario hace clic en esos botones interactivos del frontend, ¿cómo se almacenan los datos silenciosamente en Supabase? Cuando necesitamos ejecutar lógica de negocio más compleja (como pagos concurrentes, notificaciones programadas, procesamiento de datos sensibles), ¿es seguro conectar directamente el frontend a la base de datos?

Esto nos lleva a un componente esencial en la arquitectura del desarrollo web moderno: **las API backend**.

En comparación con escribir manualmente cientos de líneas de rutas backend, controladores y lógica de validación de parámetros, hoy podemos aprovechar la poderosa capacidad de generación de código de los LLM para delegar el código repetitivo a la AI. En esta lección, saldremos del círculo vicioso de "la AI genera código vago y genérico" y, basándonos en escenarios de negocio reales, te mostraremos cómo usar prompts de alta calidad para guiar a un LLM a escribir API backend robustas en Node.js que cumplan con los estándares de la industria, y a generar automáticamente la documentación de API y los casos de prueba.

> 💡 **Conocimientos previos**
>
> Antes de estudiar esta sección, te recomendamos revisar los siguientes contenidos:
> - [De bases de datos a Supabase](../database-supabase/) - Comprender los conceptos de bases de datos y modelos de datos.
> - [Flujo de trabajo con Git y GitHub](../git-workflow/) - Familiarizarte con el control de versiones en el desarrollo de proyectos.
> - [¿Qué es la terminal/línea de comandos?](/es-es/appendix/2-development-tools/command-line-shell) - La inicialización y el arranque de proyectos requieren conocimientos básicos de comandos.

# Lo que aprenderás

1. **Qué es una API**: Comprender el puente de comunicación entre frontend y backend, y las convenciones de diseño RESTful.
2. **Construcción de servicios con LLM**: Cómo usar prompts estructurados para que la AI te ayude a montar un proyecto base con Node.js + Express.
3. **Desarrollo de lógica de API**: Guiar al LLM para generar interfaces CRUD (Crear, Leer, Actualizar, Eliminar) con validación de negocio rigurosa y conexión a Supabase.
4. **Documentación automática de API**: Hacer que el LLM genere documentación OpenAPI/Swagger a partir del código, estándar para la colaboración entre equipos.
5. **Cierre del ciclo de pruebas**: Utilizar el LLM para generar colecciones de pruebas en Postman y pruebas unitarias con Jest, garantizando la calidad del código.

---

# 1. ¿Por qué necesitamos APIs?

En la comprensión tradicional, el frontend es "lo que se ve" y la base de datos es "el almacén donde se guarda la información". Pero falta un intermediario entre ambos. Si imaginas toda la aplicación como un restaurante:
- **El frontend (cliente)** es el menú y la mesa de pedidos del restaurante, donde los clientes exploran los platos y expresan sus necesidades.
- **La base de datos (Supabase, etc.)** es la despensa de la cocina del restaurante, donde se almacenan todos los ingredientes y los libros de cuentas.
- **La API backend** es el camarero del restaurante. Los clientes no pueden entrar directamente a la cocina a tomar ingredientes (sería caótico y generaría problemas de seguridad), sino que deben entregar su "pedido" (HTTP Request) al camarero. Este verifica (validación de parámetros, autenticación de permisos), busca el contenido correspondiente en la cocina, y devuelve "el plato preparado" (HTTP Response, generalmente en formato JSON) al cliente.

A través de las APIs, logramos una clara **separación entre frontend y backend**: el frontend solo se preocupa de cómo renderizar las páginas, y el backend se centra exclusivamente en la lógica de negocio, el procesamiento de datos y la seguridad.

---

# 2. Diseño e inicialización de la arquitectura del proyecto

Una estructura de proyecto clara es un requisito previo para que el LLM genere buen código. Antes de pedirle a la AI que escriba código, debemos tener claro cómo debería organizarse el proyecto.

## 2.1 Estructura común de un proyecto de API
Incluso cuando usamos un LLM para generar código, nunca debemos meter todo en un solo archivo `server.js`. Una arquitectura backend en Node.js fácil de mantener generalmente se ve así:

```text
my-api-project/
├── .env                  # Variables de entorno sensibles (API Keys, cadena de conexión a BD)
├── server.js             # Punto de entrada del proyecto (inicio del servidor, registro de middlewares globales)
├── package.json          # Archivo de gestión de dependencias
├── src/
│   ├── routes/           # Capa de rutas: define las rutas URL y los métodos de petición
│   ├── controllers/      # Capa de controladores: procesa los parámetros de la petición, llama a los servicios y devuelve la respuesta
│   ├── services/         # Capa de servicios: encapsula la interacción con la base de datos y la lógica de negocio central
│   └── middlewares/      # Middlewares: autenticación de login, captura global de errores
└── docs/                 # Directorio donde se almacena la documentación de la API
```

## 2.2 Inicialización del proyecto con ayuda de AI
En lugar de ejecutar manualmente `npm init` e instalar las dependencias una por una, es mejor pasarle la especificación anterior al LLM en forma de prompt:

> 🗣️ **Prompt de ejemplo para el LLM:**
> "Ayúdame a crear un proyecto backend en Node.js que pueda conectarse a una base de datos Supabase, con una estructura clara que facilite el mantenimiento futuro."

Después de ejecutar el código devuelto por la AI, podrás acceder en `localhost:3000` a una aplicación backend con estructura de nivel empresarial.

---

# 3. Práctica central: desarrollo de API asistido por LLM

Esta es la parte más importante del capítulo. El código generado por los LLM a menudo contiene "lagunas lógicas" o resulta superficial, porque el desarrollador no proporcionó suficiente contexto. **A los LLM no les asustan los requisitos complejos; lo que más temen son los requisitos ambiguos.**

Tomemos como ejemplo la interfaz de creación de la tabla `menu_items` que mencionamos en el [capítulo de bases de datos](../database-supabase/), y veamos cómo redactar un prompt de alta calidad.

## 3.1 Proporcionar contexto completo al LLM
Antes de pedirle a la AI que escriba una API, asegúrate de proporcionar la **definición de los campos de la base de datos (Schema)** y las **restricciones específicas**.

> 🗣️ **Plantilla de prompt de alta calidad:**
> "Ayúdame a escribir una API para crear un nuevo elemento del menú. El menú tiene nombre del producto, precio, categoría (hamburguesas, snacks, bebidas) y si está disponible. El nombre y el precio son obligatorios, y el precio no puede ser negativo. Cuando el usuario ingrese datos incorrectos, debe mostrar un mensaje de error."

## 3.2 Revisar el código generado por el LLM
El código generado por el LLM generalmente separará las responsabilidades de forma clara, como se muestra a continuación:

```javascript
// services/menuService.js
const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

exports.createMenuItem = async (menuData) => {
    // Llamar al SDK de Supabase para insertar datos en la tabla
    const { data, error } = await supabase
        .from('menu_items')
        .insert([menuData])
        .select()

    if (error) throw new Error(`Error al insertar en la base de datos: ${error.message}`)
    return data[0]
}
```

Como puedes ver, el código generado de esta manera no solo tiene una estructura razonable, sino que también contempla la inicialización de Supabase, la captura de errores y el manejo de excepciones. Esto es completamente diferente del código espagueti que se obtiene simplemente pidiendo "escribe una API de creación".

---

# 4. Manos libres: generación automática de documentación de API

Para un equipo de desarrollo, una API sin documentación es como una caja negra. Los ingenieros de frontend no pueden adivinar qué parámetros deben enviar ni predecir qué estructura recibirán de vuelta. El estándar más extendido para describir APIs es **OpenAPI (anteriormente conocido como Swagger)**.

Antes, escribir documentación Swagger en formato YAML o JSON era extremadamente tedioso y propenso a errores. Ahora, esto se ha convertido en una de las tareas que los LLM dominan mejor.

Puedes simplemente seleccionar el código de tus `routes` y `controllers` y pasárselo al LLM:

> 🗣️ **Prompt para generar documentación:**
> "Ayúdame a generar la documentación de la API a partir del código anterior. Especifica claramente qué significa cada parámetro y qué datos se devuelven, para facilitar la integración con el equipo de frontend."

En este proceso, incluso puedes pedirle a la AI que complete las descripciones de los campos y los datos Mock (por ejemplo, `price_cents: 1200` representa 12 dólares), reduciendo drásticamente los costos de comunicación.

---

# 5. Red de seguridad: generación de código de prueba y colecciones de Postman

Con el código escrito y la documentación generada, falta un último paso: verificar que el código realmente funcione.

## 5.1 Generar configuraciones de prueba para Postman / Apifox
En el desarrollo de APIs, normalmente usamos herramientas visuales como Postman para simular peticiones HTTP desde el frontend. Sin usar un LLM, tendrías que introducir manualmente la URL, añadir los Headers (cabeceras) uno por uno y construir el cuerpo JSON de la petición.

Solo tienes que enviarle esta instrucción a la AI:
> "Convierte esta documentación de API a un formato que se pueda importar en Postman. Incluye ejemplos de peticiones válidas y erróneas."

Una vez que tengas el texto JSON, guárdalo como `menu_api.json` y arrástralo a Postman. Al instante tendrás un panel de pruebas listo para usar.

## 5.2 Escribir pruebas unitarias automatizadas
Si buscas una calidad de ingeniería más rigurosa, puedes pedirle al LLM que escriba pruebas unitarias usando frameworks como `Jest`, realizando pruebas de límite en la lógica de negocio central (por ejemplo, verificar si la validación a nivel de base de datos funciona cuando se pasa un precio negativo).

---

# 6. Mejores prácticas esenciales para APIs backend

Incluso con la asistencia de la AI, como "guardián" de todo el sistema, debes conocer y revisar estos principios fundamentales:

1. **Nomenclatura de rutas según la convención RESTful**:
   - Buen diseño: `GET /api/users` (obtener lista de usuarios), `POST /api/users` (crear un usuario). Las URLs deben representar "recursos" mediante sustantivos.
   - Mal diseño: `POST /api/getUser` o `POST /api/createUser`. Los verbos deben expresarse a través del método HTTP (GET/POST/PUT/DELETE).
2. **Códigos de estado HTTP estandarizados**:
   - 200/201: Petición exitosa / Recurso creado exitosamente.
   - 400: Bad Request, el frontend envió parámetros con formato incorrecto o faltan campos obligatorios.
   - 401/403: Unauthorized / Forbidden, el usuario no ha iniciado sesión o no tiene permisos.
   - 404: Not Found, el recurso no existe.
   - 500: Server Error, error en el código backend o la base de datos está caída. Evita siempre exponer directamente la traza de error al frontend (por razones de seguridad).
3. **Nunca confíes en la entrada del usuario**: Los datos del frontend pueden estar falsificados. Todas las validaciones de parámetros críticos deben realizarse nuevamente en la API backend.

# 7. Resumen

Con esta lección, has logrado una verdadera transformación en tu perspectiva de desarrollo: ya no eres un "tecleador" atrapado en la sintaxis y los signos de puntuación, sino que te has convertido en un **diseñador de sistemas y arquitecto**.

Has aprendido:
1. El pensamiento sistémico central sobre **APIs y la separación frontend-backend**.
2. **Cómo proporcionar contexto y aplicar conceptos de arquitectura en capas** para mejorar significativamente la calidad del código server-side generado por los LLM.
3. A convertir las tediosas tareas de **redacción de documentación** y **construcción de casos de prueba** en tareas automatizadas que la AI domina.
4. A integrar los conocimientos previos sobre **Supabase**, completando el flujo de datos desde la petición del cliente hasta la actualización de la base de datos subyacente.

::: tip 💡 Siguiente paso
Cuando tu flujo de datos y servicios backend estén listos, aún solo funcionarán en tu computadora local. En los próximos capítulos, aprenderemos cómo **desplegar (Deploy)** estos servicios en un servidor público, para que tu producto sea accesible para usuarios de todo el mundo.
:::
