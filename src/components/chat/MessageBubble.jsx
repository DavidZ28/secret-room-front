export default function MessageBubble({ message }) {
  if (message.type === 'user') {
    return (
      <div className={`flex flex-col ${message.self ? 'items-end' : 'items-start'}`}>
        
        {/* Nombre de usuario */}
        {!message.self && (
          <span className="text-gray-500 text-xs mb-1 ml-1 font-medium">
            {message.user}
          </span>
        )}
  
        {/* Mensaje */}
        <div
          className={`
            max-w-[70%]
            px-4 py-3
            rounded-2xl
            text-white text-sm
            ${
              message.self
                ? "bg-[#2C1B50] rounded-br-sm"
                : "bg-[#1B1B1C] rounded-bl-sm"
            }
          `}
        >
          {message.text}
        </div>
      </div>
    );
  }

  return (
      <div className={`flex flex-col items-center`}>
  
        {/* Mensaje */}
        <div
          className={`
            max-w-[70%]
            px-4 py-3
            rounded-2xl
            text-white text-sm
          `}
        >
          {message.text}
        </div>
      </div>
    );
  
}