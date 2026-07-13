import type { Tema } from '../../lib/types';

const tema: Tema = {
  slug: 'modelado-solidos',
  seccion: 'teoria',
  codigo: 'TEO 10',
  titulo: 'Representación y Modelado de Sólidos',
  subtitulo:
    'Qué es un sólido válido, esquemas de representación (alámbrica, enumeración espacial, octrees, CSG, B-rep, barrido), mallas poligonales, poliedros regulares y la fórmula de Euler.',
  resumen:
    'Modelos matemáticos para representar objetos 3D sólidos: propiedades de validez, ventajas y límites de cada esquema (wireframe, voxels/octrees, CSG, B-rep, sweep) y la relación de Euler.',
  tags: ['Sólidos', 'Wireframe', 'CSG', 'Octree', 'Euler', 'Mallado'],
  color: '#22d3ee',

  teoria: [
    { tipo: 'parrafo', texto: '**Modelar un sólido** es construir una representación computacional de un objeto 3D que capture no solo su superficie, sino el hecho de que **encierra un volumen**. A diferencia de un simple conjunto de caras, un modelo sólido "sabe" qué está dentro y qué está fuera, lo que permite calcular volumen, masa, colisiones o imprimir en 3D.' },

    { tipo: 'subtitulo', texto: '¿Qué es un sólido? Sólidos válidos (realizables)' },
    { tipo: 'parrafo', texto: 'Formalmente, un sólido es un subconjunto de $\\mathbb{R}^3$ que es **acotado**, **cerrado** y **regular** (coincide con la clausura de su interior). Un modelo es **realizable/válido** si corresponde a un objeto físico posible. Las propiedades exigidas son:' },
    { tipo: 'lista', items: [
      '**Rigidez:** la forma no depende de su posición u orientación.',
      '**Finitud (acotado):** ocupa una región limitada del espacio.',
      '**Homogeneidad / cierre:** no tiene caras, aristas o vértices "colgantes" (sin volumen). La frontera separa limpiamente interior y exterior.',
      '**Frontera determinada:** su superficie es una variedad cerrada (2-manifold) y orientable.',
      '**Cierre bajo operaciones:** operar dos sólidos válidos (unión, intersección…) debe dar otro sólido válido (operaciones *regularizadas*).',
    ] },
    { tipo: 'nota', estilo: 'aviso', texto: 'Un cubo con una cara suelta flotando, o dos cubos que se tocan solo en una arista, **no** son sólidos válidos: generan geometría de dimensión inferior sin volumen.' },

    { tipo: 'subtitulo', texto: 'Esquemas de representación' },
    { tipo: 'parrafo', texto: 'No existe una representación única ideal; cada esquema equilibra memoria, exactitud y facilidad de operar. Los principales:' },

    { tipo: 'subtitulo', texto: '1) Representación alámbrica (wireframe)' },
    { tipo: 'parrafo', texto: 'Guarda solo **vértices y aristas**. Es muy ligera y rápida de dibujar, pero **ambigua**: no distingue caras ni interior/exterior, y una misma malla de aristas puede interpretarse como varios sólidos distintos (p. ej. el cubo de Necker).' },
    { tipo: 'imagen', src: '/img/teoria/modelado-solidos/wireframe.webp', alt: 'Representación alámbrica de un sólido', caption: 'Modelo **alámbrico**: solo aristas y vértices. Rápido pero ambiguo (no sabe qué caras existen).' },

    { tipo: 'subtitulo', texto: '2) Enumeración espacial: voxels y octrees' },
    { tipo: 'parrafo', texto: 'El espacio se divide en celdas (**voxels**) marcadas como llenas o vacías. Es exacto para clasificar puntos pero costoso en memoria ($O(n^3)$). El **octree** lo optimiza: subdivide recursivamente solo las celdas de frontera, agrupando regiones homogéneas grandes en un único nodo.' },
    { tipo: 'formula', latex: '\\text{Memoria voxels} \\sim O(n^3), \\qquad \\text{octree} \\sim O(n^2)\\;\\text{(solo la superficie)}', nota: 'Un octree usa nodos "blanco", "negro" y "gris" (mezcla, que se subdivide).' },

    { tipo: 'subtitulo', texto: '3) Geometría constructiva de sólidos (CSG)' },
    { tipo: 'parrafo', texto: 'Combina **primitivas** simples (cubo, esfera, cilindro, cono) mediante **operaciones booleanas regularizadas** (unión $\\cup^*$, intersección $\\cap^*$, diferencia $-^*$). El modelo se guarda como un **árbol** cuyas hojas son primitivas transformadas y los nodos internos son operaciones. Es compacto, siempre válido y fácil de editar, pero no da directamente las caras para rasterizar.' },

    { tipo: 'subtitulo', texto: '4) Representación de fronteras (B-rep)' },
    { tipo: 'parrafo', texto: 'Describe el sólido por su **frontera**: caras, aristas y vértices con su **topología** (qué toca qué) y su **geometría** (posiciones, ecuaciones de las caras). Es el esquema de CAD por excelencia (se detalla en TEO 11).' },

    { tipo: 'subtitulo', texto: '5) Barrido (sweep)' },
    { tipo: 'parrafo', texto: 'Genera un sólido moviendo un perfil 2D a lo largo de una trayectoria: **extrusión** (traslación) o **revolución** (giro alrededor de un eje). Es muy intuitivo para piezas mecánicas.' },

    { tipo: 'subtitulo', texto: 'Mallas y caras poligonales' },
    { tipo: 'parrafo', texto: 'Para visualizar, casi todo se convierte a un **mallado poligonal** (normalmente triángulos): un conjunto de caras planas que aproximan la superficie. Es lo que la GPU rasteriza. A más polígonos, más fidelidad y más costo.' },
    { tipo: 'imagen', src: '/img/teoria/modelado-solidos/mallado.webp', alt: 'Mallado poligonal', caption: 'Aproximación de una superficie por **caras poligonales** (malla de triángulos).' },

    { tipo: 'subtitulo', texto: 'Poliedros regulares y la fórmula de Euler' },
    { tipo: 'parrafo', texto: 'Un **poliedro regular** (sólido platónico) tiene todas las caras iguales y regulares y el mismo número de aristas en cada vértice. Solo existen **cinco**: tetraedro, hexaedro (cubo), octaedro, dodecaedro e icosaedro. Todos cumplen la **relación de Euler** para poliedros simples (sin agujeros):' },
    { tipo: 'formula', latex: 'V - E + F = 2', nota: '$V$ vértices, $E$ aristas, $F$ caras. Ej.: cubo $8-12+6=2$. ✓' },
    { tipo: 'tabla', headers: ['Sólido', 'V', 'E', 'F', 'V−E+F'], filas: [
      ['Tetraedro', '4', '6', '4', '2'],
      ['Cubo', '8', '12', '6', '2'],
      ['Octaedro', '6', '12', '8', '2'],
      ['Dodecaedro', '20', '30', '12', '2'],
      ['Icosaedro', '12', '30', '20', '2'],
    ] },

    { tipo: 'subtitulo', texto: 'Aplicaciones' },
    { tipo: 'lista', items: [
      '**CAD/CAM** e ingeniería (piezas, planos, tolerancias).',
      '**Impresión 3D** (requiere sólidos cerrados y válidos, *watertight*).',
      '**Simulación** física, análisis por elementos finitos (FEM), cálculo de masa/volumen.',
      '**Videojuegos y cine** (colisiones, mallas de render).',
      '**Medicina** (modelos anatómicos a partir de TC/RM).',
    ] },
  ],

  formulas: [
    { latex: 'V - E + F = 2', desc: 'Relación de **Euler** para poliedros simples (sin agujeros).' },
    { latex: '\\cup^{*},\\; \\cap^{*},\\; -^{*}', desc: 'Operaciones booleanas **regularizadas** (mantienen validez del sólido).' },
    { latex: '\\text{voxels } O(n^3)\\;\\to\\;\\text{octree } O(n^2)', desc: 'Ahorro de memoria de la enumeración espacial con octrees.' },
    { latex: 'S=\\text{clausura}(\\text{interior}(S))', desc: 'Condición de **regularidad** de un sólido válido.' },
  ],

  ejercicios: [
    { titulo: 'Validez de un modelo', tipo: 'teoria', dif: 'media',
      enunciado: 'Explica por qué un modelo formado por 6 cuadrados que comparten aristas pero con una cara **invertida** (normal hacia adentro) puede no ser un sólido válido para impresión 3D.',
      solucion: 'Un sólido válido necesita una **frontera orientable y consistente**: todas las normales apuntando hacia afuera. Si una cara está invertida, el algoritmo de "point-in-solid" (que cuenta cruces o usa el sentido de las normales) clasificará mal el interior/exterior en esa zona, y el modelo deja de ser *watertight*/orientable. Para impresión 3D esto produce errores de laminado (el slicer no sabe dónde hay material).' },

    { titulo: 'Verificar Euler', tipo: 'practica', dif: 'media',
      enunciado: 'Un octaedro tiene 6 vértices y 8 caras triangulares. Calcula el número de aristas usando la relación de Euler y verifícalo contando aristas por caras.',
      pista: 'Euler: $V-E+F=2$. Además cada arista es compartida por 2 caras: $E=\\tfrac{3F}{2}$.',
      solucion: 'Por Euler: $E=V+F-2=6+8-2=12$.\nComprobación: cada triángulo tiene 3 aristas y cada arista la comparten 2 caras, así $E=\\tfrac{3\\cdot8}{2}=12$. ✓' },

    { titulo: 'CSG: árbol booleano', tipo: 'practica', dif: 'media',
      enunciado: 'Describe un árbol CSG para modelar una **tuerca hexagonal**: un prisma hexagonal con un agujero cilíndrico roscado (ignora la rosca).',
      pista: 'La diferencia regularizada quita material.',
      solucion: 'Árbol: `Prisma_hex  −*  Cilindro` (raíz = diferencia). La hoja izquierda es el prisma hexagonal (por barrido de un hexágono) y la derecha un cilindro centrado y alineado con el eje. La **diferencia regularizada** $-^{*}$ perfora el agujero. Si además quisiéramos un chaflán, se intersecta con un cono/tronco. El resultado siempre es un sólido válido porque las operaciones regularizadas preservan la validez.' },

    { titulo: 'Voxels vs octree', tipo: 'practica', dif: 'dificil',
      enunciado: 'Una escena se representa con una rejilla de $256^3$ voxels. Si el objeto ocupa una esfera hueca (solo su cáscara es frontera), estima el orden de nodos que usaría un octree frente a la enumeración densa.',
      pista: 'La densa es $O(n^3)$; el octree solo subdivide la frontera, $\\sim O(n^2)$.',
      solucion: 'Enumeración densa: $256^3 = 16\\,777\\,216$ celdas (todas almacenadas).\nOctree: solo subdivide donde hay **frontera**; el resto se agrupa en nodos homogéneos grandes. Como la frontera de una esfera es una superficie 2D, el número de nodos de frontera crece como $O(n^2)\\approx 256^2 = 65\\,536$ (más los nodos internos del árbol). El ahorro es de ~2 órdenes de magnitud. Por eso los octrees/SVOs se usan para volúmenes dispersos.' },

    { titulo: 'Barrido por revolución', tipo: 'practica', dif: 'media',
      enunciado: '¿Qué sólido genera la revolución de un rectángulo alrededor de un eje **exterior y paralelo** a uno de sus lados? ¿Y si el eje coincide con un lado?',
      solucion: 'Con el eje **exterior paralelo**: se genera un **anillo/toro de sección rectangular** (un cilindro hueco si el rectángulo no toca el eje). Con el eje **coincidente con un lado**: se genera un **cilindro macizo** (el lado sobre el eje se convierte en el eje del cilindro). El barrido por revolución integra el perfil 360° alrededor del eje.' },

    { titulo: 'Ambigüedad del wireframe', tipo: 'teoria', dif: 'dificil',
      enunciado: 'Da un ejemplo concreto de por qué una representación **alámbrica** es ambigua y qué información adicional resuelve la ambigüedad.',
      solucion: 'El clásico **cubo de Necker**: un conjunto de 12 aristas puede leerse con dos orientaciones distintas (qué cara está al frente). Con solo vértices y aristas no se puede decidir qué **caras** existen ni cuáles son visibles, ni distinguir interior de exterior. La ambigüedad se resuelve pasando a **B-rep**, que añade explícitamente las **caras** con su topología y orientación (normales), o a un modelo volumétrico (voxels/CSG).' },

    { titulo: 'Costo de un mallado', tipo: 'practica', dif: 'media',
      enunciado: 'Una esfera se aproxima por una malla que duplica sus triángulos en cada nivel de subdivisión (empezando en un icosaedro de 20 caras). ¿Cuántos triángulos hay en el nivel 4 y por qué crece el costo?',
      pista: 'Cada subdivisión ×4 (cada triángulo → 4).',
      solucion: 'Una subdivisión de Loop/4-to-1 multiplica por 4: $20\\cdot4^{4}=20\\cdot256=5120$ triángulos en el nivel 4. El costo de render/almacenamiento crece **geométricamente**, mientras el error de aproximación decrece; por eso se usan mallas adaptativas o LOD (nivel de detalle) en vez de subdividir uniformemente.' },
  ],

  preguntas: [
    { q: 'Un sólido válido debe ser, entre otras cosas:', opciones: ['Explícito y plano', 'Acotado, cerrado y regular (sin geometría colgante)', 'Siempre convexo', 'Representado solo por aristas'], correcta: 1, exp: 'Debe ser acotado, cerrado y regular: su frontera separa limpiamente interior de exterior, sin caras/aristas sueltas.', dif: 'media' },
    { q: 'La principal desventaja de la representación **alámbrica** es que:', opciones: ['Ocupa mucha memoria', 'Es ambigua: no define caras ni interior/exterior', 'No se puede dibujar rápido', 'Solo sirve para esferas'], correcta: 1, exp: 'Guarda solo vértices y aristas, por lo que una misma malla puede corresponder a varios sólidos (ambigüedad).', dif: 'media' },
    { q: '¿Qué estructura optimiza la memoria de la enumeración espacial por voxels?', opciones: ['El árbol CSG', 'El octree', 'La lista de aristas aladas', 'El z-buffer'], correcta: 1, exp: 'El octree subdivide recursivamente solo las celdas de frontera (nodos "grises"), agrupando regiones homogéneas.', dif: 'media' },
    { q: 'En CSG, las operaciones booleanas deben ser **regularizadas** para:', opciones: ['Ir más rápido', 'Evitar generar caras/aristas sin volumen y mantener sólidos válidos', 'Ahorrar colores', 'Poder usar wireframe'], correcta: 1, exp: 'Las operaciones regularizadas ($\\cup^*,\\cap^*,-^*$) eliminan resultados de dimensión inferior, garantizando que el resultado sea un sólido válido.', dif: 'dificil' },
    { q: '¿Cuántos poliedros regulares (sólidos platónicos) existen?', opciones: ['3', '4', '5', 'Infinitos'], correcta: 2, exp: 'Exactamente cinco: tetraedro, cubo, octaedro, dodecaedro e icosaedro.', dif: 'media' },
    { q: 'La relación de Euler para poliedros simples es:', opciones: ['$V+E+F=2$', '$V-E+F=2$', '$V-E-F=0$', '$E=V+F$'], correcta: 1, exp: '$V-E+F=2$ para poliedros sin agujeros; p. ej. el cubo: $8-12+6=2$.', dif: 'media' },
    { q: 'El modelo CSG se almacena típicamente como:', opciones: ['Una malla de triángulos', 'Un árbol de primitivas y operaciones booleanas', 'Una rejilla de voxels', 'Una lista de aristas'], correcta: 1, exp: 'Un árbol binario: hojas = primitivas transformadas, nodos internos = operaciones booleanas.', dif: 'media' },
    { q: 'El **barrido por revolución** genera un sólido:', opciones: ['Extruyendo un perfil en línea recta', 'Girando un perfil 2D alrededor de un eje', 'Restando dos primitivas', 'Subdividiendo triángulos'], correcta: 1, exp: 'La revolución rota el perfil 360° alrededor de un eje (p. ej. un rectángulo → cilindro).', dif: 'media' },
    { q: 'Para **impresión 3D** un modelo debe ser sobre todo:', opciones: ['Alámbrico', 'Cerrado y orientable (watertight)', 'De baja resolución', 'Convexo'], correcta: 1, exp: 'Necesita una frontera cerrada y con normales consistentes para que el slicer distinga material de vacío.', dif: 'media' },
    { q: '¿Qué representación es el estándar en CAD por describir explícitamente la frontera?', opciones: ['Wireframe', 'Voxels', 'B-rep', 'Sweep'], correcta: 2, exp: 'La representación de fronteras (B-rep) guarda caras, aristas y vértices con topología y geometría; es la base del CAD.', dif: 'media' },
    { q: 'En un octree, un nodo "gris" representa:', opciones: ['Una celda totalmente llena', 'Una celda totalmente vacía', 'Una celda mixta que debe subdividirse', 'El color de la superficie'], correcta: 2, exp: 'Negro = lleno, blanco = vacío, gris = mezcla (frontera) que se subdivide en 8 hijos.', dif: 'dificil' },
    { q: 'Una malla poligonal aproxima una superficie curva con:', opciones: ['Ecuaciones implícitas', 'Caras planas (normalmente triángulos)', 'Voxels', 'Operaciones booleanas'], correcta: 1, exp: 'La malla usa caras planas; a mayor número de polígonos, mejor aproximación y mayor costo.', dif: 'media' },
    { q: 'La propiedad de **cierre** bajo operaciones significa que:', opciones: ['El sólido está pintado', 'Operar dos sólidos válidos produce otro sólido válido', 'El sólido es cerrado topológicamente', 'No se puede modificar'], correcta: 1, exp: 'El esquema debe garantizar que combinar sólidos válidos (con operaciones regularizadas) dé de nuevo un sólido válido.', dif: 'dificil' },
    { q: 'Comparado con voxels densos, un octree para una superficie escala aprox. como:', opciones: ['$O(n^3)$', '$O(n^2)$', '$O(\\log n)$', '$O(1)$'], correcta: 1, exp: 'Como solo refina la frontera (2D), el número de nodos crece como $O(n^2)$ frente a $O(n^3)$ de la rejilla densa.', dif: 'dificil' },
    { q: 'El dodecaedro tiene 20 vértices y 30 aristas. ¿Cuántas caras según Euler?', opciones: ['10', '12', '15', '20'], correcta: 1, exp: '$F=2-V+E=2-20+30=12$ caras pentagonales.', dif: 'media' },
    { q: '¿Cuál NO es una ventaja del CSG?', opciones: ['Modelo compacto', 'Siempre produce sólidos válidos', 'Da directamente las caras para rasterizar sin conversión', 'Fácil de editar el árbol'], correcta: 2, exp: 'CSG es compacto, válido y editable, pero NO entrega directamente la frontera poligonal: hay que evaluarlo (p. ej. con marching cubes o ray casting) para rasterizar.', dif: 'dificil' },
  ],
};

export default tema;
