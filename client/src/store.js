import { configureStore } from "@reduxjs/toolkit";
import drugReducer from "./features/drug/drugSlice";

const store = configureStore({
  reducer: {
    drugs: drugReducer,
  },
});

// console.log(drugSlice);

export default store;
