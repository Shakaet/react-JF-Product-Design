import React, { useEffect, useState } from "react";
import ChatWindow from "./component/ChatWindow";
import ConversationList from "./component/ConversationList";
import { connectSocket, disconnectSocket, socket } from "./socket";
import "./App.css";

function App() {
  const [conversationId, setConversationId] = useState(null);
  const [userId, setUserId] = useState("user1");
  const [userIdInput, setUserIdInput] = useState("user1");
  const [status, setStatus] = useState(socket.connected ? "online" : "offline");

  useEffect(() => {
    connectSocket();
    return () => disconnectSocket();
  }, []);

  useEffect(() => {
    const handleConnect = () => setStatus("online");
    const handleDisconnect = () => setStatus("offline");
    const handleReconnectAttempt = () => setStatus("reconnecting");
    const handleError = () => setStatus("error");

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.io.on("reconnect_attempt", handleReconnectAttempt);
    socket.on("connect_error", handleError);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.io.off("reconnect_attempt", handleReconnectAttempt);
      socket.off("connect_error", handleError);
    };
  }, []);

  const handleUserSubmit = (event) => {
    event.preventDefault();
    const trimmed = userIdInput.trim();
    if (!trimmed || trimmed === userId) return;

    setConversationId(null);
    setUserId(trimmed);
  };

  const statusLabel = {
    online: "Connected",
    reconnecting: "Reconnecting...",
    error: "Connection error",
    offline: "Offline",
  }[status];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <header className="sidebar__header">
          <div>
            <p className="eyebrow">JF Support Desk</p>
            <h1>Live Conversations</h1>
          </div>
          <span className={`status-badge status-badge--${status}`}>{statusLabel}</span>
        </header>

        <form className="user-form" onSubmit={handleUserSubmit}>
          <label htmlFor="user-id-input">Your user ID</label>
          <div className="user-form__controls">
            <input
              id="user-id-input"
              value={userIdInput}
              onChange={(event) => setUserIdInput(event.target.value)}
              placeholder="e.g. user1"
            />
            <button type="submit">Set</button>
          </div>
          <p className="hint">
            Use the same identifier as your backend auth so we can load the right conversations.
          </p>
        </form>

        <ConversationList
          userId={userId}
          activeConversationId={conversationId}
          setConversationId={setConversationId}
        />
      </aside>

      <main className="chat-panel">
        {conversationId ? (
          <ChatWindow key={conversationId} conversationId={conversationId} userId={userId} />
        ) : (
          <div className="empty-state">
            <h2>Select a conversation</h2>
            <p>
              Choose a thread from the left or start a new one to begin exchanging real-time
              messages.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

