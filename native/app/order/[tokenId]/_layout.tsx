import { useAppDispatch } from "@/redux/hook";
import { fetchInstrumentBytoken } from "@/redux/slices/InstrumentSlice";
import { Slot, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderLayout = () => {
  const { tokenId } = useLocalSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInstrumentBytoken(String(tokenId)));
  }, [dispatch, tokenId]);
  return (
    <SafeAreaView className="py-2 bg-backgroundSecondary flex-1">
      <Slot />
    </SafeAreaView>
  );
};

export default OrderLayout;
