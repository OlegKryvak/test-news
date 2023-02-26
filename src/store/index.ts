import { configureStore } from "@reduxjs/toolkit";
import currenciesReducer from "./reducers/currencies";
import authReducer from "./reducers/auth";
import newsReducer from "./reducers/news";

const store = configureStore({
  reducer: {
    auth: authReducer,
    news: newsReducer,
    currencies: currenciesReducer,
  },
});

export default store;
