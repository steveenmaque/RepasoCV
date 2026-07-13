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

  verdaderoFalso: [
    {
      afirmacion: 'Una curva de Bézier de grado $n$ interpola (pasa exactamente por) todos sus $n+1$ puntos de control.',
      esVerdadero: false,
      justificacion: 'Solo pasa por los extremos $P_0$ y $P_n$; los puntos intermedios únicamente "atraen" la curva. Por eso se dice que la **aproxima**, no la interpola.',
    },
    {
      afirmacion: 'Los polinomios de Bernstein de grado $n$ cumplen $\\sum_{i=0}^{n} B_i^n(t)=1$ para todo $t\\in[0,1]$ (partición de la unidad).',
      esVerdadero: true,
      justificacion: 'Sale del binomio de Newton: $\\big((1-t)+t\\big)^n=1$. Por eso la curva es una **combinación convexa** de los puntos de control.',
    },
    {
      afirmacion: 'El algoritmo de De Casteljau evalúa una curva de Bézier mediante interpolaciones lineales sucesivas y es numéricamente estable.',
      esVerdadero: true,
      justificacion: 'Repite $\\text{lerp}$ del polígono de control hasta llegar a un punto; además subdivide la curva. Es más estable que evaluar el polinomio directamente.',
    },
    {
      afirmacion: 'La continuidad geométrica $G^1$ implica siempre continuidad paramétrica $C^1$.',
      esVerdadero: false,
      justificacion: 'Es al revés: $C^1 \\Rightarrow G^1$, pero no lo contrario. $G^1$ solo exige **igual dirección** de la tangente; $C^1$ exige además **igual magnitud** del vector derivada.',
    },
    {
      afirmacion: 'Una curva de Hermite cúbica queda definida por dos puntos extremos y sus dos vectores tangente.',
      esVerdadero: true,
      justificacion: 'Usa $P_0, P_1, T_0, T_1$. Da control directo de las tangentes en los extremos, a diferencia de Bézier que usa puntos de control.',
    },
    {
      afirmacion: 'Los B-splines ofrecen control local: mover un punto de control modifica solo una porción de la curva.',
      esVerdadero: true,
      justificacion: 'Sus funciones base $N_{i,p}$ tienen **soporte local** (no nulo en pocos intervalos de nudos). En Bézier, en cambio, cada base es no nula en todo $[0,1]$ ⇒ influencia global.',
    },
    {
      afirmacion: 'Las curvas de Bézier son invariantes ante transformaciones afines: basta transformar sus puntos de control para transformar la curva.',
      esVerdadero: true,
      justificacion: 'Gracias a la partición de la unidad, aplicar una afín (traslación, rotación, escala) a los $P_i$ equivale a aplicarla a toda la curva.',
    },
    {
      afirmacion: 'Toda curva de Bézier queda contenida en la envolvente convexa (casco convexo) de sus puntos de control.',
      esVerdadero: true,
      justificacion: 'Al ser combinación convexa de los $P_i$ (pesos $\\ge 0$ que suman 1), no puede salirse de su casco convexo. Útil para *culling* y recorte.',
    },
    {
      afirmacion: 'Las NURBS pueden representar de forma exacta una circunferencia, cosa que una Bézier polinómica no logra.',
      esVerdadero: true,
      justificacion: 'Las NURBS son **racionales** (usan pesos $w_i$) y describen cónicas exactas. Una Bézier polinómica solo puede aproximar el círculo.',
    },
    {
      afirmacion: 'Para una Bézier de grado $n$, la tangente en el punto inicial es paralela al segmento $P_0P_1$.',
      esVerdadero: true,
      justificacion: '$P\'(0)=n(P_1-P_0)$, es decir apunta de $P_0$ hacia $P_1$. Análogamente $P\'(1)=n(P_n-P_{n-1})$.',
    },
    {
      afirmacion: 'Elevar el grado de una curva de Bézier (degree elevation) cambia la forma de la curva.',
      esVerdadero: false,
      justificacion: 'La elevación de grado agrega un punto de control **sin alterar la curva**; sirve para compatibilizar curvas de grados distintos antes de operarlas.',
    },
    {
      afirmacion: 'Una superficie de Bézier se genera como producto tensorial de dos familias de funciones base sobre una malla de control.',
      esVerdadero: true,
      justificacion: '$S(u,v)=\\sum_i\\sum_j B_i^m(u)\\,B_j^n(v)\\,P_{ij}$: se combinan bases en $u$ y en $v$ sobre la malla $P_{ij}$.',
    },
    {
      afirmacion: 'La representación paramétrica $P(t)=(x(t),y(t))$ no puede describir curvas con tangente vertical.',
      esVerdadero: false,
      justificacion: 'La paramétrica **sí** admite tangentes verticales y curvas multivaluadas. Quien no puede es la forma explícita $y=f(x)$ (pendiente infinita).',
    },
    {
      afirmacion: 'En un B-spline el grado del polinomio es independiente del número de puntos de control.',
      esVerdadero: true,
      justificacion: 'A diferencia de Bézier (grado $=$ nº puntos $-1$), en un B-spline se fija el grado $p$ y el vector de nudos aparte; se pueden añadir puntos sin subir el grado.',
    },
    {
      afirmacion: 'El polinomio de Bernstein $B_i^n(t)=\\binom{n}{i}t^i(1-t)^{n-i}$ puede tomar valores negativos dentro de $[0,1]$.',
      esVerdadero: false,
      justificacion: 'En $[0,1]$ es siempre $\\ge 0$ (producto de potencias no negativas). Esa no negatividad + la partición de la unidad garantizan la propiedad de envolvente convexa.',
    },
  ],

  opcionMultiple: [
    {
      q: 'El grado mínimo de curva que permite fijar posición y tangente en ambos extremos e incluir un punto de inflexión es:',
      opciones: ['Grado 1 (lineal)', 'Grado 2 (cuadrática)', 'Grado 3 (cúbica)', 'Grado 4 (cuártica)'],
      correcta: 2,
      exp: 'La cúbica tiene 4 coeficientes: fija posición y tangente en los dos extremos y admite una inflexión. Por eso es el estándar en gráficos.',
      dif: 'media',
    },
    {
      q: 'El vector de nudos (knot vector) es propio de:',
      opciones: ['Las curvas de Bézier', 'Los B-splines / NURBS', 'Las curvas de Hermite', 'Las rectas paramétricas'],
      correcta: 1,
      exp: 'El knot vector define los intervalos y el soporte local de cada función base B-spline; no existe en Bézier ni Hermite.',
      dif: 'media',
    },
    {
      q: 'Para lograr reflejos especulares continuos en una carrocería ("clase A") se busca continuidad:',
      opciones: ['$C^0$', '$G^0$', '$C^2 / G^2$', 'Ninguna, basta con que se toquen'],
      correcta: 2,
      exp: '$C^2$ iguala las segundas derivadas ⇒ curvatura continua ⇒ los reflejos no muestran quiebres.',
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
