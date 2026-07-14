/** Tipos de contenido de RepasoCV. Todo el texto admite $matemáticas$, **negrita**, `código`. */

export type Bloque =
  | { tipo: 'parrafo'; texto: string }
  | { tipo: 'subtitulo'; texto: string }
  | { tipo: 'lista'; items: string[]; ordenada?: boolean }
  | { tipo: 'formula'; latex: string; nota?: string }
  | { tipo: 'imagen'; src: string; alt: string; caption?: string }
  | { tipo: 'nota'; texto: string; estilo?: 'info' | 'clave' | 'aviso' }
  | { tipo: 'codigo'; lang?: string; code: string }
  | { tipo: 'tabla'; headers: string[]; filas: string[][] };

export interface FormulaClave {
  latex: string;
  desc: string;
}

/** Video didáctico recomendado (YouTube). idioma: 'es' = español, 'sub' = inglés subtitulable. */
export interface Video {
  titulo: string;
  canal: string;
  url: string;
  idioma: 'es' | 'sub';
  nota?: string; // p.ej. "Enfoque práctico en Blender"
}

export interface Pregunta {
  q: string;
  opciones: string[];
  correcta: number; // índice de la opción correcta
  exp: string; // explicación
  dif?: 'media' | 'dificil';
}

export interface Ejercicio {
  titulo: string;
  enunciado: string;
  tipo: 'teoria' | 'practica';
  dif: 'media' | 'dificil';
  pista?: string;
  solucion: string;
}

/** Pregunta teórica de Verdadero / Falso con justificación razonada. */
export interface PreguntaVF {
  afirmacion: string;
  esVerdadero: boolean;
  justificacion: string; // por qué es verdadera o falsa
}

/** Examen tipo "pasado" de Computación Gráfica, basado en bibliografía clásica. */
export interface Examen {
  slug: string;
  codigo: string; // p.ej. "Examen 01"
  titulo: string;
  descripcion: string;
  fuente: string; // libro / referencia de donde se inspira
  duracion?: string; // p.ej. "2 horas"
  temas: string[]; // temario cubierto
  color: string; // color de acento (hex)
  verdaderoFalso: PreguntaVF[];
  opcionMultiple: Pregunta[];
  aplicacion: Ejercicio[];
}

export interface Tema {
  slug: string;
  seccion: 'teoria' | 'exposiciones';
  codigo?: string; // p.ej. "TEO 09"
  titulo: string;
  subtitulo: string;
  resumen: string;
  tags: string[];
  color: string; // color de acento del tema (hex)
  teoria: Bloque[];
  formulas: FormulaClave[];
  ejercicios: Ejercicio[];
  preguntas: Pregunta[];
}
