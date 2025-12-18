import { View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import AppText from "@/components/Common/AppText";
import { router } from "expo-router";
import { FormatNumber } from "@/utils/Formatter";
import { useAppSelector } from "@/redux/hook";

export default function ProfileScreen() {
  const { profile } = useAppSelector((state) => state.auth);
  return (
    <View className="">
      {/* Profile card */}
      <View className="rounded-xl p-4 border border-border mb-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-col gap-2">
            <AppText className="text-textPrimary" textSize={18}>
              {profile?.userId}
            </AppText>
            <AppText className="text-sucess" textSize={20}>
              {FormatNumber(Number(profile?.availableFunds))}
            </AppText>
          </View>
          <MaterialIcons name="account-circle" size={100} color={"#A3A3B3"} />
        </View>
      </View>

      {/* Funds */}
      <View className="">
        <TouchableOpacity
          className="flex-row items-center justify-between px-4 py-4 border-b border-border"
          onPress={() => router.push("/funds")}
        >
          <View className="flex-row items-center gap-4">
            <MaterialIcons
              name="account-balance-wallet"
              size={20}
              color="#6B7280"
            />
            <AppText>Funds</AppText>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="#9CA3AF"
          />
        </TouchableOpacity>

        {/* User Profile */}
        <TouchableOpacity
          className="flex-row items-center justify-between px-4 py-4 border-b border-border"
          onPress={() => router.push("/user")}
        >
          <View className="flex-row items-center gap-4">
            <MaterialIcons name="manage-accounts" size={20} color="#6B7280" />
            <AppText>User Profile</AppText>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="#9CA3AF"
          />
        </TouchableOpacity>

        {/* Privacy and Information */}
        <TouchableOpacity className="flex-row items-center justify-between px-4 py-4 border-b border-border">
          <View className="flex-row items-center gap-4">
            <MaterialIcons name="shield" size={20} color="#6B7280" />
            <AppText>Privacy and Information</AppText>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="#9CA3AF"
          />
        </TouchableOpacity>

        {/* Contact Support */}
        <TouchableOpacity className="flex-row items-center justify-between px-4 py-4 border-b border-border">
          <View className="flex-row items-center gap-4">
            <MaterialIcons name="support-agent" size={20} color="#6B7280" />
            <AppText>Contact Support</AppText>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="#9CA3AF"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
