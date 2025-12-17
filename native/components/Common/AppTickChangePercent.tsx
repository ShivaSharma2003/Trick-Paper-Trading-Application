import React, { useMemo } from "react";
import AppText from "./AppText";
import { InstrumentResponse } from "@/types/InstrumentTypes";
import { AppHeaderInstruments } from "@/data/AppHeaderData";
import { FormatNumber } from "@/utils/Formatter";

interface AppTickChangePercentProps {
  className?: string;
  textSize?: number;
  item: InstrumentResponse | AppHeaderInstruments | null;
  tick: any;
}

export default function AppTickChangePercent({
  className,
  textSize,
  tick,
  item,
}: AppTickChangePercentProps) {
  
  const data = useMemo(
    () => (item === null ? {} : tick[item?.token]),
    [item, tick]
  );
  const changePercent =
    (Number(data?.last_traded_price) - Number(data?.open_price_day)) / 100;
  return (
    <AppText className={`${className}`} textSize={textSize}>
      {FormatNumber(changePercent / 100)}
    </AppText>
  );
}
