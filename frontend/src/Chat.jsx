import React, { useState, useEffect } from "react";
import { Input, Button, List, notification, Avatar, Badge, Space } from "antd";
import io from "socket.io-client";

import "./Chat.css";

const socket = io("http://localhost:3000");

function Chat() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    socket.on("user joined", (username, onlineCount) => {
      setOnlineUsers((users) => [...users, username]);
      setChatMessages((messages) => [
        ...messages,
        { username: "", message: `${username} joined the chat!` },
      ]);
    });

    socket.on("user left", (username, onlineCount) => {
      setOnlineUsers((users) => users.filter((user) => user !== username));
      setChatMessages((messages) => [
        ...messages,
        { username: "", message: `${username} left the chat!` },
      ]);
    });

    socket.on("chat message", ({ username, message }) => {
      setChatMessages((messages) => [...messages, { username, message }]);
    });

    socket.on("username exists", () => {
      setError("Username already exists. Please choose a different username.");
      notification.open({
        message: "Username already exists",
        description:
          "Username already exists. Please choose a different username.",
      });
    });
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setError("");
  };

  const handleUsernameSubmit = () => {
    if (username.trim() !== "") {
      socket.emit("user joined", username);
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleMessageSubmit = () => {
    if (username.trim() !== "" && message.trim() !== "") {
      socket.emit("chat message", message);
      setMessage("");
    } else {
      notification.open({
        message: "Username Not Available",
        description: "Provide username kindly",
      });
    }
  };

  return (
    <div className="ChatApp">
      {/* left side div contains name of user joined and list of name */}
      <div style={{ height: "90vh", overflow: "hidden" }}>
        <div className="UsernameInput">
          <Input
            placeholder="Enter username"
            value={username}
            onChange={handleUsernameChange}
          />
          <Button type="primary" onClick={handleUsernameSubmit}>
            Join Chat
          </Button>
        </div>
        {/* online users */}
        <div className="OnlineUsers">
          <h4>Online Users ({onlineUsers.length}):</h4>
          <List
            itemLayout="horizontal"
            dataSource={onlineUsers}
            renderItem={(user) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <Avatar src="https://i.pravatar.cc/150?img=3" />
                      {user}
                      <Badge status="success" style={{ marginLeft: 4 }} />
                    </span>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </div>

      {/* Right side of div contains chat only UI */}
      <div
        style={{
          border: "4px solid gray",
          height: "90vh",
          overflow: "hidden",
          position: "relative",
          backgroundColor: "#EEEEEE",
          borderRadius: "0.5rem",
        }}
      >
        <div className="ChatMessages">
          <List
            dataSource={chatMessages}
            renderItem={(item) => (
              <List.Item>
                {item.username && <strong>{item.username}: </strong>}
                {item.message}
              </List.Item>
            )}
          />
        </div>
        <div
          className="MessageInput"
          style={{
            display: "flex",
            marginTop: "auto",
            position: "absolute",
            left: "0",
            bottom: "0",
            width: "100%",
            gap: "0.5rem",
          }}
        >
          <Input
            placeholder="Enter message"
            value={message}
            allowClear
            onChange={handleMessageChange}
          />
          <Button type="primary" onClick={handleMessageSubmit}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
