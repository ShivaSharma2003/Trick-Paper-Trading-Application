import { TouchableOpacity, View } from "react-native";
import AppText from "../Common/AppText";
import { FC } from "react";
import { InstrumentResponse } from "@/types/InstrumentTypes";
import AppTickChange from "../Common/AppTickChange";
import AppTickChangePercent from "../Common/AppTickChangePercent";
import AppTickPrice from "../Common/AppTickPrice";

interface WatchlistItemContainerProps {
  item: InstrumentResponse;
  onSelect: () => void;
}

const WatchlistItemContainer: FC<WatchlistItemContainerProps> = ({
  item,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      className="flex-col border-b border-border py-4 gap-2"
      onPress={onSelect}
    >
      <View className="flex-row justify-between items-center">
        <AppText className="text-textSecondary" textSize={14}>
          {item.symbol}
        </AppText>
        <AppTickPrice item={item} textSize={14} />
      </View>
      <View className="flex-row item-center justify-between">
        <AppText className="text-textSecondary" textSize={13}>
          {item.exchangeSegment}
        </AppText>
        <View className="flex-row gap-2 items-center">
          <AppTickChange item={item} className="text-textSecondary" textSize={13} />
          <AppTickChangePercent
            item={item}
            className="text-textSecondary"
            textSize={13}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WatchlistItemContainer;
