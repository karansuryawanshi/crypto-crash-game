import mongoose from "mongoose";
const playerSchema = new mongoose.Schema({
  username: String,
  wallets: {
    btc: { type: Number, default: 0 },
    eth: { type: Number, default: 0 },
  },
});
export default mongoose.model("Player", playerSchema);
