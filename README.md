# RepasoCV 🎓

**Guía de estudio interactiva de Computación Visual** — Ciclo 5 · UNMSM (FISI).
Material de repaso para el examen final: teoría condensada, fórmulas, imágenes,
ejercicios de nivel medio–difícil y **cuestionarios interactivos** por cada tema.

> Sitio **100 % estático** (Astro) pensado para desplegarse en **Vercel** con consumo mínimo:
> 0 funciones serverless, solo archivos servidos desde el CDN.

---

## 📚 Contenido

El material está seccionado en **Teoría** y **Exposiciones**, replicando los temas del curso:

### Teoría (sesiones de clase)
| # | Tema | Preguntas | Ejercicios |
|---|------|:---------:|:----------:|
| TEO 09 | Representación de Curvas y Superficies | 18 | 7 |
| TEO 10 | Representación y Modelado de Sólidos | 16 | 7 |
| TEO 11 | Representación de Fronteras (B-rep) | 15 | 6 |

### Exposiciones (temas grupales)
| Tema | Preguntas | Ejercicios |
|------|:---------:|:----------:|
| Fractales | 13 | 6 |
| Geometría Constructiva de Sólidos (CSG) vs B-Rep | 13 | 6 |
| Modelos de Iluminación Global | 12 | 6 |
| Modelos de Iluminación Local | 12 | 6 |
| Mapeo de Texturas | 12 | 6 |
| Motores Gráficos | 13 | 6 |
| Procesamiento de Imágenes Médicas | 12 | 6 |
| Ray Tracing | 12 | 6 |
| Realidad Virtual y Aumentada | 12 | 6 |

**Totales:** 12 temas · 160 preguntas · 74 ejercicios · +70 fórmulas.

Cada tema incluye:
- **Teoría** con fórmulas (renderizadas con KaTeX) e imágenes/diagramas.
- **Fórmulas clave** (chuleta rápida).
- **Ejercicios** de nivel medio–difícil con solución desplegable (≈ **30 % teoría / 70 % práctica**).
- **Cuestionario interactivo** con puntuación, explicaciones y barra de progreso.

---

## 🚀 Puesta en marcha

Requisitos: **Node 18+**.

```bash
npm install      # instala dependencias
npm run dev      # servidor de desarrollo → http://localhost:4321
npm run build    # genera el sitio estático en dist/
npm run preview  # previsualiza el build de producción
```

---

## ☁️ Despliegue en Vercel

El proyecto es un sitio estático de Astro; Vercel lo detecta automáticamente.

**Opción A — Panel web (recomendado):**
1. Sube este repo a GitHub (ya está en `https://github.com/steveenmaque/RepasoCV`).
2. En [vercel.com](https://vercel.com) → *Add New Project* → importa el repositorio.
3. Vercel autodetecta **Astro**. Deja los valores por defecto:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. *Deploy*. Listo ✅ (sin funciones serverless → consumo mínimo).

**Opción B — CLI:**
```bash
npm i -g vercel
vercel          # despliegue de previsualización
vercel --prod   # despliegue a producción
```

---

## 🛠️ Tecnología y decisiones de diseño

- **[Astro](https://astro.build)** con salida `static` → HTML puro, JS mínimo.
- **[KaTeX](https://katex.org)** para las fórmulas, **renderizadas en tiempo de build**
  (no se envía JS de matemáticas al navegador, solo CSS ligero).
- **Cuestionarios en JavaScript vanilla** (sin framework de UI) → bundle diminuto.
- **Imágenes propias en WebP** (~260 KB en total): diagramas generados con código,
  con tema oscuro a juego. Nada de assets pesados.
- Sin base de datos, sin API, sin cookies. Todo se calcula en el build.

### Estructura del proyecto
```
RepasoCV/
├── src/
│   ├── data/
│   │   ├── teoria/        # 1 archivo .ts por tema de teoría
│   │   └── expos/         # 1 archivo .ts por exposición
│   ├── components/        # Quiz, Bloques, Ejercicios, TemaCard
│   ├── layouts/Base.astro
│   ├── lib/               # tipos + render de KaTeX/markdown-inline
│   ├── pages/             # index, teoria, exposiciones, tema/[slug]
│   └── styles/global.css
└── public/img/            # diagramas WebP (teoria/ y expos/)
```

### ➕ Cómo añadir o editar un tema
Crea/edita un archivo en `src/data/teoria/` o `src/data/expos/` exportando un objeto
`Tema` (ver `src/lib/types.ts`). El tema se registra **automáticamente** (glob) y aparece
en la portada, su sección y su página `/tema/<slug>`. En los textos puedes usar
`$matemáticas$`, `$$bloque$$`, `**negrita**` y `` `código` ``.

---

## 📄 Origen del material

Elaborado a partir de las diapositivas de teoría del curso y de los informes/presentaciones
de las exposiciones grupales de **Computación Visual** (UNMSM — FISI, 2026).
Las imágenes son **diagramas originales** creados para esta guía (no reproducen los PDFs).
