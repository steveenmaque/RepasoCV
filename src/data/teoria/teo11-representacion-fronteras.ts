import type { Tema } from '../../lib/types';

const tema: Tema = {
  slug: 'representacion-fronteras',
  seccion: 'teoria',
  codigo: 'TEO 11',
  titulo: 'Representación de Fronteras (B-rep)',
  subtitulo:
    'Descripción de un sólido por su frontera: topología vs geometría, relaciones de adyacencia, estructuras basadas en grafos, aristas aladas (winged-edge), operadores y fórmula de Euler-Poincaré.',
  resumen:
    'B-rep modela el sólido guardando sus caras, aristas y vértices con su topología (adyacencias) y su geometría. Estructuras winged-edge/half-edge, orientación consistente y validez por Euler-Poincaré.',
  tags: ['B-rep', 'Winged-edge', 'Topología', 'Euler-Poincaré', 'Half-edge'],
  color: '#a78bfa',

  teoria: [
    { tipo: 'parrafo', texto: 'La **representación de fronteras** (Boundary Representation, **B-rep**) describe un sólido por la **superficie que lo limita**. En lugar de decir "qué volumen ocupa", enumera las **caras, aristas y vértices** de su frontera y cómo se conectan. Es el modelo dominante en CAD (SolidWorks, CATIA, el kernel Parasolid, etc.).' },

    { tipo: 'subtitulo', texto: 'Idea central: topología + geometría' },
    { tipo: 'parrafo', texto: 'B-rep separa dos tipos de información:' },
    { tipo: 'lista', items: [
      '**Topología:** cómo se conectan los elementos (qué aristas rodean una cara, qué caras comparten una arista, qué vértices toca). Es puramente combinatoria.',
      '**Geometría:** la forma y posición concretas (coordenadas de vértices, ecuaciones de curvas de las aristas y de superficies de las caras).',
    ] },
    { tipo: 'nota', estilo: 'clave', texto: 'La misma **topología** (p. ej. la de un cubo) puede tener distintas **geometrías** (un cubo, un paralelepípedo torcido…). Separarlas permite editar la forma sin recomputar toda la estructura.' },

    { tipo: 'subtitulo', texto: 'Elementos y jerarquía' },
    { tipo: 'parrafo', texto: 'La frontera se organiza jerárquicamente: **Sólido → Cáscaras (shells) → Caras (faces) → Bucles (loops) → Aristas (edges) → Vértices (vertices)**. Un **loop** es un ciclo cerrado de aristas que bordea una cara; una cara puede tener un bucle exterior y varios interiores (agujeros).' },
    { tipo: 'imagen', src: '/img/teoria/representacion-fronteras/jerarquia.webp', alt: 'Jerarquía y relaciones topológicas B-rep', caption: 'Relaciones topológicas entre caras, aristas y vértices en B-rep.' },

    { tipo: 'subtitulo', texto: 'Relaciones topológicas (adyacencia)' },
    { tipo: 'parrafo', texto: 'Entre los tres elementos básicos (V, E, F) hay **9 relaciones de adyacencia** posibles ($V{\\to}V$, $V{\\to}E$, $V{\\to}F$, $E{\\to}V$, …). Una buena estructura de datos permite recorrer estas relaciones en tiempo casi constante; guardar todas explícitamente sería redundante, así que se eligen unas pocas y las demás se derivan.' },

    { tipo: 'subtitulo', texto: 'Estructura basada en grafos' },
    { tipo: 'parrafo', texto: 'La topología se modela como un **grafo**: los elementos son nodos y las adyacencias son enlaces. El reto es responder consultas como "dame todas las aristas de esta cara" o "las dos caras de esta arista" de forma eficiente. De ahí nacen estructuras especializadas.' },

    { tipo: 'subtitulo', texto: 'Aristas aladas (Winged-Edge)' },
    { tipo: 'parrafo', texto: 'Propuesta por **Baumgart (1972)**, es la estructura B-rep clásica. La **arista** es el elemento central y almacena punteros a:' },
    { tipo: 'lista', ordenada: true, items: [
      'Sus **2 vértices** (inicio y fin).',
      'Sus **2 caras** (izquierda y derecha).',
      'Sus **4 aristas "ala"**: predecesora y sucesora en la cara izquierda y en la derecha (recorrido horario/antihorario).',
    ] },
    { tipo: 'parrafo', texto: 'Cada **vértice** y cada **cara** guardan un puntero a una de sus aristas. Con esto se recorre toda la topología en tiempo constante por paso.' },
    { tipo: 'imagen', src: '/img/teoria/representacion-fronteras/winged-edge.webp', alt: 'Estructura de arista alada', caption: 'La **arista alada** referencia 2 vértices, 2 caras y 4 aristas vecinas (sus "alas").' },
    { tipo: 'nota', estilo: 'info', texto: 'La estructura **half-edge (media arista)** es una alternativa moderna muy usada: cada arista se parte en dos medias aristas orientadas opuestas, simplificando los recorridos direccionales.' },

    { tipo: 'subtitulo', texto: 'Ejemplo: el tetraedro' },
    { tipo: 'parrafo', texto: 'El tetraedro tiene $V=4$, $E=6$, $F=4$. Cumple Euler: $4-6+4=2$. En winged-edge se guardarían 4 vértices, 4 caras (triángulos) y 6 aristas, cada una con sus 2 vértices, sus 2 caras y sus 4 alas. Es el caso mínimo para practicar el llenado de la estructura.' },
    { tipo: 'tabla', headers: ['Elemento', 'Cantidad', 'Ejemplos'], filas: [
      ['Vértices (V)', '4', '$v_1,v_2,v_3,v_4$'],
      ['Aristas (E)', '6', '$v_1v_2,\\;v_1v_3,\\;v_1v_4,\\;v_2v_3,\\;v_2v_4,\\;v_3v_4$'],
      ['Caras (F)', '4', 'triángulos $v_1v_2v_3$, …'],
    ] },

    { tipo: 'subtitulo', texto: 'Orientación consistente de caras' },
    { tipo: 'parrafo', texto: 'Para que la frontera sea coherente, todas las caras deben orientarse igual (p. ej. vértices en sentido **antihorario** vistos desde fuera), de modo que las **normales apunten hacia afuera**. Regla práctica: cada arista interior debe ser recorrida en **sentidos opuestos** por sus dos caras. Esto es esencial para el sombreado, el *back-face culling* y las operaciones booleanas.' },

    { tipo: 'subtitulo', texto: 'Validez: fórmula de Euler-Poincaré' },
    { tipo: 'parrafo', texto: 'Generaliza la relación de Euler a sólidos con agujeros pasantes y cavidades. Es la condición de validez topológica de un B-rep:' },
    { tipo: 'formula', latex: 'V - E + F - R = 2\\,(S - H)', nota: '$V$ vértices, $E$ aristas, $F$ caras, $R$ bucles interiores (agujeros en caras), $S$ cáscaras (shells), $H$ asas/agujeros pasantes (género).' },
    { tipo: 'parrafo', texto: 'Para un sólido simple ($R=0$, $S=1$, $H=0$) se reduce a $V-E+F=2$. Un toro (1 asa) da $V-E+F=0$.' },
    { tipo: 'subtitulo', texto: 'Operadores de Euler' },
    { tipo: 'parrafo', texto: 'Los **operadores de Euler** (MEV — *make edge-vertex*, MEF — *make edge-face*, MVFS, KEL…) construyen y editan B-reps garantizando que **cada paso mantenga la fórmula de Euler-Poincaré**, es decir, que el modelo siga siendo válido en todo momento.' },
  ],

  formulas: [
    { latex: 'V - E + F - R = 2(S - H)', desc: 'Fórmula de **Euler-Poincaré** (validez B-rep general).' },
    { latex: 'V - E + F = 2', desc: 'Caso simple ($R=0,S=1,H=0$): sin agujeros.' },
    { latex: '\\text{arista} \\to \\{2V,\\,2F,\\,4E_{ala}\\}', desc: 'Contenido de una **arista alada** (winged-edge).' },
    { latex: 'V - E + F = 2(1 - g)', desc: 'Relación con el **género** $g$ (nº de asas) de la superficie.' },
  ],

  ejercicios: [
    { titulo: 'Euler-Poincaré en un toro', tipo: 'practica', dif: 'media',
      enunciado: 'Un modelo B-rep de un toro (dona) se malla con $V=16$ vértices y $F=16$ caras cuadrangulares. ¿Cuántas aristas tiene y qué valor de $H$ (asas) confirma la fórmula?',
      pista: 'Cada cara cuadrangular tiene 4 aristas y cada arista la comparten 2 caras: $E=\\tfrac{4F}{2}$. Toro: $S=1,R=0$.',
      solucion: 'Aristas: $E=\\tfrac{4\\cdot16}{2}=32$.\nEuler-Poincaré: $V-E+F-R=2(S-H)\\Rightarrow 16-32+16-0=0=2(1-H)\\Rightarrow 1-H=0\\Rightarrow H=1$.\nEfectivamente el toro tiene **1 asa** (género 1). ✓' },

    { titulo: 'Llenar una arista alada', tipo: 'practica', dif: 'dificil',
      enunciado: 'En un cubo, considera la arista $e$ entre los vértices $A$ y $B$, compartida por las caras superior ($F_1$) e frontal ($F_2$). Indica qué campos guardaría $e$ en una estructura winged-edge.',
      pista: 'Recuerda: 2 vértices, 2 caras y 4 aristas ala.',
      solucion: '$e$ guarda: **vértices** $\\{A,B\\}$; **caras** $\\{F_1 (\\text{izq}), F_2 (\\text{der})\\}$; y **4 alas**: la arista predecesora y sucesora de $e$ al recorrer $F_1$, y la predecesora y sucesora al recorrer $F_2$. Con esos 4 punteros se puede "girar" alrededor de una cara o de un vértice sin buscar linealmente. Ej.: la sucesora en $F_1$ es la arista de la cara superior que continúa desde $B$.' },

    { titulo: 'Orientación consistente', tipo: 'teoria', dif: 'media',
      enunciado: 'Enuncia la regla que garantiza que dos caras adyacentes tienen orientación consistente y por qué importa para el render.',
      solucion: 'Regla: **cada arista compartida debe recorrerse en sentidos opuestos por sus dos caras**. Si la cara $F_1$ recorre la arista $A\\to B$, la cara $F_2$ debe recorrerla $B\\to A$. Esto asegura que ambas normales (calculadas por la regla de la mano derecha del loop) apunten hacia afuera. Importa para el **back-face culling** (descartar caras traseras), el sombreado correcto (normales bien orientadas) y las operaciones booleanas (clasificación dentro/fuera).' },

    { titulo: 'B-rep vs CSG', tipo: 'teoria', dif: 'media',
      enunciado: 'Da dos ventajas de B-rep frente a CSG y una desventaja.',
      solucion: '**Ventajas de B-rep:** (1) acceso directo a la frontera (caras) → se rasteriza y consulta geometría de superficie sin evaluar un árbol; (2) representa formas con caras de forma libre y consultas topológicas rápidas (adyacencias). **Desventaja:** es más complejo de mantener **válido** ante ediciones (hay que preservar la coherencia topológica con operadores de Euler), mientras que CSG es siempre válido por construcción y más compacto.' },

    { titulo: 'Número de aristas por conteo de caras', tipo: 'practica', dif: 'media',
      enunciado: 'Un icosaedro tiene 20 caras triangulares y 12 vértices. Halla las aristas de dos formas (por caras y por Euler) y comprueba que coinciden.',
      pista: '$E=\\tfrac{3F}{2}$ y $E=V+F-2$.',
      solucion: 'Por caras: $E=\\tfrac{3\\cdot20}{2}=30$.\nPor Euler: $E=V+F-2=12+20-2=30$. ✓ Ambas dan 30 aristas.' },

    { titulo: 'Sólido con cavidad', tipo: 'practica', dif: 'dificil',
      enunciado: 'Un cubo macizo contiene en su interior una cavidad cúbica hueca (dos cáscaras, sin conexión). Si en total $V=16,E=24,F=12,R=0,H=0$, ¿cuántas cáscaras $S$ predice Euler-Poincaré?',
      pista: 'Despeja $S$ en $V-E+F-R=2(S-H)$.',
      solucion: '$V-E+F-R = 16-24+12-0 = 4 = 2(S-H)=2S$ (con $H=0$) $\\Rightarrow S=2$.\nHay **2 cáscaras**: la superficie externa del cubo y la superficie interna de la cavidad. La fórmula detecta correctamente el hueco interior como una segunda shell.' },
  ],

  preguntas: [
    { q: 'B-rep describe un sólido mediante:', opciones: ['Un árbol de operaciones booleanas', 'Su frontera: caras, aristas y vértices con su topología y geometría', 'Una rejilla de voxels', 'Solo sus vértices'], correcta: 1, exp: 'Boundary Representation guarda la superficie que limita el sólido y cómo se conectan sus elementos.', dif: 'media' },
    { q: 'En B-rep se separan explícitamente:', opciones: ['Color y textura', 'Topología (conexiones) y geometría (forma/posición)', 'Luz y sombra', 'Vértices y colores'], correcta: 1, exp: 'La topología es combinatoria (adyacencias); la geometría son coordenadas y ecuaciones. Separarlas facilita la edición.', dif: 'media' },
    { q: 'La estructura de datos clásica de B-rep propuesta por Baumgart es:', opciones: ['El octree', 'La arista alada (winged-edge)', 'El z-buffer', 'El árbol CSG'], correcta: 1, exp: 'Baumgart (1972) propuso la winged-edge, centrada en la arista.', dif: 'media' },
    { q: 'Una arista en winged-edge guarda punteros a:', opciones: ['1 vértice y 1 cara', '2 vértices, 2 caras y 4 aristas ala', '3 caras y 3 vértices', 'Solo sus 2 vértices'], correcta: 1, exp: 'Referencia sus 2 vértices, sus 2 caras adyacentes y 4 aristas vecinas (predecesora/sucesora en cada cara).', dif: 'dificil' },
    { q: 'La fórmula de Euler-Poincaré general es:', opciones: ['$V-E+F=2$', '$V-E+F-R=2(S-H)$', '$V+E+F=0$', '$V-E-F=2S$'], correcta: 1, exp: '$V-E+F-R=2(S-H)$, con $R$ bucles interiores, $S$ cáscaras y $H$ asas (género).', dif: 'dificil' },
    { q: 'Para un sólido simple sin agujeros, Euler-Poincaré se reduce a:', opciones: ['$V-E+F=0$', '$V-E+F=2$', '$V-E+F=1$', '$V=E$'], correcta: 1, exp: 'Con $R=0, S=1, H=0$ queda $V-E+F=2$.', dif: 'media' },
    { q: 'La orientación consistente exige que una arista compartida:', opciones: ['Se recorra igual por ambas caras', 'Se recorra en sentidos opuestos por sus dos caras', 'No pertenezca a ninguna cara', 'Tenga 3 caras'], correcta: 1, exp: 'Sentidos opuestos ⇒ ambas normales apuntan hacia afuera; base del culling y del sombreado.', dif: 'dificil' },
    { q: 'Un **loop** en B-rep es:', opciones: ['Un bucle de código', 'Un ciclo cerrado de aristas que bordea una cara', 'Un vértice repetido', 'Una cáscara'], correcta: 1, exp: 'Un loop es el ciclo de aristas que delimita una cara; puede haber uno exterior y varios interiores (agujeros).', dif: 'media' },
    { q: 'Los **operadores de Euler** (MEV, MEF…) sirven para:', opciones: ['Renderizar más rápido', 'Construir/editar B-reps manteniendo la validez topológica', 'Comprimir texturas', 'Calcular iluminación'], correcta: 1, exp: 'Cada operador modifica el modelo preservando la fórmula de Euler-Poincaré, garantizando validez en cada paso.', dif: 'dificil' },
    { q: 'Para un toro (1 asa), la relación de Euler da:', opciones: ['$V-E+F=2$', '$V-E+F=0$', '$V-E+F=1$', '$V-E+F=4$'], correcta: 1, exp: 'Género 1: $V-E+F=2(1-g)=0$.', dif: 'dificil' },
    { q: 'La estructura **half-edge (media arista)** se caracteriza por:', opciones: ['No usar punteros', 'Partir cada arista en dos medias aristas orientadas opuestas', 'Guardar solo caras', 'Ser igual que el octree'], correcta: 1, exp: 'Cada arista se divide en dos half-edges con dirección opuesta, simplificando recorridos direccionales.', dif: 'media' },
    { q: '¿Cuántas relaciones de adyacencia posibles hay entre V, E y F?', opciones: ['3', '6', '9', '12'], correcta: 2, exp: 'Las combinaciones ordenadas de {V,E,F}×{V,E,F} dan 9 relaciones topológicas.', dif: 'dificil' },
    { q: 'Una desventaja de B-rep frente a CSG es:', opciones: ['Ocupa poca memoria', 'Es más difícil mantenerlo válido ante ediciones', 'No puede rasterizarse', 'No representa caras'], correcta: 1, exp: 'B-rep requiere cuidar la coherencia topológica (operadores de Euler); CSG es siempre válido por construcción.', dif: 'media' },
    { q: 'En el tetraedro, ¿cuántas aristas hay?', opciones: ['4', '5', '6', '8'], correcta: 2, exp: '$V=4,F=4 \\Rightarrow E=V+F-2=6$.', dif: 'media' },
    { q: 'El parámetro $S$ en Euler-Poincaré representa:', opciones: ['Superficie total', 'Número de cáscaras (shells) del sólido', 'Suavidad', 'Escala'], correcta: 1, exp: '$S$ = número de cáscaras conexas; un sólido con una cavidad interior tiene $S=2$.', dif: 'dificil' },
  ],
};

export default tema;
