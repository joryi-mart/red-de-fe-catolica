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

// ACI Prensa no permite pedir el santoral de una fecha distinta a la de
// hoy (ignora los parámetros day/month), así que esta función siempre
// trae el santo del día actual.
export async function getSantoral(): Promise<Santoral> {
  const url = "https://www.aciprensa.com/santos";

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
