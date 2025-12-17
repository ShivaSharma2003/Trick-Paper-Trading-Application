import connectWebSocket from "@config/smartApi.config";
import { ioServer } from "@config/socket.config";
import { ExchangeMapping, segment } from "@util/Mapper";
import { redis } from "@config/redis.config";

interface payload {
  token: string;
  exchangeType: segment;
}

const tickMap = new Map();
let tokenMap = new Map();

const TickEngine = async () => {
  console.log("Tick Engine Initialized...");
  try {
    const ws = await connectWebSocket();
    const io = ioServer();

    tokenMap = await loadTokenMap();
    tokenMap.set("99926000", { token: "99926000", exchangeType: "NSE" });
    tokenMap.set("99926009", { token: "99926009", exchangeType: "NSE" });

    subscribeInstrument(ws, tokenMap);

    ws.on("tick", (data) => {
      if (data === "pong") return;
      const token = String(data.token).replace(/"/g, "").trim();
      tickMap.set(token, { ...data, token });
    });

    setInterval(() => {
      io.emit("tick", Object.fromEntries(tickMap));
    }, 100);

    ws.on("error", (err) => console.error("WebSocket Error:", err));
    ws.on("close", () => console.log("⚠️ WebSocket closed — reconnecting..."));

    io.on("connection", (socket) => {
      console.log("🟢 User Connected " + socket.id);
      socket.on("subscribe", ({ token, exchangeType }) => {
        if (!tokenMap.has(token)) {
          try {
            const payload = {
              correlationID: "correlation_id",
              action: 1,
              mode: 2,
              exchangeType: ExchangeMapping(exchangeType),
              tokens: [token],
            };
            ws.fetchData(payload);
            tokenMap.set(token, { token, exchangeType });
            saveToken({ token, exchangeType });
          } catch (error) {
            console.error(error);
          }
        }
      });

      socket.on("watchlist/add", ({ token, exchangeType }) => {
        if (!tokenMap.has(token)) {
          try {
            const payload = {
              correlationID: "correlation_id",
              action: 1,
              mode: 2,
              exchangeType: ExchangeMapping(exchangeType),
              tokens: [token],
            };
            ws.fetchData(payload);
            tokenMap.set(token, { token, exchangeType });
            saveToken({ token, exchangeType });
          } catch (error) {
            console.error(error);
          }
        }
      });
      socket.on("disconnect", () => {
        console.log("🔴 User Disconnected ");
      });
    });
  } catch (error) {
    console.log("Error in Tick Engine");
  }
};

const subscribeInstrument = (ws, tokenMap) => {
  const tokenArray: payload[] = Array.from(tokenMap.values());
  tokenArray.forEach((item) => {
    const payload = {
      correlationID: "correlation_id",
      action: 1,
      mode: 2,
      exchangeType: ExchangeMapping(item.exchangeType),
      tokens: [item.token],
    };
    ws.fetchData(payload);
  });
};

const saveToken = async ({ token, exchangeType }: payload) => {
  return await redis.hSet(`tokenMap:${token}`, {
    token,
    exchangeType,
  });
};

const loadTokenMap = async () => {
  const keys = await redis.keys("tokenMap:*");
  const map = new Map();

  for (const key of keys) {
    const data: any = await redis.hGetAll(key);
    map.set(data.token, data);
  }

  return map;
};

export default TickEngine;
