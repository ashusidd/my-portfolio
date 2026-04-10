// src/components/MessageList.jsx
import React from 'react';

function MessageList({ messages, onReply }) {
    // If 'messages' is undefined, the app crashes. We add a fallback [].
    const allMessages = messages || [];

    return (
        <div className="message-list">
            {allMessages.map((m) => (
                <div key={m.id} className="card message-card">
                    <p><strong>From:</strong> {m.name}</p>
                    <p>{m.text}</p>
                    {/* Make sure you are using a unique ID for the input */}
                    {!m.reply && (
                        <div>
                            <input type="text" id={`reply-input-${m.id}`} placeholder="Type reply..." />
                            <button onClick={() => onReply(m.id, document.getElementById(`reply-input-${m.id}`).value)}>
                                Reply
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default MessageList; // 🚀 MUST HAVE THIS LINE