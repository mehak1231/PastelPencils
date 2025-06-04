import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";
import faq from "./faq";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([
    { user: "", bot: "Hey! How can I help you today?" },
  ]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);

  const suggestions = [
    "What is your return policy?",
    "How to reset my password?",
    "What are your support hours?",
  ];

  const toggleChat = () => {
    setOpen(!open);
    setShowSuggestions(true); // Reset suggestions when opened
  };

  const handleSend = (message) => {
    const userMessage = message || input;
    if (!userMessage.trim()) return;

    setShowSuggestions(false);

    const newChat = [...chat, { user: userMessage, bot: null }];
    setChat(newChat);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const lowerMsg = userMessage.trim().toLowerCase();

      // Try to match by keyword
      const keyword = Object.keys(faq).find((key) => lowerMsg.includes(key));
      const answer = keyword
        ? faq[keyword]
        : "I'm not sure about that. You can ask something else!";

      setChat([
        ...newChat,
        {
          user: "",
          bot: answer,
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat, loading, open]);

  return (
    <>
      <div className="chat-icon" onClick={toggleChat}>
        🐰
      </div>

      {open && (
        <div className="chatbot-container">
          <div className="chatbot-header">Your Chatbot</div>

          <div className="chatbot-messages">
            {chat.map((msg, index) => (
              <React.Fragment key={index}>
                {msg.user && (
                  <div className="message user">
                    <span className="icon">👤</span>
                    <span>{msg.user}</span>
                  </div>
                )}
                {msg.bot && (
                  <div className="message bot">
                    <span className="icon">🤖</span>
                    <span>{msg.bot}</span>
                  </div>
                )}
              </React.Fragment>
            ))}
            {loading && (
              <div className="message bot loading">
                <span className="icon">🤖</span>
                <span>
                  Typing<span className="dot">.</span>
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {showSuggestions && (
            <div className="suggested-questions">
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => handleSend(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              placeholder="Type your message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={() => handleSend()}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;

