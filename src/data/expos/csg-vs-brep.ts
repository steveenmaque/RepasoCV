import type { Tema } from '../../lib/types';

const tema: Tema = {
  slug: 'csg-vs-brep',
  seccion: 'exposiciones',
  titulo: 'Geometría Constructiva de Sólidos (CSG) vs Representación de Fronteras',
  subtitulo:
    'CSG con operaciones booleanas regularizadas y árboles, funciones de distancia firmada (SDF) y ray marching, conversión CSG→B-rep con Marching Cubes, tabla comparativa y validez por Euler-Poincaré.',
  resumen:
    'Dos paradigmas para representar sólidos: CSG (procedimental, primitivas + booleanas) y B-rep (frontera explícita). Incluye SDF, ray casting/marching y el algoritmo de Marching Cubes.',
  tags: ['CSG', 'B-rep', 'SDF', 'Marching Cubes', 'Booleanas', 'Ray casting'],
  color: '#34d399',

  teoria: [
    { tipo: 'parrafo', texto: 'El **modelado geométrico** necesita representar sólidos válidos (que encierran volumen). Los dos esquemas dominantes son la **Geometría Constructiva de Sólidos (CSG)**, que construye formas combinando primitivas, y la **Representación de Fronteras (B-rep)**, que describe explícitamente la superficie. No son rivales: los CAD modernos usan un **modelo híbrido** (CSG para el historial de diseño, B-rep para visualizar y consultar).' },

    { tipo: 'subtitulo', texto: 'CSG: idea y primitivas' },
    { tipo: 'parrafo', texto: 'CSG parte de **primitivas** paramétricas (cubo, esfera, cilindro, cono, toro) y las combina con **operaciones booleanas**. El modelo se guarda como un **árbol CSG**: las hojas son primitivas transformadas y los nodos internos son operaciones. Es compacto, paramétrico y **siempre válido** por construcción.' },
    { tipo: 'imagen', src: '/img/expos/csg-vs-brep/arbol-csg.webp', alt: 'Árbol CSG', caption: 'Árbol **CSG**: hojas = primitivas, nodos = operaciones booleanas (unión, intersección, diferencia).' },

    { tipo: 'subtitulo', texto: 'Operaciones booleanas regularizadas' },
    { tipo: 'parrafo', texto: 'Las operaciones de conjuntos ordinarias pueden generar caras o aristas "colgantes" (sin volumen). Por eso se usan **operaciones regularizadas** $\\cup^{*},\\cap^{*},-^{*}$, definidas como la **clausura del interior** del resultado, garantizando un sólido válido.' },
    { tipo: 'formula', latex: 'A \\cup^{*} B = \\overline{\\text{int}(A \\cup B)}, \\quad A \\cap^{*} B = \\overline{\\text{int}(A \\cap B)}, \\quad A -^{*} B = \\overline{\\text{int}(A \\setminus B)}', nota: 'La regularización elimina geometría de dimensión inferior (sin volumen).' },

    { tipo: 'subtitulo', texto: 'Funciones de distancia firmada (SDF)' },
    { tipo: 'parrafo', texto: 'Una **SDF** $f(\\mathbf{p})$ devuelve la distancia (con signo) de un punto a la superficie: **negativa dentro**, **cero en la frontera**, **positiva fuera**. Permite representar CSG de forma analítica y renderizarlo con **ray marching**.' },
    { tipo: 'formula', latex: 'f_{\\text{esfera}}(\\mathbf{p}) = \\lVert \\mathbf{p} - \\mathbf{c} \\rVert - r', nota: 'SDF de una esfera de centro $\\mathbf{c}$ y radio $r$.' },
    { tipo: 'parrafo', texto: 'Las booleanas sobre SDFs son operaciones **min/max** sobre las distancias:' },
    { tipo: 'formula', latex: '\\begin{aligned} \\text{Unión: } & f_{A\\cup B}=\\min(f_A,f_B)\\\\ \\text{Intersección: } & f_{A\\cap B}=\\max(f_A,f_B)\\\\ \\text{Diferencia: } & f_{A-B}=\\max(f_A,\\,-f_B) \\end{aligned}' },

    { tipo: 'subtitulo', texto: 'Ray casting / Ray marching en CSG' },
    { tipo: 'parrafo', texto: 'Para ver un CSG sin convertirlo a malla se lanza un rayo por píxel. Con SDFs se usa **sphere tracing**: en cada paso se avanza el rayo una distancia igual a la SDF (garantiza no atravesar la superficie) hasta que $f(\\mathbf{p})\\approx 0$. La **normal** se obtiene del gradiente de la SDF.' },
    { tipo: 'formula', latex: '\\mathbf{p}_{k+1} = \\mathbf{p}_k + f(\\mathbf{p}_k)\\,\\hat{\\mathbf{d}}, \\qquad \\mathbf{n} = \\dfrac{\\nabla f(\\mathbf{p})}{\\lVert \\nabla f(\\mathbf{p})\\rVert}' },

    { tipo: 'subtitulo', texto: 'Conversión CSG → B-rep: Marching Cubes' },
    { tipo: 'parrafo', texto: 'Para obtener una **malla** a partir de un campo escalar/SDF se usa **Marching Cubes** (Lorensen & Cline, 1987): se recorre una rejilla de cubos; en cada cubo se evalúa el signo del campo en sus **8 vértices**, lo que da $2^8=256$ configuraciones (reducibles a **15 casos base** por simetría), y se generan los triángulos que aproximan la superficie interpolando sobre las aristas.' },
    { tipo: 'imagen', src: '/img/expos/csg-vs-brep/marching-cubes.webp', alt: 'Marching Cubes', caption: '**Marching Cubes**: según el signo del campo en los 8 vértices del cubo se eligen los triángulos (15 casos base).' },

    { tipo: 'subtitulo', texto: 'Tabla comparativa CSG vs B-rep' },
    { tipo: 'tabla', headers: ['Criterio', 'CSG', 'B-rep'], filas: [
      ['Naturaleza', 'Procedimental (árbol de operaciones)', 'Explícita (caras, aristas, vértices)'],
      ['Validez', 'Siempre válido por construcción', 'Requiere mantener coherencia topológica'],
      ['Memoria', 'Muy compacto', 'Mayor (toda la frontera)'],
      ['Edición', 'Fácil (cambiar el árbol)', 'Compleja (operadores de Euler)'],
      ['Render directo', 'No (hay que evaluar/mallar)', 'Sí (caras listas)'],
      ['Formas libres', 'Limitado a primitivas', 'Superficies NURBS arbitrarias'],
    ] },

    { tipo: 'subtitulo', texto: 'Validez topológica: Euler-Poincaré' },
    { tipo: 'parrafo', texto: 'La conversión a B-rep debe producir una malla válida. Se verifica con **Euler-Poincaré**:' },
    { tipo: 'formula', latex: 'V - E + F - R = 2(S - H)', nota: 'Para un sólido simple: $V-E+F=2$. Detecta agujeros ($H$) y cavidades ($S$).' },
    { tipo: 'nota', estilo: 'clave', texto: 'También hay que garantizar **orientación consistente**: cada arista compartida se recorre en sentidos opuestos por sus dos caras, para que las normales apunten hacia afuera.' },

    { tipo: 'subtitulo', texto: 'Aplicaciones industriales' },
    { tipo: 'lista', items: [
      'CAD paramétrico (SolidWorks, Fusion 360): historial CSG + B-rep visual.',
      'Modelado por SDF en tiempo real (demoscene, Dreams de Media Molecule).',
      'Impresión 3D y reconstrucción médica (isosuperficies con Marching Cubes desde TC/RM).',
      'Videojuegos: terreno destructible por voxels + Marching Cubes.',
    ] },
  ],

  formulas: [
    { latex: 'A\\cup^{*}B,\\; A\\cap^{*}B,\\; A-^{*}B', desc: 'Booleanas **regularizadas** (clausura del interior).' },
    { latex: 'f_{\\text{esfera}}(\\mathbf{p})=\\lVert\\mathbf{p}-\\mathbf{c}\\rVert-r', desc: 'SDF de una esfera (negativa dentro).' },
    { latex: 'f_{A\\cup B}=\\min(f_A,f_B)', desc: 'Unión de SDFs.' },
    { latex: 'f_{A\\cap B}=\\max(f_A,f_B),\\;\\; f_{A-B}=\\max(f_A,-f_B)', desc: 'Intersección y diferencia de SDFs.' },
    { latex: '\\mathbf{p}_{k+1}=\\mathbf{p}_k+f(\\mathbf{p}_k)\\hat{\\mathbf d}', desc: '**Sphere tracing** (ray marching con SDF).' },
    { latex: '2^8=256 \\to 15', desc: 'Configuraciones de **Marching Cubes** (256 casos, 15 base).' },
    { latex: 'V-E+F-R=2(S-H)', desc: 'Validez topológica (**Euler-Poincaré**).' },
  ],

  ejercicios: [
    { titulo: 'SDF de una caja-esfera', tipo: 'practica', dif: 'media',
      enunciado: 'Se define una esfera con SDF $f_S(\\mathbf p)=\\lVert\\mathbf p\\rVert-1$ y un plano $f_P(\\mathbf p)=p_y$. Escribe la SDF del "medio domo" (media esfera superior) y evalúala en $\\mathbf p=(0,0.5,0)$.',
      pista: 'Media esfera superior = esfera ∩ semiespacio $y\\ge0$; usa $\\max$.',
      solucion: 'La intersección de la esfera con el semiespacio $y\\ge0$ es $f(\\mathbf p)=\\max\\big(\\lVert\\mathbf p\\rVert-1,\\,-p_y\\big)$ (el semiespacio $y\\ge0$ tiene SDF $-p_y$).\nEn $(0,0.5,0)$: $\\lVert\\mathbf p\\rVert-1=0.5-1=-0.5$ y $-p_y=-0.5$; $\\max(-0.5,-0.5)=-0.5<0$ ⇒ el punto está **dentro** del medio domo, a distancia 0.5 de la frontera.' },

    { titulo: 'Booleana con SDFs', tipo: 'practica', dif: 'media',
      enunciado: 'Dos esferas de radio 1 centradas en $(-0.5,0,0)$ y $(0.5,0,0)$. Da la SDF de su **unión** y clasifica el punto $(0,0,0)$.',
      pista: 'Unión = $\\min$ de las dos SDFs.',
      solucion: '$f_1=\\lVert\\mathbf p-(-0.5,0,0)\\rVert-1$, $f_2=\\lVert\\mathbf p-(0.5,0,0)\\rVert-1$, unión $f=\\min(f_1,f_2)$.\nEn el origen: $f_1=0.5-1=-0.5$, $f_2=0.5-1=-0.5$, $f=\\min=-0.5<0$ ⇒ el origen está **dentro** de la unión (en la zona de solape).' },

    { titulo: 'Casos de Marching Cubes', tipo: 'teoria', dif: 'media',
      enunciado: 'Explica por qué hay $256$ configuraciones en Marching Cubes y cómo se reducen a 15 casos base.',
      solucion: 'Cada cubo tiene **8 vértices**, y cada uno puede estar **dentro o fuera** de la isosuperficie (2 estados): $2^8=256$ combinaciones. Muchas son equivalentes por **simetrías** (rotaciones, reflexiones y complemento dentro/fuera), así que se agrupan en **15 casos base** (topológicamente distintos). Para cada caso, una tabla precalculada indica qué triángulos generar; los vértices de los triángulos se interpolan linealmente sobre las aristas del cubo según el valor del campo.', },

    { titulo: 'CSG o B-rep para el problema', tipo: 'teoria', dif: 'media',
      enunciado: 'Un ingeniero necesita (a) modificar cotas de una pieza mecánica en cualquier momento, y (b) exportar la malla exacta para renderizar en un motor. ¿Qué representación conviene en cada caso y por qué el CAD usa ambas?',
      solucion: '(a) **CSG/paramétrico**: el historial de operaciones (árbol) permite cambiar una cota y regenerar; es editable y siempre válido. (b) **B-rep**: da directamente las caras/triángulos para el motor de render. Por eso el CAD moderno es **híbrido**: mantiene el árbol CSG paramétrico para el diseño y evalúa un B-rep para visualizar, medir y exportar.', },

    { titulo: 'Sphere tracing: número de pasos', tipo: 'practica', dif: 'dificil',
      enunciado: 'Un rayo parte a distancia 5 de una esfera y en cada paso avanza exactamente la SDF. Si al acercarse los valores de SDF son 5, 2.5, 1.25, 0.6, 0.3, 0.15…, ¿por qué el sphere tracing puede necesitar muchos pasos cerca de la superficie (grazing) y cómo se mitiga?',
      pista: 'Los pasos se hacen pequeños al acercarse tangencialmente.',
      solucion: 'Cuando el rayo pasa **rasante** (casi tangente) a la superficie, la SDF se mantiene pequeña durante mucho trayecto, así que los avances $f(\\mathbf p_k)$ son diminutos y hacen falta **muchos pasos** para progresar. Se mitiga con: un **número máximo de iteraciones**, un **umbral de convergencia** $\\varepsilon$, y **over-relaxation** (avanzar un poco más de la SDF con control) o *cone tracing*. También ayuda acotar la escena con un volumen envolvente.', },

    { titulo: 'Euler en conversión', tipo: 'practica', dif: 'dificil',
      enunciado: 'Marching Cubes genera una malla con $V=500$, $E=1500$ y produce una superficie cerrada sin agujeros ni cavidades ($R=0,S=1,H=0$). ¿Cuántas caras triangulares debería tener para ser topológicamente válida?',
      pista: 'Euler simple $V-E+F=2$; además en malla triangular cerrada $E=\\tfrac{3F}{2}$.',
      solucion: 'De $E=\\tfrac{3F}{2}$: $F=\\tfrac{2E}{3}=\\tfrac{2\\cdot1500}{3}=1000$ triángulos.\nComprobación con Euler: $V-E+F=500-1500+1000=0\\ne2$. ¡Contradicción! Con $E=1500$ y $F=1000$, $V$ debería ser $502$, no 500. Esto indica que la malla dada **no es topológicamente cerrada/válida** (probablemente tiene bordes abiertos), justo el tipo de fallo que Euler-Poincaré detecta tras Marching Cubes.', },
  ],

  preguntas: [
    { q: 'En CSG, el modelo se almacena como:', opciones: ['Una malla de triángulos', 'Un árbol de primitivas y operaciones booleanas', 'Una imagen de profundidad', 'Un conjunto de píxeles'], correcta: 1, exp: 'Árbol CSG: hojas = primitivas transformadas, nodos internos = booleanas.', dif: 'media' },
    { q: '¿Por qué se usan operaciones booleanas **regularizadas**?', opciones: ['Para ir más rápido', 'Para evitar geometría sin volumen y mantener sólidos válidos', 'Para colorear', 'Para comprimir'], correcta: 1, exp: 'La regularización (clausura del interior) elimina caras/aristas colgantes de dimensión inferior.', dif: 'dificil' },
    { q: 'Una SDF (función de distancia firmada) es negativa cuando el punto está:', opciones: ['Fuera del sólido', 'En la superficie', 'Dentro del sólido', 'En el infinito'], correcta: 2, exp: 'Negativa dentro, cero en la frontera, positiva fuera.', dif: 'media' },
    { q: 'La SDF de una esfera de centro $c$ y radio $r$ es:', opciones: ['$\\lVert p-c\\rVert+r$', '$\\lVert p-c\\rVert-r$', '$r-\\lVert p\\rVert$', '$\\lVert p\\rVert^2-r^2$'], correcta: 1, exp: '$f(p)=\\lVert p-c\\rVert-r$: distancia al centro menos el radio.', dif: 'media' },
    { q: 'La **unión** de dos SDFs se obtiene con:', opciones: ['$\\max(f_A,f_B)$', '$\\min(f_A,f_B)$', '$f_A+f_B$', '$f_A\\cdot f_B$'], correcta: 1, exp: 'Unión = $\\min$; intersección = $\\max$; diferencia = $\\max(f_A,-f_B)$.', dif: 'dificil' },
    { q: 'El **sphere tracing** avanza el rayo en cada paso:', opciones: ['Un valor fijo', 'Una distancia igual a la SDF en el punto actual', 'Hasta el infinito', 'Retrocediendo'], correcta: 1, exp: 'Avanza $f(p_k)$, que es la distancia segura mínima a la superficie, hasta converger.', dif: 'dificil' },
    { q: '**Marching Cubes** genera, por cada cubo, triángulos según:', opciones: ['El color de los vértices', 'El signo del campo en sus 8 vértices', 'La distancia a la cámara', 'La textura'], correcta: 1, exp: 'Los 8 signos dan una de 256 configuraciones (15 base) con una tabla de triángulos.', dif: 'media' },
    { q: '¿Cuántas configuraciones base tiene Marching Cubes tras aplicar simetrías?', opciones: ['8', '15', '64', '256'], correcta: 1, exp: '256 casos ($2^8$) se reducen a 15 casos base por simetría.', dif: 'media' },
    { q: 'Una ventaja de CSG sobre B-rep es:', opciones: ['Render directo sin conversión', 'Ser siempre válido y muy compacto', 'Representar cualquier superficie libre', 'Menos parámetros'], correcta: 1, exp: 'CSG es compacto y siempre válido; su límite es que no da caras listas y se restringe a primitivas.', dif: 'media' },
    { q: 'Una ventaja de B-rep sobre CSG es:', opciones: ['Es más compacto', 'Da directamente las caras para rasterizar y admite NURBS', 'Siempre es válido', 'No necesita topología'], correcta: 1, exp: 'B-rep tiene la frontera explícita (render directo) y representa superficies libres arbitrarias.', dif: 'media' },
    { q: 'La validez topológica de la malla resultante se comprueba con:', opciones: ['La ecuación de render', 'La fórmula de Euler-Poincaré', 'La ley de Snell', 'El z-buffer'], correcta: 1, exp: '$V-E+F-R=2(S-H)$ verifica que no haya agujeros o inconsistencias.', dif: 'media' },
    { q: 'Los CAD modernos suelen usar:', opciones: ['Solo CSG', 'Solo B-rep', 'Un modelo híbrido CSG + B-rep', 'Solo voxels'], correcta: 2, exp: 'Historial paramétrico tipo CSG para editar + B-rep evaluado para visualizar y exportar.', dif: 'media' },
    { q: 'La normal de una superficie definida por SDF se obtiene de:', opciones: ['El color', 'El gradiente $\\nabla f$ normalizado', 'La segunda derivada temporal', 'La posición de la luz'], correcta: 1, exp: 'La normal es $\\nabla f/\\lVert\\nabla f\\rVert$: el gradiente de la distancia apunta perpendicular a la superficie.', dif: 'dificil' },
  ],
};

export default tema;
