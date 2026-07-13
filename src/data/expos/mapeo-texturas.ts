import type { Tema } from '../../lib/types';

const tema: Tema = {
  slug: 'mapeo-texturas',
  seccion: 'exposiciones',
  titulo: 'Mapeo de Texturas',
  subtitulo:
    'Coordenadas UV, métodos de proyección, filtrado (nearest, bilineal, trilineal, anisotrópico), mipmapping y tipos de mapas (difuso, normal, bump, specular, displacement).',
  resumen:
    'Cómo "envolver" imágenes sobre mallas 3D: parametrización UV, wrapping, filtrado para evitar aliasing y mipmaps para eficiencia y calidad a distancia.',
  tags: ['UV', 'Mipmapping', 'Filtrado', 'Bilineal', 'Normal map'],
  color: '#a3e635',

  teoria: [
    { tipo: 'parrafo', texto: 'El **mapeo de texturas** añade detalle superficial (color, relieve, brillo) a una malla 3D **sin aumentar su geometría**, proyectando una imagen 2D (la textura) sobre sus caras. Es una de las técnicas con mejor relación calidad/costo en gráficos.' },

    { tipo: 'subtitulo', texto: 'Modelos 3D y coordenadas UV' },
    { tipo: 'parrafo', texto: 'Una malla se textura asignando a cada vértice unas **coordenadas de textura $(u,v)$**, con $u,v\\in[0,1]$, que indican **qué punto de la imagen** le corresponde. El proceso de "desplegar" la malla en el plano UV se llama **UV unwrapping**. Durante la rasterización, las UV se **interpolan** por el triángulo para muestrear la textura en cada fragmento.' },
    { tipo: 'formula', latex: '(u,v)\\in[0,1]^2 \\;\\longrightarrow\\; \\text{texel } (\\,u\\cdot W,\\; v\\cdot H\\,)', nota: '$W\\times H$ es la resolución de la textura; un **texel** es un píxel de la textura.' },
    { tipo: 'imagen', src: '/img/expos/mapeo-texturas/uv.webp', alt: 'Coordenadas UV desplegadas', caption: 'Despliegue **UV**: cada vértice de la malla mapea a una posición $(u,v)$ de la imagen.' },

    { tipo: 'subtitulo', texto: 'Métodos de mapeo (proyección)' },
    { tipo: 'lista', items: [
      '**Planar:** proyecta la textura desde un plano; bueno para superficies planas, se estira en los lados.',
      '**Cilíndrico:** envuelve la textura en un cilindro; ideal para botellas, troncos, columnas.',
      '**Esférico:** proyecta desde una esfera; para planetas y objetos redondeados (con distorsión en los polos).',
      '**Cúbico (cube map):** 6 caras; usado para *skyboxes* y mapas de entorno/reflexión.',
    ] },

    { tipo: 'subtitulo', texto: 'Wrapping (repetición fuera de [0,1])' },
    { tipo: 'parrafo', texto: 'Cuando las coordenadas salen de $[0,1]$ se aplica un modo de repetición: **repeat** (mosaico), **clamp** (fija el borde), **mirror** (espejo). Repeat permite teselar una textura pequeña sobre una superficie grande.' },

    { tipo: 'subtitulo', texto: 'Filtrado de texturas' },
    { tipo: 'parrafo', texto: 'Como un píxel de pantalla rara vez coincide con un texel exacto, se **filtra**. Casos: **magnificación** (textura ampliada, un texel cubre varios píxeles) y **minificación** (textura reducida, muchos texels por píxel → aliasing).' },
    { tipo: 'tabla', headers: ['Filtro', 'Cómo', 'Resultado'], filas: [
      ['**Nearest**', 'Toma el texel más cercano', 'Rápido, pixelado (bloques)'],
      ['**Bilineal**', 'Promedia los 4 texels vecinos', 'Suave dentro de un nivel'],
      ['**Trilineal**', 'Bilineal en 2 niveles de mipmap + interpola entre ellos', 'Sin saltos de nivel a distancia'],
      ['**Anisotrópico**', 'Muestrea a lo largo de la dirección de mayor compresión', 'Nitidez en superficies oblicuas (suelos)'],
    ] },
    { tipo: 'parrafo', texto: 'El **filtrado bilineal** interpola los 4 texels que rodean la muestra con pesos según la fracción $(f_u,f_v)$:' },
    { tipo: 'formula', latex: 'c = (1-f_u)(1-f_v)c_{00} + f_u(1-f_v)c_{10} + (1-f_u)f_v\\,c_{01} + f_u f_v\\,c_{11}' },

    { tipo: 'subtitulo', texto: 'Mipmapping' },
    { tipo: 'parrafo', texto: 'Un **mipmap** es una pirámide de versiones prefiltradas de la textura, cada una a la mitad de resolución. Al rasterizar, la GPU elige el **nivel de detalle (LOD)** según cuánto se comprime la textura en pantalla, evitando el aliasing (parpadeo) de superficies lejanas y acelerando el muestreo.' },
    { tipo: 'formula', latex: '\\text{LOD} = \\log_2\\!\\big(\\max(\\lVert \\partial (u,v)/\\partial x\\rVert,\\; \\lVert \\partial (u,v)/\\partial y\\rVert)\\big)', nota: 'El nivel se escoge por la tasa de cambio de las UV entre píxeles adyacentes.' },
    { tipo: 'nota', estilo: 'clave', texto: 'El mipmapping solo añade **1/3 de memoria**: la serie $1+\\tfrac14+\\tfrac1{16}+\\dots=\\tfrac{4}{3}$. A cambio elimina el aliasing y acelera el acceso (mejor localidad de caché).' },
    { tipo: 'imagen', src: '/img/expos/mapeo-texturas/mipmap.webp', alt: 'Pirámide de mipmaps', caption: 'Pirámide de **mipmaps**: cada nivel es la mitad del anterior; la GPU elige el nivel según la distancia.' },

    { tipo: 'subtitulo', texto: 'Tipos de mapas' },
    { tipo: 'lista', items: [
      '**Difuso / albedo:** el color base de la superficie.',
      '**Normal map:** codifica normales en RGB para simular relieve fino sin geometría (afecta la iluminación).',
      '**Bump / height map:** altura en escala de grises; perturba las normales o desplaza.',
      '**Displacement map:** desplaza realmente los vértices (subdivisión/tesselation).',
      '**Specular / roughness / metallic:** controlan el brillo y el material (flujo PBR).',
    ] },
    { tipo: 'nota', estilo: 'info', texto: 'Un **normal map** finge relieve modificando la normal usada en la iluminación (Blinn-Phong), pero la silueta sigue siendo plana; el **displacement** sí cambia la geometría real.' },
  ],

  formulas: [
    { latex: '(u,v)\\in[0,1]^2 \\to (uW,\\,vH)', desc: 'De coordenada UV a **texel** ($W\\times H$).' },
    { latex: 'c=\\sum (1{-}f)(\\cdots)\\,c_{ij}', desc: 'Interpolación **bilineal** de 4 texels.' },
    { latex: '\\text{LOD}=\\log_2(\\text{compresión de UV})', desc: 'Selección de **nivel de mipmap**.' },
    { latex: '1+\\tfrac14+\\tfrac1{16}+\\cdots=\\tfrac{4}{3}', desc: 'Sobrecoste de memoria del **mipmapping** (+33%).' },
  ],

  ejercicios: [
    { titulo: 'De UV a texel', tipo: 'practica', dif: 'media',
      enunciado: 'Una textura es de $256\\times256$. ¿Qué texel corresponde a la coordenada $(u,v)=(0.25,\\,0.5)$?',
      pista: 'Multiplica cada coordenada por la resolución.',
      solucion: '$x=u\\cdot W=0.25\\cdot256=64$; $y=v\\cdot H=0.5\\cdot256=128$. El texel es $(64,128)$. (Con filtrado nearest se toma ese texel; con bilineal se promedian los 4 vecinos.)', },

    { titulo: 'Memoria de mipmaps', tipo: 'practica', dif: 'media',
      enunciado: 'Una textura RGBA de $1024\\times1024$ ocupa 4 MB. ¿Cuánta memoria total ocupa con toda su cadena de mipmaps?',
      pista: 'El total es $4/3$ del nivel base.',
      solucion: 'La serie de niveles suma $1+\\tfrac14+\\tfrac1{16}+\\dots=\\tfrac43$. Total $=4\\text{ MB}\\times\\tfrac43\\approx 5.33$ MB. Es decir, un +33% de memoria a cambio de eliminar aliasing y mejorar rendimiento.', },

    { titulo: 'Interpolación bilineal', tipo: 'practica', dif: 'dificil',
      enunciado: 'En una muestra con fracciones $f_u=0.5,\\,f_v=0.5$, los 4 texels valen $c_{00}=10,\\,c_{10}=20,\\,c_{01}=30,\\,c_{11}=40$. Calcula el color bilineal.',
      pista: 'Con $f_u=f_v=0.5$ todos los pesos son 0.25.',
      solucion: 'Todos los pesos $=0.25$: $c=0.25(10+20+30+40)=0.25\\cdot100=25$. El bilineal con $f=0.5$ es simplemente el promedio de los 4 vecinos.', },

    { titulo: 'Elegir método de proyección', tipo: 'teoria', dif: 'media',
      enunciado: 'Indica qué método de mapeo (planar, cilíndrico, esférico, cúbico) usarías para: (a) el cielo de fondo de un juego, (b) una lata de refresco, (c) un planeta, (d) el suelo de una sala.',
      solucion: '(a) Cielo de fondo → **cúbico (skybox/cube map)**: 6 caras envuelven la escena. (b) Lata → **cilíndrico**: la etiqueta envuelve el cilindro sin estirarse. (c) Planeta → **esférico** (asumiendo la distorsión en polos). (d) Suelo plano → **planar**: proyección directa desde arriba. La clave es minimizar el estiramiento según la forma.', },

    { titulo: 'Por qué mipmaps evitan aliasing', tipo: 'teoria', dif: 'dificil',
      enunciado: 'Explica por qué una textura con líneas finas "hierve"/parpadea a lo lejos sin mipmaps y cómo lo resuelve el trilineal.',
      solucion: 'A distancia, un solo píxel de pantalla cubre **muchos texels** (minificación fuerte). Muestrear un único texel (o bilineal de 4) submuestrea la señal y produce **aliasing temporal**: al mover la cámara, el texel elegido salta y la imagen "hierve". El **mipmap** guarda versiones ya promediadas; elegir el nivel adecuado equivale a promediar el bloque de texels correcto. El **trilineal** interpola además **entre dos niveles** de mipmap, eliminando el salto brusco (banding) al cambiar de nivel con la distancia.', },

    { titulo: 'Normal map vs displacement', tipo: 'teoria', dif: 'media',
      enunciado: 'Un artista quiere ladrillos con relieve. Compara usar un **normal map** frente a un **displacement map** en costo y resultado (silueta).',
      solucion: '**Normal map:** modifica solo la normal usada en la iluminación → el relieve se "ve" por sombreado pero la **silueta sigue plana** y no proyecta sombras propias; costo casi nulo (una textura). **Displacement map:** desplaza los vértices reales (requiere teselado/subdivisión) → relieve verdadero con **silueta irregular** y auto-sombras, pero mucho más caro en geometría. Solución habitual: normal map para el detalle fino + displacement solo donde la silueta importa.', },
  ],

  preguntas: [
    { q: 'Las coordenadas UV sirven para:', opciones: ['Definir la iluminación', 'Indicar qué punto de la textura corresponde a cada vértice', 'Ordenar triángulos', 'Comprimir la malla'], correcta: 1, exp: 'Cada vértice tiene $(u,v)\\in[0,1]$ que mapea a la imagen; se interpolan por el triángulo.', dif: 'media' },
    { q: 'Un **texel** es:', opciones: ['Un vértice', 'Un píxel de la textura', 'Una cara', 'Una normal'], correcta: 1, exp: 'Texel = texture element, el píxel de la imagen de textura.', dif: 'media' },
    { q: 'El modo de wrapping **repeat** se usa para:', opciones: ['Fijar el borde', 'Teselar (mosaico) una textura sobre una superficie grande', 'Reflejar', 'Borrar la textura'], correcta: 1, exp: 'Repeat repite la textura fuera de $[0,1]$, útil para superficies grandes con textura pequeña.', dif: 'media' },
    { q: 'El filtrado **nearest** produce:', opciones: ['Imagen suave', 'Bloques pixelados (toma el texel más cercano)', 'Sin aliasing', 'Mayor costo que bilineal'], correcta: 1, exp: 'Elige el texel más cercano: rápido pero con aspecto pixelado al ampliar.', dif: 'media' },
    { q: 'El filtrado **bilineal** promedia:', opciones: ['2 texels', 'Los 4 texels vecinos', '8 texels de dos niveles', 'Toda la textura'], correcta: 1, exp: 'Interpola los 4 texels que rodean la muestra según las fracciones $(f_u,f_v)$.', dif: 'media' },
    { q: 'El filtrado **trilineal** añade sobre el bilineal:', opciones: ['Más colores', 'Interpolación entre dos niveles de mipmap', 'Reflexiones', 'Sombras'], correcta: 1, exp: 'Hace bilineal en dos niveles de mipmap e interpola entre ellos: sin saltos de nivel con la distancia.', dif: 'dificil' },
    { q: 'Un **mipmap** es:', opciones: ['Una textura animada', 'Una pirámide de versiones prefiltradas a media resolución', 'Un tipo de sombra', 'Un shader'], correcta: 1, exp: 'Cadena de texturas cada una a la mitad de tamaño; la GPU elige el nivel según el LOD.', dif: 'media' },
    { q: 'El mipmapping incrementa la memoria en aproximadamente:', opciones: ['0%', '33% (factor 4/3)', '100%', '300%'], correcta: 1, exp: 'La serie $1+1/4+1/16+\\dots=4/3$: solo +33% de memoria.', dif: 'dificil' },
    { q: 'El filtrado **anisotrópico** mejora la nitidez en:', opciones: ['Superficies frontales', 'Superficies vistas de forma oblicua (suelos lejanos)', 'El cielo', 'Objetos transparentes'], correcta: 1, exp: 'Muestrea a lo largo de la dirección de mayor compresión, recuperando detalle en ángulos rasantes.', dif: 'media' },
    { q: 'Un **normal map**:', opciones: ['Desplaza los vértices reales', 'Codifica normales en RGB para simular relieve en la iluminación', 'Cambia el color base', 'Añade sombras'], correcta: 1, exp: 'Modifica la normal usada al iluminar; simula relieve fino sin geometría (silueta sigue plana).', dif: 'dificil' },
    { q: 'La diferencia clave entre bump/normal map y **displacement** es que el displacement:', opciones: ['Es más barato', 'Desplaza realmente la geometría (cambia la silueta)', 'Solo cambia el color', 'No usa textura'], correcta: 1, exp: 'El displacement mueve vértices reales (requiere teselado); bump/normal solo alteran las normales.', dif: 'media' },
    { q: 'El nivel de mipmap (LOD) se elige según:', opciones: ['El color del texel', 'La tasa de cambio de las UV entre píxeles (compresión)', 'La hora del día', 'El número de vértices'], correcta: 1, exp: 'La GPU calcula el LOD por las derivadas de las coordenadas de textura entre fragmentos adyacentes.', dif: 'dificil' },
  ],
};

export default tema;
