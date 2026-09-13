const CHANNEL_HANDLE = "REDDEFECATOLICA";

export type YoutubeVideo = {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
};

export type ChannelData = {
  id: string;
  title: string;
  description: string;
  uploadsPlaylistId: string;
  subscriberCount: number | null;
};

export async function getChannelData(): Promise<ChannelData> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    throw new Error("Falta configurar YOUTUBE_API_KEY en .env.local");
  }

  const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&forHandle=${CHANNEL_HANDLE}&key=${apiKey}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error("No se pudo encontrar el canal de YouTube");
  }

  const data = await res.json();
  const item = data.items?.[0];
  const uploadsPlaylistId = item?.contentDetails?.relatedPlaylists?.uploads;

  if (!item || !uploadsPlaylistId) {
    throw new Error("El canal no tiene videos o la clave de API no es válida");
  }

  return {
    id: item.id,
    title: item.snippet?.title?.trim() ?? "",
    description: item.snippet?.description?.trim() ?? "",
    uploadsPlaylistId,
    subscriberCount: item.statistics?.hiddenSubscriberCount
      ? null
      : Number(item.statistics?.subscriberCount ?? NaN) || null,
  };
}

export async function getPlaylistVideos(
  playlistId: string,
  maxResults = 13
): Promise<YoutubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    throw new Error("Falta configurar YOUTUBE_API_KEY en .env.local");
  }

  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${playlistId}&key=${apiKey}`;
  const res = await fetch(url, { next: { revalidate: 1800 } });

  if (!res.ok) {
    throw new Error("No se pudieron cargar los videos de la lista");
  }

  const data = await res.json();

  type PlaylistItem = {
    snippet?: {
      title?: string;
      publishedAt?: string;
      resourceId?: { videoId?: string };
      thumbnails?: {
        high?: { url?: string };
        default?: { url?: string };
      };
    };
  };

  return ((data.items ?? []) as PlaylistItem[])
    .filter((item) => item.snippet?.resourceId?.videoId)
    .map((item) => ({
      id: item.snippet!.resourceId!.videoId as string,
      title: item.snippet?.title ?? "",
      thumbnail:
        item.snippet?.thumbnails?.high?.url ??
        item.snippet?.thumbnails?.default?.url ??
        "",
      publishedAt: item.snippet?.publishedAt ?? "",
    }));
}

export async function getChannelVideos(maxResults = 13): Promise<YoutubeVideo[]> {
  const { uploadsPlaylistId } = await getChannelData();
  return getPlaylistVideos(uploadsPlaylistId, maxResults);
}

export type Playlist = {
  id: string;
  title: string;
  itemCount: number;
};

export async function getPlaylists(): Promise<Playlist[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    throw new Error("Falta configurar YOUTUBE_API_KEY en .env.local");
  }

  const { id: channelId } = await getChannelData();

  const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${channelId}&maxResults=25&key=${apiKey}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error("No se pudieron cargar las listas de reproducción");
  }

  const data = await res.json();

  type PlaylistItem = {
    id: string;
    snippet?: { title?: string };
    contentDetails?: { itemCount?: number };
  };

  return ((data.items ?? []) as PlaylistItem[])
    .filter((item) => (item.contentDetails?.itemCount ?? 0) > 0)
    .map((item) => ({
      id: item.id,
      title: item.snippet?.title ?? "",
      itemCount: item.contentDetails?.itemCount ?? 0,
    }));
}

export async function getTestimoniosVideo(cantidad = 4): Promise<YoutubeVideo[]> {
  const playlists = await getPlaylists();
  const lista = playlists.find(
    (p) => p.title.trim().toLowerCase() === "dios te habla"
  );

  if (!lista) return [];

  const videos = await getPlaylistVideos(lista.id, 50);

  // Se mezclan y se eligen algunos al azar para que la seccion de
  // testimonios cambie sola cada vez que se vuelve a generar la pagina
  // (cada 30 minutos, por el revalidate de getPlaylistVideos).
  const mezclados = [...videos].sort(() => Math.random() - 0.5);
  return mezclados.slice(0, cantidad);
}

export type LiveVideo = {
  id: string;
  title: string;
};

export async function getLiveVideo(): Promise<LiveVideo | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return null;

  let channelId: string;
  try {
    channelId = (await getChannelData()).id;
  } catch {
    return null;
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`;
  // La búsqueda de "en vivo" consume mucha cuota de la API, por eso se
  // revisa solo cada 30 minutos en vez de en cada visita.
  const res = await fetch(url, { next: { revalidate: 1800 } });

  if (!res.ok) return null;

  const data = await res.json();
  const item = data.items?.[0];
  const videoId = item?.id?.videoId;

  if (!videoId) return null;

  return { id: videoId, title: item.snippet?.title ?? "" };
}
