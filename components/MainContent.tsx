"use client";
import { useState, useEffect, FormEvent, useRef, Fragment } from "react";
import Intro from "./Intro";
import PastPrompts from "./PastPrompts";
import ChatBox from "./ChatBox";
import UserInput from "./UserInput";
import AIresponse from "./AIresponse";

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

const pastData = [
  "carrot",
  "Cheese",
  "egg",
  "onions",
  "butter",
  "bell pepper",
  "almond",
];

const MainContent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  useEffect(() => {
    scrollToBottom();
    console.log(messages);
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    scrollToBottom();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(false);

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
    <section className="main flex justify-center items-start max-h-dvh rounded-xl md:min-h-min">
      {!messages.length ? (
        <div className="flex flex-col gap-5 md:gap-[40px] pt-5 md:pt-16 items-center justify-center">
          <Intro />
          <PastPrompts pastData={pastData} />
        </div>
      ) : (
        <div className="gap-5 w-full py-10 md:pt-16 h-[520px] px-0 md:px-16 lg:px-32 relative overflow-x-auto items-center justify-center">
          {messages.map((message) => (
            <Fragment key={message.id}>
              {message.sender === "user" ? (
                <UserInput key={message.id} text={message.text} />
              ) : (
                <AIresponse loading={loading} text={message.text} />
              )}
            </Fragment>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
      <ChatBox handleSubmit={handleSubmit} input={input} setInput={setInput} />
    </section>
  );
};

export default MainContent;
