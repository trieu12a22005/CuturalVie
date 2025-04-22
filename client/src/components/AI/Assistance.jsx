import React, { useState } from "react";

const AIAssistantModal = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome! I'm your AI assistant. I'm here to help you understand how this platform works and guide you through any information you need.",
      timestamp: "10:00 AM",
      sender: "AI",
    },
    {
      id: 2,
      text: "This application is designed to enhance your productivity by providing intelligent suggestions and real-time support based on your activity.",
      timestamp: "10:01 AM",
      sender: "AI",
    },
    {
      id: 3,
      text: "Remember, this is just a demo — feel free to explore all features without worry. Your experience is fully sandboxed and private.",
      timestamp: "10:02 AM",
      sender: "AI",
    },
  ]);

  const [inputText, setInputText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputText.trim() === "") return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sender: "User", // This is the user's message
    };

    // AI response simulation
    const aiMessage = {
      id: messages.length + 2,
      text: "Thanks for your message! How can I assist you further?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sender: "AI", // AI's automatic response
    };

    // Update the message state with both user and AI messages
    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setInputText(""); // Clear input field after submitting
  };

  return (
    <dialog open className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md h-[500px] flex flex-col">
        
        {/* Header */}
        <header className="p-4 border-b text-lg font-semibold">
          AI Assistant
        </header>

        {/* Chat Content */}
        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <article key={msg.id} className={`flex items-start space-x-3 ${msg.sender === 'User' ? 'justify-end' : ''}`}>
              {msg.sender === 'User' ? null : (
                <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  🤖
                </span>
              )}
              <div className={`bg-${msg.sender === 'User' ? 'blue-100' : 'gray-100'} p-3 rounded-xl text-sm max-w-[75%]`}>
                <p className="text-gray-800">{msg.text}</p>
                <time className="text-[10px] text-gray-500 mt-1 block">{msg.timestamp}</time>
              </div>
            </article>
          ))}
        </main>

        {/* Input Field */}
        <footer className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-600"
            >
              Send
            </button>
          </form>
        </footer>

      </div>
    </dialog>
  );
};

export default AIAssistantModal;
