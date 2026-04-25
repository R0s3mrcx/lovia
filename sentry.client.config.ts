// ============================================================
// sentry.client.config.ts
// ============================================================
// Configuración de Sentry para el CLIENTE (navegador).
// Se ejecuta en el browser del usuario.
// Captura: errores JS, clicks, navegación, performance.
// ============================================================

import * as Sentry from "@sentry/nextjs"

Sentry.init({
  // Tu DSN — identifica tu proyecto en sentry.io
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Tracing: captura cuánto tarda cada página en cargar
  // 1.0 = captura el 100% de las transacciones (baja en prod si hay mucho tráfico)
  tracesSampleRate: 1.0,

  // Solo muestra el diálogo de feedback en producción
  // En desarrollo solo verías el error en consola
  environment: process.env.NODE_ENV,

  // No envía errores en desarrollo local para no llenar Sentry de ruido
  enabled: process.env.NODE_ENV === "production",

  // Integración de replay desactivada (la desactivaste en el wizard)
  // Si la quieres activar después: replaysSessionSampleRate: 0.1
})
