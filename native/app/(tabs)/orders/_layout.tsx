import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchOrders } from "@/redux/slices/OrderSlice";
import { Slot } from "expo-router";
import { useEffect } from "react";

export default function OrdersLayout() {
  const dispatch = useAppDispatch();
  const { orderStatus } = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [orderStatus]);
  return <Slot />;
}
