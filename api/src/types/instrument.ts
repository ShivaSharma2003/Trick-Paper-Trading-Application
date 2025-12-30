export interface InstrumentDTO {
  symbol: string;
  instrumentType: string;
  exchangeSegment: string;
  lotSize: number;
  name: string;
  token: string;
  expiry?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RawInstruments {
  symbol: string;
  instrumenttype: string;
  exch_seg: string;
  lotsize: string;
  name: string;
  token: string;
  expiry: string;
  tick_size: string;
  strike: string;
}

export const options = new Set(["OPTFUT", "OPTIDX", "OPTSTK"]);
export const futures = new Set(["FUTCOM", "FUTIDX", "FUTSTK"]);
