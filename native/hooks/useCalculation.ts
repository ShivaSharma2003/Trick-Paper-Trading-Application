import { InstrumentResponse } from "@/types/InstrumentTypes";
import { UserResponse } from "@/types/UserTypes";
import useSocketTick from "./useSocketTicks";

interface useCalculationParameters {
  instrument: InstrumentResponse | null;
  profile: UserResponse | null;
  lotQuantity: number;
}

interface useCalculationReturnType {
  margin: number;
  brokerage: number;
  totalAmount: number;
}

const useCalculation = ({
  instrument,
  profile,
  lotQuantity,
}: useCalculationParameters): useCalculationReturnType => {
  const { tick } = useSocketTick();
  const item = instrument === null ? {} : tick[instrument.token];
  const margin =
    ((Number(item?.last_traded_price) / 100) * (lotQuantity * (instrument?.lotSize ?? 0))) /
    (profile === null ? 1 : profile.margin);
  const brokerage =
    ((Number(item?.last_traded_price) / 100) * (lotQuantity * (instrument?.lotSize ?? 0))) / 100;

  const totalAmount = margin + brokerage;

  return { margin, brokerage, totalAmount };
};

export default useCalculation;
