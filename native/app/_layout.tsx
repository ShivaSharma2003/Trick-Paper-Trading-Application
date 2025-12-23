import "@/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";
import socket from "@/config/socket.config";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    inter: require("@/assets/fonts/Inter_18pt-Regular.ttf"),
    interBold: require("@/assets/fonts/Inter_18pt-Bold.ttf"),
    interSemiBold: require("@/assets/fonts/Inter_18pt-SemiBold.ttf"),
  });

  useEffect(() => {
    socket.connect();
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;
  return (
    <>
      <Provider store={store}>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="search" />
          <Stack.Screen name="tradebook" />
          <Stack.Screen name="funds" />
          <Stack.Screen name="user" />
          <Stack.Screen name="statement" />
        </Stack>
      </Provider>
    </>
  );
}
