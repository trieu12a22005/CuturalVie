import React, { useEffect, useRef, useState } from "react";
import { generateContent } from "../../api/Gemini";
const getTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const AIAssistantModal = ({ chatData, open, setOpen }) => {
  const [messages, setMessages] = useState([
    {
      id: 0,
      text: "xin chào,tôi có thể giúp gì cho bạn",
      timestamp: getTime(),
      sender: "AI",
      loading: false,
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const modalRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addAIMessage = async (text) => {
    setLoading(true);
    const loadingMsg = {
      id: messages.length + 1,
      text: "Typing...",
      timestamp: "",
      sender: "AI",
      loading: true,
    };
    setMessages((prev) => [...prev, loadingMsg]);
    try {
      const res = await generateContent(text);
      const AItext = res.candidates[0].content.parts[0].text;
      setMessages((prev) =>
        prev.map((msg) =>
          msg.loading
            ? { ...msg, text: AItext, timestamp: getTime(), loading: false }
            : msg
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatData) {
      setOpen(true);
      setMessages((prev) => [
        ...prev,
        {
          id: 1,
          text: chatData,
          timestamp: getTime(),
          sender: "User",
        },
      ]);

      addAIMessage(chatData);
    }
  }, [chatData]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleSubmit = async (e) => {
    setInputText("");
    e.preventDefault();
    if (inputText.trim() === "") return;
    const userMessage = {
      id: messages.length + 1,
      text: inputText.trim(),
      timestamp: getTime(),
      sender: "User",
    };
    setMessages((prev) => [...prev, userMessage]);
    await addAIMessage(inputText.trim());
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <dialog
      open
      className={`fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50 ${
        !open ? "hidden" : ""
      }`}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md h-[500px] flex flex-col"
      >
        <header className="p-4 border-b text-lg font-semibold flex justify-between items-center">
          AI Assistant
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-gray-700 text-xl font-bold"
            aria-label="Close"
          >
            &times;
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <article
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.sender === "User" ? "justify-end" : ""
              }`}
            >
              {msg.sender === "User" ? null : (
                <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  🤖
                </span>
              )}
              <div
                className={`p-3 rounded-xl text-sm max-w-[75%] ${
                  msg.sender === "User" ? "bg-blue-100" : "bg-gray-100"
                }`}
              >
                <p className="text-gray-800 whitespace-pre-wrap">{msg.text}</p>
                {msg.timestamp && (
                  <time className="text-[10px] text-gray-500 mt-1 block">
                    {msg.timestamp}
                  </time>
                )}
              </div>
            </article>
          ))}
          <div ref={chatEndRef} />
        </main>

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
              className="bg-blue-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "..." : "Send"}
            </button>
          </form>
        </footer>
      </div>
    </dialog>
  );
};

export default AIAssistantModal;
