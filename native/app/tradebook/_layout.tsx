import { useAppDispatch } from "@/redux/hook";
import { fetchOrderBook } from "@/redux/slices/OrderSlice";
import { Slot } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const TradebookScreenLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrderBook());
  }, [dispatch]);
  return (
    <SafeAreaView className="flex-1">
      <Slot />
    </SafeAreaView>
  );
};

export default TradebookScreenLayout;
