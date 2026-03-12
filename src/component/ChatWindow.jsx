import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { socket } from "../socket";

const API_BASE = "http://192.168.0.169:5000/api/chat";

const formatTime = (value) => {
  if (!value) return "--:--";
  return new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default function ChatWindow({ conversationId, userId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    let ignore = false;

    async function loadMessages() {
      setIsLoading(true);
      setError("");
      try {
        const { data } = await axios.get(`${API_BASE}/messages/${conversationId}`);
        if (!ignore) {
          setMessages(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.response?.data?.message ?? "Unable to load messages.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadMessages();
    socket.emit("join_room", conversationId);

    const handleReceive = (incoming) => {
      if (incoming.conversationId && incoming.conversationId !== conversationId) return;

      setMessages((prev) => {
        const exists = prev.some((message) => message._id === incoming._id);
        return exists ? prev : [...prev, incoming];
      });
    };

    socket.on("receive_message", handleReceive);

    return () => {
      ignore = true;
      socket.emit("leave_room", conversationId);
      socket.off("receive_message", handleReceive);
    };
  }, [conversationId]);

  const submitMessage = () => {
    if (!text.trim() || isSending) return;

    const payload = {
      conversationId,
      sender: userId,
      text: text.trim(),
    };

    setIsSending(true);
    socket.emit("send_message", payload);
    setText("");
    setIsSending(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitMessage();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitMessage();
    }
  };

  const connectionClass = socket.connected
    ? "status-badge status-badge--online"
    : "status-badge status-badge--offline";

  return (
    <div className="chat-window">
      <header className="chat-window__header">
        <div>
          <p className="eyebrow">Conversation ID</p>
          <h2>#{conversationId.slice(-6)}</h2>
        </div>
        <span className={connectionClass}>{socket.connected ? "Live" : "Offline"}</span>
      </header>

      <div className="chat-window__body">
        {isLoading ? (
          <p className="list-placeholder">Loading history...</p>
        ) : messages.length ? (
          messages.map((message, index) => {
            const isOwner = message.sender === userId;
            const key = message._id ?? `${message.sender}-${index}`;
            return (
              <div key={key} className={`message-row ${isOwner ? "is-owner" : ""}`}>
                <div className="message-bubble">
                  <div className="message-meta">
                    <span>{message.sender}</span>
                    <span>{formatTime(message.createdAt ?? Date.now())}</span>
                  </div>
                  <p>{message.text}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="list-placeholder">No messages yet. Say hello!</p>
        )}
        <div ref={endRef} />
      </div>

      {error && <p className="error-text">{error}</p>}

      <form className="chat-window__composer" onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={!socket.connected}
        />
        <button type="submit" disabled={!text.trim() || isSending || !socket.connected}>
          {isSending ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
