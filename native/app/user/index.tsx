import AppText from "@/components/Common/AppText";
import { useAppSelector } from "@/redux/hook";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

export default function UserScreen() {
  const { profile } = useAppSelector((state) => state.auth);
  return (
    <>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 bg-white">
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <AppText className="text-textPrimary" textSize={16}>
          Profile
        </AppText>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1">
        {/* Profile Card */}
        <View className="bg-white mt-4 rounded-lg p-6">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 flex-col gap-2">
              <AppText className="text-textMuted" textSize={16}>
                {profile?.userName ?? "Update Username"}
              </AppText>
              <AppText className="text-textPrimary" textSize={14}>
                {profile?.userId}
              </AppText>
            </View>
            <View className="relative">
              <View className="w-16 h-16 rounded-full bg-blue-100 items-center justify-center">
                <AppText className="text-brand">
                  {profile?.userName ?? "-"}
                </AppText>
              </View>
              <TouchableOpacity className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full items-center justify-center">
                <MaterialIcons name="edit" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Profile Details */}
        <View className="bg-white mx-4 mt-4 rounded-lg overflow-hidden">
          {/* Password & Security */}
          <View className="flex-row items-center justify-between p-4 border-b border-border">
            <AppText className="text-textSecondary">
              Password & Security
            </AppText>
            <TouchableOpacity>
              <AppText className="text-brand">Manage</AppText>
            </TouchableOpacity>
          </View>

          {/* Support Code */}
          <View className="flex-row items-center justify-between p-4 border-b border-border">
            <AppText className="text-textSecondary">Support code</AppText>
            <TouchableOpacity className="flex-row items-center">
              <View className="w-5 h-5 rounded-full bg-brand items-center justify-center mr-2">
                <MaterialIcons name="visibility" size={12} color="white" />
              </View>
              <AppText className="text-brand">View</AppText>
            </TouchableOpacity>
          </View>

          {/* Email */}
          <View className="flex-row items-center justify-between p-4 border-b border-border">
            <AppText className="text-textSecondary">E-mail</AppText>
            <AppText className="text-textPrimary">
              {profile?.email ?? "-"}
            </AppText>
          </View>

          {/* Phone */}
          <View className="flex-row items-center justify-between p-4 border-b border-border">
            <AppText className="text-textSecondary">Phone</AppText>
            <AppText className="text-textPrimary">
              {profile?.phoneNumber ?? "-"}
            </AppText>
          </View>

          {/* PAN */}
          <View className="flex-row items-center justify-between p-4 border-b border-border">
            <AppText className="text-textSecondary">PAN</AppText>
            <AppText className="text-textPrimary">
              {profile?.pancardNumber ?? "-"}
            </AppText>
          </View>

          {/* PAN */}
          <View className="flex-row items-center justify-between p-4 border-b border-border">
            <AppText className="text-textSecondary">Adhaar Number</AppText>
            <AppText className="text-textPrimary">
              {profile?.adhaarNumber ?? "-"}
            </AppText>
          </View>

          {/* Manage Account */}
          <View className="p-4">
            <TouchableOpacity>
              <AppText className="text-blue-500 font-medium">
                Manage account
              </AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bank Accounts */}
        <View className="bg-white mx-4 mt-4 rounded-lg overflow-hidden">
          <View className="p-4 border-b border-border">
            <AppText className="text-gray-800 font-medium mb-4">
              Bank accounts
            </AppText>
            <View className="flex-row items-center justify-between">
              <AppText className="text-gray-600">-</AppText>
              <AppText className="text-black font-medium">-</AppText>
            </View>
          </View>
        </View>

        {/* Additional Info */}
        <View className="bg-white mx-4 mt-4 rounded-lg overflow-hidden">
          {/* Segments */}
          <View className="flex-row items-center justify-between p-4 border-b border-border">
            <AppText className="text-gray-600">Segments</AppText>
            <AppText className="text-blue-500 font-medium">
              NSE NFO MCX BFO
            </AppText>
          </View>

          {/* Account Closure */}
          <View className="p-4">
            <AppText className="text-loss">Account Closure</AppText>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
