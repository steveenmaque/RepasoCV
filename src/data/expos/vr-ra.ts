import type { Tema } from '../../lib/types';

const tema: Tema = {
  slug: 'vr-ra',
  seccion: 'exposiciones',
  titulo: 'Realidad Virtual y Realidad Aumentada',
  subtitulo:
    'Continuo de Milgram, hardware (HMDs y sensores), renderizado estereoscópico, seguimiento y registro (SLAM, marcadores), matemáticas de transformación y cuaterniones, y latencia motion-to-photon.',
  resumen:
    'RV sumerge al usuario en un mundo sintético; RA superpone información al mundo real. Cubre estéreo, tracking 6DoF, cuaterniones para orientación y los retos de latencia e inmersión.',
  tags: ['RV', 'RA', 'Milgram', 'SLAM', 'Cuaterniones', 'Estéreo'],
  color: '#c084fc',

  teoria: [
    { tipo: 'parrafo', texto: 'La **Realidad Virtual (RV)** sumerge al usuario en un entorno **totalmente sintético**, aislándolo del mundo real. La **Realidad Aumentada (RA)** **superpone** elementos virtuales sobre el mundo real (p. ej. un mueble virtual en tu sala). Ambas buscan **inmersión** y **presencia**, y comparten retos de computación visual: renderizar rápido, rastrear la posición y registrar lo virtual con lo real.' },

    { tipo: 'subtitulo', texto: 'Continuo de Milgram (Realidad-Virtualidad)' },
    { tipo: 'parrafo', texto: 'Milgram y Kishino (1994) describen un **espectro** entre lo totalmente real y lo totalmente virtual. En medio está la **Realidad Mixta (RM)**, que combina ambos en distintos grados.' },
    { tipo: 'formula', latex: '\\underbrace{\\text{Real}}_{} \\;\\longleftrightarrow\\; \\underbrace{\\text{RA} \\;-\\; \\text{RM} \\;-\\; \\text{Virtualidad Aumentada}}_{\\text{Realidad Mixta}} \\;\\longleftrightarrow\\; \\underbrace{\\text{Virtual (RV)}}_{}', nota: 'Cuanto más a la derecha, mayor proporción de contenido sintético.' },
    { tipo: 'imagen', src: '/img/expos/vr-ra/milgram.webp', alt: 'Continuo de Milgram', caption: 'Continuo **Realidad–Virtualidad** de Milgram: de lo real a lo totalmente virtual.' },

    { tipo: 'subtitulo', texto: 'Hardware' },
    { tipo: 'lista', items: [
      '**HMD (Head-Mounted Display):** pantallas por ojo + lentes (Meta Quest, Valve Index, Apple Vision Pro).',
      '**Sensores de seguimiento:** IMU (giroscopio + acelerómetro), cámaras, LiDAR, controladores.',
      '**RA:** cámara de paso (passthrough) o pantallas transparentes (waveguides).',
    ] },

    { tipo: 'subtitulo', texto: 'Renderizado estereoscópico' },
    { tipo: 'parrafo', texto: 'Para dar sensación de profundidad se renderiza **una imagen ligeramente distinta por ojo**, separadas por la **distancia interpupilar (IPD)**. El cerebro fusiona ambas (visión binocular) y percibe 3D. Esto **duplica** el costo de render (dos cámaras virtuales).' },
    { tipo: 'formula', latex: 'd = \\dfrac{f\\cdot B}{Z}', nota: 'Disparidad $d$ entre ojos: $B$ = línea base (IPD), $f$ = distancia focal, $Z$ = profundidad. A más lejos, menos disparidad.' },

    { tipo: 'subtitulo', texto: 'Seguimiento (tracking) y registro' },
    { tipo: 'parrafo', texto: 'El sistema debe conocer la **pose** del usuario (posición + orientación) para actualizar la vista. Se distinguen **3DoF** (solo rotación) y **6DoF** (rotación + traslación). Técnicas:' },
    { tipo: 'lista', items: [
      '**Marcadores (fiducials):** patrones conocidos (ArUco, QR) que la cámara detecta para estimar la pose.',
      '**SLAM (Simultaneous Localization and Mapping):** construye un mapa del entorno y se localiza en él a la vez, sin marcadores (inside-out tracking).',
      '**Fusión sensorial:** combina IMU (rápida, con deriva) y visión (lenta, precisa) para una pose estable.',
    ] },
    { tipo: 'nota', estilo: 'clave', texto: 'El **registro** es alinear lo virtual con lo real: si falla, el objeto virtual "flota" o se desliza. Un buen tracking + registro es lo que hace creíble la RA.' },

    { tipo: 'subtitulo', texto: 'Matemáticas: transformaciones y cuaterniones' },
    { tipo: 'parrafo', texto: 'Las poses se representan con matrices $4\\times4$ (rotación + traslación en coordenadas homogéneas). Para la **orientación** se prefieren los **cuaterniones** sobre los ángulos de Euler, porque evitan el **gimbal lock**, se interpolan suavemente (**slerp**) y son numéricamente estables.' },
    { tipo: 'formula', latex: 'q = w + x\\,\\mathbf{i} + y\\,\\mathbf{j} + z\\,\\mathbf{k}, \\qquad \\lVert q\\rVert = 1', nota: 'Un **cuaternión unitario** codifica una rotación 3D.' },
    { tipo: 'formula', latex: "\\mathbf{v}' = q\\,\\mathbf{v}\\,q^{-1}", nota: 'Rotar un vector $\\mathbf v$ mediante el cuaternión $q$.' },
    { tipo: 'formula', latex: 'q = \\left(\\cos\\tfrac{\\theta}{2},\\; \\sin\\tfrac{\\theta}{2}\\,\\hat{\\mathbf{a}}\\right)', nota: 'Rotación de ángulo $\\theta$ alrededor del eje unitario $\\hat{\\mathbf a}$.' },

    { tipo: 'subtitulo', texto: 'Latencia: motion-to-photon' },
    { tipo: 'parrafo', texto: 'La **latencia movimiento-a-fotón** es el tiempo desde que el usuario mueve la cabeza hasta que la pantalla lo refleja. Si supera ~**20 ms** aparece **mareo (motion sickness)**. Se combate con alta tasa de refresco (90–120 Hz) y **reproyección temporal** (timewarp).' },

    { tipo: 'subtitulo', texto: 'Fortalezas, debilidades y aplicaciones' },
    { tipo: 'tabla', headers: ['', 'Fortalezas', 'Debilidades'], filas: [
      ['**RV**', 'Inmersión total, entornos imposibles', 'Aislamiento, mareo, hardware'],
      ['**RA**', 'Contexto real + info útil, movilidad', 'Registro difícil, oclusión, iluminación coherente'],
    ] },
    { tipo: 'lista', items: [
      '**Medicina:** entrenamiento quirúrgico, terapia de fobias, planificación con modelos 3D.',
      '**Educación:** laboratorios y visitas virtuales.',
      '**Industria:** simuladores, mantenimiento asistido por RA, gemelos digitales.',
      '**Entretenimiento:** juegos inmersivos, eventos.',
    ] },
  ],

  formulas: [
    { latex: 'q=w+x\\mathbf i+y\\mathbf j+z\\mathbf k,\\;\\lVert q\\rVert=1', desc: '**Cuaternión** unitario (orientación).' },
    { latex: '\\mathbf v_{rot}=q\\,\\mathbf v\\,q^{-1}', desc: 'Rotación de un vector con un cuaternión.' },
    { latex: 'q=(\\cos\\tfrac\\theta2,\\ \\sin\\tfrac\\theta2\\,\\hat{\\mathbf a})', desc: 'Cuaternión de ángulo $\\theta$ y eje $\\hat{\\mathbf a}$.' },
    { latex: 'd=\\dfrac{fB}{Z}', desc: 'Disparidad estéreo ($B$=IPD, $Z$=profundidad).' },
    { latex: '\\text{latencia} < 20\\text{ ms}', desc: 'Motion-to-photon para evitar mareo.' },
  ],

  ejercicios: [
    { titulo: 'Ubicar en el continuo de Milgram', tipo: 'teoria', dif: 'media',
      enunciado: 'Clasifica en el continuo de Milgram: (a) un casco que muestra un mundo 100% sintético, (b) gafas que proyectan flechas de navegación sobre la calle, (c) un juego donde un objeto real se integra en una escena mayormente virtual.',
      solucion: '(a) **RV** (extremo virtual): entorno totalmente sintético. (b) **RA** (cerca del extremo real): añade elementos virtuales al mundo real dominante. (c) **Virtualidad Aumentada** (dentro de la Realidad Mixta, más cerca del extremo virtual): la escena es mayormente virtual con elementos reales incrustados. Todas salvo los extremos puros caen bajo **Realidad Mixta**.', },

    { titulo: 'Cuaternión de una rotación', tipo: 'practica', dif: 'dificil',
      enunciado: 'Escribe el cuaternión unitario que representa una rotación de $90°$ alrededor del eje $\\hat{\\mathbf a}=(0,1,0)$.',
      pista: '$q=(\\cos\\tfrac\\theta2,\\ \\sin\\tfrac\\theta2\\,\\hat{\\mathbf a})$ con $\\theta=90°$.',
      solucion: '$\\theta/2=45°$, $\\cos45°=\\sin45°=\\tfrac{\\sqrt2}{2}\\approx0.707$.\n$q=\\left(0.707,\\ 0.707\\cdot(0,1,0)\\right)=(w,x,y,z)=(0.707,\\ 0,\\ 0.707,\\ 0)$.\nEs unitario: $0.707^2+0.707^2=1$. ✓ Representa girar 90° en torno al eje Y.', },

    { titulo: 'Por qué cuaterniones y no Euler', tipo: 'teoria', dif: 'media',
      enunciado: 'Explica el **gimbal lock** y por qué los cuaterniones lo evitan en el seguimiento de orientación de un HMD.',
      solucion: 'El **gimbal lock** ocurre con ángulos de Euler cuando dos ejes de rotación se alinean (p. ej. pitch = 90°), perdiéndose un grado de libertad y provocando saltos/indeterminación. Los **cuaterniones** representan la orientación como un punto en la 4-esfera unitaria, **sin ejes privilegiados**, así que no sufren gimbal lock; además se **interpolan suavemente** (slerp) y son estables numéricamente al normalizar. Por eso el tracking de HMDs usa cuaterniones internamente.', },

    { titulo: 'Costo del render estéreo', tipo: 'practica', dif: 'media',
      enunciado: 'Un motor renderiza una escena monoscópica a 90 FPS holgadamente. Al pasar a RV estéreo el rendimiento cae. Explica por qué y menciona una técnica para mitigarlo.',
      solucion: 'La RV requiere **dos vistas** (una por ojo) por fotograma, casi **duplicando** el trabajo de render, y además a alta tasa (90+ Hz) para evitar mareo, con lo que el presupuesto por ojo se reduce mucho. Mitigaciones: **single-pass/multiview stereo** (renderizar ambos ojos en una pasada compartiendo geometría), **foveated rendering** (alta resolución solo donde mira el ojo, seguido por eye-tracking) y reproyección/timewarp para sostener la tasa.', },

    { titulo: 'Presupuesto de latencia', tipo: 'practica', dif: 'dificil',
      enunciado: 'Para evitar mareo la latencia motion-to-photon debe ser < 20 ms. Si el tracking tarda 3 ms, el render 8 ms y el escaneo de pantalla 4 ms, ¿cuánto margen queda y qué pasa a 60 Hz de refresco?',
      pista: 'Suma las etapas; un fotograma a 60 Hz dura 16.6 ms.',
      solucion: 'Suma actual: $3+8+4=15$ ms, margen $\\approx5$ ms bajo el umbral de 20 ms. Pero a **60 Hz** un fotograma dura 16.6 ms y suele haber esperas de sincronización (v-sync) que añaden hasta ~16 ms de latencia, empujando el total por encima de 20 ms → mareo. Por eso la RV usa **90–120 Hz** (fotogramas de 11.1–8.3 ms) y **reproyección** para mantener la latencia efectiva baja.', },

    { titulo: 'SLAM vs marcadores', tipo: 'teoria', dif: 'media',
      enunciado: 'Compara el seguimiento por marcadores con SLAM para una app de RA que coloca muebles en cualquier sala.',
      solucion: '**Marcadores:** requieren colocar patrones conocidos (ArUco/QR) en el entorno; son precisos y baratos pero **poco prácticos** para el usuario final (hay que "ensuciar" la sala). **SLAM:** construye un mapa del entorno y se localiza en él usando cámara + IMU (**inside-out**, sin marcadores), permitiendo colocar muebles en **cualquier** sala sin preparación. Por eso ARKit/ARCore usan SLAM con detección de planos. Su reto es la deriva y las superficies sin textura, que se mitigan con fusión IMU-visión.', },
  ],

  preguntas: [
    { q: 'La diferencia esencial entre RV y RA es que la RA:', opciones: ['Aísla al usuario del mundo real', 'Superpone contenido virtual sobre el mundo real', 'No usa pantallas', 'Solo funciona con marcadores'], correcta: 1, exp: 'La RA aumenta el mundo real; la RV lo reemplaza por uno sintético.', dif: 'media' },
    { q: 'El continuo de Milgram describe:', opciones: ['Un tipo de HMD', 'El espectro entre lo real y lo totalmente virtual', 'Un algoritmo de tracking', 'Una fórmula de estéreo'], correcta: 1, exp: 'Va de la realidad a la virtualidad, con la Realidad Mixta en medio.', dif: 'media' },
    { q: 'El renderizado **estereoscópico** consiste en:', opciones: ['Renderizar en blanco y negro', 'Renderizar una imagen distinta por ojo (visión binocular)', 'Usar una sola cámara', 'Duplicar la resolución'], correcta: 1, exp: 'Dos vistas separadas por la IPD dan sensación de profundidad; duplica el costo.', dif: 'media' },
    { q: '**6DoF** significa que se rastrea:', opciones: ['Solo rotación', 'Rotación y traslación (6 grados de libertad)', 'Solo posición', 'El color'], correcta: 1, exp: '6DoF = 3 de rotación + 3 de traslación; 3DoF es solo rotación.', dif: 'media' },
    { q: '**SLAM** permite:', opciones: ['Renderizar sombras', 'Localizarse y mapear el entorno a la vez, sin marcadores', 'Comprimir texturas', 'Calcular la BRDF'], correcta: 1, exp: 'Simultaneous Localization and Mapping: tracking inside-out sin patrones.', dif: 'media' },
    { q: 'Se prefieren **cuaterniones** sobre ángulos de Euler porque:', opciones: ['Ocupan menos bits siempre', 'Evitan el gimbal lock y se interpolan suavemente', 'Son más fáciles de leer', 'No representan rotaciones'], correcta: 1, exp: 'Sin ejes privilegiados: no hay gimbal lock, y el slerp interpola bien.', dif: 'dificil' },
    { q: 'Un cuaternión que representa una rotación debe ser:', opciones: ['Nulo', 'Unitario ($\\lVert q\\rVert=1$)', 'Entero', 'Negativo'], correcta: 1, exp: 'Solo los cuaterniones unitarios codifican rotaciones puras.', dif: 'media' },
    { q: 'La rotación de un vector con un cuaternión es:', opciones: ['$q+\\mathbf v$', '$q\\,\\mathbf v\\,q^{-1}$', '$\\mathbf v/q$', '$q\\cdot q$'], correcta: 1, exp: 'Se conjuga el vector (como cuaternión puro) con $q$ y su inverso.', dif: 'dificil' },
    { q: 'El **registro** en RA se refiere a:', opciones: ['Guardar la partida', 'Alinear correctamente lo virtual con el mundo real', 'Registrar usuarios', 'Comprimir vídeo'], correcta: 1, exp: 'Si el registro falla, los objetos virtuales flotan o se deslizan respecto al real.', dif: 'media' },
    { q: 'La latencia **motion-to-photon** debería mantenerse por debajo de:', opciones: ['~20 ms', '~200 ms', '~2 s', '~5 ms exactos'], correcta: 0, exp: 'Por encima de ~20 ms aparece el mareo; se usan 90–120 Hz y reproyección.', dif: 'dificil' },
    { q: 'La **IMU** de un HMD combina típicamente:', opciones: ['Cámara y micrófono', 'Giroscopio y acelerómetro', 'GPS y LiDAR', 'Pantalla y lente'], correcta: 1, exp: 'La IMU (giroscopio+acelerómetro) da orientación rápida; se fusiona con visión para corregir deriva.', dif: 'media' },
    { q: 'La disparidad estéreo $d=fB/Z$ implica que objetos más lejanos:', opciones: ['Tienen más disparidad', 'Tienen menos disparidad entre ojos', 'No se ven', 'Cambian de color'], correcta: 1, exp: 'A mayor profundidad $Z$, menor disparidad; por eso lo lejano parece "plano".', dif: 'dificil' },
  ],
};

export default tema;
