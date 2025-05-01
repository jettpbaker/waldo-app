import React, { useEffect, useState } from "react";
const API = "http://localhost:3000";

export default function App() {
  const [pong, setPong] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${API}/api/ping`);
      const data = await response.json();
      setPong(data.message);
    }
    fetchData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Waldo Game</h1>
      {pong === null ? "Loading…" : pong ? "Server says pong!" : "No response"}
    </div>
  );
}
