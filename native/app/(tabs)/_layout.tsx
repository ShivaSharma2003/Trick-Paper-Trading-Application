import AppHeader from "@/components/Common/AppHeader";
import AppTab from "@/components/Common/AppTab";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchUserProfile, loadAccount } from "@/redux/slices/AuthSlice";
import { fetchInstruments } from "@/redux/slices/InstrumentSlice";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadAccount());
  }, [dispatch]);

  useEffect(() => {
    if (!token) return;
    dispatch(fetchUserProfile(String(token)));
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(fetchInstruments());
  }, [dispatch]);

  return (
    <SafeAreaView className="gap-2 flex-1 ">
      <AppHeader />
      <AppTab />
    </SafeAreaView>
  );
}
