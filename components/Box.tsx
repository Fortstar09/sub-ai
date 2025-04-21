"use client";
import { useState, useEffect, FormEvent, useRef } from "react";

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

const Box = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await response.json();

      if (response.ok) {
        const botMessage: Message = {
          id: Date.now() + 1,
          sender: "bot",
          text: data.message,
        };
        console.log("Data:", data);
        console.log("Bot message:", botMessage);
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const errorMessage: Message = {
          id: Date.now() + 1,
          sender: "bot",
          text: data.error || "Something went wrong",
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Error fetching chat:", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: "An Unexpected error occurred.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="flex flex-col overflow-y-auto p-4">
        {messages.map((msg) => (
          <div key={msg.id}>
            <p>{msg.sender}</p>
            <p>{msg.text}</p>
          </div>
        ))}

        {loading && <p>loading ... </p>}
        <div ref={messagesEndRef} />
      </div>
      <div className="absolute bottom-[10%] w-[600px] h-[100px]">
      <div className="flex flex-col justify-center items-center w-full rounded-[16px] bg-[#F4F4F5]">
        <p className="text-[#98A2B3] font-normal text-xs leading-[16px] py-2">
          Sub AI may occasionally make mistakes. Please cross-check the results
          for accuracy.
        </p>
        <form
          className="w-full relative h-[68px] flex items-center border-[#EEEEEE] rounded-[16px] justify-center bg-white border"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Enter missing ingredient ... "
            className="resize-none placeholder:text-[#98A2B3] blink text-base font-medium h-[68px]
            text-[#475367] focus:outline-none focus:outline py-5 w-[540px] border-none focus:border-none"
          />
          <button type="submit" disabled={loading} >
            <svg
              width="28"
              height="28"
              fill="none"
              className="cursor-pointer"
              
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="28" height="28" rx="14" fill="#25A81F" />
              <path
                d="M11 12.5L14 9.5M14 9.5L17 12.5M14 9.5V18.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
    </section>
  );
};

export default Box;
