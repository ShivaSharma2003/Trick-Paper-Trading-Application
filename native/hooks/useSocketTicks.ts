import socket from "@/config/socket.config";
import { useEffect, useState } from "react";

const useSocketTick = () => {
  const [tick, setTick] = useState<any>({});

  useEffect(() => {
    socket.on("tick", (data) => {
      setTick(data);
    });
  }, []);

  return { tick };
};

export default useSocketTick;
