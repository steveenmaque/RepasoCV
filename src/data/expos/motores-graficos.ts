import type { Tema } from '../../lib/types';

const tema: Tema = {
  slug: 'motores-graficos',
  seccion: 'exposiciones',
  titulo: 'Motores Gráficos: Tendencias y Aplicaciones',
  subtitulo:
    'Qué es un motor gráfico, su arquitectura y la tubería de renderizado (pipeline). Transformaciones MVP, rasterización vs ray tracing, y el papel de la IA (DLSS, denoising, neural rendering).',
  resumen:
    'El software que orquesta el render en tiempo real: pipeline programable, matrices de transformación, y tendencias como trazado de rayos en hardware e IA para escalado y reconstrucción.',
  tags: ['Pipeline', 'GPU', 'MVP', 'Rasterización', 'DLSS', 'Shaders'],
  color: '#f97316',

  teoria: [
    { tipo: 'parrafo', texto: 'Un **motor gráfico** es el conjunto de software que transforma una escena 3D (mallas, cámaras, luces, materiales) en imágenes en pantalla, normalmente en **tiempo real**. Es el corazón de los motores de videojuego (Unreal, Unity, Godot) y de herramientas de visualización. Analogía: si el motor de juego es un estudio de cine completo, el motor gráfico es el **departamento de fotografía e iluminación**.' },

    { tipo: 'subtitulo', texto: 'Arquitectura de un motor' },
    { tipo: 'parrafo', texto: 'Un motor típico integra subsistemas: **render**, física, audio, entrada, animación, IA, scripting y gestión de escena/recursos. El **motor gráfico** (render) se comunica con la GPU vía una API (**OpenGL, Vulkan, DirectX, Metal**).' },

    { tipo: 'subtitulo', texto: 'La tubería de renderizado (pipeline)' },
    { tipo: 'parrafo', texto: 'El pipeline gráfico convierte vértices en píxeles en etapas encadenadas. Las etapas **programables** (shaders) se intercalan con etapas **fijas**:' },
    { tipo: 'lista', ordenada: true, items: [
      '**Entrada de vértices:** la CPU envía vértices (posición, normal, UV) a la GPU.',
      '**Vertex shader:** transforma cada vértice al espacio de recorte (matrices Modelo-Vista-Proyección).',
      '**Ensamblado y recorte (clipping):** se forman primitivas (triángulos) y se recortan al frustum.',
      '**Rasterización:** cada triángulo se convierte en fragmentos (píxeles candidatos), interpolando atributos.',
      '**Fragment/pixel shader:** calcula el color de cada fragmento (texturas + iluminación).',
      '**Pruebas y mezcla (output merger):** test de profundidad (z-buffer), blending y escritura al framebuffer.',
    ] },
    { tipo: 'imagen', src: '/img/expos/motores-graficos/pipeline.webp', alt: 'Pipeline de renderizado', caption: 'Etapas de la **tubería de renderizado**: de vértices a píxeles.' },

    { tipo: 'subtitulo', texto: 'Transformaciones: la matriz MVP' },
    { tipo: 'parrafo', texto: 'Cada vértice se lleva del espacio del objeto al de la pantalla componiendo tres matrices $4\\times4$ (coordenadas homogéneas): **Modelo** (objeto→mundo), **Vista** (mundo→cámara) y **Proyección** (cámara→recorte).' },
    { tipo: 'formula', latex: '\\mathbf{p}_{clip} = \\mathbf{M}_{proj}\\,\\mathbf{M}_{view}\\,\\mathbf{M}_{model}\\,\\mathbf{p}_{obj}', nota: 'Tras el recorte, la **división perspectiva** por $w$ da las coordenadas normalizadas de dispositivo (NDC).' },
    { tipo: 'formula', latex: '(x_{ndc},y_{ndc},z_{ndc}) = \\left(\\tfrac{x_c}{w_c},\\,\\tfrac{y_c}{w_c},\\,\\tfrac{z_c}{w_c}\\right)', nota: 'La división por $w$ produce el efecto de **perspectiva** (lo lejano se ve más pequeño).' },

    { tipo: 'subtitulo', texto: 'Rasterización vs ray tracing' },
    { tipo: 'parrafo', texto: 'La **rasterización** (proyectar triángulos y rellenarlos) es rapidísima y domina el tiempo real; aproxima sombras, reflejos y GI con trucos (shadow maps, SSAO, probes). El **ray tracing** da efectos físicamente correctos pero es más caro; las GPUs modernas lo aceleran por hardware (**RT cores**) y se usa de forma **híbrida** (rasterizado + reflejos/sombras por rayos).' },

    { tipo: 'subtitulo', texto: 'Rendimiento: frame time y FPS' },
    { tipo: 'formula', latex: '\\text{FPS} = \\dfrac{1}{\\text{frame time}}', nota: 'Un objetivo de 60 FPS equivale a un presupuesto de $\\approx 16.6$ ms por fotograma.' },
    { tipo: 'nota', estilo: 'aviso', texto: 'El motor debe repartir esos ~16 ms entre CPU (lógica, física, draw calls) y GPU (render). Reducir **draw calls** (batching, instancing) es clave para no saturar la CPU.' },

    { tipo: 'subtitulo', texto: 'Tendencias: IA en los motores' },
    { tipo: 'lista', items: [
      '**Super-resolución (DLSS, FSR, XeSS):** renderizar a baja resolución y **escalar con IA**, ganando FPS.',
      '**Denoising por IA:** limpiar el ruido del ray tracing con pocas muestras.',
      '**Frame generation:** interpolar fotogramas intermedios con IA.',
      '**Neural rendering / Gaussian Splatting:** representar escenas con redes o nubes de gaussianas.',
      '**Nanite/virtualized geometry y Lumen (GI dinámica):** geometría y GI a escala en Unreal 5.',
    ] },

    { tipo: 'subtitulo', texto: 'Aplicaciones' },
    { tipo: 'lista', items: [
      'Videojuegos AAA e indie (Unreal, Unity, Godot).',
      'Cine y **producción virtual** (LED walls, escenarios en tiempo real).',
      'Simuladores, gemelos digitales, arquitectura y CAD interactivo.',
      'Metaverso, VR/AR y visualización científica.',
    ] },
  ],

  formulas: [
    { latex: '\\mathbf{p}_{clip}=\\mathbf M_{proj}\\mathbf M_{view}\\mathbf M_{model}\\,\\mathbf p_{obj}', desc: 'Transformación **MVP** de un vértice.' },
    { latex: '\\mathbf p_{ndc}=\\mathbf p_{clip}/w_c', desc: '**División perspectiva** (a coordenadas NDC).' },
    { latex: '\\text{FPS}=1/\\text{frame time}', desc: 'Fotogramas por segundo; 60 FPS ≈ 16.6 ms.' },
    { latex: '16.6\\text{ ms} = 1000/60', desc: 'Presupuesto por fotograma a 60 FPS.' },
  ],

  ejercicios: [
    { titulo: 'Presupuesto de fotograma', tipo: 'practica', dif: 'media',
      enunciado: 'Un juego apunta a 144 FPS. ¿Cuántos milisegundos tiene el motor por fotograma? Si la GPU tarda 5 ms, ¿cuánto le queda a la CPU para no perder ese objetivo?',
      pista: 'Frame time = 1000/FPS ms.',
      solucion: 'Frame time $=1000/144\\approx 6.94$ ms. Si la GPU usa 5 ms, a la CPU le quedan $\\approx 1.94$ ms para lógica, física y draw calls (asumiendo que CPU y GPU no se solapan perfectamente). Márgenes tan ajustados obligan a optimizar mucho (batching, culling).', },

    { titulo: 'Orden de las matrices MVP', tipo: 'teoria', dif: 'media',
      enunciado: '¿Por qué el orden $\\mathbf M_{proj}\\mathbf M_{view}\\mathbf M_{model}$ importa y qué representa cada matriz?',
      solucion: 'Las matrices se aplican **de derecha a izquierda** al vértice: primero **Modelo** (coloca el objeto en el mundo), luego **Vista** (lleva el mundo al sistema de la cámara), y por último **Proyección** (mapea al volumen de recorte). Como la multiplicación de matrices **no es conmutativa**, invertir el orden daría transformaciones sin sentido (p. ej. proyectar antes de posicionar). Por eso siempre es MVP en ese orden.', },

    { titulo: 'División perspectiva', tipo: 'practica', dif: 'dificil',
      enunciado: 'Un vértice en espacio de recorte es $(x_c,y_c,z_c,w_c)=(4,2,3,2)$. Calcula sus coordenadas NDC y explica el efecto de $w$.',
      pista: 'Divide $x_c,y_c,z_c$ entre $w_c$.',
      solucion: 'NDC $=(4/2,\\,2/2,\\,3/2)=(2,1,1.5)$. En perspectiva, $w_c$ crece con la profundidad, así que dividir por $w$ **encoge** los objetos lejanos (efecto perspectiva). Los puntos con NDC fuera de $[-1,1]$ se recortan (quedan fuera de pantalla); aquí $x_{ndc}=2>1$, luego este vértice cae fuera del frustum horizontal.', },

    { titulo: 'Rasterización vs ray tracing', tipo: 'teoria', dif: 'media',
      enunciado: 'Da dos razones por las que los motores siguen usando rasterización como base pese al auge del ray tracing por hardware.',
      solucion: '(1) **Velocidad**: la rasterización es un orden de magnitud más barata para la visibilidad directa, lo que permite altas resoluciones y FPS. (2) **Madurez y compatibilidad**: décadas de optimización (z-buffer, culling, LOD) y funciona en hardware modesto. Por eso el estándar es **híbrido**: rasterizar la imagen base y usar rayos solo para efectos concretos (reflejos, sombras, GI), acelerados por RT cores y limpiados con denoisers de IA.', },

    { titulo: 'Draw calls e instancing', tipo: 'practica', dif: 'dificil',
      enunciado: 'Una escena dibuja 10 000 árboles idénticos, cada uno con una draw call, y la CPU se satura. Explica cómo el **instancing** resuelve el cuello de botella.',
      solucion: 'Cada draw call tiene un coste fijo de CPU (validación, cambio de estado). 10 000 llamadas saturan la CPU aunque la GPU pueda con la geometría. El **instancing** envía **una sola** draw call con la malla del árbol más un buffer de 10 000 transformaciones (posición/rotación/escala); la GPU replica la malla internamente. Se pasa de 10 000 a ~1 draw call, moviendo el trabajo de la CPU a la GPU y eliminando el cuello de botella.', },

    { titulo: 'DLSS y super-resolución', tipo: 'teoria', dif: 'media',
      enunciado: 'Explica cómo técnicas tipo DLSS ganan rendimiento y qué compromiso introducen.',
      solucion: 'Renderizan la escena a una **resolución interna menor** (p. ej. 1080p) y usan una **red neuronal** entrenada para reconstruir la imagen a la resolución de salida (p. ej. 4K), aprovechando información temporal (vectores de movimiento, fotogramas previos). Ganan FPS porque el pipeline pesado corre a menos píxeles. Compromiso: puede introducir **artefactos** (ghosting, pérdida de detalle fino, retardo) y depende de buenos datos temporales; es un canje calidad-perceptual por rendimiento.', },
  ],

  preguntas: [
    { q: 'Un motor gráfico se encarga de:', opciones: ['Solo reproducir audio', 'Transformar una escena 3D en imágenes, normalmente en tiempo real', 'Compilar el juego', 'Guardar partidas'], correcta: 1, exp: 'Es el subsistema de render; orquesta el pipeline hacia la GPU.', dif: 'media' },
    { q: '¿Cuál NO es una API gráfica típica?', opciones: ['Vulkan', 'DirectX', 'OpenGL', 'HTTP'], correcta: 3, exp: 'HTTP es un protocolo web; Vulkan, DirectX, OpenGL (y Metal) son APIs gráficas.', dif: 'media' },
    { q: 'El **vertex shader** se encarga de:', opciones: ['Colorear píxeles', 'Transformar vértices (MVP) al espacio de recorte', 'Ordenar texturas', 'Reproducir sonido'], correcta: 1, exp: 'Aplica las matrices Modelo-Vista-Proyección a cada vértice.', dif: 'media' },
    { q: 'La **rasterización** convierte:', opciones: ['Píxeles en vértices', 'Triángulos en fragmentos (píxeles candidatos)', 'Texturas en mallas', 'Sonido en luz'], correcta: 1, exp: 'Discretiza cada primitiva en fragmentos interpolando sus atributos.', dif: 'media' },
    { q: 'El **fragment shader** calcula:', opciones: ['La posición de los vértices', 'El color de cada fragmento (texturas + iluminación)', 'El orden de dibujo', 'La física'], correcta: 1, exp: 'Determina el color final por fragmento, incluyendo muestreo de texturas e iluminación.', dif: 'media' },
    { q: 'La transformación de un vértice a pantalla se compone como:', opciones: ['$\\mathbf M_{model}\\mathbf M_{view}\\mathbf M_{proj}$', '$\\mathbf M_{proj}\\mathbf M_{view}\\mathbf M_{model}\\,\\mathbf p$', '$\\mathbf p\\,\\mathbf M_{proj}$', 'Solo la matriz de proyección'], correcta: 1, exp: 'MVP: se aplica Modelo, luego Vista, luego Proyección (derecha a izquierda sobre el vértice).', dif: 'dificil' },
    { q: 'La **división perspectiva** consiste en:', opciones: ['Multiplicar por la normal', 'Dividir las coordenadas de recorte por $w$', 'Sumar las matrices', 'Interpolar colores'], correcta: 1, exp: 'Dividir $(x_c,y_c,z_c)$ entre $w_c$ da las NDC y produce la perspectiva.', dif: 'dificil' },
    { q: 'La prueba de profundidad (**z-buffer**) sirve para:', opciones: ['Aplicar texturas', 'Determinar qué fragmento está delante (visibilidad)', 'Iluminar', 'Comprimir'], correcta: 1, exp: 'Compara profundidades y conserva el fragmento más cercano a la cámara.', dif: 'media' },
    { q: '60 FPS equivalen a un presupuesto por fotograma de aproximadamente:', opciones: ['60 ms', '16.6 ms', '1 s', '1 ms'], correcta: 1, exp: '$1000/60\\approx16.6$ ms por fotograma.', dif: 'media' },
    { q: 'Los **RT cores** de las GPUs modernas aceleran:', opciones: ['La compresión de audio', 'El trazado de rayos por hardware', 'La rasterización clásica', 'La red'], correcta: 1, exp: 'Aceleran las intersecciones rayo-geometría (BVH) para ray tracing en tiempo real.', dif: 'media' },
    { q: 'Técnicas como **DLSS/FSR** mejoran el rendimiento mediante:', opciones: ['Renderizar a menor resolución y escalar con IA', 'Bajar la calidad de audio', 'Eliminar texturas', 'Reducir la lógica del juego'], correcta: 0, exp: 'Renderizan interno a baja resolución y reconstruyen con IA a la resolución de salida.', dif: 'media' },
    { q: 'Reducir **draw calls** (batching/instancing) alivia sobre todo a:', opciones: ['La GPU', 'La CPU', 'La memoria de textura', 'El disco'], correcta: 1, exp: 'Cada draw call tiene coste de CPU; agruparlas evita saturar la CPU.', dif: 'dificil' },
    { q: 'El renderizado moderno de alta gama suele ser **híbrido**, es decir:', opciones: ['Solo ray tracing', 'Rasterización de base + rayos para efectos concretos', 'Solo rasterización', 'Sin GPU'], correcta: 1, exp: 'Se rasteriza la imagen y se usan rayos para reflejos/sombras/GI, con denoising por IA.', dif: 'media' },
  ],
};

export default tema;
