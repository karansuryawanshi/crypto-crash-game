import GameRound from "../models/GameRound.js";
import crypto from "crypto";
import Bet from "../models/Bet.js";
import { roundCache } from "../utils/cache.js";

let roundNumber = 1;

function generateCrashPoint(seed, round) {
  const hash = crypto
    .createHash("sha256")
    .update(seed + round)
    .digest("hex");
  const num = parseInt(hash.slice(0, 8), 16); // Take first 8 chars of hash
  const result = (num % 10000) / 100;
  return Math.max(1.0, result); // Min crash is 1x
}

export const initSocket = (io) => {
  let currentMultiplier = 1;
  let crashPoint = 0;

  io.on("connection", (socket) => {
    socket.emit("connected", "Welcome");

    socket.on("cashout", (playerId) => {
      io.emit("cashout_success", { playerId, multiplier: currentMultiplier });
    });
  });

  setInterval(async () => {
    const seed = crypto.randomBytes(16).toString("hex");
    crashPoint = generateCrashPoint(seed, roundNumber);
    currentMultiplier = 1;

    const bets = await Bet.find({ roundId: roundNumber });

    let gameData = {
      roundId: roundNumber,
      crashPoint,
      seed,
      bets,
      cashouts: [],
    };

    const interval = setInterval(() => {
      currentMultiplier += 0.05;

      io.emit("multiplier_update", currentMultiplier.toFixed(2));

      if (currentMultiplier >= crashPoint) {
        io.emit("crash", {
          crashPoint: crashPoint.toFixed(2),
          seed,
          roundId: roundNumber,
        });

        GameRound.create(gameData);
        roundNumber++;
        roundCache.currentRoundId++;
        clearInterval(interval);
      }
    }, 100);
  }, 15000);
};
