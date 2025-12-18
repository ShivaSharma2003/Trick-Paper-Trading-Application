import AppText from "@/components/Common/AppText";
import { useAppSelector } from "@/redux/hook";
import { router, Slot } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profilelayout = () => {
  const { loggedIn } = useAppSelector((state) => state.auth);
  if (!loggedIn)
    return (
      <View className="flex-1 bg-background flex-col items-center justify-center">
        <View className="gap-4 flex-col">
          <View className="flex-col items-center justify-center gap-2">
            <AppText
              className="text-textPrimary"
              textSize={30}
              style={{ fontFamily: "interBold" }}
            >
              Create Account
            </AppText>
            <AppText
              className="text-textMuted"
              textSize={14}
              style={{ fontFamily: "interSemiBold" }}
            >
              To start trading a Trading Account is Required
            </AppText>
          </View>
          <TouchableOpacity
            className="flex-row items-center justify-center bg-buttonPrimary py-4 rounded"
            onPress={() => router.push("/auth")}
          >
            <AppText
              className="text-white"
              textSize={16}
              style={{ fontFamily: "interBold" }}
            >
              Create Account
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    );
  return (
    <SafeAreaView className="flex-1 bg-background px-4">
      <Slot />
    </SafeAreaView>
  );
};

export default Profilelayout;
