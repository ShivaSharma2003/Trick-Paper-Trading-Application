import React, { useMemo } from "react";
import AppText from "./AppText";
import { InstrumentResponse } from "@/types/InstrumentTypes";
import { AppHeaderInstruments } from "@/data/AppHeaderData";
import { FormatNumber } from "@/utils/Formatter";

interface AppTickPriceProps {
  textSize?: number;
  className?: string;
  item: InstrumentResponse | AppHeaderInstruments | null;
  tick: any;
}

export default function AppTickPrice({
  textSize,
  item,
  tick,
}: AppTickPriceProps) {
  const data = useMemo(
    () => (item === null ? {} : tick[item?.token]),
    [item, tick]
  );
  const change = Number(data?.last_traded_price) - Number(data?.open_price_day);
  return (
    <AppText
      className={`${change > 0 ? "text-sucess" : change === 0 ? "text-textPrimary" : "text-danger"}`}
      textSize={textSize}
    >
      {FormatNumber(data?.last_traded_price / 100)}
    </AppText>
  );
}
