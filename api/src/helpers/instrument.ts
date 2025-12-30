import { redis } from "@config/redis.config";
import { InstrumentDTO, RawInstruments } from "types/instrument";
import InstrumentModel from "@models/instrumentModel";
import axios from "axios";

const ALLOWED_SEGMENTS = new Set(["OPTSTK", "OPTIDX", "OPTFUT" , "FUTCOM" , "FUTSTK" , "FUTIDX"]);

export const storeInstrument = async () => {
  try {
    console.log("fetching Instruments ...");

    const instruments = await fetchInstruments();

    const filtered = instruments.filter((item) =>
      ALLOWED_SEGMENTS.has(item.instrumentType)
    );

    console.log(`${filtered.length} instruments after filtering`);

    await redis.del(`trick:instruments`);
    console.log("Redis Instruments deleted...");
    await InstrumentModel.deleteMany({});
    console.log("DB Instruments deleted ...");

    for (const item of filtered) {
      await redis.hSet(`trick:instruments`, item.token, JSON.stringify(item));

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

    console.log("Fetched and stored instruments successfully...");
  } catch (error) {
    console.error(error);
    console.log("Error storing Redis instruments...");
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
  const regex = /^([A-Z]+)(\d{2})([A-Z]{3})(\d{2})(\d+)?(CE|PE|FUT)?$/;
  const match = symbol.match(regex);
  if (!match) return symbol;

  const [, name, _day, mon, _year, strike, type] = match;

  return [name, _day, mon, strike, type].filter(Boolean).join(" ");
};
