import Player from "../models/Player.js";
import express from "express";

const router = express.Router();

router.get("/all", async (req, res) => {
  const players = await Player.find();
  res.json(players);
});

export default router;

// /route/wallet.js
