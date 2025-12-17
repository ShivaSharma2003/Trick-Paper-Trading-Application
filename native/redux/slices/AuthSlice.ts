import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface authSliceInitialState {
  token: string | null;
  loading: boolean;
  error: string | null;
  loggedIn: boolean;
}

const initialState: authSliceInitialState = {
  token: null,
  loading: false,
  error: null,
  loggedIn: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default authSlice.reducer;
