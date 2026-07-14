import type { Video } from '../lib/types';

/**
 * Videos didácticos recomendados por tema (clave = slug del Tema).
 * Todas las URLs se verificaron como activas vía el endpoint oEmbed de YouTube
 * (título y canal reales). idioma: 'es' = explicación en español ·
 * 'sub' = en inglés (activa los subtítulos automáticos de YouTube).
 */
export const videosPorSlug: Record<string, Video[]> = {
  // ---------- Teoría ----------
  'curvas-superficies': [
    { titulo: '¿Cómo funcionan las curvas de Bézier? La matemática detrás', canal: 'MathLike', url: 'https://www.youtube.com/watch?v=oRd3l7ILTNY', idioma: 'es' },
    { titulo: 'Curvas de Bézier (Bézier / De Casteljau)', canal: 'regCode', url: 'https://www.youtube.com/watch?v=dF1rR2Px8CA', idioma: 'es' },
    { titulo: 'DisGeo 1.2: Curvas de Bézier (propiedades)', canal: 'UPM', url: 'https://www.youtube.com/watch?v=uZI4bY4uULo', idioma: 'es' },
  ],
  'modelado-solidos': [
    { titulo: 'Ray marching y funciones de distancia con signo (SDF)', canal: 'Auctux', url: 'https://www.youtube.com/watch?v=SdNb7-I1TtA', idioma: 'sub', nota: 'Modelado implícito / volumétrico' },
    { titulo: 'Mallas poligonales para impresión 3D (Blendiberia)', canal: 'BLENDIBERIA', url: 'https://www.youtube.com/watch?v=qgWYQ4lUUmw', idioma: 'es', nota: 'Representación por fronteras / mallas' },
  ],
  'representacion-fronteras': [
    { titulo: 'Estructura de la malla 3D: vértices, aristas y caras', canal: 'EDYNO Estudio', url: 'https://www.youtube.com/watch?v=GLPN0FG7sEk', idioma: 'es' },
    { titulo: 'Mallas poligonales para impresión 3D (Blendiberia)', canal: 'BLENDIBERIA', url: 'https://www.youtube.com/watch?v=qgWYQ4lUUmw', idioma: 'es' },
  ],

  // ---------- Exposiciones ----------
  fractales: [
    { titulo: 'Hoy sí entenderás el conjunto de Mandelbrot — Fractales', canal: 'Mate Partial', url: 'https://www.youtube.com/watch?v=Bx86fxHmlPY', idioma: 'es' },
    { titulo: '¿Qué son los fractales? Introducción a los fractales', canal: 'Biología 2.0', url: 'https://www.youtube.com/watch?v=tv3Wj7ou_v8', idioma: 'es' },
    { titulo: 'Every Fractal Dimension Explained (dimensión fractal)', canal: 'ThoughtThrill', url: 'https://www.youtube.com/watch?v=n8e-1IWNXhE', idioma: 'sub' },
  ],
  'csg-vs-brep': [
    { titulo: 'Ray marching y funciones de distancia con signo (SDF)', canal: 'Auctux', url: 'https://www.youtube.com/watch?v=SdNb7-I1TtA', idioma: 'sub', nota: 'Base del modelado por SDF y marching cubes' },
  ],
  'iluminacion-global': [
    { titulo: '¿Qué es el Path Tracing y cómo mejora los gráficos?', canal: 'PapáPitufo141', url: 'https://www.youtube.com/watch?v=CSp89XiUPnU', idioma: 'es' },
    { titulo: 'Iluminación y sombreado 3D — Computación Gráfica (OpenGL/C++)', canal: 'Yecid Sánchez León', url: 'https://www.youtube.com/watch?v=q9ehUQ0vD9s', idioma: 'es' },
  ],
  'iluminacion-local': [
    { titulo: 'Iluminación y modelo de Phong (clase universitaria)', canal: 'Instituto de Informática UACh', url: 'https://www.youtube.com/watch?v=dzZ5LBGbybY', idioma: 'es' },
    { titulo: 'Reflexión especular y difusa', canal: 'Luis Fernando Sánchez Pérez', url: 'https://www.youtube.com/watch?v=1-K7eQ5OKfA', idioma: 'es' },
  ],
  'mapeo-texturas': [
    { titulo: 'Texturizado con mapas UV — Blender en español', canal: 'El Canal de Jack', url: 'https://www.youtube.com/watch?v=qXWErzAk4hY', idioma: 'es', nota: 'Enfoque práctico en Blender' },
    { titulo: 'UV Mapping en Blender — lo que no te han contado', canal: '3Dilusion', url: 'https://www.youtube.com/watch?v=fk0xacDu0HU', idioma: 'es', nota: 'Enfoque práctico en Blender' },
  ],
  'imagenes-medicas': [
    { titulo: 'Procesamiento de imágenes médicas', canal: 'CyM Tech', url: 'https://www.youtube.com/watch?v=l8xKIm-dQfA', idioma: 'es' },
    { titulo: 'Introducción a los sistemas de imagen médica digital', canal: 'Medicarama', url: 'https://www.youtube.com/watch?v=E2cs7PdLEhA', idioma: 'es' },
    { titulo: 'Segmentación de imágenes médicas', canal: 'CyM Tech', url: 'https://www.youtube.com/watch?v=Aa3YT2wcIlU', idioma: 'es' },
  ],
  'motores-graficos': [
    { titulo: '¿Cómo funcionan por dentro los motores de videojuegos?', canal: 'Guinxu', url: 'https://www.youtube.com/watch?v=t1T0M2mLhzc', idioma: 'es' },
    { titulo: '¿Qué son y cómo funcionan los motores de videojuegos?', canal: 'UltorW', url: 'https://www.youtube.com/watch?v=I882KQ3U8r4', idioma: 'es' },
    { titulo: 'Todos los motores gráficos explicados en 15 minutos', canal: 'TecnoCroquis', url: 'https://www.youtube.com/watch?v=AO26wrSEMc4', idioma: 'es' },
  ],
  'ray-tracing': [
    { titulo: '¿Sabes qué es el Ray Tracing y cómo disfrutarlo?', canal: 'Computer Hoy', url: 'https://www.youtube.com/watch?v=pAALmD2LQIc', idioma: 'es' },
    { titulo: 'Lo que NO te contaron sobre el Ray Tracing', canal: 'Nate Gentile', url: 'https://www.youtube.com/watch?v=tbsudki8Sro', idioma: 'es' },
  ],
  'vr-ra': [
    { titulo: 'Diferencias entre Realidad Virtual, Aumentada, Mixta y eXtendida', canal: 'imesi net', url: 'https://www.youtube.com/watch?v=vKkloQAZB1g', idioma: 'es' },
    { titulo: 'Diferencias entre Realidad Virtual, Aumentada y Mixta (U-tad)', canal: 'U-tad', url: 'https://www.youtube.com/watch?v=BqT-omi_2yo', idioma: 'es' },
  ],
};

/** Extrae el ID de 11 caracteres de una URL de YouTube (watch?v= o youtu.be). */
export function youtubeId(url: string): string | null {
  const m = url.match(/(?:v=|youtu\.be\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}
