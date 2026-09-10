import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oraciones católicas",
  description:
    "Padre Nuestro, Ave María, Credo y cómo rezar el Santo Rosario completo, con los misterios de cada día.",
};

const MISTERIOS = [
  {
    nombre: "Gozosos",
    dias: "Lunes y sábado",
    lista: [
      "La Anunciación del Ángel a María",
      "La Visitación de María a su prima Isabel",
      "El Nacimiento de Jesús en Belén",
      "La Presentación de Jesús en el Templo",
      "El Niño Jesús perdido y hallado en el Templo",
    ],
  },
  {
    nombre: "Luminosos",
    dias: "Jueves",
    lista: [
      "El Bautismo de Jesús en el Jordán",
      "La autorrevelación de Jesús en las Bodas de Caná",
      "El anuncio del Reino de Dios invitando a la conversión",
      "La Transfiguración",
      "La institución de la Eucaristía",
    ],
  },
  {
    nombre: "Dolorosos",
    dias: "Martes y viernes",
    lista: [
      "La oración de Jesús en el huerto",
      "La flagelación del Señor",
      "La coronación de espinas",
      "Jesús con la cruz a cuestas camino al Calvario",
      "La crucifixión y muerte de Jesús",
    ],
  },
  {
    nombre: "Gloriosos",
    dias: "Miércoles y domingo",
    lista: [
      "La Resurrección de Jesús",
      "La Ascensión del Señor a los cielos",
      "La venida del Espíritu Santo sobre María y los Apóstoles",
      "La Asunción de María al cielo",
      "La coronación de María como Reina del Cielo",
    ],
  },
];

export default function Oraciones() {
  return (
    <main className="flex flex-1 flex-col py-8">
      <h1 className="px-4 text-center text-2xl font-extrabold">
        Oraciones católicas
      </h1>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8">
        <section className="rounded-lg border-t-4 border-amber-700 bg-white p-5 shadow-sm dark:bg-zinc-900">
          <h2 className="text-xl font-bold">Padre Nuestro</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed">
            {`Padre nuestro, que estás en el cielo,
santificado sea tu Nombre;
venga a nosotros tu reino;
hágase tu voluntad
en la tierra como en el cielo.
Danos hoy nuestro pan de cada día;
perdona nuestras ofensas,
como también nosotros perdonamos
a los que nos ofenden;
no nos dejes caer en la tentación,
y líbranos del mal.
Amén.`}
          </p>
        </section>

        <section className="rounded-lg border-t-4 border-amber-700 bg-white p-5 shadow-sm dark:bg-zinc-900">
          <h2 className="text-xl font-bold">Ave María</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed">
            {`Dios te salve, María, llena eres de gracia,
el Señor es contigo,
bendita Tú eres entre todas las mujeres,
y bendito es el fruto de tu vientre, Jesús.
Santa María, Madre de Dios,
ruega por nosotros pecadores,
ahora y en la hora de nuestra muerte.
Amén.`}
          </p>
        </section>

        <section className="rounded-lg border-t-4 border-amber-700 bg-white p-5 shadow-sm dark:bg-zinc-900">
          <h2 className="text-xl font-bold">Credo</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed">
            {`Creo en Dios, Padre todopoderoso,
Creador del cielo y de la tierra.
Creo en Jesucristo, su único Hijo, nuestro Señor,
que fue concebido por obra y gracia del Espíritu Santo,
nació de Santa María Virgen,
padeció bajo el poder de Poncio Pilato,
fue crucificado, muerto y sepultado,
descendió a los infiernos,
al tercer día resucitó de entre los muertos,
subió a los cielos
y está sentado a la derecha de Dios, Padre todopoderoso.
Desde allí ha de venir a juzgar a vivos y muertos.
Creo en el Espíritu Santo,
la santa Iglesia católica,
la comunión de los santos,
el perdón de los pecados,
la resurrección de la carne
y la vida eterna.
Amén.`}
          </p>
        </section>

        <section className="rounded-lg border-t-4 border-amber-700 bg-white p-5 shadow-sm dark:bg-zinc-900">
          <h2 className="text-xl font-bold">Cómo rezar el Santo Rosario</h2>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed">
            <li>Se hace la Señal de la Cruz y se reza el Credo.</li>
            <li>Un Padre Nuestro.</li>
            <li>Tres Ave María, pidiendo fe, esperanza y caridad.</li>
            <li>Se anuncia el primer misterio y se reza un Padre Nuestro.</li>
            <li>Diez Ave María meditando en ese misterio (una "década").</li>
            <li>Gloria al Padre.</li>
            <li>Se repiten los pasos 4 a 6 con los otros cuatro misterios.</li>
            <li>Se termina con la Letanía o el Salve, según la costumbre.</li>
          </ol>

          <div className="mt-6 flex flex-col gap-5">
            {MISTERIOS.map((grupo) => (
              <div
                key={grupo.nombre}
                className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800"
              >
                <h3 className="font-bold">
                  Misterios {grupo.nombre}{" "}
                  <span className="font-normal text-zinc-500">
                    ({grupo.dias})
                  </span>
                </h3>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
                  {grupo.lista.map((misterio) => (
                    <li key={misterio}>{misterio}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
