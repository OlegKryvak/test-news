import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import newsReducer from "./reducers/news";
const store = configureStore({
  reducer: {
    auth: authReducer,
    news: newsReducer,
  },
});

export default store;
