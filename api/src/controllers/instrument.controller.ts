import { redis } from "@config/redis.config";
import { InstrumentDTO } from "types/instrument";

export const fetchInstruments = async (req, res) => {
  try {
    const data = await redis.hGetAll("instruments");
    if (!data) {
      return res.status(404).json({ message: "Instrument not found" });
    }
    const instruments: InstrumentDTO[] = Object.values(data).map((item) => JSON.parse(String(item)));
    return res.status(200).json({ instruments });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchInstrumentById = async (req, res) => {
  try {
    const { tokenId } : {tokenId : string} = req.params;
    if (!tokenId) return res.status(403).json({ message: "bad Request" });

    const data = await redis.hGet("instruments", tokenId);
    if (!data) return res.status(404).json({ message: "Instrument not found" });
    return res.status(200).json({ instrument: JSON.parse(String(data)) });
  } catch (error) {
    return res.status(200).json({ message: "Internal Server Error" });
  }
};
