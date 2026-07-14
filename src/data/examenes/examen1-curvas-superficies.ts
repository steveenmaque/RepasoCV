import type { Examen } from '../../lib/types';

const examen: Examen = {
  slug: 'final-curvas-superficies',
  codigo: 'Simulacro Final 01',
  titulo: 'Representación de Curvas y Superficies',
  descripcion:
    'Simulacro con el formato del examen parcial: bloque de Verdadero/Falso teórico + ejercicios de aplicación (evaluar Bézier, De Casteljau, continuidad, elevación de grado y superficies) resueltos paso a paso.',
  fuente:
    'Foley, van Dam et al., "Computer Graphics: Principles and Practice" (cap. 11) · Hearn & Baker, "Computer Graphics with OpenGL" (cap. 8) · Mortenson, "Geometric Modeling".',
  duracion: '90 min',
  temas: ['Bézier', 'De Casteljau', 'Hermite', 'B-splines / NURBS', 'Continuidad', 'Superficies'],
  color: '#38bdf8',

  // Enunciados difíciles: cada FALSO lo es por un único detalle (palabra, signo o coeficiente).
  // Clave balanceada (8 V / 7 F) y en orden no predecible (sin alternancia ni rachas largas).
  verdaderoFalso: [
    {
      afirmacion: 'Una curva de Bézier de grado $n$ interpola únicamente sus dos puntos de control extremos, $P_0$ y $P_n$.',
      esVerdadero: true,
      justificacion: 'Correcto: pasa exactamente por $P_0$ y $P_n$, y solo "atrae" a los intermedios. La palabra clave es **únicamente** los extremos.',
    },
    {
      afirmacion: 'El algoritmo de De Casteljau evalúa la curva mediante interpolaciones lineales sucesivas y, además, permite subdividirla en dos curvas de Bézier.',
      esVerdadero: true,
      justificacion: 'Correcto: los puntos intermedios de la construcción son justo los polígonos de control de las dos mitades.',
    },
    {
      afirmacion: 'Los polinomios de Bernstein de grado $n$ son no negativos en $[0,1]$ y su suma vale $n$ para todo $t$.',
      esVerdadero: false,
      justificacion: 'Detalle falso: la suma vale **1**, no $n$ (partición de la unidad, $\\sum_i B_i^n(t)=1$). Lo demás (no negatividad) sí es cierto.',
    },
    {
      afirmacion: 'La continuidad paramétrica $C^1$ implica la geométrica $G^1$, pero no al revés.',
      esVerdadero: true,
      justificacion: 'Correcto. $C^1$ (igual dirección **y** magnitud de la tangente) es más fuerte que $G^1$ (solo igual dirección).',
    },
    {
      afirmacion: 'En un B-spline, mover un solo punto de control modifica la curva en toda su extensión (control global).',
      esVerdadero: false,
      justificacion: 'Detalle falso: los B-splines tienen control **local** (solo cambia un tramo, por el soporte local de $N_{i,p}$). El control global es de Bézier.',
    },
    {
      afirmacion: 'Para una Bézier de grado $n$, las tangentes en los extremos son $P\'(0)=n(P_1-P_0)$ y $P\'(1)=n(P_{n-1}-P_n)$.',
      esVerdadero: false,
      justificacion: 'Detalle falso: la tangente final es $P\'(1)=n(P_n-P_{n-1})$; en el enunciado el orden de la resta está **invertido** (cambia el signo del vector).',
    },
    {
      afirmacion: 'Toda curva de Bézier queda contenida en la envolvente convexa (casco convexo) de sus puntos de control.',
      esVerdadero: true,
      justificacion: 'Correcto: al ser combinación convexa (pesos $\\ge0$ que suman 1) no puede salir del casco convexo.',
    },
    {
      afirmacion: 'Elevar el grado de una curva de Bézier (degree elevation) añade un punto de control y modifica ligeramente la forma de la curva.',
      esVerdadero: false,
      justificacion: 'Detalle falso: la curva queda **idéntica**; solo cambia su representación (un punto más). No hay cambio de forma "ligero" ni de ningún tipo.',
    },
    {
      afirmacion: 'Las NURBS, al ser racionales (usan pesos $w_i$), pueden representar de forma exacta circunferencias y elipses.',
      esVerdadero: true,
      justificacion: 'Correcto: los pesos permiten cónicas exactas, algo imposible para una Bézier polinómica.',
    },
    {
      afirmacion: 'Una superficie de Bézier se obtiene como producto tensorial de bases en $u$ y en $v$ sobre una malla de control $P_{ij}$.',
      esVerdadero: true,
      justificacion: 'Correcto: $S(u,v)=\\sum_i\\sum_j B_i^m(u)\\,B_j^n(v)\\,P_{ij}$.',
    },
    {
      afirmacion: 'La representación explícita $y=f(x)$ puede describir curvas con tangente vertical y curvas multivaluadas.',
      esVerdadero: false,
      justificacion: 'Detalle falso: quien puede es la **paramétrica** $P(t)$. La explícita $y=f(x)$ falla justo en tangentes verticales (pendiente infinita) y curvas multivaluadas.',
    },
    {
      afirmacion: 'El algoritmo de De Casteljau necesita evaluar potencias de $t$ y coeficientes binomiales en cada paso.',
      esVerdadero: false,
      justificacion: 'Detalle falso: De Casteljau usa **solo interpolaciones lineales** ($\\text{lerp}$); no calcula binomios ni potencias. Eso es precisamente lo que lo hace estable.',
    },
    {
      afirmacion: 'En un B-spline de grado $p$, en un nudo interior simple la curva mantiene continuidad $C^{p-1}$.',
      esVerdadero: true,
      justificacion: 'Correcto: es una de las ventajas del B-spline (continuidad alta automática); cada nudo repetido baja la continuidad en 1.',
    },
    {
      afirmacion: 'Las curvas de Bézier son invariantes ante transformaciones afines: basta transformar sus puntos de control.',
      esVerdadero: true,
      justificacion: 'Correcto: gracias a la partición de la unidad, aplicar una afín a los $P_i$ equivale a aplicarla a toda la curva.',
    },
    {
      afirmacion: 'Para una Bézier cúbica, la función base (peso) del punto de control $P_1$ es $2(1-t)\\,t$.',
      esVerdadero: false,
      justificacion: 'Detalle falso: $2(1-t)t$ es el peso central de la Bézier **cuadrática**. En la cúbica el peso de $P_1$ es $3(1-t)^2 t$.',
    },
  ],

  // Clave repartida (C, A, D): ya no está siempre en la misma posición.
  opcionMultiple: [
    {
      q: 'El grado mínimo de curva que permite fijar posición y tangente en ambos extremos e incluir un punto de inflexión es:',
      opciones: ['Grado 1 (lineal)', 'Grado 2 (cuadrática)', 'Grado 3 (cúbica)', 'Grado 4 (cuártica)'],
      correcta: 2,
      exp: 'La cúbica tiene 4 coeficientes: fija posición y tangente en los dos extremos y admite una inflexión. Por eso es el estándar en gráficos.',
      dif: 'media',
    },
    {
      q: 'El vector de nudos (knot vector) es un elemento propio de:',
      opciones: ['Los B-splines / NURBS', 'Las curvas de Bézier', 'Las curvas de Hermite', 'Las rectas paramétricas'],
      correcta: 0,
      exp: 'El knot vector define los intervalos y el soporte local de cada función base B-spline; no existe en Bézier ni Hermite.',
      dif: 'media',
    },
    {
      q: 'Para lograr reflejos especulares continuos en una carrocería ("clase A") se busca continuidad:',
      opciones: ['$C^0$', '$G^0$', 'Ninguna, basta con que los tramos se toquen', '$C^2 / G^2$'],
      correcta: 3,
      exp: '$C^2/G^2$ iguala la curvatura ⇒ los reflejos no muestran quiebres. $C^0/G^0$ solo garantiza que los tramos se toquen.',
      dif: 'dificil',
    },
  ],

  aplicacion: [
    {
      titulo: 'Evaluar una Bézier cúbica',
      tipo: 'practica',
      dif: 'media',
      enunciado: 'Dada la Bézier cúbica con $P_0=(0,0)$, $P_1=(1,3)$, $P_2=(3,3)$, $P_3=(4,0)$, calcula el punto $P(t)$ en $t=\\tfrac{1}{3}$.',
      pista: 'Usa $P(t)=(1-t)^3P_0+3(1-t)^2tP_1+3(1-t)t^2P_2+t^3P_3$ con $1-t=\\tfrac{2}{3}$.',
      solucion: 'Pesos con $t=\\tfrac13$: $(1-t)^3=\\tfrac{8}{27}$, $3(1-t)^2t=\\tfrac{12}{27}$, $3(1-t)t^2=\\tfrac{6}{27}$, $t^3=\\tfrac{1}{27}$ (suman $1$).\n$x=\\tfrac{1}{27}(8\\cdot0+12\\cdot1+6\\cdot3+1\\cdot4)=\\tfrac{34}{27}\\approx1.26$.\n$y=\\tfrac{1}{27}(8\\cdot0+12\\cdot3+6\\cdot3+1\\cdot0)=\\tfrac{54}{27}=2$.\n$\\Rightarrow P(\\tfrac13)=\\left(\\tfrac{34}{27},\\,2\\right)\\approx(1.26,\\,2)$.',
    },
    {
      titulo: 'De Casteljau en una Bézier cuadrática',
      tipo: 'practica',
      dif: 'media',
      enunciado: 'Con $P_0=(1,1)$, $P_1=(3,5)$, $P_2=(7,1)$, aplica **De Casteljau** en $t=0.5$ y verifica el resultado con la fórmula de Bernstein.',
      pista: 'Nivel 1: interpola $P_0P_1$ y $P_1P_2$. Nivel 2: interpola esos dos puntos.',
      solucion: 'Nivel 1 ($t=0.5$): $Q_0=\\tfrac12(P_0+P_1)=(2,3)$, $Q_1=\\tfrac12(P_1+P_2)=(5,3)$.\nNivel 2: $R=\\tfrac12(Q_0+Q_1)=(3.5,\\,3)$.\nVerificación: $0.25P_0+0.5P_1+0.25P_2=(0.25+1.5+1.75,\\;0.25+2.5+0.25)=(3.5,3)$. ✓',
    },
    {
      titulo: 'Tangentes en los extremos',
      tipo: 'practica',
      dif: 'media',
      enunciado: 'Para la Bézier cúbica $P_0=(0,0),P_1=(1,3),P_2=(3,3),P_3=(4,0)$, calcula los vectores tangente $P\'(0)$ y $P\'(1)$.',
      pista: '$P\'(0)=n(P_1-P_0)$ y $P\'(1)=n(P_n-P_{n-1})$ con $n=3$.',
      solucion: '$P\'(0)=3(P_1-P_0)=3(1,3)=(3,9)$.\n$P\'(1)=3(P_3-P_2)=3(4-3,\\,0-3)=(3,-9)$.\nLas tangentes son simétricas respecto a la horizontal ⇒ la curva es simétrica, coherente con puntos de control simétricos.',
    },
    {
      titulo: 'Continuidad C¹ entre dos cúbicas',
      tipo: 'practica',
      dif: 'dificil',
      enunciado: 'Dos Bézier cúbicas se unen en $P_3=Q_0=(6,2)$. El primer tramo termina con $P_2=(5,4)$. ¿Dónde debe ubicarse $Q_1$ para lograr continuidad $C^1$?',
      pista: 'Para $C^1$: $P\'(1)=Q\'(0)$, es decir $3(P_3-P_2)=3(Q_1-Q_0)$.',
      solucion: 'De $P_3-P_2=Q_1-Q_0$: $Q_1=Q_0+(P_3-P_2)$.\n$P_3-P_2=(6-5,\\,2-4)=(1,-2)$, así que $Q_1=(6,2)+(1,-2)=(7,0)$.\nGeométricamente $P_2,\\;P_3=Q_0,\\;Q_1$ quedan **colineales y equidistantes**. Si solo se pidiera $G^1$, bastaría con que fueran colineales.',
    },
    {
      titulo: 'Elevación de grado (cuadrática → cúbica)',
      tipo: 'practica',
      dif: 'dificil',
      enunciado: 'Eleva a grado 3 la Bézier cuadrática $P_0=(0,0)$, $P_1=(2,2)$, $P_2=(4,0)$ obteniendo sus 4 nuevos puntos de control (la curva no debe cambiar).',
      pista: 'Fórmula $n\\to n+1$: $P_i^{*}=\\tfrac{i}{n+1}P_{i-1}+\\left(1-\\tfrac{i}{n+1}\\right)P_i$, con $n=2$.',
      solucion: '$P_0^*=P_0=(0,0)$.\n$P_1^*=\\tfrac13P_0+\\tfrac23P_1=\\left(\\tfrac43,\\tfrac43\\right)$.\n$P_2^*=\\tfrac23P_1+\\tfrac13P_2=\\left(\\tfrac{4+4}{3},\\tfrac43\\right)=\\left(\\tfrac83,\\tfrac43\\right)$.\n$P_3^*=P_2=(4,0)$.\nLa nueva cúbica $\\{(0,0),(\\tfrac43,\\tfrac43),(\\tfrac83,\\tfrac43),(4,0)\\}$ describe exactamente la misma parábola.',
    },
    {
      titulo: 'Punto sobre superficie bilineal',
      tipo: 'practica',
      dif: 'dificil',
      enunciado: 'Una superficie de Bézier bilineal (grado $1\\times1$) tiene esquinas $P_{00}=(0,0,0)$, $P_{10}=(2,0,0)$, $P_{01}=(0,2,0)$, $P_{11}=(2,2,3)$. Calcula $S(0.5,\\,0.5)$.',
      pista: '$S(u,v)=\\sum_i\\sum_j B_i^1(u)B_j^1(v)P_{ij}$ con $B_0^1=1-t,\\;B_1^1=t$.',
      solucion: 'Con $u=v=0.5$ los cuatro pesos valen $0.5\\cdot0.5=0.25$.\n$S=0.25\\big(P_{00}+P_{10}+P_{01}+P_{11}\\big)=0.25\\,(0+2+0+2,\\;0+0+2+2,\\;0+0+0+3)$\n$=0.25\\,(4,4,3)=(1,\\,1,\\,0.75)$.\nLa coordenada $z=0.75$ interpola la esquina "levantada" $P_{11}$.',
    },
    {
      titulo: 'Bézier vs B-spline: control local',
      tipo: 'teoria',
      dif: 'media',
      enunciado: 'Explica, en términos del **soporte** de las funciones base, por qué al mover un punto de control se deforma toda una Bézier pero solo un tramo de un B-spline.',
      solucion: 'En Bézier cada $P_i$ multiplica a $B_i^n(t)$, que es **no nula en todo $[0,1]$**: su influencia es **global**. En un B-spline de grado $p$, la base $N_{i,p}(u)$ tiene **soporte local** (no nula solo en $p+1$ intervalos de nudos), así que mover $P_i$ altera únicamente esa región. Ese control local es la ventaja clave de B-splines/NURBS para modelado.',
    },
  ],
};

export default examen;
