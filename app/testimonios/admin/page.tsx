import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  aprobarTestimonio,
  eliminarTestimonio,
  getTestimoniosPendientes,
} from "@/lib/testimonios";

const COOKIE = "admin_testimonios";

async function iniciarSesion(formData: FormData) {
  "use server";

  const clave = String(formData.get("clave") ?? "");
  const claveCorrecta = process.env.ADMIN_PASSWORD ?? "";

  if (claveCorrecta && clave === claveCorrecta) {
    (await cookies()).set(COOKIE, claveCorrecta, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });
  }
}

async function aprobar(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  await aprobarTestimonio(id);
  revalidatePath("/testimonios/admin");
  revalidatePath("/testimonios");
}

async function rechazar(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  await eliminarTestimonio(id);
  revalidatePath("/testimonios/admin");
}

export default async function AdminTestimonios() {
  const claveCorrecta = process.env.ADMIN_PASSWORD ?? "";
  const autorizado =
    !!claveCorrecta && (await cookies()).get(COOKIE)?.value === claveCorrecta;

  if (!autorizado) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center py-16">
        <form
          action={iniciarSesion}
          className="flex w-full max-w-sm flex-col gap-3 rounded-lg border border-zinc-200 p-6 dark:border-zinc-700"
        >
          <h1 className="text-lg font-bold">Acceso de administrador</h1>
          <input
            type="password"
            name="clave"
            placeholder="Contraseña"
            required
            className="rounded border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
          />
          <button
            type="submit"
            className="rounded-full bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800"
          >
            Entrar
          </button>
        </form>
      </main>
    );
  }

  const pendientes = await getTestimoniosPendientes();

  return (
    <main className="flex flex-1 flex-col py-8">
      <h1 className="px-4 text-center text-2xl font-extrabold">
        Testimonios pendientes
      </h1>

      <div className="mx-auto mt-6 flex w-full max-w-2xl flex-col gap-4 px-4 pb-8">
        {pendientes.length === 0 && (
          <p className="text-center text-sm text-zinc-500">
            No hay testimonios pendientes.
          </p>
        )}
        {pendientes.map((t) => (
          <div
            key={t.id}
            className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800"
          >
            <p className="whitespace-pre-line text-sm leading-relaxed">
              {t.texto}
            </p>
            <p className="mt-2 text-sm font-semibold text-amber-700">
              — {t.nombre}
            </p>
            <div className="mt-3 flex gap-2">
              <form action={aprobar}>
                <input type="hidden" name="id" value={t.id} />
                <button
                  type="submit"
                  className="rounded-full bg-green-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-green-700"
                >
                  Aprobar
                </button>
              </form>
              <form action={rechazar}>
                <input type="hidden" name="id" value={t.id} />
                <button
                  type="submit"
                  className="rounded-full bg-red-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Rechazar
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
