import AppText from "@/components/Common/AppText";
import OrderItemContainer from "@/components/Container/OrderItemContainer";
import { useAppSelector } from "@/redux/hook";
import { OrderResponse } from "@/types/OrderTypes";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, View } from "react-native";

export default function OrderScreen() {
  const Tabs = ["Open", "Executed"];
  const [activeTab, setActivetab] = useState<string>("Executed");
  const { orders } = useAppSelector((state) => state.order);
  const [activeOrders, setActiveOrder] = useState<
    OrderResponse[] | null | undefined
  >(null);

  useEffect(() => {
    const items = orders?.filter((item) =>
      activeTab === "Executed"
        ? item.orderStatus !== "PENDING"
        : item.orderStatus === "PENDING"
    );
    setActiveOrder(items);
  }, [activeTab, orders]);

  return (
    <View className="flex-1 py-4">
      {/*  */}
      <View className="flex-row gap-6 px-4">
        {Tabs.map((item, index) => {
          const active = activeTab === item;
          return (
            <Pressable
              key={index}
              onPress={() => {
                setActivetab(activeTab === "Open" ? "Executed" : "Open");
              }}
            >
              <AppText
                className={`${active ? "text-brand" : "text-textMuted"}`}
                textSize={14}
                style={{ fontFamily: "interSemiBold" }}
              >
                {item}
              </AppText>
              {active && (
                <View className="w-10 h-1 mt-2 bg-brand border border-brand" />
              )}
            </Pressable>
          );
        })}
      </View>

      <View className=" bg-background flex-1">
        {/*  */}
        <View className="flex-row justify-between items-center border-b border-border py-4 px-6">
          <Feather name="search" size={18} color={"#538BE3"} />
          <Pressable onPress={() => router.push("/tradebook")}>
            <AppText
              className="text-brand"
              textSize={14}
              style={{ fontFamily: "inter" }}
            >
              Tradebook
            </AppText>
          </Pressable>
        </View>

        {/*  */}
        <FlatList
          data={activeOrders}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="px-6"
          renderItem={({ item }) => {
            return <OrderItemContainer item={item ?? []} />;
          }}
        />
      </View>
    </View>
  );
}
