import { Pressable, TextInput, TouchableOpacity, View } from "react-native";
import AppText from "@/components/Common/AppText";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { generateUserId } from "@/utils/Generator";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { registerAccount } from "@/redux/slices/AuthSlice";
import { router } from "expo-router";

const AuthScreen = () => {
  const [userId, setUserId] = useState(generateUserId());
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector((state) => state.auth);

  const handleRegisterAccount = () => {
    dispatch(registerAccount({ userId, password }));
  };

  useEffect(() => {
    if (loggedIn) router.replace("/(tabs)/profile");
  }, [loggedIn]);

  return (
    <View className="px-4 felx-col gap-8">
      <View className="flex-col gap-4">
        <View className="flex items-center justify-center">
          <MaterialIcons name="account-circle" size={140} color={"#EBECEE"} />
        </View>
        <View className="flex-row items-center justify-center">
          <Pressable onPress={() => setUserId(() => generateUserId())}>
            <AppText
              className="text-textSecondary"
              textSize={30}
              style={{ fontFamily: "inter" }}
            >
              {userId}
            </AppText>
          </Pressable>
        </View>
        <View className="border-2 border-border py-2 px-4 flex-row items-center justify-between">
          <TextInput
            placeholder="Enter Password"
            placeholderTextColor={"#A3A3B3"}
            className="text-textPrimary flex-1"
            style={{ fontFamily: "inter" }}
            keyboardType="visible-password"
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
          <Feather name="eye-off" size={14} color={"#A3A3B3"} />
        </View>
        <TouchableOpacity
          className="border-2 border-brand py-4 gap-4 flex-row items-center justify-center"
          disabled={password.length < 6}
          onPress={handleRegisterAccount}
        >
          <AppText
            className="text-brand"
            textSize={14}
            style={{ fontFamily: "interSemiBold" }}
          >
            Continue with Password
          </AppText>
        </TouchableOpacity>
      </View>
      <View className="flex-col gap-2">
        <AppText className="text-textMuted" textSize={14}>
          TRICK
        </AppText>
        <AppText className="text-textMuted" textSize={10}>
          TRICK is a trading learning platform. None of trades and transactions
          are directly or indirectly contract with NSE, BSE, MCX, CDS exchange.
          Trick is a Paper Trading Platform.
        </AppText>
      </View>

      <View className="flex-col gap-1">
        <View className="flex-row gap-2 items-center">
          <Feather name="info" size={12} color={"#A3A3B3"} />
          <AppText className="text-textMuted" textSize={12}>
            Rules & Regulations
          </AppText>
        </View>
        <AppText className="text-textMuted" textSize={10}>
          1. Account only can create once per device.
        </AppText>
        <AppText className="text-textMuted" textSize={10}>
          2. Once User ID and Password created can not be reset.
        </AppText>
        <AppText className="text-textMuted" textSize={10}>
          3. Only for Education and Learning Purpose.
        </AppText>
      </View>
    </View>
  );
};

export default AuthScreen;
