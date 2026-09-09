const CHANNEL_URL = "https://www.youtube.com/@REDDEFECATOLICA";

export default function AccionesComunidad() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-wrap justify-center gap-4 px-4 pb-4">
      <a
        href={CHANNEL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-amber-700 px-5 py-2 font-semibold text-white shadow-md hover:bg-amber-800"
      >
        🙏 Pide una oración
      </a>
      <a
        href={CHANNEL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-rose-700 px-5 py-2 font-semibold text-white shadow-md hover:bg-rose-800"
      >
        ❤️ Apoya este ministerio
      </a>
    </section>
  );
}
