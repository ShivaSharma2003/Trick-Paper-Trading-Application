import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchInstrumentBytoken } from "@/redux/slices/InstrumentSlice";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { WebView } from "react-native-webview";

const { height } = Dimensions.get("window");

export default function ChartScreen() {
  const dispatch = useAppDispatch();
  const { tokenId } = useLocalSearchParams();
  const { instrument } = useAppSelector((state) => state.instrument);

  useEffect(() => {
    dispatch(fetchInstrumentBytoken(tokenId as string));
  }, [dispatch, tokenId]);

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://s3.tradingview.com/tv.js"></script>
      </head>
      <body style="margin:0;padding:0;">
        <div id="tv_chart_container" style="height:100vh;"></div>
        <script>
          new TradingView.widget({
            container_id: "tv_chart_container",
            autosize: true,
            symbol: "${instrument?.name}",
            interval: "D",
            timezone: "Asia/Kolkata",
            theme: "dark",
            style: "1",
            locale: "en",
            enable_publishing: false,
            hide_top_toolbar: false,
            hide_legend: false,
            withdateranges: true,
            allow_symbol_change: true,
          });
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ html }}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        allowsInlineMediaPlayback
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height,
    width: "100%",
  },
});
