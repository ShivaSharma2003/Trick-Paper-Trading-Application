import { FlatList, View } from "react-native";
import { Feather } from "@expo/vector-icons/";
import HeaderInstruments from "@/data/AppHeaderData";
import AppText from "./AppText";
import AppTickPrice from "./AppTickPrice";
import AppTickChange from "./AppTickChange";
import AppTickChangePercent from "./AppTickChangePercent";

const AppHeader = () => {
  return (
    <View className="flex flex-row gap-4 px-4 py-2">
      <View className="flex-1 flex-row gap-2">
        <FlatList
          data={HeaderInstruments}
          keyExtractor={(item) => item.token}
          horizontal
          renderItem={({ item }) => {
            return (
              <View className="flex-1 flex-col gap-2 mx-2">
                <AppText className="text-textSecondary" textSize={14}>
                  {item.symbol}
                </AppText>
                <View className="flex-row gap-2 items-center">
                  <AppTickPrice item={item} />
                  <View className="flex-row gap-2">
                    <AppTickChange
                      item={item}
                      className="text-textSecondary"
                    />
                    <AppTickChangePercent
                      item={item}
                      className="text-textSecondary"
                    />
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
      <View className="flex-row items-center gap-4">
        <Feather name="shopping-cart" size={22} color={"#484854"} />
        <Feather name="chevron-down" size={24} color={"#484854"} />
      </View>
    </View>
  );
};

export default AppHeader;
