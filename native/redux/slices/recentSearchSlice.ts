import { InstrumentResponse } from "@/types/InstrumentTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface RecentSearchInitialState {
  error: null | string;
  recentSearch: InstrumentResponse[];
}

const initialState: RecentSearchInitialState = {
  error: null,
  recentSearch: [],
};

export const addtoRecentSearches = createAsyncThunk(
  "add/recentSearch",
  async (item: InstrumentResponse, { rejectWithValue }) => {
    try {
      await AsyncStorage.setItem(
        `recentSearch:${item.token}`,
        JSON.stringify(item),
      );

      return item;
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  },
);

export const removeFromRecentSearch = createAsyncThunk(
  "remove/recentSearch",
  async (item: InstrumentResponse, { rejectWithValue }) => {
    try {
      await AsyncStorage.removeItem(`recentSearch:${item.token}`);
      return item;
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  },
);

export const loadRecentSearches = createAsyncThunk(
  "load/recentSearch",
  async (_, { rejectWithValue }) => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const recentSearchKeys = keys.filter((k) =>
        k.startsWith("recentSearch:"),
      );
      const items = await AsyncStorage.multiGet(recentSearchKeys);

      const instruments = items.map(([_, value]) =>
        value ? JSON.parse(value) : null,
      );
      return instruments;
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  },
);

const recentSearchSlice = createSlice({
  name: "recentSearchSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addtoRecentSearches.fulfilled, (state, action) => {
        const newItem = action.payload as InstrumentResponse;
        // Remove duplicate if it already exists
        state.recentSearch = state.recentSearch.filter(
          (item) => item.token !== newItem.token,
        );
        // Add the item at the beginning (most recent first)
        state.recentSearch.unshift(newItem);
      })
      .addCase(removeFromRecentSearch.fulfilled, (state, action) => {
        state.recentSearch = state.recentSearch.filter(
          (item) => item.token !== action.payload?.token,
        );
      })
      .addCase(loadRecentSearches.fulfilled, (state, action) => {
        state.recentSearch = action.payload as InstrumentResponse[];
      });
  },
});

export default recentSearchSlice.reducer;
