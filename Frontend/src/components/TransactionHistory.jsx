import React, { useEffect, useState } from "react";
import axios from "axios";

const TransactionHistory = ({ playerId }) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        `https://crypto-crash-game-9btz.onrender.com/api/wallet/transactions/${playerId}`
      );
      setTransactions(res.data);
    } catch (err) {
      setError("❌ Failed to load transactions");
      console.log("[TRANSACTION_HISTORY_ERROR]", err);
    }
  };

  useEffect(() => {
    if (playerId) fetchTransactions();
  }, [playerId]);

  if (!playerId) return null;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">📜 Transaction History</h2>
      <div className="overflow-auto max-h-60">
        <table className="w-full text-sm text-left border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Type</th>
              <th className="p-2">Crypto</th>
              <th className="p-2">USD</th>
              <th className="p-2">Currency</th>
              <th className="p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx._id} className="border-t">
                <td className="p-2">{tx.transactionType}</td>
                <td className="p-2">{tx.cryptoAmount.toFixed(6)}</td>
                <td className="p-2">${tx.usdAmount.toFixed(2)}</td>
                <td className="p-2">{tx.currency.toUpperCase()}</td>
                <td className="p-2">
                  {new Date(tx.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
