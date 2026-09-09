import { getLecturaDelDia } from "@/lib/lecturaDelDia";

export default async function LecturaDelDia() {
  let lectura;

  try {
    lectura = await getLecturaDelDia();
  } catch {
    return null;
  }

  return (
    <section
      id="lectura"
      className="flex w-full scroll-mt-20 flex-col rounded-lg border-t-4 border-amber-700 bg-white p-5 shadow-sm dark:bg-zinc-900"
    >
      <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
        Espiritualidad
      </p>
      <h2 className="text-2xl font-bold">Lectura del día</h2>
      {lectura.tituloLiturgico && (
        <p className="mt-1 text-sm text-zinc-500">{lectura.tituloLiturgico}</p>
      )}

      <div className="mt-6 flex flex-col gap-4">
        {lectura.lecturas.map((item, i) => (
          <div
            key={i}
            className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800"
          >
            <h3 className="font-bold">{item.titulo}</h3>
            {item.referencia && (
              <p className="text-sm italic text-zinc-500">
                {item.referencia}
              </p>
            )}
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed">
              {item.texto}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
            `Lectura del día: ${lectura.fuenteUrl}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-green-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-green-700"
        >
          Compartir en WhatsApp
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            lectura.fuenteUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-blue-700 px-4 py-1.5 text-sm font-semibold text-white hover:bg-blue-800"
        >
          Compartir en Facebook
        </a>
        <a
          href={lectura.fuenteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline"
        >
          Fuente: ACI Prensa
        </a>
      </div>
    </section>
  );
}
