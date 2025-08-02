import mongoose from "mongoose";
const gameRoundSchema = new mongoose.Schema({
  roundId: Number,
  crashPoint: Number,
  bets: Array,
  cashouts: Array,
  timestamp: { type: Date, default: Date.now },
});
export default mongoose.model("GameRound", gameRoundSchema);
