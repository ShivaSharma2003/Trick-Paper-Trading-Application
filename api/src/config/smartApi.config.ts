// import { SmartAPI, WebSocketV2 } from "smartapi-javascript";
// import generateTOTP from "../util/generateTOTP";

// const smartApi = new SmartAPI({
//   api_key: process.env.SMART_API_KEY,
// });

// interface SmartAPISessionResponse {
//   status: boolean;
//   message: string;
//   errorcode: string;
//   data: {
//     jwtToken: string;
//     refreshToken: string;
//     feedToken: string;
//     state: any | null;
//   };
// }

// // Global or module-level WebSocket instance for reconnection
// let currentWs: WebSocketV2 | null = null;

// const customSessionHook = async (): Promise<void> => {
//   console.log("SmartAPI Session expired - re-authenticating...");

//   try {
//     // Re-generate session
//     const newSession: SmartAPISessionResponse = await smartApi.generateSession(
//       process.env.SMART_API_CLIENT_ID!,
//       process.env.SMART_API_CLIENT_PASSWORD!,
//       generateTOTP(),
//     );

//     if (!newSession.status) {
//       throw new Error(`Re-auth failed: ${newSession.message}`);
//     }

//     console.log("New session generated successfully");

//     // Reconnect WebSocket with new tokens
//     if (currentWs) {
//       await currentWs.close();
//     }

//     const ws = new WebSocketV2({
//       clientcode: process.env.SMART_API_CLIENT_ID!,
//       jwttoken: newSession.data.jwtToken,
//       apikey: process.env.SMART_API_KEY!,
//       feedtype: newSession.data.feedToken,
//     });

//     await ws.connect();
//     currentWs = ws;
//     console.log("WebSocket reconnected after session expiry");

//     // Resume your subscriptions here (e.g., market data feeds for NIFTY)
//     // ws.subscribe([...]);
//   } catch (error) {
//     console.error("Session re-auth failed:", error);
//     // Optional: Retry logic or alert user
//   }
// };

// smartApi.setSessionExpiryHook(customSessionHook);

// const connectWebSocket = async () => {
//   try {
//     const session: SmartAPISessionResponse = await smartApi.generateSession(
//       process.env.SMART_API_CLIENT_ID,
//       process.env.SMART_API_CLIENT_PASSWORD,
//       generateTOTP(),
//     );

//     if (session.status === false) {
//       console.log("SmartAPI Session Connection Failed!!!");
//       console.log("Try to Connect SmartAPI Session Again...");
//       return null;
//     }

//     console.log("SmartAPI Session Status: ", session.status);
//     console.log("SmartAPI Session Message: ", session.message);

//     const ws = new WebSocketV2({
//       clientcode: process.env.SMART_API_CLIENT_ID,
//       jwttoken: session.data.jwtToken,
//       apikey: process.env.SMART_API_KEY,
//       feedtype: session.data.feedToken,
//     });

//     await ws.connect();
//     return ws;
//   } catch (error) {
//     console.log("Error Connecting Web Socket");
//   }
// };

// export default connectWebSocket;
