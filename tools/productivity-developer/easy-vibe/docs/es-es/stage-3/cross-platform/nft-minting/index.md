# Cómo crear y acuñar un NFT rápidamente: Edición de inicio en 10 minutos

# Capítulo 1: Qué son los NFTs y los Contratos Inteligentes

En este tutorial, completaremos un ciclo completo: escribiremos un contrato inteligente NFT desde cero, lo desplegaremos en la testnet de Ethereum, acuñaremos nuestro propio NFT y lo visualizaremos en OpenSea. Todo el proceso utiliza herramientas basadas en el navegador sin necesidad de configurar un entorno local, y se puede completar en 10 minutos.

Para este tutorial, deberías tener al menos:

- Navegador Chrome (con la extensión de billetera MetaMask instalada)
- Una cuenta de billetera MetaMask
- Una pequeña cantidad de ETH de testnet Sepolia (gratis, se explica cómo obtenerlo a continuación)

> **Costo cero, configuración cero**: todo el proceso utiliza herramientas basadas en el navegador (Remix IDE), sin necesidad de instalar Node.js / Hardhat; el código utiliza plantillas seguras oficiales de OpenZeppelin; después de acuñar, puedes ver tu NFT en la testnet de OpenSea.

## 1.1 ¿Qué es un NFT?

NFT (Token No Fungible) es un tipo de activo digital en la blockchain. A diferencia de los tokens fungibles como Bitcoin o Ether, cada NFT es único, como no existen dos pinturas en el mundo exactamente iguales.

Puedes entender un NFT como un **"certificado de colección en el mundo digital."** Puede representar:

* la propiedad de una obra de arte digital
* un boleto de evento
* un objeto de juego
* un certificado de aprendizaje
* incluso un tuit

El valor central de los NFTs es: **utilizan tecnología blockchain para demostrar "este elemento digital te pertenece", y esa prueba es pública, transparente e inalterable.**

<!-- ![placeholder: Un diagrama conceptual de NFTs: una obra de arte digital a la izquierda, registro de propiedad en blockchain a la derecha, conectados por flechas](/zh-cn/stage-3/cross-platform/nft-minting/images/image1.png) -->

## 1.2 ¿Qué es un Contrato Inteligente?

Un contrato inteligente es un fragmento de código que se ejecuta en la blockchain. Puedes pensar en él como un **"contrato de ejecución automática"**. Una vez desplegado en la cadena, se ejecuta automáticamente según la lógica del código, y nadie puede alterarlo.

Los NFTs se crean y gestionan mediante contratos inteligentes. Cuando "acuñas" un NFT, en realidad estás llamando a una función en el contrato inteligente para escribir en la cadena: "NFT #0 pertenece a la dirección de tu billetera."

Usaremos **Solidity** para escribir el contrato. No te preocupes. Con las plantillas listas para usar de OpenZeppelin, solo necesitas escribir menos de 15 líneas de código.

## 1.3 ¿Qué NFT vamos a acuñar?

Acuñaremos un NFT de **"Certificado de Aprendizaje Vibe Coder"** para demostrar que completaste este tutorial y aprendiste los fundamentos del desarrollo en blockchain. Este NFT:

* tendrá un ID de token único
* será registrado en la testnet Sepolia de Ethereum
* será visible y mostrable en la testnet de OpenSea
* (opcional) incluirá tu imagen personalizada

Por supuesto, puedes cambiarlo a cualquier tema que te guste: obra de arte generada por IA, tarjeta de recuerdo de evento, avatar de píxeles, y más. El contenido del NFT depende completamente de ti.

## 1.4 ¿Por qué usar una Testnet?

Ethereum tiene "mainnet" y "testnet":

| Comparación | Mainnet | Testnet (Sepolia) |
|------|----------------|------------------|
| Valor del ETH | Dinero real | Gratis, sin valor real |
| Costo de despliegue | Requiere tarifas gas reales | Completamente gratis |
| Caso de uso | Lanzamiento en producción | Aprendizaje, pruebas, desarrollo |
| Diferencia funcional | Ninguna | Igual que mainnet |

La testnet y la mainnet son funcionalmente iguales. La única diferencia es que el ETH de testnet no tiene valor real. Así que puedes aprender y experimentar de forma segura en la testnet sin preocuparte por gastar dinero.

## 1.5 Hoja de Ruta del Tutorial

Completaremos el flujo en estos pasos:

1. **Preparar billetera y ETH de prueba** (2 minutos): instalar MetaMask y reclamar ETH de prueba gratis
2. **Escribir y desplegar contrato** (4 minutos): escribir contrato NFT en Remix IDE y desplegar en Sepolia
3. **Acuñar NFT y verificar resultado** (4 minutos): llamar al contrato para acuñar NFT y verificar en OpenSea y Etherscan
4. **Avanzado: añadir imagen al NFT** (opcional): almacenar imagen en IPFS para completar el NFT

# Capítulo 2: Preparar Billetera y ETH de Prueba (2 Minutos)

## 2.1 Instalar la Billetera MetaMask

MetaMask es la billetera Ethereum más popular. Es una extensión de navegador que te permite interactuar con aplicaciones blockchain.

1. Abre Chrome y visita el [sitio oficial de MetaMask](https://metamask.io/)
2. Haz clic en **"Download"** e instala la extensión de Chrome
3. Después de la instalación, haz clic en el ícono del zorro de MetaMask en la esquina superior derecha
4. Elige **"Create a new wallet"** y establece una contraseña
5. **Importante**: guarda tu frase de recuperación (12 palabras) de forma segura. Perder una billetera de prueba no es grave, pero los buenos hábitos importan

<!-- ![placeholder: Capturas de pantalla del flujo de instalación y creación de billetera de MetaMask: instalar extensión -> crear billetera -> establecer contraseña -> respaldar frase de recuperación](/zh-cn/stage-3/cross-platform/nft-minting/images/image2.png) -->

## 2.2 Cambiar a la Testnet Sepolia

MetaMask se conecta a la mainnet de Ethereum por defecto. Necesitamos cambiar a la testnet Sepolia:

1. Haz clic en el menú desplegable de red en la parte superior de MetaMask (por defecto: "Ethereum Mainnet")
2. Haz clic en **"Show test networks"**
3. Selecciona **"Sepolia test network"**

Si no ves Sepolia, haz clic en **"Add network"** y añade manualmente:

| Elemento de Configuración | Valor |
|-------|-----|
| Nombre de Red | Sepolia test network |
| RPC URL | `https://rpc.sepolia.org` |
| Chain ID | 11155111 |
| Símbolo de Moneda | SepoliaETH |
| Explorador de Bloques | `https://sepolia.etherscan.io` |

<!-- ![placeholder: Captura de pantalla del cambio de MetaMask a testnet Sepolia mediante el menú desplegable de red](/zh-cn/stage-3/cross-platform/nft-minting/images/image3.png) -->

## 2.3 Reclamar ETH de Prueba Gratis

Desplegar contratos y acuñar NFTs requiere tarifas gas. En la testnet, el gas se paga con ETH de prueba, que es gratis.

Visita cualquier faucet de la lista a continuación e ingresa la dirección de tu billetera para reclamar ETH Sepolia gratis:

| Faucet | URL | Cantidad por Reclamo | Requiere Login |
|--------|------|-----------|------------|
| QuickNode | `https://faucet.quicknode.com/ethereum/sepolia` | 0.1 ETH | Sí |
| Alchemy | `https://www.alchemy.com/faucets/ethereum-sepolia` | 0.1 ETH | Sí |
| Google Cloud | `https://cloud.google.com/application/web3/faucet/ethereum/sepolia` | 0.05 ETH | Sí (cuenta Google) |

> **Consejo**: 0.1 ETH de prueba es suficiente para desplegar un contrato y acuñar docenas de NFTs. Si un faucet falla, prueba otro.

Después de reclamar exitosamente, regresa a MetaMask y tu saldo debería cambiar de 0 a 0.1 ETH (puede tardar unos segundos).

<!-- ![placeholder: Captura de pantalla del sitio faucet mostrando entrada de dirección de billetera y reclamación de ETH de prueba](/zh-cn/stage-3/cross-platform/nft-minting/images/image4.png) -->

# Capítulo 3: Escribir y Desplegar el Contrato Inteligente NFT (4 Minutos)

## 3.1 Abrir Remix IDE

Remix es el entorno de desarrollo de contratos inteligentes en línea recomendado oficialmente por Ethereum. Se ejecuta completamente en el navegador y no requiere instalación.

Abre: **https://remix.ethereum.org/**

Verás una interfaz similar a VS Code: explorador de archivos a la izquierda, editor de código en el centro, y panel de compilación/despliegue a la derecha.

<!-- ![placeholder: Captura de pantalla de inicio de Remix IDE mostrando explorador de archivos, editor de código y panel derecho](/zh-cn/stage-3/cross-platform/nft-minting/images/image5.png) -->

## 3.2 Crear Archivo de Contrato

1. En el explorador de archivos de la izquierda, haz clic en la carpeta **"contracts"**
2. Haz clic en el botón **"+"** de arriba para crear un nuevo archivo
3. Nómbralo **`MySimpleNFT.sol`**
4. Pega el código a continuación:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Importar plantilla segura oficial ERC721 de OpenZeppelin
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Contrato NFT más simple: nombre, símbolo, función mint únicamente
contract MySimpleNFT is ERC721 {
    uint256 private _tokenId;

    // Inicializar nombre de colección y símbolo
    constructor() ERC721("VibeCoder", "VIBE") {}

    // Acuñar NFT: llamar una vez para acuñar un token al llamador
    function mint() public {
        _safeMint(msg.sender, _tokenId);
        _tokenId++;
    }
}
```

**Explicación del código (menos de 15 líneas, y cada línea es comprensible):**

| Código | Significado |
|------|------|
| `pragma solidity ^0.8.20` | Especificar versión del compilador Solidity |
| `import "@openzeppelin/..."` | Importar implementación estándar ERC721 de OpenZeppelin (plantilla auditada en seguridad) |
| `contract MySimpleNFT is ERC721` | Crear un contrato que hereda el estándar ERC721 |
| `ERC721("VibeCoder", "VIBE")` | Establecer nombre de colección "VibeCoder" y símbolo "VIBE" |
| `_safeMint(msg.sender, _tokenId)` | Acuñar un nuevo NFT al llamador |
| `_tokenId++` | Incrementar ID del token después de cada acuñación |

> **¿Qué es ERC721?** Es el estándar NFT en Ethereum, que define las capacidades básicas de NFT (transferencia, consulta de propietario, etc.). OpenZeppelin proporciona una implementación auditada en seguridad, para que podamos heredar directamente en lugar de construir desde cero.

<!-- ![placeholder: Captura de pantalla del código del contrato pegado en Remix IDE](/zh-cn/stage-3/cross-platform/nft-minting/images/image6.png) -->

## 3.3 Compilar el Contrato

1. Haz clic en **"Solidity Compiler"** en el panel izquierdo (ícono de martillo)
2. Selecciona la versión del compilador **0.8.20** (o superior en 0.8.x)
3. Haz clic en **"Compile MySimpleNFT.sol"**
4. Una marca verde ✅ significa que la compilación fue exitosa

> Si hay un error, verifica si la versión de Solidity coincide y si la ruta de importación de OpenZeppelin es correcta. Remix descarga automáticamente las dependencias de OpenZeppelin desde npm.

<!-- ![placeholder: Captura de pantalla de compilación exitosa en Remix con marca verde y versión del compilador seleccionada](/zh-cn/stage-3/cross-platform/nft-minting/images/image7.png) -->

## 3.4 Desplegar Contrato en la Testnet Sepolia

1. Haz clic en **"Deploy & Run Transactions"** en el panel izquierdo (ícono de Ethereum)
2. Establece **Environment** en **"Injected Provider - MetaMask"**
   - Esto conecta automáticamente tu billetera MetaMask
   - MetaMask mostrará una solicitud de conexión, haz clic en **"Connect"**
3. Confirma que la red es **Sepolia (11155111)**
4. Selecciona **MySimpleNFT** en el menú desplegable Contract
5. Haz clic en **"Deploy"**
6. MetaMask muestra la confirmación de transacción, haz clic en **"Confirm"** (el gas es muy bajo; testnet es gratis)

Después de unos segundos, cuando el despliegue sea exitoso, la sección **"Deployed Contracts"** debajo mostrará la dirección de tu contrato. **Copia y guarda esta dirección**; la necesitarás más adelante.

<!-- ![placeholder: Captura de pantalla de despliegue en Remix mostrando selección de entorno, confirmación de MetaMask, botón Deploy y dirección del contrato desplegado](/zh-cn/stage-3/cross-platform/nft-minting/images/image8.png) -->

# Capítulo 4: Acuñar NFT y Verificar Resultado (4 Minutos)

## 4.1 Acuñar tu Primer NFT

Después del despliegue exitoso, en la sección **"Deployed Contracts"** de Remix, verás el panel de interacción del contrato.

1. Expande el panel del contrato y busca el botón **"mint"** (naranja)
2. Haz clic en **"mint"** directamente (no requiere parámetros de entrada)
3. MetaMask muestra la confirmación de transacción, haz clic en **"Confirm"**
4. Espera unos segundos para la finalización

¡Felicidades! Acabas de acuñar el NFT #0, y ahora pertenece a la dirección de tu billetera.

Puedes seguir haciendo clic en "mint" para crear más. Los IDs de token se incrementan automáticamente cada vez (#1, #2, #3...).

<!-- ![placeholder: Captura de pantalla de hacer clic en mint en Remix y confirmar transacción en MetaMask](/zh-cn/stage-3/cross-platform/nft-minting/images/image9.png) -->

## 4.2 Verificar Resultado de la Acuñación

**Método 1: Verificar en Remix**

En el panel del contrato, busca **"balanceOf"** (botón azul), ingresa la dirección de tu billetera y llámalo. Si devuelve `1` (o la cantidad que acuñaste), la acuñación fue exitosa.

También puedes llamar **"ownerOf"**, ingresar `0` (ID del token), y devolverá la dirección de tu billetera, demostrando que NFT #0 te pertenece.

**Método 2: Verificar en Etherscan (recomendado)**

1. Abre [Sepolia Etherscan](https://sepolia.etherscan.io/)
2. Pega la **dirección de tu contrato** en la búsqueda
3. Verás la página de detalles del contrato con todos los registros de transacciones
4. Haz clic en **"Token Tracker"** para ver todos los NFTs acuñados por tu contrato

En Etherscan, cada transacción de acuñación tiene registros completos: quién acuñó, cuándo se acuñó, y el ID del token. Este es el encanto de que la blockchain sea "pública, transparente e inalterable."

<!-- ![placeholder: Captura de pantalla de visualización del contrato y registros de acuñación de NFT en Sepolia Etherscan, incluyendo lista de transacciones y Token Tracker](/zh-cn/stage-3/cross-platform/nft-minting/images/image10.png) -->

# Capítulo 5: Avanzado - Añadir una Imagen al NFT (Opcional)

Los NFTs acuñados hasta ahora solo tienen IDs, sin imagen ni descripción. Para que los NFTs estén completos, necesitamos **IPFS (Sistema de Archivos InterPlanetario)** para almacenar imágenes y metadatos.

## 5.1 ¿Qué es IPFS?

IPFS es una red de almacenamiento de archivos descentralizada. A diferencia del almacenamiento en la nube convencional, los archivos en IPFS no dependen de un solo servidor, sino que se distribuyen entre nodos globales. Esto significa:

* los archivos no se pierden si un servidor se cae
* el contenido de los archivos se identifica de forma única mediante hashes y no puede ser alterado
* es ideal para almacenar imágenes y metadatos de NFTs

## 5.2 Subir Imagen a Pinata

[Pinata](https://pinata.cloud/) es el servicio de almacenamiento IPFS más popular. El plan gratuito proporciona 1GB de almacenamiento, lo cual es suficiente para nosotros.

1. Visita https://pinata.cloud/ y regístrate para una cuenta gratuita
2. Después de iniciar sesión, haz clic en **"Upload"** -> **"File"**
3. Selecciona la imagen que quieres usar como obra de arte del NFT (una imagen generada por IA está bien, o cualquier imagen)
4. Después de que la subida sea exitosa, copia el **CID** (una cadena como `QmXyz...`)

Tu URI de imagen es: `ipfs://yourCID`

<!-- ![placeholder: Captura de pantalla de subida de imagen en Pinata, incluyendo botón de subida y CID resultante](/zh-cn/stage-3/cross-platform/nft-minting/images/image11.png) -->

## 5.3 Crear JSON de Metadatos

Los metadatos del NFT son un archivo JSON que describe el nombre, la descripción y la URI de la imagen del NFT. Crea un `metadata.json`:

```json
{
  "name": "Vibe Coder Certificate #0",
  "description": "Este NFT certifica que el titular ha completado el tutorial de acuñación de NFT y ha entrado al mundo de Web3.",
  "image": "ipfs://your-image-cid",
  "attributes": [
    { "trait_type": "Curso", "value": "Easy Vibe" },
    { "trait_type": "Habilidad", "value": "Contrato Inteligente" },
    { "trait_type": "Nivel", "value": "Principiante" }
  ]
}
```

Sube `metadata.json` a Pinata también, y obtén un CID de metadatos.

## 5.4 Actualizar el Contrato para Soportar Imágenes

Para incluir imágenes en los NFTs, necesitamos actualizar ligeramente el contrato añadiendo `tokenURI`. Regresa a Remix y crea un nuevo archivo `MyNFTWithImage.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFTWithImage is ERC721, ERC721URIStorage {
    uint256 private _tokenId;

    constructor() ERC721("VibeCoder", "VIBE") {}

    // Pasar URI de metadatos al acuñar
    function mint(string memory uri) public {
        _safeMint(msg.sender, _tokenId);
        _setTokenURI(_tokenId, uri);
        _tokenId++;
    }

    // Sobrescrituras requeridas por Solidity
    function tokenURI(uint256 tokenId)
        public view override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public view override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
```

Después del despliegue, llama a `mint` y pasa tu URI de metadatos (por ejemplo `ipfs://QmAbc.../metadata.json`). Entonces tu NFT acuñado incluirá imagen y descripción.

<!-- ![placeholder: Captura de pantalla de detalles del NFT con imagen mostrada en Etherscan](/zh-cn/stage-3/cross-platform/nft-minting/images/image12.png) -->

# Capítulo 6: Notas Finales

¡Felicidades! Has completado un ciclo completo de desarrollo NFT desde cero. Recapitulemos:

1. Entendiste los conceptos centrales de NFTs y contratos inteligentes
2. Instalaste MetaMask y cambiaste a la testnet Sepolia
3. Escribiste un contrato inteligente NFT con menos de 15 líneas en Remix IDE
4. Desplegaste el contrato en la testnet de Ethereum
5. Acuñaste tu propio NFT y lo verificaste en Etherscan
6. (Opcional) Aprendiste cómo añadir imagen y metadatos con IPFS

Todo el proceso no requirió instalación de entorno local, no costó dinero, y se completó completamente en el navegador. Este es el atractivo del desarrollo en blockchain: la barrera de entrada es mucho más baja de lo que la mayoría de la gente espera.

**Direcciones avanzadas:**

* **Usar Hardhat / Foundry para desarrollo local**: cuando la lógica del contrato se vuelve compleja, Remix no es suficiente. Hardhat y Foundry son frameworks locales profesionales con pruebas automatizadas, despliegue basado en scripts, optimización de gas, y más
* **Añadir lista blanca y límites de acuñación**: controlar quién puede acuñar, máximo de acuñaciones por billetera, precio de acuñación, y reglas similares
* **Construir un frontend de acuñación**: usar React + ethers.js / viem para construir una página de acuñación pulida para acuñar con un clic desde la web
* **Explorar NFTs multi-edición ERC1155**: ERC1155 permite múltiples copias bajo un ID de token, útil para objetos de juego y boletos
* **Desplegar en mainnet**: cuando estés listo, despliega en la mainnet de Ethereum (o cadenas L2 como Polygon o Base con tarifas gas más bajas)

***Tu primer NFT ya está en la cadena. La puerta al mundo blockchain ahora está abierta.***

# Referencias

* [Documentación ERC721 de OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/erc721)
* [Documentación Oficial de Remix IDE](https://remix-ide.readthedocs.io/)
* [Documentación Oficial de MetaMask](https://docs.metamask.io/)
* [Documentación Oficial de Solidity](https://docs.soliditylang.org/)
* [Sepolia Etherscan](https://sepolia.etherscan.io/)
* [Servicio de Almacenamiento IPFS Pinata](https://pinata.cloud/)
* [Especificación Estándar ERC721 (EIP-721)](https://eips.ethereum.org/EIPS/eip-721)
