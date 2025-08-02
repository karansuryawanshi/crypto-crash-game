import mongoose from "mongoose";
import dotenv from "dotenv";
import Player from "../models/Player.js";

dotenv.config();

const seed = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connection successfull"));

  await Player.deleteMany();
  await Player.insertMany([
    { username: "Alice", wallets: { btc: 0.005, eth: 0.1 } },
    { username: "Bob", wallets: { btc: 0.01, eth: 0.2 } },
    { username: "Charlie", wallets: { btc: 0.002, eth: 0.05 } },
  ]);

  console.log("Sample players inserted.");
  process.exit();
};

seed();
