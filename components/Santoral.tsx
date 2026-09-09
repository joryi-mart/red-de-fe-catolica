import { getSantoral } from "@/lib/santoral";

export default async function Santoral() {
  let santoral;

  try {
    santoral = await getSantoral();
  } catch {
    return null;
  }

  return (
    <section
      id="santoral"
      className="flex w-full scroll-mt-20 flex-col rounded-lg border-t-4 border-amber-700 bg-white p-5 shadow-sm dark:bg-zinc-900"
    >
      <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
        Santoral
      </p>
      <h2 className="text-2xl font-bold">Santo del día</h2>
      {santoral.fechaTexto && (
        <p className="mt-1 text-sm text-zinc-500">{santoral.fechaTexto}</p>
      )}

      <div className="mt-6 flex flex-col gap-4">
        {santoral.santos.map((santo, i) => (
          <div
            key={i}
            className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800"
          >
            <h3 className="font-bold">{santo.nombre}</h3>
            {santo.descripcion && (
              <p className="mt-2 text-sm leading-relaxed">
                {santo.descripcion}
              </p>
            )}
            <a
              href={santo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-blue-600 hover:underline"
            >
              Leer más
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
