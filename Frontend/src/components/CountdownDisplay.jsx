import { useEffect, useState } from "react";
import { socket } from "../socket/index";

const CountdownDisplay = () => {
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    socket.on("countdown", (seconds) => {
      setCountdown(seconds);
    });

    return () => socket.off("countdown");
  }, []);

  if (countdown === null) return null;

  return (
    <div className="text-lg text-gray-600 text-center my-4">
      New round starting in: {countdown}
    </div>
  );
};

export default CountdownDisplay;
