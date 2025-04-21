"use client";
import { useState, useEffect, FormEvent, useRef, Fragment } from "react";
import Intro from "./Intro";
import PastPrompts from "./PastPrompts";
// import ChatBox from './ChatBox'
// import Box from './Box'
import ChatBox from "./ChatBox";
import UserInput from "./UserInput";
import AIresponse from "./AIresponse";

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

const MainContent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        console.log("Messages:", messages);
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
    <section className="main flex justify-center items-start min-h-[100vh] flex-1 rounded-xl md:min-h-min">
      {   messages ? (
        <div className=" gap-5 w-full pt-16 h-[520px] px-32 relative overflow-x-auto items-center justify-center">
          {messages.map((message) => (
            <Fragment key={message.id}>
              { message.sender === "user" ? (
                <UserInput key={message.id} text={message.text} />
              ) : (
                <AIresponse text={message.text} />
              )}
            </Fragment>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-[40px] pt-16  items-center justify-center">
          <Intro />
          <PastPrompts />
        </div>
      )}
      <ChatBox handleSubmit={handleSubmit} input={input} setInput={setInput} />
    </section>
  );
};

export default MainContent;
