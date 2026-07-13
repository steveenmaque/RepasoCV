import katex from 'katex';

/** Escapa HTML básico. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Renderiza texto en línea a HTML seguro admitiendo:
 *   - Matemáticas en bloque con  $$ ... $$   (KaTeX display)
 *   - Matemáticas en línea con   $ ... $     (KaTeX inline)
 *   - Negrita  **texto**
 *   - Cursiva  _texto_
 *   - Código   `texto`
 *   - Saltos de línea  \n  →  <br>
 * Todo lo demás se escapa. No emite JS en runtime (KaTeX se pre-renderiza en el build).
 */
export function inline(text: string): string {
  const parts = text.split(/(\$\$[^$]+\$\$|\$[^$]+\$)/g);
  return parts
    .map((p) => {
      if (p.length > 4 && p.startsWith('$$') && p.endsWith('$$')) {
        return katex.renderToString(p.slice(2, -2), { throwOnError: false, displayMode: true });
      }
      if (p.length > 2 && p.startsWith('$') && p.endsWith('$')) {
        return katex.renderToString(p.slice(1, -1), { throwOnError: false, displayMode: false });
      }
      let s = escapeHtml(p);
      s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
      s = s.replace(/(^|[\s(])_([^_]+)_/g, '$1<em>$2</em>');
      s = s.replace(/\n/g, '<br>');
      return s;
    })
    .join('');
}

/** Renderiza una fórmula en modo display (bloque centrado). */
export function display(tex: string): string {
  return katex.renderToString(tex, { throwOnError: false, displayMode: true });
}
