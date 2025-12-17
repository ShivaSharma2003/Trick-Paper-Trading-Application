export type segment = "NSE" | "BSE" | "NFO" | "BFO" | "MCX" | "CDS" | "NCO";

export const ExchangeMapping = (segment: segment): number => {
  switch (segment) {
    case "NSE":
      return 1;
    case "NFO":
      return 2;
    case "BSE":
      return 3;
    case "BFO":
      return 4;
    case "MCX":
      return 5;
    case "NCO":
      return 7;
    case "CDS":
      return 13;
  }
};
