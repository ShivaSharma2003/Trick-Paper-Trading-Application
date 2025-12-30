import { Pressable, TouchableOpacity, View } from "react-native";
import AppModal from "../Common/AppModal";
import AppText from "../Common/AppText";
import AppTickPrice from "../Common/AppTickPrice";
import AppTickChange from "../Common/AppTickChange";
import AppTickChangePercent from "../Common/AppTickChangePercent";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { PositionResponse } from "@/types/PositionType";
import { FC } from "react";

interface PositionModelProps {
  onClose: () => void;
  position: PositionResponse | null;
}

const PositionModel: FC<PositionModelProps> = ({ onClose, position }) => {
  return (
    <AppModal onPress={onClose}>
      <Pressable className="flex-col gap-6 rounded-t-3xl bg-background pb-12 px-8 py-4">
        {/* 1 row */}
        <View className="flex-col gap-2">
          <AppText textSize={18} className="text-textPrimary">
            {position?.symbol}
          </AppText>
          <View className="flex-row gap-2">
            <AppText className="text-textSecondary">
              {position?.exchangeSegment}
            </AppText>
            <AppTickPrice item={position} />
            <AppTickChange item={position} className="text-textMuted" />
            <AppTickChangePercent item={position} className="text-textMuted" />
          </View>
        </View>

        {/* 2 Row */}
        <View className="flex-row gap-4">
          <TouchableOpacity
            className="flex-1 items-center justify-center flex-row rounded bg-buttonPrimary py-4"
            onPress={() => {
              // eslint-disable-next-line no-unused-expressions
              position?.type === "BUY"
                ? router.push(`/order/${position?.token}/buy`)
                : router.push(`/order/${position?.token}/sell`);
            }}
          >
            <AppText
              className="text-white"
              textSize={16}
              style={{ fontFamily: "interSemiBold" }}
            >
              ADD
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 items-center justify-center flex-row rounded bg-buttonDanger py-4"
            onPress={() => {
              // eslint-disable-next-line no-unused-expressions
              position?.type === "BUY"
                ? router.push(`/order/${position?.token}/sell`)
                : router.push(`/order/${position?.token}/buy`);
            }}
          >
            <AppText
              className="text-white"
              textSize={16}
              style={{ fontFamily: "interSemiBold" }}
            >
              EXIT
            </AppText>
          </TouchableOpacity>
        </View>

        {/* 3 row */}
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            className="flex-row gap-2 items-center justify-cemter"
            onPress={() => router.push(`/chart/${position?.token}`)}
          >
            <Feather name="bar-chart" color={"#538BE3"} size={14} />
            <AppText className="text-brand" textSize={14}>
              View Chart
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row gap-2 items-center justify-cemter">
            <Feather name="lock" color={"#538BE3"} size={14} />
            <AppText className="text-brand" textSize={14}>
              Option Chain
            </AppText>
          </TouchableOpacity>
        </View>
      </Pressable>
    </AppModal>
  );
};

export default PositionModel;
