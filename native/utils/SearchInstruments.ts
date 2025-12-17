import { InstrumentResponse } from "@/types/InstrumentTypes";

interface SearchInstrumentsParameters {
  query: string;
  items: InstrumentResponse[];
}

const SearchInstruments = ({
  query,
  items,
}: SearchInstrumentsParameters): InstrumentResponse[] => {
  const q = query.trim();
  const terms = q.split(/\s+/).map((t) => new RegExp(t, "i"));
  return items.filter((i) => terms.every((r) => r.test(i.symbol)));
};

export default SearchInstruments;
