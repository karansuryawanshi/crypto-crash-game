import express from "express";
import Player from "../models/Player.js";
import Transaction from "../models/Transaction.js";
import { getCryptoPrice } from "../utils/fetchPrice.js";

const router = express.Router();

router.get("/:playerId", async (req, res) => {
  const player = await Player.findById(req.params.playerId);
  // const btcPrice = await getCryptoPrice("bitcoin");
  // const ethPrice = await getCryptoPrice("ethereum");
  const btcPrice = await getCryptoPrice("btc");
  const ethPrice = await getCryptoPrice("eth");

  res.json({
    btc: player.wallets.btc,
    btc_usd: player.wallets.btc * btcPrice,
    eth: player.wallets.eth,
    eth_usd: player.wallets.eth * ethPrice,
  });
});

router.get("/transactions/:playerId", async (req, res) => {
  try {
    const transactions = await Transaction.find({
      playerId: req.params.playerId,
    }).sort({ timestamp: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

export default router;
