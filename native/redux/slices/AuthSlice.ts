import axiosInstance from "@/config/axios.config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserResponse } from "@/types/UserTypes";
import { RootState } from "../store";

interface authSliceInitialState {
  token: string | null;
  loading: boolean;
  error: string | null;
  loggedIn: boolean;
  profile: UserResponse | null;
}

interface AuthRegisterPayload {
  userId: string;
  password: string;
}

const initialState: authSliceInitialState = {
  token: null,
  loading: false,
  error: null,
  loggedIn: false,
  profile: null,
};

export const registerAccount = createAsyncThunk(
  "register/account",
  async (payload: AuthRegisterPayload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/user/auth/register", payload);
      await AsyncStorage.setItem("native-token", data.token);
      return data.token;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loadAccount = createAsyncThunk(
  "load/account",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("native-token");
      return token;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "fetch/profile",
  async (token: string, { rejectWithValue, getState }) => {
    try {
      const { data } = await axiosInstance.get("/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.loggedIn = true;
      })
      .addCase(registerAccount.rejected, (state, action) => {
        state.loading = false;
        state.loggedIn = false;
        state.error = action.error as string;
      })
      .addCase(loadAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.loggedIn = true;
      })
      .addCase(loadAccount.rejected, (state, action) => {
        state.loading = false;
        state.loggedIn = false;
        state.error = action.error as string;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.error as string;
      });
  },
});

export default authSlice.reducer;
