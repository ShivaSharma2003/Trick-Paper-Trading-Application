import { View } from "react-native";
import AppText from "@/components/Common/AppText";
import { OrderResponse } from "@/types/OrderTypes";
import { FormatDate, FormatNumber, FormatTime } from "@/utils/Formatter";

interface TradebookContainerProps {
  item: OrderResponse | null;
}

const TradebookContainer = ({ item }: TradebookContainerProps) => {
  return (
    <View className="flex-col border-b border-border py-4 gap-2">
      <View className="flex-row items-center justify-between">
        <AppText className="text-textPrimary" textSize={14}>
          {item?.symbol}
        </AppText>
        <AppText className="text-textSecondary" textSize={14}>
          Avg. {FormatNumber(item?.price)}
        </AppText>
      </View>
      <View className="flex-row items-center justify-between">
        <AppText className="text-textMuted" textSize={14}>
          {new Date(item?.createdAt ?? "").getTime()}
        </AppText>
        <View className="flex flex-row gap-2 items-center">
          <AppText className="text-textMuted" textSize={14}>
            Qty.
          </AppText>
          <AppText className="text-textSecondary" textSize={14}>
            {item?.quantity}
          </AppText>
        </View>
      </View>
      <View className="flex flex-row items-center justify-between">
        <View className="flex-row gap-2 items-center">
          <AppText className="text-textMuted" textSize={14}>
            {FormatDate(item?.createdAt)}
          </AppText>
          <AppText className="text-textMuted" textSize={14}>
            {FormatTime(item?.createdAt)}
          </AppText>
        </View>
        <View className="flex-row items-center gap-4">
          <View className="py-1 px-2 bg-backgroundSecondary">
            <AppText className="text-textMuted" textSize={14}>
              {item?.orderStatus}
            </AppText>
          </View>
          <View
            className={`px-4 py-1 ${item?.orderType === "BUY" ? "bg-brandBg" : "bg-dangerBg"}`}
          >
            <AppText
              className={`${item?.orderType === "BUY" ? "text-brand" : "text-danger"}`}
              textSize={12}
            >
              {item?.orderType}
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
};
export default TradebookContainer;
