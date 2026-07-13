import type { Tema } from '../../lib/types';

const tema: Tema = {
  slug: 'curvas-superficies',
  seccion: 'teoria',
  codigo: 'TEO 09',
  titulo: 'Representación de Curvas y Superficies',
  subtitulo:
    'Representación paramétrica, curvas de Hermite y Bézier, continuidad, algoritmo de De Casteljau, B-splines y superficies tensoriales.',
  resumen:
    'Cómo describir curvas y superficies suaves con polinomios: bases de Bernstein/Hermite, puntos de control, continuidad geométrica y paramétrica, De Casteljau y B-splines.',
  tags: ['Bézier', 'B-splines', 'Hermite', 'De Casteljau', 'Continuidad'],
  color: '#38bdf8',

  teoria: [
    { tipo: 'parrafo', texto: 'En computación gráfica necesitamos describir curvas y superficies **suaves** (carrocerías, tipografías, trayectorias) con pocos datos y de forma intuitiva. Existen tres formas de representar una curva: **explícita** $y=f(x)$, **implícita** $F(x,y)=0$ y **paramétrica** $P(t)$. La representación paramétrica es la preferida en gráficos porque evita pendientes infinitas, permite curvas multivaluadas y se generaliza fácilmente a 3D.' },

    { tipo: 'subtitulo', texto: 'Representación paramétrica' },
    { tipo: 'parrafo', texto: 'Una curva paramétrica expresa cada coordenada como función de un parámetro $t$, normalmente $t\\in[0,1]$:' },
    { tipo: 'formula', latex: 'P(t) = \\big(x(t),\\, y(t),\\, z(t)\\big),\\qquad t\\in[0,1]', nota: 'El vector tangente es $P\'(t)=(x\'(t),y\'(t),z\'(t))$.' },
    { tipo: 'parrafo', texto: 'Cuando $x,y,z$ son polinomios cúbicos hablamos de **curvas cúbicas**: son el mínimo grado que permite controlar posición y tangente en ambos extremos y crear puntos de inflexión, por eso son el estándar.' },

    { tipo: 'subtitulo', texto: 'Curva de Hermite' },
    { tipo: 'parrafo', texto: 'Una curva de **Hermite** cúbica se define por sus dos puntos extremos $P_0,P_1$ y los vectores tangentes en ellos $T_0,T_1$. Se escribe con la **base de Hermite**:' },
    { tipo: 'formula', latex: 'P(t) = h_{00}(t)P_0 + h_{10}(t)T_0 + h_{01}(t)P_1 + h_{11}(t)T_1' },
    { tipo: 'formula', latex: '\\begin{aligned} h_{00}&=2t^3-3t^2+1 & h_{10}&=t^3-2t^2+t\\\\ h_{01}&=-2t^3+3t^2 & h_{11}&=t^3-t^2 \\end{aligned}', nota: 'Ventaja: control directo de las tangentes; se usa para interpolar (la curva pasa por $P_0$ y $P_1$).' },

    { tipo: 'subtitulo', texto: 'Curvas de Bézier' },
    { tipo: 'parrafo', texto: 'Una curva de **Bézier** de grado $n$ se define con $n+1$ **puntos de control** $P_0,\\dots,P_n$ y la **base de Bernstein**. La curva no pasa por los puntos intermedios: los "atrae".' },
    { tipo: 'formula', latex: 'P(t)=\\sum_{i=0}^{n} B_i^n(t)\\,P_i,\\qquad B_i^n(t)=\\binom{n}{i}t^i(1-t)^{\\,n-i}' },
    { tipo: 'parrafo', texto: 'La **Bézier cuadrática (3 puntos)** y la **cúbica (4 puntos)** son las más usadas:' },
    { tipo: 'formula', latex: 'P(t)=(1-t)^2P_0 + 2(1-t)t\\,P_1 + t^2P_2', nota: 'Bézier cuadrática (3 puntos de control).' },
    { tipo: 'formula', latex: 'P(t)=(1-t)^3P_0 + 3(1-t)^2t\\,P_1 + 3(1-t)t^2P_2 + t^3P_3', nota: 'Bézier cúbica (4 puntos de control).' },
    { tipo: 'imagen', src: '/img/teoria/curvas-superficies/bezier.webp', alt: 'Curva de Bézier con su polígono de control', caption: 'Curva de Bézier cúbica y su **polígono de control**. La curva queda contenida en la envolvente convexa de los puntos.' },

    { tipo: 'subtitulo', texto: 'Propiedades de la curva de Bézier' },
    { tipo: 'lista', items: [
      '**Interpolación de extremos:** pasa exactamente por $P_0$ y $P_n$.',
      '**Envolvente convexa:** la curva vive dentro del casco convexo de los puntos de control (útil para *culling* y recorte).',
      '**Invarianza afín:** transformar los puntos de control equivale a transformar la curva (basta mover los $P_i$).',
      '**Tangencia en extremos:** $P\'(0)=n(P_1-P_0)$ y $P\'(1)=n(P_n-P_{n-1})$.',
      '**Partición de la unidad:** $\\sum_i B_i^n(t)=1$, por eso la curva es un promedio ponderado de los puntos.',
      '**Disminución de variación:** una recta no corta a la curva más veces que a su polígono de control (no oscila de más).',
    ] },

    { tipo: 'subtitulo', texto: 'Algoritmo de De Casteljau' },
    { tipo: 'parrafo', texto: 'Es un método **recursivo y numéricamente estable** para evaluar $P(t)$ mediante interpolaciones lineales sucesivas del polígono de control. Además **subdivide** la curva en dos Bézier.' },
    { tipo: 'formula', latex: 'P_i^{\\,r}(t)=(1-t)\\,P_i^{\\,r-1}(t)+t\\,P_{i+1}^{\\,r-1}(t),\\qquad P_i^{\\,0}=P_i', nota: 'El punto de la curva es $P(t)=P_0^{\\,n}(t)$ tras $n$ niveles.' },
    { tipo: 'imagen', src: '/img/teoria/curvas-superficies/casteljau.webp', alt: 'Construcción de De Casteljau', caption: 'Interpolaciones lineales sucesivas del algoritmo de De Casteljau para $t$ fijo.' },

    { tipo: 'subtitulo', texto: 'Continuidad en la unión de curvas' },
    { tipo: 'parrafo', texto: 'Al empalmar segmentos (splines) importa cómo se unen. Distinguimos continuidad **paramétrica** $C^k$ (derivadas iguales) y **geométrica** $G^k$ (misma dirección, magnitud libre):' },
    { tipo: 'tabla', headers: ['Tipo', 'Condición', 'Significado visual'], filas: [
      ['$C^0 / G^0$', 'Coinciden los puntos de unión', 'Sin huecos (curva conectada)'],
      ['$C^1$', 'Tangentes iguales en magnitud y dirección', 'Sin quiebres; velocidad continua'],
      ['$G^1$', 'Tangentes con la misma dirección (magnitud libre)', 'Sin quiebres visibles'],
      ['$C^2$', 'Segundas derivadas iguales', 'Curvatura suave (reflejos continuos)'],
    ] },
    { tipo: 'nota', estilo: 'clave', texto: '$C^1 \\Rightarrow G^1$, pero **no** al revés. Para carrocerías o superficies "clase A" se busca $G^2/C^2$ para que los reflejos no muestren discontinuidades.' },

    { tipo: 'subtitulo', texto: 'B-splines y NURBS' },
    { tipo: 'parrafo', texto: 'Los **B-splines** son curvas polinómicas por tramos definidas por puntos de control y un **vector de nudos** (knots). Sus ventajas sobre Bézier: **control local** (mover un punto afecta solo una parte), grado independiente del número de puntos y continuidad automática $C^{p-1}$ (grado $p$). Las **NURBS** (B-splines racionales no uniformes) añaden pesos $w_i$ y permiten representar **exactamente** cónicas (círculos, elipses); están implementadas en Blender, Rhino, AutoCAD, etc.' },
    { tipo: 'formula', latex: 'C(u)=\\dfrac{\\sum_{i} N_{i,p}(u)\\,w_i\\,P_i}{\\sum_{i} N_{i,p}(u)\\,w_i}', nota: 'Curva NURBS: $N_{i,p}$ son las funciones base B-spline de grado $p$.' },

    { tipo: 'subtitulo', texto: 'Superficies (producto tensorial)' },
    { tipo: 'parrafo', texto: 'Una superficie de Bézier se obtiene como **producto tensorial** de dos familias de bases sobre una malla de control $P_{ij}$ de $(m+1)\\times(n+1)$ puntos y dos parámetros $u,v\\in[0,1]$:' },
    { tipo: 'formula', latex: 'S(u,v)=\\sum_{i=0}^{m}\\sum_{j=0}^{n} B_i^m(u)\\,B_j^n(v)\\,P_{ij}' },
    { tipo: 'parrafo', texto: 'De forma análoga existen **superficies de Hermite** y **superficies B-spline/NURBS**, base del modelado 3D de forma libre.' },
  ],

  formulas: [
    { latex: 'P(t)=\\big(x(t),y(t),z(t)\\big)', desc: 'Curva **paramétrica**; tangente $P\'(t)$.' },
    { latex: 'B_i^n(t)=\\binom{n}{i}t^i(1-t)^{n-i}', desc: 'Polinomio de **Bernstein** (base de Bézier).' },
    { latex: 'P(t)=(1-t)^2P_0+2(1-t)tP_1+t^2P_2', desc: 'Bézier **cuadrática** (3 puntos).' },
    { latex: 'P(t)=(1-t)^3P_0+3(1-t)^2tP_1+3(1-t)t^2P_2+t^3P_3', desc: 'Bézier **cúbica** (4 puntos).' },
    { latex: 'P_i^{r}=(1-t)P_i^{r-1}+t\\,P_{i+1}^{r-1}', desc: 'Recursión de **De Casteljau**.' },
    { latex: "P'(0)=n(P_1-P_0),\\;\\; P'(1)=n(P_n-P_{n-1})", desc: 'Tangentes en los extremos de una Bézier de grado $n$.' },
    { latex: 'S(u,v)=\\sum_i\\sum_j B_i^m(u)B_j^n(v)P_{ij}', desc: 'Superficie de Bézier (**producto tensorial**).' },
  ],

  ejercicios: [
    { titulo: 'Base de Bernstein y partición de la unidad', tipo: 'teoria', dif: 'media',
      enunciado: 'Demuestra que las cuatro funciones de Bernstein cúbicas suman 1 para todo $t$, es decir $\\sum_{i=0}^{3}B_i^3(t)=1$.',
      pista: 'Usa el binomio de Newton sobre $\\big((1-t)+t\\big)^3$.',
      solucion: 'Por el teorema del binomio: $\\big((1-t)+t\\big)^n=\\sum_{i=0}^{n}\\binom{n}{i}t^i(1-t)^{n-i}=\\sum_i B_i^n(t)$.\nPero $(1-t)+t=1$, luego $1^n=1=\\sum_i B_i^n(t)$. Para $n=3$ queda $\\sum_{i=0}^3 B_i^3(t)=1$. Esta propiedad (partición de la unidad) garantiza que la curva es una **combinación convexa** de los puntos de control.' },

    { titulo: 'Evaluar una Bézier cuadrática', tipo: 'practica', dif: 'media',
      enunciado: 'Dada la Bézier cuadrática con $P_0=(0,0)$, $P_1=(2,4)$, $P_2=(6,0)$, calcula el punto en $t=0.5$.',
      pista: 'Sustituye en $ (1-t)^2P_0+2(1-t)tP_1+t^2P_2 $.',
      solucion: 'En $t=0.5$: los pesos son $(1-t)^2=0.25$, $2(1-t)t=0.5$, $t^2=0.25$.\n$x=0.25\\cdot0+0.5\\cdot2+0.25\\cdot6=1+1.5=2.5$.\n$y=0.25\\cdot0+0.5\\cdot4+0.25\\cdot0=2$.\nEl punto es $P(0.5)=(2.5,\\,2)$.' },

    { titulo: 'De Casteljau paso a paso', tipo: 'practica', dif: 'media',
      enunciado: 'Con los mismos puntos $P_0=(0,0),P_1=(2,4),P_2=(6,0)$, aplica **De Casteljau** en $t=0.5$ y verifica que coincide con el ejercicio anterior.',
      pista: 'Primer nivel: interpola $P_0P_1$ y $P_1P_2$; segundo nivel: interpola esos dos.',
      solucion: 'Nivel 1 ($t=0.5$):\n$Q_0=\\tfrac12(P_0+P_1)=(1,2)$; $Q_1=\\tfrac12(P_1+P_2)=(4,2)$.\nNivel 2:\n$R=\\tfrac12(Q_0+Q_1)=(2.5,2)$.\nCoincide con $P(0.5)=(2.5,2)$. De Casteljau evita evaluar polinomios y es estable numéricamente.' },

    { titulo: 'Continuidad C¹ entre dos Bézier', tipo: 'practica', dif: 'dificil',
      enunciado: 'Dos Bézier cúbicas comparten el punto de unión $P_3=Q_0$. Si el primer segmento termina con $P_2=(4,1),P_3=(5,3)$ y el segundo empieza con $Q_0=(5,3),Q_1=(?,?)$, ¿dónde debe estar $Q_1$ para lograr continuidad $C^1$?',
      pista: 'Para $C^1$ las tangentes en la unión deben ser iguales: $P\'(1)=Q\'(0)$, es decir $3(P_3-P_2)=3(Q_1-Q_0)$.',
      solucion: 'Continuidad $C^1$ exige $P\'(1)=Q\'(0)$. Para cúbicas $P\'(1)=3(P_3-P_2)$ y $Q\'(0)=3(Q_1-Q_0)$.\nIgualando: $P_3-P_2=Q_1-Q_0 \\Rightarrow Q_1=Q_0+(P_3-P_2)$.\n$P_3-P_2=(5-4,\\,3-1)=(1,2)$, así que $Q_1=(5,3)+(1,2)=(6,5)$.\nGeométricamente: $P_2$, $P_3=Q_0$ y $Q_1$ deben ser **colineales y equidistantes** (misma magnitud) para $C^1$; si solo se pide $G^1$ basta que sean colineales.' },

    { titulo: 'Elevación de grado', tipo: 'practica', dif: 'dificil',
      enunciado: 'Explica y aplica la **elevación de grado**: convierte la Bézier lineal $P_0=(0,0),P_1=(4,0)$ en una Bézier cuadrática equivalente (mismos puntos de la curva).',
      pista: 'La fórmula de elevación de grado $n\\to n+1$ es $P_i^{*}=\\tfrac{i}{n+1}P_{i-1}+\\left(1-\\tfrac{i}{n+1}\\right)P_i$.',
      solucion: 'De $n=1$ a $n+1=2$ obtenemos 3 puntos $P_0^*,P_1^*,P_2^*$:\n$P_0^*=P_0=(0,0)$.\n$P_1^*=\\tfrac{1}{2}P_0+\\tfrac{1}{2}P_1=(2,0)$.\n$P_2^*=P_1=(4,0)$.\nLa nueva curva cuadrática $\\{(0,0),(2,0),(4,0)\\}$ describe el mismo segmento recto. La elevación de grado se usa para hacer compatibles curvas de distinto grado antes de operarlas.' },

    { titulo: 'Bézier vs B-spline: control local', tipo: 'teoria', dif: 'media',
      enunciado: 'Un diseñador mueve un solo punto de control. ¿Por qué en una Bézier se deforma **toda** la curva y en un B-spline solo un **tramo**? Relaciónalo con el soporte de las funciones base.',
      solucion: 'En Bézier cada punto $P_i$ multiplica a $B_i^n(t)$, que es **no nula en todo $[0,1]$**: por eso su influencia es **global**. En un B-spline de grado $p$, la base $N_{i,p}(u)$ tiene **soporte local** (solo es distinta de cero en $p+1$ intervalos de nudos), así que mover $P_i$ altera únicamente esa región de la curva. Ese **control local** es la principal ventaja de los B-splines/NURBS para modelado.' },

    { titulo: 'Punto sobre superficie de Bézier', tipo: 'practica', dif: 'dificil',
      enunciado: 'Para una superficie bilineal (Bézier de grado 1×1) con esquinas $P_{00}=(0,0,0)$, $P_{10}=(1,0,0)$, $P_{01}=(0,1,0)$, $P_{11}=(1,1,1)$, calcula $S(0.5,0.5)$.',
      pista: '$S(u,v)=\\sum_i\\sum_j B_i^1(u)B_j^1(v)P_{ij}$ con $B_0^1=1-t,\\;B_1^1=t$.',
      solucion: 'Los pesos con $u=v=0.5$ son todos $0.5\\cdot0.5=0.25$.\n$S=0.25(P_{00}+P_{10}+P_{01}+P_{11})=0.25\\big[(0,0,0)+(1,0,0)+(0,1,0)+(1,1,1)\\big]$\n$=0.25\\,(2,2,1)=(0.5,\\,0.5,\\,0.25)$.\nNota cómo la coordenada $z$ interpola la "esquina levantada" $P_{11}$.' },
  ],

  preguntas: [
    { q: '¿Por qué se prefiere la representación **paramétrica** frente a la explícita $y=f(x)$ en gráficos?', opciones: ['Porque usa menos memoria siempre', 'Porque evita pendientes infinitas y permite curvas cerradas o multivaluadas', 'Porque solo funciona en 2D', 'Porque no necesita puntos de control'], correcta: 1, exp: 'La forma explícita no puede representar tangentes verticales (pendiente infinita) ni curvas que se doblan sobre sí mismas; la paramétrica $P(t)$ sí, y se extiende a 3D de forma natural.', dif: 'media' },
    { q: 'La base de Bernstein $B_i^n(t)$ vale:', opciones: ['$\\binom{n}{i}t^i(1-t)^{n-i}$', '$t^i + (1-t)^{n-i}$', '$\\binom{n}{i}t^{n-i}$', '$n!\\,t^i$'], correcta: 0, exp: 'Es $\\binom{n}{i}t^i(1-t)^{n-i}$. Estas funciones son no negativas y suman 1 (partición de la unidad).', dif: 'media' },
    { q: 'Una curva de Bézier **siempre** pasa por:', opciones: ['Todos los puntos de control', 'Ningún punto de control', 'Solo el primer y el último punto de control', 'El centro de gravedad de los puntos'], correcta: 2, exp: 'Interpola los extremos $P_0$ y $P_n$; los puntos intermedios solo "tiran" de la curva.', dif: 'media' },
    { q: 'La propiedad de **envolvente convexa** garantiza que:', opciones: ['La curva es siempre un círculo', 'La curva queda dentro del casco convexo de los puntos de control', 'La curva pasa por todos los puntos', 'La curva no tiene tangentes'], correcta: 1, exp: 'Toda la curva vive dentro del polígono/casco convexo de sus puntos de control, lo que facilita pruebas de recorte y colisión.', dif: 'media' },
    { q: 'El algoritmo de **De Casteljau** se basa en:', opciones: ['Resolver un sistema lineal', 'Interpolaciones lineales sucesivas entre puntos de control', 'Derivar la curva', 'Transformada de Fourier'], correcta: 1, exp: 'Realiza interpolaciones lineales repetidas (lerp) del polígono de control; es estable y además subdivide la curva.', dif: 'media' },
    { q: 'La tangente al inicio de una Bézier de grado $n$ es:', opciones: ['$P_0-P_1$', '$n(P_1-P_0)$', '$P_n-P_0$', 'Siempre cero'], correcta: 1, exp: '$P\'(0)=n(P_1-P_0)$: la tangente inicial apunta de $P_0$ hacia $P_1$ escalada por el grado.', dif: 'dificil' },
    { q: '¿Qué implica la continuidad $C^1$ que NO implica $G^1$?', opciones: ['Que las curvas se toquen', 'Que las tangentes tengan además la misma magnitud (no solo dirección)', 'Que la curvatura sea igual', 'Nada, son idénticas'], correcta: 1, exp: '$G^1$ exige misma dirección de tangente; $C^1$ exige además misma magnitud del vector derivada. Por eso $C^1\\Rightarrow G^1$ pero no al revés.', dif: 'dificil' },
    { q: 'La principal ventaja de los **B-splines** sobre las Bézier es:', opciones: ['Que siempre son rectas', 'El control local: mover un punto afecta solo un tramo', 'Que no usan puntos de control', 'Que son más fáciles de derivar'], correcta: 1, exp: 'Las bases B-spline tienen soporte local, así que editar un punto de control modifica solo una porción de la curva.', dif: 'media' },
    { q: '¿Qué añaden las **NURBS** respecto a los B-splines?', opciones: ['Pesos que permiten representar cónicas exactas', 'Más puntos de control obligatorios', 'Solo color', 'Nada, son iguales'], correcta: 0, exp: 'Las NURBS son racionales: incorporan pesos $w_i$ que permiten representar exactamente círculos, elipses y otras cónicas.', dif: 'media' },
    { q: 'Una curva de **Hermite** cúbica se define mediante:', opciones: ['4 puntos de control', '2 puntos extremos y 2 tangentes', '3 puntos y 1 peso', 'Un vector de nudos'], correcta: 1, exp: 'Hermite usa los dos puntos extremos y los dos vectores tangente en ellos; da control directo de las tangentes.', dif: 'media' },
    { q: 'La propiedad de **invarianza afín** de Bézier significa que:', opciones: ['La curva no cambia nunca', 'Aplicar una transformación afín a los puntos de control transforma la curva', 'La curva es invariante ante la luz', 'Solo funciona con rotaciones'], correcta: 1, exp: 'Basta transformar los puntos de control (trasladar, rotar, escalar) para transformar toda la curva; no hay que recalcularla punto a punto.', dif: 'dificil' },
    { q: 'Para una Bézier cuadrática, el peso del punto intermedio $P_1$ es:', opciones: ['$t^2$', '$2(1-t)t$', '$(1-t)^2$', '$1-t$'], correcta: 1, exp: 'Los pesos son $(1-t)^2, 2(1-t)t, t^2$; el central es $2(1-t)t$, máximo en $t=0.5$.', dif: 'media' },
    { q: 'La **disminución de variación** de Bézier indica que:', opciones: ['La curva oscila más que su polígono', 'Una recta no corta a la curva más veces que a su polígono de control', 'La curva siempre decrece', 'La curva es monótona'], correcta: 1, exp: 'Ninguna recta interseca la curva más veces que al polígono de control: la curva no "oscila de más".', dif: 'dificil' },
    { q: 'Una superficie de Bézier se construye como:', opciones: ['Suma de dos curvas', 'Producto tensorial de bases en $u$ y en $v$', 'Rotación de una curva', 'Un único polinomio en $t$'], correcta: 1, exp: '$S(u,v)=\\sum_i\\sum_j B_i^m(u)B_j^n(v)P_{ij}$: producto tensorial sobre una malla de control.', dif: 'media' },
    { q: 'La continuidad $C^2$ es importante en carrocerías porque:', opciones: ['Ahorra memoria', 'Hace que la curvatura (y los reflejos) sea continua', 'Elimina los puntos de control', 'Convierte la curva en recta'], correcta: 1, exp: '$C^2$ iguala las segundas derivadas ⇒ curvatura continua ⇒ los reflejos especulares no muestran quiebres (superficies "clase A").', dif: 'dificil' },
    { q: 'Elevar el grado de una Bézier sirve para:', opciones: ['Cambiar la forma de la curva', 'Añadir un punto de control sin alterar la curva (compatibilizar grados)', 'Convertirla en B-spline', 'Reducir el número de puntos'], correcta: 1, exp: 'La elevación de grado agrega un punto de control manteniendo idéntica la curva; útil para operar curvas de grados distintos.', dif: 'dificil' },
    { q: '¿Cuál es el grado mínimo que permite controlar posición y tangente en ambos extremos e incluir inflexiones?', opciones: ['Grado 1 (lineal)', 'Grado 2 (cuadrático)', 'Grado 3 (cúbico)', 'Grado 5'], correcta: 2, exp: 'La cúbica (4 coeficientes) fija posición y tangente en los dos extremos y admite un punto de inflexión; por eso es el estándar.', dif: 'media' },
    { q: 'El vector de **nudos** (knots) es propio de:', opciones: ['Las curvas de Bézier', 'Los B-splines', 'Las curvas de Hermite', 'Las rectas'], correcta: 1, exp: 'El knot vector define los intervalos y la parametrización de un B-spline; determina el soporte local de cada base.', dif: 'media' },
  ],
};

export default tema;
