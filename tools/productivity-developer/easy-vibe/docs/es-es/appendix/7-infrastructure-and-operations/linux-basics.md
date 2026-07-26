# Fundamentos de Linux

::: tip Prefacio
**En el mundo de los servidores, Linux es el protagonista absoluto.** Más del 90% de los servidores globales ejecutan Linux. Desde WeChat hasta Google, Linux está detrás de todo. Como desarrollador, dominar los fundamentos de Linux no es opcional, es obligatorio.
:::

**¿Qué aprenderás en este artículo?**

Al terminar este capítulo, habrás adquirido:

- **Sistema de archivos**: comprender la estructura de directorios de Linux y la filosofía de "todo es un archivo"
- **Comandos comunes**: dominar comandos esenciales para manipulación de archivos, procesamiento de texto y gestión de procesos
- **Modelo de permisos**: entender los conceptos de usuario, grupo y permisos
- **Fundamentos de Shell**: conocer pipes, redirecciones, variables de entorno y otros conceptos clave del Shell
- **Habilidades prácticas**: aprender a revisar logs, depurar procesos, diagnosticar redes y otras operaciones básicas

| Capítulo | Contenido | Conceptos clave |
|----------|-----------|-----------------|
| **Capítulo 1** | Sistema de archivos | Estructura de directorios, todo es un archivo |
| **Capítulo 2** | Comandos comunes | Archivos, texto, procesos, red |
| **Capítulo 3** | Modelo de permisos | Usuario, grupo, rwx, sudo |
| **Capítulo 4** | Fundamentos de Shell | Pipes, redirecciones, variables, scripts |
| **Capítulo 5** | Escenarios prácticos | Revisión de logs, diagnóstico de rendimiento |

---

## 1. Sistema de archivos: todo es un archivo

Una de las filosofías centrales de Linux es **todo es un archivo**. Un archivo normal es un archivo, un directorio es un archivo, un disco duro es un archivo, e incluso las conexiones de red y la información de procesos son archivos. Esta abstracción unificada te permite usar el mismo conjunto de herramientas (lectura, escritura, control de permisos) para operar prácticamente todos los recursos del sistema.

<LinuxFileSystemDemo />

### Estructura de directorios de un vistazo

Imagina el sistema de archivos de Linux como un árbol invertido:

```
/                    ← Directorio raíz (la raíz del árbol)
├── home/            ← Hogar de los usuarios (tus archivos están aquí)
├── etc/             ← Archivos de configuración (el "panel de ajustes" del sistema)
├── var/             ← Datos variables (logs, caché)
├── usr/             ← Programas instalados por el usuario
├── tmp/             ← Archivos temporales (se eliminan al reiniciar)
├── proc/            ← Información de procesos (virtual, no ocupa disco)
├── dev/             ← Archivos de dispositivo (discos, terminales)
├── bin/             ← Comandos básicos (ls, cp, mv)
├── sbin/            ← Comandos de administración del sistema (requieren root)
├── opt/             ← Software de terceros
└── root/            ← Directorio home del usuario root
```

### Dos formas de escribir rutas

| Tipo | Formato | Ejemplo | Descripción |
|------|---------|---------|-------------|
| Ruta absoluta | Comienza con `/` | `/home/alice/code/app.js` | Parte del directorio raíz, sin ambigüedad |
| Ruta relativa | Comienza desde el directorio actual | `./code/app.js` o `../config` | `.` es el directorio actual, `..` es el directorio padre |

::: tip El poder de "todo es un archivo"
¿Quieres ver la información de la CPU? Lee un archivo: `cat /proc/cpuinfo`
¿Quieres ver el uso de memoria? Lee un archivo: `cat /proc/meminfo`
¿Quieres generar números aleatorios? Lee un archivo: `cat /dev/urandom`
¿Quieres descartar una salida? Escribe en un archivo: `echo "no thanks" > /dev/null`

No necesitas una API especializada, solo leer y escribir archivos. Esta es la elegancia de la filosofía Unix.
:::

---

## 2. Comandos comunes

Los comandos de Linux siguen un formato unificado: `comando [opciones] [argumentos]`. Por ejemplo, en `ls -la /home`, `ls` es el comando, `-la` son las opciones y `/home` es el argumento.

<LinuxCommandDemo />

### Los 10 comandos más usados

Si solo pudieras recordar 10 comandos, memoriza estos:

| Comando | Uso | Truco mnemotécnico |
|---------|-----|--------------------|
| `ls` | Listar archivos | list |
| `cd` | Cambiar directorio | change directory |
| `cat` | Ver archivo | concatenate |
| `grep` | Buscar texto | global regular expression print |
| `find` | Encontrar archivos | find |
| `ps` | Ver procesos | process status |
| `tail -f` | Ver logs en tiempo real | Ver la "cola" del archivo, -f es follow |
| `chmod` | Cambiar permisos | change mode |
| `curl` | Enviar peticiones HTTP | client URL |
| `ssh` | Inicio de sesión remoto | secure shell |

### El arte de combinar comandos

El poder de Linux no reside en un solo comando, sino en la **combinación de comandos**. Mediante el pipe `|` puedes encadenar varios comandos simples para resolver problemas complejos:

```bash
# Encontrar los 5 procesos que más CPU consumen
ps aux --sort=-%cpu | head -6

# Contar los tipos de error más frecuentes en el log
grep "ERROR" app.log | awk '{print $4}' | sort | uniq -c | sort -rn | head -10

# Buscar archivos mayores de 100 MB
find / -size +100M -type f 2>/dev/null

# Monitorizar errores en el log en tiempo real
tail -f /var/log/app.log | grep --color "ERROR"
```

::: tip Filosofía Unix
"Haz una cosa, y hazla bien". Cada comando se encarga de una sola función, y las operaciones complejas se logran combinándolos con pipes. Por eso los comandos de Linux son tan cortos: son bloques de construcción, no navajas suizas.
:::

---

## 3. Modelo de permisos

Linux es un sistema multiusuario, y el modelo de permisos es la base de su seguridad. Cada archivo tiene tres conjuntos de permisos, que controlan lo que pueden hacer el **propietario (Owner)**, el **grupo propietario (Group)** y **otros (Others)**.

### Cómo interpretar la salida de `ls -l`

```bash
$ ls -l app.js
-rwxr-xr-- 1 alice developers 2048 Jan 15 10:30 app.js
│├──┤├──┤├──┤   │     │          │
│ │   │   │     │     │          └── Tamaño del archivo
│ │   │   │     │     └── Grupo propietario
│ │   │   │     └── Propietario
│ │   │   └── Permisos de otros: r-- (solo lectura)
│ │   └── Permisos del grupo: r-x (lectura + ejecución)
│ └── Permisos del propietario: rwx (lectura + escritura + ejecución)
└── Tipo de archivo: - archivo normal, d directorio, l enlace
```

### Los tres tipos de permiso

| Permiso | Letra | Número | Significado para archivos | Significado para directorios |
|---------|-------|--------|---------------------------|------------------------------|
| Lectura | `r` | 4 | Ver el contenido del archivo | Listar el contenido del directorio (ls) |
| Escritura | `w` | 2 | Modificar el contenido del archivo | Crear/eliminar archivos en el directorio |
| Ejecución | `x` | 1 | Ejecutar programa/script | Entrar en el directorio (cd) |

<LinuxPermissionsDemo />

### Cálculo rápido de permisos numéricos

Los tres dígitos representan los permisos de Owner, Group y Others respectivamente. Cada dígito es la suma de r(4) + w(2) + x(1):

```
chmod 755 script.sh
  7 = rwx (4+2+1)  → Propietario: lectura + escritura + ejecución
  5 = r-x (4+0+1)  → Grupo: lectura + ejecución
  5 = r-x (4+0+1)  → Otros: lectura + ejecución
```

| Permiso común | Significado | Uso típico |
|---------------|-------------|------------|
| `644` | rw-r--r-- | Archivos normales (propietario escribe, otros solo leen) |
| `755` | rwxr-xr-x | Archivos ejecutables/directorios |
| `600` | rw------- | Archivos privados (como claves SSH) |
| `777` | rwxrwxrwx | Todos pueden leer, escribir y ejecutar (peligroso, evitar) |

### sudo: obtener permisos de superusuario temporalmente

Los usuarios normales tienen permisos limitados; algunas operaciones requieren permisos de root. `sudo` te permite ejecutar comandos como root temporalmente:

```bash
# Un usuario normal no puede modificar la configuración del sistema
$ vim /etc/nginx/nginx.conf
# Permission denied

# Usa sudo para elevar privilegios temporalmente
$ sudo vim /etc/nginx/nginx.conf
# Introduce tu contraseña y podrás editar

# Cambiar al usuario root (usar con precaución)
$ sudo su -
```

::: warning Principio de mínimo privilegio
Nunca uses `chmod 777` para resolver problemas de permisos; es como quitar la cerradura de la puerta. La forma correcta es averiguar quién necesita qué permisos y concederlos con precisión. Del mismo modo, no operes como root durante largos periodos; usa `sudo` solo cuando sea necesario.
:::

---

## 4. Fundamentos de Shell

El Shell es el "intérprete" entre tú y el núcleo de Linux. Escribes un comando, el Shell lo interpreta y lo entrega al núcleo para su ejecución. Los Shells más comunes son **Bash** (predeterminado en la mayoría de distribuciones Linux) y **Zsh** (predeterminado en macOS).

### Pipes y redirecciones

Estas son las dos características más potentes del Shell:

| Símbolo | Nombre | Función | Ejemplo |
|---------|--------|---------|---------|
| `|` | Pipe | Pasa la salida de un comando como entrada del siguiente | `cat log | grep ERROR` |
| `>` | Redirección de salida | Escribe la salida en un archivo (sobrescribe) | `echo "hello" > file.txt` |
| `>>` | Redirección de anexo | Añade la salida al final del archivo | `echo "world" >> file.txt` |
| `<` | Redirección de entrada | Lee la entrada desde un archivo | `wc -l < file.txt` |
| `2>` | Redirección de error | Escribe los mensajes de error en un archivo | `cmd 2> error.log` |
| `2>&1` | Fusión de salidas | Combina error y salida normal | `cmd > all.log 2>&1` |

### Variables de entorno

Las variables de entorno son la "configuración global" del Shell y afectan el comportamiento de los comandos:

```bash
# Ver todas las variables de entorno
env

# Ver una variable específica
echo $PATH
echo $HOME

# Establecer temporalmente (solo válido en el Shell actual)
export API_KEY="abc123"

# Establecer permanentemente (escribir en archivo de configuración)
echo 'export API_KEY="abc123"' >> ~/.bashrc
source ~/.bashrc   # Aplicar la configuración inmediatamente
```

| Variable común | Significado | Valor de ejemplo |
|----------------|-------------|------------------|
| `$PATH` | Ruta de búsqueda de comandos | `/usr/local/bin:/usr/bin:/bin` |
| `$HOME` | Directorio home del usuario | `/home/alice` |
| `$USER` | Nombre del usuario actual | `alice` |
| `$PWD` | Directorio de trabajo actual | `/var/log` |
| `$SHELL` | Shell actual | `/bin/bash` |

### Introducción a los scripts de Shell

Un script de Shell es simplemente un archivo que contiene varios comandos. Es el punto de partida para la automatización de operaciones:

```bash
#!/bin/bash
# deploy.sh - script simple de despliegue

APP_DIR="/opt/myapp"
LOG_FILE="/var/log/deploy.log"

echo "$(date) - Iniciando despliegue..." >> $LOG_FILE

# Obtener el código más reciente
cd $APP_DIR && git pull origin main

# Instalar dependencias
npm install --production

# Reiniciar el servicio
pm2 restart myapp

echo "$(date) - Despliegue completado" >> $LOG_FILE
```

```bash
# Dar permisos de ejecución al script y ejecutarlo
chmod +x deploy.sh
./deploy.sh
```

::: tip Consejos para depurar scripts
Añade `set -ex` al inicio del script: `-e` hace que el script se detenga inmediatamente ante un error (en lugar de continuar), y `-x` imprime cada comando ejecutado (útil para depurar). Estas dos opciones son prácticamente estándar en scripts de producción.
:::

---

## 5. Escenarios prácticos

Ahora que hemos cubierto la teoría, veamos algunos de los escenarios más comunes en el desarrollo.

### 5.1 Revisión de logs

Cuando un servicio falla, lo primero es revisar los logs. Aquí tienes las técnicas más habituales:

```bash
# 1. Seguir el log en tiempo real (lo más usado)
tail -f /var/log/app/error.log

# 2. Buscar errores en un intervalo de tiempo específico
grep "2024-01-15 14:" error.log | grep "ERROR"

# 3. Contar el número de errores por hora
grep "ERROR" app.log | awk '{print substr($1,1,13)}' | uniq -c

# 4. Ver las últimas 100 líneas del log
tail -100 app.log

# 5. Buscar en múltiples archivos de log
grep -r "OutOfMemory" /var/log/app/
```

### 5.2 Depuración de procesos

Aplicación bloqueada, CPU al máximo, fuga de memoria: estos problemas requieren empezar por los procesos:

```bash
# Ver los procesos que más CPU consumen
ps aux --sort=-%cpu | head -10

# Ver los procesos que más memoria consumen
ps aux --sort=-%mem | head -10

# Buscar un proceso específico
ps aux | grep "node"

# Ver información detallada de un proceso (incluyendo hilos)
top -Hp <PID>

# Ver los archivos abiertos por un proceso
lsof -p <PID>

# Terminar un proceso de forma elegante (SIGTERM)
kill <PID>

# Forzar terminación (SIGKILL, último recurso)
kill -9 <PID>
```

### 5.3 Diagnóstico de red

¿El servicio no conecta? Primero determina si es un problema de red o de aplicación:

```bash
# Probar si el destino es alcanzable
ping -c 4 google.com

# Verificar si un puerto está abierto
telnet db-server 3306
# O usando nc
nc -zv db-server 3306

# Ver los puertos en escucha en la máquina local
ss -tlnp
# O
netstat -tlnp

# Verificar resolución DNS
dig api.example.com
nslookup api.example.com

# Probar un endpoint HTTP
curl -v http://localhost:3000/health

# Ver estadísticas de conexiones de red
ss -s
```

### 5.4 Diagnóstico de espacio en disco

Quedarse sin espacio en disco es una de las incidencias más comunes en producción:

```bash
# Ver el uso de cada partición
df -h

# Encontrar los directorios que más espacio ocupan
du -sh /* 2>/dev/null | sort -rh | head -10

# Localizar subdirectorios grandes
du -sh /var/log/* | sort -rh | head -10

# Buscar archivos grandes (>100 MB)
find / -type f -size +100M 2>/dev/null | head -20

# Limpiar ocupantes de espacio comunes
# Limpiar logs antiguos
sudo journalctl --vacuum-size=500M
# Limpiar imágenes Docker no utilizadas
docker system prune -a
```

::: tip Fórmula de diagnóstico en producción
**"Primero logs, luego procesos, después red, y por último disco"**. El 90% de los problemas en producción se pueden localizar siguiendo estos cuatro pasos. Una vez que adquieras el hábito, tu eficiencia de diagnóstico mejorará drásticamente.
:::

---

## Resumen

Linux es una habilidad esencial para todo desarrollador. Dominar los fundamentos te permitirá afrontar la mayoría de los escenarios cotidianos de desarrollo y operaciones.

Repaso de los puntos clave de este capítulo:

1. **Todo es un archivo**: Linux unifica el acceso a hardware, procesos, red y otros recursos mediante la abstracción de archivos
2. **Combinación de comandos**: Los comandos individuales son simples; el verdadero poder surge al combinarlos con pipes `|`
3. **Modelo de permisos**: Owner/Group/Others × Read/Write/Execute, configúralos rápidamente con números (ej. 755)
4. **Fundamentos de Shell**: pipes, redirecciones, variables de entorno y scripts son la base de la automatización
5. **Diagnóstico práctico**: logs → procesos → red → disco, cuatro pasos para localizar la mayoría de problemas en producción

## Lecturas adicionales

- [Linux Man Pages](https://man7.org/linux/man-pages/) - Documentación oficial de las páginas de manual de Linux
- [The Linux Command Line](https://linuxcommand.org/tlcl.php) - Libro gratuito de introducción a la línea de comandos de Linux
- [Linux Journey](https://linuxjourney.com/) - Sitio web interactivo para aprender Linux
- [explainshell.com](https://explainshell.com/) - Introduce un comando y explica automáticamente cada parámetro
