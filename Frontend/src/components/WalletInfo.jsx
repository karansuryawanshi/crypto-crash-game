import React, { useEffect, useState } from "react";
import axios from "axios";

const WalletInfo = ({ playerId }) => {
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState(null);

  const fetchWallet = async (id) => {
    const res = await fetch(
      `https://crypto-crash-game-9btz.onrender.com/api/wallet/${id}`
    );
    const data = await res.json();
    setWallet(data);
  };

  //   async function fetchWalletcall() {
  //     await fetchWallet(playerId);
  //   }
  useEffect(() => {
    // if (playerId) fetchWallet();
    // fetchWallet(playerId);
    if (playerId) fetchWallet(playerId);
  }, [playerId]);

  if (!playerId)
    return <p className="text-gray-500">Enter Player ID to view wallet.</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!wallet) return <p className="text-gray-400">Loading wallet...</p>;

  return (
    <div className="bg-gray-100 p-4 rounded shadow text-sm">
      <h2 className="font-semibold mb-2 text-lg">💼 Wallet Info</h2>
      <ul className="space-y-1">
        <li>
          BTC: {wallet.btc} (${wallet.btc_usd.toFixed(2)})
        </li>
        <li>
          ETH: {wallet.eth} (${wallet.eth_usd.toFixed(2)})
        </li>
      </ul>
    </div>
  );
};

export default WalletInfo;
