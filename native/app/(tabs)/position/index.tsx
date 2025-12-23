import AppPositionChange from "@/components/Common/AppPositionChange";
import AppText from "@/components/Common/AppText";
import PositionItemContainer from "@/components/Container/PositionItemContainer";
import PositionModel from "@/components/Models/PositionModel";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchPositions } from "@/redux/slices/PositionSlice";
import { PositionResponse } from "@/types/PositionType";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Modal, Pressable, View } from "react-native";

export default function PositionScreen() {
  const dispatch = useAppDispatch();
  const Tabs = ["Positions"];
  const [activeTab, setActiveTab] = useState("Positions");
  const { positions } = useAppSelector((state) => state.position);
  const [selectedPosition, setSelectedPosition] =
    useState<PositionResponse | null>(null);

  useEffect(() => {
    dispatch(fetchPositions());
  }, [dispatch]);

  return (
    <View className="flex-1 py-4">
      {/*  */}
      <View className="flex-row gap-6 px-4">
        {Tabs.map((item, index) => {
          const active = activeTab === item;
          return (
            <Pressable key={index} onPress={() => setActiveTab(item)}>
              <View>
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
              </View>
            </Pressable>
          );
        })}
      </View>

      <View className=" bg-background flex-1">
        {/*  */}
        <View className="px-8 py-6">
          <View className="border border-border h-24 rounded-lg flex items-center justify-center">
            <View className="flex-col items-center justify-center gap-2">
              <AppText className="text-textMuted" textSize={14}>
                Total P&L
              </AppText>
              <AppPositionChange textSize={18} />
            </View>
          </View>
        </View>

        <View className=" bg-background flex-1">
          {/*  */}
          <View className="flex-row justify-between items-center border-b border-border py-4 px-6">
            <Feather name="search" size={18} color={"#538BE3"} />
            <Pressable onPress={() => router.push("/statement")}>
              <AppText className="text-brand" textSize={14}>
                Statement
              </AppText>
            </Pressable>
          </View>

          {positions?.length === 0 ? (
            <View className="flex-1 flex items-center justify-center gap-2">
              <Image
                source={require("@/assets/images/nodata.png")}
                className="h-32 w-32"
              />
              <AppText className="text-textMuted" textSize={16}>
                Positions are empty!!!
              </AppText>
            </View>
          ) : (
            <FlatList
              data={positions}
              showsVerticalScrollIndicator={false}
              contentContainerClassName="px-6"
              renderItem={({ item }) => {
                return (
                  <PositionItemContainer
                    item={item}
                    onSelect={() => setSelectedPosition(item)}
                  />
                );
              }}
            />
          )}
        </View>
      </View>

      <Modal
        transparent
        visible={!!selectedPosition}
        animationType="slide"
        onRequestClose={() => setSelectedPosition(null)}
      >
        <PositionModel
          onClose={() => setSelectedPosition(null)}
          position={selectedPosition}
        />
      </Modal>
    </View>
  );
}
