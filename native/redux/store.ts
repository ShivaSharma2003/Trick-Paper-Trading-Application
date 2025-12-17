import { configureStore } from "@reduxjs/toolkit";
import InstrumentReducer from "@/redux/slices/InstrumentSlice";
import AuthSlice from "@/redux/slices/AuthSlice";

const store = configureStore({
  reducer: {
    instrument: InstrumentReducer,
    auth: AuthSlice,
  },
  middleware: (getDifaultMiddleware) =>
    getDifaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
