import { getLiveVideo } from "@/lib/youtube";

export default async function EnVivo() {
  const live = await getLiveVideo();

  if (!live) return null;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pt-6">
      <div className="rounded-lg border-2 border-red-600 bg-red-50 p-4 dark:bg-red-950">
        <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-red-600">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-600" />
          En vivo ahora
        </p>
        <div className="mt-3 aspect-video w-full overflow-hidden rounded-md bg-black">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${live.id}?autoplay=0`}
            title={live.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="mt-3 font-semibold">{live.title}</p>
      </div>
    </div>
  );
}
