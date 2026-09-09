import type { Metadata } from "next";
import LecturaDelDia from "@/components/LecturaDelDia";
import BuscarFecha from "@/components/BuscarFecha";

function getFechaHoy(): string {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Santo_Domingo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(new Date());
}

export const metadata: Metadata = {
  title: "Lectura del día por fecha",
  description:
    "Busca la lectura católica, el evangelio y el salmo de cualquier día del calendario litúrgico.",
};

export default async function LecturaPorFecha({
  searchParams,
}: {
  searchParams: Promise<{ fecha?: string }>;
}) {
  const params = await searchParams;
  const fecha = params.fecha || getFechaHoy();

  return (
    <main className="flex flex-1 flex-col py-8">
      <h1 className="px-4 text-center text-2xl font-extrabold">
        Buscar lectura por fecha
      </h1>

      <div className="mt-6">
        <BuscarFecha fecha={fecha} />
      </div>

      <div className="mx-auto w-full max-w-3xl px-4 pb-8">
        <LecturaDelDia fecha={fecha} />
      </div>
    </main>
  );
}
