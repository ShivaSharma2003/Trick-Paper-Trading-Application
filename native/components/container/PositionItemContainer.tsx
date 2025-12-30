import { PositionResponse } from "@/types/PositionType";
import { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import AppText from "../Common/AppText";
import AppTickPrice from "../Common/AppTickPrice";
import { FormatNumber } from "@/utils/Formatter";
import PositionChange from "../Common/PositionChange";

interface PositionItemContainerProps {
  onSelect: () => void;
  item: PositionResponse;
}
const PositionItemContainer: FC<PositionItemContainerProps> = ({
  item,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      className="flex-col gap-2 py-2 border-b border-border"
      onPress={onSelect}
    >
      {/*  */}
      <View className="flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-2">
          <View className="flex-row gap-1 ">
            <AppText className="text-textMuted">Qty.</AppText>
            <AppText className="text-brand">{item.quantity}</AppText>
          </View>
          <View className="flex-row gap-1">
            <AppText className="text-textMuted">Avg.</AppText>
            <AppText className="text-textSecondary">
              {FormatNumber(item.average)}
            </AppText>
          </View>
        </View>
        <View className="flex flex-row gap-2 items-center">
          <View className="px-2 py-1 bg-backgroundSecondary">
            <AppText className="text-textSecondary">{item.status}</AppText>
          </View>
          <View className="px-2 py-1 bg-backgroundSecondary">
            <AppText className="text-textSecondary">{item.tradeType}</AppText>
          </View>
        </View>
      </View>

      {/*  */}
      <View className="flex-row items-center justify-between">
        <AppText className="text-textPrimary" textSize={16}>
          {item.symbol}
        </AppText>
        <PositionChange position={item} textSize={16} />
      </View>

      {/*  */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row gap-2 items-center">
          <AppText className="text-textMuted" textSize={12}>
            {item.exchangeSegment}
          </AppText>
          <AppText className="text-textMuted" textSize={12}>
            {item.type}
          </AppText>
        </View>
        <View className="flex-row itesm-center gap-2">
          <AppText className="text-textSecondary" textSize={12}>
            LTP
          </AppText>
          <AppTickPrice item={item} className="text-textSecondary" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PositionItemContainer;
