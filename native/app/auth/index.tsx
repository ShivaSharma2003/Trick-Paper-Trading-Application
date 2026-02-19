import { TextInput, TouchableOpacity, View } from "react-native";
import AppText from "@/components/Common/AppText";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { loginAccount } from "@/redux/slices/AuthSlice";

const AuthScreen = () => {
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleRegisterAccount = () => {
    dispatch(loginAccount({ userId, password }));
  };

  return (
    <View className="px-4 felx-col gap-8">
      <View className="flex-col gap-4">
        <View className="flex items-center justify-center">
          <MaterialIcons name="account-circle" size={140} color={"#EBECEE"} />
        </View>
        <View className="border-2 border-border py-2 px-4 flex-row items-center justify-between focus:border-buttonPrimary">
          <TextInput
            placeholder="Enter UserID"
            placeholderTextColor={"#A3A3B3"}
            className="text-textPrimary flex-1"
            style={{ fontFamily: "inter" }}
            onChangeText={(value) => setUserId(value)}
            value={userId}
          />
        </View>
        <View className="border-2 border-border py-2 px-4 flex-row items-center justify-between focus:border-buttonPrimary">
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
      <View className="flex-row items-center justify-center gap-2">
        <AppText className="text-textMuted" textSize={24}>
          ScalpxGlobal
        </AppText>
      </View>
    </View>
  );
};

export default AuthScreen;
