import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slot } from "expo-router";

export default function FundsLayout() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <Slot />
    </SafeAreaView>
  );
}
