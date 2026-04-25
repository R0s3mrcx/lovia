"use client"

import { useEffect, useState } from "react"

// ============================================================
// Aparece una sola vez al cargar la página.
// Flota desde abajo, se queda ~3s y se desvanece.
// Mismo estilo que FloatingElements — pasa desapercibido
// a menos que sepas que está ahí.
// ============================================================

export function MisiaToast() {
  const [visible, setVisible] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Aparece 1.2s después de cargar (da tiempo al hero a pintarse)
    const showTimer = setTimeout(() => setVisible(true), 1200)

    // Empieza el fade out a los 4.2s
    const fadeTimer = setTimeout(() => setFadeOut(true), 4200)

    // Se elimina del DOM a los 5.2s (tras 1s de fade)
    const hideTimer = setTimeout(() => setVisible(false), 5200)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="pointer-events-none fixed bottom-10 left-1/2 z-50"
      style={{
        transform: "translateX(-50%)",
        // Entra desde abajo y sube — mismo movimiento que los corazones
        animation: fadeOut
          ? "misia-fade-out 1s ease-in-out forwards"
          : "misia-rise 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      }}
    >
      <div
        className="flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-5 py-2.5 backdrop-blur"
        style={{ boxShadow: "0 4px 24px rgba(236, 72, 153, 0.15)" }}
      >
        <span
          style={{
            fontSize: "20px",
            animation: "misia-bounce 1.2s ease-in-out infinite",
          }}
        >
          💕
        </span>
        <span className="text-sm font-bold text-primary tracking-wide">
          Misia
        </span>
      </div>

      <style>{`
        @keyframes misia-rise {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0px);
          }
        }

        @keyframes misia-fade-out {
          from {
            opacity: 1;
            transform: translateX(-50%) translateY(0px);
          }
          to {
            opacity: 0;
            transform: translateX(-50%) translateY(-12px);
          }
        }

        @keyframes misia-bounce {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  )
}
