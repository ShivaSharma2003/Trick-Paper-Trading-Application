import { Pressable, TouchableOpacity, View } from "react-native";
import AppModal from "../Common/AppModal";
import AppText from "../Common/AppText";
import AppTickPrice from "../Common/AppTickPrice";
import AppTickChange from "../Common/AppTickChange";
import AppTickChangePercent from "../Common/AppTickChangePercent";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { OrderResponse } from "@/types/OrderTypes";
import { FC } from "react";
import { useAppDispatch } from "@/redux/hook";
import { cancelOrder } from "@/redux/slices/OrderSlice";

interface OrderModalProps {
  onClose: () => void;
  order: OrderResponse | null;
}

const OrderModel: FC<OrderModalProps> = ({ onClose, order }) => {
  const dispatch = useAppDispatch();

  return (
    <AppModal onPress={onClose}>
      <Pressable className="flex-col gap-6 rounded-t-3xl bg-background pb-12 px-8 py-4">
        {/* 1 row */}
        <View className="flex-col gap-2">
          <AppText textSize={18} className="text-textPrimary">
            {order?.symbol}
          </AppText>
          <View className="flex-row gap-2">
            <AppText className="text-textSecondary">
              {order?.exchangeSegment}
            </AppText>
            <AppTickPrice item={order} />
            <AppTickChange item={order} className="text-textMuted" />
            <AppTickChangePercent item={order} className="text-textMuted" />
          </View>
        </View>

        {/* 2 Row */}
        <View className="flex-row gap-4">
          <TouchableOpacity
            className="flex-1 items-center justify-center flex-row rounded bg-buttonPrimary py-4"
            onPress={() =>
              router.push(
                `/order/${order?.token}/${order?.orderType.toLowerCase()}`
              )
            }
          >
            <AppText
              className="text-white"
              textSize={16}
              style={{ fontFamily: "interSemiBold" }}
            >
              Repeat Order
            </AppText>
          </TouchableOpacity>
          {order?.orderStatus === "PENDING" && (
            <TouchableOpacity
              className="flex-1 items-center justify-center flex-row rounded bg-buttonDanger py-4"
              onPress={() => dispatch(cancelOrder(order._id))}
            >
              <AppText
                className="text-white"
                textSize={16}
                style={{ fontFamily: "interSemiBold" }}
              >
                Cancel
              </AppText>
            </TouchableOpacity>
          )}
        </View>

        {/* 3 row */}
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            className="flex-row gap-2 items-center justify-cemter"
            onPress={() => router.push(`/chart/${order?.token}`)}
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

export default OrderModel;
