import React, { useMemo } from "react";
import AppText from "./AppText";
import { InstrumentResponse } from "@/types/InstrumentTypes";
import { AppHeaderInstruments } from "@/data/AppHeaderData";
import { FormatNumber } from "@/utils/Formatter";
import useSocketTick from "@/hooks/useSocketTicks";

interface AppTickChangeProps {
  textSize?: number;
  className?: string;
  item: InstrumentResponse | AppHeaderInstruments | null;
}

export default function AppTickChange({
  className,
  textSize,
  item,
}: AppTickChangeProps) {
  const { tick } = useSocketTick();
  const data = useMemo(
    () => (item === null ? {} : tick[item?.token]),
    [item, tick]
  );
  const open = Number(data?.open_price_day);
  const ltp = Number(data?.last_traded_price);

  const change = open > 0 ? ((ltp - open)) : 0;
  return (
    <AppText className={className} textSize={textSize}>
      {FormatNumber(change / 100)}
    </AppText>
  );
}
