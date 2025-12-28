import React, { useEffect, useRef, useState } from "react";
import { generateContent } from "../../api/Gemini";
import { IoCloseSharp } from "react-icons/io5";

const getTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const AIAssistantModal = ({ chatData, open, setOpen }) => {
  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      text: "Xin chào, tôi có thể giúp gì cho bạn?",
      timestamp: getTime(),
      sender: "AI",
      loading: false,
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [sending, setSending] = useState(false);

  const chatEndRef = useRef(null);
  const modalRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addAIMessage = async (text) => {
    setSending(true);

    const loadingId = crypto.randomUUID();

    setMessages((prev) => [
      ...prev,
      {
        id: loadingId,
        text: "Typing...",
        timestamp: "",
        sender: "AI",
        loading: true,
      },
    ]);

    try {
      const res = await generateContent(text);

      const aiText =
        res?.choices?.[0]?.message?.content ??
        "Xin lỗi, tôi không thể trả lời lúc này.";

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingId
            ? {
              ...msg,
              text: aiText,
              timestamp: getTime(),
              loading: false,
            }
            : msg
        )
      );
    } catch (err) {
      console.error("GPT error:", err);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingId
            ? {
              ...msg,
              text: "Có lỗi xảy ra, vui lòng thử lại.",
              timestamp: getTime(),
              loading: false,
            }
            : msg
        )
      );
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (!chatData) return;

    setOpen(true);

    const userMsg = {
      id: crypto.randomUUID(),
      text: chatData,
      timestamp: getTime(),
      sender: "User",
      loading: false,
    };

    setMessages((prev) => [...prev, userMsg]);
    addAIMessage(chatData);
  }, [chatData]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const text = inputText.trim();
    setInputText("");

    const userMsg = {
      id: crypto.randomUUID(),
      text,
      timestamp: getTime(),
      sender: "User",
      loading: false,
    };

    setMessages((prev) => [...prev, userMsg]);
    await addAIMessage(text);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <dialog
      open={open}
      className={`fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50 ${!open ? "hidden" : ""
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
            className="text-gray-400 hover:text-gray-700"
            aria-label="Close"
          >
            <IoCloseSharp size={26} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <article
              key={msg.id}
              className={`flex items-start space-x-3 ${msg.sender === "User" ? "justify-end" : ""
                }`}
            >
              {msg.sender !== "User" && (
                <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                  🤖
                </span>
              )}

              <div
                className={`p-3 rounded-xl text-sm max-w-[75%] ${msg.sender === "User" ? "bg-green-100" : "bg-gray-100"
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
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              disabled={sending}
              className="bg-green-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-green-600 disabled:opacity-50"
            >
              {sending ? "..." : "Send"}
            </button>
          </form>
        </footer>
      </div>
    </dialog>
  );
};

export default AIAssistantModal;
