import type { Tema } from '../../lib/types';

const tema: Tema = {
  slug: 'fractales',
  seccion: 'exposiciones',
  titulo: 'Fractales',
  subtitulo:
    'Geometría fractal: autosimilitud, iteración y dimensión fraccionaria. Conjuntos de Mandelbrot y Julia, curva de Koch, triángulo de Sierpinski, sistemas de funciones iteradas (IFS) y L-systems.',
  resumen:
    'Objetos con detalle a toda escala y dimensión no entera. Cálculo de la dimensión fractal, algoritmos de generación (escape-time, IFS, L-systems) y aplicaciones en gráficos y naturaleza.',
  tags: ['Autosimilitud', 'Dimensión fractal', 'Mandelbrot', 'IFS', 'L-systems'],
  color: '#f472b6',

  teoria: [
    { tipo: 'parrafo', texto: 'Un **fractal** es un objeto geométrico cuya estructura se repite (exacta o estadísticamente) a diferentes escalas y que suele tener una **dimensión fraccionaria**. El término lo acuñó **Benoît Mandelbrot** (1975), quien observó que "las nubes no son esferas, las montañas no son conos y las costas no son círculos": la geometría euclidiana no basta para describir la naturaleza.' },

    { tipo: 'subtitulo', texto: 'Características principales' },
    { tipo: 'lista', items: [
      '**Autosimilitud:** las partes se parecen al todo (exacta en fractales matemáticos, estadística en los naturales).',
      '**Detalle infinito:** al hacer zoom siempre aparece nueva estructura.',
      '**Iteración / recursividad:** se generan repitiendo una regla simple.',
      '**Dimensión fractal (Hausdorff) no entera:** mide cuánto "llena" el espacio.',
      '**Complejidad a partir de reglas simples.**',
    ] },

    { tipo: 'subtitulo', texto: 'Dimensión fractal (autosimilitud)' },
    { tipo: 'parrafo', texto: 'Si al escalar por un factor $1/r$ el objeto se descompone en $N$ copias, la **dimensión de autosimilitud** es:' },
    { tipo: 'formula', latex: 'D = \\frac{\\log N}{\\log (1/r)}', nota: 'Generaliza la dimensión entera: un segmento dividido en 2 ($N=2, r=1/2$) da $D=1$.' },
    { tipo: 'parrafo', texto: 'La versión medible experimentalmente es la **dimensión de conteo de cajas (box-counting)**: se cubre el objeto con cajas de lado $\\varepsilon$ y se cuentan las $N(\\varepsilon)$ no vacías.' },
    { tipo: 'formula', latex: 'D = \\lim_{\\varepsilon \\to 0} \\frac{\\log N(\\varepsilon)}{\\log (1/\\varepsilon)}' },
    { tipo: 'nota', estilo: 'clave', texto: 'Curva de Koch: $N=4$ copias a escala $r=1/3$ ⇒ $D=\\log 4/\\log 3 \\approx 1.26$. ¡Más que una línea (1) pero menos que un área (2)!' },

    { tipo: 'subtitulo', texto: 'Fractales representativos' },
    { tipo: 'lista', items: [
      '**Conjunto de Cantor:** quitar el tercio central repetidamente ($D=\\log2/\\log3\\approx0.63$).',
      '**Curva de Koch / copo de nieve:** $D\\approx1.26$, perímetro infinito y área finita.',
      '**Triángulo de Sierpinski:** $N=3, r=1/2 \\Rightarrow D=\\log3/\\log2\\approx1.585$.',
      '**Conjunto de Mandelbrot y conjuntos de Julia:** fractales en el plano complejo.',
      '**Fractales naturales:** helechos, costas, ramas, nubes, relámpagos.',
    ] },

    { tipo: 'subtitulo', texto: 'Conjunto de Mandelbrot (escape-time)' },
    { tipo: 'parrafo', texto: 'Se define iterando en el plano complejo $z_{n+1}=z_n^2+c$ desde $z_0=0$. El punto $c$ pertenece al conjunto si la sucesión **no diverge** (permanece acotada). El coloreado típico usa el número de iteraciones hasta que $|z_n|>2$ (criterio de escape).' },
    { tipo: 'formula', latex: 'z_{n+1} = z_n^2 + c, \\qquad z_0 = 0, \\quad c \\in \\mathbb{C}', nota: 'Si $|z_n|>2$ la órbita escapa a infinito ⇒ $c$ está fuera del conjunto.' },
    { tipo: 'imagen', src: '/img/expos/fractales/mandelbrot.webp', alt: 'Conjunto de Mandelbrot', caption: 'Conjunto de **Mandelbrot**: coloreado por velocidad de escape de $z_{n+1}=z_n^2+c$.' },
    { tipo: 'parrafo', texto: 'Los **conjuntos de Julia** usan la misma iteración pero fijando $c$ y variando $z_0$; cada $c$ genera un Julia distinto, conectado si $c$ está en el Mandelbrot.' },

    { tipo: 'subtitulo', texto: 'Sistemas de funciones iteradas (IFS)' },
    { tipo: 'parrafo', texto: 'Un **IFS** es un conjunto de transformaciones afines contractivas $w_i$. Su atractor (punto fijo del "operador de Hutchinson") es un fractal autosimilar. El **juego del caos** lo dibuja aplicando aleatoriamente las $w_i$ a un punto.' },
    { tipo: 'formula', latex: 'w_i(\\mathbf{x}) = \\mathbf{A}_i\\mathbf{x} + \\mathbf{b}_i, \\qquad \\mathcal{A} = \\bigcup_i w_i(\\mathcal{A})', nota: 'El helecho de Barnsley se genera con 4 transformaciones afines.' },

    { tipo: 'subtitulo', texto: 'L-systems (gramáticas de reescritura)' },
    { tipo: 'parrafo', texto: 'Los **sistemas de Lindenmayer** generan fractales y plantas mediante una gramática: un axioma y reglas que reescriben símbolos, interpretados luego con una "tortuga" gráfica (avanzar, girar, apilar posición). Ej.: `F → F+F−F−F+F` dibuja la curva de Koch.' },

    { tipo: 'subtitulo', texto: 'Aplicaciones' },
    { tipo: 'lista', items: [
      'Generación procedural de **terrenos, montañas y nubes** (desplazamiento del punto medio, ruido).',
      'Modelado de **vegetación** (L-systems) en cine y videojuegos.',
      '**Compresión fractal** de imágenes.',
      'Antenas fractales, análisis de series financieras, texturas.',
    ] },
  ],

  formulas: [
    { latex: 'D = \\dfrac{\\log N}{\\log (1/r)}', desc: 'Dimensión de **autosimilitud** ($N$ copias a escala $r$).' },
    { latex: 'D = \\lim_{\\varepsilon\\to0}\\dfrac{\\log N(\\varepsilon)}{\\log(1/\\varepsilon)}', desc: 'Dimensión **box-counting** (medible).' },
    { latex: 'z_{n+1}=z_n^2+c', desc: 'Iteración de **Mandelbrot/Julia** (escape-time).' },
    { latex: 'w_i(\\mathbf{x})=\\mathbf{A}_i\\mathbf{x}+\\mathbf{b}_i', desc: 'Transformación afín de un **IFS**.' },
    { latex: 'D_{Koch}=\\tfrac{\\log4}{\\log3}\\approx1.26', desc: 'Dimensión de la curva de **Koch**.' },
    { latex: 'D_{Sierpinski}=\\tfrac{\\log3}{\\log2}\\approx1.585', desc: 'Dimensión del triángulo de **Sierpinski**.' },
  ],

  ejercicios: [
    { titulo: 'Dimensión del triángulo de Sierpinski', tipo: 'practica', dif: 'media',
      enunciado: 'El triángulo de Sierpinski se forma dividiendo un triángulo en 4 y quitando el central, quedando 3 copias a mitad de escala. Calcula su dimensión fractal.',
      pista: '$N=3$, $r=1/2$ en $D=\\log N/\\log(1/r)$.',
      solucion: '$D=\\dfrac{\\log 3}{\\log 2}=\\dfrac{1.0986}{0.6931}\\approx 1.585$. Está entre 1 (línea) y 2 (área): el fractal llena el plano más que una curva pero menos que una región.' },

    { titulo: 'Perímetro de la curva de Koch', tipo: 'practica', dif: 'media',
      enunciado: 'En cada iteración de la curva de Koch cada segmento se sustituye por 4 de longitud $1/3$. Si el segmento inicial mide 1, ¿cuánto mide el perímetro tras $n$ iteraciones y cuál es su límite?',
      pista: 'La longitud se multiplica por $4/3$ cada paso.',
      solucion: 'Longitud tras $n$ pasos: $L_n=\\left(\\dfrac{4}{3}\\right)^n$. Como $4/3>1$, $L_n\\to\\infty$ cuando $n\\to\\infty$: la curva de Koch tiene **longitud infinita** aunque encierra un área finita. Esa es la paradoja característica de los fractales.' },

    { titulo: 'Iteración de Mandelbrot', tipo: 'practica', dif: 'dificil',
      enunciado: 'Para $c=1$ (real), aplica $z_{n+1}=z_n^2+c$ desde $z_0=0$ tres pasos y decide si $c=1$ pertenece al conjunto de Mandelbrot.',
      pista: 'Criterio de escape: si $|z_n|>2$, diverge.',
      solucion: '$z_1=0^2+1=1$; $z_2=1^2+1=2$; $z_3=2^2+1=5$; $z_4=26$…\nLa sucesión crece sin cota ($|z_3|=5>2$), así que **diverge** y $c=1$ **no** pertenece al conjunto de Mandelbrot. (En cambio $c=-1$ oscila $0,-1,0,-1$ y sí pertenece.)' },

    { titulo: 'Dimensión por conteo de cajas', tipo: 'practica', dif: 'dificil',
      enunciado: 'Al cubrir un fractal con cajas de lado $\\varepsilon=1/3$ se necesitan 8 cajas, y con $\\varepsilon=1/9$ se necesitan 64. Estima su dimensión box-counting.',
      pista: '$D\\approx \\dfrac{\\log N(\\varepsilon_2)-\\log N(\\varepsilon_1)}{\\log(1/\\varepsilon_2)-\\log(1/\\varepsilon_1)}$.',
      solucion: '$D=\\dfrac{\\log 64-\\log 8}{\\log 9-\\log 3}=\\dfrac{\\log 8}{\\log 3}=\\dfrac{3\\log2}{\\log3}\\approx 1.893$. (Coincide con un fractal tipo alfombra/esponja; el número de cajas se multiplica por 8 al triplicar la resolución.)' },

    { titulo: 'IFS y juego del caos', tipo: 'teoria', dif: 'media',
      enunciado: 'Explica por qué el "juego del caos" (aplicar transformaciones afines al azar) converge al mismo atractor sin importar el punto inicial.',
      solucion: 'Las transformaciones de un IFS son **contracciones** (acercan puntos). Por el teorema del punto fijo de Banach aplicado al operador de Hutchinson, existe un **único atractor** invariante. Aplicar las $w_i$ repetidamente (aunque sea al azar, respetando probabilidades) hace que las iteraciones caigan cada vez más cerca del atractor: tras descartar los primeros puntos transitorios, todos los puntos dibujan la misma figura, independientemente del inicio.' },

    { titulo: 'L-system de Koch', tipo: 'practica', dif: 'media',
      enunciado: 'Con axioma `F` y regla `F → F+F−−F+F` (girando 60°), ¿qué longitud relativa y cuántos segmentos tiene la cadena tras 2 reescrituras?',
      pista: 'Cada `F` se sustituye por 4 `F`.',
      solucion: 'Cada reescritura convierte una `F` en 4 `F`. Tras 2 pasos hay $4^2=16$ segmentos `F`. Si cada segmento se dibuja a $1/3$ del anterior, la longitud total es $(4/3)^2=16/9\\approx1.78$ veces la inicial. Es exactamente la construcción de la curva de Koch mediante una gramática.' },
  ],

  preguntas: [
    { q: '¿Quién acuñó el término "fractal" y popularizó la geometría fractal?', opciones: ['Euclides', 'Benoît Mandelbrot', 'Gaston Julia', 'Helge von Koch'], correcta: 1, exp: 'Mandelbrot (1975) introdujo el término y mostró que la naturaleza tiene estructura fractal.', dif: 'media' },
    { q: 'La **autosimilitud** significa que:', opciones: ['El objeto es simétrico respecto a un eje', 'Las partes se parecen al todo a distintas escalas', 'El objeto es plano', 'Tiene dimensión entera'], correcta: 1, exp: 'Al hacer zoom aparecen copias (exactas o estadísticas) de la estructura global.', dif: 'media' },
    { q: 'La dimensión de autosimilitud se calcula como:', opciones: ['$D=N/r$', '$D=\\log N/\\log(1/r)$', '$D=N\\cdot r$', '$D=\\log(1/r)/\\log N$'], correcta: 1, exp: '$D=\\log N/\\log(1/r)$ con $N$ copias a escala $r$.', dif: 'media' },
    { q: 'La dimensión de la curva de Koch es aproximadamente:', opciones: ['1.00', '1.26', '1.585', '2.00'], correcta: 1, exp: '$\\log4/\\log3\\approx1.26$: entre línea y superficie.', dif: 'dificil' },
    { q: 'La iteración del conjunto de Mandelbrot es:', opciones: ['$z_{n+1}=z_n+c$', '$z_{n+1}=z_n^2+c$', '$z_{n+1}=c\\cdot z_n$', '$z_{n+1}=z_n^2-1$'], correcta: 1, exp: '$z_{n+1}=z_n^2+c$ con $z_0=0$; $c$ pertenece si no diverge.', dif: 'media' },
    { q: 'El criterio de escape usual en Mandelbrot es que la órbita diverja cuando:', opciones: ['$|z_n|>1$', '$|z_n|>2$', '$|z_n|>10$', 'Nunca diverge'], correcta: 1, exp: 'Si $|z_n|>2$ está garantizado que la sucesión escapa a infinito.', dif: 'dificil' },
    { q: 'La diferencia entre conjunto de Julia y de Mandelbrot es que:', opciones: ['Julia usa otra fórmula distinta', 'En Julia se fija $c$ y se varía $z_0$; en Mandelbrot se varía $c$ con $z_0=0$', 'Julia no es fractal', 'Son idénticos'], correcta: 1, exp: 'Misma iteración, distinta variable de barrido: Julia fija $c$; Mandelbrot barre $c$.', dif: 'dificil' },
    { q: 'Un **IFS** genera fractales mediante:', opciones: ['Números primos', 'Transformaciones afines contractivas repetidas', 'Ecuaciones diferenciales', 'Transformada de Fourier'], correcta: 1, exp: 'Un sistema de funciones iteradas aplica contracciones afines cuyo atractor es el fractal (p. ej. helecho de Barnsley).', dif: 'media' },
    { q: 'Los **L-systems** son:', opciones: ['Sistemas de iluminación', 'Gramáticas de reescritura interpretadas gráficamente (tortuga)', 'Estructuras de datos', 'Filtros de imagen'], correcta: 1, exp: 'Reescriben símbolos según reglas; útiles para modelar plantas y curvas fractales.', dif: 'media' },
    { q: 'El triángulo de Sierpinski tiene dimensión:', opciones: ['$\\log2/\\log3\\approx0.63$', '$\\log3/\\log2\\approx1.585$', '2.0', '1.26'], correcta: 1, exp: '$N=3$ copias a escala $1/2$: $D=\\log3/\\log2\\approx1.585$.', dif: 'dificil' },
    { q: 'Una paradoja típica de la curva de Koch es que tiene:', opciones: ['Área infinita y perímetro finito', 'Perímetro infinito y área finita', 'Dimensión 2 exacta', 'Longitud cero'], correcta: 1, exp: 'La longitud crece como $(4/3)^n\\to\\infty$, pero el área encerrada es finita.', dif: 'media' },
    { q: 'Los fractales naturales (costas, nubes) presentan autosimilitud:', opciones: ['Exacta', 'Estadística (aproximada)', 'Nula', 'Solo en 3D'], correcta: 1, exp: 'La naturaleza muestra autosimilitud estadística, no copias exactas.', dif: 'media' },
    { q: '¿Cuál es una aplicación gráfica directa de los fractales?', opciones: ['Ordenar bases de datos', 'Generación procedural de terrenos y vegetación', 'Cifrado RSA', 'Compilación de código'], correcta: 1, exp: 'Terrenos por desplazamiento del punto medio, plantas con L-systems, nubes con ruido fractal, etc.', dif: 'media' },
  ],
};

export default tema;
