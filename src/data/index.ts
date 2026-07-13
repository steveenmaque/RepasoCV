import type { Tema, Examen } from '../lib/types';

const modsTeoria = import.meta.glob<{ default: Tema }>('./teoria/*.ts', { eager: true });
const modsExpos = import.meta.glob<{ default: Tema }>('./expos/*.ts', { eager: true });
const modsExamenes = import.meta.glob<{ default: Examen }>('./examenes/*.ts', { eager: true });

function collect(mods: Record<string, { default: Tema }>): Tema[] {
  return Object.values(mods)
    .map((m) => m.default)
    .sort((a, b) => (a.codigo ?? a.titulo).localeCompare(b.codigo ?? b.titulo, 'es'));
}

export const teoria: Tema[] = collect(modsTeoria);
export const exposiciones: Tema[] = collect(modsExpos);
export const todos: Tema[] = [...teoria, ...exposiciones];
export const porSlug: Record<string, Tema> = Object.fromEntries(todos.map((t) => [t.slug, t]));

export const examenes: Examen[] = Object.values(modsExamenes)
  .map((m) => m.default)
  .sort((a, b) => a.codigo.localeCompare(b.codigo, 'es'));
export const porExamenSlug: Record<string, Examen> = Object.fromEntries(
  examenes.map((e) => [e.slug, e]),
);

/** Métricas globales para la portada. */
export const stats = {
  temas: todos.length,
  teoria: teoria.length,
  expos: exposiciones.length,
  examenes: examenes.length,
  preguntas: todos.reduce((n, t) => n + t.preguntas.length, 0),
  ejercicios: todos.reduce((n, t) => n + t.ejercicios.length, 0),
  formulas: todos.reduce((n, t) => n + t.formulas.length, 0),
  // Preguntas totales incluyendo los exámenes (V/F + opción múltiple + aplicación).
  preguntasExamen: examenes.reduce(
    (n, e) => n + e.verdaderoFalso.length + e.opcionMultiple.length + e.aplicacion.length,
    0,
  ),
};
