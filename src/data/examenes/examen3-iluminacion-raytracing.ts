import type { Examen } from '../../lib/types';

const examen: Examen = {
  slug: 'final-iluminacion-raytracing',
  codigo: 'Simulacro Final 03',
  titulo: 'Iluminación, Ray Tracing y Texturas',
  descripcion:
    'Simulacro con el formato del parcial: bloque de Verdadero/Falso teórico + ejercicios de aplicación (modelo de Phong, vector de reflexión, intersección rayo–esfera, ley de Snell, luminancia, mapeo UV y dimensión fractal) resueltos paso a paso.',
  fuente:
    'Marschner & Shirley, "Fundamentals of Computer Graphics" (cap. 4, 10, 11) · Angel & Shreiner, "Interactive Computer Graphics" · Whitted, "An Improved Illumination Model" (1980).',
  duracion: '90 min',
  temas: ['Phong', 'Gouraud vs Phong', 'Ray tracing', 'Refracción (Snell)', 'Texturas / mipmap', 'Radiosidad', 'Fractales'],
  color: '#f59e0b',

  verdaderoFalso: [
    {
      afirmacion: 'En el modelo de Phong, la componente especular depende del ángulo entre el vector de reflexión $R$ y el vector al observador $V$.',
      esVerdadero: true,
      justificacion: 'La especular es $k_s\\,(R\\cdot V)^{n}$: máxima cuando $V$ coincide con $R$. El exponente $n$ controla el tamaño del brillo.',
    },
    {
      afirmacion: 'El sombreado de Gouraud interpola el vector normal en cada píxel del polígono.',
      esVerdadero: false,
      justificacion: 'Gouraud interpola **colores** ya calculados en los vértices. Quien interpola **normales** por píxel es el sombreado de **Phong**, que reproduce mejor los brillos.',
    },
    {
      afirmacion: 'El sombreado de Phong (por píxel) reproduce brillos especulares pequeños mejor que el de Gouraud.',
      esVerdadero: true,
      justificacion: 'Gouraud puede "perderse" un brillo que cae dentro de un polígono al interpolar solo colores de vértice; Phong evalúa la iluminación por píxel y lo captura.',
    },
    {
      afirmacion: 'La componente difusa de Lambert es proporcional a $\\cos\\theta = N\\cdot L$ (con $N$ y $L$ unitarios).',
      esVerdadero: true,
      justificacion: 'Ley del coseno de Lambert: la superficie recibe menos flujo por área cuanto más rasante llega la luz. Se satura a 0 (no negativa).',
    },
    {
      afirmacion: 'El ray tracing de Whitted modela reflexión y refracción especulares lanzando rayos secundarios de forma recursiva.',
      esVerdadero: true,
      justificacion: 'En cada impacto genera rayos de reflexión, de refracción y de sombra; la recursión termina al alcanzar una profundidad máxima o un peso despreciable.',
    },
    {
      afirmacion: 'La radiosidad es un método de iluminación global dependiente del punto de vista.',
      esVerdadero: false,
      justificacion: 'La radiosidad calcula el intercambio difuso de energía entre parches y es **independiente del punto de vista**: se resuelve una vez y luego se navega la escena.',
    },
    {
      afirmacion: 'La ley de Snell se expresa como $n_1\\sin\\theta_1 = n_2\\sin\\theta_2$.',
      esVerdadero: true,
      justificacion: 'Relaciona los senos de los ángulos con los índices de refracción. Si $n_1>n_2$ y $\\theta_1$ supera el ángulo crítico, hay reflexión total interna.',
    },
    {
      afirmacion: 'El z-buffer resuelve la visibilidad comparando la profundidad de los fragmentos por píxel.',
      esVerdadero: true,
      justificacion: 'Guarda la $z$ más cercana por píxel; un fragmento se pinta solo si su profundidad es menor que la almacenada. Es un algoritmo de espacio imagen.',
    },
    {
      afirmacion: 'El mapeo de texturas (texture mapping) modifica la geometría real de la malla del objeto.',
      esVerdadero: false,
      justificacion: 'El texture mapping cambia el **color/apariencia** de la superficie, no la geometría. Quien sí desplaza los vértices es el **displacement mapping**.',
    },
    {
      afirmacion: 'El bump mapping perturba las normales para simular relieve sin alterar la geometría del objeto.',
      esVerdadero: true,
      justificacion: 'Modifica $N$ por píxel para que la iluminación insinúe rugosidad; la silueta del objeto sigue siendo lisa (a diferencia del displacement).',
    },
    {
      afirmacion: 'El mipmapping usa versiones prefiltradas de la textura a distintas resoluciones para reducir el aliasing.',
      esVerdadero: true,
      justificacion: 'Se elige el nivel cuya resolución se ajusta al tamaño en pantalla, evitando el centelleo de texturas minificadas.',
    },
    {
      afirmacion: 'Aumentar el exponente especular $n$ de Phong produce brillos más grandes y difusos.',
      esVerdadero: false,
      justificacion: 'Es al revés: un $n$ grande concentra el brillo en un punto **pequeño y agudo** (superficie muy pulida). Un $n$ pequeño da un brillo amplio.',
    },
    {
      afirmacion: 'La intersección rayo–esfera se reduce a resolver una ecuación cuadrática en el parámetro $t$.',
      esVerdadero: true,
      justificacion: 'Sustituir $P(t)=O+tD$ en $\\lVert P-C\\rVert^2=r^2$ da $at^2+bt+c=0$; el discriminante indica 0, 1 o 2 impactos.',
    },
    {
      afirmacion: 'El modelo de color RGB es sustractivo y se emplea en impresión sobre papel.',
      esVerdadero: false,
      justificacion: 'RGB es **aditivo** (mezcla de luz, para pantallas). El modelo **sustractivo** de impresión es CMY(K).',
    },
    {
      afirmacion: 'En la reflexión especular perfecta, el ángulo de incidencia es igual al de reflexión medidos respecto a la normal.',
      esVerdadero: true,
      justificacion: 'Ley de reflexión: $\\theta_i=\\theta_r$ en el plano de incidencia. Es la base para el vector $R=2(N\\cdot L)N-L$.',
    },
  ],

  opcionMultiple: [
    {
      q: 'El término ambiente $k_a I_a$ del modelo de Phong sirve para:',
      opciones: ['Simular el brillo especular', 'Aproximar la luz indirecta que evita zonas totalmente negras', 'Calcular sombras arrojadas', 'Interpolar normales'],
      correcta: 1,
      exp: 'La ambiente es una constante que emula la luz rebotada de la escena; sin ella, las caras no iluminadas quedarían completamente negras.',
      dif: 'media',
    },
    {
      q: '¿Qué método es de iluminación GLOBAL y depende del punto de vista?',
      opciones: ['Radiosidad', 'Ray tracing (Whitted)', 'Sombreado de Gouraud', 'Modelo de Phong local'],
      correcta: 1,
      exp: 'El ray tracing depende de la cámara (los rayos parten del ojo) y es global (reflejos, refracción, sombras). La radiosidad es global pero independiente del punto de vista.',
      dif: 'dificil',
    },
    {
      q: 'Para reducir el aliasing al minificar una textura lejana se usa:',
      opciones: ['Bump mapping', 'Mipmapping', 'CSG', 'El z-buffer'],
      correcta: 1,
      exp: 'El mipmapping selecciona una versión prefiltrada de menor resolución acorde al tamaño en pantalla, evitando el centelleo.',
      dif: 'media',
    },
  ],

  aplicacion: [
    {
      titulo: 'Intensidad con el modelo de Phong',
      tipo: 'practica',
      dif: 'media',
      enunciado: 'Calcula la intensidad $I$ en un punto con $k_a=0.2$, $k_d=0.6$, $k_s=0.4$, exponente $n=8$, luz e intensidad ambiente $I_p=I_a=1$, sabiendo que $N\\cdot L=0.5$ y $R\\cdot V=0.8$.',
      pista: 'Usa $I=k_aI_a+I_p\\big(k_d\\,(N\\cdot L)+k_s\\,(R\\cdot V)^{n}\\big)$.',
      solucion: 'Ambiente: $k_aI_a=0.2$.\nDifusa: $k_d(N\\cdot L)=0.6\\times0.5=0.30$.\nEspecular: $(R\\cdot V)^{8}=0.8^{8}\\approx0.1678$, luego $k_s(R\\cdot V)^8=0.4\\times0.1678\\approx0.0671$.\n$I=0.2+1\\times(0.30+0.0671)=0.2+0.3671\\approx\\mathbf{0.567}$.',
    },
    {
      titulo: 'Vector de reflexión',
      tipo: 'practica',
      dif: 'media',
      enunciado: 'Con normal $N=(0,1,0)$ y dirección a la luz $L=(0.6,\\,0.8,\\,0)$ (unitario), calcula el vector de reflexión especular $R$ y verifica que es unitario.',
      pista: 'Fórmula $R=2(N\\cdot L)\\,N-L$.',
      solucion: '$N\\cdot L=0.8$.\n$R=2(0.8)(0,1,0)-(0.6,0.8,0)=(0,1.6,0)-(0.6,0.8,0)=(-0.6,\\,0.8,\\,0)$.\nComprobación: $\\lVert R\\rVert^2=0.36+0.64=1 \\Rightarrow \\lVert R\\rVert=1$. ✔ La reflexión invierte la componente tangencial y conserva la normal.',
    },
    {
      titulo: 'Intersección rayo–esfera',
      tipo: 'practica',
      dif: 'dificil',
      enunciado: 'Un rayo parte de $O=(0,0,0)$ con dirección unitaria $D=(0,0,1)$. Hay una esfera de centro $C=(0,0,5)$ y radio $r=1$. Halla los valores de $t$ de los impactos y el primer punto de intersección.',
      pista: 'Sustituye $P(t)=O+tD$ en $\\lVert P-C\\rVert^2=r^2$ y resuelve la cuadrática. Con $D$ unitario, $a=1$.',
      solucion: '$\\lVert (0,0,t)-(0,0,5)\\rVert^2=1 \\Rightarrow (t-5)^2=1 \\Rightarrow t^2-10t+24=0$.\n$t=\\dfrac{10\\pm\\sqrt{100-96}}{2}=\\dfrac{10\\pm2}{2} \\Rightarrow t=4 \\text{ o } t=6$.\nEl primer impacto es $t=4$ ⇒ punto $(0,0,4)$ (la cara frontal de la esfera). El discriminante $>0$ confirma dos intersecciones.',
    },
    {
      titulo: 'Refracción con la ley de Snell',
      tipo: 'practica',
      dif: 'media',
      enunciado: 'Un rayo pasa del aire ($n_1=1.0$) al vidrio ($n_2=1.5$) con un ángulo de incidencia de $30^{\\circ}$. Calcula el ángulo de refracción $\\theta_2$.',
      pista: '$n_1\\sin\\theta_1=n_2\\sin\\theta_2$.',
      solucion: '$\\sin\\theta_2=\\dfrac{n_1}{n_2}\\sin\\theta_1=\\dfrac{1.0}{1.5}\\sin30^{\\circ}=\\dfrac{0.5}{1.5}=0.3333$.\n$\\theta_2=\\arcsin(0.3333)\\approx\\mathbf{19.47^{\\circ}}$.\nEl rayo se acerca a la normal al entrar en el medio más denso, como esperábamos.',
    },
    {
      titulo: 'Luminancia (RGB → gris)',
      tipo: 'practica',
      dif: 'media',
      enunciado: 'Convierte el color RGB $(120,\\,200,\\,50)$ (canales de 0 a 255) a un valor de gris usando la luminancia perceptual $Y=0.299R+0.587G+0.114B$.',
      pista: 'Multiplica cada canal por su peso y suma.',
      solucion: '$Y=0.299(120)+0.587(200)+0.114(50)$\n$=35.88+117.4+5.7=158.98\\approx\\mathbf{159}$.\nEl verde domina porque el ojo humano es más sensible a él (mayor peso $0.587$).',
    },
    {
      titulo: 'Mapeo UV a téxeles',
      tipo: 'practica',
      dif: 'media',
      enunciado: 'Una textura de $256\\times256$ téxeles se mapea con coordenadas $(u,v)\\in[0,1]$. ¿Qué téxel $(i,j)$ corresponde a la coordenada UV $(0.25,\\,0.75)$ usando $i=\\lfloor u\\cdot W\\rfloor$, $j=\\lfloor v\\cdot H\\rfloor$?',
      pista: 'Multiplica por el ancho/alto y toma la parte entera.',
      solucion: '$i=\\lfloor 0.25\\times256\\rfloor=\\lfloor 64\\rfloor=64$.\n$j=\\lfloor 0.75\\times256\\rfloor=\\lfloor 192\\rfloor=192$.\nTéxel $\\mathbf{(64,\\,192)}$. Si $u$ o $v$ salen de $[0,1]$, el modo de envoltura (*repeat*, *clamp*…) decide qué téxel leer.',
    },
    {
      titulo: 'Dimensión fractal por conteo de cajas',
      tipo: 'practica',
      dif: 'dificil',
      enunciado: 'Calcula la dimensión fractal $D$ de (a) el triángulo de Sierpinski y (b) la alfombra (carpet) de Sierpinski, usando $D=\\dfrac{\\log N}{\\log(1/s)}$.',
      pista: 'Sierpinski triángulo: $N=3$ copias a escala $s=1/2$. Alfombra: $N=8$ copias a escala $s=1/3$.',
      solucion: '(a) Triángulo: $D=\\dfrac{\\log 3}{\\log 2}\\approx\\mathbf{1.585}$.\n(b) Alfombra: $D=\\dfrac{\\log 8}{\\log 3}\\approx\\mathbf{1.893}$.\nAmbas dimensiones son fraccionarias (entre 1 y 2): el fractal "llena" el plano más que una curva pero menos que una región sólida.',
    },
    {
      titulo: 'Iluminación local vs global',
      tipo: 'teoria',
      dif: 'media',
      enunciado: 'Explica la diferencia entre iluminación **local** (p. ej. Phong) e iluminación **global** (p. ej. ray tracing o radiosidad) y da un fenómeno visual que solo la global reproduce.',
      solucion: 'La iluminación **local** calcula el color de cada punto considerando solo la luz directa y las propiedades del material, **sin** tener en cuenta el resto de la escena: es rápida pero no produce sombras arrojadas realistas, reflejos entre objetos ni *color bleeding*.\nLa iluminación **global** modela los rebotes de luz entre superficies: el ray tracing añade reflexiones/refracciones especulares y sombras; la radiosidad añade el intercambio difuso (sangrado de color). Un fenómeno exclusivo de la global: el **color bleeding** (una pared roja tiñe de rojo el suelo blanco cercano), o los reflejos especulares de un objeto sobre otro.',
    },
  ],
};

export default examen;
