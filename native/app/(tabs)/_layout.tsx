import AppHeader from "@/components/Common/AppHeader";
import AppTab from "@/components/Common/AppTab";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchUserProfile, loadAccount } from "@/redux/slices/AuthSlice";
import { fetchInstruments } from "@/redux/slices/InstrumentSlice";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const { orderStatus } = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(loadAccount());
  }, [dispatch]);

  useEffect(() => {
    if (!token) router.replace("/auth");
  }, [token]);

  useEffect(() => {
    if (!token) return;
    dispatch(fetchUserProfile(String(token)));
  }, [dispatch, token, orderStatus]);

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
