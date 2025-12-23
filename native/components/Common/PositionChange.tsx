import React from "react";
import AppText from "./AppText";
import { PositionResponse } from "@/types/PositionType";
import useSocketTick from "@/hooks/useSocketTicks";
import { FormatNumber } from "@/utils/Formatter";

interface PositionChangeProps {
  className?: string;
  textSize?: number;
  position: PositionResponse;
}

export default function PositionChange({
  className,
  textSize,
  position,
}: PositionChangeProps) {
  const { tick } = useSocketTick();
  const item = tick[position.token];

  const PnL = React.useMemo(() => {
    if (!position || !tick) return 0;
    const ltp = Number(item?.last_traded_price) / 100;
    const avg = Number(position.average);
    const qty = Number(position.quantity);

    return position.type === "BUY" ? (ltp - avg) * qty : (avg - ltp) * qty;
  }, [item?.last_traded_price, position, tick]);

  return (
    <AppText
      className={`${PnL > 0 ? "text-sucess" : PnL === 0 ? "text-textMuted" : "text-danger"}`}
      textSize={textSize}
    >
      {FormatNumber(PnL)}
    </AppText>
  );
}
