export default function Home() {
  return (
    <div className="w-full h-full bg-[#0D1018] flex items-center justify-center px-4">
      
      <div className="flex flex-col items-center">
        
        {/* Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-8 tracking-tight">
          SECRET ROOM
        </h1>

        {/* Input - MENOS REDONDEADO */}
        <input
          type="text"
          placeholder="ENTER ROOM CODE"
          className="w-full max-w-xs px-6 py-3 mb-4 
                     bg-black/20 border border-gray-800 
                     text-gray-400 placeholder-gray-600 
                     text-center text-xs tracking-[0.3em] uppercase
                     rounded-lg
                     focus:outline-none focus:border-gray-700
                     transition-colors backdrop-blur-sm"
        />

        {/* Buttons - MENOS REDONDEADOS */}
        <div className="flex gap-3 w-full max-w-xs">
          <button className="flex-1 px-6 py-2.5
                             bg-black/20 border border-gray-800 
                             text-gray-400 text-xs uppercase tracking-[0.3em]
                             rounded-lg
                             hover:bg-black/30 hover:border-gray-700
                             transition-all backdrop-blur-sm">
            Join
          </button>

          <button className="flex-1 px-6 py-2.5
                             bg-black/20 border border-gray-800 
                             text-gray-400 text-xs uppercase tracking-[0.3em]
                             rounded-lg
                             hover:bg-black/30 hover:border-gray-700
                             transition-all backdrop-blur-sm">
            Create
          </button>
        </div>

      </div>
    </div>
  );
}