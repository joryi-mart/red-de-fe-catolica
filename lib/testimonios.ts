import { kv } from "@vercel/kv";

export type Testimonio = {
  id: string;
  nombre: string;
  texto: string;
  fecha: string;
  aprobado: boolean;
};

const CLAVE = "testimonios";

export async function agregarTestimonio(
  nombre: string,
  texto: string
): Promise<void> {
  const id = crypto.randomUUID();
  const testimonio: Testimonio = {
    id,
    nombre: nombre.trim().slice(0, 100) || "Anónimo",
    texto: texto.trim().slice(0, 2000),
    fecha: new Date().toISOString(),
    aprobado: false,
  };

  await kv.hset(CLAVE, { [id]: testimonio });
}

async function getTodos(): Promise<Testimonio[]> {
  const registros = await kv.hgetall<Record<string, Testimonio>>(CLAVE);
  if (!registros) return [];

  return Object.values(registros).sort((a, b) =>
    b.fecha.localeCompare(a.fecha)
  );
}

export async function getTestimoniosAprobados(): Promise<Testimonio[]> {
  return (await getTodos()).filter((t) => t.aprobado);
}

export async function getTestimoniosPendientes(): Promise<Testimonio[]> {
  return (await getTodos()).filter((t) => !t.aprobado);
}

export async function aprobarTestimonio(id: string): Promise<void> {
  const registros = await kv.hgetall<Record<string, Testimonio>>(CLAVE);
  const testimonio = registros?.[id];
  if (!testimonio) return;

  testimonio.aprobado = true;
  await kv.hset(CLAVE, { [id]: testimonio });
}

export async function eliminarTestimonio(id: string): Promise<void> {
  await kv.hdel(CLAVE, id);
}
