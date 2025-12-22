import { OrderResponse } from "@/types/OrderTypes";
import { FC } from "react";
import { View } from "react-native";
import AppText from "../Common/AppText";
import { Feather } from "@expo/vector-icons";
import { FormatNumber, FormatTime } from "@/utils/Formatter";

interface OrderItemContainerProps {
  item: OrderResponse | null;
}

const OrderItemContainer: FC<OrderItemContainerProps> = ({ item }) => {
  const stoplossOrder = item?.transactionType === "ST-L";
  const limitOrder = item?.transactionType === "LIMIT";
  const buyOrder = item?.orderType === "BUY";
  return (
    <View className="flex-col gap-2 py-4 border-b border-border">
      {/*  */}
      <View className="flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-2">
          <View
            className={`px-2 py-1 ${buyOrder ? "bg-brandBg" : "bg-dangerBg"}`}
          >
            <AppText className={`${buyOrder ? "text-brand" : "text-danger"}`}>
              {item?.orderType}
            </AppText>
          </View>
          <AppText className="text-textSecondary">
            {item?.quantity}/{item?.quantity}
          </AppText>
        </View>
        <View className="flex flex-row gap-2 items-center">
          <View className="flex-row items-center gap-2">
            <Feather name="clock" size={14} color={"#A3A3B3"} />
            <AppText className="text-textMuted">
              {FormatTime(item?.createdAt)}
            </AppText>
          </View>
          <View className="px-2 py-2 bg-sucessBg">
            <AppText className="text-sucess">{item?.orderStatus}</AppText>
          </View>
        </View>
      </View>

      {/*  */}
      <View className="flex-row items-center justify-between">
        <AppText className="text-textPrimary" textSize={14}>
          {item?.symbol}
        </AppText>
        <View className="flex-row itesm-center gap-1">
          {stoplossOrder ? (
            <>
              <AppText className="text-textMuted" textSize={14}>
                Trigger
              </AppText>
              <AppText className="text-textPrimary" textSize={14}>
                {FormatNumber(item?.triggerPrice)}
              </AppText>
            </>
          ) : limitOrder ? (
            <>
              <AppText className="text-textMuted" textSize={14}>
                Limit
              </AppText>
              <AppText className="text-textPrimary" textSize={14}>
                {FormatNumber(item?.limit)}
              </AppText>
            </>
          ) : (
            <>
              <AppText className="text-textMuted" textSize={14}>
                Avg.
              </AppText>
              <AppText className="text-textPrimary" textSize={14}>
                {FormatNumber(item?.price)}
              </AppText>
            </>
          )}
        </View>
      </View>

      {/*  */}
      <View className="flex-row items-center justify-between">
        <AppText className="text-textMuted" textSize={12}>
          {item?.exchangeSegment}
        </AppText>
        <View className="flex-row itesm-center gap-2">
          <AppText className="text-textMuted" textSize={12}>
            {item?.tradeType}
          </AppText>
          <AppText className="text-textMuted" textSize={12}>
            {item?.transactionType}
          </AppText>
        </View>
      </View>
    </View>
  );
};

export default OrderItemContainer;
