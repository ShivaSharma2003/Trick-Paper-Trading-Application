import { configureStore } from "@reduxjs/toolkit";
import InstrumentReducer from "@/redux/slices/InstrumentSlice";
import AuthSlice from "@/redux/slices/AuthSlice";
import OrderSlice from "@/redux/slices/OrderSlice";
import PositionSlice from "@/redux/slices/PositionSlice";
import WatchlistSlice from "@/redux/slices/WatchlistSlice";
import recentSearchSlice from "./slices/recentSearchSlice";

const store = configureStore({
  reducer: {
    instrument: InstrumentReducer,
    auth: AuthSlice,
    order: OrderSlice,
    position: PositionSlice,
    watchlist: WatchlistSlice,
    recentSearch : recentSearchSlice
  },
  middleware: (getDifaultMiddleware) =>
    getDifaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
