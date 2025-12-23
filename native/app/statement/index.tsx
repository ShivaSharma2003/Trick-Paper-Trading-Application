import AppText from "@/components/Common/AppText";
import StatementContainer from "@/components/Container/StatementContainer";
import { useAppSelector } from "@/redux/hook";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { FlatList, Image, View } from "react-native";

const StatementScreen = () => {
  const { positionbook } = useAppSelector((state) => state.position);
  return (
    <View className="flex-col justify-between flex-1 py-2 gap-4">
      <View className="flex-row items-center justify-between px-4 py-1">
        <AntDesign
          name="close"
          size={18}
          color={"#434250"}
          onPress={() => router.back()}
        />
        <AppText
          style={{ fontFamily: "interSemiBold" }}
          textSize={16}
          className="text-textPrimary"
        >
          View Report
        </AppText>
        <View />
      </View>
      <View className="bg-background flex-1 flex-col">
        {positionbook?.length === 0 ? (
          <View className="flex-1 flex items-center justify-center gap-2">
            <Image
              source={require("@/assets/images/nodata.png")}
              className="h-32 w-32"
            />
            <AppText className="text-textMuted" textSize={16}>
              Statement is empty!!!
            </AppText>
          </View>
        ) : (
          <View className="flex-1">
            <FlatList
              data={positionbook}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => {
                return <StatementContainer item={item} />;
              }}
            />
          </View>
        )}
        <View className="flex-row justify-center items-center py-6 border-t border border-border gap-2">
          <AppText
            className="text-textMuted"
            style={{ fontFamily: "interBold" }}
            textSize={12}
          >
            Trick
          </AppText>
          <AppText className="text-textMuted" textSize={10}>
            Paper Trading App. All right reserved
          </AppText>
        </View>
      </View>
    </View>
  );
};

export default StatementScreen;
