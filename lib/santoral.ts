import * as cheerio from "cheerio";

export type Santo = {
  nombre: string;
  descripcion: string;
  url: string;
};

export type Santoral = {
  fechaTexto: string;
  santos: Santo[];
};

function getFechaHoy(): { dia: number; mes: number } {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Santo_Domingo",
    day: "numeric",
    month: "numeric",
  });
  const partes = formatter.formatToParts(new Date());
  const dia = Number(partes.find((p) => p.type === "day")?.value);
  const mes = Number(partes.find((p) => p.type === "month")?.value);
  return { dia, mes };
}

export async function getSantoral(): Promise<Santoral> {
  const { dia, mes } = getFechaHoy();
  const url = `https://www.aciprensa.com/santos?day=${dia}&month=${mes}`;

  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("No se pudo obtener el santoral del día");
  }

  const html = await res.text();
  const $ = cheerio.load(html);

  const fechaTexto = $("h2").first().text().trim();
  const santos: Santo[] = [];

  $('a[href*="/santo/"]').each((_, el) => {
    const nombre = $(el).find("h2").text().trim();
    const url = $(el).attr("href") ?? "";
    const descripcion = $(el)
      .closest("li")
      .nextAll("p.card-text")
      .first()
      .text()
      .trim();

    if (nombre) {
      santos.push({ nombre, descripcion, url });
    }
  });

  if (santos.length === 0) {
    throw new Error("No se encontró el santoral en la página");
  }

  return { fechaTexto, santos };
}
