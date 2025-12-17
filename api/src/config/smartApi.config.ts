import { SmartAPI, WebSocketV2 } from "smartapi-javascript";
import generateTOTP from "../util/generateTOTP";
import { ExchangeMapping } from "@util/Mapper";

const smartApi = new SmartAPI({
  api_key: process.env.SMART_API_KEY,
});

const connectSmartApiSession = async () => {
  try {
    const session = await smartApi.generateSession(
      process.env.SMART_API_CLIENT_ID,
      process.env.SMART_API_CLIENT_PASSWORD,
      generateTOTP()
    );

    return session;
  } catch (error) {
    console.log("Error Connectin SmartApi Session");
  }
};

const connectWebSocket = async () => {
  try {
    const session = await connectSmartApiSession();
    const ws = new WebSocketV2({
      clientcode: process.env.SMART_API_CLIENT_ID,
      jwttoken: session.data.jwtToken,
      apikey: process.env.SMART_API_KEY,
      feedtype: session.data.feedToken,
    });
    await ws.connect();
    return ws;
  } catch (error) {
    console.log("Error Connecting Web Socket");
  }
};

export default connectWebSocket;
