export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-white px-4">

      <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center">
        Dashboard <span className="text-yellow-400 animate-pulse drop-shadow-lg">Anónimo</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        <div className="bg-neutral-800 rounded-xl p-6 shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-2 text-yellow-300 animate-pulse">Estadística 1</h2>
          <p className="text-neutral-300">Número representativo o información clave.</p>
        </div>

        <div className="bg-neutral-800 rounded-xl p-6 shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-2 text-cyan-400 animate-pulse">Estadística 2</h2>
          <p className="text-neutral-300">Número o detalle de manera anónima.</p>
        </div>

        <div className="bg-neutral-800 rounded-xl p-6 shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-2 text-purple-400 animate-pulse">Estadística 3</h2>
          <p className="text-neutral-300">Detalle breve con efecto de brillo sutil.</p>
        </div>
      </div>
    </div>
  );
}
