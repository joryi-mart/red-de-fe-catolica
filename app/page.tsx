import VideoDestacado from "@/components/VideoDestacado";
import LecturaDelDia from "@/components/LecturaDelDia";
import QuienesSomos from "@/components/QuienesSomos";
import EnVivo from "@/components/EnVivo";
import Suscribete from "@/components/Suscribete";
import MasVideos from "@/components/MasVideos";
import Santoral from "@/components/Santoral";
import NavBar from "@/components/NavBar";
import AccionesComunidad from "@/components/AccionesComunidad";
import { getChannelVideos, type YoutubeVideo } from "@/lib/youtube";

export default async function Home() {
  let videos: YoutubeVideo[];

  try {
    videos = await getChannelVideos();
  } catch {
    videos = [];
  }

  return (
    <main className="flex flex-1 flex-col">
      <div className="relative w-full overflow-hidden rounded-b-3xl shadow-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/banner.png"
          alt="Red de Fe Católica"
          className="h-48 w-full object-cover sm:h-64 md:h-80"
        />
        <h2 className="absolute inset-x-0 bottom-6 text-center text-2xl font-extrabold text-white drop-shadow-lg sm:text-3xl">
          Red de Fe Católica
        </h2>
      </div>

      <NavBar />

      <Suscribete />

      <AccionesComunidad />

      <EnVivo />

      <div className="mx-auto grid w-full max-w-5xl items-start gap-8 px-4 py-8 md:grid-cols-2">
        <LecturaDelDia />
        {videos.length > 0 && <VideoDestacado video={videos[0]} />}
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 pb-8">
        <Santoral />
      </div>

      <MasVideos videos={videos.slice(1)} />

      <div className="mx-auto w-full max-w-5xl px-4 pb-8">
        <QuienesSomos />
      </div>
    </main>
  );
}
