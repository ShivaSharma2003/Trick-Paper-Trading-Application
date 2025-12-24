import React from "react";
import AppText from "./AppText";
import { useAppSelector } from "@/redux/hook";
import useSocketTick from "@/hooks/useSocketTicks";
import { FormatNumber } from "@/utils/Formatter";

interface AppPositionChangeProps {
  textSize?: number;
  className?: string;
}

export default function AppPositionChange({
  className,
  textSize,
}: AppPositionChangeProps) {
  const { positions } = useAppSelector((state) => state.position);
  const { tick } = useSocketTick();

  const totalPnL = React.useMemo(() => {
    if (!positions || !tick) return 0;

    return positions.reduce((sum, position) => {
      const item = tick[position.token];
      if (!tick) return sum;

      const ltp = Number(item?.last_traded_price) / 100;
      const avg = Number(position.average);
      const qty = Number(position.quantity);

      return (
        sum + (position.type === "BUY" ? (ltp - avg) * qty : (avg - ltp) * qty)
      );
    }, 0);
  }, [positions, tick]);

  return (
    <AppText
      className={` ${totalPnL > 0 ? "text-sucess" : totalPnL === 0 ? "text-textMuted" : "text-danger"} ${className}`}
      textSize={textSize}
    >
      {FormatNumber(totalPnL)}
    </AppText>
  );
}
