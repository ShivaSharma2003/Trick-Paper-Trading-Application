import { configureStore } from "@reduxjs/toolkit";
import InstrumentReducer from "@/redux/slices/InstrumentSlice";
import AuthSlice from "@/redux/slices/AuthSlice";
import OrderSlice from "@/redux/slices/OrderSlice";
import PositionSlice from "@/redux/slices/PositionSlice";

const store = configureStore({
  reducer: {
    instrument: InstrumentReducer,
    auth: AuthSlice,
    order: OrderSlice,
    position: PositionSlice,
  },
  middleware: (getDifaultMiddleware) =>
    getDifaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
