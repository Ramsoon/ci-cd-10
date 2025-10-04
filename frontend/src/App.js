import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");
    try {
      const res = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      console.error(err);
      setMessage("Failed to contact server");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 60 }}>
      <h1>Final Project — Login</h1>
      <p>{process.env.REACT_APP_WELCOME || "Welcome!"}</p>
      <form onSubmit={handleLogin}>
        <input placeholder="username" onChange={(e)=>setUsername(e.target.value)} /><br/><br/>
        <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} /><br/><br/>
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
