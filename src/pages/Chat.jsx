import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MessageBubble from "../components/chat/MessageBubble";
import MessageInput from "../components/chat/MessageInput";

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: 1, text: "Hola 👋", self: false, user: "anonimo" },
    { id: 2, text: "Todo bien, ¿y tú?", self: true, user: "You" },
  ]);
  
  const roomCode = "1234";
  const currentUser = "anonimo";

  const handleSend = (text) => {
    if (text.trim()) {
      setMessages([
        ...messages,
        { id: Date.now(), text, self: true, user: "You" }
      ]);
    }
  };

  const handleLeave = () => {
    navigate('/');
  };

  return (
    <div className="w-full h-full flex flex-col">

      {/* HEADER */}
      <div className="w-full px-6 py-4 bg-[#0D1018]/60 backdrop-blur-md border-b border-gray-800/50 flex-shrink-0">
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