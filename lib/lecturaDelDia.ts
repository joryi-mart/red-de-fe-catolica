import * as cheerio from "cheerio";

export type Lectura = {
  titulo: string;
  referencia: string;
  texto: string;
};

export type LecturaDelDia = {
  tituloLiturgico: string;
  fecha: string;
  lecturas: Lectura[];
  fuenteUrl: string;
};

function getFechaHoy(): string {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Santo_Domingo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(new Date());
}

export async function getLecturaDelDia(): Promise<LecturaDelDia> {
  const fecha = getFechaHoy();
  const fuenteUrl = `https://www.aciprensa.com/calendario/${fecha}`;

  const res = await fetch(fuenteUrl, {
    headers: { "User-Agent": "Mozilla/5.0" },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("No se pudo obtener la lectura del día");
  }

  const html = await res.text();
  const $ = cheerio.load(html);

  const tituloLiturgico = $("h2.page-title").first().text().trim();

  const lecturas: Lectura[] = [];

  $('a[name^="rd_"]').each((_, el) => {
    const item = $(el).parent();
    const titulo = item.find("b").first().text().trim();
    const referencia = item.find("i").first().text().trim();
    const texto = item
      .find(".readings__text")
      .map((_, span) => $(span).text().trim())
      .get()
      .join(" ");

    if (titulo && texto) {
      lecturas.push({ titulo, referencia, texto });
    }
  });

  if (lecturas.length === 0) {
    throw new Error("No se encontraron lecturas en la página");
  }

  return { tituloLiturgico, fecha, lecturas, fuenteUrl };
}
