import type { Tema } from '../../lib/types';

const tema: Tema = {
  slug: 'iluminacion-local',
  seccion: 'exposiciones',
  titulo: 'Modelos de Iluminación Local',
  subtitulo:
    'Interacción luz-materia, BRDF, modelo de Phong (ambiental, difusa, especular), optimización de Blinn-Phong con el vector medio y algoritmos de sombreado (Flat, Gouraud, Phong).',
  resumen:
    'Iluminación directa fuente→superficie→ojo, sin rebotes indirectos. Componentes de Phong/Blinn-Phong y las tres técnicas de interpolación de sombreado, con su implementación en shaders.',
  tags: ['Phong', 'Blinn-Phong', 'BRDF', 'Gouraud', 'Shading', 'Especular'],
  color: '#818cf8',

  teoria: [
    { tipo: 'parrafo', texto: 'La **iluminación local** calcula el color de un punto considerando **solo la luz directa** de las fuentes (más un término ambiental que aproxima el resto), sin trazar los rebotes indirectos entre objetos. Es barata y determinista, por eso domina el render **en tiempo real** (videojuegos, motores).' },

    { tipo: 'subtitulo', texto: 'Interacción de la luz con los objetos' },
    { tipo: 'parrafo', texto: 'Al incidir sobre una superficie, la luz se **refleja** (especular/difusa), se **refracta** (transmite) y se **absorbe** (se convierte en calor / color). La energía se conserva: $\\text{reflejada}+\\text{refractada}+\\text{absorbida}=\\text{incidente}$.' },

    { tipo: 'subtitulo', texto: 'BRDF y compromiso computacional' },
    { tipo: 'parrafo', texto: 'La **BRDF** (Bidirectional Reflectance Distribution Function) $f_r(\\omega_i,\\omega_o)$ describe qué fracción de la luz que llega desde $\\omega_i$ se refleja hacia $\\omega_o$. Los modelos locales usan **BRDFs empíricas** simples (Phong) en lugar de físicas exactas: sacrifican realismo por velocidad.' },
    { tipo: 'formula', latex: 'f_r(\\mathbf{x},\\omega_i,\\omega_o)=\\dfrac{dL_o(\\omega_o)}{L_i(\\omega_i)\\,(\\omega_i\\cdot n)\\,d\\omega_i}', nota: 'Relación entre radiancia saliente e irradiancia entrante.' },

    { tipo: 'subtitulo', texto: 'Suposiciones del modelo local' },
    { tipo: 'lista', items: [
      'Solo se considera la **luz directa** de las fuentes + un término **ambiental** constante.',
      'No hay interreflexión ni sombras arrojadas por otros objetos (salvo técnicas extra como shadow maps).',
      'Las fuentes suelen ser **puntuales** o direccionales.',
    ] },

    { tipo: 'subtitulo', texto: 'Modelo de Phong (1975)' },
    { tipo: 'parrafo', texto: 'Suma tres componentes: **ambiental** (luz de fondo uniforme), **difusa** (Lambert, depende de $\\mathbf{N}\\cdot\\mathbf{L}$) y **especular** (brillo, depende de $\\mathbf{R}\\cdot\\mathbf{V}$ elevado a un exponente de brillo $\\alpha$):' },
    { tipo: 'formula', latex: 'I = k_a I_a + k_d\\,(\\mathbf{N}\\cdot\\mathbf{L})\\,I_d + k_s\\,(\\mathbf{R}\\cdot\\mathbf{V})^{\\alpha}\\,I_s', nota: '$\\mathbf N$ normal, $\\mathbf L$ dir. a la luz, $\\mathbf V$ dir. al ojo, $\\mathbf R$ reflejo de $\\mathbf L$, $\\alpha$ shininess.' },
    { tipo: 'parrafo', texto: 'El vector de reflexión se calcula como:' },
    { tipo: 'formula', latex: '\\mathbf{R} = 2(\\mathbf{N}\\cdot\\mathbf{L})\\,\\mathbf{N} - \\mathbf{L}' },
    { tipo: 'imagen', src: '/img/expos/iluminacion-local/phong-componentes.webp', alt: 'Componentes ambiental, difusa y especular de Phong', caption: 'Descomposición de Phong: **ambiental + difusa + especular** = resultado final.' },
    { tipo: 'nota', estilo: 'clave', texto: 'La componente difusa es **independiente del observador** (Lambert); la especular **sí** depende de dónde esté el ojo (por eso el brillo se mueve al girar la cámara).' },

    { tipo: 'subtitulo', texto: 'Blinn-Phong: el vector medio' },
    { tipo: 'parrafo', texto: '**Blinn-Phong** optimiza el término especular sustituyendo $\\mathbf{R}\\cdot\\mathbf{V}$ por $\\mathbf{N}\\cdot\\mathbf{H}$, donde $\\mathbf{H}$ es el **vector medio (halfway)** entre luz y observador. Evita recalcular $\\mathbf{R}$ y es más estable; es el estándar en OpenGL fijo y en muchos motores.' },
    { tipo: 'formula', latex: '\\mathbf{H}=\\dfrac{\\mathbf{L}+\\mathbf{V}}{\\lVert\\mathbf{L}+\\mathbf{V}\\rVert}, \\qquad I_{spec}=k_s\\,(\\mathbf{N}\\cdot\\mathbf{H})^{\\alpha_b}\\,I_s', nota: 'El exponente $\\alpha_b$ de Blinn-Phong suele ser mayor ($\\approx 4\\alpha$) para un brillo similar.' },

    { tipo: 'subtitulo', texto: 'Algoritmos de sombreado (interpolación)' },
    { tipo: 'parrafo', texto: 'Dónde y cómo se evalúa el modelo de iluminación sobre una malla define el algoritmo de sombreado:' },
    { tipo: 'tabla', headers: ['Técnica', 'Se calcula', 'Se interpola', 'Calidad / costo'], filas: [
      ['**Flat**', 'Un color por cara', 'Nada (cara plana)', 'Facetas visibles; muy barato'],
      ['**Gouraud**', 'Color por vértice', 'El color por el triángulo', 'Suave, pero pierde brillos especulares dentro de la cara'],
      ['**Phong**', 'Normal por vértice', 'La **normal** por píxel, se ilumina por píxel', 'Brillos correctos; más caro'],
    ] },
    { tipo: 'nota', estilo: 'aviso', texto: 'Ojo con la terminología: el **modelo de Phong** (BRDF) es distinto del **sombreado de Phong** (interpolar normales por píxel). Se pueden combinar o no.' },

    { tipo: 'subtitulo', texto: 'Implementación en shaders (OpenGL)' },
    { tipo: 'parrafo', texto: 'En el pipeline programable: el **vertex shader** transforma vértices y pasa normales y vectores $\\mathbf{L},\\mathbf{V}$; el **fragment shader** interpola la normal y evalúa Blinn-Phong por fragmento. El sombreado de Phong = iluminación en el fragment shader.' },
    { tipo: 'codigo', lang: 'glsl', code: `// Fragment shader — Blinn-Phong (esquema)
vec3 N = normalize(fragNormal);
vec3 L = normalize(lightPos - fragPos);
vec3 V = normalize(viewPos  - fragPos);
vec3 H = normalize(L + V);              // vector medio
float diff = max(dot(N, L), 0.0);
float spec = pow(max(dot(N, H), 0.0), shininess);
vec3 color = ka*ambient + kd*diff*diffuse + ks*spec*specular;` },
  ],

  formulas: [
    { latex: 'I=k_aI_a+k_d(\\mathbf N\\cdot\\mathbf L)I_d+k_s(\\mathbf R\\cdot\\mathbf V)^{\\alpha}I_s', desc: 'Modelo de **Phong** (ambiental+difusa+especular).' },
    { latex: '\\mathbf R=2(\\mathbf N\\cdot\\mathbf L)\\mathbf N-\\mathbf L', desc: 'Vector de **reflexión** de la luz.' },
    { latex: '\\mathbf H=\\dfrac{\\mathbf L+\\mathbf V}{\\lVert\\mathbf L+\\mathbf V\\rVert}', desc: 'Vector **medio** (Blinn-Phong).' },
    { latex: 'I_{spec}=k_s(\\mathbf N\\cdot\\mathbf H)^{\\alpha}I_s', desc: 'Especular de **Blinn-Phong**.' },
    { latex: 'I_{diff}=k_d\\max(\\mathbf N\\cdot\\mathbf L,0)I_d', desc: 'Difusa de **Lambert** (independiente del ojo).' },
  ],

  ejercicios: [
    { titulo: 'Difusa de Lambert', tipo: 'practica', dif: 'media',
      enunciado: 'Una superficie tiene normal $\\mathbf N=(0,1,0)$ y la luz viene de dirección $\\mathbf L=(0,1,1)$ (sin normalizar). Calcula el término difuso $\\mathbf N\\cdot\\hat{\\mathbf L}$.',
      pista: 'Normaliza $\\mathbf L$ antes del producto punto.',
      solucion: '$\\lVert\\mathbf L\\rVert=\\sqrt{0+1+1}=\\sqrt2$, así $\\hat{\\mathbf L}=(0,1/\\sqrt2,1/\\sqrt2)$.\n$\\mathbf N\\cdot\\hat{\\mathbf L}=0\\cdot0+1\\cdot\\tfrac1{\\sqrt2}+0\\cdot\\tfrac1{\\sqrt2}=\\tfrac1{\\sqrt2}\\approx0.707$.\nEl brillo difuso es proporcional a 0.707 (la luz llega a 45°).', },

    { titulo: 'Vector de reflexión', tipo: 'practica', dif: 'media',
      enunciado: 'Con $\\mathbf N=(0,1,0)$ y $\\mathbf L=(1,1,0)/\\sqrt2$ (normalizado), calcula el vector reflejado $\\mathbf R=2(\\mathbf N\\cdot\\mathbf L)\\mathbf N-\\mathbf L$.',
      solucion: '$\\mathbf N\\cdot\\mathbf L=\\tfrac1{\\sqrt2}$.\n$\\mathbf R=2\\cdot\\tfrac1{\\sqrt2}(0,1,0)-\\tfrac1{\\sqrt2}(1,1,0)=\\left(0,\\tfrac{2}{\\sqrt2},0\\right)-\\left(\\tfrac1{\\sqrt2},\\tfrac1{\\sqrt2},0\\right)=\\left(-\\tfrac1{\\sqrt2},\\tfrac1{\\sqrt2},0\\right)$.\nEl reflejo apunta hacia arriba-izquierda, simétrico de $\\mathbf L$ respecto a la normal. ✓ (norma 1).', },

    { titulo: 'Phong vs Blinn-Phong', tipo: 'teoria', dif: 'media',
      enunciado: '¿Qué ventaja práctica aporta usar el vector medio $\\mathbf H$ en lugar de $\\mathbf R$, y por qué el exponente de brillo cambia?',
      solucion: 'Ventaja: **no hay que calcular el reflejo $\\mathbf R$** (más barato) y $\\mathbf N\\cdot\\mathbf H$ se comporta mejor cuando el ángulo entre $\\mathbf V$ y $\\mathbf R$ supera 90° (Phong lo recortaría a 0 bruscamente). Como el ángulo entre $\\mathbf N$ y $\\mathbf H$ es aproximadamente la **mitad** del ángulo entre $\\mathbf R$ y $\\mathbf V$, para obtener un brillo del mismo tamaño hay que usar un exponente **mayor** en Blinn-Phong (regla práctica $\\alpha_{BP}\\approx4\\alpha_{Phong}$).', },

    { titulo: 'Elegir sombreado', tipo: 'teoria', dif: 'media',
      enunciado: 'Un objeto metálico con un brillo especular pequeño y agudo se sombrea con Gouraud y el brillo "desaparece" o parpadea. Explica la causa y la solución.',
      solucion: 'Gouraud calcula la iluminación **solo en los vértices** e interpola el color. Si el brillo especular cae **entre** vértices (dentro del triángulo), no se muestrea y se pierde o aparece/desaparece al mover el objeto (banding/parpadeo). Solución: **sombreado de Phong**, que interpola las **normales** y evalúa el especular **por píxel**, capturando el brillo aunque esté en medio de la cara. Alternativa: subdividir más la malla.', },

    { titulo: 'Componentes de Phong', tipo: 'practica', dif: 'dificil',
      enunciado: 'Con $k_a=0.1, k_d=0.7, k_s=0.5, \\alpha=32$, luz blanca $I_a=I_d=I_s=1$, $\\mathbf N\\cdot\\mathbf L=0.6$ y $\\mathbf R\\cdot\\mathbf V=0.8$, calcula la intensidad total de Phong.',
      pista: '$I=k_aI_a+k_d(\\mathbf N\\cdot\\mathbf L)I_d+k_s(\\mathbf R\\cdot\\mathbf V)^\\alpha I_s$.',
      solucion: 'Ambiental: $0.1$. Difusa: $0.7\\cdot0.6=0.42$. Especular: $0.5\\cdot0.8^{32}$. $0.8^{32}\\approx 0.0008$, así $0.5\\cdot0.0008\\approx0.0004$.\n$I\\approx0.1+0.42+0.0004\\approx 0.520$. Nota cómo el alto exponente hace el brillo muy concentrado (casi nulo salvo alineación casi perfecta).', },

    { titulo: 'Conservación de energía', tipo: 'teoria', dif: 'media',
      enunciado: 'Explica cómo se reparte la luz incidente en reflexión, refracción y absorción, y qué componente de Phong "falsea" físicamente el término ambiental.',
      solucion: 'La energía incidente se conserva: $\\rho_{refl}+\\rho_{refr}+\\rho_{abs}=1$. El **término ambiental** $k_aI_a$ de Phong es una **aproximación no física**: representa de golpe toda la luz indirecta (rebotes) con una constante uniforme, en vez de calcularla. Es un truco barato para que las zonas en sombra no queden totalmente negras; los modelos de iluminación **global** sustituyen ese ambiental por el cálculo real de la luz indirecta.', },
  ],

  preguntas: [
    { q: 'La iluminación local considera:', opciones: ['Todos los rebotes de luz', 'Solo la luz directa de las fuentes (+ambiental)', 'Solo sombras', 'Solo refracción'], correcta: 1, exp: 'No traza luz indirecta; por eso es rápida y apta para tiempo real.', dif: 'media' },
    { q: 'La **BRDF** describe:', opciones: ['La geometría del objeto', 'Qué fracción de luz de $\\omega_i$ se refleja hacia $\\omega_o$', 'La posición de la cámara', 'El color ambiental'], correcta: 1, exp: 'Es la función de distribución de reflectancia bidireccional.', dif: 'media' },
    { q: 'El modelo de Phong suma las componentes:', opciones: ['Roja, verde y azul', 'Ambiental, difusa y especular', 'Reflexión, refracción y sombra', 'Vértice, arista y cara'], correcta: 1, exp: '$I=k_aI_a+k_d(N\\cdot L)I_d+k_s(R\\cdot V)^\\alpha I_s$.', dif: 'media' },
    { q: 'La componente **difusa** depende de:', opciones: ['$\\mathbf R\\cdot\\mathbf V$', '$\\mathbf N\\cdot\\mathbf L$', 'La posición del ojo', 'El exponente de brillo'], correcta: 1, exp: 'Ley de Lambert: proporcional a $\\mathbf N\\cdot\\mathbf L$, independiente del observador.', dif: 'media' },
    { q: 'La componente **especular** de Phong depende de:', opciones: ['Solo la normal', '$(\\mathbf R\\cdot\\mathbf V)^\\alpha$, es decir de la posición del ojo', 'Solo del color ambiental', 'Nada'], correcta: 1, exp: 'Depende del ángulo entre el reflejo $\\mathbf R$ y el observador $\\mathbf V$; por eso el brillo se mueve.', dif: 'media' },
    { q: 'Blinn-Phong sustituye $\\mathbf R\\cdot\\mathbf V$ por:', opciones: ['$\\mathbf N\\cdot\\mathbf L$', '$\\mathbf N\\cdot\\mathbf H$ con $\\mathbf H$ el vector medio', '$\\mathbf L\\cdot\\mathbf V$', '$\\mathbf N\\cdot\\mathbf V$'], correcta: 1, exp: 'Usa el vector medio $\\mathbf H=(\\mathbf L+\\mathbf V)/\\lVert\\mathbf L+\\mathbf V\\rVert$; evita calcular $\\mathbf R$.', dif: 'dificil' },
    { q: 'El vector de reflexión se calcula como:', opciones: ['$\\mathbf L-\\mathbf N$', '$2(\\mathbf N\\cdot\\mathbf L)\\mathbf N-\\mathbf L$', '$\\mathbf N\\times\\mathbf L$', '$\\mathbf L+\\mathbf V$'], correcta: 1, exp: '$\\mathbf R=2(\\mathbf N\\cdot\\mathbf L)\\mathbf N-\\mathbf L$: reflejo especular de $\\mathbf L$ respecto a $\\mathbf N$.', dif: 'dificil' },
    { q: 'El sombreado **Flat** produce:', opciones: ['Superficies suaves', 'Facetas visibles (un color por cara)', 'Brillos por píxel', 'Sombras suaves'], correcta: 1, exp: 'Calcula un solo color por cara; se ven las facetas de la malla.', dif: 'media' },
    { q: 'El sombreado de **Gouraud** interpola:', opciones: ['Las normales por píxel', 'El color calculado en los vértices', 'La profundidad', 'Las texturas'], correcta: 1, exp: 'Ilumina por vértice e interpola el color; puede perder brillos especulares pequeños.', dif: 'media' },
    { q: 'El sombreado de **Phong** (no confundir con el modelo) interpola:', opciones: ['El color', 'Las normales por píxel y evalúa la iluminación por fragmento', 'Solo la posición', 'Las coordenadas UV'], correcta: 1, exp: 'Interpola normales y calcula la iluminación por píxel: brillos especulares correctos.', dif: 'dificil' },
    { q: 'El término **ambiental** de Phong es físicamente:', opciones: ['Exacto', 'Una aproximación barata de la luz indirecta', 'La refracción', 'La sombra'], correcta: 1, exp: 'Sustituye toda la luz indirecta por una constante para evitar negros absolutos; no es físico.', dif: 'media' },
    { q: 'En el pipeline, el **fragment shader** de un sombreado de Phong:', opciones: ['Transforma vértices', 'Interpola la normal y evalúa Blinn-Phong por fragmento', 'Ordena triángulos', 'Carga texturas a memoria'], correcta: 1, exp: 'La iluminación por píxel se implementa en el fragment shader usando la normal interpolada.', dif: 'media' },
  ],
};

export default tema;
