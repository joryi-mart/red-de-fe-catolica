export default function Footer() {
  const año = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full bg-amber-900 px-4 py-6 text-center text-sm text-amber-50">
      <p>© {año} Red de Fe Católica. Todos los derechos reservados.</p>
      <p className="mt-1">
        <a
          href="https://www.youtube.com/@REDDEFECATOLICA"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          Visítanos en YouTube
        </a>
      </p>
    </footer>
  );
}
