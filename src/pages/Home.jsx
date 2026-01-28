import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { socketService } from "../services/socket";
import { events } from "../const/events"
import { saveRoomKey } from "../services/crypto/key";
import { deriveKey } from "../utils/crypto";

export default function Home() {
  const navigate = useNavigate();
  const [alias, setAlias] = useState("");
  const [roomId, setRoomId] = useState("");
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    const handler = async (payload) => {
      const secret = `${payload.roomId}`;
      const derivedKey = await deriveKey(secret);

      navigate("/chat", {
        state: {
          roomId: payload.roomId,
          alias: payload.alias,
          key: derivedKey,
        },
      });
    };

    socketService.on(events.CREATE_ROOM, handler);
    return () => socketService.off(events.CREATE_ROOM, handler)
  })

  useEffect(() => {
    const handler = async (payload) => {
      const secret = `${payload.roomId}`;
      const derivedKey = await deriveKey(secret);

      if (payload.success === false) {
        setError(payload.error)
        return;
      }

      navigate("/chat", {
        state: {
          roomId: payload.roomId,
          alias: payload.alias,
          key: derivedKey,
        },
      })

    }
    socketService.on(events.JOIN_ROOM, handler)
  })

  //  Función create
  const handleCreate = () => {
    if (!alias.trim()) return;


    socketService.emit(events.CREATE_ROOM, { alias: alias })
  };

  //  Función join
  const handleJoinClick = () => {
    if (!alias.trim()) return;

    setShowJoinModal(true);
    setRoomId("");
    setError("");
  };

  //  Función modal
  const handleJoinConfirm = () => {
    if (!roomId.trim()) {
      setError("Ingresa un código")
      return;
    }
    socketService.emit(events.JOIN_ROOM, {
      alias: alias,
      roomId: roomId
    })
  };

  return (
    <div className="w-full h-full bg-[#0D1018] flex items-center justify-center px-4">
      <div className="flex flex-col items-center">

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-8 tracking-tight">
          SECRET ROOM
        </h1>

        <input
          type="text"
          onChange={(e) => setAlias(e.target.value)}
          maxLength={20}
          minLength={3}
          placeholder="ENTER YOUR ALIAS"
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
                Join Room
              </h3>
              <p className="text-gray-400 text-sm">
                <span className="text-cyan-400 font-mono">Code example: ABC123</span>
              </p>
            </div>

            <input
              type="text"
              onChange={(e) => {
                setRoomId(e.target.value);
                setError("");
              }}
              maxLength={6}
              placeholder="Enter the code"
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
                           text-gray-400 rounded-lg hover:bg-red-400 hover:text-white
                           transition-all duration-500 text-xs uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                onClick={handleJoinConfirm}
                className="flex-1 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 
                           text-white rounded-lg transition-all duration-500
                           text-xs uppercase tracking-wider font-semibold"
              >
                Join
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}