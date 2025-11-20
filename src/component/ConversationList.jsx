import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const API_BASE = "http://localhost:5000/api/chat";

const fallbackLabel = (conversation, userId) =>
  conversation?.participants?.find?.((id) => id !== userId) ??
  conversation?.members?.find?.((id) => id !== userId) ??
  conversation?.receiverId ??
  "Unknown user";

const formatTime = (timestamp) => {
  if (!timestamp) return "—";
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default function ConversationList({ userId, activeConversationId, setConversationId }) {
  const [receiverId, setReceiverId] = useState("");
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  const loadConversations = useCallback(async () => {
    if (!userId) {
      setConversations([]);
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const { data } = await axios.get(`${API_BASE}/conversations/${userId}`);
      const normalized = Array.isArray(data) ? data : [];
      setConversations(normalized);
    } catch (err) {
      setError(err.response?.data?.message ?? "Unable to load conversations.");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadConversations();

    const intervalId = setInterval(() => {
      if (typeof document !== "undefined" && document.hidden) {
        return;
      }
      loadConversations();
    }, 15000);

    return () => {
      clearInterval(intervalId);
    };
  }, [loadConversations]);

  const createConversation = async () => {
    const receiver = receiverId.trim();
    if (!receiver || !userId) {
      return;
    }

    setIsCreating(true);
    setError("");
    try {
      const { data } = await axios.post(`${API_BASE}/conversation`, {
        senderId: userId,
        receiverId: receiver,
      });

      setReceiverId("");
      setConversations((prev) => {
        const exists = prev.some((conversation) => conversation._id === data._id);
        return exists ? prev : [data, ...prev];
      });
      setConversationId(data._id);
    } catch (err) {
      setError(err.response?.data?.message ?? "Unable to start a conversation.");
    } finally {
      setIsCreating(false);
    }
  };

  const disableActions = !userId || !receiverId.trim() || isCreating;

  const orderedConversations = useMemo(
    () =>
      [...conversations].sort((a, b) => {
        return new Date(b.updatedAt ?? b.createdAt ?? 0) - new Date(a.updatedAt ?? a.createdAt ?? 0);
      }),
    [conversations]
  );

  return (
    <div className="conversation-panel">
      <section className="conversation-panel__start">
        <h3>Start a chat</h3>
        <div className="start-form">
          <input
            placeholder="Receiver ID"
            value={receiverId}
            disabled={!userId}
            onChange={(e) => setReceiverId(e.target.value)}
          />
          <button type="button" onClick={createConversation} disabled={disableActions}>
            {isCreating ? "Starting..." : "Start"}
          </button>
        </div>
        {!userId && <p className="hint">Set your user ID above to start a conversation.</p>}
      </section>

      <section className="conversation-panel__list">
        <div className="section-heading">
          <p>Conversations</p>
          <button type="button" onClick={loadConversations} disabled={isLoading}>
            Refresh
          </button>
        </div>

        {error && <p className="error-text">{error}</p>}

        {isLoading ? (
          <p className="list-placeholder">Loading...</p>
        ) : orderedConversations.length ? (
          <ul className="conversation-list">
            {orderedConversations.map((conversation) => {
              const label = fallbackLabel(conversation, userId);
              const lastMessage = conversation.lastMessage?.text ?? "No messages yet";
              return (
                <li key={conversation._id}>
                  <button
                    type="button"
                    className={`conversation-row ${
                      conversation._id === activeConversationId ? "is-active" : ""
                    }`}
                    onClick={() => setConversationId(conversation._id)}
                  >
                    <div>
                      <p className="conversation-row__label">{label}</p>
                      <p className="conversation-row__preview">{lastMessage}</p>
                    </div>
                    <span className="conversation-row__time">
                      {formatTime(conversation.updatedAt ?? conversation.createdAt)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="list-placeholder">No conversations yet.</p>
        )}
      </section>
    </div>
  );
}
