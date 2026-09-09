export default function BuscarFecha({ fecha }: { fecha: string }) {
  return (
    <form
      action="/lectura"
      method="get"
      className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-center gap-3 px-4 pb-4"
    >
      <label htmlFor="fecha" className="text-sm font-semibold">
        Ver la lectura de otro día:
      </label>
      <input
        type="date"
        id="fecha"
        name="fecha"
        defaultValue={fecha}
        className="rounded border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-800"
      />
      <button
        type="submit"
        className="rounded-full bg-amber-700 px-4 py-1.5 text-sm font-semibold text-white hover:bg-amber-800"
      >
        Buscar
      </button>
    </form>
  );
}
