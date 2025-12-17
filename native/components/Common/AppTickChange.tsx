import React, { useMemo } from "react";
import AppText from "./AppText";
import { InstrumentResponse } from "@/types/InstrumentTypes";
import { AppHeaderInstruments } from "@/data/AppHeaderData";
import { FormatNumber } from "@/utils/Formatter";

interface AppTickChangeProps {
  textSize?: number;
  className?: string;
  item: InstrumentResponse | AppHeaderInstruments | null;
  tick: any;
}

export default function AppTickChange({
  className,
  textSize,
  tick,
  item,
}: AppTickChangeProps) {
  const data = useMemo(
    () => (item === null ? {} : tick[item?.token]),
    [item, tick]
  );
  const change = Number(data?.last_traded_price) - Number(data?.open_price_day);
  return (
    <AppText className={className} textSize={textSize}>
      {FormatNumber(change / 100)}
    </AppText>
  );
}
