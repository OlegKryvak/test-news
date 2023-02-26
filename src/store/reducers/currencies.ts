import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../hooks";

interface IState {
  currencies: any;
  loader: boolean;
  date: string;
  result: number;
}

const initialState: IState = {
  loader: false,
  date: "",
  currencies: [],
  result: 0,
};

export const getAllCurrencies = createAsyncThunk(
  "currencies/getAllCurrencies",
  async (data: ICurrencyQueries) => {
    const { to, from, amount, date } = data;
    const response: ICurrencyResponse = await axios.get(
      `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}&date=${date}`,
      {
        headers: {
          apikey: "RxUhaarJ2cZ5w7hLCUdm5Jm2hDtU9sFN",
        },
      }
    );
    return response.data;
  }
);

const currenciesSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllCurrencies.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getAllCurrencies.fulfilled, (state, action) => {
      state.result = action.payload.result;
      state.loader = false;
    });
  },
});

export const {} = currenciesSlice.actions;
export const currenciesSelector = (state: RootState) => state.currencies;
export default currenciesSlice.reducer;
