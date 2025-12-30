import { futures, InstrumentResponse, options } from "@/types/InstrumentTypes";
import { UserResponse } from "@/types/UserTypes";
import useSocketTick from "./useSocketTicks";
import { useAppSelector } from "@/redux/hook";

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

  const { positions } = useAppSelector((state) => state.position);
  const existingPosition = positions?.find(
    (item) => item.token === instrument?.token
  );
  const isExit =
    existingPosition &&
    existingPosition.quantity === lotQuantity * (instrument?.lotSize ?? 0);

  if (!instrument || !profile) {
    return { margin: 0, brokerage: 0, totalAmount: 0 };
  }

  const item = tick[instrument.token];
  const ltp = Number(item?.last_traded_price ?? 0);

  let margin = 0;
  let brokerage = 0;

  if (options.has(instrument.instrumentType)) {
    margin = isExit
      ? 0
      : ((ltp / 100) * (lotQuantity * instrument.lotSize)) / profile.optMargin;

    brokerage = lotQuantity * profile.optBrokerage;
  }

  if (futures.has(instrument.instrumentType)) {
    margin = isExit ? 0 : profile.futMargin * lotQuantity;
    brokerage = lotQuantity * profile.futBrokerage;
  }

  const totalAmount = margin + brokerage;

  return { margin, brokerage, totalAmount };
};

export default useCalculation;
