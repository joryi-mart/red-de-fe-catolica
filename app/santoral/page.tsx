import type { Metadata } from "next";
import Santoral from "@/components/Santoral";
import BuscarFecha from "@/components/BuscarFecha";
import { getFechaHoy } from "@/lib/fecha";

export const metadata: Metadata = {
  title: "Historia de los santos por fecha",
  description:
    "Busca qué santo se celebra en cualquier fecha del año y lee su historia.",
};

export default async function SantoralPorFecha({
  searchParams,
}: {
  searchParams: Promise<{ fecha?: string }>;
}) {
  const params = await searchParams;
  const fecha = params.fecha || getFechaHoy();

  return (
    <main className="flex flex-1 flex-col py-8">
      <h1 className="px-4 text-center text-2xl font-extrabold">
        Historia de los santos
      </h1>

      <div className="mt-6">
        <BuscarFecha
          fecha={fecha}
          accion="/santoral"
          etiqueta="Ver el santo de otra fecha:"
        />
      </div>

      <div className="mx-auto w-full max-w-3xl px-4 pb-8">
        <Santoral fecha={fecha} />
      </div>
    </main>
  );
}
