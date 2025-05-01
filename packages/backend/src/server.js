import express from "express";

const app = express();

app.get("/api/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.listen(3000, () =>
  console.log(`Backend listening on http://localhost:3000`)
);
