import { getChannelData } from "@/lib/youtube";

export default async function QuienesSomos() {
  let info;

  try {
    info = await getChannelData();
  } catch {
    return null;
  }

  if (!info.description) return null;

  return (
    <section
      id="quienes-somos"
      className="flex w-full scroll-mt-20 flex-col rounded-lg border-t-4 border-amber-700 bg-white p-5 shadow-sm dark:bg-zinc-900"
    >
      <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
        Nuestra comunidad
      </p>
      <h2 className="text-2xl font-bold">Quiénes somos</h2>
      <p className="mt-4 whitespace-pre-line text-sm leading-relaxed">
        {info.description}
      </p>
    </section>
  );
}
