import MessageBubble from "./MessageBubble";

export default function MessageList({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
    </div>
  );
}
