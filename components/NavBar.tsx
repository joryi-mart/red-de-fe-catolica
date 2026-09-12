"use client";

import { useState } from "react";

const ENLACES = [
  { href: "#lectura", label: "Lectura del día" },
  { href: "#santoral", label: "Santoral" },
  { href: "#video", label: "Video" },
  { href: "#mas-videos", label: "Más videos" },
  { href: "#quienes-somos", label: "Quiénes somos" },
  { href: "/lectura", label: "Buscar por fecha" },
  { href: "/videos", label: "Videos por tema" },
  { href: "/oraciones", label: "Oraciones" },
  { href: "/via-crucis", label: "Vía Crucis" },
];

export default function NavBar() {
  const [abierto, setAbierto] = useState(false);

  return (
    <nav className="sticky top-0 z-10 w-full bg-amber-700 shadow-md">
      {/* Celular: botón de menú */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden">
        <span className="font-bold text-white">Menú</span>
        <button
          onClick={() => setAbierto((v) => !v)}
          aria-label="Abrir menú"
          className="rounded bg-white/10 px-3 py-1.5 text-white"
        >
          {abierto ? "✕" : "☰"}
        </button>
      </div>
      {abierto && (
        <div className="flex flex-col gap-2 px-4 pb-4 md:hidden">
          {ENLACES.map((enlace) => (
            <a
              key={enlace.href}
              href={enlace.href}
              onClick={() => setAbierto(false)}
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              {enlace.label}
            </a>
          ))}
        </div>
      )}

      {/* Pantallas medianas y grandes: fila normal */}
      <div className="hidden w-full flex-wrap justify-center gap-3 px-4 py-3 md:flex">
        {ENLACES.map((enlace) => (
          <a
            key={enlace.href}
            href={enlace.href}
            className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
          >
            {enlace.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
