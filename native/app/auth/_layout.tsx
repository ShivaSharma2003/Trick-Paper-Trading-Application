import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthLayout = () => {
  return (
    <SafeAreaView className="flex-1 justify-center px-4 bg-background">
      <Slot />
    </SafeAreaView>
  );
};

export default AuthLayout;
