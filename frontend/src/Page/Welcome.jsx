import { Button } from "antd";
import React from "react";
import "./Welcome.css";

const Welcome = ({ handleClick }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-header">
        <h1>Welcome to My Chitty Chat App</h1>
        <p>Explore and enjoy chatting Experience.</p>
      </div>
      <div>
        <Button type="primary" onClick={handleClick}>
          Signin With Google
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
