import { Slot, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "@/redux/hook";
import { useEffect } from "react";

const AuthLayout = () => {
  const { token } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (token) router.replace("/");
  }, [token]);

  return (
    <SafeAreaView className="flex-1 justify-center px-4 bg-background">
      <Slot />
    </SafeAreaView>
  );
};

export default AuthLayout;
