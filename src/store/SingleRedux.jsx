import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthRedux";
import itemSlice from "./ItemRedux";

const store = configureStore({
  reducer: {
    auth: authSlice,
    item: itemSlice,
  },
});

export default store;