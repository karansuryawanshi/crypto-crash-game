import React, { useState, useEffect } from "react";
import MultiplierDisplay from "./components/MultiplierDisplay";
import BetForm from "./components/BetForm";
import WalletInfo from "./components/WalletInfo";
import CashoutButton from "./components/CashoutButton";
import TransactionHistory from "./components/TransactionHistory";

const App = () => {
  const [playerId, setPlayerId] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("https://crypto-crash-game-9btz.onrender.com/api/players/all")
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, []);

  console.log(players);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-md p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center">🪙 Crypto Crash</h1>
        <MultiplierDisplay />

        {/* <input
          type="text"
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          placeholder="Enter your Player ID"
          className="w-full border px-4 py-2 rounded"
        /> */}
        <select
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Player</option>
          {players.map((p) => (
            <option key={p._id} value={p._id}>
              {p.username}
            </option>
          ))}
        </select>

        <WalletInfo playerId={playerId} />
        <BetForm playerId={playerId} />
        <CashoutButton playerId={playerId} currency="btc" />
        <TransactionHistory playerId={playerId} />
      </div>
    </div>
  );
};

export default App;
