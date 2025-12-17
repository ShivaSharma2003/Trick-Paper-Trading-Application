import AppText from "@/components/Common/AppText";
import AppTickChange from "@/components/Common/AppTickChange";
import AppTickChangePercent from "@/components/Common/AppTickChangePercent";
import AppTickPrice from "@/components/Common/AppTickPrice";
import useSocketTick from "@/hooks/useSocketTicks";
import { useAppSelector } from "@/redux/hook";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Switch, TextInput, TouchableOpacity, View } from "react-native";

const SellScreen = () => {
  const { instrument } = useAppSelector((state) => state.instrument);
  const [stoploss, setStoploss] = useState<boolean>(false);
  const { tick } = useSocketTick();

  return (
    <View className="flex-1 justify-between flex-col gap-2">
      {/* Header */}
      <View className="flex-col gap-4 px-4">
        <View className="flex-row gap-2 items-center justify-center ">
          <Feather
            name="chevron-left"
            size={22}
            color={"#484854"}
            onPress={() => router.back()}
          />
          <AppText className="text-textPrimary flex-1" textSize={20}>
            {instrument?.symbol}
          </AppText>
          <Feather name="more-vertical" size={22} color={"#484854"} />
        </View>
        <View className="flex-row items-center gap-4 px-8 py-3 bg-white">
          <AppText className="text-textSecondary" textSize={12}>
            {instrument?.exchangeSegment}
          </AppText>
          <AppTickPrice textSize={12} item={instrument} tick={tick} />
          <AppTickChange
            className="text-textMuted"
            textSize={12}
            item={instrument}
            tick={tick}
          />
          <AppTickChangePercent
            className="text-textMuted"
            textSize={12}
            item={instrument}
            tick={tick}
          />
        </View>

        <View className="px-2">
          <AppText
            className="text-danger"
            textSize={14}
            style={{ fontFamily: "interBold" }}
          >
            Regular
          </AppText>
        </View>
      </View>

      {/* Middle */}
      <View className="flex-1 px-4 gap-2">
        <View className="bg-white flex-col gap-4 py-4 rounded-lg">
          <View className="felx-col gap-4 px-4 py-2">
            <View className="flex-row items-center justify-between">
              <AppText
                className="text-textPrimary"
                textSize={14}
                style={{ fontFamily: "interSemiBold" }}
              >
                Lot
              </AppText>
              <AppText className="text-textMuted" textSize={12}>
                100 Qty.
              </AppText>
            </View>
            <View className="px-2 py-2 border border-border flex-row items-center">
              <TextInput
                className="flex-1 text-textPrimary"
                placeholder="Quantity"
                style={{ fontFamily: "interSemiBold" }}
              />
            </View>
          </View>
          <View className="felx-col gap-4 px-4 py-2">
            <AppText
              className="text-textPrimary"
              textSize={14}
              style={{ fontFamily: "interSemiBold" }}
            >
              Market
            </AppText>
            <View className="px-2 py-2 border border-border flex-row items-center">
              <TextInput
                className="flex-1 text-textPrimary"
                placeholder="Quantity"
                style={{ fontFamily: "interSemiBold" }}
              />
              <View className="px-2">
                <MaterialIcons name="swap-horiz" size={26} color="#DF514D" />
              </View>
            </View>
          </View>
          <View className="flex-row items-end justify-end gap-2 px-4">
            <View className="flex-row gap-2 items-center">
              <View className="h-4 w-4 rounded-full border border-border" />
              <AppText
                className="text-textPrimary"
                textSize={16}
                style={{ fontFamily: "inter" }}
              >
                Intraday
              </AppText>
            </View>
            <View className="flex-row gap-2 items-center ">
              <View className="h-4 w-4 rounded-full border border-danger bg-danger" />
              <AppText
                className="text-textPrimary"
                textSize={16}
                style={{ fontFamily: "inter" }}
              >
                Overnight
              </AppText>
            </View>
          </View>
        </View>
        <View className="bg-background flex-col gap-2 px-4 py-4 rounded-lg">
          <View className="flex-row items-center justify-between">
            <AppText
              className="text-textSecondary"
              textSize={14}
              style={{ fontFamily: "interBold" }}
            >
              Stoploss
            </AppText>
            <Switch
              value={stoploss}
              onValueChange={() => setStoploss(!stoploss)}
              thumbColor={stoploss ? "#DF514D" : "#EBECED"}
            />
          </View>
          {stoploss && (
            <View className="felx-col gap-4 py-2">
              <AppText
                className="text-textPrimary"
                textSize={14}
                style={{ fontFamily: "interSemiBold" }}
              >
                Limit
              </AppText>
              <View className="px-2 py-2 border border-border flex-row items-center">
                <TextInput
                  className="flex-1 text-textPrimary"
                  placeholder="Quantity"
                  style={{ fontFamily: "interSemiBold" }}
                />
              </View>
            </View>
          )}
        </View>
      </View>

      {/* Bottom */}
      <View className="flex-col bg-white py-4 gap-4 px-6">
        <View className="flex flex-row items-center justify-between">
          <View className="flex-row items-center gap-6">
            <View className="flex-row gap-2">
              <AppText className="text-textSecondary">Margin</AppText>
              <AppText className="text-danger">1,29,000</AppText>
              <AppText className="text-textSecondary">+</AppText>
              <AppText className="text-danger">43.59</AppText>
            </View>
            <View className="flex-row gap-1">
              <AppText className="text-textSecondary">Avail.</AppText>
              <AppText className="text-danger">83.90</AppText>
            </View>
          </View>
          <Feather name="refresh-cw" size={14} color={"#DF514D"} />
        </View>
        <View className="px-10 bg-background">
          <TouchableOpacity className="bg-buttonDanger items-center py-6 rounded-full">
            <AppText
              className="text-white"
              textSize={20}
              style={{ fontFamily: "interSemiBold" }}
            >
              Click To Sell
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SellScreen;
