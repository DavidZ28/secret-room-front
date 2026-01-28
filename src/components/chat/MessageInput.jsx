import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full px-6 py-4 bg-[#0D1018] border-t border-gray-800/50 relative z-20">
      <div className="max-w-4xl mx-auto flex items-center gap-3">

        <input
          type="text"
          value={text}
          placeholder="Escribe un mensaje..."
          maxLength={200}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-black/20 border border-gray-800 text-gray-300 placeholder-gray-600 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-gray-700 transition-colors"
        />

        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className="px-6 py-3 bg-black/30 border border-gray-800 text-gray-400 rounded-lg hover:bg-black/40 hover:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

      </div>
    </div>
  );
}