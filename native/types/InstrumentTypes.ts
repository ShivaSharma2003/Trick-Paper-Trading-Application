export interface InstrumentResponse {
  token: string;
  symbol: string;
  name: string;
  lotSize: number;
  instrumentType: string;
  exchangeSegment: string;
}

export const options = new Set(["OPTFUT", "OPTIDX", "OPTSTK"]);
export const futures = new Set(["FUTCOM", "FUTIDX", "FUTSTK"]);
