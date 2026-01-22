import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [error, setError] = useState("");

  //  BOTÓN JOIN 
  const handleJoinClick = () => {
    setShowJoinModal(true);
    setJoinCode("");
    setError("");
  };

  const handleJoinConfirm = () => {
    if (joinCode !== "1234") {
      setError("Código incorrecto. Usa: 1234");
      return;
    }
    setShowJoinModal(false);
    navigate("/chat");
  };

  // creat envio chat
  const handleCreate = () => {
    navigate("/chat");
  };

  return (
    <div className="w-full h-full bg-[#0D1018] flex items-center justify-center px-4">
      <div className="flex flex-col items-center">

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-8 tracking-tight">
          SECRET ROOM
        </h1>

        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="ENTER ROOM NAME"
          className="w-full max-w-xs px-6 py-3 mb-4
                     bg-black/20 border border-gray-800
                     text-gray-400 placeholder-gray-600
                     text-center text-xs tracking-[0.3em] uppercase
                     rounded-lg
                     focus:outline-none focus:border-gray-700
                     transition-colors backdrop-blur-sm"
        />

        <div className="flex gap-3 w-full max-w-xs">
          <button
            onClick={handleJoinClick}
            className="flex-1 px-6 py-2.5 bg-black/20 border border-gray-800
                       text-gray-400 text-xs uppercase tracking-[0.3em] rounded-lg
                       hover:bg-black/30 hover:border-gray-700 transition-all backdrop-blur-sm"
          >
            Join
          </button>

          <button
            onClick={handleCreate}
            className="flex-1 px-6 py-2.5 bg-black/20 border border-gray-800
                       text-gray-400 text-xs uppercase tracking-[0.3em] rounded-lg
                       hover:bg-black/30 hover:border-gray-700 transition-all backdrop-blur-sm"
          >
            Create
          </button>
        </div>

      </div>

      {/* modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0D1018] border border-gray-800 rounded-xl p-8 max-w-md w-full mx-4">
            
            <div className="mb-6">
              <h3 className="text-white text-xl font-bold mb-2">
                Unirse a sala
              </h3>
              <p className="text-gray-400 text-sm">
                Ingresa el código: <span className="text-cyan-400 font-mono">1234</span>
              </p>
            </div>

            <input
              type="text"
              value={joinCode}
              onChange={(e) => {
                setJoinCode(e.target.value);
                setError("");
              }}
              placeholder="INGRESA EL CÓDIGO"
              className={`w-full px-6 py-3 mb-2
                         bg-black/20 border ${error ? 'border-red-500' : 'border-gray-800'}
                         text-gray-300 placeholder-gray-600
                         text-center text-sm tracking-[0.3em] uppercase
                         rounded-lg
                         focus:outline-none focus:border-gray-700
                         transition-colors`}
              autoFocus
            />

            {error && (
              <p className="text-red-400 text-xs mb-4 text-center">{error}</p>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowJoinModal(false)}
                className="flex-1 px-4 py-2.5 bg-black/20 border border-gray-800 
                           text-gray-400 rounded-lg hover:bg-black/30 hover:border-gray-700
                           transition-all text-xs uppercase tracking-wider"
              >
                Cancelar
              </button>
              <button
                onClick={handleJoinConfirm}
                className="flex-1 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 
                           text-white rounded-lg transition-all 
                           text-xs uppercase tracking-wider font-semibold"
              >
                Unirse
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}