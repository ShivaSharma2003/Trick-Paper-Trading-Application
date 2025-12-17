import axiosInstance from "@/config/axios.config";
import { InstrumentResponse } from "@/types/InstrumentTypes";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface InstrumentSliceInitialState {
  error: string | null;
  loading: boolean;
  response: InstrumentResponse[];
  instrument: InstrumentResponse | null;
}

const initialState: InstrumentSliceInitialState = {
  error: null,
  loading: false,
  response: [],
  instrument: null,
};

export const fetchInstruments = createAsyncThunk(
  "fetch/instruments",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/instrument");
      return data.instruments;
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);

export const fetchInstrumentBytoken = createAsyncThunk(
  "fetch/instrumentToken",
  async (tokenId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/instrument/${tokenId}`);
      return data.instrument;
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);

const InstrumentSlice = createSlice({
  name: "instrumentSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstruments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInstruments.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(fetchInstruments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      })
      .addCase(fetchInstrumentBytoken.pending, (state) => {
        state.loading = true;
        state.instrument = null;
      })
      .addCase(fetchInstrumentBytoken.fulfilled, (state, action) => {
        state.loading = false;
        state.instrument = action.payload;
      })
      .addCase(fetchInstrumentBytoken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      });
  },
});

export default InstrumentSlice.reducer;
