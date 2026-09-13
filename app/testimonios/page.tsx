import type { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { agregarTestimonio, getTestimoniosAprobados } from "@/lib/testimonios";

export const metadata: Metadata = {
  title: "Testimonios",
  description:
    "Testimonios reales de fe de nuestra comunidad. Comparte el tuyo con Red de Fe Católica.",
};

async function enviarTestimonio(formData: FormData) {
  "use server";

  const nombre = String(formData.get("nombre") ?? "");
  const texto = String(formData.get("texto") ?? "");

  if (!texto.trim()) return;

  await agregarTestimonio(nombre, texto);
  revalidatePath("/testimonios");
}

export default async function Testimonios() {
  const testimonios = await getTestimoniosAprobados();

  return (
    <main className="flex flex-1 flex-col py-8">
      <h1 className="px-4 text-center text-2xl font-extrabold">
        Testimonios
      </h1>
      <p className="mx-auto mt-2 max-w-2xl px-4 text-center text-sm text-zinc-500">
        Historias reales de fe de nuestra comunidad.
      </p>

      <div className="mx-auto mt-8 w-full max-w-xl px-4">
        <form
          action={enviarTestimonio}
          className="flex flex-col gap-3 rounded-lg border-t-4 border-amber-700 bg-white p-5 shadow-sm dark:bg-zinc-900"
        >
          <h2 className="text-lg font-bold">Comparte tu testimonio</h2>
          <input
            name="nombre"
            placeholder="Tu nombre (opcional)"
            className="rounded border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
          />
          <textarea
            name="texto"
            required
            rows={5}
            placeholder="Escribe tu testimonio..."
            className="rounded border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
          />
          <button
            type="submit"
            className="self-start rounded-full bg-amber-700 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-800"
          >
            Enviar
          </button>
          <p className="text-xs text-zinc-500">
            Tu testimonio se revisará antes de publicarse.
          </p>
        </form>
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-2xl flex-col gap-4 px-4 pb-8">
        {testimonios.length === 0 && (
          <p className="text-center text-sm text-zinc-500">
            Todavía no hay testimonios publicados. ¡Sé el primero!
          </p>
        )}
        {testimonios.map((t) => (
          <div
            key={t.id}
            className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800"
          >
            <p className="whitespace-pre-line text-sm leading-relaxed">
              {t.texto}
            </p>
            <p className="mt-2 text-sm font-semibold text-amber-700">
              — {t.nombre}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
