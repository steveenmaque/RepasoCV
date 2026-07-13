// @ts-check
import { defineConfig } from 'astro/config';

// Sitio 100% estático → despliegue en Vercel sin funciones serverless (consumo mínimo).
export default defineConfig({
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  devToolbar: { enabled: false },
});
