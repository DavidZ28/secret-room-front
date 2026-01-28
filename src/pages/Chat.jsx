import { useState } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import MessageBubble from "../components/chat/MessageBubble";
import MessageInput from "../components/chat/MessageInput";
import { useEffect } from "react";
import { socketService } from "../services/socket";
import { events } from "../const/events";
import { decryptMessage, encryptMessage } from "../services/crypto/crypto";

export default function Chat() {

  useEffect(() => {

    const handleSocketMessage = (payload) => {
      handleMessage(
        payload.ciphertext,
        payload.from,
        payload.timestamp,
        payload.type,
        payload.iv
      );
    };

    socketService.on(events.MESSAGE, handleSocketMessage);

    return () => {
      socketService.off(events.MESSAGE, handleSocketMessage);
    }

  }, [])

  const location = useLocation();

  console.log(location.state);

  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  const roomCode = location.state.roomId;
  const currentUser = location.state.alias;

  const [messages, setMessages] = useState([
  ]);

  const handleMessage = async (text, from, timeStamp, type, iv) => {

    if (type === 'user') {
      const decryptedText = await decryptMessage(
        text, 
        iv, 
        location.state.key
      );

      setMessages(prev => [
        ...prev,
        { id: timeStamp, 
          text: decryptedText, 
          self: from === location.state.alias, 
          user: from, 
          type 
        }
      ]);
      return;
    }
    setMessages(prev => [
      ...prev,
      { 
        id: timeStamp, 
        text, 
        self: from === location.state.alias, 
        user: from, 
        type 
      }
    ])

  }


  const handleSend = async (text) => {
    if (!text.trim()) return;

    const encrypted = await encryptMessage(text, location.state.key);
    
    socketService.emit(events.MESSAGE, {
      roomId: location.state.roomId,
      type: 'user',
      ciphertext: encrypted.ciphertext,
      iv: encrypted.iv,
      timestamp: Date.now(),
    })
  };


  const navigate = useNavigate()
  const handleLeave = () => {
    socketService.emit(events.LEAVE_ROOM, {
      alias: location.state.alias,
      roomId: location.state.roomId,
    })
    navigate("/");
  };


  return (
    <div className="w-full h-full flex flex-col">

      {/* HEADER */}
      <div className="w-full px-6 py-4 bg-[#0D1018]/60 backdrop-blur-md border-b border-gray-800/50">
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs uppercase tracking-[0.3em] font-light">
              ROOM:
            </span>
            <span className="text-white text-sm font-bold tracking-wider">
              #{roomCode}
            </span>
          </div>

          <button
            onClick={handleLeave}
            className="px-4 py-1.5 bg-red-900/20 border border-red-800/50 text-red-400 text-xs uppercase tracking-[0.2em] rounded-md hover:bg-red-900/30 hover:border-red-700 transition-all"
          >
            Leave
          </button>

        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-gray-400 text-xs">
            Conectado como <span className="text-gray-300 font-medium">{currentUser}</span>
          </span>
        </div>
      </div>

      {/* CHAT MESSAGES */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </div>
      </div>

      {/* INPUT */}
      <MessageInput onSend={handleSend} />

    </div>
  );
}