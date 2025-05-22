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

const displayError = {
  status: "internet-error",
  message:
    "No interent connection, make sure you are connected to the internet",
};

const MainContent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    scrollToBottom();
    console.log(messages);
  }, [messages]);

  const handlePrompt = async (prompt: string) => {
    console.log(prompt);

    const promptMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: prompt,
    };

    setMessages((prev) => [...prev, promptMessage]);
    setLoading(false);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: promptMessage.text }),
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

  // Handle submit

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // scroll to bottom
    scrollToBottom();

    // check if user has entered a message
    if (!input.trim()) return;

    // create a user message
    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input.trim(),
    };

    // Store user message in the message state
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(false);

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
        const botMessage: Message = {
          id: Date.now() + 1,
          sender: "bot",
          text: data.message,
        };

        setMessages((prev) => [...prev, botMessage]);
      } else {
        console.log("error here");
        const errorMessage: Message = {
          id: Date.now() + 1,
          sender: "bot",
          text: JSON.stringify(displayError),
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
                  <AIresponse loading={loading} text={message.text} />
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
