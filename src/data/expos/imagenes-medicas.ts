import type { Tema } from '../../lib/types';

const tema: Tema = {
  slug: 'imagenes-medicas',
  seccion: 'exposiciones',
  titulo: 'Procesamiento de Imágenes Médicas',
  subtitulo:
    'Modalidades (Rayos X, TC, RM, ultrasonido), filtrado y reducción de ruido (mediana, gaussiano, difusión anisotrópica, NLM), segmentación (umbralización, Otsu, region growing, deep learning) y métricas.',
  resumen:
    'Técnicas para mejorar y analizar imágenes clínicas: filtros de reducción de ruido que preservan bordes, algoritmos de segmentación y su evaluación (Dice/IoU), con aplicaciones diagnósticas.',
  tags: ['TC', 'RM', 'Segmentación', 'Otsu', 'Filtrado', 'Deep Learning'],
  color: '#f43f5e',

  teoria: [
    { tipo: 'parrafo', texto: 'El **procesamiento de imágenes médicas** aplica visión por computador a datos clínicos para **mejorar** su calidad, **segmentar** estructuras (órganos, tumores) y **apoyar el diagnóstico**. A diferencia de la imagen natural, aquí priman la fidelidad, la reproducibilidad y la preservación de detalles diagnósticos.' },

    { tipo: 'subtitulo', texto: 'Modalidades de imagen' },
    { tipo: 'tabla', headers: ['Modalidad', 'Principio físico', 'Uso típico'], filas: [
      ['**Rayos X**', 'Atenuación de radiación ionizante', 'Huesos, tórax (2D)'],
      ['**TC (Tomografía)**', 'Múltiples rayos X + reconstrucción', 'Cortes 3D, trauma, órganos'],
      ['**RM (Resonancia)**', 'Campos magnéticos + radiofrecuencia', 'Tejidos blandos, cerebro (sin radiación)'],
      ['**Ultrasonido**', 'Ecos de ondas sonoras', 'Tiempo real, obstetricia, cardíaco'],
    ] },
    { tipo: 'nota', estilo: 'info', texto: 'En **TC** la intensidad se mide en **unidades Hounsfield (HU)**: agua = 0, aire ≈ −1000, hueso denso > +1000. Esa escala calibrada permite umbralizar tejidos de forma robusta.' },

    { tipo: 'subtitulo', texto: 'Mejora y reducción de ruido (filtrado)' },
    { tipo: 'parrafo', texto: 'Las imágenes médicas suelen tener ruido (moteado en ultrasonido, ruido térmico en RM). El reto es **reducir ruido sin borrar bordes** (que pueden ser lesiones).' },
    { tipo: 'lista', items: [
      '**Filtro de mediana:** reemplaza cada píxel por la mediana de su vecindad; excelente contra ruido *sal y pimienta* y preserva bordes.',
      '**Filtro gaussiano:** promedio ponderado por una gaussiana; suaviza ruido pero **difumina bordes**.',
      '**Difusión anisotrópica (Perona-Malik):** suaviza dentro de regiones homogéneas pero **frena la difusión en los bordes** (los preserva).',
      '**Non-Local Means (NLM):** promedia píxeles con **vecindarios similares** en toda la imagen, no solo cercanos; muy buena preservación de textura.',
    ] },
    { tipo: 'formula', latex: 'G(x,y)=\\dfrac{1}{2\\pi\\sigma^2}\\,e^{-\\frac{x^2+y^2}{2\\sigma^2}}', nota: 'Núcleo del **filtro gaussiano**; $\\sigma$ controla el grado de suavizado.' },
    { tipo: 'formula', latex: '\\partial_t I = \\operatorname{div}\\!\\big(c(\\lVert\\nabla I\\rVert)\\,\\nabla I\\big)', nota: 'Difusión anisotrópica: $c(\\cdot)$ decrece con el gradiente ⇒ no difunde a través de bordes.' },
    { tipo: 'imagen', src: '/img/expos/imagenes-medicas/filtrado.webp', alt: 'Comparación de filtros de reducción de ruido', caption: 'Reducción de ruido preservando bordes (mediana / difusión anisotrópica / NLM).' },

    { tipo: 'subtitulo', texto: 'Segmentación' },
    { tipo: 'parrafo', texto: 'Segmentar es **dividir la imagen en regiones** (p. ej. separar un tumor del tejido sano). Métodos principales:' },
    { tipo: 'subtitulo', texto: '1) Umbralización (thresholding)' },
    { tipo: 'parrafo', texto: 'Clasifica cada píxel según supere o no un umbral $T$. Simple y rápido; funciona cuando el histograma es **bimodal**.' },
    { tipo: 'formula', latex: 'g(x,y)=\\begin{cases}1 & \\text{si } I(x,y)\\ge T\\\\ 0 & \\text{si } I(x,y)<T\\end{cases}' },
    { tipo: 'parrafo', texto: 'El método de **Otsu** elige automáticamente el $T$ que **maximiza la varianza entre clases** (o minimiza la intra-clase):' },
    { tipo: 'formula', latex: '\\sigma_b^2(T)=\\omega_0(T)\\,\\omega_1(T)\\,\\big(\\mu_0(T)-\\mu_1(T)\\big)^2', nota: 'Otsu: se busca el $T$ que maximiza $\\sigma_b^2$ (separación entre fondo y objeto).' },
    { tipo: 'subtitulo', texto: '2) Crecimiento de regiones (region growing)' },
    { tipo: 'parrafo', texto: 'Parte de una **semilla** y agrega píxeles vecinos que cumplen un criterio de similitud (p. ej. $|I(x)-\\mu_R|<\\tau$, con $\\mu_R$ la media de la región). Respeta la conectividad, pero es sensible a la semilla y al ruido.' },
    { tipo: 'subtitulo', texto: '3) Deep learning (U-Net)' },
    { tipo: 'parrafo', texto: 'Las redes convolucionales tipo **U-Net** (encoder-decoder con *skip connections*) segmentan a nivel de píxel con precisión estado del arte, aprendiendo de datos anotados. Dominan la segmentación médica actual.' },

    { tipo: 'subtitulo', texto: 'Evaluación: coeficiente de Dice' },
    { tipo: 'parrafo', texto: 'La calidad de una segmentación se mide comparándola con la anotación de un experto (ground truth). La métrica más usada es el **coeficiente de Dice** (solape):' },
    { tipo: 'formula', latex: '\\text{Dice}=\\dfrac{2\\,|A\\cap B|}{|A|+|B|}, \\qquad \\text{IoU}=\\dfrac{|A\\cap B|}{|A\\cup B|}', nota: 'Dice $=1$ es solape perfecto; se relaciona con IoU (Jaccard).' },

    { tipo: 'subtitulo', texto: 'Aplicaciones' },
    { tipo: 'lista', items: [
      'Detección y medición de **tumores** y lesiones.',
      'Planificación quirúrgica y **reconstrucción 3D** (isosuperficies con Marching Cubes desde TC/RM).',
      'Cuantificación de volúmenes (cardíaco, cerebral).',
      'Diagnóstico asistido por computador (**CAD**) y cribado.',
    ] },
  ],

  formulas: [
    { latex: 'G(x,y)=\\tfrac{1}{2\\pi\\sigma^2}e^{-\\frac{x^2+y^2}{2\\sigma^2}}', desc: 'Núcleo **gaussiano** (suavizado).' },
    { latex: '\\partial_t I=\\operatorname{div}(c(\\lVert\\nabla I\\rVert)\\nabla I)', desc: 'Difusión **anisotrópica** (preserva bordes).' },
    { latex: 'g=[\\,I\\ge T\\,]', desc: 'Umbralización (**thresholding**).' },
    { latex: '\\sigma_b^2=\\omega_0\\omega_1(\\mu_0-\\mu_1)^2', desc: 'Varianza entre clases (**Otsu**).' },
    { latex: '\\text{Dice}=\\tfrac{2|A\\cap B|}{|A|+|B|}', desc: 'Métrica de **solape** (segmentación).' },
  ],

  ejercicios: [
    { titulo: 'Filtro de mediana', tipo: 'practica', dif: 'media',
      enunciado: 'Una vecindad $3\\times3$ tiene los valores $[12,15,14,200,13,16,11,15,14]$ (el 200 es un pixel de ruido "sal"). ¿Qué valor da el filtro de mediana y por qué es mejor que la media aquí?',
      pista: 'Ordena y toma el valor central (posición 5 de 9).',
      solucion: 'Ordenados: $[11,12,13,14,14,15,15,16,200]$; la **mediana** (5.º valor) es **14**. La **media** sería $(12+15+14+200+13+16+11+15+14)/9\\approx34.4$, contaminada por el 200. La mediana ignora el atípico: por eso elimina el ruido sal y pimienta **sin difuminar** el resto.', },

    { titulo: 'Umbral de Otsu (intuición)', tipo: 'teoria', dif: 'media',
      enunciado: 'Explica qué maximiza el método de Otsu y por qué eso separa bien objeto y fondo en un histograma bimodal.',
      solucion: 'Otsu prueba todos los umbrales $T$ y elige el que **maximiza la varianza entre clases** $\\sigma_b^2=\\omega_0\\omega_1(\\mu_0-\\mu_1)^2$ (equivalente a minimizar la varianza dentro de cada clase). En un histograma **bimodal** (dos picos: fondo y objeto), ese $T$ cae en el **valle** entre ambos picos, donde las dos poblaciones quedan más separadas (medias $\\mu_0,\\mu_1$ lejanas) y cada una compacta. Así maximiza la separabilidad sin necesidad de fijar el umbral a mano.', },

    { titulo: 'Coeficiente de Dice', tipo: 'practica', dif: 'media',
      enunciado: 'Una segmentación automática marca 800 píxeles como tumor; el experto marcó 1000. El solape (intersección) es de 700 píxeles. Calcula el coeficiente de Dice.',
      pista: '$\\text{Dice}=2|A\\cap B|/(|A|+|B|)$.',
      solucion: '$\\text{Dice}=\\dfrac{2\\cdot700}{800+1000}=\\dfrac{1400}{1800}\\approx 0.78$. Un Dice de 0.78 indica buen solape pero mejorable (0.85–0.95 es lo habitual en modelos clínicos aceptables).', },

    { titulo: 'Gaussiano vs difusión anisotrópica', tipo: 'teoria', dif: 'dificil',
      enunciado: 'Ambos reducen ruido. ¿Por qué la difusión anisotrópica preserva mejor los bordes de una lesión que un simple filtro gaussiano?',
      solucion: 'El **gaussiano** promedia isotrópicamente (igual en todas direcciones), así que en un borde mezcla píxeles de ambos lados y lo **difumina**. La **difusión anisotrópica** (Perona-Malik) hace que el coeficiente de difusión $c(\\lVert\\nabla I\\rVert)$ **decrezca donde el gradiente es alto** (bordes): difunde/suaviza dentro de regiones homogéneas pero **casi no difunde a través de los bordes**, conservándolos nítidos. En diagnóstico esto es crucial porque el borde de una lesión es información clínica.', },

    { titulo: 'Region growing y su fragilidad', tipo: 'practica', dif: 'dificil',
      enunciado: 'Un algoritmo de region growing se siembra dentro de un órgano y "se desborda" invadiendo tejido vecino. Explica la causa (leak) y dos formas de mitigarlo.',
      solucion: 'Causa: si dos tejidos tienen intensidades **similares** y están conectados por un puente de píxeles que cumplen el criterio (por ruido o *partial volume*), la región **se fuga** (leak) hacia el vecino. Mitigaciones: (1) endurecer el **criterio de similitud** (umbral $\\tau$ más estricto o adaptativo con la varianza de la región); (2) **preprocesar** con un filtro que preserve bordes (mediana/anisotrópico) para cerrar los puentes de ruido; (3) usar restricciones morfológicas o combinar con umbral + apertura. También ayuda una buena elección de semilla y límites (máscaras).', },

    { titulo: 'Por qué U-Net domina', tipo: 'teoria', dif: 'media',
      enunciado: 'Menciona qué aporta la arquitectura U-Net (encoder-decoder con skip connections) frente a umbral/region growing en segmentación médica.',
      solucion: 'U-Net **aprende** características discriminativas de los datos anotados en vez de depender de reglas fijas de intensidad. El **encoder** captura contexto (qué es la estructura) reduciendo resolución; el **decoder** recupera la resolución para segmentar píxel a píxel; las **skip connections** reinyectan detalle espacial fino perdido en el encoder, dando bordes precisos. Así maneja intensidades solapadas, texturas y variabilidad anatómica que hunden a umbral/region growing, alcanzando exactitud (Dice) estado del arte.', },
  ],

  preguntas: [
    { q: '¿Qué modalidad NO usa radiación ionizante?', opciones: ['Rayos X', 'TC', 'Resonancia magnética', 'Radiografía'], correcta: 2, exp: 'La RM usa campos magnéticos y radiofrecuencia; es ideal para tejidos blandos sin radiación.', dif: 'media' },
    { q: 'En TC, la intensidad se mide en:', opciones: ['Píxeles', 'Unidades Hounsfield (HU)', 'Lúmenes', 'Decibelios'], correcta: 1, exp: 'La escala Hounsfield calibra: agua = 0, aire ≈ −1000, hueso denso > +1000.', dif: 'media' },
    { q: 'El filtro de **mediana** es especialmente bueno contra:', opciones: ['Ruido gaussiano leve', 'Ruido sal y pimienta, preservando bordes', 'Desenfoque', 'Baja iluminación'], correcta: 1, exp: 'La mediana ignora valores atípicos (sal y pimienta) y no difumina los bordes.', dif: 'media' },
    { q: 'La desventaja del filtro **gaussiano** es que:', opciones: ['Es muy lento', 'Difumina los bordes al suavizar', 'Añade ruido', 'Solo funciona en color'], correcta: 1, exp: 'Al promediar isotrópicamente, suaviza el ruido pero también borra bordes.', dif: 'media' },
    { q: 'La **difusión anisotrópica** (Perona-Malik) se caracteriza por:', opciones: ['Difundir igual en todas direcciones', 'Frenar la difusión en los bordes (los preserva)', 'Aumentar el ruido', 'Ser una umbralización'], correcta: 1, exp: 'El coeficiente de difusión decrece con el gradiente: suaviza regiones planas y respeta bordes.', dif: 'dificil' },
    { q: 'El filtro **Non-Local Means** promedia:', opciones: ['Solo píxeles adyacentes', 'Píxeles con vecindarios similares en toda la imagen', 'Los bordes', 'Nada'], correcta: 1, exp: 'Compara parches: promedia píxeles con entornos parecidos aunque estén lejos, preservando textura.', dif: 'dificil' },
    { q: 'La **umbralización** clasifica cada píxel según:', opciones: ['Su color RGB', 'Si su intensidad supera un umbral $T$', 'Su posición', 'Su vecino más lejano'], correcta: 1, exp: 'Binariza: 1 si $I\\ge T$, 0 si no. Funciona bien con histogramas bimodales.', dif: 'media' },
    { q: 'El método de **Otsu** elige el umbral que:', opciones: ['Minimiza el brillo', 'Maximiza la varianza entre clases', 'Es siempre 128', 'Maximiza el ruido'], correcta: 1, exp: 'Busca el $T$ que maximiza $\\sigma_b^2$ (separación fondo/objeto), automáticamente.', dif: 'dificil' },
    { q: 'El **crecimiento de regiones** parte de:', opciones: ['Toda la imagen a la vez', 'Una o varias semillas que se expanden por similitud', 'Un umbral global', 'Una red neuronal'], correcta: 1, exp: 'Desde una semilla agrega vecinos similares; es sensible a la semilla y puede "fugarse".', dif: 'media' },
    { q: 'La arquitectura **U-Net** para segmentación es de tipo:', opciones: ['Árbol de decisión', 'Encoder-decoder con skip connections', 'Máquina de soporte vectorial', 'Filtro lineal'], correcta: 1, exp: 'Encoder (contexto) + decoder (localización) + skips (detalle fino) para segmentar píxel a píxel.', dif: 'media' },
    { q: 'El coeficiente de **Dice** mide:', opciones: ['La velocidad del algoritmo', 'El solape entre segmentación y ground truth', 'El brillo medio', 'El número de píxeles'], correcta: 1, exp: '$2|A\\cap B|/(|A|+|B|)$: 1 es solape perfecto.', dif: 'media' },
    { q: 'Reconstruir un modelo 3D de un órgano desde cortes de TC/RM se hace típicamente con:', opciones: ['Filtro de mediana', 'Marching Cubes (isosuperficies)', 'Umbral de Otsu', 'Transformada de Fourier'], correcta: 1, exp: 'Marching Cubes extrae la isosuperficie del volumen segmentado en una malla 3D.', dif: 'dificil' },
  ],
};

export default tema;
