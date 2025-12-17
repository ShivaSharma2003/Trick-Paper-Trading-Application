import AppModal from "@/components/Common/AppModal";
import AppText from "@/components/Common/AppText";
import { InstrumentResponse } from "@/types/InstrumentTypes";
import { Feather } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import AppTickChange from "../Common/AppTickChange";
import AppTickChangePercent from "../Common/AppTickChangePercent";
import AppTickPrice from "../Common/AppTickPrice";
import { router } from "expo-router";
import useSocketTick from "@/hooks/useSocketTicks";
import socket from "@/config/socket.config";

interface InstrumentModalProps {
  instrument: InstrumentResponse | null;
  onClose: () => void;
}

export default function InstrumentModal({
  instrument,
  onClose,
}: InstrumentModalProps) {
  const { tick } = useSocketTick();

  useEffect(() => {
    socket.emit("subscribe", {
      token: instrument?.token,
      exchangeType: instrument?.exchangeSegment,
    });
  } , [instrument?.exchangeSegment, instrument?.token]);
  
  return (
    <AppModal onPress={onClose}>
      <Pressable className="flex-col gap-6 rounded-t-3xl bg-background pb-12 px-8 py-4">
        {/* 1 row */}
        <View className="flex-col gap-2">
          <AppText textSize={18} className="text-textPrimary">
            {instrument?.symbol}
          </AppText>
          <View className="flex-row gap-2">
            <AppText className="text-textSecondary">
              {instrument?.exchangeSegment}
            </AppText>
            <AppTickPrice item={instrument} tick={tick} />
            <AppTickChange item={instrument} tick={tick} className="text-textMuted" />
            <AppTickChangePercent item={instrument} tick={tick} className="text-textMuted" />
          </View>
        </View>

        {/* 2 Row */}
        <View className="flex-row gap-4">
          <TouchableOpacity
            className="flex-1 items-center justify-center flex-row rounded bg-buttonPrimary py-4"
            onPress={() => router.push(`/order/${instrument?.token}/buy`)}
          >
            <AppText
              className="text-white"
              textSize={16}
              style={{ fontFamily: "interSemiBold" }}
            >
              BUY
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 items-center justify-center flex-row rounded bg-buttonDanger py-4"
            onPress={() => router.push(`/order/${instrument?.token}/sell`)}
          >
            <AppText
              className="text-white"
              textSize={16}
              style={{ fontFamily: "interSemiBold" }}
            >
              SELL
            </AppText>
          </TouchableOpacity>
        </View>

        {/* 3 row */}
        <View className="flex-row items-center justify-between">
          <TouchableOpacity className="flex-row gap-2 items-center justify-cemter">
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
}
