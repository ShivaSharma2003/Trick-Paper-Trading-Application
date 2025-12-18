import { redis } from "@config/redis.config";
import { InstrumentDTO, RawInstruments } from "types/instrument";
import InstrumentModel from "@models/instrumentModel";
import axios from "axios";

export const storeInstrument = async () => {
  try {
    const instruments = await fetchInstruments();
    await InstrumentModel.deleteMany({});
    for (const item of instruments) {
      await redis.hSet("instruments", item.token, JSON.stringify(item));
      await InstrumentModel.create({
        token: item.token,
        exchangeSegment: item.exchangeSegment,
        symbol: item.symbol,
        instrumentType: item.instrumentType,
        lotSize: item.lotSize,
        name: item.name,
        expiry: item.expiry,
      });
    }
    console.log(`${instruments.length} Instruments In Redis`);
  } catch (error) {
    console.log(error);
    console.log("Error Storing Redis Instruments... ");
  }
};

const fetchInstruments = async () => {
  try {
    const { data } = await axios.get(process.env.INSTRUMENTS_URL);
    const validateData = validateInstruments(data);
    return validateData;
  } catch (error) {
    console.log(error);
    console.error("Error fetching Instruments...");
  }
};

const validateInstruments = (instruments): InstrumentDTO[] => {
  const data: InstrumentDTO[] = instruments.map((item: RawInstruments) => {
    const data: InstrumentDTO = {
      symbol: ValidateSymbol(item.symbol),
      name: item.name,
      token: item.token,
      expiry: item.expiry,
      exchangeSegment: item.exch_seg,
      instrumentType: item.instrumenttype,
      lotSize: Number(item.lotsize),
    };
    return data;
  });

  return data;
};

const ValidateSymbol = (symbol: string): string => {
  const REGEX =
    /^([A-Z]+)(\d{1,2})?(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(\d{2})(\d+)?(CE|PE|FUT)$/;
  const normalized = symbol.replace(/\s+/g, "").toUpperCase();
  const match = normalized.match(REGEX);
  if (!match) return symbol;

  const [, name, day, month, year, strike, type] = match;

  const dayStr = day ? day.padStart(2, "0") : "01";
  const fullYear = `20${year}`;
  const monthName = month;

  return `${name} ${dayStr} ${monthName} ${strike} ${type}`;
};
