import express from "express";
import Player from "../models/Player.js";
import Transaction from "../models/Transaction.js";
import Bet from "../models/Bet.js"; // ✅ Capitalized and safe
import { getCryptoPrice } from "../utils/fetchPrice.js";
import { v4 as uuidv4 } from "uuid";
import { roundCache } from "../utils/cache.js"; // ✅ For round tracking

const router = express.Router();

// 🔁 POST /api/game/bet
router.post("/bet", async (req, res) => {
  const { playerId, usdAmount, currency } = req.body;

  try {
    const player = await Player.findById(playerId);
    if (!player) throw new Error("Player not found");

    const price = await getCryptoPrice(currency);
    const cryptoAmount = usdAmount / price;

    if (player.wallets[currency] < cryptoAmount) {
      throw new Error("Insufficient funds");
    }

    // Deduct from wallet
    player.wallets[currency] -= cryptoAmount;
    await player.save();

    // Log transaction
    await Transaction.create({
      playerId,
      usdAmount,
      cryptoAmount,
      currency,
      transactionType: "bet",
      transactionHash: uuidv4(),
      priceAtTime: price,
    });

    // Save bet
    await Bet.create({
      playerId,
      roundId: roundCache.currentRoundId,
      usdAmount,
      cryptoAmount,
      currency,
    });

    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message || "Bet failed" });
  }
});

// 🔁 POST /api/game/cashout
router.post("/cashout", async (req, res) => {
  const { playerId, multiplier, currency } = req.body;

  try {
    const player = await Player.findById(playerId);
    if (!player) throw new Error("Player not found");

    const bet = await Bet.findOne({
      playerId,
      roundId: roundCache.currentRoundId,
    });
    if (!bet) throw new Error("No active bet found");

    const betCrypto = bet.cryptoAmount;
    const payout = betCrypto * multiplier;
    const price = await getCryptoPrice(currency);

    // Update wallet
    player.wallets[currency] += payout;
    await player.save();

    // Log cashout transaction
    await Transaction.create({
      playerId,
      usdAmount: payout * price,
      cryptoAmount: payout,
      currency,
      transactionType: "cashout",
      transactionHash: uuidv4(),
      priceAtTime: price,
    });

    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message || "Cashout failed" });
  }
});

export default router;
