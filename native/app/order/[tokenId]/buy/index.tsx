import AppText from "@/components/Common/AppText";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import {
  TextInput,
  View,
  Switch,
  TouchableOpacity,
  Pressable,
} from "react-native";
import AppTickPrice from "@/components/Common/AppTickPrice";
import AppTickChange from "@/components/Common/AppTickChange";
import AppTickChangePercent from "@/components/Common/AppTickChangePercent";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import useCalculation from "@/hooks/useCalculation";
import { FormatNumber } from "@/utils/Formatter";
import { tradeType, transactionType } from "@/types/OrderTypes";
import { createOrder } from "@/redux/slices/OrderSlice";
import { options } from "@/types/InstrumentTypes";

const BuyScreen = () => {
  const dispatch = useAppDispatch();
  const { tokenId } = useLocalSearchParams();
  const { instrument } = useAppSelector((state) => state.instrument);
  const { profile } = useAppSelector((state) => state.auth);
  const [stoploss, setStoploss] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(0);
  const [triggerPrice, setTriggerPrice] = useState<number>(0);
  const [lotQuantity, setLotQuantity] = useState<number>(1);
  const [transactionType, setTransactionType] =
    useState<transactionType>("MARKET");
  const [tradeType, setTradeType] = useState<tradeType>("MIS");
  const { margin, brokerage, totalAmount } = useCalculation({
    instrument,
    lotQuantity,
    profile,
  });

  const handleBuyOrder = () => {
    dispatch(
      createOrder({
        limit,
        lotQuantity,
        orderType: "BUY",
        token: String(tokenId),
        tradeType,
        transactionType: stoploss ? "ST-L" : transactionType,
        triggerPrice,
      })
    );

    router.push("/");
  };

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
          <AppTickPrice textSize={12} item={instrument} />
          <AppTickChange
            className="text-textMuted"
            textSize={12}
            item={instrument}
          />
          <AppTickChangePercent
            className="text-textMuted"
            textSize={12}
            item={instrument}
          />
        </View>

        <View className="px-2">
          <AppText
            className="text-brand"
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
                {lotQuantity * (instrument?.lotSize ?? 0)}
              </AppText>
            </View>
            <View className="px-2 py-2 border border-border flex-row items-center">
              <TextInput
                className="flex-1 text-textPrimary"
                placeholder="Quantity"
                placeholderTextColor={"#A3A3B3"}
                style={{ fontFamily: "interSemiBold" }}
                keyboardType="number-pad"
                onChangeText={(value) => {
                  const qty = Number(value);
                  const type = instrument?.instrumentType ?? "";

                  if (options.has(type)) {
                    // OPTIONS: minimum 1 lot
                    setLotQuantity(qty >= 1 ? qty : 1);
                  } else {
                    // NON-OPTIONS: allow any value
                    setLotQuantity(qty);
                  }
                }}
              />
            </View>
          </View>
          <View className="felx-col gap-4 px-4 py-2">
            <AppText
              className="text-textPrimary"
              textSize={14}
              style={{ fontFamily: "interSemiBold" }}
            >
              {transactionType === "MARKET" ? "Market" : "Limit"}
            </AppText>
            <View className="px-2 py-2 border border-border flex-row items-center">
              <TextInput
                className="flex-1 text-textPrimary"
                placeholder="Market"
                placeholderTextColor={"#A3A3B3"}
                style={{ fontFamily: "interSemiBold" }}
                keyboardType="number-pad"
                editable={transactionType !== "MARKET"}
                onChangeText={(value) =>
                  value.length === 0 ? setLimit(0) : setLimit(Number(value))
                }
              />
              <View className="px-2">
                <MaterialIcons
                  name="swap-horiz"
                  size={26}
                  color="#538BE3"
                  onPress={() =>
                    setTransactionType(
                      transactionType === "MARKET" ? "LIMIT" : "MARKET"
                    )
                  }
                />
              </View>
            </View>
          </View>
          <View className="flex-row items-end justify-end gap-2 px-4">
            <TouchableOpacity
              className="flex-row gap-2 items-center"
              onPress={() => setTradeType("MIS")}
            >
              <View
                className={`h-4 w-4 rounded-full ${tradeType === "MIS" && "bg-brand"} border border-border`}
              />
              <AppText
                className="text-textPrimary"
                textSize={16}
                style={{ fontFamily: "inter" }}
              >
                Intraday
              </AppText>
            </TouchableOpacity>
            <Pressable
              className="flex-row gap-2 items-center"
              onPress={() => setTradeType("CNC")}
            >
              <View
                className={`h-4 w-4 rounded-full ${tradeType === "CNC" && "bg-brand"} border border-border`}
              />
              <AppText
                className="text-textPrimary"
                textSize={16}
                style={{ fontFamily: "inter" }}
              >
                Overnight
              </AppText>
            </Pressable>
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
              thumbColor={stoploss ? "#538BE3" : "#EBECED"}
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
                  placeholder="Limit"
                  placeholderTextColor={"#A3A3B3"}
                  style={{ fontFamily: "interSemiBold" }}
                  keyboardType="number-pad"
                  onChangeText={(value) =>
                    value.length === 0
                      ? setTriggerPrice(0)
                      : setTriggerPrice(Number(value))
                  }
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
              <AppText className="text-brand">{FormatNumber(margin)}</AppText>
              <AppText className="text-textSecondary">+</AppText>
              <AppText className="text-brand">
                {FormatNumber(brokerage)}
              </AppText>
            </View>
            <View className="flex-row gap-1">
              <AppText className="text-textSecondary">Avail.</AppText>
              <AppText className="text-brand">
                {FormatNumber(profile === null ? 0 : profile?.availableFunds)}
              </AppText>
            </View>
          </View>
          <Feather name="refresh-cw" size={14} color={"#538BE3"} />
        </View>
        <View className="px-10 bg-background">
          <TouchableOpacity
            className="bg-buttonPrimary items-center py-6 rounded-full disabled:bg-backgroundSecondary"
            disabled={
              totalAmount > (profile === null ? 0 : profile?.availableFunds) ||
              lotQuantity === 0 ||
              (stoploss && triggerPrice === 0) ||
              (transactionType === "LIMIT" && limit === 0)
            }
            onPress={handleBuyOrder}
          >
            <AppText
              className="text-white"
              textSize={20}
              style={{ fontFamily: "interSemiBold" }}
            >
              Click To Buy
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BuyScreen;
