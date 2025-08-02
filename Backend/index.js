import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import gameRoutes from "./routes/game.js";
import walletRoutes from "./routes/wallet.js";
import playersData from "./routes/player.js";
import { initSocket } from "./websockets/gameSocket.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

app.use("/api/game", gameRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/players", playersData);

initSocket(io);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI).then(() => {
  server.listen(PORT, () => console.log(`Server running on ${PORT}`));
});
