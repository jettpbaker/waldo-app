import express from "express";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/api/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.listen(3000, () =>
  console.log(`Backend listening on http://localhost:3000`)
);
