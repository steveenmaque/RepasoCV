import type { Tema } from '../../lib/types';

const tema: Tema = {
  slug: 'iluminacion-global',
  seccion: 'exposiciones',
  titulo: 'Modelos de Iluminación Global',
  subtitulo:
    'La ecuación de renderizado de Kajiya y los algoritmos que la resuelven: ray tracing, radiosidad, path tracing y photon mapping. Fortalezas, debilidades y casos de aplicación.',
  resumen:
    'Iluminación que considera la interacción de la luz entre todas las superficies (rebotes, sangrado de color, cáusticas). Ecuación de renderizado y su solución por Monte Carlo, radiosidad y trazado de rayos.',
  tags: ['Ecuación de renderizado', 'Path tracing', 'Radiosidad', 'Monte Carlo', 'Ray tracing'],
  color: '#f59e0b',

  teoria: [
    { tipo: 'parrafo', texto: 'La **iluminación global (GI)** modela cómo la luz interactúa con **todas** las superficies de una escena: rebotes múltiples, sombras suaves, **sangrado de color** (color bleeding), cáusticas y oclusión ambiental. Se contrapone a la **iluminación local**, que solo considera la luz directa fuente→superficie→ojo, ignorando la luz reflejada por otros objetos.' },

    { tipo: 'subtitulo', texto: 'Local vs global' },
    { tipo: 'tabla', headers: ['Aspecto', 'Local', 'Global'], filas: [
      ['Rebotes considerados', 'Solo directo (1)', 'Múltiples (indirecta)'],
      ['Sombras', 'Duras o mapeadas', 'Suaves y físicas'],
      ['Color bleeding', 'No', 'Sí'],
      ['Costo', 'Bajo (tiempo real)', 'Alto (offline / GPU RT)'],
      ['Ejemplos', 'Phong, Blinn-Phong', 'Path tracing, radiosidad'],
    ] },

    { tipo: 'subtitulo', texto: 'La ecuación de renderizado (Kajiya, 1986)' },
    { tipo: 'parrafo', texto: 'Es la ecuación integral que gobierna toda la GI. La **radiancia saliente** $L_o$ desde un punto $\\mathbf{x}$ en dirección $\\omega_o$ es la luz **emitida** más la **reflejada** (integral sobre el hemisferio de todas las direcciones entrantes):' },
    { tipo: 'formula', latex: 'L_o(\\mathbf{x},\\omega_o) = L_e(\\mathbf{x},\\omega_o) + \\int_{\\Omega} f_r(\\mathbf{x},\\omega_i,\\omega_o)\\, L_i(\\mathbf{x},\\omega_i)\\, (\\omega_i\\cdot \\mathbf{n})\\, d\\omega_i', nota: '$L_e$ = emitida, $f_r$ = BRDF, $L_i$ = radiancia entrante, $(\\omega_i\\cdot n)=\\cos\\theta_i$ el término coseno.' },
    { tipo: 'nota', estilo: 'clave', texto: 'Es **recursiva**: $L_i$ en un punto depende de la $L_o$ de otras superficies. Resolverla es el objetivo de todos los algoritmos de GI.' },

    { tipo: 'subtitulo', texto: 'Ray tracing (Whitted, 1980)' },
    { tipo: 'parrafo', texto: 'Traza rayos desde la cámara y, al chocar, lanza rayos **secundarios** de reflexión, refracción y sombra recursivamente. Produce reflejos especulares y refracciones nítidas.' },
    { tipo: 'lista', items: [
      '**Fortalezas:** reflexiones/refracciones físicamente convincentes, sombras precisas.',
      '**Debilidades:** el ray tracing clásico no captura la iluminación **difusa indirecta**; costo alto.',
    ] },

    { tipo: 'subtitulo', texto: 'Radiosidad' },
    { tipo: 'parrafo', texto: 'Método de **elementos finitos** para superficies **difusas** (lambertianas). Discretiza la escena en parches y resuelve el intercambio de energía entre ellos. La radiosidad $B_i$ de un parche es su emisión más lo que refleja de los demás, ponderado por **factores de forma** $F_{ij}$ (fracción de energía que va de $j$ a $i$):' },
    { tipo: 'formula', latex: 'B_i = E_i + \\rho_i \\sum_{j} F_{ij}\\, B_j', nota: '$E_i$ emisión, $\\rho_i$ reflectividad, $F_{ij}$ factor de forma.' },
    { tipo: 'lista', items: [
      '**Fortalezas:** interreflexión difusa realista, sangrado de color; independiente del punto de vista (se puede recorrer la escena).',
      '**Debilidades:** solo difuso (no reflejos especulares), coste de calcular $F_{ij}$ ($O(n^2)$).',
    ] },
    { tipo: 'imagen', src: '/img/expos/iluminacion-global/radiosidad.webp', alt: 'Cornell box con radiosidad', caption: 'Sangrado de color e interreflexión difusa (típica *Cornell box*).' },

    { tipo: 'subtitulo', texto: 'Path tracing (Monte Carlo)' },
    { tipo: 'parrafo', texto: 'Resuelve la ecuación de renderizado con **integración de Monte Carlo**: por cada píxel lanza muchos rayos que rebotan aleatoriamente según la BRDF. Es **insesgado** y captura todos los efectos (difuso, especular, cáusticas) en un marco unificado, a costa de **ruido** que decrece como $1/\\sqrt{N}$ con $N$ muestras.' },
    { tipo: 'formula', latex: 'L_o \\approx L_e + \\frac{1}{N}\\sum_{k=1}^{N} \\frac{f_r(\\omega_k,\\omega_o)\\,L_i(\\omega_k)\\,\\cos\\theta_k}{p(\\omega_k)}', nota: 'Estimador de Monte Carlo; $p(\\omega_k)$ es la densidad de muestreo (importance sampling).' },
    { tipo: 'nota', estilo: 'aviso', texto: 'El error del estimador Monte Carlo decrece como $O(1/\\sqrt{N})$: para reducir el ruido a la mitad se necesitan **4× muestras**. Por eso se usan *importance sampling* y *denoisers*.' },

    { tipo: 'subtitulo', texto: 'Photon mapping' },
    { tipo: 'parrafo', texto: 'Técnica en **dos pasadas**: primero se emiten "fotones" desde las luces y se almacenan en un mapa (photon map); luego se estima la radiancia consultando la densidad de fotones. Es muy bueno para **cáusticas** y medios participativos.' },

    { tipo: 'subtitulo', texto: 'Comparación y casos de aplicación' },
    { tipo: 'lista', items: [
      '**Path tracing:** cine (Pixar, Arnold), render offline de máxima calidad.',
      '**Radiosidad:** visualización arquitectónica, precálculo de *lightmaps* en videojuegos.',
      '**Ray tracing en tiempo real:** GPUs RTX (RT cores) + *denoising* por IA.',
      '**Photon mapping:** cáusticas (vidrio, agua) y humo/niebla.',
    ] },
  ],

  formulas: [
    { latex: 'L_o=L_e+\\int_{\\Omega} f_r\\,L_i\\,(\\omega_i\\cdot n)\\,d\\omega_i', desc: 'Ecuación de renderizado de **Kajiya**.' },
    { latex: 'B_i=E_i+\\rho_i\\sum_j F_{ij}B_j', desc: 'Ecuación de **radiosidad** (parches difusos).' },
    { latex: 'L_o\\approx L_e+\\tfrac1N\\sum_k \\tfrac{f_r L_i\\cos\\theta_k}{p(\\omega_k)}', desc: 'Estimador **Monte Carlo** (path tracing).' },
    { latex: '\\text{error}\\sim O(1/\\sqrt{N})', desc: 'Convergencia del ruido con $N$ muestras.' },
    { latex: '\\sum_j F_{ij}=1', desc: 'Los **factores de forma** de un parche suman 1 (conservación de energía).' },
  ],

  ejercicios: [
    { titulo: 'Términos de la ecuación de renderizado', tipo: 'teoria', dif: 'media',
      enunciado: 'Identifica cada término de $L_o=L_e+\\int_\\Omega f_r L_i(\\omega_i\\cdot n)\\,d\\omega_i$ y explica por qué la ecuación es recursiva.',
      solucion: '$L_o$: radiancia **saliente** hacia el ojo. $L_e$: luz **emitida** (solo distinto de cero en fuentes). $f_r$: **BRDF**, cómo refleja la superficie según direcciones. $L_i$: radiancia **entrante** desde $\\omega_i$. $(\\omega_i\\cdot n)=\\cos\\theta_i$: atenuación por ángulo (ley del coseno de Lambert). Es **recursiva** porque $L_i(\\mathbf x,\\omega_i)$ es la $L_o$ de la superficie visible en esa dirección: la luz que llega a un punto proviene de lo que otros puntos emiten/reflejan, encadenando rebotes.', },

    { titulo: 'Convergencia de Monte Carlo', tipo: 'practica', dif: 'media',
      enunciado: 'Un render con 64 muestras por píxel tiene cierto nivel de ruido. ¿Cuántas muestras se necesitan para **reducir el ruido a la cuarta parte**?',
      pista: 'El error va como $1/\\sqrt N$.',
      solucion: 'Ruido $\\propto 1/\\sqrt N$. Para reducirlo a $1/4$ hace falta $\\sqrt{N\'}=4\\sqrt{N}\\Rightarrow N\'=16N$. Con $N=64$: $N\'=16\\cdot64=1024$ muestras. Reducir el ruido es caro: dividirlo por $k$ cuesta $k^2$ veces más muestras.', },

    { titulo: 'Radiosidad de un parche', tipo: 'practica', dif: 'dificil',
      enunciado: 'Un parche no emisor ($E=0$) con reflectividad $\\rho=0.5$ recibe energía de dos parches con $B_1=200$, $B_2=100$ y factores de forma $F_{i1}=0.3$, $F_{i2}=0.2$. Calcula su radiosidad (una iteración).',
      pista: '$B_i=E_i+\\rho_i\\sum_j F_{ij}B_j$.',
      solucion: '$B_i=0+0.5\\,(0.3\\cdot200+0.2\\cdot100)=0.5\\,(60+20)=0.5\\cdot80=40$. En radiosidad iterativa (Gauss-Seidel) este valor se realimenta a los demás parches hasta converger.', },

    { titulo: 'Elegir el algoritmo', tipo: 'teoria', dif: 'media',
      enunciado: 'Para (a) una escena arquitectónica difusa que el usuario recorrerá en tiempo real y (b) una escena con una copa de vidrio que produce cáusticas, ¿qué método de GI conviene?',
      solucion: '(a) **Radiosidad** (o lightmaps precalculados): es independiente del punto de vista, así que se calcula una vez y se recorre libremente; ideal para interiores difusos. (b) **Photon mapping** (o path tracing con muchas muestras): las **cáusticas** —concentraciones de luz refractada por el vidrio— se capturan bien almacenando fotones; el ray tracing clásico de Whitted no las reproduce correctamente.', },

    { titulo: 'Factores de forma', tipo: 'practica', dif: 'media',
      enunciado: 'Explica qué representa el factor de forma $F_{ij}$ y por qué $\\sum_j F_{ij}=1$ para un parche cerrado en su entorno.',
      solucion: '$F_{ij}$ es la **fracción de la energía radiante** que sale del parche $i$ y llega directamente al parche $j$, dependiendo de geometría (distancia, orientación, visibilidad). Como toda la energía que abandona $i$ debe llegar a **algún** parche del entorno cerrado, la suma de fracciones es 1 (conservación de energía). Calcular todos los $F_{ij}$ es $O(n^2)$, el cuello de botella de la radiosidad.', },

    { titulo: 'Por qué Whitted no basta', tipo: 'teoria', dif: 'dificil',
      enunciado: 'El ray tracing de Whitted lanza rayos de sombra, reflexión y refracción. ¿Por qué aún así no produce iluminación global completa y qué le falta?',
      solucion: 'Whitted solo sigue rayos en direcciones **especulares** (reflexión/refracción ideales) y sombras a luces puntuales. No integra sobre **todo el hemisferio** de direcciones difusas, por lo que **omite la iluminación difusa indirecta** (color bleeding, luz rebotada por paredes) y las sombras suaves de luces de área. Le falta resolver la **integral completa** de la ecuación de renderizado, lo que sí hace el path tracing mediante muestreo de Monte Carlo de direcciones difusas.', },
  ],

  preguntas: [
    { q: 'La diferencia esencial entre iluminación local y global es que la global:', opciones: ['Usa más colores', 'Considera la luz reflejada entre todas las superficies (rebotes)', 'Solo funciona en 2D', 'Es siempre más rápida'], correcta: 1, exp: 'La GI incluye la luz indirecta (múltiples rebotes), sombras suaves y color bleeding.', dif: 'media' },
    { q: 'La ecuación de renderizado fue formulada por:', opciones: ['Phong', 'Kajiya (1986)', 'Newton', 'Gouraud'], correcta: 1, exp: 'James Kajiya la introdujo en 1986 como base unificada de la GI.', dif: 'media' },
    { q: 'En la ecuación de renderizado, el término $L_e$ representa:', opciones: ['La luz reflejada', 'La luz emitida por la superficie', 'La BRDF', 'El coseno'], correcta: 1, exp: '$L_e$ es la radiancia emitida (no nula solo en fuentes de luz).', dif: 'media' },
    { q: 'La ecuación de renderizado es recursiva porque:', opciones: ['Usa bucles for', 'La luz entrante en un punto es la saliente de otros', 'Depende del tiempo', 'Solo tiene un rebote'], correcta: 1, exp: '$L_i$ de un punto es la $L_o$ de las superficies visibles desde él: rebotes encadenados.', dif: 'dificil' },
    { q: 'La **radiosidad** modela bien:', opciones: ['Reflejos especulares', 'La interreflexión difusa y el color bleeding', 'Refracciones', 'Cáusticas'], correcta: 1, exp: 'Es un método para superficies difusas: reproduce el intercambio de energía difusa entre parches.', dif: 'media' },
    { q: 'En la ecuación de radiosidad $B_i=E_i+\\rho_i\\sum_j F_{ij}B_j$, $F_{ij}$ es:', opciones: ['La reflectividad', 'El factor de forma (fracción de energía de $j$ a $i$)', 'La emisión', 'El ángulo'], correcta: 1, exp: 'El factor de forma es la fracción geométrica de energía intercambiada entre parches.', dif: 'dificil' },
    { q: 'El **path tracing** resuelve la ecuación de renderizado mediante:', opciones: ['Elementos finitos', 'Integración de Monte Carlo (rayos aleatorios)', 'Transformada de Fourier', 'Rasterización'], correcta: 1, exp: 'Muestrea trayectorias de luz al azar según la BRDF; es insesgado pero ruidoso.', dif: 'media' },
    { q: 'El ruido del path tracing decrece con el número de muestras como:', opciones: ['$1/N$', '$1/\\sqrt{N}$', '$1/N^2$', '$\\log N$'], correcta: 1, exp: 'Convergencia Monte Carlo $O(1/\\sqrt N)$: reducir el ruido a la mitad requiere 4× muestras.', dif: 'dificil' },
    { q: '¿Qué técnica es especialmente buena para **cáusticas**?', opciones: ['Radiosidad', 'Photon mapping', 'Gouraud shading', 'Flat shading'], correcta: 1, exp: 'El photon mapping (2 pasadas) almacena fotones y reproduce cáusticas y medios participativos.', dif: 'media' },
    { q: 'El ray tracing clásico de Whitted NO captura bien:', opciones: ['Reflejos especulares', 'Refracciones', 'La iluminación difusa indirecta', 'Sombras duras'], correcta: 2, exp: 'Solo sigue direcciones especulares y sombras puntuales; omite el difuso indirecto.', dif: 'dificil' },
    { q: 'Una ventaja de la radiosidad es que su solución:', opciones: ['Depende de la cámara', 'Es independiente del punto de vista (se puede recorrer la escena)', 'No conserva energía', 'Solo sirve para vidrio'], correcta: 1, exp: 'Al calcular la radiosidad por parche, se puede navegar la escena sin recalcular (útil para arquitectura y lightmaps).', dif: 'media' },
    { q: 'El término $(\\omega_i\\cdot n)$ en la ecuación de renderizado corresponde a:', opciones: ['La reflectividad', 'El coseno del ángulo de incidencia (ley de Lambert)', 'La distancia', 'La emisión'], correcta: 1, exp: 'Es $\\cos\\theta_i$: la irradiancia disminuye con el ángulo respecto a la normal.', dif: 'media' },
  ],
};

export default tema;
