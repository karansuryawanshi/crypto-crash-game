import mongoose from "mongoose";

const betSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
    required: true,
  },
  roundId: { type: Number, required: true },
  usdAmount: Number,
  cryptoAmount: Number,
  currency: String,
});

// export default mongoose.model("Bet", betSchema);
export default mongoose.models.Bet || mongoose.model("Bet", betSchema);
