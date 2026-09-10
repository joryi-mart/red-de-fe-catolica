import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vía Crucis",
  description:
    "Las 14 estaciones del Vía Crucis, el camino de la cruz de Jesús desde su condena hasta su sepultura.",
};

const ESTACIONES = [
  "Jesús es condenado a muerte",
  "Jesús carga con la cruz",
  "Jesús cae por primera vez",
  "Jesús se encuentra con su Madre",
  "Simón de Cirene ayuda a Jesús a llevar la cruz",
  "La Verónica limpia el rostro de Jesús",
  "Jesús cae por segunda vez",
  "Jesús consuela a las mujeres de Jerusalén",
  "Jesús cae por tercera vez",
  "Jesús es despojado de sus vestiduras",
  "Jesús es clavado en la cruz",
  "Jesús muere en la cruz",
  "Jesús es bajado de la cruz",
  "Jesús es puesto en el sepulcro",
];

export default function ViaCrucis() {
  return (
    <main className="flex flex-1 flex-col py-8">
      <h1 className="px-4 text-center text-2xl font-extrabold">Vía Crucis</h1>
      <p className="mx-auto mt-2 max-w-2xl px-4 text-center text-sm text-zinc-500">
        Las catorce estaciones del camino de la cruz, meditando los últimos
        pasos de Jesús desde su condena hasta su sepultura.
      </p>

      <div className="mx-auto mt-6 flex w-full max-w-2xl flex-col gap-3 px-4 pb-8">
        {ESTACIONES.map((estacion, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-lg border-t-4 border-amber-700 bg-white p-4 shadow-sm dark:bg-zinc-900"
          >
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-amber-700 font-bold text-white">
              {i + 1}
            </span>
            <p className="font-semibold">{estacion}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
