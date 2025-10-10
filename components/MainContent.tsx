"use client";
import { useState, useEffect, FormEvent, useRef, Fragment } from "react";
import Intro from "./Intro";
import PastPrompts from "./PastPrompts";
import ChatBox from "./ChatBox";
import UserInput from "./UserInput";
import AIresponse from "./AIresponse";
import { AnimatePresence } from "motion/react";

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
  isLoading?: boolean;
};

const pastData = [
  "carrot",
  "Cheese",
  "egg",
  "onions",
  "butter",
  "bell pepper",
  "almond",
  "Pepperoni",
];

const displayError = {
  status: "internet-error",
  message:
    "No interent connection, make sure you are connected to the internet",
};

const MainContent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // scroll to bottom function
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  // scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
    console.log(messages);
  }, [messages]);

  // Handle prompt from past prompts
  const handlePrompt = async (prompt: string) => {

    // 1. Create user message
    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: prompt.trim(),
    };

    // 2. Create placeholder bot message
    const tempBotMessage: Message = {
      id: Date.now() + 1,
      sender: "bot",
      text: "```json{}```", // Placeholder (could be "..." or a spinner in UI)
      isLoading: true, // Optional flag for loading state
    };

    // 3. Update messages with both user and placeholder bot message
    setMessages((prev) => [...prev, userMessage, tempBotMessage]);

    // 4. Make API call
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
        // 5. Replace placeholder with actual bot response
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempBotMessage.id
              ? { ...msg, text: data.message, isLoading: false }
              : msg
          )
        );
      } else {
        // 6. Replace placeholder with error message
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempBotMessage.id
              ? {
                  ...msg,
                  text: data.error || "Something went wrong",
                  isLoading: false,
                }
              : msg
          )
        );
      }
    } catch (error) {
      console.error("Error fetching chat:", error);
      // 7. Replace placeholder with network error message
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempBotMessage.id
            ? {
                ...msg,
                text: "Network error. Please try again.",
                isLoading: false,
              }
            : msg
        )
      );
    }
  };

  // Handle submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // scroll to bottom
    scrollToBottom();

    // check if user has entered a message
    if (!input.trim()) return;

    // 1. Create user message
    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input.trim(),
    };

    // 2. Create placeholder bot message
    const tempBotMessage: Message = {
      id: Date.now() + 1,
      sender: "bot",
      text: "```json{}```", // could be "..." or a spinner in UI
      isLoading: true, // optional flag
    };

    // 3. Update chat with both messages
    setMessages((prev) => [...prev, userMessage, tempBotMessage]);
    setInput("");

    console.log(messages);

    // Sending to the api and get response back
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.text }),
      });

      // get response
      const data = await response.json();

      if (response.ok) {
        // 5. Replace loading message with real bot message
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempBotMessage.id
              ? { ...msg, text: data.message, isLoading: false }
              : msg
          )
        );
      } else {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempBotMessage.id
              ? { ...msg, text: JSON.stringify(displayError), isLoading: false }
              : msg
          )
        );
      }
    } catch (error) {
      console.error("Error fetching chat:", error);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempBotMessage.id
            ? {
                ...msg,
                text: "Network error. Please try again.",
                isLoading: false,
              }
            : msg
        )
      );
    } finally {
    }
  };

  return (
    <section className="main flex justify-center items-start max-h-dvh rounded-xl md:min-h-min">
      {!messages.length ? (
        <div className="flex flex-col gap-10 pt-5 md:pt-16 items-center justify-center">
          <Intro />
          <PastPrompts pastData={pastData} handlePrompt={handlePrompt} />
        </div>
      ) : (
        <div className="gap-5 w-full py-10 md:pt-16 h-[520px] px-0 md:px-16 lg:px-32 relative overflow-x-auto items-center justify-center">
          {messages.map((message) => (
            <Fragment key={message.id}>
              {message.sender === "user" ? (
                <AnimatePresence>
                  <UserInput key={message.id} text={message.text} />
                </AnimatePresence>
              ) : (
                <>
                  <AIresponse
                    isLoading={message.isLoading ?? false}
                    text={message.text}
                  />
                </>
              )}
              <div ref={messagesEndRef} />
            </Fragment>
          ))}
        </div>
      )}
      <ChatBox handleSubmit={handleSubmit} input={input} setInput={setInput} />
    </section>
  );
};

export default MainContent;
