import type { Examen } from '../../lib/types';

const examen: Examen = {
  slug: 'final-solidos-fronteras',
  codigo: 'Simulacro Final 02',
  titulo: 'Modelado de Sólidos y Representación de Fronteras',
  descripcion:
    'Formato del parcial aplicado a la 2.ª mitad del curso: Verdadero/Falso teórico + ejercicios de aplicación (fórmula de Euler, operaciones booleanas con SDF, octrees, vóxeles, barridos) resueltos paso a paso.',
  fuente:
    'Mäntylä, "An Introduction to Solid Modeling" · Foley, van Dam et al., "Computer Graphics: Principles and Practice" (cap. 12) · Hearn & Baker, "Computer Graphics with OpenGL" (cap. 8).',
  duracion: '90 min',
  temas: ['CSG', 'B-rep', 'Euler–Poincaré', 'Octrees / vóxeles', 'SDF', 'Barridos', 'Marching Cubes'],
  color: '#22d3ee',

  verdaderoFalso: [
    {
      afirmacion: 'La fórmula de Euler para un poliedro simple (sin agujeros) es $V - A + C = 2$, donde $V$=vértices, $A$=aristas y $C$=caras.',
      esVerdadero: true,
      justificacion: 'Es la característica de Euler de un sólido de género 0. Para un cubo: $8-12+6=2$. ✔',
    },
    {
      afirmacion: 'La Geometría Constructiva de Sólidos (CSG) representa el objeto directamente por sus caras, aristas y vértices.',
      esVerdadero: false,
      justificacion: 'Eso es la **representación de fronteras (B-rep)**. CSG describe el sólido como un **árbol de operaciones booleanas** (unión, intersección, diferencia) sobre primitivas.',
    },
    {
      afirmacion: 'En la representación de fronteras (B-rep) se almacenan por separado la geometría (coordenadas) y la topología (relaciones de adyacencia).',
      esVerdadero: true,
      justificacion: 'La topología dice qué caras/aristas/vértices se conectan; la geometría da sus posiciones. Separarlas permite compartir vértices y consultar adyacencias.',
    },
    {
      afirmacion: 'La estructura winged-edge (arista alada) permite recorrer eficientemente las caras y vértices adyacentes a una arista.',
      esVerdadero: true,
      justificacion: 'Cada arista guarda punteros a sus dos vértices, sus dos caras y las aristas siguientes/anteriores en cada cara ⇒ navegación local rápida.',
    },
    {
      afirmacion: 'Un modelo de alambre (wireframe) representa un sólido 3D sin ambigüedad.',
      esVerdadero: false,
      justificacion: 'El wireframe solo guarda aristas: puede interpretarse de varias formas (p. ej. la ilusión de Necker). No distingue caras ni qué es interior/exterior.',
    },
    {
      afirmacion: 'Las tres operaciones booleanas típicas de CSG son unión, intersección y diferencia.',
      esVerdadero: true,
      justificacion: 'Con $\\cup$, $\\cap$ y $-$ sobre primitivas (cubo, esfera, cilindro…) se construyen sólidos complejos en un árbol CSG.',
    },
    {
      afirmacion: 'Un octree subdivide recursivamente el espacio en ocho octantes.',
      esVerdadero: true,
      justificacion: 'Es la versión 3D del quadtree: cada nodo lleno/vacío/mixto se parte en 8 hijos hasta la resolución deseada.',
    },
    {
      afirmacion: 'La representación por vóxeles reproduce de forma exacta las fronteras curvas de un sólido.',
      esVerdadero: false,
      justificacion: 'Los vóxeles **aproximan** la frontera con "escalones" (aliasing 3D); ganar precisión exige más resolución y memoria ($O(n^3)$).',
    },
    {
      afirmacion: 'Con el convenio habitual, una función de distancia con signo (SDF) es negativa dentro del objeto y positiva fuera.',
      esVerdadero: true,
      justificacion: 'La superficie es el conjunto $d=0$. El signo indica dentro/fuera y $|d|$ la distancia; base del *sphere tracing*.',
    },
    {
      afirmacion: 'El algoritmo Marching Cubes extrae una malla poligonal (isosuperficie) a partir de un campo escalar 3D.',
      esVerdadero: true,
      justificacion: 'Recorre celdas cúbicas y, según qué vértices están dentro/fuera del umbral, genera triángulos usando una tabla de 256 casos.',
    },
    {
      afirmacion: 'Un barrido por traslación (extrusión) genera un sólido moviendo un perfil 2D a lo largo de una trayectoria.',
      esVerdadero: true,
      justificacion: 'La extrusión desplaza el perfil; el barrido por **revolución** lo gira alrededor de un eje. Ambos son *sweep representations*.',
    },
    {
      afirmacion: 'Para un toro (sólido con un agujero) también se cumple $V - A + C = 2$.',
      esVerdadero: false,
      justificacion: 'La fórmula general de Euler–Poincaré es $V-A+C=2-2g$ con $g$=género. Un toro tiene $g=1$ ⇒ $V-A+C=0$, no 2.',
    },
    {
      afirmacion: 'Los operadores de Euler garantizan que las modificaciones a un B-rep mantengan un sólido topológicamente válido.',
      esVerdadero: true,
      justificacion: 'Operadores como MEV, MEF, etc. cambian $V,A,C$ respetando la relación de Euler–Poincaré, evitando mallas inconsistentes.',
    },
    {
      afirmacion: 'La unión de dos objetos representados por SDF, $d_A$ y $d_B$, se obtiene con $\\min(d_A,d_B)$.',
      esVerdadero: true,
      justificacion: 'Unión $=\\min$, intersección $=\\max$, diferencia $A-B=\\max(d_A,-d_B)$. Así se hacen booleanas directamente sobre las distancias.',
    },
  ],

  opcionMultiple: [
    {
      q: 'Para modelar una pieza mecánica con muchos taladros y ranuras, la representación más natural es:',
      opciones: ['Wireframe', 'CSG (árbol booleano de primitivas)', 'Nube de puntos sin conectividad', 'Curva de Bézier'],
      correcta: 1,
      exp: 'Los taladros/ranuras son diferencias booleanas de cilindros y cajas: encajan perfecto con un árbol CSG. Luego suele convertirse a B-rep para renderizar.',
      dif: 'media',
    },
    {
      q: 'La intersección de dos SDF $d_A$ y $d_B$ se calcula como:',
      opciones: ['$\\min(d_A,d_B)$', '$\\max(d_A,d_B)$', '$d_A+d_B$', '$|d_A-d_B|$'],
      correcta: 1,
      exp: 'Un punto está en la intersección solo si está dentro de ambos (ambas distancias negativas); $\\max$ conserva la mayor (la más "afuera").',
      dif: 'media',
    },
    {
      q: 'La principal ventaja de un octree frente a una rejilla de vóxeles uniforme es:',
      opciones: ['Siempre es exacto', 'Adapta la resolución: no subdivide las zonas homogéneas', 'No usa memoria', 'Solo sirve en 2D'],
      correcta: 1,
      exp: 'El octree deja de subdividir los nodos totalmente llenos o vacíos, ahorrando memoria frente a la rejilla densa $O(n^3)$.',
      dif: 'dificil',
    },
  ],

  aplicacion: [
    {
      titulo: 'Verificar la fórmula de Euler',
      tipo: 'practica',
      dif: 'media',
      enunciado: 'Un prisma triangular tiene 6 vértices y 9 aristas. Usando la fórmula de Euler, determina cuántas caras debe tener y verifica que es un sólido simple válido.',
      pista: 'Despeja $C$ en $V-A+C=2$.',
      solucion: '$C=2-V+A=2-6+9=5$.\nEn efecto un prisma triangular tiene $5$ caras (2 triángulos + 3 rectángulos). Comprobación: $6-9+5=2$. ✔ Es un poliedro simple (género 0).',
    },
    {
      titulo: 'Malla triangular cerrada',
      tipo: 'practica',
      dif: 'media',
      enunciado: 'Una malla cerrada de género 0 está formada solo por triángulos y tiene $V=10$ vértices. Calcula el número de aristas $A$ y de caras $C$.',
      pista: 'Combina Euler $V-A+C=2$ con la relación $2A=3C$ (cada arista comparten 2 triángulos, cada triángulo tiene 3 aristas).',
      solucion: 'De $2A=3C \\Rightarrow A=\\tfrac32C$. Sustituyendo en Euler: $10-\\tfrac32C+C=2 \\Rightarrow 10-\\tfrac12C=2 \\Rightarrow C=16$.\nEntonces $A=\\tfrac32\\cdot16=24$.\nEn general, para una malla triangular cerrada: $A=3V-6$ y $C=2V-4$. Con $V=10$: $A=24$, $C=16$. ✔',
    },
    {
      titulo: 'Booleanas con SDF',
      tipo: 'practica',
      dif: 'media',
      enunciado: 'Sea una esfera de radio $1.2$ centrada en el origen, $d_S(p)=\\lVert p\\rVert-1.2$, y una caja de semilados $(1,1,1)$, $d_B(p)=\\max(|x|-1,|y|-1,|z|-1)$. Evalúa en $p=(1.5,0,0)$ la **unión**, la **intersección** y la **diferencia** caja $-$ esfera.',
      pista: 'Unión $=\\min$, intersección $=\\max$, diferencia $A-B=\\max(d_A,-d_B)$.',
      solucion: 'En $p=(1.5,0,0)$: $d_S=1.5-1.2=0.3$ y $d_B=\\max(0.5,-1,-1)=0.5$.\n**Unión** $=\\min(0.3,0.5)=0.3$ (fuera de ambos, más cerca de la esfera).\n**Intersección** $=\\max(0.3,0.5)=0.5$.\n**Diferencia** caja$-$esfera $=\\max(d_B,-d_S)=\\max(0.5,-0.3)=0.5$.\nLos tres signos son positivos ⇒ el punto queda **fuera** de las tres figuras resultantes.',
    },
    {
      titulo: 'Nodos de un octree',
      tipo: 'practica',
      dif: 'dificil',
      enunciado: 'Un octree se subdivide de forma uniforme hasta el nivel (profundidad) $d=3$. Calcula el número de hojas y el número total de nodos.',
      pista: 'A profundidad $d$ hay $8^{d}$ hojas; el total es una serie geométrica $\\sum_{k=0}^{d}8^{k}$.',
      solucion: 'Hojas $=8^{3}=512$.\nTotal $=\\sum_{k=0}^{3}8^{k}=\\dfrac{8^{4}-1}{8-1}=\\dfrac{4096-1}{7}=585$ nodos.\nEsto muestra el crecimiento $O(8^{d})$; por eso conviene no subdividir las regiones homogéneas.',
    },
    {
      titulo: 'Memoria de un volumen de vóxeles',
      tipo: 'practica',
      dif: 'media',
      enunciado: 'Un volumen médico se guarda como una rejilla de $256\\times256\\times256$ vóxeles, 1 byte por vóxel. ¿Cuánta memoria ocupa en MiB?',
      pista: '$256=2^{8}$ y $1\\text{ MiB}=2^{20}$ bytes.',
      solucion: '$256^{3}=(2^{8})^{3}=2^{24}=16\\,777\\,216$ bytes.\n$2^{24}/2^{20}=2^{4}=16$ MiB.\nSi se usaran 2 bytes/vóxel (16 bits) serían 32 MiB: por eso los datos volumétricos se comprimen o se guardan en octrees.',
    },
    {
      titulo: 'Barrido por revolución',
      tipo: 'practica',
      dif: 'media',
      enunciado: 'Un segmento vertical que va de $(r=1,\\,z=0)$ a $(r=1,\\,z=2)$ se hace girar $360^{\\circ}$ alrededor del eje $z$. Identifica el sólido/superficie generado y calcula su área lateral.',
      pista: 'Barrido por revolución de una recta paralela al eje ⇒ manto cilíndrico. $A_{lat}=2\\pi r h$.',
      solucion: 'Se genera la **superficie lateral de un cilindro** de radio $r=1$ y altura $h=2$.\n$A_{lat}=2\\pi r h=2\\pi(1)(2)=4\\pi\\approx12.57$ unidades².\n(Si el perfil fuera un rectángulo relleno de ancho $r$, el barrido daría el cilindro sólido de volumen $\\pi r^2 h$.)',
    },
    {
      titulo: 'CSG o B-rep: ¿cuál elegir?',
      tipo: 'teoria',
      dif: 'media',
      enunciado: 'Para (a) diseñar paramétricamente una pieza mecánica con agujeros y (b) renderizar en tiempo real esa misma pieza en un motor gráfico, indica qué representación conviene en cada caso y por qué.',
      solucion: '(a) **CSG**: el diseño es naturalmente booleano (restar cilindros = taladros), es paramétrico, compacto y fácil de editar/parametrizar.\n(b) **B-rep / malla**: el hardware gráfico rasteriza triángulos, así que para renderizar se convierte el CSG a una frontera poligonal (B-rep) con caras, aristas y vértices explícitos. Es habitual **modelar en CSG y evaluar a B-rep** para visualizar.',
    },
  ],
};

export default examen;
