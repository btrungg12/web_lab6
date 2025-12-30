"use client"; // Bắt buộc phải có dòng này để dùng React Hooks

import { useState } from "react";

export default function Home() {
  // 1. Khai báo các biến trạng thái (State)
  const [messages, setMessages] = useState<any[]>([]); // Lưu lịch sử chat
  const [input, setInput] = useState(""); // Lưu nội dung ô nhập liệu
  const [isLoading, setIsLoading] = useState(false); // Trạng thái đang chờ AI trả lời

  // 2. Hàm gửi tin nhắn
  const sendMessage = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    
    // Lưu câu hỏi của người dùng vào danh sách chat ngay lập tức
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput(""); // Xóa ô nhập liệu

    try {
      // Gọi API mà bạn vừa test thành công bên Postman
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: currentInput }),
      });

      const data = await response.json();

      if (response.ok) {
        // Lưu câu trả lời của AI vào danh sách
        const aiMessage = { role: "ai", content: data.answer };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        alert("Lỗi: " + data.error);
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 bg-gray-900 text-white">
      {/* KHUNG CHAT */}
      <div className="w-full max-w-2xl flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
        {messages.length === 0 && (
          <p className="text-center text-gray-500 mt-20">Hãy hỏi tôi bất cứ điều gì về Next.js...</p>
        )}
        
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl max-w-[80%] ${
              msg.role === "user"
                ? "bg-blue-600 ml-auto" // Tin nhắn của bạn nằm bên phải
                : "bg-gray-700 mr-auto" // Tin nhắn AI nằm bên trái
            }`}
          >
            <strong>{msg.role === "user" ? "Bạn: " : "AI: "}</strong>
            <p className="whitespace-pre-wrap">{msg.content}</p>
          </div>
        ))}

        {isLoading && <div className="text-gray-400 italic">AI đang suy nghĩ...</div>}
      </div>

      {/* Ô NHẬP LIỆU */}
      <div className="w-full max-w-2xl flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Bấm Enter để gửi
          placeholder="Nhập câu hỏi..."
          className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-500 text-white"
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-bold disabled:opacity-50"
        >
          {isLoading ? "..." : "Gửi"}
        </button>
      </div>
    </main>
  );
}