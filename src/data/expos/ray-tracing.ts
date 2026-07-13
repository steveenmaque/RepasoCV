import type { Tema } from '../../lib/types';

const tema: Tema = {
  slug: 'ray-tracing',
  seccion: 'exposiciones',
  titulo: 'Ray Tracing',
  subtitulo:
    'Trazado de rayos desde la cámara: intersección rayo-objeto, reflexión y refracción (Snell), Whitted vs Path Tracing, muestreo de Monte Carlo, estructuras de aceleración (BVH) y aceleración por hardware (RT cores).',
  resumen:
    'Simula el transporte de luz siguiendo rayos por píxel. Incluye la matemática de intersección, la BRDF, el estimador de Monte Carlo y las estructuras (BVH) que lo hacen viable.',
  tags: ['Rayos', 'BVH', 'Monte Carlo', 'Snell', 'Path tracing', 'RT cores'],
  color: '#2563eb',

  teoria: [
    { tipo: 'parrafo', texto: 'El **ray tracing** genera imágenes siguiendo el camino de la luz mediante **rayos**. En lugar de proyectar triángulos (rasterización), lanza un rayo por píxel desde la cámara, calcula qué objeto golpea y cómo interactúa la luz allí (sombra, reflexión, refracción). Produce sombras, reflejos y refracciones **físicamente correctos**.' },

    { tipo: 'subtitulo', texto: 'El rayo y su parametrización' },
    { tipo: 'parrafo', texto: 'Un rayo se describe con un **origen** $\\mathbf{o}$ y una **dirección** $\\mathbf{d}$ (unitaria); sus puntos son:' },
    { tipo: 'formula', latex: '\\mathbf{r}(t)=\\mathbf{o}+t\\,\\mathbf{d}, \\qquad t>0', nota: '$t$ es la distancia a lo largo del rayo; el primer impacto es el menor $t>0$.' },

    { tipo: 'subtitulo', texto: 'Intersección rayo-esfera' },
    { tipo: 'parrafo', texto: 'Sustituyendo el rayo en la ecuación de la esfera $\\lVert \\mathbf{p}-\\mathbf{c}\\rVert^2=R^2$ se obtiene una **ecuación cuadrática** en $t$:' },
    { tipo: 'formula', latex: 't^2(\\mathbf d\\cdot\\mathbf d) + 2t\\,\\mathbf d\\cdot(\\mathbf o-\\mathbf c) + \\lVert\\mathbf o-\\mathbf c\\rVert^2 - R^2 = 0' },
    { tipo: 'parrafo', texto: 'El **discriminante** decide la visibilidad: si es negativo el rayo no toca la esfera; si es ≥ 0, la raíz menor positiva es el punto de impacto.' },
    { tipo: 'formula', latex: '\\Delta = b^2-4ac \\;\\;\\Rightarrow\\;\\; t=\\dfrac{-b-\\sqrt{\\Delta}}{2a}', nota: 'Con $a=\\mathbf d\\cdot\\mathbf d$, $b=2\\mathbf d\\cdot(\\mathbf o-\\mathbf c)$, $c=\\lVert\\mathbf o-\\mathbf c\\rVert^2-R^2$.' },

    { tipo: 'subtitulo', texto: 'Rayos secundarios: reflexión y refracción' },
    { tipo: 'parrafo', texto: 'Al impactar, se generan rayos secundarios: **sombra** (hacia la luz), **reflexión** (espejo) y **refracción** (transmisión). La refracción sigue la **ley de Snell**:' },
    { tipo: 'formula', latex: 'n_1\\sin\\theta_1 = n_2\\sin\\theta_2', nota: 'Ley de **Snell**: $n$ son los índices de refracción de los medios.' },
    { tipo: 'formula', latex: '\\mathbf{r}=\\mathbf{d}-2(\\mathbf{d}\\cdot\\mathbf{n})\\,\\mathbf{n}', nota: 'Dirección del rayo **reflejado** respecto a la normal $\\mathbf n$.' },

    { tipo: 'subtitulo', texto: 'Whitted vs Path Tracing' },
    { tipo: 'tabla', headers: ['Aspecto', 'Whitted (clásico)', 'Path Tracing'], filas: [
      ['Rayos secundarios', 'Solo especular (reflexión/refracción) + sombra', 'Direcciones aleatorias según la BRDF'],
      ['Iluminación difusa indirecta', 'No', 'Sí'],
      ['Base', 'Recursión determinista', 'Monte Carlo (estocástico)'],
      ['Resultado', 'Reflejos/refracciones nítidos', 'GI completa, con ruido'],
    ] },
    { tipo: 'parrafo', texto: 'El **path tracing** estima la ecuación de renderizado con **Monte Carlo**: promedia muchas trayectorias aleatorias por píxel.' },
    { tipo: 'formula', latex: 'L(\\mathbf x)\\approx \\dfrac{1}{N}\\sum_{i=1}^{N} \\dfrac{f_r(\\mathbf x,\\omega_i)\\,L_i(\\mathbf x,\\omega_i)\\,\\cos\\theta_i}{p(\\omega_i)}', nota: 'Estimador insesgado; el ruido decrece como $1/\\sqrt{N}$ con $N$ muestras.' },
    { tipo: 'imagen', src: '/img/expos/ray-tracing/rayos.webp', alt: 'Trazado de rayos desde la cámara', caption: 'Rayos primarios desde la cámara y rayos secundarios de sombra/reflexión/refracción.' },

    { tipo: 'subtitulo', texto: 'El problema de la fuerza bruta' },
    { tipo: 'parrafo', texto: 'Probar cada rayo contra **cada** triángulo es $O(\\text{rayos}\\times\\text{primitivas})$: inviable para escenas reales. La solución son las **estructuras de aceleración espacial**.' },

    { tipo: 'subtitulo', texto: 'Estructuras de aceleración (BVH, kd-tree)' },
    { tipo: 'parrafo', texto: 'Una **BVH** (Bounding Volume Hierarchy) agrupa la geometría en cajas envolventes anidadas; un rayo primero prueba las cajas grandes y solo desciende donde hay intersección, reduciendo el costo a **logarítmico** en promedio. El **kd-tree** particiona el espacio con planos. Son la razón por la que el ray tracing es viable.' },
    { tipo: 'formula', latex: 'O(\\text{primitivas}) \\;\\to\\; O(\\log \\text{primitivas})', nota: 'La BVH transforma la búsqueda lineal en logarítmica (en promedio).' },

    { tipo: 'subtitulo', texto: 'Aceleración por hardware y aplicaciones' },
    { tipo: 'lista', items: [
      '**RT cores** (NVIDIA RTX) aceleran el recorrido de la BVH y las intersecciones rayo-triángulo.',
      '**Denoising por IA** permite pocas muestras por píxel en tiempo real.',
      '**Cine/VFX:** render offline de máxima calidad (Arnold, RenderMan, Cycles).',
      '**Videojuegos:** ray tracing híbrido (reflejos, sombras, GI) sobre rasterización.',
    ] },
  ],

  formulas: [
    { latex: '\\mathbf r(t)=\\mathbf o+t\\mathbf d', desc: 'Parametrización de un **rayo**.' },
    { latex: 't^2(\\mathbf d\\cdot\\mathbf d)+2t\\,\\mathbf d\\cdot(\\mathbf o-\\mathbf c)+\\lVert\\mathbf o-\\mathbf c\\rVert^2-R^2=0', desc: 'Intersección **rayo-esfera** (cuadrática).' },
    { latex: '\\mathbf r=\\mathbf d-2(\\mathbf d\\cdot\\mathbf n)\\mathbf n', desc: 'Rayo **reflejado**.' },
    { latex: 'n_1\\sin\\theta_1=n_2\\sin\\theta_2', desc: 'Ley de **Snell** (refracción).' },
    { latex: 'L\\approx\\tfrac1N\\sum_i \\tfrac{f_r L_i\\cos\\theta_i}{p(\\omega_i)}', desc: 'Estimador **Monte Carlo** (path tracing).' },
    { latex: 'O(n)\\to O(\\log n)', desc: 'Aceleración con **BVH/kd-tree**.' },
  ],

  ejercicios: [
    { titulo: 'Intersección rayo-esfera', tipo: 'practica', dif: 'dificil',
      enunciado: 'Un rayo con origen $\\mathbf o=(0,0,0)$ y dirección $\\mathbf d=(0,0,-1)$ se lanza hacia una esfera de centro $\\mathbf c=(0,0,-5)$ y radio $R=1$. ¿A qué distancia $t$ ocurre el primer impacto?',
      pista: 'Plantea la cuadrática con $a=\\mathbf d\\cdot\\mathbf d$, etc., y toma la raíz menor.',
      solucion: '$\\mathbf o-\\mathbf c=(0,0,5)$. $a=\\mathbf d\\cdot\\mathbf d=1$. $b=2\\,\\mathbf d\\cdot(\\mathbf o-\\mathbf c)=2(0+0+(-1)(5))=-10$. $c=\\lVert(0,0,5)\\rVert^2-1=25-1=24$.\n$\\Delta=b^2-4ac=100-96=4$. $t=\\dfrac{-(-10)-\\sqrt4}{2}=\\dfrac{10-2}{2}=4$.\nEl primer impacto está a $t=4$ (punto $(0,0,-4)$, la cara frontal de la esfera). ✓', },

    { titulo: 'Rayo reflejado', tipo: 'practica', dif: 'media',
      enunciado: 'Un rayo con dirección $\\mathbf d=(1,-1,0)/\\sqrt2$ golpea una superficie horizontal de normal $\\mathbf n=(0,1,0)$. Calcula la dirección reflejada.',
      pista: '$\\mathbf r=\\mathbf d-2(\\mathbf d\\cdot\\mathbf n)\\mathbf n$.',
      solucion: '$\\mathbf d\\cdot\\mathbf n=-1/\\sqrt2$. $\\mathbf r=\\tfrac1{\\sqrt2}(1,-1,0)-2(-\\tfrac1{\\sqrt2})(0,1,0)=\\tfrac1{\\sqrt2}(1,-1,0)+\\tfrac{2}{\\sqrt2}(0,1,0)=\\tfrac1{\\sqrt2}(1,1,0)$.\nEl rayo rebota hacia arriba-derecha, con la componente vertical invertida (como un espejo). ✓', },

    { titulo: 'Discriminante y visibilidad', tipo: 'teoria', dif: 'media',
      enunciado: 'Explica qué información da el signo del discriminante $\\Delta$ en la intersección rayo-esfera.',
      solucion: 'El discriminante $\\Delta=b^2-4ac$ indica cuántas soluciones reales tiene la cuadrática: $\\Delta<0$ ⇒ **no hay intersección** (el rayo pasa de largo); $\\Delta=0$ ⇒ el rayo es **tangente** (un punto); $\\Delta>0$ ⇒ **dos intersecciones** (entrada y salida), y se toma la **menor raíz positiva** como impacto visible. Este test barato de signo permite descartar rápidamente esferas que el rayo no toca.', },

    { titulo: 'Costo con y sin BVH', tipo: 'practica', dif: 'dificil',
      enunciado: 'Una escena tiene 1 000 000 de triángulos y se lanzan 2 000 000 de rayos primarios. Compara el número de tests de intersección por fuerza bruta frente al orden esperado con una BVH.',
      pista: 'Fuerza bruta: rayos × primitivas; BVH: rayos × log(primitivas).',
      solucion: 'Fuerza bruta: $2\\times10^6 \\times 10^6 = 2\\times10^{12}$ tests → inviable. Con **BVH**, cada rayo hace del orden de $\\log_2(10^6)\\approx20$ descensos: $2\\times10^6\\times20 = 4\\times10^7$ tests → **~50 000× menos**. Esta es la razón por la que el ray tracing solo es práctico con estructuras de aceleración.', },

    { titulo: 'Whitted vs Path Tracing', tipo: 'teoria', dif: 'media',
      enunciado: '¿Por qué el ray tracing de Whitted da una imagen "limpia" pero poco realista en interiores difusos, mientras el path tracing da realismo con ruido?',
      solucion: 'Whitted solo lanza rayos en direcciones **deterministas** (reflexión/refracción especular ideal) y sombras a luces puntuales: no integra la luz difusa indirecta, por eso las escenas quedan planas pero **sin ruido**. El **path tracing** muestrea direcciones **aleatorias** según la BRDF para estimar la integral completa (Monte Carlo), capturando GI difusa realista; el precio es el **ruido** que decrece como $1/\\sqrt N$ y exige muchas muestras o denoising.', },

    { titulo: 'Convergencia y denoising', tipo: 'practica', dif: 'media',
      enunciado: 'Con 16 muestras por píxel el ruido es aceptable en una demo, pero en tiempo real solo hay presupuesto para 1 muestra. ¿Qué estrategia usan las GPU RTX para lograr calidad con ~1 spp?',
      solucion: 'Con 1 muestra por píxel el estimador Monte Carlo es muy ruidoso ($1/\\sqrt1$). Las GPU RTX combinan: (1) **RT cores** que aceleran el recorrido de la BVH para poder trazar en tiempo real; (2) **denoisers basados en IA** (p. ej. redes que usan información temporal y espacial, guías de normales/albedo) que reconstruyen una imagen limpia a partir de la entrada ruidosa; y (3) **acumulación temporal** entre fotogramas. Así se aparenta el resultado de muchas muestras con muy pocas reales.', },
  ],

  preguntas: [
    { q: 'Un rayo se parametriza como:', opciones: ['$\\mathbf o\\cdot t$', '$\\mathbf r(t)=\\mathbf o+t\\mathbf d$', '$\\mathbf d/t$', '$\\mathbf o\\times\\mathbf d$'], correcta: 1, exp: 'Origen más dirección escalada por la distancia $t$.', dif: 'media' },
    { q: 'La intersección rayo-esfera lleva a resolver:', opciones: ['Una ecuación lineal', 'Una ecuación cuadrática en $t$', 'Una integral', 'Un sistema 3×3'], correcta: 1, exp: 'Sustituir el rayo en la esfera da una cuadrática; sus raíces son los impactos.', dif: 'media' },
    { q: 'Si el discriminante de la intersección es negativo:', opciones: ['El rayo es tangente', 'El rayo no toca la esfera', 'Hay dos impactos', 'La esfera es transparente'], correcta: 1, exp: '$\\Delta<0$ ⇒ sin soluciones reales ⇒ el rayo no interseca.', dif: 'media' },
    { q: 'La ley de **Snell** describe:', opciones: ['La reflexión', 'La refracción entre dos medios', 'La difusión', 'La sombra'], correcta: 1, exp: '$n_1\\sin\\theta_1=n_2\\sin\\theta_2$ relaciona los ángulos con los índices de refracción.', dif: 'media' },
    { q: 'La dirección de un rayo reflejado es:', opciones: ['$\\mathbf d+\\mathbf n$', '$\\mathbf d-2(\\mathbf d\\cdot\\mathbf n)\\mathbf n$', '$-\\mathbf d$', '$\\mathbf n-\\mathbf d$'], correcta: 1, exp: 'Refleja $\\mathbf d$ respecto a la normal $\\mathbf n$.', dif: 'dificil' },
    { q: 'El ray tracing de **Whitted** NO captura:', opciones: ['Reflexiones', 'Refracciones', 'Iluminación difusa indirecta', 'Sombras duras'], correcta: 2, exp: 'Solo sigue direcciones especulares; omite el difuso indirecto (lo resuelve path tracing).', dif: 'dificil' },
    { q: 'El **path tracing** estima la luz mediante:', opciones: ['Rasterización', 'Muestreo de Monte Carlo de trayectorias', 'Elementos finitos', 'Umbralización'], correcta: 1, exp: 'Promedia muchas trayectorias aleatorias por píxel; insesgado pero con ruido.', dif: 'media' },
    { q: 'El ruido del path tracing decrece con $N$ muestras como:', opciones: ['$1/N$', '$1/\\sqrt N$', '$1/N^3$', 'Constante'], correcta: 1, exp: 'Convergencia Monte Carlo $O(1/\\sqrt N)$.', dif: 'dificil' },
    { q: 'Probar cada rayo contra cada triángulo tiene costo:', opciones: ['$O(\\log n)$', '$O(\\text{rayos}\\times\\text{primitivas})$', '$O(1)$', '$O(n!)$'], correcta: 1, exp: 'Fuerza bruta lineal en primitivas por cada rayo: inviable sin aceleración.', dif: 'media' },
    { q: 'Una **BVH** (Bounding Volume Hierarchy) reduce el costo a aproximadamente:', opciones: ['$O(n^2)$', '$O(\\log n)$ en promedio', '$O(n)$', '$O(1)$ siempre'], correcta: 1, exp: 'Las cajas envolventes anidadas permiten descartar geometría rápidamente (≈ logarítmico).', dif: 'media' },
    { q: 'Los **RT cores** de las GPUs aceleran principalmente:', opciones: ['El sonido', 'El recorrido de la BVH y las intersecciones rayo-triángulo', 'La compilación', 'La red'], correcta: 1, exp: 'Hardware dedicado a intersecciones acelera el ray tracing en tiempo real.', dif: 'media' },
    { q: 'Para lograr ray tracing en tiempo real con pocas muestras se usa:', opciones: ['Más resolución', 'Denoising por IA + acumulación temporal', 'Menos triángulos siempre', 'Rasterización pura'], correcta: 1, exp: 'Denoisers de IA reconstruyen imágenes limpias a partir de ~1 muestra ruidosa por píxel.', dif: 'media' },
  ],
};

export default tema;
