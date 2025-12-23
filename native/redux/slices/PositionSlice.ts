import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axiosInstance from "@/config/axios.config";
import { PositionResponse } from "@/types/PositionType";

interface positionInitialState {
  error: string | null;
  loading: boolean;
  positions: PositionResponse[] | null;
  positionbook: PositionResponse[] | null
}

const initialState: positionInitialState = {
  error: null,
  loading: false,
  positions: null,
  positionbook: null
};

export const fetchPositionStatement = createAsyncThunk(
  "fetch/statement",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { token } = (state as RootState).auth;

      const { data } = await axiosInstance.get("/position/statement", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.positions;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchPositions = createAsyncThunk(
  "fetch/positions",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { token } = (state as RootState).auth;
      const { data } = await axiosInstance.get("/position/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.positions;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const positionSlice = createSlice({
  name: "positionSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPositions.pending, (state) => {
        state.positions = null;
        state.loading = true;
      })
      .addCase(fetchPositions.fulfilled, (state, action) => {
        state.loading = false;
        state.positions = action.payload;
      })
      .addCase(fetchPositions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPositionStatement.pending, (state) => {
        state.loading = true;
        state.positionbook = null;
      })
      .addCase(fetchPositionStatement.fulfilled, (state, action) => {
        state.loading = false;
        state.positionbook = action.payload;
      })
      .addCase(fetchPositionStatement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      });
  },
});

export default positionSlice.reducer;
