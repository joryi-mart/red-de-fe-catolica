import { getChannelData } from "@/lib/youtube";

function formatSubscriberCount(count: number): string {
  return new Intl.NumberFormat("es-DO").format(count);
}

export default async function Suscribete() {
  let subscriberCount: number | null = null;

  try {
    subscriberCount = (await getChannelData()).subscriberCount;
  } catch {
    subscriberCount = null;
  }

  return (
    <div className="flex flex-col items-center gap-2 py-2">
      <a
        href="https://www.youtube.com/@REDDEFECATOLICA?sub_confirmation=1"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2 font-semibold text-white shadow-md transition-colors hover:bg-red-700"
      >
        Suscríbete en YouTube
      </a>
      {subscriberCount !== null && (
        <p className="text-sm text-zinc-500">
          {formatSubscriberCount(subscriberCount)} suscriptores
        </p>
      )}
    </div>
  );
}
