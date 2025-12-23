import React from "react";
import { FlatList, Image, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import AppText from "@/components/Common/AppText";
import { useAppSelector } from "@/redux/hook";
import TradebookContainer from "@/components/Container/TradebookContainer";

export default function TradeBookScreen() {
  const { orderBook } = useAppSelector((state) => state.order);
  return (
    <>
      {/* Header */}
      <View className="flex flex-row items-center justify-between px-4 py-4">
        <AntDesign
          name="close"
          size={18}
          color={"#333333"}
          onPress={() => router.back()}
        />
        <AppText
          className="text-textPrimary"
          style={{ fontFamily: "interBold" }}
          textSize={18}
        >
          Tradebook
        </AppText>
        <View />
      </View>

      {/* Main Screen */}
      <View className="flex-1 flex-col bg-background px-4 py-4">
        <View className="flex flex-row items-center justify-between border-b border-border py-6">
          <View className="flex-row gap-2 items-center">
            <AntDesign name="clock-circle" size={14} color={"#9B9B9B"} />
            <View className="flex-row gap-2 items-center">
              <AppText className="text-textMuted" textSize={14}>
                Last Updated:
              </AppText>
              <AppText className="text-textMuted" textSize={14}>
                2025-12-11
              </AppText>
            </View>
          </View>
          <View className="flex flex-row gap-2 items-center">
            <AntDesign name="cloud-download" size={16} color={"#538BE3"} />
            <AppText
              className="text-brand"
              textSize={14}
              style={{ fontFamily: "inter" }}
            >
              CSV
            </AppText>
          </View>
        </View>
        {orderBook?.length === 0 ? (
          <View className="flex-1 flex items-center justify-center gap-2">
            <Image
              source={require("@/assets/images/nodata.png")}
              className="h-32 w-32"
            />
            <AppText className="text-textMuted" textSize={16}>
              Tradebook is empty!!!
            </AppText>
          </View>
        ) : (
          <>
            {/* Orders Lists */}
            <FlatList
              data={orderBook}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => {
                return <TradebookContainer item={item} />;
              }}
            />
          </>
        )}
      </View>
    </>
  );
}
