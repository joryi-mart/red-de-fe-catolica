import type { YoutubeVideo } from "@/lib/youtube";

export default function MasVideos({ videos }: { videos: YoutubeVideo[] }) {
  if (videos.length === 0) return null;

  return (
    <section
      id="mas-videos"
      className="mx-auto w-full max-w-5xl scroll-mt-20 px-4 pb-8"
    >
      <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
        Más contenido
      </p>
      <h2 className="text-2xl font-bold">Más videos</h2>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {videos.map((video) => (
          <a
            key={video.id}
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="overflow-hidden rounded-lg border border-transparent transition hover:border-zinc-300"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={video.thumbnail}
              alt={video.title}
              className="aspect-video w-full object-cover"
            />
            <p className="mt-2 line-clamp-2 text-sm">{video.title}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
