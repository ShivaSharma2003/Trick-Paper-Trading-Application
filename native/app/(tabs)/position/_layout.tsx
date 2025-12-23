import { useAppDispatch } from "@/redux/hook";
import { fetchPositions } from "@/redux/slices/PositionSlice";
import { Slot } from "expo-router";
import { useEffect } from "react";

const PositionLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPositions());
  }, [dispatch]);
  
  return <Slot />;
};
export default PositionLayout;
