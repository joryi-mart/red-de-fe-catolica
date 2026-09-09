const ENLACES = [
  { href: "#lectura", label: "Lectura del día" },
  { href: "#santoral", label: "Santoral" },
  { href: "#video", label: "Video" },
  { href: "#mas-videos", label: "Más videos" },
  { href: "#quienes-somos", label: "Quiénes somos" },
  { href: "/lectura", label: "Buscar por fecha" },
];

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-10 flex w-full flex-wrap justify-center gap-3 bg-amber-700 px-4 py-3 shadow-md">
      {ENLACES.map((enlace) => (
        <a
          key={enlace.href}
          href={enlace.href}
          className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
        >
          {enlace.label}
        </a>
      ))}
    </nav>
  );
}
