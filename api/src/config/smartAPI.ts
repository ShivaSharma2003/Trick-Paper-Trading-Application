// smartapi-tick-engine.ts - COMPLETE SOLUTION
import { SmartAPI, WebSocketV2 } from "smartapi-javascript";
import generateTOTP from "../util/generateTOTP";
import { ioServer } from "@config/socket.config";
import { ExchangeMapping, segment } from "@util/Mapper";
import { redis } from "@config/redis.config";

interface SmartAPISessionResponse {
  status: boolean;
  message: string;
  data: { jwtToken: string; feedToken: string };
}

interface payload {
  token: string;
  exchangeType: segment;
}

export const tickMap = new Map();
let tokenMap = new Map();
let ws: WebSocketV2 | null = null;

// 🔥 SINGLE RESPONSIBILITY: Everything in one place
const SmartAPITickEngine = () => {
  const smartApi = new SmartAPI({ api_key: process.env.SMART_API_KEY! });
  const io = ioServer();

  // 1. Session expiry hook (handles 403 errors automatically)
  smartApi.setSessionExpiryHook(async () => {
    console.log("🔄 Session expired - reconnecting...");
    if (ws) await ws.close();
    await initializeConnection();
  });

  // 2. Generate fresh session
  const generateSession = async () => {
    const session = await smartApi.generateSession(
      process.env.SMART_API_CLIENT_ID!,
      process.env.SMART_API_CLIENT_PASSWORD!,
      generateTOTP()
    );
    if (!session.status) throw new Error(session.message);
    return session;
  };

  // 3. Create WS + ALL event handlers
  const createWebSocket = async (session: SmartAPISessionResponse) => {
    ws = new WebSocketV2({
      clientcode: process.env.SMART_API_CLIENT_ID!,
      jwttoken: session.data.jwtToken,
      apikey: process.env.SMART_API_KEY!,
      feedtype: session.data.feedToken,
    });

    // ✅ ALL YOUR EVENT HANDLERS IN ONE PLACE
    ws.on("tick", (data) => {
      if (data === "pong") return;
      const token = String(data.token).replace(/"/g, "").trim();
      tickMap.set(token, { ...data, token });
    });

    ws.on("error", () => {
      console.log("❌ WS Error - Session hook will handle");
    });

    ws.on("close", () => {
      console.log("🔌 WS Closed - Session hook will handle");
    });

    ws.on("open", () => {
      console.log("✅ WS Connected");
      subscribeInstrument(); // Auto-resubscribe
    });

    await ws.connect();
  };

  // 4. Initial connection
  const initializeConnection = async () => {
    try {
      console.log("🚀 Initializing SmartAPI...");
      const session = await generateSession();
      await createWebSocket(session);
    } catch (error) {
      console.error("❌ Init failed:", error);
      setTimeout(initializeConnection, 5000); // Retry
    }
  };

  // 5. YOUR EXISTING SUBSCRIBE LOGIC
  const subscribeInstrument = () => {
    if (!ws) return;
    const tokenArray: payload[] = Array.from(tokenMap.values());
    tokenArray.forEach((item) => {
      const payload = {
        correlationID: "correlation_id",
        action: 1,
        mode: 2,
        exchangeType: ExchangeMapping(item.exchangeType),
        tokens: [item.token],
      };
      ws!.fetchData(payload);
    });
  };

  // 6. Broadcast ticks (your existing logic)
  setInterval(() => {
    io.emit("tick", Object.fromEntries(tickMap));
  }, 500);

  // 7. Socket.io handlers (your existing logic)
  io.on("connection", (socket) => {
    console.log("🟢 User Connected " + socket.id);
    
    const handleSubscribe = (token: string, exchangeType: segment) => {
      if (!tokenMap.has(token)) {
        tokenMap.set(token, { token, exchangeType });
        saveToken({ token, exchangeType });
        subscribeInstrument(); // Re-subscribe ALL
      }
    };

    socket.on("subscribe", ({ token, exchangeType }: payload) => 
      handleSubscribe(token, exchangeType)
    );
    
    socket.on("watchlist", ({ token, exchangeType }: payload) => 
      handleSubscribe(token, exchangeType)
    );
    
    socket.on("disconnect", () => console.log("🔴 User Disconnected"));
  });

  // 8. Redis helpers (your existing logic)
  const saveToken = async ({ token, exchangeType }: payload) => {
    await redis.hSet(`trick:tokenMap:${token}`, { token, exchangeType });
  };

  // Load on startup
  redis.keys("trick:tokenMap:*").then(async (keys) => {
    for (const key of keys) {
      const data: any = await redis.hGetAll(key);
      tokenMap.set(data.token, data);
    }
    tokenMap.set("99926000", { token: "99926000", exchangeType: "NSE" });
    tokenMap.set("99926009", { token: "99926009", exchangeType: "NSE" });
  });

  // START EVERYTHING
  initializeConnection();
};

// EXPORT AND RUN
export default SmartAPITickEngine;
