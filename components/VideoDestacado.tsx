import type { YoutubeVideo } from "@/lib/youtube";

export default function VideoDestacado({ video }: { video: YoutubeVideo }) {
  return (
    <section id="video" className="w-full scroll-mt-20">
      <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
        Video destacado
      </p>
      <div className="mt-2 aspect-video w-full overflow-hidden rounded-lg bg-black shadow-md">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${video.id}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <p className="mt-3 text-lg font-semibold">{video.title}</p>

      <div className="mt-3 flex gap-3">
        <a
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
            `${video.title} https://www.youtube.com/watch?v=${video.id}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-green-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-green-700"
        >
          Compartir en WhatsApp
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            `https://www.youtube.com/watch?v=${video.id}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-blue-700 px-4 py-1.5 text-sm font-semibold text-white hover:bg-blue-800"
        >
          Compartir en Facebook
        </a>
      </div>
    </section>
  );
}
