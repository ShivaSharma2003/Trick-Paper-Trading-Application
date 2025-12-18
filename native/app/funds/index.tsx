import { View, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import AppText from "@/components/Common/AppText";
import { FormatNumber } from "@/utils/Formatter";
import { router } from "expo-router";
import { useAppSelector } from "@/redux/hook";

export default function FundScreen() {
  const { profile } = useAppSelector((state) => state.auth);
  return (
    <>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <AppText className="text-textPrimary" textSize={16}>
          Funds
        </AppText>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1 px-4">
        {/* Available Margin Card */}
        <View className="bg-white rounded-lg p-6 border border-border">
          <View className="flex-row items-center mb-4">
            <AppText className="text-textMuted" textSize={12}>
              Available margin (Cash + Collateral)
            </AppText>
          </View>

          <AppText className="text-brand mb-4" textSize={24}>
            {FormatNumber(Number(profile?.availableFunds))}
          </AppText>

          {/* Action Buttons */}
          <View className="flex-row gap-4">
            <TouchableOpacity className="flex-1 bg-buttonSuccess rounded-lg py-4 flex-row items-center justify-center gap-2">
              <MaterialIcons name="add" size={20} color="#FFFFFF" />
              <AppText className="text-white">Add funds</AppText>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-buttonPrimary rounded-lg py-4 flex-row items-center justify-center gap-2">
              <MaterialIcons name="refresh" size={20} color="white" />
              <AppText className="text-white">Fund Us</AppText>
            </TouchableOpacity>
          </View>

          {/* Cash and Margin Info */}
          <View className="flex-row mt-6">
            <View className="flex-1 items-center">
              <AppText className="text-textMuted">Available cash</AppText>
              <AppText className="text-textMuted">
                {FormatNumber(Number(profile?.availableFunds))}
              </AppText>
            </View>
            <View className="flex-1 items-center">
              <AppText className="text-textMuted">Used margin</AppText>
              <AppText className="text-textMuted">••••</AppText>
            </View>
          </View>
        </View>

        {/* Financial Details List */}
        <View className="bg-white py-4 overflow-hidden">
          <View className="flex-row items-center justify-between p-4 border-b border-border">
            <AppText className="text-textSecondary">Opening balance</AppText>
            <AppText className="text-textMuted">...</AppText>
          </View>

          <View className="flex-row items-center justify-between p-4 border-b border-border">
            <AppText className="text-textSecondary">Payin</AppText>
            <AppText className="text-textMuted">••••</AppText>
          </View>

          <View className="flex-row items-center justify-between p-4 border-b border-border">
            <AppText className="text-textSecondary">Payout</AppText>
            <AppText className="text-textMuted">••••</AppText>
          </View>

          <View className="flex-row items-center justify-between p-4 border-b border-border">
            <AppText className="text-textSecondary">SPAN</AppText>
            <AppText className="text-textMuted">••••</AppText>
          </View>

          <View className="flex-row items-center justify-between p-4 border-b border-border">
            <AppText className="text-textSecondary">Delivery margin</AppText>
            <AppText className="text-textMuted">••••</AppText>
          </View>

          <View className="flex-row items-center justify-between p-4 border-b border-border">
            <AppText className="text-textSecondary">Exposure</AppText>
            <AppText className="text-textMuted">••••</AppText>
          </View>

          <View className="flex-row items-center justify-between p-4">
            <AppText className="text-textSecondary">Option premium</AppText>
            <AppText className="text-textMuted">••••</AppText>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
