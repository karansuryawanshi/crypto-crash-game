import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BetForm = () => {
  //   const [usdAmount, setUsdAmount] = useState("");
  //   const [currency, setCurrency] = useState("btc");
  //   const [message, setMessage] = useState(null);
  const [usdAmount, setUsdAmount] = useState("");
  const [currency, setCurrency] = useState("btc");
  const [message, setMessage] = useState(null);
  const [playerId, setPlayerId] = useState(""); // paste playerId here
  const [players, setPlayers] = useState([]);

  const handleBet = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://crypto-crash-game-9btz.onrender.com/api/game/bet",
        {
          playerId,
          usdAmount: parseFloat(usdAmount),
          currency,
        }
      );
      // setMessage("✅ Bet placed successfully");
      toast("Bet placed successfully");
    } catch (err) {
      setMessage("❌ " + err.response?.data?.error || "Error placing bet");
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetch("https://crypto-crash-game-9btz.onrender.com/api/players/all")
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, []);

  return (
    <form onSubmit={handleBet} className="space-y-4 my-6">
      <h2 className="text-xl font-semibold">Place a Bet</h2>

      {/* <input
        type="text"
        placeholder="Your Player ID"
        value={playerId}
        onChange={(e) => setPlayerId(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
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

      <input
        type="number"
        placeholder="Amount in USD"
        value={usdAmount}
        onChange={(e) => setUsdAmount(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />

      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="w-full px-4 py-2 border rounded"
      >
        <option value="btc">Bitcoin (BTC)</option>
        <option value="eth">Ethereum (ETH)</option>
      </select>

      <button
        type="submit"
        disabled={!playerId || !usdAmount || !currency}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
      >
        Place Bet
      </button>

      {message && <p className="text-sm mt-2 text-center">{message}</p>}
    </form>
  );
};

export default BetForm;
