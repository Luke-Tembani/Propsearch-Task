'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function MessagingInterface() {
  const [message, setMessage] = useState('');
  const router = useRouter();
  const [chatHistory, setChatHistory] = useState([
    { id: 1, user: 'Alice', text: 'Hello everyone!' },
    { id: 2, user: 'Bob', text: 'Hi Alice!' },
    { id: 3, user: 'Charlie', text: 'How’s it going?' },
    { id: 4, user: 'Alice', text: 'Pretty good, thanks!' },
    { id: 5, user: 'You', text: 'Hey everyone!' }
  ]);

  const participants = ['Alice', 'Bob', 'Charlie', 'David', 'You'];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setChatHistory([...chatHistory, { id: chatHistory.length + 1, user: 'You', text: message }]);
      setMessage('');
    }
  };


  const goToProfile = ()=>{
    router.push("/home/profile");
  }

  return (
    <div className="messaging-container">
      <div className="participants">
        <h3>Participants</h3>
        <ul>
          {participants.map((participant, index) => (
            <li key={index}>{participant}</li>
          ))}
        </ul>
      </div>

      <div className="chat-box">
        <div className="chat-history">
          {chatHistory.map((msg) => (
            <div key={msg.id} className="chat-message">
              <strong>{msg.user}: </strong>
              <span>{msg.text}</span>
            </div>
          ))}
        </div>
        
        <form className="message-input" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>

        <button onClick={()=>goToProfile()}>View Profile</button>
      </div>

      <style>{`
        .messaging-container {
          display: flex;
          gap: 20px;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }

        .participants {
          width: 25%;
          border-right: 1px solid #ccc;
          padding: 10px;
        }

        .participants h3 {
          margin-bottom: 10px;
          font-size: 1.2em;
        }

        .participants ul {
          list-style: none;
          padding: 0;
        }

        .participants li {
          margin-bottom: 8px;
          font-size: 1em;
        }

        .chat-box {
          width: 75%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .chat-history {
          flex-grow: 1;
          overflow-y: auto;
          padding: 10px;
          border-bottom: 1px solid #ccc;
          max-height: 300px;
        }

        .chat-message {
          margin-bottom: 10px;
        }

        .message-input {
          display: flex;
          gap: 10px;
          padding: 10px;
        }

        .message-input input {
          flex-grow: 1;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .message-input button {
          padding: 8px 16px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .message-input button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
}
