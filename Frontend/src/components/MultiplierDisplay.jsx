import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://crypto-crash-game-76s4.onrender.com"); // ✅ change if backend is hosted

const MultiplierDisplay = () => {
  const [multiplier, setMultiplier] = useState(1);
  const [crashPoint, setCrashPoint] = useState(null);
  const [crashed, setCrashed] = useState(false);

  useEffect(() => {
    socket.on("multiplier_update", (val) => {
      setMultiplier(parseFloat(val));
      setCrashed(false);
    });

    socket.on("crash", (data) => {
      setCrashPoint(data.crashPoint);
      setCrashed(true);
    });

    return () => {
      socket.off("multiplier_update");
      socket.off("crash");
    };
  }, []);

  return (
    <div className="text-center my-10">
      <h2 className="text-2xl font-semibold mb-2 text-gray-700">
        Current Multiplier
      </h2>
      <div
        className={`text-5xl font-bold ${
          crashed ? "text-red-600" : "text-green-600"
        } transition-all duration-100`}
      >
        {multiplier.toFixed(2)}x
      </div>

      {crashed && (
        <p className="text-sm mt-2 text-gray-500">Crashed at: {crashPoint}x</p>
      )}
    </div>
  );
};
export default MultiplierDisplay;
