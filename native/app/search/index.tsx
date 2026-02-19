import AppText from "@/components/Common/AppText";
import SearchedItemContainer from "@/components/Container/SearchedItemContainer";
import InstrumentModal from "@/components/Models/InstrumentModal";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  addtoRecentSearches,
  loadRecentSearches,
} from "@/redux/slices/recentSearchSlice";
import { InstrumentResponse } from "@/types/InstrumentTypes";
import SearchInstruments from "@/utils/SearchInstruments";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { FlatList, Modal, Pressable, TextInput, View } from "react-native";

const SearchScreen = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState<string>("");
  const { response } = useAppSelector((state) => state.instrument);
  const { recentSearch } = useAppSelector((state) => state.recentSearch);
  const [selectedInstrument, setSelectedInstrument] =
    useState<InstrumentResponse | null>(null);

  useEffect(() => {
    dispatch(loadRecentSearches());
  }, [dispatch]);

  const SearchedInstruments = useMemo(
    () => SearchInstruments({ query, items: response }),
    [query, response],
  );

  const selectInstrument = (item: InstrumentResponse) => {
    setSelectedInstrument(item);
    dispatch(addtoRecentSearches(item));
  };

  return (
    <View>
      {/* SearchBar */}
      <View className="flex-row items-center justify-between border-b border-border py-2 px-4">
        <Feather
          name="chevron-left"
          size={28}
          color={"#434250"}
          onPress={() => router.back()}
        />
        <TextInput
          placeholder="Search & Add"
          placeholderTextColor={"#A3A3B3"}
          className="flex-1 text-textSecondary"
          autoFocus
          style={{ fontFamily: "inter", fontSize: 16 }}
          onChangeText={(text) => setQuery(text)}
          value={query}
        />
        <Pressable onPress={() => setQuery("")}>
          <AppText className="text-brand" textSize={14}>
            Clear
          </AppText>
        </Pressable>
      </View>

      {/* Lists of Items */}
      <FlatList
        data={query === "" ? recentSearch : SearchedInstruments}
        renderItem={({ item }) => {
          return (
            <SearchedItemContainer
              item={item}
              onSelect={() => selectInstrument(item)}
            />
          );
        }}
      />

      <Modal
        visible={!!selectedInstrument}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedInstrument(null)}
      >
        <InstrumentModal
          instrument={selectedInstrument}
          onClose={() => setSelectedInstrument(null)}
        />
      </Modal>
    </View>
  );
};

export default SearchScreen;
