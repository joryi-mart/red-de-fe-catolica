import type { Metadata } from "next";
import { getPlaylists, getPlaylistVideos, type Playlist } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Videos por tema",
  description:
    "Videos del canal de YouTube Red de Fe Católica organizados por tema: evangelio de hoy, frases de los santos, libros de la Biblia y más.",
};

export default async function VideosPorTema() {
  let playlists: Playlist[];

  try {
    playlists = await getPlaylists();
  } catch {
    playlists = [];
  }

  const secciones = await Promise.all(
    playlists.map(async (playlist) => {
      try {
        const videos = await getPlaylistVideos(playlist.id, 8);
        return { playlist, videos };
      } catch {
        return { playlist, videos: [] };
      }
    })
  );

  return (
    <main className="flex flex-1 flex-col py-8">
      <h1 className="px-4 text-center text-2xl font-extrabold">
        Videos por tema
      </h1>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-8">
        {secciones
          .filter((seccion) => seccion.videos.length > 0)
          .map(({ playlist, videos }) => (
            <section key={playlist.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-xl font-bold capitalize">
                  {playlist.title.toLowerCase()}
                </h2>
                <a
                  href={`https://www.youtube.com/playlist?list=${playlist.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Ver los {playlist.itemCount} videos en YouTube
                </a>
              </div>

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
          ))}
      </div>
    </main>
  );
}
