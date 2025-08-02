import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { toast } from "react-toastify";

const socket = io("https://crypto-crash-game-76s4.onrender.com");

const CashoutButton = ({ playerId, currency }) => {
  const [message, setMessage] = useState(null);
  const [multiplier, setMultiplier] = useState(1);

  useEffect(() => {
    socket.on("multiplier_update", (val) => {
      setMultiplier(parseFloat(val));
    });

    socket.on("cashout_success", (data) => {
      if (data.playerId === playerId) {
        // setMessage(`✅ Cashed out at ${data.multiplier}x`);
        toast(`Cashed out at ${data.multiplier}x`);
      }
    });

    return () => {
      socket.off("multiplier_update");
      socket.off("cashout_success");
    };
  }, [playerId]);

  const handleCashout = async () => {
    try {
      // optional API backup (for transaction logging)
      await axios.post(
        "https://crypto-crash-game-76s4.onrender.com/api/game/cashout",
        {
          playerId,
          multiplier,
          currency,
        }
      );

      socket.emit("cashout", playerId); // WebSocket trigger
      setMessage("⏳ Cashout requested...");
      toast("Cashout requested");
    } catch (err) {
      console.log(err);
      // setMessage("❌ Error processing cashout");
      toast.error("Error processing cashout");
    }
  };

  if (!playerId) return null;

  return (
    <div className="mt-4">
      <button
        onClick={handleCashout}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded"
      >
        Cashout Now
      </button>
      {message && <p className="text-sm mt-2 text-center">{message}</p>}
    </div>
  );
};

export default CashoutButton;
