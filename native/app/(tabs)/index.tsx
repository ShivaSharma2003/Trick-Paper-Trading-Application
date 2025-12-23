import AppText from "@/components/Common/AppText";
import WatchlistItemContainer from "@/components/Container/WatchlistItemContainer";
import InstrumentModal from "@/components/Models/InstrumentModal";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { loadwatchlisted } from "@/redux/slices/WatchlistSlice";
import { InstrumentResponse } from "@/types/InstrumentTypes";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Modal, Pressable, View } from "react-native";

const HomeScreen = () => {
  const [activeWatchlist, setActiveWatchlist] = useState(1);
  const dispatch = useAppDispatch();
  const [selectedInstrument, setSelectedInstrument] =
    useState<InstrumentResponse | null>(null);
  const watchlistData = [1, 2, 3, 4, 5, 6, 7];
  const { watchlists } = useAppSelector((state) => state.watchlist);

  useEffect(() => {
    dispatch(loadwatchlisted());
  }, [dispatch]);

  return (
    <View className="flex-1">
      <View>
        <FlatList
          data={watchlistData}
          contentContainerClassName="gap-8 px-4"
          horizontal
          renderItem={({ item }) => {
            const active = activeWatchlist === item;
            return (
              <Pressable onPress={() => setActiveWatchlist(item)}>
                <AppText
                  className={`${active ? "text-brand" : "text-textMuted"}`}
                  textSize={14}
                  style={{ fontFamily: "interSemiBold" }}
                >
                  Watchlist {String(item)}
                </AppText>
                {active && (
                  <View className="mt-2 h-1 w-10 bg-brand border border-brand " />
                )}
              </Pressable>
            );
          }}
        />
      </View>

      <View className="bg-background px-4 py-4 flex-1">
        {/* Search & Add Section */}
        <Pressable
          className="flex-row gap-2 items-center justify-between px-4 py-4 rounded border border-border"
          onPress={() => router.push("/search")}
        >
          <Feather name="search" size={18} color={"#A3A3B3"} />
          <View className="flex-1">
            <AppText className="text-textMuted" textSize={14}>
              Search & Add
            </AppText>
          </View>
          <View className="flex-row items-center justify-between gap-4">
            <AppText className="text-textMuted" textSize={14}>
              7/100
            </AppText>
            <Ionicons name="options" size={18} color={"#A3A3B3"} />
          </View>
        </Pressable>

        {/*  */}
        {watchlists.length === 0 ? (
          <View className="flex-1 flex items-center justify-center gap-2">
            <Image
              source={require("@/assets/images/nodata.png")}
              className="h-32 w-32"
            />
            <AppText className="text-textMuted" textSize={16}>
              Watchlists are empty!!!
            </AppText>
          </View>
        ) : (
          <View>
            <FlatList
              data={watchlists}
              keyExtractor={(item) => item.token}
              renderItem={({ item }) => {
                return (
                  <WatchlistItemContainer
                    item={item}
                    onSelect={() => setSelectedInstrument(item)}
                  />
                );
              }}
            />
          </View>
        )}
      </View>
      <Modal
        visible={!!selectedInstrument}
        transparent
        onRequestClose={() => setSelectedInstrument(null)}
        animationType="slide"
      >
        <InstrumentModal
          instrument={selectedInstrument}
          onClose={() => setSelectedInstrument(null)}
        />
      </Modal>
    </View>
  );
};

export default HomeScreen;
