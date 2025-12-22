import { OrderResponse, orderType } from "@/types/OrderTypes";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axiosInstance from "@/config/axios.config";

interface OrderInitialState {
  loading: boolean;
  error: string | null;
  orderStatus: boolean;
  orders: OrderResponse[] | null;
  order: orderType | null;
}

interface OrderRequestPayload {
  tradeType: string;
  orderType: string;
  transactionType: string;
  token: string;
  lotQuantity: number;
  limit: number;
  triggerPrice: number;
}

const initialState: OrderInitialState = {
  loading: false,
  error: null,
  orderStatus: false,
  orders: null,
  order: null,
};

export const fetchOrders = createAsyncThunk(
  "fetch/orders",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const { token } = (state as RootState).auth;

      const { data } = await axiosInstance.get("/order/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.orders;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchOrderBook = createAsyncThunk(
  "fetch/orderBook",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const { token } = (state as RootState).auth;

      const { data } = await axiosInstance.get("/order/orderbook", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return data.orders;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createOrder = createAsyncThunk(
  "create/order",
  async (payload: OrderRequestPayload, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const { token } = (state as RootState).auth;
      const { data } = await axiosInstance.post("/order", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.order;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrderBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderBook.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrderBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.orderStatus = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderStatus = true;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
        state.orderStatus = false;
      });
  },
});

export default orderSlice.reducer;
